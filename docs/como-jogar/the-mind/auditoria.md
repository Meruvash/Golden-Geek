# Auditoria: Como Jogar The Mind

Entrega 3. Autoverificação do redator, em 05/11/2026, regra por regra contra o manual da Galápagos (TMI001 v1.0). Não é a auditoria independente: ela será feita depois por outro agente, como pede o BRIEF. Este relatório não elogia o texto; registra o que foi conferido e o que ficou fraco.

## 1. Fontes efetivamente usadas

- Usada: regras TMI001 v1.0 (Galápagos, 2 páginas), baixadas da API da biblioteca da Asmodee Brasil (id 2249). O PDF não tem camada de texto; o texto foi transcrito das imagens das páginas para `<scratchpad>/d1105/the-mind/txt/p1.txt` e `txt/p2.txt` (caminho completo: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/the-mind/txt/`). Toda conferência abaixo foi feita contra essa transcrição e, nos pontos de dúvida, contra a imagem (`img/p-1.png`, `img/p-2.png`).
- Usada só como apoio: regras do The Mind Extreme TMI102 (id 2250), para o aviso do vídeo e para apoiar a leitura de R9.
- Não obtidas: manual em inglês (Pandasaurus: Dropbox com login; NSV: 403), FAQ ou errata (não existe na biblioteca). Nenhum bloqueio foi contornado.

## 2. Conferência regra por regra

| Afirmação do tutorial | Onde | Manual | Resultado |
|---|---|---|---|
| 100 cartas de 1 a 100, 12 níveis, 5 vidas, 3 estrelas ninja | Montagem | p. 1, componentes | Confere |
| Vidas e estrelas da equipe abertas, viradas para cima | Passo 1 | p. 1 "colocadas abertas sobre a mesa" | Confere ("abertas" = viradas para cima; a ilustração mostra as cartas de face) |
| Resto de lado, pode voltar como recompensa | Passo 2 | p. 1 "podem ter de ser utilizadas depois"; p. 2 recompensa | Confere |
| Pilha de níveis crescente, para cima, nível 1 no topo | Passo 3 | p. 1 | Confere |
| Níveis não usados voltam à caixa | Passo 4 | p. 1 | Confere |
| 1 carta para cada; ninguém vê a dos outros | Passo 5 | p. 1 | Confere |
| Resto virado para baixo; volta a ser embaralhado no nível seguinte | Passo 6 | p. 1; p. 2 "embaralhadas novamente com o restante do baralho" | Confere; "não é usada durante o nível" é dedução (nenhuma regra compra cartas no meio do nível) |
| Tabela 2/3/4 jogadores | Montagem, folha | p. 1 | Confere; colunas "de lado" e "na caixa" são contas (script) |
| Ninguém começa; não há ordem | Montagem, Comece, etapa 1 | p. 1 "Não existe uma ordem de jogo" | Confere |
| Concentração com a palma na mesa | Comece, etapa 1 | p. 1 | Confere |
| "Pausa" a qualquer momento | Comece, etapa 1 | p. 1 | Confere |
| Uma carta por vez; 36 e 37 | Comece, etapa 1 | p. 1 | Confere |
| Proibido revelar, acordo, sinal secreto | Comece, etapa 1 | p. 1 "Muito importante" | Confere |
| Sempre a mais baixa da mão; 21, 56, 93 | Comece, etapa 1 | p. 2 "Importante" | Confere |
| Todas em ordem: nível vencido | Comece, etapa 1 | p. 1 | Confere |
| Exemplo nível 1 (17, 28, 55) | Comece | p. 1 | Confere com o texto azul e a ilustração |
| Exemplo nível 2 (7, 11, 35, 47, 81, 94) | Etapa 1 | p. 2 | Confere |
| Segredo do jogo (spoiler) | Etapa 1, `[!entender]` | p. 2, quadro invertido; p. 1 recomendação | Confere; paráfrase, sem citação longa |
| Erro: interromper, 1 vida, descartar as inferiores, voltar ao nível atual | Etapa 2 | p. 2 | Confere |
| Um erro, uma vida, com dois jogadores abaixo | Etapa 2, `[!atencao]` | p. 2, exemplo de Paula 34 | Confere pelo exemplo ("perdem uma vida") |
| Estrela: levantar a mão; todos de acordo; cada um descarta a mais baixa, para cima; estrela de lado; seguir | Etapa 2 | p. 2 | Confere |
| Basta um não concordar | Etapa 2, sua vez | p. 2 "Se todos os jogadores estiverem de acordo" | Confere (leitura direta da condição) |
| Carta do nível vencido na caixa; 100 cartas reembaralhadas; nível N dá N cartas; recolher com uma mão e outra na mesa | Etapa 3 | p. 2 | Confere; "a próxima carta da pilha mostra o novo nível" é dedução da pilha crescente da p. 1 |
| Recompensas: nível 2 estrela; 3, 5, 6, 8, 9 conforme a carta | Etapa 3 | p. 2 | Confere |
| Máximo 5 vidas e 3 estrelas | Etapa 3 | p. 2 "Nota" | Confere |
| Vitória ao vencer todos os níveis; derrota ao perder a última vida | Comece, etapa 3 | p. 2 | Confere |
| Modo cego | Etapa 3, `[!mais]` | p. 2 "Novo desafio" | Confere |
| 2 a 4 jogadores, 8+, 20 min, Wolfgang Warsch | Seção 0, JSON | p. 1 | Confere |

Classificadas como **[interpretada]** e marcadas como leitura do guia no tutorial: R23 (recompensa acima do máximo não é recebida), R27 (jogador sem cartas não descarta com a estrela), R30 (modo cego: uma vida por nível com erro), R31 (nível que fica sem cartas depois de erro ou estrela é vencido), R9 (a "outra pilha" das estrelas é a de lado; no tutorial, só na montagem, sem bloco). **[lacuna]**: R32 (duas cartas quase juntas; o tutorial manda combinar antes) e R35 (erro percebido tarde; fora do tutorial final, só no dossiê).

## 3. Contas refeitas

Todas as contas e ordens dos exemplos foram refeitas em `<scratchpad>/d1105/the-mind/scripts/contas.py` (lista no dossiê, seção 10). Conferido também à mão que cada exemplo é uma jogada legal: em cada mão, a carta jogada é a mais baixa do jogador; nas situações de erro, a carta jogada é a mais baixa da mão de quem a jogou; na estrela, todos concordam.

## 4. Cobertura

Todas as regras R1 a R34 do dossiê estão no tutorial, exceto R35 (lacuna, cortada para caber na extensão). A recomendação de os experientes não lerem o quadro final (R33) entrou na seção 0 e no bloco de spoiler.

## 5. Montagem passo a passo: o que o manual ilustra

O manual tem uma só ilustração de preparação (p. 1), a mesa de 3 jogadores. Ela foi recortada em três partes (vidas e estrela, pilha de níveis, cartas) para os passos 1, 3 e 5/6, e usada inteira no fim. Os passos 2 (vidas e estrelas restantes de lado) e 4 (níveis na caixa) não aparecem em nenhuma ilustração do manual; ficaram sem figura, em vez de figura inventada. O manual também não ilustra a mesa de 2 ou de 4 jogadores.

## 6. Evidências do plano instrucional

- Exemplo resolvido, complete e sua vez em cada uma das três etapas e no Comece; exemplos do manual reaproveitados (nível 1, nível 2, erro de Paula).
- Informação procedural no ponto de uso: blocos `[!passos]` de um nível, erro, estrela, nível seguinte, recompensas, fim.
- Prática específica concentrada no que mais se erra: jogar a mais baixa da mão, uma por vez, e o custo de um erro.

## 7. Pontos fracos que restaram

- **Transcrição manual.** Sem camada de texto no PDF e sem OCR, a base de regras depende da minha leitura das imagens. O auditor deve conferir `txt/p1.txt` e `txt/p2.txt` contra as imagens.
- **Sem manual em inglês.** Os termos originais do glossário não foram conferidos, e nenhuma divergência de tradução pôde ser checada.
- **Recompensa por nível não listada.** O manual remete ao símbolo da carta; o tutorial faz o mesmo. Quem quiser saber antes de abrir a caixa não tem a lista.
- **Figuras de baixa resolução.** As ilustrações do manual são rasters pequenos; os recortes ficam pixelados (é o original).
- **Vídeo de outro jogo.** O Duque só tem o The Mind Extreme; entrou com aviso. Um vídeo de regras da caixa básica, em português, seria melhor.
- **Quatro interpretações** em blocos `[!edicao]` (R23, R27, R30, R31); nenhuma está escrita como regra.
- **Teste de execução** (montagem e um nível por um leitor que só tem o tutorial) não foi feito: o BRIEF proíbe subagentes nesta rotina.

## 8. Teste com leitores (proposta)

O mesmo protocolo do piloto: 5 a 8 adultos que nunca jogaram; tarefas: montar a mesa para 2 e para 4, jogar o nível 1 e o nível 2, resolver um erro dado; medir ajuda pedida, erros de regra (lista feita da base de regras), tempo até o primeiro nível sem ajuda e esforço percebido. Nada disso foi aplicado.

## 9. Ligação com a resenha

A resenha está em `/the-mind/`. Proposta (não implementada): link do tutorial na resenha, perto do "como funciona", e da resenha no topo do tutorial.
