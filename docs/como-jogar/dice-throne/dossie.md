# Dossiê: Como Jogar Dice Throne

Entrega 1. Produzido em 31/10/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções do briefing do editor (jogo já escolhido; manual em inglês permitido; sem subagentes; sem commit). Nada daqui está publicado: `publicar` está `false` no JSON até a auditoria independente.

## 1. Jogo e procura

- **Jogo:** Dice Throne (escolha do editor). Slug `dice-throne`.
- **Resenha no site:** não há pasta `/dice-throne/` nem `conteudo/dice-throne.json`. Campo `resenha` = `null`.
- **Procura real (31/10/2026):** o autocomplete do Google (`client=firefox&hl=pt-BR&q=como+jogar+dice+throne`) e o do YouTube (`client=youtube&ds=yt`) devolvem a própria busca "como jogar dice throne" como sugestão. Há procura, sem variações.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual oficial** *Dice Throne: Rules of Play*, Dice Throne Inc. | v2.3.2, arquivo de 04/07/2022 (InDesign 17.3), 16 páginas em formato paisagem, "VERSION 2.3" na capa | https://cdn.shopify.com/s/files/1/0045/4013/7562/files/Dice_Throne_Rulebook_-_v2.3.2_-_2022.07.04.pdf (indicado no briefing) | Baixado em 31/10/2026, 20,5 MB |
| **Manual oficial**, versão atual | v2.4.1, arquivo "Dice Throne Rulebook - v2.4.1 - 2023.05.10.pdf" (PDF criado em 30/01/2024), copyright 2023 Dice Throne Inc., logotipo Roxley; 9 folhas duplas = 16 páginas, mesma paginação da v2.3.2 | `rules.dicethrone.com` redireciona em 31/10/2026 para https://drive.google.com/file/d/11M5vZ-Piq_FVZdaOtYQ-EbcjKsDzOQkK/view (download público, sem login) | Baixado em 31/10/2026, 38,1 MB |
| Manual em português | Não encontrado | Ver seção 3 | Lacuna |
| FAQ ou errata separada | Não existe como documento à parte; cada folheto de herói traz FAQ própria (manual p. 6) | | Não usada: só o folheto do herói da caixa do leitor teria |
| Dados do topo (jogadores, tempo, idade) | Capa da v2.4.1: ícones "2-6", "30", "8+" | | Usados no JSON |

**Correção ao briefing.** O briefing dizia que rules.dicethrone.com aponta para a v2.3.2. Em 31/10/2026 ele aponta para a v2.4.1. As duas foram lidas; a v2.3.2 é a base indicada pelo editor e a v2.4.1 serviu para conferir mudanças (seção 6). As páginas citadas valem para as duas.

**Como os manuais foram lidos.** Texto extraído com `pdftotext` (com e sem `-layout`), página a página. Como quase todos os números do manual são ícones (CP, quantidade de cartas, valores de dano), o texto extraído tem lacunas; por isso todas as 16 páginas da v2.3.2 foram renderizadas a 130 dpi e lidas como imagem, e o tabuleiro e o folheto da Pistoleira, as cartas de exemplo (Revolver II, Duel II, Quick Draw II, Getting Paid!, Buh, Bye!, Transference!, Samesies!, Eat Lead!) foram conferidos em recortes a 300 dpi. As páginas 4, 5, 11, 12, 13 e 16 da v2.4.1 foram lidas como imagem a 220 dpi, e as duas versões foram comparadas frase a frase por script. PDFs e imagens ficam em `<scratchpad>/manuais/dice-throne/`, fora do repositório.

## 3. Edição brasileira

- Uma busca na web encontrou: atualizações antigas da pré-venda no BackerKit em que a Roxley diz trabalhar com a editora Conclave para entregas no Brasil; catálogos (analog.games) que listam a Conclave Editora entre as editoras de *Season One ReRolled* e um título "Dice Throne: Temporada 1 Rerolled: Bárbaro v Elfa Lunar"; e menção a um produto "dice-throne-br-season-one-rerolled" na loja oficial. A URL dessa loja (https://shop.dicethrone.com/products/dice-throne-br-season-one-rerolled) respondeu 404 em 31/10/2026. O site da Conclave (https://www.conclavejogos.com.br/) não respondeu (erro 502 no proxy); não foi contornado.
- **Conclusão:** há indício de distribuição brasileira, sem manual em português público nem página oficial que confirme nomes. Por isso `"edicao": "Manual oficial em inglês"`, e o tutorial avisa na linha 3 que os nomes da caixa brasileira podem ser diferentes.

## 4. Decisão de terminologia

Sem nomes oficiais em português confirmados, a regra adotada:

1. **Conceitos de regra em português**, traduzidos de forma literal e sempre iguais (tabela abaixo). A folha de consulta repete a correspondência com o inglês.
2. **Nomes próprios impressos no tabuleiro e nas cartas** (habilidades e cartas) ficam em inglês, como estão nos componentes, com uma tradução entre parênteses na primeira menção. O herói é chamado de Pistoleira (Gunslinger), porque o texto se refere a ele o tempo todo; a primeira menção traz o nome em inglês.
3. Os símbolos dos dados e as fichas da Pistoleira ganham nome em português (Bala, Arrancada, Mosca; Evasiva, Recarga, Derrubada, Recompensa), com o inglês na primeira menção e na consulta.

| No tutorial | No manual | Página | O que é |
|---|---|---|---|
| herói | hero | 2, 3 | o personagem de cada jogador |
| tabuleiro do herói | Hero Board | 3, 5 | as habilidades |
| folheto do herói | Hero Leaflet | 3, 6 | fichas, legenda dos dados, dificuldade, preparação, FAQ |
| Vida; marcador de Vida | Health; Health Dial | 3, 4 | pontos de vida |
| Pontos de Combate (CP); marcador de CP | Combat Points (CP); CP Dial | 3, 4 | moeda das cartas |
| jogador inicial | Start Player | 3 | quem começa |
| jogador da vez | Active Player | 4 | quem está no turno |
| Manutenção | Upkeep Phase | 4, 12 | fase 1 |
| Renda | Income Phase | 4, 12 | fase 2 |
| fase Principal (1) e (2) | Main Phase (1)/(2) | 4, 12, 13 | fases 3 e 7 |
| rolagem ofensiva | Offensive Roll Phase | 4, 12 | fase 4 |
| rolagem de alvo | Targeting Roll Phase | 4, 13 | fase 5 |
| rolagem defensiva | Defensive Roll Phase | 4, 13 | fase 6 |
| Descarte | Discard Phase | 4, 13 | fase 8 |
| fase de rolagem | Roll Phase | 12 (v2.4.1), 16 | as fases 4, 5 e 6 juntas |
| tentativa de rolagem | Roll Attempt | 4, 16 | |
| resultado final dos dados | Final Dice Result | 4, 16 | |
| requisito de ativação | Activation Requirement | 4 | |
| habilidade ofensiva / defensiva / passiva / suprema | Offensive / Defensive / Passive / Ultimate Ability | 4, 5 | |
| dados de defesa; rolagem de defesa 1 | Defensive Dice; Defense Roll 1 | 5 | |
| sequência pequena / grande | Small / Large Straight | 4, 16 | 4 / 5 números seguidos |
| iguais | of-a-kind | 16 | mesmo número, não símbolo |
| Ataque | Attack | 16 | habilidade ofensiva com pelo menos 1 de dano num adversário |
| defensor | Defender | 16 | |
| dano a receber | Incoming damage | 10, 14 | |
| dano normal, indefensável, puro, colateral, supremo | normal, undefendable, pure, collateral, ultimate damage | 10 | |
| Modificador de Ataque | Attack Modifier | 11 | |
| efeito de status; ficha | Status Effect; token | 6 | |
| dar / ganhar / gastar / tirar | inflict / gain / spend / remove | 6, 7, 16 | |
| limite de pilha | Stack Limit | 7 | |
| persistente; gastável; único | Persistent; Spendable; Unique | 7 | |
| companheiro | Companion | 7 | |
| Melhoria de Herói | Hero Upgrade | 7, 8 | |
| carta de Ação; Ação de Fase Principal; Ação de Fase de Rolagem; Ação Instantânea | Action card; Main Phase Action; Roll Phase Action; Instant Action | 8, 9 | |
| vender | Sell | 7, 12 | descartar da mão por 1 CP |
| Rei da Colina | King of the Hill | 11 | modo de 3 jogadores |
| líder | Leader | 11 | quem tem mais Vida |
| Bala, Arrancada, Mosca | Bullet, Dash, Bullseye | 2 | faces 1-3, 4-5, 6 da Pistoleira |
| Evasiva, Recarga, Derrubada, Recompensa | Evasive, Reload, Knockdown, Bounty | 2 | fichas da Pistoleira |

## 5. Base de regras

Marcação: `[v2.3.2 p. N]` lida nesta sessão; `[v2.4.1 p. N]` só na versão atual. Classificação: [verificada], [interpretada] ou [lacuna]. "Dep." lista as regras de que esta depende.

### 5.1 Objetivo e fim

- **R1** Vence quem reduz a Vida dos adversários a 0. "Defeat your opponents by reducing their health to 0." [v2.3.2 p. 2] [verificada]
- **R2** Vida a 0: derrotado no momento. "The moment your health is reduced to 0, you have been defeated." [p. 4] [verificada]
- **R3** Todos os restantes a 0 ao mesmo tempo: empate. [p. 4, 13] [verificada]
- **R4** Cura até 10 acima da Vida inicial. "You may heal a maximum of 10 points above your starting health." [p. 4, 16] [verificada]

### 5.2 Preparação (p. 3)

- **R5** Tabuleiro, folheto e fichas à frente; fichas empilhadas no folheto. [p. 3] [verificada]
- **R6** Vida inicial 50 no 1v1. "Set your starting Health to 50 (for a 1v1 game)." [p. 3] [verificada]
- **R7** CP inicial 2 (ícone "2 CP"). [p. 3, imagem] [verificada]
- **R8** Embaralhe e compre 4 (ícone "4"). "Draw the top 4 cards from your deck." [p. 3, imagem] [verificada]
- **R9** Cada um rola 1 dado; maior começa. [p. 3] [verificada]. Empate nessa rolagem: [lacuna] (tutorial sugere rolar de novo em [!edicao], sem afirmar regra).
- **R10** Preparação própria no verso do folheto. [p. 3] [verificada]

### 5.3 Turno (dep. R5 a R10)

- **R11** Oito fases em ordem: Manutenção, Renda, Principal (1), rolagem ofensiva, de alvo, defensiva, Principal (2), Descarte. [p. 4] [verificada]
- **R12** Manutenção: efeitos de fichas e passivas; o jogador da vez ordena; dano e cura somados e aplicados no fim da fase. [p. 12] [verificada]
- **R13** Renda: +1 CP (não passa de 15) e compre 1; baralho vazio, embaralhe o descarte. Jogador inicial pula a primeira Renda. [p. 4, 7, 12] [verificada]
- **R14** CP máximo 15. [p. 4] [verificada]
- **R15** Fase Principal: em qualquer ordem e quantas vezes quiser: vender (1 CP por carta, qualquer custo), jogar Ação de Fase Principal, jogar Melhoria. [p. 12] [verificada]
- **R16** Rolagem ofensiva: até 3 tentativas (rolar os 5; rolar de novo quantos quiser; de novo). [p. 12] [verificada]
- **R17** Anunciar a habilidade (resultado final atende ao requisito) ou anunciar que não ativa; perguntar ao adversário se altera os dados. [p. 12] [verificada]
- **R18** Se os dados forem alterados nesse ponto: anunciar outra habilidade ou voltar ao passo 1 com as rolagens restantes. [p. 12] [verificada]
- **R19** Ativar: efeitos variáveis e efeitos sem alvo. [p. 12] [verificada]
- **R20** Uma habilidade por rolagem ofensiva. "You may only activate a single ability as the result of your Offensive Roll Phase." [p. 4] [verificada]
- **R21** Ações de Fase de Rolagem por qualquer jogador depois de qualquer passo. [p. 12] [verificada]
- **R22** Requisito "atendido" quando há pelo menos os símbolos pedidos. [interpretada]: o manual diz "meets the Activation Requirement" (p. 4, 12) sem dizer se dados a mais impedem; a leitura "pelo menos" é a única que torna possível, por exemplo, que a sequência grande contenha a pequena. Avisado em [!edicao].
- **R23** Linhas do Revolver (3, 4 ou 5 Balas): vale a linha do número de Balas que você tem. [interpretada]: o manual mostra o espaço (p. 2) sem explicar linhas. Avisado em [!edicao]. Usado no tutorial só na avaliação 2 e na descrição do Revolver II.
- **R24** Sequência pequena = 4 números seguidos; grande = 5. [p. 4, 16] [verificada]
- **R25** "X-of-a-kind" conta o número, não o símbolo. [p. 16] [verificada]
- **R26** Rolagem de alvo: pulada no 1v1. [p. 4] [verificada]
- **R27** Rolagem defensiva só se a ofensiva resultou em Ataque. [p. 4, 13] [verificada]
- **R28** Ataque = habilidade ofensiva com pelo menos 1 de dano que tem um adversário como alvo (não colateral). [p. 11, 16] [verificada]
- **R29** Defensiva, passos 1 a 6: efeitos com alvo não de dano; defensor ativa a defesa se o dano admite defesa; uma tentativa com os dados indicados; efeitos não de dano do defensor; última chance de fichas e cartas; dano, prevenção e cura aplicados juntos no fim da fase de rolagem. [p. 13] [verificada]
- **R30** Herói com duas defesas escolhe uma antes de rolar. [p. 5, 13] [verificada]
- **R31** Dados de defesa rolados uma vez. [p. 5] [verificada]
- **R32** Defesa não ativada contra dano indefensável, puro, colateral ou de suprema. [p. 5] [verificada]
- **R33** Descarte: vender até 6 cartas, 1 CP cada. [p. 4, 7, 13] [verificada]
- **R34** "Roll Phase" = as três fases de rolagem. [v2.4.1 p. 12] [verificada]. A v2.3.2 só define, na p. 16, que "a conclusão da fase de rolagem" acontece logo antes da fase Principal (2).

### 5.4 Tabuleiro e habilidades

- **R35** Habilidade passiva sempre ativa ou disponível. [p. 5] [verificada]
- **R36** Suprema: só impedida alterando dado antes da ativação; depois, adversários sem nenhuma ação até o fim da fase de rolagem; pode ser aumentada, não reduzida; ignora fichas que reduziriam. [p. 5, 10, 16] [verificada]
- **R37** Dados rolados como parte de um efeito podem valer várias vezes na mesma habilidade. [p. 5] [verificada]
- **R38** Folheto: efeitos de status, legenda dos dados, dificuldade 1 a 6, preparação, FAQ. [p. 6] [verificada]

### 5.5 Cartas e CP (dep. R13, R15)

- **R39** Dois tipos: Melhoria e Ação. Custo à esquerda; custo 0 é grátis. Ícone da fase à esquerda. [p. 7] [verificada]
- **R40** Melhoria: só nas fases Principais; não se vende depois de jogada; pode ir direto ao III; de II para III, carta por cima e paga a diferença. Bordas branca/verde/roxa. [p. 8, 12] [verificada]
- **R41** Ação: uso único, depois à pilha de descarte. [p. 8] [verificada]
- **R42** Ação Instantânea: borda vermelha, "!", a qualquer momento em qualquer turno; interrompe ações e habilidades, menos outras instantâneas; o interrompido termina depois; não pode ser interrompida. [p. 8] [verificada]
- **R43** Ação de Fase Principal: borda azul; só no seu turno, fases Principais. [p. 9] [verificada]
- **R44** Ação de Fase de Rolagem: borda laranja; rolagem ofensiva, de alvo ou defensiva; turno de qualquer jogador. [p. 9] [verificada]
- **R45** Textos: Roll [#]; On [símbolo] (uma vez só); multiplicação; Then; Or; Steal (até o que o adversário tem); Additionally. [p. 9, 16] [verificada]
- **R46** Cartas de exemplo, com custo e texto lidos nas imagens: Revolver II 2 CP (3/4/5 Balas: 4/5/6 de dano; 4 iguais pelo número: Derrubada) [p. 8]; Transference! 2 CP [p. 9]; Samesies! 1 CP [p. 9]; Getting Paid! 0 CP, ganhe 2 CP [p. 8]; Buh, Bye! 2 CP [p. 7]; Eat Lead! 1 CP, Ação de Fase de Rolagem, Modificador de Ataque, role 5 dados, +1 por Bala, Derrubada se somou pelo menos 4 [p. 11]. [verificada]

### 5.6 Efeitos de status, dano e modificadores

- **R47** Dar/ganhar: ficha no meio do tabuleiro de quem recebe; está em jogo. Fichas dadas por derrotado continuam. Fichas a mais: substituir. [p. 6] [verificada]
- **R48** Tirar: volta ao folheto. Gastáveis: a qualquer momento, em qualquer fase de qualquer turno, salvo indicação; efeito imediato. Persistente: até o fim ou até ser tirado. Limite de pilha. Limite aumentado: só para aquele jogador, até o fim. Únicos: regras próprias. Gasto não se interrompe. [p. 7] [verificada]
- **R49** Companheiros não são efeitos de status; imunes a cartas que alteram efeitos; não podem ser tirados, transferidos ou destruídos salvo regra própria. [p. 7] [verificada]
- **R50** Tipos de dano e a tabela (defesa, evitável, modificável, regra de alvo). [p. 10] [verificada]
- **R51** Círculo preto = normal; vermelho com nome = outro tipo. [p. 10] [verificada]. O Duel mostra números em círculo vermelho seguidos só de "dmg", sem nome do tipo [interpretada como "não normal, tipo não nomeado"]: o tutorial diz só "3 de dano no atacante", sem classificar.
- **R52** Modificador de Ataque: antes ou depois da defesa; dano somado do mesmo tipo; só em Ataques. [p. 11] [verificada]
- **R53** Modificador só num Ataque que você ativa no seu turno, salvo indicação. [v2.4.1 p. 11] [verificada; ausente da v2.3.2]
- **R54** Pistoleira (p. 2, 3, 5): faces; nove espaços do tabuleiro; quatro fichas com limites (Evasiva 3, Recarga 2, Derrubada 1, Recompensa 1) e textos. [verificada em recorte a 300 dpi]

### 5.7 Mais jogadores e casos especiais

- **R55** 3 jogadores (Rei da Colina): Vida 35; role para começar; horário; ataque em qualquer um; líder(es) = mais Vida; atacar líder dá 1 carta logo após escolher o alvo, também se empatado; único líder não ganha. Rolagem de alvo: escolha simples. [p. 11, 13] [verificada]
- **R56** 4 jogadores (2v2): duplas lado a lado, mãos visíveis; role para começar; zigue-zague; Vida 50 compartilhada; jogador inicial pula Renda; CP individual; sem reduzir dano do parceiro salvo carta; pode alterar dados pelo parceiro. [p. 11] [verificada]
- **R57** Rolagem de alvo no 2v2: 1-2 esquerda, 3-4 direita, 5 adversários escolhem, 6 você escolhe; dado alterável salvo suprema; vale para habilidade sem dano com efeito. [p. 13] [verificada]
- **R58** 5 e 6 jogadores: só em variants.dicethrone.com; manual recomenda evitar com iniciantes. [p. 11] [verificada; fora do escopo]
- **R59** Conta do dano final: dano a receber; somas e subtrações (subtotal); multiplicações e divisões independentes sobre o subtotal; divisão arredonda para cima; exemplo Bárbaro x Paladino. [p. 14] [verificada]
- **R60** Prioridade: jogador da vez; gastar ficha é Ação Instantânea; não instantâneas podem ser interrompidas; com mais de 2, depois os outros na ordem dos turnos. [p. 15] [verificada]

## 6. Divergências entre versões

Comparação automática das frases das duas versões e leitura das páginas 4, 5, 11, 12, 13 e 16 da v2.4.1:

- **p. 11 (nova na v2.4.1):** "Note: Attack Modifiers can only be played on an Attack you are activating during your turn (unless otherwise noted)." O tutorial segue a v2.4.1 e avisa em [!edicao].
- **p. 12 (nova na v2.4.1):** quadro "Roll Phase" definindo o termo como as três fases de rolagem. Não muda regra; o tutorial usa o conceito.
- **Capa:** a v2.4.1 traz 2-6 jogadores, 30 min, 8+; a v2.3.2 não traz esses ícones.
- Créditos e textos de capa mudaram. Nenhuma outra diferença de regra foi encontrada.

## 7. Plano instrucional

Quatro classes de tarefa, da mais simples à mais completa, com apoio decrescente em cada uma (exemplo resolvido, completar, sua vez) e treino curto onde o erro é comum:

| Classe | Tarefa real | Apoio ("Para entender") | Procedimento ("Passo a passo") | Treino |
|---|---|---|---|---|
| 0 (4 min) | Montar e fazer o primeiro ataque | Ideia do jogo | Montagem, 8 fases resumidas, duas habilidades | Não |
| 1 | Montar e ler o tabuleiro | Tipos de espaço, requisito | Preparação (R5 a R10) | Não (só "sua vez") |
| 2 | Rolar, escolher habilidade, defender | Símbolo x número, uma habilidade | Ofensiva (R16 a R21), defensiva (R27 a R31) | Que habilidades os dados atendem (5 itens) |
| 3 | Gerir CP e cartas num turno | CP como moeda, vender, tipos de carta | Renda, Principal, Descarte (R13 a R15, R33, R39 a R45) | Pode ou não pode (5 itens) |
| 4 | Ataque com fichas e tipos de dano | Efeitos de status, persistência | Fichas (R47, R48), tipos de dano (R50), modificadores (R52, R53), suprema (R36) | O defensor pode? (4 itens) |

Decisões de carga: a rolagem de alvo, os modos de 3 e 4 e a conta avançada do dano ficam em Situações especiais; companheiros e efeitos únicos ficam em [!mais], porque não aparecem na Pistoleira. Os exemplos usam um herói só, a Pistoleira, porque é o único que o manual mostra inteiro; o adversário é genérico ("uma habilidade de 8 de dano normal"), sem inventar herói. Limite: o texto não observa o leitor nem ajusta o apoio.

**Extensão.** O tutorial tem cerca de 7.100 palavras pelo `wc` (cerca de 2.700 à vista, 14 min de leitura do essencial), acima do alvo de 6.000. O que exigiu o espaço: as regras de Dice Throne valem para dezenas de heróis e por isso são abstratas (tipos de carta, cinco tipos de dano, efeitos de status), e cada uma precisa de um exemplo concreto; mais as tabelas do tabuleiro e das fichas da Pistoleira, que substituem o tabuleiro físico que o leitor pode não ter. Cortes já feitos: glossário compactado, "Antes de tudo", "Situações" e as caixas "Para entender" encurtados. Próximo corte possível, se o editor quiser: a tabela das cartas de exemplo (etapa 3) e o exemplo Bárbaro x Paladino.

## 8. Portões automáticos

- Travessão (—) e meia-risca (–) no tutorial: 0.
- `tools/vicios.py` (`avisos`) no tutorial inteiro e no JSON: 0 aviso.
- `tools/checar_comece.py docs/como-jogar/dice-throne/tutorial.md`: ✅ (735 palavras na seção, limite 800).
- Seções na ordem pedida; respostas em "### Respostas da etapa N", "### Respostas da avaliação" e "**Resposta do Complete:**" (formato exigido pelo `checar_comece.py`).
- Contas refeitas em `<scratchpad>/dt/contas.py` (lista na auditoria, seção 3).
- Legibilidade (Flesch adaptado): não medido; a implementação citada no prompt (`Arcvalion_gospel`) não está neste repositório.
