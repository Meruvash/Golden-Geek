# Auditoria: Como Jogar 7 Wonders

Entrega 3. Autoverificação do redator, regra por regra, contra o manual (05/11/2026). A auditoria independente fica para outro agente, conforme o BRIEF; este relatório não a substitui. Nenhum subagente foi usado.

## 1. Fontes usadas e as que faltaram

- **Usada (principal):** livro de regras em português do Brasil da segunda edição, Repos Production (`sev-br02-rules`, 8 p., 29/06/2021). Texto por página em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/7-wonders/txt/br_p1.txt` a `br_p8.txt`.
- **Usada (conferência):** livro de regras em inglês, segunda edição (2023), mesmo conteúdo página a página; cartilha de efeitos em inglês; lista de cartas em inglês.
- **Faltou:** o arquivo da segunda edição na biblioteca da Asmodee Brasil (item 29, 7WO201: 404, "blob does not exist"); a cartilha de efeitos em português; o FAQ oficial (7wonders.net, erro de TLS); a página do produto na Asmodee Brasil (não acessada, por orientação do pedido). Por isso o parágrafo de abertura avisa que o folheto impresso da Galápagos não foi conferido.
- **Não usada como fonte:** o manual da primeira edição (2014), baixado da biblioteca (item 1383).

## 2. Conferência regra por regra

Cada linha: regra do tutorial, página, frase conferida no texto extraído (grep em `br_pN.txt`) ou na imagem da página.

| Regra no tutorial | Onde no tutorial | Página | Conferido |
|---|---|---|---|
| Componentes e quantidades | setup, tabela | p. 1 | "148 cartas de Era: 49 cartas da Era I, 49 cartas da Era II e 50"; "54 Moedas no valor de 1 e 24"; "24 fichas de Derrota e 24 fichas de Vitória (8 por Era)" |
| Três baralhos pela Era | setup 1 | p. 3 | "Separe as cartas de Era em três baralhos" |
| Ficar com cartas de número menor ou igual | setup 2, tabela | p. 3 | "número menor ou igual ao número de jogadores"; exemplo de 5 jogadores |
| Roxas: jogadores + 2 | setup 3, tabela, pergunta | p. 3 | "número de jogadores +2"; exemplo "7 cartas Roxas" |
| Embaralhar e pôr no centro | setup 4 | p. 3 | "Embaralhe cada baralho de cartas de Era" |
| Descarte no centro | setup 4 | p. 3 (figura) | rótulo "Descarte" na figura |
| Tabuleiro aleatório, lado à escolha, Dia nas primeiras, pode escolher | setup 5 | p. 3 | "escolhendo seu lado de preferência"; "recomendado usar o lado do Dia" |
| 3 Moedas de valor 1, reserva | setup 6 | p. 3 | "Pegue 3 Moedas (no valor de 1)" |
| Fichas no centro | setup 7 | p. 3 | passo 4 |
| Resto à caixa; caderneta e cartilhas à mão | setup 8, [!edicao] | p. 3 e 8 | [interpretada], ver seção 3 |
| Sem primeiro jogador | setup 9 | p. 4 | "todos jogam simultaneamente" (o manual não fala em primeiro jogador) |
| 7 cartas por jogador no início da Era | setup 10, etapa 3 passo 6 | p. 4 | "distribua 7 cartas aleatórias" |
| 3 Eras, pontos no fim | 4min, etapa 1 | p. 4 | "Pontos de vitória são contabilizados no fim da Era III" |
| Sete cores e funções | etapa 1, entender | p. 2 | lista de "Cartas Marrons" a "Cartas Roxas" |
| Maravilha 2, 3 ou 4 estágios, recurso inicial | etapa 1, entender | p. 2 | "dois, três ou quatro estágios" |
| Turno: escolher, jogar, passar | 4min, etapa 1 | p. 4 | "1. Escolher uma carta 2. Jogar a carta 3. Passar a sua mão" |
| Uma única ação entre A, B, C | 4min, etapa 1 | p. 4 | "uma única ação" |
| Construir: carta virada para cima acima do tabuleiro | etapa 1 | p. 4 | "coloque-a virada para cima acima do seu tabuleiro" |
| Nunca duas com o mesmo nome | etapa 1 [!atencao], avaliação 3 | p. 4 e 6 | "mesmo nome na sua Cidade" |
| Arrumação por cor | etapa 1 | p. 4 | quadro "Disposição de cartas" |
| Estágio: pagar só o custo do tabuleiro; carta virada para baixo, metade coberta | etapa 1 | p. 4 | "pague apenas o custo"; "metade dela fique coberta" |
| Qualquer carta serve; sem outro uso | etapa 1, sua vez | p. 4 | "não terá nenhuma outra utilidade" |
| Estágios da esquerda para a direita; qualquer Era; opcional | etapa 1 [!mais], sua vez | p. 4 | "da esquerda para a direita" (quebra de linha no texto; conferido na imagem); "opcional" |
| Vender: descarte virado para baixo, 3 Moedas | 4min, etapa 1 | p. 4 | "pegue 3 Moedas da reserva" |
| Passagem: esquerda (I, III), direita (II) | 4min, etapa 1 | p. 5 | "vizinho da esquerda (durante as Eras I e III)" |
| Sexto turno: 2 cartas, descarta 1 sem Moedas | etapa 1 | p. 5 | "A carta descartada não lhe concede Moedas" |
| Custos: grátis, 1 Moeda, recursos, encadeamento | etapa 2 | p. 6 | "Há diferentes tipos de custo" |
| Recurso por símbolo, uma vez por turno, nunca perdido | etapa 2, sua vez | p. 6 | "Cada símbolo de recurso pode ser usado apenas uma vez por turno"; "nunca são perdidos" |
| Produtores: inicial, Cinzas, Marrons, Amarelas, estágios | etapa 2 | p. 6 | "recursos de cartas Cinzas, Marrons e Amarelas" |
| Exemplo Quartel/Scriptorium/Torre de Vigia | etapa 2, figura | p. 6 | texto do exemplo |
| Comprar: 2 Moedas ao dono; ele continua usando | etapa 2 | p. 7 | "pague 2 Moedas ao dono do recurso" |
| Uma vez por turno por símbolo; usar no turno | etapa 2, sua vez | p. 7 | "apenas uma vez por turno pelo mesmo jogador" |
| Só inicial, Marrons, Cinzas; não Amarelas nem estágios | etapa 2 [!atencao], complete, avaliação 4 | p. 7 | "É impossível comprar recursos produzidos pelas cartas Amarelas ou estágios" |
| Carta de escolha: comprador escolhe | [!mais] | p. 7 | "independentemente do que o seu vizinho tiver escolhido" |
| Moedas do início do turno; não usar as recebidas | etapa 2 [!atencao], [!edicao] | p. 7 | "no início do seu turno" ([interpretada], seção 3) |
| Não comprar de Estrutura construída no mesmo turno | [!mais] | p. 7 | "nesse mesmo turno" |
| Não se bloqueia; os dois vizinhos podem comprar o mesmo | [!mais] | p. 7 | "Ambos os seus vizinhos podem comprar o mesmo recurso" |
| Comércio a 1 Moeda | [!mais] | cartilha em inglês, p. 1 | "for 1 Coin instead of 2" (o tutorial não afirma em que cor está o símbolo) |
| Encadeamento a partir da Era II; sem símbolo, pagar; dois símbolos | etapa 2 | p. 7 | "Começando na Era II"; "dois encadeamentos" |
| Teatro libera Jardins | figura | p. 7 | exemplo |
| Conflito: força das cartas e do tabuleiro; igual, menor, maior | etapa 3 | p. 5 | "Se as suas forças militares forem iguais" |
| Fichas +1, +3, +5, -1 | setup, etapa 3 | p. 2 e 5 | lista de fichas |
| Exemplo 4 contra 5 e 2 | etapa 3 | p. 5 | exemplo; as forças das cartas conferidas na imagem (5 = 2+2+1; 4 = 1+1+2; 2) |
| Fim após conflito da Era III; empate: Tesouro; depois, divide | 4min, etapa 3, sua vez | p. 8 | "o jogador com o maior Tesouro vence"; "compartilham a vitória" |
| Sete categorias | etapa 3 | p. 8 | itens 1 a 7 |
| Tesouro: 1 ponto por 3 Moedas | treino c | p. 8 | "conjunto completo de 3 Moedas" |
| Conflitos podem dar negativo | etapa 3 | p. 8 | "o total pode ser um número negativo" |
| Ciência: 1, 4, 9, 16, 25, 36; trio = 7; símbolos de estágios contam | etapa 3, treino | p. 8 | tabela; "receba 7 pontos de vitória"; "e em estágios construídos" |
| Alex: 55 | etapa 3 | p. 8 | imagem da caderneta: 10, 3, 6, 9, 2, 21, 4, 55 |
| Efeitos de estágio (sétima carta, descarte, grátis primeira/última) | [!mais] | cartilha em inglês, p. 2 | frases lidas; o tutorial não diz qual tabuleiro tem qual |
| 3 a 7 jogadores, 10+, 30 min | JSON | página da Repos | "3-7", "10+", "30min." |

Regras da base sem lugar no tutorial: o símbolo para daltônicos aparece só na legenda da figura das cartas; a definição de "x Moedas" como valor total (p. 2) não entra no texto porque o tutorial sempre fala em valor; a recomendação de jogar um de cada vez na primeira partida (p. 4) saiu no corte de tamanho.

## 3. Regras classificadas como [interpretada] ou [lacuna]

- **[interpretada] Caderneta e cartilhas à mão.** O passo 5 manda devolver "todos os outros componentes", mas a p. 8 usa a caderneta e a cartilha. O tutorial manda deixá-las à mão e avisa em `[!edicao]`.
- **[interpretada] "No início do seu turno".** Com jogo simultâneo, lido como "com as Moedas que você tinha antes de revelar". Aviso em `[!edicao]`.
- **[interpretada] Nomes dos símbolos de ciência.** O manual mostra só desenhos; o tutorial usa "tipos" e A, B, C. Aviso em `[!edicao]`.
- **[interpretada] Legenda da figura de recursos.** "2 Pedras" vem do texto; que uma venha da Canteira e a outra do recurso inicial é leitura da imagem.
- **[lacuna] Mais de 6 símbolos de ciência iguais.** O manual para em 6; o tutorial não afirma nada além.
- **[lacuna] FAQ e errata.** Não acessados.

## 4. Contas refeitas

Script `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/contas7w.py`, saída conferida contra o texto:

- Roxas: 3 a 7 jogadores dão 5, 6, 7, 8, 9 (tabela e pergunta da montagem).
- Mãos: 7, 6, 5, 4, 3, 2 (exemplo do terceiro turno: recebe 5, passa 4).
- Compra: Tesouro 3 - 2 = 1 (exemplo do estágio); 4 - 2 - 2 = 0 (treino c).
- Militar: exemplo da p. 5, -1 + 3 = +2; três Eras (+2, +2, -2) = 2 (complete); 5 contra 5 e 3 na Era III = +5 (sua vez); 2 contra 3 e 0 na Era I = -1 e +1 (avaliação 5).
- Ciência: 3/2/1 = 21; 2/2/2 = 26; 4/1/0 = 17; 3/3/0 = 18.
- Tesouro: 8 Moedas = 2 pontos; 10 = 3.
- Alex: 10 + 3 + 6 + 9 + 2 + 21 + 4 = 55.

Toda jogada dos exemplos é legal pelo manual: o estágio de 2 Minérios usa o custo da figura da p. 6; a compra é de carta Marrom do vizinho; a carta repetida vai para estágio ou venda.

## 5. Figuras

Dez recortes do manual em `como-jogar/7-wonders/figuras/`, só a parte gráfica (com os rótulos do próprio desenho), webp, até 1000 px de largura:

| Arquivo | Página | Onde entra |
|---|---|---|
| setup-cartas.webp | p. 2 | setup, antes do passo 1 (frente e verso; número mínimo de jogadores) |
| setup-maravilha.webp | p. 2 | setup, passo 5 |
| setup-moedas.webp | p. 2 | setup, passo 6 |
| setup-fichas.webp | p. 2 | setup, passo 7 |
| setup-mesa.webp | p. 3 | setup, depois do passo 10 (mesa de 5 jogadores) |
| estagio.webp | p. 4 | etapa 1 |
| recursos.webp | p. 6 | etapa 2 |
| encadeamento.webp | p. 7 | etapa 2 |
| militar.webp | p. 5 | etapa 3 |
| pontuacao.webp | p. 8 | etapa 3 |

Passos da montagem sem figura própria, porque o manual não os ilustra separadamente: passo 3 (Roxas), passo 4 (embaralhar), passos 8 a 10 (devolver, ninguém começa, distribuir). A figura da mesa montada cobre o resultado dos passos 4 a 7. Nenhuma foto da editora foi usada; a pasta `fotos/` não foi criada (outro agente cuida). Quando `fotos/mesa-1.webp` ou `componentes-1.webp` existir, a seção de montagem pode recebê-la com o crédito de `fotos/fontes.json`.

Vídeo: "7 Wonders - Como Jogar", Romir Play House (oEmbed), de 2016, primeira edição. O tutorial avisa isso. Não há vídeo do Duque Board Games sobre o jogo base.

## 6. Portões

- Travessão e meia-risca: 0 no tutorial e no dossiê.
- `tools/vicios.py`: 0 aviso.
- Ordem das seções conforme o BRIEF; conferida com `tools/como_jogar_md.pagina()` em memória (sem gravar nada): 12 seções, 26 perguntas reconhecidas como questionário, vídeo reconhecido, "Leitura do essencial: cerca de 9 min".
- Extensão: cerca de 6.080 palavras contadas como palavras de texto (sem as legendas das figuras; `wc -w` com a marcação dá cerca de 7.000). No limite de cima do alvo do pedido (4.500 a 6.000).

## 7. O que ficou fraco

- A fonte é o português da Repos, não o folheto da caixa da Galápagos; nomes impressos na caixa brasileira podem divergir.
- Os efeitos de cartas Amarelas, Roxas e de estágios são citados de forma genérica, a partir da cartilha em inglês; o tutorial não ensina a ler cada símbolo.
- O vídeo é da primeira edição.
- O tutorial ficou no teto da extensão pedida; a etapa 2 é a mais densa.
- Nenhum teste com leitor; esta é uma autoverificação do redator, sem auditoria independente ainda.
