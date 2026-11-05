# Auditoria: Como Jogar Heat: Pedal to the Metal

Entrega 3. Autoverificação do redator, feita em 05/11/2026 com o manual aberto (texto por página em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/heat/raw/p1.txt` a `p8.txt` e páginas renderizadas em `.../d1105/heat/img/`). Não é a auditoria independente: o briefing proíbe subagentes, e ela será feita depois por outro agente. `publicar` continua `false`.

## 1. Fontes efetivamente usadas

- Manual oficial em inglês das regras básicas, Days of Wonder, "Rules v1.1", 8 páginas, lido inteiro. Fonte das páginas citadas.
- Livreto avançado em inglês, lido nas p. 1, 2, 5 e 12, só para dizer o que fica de fora.
- Página do jogo na Days of Wonder (jogadores, idade, duração, conteúdo).
- oEmbed do vídeo do Duque Board Games.
- **Não obtido:** manual da edição brasileira. O item HET001 da biblioteca da Asmodee Brasil devolve 404 no download público (`group=b2c`). O arquivo do grupo `b2b` não foi usado (ver dossiê, seção 2). Sem FAQ ou errata oficial.

## 2. Conferência regra por regra

| Regra (dossiê) | Onde está no tutorial | Conferência no manual |
|---|---|---|
| P1, P2 componentes | Montagem, tabela | p. 2. Confere (72 básicas, 18 melhorias, 37 estresse, 48 calor, 6 de cada peça). |
| P3 pista dos EUA, 1 volta | Montagem 1; 4min | p. 3 "consider only racing 1 lap". Confere; escrito como sugestão. |
| P4 o que cada um pega | Montagem 2 | p. 3. Confere. |
| P5, P6 quadro da pista | Montagem 3 e figura | p. 3; números lidos na ilustração a 300 dpi (2, 69, 4; 6 e 3). Confere. |
| P7 a P10 baralho, motor, pino, reserva | Montagem 4 a 7; conferência; pergunta | p. 3. Confere (18 cartas pela conta). |
| P11 grid | Montagem 8; "Quem começa" | p. 3 e 4. Confere. "Não há primeiro jogador" é explicação nossa: a ordem vem do grid. |
| P12 7 cartas | Montagem 9 | p. 3. Confere. |
| P13 handicap | `[!mais]` da montagem | p. 3. Confere, como sugestão. |
| P14 solo e Lendas | Montagem, parágrafo depois da tabela | p. 1; av. p. 5. Confere. A sugestão de Lendas abaixo de 4 jogadores não entrou no texto (módulo avançado). |
| P15 o que volta para a caixa | Montagem, "O que volta para a caixa" | p. 2 diz que o resto fica na caixa; o calor que sobra é inferência [I]. |
| R1, R2 estrutura | 4min; etapa 1 entender | p. 4. Confere. |
| R3 ordem fixa ou recalculada | `[!edicao]` da etapa 3 | Lacuna; não afirmada. |
| R4 troca de marcha | 4min; etapa 1 passos; `[!mais]` etapa 2 | p. 4 e 7. Confere. |
| R5 troca dupla sem calor | não afirmado | Lacuna; o tutorial só diz "pagando 1 calor". |
| R6 jogar cartas | 4min; etapa 1 passos; complete | p. 4. Confere. |
| R7 mover exatamente | 4min; passos; `[!atencao]`; avaliação 2 | p. 5. Confere. |
| R8, R9 bloqueio e lado a lado | `[!mais]` etapa 1; sua vez; folha | p. 5. Confere. |
| R10 vagas lado a lado | etapa 1 entender | Ilustração [I]; o texto não diz "duas". |
| R11 a R14 estresse e melhorias | `[!mais]` etapa 1; figura; exemplo; sua vez; situações especiais | p. 5 e 7. Confere. A conta do exemplo do manual (8) foi refeita. |
| R15, R16 completar a mão, baralho vazio | passos; `[!mais]` | p. 6. Confere. |
| C1 a C4 conferir curva | 4min; etapa 2 passos; exemplos; treino | p. 6. Confere. |
| C5 pagar calor | etapa 0; `[!mais]` etapa 3 | p. 7. Confere. |
| C6 rodar | `[!atencao]` etapa 2; exemplos; sua vez; avaliação 3 | p. 6. Confere. |
| C7 estresse da reserva | `[!atencao]` etapa 2 ("da reserva") | [I]: o manual diz "Take 1 extra Stress card into your hand", sem dizer de onde. |
| C8, C9 calor na mão, mão entupida | `[!mais]` etapa 2; avaliação 5; folha | p. 7. Confere. |
| C10 sem limite depois da chegada | etapa 3, fim da corrida | p. 7. Confere. |
| A1, A2 adrenalina | etapa 3 passos; complete; `[!mais]`; avaliação 6; tabela da montagem | p. 5 e 7. Confere. |
| A3 a A6 reagir, resfriamento, turbo | etapa 3 passos; exemplos; sua vez | p. 5 a 7. Confere. |
| A7 a A9 vácuo | etapa 3 passos; `[!atencao]`; exemplo; `[!edicao]`; avaliação 4 | p. 6 e 7. Confere; "logo atrás" é a leitura [I] registrada no `[!edicao]`. |
| A10 descartar | etapa 3 passos; `[!mais]`; avaliação 5 | p. 6. Confere. |
| V1 a V3 vitória | 4min; etapa 3 fim; treino; folha | p. 7. Confere. |

## 3. Exemplos: legalidade e contas

Todas as contas foram refeitas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/heat/bin/contas.py` (saída no dossiê, seção 8). Legalidade conferida:

- Cada mão de exemplo tem cartas que existem (básicas de 1 a 4, três de cada; melhoria 5; calor; estresse). O complete da etapa 1 tem 7 cartas na mão (2 calor, 1 estresse, 1, 2, 3, 4).
- O número de cartas jogadas bate com a marcha em todos os exemplos (2ª: 2 cartas; 3ª: 3; 4ª: 4).
- A avaliação 3 foi corrigida durante a revisão: a primeira versão tinha velocidade 7 na 1ª marcha, impossível com uma carta só (máximo 5, a melhoria). Passou para a 2ª marcha (4 + 3).
- O exemplo do turbo foi ajustado para limite 8, para que o calor gasto no turno (5) caiba num motor que começa com 6.

## 4. Pontos de interpretação delicada

1. Ordem dos turnos durante a rodada (R3): o manual diz "proceed back through the positions". Não está claro se um carro ultrapassado por quem já jogou passa a jogar antes. O tutorial não afirma nada além do texto e registra a dúvida no `[!edicao]`.
2. Vácuo "numa casa atrás" (A8): lido como a casa imediatamente atrás, pelo ícone.
3. Origem do estresse do rodopio (C7): da reserva.
4. Troca dupla sem calor no motor (R5): lacuna; o tutorial não trata.
5. Termos brasileiros: todos traduzidos pelo guia; podem divergir da caixa da Galápagos.

## 5. Componentes do plano, com trechos

- Tarefa com apoio decrescente: etapa 2 tem dois resolvidos ("Você está na 4ª marcha, com 2 cartas de calor..."; "Duas curvas no mesmo turno"), um complete ("Joga 4 e 4 e cruza uma curva de limite 5") e uma sua vez com rodopio.
- Apoio: "O motor é o seu orçamento..." (seção 0); "A curva não olha onde você parou..." (etapa 2).
- Procedural: `[!passos]` das três etapas e a folha de consulta.
- Prática específica: treino da etapa 2 (igual ao limite; estresse por marcha) e da chegada.

## 6. Clareza e completude: pontos fracos que restam

- **Fonte em inglês.** O maior risco: o leitor com a caixa brasileira vai encontrar nomes diferentes. O aviso está na abertura e em Situações especiais. Quando o manual brasileiro estiver acessível, a revisão de termos é obrigatória.
- **Figuras com texto em inglês.** `sequencia.webp` tem os nomes dos passos em inglês na arte; a legenda traduz. `setup-componentes.webp` traz rótulos curtos de quantidade ("x3", "37 Stress cards").
- **Passos sem figura própria.** O passo 2 (cada um pega as peças da cor) usa a figura dos componentes da p. 2; os passos 4, 5 e 6 dividem uma figura (o manual ilustra os três num só quadro); o passo 9 (comprar 7) não é ilustrado no manual.
- **Figura do grid pequena.** O recorte do grid (8) mostra os carros pequenos; a figura do tabuleiro inteiro ajuda a situar.
- **O painel do jogador** não tem figura explicada ícone por ícone (o manual não traz uma); o leitor pode estranhar os símbolos de turbo e resfriamento ao lado de cada marcha.
- **Vídeo** é de partida resumida, não de regras; o Duque não tem vídeo só de regras de Heat na busca do canal.

## 7. Teste com leitores (proposta)

O mesmo protocolo do piloto (PROMPT_PILOTO, seção 10): 5 a 8 adultos que nunca jogaram; tarefas observáveis (montar para 2 e para 6; jogar uma rodada com uma curva; resolver um rodopio dado); medir autonomia, erros de regra, tempo até a primeira rodada sem ajuda, retenção em 7 dias e esforço mental (escala de Paas). Atenção específica: se a pessoa paga a curva com o vácuo incluído e se anda menos que a velocidade.

## 8. Ligação com a resenha

A resenha `/heat-pedal-to-the-metal/` já usa calor, estresse, resfriamento, turbo, vácuo e adrenalina; o tutorial usa os mesmos nomes, e o JSON aponta `"resenha": "heat-pedal-to-the-metal"`, o que faz o gerador pôr o link "Leia a nossa resenha" e as fotos oficiais da resenha.
