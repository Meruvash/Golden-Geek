# Dossiê: Como Jogar Sushi Go!

Entrega 1 da linha COMO JOGAR para *Sushi Go!* (jogo base de cartas da Gamewright, edição brasileira da Devir; não o Sushi Go Party!). Produzido entre 06 e 08/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; jogo leve: 3.500 a 4.500 palavras e 3 etapas; exercícios de múltipla escolha; essencial à vista e `[!mais]`; seção de montagem com figura do manual em cada passo que puder ser mostrado; figuras do manual e vídeo). Rotina diária de 06/11/2026 (retomada em 08/11/2026, depois de uma pausa por limite de uso; data do JSON: 2026-11-08, a pedido do coordenador).

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. Sushi Go!, de Paul Walker-Harding, ilustrações de Nan Rangsima, Gamewright (© 2014). No Brasil, Devir (p. 11 do manual; página do produto https://devir.com.br/sushi-go/).
- **Resenha no site:** não existe pasta `sushi-go/` nem `conteudo/sushi-go.json`; logo `"resenha": null`.
- **Fotos:** `como-jogar/sushi-go/fotos/` foi criada por outro agente (skill imagens): `capa-1.webp` e `componentes-1.webp`, Gamewright, crédito "Imagem: Gamewright" (`fotos/fontes.json`). A de componentes entrou na montagem; o conversor usa as duas no rodízio.
- **Procura (08/11/2026):** autocompletar do Google (`client=firefox&hl=pt-BR`, "como jogar sushi go"): como jogar sushi go, como jogar sushi go party. YouTube (`client=youtube&ds=yt`): as mesmas duas. O Party é outro jogo; o tutorial avisa isso no topo e na seção 0.
- **Complexidade:** uma ação por turno (escolher e passar), dois efeitos (wasabi, hashis), oito regras de pontuação, pudins no fim e duas variantes. Jogo leve: três etapas.

## 2. Fontes

| Fonte | Arquivo | URL | Data |
|---|---|---|---|
| **Manual da edição brasileira** (Devir; "Tradução: Equipe Devir", "Design gráfico: Bascu", "©2014 Gamewright"; arquivo `sushi-go.pdf`, criado no InDesign CC 2017, CreationDate 25/04/2018, ModDate 28/01/2019). 12 páginas de 216 x 306 pt, 477.639 bytes, com camada de texto | `<scratchpad>/d1106/sushi-go/dl/sushi-go-devir.pdf`; páginas renderizadas em `img/p-NN.png` (200 dpi) e `hi/p-NN.png` (400 dpi, p. 2 a 8); **texto extraído por página em `texto/p01.txt` a `texto/p12.txt`** (`pdftotext -layout`) | Página do produto https://devir.com.br/sushi-go/ ("Download do manual: Sushi go!"); arquivo https://devir.com.br/wp-content/uploads/2016/09/sushi-go.pdf (HTTP 200, sem login) | 06/11/2026 |
| Página do produto na Devir (jogadores "2 a 5", idade "acima de 8 anos", duração "15 minutos", componentes, prêmios) | `dl/produto.html` | https://devir.com.br/sushi-go/ | 06/11/2026 |
| Foto oficial dos componentes (Gamewright, edição em inglês) | `como-jogar/sushi-go/fotos/componentes-1.webp` | https://gamewright.com/product/Sushi-Go | 06/11/2026 (baixada por outro agente) |
| **Vídeo** "DEVIR BRASIL I Sushi Go! - regras rápidas", canal Devir TV Brasil (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=yBhsS6p03Zk | 08/11/2026 |

Caminho completo do texto extraído: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/sushi-go/texto/p01.txt` a `p12.txt`.

**Como os arquivos foram obtidos.** `curl` com User-Agent `EliteBoardgamersBot/1.0 (+https://eliteboardgamers.com.br; robo de pesquisa)`. O `robots.txt` da Devir bloqueia `/wp-content/` em geral, mas tem `Allow: /wp-content/uploads/`, onde está o PDF. Busca no site da Devir (`/?s=sushi+go`): páginas "Sushi Go!", "Sushi Go Party!" e uma postagem de 2025 ("Devir 25 anos de jogos: Sushi Go"), o que confirma que a Devir segue com o título.

**Paginação.** O PDF não imprime número de página. O guia conta a capa como p. 1: p. 2 conteúdo e preparação; p. 3 jogando uma rodada e wasabi; p. 4 hashis e fim da rodada; p. 5 maki; p. 6 tempurá, sashimi, gyoza; p. 7 nigiri e wasabi, hashis, começando uma nova rodada; p. 8 fim do jogo e pudins; p. 9 vencedor, variantes; p. 10 fim da variante de 2 jogadores; p. 11 créditos; p. 12 resumo das regras.

**Não obtido:** o manual em inglês da Gamewright. O `robots.txt` de gamewright.com tem `Disallow: /pdfs/` e `Disallow: /gamewright/`, onde a editora guarda os PDFs de regras; não foi baixado. Não há FAQ ou errata no site da Devir. Nada foi tirado de fórum, resenha ou vídeo.

## 3. Glossário (edição brasileira, Devir)

| Termo no manual | Original (não conferido: manual em inglês não baixado) | Página | Explicação |
|---|---|---|---|
| rodada (ronda) | round | p. 3 | Uma das 3 partes do jogo; termina quando as mãos acabam |
| turno | turn | p. 3 | Escolher, revelar e passar uma vez |
| mão | hand | p. 2 e 3 | As cartas que você segura e passa |
| pilha de compra | draw pile / deck | p. 2, 7, 8 | Cartas que sobram depois de dar; servem às novas mãos |
| baixar | | p. 4 | Pôr a carta na mesa, na sua frente |
| tempurá | tempura | p. 2, 6 | Par vale 5 |
| sashimi | sashimi | p. 2, 6 | Trio vale 10 |
| gyoza | dumpling | p. 2, 6 | 1, 3, 6, 10, 15 |
| maki (1), (2), (3); rolinhos maki; símbolos de maki | maki roll | p. 2, 5 | Maioria de símbolos: 6 e 3 |
| nigiri de salmão, de lula, de ovo | salmon, squid, egg nigiri | p. 2, 7 | 2, 3 e 1 ponto |
| wasabi | wasabi | p. 3, 7 | Triplica o próximo nigiri |
| hashis (carta de hashis; o manual também escreve "carta de hashi") | chopsticks | p. 4, 7 | Baixar 2 cartas num turno futuro. O tutorial usa sempre "carta de hashis" |
| "Sushi Go!" | | p. 4 | O que se diz ao usar os hashis |
| pudim | pudding | p. 2, 8 | Mais: +6; menos: -6, no fim do jogo |
| placar | | p. 2 | Papel e caneta, um jogador anota |
| jogador fictício | dummy player | p. 9 e 10 | Terceiro jogador da variante de 2 |

A foto da Gamewright mostra o texto das cartas em inglês: "CHOPSTICKS SWAP FOR 2" na carta de hashis, enquanto a carta brasileira diz "HASHIS ESCOLHA DOIS" (p. 4). Sem o manual em inglês, o guia não tira conclusão de regra disso; a legenda da foto avisa que é a edição em inglês.

## 4. Base de regras

Classificação: V = verificada (lida nesta sessão), I = interpretada (motivo dado), L = lacuna.

| # | Regra | Fonte e frase lida | Cl. | Depende de |
|---|---|---|---|---|
| R1 | 2 a 5 jogadores, 8+, 15 min | página do produto ("Jogadores: 2 a 5", "acima de 8 anos", "15 minutos") | V | |
| R2 | 108 cartas: 14 tempurá, 14 sashimi, 14 gyoza, 12 maki (2), 8 maki (3), 6 maki (1), 10 salmão, 5 lula, 5 ovo, 10 pudim, 6 wasabi, 4 hashis | p. 2 "108 CARTAS"; soma conferida no script | V | |
| R3 | Embaralhar todas e dar 10/9/8/7 cartas com 2/3/4/5 jogadores | p. 2 "Com 2 jogadores, dê 10 cartas" | V | R2 |
| R4 | Mão escondida dos oponentes | p. 2 "escondendo-as de seus oponentes" | V | R3 |
| R5 | Resto virado para baixo numa pilha no centro | p. 2 "virada para baixo em uma pilha no centro da mesa" | V | R3 |
| R6 | Papel e caneta; escolher quem anota | p. 2 "escolha um jogador para anotar o placar" | V | |
| R7 | Jogo de 3 rodadas | p. 3 "O jogo tem a duração de 3 rodadas" | V | |
| R8 | Todos escolhem simultaneamente 1 carta e a põem na frente, virada para baixo; depois todos revelam | p. 3 "escolhem simultaneamente 1 carta" | V | R7 |
| R9 | Depois de revelar, passar o resto, virado para baixo, para a esquerda; novo turno | p. 3 "para o jogador da esquerda" | V | R8 |
| R10 | Cartas viradas para cima ficam até o fim da rodada; ajuda agrupar | p. 3 "NOTA" | V | R8 |
| R11 | Nigiri escolhido com wasabi já na frente deve ir sobre o wasabi | p. 3 "esse nigiri deve ser colocado sobre o wasabi" | V | R8 |
| R12 | Vários wasabis possíveis; 1 nigiri por wasabi | p. 3 "somente 1 carta de nigiri pode ser colocada em cada wasabi" | V | R11 |
| R13 | Nigiri baixado antes do wasabi não passa para cima dele | p. 3 "já tem uma carta de wasabi"; carta "PRÓXIMO NIGIRI x3" (p. 3 e 12) | I (dedução direta do "já tem" e de "próximo"; não há frase que trate do caso inverso) | R11 |
| R14 | Hashis: se já tem um na frente, pode baixar 2 cartas num turno futuro; escolher a primeira, dizer "Sushi Go!" e baixar a segunda antes da revelação | p. 4 "diga \"Sushi Go!\" e baixe a segunda carta" | V | R8 |
| R15 | Hashis volta para a mão antes de passar e é passado | p. 4 "pegue a carta de hashi de volta da mesa para a sua mão" | V | R14 |
| R16 | Vários hashis na frente, 1 por turno | p. 4 "só pode usar 1 por turno" | V | R14 |
| R17 | Última carta passada é baixada com as outras | p. 4 "simplesmente baixe-a" | V | R9 |
| R18 | Fim da rodada: pontuar as cartas coletadas | p. 4 "Agora pontue as cartas que você coletou" | V | R17 |
| R19 | Maki: soma de símbolos; maior 6; empate no maior divide 6, sobra perdida, segundo lugar nada; segundo 3, empate divide 3 | p. 5 | V | R18 |
| R20 | Exemplo do maki: 5, 3, 3, 2 dá 6, 1, 1, 0 | p. 5 "marcando 1 ponto cada" | V | R19 |
| R21 | Tempurá: par 5; uma sozinha 0; vários pares | p. 6 | V | R18 |
| R22 | Sashimi: trio 10; 1 ou 2 valem 0; vários trios | p. 6 | V | R18 |
| R23 | Gyoza: 1, 3, 6, 10, 15 (5 ou mais) | p. 6, tabela | V | R18 |
| R24 | Nigiri: lula 3 (9 com wasabi), salmão 2 (6), ovo 1 (3); wasabi sem nigiri 0 | p. 7 | V | R11 |
| R25 | Hashis vale 0 | p. 7 "Uma carta de hashi não vale nada" | V | |
| R26 | Nova rodada: anunciar pontuação; descartar cartas da mesa menos pudins; nova mão igual à anterior, da pilha de compra | p. 7 | V | R18 |
| R27 | Pilha de compra só é usada para dar as mãos | p. 2 e 7 (nenhuma regra manda comprar durante a rodada) | I (dedução: o manual não proíbe com essas palavras) | R5, R26 |
| R28 | Fim: depois da terceira rodada, cartas restantes da pilha são ignoradas; pontuar pudins | p. 8 | V | R7 |
| R29 | Pudim: mais +6 (empate divide, sobra perdida); menos, incluindo zero, -6 (empate divide os negativos) | p. 8 | V | R28 |
| R30 | Exemplo do pudim: Carla 4, Paulo 3, Luísa e Ana 0: Carla +6; as duas dividem os pontos negativos, 3 cada | p. 8 | V (com erro de redação no manual: "Lise" e "ficando com 3 pontos cada"; o guia usa Luísa e "perde 3", pela regra logo acima) | R29 |
| R31 | Ninguém com pudim: ninguém pontua pudim | p. 8 | V | R29 |
| R32 | Com 2 jogadores, ninguém perde por menos pudins; só +6 | p. 8 "NOTA" | V | R29 |
| R33 | Vence quem tem mais pontos; empate: mais pudins | p. 9 | V | R29 |
| R34 | Variante: passar para a esquerda nas rodadas 1 e 3, para a direita na 2 | p. 9 | V | R9 |
| R35 | Variante de 2: jogador fictício; dar como para 3 (9 cartas); pilha do fictício virada para baixo entre você e a pilha de compra; quem controla pega a do topo, escolhe 1 para si e 1 para o fictício; adversário joga 1; revelar e passar ao outro; controle alterna; até a pilha do fictício acabar; 3 rodadas, regras normais | p. 9 e 10 | V | R3 a R9 |
| R36 | Na variante, as cartas escolhidas para o fictício ficam na frente dele e pontuam como as de um jogador | p. 9 "terceiro jogador fictício"; p. 10 "pontue de acordo com as regras normais" | I | R35 |
| R37 | Hashis usados para baixar wasabi e nigiri no mesmo turno | manual não diz | L (o tutorial manda combinar antes) | R11, R14 |
| R38 | Todos com o mesmo número de pudins, acima de zero | manual não diz | L (só no dossiê; cortado do tutorial por extensão) | R29 |
| R39 | Empate em pontos e em pudins | manual não diz | L (só no dossiê; cortado do tutorial por extensão) | R33 |
| R40 | Quem começa | o manual não tem primeiro jogador: escolha simultânea (p. 3) | V (o tutorial diz "ninguém") | R8 |
| R41 | Hashis no último turno (só 1 carta na mão) | manual não trata; com uma carta não há segunda | não entrou no tutorial | R14, R17 |

## 5. Ambiguidades e escolhas

- R13 entrou como `[!atencao]` e na avaliação (questão 3). É leitura direta do texto ("já tem" e "próximo nigiri"), mas não há frase que trate do caso inverso; o auditor deve confirmar se aceita como regra.
- R27: na montagem e no Comece, "a pilha de compra só serve para dar as mãos de cada rodada (p. 2 e 7)".
- R30: o exemplo do manual tem o nome "Lise" no lugar de "Luísa" e diz "ficando com 3 pontos cada" sem o sinal negativo. O tutorial reconta o exemplo pela regra (cada uma perde 3), sem bloco sobre o erro de redação (cortado por extensão).
- R36, R37: em `[!edicao]` com "o guia lê" ou "combinem antes".
- Exclamação: o nome "Sushi Go!" tem ponto de exclamação. A seção "Comece a jogar" foi escrita sem citar o nome, para não disparar o aviso do `checar_comece.py`.

## 6. Diferenças entre edições

Só a edição brasileira da Devir foi lida. O manual em inglês da Gamewright não foi baixado (pasta bloqueada no `robots.txt`). A foto da Gamewright mostra a carta de hashis em inglês com "SWAP FOR 2", e não "pick two"; isso sugere que a edição atual em inglês pode ter mudado a redação ou a regra dos hashis, mas não foi conferido. O tutorial segue a Devir e não afirma nada sobre o inglês além de que o texto das cartas está em inglês na foto. O Sushi Go Party! é outro jogo; não foi lido.

## 7. Erros comuns (sem fonte de comunidade)

Os erros dos blocos `[!atencao]` vêm de destaques do próprio manual (revelar juntos, passar para a esquerda, cartas que ficam até o fim da rodada, "próximo nigiri", empate no maki que zera o segundo lugar), não de fórum.

## 8. Plano instrucional e decisões de carga

- Classes de tarefa: (1) montar e jogar o primeiro turno (Comece em 4 minutos); (2) turnos com wasabi e hashis, até o fim da rodada (etapa 1); (3) pontuar uma rodada inteira (etapa 2); (4) três rodadas, pudins e o vencedor (etapa 3).
- Apoio decrescente em cada etapa: exemplo resolvido (os exemplos do manual para maki e pudim, além de exemplos próprios conferidos em script), complete, sua vez.
- Adiado: wasabi e hashis (etapa 1; o Comece só os nomeia, porque podem ser escolhidos no primeiro turno); pontuação (etapa 2); nova rodada e pudins (etapa 3); variantes (Situações especiais).

## 9. Extensão

`wc -w` do tutorial: 4.754 (com marcação, opções e explicações); 4.359 pela contagem `\w+` sem URLs. Dentro do alvo de 3.500 a 4.500 para jogo leve pela contagem `\w+` (a mesma usada no dossiê de The Mind). A primeira versão tinha 5.210 (`wc`); saíram um exemplo resolvido do maki, um treino de gyoza, uma pergunta da etapa 1 e outra da etapa 3, um `[!atencao]` repetido de cada etapa, o bloco sobre o erro de redação do exemplo dos pudins e dois `[!edicao]` de lacuna (R38, R39).

## 10. Contas

Script: `<scratchpad>/d1106/sushi-go/scripts/contas.py` (rodado em 08/11/2026). Resultados usados no texto:

- Componentes: 108 cartas; 54 símbolos de maki.
- Tabela da montagem: 2 jog. 10 cartas, 88 na pilha, 60 usadas nas 3 rodadas; 3 jog. 9, 81, 81; 4 jog. 8, 76, 96; 5 jog. 7, 73, 105. Turnos por rodada iguais às cartas na mão.
- Comece: 4 jog., 8 cartas, passa 7; 3 jog., passa 8.
- Etapa 1: hashis com mão de 4 (sashimi, sashimi, gyoza, maki 2) e 1 sashimi na frente: 3 sashimis = 10; passa 3 cartas (gyoza, maki 2, hashis). Dois wasabis: salmão 6 + ovo 3 = 9.
- Etapa 2, rodada de 4 jogadores (8 cartas cada, conferidas): Ana 17 (tempurá 5, gyoza 3, lula com wasabi 9), Bruno 12 + 3 de maki = 15, Carla 6, Davi 7 + 3 de maki = 10. Maki: Ana 3, Bruno 4, Carla 1, Davi 4: Bruno e Davi 3 cada, segundo lugar nada.
- Etapa 2, complete: 4 gyozas 10 + 5 tempurás 10 + salmão 2 = 22. Sua vez: 5 sashimis = 10; três empatados com 4 símbolos = 2 cada, Davi 0.
- Etapa 3: pudins do manual (Carla +6, Luísa -3, Ana -3); 5 jog. (3, 3, 1, 1, 0): Ana e Bruno +3, Eva -6; 2 jog. (1 e 3): só +6 para quem tem 3. Partida a três: Ana 58 + 6 = 64, Bruno 60 - 6 = 54, Carla 56.
- Avaliação: 3 tempurás + 4 gyozas = 15; maki 6, 4, 4: Ana 1; pudins 2, 2, 0: +3, +3, -6.

## 11. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/sushi-go/tutorial.md`: "seção Comece a jogar dentro da diretriz", sem aviso.
- Travessão e meia-risca: 0.
- `tools/vicios.py` (lista `VICIOS` aplicada ao texto): 0 ocorrências.
- Prévia gerada com `tools/como_jogar_md.pagina` no scratchpad (`<scratchpad>/d1106/sushi-go/previa.html`), sem tocar no build: 6 figuras do manual, a foto de componentes na montagem, fotos em rodízio, vídeo; "Leitura do essencial: cerca de 4 min".
- Legibilidade: não medida (o `legibilidade.py` é de outro repositório).

## 12. Figuras e vídeo

Recortes da parte gráfica do manual (só as cartas, sem blocos de texto), renderizados a 400 dpi, `.webp` qualidade 80, em `como-jogar/sushi-go/figuras/`. As ilustrações são rasters de baixa resolução no PDF; os recortes ficam um pouco borrados (é o original).

| Arquivo | Página | Mostra | Onde entra |
|---|---|---|---|
| `setup-1-cartas.webp` | 2 | Tempurá, nigiri de salmão e gyoza, como decoram a página de preparação (inclui as faixas roxas de título da página, sem texto) | Montagem, passo 1 |
| `nigiri-wasabi.webp` | 7 | Nigiri de salmão e wasabi | Etapa 1, wasabi |
| `hashis.webp` | 4 | Carta de hashis | Etapa 1, hashis |
| `tempura-sashimi-gyoza.webp` | 6 | As três cartas, reorganizadas lado a lado (no manual estão uma embaixo da outra) | Etapa 2 |
| `maki.webp` | 5 | Três cartas de maki (2, 3 e 1 símbolos) | Etapa 2 |
| `pudim.webp` | 8 | Carta de pudim | Etapa 3 |

Foto: `fotos/componentes-1.webp` (Gamewright, crédito "Imagem: Gamewright" de `fotos/fontes.json`), na lista de componentes da montagem, com aviso de que é a edição em inglês.

Passos da montagem sem ilustração no manual: 2 (dar as cartas), 3 (mão escondida), 4 (pilha de compra) e 5 (placar). O manual não tem ilustração de mesa montada.

Vídeo: busca no canal Duque Board Games (`/@DuqueBoardgames/search?query=sushi go`, `Accept-Language: pt-BR`): só "SUSHI GO! - Vale ou Não a Pena ?" (oEmbed: Duque Board Games), que é opinião, não regras. A busca no canal da Devir (`/@DevirBrasil/search?query=sushi go`) achou "DEVIR BRASIL I Sushi Go! - regras rápidas" (oEmbed: Devir TV Brasil), canal da editora brasileira, segunda preferência do padrão. A busca geral do YouTube (`/results`) não foi usada: está bloqueada no `robots.txt`. Nenhum quadro baixado; sem vídeo dentro das etapas (tempos não conferidos).

## 13. Dados do `conteudo/como-jogar/sushi-go.json`

Jogadores, idade e duração: página do produto na Devir. Edição: "Edição Devir" (créditos na p. 11 do manual; PDF no site da Devir). `resenha`: null (não há resenha). `etapas`: 3. `leitura_min`: 22 (4.359 palavras a cerca de 200 por minuto; o topo da página mostra separadamente a leitura do essencial, cerca de 4 min). `data`: 2026-11-08 (pedido do coordenador). `publicar`: false até a auditoria independente.
