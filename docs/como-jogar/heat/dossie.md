# Dossiê: Como Jogar Heat: Pedal to the Metal

Entrega 1 da linha COMO JOGAR para *Heat: Pedal to the Metal* (jogo base, Days of Wonder; no Brasil, Galápagos/Asmodee, SKU HET001). Produzido em 05/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; manual em inglês quando o brasileiro não está acessível) e os ajustes do pedido do dia (jogo médio: 4.500 a 6.000 palavras, 3 ou 4 etapas; só o jogo básico; seção de montagem com figura do manual em cada passo que pode ser mostrado).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Manual acessível:** o manual oficial em inglês, sim (seção 2). O manual da edição brasileira, não (seção 2).
- **Resenha no Elite:** sim, `/heat-pedal-to-the-metal/` e `conteudo/heat-pedal-to-the-metal.json`. No JSON, `"resenha": "heat-pedal-to-the-metal"`. As fotos oficiais aprovadas (Days of Wonder) estão em `heat-pedal-to-the-metal/fotos/` com `fontes.json`; o gerador as põe sozinho no topo e nas seções sem figura, e o tutorial não cita foto à mão.
- **Complexidade:** nove passos por rodada, quatro obrigatórios; a curva cobra calor pela velocidade e não pela posição; o vácuo não conta na curva e o turbo conta; rodopio; mão entupida. Jogo médio: 3 etapas.
- **Procura real (05/11/2026, cerca de 19h50 UTC):** o autocompletar do Google para "como jogar heat" devolve "como jogar heat" e "como jogar heat pedal to the metal" em segundo lugar (o resto é do videogame *Need for Speed Heat*); o do YouTube devolve "como jogar heat pedal to the metal" em segundo. Para "heat jogo", o Google sugere "heat jogo de tabuleiro" e "heat jogo de corrida"; o YouTube, "heat jogo tabuleiro" e "jogo heat pedal to the metal".

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual oficial em inglês, regras básicas** (fonte principal). *Heat: Pedal to the Metal, Rules*, Days of Wonder | 8 páginas (595 x 808 pt), "Rules v1.1" impresso na p. 8; © 2022-2023 Days of Wonder; autores Asger Harding Granerud e Daniel Skjold Pedersen; arte Vincent Dutrait; PDF criado em 28/03/2023 (InDesign 17.4); sha256 26e59295…67e9 | Página oficial https://www.daysofwonder.com/game/heat/ ("Basic Game Rules English"); arquivo https://cdn.svc.asmodee.net/staging-daysofwonder/uploads/2024/07/9101-HT-Rules-EN.pdf (HTTP 200, sem login) | Baixado e lido inteiro em 05/11/2026 |
| **Manual oficial em inglês, regras avançadas**. *Advanced Play and Championship System*, Days of Wonder | 12 páginas, PDF modificado em 19/03/2025; sha256 29f14202…addd | Mesma página; https://cdn.svc.asmodee.net/production-daysofwonder/uploads/2025/03/9101-HT-RulesAdvanced-EN_compressed.pdf | Baixado em 05/11/2026; lido nas p. 1, 2, 5 e 12 só para saber o que fica de fora (módulos) e a sugestão de Lendas abaixo de 4 jogadores |
| **Página do jogo**, Days of Wonder | "1 - 6 players", "10+", "60 min", conteúdo da caixa ("72 Speed cards", "48 Heat cards & 37 Stress cards", "2 Rules booklets") | https://www.daysofwonder.com/game/heat/ | 05/11/2026 |
| **Biblioteca de downloads da Asmodee Brasil** (edição brasileira) | A busca `library-download/store/search?term=heat` listou "Heat: Pedal to the Metal - SKU: HET001" (item 2830, pai 608 "HET001 - Heat Pedal to the Metal"), com etiquetas Regras, Ilustração, Conteúdo da caixa e Extras, e as expansões HET002 Chuva Forte, HET003 Visão em Túnel e HET005 Lendas | `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2830&tagId=2&group=b2c` respondeu 404 "The specified blob does not exist" (também nas etiquetas 3, 5 e 6); com `group=b2`, 404 "container does not exist"; os itens 608 e 2835, 404 | 05/11/2026. Ver abaixo |
| **Vídeo** "HEAT: Pedal to the Metal \| Gameplay resumida", Duque Board Games | Título e canal pelo oEmbed oficial; achado pela busca do próprio canal (`@DuqueBoardgames/search?query=heat`, `Accept-Language: pt-BR`); nada baixado | https://www.youtube.com/watch?v=eSF0OhUyuLU | 05/11/2026 |
| FAQ ou errata oficial | Nenhuma na página da Days of Wonder | | Lacuna |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial; +https://eliteboardgamers.com.br)`, que se identifica como robô. O `www.asmodee.com.br` não foi acessado (costuma responder Access Denied a robô; o briefing manda não contornar). A API da biblioteca (`api-prd.mundogalapagos.com.br`) respondeu à busca e o download público (`group=b2c`) deu 404 de arquivo inexistente: não é bloqueio, é arquivo que não está lá. **Observação para o editor:** testando grupos, a chamada com `group=b2b` devolveu um ZIP com `Heat_regras_v1.0_11-23.pdf`. Seguindo o precedente registrado no dossiê de Bang! (grupo `b2b` tratado como área de lojistas, não como download do público), esse arquivo não foi aberto nem usado como fonte e foi apagado do scratchpad. Se o editor considerar esse grupo público, basta trocar a fonte e conferir os nomes da caixa brasileira. O `robots.txt` da Days of Wonder só bloqueia `/image-converter`, busca e feeds; o PDF está no CDN da Asmodee, linkado na página oficial. YouTube: só a página de busca do canal (fora de `/results`, que o `robots.txt` proíbe) e o oEmbed.

**Como o manual foi lido.** O PDF das regras básicas tem camada de texto; foi extraído com `pdftotext -layout` e sem `-layout` (o texto em duas colunas sai embaralhado com `-layout`) e lido inteiro, e as páginas foram renderizadas a 110 e 300 dpi para ler o que só está nas ilustrações: os números do quadro da pista dos EUA (2 voltas, 69 casas, 4 curvas, 6 de calor e 3 de estresse, p. 3), a anatomia da pista (p. 4), o exemplo de estresse (p. 5) e a troca de duas marchas (p. 7). Tudo fica no scratchpad, fora do repositório:

- PDFs: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/heat/en/rules-en.pdf` e `.../d1105/heat/en/adv-en.pdf`
- Texto por página, regras básicas: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/heat/raw/p1.txt` a `p8.txt` (sem `-layout`) e `.../d1105/heat/txt/p1.txt` a `p8.txt` (com `-layout`); avançadas em `.../d1105/heat/txt/adv1.txt` a `adv12.txt`
- Páginas renderizadas: `.../d1105/heat/img/p-1.png` a `p-8.png` (110 dpi) e `h-1.png` a `h-8.png` (300 dpi)

## 3. Glossário

O manual brasileiro não foi lido, e não foi achada fonte confiável (editora ou loja) com os termos da caixa brasileira. Os termos abaixo são traduções deste guia, escolhidas para serem claras e, quando possível, iguais às da resenha do site (calor, estresse, resfriamento, turbo, vácuo, adrenalina). O tutorial avisa isso no parágrafo de abertura e num bloco `[!edicao]`.

| Termo no tutorial | Original (manual EN) | Página | Explicação |
|---|---|---|---|
| tabuleiro | game board | p. 2 e 3 | 2 tabuleiros dupla face, 4 pistas |
| painel (do jogador) | player mat | p. 2 e 3 | Câmbio, motor, baralho, descarte e a sequência da rodada |
| pino de marcha | Gear pawn | p. 2 e 3 | Marca a marcha |
| marcha; trocar de marcha | gear; Shift Gears | p. 4 | 1ª a 4ª; passo 1 |
| cartas básicas | Basic cards (na página do jogo, "Speed cards") | p. 2 | 1 a 4, três de cada por cor; símbolo de velocímetro |
| cartas de melhoria inicial | Starting Upgrade cards | p. 2 e 7 | 0, 5 e uma de calor, por cor; fundo de divisas |
| carta de calor; calor | Heat card; Heat | p. 2 e 7 | Desgaste do motor |
| motor | Engine (spot) | p. 3 e 7 | Espaço do meio do painel onde fica o calor disponível |
| pagar calor | Paying Heat | p. 7 | Carta do motor para o descarte |
| carta de estresse | Stress card | p. 2 e 5 | Símbolo +; vira uma carta básica ao acaso |
| reserva de estresse | reserve | p. 3 | Estresse que sobrou, ao lado do tabuleiro |
| símbolo + | (ícone de mais) Symbol | p. 5 | Vire cartas até sair uma básica |
| baralho; pilha de descarte; mão | draw deck; discard pile; hand | p. 3 e 6 | |
| área de jogo | Play Area | p. 4 | Onde ficam as cartas jogadas na rodada |
| velocidade | Speed | p. 5 e 6 | Soma das cartas da área de jogo (+1 da adrenalina) |
| jogar cartas | Play Cards | p. 4 | Passo 2 |
| revelar e mover | Reveal & Move | p. 5 | Passo 3 |
| adrenalina | Adrenaline | p. 5 | Passo 4 |
| reagir | React | p. 5 | Passo 5 |
| resfriamento | Cooldown | p. 6 | Calor da mão de volta ao motor |
| turbo | Boost | p. 6 | 1 calor por um símbolo +, uma vez por turno |
| vácuo | Slipstream | p. 6 | +2 casas; passo 6 |
| conferir curva | Check Corner | p. 6 | Passo 7 |
| descartar | Discard | p. 6 | Passo 8 |
| completar a mão | Replenish Hand | p. 6 | Passo 9 |
| rodar; rodopio | Spin out | p. 6 | |
| mão entupida | Cluttered Hand | p. 7 | |
| casa; vaga | Space; Spot | p. 4 e 5 | |
| linha de corrida | Race Line | p. 4 e 5 | A vaga mais perto dela conta como mais à frente |
| linha de curva; limite de velocidade | Corner Line; Speed Limit | p. 4 e 6 | |
| marcador de casas até a próxima curva | Number of Spaces to next corner | p. 4 | |
| linha das Lendas | Legends Line | p. 4 | Só nas regras avançadas |
| grid de largada | starting grid | p. 3 | |
| linha de chegada; Hall da Fama | finish line; Hall of Fame | p. 3 e 7 | |
| módulos Garagem, Clima e condições de pista, Lendas, Campeonato | Garage, Weather & Road Conditions, Legends, Championship System | avançado p. 1 e 2 | Só citados |

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[I]` interpretada, `[L]` lacuna. Fonte `[orig. p. N]` (livreto de regras básicas em inglês), `[av. p. N]` (livreto avançado), com frase curta lida ali.

### 4.1 Componentes e preparação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| P1 | Componentes das regras básicas: 2 tabuleiros dupla face (4 pistas), 6 painéis, 6 pinos, 6 carros, 72 básicas (12 por cor), 18 melhorias iniciais (3 por cor), 37 estresse, 48 calor; o resto fica na caixa | [orig. p. 2] "You can leave the rest in the box for now" | V | |
| P2 | Básicas: valores 1 a 4, três de cada | [orig. p. 2] ilustração "x3" | V | P1 |
| P3 | Primeira partida: pista dos EUA; sugestão de 1 volta em vez das 2 impressas | [orig. p. 3] "consider only racing 1 lap" | V | |
| P4 | Cada jogador: carro, painel, pino, 12 básicas e 3 melhorias da cor | [orig. p. 3] "takes the car, player mat, Gear pawn and 12 Basic cards" | V | P1 |
| P5 | O tabuleiro diz quanto calor e estresse por carro; em geral 6 e 3 | [orig. p. 3] "typically it will be 6 Heat and 3 Stress" | V | |
| P6 | Pista dos EUA: 2 voltas, 69 casas por volta, 4 curvas por volta, 6 calor, 3 estresse | [orig. p. 3] ilustração (lida a 300 dpi) | V | P5 |
| P7 | Baralho: 12 básicas + 3 melhorias + 3 estresse, embaralhadas, viradas para baixo no espaço esquerdo do painel | [orig. p. 3] "place this draw deck facedown on your player mat's left spot" | V | P4, P5 |
| P8 | 6 calor virados para cima no motor, no meio do painel | [orig. p. 3] "faceup on the Engine spot" | V | P5 |
| P9 | Pino na 1ª marcha | [orig. p. 3] "Gear pawn in first gear" | V | |
| P10 | Estresse restante virado para cima perto do tabuleiro, como reserva | [orig. p. 3] "as a reserve" | V | |
| P11 | Grid sorteado, um carro de cada vez, posições em ordem crescente; define a ordem da primeira rodada | [orig. p. 3] "filling the spots in ascending order" | V | |
| P12 | Comprar 7 | [orig. p. 3] "Draw 7 cards" | V | P7 |
| P13 | Handicap: experiente tira 1 ou 2 calor | [orig. p. 3] "consider removing 1 or 2 Heat" | V | P8 |
| P14 | Livreto básico não trata de solo; solo e pilotos automáticos são o módulo Lendas; com menos de 4 jogadores, o livreto avançado sugere Lendas | [orig. p. 1]; [av. p. 5] "We suggest racing with Legends if there are less than 4 players" | V | |
| P15 | Calor e estresse que sobram voltam para a caixa nas regras básicas | Nenhuma regra básica tira calor de uma reserva; o estresse que sobra é a reserva (P10) | I | P8, P10 |

### 4.2 A rodada

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | Nove passos; obrigatórios 1, 2, 3 e 9; 4 a 8 situacionais | [orig. p. 4] "The remaining steps (4-8) are all situational" | V | |
| R2 | Passos 1 e 2 simultâneos; 3 a 9 um carro de cada vez, do mais à frente para trás | [orig. p. 4] "starting with the frontmost car… complete steps 3 through 9" | V | R1 |
| R3 | A ordem é recalculada durante a rodada ou fixa no começo? | [orig. p. 4] "proceed back through the positions" | L | R2 |
| R4 | Trocar: ficar, subir ou descer 1; 2 marchas custa 1 calor | [orig. p. 4 e 7] "shift it one gear up or down"; "pay 1 Heat immediately" | V | |
| R5 | Sem calor no motor para a troca dupla | Manual só diz isso do turbo | L | R4 |
| R6 | Jogar exatamente tantas cartas quanto a marcha, viradas para baixo; tudo menos calor | [orig. p. 4] "Your current gear determines exactly how many cards" | V | |
| R7 | Revelar, somar, andar exatamente; vaga mais perto da linha de corrida | [orig. p. 5] "Move your car forward by exactly that many Spaces" | V | R6 |
| R8 | Carros não impedem a passagem; casa cheia: primeira casa com vaga livre atrás | [orig. p. 5] "you are blocked" | V | R7 |
| R9 | Lado a lado: mais perto da linha de corrida conta como à frente | [orig. p. 5] "considered ahead for all purposes" | V | |
| R10 | Cada casa tem vagas lado a lado (duas, nas figuras) | Ilustração [orig. p. 4] e foto oficial; o texto não dá o número | I | |
| R11 | Símbolo +: vira cartas; básica vai para a área de jogo; não básica vai para o descarte e continua | [orig. p. 5] "keep flipping until you find a Basic card" | V | |
| R12 | Estresse precisa ser jogado para sair da mão | [orig. p. 5] "You will have to play Stress cards to get them out of your hand" | V | R11 |
| R13 | Melhorias 0 e 5 como básicas, mas descartadas quando viradas por +; a terceira é calor que começa no baralho | [orig. p. 7] | V | R11 |
| R14 | Exemplo do manual: 3 + 2 + 3 = 8, descartando 2 calor, 1 estresse e 1 melhoria | [orig. p. 5] legenda | V | R11, R13 |
| R15 | Completar a mão: área de jogo para o descarte; comprar até 7 | [orig. p. 6] | V | |
| R16 | Baralho vazio: embaralha o descarte; a área de jogo fica fora | [orig. p. 6] "do not shuffle the cards in your Play Area" | V | |

### 4.3 Curvas e calor

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| C1 | Conferir curva se cruzou linha de curva em qualquer momento do turno | [orig. p. 6] "If at any point this turn you crossed a Corner Line" | V | |
| C2 | Velocidade = soma das cartas da área de jogo, +1 se usou adrenalina | [orig. p. 6] | V | |
| C3 | Igual ou abaixo: nada; acima: paga a diferença | [orig. p. 6] | V | C2 |
| C4 | Várias curvas: cada uma separada, a partir da primeira | [orig. p. 6] "pay for each of them separately" | V | C3 |
| C5 | Pagar 1 calor: motor para o descarte | [orig. p. 7] | V | |
| C6 | Rodar: paga todo o calor; volta para a primeira casa disponível antes da linha que causou; 1 estresse (1ª/2ª) ou 2 (3ª/4ª) na mão; pino na 1ª | [orig. p. 6] | V | C3 |
| C7 | O estresse do rodopio vem da reserva | Implícito: a reserva existe (P10) e o manual não diz de onde | I | C6, P10 |
| C8 | Calor nunca é jogado nem descartado da mão | [orig. p. 7] "can never be discarded or played from your hand" | V | |
| C9 | Mão entupida: completa com calor, não anda, pino na 1ª, área de jogo no descarte, vai ao passo 9 | [orig. p. 7] | V | C8 |
| C10 | Depois da chegada, ignorar limites | [orig. p. 7] "Disregard any Speed Limits in corners after the finish line" | V | |

### 4.4 Reação, vácuo, descarte

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| A1 | Adrenalina: último carro a mover (dois últimos com 5 carros ou mais); +1 casa somando 1 à velocidade e/ou +1 resfriamento; não se guarda | [orig. p. 5] | V | |
| A2 | Adrenalina conta pelos carros que largaram | [orig. p. 7] | V | A1 |
| A3 | Reagir: símbolos em qualquer ordem, um por vez; nas básicas, os da marcha (turbo e/ou resfriamento) e a adrenalina | [orig. p. 5] | V | |
| A4 | Resfriamento: calor da mão para o motor; 1ª marcha 3, 2ª marcha 1 | [orig. p. 6] "1st gear (Cooldown 3) and 2nd gear (Cooldown 1)" | V | |
| A5 | Turbo: qualquer marcha, 1 calor, uma vez por turno, um símbolo +; pode ser bloqueado; conta na curva | [orig. p. 6] | V | A3, R11 |
| A6 | Sem calor no motor, não pode turbo | [orig. p. 7] | V | A5 |
| A7 | Vácuo: opcional, ao lado ou numa casa atrás de carro(s); +2 casas; uma vez por turno; casa cheia, primeira com vaga atrás; não conta na curva | [orig. p. 6] | V | |
| A8 | "Numa casa atrás" = a casa imediatamente atrás | Ícone do passo [orig. p. 4 e 6] | I | A7 |
| A9 | Vácuo nunca cruza a chegada nem é usado depois dela | [orig. p. 7] | V | A7 |
| A10 | Descartar da mão, virado para cima, opcional; nunca estresse nem calor; descarte não pode ser folheado, só o topo é público | [orig. p. 6] | V | |

### 4.5 Vitória

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| V1 | Vence o primeiro a cruzar a chegada depois das voltas | [orig. p. 7] | V |
| V2 | Mesma rodada: o mais à frente; lado a lado, o mais perto da linha de corrida | [orig. p. 7] | V |
| V3 | Fim da rodada: carros que chegaram vão em ordem para o Hall da Fama; segue até todos chegarem | [orig. p. 7] | V |

### 4.6 Erros comuns e de onde vem a evidência

Não foi consultado fórum: a lista abaixo vem das notas em destaque do próprio manual, que sinalizam onde ele espera erro. Andar menos que a velocidade ("exactly", em negrito, p. 5); vácuo contando na curva ("does NOT", p. 6); descartar calor ou estresse ("You can never choose to discard", p. 6); vácuo na chegada (p. 7). O tutorial põe essas quatro em `[!atencao]` ou no resumo "três erros mais caros".

## 5. Divergências entre edições

Só a edição em inglês foi lida. Não há como comparar com a brasileira (seção 2). A página da Days of Wonder chama as cartas básicas de "Speed cards"; o manual, de "Basic cards"; o tutorial usa "cartas básicas".

## 6. Plano instrucional

- **Classes de tarefa:** montar a mesa (seção de montagem); etapa 1, jogar uma rodada na reta (marcha, cartas, mover, estresse, completar a mão); etapa 2, passar por curvas (pagar, rodar, troca dupla, mão entupida); etapa 3, usar a reação e o vácuo e terminar a corrida.
- **Informação de apoio:** "Antes de tudo" (motor como orçamento) e os `[!entender]` de cada etapa (por que a curva olha a velocidade e não a posição; por que o vácuo é diferente do turbo).
- **Informação procedural:** os `[!passos]` e a folha de consulta.
- **Prática específica:** só onde o erro é comum: conta da curva (treino da etapa 2) e desempate na chegada.
- **Adiado de propósito:** estresse e melhorias iniciais vão em `[!mais]` da etapa 1 (aparecem cedo, mas não em toda rodada); vácuo e turbo só na etapa 3, depois da curva, porque a regra que importa sobre eles é a da curva.
- **Limite:** o texto não observa o leitor nem ajusta o apoio.

## 7. Extensão

Cerca de 5.950 palavras de texto (contagem sem marcação), dentro do alvo de 4.500 a 6.000. O que pesa: a montagem com 7 figuras e as tabelas, e a etapa 3, que junta cinco recursos e o fim da corrida. Leitura do que fica à vista: cerca de 15 minutos (`leitura_min` 15).

## 8. Contas

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1105/heat/bin/contas.py`. Saída conferida:

- Baralho inicial 12 + 3 + 3 = 18; motor 6.
- Etapa 1 (4min): 4 + 3 + 2 = 9. Exemplo de estresse: 4 + 1 = 5. Exemplo do manual: 3 + 2 + 3 = 8.
- Curva: 8 contra 5, excesso 3, motor 4, sobra 1. 7 contra 5, excesso 2.
- Rodopio: 2 + 1 + 2 + 1 = 6 contra 3, excesso 3, motor 2: roda, 2 estresses (4ª marcha).
- Duas curvas: velocidade 5, limites 4 e 2: excessos 1 e 3; motor 3, sobra 2 depois da primeira, roda na segunda.
- Sua vez da etapa 2: 4 + 4 + 3 = 11 contra 6, excesso 5, motor 4: roda, 2 estresses (3ª).
- Turbo: 3 + 3 + 2 = 8, turbo vira 4: 12; limite 8: excesso 4; com o turbo, 5 de calor no turno.
- Vácuo: velocidade 5, limite 5, anda 7, curva confere 5: nada.
- Adrenalina: 4 + 1 = 5 contra 4: excesso 1.
- Avaliação 3: 2ª marcha, 7 contra 4, excesso 3, motor 2: roda, 1 estresse. Avaliação 4: 5 contra 6: nada.

## 9. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (`avisos({"t": texto})`): nenhum aviso.
- Seções na ordem do BRIEF: setup, 4min, 0 a 8. Exercícios todos de múltipla escolha, sem seção "Respostas".
- Conversor `tools/como_jogar_md.py` (função `pagina`, sem gravar nada): gera a página sem erro, com 20 figuras/fotos.
- Legibilidade (Flesch adaptado ao português, `legibilidade.py` do repositório Arcvalion_gospel): 80,5; 421 frases, 12,6 palavras por frase. Só informação.

## 10. Figuras e dados do JSON

Figuras recortadas do manual em inglês, só a parte gráfica, `.webp` q80, até 1000 px, em `como-jogar/heat/figuras/`: `setup-tabuleiro` (p. 3), `setup-componentes` (p. 2; inclui os rótulos curtos de quantidade da ilustração), `setup-quadro` (p. 3), `setup-painel` (p. 3), `setup-estresse` (p. 3), `setup-grid` (p. 3), `sequencia` (p. 4; os rótulos em inglês fazem parte da arte, a legenda traduz), `pista` (p. 4, sem a legenda de texto), `estresse` (p. 5, sem as legendas em itálico). Um recorte da troca de duas marchas (p. 7) foi feito e descartado, por ser pequeno demais para ajudar.

JSON: jogadores, idade e duração da página da Days of Wonder e da capa do manual (p. 1: "1–6", "10 +", "60'"). A ficha da resenha registra 14+ na edição nacional segundo lojas; não foi confirmado em fonte da editora, e o JSON segue a Days of Wonder. `edicao`: "Manual oficial em inglês (Days of Wonder)", porque as regras não foram conferidas no manual brasileiro, embora a edição brasileira exista (SKU HET001 na biblioteca da Asmodee Brasil).
