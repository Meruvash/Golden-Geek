# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Seguidores do Instagram da Elite Boardgamers que chegam pelo link da bio, no celular, depois de ver o infográfico de um jogo. Querem confirmar rapidamente se o jogo vale a pena para eles e, se gostarem, explorar outras resenhas.

## Product Purpose
Site de resenhas da Elite Boardgamers, publicado no GitHub Pages, que aprofunda os infográficos do Instagram: ficha com fontes, como funciona, pontos fortes e de atenção, para quem é e veredito. Inclui também a Consulta Golden Geek 2015–2025. Sucesso é crescer o Instagram (o site reforça a marca e traz seguidores) e virar referência confiável sobre jogos premiados no Brasil.

## Positioning
Só resenha jogos premiados (Golden Geek, Spiel des Jahres, Kennerspiel, Kinderspiel, As d'Or, Deutscher Spiele Preis, Prêmio Ludopedia), escolhidos por uma pauta pública, não pelo gosto do dia. Todo número tem fonte e data; o que não foi confirmado aparece como tal; opiniões são atribuídas à crítica que as fez.

## Operating Context
Leitura principalmente em celular, vinda do Instagram e de links compartilhados no WhatsApp (prévia og:image). Ritmo de 4 resenhas por dia, aprovadas em lote; as páginas são geradas por `tools/build_review.py` a partir de `conteudo/<slug>.json`, e a lista por `tools/publicar.py`.

## Capabilities and Constraints
- Site estático (HTML/CSS) no GitHub Pages; sem build step nem framework. Páginas geradas por scripts Python; não editar HTML à mão.
- Conteúdo em português do Brasil.
- Cada resenha tem um infográfico quadrado (`infografico.webp`, 1600 px) e uma capa 800×800 (`capa.jpg`).
- Tipos de página: consulta Golden Geek (`index.html`), lista de resenhas (`resenhas/`), resenha individual (`<slug>/`), comparativo de série (`nemesis/`).

## Brand Commitments
- Nome: Elite Boardgamers.
- Logo: selo "ELITE BOARDGAMERS" com coroa dourada (e dado), presente nos infográficos. Obrigatório manter.
- O infográfico do Instagram continua sendo a peça central de cada resenha.
- Tom direto e honesto; nada além do que a pesquisa sustenta.
- Formato visual: o padrão de páginas de review/jogo, executado com acabamento alto, tendo a página de jogo do BoardGameGeek como régua (escolha do usuário em 27/10/2026, depois de recusar três direções autorais).

## Evidence on Hand
- 13 resenhas publicadas com infográficos e conteúdo estruturado em `conteudo/*.json`.
- `pauta.json` com prêmios e fontes de cada jogo.
- Referências visuais dos infográficos em `modelos/referencia-*.jpg`.
- Não há depoimentos, números de audiência ou parcerias; não inventar.

## Product Principles
1. Confiança acima de tudo: fonte e data visíveis para cada número, incerteza declarada.
2. Feito para o celular de quem veio do Instagram: a resposta "vale a pena?" aparece sem rolar muito.
3. A marca Elite Boardgamers é reconhecível em toda página, reforçando o Instagram.
4. O infográfico é o herói; a página aprofunda sem repetir.
5. Prêmios são o critério de entrada e devem ser sempre evidentes.
