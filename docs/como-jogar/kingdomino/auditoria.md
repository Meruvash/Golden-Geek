# Auditoria: Como Jogar Kingdomino

Autoverificação do redator, 08/11/2026. A auditoria independente fica para outro agente, como manda o BRIEF. Isto não é prova de que pessoas aprendem com o texto.

## 1. Fontes efetivamente usadas

- Manual oficial multilíngue da Blue Orange (© 2016), aberto e lido nesta sessão: inglês p. 2 a 4 (base), francês p. 5 a 7, alemão p. 10 (desempate), português de Portugal p. 17 a 19, tabela p. 28. Texto por página: `<scratchpad>/d1106/kingdomino/txt/ml-pN.txt` e `txt/kingdomino_rules_ML_por_pagina.txt`.
- Páginas da PaperGames (Kingdomino e "As Últimas Coroas").
- **Não obtido:** manual da edição brasileira da PaperGames (OneDrive com login: 401 na API e redirecionamento para login.live.com). FAQ ou errata oficial: não encontrada.

## 2. Conferência regra por regra

| Afirmação do tutorial | Onde | Fonte | Resultado |
|---|---|---|---|
| 48 peças de paisagem, 4 de área inicial, 4 castelos, 8 reis (2 por cor) | montagem | EN p. 2; PaperGames | confere |
| Seis terrenos, coroas de 1 a 3, quantidades | montagem | p. 28 | confere (contas no dossiê) |
| Montar castelos antes da primeira partida | passo 1 | EN p. 2 | confere |
| Caixa aberta como na figura, monte na bandeja | passo 2 | EN p. 2 (figura) | confere; "marca o começo das filas" decorre de "next to the box" |
| 2 reis com 2 jogadores; 1 com 3 ou 4 | passo 3 | EN p. 2 | confere |
| Peça inicial face para cima, castelo em cima | passo 4 | EN p. 2 | confere |
| 24 / 36 / 48 peças ao acaso, números para fora; sobras de lado | passo 5 | EN p. 2; FR p. 5 | confere |
| Fila: tantas peças quantos reis, crescente, a mais baixa junto da caixa, virar | passo 6 | EN p. 2 | confere |
| Escolha inicial: reis sorteados, quem tira o rei o põe numa peça; um rei por peça | passo 7 | EN p. 2; PT p. 17; FR p. 5 | corrigido em 08/11: segue EN e PT-PT; o francês fica em `[!edicao]` |
| Segunda fila ao lado, crescente, virada | passo 8 | EN p. 2 e 3 | confere |
| Tabela por número de jogadores (filas, rodadas, sobras) | montagem | EN p. 2 e 3; contas | confere |
| Quem começa: rei na peça mais perto da caixa | montagem, etapa 1 | EN p. 3 | confere |
| Ação 1 encaixar, ação 2 escolher pondo o rei | 4min, etapa 1 | EN p. 3 | confere |
| Encaixe: peça inicial curinga; senão 1 terreno igual, horizontal ou vertical | 4min, etapa 1 | EN p. 3 | confere |
| Um encosto certo basta | etapa 1 | figura EN p. 3 | interpretada, marcada `[!edicao]` |
| Peça na horizontal ou na vertical | etapa 1 | figuras p. 2 e 3 | confere pela figura |
| 2 jogadores: cada rei na vez da sua peça | 4min, etapa 1 | EN p. 3 | interpretada (ordem pela posição dos reis); não marcada no texto como `[!edicao]` |
| 5 x 5 com castelo; descarte sem pontos | etapa 2 | EN p. 3 | confere |
| Não descartar o que cabe; escolher depois de descartar | etapa 2 | EN p. 3 | interpretada, marcada `[!edicao]` |
| Última rodada só com encaixe; 12 ou 6 rodadas | 4min, etapa 2 | EN p. 3; FR p. 6 | confere |
| Território, quadrados x coroas, sem coroa 0 | etapa 3 | EN p. 3 e 4 | confere |
| Dois territórios do mesmo terreno contam à parte | etapa 3 | FR p. 6 | confere |
| Castelo não pontua | etapa 3 | EN p. 3 e 4 | interpretada, marcada `[!edicao]` |
| Desempate: maior território, coroas, vitória dividida | etapa 3 | EN p. 4; FR p. 7; DE p. 10 | confere |
| Exemplo 23; 7 x 3 = 21; 9 lagos sem coroa = 0 | etapa 3 | EN p. 4 | confere |
| Quatro opcionais e combinação livre | etapa 3 | EN p. 4; nomes PT p. 19 | confere |
| Promo "As Últimas Coroas" | etapa 1 | página PaperGames | confere |
| Idade 8+ (manual) e 7+ (PaperGames); 15 min | seção 0 | EN p. 2; PaperGames | confere |

## 3. Contas refeitas

Todas no script `contas.py` (ver dossiê, seção 9): distribuição de terrenos (96 quadrados, 39 coroas), filas e rodadas, 23 do exemplo, 11, 21, 8, 12 peças por jogador, 23 quadrados ocupados no complete da etapa 2. Exemplo de ordem da fila (5, 18, 27, 40 e 3, 11, 30, 46): nova ordem Bruno (3), você (11), Ana (30), Carla (46), conferida à mão.

## 4. Cobertura

Todas as regras da base (dossiê, seção 4) estão no tutorial, exceto: a variante de 6 a 8 jogadores com duas caixas (manual separado da PaperGames, inacessível, e imagem da Blue Orange não lida; fora do jogo base).

## 5. Montagem passo a passo: o que o manual ilustra

O manual ilustra os passos 1 (castelo), 2 (caixa), 6 (quadro A), 7 (quadro B) e 8 (quadro C); todos têm figura. **Não ilustra** os passos 3 (reis por jogador), 4 (peça de área inicial com castelo, que só aparece em outras figuras, já com peças ao lado) e 5 (embaralhar e separar 24 ou 12 peças). Para o passo 8 entra também a foto oficial da edição nova (Asmodee UK), com a edição dita na legenda. Não há foto da editora com a mesa montada para a primeira rodada.

## 6. Evidências do plano instrucional

- Exemplo, complete e sua vez em cada classe: 4min (primeira peça; onde encaixar; ordem da fila), etapa 1 (rodada de 4 jogadores; encaixe ao lado de pântano e floresta; ordem com 2 jogadores), etapa 2 (sexta coluna; dois buracos soltos; 12 peças), etapa 3 (reino de 23; 11 pontos; 21 pontos e desempate).
- Apoio antes da tarefa: cada etapa abre com "Para entender".
- Prática específica: só ordem da fila e pontuação.

## 7. Pontos fracos que restaram

- A fonte de regra não é o manual da caixa que o leitor brasileiro tem; os nomes de terreno, "monte de compra", "fila" e "rodada" são do guia e podem não bater com a caixa da PaperGames. O nome "pântano" não tem fonte.
- Duas leituras ficaram como escolha do guia sem consenso do manual: encosto parcial (apoiada na figura) e descarte voluntário.
- A ordem de jogo com 2 jogadores (cada rei na vez da sua peça) é dedução, sem bloco `[!edicao]`.
- As figuras mostram a arte do manual de 2016; a caixa do leitor pode ter outra arte.
- O vídeo não é de regras do Duque, e sim review com partida, do Covil dos Jogos; não conferi se ele ensina alguma regra diferente do manual.
- Extensão acima da faixa pedida (cerca de 4.880 palavras, depois das correções).
- O centro do Reino Central num reino incompleto é leitura do guia.
- Legibilidade não medida.

## 8. Teste com leitores (proposta)

Mesmo protocolo dos outros tutoriais: 5 a 8 adultos que nunca jogaram; tarefas: montar para 2 e para 4, jogar a primeira rodada, pontuar o reino da figura da p. 4; medir autonomia, erros de regra (lista feita da base de regras), tempo até a primeira rodada sem ajuda, retenção em 7 dias e esforço percebido (escala de Paas). Nenhum resultado foi observado.

## 9. Ligação com a resenha

O site não tem resenha de Kingdomino; a de Dragomino (/dragomino/) é de outro jogo e já cita Kingdomino como "o próximo passo". Proposta, sem nada implementado: um link do tutorial para a resenha de Dragomino como versão infantil, e da resenha para este tutorial.

## 10. Correções depois das auditorias independentes (08/11/2026)

Aplicadas as 11 correções de regra e as 11 de clareza listadas no dossiê, seção 14. Portões refeitos: travessão 0; `vicios.py` 0; `checar_comece.py` aprovado. Conversor testado só numa cópia no scratchpad (`conv/saida.html`), sem rodar build no repositório.
