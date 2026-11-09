# Gera as falas de um episódio com o Chatterbox pt-BR oficial (narracao/ptbr.py) e CONFERE cada uma:
# transcreve a tomada e, se o texto não bater com o roteiro, tenta outra semente (até 5).
# Uso (da pasta do projeto): CHATTERBOX_PTBR=<pasta dos pesos> python narracao/gerar_ptbr.py ae01 [ids]
#   grava public/voz/<ep>/fala-XX.wav (bruto; narracao/montar.py normaliza e monta a linha do tempo)
import difflib, json, os, re, subprocess, sys, tempfile, time

import torch, torchaudio as ta

sys.path.insert(0, os.path.dirname(__file__))
import ptbr

R = "narracao/refs"
PAPEIS = {
    # locutor: referência gravada em inglês; cfg 0 evita herdar o sotaque da referência (README do Chatterbox)
    "narrador": {"ref": f"{R}/ref-locutor.wav", "exaggeration": 0.6, "cfg_weight": 0.0},
    "ronaldo": {"ref": "narracao/ref-ronaldo.wav", "exaggeration": 0.8, "cfg_weight": 0.45},
    "wan": {"ref": "narracao/ref-wan.wav", "exaggeration": 0.5, "cfg_weight": 0.4},
}
NUM = {"1": "um", "2": "dois", "3": "três", "4": "quatro", "5": "cinco", "6": "seis", "25": "vinte e cinco"}


def norm(t):
    t = t.lower().replace("pra ", "para ").replace("’", "'")
    t = re.sub(r"[^\wà-ü' ]+", " ", t)
    return " ".join(NUM.get(w, w) for w in t.split()).split()


def ouvir(arq):
    r = subprocess.run(["npx", "--yes", "hyperframes@0.9.26", "transcribe", arq, "--language", "pt", "--json"], capture_output=True, text=True)
    pal = []
    for linha in (r.stdout + r.stderr).splitlines():
        try:
            j = json.loads(linha)
        except Exception:
            continue
        if j.get("type") == "words":
            pal += j["words"]
    return " ".join(p["text"] for p in pal)


ep = sys.argv[1]
ids = {int(x) for x in sys.argv[2].split(",")} if len(sys.argv) > 2 else None
falas = [f for f in json.load(open(f"narracao/falas-{ep}.json")) if not ids or f["id"] in ids]
os.makedirs(f"public/voz/{ep}", exist_ok=True)
m = ptbr.carregar()
tmp = tempfile.mkdtemp()
for f in falas:
    p = PAPEIS[f["quem"]]
    texto = f.get("fala", f["texto"])  # "fala": grafia só para a pronúncia, quando precisa
    melhor = (-1, None, "")
    for tentativa in range(5):
        torch.manual_seed(1000 + 37 * f["id"] + tentativa)
        wav = m.generate(texto, language_id="pt", audio_prompt_path=p["ref"], exaggeration=p["exaggeration"], cfg_weight=p["cfg_weight"])
        arq = f"{tmp}/t{f['id']}-{tentativa}.wav"
        ta.save(arq, wav, m.sr)
        ouvido = ouvir(arq)
        nota = difflib.SequenceMatcher(None, norm(f["texto"]), norm(ouvido)).ratio()
        if nota > melhor[0]:
            melhor = (nota, arq, ouvido)
        if nota >= 0.9:
            break
    os.replace(melhor[1], f"public/voz/{ep}/fala-{f['id']:02d}.wav")
    print(f"{f['id']:2d} {f['quem']:8s} nota {melhor[0]:.2f} | {f['texto']} | ouvi: {melhor[2]}", flush=True)
