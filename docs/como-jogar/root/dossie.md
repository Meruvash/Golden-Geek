# Dossiê: Como Jogar Root

Produzido em 06 e 08/11/2026 (rotina diária de 06/11/2026, retomada em 08/11 depois de pausa por limite de uso), seguindo `docs/como-jogar/BRIEF.md` e `PROMPT_PILOTO.md`, Parte 2. Jogo base apenas.

## 1. Fontes

| Fonte | Versão | Link | Acesso |
|---|---|---|---|
| **Root: Aprenda a Jogar**, Meeple BR (fonte principal de ensino) | PDF de 24 páginas, criado e modificado em 01/02/2021; paginação impressa igual à do PDF | https://meeplebr.com/wp-content/uploads/2020/03/Root-Base-Learn-to-Play_BR_IMPRESSAO_FINAL-1.pdf | Baixado em 06/11/2026 |
| **As Leis de Root**, Meeple BR (referência de regras; prevalece sobre o Aprenda a Jogar, Leis 1.1.1) | "Oitava Versão (09/12/2022)", PDF de 25 páginas modificado em 11/05/2024; cobre também as expansões | https://meeplebr.com/wp-content/uploads/2020/03/Root-Base-Law-of-Root_BR_215x278_3a-IMPRESSAO.pdf | Baixado em 06/11/2026 |
| **Passo a Passo através de Root**, Meeple BR | PDF de 20 páginas, 01/02/2021; partida roteirizada para 4 jogadores | https://meeplebr.com/wp-content/uploads/2020/03/Root-Base-Walking-Through-Root_BR_IMPRESSAO_FINAL.pdf | Baixado em 06/11/2026; usado só pela figura da mesa montada (p. 3) |
| Página do produto, Meeple BR | Ficha: 2 a 4 jogadores, 60 a 90 min, 14+; designer Cole Wehrle, arte Kyle Ferrin; links "Aprenda a jogar", "As Leis de Root (8ª edição)", "Passo a passo" e vídeos | https://meeplebr.com/product/root/ | Consultada em 06/11/2026 (robots.txt: `Disallow:` vazio) |
| FAQ ou errata | Não procurada à parte: a oitava versão das Leis já incorpora mudanças (ex.: 7.3.2 "alterada em relação a edições anteriores") | | |
| Manual em inglês (Leder Games) | Não necessário: existe edição brasileira com manual público | | |

Arquivos no scratchpad (fora do repositório): PDFs em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/root/dl/`; texto extraído por página em `.../d1106/root/raw/` (`pdftotext` em ordem de leitura: `Learn-pNN.txt`, `Law-pNN.txt`, `Walking-pNN.txt`) e em `.../d1106/root/txt/` (`-layout`). O texto das Leis em duas colunas sai embaralhado no `pdftotext`; trechos duvidosos (ícones de itens, referência dos personagens, tabuleiro dos Marqueses, relações do Malandro) foram conferidos na imagem renderizada da página.

Ícones de item nas Leis: o PDF usa uma fonte de símbolos que o `pdftotext` devolve como letras. Correspondência conferida na imagem da p. 20 (D.1 a D.3) e na lista de componentes B.1.4: M = Bota, S = Espada, C = Besta, F = Tocha, H = Martelo, T = Chá, X = Moeda, B = Bolsa.

Vídeos (oEmbed conferido em 08/11/2026): "ROOT + Expansão Submundo - Gameplay Resumida", Duque Board Games (https://www.youtube.com/watch?v=Emlgf6CvFHQ), achado pela busca do canal (`/@DuqueBoardgames/search?query=root`); é partida com expansão, por isso entrou um segundo, de regras: "Root - Regras da caixa base", 3DÜs (https://www.youtube.com/watch?v=Z7DD7DjMdw8), incorporado na página do produto da Meeple BR.

## 2. Glossário (nomes da Meeple BR)

| No tutorial | Original | Fonte | O que é |
|---|---|---|---|
| Floresta da Madeira | Woodland | AaJ p. 2 | O mapa |
| clareira, caminho, floresta | clearing, path, forest | p. 5; Leis 2.2 a 2.4 | Espaços do mapa; floresta só para o Malandro |
| local | slot | p. 6 | Espaço de construção numa clareira |
| ruína | ruin | p. 4 e 6 | Cobre um local "R"; esconde item do Malandro |
| naipe: raposa, coelho, rato, pássaro | suit: fox, rabbit, mouse, bird | p. 6 | Pássaro é curinga |
| governar | rule | p. 5; Leis 2.5 | Mais guerreiros e construções somados |
| mover / movimento | move | p. 5; Leis 4.2 | |
| batalha, atacante, defensor, dano, dano adicional, indefeso | battle, attacker, defender, hit, extra hit, defenseless | p. 8; Leis 4.3 | |
| carta de emboscada, frustrar | ambush card, foil | p. 9 | |
| criar, peça artesanal, efeito imediato, efeito permanente, Itens Artesanais | craft, crafting piece, immediate/persistent effect, Crafted Items | p. 7; Leis 4.1 | |
| suprimento de itens | item supply | p. 4 | 12 itens no topo do mapa |
| ponto de vitória (PV), trilha de pontuação | victory point (VP) | p. 2 e 4 | |
| Amanhecer, Dia, Anoitecer | Birdsong, Daylight, Evening | p. 2; Leis 1.4.1 | |
| bônus de compra | draw bonus | p. 11 | |
| carta de domínio, coalizão | dominance card, coalition | p. 21; Leis 3.3 e 9.2.8 | |
| tabuleiro de facção, guerreiro, construção, marcador | faction board, warrior, building, token | p. 4 e 24 | |
| Marqueses: Torre da Guarda, Hospitais de Batalha, serraria, oficina, recrutador, madeira; Batalhar, Marcha, Recrutar, Erguer, Hora Extra, Aves de Aluguel | Marquise de Cat: Keep, Field Hospitals, sawmill, workshop, recruiter, wood; Battle, March, Recruit, Build, Overwork, Hawks for Hire | p. 10; Leis 6 | |
| Rapinas (Dinastia das Rapinas): ninho, Decreto, Recrutar/Mover/Batalhar/Construir, Vizir Leal, líder (Construtor, Carismático, Comandante, Déspota), Tumulto (Humilhar, Expurgar, Destituir, Descansar), Lordes da Floresta, Desprezo pelo Comércio, Ordens Emergenciais, Um Novo Ninho | Eyrie Dynasties: roost, Decree, Loyal Vizier, leader, Turmoil, Lords of the Forest, Disdain for Trade | p. 12 e 13; Leis 7 | |
| Aliança (da Floresta): simpatia, clareira simpática, apoiadores, baralho de apoiadores, Ultraje, Guerrilha, Revolta, espalhar simpatia, base, oficiais, Mobilizar, Treinar, operações militares, Organizar, Lei Marcial | Woodland Alliance: sympathy, supporters, Outrage, Guerrilla War, Revolt, Spread Sympathy, base, officers, Mobilize, Train, Organize, Martial Law | p. 14 a 16; Leis 8 | O manual usa "clareira neutra" para a sem simpatia; o tutorial diz "sem simpatia" |
| Malandro: peão do Malandro, personagem (Ladrão, Funileiro, Andarilho), Bota, Espada, Besta, Tocha, Martelo, Chá, Moeda, Bolsa, Mochila, Itens Danificados, exaurir, danificar, Reanimar, Deslizar, Ataque, Explorar, Ajuda, Tarefa, Reparar, Ação Especial, Indiferente, Aliado, Hostil, Infâmia, Andarilho Solitário, Ágil, Remoção Completa | Vagabond: pawn, Thief, Tinker, Ranger, boots, sword, crossbow, torch, hammer, tea, coins, bag, satchel, exhaust, damage, Refresh, Slip, Strike, Explore, Aid, Quest, Repair | p. 17 a 20; Leis 9 e D | O "Vagabundo" das Leis (D.4) é personagem de expansão |

## 3. Base de regras

`[V]` verificada nesta sessão; `[I]` interpretada; `[L]` lacuna. "p." = Aprenda a Jogar (AaJ); "Leis" = As Leis de Root.

### 3.1 Preparação

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R1 | 3 jogadores sem Malandro; 2 jogadores sem Malandro e sem Aliança (para a primeira partida) | p. 4 "Se jogar com três jogadores, remova o Malandro" | V |
| R2 | Outras combinações: p. 22; alcance Marqueses 10, Rapinas 7, Malandro 5/2, Aliança 3; somas 17+, 18+, 21+ | Leis 5.2 (tabela) | V |
| R3 | Cada jogador recebe tabuleiro e peças listadas no verso; jogador inicial e posição na mesa sorteados | p. 4; Leis 5.1.1 "Determine o jogador inicial... de forma aleatória" | V |
| R4 | Marcador de pontuação no "0" | p. 4; Leis 5.1.2 | V |
| R5 | 2 jogadores: tirar as 4 cartas de domínio; embaralhar 54 cartas, 3 para cada | p. 4 "distribua três"; Leis 5.1.3; p. 22 | V |
| R6 | 4 ruínas nos locais "R" | p. 4; Leis 5.1.4 | V |
| R7 | Suprimento: 2 Botas, 2 Bolsas, 1 Besta, 1 Martelo, 2 Espadas, 2 Chás, 2 Moedas | Leis 5.1.5 (ícones conferidos); p. 4 figura | V |
| R8 | Cartas de resumo e 2 dados perto do mapa | p. 4 | V |
| R9 | Facções se preparam na ordem Marqueses, Rapinas, Aliança, Malandro | p. 4; Leis 5.1.7 (ordem alfabética das letras de preparação) | V |
| R10 | Marqueses: 25 guerreiros e 8 madeiras; Torre da Guarda num canto; 1 guerreiro em cada clareira menos a diagonal oposta (11); serraria, oficina e recrutador na clareira da Torre ou vizinhas; trilhas cheias menos o espaço mais à esquerda | Leis 6.3.1 a 6.3.5; p. 4 | V |
| R11 | Rapinas: 20 guerreiros; ninho e 6 guerreiros num canto que não seja inicial de outro, se possível diagonal oposto a um canto inicial; líder escolhido, outros 3 virados para cima ao lado; Vizires nas colunas do líder; ninhos restantes na trilha | Leis 7.3.1 a 7.3.5 | V |
| R12 | Aliança: 10 guerreiros; 3 bases no tabuleiro; 10 simpatias na trilha; 3 cartas viradas para baixo como apoiadores | Leis 8.3.1 a 8.3.4 | V |
| R13 | Malandro: personagem; peão em qualquer floresta; 3 tarefas abertas; itens "R" (Bolsa, Bota, Martelo, Espada) sob as ruínas; itens "S" do personagem (Chá, Moeda, Bolsa nas trilhas, outros na Mochila); relações em "Indiferente" | Leis 9.3.1 a 9.3.6 | V |
| R14 | Personagens base: Ladrão (Bota, Tocha, Chá, Espada; Roubo), Funileiro (Bota, Tocha, Bolsa, Martelo; Dia de Trabalho), Andarilho (Bota, Tocha, Besta, Espada; Esconderijo) | Leis D.1 a D.3 (imagem p. 20) | V |
| R15 | Componentes do jogo base | Leis B.1 | V |
| R16 | Mapa do inverno só para experientes; marcadores de naipe só nele | p. 23 | V |

### 3.2 Regras comuns

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R17 | Turno: Amanhecer, Dia, Anoitecer; depois o jogador à esquerda (sentido horário) | p. 2; Leis 1.4.1 | V |
| R18 | Governar: maior soma de guerreiros e construções; empate, ninguém; marcadores e peões não contam | p. 5; Leis 2.5 | V |
| R19 | Mover: qualquer número de guerreiros para clareira adjacente; governar origem ou destino | p. 5; Leis 4.2.1 | V |
| R20 | Sem limite de movimentos por peça; vários movimentos com o mesmo grupo ou grupos diferentes | Leis 4.2.2 | V |
| R21 | Florestas: só o Malandro entra | p. 5 | V |
| R22 | Locais: 1 a 3; sem local livre, sem construção; ruína bloqueia até o Malandro explorar, e sem Malandro o jogo todo | p. 6 | V |
| R23 | Naipes; pássaro curinga; pássaro exigido não admite substituto | p. 6; Leis 2.1.1 | V |
| R24 | Baralho vazio: embaralhar o descarte | Leis 2.1 | V |
| R25 | Anoitecer padrão: comprar 1 + 1 por bônus descoberto; descartar até 5 | p. 11 "A maioria das outras facções compra e descarta... da mesma maneira" | V |
| R26 | Criar: ativar peças artesanais dos naipes do canto inferior esquerdo; cada uma uma vez por turno; peças artesanais de cada facção | p. 7; Leis 4.1.1 | V |
| R27 | Efeito imediato: resolver e descartar; item do suprimento para Itens Artesanais; PV da carta; item indisponível impede criar | p. 7; Leis 4.1.2; Leis 3.2.2 | V |
| R28 | Efeito permanente: área de jogo; sem repetir o mesmo | p. 7; Leis 4.1.3 e 4.1.4 | V |
| R29 | Emboscada e domínio não têm efeito para criar; podem ser gastas pelo naipe | Leis 2.1.2 e 2.1.3 | V (no setup e etapa 5) |

### 3.3 Batalha

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R30 | Atacante escolhe clareira com guerreiros seus e defensor com peças ali | p. 8; Leis 4.3 | V |
| R31 | Emboscada do defensor: 2 danos imediatos; atacante frustra com emboscada correspondente | p. 9; Leis 4.3.1 | V |
| R32 | Emboscada que remove todos os atacantes encerra a batalha; pode emboscar indefeso | p. 9 | V |
| R33 | Dados: atacante maior, defensor menor; iguais, mesmo dano; limite = guerreiros na clareira | p. 8; Leis 4.3.2 | V |
| R34 | Dano adicional sem limite; indefeso +1 | p. 8; Leis 4.3.3 | V |
| R35 | Remoção simultânea; quem recebe escolhe; guerreiros antes de construções e marcadores | p. 8; Leis 4.3.4 | V |
| R36 | 1 PV por construção ou marcador inimigo removido, dentro ou fora da batalha | p. 8; Leis 3.2.1 | V |

### 3.4 Marqueses

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R37 | Amanhecer: 1 madeira por serraria | p. 10; Leis 6.4 | V |
| R38 | Dia: criar com oficinas; até 3 ações em qualquer ordem, repetíveis | p. 10; Leis 6.5 | V |
| R39 | Batalhar; Marcha (até 2 movimentos); Recrutar (1 por recrutador, uma vez por turno) | p. 10; Leis 6.5.1 a 6.5.3 | V |
| R40 | Erguer: clareira governada com local livre; construção mais à esquerda da trilha; custo do topo da coluna; madeira de clareiras governadas conectadas; PV do espaço | p. 10; Leis 6.5.4 | V |
| R41 | Custos 0, 1, 2, 3, 3, 4; PV serraria 1 a 5, oficina 2, 2, 3, 4, 5, recrutador 1, 2, 3, 3, 4, com bônus de compra sob o 2º e o 4º recrutador da trilha | Ilustração do tabuleiro, p. 4 (lida a 600 dpi); conferido com o exemplo da p. 11 (oficina de 3 madeiras, 3 PV) e do Passo a Passo p. 4 (serraria, 1 PV) | V |
| R42 | Hora Extra: carta do naipe de uma clareira com serraria, 1 madeira ali | p. 10; Leis 6.5.5 | V |
| R43 | Aves de Aluguel: ação extra por carta de pássaro | p. 10; Leis 6.5 | V |
| R44 | Torre da Guarda: só os Marqueses põem peças ali; removida, volta à caixa | p. 10; Leis 6.2.2 | V |
| R45 | Hospitais de Batalha: carta do naipe da clareira põe os guerreiros removidos na Torre da Guarda | p. 10; Leis 6.2.3 | V |

### 3.5 Rapinas

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R46 | Amanhecer: mão vazia, comprar 1; acrescentar 1 ou 2 cartas, no máximo 1 pássaro; sem ninho, ninho + 3 guerreiros na clareira com menos guerreiros | p. 12; Leis 7.4 | V |
| R47 | Dia: criar com ninhos; resolver o Decreto da esquerda para a direita, dentro da coluna em qualquer ordem; ação na clareira do naipe da carta | p. 12; Leis 7.5 | V |
| R48 | Recrutar (clareira com ninho), Mover (pelo menos 1 guerreiro), Batalhar, Construir (clareira governada, local livre, sem ninho) | p. 12; Leis 7.5.2 | V |
| R49 | Anoitecer: PV do espaço vazio mais à direita da trilha de Ninhos; comprar e descartar | p. 12; Leis 7.6 | V |
| R50 | Tumulto: Humilhar (−1 PV por pássaro, Vizires incluídos), Expurgar (menos Vizires), Destituir, Descansar | p. 13; Leis 7.7 | V |
| R51 | Lordes da Floresta (governam no empate, não clareira vazia); Desprezo pelo Comércio (item vale 1 PV) | p. 12; Leis 7.2.2 e 7.2.3 | V |
| R52 | Líderes e posição dos Vizires; desvirar todos se nenhum estiver para cima | Leis 7.7.3.I e 7.8 | V |
| R53 | Valores da trilha de Ninhos | Não legíveis no manual; o tutorial não os dá | L |

### 3.6 Aliança

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R54 | Apoiadores: só pelo naipe; fora da mão; limite 5 sem base | p. 14; Leis 8.2.3 | V |
| R55 | Ultraje | p. 14; Leis 8.2.6 | V |
| R56 | Guerrilha | p. 14; Leis 8.2.2 | V |
| R57 | Amanhecer: revoltas, depois simpatia, quantas vezes quiser | p. 15; Leis 8.4 | V |
| R58 | Revolta: clareira simpática do naipe de base no tabuleiro; 2 apoiadores; remove inimigos; base; guerreiros = clareiras simpáticas do naipe; 1 oficial | p. 15; Leis 8.4.1 | V |
| R59 | Espalhar simpatia: clareira sem simpatia vizinha de simpática (ou qualquer, se não há); custo acima do marcador mais à esquerda; PV do espaço revelado; Lei Marcial +1 com 3 ou mais guerreiros de outro jogador | p. 15; Leis 8.4.2 | V |
| R60 | Dia: Criar, Mobilizar, Treinar | p. 16; Leis 8.5 | V |
| R61 | Anoitecer: operações por oficial (Mover, Batalhar, Recrutar, Organizar); comprar e descartar | p. 16; Leis 8.6 | V |
| R62 | Base removida: descarta apoiadores do naipe (pássaros incluídos), metade dos oficiais arredondada para cima; 1 simpatia por clareira | p. 15; Leis 8.2.4 e 8.2.5 | V |
| R63 | Custos e PV da trilha de Simpatia | Só parcialmente legíveis (figura p. 15: seção de custo 2, depois 3); o tutorial usa só o exemplo do manual (4ª simpatia custa 2) | L |

### 3.7 Malandro

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R64 | Peão não é guerreiro, não governa, não sai do mapa; Ágil | p. 17; Leis 9.2.2 e 9.2.3 | V |
| R65 | Estados do item; Chá, Moeda, Bolsa nas trilhas, exauridos vão para a Mochila | p. 17 e 19; Leis 9.2.5 | V |
| R66 | Amanhecer: desvirar 2 por Chá + 3; deslizar (único acesso à floresta) | p. 17; Leis 9.4 | V |
| R67 | Ações do Dia (Mover, Batalhar, Ataque, Explorar, Ajuda, Tarefa, Criar, Reparar, Ação Especial) | p. 18; Leis 9.5 | V |
| R68 | Anoitecer: conserto na floresta; comprar 1 + Moedas; descartar até 5; limite 6 + 2 por Bolsa | p. 18; Leis 9.6 | V |
| R69 | Batalha do Malandro: limite = Espadas não danificadas; dano danifica itens; indefeso sem Espada | p. 20; Leis 9.2.4, 9.2.6 e 9.2.7 | V |
| R70 | Relações: custos 1, 2, 3; PV 1, 2, 2; Aliado +2 por ajuda; Hostil; Infâmia; Bota extra | p. 19 (figura lida a 200 dpi); Leis 9.2.9 | V |
| R71 | Remoção Completa danifica 3 itens | Leis 9.2.2 (Andarilho Solitário) | V |

### 3.8 Vitória

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R72 | 30 PV vence na hora; simultâneo, vence quem tem o turno | p. 2; Leis 3.1 | V |
| R73 | Domínio: ativar no Dia com 10 PV ou mais; marcador sai; vitória no Amanhecer com 3 clareiras do naipe ou 2 cantos opostos (pássaro) | p. 21; Leis 3.3.1 | V |
| R74 | Domínio gasto vai para o lado do mapa; pega-se no Dia gastando carta do naipe | p. 21; Leis 3.3.3 | V |
| R75 | Coalizão do Malandro, só com 4 ou mais jogadores | p. 21; Leis 9.2.8 | V |
| R76 | 2 jogadores: sem domínio; sugestão de duas partidas somadas | p. 22 | V |

## 4. Divergências entre os manuais

1. **Jogador inicial.** O Aprenda a Jogar não diz; as Leis mandam sortear (5.1.1). O Passo a Passo começa pelos Marqueses porque é roteirizado. Tutorial: sorteio.
2. **Canto das Rapinas.** As Leis (7.3.2) dizem que a regra foi alterada "em relação a edições anteriores": canto que não seja inicial de outro e, se possível, oposto a um canto inicial. O verso do tabuleiro de uma caixa antiga pode trazer a redação anterior; o tutorial segue as Leis e avisa.
3. **Coalizão.** O Aprenda a Jogar (p. 21) não limita o número de jogadores; as Leis (9.2.8) exigem 4 ou mais. Tutorial: 4 ou mais.
4. **Recrutar dos Marqueses.** AaJ "uma vez por turno" (p. 10); Leis 6.5.3 "uma vez por rodada". Para o próprio jogador dá no mesmo; o tutorial usa "por turno".
5. **Aves de Aluguel.** AaJ: "depois de realizar as três ações"; Leis 6.5: "até três ações, mais uma por carta de pássaro". Tutorial segue o AaJ, compatível com as Leis.
6. **Exemplo de batalha (p. 8).** O texto diz que as Rapinas pontuam "por remover 1 marcador", mas a peça riscada na figura tem o desenho da oficina. A legenda do tutorial fala em "peça que não era guerreiro", sem decidir. [I]
7. **Bolsa ou sacola.** Leis B.1.4 "Bolsas"; AaJ p. 19 "sacolas". Tutorial: Bolsa.
8. **Ajuda do Malandro.** AaJ "pegue um item"; Leis 9.5.4 "você pode pegar". Tutorial: "pode pegar".

## 5. Plano instrucional

Classes de tarefa: (1) montar a mesa; (2) jogar o turno comum de qualquer facção (Comece em 4 minutos e etapa 1); (3) resolver uma batalha; (4) jogar Marqueses e Rapinas; (5) jogar Aliança e Malandro; (6) reconhecer o fim da partida. Em cada etapa: "Para entender" (informação de apoio), "Passo a passo" (procedimento no ponto de uso), regras de caso especial em `[!mais]`, exemplo resolvido, tarefa para completar e tarefa sem apoio. Prática específica só onde o erro é caro (governar, limite de dano, custo da simpatia, reanimar).

Decisões de carga: as quatro facções foram agrupadas em duas etapas (pedido da rotina), as de ação no mapa (Marqueses, Rapinas) e as de recursos próprios (Aliança, Malandro). Ficaram fora: mapa do inverno, expansões, preparação avançada, efeitos de cartas individuais. Os valores das trilhas de Ninhos e de Simpatia não foram dados porque o manual não os imprime de forma legível; o leitor os vê no próprio tabuleiro.

Limite: um texto não observa o leitor nem ajusta o apoio a ele. O teste com pessoas segue pendente.

## 6. Portões

- Travessão e meia-risca: zero.
- `tools/vicios.py` (lista VICIOS aplicada ao texto inteiro): zero ocorrência. Exclamações fora das marcas: zero.
- `tools/checar_comece.py docs/como-jogar/root/tutorial.md`: passa.
- Contas dos exemplos: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/root/scripts/contas.py` (custos e PV dos Marqueses, batalhas, Guerrilha, indefeso, Lei Marcial, tumulto, relações, reanimar, capacidade, guerreiros no mapa, alcance).
- Conversor (`tools/como_jogar_md.pagina`) gerou a prévia no scratchpad sem marcação crua (`[!`, `??`, `(x)`, `!fig`, `**`: zero). Leitura do essencial calculada pelo conversor: cerca de 12 min.
- Extensão (depois das correções da auditoria independente): cerca de 7.660 palavras de texto (sem as linhas de figura e vídeo), das quais cerca de 1.340 na montagem; sem a montagem, cerca de 6.320, dentro do alvo de 5.500 a 6.500.

## 7. Correções da auditoria independente (08/11/2026)

Auditoria de regras: APROVADO COM CORREÇÕES. Partida simulada: SIM COM AJUSTES. Regras novas ou ajustadas na base:

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R77 | 11 itens fora do suprimento: 4 "R" (sob as ruínas) e 7 "S" (iniciais possíveis do Malandro); os não usados voltam à caixa; sem Malandro, ruínas sem item e locais bloqueados | Leis B.1.2, 9.3.4, 9.3.5; p. 6 | V; "sem Malandro, ruínas sem item" é `[I]` (pôr itens sob as ruínas é passo da preparação do Malandro) |
| R78 | Componentes: 12 marcadores de naipe (mapa do inverno) e 4 Cartas de Instruções (Passo a Passo) | Leis B.1.2 e B.1.4; p. 23 | V |
| R79 | Cada base tem um naipe impresso | Leis 8.4.1 | V |
| R80 | Trilha de Ninhos: preenchida da direita para a esquerda; espaço vazio, se houver, é o mais à esquerda; PV impressos sob cada espaço, alguns com bônus de compra (trecho da figura da p. 12: +2 com bônus, +3, +4, +4) | Leis 7.3.5; figura p. 12 (600 dpi) | V; a trilha inteira continua `[L]`, "leia no tabuleiro" |
| R81 | Construir das Rapinas pega o ninho mais à esquerda da trilha | Leis G.1.26 (Posicione: "retirada do espaço mais à esquerda da trilha") | V (não entrou no tutorial; a regra geral de posicionar está no glossário) |
| R82 | Simpatia: custo sobe (figura p. 15, de 2 para 3); valores completos e bônus de compra da Aliança | figura p. 15 | L, "leia no tabuleiro" |
| R83 | Aliança pode olhar os apoiadores quando quiser | Leis 8.2.3 | V |
| R84 | Construção removida volta ao tabuleiro do dono | Leis G.1.28 ("ou para o espaço livre mais à direita de sua trilha") | I (G.1.28 lista destinos possíveis; para a base, o tabuleiro da Aliança) |
| R85 | Sem base no mapa, apoiadores até 5 | Leis 8.2.4 | V |
| R86 | Base precisa de local livre | Leis 2.2.3; 8.4.1 (remove inimigos antes de pôr a base) | V |
| R87 | Ninho novo: clareira com menos guerreiros onde todas as peças caibam; desempate não definido | Leis 7.4.3 | V; desempate `[L]` |
| R88 | Déspota: 1 PV a mais por batalha com remoção de construção ou marcador | Leis 7.8.4 | V |
| R89 | Malandro cria com 1 Martelo por símbolo de naipe; item criado ou explorado vai virado para cima para a Mochila ou trilha | Leis 9.5.3, 9.5.8 | V |
| R90 | Chá, Moeda e Bolsa desvirados voltam à trilha; 3 por trilha; Itens Danificados é seção da Mochila | Leis 9.2.5.I; p. 17 a 19 | V |
| R91 | Emboscadas: 5 cartas (rato, coelho, raposa, 2 pássaros) | Leis 2.1.2; figura p. 9 | V |
| R92 | PV abaixo de zero | Nenhum dos manuais diz | L |
| R93 | Ordem das colunas do Decreto: Recrutar, Mover, Batalhar, Construir | p. 12 e figura p. 13 | V |
| R94 | Malandro batalha com o peão | Leis 4.3 ("guerreiros e/ou peões") | V |
| R95 | Mochila Pouco Usada dá uma Bolsa | Figura do exemplo de criação, p. 7 | V (pela figura) |
| R96 | Coalizão com 4 ou mais: também no texto da carta de domínio da figura da p. 21 | p. 21; Leis 9.2.8 | V |

Correções de citação feitas antes da auditoria e mantidas: Leis 4.2.2 (sem limite de movimentos), 9.2.2 (Remoção Completa), 9.2.3 (Ágil), 9.2.4 (Indefeso), 8.2.2 (Guerrilha), 3.3.1 (vitória por domínio). O canal 3DÜs foi conferido pelo oEmbed (author_name "3DÜs").
