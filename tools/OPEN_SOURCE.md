# Projetos open source no Elite Boardgamers

Levantamento de 03/11/2026, pedido do usuário: "projetos open source que ajudam a conseguir imagens e a encontrar
preços de produtos em sites". Regra que vale para todos: respeitar o robots.txt, se identificar como
EliteBoardgamers/1.0 e parar quando o site bloquear.

## Em uso no projeto

| Projeto | Licença | Para quê | Onde |
|---|---|---|---|
| [Protego](https://github.com/scrapy/protego) (Zyte/Scrapy) | BSD-3 | Ler robots.txt pela RFC 9309, com curingas `*` e `$` (o leitor do Python não entende curingas) | tools/black/lojas.py |
| [price-parser](https://github.com/scrapinghub/price-parser) (Zyte) | BSD-3 | Transformar "R$ 1.299,90", "199,90" ou "1,299.90" em número | tools/black/lojas.py |
| [OpenCV](https://github.com/opencv/opencv) + [YuNet](https://github.com/opencv/opencv_zoo/tree/main/models/face_detection_yunet) | Apache 2 / MIT | Alerta de rosto de frente nas fotos da triagem (regra do usuário: mãos e perfil podem, rosto de frente não). Ilustração de carta e de caixa também dispara: é alerta, não reprova | tools/imagens/rostos.py, tools/imagens/crivo.py |
| [Requests](https://github.com/psf/requests) | Apache 2 | Todas as leituras | todo o projeto |
| [Pillow](https://github.com/python-pillow/Pillow) | MIT-CMU | Medir, recortar, achatar fundo transparente e converter fotos | tools/imagens/, tools/black/ |
| [feedparser](https://github.com/kurtmcdonald/feedparser) | BSD-2 | Feeds RSS das notícias | tools/noticias/coletar.py |
| [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) + [lxml](https://github.com/lxml/lxml) | MIT / BSD | Ler HTML de páginas | tools/ |
| [Playwright](https://github.com/microsoft/playwright) | Apache 2 | Testar o site no celular e no computador; renderizar páginas que só montam com JavaScript (robots.txt conferido a cada pedido) | tools/ux/, tools/imagens/navegador.js |
| Padrões abertos [schema.org Product/Offer](https://schema.org/Offer), Open Graph, `product:price:amount` | aberto | Preço e estoque que a própria loja declara na página | tools/black/lojas.py |
| WooCommerce Store API e Shopify `products.json` (APIs públicas das plataformas, código aberto no caso do WooCommerce) | GPL / pública | Catálogo inteiro da loja, sem login, quando o robots.txt permite | tools/black/feeds.py |

## Testados e deixados de fora (por enquanto)

| Projeto | Por quê |
|---|---|
| [extruct](https://github.com/scrapinghub/extruct) (Zyte) | Não instala neste ambiente (a dependência jstyleson não compila); o leitor de JSON-LD próprio faz o mesmo para preço e estoque |
| Classificador Haar do OpenCV | Confundia cartas e caixas com rostos; trocado pelo YuNet. Também saiu do OpenCV 5 (o projeto fixa o 4.x) |
| [imagehash](https://github.com/JohannesBuchner/imagehash) | Instalado, mas o robô de fotos já tem o seu dhash para achar fotos repetidas |
| [Openverse API](https://api.openverse.org/) (WordPress, imagens com licença Creative Commons) | Não respondeu daqui (tempo esgotado). Para usar, a regra das fotos do usuário precisa aceitar foto de terceiros com licença CC, não só foto oficial da editora |
| [Wikimedia Commons API](https://commons.wikimedia.org/w/api.php) | Respondeu 429 (limite de pedidos) daqui. O robô de fotos já tem a função `commons` para quando funcionar |

## Aplicativos open source de rastreio de preço (referência; precisam de servidor próprio)

O site é estático (GitHub Pages), então estes não rodam nele; servem de referência de técnica:

- [changedetection.io](https://github.com/dgtlmoon/changedetection.io): vigia páginas e avisa quando o preço muda (lê JSON-LD como o nosso robô).
- [PriceBuddy](https://github.com/jez500/pricebuddy) e [Discount Bandit](https://github.com/Cybrarist/Discount-Bandit): rastreadores de preço auto-hospedados.
- [Scrapy](https://github.com/scrapy/scrapy) (Zyte): o arcabouço de robôs de onde vêm a Protego e o price-parser.
- [board-game-scraper](https://gitlab.com/recommend.games/board-game-scraper) (Recommend.Games): base de dados de jogos, sem preço de lojas brasileiras.
