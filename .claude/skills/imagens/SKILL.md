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

## Etapa 1: a editora tem receita?

A busca liga a ficha do jogo (`Editora original` e `Editora no Brasil` em `conteudo/<slug>.json`) às receitas pelo `nome` e pelos `apelidos`. Se faltar a editora:

1. `python3 tools/imagens/robo.py mapear <dominio> --nome "Nome da Editora"` grava a receita (plataforma, robots, sitemaps, kit de imprensa).
2. **Revise a receita**: o site final é mesmo da editora (domínio à venda e redirecionamento para outro dono acontecem)? Acrescente em `apelidos` as grafias da ficha (ex.: "NSV", "Z-Man"). Se o site não tiver sitemap ou a busca errar a página, fixe a URL em `paginas: {"<slug>": "<url>"}`.

## Etapa 2: buscar

`python3 tools/imagens/robo.py buscar <slug>` acha a página do jogo pelo sitemap (edições especiais e expansões perdem pontos), extrai as imagens (no Shopify, pelo JSON do produto; nos outros, por og:image, JSON-LD, galerias e srcset, sempre pedindo a maior versão), descarta as pequenas (< 800 px) e as duplicadas e monta `.cache/imagens/<slug>/folha.jpg` (grade numerada) e `candidatas.json`.

- Página certa fora do sitemap: `--url <página>`. Só uma editora: `--editora <dominio>`.
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

Salva `<slug>/fotos/<tipo>-N.webp` (até 1600 px, ≤ 400 KB) e atualiza `fontes.json`. Um tipo já aprovado não é trocado sem `--forcar`. Faça commit de `<slug>/fotos/` (nunca de `.cache/`).

Depois de aprovar, marque no `fontes.json` `"pessoas": true` nas fotos em que aparecem pessoas ou mãos (elas não vão para a página) e, se a melhor foto para o topo não for a mesa, `"principal": true` nela. O uso das fotos na página está em `PADRAO_EDITORIAL.md` (Fotos oficiais na página).
