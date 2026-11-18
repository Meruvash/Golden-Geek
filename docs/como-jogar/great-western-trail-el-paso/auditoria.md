# Auditoria: Como Jogar Great Western Trail: El Paso

18/11/2026. Duas auditorias independentes (conferência de regras contra o manual e partida simulada só com o tutorial). Cada achado foi conferido em `scratchpad/elpaso/manual.txt` (livro de regras, errata e apêndice brasileiros) e, quando citado, em `manual_en.txt` (Lookout). Rascunho: `"publicar": false`, sem commit.

## Auditoria de regras (veredito: aprovado com correções)

| # | Achado | Correção | Página |
|---|---|---|---|
| 1 | Etapa 1, "Sua vez": com 1 carta e limite 4, faltam duas depois da carta da pilha, não "a terceira" | Resposta certa passou a "para as duas que ainda faltam". As opções erradas continuam erradas: o engenheiro não conta no limite e só se embaralha quando falta a próxima carta | p. 7 |
| 2 | Objetivos: o guia dava duas regras para construções | O `[!mais]` segue o manual brasileiro (cada item, inclusive construção, conta para um objetivo só). A exceção da Lookout foi para um `[!edicao]`, como diferença não seguida. A folha de consulta diz "cada item num objetivo só" | p. 14; apêndice BR p. 6; apêndice EN p. 6 |
| 3 | Dois curingas em B: o motivo é o tipo diferente, não o preço | Texto reescrito: o sinal de diferente exige tipos diferentes | p. 9 |
| 4 | "Custa sempre 2 Dólares" valia também para o bônus | Seção 0 e etapa 2 limitam os 2 Dólares aos três custos (gado, trem, construção); o bônus é só descartar | p. 9 e 10 |
| 5 | Abertura dizia "um ponto" da Lookout | Agora "dois pontos" (limite de remoção e construção 2a), marcados onde aparecem | FAQ e apêndice EN |
| 6 | Solo incompleto | `[!mais]` dá o baralho da Sue (todas as A e de 0 a 3 B das 11 cartas solo), o disco no posto 5 e a primeira entrega no 7, pelo livro brasileiro. A mudança da Lookout (0 e 5) foi para um `[!edicao]` | p. 15 e 16; apêndice EN, abertura |
| 7 | "Pilhas vazias" dizia "fichas" | Agora "fichas bônus", como no manual brasileiro | p. 13 |
| 8 | Tabela de componentes | "Tabuleiro de jogo (playmat)"; "10 por jogador"; linha das 11 cartas do bot | p. 2 |
| 9 | Figura do mercado no lugar errado | `setup-mercado-banco` foi para logo depois do passo 9; a cópia repetida da etapa 2 já tinha sido tirada | p. 4 |
| 10 | 2a: comprar a ficha encerra o turno (opcional) | Confirmado no apêndice em inglês ("Either buy a bonus tile for $2 and end your turn"); acrescentado ao `[!edicao]` | apêndice EN, abertura |

## Teste de execução (leitor só com o tutorial)

| Achado | Correção | Página |
|---|---|---|
| A. Bloqueio: construções F e G e o trem citados sem descrição | Três tabelas novas: construções neutras A a G (etapa 1), construções comuns 1a a 6a e cartas de trem 1 a 4 com engenheiros, Dólares e ações (etapa 2) | apêndice BR p. 1, 3 e 4; p. 9 (preço da B) e p. 10 |
| B. Postos de troca só na figura | Texto da etapa 3 lista 0, 5, 7, 9 e 10, 12, 14, 16, 18, 20, com 2, 4, 7, 9, 12, 14 pontos; a folha de consulta repete os pontos | p. 12 a 14 e ilustrações das p. 12 e 13 |
| C. Cor do conjunto de gado | Passo 12: os quatro conjuntos são iguais; as cores são das raças | p. 5 |
| C. Cópias das construções comuns | Passo 8: 12 fichas para 6 construções, duas de cada, com qualquer número de jogadores. É contagem das p. 3 e 4; o manual não escreve "duas de cada" | p. 3 e 4 |
| C. Mercado: regra ou legenda; carta de cima ou qualquer | Passo 7 virou regra (cada raça perto do espaço do seu preço). O manual diz só "escolha uma carta"; como as cartas de uma raça são iguais, o guia diz isso e não inventa ordem | p. 4 e 10 |
| C. Engrenagens e ações auxiliares | Passo 11 liga as duas engrenagens descobertas às ações de ganhar 1 Dólar e de troca | p. 5 e 11 |
| C. Jogador inicial e ficha de objetivo | Lacuna: o manual não diz como escolher nem onde a ficha fica. O guia diz isso e sugere deixá-la à frente, aberta, marcando como leitura do guia | p. 5 |
| C. Ficha de troca que compra trabalhador | Trabalhador vai para a área (p. 7). Se se compra outra no lugar: lacuna; o guia diz que o manual não responde e adota "não compra outra" | p. 7 e 8 |
| C. Para onde vão trabalhadores gastos | Lacuna; a leitura do guia (pilha de descarte pessoal) agora vale para custo e bônus, com o motivo | p. 7 e 14 |
| C. Espaços de construção e custo | Passo a passo: os espaços claros sem ficha da ilustração; custo em moeda impresso no espaço. Os valores de cada espaço só estão no tabuleiro | p. 4 e 10 |
| C. Máximo da trilha de certificados | `[!mais]`: até o espaço 4; o que passaria não é ganho (o manual diz "até um espaço por símbolo" e "não pode ir além do espaço 4") | p. 8 |
| C. Suprimentos com 2 ou 3 jogadores | O manual só muda o Simental; o guia diz isso | p. 4 e 5 |

## O que não foi possível confirmar no manual

- Recompensa de cada posto de troca: está só em ícones pequenos do tabuleiro (p. 4, 12 e 13). O texto cita só exemplos (Dólares, ficha de objetivo, contratar trabalhador), e o guia fica nisso.
- Custo de cada espaço de construção: impresso no tabuleiro, não no texto.
- Método para escolher o jogador inicial, posição da ficha de objetivo, reposição na ficha de troca que compra trabalhador, destino dos trabalhadores descartados, "próximo jogador" no fim: lacunas, marcadas no texto.
- Identidade do vídeo do Duque: inferida pelo título e pela data; a descrição não foi lida.

## Contas

`scratchpad/elpaso_scripts/contas.py`: 31 contas, todas OK. Novas: trem 2, 4, 6, 8 Dólares; B 5 + 8 = 13; pontos dos postos; 4 − 1 − 1 = 2 cartas depois de embaralhar.

## Portões

- `python3 tools/checar_comece.py docs/como-jogar/great-western-trail-el-paso/tutorial.md`: "seção Comece a jogar dentro da diretriz".
- Padrões de `tools/vicios.py`: nenhum.
- Travessão e meia-risca no tutorial: zero.
- Palavras: 9.715 (eram 8.833). O aumento vem das tabelas de construções e trem pedidas no achado A.

## Pontos fracos que restam

- O tutorial passou bem do alvo do BRIEF; o corpo das etapas ainda é a menor parte, mas há repetição entre as tabelas das etapas e a folha de consulta.
- O teste de execução foi feito por uma máquina que já sabe ler manual: é sinal de lacuna, não prova de que uma pessoa aprende com o texto.

## Re-auditoria dirigida (18/11/2026)

Auditor de regras conferiu as tabelas novas (construções neutras A a G, construções 1a a 6a, cartas de trem), postos de troca e pontos, e as respostas novas: aprovado. Único ajuste LEVE aplicado: passo 12 passou a dizer "Os quatro conjuntos têm as mesmas raças (p. 3 e 5)" em vez de afirmar sem página que são iguais.
