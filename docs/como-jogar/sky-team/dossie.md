# Dossiê: Como Jogar Sky Team

Entrega 1 da linha COMO JOGAR para *Sky Team* (Luc Rémond, Le Scorpion Masqué; no Brasil, Galápagos, SKU SKT001). Produzido em 08/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e os ajustes do pedido do dia: jogo leve/médio, 4.000 a 5.000 palavras, 3 etapas; ensinar só o primeiro aeroporto (Montreal-Trudeau, como o manual recomenda) e dizer como entram os módulos dos outros aeroportos, sem ensiná-los; seção de montagem com figura do manual em cada passo que pode ser mostrado.

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. O que sustenta a escolha:

- **Manual acessível:** sim, o da edição brasileira (seção 2).
- **Resenha no Elite:** sim, `/sky-team/` e `conteudo/sky-team.json`. No JSON, `"resenha": "sky-team"`. A resenha cita a edição nacional como Asmodee e lista a página da Galápagos (`loja.galapagosjogos.com.br/sky-team/produto/SKT001`) entre as fontes; o manual brasileiro é da Galápagos (créditos, p. 11). A foto oficial aprovada (`sky-team/fotos/mesa-1.webp`, Le Scorpion Masqué) entra na seção de montagem com o caminho `../../sky-team/fotos/mesa-1.webp`, descrita como o que é: conteúdo da caixa em inglês, com dados já no painel e peças de módulos, e não a montagem da partida básica.
- **Complexidade:** sete tipos de espaço no painel, duas ações obrigatórias, marcos móveis que mudam o efeito da velocidade, cinco derrotas no meio da partida e quatro condições de vitória. Jogo leve/médio: 3 etapas.
- **Procura real (08/11/2026, cerca de 14h25 UTC):** o autocompletar do Google para "como jogar sky team" devolve "como jogar sky team"; o do YouTube (`client=youtube&ds=yt`) devolve o mesmo termo.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual da edição brasileira, "Procedimento de Pouso"** (fonte principal) | Galápagos, SKT001, "v1.0" impresso na p. 11; © 2023 Le Scorpion Masqué; tradução Maria do Carmo, revisão Felipe Ramos e Luis Perdomo, diagramação Robson Minghini; 12 páginas (496 x 694 pt); PDF criado em 08/12/2023 (InDesign 19.0); sha256 8184425c…f9d850 | Biblioteca de downloads da Asmodee Brasil. Busca `https://api-prd.mundogalapagos.com.br/library-download/store/search?term=sky` listou "SKT001 - Sky Team - SKU: SKT001" (item 2136, pai 2134, etiquetas Regras e Extras) e "Sky Team - SKU: SKT001" (item 2749, pai 2748). Download: `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2136&tagId=2&group=b2c` (HTTP 200, ZIP com `SKT001_regras_v1.0.pdf` e `SKT001_diario-de-bordo_v1.0.pdf`) | Baixado e lido inteiro em 08/11/2026 |
| **Diário de Bordo** (segundo livreto, edição brasileira) | Galápagos, 8 páginas, arquivo interno "ST_Rules02_EN_24aug2023_pt-BR_v1.01", PDF de 12/12/2023, modificado em 18/06/2025; sha256 72f1cd49…7e415d | Mesmo ZIP | Lido inteiro em 08/11/2026; usado só para dizer como os cenários e módulos entram |
| Item 2749 da biblioteca | | `file?id=2749&tagId=2&group=b2c` respondeu 404 (JSON) | Não usado |
| **Manual original em inglês, "Landing Procedure"** | Le Scorpion Masqué, `st_rules01_en_06jun2023.pdf`, 12 páginas; sha256 d5e46e0c…8b24e5 | Link da página oficial: https://www.scorpionmasque.com/sites/scorpionmasque.com/files/st_rules01_en_06jun2023.pdf | Baixado em 08/11/2026; consultado só para conferir os Flapes (o texto em inglês também só nomeia o 1/2 e o 2/3) |
| **Página oficial do jogo** | "exclusively for 2 players"; "11 airports and 21 exciting scenarios"; conteúdo da caixa, incluindo "10 Switches (for the Flaps, Landing Gear, and Brakes)" | https://www.scorpionmasque.com/en/sky-team | 08/11/2026 (robots.txt: crawl-delay 10, respeitado entre os pedidos) |
| **Vídeo** "SKY TEAM - Gameplay resumida", Duque Board Games | Título e canal pelo oEmbed oficial; achado pela busca do próprio canal (`@DuqueBoardgames/search?query=sky%20team`, `Accept-Language: pt-BR`); nada baixado | https://www.youtube.com/watch?v=KVr1v6zZkos | 08/11/2026 |
| FAQ ou errata oficial | A página oficial tem um "Haneda (HND) re-balancing" (arquivo num SharePoint), que trata de um cenário do Diário de Bordo, fora de Montreal. Não foi aberto: não afeta o que o guia ensina | | Registrado |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial; +https://eliteboardgamers.com.br)`, que se identifica como robô. O `www.asmodee.com.br` não foi acessado. A loja da Galápagos (`loja.galapagosjogos.com.br`) respondeu Access Denied já no `robots.txt` e na página do produto; não houve nova tentativa nem contorno. O grupo `b2b` da biblioteca não foi consultado. YouTube: só a página de busca do canal (fora de `/results`, que o `robots.txt` proíbe) e o oEmbed.

**Como o manual foi lido.** O PDF tem camada de texto; foi extraído página a página com `pdftotext` (com e sem `-layout`) e lido inteiro. As páginas foram renderizadas a 80, 200, 300 e 400 dpi (e a p. 5 a 600 dpi) para ler o que só está nas ilustrações (seção 4.7). Tudo fica no scratchpad, fora do repositório:

- PDFs: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1108/sky-team/br/SKT001_regras_v1.0.pdf` e `.../d1108/sky-team/br/SKT001_diario-de-bordo_v1.0.pdf`; inglês em `.../d1108/sky-team/en/rules01_en.pdf`
- Texto por página, regras: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1108/sky-team/txt/r1.txt` a `r12.txt` (sem `-layout`) e `rl1.txt` a `rl12.txt` (com `-layout`); Diário de Bordo em `.../txt/d1.txt` a `d8.txt`; inglês em `.../txt/en1.txt` a `en12.txt`
- Páginas renderizadas: `.../d1108/sky-team/img/p-01.png` a `p-12.png` (80 dpi), `h-01.png` a `h-12.png` (200 dpi), `t-01.png` a `t-12.png` (300 dpi)

## 3. Glossário

Nomes impressos no manual brasileiro; o tutorial usa só estes.

| Termo | Original (EN) | Página | Explicação |
|---|---|---|---|
| Painel de Controle | Control Panel | p. 2 e 3 | O tabuleiro: a cabine |
| disco de Eixo da Aeronave; Seta do Eixo | Airplane Axis disc | p. 2, 3 e 5 | Mostra a inclinação |
| Interruptores | Switches | p. 2 e 3 | Viram para a luz verde |
| Velocímetro | | p. 3 | Arco de números em volta do Eixo |
| marco de Aerodinâmica azul / alaranjado | Aerodynamics markers | p. 3, 6 a 8 | Limites de 0/1/2 espaços |
| marco de Frenagem (vermelho); trilha de Frenagem; força dos Freios | Brake marker | p. 3, 9 e 10 | |
| Esteira de Altitude; tela de Altitude Atual; Altitude Atual | Altitude track | p. 3 e 9 | 7 espaços, um por rodada |
| Esteira de Aproximação; tela de Posição Atual; Posição Atual | Approach track | p. 3 e 6 | O caminho até o aeroporto |
| peças de Avião; ícones de Tráfego | Airplane tokens | p. 3 e 7 | |
| ficha de Rerrolagem; estoque | Reroll token | p. 3 e 4 | |
| peças de Café; reserva | Coffee | p. 3 e 8 | |
| escudo | Screen | p. 3 | |
| Piloto (azul); Copiloto (alaranjado) | Pilot; Co-Pilot | p. 3 | |
| Discussão de estratégias e rolagem dos dados; Alocação de dados; Fim da rodada | | p. 4 e 9 | As 3 fases |
| alocar (um dado) | | p. 4 | |
| ações obrigatórias | | p. 5 | Eixo e Motores |
| Eixo; parafuso | Axis; spin | p. 5 | |
| Motores; velocidade | Engines; speed | p. 6 | |
| colisão; ultrapassagem do aeroporto | | p. 6 | |
| Rádio; Torre de Controle | Radio | p. 7 | |
| Trens de Pouso | Landing Gear | p. 7 | |
| Flapes | Flaps | p. 8 | |
| Concentração | Concentration | p. 8 | |
| Freios | Brakes | p. 9 | |
| Diminuição da Altitude | | p. 9 | |
| Chegar Cedo Demais ao Aeroporto; Não Chegar ao Aeroporto a Tempo | | p. 10 | |
| última rodada; Rodada Final - Pouso; condição de vitória A a D | | p. 10 e 11 | |
| Diário de Bordo; cenário; módulos; Habilidades Especiais | Flight Log | p. 11; DB p. 2 | Citados só no fim |
| Dado de Tráfego; Curvas; Querosene; Estagiário; Vento; Tempo Real; Perda de Querosene; Freios para Gelo | | DB p. 3 a 5 | Só nomeados |

O manual escreve "Flapes" e "Trens de Pouso" com maiúscula como nomes de setor; o tutorial segue.

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[VI]` verificada na ilustração, `[I]` interpretada, `[L]` lacuna. Fonte `[BR p. N]` (regras), `[DB p. N]` (Diário de Bordo).

### 4.1 Montagem e preparação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| P1 | Ao abrir a caixa: descartar partes com o símbolo, colar 9 adesivos, encaixar o disco, pôr os 10 Interruptores nas luzes verdes | [BR p. 2] "Cole os 9 adesivos dupla face" | V | |
| P2 | Componentes não mencionados (compartimento fechado) são dos módulos avançados; deixar onde estão | [BR p. 3] "deixe-os exatamente onde estão" | V | |
| P3 | Painel entre os dois, de preferência perto e do mesmo lado; seta do Eixo no triângulo preto; Interruptores tampando as luzes | [BR p. 3] passo 1 | V | P1 |
| P4 | Marco azul entre 4 e 5; alaranjado entre 8 e 9 | [BR p. 3] passo 2 | V | |
| P5 | Marco de Frenagem à esquerda do 2 | [BR p. 3] passo 3 | V | |
| P6 | Lado azul = Piloto, 4 dados azuis; lado alaranjado = Copiloto, 4 alaranjados | [BR p. 3] passo 4 | V | |
| P7 | Esteira de Altitude, lado verde/amarelo, fenda superior direita, até 6.000 | [BR p. 3] passo 5 | V | |
| P8 | Esteira de Aproximação YUL na fenda superior esquerda, até o ícone de nuvem | [BR p. 3] passo 6 (o ícone é uma nuvem na arte) | V | |
| P9 | Uma ficha de Rerrolagem em cada ícone de Rerrolagem da Altitude; os ícones estão no 6.000 e no 2.000 | [BR p. 3] passo 7; ilustração | V / VI | P7 |
| P10 | Uma peça de Avião por ícone de Tráfego; na ilustração, 9 aviões em Montreal (2, 3, 1, 2, 1 nos espaços) e 3 sobrando | [BR p. 3] passo 8; ilustração | V / VI | P8 |
| P11 | Reserva de Café ao lado do tabuleiro, não em cima | [BR p. 3] passo 9 | V | |
| P12 | Um escudo para cada; ler os lembretes | [BR p. 3] passo 10 | V | |
| P13 | Exatamente 2 jogadores | [BR p. 1] ícone "2"; página oficial "exclusively for 2 players" | V | |
| P14 | Diário de Bordo só depois de pousar em Montreal | [BR p. 11]; [DB p. 1] "NÃO ABRA ESTE LIVRETO ANTES DE CONSEGUIR POUSAR EM MONTREAL" | V | |

### 4.2 A rodada

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| R1 | 7 rodadas; 3 fases: discussão e rolagem, alocação, fim da rodada | [BR p. 4] "A partida tem 7 rodadas" | V | |
| R2 | Discussão: estratégia permitida, falar dos dados proibido | [BR p. 4] "Vocês não podem falar sobre os dados" | V | |
| R3 | Rolar 4 dados atrás do escudo; silêncio até o fim da rodada, salvo correção de erro de regra | [BR p. 4] "absolutamente em silêncio" | V | R2 |
| R4 | Ficha de Rerrolagem na Altitude Atual vai para o estoque; uso a qualquer momento por qualquer um; os dois rerrolam uma vez quantos dados quiserem dos que restam | [BR p. 4] "OS DOIS JOGADORES poderão rerrolar UMA VEZ" | V | P9 |
| R5 | Ficha não usada fica no estoque | [BR p. 4] não diz | I | R4 |
| R6 | Turnos alternados; a seta da tela de Altitude Atual diz quem começa; na 1ª rodada, o Piloto | [BR p. 4] regra A | V | |
| R7 | Um dado por turno, dos que estão atrás do escudo, num espaço livre | [BR p. 4] regra B | V | |
| R8 | Restrição de cor: azul só Piloto, alaranjado só Copiloto, bicolor qualquer um | [BR p. 4] | V | |
| R9 | Restrição de número (ex.: primeiro Flape 1 ou 2; primeiro Freio 2) | [BR p. 4] regras C e D | V | |
| R10 | Rádio: cor sim, número não; Concentração: nenhuma restrição | [BR p. 4] regras E e F | V | |
| R11 | Eixo e Motores obrigatórios para cada jogador em toda rodada; sem um dado de cada cor nos dois no fim da rodada, derrota imediata; não precisam ser os primeiros | [BR p. 5] | V | R8 |
| R12 | Fim da rodada: Altitude desce 1 espaço (1.000 pés); dados de volta; aeroporto na Posição Atual e avião na Altitude leva à última rodada; senão, nova rodada | [BR p. 9] | V | |

### 4.3 Eixo e Motores

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| E1 | No segundo dado do Eixo: iguais, nada; diferentes, girar a diferença para o lado do maior; o Eixo não volta ao centro | [BR p. 5] "Não devolva o Eixo a seu ponto inicial" | V | R11 |
| E2 | Seta alcança ou passa o X: parafuso, derrota imediata | [BR p. 5] "PARAFUSO" | V | E1 |
| E3 | O X fica depois da marca 2 de cada lado (3 pontos = parafuso) | [BR p. 5] ilustração a 600 dpi: triângulos 0, 1, 2 e o X vermelho em seguida | VI | E2 |
| M1 | No segundo dado dos Motores: soma = velocidade; abaixo do azul, não move; entre os marcos, 1; acima do alaranjado, 2 | [BR p. 6] | V | R11, P4 |
| M2 | Aviões entrando na Posição Atual não matam; avançar com aviões na Posição Atual é colisão, derrota | [BR p. 6] "COLISÃO" | V | M1 |
| M3 | Avançar com o aeroporto na Posição Atual: ultrapassagem, derrota | [BR p. 6] | V | M1 |
| M4 | Avanço de 2 com aviões no espaço seguinte: colisão, lendo o avanço espaço por espaço | [BR p. 6] não trata à parte; [DB p. 3] conta os dois espaços nas curvas | I | M2 |

### 4.4 Outras ações

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| A1 | Rádio: Piloto 1 espaço, Copiloto 2; contar a partir da Posição Atual (= 1) até o valor; tirar imediatamente uma peça de Avião; sem avião, sem efeito | [BR p. 7] | V | R10 |
| A2 | Trens de Pouso: só Piloto; qualquer ordem; Interruptor para a luz verde; marco azul +1; com os 3, entre 7 e 8; dado em Trem já verde não tem efeito | [BR p. 7] | V | P4 |
| A3 | Trens de Pouso 1/2, 3/4, 5/6 | [BR p. 7] texto cita 3/4; ilustrações p. 4, 7 e 11 | V / VI | A2 |
| A4 | Flapes: só Copiloto; em sequência, de cima para baixo; Interruptor; marco alaranjado +1; com todos, além do 12 | [BR p. 8] | V | P4 |
| A5 | Flapes 1/2, 2/3, 4/5, 5/6 | [BR p. 8] texto cita 1/2 e 2/3; ilustrações p. 4, 8 (300 e 400 dpi) e 11; o inglês também só nomeia os dois primeiros | V / VI | A4 |
| A6 | Concentração: qualquer jogador, qualquer dado, espaço livre; põe imediatamente 1 Café num dos 3 espaços; máximo 3 no painel | [BR p. 8] | V | |
| A7 | Concentração tem 3 espaços | [BR p. 4] ilustração (F) e p. 8 | VI | A6 |
| A8 | Café: ao alocar qualquer dado, gastar 1 ou mais, cada um ±1; voltam à reserva; qualquer um usa; não usados ficam; valores só entre 1 e 6, sem dar a volta | [BR p. 8] | V | A6 |
| A9 | Freios: só Piloto; 2, 4, 6 em sequência; marco de Frenagem +1; efeito só na última rodada; não é preciso acionar todos | [BR p. 9] | V | P5 |
| A10 | Posições do marco: antes do 2; entre 2 e 3 (1 Freio); entre 4 e 5 (2 Freios); depois do 6 (3 Freios) | [BR p. 9] "deixando-o entre o 4 e o 5"; ilustrações p. 9 e 11 | V / VI / I (o "depois do 6" é leitura da trilha) | A9 |
| A11 | Interruptores também nos Freios | página oficial "Switches (for the Flaps, Landing Gear, and Brakes)"; ilustração [BR p. 9] | VI | A9 |

### 4.5 Fim da partida

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| F1 | Chegar cedo: aeroporto na Posição Atual sem o avião na Altitude; jogar rodadas sem avançar | [BR p. 10] | V | M3 |
| F2 | Não chegar a tempo: avião na Altitude sem o aeroporto na Posição Atual; derrota | [BR p. 10] | V | R12 |
| F3 | Última rodada: Motores comparados com os Freios, não com os marcos de Aerodinâmica | [BR p. 10] "CUIDADO: A leitura do Velocímetro muda!" | V | A9 |
| F4 | Força dos Freios precisa ser maior que a velocidade; não pode estar abaixo de 2 | [BR p. 10] "a força deles não pode estar abaixo de 2" | V | A10 |
| F5 | Vitória no fim da última rodada: A sem aviões; B Flapes e Trens verdes; C Eixo perfeitamente horizontal; D velocidade menor que os Freios | [BR p. 11] | V | |
| F6 | Montreal: aeroporto 6 espaços depois da nuvem; 6 avanços em 6 rodadas | [BR p. 3] ilustração (7 espaços: nuvem, vazio, 1, 2, 1, 3, aeroporto com 2); conferido com as p. 6, 9 e 10, em que o aeroporto tem 2 ícones e o espaço anterior 3 | VI / I | P8, R12 |
| F7 | Eixo e Motores continuam obrigatórios na última rodada | [BR p. 5] "em todas as rodadas" | V | R11 |

### 4.6 Diário de Bordo (só citado)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| D1 | 21 cenários; cor indica dificuldade (Pouso Rotineiro, Condições Excepcionais, Somente Pilotos de Elite, Pouso Heroico) | [DB p. 2] | V |
| D2 | 11 aeroportos | página oficial | V |
| D3 | Preparação: Esteira de Aproximação do cenário (algumas mais longas ou curtas); Altitude do lado da mesma cor; módulos indicados; cartas de Habilidade Especial em alguns cenários | [DB p. 2] | V |
| D4 | Módulos: Dado de Tráfego e Curvas (efeitos das esteiras), Querosene, Estagiário, Vento, Tempo Real, Perda de Querosene, Freios para Gelo | [DB p. 3 a 5] | V |

### 4.7 O que foi lido nas ilustrações

A3 e A5 (números de Trens e Flapes), A7 (3 espaços de Concentração), A10 e A11 (marco e Interruptor dos Freios), E3 (X do Eixo), P9 (Rerrolagem no 6.000 e no 2.000), P10 e F6 (aviões e comprimento da esteira de Montreal). O tutorial diz isso num bloco `[!edicao]` em "Situações especiais" e, no ponto de uso, "na ilustração".

### 4.8 Erros comuns

O manual mesmo aponta: falar dos dados (p. 4, com exemplos de frases proibidas), o Eixo como "arriscado" (p. 12), a ordem obrigatória dos Flapes e Freios (p. 8 e 9, em caixa de destaque) e a mudança de leitura do Velocímetro na última rodada ("CUIDADO", p. 10). A resenha do site (`primeira_partida`) registra que "o que mais confunde é o eixo e a regra de que os dois dados dos motores precisam ser colocados em toda rodada". Não se consultou fórum.

## 5. Divergências entre edições

O manual brasileiro é tradução do inglês (arquivo do Diário de Bordo: "ST_Rules02_EN_24aug2023_pt-BR"). Conferido no inglês só o trecho dos Flapes; sem divergência. Uma falha de digitação do brasileiro ("O Piloto só poder alocar", p. 4) não muda a regra.

## 6. Plano instrucional

- **Classes de tarefa:** montar a mesa; etapa 1, jogar uma rodada com as duas ações obrigatórias (Eixo e Motores) e o fim da rodada; etapa 2, usar Rádio, Trens de Pouso, Flapes, Concentração e Café e evitar colisão; etapa 3, frear, acertar a chegada e cumprir as condições de vitória.
- **Informação de apoio:** "Antes de tudo" (dado como ação e recado; altitude que não espera) e os `[!entender]` (por que Eixo e Motores dependem dos dois dados; como os marcos mudam a velocidade necessária; a conta de 6 avanços em 6 rodadas).
- **Informação procedural:** os `[!passos]`, a tabela de espaços na folha de consulta.
- **Prática específica:** só onde o erro é caro: inclinação acumulada do Eixo (etapa 1), sequência dos Flapes (treino da etapa 2), Freios na última rodada (etapa 3).
- **Adiado de propósito:** Rerrolagem fica em `[!mais]` (duas rodadas por partida); colisão e ultrapassagem só depois do Rádio; Diário de Bordo só citado no fim.
- **Limite:** o texto não observa o leitor nem ajusta o apoio.

## 7. Extensão

Cerca de 5.100 palavras de corpo (sem legendas de figura, links e fontes; 5.700 contando tudo), no limite de cima do alvo de 4.000 a 5.000. O que pesa: a tabela de componentes e a de espaços (obrigatórias pelo padrão), e a etapa 2, que junta quatro setores do painel e o Café. Leitura do que fica à vista, pelo conversor rodado numa cópia no scratchpad: cerca de 8 minutos; leitura completa, a 200 palavras por minuto, cerca de 25 (`leitura_min` 25).

## 8. Contas

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1108/sky-team/scripts/contas.py`. Marcos como números (azul 4,5; alaranjado 8,5; Frenagem 1,5 / 2,5 / 4,5 / 6,5). Saída conferida:

- Montreal: 2 + 3 + 1 + 2 + 1 = 9 aviões; 12 − 9 = 3 sobram. Azul com 3 Trens: 7,5 (entre 7 e 8); alaranjado com 4 Flapes: 12,5 (além do 12).
- Exemplos do manual: Motores 1 + 3 = 4 → 0; 3 + 4 = 7 → 1; 6 + 4 = 10 → 2. Eixo 5 × 3 → 2 para o Piloto. Café 3 − 2 = 1. Freios 2 e 4 → 4,5; 1 + 2 = 3 < 4,5.
- 4min resolvido: Piloto {2, 3, 5, 6}, Copiloto {1, 3, 4, 4}, todos usados uma vez. Eixo 3 × 3 → 0. Flape 1/2 → alaranjado 9,5; 5 + 4 = 9 → 1 (sem o Flape → 2). O Rádio do Piloto com 6 aponta para o 6º espaço, que na ilustração tem 3 aviões.
- 4min complete: 4 × 4 → 0; 4 × 6 → 2 para o Copiloto. Sua vez: 6 + 3 = 9 → 2.
- Etapa 1: resolvido, inclinação 1 para o Piloto, 2 × 4 → 2 para o Copiloto, termina 1 para o Copiloto; 4 + 4 = 8 → 1. Complete: 4 + 5 = 9 → 2; 4 + 4 = 8 e 4 + 2 = 6 → 1. Sua vez: 2 para o Copiloto + (1 × 2 → 1 para o Copiloto) = 3 → parafuso.
- Etapa 2: 2 Trens → azul 6,5; 2 + 4 = 6 → 0 (sem Trens → 1). Complete: 3 − 1 = 2 no Flape 1/2. Sua vez: Rádios 1 e 2 com aviões só no espaço 1 → sai 1. Treino: Flape 4/5 antes do 2/3 é proibido.
- Etapa 3: Freios: 0 → nenhuma soma possível (mínimo 2); 1 → máximo 2; 2 → máximo 4; 3 → máximo 6. Resolvido: 1 + 3 = 4 < 4,5 vence; com 4 do Copiloto, 1 + 4 = 5, que não é menor que 4,5. Eixo 5 × 5 → 0. Complete: fim da 4ª rodada → Altitude 2.000; restam as rodadas de 2.000 e 1.000 antes da do avião. Sua vez: 5 não é menor que 4,5.
- Avaliação: 6 × 2 → 4 (parafuso); 5 + 5 = 10 com alaranjado 10,5 → 1; 1 + 1 = 2 < 2,5.

## 9. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (`avisos({"t": texto})`): nenhum aviso.
- `tools/checar_comece.py docs/como-jogar/sky-team/tutorial.md`: dentro da diretriz.
- Seções na ordem do BRIEF: setup, 4min, 0 a 8. Exercícios todos de múltipla escolha.
- Conversor `tools/como_jogar_md.py` (função `pagina`), rodado numa cópia em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1108/sky-team/copia/`, nunca no repositório: página gerada sem erro, 21 figuras e fotos, o vídeo e nenhuma marcação crua (`??`, `[!`, `**`) no HTML.
- Legibilidade (Flesch adaptado ao português, `legibilidade.py` do repositório Arcvalion_gospel): 77,3; 372 frases, 12,6 palavras por frase. Só informação.

## 10. Figuras e dados do JSON

Figuras recortadas do manual brasileiro (300 dpi), só a parte gráfica, `.webp` q80, até 1000 px, em `como-jogar/sky-team/figuras/`: `setup-setores` (p. 2, o painel com os nomes dos setores, que são rótulos da arte), `setup-painel` (p. 3, passos 1 a 3), `setup-esteiras` (p. 3, passos 5 a 8), `setup-dados` (p. 3, passos 4, 9 e 10), `eixo` (p. 5), `motores` (p. 6, dois dos três casos), `radio` (p. 7), `flapes` (p. 8), `cafe` (p. 8), `freios` (p. 9), `pouso` (p. 11). Os recortes levam os números de passo e os rótulos curtos da ilustração, sem os blocos de texto. A montagem única ao abrir a caixa (p. 2) não ganhou figura própria: os quadros dela trazem texto do manual dentro; a figura `setup-setores`, da mesma página, mostra o painel montado.

JSON: "2 jogadores", "20 min" e "14+" da capa do manual (p. 1: ícones "20'", "+14" e "2"). `edicao`: "Edição Galápagos", porque as regras foram conferidas no manual brasileiro da Galápagos.
