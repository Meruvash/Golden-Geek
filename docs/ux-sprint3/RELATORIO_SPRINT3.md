# Sprint 3: filtros de resenhas, Consulta Golden Geek e Lançamentos

Antes do sprint, a pedido do usuário, foram instalados no projeto `addyosmani/web-quality-skills` (6 skills) e o Chrome DevTools MCP v1.12.0 (`.mcp.json` + 4 skills). O diagnóstico de 3.3 seguiu a skill `core-web-vitals`. O servidor MCP só conecta numa sessão nova, então as medições abaixo são do Lighthouse.

## 3.1 /resenhas/ (`tools/build_lista.py`)

A gaveta com "Ver N resenhas" e o estado na URL já existiam desde antes do Sprint 1.

| Pedido | Feito |
|---|---|
| 4 grupos visíveis, resto em "Mais filtros" | Jogadores, Melhor para, Duração e Complexidade à vista; Estilo, Mecânica, Prêmio, Idade, Preço, modo solo e edição em português num `<details>` "Mais filtros", com contador e aberto sozinho se um deles vier ativo pela URL |
| Chips removíveis + "Limpar tudo" | Etiquetas abaixo da barra, fora da gaveta, cada uma com nome acessível "Remover filtro …" |
| Contagem por opção ou opção desabilitada | As duas coisas: cada opção mostra quantas resenhas sobram, e a que zeraria fica desabilitada |
| Estado vazio útil | Sugere até 3 filtros para tirar, com quantas resenhas voltam |
| Nenhuma faceta removida | Confirmado |

## 3.2 /consulta/ (`consulta/index.html`, `tools/build_consulta.py`)

| Pedido | Feito |
|---|---|
| Estado inicial | Ano mais recente (2025), todas as categorias: 42 linhas em vez de 477, com "Ver todos os anos". Pesquisar por nome antes de escolher um ano procura em todos (senão "Root" não acharia nada em 2025). O HTML pré-renderizado continua com as 477 linhas para buscadores |
| Busca por nome com normalização e aliases | Já existia busca; agora usa a regra e os apelidos da busca do site |
| Linha compacta | Colocação + jogo; ano e categoria só no cabeçalho do grupo. Selo "aparições" mantido |
| "Ler resenha" | 23 jogos, por nome normalizado (não há ID nos dados) |
| Estado na URL | `ano`, `categoria`, `colocacao`, `peso`, `q`, `jogo`. Sem interação, a URL fica limpa |
| Dados | Intactos. Checagem de consistência: 159 linhas ano+categoria, todas com 3 colocados, sem duplicatas nem grafias divergentes. Nada a reportar |

## 3.3 /lancamentos/ (`tools/build_calendario.py`)

Diagnóstico: o elemento LCP era o parágrafo de texto do topo; o tempo vinha do download do HTML (588 KB, metade dele um JSON por cartão que repetia o que o cartão já mostra). Lazy loading, `width`/`height` e `decoding` das capas já estavam corretos.

| Pedido | Feito |
|---|---|
| lazy/width/height, `content-visibility` medido | Capas já estavam certas. `content-visibility:auto` por mês com altura reservada: estilo/layout ~300 → ~100 ms, pintura ~175 → ~83 ms (mesma página com e sem a regra) |
| Abrir no mês corrente sem esconder os outros | Antes a página mostrava **só** o mês corrente. Agora mostra o ano inteiro e abre rolada até o mês, com o chip à vista |
| Modal | `<dialog>` nativo: foco preso, Esc fecha, `aria-labelledby`; acrescentado `aria-modal`; verificado que o foco volta ao cartão |
| Selos "Resenha"/"Notícia" como links | Eram texto dentro do botão; agora são links reais, alvo ≥ 24 px |
| Extra | HTML 588 → 299 KB (comprimido 55 → 40 KB); 4 primeiras capas do mês corrente com prioridade; busca do calendário por palavras |

Lighthouse mobile em /lancamentos/ (laboratório, servidor local sem compressão; média de 3 execuções onde indicado):

| | Antes | Depois |
|---|---|---|
| Performance | 73 | 86–88 |
| FCP | 4,4 s | 2,9 s |
| LCP | 4,5 s | 3,2–3,6 s |
| HTML | 588 KB | 299 KB |
| Peso total | 1085 KB | 1209 KB* |

\* Mais capas carregam porque o ano inteiro fica na lista e a página abre no meio dela; continuam lazy.

**Dado de campo:** não há. A API pública do PageSpeed recusou por cota diária sem chave. Com o Chrome DevTools MCP (sessão nova) os traces trazem CrUX quando a página tem tráfego suficiente.

## Verificação

| Checagem | Resultado |
|---|---|
| Build + `verificar_site.py` | ✅ |
| Teste da busca (25 verificações) | ✅ |
| axe-core, 52 páginas + gaveta de filtros aberta + Consulta vazia | 0 violações |
| Rolagem horizontal 320/375 px | nenhuma |
| Erros de JavaScript nos fluxos testados | nenhum |
| Lighthouse 7 páginas | `resumo.md`: Acessibilidade 100 em todas; Performance 85–99 |

## Pendências

- Com a página servida comprimida (GitHub Pages), o FCP real de /lancamentos/ tende a ser menor que o de laboratório, mas isso só se confirma com dado de campo.
- O DOM de /lancamentos/ continua com ~4.700 nós (646 cartões). Reduzir mais exigiria paginar o calendário, o que muda a página e fica fora do pedido.
