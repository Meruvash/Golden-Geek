# Dossiê: Como Jogar Catan

Entrega 1 da linha COMO JOGAR, produzida em 31/10/2026 pelo método de `docs/como-jogar/PROMPT_PILOTO.md` (Parte 2), com as exceções do briefing: jogo já escolhido, sem commit, sem subagentes, sem explicação do método no tutorial.

## 1. Escolha do jogo e procura real

O jogo veio escolhido pelo editor (pauta em `conteudo/como_jogar_pauta.json`). Não há resenha de Catan no site (não existem `catan/` nem `conteudo/catan.json`), então `resenha` fica `null` no JSON.

Autocompletar consultado em 31/10/2026:

- Google (`client=firefox&hl=pt-BR&q=como+jogar+catan`): "como jogar catan", "como jogar catan de 2", "como jogar catan tabuleiro", "como jogar catan online", "como jogar catan o jogo de cartas", "como jogar catan junior", "como jogar catan com expansão", "como jogar catan plus", "como jogar catan cidades e cavaleiros", "como jogar catan navegantes".
- YouTube (`client=youtube&ds=yt`): "como jogar catan", "como jogar catan plus", "como jogar catan de 2", "como jogar catan cartas", "como jogar catan cidades e cavaleiros", "como jogar catan online", "como jogar catan junior", "como jogar catan mercadores e barbaros", "como jogar catan duelo", "como jogar catan expansao", "como jogar catan piratas e exploradores", "como jogar catan devir", "como jogar catan navegantes".

A busca "de 2" aparece em segundo lugar nos dois. O jogo base é para 3 ou 4; a variante oficial para 2 existe (seção 2) e o tutorial só aponta para ela, sem ensinar, porque não é a regra do jogo base.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Regras de Catan, o jogo** (Devir, em português) | Folheto de 4 páginas. Créditos: © 1995, 2015 Kosmos; "Redação Edição 2015: Reiner Müller, Sebastian Rapp"; "Créditos da versão Portuguesa: Produção editorial Xavi Garriga, Adaptação gráfica Antonio Catalán, Tradução Rui Ferrão, 12/2018". PDF criado em 27/12/2018 (InDesign CC 14), servidor informa última modificação em 15/10/2019. Arquivo `693602_Cat_Basis34_Manual_PT02.pdf`, 4.045.086 bytes | http://www.catanbrasil.com.br/pdf/693602_Cat_Basis34_Manual_PT02.pdf, botão "Baixar regras" do jogo base na página "Universo" de http://www.catanbrasil.com.br/ (site de Catan da Devir Brasil; o site da Devir Brasil, https://devir.com.br/devir-download/, aponta para ele em "Eventos > Catan") | Baixado em 31/10/2026 |
| **Catan Plus: Manual de regras** (Devir, em português) | 12 páginas, PDF de 11/02/2020, `693152_CAT_BigBox19_Manual_PT03.pdf`. Traz o jogo base (p. 2 a 6) com a lista de componentes (p. 2 e 3) e as expansões da caixa | http://www.catanbrasil.com.br/pdf/693152_CAT_BigBox19_Manual_PT03.pdf | Baixado em 31/10/2026. Usado só para os componentes do jogo base |
| **Catan Game Rules & Almanac** (manual original) | 5ª edição em inglês, Catan GmbH e Catan Studio, © 2020; nota da p. 14: regras em vigor desde 01/01/2015. 16 páginas, PDF de 07/07/2020 | https://www.catan.com/sites/default/files/2021-06/catan_base_rules_2020_200707.pdf, listado em https://www.catan.com/understand-catan/game-rules | Baixado em 31/10/2026. Usado para o Almanaque |
| Variante para 2 jogadores (Devir) | 2 páginas, © 2020 Devir Livraria Lda., tradução de Rui Ferrão | http://www.catanbrasil.com.br/pdf/catan-2-jogadores.pdf | Lida só para confirmar que existe e o termo "fase de fundação" |
| Página do produto Catan, o jogo (6ª edição) | Publicada em 08/12/2025 | https://devir.com.br/catan-o-jogo-6a-edicao/ | Consultada em 31/10/2026: "Idade: 10 anos", "Duração: 75 min. aprox.", "Jogadores: 3 a 4", "Idioma: Português"; mudanças da 6ª edição "apenas visuais e de organização" |
| Catálogo Devir Brasil "Essenciais" | Abril de 2026 | https://devir.com.br/wp-content/uploads/2026/04/Novo-Catalogo-Essenciais.pdf | Conteúdo da caixa atual: 19 terrenos, 6 peças de moldura, 18 fichas, 126 cartas, 97 figuras, 2 suportes, 2 dados, 1 manual de regras, 1 almanaque |
| Almanaque em português | Não encontrado | Site da Devir, site de Catan da Devir, busca na web | **Lacuna** |
| Manual da 6ª edição em português | Não encontrado | Idem | **Lacuna** |
| FAQ ou errata oficial | Não encontrada | catan.com, devir.com.br | Lacuna |

**Como o manual foi lido.** Os três PDFs têm camada de texto. O texto foi extraído com `pdftotext` (com e sem `-layout`), página a página, e a página de rosto do folheto (a "página 1", com a montagem para principiantes) foi renderizada a 150 dpi e conferida como imagem: portos impressos na moldura, ladrão no deserto, aldeias com letras A (vermelho), B (azul), C (laranja), D (branco). PDFs e textos ficam em `<scratchpad>/manuais/catan/`, fora do repositório.

**Paginação do folheto brasileiro.** O PDF tem 4 páginas. A 4ª do arquivo é a capa com a montagem para principiantes, que o próprio texto chama de "página 1" ("siga a montagem do tabuleiro representada na página 1"). As páginas 1 a 3 do arquivo têm impressos os números 2, 3 e 4. O tutorial cita os números impressos: p. 1 (montagem e resumo), p. 2 (preparação, resumo do turno, produção), p. 3 (comércio e construção), p. 4 (cidade, cartas de desenvolvimento, casos especiais, fim).

**Decisão sobre a edição.** A edição brasileira atual é a 6ª (página da Devir de 08/12/2025), cujo manual não está publicado. O único manual em português que a editora nacional distribui ao público para o jogo base é o folheto acima, da edição 2015, com tradução feita em Portugal (formas como "consulta", "encontrarás", "lavoura", "aldeia"). A própria Devir diz que a 6ª edição mudou arte, caixa e verso das cartas. O tutorial segue o folheto, usa os nomes dele e avisa o leitor num bloco `[!edicao]` e no parágrafo de abertura. O que o folheto manda procurar no Almanaque veio do manual original e está marcado "manual original" no texto.

## 3. Glossário

Termos como impressos no folheto da Devir (BR), com o termo do manual original e a página.

| Termo BR | Original | Página BR | Uma linha |
|---|---|---|---|
| ilha de Catan | island of Catan | p. 1 | o tabuleiro montado |
| terreno (terreno hexagonal) | terrain hex | p. 1 e 2 | cada hexágono; produz uma matéria-prima |
| floresta, colina, pasto, lavoura, montanha, deserto | forest, hills, pasture, fields, mountains, desert | p. 1 | os 6 tipos de terreno |
| madeira, argila, lã, cereais, minério | lumber, brick, wool, grain, ore | p. 1 e 3 | as 5 matérias-primas |
| matéria-prima / carta de matéria-prima | resource / resource card | p. 2 | as cartas que os terrenos produzem |
| moldura, peças de mar | frame, sea frame pieces | p. 2 | a borda do tabuleiro, com os portos impressos |
| porto, porto 3:1, porto especial | harbor, generic harbor, special harbor | p. 3 | lugares da costa com troca melhor |
| ficha numerada | number token | p. 1 e 2 | o número de cada terreno |
| encruzilhada | intersection | p. 1 e 3 | ponta de terreno; lugar de aldeia e cidade |
| caminho | path | p. 1 e 3 | lado de terreno; lugar de estrada |
| aldeia, cidade, estrada | settlement, city, road | p. 2 a 4 | as peças de construção |
| ladrão | robber | p. 1 e 4 | bloqueia um terreno e rouba |
| tabela de custos de construção | building costs card | p. 2 (p. 3 diz "carta de custos de construção") | referência dos custos; o tutorial usa "tabela" |
| reserva | supply / bank | p. 3 e 4 | as pilhas de cartas de matéria-prima; o folheto também chama de "reserva" as peças de cada jogador, e o tutorial evita esse segundo uso ("as peças à sua frente") |
| suportes de cartas | card holders | p. 2 | onde ficam as pilhas |
| Comércio Interno | domestic trade | p. 3 | troca com outros jogadores |
| Comércio Marítimo | maritime trade | p. 3 | troca com a reserva ("com o banco") |
| regra da distância | distance rule | p. 3 | as três encruzilhadas vizinhas vazias |
| carta de desenvolvimento | development card | p. 2 e 4 | comprada com minério, lã e cereais |
| Cavaleiro | knight | p. 2 e 4 | move o ladrão |
| Progresso: Monopólio, Construção de Estradas, Invenção | progress: monopoly, road building, year of plenty | p. 2 e 4 | efeito único e volta à caixa |
| Ponto de Vitória: Biblioteca, Mercado, Câmara, Igreja, Universidade | victory point: library, market, great hall, chapel, university | p. 2 e 4 | 1 ponto escondido |
| Maior Estrada Comercial | Longest Road | p. 2 e 3 | 2 pontos, estrada de 5 ou mais |
| Maior Exército de Cavalaria | Largest Army | p. 2 e 4 | 2 pontos, 3 Cavaleiros ou mais |
| pontos de vitória | victory points | p. 1 e 4 | a pontuação; 10 vence |
| Montagem inicial para principiantes | Starting Set-up for Beginners | p. 2 | montagem fixa da p. 1 |
| Montagem aleatória da ilha | Set-up, Variable | p. 2 (verbete do Almanaque) | montagem variável |
| fase de fundação | set-up phase | variante para 2 jogadores (Devir) | colocação inicial na montagem aleatória |
| Almanaque | Almanac | p. 2 | parte de consulta, não publicada em português |

## 4. Base de regras

Marcação: `[BR p. N]` folheto Devir; `[Plus p. N]` manual do Catan Plus (Devir); `[orig. p. N]` manual original; `[produto]` página da Devir. Classificação: `[verificada]`, `[interpretada]`, `[lacuna]`. "Dep." lista as regras de que ela depende.

### 4.1 Objetivo e componentes

- R1. Começa com 2 aldeias e 2 estradas, 2 pontos; 10 pontos vence. [BR p. 1] "O primeiro jogador a conseguir 10 pontos de vitória ganha o jogo." [verificada]
- R2. Cinco terrenos produzem uma matéria-prima cada; deserto não produz. [BR p. 1] "Floresta produz madeira ... Deserto não produz" [verificada]
- R3. Números maiores na ficha saem mais; 6 e 8 em vermelho. [BR p. 1] "Os números 6 e 8 são os números impressos com maior tamanho e também são de cor vermelha" [verificada]. Frequências de 2 dados calculadas em script (seção 7), conferem com a tabela de [orig. p. 3].
- R4. Componentes: 19 terrenos (4/4/4/3/3/1), 6 peças de moldura com 9 portos, 18 fichas, 95 cartas de matéria-prima (19 de cada), 25 de desenvolvimento (14 Cavaleiro, 6 Progresso, 5 Ponto de Vitória), 4 tabelas, 2 cartas especiais, 20 aldeias, 16 cidades, 60 estradas, ladrão, 2 dados, 2 suportes. [Plus p. 2 e 3] "25 Cartas de desenvolvimento Cavaleiro (14) Progresso (6) Pontos de vitória (5)"; conferido com o catálogo Devir (126 cartas = 95 + 25 + 4 + 2; 97 figuras = 20 + 16 + 60 + 1) e [orig. p. 2]. [verificada]
- R5. 3 a 4 jogadores, 75 min, 10+. [produto] [verificada]

### 4.2 Preparação (montagem para principiantes)

- R6. Moldura de 6 peças de mar, terrenos e fichas como na ilustração da p. 1; conferir portos. [BR p. 2] "Em primeiro lugar coloca a moldura formada pelas 6 peças de mar" [verificada]
- R7. Deserto sem ficha. [orig. p. 13] "The desert never gets a number token." Ilustração [BR p. 1]. [verificada]
- R8. Ladrão começa no deserto. [orig. p. 7] "The robber Y starts the game there."; ilustração [BR p. 1]. [verificada]
- R9. Cada jogador: tabela de custos, 5 aldeias, 4 cidades, 15 estradas; 2 aldeias e 2 estradas conforme ilustração; resto à frente; com 3, sai o vermelho. [BR p. 2] "retiram-se do jogo todas as peças de cor vermelha" [verificada]. Dep.: R6.
- R10. Cartas especiais e 2 dados ao lado. [BR p. 2] [verificada]
- R11. Cartas de matéria-prima por tipo, face para cima, nos suportes. [BR p. 2] "colocadas, de face para cima, nos compartimentos dos suportes de cartas" [verificada]
- R12. Cartas de desenvolvimento embaralhadas, face para baixo. [BR p. 2] [verificada]
- R13. Cartas iniciais: 1 por terreno vizinho da aldeia com letra. Exemplo: azul madeira, minério, argila; laranja 1 minério e 2 cereais. [BR p. 2] "pela sua aldeia assinalada com uma letra (v. pág.1)" [verificada]. Dep.: R9.
- R14. Cartas de matéria-prima ocultas na mão. [BR p. 2] [verificada]
- R15. O mais velho começa; a vez passa à esquerda. [BR p. 2] "O jogador mais velho inicia o jogo." / "o turno passa para o jogador seguinte, à esquerda" [verificada]

### 4.3 Turno e produção

- R16. Fases na ordem: lançar dados, comércio, construir; uma carta de desenvolvimento a qualquer momento, inclusive antes dos dados. [BR p. 2] "sempre na ordem indicada" [verificada]
- R17. Rolar é obrigatório. [orig. p. 4] "You must roll for resource production" [verificada]
- R18. O resultado vale para todos. [BR p. 2] "(o resultado aplica-se a todos os jogadores)" [verificada]
- R19. Aldeia 1 carta, cada aldeia conta; cidade 2. [BR p. 2] "obtém uma carta de matéria-prima por cada aldeia" / "recebe por essa cidade 2 cartas" [verificada]. Dep.: R18.
- R20. Terreno com ladrão não produz. [BR p. 4] "NÃO recebem NENHUMA carta de matéria-prima" [verificada]

### 4.4 Comércio

- R21. Comércio Interno com todos; só com o jogador da vez; os outros não trocam entre si. [BR p. 3] "os outros jogadores apenas podem realizar trocas comerciais com o jogador cujo turno decorre" [verificada]
- R22. Proibido dar cartas, trocar iguais, trocar cartas de desenvolvimento. [orig. p. 7 e 14] "You may not give away cards." [verificada]
- R23. Comércio Marítimo 4:1 sempre. [BR p. 3] "Pode sempre trocar 4:1" [verificada]
- R24. Porto 3:1 e porto especial 2:1. [BR p. 3] "num porto especial trocam-se 2 cartas da matéria-prima indicada no porto" [verificada]
- R25. Porto especial só vale para a matéria-prima dele. [orig. p. 9] "A special harbor does not permit you to trade any other resource type at a more favorable rate" [verificada]
- R26. Com a reserva, só no próprio turno. [orig. p. 14] [verificada]

### 4.5 Construção

- R27. Pagar, devolver cartas às pilhas, pôr a peça; construir quanto puder pagar. [BR p. 3]; [orig. p. 6] "You can build as many items ... as you desire" [verificada]
- R28. Estrada: argila e madeira, 1 por caminho. [BR p. 3] "Sobre cada caminho (➔) apenas pode ser construída 1 estrada." [verificada]
- R29. Ligação da estrada. [BR p. 3] "Uma estrada só pode ser colocada adjacente a uma encruzilhada que seja, por sua vez, adjacente a uma estrada do jogador que a constrói e onde não exista uma aldeia ou cidade de outro jogador." [orig. p. 4] "A new road must always connect to 1 of your existing roads, settlements, or cities." [interpretada]: o texto brasileiro só fala em estrada; o tutorial soma a aldeia e a cidade do original (sem isso, a estrada da fase de fundação e a de uma aldeia isolada não teriam de onde sair) e mantém o bloqueio por construção alheia do texto brasileiro.
- R30. Aldeia: argila, madeira, lã e cereais; precisa de estrada própria chegando. [BR p. 3] "onde, pelo menos, chegue uma das tuas próprias estradas" [verificada]
- R31. Regra da distância. [BR p. 3] "quando as três encruzilhadas adjacentes NÃO estejam ocupadas por outras aldeias (ou cidades independentemente do jogador" [verificada]
- R32. Cidade: 3 minérios e 2 cereais, só ampliando aldeia; aldeia volta ao jogador; produz o dobro; 2 pontos. [BR p. 4] "apenas pode ser construída através da ampliação de uma aldeia já existente" [verificada]
- R33. Aldeia vale 1 ponto. [BR p. 4] [verificada]
- R34. Carta de desenvolvimento: minério, lã e cereais, carta do topo, escondida. [BR p. 4] [verificada]
- R35. Limite de peças; com 5 aldeias, ampliar antes de construir outra. [BR p. 2] (quantidades); [orig. p. 4 e 12] "you must upgrade 1 of your settlements to a city before you can build another settlement" [verificada]
- R36. Monte de desenvolvimento vazio: não se compra. [orig. p. 5] [verificada]

### 4.6 O 7, o ladrão e as cartas de desenvolvimento

- R37. 7: ninguém produz; mais de 7 cartas devolve metade, para baixo (9 → 4). [BR p. 4] "deve arredondar para baixo (por exemplo, se um jogador tem 9 cartas, deve devolver 4)" [verificada]
- R38. Mover o ladrão é obrigatório, para outro terreno; deserto vale. [BR p. 4] "O jogador tem de mover o ladrão para outro terreno hexagonal." [orig. p. 5 e 11] "or to the desert" / "You may not choose to leave the robber on the same hex." [verificada]
- R39. Roubar 1 carta de jogador encostado, à escolha, cartas viradas. [BR p. 4] "o ladrão poderá escolher qual o jogador a quem rouba a carta" [verificada]. Sem cartas, nada [orig. p. 8]. [verificada]
- R40. Depois do 7, segue para o comércio. [BR p. 4] "continua o seu turno, passando à fase de comércio" [verificada]
- R41. Uma carta de desenvolvimento por turno. [BR p. 2] "pode jogar uma das suas cartas de desenvolvimento"; [orig. p. 7] "You may only play 1 development card during your turn" [verificada no original; o texto brasileiro é menos explícito]
- R42. A qualquer momento, inclusive antes dos dados; não no turno da compra. [BR p. 4] "NÃO pode jogar uma carta de desenvolvimento no mesmo turno em que a adquiriu." [verificada]
- R43. Cavaleiro move o ladrão e rouba; fica à vista. [BR p. 4] [verificada]. Sem descarte (o descarte é do 7) [orig. p. 8, verbete Knight Cards não fala em descarte] [verificada].
- R44. Maior Exército de Cavalaria: 3 Cavaleiros; quem tiver mais toma. [BR p. 4] "O primeiro jogador a conseguir ter três cartas de cavaleiro" [verificada]
- R45. Progresso: segue a carta e volta à caixa. [BR p. 4] [verificada]. Textos: Monopólio, Construção de Estradas ("pode construir duas estradas gratuitamente"), Invenção ("retire da reserva 2 cartas de matéria-prima à escolha") [BR p. 2, ilustração das cartas] [verificada]. Invenção iguais ou diferentes e uso no mesmo turno; estradas pelas regras normais [orig. p. 10] [verificada].
- R46. Ponto de Vitória: escondida; revela ao chegar a 10. [BR p. 4] "Só são reveladas quando, graças a elas, o jogador consegue obter um total de 10 pontos de vitória." Pode revelar no turno da compra e todas de uma vez [orig. p. 5 e 7] [verificada]
- R47. Cartas de desenvolvimento não se trocam nem se dão. [orig. p. 7] [verificada]

### 4.7 Pontos e fim

- R48. Fontes de pontos. [orig. p. 14] "1 settlement = 1 VP ..." [verificada]
- R49. Maior Estrada Comercial: 5 ou mais seguidas, sem bifurcação, interrompida por construção alheia; estrada maior toma; 2 pontos. [BR p. 3] "excluindo as bifurcações" [verificada]
- R50. Corte de estrada por aldeia; empates; carta de lado. [orig. p. 9] "If your longest road is broken and you are tied for longest road, you still keep" [verificada no original; ausente do folheto]
- R51. Fim: 10 ou mais durante o próprio turno. [BR p. 4] "Para ganhar, o jogador tem que possuir os 10 pontos de vitória (ou mais) quando chegue o seu turno, ou consegui-los durante o decorrer do mesmo." [verificada]
- R52. Chegou a 10 fora da vez: segue até alguém ter 10 no próprio turno. [orig. p. 5] [verificada]
- R53. Só aldeias dão no máximo 5 pontos. [orig. p. 6] [verificada]

### 4.8 Situações especiais

- R54. Falta de cartas na reserva. [orig. p. 4 e 10] [verificada]
- R55. Perguntar o número de cartas; resposta verdadeira. [orig. p. 8] [verificada]
- R56. Montagem aleatória: moldura, terrenos embaralhados, fichas por letra em espiral anti-horária a partir de um canto, pulando o deserto. [orig. p. 12 e 13] [verificada]. "Depois vire as fichas": o original manda pôr as fichas com a letra para cima e não diz quando virá-las; o manual do 5-6 jogadores da Devir diz "Finalmente vire todas as fichas numeradas" [interpretada].
- R57. Portos na montagem aleatória: o original sorteia peças de porto; a caixa Devir tem os portos impressos na moldura [Plus p. 2] e o original oferece embaralhar a ordem da moldura [orig. p. 12] [interpretada].
- R58. Fase de fundação (rolar para começar; ida horária; volta anti-horária; cartas da segunda aldeia; primeiro jogador rola). [orig. p. 12] [verificada]
- R59. Fase combinada de comércio e construção, recomendada para experientes. [orig. p. 6] [verificada]
- R60. Variante para 2 e expansão para 5 e 6: fora do escopo. [lacuna intencional]

### 4.9 Fora do escopo

Variante para 2 jogadores, expansão 5 e 6, montagem "totalmente aleatória" das fichas (com a restrição dos números vermelhos), dicas de tática do Almanaque.

## 5. Divergências entre as fontes

1. **Ligação da estrada (R29).** Texto brasileiro: só fala em estrada própria. Original: estrada, aldeia ou cidade. Natureza: simplificação do folheto. O tutorial usa o original, com página.
2. **Uma carta de desenvolvimento por turno (R41).** Brasileiro: "uma das suas cartas", no resumo. Original: explícito. Sem conflito.
3. **Ponto de Vitória no turno da compra (R46).** O folheto não traz a exceção; o original traz. Sem conflito com o texto brasileiro.
4. **Portos (R57).** Original americano com peças de porto; caixa Devir com portos impressos.
5. **"Reserva" com dois sentidos** no folheto brasileiro (pilhas de cartas e peças do jogador). O tutorial reserva a palavra para as pilhas.
6. **Edição.** Folheto da edição 2015 e caixa atual da 6ª edição. Textos impressos na caixa da 6ª edição não conferidos. Fonte da afirmação de que as regras não mudaram: página do produto da Devir.

## 6. Dúvidas recorrentes que o tutorial antecipa

Não usadas como fonte de regra. A lista vem do texto dos manuais (os pontos que o próprio manual marca como "Importante") e do autocompletar: produção para todos; regra da distância vale para as próprias aldeias; só o jogador da vez troca; 7 com exatamente 7 cartas; deixar o ladrão no mesmo lugar; duas cartas de desenvolvimento no mesmo turno; carta comprada no mesmo turno; empate na Maior Estrada; vitória fora do próprio turno; como jogar com 2.

## 7. Contas refeitas

Script `<scratchpad>/catan/contas.py`. Saídas conferidas com o texto:

- Frequências de 2 dados: 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:5, 9:4, 10:3, 11:2, 12:1 (de 36).
- Etapa 2: com 8, Ana 3 minérios (1 + 2), Bruno 1; com ladrão, 0. Ana com 5: 1 cereais; com 6: 2 argilas. Carla com 3: 3 madeiras.
- Etapa 3: Ana, troca 4:1 deixa 0 carta; troca interna 1 por 1 deixa 3 lãs. Bruno, 2 minérios por 1 cereais, cidade, 0 carta. Carla: aldeia + 2 estradas sobra 1 cereais e 1 minério; aldeia + estrada + desenvolvimento impossível (falta lã).
- Etapa 4: descartes 8→4, 9→4, 7→0, 11→5, 12→6; Bruno com 5 cartas depois do descarte; Monopólio 2 + 3 + 0 = 5.
- Etapa 5: Ana 4 + 2 + 2 + 1 = 9 (8 visíveis) e 10 com a quinta aldeia; Carla 8 → 9 → 11; Diana 1 + 8 + 1 = 10; treino 6, 8 e 12.
- 4 minutos: azul paga estrada e fica com 1 minério; laranja com minério, cereais e lã compra a carta.
- Etapa 1: peças à frente 3 aldeias, 4 cidades, 13 estradas.
- Avaliação 3: 4 argilas, porto especial de argila, 2 por 1 madeira, estrada + aldeia exatas.

## 8. Plano instrucional

O plano fica aqui, fora do tutorial, a pedido do editor.

| Classe de tarefa | Apoio (para entender) | Procedimento (passo a passo) | Prática específica |
|---|---|---|---|
| 0. Comece em 4 minutos | ideia do jogo em 3 frases | montagem, turno, 7 | erros mais caros |
| 1. Montar a ilha | terreno, encruzilhada, caminho, porto | montagem para principiantes | onde vai cada peça |
| 2. Produzir | todos produzem; frequência dos números | produção, ladrão bloqueia | qual número sai mais |
| 3. Trocar e construir | por que trocar; crescer contra pontuar | comércio; construção; regra da distância | pode ou não pode |
| 4. O 7 e as cartas | o 7 castiga acúmulo; o que há no monte | 7; cartas de desenvolvimento | sim ou não |
| 5. Corrida aos 10 | fontes de pontos; cartas que mudam de mão | pontos e fim; estrada interrompida | quantos pontos |

Decisões de carga: a montagem aleatória e a fase de fundação ficaram para as situações especiais, porque a primeira partida usa a montagem fixa; portos e cidades saíram da seção de 4 minutos; a Maior Estrada Comercial entrou só na etapa 5, porque no começo ninguém tem 5 estradas. Limite: um texto não observa o leitor nem ajusta o apoio a ele.

## 9. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/catan/tutorial.md`: ✅.
- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos`) no tutorial e no JSON: 0 aviso.
- Exclamações: 0.
- Conversor `tools/como_jogar_md.py` (`pagina`) rodado em memória, sem gravar: 12 seções, 7 respostas escondidas, 44 blocos.
- Extensão: cerca de 5.200 palavras de texto corrido, 6.050 contando números e citações de página. Dentro do alvo de 3.500 a 6.000 para o texto; o excesso na contagem bruta são as etiquetas de página.
- Legibilidade (Flesch adaptado): não medida. A implementação citada no prompt (`tools/discipulado/legibilidade.py`, de outro repositório) não está disponível nesta sessão.
