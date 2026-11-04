# Dossiê: Como jogar BANG!

Produzido em 04/11/2026 (rotina diária do Como Jogar), seguindo `docs/como-jogar/BRIEF.md` e `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2. Escopo: só o jogo de cartas base, BANG! (dV Giochi, no Brasil pela Galápagos). Ficam de fora o BANG! O Jogo de Dados e as expansões.

## 1. Escolha do jogo e procura real

O jogo veio escolhido pelo editor. A procura existe: no autocomplete do Google (04/11/2026, `hl=pt-BR`), "como jogar bang" é a primeira sugestão para a própria busca, e "bang jogo" sugere "bang jogo de cartas", "bang jogo de tabuleiro", "bang jogo de cartas regras" e "bang jogo pdf". Na mesma lista aparece "como jogar bang dice game", que é outro produto (fora do escopo; o tutorial avisa a diferença).

Não há resenha de BANG! no Elite (não existe a pasta `/bang/` nem `conteudo/bang.json`): `"resenha": null`.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual da edição brasileira** (fonte principal). *BANG!*, livro de regras, Galápagos (gestão de projeto Matheus Passeri; tradução Karen Nakaoka; revisão Camila Loricchio e Gabriel Novaes; diagramação Felipe Godinho e Tati Hapanchuk); © MMII-MMXII daVinci Editrice; autor Emiliano Sciarra | Arquivo `BNG001_Regras_v1.0.pdf` (entregue em .zip), 12 páginas numeradas de 1 a 12, PDF criado em 27/03/2025 (InDesign 20.1), sha256 `f9d9663c…0513b`. Tem camada de texto | Biblioteca de downloads da Asmodee Brasil, https://www.asmodee.com.br/download-library, item 2729 "Bang! - SKU: BNG001", etiqueta Regras. Arquivo pela API pública que a biblioteca usa: https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2729&tagId=2&group=b2c (HTTP 200, sem login) | Baixado em 04/11/2026 |
| **Manual oficial em inglês**, dV Giochi, *BANG!* rules | 12 páginas, PDF criado em 03/07/2020, modificado em 12/01/2021 | https://www.dvgiochi.com/giochi/bang/download/Bang_rules_ENG.pdf, linkado na página oficial https://www.dvgiochi.com/catalogo/bang/ | Baixado em 04/11/2026 |
| **FAQ oficial**, dV Giochi, *BANG!: F.A.Q.* | 2 páginas, 26 perguntas, © MMX daVinci Editrice | https://www.dvgiochi.com/giochi/bang/download/Bang!_FAQ_ENG.pdf | Baixado em 04/11/2026 |
| **Lista oficial de cartas**, dV Giochi, *BANG! Card List* (italiano e inglês, cartas da 4ª edição) | 8 páginas, PDF de 12/07/2012, só imagens das cartas | https://www.dvgiochi.com/giochi/bang/download/BANG!%20Card%20List.pdf | Baixado em 04/11/2026; lida como imagem (80 e 150 dpi) |
| **Página oficial do jogo**, dV Giochi | quadro de informações (imagem `infobox.gif`): 8 a 99 anos, 4 a 7 jogadores, 20 a 40 minutos | https://www.dvgiochi.com/catalogo/bang/ | 04/11/2026 |
| **Vídeo** "BANG! - Gameplay resumida", canal Duque Board Games (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=BzlSuctYPgM, achado pela busca do próprio canal (`@DuqueBoardgames/search?query=bang`) | 04/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com user-agent de robô identificado (`EliteBoardgamersBot/1.0`). O site `www.asmodee.com.br` respondeu 403 (Akamai, "Access Denied") a esse user-agent, inclusive no `robots.txt`; não foi contornado (não se trocou o user-agent nem se usou outro caminho para a página da loja). A API da biblioteca (`api-prd.mundogalapagos.com.br`, sem `robots.txt`, 404) respondeu à busca `library-download/store/search` com a lista de itens; o item 2729 (grupo `b2c`, o do público) entregou o .zip com o manual. O item 2726, do mesmo produto, só responde no grupo `b2b` (área de lojistas); os arquivos dele não foram usados como fonte e foram apagados do scratchpad. A página da loja (ficha do produto BNG001) ficou inacessível pelo 403: tempo de partida e idade vêm do manual e da página da dV Giochi. O `robots.txt` da dV Giochi não restringe `/catalogo/` nem `/giochi/`.

**Como os manuais foram lidos.** `pdftotext -layout` página a página (texto em `scratchpad/bang/p<N>.txt` e inteiro em `scratchpad/bang/manual.txt`), mais as 12 páginas renderizadas a 110 dpi para ler as ilustrações: o diagrama de distância (p. 4), o alcance 3 impresso na Remington e o 1 da Volcanic (p. 5), o símbolo de livro (p. 2), o Barril virando um 4 de Copas (p. 9) e o marcador de vida (p. 11). O manual em inglês tem o mesmo conteúdo, parágrafo por parágrafo (conferido nas p. 1 a 11).

**Falta, e o tutorial não usa:** a ficha do produto na loja brasileira (bloqueada para robô); a lista de cartas da edição brasileira (o manual não lista). Os nomes das cartas são os do manual brasileiro.

## 3. Glossário (nomes da edição brasileira)

| Termo no Brasil | Original (EN) | Página | Explicação de uma linha |
|---|---|---|---|
| Identidade (Xerife, Assistente, Fora da lei, Renegado) | Role (Sheriff, Deputy, Outlaw, Renegade) | p. 1 e 2 | Carta secreta (só o Xerife a revela) que diz o seu objetivo |
| Personagem | Character | p. 1, 2, 10 e 11 | Carta aberta com nome, habilidade e número de balas |
| Bala | Bullet | p. 1 e 2 | Ficha que marca os pontos de vida no tabuleiro |
| Pontos de vida | Life points | p. 2 | Quantas vezes você pode ser atingido; também o limite de cartas na mão |
| Limite de cartas na mão | Hand size limit | p. 2 e 3 | No fim do turno, a mão não pode passar dos pontos de vida |
| Tabuleiro | Playing board | p. 1 e 2 | Base à sua frente para identidade, personagem, arma e balas; traz o Colt. 45 |
| Cartas de jogo | Playing cards | p. 1 e 2 | As 80 cartas do baralho |
| Cartas de resumo | Summary cards | p. 1 | Referência dos símbolos |
| Pilha de compra, pilha de descarte | Draw pile, discard pile | p. 2 e 3 | O baralho e o descarte |
| Carta com borda marrom | Brown-bordered card | p. 3 | Jogue e descarte: o efeito é imediato |
| Carta com borda azul, "em jogo" | Blue-bordered card, "in play" | p. 3 | Fica à sua frente e vale até sair |
| Colt. 45 | Colt .45 | p. 4 e 5 | A arma impressa no tabuleiro, alcance 1; nunca se perde |
| Arma (Volcanic, Schofield, Remington, Rev. Carabine, Winchester) | Weapon | p. 5 | Carta azul que muda o alcance do BANG! |
| Distância | Distance | p. 4 | Menor número de posições entre dois jogadores |
| Distância alcançável | Reachable distance | p. 5 e 7 | O número na mira da arma em jogo |
| BANG! | BANG! | p. 5 | Tiro: o alvo perde 1 ponto de vida se não cancelar |
| Errou! | Missed! | p. 6 | Cancela um tiro dirigido a você |
| Cerveja | Beer | p. 6 | Recupera 1 ponto de vida; única carta que salva do último ponto |
| Saloon | Saloon | p. 6 | Todos os jogadores em jogo recuperam 1 ponto |
| Diligência, Wells Fargo | Stagecoach, Wells Fargo | p. 7 | Compre 2 ou 3 cartas |
| Empório | General Store | p. 7 | Cada jogador pega uma de várias cartas viradas |
| Pânico! | Panic! | p. 7 | Pegue uma carta de um jogador à distância 1 |
| Cat Balou | Cat Balou | p. 7 | Faça qualquer jogador descartar uma carta |
| Gatling | Gatling | p. 7 | Um BANG! em todos os outros jogadores |
| Indígenas! | Indians! | p. 8 | Todos os outros descartam um BANG! ou perdem 1 ponto |
| Duelo | Duel | p. 8 | Descarte alternado de BANG! entre dois jogadores |
| Mustang | Mustang | p. 8 | Os outros veem você a distância +1 |
| Escopo | Scope | p. 8 | Você vê os outros a distância -1 |
| "comprar!" | "draw!" | p. 8 e 9 | Virar a carta do topo, descartá-la e olhar naipe e valor |
| Barril, Prisão, Dinamite | Barrel, Jail, Dynamite | p. 9 | As três cartas de "comprar!" |
| Recompensa | Reward | p. 4 | 3 cartas para quem elimina um Fora da lei |
| Copas, Ouros, Espadas, Paus | Hearts, Diamonds, Spades, Clubs | p. 8 a 10 | Naipes no canto da carta |
| Personagens: Bart Cassidy, Black Jack, Jane Calamidade, El Gringo, Jesse Jones, Jourdonnais, Kit Carlson, Duke Sortudo, Paul Regret, Pedro Ramirez, Rose Doolan, Sid Ketchum, Slab, o Assassino, Suzy Lafayette, Sam, o Abutre, Willy the Kid | Calamity Janet, Lucky Duke, Slab the Killer, Vulture Sam e os demais iguais | p. 10 e 11 | Nomes como impressos no manual brasileiro |

Nota de grafia: as cartas mostradas no manual trazem os nomes sem acento (DILIGENCIA, EMPORIO, PANICO!, INDIGENAS!, PRISAO, p. 7 a 9); o texto do manual acentua. O tutorial segue o texto.

## 4. Base de regras

Marcação: `[BR p. N]` manual brasileiro; `[EN]` manual em inglês; `[FAQ Qnn]` FAQ oficial; `[lista]` lista oficial de cartas. Classificação: `[verificada]`, `[interpretada]`, `[lacuna]`. Dependências entre parênteses.

### 4.1 Objetivo e vitória
- R1. Xerife elimina todos os Fora da lei e o Renegado; Fora da lei querem matar o Xerife; Assistentes ajudam o Xerife e têm o mesmo objetivo; Renegado quer ser o último personagem no jogo. "o objetivo dele é ser o último personagem no jogo" [BR p. 1] [verificada]
- R2. Fim: (a) Xerife morto: se o Renegado for o único vivo, ele vence; senão, vencem os Fora da lei. (b) Renegado e todos os Fora da lei mortos: vencem Xerife e Assistentes. "Se o Renegado for o único vivo, ele vence" [BR p. 4] [verificada] (R1)
- R3. Exemplo 1 do manual: Fora da lei eliminados, Renegado vivo: o jogo continua. Exemplo 2: Xerife morto, Fora da lei todos eliminados, um Assistente e o Renegado vivos: vencem os Fora da lei. [BR p. 4] [verificada] (R2)

### 4.2 Componentes e preparação
- R4. Componentes: 7 identidades (1 Xerife, 2 Assistentes, 3 Fora da lei, 1 Renegado), 16 personagens, 80 cartas de jogo, 7 cartas de resumo, 7 tabuleiros, 30 balas. [BR p. 1] [verificada]
- R5. Cada jogador pega um tabuleiro. Identidades por número de jogadores: 4: Xerife, Renegado, 2 Fora da lei; 5: + 1 Assistente; 6: Xerife, Renegado, 3 Fora da lei, 1 Assistente; 7: Xerife, Renegado, 3 Fora da lei, 2 Assistentes. [BR p. 2] [verificada]
- R6. Identidades embaralhadas, uma virada para baixo para cada um; "O Xerife se revela ao virar a carta dele para cima"; os outros mantêm a sua em segredo. [BR p. 2] [verificada]
- R7. Personagens: um virado para cima para cada jogador; cada um anuncia o nome e lê a habilidade; pega balas iguais às mostradas no personagem. [BR p. 2] [verificada]
- R8. Xerife joga com uma bala adicional (3 vira 4; 4 vira 5). [BR p. 2] [verificada] (R7)
- R9. Identidades, personagens e tabuleiros que sobram voltam para a caixa. [BR p. 2] [verificada]
- R10. Cartas de jogo: cada jogador recebe, viradas para baixo, tantas cartas quantas balas tiver; o resto é a pilha de compra; espaço para o descarte. [BR p. 2] [verificada] (R7, R8)
- R11. Versão simplificada para as primeiras partidas: remover as cartas com o símbolo de livro. [BR p. 2] [verificada]. Quais são (Duelo, Indígenas!, Empório, Prisão, Dinamite): [lista, p. 6 e 7, lida como imagem]; o manual brasileiro não as enumera [verificada na lista oficial da dV; ver Divergências]
- R12. Balas = pontos de vida = quantas vezes pode ser atingido; também o limite de cartas na mão no fim do turno; exemplo de Jesse Jones (4, depois 3). [BR p. 2] [verificada]
- R13. Marcador de vida alternativo: um personagem que sobrou, virado para baixo, sob o seu; deslize para cobrir ou descobrir balas. [BR p. 11] [verificada]

### 4.3 Turno
- R14. O Xerife começa; turnos no sentido horário; três fases: comprar duas cartas; jogar qualquer número de cartas; descartar as que passam do limite. [BR p. 3] [verificada]
- R15. Fase 1: compre as duas do topo. Pilha vazia: embaralhe o descarte para formar novo baralho. [BR p. 3] [verificada]
- R16. Fase 2: só se jogam cartas no próprio turno, exceto Errou! e Cerveja; não é obrigatório jogar. [BR p. 3] [verificada]
- R17. Três limitações: 1 carta BANG! por turno (só a carta BANG!, não outras com o símbolo); 1 cópia de cada carta em jogo (mesmo nome); 1 arma em jogo (a nova substitui, a antiga é descartada). [BR p. 3] [verificada]
- R18. Borda marrom: vai direto ao descarte e aplica o efeito. Borda azul: fica virada para cima à sua frente ("em jogo"), exceto Prisão; dura até sair (descartada, removida por Cat Balou etc.) ou até um evento (Dinamite). Sem limite de cartas azuis, desde que não tenham o mesmo nome. [BR p. 3] [verificada]
- R19. Fase 3: descarte da mão o que passar do limite, igual às balas que você tem no momento; depois joga o próximo, no sentido horário. [BR p. 3] [verificada] (R12)
- R20. Não se descarta carta voluntariamente, nem da mão nem em jogo (exceto Sid Ketchum). [FAQ Q12] [verificada]
- R21. Não se joga carta enquanto o efeito de outra não terminou (exemplo: Pânico! durante um Empório). [FAQ Q13] [verificada]
- R22. Pode-se conversar, mas não perguntar algo ligado diretamente à jogada de cartas (exemplo: perguntar ao Xerife se pode jogar uma Gatling). [FAQ Q01] [verificada]
- R23. Cartas de identidade e de personagem nunca são afetadas por cartas. [FAQ Q08] [verificada]

### 4.4 Distância e armas
- R24. Distância: menor número de posições entre dois jogadores, contando nos dois sentidos; eliminados não contam. [BR p. 4] [verificada]
- R25. Normalmente só se alcança distância 1 (o Colt. 45 do tabuleiro). [BR p. 4 e 5] [verificada]
- R26. Arma: posta sobre o Colt. 45, borda azul sem buracos de bala, ilustração em preto e branco, número na mira = distância máxima alcançável. Pode ser roubada (Pânico!) ou descartada (Cat Balou); o Colt. 45 nunca se perde. Só uma arma; a nova obriga a descartar a antiga. [BR p. 5] [verificada]
- R27. "as armas não alteram a distância entre os jogadores" [BR p. 5 e 11] [verificada]
- R28. Alcances: Volcanic 1, Schofield 2, Remington 3, Rev. Carabine 4, Winchester 5. Remington 3 e Volcanic 1 [BR p. 5, ilustração]; os cinco [lista p. 3]; coerente com o Exemplo 1 [BR p. 5] [verificada]
- R29. Volcanic: qualquer quantidade de BANG! no turno, no mesmo alvo ou em alvos diferentes, limitados à distância 1. [BR p. 5] [verificada]
- R30. Mustang: os outros veem você a distância +1; você vê os outros normalmente. Exemplo com 6 jogadores. [BR p. 8] [verificada]
- R31. Escopo: você vê os outros a distância -1; os outros veem você normalmente; "Distâncias menores que 1 são consideradas 1". [BR p. 8] [verificada]
- R32. Exemplos de distância: Ana-Carlos 2; com Escopo de Ana, 1; com Mustang de Carlos, os dois se combinam e volta a 2; Denis com Mustang, 4. [BR p. 5] [verificada]

### 4.5 Cartas de efeito
- R33. BANG!: verificar a distância até o alvo e se a arma a alcança. [BR p. 5] [verificada] (R24 a R28)
- R34. Errou!: jogada na hora, mesmo fora da sua vez, cancela o tiro; senão perde 1 ponto de vida (descarte uma bala para a pilha do meio). Só cancela tiros dirigidos a você. "A carta BANG! é descartada, mesmo quando cancelada." [BR p. 6] [verificada]
- R35. Qualquer carta com o símbolo de Errou! cancela o efeito de uma carta com símbolo de BANG!. [BR p. 11] [verificada]
- R36. Cerveja: recupera 1 ponto; nunca acima da quantidade inicial; não ajuda outros. Jogada no seu turno ou fora dele só ao receber golpe letal. Sem efeito se restam só 2 jogadores. Exemplo: 2 de vida, 3 de dano da Dinamite: com 2 Cervejas fica com 1 (2-3+2); com 1, eliminado. [BR p. 6] [verificada]
- R37. Cerveja com vida cheia: pode, sem efeito. [FAQ Q16]. Com 2 jogadores vivos: pode, sem efeito. [FAQ Q25]. Na Prisão, no próprio turno, só ao perder o último ponto [FAQ Q15]. [verificada]
- R38. Saloon: dois efeitos simultâneos; todos os jogadores em jogo recuperam 1 ponto; não pode ser jogado fora do turno ao perder o último ponto. [BR p. 6 e 11] [verificada]. Com 2 jogadores: pode, no seu turno [FAQ Q09]; eliminado não recupera [FAQ Q11] [verificada]
- R39. Símbolos: BANG! (remova um ponto de vida), Errou! (cancele), recuperar 1 ponto (só quem joga, salvo indicação), comprar uma carta (de jogador especificado: aleatória da mão ou escolhida em jogo; sem jogador: do topo), forçar descarte (aleatória da mão ou escolhida em jogo); qualquer jogador (qualquer distância), todos os outros (qualquer distância, não quem jogou), um jogador a distância alcançável, um jogador a distância até o número (Mustang e Escopo alteram, armas não). [BR p. 6 e 7] [verificada]
- R40. Diligência: compre 2 do topo; Wells Fargo: 3. [BR p. 7] [verificada]
- R41. Empório: vire cartas do baralho em número igual aos jogadores ainda jogando; começando por você, sentido horário, cada um escolhe uma para a mão. [BR p. 7] [verificada]
- R42. Pânico!: compre uma carta de um jogador à distância 1; distância não muda com armas, só com Mustang e Escopo. [BR p. 7] [verificada]; idem habilidades de Rose Doolan e Paul Regret [FAQ Q04] [verificada]
- R43. Cat Balou: force qualquer jogador a descartar uma carta, independentemente da distância. [BR p. 7] [verificada] (R39: aleatória da mão ou escolhida em jogo)
- R44. Gatling: um BANG! em todos os outros, qualquer distância; não é carta BANG!; pode jogar várias Gatlings no turno, mas só uma carta BANG!. [BR p. 7] [verificada]; BANG! depois de Gatling: pode [FAQ Q03]
- R45. Indígenas!: cada outro jogador pode descartar uma carta BANG! ou perde 1 ponto; Errou! e Barril não têm efeito. [BR p. 8] [verificada]
- R46. Duelo: desafia qualquer outro jogador, qualquer distância; o desafiado pode descartar um BANG!, depois você, e assim por diante; o primeiro que não conseguir perde 1 ponto e o duelo termina; sem Errou! nem Barril; Duelo não é carta BANG!; os BANG! descartados não contam para o limite. [BR p. 8] [verificada]; FAQ Q06 confirma [verificada]
- R47. "pode descartar": no Indígenas! e no Duelo o manual diz "pode", o que permite não descartar e aceitar a perda. [BR p. 8] [interpretada: leitura literal de "pode"; o texto do Duelo diz "o primeiro jogador que não conseguir descartar"; o guia diz que quem não quiser ou não puder descartar perde o ponto, e marca a leitura num bloco de edição]

### 4.6 "comprar!" e cartas de sorte
- R48. "comprar!": virar a carta do topo, descartá-la, olhar o naipe no canto inferior esquerdo; se corresponde (naipe e, quando houver, valor no intervalo), o efeito acontece; a carta virada é sempre descartada sem efeito. Sequência 2-3-4-5-6-7-8-9-10-J-Q-K-A. [BR p. 8 e 9] [verificada]
- R49. Barril: ao ser alvo de um BANG!, "comprar!": Copas = Errou!; senão nada, e ainda pode jogar Errou!. Exemplo com 4 de Copas. [BR p. 9] [verificada]
- R50. Prisão: jogue na frente de qualquer jogador, qualquer distância; quem está na prisão faz "comprar!" antes do início do turno: Copas = descarta a Prisão e joga normalmente; senão descarta a Prisão e pula o turno. Preso ainda é alvo e pode jogar Errou! e Cerveja fora do turno. Não pode ser jogada no Xerife. [BR p. 9] [verificada]
- R51. Dinamite: jogue à sua frente; no início do seu próximo turno, antes da fase 1, "comprar!": Espadas de 2 a 9 explode (descarte, perca 3 pontos); senão passe para a esquerda. Continua até explodir, ser comprada (Pânico!) ou descartada (Cat Balou). Com Dinamite e Prisão, a Dinamite primeiro. Dano da Dinamite não é causado por nenhum jogador. [BR p. 9] [verificada]
- R52. Dinamite que elimina: vai para o descarte antes de Sam, o Abutre, pegar as cartas. [FAQ Q14] [verificada]

### 4.7 Eliminação, penalidades, recompensas
- R53. Perdeu o último ponto: eliminado, salvo Cerveja imediata; mostra a identidade e descarta todas as cartas da mão e em jogo. [BR p. 4] [verificada]
- R54. Xerife que elimina um Assistente descarta todas as cartas da mão e em jogo. [BR p. 4] [verificada]
- R55. Quem elimina um Fora da lei, mesmo sendo Fora da lei, compra 3 cartas de recompensa. [BR p. 4] [verificada]
- R56. Gatling e Indígenas!: quem jogou é o responsável pela eliminação (recebe recompensa). [FAQ Q05] [verificada]
- R57. Fora da lei que joga Duelo e perde o último ponto: ninguém recebe recompensa. [FAQ Q23] [verificada]
- R58. O eliminado escolhe a ordem em que as cartas vão ao descarte. [FAQ Q07] [verificada; não usada no tutorial]
- R59. Nova partida: vivos podem manter o personagem (não as cartas); eliminados sorteiam outro. Opcional: passar a identidade de Xerife de partida para partida, sorteando as outras. [BR p. 4] [verificada]

### 4.8 Personagens (p. 10 e 11)
- R60. Vida: Paul Regret e El Gringo, 3; os outros 14, 4. [BR p. 10 e 11] [verificada]
- R61 a R76. Habilidades, uma por personagem, como no manual: Bart Cassidy (compra 1 do baralho a cada vez que perde pelo menos 1 ponto), Black Jack (mostra a 2ª carta da fase 1; Copas ou Ouros: compra mais 1), Jane Calamidade (BANG! como Errou! e vice-versa; Errou! jogado como BANG! conta como o BANG! do turno, salvo Volcanic), El Gringo (a cada ponto perdido por carta de outro jogador, pega carta aleatória da mão dele; Dinamite não é de jogador), Jesse Jones (1ª carta da fase 1 do baralho ou aleatória da mão de outro jogador; a 2ª do baralho), Jourdonnais (Barril permanente; com Barril real, duas chances), Kit Carlson (olha 3, fica com 2, devolve 1 ao topo), Duke Sortudo (em todo "comprar!", vira 2 e escolhe; descarta as duas), Paul Regret (Mustang permanente; com real, +2), Pedro Ramirez (1ª carta do topo do descarte ou do baralho; 2ª do baralho), Rose Doolan (Escopo permanente; com real, -2), Sid Ketchum (a qualquer momento, 2 cartas da mão por 1 ponto, mais de uma vez; nunca acima do inicial), Slab, o Assassino (BANG! dele exige 2 Errou!; Barril bem-sucedido conta como 1), Suzy Lafayette (sem cartas na mão, compra 1), Sam, o Abutre (pega para a mão todas as cartas de quem é eliminado), Willy the Kid (qualquer número de BANG!). [BR p. 10 e 11] [verificada]
- R77. FAQ dos personagens: Slab contra Barril, só um "comprar!" [Q02]; Gatling de Slab cancela com 1 Errou! [Q19]; Bart Cassidy e El Gringo no último ponto: sem Cerveja na mão, morrem; Bart que se salva com Cerveja compra pela perda [Q17]; Jane joga Errou! como BANG! no Duelo [Q20]; El Gringo que perde o próprio Duelo não pega carta [Q21]; Suzy compra só no fim do Duelo [Q22]; Bart atingido pela Dinamite e vivo compra 3 [Q24]; Sid Ketchum fora do turno, como Cerveja [Q26]; Sam, o Abutre, Xerife, que elimina Assistente: pega as cartas, depois descarta tudo [Q18]. [verificada]

### 4.9 Contagem das cartas (só referência)
- R78. 25 BANG!, 12 Errou!, 6 Cerveja, 4 Pânico!, 4 Cat Balou, 3 Duelo, 3 Prisão, 3 Schofield, 2 Diligência, 2 Indígenas!, 2 Empório, 2 Barril, 2 Mustang, 2 Volcanic, 1 de cada: Wells Fargo, Gatling, Saloon, Dinamite, Escopo, Remington, Rev. Carabine, Winchester; total 80. [lista p. 3 a 7, contada nas imagens; total confere com as 80 cartas de BR p. 1] [verificada na lista; ver Divergências]

### 4.10 Fora do escopo
BANG! O Jogo de Dados (BGD001) e as expansões (Dodge City, High Noon, A Fistful of Cards, Wild West Show, Gold Rush, The Valley of Shadows, Armed & Dangerous e outras). A biblioteca brasileira traz o jogo de dados em itens próprios; o tutorial só diz que é outro jogo.

## 5. Divergências e lacunas

- **Lista de cartas.** A lista oficial da dV é da 4ª edição italiana (2011-2012). O manual brasileiro (2025) traz os mesmos tipos de carta e o mesmo total de 80, mas não lista as quantidades nem os naipes. O tutorial usa a contagem só numa tabela de referência, marcada como vinda da lista oficial da editora italiana, e não faz conta de probabilidade com ela.
- **Cartas com livro.** O manual brasileiro manda remover "todas as cartas com o símbolo de livro" sem dizer quais. Pela lista oficial: Duelo, Indígenas!, Empório, Prisão e Dinamite. O tutorial dá os nomes e manda conferir o símbolo na carta.
- **Barril contra Gatling.** O Barril vale "quando você é alvo de um BANG!" (p. 9) e a Gatling "atira um BANG!" em todos (p. 7); o "Lembre-se" diz que qualquer símbolo de Errou! cancela o efeito de um símbolo de BANG! (p. 11). O manual não diz com todas as letras que o Barril funciona contra a Gatling. [interpretada] O guia afirma só o que está escrito (Errou! cancela a Gatling) e registra a leitura do Barril num bloco [!edicao].
- **"pode descartar" no Indígenas! e no Duelo** (R47). [interpretada], com bloco [!edicao].
- **Manual brasileiro e inglês**: conteúdo igual parágrafo por parágrafo; nenhuma diferença de regra encontrada.

## 6. Dúvidas recorrentes (para antecipar no texto)

A FAQ oficial já reúne as dúvidas que a editora recebeu: Gatling e BANG! no mesmo turno, Pânico! com arma, quem leva a recompensa pela Gatling, Saloon fora do turno, descartar à vontade, Cerveja com vida cheia. O autocomplete mostra "bang jogo de cartas regras" e confusão com o jogo de dados. Não se usou fórum como fonte de regra.

## 7. Plano instrucional

Três classes de tarefa, da mais simples para a partida inteira:

1. **Montar e jogar um turno sem tiro de longe** (Etapa 1): identidades, personagens, vida e limite de mão, as três fases, borda marrom e azul, as três limitações, cartas de compra (Diligência, Wells Fargo, Empório). Apoio: por que a vida é também o tamanho da mão. Prática: limite de mão (erro comum).
2. **Atirar e se defender** (Etapa 2): distância, armas, Mustang e Escopo, BANG! e Errou!, Cerveja e Saloon, Gatling, Indígenas!, Duelo, Pânico!, Cat Balou. Prática específica: conta de distância (o erro mais caro do jogo: arma não muda distância, Pânico! não usa arma).
3. **Sorte, eliminação e fim** (Etapa 3): "comprar!", Barril, Prisão, Dinamite, eliminação, penalidade do Xerife, recompensa, condições de vitória.

Personagens ficam em Situações especiais, numa tabela de consulta: cada jogador só precisa ler o próprio. Redução de carga: o "Comece a jogar" usa só o turno do Xerife com cartas sem "comprar!" e adia distância modificada, Dinamite, eliminação e personagens. A contagem de cartas fica fora do texto corrido.

## 8. Portões automáticos

Resultado registrado em `auditoria.md`, seção 1.
