# Dossiê: Como Jogar King of Tokyo

Entrega 1 da linha COMO JOGAR para *King of Tokyo* (jogo base, edição atual). Produzido em 05/11/2026 (rotina diária) seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; jogo leve: 3.500 a 4.500 palavras e 3 etapas; exercícios de múltipla escolha; essencial à vista e `[!mais]`; seção de montagem com figura em cada passo; figuras do manual e vídeo).

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. Edição brasileira da Galápagos Jogos, código KOT201, livro de regras de 2016. É a edição que a IELLO lista hoje como *King of Tokyo* (lançamento em 17/06/2016, páginas oficiais em francês e em inglês consultadas em 05/11/2026; o nome interno dos arquivos é "KOT2", a segunda edição, com arte de Régis Torres). Não confundir com Dark Edition, Monster Box, Duel, Origins ou Godzilla, que a IELLO lista como produtos à parte.
- **Resenha no site:** não há `conteudo/king-of-tokyo.json` nem pasta `king-of-tokyo/`. `"resenha": null`.
- **Procura (05/11/2026):** autocompletar do Google (`client=firefox&hl=pt-BR`, "como jogar king of tokyo"): como jogar king of tokyo, como jogar king of tokyo duel. "king of tokyo ": jogo, duel, monster box, godzilla, dark edition, board game, bgg, ludopedia, jogo de tabuleiro, origins. YouTube: como jogar king of tokyo, ... duel, king of tokyo monster box como jogar. A pauta (`conteudo/como_jogar_pauta.json`) registra nota 3,0. As outras caixas não são ensinadas; o tutorial diz qual edição segue.
- **Complexidade:** um turno de cinco passos, uma regra de pontuação por trinca, a regra de entrar e ceder Tóquio (com a Baía para 5 e 6) e cartas de Poder com texto próprio. Jogo leve: três etapas.

## 2. Fontes

| Fonte | Arquivo (scratchpad) | URL | Data |
|---|---|---|---|
| **Livro de regras da edição brasileira** (Galápagos Jogos; PDF "rules BR revised", Adobe Illustrator CS5, criado em 21/06/2016; carimbo de diagramação "rulebook EN KOT2_version finale_pt-BR_v05.indd", 20/06/16; tradução de Leonardo Zilio, revisão de Priscilla Freitas, diagramação BR de Cauê Milliatti; ©2011-2016 IELLO USA LLC). Uma folha de 2494 x 1304 pt com 8 páginas impostas (a fileira de cima de cabeça para baixo); páginas impressas 2 a 7 numeradas, capa = p. 1, créditos = p. 8 | `<scratchpad>/d1105/king-of-tokyo/dl/kot_br.pdf` (ZIP em `dl/x1890/file.bin`); texto por página em `txt/kot_br_por_pagina.txt` e `txt/pagina_1.txt` a `pagina_8.txt`; páginas em PNG em `img/` | Biblioteca da Asmodee Brasil, item 1890 "KOT201 - King of Tokyo - SKU: KOT201", etiqueta Regras: https://api-prd.mundogalapagos.com.br/library-download/store/file?id=1890&tagId=2&group=b2c (ZIP, HTTP 200, sem login). O outro item com o mesmo nome (id 675) respondeu 404 "The specified blob does not exist" | 05/11/2026 |
| **Manual oficial em inglês da IELLO** (arquivo "KOT_Rules_EN_11-2023_Light", 8 páginas, criado em 20/11/2023, lote KOTEN112023), para conferir tradução e diferenças | `dl/iello/KOT_Rules_EN.pdf`, texto `txt/en.txt` e `txt/en_p1.txt` a `en_p8.txt` | https://iellogames.com/wp-content/uploads/2021/10/KOT_Rules_EN_11-2023_Light.pdf, linkado em https://iellogames.com/jeux/king-of-tokyo/ | 05/11/2026 |
| Página oficial do jogo (IELLO, francês e inglês): 2-6, 8+, 30 mn, lançamento 17/06/2016, versão brasileira listada | HTML lido | https://iello.fr/jeux/king-of-tokyo/ e https://iellogames.com/jeux/king-of-tokyo/ | 05/11/2026 |
| Regras em francês da IELLO (KOT_reglesFR.pdf, 2016/2018), baixadas, não usadas no texto | `dl/iello/KOT_reglesFR.pdf` | https://iello.fr/wp-content/uploads/2013/10/KOT_reglesFR.pdf | 05/11/2026 |
| **Vídeo** "King of Tokyo - Como Jogar", Romir Play House (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=uNdf_H9zHlU | 05/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo)`. A busca na biblioteca foi feita na API pública que a página usa (`store/search?term=tokyo`, 2 itens: 675 e 1890). Não acessei `www.asmodee.com.br` (o pedido avisou que responde Access Denied a robô); os dados de jogadores, idade e duração vêm da capa do manual (p. 1) e conferem com a página da IELLO. O `robots.txt` da IELLO (iello.fr) não bloqueia nada; algumas conexões à IELLO caíram no proxy e foram repetidas com `--retry`, sem trocar User-Agent. O YouTube foi consultado pela busca dentro dos canais e pelo oEmbed.

**Vídeo.** Busca no canal Duque Board Games (`@DuqueBoardgames/search?query=king of tokyo`): só "Conheça King of Tokyo em 1 minuto #shorts" (8aisuCj4fX4, apresentação, não regras), "5 Motivos para Jogar - King of Tokyo (Dark Edition)" e vídeos de King of Tokyo Duel e King of Monster Island. Busca no canal da Galápagos (`@GalapagosJogos`): nada. Seguindo a ordem do padrão, entrou o canal de regras Romir Play House, "King of Tokyo - Como Jogar" (o mesmo canal tem vídeos separados de Dark Edition, Monster Box e Duel). Não conferi o conteúdo do vídeo segundo a segundo; ele vai só no fim do "Comece a jogar", sem tempo marcado, com o aviso de que vale o manual.

**Leitura do manual.** O texto extraído perde todos os ícones (estrela, coração, raio, garra, números dos dados) e sai embaralhado nas páginas com ícones. Por isso todas as páginas 1 a 7 foram lidas também como imagem (150 e 250 dpi, cortadas em quadrantes), e cada regra com ícone foi conferida na imagem. A paginação usada é a impressa: o número aparece no dado do canto das p. 2 a 7.

**Não obtido / não usado:** FAQ ou errata oficial (a biblioteca brasileira não tem; a página da IELLO só lista o manual). Nada foi tirado de fórum, resenha ou vídeo.

## 3. Glossário (edição brasileira, KOT201)

| Termo no manual BR | Original (EN 2023) | Página | Função |
|---|---|---|---|
| Monstro | Monster | 1, 2 | O personagem de cada jogador |
| tabuleiro de Monstro | Monster board | 2 | Disco de Pontos de Vitória e disco de Pontos de Vida |
| figura de papelão | cardboard figure | 2 | Fica perto do jogador ou em Tóquio |
| tabuleiro de Tóquio | Tokyo board | 2 | Região de Tóquio |
| Cidade de Tóquio / Baía de Tóquio | Tokyo City / Tokyo Bay | 2, 3, 5 | Os dois lugares; "Tóquio" = ambos |
| em Tóquio | in Tokyo | 5 | Estar na Cidade ou na Baía |
| dados pretos / dados verdes | black dice / green dice | 2, 3 | 6 de todos; 2 só com cartas |
| Rolagem / rerrolar / pôr de lado | Roll / roll again / set aside | 4, 6 | |
| Pontos de Vitória | Victory Points | 1, 2, 4 | Estrela azul |
| Pontos de Vida | Life Points | 2, 4 | Coração vermelho; início 10, máximo 10 |
| cubos de Energia / banco / reserva | Energy cubes / pool / reserve | 2, 3, 4 | Raio |
| Atacar | smash (wound no glossário) | 4, 6 | Face de garra |
| Curar | heal | 4 | Face de coração |
| trinca | three-of-a-kind | 4 | Três faces iguais de 1, 2 ou 3 |
| Ceder | Yield | 4, 5, 6 | Sair de Tóquio após perder Vida para garras |
| eliminado | eliminated | 4 | A 0 de Vida; o disco mostra a caveira |
| cartas de Poder; Constante / Descarte | Power cards; Keep / Discard | 2 | |
| limpar (as três cartas) | sweep | 6 | Pagar 2 de Energia para trocar as três |
| Fim do Turno / Fim do Jogo | End of Turn / End of Game | 6 | |
| Rei de Tóquio | King of Tokyo | 1, 6 | O vencedor |
| fichas: Fumaça (3), Imitador (1), Encolhido (12), Envenenado (12) | Smoke, Mimic, Shrink, Poison | 2 | 28 fichas |

**Nomes do guia que o manual não escreve em palavras.** O manual mostra as faces dos dados só como ícones. O guia as chama de "1", "2", "3", "raio", "garra" e "coração", ligando cada uma ao título do manual (Pontos de Vitória, Energia, Atacar, Curar; p. 2 e 4). "Vida" e "Energia" sozinhas abreviam Pontos de Vida e cubos de Energia. O título "Ainda não precisa saber" e a palavra "vizinhos" (para Sopro de Fogo) são do guia.

## 4. Base de regras

Classificação: V = verificada (lida nesta sessão, com a imagem da página quando há ícone), I = interpretada (motivo na seção 5), L = lacuna.

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | 2 a 6 jogadores, 8+, 30 min | BR p. 1 (ícones da capa); IELLO | V | |
| R2 | Objetivo: primeiro a 20 Pontos de Vitória ou último sobrevivente | BR p. 1 "Resumo do Jogo e Objetivo" | V | |
| R3 | Componentes: 6 tabuleiros de Monstro, 6 dados pretos, 6 figuras, 66 cartas de Poder, 1 tabuleiro de Tóquio, cubos de Energia (sem número), 28 fichas (3 Fumaça, 1 Imitador, 12 Encolhido, 12 Envenenado) e 2 dados verdes | BR p. 2 | V | |
| R4 | Tabuleiro de Monstro: nome, disco de Pontos de Vitória, disco de Pontos de Vida | BR p. 2 | V | |
| R5 | Figura fica perto; ao controlar Tóquio vai para a Cidade ou a Baía | BR p. 2 | V | |
| R6 | "Tóquio" se refere aos dois lugares | BR p. 2 | V | |
| R7 | Faces: 1, 2, 3 (Pontos de Vitória), raio (Energia), garra (Atacar), coração (Pontos de Vida) | BR p. 2 | V (imagem) | |
| R8 | Carta de Poder: nome, custo em Energia, tipo, efeito; Constante fica até o fim salvo indicação; Descarte resolve e descarta | BR p. 2 | V | |
| R9 | Fichas e dados verdes só com certas cartas | BR p. 2 | V | |
| R10 | Preparação 1: Monstro, figura e tabuleiro; Vida 10, Vitória 0 | BR p. 3 | V | R4 |
| R11 | Preparação 2: tabuleiro de Tóquio no centro; 2 a 4 só Cidade; 5 a 6 Cidade e Baía | BR p. 3 | V | R6 |
| R12 | Preparação 3: embaralhar as cartas em baralho | BR p. 3 | V | |
| R13 | Preparação 4: três primeiras cartas viradas para cima ao lado do tabuleiro; fichas por perto | BR p. 3 | V | |
| R14 | Preparação 5: dados pretos no centro; verdes de lado | BR p. 3 | V | |
| R15 | Preparação 6: banco com todos os cubos | BR p. 3 | V | |
| R16 | Sentido horário; primeiro jogador: quem tirar mais garras com os 6 dados pretos; empate: continuam rolando até um só ter o maior número | BR p. 4 | V; quem rola no desempate: I (5.1) | |
| R17 | Turno: Role, Resolva, Entre em Tóquio, Compre cartas, Fim do turno | BR p. 4 | V | |
| R18 | Até três rolagens, pode parar; 1ª com 6 pretos (+ verdes se carta permitir); 2ª separa e rerrola o resto; 3ª pode rerrolar também os separados | BR p. 4; glossário p. 6 | V | |
| R19 | Resolver todos os dados, na ordem que quiser; valem as faces da última rolagem | BR p. 4 | V | R18 |
| R20 | Trinca de 1, 2 ou 3 dá o número em Pontos de Vitória; cada dado extra igual, +1 | BR p. 4; exemplo 1,1,1,1 = 2 | V (script) | R19 |
| R21 | Cada raio: 1 Energia do banco para a reserva; guardar até gastar | BR p. 4 | V | |
| R22 | Garra: perde 1 Vida quem não está no mesmo lugar; em Tóquio fere todos fora; fora fere todos em Tóquio (Cidade e Baía) | BR p. 4, 5 | V | R6 |
| R23 | Atacados em Tóquio por quem está fora podem Ceder ou ficar; quem cede ainda perde a Vida | BR p. 4 | V | R22 |
| R24 | 0 de Vida: caveira, eliminado; Constantes e Energia descartadas | BR p. 4 | V | |
| R25 | O primeiro a jogar não fere ninguém com garras | BR p. 4 | V | R22 |
| R26 | Vida perdida por carta de Poder é diferente da por garras; só por garras se pode Ceder | BR p. 4 "Observação"; p. 5 | V | R23 |
| R27 | Curar: fora de Tóquio +1 por coração; em Tóquio não (cartas podem); máximo 10 | BR p. 4 | V | |
| R28 | Exemplo de rolagem do Gigazaur: final 2,2,2,2,raio,garra: 3 Vitória, 1 Energia, CyberKitty perde 1 | BR p. 5 | V (script) | R18 a R22 |
| R29 | Entre em Tóquio: se ninguém está em Tóquio, tem de entrar na Cidade | BR p. 5 | V | |
| R30 | Só se pode Ceder ao perder Vida por garra de outro Monstro; o atacante tem de assumir o lugar do cedente no passo Entre em Tóquio | BR p. 5; glossário p. 6 | V | R23 |
| R31 | Nenhum Monstro começa em Tóquio; o primeiro entra na Cidade | BR p. 5 | V | R29 |
| R32 | 5-6: Cidade ocupada e Baía vazia, tem de entrar na Baía; os dois estão "em Tóquio"; a Baía tem os mesmos efeitos | BR p. 5 | V | R11 |
| R33 | Volta a 4 ou menos: sai da Baía na hora; se a Cidade estiver vazia, vai para ela | BR p. 5 | V | R32 |
| R34 | Efeitos de Tóquio: +1 Vitória ao entrar; +2 ao começar o turno em Tóquio; não cura com dados; só sai após perder Vida por garra | BR p. 5 | V | |
| R35 | Monstros em Tóquio não se atacam (Cidade e Baía) | BR p. 6, exemplo | V | R22, R32 |
| R36 | Comprar: uma ou mais das três, pagando o custo; repor na hora; carta nova já à venda | BR p. 6 | V | R8 |
| R37 | Limpar: 2 Energia, as três para o descarte, três novas à venda; enquanto tiver Energia, continua | BR p. 6 | V | |
| R38 | Exemplo Space Penguin: 10 menos 2 menos 3 = 5 | BR p. 6 | V (script) | R36, R37 |
| R39 | Fim do turno: efeitos de fim de turno; dados para a esquerda | BR p. 6 | V | |
| R40 | Fim: no final do turno em que um Monstro chegou a 20 ou só resta um; ele é o Rei de Tóquio | BR p. 6 | V | |
| R41 | Exemplo de 5 jogadores (sequência MekaDragon, Gigazaur, Space Penguin, The King, CyberKitty, MekaDragon) | BR p. 6 | V | R30 a R35 |
| R42 | 20 e 0 no mesmo turno por carta: eliminado; precisa sobreviver ao turno; todos eliminados juntos: todos perdem | BR p. 7 | V | R40 |
| R43 | Cartas não dão Vida acima de 10, salvo Constante | BR p. 7 | V | R27 |
| R44 | Imitador, Sopro de Fogo, Oportunista, Metamorfose, Cuspe Envenenado e Raio de Encolhimento (esclarecimentos) | BR p. 7 | V | |
| R45 | Eliminação do Monstro da Cidade com 5 ou 6 em jogo e a Baía ocupada | não coberto | L (5.3) | R32, R33 |
| R46 | Dois Monstros a 20 no mesmo turno | não coberto | L | R40 |
| R47 | Regra opcional para 2 jogadores (Energia em vez de pontos em Tóquio) | só EN 2023, p. 5; ausente no BR | diferença de edição (seção 6) | R34 |
| R48 | O que volta para a caixa | não coberto | L (o guia diz que o manual não diz) | |
| R49 | Duas trincas na mesma rolagem (1,1,1,2,2,2) | o manual não dá exemplo | L; o guia não usa esse caso | R20 |

## 5. Ambiguidades e escolhas

1. **Desempate do primeiro jogador (R16, I).** "Os jogadores continuam rolando os dados até que apenas um deles tenha o maior número" não diz se rolam todos ou só os empatados. O guia diz isso num `[!edicao]` e manda combinar.
2. **Quem entra depois de ceder (R30).** O passo 3 da p. 5 só fala de "se ninguém estiver em Tóquio"; o glossário da p. 6 completa: o atacante "tem de assumir o lugar do cedente". O guia junta as duas no passo a passo "Entre em Tóquio". Verificada, não interpretada.
3. **Cidade vazia com a Baía ocupada (R45, L).** Com 5 ou 6 Monstros ainda em jogo, se o da Cidade é eliminado, nem a regra de entrada (que exige "ninguém em Tóquio") nem a da Baía (que exige a Cidade ocupada) cobrem quem vai para a Cidade. O guia diz que o manual não regula e manda combinar.
4. **Tempo do bônus de começar o turno em Tóquio.** O manual diz "se começar seu turno em Tóquio" (p. 5) e, no exemplo, "O MekaDragon começa o turno em Tóquio e, por isso, ganha 2" antes de rolar (p. 6). O guia põe o bônus no começo do turno, antes da rolagem.
5. **Curar e entrar no mesmo turno.** Os dados se resolvem no passo 2 e a entrada é o passo 3 (p. 4 e 5): quem está fora cura com os corações antes de entrar. O guia não insiste nesse ponto; a ordem dos passos já o mostra.
6. **Cuspe Envenenado e Raio de Encolhimento.** O manual brasileiro só diz que as fichas saem fora de Tóquio "usando coração"; o efeito das cartas está nelas mesmas (o manual em inglês reproduz o texto das cartas: cada ficha sai com um coração em vez de curar 1). O guia não detalha o efeito das cartas, que está impresso nelas.

## 6. Diferenças entre edições

| Ponto | BR KOT201 (2016) | EN IELLO 11-2023 |
|---|---|---|
| Regras do turno, preparação, fim | iguais | iguais |
| Partida a 2 | sem regra especial | regra opcional: ao entrar em Tóquio, 1 Energia em vez de 1 Vitória; ao começar o turno em Tóquio, 1 Energia em vez de 2 Vitória (p. 5) |
| Glossário "Ceder" | "só pode Ceder Tóquio após perder Vida por causa de garra de outro Monstro. O Monstro que está atacando tem de assumir o lugar do cedente no passo Entre em Tóquio" | "may Yield Tokyo only after being wounded" (sem a frase do atacante no glossário; a entrada de quem atacou aparece no exemplo de 5 jogadores) |
| Oportunista | só o esclarecimento | reproduz também o texto da carta |

O tutorial segue o BR e põe a regra opcional para 2 num `[!edicao]`, como do manual em inglês.

## 7. Erros comuns antecipados

Sem fonte de comunidade (o padrão não permite usá-la como regra, e não procurei fóruns). Os erros escolhidos saem das próprias observações e frases em negrito do manual: par não pontua (a regra fala só de trinca, p. 4); corações não curam em Tóquio (p. 4 e 5, "Observação"); sair de Tóquio só depois de garra (p. 4, 5 e 6, repetido três vezes no manual); dano de carta não permite ceder (p. 4, "Observação"); quem cede perde a Vida do mesmo jeito (p. 4).

## 8. Mapa instrucional

| Classe de tarefa | Informação de apoio (Para entender) | Informação procedural (Passo a passo) | Tarefas | Prática específica |
|---|---|---|---|---|
| Montar a mesa | seção de montagem: componentes e função | 6 passos da p. 3, tabela por número de jogadores | pergunta `??` final | |
| Primeiro turno (4 min) | A ideia do jogo (4 termos) | 5 passos do turno | resolvido (1º jogador), complete (atacar e entrar), sua vez (em Tóquio) | |
| Etapa 1: dados | por que só trinca pontua | Role; Resolva | resolvido (exemplo do manual), complete, sua vez | treino de contagem de trinca (3 itens) |
| Etapa 2: Tóquio | o custo e o ganho de Tóquio; saída vigiada | Ficar ou ceder; Entre em Tóquio | resolvido (exemplo de 5 jogadores do manual), complete, sua vez | |
| Etapa 3: cartas e fim | tipos de carta | Compre; Fim do turno; Fim da partida | resolvido (Space Penguin), complete, sua vez | |

Adiado para depois do primeiro turno: ceder Tóquio, Baía, tipos de carta e limpar. Agrupado: os efeitos de Tóquio ficaram num só passo a passo e numa tabela da folha de consulta. Limite: um texto não observa o leitor nem ajusta o apoio a ele.

## 9. Figuras e vídeo

Recortes da folha do manual (PDF raster de 2016, resolução baixa nas ilustrações; renderizado a 250 dpi, só a parte gráfica, `.webp` qualidade 80, até 1000 px), em `como-jogar/king-of-tokyo/figuras/`:

| Arquivo | Origem | Onde entra |
|---|---|---|
| setup-1-monstro.webp | p. 3, The King e o tabuleiro dele | montagem, passo 1 |
| tabuleiro-monstro.webp | p. 2, tabuleiro do CyberKitty com as setas Pontos de Vitória, Nome, Pontos de Vida (rótulos do próprio diagrama) | montagem, passo 1 |
| setup-2-toquio.webp | p. 3, tabuleiro de Tóquio | passo 2 |
| setup-3-baralho.webp | p. 3, baralho | passo 3 |
| setup-4-cartas-fichas.webp | p. 3, três cartas e fichas (dois recortes lado a lado) | passo 4 |
| setup-5-dados.webp | p. 3, dados pretos e dados verdes (dois recortes lado a lado) | passo 5 |
| setup-6-energia.webp | p. 3, banco de Energia | passo 6 |
| preparacao.webp | p. 3, a mesa inteira | fim dos passos |
| exemplo-rolagem.webp | p. 5, as três fileiras de dados do exemplo do Gigazaur, empilhadas, sem o texto | etapa 1 |
| exemplo-5-jogadores.webp | p. 6, tabuleiro e Monstros no início do exemplo | etapa 2 |
| carta-de-poder.webp | p. 2, carta com as setas Custo, Nome, Tipo, Efeito (rótulos do diagrama) | etapa 3 |

Fotos: a pasta `como-jogar/king-of-tokyo/fotos/` é de outro agente e não existia ao fim desta sessão; a seção de montagem não usa foto. Quando `fotos/mesa-1.webp` existir, pode entrar logo depois do quadro "preparacao", com o crédito de `fotos/fontes.json`.

## 10. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos` aplicada ao texto): nenhum aviso. JSON: nenhum aviso.
- `python3 tools/checar_comece.py docs/como-jogar/king-of-tokyo/tutorial.md`: "seção Comece a jogar dentro da diretriz".
- Conversão de prova com `tools/como_jogar_md.pagina()` gerada só no scratchpad (`render/index.html`): sem erro, 11 figuras.
- Contas: `scripts/contas.py` no scratchpad (trincas, Energia, Vida, exemplo do Space Penguin). Resultados conferem com o texto.
- Extensão: `wc -w` 5.211 (com marcação, legendas e URLs); contagem `\w+` sem as linhas de figura e vídeo: 4.611. Passa um pouco do alvo de 4.500 por causa das tabelas de componentes e de faces e do exemplo de 5 jogadores, que é a única forma de mostrar Cidade e Baía funcionando juntas. A primeira versão tinha 5.566 e foi cortada (exemplo de cura, segundo treino, dicas, passos repetidos).
- Legibilidade (Flesch adaptado, Martins et al. 1996, `Arcvalion_gospel/tools/discipulado/legibilidade.py --guia`): índice 87,1 ("fácil"), 11,5 palavras por frase, 1,77 sílaba por palavra. As opções de múltipla escolha e as tabelas contam como frases e puxam a média. É informação, não meta. O medidor acusa "linhas com travessão" por causa do hífen das listas de opções; não há travessão.

## 11. Dados do topo (conteudo/como-jogar/king-of-tokyo.json)

| Campo | Valor | Fonte |
|---|---|---|
| jogadores, duracao, idade | 2 a 6, 30 min, 8+ | capa do manual BR (p. 1); IELLO |
| edicao | Edição Galápagos | créditos do manual BR (p. 8) |
| genero | Dados · Família | classificação do guia, a partir do jogo de dados para 8+ (p. 1) |
| etapas | 3 | |
| leitura_min | 17 | cerca de 4.600 palavras a 270 por minuto, a mesma relação usada em Dixit e Azul |
| resenha | null | não há resenha no site |
| publicar | false | só depois da auditoria independente |
