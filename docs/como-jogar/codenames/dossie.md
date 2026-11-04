# Dossiê: Como Jogar Código Secreto

Entrega 1 da linha COMO JOGAR para *Código Secreto* (Codenames, Czech Games Edition; no Brasil, Devir). Produzido em 04/11/2026 (rotina diária) seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e os ajustes do pedido: jogo leve, 3 etapas, alvo de 3.500 a 4.500 palavras, figuras em `como-jogar/codenames/figuras/`, sem criar `como-jogar/codenames/fotos` (o jogo tem resenha, e o gerador reaproveita `codenames/fotos/`).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. O que sustenta a escolha:

- **Manual brasileiro acessível:** sim, no site da Devir (seção 2).
- **Resenha no Elite:** sim, pasta `codenames/` e `conteudo/codenames.json`, usada só como mapa de dúvidas. Existe também a resenha de Código Secreto Imagens (`codenames-pictures/`); o tutorial não a cita, porque nenhuma regra dela foi conferida.
- **Complexidade:** baixa (peso BGG 1,25 segundo a resenha), mas com três pontos que pedem ensino cuidadoso: o limite de toques (número mais um), as consequências diferentes de cada erro e o que conta como pista válida. Por isso três etapas.
- **Procura real (04/11/2026, `suggestqueries.google.com`):** Google, "como jogar codigo secreto": "como jogar codigo secreto", "como jogar codigo secreto paki toys", "como jogar codigo secreto imagens". YouTube: "como jogar codigo secreto", "... imagens", "... dueto". Google, "como jogar codenames": "como jogar codenames", "... online", "... duet", "... com amigos", "... em portugues", "... online com amigos", "... de 2", "... no discord", "... duo", "... no celular". A busca existe nos dois nomes; a pergunta "de 2" é atendida pela variante de dois jogadores nas Situações especiais.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro** (capa: *Codinomes*, com os balões "Código Secreto" e "Jogo de Palavras"), Devir | PDF de 5 folhas: capa (p. 1), três folhas duplas (p. 2 e 3, 4 e 5, 6 e 7) e contracapa (p. 8). © Czech Games Edition, "Julio 2015". Tradução: Rodrigo Sponchiado Uemura e Marcelo Fernandes. Criado em 03/08/2016 (InDesign CC 2015), modificado em 31/05/2021 (iLovePDF). 9.716.459 bytes | https://devir.com.br/wp-content/uploads/2016/06/Código-Secreto-manual-de-regras.pdf, link "Baixe aqui o Manual de Regras" em https://devir.com.br/codigo-secreto/ | Baixado em 04/11/2026, 19h40 UTC |
| **Página do produto** Código Secreto, Devir | Publicada em 27/06/2016 | https://devir.com.br/codigo-secreto/ | 04/11/2026. Dá "Jogadores: 2 a 8", "Idade: acima de 10 anos", "Duração: 15 minutos" |
| Artigo "Devir 25 anos de jogos: Código Secreto" | 04/04/2025 | https://devir.com.br/devir-25-anos-de-jogos-codigo-secreto-a-grandeza-de-uma-ideia-simples/ | 04/11/2026. Confirma que Codenames sai no Brasil como Código Secreto. Não usado para regra |
| **Vídeo de regras** "DEVIR BRASIL I Código Secreto - regras rápidas", canal Devir TV Brasil | ID 3nkyoWDRfrU | Busca do canal @DevirBrasil; título e canal confirmados pelo oEmbed oficial | 04/11/2026. Não usado como fonte de regra |
| Manual original em inglês (CGE) | Não obtido | Ver abaixo | Lacuna |
| FAQ ou errata oficial | Nenhuma encontrada | Página da Devir | Lacuna |

**Como o manual foi obtido.** Acesso direto, com User-Agent que identifica o robô do portal (`EliteBoardgamersBot/1.0`). O `robots.txt` da Devir proíbe `/wp-content/` em geral, mas tem `Allow: /wp-content/uploads/`, que é onde está o PDF. Nenhum bloqueio foi contornado.

**Por que não há manual em inglês.** A página do jogo na CGE (https://www.czechgames.com/games/codenames/) carrega a lista de regras por um componente que consulta `filemanager.czechgames.com/api/v1/files/codenames/rules` com um token embutido na própria página. A chamada a esse endereço foi recusada pelo sistema de permissões da sessão, e a tentativa não foi repetida nem contornada. Como o manual brasileiro estava disponível e é a fonte de nível 1, o tutorial segue com ele; os dois pontos em que o original ajudaria estão marcados como `[interpretada]` (seção 5).

**Como o manual foi lido.** O PDF tem camada de texto; foi extraído com `pdftotext` (com e sem `-layout`), folha a folha, e lido inteiro. As folhas foram renderizadas a 110 e 220 dpi para ler as ilustrações: a grade de exemplo e a carta chave da p. 2, as luzes da equipe inicial e as cartas da p. 3, a tabela de resultados da p. 8. Arquivos no scratchpad: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/codenames/manual/` (`codigo-secreto-manual.pdf`, `manual.txt`, `p2.txt` a `p5.txt` por folha de PDF).

**Paginação.** O tutorial cita os números impressos no rodapé (2 a 7) e a contracapa como p. 8 (sem número impresso; é a última página, que o manual chama de "última página" na p. 2). Correspondência: folha 2 do PDF = p. 2 e 3; folha 3 = p. 4 e 5; folha 4 = p. 6 e 7; folha 5 = p. 8.

**Dados do topo (JSON).** Jogadores, idade e duração vêm da página do produto da Devir: 2 a 8 jogadores, 10+, 15 minutos. O manual diz que o jogo padrão pede pelo menos 4, com variantes para 2 e 3 (p. 2 e 8); o tutorial diz isso logo na montagem. Gênero ("Palavras · Festa em equipes") é descrição nossa, sustentada pela p. 2 e 3 (duas equipes, pistas de uma palavra).

## 3. Glossário (edição brasileira)

| No tutorial (= manual BR) | Original (não conferido no PDF; nomes da caixa CGE) | Página | O que é |
|---|---|---|---|
| espião mestre | spymaster | 2 a 5 | O jogador de cada equipe que vê a carta chave e dá as pistas |
| agentes de campo | field operatives | 2 a 5 | Os outros jogadores da equipe, que tocam as palavras |
| codinome / carta de codinome | codename | 2, 5 | Carta com uma palavra; 25 formam a grade |
| grade de 5 × 5 (no tutorial, "grade de 5 por 5") | grid | 2 | As 25 cartas na mesa |
| carta chave | key card | 2, 3 | Carta com o mapa secreto da grade |
| apoio | card stand | 2 | Suporte entre os espiões mestres |
| luzes (nas bordas da carta chave) | lights | 3, 4 | Indicam a equipe inicial |
| equipe inicial | starting team | 3 | A que joga primeiro e tem 9 palavras |
| Equipe Vermelha / Equipe Azul | red team / blue team | 2 a 4 | As duas equipes |
| carta de agente (vermelho, azul) | agent card | 3, 4 | Cobre as palavras das equipes |
| agente duplo | double agent | 3 | Carta de duas faces que vai para a equipe inicial |
| civil inocente / carta de civil inocente | innocent bystander | 2 a 4 | 7 cartas; tocar um encerra o turno |
| assassino | assassin | 2 a 5 | 1 carta; tocar perde a partida |
| pista | clue | 4 a 7 | Uma palavra e um número |
| tocar (a palavra) | touch | 4 | A escolha oficial |
| cobrir | cover | 4, 5 | Pôr a carta de identidade sobre a palavra |
| tentativa / adivinhar | guess | 4, 5 | Cada toque |
| pista inválida | invalid clue | 5 | Pista que viola as regras |
| regras rigorosas / regras flexíveis | strict / flexible rules | 6, 7 | As duas listas de critérios de pista |
| pistas para especialistas: zero / ilimitada | expert clues: zero / unlimited | 7 | Pista com 0 ou com "ilimitado" |
| ampulheta | timer (sand timer) | 5 | Limite de tempo opcional |

O manual usa "contactar" para tocar o assassino ou encontrar as palavras (p. 2, 3, 5). O tutorial usa "tocar" e "encontrar", que são os verbos das regras de toque (p. 4), para não introduzir um termo a mais. Na p. 4 o manual diz "Você está jogando Codinomes", e a capa traz *Codinomes*; o tutorial chama o jogo de Código Secreto, nome da caixa à venda e da página da Devir, e explica a diferença no parágrafo de abertura.

## 4. Base de regras

Marcação: `[BR p. N]` com frase curta lida no manual; classificação; dependências.

**Preparação**

| # | Regra | Fonte e frase | Class. | Depende de |
|---|---|---|---|---|
| P1 | Duas equipes de tamanho e habilidade similares; pelo menos 4 jogadores no jogo padrão | [BR p. 2] "pelo menos 4 jogadores (duas equipes de dois)" | verificada | |
| P2 | Cada equipe escolhe um espião mestre; os dois sentam do mesmo lado; os outros, de frente, são agentes de campo | [BR p. 2] "Os dois espiões mestres sentam-se do mesmo lado da mesa" | verificada | P1 |
| P3 | 25 codinomes ao acaso em grade 5 × 5 | [BR p. 2] "Escolha aleatoriamente 25 codinomes" | verificada | |
| P4 | Ao embaralhar, virar metade do baralho de vez em quando | [BR p. 2] "faça questão de virar metade do baralho" | verificada | P3 |
| P5 | Espiões mestres escolhem ao acaso a carta chave e a põem no apoio; qualquer lado para cima; agentes de campo não a veem | [BR p. 2] "Qualquer lado pode ficar para cima" | verificada | P2 |
| P6 | A chave corresponde à grade: azul, vermelho, sem cor (civil), preto (assassino) | [BR p. 2] "o quadrado preto é um assassino" | verificada | P5 |
| P7 | As 4 luzes nas bordas indicam a equipe inicial; ela tem 9 palavras, a outra 8; ela dá a primeira pista | [BR p. 3] "A equipe inicial tem 9 palavras para adivinhar" | verificada | P5 |
| P8 | 8 agentes vermelhos e 8 azuis; cada pilha na frente do seu espião mestre | [BR p. 3] "As cartas de agente vermelho ficam numa pilha em frente ao espião mestre vermelho" | verificada | P2 |
| P9 | Agente duplo vira para a cor da equipe inicial e é uma das cartas de agente dela | [BR p. 3] "Vire-a conforme a cor da equipe inicial" | verificada | P7, P8 |
| P10 | 7 civis inocentes e 1 assassino entre os jogadores, ao alcance dos dois espiões mestres | [BR p. 3] "num lugar onde os dois espiões mestres podem facilmente alcançá-las" | verificada | |

**Turno**

| # | Regra | Fonte e frase | Class. | Depende de |
|---|---|---|---|---|
| T1 | Equipes revezam turnos; a inicial começa | [BR p. 4] "As equipes revezam os turnos" | verificada | P7 |
| T2 | O espião mestre diz uma pista de uma palavra que se relaciona a palavras da equipe, e um número de quantos codinomes se relacionam | [BR p. 4] "Você também pode dizer um número" | **interpretada**: o número é ensinado como sempre dito (ver 5.1) | T1 |
| T3 | Pista de uma palavra só; sem pistas extras | [BR p. 4] "A sua pista deve ser apenas uma palavra" | verificada | T2 |
| T4 | Pista não pode ser codinome visível; coberto deixa de impedir | [BR p. 4] "uma pista não permitida pode se tornar permitida mais tarde" | verificada | T2 |
| T5 | Agentes de campo discutem; espião mestre sério; escolha oficial é tocar | [BR p. 4] "apontam sua escolha oficial quando um deles toca" | verificada | T2 |
| T6 | Palavra da equipe: coberta com agente da cor; pode adivinhar outra, sem nova pista | [BR p. 4] "A equipe pode adivinhar outra palavra (mas não pode ter outra pista.)" | verificada | T5 |
| T7 | Civil inocente: coberto com civil; fim do turno | [BR p. 4] "Isso termina o turno" | verificada | T5 |
| T8 | Palavra da outra equipe: coberta com agente da outra equipe; fim do turno | [BR p. 4] "a palavra é coberta por uma das cartas de agente da outra equipe" | verificada | T5 |
| T9 | Assassino: coberto pela carta do assassino; fim do jogo; a equipe que tocou perde | [BR p. 4] "A equipe que contactou o assassino perde" | verificada | T5 |
| T10 | Antes de dar a pista, conferir que ela não se relaciona com o assassino | [BR p. 4] "tenha certeza de que ela não se relaciona com o assassino" | verificada (conselho do manual, dito como aviso) | T9 |
| T11 | Sempre tentar ao menos uma vez | [BR p. 4] "devem sempre tentar adivinhar uma vez" | verificada | T5 |
| T12 | Pode parar a qualquer momento | [BR p. 4] "Você pode parar de adivinhar a qualquer momento" | verificada (o tutorial diz "depois do primeiro toque", por T11) | T11 |
| T13 | Máximo: número mais uma tentativa extra | [BR p. 5] "Você pode ter apenas uma tentativa extra"; "até 4 tentativas porque seu espião mestre disse o número 3" | verificada | T2 |
| T14 | Turno acaba quando param, erram (ou esgotam) | [BR p. 5] "Quando os agentes de campo dizem que não querem mais adivinhar (ou quando adivinham errado)" | verificada; "esgotam" decorre de T13 | T12, T13 |
| T15 | Quem cobre é o espião mestre da equipe que tocou, consultando a chave | [BR p. 5] "Quando um colega de equipe toca numa palavra, consulte a carta chave e cubra" | verificada | T5 |
| T16 | Cara séria; não tocar cartas enquanto pensam; agir como se o acerto fosse a palavra pretendida | [BR p. 5] "deve agir como se fosse exatamente a palavra que queria" | verificada | T15 |
| T17 | Agentes de campo olham a mesa, não o espião mestre | [BR p. 5] "Não mantenha contato visual com o espião mestre" | verificada | |
| T18 | Ampulheta: qualquer jogador vira para apressar o lento; pode usá-la em si mesmo e dar pista para uma palavra | [BR p. 5] "qualquer jogador pode virar a ampulheta" | verificada | |

**Fim**

| # | Regra | Fonte e frase | Class. | Depende de |
|---|---|---|---|---|
| F1 | Termina quando uma equipe tem todas as palavras cobertas; ela vence | [BR p. 5] "O jogo termina quando uma equipe tiver todas suas palavras cobertas" | verificada | T6, T8 |
| F2 | É possível vencer no turno da outra equipe | [BR p. 5] "É possível vencer no turno da outra equipe se eles adivinharem a sua última palavra" | verificada | F1 |
| F3 | Assassino encerra mais cedo; a equipe dele perde | [BR p. 5] "O jogo pode acabar mais cedo" | verificada | T9 |
| F4 | Próxima partida: tirar coberturas, devolver às pilhas, virar 25 codinomes | [BR p. 5] "Retire as cartas que estão cobrindo os codinomes" | verificada | |
| F5 | Empate | O manual não fala; pela estrutura (uma equipe cobre tudo ou alguém toca o assassino), não há empate | lacuna, não afirmada no tutorial | |

**Pistas**

| # | Regra | Fonte e frase | Class. | Depende de |
|---|---|---|---|---|
| V1 | Pista inválida: turno acaba; espião mestre adversário pode cobrir uma palavra da própria equipe antes da próxima pista; se ninguém notar, vale | [BR p. 5] "Mas se ninguém perceber que a pista é inválida, ela conta como válida" | verificada | T2 |
| V2 | Sobre significado; não letras nem posição | [BR p. 6] "Sua pista deve ser sobre o significado das palavras" | verificada | |
| V3 | Letras e números valem se referirem a significados | [BR p. 6] "Letras e números são pistas válidas, desde que se referirem a significados" | verificada | V2 |
| V4 | O número dito após a pista não pode ser pista | [BR p. 6] "Cítrico: 8 não é uma pista válida" | verificada | T2 |
| V5 | Em português; estrangeira só se usada numa frase em português | [BR p. 6] "Você deve jogar em português" | verificada | |
| V6 | Nenhuma forma de palavra visível | [BR p. 6] "Você não pode usar qualquer forma de uma palavra visível na mesa" | verificada | T4 |
| V7 | Nenhuma parte de palavra composta visível | [BR p. 6] "contra, golpe, ou contrabando" | verificada | T4 |
| V8 | Mesmo som e grafia diferente: palavras diferentes; mesma grafia: iguais; acento distingue | [BR p. 6] "Palavras que são grafadas da mesma maneira são consideradas iguais" | verificada | |
| V9 | Soletrar é permitido; obrigatório se pedirem | [BR p. 6] "Você deverá soletrar sua pista se alguém pedir" | verificada | |
| V10 | Não seja muito rigoroso; se o adversário deixar, vale; na dúvida, perguntar em voz baixa | [BR p. 6] "Se o espião mestre oponente deixar, a pista é válida" | verificada | |
| V11 | Flexíveis: siglas (laser, radar, sonar sempre valem) | [BR p. 7] "palavras como laser, radar e sonar são permitidas" | verificada | |
| V12 | Flexíveis: compostas; nunca inventar | [BR p. 7] "em nenhum momento será permitido inventar palavras compostas" | verificada | |
| V13 | Flexíveis: homônimos liberais | [BR p. 7] "Você pode permitir o uso de sela como pista para coisas relacionadas a cela" | verificada | V8 |
| V14 | Rimas válidas quando se referem a significados; rima livre por combinação, sem avisar | [BR p. 7] "não poderá indicar que está fazendo uma rima" | verificada | |
| V15 | Nomes próprios valem; especificar quando ambíguo; vários termos por combinação; lugares como Nova York; nunca inventar | [BR p. 7] "Espiões mestres não poderão inventar nomes" | verificada | |
| V16 | Zero: nenhuma palavra nossa; sem limite; ao menos um toque | [BR p. 7] "Eles ainda devem adivinhar ao menos uma palavra" | verificada | T13 |
| V17 | Ilimitado: no lugar do número; toques à vontade | [BR p. 7] "você pode dizer ilimitado em vez de um número" | verificada; "pelo menos um toque" com ilimitado vem de T11 | T13, T11 |

**Variantes**

| # | Regra | Fonte e frase | Class. | Depende de |
|---|---|---|---|---|
| X1 | Dois jogadores: mesma equipe contra oponente simulado; um espião mestre; a pilha adversária fica na mesa; escolher chave em que sua equipe é a inicial | [BR p. 8] "Faça questão de pegar uma carta chave que lhe aponte como a equipe inicial" | verificada (no texto extraído a frase é cortada pela tabela da página; lida inteira na página renderizada) | |
| X2 | A cada turno do oponente simulado, o espião mestre cobre 1 palavra, à escolha dele | [BR p. 8] "cobrir 1 de suas palavras toda a vez que conseguem um turno" | **interpretada** ("suas" = do oponente; ver 5.2) | X1 |
| X3 | Perde se tocar o assassino ou se todos os agentes inimigos forem contatados; vencendo, resultado = cartas restantes na pilha inimiga (tabela de 1 a 8) | [BR p. 8] "a pontuação é feita conforme o número de cartas de agente que restaram na pilha do inimigo" | verificada (os títulos de cada valor não são reproduzidos) | X2 |
| X4 | Três jogadores: como dois, ou dois espiões mestres e um agente de campo para os dois lados | [BR p. 8] "o único agente de campo está trabalhando para os dois lados" | verificada | |

## 5. Interpretações e diferenças de edição

**5.1 O número é opcional?** A p. 4 diz "Você também pode dizer um número". Todo o resto do manual pressupõe o número: o limite de toques (p. 5), os exemplos (*árvore: 2*, *rio: 3*), a pista 0 e a ilimitada como alternativas ao número (p. 7). O tutorial ensina a dizer sempre o número e explica a frase num bloco `[!edicao]`. Sem o manual em inglês, não foi possível conferir se a tradução suavizou uma obrigação.

**5.2 "Cobrir 1 de suas palavras" (p. 8).** Lido como as palavras da equipe simulada. Motivos: a derrota vem quando "todos os agentes inimigos forem contactados", o resultado é contado na pilha do inimigo, e o aviso diz que o resultado depende de "quantos turnos precisou". Explicado num `[!edicao]`.

**5.3 Nome do jogo.** Capa do manual: *Codinomes*; texto da p. 4: "Você está jogando Codinomes"; caixa e página da Devir: *Código Secreto*. Dito na abertura e num `[!edicao]`.

**5.4 Reedições.** A resenha do portal cita uma "2ª edição em português" (BGG) e lojas com "Nova Edição". O único manual público da Devir é o de 2016 aqui usado. O tutorial avisa que não conferiu o manual de reimpressões mais novas.

## 6. Plano instrucional

**Classes de tarefa**, da mais simples para a mais completa, cada uma com exemplo resolvido, tarefa para completar e tarefa sem apoio:

1. **Comece em 4 minutos:** montar e jogar o primeiro turno (P1 a P10, T1 a T9, T11 a T13, F1 a F3 em uma linha).
2. **Etapa 1, montar a mesa:** informação de apoio sobre a função da chave e de cada carta; procedimento P1 a P10; figuras do manual.
3. **Etapa 2, jogar o turno:** apoio sobre o duplo papel do número (indicar e limitar) e a tentativa extra; procedimento T1 a T15; regras adicionais (`[!mais]`) para F2, T16 a T18; prática específica nas consequências de cada toque, onde o erro é comum.
4. **Etapa 3, julgar uma pista:** apoio sobre o princípio "só palavra e número" (p. 5); procedimento V2 a V9; `[!mais]` para V1, V10 a V17; prática específica de "vale ou não vale".

Situações especiais: X1 a X4 e F4. Adiado do primeiro turno para as etapas: critérios de pista (etapa 3), cara séria e ampulheta (etapa 2), variantes.

**Limite:** um texto não observa o leitor nem ajusta o apoio a ele.

**Exemplos.** Os exemplos resolvidos e as tarefas usam a grade e a carta chave da ilustração da p. 2 do manual, lidas na figura renderizada e conferidas em script: 9 vermelhas (DANÇA, LEÃO, MÃO, NINJA, PAREDE, TACO, WASHINGTON, MARFIM, CAVALEIRO), 8 azuis (ANEL, CAMA, EMBAIXADA, HOLLYWOOD, PRAIA, REI, ARRANHA-CÉU, JATO), 7 civis (BANCO, BOCA, DRAGÃO, GARRA, SATÉLITE, TRONCO, ALGODÃO) e o assassino (FAIXA), luzes vermelhas. As pistas (*África*, *alto*, *espada*, *oriental*, *prédio*) são nossas e nenhuma é palavra visível. Exemplos de validade de pista com palavras fora da grade (LIMÃO, POLVO, BOLA, ALGODÃO e HOTEL, *strudel*) são os do próprio manual (p. 6), parafraseados. Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/codenames/scripts/exemplos.py`.

## 7. Portões automáticos (04/11/2026)

- `python3 tools/checar_comece.py docs/como-jogar/codenames/tutorial.md`: passa ("seção Comece a jogar dentro da diretriz").
- Travessão e meia-risca (busca por U+2014 e U+2013 em Python): zero. Um `grep` com classe de caracteres acusou falso positivo na linha de ÓPERA por causa do locale; a busca por código confirmou zero.
- `tools/vicios.py` (lista `VICIOS` aplicada ao texto inteiro): zero aviso. Exclamação: zero.
- Seções na ordem do BRIEF; 3 etapas; respostas na linha "= " de cada pergunta; 5 figuras; 1 vídeo.
- Extensão: 5.150 palavras por `wc -w` (que conta marcadores de bloco, de opção e as linhas de opção); cerca de 4.500 sem a marcação, as legendas e o vídeo. Ficou no teto do alvo, sobretudo por causa das opções de múltipla escolha.
- Renderização de teste com `como_jogar_md.pagina()` gravada só no scratchpad (`previa.html`): 5 figuras, vídeo e perguntas reconhecidos. Nada gerado no repositório.
- Legibilidade (Flesch adaptado): não medida; `tools/discipulado/legibilidade.py` é de outro repositório e não foi adaptado nesta rotina.
