# Auditoria (autoverificação): Como jogar BANG!

04/11/2026. Autoverificação do redator, regra por regra, contra o manual brasileiro (BNG001 v1.0) e a FAQ oficial da dV Giochi. **Não é a auditoria independente**: ela fica para outro agente, e o JSON segue com `"publicar": false` até lá.

Texto extraído do manual (fora do repositório): `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/bang/manual.txt` (inteiro) e `.../scratchpad/bang/p1.txt` a `p12.txt` (por página); páginas renderizadas em `.../scratchpad/bang/img/`. FAQ, lista de cartas e manual em inglês em `.../scratchpad/bang/dl/dv/`. Contas em `.../scratchpad/bang/scripts/contas.py`.

## 1. Portões automáticos

| Portão | Resultado |
|---|---|
| `python3 tools/checar_comece.py docs/como-jogar/bang/tutorial.md` | ✅ dentro da diretriz. Um aviso: "exclamação fora do nome Clank!". As exclamações são dos nomes impressos nas cartas (BANG!, Errou!, Pânico!, Indígenas!) e do termo "comprar!"; o texto não usa exclamação como pontuação |
| Travessão (—) e meia-risca (–) no tutorial | 0 |
| `tools/vicios.py` (função `avisos`) no tutorial e no JSON | 0 avisos |
| Seções na ordem do BRIEF | 4min, 0, 1, 2 (Etapa 1), 3 (Etapa 2), 4 (Etapa 3), 5 Situações especiais, 6 Avaliação final, 7 Para consultar, 8 Fontes |
| Exercícios | Todos de múltipla escolha, uma opção certa, explicação com página; posição da certa variada |
| Conversor (`tools/como_jogar_md.py`, função `pagina`, saída só no scratchpad `previa.html`) | Gera sem erro; 6 figuras, 1 vídeo, nenhum marcador cru; "Leitura do essencial: cerca de 7 min" |
| Extensão | 5.535 palavras (`wc -w`, contando opções e explicações dos exercícios); 4.889 sem as linhas de opção e de explicação. Acima da faixa pedida de 3.500 a 5.000 no `wc`, dentro dela sem as opções. O peso está nas cartas de efeito (16 tipos) e nos 16 personagens; a tabela de personagens ficou porque cada jogador recebe um na preparação |
| Figuras | 6 recortes do manual brasileiro (p. 1, 2, 3, 4, 5 e 9), só a parte gráfica, `.webp` q80, de 234 a 559 px, em `como-jogar/bang/figuras/`. Nenhuma pasta `fotos/` criada |
| Vídeo | "BANG! - Gameplay resumida", Duque Board Games, título e canal pelo oEmbed; fim do "Comece", com a frase obrigatória |

## 2. Regra por regra (tutorial → manual)

| Afirmação do tutorial | Base | Conferido em | OK |
|---|---|---|---|
| 4 a 7 jogadores, 8+ | R4 | p. 1 ("Um jogo para 4 a 7 jogadores, a partir de 8 anos") | sim |
| 20 a 40 min | dossiê, fontes | página oficial dV (infobox: 8-99, 4-7, 20'-40') | sim |
| Objetivos das quatro identidades | R1 | p. 1 | sim |
| Distribuição de identidades por número de jogadores (texto e tabela) | R5 | p. 2 | sim |
| Xerife se revela; outros em segredo | R6 | p. 2 | sim |
| Personagem aberto, lê a habilidade, balas do personagem | R7 | p. 2 | sim |
| Xerife com uma bala a mais | R8 | p. 2 | sim |
| Sobras voltam à caixa | R9 | p. 2 | sim |
| Cartas iniciais = balas; resto é a pilha de compra | R10 | p. 2 | sim |
| Balas = vida = limite de mão; exemplo de Jesse Jones | R12 | p. 2 | sim |
| Versão simplificada sem cartas com livro; quais são | R11 | p. 2; lista oficial p. 6 e 7 (imagem a 150 dpi: livro em Duelo, Indígenas!, Empório, Prisão, Dinamite; sem livro em Barril, Escopo, Mustang) | sim, com a fonte dita no texto |
| Xerife começa, sentido horário, três fases | R14 | p. 3 | sim |
| Pilha vazia: embaralhar o descarte | R15 | p. 3 | sim |
| Fora do turno só Errou! e Cerveja | R16 | p. 3 | sim |
| Três limitações (1 BANG!, 1 cópia, 1 arma; nova arma descarta a antiga) | R17 | p. 3 | sim |
| Borda marrom e azul; "em jogo"; sem limite de azuis com nomes diferentes | R18 | p. 3 | sim, com a exceção da Prisão |
| Fase 3: limite = balas de agora | R19 | p. 3 | sim |
| Não descartar por vontade; uma carta de cada vez | R20, R21 | FAQ Q12, Q13 | sim |
| Distância: menor número de lugares, dois sentidos; eliminados não contam | R24 | p. 4 | sim |
| Figura: A a B e F = 1; C e E = 2; D = 3 | R24 | p. 4 (figura) e script | sim |
| Colt. 45 alcance 1; arma sobre ele; roubável e descartável; Colt. 45 nunca se perde | R25, R26 | p. 4 e 5 | sim |
| Armas não alteram a distância | R27 | p. 5 e 11 | sim |
| Alcances 1, 2, 3, 4, 5 | R28 | p. 5 (Remington 3, Volcanic 1, nas ilustrações); lista oficial p. 3 (os cinco) | sim |
| Atirar: distância, alcance, BANG! ao descarte; Errou! fora da vez; bala para a pilha do meio | R33, R34 | p. 5 e 6 | sim |
| Errou! só para tiros em você; BANG! cancelado é descartado | R34 | p. 6 | sim |
| Símbolo de Errou! cancela símbolo de BANG! | R35 | p. 11 | sim |
| Mustang +1, Escopo -1, mínimo 1 | R30, R31 | p. 8 | sim |
| Cerveja: +1 até o inicial; só quem joga; fora do turno só no golpe letal; sem efeito com 2 | R36 | p. 6 | sim |
| Cerveja com vida cheia / com 2 jogadores: pode, sem efeito | R37 | FAQ Q16, Q25 | sim |
| Saloon: todos em jogo +1; não salva fora do turno; não cura eliminado | R38 | p. 6 e 11; FAQ Q11 | sim |
| Volcanic: vários BANG!, distância 1 | R29 | p. 5 | sim |
| Gatling: BANG! em todos os outros, qualquer distância; não é carta BANG!; BANG! no mesmo turno | R44 | p. 7; FAQ Q03 | sim |
| Indígenas!: descartar BANG! ou perder 1; sem Errou! nem Barril | R45 | p. 8 | sim |
| Duelo: qualquer jogador; alternado; perde o primeiro que não descarta; sem Errou!/Barril; não conta no limite | R46 | p. 8; FAQ Q06 | sim |
| "Pode descartar" lido ao pé da letra | R47 | p. 8 | [interpretada], em bloco [!edicao] |
| Pânico!: carta de jogador à distância 1 (mão aleatória ou da frente); arma não muda, Mustang e Escopo mudam | R39, R42 | p. 6 e 7; FAQ Q04 | sim |
| Cat Balou: qualquer jogador; descarte aleatório da mão ou escolhido da frente | R39, R43 | p. 6 e 7 | sim |
| Barril contra Gatling | Divergências | p. 7, 9, 11 | [interpretada], em bloco [!edicao] |
| Diligência 2, Wells Fargo 3 | R40 | p. 7 | sim |
| Empório: cartas = jogadores ainda jogando; começa por você, horário | R41 | p. 7 | sim |
| "comprar!": virar o topo, descartar, olhar naipe e valor; a carta virada não faz efeito; ordem dos valores | R48 | p. 8 e 9 | sim |
| Barril: Copas = Errou!; falhou, ainda pode Errou! | R49 | p. 9 | sim |
| Prisão: qualquer jogador menos Xerife, qualquer distância; teste antes do turno; Copas joga, senão pula; descarta nos dois casos; preso ainda é alvo e responde | R50 | p. 9 | sim |
| Dinamite: à sua frente; teste no próximo turno, antes da fase 1; Espadas 2 a 9 explode, perde 3; senão à esquerda; circula até explodir, Pânico! ou Cat Balou; Dinamite antes da Prisão; dano sem autor | R51 | p. 9 | sim |
| Eliminação: Cerveja na hora; mostra identidade; descarta tudo | R53 | p. 4 | sim |
| Xerife que elimina Assistente descarta tudo; recompensa de 3 por Fora da lei, mesmo de outro Fora da lei | R54, R55 | p. 4 | sim |
| Recompensa: Gatling e Indígenas! contam para quem jogou; Fora da lei que perde o próprio Duelo não dá recompensa; Dinamite não dá | R56, R57, R51 | FAQ Q05, Q23; p. 9 | sim (a Dinamite é dedução direta de "não será considerado como causado por nenhum jogador", p. 9) |
| Condições de fim e vitória; Renegado precisa ser o único vivo; exemplo 2 do manual | R2, R3 | p. 4 | sim |
| Personagens: balas e habilidades (tabela) | R60 a R76 | p. 10 e 11 | sim, resumidas. Encurtadas sem mudar a regra: Jesse Jones e Pedro Ramirez ("a segunda, do baralho" saiu da tabela; a primeira carta "pode vir" de outro lugar, a segunda segue a compra normal); Jane Calamidade ("salvo com Volcanic" saiu: com Volcanic o limite de BANG! não existe, então nada muda) |
| FAQ dos personagens | R77 | FAQ Q02, Q04, Q17, Q19, Q26 | sim |
| Identidade e personagem não são afetados | R23 | FAQ Q08 | sim |
| Conversa permitida, sem pergunta sobre jogada | R22 | FAQ Q01 | sim |
| Nova partida: vivos mantêm o personagem | R59 | p. 4 | sim |

## 3. Contas refeitas (`scripts/contas.py`)

- Figura da p. 4: B 1, C 2, D 3, E 2, F 1. Exemplos da p. 5 e p. 8 (Mustang de Ana: B e F a 2, C e E a 3, D a 4; Escopo de Ana: B, C, E, F a 1, D a 2): todos batem com o manual.
- Comece, exemplo: Xerife 4 + 1 = 5 cartas; +2 = 7; menos Schofield, Mustang, BANG!, Pânico! = 3; +1 do Pânico! = 4 ≤ 5; descarta 0. Sua vez: 6 - 3 = 3.
- Etapa 1, exemplo: mãos 4 + 4 + 4 + 3 = 15; pilha 80 - 15 = 65; 4 + 2 = 6; - Wells Fargo = 5; + 3 = 8; - Volcanic - Barril = 6; limite 4, descarta 2.
- Etapa 2: Ana a Denis com Mustang = 4 > 3 (Remington não alcança); com Escopo de Ana = 3 (alcança). Bruno eliminado: Ana a Carlos = 1. Pânico! em Carlos a 2: não. Treino, mesa de 5: Ana a Elza com Mustang = 2; com Escopo de Ana = 1.
- Duelo: Carlos 2 BANG!, Ana 1: C, A, C, Ana perde.
- Cerveja (p. 6): 2 - 3 + 2 = 1; com uma, 0.
- Dinamite: 7♠ explode; 10♠, 5♥, J♠, A♠ não.
- Avaliação: Xerife de 3 balas, 4 cartas; 5 - 2 = 3; Denis 3 + 1 = 4 > 3.
- Lista de cartas: 25 + 12 + 6 + 4 + 4 + 2 + 1 + 1 + 3 + 2 + 2 + 1 + 3 + 1 + 2 + 1 + 2 + 2 + 3 + 1 + 1 + 1 = 80, igual ao total do manual brasileiro (p. 1). A contagem ficou no dossiê, não no tutorial.

## 4. Fontes usadas e não obtidas

- Usadas: manual brasileiro BNG001 v1.0 (fonte de regra); manual oficial em inglês (conferência da tradução, sem divergência); FAQ oficial (26 perguntas, usada nas lacunas do manual); lista oficial de cartas (alcances das armas e cartas com livro); página oficial da dV (duração).
- Não obtidas: a ficha do produto na loja da Asmodee Brasil (403 para o user-agent do robô, não contornado); lista de cartas da edição brasileira (não existe no manual). O item 2726 da biblioteca, do grupo de lojistas (`b2b`), não foi usado.

## 5. Pontos frágeis

- **Duas leituras marcadas como [interpretada]:** Barril contra Gatling e o "pode descartar" do Indígenas! e do Duelo. Nenhuma das duas vem afirmada como regra sem o bloco [!edicao].
- **Lista de cartas da 4ª edição italiana.** Alcances das armas e cartas com livro vêm dela; o manual brasileiro confirma Remington 3 e Volcanic 1 nas ilustrações e o mesmo total de 80. Se a edição brasileira tiver mudado o naipe ou a composição de alguma carta, o tutorial não depende disso (não usa naipe de carta específica).
- **FAQ de 2010, em inglês.** É da editora de origem e não contradiz o manual brasileiro de 2025; foi usada só onde o manual cala, sempre com a indicação "FAQ oficial".
- **Extensão** acima de 5.000 no `wc` por causa das opções de múltipla escolha; sem elas, 4.889.
- **Figuras pequenas.** As ilustrações do manual são pequenas; os recortes a 300 dpi ficam entre 234 e 559 px. O diagrama de distância e a carta de personagem são legíveis; o recorte do Barril (311 px) é o mais fraco.
- **Teste com pessoas:** não feito. A autoverificação é sinal de fidelidade ao manual, não prova de que o texto ensina.
