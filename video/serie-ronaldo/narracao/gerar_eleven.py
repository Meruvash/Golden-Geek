# Gera as falas de um episódio com o ElevenLabs (modelo eleven_v3) e CONFERE cada uma:
# transcreve a tomada e, se o texto não bater com o roteiro, tenta outra semente (até 4).
# A chave da API é injetada pelo proxy do ambiente (segredo de rede de api.elevenlabs.io): este script não lê chave nenhuma.
# Uso (da pasta do projeto): python3 narracao/gerar_eleven.py ae-p1 [ids]
#   "fala": texto falado, com marcações de emoção do v3 ([excited], [serious]...); "texto": o que vai na legenda.
import difflib, json, os, re, subprocess, sys, tempfile, urllib.request

VOZES = {
    "narrador": "plASsyS7JE6GCAvx9uIc",  # Marcio - Viral Hook Narrator (biblioteca ElevenLabs, pt-BR)
    "wan": "hwnuNyWkl9DjdTFykrN6",  # Adriano - Deep, Gravelly and Rugged
    "ronaldo": "YU8EsJtXFMyKMxYtheDk",  # Mário - Excited, Constant and Cheerful
    "lukita": "7lu3ze7orhWaNeSPowWx",
    "victor": "dX7gRq1dIvLTgUaWpEFn",  # Rafael Valente - Smooth and Captivating (pt-BR)
    "vendedor": "plASsyS7JE6GCAvx9uIc",  # figurante com a voz do narrador  # Lucas - Engaging, Captivating and Kind (jovem, pt-BR)
}
NUM = {"1": "um", "2": "dois", "3": "três", "4": "quatro", "5": "cinco", "6": "seis"}


def norm(t):
    t = re.sub(r"\[[^\]]*\]", " ", t).lower().replace("pra ", "para ")
    t = re.sub(r"[^\wà-ü ]+", " ", t)
    return " ".join(NUM.get(w, w) for w in t.split()).split()


def ouvir(arq):
    from stt import palavras
    return " ".join(p["text"] for p in palavras(arq))


def tts(texto, voz, semente, saida, modelo="eleven_v3"):
    corpo = json.dumps({"text": texto, "model_id": modelo, "language_code": "pt", "seed": semente}).encode()
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{voz}?output_format=mp3_44100_128", data=corpo, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as r, open(saida, "wb") as o:
        o.write(r.read())


ep = sys.argv[1]
ids = {int(x) for x in sys.argv[2].split(",")} if len(sys.argv) > 2 else None
falas = [f for f in json.load(open(f"narracao/falas-{ep}.json")) if not ids or f["id"] in ids]
os.makedirs(f"public/voz/{ep}", exist_ok=True)
tmp = tempfile.mkdtemp()
for f in falas:
    melhor = (-1, None, "")
    for tentativa in range(4):
        mp3 = f"{tmp}/t{f['id']}-{tentativa}.mp3"
        # "modelo": eleven_multilingual_v2 segue o sotaque da voz (brasileiro) quando o v3 escorrega para o português de Portugal
        modelo = f.get("modelo", "eleven_v3")
        texto = f.get("fala", f["texto"]) if modelo == "eleven_v3" else f["texto"]  # marcações [..] só existem no v3
        tts(texto, VOZES[f["quem"]], 100 * f["id"] + tentativa + int(os.environ.get("SEMENTE", "0")), mp3, modelo)
        wav = mp3[:-4] + ".wav"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", mp3, "-ar", "44100", "-ac", "1", wav], check=True)
        ouvido = ouvir(wav)
        nota = difflib.SequenceMatcher(None, norm(f["texto"]), norm(ouvido)).ratio()
        if nota > melhor[0]:
            melhor = (nota, wav, ouvido)
        if nota >= 0.9:
            break
    os.replace(melhor[1], f"public/voz/{ep}/fala-{f['id']:02d}.wav")
    print(f"{f['id']:2d} {f['quem']:8s} nota {melhor[0]:.2f} | {f['texto']} | ouvi: {melhor[2]}", flush=True)
