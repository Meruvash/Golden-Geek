# Auditoria: Como Jogar Andromeda's Edge

Entrega 3. Autoverificação de quem escreveu, regra por regra, contra o livro de regras da edição brasileira (Galápagos, AED001, v1.0) e o Apêndice da mesma edição, em 09/11/2026. A auditoria independente (conferência contra o manual e partida simulada) fica para outros agentes; até lá, `"publicar": false`.

## 1. Fontes efetivamente usadas

- Usadas: livro de regras brasileiro (28 páginas, lido inteiro, texto e ilustrações); Apêndice brasileiro (perguntas frequentes da p. 28 e classificação das facções da p. 2); página oficial da Cardboard Alchemy (descrição, idade, tempo); oEmbed do vídeo do Duque.
- Não usadas: o manual em inglês (disponível na página oficial, dispensável); a página do produto da Galápagos (robots.txt proíbe robôs); o item 2820 da biblioteca (404).
- Texto extraído por página: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1109/andromedas-edge/txt/p1.txt` a `p28.txt` (com layout) e `.../txt/raw/p1.txt` a `p28.txt` (ordem de leitura); Apêndice em `.../txt/apendice/`.

## 2. Conferência regra por regra

| Trecho do tutorial | Página | Resultado |
|---|---|---|
| Tabela de componentes | p. 2 e 3 | Confere; "15 cartas de habilidade de desenvolvimento" atravessa as duas páginas |
| Tabela 2/3/4 jogadores | p. 4 | Confere; "2 a 4" é dedução da tabela e das 4 cores, dita assim |
| Passos 1 a 10 do tabuleiro | p. 4 e 5 | Confere, na ordem do manual |
| Passos 11 a 16 do jogador | p. 6 e 7 | Confere; a ordem do manual (Materiais, Estação, Facções, Aprimoramento, Trilhas, Líderes) foi mantida |
| O que fica na caixa | p. 4 a 6, 26 | Confere; o baralho de eventos não escolhido é dedução de "Escolha um baralho" |
| Quem começa e marcadores de PV | p. 7 e 8 | Confere |
| Primeiro Lançamento, região ocupada, Viagem, Base Aliada | p. 9 | Confere |
| Ativar planeta, nebulosa e Base Aliada; ações das Bases | p. 10 | Confere |
| Descarte de excesso no fim do turno | p. 9 | Confere; limites numéricos vindos da ilustração em `[!edicao]` |
| Ataque Invasor, classe S, Viagem dos invasores | p. 11 | Confere |
| Exemplo do Comece: Vorticon alcance 1, armas 2, recompensa carta tática | p. 5 (carta ilustrada), p. 11, 22 e 23 | Os valores vêm da carta impressa na ilustração; a mira 1 do Vorticon vem da regra da classe S (p. 22) |
| Lançamento subsequente | p. 9 | Confere; para região com invasor, leitura do guia em `[!edicao]` |
| Limite de luas e lua no turno alheio | p. 10 | Confere |
| Base Aliada com o último líder recrutado ali | Apêndice p. 28 | Confere |
| Retorno: quando, ativação, energia, dano, Ferro-Velho, ciência pelo Reator, entrada de lua, devolver naves, descartar energia e sustentação | p. 12 e 13 | Confere |
| Módulos centrais | p. 12 | Confere |
| Comprar módulos (5 passos), Campo com 1 módulo, luas, meia-lua, reordenar | p. 16 | Confere |
| Tabela de naves (alcance, armas, habilidades) | p. 15 | Confere; custos lidos na Baía de Lançamento ilustrada (p. 7), em `[!edicao]` |
| Desenvolvimento: requisitos, passos, última nave, benefícios, habilidades | p. 17 e 18 | Confere |
| Pontuação de desenvolvimento, teto de 10, exemplo de 7 | p. 18 | Confere |
| Trilhas e espaços específicos | p. 19 | Confere |
| Aprimoramento de nave | p. 15 e 19 | Confere |
| Batalha: quando, 6 etapas, mira, limite de 6, empate, todos perdem, vencedor, derrotados | p. 11, 21 e 22 | Confere |
| Operações Táticas, uma vez, antes do dano | p. 22; Apêndice p. 28 | Confere |
| Diplomacia que encerra a batalha | Apêndice p. 28 | Confere |
| Dano às naves e invasores, escudos, dano a módulos, conserto | p. 23 | Confere |
| Exemplo de batalha do manual | p. 24 | Confere, contas refeitas |
| Evento: gatilho, ordem, PV menos 1 por módulo danificado, nada durante o evento | p. 20 | Confere |
| Fim, turno extra para todos, 7 passos, 5/7/10, desempate | p. 25 | Confere; exemplo do manual refeito em script |
| Ações livres | p. 13 e 14 | Confere |
| Regras opcionais | p. 26 e 27 | Confere |

## 3. Exemplos: legalidade e contas

Contas refeitas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1109/andromedas-edge/scripts/contas.py` (detalhe no dossiê, seção 6).

- Comece: o transportador vai a planeta desocupado (primeiro Lançamento legal); o Vorticon, de alcance 1, está na nebulosa vizinha, e o planeta, sem invasor, recebe o Ataque Invasor; 1 dado contra 2, mira 1 dos dois lados.
- Etapa 1: nave de pesquisa com alcance 2 e Viagem, Lançamento subsequente para nebulosa a 2 regiões de uma nave própria.
- Etapa 2: 3 naves úteis (2 do mapa e 1 da Zona de Conserto); energia usada em fileira já ativada por nave; caça pago com 1 titânio e 1 energia (custo da ilustração).
- Etapa 3: cidade em planeta de gelo com 3 líderes, como no exemplo da p. 17; uma Base Aliada pode ter 1 líder restante de algum jogador.
- Etapa 4: exemplo do manual reproduzido; o exercício de 6 dados respeita o limite.
- Etapa 5: exemplo do manual e exemplo próprio somados no script.

## 4. Pontos de interpretação delicada

1. **Limites de recursos** (energia 10; os outros 5): só na ilustração da p. 7. O "máx 5" fica junto de créditos e nanocarbono na legenda e, no tabuleiro, aparece em gelo, nanocarbono e créditos; para o titânio o valor é inferência do grupo da legenda.
2. **Custos das naves**: lidos na Baía de Lançamento ilustrada (p. 7).
3. **Lançamento subsequente para região com invasor**: a p. 9 só fala de naves adversárias; o guia permite, pela p. 11.
4. **Alcance**: contado por regiões, vizinha = 1, pelo exemplo da p. 24.
5. **Traço sobre o módulo nos Campos**: visto no ícone das Bases (p. 10); a p. 16 explica o traço. O texto da p. 10 diz "compre".
6. **Módulos centrais como primeiro módulo de cada fileira**: das ilustrações (p. 7 e 12).
7. **Cartas do Vorticon**: valores lidos na carta ilustrada (p. 5).
8. **Número de jogadores do jogo base**: o manual não escreve; a tabela da p. 4 dá 2, 3 e 4.

## 5. Figuras e passos sem ilustração

Cada passo da montagem que o manual mostra tem figura recortada (lista no dossiê, seção 5). Sem figura: o passo 1 (o tabuleiro é mostrado nas figuras de mapa e trilhas), o passo 7 (o terminus aparece só como um disco pequeno no canto da ilustração) e o jogador inicial (o manual não ilustra). As figuras foram recortadas sem os quadros "EXEMPLO" e sem blocos de texto; ficam dentro delas só rótulos impressos nos componentes e os números dos passos. Fotos oficiais: 4, da Lucky Duck Games, edição em inglês (crédito com a nota).

## 6. O que ficou fraco

- O texto é longo (cerca de 10 mil palavras com tudo; 15 min de leitura do essencial). O jogo é pesado; a montagem sozinha tem 16 passos.
- O primeiro turno depende da facção: os recursos iniciais estão no verso de cada carta e o guia não pode dizer quais Bases Aliadas o leitor consegue pagar.
- Os custos das colunas de módulos e as posições dos espaços nas trilhas não estão no texto do manual; o guia remete ao tabuleiro.
- Habilidades de facção, aprimoramentos neutros e cartas táticas específicas não são ensinados um a um (o Apêndice tem 28 páginas sobre isso); o guia ensina o sistema e manda ler a carta.
- O vídeo do Duque é uma partida resumida, não uma explicação de regras.
- Esta é uma autoverificação: falta a auditoria independente e o teste de execução por um leitor que só tenha o tutorial.
