# Dossiê: Como jogar Duna: Imperium

Rotina diária de 06/11/2026, retomada em 08/11/2026 depois da pausa por limite de uso. Jogo definido pelo editor: *Dune: Imperium*, jogo base (Dire Wolf), publicado no Brasil pela Galápagos (Asmodee Brasil) como **Duna: Imperium**, SKU DUN001. Não é o *Uprising* (DUN101). O tutorial ensina 3 e 4 jogadores; 1 e 2 jogadores (com a Casa Hagal) só como regra adicional curta, conforme o pedido.

## 1. Fontes

| Fonte | Versão e dados | Onde | Data |
|---|---|---|---|
| **Livro de regras da edição brasileira** (fonte principal das páginas citadas). *Duna: Imperium*, Galápagos; tradução de João José Gois, revisão de Fábio Gullo, diagramação BR de Fabrizio Baldrati; © 2021 Dire Wolf Digital (p. 15) | Arquivo `DUN001_regras_v1.0.pdf` (entregue em ZIP), 16 páginas quadradas de 821 x 821 pt, InDesign 16.3, criado em 09/08/2021, modificado em 25/10/2024; sha256 `5abfab75fc8ad87b…cf341eeda6d`. Tem camada de texto | Biblioteca de Downloads da Asmodee Brasil, item 1715 "DUN001 - Duna Imperium - SKU: DUN001", etiqueta Regras, pela API pública que a página usa: https://api-prd.mundogalapagos.com.br/library-download/store/file?id=1715&tagId=2&group=b2c (ZIP, HTTP 200, sem login) | Baixado em 06/11/2026; lido em 06 e 08/11/2026 |
| Item 413 da mesma biblioteca ("DUN001 - Duna Imperium", etiquetas Regras, Ilustração, Assets de venda) | `store/file?id=413&tagId=2&group=b2c` respondeu 404 "The specified blob does not exist"; as etiquetas 1, 3, 4, 5 e 6 também deram 404 | mesma API | 06 e 08/11/2026, inacessível |
| **Folheto "Guia dos Espaços no Tabuleiro"**, em português (o livro de regras manda consultá-lo e lista o folheto entre os componentes, p. 3, 6 e 9). Mesmo tradutor da edição brasileira | Arquivo `PT_Dune_Imperium_Board_Spaces_Sheet.pdf` (título interno `PT_Dune_Imperium_Rulebook_Board_Spaces_Sheet.indd`), 2 páginas, criado em 03/08/2021; sha256 `e905251b637e052d…` | Página oficial de recursos da Dire Wolf, https://www.direwolfdigital.com/dune-imperium/resources/ → https://d19y2ttatozxjp.cloudfront.net/pdfs/PT_Dune_Imperium_Board_Spaces_Sheet.pdf | 08/11/2026 |
| **Folheto "Cartas da Casa Hagal"**, em português (solo e 2 jogadores; o livro manda consultá-lo, p. 5) | `PT_Dune_Imperium_House_Hagal_Sheet.pdf`, 2 páginas, criado em 03/08/2021 | mesma página de recursos, https://d19y2ttatozxjp.cloudfront.net/pdfs/PT_Dune_Imperium_House_Hagal_Sheet.pdf | 08/11/2026 |
| Livro de regras em português hospedado pela Dire Wolf (`PT_Dune_Imperium_Rulebook.pdf`, 16 páginas, 05/08/2021) | Mesmos créditos de tradução; usado só para conferir que é o mesmo texto da Galápagos | https://d19y2ttatozxjp.cloudfront.net/pdfs/PT_Dune_Imperium_Rulebook.pdf | 08/11/2026 |
| **Rulebook original em inglês** (Dire Wolf), `DUNE_IMPERIUM_Rules_2020_10_26.pdf`, 20 páginas (inclui o Board Space Guide nas p. 17 e 18 e a Casa Hagal nas p. 19 e 20) | Criado em 27/10/2020 | https://d19y2ttatozxjp.cloudfront.net/pdfs/DUNE_IMPERIUM_Rules_2020_10_26.pdf (linkado em /dune-imperium/resources/rules/) | 08/11/2026; usado para comparar |
| **FAQ e errata oficiais** (Dire Wolf, em inglês), "Last Updated January 13, 2025", 4 páginas. O livro brasileiro remete ao FAQ em inglês (p. 14) | `DUNE_IMPERIUM_FAQ_25-1-13.pdf` | https://d19y2ttatozxjp.cloudfront.net/pdfs/DUNE_IMPERIUM_FAQ_25-1-13.pdf | 08/11/2026 |
| Vídeo do topo | "DUNA IMPERIUM - Gameplay resumida em 10 minutos", canal Duque Board Games (título e canal pelo oEmbed oficial) | https://www.youtube.com/watch?v=CYDTcBKB7cg | Achado na busca do próprio canal (`/@DuqueBoardgames/search?query=duna imperium`) em 08/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial; +https://eliteboardgamers.com.br)`, que se identifica como robô. A busca da API da biblioteca (`library-download/store/search?term=imperium`) listou os itens 1715 e 413 do DUN001 e, à parte, o Uprising (DUN101) e as expansões, que não foram usados. O `www.asmodee.com.br` respondeu "Access Denied" (403, Akamai) ao nosso User-Agent, inclusive no `robots.txt`; não troquei o User-Agent nem procurei outro caminho. O `robots.txt` da Dire Wolf só bloqueia `/includes/`; o da loja da Dire Wolf não bloqueia `/collections/<nome>/products.json`. O do YouTube bloqueia `/results`, não a busca do canal nem o oEmbed.

**Texto extraído** (scratchpad, fora do repositório): manual brasileiro por página em `txt/p1.txt` a `txt/p16.txt` e juntas, com marcador de página, em `txt/dun001_por_pagina.txt`; Guia dos Espaços em `pt/espacos_p1.txt` e `pt/espacos_p2.txt`; Casa Hagal em `pt/hagal_p1.txt` e `pt/hagal_p2.txt`; inglês em `en/p1.txt` a `en/p20.txt`; FAQ em `faq/faq.txt`. Páginas renderizadas em PNG em `img/` (80, 250 e 500 dpi), lidas como imagem nas páginas 3, 4, 5, 7 a 13.

**Dados do topo da página (JSON).** "1 a 4 jogadores": o livro trata das partidas de 4 jogadores (p. 5 e 12) e das partidas solo e de 2 jogadores (p. 5, folheto da Casa Hagal). Duração e idade **não estão no manual** e a página do produto da Asmodee Brasil está bloqueada para robô; a página da Dire Wolf e a da loja da Dire Wolf não trazem esses dados em texto. Usei "60 a 120 min" e "14+", os valores da ficha da resenha do próprio site (`conteudo/dune-imperium.json`), que vêm de fonte secundária: **ponto a conferir pelo editor na caixa ou na página da Asmodee**.

## 2. Procura (autocompletar, 08/11/2026)

- Google, "como jogar duna imperium": sugere "dune imperium como jogar".
- Google, "como jogar dune imperium": a própria frase.
- YouTube, "como jogar duna imperium": "como jogar dune imperium uprising", "como jogar dune imperium".

O título usa o nome brasileiro, "Duna: Imperium" (pedido do coordenador em 08/11/2026); a descrição e a chamada citam também "Dune: Imperium", que é como muita gente procura.

## 3. Glossário (nomes da edição brasileira)

| Termo no manual brasileiro | Original | Página | Uma linha |
|---|---|---|---|
| Líder | Leader | p. 4 e 6 | Carta do jogador com duas habilidades; a da direita é a do Anel do Sinete |
| Anel do Sinete | Signet Ring | p. 3, 6 e 16 | Carta do baralho inicial que ativa a habilidade da direita do Líder |
| Agente | Agent | p. 6 e 9 | Peça que você manda a um espaço do tabuleiro; começa com 2 |
| Espadachim | Swordmaster | p. 5; Guia | O terceiro Agente, comprado no espaço Espadachim |
| Mentat | Mentat | p. 4, 6 e 16; Guia | Agente neutro que se pega por uma rodada no espaço Mentat |
| marcador de Conselheiro | Councilor token | p. 3; Guia | Disco que vai ao assento do Alto Conselho |
| Turno do Agente / Turno de Revelar | Agent turn / Reveal turn | p. 8 a 11 | Os dois tipos de turno |
| caixa do Agente / caixa de Revelar | Agent box / Reveal box | p. 8 | As duas metades de efeito da carta |
| ícone de Agente: Imperador, Guilda Espacial, Bene Gesserit, Fremen, Landsraad, Cidade, Comércio de Especiaria | Emperor, Spacing Guild, Bene Gesserit, Fremen, Landsraad, City, Spice Trade | p. 9 | Diz a que espaços a carta manda o Agente |
| espaço no tabuleiro | board space | p. 9 | Onde o Agente vai |
| espaço de Combate | Combat space | p. 10 | Espaço com deserto e espadas cruzadas; permite enviar tropas |
| Conflito (área de Conflito) | Conflict | p. 10 | Centro do tabuleiro, entre as guarnições |
| guarnição | garrison | p. 5 e 10 | Círculo do jogador no tabuleiro onde ficam as tropas recrutadas |
| estoque | supply | p. 5 | Área do jogador fora do tabuleiro |
| banco | bank | p. 5 | Solari, especiaria e água à disposição de todos |
| tropa; recrutar; enviar; recuar; perder | troop; recruit; deploy; retreat; lose | p. 10 e 16 | Cubos do jogador; estoque → guarnição → Conflito |
| força; espada | strength; sword | p. 11 e 16 | Tropa no Conflito vale 2, espada revelada vale 1 |
| Trilha de Combate; marcador de Combate | Combat track; combat marker | p. 5 e 11 | Onde se marca a força |
| Carta de Conflito; Baralho de Conflito (Conflito I, II, III) | Conflict card/deck | p. 4 e 8 | Uma por rodada, com as recompensas |
| recompensa | reward | p. 12 | 1ª, 2ª e (só com 4) 3ª da Carta de Conflito |
| controle; marcador de Controle; bônus de Controle | control; Control marker | p. 10 e 16 | Bandeira sob Arrakina, Cartago ou Bacia Imperial |
| Persuasão | Persuasion | p. 11 e 16 | Moeda para adquirir cartas, só no Turno de Revelar |
| adquirir | acquire | p. 11 e 16 | Pegar carta nova para a pilha de descarte |
| Linha Imperial; Baralho Imperial | Imperium Row; Imperium deck | p. 4 e 11 | As 5 cartas à venda e o baralho que as repõe |
| Cartas da Reserva: Elo com Arrakis, A Especiaria Deve Fluir, Dobra Espacial | Reserve: Arrakis Liaison, The Spice Must Flow, Foldspace | p. 3, 4 e 11 | Pilhas fixas ao lado da Linha |
| excluir | trash | p. 6 e 16 | Tirar carta do baralho até o fim do jogo |
| descartar | discard | p. 16 | Tirar carta da mão para a pilha de descarte |
| Influência; Trilha de Influência; Facção | Influence; Influence track; Faction | p. 7 | Avanço com Imperador, Guilda Espacial, Bene Gesserit e Fremen |
| Aliança; marcador de Aliança | Alliance | p. 7 | Do primeiro a chegar a 4 de Influência |
| Pontos de Vitória; Trilha de Pontuação; marcador de Pontos | Victory Points | p. 5 e 6 | 10 ativam o fim |
| Carta de Intriga: Trama, Combate, Fim de Jogo | Intrigue: Plot, Combat, Endgame | p. 7 | Cartas secretas fora do baralho |
| Solari, especiaria, água | Solari, spice, water | p. 3 e 16 | Os três recursos |
| Fabricante; especiaria bônus | Maker; bonus spice | p. 10, 13 e 16 | Três espaços que acumulam especiaria |
| Começo da Rodada, Turnos do Jogador, Combate, Fabricantes, Chamar | Round Start, Player Turns, Combat, Makers, Recall | p. 8 | As cinco fases |
| Primeiro Jogador | First Player | p. 5 e 13 | Marcador que gira no sentido horário |
| Casa Hagal; Rival | House Hagal; Rival | folheto | Oponente automático do solo e de 2 jogadores |

Nomes dos espaços (Guia dos Espaços e tabuleiro, p. 4 e 5): Conspirar, Riqueza (Imperador); Paquete, Dobra Espacial (Guilda Espacial); Reprodução Seletiva, Segredos (Bene Gesserit); Guerreiros Resistentes, Trajestiladores (Fremen); Alto Conselho, Salão da Oratória, Mentat, Convocar Tropas, Espadachim (Landsraad); Vender Mélange, Contrato Seguro (CHOAM, ícone Comércio de Especiaria); Arrakina, Cartago, Estação de Pesquisa, Sietch Tabr (Cidade); A Grande Chã, Bacia Hagga, Bacia Imperial (Comércio de Especiaria, Fabricantes). Observação: o exemplo da p. 12 escreve uma vez "Arrakeen" (nome inglês) e "Abby" por Abgail; o tutorial usa "Arrakina".

## 4. Base de regras

Classificação: V = verificada nesta sessão; I = interpretada; L = lacuna. "Guia" = folheto Guia dos Espaços no Tabuleiro (PT). "FAQ" = FAQ oficial em inglês.

**Objetivo e fim**
- O1. Pontos de Vitória sobem e descem na Trilha de Pontuação. [BR p. 6] V
- O2. Ao fim de uma rodada, se alguém tem 10 PV ou mais, ou o Baralho de Conflito está vazio, o jogo termina; mais PV vence. [BR p. 6 e 13] V
- O3. No Fim de Jogo, primeiro se jogam as Intrigas de Fim de Jogo; depois mais PV vence. Desempate: especiaria, Solari, água, tropas guarnecidas, nessa ordem. [BR p. 13] V. Último desempate do FAQ: quem fez o Turno de Revelar mais recentemente. [FAQ "Endgame"] V
- O4. O Baralho de Conflito tem 10 cartas, então a partida tem no máximo 10 rodadas. [BR p. 4, contagem] I (dedução direta)

**Preparação** (ordem do manual, p. 4 e 5)
- P-A. Tabuleiro; Mentat deitado no espaço do Mentat (A1); 4 marcadores de Aliança no alto das Trilhas de Influência (A2). [BR p. 4] V
- P-B. Baralho de Conflito: 4 Conflito III embaixo, 5 de 10 Conflito II sorteadas no meio, 1 de 4 Conflito I em cima; 10 cartas; as outras voltam à caixa sem olhar. [BR p. 4] V
- P-C. Baralho de Intriga embaralhado virado para baixo (C1); Baralho Imperial embaralhado, 5 cartas viradas para cima formam a Linha Imperial (C2); três pilhas da Reserva: Elo com Arrakis, A Especiaria Deve Fluir, Dobra Espacial (C3). [BR p. 4] V
- P-D. Cada jogador recebe um Líder, escolhido ou sorteado; na primeira partida, recomendam Líder de um ícone: Paul Atreides, Glossu "A Fera" Rabban, Conde Memnon Thorvald ou Conde Ilban Richese. [BR p. 4] V
- P-E. Baralho inicial de 10 cartas embaralhado, virado para baixo, à esquerda do Líder. [BR p. 5] V. Conteúdo: Argumento Convincente (2), Adaga (2), Diplomacia (1), Duna, o Planeta Deserto (2), Reconhecimento (1), Buscar Aliados (1), Anel do Sinete (1). [BR p. 3] V
- P-F. 1 água para cada; banco com Solari, especiaria e o resto da água, teoricamente infinitos. [BR p. 5] V
- P-G1. 2 Agentes sobre o Líder; o terceiro (Espadachim) perto do tabuleiro. [BR p. 5] V
- P-G2. Disco de Pontos na Trilha de Pontuação: espaço 1 com 4 jogadores, espaço 0 nos outros casos. [BR p. 5] V
- P-G3. Marcador de Combate no 0 da Trilha de Combate. [BR p. 5] V
- P-G4. 4 cubos, um abaixo de cada Trilha de Influência. [BR p. 5] V
- P-G5. 12 cubos são tropas: 3 na guarnição mais próxima; o resto no estoque. [BR p. 5] V
- P-G6. Resto dos componentes no estoque, visível. [BR p. 5] V
- P-H. Primeiro jogador sorteado; pega o marcador. [BR p. 5] V
- P-X. Solo e 2 jogadores: preparação especial no folheto Casa Hagal. [BR p. 5] V
- P-Y. Componentes das cores sem dono e os 4 marcadores do Barão Harkonnen (só com esse Líder) ficam na caixa. [BR p. 3 e 13] I (o manual não manda guardar; dedução)
- P-Z. Cartas da Casa Hagal e folheto: só solo e 2 jogadores. [BR p. 3] V

**Rodada** [BR p. 8]
- R1. Cinco fases: Começo da Rodada, Turnos do Jogador, Combate, Fabricantes, Chamar. V
- R2. Começo: revela a Carta de Conflito do topo, em cima das anteriores; cada jogador compra 5 cartas do próprio baralho. V
- R3. Turnos do Jogador: a partir do Primeiro Jogador, sentido horário, um turno por vez: Turno do Agente ou Turno de Revelar. Turno do Agente é opcional. Depois do Revelar, seus turnos são pulados; a fase acaba quando todos revelaram. V
- R4. Intrigas de Trama: quantas quiser, a qualquer momento do seu Turno do Agente ou de Revelar. [BR p. 7 e 8] V

**Turno do Agente** [BR p. 9 e 10]
- A1. Jogue uma carta da mão virada para cima e mande um Agente do Líder a um espaço não ocupado cujo ícone (canto superior esquerdo) seja igual a um ícone de Agente da carta. Um ícone só; uma carta manda um Agente só. V
- A2. Espaço com Agente (de qualquer jogador) não recebe outro. V
- A3. Custo do espaço pago antes de qualquer efeito; sem pagar, não vai. Requisito (Sietch Tabr: 2 de Influência com os Fremen) precisa ser cumprido. V
- A4. Ganha o efeito do espaço e da caixa do Agente da carta, na ordem que quiser; espaço de Facção: +1 de Influência com ela. V
- A5. Carta sem ícone de Agente só serve no Turno de Revelar. V
- A6. Seta: custo à esquerda ou acima, efeito à direita ou abaixo; pagar é opcional; no máximo uma vez por carta jogada. [BR p. 9 e 16] V. Exceção do FAQ: no custo de Carta de Intriga, pagar é obrigatório para jogá-la. [FAQ "optional effects", "Intrigue cards"] V
- A7. Recrutar: tropa do estoque para a guarnição; sem tropas no estoque, não recruta. [BR p. 10 e 16] V
- A8. Enviar ao Conflito só quando o Agente vai a espaço de Combate: qualquer número das tropas recrutadas neste turno (espaço ou carta) e até 2 a mais da guarnição. As recrutadas não enviadas vão para a guarnição. [BR p. 10; Guia] V
- A9. Espaços de Combate: os do planeta com deserto e espadas, mais Paquete (Guilda) e Guerreiros Resistentes e Trajestiladores (Fremen). [BR p. 10] V
- A10. Fabricantes (A Grande Chã, Bacia Hagga, Bacia Imperial): especiaria base do espaço mais toda a especiaria bônus acumulada. [BR p. 10 e 16] V
- A11. Mentat: pegue-o no espaço Mentat; use como Agente nesta rodada; volta na fase Chamar. Só se pega do espaço Mentat, salvo recompensa de Conflito, que o tira de onde estiver e o mantém para a rodada seguinte. [BR p. 6, 13 e 16; Guia] V
- A12. Chamar um Agente (efeito): ele volta ao Líder e pode ser usado de novo na mesma rodada. [BR p. 16] V
- A13. Comprar carta com baralho vazio: embaralha o descarte e continua. [BR p. 6 e 16] V
- A14. Descartar = carta da mão, não Intriga, salvo indicação. [BR p. 16] V
- A15. Excluir: carta da mão, da pilha de descarte ou em jogo vai para a caixa; carta da Reserva volta à sua pilha; opcional salvo custo ou se a carta mandar se excluir. [BR p. 6 e 16] V
- A16. Laço Fremen: efeito vale se você tem outra carta Fremen em jogo; duas se ativam mutuamente. [BR p. 16] V
- A17. Em Jogo: cartas jogadas e reveladas ficam em jogo até a limpeza. [BR p. 16] V

**Espaços** [Guia p. 1 e 2; ícones conferidos na ilustração do tabuleiro, BR p. 4 e 5] V
- Alto Conselho (Landsraad, 5 Solaris, uma vez por partida): Conselheiro num assento; +2 de Persuasão em cada Turno de Revelar até o fim.
- Conspirar (Imperador, 4 especiarias): +1 Imperador, 5 Solaris, 2 tropas, 1 Intriga.
- Riqueza (Imperador): +1 Imperador, 2 Solaris.
- Contrato Seguro (Comércio de Especiaria): 3 Solaris.
- Vender Mélange (Comércio de Especiaria, 2 a 5 especiarias): Solaris conforme a tabela; uma troca por turno. Tabela da ilustração do tabuleiro: 2→6, 3→8, 4→10, 5→12. V (valores lidos na imagem de 500 dpi)
- Arrakina (Cidade, Combate): 1 tropa, compra 1 carta; controlador ganha 1 Solari.
- Cartago (Cidade, Combate): 1 tropa, 1 Intriga; controlador ganha 1 Solari.
- Estação de Pesquisa (Cidade, Combate, 2 águas): compra 3 cartas.
- Sietch Tabr (Cidade, Combate, requisito 2 Influência Fremen): 1 tropa, 1 água.
- A Grande Chã (Comércio de Especiaria, Combate, 2 águas): 3 especiarias + bônus.
- Bacia Hagga (Comércio de Especiaria, Combate, 1 água): 2 especiarias + bônus.
- Bacia Imperial (Comércio de Especiaria, Combate): 1 especiaria + bônus; controlador ganha 1 especiaria.
- Convocar Tropas (Landsraad, 4 Solaris): 4 tropas.
- Salão da Oratória (Landsraad): 1 tropa; +1 de Persuasão no seu Turno de Revelar se tiver Agente ali. Nome conforme o Guia.
- Mentat (Landsraad, 2 Solaris): compra 1 carta; pega o Mentat.
- Espadachim (Landsraad, 8 Solaris, uma vez por partida): ganha o terceiro Agente, já nesta rodada.
- Paquete (Guilda Espacial, Combate, 6 especiarias): +1 Guilda, 5 tropas, 2 águas.
- Dobra Espacial (Guilda Espacial): +1 Guilda; adquire uma Dobra Espacial da Reserva.
- Reprodução Seletiva (Bene Gesserit, 2 especiarias): +1 Bene Gesserit; exclua 1 carta para comprar 2.
- Segredos (Bene Gesserit): +1 Bene Gesserit; 1 Intriga; quem tem 4 ou mais Intrigas lhe dá uma, ao acaso.
- Guerreiros Resistentes (Fremen, Combate, 1 água): +1 Fremen; 2 tropas.
- Trajestiladores (Fremen, Combate): +1 Fremen; 1 água.

**Bônus de Controle** [BR p. 10 e 16] V
- C1. Vencer Conflito de Arrakina, Cartago ou Bacia Imperial dá o marcador de Controle na bandeira do espaço (substitui o de um oponente).
- C2. Com o seu marcador ali, você recebe o bônus quando qualquer jogador, inclusive você, manda Agente ao espaço: 1 Solari em Arrakina e Cartago, 1 especiaria na Bacia Imperial.
- C3. Quando é revelada a Carta de Conflito de um espaço que você controla, você pode enviar 1 tropa do estoque ao Conflito.

**Turno de Revelar** [BR p. 11] V
- V1. Ordem: Revelar Cartas, Resolver Efeitos de Revelar, Definir Força, Limpar.
- V2. Revele todas as cartas restantes da mão, separadas das jogadas nos Turnos do Agente.
- V3. Ganhe os efeitos de Revelar só das cartas reveladas agora, na ordem que quiser; a Persuasão pode ser gasta antes, durante ou depois.
- V4. Adquirir: qualquer das 5 da Linha Imperial, Elo com Arrakis ou A Especiaria Deve Fluir; Dobra Espacial só pelo espaço ou ícone. Custo no canto superior direito. Quantas quiser; Persuasão soma de várias fontes e se divide; não se guarda.
- V5. Carta adquirida vai para a pilha de descarte. A Linha é reposta na hora; a carta nova pode ser comprada no mesmo turno.
- V6. Efeito ao Adquirir: uma vez, ao adquirir. [BR p. 16] V
- V7. Força: cada tropa no Conflito vale 2; cada espada revelada neste Turno de Revelar vale 1; sem tropa no Conflito, força 0, e nada a aumenta. Mova o marcador; acima de 20, vira para +20.
- V8. Limpar: todas as cartas da sua frente (Agente e Revelar) vão para a pilha de descarte.
- V9. Carta comprada durante o Turno de Revelar é revelada e usada; comprada depois, fica para a rodada seguinte, somando-se às 5. [FAQ "Reveal turn"] V

**Combate** [BR p. 12] V
- K1. Do Primeiro Jogador em sentido horário, cada jogador com ao menos 1 tropa no Conflito joga quantas Intrigas de Combate quiser ou passa; pode voltar a jogar depois de passar; resolve quando todos os envolvidos passam seguidos.
- K2. Intriga "quando você vence um Conflito" se joga depois de vencer, antes da próxima fase.
- K3. Maior força: 1ª recompensa; segunda maior: 2ª; 3ª só com 4 jogadores. Força 0 não recebe nada.
- K4. Empate no 1º: ninguém vence; cada empatado recebe a 2ª (com 4, os outros dois disputam a 3ª). Empate no 2º: cada um recebe a 3ª. Empate no 3º: nada.
- K5. Depois, tropas do Conflito voltam ao estoque (não à guarnição); marcadores de Combate voltam a 0.
- K6. As regras de recompensa são as mesmas para 1, 2 ou 3 jogadores; só mudam com 4. [FAQ "Conflict"] V
- K7. Perder tropa: volta ao estoque. Recuar: volta à guarnição. [BR p. 16] V

**Fabricantes e Chamar** [BR p. 13] V
- F1. Cada Fabricante sem Agente recebe 1 especiaria bônus, somada à que já estava.
- F2. Agente tirado de um Fabricante que fica vazio até a Fase 4: a especiaria acumula normalmente. [BR p. 13]
- H1. Chamar: verifica o fim (O2); se não acabou, Mentat volta ao lugar, Agentes voltam aos Líderes, o marcador de Primeiro Jogador passa no sentido horário.

**Facções e Intrigas** [BR p. 7] V
- I1. Cubos começam no primeiro espaço de cada trilha. Agente em espaço de Facção: +1 de Influência ali.
- I2. 2 de Influência: +1 PV; caiu abaixo de 2, perde esse PV.
- I3. 4 de Influência: bônus impresso no espaço; cair abaixo de 4 não devolve; possível ganhar de novo.
- I4. O primeiro a chegar a 4 faz a Aliança: pega o marcador e ganha o PV dele. Quem passa a um espaço mais alto toma o marcador e o PV.
- I5. FAQ: quem tem a Aliança e perde Influência com a Facção perde o marcador (a) se já estava empatado com outro jogador: o empatado o pega; com mais de um empatado, o dono escolhe; (b) se cair a 3 ou menos: o marcador vai para um jogador com 4 ou mais; se ninguém tiver, volta ao tabuleiro. [FAQ "Alliance"] V. Quem recebe no caso (b), se houver mais de um com 4 ou mais: o FAQ não diz. L
- I6. Ganhar 2 de Influência de uma vez: na mesma Facção. [BR p. 16] V
- I7. Intrigas: viradas para baixo, fora do baralho; você pode olhar as suas; revela ao jogar; depois vão para o descarte de Intriga. Tipos: Trama (no seu Turno do Agente ou de Revelar), Combate (só no Combate), Fim de Jogo (só no fim). [BR p. 7] V
- I8. Fontes principais: Cartago, Conspirar, Segredos e o ícone de Intriga. [BR p. 7] V
- I9. Baralho de Intriga esgotado: embaralha o descarte de Intriga. [FAQ "Intrigue cards"] V
- I10. Roubar Intriga: cada oponente com 4 ou mais lhe dá uma, ao acaso. [BR p. 16] V

**Líderes** [BR p. 6 e 13] V
- L1. Habilidade da esquerda: conforme a carta. Da direita (Anel do Sinete): ao jogar a carta Anel do Sinete num Turno do Agente.
- L2. Barão Vladimir Harkonnen, Golpe de Mestre: escolhe 2 dos 4 marcadores, os outros voltam à caixa sem mostrar; revela depois (uma vez). FAQ: escolha depois de toda a preparação, antes da primeira rodada. V

**Solo e 2 jogadores** [folheto Casa Hagal] V
- H2-1. Com 2, a Casa Hagal é um Rival: não junta recursos, não monta baralho, não ganha recompensas nem PV; manda Agentes e disputa Conflitos.
- H2-2. Age depois de cada Turno do Agente do Primeiro Jogador, enquanto tiver Agente.
- H2-3. Preparação: cubos abaixo das trilhas; sem tropas na guarnição; tirar do baralho as três cartas de Arrakina marcadas "1J".
- H2-5. Rival: revela a carta do topo; Agente no espaço da carta se vazio, senão revela outra; baralho vazio ou carta Reembaralhar: reembaralha. Ignora custos e efeitos do espaço; só o da carta: avança na trilha (sem bônus, faz Aliança se puder), recruta 1 tropa por ícone (ao Conflito se espaço de Combate, senão guarnição), Minerar Especiaria: segue a carta e devolve o bônus ao banco (2 jogadores). Em espaço de Combate envia também até 2 da guarnição. [folheto p. 1] V
- H2-6. Combate: no começo da fase 3, com tropa no Conflito, revela a carta do topo e soma as espadas da parte de baixo. [folheto p. 1] V
- H2-7. Não ganha recompensas nem controle; vencendo Conflito de espaço controlado por jogador, remove o marcador dele. [folheto p. 1] V
- H2-8. Depois do Turno de Revelar do Primeiro Jogador, a Casa Hagal não age mais na rodada (ela age depois de cada Turno do Agente dele). I. Recompensas dos jogadores quando a Casa Hagal fica bem colocada: pela FAQ ("Conflict": regras iguais para 1, 2 ou 3 jogadores), cada jogador recebe a recompensa da sua posição e a da Casa Hagal fica sem dono. I
- H2-4. FAQ (errata): tirar também as duas cartas de Salão da Oratória e as duas de Convocar Tropas. Errata do folheto da expansão *Ascensão de Ix*, não do jogo base. I: não entra no tutorial; registrada aqui.

**Acréscimos depois das auditorias independentes (08/11/2026)**
- P-F2. A preparação só dá 1 água: ninguém começa com Solari, especiaria ou Intriga. [BR p. 5] I (por omissão do manual)
- P-D2. Ícones de complexidade: pequenos ícones brancos depois do nome do Líder (Duque Leto Atreides tem dois, na ilustração da p. 5). [BR p. 4 e 5] V
- P-G3b. Marcador de Combate: o lado da espada, sem o +20, para cima. [BR p. 5, ilustração; p. 11] V
- A8b. Exceções ao envio só em espaço de Combate: cartas que mandam enviar (Legião Sardaukar, caixa de Revelar: "Envie até três tropas de sua guarnição para o Conflito", ilustração da p. 9; cartas suplantam regras, p. 6) e a tropa de defesa de quem controla (p. 10). V
- K4b. Empate no 2º com 3 jogadores: sem recompensa (a 3ª só existe com 4). I (o manual não trata)
- K4c. Três empatados no 1º com 4 jogadores: cada um recebe a 2ª; o que recebe o quarto, o manual não diz. L
- C1b. Marcador de Controle substituído: o manual não diz para onde vai; o tutorial sugere o estoque do dono. I
- A11b. Mentat ganho como recompensa: volta ao espaço na fase Chamar (p. 13) e o vencedor o pega no começo da rodada seguinte (FAQ, "Sort Through the Chaos"). V

**Regras que costumam ser jogadas errado** (fonte: os negritos e as notas do próprio manual, que sinalizam onde ele espera erro; não consultei fórum): tropas recrutadas fora de espaço de Combate não vão ao Conflito (exemplo de Denis, p. 10); máximo de 2 tropas da guarnição (exemplo de João, p. 10); tropas do Conflito voltam ao estoque, não à guarnição (negrito, p. 12); força 0 sem tropa, mesmo com espadas (negrito, p. 11); só a caixa de Revelar das cartas reveladas agora (p. 11); a Aliança só muda para quem passa a um espaço mais alto (negrito, p. 7); seta paga uma vez só (exemplo do Acampamento Fremen, p. 9).

**Lacunas.** L1: o manual não descreve o efeito das 10 cartas do baralho inicial (só nomes e quantidades, p. 3); o tutorial ensina a ler os ícones da carta e usa só as cartas cujos efeitos o manual mostra nos exemplos (Duna, o Planeta Deserto vai à Bacia Imperial, p. 10; Duncan Idaho, p. 10; Iniciada Bene Gesserit, p. 10; Espião Imperial, Tóptero do Contrabandista, Stilgar, p. 11; Emboscada, p. 12). L2: as recompensas de cada Carta de Conflito só aparecem na carta e no guia de ícones (p. 16); o tutorial explica o mecanismo. L3: o bônus de 4 de Influência de cada Facção está impresso no tabuleiro; o manual mostra só o da Bene Gesserit (ícone de Intriga, p. 7); o tutorial manda ler o tabuleiro. L4: duração e idade (ver seção 1).

## 5. Divergências entre edições

- O texto em português da Galápagos (biblioteca) e o da Dire Wolf (PT_Dune_Imperium_Rulebook) têm os mesmos créditos de tradução; conferi as p. 3 e 15.
- O livro brasileiro (16 p.) não traz o Guia dos Espaços nem a Casa Hagal, que na caixa são folhetos à parte; o inglês de 2020 junta tudo em 20 páginas. O conteúdo das regras confere nas páginas comparadas (6 a 13).
- FAQ de 13/01/2025: nenhuma errata do jogo base que mude regra ensinada; as entradas usadas estão na base (A6, I5, I9, K6, V9, O3, L2).

## 6. Mapa instrucional

| Classe de tarefa | Apoio (o porquê) | Procedimento | Prática |
|---|---|---|---|
| Montar a mesa | A mesa é o mapa: Facções à esquerda, Landsraad e CHOAM no alto, Arrakis no meio | Passos A a H do manual (p. 4 e 5), com figura em cada passo | Pergunta de conferência (4 jogadores) |
| 0. Primeiro Turno do Agente (Comece em 4 minutos) | Carta → ícone → espaço | Os 5 passos do Turno do Agente | Resolvido (exemplo do manual, Bacia Imperial), complete, sua vez |
| 1. Turno do Agente completo | Cada carta é passe para o tabuleiro; espaços bloqueiam | Custos, setas, Influência, tabela dos 22 espaços | Resolvido, complete, sua vez |
| 2. Turno de Revelar e baralho | A mão faz duas coisas: o que você joga agora e o que revela depois | Revelar, efeitos, adquirir, força, limpar | Resolvido (João, p. 11), complete, sua vez; treino de força |
| 3. Conflito, Combate e Fabricantes | Tropas como aposta; a força só vale com tropa no Conflito | Enviar tropas, Intriga de Combate, recompensas, empates, controle, Fabricantes | Resolvido (p. 12), complete, sua vez |
| 4. Facções, Intrigas e fim | Pontos vêm de Influência, Alianças, Conflitos e cartas | Trilhas, Aliança, Intrigas, Chamar, fim e desempate | Resolvido, complete, sua vez |

Redução de carga: o "Comece" só ensina o Turno do Agente; o Revelar aparece ali em duas linhas porque acontece na primeira rodada, e o resto fica em "Ainda não precisa saber". Exceções (Mentat, Espadachim, Alto Conselho, controle, Barão, Casa Hagal) vão em `[!mais]`. Limite: o texto não observa o leitor.

**Extensão.** Alvo do editor para jogo médio/pesado: 5.000 a 6.500 palavras, 4 etapas. A tabela dos 22 espaços é o que mais ocupa; ela substitui a consulta ao folheto e foi mantida.

## 7. Portões automáticos

Resultado em `auditoria.md`, seção "Portões".
