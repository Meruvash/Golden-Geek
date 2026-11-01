# Dossiê: Como jogar Tiny Epic Cthulhu

Produzido em 01/11/2026 seguindo `docs/como-jogar/BRIEF.md` e a Parte 2 de `PROMPT_PILOTO.md`. Jogo pedido pelo editor. Rascunho: `"publicar": false` até a auditoria independente.

## 1. Fontes

| Fonte | Versão | Onde | Data |
|---|---|---|---|
| **Manual oficial da edição brasileira**, Asmodee (selo Galápagos), *Tiny Epic Cthulhu*, SKU TNE151 | PDF de 24 páginas (arquivo `TECth_Rulebook Sarah V4 Edit_pt-BR_v1.01.indd`), "v1.0" impresso na p. 24, código TECt01; criado em 24/04/2025, modificado em 08/04/2026; tradução de Fabio Macedo, revisão de Camila Loricchio e Luis Perdomo; ©2024 Gamelyn Games | Biblioteca de downloads oficial, https://www.asmodee.com.br/download-library; arquivo https://api-prd.mundogalapagos.com.br/library-download/store/file?id=3045&tagId=2&group=b2 | baixado pelo editor/sessão em 01/11/2026; lido nesta sessão |
| Página do produto TNE151, Asmodee Brasil | API pública da loja (`/ccstore/v1/products/TNE151`) | https://www.asmodee.com.br/tiny-epic-cthulhu/produto/TNE151 | 01/11/2026 |
| Manual original em inglês (Gamelyn Games) | não consultado | o manual brasileiro está completo e pesquisável | |
| FAQ ou errata oficial | não encontrada nesta sessão | | |

Extração: `pdftotext -layout` e `pdftotext -raw` por página, e as páginas renderizadas a 110 e 300 dpi para ler ilustrações (setup p. 5, Tabuleiro do Grande Antigo p. 8, ícones da Roleta p. 10, figuras das p. 9, 12, 13, 15, 16 e 17, apêndice p. 23 e 24 a 200 dpi). O texto das habilidades dos seis personagens e dos Poderes impressos nos tabuleiros veio da camada de texto da p. 3 (`-raw`), porque a imagem é pequena demais. Nada copiado para o repositório além dos recortes de figura.

Página do produto: 1 a 4 participantes, "30-60 min", faixa etária 14+, modo "Cooperativo", tipo "Caixa-base". Nome do jogo como no manual (p. 6) e na página: *Tiny Epic Cthulhu*.

Procura: autocomplete do Google em 01/11/2026 devolve "como jogar tiny epic cthulhu" para a própria busca, e "tiny epic cthulhu ludopedia", "... review", "... bgg" para o nome. Resenha no Elite: não há pasta `tiny-epic-cthulhu/` nem `conteudo/tiny-epic-cthulhu.json` (campo `resenha`: null).

Vídeos (busca do canal Duque com `Accept-Language: pt-BR`, depois oEmbed): *TINY EPIC CTHULHU - Gameplay resumida*, Duque Board Games, `rJiMyjUP5ac` (é partida, não regras); por isso entrou um segundo, de regras: *Tiny Epic Cthulhu - Como Jogar*, Romir Play House, `pTqsKlLxVWg` (busca do YouTube; título e canal pelo oEmbed). Nenhum quadro de vídeo baixado; nenhum segundo de vídeo citado dentro das etapas.

Figuras (`como-jogar/tiny-epic-cthulhu/figuras/`, recortes a 300 dpi, webp q80, até 1000 px): `preparacao` (p. 5), `surgir` (p. 12), `maldicao` (p. 9), `banir` (p. 15), `traduzir` (p. 15), `selar` (p. 17). Mantêm só rótulos curtos do diagrama; os parágrafos do manual ficaram fora do recorte.

## 2. Glossário (termos da edição brasileira)

| Termo impresso | Página | Uma linha |
|---|---|---|
| Roleta da Loucura; Ponteiro Frontal; Ponteiro de Tentáculo (parte traseira) | 4, 10 | giro do 1º Passo; a ponta da frente escolhe a carta dos tentáculos e a Ação do Ponteiro; a de trás, a carta e a cor do Rastejador |
| Carta de Cidade; Habilidade do Local da Cidade / Ação da Cidade; Indicador de Surgimento de Rastejador | 7, 15 | os 5 locais; ação especial da carta; cores na borda interna |
| Trilhas de Loucura (Trilha de Tentáculos da Loucura) | 7, 11 | trilhas de Medo, Fúria e Ganância da Carta de Cidade |
| Trilha de Rastejadores; Rastejador | 7, 12 | trilha de baixo para cima; 15 meeples, 5 por cor |
| Tentáculos da Loucura: Medo (azul), Fúria (vermelho), Ganância (verde) | 4, 24 | 45 peças; recurso e motor |
| Tentáculo do Caos | 4, 12, 14 | 17 peças roxas; curinga e ação adicional |
| Tentáculo Ancestral | 4, 11 | 23 peças pretas; enchem a Trilha de Energia |
| Bolsa de Compra de Tentáculos; estoque geral | 4 | |
| Tabuleiro de Rastejadores; Tabuleiro de Descarte | 4, 9 | reservas |
| Tabuleiro do Grande Antigo; Meeple de Força; Trilha de Força; Trilha de Energia; Poderes do Grande Antigo; Alcance de Controle | 8 | |
| Tabuleiro do Necronomicon; Fichas de Página; capítulos | 5, 15 | grade 5 x 5 com 10 Tentáculos do Caos nas bordas |
| Carta de Página; Custo de Tentáculos; Números da Página; Cor da Runa; runa | 7, 16 | |
| Tabuleiro de Jogador; Trilha de Delírio; Ficha de Cérebro; Trilhas de Temperamento; Trilha de Caos | 6 | |
| Amaldiçoado/Amaldiçoada; Realocação; Consequência | 9, 10 | |
| Dados de Cthulhu; rerrolar | 8, 12 | faces 0, 1 e 2 |
| Primeira Fase; Segunda Fase; Traduzir o Necronomicon; Selar os Portais | 6 | |
| Mover-se; Coletar Tentáculos da Loucura; Banir um Rastejador; Usar uma Ação da Cidade; Traduzir uma Carta de Página; Selar um Portal; Selar uma Cor | 12 a 17 | |
| Portal; local de Portal | 16 | 3 Portais, 2 locais cada |
| Detetive, Policial, Historiadora, Cientista, Médico, Sacerdote | 3, 5 | personagens |
| Assistente; Modo de Partida Solo; Modo Difícil; Modo Loucura | 3, 18 | |

O tutorial usa "carta A, B, C, D" só como rótulo de exemplo; o manual não nomeia as cidades no texto (a única visível nas ilustrações é "Biblioteca").

## 3. Base de regras

Classificação: [V] verificada (lida nesta sessão), [I] interpretada, [L] lacuna.

**Objetivo e fim.** Cooperativo; vitória com os 6 locais de Portal selados [BR p. 16 e 18] [V]. Derrota: Força no último espaço de qualquer lado; Tabuleiro de Rastejadores sem Rastejadores; Ficha de Cérebro no topo da Trilha de Delírio [BR p. 18] [V]. "A partida termina imediatamente" [BR p. 18] [V].

**Preparação** [BR p. 4 e 5] [V]: passos 1 a 12, Nyarlathotep recomendado na primeira partida, distribuição de Caos por número de jogadores (contas fecham em 17 nas três contagens), Ancestral sorteado no passo 12 volta para a bolsa. Ordem dos giros: GA, Rastejadores, jogadores [V]; um giro por Rastejador [I], porque "gire uma vez para cada um dos seguintes meeples" (p. 4) está no plural e o passo 10B fala em "1 Rastejador por jogador". Primeiro jogador: o mais jovem, sentido horário [BR p. 6] [V]. Dificuldade [BR p. 3] [V].

**Turno.** Dois passos [BR p. 6 e 10] [V]. Roleta: duas voltas, linha = próximo local horário [BR p. 10] [V]. Ordem 1-A a 1-D [BR p. 10] [V]. Ícones da Ação do Ponteiro [BR p. 10, imagem] [V]. Quantidade comprada: número à direita do Meeple de Força [BR p. 11] [V]; a p. 10 diz "dois" [I: segue a p. 11, regra detalhada com exemplo]. Destino de cada tipo [BR p. 11] [V]. Bolsa insuficiente [BR p. 11] [V]. Surgimento e cor [BR p. 12] [V]; cor em falta [BR p. 12] [V]. Mover o GA [BR p. 12] [V]. Passar a bolsa [BR p. 17] [V].

**Maldições** [BR p. 9 a 12] [V]: definição (cheia + mais uma peça); sobra vai para a trilha esvaziada (p. 10); Trilha de Loucura (Poder da cor, só a trilha da cor); Energia (Ancestrais + Loucura e Caos do Descarte para a bolsa, Força +1) [I: p. 8 diz Descarte; seguidas p. 10 e 11]; Caos (estoque geral); Rastejadores (1 Ancestral da carta ao Descarte e reposição do estoque) [I: "o Tentáculo Ancestral" no singular lido como um]; Temperamento (Ficha de Cérebro +1). Tamanhos de trilha: Temperamento e Caos com 2 espaços (limite de 2 na p. 13; ilustração p. 6), Energia com 2 (ilustração p. 8), Loucura da cidade com 3 (ilustrações p. 7 e 9) [V por ilustração].

**Poderes** [BR p. 8 e 23, texto dos tabuleiros p. 3] [V]: Nyarlathotep (Rastejador da cor onde não houver), Yog-Sothoth (descarta página com runa da cor), Yig (jogadores devolvem tentáculos da cor ao Tabuleiro de Rastejadores), Cthulhu (distribui tentáculos da cor do Tabuleiro de Rastejadores). Alcance: carta do GA e as duas vizinhas [I: p. 23 e textos dos Poderes; a p. 8 diz "Carta de Cidade indicada pela Roleta"]. Destino da página descartada por Yog-Sothoth [L].

**Ações** [BR p. 12 a 17] [V]: até 3, repetíveis; 1 Caos por ação adicional; Mover-se (0/1/2 Medo = 1/2/3, uma ação, virar página onde parar, proibição do GA na Primeira Fase, saída obrigatória se o GA está no local no início do turno, tirar 1 tentáculo por Rastejador ao parar); Coletar (0/1/2 Ganância = 1/2/3, máximo 2 por trilha, nunca amaldiçoa); Banir (1 dado por Rastejador, maior dado, mesma cor, Caos curinga ao estoque geral, sem pagar não bane, 0/1/2 Fúria no começo = move 1/2/3 da cor do Rastejador); Ação da Cidade (uma vez por turno, gasto vai ao Descarte/estoque); Traduzir (custo, fichas no espaço livre mais à esquerda de cada fileira, bônus de coluna/fileira, colunas por runa, repor carta virada para baixo, última página vira o tabuleiro e manda Descarte e Energia para a bolsa); habilidades não usam ação [V]. Rerrolagem pela Trilha de Delírio [BR p. 6 e 12] [V; quantos espaços e quantas rerrolagens por espaço estão impressos no tabuleiro, não no texto]. Página precisa estar virada para cima para traduzir [I]. Fileira de número cheia [L]. Espaço de onde se coleta o tentáculo [L]. Rastejadores descem na trilha após banir [L]. GA chega ao seu local durante o seu 1º Passo [L].

**Segunda Fase** [BR p. 16 e 17] [V]: atravessar e ocupar a carta do GA; Selar um Portal (na carta do GA, ao menos 1 tentáculo da cor ou Caos, um local por ação, 1 dado por runa até 3, soma >= número, tentáculo da cor ou Caos cobre o local); Selar uma Cor (Poder desativado, tentáculos da cor do Tabuleiro de Rastejadores ao Descarte); todas as ações menos Traduzir.

**Habilidades** [BR p. 3, camada de texto; p. 5] [V].

**Solo e variantes** [BR p. 18 a 21] [V], só resumidos.

**Erros comuns** (antecipados a partir das ênfases do próprio manual, não de fóruns): encher a trilha não amaldiçoa (nota explícita, p. 9); dados iguais não se somam ao banir (p. 14); a Fúria conta no começo do banimento (exemplo da p. 14); coletar não amaldiçoa (p. 13).

Dependências e ordem do tutorial: componentes e trilhas, depois o 1º Passo (que usa trilhas e Roleta), depois maldições (usadas pelo 1º Passo e pelas ações), depois ações (usam valores das trilhas), depois Segunda Fase (usa runas das páginas traduzidas).

## 4. Plano

Quatro etapas: (1) montar a mesa; (2) Roleta e maldições; (3) ações; (4) Segunda Fase e fim. Casos especiais em `[!mais]`; contradições e lacunas em `[!edicao]`. Exercícios de múltipla escolha; exemplos adaptados das p. 9, 14 e 17. Contas em `tec-scripts/contas.py` no scratchpad: totais de componentes (17 Caos em 2, 3 e 4 jogadores; 23 Ancestrais; 45 Loucura), compra pela Trilha de Força (3 no início, 4 com "mais 1", 4 no último 3 como no exemplo da p. 11), valores 0/1/2 viram 1/2/3, custos de banimento ([1,2]=2, [2,1,0]=2, [0,0]=0), selos ([1,2,2]=5 >= 4, [1,2]=3 >= 3, [0,2,1]=3 < 4), maldição com 3+1 tentáculos.

Extensão: cerca de 5.900 palavras de texto (6.400 com a marcação), dentro do alvo do BRIEF.

## 5. Portões

- `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-cthulhu/tutorial.md`: passa.
- Travessão e meia-risca no tutorial: zero.
- `tools/vicios.py` (VICIOS aplicado ao arquivo por script, já que o módulo não aceita arquivo): nenhum aviso; nenhuma exclamação fora das marcas.
- Renderização em memória com `tools/como_jogar_md.pagina()`: gera a página, 6 figuras e 2 vídeos; "Leitura do essencial: cerca de 11 min".
