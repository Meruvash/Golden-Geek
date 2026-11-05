# Dossiê: Como Jogar The Mind

Entrega 1 da linha COMO JOGAR para *The Mind* (jogo base, edição brasileira da Galápagos, TMI001). Produzido em 05/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; jogo leve: 3.500 a 4.500 palavras e 3 etapas; exercícios de múltipla escolha; essencial à vista e `[!mais]`; seção de montagem com figura do manual em cada passo; figuras do manual e vídeo). Rotina diária de 05/11/2026.

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. The Mind, de Wolfgang Warsch (Nürnberger-Spielkarten-Verlag); no Brasil, Galápagos, SKU TMI001.
- **Resenha no site:** existem a pasta `the-mind/` (com `fotos/fontes.json`, 4 fotos aprovadas da Pandasaurus) e `conteudo/the-mind.json`; logo `"resenha": "the-mind"`. O conversor usa essas fotos sozinho (`../../the-mind/fotos/...`, conferido na prévia gerada no scratchpad).
- **Procura (05/11/2026):** autocompletar do Google (`client=firefox&hl=pt-BR`, "como jogar the mind"): como jogar the mind, the mind cartas, the mind extreme, the mind galapagos. YouTube (`client=youtube&ds=yt`): como jogar the mind, como jogar the mind extreme. A busca por "extreme" é respondida no aviso do vídeo e nas Situações especiais (o Extreme é outro jogo).
- **Complexidade:** um só tipo de ação (jogar a carta mais baixa), erro com perda de vida, estrela ninja, recompensas por nível e modo cego. Jogo leve: três etapas.

## 2. Fontes

| Fonte | Arquivo | URL | Data |
|---|---|---|---|
| **Regras da edição brasileira** (Galápagos; arquivo `TMI001_regras_v1.0.pdf`; título interno "The Mind_regras_v1.0_11-23"; criado no Adobe Illustrator 28.0 em 09/11/2023). 2 páginas (frente e verso de uma folha estreita, 271,6 x 676 pt), 1,87 MB | `<scratchpad>/d1105/the-mind/dl/x2249/TMI001_regras_v1.0.pdf`; páginas renderizadas em `img/p-1.png`, `img/p-2.png` (300 dpi) e `img/hi-1.png`, `img/hi-2.png` (600 dpi); **texto transcrito por página em `txt/p1.txt` e `txt/p2.txt`** (juntos em `txt/tmi001.txt`) | Biblioteca de downloads da Asmodee Brasil, item 2249 "TMI001 - The Mind - SKU: TMI001", etiqueta Regras; arquivo https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2249&tagId=2&group=b2c (ZIP, HTTP 200, sem login) | 05/11/2026 |
| Regras de The Mind Extreme (Galápagos, TMI102, "The Mind Extreme_regras_v1.0_10-23.pdf", 3 folhas, modificado em 16/01/2024). Usado só para descrever o vídeo e como apoio de leitura em dois trechos ambíguos; **não é fonte de regra do jogo base** | `dl/x2250/`; trechos transcritos em `txt/extreme_trechos.txt` | mesma API, `id=2250` | 05/11/2026 |
| Foto oficial dos componentes (Pandasaurus, edição dos EUA, já aprovada em `the-mind/fotos/componentes-1.webp`) | no repositório | https://pandasaurusgames.com/products/the-mind | 27/10/2026 (baixada pela resenha) |
| **Vídeo** "THE MIND: Extreme - Regras + review!", Duque Board Games (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=kC5wllRwjJ8 | 05/11/2026 |

**Como os arquivos foram obtidos.** `curl` com User-Agent `EliteBoardgamersBot/1.0 (robo)`. Busca na API pública da biblioteca (`library-download/store/search?term=the mind`): 6 itens; dois de The Mind base (1098 e 2249) e dois do Extreme (2250 e 2487). O item 1098 respondeu 404 ("The specified blob does not exist") para a etiqueta Regras; o 2249 entregou o ZIP com o PDF. Não acessei `www.asmodee.com.br` (responde Access Denied a robô; não contornei). O `robots.txt` da API devolve 404 (sem regras).

**PDF sem texto.** O PDF foi exportado do Illustrator com as letras convertidas em curvas: `pdftotext` devolve vazio e `pdffonts` não lista fonte. Não há OCR instalado. O texto foi **transcrito à mão a partir das imagens das páginas** (300 dpi, lidas em quatro faixas por página), com os exemplos em azul e o quadro final, impresso de cabeça para baixo, lido depois de girar a imagem. A transcrição é a base de toda citação e conferência. Risco: erro de transcrição; o auditor deve comparar `txt/p1.txt` e `txt/p2.txt` com `img/p-1.png` e `img/p-2.png`.

**Paginação.** A folha não imprime número de página. p. 1: título, ficha (2 a 4 jogadores, 8+, 20 min), visão geral, componentes, Preparação, quadro "Importante!", Como jogar, exemplo do nível 1. p. 2: Nível seguinte, exemplo do nível 2, Recompensa, Erro, Uso da estrela ninja, Final do jogo e Novo desafio, quadro "Como funciona o jogo?" de cabeça para baixo.

**Não obtido:** manual em inglês da Pandasaurus (o link da página do produto é uma pasta do Dropbox que pede login; não contornado); site da NSV (`www.nsv.de`) respondeu 403 inclusive ao `robots.txt` (não contornado). Não há FAQ ou errata na biblioteca. Nada foi tirado de fórum, resenha ou vídeo.

## 3. Glossário (edição brasileira, TMI001)

| Termo no manual | Original (não conferido no manual em inglês, inacessível) | Página | Explicação |
|---|---|---|---|
| equipe | team | p. 1 | Todos os jogadores, que ganham ou perdem juntos |
| nível | level | p. 1 | Uma rodada; no nível N, cada um recebe N cartas |
| cartas com números (cartas de número) | number cards | p. 1 e 2 | As 100 cartas de 1 a 100 |
| cartas de nível ("12 níveis") | level cards | p. 1 | Cartas de 1 a 12; indicam o nível e a recompensa |
| vida (carta de vida) | life | p. 1 e 2 | Cada erro tira uma; sem a última, a equipe perde |
| estrela ninja | throwing star | p. 1 e 2 | Usada com acordo de todos: cada um descarta a carta mais baixa |
| pilha (no centro da mesa) | | p. 1 | Onde as cartas vão em ordem crescente, viradas para cima |
| Concentrem-se | | p. 1 | Todos com a palma da mão na mesa antes de começar |
| "Pausa" | | p. 1 e 2 | Parada para reconcentrar; o manual escreve "Pausa!" na regra e "Pausa" no exemplo. O tutorial usa "Pausa" sem exclamação |
| recompensa | reward | p. 2 | Vida ou estrela ninja ao vencer os níveis 2, 3, 5, 6, 8 e 9 |
| modo cego / Novo desafio | | p. 2 | Rejogar os níveis com as cartas viradas para baixo depois de vencer todos |

## 4. Base de regras

Classificação: V = verificada (lida nesta sessão), I = interpretada (motivo dado), L = lacuna.

| # | Regra | Fonte e frase lida | Cl. | Depende de |
|---|---|---|---|---|
| R1 | 2 a 4 jogadores, 8+, cerca de 20 min | p. 1 "Jogadores: 2 a 4", "Duração: 20 min. aprox." | V | |
| R2 | Os jogadores formam uma equipe | p. 1 "formarão uma equipe" | V | |
| R3 | Nível 1: 1 carta cada; nível 2: 2; e assim por diante | p. 1 "cada um recebe 2 cartas, e assim sucessivamente"; p. 2 "uma a mais do que receberam no nível anterior" | V | |
| R4 | Em cada nível, as cartas vão ao centro em ordem crescente, numa pilha virada para cima | p. 1 "em ordem crescente, formando, assim, uma pilha de cartas viradas para cima" | V | R3 |
| R5 | Componentes: 100 cartas (1 a 100), 12 níveis, 5 vidas, 3 estrelas ninja | p. 1, quadro de componentes | V | |
| R6 | Equipe recebe vidas e estrelas conforme a tabela; abertas sobre a mesa | p. 1 "elas serão colocadas abertas sobre a mesa" | V | R5 |
| R7 | As restantes ficam de lado e podem ser usadas depois | p. 1 "As cartas restantes devem ser deixadas de lado: elas podem ter de ser utilizadas depois" | V | R6 |
| R8 | Pilha de níveis crescente, virada para cima, nível 1 no topo | p. 1 "o nível 1 deve ficar no topo da pilha" | V | |
| R9 | "e outra [pilha] com as estrelas ninja": a das estrelas de lado | p. 1; p. 2 "da pilha que havia sido deixada de lado"; Extreme TMI102 diz "As vidas e estrelas ninjas restantes devem ser deixadas de lado" | I (frase ambígua; leitura apoiada na p. 2) | R7 |
| R10 | Níveis não usados voltam à caixa | p. 1 "devem ser retornadas à caixa" | V | R8 |
| R11 | Tabela: 2 jog. níveis 1 a 12, 2 vidas, 1 estrela; 3 jog. 1 a 10, 3, 1; 4 jog. 1 a 8, 4, 1 | p. 1 | V | |
| R12 | Embaralhar as 100 cartas, 1 para cada no nível 1; ninguém vê as cartas dos outros; resto virado para baixo | p. 1 "As cartas restantes formarão uma pilha virada para baixo" | V | |
| R13 | Concentração: quem está pronto põe a palma na mesa; com todos prontos, retiram a mão e o jogo começa | p. 1 "Concentrem-se" | V | |
| R14 | "Pausa" a qualquer momento: todos põem uma mão na mesa, concentram, retiram e voltam a jogar | p. 1 "Basta dizer \"Pausa!\" e o jogo para" | V | R13 |
| R15 | Cartas uma a uma; 36 e 37 na mesma mão: imediatamente, em ordem, uma por vez | p. 1 "mas uma por vez!" | V | R4 |
| R16 | Não existe ordem de jogo: quem julga ter a mais baixa a coloca | p. 1 "Não existe uma ordem de jogo" | V | |
| R17 | Proibido revelar ou mostrar números, qualquer acordo e sinais secretos | p. 1 "nem sequer usar sinais secretos" | V | |
| R18 | Todas as cartas na ordem correta: nível vencido | p. 1 "eles vencem aquele nível" | V | R4 |
| R19 | Nível seguinte: carta do nível vencido na caixa; 100 cartas reembaralhadas; nova quantidade; recolher com uma mão, outra na mesa | p. 2 "a carta do nível que acabam de vencer é colocada na caixa" | V | R18 |
| R20 | A carta jogada é sempre a mais baixa da mão (21, 56, 93: primeiro a 21) | p. 2 "Importante" | V | |
| R21 | Recompensa: nível 2 dá estrela ninja; 3, 5, 6, 8 e 9 dão vida ou estrela, conforme a carta | p. 2 "A recompensa será especificada na própria carta daquele nível" | V | R7 |
| R22 | Máximo de 5 vidas e 3 estrelas | p. 2 "Nota" | V | |
| R23 | Recompensa acima do máximo não é recebida | manual não diz; a caixa só tem 5 e 3 (p. 1) | I | R22 |
| R24 | Erro: quem tem carta mais baixa que a jogada interrompe imediatamente; equipe perde 1 vida (carta de vida de lado); todas as cartas inferiores à jogada são descartadas; equipe se concentra e retorna ao nível atual | p. 2 "retorna ao nível atual (não começa um novo!)" | V | R4 |
| R25 | Um erro custa 1 vida mesmo com vários jogadores abaixo | p. 2, exemplo (Danilo 26 e Felipe 30: "perdem uma vida"); TMI102 confirma "independentemente de quantas cartas" | V (pelo exemplo do manual base) | R24 |
| R26 | Estrela ninja: qualquer jogador propõe levantando a mão; se todos concordam, cada um descarta a carta mais baixa, virada para cima; uma estrela vai para o lado; reconcentrar e seguir | p. 2 "Uso da estrela ninja" | V | |
| R27 | Jogador sem cartas não descarta nada com a estrela | manual não diz | I | R26 |
| R28 | Vencer todos os níveis: vitória; perder a última vida: derrota | p. 2 "Final do jogo" | V | |
| R29 | Modo cego: depois de vencer tudo, volta ao nível 1 com vidas e estrelas que sobraram; cartas viradas para baixo; no fim do nível, vira e confere; erro custa uma vida; demais regras mantidas | p. 2 "Novo desafio" | V | R28 |
| R30 | Modo cego: dois erros no mesmo nível custam uma vida | p. 2 diz "perde uma vida"; não trata de vários erros (no Extreme, cada erro custa uma) | I (letra do manual base; avisado no tutorial) | R29 |
| R31 | Nível em que ninguém fica com cartas depois de erro ou estrela: nível vencido | manual não diz | I | R18, R24, R26 |
| R32 | Duas cartas jogadas quase juntas | manual não diz | L (o tutorial manda a mesa combinar antes) | R15 |
| R33 | Recomendação: experientes jogam a primeira partida sem ler o quadro final | p. 1 quadro "Importante!" | V | |
| R34 | Quadro final: sincronia pela noção de tempo; carta mais baixa, mais cedo; não é contar segundos | p. 2 (impresso de cabeça para baixo) | V | |
| R35 | Erro percebido tarde (depois de outras cartas) | manual não diz; manda interromper "imediatamente" | L (não entrou no tutorial final; registrado aqui) | R24 |

Recompensa de cada nível: a foto oficial da Pandasaurus (`the-mind/fotos/componentes-1.webp`) mostra o símbolo de estrela no nível 5 e de vida no nível 6 da edição dos EUA. Como não é a carta da caixa brasileira nem o manual, o tutorial não lista nível a nível: manda ler o símbolo da carta, como o manual (p. 2).

## 5. Ambiguidades e escolhas

- R9 ("outra com as estrelas ninja"): lida como a pilha das estrelas de lado. Apoio: p. 2 fala em pegar a estrela "da pilha que havia sido deixada de lado". No tutorial, a montagem já diz isso sem citar a frase ambígua.
- R23, R27, R30, R31: em blocos `[!edicao]` com "o guia lê", nunca como regra do manual.
- "Pausa" sem exclamação: o `checar_comece.py` avisa exclamação no texto, e o próprio exemplo do manual escreve "Pausa" (p. 2).
- Quem começa: o manual não tem primeiro jogador; o tutorial diz "ninguém" e remete a R16.

## 6. Diferenças entre edições

Só a edição brasileira TMI001 foi lida. O manual em inglês não estava acessível (Dropbox com login; NSV com 403). The Mind Extreme é outro jogo (cartas brancas e vermelhas, duas pilhas, níveis "com cartas fechadas"); o tutorial avisa isso no vídeo e nas Situações especiais.

## 7. Erros comuns (sem fonte de comunidade)

Os três do bloco "Os três erros mais caros" vêm dos destaques do próprio manual ("Muito importante", "mas uma por vez!", "Importante: a carta a ser jogada deve ser sempre a mais baixa"), não de fórum.

## 8. Plano instrucional e decisões de carga

- Classes de tarefa: (1) montar e jogar um nível com 1 carta (Comece em 4 minutos); (2) um nível com várias cartas por mão (etapa 1); (3) o nível com erro e estrela ninja (etapa 2); (4) a partida inteira, de nível em nível, até a vitória, a derrota ou o modo cego (etapa 3).
- Apoio decrescente em cada etapa: exemplo resolvido (os exemplos do manual sempre que existem), complete, sua vez.
- Adiado: erro e estrela (etapa 2), recompensas e modo cego (etapa 3). O quadro "segredo do jogo" fica num `[!entender]` recolhido, com aviso de spoiler, por respeito à recomendação do manual (R33).

## 9. Extensão

`wc -w` do tutorial: 4.792 (com marcação, opções e explicações); 4.501 pela contagem `\w+` sem URLs. Dentro do alvo de 3.500 a 4.500 para jogo leve. A primeira versão tinha 5.950 (`wc`); foram cortados um exemplo resolvido da etapa 1 e um da etapa 2, duas perguntas da avaliação, um aviso repetido sobre comunicação, um `[!dica]` e três blocos das Situações especiais (mesa travada, pilha das estrelas, erro percebido tarde), e a seção 0 foi encurtada.

## 10. Contas

Script: `<scratchpad>/d1105/the-mind/scripts/contas.py` (rodado em 05/11/2026). Resultados usados no texto:

- Tabela: 2 jog. 3 vidas e 2 estrelas de lado, nenhum nível na caixa; 3 jog. 2 e 2, níveis 11 e 12; 4 jog. 1 e 2, níveis 9 a 12. Pilha no nível 1: 98, 97, 96.
- Comece, complete (Ana 12/60, Bruno 33/41, Carla 5/90): ordem 5, 12, 33, 41, 60, 90.
- Etapa 1, exemplo do manual (nível 2): 7, 11, 35, 47, 81, 94 em ordem.
- Etapa 1, complete (2 jog., nível 4; você 6/39/40/93, parceiro 15/58/61/77): depois de 6 e 15, vêm 39 e 40, suas.
- Etapa 2, complete (Bruno joga 60; Ana 14/75, Carla 58/80, Davi 66/90): descartes 14 e 58; 1 vida.
- Etapa 2, estrela (Ana 44/70/91, Bruno 12/50/83, Carla 27/61/99): descartes 44, 12, 27.
- Etapa 3: partida a três, 3 vidas, erro no nível 1 = 2 vidas; nível 2 vencido = 2 estrelas; nível 3 = 9 cartas. 4 jog. no nível 6 = 24 cartas. 2 jog. com dois erros = 0 vidas, derrota.

## 11. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/the-mind/tutorial.md`: "seção Comece a jogar dentro da diretriz", sem aviso (o aviso de exclamação da primeira versão foi resolvido).
- Travessão e meia-risca: 0.
- `tools/vicios.py` (lista `VICIOS` aplicada ao texto): 0 ocorrências.
- Prévia gerada com `tools/como_jogar_md.pagina` no scratchpad (`previa.html`), sem tocar no build: 7 figuras do manual, fotos da resenha em rodízio, vídeo; "Leitura do essencial: cerca de 5 min".
- Legibilidade: não medida (o `legibilidade.py` é de outro repositório).

## 12. Figuras e vídeo

Recortes da ilustração do manual (só a parte gráfica), renderizados a 600 dpi, `.webp` qualidade 80, em `como-jogar/the-mind/figuras/`. As ilustrações do manual são imagens de baixa resolução embutidas no PDF (as cartas aparecem pixeladas no original).

| Arquivo | Página | Mostra | Onde entra |
|---|---|---|---|
| `componentes.webp` | 1 | Cartas 1, 23 e 100, três cartas de nível, vida, estrela ninja | Montagem, componentes |
| `setup-1-vidas-estrela.webp` | 1 | 3 vidas e 1 estrela da ilustração de preparação | Passo 1 |
| `setup-2-niveis.webp` | 1 | Pilha de níveis com a legenda "Níveis de 1 a 10" | Passo 3 |
| `setup-3-cartas.webp` | 1 | Três cartas com números (28, 55 e uma deitada) | Passos 5 e 6 |
| `setup-completa.webp` | 1 | A ilustração de preparação inteira | Fim dos passos |
| `nivel1-jogada.webp` | 1 | Pilha de níveis com sinal de certo; 17, 28 e 55 empilhadas | Comece em 4 minutos |
| `recompensa.webp` | 2 | Carta do nível 2 com o símbolo de recompensa destacado | Etapa 3 |

Passos 2 (resto de lado) e 4 (níveis na caixa) não têm ilustração no manual.

Vídeo: busca no canal Duque Board Games (`/@DuqueBoardgames/search?query=the mind`, `Accept-Language: pt-BR`). Não há vídeo da caixa básica; há "THE MIND: Extreme - Regras + review!" (oEmbed: autor "Duque Board Games"). Busca no canal `@GalapagosJogos` sem resultado de The Mind. Usado com aviso de que é o Extreme e do que muda, conferido no manual TMI102. Nenhum quadro baixado; sem vídeo dentro das etapas.

## 13. Dados do `conteudo/como-jogar/the-mind.json`

Jogadores, idade e duração: p. 1 do manual. Edição: "Edição Galápagos" (logo e site na p. 2 do manual; arquivo na biblioteca da Asmodee Brasil). `resenha`: "the-mind" (pasta e JSON existem). `etapas`: 3. `leitura_min`: 22 (4.501 palavras a cerca de 200 por minuto; o topo da página mostra separadamente a leitura do essencial). `publicar`: false até a auditoria independente.
