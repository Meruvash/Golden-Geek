---
version: 1
slug: "tools-build-review-py"
primary_target: "tools/build_review.py"
related_targets: []
---

Escopo: página de resenha individual (`<slug>/index.html`, gerada por tools/build_review.py). Modo: Read.
Público: seguidor do Instagram no celular; tarefa: saber em segundos se o jogo vale a pena e confiar nos números.
Restrições: logo coroa Elite Boardgamers presente; infográfico é a peça central; site estático no GitHub Pages; conteúdo vem de conteudo/<slug>.json.

## Direction contract
THESIS: a página de jogo que todo boardgamer já sabe ler (padrão BoardGameGeek), feita com acabamento melhor que o original: ficha densa e confiável, veredito e nota visíveis sem rolar. Recusa a resenha-blog de texto corrido e o pôster escuro neon.
OWN-WORLD: barra superior azul-ardósia profunda com a coroa; corpo claro de leitura; hexágono de nota colorido pela escala do BGG; régua de ícones (jogadores, minutos, idade, peso) em traço único; selos de prêmio com dourado só para vencedores; abas âncora das seções.
STORY: o leitor vê o jogo, a nota e o veredito, confere prêmios e ficha com fontes, lê prós e contras e decide se é para ele.
FIRST VIEWPORT: barra com coroa e link para todas as resenhas; cabeçalho do jogo com infográfico à esquerda (largura total no celular), título grande, ano e designer, hexágono da nota BGG, selo do veredito e a régua de ícones; abas logo abaixo.
FORM: canon (padrão de sites de review), régua de acabamento BoardGameGeek; seed:67f2bf3b8987145e.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
