# Dossiê: Como Jogar 7 Wonders

Entrega 1 da linha COMO JOGAR para *7 Wonders* (jogo base, segunda edição, Repos Production/Asmodee; no Brasil, Galápagos). Produzido em 05/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e os ajustes do pedido do dia (jogo médio: 4.500 a 6.000 palavras, 3 ou 4 etapas; figuras em `como-jogar/7-wonders/figuras/`, com `setup-*.webp` para a montagem; sem pasta `fotos`). Não é o *7 Wonders Duel*, que tem resenha em `/7-wonders-duel/`: no JSON, `"resenha": null`.

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Manual oficial em português acessível:** sim, o livro de regras em português do Brasil da segunda edição, publicado pela Repos Production no site oficial do jogo (seção 2). O arquivo da segunda edição na biblioteca da Asmodee Brasil não está disponível (seção 2).
- **Resenha no Elite:** não do jogo base. Existe `7-wonders-duel/` (outro jogo, para 2). Não existe pasta `7-wonders/` com resenha nem `conteudo/7-wonders.json`.
- **Complexidade:** escolha simultânea com passagem de mão, três usos para cada carta, quatro tipos de custo, compra de recursos dos vizinhos com restrições que costumam ser jogadas errado, conflito militar por Era e sete categorias de pontuação, com a conta da ciência. Jogo médio: 3 etapas.
- **Procura real (05/11/2026, 19h44 UTC):** o autocompletar do Google para "como jogar 7 wonders" devolve "como jogar 7 wonders", "como jogar 7 wonders duel", "como jogar 7 wonders dice". O do YouTube devolve "como jogar 7 wonders", "como jogar 7 wonders duel", "como jogar 7 wonders arquitetos", "como jogar 7 wonders 2 edição", "como jogar 7 wonders dice". O tutorial cobre só o jogo base, segunda edição.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Livro de regras em português do Brasil, segunda edição** (fonte das páginas citadas), *7 Wonders*, Repos Production | Arquivo `sev-br02-rules-1631177981xl84g.pdf` (título interno `SEV_Rules_BR.indd`), 8 páginas quadradas (807,9 x 807,9 pt), criado em 29/06/2021 (InDesign 16.2); "© Repos Production 2010"; créditos: Antoine Bauza (criação), Miguel Coimbra (arte); sem créditos de tradução nem menção à Galápagos; sha256 cbbb2a0f111d330c… | Página oficial do jogo na Repos, https://www.rprod.com/en/games/7-wonders, seção Downloads, Rules; arquivo https://cdn.svc.asmodee.net/production-rprod/storage/downloads/games/7wonders/rules/sev-br02-rules-1631177981xl84g.pdf (HTTP 200, sem login) | Baixado e lido em 05/11/2026 |
| **Livro de regras em inglês, segunda edição** (conferência de tradução) | `sev-en02-rules-1716388903zBEZx.pdf` (`SEV_Rules_EN.indd`), 8 páginas, criado em 24/08/2023; sha256 b65a797b0bf8ef58… | Mesma página; `.../7wonders/en/sev-en02-rules-1716388903zBEZx.pdf` | Baixado e lido em 05/11/2026 |
| **Cartilha de Descrição de Efeitos, em inglês** | `sev-en02-effects-description-1716388911mLqDj.pdf`, 2 páginas, 24/08/2023 | Mesma página | Baixada e lida em 05/11/2026; não há versão em português no site |
| **Lista de cartas e encadeamentos, em inglês** | `sev-en02-chain-list-1598888877Na4yW.pdf`, 2 páginas | Mesma página | Baixada; usada só para confirmar que há cartas 3+ a 7+ e encadeamentos a partir da Era II |
| **Página do produto na Repos** | 3-7 jogadores, 10+, 30 min | https://www.rprod.com/en/games/7-wonders | Lida em 05/11/2026 |
| Biblioteca da Asmodee Brasil, item 29 "7WO201 - 7 Wonders 2ªed" (etiquetas Regras, Ilustração) | Busca `library-download/store/search?term=7 wonders` (17 itens). `store/file?id=29&tagId=2&group=b2c` respondeu 404 "The specified blob does not exist"; `group=b2` respondeu 404 "container does not exist"; `tagId=1` e `tagId=3` também 404 | https://api-prd.mundogalapagos.com.br/library-download/ | 05/11/2026, inacessível. Confirma que a Asmodee Brasil lista a segunda edição (SKU 7WO201) |
| Biblioteca da Asmodee Brasil, item 1383 "7WO001 - 7 Wonders" | ZIP com `SEV-BR01_RULES-20140110.pdf` (12 páginas, 10/01/2014) e a caderneta antiga | `store/file?id=1383&tagId=2&group=b2c` (HTTP 200) | Baixado em 05/11/2026; é a **primeira edição** e **não foi usado como fonte de regra** |
| FAQ oficial | O livro de efeitos aponta www.7wonders.net/faq | `curl` em `www.7wonders.net` e `7wonders.net` falhou no TLS ("unrecognized name") | Lacuna; não contornado |
| **Vídeo** "7 Wonders - Como Jogar", Romir Play House | Título e canal pelo oEmbed oficial; publicado em 05/06/2016 (data da página do vídeo), portanto da primeira edição | https://www.youtube.com/watch?v=G81fQ5WhJuE | 05/11/2026; nada baixado |

**Por que o arquivo da Repos e não o da Galápagos.** O pedido manda usar o manual oficial em português da biblioteca da Asmodee Brasil e, sem ele, o oficial em inglês da Repos. O item da segunda edição na biblioteca (id 29) existe na busca, mas o arquivo não está no servidor (404 no "blob"). O item que baixa (1383) é a primeira edição de 2014, com outra arte, outros tabuleiros e regras com diferenças; não serve para a caixa atual. Na página oficial da Repos há, além do inglês, um livro de regras marcado "br" (`sev-br02`), em português do Brasil, da segunda edição. Ele é oficial (publicado pela editora de origem, no seu próprio site e CDN da Asmodee) e está em português, então ficou como fonte principal, à frente do inglês. O texto foi comparado ao inglês de 2023 página a página: as regras coincidem (seção 6). O que não posso afirmar: que o folheto impresso na caixa da Galápagos seja palavra por palavra este arquivo. O tutorial diz isso no parágrafo de abertura.

**User-Agent e robots.txt.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo de pesquisa editorial)`. O `robots.txt` da Repos (`User-agent: * / Disallow:`) não restringe nada. A API da biblioteca da Asmodee Brasil não tem `robots.txt`. O site `www.asmodee.com.br` não foi acessado (orientação do pedido). O 7wonders.net falhou no TLS e não foi tentado de outro jeito. YouTube: só a busca dentro dos canais (`/@<canal>/search?query=7 wonders`, fora de `/results`, que o `robots.txt` veta), a página do vídeo para ler a data, e o oEmbed.

**Vídeo.** Busca no canal Duque Board Games (`@DuqueBoardgames/search?query=7 wonders`, `Accept-Language: pt-BR`, 05/11/2026): só "7 WONDERS DICE - Gameplay resumida" e outros jogos; nada do jogo base. Canal da Galápagos: os endereços tentados (`@GalapagosJogos`, `@galapagosjogos`) levam a outro canal ("darwin corporativo") ou a 404; não achei o canal oficial por esse caminho. Canais de regras: Romir Play House tem "7 Wonders - Como Jogar" (2016); Desregrando tem "Desregrando: 7 Wonders"; Covil dos Jogos tem "Gameplay 7 Wonders". Escolhido o do Romir, que é de regras e já é usado em outros tutoriais. Como é de 2016, mostra a primeira edição; o tutorial avisa. Sem tempo conferido dentro do vídeo: só o vídeo do topo, com `&t=0s`.

**Como o manual foi lido.** Os PDFs têm camada de texto; extraí com `pdftotext -layout`, página a página, e li tudo. As páginas foram renderizadas (60 e 200 dpi) para ler o que só está nas ilustrações: a anatomia da carta e do tabuleiro (p. 2), a mesa de 5 jogadores (p. 3), a carta posta sob o estágio (p. 4), as cartas e forças do exemplo militar (p. 5), as cartas do exemplo de recursos (p. 6) e a ficha de pontuação de Alex (p. 8). Arquivos, fora do repositório:

- PDFs: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/7-wonders/dl/`
- Texto extraído, manual em português, por página: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/7-wonders/txt/br_p1.txt` a `br_p8.txt` (inteiro em `txt/br.txt`); inglês em `txt/en_p1.txt` a `en_p8.txt`; efeitos em `txt/en_effects.txt`
- Contas: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/contas7w.py`

## 3. Glossário (edição em português do Brasil)

| Termo no tutorial | No manual | Original (EN) | Página | Explicação |
|---|---|---|---|---|
| Era (I, II, III) | Era | Age | p. 1, 4 | Cada uma das 3 rodadas da partida. |
| carta de Era | cartas de Era | Age cards | p. 1, 2 | As 148 cartas; o verso mostra a Era e a direção de passagem. |
| Estrutura | Estrutura | Building | p. 2, 4 | O que a carta representa quando construída. |
| tabuleiro de Maravilha, Maravilha | tabuleiro de Maravilha | Wonder board | p. 2 | Tabuleiro de cada jogador, com recurso inicial e estágios. |
| lado do Dia, lado da Noite | lado do Dia / da Noite | Day / Night side | p. 2, 3 | As duas faces do tabuleiro. |
| estágio (da construção) | estágio da construção | Wonder stage | p. 2, 4 | Parte da Maravilha, com custo e efeito, construída da esquerda para a direita. |
| recurso inicial | recurso inicial | starting resource | p. 2 | Recurso impresso no canto do tabuleiro. |
| Cidade | Cidade | City | p. 4 | A Maravilha mais as cartas construídas. |
| vizinhos | vizinhos | neighbors | p. 4 | O jogador logo à esquerda e o logo à direita. |
| Moedas, Tesouro, reserva de Moedas | Moedas; Tesouro; reserva de Moedas | Coins; Treasure; Coin reserve | p. 2, 3 | Moedas de valor 1 e 3; o Tesouro fica no seu tabuleiro. |
| fichas de Conflito Militar (Derrota, Vitória) | fichas de Conflito Militar | Military Conflict tokens | p. 2, 5 | -1; +1 (Era I), +3 (Era II), +5 (Era III). |
| força militar, símbolo militar | força militar; símbolos militares | military strength | p. 5 | Soma dos escudos de espadas cruzadas. |
| Construir a Estrutura / Construir um estágio / Vender a carta | A, B, C | Construct / Build a stage / Sell | p. 4 | As três ações. |
| descarte | pilha de descarte | discard | p. 3, 4, 5 | Cartas vendidas e a última carta de cada Era. |
| zona de custo | zona de custo | cost area | p. 2, 6 | Canto esquerdo da carta. |
| encadeamento, símbolo de encadeamento | encadeamento | chain, chain symbol | p. 2, 7 | Símbolo que deixa construir de graça a partir da Era II. |
| recursos comuns: Argila, Pedra, Minério, Madeira | recursos comuns | common resources (Clay, Stone, Ore, Wood) | p. 2 | Cartas Marrons. |
| recursos raros: Vidro, Tecido, Papiro | recursos raros | rare resources (Glass, Cloth, Papyrus) | p. 2 | Cartas Cinzas. |
| cartas Marrons, Cinzas, Azuis, Amarelas, Vermelhas, Verdes, Roxas | idem | Brown, Grey, Blue, Yellow, Red, Green, Purple | p. 2 | Os sete tipos. |
| Guildas | Guildas | Guilds | p. 2 | As cartas Roxas, só na Era III. |
| símbolos de ciência | símbolos de ciência; "avanços científicos em três áreas" | science symbols | p. 2, 8 | Três tipos; o manual mostra só o desenho. |
| caderneta de pontuação | caderneta de pontuação | score pad | p. 1, 8 | Folha de contagem. |
| cartilha de Descrição de Efeitos | cartilhas de Descrição de Efeitos | Description of Effects sheets | p. 1, 2 | Explica todos os símbolos. |
| Lista de cartas e encadeamentos | idem | List of cards and chains | p. 1, 2 | Referência. |

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[I]` interpretada, `[L]` lacuna. Fonte `[BR p. N]`, com frase curta lida ali; `[EN p. N]` para o inglês; `[Ef]` para a cartilha de efeitos em inglês.

### 4.1 Componentes e preparação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| P1 | 7 tabuleiros; 148 cartas de Era (49/49/50); 78 Moedas (54 de 1, 24 de 3); 48 fichas de Conflito (24 Derrota, 24 Vitória, 8 por Era); caderneta; 3 cartilhas; lista | [BR p. 1] "148 cartas de Era: 49 cartas da Era I" | V | |
| P2 | Separar as cartas em três baralhos pela Era | [BR p. 3] "Separe as cartas de Era em três baralhos" | V | P1 |
| P3 | Em cada Era, ficar só com as cartas cujo número mínimo é menor ou igual ao número de jogadores; as outras voltam para a caixa | [BR p. 3] "número menor ou igual ao número de jogadores" | V | P2 |
| P4 | Era III: separar as Roxas, sortear jogadores + 2 viradas para baixo, juntar ao baralho; o resto das Roxas volta para a caixa | [BR p. 3] "número de jogadores +2" | V | P3 |
| P5 | Embaralhar cada baralho e pôr virado para baixo no centro | [BR p. 3] "Embaralhe cada baralho" | V | |
| P6 | Tabuleiro aleatório; o jogador escolhe o lado (Dia ou Noite); recomendado o Dia nas primeiras partidas; os jogadores podem escolher os tabuleiros em vez de sortear | [BR p. 3] "escolhendo seu lado de preferência" | V | |
| P7 | 3 Moedas de valor 1 no tabuleiro, o Tesouro inicial; o resto forma a reserva no centro | [BR p. 3] "Pegue 3 Moedas (no valor de 1)" | V | |
| P8 | Fichas de Conflito no centro, em reserva | [BR p. 3] "reserva de fichas de Conquista Militar" | V | |
| P9 | Os outros componentes voltam para a caixa | [BR p. 3] "Devolva todos os outros componentes" | V | |
| P10 | A caderneta e as cartilhas são usadas na contagem final, apesar de P9 | [BR p. 8] "Use a caderneta de pontuação"; "veja a cartilha de Descrição de Efeitos" | I | P9 |
| P11 | Espaço de descarte no centro | [BR p. 3] figura "Descarte" | V | |
| P12 | Ninguém começa: todos jogam ao mesmo tempo | [BR p. 4] "todos jogam simultaneamente" | V | |
| P13 | Jogadores: 3 a 7 | Página da Repos ("3-7"); as cartas vão de 3+ a 7+ [BR p. 2, 3; lista] | V | |
| P14 | Tamanho da partida para o JSON: 10+, 30 min | Página da Repos | V | |

### 4.2 Elementos

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| E1 | Sete tipos de carta: Marrons (recursos comuns), Cinzas (raros), Azuis (pontos), Amarelas (vantagens comerciais), Vermelhas (força militar), Verdes (ciência em três áreas), Roxas (pontos conforme condições) | [BR p. 2] | V |
| E2 | Frente: zona de custo, efeito, nome, símbolo para daltônicos, símbolos de encadeamento (se houver), número mínimo de jogadores. Verso: número da Era e direção de passagem | [BR p. 2] | V |
| E3 | Maravilha: lado do Dia e da Noite, com 2, 3 ou 4 estágios; cada estágio com custo e efeito; recurso inicial | [BR p. 2] | V |
| E4 | Fichas: Derrota -1; Vitória +1, +3, +5 | [BR p. 2] | V |
| E5 | "x Moedas" é valor total | [BR p. 2] "o valor total das Moedas" | V |
| E6 | Símbolo para daltônicos por cor | [BR p. 2] | V |

### 4.3 Turno

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| T1 | 3 Eras; pontos só no fim da Era III | [BR p. 4] | V | |
| T2 | No início de cada Era, 7 cartas aleatórias viradas para baixo para cada jogador | [BR p. 4] "distribua 7 cartas" | V | P5 |
| T3 | 6 turnos por Era, todos ao mesmo tempo; cada turno: escolher, jogar, passar | [BR p. 4] | V | |
| T4 | Escolher: olhar a mão sem mostrar, pôr 1 carta virada para baixo à frente, deixar as outras viradas para baixo | [BR p. 4] | V | |
| T5 | Jogar: todos revelam juntos; uma única ação: A construir a Estrutura, B construir estágio, C vender | [BR p. 4] "uma única ação" | V | T4 |
| T6 | Primeira partida: recomendação de jogar um após o outro para acompanhar | [BR p. 4] observação | V | |
| T7 | A: pagar o custo e pôr a carta virada para cima acima do tabuleiro; fica até o fim | [BR p. 4] | V | C1 |
| T8 | Nunca duas Estruturas idênticas (mesmo nome) | [BR p. 4, 6] | V | T7 |
| T9 | Arrumação: cartas da mesma cor empilhadas com efeito à vista; recursos sobre o recurso inicial | [BR p. 4] | V | |
| T10 | B: pagar só o custo do estágio no tabuleiro; carta virada para baixo, metade sob o estágio; efeito vale até o fim | [BR p. 4] | V | C1 |
| T11 | Qualquer carta serve para o estágio, sem outro uso | [BR p. 4] | V | T10 |
| T12 | Estágios em qualquer Era, mas da esquerda para a direita; construir estágios é opcional | [BR p. 4] | V | T10 |
| T13 | C: descartar virada para baixo na pilha de descarte e pegar 3 Moedas da reserva | [BR p. 4] | V | |
| T14 | Passar: as cartas não escolhidas vão para o vizinho da esquerda nas Eras I e III, da direita na Era II; direção no verso | [BR p. 5] | V | |
| T15 | Uma carta a menos a cada turno; 2 no último | [BR p. 5] | V | |
| T16 | Sexto turno: recebe 2, escolhe 1, descarta a outra virada para baixo sem ganhar Moedas, joga a escolhida normalmente | [BR p. 5] | V | T15 |

### 4.4 Custos

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| C1 | Quatro tipos: sem custo, Moedas, recursos, encadeamento | [BR p. 6] | V | |
| C2 | Zona de custo vazia: grátis | [BR p. 6] | V | |
| C3 | Custo em Moedas: certas cartas custam 1 Moeda, que vai para a reserva | [BR p. 6] | V | |
| C4 | Recursos da sua Cidade e/ou comprados dos vizinhos | [BR p. 6] | V | |
| C5 | Recursos usados nunca são perdidos; servem a cada turno | [BR p. 6] "nunca são perdidos" | V | |
| C6 | Um recurso por símbolo na Cidade: recurso inicial, Cinzas, Marrons, Amarelas e certos estágios | [BR p. 6] | V | |
| C7 | Cada símbolo de recurso só uma vez por turno | [BR p. 6] | V | |
| C8 | Exemplo: 2 Pedras, 1 Minério, 1 Papiro constrói Quartel (1 Minério) ou Scriptorium (1 Papiro), não a Torre de Vigia (Argila) | [BR p. 6] | V | |
| C9 | Comprar do vizinho: 2 Moedas por recurso, pagas ao dono; ele fica com a carta e ainda usa o recurso | [BR p. 7] | V | |
| C10 | Cada símbolo pode ser comprado só uma vez por turno pelo mesmo jogador; usar no mesmo turno | [BR p. 7] | V | |
| C11 | Compráveis: recurso inicial, Marrons, Cinzas. Impossível: Amarelas e estágios de Maravilha | [BR p. 7] | V | |
| C12 | Carta de escolha entre dois recursos: o comprador escolhe, independentemente do que o dono escolheu | [BR p. 7] | V | |
| C13 | Moedas da compra gastas "no início do seu turno"; não se usa Moeda recebida no mesmo turno | [BR p. 7] | V (o sentido de "início do turno" com jogo simultâneo é I: o tutorial lê como "com o que você tinha antes de revelar") | |
| C14 | Não se compra de Estrutura que o vizinho constrói no mesmo turno | [BR p. 7] | V | |
| C15 | Ninguém pode impedir a compra; os dois vizinhos podem comprar o mesmo recurso | [BR p. 7] | V | |
| C16 | Encadeamento a partir da Era II: carta construída com o mesmo símbolo no canto superior direito libera a construção grátis | [BR p. 7] | V | |
| C17 | Sem o encadeamento, ainda se constrói pagando os recursos; algumas cartas têm dois símbolos | [BR p. 7] | V | |
| C18 | Exemplo: Teatro (Era I) libera Jardins (Era III) | [BR p. 7] | V | |
| C19 | Amarela com seta: comprar recurso comum do vizinho indicado por 1 Moeda; outra: raros dos dois vizinhos por 1 Moeda | [Ef p. 1] | V (fonte em inglês) | C9 |
| C20 | Pagar o custo e comprar sem Moeda suficiente: não pode | Decorre de C9 e C13 | I | |

### 4.5 Fim da Era, fim do jogo e pontos

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| M1 | Cada Era termina com a Resolução de Conflitos Militares | [BR p. 5] | V |
| M2 | Força: símbolos militares nas cartas construídas e no tabuleiro (se houver) | [BR p. 5] | V |
| M3 | Com cada vizinho: igual, ninguém pega; menor, Derrota; maior, Vitória da Era atual | [BR p. 5] | V |
| M4 | Exemplo: Era II, 4 contra 5 e 2: Derrota e Vitória de Era II | [BR p. 5] | V |
| M5 | Fichas não têm limite indicado; a reserva tem 8 de Vitória por Era | [BR p. 1] | V (contagem) |
| F1 | Fim após o conflito da Era III | [BR p. 8] | V |
| F2 | Empate: maior Tesouro; persistindo, vitória compartilhada | [BR p. 8] | V |
| F3 | Pontos: 1 Maravilha (estágios construídos), 2 Tesouro (1 por 3 Moedas), 3 Conflitos (soma, pode ser negativa), 4 Azuis, 5 Amarelas, 6 Verdes, 7 Roxas | [BR p. 8] | V |
| F4 | Ciência: símbolos iguais 1, 4, 9, 16, 25, 36 para 1 a 6; mais 7 por conjunto de 3 diferentes; as duas formas se somam; conta símbolos das cartas e de estágios | [BR p. 8] | V |
| F5 | Exemplo de Alex: 10, 3, 6, 9, 2, 21, 4 = 55 | [BR p. 8] | V (conta refeita) |
| F6 | Mais de 6 símbolos iguais | O manual para em 6 | L (o tutorial não afirma nada) |
| F7 | Amarelas e Roxas: pontos conforme a cartilha de efeitos | [BR p. 8] | V |

### 4.6 Efeitos (cartilha em inglês)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| X1 | Moedas imediatas: entram "once this symbol enters play" | [Ef p. 1] | V |
| X2 | Efeitos de estágio: jogar a carta que seria descartada no fim da Era; construir grátis uma carta do descarte no fim do turno; construir grátis a primeira carta de cada cor, a primeira ou a última de cada Era | [Ef p. 2] | V (inglês; não dizemos qual tabuleiro tem qual) |
| X3 | Dúvida de efeito: FAQ www.7wonders.net/faq | [Ef p. 2] | V (FAQ inacessível) |

## 5. Regras jogadas errado com frequência (e por que estão no tutorial)

Não usei fórum como fonte de regra. A lista vem do próprio manual, que reforça estes pontos com "Importante", "Lembrete" ou "Observação", sinal de que a editora os viu errados:

1. Duas Estruturas com o mesmo nome (p. 4, "Importante", e p. 6, "Lembrete").
2. Recursos não se gastam (p. 6, "Importante").
3. Comprar do vizinho: só Marrons, Cinzas e o recurso inicial; Moeda recebida no turno não paga (p. 7, "Observações").
4. A carta descartada no sexto turno não dá Moedas (p. 5).
5. Direção de passagem muda na Era II (p. 5).
6. Estágios da esquerda para a direita (p. 4).

## 6. Divergências

- **Português x inglês (2023):** comparados página a página, mesmo conteúdo e mesma paginação. O português chama a reserva de fichas de "reserva de fichas de Conflito Militar" no passo 4 e de "reserva de fichas de Conquista Militar" na mesma frase (p. 3); o inglês diz só "Military Conflict token reserve". O tutorial usa "reserva de fichas de Conflito Militar".
- **Primeira x segunda edição:** a primeira edição em português (2014) não foi usada. O vídeo do Romir (2016) é da primeira edição; o tutorial avisa e manda seguir o manual em caso de diferença.
- **Manual da Galápagos impresso:** não conferido (arquivo indisponível na biblioteca). Aviso no parágrafo de abertura.

## 7. Plano do tutorial

- **Montar a mesa** (seção setup): passos da p. 3, na ordem; figuras da p. 2 e 3.
- **Etapa 1, um turno de 7 Wonders:** escolher, jogar (3 ações), passar; sexto turno. Exemplo resolvido, complete, sua vez.
- **Etapa 2, pagar o custo:** quatro tipos de custo, produção própria, compra dos vizinhos, encadeamento. É a parte mais carregada; prática específica (treino) aqui, porque a conta de quanto custa e o que pode ser comprado é onde se erra.
- **Etapa 3, fim da Era e pontuação:** conflito militar e as sete categorias, com treino da ciência.
- Ordem por dependência: não se fala de custo antes de as ações existirem; não se fala do sexto turno antes da passagem; a ciência entra só na pontuação, mas as cartas Verdes são apresentadas na montagem.

## 8. Portões automáticos (resultado)

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos`) aplicada ao texto: 0 aviso.
- Seções na ordem do BRIEF; perguntas em `??` com uma opção certa cada.
- Contas: todas no script `contas7w.py` (ciência 3/2/1 = 21; 2/2/2 = 26; 4/1/0 = 17; Alex 55; Tesouro 10 = 3 pontos, 8 = 2; militar do exemplo da p. 5 = +2; soma de três Eras = +2).
- Contagem de palavras do tutorial: no `auditoria.md`.
