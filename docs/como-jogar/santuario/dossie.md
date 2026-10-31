# Dossiê: Como Jogar Santuário

Entrega 1 da linha COMO JOGAR para Santuário (Sanctuary, de Mathias Wigge, "An Ark Nova Game"). Produzido em 31/10/2026 segundo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções definidas pelo editor para este jogo (abaixo). Nada daqui está publicado.

---

## 1. O jogo e as exceções ao método

**Escolha.** O jogo foi definido pelo editor; não houve etapa de candidatos. Santuário tem resenha no site (`santuario/` e `conteudo/santuario.json`), usada só como mapa de dúvidas e para manter os nomes coerentes, nunca como fonte de regra.

**Exceções decididas pelo editor** (valem mais que o PROMPT_PILOTO):

- **Manual em inglês.** A Grok Games, editora brasileira, não publica o manual em português. A única fonte de regra é o manual oficial em inglês da Capstone Games (v1). Os nomes em português são tradução nossa (glossário, seção 3). O tutorial diz isso na linha de origem e as páginas citadas são as do manual em inglês: "(p. 3)".
- **Pasta.** `docs/como-jogar/santuario/` (dossie.md, tutorial.md, auditoria.md) e `conteudo/como-jogar/santuario.json`. Manual e PDF ficam no scratchpad.
- **Sem commit nem push**, sem subagentes. A auditoria independente será feita depois; o `auditoria.md` registra a autoverificação.
- **Extensão:** 3.500 a 6.000 palavras; o que fica à vista, curto; casos especiais em blocos `[!mais]`.

## 2. Fontes

| Fonte | Versão | Onde | Uso |
|---|---|---|---|
| **Manual oficial** *Sanctuary Rulebook*, Capstone Games | Arquivo "Sanctuary_Rules_Print_Capstone_EN_V1_Web.pdf", 8 páginas A4, criado em 08/12/2025 (Adobe InDesign 21.0), sem número de versão impresso além de "V1" no nome | https://www.feuerland-spiele.de/fileadmin/game/Artengarten/Sanctuary_Rules_Print_Capstone_EN_V1_Web.pdf, baixado em 31/10/2026 | Única fonte de regra |
| Página do produto na loja da Grok Games | Consultada em 31/10/2026 (cópia em `scratchpad/manuais/santuario/produto.html`) | https://loja.grokgames.com.br | Só para vocabulário: a descrição fala em "edifícios" e "objetivos de conservação" |
| Resenha do Elite, `conteudo/santuario.json` | Consulta de 28/10/2026 | repositório | Mapa de dúvidas e nomes (prédios, metas de conservação, espaços livres, vitrine, marcador de conservação) |
| Glossário das peças, folhas de ajuda, regras solo | Não obtidos | O manual remete a eles (p. 2, 3, 8) | Lacuna: o tutorial manda o leitor a eles |
| FAQ ou errata | Não procurados | O manual remete a https://capstone-games.com/board-games/sanctuary/ (p. 1) | Lacuna |

**Como o manual foi lido.** O PDF tem camada de texto. O texto foi extraído por página com `pdftotext -layout` (arquivo `regras_en_paginas.txt`, preparado antes desta sessão) e, de novo, página por página sem `-layout` (`p1.txt` a `p8.txt`). As 8 páginas foram renderizadas a 80 dpi e lidas como imagem; as ilustrações de que o texto depende (cartas de ação, marcadores de conquista, mapa do zoológico) foram conferidas em recortes a 200 e 250 dpi.

**Trechos que a extração embaralhou e como foram resolvidos.**

- **p. 1, itens B a D da preparação.** O texto das cartas de ação ilustradas ("Play 1 Animal with the habitat FOREST or undefined", "Draw 2 tiles from the pile") se intercala com as instruções e quebra a frase "Place 1 tile holder in front of you" em pedaços ("1the tile holder", "D Place from display."). Resolvido pela leitura da página como imagem.
- **p. 4, passo 2.** "ChooseTile1range of your Action cards and pull it a bit downward": o rótulo "Tile range" da carta entrou no meio da frase. A imagem confirma: "Choose 1 of your Action cards and pull it a bit downward in its slot".
- **p. 5.** "Drawhave 2 tiles from the pile. You have 3 different Action cards" e a legenda do exemplo do crocodilo misturada aos textos das cartas. Resolvido pela imagem e pela extração sem `-layout`.
- **p. 6.** As legendas do exemplo da fila (Projetos usada na força 3) aparecem entre textos de cartas. A imagem mostra a fila antes e depois: Projetos vai ao encaixe 1; Rocha e Floresta passam a 2 e 3; Água fica no 4.
- **p. 7.** O exemplo das aves começa no meio ("in your zoo A , but you EXAMPLE: You have 3 bird icons"). Os valores dos marcadores de conquista não estão no texto ("× 5 × 7 ×"): foram lidos na ilustração, 2× = 5, 3× = 7, 4× = 10, 5× = 14 pontos. O 5× = 14 confere com o texto do exemplo.
- **p. 8.** Os ícones dos marcadores de fim de jogo viram "1." e "2..." no texto. A imagem mostra o marcador de 10 pontos (quem dispara) e o de 5.
- **Carta de Projetos (p. 1, 3 e 4).** O texto diz "white arrow" e "Tile range / Project level"; a imagem mostra que é uma seta só, que marca as duas coisas.

**Jogadores, duração e idade.** O manual não traz a ficha da caixa. Ele confirma de forma indireta o intervalo de 1 a 5 jogadores (preparação com 5 jogadores, p. 1; "solo mode only", p. 8). Duração ("20 min por jogador") e idade ("12+") vêm da ficha de `conteudo/santuario.json` (fonte dela: página da Feuerland). A ficha registra também "40 a 100 minutos na caixa da Capstone"; o JSON do tutorial usa "20 min por jogador", como as etiquetas da resenha.

## 3. Glossário (inglês do manual para o português do tutorial)

Regra de escolha: quando a resenha do site já usa um nome, o tutorial usa o mesmo. Onde a resenha não usa nome, tradução direta e curta. Um termo, sempre o mesmo.

| Inglês (manual) | Português (tutorial) | Página | Explicação | Origem do nome |
|---|---|---|---|---|
| Display board / display | tabuleiro da vitrine / vitrine | 1 | 6 peças abertas, posições 1 a 6 | resenha ("vitrine") |
| tiles / the pile | peças / a pilha | 1 | peças viradas para baixo, em uma ou mais pilhas | resenha ("peças") |
| discard pile | pilha de descarte, descarte | 1, 3 | peças descartadas, viradas para cima | nossa |
| Zoo map | tabuleiro do zoológico | 1 | tabuleiro pessoal | nossa (resenha: "tabuleiro de casas hexagonais") |
| space / empty space | casa / casa vazia | 3 | hexágono do tabuleiro sem peça e sem espaço livre impresso | nossa; "casa" evita confusão com "espaço livre" |
| zoo entrance | entrada do zoológico | 3 | as 3 casas vizinhas dela recebem a primeira peça | nossa |
| Open Area | espaço livre | 2, 3 | peça da mão virada para baixo (ou impressa), 1 ponto | resenha ("espaços livres") |
| placement bonus | bônus de colocação | 3 | bônus impresso numa casa | nossa |
| River / by the River | Rio / à beira do Rio | 3 | as 3 casas de cada borda lateral | nossa |
| Animal / Building / Project | Animal / Prédio / Projeto | 2 | tipos de peça (amarelo, azul, roxo) | resenha ("animais, prédios e projetos"); a Grok diz "edifícios" |
| habitat Rock / Forest / Water / undefined | Rocha / Floresta / Água / indefinido | 2, 5 | habitats; o indefinido entra com qualquer carta de Animais | resenha |
| continent / animal class | continente / classe de animal | 2 | ícones de peça | resenha |
| level | nível | 2 | número à esquerda de Animais e Projetos | resenha |
| condition (Building) | condição | 2, 6 | exigência à esquerda do Prédio | nossa |
| one-time effect / ongoing effect | efeito com raio / efeito com o símbolo de infinito (contínuo) | 2 | o tutorial nomeia pelo símbolo | nossa |
| Animal pairs (male / female) | casal (macho / fêmea) | 2 | duas peças de mesmo nome vizinhas: 1 marcador de conservação | resenha ("casal") |
| Release into the wild | Soltura na natureza | 5 | Projeto posto em cima de um Animal | nossa |
| Action cards | cartas de ação | 1, 3 | as 4 cartas da fila | nossa; a resenha diz "peças de ação" (ver seção 5) |
| Projects Action card / Animals Action cards | carta de Projetos / cartas de Animais (de Rocha, de Floresta, de Água) | 1, 4, 5 | | nossa |
| slot | encaixe | 1, 3 | as 4 posições da fila, 1 (esquerda) a 4 | nossa |
| strength | força | 3 | número para onde aponta a seta | resenha |
| Tile range | alcance | 1, 4 | seta da carta de Projetos no passo 1 | nossa |
| side I / side II | lado I / lado II | 1, 3 | lado II = melhorada | nossa |
| tile holder / hand | suporte de peças / mão | 1 | peças só você vê | nossa |
| Conservation board / Conservation objectives | tabuleiro de conservação / metas de conservação | 1, 7 | 5 metas sorteadas entre 10 | resenha ("metas"); a Grok diz "objetivos de conservação" |
| Conservation markers | marcadores de conservação | 1, 2, 7 | valem 1 ícone ao apoiar meta, ou 2 pontos no fim | resenha |
| Conservation Achievement markers | marcadores de conquista | 1, 7 | 2×, 3×, 4×, 5×: 5, 7, 10, 14 pontos | nossa |
| Upgrade markers | marcadores de melhoria | 1, 7 | 4 condições (1, 2, 3=, 4≠) | nossa (resenha: "melhorar ações") |
| Pouch markers | marcadores de bolsa | 1, 2, 8 | 2 pontos no fim | nossa |
| End-of-game markers | marcadores de fim de jogo | 1, 8 | 10 (quem dispara) e 5 | nossa |
| Player aids / Glossary | folha de ajuda / Glossário | 2, 3 | explicam bônus e pontuação das peças | nossa |
| Administration / tile limit | manutenção / limite de mão | 4, 8 | fim do turno; 6 peças | nossa |

## 4. Base de regras

Classificação: `[V]` verificada (lida nesta sessão, no texto ou na ilustração indicada), `[I]` interpretada (leitura escolhida, com o motivo), `[L]` lacuna (o manual não diz). Páginas do manual em inglês.

### 4.1 Objetivo, estrutura e vitória

| # | Regra | Fonte (frase lida) | Cl. | Depende de |
|---|---|---|---|---|
| R1 | O jogo é feito de turnos individuais: pegar 1 peça da vitrine e fazer 1 ação; depois, o próximo em sentido horário | p2 "you take 1 tile from the display and then perform 1 action" | V | |
| R2 | Joga-se até alguém cumprir 1 das 3 condições de fim | p2 "until one of you meets 1 of the 3 end game conditions" | V | R44 |
| R3 | Mais pontos vence; empate: mais peças de Animal no zoológico; persistindo, vitória dividida | p8 "tied player with more Animal tiles"; "you share the victory" | V | |

### 4.2 Preparação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R4 | Tabuleiro da vitrine no centro; todas as peças embaralhadas viradas para baixo em uma ou mais pilhas ("the pile") | p1 itens 1 e 2 | V | |
| R5 | 6 peças abertas na vitrine, uma em cada número; espaço para o descarte | p1 itens 3 e 4 | V | R4 |
| R6 | Marcadores de conservação, de bolsa e de fim de jogo como reserva | p1 item 5 | V | |
| R7 | Tabuleiro de conservação; 10 metas embaralhadas, 5 reveladas; as outras 5 voltam à caixa; ordem livre, sugestão de agrupar continente e animal | p1 item 6 | V | |
| R8 | Tabuleiro do zoológico; todos do mesmo lado; lado 1 na primeira partida | p1 A "Make sure that you all use the same side"; "Use side 1 for your first game" | V | |
| R9 | 4 cartas de ação diferentes, lado I para cima (indicado no canto inferior direito) | p1 B | V | |
| R10 | Primeiro jogador sorteado; carta de Projetos no encaixe da esquerda, seta no 1; os seguintes, em sentido horário, 1 encaixe à direita (2, 3, 4); as outras 3 cartas ao acaso | p1 B | V | R9 |
| R11 | Com 5 jogadores, o 4º e o 5º põem Projetos no encaixe da direita (seta no 4) | p1 B "In a game with 5 players, both the 4th and 5th player" | V | R10 |
| R12 | Cada jogador: 4 marcadores de melhoria e 4 de conquista da cor, virados para cima | p1 C | V | |
| R13 | Suporte de peças: peças nele são "a mão"; começa sem peças | p1 D "You start the game without any tiles" | V | |
| R14 | Primeira partida (dica): devolver o marcador de conquista 4×; o fim é disparado pelo terceiro marcador | p1 Tip | V | R44 |

### 4.3 Peças

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R15 | Ícones no alto (habitat, continente, classe; Prédio e Projeto têm ícone próprio); contam como seus depois de jogada a peça | p2 "All of these icons are considered to be in your zoo" | V | |
| R16 | Cor do nome: Animal amarelo, Prédio azul, Projeto roxo | p2 | V | |
| R17 | Animal e Projeto: nível à esquerda; Prédio: condição à esquerda | p2 itens 3 e 4 | V | |
| R18 | Efeito com raio: uma vez, ao jogar; com infinito: contínuo, ativo na hora, inclusive para a própria peça | p2 EFFECTS e IMPORTANT | V | R15 |
| R19 | Pontos: fixos ou dependentes de ícones; detalhes no Glossário | p2 POINTS | V (a existência); L (o cálculo de cada peça) | |
| R20 | Casal: duas peças de mesmo nome (macho e fêmea) vizinhas dão 1 marcador de conservação, além dos outros efeitos | p2 ANIMAL PAIRS; p5 | V | |
| R21 | Marcadores de conservação e de bolsa ficam no canto inferior esquerdo do tabuleiro | p2 | V | |
| R22 | Setas pedem espaços livres nas casas apontadas; podem usar espaços livres existentes (inclusive os impressos); senão, peças da mão viradas para baixo; seta não pode apontar para peça aberta jogada nem para fora | p2 OPEN AREA | V | R13 |
| R23 | Cada espaço livre vale 1 ponto no fim | p2 "Each Open Area in your zoo is worth 1 point" | V | R22 |
| R24 | Os 2 espaços livres impressos valem 1 ponto cada | Ilustração p1 e p3: o mesmo selo "1" da p2 | I (leitura da ilustração) | R23 |

### 4.4 Colocação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R25 | Peça vai numa casa vazia (sem peça e sem espaço livre impresso), vizinha da entrada ou de peça já no zoológico; os 2 espaços livres impressos não contam como peça | p3 PLACEMENT RULES | V | |
| R26 | A primeira peça vai numa das 3 casas vizinhas da entrada | p3 "3 possible spaces on which you can place your first tile" | V | R25 |
| R27 | Ícones em cima, nome embaixo; proibido girar | p3 "You are not allowed to rotate the tiles" | V | |
| R28 | Bônus impresso na casa: na hora; vale também para espaço livre posto ali; detalhes no Glossário e nas folhas de ajuda | p3 | V (a regra); L (o efeito de cada bônus) | |
| R29 | Rio: as 3 casas de cada borda lateral | p3 "considered to be 'by the River'" | V | |
| R30 | Peças descartadas: pilha de descarte, viradas para cima | p3 | V | |
| R31 | Com setas: primeiro a peça, depois os espaços livres | p3 último parágrafo | V | R22 |
| R32 | Espaço livre posto por você conta como peça para a vizinhança | p3 só exclui os impressos ("The two Open Areas printed on your Zoo map do not count as tiles") | I (o manual só exclui os impressos) | R25 |

### 4.5 Cartas de ação e o turno

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R33 | Força = número para onde a seta aponta; mais à direita, mais forte; lado II = número da direita, força 1 maior | p3 "always 1 higher than that of a non-upgraded action" | V | R10 |
| R34 | Ordem do turno: sempre 1 (peça) e 2 (ação); talvez 3 (Prédio), 4 (meta), 5 (melhoria); 6 manutenção | p4 HOW TO PLAY A TURN | V | |
| R35 | Passo 1: pegar 1 peça da vitrine numa posição até a seta branca da carta de Projetos; com 1, obrigatório pegar a posição 1; não move a carta | p4 passo 1 e IMPORTANT | V | R33 |
| R36 | O alcance vale só no passo 1; efeito ou bônus pega de qualquer posição | p4 "The 'within range' restriction only applies in this step" | V | |
| R37 | Projetos no lado II: a seta aponta um número acima, então o alcance também sobe 1 | p1/p4 (seta única, ilustração) + p3 (lado II) | I (o manual não fala de alcance no lado II; a seta é a mesma) | R33, R35 |
| R38 | Passo 2: escolher 1 carta e fazer uma das duas opções com a força atual: ganhar ou jogar | p4 | V | |
| R39 | Projetos, ganhar: 1 peça qualquer da vitrine; no lado II, uma 2ª | p4 | V | |
| R40 | Animais, ganhar: as 2 peças do topo da pilha | p4 | V | |
| R41 | Projetos, jogar: força maior ou igual ao nível; casa vazia vizinha; Soltura na natureza vai sobre Animal com o ícone, que deixa de contar (ícones e pontos); efeitos em qualquer ordem | p5 | V | R25 |
| R42 | Animais, jogar: só com a carta do habitat; indefinido com qualquer; força maior ou igual ao nível; espaços livres se preciso; casal; efeitos em qualquer ordem. Lado II: 1 ou 2 Animais, força maior ou igual à soma; colocar um e resolver todos os efeitos antes do outro | p5 | V | R22, R20 |
| R43 | Só Animais e Projetos se jogam com carta de ação, nunca Prédios | p6 "not Buildings" | V | |
| R43a | Completar a ação: tirar a carta, deslizar as da esquerda 1 encaixe à direita, pôr a usada no encaixe 1; se já era a do 1, nada se move | p6 "Complete the action" | V | |
| R43b | Vários efeitos ao mesmo tempo: o jogador escolhe a ordem | p5 exemplo do crocodilo | V | |

### 4.6 Passos opcionais e manutenção

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R45 | Passo 3: com Prédio na mão cuja condição cumpre ou pode cumprir, jogar exatamente 1; casa vazia vizinha que satisfaça a condição; efeitos em qualquer ordem | p6 | V | R25 |
| R46 | Passo 4: apoiar exatamente 1 meta ainda não apoiada; contar ícones; cada marcador de conservação devolvido vale 1 ícone; pelo menos 1 ícone real; marcador de conquista não usado com número igual ou menor, virado para baixo no espaço da cor | p7 | V | |
| R47 | Valores: 2× 5, 3× 7, 4× 10, 5× 14 pontos | ilustração p7; texto confirma 5× = 14 | V | R46 |
| R48 | Cada meta, uma vez por jogador; ícones a mais depois não ajudam | p7 "You may not support a single objective more than once"; exemplo | V | |
| R49 | Passo 5: para cada marcador de melhoria não usado cuja condição cumpriu, virar 1 carta do lado I para o II e virar o marcador; vários de uma vez. Condições: 1 = apoiou 1 meta; 2 = 2 Projetos; 3= = 3 peças ligadas de um habitat; 4≠ = 4 classes de animal diferentes | p7 | V | R33 |
| R50 | Manutenção: mais de 6 peças na mão, descartar até 6 (durante o turno pode passar); repor a vitrine descendo as peças e completando com a pilha; conferir o fim | p8 | V | R30 |

### 4.7 Fim e pontuação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R44 | Fim conferido no fim do turno; condições: (1) 4 marcadores de conquista postos; (2) tabuleiro sem casa vazia; (3) pilha vazia | p8 | V | |
| R51 | (1) ou (2) no fim do seu turno: marcador de 10; os outros jogam 1 turno, você não | p8 "Then everyone else gets 1 more turn (excluding you)" | V | R44 |
| R52 | Pilha vazia depois do disparo: embaralhar o descarte e formar nova pilha | p8 | V | |
| R53 | (1) ou (2) no último turno de outro: marcador de 5 | p8 | V | |
| R54 | (3) antes de (1) ou (2): a partida acaba logo após aquele turno | p8 "the game ends immediately after your turn" | V | |
| R55 | Pontuação: peças (Animais, Prédios, Projetos, espaços livres); marcadores de conquista; 2 por marcador de bolsa e por marcador de conservação restante; marcador de fim | p8 | V | R23, R47 |
| R56 | Solo: 5 pontos por marcador solo virado; regras do solo fora deste manual | p8 | V (a linha); L (o modo) | |

### 4.8 Lacunas registradas

- **L1.** Como se ganham marcadores de bolsa: o manual não diz (p. 1, 2, 8). O tutorial manda seguir peças, bônus e Glossário.
- **L2.** Efeito de cada bônus de colocação e pontuação de cada peça: no Glossário e nas folhas de ajuda, não obtidos.
- **L3.** Pilha que acaba no meio de "compre 2" ou da reposição da vitrine antes do disparo: o manual não diz. O tutorial pede para combinar com a mesa.
- **L4.** Número de marcadores de fim de jogo de 5 pontos: o manual não diz se podem faltar.
- **L5.** Regras do modo solo.

## 5. Divergências

- **Manual brasileiro:** não existe; não há confronto de edições. O tutorial avisa que os nomes da caixa da Grok podem ser outros.
- **Grok x resenha.** A página da Grok diz "edifícios" e "objetivos de conservação"; a resenha diz "prédios" e "metas de conservação". Por instrução do editor, o tutorial segue a resenha e registra a diferença num `[!edicao]` da etapa 1. Se o editor confirmar os nomes da caixa, basta trocar.
- **Resenha x manual (para o editor; não mexi na resenha):**
  - A resenha chama as cartas de ação de "peças de ação" ("quatro peças de ação", "peça de ação de projetos"). O manual diz "Action cards", e as ilustrações mostram cartas retangulares. O tutorial usa "cartas de ação", também para não confundir com as peças hexagonais.
  - O `como_funciona` da resenha diz que o fim é disparado também quando "acaba a pilha de peças; quem dispara ganha 10 pontos e os outros jogam mais uma vez". Pelo manual (p. 8), a pilha vazia antes das outras condições encerra a partida logo após aquele turno, sem marcador e sem turno extra.

## 6. Dúvidas recorrentes (da resenha, como mapa)

- "O que confunde no começo é a força das ações e os espaços livres dos animais grandes" (`primeira_partida`): etapas 2 e 3, com exemplos e treino.
- "Glossário separado do livro de regras" e "contagem final confusa" (`atencao`): o tutorial não reproduz o Glossário (não obtido) e diz onde procurar; a etapa 5 dá a ordem da contagem.
- "Sugestão de deixar o 4× na caixa": `[!mais]` na etapa 1 e na etapa 5.

## 7. Plano instrucional

Classes de tarefa, da mais simples à partida inteira, cada uma com informação de apoio (`[!entender]`), procedimento no ponto de uso (`[!passos]`), tarefas com apoio decrescente (`[!resolvido]`, `[!complete]`, `[!suavez]`, respostas separadas) e treino só onde o erro é comum:

1. **Comece em 4 minutos:** montar e jogar o primeiro turno (cartas iniciais, alcance, uma ação, fila, manutenção).
2. **Etapa 1, montar a mesa:** procedimento conferível; diferença de 5 jogadores e dica de primeira partida em `[!mais]`.
3. **Etapa 2, a ação do turno:** força, alcance, as duas opções de cada carta, a fila, o lado II. Treino: mover a fila.
4. **Etapa 3, colocar no zoológico:** casas, setas e espaços livres, bônus, efeitos, casal. Treino: pode pôr aqui?
5. **Etapa 4, o resto do turno:** Prédio, metas (com a decisão de devolver marcador), melhorias, manutenção.
6. **Etapa 5, fim e pontuação:** condições, marcadores de fim, contagem completa com três jogadores.

**Carga cognitiva.** O primeiro turno usa só vitrine, alcance, uma carta e a fila. Metas, melhorias, casal, Rio e pontuação ficam para depois ("Ainda não precisa saber"). Setas e Prédios entram no começo numa linha cada, porque podem aparecer já no primeiro turno. Limite: um texto não observa o leitor nem ajusta o apoio a ele.

**Exemplos.** Os exemplos com peças reais do manual não citam nome de peça, só tipo, habitat e nível, porque o manual mostra poucas peças por inteiro e o Glossário não foi obtido. Três exemplos seguem situações do próprio manual (fila da p. 6, tigre da p. 3, crocodilo e herpetologista da p. 5, aves da p. 7). Contas em `scratchpad/santuario_calc/contas.py`.

## 8. Portões automáticos

Resultado na auditoria, seção 2.
