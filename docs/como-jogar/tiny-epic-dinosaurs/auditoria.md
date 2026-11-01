# Auditoria: Como Jogar Tiny Epic Dinosaurs

Entrega 3. Autoverificação de quem escreveu, feita em 01/11/2026 contra o texto extraído e as imagens das páginas do manual. Não substitui a auditoria independente, que será feita por outro agente; por isso o JSON está com `"publicar": false`.

## 1. Fontes efetivamente usadas

- Manual brasileiro "Regras da Fazenda", Meeple BR, `TEDinos_rulebook-PT-BR-2.01.pdf`, 20 p., lido inteiro (texto e imagem de cada página). O modo solo (p. 14 a 18) foi lido, mas não é ensinado.
- FAQ da p. 19 do manual.
- Página do produto da Meeple BR (jogadores, duração, idade, link do manual, vídeos incorporados).
- Não obtidos: manual original em inglês (o site da Gamelyn hoje é tycoongames.com e não expõe o PDF nas páginas do produto); errata separada (nenhuma encontrada).

## 2. Conferência regra por regra

Cada linha: regra da base (dossiê, seção 4), onde está no tutorial e o resultado da conferência.

| Regra | No tutorial | Conferência |
|---|---|---|
| R1 6 rodadas, 7 fases | Comece (ideia), seção 0 | ok, p. 6 |
| R2 a R3 fim e pontos | Comece (como acaba), etapa 4 | ok, p. 13 |
| R4 valores dos dinossauros | Tabela da etapa 1, etapa 4, folha | ok, ilustração p. 5 a 300 dpi: 2, 3, 3, 4 |
| R5 virar o Tabuleiro de Rodada | Etapa 4 passo 1, figura | ok, p. 13 |
| R6 desempate | Etapa 4 passo 4, sua vez, folha | ok, p. 13 |
| R7 Onívoro na contagem | `[!mais]` da etapa 4 | ok, p. 13 |
| P1 a P11 preparação | Comece (9 passos), etapa 1 (12 passos) | ok, p. 4 e 5; bônus conferidos para 2 e 4 jogadores |
| C1 a C3 coleta | Comece, etapa 2 | ok, p. 6; ícones 5/3/1 lidos na imagem |
| C4 excedente perdido | Etapa 2, sua vez ("o teto é 13") | o texto diz só "teto", não afirma regra nova |
| A1 a A5 alocação, ocupado, Capataz | Comece, etapa 2, figura | ok, p. 7 |
| A6 peças juntas em espaço ocupado | `[!edicao]` | interpretada, avisada |
| A7 proibido onde já tem | Comece, etapa 2, sua vez do Comece | ok, p. 7 |
| A8 custo na hora | Comece, etapa 2 | ok, p. 7 e 8 |
| A9 só onde pode fazer | Etapa 2 passo 6, sua vez do Comece | ok, FAQ p. 19 |
| A11 a A13 Caçar e dado | Comece, etapa 2, complete do Comece | ok, p. 8; faces Rede, Dano, Ovo |
| A14 Mercado | Etapa 2 | ok, p. 8 |
| A15 Recursos | Etapa 2 | ok, p. 8 |
| A16 Barreiras e Marcador | Etapa 2 | ok, p. 9 |
| A17 a A19 Mova, Redistribuir, duas ações | `[!mais]` da etapa 2 | ok, p. 9 |
| A20 a A22 Contratos e Privado | Etapa 2, `[!mais]`, avaliação 4 | ok, p. 9 e 19 |
| A23 Pesquisa | Etapa 2, complete | ok, p. 9 |
| F1 Reaver | Etapa 3 | ok, p. 10 |
| F2 a F6 Adaptar e Cercados | Etapa 3, figura, avaliação 5 | ok, p. 10 |
| F7 Montanha e Água contam | Situações especiais | ok, p. 19 |
| F8 Únicos | Situações especiais, `[!edicao]` | ok, com ambiguidade avisada |
| F9 a F11 Alimentar | Etapa 3, treino, folha | ok, p. 11; quantidades pela ilustração p. 5 |
| F12 a F17 Fuga e penalidades | Etapa 3, complete, sua vez, avaliação 6 e 7 | ok, p. 11 e 19 |
| F18 a F20 Reprodução | Etapa 3, figura, avaliação 7 | ok, p. 12 e 19 |
| F21 estoque | `[!mais]` da etapa 3 | ok, p. 12 |
| F22 Barreira removida | `[!edicao]` | lacuna, sem afirmação categórica |
| F23 alimentar até acabar | Etapa 3 passo 3 | reproduz a frase do manual |
| N1 a N4 Preparação e quarta rodada | Etapa 4, atenção da etapa 1 | ok, p. 13 |
| Q1 a Q5 Cartas de Pesquisa | Situações especiais | ok, p. 12 e 19; exemplos lidos nas cartas ilustradas |
| Q6 onde entra o Único | não afirmado | lacuna |
| Modo solo | Situações especiais, uma linha | só citado, p. 14 a 19 |

Regra fora do tutorial de propósito: os custos de cada espaço de ação (o texto do manual não os lista, e a ilustração da p. 5 só mostra os lados de 1 a 3 e de 1 a 2 jogadores, esmaecidos). O tutorial manda ler o custo impresso.

## 3. Exemplos: legalidade e contas

Todas as contas foram refeitas em `<scratchpad>/ted-scripts/contas.py` (dossiê, seção 8). Legalidade:

- Comece: o segundo jogador caça um Estegossauro num espaço vazio enquanto o primeiro está no do Alossauro. Legal (p. 7 e 8). O complete pede 2 peças ou o Capataz para entrar onde há 1. Legal (p. 7).
- Etapa 2: a Fazenda com 2 Estegossauros cobre 2 símbolos de planta; a conta 3/3/1 parte dos 9 símbolos que dão 5/3/1 na rodada 1 (p. 6). O contrato de 3 Estegossauros por 7 existe (carta da p. 5). Mova antes de Contratos respeita "DEVEM estar em sua Fazenda" (p. 9).
- Etapa 3: o Braquiossauro não entra no Cercado dos Estegossauros (p. 10) e vai para o Cercado permanente, de 1 espaço (ilustração p. 5). O filhote ocupa o terceiro espaço livre (p. 12).
- Etapa 4: os valores de contrato (7, 10, 11, 13, 15) e de Pesquisa (1, 2) existem nas cartas das p. 2, 5 e 12.

## 4. Pontos de interpretação delicada

1. Espaço ocupado e "um único Dinofazendeiro" (p. 7). Avisado no texto.
2. Espaço com duas ações x FAQ (p. 9 e 19). Avisado.
3. Únicos em Cercado com comuns: "não podem" x "normalmente não podem" (p. 10 e 12). Avisado.
4. Barreira removida pela penalidade: destino e se pode ser parte do Cercado permanente. Lacuna, avisada.
5. Caçar dá "1 dos Dinossauros comuns (veja lista)"; o tutorial diz "o Dinossauro comum do espaço", pela ilustração dos espaços (p. 5 e 8). Não avisado no texto; se a auditoria independente discordar, é uma frase.
6. Na p. 8, Dano manda "seu(s) Dinofazendeiro(s)" para o Afastamento Médico: o tutorial entende os do espaço da caça, como no texto ("neste espaço de ação").

## 5. Componentes do plano, com trechos

- Tarefa inteira e simples primeiro: "montar a mesa e alocar o seu primeiro Dinofazendeiro" (Comece).
- Apoio que diminui: em cada etapa, `[!resolvido]`, depois `[!complete]` com a situação já montada, depois `[!suavez]` com casos novos.
- Informação de apoio antes da tarefa: "Cada dinossauro que entra na Fazenda cobre um símbolo, e a renda cai" (etapa 2); "A forma dos Cercados se planeja; a ocupação se ajusta" (etapa 3).
- Prática específica: só a conta da comida (etapa 3), porque se repete em toda rodada.

## 6. Clareza e completude: pontos fracos que restam

- Os espaços de ação de cada lado dos Tabuleiros de Ação não são descritos; quem monta precisa olhar o tabuleiro para saber o que cada espaço dá e quanto custa. É a maior lacuna para quem joga sem a caixa à frente.
- As Cartas de Pesquisa entram por dois exemplos; as habilidades das outras 28 ficam para as cartas.
- O tutorial passa um pouco do alvo (6.606 palavras por `wc`, contando opções, explicações escondidas, folha de consulta e fontes).
- Sem o manual em inglês, as ambiguidades de tradução (seção 4) foram resolvidas só pelo texto brasileiro.
- Legibilidade não medida.

## 7. Teste com leitores (proposta)

Mesma proposta do piloto (PROMPT_PILOTO, seção 10): 5 a 8 adultos que nunca jogaram; tarefas: montar para 2 e para 4, jogar a primeira rodada inteira (as 7 fases), alimentar e reproduzir uma Fazenda dada; medidas de autonomia, precisão, tempo, retenção em 7 dias e esforço percebido. Ponto a observar aqui: se o leitor entende, sem ajuda, que dinossauro caçado não serve para contrato na mesma rodada.

## 8. Ligação com a resenha

Não há resenha de Tiny Epic Dinosaurs no site. Se houver, o card de "Como jogar" e o campo `resenha` do JSON fazem a ligação.

## Auditoria independente: partida simulada

Simulação feita só com o tutorial: preparação para 2 jogadores e primeira rodada completa (Ana primeira jogadora; Bruno ganha 1 planta e começa com 6 plantas, 3 carnes e 1 suprimento após a coleta; alternância de 4 alocações cada, 3 Dinofazendeiros e o Capataz; caçadas na Zona de Contenção; Reaver, Adaptar com o Cercado permanente, Alimentar, Reprodução e Preparação). O manual (pdftotext) só foi aberto depois, para resolver as lacunas abaixo.

| # | Lacuna na simulação | Resolução no manual | Correção no tutorial |
|---|---|---|---|
| 1 | Não estava dito se cada jogador começa com dinossauros ou Barreiras (precisei deduzir pelo "5 plantas, 3 carnes, 1 suprimento"). | A preparação não entrega nenhum (p. 4 e 5); "não existe nenhum Dinossauro em sua Fazenda" na primeira rodada (p. 6). | Frase no aviso do quarto Dinofazendeiro (etapa 1). |
| 2 | "O Dinossauro comum do espaço": de onde sai a peça, e se o estoque pode acabar. | Recebe-se o dinossauro mostrado, do estoque comum (p. 8 e 19); estoque esgotado está na p. 12. | Caçar: "mostrado no espaço, tirado do estoque comum". |
| 3 | Com Dano, o Capataz também vai para o Afastamento Médico? | Capataz é "um Dinofazendeiro especial" (p. 4); Dano move "seu(s) Dinofazendeiro(s)" (p. 8). | Caçar: "inclusive o Capataz". |
| 4 | Mova um Dinossauro e Redistribuir Barreiras apareciam só como "Regra adicional", sem dizer que são ações de espaço. | Estão na lista de ações dos espaços (p. 9). | Os dois quadros dizem que são ações de espaço. |
| 5 | Posso passar a vez e não alocar todas as peças? | "Você deve posicionar um único Dinofazendeiro"; a fase vai até todos terem posicionado todos (p. 7). | Passo 7 do turno: alocar é obrigatório. |
| 6 | Sem espaço legal na sua vez; Barreira que não se quer pôr na Fazenda. | Manual não trata. A p. 10 manda pôr "suas Barreiras e Dinossauros" na Fazenda. | Item (3) no quadro "Pontos que o manual deixa abertos". |
| 7 | Modo solo: o tutorial só dizia que existe; impossível jogar sozinho com ele. E chamava as cartas de "Cartas de Fazenda Rival". | Regras completas nas p. 14 a 19; o nome é "Cartas de Fazendeiro Rival" (p. 14). | Seção Modo solo reescrita: preparação, turno do Rival, ações, resto da rodada e fim. Ficam remetidos à p. 17 dois itens que o pdftotext não lê (símbolo das cartas que o Rival nunca pega e ordem das Ações de Recurso Máximo). |

Sem lacuna: preparação para 2 (3 Contratos Públicos, bônus só para o segundo), ordem das fases, espaço ocupado e Capataz, custo, Contratos só da Fazenda, Cercados, comida, fuga, reprodução, quarta rodada, pontuação e desempate.

Veredito: dá para jogar a partida de 2 a 4 só com o tutorial, com as correções acima; o solo passou a ser jogável, com consulta à p. 17 para os dois ícones citados.
