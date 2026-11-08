# Auditoria: Como Jogar Cascadia

Autoverificação de quem escreveu o tutorial, regra por regra, contra o manual oficial em inglês (AEG e Flatout Games, abril de 2025). Não é a auditoria independente: ela será feita depois, por outro agente. Por isso o JSON fica com `"publicar": false`.

Texto do manual por página (OCR, conferido nas imagens das páginas): `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/manual/cascadia_en_paginas.txt`. Imagens das páginas: mesma pasta, `png/` (200 dpi) e `view/` (90 dpi).

## 1. Fontes efetivamente usadas

- Manual oficial em inglês, AEG/Flatout Games, 16 páginas, baixado do site da AEG em 08/11/2026: única fonte de regra.
- Página do produto na AEG: duração (45 min).
- Página do produto na Grok e resenha do site: só vocabulário.
- Não obtidos: manual em português (a Grok não publica), FAQ ou errata oficial (não encontrados nos sites da AEG e da Flatout), a tabela de pontos legível das cartas (o arquivo é imagem de baixa resolução).

## 2. Conferência regra por regra

| Trecho do tutorial | Regra | Manual | Resultado |
|---|---|---|---|
| Montagem, tabela da caixa | R1 | p. 3 | Confere |
| Passo 1 | R2 | p. 4, passo 1 | Confere |
| Passo 2 e tabela por jogadores | R3 | p. 4, passo 2 (43/63/83; remover 42/22/2) | Confere; 43 + 42 = 63 + 22 = 83 + 2 = 85 |
| Passo 3 | R4 | p. 4, passo 3 | Confere ("Randomly select"; A recomendadas na primeira partida) |
| Passo 4 | R5, R11 | p. 4, passo 4; p. 5 | Confere; "3 espaços" vem da ilustração |
| Passos 5 e 6 | R6 | p. 4 | Confere |
| Passo 7 | R7 | p. 4 | Confere |
| Passo 8 | R8 | p. 4 e 5 | Confere |
| "Ninguém começa com fichas de pinha" | R9 | p. 4 | Interpretada: nenhum passo dá pinha; está dita como consequência da montagem |
| Solo na montagem e no turno | R10, R36, R52 | p. 9 e 10 | Confere |
| Turno do "Comece" e etapa 1 | R12 a R26 | p. 5 a 8 | Confere. Superpopulação de 3: "once per turn"; de 4: pode se repetir; pinha: sem limite |
| Peça-chave | R24, R28 | p. 7 e 8 | Confere. O tutorial descreve o símbolo e diz que a peça do exemplo é só de floresta com o alce, sem generalizar |
| Corredores e exemplo 3 + 4 florestas | R31, R32 | p. 8 | Confere |
| Peça de dois terrenos em dois corredores | R33 | p. 8 | Interpretada (consequência da definição por lado e terreno) |
| Maiorias a 2, a 3 e 4, solo | R34 a R36 | p. 9 | Confere, frase por frase |
| Pinhas e desempate | R37, R38 | p. 8 e 9 | Confere |
| Regras gerais dos animais | R39, R41, R43, R45 | p. 11 | Confere |
| Cartas A | R40, R42, R44, R46, R47 | p. 11 | Confere. Cabeçalhos das tabelas (pares 1 a 4; filas 1 a 4; 1 a 7+; 1 a 8+; 1 a 5) lidos na imagem |
| Falcão encostado não conta | R50 | p. 11 | Confere (explícito na p. 11) |
| Salmão: triângulo e galhos | R49 | p. 11 | Confere (explícito na p. 11) |
| Troca de cartas e exemplos B, C, D | R4, R48 | p. 4 e 11 | Confere. A sugestão "combine com a mesa qual letra usar" é do guia, apresentada como alternativa ao sorteio que o manual manda |
| Variantes família e intermediária | R53, R54 | p. 10 | Confere |
| Conquistas | R55 | p. 12 a 14 | Confere (resumo) |
| "O que o manual não diz" | R56 | | Lacuna, dita como lacuna |

## 3. Contas refeitas

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/scripts/contas.py`.

- Peças e turnos: 20 por jogador + 3; com 4 pares abertos, a pilha tem 20n menos 1 peças e a partida dura 20n turnos, 20 para cada.
- Território de Jade (p. 9), lido na figura e montado como grade: raposas com 3, 5 e 3 tipos vizinhos; 4 falcões sem falcão vizinho; salmões com 2, 1, 2 e 1 vizinhos salmões (corrente válida); ursos formando 2 pares separados. Batem com os pontos do manual (11, 14, 12, 11, 11 = 59).
- Habitats de Jade: 6 + 2 + 4 + 1 + 7 + 1 + 8 + 3 + 5 + 0 = 37; total 98. Lee 67 + 30 + 0 = 97; Ash 55 + 39 + 1 = 95. As maiorias calculadas pela regra da p. 9 reproduzem os bônus do bloco do manual.
- Exercícios: complete da etapa 3 (habitats 27 + 3 de bônus = 30; total 51 + 30 + 3 = 84); empate de campos a 4 (8, 8, 5, 3 dá 2 e 2, sem segundo); empate no segundo a 3 dá 0; ursos (2 pares; depois um grupo de 4 e 1 par).

## 4. Figuras

Recortes da imagem de cada página (964 px de origem, renderizada a 200 dpi), só a parte gráfica, sem os blocos de texto do manual, em `como-jogar/cascadia/figuras/`:

| Arquivo | Página | Onde entra |
|---|---|---|
| setup-saco, setup-pilhas, setup-cartas, setup-iniciais, setup-centro, setup-pinhas | p. 5 (ilustração numerada da montagem, 1 a 7) | Passos 1 a 7 da montagem (5 e 6 dividem uma figura, como no manual) |
| colocar-peca | p. 7 | "Comece a jogar" |
| escolha, superpopulacao | p. 6 | Etapa 1 |
| colocar-ficha | p. 7 | Etapa 1 (cortada acima da legenda em itálico do manual) |
| pecas | p. 8 | Etapa 1, peça-chave |
| cartas-a | p. 9 | Etapa 2 |
| pontuacao, bloco | p. 9 | Etapa 3 |

O passo 8 da montagem (quem começa) não tem ilustração no manual e ficou sem figura. A foto oficial `cascadia/fotos/componentes-1.webp` (Flatout Games) abre a montagem, descrita como partida de 2 jogadores em andamento, que é o que ela mostra. As figuras são pequenas na origem (a página inteira tem 964 px), então os recortes ficam um pouco suaves; não há versão melhor no site da AEG.

## 5. Portões automáticos

- Travessão e meia-risca: 0.
- `tools/vicios.py`: sem aviso, depois de cortar uma muleta de linguagem.
- `tools/checar_comece.py`: passa.
- `tools/como_jogar_md.py`, função `pagina`, em memória: gera a página sem erro, com as figuras.
- Extensão: cerca de 4.700 palavras de texto, sem as legendas.

## 6. Interpretações e lacunas

- [interpretada] Ninguém começa com pinha (R9); peça de dois terrenos conta nos dois corredores (R33); cada hexágono da peça inicial é uma peça (R11b); 4 iguais depois de uma troca também saem (R57); a pontuação intermediária fica na mesma carta da família (R54).
- [lacuna] Tabela de pontos completa das cartas A (ilegível no arquivo): o tutorial dá só os valores confirmados pelo exemplo da p. 9 e manda ler os outros na carta, com um `[!edicao]`. Saco de fichas vazio e reserva de pinhas esgotada: o manual não trata. Girar a peça antes de encaixar (R11c), fila de alces maior que 4 (R50b) e conferência de superpopulação na montagem (R57): ditas como lacuna em `[!edicao]` ou no texto.

## 7. O que ficou fraco

- **Nomes.** Sem manual da Grok, todos os nomes são tradução nossa. "Falcão" para *hawk* segue a resenha, mas a caixa pode dizer "gavião". Se o editor tiver a caixa, basta trocar os termos do glossário.
- **Valores das cartas.** O leitor fica sem a tabela inteira das cartas A (por exemplo, quanto vale 1 par de ursos ou 1 falcão isolado). Os exercícios foram montados só com os valores confirmados, o que limita a prática de contagem.
- **Figuras suaves.** A resolução do arquivo da AEG é baixa.
- **Vídeo.** O do topo é do canal Romir Play House, porque o Duque só tem review e unboxing de Cascadia. Não conferi se o vídeo segue a edição da Grok.
- A auditoria independente e o teste de execução ainda não foram feitos.

## 8. Correções das auditorias independentes (08/11/2026)

Duas auditorias (regras: aprovado com correções; partida simulada: sim, com ajustes). Aplicado no tutorial:

- **Erros de fato.** Cartas: 21 = 20 de animais + 1 carta das variantes família e intermediária (tabela da caixa e variante intermediária corrigidas). Reposição: a peça nova vai no lugar da peça levada e a ficha nova no lugar da ficha levada, sem arrastar (passo a passo, exemplo resolvido da Etapa 1 e folha de consulta). Peças-chave: "a única fonte de pinhas".
- **Precisão.** Legenda de colocar-peca (o X é hexágono desalinhado; os certos são exemplos); "para jogar com crianças" retirado; "combinem qual letra usar" marcado como sugestão do guia; tabela da carta "liga cada tamanho de grupo aos pontos"; seção 0 diz "nas cartas A da primeira partida"; peças inexistentes trocadas por peça de montanha e campo com urso e raposa; "sentido horário" no lugar de "esquerda"; triângulo branco "na ilustração do manual"; alce "na maioria das cartas"; raposa D olha 8 espaços; R49 e R50 reclassificadas como verificadas.
- **Clareza.** Peça inicial: hexágonos com animais desenhados e `[!edicao]` sobre cada hexágono contar como peça (interpretada); girar a peça: `[!edicao]` de lacuna; solo: "no solo, 43, como para 2", fim depois do 20º turno e descarte quando o par mais distante foi levado (pelo exemplo da p. 10); superpopulação depois de troca; definições de peça-chave, corredor e território na primeira menção; referências "Etapa N (nome)"; figura do território de Jade movida para antes do exemplo que a usa; "fila reta de 3, em outra direção"; título "Salmão: triângulo e galhos", com "um grupo assim não pontua"; linha de visão movida para o quadro da troca de cartas; fila de alces maior que 4: `[!edicao]` de lacuna; "fora a peça inicial".
- **Idade.** Mantido 10+ no JSON; sem caixa sobre os 14+, por falta de fonte conferida nesta sessão (dossiê, seção 2).
- Conversor testado só em memória, com saída no scratchpad (`/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/teste_pagina.html`); nada gerado no repositório.
