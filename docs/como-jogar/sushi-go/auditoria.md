# Auditoria: Como Jogar Sushi Go!

Entrega 3. Autoverificação do redator, em 08/11/2026, regra por regra contra o manual da Devir (`sushi-go.pdf`, 12 páginas). Não é a auditoria independente: ela será feita depois por outro agente, como pede o BRIEF. Este relatório não elogia o texto; registra o que foi conferido e o que ficou fraco.

## 1. Fontes efetivamente usadas

- Usada: manual da edição brasileira (Devir, tradução da Equipe Devir, © 2014 Gamewright), baixado em 06/11/2026 de https://devir.com.br/wp-content/uploads/2016/09/sushi-go.pdf. O PDF tem camada de texto; o texto foi extraído com `pdftotext -layout`, uma página por arquivo, em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/sushi-go/texto/p01.txt` a `p12.txt`. Cada página também foi lida como imagem (`img/p-NN.png`), porque o texto extraído das legendas das cartas sai embaralhado.
- Usada para jogadores, idade e duração: página do produto https://devir.com.br/sushi-go/.
- Não obtidos: manual em inglês da Gamewright (pasta `/pdfs/` bloqueada no `robots.txt`; não contornado), FAQ ou errata (não encontrados no site da Devir).

## 2. Conferência regra por regra

| Afirmação do tutorial | Onde | Manual | Resultado |
|---|---|---|---|
| 108 cartas e as quantidades de cada tipo | Montagem | p. 2 | Confere; soma 108 no script |
| Papel e caneta não vêm na caixa | Montagem | p. 2 pede "Tenham papel e caneta"; a lista de conteúdo da p. 2 e da página do produto não os inclui | Confere |
| Embaralhar todas; 10/9/8/7 cartas | Montagem, Comece, folha | p. 2 | Confere |
| Mão escondida | Montagem | p. 2 | Confere |
| Resto virado para baixo no centro; volta a ser usado para as novas mãos | Montagem | p. 2; p. 7 | Confere |
| Um jogador anota o placar | Montagem | p. 2 | Confere |
| Tabela: turnos por rodada, cartas na pilha, cartas usadas | Montagem | contas do guia (script) a partir da p. 2 e p. 7 | Confere; marcado como "contas do guia" |
| Nada volta para a caixa; restantes ignoradas no fim | Montagem | p. 8 | Confere |
| Ninguém começa; escolha simultânea | Montagem | p. 3 | Confere |
| Escolher virado para baixo, revelar juntos, passar para a esquerda, virado para baixo | Comece, etapa 1, folha | p. 3 | Confere |
| Cartas baixadas ficam até o fim da rodada; agrupar ajuda | Comece | p. 3 "NOTA" | Confere |
| A pilha de compra só serve para dar as mãos | Comece (complete) | p. 2 e 7 | Dedução (R27): nenhuma regra manda comprar durante a rodada |
| Wasabi: nigiri com wasabi já na frente deve ir sobre ele; triplo; vários wasabis, 1 nigiri cada; wasabi vazio 0 | Etapa 1 | p. 3 e 7 | Confere |
| Nigiri anterior ao wasabi não passa para cima | Etapa 1 `[!atencao]`, avaliação 3 | p. 3 "já tem"; carta "PRÓXIMO NIGIRI x3" | Interpretada (R13), leitura direta |
| Hashis: já na frente; escolher a primeira, dizer "Sushi Go!", baixar a segunda antes de revelar; volta para a mão e é passado; 1 por turno; vale 0 | Etapa 1, folha | p. 4 e 7 | Confere |
| Exemplo dos hashis: passa 3 cartas, como os outros | Etapa 1 | p. 4 | Confere (script) |
| Última carta baixada direto; depois pontuar | Etapa 1 | p. 4 | Confere |
| Tempurá 5 por par; sashimi 10 por trio; gyoza 1, 3, 6, 10, 15 | Etapa 2, folha | p. 6 | Confere |
| Nigiri 3, 2, 1; com wasabi 9, 6, 3 | Etapa 2, folha | p. 7 | Confere |
| Maki: soma de símbolos; 6 e 3; empates; sobra perdida; empate em primeiro zera o segundo | Etapa 2, folha | p. 5 | Confere |
| Anunciar a pontuação para quem anota | Etapa 2 passo 7, etapa 3 | p. 7 | Confere |
| Rodada de 4 jogadores (17, 15, 6, 10) | Etapa 2 | regras p. 5 a 7 | Confere (script; 8 cartas por jogador conferidas; nenhum tipo passa da quantidade da caixa) |
| Nova rodada: anunciar, descartar menos pudins, nova mão igual | Etapa 3, folha | p. 7 | Confere |
| Pudins: +6 mais, -6 menos (zero conta), empates dividem, sobra perdida; ninguém com pudim; 2 jogadores só +6 | Etapa 3, folha | p. 8 | Confere |
| Exemplo dos pudins do manual | Etapa 3 | p. 8 | Confere com a regra; o manual escreve "Lise" e "ficando com 3 pontos cada" (sem sinal); o guia usa Luísa e "perde 3" |
| Vencedor; empate por mais pudins | Etapa 3, folha | p. 9 | Confere |
| Variante passar para os dois lados | Situações especiais | p. 9 | Confere |
| Variante de 2 jogadores | Situações especiais | p. 9 e 10 | Confere |
| Cartas do fictício ficam na frente dele e pontuam | `[!edicao]` | p. 9 e 10 | Interpretada (R36) |
| Hashis com wasabi e nigiri no mesmo turno | `[!edicao]` | não tratado | Lacuna (R37) |
| Autor, ilustrador, distribuidora | Seção 0 | p. 11 | Confere |
| 2 a 5 jogadores, 8+, 15 min | Seção 0, JSON | página do produto | Confere (não está no manual) |

**[interpretada]:** R13 (nigiri anterior ao wasabi), R27 (pilha de compra só para dar as mãos), R36 (cartas do jogador fictício). **[lacuna]:** R37 (hashis com wasabi e nigiri no mesmo turno; no tutorial, "combinem antes"), R38 (todos com o mesmo número de pudins) e R39 (empate em pontos e pudins), estas duas só no dossiê. R41 (hashis no último turno) não entrou.

## 3. Contas refeitas

Todas as contas dos exemplos e exercícios foram refeitas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/sushi-go/scripts/contas.py` (lista no dossiê, seção 10). Conferido à mão que cada exemplo é legal: cada jogador da rodada da etapa 2 tem exatamente 8 cartas; nenhum tipo passa da quantidade da caixa; no exemplo dos hashis, a carta de hashis já estava na frente antes do turno; nos exemplos de wasabi, o wasabi veio antes do nigiri.

## 4. Cobertura

R1 a R37 e R40 estão no tutorial. R38, R39 e R41 ficaram só no dossiê (lacunas, cortadas para caber na extensão). A tabela de resumo da p. 12 do manual foi usada só para conferir a folha de consulta, sem cópia.

## 5. Montagem passo a passo: o que o manual ilustra

A página de preparação (p. 2) não tem ilustração de mesa montada nem dos passos; só três cartas soltas decorando a página (tempurá, nigiri de salmão, gyoza). Esse recorte entrou no passo 1, com legenda que diz o que ele é. Os passos 2 (dar as cartas), 3 (mão escondida), 4 (pilha de compra) e 5 (placar) não têm ilustração no manual e ficaram sem figura, em vez de figura inventada. A foto oficial de componentes (Gamewright, edição em inglês) entrou na lista de componentes, com o crédito de `fotos/fontes.json` e o aviso de que o texto das cartas está em inglês. Não há foto oficial de mesa montada.

## 6. Evidências do plano instrucional

- Exemplo resolvido, complete e sua vez no Comece e nas três etapas; os exemplos do manual (pudins) reaproveitados, e o do maki usado como base do exercício de empate.
- Informação procedural no ponto de uso: `[!passos]` de um turno, do fim da rodada, da pontuação, da nova rodada e do fim do jogo; casos especiais em `[!mais]` (wasabi, hashis, empates, pudim com 2 jogadores, variantes).
- Prática específica no que mais se erra: a ordem wasabi e nigiri, o limite de 1 hashis por turno, os empates do maki e dos pudins.

## 7. Pontos fracos que restaram

- **Sem manual em inglês.** Os termos originais do glossário não foram conferidos. A carta de hashis da foto em inglês diz "SWAP FOR 2", e a brasileira "ESCOLHA DOIS": pode haver mudança de regra na edição atual da Gamewright, não verificada. Quem joga com a caixa em inglês pode encontrar diferença.
- **Interpretação R13** (nigiri anterior ao wasabi) está como `[!atencao]` e numa pergunta da avaliação. É a leitura mais direta do texto, mas não há frase explícita; o auditor deve decidir se a mantém como regra ou a passa para `[!edicao]`.
- **Erro de redação no exemplo dos pudins** (manual: "Lise", "ficando com 3 pontos cada"). O tutorial conta o exemplo certo pela regra, mas não avisa mais o leitor da divergência (bloco cortado por extensão). Quem conferir com o manual pode estranhar.
- **Figuras pobres para a montagem.** O manual não ilustra a preparação; só o passo 1 tem figura, e é decorativa.
- **Figuras de baixa resolução.** As cartas no PDF são rasters pequenos; os recortes ficam borrados.
- **Vídeo da editora, não do Duque.** O Duque só tem uma opinião sobre o jogo; entrou o vídeo de regras rápidas da Devir. O conteúdo do vídeo não foi conferido (não se baixa vídeo); a frase "em caso de diferença, vale o manual" está lá.
- **Extensão:** 4.359 palavras pela contagem `\w+` (4.754 no `wc -w`), dentro do alvo pela primeira contagem, acima pela segunda.
- **Teste de execução** (montagem e uma rodada por um leitor que só tem o tutorial) não foi feito: o BRIEF proíbe subagentes nesta rotina.

## 8. Teste com leitores (proposta)

O mesmo protocolo do piloto: 5 a 8 adultos que nunca jogaram; tarefas: montar a mesa para 2 e para 5, jogar uma rodada inteira, pontuar a rodada dada na etapa 2 sem olhar; medir ajuda pedida, erros de regra (lista feita da base de regras), tempo até a primeira rodada sem ajuda e esforço percebido. Nada disso foi aplicado.

## 9. Ligação com a resenha

Não há resenha de Sushi Go! no site. Proposta (não implementada): se uma resenha for publicada, ligar as duas páginas, e usar o campo `"resenha"` do JSON.
