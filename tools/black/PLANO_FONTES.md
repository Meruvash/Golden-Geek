# Radar Black de Verdade: plano de fontes sem cadastro

Pedido do usuário em 03/11/2026: o máximo de promoções, do maior número de fontes, sem API paga, sem cadastro,
só com o que é público e liberado. Regra que não muda: respeitar o robots.txt, se identificar como
EliteBoardgamers/1.0 e parar quando o site bloquear.

## Fontes ligadas

| # | Fonte | O que traz | Robô | Frequência |
|---|---|---|---|---|
| 1 | Compara Jogos: páginas de produto (sitemap público) | Preço de dezenas de lojas, 30 dias de histórico, nota BGG | educado (lista inteira), normal (quedas e candidatos) | 3 h / 30 min |
| 2 | Compara Jogos: página "price-drops" | As maiores quedas de preço do momento | normal | 30 min |
| 3 | Páginas de produto das lojas (JSON-LD, metas) | Preço e estoque confirmados na loja | normal (2 s) e educado (6 s, 60/dia) | 30 min / 3 h |
| 4 | Catálogos públicos das lojas (WooCommerce Store API, Shopify products.json) | Catálogo inteiro da loja num pedido | educado (descobre a plataforma 1x por semana) | 3 h, cache de 12 h |
| 5 | Feeds de produtos enviados pelas lojas (Google Shopping XML) | Catálogo inteiro, sem visitar páginas | educado | cache de 12 h |
| 6 | Promobit: categoria de brinquedos e página da Black Friday | Promoções postadas pela comunidade (Amazon, ML, Magalu...) | normal | 30 min |
| 7 | Promobit: cupons por loja | Cupons das grandes lojas | educado | 3 h |
| 8 | Telegram: prévia pública dos canais (t.me/s/...) | Promoções postadas por Compara Jogos, Ludofertas, BG Turbo Ofertas, Board Oferta, GameBox Tabuleiro | normal | 30 min |
| 9 | Páginas inicial/promoções das lojas | Cupons anunciados | educado | 3 visitas/dia por loja |

## Fontes testadas e descartadas (robots.txt proíbe ou o site bloqueia)

Amazon, Mercado Livre (site), Magalu, Casas Bahia, Zoom, Buscapé, Reddit, Hardmob, Mastodon (mastodon.social),
Ludofertas (páginas de ofertas), API pública do Mercado Livre sem cadastro (403), busca do Bluesky sem login (403),
Ludopedia (regra do usuário: só por busca). Não há projeto open source brasileiro de comparador de preço de jogos de
tabuleiro em atividade (busca de 03/11/2026).

## Próximas fontes (quando houver tempo)

- Mais canais públicos do Telegram: a lista do fórum do Compara Jogos (tópico "Grupos de WhatsApp e Telegram")
  é revista uma vez por semana; canais que viram bazar de usados ficam de fora.
- Lojas novas que aparecerem no Compara Jogos entram sozinhas no teste de catálogo público (fonte 4).
- Respostas das lojas aos e-mails pedindo feed (fonte 5).
