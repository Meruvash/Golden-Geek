# Auditoria: Como Jogar Splendor

Entrega 3. Autoverificação do redator, feita em 04/11/2026 com os dois manuais abertos (texto extraído em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/splendor/work/br2015_p*.txt` e `.../work/spl301.txt`, e as páginas renderizadas). Não é a auditoria independente: o briefing proíbe subagentes, e a auditoria independente será feita depois por outro agente. `publicar` continua `false`.

## 1. Fontes efetivamente usadas

- Manual brasileiro de 2015 (SPL001), 4 páginas, lido inteiro. Fonte das páginas citadas.
- Folheto brasileiro de 2025 (SPL301, v1.0), lido inteiro, citado como "manual de 2025".
- Página do produto SPL001 na loja da Asmodee Brasil (jogadores, idade, duração).
- oEmbed do vídeo do Duque Board Games.
- Não obtidos: manual original em inglês (não foi necessário), FAQ ou errata (não existem na loja nem na biblioteca).

## 2. Conferência regra por regra

| Regra (dossiê) | Onde está no tutorial | Conferência no manual |
|---|---|---|
| P1 componentes | Etapa 1, Para entender | p. 2: 40 fichas, 7 por pedra, 5 de ouro; 40/30/20 cartas; 10 nobres. Confere. |
| P2, P3 baralhos e 4 cartas | Comece, Monte a mesa 1 e 2; Etapa 1, passos 1 e 2 | p. 2. Confere. |
| P4, P5 nobres e fichas por número de jogadores | Comece 3 e 4; Etapa 1, passos 3 e 4; exemplo e sua vez; avaliação 1 | p. 2, tabela "Partida para 2 ou 3 jogadores". Confere (4 com 2, 5 com 3, ouro igual). |
| P6 estoque | Comece 4; passos 4 | p. 2 "seis pilhas distintas". Confere. |
| P7, P8 primeiro jogador | Comece 5; passos 5; `[!edicao]` | p. 3; 2025. Confere. |
| P9 anatomia da carta | Etapa 1, Para entender; figuras | 2025 "Anatomia da Carta"; ilustração p. 3. Confere. |
| P10 carta sem número | Etapa 1, Para entender | Interpretação pela ilustração (carta azul de Giulia sem número). |
| P11 pedido do nobre no lado esquerdo | Etapa 1, Para entender | Ilustrações p. 3 e 2025. Confere. |
| A1 uma ação | Comece; Etapa 2, passos | p. 3 "apenas uma das 4 ações". Confere. |
| A2, A3 três diferentes; faltando cor, 2 ou 1 | Comece (tabela); passos 1; `[!mais]`; `[!edicao]` | p. 3; 2025. Confere. |
| A4 duas iguais com 4 na pilha | Comece (tabela, complete); passos 2; avaliação 2 | p. 3 "pelo menos 4 fichas disponíveis da cor escolhida antes". Confere. |
| A5 ouro só da reserva | Comece passo 2 e erros caros; Etapa 2 | p. 3 "única forma de obter uma ficha de ouro". Confere. |
| A6 reservar, topo escondido | Tabela; passos 3; sua vez da etapa 2 | p. 3 "sem mostrá-la". Confere. |
| A7 ouro esgotado | `[!mais]` | p. 3. Confere. |
| A8 máximo 3, sem descarte | passos 3; `[!mais]`; sua vez | p. 3; 2025. Confere. |
| A9, A10 comprar, fichas voltam | passos 4; pagar uma carta 4 | p. 3 "incluindo os curingas". Confere. |
| A11 ouro substitui qualquer cor | pagar 3; `[!mais]`; complete | p. 3; 2025 "mesmo se você tiver". Confere. |
| A12 colunas por cor | passos 4 ("o manual sugere") | p. 3 (2015 como instrução); 2025 "recomendamos". Redação neutra; confere. |
| A13 bônus desconta 1 | Antes de tudo; Etapa 2; resolvido; treino | p. 4. Confere. |
| A14 compra de graça; excesso não vira ficha | Antes de tudo; `[!mais]` | p. 4; 2025. Confere. |
| A15, A16 reposição; baralho vazio | Comece passo 3 e sua vez; fim do turno 1; `[!mais]` | p. 4. Confere. |
| A18 limite de 10 | fim do turno 2; sua vez da etapa 2 | p. 3 "ao final de seu turno (incluindo curingas)", "algumas ou todas". Confere. |
| A19 passar de 10 durante o turno | não está mais no tutorial (cortado por extensão); implícito em "no fim do turno" | 2025. |
| N1 a N4 nobres | Etapa 3, passos; figura; sua vez | p. 3 e 4. Confere. |
| N5 nobre não escolhido depois | sua vez da etapa 3; avaliação 4 | 2025 "torcer para que os demais ainda estejam lá no seu próximo turno"; p. 3 e 4. Confere. |
| N6 bônus, não fichas | Erros caros; sua vez da etapa 3 | p. 3 (exemplo do nobre com bônus). Confere. |
| F1 a F3 fim | Comece; Etapa 3, passos; resolvido; avaliação 5 | p. 4; 2025. Confere. |
| F4 pontos | passos 3 | p. 4. Confere. |
| F5, F6 desempate | passos 5; `[!mais]`; complete | p. 4; 2025. Confere. |
| F7 reservas no fim | `[!mais]` | 2025. Confere. |

## 3. Exemplos: legalidade e contas

Todas as contas foram refeitas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/splendor/scripts/contas.py` (resultados no dossiê, seção 8). Legalidade:

- Comece: 3 fichas diferentes num estoque de 4 por cor; 2 vermelhas com 4 na pilha (legal); 2 azuis com 3 (ilegal, como a resposta diz).
- Etapa 2, resolvido: 2 bônus azuis e 7 fichas, abaixo do limite; o ouro cobre 1 azul (A11); a carta é a da p. 3 de 2015.
- Etapa 2, complete: carta azul de 2025; bônus vermelho desconta a vermelha; ouro cobre a preta.
- Etapa 3, resolvido: o nobre do exemplo da p. 3; Bruno chega a 3/3/3 no fim do turno (N1); 15 dispara o fim (F2); a rodada acaba em Davi, à direita de Ana (F3).
- Os totais de pontos (12, 13) são supostos, não ligados a cartas específicas. As três cartas e o nobre usados existem nos manuais.

## 4. Pontos de interpretação delicada

- **"No primeiro turno, a escolha é entre pegar fichas e reservar"**: afirmação deduzida (sem fichas e sem bônus, não se paga custo impresso). Nenhuma carta de custo zero aparece nos manuais. Classificada `[I]`.
- **"O marcador de primeiro jogador mostra quando a rodada termina"**: leitura da função do marcador a partir de F3; o folheto não diz isso com essas palavras.
- **"Os nobres só contam a partir da etapa 3"** (Monte a mesa): orientação do guia, não regra; nenhum jogador tem bônus no primeiro turno, então nenhum nobre pode vir nele.
- **Erros mais caros**: escolhidos pelo destaque que os manuais dão, sem dado de comunidade.

## 5. Componentes do plano, com trechos

- Tarefa inteira na versão mais simples: "Sem fichas e sem bônus, você ainda não paga nenhuma carta: no primeiro turno, a escolha é entre pegar fichas e reservar."
- Apoio que diminui: na etapa 2, o resolvido percorre cor por cor; o complete já dá a branca e a verde pagas e pede o resto; a sua vez traz situações novas sem passo a passo.
- Informação de apoio antes da tarefa: "fichas viram cartas, e cartas viram desconto" abre a etapa 2.
- Prática específica: "Treino rápido: quanto você paga?", três contas de desconto.

## 6. Clareza e completude: pontos fracos que restam

- **Extensão**: 4.829 palavras por `wc -w`, acima do teto de 4.500 pedido para jogo leve (cerca de 4.600 contando só palavras). O excesso está nas opções dos exercícios.
- **Duas edições, uma citação sem página**: o folheto de 2025 não tem número de página e aparece como "(manual de 2025)". Quem tem a caixa nova não acha a "p. 3" no seu folheto. O parágrafo de abertura avisa, mas é um atrito.
- **Figuras de 2025 recompostas**: `ouro.webp` e `bonus.webp` juntam pedaços da ilustração (fichas e cartas) para tirar o texto do manual; em `bonus.webp`, um retângulo da cor do fundo cobre o fim de uma linha de texto. O auditor deve conferir se a recomposição é aceitável.
- **A19 (passar de 10 durante o turno)** saiu do tutorial no corte de extensão; a folha de consulta e os passos dizem "no fim do turno", o que basta para jogar.
- **Reservas tiradas da mesa**: o manual não diz se ficam escondidas na mão; o tutorial não toca no assunto.
- **Legibilidade** não medida.
- **Sem teste de execução** por outra pessoa ou agente: depende da auditoria independente.
- **User-Agent**: o CDN da Asmodee recusou o User-Agent próprio de robô; os downloads usaram o User-Agent padrão do curl (seção 2 do dossiê). O editor deve decidir se isso está dentro da regra.

## 7. Teste com leitores (proposta)

Critério: uma pessoa que nunca jogou lê só o tutorial, monta uma partida de 2 jogadores e joga as três primeiras rodadas sem abrir o manual, com no máximo um erro de regra corrigido pela folha de consulta. Medidas: tempo até o primeiro turno, erros nas regras A4, A5 e N6 (os "três erros mais caros"), e a avaliação final refeita 7 dias depois.

## 8. Ligação com a resenha

Não há resenha de Splendor no site; há de *Splendor Duel*, que é outro jogo, com regras diferentes. Proposta, nada implementado: se a resenha de Duel ganhar um link para cá, que diga "o Splendor original" para não sugerir que as regras valem para o Duel.

## Auditoria independente (04/11/2026)

Duas auditorias independentes: regras (aprovada com correções, nenhum erro de regra) e partida simulada (jogável com ajustes). Correções aplicadas:

- **Figuras:** `compra.webp` recortada mais larga, com a pedra do bônus vermelho visível, e a legenda aponta onde ela está; `anatomia.webp` recortada com a caixa de custo inteira, sem as etiquetas de texto; `preparacao.webp` sem a mancha da borda esquerda.
- **Contas do fim de partida:** Bruno tem 3 + 3 + 2 + 1 = 9 cartas; o Complete do desempate agora diz Bruno 9 e Davi 8 (antes, 11 e 9). Davi continua vencendo pelo menor número de cartas (p. 4).
- **Redação:** "Os pontos ficam nas cartas e nos nobres, sempre à vista (p. 4; manual de 2025)"; marcador de primeiro jogador "ajuda a saber quem joga o último turno (manual de 2025)"; "a cor do bônus é a cor da carta" citada só no manual de 2025; "sem número, não vale ponto" com (p. 3); primeiro turno dito como consequência ("como toda carta tem custo", p. 3); "são necessárias 4 fichas".
- **Partida simulada:** frase de que cada nobre tem o seu pedido, que muda de um para outro (p. 4); "no fim do seu turno" para a visita na ideia do jogo, na etapa 3 e na avaliação; reposição da mesa "na hora", em que a carta é comprada ou reservada, no Comece, na etapa 2 e na folha de consulta (p. 4; manual de 2025); "(o guia explica os nobres na etapa 3)"; "Ainda não precisa saber" sem fim da partida e desempate; "exatamente 1 ficha de cada uma de três cores", com a exceção de 2025; "Uma rodada é cada jogador jogar um turno"; tabela com "(máx. 3 reservas; ouro se houver)"; baralhos com o nível 1 na fileira de baixo e os nobres acima, como na figura da p. 2 (2025: nobres "em uma fileira acima das cartas").
- **Portões refeitos:** `checar_comece.py` aprovado; `vicios.py` com 0 aviso nos três arquivos; zero travessão. Tutorial: 4.920 palavras (`wc -w`). `publicar` continua `false`.

## Seção de montagem (04/11/2026)

Pedido do editor: seção `## setup. Montar a mesa passo a passo` antes do "Comece a jogar", seguindo a p. 2 do manual de 2015 na mesma ordem, com os acréscimos do folheto de 2025 (passos 1 a 5 numerados no próprio folheto).

- **Conteúdo e fonte:** componentes e quantidades (p. 2; 2025); baralhos por nível e em coluna crescente (p. 2; 2025 passo 1); 4 cartas por nível (p. 2; passo 2); nobres = jogadores + 1, "numa fileira acima das cartas" (p. 2; passo 3); fichas por número de jogadores e ouro fixo em 5 (p. 2; passo 4); o mais novo começa e pega o marcador (p. 3; passo 5). Tabela por número de jogadores recalculada em Python: 2 jogadores, 4 por pedra, 15 fichas e 7 nobres voltam à caixa; 3 jogadores, 5 por pedra, 10 fichas e 6 nobres; 4 jogadores, 7 por pedra, nenhuma ficha e 5 nobres. "Não há outras modificações" é citação literal da p. 2.
- **Interpretado:** passo 7 ("ninguém recebe nada na montagem") é leitura da ausência de qualquer distribuição nos passos do manual (p. 2 e 3), dito como tal no texto.
- **Figuras novas** (recortes só da parte gráfica, textos do manual retirados): `setup-fichas.webp` (as seis fichas do quadro de componentes de 2025, recompostas lado a lado sem as legendas), `setup-baralhos.webp` (os três versos, sem as legendas), `setup-nobres.webp` (três nobres e o marcador de primeiro jogador, recompostos sem as legendas), `setup-2025.webp` (a ilustração de preparação de 2025 com os números dos passos, sem o texto). `preparacao.webp` (2015 p. 2) saiu da etapa 1 e foi para o passo 5 da montagem. Foto oficial `fotos/mesa-1.webp`, crédito "Imagem: Space Cowboys" conforme `fotos/fontes.json`.
- **Passos sem ilustração no manual:** a tabela de 2 e 3 jogadores (p. 2) é só texto, sem desenho da mesa com menos fichas ou nobres; o embaralhar e a devolução de fichas e nobres à caixa não são ilustrados; a ordem de jogo (sentido horário) não tem desenho. Nada foi inventado para esses passos: ficam com texto, e a figura mais próxima é a da mesa de 4 jogadores.
- **Comece a jogar:** "Monte a mesa" virou um resumo de 4 itens que aponta para a nova seção; `checar_comece.py` aprovado; `vicios.py` com 0 aviso; zero travessão. `publicar` não foi alterado.
