# Prepara as falas de um episódio para o Remotion:
#   1) corta silêncio e normaliza cada fala (-16 LUFS, pico -1,5 dBTP);
#   2) transcreve cada fala (HyperFrames/Whisper) para conferir o texto e achar o tempo de cada palavra;
#   3) monta a linha do tempo (pausas por fala) e grava src/<ep>/dados.ts.
# Uso (da pasta do projeto): python3 narracao/montar.py ep02 '{"3":0.15,"7":0.6}'
#   o JSON opcional dá a pausa ANTES de cada fala (padrão 0,25 s).
import json, os, re, subprocess, sys, tempfile

ep = sys.argv[1]
pausas = {int(k): v for k, v in json.loads(sys.argv[2] if len(sys.argv) > 2 else "{}").items()}
falas = json.load(open(f"narracao/falas-{ep}.json"))
pasta = f"public/voz/{ep}"
tmp = tempfile.mkdtemp()

def dur(p):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", p]).decode())

for f in falas:
    arq = f"{pasta}/fala-{f['id']:02d}.wav"
    bruto = f"{tmp}/b{f['id']}.wav"
    os.replace(arq, bruto)
    filtro = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.08,"
              "areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.25,areverse,"
              # pausas internas longas (o modelo às vezes para 1-2 s no meio da frase) viram no máximo 0,32 s
              "silenceremove=stop_periods=-1:stop_duration=0.32:stop_threshold=-42dB,"
              "loudnorm=I=-16:TP=-1.5:LRA=11")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", bruto, "-af", filtro, "-ar", "24000", arq], check=True)
    copia = f"{tmp}/t{f['id']}.wav"
    subprocess.run(["cp", arq, copia], check=True)
    r = subprocess.run(["npx", "--yes", "hyperframes@0.9.26", "transcribe", copia, "--language", "pt", "--json"], capture_output=True, text=True)
    pal = []
    for linha in (r.stdout + r.stderr).splitlines():
        try:
            j = json.loads(linha)
        except Exception:
            continue
        if j.get("type") == "words":
            pal += j["words"]
    f["arquivo"] = f"voz/{ep}/fala-{f['id']:02d}.wav"
    f["dur"] = round(dur(arq), 3)
    f["palavras_ouvidas"] = pal
    print(f["id"], f["quem"], f["dur"], "|", f["texto"], "|", " ".join(p["text"] for p in pal), flush=True)

# linha do tempo: as palavras do roteiro (legenda) recebem o tempo da palavra ouvida correspondente
t = 0.35
saida = []
for f in falas:
    t += pausas.get(f["id"], 0.25) if f["id"] > 1 else 0
    toks = f["texto"].split()
    ouv = f["palavras_ouvidas"] or [{"start": 0}]
    n, m = len(toks), len(ouv)
    pals = []
    for i, w in enumerate(toks):
        k = round(i * (m - 1) / (n - 1)) if n > 1 else 0
        pals.append({"t": round(t + min(ouv[k]["start"], f["dur"] - 0.05), 3), "w": w})
    saida.append({"id": f["id"], "quem": f["quem"], "texto": f["texto"], "inicio": round(t, 3), "dur": f["dur"], "arquivo": f["arquivo"], "palavras": pals})
    t += f["dur"]

json.dump(falas, open(f"narracao/falas-{ep}.json", "w"), ensure_ascii=False, indent=1)
os.makedirs(f"src/{ep}", exist_ok=True)
with open(f"src/{ep}/dados.ts", "w") as o:
    o.write(f"// Gerado por narracao/montar.py a partir de narracao/falas-{ep}.json (tempos em segundos)\n")
    o.write("export const FALAS = " + json.dumps(saida, ensure_ascii=False, indent=1) + ";\n")
    o.write(f"export const DURACAO = {round(t + 1.4, 2)};\n")
print("DURACAO", round(t + 1.4, 2))
