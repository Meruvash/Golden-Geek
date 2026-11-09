# Dossiê: Como Jogar Andromeda's Edge

Entrega 1. Jogo pedido diretamente pelo editor (slug `andromedas-edge`). Escrito em 09/11/2026.

## 1. Fontes

| Fonte | Versão e dados do arquivo | Onde | Situação |
|---|---|---|---|
| **Livro de regras da edição brasileira, "Regras do Jogo"** (fonte principal) | Galápagos, AED001, "v1.0" impresso na p. 27; © Cardboard Alchemy; tradução Isabela Balian, revisão Gabriel Novaes e Luis Perdomo, gestão Matheus Passeri, diagramação Tati Hapanchuk; 28 páginas (629 x 809 pt); PDF criado em 27/09/2024 (InDesign 19.5); arquivo "AED001 - regras - v1.0.pdf" | Biblioteca de downloads da Asmodee Brasil. Busca `https://api-prd.mundogalapagos.com.br/library-download/store/search?term=andromeda` listou o item 2815 ("Andromeda's Edge - SKU: AED001", pai 2814, etiqueta Regras) e o item 2820 (mesmo nome, pai 2819, etiquetas Regras, Ilustração e Conteúdo da caixa). Download: `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2815&tagId=2&group=b2c` (HTTP 200, ZIP de 130 MB, sha256 f9165380…5ad1d02) | Baixado e lido inteiro em 09/11/2026, texto e ilustrações |
| **Apêndice da edição brasileira** | Galápagos, "AED001_apendice_v1.0.pdf", 28 páginas, criado em 17/10/2024, modificado em 17/10/2025 | No mesmo ZIP | Lido: índice, facções (p. 2 a 8) e perguntas frequentes (p. 28). Usado só para o FAQ e a classificação das facções |
| Item 2820 da biblioteca | | `file?id=2820&tagId=2&group=b2c` respondeu 404 (JSON) | Não usado |
| Página oficial do jogo, Cardboard Alchemy | "1-5 PLAYERS", "40-200 Min", "14+", autores e descrição ("worker placement game in which your workers are upgradable starships") | https://cardboardalchemy.com/andromedas-edge/ (robots.txt só proíbe /wp-admin/) | Consultada em 09/11/2026. Os números de jogadores e de tempo incluem a expansão Escalation, citada na mesma página |
| Manual oficial em inglês (Cardboard Alchemy) | | https://cardboardalchemy.com/downloads/AndromedasEdge_Rulebook_sm.pdf, linkado na página oficial | Não baixado: o manual brasileiro bastou e não houve dúvida de tradução que pedisse a comparação |
| Vídeo | "ANDROMEDA'S EDGE - Gameplay resumida", Duque Board Games | Busca do próprio canal (`/@DuqueBoardgames/search?query=andromeda`) e oEmbed (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=bK-DatEOPwA&format=json`), que confirmou título e canal | 09/11/2026 |

**Arquivos no scratchpad** (fora do repositório): PDF e apêndice em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1109/andromedas-edge/dl/i2815/x/` (`regras.pdf`, renomeado do original, e `AED001_apendice_v1.0.pdf`); texto por página com layout em `.../d1109/andromedas-edge/txt/p1.txt` a `p28.txt`, em ordem de leitura em `.../txt/raw/p1.txt` a `p28.txt`, e o apêndice em `.../txt/apendice/p1.txt` a `p28.txt`; páginas em PNG em `.../img/`; contas em `.../scripts/contas.py`. O PDF tem camada de texto; OCR não foi necessário.

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial; +https://eliteboardgamers.com.br)`, que se identifica como robô. A API da biblioteca é a que a página pública da Asmodee Brasil usa (mesmo caminho dos tutoriais de Sky Team, Bang!, Azul e Dixit); o grupo `b2c` é o do público, sem login. Não foi acessado `www.asmodee.com.br` nem a loja da Galápagos (o robots.txt de `galapagosjogos.com.br` proíbe robôs, registrado em `tools/imagens/editoras.json`). Nenhum bloqueio foi contornado.

**Edição.** O manual é da edição brasileira (Galápagos) e os nomes do tutorial são os dela. O Apêndice avisa que parte do conteúdo citado nele é de expansões e promos ainda não publicadas no Brasil (Apêndice, p. 2); o tutorial não usa esse conteúdo.

**Extensão.** O tutorial tem cerca de 10 mil palavras contando tabelas, exercícios e blocos recolhidos (a página mostra "Leitura do essencial: cerca de 15 min"). Passa do alvo do BRIEF porque o jogo tem 28 páginas de regras, dois tipos de turno, quatro tipos de região, cinco trilhas com espaços próprios, uma batalha em seis etapas e um sistema de eventos; o de Clank! tem 8 mil palavras. Nada de expansão entrou.

## 2. Glossário (termos da edição brasileira)

| Termo na edição brasileira | Página | Explicação |
|---|---|---|
| Margem | p. 2 e 8 | A região do espaço do jogo |
| Tabuleiro principal | p. 4 | Mapa, trilha de PV, trilhas de progresso e colunas de módulos |
| Tabuleiro de eventos, marcador de eventos, baralho de eventos | p. 4 e 20 | A contagem até o evento; baralhos Aurora Galáctica e Crepúsculo Cósmico |
| Ferro-Velho (área superior, Zona de Conserto) | p. 4, 12 e 23 | Para onde vão as naves danificadas |
| Peças de região do planeta; peças de região da Base Aliada | p. 2 e 4 | Os hexágonos do mapa |
| Nebulosa | p. 8 | Região da borda, só com Viagem |
| Luas órfãs da nebulosa; fichas de lua planetária | p. 3 e 4 | Recursos para reivindicar |
| Reivindicar (lua), área de luas reivindicadas | p. 10 | Pegar a lua e guardar na estação (máx. 4) |
| Alocar uma ficha de lua; Abandonar uma lua | p. 13 e 14 | Pôr a lua num módulo ou nas Operações Táticas; descartá-la pelo benefício |
| Invasores (classe S, A, B, C, D), cartas e figuras de invasor | p. 4 e 11 | Os inimigos |
| Ataque Invasor | p. 11 | Etapa 3 do Lançamento |
| Marcador de terminus | p. 5 e 25 | Marca o fim (50, 60 ou 70 PV) |
| Trilha de PV, marcador de PV | p. 5 e 7 | Pontos de vitória |
| Módulos (ciência, indústria, comércio, civilização); colunas e baralhos de módulos | p. 5 e 16 | Peças da estação |
| Módulos centrais: Reator Primário, Contramestre, Tesouraria, Arquiteto | p. 12 | O primeiro módulo de cada fileira |
| Trilhas de progresso: ciência (trilha científica), indústria, supremacia, comércio, civilização | p. 5 e 19 | As 5 trilhas |
| Fichas de descoberta; espaço de descobertas do observatório; fichas de supremacia | p. 5 e 19 | Bônus das trilhas |
| Bônus de cofre | p. 19 e 25 | PV por recurso no fim |
| Cartas táticas (Ação, Evento, Sustentação, Diplomacia, Batalha); limite de cartas táticas | p. 13 e 14 | Efeitos especiais |
| Desenvolvimentos: Observatório, Fábrica, Espaçoporto, Cidade, Obelisco; peças e cartas de desenvolvimento | p. 17 e 18 | Construídos nos planetas. O exemplo da p. 25 escreve "portos espaciais"; o guia usa sempre Espaçoporto, nome da carta |
| Recursos: energia, titânio, gelo, nanocarbono, créditos | p. 7 | A moeda |
| Tabuleiro de estação, Baía de Lançamento, reserva pessoal, área de líderes, área de facção, Operações Táticas | p. 6 e 7 | A estação do jogador |
| Transportador, caça, nave de pesquisa, cruzador pesado | p. 15 | As naves |
| Alcance, armas, mira, Viagem, Ataque, Salto, Povoar, escudos | p. 15 | Especificações e habilidades |
| Peças de aprimoramento de nave (de facção e neutras) | p. 6 e 15 | Melhoram um tipo de nave |
| Líderes; recrutar líderes | p. 7, 14 e 17 | Pagam desenvolvimentos e pontuam |
| Bases Aliadas: Monólito Ancestral, Centro de Comércio, Campo Maximus, Campo de Odessa, Hangar, Escritório de Desenvolvimento | p. 10 | Ações fixas |
| Lançamento (primeiro, subsequente), região ativa, ocupada | p. 9 | O turno principal |
| Retorno à Estação | p. 12 | O outro tipo de turno |
| Ações livres | p. 13 e 14 | Ações extras no turno |
| Batalha: Escalada, Diplomacia, Preparações para a Batalha, Rolagem dos Dados, Resultado, Dano às Naves | p. 21 a 23 | As 6 etapas |
| Conserto; recarregar escudos | p. 23 | Ações de conserto |
| Regiões especiais (Quasar, Vórtice); cartas de destino; Modo 2x2 | p. 26 e 27 | Regras opcionais |

## 3. Base de regras

Marcação: `[BR p. N]` manual brasileiro; `[Ap. p. N]` Apêndice; `[ilustr.]` lido na ilustração. Classificação: **V** verificada (lida no texto), **I** interpretada (leitura do guia, dita como tal no tutorial), **L** lacuna.

**Preparação**
1. Passos 1 a 10 do tabuleiro, com a tabela 2/3/4 jogadores = 4/6/8 planetas [BR p. 4 e 5] V.
2. Recomendação Aurora Galáctica e Atacantes Vorticon na primeira partida [BR p. 4] V.
3. 2 dados para os invasores S, podem cair na mesma nebulosa [BR p. 4] V.
4. Terminus 50/60/70 [BR p. 5] V.
5. Fichas de descoberta 5 + 5 + 5; supremacia 1 em cada um dos 3 espaços [BR p. 5] V.
6. Material do jogador; estação de dois lados; 3 transportadores na Baía de Lançamento [BR p. 6] V.
7. Facção: 3 cartas, fica com 1; recursos no verso; avanço nas trilhas marcadas na carta [BR p. 6] V.
8. Aprimoramentos: 1 de facção + 1 de cada tipo neutro [BR p. 6] V.
9. Líderes: 1 por Base, 2 na nebulosa sorteada, 1 na estação (6 + 2 + 1 = 9) [BR p. 7] V.
10. Jogador inicial pela maior rolagem de 6 dados; marcadores de PV em sequência [BR p. 7] V. O valor do "1º espaço" não é dito; o guia repete "1º espaço" sem número.
11. Número de jogadores do jogo base: o manual não escreve "2 a 4"; a tabela da p. 4 e as 4 cores (p. 3) indicam 2 a 4 I. A página oficial diz 1 a 5, contando a expansão.

**Turno e Lançamento**
12. Turnos em sentido horário, sem rodadas; Lançar ou Retornar; ações livres; descarte de excesso no fim [BR p. 8 e 9] V.
13. Jogador ativo decide a ordem de efeitos simultâneos [BR p. 8] V.
14. Primeiro Lançamento: região desocupada; ocupada = invasor ou nave de jogador [BR p. 9] V.
15. Lançamento subsequente: ao alcance de nave sua pelo alcance da nave lançada; sem nave sua; pode ter naves adversárias [BR p. 9] V. Pode ter invasor: I (p. 9 não diz; p. 11 trata "já há um invasor na região ativa").
16. Base Aliada só se puder ativá-la; nebulosa só com Viagem [BR p. 9] V; "até o fim do turno" [Ap. p. 28] V.
17. Ativar planeta, nebulosa e Base Aliada [BR p. 10] V.
18. Ações das 6 Bases Aliadas [BR p. 10] V; o traço sobre os módulos no Campo Maximus e de Odessa [ilustr. p. 10, legenda p. 16] I.
19. Luas: máximo 4; abandonar no seu turno; alocar a qualquer momento; lua recebida no turno de outro [BR p. 10] V.
20. Limites de recursos: energia 10; titânio, gelo, nanocarbono e créditos 5 [ilustr. p. 7: legenda "Armazenar máx 10" e "máx 5" e tabuleiro de estação] I. Créditos são curinga [BR p. 7] V.

**Ataque Invasor e invasores**
21. Regras do Ataque Invasor, classe S, Viagem dos invasores [BR p. 11] V.
22. Alocação de novos invasores; 1 classe por região; volta do invasor [BR p. 11] V.
23. Atacante Vorticon: alcance 1, armas 2, recompensa 1 carta tática, Enxame [ilustr. p. 5] I (lido na carta impressa no manual).

**Retorno à Estação e módulos**
24. Retorno obrigatório sem naves na Baía [BR p. 12] V.
25. Ativação por nave (mapa ou Zona de Conserto) ou energia; regras de energia, dano, Ferro-Velho superior, ciência pelo Reator com nave, entrada de lua [BR p. 12] V.
26. Módulos centrais [BR p. 12] V. Que são o primeiro de cada fileira: [ilustr. p. 7 e 12] I.
27. Devolver naves; tirar dano de naves com escudo; descartar energia e sustentação [BR p. 13] V.
28. Comprar módulos: 5 passos; traço = pago; ícones de dano; +1 na trilha; descarte no Campo; atualização das colunas [BR p. 16] V.
29. Luas nos módulos: entrada, saída, PV uma vez, conserto não entra, meia-lua [BR p. 16] V; PV ao realocar [Ap. p. 28] V.
30. Módulos rearranjáveis a qualquer momento [BR p. 16] V.

**Naves, desenvolvimentos, trilhas**
31. Naves: alcance, armas e habilidades [BR p. 15] V. Custos [ilustr. p. 7] I.
32. Aprimoramento: substitui, nave grátis se disponível, uma vez por tipo [BR p. 15 e 19] V.
33. Desenvolvimento: requisitos, passos, transportador permanente, qualquer planeta com transportador, última nave [BR p. 17] V.
34. Benefícios da carta A a D [BR p. 17] V. Habilidades das 5 cartas [BR p. 18] V.
35. Desenvolvimento não ocupa; 1 por planeta; 3 planetas de cada tipo [BR p. 17 e 18] V.
36. Pontuação na construção, máximo 10, exemplo de 7 PV [BR p. 18] V.
37. Trilhas: espaços de desenvolvimento, evento e específicos [BR p. 19] V.

**Batalha, dano, conserto**
38. Quando há batalha; só no Lançamento e na região ativa; fim antecipado [BR p. 11 e 21] V.
39. Escalada, Diplomacia, Preparações (dados, mira, energia, máximo 6) [BR p. 21] V.
40. Rolagem, mira, mira acima de 5, resultado, empate, todos perdem, vencedor e derrotados [BR p. 22] V.
41. Mira dos invasores [BR p. 22] V.
42. Operações Táticas [BR p. 22] V; uma vez por batalha, antes do dano [Ap. p. 28] V.
43. Dano às naves e invasores; escudos; dano a módulos; consertos [BR p. 23] V.
44. Alcance contado por regiões, vizinha = 1 [BR p. 15 e 24] I.

**Eventos e fim**
45. Avanço do marcador [BR p. 10, 14, 19 e 20] V ("como" no texto da p. 20: a lista não é fechada).
46. Desencadear e resolver evento, ordem, reinício [BR p. 20] V. Nada se faz durante o evento [BR p. 20] V.
47. Fim da partida, turno extra para todos, pontuação em 7 passos, níveis 5/7/10, desempate [BR p. 25] V.

**Opcionais** 48. Regiões especiais, cartas de destino, modo 2x2 [BR p. 26 e 27] V.

**Lacunas** L1. Comprimento da trilha de eventos e posição exata dos espaços iniciais: só na ilustração (2J, 3J, 4-5J), sem texto; o guia diz "espaço inicial do número de jogadores". L2. Custo exato de cada posição nas colunas de módulos: impresso no tabuleiro, não no texto; o guia remete ao tabuleiro. L3. Valores do 2º espaço de cofre e posições de cada espaço nas trilhas: não citados.

## 4. Ordem do ensino

Montagem; primeiro turno (primeiro Lançamento num planeta e uma batalha simples contra o Vorticon, o que pode acontecer na mesa recomendada); etapa 1, o resto do Lançamento; etapa 2, Retorno e módulos (dependem de naves no mapa); etapa 3, naves, desenvolvimentos e trilhas (dependem de módulos, líderes e transportadores); etapa 4, batalha completa (depende de naves variadas, desenvolvimentos adjacentes e energia); etapa 5, eventos e fim (dependem de trilhas e módulos danificados). Adiados para "Situações especiais": ações livres detalhadas, interpretações, regras opcionais.

## 5. Figuras e fotos

Figuras recortadas do PDF a 200 dpi, sem blocos de texto do manual, em `como-jogar/andromedas-edge/figuras/` (webp, até 1000 px, qualidade 80; script `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/figs.py`). As p. 4 e 5 formam uma ilustração única; elas foram unidas sem a faixa repetida (48 px) antes do recorte.

| Arquivo | Página | Passo ou regra |
|---|---|---|
| setup-eventos | p. 4 | Passos 2 e 10 |
| setup-regioes | p. 4 e 5 | Passos 4 e 5 |
| setup-invasores | p. 5 | Passos 3, 5, 6 e 10 |
| setup-tabuleiro | p. 4 e 5 | Passos 8 e 9 |
| setup-reserva | p. 4 | Passo 10 |
| setup-estacao | p. 7 | Passos 12 a 14 |
| setup-lideres | p. 6 | Passos 11, 15 e 16 |
| lancamento-primeiro, lancamento-subsequente | p. 9 | Etapa 1 |
| modulos-ciencia, modulos-fileira | p. 13 | Etapa 2 |
| desenvolvimento-pontuacao | p. 18 | Etapa 3 |
| batalha-escalada | p. 24 | Etapa 4 |
| batalha-dados | p. 22 | Etapa 4 |

Passos sem figura própria: 1 (o tabuleiro inteiro aparece nas figuras de mapa e trilhas), 7 (o terminus aparece pequeno, sem detalhe útil) e o jogador inicial (sem ilustração).

**Fotos oficiais** (etapa 3b): `robo.py mapear cardboardalchemy.com` (receita nova em `tools/imagens/editoras.json`), `triagem`, `buscar` na página oficial e na página "all-in" (1 candidata: arte de capa com título, descartada), na Frosted Games (página do jogo não encontrada) e na Lucky Duck Games (9 candidatas, página https://luckyduckgames.com/usa/game/818-andromeda-s-edge); `livres` (Wikimedia Commons) sem nada. Aprovadas: capa (1), mesa (5, tabuleiro de estação na mesa), jogabilidade (6, cartas e figuras de invasor), componentes (4), com a nota "edição em inglês". As três últimas tinham faixas brancas de 800 x 800 e foram aparadas. Nenhuma tem pessoas. Movidas para `como-jogar/andromedas-edge/fotos/` com `fontes.json`; a pasta `andromedas-edge/` da raiz e `triagem/andromedas-edge.json` foram apagadas.

## 6. Contas

`/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1109/andromedas-edge/scripts/contas.py`, saída conferida:

- Peças iniciais: 2 j. 10, 3 j. 12, 4 j. 14. Líderes: 6 + 2 + 1 = 9.
- Comece: você 1 dado, mira 1; Vorticon 2 dados, mira 1. [5] contra [4, 3]: você vence. [5] contra [5, 2]: Vorticon vence.
- Etapa 2: energia 1 + 2 − 1 (caça) = 2; − 1 no módulo de comércio = 1; titânio 1 − 1 = 0; 4 naves voltam.
- Etapa 3: exemplo do manual 2 + 2 + 1 + 2 = 7; exemplo próprio 3 + 2 + 1 + 1 = 7; teto min(13, 10) = 10.
- Etapa 4: manual, amarelo 1 + 1 + 3 + 1 = 6, mira 3; azul 1 + 2 + 2 = 5, mira 2. Próprio: 2 + 3 + 1 = 6 (limite). Mira 2 + 1 = 3. [6, 2] contra [6, 2, 1]: o segundo vence.
- Etapa 5: evento 9 − 2 = 7. Manual: 62 → 121 → 145 → 137 → 147 → 163 → 165 (confere com a p. 25). Próprio: 58 + 37 = 95; + 12 = 107; − 2 = 105; + 6 = 111; + 1 = 112.
- Avaliação: 3 módulos x 2 = 6.

## 7. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos` aplicada ao texto do tutorial; o arquivo não tem linha de comando): 0 aviso.
- `python3 tools/checar_comece.py docs/como-jogar/andromedas-edge/tutorial.md`: "seção Comece a jogar dentro da diretriz".
- Conversor testado numa cópia de `tools/` no scratchpad (`.../d1109/andromedas-edge/preview/`), com `"publicar": true` só na cópia: página gerada, 13 figuras e 4 fotos achadas, toda seção com imagem, "Leitura do essencial: cerca de 15 min". Nada foi gerado no repositório.
