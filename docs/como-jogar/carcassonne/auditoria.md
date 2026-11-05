# Auditoria: Como Jogar Carcassonne

Entrega 3. Autoverificação do redator, regra por regra, contra o manual Devir (texto extraído em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/carcassonne/texto/`, por página). Pelo BRIEF, a auditoria independente será feita depois por outro agente; nada aqui substitui essa auditoria nem o teste com pessoas.

## 1. Fontes usadas e não obtidas

- Usadas: livro de regras Devir (6 p., © 2014) e suplemento Devir (2 p.), ambos lidos inteiros em texto e em imagem; catálogo Devir de 2026 (p. 5); artigo da Devir de 15/10/2025; oEmbed do vídeo da Devir.
- Não obtidas: manual da edição de 2021 em português (não achado no site da Devir); FAQ ou errata da Devir (não existe na página de downloads). O manual em inglês não foi consultado: não houve dúvida de tradução que o pedisse.
- Ponto para o editor: o suplemento não tem link encontrado no site; foi achado pedindo o nome previsível no diretório de uploads, que o `robots.txt` libera (dossiê, seção 2).

## 2. Conferência regra por regra

| Afirmação do tutorial | Onde | Manual | Resultado |
|---|---|---|---|
| Componentes: 72 cartelas com a inicial, 12 de rio, 40 seguidores (8 por cor), 5 abades, 1 marcador | setup | p. 2; catálogo | Confere. 72 é a conta 84 − 12, igual ao catálogo |
| Inicial e rio têm verso mais escuro | setup 1 | p. 2 | Confere |
| Rio fica na caixa no jogo base | setup 1 | supl. p. 2 (rio "substitui a cartela normal de início") | Interpretada: o livro não diz; marcada no dossiê (P5) |
| Inicial no centro; outras misturadas em montes, viradas para baixo | setup 2 e 3 | p. 2 | Confere |
| Marcador no canto | setup 4 | p. 2 | Confere |
| 7 na reserva, oitava no 0 | setup 5 e 6 | p. 2 | Confere |
| Figuras não usadas e abades para a caixa | setup 7 | p. 2 | Confere ("nas primeiras partidas") |
| Mais jovem começa, sentido horário | setup 8 | p. 3 | Confere |
| Tabela por número de jogadores | setup | p. 2 + conta | Confere (contas.py) |
| Turno em 3 passos, nessa ordem; cartela e pontos obrigatórios, seguidor opcional | 4min; etapa 1 | p. 3 ("deve", "pode", "deve") | Confere |
| Tocar ao menos um lado; diagonal não vale | etapa 1 | p. 3 ("toque ao menos a lateral") | Diagonal: interpretada (T5) |
| Continuidade em todos os lados que tocam | etapa 1 | p. 3 a 5 | Interpretada (T4) |
| Cartela que não cabe vai para a caixa | etapa 1 `[!mais]` | p. 5 | Confere |
| Um seguidor, da reserva, só na cartela recém-colocada | 4min; etapa 1 | p. 3 e 5 | Confere |
| Zona ocupada em outra cartela barra o seguidor | 4min; etapa 1 | p. 3 (exemplo) e 5 | Confere |
| Inclusive se o seguidor for seu | etapa 1 sua vez | p. 5 ("nenhum outro seguidor") | Interpretada (T9) |
| Reserva vazia: só coloca a cartela | etapa 1 `[!mais]` | decorre da p. 3 | Interpretada (T11) |
| Bordas da cartela de monastério encaixam | etapa 1 complete | p. 4 | Confere |
| Ladrão, cavaleiro, monge, fazendeiro deitado | 4min; etapas | p. 3 e 4; supl. p. 1 | Confere |
| Estrada, cidade, monastério concluídos: definições | etapa 2 | p. 3 a 5 | Confere |
| Valores: 1 por cartela; 2 por cartela e 2 por brasão; 9 | etapa 2 | p. 3 a 5 | Confere |
| Pontuação no fim do turno, para todos com seguidor | etapa 2 | p. 5 | Confere |
| Maioria; empate no maior número, todos com pontos inteiros | etapa 2 | p. 5 (exemplo 4 e 4) | Confere |
| Todos recuperam os seguidores, inclusive quem não pontuou | etapa 2 | p. 6 | Confere |
| Quem fecha não é quem pontua | etapa 2 `[!atencao]` | p. 3 | Confere |
| Trilha de 50 casas, figura deitada | etapa 2 `[!mais]` | p. 4 | Confere |
| Zonas que se unem com dois donos; tomar cidade | etapa 2 `[!mais]` e figura | p. 5 e 6 | Confere |
| Fim quando não se pode pegar e colocar cartela | etapa 3 | p. 6 | Confere; "porque acabaram" é interpretada (F2) |
| Valores finais: estrada 1; cidade 1 e 1; monastério 1 + vizinhas; campo 3 por cidade concluída | etapa 3 | p. 6; supl. p. 1 | Confere |
| Maioria também no fim | etapa 3 | p. 6 (verde x preto) | Confere |
| Fazendeiro deitado; não pontua nem volta durante a partida | etapa 3 | supl. p. 1 | Confere |
| Campos delimitados por estradas e cidades | etapa 3 | supl. p. 1 | Confere |
| Campos que se unem; mesma cidade em dois campos | etapa 3 `[!mais]` | supl. p. 1 e 2 | Confere |
| Manual sugere fazendeiros depois de algumas partidas | etapa 3 | p. 6 | Confere |
| Rio e Abade na caixa; resumo das regras | situações especiais | p. 2; supl. p. 2; catálogo | Confere |
| Jardim sem Abade como parte do campo | situações especiais | não está no manual | Interpretada, avisada no texto |
| Edição de 2021 com "alguns ajustes nas regras" | situações especiais | artigo Devir 15/10/2025 | Confere com a fonte; o conteúdo dos ajustes não foi conferido |
| Desempate | situações especiais | não está no manual | Lacuna, avisada no texto |

Regras do manual deixadas de fora: as do Rio e do Abade (pedido do editor; só resumidas). Nenhuma regra do jogo base ficou de fora.

## 3. Figuras

12 figuras recortadas do manual Devir (7 de regra, 5 de montagem), só a parte gráfica; duas são montagens de quadros da mesma página (setup-versos, setup-seguidores) e duas juntam os dois quadros de um exemplo (colocar-seguidor, roubar-cidade). Passos da montagem sem figura do manual: o passo 2 (a inicial no centro) aparece com o 3, na mesma figura; o passo 4 (marcador no canto) aparece com o 6; o passo 8 (quem começa) não é ilustrado no manual. Não há foto da mesa montada: a pasta `fotos/` é de outro agente.

## 4. Contas refeitas

Todas as contas do texto e das legendas foram refeitas em `scripts/contas.py` (dossiê, seção 8), incluindo as do manual (8, 9, 4 e 4, 8, 3, 3, 4, 9, 12, 6, 10).

## 5. Pontos fracos que restam

- **Edição.** O manual usado é o de © 2014. A edição de 2021 existe e parece ter chegado ao Brasil; os "ajustes nas regras" que a Devir menciona não foram conferidos. Quem tem a caixa nova pode encontrar diferenças. Vale buscar esse manual na próxima revisão.
- **Interpretações** (T4, T5, T9, T11, F2, P5, X3): todas seguem a leitura usual do texto, mas nenhuma está escrita com essas palavras no manual Devir.
- **Lacuna:** desempate.
- **Figuras pequenas:** o manual tem ilustrações pequenas; algumas figuras ficam com 450 a 700 px de largura.
- **Vídeo:** o canal Duque Board Games não tem vídeo de Carcassonne (busca no canal, 05/11/2026); entrou o da Devir, editora brasileira. O conteúdo do vídeo não foi conferido contra o manual.
- **Extensão:** 5.020 por `wc -w` (cerca de 4.300 palavras de texto). O "Comece a jogar" passou no `checar_comece.py`.
- **Legibilidade** não medida.
