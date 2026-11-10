# Transcrição com tempo por palavra pelo speech-to-text da ElevenLabs (scribe_v1).
# A chave é injetada pelo proxy do ambiente (segredo de rede de api.elevenlabs.io).
import json, subprocess

def palavras(arq, idioma="pt"):
    r = subprocess.run(["curl", "-sS", "-m", "180", "https://api.elevenlabs.io/v1/speech-to-text",
                        "-F", "model_id=scribe_v1", "-F", f"language_code={idioma}", "-F", "timestamps_granularity=word",
                        "-F", "tag_audio_events=false", "-F", f"file=@{arq}"], capture_output=True, text=True, check=True)
    j = json.loads(r.stdout)
    return [{"text": w["text"], "start": w["start"], "end": w["end"]} for w in j.get("words", []) if w.get("type") == "word"]
