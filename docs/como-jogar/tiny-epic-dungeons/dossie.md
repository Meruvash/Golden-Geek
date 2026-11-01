# Dossiê: Como Jogar Tiny Epic Dungeons

Entrega 1 da linha COMO JOGAR para Tiny Epic Dungeons (Scott Almes, Gamelyn Games, 2021). Produzido em 01/11/2026 segundo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md`. Nada daqui está publicado (`"publicar": false`).

---

## 1. O jogo e as exceções ao método

**Escolha.** Jogo definido pelo editor; não houve etapa de candidatos. Não há resenha no site (não existem `tiny-epic-dungeons/` na raiz nem `conteudo/tiny-epic-dungeons.json`), então `"resenha": null`.

**Exceções do BRIEF:** fonte de regra é o manual oficial em português da edição brasileira (Meeple BR), com os termos exatamente como impressos; arquivos em `docs/como-jogar/tiny-epic-dungeons/` e `conteudo/como-jogar/tiny-epic-dungeons.json`; figuras em `como-jogar/tiny-epic-dungeons/figuras/`; sem commit, sem push, sem subagentes; auditoria independente fica para depois.

## 2. Fontes

| Fonte | Versão | Onde | Uso |
|---|---|---|---|
| **Manual oficial** *Tiny Epic Dungeons: Manual do Aventureiro*, Meeple BR | PDF de 20 páginas ("TEDu_rulebook PT-BR.indd", InDesign 17, criado em 16/05/2022, modificado em 02/02/2023, 21.159.299 bytes). Tradução Romir G. E. Paulino; edição brasileira Thiago Leite; revisão Aline Costa e Márcio Botelho (p. 17) | https://meeplebr.com/wp-content/uploads/2022/02/TEDu_rulebook-PT-BR-1_compressed.pdf, linkado na página do produto. Já baixado no scratchpad (`tinyepic/tiny-epic-dungeons.pdf`) | Única fonte de regra |
| Página do produto Meeple BR | Consultada em 01/11/2026 (WebFetch) | https://meeplebr.com/product/tiny-epic-dungeons/ | Ficha: "1 a 4 jogadores", "30 a 60 minutos", "para maiores de 14 anos"; link do manual |
| Reedição Galápagos/Asmodee Brasil (TNE001) | Não obtida nesta sessão | https://www.asmodee.com.br/tiny-epic-dungeons/produto/TNE001 (registro de pesquisa anterior no scratchpad) | Só o aviso `[!edicao]` da etapa 1: termos podem diferir, não confirmado |
| Vídeo Duque Board Games | "TINY EPIC DUNGEONS - Gameplay resumida em 10 minutos!", id NXVZinKgee0, título e canal pelo oEmbed em 01/11/2026; achado pela busca do próprio canal | https://www.youtube.com/watch?v=NXVZinKgee0 | Só o vídeo do fim do "Comece"; não é fonte de regra |
| FAQ ou errata | Não procurados | | Lacuna |

**Paginação.** O PDF tem 20 páginas: as p. 1 a 18 do PDF são as páginas impressas 1 a 18; a página 19 do PDF é um spread com as páginas impressas 19 e 20; a página 20 do PDF é o verso com a Referência dos Ícones. O tutorial cita os números impressos ("p. 19", "p. 20") e "verso" para a Referência dos Ícones.

**Como o manual foi lido.** `pdftotext` sem `-layout`, dividido por página (`tinyepic/ted/p01.txt` a `p20.txt`). A extração embaralha os textos das cartas ilustradas com o corpo, e todos os ícones (Vida, Foco, Velocidade, Defesa, Espólio, Feitiço) somem do texto ("receba 3 e 5"). Por isso todas as páginas de regra foram lidas também como imagem, a 110 e a 170 dpi (p. 4 a 19), e o Tabuleiro de Tocha em recorte a 400 dpi. Ícones lidos na imagem: Descansar = +3 Vida e +5 Foco (p. 10); Dado de Inimigo com faces 2, 3, 4, 5, Escudo e Tocha (p. 12); dado de herói +2 com 3 raios, 3 com 1 raio, +1 com 2 raios, 4 com 1 raio (p. 9, ilustração); modificador de Goblin "+1 x Goblin" (p. 12).

**Ficha da caixa.** Jogadores, duração e idade vêm da página do produto da Meeple BR. O manual confirma 2 a 4 heróis na preparação e o solo com pelo menos 2 heróis (p. 4 e 17).

## 3. Glossário (termos impressos na edição Meeple BR)

| Termo no tutorial | Página | Função |
|---|---|---|
| Baralho da Masmorra; Baralho A, B, C | 4 | Pilha das salas por revelar, montada em 3 camadas |
| Carta de Entrada; Salas; Encontros; Carta da Porta do Covil | 4 | Os quatro tipos de Carta de Masmorra |
| Grade (7x7) | 4, 8 | Limite da masmorra |
| Marcador de Altar | 4, 17, 19 | Barreiras do Chefe |
| Tabuleiro de Tocha; Marcador de Tocha; espaço da caveira | 4, 15 | Relógio da partida |
| Cartas de Goblin; Marcadores de Goblin; Monte de Descarte de Goblins | 4, 13 | Goblins |
| Cartas de Lacaio; Marcadores de Lacaio | 4, 8 | Lacaios |
| Marcadores de Vida (dos Lacaios e do Chefe) | 4, 13, 17 | Vida dos Lacaios, depois do Chefe |
| Tabuleiro(s) de Chefe / Tabuleiro do Chefe; Marcador do Chefe | 4, 17 a 19 | O Chefe e o Covil |
| Cartas de Espólio; Cartas de Feitiço; linha de descarte | 4, 16 | Itens |
| Tabuleiro de Herói; Miniatura; Marcador de Vida; Marcador de Foco | 5 | Herói |
| Marcadores de Desarme | 5, 10 | Armadilha desarmada |
| Dados de Herói; Dado de Inimigo | 5, 9, 12 | Testes e contra-ataque |
| Vida, Foco, Velocidade, Defesa | 6 | Atributos |
| Força, Agilidade, Intelecto (Habilidades) | 6 | Quantos dados se rola |
| Teste de Habilidade | 9 | Mecânica central |
| Mover; corredor; caminho | 7 | Movimento |
| Revelar; Verificar Perigos; Explorar Mais; Limite de Tamanho da Masmorra | 7, 8 | Exploração |
| Encontro com Goblin; Encontro com Lacaio; Armadilha; Portal; Furtividade | 7, 8 | Ícones de sala |
| Ação Heroica (placa azul): Descansar, Procurar, Desarmar Armadilha, Lançar Feitiço, Atacar | 9 a 11 | Uma por turno |
| Ataque Corpo-a-Corpo; Ataque à Distância; Ataque com Feitiço | 11 | Tipos de ataque |
| Alcance: Mesma Sala, Linha de Visão, Qualquer Caminho, Todos os Heróis / Inimigos | 11 | Alcance |
| Contra-Ataque; Escudo; Tocha; modificador do inimigo | 12 | Revide |
| Herói inconsciente | 13 | Vida a zero |
| Ações Livres (placa laranja): Modificar o Dado de Herói em 1, Entrar no Covil do Chefe, Revelar Salas Adjacentes Não Exploradas, Pesquisa, Aumentar Modificadores/Atributos, Acionar Habilidades | 14 | Ações sem limite |
| Adicione um Goblin na Entrada; Acione Ações do Inimigo; Mover ou Atacar; Mover e Atacar | 15 | Espaços da tocha e IA |
| Descobrir; Pegar; Mão; Vestimenta; Joia; Conjuntos Lendários | 16 | Espólios e feitiços |
| Batalha Final; Espaços de Herói; Espaço da Entrada; efeitos adicionais | 18 | Ato 2 |
| Trilha de Vida do Chefe; Altares; Provocar o Chefe; Tocha do Chefe; Contra-Ataque do Chefe | 19, 20 | Ato 2 |

Observação: o manual usa "dano" sem ícone separado ("Receba 1 dano", p. 8) e "Vida" no resto; o tutorial faz o mesmo.

## 4. Base de regras

Classificação: `[V]` verificada nesta sessão (texto e, quando há ícone, imagem), `[I]` interpretada, `[L]` lacuna.

### 4.1 Objetivo, vitória e derrota

| # | Regra | Fonte (frase lida) | Cl. |
|---|---|---|---|
| R1 | Cooperativo, 2 atos, turnos em sentido horário | p6 "A partida possui dois Atos" | V |
| R2 | Vitória: derrotar o Chefe no Ato 2 (Marcadores de Vida a zero) | p6; p18 "reduzir todos os Marcadores de Vida do Chefe a zero" | V |
| R3 | Derrota: quinto Goblin; tocha na caveira; sem corredor aberto e Porta do Covil não revelada | p6 itens 1 a 3; p8; p15 | V |

### 4.2 Preparação

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R4 | Baralho A: Salas 9/7/5 para 2/3/4 heróis | p4 A | V |
| R5 | Baralho B: 1 Encontro e 3 Salas por herói | p4 B | V |
| R6 | Baralho C: 3 Salas + Porta do Covil | p4 C | V |
| R7 | Empilhar C, B, A; sobras à caixa | p4 D, E | V |
| R8 | Entrada no centro; 4 cartas viradas nos lados; espaço para Grade 7x7 | p4 F, G | V |
| R9 | 1 Altar na Entrada; mais 1 por herói separados | p4 H, I | V |
| R10 | Tabuleiro de Tocha Ato 1; tocha no espaço do número de heróis | p4 J, K | V |
| R11 | Baralhos de Goblin e Lacaio; 4 Marcadores de Goblin nos números; Marcadores de Vida = heróis | p4 L, M, N | V |
| R12 | Tabuleiro de Chefe sorteado oculto, Ato 1; Marcador do Chefe | p4 O, P | V |
| R13 | Baralhos de Espólio e Feitiço com espaço para linha | p4 Q | V |
| R14 | Tabuleiro de Herói (3 formas de escolher); miniatura na Entrada; Vida e Foco no topo | p5 R, S, T | V |
| R15 | 7 Marcadores de Desarme; dados ao mais novo, que começa | p5 U, V | V |
| R16 | Solo: 2 ou mais heróis; nº de heróis = nº de jogadores | p17 | V |

### 4.3 Atributos e turno

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R17 | Vida abaixo de 1: marcador em 0, inconsciente | p6 | V |
| R18 | Foco abaixo de 1: 0, sem efeito negativo | p6 | V |
| R19 | Velocidade = salas por turno; Defesa anula contra-ataque | p6 | V |
| R20 | Habilidades: cubos = dados; máximo 3, mínimo 1 | p6, p9 | V |
| R21 | Turno: Mover, 1 Ação Heroica, Ações Livres, qualquer ordem, nada obrigatório | p6 | V |
| R22 | Fim de turno: tocha desce 1, resolve espaço | p6 | V |

### 4.4 Movimento e exploração

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R23 | 1 Velocidade por sala, por corredor (exceto Portal) | p7 | V |
| R24 | Ação Heroica encerra o movimento; Ação Livre não | p7 | V |
| R25 | Sala com inimigo: para; Furtividade passa | p7 | V |
| R26 | Heróis não afetam movimento; qualquer número por sala | p7 | V |
| R27 | Armadilha não desarmada: Verificar Perigos a cada entrada; desarmada: ignora | p7, p8 | V |
| R28 | Portal: Ação Livre, 2 Foco, para Carta de Masmorra revelada; segue andando; não sai de sala travada por inimigo; vale Porta do Covil, não Tabuleiro do Chefe | p7 | V |
| R29 | Revelar: carta virada vizinha, 1 Velocidade, girar até ligar corredor com a sala de origem | p7 | V |
| R30 | Cartas novas viradas nos corredores abertos que dão em espaço vazio; baralho vazio, pula; depois entra e Verifica Perigos | p7 | V |
| R31 | Ícone de revelar em habilidade dispensa entrar na sala revelada | p7 observação | V |
| R32 | Grade: até 3 cartas da Entrada em qualquer direção | p8 | V |
| R33 | Encontro com Goblin: 1 dano (se na sala), para; carta no espaço livre mais baixo; marcador correspondente na sala; baralho vazio reembaralha descarte; quinto Goblin perde | p8 | V |
| R34 | Encontro com Lacaio: 2 danos (se na sala), para; carta à direita; Marcador de Vida no topo da trilha; Marcador de Lacaio na sala | p8 | V |
| R35 | Armadilha: teste do lado esquerdo; fracasso, dano da caixa; depois segue ou tenta Desarmar | p8 | V |
| R36 | Explorar Mais: continua até acabar Velocidade ou encontrar inimigo | p8 | V |
| R36a | Encontros com Goblin aparecem em cartas de Sala (as do Baralho A podem trazê-los); Lacaios vêm das cartas de Encontro | p4 (composição dos baralhos), p8, verso ("Encontro com Lacaio" como tipo de carta) | I: o manual não lista o conteúdo de cada carta; o exemplo do "Comece" usa Goblin numa sala do começo |

### 4.5 Testes e Ações Heroicas

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R37 | Teste: igualar ou exceder; verde sucesso, vermelho fracasso; custo após sucesso | p9 | V |
| R38 | Escolhe 1 dado; faces 1 e 2 com "+" modificam o escolhido ou servem de resultado (1 ou 2) | p9 | V |
| R38a | Os dois dados "+" podem somar juntos | p9 "Esses dois menores podem ser usados para modificar" | I |
| R39 | Após sucesso, raios dos dados não usados dão Foco (faces 1 a 4) | p9 | V |
| R40 | Após resolver um teste, cada 6 não usado dá 1 Vida | p9 | V |
| R41 | Modificadores somam ao resultado | p9 | V |
| R42 | Descansar: +3 Vida, +5 Foco (ícones na imagem); obrigatório se inconsciente | p10 | V |
| R43 | Procurar: sala com característica; teste ou custo; não com inimigo salvo outro herói consciente | p10 | V |
| R44 | Desarmar: depois do teste de escapar, teste do lado direito; mesma restrição de inimigo; sucesso: Marcador de Desarme, ignora pelo resto da partida, 1 Espólio ou 1 Feitiço; fracasso nada; não se desarma de novo | p10 | V |
| R44a | Desarmar só logo após o teste de escapar | p10 "Após você ter realizado o Teste" | I |
| R45 | Lançar Feitiço: alvo no alcance; teste; Foco dos dados não usados entra antes do efeito | p10 | V |

### 4.6 Combate

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R46 | Atacar vem de espólio, feitiço, equipamento; 3 tipos e alcances | p11 | V |
| R47 | Feitiço ignora Defesa | p11 | V |
| R48 | Dado de Inimigo junto se alvo em linha de visão ou mesma sala e capaz de contra-atacar | p11 | V |
| R49 | Corpo-a-Corpo e Distância: maior que Defesa (com bônus); dano = diferença; igual ou menor, nada | p11 | V |
| R50 | Arma define a Habilidade (geral: Força / Agilidade) | p11 | V |
| R51 | Alcances: Mesma Sala; Linha de Visão (não na mesma sala); Qualquer Caminho; Todos; ninguém bloqueia | p11 | V |
| R52 | Contra-ataque: inimigo vivo, mesma sala ou linha de visão | p11, p12 | V |
| R53 | Dado 2 a 5 + modificador; Escudo = Defesa do herói (dano = modificador); Tocha: sem dano, tocha desce 1 | p12 | V |
| R54 | Modificadores: Goblin = nº de Goblins; Lacaio CaC vs Distância/Feitiço; Chefe por tipo | p12 | V |
| R55 | Herói recebe total menos Defesa (com modificadores) se maior | p12 | V |
| R56 | Feitiço sem linha de visão: sem contra-ataque; vários alvos: só um contra-ataca, à escolha | p12 | V |
| R57 | Morto não contra-ataca | p13 | V |
| R58 | Goblin 1 Vida; marcador volta, carta ao descarte; recompensa opcional, "/" ou, "+" e | p13 | V |
| R59 | Lacaio: Vida na carta; morto, carta e marcador à caixa; Marcador de Vida no coração do Tabuleiro do Chefe; 1 espólio ou feitiço duas vezes; tocha sobe 6 até o espaço inicial | p13 | V |
| R60 | Inconsciente: turno acaba; 0; deitar; próximo turno Descansar, mover, acaba; sem Ações Livres; cura reanima | p13 | V |

### 4.7 Ações Livres, espólios, tocha

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R61 | Ações Livres só no seu turno, a qualquer momento | p14 | V |
| R62 | Modificar dado em 1: 2 Foco, Dado de Herói, repetível, 1 a 6 sem pular | p14 | V |
| R63 | Entrar no Covil: Ação Livre na Porta do Covil; 1 Velocidade até a entrada | p14, p17, p18 | V |
| R64 | Revelar Salas Adjacentes: tocha desce 1; revela todas as vizinhas; encontros entram, sem perda de Vida | p14 | V |
| R64a | Orientação das salas e cartas novas nessa Ação Livre | não dito | L |
| R65 | Pesquisa: 4 Foco, feitiço do baralho ou da linha; coberta por espólio de Mão, não vale | p14 | V |
| R66 | Habilidades com placa azul + ":" só durante aquela Ação Heroica | p14 | V |
| R67 | Tocha: caveira perde; sobe, mas nunca acima do inicial; desce e para ou passa por espaços: aciona | p15 | V |
| R68 | Adicione um Goblin na Entrada: marcador de menor valor na Entrada; carta no espaço correspondente; quinto perde | p15 | V |
| R69 | Ações do Inimigo: todos, em ordem, atacam todos os heróis no alcance; inconscientes não; Defesa e habilidades não bloqueiam | p15 | V |
| R70 | Ordem: Goblins 1 a 4; Lacaios esquerda para direita / Chefe | p15 | V |
| R71 | Mover ou Atacar; Mover e Atacar | p15 | V |
| R72 | Movimento inimigo: herói consciente mais próximo, caminho mais curto, até Velocidade, para na primeira sala com herói; empates, jogador ativo; sem heróis conscientes, não move; ignora armadilhas e inimigos; não atravessa paredes | p15 | V |
| R73 | Descobrir (colorido): topo ou linha; manter ou descartar. Pegar (cinza): só linha | p16 | V |
| R74 | Equipar só ao Descobrir/Pegar; descartar é Ação Livre; não se entrega a outro herói | p16 | V |
| R75 | Mão cobre equipamento/habilidade inicial; descartar libera | p16 | V |
| R76 | Limites: 2 Mão, 1 Vestimenta, 2 Feitiços, 2 Joias | p16 ilustração; verso | V |
| R76a | O que fazer ao descobrir carta com limite cheio | não dito | L (o tutorial sugere descartar antes, marcado como leitura) |
| R77 | Conjuntos Lendários: 2+ itens, bônus cresce, 4 = máximo | p16 | V |

### 4.8 Ato 2

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R78 | Condição: Porta do Covil revelada e todos os Lacaios mortos | p17 | V |
| R79 | Passos 1 a 4 ao Entrar no Covil | p17 | V |
| R80 | Tabuleiro do Chefe = sala grande; mesma sala e linha de visão | p18 | V |
| R81 | Entrada primeiro; Espaços de Herói vizinhos como salas; atravessa heróis, não divide no fim; entrada ocupada com 1 Velocidade: não entra; sai pela entrada | p18 | V |
| R82 | Efeitos adicionais só ao terminar o movimento | p18 | V |
| R83 | Goblins no Covil: centro do tabuleiro; atacam todos no Covil; podem ser atacados; escolher Goblin ou Chefe | p18 | V |
| R84 | Atacar o Chefe só de Espaço de Herói; Chefe na masmorra: como qualquer inimigo | p19 | V |
| R85 | Contra-ataque do Chefe: modificadores por tipo; perdas depois do ataque; Tocha do Chefe aciona efeito do tabuleiro; Tocha resolve antes de Ação do Inimigo | p19, p20 | V |
| R86 | Trilha do Chefe: marcador por Lacaio, independentes; dano divisível | p19 | V |
| R87 | Não entram nem passam de Altar descoberto; dano excedente perdido | p19 | V |
| R88 | Chefe entra em sala com Marcador de Altar: marcador vai ao espaço de Altar mais alto descoberto | p19 | V |
| R89 | Sem heróis no Tabuleiro do Chefe e Ação do Inimigo: Chefe vai à Porta do Covil e ao herói mais próximo | p19 | V |
| R90 | Provocar o Chefe: 2 Foco, até 2 salas, vira alvo exclusivo, repetível | p19 | V |
| R91 | Ato 2: tocha segue; Ação do Inimigo: Chefe ataca depois dos Goblins; caveira perde | p20 | V |
| R92 | No Covil: Ataque, Lançar Feitiço, Descansar; voltar via Porta do Covil; todos lá, Goblins vão para lá; ataques só dentro/fora; de fora, nada de Distância ou Feitiço; inconsciente lá, Descansar | p20 | V |
| R93 | Ação Heroica adicional: não repetível no mesmo turno | verso | V |

### 4.9 Lacunas e divergências

- **Desarmar: "ou" vs "e".** p10: "descobre 1 Espólio ou 1 Feitiço" (ícone com barra); verso: "receber 1 Espólio e 1 Feitiço". Sem errata conferida; o tutorial segue a p. 10 e avisa num `[!edicao]`.
- **R38a, R44a, R64a, R76a**: tratados em "Situações especiais" como leitura, não como regra.
- **Pontos do Tabuleiro de Tocha.** O manual não mostra quantos espaços a trilha tem nem onde ficam os ícones; o tutorial não dá números.
- **Valores de componentes.** O manual mostra poucos valores de carta. Usados: Minotauro Defesa 4, +2 contra Corpo-a-Corpo, modificadores +3 / +1 (p. 11 e 12); Thordin Defesa 4, Postura Pétrea (p. 12); Martelo com Força, 3 dados (p. 11). A Defesa 4 do Goblin dos exemplos é valor de exemplo, não confirmado por carta.

## 5. Divergências entre edições

Só a edição Meeple BR foi lida. A reedição Galápagos/Asmodee (TNE001) não foi aberta; o tutorial avisa que os termos podem diferir.

## 6. Plano instrucional

1. **Comece em 4 minutos:** montar e jogar um turno (mover, revelar, Encontro com Goblin, atacar, Foco, tocha).
2. **Etapa 1, montar a mesa:** os três baralhos e o que muda com o número de heróis.
3. **Etapa 2, mover e explorar:** revelar, girar, perigos. Portal e casos raros em `[!mais]`.
4. **Etapa 3, testes e ações:** dados, Foco, Vida dos 6, as Ações Heroicas, Ações Livres, espólios.
5. **Etapa 4, lutar e sobreviver à tocha:** ataque, alcance, contra-ataque, matar, Ações do Inimigo.
6. **Etapa 5, Covil e Batalha Final:** entrada, Tabuleiro do Chefe, trilha e Altares, Provocar.

**Carga.** O primeiro turno usa só Mover, Encontro com Goblin, Armadilha (uma linha) e Atacar. Lacaios, Portal, Desarmar, Ações do Inimigo e todo o Ato 2 ficam adiados ("Ainda não precisa saber"). Lacaio pode aparecer já no primeiro turno: com 4 heróis o Baralho A tem 5 Salas, 4 vão para a mesa na preparação, e a primeira sala revelada já puxa cartas do Baralho B, que tem os Encontros (p. 4). Por isso o Encontro com Lacaio entra no "Comece" em uma linha.

**Exemplos.** Usam os do manual sempre que possível (Procurar Intelecto 5, p. 9; feitiço Intelecto 7 custo 6, p. 10; Minotauro contra Thordin, p. 11 e 12; dano repartido no Chefe, p. 19). Contas em `scratchpad/tinyepic/tedcalc/contas.py`.

**Extensão.** Cerca de 7.900 palavras no arquivo, contando as opções e explicações dos exercícios; cerca de 6.600 sem elas. Passa do alvo de 6.000 por causa do Ato 2, que tem regras próprias (Tabuleiro do Chefe, trilha com Altares, Provocar, regras do Covil) sem as quais não se termina a partida. Casos raros foram para `[!mais]`; a leitura do essencial, pelo conversor, dá cerca de 16 minutos.

## 7. Portões automáticos

Resultados na auditoria, seção 2.
