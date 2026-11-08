# Dossiê: Como Jogar Cascadia

Pedido: rotina diária de 06/11/2026 (retomada em 08/11/2026, depois da pausa por limite de uso), pelo BRIEF de `docs/como-jogar/BRIEF.md`. Jogo base, Flatout Games e AEG; no Brasil, Grok Games. Data do JSON: 2026-11-08, por instrução do coordenador.

**User-Agent e robots.txt.** Todas as requisições usaram o User-Agent do robô (`EliteBoardgamersBot/1.0 (+robo de pesquisa editorial)`). Lidos os robots.txt de grokgames.com.br (tudo permitido), loja.grokgames.com.br (permite páginas de produto; `Crawl-delay: 10`, respeitado entre as páginas da loja), flatout.games (Squarespace; bloqueia só robôs de IA nomeados e caminhos de sistema) e alderac.com (tudo permitido). Nenhum bloqueio foi contornado.

## 1. Escolha do jogo e procura real

O jogo veio escolhido no pedido. Autocompletar consultado em 08/11/2026: Google (`client=firefox`, pt-BR) devolve "como jogar cascadia"; YouTube (`client=youtube&ds=yt`) devolve "como jogar cascadia". Há procura pela forma exata.

## 2. Fontes

**Manual em português.** Procurado e não encontrado:

| Onde | Resultado |
|---|---|
| grokgames.com.br | Página inicial só leva à loja; nenhum link de regras ou downloads |
| loja.grokgames.com.br/cascadia (código GRK0082, "indisponível"), consultada em 06/11/2026 | Só descrição do jogo; nenhum PDF nem link de manual. A descrição usa "corredores de habitat contíguos", "vida selvagem", "colocação de peças e seleção de fichas" |
| loja.grokgames.com.br, páginas de jogos de tabuleiro (1 a 3) e categoria "Conteúdo" (/conteudo dá 404) | Nenhuma seção de manuais |
| Precedentes no repositório | Os dossiês de Santuário e Coup registram o mesmo: a Grok não publica manual em PDF no site |

A Grok não é Galápagos, então a biblioteca da Asmodee Brasil não se aplica. Pela regra do BRIEF (decisão do editor de 31/10/2026), segui com o manual oficial em inglês.

**Domínio flatoutgames.com.** Conferido em 08/11/2026: redireciona para `hugedomains.com/domain_profile.cfm?d=flatoutgames.com` (domínio à venda) e não foi usado. O site real da Flatout é `www.flatout.games` (rodapé do próprio manual, p. 16: "WWW.FLATOUT.GAMES"). Nele, o sitemap tem só páginas de cadastro e venda de Cascadia, sem PDF de regras; a página "resources" só tem uma planilha de controle de horas.

| Fonte | Dados | Endereço e data | Uso |
|---|---|---|---|
| **Manual oficial em inglês**, *Cascadia Rulebook*, AEG e Flatout Games | Arquivo "Cascadia_BaseGame_Rulebook_Optimized.pdf", 16 páginas quadradas (964 × 964 pt), criado em 03/04/2025, 2.123.987 bytes, SHA-256 `a7f142115aadfcb2b7d145dd04c694b6672f620358a477f4030f528c48c91627`. Créditos: design Randy Flynn; ilustração Beth Sobel; modo solo Shawn Stankewich (p. 16) | Link "Rulebook" da página https://www.alderac.com/cascadia/: https://www.alderac.com/wp-content/uploads/2025/04/Cascadia_BaseGame_Rulebook_Optimized.pdf, baixado em 08/11/2026 | Única fonte de regra |
| Página do produto na AEG | Jogo base: 1 a 4 jogadores, 45 minutos, 10 anos ou mais | https://www.alderac.com/cascadia/, 08/11/2026 | Duração (o manual não traz) |
| Página do produto na Grok | Código GRK0082 | https://loja.grokgames.com.br/cascadia, 06/11/2026 | Só vocabulário ("corredores de habitat") |
| Resenha do site | `conteudo/cascadia.json` | repositório | Só vocabulário (peça inicial, ficha de pinha, falcão, campo, pântano, território) |
| Vídeo | "Cascadia - Como Jogar", canal Romir Play House, https://www.youtube.com/watch?v=UJ9VqLfyYOs (título e canal pelo oEmbed, 08/11/2026) | YouTube | Só o vídeo do topo. O canal Duque Board Games, buscado pela busca do próprio canal, só tem "CASCADIA - Vale ou não a Pena ?" e "CASCADIA - Unboxing Rápido" (review e unboxing, não regras); o canal da Grok (@GrokGames) não tem vídeo de Cascadia na busca. Por isso o Romir, canal de regras já usado no site |
| FAQ ou errata | Não encontrados nos sites da AEG e da Flatout | | Lacuna |

**Como o manual foi lido.** O PDF não tem camada de texto: cada página é uma única imagem JPEG de 964 × 964 px (pdfimages). As páginas foram renderizadas a 200 dpi e passadas por OCR (tesseract 5, inglês), uma por uma, e todas as páginas de regra (4 a 11) foram lidas também como imagem, a 90 dpi, para conferir o OCR e as ilustrações; a p. 9 e a p. 11 foram ampliadas a 400 dpi. Texto por página, no scratchpad, fora do repositório:

- PDF: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/manual/cascadia_en.pdf`
- Texto extraído por página (OCR, com cabeçalho "PÁGINA DO PDF N"): `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/manual/cascadia_en_paginas.txt`
- Imagens das páginas: `.../manual/png/p-NN.png` (200 dpi) e `.../manual/view/v-NN.png` (90 dpi)

Correções do OCR feitas na leitura da imagem: tabela da p. 4 (o OCR leu "BB: 43"; a imagem mostra o ícone de 2, 3 e 4 jogadores com 43, 63 e 83); ordem das colunas da p. 6 e da p. 8 (o OCR mistura as colunas; a leitura seguiu a imagem). A numeração impressa coincide com a do PDF (a capa é a p. 1; a preparação traz o número 4 impresso).

**Limite do arquivo.** Como cada página é uma imagem de 964 px, as cartas de pontuação aparecem pequenas demais (p. 5, 9 e 11): dá para ler o cabeçalho das tabelas (urso 1 a 4 pares; alce filas de 1 a 4; salmão 1 a 7+; falcão 1 a 8+; raposa 1 a 5), mas não os pontos. Os pontos usados no tutorial são só os que o exemplo da p. 9 confirma (seção 4.5).

**Jogadores, idade, duração.** 1 a 4 jogadores e 10+ (p. 2); 45 min (página da AEG). A resenha registra 14+ na caixa da Grok (fonte citada por ela: página da Bravo Jogos), que não conferi nesta sessão. Por isso o JSON usa o 10+ do manual e da AEG, e o tutorial não traz caixa `[!edicao]` sobre a idade. Se o editor confirmar o 14+ na caixa, vale uma nota.

## 3. Glossário (inglês do manual para o português do tutorial)

Os nomes da caixa da Grok não foram obtidos. Tradução nossa, alinhada com a resenha do site quando ela tem o termo. O tutorial avisa isso na linha 3 e num `[!edicao]`.

| Inglês (manual) | Português (tutorial) | Página | Explicação | Origem do nome |
|---|---|---|---|---|
| Habitat Tile | peça de habitat | 3, 4, 7 | hexágono com 1 ou 2 terrenos e 1 a 3 animais desenhados | resenha |
| Keystone Tile | peça-chave | 3, 7, 8 | peça com o símbolo de pedra-chave; animal certo nela dá pinha | tradução nossa (a resenha diz "peças de habitat único") |
| Starter Habitat Tile | peça inicial de habitat (peça inicial) | 3, 4 | peça de 3 hexágonos, uma por jogador | resenha |
| Wildlife Token | ficha de animal | 3, 4, 7 | ficha de madeira com um dos 5 animais | resenha |
| Nature Token | ficha de pinha | 3, 6, 8 | "Cones from the mighty Douglas Fir" (p. 3) | resenha |
| Wildlife Scoring Card | carta de pontuação (de animal) | 3, 4, 11 | 4 por animal (A a D), mais família e intermediária | resenha ("cartas de pontuação") |
| Cloth Bag | saco de pano | 3, 4 | guarda as fichas de animais | tradução nossa |
| Scorepad | bloco de pontuação | 3, 8 | | tradução nossa |
| environment | território | 5 | todas as peças e fichas na frente do jogador, com a peça inicial | resenha |
| habitat corridor | corredor de habitat | 8 | grupo de peças ligadas pelo mesmo terreno | página da Grok ("corredores de habitat") |
| Habitat Tile Corridor Majorities | maiorias | 8, 9 | bônus do maior corredor | tradução nossa |
| overpopulation / wipe | superpopulação / trocar, separar | 6 | | tradução nossa |
| Mountains, Forests, Prairies, Wetlands, Rivers | montanha, floresta, campo, pântano, rio | 3, 8 | os 5 habitats | resenha |
| Bear, Elk, Salmon, Hawk, Fox | urso, alce, salmão, falcão, raposa | 3 | os 5 animais. *Hawk* seria gavião; usei "falcão", como a resenha | resenha |
| run (salmon) | corrente | 11 | | resenha ("salmões em correntes") |
| line of sight | linha de visão | 11 | | tradução nossa |
| Family / Intermediate Variant | variante família / intermediária | 10 | | resenha |
| Achievements | conquistas | 12 a 14 | | tradução nossa |

## 4. Base de regras

Classificação: `[V]` verificada (lida nesta sessão, no texto ou na ilustração indicada), `[I]` interpretada (com o motivo), `[L]` lacuna. Páginas do manual em inglês. Entre aspas, frase do texto extraído.

### 4.1 Componentes e preparação (p. 3 a 5, 10)

| # | Regra | Fonte | Classe |
|---|---|---|---|
| R1 | 85 peças de habitat, 25 delas peças-chave; 5 peças iniciais; 100 fichas (20 de cada animal); 21 cartas (4 por animal e 1 carta só para as variantes família e intermediária: 20 + 1 = 21; o texto da p. 3 diz "Family intermediate" num item); 25 pinhas; saco; bloco | p. 3 "85 Habitat Tiles including 25 Keystone Tiles" | V |
| R2 | Todas as fichas de animais no saco | p. 4 passo 1 | V |
| R3 | 43/63/83 peças para 2/3/4 jogadores, sorteadas sem olhar; pilhas viradas para baixo, em qualquer número; as excluídas voltam para a caixa | p. 4 passo 2 "This is 20 per player, plus 3" | V |
| R4 | 1 carta por animal, sorteada; as outras para a caixa; primeira partida: cartas A | p. 4 passo 3 "with 'A' in the bottom right corner" | V |
| R5 | 1 peça inicial sorteada por jogador; o resto para a caixa | p. 4 passo 4 | V |
| R6 | 4 peças viradas no centro; 4 fichas do saco, em ordem, uma com cada peça | p. 4 passos 5 e 6 | V |
| R7 | Pinhas ao alcance de todos | p. 4 passo 7 | V |
| R8 | Primeiro jogador: quem viu por último um dos animais, ou sorteio; sentido horário | p. 4 passo 8; p. 5 | V |
| R9 | Ninguém começa com pinha ou ficha | p. 4 (nenhum passo dá) | I (inferido da lista completa de passos) |
| R10 | Solo: montagem de 2 jogadores, só 1 peça inicial, pilhas à esquerda | p. 10 | V |
| R11 | Peça inicial tem 3 hexágonos, cada um com terreno e animais desenhados | p. 5 (ilustração) | V (ilustração) |
| R11b | Cada hexágono da peça inicial recebe a sua ficha e conta 1 no corredor do seu terreno | p. 5 (animais desenhados em cada hexágono); p. 9 (o território de Jade tem 23 hexágonos = 20 peças + 3 da inicial, com 20 fichas) | I (o manual não diz em palavras; tutorial avisa num `[!edicao]`) |
| R11c | Girar a peça antes de encaixar | p. 7 não fala | L (tutorial avisa num `[!edicao]`) |

### 4.2 Turno (p. 5 a 8)

| # | Regra | Fonte | Classe | Depende de |
|---|---|---|---|---|
| R12 | Cada turno: escolher 1 combinação peça + ficha e pôr no território; no fim, repor | p. 5 | V | R6 |
| R13 | 4 fichas iguais: trocadas automaticamente, uma a uma, em ordem; pode se repetir | p. 6 "they are automatically wiped"; "this could happen multiple times" | V | R12 |
| R14 | 3 fichas iguais: quem joga pode trocar essas 3; uma vez por turno | p. 6 "You may only do this once per turn" | V | R12 |
| R15 | Fichas trocadas voltam ao saco depois de resolvida a superpopulação | p. 6 | V | R13, R14 |
| R16 | Pinha, antes de escolher: pegar qualquer peça e qualquer ficha; ou trocar quantas fichas quiser | p. 6 e 8 | V | R12 |
| R17 | Pinha gasta volta à reserva; sem limite por turno; sem pinha, pega-se um par existente | p. 6 e 8 | V | R16 |
| R18 | Peça e ficha postas em qualquer ordem | p. 7 "in any order" | V | R12 |
| R19 | Peça encosta em pelo menos um lado de peça já posta ou da inicial; não vai por cima; nada se move | p. 7 A e B | V | |
| R20 | Combinar terreno não é regra de colocação | p. 7 nota | V | R19 |
| R21 | Ficha numa peça sem ficha que mostre o animal (1 a 3 desenhos por peça); no máximo 1 por peça | p. 7 A e B | V | |
| R22 | Ficha pode ir na peça nova ou em outra | p. 7 | V | R21 |
| R23 | Sem lugar, ou por escolha, a ficha volta ao saco | p. 7 | V | R21 |
| R24 | Ficha na peça-chave (do animal dela) dá 1 pinha | p. 7; p. 8 "Whenever you place the matching Wildlife Token onto a Keystone Tile" | V | R21 |
| R25 | Repor: peça do topo de qualquer pilha; ficha sorteada do saco; não arrastar os pares | p. 7 | V | |
| R26 | A vez passa no sentido horário | p. 7 | V | |
| R27 | Peça tem 1 ou 2 terrenos e 1 a 3 opções de animal | p. 8 | V | |
| R28 | A peça-chave do exemplo é só de floresta com só o alce | p. 8 (ilustração) | V (ilustração); o tutorial não generaliza | |

### 4.3 Fim e pontuação (p. 8 e 9)

| # | Regra | Fonte | Classe |
|---|---|---|---|
| R29 | Fim: no fim de um turno, sem peça para repor, a partida acaba na hora; cada um jogou 20 turnos | p. 8; p. 5 | V |
| R30 | Bloco: cartas de animais; corredores; maiorias; pinhas | p. 8 | V |
| R31 | Corredor: peças ligadas por lado com terreno igual; 1 ponto por peça do maior corredor de cada habitat | p. 8 "share at least one matching edge" | V |
| R32 | Exemplo: 3 e 4 florestas valem 4 | p. 8 | V |
| R33 | Peça de dois terrenos conta nos dois corredores | p. 8 (definição por lado e terreno) | I (consequência da definição por lado e terreno; o manual não diz em palavras) |
| R34 | Maioria a 2: 2 para o maior; empate 1 cada; nada ao segundo | p. 9 | V |
| R35 | Maioria a 3/4: 3 e 1; dois empatados no maior 2 cada, sem segundo; três ou quatro empatados 1 cada, sem segundo; empate no segundo 0 | p. 9 | V |
| R36 | Solo: 2 pontos por habitat com grupo de 7 ou mais | p. 9 | V |
| R37 | 1 ponto por pinha não usada | p. 8 e 9 | V |
| R38 | Mais pontos vence; empate: mais pinhas; depois, vitória dividida | p. 9 | V |

### 4.4 Cartas de pontuação (p. 11)

| # | Regra | Classe |
|---|---|---|
| R39 | Ursos: grupos de qualquer forma; dois grupos não podem encostar; cada grupo com o número exato da carta | V |
| R40 | Urso A: pontos crescentes pelo total de pares | V |
| R41 | Alces: formato da carta, qualquer orientação; grupos podem encostar, cada alce pontua uma vez; vale a leitura com mais pontos | V |
| R42 | Alce A: filas retas, de lado plano a lado plano | V; filas de 1 a 4 no desenho da carta (V, ilustração) |
| R43 | Salmões: corrente = grupo em que cada salmão encosta em no máximo 2; nenhum salmão encostado na corrente; triângulo pode ser corrente | V |
| R44 | Salmão A: cada corrente pelo tamanho, até 7 | V |
| R45 | Falcões: linha de visão reta, interrompida só por falcão | V |
| R46 | Falcão A: pontos crescentes por falcão que não encosta em outro falcão | V |
| R47 | Raposa A: cada raposa pelo número de tipos diferentes vizinhos, incluindo raposas | V |
| R48 | Resumo das cartas B, C e D (urso B 10 por grupo de 3; falcão C 3 por linha de visão; salmão D 1 por salmão + 1 por ficha vizinha; demais no texto) | V |
| R49 | Grupo de salmões com bifurcação (algum salmão com 3 ou mais vizinhos salmões) não é corrente e não pontua | V (p. 11: definição de corrente e "Each run of salmon may not have any other salmon adjacent to it"; reclassificada na auditoria independente) |
| R50 | Falcão encostado em outro não pontua na carta A | V (p. 11: "each hawk that is not adjacent to any other hawk"; reclassificada na auditoria independente) |
| R50b | Fila de alces maior que 4 na carta A | L (a carta mostra filas de 1 a 4; o manual não trata) |
| R51 | Tabela de pontos completa das cartas A | L (ilegível no arquivo; seção 2) |

### 4.5 Valores confirmados pelo exemplo da p. 9

O território de Jade foi lido na ilustração da p. 9 e as vizinhanças foram conferidas num script (seção 7): 2 pares de ursos, sem pares encostados, = 11; filas de alces de 2 e de 3 (a de 3 é diagonal) = 5 + 9; corrente de 4 salmões (2, 1, 2, 1 vizinhos salmões) = 12; 4 falcões sem falcão vizinho = 11; raposas com 3, 5 e 3 tipos vizinhos = 3 + 5 + 3. Isso confirma, para a raposa A, 3 tipos = 3 e 5 tipos = 5. Os outros valores das cartas não aparecem e não são afirmados.

### 4.6 Variantes e extras (p. 10, 12 a 14)

| # | Regra | Classe |
|---|---|---|
| R52 | Solo: antes de repor, descartar, entre as que sobraram, a peça e a ficha mais longe das pilhas (saem do jogo), arrastar as restantes formando pares, repor 2 e 2; acaba depois do 20º turno; tabela de 60+ a 110+ | V (o exemplo da p. 10 mostra o caso em que o par mais distante foi levado: sai a peça de montanha e pântano, terceira, e a ficha de urso da ponta) |
| R53 | Família: só a carta família no passo 3; turno igual; pode pular as maiorias; grupos de qualquer forma pontuam por tamanho | V |
| R54 | Intermediária: como a família, com a pontuação intermediária, que fica na mesma carta da família (p. 3 conta uma carta só) | V (regra); I (que seja a outra face: o manual não diz qual face) |
| R55 | Conquistas: cenários, partidas normais e restrições, com trilha de progresso | V (resumo) |
| R56 | Saco sem fichas; reserva de pinhas esgotada | L |
| R57 | 4 fichas iguais depois de uma troca (de 3 iguais ou com pinha) também saem sozinhas | I (p. 6: a troca com pinha segue o processo da superpopulação, e a de 4 iguais "could happen multiple times" no turno). Na montagem, o manual não manda conferir: L |
| R58 | Reposição: peça nova no lugar da peça levada, ficha nova no lugar da ficha levada; com pinha, ficam separadas | V (p. 7: "do not move the existing tiles and tokens. Simply refill the empty spots") |
| R59 | Peças-chave são a única fonte de pinhas | V (p. 7 e 8: nenhuma outra regra dá pinha) |

### 4.7 Erros comuns

Não procurei fórum (o método só permite comunidade para levantar dúvidas). Os erros apontados no tutorial vêm das notas do próprio manual: "Matching terrain is not a placement rule" (p. 7), "at most, one Wildlife Token per Habitat Tile" (p. 7), "largest" corredor (p. 8) e o grupo exato dos ursos (p. 11). A resenha também cita "cada peça recebe um único animal" como ponto a lembrar.

## 5. Divergências entre edições

Sem manual brasileiro, não há confronto. A resenha está de acordo com o manual nos pontos conferidos (20 turnos, pinha nas peças de habitat único, troca automática com 4 iguais). Ela diz "cartas de objetivo" e "cartas de pontuação"; o tutorial usa só "cartas de pontuação".

## 6. Plano e ordem do tutorial

- **Montar a mesa:** a ordem dos 8 passos da p. 4, com a figura da p. 5 recortada por número. O passo 8 (quem começa) não tem ilustração no manual.
- **Comece em 4 minutos:** turno completo sem pinha (R12 a R26, menos R16, R17 e R24).
- **Etapa 1:** escolha, superpopulação, pinhas, colocação, peça-chave. Depende só da montagem.
- **Etapa 2:** cartas A e regras gerais dos animais; troca de cartas em `[!mais]`. Vem antes da contagem porque a contagem final usa os animais.
- **Etapa 3:** fim, corredores, maiorias, pinhas, desempate, com o exemplo completo do manual.
- **Situações especiais:** solo (curto, só `[!mais]`, como pediu o editor), variantes, conquistas, lacunas, nomes.

Extensão: cerca de 4.700 palavras de texto (sem legendas), dentro da faixa de 4.000 a 5.000 do pedido. O que pesou foi a etapa 2: as cinco cartas A têm regras de formato diferentes, e cada uma precisou de uma linha própria.

## 7. Portões automáticos e contas

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos`, aplicada ao texto inteiro): um aviso de muleta de linguagem, corrigido; depois, nenhum.
- `tools/checar_comece.py docs/como-jogar/cascadia/tutorial.md`: passa.
- Conversor `tools/como_jogar_md.py` (função `pagina`, rodada em memória, sem gravar): gera a página sem erro.
- Contas: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/scripts/contas.py` refaz peças por número de jogadores e turnos (43 = 4 + 39, 40 turnos a 2), as vizinhanças do território de Jade, os 98, 97 e 95 do bloco da p. 9, as maiorias de cada habitat, e os números de todos os exercícios.
- Recortes das figuras: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/cascadia/scripts/crop.py`.
