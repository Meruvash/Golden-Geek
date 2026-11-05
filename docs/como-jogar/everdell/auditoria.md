# Auditoria: Como Jogar Everdell

Entrega 3. Autoverificação do redator, feita em 05/11/2026 com o livro de regras e a errata abertos (texto por página em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/everdell/manual/paginas/regras-pNN.txt` e `errata-pN.txt`, páginas renderizadas em `.../manual/png/` e `.../manual/r200/`). Não é a auditoria independente: o briefing proíbe subagentes, e ela será feita depois por outro agente. `publicar` continua `false`.

## 1. Fontes efetivamente usadas

- Livro de regras brasileiro EVE001 v2.0 (Galápagos), 24 páginas, lido inteiro (p. 2, 22 e 23 são texto de ambientação e créditos). Fonte das páginas citadas.
- Errata oficial v2.0 (10/2023), 3 páginas, lida inteira.
- Página do produto EVE001 na loja da Asmodee Brasil (jogadores, idade, duração, marca).
- Manual em inglês da Tabletop Tycoon: só imagem, consultado na página de Eventos.
- oEmbed do vídeo do Covil dos Jogos e do vídeo de opinião do Duque Board Games (não usado).
- Não obtidos: ficha da Ludopedia (403 ao robô, não contornado); FAQ oficial (não há na biblioteca); vídeo de regras do Duque (não existe para o jogo base).

## 2. Conferência regra por regra

| Regra (dossiê) | Onde está no tutorial | Conferência no manual |
|---|---|---|
| S1 componentes | Montagem, tabela | p. 4 e 5. Confere (30 fichas = 10 de 3 + 20 de 1). |
| S2, S3 tabuleiro, árvore, montagem da árvore | passos 1 e 2 | p. 6; p. 5 só mostra peças. Lacuna dita no texto. |
| S4, S5 recursos e fichas | passos 3 e 4; `[!mais]` da etapa 1 | p. 6 e 7. Confere. |
| S6 Floresta 3/4 | passo 5; tabela; Comece 2; avaliação 1 | p. 6. Confere. |
| S7 Eventos | passos 6 e 7 | p. 6. Confere (16 especiais, 4 na árvore, 12 na caixa). |
| S8, S9 Campina, baralho, descarte | passos 8 a 10 | p. 6 e 7. Confere. |
| S10, S11 trabalhadores e cartas | passos 11 a 13; tabela | p. 6. Confere. |
| S12 quem começa | passo 14; Comece 6 | p. 6 "A pessoa mais humilde", p. 8 sentido horário. Confere. |
| S13 sem recursos iniciais | passo 15; Comece | Leitura por ausência (nenhum passo dá recurso). |
| A1 uma ação | Comece; etapa 1 | p. 3 e 8. Confere. |
| A2, A3 exclusivo/compartilhado | Comece 2 e 3; etapa 1 passos; atenção; avaliação 2 | p. 8. Confere. |
| A4 locais básicos | tabela do Comece; figura | Ilustração p. 8; texto confirma 5 dos 8 locais (p. 8 e 16). Ver seção 4. |
| A5 Floresta | Comece; etapa 1 passos e `[!mais]`; sua vez | p. 8. Confere. |
| A6, A7 Refúgio | etapa 1 passos; resolvido; complete | p. 9. Confere. |
| A8, A9 limite de 8 | Comece 4 e sua vez; erros caros | p. 11. Confere. |
| A10 a A12 comprar, dar cartas, baralho vazio | Comece 4; `[!mais]` da etapa 1 | p. 11. Confere. |
| C1 a C7 jogar carta | etapa 2 passos e `[!mais]` | p. 10 e 11. Confere. A sequência do manual começa com "use a habilidade de carta" e põe "repor a Campina" antes de pôr a carta na vila; os dois estão no tutorial (`[!mais]` "Habilidade de desconto" e passo 3). |
| C8 a C10 cartas específicas | `[!mais]` da etapa 2 | p. 18 e 20. Confere. |
| C11 custos | resolvido e complete da etapa 2; legenda da figura | p. 12 (texto), p. 10 (ilustração). Confere. |
| Errata Ruínas e textos | `[!edicao]` da etapa 2 | errata p. 1 a 3. Confere. |
| E1 a E4 estações | etapa 3 passos, tabela, atenção, `[!mais]`; complete; avaliação 3 | p. 3, 12 e 13. Confere. |
| D1 Destino | etapa 3 passos; sua vez (Correio) | p. 9 e 11. Confere. |
| V1 a V4 Eventos | etapa 3 passos, figura, `[!edicao]`, `[!mais]` | p. 9. Confere; V3 e V4 tratadas como lacuna. |
| J1, J2 Jornada | etapa 3 passos, dica, sua vez; avaliação 4 | p. 9; J2 interpretada. |
| F1 a F5 fim e contagem | etapa 4 passos, `[!mais]`, resolvido, sua vez; avaliação 5 | p. 14 e 15. Confere. |
| Cemitério, Monastério, Ruínas com fichas e trabalhadores | Situações especiais | p. 18, 20 e 21. Confere. |

## 3. Exemplos: legalidade e contas

- Comece: Ana no local de 3 gravetos (exclusivo), Bruno no de 2 gravetos e 1 carta (compartilhado), mãos de 5 e 6 em 2 jogadores. Legal (p. 6 e 8).
- Etapa 1: Refúgio com 7 cartas, descarta 5, recebe 2. Conta no script.
- Etapa 2: é o exemplo do próprio manual (p. 12), recalculado passo a passo. Complete com Tribunal e Juíza: par Construção/Criatura gratuita lido nas duas cartas da ilustração (p. 10).
- Etapa 3: continuação do exemplo da p. 12 (primavera), 6 gravetos e 1 fruto. Igual ao manual ("recebe 1 fruto e 2 gravetos").
- Etapa 4: contagem de 62 do manual (p. 14), com a decomposição dos 10 pontos de Prosperidade conferida pelos textos do Rei, da Arquiteta e da Esposa (p. 18 e 19) e pela ilustração da p. 15 (1 cristal e 1 seixo sobrando; Grande Circuito como Evento básico). Complete do Rei e sua vez da Arquiteta: contas no script.

## 4. Pontos de interpretação delicada

1. **Os 8 locais básicos (A4).** O texto do manual não lista os locais; a tabela do Comece foi lida na faixa ilustrada da p. 8 (643 x 76 px no PDF, ampliada), com apoio do texto em 5 locais (p. 8 e 16). O tipo (exclusivo ou compartilhado) saiu do desenho do círculo: fechados no de 3 gravetos, 2 cristais, 1 seixo e 1 fruto e 1 carta; abertos nos outros quatro. É o ponto que o auditor independente deve conferir com mais cuidado, de preferência no tabuleiro.
2. **Exigências dos Eventos básicos (V3).** Só a do Grande Circuito está escrita. O tutorial não inventa as outras e manda conferir no tabuleiro.
3. **Jornada pela estação de cada jogador (J2).** O manual diz "Apenas no outono" e que cada um se prepara no seu ritmo; a leitura é que vale o outono de quem envia o trabalhador.
4. **Recursos iniciais (S13).** Nenhum passo dá recurso; o tutorial diz isso e justifica que o primeiro turno "quase sempre" é alocar.
5. **Quem começa antes de distribuir cartas (S14).** Necessidade prática da ordem; o tutorial avisa no passo 12.
6. **Carta de vitória (S15).** Listada na p. 5, sem regra. O tutorial diz isso.

## 5. Componentes do plano, com trechos

- Tarefa de aprendizagem: "Ana começa, com 5 cartas na mão, e põe um trabalhador no local de 3 gravetos" (Comece); "Turno 1: trabalhador no local de 3 gravetos..." (etapa 2); a contagem de 62 (etapa 4).
- Apoio: "Os trabalhadores são a sua única fonte de recursos no começo, e são poucos" (etapa 1); "As cartas são o motor e o placar ao mesmo tempo" (etapa 2).
- Procedimento: os blocos `[!passos]` de cada etapa e a folha de consulta.
- Prática específica: limite de 8 cartas (Comece, sua vez) e a contagem de bônus roxos (etapa 4).

## 6. Clareza e completude: pontos fracos que restam

- Os recortes das figuras são pequenos (as ilustrações do PDF têm 100 ppi); a dos locais básicos tem 118 px de altura e não permite ler as placas no celular. A tabela do Comece supre o conteúdo.
- A figura `preparacao.webp` é a p. 7 inteira, com as legendas do manual ("Jogador 1", "5 cartas", "Coloque aqui a pilha de descarte"); a nota de texto sobre recursos foi apagada, e ficou um pequeno recorte reto na borda do tabuleiro, que já estava sob a caixa da nota no original.
- Passos sem figura própria: 9 e 10 (baralho e descarte aparecem nas figuras de Eventos e da página inteira), 14 e 15 (não ilustráveis). O passo 1 usa o tabuleiro vazio da p. 4.
- A foto `fotos/mesa-1.webp` (pasta de outro agente, criada durante este trabalho) entrou no fim da montagem com o crédito do `fontes.json` ("Imagem: Tabletop Tycoon"). É uma imagem digital (render 3D) de partida em andamento, da 3ª edição em inglês, e a legenda diz isso.
- Exigências dos Eventos básicos não ensinadas (lacuna do manual).
- As cartas são ensinadas por cor e por exemplo; o leitor depende do texto impresso de cada carta e do glossário das p. 18 a 21. As regras de Torre do Relógio, Despensa, Rainha e outras ficaram fora, por serem texto de carta.
- O vídeo não é do Duque (não há vídeo de regras do jogo base no canal). O do Covil dos Jogos é uma explicação ao vivo longa e pode mostrar outra edição; não foi assistido.
- Extensão no teto (cerca de 6.070 palavras com letra; 6.640 pelo `wc`).

## 7. Teste com leitores (proposta)

Como no protocolo do PROMPT_PILOTO, seção 10: 5 a 8 adultos que nunca jogaram; tarefas: montar para 2 e para 4, jogar até a primavera, pontuar a vila da p. 15; medidas de autonomia, precisão (lista feita da base de regras), tempo, retenção em 7 dias, esforço mental (Paas, 9 pontos) e satisfação. Nenhum resultado foi observado.

## 8. Ligação com a resenha

Não há resenha de Everdell no site (`everdell/` e `conteudo/everdell.json` não existem). Se vier a existir, a resenha pode linkar "Como jogar" no bloco de como funciona, e o tutorial ganha `"resenha": "everdell"` no JSON.

## Auditoria independente (05/11/2026)

Duas auditorias independentes: conferência de regras contra o manual (aprovado com correções) e partida simulada só com o tutorial (joga com ajustes). Correções aplicadas no mesmo dia:

**Conferência**
- Os 8 locais básicos foram confirmados na ampliação da p. 8. O tipo de três deles (2 gravetos e 1 carta, 1 cristal e 1 carta, 1 fruto) vem só da ilustração; o tutorial diz isso na legenda da figura.
- E1. Errata: o `[!edicao]` agora diz que duas correções mudam o jogo (carta de Floresta que compra 2 da Campina: joga-se 1 pagando 1 recurso a menos; Criatura gratuita do Escultor de Madeira vem da Despensa, não do Armazém).
- S2. Tirado "de papelão" da tabela. S3. "A p. 5 mostra a árvore em quatro estágios de montagem, sem instruções escritas." S4. Trabalhadores sem dono, dado e carta de vitória marcados como dedução; o manual só manda guardar as cartas de Floresta e de Evento que sobram (p. 6); dado só no solo (p. 4). S5. "A preparação (p. 6) não dá recursos a ninguém."
- M6. Regra de dar a quem passou, literal: "e todos os jogadores já tiverem passado a vez" (p. 14).
- M7. "Quem começa" passou para o passo 12, antes das cartas (passo 13), com "ou sorteiem" marcado como conselho do guia; o Comece avisa o mesmo.
- M8. A lacuna dos Eventos básicos virou `[!atencao]`, dizendo que as exigências estão impressas junto das peças no tabuleiro (Monumento do Vale, Festival da Colheita).
- M9. `preparacao.webp`: apagados o bloco "Coloque aqui a pilha de descarte...", o "2" órfão da nota e o pedaço do número de página "7" (recorte até 1795 px na renderização de 200 dpi).

**Partida simulada**
- Custo, pontos, tipo e habilidade das cartas dos exemplos: Fazenda e Sapo Balseiro no resolvido da etapa 2 (p. 12, 15, 19 e 20, conferidos na ampliação da p. 15: Fazenda 1 ponto, Sapo Balseiro 2 frutos e 1 ponto); Tribunal e Juíza no complete (p. 10, 18 e 21), com "nada quando ele mesmo é jogado" para o Tribunal.
- Legenda da figura da carta diz que o Tribunal é Singular.
- Fichas de pontuação: "10 de 3 pontos e 20 de 1 ponto", como na p. 4, sem o total somado.
- Carta de vitória: "deixe na caixa: o manual não lhe dá regra".
- Legendas do Refúgio e da Jornada alinhadas (Refúgio à esquerda e Jornada à direita na figura da p. 9; na do tabuleiro, Jornada embaixo à esquerda e Refúgio embaixo à direita, que é a posição real).
- Verão: "pegar até 2 das cartas abertas da Campina", com `[!mais]` dizendo que é a exceção à regra de comprar do baralho.
- Introdução da montagem: cita o segundo espaço de Floresta com 4 jogadores e a mão pela ordem de jogo.
- Definições na primeira menção: ficha de Ocupado (passo 4), Jornada e Refúgio (legenda do tabuleiro), Produção, Destino e Jornada ("Ainda não precisa saber"), ABERTO (passo a passo de Destino).
- "1 trabalhador só, seja seu ou de outro." O "(5)" das legendas de baralho e Campina foi reescrito.

**Portões depois das correções:** `checar_comece.py` aprovado (aviso só de "Jornada", nome do local na caixa); `vicios.py` no tutorial e no JSON: só "jornada"; travessão e meia-risca: 0; 23 perguntas renderizadas; leitura do essencial: cerca de 8 min. Extensão subiu para cerca de 6.470 palavras com letra (7.040 pelo `wc -w`), acima do teto de 6.000, por causa dos dados de carta e das definições pedidos pela partida simulada. `publicar` continua `false`.
