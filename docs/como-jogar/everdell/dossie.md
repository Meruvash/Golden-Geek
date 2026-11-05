# Dossiê: Como Jogar Everdell

Entrega 1 da linha COMO JOGAR para *Everdell* (jogo base, Starling Games / Tabletop Tycoon; no Brasil, Galápagos / Asmodee Brasil). Produzido em 05/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e o pedido do dia (jogo médio: 4.500 a 6.000 palavras, 3 ou 4 etapas; seção de montagem com figura do manual em cada passo; figuras em `como-jogar/everdell/figuras/`; sem pasta `fotos`).

## 1. Escolha do jogo e procura real

O jogo veio escolhido. Procura conferida em 05/11/2026 no autocompletar (robô identificado, sem se passar por navegador):

- Google (`client=firefox&hl=pt-BR&q=como+jogar+everdell`): "como jogar everdell", "como jogar everdell duo", "como jogar everdell farshore", "como jogar my lil everdell", "como jogar bem vindos a everdell".
- YouTube (`client=youtube&ds=yt`): "como jogar everdell", "... duo", "... farshore", "... silverfrost".

Editora brasileira: a ordem do pedido citava Meeple BR "ou outra editora: confira". O mapa de produtos da Meeple BR (`meeplebr.com/meeple_product-sitemap.xml`, 310 endereços) não tem Everdell. A editora brasileira é a **Galápagos** (marca da Asmodee Brasil): a página do produto EVE001 da loja da Asmodee Brasil traz "brand: Galápagos", e a biblioteca de downloads tem a linha "EVE - Everdell" (jogo base EVE001 e expansões EVE002 a EVE401). A ficha da Ludopedia respondeu 403 ao robô e não foi contornada.

## 2. Fontes

| Fonte | Versão e identificação | Onde | Data |
|---|---|---|---|
| **Livro de regras brasileiro** (fonte das páginas citadas), Galápagos | Arquivo `EVE001_regras_v2.0.pdf`, 24 páginas (538,6 x 680,3 pt), criado em 03/10/2023 (InDesign 18.5); tradução de Jana Pin; revisão de Evelyn Trippo, Ivar Junior, Luciana Galeani Boldorini e Thiago Cabello; © 2018-2021 Tabletop Tycoon (p. 23); sha256 7ba280b5…ddbd59 | Biblioteca de Downloads, https://www.asmodee.com.br/download-library, item 1739 "EVE001 - Everdell - SKU: EVE001", etiqueta Regras; arquivo pela API pública `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=1739&tagId=2&group=b2c` (ZIP, HTTP 200, sem login). O item antigo 445 da mesma linha respondeu 404 ("blob does not exist"). | Baixado e lido em 05/11/2026 |
| **Errata oficial** Galápagos | Arquivo `EVE001_ERRATA_v2.0_10-23.pdf`, 3 páginas A4, "v.2.0 - 10/23"; sha256 a4260e18…ee77 | Mesmo item 1739, etiqueta Errata (`tagId=1`) | Baixada e lida em 05/11/2026 |
| Página do produto EVE001, Asmodee Brasil | API pública da loja `ccstore/v1/products/EVE001`: 1 a 4 participantes, faixa etária 14+, tempo de partida 60-120 min, marca Galápagos | https://www.asmodee.com.br/jogo-de-tabuleiro-everdell/produto/EVE001 | 05/11/2026 |
| Manual original em inglês, Tabletop Tycoon | `Everdell_Core_Game_Rulebook-web_res.pdf`, 24 páginas, só imagem (sem camada de texto), imagens a 72 ppi; sha256 fa7e2149…a945 | Link da página do produto https://tycoongames.com/products/everdell-standard-edition-3rd-edition (CDN da Shopify) | Baixado em 05/11/2026; usado só para comparar a página de Eventos (p. 8 do inglês) |
| Vídeo | "Everdell - Regras & Gameplay Ao Vivo", canal Covil dos Jogos (oEmbed oficial) | https://www.youtube.com/watch?v=Jbjsdd9eHdQ | 05/11/2026 |

Texto extraído do manual, por página: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/everdell/manual/paginas/regras-p01.txt` a `regras-p24.txt` (pdftotext -layout) e `errata-p1.txt` a `errata-p3.txt`. A p. 1 da errata tem texto sobreposto; a leitura certa saiu com `pdftotext -raw`. Páginas renderizadas: `.../manual/png/p-NN.png` (100 dpi) e `.../manual/r200/` (200 dpi). PDFs fora do repositório, em `.../manual/`.

Vídeo: a busca do canal Duque Board Games (`/@DuqueBoardgames/search?query=everdell`) só trouxe "EVERDELL - Vale ou Não a Pena ?" (opinião, não regras) e as gameplays de Everdell Duo e Silverfrost, que são outros jogos. A Galápagos não tem canal achado pelos endereços testados; o Romir Play House não tem Everdell. O Covil dos Jogos tem "Everdell - Regras & Gameplay Ao Vivo", confirmado pelo oEmbed. Nenhum segundo foi conferido; não há vídeo dentro das etapas.

## 3. Glossário (edição brasileira)

| Termo da caixa brasileira | Original | Página | Explicação |
|---|---|---|---|
| Árvore Perene de Ever | Ever Tree | 5, 6 | Peça 3D no toco do tabuleiro; guarda o baralho, os Eventos especiais (galhos de baixo) e os trabalhadores das estações (galhos de cima). Também nome de uma Construção (p. 20). |
| trabalhador | worker | 4, 6, 8 | Peão do jogador; 6 por cor. |
| gravetos, cristais (cristal de resina), seixos, frutos | twigs, resin, pebbles, berries | 5 | Os quatro recursos. |
| estoque geral | general supply | 5, 7 | Pilhas comuns de recursos e fichas. |
| fichas de pontuação | point tokens | 4 | De 1 e de 3 pontos. |
| ficha de Ocupado | occupied token | 4, 10 | Marca a Construção que já deu a Criatura gratuita. |
| local exclusivo / compartilhado | exclusive / shared | 8 | Círculo fechado: 1 trabalhador; círculo incompleto: vários. |
| Locais Básicos de Ação | basic locations | 8 | Os 8 locais impressos na faixa abaixo do rio. |
| cartas de Floresta / locais de Floresta / clareiras | Forest cards | 5, 6, 8 | Locais variáveis nas clareiras. |
| Refúgio | Haven | 9 | Local compartilhado: 1 recurso a cada 2 cartas descartadas. |
| Jornada | Journey | 9 | Só no outono; descarta cartas iguais aos pontos. |
| Evento básico / Evento especial | basic / special Event | 4, 5, 9 | Peças de 3 pontos no rio; cartas nos galhos de baixo. |
| Campina | Meadow | 3, 6 | 8 cartas abertas no centro do tabuleiro. |
| baralho principal / pilha de descarte | deck / discard pile | 6, 7, 11 | Descarte virado para baixo. |
| vila | city | 11 | Até 15 espaços. |
| Criatura / Construção | Critter / Construction | 10 | Os dois tipos de carta. |
| Comum / Singular | Common / Unique | 10 | Várias cópias / uma cópia na vila. |
| Criatura gratuita | free critter | 10 | Criatura sem custo quando a Construção indicada está na vila. |
| Viajante (bronze), Produção (verde), Destino (vermelha), Regulamentação (azul), Prosperidade (roxa) | Traveler, Production, Destination, Governance, Prosperity | 11 | Cores das cartas. |
| símbolo ABERTO | OPEN | 9, 11 | Destino que os adversários podem visitar. |
| Alocar um Trabalhador / Jogar uma Carta / Preparar-se para a Estação | Place a Worker / Play a Card / Prepare for Season | 3, 8 | As três ações. |
| primavera, verão, outono | spring, summer, autumn | 13 | Estações. |
| Produção | Production | 11, 13 | Ativação das cartas verdes na primavera e no outono. |
| passar a vez | pass | 14 | Encerrar a própria participação. |

Termo do tutorial que não está impresso: "círculo fechado" e "círculo aberto" (o manual diz "círculo incompleto" para o compartilhado e mostra o fechado na ilustração, p. 8).

## 4. Base de regras

Classificação: `[verificada]` lida no manual nesta sessão; `[interpretada]` leitura escolhida com motivo; `[lacuna]` o manual não diz.

### 4.1 Componentes e preparação

| # | Regra | Fonte | Classe |
|---|---|---|---|
| S1 | Componentes e quantidades (tabela do tutorial) | [BR p. 4 e 5] "24 trabalhadores (6 por Jogador)", "128 cartas de Criatura e de Construção" | verificada |
| S2 | Tabuleiro na mesa; árvore no toco do topo | [BR p. 6] "Coloque a Árvore Perene de Ever no toco" | verificada |
| S3 | Montagem da árvore | o manual não explica; p. 5 mostra as peças e a árvore pronta | lacuna (dito assim no tutorial) |
| S4 | Recursos em pilhas ao longo do rio; fichas de pontuação e Ocupado ao lado | [BR p. 6] | verificada |
| S5 | Recursos sem limite; substituir se acabar | [BR p. 7] "use outra coisa em substituição" | verificada |
| S6 | Floresta: 3 cartas (2 jogadores), 4 (3 ou 4); resto na caixa | [BR p. 6] | verificada |
| S7 | 4 Eventos básicos no rio; 4 Eventos especiais nos galhos de baixo; resto na caixa | [BR p. 6] | verificada |
| S8 | 8 cartas na Campina; baralho dentro da árvore | [BR p. 6] | verificada |
| S9 | Pilha de descarte no recorte de baixo, virada para baixo | [BR p. 7] "Coloque aqui a pilha de descarte com as cartas viradas para baixo" | verificada |
| S10 | 2 trabalhadores iniciais; cartas 5/6/7/8 pela ordem | [BR p. 6] | verificada |
| S11 | 4 trabalhadores nos galhos de cima: 1 primavera, 1 verão, 2 outono | [BR p. 6] | verificada |
| S12 | Começa a pessoa mais humilde; sentido horário | [BR p. 6 e 8] | verificada |
| S13 | Ninguém recebe recursos na preparação | [BR p. 6] (nenhum passo dá recurso) | interpretada (leitura por ausência, como em Splendor) |
| S14 | Decidir quem começa antes de distribuir as cartas | ordem do manual põe "quem começa" depois do passo 6 | interpretada (necessidade prática) |
| S15 | Carta de vitória | [BR p. 5] só listada; nenhuma regra a usa | lacuna |
| S16 | Dado de 8 lados só no solo | [BR p. 4] "(para partidas no modo solo)" | verificada |

### 4.2 Alocar um trabalhador

| # | Regra | Fonte | Classe |
|---|---|---|---|
| A1 | Uma ação por turno, entre três; sentido horário | [BR p. 3 e 8] "apenas uma ação pode ser realizada por turno" | verificada |
| A2 | Exclusivo: 1 trabalhador; compartilhado (círculo incompleto): vários, até da mesma cor | [BR p. 8] | verificada |
| A3 | Colher na hora; trabalhador fica até Preparar-se | [BR p. 8] "até que você o traga de volta" | verificada |
| A4 | Os 8 locais básicos e o tipo de cada um | ilustração [BR p. 8]; o texto confirma "2 cartas e 1 ficha de 1 ponto" (p. 8) e os locais de 3 gravetos, 2 cristais, 1 seixo e "1 fruto e 1 carta" (modo solo, p. 16) | interpretada: o que cada local dá e se o círculo é fechado foi lido na ilustração de 100 ppi; os dois locais restantes (1 cristal e 1 carta; 1 fruto) e "2 gravetos e 1 carta" saem só da ilustração |
| A5 | Floresta: 1 trabalhador por local com 2 ou 3 jogadores; espaço com símbolo só com 4; nunca 2 seus na mesma | [BR p. 8] | verificada |
| A6 | Refúgio: compartilhado sem limite; 1 recurso por 2 cartas descartadas; descarte virado para baixo | [BR p. 9] | verificada |
| A7 | Ímpar de cartas no Refúgio: a carta sem par não rende | [BR p. 9] "1 recurso à sua escolha por cada 2 cartas" | interpretada (aritmética direta) |
| A8 | Limite de mão 8; comprar só até 8 | [BR p. 11] "Você nunca pode ter mais de 8 cartas" | verificada |
| A9 | Local com cartas e mão cheia: o resto do local vale | [BR p. 11] (o limite fala só de cartas) | interpretada |
| A10 | Comprar é do baralho, salvo instrução | [BR p. 11] | verificada |
| A11 | Dar cartas: a quem tem espaço; o máximo; descartar o resto | [BR p. 11] | verificada |
| A12 | Baralho vazio: embaralhe o descarte | [BR p. 11] | verificada |

### 4.3 Jogar uma carta

| # | Regra | Fonte | Classe |
|---|---|---|---|
| C1 | Pagar e devolver ao estoque geral; da mão ou da Campina | [BR p. 10] | verificada |
| C2 | Comum: várias cópias; Singular: uma | [BR p. 10] | verificada |
| C3 | Criatura custa frutos; gratuita com a Construção indicada; ficha de Ocupado; uma vez por Construção; ficha fica | [BR p. 10] | verificada |
| C4 | Vila: 15 espaços; Eventos não contam | [BR p. 11] | verificada |
| C5 | Campina reposta na hora; várias compradas: todas e depois repor | [BR p. 11] | verificada |
| C6 | Cinco cores e quando agem | [BR p. 11] | verificada |
| C7 | Sequência de 6 passos | [BR p. 11] | verificada |
| C8 | Andarilha não ocupa espaço; Marido e Esposa dividem um espaço | [BR p. 18] | verificada |
| C9 | Estalajadeiro, Guindaste, Masmorra não se combinam com outras habilidades | [BR p. 18 e 20] | verificada |
| C10 | Bobo da Corte na vila do adversário | [BR p. 18] | verificada |
| C11 | Custos e pontos de Fazenda (2 gravetos e 1 cristal; 1 ponto), Sapo Balseiro (2 frutos), Tribunal (1 graveto, 1 cristal, 2 seixos; 2 pontos; Singular; gratuita: Juíza), Juíza (3 frutos; 2 pontos) | [BR p. 12] texto; [BR p. 10 e 15] ilustrações | verificada (texto) e lida na ilustração (Tribunal, Juíza) |
| C12 | Efeitos: Fazenda, Sapo Balseiro, Tribunal, Juíza, Rei, Arquiteta, Esposa, Professor, Correio, Ruínas, Cemitério, Monastério | [BR p. 18 a 21] | verificada |

### 4.4 Estações, Destino, Eventos, Jornada

| # | Regra | Fonte | Classe |
|---|---|---|---|
| E1 | Preparar-se só com todos os trabalhadores alocados; trazer todos; receber os da estação e os bônus; turno acaba | [BR p. 3 e 12] "Se todos os seus trabalhadores estiverem alocados" | verificada |
| E2 | Primavera +1 e Produção; verão +1, até 2 da Campina, sem Produção; outono +2 e Produção | [BR p. 13] | verificada |
| E3 | Jogadores não se preparam ao mesmo tempo | [BR p. 12] | verificada |
| E4 | Outono é a última preparação | [BR p. 12] | verificada |
| D1 | Destino: trabalhador próprio; de outro com ABERTO, dono ganha 1 ponto | [BR p. 9 e 11] | verificada |
| V1 | Evento: cumprir exigência, pagar na hora, 1 jogador por Evento, ao lado da vila, trabalhador volta na estação seguinte; não se devolve | [BR p. 9] | verificada |
| V2 | Exigência do Grande Circuito: 3 Destinos | [BR p. 9] | verificada |
| V3 | Exigências dos outros três Eventos básicos | impressas no tabuleiro; ilegíveis nas ilustrações dos dois manuais | lacuna (o tutorial manda conferir na mesa) |
| V4 | Momento exato em que o Evento vai para o lado da vila | [BR p. 9] não diz | lacuna (o tutorial só diz que fica ao lado da vila) |
| J1 | Jornada só no outono; descartar cartas = pontos; 5/4/3 exclusivos, 2 compartilhado; vale no fim; vários trabalhadores | [BR p. 9] | verificada |
| J2 | Jornada vale pela estação do próprio jogador, não da mesa | [BR p. 9 e 12] | interpretada (cada um tem a sua estação) |

### 4.5 Fim e pontuação

| # | Regra | Fonte | Classe |
|---|---|---|---|
| F1 | Depois do outono, jogar até não poder ou não querer; passar; sem cartas ou recursos depois | [BR p. 14] | verificada |
| F2 | Dar a quem passou quando todos passaram: descartar | [BR p. 14] | verificada |
| F3 | Somar: base, fichas, bônus roxos, Jornada, Eventos | [BR p. 14] | verificada |
| F4 | Desempate: mais Eventos; depois mais recursos | [BR p. 14] | verificada |
| F5 | Exemplo: 22 + 14 + 10 + 4 + 12 = 62 | [BR p. 14 e 15] | verificada |

### 4.6 Erros comuns

Sem fonte de comunidade consultada (a Ludopedia bloqueou o robô). Os três "erros mais caros" vêm das regras que o próprio manual destaca em negrito ou com "Importante" (limite de mão, p. 11; jogadores não se preparam juntos, p. 12) e da regra de exclusivo (p. 8). É escolha editorial, não evidência de erro frequente.

## 5. Divergências entre edições e errata

- Errata v2.0 (10/2023): modo solo, passo 2 (Ragurto põe trabalhadores nas 4 cartas de cima da Campina) [p. 16]; Ruínas age só ao ser jogada [p. 21]; carta de Floresta "pagando menos 1 recurso"; Evento "Doutor, Pombo-Correio"; Andarilha "vila"; Escultor de Madeira "Despensa"; Cemitério "jogue 1 de graça". O livro v2.0 da biblioteca já traz o texto corrigido no solo (p. 16) e na Ruínas (p. 21); a errata vale para as cartas impressas.
- Manual em inglês: comparado só na página de Eventos (p. 8 do inglês): também não lista as exigências dos Eventos básicos além do Grand Tour. Não foi achada divergência de regra nas páginas comparadas.
- Modo solo fora do guia (só citado na abertura).

## 6. Plano instrucional

- **Montagem:** 15 passos na ordem da p. 6, com 9 recortes da ilustração das p. 4, 7 e 13.
- **Classe 0, "Comece em 4 minutos":** montar e alocar o primeiro trabalhador. Exemplo resolvido (Ana no local de 3 gravetos), complete (Bruno: exclusivo e compartilhado, carta do baralho), sua vez (limite de 8 para o quarto jogador).
- **Classe 1, etapa 1:** alocar. Apoio: poucos trabalhadores, envio que custa caro. Procedural: alocar; locais. Casos raros em `[!mais]`. Tarefas com Refúgio e Floresta.
- **Classe 2, etapa 2:** jogar carta. Apoio: carta como motor e placar. Procedural: jogar, cores, Criatura gratuita. Exemplo resolvido do manual (p. 12), complete com Tribunal e Juíza, sua vez com Singular e sequência.
- **Classe 3, etapa 3:** estações, Destino, Eventos, Jornada. Exemplo resolvido: continuação do manual (primavera).
- **Classe 4, etapa 4:** fim e contagem com o exemplo de 62 pontos do manual.
- **Redução de carga:** Eventos marcados *(depois)* na montagem curta; jogar carta adiado (ninguém tem recurso no primeiro turno); cartas específicas remetidas ao glossário.
- **Limite:** um texto não observa o leitor nem ajusta o apoio a ele.

## 7. Extensão

`wc -w`: cerca de 6.640 (com a marcação dos exercícios); palavras com letra ou número, sem URLs: cerca de 6.070. Fica no teto do pedido (6.000) por causa da tabela de componentes, dos 15 passos de montagem com legendas e das 23 perguntas de múltipla escolha. A primeira versão tinha 7.824 (wc); foram cortados um treino, quatro perguntas, a regra da Torre do Relógio (remetida ao glossário), legendas e repetições.

## 8. Contas

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/everdell/scripts/contas.py`. Saídas conferidas:

- Exemplo da p. 12: 3 g; 4 g, 1 c, 1 f; Fazenda: 2 g, 2 f; Sapo Balseiro: 4 g; primavera: 6 g e 1 f.
- Trabalhadores: 2, 3, 4, 6.
- Limite de mão no local de 2 cartas: compra 2, 2, 1 e 0 para mãos de 5, 6, 7 e 8.
- Refúgio: 5 cartas, 2 recursos; 4 cartas, 2.
- Pontuação p. 14: 22 + 14 + 10 + 4 + 12 = 62; Rei 1 básico e 2 especiais = 5; Arquiteta 1 cristal e 1 seixo = 2.
- Complete do Rei: 2 básicos e 1 especial = 4. Arquiteta 3 cristais, 2 seixos, 4 gravetos = 5.
- Desempate: empate em Eventos, Ana com mais recursos.

## 9. Portões automáticos

| Portão | Resultado |
|---|---|
| Travessão e meia-risca no tutorial | 0 |
| `tools/vicios.py` (função `avisos`) no tutorial e no JSON | só "jornada", que é o nome do local na caixa brasileira (Jornada, p. 9): mantido, não há sinônimo |
| `python3 tools/checar_comece.py docs/como-jogar/everdell/tutorial.md` | aprovado (o mesmo aviso de "Jornada") |
| Exclamação fora das marcas | 0 |
| Múltipla escolha: 23 perguntas, 3 ou 4 opções, uma certa, posição da certa variada | conferido por script |
| Renderização com `tools/como_jogar_md.pagina` (em memória, sem gravar página) | 23 quizzes, nenhuma marca solta; leitura do essencial: cerca de 7 min |
| Legibilidade (Flesch adaptado, `Arcvalion_gospel/tools/discipulado/legibilidade.py`, sem figuras) | 76,1 (432 frases, média de 11,7 palavras por frase, 1,90 sílaba por palavra). Informação, não meta |

## 10. Figuras e dados do JSON

Figuras em `como-jogar/everdell/figuras/` (webp, qualidade 80, até 1000 px), recortadas das páginas renderizadas a 200 dpi; as imagens embutidas no PDF têm 100 ppi, então os recortes são pequenos:

- Montagem: `setup-eventos-basicos` e `setup-tabuleiro` (p. 4), `setup-arvore`, `setup-recursos`, `setup-fichas`, `setup-floresta` (duas clareiras lado a lado), `setup-eventos`, `setup-campina`, `setup-jogador`, `preparacao` (página 7 inteira, sem o número da página; a nota de texto "Não há limite de quantidade de recursos..." foi apagada com a cor do papel) (p. 7); `setup-galhos` (p. 13).
- Etapas: `locais-basicos` e `locais` (p. 8), `refugio-jornada` e `eventos` (p. 9), `carta` (p. 10), `pontuacao` (p. 15).
- Foto: `fotos/mesa-1.webp` (de outro agente; crédito "Imagem: Tabletop Tycoon" do `fotos/fontes.json`), no fim da montagem, descrita como partida em andamento em imagem digital da edição em inglês.
- Passos sem figura própria: 9 e 10 (baralho e descarte aparecem nas figuras dos Eventos e da página inteira), 11 a 12 juntos numa figura, 14 e 15 (não ilustráveis).

`conteudo/como-jogar/everdell.json`: jogadores (1 a 4), idade (14+) e duração (60 a 120 min) da página do produto EVE001; edição "Edição Galápagos (Asmodee)"; `resenha: null` (não há `everdell/` nem `conteudo/everdell.json`); `publicar: false`; `leitura_min: 24` (cerca de 280 palavras por minuto sobre o total, a proporção dos outros tutoriais).
