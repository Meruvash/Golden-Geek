# Checklist de SEO: Elite Boardgamers

`[x]` feito e verificado no ar · `[ ]` pendente. A verificação das 22h (`tools/verificar_site.py`) confere sozinha os itens marcados com 🤖.

## Rastreamento e indexação
- [x] 🤖 `robots.txt` libera todos os robôs e aponta `sitemap.xml` e `sitemap-noticias.xml`
- [x] 🤖 Sitemap com todas as páginas publicadas, só URLs canônicas, `lastmod` real
- [x] Sitemap de notícias só com as notas das últimas 48 h
- [x] 🤖 Canonical autorreferente em todas as páginas (igual ao `og:url`)
- [x] Redirects: http → https, www → sem www, sem barra → com barra (GitHub Pages)
- [x] 404 de verdade (status 404) com página no visual do site e `noindex`
- [x] Arquivos internos fora do site (`_config.yml`)
- [x] Conteúdo principal no HTML inicial, inclusive a consulta Golden Geek
- [x] Paginação rastreável em `/noticias/` (30 por página; a 2ª página aparece sozinha na 31ª nota)

## Metadados
- [x] Títulos e descriptions únicos (varredura: 0 duplicados)
- [x] 🤖 Um H1 por página
- [x] Open Graph completo (`site_name`, `locale`, `type`, `url`, `image`) e `twitter:card`
- [x] Títulos de notícia mais curtos no `<title>` (`titulo_seo` em 10 notas; o H1 não muda)
- [x] Título de busca próprio em cada resenha (`titulo_busca`, ângulo da própria resenha, até 62 caracteres; obrigatório nas próximas)
- [x] Veredito com "<jogo> vale a pena?" em todas as resenhas

## Dados estruturados
- [x] 🤖 JSON-LD válido em todas as páginas (`Organization`, `WebSite`, `NewsArticle`, `Article`, `BreadcrumbList`)
- [x] 🤖 `datePublished` igual à data visível; `headline` igual ao H1 nas notícias
- [x] 🤖 Nenhum `Review`, `AggregateRating` ou `Product`

## Confiança (E-E-A-T)
- [x] Política editorial assinada, com link no rodapé
- [x] Autoria "Redação Elite Boardgamers" ligada à política
- [x] Fontes com data de consulta em notícias e resenhas
- [x] Data de publicação visível nas resenhas
- [x] Links internos: notícias ↔ resenhas do mesmo jogo, "Leia também" entre notícias

## Performance
- [x] Imagens responsivas (`srcset`) nas imagens principais
- [x] Fonte própria com `preload` e `font-display: swap`; CSS inline; zero JS externo
- [x] CLS 0 nas páginas medidas
- [ ] Confirmar LCP ≤ 2,5 s no p75 com dados reais (Search Console → Core Web Vitals)

## Ações externas (precisam de você)

### Google Search Console: feito em 28/10/2026 (verificação por arquivo HTML, os dois sitemaps enviados)
1. Acesse search.google.com/search-console e escolha **Propriedade de domínio** com `eliteboardgamers.com.br`.
2. Copie o registro TXT e adicione no DNS do domínio (no painel onde o domínio foi registrado, ex.: Registro.br). A validação pode levar algumas horas.
3. Em **Sitemaps**, envie `sitemap.xml` e `sitemap-noticias.xml`.
4. Em **Inspeção de URL**, teste a home, uma notícia e uma resenha e peça indexação.

### Bing Webmaster Tools: pendente (importar do Search Console). O IndexNow já avisa o Bing sozinho.
1. Acesse bing.com/webmasters e use **Importar do Google Search Console** (mais rápido) ou valide pelo DNS.
2. Envie os mesmos dois sitemaps.
3. IndexNow: feito; as rotinas avisam páginas novas ou alteradas depois de cada publicação.

### Medidor de visitas: feito em 28/10/2026
Cloudflare Web Analytics (sem cookies) em todas as páginas. Painel: dash.cloudflare.com → Web Analytics.
