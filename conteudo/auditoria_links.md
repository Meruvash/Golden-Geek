# Auditoria de links — 2026-11-16T04:17-03:00

Gerado por `tools/auditoria_links.py` (robô com User-Agent próprio, 1 pedido a cada 2 s por domínio, robots.txt respeitado). Links de oferta com ERRO saem do /black/ na próxima geração da página.

**Ofertas no /black/:** 180 links, 139 certos, 4 com erro, 37 não verificáveis.

## Por tipo de link

| Tipo | ok | ERRO | não verificável | não conferido |
|---|---|---|---|---|
| oferta | 107 | 5 | 35 | 0 |
| oferta (mais lojas) | 32 | 0 | 2 | 0 |
| achado | 9 | 0 | 0 | 0 |
| cupom | 4 | 0 | 0 | 0 |
| loja | 79 | 2 | 3 | 0 |
| preço | 139 | 2 | 0 | 0 |
| outro | 0 | 0 | 0 | 1625 |

## Por loja (links conferidos)

| Domínio | ok | ERRO | não verificável |
|---|---|---|---|
| comparajogos.com.br | 139 | 2 | 0 |
| mercadolivre.com.br | 0 | 4 | 30 |
| caixinhaboardgames.com.br | 27 | 1 | 0 |
| bravojogos.com.br | 26 | 0 | 0 |
| placegames.com.br | 25 | 0 | 0 |
| alquimistasdosjogos.com.br | 19 | 0 | 0 |
| amazon.com.br | 8 | 1 | 9 |
| omniverse.com.br | 18 | 0 | 0 |
| mecadosjogos.com.br | 14 | 0 | 0 |
| playeasy.com.br | 10 | 0 | 0 |
| tabuloja.com | 9 | 0 | 0 |
| facilshopping.com.br | 8 | 0 | 0 |
| tavernareal.com | 6 | 1 | 0 |
| cangaiajogos.com.br | 6 | 0 | 0 |
| leaolivros.com.br | 6 | 0 | 0 |
| masmorra.com.br | 6 | 0 | 0 |
| tabulerio.com.br | 6 | 0 | 0 |
| paladinsgames.com.br | 5 | 0 | 0 |
| brecholudico.com.br | 4 | 0 | 0 |
| lojameeplebrjogos.com.br | 3 | 0 | 0 |
| ludostation.com.br | 3 | 0 | 0 |
| mosaicoloja.com.br | 3 | 0 | 0 |
| odisseiajogos.com.br | 3 | 0 | 0 |
| boardgamebarato.com.br | 2 | 0 | 0 |
| loja.joyjoycafe.com.br | 2 | 0 | 0 |
| animusludere.com.br | 1 | 0 | 0 |
| borderjogos.com.br | 1 | 0 | 0 |
| elfosecia.com.br | 1 | 0 | 0 |
| espacoarcs.com.br | 1 | 0 | 0 |
| happynerd.com.br | 1 | 0 | 0 |
| livtoys.com.br | 1 | 0 | 0 |
| loja.frodosbg.com.br | 1 | 0 | 0 |
| magazineluiza.com.br | 0 | 0 | 1 |
| modoaviaobg.com.br | 1 | 0 | 0 |
| pandaboardgames.com.br | 1 | 0 | 0 |
| pittasboardgames.com.br | 1 | 0 | 0 |
| spaceboardgames.com.br | 1 | 0 | 0 |
| tubaleria.store | 1 | 0 | 0 |

## Erros (9)

- **oferta** — Ticket to Ride: Alemanha: <https://www.caixinhaboardgames.com.br/produtos/ticket-to-ride-alemanha-pre-venda-rh596/> ((fora do site: retirada do /black/ pela auditoria)) — página não existe (404)
- **oferta** — A Iniciativa: <https://www.mercadolivre.com.br/p/MLB22709368?pdp_filters=item_id:MLB5652240400> (/black/) — redireciona para página de “não encontrado” (produto saiu da loja)
- **oferta** — Hungry Hungry Hippos Grab & Go: <https://www.mercadolivre.com.br/p/MLB34102404?pdp_filters=item_id:MLB3741193397> (/black/) — redireciona para página de “não encontrado” (produto saiu da loja)
- **oferta** — Perfil 7: <https://www.mercadolivre.com.br/p/MLB40442410?pdp_filters=item_id:MLB5210816888> (/black/) — redireciona para página de “não encontrado” (produto saiu da loja)
- **oferta** — Buckaroo!: <https://www.mercadolivre.com.br/p/MLB8950241?pdp_filters=item_id:MLB4043512373> (/black/) — redireciona para página de “não encontrado” (produto saiu da loja)
- **loja**: <https://www.amazon.com.br/s?k=mysterium+kids> (/mysterium-kids/) — link é de busca ou categoria, não da página do produto
- **preço**: <https://www.comparajogos.com.br/item/clash-royale-the-grand-arena> (/noticias/clash-royale-the-grand-arena-kickstarter/) — página não existe (404)
- **preço**: <https://www.comparajogos.com.br/item/satisfactory> (/noticias/satisfactory-reta-final-quase-3-milhoes/) — página não existe (404)
- **loja**: <https://www.tavernareal.com/tabuleiro/luz-final-edicao-deluxe> (/last-light/) — página sem sinal de produto (sem JSON-LD Product/Offer, og:type product nem preço e botão de compra)

## Não verificáveis (40)

- **oferta** — Identidade Secreta: <https://www.amazon.com.br/dp/B07CSFZD5D> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta (mais lojas)** — Anachrony: Edição Essencial: <https://www.amazon.com.br/dp/B09FTMW8ZH> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Enigma de Hogwarts Harry Potter: <https://www.amazon.com.br/dp/B09Q5H5JD7> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Horizontes de Spirit Island: <https://www.amazon.com.br/dp/B0BBSHZFLB> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Duna: Imperium: <https://www.amazon.com.br/dp/B0BD5TP5TL> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Marvel United: Deadpool: <https://www.amazon.com.br/dp/B0BNLMVZW9> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Dixit: Disney Edition: <https://www.amazon.com.br/dp/B0CFS3GZFL> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Tromba N'Água: <https://www.amazon.com.br/dp/B0CZBLHMXD> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Piratas!: <https://www.amazon.com.br/dp/B0FSG5BB5D> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — UNO Flip!: <https://www.mercadolivre.com.br/p/MLB16092602?pdp_filters=item_id:MLB3992344771> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Imagem & Ação Júnior: <https://www.mercadolivre.com.br/p/MLB19492018?pdp_filters=item_id:MLB3625532207> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Cilada: <https://www.mercadolivre.com.br/p/MLB19525478?pdp_filters=item_id:MLB4304112336> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — War: Game of Thrones: <https://www.mercadolivre.com.br/p/MLB19709546?pdp_filters=item_id:MLB3961858733> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Jogo da Rima: <https://www.mercadolivre.com.br/p/MLB19709959?pdp_filters=item_id:MLB5495621455> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Skip-Bo: <https://www.mercadolivre.com.br/p/MLB19719743?pdp_filters=item_id:MLB4632178297> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Super Cats: <https://www.mercadolivre.com.br/p/MLB19807546?pdp_filters=item_id:MLB7970556384> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Na Ponta da Lingua: <https://www.mercadolivre.com.br/p/MLB20270328?pdp_filters=item_id:MLB4302754925> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Cães POP: <https://www.mercadolivre.com.br/p/MLB21150345?pdp_filters=item_id:MLB5487190699> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Pie Face: <https://www.mercadolivre.com.br/p/MLB21419841?pdp_filters=item_id:MLB7706752846> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Mixtapes: <https://www.mercadolivre.com.br/p/MLB21702939?pdp_filters=item_id:MLB6501179920> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — UNO: Toy Story 4: <https://www.mercadolivre.com.br/p/MLB22278055> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — O Senhor dos Anéis: Card Game (Revised Core Set): <https://www.mercadolivre.com.br/p/MLB22531167?pdp_filters=item_id:MLB5509623123> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Perfil Express: Filmes e Séries: <https://www.mercadolivre.com.br/p/MLB22659012?pdp_filters=item_id:MLB4647459246> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Pandemic: <https://www.mercadolivre.com.br/p/MLB22813201?pdp_filters=item_id:MLB4186308332> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Palpite Certo: <https://www.mercadolivre.com.br/p/MLB23425290?pdp_filters=item_id:MLB3625614489> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Cai-Não-Cai: <https://www.mercadolivre.com.br/p/MLB25811837?pdp_filters=item_id:MLB4598515657> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta (mais lojas)** — Sleeping Gods: Dungeons: <https://www.mercadolivre.com.br/p/MLB26098574?pdp_filters=item_id:MLB3913887582> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Uno Flex!: <https://www.mercadolivre.com.br/p/MLB35742049?pdp_filters=item_id:MLB5337457588> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Revanche: <https://www.mercadolivre.com.br/p/MLB38492802?pdp_filters=item_id:MLB7417796102> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Candy Land: <https://www.mercadolivre.com.br/p/MLB47329717?pdp_filters=item_id:MLB6214538674> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Trava Letras: <https://www.mercadolivre.com.br/p/MLB48880144?pdp_filters=item_id:MLB4170926219> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Tapalavras: <https://www.mercadolivre.com.br/p/MLB59487551?pdp_filters=item_id:MLB4503565085> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Liar's UNO: <https://www.mercadolivre.com.br/p/MLB62548317?pdp_filters=item_id:MLB6293749138> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — UNO Flip Attack: <https://www.mercadolivre.com.br/p/MLB70580092?pdp_filters=item_id:MLB6901090112> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Monopoly: Go to Jail: <https://www.mercadolivre.com.br/p/MLB75359225> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Imagem & Ação: <https://www.mercadolivre.com.br/p/MLB8857424?pdp_filters=item_id:MLB4195144346> (/black/) — a loja pede verificação anti-robô (captcha)
- **oferta** — Tapa Certo: <https://www.mercadolivre.com.br/p/MLB9228977?pdp_filters=item_id:MLB3544942779> (/black/) — a loja pede verificação anti-robô (captcha)
- **loja**: <https://www.magazineluiza.com.br/gloomhaven-board-game-galapagos-galapagos/p/af327976gh/br/jogo/> (/gloomhaven/) — robots.txt respondeu 403 (bloqueio)
- **loja**: <https://www.mercadolivre.com.br/ark-nova-jogo-de-tabuleiroboard-game-grok/p/MLB23073841> (/ark-nova/) — a loja pede verificação anti-robô (captcha)
- **loja**: <https://www.mercadolivre.com.br/root-board-game-meeplebr-pt-br/p/MLB19709898> (/root/) — a loja pede verificação anti-robô (captcha)
