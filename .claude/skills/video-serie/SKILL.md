---
name: video-serie
description: Produz um episódio da série animada da Elite Boardgamers (Wan, Ronaldo, Lukita) para o Instagram, em 1080x1080, no molde de uma referência ASSISTIDA, com portões de aprovação do editor. Use quando pedirem "/video-serie", "novo episódio", "vídeo do Wan/Ronaldo/Lukita" ou "parte 2" de uma série.
---

# /video-serie

Pipeline com portões. Não pule portão: cada um espera a resposta do editor.

## 0. Leia antes
- `PADRAO_VIDEO.md` (seções 4, 8, 11 e 12) e `video/ROTEIRO_REFERENCIAS.md` (seção 4d é o molde @saveo.house).
- Fatos do jogo só da resenha ou tutorial publicado no site (`<slug>/index.html`, `como-jogar/<slug>/`).

## 1. Referência assistida
- Se o editor indicou um vídeo novo e ele não está no molde, peça o MP4. Rode `/watch` e faça folhas de contato (`ffmpeg ... fps=1/3,tile=8x3`); transcreva a fala.
- Escreva o mapa de batidas (tempo, batida, exemplo) em `ROTEIRO_REFERENCIAS.md`.

## 2. Roteiro (PORTÃO 1)
- Tabela lado a lado: batida do molde | tempo | nossa fala (quem fala) | plano (cenário, luz, câmera) | painel de estado | skill responsável.
- 2ª pessoa, frases de 2 a 8 palavras, ~2,7 palavras/s, um plano a cada 2–3 s.
- Final: escolha com preço escrito, "Comenta X ou Y", "A maioria escreve a Parte N", link da resenha.
- Salve em `video/roteiros/<episodio>.md`. **Mostre ao editor e espere aprovação. Nenhuma voz antes.**

## 3. Teste de 10 s (PORTÃO 2)
- Cenários pintados em código (`video/serie-ronaldo/arte/`, skill `claude-drawing`), luz de `src/colt/luz.tsx`, sem IA de imagem.
- Renderize os 10 primeiros segundos em 1080x1080 com voz provisória ou muda e uma imagem lado a lado com a referência no mesmo segundo. Espere aprovação.

## 4. Vozes
- `narracao/gerar_eleven.py` com `eleven_multilingual_v2` (sotaque brasileiro), conferência por transcrição; `NATURAL=1 python3 narracao/montar.py`.

## 5. Produção e checagem
- Composição sem sufixo = 1080x1080. Painel de estado, legenda palavra por palavra, cartão "isso é real", tela de escolha, cartela com link.
- Checagem: `huashu-art-motion` (`scripts/qa.py`, `storyboard_lint.py`), checklist da seção 9 do padrão, áudio −16 a −14 LUFS e pico ≤ −1 dBTP.
- Entregue o MP4 e a legenda do Instagram num bloco de código copiável. Commit e push.
