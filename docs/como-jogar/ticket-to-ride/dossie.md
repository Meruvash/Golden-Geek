# Dossiê: Como Jogar Ticket to Ride

Entrega 1 da linha COMO JOGAR para *Ticket to Ride* (jogo base, mapa dos Estados Unidos). Produzido em 31/10/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções do briefing do editor (jogo já escolhido, sem subagentes, sem explicação do método no tutorial, alvo de 3.500 a 6.000 palavras).

---

## 1. Escolha do jogo e procura

- **Jogo definido pelo editor:** Ticket to Ride, jogo base. Não há resenha no site (não existem a pasta `ticket-to-ride/` nem `conteudo/ticket-to-ride.json`), por isso `resenha` é `null` no JSON.
- **Procura real (31/10/2026).** Autocomplete do Google para "como jogar ticket to ride": a própria busca aparece em 1º lugar, seguida de Europa, New York, Paris, Trem Fantasma, Primeira Viagem, Alemanha, First Journey, Londres e "online". No YouTube (`client=youtube&ds=yt`): a própria busca em 1º, seguida de Europe, New York, Paris, Alemanha e "como se jogar ticket to ride".

## 2. Fontes

| Fonte | Versão | Origem | Data |
|---|---|---|---|
| **Manual da edição brasileira** (fonte principal), Galápagos, "T2R rules BR" | PDF de 4 páginas; criado em 15/04/2016 (InDesign CC 2015), modificado em 29/03/2019; tradução de Luiz Eduardo Ricci Coelho; © 2004-2016 Days of Wonder; sha256 7828047…c8c | Biblioteca de Downloads da Galápagos, https://www.asmodee.com.br/download-library, item "TTR001 - Ticket to Ride", etiqueta Regras. O site chama a API pública `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2280&tagId=2&group=b2c`, que devolveu um ZIP com o PDF (HTTP 200, sem login) | Baixado em 31/10/2026 |
| **Manual original em inglês**, Days of Wonder, "[T2R] rules EN reprint 2015" | PDF de 4 páginas, criado em 09/03/2015 | https://ncdn0.daysofwonder.com/tickettoride/en/img/tt_rules_2015_en.pdf | Baixado em 31/10/2026 |
| Manual da edição de 2025 em português (Days of Wonder; tradução Galápagos: Luiz Eduardo Ricci Coelho e Mateus Ornellas) | PDF de 4 páginas, 01/07/2025, "721901N_TICKET2RIDEV2_RULES_PTBR_20250425_WEB" | Link na página oficial https://www.daysofwonder.com/game/ticket-to-ride/ | Baixado em 31/10/2026 |
| Manual da edição de 2025 em inglês | PDF de 4 páginas, 01/07/2025 | Mesma página oficial | Baixado em 31/10/2026 |
| Página do produto TTR001 (Galápagos) | API da loja, `/ccstore/v1/products/TTR001` | https://www.asmodee.com.br | Consultada em 31/10/2026 |

**Dados do produto (para o JSON):** 2 a 5 jogadores (`x_numeroDeParticipantes` 2, `x_numeroMaximoDeParticipantes` 5), `x_faixaEtaria` 8+, `x_tempoDePartida` 30-60 min, marca Galápagos, componentes com "30 Bilhetes de Destino". A capa do manual brasileiro diz o mesmo: "Para 2 - 5 jogadores, Acima de 8 anos, 30-60 minutos" (p. 1). O modelo de JSON do briefing trazia "2 a 4" e "30 a 45 min" como exemplo; os valores gravados são os da fonte.

**Paginação.** O PDF brasileiro não tem número impresso nas páginas (conferido na imagem renderizada). O tutorial usa a ordem do PDF: p. 1 capa e história, p. 2 Componentes, Preparação, Objetivo e início do Turno, p. 3 as outras ações, Cartas de Vagão e Conquistando Rotas, p. 4 Tabela de Pontuação, Bilhetes, Final do Jogo e Calculando os Pontos. A nota em itálico do topo do tutorial explica isso.

**Qual edição o leitor tem.** A loja da Galápagos vende o TTR001 com 30 Bilhetes de Destino, o que corresponde ao manual de 2016. A Days of Wonder publicou em 2025 uma edição nova, com 33 Bilhetes e manual em português. Não foi possível confirmar se essa edição já é vendida no Brasil. O tutorial segue o manual de 2016 e marca as diferenças com `[!edicao]`.

**Não obtidos.** FAQ ou errata oficial: a busca na Biblioteca de Downloads para "Ticket" só trouxe a etiqueta Regras para o TTR001; nenhuma FAQ oficial da Days of Wonder foi achada numa busca na web (31/10/2026). Fóruns e sites de terceiros não foram usados como fonte de regra.

## 3. Glossário (edição brasileira de 2016)

| Termo no manual BR | Original (EN 2015) | Página | O que é |
|---|---|---|---|
| Tabuleiro (mapa das rotas ferroviárias dos EUA) | board | p. 2 | O mapa, com a Trilha de Pontos em volta |
| Trens (trens de plástico); estoque de trens | trains; stock of plastic trains | p. 2 e 4 | 45 por jogador; o estoque marca o fim |
| Marcador de pontos | Scoring Marker | p. 2 | Peça de madeira que anda na Trilha |
| Trilha de Pontos; Início | Scoring Track; Start | p. 2 | Faixa numerada em volta do mapa |
| Cartas de Vagão | Train Car cards | p. 2 e 3 | 110 cartas: 8 cores × 12, mais 14 Locomotivas |
| Locomotivas | Locomotives | p. 2 e 3 | Cartas multicoloridas, "curingas" |
| cartas abertas (reveladas) / no escuro / pilha de compras / pilha de descarte | face-up / blind draw / deck / discards | p. 2 e 3 | As 5 cartas viradas; a compra do topo; as pilhas |
| Rosa, Azul, Laranja, Branco, Verde, Amarelo, Preto, Vermelho | Purple, Blue, Orange, White, Green, Yellow, Black, Red | p. 3 | Cores das cartas e das rotas |
| Bilhetes de Destino; pilha de Bilhetes de Destino | Destination Tickets | p. 2 e 4 | 30 cartas com duas cidades e um valor |
| carta de Maior Caminho Contínuo (Carta Bônus de Maior Caminho Contínuo) | Longest Continuous Path Bonus card | p. 2 e 4 | Prêmio de 10 pontos |
| Carta de Ajuda | Summary card | p. 2 | Resumo |
| Rota; rota cinza; Rotas Duplas; interditada | route; gray route; Double-Routes; closed | p. 3 | |
| Comprar Cartas de Vagão; Conquistar uma Rota; Comprar Bilhetes de Destino | Draw Train Car Cards; Claim a Route; Draw Destination Tickets | p. 2 e 3 | As três ações |
| Tabela de Pontuação | Route Scoring Table | p. 4 | 1, 2, 4, 7, 10, 15 |
| Caminho Contínuo | continuous path | p. 4 | Linha de trens da mesma cor |
| turno; rodada | turn | p. 2 | "Cada jogador faz uma ação por rodada" |

Decisão de terminologia: o tutorial usa "Conquistar uma Rota" (2016), não "Controlar" (2025); "Bilhetes de Destino", não "Bilhetes"; "rosa", com a nota de que 2025 diz "roxo".

## 4. Base de regras

Classificação: `[V]` verificada (lida nesta sessão), `[I]` interpretada (motivo ao lado), `[L]` lacuna. Fonte BR = manual de 2016; EN = original de 2015; V2 = manual de 2025 em português.

### 4.1 Objetivo e componentes

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | Objetivo: mais pontos; pontos por rota conquistada, Bilhete ligado de forma contínua e Maior Caminho Contínuo; perde pontos por Bilhete não completado | BR p. 2 "O objetivo do jogo é marcar o maior número de pontos" | V | |
| R2 | 240 trens (45 de cada uma de 5 cores, mais extras para reposição), 5 marcadores | BR p. 2 "45 de cada cor" | V | |
| R3 | 110 Cartas de Vagão: 12 de cada um de 8 tipos, mais 14 Locomotivas; Vagão de Passageiro = azul | BR p. 2 "110 Cartas de Vagão"; p. 3 "Cartas de Vagão de Passageiro (Azuis)" | V | |
| R4 | 8 cores: Rosa, Azul, Laranja, Branco, Verde, Amarelo, Preto, Vermelho, as mesmas das rotas | BR p. 3 "Rosa, Azul, Laranja" | V | |
| R5 | 30 Bilhetes de Destino, 1 Carta de Ajuda, 1 carta de Maior Caminho Contínuo | BR p. 2 "30 Cartas de Bilhete de Destino" | V | |

### 4.2 Preparação (BR p. 2)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R6 | Tabuleiro no centro; cada jogador 45 trens e marcador da cor; marcador no Início da Trilha de Pontos | p. 2 "Cada jogador pega um conjunto com 45 trens" | V |
| R7 | 4 Cartas de Vagão para cada um; resto perto do tabuleiro; revelar as 5 primeiras | p. 2 "mão inicial de 4 cartas" | V |
| R8 | 3 Locomotivas entre as 5 abertas, "a qualquer momento": descartar as 5 e revelar novas | p. 3 "Se, a qualquer momento, três das cinco" | V (aplicação na preparação: leitura direta de "a qualquer momento"; V2 p. 2 diz explicitamente na preparação) |
| R9 | Carta de Maior Caminho Contínuo virada para cima perto do tabuleiro | p. 2 | V |
| R10 | 3 Bilhetes para cada; fica com pelo menos 2; devolvidos ao final da pilha; pilha perto do tabuleiro; Bilhetes secretos | p. 2 "deve ficar com pelo menos dois Bilhetes" | V |
| R11 | Começa o viajante mais experiente; sentido horário; uma ação por turno | p. 2 "O viajante mais experiente começa" | V |
| R12 | Preparação igual para 2 a 5; o número de jogadores só muda as Rotas Duplas | p. 2 (nenhuma variação), p. 3 (Rotas Duplas) | V |

### 4.3 Comprar Cartas de Vagão

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R13 | Comprar 2 cartas, abertas ou do topo; aberta é reposta imediatamente; segunda aberta ou fechada | p. 2 "O Jogador pode comprar 2 Cartas de Vagão" | V |
| R14 | Locomotiva aberta: quem a comprar só compra uma carta | p. 3 "só poderá comprar uma carta ao invés de duas" | V |
| R15 | Locomotiva que aparece na reposição depois da primeira carta: não pode ser comprada | p. 3 "a sua substituta for uma Locomotiva, o jogador não poderá comprá-la"; EN p. 2 idem | V |
| R16 | Nenhuma Locomotiva aberta pode ser a segunda carta, mesmo a que já estava aberta | Dedução de R14 (comprá-la como segunda daria duas cartas no turno); V2 p. 3 "ela deve ser a primeira Carta de Vagão que você compra" | I |
| R17 | Locomotiva no escuro conta como uma carta; pode comprar a segunda | p. 3 "Observação: Se um jogador tiver a sorte" | V |
| R18 | Sem limite de cartas na mão | p. 3 "Não há limite de cartas" | V |
| R19 | Pilha vazia: embaralhar bem o descarte, que está em grupos de cor | p. 3 "a pilha de descarte é embaralhada" | V |
| R20 | Sem pilha e sem descarte: não pode comprar; escolhe outra ação | p. 3 "No caso raro" | V |

### 4.4 Conquistar uma Rota

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R21 | Conjunto igual ao número de espaços e da cor da rota, todas do mesmo tipo | p. 3 "um conjunto de cartas igual ao número de espaços" | V |
| R22 | Rota cinza: qualquer cor, todas da mesma cor | p. 3 "da cor cinza" | V |
| R23 | Locomotiva vale com qualquer cor no conjunto | p. 3 "podem ser utilizadas com qualquer uma das cores" | V |
| R24 | Conjunto só de Locomotivas | Manual não diz; nada proíbe | L (tutorial: "combine com a mesa", sem afirmação categórica) |
| R25 | Um trem em cada espaço; cartas usadas descartadas | p. 3 "coloca um de seus trens de plástico em cada espaço" | V |
| R26 | Não é preciso trem suficiente? Leitura: sem trens para todos os espaços, não se conquista | Dedução de R25; V2 p. 3 "Você deve ser capaz de controlar a rota inteira em um único turno" | I |
| R27 | Qualquer rota disponível, sem precisar estar conectada; no máximo uma rota por turno | p. 3 "Não é necessário que as rotas conquistadas estejam conectadas" | V |
| R28 | Rotas Duplas: o mesmo jogador não conquista as duas | p. 3 "não podem ser conquistadas pelo mesmo jogador" | V |
| R29 | Com 2 ou 3 jogadores, só uma das Rotas Duplas é usada; a outra fica interditada | p. 3 "Observação Importante" | V |
| R30 | Com 4 ou 5, as duas podem ser usadas por jogadores diferentes | Leitura a contrario de R28 e R29 | V (consequência direta) |
| R31 | Pontos na hora, pela Tabela: 1→1, 2→2, 3→4, 4→7, 5→10, 6→15 | p. 3 e p. 4 (tabela) | V |
| R32 | Exemplo do manual: Montréal-New York, azul, 3 cartas; Montréal-Toronto, cinza, 3 cartas verdes na ilustração | p. 3, Exemplos 1 e 2 (texto e ilustração) | V |

### 4.5 Bilhetes de Destino

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R33 | Comprar 3 do topo, ficar com pelo menos 1; devolvidos ao final da pilha | p. 3 e 4 "deverá ficar com pelo menos uma dessas cartas" | V |
| R34 | Menos de 3 na pilha: compra os disponíveis | p. 4 | V |
| R35 | Bilhete: duas cidades e um valor; ligado por série contínua de rotas soma, senão subtrai | p. 4 "deve reduzir os pontos indicados" | V |
| R36 | Ligação só com rotas próprias | p. 2 "Ligando de maneira contínua"; p. 4 "tiver conquistado uma série de rotas"; V2 p. 3 "trens da sua cor" | V |
| R37 | Secretos; sem limite | p. 4 | V |
| R38 | Bilhete já mantido não pode ser devolvido numa compra posterior | BR fala só "dessas cartas" (as compradas); V2 p. 4 "você só pode descartar Bilhetes que acabou de comprar" | I |

### 4.6 Fim e contagem (BR p. 4)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R39 | Estoque com 0, 1 ou 2 trens ao final do turno de um jogador: todos, inclusive ele, têm mais um turno; depois acaba | "Quando o estoque de trens de plástico" | V |
| R40 | Recontagem das rotas opcional | "uma recontagem pode ser feita" | V |
| R41 | Revelar Bilhetes, somar ou subtrair | "Os jogadores devem então revelar" | V |
| R42 | Maior Caminho Contínuo: 10 pontos; só trens da mesma cor; voltas e cidade repetida valem; trem não conta duas vezes | "recebe uma carta especial de bônus" | V |
| R43 | Comprimento medido em trens | BR "medir o comprimento"; EN "continuous lines of plastic trains" | V (com o EN) |
| R44 | Empate no Maior Caminho: os empatados marcam 10 (BR "ambos"; EN "all tied players") | p. 4; EN p. 4 | V |
| R45 | Vence mais pontos; desempate: mais Bilhetes completados; depois quem tem a carta de Maior Caminho Contínuo | "Se dois ou mais jogadores empatarem" | V |
| R46 | Empate que persiste depois do 2º critério | BR não diz; V2 p. 4 "esses jogadores compartilham a vitória" | L (dito como diferença de edição, não como regra de 2016) |

### 4.7 Fora do escopo

Variantes e mapas de expansão; a "carta promocional para mapas adicionais" (p. 2); jogo online (p. 4).

### 4.8 Dependências e ordem do tutorial

R6 a R12 (mesa) → R13 a R20 (comprar cartas: precisa saber o que são as abertas e a Locomotiva) → R21 a R32 (rotas: precisa ter cartas na mão) → R33 a R46 (Bilhetes e fim: precisa saber o que é rota e o que é caminho contínuo). Os Bilhetes aparecem na etapa 1 só como escolha inicial; a compra no meio da partida fica para a etapa 4, junto da contagem, porque o risco da compra só faz sentido depois de saber como se pontua.

## 5. Divergências entre edições

| Ponto | BR 2016 | EN 2015 | 2025 (PT e EN) | Natureza | No tutorial |
|---|---|---|---|---|---|
| Cor | Rosa | Purple | Roxo | Tradução | Usa "rosa", avisa na etapa 1 |
| Bilhetes iniciais | 3, fica com ≥2 | igual | 4, fica com ≥2; 33 Bilhetes; devolvidos embaralhados | Mudança de edição | `[!edicao]` na etapa 1 e seção 6 |
| Locomotiva aberta como 2ª carta | só a da reposição é proibida | igual | a aberta tem de ser a 1ª | Esclarecimento | R16 `[I]`, `[!edicao]` na etapa 2 |
| Trens suficientes | implícito | implícito | explícito | Esclarecimento | R26 `[I]`, `[!edicao]` na etapa 3 |
| Devolver Bilhete antigo | não trata | não trata | proibido | Esclarecimento | R38 `[I]`, seção 6 |
| Ordem dos Bilhetes devolvidos numa compra | final da pilha | bottom | fundo, na ordem que preferir | Mudança de edição | seção 6 |
| Empate no Maior Caminho | "ambos" | "all tied players" | "todos os jogadores empatados" | Tradução | `[!edicao]` na etapa 4 |
| Empate final persistente | não trata | não trata | vitória dividida | Mudança de edição | `[!edicao]` e seção 6 |
| Primeiro jogador | viajante mais experiente | igual | como a mesa escolher | Mudança de edição | seção 6 |
| Nome da ação | Conquistar uma Rota | Claim a Route | Controlar uma Rota | Tradução | seção 6 |

## 6. Dúvidas recorrentes antecipadas

Locomotiva aberta como segunda carta (etapa 2); misturar cores na rota cinza (4 minutos, etapa 3 e avaliação); Rotas Duplas por número de jogadores (etapa 3); se a rota precisa estar ligada às suas (4 minutos e etapa 3); se Bilhete pode passar por rota alheia (etapa 4); como medir o caminho mais longo (etapa 4); quantos turnos sobram no fim (etapa 4 e avaliação). Levantadas pela leitura dos próprios manuais (a edição de 2025 esclareceu justamente os pontos 1, 3, 4 e 6 da seção 5) e pelas buscas do autocomplete; nenhuma regra veio de fórum.

## 7. Plano instrucional

| Classe de tarefa | Informação de apoio | Informação procedural | Tarefas (apoio decrescente) | Prática específica |
|---|---|---|---|---|
| 0. Comece em 4 minutos | A ideia do jogo, 3 frases | Monte a mesa; as três ações | Montréal-New York resolvido; Locomotiva aberta (complete); a mão do leitor | Os três erros mais caros |
| 1. Montar a mesa | Para que serve cada grupo de peças | Preparação, 10 passos | Escolha de Bilhetes resolvida; onde ficam os Bilhetes; montagem para 4 | |
| 2. Comprar cartas | Aberta x escuro; por que a Locomotiva custa caro | Compra, 10 passos | Sequência com reposição de Locomotiva; Locomotiva no escuro; três situações | Quantas cartas você leva |
| 3. Conquistar rotas | Cor, cinza, Locomotiva; curva da tabela | Conquista, 6 passos; Rotas Duplas | Três formas de pagar Montréal-Toronto; Rota Dupla com 3 jogadores; três situações | Tabela de Pontuação |
| 4. Bilhetes, fim e contagem | Risco dos Bilhetes; o relógio dos trens | Compra de Bilhetes; fim; contagem | Partida de 2 até o vencedor; conta de Carla; duas situações | Caminho mais longo |

Decisões de carga: a compra de Bilhetes no meio da partida e o Maior Caminho foram adiados para a etapa 4; Rotas Duplas entram em uma linha no 4 minutos porque podem acontecer no primeiro turno com 2 ou 3 jogadores. Limite: o texto não observa o leitor nem ajusta o apoio a ele.

**Extensão.** O tutorial ficou acima da faixa de 2.500 a 4.500 do PROMPT_PILOTO e dentro da faixa do briefing (3.500 a 6.000). O espaço extra foi para três pontos que o manual de 2016 deixa em aberto e que mudam jogadas (Locomotiva como segunda carta, trens suficientes, Bilhetes antigos) e para a comparação com a edição de 2025.

**Exemplos.** Contas refeitas em `<scratchpad>/ttr/contas.py` (tabela, 4 minutos, somas de rotas, partida de Ana e Bruno, Carla, sua vez da etapa 4, caminho mais longo, avaliação). Os valores de Bilhetes nos exemplos (12, 9, 7, 13, 8, 11, 5, 10, 6, 4) são ilustrativos: o manual não lista os 30 Bilhetes, e os exemplos não dão nome às cidades. As únicas rotas nomeadas são as dos exemplos do manual (Montréal-New York, azul de 3; Montréal-Toronto, cinza de 3).

## 8. Portões automáticos (31/10/2026)

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos` aplicada ao texto inteiro): 0 aviso. Exclamação fora das marcas de bloco: 0.
- `python3 tools/checar_comece.py docs/como-jogar/ticket-to-ride/tutorial.md`: ✅ (na primeira passada deu 802 palavras; cortadas duas expressões).
- Seções na ordem do briefing; cada "### Respostas" logo depois do bloco que pergunta. Conversão testada em memória com `tools/como_jogar_md.pagina()`: 12 seções, 6 blocos de respostas escondidos, 37 blocos marcados; nenhum arquivo do site foi gerado.
- Toda regra do tutorial tem linha na base acima (ver a cobertura na auditoria).
- Extensão: cerca de 5.700 palavras contadas por `\w+` (inclui tabelas e a folha de consulta).
- Legibilidade (Flesch adaptado): não medida; a implementação citada no prompt está em outro repositório, não disponível nesta sessão.
