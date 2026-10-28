# Plano de SEO para 90 dias: Elite Boardgamers

Ponto de partida (28/10/2026): a base técnica está pronta (ver `RELATORIO_SEO_FINAL.md`). O domínio é novo, então a autoridade se constrói com tempo, constância e citações. Nada aqui garante posição, indexação ou citação em IA.

## Dias 1–15: medir

- Criar Search Console e Bing Webmaster e enviar os dois sitemaps (`CHECKLIST_SEO.md`).
- Registrar a linha de base: páginas indexadas, impressões, cliques, consultas.
- Paginação de `/noticias/` (`/noticias/pagina/2/` com links `<a href>` reais) antes de passar de ~40 notas.
- Automatizar o IndexNow no fim de `build_home.py`/`publicar.py`, depois que o Bing estiver validado.
- Conferir no Search Console os relatórios de "Páginas" e "Dados estruturados" e corrigir o que aparecer.

## Dias 15–45: arquitetura editorial (só com dados reais)

Páginas-hub criadas a partir de campos que já existem nos JSONs, sem texto artificial:

| Hub | Fonte dos dados | Quando criar |
|---|---|---|
| `/premios/`: Golden Geek, Spiel des Jahres, As d'Or, DSP | `premiacoes` das resenhas + notícias da categoria "Prêmios" + consulta | já há volume |
| `/lancamentos-no-brasil/` | `conteudo/lancamentos/*.json` (Ludopedia) + notícias "Chegando ao Brasil" | já há volume |
| `/modo-solo/` | campo "Modo solo oficial" da ficha das resenhas | com 8+ jogos confirmados |
| `/em-portugues/` | `edicao_nacional` das resenhas | com 10+ jogos confirmados |
| Editoras (`/editoras/<nome>/`) | editora no Brasil das fichas + notícias | só com 5+ itens por editora |
| Guias e comparativos | campo `comparacoes` das resenhas | só com escrita própria e revisada; nunca gerados em massa |

- Links internos contextuais: cada notícia sobre um jogo resenhado já liga para a resenha. Fazer o caminho inverso: um bloco "Notícias sobre este jogo" na resenha.
- Golden Geek: uma página por ano (`/consulta/2025/`), com os dados do bloco RAW, só se o Search Console mostrar demanda por "golden geek 2025" e termos parecidos.

## Dias 45–90: conteúdo e GEO

- Com dados do Search Console: identificar páginas com muitas impressões e CTR baixo e ajustar o `<title>` (campo `titulo_seo`), sem caça-clique e sem mudar o sentido.
- Canibalização: conferir consultas em que duas URLs nossas disputam (ex.: notícia de prêmio e resenha do mesmo jogo) e reforçar o link entre elas, em vez de apagar.
- Perguntas reais (do Search Console e do grupo de WhatsApp) viram seções nas resenhas ("Com quantos jogar", "Primeira partida"), nunca FAQ inventado.
- Atualizar preços e disponibilidade das resenhas mais vistas (a data muda sozinha no sitemap quando o JSON muda).

## Acompanhamento de citações em IA (método manual)

As plataformas não oferecem painel de citações, então o acompanhamento é por amostragem:

1. Uma lista fixa de ~20 perguntas reais ("vale a pena Ark Nova", "vencedores Golden Geek 2025", "jogos de tabuleiro lançados no Brasil em novembro").
2. Uma vez por mês, fazer as perguntas no ChatGPT (busca), Perplexity, Gemini e Copilot e anotar numa planilha se o site aparece citado e com qual URL.
3. Cruzar com o tráfego de referência (`chatgpt.com`, `perplexity.ai`) quando houver um analytics.
4. Tratar os números como tendência, não como métrica exata: as respostas variam a cada consulta.

## Monitoramento contínuo

| O quê | Onde | Frequência |
|---|---|---|
| Erros automáticos (sitemap, canonical, JSON-LD, links) | verificação das 22h | diária (já roda) |
| Páginas indexadas e motivos de exclusão | Search Console → Páginas | semanal |
| Impressões, CTR e posição por página e consulta | Search Console → Desempenho | semanal |
| Core Web Vitals reais | Search Console → Core Web Vitals | mensal |
| Backlinks | Search Console → Links | mensal |
| Citações em IA | planilha manual | mensal |
