# Gera as falas do episódio com o Chatterbox Multilingual (MIT), uma voz de referência pt-BR por papel.
# Uso (da pasta do projeto): python narracao/gerar_vozes.py narracao/falas-ep01.json public/voz
import json, sys, time, torch, torchaudio as ta
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
PAPEIS = {
    "narradora": {"ref": "narracao/ref-narradora.wav", "exaggeration": 0.5, "cfg_weight": 0.5},
    "ronaldo":   {"ref": "narracao/ref-ronaldo.wav",   "exaggeration": 0.85, "cfg_weight": 0.45},
    "wan":       {"ref": "narracao/ref-wan.wav",       "exaggeration": 0.3,  "cfg_weight": 0.3},
}
falas = json.load(open(sys.argv[1])); out = sys.argv[2]
m = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
for f in falas:
    p = PAPEIS[f["quem"]]; torch.manual_seed(200 + f["id"]); t0 = time.time()
    wav = m.generate(f["texto"], language_id="pt", audio_prompt_path=p["ref"], exaggeration=p["exaggeration"], cfg_weight=p["cfg_weight"])
    ta.save(f"{out}/fala-{f['id']:02d}.wav", wav, m.sr)
    print(f["id"], f["quem"], round(wav.shape[-1] / m.sr, 2), "s", round(time.time() - t0, 1), flush=True)
