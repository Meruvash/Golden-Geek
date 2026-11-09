# Padrão de vídeo da Elite Boardgamers (v1)

Vale para todo vídeo novo (Reels, TikTok, Shorts). Nenhum vídeo começa a ser animado antes de passar pelas etapas 1 a 3 do fluxo abaixo. Este padrão existe porque os quatro primeiros vídeos (Arcs v1 e v2, Spirit Island, Root) usaram quatro estéticas diferentes, inventadas na hora, e o resultado ficou inconsistente.

## 1. O que a pesquisa validou

| Achado | Fonte | Consequência para nós |
|---|---|---|
| Entre 1.040 vídeos de board game analisados, o formato dominante é **o jogo na mesa** (323 de demonstração; 61 de close no produto). Só 50 (≈5%) são animação pura. | Virlo, biblioteca analisada, nov/2026 | O protagonista do vídeo é **o jogo real**: fotos e vídeos oficiais ou gravados por nós. A animação é camada por cima, não o vídeo inteiro. |
| Os tutoriais curtos que mais performam (@tiktokboardgames: Stax 5,7 mi, Slip It In 3,2 mi) são o **manual condensado numa fórmula fixa**, narrada sobre as peças. | Transcrições lidas no Virlo | Todo "Como jogar" segue a fórmula da seção 3. |
| Ganchos mais frequentes no nicho: afirmação forte (128), promessa de tutorial (100), pergunta (91). | Virlo, mesma busca | O gancho é sempre um desses três tipos. |
| Um vídeo do Kurzgesagt leva ~1.200 h, ~200 painéis ilustrados à mão, e a **voz define o tempo** da animação. | kurzgesagt.org/youtube; making-of "How to make a Kurzgesagt video in 1200 hours" | Não imitamos o desenho deles à mão. Copiamos o método: roteiro e voz primeiro, imagem depois, sistema visual fixo. |
| Consistência vem de um **sistema** decidido antes do projeto: paleta, tipos, tokens de movimento e quadros de estilo aprovados antes de animar. | Superside, Webflow, LottieFiles (motion-design) | Seções 4 a 7 são o sistema; a etapa 3 do fluxo é a aprovação dos quadros de estilo. |
| "Instrument Serif, Inter, Space Grotesk… são onde o design gerado cai; use quando a marca usa, não por padrão." | HyperFrames, `references/look.md` | A tipografia é a da marca (Public Sans), não a da moda. |

## 2. Fluxo obrigatório

1. **Fonte**: os fatos vêm da resenha, do tutorial ou da notícia publicada no site. Nada fora disso.
2. **Roteiro + voz**: roteiro na fórmula da seção 3; narração gerada e conferida por transcrição (seção 8). A voz define a linha do tempo.
3. **Quadros de estilo**: 3 imagens estáticas (gancho, cena do meio, cartela final) aprovadas antes de animar. Mudança depois disso custa caro.
4. **Animação**: só com os componentes da seção 7.
5. **Checagem**: o checklist da seção 9 inteiro. Um item crítico reprovado = não publica.

## 3. Roteiro

- **Duração**: 30 a 60 s. Fala em português: 2,2 a 2,6 palavras por segundo.
- **Fórmula "Como jogar"**: gancho com o nome do jogo → objetivo → como cada um joga → o turno → "parece simples, até…" → chamada para o site.
- **Fórmula "Resenha"**: gancho (afirmação forte sobre o jogo) → a jogada que define o jogo → prova (prêmio, nota) → o que divide a crítica (sem entregar o veredito) → chamada.
- **Gancho**: afirmação forte, promessa de tutorial ou pergunta; nos 2 primeiros segundos, já na tela no quadro 0.
- **Fecho**: pergunta ou promessa que só o site responde ("O passo a passo está no link da bio").
- Mesmas regras de texto do `PADRAO_EDITORIAL.md` (nada inventado, nada genérico).

## 4. Identidade visual (fixa)

Tirada do site e dos infográficos. Não muda de vídeo para vídeo.

```yaml
cores:
  fundo:        "#0f1115"   # painel do site
  fundo-fundo:  "#000000"
  texto:        "#eceff3"
  texto-suave:  "#a1a9b5"
  linha:        "#262a32"
  ouro:         "#e3b23c"   # prêmios, destaques, veredito
  marca:        "#e98b1e"   # laranja do logo: chamada final e botão
  acentos:                  # um por bloco/facção, nunca mais de dois na mesma cena
    verde:  "#3ddc84"
    azul:   "#6ea8ff"
    roxo:   "#b493ff"
    amarelo:"#f0c24b"
tipografia:
  familia: "Public Sans"     # fontes/public-sans.woff2 (OFL), a mesma do site
  titulo:  { peso: 900, tamanho: 96-140px, entrelinha: 1.0, caixa: normal }
  apoio:   { peso: 600, tamanho: 44-56px }
  rotulo:  { peso: 800, tamanho: 28-34px, caixa-alta, espaçamento: 0.12em }
  piso:    28px              # nada legível abaixo disso
formato: { largura: 1080, altura: 1920, fps: 30 }
area-segura: { topo: 168, base-texto: 1330, laterais: 80 }   # UI do Instagram/TikTok
logo: "marca/logo-eb-156.webp, só na cartela final, centralizado, 320-470px de largura"
```

Proibido (já aconteceu e não pode voltar): fundo diferente a cada vídeo; fontes da moda no lugar da Public Sans; texto em fonte serifada decorativa; mais de dois acentos na mesma cena; logo no canto durante o vídeo.

## 5. Imagens (ordem de preferência)

1. **Fotos e vídeos oficiais** da editora (via skill `imagens`, com crédito na tela) ou gravados por nós na mesa.
2. **Animações Lottie licenciadas** (LottieFiles, licença conferida e registrada em `assets/CREDITS.md`) para ícones e efeitos.
3. **Peças em 3D** (toon, contorno preto) só para meeples, dados e naves, com as cores dos acentos.
4. **Desenho próprio em SVG**: só ícones simples (seta, moeda, PV). Nunca personagens nem cenários.

Nunca recriar a arte do jogo nem desenhar um personagem "parecido" com o de uma editora. Quando o vídeo precisa do personagem, usa-se a arte oficial com crédito.

## 6. Movimento (uma personalidade só)

Personalidade **Energética contida** (LottieFiles, `motion-design`): entra rápido, assenta firme, sem quicar em texto.

| Token | Valor |
|---|---|
| Curva padrão (80% das entradas) | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) |
| Saída | `cubic-bezier(0.7, 0, 0.84, 0)` (in), 40-50% mais curta que a entrada |
| Durações | rápida 0,25 s · padrão 0,45 s · lenta 0,8 s |
| Entrada padrão | sobe 40 px + aparece; título palavra a palavra, 60-90 ms entre palavras |
| Escalonamento | 60-120 ms por item, total < 0,5 s |
| Quique (overshoot) | só em ícones e peças (até 15%), nunca em texto |
| Título pousado | parado até sair (sem "respirar") |
| Cortes | na batida da música ou na palavra da narração |

## 7. Componentes (biblioteca única)

Todo vídeo é montado com estes blocos, no mesmo arquivo de tema (cores, fontes e tokens acima):
`Gancho` (texto grande + foto oficial), `Rotulo`, `Titulo`, `FotoOficial` (com crédito), `CartaoFaccao` (cor de acento + ícone + 1 linha), `Contador` (número que sobe), `Passos` (sequência de 3 ícones com seta), `Dados` (0-3 ou d6), `Legenda` (palavra a palavra), `Cartela` (pergunta + botão + logo + endereço).

## 8. Áudio

- **Voz**: Chatterbox multilíngue com a voz de referência fixa (`video/root-como-jogar/narracao/voz-referencia-ptbr.wav`, ou a do apresentador quando houver), normalizada a −16 LUFS, conferida por transcrição.
- **Trilha**: uma só "assinatura" por série; sob a voz, volume 0,14-0,16.
- **Efeitos**: só em ações na tela (peça cai, dado rola, corte); créditos CC BY em `assets/sfx/CREDITS.md` e na legenda do post.
- **Mix final**: −16 a −14 LUFS, pico até −1 dBTP.

## 9. Checklist de aprovação

Crítico (reprova):
- [ ] Algum fato sem fonte no site
- [ ] Cor ou fonte fora da seção 4
- [ ] Imagem de jogo desenhada por nós quando existe a oficial
- [ ] Texto abaixo de 28 px ou fora da área segura
- [ ] Narração com palavra cortada (transcrição não bate)
- [ ] Imagem ou som sem crédito/licença registrada

Alto:
- [ ] Gancho fora dos três tipos ou depois de 2 s
- [ ] Mais de uma personalidade de movimento; texto quicando
- [ ] Cena sem foto/vídeo real por mais de 8 s seguidos
- [ ] Mix fora de −16 a −14 LUFS

## Fontes

- Virlo: biblioteca de vídeos analisados (board game, nov/2026); transcrições de youtube.com/shorts/EmsNLDg2B-s, KiC8Fzo_LUc, UVfpkYOha70.
- Kurzgesagt: https://kurzgesagt.org/youtube/ e "How to Make a Kurzgesagt Video in 1200 Hours".
- Superside: https://www.superside.com/blog/motion-graphics-marketing e https://superside.com/blog/motion-design-at-scale
- Webflow: https://webflow.com/blog/motion-design-principles
- LottieFiles, skill `motion-design` (MIT): `.claude/skills/motion-design/` (personalidades, durações, checklist).
- HyperFrames, `references/look.md` e `types/vertical.md` (área segura, fontes geradas por padrão).
- Remotion, `remotion-create/video-layout.md` (tamanhos mínimos de texto para 1080 px).
