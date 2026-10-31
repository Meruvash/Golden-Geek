# Dossiê: Como Jogar Clank! Catacombs (piloto)

Entrega 1 do piloto da linha COMO JOGAR. Produzido em 31/10/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2. Nada daqui está publicado.

---

## 1. Escolha do jogo

**Decisão do editor (31/10/2026):** o jogo do piloto é *Clank! Catacombs*. A Etapa 1 do prompt (testar candidatos entre as resenhas do site) tinha começado com Azul, Cascadia, Sky Team e Colt Express e foi interrompida pelo editor com essa escolha.

O que foi apurado antes da troca, para registro:

| Candidato | Manual em português | Manual original | Observação |
|---|---|---|---|
| Azul | Achado: PDF da Galápagos (tradução de 2018, 6 páginas), via ComparaJogos | Achado: Next Move, jan. 2018, no site da editora | Melhor documentado. A resenha do site tem um erro de pontuação (ver Auditoria, seção 9) |
| Cascadia | Só a edição portuguesa (Salta da Caixa); a da Grok não foi achada | Não achado no site da Flatout | Sairia da lista pelo critério 1 |
| Sky Team | Não achado | Não procurado | Sairia da lista |
| Colt Express | Há um PDF no ComparaJogos, não aberto | Não procurado | Não avaliado |

Consequências da escolha, que o prompt pedia para registrar:

- **Não há edição brasileira confirmada.** O ComparaJogos lista só a Dire Wolf Digital como editora (consulta em 31/10/2026, https://www.comparajogos.com.br/item/clank-catacombs). A Ludopedia respondeu 403 para acesso automático e não foi contornada. Uma busca na web não achou lançamento nacional; um agregador lista a Devir entre as editoras, sem dizer de que país. O critério 1 do prompt ("sem o manual em português, o jogo sai da lista") foi afastado pela escolha do editor, e o tutorial foi escrito para quem tem a caixa em inglês.
- **Não há resenha de Clank! Catacombs no Elite.** O tutorial não tem página irmã para complementar.
- **Procura real.** No autocomplete do Google (31/10/2026), "como jogar clank" sugere "como jogar clank catacombs" em segundo lugar, e "clank catacombs" sugere "clank catacombs expansão", "clank catacombs ludopedia" e "clank catacombs covis e câmaras perdidas". A última é o nome em português da expansão *Lairs and Lost Chambers*, o que indica circulação do jogo no Brasil; não foi possível confirmar por quem.
- **Complexidade.** O jogo atende bem o critério 3: cinco recursos, oito ações, regras de movimento com quatro tipos de ícone, um sistema de risco (o saco do dragão) e uma pontuação com condição eliminatória. É mais longo de ensinar que Azul, e por isso o tutorial é maior.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual oficial** "CLANK! Catacombs Rulebook and Token Reference Guide", Dire Wolf Digital | PDF de 18 páginas, criado em 23/09/2022 (Adobe Acrobat 22.2); © 2022 Dire Wolf Digital, LLC | https://d19y2ttatozxjp.cloudfront.net/pdfs/CLANK_CATACOMBS_Rulebook_and_Token_Reference_Guide.pdf, linkado na página oficial https://www.direwolfdigital.com/clank-catacombs/ | Baixado em 31/10/2026 |
| Errata ou FAQ oficial | Nenhuma encontrada | Página oficial e busca na web | Lacuna |
| Manual em português | Inexistente ou não achado | Ver seção 1 | Lacuna |
| Fontes independentes e comunidade | Não usadas como fonte de regra | Buscas por dúvidas recorrentes não trouxeram nada específico | Ver seção 6 |

**Como o manual foi lido.** O PDF não tem camada de texto (`pdffonts` não lista nenhuma fonte; `pdftotext` devolve zero palavras) e a sessão não tem OCR. As 18 páginas foram renderizadas a 100 dpi e lidas como imagem; custos e efeitos de cartas foram conferidos em recortes a 300 dpi. Cada frase usada na base de regras foi transcrita em `notas_p.md`, no scratchpad da sessão, com a página. O PDF e as imagens ficam fora do repositório.

**Componentes cujo texto o manual não mostra.** O manual não traz o texto da carta Scramble nem o custo do Mercenary, e não diz quantas casas tem o medidor de vida nem o número impresso em cada casa da trilha de fúria (só um exemplo: a quinta casa mostra 4). O tutorial não usa nenhum desses valores.

## 3. Decisão de terminologia

Sem edição brasileira, o leitor tem nas mãos cartas e fichas em inglês. A regra adotada:

1. **O que está impresso nos componentes fica em inglês**, sempre igual: nomes de cartas (Burgle, Explore), fichas (Artifact, Mastery token), ícones de recurso (Skill, Swords, Boots) e a palavra Clank!.
2. **Áreas e conceitos ganham nome em português**, com o termo do manual entre parênteses só na primeira menção, e depois sempre o mesmo nome em português.

| No tutorial | No manual | Página | O que é |
|---|---|---|---|
| Clank! | Clank! | 6 | Barulho; cada Clank! vira um cubo seu na área de Clank! |
| área de Clank! | Clank! area | 5, 6 | Espaço do tabuleiro Clank! onde ficam os cubos de barulho |
| tabuleiro Clank! | Clank! board | 2, 4 | Tabuleiro com a área de Clank!, a trilha de fúria e os medidores de vida |
| trilha de fúria | Rage Track | 4, 12 | Diz quantos cubos saem do saco em cada ataque |
| marcador do dragão | Dragon Marker | 4, 8 | Peça que anda na trilha de fúria |
| saco do dragão | Dragon Bag | 4, 12 | Saco com cubos pretos e, durante o jogo, os seus cubos de barulho |
| cubos pretos | dragon cubes | 2, 12 | Os 24 cubos do dragão |
| cubos fantasma | Ghost cubes | 4, 12 | Os 5 cubos brancos |
| medidor de vida | Health Meter | 12 | Fileira de casas da sua cor no tabuleiro Clank! |
| banco | Bank | 4 | Estoque comum: ouro, Lockpicks, fichas, peças |
| reserva | Reserve | 5, 7 | Goblin e três pilhas: Mercenary, Explore, Secret Tome |
| fileira da masmorra | Dungeon Row | 5, 7 | As seis cartas abertas que podem ser compradas ou enfrentadas |
| baralho da masmorra | Dungeon Deck | 5 | As 100 cartas que abastecem a fileira |
| descarte da masmorra | Dungeon discard pile | 5, 7 | Pilha das cartas usadas e dos monstros vencidos |
| área de jogo | play area | 6 | Onde ficam as cartas que você jogou no turno |
| suprimento pessoal | personal supply | 5 | Seus cubos, ouro, Lockpicks e fichas |
| peça (de masmorra) | tile | 2, 9 | Peças quadradas que formam a masmorra |
| peça inicial | starting tile | 4 | Peça retangular com a Cripta |
| Cripta | Crypt | 10 | Ponto de partida e de fuga |
| Profundezas | Depths | 9, 14 | As 22 peças escuras e a metade de cima da peça inicial |
| sala | room | 7 | Espaço onde o peão para |
| túnel | tunnel | 7 | Ligação entre salas |
| Caverna de Cristal | Crystal Cave | 10 | Sala que deixa você exausto |
| Santuário (Wayshrine) | Wayshrine | 11 | Sala que você marca com um cubo para ganhar ouro |
| portal | Portal | 10 | Túnel que leva a qualquer outro portal |
| baú, biblioteca, prisão | Chest, Library, Prison | 8 | Recursos trancados de uma sala |
| segredo maior, segredo menor | major secret, minor secret | 8, 10, 18 | Fichas sorteadas |
| prisioneiro | Prisoner | 8, 17 | Fichas sorteadas nas prisões |
| ser nocauteado | knocked out | 12, 14 | Medidor de vida cheio |
| fugir | escape | 14 | Chegar à Cripta com um Artifact |

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[I]` interpretada (o manual é ambíguo; a leitura escolhida e o motivo estão ao lado), `[L]` lacuna (o manual não diz).

### 4.1 Objetivo e vitória

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | Dois objetivos: pegar um Artifact e fugir voltando à Cripta; somar mais pontos que os outros | p3 "During the game, you have two goals" | V | |
| R2 | A partida acaba quando todos fugiram ou foram nocauteados | p14 "A game ends when all players have either escaped or have been knocked out" | V | R40, R43 |
| R3 | Desempate: o Artifact mais valioso vence | p14 "the tied player with the most valuable Artifact is the winner" | V | |

### 4.2 Preparação (p4 e p5)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R4 | Marcador do dragão na casa da trilha de fúria que mostra o número de jogadores | p4 A | V |
| R5 | Separar as 28 peças pelo verso; embaralhar as 22 das Profundezas; das 6 restantes, devolver 2 sem olhar e pôr 4 em cima da pilha | p4 B | V |
| R6 | Banco: ouro e Lockpicks (ilimitados, substituir se faltar), 5 cubos fantasma, saco com 24 cubos pretos, 7 Artifacts empilhados com o de 5 em cima e o de 20 embaixo, segredos maiores, menores e prisioneiros embaralhados em pilhas separadas, mercado com 2 Backpacks, 2 Blood Amulets, 3 Burglar's Kits e 3 Crowns (a de 10 em cima, a de 8 embaixo) | p4 C | V |
| R7 | Peça inicial no centro, qualquer face; 3 Monkey Idols no Monkey Shrine; um Mastery token por jogador perto da Cripta | p4 D | V |
| R8 | Reserva: Goblin e pilhas de Mercenary, Explore, Secret Tome. Embaralhar o baralho da masmorra, abrir 6 cartas; trocar as que têm o símbolo de ataque do dragão na borda direita até haver 6 sem o símbolo; devolver as trocadas e embaralhar | p5 E | V |
| R9 | Cada jogador: 30 cubos da cor, peão na Cripta, 3 Lockpicks, baralho de 10 (6 Burgle, 2 Stumble, 1 Sidestep, 1 Scramble), embaralha e compra 5 | p5 F, G; p2 | V |
| R10 | O primeiro jogador põe 3 Clank! na área; o segundo, 2; o terceiro, 1; o quarto, 0. Sentido horário | p5 H | V |
| R11 | Cartas com Arrive na fileira no começo da partida têm o efeito resolvido antes do primeiro turno | p11 Arrive | V |

### 4.3 Turno, recursos e cartas

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R12 | Turno começa com 5 cartas; é obrigatório jogar todas, em qualquer ordem; ficam na área de jogo até o fim do turno | p6 | V |
| R13 | Cada ação pode ser feita quantas vezes quiser, se houver recurso; ações podem ser intercaladas com as cartas | p6 | V |
| R14 | Skill compra cartas e usa Devices; Swords enfrentam monstros (e às vezes servem no movimento); Boots movem | p6 | V |
| R15 | Recursos se somam e podem ser divididos; o que sobrar no fim do turno se perde | p6 | V |
| R16 | Ouro: vem do banco; vale 1 ponto no fim; pode ser gasto no mercado | p6 | V |
| R17 | Clank!: pôr cubos do seu suprimento na área de Clank!; com o suprimento vazio, não põe. Clank! negativo tira cubos seus da área, inclusive os postos depois no mesmo turno; sobra negativa se perde no fim do turno | p6 | V |
| R18 | Compra de carta vem do seu baralho; sem cartas, embaralha o descarte (sem a área de jogo) | p6 | V |
| R19 | O efeito de uma carta vale independentemente da ordem em que as cartas foram jogadas | p6 | V |
| R20 | Descartar: só cartas na mão ainda não jogadas; sem o efeito normal; se o descarte é o preço de algo, é preciso descartar de fato | p11 | V |
| R21 | Trash: tira a carta do jogo, vai para a caixa | p11 | V |
| R22 | Acquire: o texto vale uma vez, na hora da compra na fileira | p11 | V |
| R23 | Danger: cada carta Danger na fileira faz sair 1 cubo a mais em cada ataque | p11 | V |
| R24 | Teleporte: sem Boots, ignora ícones do túnel, pode ir contra a seta, pode sair da borda e descobrir peça; não tira a exaustão da Caverna de Cristal | p11 | V |
| R25 | "Cada jogador": quando a ordem importa, começa por quem está jogando (ou terminando) o turno, sentido horário; ignora quem fugiu ou foi nocauteado | p11 | V |

### 4.4 Ações

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R26 | Comprar carta: Skill no custo (canto inferior direito); faixa azul na fileira, faixa amarela na reserva; vai para o seu descarte; não repor a fileira na hora; reserva pode acabar | p7 | V |
| R27 | Usar Device (faixa roxa): paga Skill, faz o USE na hora, a carta vai para o descarte da masmorra; não repor na hora | p7 | V |
| R28 | Enfrentar monstro (faixa vermelha): Swords no canto inferior direito; ganha o DEFEAT; carta vai para o descarte da masmorra; não repor na hora | p7 | V |
| R29 | Goblin da reserva: não é descartado; pode ser enfrentado várias vezes por turno, com recompensa a cada vez | p7 | V |
| R30 | Movimento: todo túnel custa ao menos 1 Boot; pegadas custam 2; cada ícone de monstro dá 1 dano, e cada Sword gasto evita 1 (gastar é opcional); cadeado exige um Lockpick do suprimento, que fica no túnel e o destranca para todos até o fim; dois cadeados no mesmo túnel pedem um Lockpick cada; túnel em seta só no sentido da seta | p7 | V |
| R31 | Mercado: numa sala de mercado, cada item custa 7 de ouro, pago ao banco; pode comprar várias vezes e repetir item | p8 | V |
| R32 | Pegar Artifact: numa sala com Artifact, a qualquer momento do turno, sem obrigação; não pode se já tem um; ao pegar, o marcador do dragão sobe 1 casa | p8 | V |
| R33 | Backpack: permite carregar um Artifact a mais | p18 | V |
| R34 | Baú, biblioteca, prisão: gastar 1 Lockpick, que cobre o recurso para sempre. Baú: segredo maior sorteado e revelado. Biblioteca: Secret Tome da reserva no descarte, sem Skill. Prisão: 2 prisioneiros sorteados, abertos no suprimento (ou o último, se só restar 1). Proibido gastar o Lockpick se não houver o que pegar | p8 | V |
| R35 | Santuário: ação especial; um cubo do suprimento num espaço vazio; ganha 1 ouro por Santuário marcado na partida (1, 2, 3...); não marca o mesmo duas vezes; precisa ter cubo; o cubo nunca vira Clank! | p11 | V |

### 4.5 Masmorra e salas

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R36 | Descobrir peça: túnel que chega à borda sem peça vizinha; pega a peça de cima, revela, põe junto à peça que está deixando; pode girar; nunca empilhar; precisa encostar um lado inteiro em outra peça (exceto nos lados longos da peça inicial, alinhando com a metade de cima ou de baixo); a peça completa o túnel e pode acrescentar ícones; sem Boots ou Lockpicks para os ícones, escolha outra orientação; pode parar o movimento para buscar ajuda (comprar, usar Device, enfrentar monstro) | p9 | V |
| R37 | Sem peças na pilha, ninguém mais sai da borda | p9 | V |
| R38 | As 4 primeiras peças descobertas são seguras; as 22 escuras e a metade de cima da peça inicial são as Profundezas | p9, p14 | V |
| R39 | Sala de Artifact: ao pôr a peça, o Artifact de cima da pilha vai para a sala; com 1 ou 2 "+", o Artifact 1 ou 2 abaixo do topo; sem Artifacts, nada; "+" demais, o mais valioso que restar | p10 | V |
| R40 | Cripta: não se volta de mãos vazias; é preciso ter um Artifact | p10 | V |
| R41 | Caverna de Cristal: ao entrar, você fica exausto e não gasta mais Boots no turno; teleporte ainda funciona; a exaustão continua | p10 | V |
| R42 | Peça assombrada (4 das 22): ao entrar na masmorra, um cubo fantasma do banco vai para a área de Clank! | p10 | V |
| R43 | Portal: não se para nele; sai por qualquer outro portal; o percurso inteiro custa 1 Boot; os ícones dos túneis ligados valem; depois pode continuar com mais Boots | p10 | V |
| R44 | Recompensas de sala (segredo menor, Monkey Idol, ouro, cura): ao entrar; uma vez por turno por sala; é preciso sair e voltar em outro turno; salas diferentes do mesmo tipo valem no mesmo turno | p10, p11 | V |
| R45 | Monkey Idol: 5 pontos; não é Artifact | p10, p18 | V |

### 4.6 Fim do turno, dragão e vida

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R46 | Fim do turno, em ordem: (1) área de jogo para o descarte, aberto, e comprar 5; (2) completar a fileira até 6; (3) ataque, se alguma carta nova tiver o símbolo | p12 | V |
| R47 | Um só ataque, mesmo com vários símbolos; só símbolos novos atacam | p12 | V |
| R48 | Arrive: resolve quando a carta aparece, antes do ataque | p11 | V |
| R49 | Ataque: todos os cubos da área de Clank! vão para o saco; tirar tantos cubos quanto o número da casa do marcador (mais 1 por Danger); preto vai para o banco; colorido é 1 dano para o dono; os não sorteados ficam no saco | p12, p11 | V |
| R50 | Fantasma sorteado: todos os jogadores tomam 1 dano; no fim do ataque, os fantasmas voltam para a área de Clank!; sem cubos no suprimento, usa um preto separado no banco | p12 | V |
| R51 | A fúria sobe 1 casa com cada Artifact pego e com alguns segredos e prisioneiros (Dragon Egg, Adventurer) | p12, p17, p18 | V |
| R52 | Fim imediato, todos nocauteados: baralho da masmorra sem cartas para completar a fileira, ou saco vazio depois de um ataque | p12 | V |
| R53 | Dano: cubos no medidor, da esquerda para a direita. No ataque, os cubos sorteados; fora dele, cubos do suprimento | p12 | V |
| R54 | Não se toma dano voluntário (por exemplo, passar por monstro sem Sword) sem cubos no suprimento, ou se isso encheria o medidor | p12 | V |
| R55 | Curar: devolver um cubo do medidor ao suprimento | p12 | V |
| R56 | Medidor cheio: nocauteado | p12 | V |

### 4.7 Fim de partida e pontos

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R57 | Fugir: chegar à Cripta com Artifact; termina o turno; antes de completar a fileira, tira o peão; pega um Mastery token (20 pontos) | p14 | V |
| R58 | Nocauteado: peão deitado; sem Artifact ou nas Profundezas, 0 pontos | p14 | V |
| R59 | Quem fugiu ou foi nocauteado não joga turnos, não faz Clank!, não é afetado por cartas de "todos", não toma dano | p14 | V |
| R60 | No turno dessa pessoa: cubos da área de Clank! para o saco; tira exatamente 4 (6 com 2 jogadores), ignorando trilha e Danger; dano como num ataque | p14 | V |
| R61 | Pontos: Artifact; outras fichas (inclusive Mastery token); ouro; pontos das cartas do baralho, mão e descarte (canto superior direito) | p14 | V |
| R62 | Com Backpack e dois Artifacts, os dois contam? | p14 diz "The value of their Artifact"; p18 diz que o Backpack permite carregar outro | L | R33 |
| R63 | Ficha de valor de ouro (Treasure, Greater Treasure) conta como ouro; pode guardar até o fim | p18 | V |

### 4.8 Fora do escopo

A página 15 trata da mistura com a expansão *Adventuring Party* (5 e 6 jogadores). O tutorial a menciona numa linha e não ensina.

## 5. Divergências

Não houve confronto entre edições: só existe a fonte oficial em inglês. Duas ambiguidades internas:

- **R62 (Backpack e segundo Artifact na pontuação).** O manual não diz. O tutorial avisa a lacuna e não afirma.
- **R30 e R54 (monstro sem Sword).** A p7 diz que gastar Sword é opcional; a p12 proíbe o dano voluntário quando ele encheria o medidor ou sem cubos no suprimento. As duas se encaixam: você pode escolher tomar o dano, salvo nesses dois casos. Classificação `[I]` só para a leitura conjunta.

## 6. Dúvidas recorrentes

Nenhuma fonte independente trouxe uma lista confiável de erros comuns para este jogo (buscas registradas na Auditoria). A seção "Situações especiais" do tutorial foi montada com os pontos que o próprio manual destaca: os quadros "CLANK!" para quem conhece o jogo original (p3, p5, p7, p8, p11, p12, p14) e as regras que ele põe em negrito. São o melhor indício disponível do que os autores esperam que seja jogado errado, mas não substituem a observação de jogadores.

## 7. Plano instrucional (4C/ID)

O 4C/ID foi pensado para cursos com tarefas reais e apoio que vai sendo retirado. Num texto, o leitor não é observado e o apoio não se adapta a ele. O que dá para fazer é ordenar as tarefas e graduar o apoio dentro de cada classe.

**Classes de tarefa** (da mais simples à partida inteira):

1. **Montar a mesa.** Apoio: lista numerada que se confere na mesa. Sem variação: é procedimento.
2. **Jogar um turno de abertura.** Só cartas iniciais, reserva e um túnel comum. Exemplo resolvido (Ana), depois tarefa para completar (Bruno), com a resposta adiante.
3. **Fechar o turno e sobreviver ao dragão.** Exemplo resolvido de ataque; tarefa: dizer quem toma quanto dano num sorteio dado.
4. **Atravessar a masmorra.** Túneis com ícones, peça nova, recompensas, recursos trancados. Exemplo resolvido com escolha (gastar Swords no túnel ou no Goblin); tarefa sem apoio na seção de verificação.
5. **Pegar o Artifact, fugir e contar pontos.** Exemplo resolvido de pontuação com três destinos (fuga, nocaute nas Profundezas, nocaute fora delas); tarefa de pontuação sem apoio.

**Informação de apoio** (o porquê), antes da classe que precisa dela: a tensão do jogo (barulho vira risco no saco; a fúria só sobe), por que o baralho melhora (deck-building explicado sem jargão), por que as Profundezas são uma aposta.

**Informação procedural**, no ponto de uso: preparação na classe 1; custos e ícones na classe 2 e 4; a ordem do fim do turno na classe 3. Tudo repetido na referência rápida.

**Prática específica.** Três pontos onde o erro custa caro e a repetição ajuda: (a) somar recursos e fazer Clank! negativo; (b) resolver um ataque do dragão; (c) a condição eliminatória da pontuação. As perguntas da seção "Verifique se aprendeu" cobrem os três.

**Decisões para reduzir a carga cognitiva:**

- O tutorial começa pela promessa do jogo (entrar, roubar, sair) e só depois apresenta os componentes, agrupados pela função.
- Portais, Santuários, cubos fantasma, Danger, Arrive e Devices ficam para depois do primeiro turno resolvido. Nenhum deles é necessário no turno de abertura.
- As 18 fichas da folha de referência não são listadas: o leitor aprende que existem, onde estão descritas e três exemplos.
- Termos ingleses que aparecem nas cartas (Skill, Swords, Boots) são mantidos, para que o leitor reconheça o ícone na carta; zonas da mesa ganham nome em português.

## 8. Portões automáticos

Resultado na Auditoria, seção 3.
