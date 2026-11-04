# Dossiê: Como Jogar Coup

Entrega 1 da linha COMO JOGAR para *Coup* (jogo base). Produzido em 04/11/2026 (rotina diária) seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e os ajustes do pedido: jogo leve, 3.500 a 4.500 palavras, 3 etapas, figuras em `como-jogar/coup/figuras/`, sem pasta `fotos`.

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Resenha no Elite:** não há (`/coup/` e `conteudo/coup.json` não existem). `"resenha": null` no JSON.
- **Complexidade:** jogo leve, de 8 páginas de regra. O que exige explicação é a sequência anúncio, contestação, bloqueio e contestação do bloqueio, e a diferença entre ação bloqueada (moedas ficam gastas) e ação contestada com sucesso (moedas voltam). Por isso 3 etapas.
- **Procura real (04/11/2026):** autocompletar do Google para "como jogar coup": "como jogar coup", "com baralho", "de 2", "com 2 pessoas", "a reforma", "disney", "com 4 pessoas", "com 3 pessoas", "com religião", "online". YouTube: "como jogar coup", "expansão", "de 2", "a reforma", "disney", "de 2 jogadores". A busca por partida de 2 é forte; o tutorial dá a regra de 2 jogadores, a variante e a divergência de tradução em "Situações especiais". A Reforma e Coup Disney ficam fora (são outros conjuntos de regras).

## 2. Fontes

### 2.1 O que foi tentado, na ordem do pedido

| Tentativa | Resultado |
|---|---|
| `mandala.com.br` (robots.txt lido; home e sitemap com 234 URLs) | O domínio é uma loja de artigos budistas, não a editora de jogos. Nenhuma página de Coup ou de manual |
| `mandalajogos.com.br`, `www.mandalajogos.com.br`, `mandalajogos.com` | Não existem: consulta DNS (dns.google) devolve NXDOMAIN; o proxy recusou a conexão |
| Grok Games, `https://loja.grokgames.com.br/coup` (robots.txt lido; Crawl-delay de 10 s respeitado) | Página oficial do produto Coup, código **MDL0000**, marca Grok Games, "indisponível". Traz a descrição do jogo com os nomes das ações em português, mas **nenhum manual** em PDF. As imagens da caixa na página mostram "Segunda Edição", "Inclui expansão A Reforma", 36 cartas, 30 moedas, 14+, 2 a 6 jogadores, 15 a 20 minutos |
| Loja Bravo Jogos, página "Jogo Coup 2ª Edição (inclui A Reforma)", marca Grok Games | Lista os componentes (25 cartas de personagem, 5 de Inquisidor, 6 de referência, 24 moedas de valor 1, 6 de valor 5) e liga o "Manual de Regras" a um arquivo do Google Drive. **Incidente:** o arquivo foi baixado uma vez por `drive.google.com/uc` antes de eu ler o robots.txt do Drive, que não permite esse caminho (nem `drive.usercontent.google.com`). A cópia foi apagada sem ser aberta além do `file` (PDF, 8 páginas, 1.970.557 bytes) e não foi usada |
| Ludopedia, aba de arquivos de Coup | 403 (Cloudflare). Não contornado |
| Indie Boards & Cards, `https://indieboardsandcards.com/our-games/coup/` (robots.txt lido) | Página oficial do jogo (15 min, 2 a 6, 13+), sem PDF de regras. A lista pública de mídias do WordPress (371 itens) não tem PDF de Coup |
| La Mame Games (Rikki Tahta), `sites.google.com/view/la-mame-games` | Página da edição original *Coup: City State*, sem PDF de regras do jogo base |
| Wayback Machine (para PDF antigo da IBC) | Conexão derrubada três vezes pelo caminho de rede da sessão. Não usado |

**Conclusão:** não há manual da Mandala acessível no site da editora (o domínio não existe mais) nem no da Grok. A editora de origem também não publica o PDF no próprio site.

### 2.2 Fontes usadas

| Fonte | Versão | Onde | Por que vale como oficial |
|---|---|---|---|
| **Livreto brasileiro** *Coup: livreto de regras*, FunBox Jogos | PDF de 8 páginas (325,98 × 467,72 pt), Adobe InDesign CC, criado em 03/05/2014; créditos: game design Rikki Tahta, La Mame Games; desenvolvimento Haig Tahta e Sacha Tahta; design gráfico Luis Francisco; ilustração Weberson Santiago; tradução Tatiane Cappelari; "descubra mais ... em www.funboxjogos.com". SHA-256 `e73c8be890d23a096edc2bbc21417825831caa7e60e982344d573324b9fc75b4`, 1.970.557 bytes | Cópia em `https://www.boardgamesbot.com/assets/games-library/coup/manual_pt_br.pdf?raw=1` (assistente de regras de terceiros; robots.txt permite `/assets/games-library/`). Baixado em 04/11/2026 | É o arquivo de diagramação da editora (InDesign, créditos completos, mesma arte da caixa da Grok). Tem exatamente o tamanho e o número de páginas do arquivo que a loja Bravo Jogos liga como manual do Coup 2ª Edição da Grok. A lista de componentes do livreto (25 + 5 + 6 = 36 cartas; 24 + 6 = 30 moedas) bate com o verso da caixa da Grok (36 cartas, 30 moedas), e a página da Grok usa a mesma tradução, frase por frase ("Troque de zero a duas destas cartas ... e devolva duas cartas para o Baralho da Corte") |
| **Manual original em inglês**, Indie Boards & Cards | PDF de 8 páginas, InDesign CS6, criado em 25/09/2018, tema The Resistance, ilustração Jarek Nocoń, "www.Indieboardsandcards.Com" | Cópia em `https://www.kingpandagames.com/wp-content/uploads/2026/07/coup-official-rulebook.pdf` (site de resenhas; robots.txt permite). Baixado em 04/11/2026 | Arquivo de diagramação da IBC, com créditos e anúncios da editora. Usado só para conferir tradução e o número de cartas |
| Página do produto Coup na Grok Games e imagens da caixa | Consulta de 04/11/2026 | https://loja.grokgames.com.br/coup | Dados do topo da página (jogadores, duração, idade) e nomes dos termos |
| FAQ ou errata oficial | Nenhuma encontrada | Sites da IBC, Grok e La Mame | Lacuna |

**Aviso ao editor (decisão sua):** o pedido aceita cópia em site de loja quando for o PDF oficial da editora. Aqui o PDF é oficial, mas da **FunBox**, editora brasileira de 2014 que não existe mais, e não da Mandala; e a cópia usada está num site de terceiros que não é loja (a loja Bravo liga o mesmo arquivo pelo Google Drive, que eu não pude usar por causa do robots.txt). A ligação FunBox, Mandala e Grok não está escrita em nenhuma página oficial que eu tenha lido: o que existe é o código MDL0000 da Grok, a mesma arte e a mesma tradução. Por isso o tutorial diz "livreto da edição brasileira (FunBox Jogos, 2014)" e não "manual da Mandala", e o JSON diz "Edição brasileira (livreto FunBox Jogos)". Se o editor achar que isso não basta, a alternativa é trocar a linha 3 pelo aviso de "manual oficial em inglês" do BRIEF; as regras do tutorial não mudam, salvo a moeda do jogo de 2 (seção 5.1).

### 2.3 Como os manuais foram lidos

Os dois PDFs têm camada de texto; foram extraídos com `pdftotext -layout`, página a página, e lidos inteiros. Arquivos no scratchpad, fora do repositório:

- `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/coup/manual_br/coup_ptbr.pdf` e o texto por página `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/coup/manual_br/coup_ptbr_paginas.txt`
- `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/coup/en/coup_en.pdf` e `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/coup/en/coup_en_paginas.txt`

**Paginação.** O livreto brasileiro não imprime número de página. O tutorial conta a capa como p. 1: p. 2 conteúdo e preparação; p. 3 objetivo, influência e o jogo; p. 4 ações, ações gerais, Duque e Assassino; p. 5 Capitão, Embaixador e ações contrárias; p. 6 contestações e notas; p. 7 exemplo de jogo; p. 8 dois jogadores, variantes e créditos. O inglês não tem capa no arquivo e começa uma página antes (Set-Up na p. 1, regra de 2 jogadores na p. 7).

**Dados da caixa.** Verso da caixa da Grok (imagem da página oficial): 14+, 2 a 6, 15 a 20 minutos. A IBC indica 13+, 2 a 6, 15 min; a La Mame (City State), 10+, 3 a 6, 10 a 15 min. O JSON usa a caixa brasileira atual.

## 3. Glossário (edição brasileira)

O tutorial usa só estes nomes, sempre os mesmos.

| No tutorial (= livreto BR) | Original (IBC) | Página BR | O que é |
|---|---|---|---|
| carta de personagem | character card | 2 | As cartas de Duque, Assassino, Capitão, Embaixador, Condessa |
| influência | influence | 3 | Carta de personagem virada para baixo à frente do jogador |
| Baralho da Corte | Court deck | 2, 5, 6 | Cartas que sobram, viradas para baixo |
| Tesouro Central | Treasury | 2, 4 | Moedas que sobram |
| moeda / moeda de ouro (equivale a 5) | coin | 2 | Dinheiro, sempre à vista |
| carta de ajuda | summary card | 2 | Resumo das ações |
| ação / ações gerais / ações de personagem | actions / general / character actions | 4 | O que o jogador faz na vez |
| Renda | Income | 4 | +1 moeda |
| Ajuda Externa | Foreign Aid | 4, 5 | +2 moedas, bloqueável pelo Duque |
| Golpe de Estado (Golpe) | Coup | 4 | Paga 7, alvo perde influência |
| Duque, Taxas | Duke, Tax | 4 | +3 moedas |
| Assassino, Assassinar | Assassin, Assassinate | 4 | Paga 3, alvo perde influência |
| Capitão, Extorquir (Extorsão) | Captain, Steal | 5 | Tira 2 moedas de outro |
| Embaixador, Trocar | Ambassador, Exchange | 5 | Troca cartas com o Baralho da Corte |
| Condessa | Contessa | 5 | Bloqueia Assassinato |
| ação contrária / bloquear | counteraction / block | 5 | Bloqueio da ação de outro |
| contestar / contestação (o livreto também diz "desafio") | challenge | 6 | Duvidar do personagem anunciado. O tutorial usa só "contestação" |
| exilado / fora do jogo | exiled / out of the game | 3 | Quem perdeu as duas influências |
| Inquisidor (Trocar, Investigar) | Inquisitor | 8 | Personagem da variante; não existe no manual IBC usado |

## 4. Base de regras

Marcação: `[BR p. N]` livreto brasileiro, `[EN p. N]` manual inglês. Classificação: `[verificada]`, `[interpretada]`, `[lacuna]`. Frases entre aspas copiadas do texto extraído (conferidas por grep, seção 9).

### 4.1 Objetivo e fim

| # | Regra | Fonte e trecho | Classe |
|---|---|---|---|
| R1 | Objetivo: eliminar a influência dos outros e ser o último | [BR p. 3] "Eliminar a influência de todos os outros jogadores" | verificada |
| R2 | Perder influência: o dono escolhe qual carta virar para cima; carta revelada não dá mais influência | [BR p. 3] "O jogador sempre escolhe qual" | verificada |
| R3 | Quem perde as duas influências está fora na hora, deixa as cartas para cima e devolve as moedas ao Tesouro Central | [BR p. 3] "devolve todas as suas moedas ao Tesouro Central" | verificada |
| R4 | O jogo termina quando resta um jogador | [BR p. 3] "O jogo termina quando houver apenas um jogador restante" | verificada |
| R5 | Não existe segundo lugar | [BR p. 6] "Não existe segundo lugar" | verificada |

### 4.2 Preparação

| # | Regra | Fonte e trecho | Classe |
|---|---|---|---|
| R6 | 2 cartas viradas para baixo por jogador; pode olhar quando quiser | [BR p. 2] "Duas cartas viradas para baixo" | verificada |
| R7 | Restantes formam o Baralho da Corte | [BR p. 2] "formando o Baralho da Corte" | verificada |
| R8 | 2 moedas por jogador, sempre visíveis; o resto é o Tesouro Central | [BR p. 2] "O dinheiro de cada jogador deve permanecer sempre visível" | verificada |
| R9 | 1 carta de ajuda por jogador, só referência | [BR p. 2] "Esta é apenas para referência" | verificada |
| R10 | Começa o vencedor da última partida | [BR p. 2] "O vencedor da última partida é o primeiro a jogar" | verificada |
| R11 | Com 2 a 6 jogadores, usar 3 cartas de cada personagem (15) | Deduzido: [BR p. 7] "As 9 cartas de personagem restantes" (3 jogadores); [BR p. 8] "Remova todas as 3 cartas de Embaixador" e 4 ou 5 de cada para 7 a 10 jogadores; [EN p. 1] "15 character cards" | interpretada (o livreto lista 25 cartas e não diz quantas usar) |
| R12 | Moeda de ouro vale 5 | [BR p. 2] "(equivalente a 5 moedas)" | verificada |

### 4.3 Turno e ações gerais

| # | Regra | Fonte e trecho | Classe |
|---|---|---|---|
| R13 | Turnos no sentido horário; uma ação por vez; não pode passar | [BR p. 3] "Não é permitido passar a vez" | verificada |
| R14 | Depois da ação, os outros podem contestar ou bloquear; sem isso, a ação é bem-sucedida | [BR p. 3] "ela é automaticamente bem sucedida" | verificada |
| R15 | Só se escolhe ação que se pode pagar | [BR p. 4] "qualquer ação que quiser e puder pagar" | verificada |
| R16 | Ação de personagem: declarar o personagem; pode ser blefe; só revela se contestado | [BR p. 4] "Ele pode estar dizendo a verdade ou blefando" | verificada |
| R17 | Começou a vez com 10 ou mais moedas: Golpe obrigatório como única ação | [BR p. 4] "deve dar um Golpe naquele turno como sua única ação" | verificada |
| R18 | Renda: +1 moeda | [BR p. 4] "Pegue 1 moeda do Tesouro Central" | verificada |
| R19 | Ajuda Externa: +2, bloqueável pelo Duque | [BR p. 4] "(Pode ser bloqueada pelo Duque)" | verificada |
| R20 | Golpe de Estado: paga 7, alvo perde influência na hora, sempre bem-sucedido | [BR p. 4] "O golpe é sempre bem sucedido" | verificada |
| R21 | Golpe não pode ser bloqueado | [BR p. 7] "Um golpe não pode ser bloqueado" (exemplo) e R20 | verificada |
| R22 | Ações gerais não podem ser contestadas (só ação ou ação contrária de personagem) | [BR p. 6] "Qualquer ação ou ação contrária de personagem" e [BR p. 7] "Ele não pretende influenciar nenhum personagem e ninguém pode bloqueá-lo" (Renda) | verificada (por combinação de duas frases) |

### 4.4 Personagens e ações contrárias

| # | Regra | Fonte e trecho | Classe |
|---|---|---|---|
| R23 | Duque, Taxas: +3 | [BR p. 4] "Pegue 3 moedas do Tesouro Central" | verificada |
| R24 | Assassino: paga 3, alvo perde influência; bloqueável pela Condessa | [BR p. 4] "(Pode ser bloqueada pela Condessa)" | verificada |
| R25 | Capitão: tira 2 de outro; se ele tiver 1, tira 1; bloqueável por Capitão ou Embaixador | [BR p. 5] "Se ele só tiver uma moeda, pegue apenas uma" | verificada |
| R26 | Embaixador: pega 2 do Baralho da Corte, troca de 0 a 2, devolve 2 | [BR p. 5] "Troque de zero a duas destas" | verificada |
| R27 | Ação contrária funciona como ação de personagem: pode ser blefe, pode ser contestada, sem contestação é bem-sucedida | [BR p. 5] "Ações contrárias podem ser contestadas" | verificada |
| R28 | Ação bloqueada: as moedas pagas não voltam | [BR p. 5] "todas as moedas gastas para pagar a ação não serão devolvidas" | verificada |
| R29 | Duque bloqueia Ajuda Externa: qualquer jogador | [BR p. 5] "Qualquer jogador que reivindicar o Duque" | verificada |
| R30 | Condessa: só o jogador que está sendo assassinado | [BR p. 5] "O jogador que está sendo assassinado pode" | verificada |
| R31 | Capitão ou Embaixador bloqueiam Extorsão: só o jogador extorquido | [BR p. 5] "O jogador que está sendo extorquido pode" | verificada |
| R32 | A Condessa não tem ação na vez | [BR p. 4] lista de ações de personagem sem a Condessa | verificada (pela ausência; não foi para o tutorial como bloco próprio) |

### 4.5 Contestação

| # | Regra | Fonte e trecho | Classe |
|---|---|---|---|
| R33 | Qualquer jogador contesta, envolvido ou não | [BR p. 6] "independentemente de estarem ou não envolvidos na ação" | verificada |
| R34 | A contestação vem logo após o anúncio; depois que o jogo segue, não cabe mais | [BR p. 6] "a ação não poderá mais ser contestada" | verificada |
| R35 | O contestado mostra ou não; se não mostra, perde; se mostra, o contestante perde | [BR p. 6] "Se puder, e quiser, o contestante perde" | verificada |
| R36 | Quem perde a contestação perde uma influência na hora | [BR p. 6] "Quem perder a contestação imediatamente perde uma influência" | verificada |
| R37 | Quem ganha devolve a carta, reembaralha e pega outra; depois a ação é resolvida | [BR p. 6] "reembaralha as cartas e pega uma nova aleatoriamente" e "Em seguida, a ação ou ação contrária é resolvida" | verificada |
| R38 | Ação contestada com sucesso falha inteira e as moedas voltam | [BR p. 6] "moeda paga como o custo da ação é devolvida para o jogador" | verificada |
| R39 | Contestações são resolvidas antes da ação ou ação contrária | [BR p. 3] "Contestações são resolvidas antes de qualquer ação ou ação contrária" | verificada |
| R40 | Ordem prática: anúncio, contestação da ação, bloqueio, contestação do bloqueio, efeito | [BR p. 3] e o exemplo: [BR p. 7] "Ninguém contesta seu Assassino, mas Vanessa alega ter a Condessa" | interpretada (o livreto não dá a sequência em lista; o exemplo a segue) |
| R41 | Perigo duplo do Assassino | [BR p. 6] "É possível perder 2 influências em um turno" | verificada |
| R42 | Negociação livre e não vinculativa; não mostrar cartas a outros; não dar nem emprestar moedas | [BR p. 6] "Nenhuma moeda pode ser dada ou emprestada" | verificada |

### 4.6 Situações especiais

| # | Regra | Fonte e trecho | Classe |
|---|---|---|---|
| R43 | 2 jogadores: cada jogador começa com 1 moeda | [BR p. 8] "cada jogador recebe apenas uma moeda" | verificada (diverge do inglês, 5.1) |
| R44 | Variante de 2: 3 conjuntos de 5; escolha secreta de 1; terceiro conjunto embaralhado, 1 para cada, 3 no Baralho da Corte | [BR p. 8] "Divida as cartas em 3 conjuntos de 5" | verificada |
| R45 | Inquisidor: substitui as 3 cartas de Embaixador; Trocar ou Investigar, uma por turno; bloqueia Extorsão | [BR p. 8] "Como uma ação contrária, o Inquisidor pode bloquear Extorsão" | verificada |
| R46 | 7 ou 8 jogadores: 4 de cada (20); 9 ou 10: 5 de cada (25); recomendado para experientes | [BR p. 8] "Inclua 4 de cada um dos personagens selecionados" | verificada |

### 4.7 Lacunas

| # | O livreto não diz | Tratamento no tutorial |
|---|---|---|
| L1 | Capitão contra jogador com 0 moedas | `[!edicao]` em Situações especiais: combinar antes |
| L2 | Quem começa a primeira partida de um grupo | Idem |
| L3 | Quem contesta ou bloqueia primeiro quando dois querem ao mesmo tempo | Idem |
| L4 | O que fazer se o Tesouro Central acabar | Não mencionado (improvável com 54 em moedas) |
| L5 | Quantas cartas usar com 2 a 6 jogadores | Resolvida como R11 `[interpretada]`, com `[!edicao]` na etapa 1 |

### 4.8 Erros comuns e de onde vem a evidência

Não usei fórum como fonte. Os erros marcados com `[!atencao]` vêm do próprio livreto, que dedica notas a eles: o perigo duplo (p. 6), o momento da contestação ("não poderá mais ser contestada", p. 6), a diferença entre moeda devolvida (contestação, p. 6) e moeda gasta (bloqueio, p. 5), e a obrigatoriedade do Golpe com 10 moedas (repetida duas vezes na p. 4). O bloqueio da Ajuda Externa por qualquer jogador foi marcado por contraste com a Condessa e o Capitão, que só o alvo usa (p. 5).

## 5. Divergências entre edições

### 5.1 Moedas no jogo de 2 (BR p. 8; EN p. 7)

BR: "cada jogador recebe apenas uma moeda no início do jogo". EN: "the starting player receives only 1 coin". É diferença de tradução ou de versão; sem errata, segui o livreto brasileiro e avisei em `[!edicao]`.

### 5.2 Número de cartas (BR p. 2; EN p. 1)

BR: 25 cartas de personagem (5 de cada) e 5 de Inquisidor; EN: 15 (3 de cada). As regras de base são as mesmas; o exemplo do livreto brasileiro usa 15. A página da Grok fala em "quinze cartas com três cópias de cinco personagens", mas a caixa da Segunda Edição diz 36 cartas. Registro `[interpretada]` em R11.

### 5.3 O Inquisidor e mais de 6 jogadores

Só no livreto brasileiro (p. 8). O manual IBC de 2018 não traz essas variantes. Entraram como `[!mais]` em Situações especiais.

### 5.4 Nomes

O livreto usa "contestação" e "desafio" para a mesma coisa (p. 6); o tutorial usa só "contestação". "Extorquir" (ação) e "Extorsão" (no bloqueio) seguem o livreto.

## 6. Plano instrucional

Três classes de tarefa, da mais simples para a mais completa:

1. **Etapa 1, montar a mesa e usar as ações gerais.** Informação de apoio: o que é influência, Baralho da Corte e Tesouro Central. Procedural: preparação e ações gerais. Exemplo resolvido (Golpe), complete (10 moedas), sua vez (pagar, tamanho do Baralho da Corte).
2. **Etapa 2, usar personagens e bloquear.** Apoio: ação de personagem e ação contrária são declarações, não provas. Procedural: as quatro ações e os três bloqueios. Exemplo resolvido (Assassino bloqueado), complete (Capitão contra 1 moeda), sua vez (Duque bloqueia Ajuda Externa de terceiro).
3. **Etapa 3, contestar.** Apoio: preço do blefe e da dúvida; a carta trocada esconde a mão. Procedural: os seis passos da contestação. Exemplo resolvido (Assassino contestado, moedas voltam), complete (Duque provado), sua vez (perigo duplo, momento da contestação).

Prática específica: só no que se erra caro (perigo duplo, moedas gastas ou devolvidas), na avaliação final de 5 perguntas.

Redução de carga: o "Comece" usa só as ações possíveis com 2 moedas (Renda, Ajuda Externa, Duque, Capitão, Embaixador) e a contestação em uma linha; Golpe, Assassino e Condessa ficam para as etapas. Variantes, 2 jogadores e lacunas vão para "Situações especiais" em blocos `[!mais]` e `[!edicao]`.

Limite: um texto não observa o leitor nem ajusta o apoio a ele.

## 7. Extensão

`wc -w` do tutorial: 4.514 (inclui marcação de opções, URLs e legendas). Contagem `\w+`: 4.213. Dentro do alvo de 3.500 a 4.500 pela contagem de palavras com letras; pelo `wc` passa 14 palavras, quase todas marcação `- ( )` das opções. A primeira versão tinha 6.157 e foi cortada (treino rápido, perguntas repetidas, dicas).

## 8. Contas

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/coup/scripts/contas.py`. Saída conferida:

| Exemplo | Conta | Resultado |
|---|---|---|
| Baralho da Corte, 3 / 4 / 5 jogadores | 15 − 2N | 9 (bate com BR p. 7) / 7 / 5 |
| Comece, Ana com o Duque | 2 + 3 | 5 |
| Comece, Bruno com Ajuda Externa bloqueada | 2 + 0 | 2 |
| Etapa 1, Golpe de Ana | 9 − 7 | 2 |
| Etapa 1, Carla com 10 | 10 − 7 | 3 |
| Etapa 2, Assassino bloqueado | 5 − 3 | 2 |
| Etapa 2, Capitão contra 1 moeda | Carla 4 + 1, Ana 1 − 1 | 5 e 0 |
| Etapa 3, Assassino contestado com sucesso | 4 − 3 + 3 | 4 |
| Etapa 3, Duque provado | 2 + 3 | 5 |
| Perigo duplo | 2 − 1 − 1 | 0, fora |
| Exemplo do livreto (conferência) | Vanessa 1, Sérgio 5 | bate com BR p. 7 |
| Tesouro em valor | 24 + 6 × 5 | 54 |

Todas as jogadas são legais: ninguém age com moeda que não tem, o Assassino só é usado com 3 ou mais, o Golpe com 7 ou mais.

## 9. Portões automáticos

| Portão | Resultado |
|---|---|
| Travessão (—) e meia-risca (–) no tutorial | 0 |
| `tools/vicios.py` (função `avisos`) no tutorial e no `coup.json` | 0 aviso |
| `tools/checar_comece.py docs/como-jogar/coup/tutorial.md` | ✅ dentro da diretriz |
| Exclamação fora das marcas de bloco | 0 |
| Conversor `tools/como_jogar_md.py` (função `pagina`, em memória, sem gravar) | Gera a página; 4 figuras e o vídeo reconhecidos |
| Frases entre aspas da base de regras contra o texto extraído | Conferidas por grep (ver auditoria) |
| Legibilidade | Não medida: o `legibilidade.py` citado no prompt fica em outro repositório e não foi adaptado nesta rotina |

## 10. Figuras e vídeo

O livreto não tem exemplos ilustrados de jogada: as únicas imagens são a capa e os retratos dos personagens ao lado das ações. As 4 figuras são recortes dessas imagens, extraídas do PDF com `pdfimages` (só a parte gráfica, sem texto do manual), gravadas em `.webp` qualidade 80 em `/home/user/Golden-Geek/como-jogar/coup/figuras/`:

| Arquivo | Origem | Onde entra |
|---|---|---|
| `capa.webp` (800 × 898) | Ilustração da capa, p. 1 | Seção 0 |
| `personagens.webp` (996 × 249) | Retratos de Duque e Assassino (p. 4), Capitão, Embaixador e Condessa (p. 5), lado a lado | Etapa 2, ações de personagem |
| `acoes-contrarias.webp` (771 × 222) | Retratos da coluna de ações contrárias, p. 5 | Etapa 2, bloqueios |
| `assassino-condessa.webp` (451 × 249) | Retratos do Assassino (p. 4) e da Condessa (p. 5) | Etapa 3, perigo duplo |

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/coup/scripts/figuras.py`.

**Vídeo.** Busca no canal Duque Board Games (`https://www.youtube.com/@DuqueBoardgames/search?query=coup`, `Accept-Language: pt-BR`, 04/11/2026): só "Conheça DISNEY COUP em 1 minuto", que é outro jogo. Canal da Grok Games (`@GrokGames/search?query=coup`): nenhum vídeo de Coup. Busca nos canais de regras: Romir Play House tem "Coup - Como Jogar"; Covil dos Jogos tem "Coup - Regras e Gameplay Ao Vivo". Escolhido o do Romir, que é de regras: oEmbed de `6UpW8dV2Oks` devolve título "Coup - Como Jogar", autor "Romir Play House". Sem tempo conferido dentro do vídeo; só o vídeo do topo, com `&t=0s`. Nenhum quadro baixado.

## 11. Dados do `conteudo/como-jogar/coup.json`

| Campo | Valor | Fonte |
|---|---|---|
| jogadores | 2 a 6 | Verso da caixa da Grok (imagem da página oficial); IBC e livreto (p. 8) também |
| duracao | 15 a 20 min | Verso da caixa da Grok |
| idade | 14+ | Verso da caixa da Grok (a IBC diz 13+) |
| edicao | Edição brasileira (livreto FunBox Jogos) | Seção 2.2 |
| genero | Blefe · Cartas | Descrição do jogo na Grok ("jogo de cartas") e no livreto (blefe, p. 2) |
| leitura_min | 21 | Cerca de 4.200 palavras a 200 por minuto |
| resenha | null | Não há resenha de Coup no site |
| publicar | false | Até a auditoria independente |
