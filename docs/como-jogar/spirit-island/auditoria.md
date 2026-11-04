# Auditoria: Como jogar Spirit Island

04/11/2026. **Autoverificação do redator**, regra por regra, contra o manual oficial em inglês da Greater Than Games (VER 23.08). A auditoria independente fica para outro agente, que deve usar o texto paginado do manual em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/spirit-island/manual/A_paginado.txt` (página do arquivo = página impressa) e, para as ilustrações, o PDF na mesma pasta.

## 1. Fontes usadas e as que faltaram

- Usada: manual de 2023 (fonte de regra) e manual de 2018 (comparação). Ilustrações das p. 4, 5, 7, 11, 12, 14, 16 e 19 lidas em alta resolução.
- Faltaram: manual em português da Ace Studios (não publicado no site da editora); página do FAQ oficial (a errata da Praga já está no manual); Ludopedia (Cloudflare, não contornado).
- **Divergência com o pedido:** a edição brasileira não é da Meeple BR, e sim da Ace Studios (dossiê, seção 1).

## 2. Conferência regra por regra

Cada linha: afirmação do tutorial, onde está, página e trecho lido no manual (o grep de 70 frases-chave está em `.../scripts/grep_conferencia.txt`; só duas frases de teste não bateram, por redação minha, e foram conferidas à mão).

| Afirmação no tutorial | Onde | Manual |
|---|---|---|
| Cooperativo, 1 a 4, derrota por Praga, Espírito destruído ou tempo | Comece, 0 | p. 3 "cooperative game for 1-4 players"; p. 12 "You can lose three ways" |
| 4 marcadores de Medo por jogador | Comece, E1 | p. 6 "Put 4 Fear Markers per player"; p. 4 ilustração "per player" |
| 9 cartas de Medo, divisórias a 3 e a 6 do fundo | Comece, E1 | p. 6 "Terror Level 3” divider 3 cards from the bottom..." |
| Baralho 3/4/5; caixa 4/5/6 | Comece, E1 | p. 6 sidebar |
| Espaço impresso 5 por jogador + 1 | Comece, E1 | p. 4 ilustração (5 ícones, "per player"); p. 6 "Place exactly 1 extra Blight on the card or space, regardless of player count" |
| Primeira partida sem carta de Praga, Adversário, Cenário; Espírito de complexidade baixa com Progressão | Comece, E1 | p. 3 "First-Time Players" |
| Ícones de montagem; Praga da caixa | E1 | p. 6 "(from the box, not the Blight Card)" |
| 4 cartas Únicas = mão inicial; trilhas cobertas menos o número da esquerda | Comece, E1 | p. 6 "Player Setup" |
| Ação inicial: Explorar e carta em Construir | Comece, E1 | p. 6 "Invaders’ Starting Action" |
| Montagem e trilhas do Relâmpago | Comece, E3, consulta | ilustração p. 14 (painel) |
| Ordem da fase dos Espíritos; pagar todas na hora; Elementos na hora; sem alvos | Comece, E2 | p. 8 itens 1 a 3 |
| Rápido não adia; pular efeito mantém Elementos | E2 | p. 8; p. 17 "you do still get the Elements" |
| Ordem da fase dos Invasores; sem carta, nada | E2 | p. 9 |
| Avançar cartas | E2 | p. 10 "Advance Invader Cards" |
| O Tempo Passa | Comece, E2 | p. 10 |
| Quem decide; ordem das terras | E2 | p. 8 sidebar; p. 9 "Land order?" |
| Local Sagrado com 2+ Presenças | E3 | p. 13; glossário p. 31 |
| Trilhas da esquerda para a direita; números não somam | Comece, E3 | p. 14 item 8 |
| Energia acumula, não se passa; Jogadas não acumulam | E3 | p. 13 |
| Crescimento comum (Presença alcance, Energia, carta, Recuperar) | E3 | p. 14 sidebar |
| Leitura da carta (custo, Elementos, velocidade e anel, alcance 0, alvo, efeito, limiar) | E3 | p. 16 e 17 |
| Inato sem custo nem jogada, níveis de cima para baixo, "em vez disso", uma vez | E3 | p. 14 item 9; p. 17 item 8 e "One use" |
| Ganhar carta: 4, fica 1; Maior obriga a Esquecer; Única vai para baixo do painel; Progressão | E3 | p. 18 |
| Dano de Poder aos Invasores, dividido, somado | E3 | p. 18 |
| Reunir e Empurrar só vizinhas; sem Oceano | E3 | p. 19 |
| Destruição Trovejante: Lenta, alcance 1, níveis | E3 | ilustração p. 14 (ícone de tartaruga azul) |
| Rapidez do Relâmpago; Poder feito Rápido só na fase Rápida | E3 | ilustração p. 14; p. 17 |
| Uma terra, um turno, um uso; faça o que der | E3 | p. 17 |
| Recuperar 1; Elementos nas trilhas | E3 | p. 14 |
| Reposicionar Presença | E3 | p. 14 sidebar |
| Remover/Substituir sem Medo; Substituída mantém Dano | E3, E5 | p. 18 |
| Defender | E3 | p. 18 |
| Repetir sem Elementos, não encadeia | E3 | p. 19 |
| Vida e Dano das peças; fontes de Explorar | E4, consulta | p. 15 |
| Explorar | Comece, E4 | p. 10 |
| Construir | E4 | p. 10 |
| Devastar, 1 Praga, Dahan da forma mais eficiente, revide | E4 | p. 9 |
| Revide com Dano zerado, não com Devastação impedida | E4 | p. 9 |
| Dahan ferido se recupera; Dano de Espírito não fere Dahan | E4 | p. 9, 16 |
| Vizinhança, costeira, interior | E4 | p. 13 |
| Bandeira de Estágio II; Estágio III | E4 | p. 10 sidebars (conferidos na versão `-layout`) |
| Entrada de Praga: Presença destruída, cascata para uma vizinha | E5, consulta | p. 9 sidebar, p. 15 |
| Praga extra só para uma vizinha e só 1 por Devastar (erro comum) | Comece, E5 | p. 21 "Note: Two Blight rules..." |
| Medo: geração, marcadores, carta, divisória, sobra | E5 | p. 12 |
| Cartas de Medo na próxima fase dos Invasores, na ordem, no Nível atual | E5 | p. 9 "2. Fear" |
| Medo dentro do Medo; "each player" | E5 | p. 9 sidebars |
| Condições de vitória por Nível; imediata | Comece, E5 | p. 12 |
| Vitória com sacrifício | E5 | p. 12 |
| Carta de Praga virada não volta | E5 | p. 15, 18 |
| Solo; Adversários; Cenário prevalece; mapa temático; pontuação; jogo mais fácil | Situações | p. 21 a 23 |
| Dicas (limpar antes de Construir, Dahan, Praga cedo, Energia) | E4, E5, E3 | p. 21, sempre como sugestão |

## 3. Contas refeitas

`contas.py` (scratchpad, `scripts/`), saída conferida:

- Relâmpago, opção 3 com Presença da trilha de Energia: 3 + 1 = 4 de Energia; opção 2 da trilha de Jogadas: 4 jogadas e 1 de Energia.
- Devastar com Vila + Explorador e 2 Dahan: 3 de Dano, 1 Praga, 1 Dahan destruído, 1 ferido, revide 2 (bate com o exemplo A da p. 11). Com Defender 2: 1 de Dano, sem Praga, 1 Dahan ferido, revide 4, destrói Vila (2) e Explorador (1), sobra 1, Medo 1.
- Cidade sozinha com 3 Dahan: 1 destruído, 1 ferido, revide 4 destrói a Cidade (bate com o exemplo da p. 19).
- Cidade + 2 Exploradores: 5 de Dano, 1 Praga.
- Praga: 2 jogadores 11; 3 jogadores 16. Medo: 2 jogadores 8, 3 jogadores 12.
- Medo do exemplo: 2 + 1 + 2 = 5; com 6 de 8 já em Medo Gerado, conquista 1 carta e sobram 3.

## 4. Pontos de interpretação e lacunas

- **Vitória pelo espaço "Victory" sob o baralho de Medo** [interpretada]: vem da ilustração do tabuleiro (p. 4 e 12, "VICTORY / WHEN REVEALED"), não de uma frase do texto corrido.
- **Rapidez do Relâmpago** [interpretada no alcance]: o parêntese da regra está coberto na ilustração. O tutorial diz só "1 Poder Lento" e não afirma se vale para o Poder Inato.
- **Cartas Únicas do Relâmpago** [lacuna]: não aparecem no manual; o tutorial não as nomeia, e os exemplos usam totais de Elementos.
- **Praga das cartas de Praga** [lacuna]: o valor do lado saudável não aparece; o tutorial diz "a que ela pede".
- **Nomes da caixa brasileira** [lacuna]: tradução nossa, com o inglês ao lado; avisado na linha 3.

## 5. Autocrítica: o que ficou fraco

- Sem as cartas Únicas, o leitor monta o primeiro turno sem um exemplo de carta concreta do Relâmpago: o exemplo resolvido para no "até 2 cartas cujo custo caiba em 4".
- O tutorial ficou com cerca de 6.460 palavras de texto (8.020 por `wc -w`), um pouco acima do teto pedido.
- Os nomes podem não bater com a caixa da Ace; quem tiver o manual brasileiro em mãos deveria conferir o glossário (dossiê, seção 4) e trocar os termos.
- O vídeo é do Romir Play House, não do Duque Board Games (o Duque não tem vídeo do jogo); não conferi se o vídeo segue a edição de 2023 com a errata.
- Portões: zero travessão; `vicios.py` sem aviso no tutorial e no JSON; `checar_comece.py` passa; o conversor gera a página sem marcação crua.

## Auditoria independente (04/11/2026)

Duas auditorias de outros agentes. Regras: aprovado com correções (0 erro de regra; 26 de 26 perguntas certas). Jogo simulado: jogável com ajustes. Tudo o que entrou de novo foi conferido no manual, com página; o que o manual não sustenta ficou de fora.

**Auditoria de regras**

1. Frase sobre lançamento em 2019 e "Edição 2023" da Ace Studios (bloco [!edicao] da etapa 1): removida. Ficou só que a versão de 2018 não traz a errata.
2. Frase sobre a Ace ter publicado *Galhos e Garras*: removida. Ficou "ignore os ícones de *Branch & Claw*" (p. 23).
3. "desenho da p. 6": agora "desenhos das p. 6 e 7", no Comece e na etapa 1.
4. "no começo do turno você ganha" Energia: agora "na fase dos Espíritos, depois do Crescimento" (p. 8).
5. "só volta à mão com Recuperar": agora "em geral", com a menção a "Recuperar 1" (p. 14).
6. Devastar, passo 2: "Tire" virou "Subtraia o Defender" (p. 9).
7. Marcas "(depois)" no Comece: tiradas. O passo do baralho de Medo diz "(etapa 5)".

**Auditoria de jogo simulado**

a. O Comece agora diz o que entra no primeiro Construir: nas terras do tipo da carta que tenham Invasor, 1 Cidade se houver mais Vilas que Cidades, senão 1 Vila (passo 9; p. 6 e 10).
b. "Constroem onde exploraram" corrigido no exemplo do Comece, no treino da etapa 1 e no passo 3 de "Avançar as cartas": Construir age nas terras do tipo da carta que têm Invasores (p. 10).
c. Energia inicial: o manual não diz. Nada acrescentado.
d. Solo: Comece, passo 4 (6 Pragas: 5 por jogador mais 1, p. 6) e passo 5 (um tabuleiro só, p. 22); etapa 1, passo 1 da ilha (p. 22). Os 4 marcadores de Medo saem da regra de 4 por jogador, já no passo 1.
e. "Vire o painel": agora diz que a montagem está no lado com a história e que o painel vira para o lado das trilhas (p. 6 e ilustração da p. 14).
f. Passo 8 do Comece: 13 Presenças (p. 4), 2 na ilha, 7 na trilha de Energia (1, 1, 2, 2, 3, 4, 4, 5) e 4 na de Jogadas (2, 3, 4, 5, 6), com o 1 e o 2 à mostra (p. 6; painel da p. 14). Isso vem antes da pergunta do Complete.
g. Comece: "essa Praga vem da caixa, não do espaço de Praga" (p. 6) e "separe as cartas listadas na Progressão" (p. 3).
h. Comece: "Ganhar carta de Poder, na primeira partida: pegue a próxima da carta de Progressão" (p. 3 e 18).
i. "Marcadores de efeito de um turno": agora "3 marcadores de lembrete da cor, para marcar, se quiser, terras com efeito que dura só o turno" (p. 4 e 17).
j. "vizinha das suas Areias" virou singular. Acrescentado que "a até 1 terra" inclui a terra onde você já está, porque alcance é máximo e alcance 0 é terra com Presença sua (p. 14 e 16).
k. Rapidez do Relâmpago: o texto continua dizendo só "1 Poder Lento", sem afirmar nada sobre o Poder Inato, porque a ilustração cobre o fim da frase.
l. Etapa 5: "costuma estar perdida" virou "sem carta de Praga, vocês perdem; com carta, sigam o que ela diz" (p. 12 e 15), coerente com o treino.
m. Explicação do Complete da etapa 3 reescrita: "com 3 ou mais Fogo e 2 ou mais Ar, mas menos de 4 Fogo ou de 3 Ar, vale só o primeiro nível".
n. O Tempo Passa (Comece e etapa 2): os Dahan feridos se recuperam no fim do turno (p. 9 e 10).
o. Oceano: Comece, passo 5, "a faixa de mar de cada tabuleiro" (p. 13). O manual não diz em que borda fica; não acrescentei mais.
p. Cartas Únicas do Relâmpago: sem fonte citável; nada acrescentado.

**Portões depois das correções:** zero travessão; `tools/vicios.py` sem aviso no tutorial e no JSON; `tools/checar_comece.py` passa (o Comece foi enxugado para caber em 1.000 palavras com os acréscimos). Extensão: cerca de 6.480 palavras de texto, quase igual à anterior, porque os acréscimos pedidos ocuparam o que foi cortado. O JSON não precisou mudar e continua com `"publicar": false`.

## Modo solo (pedido do editor, 04/11/2026)

Nova seção "## 7. Modo solo: jogar sozinho", depois da etapa 5; as seguintes foram renumeradas (8 Situações especiais, 9 Avaliação final, 10 Para consultar, 11 Fontes). O bloco "Jogo solo" de Situações especiais saiu, porque o conteúdo foi para a seção nova. "etapas" no JSON continua 5 e "publicar" não mudou. A seção "Como este guia ensina" passou a citar a seção solo.

**O que o manual diz sobre o solo, e onde foi usado**
- p. 22, "Solo Player Mode": um tabuleiro só é a ilha inteira; pode mirar em si mesmo Poderes de "outro Espírito", sem os benefícios extras (Gift of Constancy, Elemental Boon); a sorte pesa mais e não há outros Espíritos para compensar. Usado no [!entender], no passo 1 da montagem e no primeiro [!mais].
- p. 6: tabuleiro da Ilha sorteado por jogador, 4 marcadores de Medo por jogador, 9 cartas de Medo, baralho de Invasores 3/4/5, Praga da errata (+1). p. 4: 5 Pragas por jogador no espaço impresso, 13 Presenças e 3 marcadores de lembrete por cor. Totais solo refeitos em `contas.py`: 4 marcadores, 6 Pragas, 13 = 2 + 7 + 4 Presenças, 11 cartas de Invasor depois da ação inicial.
- p. 23 e 28: mapa temático com 1 jogador, tabuleiro Northeast; o mapa temático aumenta a dificuldade em 3. Segundo [!mais].
- p. 3: os Espíritos recomendados valem para qualquer número de jogadores. O manual não indica Espírito nem dificuldade específicos para o solo, e o texto não diz que indica.
- A "Areia de número mais alto é a terra 6" vale só para o tabuleiro da figura da p. 13 (o rótulo "Sands" aponta para a terra 6; a outra Areia é a 2). O tutorial avisa que é aquele tabuleiro.
- Exemplos (primeiro turno e Devastação do turno 2) construídos com regras já conferidas (p. 6, 8 a 10, 14 e 15) e contas refeitas: Energia 3 + 1 = 4, 2 jogadas; Construir em Selva com 0 Vila e 0 Cidade põe Vila; Devastar com Vila + Explorador + 1 Dahan = 3 de Dano, 1 Praga (6 para 5), Dahan destruído, sem revide.

**Figuras da seção (8)**
- Novas: `solo-tabuleiro.webp` (p. 13, terrenos, Oceano, terras costeiras e do interior), `solo-icones.webp` (p. 4, tabuleiro da Ilha com os ícones de montagem), `solo-invasores.webp` (p. 4, tabuleiro dos Invasores), `solo-baralho-medo.webp` (p. 6, baralho de Medo em leque com as divisórias). Só a parte gráfica; os rótulos impressos no desenho (nomes dos terrenos, "Coastal/Inland lands") fazem parte da ilustração.
- Reaproveitadas, por serem o mesmo desenho: `espirito.webp` (p. 14, trilhas do painel), `construir.webp`, `explorar.webp` e `devastar.webp` (p. 11).

**Sem ilustração no manual**
- Não há desenho de uma mesa montada para 1 jogador nem do tabuleiro com a Presença inicial do Relâmpago: os mapas da p. 6 são de 2, 3 e 4 jogadores, e a mesa da p. 7 é de 4 (já usada na etapa 1).
- Não há desenho das trilhas cobertas de Presença: o painel da p. 14 mostra as trilhas descobertas, com os círculos tracejados que recebem a Presença. A legenda diz isso.
- Não há desenho da Praga entrando num tabuleiro solo; a figura de Devastar (p. 11) mostra a Praga e a cascata.

**Portões:** zero travessão; `tools/vicios.py` sem aviso; `tools/checar_comece.py` passa; o conversor gera a página sem marcação crua. A seção tem cerca de 850 palavras de texto (1.200 com as legendas); o tutorial foi para cerca de 7.300 palavras de texto.

## Auditoria independente do modo solo (04/11/2026)

Veredito: aprovado com correções menores. O que foi feito:

1. A montagem para 1 jogador agora cita as p. 3, 4, 6, 13, 14 e 22: a p. 14 é o painel e as trilhas do Relâmpago.
2. "Num tabuleiro como o da figura acima" virou "como o da primeira figura desta seção", porque a figura logo acima é o painel.
3. `solo-icones.webp` saiu do texto e foi apagado: era o mesmo tabuleiro de `solo-tabuleiro.webp`. A frase sobre os ícones de montagem foi para a legenda de `solo-tabuleiro.webp`, que também diz que a Areia mais alta daquele tabuleiro é a terra 6. As figuras reaproveitadas (`espirito`, `construir`, `explorar`, `devastar`) ficam na seção 7, agora com legendas sobre o exemplo solo. A seção fica com 7 figuras.
4. Texto do manual dentro dos recortes:
   - `devastar.webp`: as linhas "Wetlands about to Ravage.", "Step 1/2" e "Option 1/2" foram cobertas de branco, que é o fundo da página. Foi apagada também a linha de 1 px do título "Ravage Examples" no alto. Os desenhos ficaram inteiros.
   - `construir.webp` e `explorar.webp`: recortados de novo a partir da página 11 em 220 dpi, começando abaixo dos títulos "Build/Explore Examples".
   - `solo-baralho-medo.webp`: recortado de novo, sem o resto do título "Game Setup" no alto.
   Os quatro arquivos mantêm o nome e servem também às seções 4 e 5.
5. O passo 3 do primeiro turno solo traz a regra especial do Relâmpago: para cada Ar que você tiver, pode usar 1 Poder Lento como se fosse Rápido (ilustração da p. 14).

Portões: zero travessão; `tools/vicios.py` sem aviso; `tools/checar_comece.py` passa.

## Seção de montagem (04/11/2026)

Nova seção `## setup. Montar a mesa passo a passo`, antes do "Comece a jogar", seguindo as p. 6 e 7 do manual na mesma ordem (Invader Board, Island and Supply, Player Setup, Invaders' Starting Action). Tem 18 passos numerados, a lista de componentes, o que fica na caixa, a tabela por número de jogadores, a conferência final e uma pergunta. O "Monte a mesa" do Comece virou um resumo de 4 itens que remete à seção nova, e a montagem do modo solo ficou só com o que é próprio do solo. Contas novas em `contas.py` (bloco MONTAGEM): 4, 8, 12 e 16 marcadores; 6, 11, 16 e 21 Pragas; 13, 26, 39 e 52 Presenças; 6 cartas de Medo e 3 de Invasor de volta à caixa; Relâmpago 2 + 7 + 4 = 13. `"publicar"` não foi mexido.

**Passo e página**
- Componentes e quantidades: p. 4 e 5. O que fica na caixa: p. 3 (sem carta de Praga, Adversário ou Cenário na primeira partida) e p. 6 (cartas de Medo e de Invasor que sobram). Tabela: p. 4, 6, 7 e 22.
- 1 tabuleiro dos Invasores: p. 6. 2 marcadores de Medo: p. 6 e ilustração da p. 4. 3 e 4 baralho de Medo virado para baixo, com as divisórias: p. 6; "virado para baixo" vem da p. 12 ("move the top card of the Fear Deck face-down"); Nível 1 impresso: p. 12.
- 5 e 6 baralho de Invasores: p. 6 (quadro "Making the Invader Deck"); "virado para baixo" vem da p. 10 ("Turn the top card... face-up").
- 7 Praga: p. 4 (ilustração, 5 por jogador) e p. 6 (errata); [!mais] carta de Praga: p. 6.
- 8 lado do tabuleiro: p. 13 e 23 (o verso é o mapa temático; a frente é o lado "balanced"). 9 encaixes: p. 6 e 7. "O Oceano fica na borda de fora" é leitura dos desenhos, não frase do manual.
- 10 ícones de montagem e Praga da caixa: p. 6; significado dos ícones: p. 32.
- 11 baralhos de Poder e 12 suprimento: p. 6. Dica de devolver a Praga à caixa: p. 20.
- 13 Presenças e marcadores: p. 4 e 6. 14 Espírito, mão inicial, Progressão: p. 3 e 6. 15 tabuleiro inicial e montagem do painel: p. 6, painel na p. 14. 16 trilhas: p. 6 e 14.
- 17 e 18 ação inicial e Explorar: p. 6 e 10. Quem começa (ninguém, jogo simultâneo): p. 8.

**Figuras e página**
- Novas: `setup-pecas.webp` (p. 4: Dahan, Cidade, Vila, Explorador, Praga, sem os títulos de quantidade); `setup-cartas.webp` (p. 5: cartas de Invasor, Poder Maior e Poder Menor, sem os títulos); `setup-praga.webp` (p. 4: espaço de Praga impresso, ampliado); `setup-mapas.webp` (p. 6: encaixes para 2 e 3 jogadores, com os rótulos "2-Player Map", "3-Player Map" e "4-player map shown..." cobertos de branco, a cor do fundo); `setup-icones.webp` (p. 32: os 5 ícones de montagem, isolados do texto e montados lado a lado sobre a cor de fundo da página); `setup-painel-frente.webp` (p. 14: lado da história e da montagem do painel do Relâmpago).
- Reaproveitadas: `solo-invasores.webp` (p. 4), `solo-baralho-medo.webp` (p. 6), `solo-tabuleiro.webp` (p. 13), `espirito.webp` (p. 14), `explorar.webp` (p. 11), `preparacao.webp` (p. 7) e a foto `fotos/mesa-1.webp` (Greater Than Games, crédito da `fontes.json`). São 13 imagens na seção.

**Sem ilustração no manual**
- Montar o baralho de Invasores (passos 5 e 6): o quadro da p. 6 é só texto. A figura mostra as cartas (p. 5), não a pilha montada.
- A reserva de Medo com os marcadores postos: só aparece dentro da mesa da p. 7 e da figura do Medo da p. 12.
- O encaixe para 1 jogador: não há desenho; é o tabuleiro sozinho (p. 22).
- Separar as cartas da Progressão de Poder: a carta aparece na p. 4 (Vital Strength of the Earth), mas não o ato de separar; não recortei.
- A Presença inicial do Relâmpago no tabuleiro e as trilhas já cobertas: não desenhadas. As figuras mostram o texto da montagem e as trilhas descobertas.

**Portões:** zero travessão; `tools/vicios.py` sem aviso (um "em resumo" foi trocado); `tools/checar_comece.py` passa; o conversor gera a seção com o selo "Comece por aqui" e todos os arquivos de figura e foto existem.
