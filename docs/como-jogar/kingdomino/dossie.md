# Dossiê: Como Jogar Kingdomino

Rotina diária de 06/11/2026, concluída em 08/11/2026 (o trabalho parou por limite de uso e foi retomado). Jogo base, Blue Orange; no Brasil, PaperGames. O site tem resenha de Dragomino (/dragomino/), que é outro jogo: `"resenha": null`.

## 1. Jogo e procura real

- Autocomplete do Google (`client=firefox&hl=pt-BR`, "como jogar kingdomino", 08/11/2026): "como jogar kingdomino", "como jogar kingdomino origins".
- Autocomplete do YouTube (`client=youtube&ds=yt`, "kingdomino", 08/11/2026): "kingdomino como jogar" em primeiro lugar, seguido de "kingdomino", "kingdomino origins", "kingdomino gameplay", "kingdomino duel"...
- Editora no Brasil: **PaperGames** (página https://papergames.com.br/kingdomino/, SKU PPG-J105, arte de Pauline Detraz, registro INMETRO 009098/2024). Não é Devir nem Galápagos: a busca na biblioteca da Asmodee Brasil (`library-download/store/search?term=kingdomino`) devolveu `{"total":0,"items":[]}` em 06/11/2026.

## 2. Fontes

| Fonte | Arquivo local | Origem | Data |
|---|---|---|---|
| **Manual oficial multilíngue da Blue Orange**, "KINGDOMINO_rules_ML.pdf" (© 2016 Blue Orange; criado no InDesign CS6 em 21/02/2017), 28 páginas quadradas (538,6 x 538,6 pt), 7.363.649 bytes, sha256 começa com 226fa4098f4348ba. Inglês p. 2 a 4; francês p. 5 a 7; alemão p. 8 a 10; italiano p. 11 a 13; espanhol p. 14 a 16; **português de Portugal p. 17 a 19**; neerlandês p. 20 a 22; russo p. 23 a 25; créditos p. 26; tabela de terrenos p. 28 (sem número impresso). As páginas impressas coincidem com as do PDF. | `<scratchpad>/d1106/kingdomino/dl/ml/KINGDOMINO_rules_ML.pdf`; texto por página em `txt/ml-p1.txt` a `txt/ml-p28.txt` e junto em `txt/kingdomino_rules_ML_por_pagina.txt`; páginas renderizadas em `img/` | https://blueorangegames.eu/wp-content/uploads/2017/04/KINGDOMINO_rules_ML.pdf (link "Game Rules" de https://blueorangegames.eu/en/games/kingdomino/), HTTP 200 sem login | 08/11/2026 |
| Página do produto da PaperGames | `dl/page.html` | https://papergames.com.br/kingdomino/ | 06/11/2026 |
| Página da promo "As Últimas Coroas" (PaperGames) | `dl/pg_kingdomino-as-ultimas-coroas.html` | https://papergames.com.br/kingdomino-as-ultimas-coroas/ | 08/11/2026 |
| Vídeo "Covil dos Jogos - Review e Gameplay Kingdomino" (título e canal pelo oEmbed) | não baixado | https://www.youtube.com/watch?v=X7BaL2TkF9k (link da própria página da PaperGames) | 08/11/2026 |

**Manual brasileiro: não acessível.** A página da PaperGames liga "Baixe o manual de regras" a `https://ppgam.es/kingdomino-regras`, que redireciona (301) para `https://1drv.ms/b/s!AuQicI0lvATJrNgZ3iedZflGSukBkw?e=DeszGa` (OneDrive, pasta "PaperGames/site/regras"). A página do OneDrive é um aplicativo em JavaScript; a API pública de compartilhamento (`api.onedrive.com/v1.0/shares/u!.../root/content`) respondeu **401 unauthenticated**, e o link direto de download (`onedrive.live.com/download?...`) redirecionou para **login.live.com**. Exige login: não contornei. O mesmo vale para o manual da variante de 2 caixas (`ppgam.es/kingdomino-regras-variante`). Pela decisão do editor (31/10/2026), segui com o manual oficial em inglês, com o aviso ao leitor na linha 3 do tutorial.

**Como os arquivos foram obtidos.** `curl` com User-Agent `EliteBoardgamersBot/1.0 (robo)`. `robots.txt` de papergames.com.br e de blueorangegames.eu: só bloqueiam `wp-admin` e carrinho; www.blueorangegames.com não tem robots.txt (devolve a página inicial). Nenhum bloqueio contornado.

**Por que o inglês e não o português de Portugal como base.** O BRIEF manda, sem manual brasileiro, usar o manual oficial em inglês. O livreto é o mesmo arquivo e traz o português de Portugal (p. 17 a 19), usado para nomes de regras opcionais e para comparação; o francês (p. 5 a 7), língua da editora, resolveu duas ambiguidades do inglês (sorteio dos reis e última rodada) e uma terceira com o alemão (desempate).

**FAQ ou errata oficial:** não encontrada na página da Blue Orange Europe nem na da PaperGames.

**Edição.** O manual é da primeira edição (2016, arte de Cyril Bouquet). A caixa brasileira atual tem arte nova (Pauline Detraz) e a página da PaperGames lista os mesmos componentes: 48 peças de paisagem, 4 peças de área inicial, 4 castelos, 8 reis de madeira (conferido). Não li as regras da edição nova; o tutorial avisa isso. A nota "mesmas regras" no crédito da foto da edição nova vem do `fotos/fontes.json` do outro agente, não deste dossiê.

## 3. Glossário

Nomes da edição brasileira só onde a página da PaperGames os imprime; o resto é tradução deste guia, marcada.

| Termo do guia | Inglês (p.) | Português de Portugal (p.) | Origem do nome | Explicação |
|---|---|---|---|---|
| peça de paisagem | domino (2) | dominó (17) | PaperGames | Dois quadrados de terreno de um lado, número de 1 a 48 do outro |
| peça de área inicial | starting tile (2) | peça inicial (17) | PaperGames | Um quadrado; onde fica o castelo; aceita qualquer terreno |
| castelo | castle (2) | castelo (17) | PaperGames ("Castelos") | Marca o dono do reino |
| rei | king (2) | rei (17) | PaperGames ("Reis de Madeira") | Marca a peça escolhida e a ordem de jogo |
| monte de compra | draw pile (2) | monte da bisca (17) | guia | Peças em pé na bandeja da caixa |
| fila | line (2, 3) | fila (17, 18) | guia (= PT-PT) | Coluna de peças ao lado da caixa, em ordem crescente |
| rodada | turn (3) | ronda (18) | guia | Todos os reis jogam uma vez |
| reino | kingdom (2, 3) | reino (17, 18) | guia (= PT-PT) | A grade de 5 por 5 de cada jogador |
| território | territory (3) | território (18) | guia (= PT-PT) | Quadrados do mesmo terreno ligados de lado |
| quadrado | square (3) | quadrado (18) | guia (= PT-PT) | Metade de uma peça de paisagem |
| coroa | crown (3) | coroa (18) | guia (= PT-PT) | Multiplicador desenhado em alguns quadrados |
| descartar | discard (3) | descartar (18) | guia | Tirar do jogo a peça que não cabe |
| campo de trigo, lago, floresta, pastagem, pântano, montanha | wheat fields, lakes, forests... (2) | campos de trigo, lagos, florestas... (17) | guia, pela cor e desenho da p. 28; PaperGames cita florestas, lagos, montanhas, jardins e pastagens | "pântano" é [interpretada]: nenhuma fonte nomeia o terreno bege |
| Dinastia, O Reino Central, Harmonia, O Poderoso Duelo | Dynasty, The middle Kingdom, Harmony, The Mighty Duel (4) | idem (19) | PT-PT | Regras opcionais |

## 4. Base de regras

Marcação: `[EN p. N]`, `[FR p. N]`, `[PT p. N]`, `[DE p. N]`, `[PG]` (página da PaperGames). Classificação: `[verificada]`, `[interpretada]`, `[lacuna]`. Entre aspas, frase curta lida na fonte.

**Objetivo e componentes**
1. Construir um reino 5 x 5 ligando peças por terrenos iguais; mais terreno igual e mais coroas, mais pontos. [EN p. 2] "build your kingdom in a 5 x 5 grid" [verificada]
2. Componentes: 48 dominós, 4 peças iniciais, 4 castelos 3D (rosa, amarelo, verde, azul), 8 reis (2 de cada cor). [EN p. 2] "8 wooden kings in 4 colors"; [PG] mesma lista [verificada]
3. 2 a 4 jogadores, 8+, 15 min. [EN p. 2] ícones [verificada]; PaperGames: 7+ e 15 min [PG] [verificada]
4. Distribuição dos quadrados por terreno e coroas (tabela). [p. 28] "x 21", "x 16"... [verificada]; contas na seção 9.

**Preparação** (depende de 2)
5. Montar os castelos antes da primeira partida. [EN p. 2] "assemble the 4 small castles" [verificada]
6. Pôr a caixa como na figura. [EN p. 2] "Place the box of the game the following way" [verificada; o "como" é só a figura]
7. 2 jogadores: dois reis da cor; 3 e 4: um rei. [EN p. 2] "2 players game: two kings" [verificada]
8. Peça inicial à frente, face para cima, castelo em cima. [EN p. 2] "Place the tile, face up, in front of you" [verificada]
9. Embaralhar e pôr na caixa como monte, números para fora; 24 / 36 / 48 peças ao acaso. [EN p. 2] "use 24 randomly selected dominoes" [verificada]; as que sobram ficam de lado [FR p. 5] "que l'on laissera de côté" [verificada]
10. A: tirar tantas peças quantos reis em jogo (3 com 3; 4 com 2 ou 4), em ordem crescente, a mais baixa junto da caixa, depois virar. [EN p. 2] "the lowest number is always placed next to the box" [verificada]
11. B: só na primeira rodada, reis na mão de um jogador, sorteados um a um, cada um posto numa peça à escolha; um rei por peça; o último não escolhe. [EN p. 2] "Each domino tile can only have one king" [verificada]. Quem põe o rei: [FR p. 5] "Lorsque votre roi apparaît, placez-le" contra [EN p. 2] "It may not be your own colored king" e [PT p. 17] "pode ser que os jogadores não coloquem os seus próprios reis" [interpretada: segue FR]
12. C: com todos os reis postos, nova fila do monte, em ordem crescente, ao lado da fila dos reis, virada. [EN p. 2 e 3] "Place them in ascending order next to the line with the kings on" [verificada]
13. O que volta à caixa: peças fora da partida [verificada, regra 9]; reis, castelos e peças iniciais de cores sem jogador [lacuna; o guia diz "pelo que o guia entende"]

**Rodada** (depende de 10 a 12)
14. Ordem pela posição dos reis na fila; começa o rei na peça mais perto da caixa (número mais baixo). [EN p. 3] "the one with the lowest number" [verificada]
15. Ação 1: acrescentar ao reino a peça do seu rei; ação 2: escolher peça da nova fila pondo o rei nela. [EN p. 3] "Choose a new domino in the new line by placing their king on it" [verificada]
16. Depois o segundo rei, até o último; então nova fila. [EN p. 3] "Then form a new line of dominoes" [verificada]
17. 2 jogadores: ações 1 e 2 duas vezes, uma por rei. [EN p. 3] "once for each of their kings" [verificada]. Que cada rei joga na vez da sua posição (e não os dois seguidos) decorre da regra 14 [interpretada, com apoio de EN p. 3 "The playing order is determined by the position of the kings"]
18. 12 rodadas com 3 ou 4 jogadores; 6 com 2. [EN p. 3] "The game is played over 12 turns" [verificada]

**Encaixe** (depende de 15)
19. Ligar à peça inicial, que vale como curinga, ou a outra peça com pelo menos 1 terreno igual, só na horizontal ou vertical. [EN p. 3] "matching at least 1 of its terrains (horizontally or vertically only)" [verificada]
20. Outros lados podem tocar terrenos diferentes. [figura EN p. 3, terceiro exemplo] [interpretada]
21. A peça pode ficar deitada ou em pé. [figuras EN p. 2 e 3: peças nas duas posições] [verificada pela figura]
22. Tudo dentro de 5 x 5; peça que não pode ser encaixada é descartada, sem pontos. [EN p. 3] "All your dominoes must fit in a 5x5 grid", "You do not get points for discarded tiles" [verificada]
23. Descartar peça que caberia: [lacuna]; o guia lê que não se pode, pela condição "If you can't add a domino" [EN p. 3] [interpretada]
24. Depois de descartar, ainda se escolhe peça nova [lacuna; interpretada, ações separadas]

**Fim e pontuação**
25. Quando as últimas peças estão na fila, há uma última rodada; [FR p. 6] só com a ação 1 "en n'effectuant que l'action D 1". [EN p. 3] "one last turn" [verificada]
26. Reinos podem ficar incompletos. [EN p. 3] "Some kingdoms may not be complete" [verificada]
27. Território = quadrados do mesmo terreno ligados na horizontal ou vertical. [EN p. 3] [verificada]
28. Pontos = quadrados x coroas; várias coroas por território; sem coroa, 0. [EN p. 3 e 4] "multiply that number of squares by the number of crowns" [verificada]
29. Vários territórios do mesmo terreno contam à parte. [FR p. 6] "Il peut y avoir plusieurs domaines du même type de paysage" [verificada]
30. Castelo não pontua [interpretada: não é terreno; o exemplo da p. 4 soma 23 sem ele]
31. Somar territórios; maior total vence. [EN p. 4] [verificada]
32. Desempate: maior território (um só, com ou sem coroas); depois mais coroas; depois vitória dividida. [EN p. 4] "the player with the biggest territory"; [FR p. 7] "le domaine le plus étendu (peu importe que ce domaine possède des couronnes ou pas)"; [DE p. 10] "größten einzelnen Gebiet" [verificada nas três; o "um só" é explícito em FR e DE]
33. Exemplos do manual: floresta 7 x 3 = 21; lago 9 sem coroa = 0; reino da figura = 23. [EN p. 4] [verificada]

**Opcionais** [EN p. 4; nomes PT p. 19]
34. Dinastia: 3 partidas, soma. [verificada]
35. O Reino Central: +10 se o castelo está no centro. [verificada]; o que é "centro" [lacuna; leitura não usada no tutorial]
36. Harmonia: +5 se completo, sem descarte. [verificada]
37. O Poderoso Duelo: 2 jogadores, todas as peças, 7 x 7. [verificada]
38. Combinar à vontade. [verificada]

**Edição brasileira**
39. Promo "As Últimas Coroas" substitui a peça 48, coroas nos dois terrenos, regras normais. [PG, página da promo] "Substitua a peça nº 48 do jogo base por esta peça especial" [verificada]

## 5. Ambiguidades e escolhas

- Sorteio da primeira rodada (regra 11): segue o francês.
- Encosto parcial (regra 20): segue a figura.
- Última rodada (regra 25): francês explícito; inglês compatível.
- Desempate (regra 32): FR e DE explícitos.
- Descarte voluntário e escolha depois do descarte (23, 24): leituras do guia, marcadas `[!edicao]`.
- "Centro" do Reino Central: não interpretado no tutorial (só a regra, sem definição).
- Nome do terreno bege: "pântano", sem fonte; marcado em "Situações especiais".

## 6. Diferenças entre edições

- 2016 (este manual) e edição nova (arte de Pauline Detraz, caixa atual da PaperGames): componentes iguais pela página da PaperGames; regras da edição nova não lidas.
- Manual brasileiro inacessível: não sei se a PaperGames traduziu alguma regra de outra forma.

## 7. Erros comuns

Sem fonte de comunidade consultada (fóruns e BGG não usados). Os três erros do "Comece a jogar" foram escolhidos pelas regras que o próprio manual ilustra com X (encaixe), e pela ordem da fila (regra que muda a cada rodada).

## 8. Plano instrucional e decisões de carga

- Classes de tarefa: (1) escolher e encaixar uma peça numa rodada; (2) planejar a grade e chegar ao fim; (3) pontuar o reino. Em cada uma: exemplo resolvido, complete, sua vez.
- Informação de apoio: blocos "Para entender" (a fila como relógio da rodada; o limite de 5 x 5; multiplicação tamanho x coroas).
- Informação procedural: blocos "Passo a passo" e a folha de consulta.
- Prática específica: só pontuação (duas contas e um desempate) e ordem da fila.
- Adiado no "Comece a jogar": limite 5 x 5, descarte, última rodada, pontuação, desempate, opcionais.
- Limite: o texto não observa o leitor nem ajusta o apoio.

## 9. Contas

Script `<scratchpad>/d1106/kingdomino/scripts/contas.py`:

- Quadrados por terreno (p. 28): trigo 26, lago 18, floresta 22, pastagem 14, pântano 10, montanha 6; total 96 = 48 x 2. Coroas: 5, 6, 6, 6, 6, 10 (39).
- Filas e peças: 2 jogadores 24/4 = 6 filas, 12 peças cada; 3 jogadores 36/3 = 12 e 12; 4 jogadores 48/4 = 12 e 12; 12 x 2 + 1 = 25 quadrados. Fora da partida: 24, 12, 0.
- Exemplo do manual: 1x3 + 2x4 + 0x2 + 0x1 + 2x1 + 2x5 = 23.
- Complete da etapa 3: 5x1 + 3x2 + 4x0 = 11 (soma errada de quadrados e coroas: 5+1+3+2+4+0 = 15).
- Sua vez da etapa 3: 8x1 + 2x2 + 6x0 + 3x3 = 21. Montanha de 3 quadrados com 3 coroas é possível (1 + 2, ou 3 + 0 + 0; p. 28).
- Avaliação 5: 4x2 + 6x0 = 8.
- Complete da etapa 2: 1 + 2 x 11 = 23 quadrados ocupados, 2 livres, depois de 11 peças: a 12ª é a última.

## 10. Extensão

Tutorial com cerca de 4.550 palavras (contagem por palavra, legendas incluídas; 4.814 pelo `wc -w`, que conta marcadores), dentro da faixa de 3.500 a 4.500 pedida para jogo leve, no limite de cima. A seção de montagem é a maior (oito passos, nove figuras), por exigência do padrão.

## 11. Portões automáticos

- Travessão e meia-risca: 0.
- `tools/vicios.py` (lista `VICIOS` aplicada ao texto do tutorial): 0 ocorrências.
- `python3 tools/checar_comece.py docs/como-jogar/kingdomino/tutorial.md`: "seção Comece a jogar dentro da diretriz".
- Seções na ordem do BRIEF; toda pergunta é de múltipla escolha com uma só "(x)"; posição da certa variada.
- Legibilidade: não medida (o `legibilidade.py` do Arcvalion não foi adaptado nesta rodada).

## 12. Figuras e vídeo

Recortes a 300 dpi das páginas do PDF, largura máxima 1000 px, WebP qualidade 80, só a parte gráfica (o recorte da caixa foi refeito para tirar uma palavra do texto). Arquivos em `como-jogar/kingdomino/figuras/`:

| Arquivo | Página | Onde entra |
|---|---|---|
| setup-terrenos.webp | 28 | componentes |
| setup-castelo.webp | 2 | passo 1 |
| setup-caixa.webp | 2 | passo 2 |
| setup-fila.webp | 2 (quadro A) | passo 6 |
| setup-reis.webp | 2 (quadro B) | passo 7 |
| setup-nova-fila.webp | 2 (quadro C) | passo 8 |
| turno.webp | 3 (quadro D) | "Comece a jogar" |
| conexao.webp | 3 | etapa 1 |
| pontuacao.webp | 4 | etapa 3 |

Foto: `fotos/componentes-1.webp` (Asmodee UK, edição nova) no passo 8, com o crédito de `fotos/fontes.json` e a edição dita na legenda. A foto marcada "pessoas" não foi usada.

Vídeo: busca no canal Duque Board Games (`/@DuqueBoardgames/search?query=kingdomino`, `Accept-Language: pt-BR`, 08/11/2026): só "Conheça KINGDOMINO em 1 minuto! #shorts" e vídeos de Kingdomino Origins e Dragomino, nada de regras do jogo base. Canal da PaperGames (`@papergamesbr`): 404 na busca. Usado o vídeo que a página da PaperGames indica para aprender ("partida completa gravada pelo Canal Covil dos Jogos"): oEmbed "Covil dos Jogos - Review e Gameplay Kingdomino", autor "Covil dos Jogos". Sem vídeo dentro das etapas.

## 13. Dados do `conteudo/como-jogar/kingdomino.json`

- jogadores 2 a 4, duração 15 min: manual p. 2 e PaperGames.
- idade 7+: página da PaperGames (caixa brasileira); o manual de 2016 diz 8+, e o tutorial cita os dois.
- edição: "Manual oficial em inglês (Blue Orange)".
- data: 2026-11-08 (pedido do coordenador). resenha: null. publicar: false.
