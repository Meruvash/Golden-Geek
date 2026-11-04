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
