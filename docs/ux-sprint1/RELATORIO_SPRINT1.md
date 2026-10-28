# Sprint 1: bugs e consistência

Branch `ux/melhorias-fase0-sprint1`, um commit por item. Nada foi publicado: o GitHub Pages publica a `main`.

## O que mudou

| Item | Resultado | Arquivos |
|---|---|---|
| 1.1 Fonte "Golden Geek (consulta)" | Corrigido no template (`url_fonte`): URL antiga da raiz vira `/consulta/`. Só root e scythe citavam essa fonte; dados intactos | `tools/build_review.py` |
| 1.2 Âncora solta | "Voltar ao topo" aponta para `#topo` (header), alvo real; já tinha rótulo acessível | `tools/build_review.py` |
| 1.3 Volta das notícias | `/noticias/` (depois substituída pela trilha, ver 1.6) | `tools/build_home.py` |
| 1.4 Menu e estado ativo | Cabeçalho único em `tools/layout.py`. Logo → `/`, "Notícias" → `/noticias/`. `aria-current="page"` na página-índice da seção e `"true"` nas subpáginas. WhatsApp do cabeçalho ganhou `aria-label` (axe `link-name` em todas as páginas). Saiu o botão "Todas as resenhas" do cabeçalho da resenha (repetia o menu) | `tools/layout.py`, `build_home.py`, `build_review.py`, `build_lista.py`, `build_consulta.py`, `consulta/index.html` |
| 1.5 Rodapé único | Mesmo rodapé (7 links) em todas as páginas, inclusive `/consulta/`, cujas notas de fonte ficaram num bloco próprio | idem |
| 1.6 Breadcrumbs | Trilha visível em resenhas e notícias. JSON-LD `BreadcrumbList` já existia: não duplicado. Na notícia, a trilha substitui "← Todas as notícias". **Decisão:** o link "Resenhas" do menu fixo da resenha fica, porque é a única volta à lista no meio de uma resenha longa no celular | `tools/layout.py`, `build_review.py`, `build_home.py` |
| 1.7 Repetição | Tagline e selo de 3 para 2 (topo e Veredito). "Com quantos jogar" não era cópia oculta, eram duas listas visíveis: os quadrinhos ficaram `aria-hidden` e a lista de texto leva o nível | `tools/build_review.py` |
| 1.8 CTA do WhatsApp | Resenha: o CTA do topo desceu para depois de "Prós e contras" (2 no corpo). `/resenhas/` e `/consulta/`: CTA depois dos resultados | `build_review.py`, `build_lista.py`, `consulta/index.html`, `build_consulta.py` |
| 1.9 Open Graph | `noticias/capa.jpg` e `lancamentos/capa.jpg` em 1200×630 (novo `tools/capa_secoes.js`); `og:image:width/height` lidos do arquivo em todas as páginas de `build_home`/`build_calendario` | `tools/capa_secoes.js`, `build_home.py`, `build_calendario.py` |
| 1.10 Expansores | Já eram `<details>/<summary>` com o texto no HTML (conferido). Títulos dentro do `<summary>` continuam expostos como títulos no Chromium. Corrigido: setas ▾/▴ decorativas eram lidas pelo leitor de tela | `build_review.py`, `build_home.py` |
| Extra P2/P3 | Sem rolagem horizontal em 320 px; contraste AA no selo "com ressalvas" e em "Continuar lendo" | `build_review.py` |
| Extra P12 | Ordem de títulos sem saltos em `/noticias/` e na resenha | `build_home.py`, `build_review.py` |
| Build | `build_home.py` passa a regerar também `/resenhas/` | `build_home.py` |

## Verificação

| Checagem | Linha de base | Depois | Como |
|---|---|---|---|
| Build | ✅ | ✅ | `python3 tools/build_home.py` |
| `verificar_site.py` (links, imagens, SEO, sitemap, padrão editorial) | ✅ | ✅ | rodado antes de cada commit |
| Links internos quebrados | — | **0 de 978** URLs internas | `npx linkinator` sobre o servidor local, sem dependência no repositório |
| axe-core (WCAG 2.2 AA) | 7 páginas com violação | **0 violações em 52 páginas** (todas as resenhas, notícias e seções) | `@axe-core/playwright`, 375 px |
| Rolagem horizontal | /root/ em 320 px | **nenhuma em 52 páginas**, 320 e 375 px | Playwright |
| Lighthouse Acessibilidade | 91–96 | **100 nas 7 páginas** | `docs/ux-sprint1/resumo.md` |
| Lint / testes | não existem | não existem | — |

Lighthouse (laboratório, 1 execução por página, servidor local; diferenças de ±2 pontos em Performance são ruído):

| Página | Perf antes → depois | A11y | LCP | Peso |
|---|---|---|---|---|
| / | 97 → 99 | 95 → 100 | 2,5 → 2,0 s | 1135 → 1136 KB |
| /noticias/ | 99 → 99 | 93 → 100 | 1,7 → 1,7 s | 192 → 193 KB |
| /resenhas/ | 99 → 98 | 95 → 100 | 1,8 → 2,0 s | 737 → 828 KB* |
| /root/ | 97 → 97 | 91 → 100 | 2,4 → 2,3 s | 318 → 319 KB |
| /consulta/ | 97 → 97 | 96 → 100 | 2,1 → 2,1 s | 197 → 197 KB |
| /lancamentos/ | 73 → 73 | 96 → 100 | 4,5 → 4,6 s | 1085 → 1086 KB |
| notícia | 99 → 99 | 95 → 100 | 1,8 → 1,8 s | 112 → 113 KB |

\* Sem o CTA entre o título e a lista, mais cartões entram na primeira tela e o Lighthouse carrega mais capas: é o efeito desejado (conteúdo mais alto).

Não há dado de campo (CrUX).

## Pendências

1. **`docs/` no `_config.yml`**: aguardando seu OK para acrescentar `- docs` ao `exclude` (senão os relatórios vão para o ar).
2. **Capas de seção**: `lancamentos/capa.jpg` mostra capas do mês corrente e `noticias/capa.jpg` as notas recentes. Hoje só mudam se alguém rodar `node tools/capa_secoes.js`. Sugestão: incluir na rotina `/noticias` (mexe numa skill, por isso não fiz).
3. Os botões de filtro de `/resenhas/` e `/consulta/` não foram tocados: ficam para o Sprint 3.
