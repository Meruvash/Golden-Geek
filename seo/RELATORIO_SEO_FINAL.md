# Relatório final de SEO: Elite Boardgamers

Período: 28/10/2026 · Responsável editorial: Anderson Pelicioni de Castro · Diagnóstico completo em `seo/AUDITORIA_SEO.md`.

Todas as mudanças estão na `main` (no ar) e foram feitas nos **geradores** (`tools/`). Assim, as rotinas diárias de notícias, resenhas e verificação mantêm tudo sozinhas.

## Antes e depois (evidências)

| Item | Antes | Depois | Como foi medido |
|---|---|---|---|
| `robots.txt` | 404 | 200, libera todos os robôs e aponta os sitemaps | `curl` no site no ar |
| `sitemap.xml` | 404 | 51 URLs, `lastmod` real | idem |
| Sitemap de notícias | não existia | notas das últimas 48 h | idem |
| Canonical | 0 de 50 páginas | todas as páginas | `tools/checar_seo.py` contra o site no ar |
| Dados estruturados (JSON-LD) | 0 páginas | todas; 0 erros e 0 avisos | validator.schema.org (home, notícia, resenha, listas, consulta) |
| Datas legíveis por máquina | nenhuma | `<time datetime>` em notícias e resenhas | `checar_seo.py` (data visível = `datePublished`) |
| Data visível nas resenhas | não havia | "Resenha publicada em … · com base em N fontes" | inspeção |
| Arquivos internos publicados | 102 (planos, pauta, tools, fotos reservadas) | 0 (404) | Jekyll 3.10 local + `curl` no ar |
| Página 404 | padrão do GitHub, em inglês | no visual do site, `noindex`, com links | `curl` (status 404 mantido) |
| Consulta Golden Geek sem JS | 129 palavras | ~4.700 palavras, 477 resultados | Playwright com JS desligado |
| H1 em `/noticias/` | ausente | presente, com o mesmo visual | captura antes/depois |
| Transparência | sem página institucional | `/politica-editorial/` assinada, no rodapé de todas as páginas | inspeção |
| LCP da home (laboratório) | 3,8 s · 716 KB | 1,7 s · 284 KB | Playwright, Moto G4, 1,6 Mbps, CPU 4x, mediana de 3 |
| LCP da resenha Wingspan (laboratório) | 2,8 s · 497 KB | 2,0 s · 357 KB | idem |
| CLS | 0,000 | 0,000 | idem |

**Os números de LCP são de laboratório**, não de usuários reais. Os dados de campo (CrUX/Search Console) só vão existir quando houver tráfego suficiente.

## Mudanças por arquivo

| Arquivo | O que mudou |
|---|---|
| `tools/build_home.py` | canonical, `og:site_name`/`og:locale`/`twitter:card`, `og:type=article` e `article:published_time` nas notícias, H1 em `/noticias/`, JSON-LD (`WebSite`, `NewsArticle`, `BreadcrumbList`), `<time>`, dimensões reais da manchete, `404.html`, `/politica-editorial/`, `srcset`; no fim, chama `build_consulta` e `build_sitemap` |
| `tools/build_review.py` | canonical, `twitter:card`, JSON-LD `Article` sobre o `Game`, linha de publicação visível, `srcset` na foto do topo, link para a política no rodapé, chama `build_sitemap` |
| `tools/build_lista.py` | canonical, `BreadcrumbList`, `srcset` nas capas, link para a política |
| `tools/build_sitemap.py` | novo: sitemap, sitemap de notícias, robots.txt e registro de `lastmod` (`conteudo/sitemap_estado.json`) |
| `tools/build_consulta.py` | novo: escreve no HTML a tabela do Golden Geek que o JS monta |
| `tools/imagens_resp.py` | novo: variantes WebP em `img/` |
| `tools/seo.py` | novo: JSON-LD centralizado |
| `tools/checar_seo.py` | novo: testes de canonical, og:url, H1, JSON-LD, datas e tipos proibidos |
| `tools/verificar_site.py` | roda `checar_seo` e confere o sitemap |
| `tools/publicar.py` | chama `build_sitemap` no fim |
| `consulta/index.html` | canonical, JSON-LD, tabela pré-gerada, link para a política |
| `_config.yml` | novo: exclui os arquivos internos do site |
| `.claude/skills/{noticias,resenha,verificacao}/SKILL.md` | incluir no commit os arquivos que os scripts regeram |

## Decisões registradas

- **Robôs de busca e de IA liberados**, inclusive os de treinamento (decisão do responsável: prioridade a SEO e GEO).
- **Sem `Review`, `AggregateRating` nem `Product`.** O site não dá nota própria (a nota exibida é a do BGG, de terceiros) e não vende jogos.
- **Uso de IA declarado** na política editorial, com verificação pessoal do responsável.
- **`llms.txt` não implementado.** Não é requisito de nenhum buscador; fica como experimento opcional.
- **Google Indexing API não usada.** Ela não se aplica a notícias.

## Pendências que dependem de acesso externo ou de decisão

1. **Google Search Console e Bing Webmaster Tools:** criar as propriedades e enviar os sitemaps (passo a passo em `CHECKLIST_SEO.md`).
2. **Dados reais de Core Web Vitals:** aguardar tráfego e acompanhar no Search Console.
3. **Paginação de `/noticias/`:** necessária antes de ~40 notas (ver o plano de 90 dias).
4. **IndexNow (Bing):** depende do Bing Webmaster; pode ser automatizado no fim do pipeline.
5. **Logs de robôs:** o GitHub Pages não fornece. Só com um CDN próprio na frente (mudança de infraestrutura, a decidir).
