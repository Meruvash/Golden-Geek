# Auditoria de SEO técnico: Elite Boardgamers

Data: 28/10/2026 · Escopo: repositório `meruvash/golden-geek` (branch `main`, commit `9d8d722`) e o site no ar `https://eliteboardgamers.com.br`.
Status: **diagnóstico, sem nenhuma alteração no site.** Os itens marcados como *validação externa* dependem de acesso que eu não tenho (Search Console, Bing Webmaster, DNS, dados reais de usuários).

> Este arquivo fica no repositório, mas não é publicado no site (a pasta `seo/` está listada em `_config.yml`).

---

## 1. Stack confirmada (inspecionada, não presumida)

| Item | Evidência |
|---|---|
| Hospedagem | GitHub Pages: header `server: GitHub.com`, CDN Fastly (`via: 1.1 varnish`), arquivo `CNAME` = `eliteboardgamers.com.br` |
| Build | **Sem framework.** HTML estático gerado por scripts Python e commitado: `tools/build_review.py` (resenhas), `tools/build_lista.py` (`/resenhas/`), `tools/build_home.py` (home, `/noticias/` e cada notícia). `consulta/index.html` é escrito à mão. |
| Pipeline do GitHub Pages | Publicação a partir da branch, com Jekyll padrão (não há `.nojekyll`, `_config.yml` nem `.github/workflows`). |
| Conteúdo | JSON em `conteudo/` (resenhas, notícias, lançamentos) + `pauta.json`. Sem banco de dados e sem CMS. |
| Publicação | Automatizada pelas skills `/noticias`, `/resenha` e `/verificacao`, que fazem commit e push direto na `main`. **Todo push na `main` é deploy.** |
| JavaScript | Nenhum script externo. A home e as notícias não têm JS. As resenhas têm 1 script inline (interações). A consulta Golden Geek tem 18,7 KB de JS inline que monta a lista. |
| CSS/fontes | CSS inline (13–20 KB), sem CSS que bloqueie a renderização. Fonte própria (Public Sans woff2) com `preload` e `font-display: swap`. |
| HTTPS/redirects | `http://` → 301 → `https://`. `www.` → 301 → domínio sem www. `/wingspan` → 301 → `/wingspan/`. Corretos. |

**Conclusão:** a arquitetura (HTML estático completo, sem depender de JS) já é a ideal para rastreamento. **Não há motivo para migrar de stack.** Todas as correções devem entrar nos geradores Python. Editar o HTML à mão seria apagado no próximo build.

## 2. Inventário de rotas públicas (50 páginas HTML)

| Template | Gerador | Qtde | Exemplo |
|---|---|---|---|
| Home | `build_home.py` | 1 | `/` |
| Lista de notícias | `build_home.py` | 1 | `/noticias/` |
| Notícia | `build_home.py` → `build_nota` | 20 | `/noticias/santuario-vence-deutscher-spiele-preis-2026/` |
| Lista de resenhas | `build_lista.py` | 1 | `/resenhas/` |
| Resenha | `build_review.py` | 26 | `/wingspan/` |
| Consulta Golden Geek | manual | 1 | `/consulta/` |
| 404 | (GitHub padrão) | — | qualquer URL inexistente |

Pastas de jogos em produção (`7-wonders-duel`, `arkham-horror-lcg`, `civolution`, `harmonies`, `heat-pedal-to-the-metal`, `seti`, `toy-battle`, `turing-machine`) têm fotos, mas ainda não têm `index.html`. Elas respondem 404 e não recebem links: estado correto.

Varredura automática das 50 páginas: **0 links internos quebrados, 0 títulos duplicados, 0 descriptions duplicadas, 0 páginas órfãs, 0 imagens sem `alt`, sem overflow horizontal a 360 px.**

## 3. Achados comprovados

Severidade: **P0** = bloqueio ou risco real de indexação/reputação · **P1** = ganho alto, sem risco · **P2** = refinamento.

### P0: bloqueios e riscos reais

**P0-1. Não existe sitemap nem robots.txt.**
Evidência: `curl /robots.txt` → 404; `curl /sitemap.xml` → 404.
Impacto: um robots.txt ausente não bloqueia nada (404 = tudo liberado). Mas sem sitemap a descoberta depende só de links, e não há `lastmod` para sinalizar notícias novas. Num domínio novo, com 5 notícias por dia, isso atrasa a descoberta.
Correção: gerar `sitemap.xml` (só URLs canônicas e indexáveis, com `lastmod` real vindo do git/JSON) e `robots.txt` apontando para ele, **dentro do pipeline** (`build_home.py`/`publicar.py`) para que fiquem sempre atualizados.

**P0-2. Arquivos internos publicados e indexáveis.**
Evidência (HTTP 200 no site no ar): `/PLANO_NOTICIAS.md`, `/PRODUCT.md`, `/PADRAO_EDITORIAL.md`, `/pauta.json`, `/tools/publicar.py`, `/lotes/imagens-2026-10-28.md`, `/modelos/referencia-1.jpg`, `/conteudo/wingspan.json`. Também ficam públicos `sky-team/fotos/reservadas/*.jpg` (fotos "reservadas", até 1,1 MB cada) e `modelos/referencia-*.jpg` (infográficos de referência, possivelmente de terceiros).
Impacto: páginas finas ou internas podem entrar no índice e competir com as reais. Elas também expõem o processo editorial e podem expor imagens sem licença de uso.
Verificado: **nenhum segredo exposto.** A chave da OpenAI é lida do ambiente (`tools/gerar_infografico_openai.py:57`). Nenhuma página faz `fetch()` desses JSONs, então eles não são necessários em produção.
Correção: `_config.yml` com `exclude:` (o Jekyll já roda; isto só deixa de publicar os arquivos). *Antes, confirmar que nenhuma automação lê esses arquivos pela URL pública.*

**P0-3. Nenhuma página tem `<link rel="canonical">`.**
Evidência: 0 de 50 páginas. O `og:url` existe, mas não substitui o canonical.
Impacto: as variantes `/wingspan/index.html` (200), `?utm=…` e `?v=` ficam sem consolidação declarada. Hoje o risco é moderado, porque o GitHub já redireciona http e www, mas links compartilhados com parâmetros vão se multiplicar (WhatsApp/Instagram).
Correção: canonical absoluto e autorreferente em todos os templates, igual ao `og:url`.

**P0-4. A página Golden Geek, central para a marca, é invisível para quem não executa JS.**
Evidência: o HTML de `/consulta/` tem **129 palavras**. Os resultados de 2015–2025 estão numa string `RAW` e são montados por JavaScript.
Impacto: o Googlebot renderiza JS (com atraso), mas o Bingbot renderiza de forma limitada, e OAI-SearchBot, PerplexityBot e Claude-SearchBot em geral **não executam JS**. Para eles, a página mais citável do site está vazia.
Correção: gerar a tabela no HTML inicial (mesmo visual) e manter os filtros em JS como aprimoramento progressivo. É preciso criar um gerador para essa página (hoje não existe).

**P0-5. Risco de política de spam por volume automatizado (risco, não penalidade comprovada).**
Evidência: segundo `pauta.json` e `conteudo/noticias/`, foram 26 resenhas desde 25/10/2026 e 20 notícias num único dia (28/10). A skill `/resenha` diz "publicação… sem esperar aprovação". O `PADRAO_EDITORIAL.md` exige que a opinião das resenhas seja "sempre atribuída" a terceiros, ou seja, as resenhas são **sínteses de fontes, não testes próprios**.
Impacto: as políticas do Google sobre *scaled content abuse* e o sistema de avaliações (*reviews system*) valorizam experiência própria e supervisão humana. O conteúdo é específico, com fontes e datas, o que conta a favor. Mas o volume, a automação total e a autoria genérica ("Redação") formam o perfil que essas políticas observam. **Isto não é uma correção de código: é uma decisão editorial sua** (veja a seção 5).

### P1: alto impacto, baixo risco

**P1-1. Zero dados estruturados (JSON-LD) no site.**
Evidência: 0 blocos `application/ld+json` em 50 páginas.
Plano por tipo de página (só com dados que já existem e estão visíveis):

| Página | Tipo | Fonte dos campos |
|---|---|---|
| Home | `WebSite` + `Organization` (logo `marca/elite-boardgamers.webp`, `sameAs` Instagram) | constantes do site |
| Notícia | `NewsArticle` + `BreadcrumbList` | `titulo`, `lide`, `imagem`, `data`/`publicado_em`, autor "Redação Elite Boardgamers" como `Organization` |
| Resenha | `Article` com `about: {"@type":"Game"}` + `BreadcrumbList` | `pauta.json → publicadas[].data` (publicação), git (modificação) |
| Consulta | `BreadcrumbList` (+ `Dataset` como hipótese P2) | — |

**Não usar:** `Review`/`reviewRating` (o site não dá nota própria, e o selo "Recomendado" não é uma nota), `AggregateRating` (a nota BGG é de terceiros; marcar isso viola as diretrizes), `Product`/`Offer` (o site não vende), `ProfilePage` (não há páginas de autor) e `VideoObject` (não há vídeos).

**P1-2. Datas sem marcação, e as resenhas não mostram data.**
As notícias exibem "28 de outubro de 2026" em texto, sem `<time datetime>` e sem `article:published_time`. As resenhas **não exibem data de publicação nem de atualização**, embora `pauta.json` tenha a data real e preços com "consulta em 27/10/2026".
Correção: `<time datetime>` visível nos dois templates, além de "Atualizado em" quando o JSON mudar de verdade.

**P1-3. Faltam transparência editorial e autoria.**
Não existem páginas de "Sobre", "Política editorial/correções" nem "Como fazemos as resenhas". A autoria é sempre "Redação Elite Boardgamers", sem link.
Correção: criar `/sobre/` e `/politica-editorial/` com conteúdo **escrito ou aprovado por você** (quem é o responsável, como as fontes são escolhidas, o que é o crivo, como pedir correção). Ligar essas páginas no rodapé e no `publisher` do JSON-LD. Nas resenhas, uma linha honesta como "Análise baseada em N fontes especializadas e dados do BGG/Ludopedia" (o que já é verdade).

**P1-4. Open Graph incompleto ou incorreto.**
As notícias usam `og:type=website` (o correto é `article`). Home, notícias e resenhas não têm `twitter:card` (só `/resenhas/` e `/consulta/` têm). `/noticias/` usa a capa de resenhas como imagem.

**P1-5. 404 padrão do GitHub, em inglês e sem navegação.**
O status 404 está correto (não há soft 404), mas a página não oferece caminho de volta. Correção: `404.html` com o visual do site, links para notícias, resenhas e consulta, e `noindex`.

**P1-6. `/noticias/` sem H1 e sem paginação.**
Evidência: 0 `<h1>` em `noticias/index.html`. A lista cresce cerca de 5 itens por dia numa página única.
Correção: H1 "Notícias de jogos de tabuleiro" e, antes de passar de ~40 itens, paginação rastreável com links `<a href>` reais (`/noticias/pagina/2/`) ou arquivo mensal.

**P1-7. Imagens de destaque grandes demais para mobile (LCP).**
Medição de laboratório (Playwright, perfil Moto G4, CPU 4x, ~1,6 Mbps, 150 ms; **dado de laboratório, não CrUX**):

| Página | LCP | Elemento LCP | CLS | Transferido |
|---|---|---|---|---|
| `/` | **4,42 s** | capa da manchete (1200×800 JPG, 186 KB) | 0,000 | ~691 KB |
| `/wingspan/` | **2,99 s** | `fotos/mesa-1.webp` (1600×1266) | 0,000 | ~454 KB |
| notícia Santuário | 1,18 s | capa 941×1000 | 0,000 | ~134 KB |
| `/noticias/` | 0,55 s | H3 | 0,000 | ~874 KB |
| `/consulta/` | 1,04 s | H1 | 0,000 | ~57 KB |

Não há `srcset`/`sizes` em nenhuma página: um celular de 360 px baixa imagens de 1200–1600 px. O `fetchpriority="high"` já está correto.
Correção: gerar variantes de 480/800/1200 px em WebP e usar `srcset`. Meta: LCP ≤ 2,5 s no p75 *real*, medido depois no CrUX/Search Console.
Bug encontrado: a capa da manchete declara `width="941" height="1000"`, mas o arquivo tem 1200×800. Hoje não causa CLS, mas a proporção declarada está errada.

**P1-8. Sitemap de notícias.**
É elegível tecnicamente: notícias com data, até 48 h. Hoje não é exigido cadastro no Publisher Center para isso. Gerar `sitemap-noticias.xml` só com notas das últimas 48 h. *Não usar a Google Indexing API* (ela só serve para vagas e transmissões ao vivo).

### P2: refinamentos

- **P2-1. Títulos longos nas notícias:** de 87 a 114 caracteres com " | Elite Boardgamers". O Google corta perto de 60. Proposta: campo opcional `titulo_seo` só para o `<title>`, mantendo o H1 completo. Nada de reescrever o sentido.
- **P2-2. Títulos das resenhas pouco descritivos:** "Wingspan: resenha | Elite Boardgamers". O `og_titulo` já tem uma versão melhor ("Wingspan vale a pena? Resenha…"). Avaliar unificar.
- **P2-3. A imagem OG de `/consulta/` está num CloudFront de terceiros:** é frágil e pode sumir. Hospedar no próprio domínio.
- **P2-4. `<meta http-equiv="Cache-Control" no-cache>` nas resenhas:** o HTTP real é `max-age=600` (GitHub), então a meta não tem efeito útil. Pode sair (limpeza).
- **P2-5. IndexNow (Bing/Yandex):** hospedar o arquivo-chave e enviar as URLs novas no fim do `publicar.py` e do `/noticias`.
- **P2-6. `llms.txt`:** apenas **experimental**. Nenhum buscador o trata como requisito de indexação. Só considerar depois de tudo acima.
- **P2-7. Consulta como `Dataset` / páginas por ano do Golden Geek:** só depois de P0-4, e com os dados que já existem em `RAW`.

### O que já está bom (não mexer)

HTML completo no servidor (exceto a consulta), `lang="pt-BR"`, um H1 por página (exceto `/noticias/`), `alt` em 100% das imagens, `width`/`height` declarados (CLS 0), `loading="lazy"` abaixo da dobra, zero JS externo, fonte própria com preload e `swap`, links internos 100% HTML rastreáveis, fontes citadas com data de consulta, separação entre fato, "Por que importa" e "Análise Elite Boardgamers", redirects 301 corretos.

## 4. Busca por IA (GEO) e crawlers

Teste com 7 user-agents contra `/wingspan/` (Googlebot, bingbot, OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot, Claude-SearchBot): **todos recebem 200 e o mesmo HTML (57.001 bytes).** Não há WAF, desafio JS nem cloaking. Como não existe robots.txt, todos estão liberados, **inclusive bots de treinamento** (GPTBot, ClaudeBot, Google-Extended, CCBot).

| Tipo | Exemplos | Efeito de bloquear |
|---|---|---|
| Busca | Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, Claude-SearchBot | some dos resultados e das citações |
| Treinamento | GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended | o conteúdo deixa de ser usado para treinar modelos; não afeta a busca do Google |

**Não vou alterar a política de bots de treinamento sem sua decisão** (seção 5). Do lado da GEO, o conteúdo já tem as boas práticas (lide com resposta direta, fontes, datas, "Em números"). O ganho real está em P0-4 (consulta em HTML), P1-1 (entidades claras) e P1-3 (autoria/transparência). Nenhuma dessas ações garante citação.

## 5. Decisões que dependem de você

1. **Supervisão editorial (P0-5):** manter a publicação 100% automática, ou adicionar uma revisão humana por amostragem e uma página de política editorial assinada por uma pessoa real? Recomendo a segunda.
2. **Bots de treinamento:** liberar (como hoje) ou bloquear GPTBot/ClaudeBot/Google-Extended/CCBot no robots.txt? Os bots de busca ficam liberados nos dois casos.
3. **Arquivos a despublicar (P0-2):** confirmar que `pauta.json`, `conteudo/`, `tools/`, `lotes/`, `modelos/`, `*.md` e `*/fotos/reservadas/` podem sair do ar.
4. **Páginas Sobre/Política editorial:** quem assina e quais informações de contato publicar.

## 6. Validação externa necessária (sem acesso daqui)

- **Search Console / Bing Webmaster:** não achei meta de verificação no HTML. Se existir, é por DNS. Preciso saber se as propriedades existem para enviar o sitemap.
- **Status de indexação:** uma busca pelo domínio não retornou nenhum resultado do site, o que é coerente com um domínio de dias, mas **não prova** que ele não está indexado. Só o GSC confirma.
- **Core Web Vitals reais (CrUX):** o tráfego provavelmente ainda é insuficiente para ter dados de campo.
- **Logs de bots:** o GitHub Pages não fornece logs de acesso. Para análise de bots, seria preciso colocar um CDN próprio (ex.: Cloudflare) na frente. Isso é uma mudança de infraestrutura e só com sua aprovação.
- **Analytics:** não há nenhum instalado.

## 7. Plano de execução por etapas

Cada etapa é um commit pequeno, numa branch separada, com teste automatizado. **Nada entra na `main` (= deploy) sem sua aprovação.**

| Etapa | Itens | Arquivos afetados | Risco |
|---|---|---|---|
| 1 | Canonical, `og:type=article`, `twitter:card`, H1 em `/noticias/`, correção das dimensões da capa | `build_home.py`, `build_review.py`, `build_lista.py`, `consulta/index.html` | baixo |
| 2 | `sitemap.xml` + `sitemap-noticias.xml` + `robots.txt` gerados no pipeline | novo `tools/build_sitemap.py`, chamado por `build_home.py`/`publicar.py` | baixo |
| 3 | `_config.yml` com `exclude` (após a decisão 3) | `_config.yml` | médio: muda o que é publicado |
| 4 | JSON-LD + `<time datetime>` + datas nas resenhas | os 3 geradores | baixo |
| 5 | `404.html` no padrão do site | novo | baixo |
| 6 | Consulta Golden Geek renderizada no HTML | novo `tools/build_consulta.py` | médio: visual precisa ficar idêntico |
| 7 | `srcset` + variantes WebP; medir antes e depois | geradores + script de imagens | médio |
| 8 | `/sobre/` e `/politica-editorial/` (texto aprovado por você), paginação de `/noticias/` | geradores | baixo |
| 9 | Testes: novo `tools/checar_seo.py` (canonical = og:url, JSON-LD válido, headline = H1, data visível = datePublished, sitemap só com URLs 200 e canônicas), integrado ao `verificar_site.py` | `tools/` | — |
| 10 | Arquitetura editorial: hubs só com dados reais (prêmios, modo solo, edição em português, lançamentos no Brasil); IndexNow; documentos finais (`CHECKLIST_SEO.md`, `RELATORIO_SEO_FINAL.md`, `PLANO_SEO_90_DIAS.md`) | — | — |

Atenção ao paralelismo: as automações diárias fazem push na `main` e regeram as páginas. As mudanças precisam ficar **nos geradores** e ser integradas com merge, sem reescrever o histórico.
