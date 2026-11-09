# Narração com Chatterbox (grátis, MIT)

- Modelo: Chatterbox Multilingual (Resemble AI), em CPU, `language_id="pt"`.
- Voz: clonada de `voz-referencia-ptbr.wav`, um áudio pt-BR gerado pelo Kokoro (voz `pm_alex`, Apache 2.0).
  Para narrar com a sua voz, troque esse arquivo por ~15 s da sua voz gravada em lugar silencioso.
- Instalação (CPU, Python 3.13): `pip install "torch==2.6.0" "torchaudio==2.6.0" --index-url https://download.pytorch.org/whl/cpu`
  e depois `pip install chatterbox-tts --extra-index-url https://download.pytorch.org/whl/cpu`.
- Rodar a partir da pasta do projeto: `python narracao/gerar_narracao.py` (≈25–30 s por frase em CPU).
- Depois: normalizar cada fala (`ffmpeg -af loudnorm=I=-16:TP=-1.5`) e transcrever para pegar o tempo das palavras.
- Todo áudio do Chatterbox sai com marca d'água inaudível (PerTh).
