# Dossiê: Como Jogar Carcassonne

Entrega 1 da linha COMO JOGAR para *Carcassonne* (jogo base, Hans im Glück; Z-Man no exterior; no Brasil, Devir). Produzido em 05/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e o pedido do dia (jogo leve/médio, 4.000 a 5.000 palavras, 3 etapas; só o jogo base; dizer em `[!edicao]` se a caixa traz O Rio e O Abade; figuras em `como-jogar/carcassonne/figuras/`; não criar `fotos/`).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Manual brasileiro acessível:** sim, livro de regras e suplemento, no site da Devir (seção 2).
- **Resenha no Elite:** não há pasta `carcassonne/` nem `conteudo/carcassonne.json`. No JSON, `"resenha": null`.
- **Complexidade:** três passos por turno, quatro tipos de zona com regras de conclusão e pontuação diferentes, a regra de maioria, a pontuação final pela metade e os fazendeiros. Jogo leve: 3 etapas.
- **Procura real (05/11/2026, 19h48 UTC):** o autocompletar do Google para "como jogar carcassonne" devolve "como jogar carcassonne", "como jogar carcassonne tabuleiro", "como jogar carcassonne junior". O do YouTube devolve "como jogar carcassonne tabuleiro". O tutorial cobre só o jogo base.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Livro de regras brasileiro** (fonte das páginas citadas), *Carcassonne*, Devir | Arquivo `carcassonne-básico.pdf`, 6 páginas (510 x 748 pt); PDF criado em 25/04/2018 (InDesign CC 13.1), modificado em 28/01/2019; "© 2001, © 2014 Hans im Glück"; tradutor Rodrigo Sponchiado Uemura, editor Marcelo Fernandes; capa: "Aprenda com facilmente as novas regras revisadas"; sha256 b4bcf274f94beb10… | https://devir.com.br/wp-content/uploads/2015/09/carcassonne-b%c3%a1sico.pdf (achado pela busca na web; está no diretório de uploads, que o `robots.txt` da Devir libera) | Baixado e lido em 05/11/2026 |
| **Suplemento brasileiro**, *Suplemento* (fazendeiros, O Rio, O Abade), Devir | Arquivo `carcassonne-basico-suplemento.pdf`, 2 páginas numeradas 1 e 2, mesmo formato e datas do livro (criado em 25/04/2018); sha256 7d65c349d89557b5… | https://devir.com.br/wp-content/uploads/2015/09/carcassonne-basico-suplemento.pdf | Baixado e lido em 05/11/2026 |
| **Catálogo Jogos Essenciais** da Devir (2026), p. 5 | Carcassonne: "Idade: acima 7 anos", "Jogadores: de 2 a 5", "Duração: 35 minutos"; conteúdo "72 cartelas de terreno, 40 seguidores de madeira, 12 cartelas de rio, 05 abades de madeira, 01 marcador de pontos, 01 manual de regras" | https://devir.com.br/wp-content/uploads/2026/04/Novo-Catalogo-Essenciais.pdf (link na página de downloads da Devir) | 05/11/2026 |
| Artigo da Devir, "Expansões de Carcassonne retornam com arte e conteúdo atualizados" (15/10/2025) | Diz que a Hans im Glück publicou no fim de 2021 "uma nova versão do conjunto básico", com "alguns ajustes nas regras", lançada pela Devir em espanhol | https://devir.com.br/expansoes-de-carcassonne-retornam-com-arte-e-conteudo-atualizados/ | 05/11/2026 |
| **Vídeo** "DEVIR BRASIL I Carcassonne - regras rápidas", Devir TV Brasil (@DevirBrasil) | Título e canal pelo oEmbed oficial; achado pela busca do próprio canal; nada baixado | https://www.youtube.com/watch?v=T6ofmrjl2M4 | 05/11/2026 |
| Manual original (Hans im Glück / Z-Man) | Não consultado: o manual brasileiro cobre todas as regras do jogo base, e não houve dúvida de tradução que o exigisse | | |
| FAQ ou errata oficial da Devir | Nenhuma encontrada (a página de downloads da Devir só traz, para Carcassonne, o "Guia de Terrenos") | | Lacuna |

**Como os arquivos foram obtidos.** O `robots.txt` da Devir (`devir.com.br` e `www.devir.com.br`) proíbe `/wp-content/` em geral, mas tem `Allow: /wp-content/uploads/`; os três PDFs estão nesse diretório. Todas as requisições usaram o User-Agent `EliteBoardgamersBot/1.0 (robo de pesquisa editorial; +https://github.com)`, sem login, sem cabeçalho de navegador. A página de downloads da Devir (`/devir-download/`) não lista o manual de Carcassonne; a busca na web achou o livro de regras. O suplemento não tem link encontrado: foi achado pedindo o nome previsível `carcassonne-basico-suplemento.pdf` no mesmo diretório (o livro manda ler "o suplemento anexo", p. 6). Foram 9 tentativas de nome; oito deram 404 e uma deu 200. Não houve bloqueio, 403 nem login; registro para o editor avaliar.

**Qual edição.** O livro é a edição revisada que a Hans im Glück lançou em 2014 ("© 2014"), traduzida pela Devir, e já inclui O Rio e O Abade na caixa (p. 2: "84 cartelas", "12 dessas cartelas de terreno mostram um rio", "há também 5 abades"). Os componentes batem com o catálogo Devir de 2026 (72 + 12 cartelas, 40 seguidores, 5 abades). A Devir chama essa caixa de "Carcassonne 2º Edição" num vídeo do seu canal (título lido no oEmbed: "DEVIR BRASIL | Carcassonne 2º Edição"); um vídeo do canal Romir Play House se chama "Carcassonne 3a Edição - Unboxing e Comparação", o que indica que a edição de 2021 também chegou ao Brasil. Não achei o manual dessa edição no site da Devir; o tutorial avisa em `[!edicao]` que não a confrontou.

**Como os manuais foram lidos.** Os dois PDFs têm camada de texto, extraída com `pdftotext -layout` página a página, e foram lidos inteiros. As páginas foram renderizadas (100 e 300 dpi) para ler as ilustrações: as contagens numeradas da cidade (2, 4, 6, 8, p. 4) e do monastério (1 a 9, p. 5), os seguidores do exemplo da p. 3, as cidades A a D do exemplo dos campos (suplemento, p. 1). A numeração impressa coincide com a do PDF: a p. 1 é a capa, as p. 2 a 6 têm o número no rodapé; o suplemento tem as p. 1 e 2.

- PDFs: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/carcassonne/dl/carcassonne-basico-2015.pdf` e `.../dl/carcassonne-basico-suplemento.pdf`
- Texto extraído por página: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/carcassonne/texto/br2015-p1.txt` a `br2015-p6.txt` (inteiro em `br2015.txt`) e `sup-p1.txt`, `sup-p2.txt` (inteiro em `sup.txt`)

## 3. Glossário (edição brasileira)

| Termo no tutorial | Termo do manual Devir | Página | Explicação |
|---|---|---|---|
| cartela de terreno, cartela | cartelas de terreno | p. 2 | Peça quadrada do mapa. 72 no jogo base, contando a inicial. |
| cartela inicial | cartela inicial | p. 2 | A de verso mais escuro que vai no centro. |
| cartela de rio | cartelas de rio | p. 2; supl. p. 2 | 12, verso mais escuro; mini-expansão O Rio. |
| monte | montes | p. 2 e 3 | As pilhas de cartelas viradas para baixo. |
| seguidor | seguidores (figuras) | p. 2 | Peça de madeira; 8 por cor. |
| reserva | reserva | p. 2 | Os 7 seguidores à frente do jogador. |
| marcador de pontos | marcador de pontos | p. 2 e 4 | Trilha circular de 50 casas. |
| zona | zona | p. 5 | Estrada, cidade, monastério ou campo, que pode atravessar várias cartelas. |
| estrada / ladrão | estrada / ladrão | p. 3 | Seguidor numa estrada. |
| cidade / cavaleiro | cidade / cavaleiro | p. 4 | Seguidor numa cidade. |
| monastério / monge | monastério / monge | p. 4 | Seguidor no monastério. |
| campo / fazendeiro | campo / fazendeiro | supl. p. 1 | Seguidor deitado num campo. |
| brasão | brasão | p. 4 | Escudo na cidade; vale 2 (concluída) ou 1 (sem concluir). |
| concluída | concluída | p. 3 a 5 | Estrada fechada nos dois extremos, cidade toda murada, monastério cercado. |
| sem concluir | "sem concluir", "não concluída" | p. 6 | O que ficou aberto no fim. |
| abade, jardim, Manancial, Lago | idem | p. 2; supl. p. 2 | Termos das mini-expansões, só citados em `[!edicao]`. |

O manual chama a peça de "cartela", não de "peça" ou "tile"; o tutorial usa só "cartela". "Meeple" não aparece no manual e não entra no tutorial.

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[I]` interpretada, `[L]` lacuna. Fonte `[BR p. N]` (livro) ou `[SUP p. N]` (suplemento), com frase curta lida ali.

### 4.1 Componentes e preparação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| P1 | 84 cartelas, das quais 12 de rio; verso igual, salvo inicial e rio, mais escuro | [BR p. 2] "Estas 84 cartelas", "12 dessas cartelas de terreno mostram um rio", "verso de cor mais escura" | V | |
| P2 | 72 cartelas de terreno no jogo base, contando a inicial | [BR p. 2] 84 − 12; catálogo "72 cartelas de terreno" | I (conta) | P1 |
| P3 | Cartela inicial no centro da mesa | [BR p. 2] "cartela inicial (a que possui o verso mais escuro) no centro da mesa" | V | P1 |
| P4 | As outras misturadas, viradas para baixo, em vários montes ao alcance de todos | [BR p. 2] "misturadas e deixadas, viradas para baixo"; legenda "Vários montes" | V | |
| P5 | Sem O Rio, as cartelas de rio ficam na caixa | O livro não diz; [SUP p. 2] apresenta o rio como mini-expansão que "substitui a cartela normal de início" | I | P1 |
| P6 | Marcador de pontos no canto da mesa | [BR p. 2] "coloque o marcador de pontos no canto da mesa" | V | |
| P7 | 40 figuras, 8 por cor (amarelo, vermelho, verde, azul, preto); 5 abades | [BR p. 2] "40 figuras, 8 de cada cor" | V | |
| P8 | Cada jogador recebe 7 figuras da cor escolhida: a reserva | [BR p. 2] "a cada jogador são dadas 7 figuras" | V | P7 |
| P9 | A oitava figura vai ao espaço 0 do marcador | [BR p. 2] "a oitava figura é colocada no espaço 0" | V | P6 |
| P10 | Figuras não usadas e os 5 abades voltam à caixa (nas primeiras partidas) | [BR p. 2] "Devolva à caixa todas as figuras que não serão usadas, assim como os 5 abades (nas primeiras partidas)" | V | |
| P11 | 2 a 5 jogadores | [BR p. 2] "para 2-5 jogadores"; catálogo | V | |
| P12 | Começa o mais jovem; sentido horário | [BR p. 3] "começando com o jogador mais jovem" | V | |

### 4.2 Turno

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| T1 | Turno em 3 ações, sempre nesta ordem: cartela, seguidor, pontos | [BR p. 3] "seguindo sempre a ordem assinalada" | V | |
| T2 | Colocar cartela é obrigatório: pega de um monte e coloca tocando ao menos a lateral de outra | [BR p. 3] "O jogador deve sempre pegar uma cartela", "toque ao menos a lateral de outra cartela" | V | |
| T3 | A cartela deve dar continuidade ao terreno: estrada com estrada, campo com campo, cidade com cidade | [BR p. 3] "A estrada se liga com a outra estrada e o campo coincide com um campo"; [BR p. 4] "cartelas de cidade também devem dar continuidade"; [BR p. 5] "dê continuidade ao terreno" | V | T2 |
| T4 | A continuidade vale em todos os lados que tocam outra cartela | Lido de "dê continuidade ao terreno" e das ilustrações; o texto não diz "todos os lados" | I | T3 |
| T5 | Contato só na diagonal não vale | Decorre de "toque ao menos a lateral" [BR p. 3] | I | T2 |
| T6 | Cartela que não cabe: na caixa, e pega outra | [BR p. 5] "deixe-a na caixa e pegue uma nova cartela" | V | T2 |
| T7 | Colocar seguidor é opcional, um da reserva, na cartela que acabou de colocar | [BR p. 3] "pode colocar um dos seguidores de sua reserva sobre a cartela que ele acabou de colocar"; [BR p. 5] "Só é permitido colocar um seguidor na mesma cartela que você acabou de colocar" | V | |
| T8 | Só se não houver nenhum outro seguidor na mesma zona, mesmo que em outra cartela | [BR p. 3] exemplo do azul; [BR p. 5] "não há nenhum outro seguidor na mesma zona" | V | T7 |
| T9 | "Outro seguidor" inclui um seu | Leitura de "nenhum outro seguidor" | I | T8 |
| T10 | Papéis: ladrão (estrada), cavaleiro (cidade), monge (monastério), fazendeiro (campo, deitado) | [BR p. 3 e 4]; [SUP p. 1] "seguidor que está deitado num campo" | V | |
| T11 | Reserva vazia: não se põe seguidor | Decorre de T7 ("de sua reserva") | I | T7 |
| T12 | Monastério sempre no centro; bordas da cartela também encaixam | [BR p. 4] "Os monastérios sempre estão no centro", "prestar atenção às bordas" | V | T3 |

### 4.3 Pontuação durante a partida

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| S1 | Contar pontos é obrigatório; pontuação no fim do turno, para todos com seguidor nas zonas concluídas | [BR p. 3] "O jogador deve somar"; [BR p. 5] "A pontuação é realizada sempre no final de um turno", "todos jogadores que tiverem algum seguidor" | V | |
| S2 | Estrada concluída: extremos em cruzamento, cidade, monastério, ou fechada em si; 1 ponto por cartela | [BR p. 3 e 5] | V | |
| S3 | Cidade concluída: rodeada por muralhas sem vazio; 2 por cartela e 2 por brasão | [BR p. 4 e 5] "Cada cartela ... vale 2 pontos", "cada brasão ... soma 2 pontos" | V | |
| S4 | Monastério concluído: rodeado por 8 cartelas; 9 pontos (1 por cartela, contando a dele) | [BR p. 5] "rodeado por 8 cartelas", "Cada monastério dá 9 pontos" | V | |
| S5 | O seguidor que pontuou volta à reserva | [BR p. 4] "recupera o seguidor que lhe deu pontos"; [BR p. 5] | V | S1 |
| S6 | Maioria: quem tem mais seguidores na zona pontua; empatados no maior número pontuam todos, com os pontos inteiros | [BR p. 5] "todos ganham pontos"; exemplo "recebem cada um 4 pontos" | V | S1 |
| S7 | Quem não tem a maioria não pontua, mas recupera o seguidor | [BR p. 6] "os dois jogadores recuperam seus seguidores" | V | S6 |
| S8 | Uma cartela pode unir zonas ocupadas; assim surgem vários seguidores numa zona (inclui "roubar" a cidade) | [BR p. 5 e 6] exemplos | V | T8 |
| S9 | Quem pontua é o dono do seguidor, mesmo que outro tenha colocado a cartela | [BR p. 3] "Apesar de ter sido outro jogador que colocou esta cartela, é sua estrada" | V | |
| S10 | Marcador: trilha circular de 50 casas; ao alcançar ou passar do 0, deitar a figura | [BR p. 4] | V | P9 |

### 4.4 Fim da partida

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| F1 | A partida termina quando um jogador não pode mais pegar e colocar uma cartela | [BR p. 6] | V | |
| F2 | Isso significa que as cartelas acabaram | Leitura de F1 (cartela que não cabe vai para a caixa, T6) | I | F1, T6 |
| F3 | Pontuam todas as zonas com seguidor | [BR p. 6] "todas as zonas que contenham algum seguidor" | V | |
| F4 | Estrada: 1 por cartela | [BR p. 6] | V | |
| F5 | Cidade sem concluir: 1 por cartela e 1 por brasão | [BR p. 6] "somente a metade" | V | |
| F6 | Monastério: 1 mais 1 por cartela adjacente | [BR p. 6] | V | |
| F7 | Campo: 3 por cidade concluída em uma de suas bordas | [BR p. 6]; [SUP p. 1] | V | |
| F8 | A maioria também vale no fim | [BR p. 6] exemplo verde x preto | V | S6 |
| F9 | Vence quem tem mais pontos | [BR p. 6] "determinar o vencedor" | V | |
| F10 | Desempate | Não está no manual | L | |

### 4.5 Fazendeiros (suplemento)

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| Z1 | Fazendeiro: seguidor deitado num campo; mesma regra de zona livre | [SUP p. 1] "deitado", "ver se não há outro fazendeiro na mesma zona" | V | T7, T8 |
| Z2 | Campos delimitados pelas cidades e pelas estradas | [SUP p. 1] | V | |
| Z3 | Fazendeiros não pontuam nem voltam à reserva durante a partida | [SUP p. 1] "não dão nenhum ponto, nem voltam à sua reserva" | V | |
| Z4 | Cada cidade concluída que limita o campo dá 3; cidade não concluída não conta | [SUP p. 1] exemplo da cidade D | V | |
| Z5 | Maioria e empate como nas outras zonas; campos podem se unir | [SUP p. 2] "Um seguidor pode acabar se incorporando a um campo que já estava ocupado" | V | S6 |
| Z6 | A mesma cidade pode contar para mais de um campo | [SUP p. 1] A e B valem para o campo maior e para o do canto | V | Z4 |
| Z7 | O manual recomenda jogar com fazendeiros depois de algumas partidas | [BR p. 6] | V | |

### 4.6 Mini-expansões (só em `[!edicao]`)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| X1 | O Rio: 12 cartelas; Manancial como inicial, Lago embaixo da pilha; rio antes das outras; não pode virar duas vezes seguidas para o mesmo lado | [SUP p. 2] | V (não ensinada) |
| X2 | O Abade: um por cor; vai em monastério ou jardim; jardim pontua como monastério; se na segunda ação não puser seguidor, pode recolher o abade e marcar os pontos | [SUP p. 2] | V (resumida) |
| X3 | Jardim sem o Abade | O manual não diz; tratado como parte do campo | I/L |

### 4.7 Erros comuns

Não houve fonte de comunidade consultada. Os `[!atencao]` vêm das ênfases do próprio manual: a cartela do seguidor (p. 5, "Só é permitido"), a zona ocupada em outra cartela (exemplo da p. 3), a devolução do seguidor (p. 4 e 5), quem pontua não é quem fecha (p. 3), o campo conta cidades e não cartelas (SUP p. 1, "Diferente das outras zonas").

## 5. Divergências entre edições

Não houve confronto com outra edição. Ver a seção 2: o tutorial segue o manual Devir com © 2014 e avisa que a edição de 2021 tem "alguns ajustes nas regras" (palavras da Devir), não conferidos.

## 6. Plano instrucional

| Classe de tarefa | Informação de apoio (`[!entender]`) | Informação procedural (`[!passos]`) | Exemplo, complete, sua vez | Prática específica |
|---|---|---|---|---|
| Montar a mesa | O que é cada componente | Seção setup, 8 passos | pergunta `??` final | |
| Comece em 4 minutos | A ideia do jogo | Tabela dos 3 passos | Ana e a estrada; Bruno; seguidor em cartela antiga | |
| Etapa 1: cartela e seguidor | Zonas e por que a zona ocupada barra o seguidor | Colocar a cartela; colocar o seguidor | Cidade de Bruno; monastério; segundo ladrão seu | |
| Etapa 2: pontuar | Concluída; o seguidor volta | O que é concluído; quanto vale; contar pontos | Cidade 12 de Ana; estrada empatada; cidade 2 x 2 | Treino: quanto vale (2 itens) |
| Etapa 3: fim e fazendeiros | Metade no fim; fazendeiro só no fim | Fim da partida; o fazendeiro | Contagem de Ana (15); campo 6; cidade sem concluir 6 | |

Decisões de carga: o fazendeiro, que o próprio manual adia para depois de algumas partidas (p. 6), ficou na etapa 3, junto da contagem final, que é quando ele pontua. O Rio e o Abade não são ensinados (pedido do editor); estão resumidos em `[!edicao]`. A volta do marcador, a cartela que não cabe e a reserva vazia foram para `[!mais]`.

O limite de sempre: um texto não observa o leitor nem ajusta o apoio a ele.

## 7. Extensão

`wc -w`: 5.020 (inclui as marcas de exercício, `??`, `( )`, `>`, os números e as legendas). Contando só palavras de letras, fora links: cerca de 4.300. Dentro do alvo de 4.000 a 5.000.

## 8. Contas

Todas refeitas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/carcassonne/scripts/contas.py`. Saída:

- Exemplos do manual: estrada 3 = 3; cidade 3 cartelas + 1 brasão = 8; monastério = 9; estrada empatada de 4 = 4 para cada; fim: cidade verde 5 + 3 = 8, azul 2 + 1 = 3, estrada vermelha 3, monastério amarelo 3 vizinhas = 4; campos A, B, C = 9; amarelo 4 cidades = 12; preto A, B = 6.
- Exemplos próprios: cidade 5 cartelas + 1 brasão = 12 (Ana leva sozinha, 2 x 1); cidade 6 cartelas sem brasão = 12 para cada (empate 2 x 2); trilha 47 + 8 = 55, casa 5, figura deitada (removido do texto final); fim de Ana: 4 + 4 + 7 = 15; campo 2 cidades concluídas = 6; treino: 2 cartelas = 4, 4 cartelas + 1 brasão = 10; avaliação: 3 cartelas + 2 brasões = 10; monastério com 7 vizinhas = 8; cidade sem concluir 4 + 2 = 6; campo com 2 concluídas = 6.
- Tabela de montagem: 8 figuras por cor; reserva 7; voltam (5 − n) × 8 seguidores: 24, 16, 8, 0, mais os 5 abades.

## 9. Portões automáticos

| Portão | Resultado |
|---|---|
| Travessão (—) e meia-risca (–) no tutorial | 0 |
| `tools/vicios.py` (função `avisos`) no tutorial e no JSON | 0 aviso (uma muleta apontada foi trocada por "segundo o suplemento") |
| `tools/checar_comece.py` | aprovado |
| Seções na ordem do BRIEF; exercícios em múltipla escolha com `=` | sim |
| Contas recalculadas | sim (seção 8) |
| Toda regra do tutorial na base, com página | sim (auditoria) |
| Legibilidade | não medida |

## 10. Figuras e dados do JSON

Figuras em `/home/user/Golden-Geek/como-jogar/carcassonne/figuras/`, recortadas da renderização a 300 dpi (`scripts/recortar.py` no scratchpad), só a parte gráfica, largura até 1000 px, WebP qualidade 80:

| Arquivo | Origem | Uso |
|---|---|---|
| setup-cartelas.webp | p. 2, os três tipos de cartela | setup |
| setup-versos.webp | p. 2, verso normal, verso escuro e cartela de rio (montagem lado a lado) | setup, passo 1 |
| setup-inicial.webp | p. 2, cartela inicial e montes | setup, passos 2 e 3 |
| setup-marcador.webp | p. 2, marcador com figuras no 0 | setup, passos 4 e 6 |
| setup-seguidores.webp | p. 2, seguidores e abades (duas fileiras, sem a legenda do meio) | setup, passos 5 e 7 |
| colocar-seguidor.webp | p. 3, os dois quadros de colocação | etapa 1 |
| estrada.webp | p. 3, estrada de 3 cartelas | etapa 2 |
| cidade.webp | p. 4, cidade de 8 pontos | etapa 2 |
| monasterio.webp | p. 5, monastério cercado | etapa 2 |
| roubar-cidade.webp | p. 6, os dois quadros da cidade tomada | etapa 2 |
| fim-partida.webp | p. 6, contagem final | etapa 3 |
| fazendeiros.webp | suplemento p. 1, campos | etapa 3 |

São 7 figuras de regra (o limite de 4 a 7) e 5 de montagem. Não há foto oficial na pasta `como-jogar/carcassonne/fotos/` (outro agente cuida dela); quando houver `fotos/mesa-1.webp`, a seção de montagem pode recebê-la, com o crédito de `fotos/fontes.json`.

JSON (`conteudo/como-jogar/carcassonne.json`): jogadores, idade e duração do catálogo Devir de 2026 ("acima 7 anos", "de 2 a 5", "35 minutos"; a página da Devir sobre o jogo diz "a partir de 8 anos", e o catálogo, mais recente e do produto, foi o escolhido); edição "Edição Devir"; `resenha: null`; `leitura_min: 12` (estimativa das partes à vista, cerca de 2.350 palavras a 200 por minuto; o gerador recalcula); `publicar: false`.
