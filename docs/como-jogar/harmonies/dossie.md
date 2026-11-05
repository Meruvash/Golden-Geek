# Dossiê: Como Jogar Harmonies

Entrega 1 da linha COMO JOGAR para *Harmonies* (Johan Benvenuto, Libellud, 2024; no Brasil, Galápagos/Asmodee Brasil). Produzido em 05/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e os ajustes do pedido do dia (jogo leve/médio: 4.000 a 5.000 palavras, 3 etapas; seção de montagem com figura do manual em cada passo; figuras em `como-jogar/harmonies/figuras/`; fotos oficiais reaproveitadas de `harmonies/fotos/`).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Manual brasileiro acessível:** sim, na Biblioteca de Downloads da Asmodee Brasil, mais a errata oficial (seção 2).
- **Resenha no Elite:** sim, pasta `harmonies/` e `conteudo/harmonies.json`. No JSON, `"resenha": "harmonies"`.
- **Complexidade:** uma ação obrigatória e duas opcionais que se intercalam com ela, regras de empilhamento que formam quatro tipos de paisagem, padrões de habitat que podem ser girados, o cubo que sai de baixo da carta e a pontuação em seis categorias (cinco de paisagem e os animais), com duas versões da água (lado A, rio; lado B, ilhas). Jogo leve/médio: 3 etapas.
- **Procura real (05/11/2026, 19h45 UTC):** o autocompletar do Google para "como jogar harmonies" devolve "como jogar harmonies", "como jogar harmonies solo", "como jogar harmonies sozinho". O do YouTube devolve só "como jogar harmonies". Por isso o modo solo entra no tutorial, em bloco `[!mais]` e na folha de consulta.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro** (fonte das páginas citadas), *Harmonies: Regras do Jogo*, Galápagos | Arquivo `HRM001_regras_v2.0.pdf`, 7 páginas PDF: capa (p. 1), cinco páginas duplas (p. 2-3, 4-5, 6-7, 8-9, 10-11) e a "Ajuda ao jogador" (p. 12). Título interno `HAR_Rules_BR.indd`, criado em 04/06/2024 (InDesign 19.4). Tradução de Mateus Ornellas; revisão de Luis Perdomo e Camila Loricchio. sha256 818611e5…c8e9ac8db0 | Biblioteca de Downloads, https://www.asmodee.com.br/download-library, item 1853 "HRM001 - Harmonies - SKU: HRM001", etiquetas Errata e Regras; arquivo via API pública `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=1853&tagId=2&group=b2c` (ZIP, HTTP 200, sem login) | Baixado e lido em 05/11/2026 |
| **Errata oficial** *Harmonies* v1.0 (04/24), Galápagos | `HRM001_ERRATA_v1.0_04-24.pdf`, 1 página, criada em 23/04/2024. sha256 07fff13b…4b055f | Mesmo item 1853, `store/file?id=1853&tagId=1&group=b2c` | Baixada e lida em 05/11/2026 |
| Item 620 da biblioteca ("HRM001 - Harmonies", Regras e Ilustração) | A API respondeu 404 ("The specified blob does not exist") | | 05/11/2026 |
| **Manual original em inglês**, Libellud | `HARMONIES_Rules_EN_compressed-1.pdf`, 7 páginas, criado em 10/12/2024 | https://www.libellud.com/game/harmonies/ (link do PDF em cdn.svc.asmodee.net) | Baixado em 05/11/2026 só para conferir dúvidas de tradução (fim da partida, empate, empilhamento): mesmo conteúdo do brasileiro |
| **Página do produto**, Libellud | "1 - 4 players", "10+", "30 min", lançamento 04/2024 | https://www.libellud.com/game/harmonies/ | 05/11/2026 |
| Página do produto na loja da Asmodee Brasil | A API da loja (`www.asmodee.com.br/ccstore/v1/products/HRM001`) respondeu "Access Denied" (403) ao robô; não foi contornado | | 05/11/2026 |
| **Vídeo** "HARMONIES \| Regras completas (Com exemplos)", Duque Board Games | Título e canal pelo oEmbed oficial; achado pela busca do próprio canal (`@DuqueBoardgames/search?query=harmonies`, com `Accept-Language: pt-BR`); nada baixado. O canal tem também "HARMONIES \| Gameplay resumida !" (Tfk1-bEpQ7I) | https://www.youtube.com/watch?v=o4psd_-Lzv0 | 05/11/2026 |
| **FAQ oficial**, Libellud | Bloco FAQPage da página do produto, 5 perguntas em inglês (símbolos do tabuleiro central; rio com braços; rio em anel; cubos de animais esgotados; cartas de espíritos) | https://www.libellud.com/game/harmonies/ (lido no HTML salvo em `work/lib_game.html`) | Lido em 05/11/2026, depois da auditoria independente |

**User-Agent e robots.txt.** Todas as requisições usaram o User-Agent próprio do robô (`EliteBoardgamersBot/1.0 (+robo de pesquisa editorial)`). A API da biblioteca e o site da Libellud responderam normalmente; o `robots.txt` da Libellud só restringe busca, feeds e o conversor de imagens. A loja da Asmodee Brasil respondeu 403 e não foi usada. O YouTube foi consultado só na busca do canal e no oEmbed.

**Como o manual foi lido.** O PDF tem camada de texto; foi extraído com `pdftotext -layout`, página PDF a página PDF, e lido inteiro. As ilustrações foram renderizadas (60 a 500 dpi) para ler o que não está no texto: os valores de pontos de árvores, montanhas e rio (p. 8), a tabela de empilhamento (p. 4), os valores da carta do Feneco (p. 5) e do Musaranho (p. 7), o exemplo de pontuação (p. 9) e a tabela de sóis do solo (p. 11). Tudo fica no scratchpad, fora do repositório:

- PDFs: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/harmonies/dl/z_regras/HRM001_regras_v2.0.pdf`, `.../dl/z_errata/HRM001_ERRATA_v1.0_04-24.pdf`, `.../dl/en/en.pdf`
- Texto extraído por página PDF: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/harmonies/work/regras_p1.txt` (capa, p. 1), `regras_p2.txt` (p. 2 e 3), `regras_p3.txt` (p. 4 e 5), `regras_p4.txt` (p. 6 e 7), `regras_p5.txt` (p. 8 e 9), `regras_p6.txt` (p. 10 e 11), `regras_p7.txt` (p. 12); errata em `work/errata.txt`; inglês em `work/en.txt`.
- Contas: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/harmonies/scripts/contas.py`

**Numeração.** O livro tem 12 páginas impressas, numeradas de 2 a 11 no rodapé; a capa conta como p. 1 e a "Ajuda ao jogador" (verso) como p. 12, que não tem número impresso.

## 3. Glossário (edição brasileira)

O tutorial usa os nomes do manual em minúsculas no texto corrido.

| Termo no tutorial | No manual | Página | Explicação |
|---|---|---|---|
| bolsa | Bolsa | p. 2 | Saco de pano com as 120 peças. |
| tabuleiro central | Tabuleiro Central | p. 2 | Peça com 5 espaços de 3 peças (lado de 2-4 jogadores) ou 3 (lado Solo) e uma seta. |
| tabuleiro pessoal | Tabuleiro Pessoal | p. 2 e 3 | Tabuleiro de espaços hexagonais de cada jogador; lado A ou B. |
| carta de auxílio | Carta de Auxílio | p. 2 e 3 | Resumo da pontuação; fica com o lado igual ao do tabuleiro pessoal. |
| peça (azul, cinza, marrom, verde, amarela, vermelha) | Peças | p. 2 | 120 peças redondas de 6 cores. |
| cubo de animal | Cubos de Animais | p. 2 e 5 | 75 cubos laranja; marcam onde um animal vive. |
| reserva | reserva | p. 5 | Os cubos de animal ao alcance de todos. |
| carta de animal | Cartas de Animais | p. 2 e 5 | 32 cartas; padrão de habitat, espaços de cubo e pontos. |
| fileira de cartas / pilha de compra | "fileira de Cartas de Animais", "pilha de compra" | p. 3 e 4 | As 5 cartas abertas e o resto do baralho. |
| completa | completa | p. 6 | Carta sem cubos; vai para o lado do tabuleiro e sai do limite de 4. |
| paisagem | Paisagem | p. 2, 4, 8 | O que se forma com as peças no tabuleiro pessoal; também cada tipo pontuado (árvore, montanha etc.). |
| habitat | Habitat | p. 5 e 6 | O padrão de peças desenhado na carta de animal. |
| árvore | Árvore | p. 4 e 8 | Verde sobre 0, 1 ou 2 marrons (tamanho 1, 2 ou 3). |
| montanha | Montanha | p. 4 e 8 | Pilha de 1, 2 ou 3 cinzas. |
| campo | Campo | p. 8 | Grupo de 2 ou mais amarelas adjacentes. |
| construção | Construção | p. 4 e 8 | Vermelha sobre marrom, cinza ou vermelha. |
| água, rio (lado A), ilha (lado B) | Água, Rio, Ilha | p. 8 | Pontuação das peças azuis, que muda com o lado do tabuleiro pessoal. |
| carta de espírito da natureza / cubo de espírito da natureza | Cartas/Cubos de Espíritos da Natureza | p. 2 e 10 | Variante para depois das primeiras partidas. |
| bloco de pontuação | Bloco de Pontuação | p. 2 e 9 | Folha de soma. |
| sóis | sóis | p. 11 | Medida de resultado do modo solo. |

## 4. Base de regras

Classificação: `[verificada]` lida no manual nesta sessão; `[interpretada]` leitura escolhida, com motivo; `[lacuna]` o manual não diz. Dependências entre parênteses.

### Preparação (p. 2 e 3)

| # | Regra | Fonte | Frase lida | Classe |
|---|---|---|---|---|
| P1 | Componentes: 1 bolsa, 1 tabuleiro central, 4 tabuleiros pessoais, 4 cartas de auxílio, 120 peças (23 azuis, 23 cinza, 21 marrons, 19 verdes, 19 amarelas, 15 vermelhas), 75 cubos de animais, 4 cubos de espíritos da natureza, 32 cartas de animais, 10 cartas de espíritos da natureza, 1 bloco de pontuação | [BR p. 2] | "120 Peças", "75 Cubos de Animais" | verificada (soma 120 refeita) |
| P2 | Passo 1: tabuleiro central com o lado de 2-4 jogadores para cima | [BR p. 2] | "lado de 2-4 Jogadores virado para cima" | verificada |
| P3 | Passo 2: todas as peças na bolsa, bolsa perto do tabuleiro central | [BR p. 2] | "Coloque todas as peças na Bolsa" | verificada |
| P4 | Passo 3: cada um dos 5 espaços do tabuleiro central recebe 3 peças tiradas ao acaso da bolsa | [BR p. 2] | "Preencha cada um dos 5 espaços" | verificada |
| P5 | Passo 4: embaralhar as cartas de animais, 5 abertas perto do tabuleiro central, o resto como pilha de compra; cubos de animais ao alcance de todos | [BR p. 3] | "coloque 5 cartas viradas para cima" | verificada |
| P6 | Nota do passo 4: nas primeiras partidas, cartas e cubos de espíritos da natureza ficam na caixa | [BR p. 3] | "Mantenha as cartas e peças correspondentes na caixa" | verificada (recomendação) |
| P7 | Passo 5: cada jogador pega um tabuleiro pessoal; todos decidem juntos o lado, e todos usam o mesmo; cada um pega uma carta de auxílio virada para o lado correspondente | [BR p. 3] | "Todos os jogadores devem usar o mesmo lado" | verificada |
| P8 | Nota do passo 5: nas primeiras partidas, lado A | [BR p. 3] | "recomendamos utilizar o Lado A" | verificada (recomendação) |
| P9 | Passo 6: o último a ter visto uma paisagem magnífica começa; a seta do tabuleiro central aponta para ele | [BR p. 3] | "Aponte a seta do Tabuleiro Central em direção a ele" | verificada |
| P10 | Tabuleiros e cartas de auxílio que sobram (partidas com menos de 4) não são usados | [BR p. 3] | o passo 5 dá um a cada jogador | interpretada: o manual não diz "volta para a caixa", mas só cada jogador pega um |
| P11 | Nenhuma diferença de preparação entre 2, 3 e 4 jogadores além do número de tabuleiros | [BR p. 2 e 3] | os passos não citam número de jogadores | verificada pela ausência; o lado Solo muda (S1) |

### Turno (p. 4 a 7)

| # | Regra | Fonte | Frase lida | Classe |
|---|---|---|---|---|
| T1 | Começa o primeiro jogador; sentido horário | [BR p. 4] | "seguindo em sentido horário" | verificada |
| T2 | No turno: uma ação obrigatória (pegar e posicionar peças) e duas opcionais (pegar 1 carta de animal; posicionar cubo de animal), na ordem que quiser | [BR p. 4; p. 12] | "na ordem que quiser" | verificada |
| T3 | Pegar e posicionar peças: exatamente uma vez por turno; pegar as 3 peças de um dos espaços do tabuleiro central | [BR p. 4] | "Pegue 3 peças de qualquer um dos espaços" | verificada |
| T4 | Posicionar as 3 peças no tabuleiro pessoal; entre uma peça e outra, pode fazer ações opcionais | [BR p. 4; p. 12] | "Após posicionar uma peça, você pode realizar ações opcionais" | verificada |
| T5 | Peça pode ir sempre num espaço vazio | [BR p. 4] | "sempre pode ser posicionada em um espaço vazio" | verificada |
| T6 | Peça pode ir sobre 1 ou 2 peças para formar árvore, construção ou montanha, como na ilustração; nenhum outro empilhamento | [BR p. 4] | "Nenhum outro empilhamento é permitido" | verificada |
| T7 | Empilhamentos da ilustração: cinza sobre cinza e sobre 2 cinzas; vermelha sobre cinza, vermelha ou marrom; marrom sobre marrom; verde sobre marrom e sobre 2 marrons; azul e amarela só no chão | [BR p. 4, ilustração; p. 12] | ilustração "Montanhas, Construções, Árvores, Água, Campos" | verificada (lida na ilustração) |
| T8 | Peça nunca embaixo de peças já postas | [BR p. 4] | "não pode ser posicionada embaixo" | verificada |
| T9 | Peça nunca em espaço com cubo de animal (nem sob nem sobre o cubo) | [BR p. 4; p. 12] | "Nunca sob ou sobre um Cubo de Animal" | verificada |
| T10 | Fim do turno: tirar 3 peças da bolsa e reabastecer o tabuleiro central; repor a fileira de cartas de animais até 5 | [BR p. 4; p. 12] | "compre 3 peças da Bolsa e reabasteça" | verificada |
| C1 | Pegar 1 carta de animal: opcional, a qualquer momento do turno, no máximo uma vez por turno; escolher uma das 5 abertas e pôr acima do tabuleiro pessoal | [BR p. 5] | "apenas uma vez por turno" | verificada |
| C2 | Máximo de 4 cartas acima do tabuleiro pessoal ao mesmo tempo | [BR p. 5] | "até 4 cartas simultaneamente" | verificada |
| C3 | Ao pegar a carta, pegar da reserva um cubo por espaço da carta e cobrir cada espaço | [BR p. 5] | "coloque 1 cubo em cada um desses espaços" | verificada |
| C4 | Anatomia: espaços de cubo com os pontos; o padrão do habitat; o espaço onde o cubo vai; lembrete da cor | [BR p. 5] | "DESCRIÇÃO DE UMA CARTA DE ANIMAL" | verificada |
| C5 | Recomendação: nas primeiras partidas, evitar várias cartas cuja cor do cubo é a mesma (faixa lateral) | [BR p. 5] | "evite ter múltiplas Cartas" | verificada (recomendação) |
| K1 | Posicionar cubo de animal: opcional, quantas vezes quiser, a qualquer momento do turno | [BR p. 6] | "múltiplas vezes no seu turno" | verificada |
| K2 | O padrão deve estar no tabuleiro exatamente como na carta, em qualquer orientação | [BR p. 6 e 7] | "pode ser orientado em qualquer direção" | verificada; ver K9 |
| K3 | Altura de árvores e montanhas exatamente como na carta | [BR p. 6] | "deve corresponder exatamente" | verificada |
| K4 | A peça onde o cubo vai deve estar desocupada; não mais que 1 cubo por espaço | [BR p. 6; p. 12] | "deve estar desocupada" | verificada |
| K5 | Construção no padrão pode ter qualquer base (vermelha, marrom ou cinza) | [BR p. 6] | "As Construções podem ser de qualquer tipo" | verificada |
| K6 | Tirar o cubo mais abaixo da carta e pô-lo na peça indicada | [BR p. 6] | "pegue o cubo mais abaixo" | verificada |
| K7 | Último cubo saiu: carta completa, vai para o lado do tabuleiro e sai do limite de 4 | [BR p. 6] | "não conta mais para o seu limite de 4 cartas" | verificada |
| K8 | Uma peça pode fazer parte de vários habitats | [BR p. 6 e 7] | "Uma única peça pode ser usada como parte de múltiplos Habitats" | verificada |
| K9 | Espelhamento do padrão | [BR p. 7] | a ilustração "Orientações" mostra 6 rotações | lacuna: o manual diz "qualquer direção" e só ilustra rotações; o tutorial diz "girar" e avisa em `[!edicao]` |
| K10 | Cubo posto é definitivo, mesmo que o habitat deixe de existir (ex.: vermelha sobre a cinza) | [BR p. 6; p. 12] | "O posicionamento de um Cubo de Animal é definitivo" | verificada |

### Fim e pontuação (p. 7 a 9)

| # | Regra | Fonte | Frase lida | Classe |
|---|---|---|---|---|
| F1 | Fim: a bolsa está vazia quando é preciso reabastecer o tabuleiro central, ou no fim do seu turno há 2 ou menos espaços desocupados no seu tabuleiro pessoal | [BR p. 7] | "2 ou menos espaços desocupados" | verificada |
| F2 | Termina-se a rodada para todos terem o mesmo número de turnos | [BR p. 7] | "termine a rodada atual" | verificada |
| F3 | Último a jogar é quem está à direita do primeiro jogador | dedução de T1 e P9 | | interpretada: sentido horário a partir do jogador apontado pela seta |
| F4 | Bolsa com menos de 3 peças ao reabastecer | | | lacuna: o manual (BR e inglês) não diz se o espaço é reabastecido em parte; o tutorial só diz que a partida termina quando a bolsa está vazia ao reabastecer |
| F5 | Pilha de cartas de animais esgotada | | | lacuna; não entra no tutorial |
| F6 | Vence quem tiver mais pontos; empate: mais cubos de animais posicionados; persistindo, vitória compartilhada | [BR p. 7] | "o jogador que posicionou mais Cubos de Animais vence" | verificada |
| S-A | Árvore: verde sobre 0, 1 ou 2 marrons, tamanho 1, 2, 3: 1, 3, 7 pontos; marrom sem verde: 0 | [BR p. 8, ilustração] | "A altura de cada Árvore determina a quantidade de pontos" | verificada (valores na ilustração) |
| S-M | Montanha: 1, 2, 3 cinzas: 1, 3, 7 pontos; 0 se não estiver adjacente a outra montanha | [BR p. 8] | "vale 0 ponto se ela não estiver adjacente a outra Montanha" | verificada |
| S-C | Campo: grupo de 2 ou mais amarelas adjacentes: 5 pontos por grupo, qualquer tamanho; amarela sozinha: 0 | [BR p. 8] | "conta apenas como um único Campo e só vale 5 pontos" | verificada |
| S-K | Construção: vermelha sobre marrom, cinza ou vermelha; 5 pontos se cercada por pelo menos 3 cores diferentes (das 6, incluindo vermelha), contando só a peça de cima de cada espaço vizinho; senão 0 | [BR p. 8] | "Considere apenas a peça superior de cada espaço adjacente" | verificada |
| S-K2 | Vermelha sozinha no chão não é construção | [BR p. 8] | definição "posicionada sobre 1 peça" | verificada pela definição |
| S-R | Lado A, rio: série de azuis consecutivas; conta de uma ponta à outra pelo caminho mais curto; 1 a 6 peças: 0, 2, 5, 8, 11, 15; mais 4 por peça depois da 6ª; só o melhor rio pontua | [BR p. 8] | "Você só pontua seu melhor Rio" | verificada (valores na ilustração) |
| S-R2 | Rio com braços: caminho mais curto entre as duas pontas; rio em anel: escolhe-se uma peça de partida e conta-se até a diretamente oposta | [FAQ Libellud] "choose a starting token, then identify the token directly opposite it" | verificada |
| S-K3 | Cinza ou marrom com vermelha em cima é base de construção e deixa de contar como montanha ou árvore | [BR p. 6 nota; p. 8 definições] | interpretada: a nota diz que a vermelha sobre a cinza desfaz o padrão; montanha é "pilha formada por 1, 2 ou 3 peças cinza" |
| S-K4 | Vermelha sozinha no chão não pontua em nenhuma categoria, mas conta como cor vizinha | [BR p. 8] | interpretada pela definição ("posicionada sobre") e pela regra das cores vizinhas ("das 6 disponíveis, incluindo vermelhas") |
| K11 | Cubos de animais esgotados: usar substitutos, quantidade ilimitada | [FAQ Libellud] "the number of cubes is effectively unlimited" | verificada |
| S-I | Lado B, ilhas: cada espaço ou grupo de espaços separado dos outros por peças azuis é uma ilha; 5 pontos por ilha; sempre pelo menos 1 ilha | [BR p. 8] | "Você sempre tem pelo menos 1 Ilha" | verificada |
| S-I2 | Espaços vazios contam como parte da ilha | [BR p. 8, ilustração] | as ilhas do exemplo de Bento têm espaços vazios | interpretada: a definição fala em "espaço", e o exemplo inclui espaços sem peça |
| S-AN | Carta de animal, completa ou não: vale o número do espaço mais alto sem cubo; com todos os cubos, 0; sem outra penalidade | [BR p. 9] | "o espaço mais acima sem um Cubo de Animal" | verificada |
| S-EX | Exemplo do manual: paisagens 53 (árvores 4, montanhas 7 + 1 + 1 + 1 + 0 = 10, com uma isolada; campos 10, com uma amarela sozinha que vale 0; construções 10, rio 19), animais 63, total 116 | [BR p. 9] | "total de 116 pontos" | verificada e recalculada em `contas.py` |

### Variantes (p. 10 e 11) e errata

| # | Regra | Fonte | Classe |
|---|---|---|---|
| E1 | Espíritos da natureza: 2 cartas viradas para baixo por jogador; no primeiro turno, olhar, escolher 1, pôr acima do tabuleiro virada para cima, devolver a outra à caixa e pôr um cubo de espírito na escolhida; mesmas regras de posicionamento dos cubos de animais | [BR p. 10] | verificada |
| E2 | A carta de espírito conta no limite de 4 até ser completada | [BR p. 10] | verificada |
| E3 | Pontua no fim como as cartas de animais, só se o cubo foi posto, sem penalidade; os pontos dependem da regra da carta e das paisagens do fim | [BR p. 10] | verificada |
| E4 | Errata: na carta de espírito da Cegonha, a pontuação "4" vale "6" | [Errata v1.0] | verificada |
| S1 | Solo: lado Solo do tabuleiro central (3 espaços); só 3 cartas de animais abertas | [BR p. 11] | verificada |
| S2 | Solo, fim de cada turno: devolver as 6 peças restantes à caixa (descartadas) e reabastecer os 3 espaços com 3 peças; se não pegou carta, pode descartar 1 carta da fileira e repor pela pilha | [BR p. 11] | verificada |
| S3 | Solo: resultado em sóis pela tabela (pontos, lado do tabuleiro, espírito escolhido); exemplo 130 pontos, lado A, Espírito do Leão: 7 sóis | [BR p. 11] | verificada; o tutorial remete à tabela da p. 11 em vez de reproduzi-la |

### Erros comuns

Fontes independentes não foram consultadas para levantar erros. Os `[!atencao]` do tutorial vêm de pontos que o próprio manual reforça com nota (cubo definitivo, p. 6; peça em vários habitats, p. 6; limite de 4 cartas, p. 5 e 6) e de regras com restrição pouco intuitiva (montanha isolada vale 0; campo grande vale 5; construção conta só a peça de cima; carta pega cubos de uma vez).

## 5. Divergências entre edições

- Manual brasileiro e inglês conferidos nos pontos de fim de partida, empate e empilhamento: mesmo conteúdo.
- A errata só muda o valor de uma carta de espírito (Cegonha). Entra em `[!edicao]` no tutorial.
- A Libellud publica também um PDF de regras em português (`LIBELLUD_HARMONIES_RULES_BR_compressed.pdf`), não baixado: a fonte é o arquivo da editora brasileira.

## 6. Plano e ordem do tutorial

- **Montar a mesa** (seção `setup`): os 6 passos da p. 2 e 3, com figura recortada da ilustração de preparação em cada um, a foto oficial dos componentes da Libellud, a tabela por número de jogadores (2 a 4 e solo), o que fica na caixa, conferência e pergunta.
- **Comece a jogar em 4 minutos:** ideia do jogo, remissão à montagem, o primeiro turno (pegar as 3 peças de um espaço e empilhar), exemplo resolvido, complete e sua vez, "Ainda não precisa saber", fim da partida, vídeo, erros mais caros.
- **Etapa 1: peças e paisagens.** Pegar e posicionar, empilhamento, reabastecer. Depende só da montagem.
- **Etapa 2: animais.** Carta de animal, cubos, padrão girado, cubo definitivo. Depende do empilhamento (alturas).
- **Etapa 3: fim e pontuação.** Fim, as seis categorias, rio e ilhas, carta de animal, desempate, exemplo completo do manual e um exemplo próprio recalculado.
- Situações especiais: espíritos da natureza, errata, solo, lacunas.

Decisões de carga: o "Comece" não ensina pontuação (só a frase do fim) nem animais; a etapa 1 já diz quanto vale cada paisagem numa tabela curta, porque o empilhamento só faz sentido com o valor de cada altura, e a etapa 3 retoma com as restrições (adjacência, cores vizinhas, rio). O lado B fica em `[!mais]` porque o manual recomenda o lado A nas primeiras partidas.

## 7. Portões automáticos

Resultado registrado em `auditoria.md`, seção 5.
