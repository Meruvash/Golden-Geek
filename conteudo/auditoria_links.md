# Auditoria de links — 2026-11-04T19:02-03:00

Gerado por `tools/auditoria_links.py` (robô com User-Agent próprio, 1 pedido a cada 2 s por domínio, robots.txt respeitado). Links de oferta com ERRO saem do /black/ na próxima geração da página.

**Ofertas no /black/:** 199 links, 189 certos, 1 com erro, 9 não verificáveis.

## Por tipo de link

| Tipo | ok | ERRO | não verificável | não conferido |
|---|---|---|---|---|
| oferta | 152 | 1 | 8 | 0 |
| oferta (mais lojas) | 37 | 0 | 1 | 0 |
| achado | 14 | 0 | 1 | 0 |
| cupom | 5 | 0 | 0 | 0 |
| loja | 63 | 4 | 3 | 0 |
| preço | 92 | 0 | 0 | 0 |
| outro | 0 | 0 | 0 | 1225 |

## Por loja (links conferidos)

| Domínio | ok | ERRO | não verificável |
|---|---|---|---|
| comparajogos.com.br | 92 | 0 | 0 |
| caixinhaboardgames.com.br | 52 | 1 | 0 |
| bravojogos.com.br | 31 | 0 | 0 |
| amazon.com.br | 27 | 1 | 0 |
| placegames.com.br | 28 | 0 | 0 |
| tabuloja.com | 25 | 0 | 0 |
| facilshopping.com.br | 20 | 0 | 0 |
| playeasy.com.br | 16 | 0 | 0 |
| mercadolivre.com.br | 0 | 0 | 11 |
| alquimistasdosjogos.com.br | 9 | 0 | 0 |
| mecadosjogos.com.br | 9 | 0 | 0 |
| cangaiajogos.com.br | 6 | 1 | 1 |
| tavernareal.com | 7 | 0 | 0 |
| leaolivros.com.br | 5 | 0 | 0 |
| brecholudico.com.br | 4 | 0 | 0 |
| masmorra.com.br | 4 | 0 | 0 |
| boardgamebarato.com.br | 3 | 0 | 0 |
| ludostation.com.br | 3 | 0 | 0 |
| magazineluiza.com.br | 0 | 2 | 1 |
| mosaicoloja.com.br | 3 | 0 | 0 |
| animusludere.com.br | 2 | 0 | 0 |
| livtoys.com.br | 2 | 0 | 0 |
| loja.frodosbg.com.br | 2 | 0 | 0 |
| odisseiajogos.com.br | 2 | 0 | 0 |
| omniverse.com.br | 2 | 0 | 0 |
| paladinsgames.com.br | 2 | 0 | 0 |
| borderjogos.com.br | 1 | 0 | 0 |
| espacoarcs.com.br | 1 | 0 | 0 |
| guildadosjogos.com.br | 1 | 0 | 0 |
| happynerd.com.br | 1 | 0 | 0 |
| loja.joyjoycafe.com.br | 1 | 0 | 0 |
| pittasboardgames.com.br | 1 | 0 | 0 |
| spaceboardgames.com.br | 1 | 0 | 0 |

## Erros (5)

- **oferta** — Ticket to Ride: Alemanha: <https://www.caixinhaboardgames.com.br/produtos/ticket-to-ride-alemanha-pre-venda-rh596/> (/black/) — página não existe (404)
- **loja**: <https://www.amazon.com.br/grok-games/s?k=grok+games> (/santuario/) — link é de busca ou categoria, não da página do produto
- **loja**: <https://www.cangaiajogos.com.br/endeavor-mar-profundo> (/endeavor-deep-sea/) — página sem sinal de produto (sem JSON-LD Product/Offer, og:type product nem preço e botão de compra)
- **loja**: <https://www.magazineluiza.com.br/busca/nemesis+jogo+de+tabuleiro/> (/nemesis/) — link é de busca ou categoria, não da página do produto
- **loja**: <https://www.magazineluiza.com.br/busca/wingspan+tabuleiro> (/wingspan/) — link é de busca ou categoria, não da página do produto

## Não verificáveis (13)

- **oferta (mais lojas)** — Quest: <https://www.cangaiajogos.com.br/jogos/jogos-para-a-familia/quest> (/black/) — sem resposta (ConnectionError)
- **oferta** — CATAN: <https://www.mercadolivre.com.br/p/MLB19050659> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — Hungry Hungry Hippos Grab & Go: <https://www.mercadolivre.com.br/p/MLB34102404> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — Happy Salmon: <https://www.mercadolivre.com.br/p/MLB35091678> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — Dixit: <https://www.mercadolivre.com.br/p/MLB50321038> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — UNO Stacko: <https://www.mercadolivre.com.br/p/MLB51032628> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — HITSTER: <https://www.mercadolivre.com.br/p/MLB61316731> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — Detetive: <https://www.mercadolivre.com.br/p/MLB74523091> (/black/) — robots.txt proíbe robôs nesta página
- **oferta** — Hitster: Lado B: <https://www.mercadolivre.com.br/p/MLB75109813> (/black/) — robots.txt proíbe robôs nesta página
- **loja**: <https://www.magazineluiza.com.br/gloomhaven-board-game-galapagos-galapagos/p/af327976gh/br/jogo/> (/gloomhaven/) — robots.txt respondeu 403 (bloqueio)
- **loja**: <https://www.mercadolivre.com.br/ark-nova-jogo-de-tabuleiroboard-game-grok/p/MLB23073841> (/ark-nova/) — robots.txt proíbe robôs nesta página
- **achado**: <https://www.mercadolivre.com.br/p/MLB62080613> (/black/) — robots.txt proíbe robôs nesta página
- **loja**: <https://www.mercadolivre.com.br/root-board-game-meeplebr-pt-br/p/MLB19709898> (/root/) — robots.txt proíbe robôs nesta página
