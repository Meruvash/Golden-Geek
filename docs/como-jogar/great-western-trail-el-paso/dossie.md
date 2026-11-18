# Dossiê: Como Jogar Great Western Trail: El Paso

Escrito em 18/11/2026. Rascunho: `"publicar": false`, sem auditoria independente ainda.

## 1. Identificação do jogo

O pedido do editor foi "El Paso". O nome bate com mais de um jogo do hobby: *El Paso* de Stefan Dorra (2009, dados e apostas, BGG 56880), *El Paso* da Cheapass Games (1998, BGG 16607) e *Great Western Trail: El Paso*. O editor confirmou o último.

| Campo | Dado | Fonte |
|---|---|---|
| Nome | Great Western Trail: El Paso | Lookout; Asmodee Brasil |
| Autores | Alexander Pfister e Johannes Krenner | manual BR p. 16; página da Lookout |
| Ilustração | Chris Quilliams | manual BR p. 16 |
| Editora original e ano | Lookout Games (Lookout GmbH), 2025 | manual BR p. 16 ("© 2025 Lookout GmbH"); página da Lookout ("Release Year: 2025") |
| Edição brasileira | Galápagos (marca da Asmodee Brasil), SKU GWT301, EAN 7908704601772; tradução João José Góis | API pública da loja Asmodee Brasil (`/ccstoreui/v1/products/GWT301`, campo `brand: Galápagos`); manual BR p. 16 |
| Jogadores, idade, duração (Brasil) | 1 a 4, 14+, 60 a 120 min | mesma API (`x_numeroDeParticipantes`, `x_numeroMaximoDeParticipantes`, `x_faixaEtaria`, `x_tempoDePartida`) |
| Jogadores, idade, duração (Lookout) | 1 a 4, 12+, 60 a 90 min | página da Lookout. O JSON usa os dados da caixa brasileira |
| Jogo independente? | Sim. O manual traz todos os componentes (p. 2 e 3) e não cita outro jogo; a Asmodee Brasil o classifica como `x_tipo: "Caixa-base"` da família Great Western Trail; a Lookout diz que ele "can serve as an introduction to the series" | manual BR p. 2 e 3; API Asmodee; página da Lookout |

Uma listagem de loja dizia que El Paso não é independente e que precisaria do Great Western Trail 2ª edição. As fontes oficiais acima contradizem isso, e o tutorial diz, na seção 0, que não é preciso ter o Great Western Trail.

## 2. Fontes

| Fonte | Versão e arquivo | Onde | Situação |
|---|---|---|---|
| **Livro de regras da edição brasileira** (fonte principal) | Galápagos, `GWT301_regras_v2.0.pdf`, 16 páginas (510 x 737 pt), criado em 16/06/2026 (InDesign 21.3). O crédito impresso na p. 16 diz "v1.0", embora o arquivo se chame v2.0. A numeração impressa coincide com a do PDF | Biblioteca de downloads da Asmodee Brasil (o produto aponta para https://www.mundogalapagos.com.br/download-library, que redireciona para https://www.asmodee.com.br/download-library). Busca `https://api-prd.mundogalapagos.com.br/library-download/store/search?term=el%20paso`: itens 2743 e 2764. Arquivo: `store/file?id=2764&tagId=2&group=b2c` (HTTP 200, ZIP sem login) | Baixado e lido inteiro em 18/11/2026, texto e ilustrações |
| **Errata oficial brasileira** | `GWT301_ERRATA_v1.0.pdf`, 1 página, "v.1.0 - 06/26": só corrige a preparação do modo solo (3 cartas de **cada um** dos 4 tipos de trabalhador) | `store/file?id=2764&tagId=1&group=b2c` | Lida |
| **Apêndice brasileiro** | `GWT301_apêndice_v1.0.pdf`, 6 páginas numeradas de 1 a 6, criado em 07/10/2024: construções comuns (a e b), neutras, cartas de trem, bônus de trabalhador, ações auxiliares, fichas | `store/file?id=2764&tagId=6&group=b2c` | Lido inteiro |
| Item 2743 da biblioteca (ilustração, conteúdo da caixa) | | `tagId` 3, 5 e 6: 404 "The specified blob does not exist" | Não usado |
| Manual oficial em inglês, Lookout | `GWT_El_Paso_99992_ESG50190_Rules_EN_WEB_240930.pdf`, 16 páginas, criado em 30/09/2024 | https://www.lookout-spiele.de/upload/en_gwt_elpaso.html_GWT_El_Paso_99992_ESG50190_Rules_EN_WEB_240930.pdf | Lido inteiro; mesmo conteúdo e diagramação do brasileiro. Usado para conferir a tradução |
| Apêndice em inglês, Lookout (com "2nd Edition Changes" e "Hobby Next Promo") | `GWT_El_Paso_Appendix_EN_250708.pdf`, 8 páginas, 08/07/2025 | página da Lookout | Lido inteiro. Fonte do limite de 5 cartas de gado removidas, da construção 2a como escolha e da mudança no solo |
| Página do jogo, Lookout | Ficha, descrição, FAQ (limite de 5 cartas removidas; 2a "too powerful") | https://www.lookout-spiele.de/en/games/gwt_elpaso.html (robots.txt: 404) | Lida em 18/11/2026 |
| Página do produto, Asmodee Brasil | A página é montada por JavaScript; os dados vieram da API pública da loja, que o robots.txt não proíbe | https://www.asmodee.com.br/great-western-trail-el-paso/produto/GWT301 | Lida em 18/11/2026 |
| Vídeo | "EL PASO - Gameplay resumida (CONFIRA A ERRATA NA DESCRIÇÃO)", canal Duque Board Games, 24 min, publicado "há 1 ano" | https://www.youtube.com/watch?v=BRYd_hqAWO8, achado pela busca do próprio canal (`@DuqueBoardgames/search?query=el paso`); título e canal pelo oEmbed | Não baixado. A descrição do vídeo não foi lida (o YouTube devolveu a página de verificação "sorry"; não contornado) |

Tentativas sem resultado: busca no site da Galápagos (`galapagosjogos.com.br/busca`): 401; Ludopedia: 403. Não contornados. A resenha do site (`conteudo/great-western-trail.json`) já dizia que El Paso saiu no Brasil pela Asmodee: foi a pista que levou à biblioteca; nenhuma regra veio dela.

**Leitura.** `pdftotext -layout` página a página (texto em `scratchpad/elpaso/manual.txt`, com marcadores de página; o texto do manual em inglês e do apêndice em inglês está em `scratchpad/elpaso/manual_en.txt`) e páginas renderizadas a 250 e 400 dpi para ler o que só está nas ilustrações: valores de criação e pontos das cartas (p. 3), custo em construtores e pontos das construções comuns (p. 3), vaqueiros por raça no tabuleiro de gado (p. 4), discos do tabuleiro de jogador e os cantos escuros (p. 5 e 13), postos de troca 0, 5, 7, 9, 10, 12, 14, 16, 18, 20 e os pontos 2, 4, 7, 9, 12, 14 (p. 13).

## 3. Glossário (termos da edição brasileira)

| Termo no tutorial | Original | Página | Explicação |
|---|---|---|---|
| pastor | herder | p. 5 e 6 | A peça que anda pela trilha |
| trilha; local; passo | trail; location; step | p. 6 | Local é El Paso ou um espaço com ficha de construção; cada local é 1 passo |
| limite de passos | step limit | p. 6 | 3; sobe para 4 com o disco |
| El Paso; ficha de El Paso; espaço de El Paso | El Paso tile/space | p. 4 e 12 | Parada obrigatória, ficha A |
| construção neutra (B a G) | neutral building | p. 3 e 4 | Fichas fixas na trilha |
| construção comum (1a a 6a, lado b) | common building | p. 3 e 10 | Compradas e postas na trilha |
| oferta de construções; tabuleiro de construções | building display; building board | p. 4 e 10 | |
| espaço de construção (comum) | building space | p. 4 e 10 | Pode ter custo impresso |
| marcador de propriedade | property marker | p. 5 e 10 | 2 por jogador |
| ação auxiliar; seção de ações auxiliares | auxiliary action | p. 7 e 11 | |
| Fase de Movimento, Fase de Ação, Fase de Compra | Move/Action/Draw Phase | p. 6 e 7 | |
| limite de mão | hand size | p. 7 | 4; sobe para 5 |
| pilha de compra pessoal; pilha de descarte pessoal; baralho de rebanho | personal draw stack; discard pile; herd deck | p. 5 | |
| cartas de gado do jogador: Chinampo, Pineywoods, Galloway, Santa Gertrudis | Criollo, Pineywoods, Galloway, Santa Gertrudis | p. 3 e 5 | O inglês diz Criollo; o brasileiro, Chinampo |
| cartas do mercado de gado: Black Angus, Corriente, Shorthorn, Hereford; mercado de gado; tabuleiro de gado | market cattle; cattle market; cattle board | p. 3, 4 e 10 | |
| Simental; espaço do Simental | Simmental | p. 3, 4 e 14 | O brasileiro escreve com um m |
| valor de criação; valor total de criação | breeding value | p. 8 e 12 | |
| Entrega | Delivery | p. 12 | |
| posto de troca; espaço de posto de troca | trading post | p. 12 e 13 | |
| vaqueiro, construtor, engenheiro, trabalhador curinga | cowboy, builder, engineer, wild worker | p. 3 e 9 | |
| área dos trabalhadores; suprimento de trabalhadores | worker area; worker supply | p. 4 e 5 | |
| bônus de trabalhador | worker bonus | p. 9 | |
| cartas de trem (locomotiva e vagões); suprimento do trem | train cards; train supply | p. 4 e 10 | |
| ficha de objetivo; ficha bônus | objective/bonus tile | p. 4 e 10 | |
| ficha de troca; banco; Dólares | exchange token; bank; Dollars | p. 4 e 8 | |
| trilha de certificados; marcador de certificado; certificado permanente | certificate track | p. 5, 8 e 12 | |
| discos; espaços de disco; cantos escuros | discs; darkened corners | p. 5 e 13 | |
| bloco de pontuação | scoring pad | p. 14 | |

O manual brasileiro escreve "colocar cartas de construção comum" (p. 3) e "carta de construção comum" (p. 10) em dois lugares; o tutorial usa sempre "construção comum" ou "ficha de construção".

## 4. Base de regras

Classificação: [V] verificada no manual nesta sessão; [I] interpretada, com o motivo; [L] lacuna.

### 4.1 Objetivo e preparação
- Objetivo: mover o pastor pela trilha circular, fazer ações, entregar em El Paso; mais pontos vence [BR p. 3] [V].
- Preparação do tabuleiro, passos 1 a 10, Simental 9/14/19 [BR p. 4] [V].
- Mercado: Black Angus no espaço de 1 vaqueiro, Corriente 2, Shorthorn 3, Hereford 4 [BR p. 4, ilustração; coerente com o exemplo da p. 10 (3 vaqueiros, Shorthorn) e com a lista da Sue, p. 15] [V pela ilustração].
- Preparação do jogador, passos 11 a 14; capital 4+1, 5+1, 4+2, 5+2 [BR p. 5] [V].
- Cores não usadas voltam para a caixa [L]: o manual não diz; o tutorial avisa que é leitura do guia.

### 4.2 Turno
- Três fases em ordem; ficha de troca e bônus de trabalhador a qualquer momento [BR p. 6] [V].
- Primeiro turno: qualquer construção neutra, menos El Paso; pode repetir [BR p. 6] [V].
- Movimento: horário, 1 até o limite, só locais contam, bifurcação à escolha, não atravessa El Paso, pastores não se atrapalham [BR p. 6] [V].
- Ação: neutra ou própria = ações ou 1 auxiliar; comum de outro = 1 auxiliar; El Paso = todas [BR p. 7] [V].
- Ações de ficha: cada uma uma vez, qualquer ordem, pode pular (menos El Paso); custo em moeda vermelha [BR p. 8] [V].
- Compra: até o limite de mão; trabalhador comprado vai para a área dos trabalhadores e não conta; embaralhar só quando precisar [BR p. 7] [V].
- Trabalhador descartado vai para a pilha de descarte pessoal [I]: o manual não diz para onde vai; mas trabalhadores podem ser comprados da pilha de compra (p. 7) e são contados na pilha de descarte no fim (p. 14).

### 4.3 Ações
- Descartar gado por dinheiro, uma vez [BR p. 8] [V]. Ganhar dinheiro, certificados (até o 4), ficha de troca (compra 1, descarta 1; não combina) [BR p. 8] [V].
- Contratar: uma carta, curinga +4 [BR p. 9] [V]. Construção B: 5 e 8 (13 no total) [BR p. 9, ícone e exemplo] [V]; o apêndice BR diz 9 [divergência, seção 5].
- Bônus: vaqueiro +1 passo (não dá ação extra nem atravessa El Paso), construtor paga 2 e desce 1 certificado, engenheiro +1, curinga +2 [BR p. 9] [V].
- Comprar gado: vaqueiros e/ou curingas, 2 por trabalhador, carta para o descarte, uma por ação [BR p. 10] [V].
- Trem: engenheiros e/ou curingas, 2 por trabalhador, ações em qualquer ordem, uma carta por ação [BR p. 10] [V]. Cartas de trem lado da frente [apêndice BR p. 4] [V].
- Fichas de objetivo e bônus: aberta com reposição ou da pilha; a de moeda 2 cobra 2 [BR p. 10] [V].
- Colocar construção: construtores e/ou curingas, 2 por trabalhador, custo do espaço, marcador; não vira; substituir por uma de mais construtores pagando a diferença [BR p. 10] [V].
- Trabalhador gasto como custo não dá bônus [BR p. 11] [V].
- Auxiliares: quatro; a 1ª e a 3ª disponíveis; melhorias por disco; duas diferentes onde indicado [BR p. 11; apêndice BR p. 5] [V].
- Mover o pastor como ação, sem completar a mão antes [BR p. 11] [V]. Ganhar gado sem vaqueiros; Shorthorn por 2 [BR p. 11] [V]. Livrar-se de gado [BR p. 11] [V].
- Limite de 5 cartas de gado removidas [Lookout, apêndice EN de 08/07/2025 e FAQ da página] [V na errata da editora original; ausente do material brasileiro].

### 4.4 El Paso
- 5 Dólares; Simental se houver; entrega com mão inteira, cada tipo uma vez [BR p. 12] [V].
- Duplicata, certificados permanentes, gastar certificados da trilha [BR p. 12] [V].
- Disco em posto de valor mínimo até o total; sem repetir posto, exceto 0, 12, 16; empilha sobre outros [BR p. 12] [V].
- Cantos escuros só em postos de 10 ou mais; quantias dos discos; o que cada disco libera [BR p. 13; apêndice BR p. 5] [V].
- Sem discos, não põe; recompensa imediata; pontos nos postos de 10 ou mais; mão para o descarte [BR p. 13] [V].
- Valores dos postos e pontos (2, 4, 7, 9, 12, 14) [BR p. 13 e 14, ilustrações] [V pela ilustração]. As recompensas de cada posto não estão listadas em texto; o tutorial só cita os exemplos do texto (Dólares, ficha de objetivo, trabalhador).

### 4.5 Fim e pontuação
- Gatilho, próximo a chegar a El Paso ocupa o espaço do Simental, último turno dos outros [BR p. 14] [V]. Se o "próximo jogador" pode ser o mesmo que pegou o último [I]: o tutorial lê como o primeiro, qualquer um.
- Sete categorias; desempate por Dólares [BR p. 14] [V]. Escudos das cartas [BR p. 3, ilustração] [V]. Cartas iniciais sem escudo [V pela ilustração da p. 3].
- Objetivos: um item por objetivo; parcial não pontua [BR p. 14; apêndice BR p. 6] [V]. Construções como exceção [apêndice EN p. 6] [V na fonte inglesa; ausente do apêndice BR].

### 4.6 Casos gerais
- Dinheiro e fichas ilimitados; pilhas vazias ficam vazias; olhar o descarte, não a compra; contar o que sobra [BR p. 13] [V].

### 4.7 Erros comuns
Sem fonte de comunidade consultada. Os três do "Comece" vêm dos destaques do próprio manual: "deve parar" e "todas" em El Paso (p. 6 e 12, em negrito), "só tem uma opção" na construção de outro (p. 7) e "cada tipo é contado apenas uma vez" (p. 12, em negrito).

## 5. Divergências entre fontes

| Ponto | Edição brasileira | Lookout (original) | No tutorial |
|---|---|---|---|
| Remover gado | sem limite (p. 11; apêndice) | máximo de 5 por jogador (FAQ e apêndice EN, "2nd Edition Changes"; "did not make it into the printed rulebook") | segue a errata da Lookout, em `[!mais]` e `[!edicao]` |
| Construção 2a | apêndice BR p. 1 lista as duas ações | apêndice EN: uma ou outra, "You cannot do both actions!" | segue a Lookout, em `[!edicao]` |
| Segundo trabalhador da construção B | livro p. 9: 13 no total (5 + 8); apêndice BR p. 3: "por 9 Dólares" | apêndice EN: 8 | segue o livro de regras (8), avisa em `[!edicao]` |
| Construções nos objetivos | apêndice BR p. 6: só "cada item contribui para uma ficha" | apêndice EN p. 6: exceção das construções (vale o total de trabalhadores) | `[!mais]` cita a fonte inglesa |
| Construção 4b | apêndice BR p. 2: descartar Shorthorn por 2 e 2 fichas de troca | apêndice EN p. 3: pagar 2 por um Shorthorn e 2 fichas | não entra no tutorial (lado b fica para depois) |
| Solo | errata BR: 3 de cada tipo; disco da Sue no 5, primeira entrega no 7 (p. 15 e 16) | apêndice EN: disco no 0, primeira entrega no 5 | só citado em `[!mais]` |
| Raça inicial cinza | Chinampo | Criollo | Chinampo |

## 6. Plano instrucional

Classes de tarefa, da mais simples à completa: (1) montar e jogar o primeiro turno numa construção neutra (seção Comece); (2) mover com limite de passos e escolher entre ações e auxiliar (etapa 1); (3) gastar trabalhadores em gado, trem e construção (etapa 2); (4) chegar a El Paso e entregar (etapa 3); (5) fechar a partida e contar (etapa 4). Em cada uma: exemplo resolvido, tarefa para completar, tarefa sem apoio; treino rápido onde há conta que precisa virar automática (custos, valor da entrega).

Adiado: lado b, cartas de trem invertidas e solo (citados em `[!mais]`). O que cada construção faz fica no apêndice; o tutorial ensina a ler os símbolos pelas ações.

## 7. Extensão

8.833 palavras no arquivo na primeira versão (9.715 depois das correções da auditoria, com as tabelas de construções e trem), contando a montagem (1.542), as tabelas, as legendas das figuras, as opções dos exercícios, a folha de consulta (366) e as fontes (173). O corpo das etapas tem cerca de 4.800. Passou do alvo de 6.000 do BRIEF por três razões: a montagem tem 14 passos com figura; as ações são muitas (cinco tipos de gasto de trabalhador e quatro auxiliares); e a entrega pede a tabela dos 7 discos. Os tutoriais publicados de peso parecido estão entre 6.700 (Heat) e 10.400 (Arcs). Se o editor quiser encurtar, os candidatos são as tabelas de raças e de construções da etapa 2, que repetem a folha de consulta.

## 8. Contas

Todas refeitas em `scratchpad/elpaso_scripts/contas.py` (todas OK):

- Manual p. 12 e 13: 8; com duplicata 10; com 1 permanente e 3 gastos 12; postos 0, 5, 10, 12 com discos em 7 e 9.
- Comece: C dá 4 + 2 = 6; D dá 4 + 2 − 1 − 2 = 3 e compra 1 carta.
- Mão inicial de quatro tipos: 1 + 2 + 2 + 2 = 7.
- Contratar em B com 12: 7, falta 1, curinga +2 = 9, segundo por 8, sobra 1.
- Construção 2a: 2 × 2 + 1 = 5; troca 1a por 3a: 2 construtores e 4 Dólares. Trem 3: 6. Hereford: 4 vaqueiros e 8. Curinga em B: 9.
- Entrega: 1 + 3 + 5 = 9; +1 = 10; +2 = 12; postos 0, 7, 9, 10, 12 com discos em 0, 5, 12. Sua vez: 2 + 3 + 2 = 7; com duplicata 9.
- Pontuação: 23 // 5 = 4; 4 + 10 = 14; 2 + 7 = 9; 6 + 3 + 4 = 13; 16 + 5 + 6 + 6 + 0 + 2 = 35; 5; 4; total 84. 14 Dólares = 2 pontos.
- Avaliação 4: 4 + 5 + 1 = 10.

## 9. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/great-western-trail-el-paso/tutorial.md`: "seção Comece a jogar dentro da diretriz".
- Travessão e meia-risca no tutorial: zero.
- Padrões de `tools/vicios.py` aplicados ao tutorial: zero ocorrência.

## 10. Figuras, fotos e vídeo

**Figuras** (`como-jogar/great-western-trail-el-paso/figuras/`, recortes do manual brasileiro renderizado a 250 dpi, webp qualidade 80, até 1000 px): `setup-visao-geral` (p. 4), `setup-tabuleiro` (p. 4), `setup-trem` (p. 4), `setup-construcoes` (p. 4), `setup-mercado-banco` (p. 4), `setup-tabuleiro-jogador` (p. 5), `setup-jogador` (p. 5), `movimento` (p. 6), `auxiliar` (p. 7), `entrega-cartas` (p. 12), `entrega-postos` (p. 12), `entrega-exemplo` (p. 13), `objetivos` (p. 14). Os passos 13 e 14 da montagem não têm ilustração no manual (só o ícone da ficha de objetivo no 13); está dito no tutorial.

**Fotos oficiais** (`como-jogar/great-western-trail-el-paso/fotos/`, com `fontes.json`): 5 fotos da página do jogo na Lookout Games (capa, mesa, jogabilidade, 2 de componentes), pela skill `imagens` (`robo.py triagem`, `buscar --url`, `aprovar`, `crivo.py --aplicar`: PUBLICA). Detector de rostos: 0 rosto de frente em todas; conferido à mão: só ilustrações de cartas e caixa, nenhuma pessoa real. A pasta `great-western-trail-el-paso/` da raiz e o `triagem/great-western-trail-el-paso.json` foram apagados.

**Vídeo:** Duque Board Games, "EL PASO - Gameplay resumida (CONFIRA A ERRATA NA DESCRIÇÃO)", título e canal pelo oEmbed. É o vídeo "El Paso" que a busca do canal devolveu, publicado há cerca de um ano (2025), coerente com Great Western Trail: El Paso; o mesmo canal tem uma análise da 2ª edição do Great Western Trail. A descrição não pôde ser lida (verificação do YouTube), então a identidade do jogo no vídeo é inferida pelo título, pela data e pela menção à errata. Vídeo de partida, não de regras; não foi achado vídeo de regras em português para pôr junto.

## 11. Dados do JSON

`jogadores`, `duracao` e `idade` da API da Asmodee Brasil (1 a 4, 60 a 120 min, 14+). `edicao`: "Edição Galápagos (Asmodee)". `resenha`: `great-western-trail`, a resenha comparativa do site que trata também de El Paso (só para o link; nenhuma regra veio dela). `etapas`: 4. `publicar`: false.
