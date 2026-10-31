# Auditoria: Como Jogar Ticket to Ride

Entrega 3. Autoverificação feita por quem escreveu o tutorial, em 31/10/2026, sem subagentes (exceção do briefing). A auditoria independente de regras e o teste de execução ainda não foram feitos: este relatório não substitui os dois.

## 1. Fontes usadas e não obtidas

- **Usadas e lidas por inteiro nesta sessão:** manual brasileiro de 2016 (Galápagos, 4 páginas, Biblioteca de Downloads, TTR001); manual original em inglês de 2015 (Days of Wonder, 4 páginas); manuais de 2025 em português e em inglês (Days of Wonder, 4 páginas cada), usados só para diferenças de edição e para apoiar leituras `[I]`; página do produto TTR001 (dados do topo).
- **Não obtidas:** FAQ e errata oficiais (não achadas na Biblioteca nem na página da Days of Wonder). Não foi confirmado se a edição de 2025 é vendida no Brasil.
- Nenhum bloqueio foi contornado: todos os arquivos vieram por HTTP 200 sem login.

## 2. Cobertura: regra por regra contra o manual

Cada linha: regra da base (dossiê, seção 4), onde está no tutorial, frase conferida no manual, resultado.

| Regra | Onde no tutorial | Conferência no manual | Resultado |
|---|---|---|---|
| R1 objetivo e três fontes de pontos | 4 min (ideia); seção 0 | BR p. 2 "Pontos podem ser ganhos das seguintes maneiras" e "Você perde pontos" | OK |
| R2 45 trens por cor, extras de reposição | 4 min passo 1; etapa 1 passo 2 | BR p. 2 "45 de cada cor ... mais alguns trens extras" | OK |
| R3 110 cartas, 12 × 8 + 14 Locomotivas; Passageiro azul | etapa 1 Para entender | BR p. 2; p. 3 "Vagão de Passageiro (Azuis)" | OK |
| R4 oito cores | etapa 1 Para entender | BR p. 3 "Rosa, Azul, Laranja, Branco, Verde, Amarelo, Preto e Vermelho" | OK |
| R5 30 Bilhetes, Carta de Ajuda, carta de Maior Caminho | etapa 1 Para entender | BR p. 2 | OK |
| R6 tabuleiro, trens, marcador no Início | 4 min passo 1; etapa 1 passos 1 a 3 | BR p. 2 "coloca o seu marcador de pontos no Início" | OK |
| R7 4 cartas, 5 abertas | 4 min passo 2; etapa 1 passos 4 e 5 | BR p. 2 "mão inicial de 4 cartas", "revele as primeiras cinco cartas" | OK |
| R8 3 Locomotivas abertas | 4 min passo 2; etapa 1 passo 6; etapa 2 passo 7 | BR p. 3 "Se, a qualquer momento, três das cinco" | OK. O manual diz "três"; o tutorial diz "3 das 5". "Pelo menos 3" (com 4 ou 5 Locomotivas) só é explícito em 2025; o tutorial não trata o caso de 4 ou 5 Locomotivas, que na prática dispara a regra antes, ao surgir a terceira |
| R9 carta de Maior Caminho na mesa | 4 min passo 3; etapa 1 passo 7 | BR p. 2 | OK |
| R10 3 Bilhetes, ≥2, fundo, secretos | 4 min passo 4; etapa 1 passos 8 e 9 | BR p. 2 "pelo menos dois", "final da pilha", "em segredo" | OK. "Final da pilha" virou "fundo da pilha"; o EN diz "bottom" |
| R11 primeiro jogador, horário, uma ação | 4 min passo 5 e tabela; etapa 1 passo 10 | BR p. 2 "O viajante mais experiente começa"; "uma (e apenas uma)" | OK |
| R12 preparação igual de 2 a 5 | etapa 1 passo a passo (abertura) | BR p. 2 sem variação; p. 3 Rotas Duplas | OK |
| R13 compra de 2 cartas, reposição imediata | 4 min ação 1; etapa 2 passos 1 a 3 | BR p. 2 "deve repor, imediatamente" | OK |
| R14 Locomotiva aberta: uma carta só | 4 min ação 1, Complete e erros; etapa 2 passo 4 | BR p. 3 "só poderá comprar uma carta ao invés de duas" | OK |
| R15 Locomotiva da reposição | 4 min ação 1; etapa 2 passo 5; avaliação 1 | BR p. 3 "a sua substituta for uma Locomotiva, o jogador não poderá comprá-la" | OK |
| R16 nenhuma Locomotiva aberta como 2ª carta `[I]` | etapa 2 bloco "Sobre a edição", treino c, Sua vez 1; folha de consulta | Dedução de BR p. 3; V2 p. 3 explícito | Interpretada e dita como interpretação na etapa 2 e na folha de consulta |
| R17 Locomotiva no escuro | 4 min ação 1; etapa 2 passo 6, Complete; avaliação 2 | BR p. 3 "Observação" | OK |
| R18 sem limite de mão | etapa 2 passo 8; seção 6 | BR p. 3 | OK |
| R19 reembaralhar descarte | etapa 2 passo 9 | BR p. 3 | OK |
| R20 sem pilha e sem descarte | etapa 2 passo 10; seção 6 | BR p. 3 "deverá então escolher outro tipo de ação" | OK. A frase da seção 6 "resta comprar Bilhetes" é dedução das três ações, não texto do manual |
| R21 e R22 conjunto, cor, cinza | 4 min ação 2; etapa 3 passo 2 e Atenção; avaliação 3 | BR p. 3 "todas do mesmo tipo", "da cor cinza" | OK |
| R23 Locomotiva em qualquer conjunto | 4 min; etapa 3 | BR p. 3 | OK |
| R24 só Locomotivas `[L]` | etapa 3 bloco "Sobre a edição" | Manual não trata | Dito como lacuna: "combine com a mesa". Não há afirmação categórica |
| R25 trem por espaço, descarte | 4 min tabela; etapa 3 passos 3 e 4 | BR p. 3 | OK |
| R26 trens suficientes `[I]` | etapa 3 bloco "Sobre a edição", Sua vez 1 | Dedução de BR p. 3; V2 p. 3 explícito | Interpretada e dita como tal |
| R27 rota não conectada, uma por turno | 4 min ação 2; etapa 3 passos 1 e 6, Sua vez 2 | BR p. 3 "no máximo, uma rota por turno" | OK |
| R28 a R30 Rotas Duplas | 4 min ação 2; etapa 3 passo a passo, Complete; avaliação 4 | BR p. 3 "Observação Importante" | OK. O manual não diz "4 ou 5 jogadores"; é a leitura a contrario, sem risco |
| R31 Tabela de Pontuação | 4 min; etapa 3 passo 5, treino; folha | BR p. 4 tabela: 1, 2, 4, 7, 10, 15 | OK, conferida também no EN |
| R32 exemplos do manual | 4 min resolvido; etapa 3 resolvido | BR p. 3 Exemplos 1 e 2, texto e ilustração (3 verdes) | OK |
| R33 e R34 compra de Bilhetes | 4 min ação 3; etapa 4 passo a passo; seção 6; avaliação 6 | BR p. 3 e 4 | OK |
| R35 soma e subtração | 4 min; seção 0; etapa 4 contagem 2 | BR p. 4 | OK |
| R36 só rotas próprias | etapa 4 Atenção | BR p. 2 e 4 "tiver conquistado uma série de rotas" | OK |
| R37 secretos, sem limite | etapa 1; etapa 4 passo 4; seção 6 | BR p. 4 | OK |
| R38 Bilhete antigo não volta `[I]` | etapa 4 Para entender (redação suavizada); seção 6 | BR não trata; V2 p. 4 explícito | Interpretada e dita como tal |
| R39 fim com 0, 1 ou 2 trens | 4 min; etapa 4 passo a passo, Sua vez 2; avaliação 7 | BR p. 4 "todos os jogadores, incluindo esse jogador, têm mais um último turno" | OK |
| R40 e R41 recontagem e Bilhetes | etapa 4 contagem 1 e 2 | BR p. 4 | OK |
| R42 a R44 Maior Caminho | 4 min; etapa 4 contagem 3, Atenção, "Sobre a edição", treino | BR p. 4; EN p. 4 | OK |
| R45 vencedor e desempate | etapa 4 contagem 4; folha | BR p. 4 | OK |
| R46 empate persistente `[L]` | etapa 4 "Sobre a edição"; seção 6 | BR não trata; V2 p. 4 | Dito como diferença de edição |

**Regras do manual que ficaram de fora:** a história de abertura (p. 1), o registro online e a carta promocional (p. 2 e 4). Nenhuma regra de jogo.

## 3. Contas refeitas

Script `<scratchpad>/ttr/contas.py`, rodado em 31/10/2026. Cada número do texto confere com a saída:

| Onde | Conta | Resultado |
|---|---|---|
| 4 min resolvido | rota de 3 → 4 pontos; 45 - 3 = 42 trens; 4 - 3 = 1 carta | OK |
| Etapa 3 entender | 6 espaços = 15; duas de 3 = 8 | OK |
| Etapa 3 resolvido | rota cinza de 3 = 4 pontos; sobram 2 Vermelhos e 1 Locomotiva | OK |
| Etapa 3 Sua vez 3 | 7 + 4 + 2 + 1 = 14; 4 + 3 + 2 + 1 = 10 trens | OK |
| Etapa 3 treino | 2, 7, 10, 15; 3 × 2 = 6 | OK |
| Etapa 4 resolvido | Ana: rotas [6, 6, 5, 5, 4, 4, 4, 3, 3, 2, 2] = 44 trens, 83 pontos, sobra 1 trem; Bilhetes 12 + 9 - 7 = 14; total 83 + 14 + 10 = 107. Bruno: rotas [5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 1] = 36 trens, 58 pontos, mais a rota de 4 do último turno (7 pontos) = 65 pontos e 40 trens; Bilhetes 13 + 8 + 11 + 5 = 37; total 95 | OK |
| Etapa 4 Complete | 52 + 8 + 5 - 10 = 55 | OK |
| Etapa 4 Sua vez 1 | 60 + 9 - 6 - 4 + 10 = 69 | OK |
| Etapa 4 treino | E-B-C-D 10; A-B-C-D 9; A-B-E 9 | OK |
| Avaliação 5 e 8 | 10 e 4; 11 - 7 = 4 | OK |

**Legalidade das jogadas.** O resolvido do 4 minutos usa só a mão inicial (4 cartas) e uma rota do exemplo do manual. Na partida de Ana e Bruno, Ana dispara o fim no turno dela; Bruno e depois Ana jogam o último turno, como manda a p. 4. Com 1 trem, Ana só poderia conquistar uma rota de 1 espaço; ela compra cartas, o que é legal.

## 4. Pontos de interpretação delicada e lacunas

1. **Locomotiva aberta como segunda carta (R16).** É o ponto mais jogado errado e o manual de 2016 só cobre o caso da reposição. A leitura adotada tem apoio no próprio texto ("só poderá comprar uma carta") e na edição de 2025. Risco: um auditor pode considerar que, pelo texto de 2016 estrito, a Locomotiva antiga seria permitida.
2. **Trens suficientes (R26)** e **Bilhetes antigos (R38):** deduções com confirmação na edição de 2025.
3. **Só Locomotivas (R24):** lacuna; o tutorial não decide.
4. **Empate final persistente (R46):** lacuna em 2016.
5. **"Ambos" × todos os empatados (R44):** o tutorial segue o original e avisa.

## 5. Evidências do plano instrucional no texto

- **Tarefas com apoio decrescente:** em cada etapa há `[!resolvido]`, `[!complete]` (com parte da conta feita, por exemplo "Já somamos os Bilhetes completos: 52 + 8 + 5 = 65") e `[!suavez]`, com respostas em "### Respostas da etapa N".
- **Informação de apoio antes da tarefa:** os blocos `[!entender]`, por exemplo a curva da tabela (6 espaços valem 15, duas rotas de 3 valem 8) antes de pedir que o leitor escolha como pagar.
- **Informação procedural no ponto de uso:** passo a passo com página, repetido na folha de consulta.
- **Prática de parte da tarefa:** só onde o erro é comum: quantas cartas se leva (Locomotivas), Tabela de Pontuação, caminho mais longo.

## 6. Avaliação crítica e pontos fracos

- **Exemplos sem cidades reais, exceto duas rotas.** Os Bilhetes dos exemplos têm valores ilustrativos e nenhum nome de cidade, porque o manual não lista o baralho de Bilhetes. Isso evita inventar componente, mas deixa os exemplos abstratos; o treino do caminho mais longo usa letras, não o mapa.
- **Extensão no limite.** Cerca de 5.750 palavras (6.000 contando por espaços), perto do teto do briefing para um jogo leve. O que pesa: tabelas, a folha de consulta e os blocos de diferença de edição. Um editor pode cortar a seção 6 "Caixa de 2025" se a decisão for ignorar a edição nova.
- **Edição de 2025.** Não confirmei se ela circula no Brasil. Se a Galápagos passar a vender só a nova caixa, o tutorial precisa ser refeito sobre o manual de 2025 (Bilhetes iniciais, nomes, "Controlar").
- **A pergunta "Agora a sua mão" do 4 minutos** depende do mapa à frente do leitor e não tem resposta fixa, como no modelo de Clank!.
- **Sem teste de execução nem auditor independente.** Os portões automáticos passaram, mas medem forma, não aprendizagem. Legibilidade não medida.

## 7. Proposta de teste com leitores

Mesma moldura do PROMPT_PILOTO, seção 10: de 5 a 8 adultos que nunca jogaram Ticket to Ride; tarefas observáveis (montar para 2 e para 5, jogar os três primeiros turnos, pontuar a situação de Carla); medidas de autonomia, precisão (lista feita da base de regras R6 a R46, com atenção a R14 a R16 e R21 a R23), tempo até o primeiro turno independente, retenção após 7 dias, esforço mental (escala de 9 pontos de Paas) e satisfação. Nenhum resultado foi observado; nada aqui diz que o tutorial ensina melhor que o manual.

## 8. Ligação com uma resenha futura

O site não tem resenha de Ticket to Ride (`resenha: null`). Quando houver, basta preencher o campo `resenha` no JSON: o conversor já põe o link "Leia a nossa resenha" no fim da página.

## Auditoria independente

Feita em 31/10/2026 por um auditor que não escreveu o texto.

**Fontes baixadas pelo auditor (fora do repositório).** Manual brasileiro pela mesma API da Biblioteca de Downloads da Galápagos (`id=2280`): HTTP 200, ZIP com "T2R rules BR-compressed.pdf", 4 páginas, sha256 78280479…7c101c8c, igual ao do dossiê. Texto extraído com `pdftotext -layout`, página por página. A ordem das páginas confere com a do tutorial: p. 1 capa e história; p. 2 Componentes, Preparação, Objetivo e início do Turno; p. 3 Conquistar uma Rota, Comprar Bilhetes, Cartas de Vagão e Conquistando Rotas; p. 4 Tabela de Pontuação, Comprando Bilhetes, Final do Jogo e Calculando os Pontos. Também baixados, para conferência: o manual em inglês de 2015 (mesmo link do dossiê) e o manual de 2025 em português (link da página oficial da Days of Wonder).

**O que conferi.**

- Cada afirmação normativa do 4 minutos, das etapas 1 a 4, da seção 6, da avaliação e da folha de consulta contra a página citada do manual de 2016. Todas conferem, inclusive a Tabela de Pontuação (p. 4), as 110 cartas e 30 Bilhetes (p. 2), a Locomotiva aberta e a da reposição (p. 3), a pilha vazia (p. 3), as Rotas Duplas com 2 ou 3 jogadores (p. 3), a compra de Bilhetes e a pilha curta (p. 4), o fim com 0, 1 ou 2 trens (p. 4) e o desempate (p. 4).
- As leituras marcadas como `[!edicao]` (Locomotiva aberta como segunda carta, trens suficientes, só Locomotivas, Bilhetes antigos, empate persistente) estão de fato em aberto no manual de 2016 e estão apresentadas como leitura, não como regra. As afirmações sobre a edição de 2025 conferem com o manual de 2025 (33 Bilhetes, 4 iniciais com mínimo de 2 e devolução embaralhada, roxo, "Controlar", Locomotiva aberta só como primeira carta, rota inteira num único turno, devolução de Bilhetes na ordem que preferir, proibição de devolver Bilhetes antigos, primeiro jogador escolhido pela mesa, vitória dividida). O "todos os empatados" no Maior Caminho confere com o inglês ("all tied players score the 10 point bonus").
- Legalidade de cada exemplo: Montréal-New York com Azul, Azul e Locomotiva; a sequência Verde, Locomotiva na reposição, Verde, Amarelo; as três formas de pagar Montréal-Toronto (são exatamente três com 3 Verdes, 2 Vermelhos e 1 Locomotiva); a última volta de Ana e Bruno (Ana dispara o fim com 1 trem, Bruno e depois Ana jogam um turno cada). Todos legais.
- Contas refeitas num script Python próprio (scratchpad do auditor): tabela, 42 trens e 1 carta, 15 contra 8, 14 pontos e 10 trens, treino da tabela, Ana (44 trens, 83 pontos, sobra 1 trem; 83 + 14 + 10 = 107), Bruno (40 trens, 65 pontos), Carla 55, sua vez 69, caminho mais longo 10 (busca exaustiva no esquema A-B-C-D-E), avaliação 3, 5 e 8.
- JSON: 2 a 5 jogadores, 30 a 60 min e 8+ conferem com a capa do manual (p. 1); edição Galápagos confere; os três pontos do resumo conferem (p. 2 a 4).
- Regra essencial de fora: nenhuma. O manual não diz quem fica com a carta física de Maior Caminho num empate nem o que fazer se a pilha de Bilhetes acabar; o tutorial também não diz, o que é coerente.

**Problemas achados e corrigidos.**

1. **Conta errada no exemplo resolvido da etapa 4 (manual p. 4 para a regra de soma).** Bruno tem 65 pontos de rotas e 13 + 8 + 11 + 5 = 37 de Bilhetes, total **102**, não 95. Corrigido no tutorial. Ana continua vencendo (107 a 102) e o comentário "Por que importa" segue verdadeiro. A tabela da seção 3 desta auditoria, acima, também registra 95 por engano.
2. **JSON, campo `resumo`.** Dizia que a partida acaba "quando os trens de alguém acabarem"; pelo manual (p. 4) o fim começa quando alguém fica com 0, 1 ou 2 trens no fim do turno. Reescrito: "vence quem somar mais pontos no fim, que chega quando alguém fica com 2 trens ou menos."

**O que ficou em aberto.** As cinco leituras de `[!edicao]` dependem do manual de 2025 ou de dedução; estão bem sinalizadas, mas a da Locomotiva aberta como segunda carta aparece como resposta fechada no treino c e na folha de consulta (com a ressalva "leitura explicada na etapa 2"). Não confirmei se a edição de 2025 é vendida no Brasil. "Com um pedaço do Canadá" (seção 0) não está no manual brasileiro, que diz "mapa dos EUA"; o inglês fala em "North America" e o próprio manual cita Montréal e Toronto, por isso mantive.

**Teste de execução (só com o tutorial).**

- Preparação para 2 jogadores e para 5: feita sem consultar o manual, seguindo os 10 passos da etapa 1. Nada mudou entre 2 e 5 na mesa, como o texto avisa. Pequena adivinhação: onde fica a pilha de descarte das 5 cartas trocadas por 3 Locomotivas; o texto só diz "descarte", e a pilha de descarte é citada na etapa 1, o que basta.
- Rodada completa com 3 jogadores (compra de 2 cartas com reposição, compra de Locomotiva aberta, conquista de rota cinza e de Rota Dupla com a outra interditada, compra de Bilhetes): executada sem dúvida de regra. Adivinhação menor: o que fazer se a pilha de Bilhetes estiver vazia (o manual também não diz).
- Avaliação final respondida antes de ler as respostas: não; mais uma; não; não; 10 e 4; não; quatro; +4. As oito batem com as respostas do tutorial.

**Veredito.** Com as duas correções, o tutorial está pronto para publicar.
