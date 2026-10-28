---
name: imagens
description: Busca as imagens oficiais de um jogo (capa, mesa montada, jogabilidade e componentes) nos sites das editoras, respeitando o robots.txt, e salva em <slug>/fotos/ com crédito. Use quando pedirem "/imagens <jogo>", "fotos oficiais", "imagens da editora" ou na etapa de imagens da resenha.
---

# Imagens oficiais das editoras

Ferramenta: `tools/imagens/robo.py`. Receitas por editora: `tools/imagens/editoras.json`. Cache (fora do git): `.cache/imagens/`.

## Regras que não mudam

- **O robots.txt manda.** O robô confere cada URL (inclusive o CDN das imagens) antes de pedir e espera pelo menos 3 s entre pedidos no mesmo host (mais, se o `Crawl-delay` pedir).
- **401/403 é um não.** Nunca troque o User-Agent, não use proxy nem navegador para contornar um bloqueio. Editora bloqueada recebe o pedido de kit de imprensa (rascunho no relatório do lote), que **o usuário** envia se quiser.
- **Erro de rede não é bloqueio.** Receita com `status: "erro"` deve ser mapeada de novo mais tarde.
- **Sempre com crédito.** Cada foto aprovada fica registrada em `<slug>/fotos/fontes.json` com editora, página e URL de origem.
- Só imagens do jogo: nada de logos, banners, anúncios de outros jogos ou artes de propaganda com letreiro quando houver foto limpa.

## Ordem das fontes

1. **Editora original**: site e kit de imprensa.
2. **Editoras licenciadas em outros países**: mesma arte e mesmas fotos, vindas da editora original (ex.: The Mind pela Pandasaurus nos EUA, Detective pela Pegasus na Alemanha). Mapeie a licenciada, fixe a página em `paginas` e aprove com `--nota "edição dos EUA"`. Ache as licenciadas na página do jogo no site do Spiel des Jahres (lista a editora alemã) ou pela busca na web.
3. **Premiações**: o Spiel des Jahres publica as fotos das cerimônias em CC BY-SA 4.0 (crédito "Foto: Spiel des Jahres e.V. | CC BY-SA 4.0") e manda imagens em alta para a imprensa por presse@spiel-des-jahres.de.
4. **Pedido direto** (e-mail ou mensagem no Instagram da editora), que o usuário envia: modelo no relatório do lote.
5. **Licença livre** (Wikimedia Commons, Flickr CC): a mais segura, mas quase nunca tem jogos modernos. A API do Commons é proibida pelo robots.txt; ache as páginas de arquivo pela busca na web.

Não use: galeria do BoardGameGeek (fotos de usuários, e o site bloqueia robôs), Ludopedia, lojas (Amazon etc.), Google Imagens, Pinterest, nem baixar ou raspar o Instagram (os termos da Meta proíbem). Post do Instagram só incorporado com o código oficial e com autorização de quem postou.

Antes de confiar num domínio, confira o conteúdo: domínios de jogos mudam de dono (`flatoutgames.com` está à venda; `detectiveboardgame.com` virou um podcast polonês).

Fotos próprias que o usuário manda antes da hora ficam em `<slug>/fotos/reservadas/` com um `reservadas.json` (descrição, tipo sugerido, crédito). Fora do `fontes.json` elas não vão para a página; antes de buscar imagens de um jogo, confira se ele tem reservadas.

## Etapa 1: a editora tem receita?

A busca liga a ficha do jogo (`Editora original` e `Editora no Brasil` em `conteudo/<slug>.json`) às receitas pelo `nome` e pelos `apelidos`. Se faltar a editora:

1. `python3 tools/imagens/robo.py mapear <dominio> --nome "Nome da Editora"` grava a receita (plataforma, robots, sitemaps, kit de imprensa).
2. **Revise a receita**: o site final é mesmo da editora (domínio à venda e redirecionamento para outro dono acontecem)? Acrescente em `apelidos` as grafias da ficha (ex.: "NSV", "Z-Man"). Se o site não tiver sitemap ou a busca errar a página, fixe a URL em `paginas: {"<slug>": "<url>"}`.

## Etapa 2: buscar

`python3 tools/imagens/robo.py buscar <slug>` acha a página do jogo pelo sitemap (edições especiais e expansões perdem pontos), extrai as imagens (no Shopify, pelo JSON do produto; nos outros, por og:image, JSON-LD, galerias e srcset, sempre pedindo a maior versão), descarta as pequenas (< 800 px) e as duplicadas e monta `.cache/imagens/<slug>/folha.jpg` (grade numerada) e `candidatas.json`.

- Página certa fora do sitemap: `--url <página>`. Só uma editora: `--editora <dominio>`.
- Site montado com JavaScript (página quase vazia sem ele): o `mapear` marca `"js": true` na receita e o robô passa a abrir as páginas num Chromium sem janela (`tools/imagens/navegador.js`, Playwright do Node). O navegador pergunta ao robô antes de cada pedido se o robots.txt permite, não baixa imagens, fontes nem CSS e usa o mesmo User-Agent; as imagens vêm depois pelo cliente com pausa.
- Vários jogos: `python3 tools/imagens/robo.py lote [slug ...]` (sem argumentos, todos os jogos sem `fotos/fontes.json`) grava `lotes/imagens-<data>.md` com ✅/⚠️/⛔ por jogo e o e-mail de pedido para as editoras bloqueadas.

## Etapa 3: escolher (revisão visual)

Abra a folha de contato com Read e escolha pelo que a imagem mostra, não pelo palpite do nome do arquivo:

| Tipo | O que vale | Quantas |
|---|---|---|
| `capa` | caixa do jogo, de frente ou em 3D, de preferência com fundo limpo | 1 |
| `mesa` | o jogo montado na mesa, visto de cima ou em ângulo | 1–2 |
| `jogabilidade` | partida em andamento: mãos, pessoas jogando, jogada no meio | 1–2 |
| `componentes` | peças, cartas, tabuleiros, miniaturas | 1 |

Prefira foto sem texto por cima. Se faltar algum tipo, deixe sem; não force uma imagem errada.

## Etapa 4: aprovar

`python3 tools/imagens/robo.py aprovar <slug> capa=1 mesa=11 jogabilidade=13,8 componentes=15`

Foto de outra edição ou versão do jogo: acrescente `--nota "foto da 2ª edição"`, que vai no crédito embaixo da foto (ex.: Gloomhaven). Salva `<slug>/fotos/<tipo>-N.webp` (até 1600 px, ≤ 400 KB) e atualiza `fontes.json`. Um tipo já aprovado não é trocado sem `--forcar`. Faça commit de `<slug>/fotos/` (nunca de `.cache/`).

Depois de aprovar, marque no `fontes.json` `"pessoas": true` nas fotos em que aparecem pessoas ou mãos (elas não vão para a página) e, se a melhor foto para o topo não for a mesa, `"principal": true` nela. Marque também `"texto": true` nas fotos com texto por cima ou em outra língua. Por último rode `python3 tools/imagens/crivo.py --aplicar <slug>`: ele aplica o crivo de qualidade (PADRAO_EDITORIAL.md, "Crivo de qualidade das fotos"), escolhe a foto do topo, a de Como é jogar e a caixa, e libera a página com `"usar_na_pagina": true`. Se nenhuma foto passar para o topo, a página continua com o infográfico. O uso das fotos na página está em `PADRAO_EDITORIAL.md` (Fotos oficiais na página).
