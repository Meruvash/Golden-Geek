import time, torch, torchaudio as ta, json
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
m = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
lines = [
 "Este jogo de guerra fofo, em que cada jogador joga um jogo diferente, é Root.",
 "Seu objetivo é chegar primeiro a trinta pontos de vitória.",
 "Os Marqueses vivem de madeira: serrarias pagam construções, e construções dão pontos.",
 "As Rapinas pontuam com ninhos, mas precisam cumprir o Decreto inteiro, ou caem em tumulto.",
 "A Aliança espalha simpatia até se revoltar.",
 "E o Malandro, sozinho, explora ruínas e cumpre tarefas.",
 "Todo turno tem Amanhecer, Dia e Anoitecer.",
 "Para mover, você precisa governar a clareira de saída ou a de chegada.",
 "Parece simples, até a batalha: o atacante causa o dado maior, e o defensor, o menor.",
 "O passo a passo completo, com exercícios, está no link da bio.",
]
out=[]
for i,txt in enumerate(lines,1):
    torch.manual_seed(100+i); t0=time.time()
    wav = m.generate(txt, language_id="pt", audio_prompt_path="narracao/voz-referencia-ptbr.wav", exaggeration=0.6, cfg_weight=0.5)
    p=f"/home/user/Golden-Geek/video/root-como-jogar/assets/voice/fala-{i:02d}.wav"
    ta.save(p, wav, m.sr); d=wav.shape[-1]/m.sr
    out.append({"id":i,"text":txt,"file":p,"dur":round(d,3)}); print(i, round(d,2), "s", round(time.time()-t0,1), flush=True)
json.dump(out, open("/home/user/Golden-Geek/video/root-como-jogar/assets/voice/falas.json","w"), ensure_ascii=False, indent=1)
