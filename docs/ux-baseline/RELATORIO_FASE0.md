# Fase 0: reconhecimento e linha de base

Data: 28/10/2026 · branch `ux/melhorias-fase0-sprint1` · commit de partida `eff429a`.

## 1. Stack, build e dados

| Item | O que o código mostra |
|---|---|
| Hospedagem | GitHub Pages (`CNAME` = eliteboardgamers.com.br). `_config.yml` só lista exclusões do Jekyll. |
| Gerador | **Não há framework nem build step no deploy.** Scripts Python em `tools/` geram HTML estático, que é commitado. |
| Comando de build | `python3 tools/build_home.py` regera tudo: home, notícias, arquivo `/noticias/`, política editorial, 404, as 26 resenhas, `/consulta/` (pré-render), `/lancamentos/` e sitemaps. Leva ~3 s e é reprodutível (rodar sem mudanças não gera diff). |
| Diretório de saída | A própria raiz do repositório (`index.html`, `<slug>/index.html`, `noticias/<slug>/index.html`...). |
| Lint e testes | Não há lint configurado nem suíte de testes. O equivalente é `python3 tools/verificar_site.py` (JSONs válidos, padrão editorial, links e imagens internos, SEO/canonical/OG/JSON-LD, sitemap; checa também se cada resenha bate com o que `build_review.py` gera). **Linha de base: passa (✅ tudo certo).** |
| Resenhas | `conteudo/<slug>.json` → `tools/build_review.py`. Lista: `pauta.json` (`publicadas`, 26) → `tools/build_lista.py`. |
| Notícias | `conteudo/noticias/*.json` (20) + `conteudo/home.json` (Em alta, Agenda, Financiamentos) → `tools/build_home.py`. |
| Golden Geek | **Não há JSON**: os dados vivem num bloco `const RAW` dentro de `consulta/index.html` (página mantida à mão); `tools/build_consulta.py` só pré-renderiza a tabela para robôs. 477 linhas. |
| Lançamentos | `conteudo/lancamentos/2026-MM.json` (API da Ludopedia, via `tools/noticias/coletar.py`) → `tools/build_calendario.py`. 646 itens, capas locais em `lancamentos/capas/<id>.webp`. |
| IDs para cruzamento | Lançamentos e notícias têm ID da Ludopedia. **Resenhas e Golden Geek não têm ID** (nem BGG nem Ludopedia): o cruzamento terá de ser por nome normalizado + nomes que já existem nos dados (`jogo`, `og_titulo`, `serie` da pauta). |
| Medição | **Já existe Cloudflare Web Analytics** (sem cookies) em todas as páginas (`tools/seo.py`, `ANALYTICS`), declarado na política editorial. Não mexi e não acrescento nada. |

## 2. Templates e componentes compartilhados

| Tipo de página | Gerador | Header/nav | Rodapé | CSS |
|---|---|---|---|---|
| Home, `/noticias/`, notícia, política, 404, `/lancamentos/` | `build_home.py` (`cabecalho()`, `rodape()`, `pagina()`) | `cabecalho()` | `rodape()`: completo (7 links) | `CSS` em build_home |
| Resenha | `build_review.py` | **cópia própria** (tem botão extra "Todas as resenhas") | **cópia própria**, sem Lançamentos | CSS próprio (~200 linhas) |
| `/resenhas/` | `build_lista.py` | **cópia própria** | **cópia própria**, sem Resenhas e Lançamentos | CSS próprio |
| `/consulta/` | HTML à mão | **cópia própria** | **cópia própria**, sem Notícias e Lançamentos | CSS próprio |

Duplicações: header + nav em 4 lugares, rodapé em 4 lugares, CTA de WhatsApp com 3 estilos (`.zap`, `.btn.zap`, `.zap-mini`), tokens de cor repetidos com nomes diferentes (`--gold`, `#e3b23c`, `--zap`...).

## 3. Linha de base (laboratório)

Arquivos: `resumo.md`, `lighthouse.json`, `axe.json`, `screens/*.jpg` (7 páginas × 320/375/768/1440 px). Script: `tools/ux/auditar.mjs`.
Lighthouse 12, perfil mobile, servidor local, medidor da Cloudflare bloqueado. **É dado de laboratório. Não há dado de campo (CrUX) disponível nesta sessão** (o site tem pouco tráfego para o CrUX público e não consultei a API).

| Página | Perf | A11y | BP | SEO | LCP | CLS | Peso | axe (375 px) | Rolagem horizontal |
|---|---|---|---|---|---|---|---|---|---|
| / | 97 | 95 | 100 | 100 | 2,5 s | 0 | 1135 KB | link-name (1) | não |
| /noticias/ | 99 | 93 | 100 | 100 | 1,7 s | 0 | 192 KB | link-name (1) | não |
| /resenhas/ | 99 | 95 | 100 | 100 | 1,8 s | 0 | 737 KB | link-name (1) | não |
| /root/ | 97 | 91 | 100 | 100 | 2,4 s | 0 | 318 KB | color-contrast (3), link-name (1) | **sim, 320 px** |
| /consulta/ | 97 | 96 | 100 | 100 | 2,1 s | 0 | 197 KB | link-name (1) | não |
| /lancamentos/ | **73** | 96 | 100 | 100 | **4,5 s** | 0 | 1085 KB | link-name (1) | não |
| /noticias/vantage-chega-ao-brasil/ | 99 | 95 | 100 | 100 | 1,8 s | 0 | 112 KB | link-name (1) | não |

Build: ✅ · `verificar_site.py`: ✅ · lint/testes: inexistentes.

## 4. Itens "observados" no prompt: confirmação no código

| Item | Procede? | Evidência |
|---|---|---|
| 1.1 Fonte "Golden Geek (consulta)" → `/` | **Sim, mas só em 2 resenhas** (root, scythe), e o erro está no **dado**, não no template | `conteudo/root.json:327`, `conteudo/scythe.json:260` (`https://eliteboardgamers.com.br/`) |
| 1.2 Link `#` no fim da resenha | Parcial: é o botão flutuante "Voltar ao topo", já tem `aria-label`. O problema real é o `href="#"` (não há alvo com id, e o foco não volta para o topo) | `build_review.py`, `layout_v2`, linha `<a class="voltar-topo" href="#">` |
| 1.3 "← Todas as notícias" → `/` | **Sim** | `build_home.py:499` (`href="{pre}"`) |
| 1.4 Menu "Notícias" → `/`; `aria-current` | "Notícias" → `/` **sim**. `aria-current` já existe e já marca Resenhas na resenha e Notícias na notícia; falta na política editorial (nada marcado) | `build_home.py:253`, `build_review.py` nav, `build_lista.py` nav, `consulta/index.html:113` |
| 1.5 Rodapés diferentes | **Sim**: 4 versões | ver seção 2 |
| 1.6 Breadcrumb | Visível: **não existe**. JSON-LD `BreadcrumbList`: **já existe** em resenha e notícia (não vou duplicar) | `build_review.py` (`seo.trilha`), `build_home.py:525` |
| 1.7 Tagline 3× e selo 3× | **Sim** (topo, Resumo em 30 s, Veredito). "Com quantos jogar" não é cópia oculta: são duas listas visíveis (`.tiles` com nível e `.tiles-txt` com o texto); o leitor de tela lê o nome do formato duas vezes | `root/index.html`; `build_review.py` `quem` |
| 1.8 WhatsApp 4× na resenha; CTA antes dos filtros | **Sim** nas 26 resenhas; **sim** em /resenhas/ e /consulta/ | `build_review.py` (topo `.zap` e "Gostou da resenha?"), `build_lista.py` `.topo`, `consulta/index.html:118` |
| 1.9 OG de /noticias/ e /lancamentos/ | **Sim**: `/noticias/` e política usam `resenhas/capa.jpg` (1200×630, mas é a arte das resenhas) sem width/height; `/lancamentos/` usa o logo `.webp` 318×254 | `build_home.py:397`, `build_calendario.py:356`, `pagina()` sem `og:image:width` |
| 1.10 Expansores | Já são `<details>/<summary>` e o texto oculto está no HTML. Ressalva: o "Por quê?" e "Fontes"/"Prêmios" põem `<h2>/<h3>` **dentro** do `<summary>`, o que tira a semântica de título em alguns leitores de tela | `build_review.py` `cartao()`, `fontes_bloco` |
| 3.1 /resenhas/ com 12 grupos abertos | **Não procede mais**: o commit `fc2f6e3` (o último antes desta branch) já moveu os filtros para uma gaveta com botão "Filtrar resenhas" e "Ver N resenhas", e o estado já vai para a URL | `build_lista.py` |
| 3.2 /consulta/ sem busca por nome | **Não procede**: já existe o campo "Pesquisar jogo pelo nome" (com normalização de acento). Os demais itens procedem: abre com 477, sem estado na URL, sem link para resenha. Ano/categoria por linha já somem no celular (≤600 px) e só aparecem no desktop | `consulta/index.html:122`, CSS `td.y,td.c{display:none}` |
| 3.3 /lancamentos/ | Capas já têm `loading="lazy"`, `width`/`height` e `decoding="async"`. Modal é `<dialog>` nativo com `aria-labelledby`. Selos "Resenha"/"Notícia" **não são links** (são `<span>` dentro do `<button>` do cartão; os links ficam no modal) | `build_calendario.py:114-118`, `:340` |
| 4.1 "Em alta" | **Não há dado de acesso**: é lista editorial em `conteudo/home.json` (`em_alta`, com "motivo") | `build_home.py:399-408` |
| 4.2 Paginação de /noticias/ | **Já existe**: 30 por página, `/noticias/pagina/N/` com `rel=prev/next` | `build_home.py:374-397` |

## 5. Tabela de problemas

| # | Problema | Evidência | Gravidade | Proposta |
|---|---|---|---|---|
| P1 | Botão do WhatsApp no header sem nome acessível no celular (≤700 px o texto some com `display:none`) | axe `link-name` em **todas** as 7 páginas (`.zap-mini`) | Alta (WCAG 4.1.2/2.4.4) | `aria-label` no link (Sprint 1, junto com 1.4/1.5) |
| P2 | Rolagem horizontal na resenha em 320 px | `screens/root-320.jpg`; `#b-legenda` e `.tiles` passam de 320 px | Média | permitir quebra nos botões `.post` e 2 colunas nos tiles abaixo de 360 px (Sprint 1) |
| P3 | Contraste insuficiente na resenha | axe `color-contrast` (3): `.r30 .nivel.sim`, "Continuar lendo" no bloco escuro, `.selo.publico` | Média (WCAG 1.4.3) | ajustar só as cores que falham, sem trocar paleta (Sprint 1) |
| P4 | Fonte "Golden Geek (consulta)" aponta para a home | `conteudo/root.json:327`, `scythe.json:260` | Média | corrigir o link no dado e normalizar no template (1.1) |
| P5 | Volta de notícia e menu "Notícias" levam à home | `build_home.py:253,499` | Média | apontar para `/noticias/` (1.3, 1.4) |
| P6 | 4 rodapés e 4 headers diferentes | seção 2 | Média | `rodape()`/`cabecalho()` de `build_home.py` como fonte única; resenha, lista e consulta passam a usar a mesma marcação (1.4, 1.5) |
| P7 | Sem breadcrumb visível | resenha e notícia | Baixa | breadcrumb visível; JSON-LD já existe (1.6) |
| P8 | Tagline e selo repetidos 3×; "Com quantos jogar" lido duas vezes | `root/index.html` | Baixa | tirar do Resumo em 30 s; unificar as duas listas de jogadores (1.7) |
| P9 | 2 CTAs de WhatsApp no corpo da resenha, um logo após a ficha; CTA empurra filtros em /resenhas/ e /consulta/ | ver item 1.8 | Média (mobile) | mover o do topo para o meio; mover CTA das listas para depois dos resultados (1.8) |
| P10 | OG de /noticias/, política e /lancamentos/ inadequado, sem dimensões | item 1.9 | Média (prévia do WhatsApp) | capas 1200×630 próprias + `og:image:width/height` (1.9) |
| P11 | Títulos dentro de `<summary>` | `build_review.py` | Baixa | manter `<details>`, título fora do `<summary>` onde for título de seção (1.10) |
| P12 | Ordem de títulos pulando nível | Lighthouse `heading-order` em /noticias/ (h1 → h3) e /root/ | Baixa | ajustar níveis no arquivo de notícias (1.4/1.6) |
| P13 | `href="#"` no "Voltar ao topo" | `build_review.py` | Baixa | `href="#topo"` com alvo real no topo (1.2) |
| P14 | /lancamentos/ lenta no laboratório (Perf 73, LCP 4,5 s, DOM 4.706 nós, 600 KB de HTML) | `lighthouse.json` | Média | Sprint 3.3 (`content-visibility`, medir antes/depois) |
| P15 | Sem busca global | — | Média | Sprint 2 (Pagefind) |
| P16 | /consulta/ abre com 477 linhas, sem estado na URL, sem link para resenha | `consulta/index.html` | Média | Sprint 3.2 |

## 6. Pontos que precisam de decisão sua

1. **`docs/` vai para o ar.** O GitHub Pages converte `.md` sem front matter em página (plugin `optional-front-matter`), então `docs/ux-baseline/*.md` e os screenshots seriam publicados. Proponho acrescentar `- docs` à lista `exclude` do `_config.yml` (uma linha, mesmo padrão de `seo` e `tools`). Como a regra 2 veta mexer em configuração de hospedagem, **não fiz**: preciso do seu OK antes do merge.
2. **Golden Geek sem ID.** Os aliases do Sprint 2 e o link "Ler resenha" do Sprint 3.2 terão de cruzar por nome normalizado, usando só nomes já presentes nos dados.
3. **Rotinas automáticas.** As skills `/noticias`, `/resenha` e `/verificacao` regeram as páginas a partir de `tools/`. Toda mudança é feita nos geradores, nunca no HTML de saída (exceto `/consulta/`, que é a própria fonte).
