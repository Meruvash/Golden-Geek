# Dossiê: Como Jogar Dixit

Entrega 1 da linha COMO JOGAR para *Dixit* (jogo base, edição atual). Produzido em 04/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; jogo leve: 3.500 a 4.500 palavras e 3 etapas; exercícios de múltipla escolha; essencial à vista e `[!mais]`; figuras do manual e vídeo). Rotina diária de 04/11/2026.

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. Edição brasileira atual da Asmodee (marca Galápagos), SKU DIX601, a "refresh" de 2026 com créditos de 2021 da Libellud.
- **Resenha no site:** não há `conteudo/dixit.json`. Durante esta sessão apareceu a pasta `dixit/fotos/` (criada às 19:42 por outro agente, que trabalha no mesmo repositório), mas sem o JSON da resenha a regra do BRIEF dá `"resenha": null`. O conversor (`tools/como_jogar_md.fotos_jogo`) já usa as fotos dessa pasta, se o `fontes.json` delas estiver aprovado; isso não depende deste trabalho.
- **Procura (04/11/2026):** o autocompletar do Google (`client=firefox&hl=pt-BR`, "como jogar dixit") devolveu: como jogar dixit, dixit odyssey, dixit de 2, dixit disney, dixit kids, dixit com 3 pessoas, dixit tabuleiro, dixit online, dixit com tabuleiro, dixit quest. O do YouTube: como jogar dixit, dixit disney, dixit odyssey, dixit tabuleiro. A pauta (`conteudo/como_jogar_pauta.json`) já registrava nota 11,0. As buscas "de 2", "com 3 pessoas", "disney" e "tabuleiro" foram respondidas nas Situações especiais, no vídeo e na etapa 1.
- **Complexidade:** um único tipo de turno, uma tabela de pontuação com dois casos e bônus, fim em 30 pontos e variante para 3. Jogo leve: três etapas.

## 2. Fontes

| Fonte | Arquivo | URL | Data |
|---|---|---|---|
| **Livro de regras da edição brasileira atual** (Asmodee; arquivo `DIX601_regras_v1.0.pdf`; InDesign "DIXIT_REFRESH_RULES_BR.indd"; créditos 2021 da Libellud; "Asmodee: Tradução: Paula Pizauro • Revisão: Camila Berka & Evelyn Trippo"). 4 páginas quadradas (742 x 742 pt), PDF criado em 23/02/2026, modificado em 09/06/2026, 26 MB | `<scratchpad>/dixit/dl/x3128/DIX601_regras_v1.0.pdf`; texto em `<scratchpad>/dixit/txt/dix601.txt` e por página em `txt/p1.txt` a `p4.txt`; páginas em PNG em `img/` | Biblioteca de downloads da Asmodee Brasil, https://www.asmodee.com.br/download-library, item 3128 "Dixit - SKU: DIX601", etiqueta Regras; arquivo https://api-prd.mundogalapagos.com.br/library-download/store/file?id=3128&tagId=2&group=b2c (ZIP, HTTP 200, sem login) | Baixado em 04/11/2026 |
| Livro de regras brasileiro anterior (DIX301, v2.0; criado em 18/11/2020, modificado em 16/04/2024; "Galápagos Jogos: Tradução: Paula Pizauro • Revisão: Evelyn Trippo") | `dl/x1666/DIX301_regras_v2.0.pdf`, texto `txt/dix301.txt` | mesma API, `store/file?id=1666&tagId=2&group=b2c` | 04/11/2026 |
| Manual brasileiro antigo (DIX001, "Livret de règle final brésilien", 2 páginas, junho de 2015, tradução de Thiago Brito) | `dl/x1664/DIXIT_BR_RULES.pdf`, texto `txt/dix001.txt` | mesma API, `id=1664` | 04/11/2026 |
| Manual brasileiro da Dixit: Disney Edition (DIX631, v1.0, modificado em 15/06/2026) | `dl/x3162/DIX631_regras_v1.0.pdf`, texto `txt/disney.txt` | mesma API, `id=3162` | 04/11/2026 |
| **Manual oficial em inglês da edição atual** (Libellud, "DIXIT_REFRESH_RULES_US-UK-AU_BD", 4 páginas, modificado em 07/08/2026) | `dl/lib/DIXIT_REFRESH_RULES_US-UK-AU_BD.pdf`, texto `txt/en.txt` | https://cdn.svc.asmodee.net/production-libelludv2/uploads/2026/08/DIXIT_REFRESH_RULES_US-UK-AU_BD.pdf, linkado em https://www.libellud.com/game/dixit/ | 04/11/2026 |
| Manual brasileiro hospedado pela Libellud (versão de 03/08/2021: mesmo texto do DIX301, créditos "Galápagos Jogos") | `dl/lib/DIXIT_REFRESH_RULES_BR_HD_compressed.pdf`, texto `txt/br_lib.txt` | mesma página da Libellud | 04/11/2026 |
| **Página oficial do jogo** (Libellud): "3 - 8 players", "8+", "30 min"; lista de componentes igual à da p. 2 do manual | HTML lido | https://www.libellud.com/game/dixit/ | 04/11/2026 |
| **Vídeo** "DIXIT: Disney Edition - Regras + Gameplay comentada!", Duque Board Games (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=zGwfQnQP0J8 | 04/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo)`, que se identifica como robô. O `robots.txt` da Asmodee Brasil só bloqueia carrinho, checkout, perfil, busca interna e listas; o da Libellud bloqueia busca, feed e conversor de imagens; o do YouTube bloqueia `/results` e APIs, não a página de busca do canal nem o oEmbed. A busca na biblioteca foi feita na API pública que a página usa (`api-prd.mundogalapagos.com.br/library-download/store/search?term=dixit`, 40 itens), a mesma das sessões de Azul, Ticket to Ride e Tiny Epic. Observação para o editor: a página `www.asmodee.com.br/download-library` e a API da loja (`/ccstore/v1/products/DIX601`) responderam "Access Denied" (Akamai) ao nosso User-Agent de robô. Não tentei outro User-Agent nem outro caminho para essas duas páginas; os dados do produto (jogadores, idade, duração) vieram da página oficial da Libellud. A API da biblioteca, em outro domínio, respondeu normalmente, como nas sessões anteriores.

**Qual manual é o atual.** A biblioteca lista três manuais da caixa básica: DIX001 (2015), DIX301 (2020/2024) e DIX601 (2026). O DIX601 é o mais novo, e o nome interno ("REFRESH") é o mesmo dos manuais atuais da Libellud. O texto de regras do DIX601 e do DIX301 é igual palavra por palavra, salvo vírgulas, hífens e os créditos ("Asmodee" no lugar de "Galápagos Jogos", com Camila Berka na revisão). O DIX001 é outra edição, com regras diferentes (seção 6).

**Paginação.** O manual não imprime número de página. O guia conta a capa como p. 1: p. 1 capa e nota do autor; p. 2 visão geral, componentes, como jogar, pontuação, fim do turno e da partida; p. 3 preparação, dicas para o narrador, exemplo de pontuação e partidas com 3; p. 4 expansões. As p. 2 e 3 foram lidas também como imagem (80 e 300 dpi), porque a pontuação está em quadros com ícones.

**Não obtido / não usado:** FAQ ou errata oficial (a biblioteca não tem; a página da Libellud lista só manuais, visão geral das cartas, kit de imprensa e papéis de parede). Nada foi tirado de fórum, resenha ou vídeo.

## 3. Glossário (edição brasileira, DIX601)

| Termo | Original (EN) | Página | Função |
|---|---|---|---|
| narrador | storyteller | 2 | Jogador da vez; escolhe a carta e dá a dica |
| dica | clue | 2, 3 | O que o narrador diz sobre a carta |
| enigma / Criar um enigma / Resolver o enigma | riddle / Create the riddle / Solve the riddle | 2 | Nomes das duas fases do turno |
| cartas Dixit | Dixit cards | 2 | 84 cartas ilustradas |
| tabuleiro de jogo | game board | 2 | Junta trilha, espaços de cartas e referência |
| trilha de pontuação | scoring track | 2, 3 | Onde andam os coelhos; "início da trilha" na preparação |
| espaços de carta (8) | card slots | 2 | Numerados; onde as cartas ficam expostas |
| referência para os jogadores | players' aid | 2 | Lembrete de como pontuar, no tabuleiro |
| disco de votação (8) | voting dial | 2 | Gira até mostrar o número votado |
| coelho de madeira (8) / coelhinho | wooden rabbit pawn | 2, 3 | Marcador de pontos |
| pilha de compra / pilha de descarte | draw pile / discard pile | 2, 3 | |
| fase de pontuação | scoring phase | 2 | |
| bônus | bonus | 2, 3 | 1 ponto por voto recebido na própria carta |
| Fim do turno / Fim da partida | End of turn / End of game | 2 | |
| Partidas com 3 jogadores | Playing with 3 players | 3 | Variante |

O manual usa o ícone de nuvem para "ponto". O tutorial diz "ponto" sempre.

## 4. Base de regras

Classificação: V = verificada (lida nesta sessão), I = interpretada (motivo dado), L = lacuna.

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | A cada turno, um jogador diferente é o narrador; marca pontos se outros adivinham a carta dele, mas não se todos adivinham | BR p. 2 "Visão geral" | V | |
| R2 | Os outros pontuam se descobrem a carta do narrador ou se a carta deles atrai votos | BR p. 2 | V | R1 |
| R3 | Componentes: livreto, 84 cartas, 8 discos, 8 coelhos, tabuleiro com trilha (A), 8 espaços de cartas (B), referência (C) | BR p. 2 | V | |
| R4 | 3 a 8 jogadores | Libellud, página do jogo; 8 discos e coelhos (p. 2); variante de 3 (p. 3) | V (página oficial) | |
| R5 | Preparação 1: cada jogador escolhe uma cor e pega coelho e disco | BR p. 3 | V | R3 |
| R6 | Preparação 2: coelho no início da trilha; ele indica os pontos recebidos | BR p. 3 | V | |
| R7 | Preparação 3: embaralhar as 84 cartas e dar 6 a cada um, viradas para baixo | BR p. 3 | V | |
| R8 | Preparação 4: as restantes formam a pilha de compra | BR p. 3 | V | |
| R9 | Primeiro narrador: o primeiro jogador a pensar numa dica | BR p. 2 "Como jogar" | V | |
| R10 | Narrador olha as 6 cartas, escolhe a que mais o inspira, sem revelar, e diz em voz alta uma dica que remeta à imagem (palavra ou frase) | BR p. 2 "Criar um enigma" | V | R1 |
| R11 | Cada outro jogador escolhe, entre as 6 da mão, a carta que melhor ilustra a dica e a entrega sem mostrar; o narrador embaralha com a dele | BR p. 2 | V | R10 |
| R12 | Dica: frase com qualquer número de palavras; trecho de obra existente (poesia, música, filme, provérbio); cantada, mímica ou onomatopeia | BR p. 3 "Dicas para o narrador" | V | R10 |
| R13 | Dica muito fácil (descritiva) ou muito difícil (abstrata, pessoal) arrisca não pontuar; buscar que pelo menos um, mas não todos, acerte | BR p. 3 | V (conselho do manual, tratado como dica no tutorial) | R16 |
| R14 | Narrador distribui as cartas ao acaso, viradas para cima, nos espaços do tabuleiro, números visíveis (6 jogadores: espaços 1 a 6) | BR p. 2 "Resolver o enigma" | V | R11 |
| R15 | Cada jogador, exceto o narrador, gira o disco até o número da carta que acha ser do narrador, sem mostrar; não pode votar na própria carta; revelação simultânea; disco sobre a carta votada | BR p. 2 | V | R14 |
| R16 | Narrador revela a carta e conta os votos. Todos ou nenhum votaram nela: narrador 0, os outros 2 cada | BR p. 2, quadro esquerdo | V | R15 |
| R17 | Alguns, não todos: narrador 3; quem votou nela 3; os outros 0 | BR p. 2, quadro central | V | R15 |
| R18 | Além disso, cada jogador (exceto o narrador) recebe 1 bônus por voto recebido na própria carta | BR p. 2, quadro direito "Além disso"; EN "In addition" | V; aplicação nos dois casos de R16/R17 é a leitura do "Além disso" e do layout em três quadros (seção 5, item 1) | R16, R17 |
| R19 | Coelho avança um espaço por ponto | BR p. 2 | V | |
| R20 | Fim do turno: cartas da votação para a pilha de descarte, virada para cima, longe do tabuleiro | BR p. 2 | V | |
| R21 | Cada jogador compra uma carta para completar 6 na mão | BR p. 2 | V | |
| R22 | Pilha de compra sem cartas suficientes para todos: o descarte é embaralhado para formar nova pilha | BR p. 2 "as cartas na pilha de descarte são embaralhadas"; EN p. 2 "the remaining cards and the discard pile are shuffled"; Disney BR p. 2 "as cartas remanescentes e a pilha de descarte" | I (seção 5, item 2) | R20, R21 |
| R23 | O jogador à esquerda do narrador será o próximo narrador | BR p. 2 | V | |
| R24 | Fim da partida: se, ao final de um turno, um ou mais jogadores obtiveram ou excederam 30, a partida acaba imediatamente | BR p. 2 | V | R19 |
| R25 | Vence quem tem mais pontos; empate, os jogadores compartilham a vitória | BR p. 2 | V | R24 |
| R26 | Exemplo do manual: Rosa narra "Renascimento"; Azul e Verde acertam; Vermelho vota no Violeta; Violeta e Amarelo votam no Azul; resultado 3, 5, 3, 1, 0, 0 | BR p. 3 | V (recalculado no script) | R16 a R18 |
| R27 | 3 jogadores: mão de 7 cartas | BR p. 3 | V | R7, R21 |
| R28 | 3 jogadores: cada não narrador escolhe 2 cartas; 5 cartas no tabuleiro, incluindo a do narrador | BR p. 3 | V | R11 |
| R29 | 3 jogadores: no fim do turno, os não narradores compram 2 em vez de 1 | BR p. 3 | V | R21 |
| R30 | 3 jogadores: o não narrador marca 1 bônus se recebeu voto numa de suas cartas, qualquer uma; demais regras iguais | BR p. 3 | V | R18 |
| R31 | 3 jogadores: o narrador compra 1 carta (volta a 7) | Dedução de R21 e R27; o manual não diz | I (seção 5, item 3) | R27, R29 |
| R32 | 3 jogadores: ninguém vota em nenhuma das suas 2 cartas | "Os jogadores não podem votar em suas próprias cartas" (p. 2), plural; "As demais regras permanecem as mesmas" (p. 3) | V | R15, R28 |
| R33 | 2 jogadores: sem regra | Libellud 3 a 8; manual sem variante | L | |
| R34 | Expansões: 84 cartas cada, lista de 9 | BR p. 4 | V | |

## 5. Ambiguidades e escolhas

1. **Bônus quando todos ou ninguém acertam (R18).** O texto do quadro de bônus começa com "Além disso" e fica ao lado dos dois quadros de caso; o inglês diz "In addition". Quando todos acertam, ninguém recebe voto na própria carta, então a questão só importa quando ninguém acerta. O guia aplica o bônus nos dois casos e diz por quê, no "Para entender" da etapa 2. Classifico como V com a leitura explicada, porque a frase não tem condição.
2. **Novo embaralhamento (R22, I).** O DIX601 (e o DIX301) dizem só "as cartas na pilha de descarte são embaralhadas". O manual em inglês da mesma edição e o manual brasileiro da Disney Edition mandam embaralhar as cartas que restaram **e** o descarte. O guia segue essa leitura e avisa num `[!edicao]` na etapa 3.
3. **Compra do narrador com 3 jogadores (R31, I).** O manual diz que todos completam a mão com 7 e que os não narradores compram 2 "em vez de 1". Não diz do narrador; ele entregou 1 carta, logo compra 1 para voltar a 7 pela regra geral (R21). `[!edicao]` nas Situações especiais.
4. **"Ao final de um turno" (R24).** O guia lê que a partida acaba depois que todos marcaram os pontos do turno, e não no instante em que um coelho chega a 30. É a letra do manual; o "imediatamente" se refere a não começar outro turno.
5. **Dois jogadores (R33, L).** O autocompletar mostra procura por "dixit de 2". O manual não traz regra; o guia diz isso e não ensina variante.
6. **Duração e idade.** Não estão no manual. Vêm da página oficial da Libellud (8+, 30 min). Não vi a caixa brasileira, e a página da loja da Asmodee Brasil não respondeu ao robô (seção 2).

## 6. Diferenças entre edições

| Ponto | DIX001 (Galápagos, 2015) | DIX301 (2020/2024) e DIX601 (2026) |
|---|---|---|
| Votação | 36 fichas numeradas, 6 cores; cartas em fila na mesa | 8 discos; 8 espaços no tabuleiro |
| Jogadores | 3 a 6 (fichas e coelhos para 6) | 3 a 8 |
| Fim | quando se compra a última carta | 30 pontos no fim do turno |
| Pilha vazia | fim da partida | reembaralhar o descarte |
| 3 jogadores | 7 cartas, 2 cartas por não narrador; se só um acertar, ele e o narrador marcam 4 | 7 cartas, 2 cartas por não narrador, compra 2; bônus 1 por qualquer voto; sem a regra dos 4 pontos |
| Empate | não previsto | vitória compartilhada |

Pontuação básica (0/2 e 3/3/0 com bônus de 1 por voto) é igual nas três. O tutorial segue o DIX601 e resume as diferenças num `[!edicao]` das Situações especiais, para quem tem a caixa antiga.

A Dixit: Disney Edition (DIX631) traz as mesmas regras de turno, pontuação e fim, com 6 marcadores e 6 espaços (3 a 6 jogadores). Por isso o vídeo do Duque, que é da Disney Edition, foi aceito com aviso.

## 7. Erros comuns (sem fonte de comunidade)

Não pesquisei fóruns. Os `[!atencao]` vêm de regras do manual que contrariam a intuição de quem começa: o narrador não vota (p. 2); ninguém vota na própria carta (p. 2); "todos acertaram" zera o narrador e dá 2 aos outros, não 3 (p. 2); errar a carta do narrador não impede o bônus (exemplo do Violeta, p. 3); quem não tem carta boa entrega a melhor que tem (p. 2). Não é evidência de que sejam os erros mais frequentes.

## 8. Plano instrucional e decisões de carga

- **Comece em 4 minutos:** preparação, as quatro fases do turno, a tabela de dois casos mais o bônus, um exemplo resolvido de 5 jogadores, uma pergunta de "todos acertaram" e uma de "ninguém acertou com bônus". Pilha vazia e 3 jogadores ficam em "Ainda não precisa saber".
- **Etapa 1 (montar a mesa e criar o enigma):** componentes ligados à função, preparação, criar o enigma; formas de dica e primeiro narrador em `[!mais]`; conselho do manual sobre a medida da dica em `[!dica]`. Exemplo resolvido de preparação para 4; pergunta de conta de cartas (84 - 36 = 48); duas de "sua vez".
- **Etapa 2 (votar e pontuar):** o núcleo. Passo a passo de resolver o enigma e de pontuação; o exemplo do manual refeito conta por conta, com a figura; um exemplo de "ninguém acertou" com bônus; complete, sua vez e um treino de três contas, por ser a regra que precisa virar automática.
- **Etapa 3 (fechar o turno e a partida):** descarte, compra, novo narrador, fim e empate; pilha vazia em `[!mais]` com a divergência em `[!edicao]`; exemplo de dois jogadores que passam de 30 no mesmo turno.
- **Situações especiais:** 3 jogadores (regra completa, exemplo e a lacuna do narrador), edições antigas, 2 jogadores, expansões.
- **Limite:** o texto não observa o leitor nem ajusta o apoio a ele.

## 9. Extensão

`wc -w` do tutorial: cerca de 4.750 (marcação incluída); 4.300 palavras pela contagem `\w+` sem marcação. Dentro do alvo de 3.500 a 4.500 para jogo leve. O espaço maior está na etapa 2, porque a pontuação é a única regra com conta.

## 10. Contas

Script: `<scratchpad>/dixit/scripts/contas.py` (rodado com `python3 -I`); implementa R16 a R18 e confere que ninguém vota na própria carta.

| Exemplo | Resultado do script | No texto |
|---|---|---|
| Comece, resolvido (5 jog., Ana narra) | Ana 3, Bruno 3, Carla 1, Davi 4, Elisa 0 | idem |
| Comece, complete (todos acertam, 4 jog.) | narrador 0, outros 2 | 0 |
| Comece, sua vez (ninguém acerta, 2 votos em você) | 2 + 2 = 4 | 4 |
| Etapa 1, complete (6 jog.) | 84 - 36 = 48 | 48 |
| Etapa 1, resolvido (4 jog.) | 84 - 24 = 60 | 60 |
| Etapa 2, exemplo do manual (p. 3) | Rosa 3, Azul 5, Verde 3, Violeta 1, Amarelo 0, Vermelho 0 | idem, igual ao manual |
| Etapa 2, ninguém acertou (4 jog.) | Ana 0, Bruno 2, Carla 4, Davi 3 | idem |
| Etapa 2, complete (6 jog., Bruno narra) | Ana 5, Bruno 3, Carla 4, Davi 0, Elisa 0, Fabio 0 | Ana 5, Bruno 3 |
| Etapa 2, sua vez (5 jog., Carla narra, ninguém acerta) | Ana 2, Bruno 5, Carla 0, Davi 3, Elisa 2 | Bruno 5, Carla 0 |
| Etapa 2, treino a | Bruno 5 | 5 |
| Etapa 2, treino b | Ana 4 | 4 |
| Etapa 2, treino c (todos acertam) | outros 2 | 2 |
| Etapa 3, resolvido (Bruno 28, Carla 29) | turno: Ana 3, Bruno 3, Carla 1, Davi 1; Bruno 31, Carla 30 | Bruno vence com 31 |
| Situações, 3 jogadores | Ana 3, Bruno 0, Carla 4 | idem |
| Avaliação 3 (8 jog., 5 de 7 acertam) | narrador 3 | 3 |
| Avaliação 5 (errou, 2 votos) | 0 + 2 = 2 | 2 |

## 11. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/dixit/tutorial.md`: passa ("seção Comece a jogar dentro da diretriz").
- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos` no texto inteiro e no JSON): 0 avisos.
- Exclamação fora das marcas de bloco, `!fig` e `!video`: só dentro das citações das dicas do manual ("É MEU aniversário!") e no título do vídeo, que é o do oEmbed.
- Teste de conversão: `tools/como_jogar_md.pagina()` rodado em memória com o JSON (sem gravar página): 4 figuras do manual, 1 vídeo, nenhuma marca `[!...]` sobrando. A página também puxou fotos de `dixit/fotos/` (pasta criada por outro agente nesta tarde).
- Legibilidade (Flesch adaptado, Martins et al. 1996, `Arcvalion_gospel/tools/discipulado/legibilidade.py --guia`): índice 81,6 ("fácil"), 10,8 palavras por frase, 1,85 sílaba por palavra. A média de palavras por frase é baixa por causa das opções de múltipla escolha, contadas como frases. É informação, não meta.

## 12. Figuras e vídeo

Recortes das ilustrações do manual (só a parte gráfica; o texto do manual vizinho foi deixado fora), `.webp` qualidade 82, em `como-jogar/dixit/figuras/`:

| Arquivo | Página | Mostra |
|---|---|---|
| `preparacao.webp` | 3 | Os passos 1 a 4 da preparação, com A, B e C no tabuleiro |
| `dica-aniversario.webp` | 3 | Carta do Exemplo 1 das dicas para o narrador |
| `dica-renascimento.webp` | 3 | Carta do Exemplo 2 |
| `exemplo-pontuacao.webp` | 3 | As 6 cartas e os discos do exemplo de pontuação, com o balão "Renascimento" |

Testei um recorte ampliado da referência para os jogadores (C), mas o marcador "C" da ilustração cobre o "3" do narrador; descartado. As p. 2 e 4 não têm ilustração de regra (só ícones e capas de expansões). Daí 4 figuras, o mínimo.

Vídeo: busca no próprio canal Duque Board Games (`/@DuqueBoardgames/search?query=dixit`). O canal não tem vídeo de regras da caixa básica; tem "DIXIT: Disney Edition - Regras + Gameplay comentada!" (30:08), escolhido com aviso no texto de que é a Disney Edition, com as mesmas regras de turno e pontuação (conferido no manual DIX631) e limite de 6 jogadores. Nenhum quadro baixado; sem vídeo dentro das etapas.

## 13. Dados do `conteudo/como-jogar/dixit.json`

| Campo | Valor | Fonte |
|---|---|---|
| jogadores | 3 a 8 | Libellud, página do jogo; manual p. 2 e 3 |
| duracao | 30 min | Libellud, página do jogo |
| idade | 8+ | Libellud, página do jogo |
| edicao | Edição Asmodee (Galápagos) | manual DIX601 e biblioteca da Asmodee Brasil |
| genero | Dedução com imagens · Família | rótulo editorial; "Accessible and family-oriented" na página da Libellud |
| resenha | null | sem `conteudo/dixit.json` |
| etapas | 3 | tutorial |
| leitura_min | 16 | cerca de 4.300 palavras a 270 por minuto, mesma relação do JSON de Azul |
