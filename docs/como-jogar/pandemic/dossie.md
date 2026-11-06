# Dossiê: Como Jogar Pandemic

Entrega 1 da linha COMO JOGAR para *Pandemic* (jogo base, Z-Man Games; no Brasil, Galápagos). Produzido em 06/11/2026 (rotina diária) seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; jogo médio: 4.500 a 6.000 palavras e 3 ou 4 etapas; exercícios de múltipla escolha; essencial à vista e `[!mais]`; seção de montagem com figura em cada passo; figuras do manual e vídeo).

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. Jogo base de Matt Leacock, Z-Man Games, edição brasileira da Galápagos (código PAN001). Não é o *Pandemic Legacy* (que tem resenha em `/pandemic-legacy/`) nem as caixas derivadas listadas na mesma biblioteca (Resposta Rápida, Zona Crítica, Queda de Roma, Iberia, Sina da Sociedade, Legacy Season 0).
- **Editora no Brasil:** a biblioteca da Asmodee Brasil lista o PAN001 sob a família "PAN - Pandemic", e o manual traz créditos "GALÁPAGOS" e o site mundogalapagos.com.br (p. 8). Não achei menção à Devir; não procurei no site da Devir porque o manual da Galápagos foi obtido.
- **Resenha no site:** não há `conteudo/pandemic.json` nem pasta `pandemic/` (só `pandemic-legacy`). `"resenha": null`, como pedido.
- **Procura (06/11/2026):** autocompletar do Google (`client=firefox&hl=pt-BR`, "como jogar pandemic"): como jogar pandemic, como jogar pandemic resposta rapida. "pandemic ": board game, jogo, legacy, 2016, iberia, 2, jogo de tabuleiro, legacy season 1, cthulhu, studios. YouTube (`client=youtube&ds=yt`): como jogar pandemic, como jogar pandemic resposta rapida, como jogar parkour pandemic. A pauta (`conteudo/como_jogar_pauta.json`) registra nota 3,0.
- **Complexidade:** oito ações, sete funções, Epidemias com três passos, surtos em cadeia, três condições de derrota. Jogo médio: quatro etapas.

## 2. Fontes

| Fonte | Arquivo (scratchpad) | URL | Data |
|---|---|---|---|
| **Livro de regras da edição brasileira** (Galápagos; `PAN001_regras_v2.0.pdf`, 8 páginas A4, InDesign 19.5, PDF criado em 14/10/2024; gestão de produto Matheus Passeri, tradução Leonardo Zilio, revisão Ana Resende, Evelyn Trippo e Paula Pizauro; © 2013 Z-Man Games; sha256 8ae2bf26…c86da). Páginas impressas 1 a 8 | `<scratchpad>/d1106/pandemic/dl/x2022/PAN001_regras_v2.0.pdf`; texto por página em `txt/p1.txt` a `txt/p8.txt` (`pdftotext -layout`) e `txt/raw_p1.txt` a `raw_p8.txt` (sem layout); páginas em PNG (80 e 200 dpi) em `img/` | Biblioteca de downloads da Asmodee Brasil, item 2022 "PAN001 - Pandemic - SKU: PAN001", etiqueta Regras, pela API pública que a página usa: https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2022&tagId=2&group=b2c (ZIP, HTTP 200, sem login) | 06/11/2026 |
| Folheto de regras solo (Galápagos, `PAN001_regras-solo_v1.0.pdf`, 5 páginas, criado em 24/10/2024), no mesmo ZIP; lido só para dizer que o guia não o cobre | `dl/x2022/PAN001_regras-solo_v1.0.pdf`, texto `txt/solo.txt` | mesmo ZIP | 06/11/2026 |
| **Manual oficial em inglês** (Z-Man Games, `Pandemic_Rulebook.pdf`, 8 páginas, InDesign CC 14.0, PDF de 06/11/2019), para conferir tradução | `dl/en/Pandemic_Rulebook.pdf`, texto `txt/en.txt` | https://cdn.svc.asmodee.net/production-zman/uploads/2024/09/Pandemic_Rulebook.pdf, linkado em https://www.zmangames.com/game/pandemic/ | 06/11/2026 |
| Página oficial do jogo (Z-Man Games): 2 a 4 jogadores, 8+, 45 min, gênero Cooperative, lista de componentes | `web/zman.html` | https://www.zmangames.com/game/pandemic/ | 06/11/2026 |
| **Vídeo** "Pandemic - Como Jogar (acione legendas Klingon)", Romir Play House (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=KJVsAFD0y0I | 06/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial)`, que se identifica como robô. A busca `library-download/store/search?term=pandemic` devolveu 16 itens; o PAN001 aparece duas vezes: o item 818 (família antiga) respondeu 404 "The specified blob does not exist" no grupo `b2c`; o item 2022 entregou o ZIP com o manual v2.0 e o folheto solo. Não usei o grupo `b2b`. Não acessei `www.asmodee.com.br` (o pedido avisa que responde Access Denied a robô; o `robots.txt` dele respondeu 403, e não insisti). O `robots.txt` da Z-Man só bloqueia conversor de imagem, busca e feeds. YouTube: só a busca dentro dos canais (`/@<canal>/search?query=pandemic`, fora de `/results`) e o oEmbed.

**Vídeo.** Busca no canal Duque Board Games (`@DuqueBoardgames/search?query=pandemic`, `Accept-Language: pt-BR`, 06/11/2026): 34 títulos, nenhum do Pandemic base (aparecem "STAR WARS: The Clone Wars" e "Senhor dos Anéis: Sina da Sociedade", que são outros jogos do sistema Pandemic, e um vídeo de outro jogo cuja descrição cita Pandemic). Canal da Galápagos: `@GalapagosJogos` não devolveu vídeos (como nas sessões anteriores, o endereço não leva ao canal oficial). `@DevirBrasil`: nada. Canal de regras Romir Play House (`@RomirPlayHouse/search?query=pandemic`): "Pandemic - Como Jogar (acione legendas Klingon)", além de unboxing e de Legacy. Escolhido esse, que é de regras e já é usado em outros tutoriais. Não conferi o conteúdo segundo a segundo nem a edição mostrada; vai só no fim do "Comece a jogar", com `&t=0s` e o aviso de que vale o manual.

**Leitura do manual.** O texto extraído das p. 1, 3, 5, 6 e 7 sai misturado com os nomes das cidades do mapa e das cartas. Por isso todas as páginas foram lidas também como imagem (80 dpi inteiras e recortes a 200 dpi). A tabela de cartas por jogador (p. 2), a Trilha de Velocidade de Infecção (2, 2, 2, 3, 3, 4, 4; ilustração da p. 6) e a Trilha de Surtos (0 a 7 e a caveira; ilustração da p. 2) foram conferidas na imagem.

**Não obtido / não usado:** FAQ ou errata oficial (a biblioteca brasileira não tem para o PAN001; a página da Z-Man lista manual, solo, Survival e cenários, sem FAQ). O texto completo das 5 Cartas de Evento: o manual só mostra três (Transporte Aéreo, Prognóstico, Uma Noite Tranquila). Nada foi tirado de fórum, resenha ou vídeo.

## 3. Glossário (edição brasileira, PAN001)

| Termo no manual BR | Original (EN) | Página | Função |
|---|---|---|---|
| Carta de Função | Role card | 1, 2, 8 | A função do jogador e a habilidade |
| peão | pawn | 1, 2 | Da cor da Carta de Função |
| Cartas de Jogador | Player cards | 1 | 48 de Cidade, 6 de Epidemia, 5 de Evento |
| Carta de Cidade | City card | 1, 4 | Paga voos, construção, cura |
| Carta de Epidemia | Epidemic card | 3, 6 | Aumentar, Infectar, Intensificar |
| Carta de Evento | Event card | 7 | Jogada a qualquer momento, sem ação |
| Carta de Referência | Reference card | 1, 2 | Resumo das ações |
| Carta de Infecção / Baralho de Infecção / Pilha de Descarte de Infecção | Infection card / deck / discard pile | 1, 3, 6 | Dizem onde a doença se espalha |
| Baralho de Jogador / Pilha de Descarte de Jogador (no tabuleiro: "Pilha de Descarte das Cartas de Jogador") | Player Deck / Player Discard Pile | 3, 4 | O relógio da partida |
| cubos de doença; doenças Azul, Amarela, Preta e Vermelha | disease cubes | 1, 2 | 24 de cada cor |
| Centro de Pesquisa | research station | 1, 2, 4 | 6; um em Atlanta |
| Marcador de Cura; "frasco vazio"; lado de doença Erradicada | cure marker; vial; eradicated side | 1, 2, 4 | Indica cura e erradicação |
| Indicador de Curas Descobertas (também "Indicador de Curas", "Indicador de Cura") | Discovered Cure Indicators | 2, 4, 5 | Onde vai o Marcador de Cura |
| Marcador de Velocidade de Infecção / Trilha de Velocidade de Infecção | infection rate marker / track | 1, 3, 6 | Quantas Cartas de Infecção por turno |
| Marcador de Surtos / Trilha de Surtos | outbreaks marker / track | 1, 2, 7 | Conta os surtos |
| surto, surto em cadeia | outbreak, chain reaction outbreak | 7 | Transbordamento de cubos |
| curada, erradicada | cured, eradicated | 4 | Estados da doença |
| Automóvel/Balsa, Voo Direto, Voo Fretado, Ponte Aérea | Drive/Ferry, Direct Flight, Charter Flight, Shuttle Flight | 4 | Ações de movimento |
| Construir um Centro de Pesquisa, Tratar uma Doença, Compartilhar Conhecimento, Descobrir uma Cura | Build a Research Station, Treat Disease, Share Knowledge, Discover a Cure | 4 | Outras ações |
| Aumentar, Infectar, Intensificar | Increase, Infect, Intensify | 6 | Passos da Epidemia |
| limite da mão | hand limit | 6, 7 | 7 Cartas de Jogador |
| partida Introdutória, Normal, Heroica | Introductory, Standard, Heroic | 3 | 4, 5 ou 6 Epidemias |
| Cientista, Médico, Pesquisadora, Especialista em Operações, Especialista em Quarentena, Agente de Viagens, Especialista em Planos de Contingência | Scientist, Medic, Researcher, Operations Expert, Quarantine Specialist, Dispatcher, Contingency Planner | 8 | As sete funções |
| Transporte Aéreo, Prognóstico, Uma Noite Tranquila | Airlift, Forecast, One Quiet Night | 1, 7 | Eventos mostrados no manual |

O tutorial usa sempre "Pilha de Descarte de Jogador" (forma da p. 4) e "Indicador de Curas Descobertas" (forma da p. 2).

## 4. Base de regras

Todas `[verificada]` (lidas no manual BR nesta sessão), salvo as marcadas.

**Objetivo e derrota**
- R1. Cooperativo; vencem ou perdem juntos. Vitória: curas das 4 doenças. [BR p. 1] "Todos os jogadores vencem ou perdem juntos."
- R2. Derrota: 8 surtos; falta de cubos quando necessários; falta de Cartas de Jogador. [BR p. 1, 7]
- R3. Vitória imediata com 4 curas, não importa quantos cubos restem; não é preciso erradicar. [BR p. 7]

**Preparação** [BR p. 2 e 3]
- R4. Tabuleiro; 6 Centros de Pesquisa e cubos ao lado, cubos em 4 montes por cor; 1 Centro em Atlanta. "Coloque 1 Centro de Pesquisa em Atlanta."
- R5. Marcador de Surtos no "0"; 4 Marcadores de Cura com o "frasco vazio" para cima perto do Indicador de Curas Descobertas.
- R6. Marcador de Velocidade de Infecção no "2" mais à esquerda; 3 cartas com 3 cubos, 3 com 2, 3 com 1; 18 cubos; as 9 cartas na Pilha de Descarte de Infecção; o resto forma o Baralho de Infecção. "Você colocará um total de 18 cubos".
- R7. Carta de Referência para cada um; Cartas de Função embaralhadas, 1 virada para cima por jogador; peões em Atlanta; funções e peões restantes saem do jogo.
- R8. Epidemias separadas; Cidade e Evento embaralhadas; mão: 2 jogadores 4 cartas, 3 jogadores 3, 4 jogadores 2 (tabela, conferida na imagem).
- R9. Dificuldade: 4, 5 ou 6 Epidemias (Introdutória, Normal, Heroica); as não usadas saem. Pilhas "de tamanhos tão similares quanto possível", uma por Epidemia; 1 Epidemia em cada; pilhas empilhadas "deixando as pilhas menores embaixo". "Use 4 Cartas de Epidemia na sua primeira partida."
- R10. Começa quem tiver a Cidade de maior população. [p. 3]
- R11. Mais de 6 Centros de Pesquisa na preparação: devolva os excedentes. [p. 4] (nota do manual; na caixa base há exatamente 6; não entrou no tutorial)

**Turno** [BR p. 3]
- R12. Três partes: 4 ações; comprar 2 Cartas de Jogador; infectar cidades. Depois, o jogador à esquerda.
- R13. Todos opinam; decide o jogador da vez.

**Ações** [BR p. 4]
- R14. Até 4 ações, qualquer combinação, repetir pagando 1 ação cada; função pode mudar ações; descartes vão para a Pilha de Descarte de Jogador.
- R15. Automóvel/Balsa: linha branca para cidade conectada.
- R16. Voo Direto: descarte Carta de Cidade, vá até a cidade da carta.
- R17. Voo Fretado: descarte a carta que corresponde à sua cidade, vá para qualquer cidade.
- R18. Ponte Aérea: de cidade com Centro para outra com Centro.
- R19. Linha que sai do tabuleiro dá a volta; Sydney e Los Angeles conectadas.
- R20. Construir: descarte a carta da sua cidade; Centro do estoque; se os 6 foram construídos, pegue um de qualquer lugar do tabuleiro.
- R21. Tratar: remova 1 cubo; com cura, todos da cor. Várias doenças com cura: uma ação por cor.
- R22. Erradicação: último cubo de doença com cura removido; ou, ao curar, nenhum cubo da cor no tabuleiro. Vire o Marcador de Cura. Remover o último cubo de doença sem cura não tem efeito.
- R23. Compartilhar Conhecimento: dar ou pegar a carta da cidade em que você está; o outro na mesma cidade; os dois concordam. Quem recebe e passa de 7: descarta ou joga Evento imediatamente.
- R24. Descobrir uma Cura: em qualquer Centro de Pesquisa, 5 Cartas de Cidade da mesma cor; Marcador de Cura para o Indicador. [p. 4; p. 8 "a cor da cidade onde ele está não precisa corresponder"]
- R25. Doença curada: cubos ficam e novos cubos ainda chegam. [p. 4]

**Comprar cartas e Epidemias** [BR p. 6]
- R26. Compre ao mesmo tempo as 2 do topo. Menos de 2 no baralho: derrota; "Nunca reembaralhe os descartes".
- R27. Epidemia, em ordem: Aumentar (marcador +1); Infectar (carta do fundo; 3 cubos, salvo erradicada; se já tem cubos da cor, completa até 3 e surto); Intensificar (reembaralha só o descarte de infecção, no topo).
- R28. Duas Epidemias: resolver e repetir; na segunda, a carta é a única a reembaralhar e estará no topo; haverá surto nas Infecções, salvo Evento.
- R29. Epidemias resolvidas saem da partida; sem cartas substitutas.
- R30. Limite da mão: mais de 7 (após resolver Epidemias), descarte ou jogue Eventos até 7. Só Cartas de Jogador contam. [p. 6, 7]

**Infecções e surtos** [BR p. 6 e 7]
- R31. Revele tantas cartas do topo quanto a velocidade atual, uma de cada vez; 1 cubo da cor, salvo erradicada; com 3 já, surto em vez do 4º; descarte.
- R32. Trilha de Velocidade: 2, 2, 2, 3, 3, 4, 4 (ilustração p. 6; o exemplo diz "A velocidade de infecção atual é 3").
- R33. Faltam cubos para pôr: derrota; pode acontecer em epidemia, surto ou infecção.
- R34. Surto: Marcador de Surtos +1; 1 cubo em cada cidade conectada; cidade com 3: surto em cadeia após o atual.
- R35. Surto em cadeia: marcador +1; cubos, mas não nas cidades que já tiveram surto na resolução da Carta de Infecção atual.
- R36. Uma cidade pode ter várias cores, até 3 de cada; isso não afeta as infecções.
- R37. Marcador de Surtos no último espaço: derrota. Trilha 0 a 7 e caveira (ilustração p. 2).
- R38. Fim do turno: após infectar e descartar, o jogador à esquerda. [p. 7]

**Cartas de Evento** [BR p. 7]
- R39. Qualquer jogador, durante um turno; não é ação; quem joga decide. Qualquer momento, exceto entre comprar uma carta e resolvê-la. Duas Epidemias: Eventos após a primeira. Depois, descarte na Pilha de Descarte de Jogador.
- R40. Textos dos Eventos mostrados: Transporte Aéreo (p. 7); Prognóstico e Uma Noite Tranquila (imagens da p. 1, camada de texto lida). Os outros dois Eventos: `[lacuna]` (o manual não traz o texto; o tutorial diz que o efeito está na carta e não os nomeia).

**Cartas de Jogador, mão** [BR p. 7]
- R41. Introdutória: cartas viradas para cima. Normal e Heroica: fechadas; grupos experientes podem abrir. Pilhas de descarte podem ser vistas a qualquer momento.

**Funções** [BR p. 8]
- R42. Especialista em Planos de Contingência: ação, pega Evento do descarte e guarda na Carta de Função; 1 por vez; fora do limite; quando jogado, sai do jogo.
- R43. Agente de Viagens: ação; mover qualquer peão (com concordância do dono) para cidade com outro peão; ou mover peão de outro, com consentimento, como se fosse o seu; cartas da própria mão; no Voo Fretado, a carta corresponde à cidade do peão; só move; não usa o movimento especial do Especialista em Operações.
- R44. Médico: Tratar remove todos; com cura, remove automaticamente ao entrar ou estar, sem ação, inclusive no turno de outros; impede cubos (e surtos) de doença curada na cidade dele.
- R45. Especialista em Operações: ação, constrói sem carta; uma vez por turno, ação, de Centro de Pesquisa para qualquer cidade descartando qualquer Carta de Cidade.
- R46. Especialista em Quarentena: impede surtos e cubos na cidade dela e conectadas; não afeta a preparação.
- R47. Pesquisadora: em Compartilhar, dá qualquer Carta de Cidade a jogador na mesma cidade; da mão dela; no turno de qualquer um dos dois. "No seu turno, você pode pegar qualquer Carta de Cidade da Pesquisadora, se estiver na mesma cidade que ela."
- R48. Cientista: 4 cartas para curar.
- R49. "Regras frequentemente esquecidas" (p. 8): sem substituta para Epidemia; cura em qualquer Centro; pegar carta de outro na cidade certa; pegar qualquer carta da Pesquisadora; limite da mão logo após receber carta.

**Classificação especial**
- R50. `[interpretada]` Especialista em Quarentena e Médico protegem também na Epidemia: o manual fala em impedir "a colocação de cubos" sem exceção, e só exclui a preparação. Marcado como `[!edicao]` no tutorial.
- R51. `[interpretada]` Com divisão inexata das pilhas, a pilha maior vai por cima (consequência de "pilhas menores embaixo"). No tutorial, só no exemplo da tabela de montagem.

**Dependências.** Movimento (R14 a R19) antes das outras ações (R20 a R25), porque elas pedem estar na cidade certa. Comprar cartas (R26) antes de Epidemia (R27 a R29), que acontece na compra. Infecção (R31) antes de surto (R34 a R37). Erradicação (R22) antes de infecções (R31), que a citam. Funções (R42 a R48) depois das ações que elas alteram.

## 5. Ambiguidades e escolhas

- Os nomes do descarte de jogador variam no manual ("Pilha de Descarte de Jogador", p. 4 e 7; "Pilha de Descarte das Cartas de Jogador", p. 3 na ilustração). O tutorial usa a primeira, e cita a segunda uma vez no passo 5 da montagem.
- O nome do indicador varia ("Indicador de Curas Descobertas", p. 2; "Indicador de Cura", p. 4; "Indicador de Curas", p. 5). O tutorial usa "Indicador de Curas Descobertas".
- R50 e R51, acima.

## 6. Diferenças entre edições

O manual BR v2.0 (2024) traduz o manual inglês da Z-Man da mesma versão do jogo (© 2013). Conferi no inglês os pontos de tradução que pesam no tutorial (mão inicial, Epidemia, Eventos, limite da mão): sem divergência. O inglês chama o Agente de Viagens de *Dispatcher* e o Especialista em Planos de Contingência de *Contingency Planner*; o tutorial usa só os nomes brasileiros. O jogo base é para 2 a 4 jogadores; o solo vem em folheto separado, não coberto.

## 7. Erros comuns antecipados

Do próprio manual: o quadro "Regras frequentemente esquecidas" (p. 8) e os avisos em destaque das p. 4, 6 e 7 (carta do fundo na Epidemia; reembaralhar só o descarte; nunca reembaralhar o descarte de jogador; quarto cubo vira surto). Todos estão em `[!atencao]` ou nos passos.

## 8. Mapa instrucional

| Classe de tarefa | Informação de apoio | Informação procedural | Prática |
|---|---|---|---|
| Montar a mesa | Componentes e o que fazem | Seis passos da p. 2 e 3, tabela por número de jogadores | Pergunta de mão inicial |
| Primeiro turno (Comece em 4 minutos) | A ideia em 4 termos | Três partes do turno, Epidemia e surto em poucas linhas | Exemplo de João (manual), complete (Voo Direto), sua vez (Epidemia) |
| Etapa 1: mover-se | Por que voar custa cartas | As quatro ações de movimento | Resolvido, complete (Ponte Aérea), sua vez (Voo Fretado) |
| Etapa 2: outras ações e funções | Para que serve cada ação | As quatro ações; tabela das funções | Turno de Ana (manual), complete (Compartilhar), sua vez (cura) |
| Etapa 3: comprar, Epidemias, Eventos | O baralho como relógio | Comprar, Epidemia, Eventos | Resolvido (Epidemia), complete (limite), sua vez (carta do fundo) |
| Etapa 4: infectar, surtos, fim | Transbordamento | Infectar, surto, fim | Fim do turno de Ana (manual), complete, sua vez, treino de fim de partida |

Prática específica só onde o erro é caro: a carta do fundo na Epidemia e quando a partida acaba. Adiados: as funções e os Eventos ficam fora do primeiro turno, com uma linha de orientação. Um texto não observa o leitor nem ajusta o apoio a ele.

**Extensão.** O tutorial tem cerca de 6.900 palavras contadas com `wc -w` (inclui marcação, opções e legendas; 6.800 contando só palavras), acima do alvo de 6.000. O excesso vem das sete funções (tabela e três `[!mais]`), dos três passos da Epidemia com dois casos raros (duas Epidemias, cidade do fundo já com cubos) e do surto em cadeia, que pedem exemplo próprio. Já foram cortados: tabela de dificuldade repetida, dois `[!atencao]` repetidos, uma pergunta da avaliação, dois blocos das situações especiais e as legendas longas. A parte à vista ("Leitura do essencial") tem cerca de 3.200 palavras, 16 minutos.

## 9. Figuras e vídeo

Todas recortadas das páginas renderizadas a 200 dpi, só a parte gráfica, até 1000 px, `.webp` qualidade 80, em `como-jogar/pandemic/figuras/`:

| Arquivo | Página | O que mostra | Onde entra |
|---|---|---|---|
| setup-1-tabuleiro.webp | 2 | Centros de Pesquisa e o de Atlanta, com peões | Montagem, passo 1 |
| setup-1-cubos.webp | 2 | Cubos em 4 montes | Passo 1 |
| setup-2-trilhas.webp | 2 | Trilha de Surtos e Indicador de Curas Descobertas | Passo 2 |
| setup-2-marcadores-cura.webp | 2 | Os 4 Marcadores de Cura | Passo 2 |
| setup-3-infeccao.webp | 3 | Baralho e descarte de infecção, Trilha de Velocidade | Passo 3 |
| setup-3-cidades.webp | 3 | As 9 Cartas de Infecção com 3, 2 e 1 cubos | Passo 3 |
| setup-4-cartas.webp | 2 | Função, peão, Referência, Cartas de Cidade | Passo 4 |
| setup-5-baralho.webp | 3 | Pilhas com Epidemias formando o Baralho de Jogador | Passo 5 |
| exemplo-joao.webp | 5 | Primeiro turno de João | Comece em 4 minutos |
| volta-ao-mundo.webp | 4 | Linha que dá a volta (Sydney e Los Angeles) | Etapa 1 |
| exemplo-ana.webp | 5 | Turno de Ana (tratar, voar, compartilhar, curar) | Etapa 2 |
| infeccao.webp | 6 | Trilha de Velocidade e 3 Cartas de Infecção | Etapa 3 |
| surto.webp | 6 | Paris recebe cubo; Argel prestes a ter surto | Etapa 4 |
| surto-em-cadeia.webp, surto-em-cadeia-2.webp | 7 | Surto em Argel e surto em cadeia no Cairo | Etapa 4 |

O passo 6 (quem começa) não tem ilustração no manual. A pasta `como-jogar/pandemic/fotos/` foi criada por outro agente durante a sessão; usei `fotos/mesa-1.webp` (crédito "Imagem: Asmodee UK", de `fotos/fontes.json`, nota "partida em andamento") depois dos passos da montagem, com legenda que diz que é partida em andamento e caixa com cartas em francês.

## 10. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (`avisos({"texto": ...})`) sobre o tutorial inteiro: 0 aviso.
- `python3 tools/checar_comece.py docs/como-jogar/pandemic/tutorial.md`: "seção Comece a jogar dentro da diretriz".
- Exclamação no texto: 0.
- Contas refeitas em `<scratchpad>/d1106/pandemic/scripts/contas.py`: 18 cubos na preparação; 39 Cartas de Infecção no baralho; 53 Cartas de Cidade e Evento; sobras 45/44/45; pilhas para 2 jogadores e 4 Epidemias 13, 12, 12, 12 (49 cartas); velocidade após 3 Epidemias = 3; surto do exemplo: 7 cubos pretos e 2 avanços.
- Legibilidade (Flesch adaptado): não medida; `tools/discipulado/legibilidade.py` não está neste repositório.

## 11. Dados do topo (conteudo/como-jogar/pandemic.json)

Jogadores 2 a 4 (manual p. 2, tabela; página da Z-Man), idade 8+ e duração 45 min (página da Z-Man, 06/11/2026; o manual não diz), gênero "Cooperativo · Família" (cooperativo: manual p. 1 e Z-Man "Cooperative"; "Família" é rótulo editorial pela idade 8+). Edição Galápagos (créditos p. 8). `"resenha": null`, `"publicar": false`, `"data": "2026-11-06"`, 4 etapas, leitura do essencial de 16 min.
