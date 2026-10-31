# Dossiê: Como Jogar Azul

Entrega 1 da linha COMO JOGAR para *Azul*. Produzido em 31/10/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções do briefing do editor (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; alvo de 3.500 a 6.000 palavras).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Manual brasileiro acessível:** sim, na Biblioteca de Downloads da Galápagos (seção 2).
- **Resenha no Elite:** sim, pasta `azul/` e `conteudo/azul.json`. Usada só como mapa de dúvidas.
- **Complexidade:** duas formas de pegar azulejos, três restrições de colocação, uma pontuação por adjacência que costuma ser explicada errado (seção 6) e penalidade progressiva. É mais leve que Clank! Catacombs, por isso o tutorial tem quatro etapas e cerca de 6 mil palavras (contagem `wc`), contra 8 mil.
- **Procura real (31/10/2026):** o autocompletar do Google para "como jogar azul" devolve, em ordem: "como jogar azul", "como jogar azul mini", "como jogar azul tabuleiro", "como jogar azul duel", "como jogar azul pavilhão de verão", "como jogar azul jardim da rainha". O do YouTube devolve "como jogar azul", "como jogar azul tabuleiro", "como jogar azul vitrais de sintra", "como jogar azul duel", "como jogar azul mini", "como jogar azul galapagos". A busca existe e já distingue o jogo base dos derivados; o tutorial cobre só o jogo base.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro** *Azul: Livro de Regras*, Galápagos | Arquivo `AZU001_regras_v1.0.pdf`, 6 páginas quadradas, criado em 27/02/2023 (Adobe InDesign 18.1), tradução de Bárbara Coelho, revisão de Evelyn Trippo e Priscilla Freitas, diagramação de Danilo Sardinha; © 2018 Plan B Games | Biblioteca de Downloads da Galápagos, https://www.asmodee.com.br/download-library, item "AZU001 - Azul", etiqueta Regras. A página entrega um .zip com o PDF | Baixado em 31/10/2026 |
| **Manual original** *Azul* (inglês), Next Move e Plan B Games | `EN-Azul-Rules-Next-Move-web.pdf`, 6 páginas, criado em 16/01/2018 | Link na página oficial https://www.nextmove-games.com/en/azul/azul-game/ (arquivo em cdn.svc.asmodee.net) | Baixado em 31/10/2026 |
| **Página do produto** AZU001, Asmodee Brasil (marca Galápagos) | Consulta à API pública da loja | https://www.asmodee.com.br/jogo-de-tabuleiro-azul/produto/AZU001 | 31/10/2026 |
| **Verso da caixa brasileira** (imagem da página do produto) | `AZU001_verso.png` | Mesma página | 31/10/2026 |
| FAQ ou errata oficial | Nenhuma encontrada | Páginas da Next Move e da Galápagos | Lacuna |

**Como os arquivos foram obtidos.** A Biblioteca de Downloads é uma página dinâmica: o código da própria página (`b2cgjadv-downloadlibrary.js`) consulta a API pública `api-prd.mundogalapagos.com.br/library-download/` (endereço lido na configuração do site, `ccstore/v1/sites/siteUS`). A busca por "azul" listou o item 1458 ("AZU001 - Azul"), e o botão de download da página chama `store/file?id=1458&tagId=2&group=b2c`, que devolveu o .zip sem login, com `access-control-allow-origin: *`. Nenhum bloqueio foi contornado: uma primeira tentativa num host de teste citado como valor padrão no código (`api-tst`) foi recusada pelo proxy da sessão e abandonada; o host de produção é o que o site usa. O `robots.txt` da Asmodee Brasil não restringe nada disso. O site da Next Move respondeu 403 no endereço antigo `nextmovegames.com/en/azul`; o PDF veio do domínio atual, `nextmove-games.com`, linkado na página oficial.

**Como os manuais foram lidos.** Os dois PDFs têm camada de texto; foram extraídos com `pdftotext -layout`, página a página, e lidos inteiros. As ilustrações foram renderizadas (80 a 220 dpi) para ler os valores que não estão no texto: os 7 espaços da fileira do chão (-1, -1, -2, -2, -2, -3, -3, p. 5), a disposição das cores na parede colorida (p. 2), a trilha de pontuação até 100 (p. 2) e o marcador de primeiro jogador com o número 1 (p. 2). Os arquivos ficam no scratchpad da sessão (`manuais/azul/`), fora do repositório.

**Paginação.** O manual brasileiro e o original têm as mesmas 6 páginas, com o mesmo conteúdo em cada uma. A p. 1 é só a capa. As páginas citadas no tutorial são as do brasileiro.

**Dados da caixa.** O verso da caixa brasileira mostra 14+, 2 a 4 jogadores e 30 a 45 minutos, e a frase "Produto destinado a colecionadores com mais de 14 (quatorze) anos". A página da Next Move indica 8+. A página da Asmodee Brasil registra faixa etária 14+, 2 a 4 participantes e "30 min". O `azul.json` usa o que está impresso na caixa brasileira: 14+, 2 a 4 jogadores, 30 a 45 min. A resenha do site (8+) segue a caixa original; a diferença está anotada para o editor.

## 3. Glossário (edição brasileira)

O tutorial usa só estes nomes, sempre os mesmos.

| No tutorial (= manual BR) | Original | Página | O que é |
|---|---|---|---|
| azulejo | tile | 3 a 6 (na preparação, p. 2, o BR também diz "peças") | As 100 peças de resina, 20 de cada cor |
| tabuleiro de jogador | player board | 2 | O tabuleiro de cada um |
| lado com a parede colorida / lado cinza | colored wall side / gray side | 2, 6 | As duas faces do tabuleiro |
| marcador de pontuação | scoring marker | 2 | Peça que anda na trilha |
| trilha de pontuação | score track | 2 | Grade numerada de 0 a 100 no alto do tabuleiro |
| expositor de fábrica | Factory display | 2, 3 | Disco que recebe 4 azulejos por rodada |
| centro da mesa | center of the table | 2, 3 | Espaço no meio dos expositores, que recebe as sobras. O verso da caixa BR chama de "oferta geral"; o manual não usa esse termo, e o tutorial também não |
| saco | bag | 2, 5 | Saco de tecido com os azulejos |
| marcador de primeiro jogador | starting player marker | 2, 3, 5 | Peça com o número 1 |
| fileira de modelo | pattern line | 2, 3, 4 | As 5 fileiras em escada, de 1 a 5 espaços |
| parede | wall | 2, 4, 5 | Grade de 5 por 5 |
| fileira do chão | floor line | 2, 4, 5 | 7 espaços de penalidade |
| tampa da caixa (do jogo) | lid of the game box | 4, 5 | Onde ficam os azulejos descartados |
| Oferta da fábrica | Factory offer | 3 | Fase A |
| Revestimento de parede | Wall-tiling | 3, 4 | Fase B |
| Preparação para a próxima rodada | Preparing the next round | 3, 5 | Fase C |
| fileira horizontal / fileira vertical (da parede) | horizontal / vertical line | 6 | Linha e coluna da parede; o tutorial usa também "linha" e "coluna" da parede quando não há risco de confundir com fileira de modelo |
| azulejo de penalidade | penalty tile | 5 | Como o marcador de primeiro jogador conta no chão |
| Partida Alternativa | Variant play | 6 | Jogo com o lado cinza |
| completa / incompleta (fileira de modelo) | complete / incomplete | 3, 4 | Com todos os espaços ocupados, ou não |

**Cores.** O texto do manual nomeia quatro: azul, amarelo, vermelho, preto (p. 3 a 5). A quinta (fundo branco, desenho turquesa) não tem nome no manual brasileiro nem no original. O tutorial a chama de "branca" e diz por quê na etapa 1. É escolha de redação, não termo da edição.

**Disposição da parede colorida** (lida na ilustração da p. 2, conferida na foto do verso da caixa): linha 1: azul, amarelo, vermelho, preto, branco; cada linha seguinte desloca a sequência uma casa para a direita (linha 2: branco, azul, amarelo, vermelho, preto). O script de contas (seção 8) usa essa disposição.

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[I]` interpretada (manual ambíguo; leitura e motivo ao lado), `[L]` lacuna (o manual não diz). Fonte `[BR p. N]` com uma frase curta lida ali.

### 4.1 Objetivo e fim

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | Vence quem tiver mais pontos no fim | BR p. 3 "Ser o jogador com mais pontos no fim da partida" | V | |
| R2 | A partida acaba logo após a fase de Revestimento de parede em que pelo menos um jogador completou pelo menos uma fileira horizontal de 5 azulejos consecutivos | BR p. 6 "O jogo acaba logo após a fase de revestimento de parede"; p. 3 | V | R20 a R27 |
| R3 | Bônus: 2 por fileira horizontal completa, 7 por fileira vertical completa, 10 por cor com os 5 azulejos na parede | BR p. 6 "Ganhe 2 pontos", "Ganhe 7 pontos", "Ganhe 10 pontos" | V | R2 |
| R4 | Empate: vence quem tem mais linhas horizontais completas; persistindo, vitória compartilhada | BR p. 6 "mais linhas horizontais completas vence"; "a vitória é compartilhada" | V | R3 |
| R5 | Ordem no fim: a penalidade do chão é parte do Revestimento (p. 5, "no final da fase de revestimento"); os bônus vêm "quando o jogo acabar", depois da fase (p. 6). Logo, o chão (com o piso em 0) é aplicado antes dos bônus | BR p. 5 e 6 | I | R2, R25 |

R5 é `[I]` porque a ordem decorre de duas frases em páginas diferentes, não de uma frase única; a leitura é a única compatível com as duas.

### 4.2 Preparação

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R6 | Um tabuleiro por jogador, todos com o lado da parede colorida (ou todos com o cinza, na Partida Alternativa) | BR p. 2 "Todos os jogadores devem usar o mesmo lado" | V |
| R7 | Marcador de pontuação no espaço 0 | BR p. 2 "no espaço "0" da sua trilha" | V |
| R8 | Expositores em círculo ao redor do centro: 5 (2 jogadores), 7 (3), 9 (4) | BR p. 2 | V |
| R9 | 100 azulejos, 20 de cada cor, no saco | BR p. 2 "100 peças (20 de cada cor)" | V |
| R10 | Quem visitou Portugal mais recentemente pega o marcador de primeiro jogador e enche cada expositor com exatamente 4 azulejos ao acaso | BR p. 2 | V |
| R11 | Material não usado volta à caixa | BR p. 2 "Devolva para a caixa" | V |

### 4.3 Oferta da fábrica

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R12 | Rodada = três fases: Oferta da fábrica, Revestimento de parede, Preparação para a próxima rodada | BR p. 3 | V | |
| R13 | O jogador inicial põe o marcador de primeiro jogador no centro e joga primeiro; sentido horário | BR p. 3 "coloca o marcador de primeiro jogador no centro da mesa" | V | R10 |
| R14 | No seu turno você **deve** pegar azulejos (sem passar) | BR p. 3 "você deve pegar azulejos de um dos seguintes modos" | V | |
| R15 | Modo a: todos os azulejos da mesma cor de um expositor; o resto do expositor vai para o centro | BR p. 3 | V | |
| R16 | Modo b: todos os azulejos da mesma cor do centro; o primeiro da rodada a pegar do centro leva também o marcador e o põe no espaço livre mais à esquerda da fileira do chão | BR p. 3 | V | R13 |
| R17 | Os azulejos pegos vão para uma das 5 fileiras de modelo (1 a 5 espaços), um por um, da direita para a esquerda | BR p. 3 "da direita para a esquerda" | V | |
| R18 | Fileira de modelo com azulejos só aceita a mesma cor | BR p. 3 "só poderá adicionar azulejos da mesma cor" | V | R17 |
| R19 | Fileira com todos os espaços ocupados está completa; excesso vai para a fileira do chão | BR p. 3 "deverá colocar os azulejos excedentes na fileira do chão" | V | R17 |
| R20 | Proibido pôr uma cor numa fileira de modelo se a linha correspondente da parede já tem essa cor | BR p. 4 "Você não pode colocar azulejos de uma certa cor" | V (ver 5.1) | R17 |
| R21 | Chão: azulejos que não pode ou não quer colocar; ocupam da esquerda para a direita; com os 7 espaços cheios, os demais vão para a tampa | BR p. 4 "não possa ou não queira"; "devolva quaisquer outros azulejos caídos para a tampa" | V | |
| R22 | Mandar ao chão por escolha é permitido, inclusive todos os azulejos pegos | BR p. 4, exemplo C "pode até optar por colocar ambos os azulejos na fileira do chão" | V | R21 |
| R23 | A fase termina quando não há azulejos no centro nem em nenhum expositor | BR p. 4 "não houver mais azulejos no centro da mesa NEM em qualquer expositor" | V | |

### 4.4 Revestimento de parede e pontuação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R24 | Fase pode ser feita por todos ao mesmo tempo | BR p. 4 "simultaneamente" | V | |
| R25 | De cima para baixo, o azulejo da extrema direita de cada fileira de modelo completa vai para o espaço da mesma cor na linha correspondente; pontua imediatamente | BR p. 4 "Mexa nas suas fileiras de modelo de cima para baixo"; "ganha pontos imediatamente" | V | R19 |
| R26 | Fileira incompleta é ignorada e fica para a próxima rodada | BR p. 4 "ele a ignora"; "permanecerão no seu tabuleiro" | V | |
| R27 | Depois, as fileiras sem azulejo no espaço da extrema direita são esvaziadas na tampa | BR p. 4 "remova todos os azulejos de quaisquer fileiras de modelo que não tenham mais um azulejo no espaço da extrema direita" | V | R25 |
| R28 | Azulejo sem vizinhos (horizontal ou vertical): 1 ponto | BR p. 5 "ganhe 1 ponto" | V | |
| R29 | Com vizinhos: conte os ligados na horizontal, incluindo o novo, e ganhe esse número; depois, os ligados na vertical, incluindo o novo, e some | BR p. 5 "conte todos esses azulejos conectados (inclusive o recém-colocado)" | V | R28 |
| R30 | Diagonal não conta; um espaço vazio interrompe a ligação | BR p. 5 "diretamente adjacentes (vertical ou horizontalmente)"; "conectados" | I | R29 |
| R31 | Chão: cada azulejo tira o valor impresso acima dele: -1, -1, -2, -2, -2, -3, -3 | BR p. 5 "você perde a quantidade de pontos indicada logo acima dele"; valores na ilustração | V | R21 |
| R32 | A pontuação nunca fica abaixo de 0 | BR p. 5 "você nunca pode ter menos de 0 pontos" | V | R31 |
| R33 | Azulejos do chão vão para a tampa; o marcador de primeiro jogador conta como azulejo de penalidade normal, fica à frente do dono, que será o primeiro jogador da próxima rodada | BR p. 5 "Observação" | V | R16 |

R30 é `[I]`: o manual não usa a palavra "diagonal" nem fala de espaço vazio, mas define vizinho como "diretamente adjacente (vertical ou horizontalmente)" e conta azulejos "conectados"; os exemplos da p. 5 só mostram sequências sem buraco.

### 4.5 Preparação para a próxima rodada

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R34 | Se ninguém completou uma fileira horizontal, quem tem o marcador de primeiro jogador enche cada expositor com 4 azulejos do saco | BR p. 5 | V |
| R35 | Saco vazio: devolva ao saco os azulejos da tampa e continue | BR p. 5 "reabasteça-o com todos os azulejos que foram colocados na tampa" | V |
| R36 | Sem azulejos no saco nem na tampa: comece a rodada com expositores incompletos | BR p. 5 "mesmo que nem todos os expositores de fábrica estejam adequadamente preenchidos" | V |

### 4.6 Partida Alternativa

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R37 | Lado cinza: o azulejo pode ir para qualquer espaço da linha correspondente, mas nenhuma cor se repete numa coluna nem numa linha | BR p. 6 | V |
| R38 | Exceção: se o azulejo da extrema direita de uma fileira completa não tiver espaço válido, todos os azulejos dessa fileira vão imediatamente para o chão | BR p. 6 "Exceção" | V |

### 4.7 Lacunas

| # | Situação | Cl. | No tutorial |
|---|---|---|---|
| L1 | Primeiro a pegar do centro com os 7 espaços do chão já ocupados: o manual manda pôr o marcador "no espaço livre mais à esquerda", que não existe | L | Bloco [!edicao] em Situações especiais: "combine com a mesa" |
| L2 | Ninguém pega do centro na rodada (só possível se nenhum expositor deixar sobras): quem começa a próxima rodada | L | Mesmo bloco |
| L3 | Pontuação acima de 100 na trilha | L | Não tratado (irrelevante para aprender) |
| L4 | Nome da quinta cor | L | Etapa 1 explica a escolha de "branca" |

### 4.8 Erros comuns e de onde vem a evidência

- **Contar o azulejo uma vez só quando ele tem vizinhos nas duas direções.** A resenha do próprio Elite (`conteudo/azul.json`, `como_funciona`) diz que o azulejo "vale um ponto, mais um por peça ligada a ele na horizontal e na vertical". Pela p. 5, um azulejo com vizinhos nos dois sentidos conta a si mesmo duas vezes (exemplo do manual: 4 + 3 = 7). A fórmula da resenha daria 6. O tutorial trata no passo a passo da pontuação, no treino (casos c e e) e na avaliação (questão 5).
- **Achar que o marcador de primeiro jogador vale sempre -1.** A mesma resenha diz que a ficha "vale um ponto negativo". Pela p. 3 e 5, ele ocupa o espaço livre mais à esquerda e tira o valor daquele espaço. Tratado na avaliação (questão 2) e no "Complete" da etapa 2.
- **Pegar só parte dos azulejos de uma cor, ou dividir entre fileiras.** Erro de iniciante deduzido das regras (p. 3), sem fonte externa; está nos "três erros mais caros" da seção de 4 minutos e na questão 1 da avaliação.

A resenha foi usada só como mapa de dúvidas, como pede o briefing; nenhuma regra veio dela. Os dois erros dela ficam registrados aqui para o editor.

## 5. Divergências entre edições

### 5.1 "Turnos" e "rodadas" (p. 4)

- BR: "Em todos os turnos subsequentes, você também deverá seguir a seguinte regra".
- Original: *In all later rounds, you must also comply with the following rule*.
- Natureza: tradução. Efeito prático: nenhum, porque a parede começa vazia e só muda no Revestimento. O tutorial dá a regra sem restrição de rodada e explica no bloco [!edicao] da etapa 2.

### 5.2 Nome da fase B (p. 6)

- BR: a Partida Alternativa fala em "fase de assentamento de azulejos"; as p. 3 a 6 usam "Revestimento de parede".
- Original: *Wall-tiling* nos dois lugares.
- Natureza: tradução inconsistente. O tutorial usa sempre "Revestimento de parede" e avisa no bloco [!edicao] das Situações especiais.

### 5.3 "Peças" e "azulejos" (p. 2)

A preparação brasileira diz "100 peças" e "4 peças"; o resto do manual, "azulejos". O original usa *tiles* em tudo. O tutorial usa "azulejos" do começo ao fim.

### 5.4 Idade na caixa

Caixa brasileira 14+; página da Next Move 8+. Não é regra; afeta só o `azul.json` (seção 2).

Não há errata oficial conhecida. Nenhuma divergência de regra entre os dois manuais.

## 6. Plano instrucional

Mapa das classes de tarefa (registro interno; o tutorial não explica o método, por pedido do editor):

| Classe de tarefa | Informação de apoio ("Para entender") | Informação procedimental ("Passo a passo") | Tarefas | Prática específica ("Treino rápido") |
|---|---|---|---|---|
| 0. Comece em 4 minutos: montar e jogar o 1º turno | A ideia do jogo (4 termos) | Monte a mesa; os 4 passos do turno | Resolvido (Ana pega 2 azuis), Complete (Bruno e 3 vermelhos), sua mesa | Os três erros mais caros |
| 1. Montar a mesa | Partes do tabuleiro, parede colorida, cores, expositores, centro, marcador, tampa | Preparação (p. 2) | Sua vez (montagem para 3) | Nenhuma: tarefa curta |
| 2. Pegar azulejos | Por que se leva tudo, o centro que cresce, preço e prêmio do marcador | Turno na Oferta da fábrica (R13 a R23) | Resolvido (3 amarelos de Ana, todas as fileiras), Complete (4 pretos de Bruno), Sua vez (3 casos) | "Pode ou não pode?" (4 casos): colocação é onde o erro é comum |
| 3. Revestir e pontuar | Só fileiras completas rendem; vizinhança e blocos | Revestimento (R24 a R33); pontos de um azulejo; tabela do chão; Preparação (R34 a R36) | Resolvido (saldo +4), Complete (ordem de cima para baixo, 13 pontos), Sua vez (ordem invertida, piso em 0, marcador) | "Quantos pontos?" (6 casos): pontuação é o ponto mais errado |
| 4. Fim e bônus | Duração aberta; o que cada bônus paga | Fim da partida (R2 a R5) | Resolvido (Ana 69), Complete (Bruno 70), Sua vez (piso antes do bônus; desempate) | "Quanto de bônus?" (3 casos) |

**Decisões para reduzir carga.**

- A seção de 4 minutos ensina só o 1º turno. A restrição da cor na parede (R20) foi adiada para a etapa 2 porque não tem efeito na primeira rodada.
- A pontuação foi separada em dois passos a passo (procedimento da fase e conta de um azulejo) e a tabela do chão traz o total acumulado, para a conta ficar automática.
- A preparação da próxima rodada entrou na etapa 3, junto do fim da rodada, e não numa etapa própria: são 5 linhas.
- A Partida Alternativa e as lacunas ficaram nas Situações especiais.
- Estratégia aparece só em dois blocos [!dica], escritos como sugestão (fechar linha cedo ou tarde; perder pouco no chão em vez de travar uma fileira longa).
- Limite: um texto não observa o leitor nem ajusta o apoio a ele.

**Mudanças em relação à estrutura de referência do prompt.** Seguida a estrutura do tutorial de Clank! (4 minutos, etapas com tarefas, situações especiais, avaliação, consulta, fontes). "Uma rodada acompanhada" não virou seção própria: as tarefas das etapas 2 a 4 acompanham, em sequência, a Oferta da fábrica, o Revestimento e a última rodada. Cada exemplo é independente; não é a mesma partida do começo ao fim.

## 7. Extensão

`wc -w` do tutorial: 5.996 palavras (5.713 pela contagem `\w+`; cerca de 5.200 palavras com letras, sem números nem marcação). Dentro do alvo de 3.500 a 6.000. A seção de 4 minutos tem menos de 800 palavras (portão `checar_comece.py`). O espaço maior está na etapa 3, porque a pontuação por adjacência e a ordem de cima para baixo são as regras mais erradas.

## 8. Contas

Todas as contas dos exemplos e respostas foram refeitas em `contas.py` (scratchpad da sessão, `azul_calc/contas.py`), que implementa a parede colorida, a pontuação da p. 5, a fileira do chão e os bônus da p. 6. Saída usada no texto:

| Onde | Conta | Resultado |
|---|---|---|
| 4 min | 5 expositores x 4 = 20 azulejos; 4 de cada cor | confere |
| Etapa 1 | 7 x 4 = 28 | 28 |
| Etapa 3, Resolvido | vermelho na linha 1, coluna 3: horizontal 3 + vertical 2; preto na linha 2, coluna 5: 1; chão 2 | 5 + 1 - 2 = 4 |
| Etapa 3, Complete | azul (1,1): 1; branco (2,1): horizontal 2 + vertical 2; chão 2 | 10 + 1 + 4 - 2 = 13 |
| Etapa 3, Sua vez 1 | ordem invertida: branco 2, azul 2 | 4 (contra 5) |
| Etapa 3, Sua vez 2 | 3 + 1 - 6 com piso 0 | 0 |
| Etapa 3, Treino | a 1; b 3; c 2 + 3 = 5; d 1; e 3 + 4 = 7; f chão 5 = 8, chão 9 = 14 | confere |
| Etapa 4, Resolvido | vermelho em (2,4): 5 + 2 = 7; chão 1; bônus 2 linhas e 1 coluna = 11; nenhuma cor completa | 52 + 7 - 1 + 11 = 69 |
| Etapa 4, Complete | parede de Bruno com 1 linha, pretos e vermelhos completos: bônus 2 + 20, nenhuma coluna completa | 48 + 22 = 70 |
| Etapa 4, Sua vez 1 | 3 - 4 com piso 0, + 2 + 7 | 9 |
| Avaliação 2, 5, 6 | marcador no 3º espaço: 2; azulejo com vizinhos à esquerda, direita e em cima: 3 + 2; 4 - 8 com piso | 2; 5; 0 |

As posições citadas no texto (vermelho da linha 1 na coluna 3, preto da linha 2 na coluna 5, branco da linha 2 na coluna 1, vermelho da linha 2 na coluna 4, azul da linha 2 na coluna 2) foram conferidas na disposição da parede pelo script.

## 9. Portões automáticos

| Portão | Resultado |
|---|---|
| Travessão e meia-risca no tutorial | 0 |
| `tools/vicios.py` (função `avisos`) no tutorial e no `azul.json` | 0 aviso |
| `tools/checar_comece.py` | ✅ dentro da diretriz |
| Exclamação | nenhuma fora das marcas de bloco |
| Seções na ordem do briefing; respostas em `### Respostas ...` logo depois das perguntas | conferido |
| Conversor `tools/como_jogar_md.py` (função `pagina`, gerada só para o scratchpad) | renderiza; listas aninhadas viravam texto corrido e foram reescritas como listas simples |
| Todo exemplo numérico recalculado | sim (seção 8) |
| Toda regra do tutorial na base com página | sim (ver auditoria) |
| Legibilidade (Flesch adaptado, Martins et al. 1996) | cerca de 78, por estimativa própria com contagem heurística de sílabas; a implementação citada no prompt (repositório Arcvalion_gospel) não estava disponível. Informação, não meta |

## 10. Dados do `conteudo/como-jogar/azul.json`

| Campo | Valor | Fonte |
|---|---|---|
| jogo, titulo | Azul | capa do manual e página do produto |
| genero | Abstrato · Família | resenha do Elite (tags "Abstrato") e página do produto ("para ser jogado com os amigos e com a família") |
| jogadores | 2 a 4 | manual p. 2 (expositores por número de jogadores) e verso da caixa |
| duracao | 30 a 45 min | verso da caixa brasileira |
| idade | 14+ | verso da caixa brasileira e página do produto |
| edicao | Edição Galápagos | manual p. 6 ("Galápagos Jogos") e marca na página do produto |
| resenha | azul | existem `azul/` e `conteudo/azul.json` |
| etapas | 4 | tutorial |
| leitura_min | 29 | 5.713 palavras / 200 por minuto |
