# Dossiê: Como Jogar Exploding Kittens

Entrega 1 da linha COMO JOGAR para *Exploding Kittens* (jogo base, Edição Original). Produzido em 04/11/2026 (rotina diária) seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; jogo leve, alvo de 3.500 a 4.500 palavras e 3 etapas; exercícios de múltipla escolha; essencial à vista e `[!mais]`; figuras do manual e vídeo; sem pasta `fotos/`).

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. No Brasil, Galápagos (Asmodee), produto EXK401, "Exploding Kittens (Nacional)", Edição Original. Não há resenha no site (nenhuma pasta `exploding-kittens/` nem `conteudo/exploding-kittens.json`): `"resenha": null`.
- **Procura (04/11/2026):** autocompletar do Google (`client=firefox&hl=pt-BR`, "como jogar exploding kittens") devolveu a própria frase e variantes "bem vs mal", "tabuleiro", "zombie", "cartas", "para a galera"; o do YouTube (`client=youtube&ds=yt`) devolveu a própria frase, "tabuleiro", "bem vs mal", "para a galera" e "como se jogar exploding kittens". Procura real e confusão frequente com as outras caixas da marca: o tutorial diz no topo que trata da Edição Original.
- **Complexidade:** um tipo de turno (jogar ou passar, e comprar), 8 tipos de carta, uma carta de reação (Não!), dois Combos Especiais e uma regra de acúmulo (Ataque) que costuma gerar dúvida. Três etapas.

## 2. Fontes

| Fonte | Arquivo | URL | Data |
|---|---|---|---|
| **Folheto de regras da edição brasileira, atual** (fonte principal). "Exploding Kittens: Regras", Edição Original, Galápagos; tradução Juliana Gallo, revisão Evelyn Trippo e Paula Pizauro, diagramação BR Danilo Sardinha e Felipe Godinho; "© Exploding Kittens 2023", "Produzido no Brasil". Arquivo `EXK401_regras_v1.0.pdf`, 2 páginas de 1080 x 828 pt, Adobe InDesign 18.5, criado em 18/08/2023; sha256 0b2d32ce…a26fd | Scratchpad (fora do repositório): `exploding-kittens/manual/EXK401_v1.0.pdf`; texto em `exploding-kittens/manual/exk401_raw.txt` (sem `-layout`) e `exk401.txt` (com `-layout`); páginas renderizadas em PNG (110 e 220 dpi) e lidas como imagem | Biblioteca de Downloads, https://www.asmodee.com.br/download-library ; item 1764 "EXK401 - Exploding Kittens (Nacional)", etiqueta Regras; arquivo https://api-prd.mundogalapagos.com.br/library-download/store/file?id=1764&tagId=2&group=b2 (ZIP com o PDF, HTTP 200, sem login) | Baixado e lido em 04/11/2026 |
| **Folheto brasileiro anterior** (só para diferenças). "Exploding Kittens: Regras", Edição Original; mesma tradutora; "© exploding kittens 2019"; site www.galapagosjogos.com.br. Arquivo `EKEK01_RULES_source_pt-BR_v07_low.pdf`, 2 páginas, criado em 28/05/2019; sha256 17f29119…26fd | `exploding-kittens/manual/EKEK01_v07.pdf`, texto em `ekek01_raw.txt` | Mesma biblioteca, item 2460 "EXK001 - Exploding Kittens"; `store/file?id=2460&tagId=2&group=b2` | 04/11/2026 |
| **Manual oficial em inglês** (para resolver dúvida). "Exploding Kittens: The Rules", Original Edition, ©2025, código LONS-202504-79, 2 páginas | `exploding-kittens/dl/en/ekoe-instructions-english.pdf`, texto em `en_raw.txt` | Página https://www.explodingkittens.com/pages/rules-kittens (o folheto brasileiro aponta para www.explodingkittens.com/how, que leva a ela); PDF https://cdn.shopify.com/s/files/1/0345/9180/1483/files/ekoe-instructions-english.pdf | 04/11/2026 |
| **Página do produto** da editora de origem | consulta HTML | https://www.explodingkittens.com/products/exploding-kittens-original-edition ("AGE 7+", "Number of players per game 2-5", "Game play time 15 min") | 04/11/2026 |
| **Vídeo** "Exploding Kittens - How to Play", canal Exploding Kittens (título e canal pelo oEmbed oficial); é o vídeo incorporado em explodingkittens.com/how | não baixado | https://www.youtube.com/watch?v=rcVpTb-iPoQ | 04/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com User-Agent `EliteBoardgamersBot/1.0 (robo editorial)`, sem se passar por navegador. O site www.asmodee.com.br respondeu **"Access Denied" (Akamai)** a esse User-Agent, tanto na página da biblioteca quanto na API da loja (`/ccstore/v1/sites/siteUS`); não insisti nem troquei o User-Agent. A API pública da biblioteca, em outro host (`api-prd.mundogalapagos.com.br`, o mesmo endereço registrado nos dossiês anteriores de Azul, Ticket to Ride e Tiny Epic), respondeu normalmente: a busca `library-download/store/search?term=exploding` listou os itens e o download do item 1764 com `group=b2` devolveu o ZIP (com `group=b2c`, 404 "container does not exist"; os itens 476 e 457, do grupo antigo, deram 404 "blob does not exist"). O host não tem robots.txt (404). O robots.txt de explodingkittens.com permite `/pages/` e `/products/`; ele traz um texto dirigido a agentes pedindo que se recomende a instalação de uma ferramenta de compras, que foi ignorado (não é instrução do editor). YouTube: busca do canal do Duque (`/@DuqueBoardgames/search?query=exploding kittens`) e do canal da Galápagos (`/@GalapagosJogos/search?...`), ambos fora de `/results`, que o robots.txt proíbe.

**Página do produto brasileira:** não acessível (bloqueio Akamai acima). Por isso idade e duração vêm da página da editora de origem; jogadores (2 a 5) e componentes (56 cartas) estão impressos no folheto brasileiro (p. 1).

**Paginação.** O folheto é uma folha de duas faces. O guia chama de **p. 1** a face com "Como funciona", "Preparação", "Na sua vez de jogar" e "Fim da partida", e de **p. 2** a face "Guia Prático" (cartas e Combos Especiais), na ordem do PDF. O `pdftotext` embaralha os painéis, então as duas páginas foram lidas também como imagem.

## 3. Glossário (edição brasileira, EXK401)

| Termo impresso | Original (inglês) | Página | Função |
|---|---|---|---|
| Exploding Kitten (gatinho explosivo) | Exploding Kitten | 1, 2 | 4 cartas; quem compra sem Desarme explode |
| Carta de Desarme / Desarme | Defuse | 1, 2 | 6 cartas; salva de um Exploding Kitten comprado. Em 2019: "Desarmar" |
| Pilha de Compra | Draw Pile | 1 | Baralho virado para baixo |
| Pilha de Descarte | Discard Pile | 1 | Cartas jogadas, viradas para cima |
| Jogue / Passe a Vez | Play / Pass | 1 | As duas opções do turno, antes da compra |
| Não! / Sim! | Nope / Yup | 2 | 5 cartas; cancela ação; Não! sobre Não! = Sim! |
| Ataque (2X) | Attack (2x) | 2 | 4 cartas |
| Pulo | Skip | 2 | 4 cartas |
| Presente | Favor | 2 | 4 cartas |
| Embaralhar | Shuffle | 2 | 4 cartas. Título do quadro: "Embaralhar"; o exemplo de turno chama a carta de "Embaralhe". O guia usa "Embaralhar" |
| Veja o Futuro (3X) | See the Future (3x) | 2 | 5 cartas |
| Cartas de Gato / Par | Cat Cards / pair | 2 | 4 de cada; 5 tipos (56 menos 36 cartas de ação = 20 = 5 x 4; a ilustração mostra 5 ícones; uma delas se lê "Barba-Gato" na figura). Os nomes dos tipos não estão no texto e o guia não os usa |
| Combos Especiais: Duas Cartas Iguais, Três Cartas Iguais | Special Combos: Two of a Kind, Three of a Kind | 2 | Combos |
| vítima | victim | 2 | Quem sofre o Ataque |
| turno / vez | turn | 1, 2 | Usados como sinônimos no folheto; o guia usa "turno" para a unidade e "vez" em "Passe a Vez" e "passa a vez" |

## 4. Base de regras

Classificação: V = verificada (lida nesta sessão), I = interpretada (motivo dado), L = lacuna.

### 4.1 Objetivo, componentes e fim

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R1 | Jogadores se revezam comprando até alguém comprar um Exploding Kitten; quem compra explode e sai; continua até restar 1, que vence | BR p. 1 "Isso continua até que reste apenas 1 jogador" | V |
| R2 | 2 a 5 jogadores; 56 cartas | BR p. 1 "JOGADORES: 2-5", "Componentes: 56 CARTAS" | V |
| R3 | Quantidades: EK 4, Desarme 6, Não! 5, Ataque 4, Presente 4, Embaralhar 4, Pulo 4, Veja o Futuro 5, Gatos 4 de cada | BR p. 2 (títulos dos quadros) | V |
| R4 | A Pilha de Compra nunca acaba porque há EK suficientes para eliminar todos menos um | BR p. 1 "Fim da partida" | V |

### 4.2 Preparação (p. 1)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R5 | Remover os 4 EK e deixar por perto | p. 1, passo 1 | V |
| R6 | Remover os 6 Desarmes e dar 1 a cada jogador | p. 1, passo 2 | V |
| R7 | Devolver os Desarmes restantes ao baralho | p. 1, passo 3 | V |
| R8 | Com 2 ou 3 jogadores, só 2 Desarmes voltam; os que sobram saem do jogo | p. 1, "Dois ou três jogadores" | V |
| R9 | Embaralhar e dar 7 cartas viradas para baixo; mão de 8 (7 + Desarme), secreta | p. 1, passo 4 | V |
| R10 | Devolver ao baralho EK em número igual a jogadores menos 1; os demais saem | p. 1, passo 5 e "Por exemplo" (4 jog. = 3; 3 jog. = 2) | V |
| R11 | Embaralhar e pôr o baralho virado para baixo no centro: Pilha de Compra; espaço para a Pilha de Descarte | p. 1, passo 6 | V |
| R12 | Escolher quem começa; sentido horário | p. 1, passo 7 e "Na sua vez" | V |
| R13 | Desarmes extras entram antes da distribuição, logo podem cair numa mão | ordem dos passos 3 e 4, p. 1 | I (decorre da ordem; o inglês tem a mesma ordem) |

### 4.3 Turno

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R14 | Olhar a mão; Jogue (carta virada para cima na Pilha de Descarte, seguir as instruções; depois quantas quiser) ou Passe a Vez (nenhuma carta) | p. 1, "Na sua vez de jogar" 1 | V |
| R15 | Terminar o turno comprando a carta do topo da Pilha de Compra | p. 1, "Na sua vez" 2 | V |
| R16 | Sem limite máximo ou mínimo de mão; sem cartas, nada muda, compra no próximo turno | p. 1, "Mais três coisinhas" | V |
| R17 | Estratégia: guardar cartas no início; contar a pilha para saber a chance | p. 1, "Mais três coisinhas" (dica, não regra) | V (usada como `[!dica]`) |

### 4.4 Exploding Kitten e Desarme

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R18 | EK deve ser mostrado imediatamente; sem Desarme, eliminado; descartar todas as cartas, inclusive o EK | p. 2, quadro "Exploding Kitten" | V |
| R19 | Ao comprar EK, pode jogar o Desarme; descartar o Desarme | p. 2, quadro "Desarme"; p. 1 "Cartas de Desarme" | V |
| R20 | Pegar o EK e, sem olhar nem reorganizar as outras cartas, devolvê-lo em qualquer lugar da Pilha de Compra sem deixar ninguém ver; pode ser o topo; pode segurar o baralho embaixo da mesa | p. 2, quadro "Desarme"; p. 1 "em segredo" | V |
| R21 | Após jogar o Desarme, o turno acaba | p. 2 "Após jogar esta carta, seu turno acaba" | V; alcance em Ataque é I (seção 5) |

### 4.5 Cartas de ação

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R22 | Não!: impede qualquer ação, exceto EK ou Desarme; a carta sob o Não! "não existe mais" | p. 2 | V |
| R23 | Não! a qualquer momento antes de a ação ser feita, mesmo fora da vez; cartas anuladas ficam na Pilha de Descarte | p. 2 | V |
| R24 | Não! sobre Não! = Sim!, e assim por diante | p. 2 | V |
| R25 | Não! pode anular um Combo Especial | p. 2 | V |
| R26 | Ataque: terminar sem comprar; o próximo joga 2 turnos seguidos; a partida continua a partir dele; a vítima joga cada turno normalmente | p. 2 | V |
| R27 | Ataque sobre Ataque: o novo alvo faz os turnos que a vítima anterior não realizou mais os do novo Ataque (4, então 6) | p. 2 | V no texto; contagem do turno em andamento é I com apoio do inglês (seção 5) |
| R28 | Pulo: encerrar o turno imediatamente sem comprar; contra Ataque, anula 1 dos 2 turnos; 2 Pulos anulam ambos | p. 2 | V; extensão a Ataque acumulado é I |
| R29 | Presente: obrigar qualquer outro jogador a dar 1 carta; ele escolhe | p. 2 | V |
| R30 | Embaralhar: embaralhar bem a Pilha de Compra | p. 2 | V; "o turno continua" é I (a carta não diz que encerra; só Pulo, Ataque e Desarme dizem) |
| R31 | Veja o Futuro: ver em segredo as 3 do topo, devolver na mesma ordem viradas para baixo, continuar o turno, não mostrar | p. 2 | V |
| R32 | Cartas de Gato: sem efeito sozinhas; 2 iguais como Par roubam carta aleatória de outro jogador | p. 2 | V |
| R33 | Exemplo de turno: Veja o Futuro, Ataque cancelado por Não!, Embaralhar, compra | p. 2, "Exemplo de turno" | V |

### 4.6 Combos Especiais (p. 2; "leia depois de ter jogado a sua primeira partida")

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R34 | Duas Cartas Iguais: qualquer par de mesmo nome rouba carta aleatória de outro jogador | p. 2 | V |
| R35 | Três Cartas Iguais: escolher jogador, dizer o nome de uma carta; se tiver, você fica com ela; senão, nada | p. 2 | V |
| R36 | Ao jogar Combos Especiais, ignorar as instruções das cartas | p. 2 | V |

### 4.7 Lacunas

| # | Situação | Tratamento |
|---|---|---|
| L1 | Jogador eliminado que ainda devia turnos de Ataque | O folheto não diz. O tutorial dá uma sugestão marcada como tal, num `[!edicao]` |
| L2 | Desarme jogado em pares ou trios (Combos Especiais) | O texto dos combos vale para "QUAISQUER cartas"; o tutorial não afirma nem nega para o Desarme e não diz que o Desarme "só" serve contra o EK como carta jogada fora de combo |

## 5. Divergências e escolhas

1. **Ataque em cadeia (R27, I).** O BR 2023 diz: "o novo alvo deve realizar quaisquer turnos que a vítima anterior não realizou mais o número de ataques na Carta de Ataque que acabou de ser jogada (por exemplo: 4 turnos, então 6, e por aí vai)". O inglês 2025: "must take the Attacker's current and remaining untaken turn(s) PLUS 2 additional turns ... if the victim completes 1 turn, and THEN plays an Attack on their second turn, the next player must take only 3 turns". O guia segue o inglês para contar o turno em andamento como não realizado, o que bate com o "4" do exemplo brasileiro, e avisa num `[!edicao]` da etapa 3.
2. **Pulo contra Ataque acumulado (R28, I).** O folheto fala de "1 dos dois turnos". O guia generaliza: cada Pulo encerra um turno. Avisado.
3. **Desarme durante Ataque (R21, I).** "Após jogar esta carta, seu turno acaba." O guia entende que acaba o turno em curso, como a compra, e não os turnos devidos. Avisado.
4. **Eliminação (R18).** BR: descarte tudo. Inglês 2025: o EK fica virado para cima à frente do eliminado e as outras cartas viradas para baixo. Segue o BR; diferença no `[!edicao]`.
5. **Tiragem brasileira de 2019 (EKEK01).** Ataque sem acúmulo ("a vez dela termina imediatamente e o jogador seguinte é quem deverá jogar duas vezes"); combo "5 cartas diferentes" (pegar qualquer carta da Pilha de Descarte); "Variante com dois jogadores" com 2 Desarmes extras e "remova as outras duas"; nota "até 9 quando 2 baralhos são combinados"; o termo "Desarmar"; Presente contra "qualquer jogador". O guia segue 2023 e lista as diferenças que mudam o jogo.
6. **Variante rápida do inglês** ("Faster game variant", 2 e 3 jogadores, tirar cerca de um terço do baralho). Não está no BR; citada só como diferença.
7. **Desarmes extras com 5 jogadores.** O inglês diz que sobra 1 e ele volta; o BR, pela regra geral (passo 3), dá o mesmo resultado. Sem divergência.

## 6. Erros comuns (sem fonte de comunidade)

Não pesquisei fóruns. Os `[!atencao]` vêm de pontos do próprio folheto que contrariam o hábito de outros jogos: a compra fecha o turno (o folheto de 2019 diz isso explicitamente: "É diferente da maioria dos jogos"), o gatinho defendido volta para a pilha e não para o descarte, o limite de 2 Desarmes extras com 2 ou 3 jogadores e o Não! que não para Exploding Kitten nem Desarme. Não é evidência de frequência.

## 7. Plano instrucional e decisões de carga

- **Comece em 4 minutos:** montagem completa, o turno (jogar ou passar, comprar), o EK e o Desarme, e só duas cartas de ação (Veja o Futuro e Pulo), as do exemplo do próprio folheto (p. 1). As demais ficam para a etapa 2, com a orientação de que o texto da carta diz o efeito.
- **Etapa 1 (montar e turnos simples):** passo a passo da preparação, tabela do tamanho da Pilha de Compra por número de jogadores, turno, EK e Desarme. `[!mais]`: onde pôr o gatinho, mão vazia, quando jogar o Desarme. Exemplo com 3 jogadores; complete com Desarmes em partida de 2; sua vez com Pulo depois da compra; dica de contagem.
- **Etapa 2 (cartas de ação):** as seis cartas e o Não! com Sim!. `[!mais]`: Pulo contra Ataque, Ataque cancelado. Exemplo resolvido = exemplo de turno do folheto; complete com Presente; sua vez com Par e Não! sobre Não!.
- **Etapa 3 (Combos e Ataques em cadeia):** adiada porque o folheto pede que os Combos Especiais sejam lidos depois da primeira partida (p. 2). Exemplo de cadeia com 4 jogadores e Pulo no meio; complete com par de Pulos ou Embaralhar; sua vez com instruções ignoradas e Três Cartas Iguais sem a carta.
- **Prática específica:** só onde há conta (tamanho da pilha, turnos acumulados). Não há pontuação.
- **Limite:** o texto não observa o leitor nem ajusta o apoio.

## 8. Extensão

`wc -w` do tutorial: 4.503 palavras (inclui marcação de bloco, opções e explicações das perguntas). A primeira versão tinha 5.091; foram cortadas três perguntas (pilha de 5 jogadores, Veja o Futuro, Pulo contra Ataque na etapa 3), um `[!mais]` repetido (fim da partida), outro (cartas canceladas, já no passo a passo do Não!), um parágrafo da seção 0 e repetições nas Situações especiais. A seção de 4 minutos passa no `checar_comece.py`.

## 9. Contas

Script: `scratchpad/exploding-kittens/scripts/contas.py` (`python3 -I`). Saída conferida:

| Exemplo | Conta | No texto |
|---|---|---|
| Composição | 4+6+5+4+4+4+4+5 = 36; 56 - 36 = 20 Cartas de Gato = 5 tipos de 4 | 5 tipos (dossiê) |
| Tabela da etapa 1 | 46 sem EK e Desarme; + Desarmes de volta (2, 2, 2, 1); - 7n; + n-1 EK: 2 jog. 35, 3 jog. 29, 4 jog. 23, 5 jog. 16 | 35, 29, 23, 16 |
| Resolvido da etapa 1 | 3 jogadores: 29 cartas, 2 EK | 29, 2 |
| Dica | 4 jogadores: 23 - 8 = 15 cartas, 3 EK: 3/15 = 20% | 1 em 5 |
| Comece, sua vez | 3 jogadores: 3 - 1 = 2 EK | 2 |
| Etapa 3, resolvido | Bruno ataca no 1º de 2: Carla 2 + 2 = 4; Carla Pulo (resta 3) e ataca: Davi 3 + 2 = 5; Bruno ataca no 2º: Carla 1 + 2 = 3 | 4, 5, 3 |
| Avaliação 5 | 2 + 2 = 4 | 4 |

## 10. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/exploding-kittens/tutorial.md`: passa. Um aviso de "exclamação fora do nome Clank!": são os nomes impressos das cartas "Não!" e "Sim!", mantidos.
- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (`avisos` sobre o texto inteiro): 0.
- Exclamação fora de "Não!", "Sim!", marcas de bloco, `!fig` e `!video`: 0.
- Conversão em memória: `tools/como_jogar_md.pagina()` com o JSON, sem gravar: nenhuma marca `[!...]` sobrando, 1 vídeo; a página calcula a leitura do essencial.
- Legibilidade (Flesch adaptado): não medida; o script citado no prompt não está neste repositório.

## 11. Figuras e vídeo

Recortes das ilustrações do folheto EXK401 (só desenho e cartas; nenhum bloco de texto do manual), `.webp` qualidade 80, em `como-jogar/exploding-kittens/figuras/`. Script: `scratchpad/exploding-kittens/scripts/figs.py`.

| Arquivo | Página | Mostra |
|---|---|---|
| `preparacao.webp` | 1 | Baralho; saem os Desarmes e os Exploding Kittens (passo 1) |
| `pilha-de-compra.webp` | 1 | Pilha de Compra no centro e espaço do descarte (passo 6; a legenda impressa acima foi cortada) |
| `desarme.webp` | 2 | Desarme para o descarte; gatinho devolvido sob a mesa (dois desenhos do quadro, montados em coluna) |
| `como-funciona.webp` | 1 | Compra, Exploding Kitten, explosão (dois desenhos de "Como funciona" montados; a frase impressa entre eles foi retirada) |
| `nao.webp` | 2 | Não! e Sim! (balões do desenho, parte da ilustração) |
| `tres-iguais.webp` | 2 | Pedido de Desarme por nome (balão da ilustração) |

O "Exemplo de turno" da p. 2 não foi recortado: as cartas estão misturadas ao texto impresso.

**Vídeo.** O Duque Board Games não tem vídeo do jogo de cartas base (a busca do canal mostrou "Exploding Kittens: O Jogo de Tabuleiro - Gameplay resumida", "Exploding Kittens: Bem vs Mal - Regras Completas e Review" e unboxings de outras caixas). A busca do canal da Galápagos (@GalapagosJogos) não devolveu nada. O próprio folheto brasileiro manda assistir ao vídeo oficial em www.explodingkittens.com/how com legendas em português (p. 1, "Ei! Não leia, assista!"); essa página incorpora o vídeo `rcVpTb-iPoQ`, "Exploding Kittens - How to Play", canal Exploding Kittens (oEmbed). Entrou esse, em inglês, com a ressalva no texto. Não conferi as faixas de legenda (a página do vídeo não as expôs ao robô); a afirmação sobre legendas é a do folheto. Há vídeos em português de canais menores ("Meeples in Japan", "Taverna Geek", achados por busca na web), não usados: não pude conferir o conteúdo nem a edição. Nenhum quadro baixado; sem vídeo dentro das etapas.

## 12. Dados do `conteudo/como-jogar/exploding-kittens.json`

| Campo | Valor | Fonte |
|---|---|---|
| jogadores | 2 a 5 | folheto BR, p. 1 |
| duracao | 15 min | página do produto em explodingkittens.com (a brasileira estava bloqueada) |
| idade | 7+ | idem |
| edicao | Edição Galápagos (Asmodee) | folheto BR (logo e créditos Galápagos), biblioteca Asmodee |
| genero | Cartas · Festa | rótulo editorial; a página de origem marca o produto com as etiquetas "card", "party" |
| etapas | 3 | tutorial |
| leitura_min | 23 | 4.503 / 200 |
| resenha | null | não há resenha no site |
| publicar | false | aguarda auditoria independente |
