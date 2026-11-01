# Dossiê: Como Jogar Tiny Epic Dinosaurs

Entrega 1 da linha COMO JOGAR para *Tiny Epic Dinosaurs*. Produzido em 01/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo escolhido pelo editor; sem commit; sem subagentes; sem explicação do método no tutorial; alvo de 3.500 a 6.000 palavras; exercícios de múltipla escolha; `[!mais]` para casos especiais; figuras do manual e vídeo).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. O que sustenta a escolha:

- **Manual brasileiro acessível:** sim, no site da Meeple BR (seção 2), já baixado no scratchpad pela sessão principal.
- **Resenha no Elite:** não há pasta `tiny-epic-dinosaurs/` nem `conteudo/tiny-epic-dinosaurs.json` (conferido em 01/11/2026). O JSON leva `"resenha": null`.
- **Complexidade:** alocação de trabalhadores com bloqueio (Capataz vale 2), oito tipos de ação, construção de Cercados com restrição de espécie, alimentação com dois recursos, duas penalidades de fuga que valem uma vez por rodada e reprodução. Peso médio-leve, mais que Azul; 4 etapas.
- **Procura real (01/11/2026):** o autocompletar do Google (`client=firefox&hl=pt-BR`) para "como jogar tiny epic dino" não devolveu sugestão. O do YouTube (`client=youtube&ds=yt`) devolveu "tiny epic dinosaurs como jogar". Procura pequena, mas existente, e concentrada no vídeo.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro** *Tiny Epic Dinosaurs: Regras da Fazenda*, Meeple BR | Arquivo `TEDinos_rulebook-PT-BR-2.01.pdf`, 20 páginas de 365 x 527 pt, criado em 20/11/2020 (Adobe InDesign 15.0); autor Scott Almes; diagramação de Gerson Lopes; revisão de Leandro R. Fernandes, Márcio Botelho e Thiago Leite; © 2020 Gamelyn Games | https://meeplebr.com/wp-content/uploads/2020/11/TEDinos_rulebook-PT-BR-2.01.pdf, linkado na página do produto (conferido no HTML da página) | Baixado pela sessão principal em 01/11/2026; lido aqui |
| **Página do produto**, Meeple BR | HTML de 01/11/2026 | https://meeplebr.com/product/tiny-epic-dinosaurs/ | 01/11/2026, requisição simples, 200 |
| **FAQ oficial** | Seção "Perguntas Frequentes" na p. 19 do próprio manual | Manual BR | Usado |
| **Manual original** (Gamelyn Games, inglês) | Não obtido | O domínio gamelyngames.com hoje redireciona para tycoongames.com; as páginas do produto e o sitemap não trazem PDF de regras | Lacuna (não era obrigatório: serve só para dúvida de tradução) |
| Errata separada | Nenhuma encontrada | | Lacuna |

**Como o manual foi lido.** O PDF tem camada de texto, mas o leiaute em caixas mistura a ordem das palavras perto das ilustrações. Foi extraído com `pdftotext -layout`, página a página (`p1.txt` a `p20.txt`), e também sem `-layout` (`r1.txt` a `r20.txt`); as páginas foram renderizadas a 110, 170 e 300 dpi e lidas como imagem para conferir a ordem do texto e ler os ícones que não aparecem no texto (planta, carne, suprimento, números das fases, valores dos quadros dos dinossauros, faces do Dado de Caça). Arquivos no scratchpad, `tinyepic/dinos/`, fora do repositório. O PDF não foi copiado para o repositório.

**Paginação.** Numeração impressa do manual: p. 1 capa ("Regras da Fazenda"); p. 2 e 3 componentes e prólogo; p. 4 e 5 preparação; p. 6 visão geral e Coletar Recursos; p. 7 a 9 Alocar Dinofazendeiros e ações; p. 10 Reaver e Adaptar; p. 11 Alimentar e Fuga; p. 12 Reprodução e Cartas de Pesquisa; p. 13 Preparação, quarta rodada e pontuação; p. 14 a 19 modo solo (p. 19 também tem o FAQ); p. 20 créditos.

**Dados da página do produto.** "para maiores de 14 anos", "30 a 60 minutos", "1 a 4 jogadores"; categoria "Estratégicos". Componentes listados: 75 Dinomeeples, 20 Dinofazendeiros, 26 Barreiras, 18 Marcadores de Recurso, 1 Dado de Caça, 4 Tabuleiros de Jogador, 4 de Fazenda, 4 de Ação, 3 de Jogo, 30 Cartas de Pesquisa, 36 Cartas de Contrato, 8 Cartas de Fazendeiros Rivais. O manual (p. 2 e 3) dá 16 Dinofazendeiros mais 4 Capatazes (= 20), 28 Contratos Públicos mais 8 Privados (= 36) e 4 + 4 + 4 = 12 marcadores de recurso; a página diz 18 marcadores. A diferença não afeta regra; o tutorial não cita a contagem.

**Vídeo.** Busca no canal Duque Board Games (`https://www.youtube.com/@DuqueBoardgames/search?query=tiny%20epic%20dinosaurs`, com `Accept-Language: pt-BR`, 01/11/2026): o canal tem vídeos de Tiny Epic Cthulhu, Crimes, Pirates e Vikings, nenhum de Dinosaurs. Segunda opção do padrão, a editora: a página do produto da Meeple BR incorpora quatro vídeos. Pelo oEmbed: `KV-WTBXyqbo` "TINY EPIC DINOSAURS (+ MINI EXP LABORATORY)", Turno Extra; `g6gjURw3juU` "TINY EPIC DINOSAURS - Confira o que tem na caixa deste super lançamento", O Cartoleiro; `giNPsG9I9Q4` "Tiny Epic Dinosaurs - Regras e Gameplay Ao Vivo", Covil dos Jogos; `osld7UVfRVE` "TINY EPIC DINOSAURS - Regras + Review", Boards & Burgers. Escolhido o último: é de regras e é indicado pela editora. Nenhum tempo dentro do vídeo foi conferido, por isso só há o vídeo do topo, com `&t=0s`.

**Figuras.** Cinco recortes da parte gráfica dos exemplos ilustrados, em `como-jogar/tiny-epic-dinosaurs/figuras/` (webp, qualidade 80, até 1000 px): `preparacao.webp` (p. 5, mesa montada, sem o texto do passo 7), `espacos-ocupados.webp` (p. 7, os dois exemplos de espaço ocupado, montados lado a lado sem o texto), `cercados.webp` (p. 10, Fazenda de exemplo, sem os quadros de texto), `reproducao.webp` (p. 12, 3 Estegossauros e o filhote), `pontuacao.webp` (p. 13, trilha de pontuação).

## 3. Glossário (edição brasileira)

O tutorial usa só estes nomes, sempre os mesmos. O original em inglês não foi obtido; a coluna do original fica vazia de propósito.

| No tutorial (= manual BR) | Página | O que é |
|---|---|---|
| Dinofazendeiro | 4, 7 | Trabalhador do jogador; 4 por jogador |
| Capataz | 4, 7 | "Dinofazendeiro especial"; conta como 2 para alocar e bloquear |
| espaço de ação | 7 | Espaço nos Tabuleiros de Ação onde se aloca |
| Tabuleiro de Ação (A a D) | 2, 4 | Os 4 tabuleiros com os espaços de ação, frente e verso por número de jogadores |
| Tabuleiro de Rodada | 4, 13 | Trilha de 6 rodadas, resumo das fases, Afastamento Médico; verso é a trilha de pontuação |
| Marcador de Rodada | 4 | A caneca de café |
| Tabuleiro de Contrato | 4 | Guarda os baralhos de Contrato Público e Privado (a p. 4 também diz "Tabuleiro de Contratos") |
| Tabuleiro de Pesquisa | 5, 13 | Baralho e monte de descarte das Cartas de Pesquisa |
| Tabuleiro de Fazenda / Fazenda | 4, 10 | O terreno de cada jogador |
| Tabuleiro de Jogador | 4, 5 | Trilha de recursos, campo de Dinofazendeiros, Zona de Contenção, quadros dos dinossauros |
| Zona de Contenção | 8, 10 | Onde chegam dinossauros e Barreiras novos |
| Afastamento Médico | 8, 10 | Espaço do Tabuleiro de Rodada para onde vão peças com Dano |
| Marcador de Planta / de Carne / de Suprimento; Marcador de Recurso | 4, 6, 11 | Marcam os recursos na trilha |
| trilha de recursos | 4, 6 | De 1 a 13 |
| planta, carne, suprimento | 6 | Os três recursos |
| Marcador de Primeiro Jogador | 5, 9 | Define quem começa a alocar e o desempate (a p. 12 também diz "Marcador de Jogador Inicial") |
| Dado de Caça: Rede, Dano, Ovo | 8 | Faces do dado |
| Dinossauros comuns: Estegossauro, Velociraptor, Braquiossauro, Alossauro | 3, 8 | As quatro espécies comuns |
| Dinossauro Único | 10, 12 | Dinossauro roxo que vem com Carta de Genética |
| Herbívoro, Carnívoro, Onívoro | 11 | Tipos de dieta |
| Barreira | 9, 10 | Peça cinza que fecha Cercados |
| Montanha, Água | 10 | Bordas da Fazenda que também fecham Cercados |
| Cercado; Cercado permanente | 10 | Espaços fechados por todos os lados; cada Fazenda começa com um |
| linhas pontilhadas | 10 | Onde as Barreiras podem entrar |
| Dinossauro recém-nascido | 12 | Filhote da Reprodução |
| estoque comum | 9, 11 | Reserva geral de dinossauros |
| Cartas de Contrato Público / Contrato Privado | 4, 9 | Contratos abertos na linha / secretos de cada jogador |
| Cartas de Pesquisa: Ciência, Genética | 9, 12 | Habilidades e pontos |
| linha (de cartas) | 4, 9 | As cartas abertas à direita dos tabuleiros |
| monte de descarte | 9, 13 | Descarte de Pesquisa |
| Fuga de Dinossauros; Penalidade de Fuga dos Herbívoros / dos Carnívoros | 11 | Fuga e penalidades |
| Fases: Coletar Recursos; Alocar Dinofazendeiros; Reaver Dinofazendeiros; Adaptar a Fazenda; Alimentar os Dinossauros; Reprodução; Preparação para Próxima Rodada | 6, 13 | As 7 fases (a p. 6 grafa "Preparação da Próxima Rodada") |
| Ações: Caçar Dinossauros; Mercado de Dinossauros; Recursos; Barreiras e Marcador de Primeiro Jogador; Mova um Dinossauro de sua Zona de Contenção; Redistribuir Barreiras; Contratos; Pesquisa | 8, 9 | Títulos das ações no manual |
| Fazenda Rival, Cartas de Fazenda Rival | 2, 14 | Modo solo (só citado) |

## 4. Base de regras

Marcação: `[BR p. N]` = manual brasileiro; `[FAQ]` = p. 19. Classificação: `[verificada]`, `[interpretada]`, `[lacuna]`. Frase curta lida na página entre aspas, para o grep.

### 4.1 Objetivo e fim

| # | Regra | Fonte | Class. | Depende de |
|---|---|---|---|---|
| R1 | 6 rodadas, 7 fases, a maioria simultânea | BR p. 6 "O jogo possui 6 rodadas" | verificada | |
| R2 | No fim da 6ª rodada, soma de pontos; mais pontos vence | BR p. 13 "Ao final da 6a rodada" | verificada | R1 |
| R3 | Pontos: cada Contrato realizado (Público e Privado), cada Carta de Pesquisa, cada Dinossauro comum na Fazenda pelo valor do Tabuleiro do Jogador | BR p. 13 "Todos os jogadores recebem" | verificada | R2 |
| R4 | Valores: Estegossauro 2, Velociraptor 3, Braquiossauro 3, Alossauro 4 | BR p. 5, ilustração do Tabuleiro do Jogador (lida a 300 dpi) | verificada (ilustração) | R3 |
| R5 | Vire o Tabuleiro de Rodada; marque com um Dinofazendeiro | BR p. 13 "Vire o Tabuleiro de Rodada" | verificada | R2 |
| R6 | Desempate: o primeiro na ordem de turno a partir de quem tem o Marcador de Primeiro Jogador, sentido horário | BR p. 13 "Em caso de empate" | verificada | |
| R7 | Onívoros contam como Herbívoros ou Carnívoros na contagem de Pesquisa | BR p. 13 "Onívoros podem ser contabilizados" | verificada | |

### 4.2 Preparação

| # | Regra | Fonte | Class. |
|---|---|---|---|
| P1 | 4 Tabuleiros de Ação em ordem A a D, lado conforme o número de jogadores (canto superior esquerdo) | BR p. 4 "ordem alfabética" | verificada |
| P2 | Tabuleiro de Rodada à esquerda; Marcador de Rodada (caneca de café) no 1 | BR p. 4 | verificada |
| P3 | 1 Tabuleiro de Fazenda (lado à escolha) e 1 Tabuleiro de Jogador (lado normal) | BR p. 4 "Escolha qual lado" | verificada |
| P4 | 4 Dinofazendeiros e 1 Capataz; Capataz e 3 no Tabuleiro de Jogador; o último no espaço 4 do Tabuleiro de Rodada | BR p. 4 "Posicione o último Dinofazendeiro" | verificada |
| P5 | Marcadores à esquerda da trilha valem 0 | BR p. 4 "seu valor é “0”" | verificada |
| P6 | Tabuleiro de Contrato acima; baralhos separados pelo verso; linha de Públicos = jogadores + 1 | BR p. 4 "número de jogadores +1" | verificada |
| P7 | 2 Contratos Privados por jogador, fica com 1, devolve 1, reembaralha; secretos até realizados | BR p. 4 "escolhe 1 Contrato Privado para manter" | verificada |
| P8 | Tabuleiro de Pesquisa abaixo; revele 3 cartas | BR p. 4 "Revele 3 cartas" | verificada |
| P9 | Dinossauros por cor e Barreiras ao alcance; Dado de Caça perto do Tabuleiro A | BR p. 5 | verificada |
| P10 | Primeiro jogador: última pessoa a visitar um museu de história natural, ou outro método | BR p. 5 | verificada |
| P11 | Bônus: 2º jogador planta no 1; 3º carne no 1; 4º suprimento no 1; com menos jogadores, até aquela quantidade | BR p. 5 "bônus iniciais" | verificada |

### 4.3 Coletar Recursos

| # | Regra | Fonte | Class. |
|---|---|---|---|
| C1 | Simultâneo; 1 recurso por símbolo não coberto por dinossauro | BR p. 6 "não está coberto por um Dinossauro" | verificada |
| C2 | Máximo 13 de cada; nenhum abaixo de 0 | BR p. 6 "no máximo 13 recursos" | verificada |
| C3 | Rodada 1: 5 plantas, 3 carnes, 1 suprimento | BR p. 6 "colete 5 , 3 , e 1" (ícones lidos na imagem) | verificada |
| C4 | O excedente acima de 13 se perde | BR p. 6 (teto); o "perdido" é explícito só no modo solo, p. 17 | interpretada: com teto de 13, não há onde guardar o excedente |

### 4.4 Alocar Dinofazendeiros

| # | Regra | Fonte | Class. |
|---|---|---|---|
| A1 | Começa quem tem o Marcador de Primeiro Jogador; alternância em sentido horário | BR p. 7 | verificada |
| A2 | Na vez, 1 Dinofazendeiro (ou Capataz) num espaço vazio; ação na hora | BR p. 7 "um único Dinofazendeiro" | verificada |
| A3 | Sem peças, o jogador é pulado; a fase segue até todos alocarem tudo | BR p. 7 | verificada |
| A4 | Espaço ocupado: 1 a mais que o jogador que mais tem ali | BR p. 7 "1 Dinofaendeiro a mais" | verificada |
| A5 | Capataz conta 2 para alocação e bloqueio | BR p. 7 | verificada |
| A6 | Em espaço ocupado, as peças necessárias vão juntas na mesma vez | BR p. 7, texto e ilustrações | interpretada (seção 5.1) |
| A7 | Proibido alocar onde já tem Dinofazendeiro | BR p. 7 "Você NÃO PODE" | verificada |
| A8 | Círculo preto = custo; pague na hora e faça pelo menos parte da ação | BR p. 7 e 8 "você DEVE pagar" | verificada |
| A9 | Só aloca onde pode fazer a ação | FAQ p. 19 "Você DEVE ser capaz" | verificada |
| A10 | Símbolo + indica o que se recebe | BR p. 8 | verificada |
| A11 | Caçar: recebe o Dinossauro comum do espaço na Zona de Contenção | BR p. 8 "receba 1 dos Dinossauros comuns (veja lista)"; ilustração p. 5 mostra uma espécie por espaço | interpretada (o texto diz "1 dos Dinossauros comuns"; o espaço mostra qual) |
| A12 | Dado: Rede sem efeito; Dano: Dinofazendeiro(s) e o dinossauro para o Afastamento Médico da sua cor; Ovo: mais um da mesma espécie | BR p. 8 | verificada |
| A13 | Caça sempre dá ao menos 1 dinossauro | BR p. 8; FAQ p. 19 | verificada |
| A14 | Mercado: 1 comum qualquer ou um dos listados; paga o custo; Zona de Contenção; sem dado | BR p. 8 | verificada |
| A15 | Recursos: recebe os mostrados | BR p. 8 | verificada |
| A16 | Barreiras: recebe na Zona de Contenção; Marcador de Primeiro Jogador: toma de quem tem, ou mantém | BR p. 9 | verificada |
| A17 | Mova um Dinossauro de sua Zona de Contenção para a Fazenda; não importa Cercado nesse momento | BR p. 9 | verificada |
| A18 | Redistribuir Barreiras: 1 ou mais da Fazenda para a Zona de Contenção | BR p. 9 | verificada |
| A19 | Espaço com 2 ações: ao menos uma, pode as duas, ordem livre | BR p. 9, legenda | verificada (ver 5.2) |
| A20 | Contratos: descarta os dinossauros da carta, da Fazenda, não da Zona; dinossauros ao estoque; não repõe a linha | BR p. 9 "DEVEM estar em sua Fazenda" | verificada |
| A21 | Único descartado em contrato: carta de Pesquisa ao descarte | BR p. 9 | verificada |
| A22 | Contrato Privado só logo após um Público, se tiver os dinossauros | BR p. 9; FAQ p. 19 | verificada |
| A23 | Pesquisa: da linha, ou compra 3 e fica com 1, as 2 para a linha; linha vazia obriga a comprar 3 | BR p. 9 | verificada |

### 4.5 Reaver, Adaptar, Alimentar, Fuga, Reprodução

| # | Regra | Fonte | Class. |
|---|---|---|---|
| F1 | Reaver: recolhe todos, inclusive do Afastamento Médico; dinossauros do Afastamento vão para a Zona de Contenção | BR p. 10 | verificada |
| F2 | Adaptar: simultâneo; Barreiras e dinossauros da Zona de Contenção para a Fazenda | BR p. 10 | verificada |
| F3 | Barreiras só nas linhas pontilhadas; as de rodadas anteriores não se movem | BR p. 10 | verificada |
| F4 | Dinossauros da Fazenda movem-se à vontade | BR p. 10 | verificada |
| F5 | Comum fora de Cercado foge | BR p. 10 "DEVEM ser posicionados dentro de Cercados" | verificada |
| F6 | Cercado: espaços fechados por Barreiras, Montanhas e Água; 1 Cercado permanente; tamanho livre; N espaços = N dinossauros de uma única espécie | BR p. 10 | verificada |
| F7 | Montanhas, Água e Cercados permanentes contam como Barreiras | FAQ p. 19 | verificada |
| F8 | Únicos: não precisam de Cercado; áreas abertas com outros Únicos; não em Cercado com comuns | BR p. 10; p. 12 "normalmente" | verificada / ambígua (5.3) |
| F9 | Alimentar: simultâneo; inclui Únicos; Herbívoros planta, Carnívoros carne, Onívoros planta ou carne | BR p. 11; FAQ p. 19 | verificada |
| F10 | Quantidades: Estegossauro 1 planta, Velociraptor 1 carne, Braquiossauro 2 plantas, Alossauro 2 carnes | BR p. 5 (quadros) e p. 11 (exemplos) | verificada (ilustração) |
| F11 | Ordem livre; alimente até acabar o recurso ou todos comerem; não alimentados fogem | BR p. 11 | verificada |
| F12 | Fuga em Adaptar, Alimentar e Reprodução (ícones 4, 5, 6) | BR p. 11 | verificada |
| F13 | Cada penalidade uma vez por rodada; ordem livre | BR p. 11; FAQ p. 19 | verificada |
| F14 | Onívoro em fuga: o jogador escolhe o tipo | BR p. 11 | verificada |
| F15 | Herbívoros: remove 1 Barreira à escolha, se houver; Cercado aberto: alimentados não fogem, mas não reproduzem | BR p. 11 | verificada |
| F16 | Carnívoros: descarta qualquer outro dinossauro, se houver; pode ser um que fugiria; herbívoro comido antes de fugir não causa penalidade | BR p. 11 | verificada |
| F17 | Fugitivos ao estoque; carta de Único ao descarte | BR p. 11 | verificada |
| F18 | Reprodução: só alimentados; cada 2 comuns iguais no mesmo Cercado = 1 filhote; fora de Cercado não reproduz | BR p. 12 | verificada |
| F19 | Cercado precisa estar totalmente fechado | FAQ p. 19 | verificada |
| F20 | Filhotes do estoque, postos na hora num Cercado, não necessariamente o dos pais; ordem livre; não reproduzem na rodada; sem espaço, fogem | BR p. 12; FAQ p. 19 | verificada |
| F21 | Estoque esgotado: efeito cancelado; na Reprodução, um por vez a partir do jogador inicial | BR p. 12 | verificada |
| F22 | Para onde vai a Barreira removida; se pode ser parte do Cercado permanente | Não está no manual | lacuna |
| F23 | Obrigação de alimentar enquanto houver recurso | BR p. 11 "Alimente até que você não possua mais recursos" | interpretada: o tutorial reproduz a frase sem afirmar mais |

### 4.6 Preparação para Próxima Rodada e quarta rodada

| # | Regra | Fonte | Class. |
|---|---|---|---|
| N1 | Completar Contratos Públicos até jogadores + 1 | BR p. 13 | verificada |
| N2 | Descartar as Cartas de Pesquisa abertas, revelar 3; baralho vazio: reembaralhar o descarte | BR p. 13 | verificada |
| N3 | Avançar o Marcador de Rodada; nova rodada com Coletar e depois Alocar, a partir do Marcador de Primeiro Jogador | BR p. 13 | verificada |
| N4 | Rodada 4: novo Dinofazendeiro e 1 Contrato Privado comprado e mantido | BR p. 13 "compram e mantém uma nova" | verificada |

### 4.7 Cartas de Pesquisa

| # | Regra | Fonte | Class. |
|---|---|---|---|
| Q1 | Dois tipos, Ciência e Genética; habilidades e pontos | BR p. 12 | verificada |
| Q2 | Genética traz Dinossauro Único, que deve ser alimentado | BR p. 12 | verificada |
| Q3 | Únicos usualmente não reproduzem; habilidades só na Fazenda | BR p. 12 | verificada |
| Q4 | Ciência funciona na rodada em que foi pega; Genética só com o Único na Fazenda | FAQ p. 19 | verificada |
| Q5 | Incubadora de Ovos (fase 6: pague 2 suprimentos para 1 comum na Zona de Contenção, 1 ponto); Anquilossauro (herbívoro; quem tomar o Marcador de Primeiro Jogador paga 2 carnes, 2 pontos) | BR p. 12, ilustrações | verificada (ícones lidos na imagem) |
| Q6 | Onde o Dinossauro Único entra ao ser recebido | FAQ p. 19 sugere a Zona de Contenção | lacuna; o tutorial não afirma |

### 4.8 Erros comuns e de onde vem a evidência

O próprio FAQ (p. 19) responde a seis dúvidas que o tutorial trata como erro provável: Dano ainda dá dinossauro; Privado sem Público; penalidade por cada dinossauro; alocar sem poder fazer a ação; reproduzir em Cercado aberto; Onívoro comer os dois recursos. O manual destaca em caixa de alerta: alocar onde já tem peça (p. 7), Dinossauro Único fora de Cercado (p. 10), limite do estoque (p. 12) e a quarta rodada (p. 13). Não foi feita pesquisa em fórum.

## 5. Divergências e ambiguidades

### 5.1 "Um único Dinofazendeiro" e espaço ocupado (p. 7)
A p. 7 diz que, na vez, o jogador posiciona "um único Dinofazendeiro" num espaço vazio, e no parágrafo seguinte manda pôr "1 Dinofazendeiro a mais" que o adversário num espaço ocupado, com exemplos de 2 e 3 peças; as ilustrações mostram as peças entrando juntas. Leitura adotada: espaço vazio, 1 peça; ocupado, todas as necessárias na mesma vez. Tutorial: `[!edicao]` nas Situações especiais.

### 5.2 Espaço com duas ações (p. 9 x p. 19)
Legenda da p. 9: "deve realizar pelo menos uma delas, mas poderá realizar ambas". FAQ: "(Caso um espaço possua várias ações, então você pode realizar apenas uma delas.)", como complemento de "Você DEVE ser capaz de realizar a ação". Leitura adotada: basta poder fazer uma para alocar; a p. 9 rege o que se faz. Tutorial: `[!edicao]`.

### 5.3 Únicos em Cercado com comuns (p. 10 x p. 12)
"não podem" (p. 10) x "normalmente não podem" (p. 12). Tutorial: regra geral, com `[!edicao]`.

### 5.4 Nome da fase 7
"Preparação da Próxima Rodada" (p. 6) x "Preparação para Próxima Rodada" (p. 13, título, e Tabuleiro de Rodada). O tutorial usa a segunda e avisa.

### 5.5 Outros nomes duplos
"Tabuleiro de Contrato" / "Tabuleiro de Contratos" (p. 4); "Marcador de Primeiro Jogador" / "Marcador de Jogador Inicial" (p. 12, carta; p. 14). O tutorial usa sempre o primeiro de cada par.

### 5.6 Página do produto x manual
Contagem de marcadores de recurso (18 x 12). Sem efeito em regra.

## 6. Plano instrucional

| Classe de tarefa | Informação de apoio (`[!entender]`) | Informação procedural (`[!passos]`, `[!mais]`) | Tarefas | Prática específica |
|---|---|---|---|---|
| Comece em 4 minutos: montar e alocar o primeiro Dinofazendeiro | A ideia do jogo, 4 termos | Montagem numerada, 5 passos do turno, Caçar | resolvido, complete (2), sua vez (2) | Erros mais caros |
| Etapa 1: montar a mesa | O que é cada tabuleiro; tabela dos 4 dinossauros | Preparação em 12 passos | resolvido, sua vez (2) | |
| Etapa 2: coletar e alocar | Renda cai com dinossauros; Capataz vale 2; usos dos recursos | Coletar (3), turno (7), ações (6), 5 `[!mais]` | resolvido, complete (2), sua vez (2) | |
| Etapa 3: cuidar da Fazenda | Cercado, Barreira fixa x dinossauro móvel | Reaver, Adaptar, Alimentar, Fuga, Reprodução; 3 `[!mais]` | resolvido, complete (3), sua vez (3) | Treino: conta da comida (é a conta que se faz toda rodada) |
| Etapa 4: fechar rodada e partida | Três fontes de pontos; contrato x dinossauro guardado | Preparação, quarta rodada, pontuação; 1 `[!mais]` | resolvido, complete (2), sua vez (2) | |

Decisões de carga: as ações raras (Mova, Redistribuir, espaço de duas ações, Contrato Privado, Contrato com Único) ficam em `[!mais]`; o modo solo fica fora, só citado; as Cartas de Pesquisa entram por dois exemplos impressos no manual, sem catálogo. Os custos de cada espaço de ação não são listados: o texto do manual não os descreve, e a ilustração da p. 5 (lado de 1 a 3 e de 1 a 2 jogadores) não basta para os lados de 4 jogadores. O texto manda ler o custo impresso. Limite: um texto não observa o leitor nem ajusta o apoio.

## 7. Extensão

`wc -w` do tutorial: 6.602 palavras, das quais cerca de 420 são a folha de consulta e as fontes, e boa parte do resto são opções de múltipla escolha e explicações escondidas. A seção "Comece" tem 1.010 palavras por `wc`, mas passa no `checar_comece.py` (que não conta opções nem explicações). Fica um pouco acima do alvo de 6.000; o que pesou foi a etapa 3, que junta cinco fases com regras de exceção (fuga, penalidades, Cercado aberto, estoque).

## 8. Contas

Script: `<scratchpad>/ted-scripts/contas.py`, rodado em 01/11/2026. Resultados usados no texto:

- Segundo jogador, rodada 1: 1 + 5 plantas = 6; 3 carnes; 1 suprimento.
- Espaço ocupado: por 1 → 2; por Capataz → 3; por 1 e por Capataz de jogadores diferentes → 3; por Capataz + 1 → 4.
- Etapa 2, coleta: (1, 0, 2) + (3, 3, 1) = (4, 3, 3). Teto: 11 + 5 → 13.
- Etapa 3: 2 Estegossauros + 1 Braquiossauro pedem 4 plantas; filhote ocupa o 3º espaço; 3 x 2 + 3 = 9 pontos. Com 3 plantas sobra 1, menos que os 2 do Braquiossauro. Reprodução: 2→1, 3→1, 4→2, 5→2.
- Treino: 3 Estegossauros + 1 Braquiossauro + 2 Alossauros + 1 Velociraptor = 5 plantas e 5 carnes.
- Etapa 4: Ana 32 + 3 + 16 = 51; Bruno 24 + 5 + 19 = 48. 3 Estegossauros = 6 contra contrato de 7.
- Avaliação 8: 2 x 3 + 3 = 9.

Os contratos de exemplo (3 Estegossauros por 7; 10, 11, 13, 14, 15 pontos) usam valores que existem nas cartas das p. 2 e 5. As Cartas de Pesquisa de 1 e 2 pontos usam valores impressos nas cartas da p. 5 e 12.

## 9. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (`avisos` aplicado ao texto do tutorial e ao JSON): 0 avisos.
- Exclamação fora das marcas de bloco: 0.
- `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-dinosaurs/tutorial.md`: passa.
- Múltipla escolha: 29 perguntas, cada uma com 3 ou 4 opções e exatamente uma certa (script de conferência).
- Conversor: `como_jogar_md.pagina()` chamado em memória, sem gravar: gera a página com 29 quizzes, 5 figuras e o vídeo.
- Legibilidade (Flesch adaptado): não medida; o script citado no prompt (`Arcvalion_gospel`) não está disponível nesta sessão.

## 10. Dados do `conteudo/como-jogar/tiny-epic-dinosaurs.json`

- Jogadores "1 a 4", duração "30 a 60 min", idade "14+": página do produto da Meeple BR. O manual confirma 1 a 4 (modo solo, p. 14; bônus do quarto jogador, p. 5).
- Gênero "Alocação de trabalhadores · Estratégia": a mecânica descrita nas p. 7 a 9; "Estratégicos" é a categoria da página do produto.
- `"resenha": null` (sem resenha no site); `"publicar": false` até a auditoria independente.
- `leitura_min` 24: proporcional ao de Azul (8.081 palavras, 29 min).
