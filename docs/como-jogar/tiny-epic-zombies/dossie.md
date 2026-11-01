# Dossiê: Como jogar Tiny Epic Zombies

Produzido em 01/11/2026 seguindo `docs/como-jogar/BRIEF.md`. Jogo pedido pelo editor.

## 1. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual oficial da edição brasileira**, Meeple BR, *Tiny Epic Zombies: Regras de Sobrevivência* | PDF de 20 páginas, "VERSION 2.0" (p. 20), criado e modificado em 19/11/2020 (InDesign 15); tradução de Romir G. E. Paulino; revisão de Leandro R. Fernandes, Márcio Botelho e Thiago Leite; © 2020 Gamelyn Games | https://meeplebr.com/wp-content/uploads/2020/11/TEZ_rulebook-PT-BR.pdf, linkado na página do produto | Baixado em 01/11/2026 para o scratchpad (fora do repositório); robots.txt da Meeple BR libera tudo |
| Página do produto, Meeple BR | | https://meeplebr.com/product/tiny-epic-zombies/ | Lida por WebFetch em 01/11/2026: 1 a 5 jogadores, 30 a 45 minutos, maiores de 14 anos, componentes. O curl direto recebeu 406; não contornei |
| Manual original em inglês | não consultado | | Desnecessário: o manual brasileiro está completo e com texto pesquisável |
| FAQ ou errata oficial | nenhuma encontrada | | Há um vídeo de terceiros "FAQ todo explicado"; não usado como fonte de regra |

Texto extraído com `pdftotext`, página por página (a paginação impressa coincide com a do PDF). Ilustrações conferidas em imagem renderizada: p. 2 (componentes), p. 5 (diagrama de preparação, Carta de Humano com Faca e Pistola, Carta de Zumbi, Cartas de Objetivo), p. 7 (trilha), p. 9 (Dado de Luta), p. 10 e 11 (ícones de habilidade e tipos de carta), p. 12 a 14 (exemplos do turno do Zumbi, Pátio com "Cure 2").

**Procura (01/11/2026).** Autocompletar do Google para "como jogar tiny epic zombies": sem sugestões; para "tiny epic zombies": comprar, bgg, deluxe edition, faq, pnp. Sem resenha no site (não existe pasta `tiny-epic-zombies/` nem `conteudo/tiny-epic-zombies.json`).

**Vídeo.** A busca do canal Duque Board Games (`/@DuqueBoardgames/search?query=tiny+epic+zombies`) devolveu vídeos de outros Tiny Epic, nenhum de Zombies. Na ordem do PADRAO_EDITORIAL, o seguinte é o canal do tradutor ou revisor do manual: "Tiny Epic Zombies - Como Jogar", canal **Romir Play House** (https://www.youtube.com/watch?v=ryZFAnc7lhc), título e canal pelo oEmbed. O tradutor do manual é Romir G. E. Paulino; a ligação do canal com ele é provável pelo nome, mas não foi confirmada, e a legenda credita só o canal. Sem vídeo dentro das etapas (nenhum segundo conferido).

**Figuras** (`como-jogar/tiny-epic-zombies/figuras/`, recortes a 300 dpi, só a parte gráfica, webp qualidade 80): preparacao (p. 5), dano-municao (p. 7), corpo-a-corpo e distancia (p. 9), adicionar-zumbis e esquina-corredor (p. 13). Os recortes mantêm textos impressos nas próprias cartas do jogo e as letras de chamada do diagrama, sem blocos de texto do manual.

## 2. Glossário (edição brasileira)

| Termo impresso | Página | Uma linha |
|---|---|---|
| Carta de Loja / Loja | 4, 19 | carta do mapa com 3 Salas; 8 cercam o Pátio |
| Pátio ("Pátio Cooperativo" / "Pátio Competitivo") | 4, 17 | carta central, com Contador de Barricada e área de Estoque dos Marcadores de Sobrevivente |
| Sala | 19 | um dos 3 espaços numerados de uma Loja |
| Símbolo de Entrada | 4, 12 | símbolo da Sala 1, virado para fora; casa com o símbolo das Cartas de Procura |
| Loja de Esquina / Loja de Corredor | 13 | diagonal ao Pátio / encostada no Pátio |
| Jogador Zumbi / Jogador Humano | 4 | papéis no modo Cooperativo vs. Zumbi |
| Carta de Jogador (lado Humano / lado Zumbi); Carta de Zumbi | 4, 7 | personagem; o lado Zumbi traz habilidade e Contador de Horda |
| Indicador de Horda (cubo verde), Contador de Horda | 4, 12 | marca a ação disponível na Carta de Zumbi |
| ITEMeeple; Itens | 2, 4, 11 | peão do humano; armas de plástico que se encaixam nele |
| Marcador de Dano / Marcador de Munição | 4, 7 | começam em 0 e 9 na trilha da Carta de Jogador |
| Comido Vivo | 7, 19 | marcadores no mesmo espaço ou cruzados |
| Barricada, Contador de Barricada | 4, 13 | começa em 2; máximo 6 |
| Marcador de Sobrevivente | 4, 13 | 2 no Pátio; sai um quando a Barricada chega a 0 ou alguém é Comido Vivo |
| Cartas de Objetivo ("Objetivo Cooperativo"/"Competitivo"); Indicador de Objetivo; Marcador de Objetivo | 4, 15 | os 3 objetivos e seus marcadores |
| Monte de Procura (24) / Monte de Suprimento; Carta de Procura | 6 | baralhos; tipos Pegar, Evento, Arma, Mochila |
| Arma Corpo a Corpo / Arma de Longo Alcance; Mochila; Pegar; Evento | 11 | tipos de carta |
| Dado de Luta; Acerto Crítico | 9, 19 | dado do Ataque Corpo a Corpo |
| Ataque Corpo a Corpo / Ataque a Distância | 9 | as duas formas de matar |
| Movimento; Regra de Ouro | 8 | 3 por turno, sempre antes de agir |
| Habilidade Contínua / Habilidade Terminal; Passagem Secreta | 10 | tipos de Sala |
| Marcadores de Suprimento; Marcadores de Armadilha; Veículo (Moto / Carro de Polícia) | 5, 10 | componentes de Loja |
| Realizar uma Procura na Sala Atual | 8, 11 | segunda parte do turno humano |
| Verificar Ruídos; Barulho; Adicionar Zumbis; Entregar/Comprar novas Cartas de Procura | 12 a 14 | os 3 passos do Turno do Zumbi |
| Cercado; Sangrando; Vazio | 14, 19 | situações do turno do Zumbi |
| estoque (de Zumbis) | 4, 9 | Zumbis fora do mapa |

Escolhas de estilo: "vizinha" no lugar de "adjacente" (o manual usa os dois sentidos com "adjacente"); "Loja vazia" = "livre de Zumbis" (p. 10, 11 e 19). Sem sinônimos para os termos acima.

## 3. Base de regras

`[V]` verificada nesta sessão; `[I]` interpretada; `[L]` lacuna.

| Regra | Página | Cl. |
|---|---|---|
| 5 modos; Cooperativo vs. Zumbi é o modo-base | 3 | V |
| Preparação em 8 passos com subletras A a Q | 4, 5 | V |
| Monte A (Pegar + Evento, 12), Monte B (12 de Arma + Mochila), resto = Suprimento; Procura = 24 | 6 | V (32 − 12 = 20; 20 − 12 = 8 no Suprimento, conta minha) |
| Primeiro jogador: quem esteve num shopping mais recentemente | 6 | V |
| Objetivos dos humanos e do Zumbi | 6, 15 | V |
| Dano para a direita, munição para a esquerda; Comido Vivo ao encontrar ou cruzar | 7 | V |
| Procedimento do Comido Vivo (cartas na Loja, Sobrevivente, carta ao Zumbi com Indicador no 1, nova carta 0/9, turno acaba, Procura ainda acontece) | 7 | V |
| Turno humano: 3 Movimentos (A matar, B Sala/Marcador, C coletar) e Procura | 8 | V |
| Turno do Zumbi após cada turno humano; vez passa à esquerda | 8, 14 | V |
| Movimento para Sala vizinha, através de paredes, entre Lojas | 8 | V |
| Começou com Zumbi: deve se mover primeiro; Regra de Ouro | 8 | V |
| Ataque Corpo a Corpo obrigatório ao entrar em Sala com Zumbi; sempre mata | 9 | V |
| Resultados do Dado de Luta (Crítico, sem efeito, 1 e 2 danos) | 9 (ilustração) | V |
| Acerto Crítico: movimento livre opcional, fora dos 3, encadeável | 9, 19 | V |
| Ataque a Distância: entrou em Sala sem Zumbi, paga 1 munição, Sala vizinha, nunca a própria | 9 | V |
| Habilidade da Arma e do Humano podem alterar | 9, 10 | V |
| Habilidade de Sala e Marcadores só com a Loja livre de Zumbis | 10 | V |
| Contínua (1 vez por turno por Sala) / Terminal (encerra, Procura acontece) | 10 | V |
| Passagem Secreta só para movimento, só humanos | 10 | V |
| Marcadores de Suprimento: Barricada +2 (máx. 6), 1 carta de Suprimento, recusa da Arma | 10 | V |
| Coletar Itens só com Loja vazia; 1 Arma de cada tipo; troca; Mochila; Pegar | 11 | V |
| Largar cartas; único jeito de trocar | 11 | V |
| Procura: revela, ao lado da Loja; Pátio: qualquer das 4 vizinhas; não coleta no mesmo turno; Evento resolve | 11 | V |
| Verificar Ruídos; ação de Horda, 1 por turno; Indicador sobe até o quinto espaço | 12 | V |
| 2 Zumbis em 1 ou 2 Lojas do símbolo, à escolha do Zumbi | 12 | V |
| Sala de menor número sem Zumbi; 1 por Sala | 13 | V |
| Esquina cheia → próxima no sentido horário; Corredor cheia → Barricada | 13 | V |
| Barricada −1; em 0, sai Sobrevivente e volta a 2; sem Sobrevivente, derrota | 13 | V |
| Habilidade passiva do Zumbi sempre ativa | 14 | V |
| Sangrando (menos dano; empate, mais munição; depois decidem) | 14 | V |
| Cercado: 1 dano; sair sem matar | 14, 19 | V |
| Entregar carta; humano não olha até o fim do próximo turno; mão vazia compra 4; monte vazio | 14 | V |
| Completar Objetivos; vitória imediata | 15 | V |
| Final do Jogo | 15 | V |
| Cooperativo com IA (Sobreviventes 3/2/1/0; Carta de Zumbi passiva; 2 ou 4 Zumbis; jogador ativo compra) | 16 | V |
| Competitivo vs. Zumbi; Competitivo; Solo | 17, 18 | V |
| Glossário (Acerto Crítico, Cercado, Sala, Loja, Turno, Jogador Humano Ativo) | 19 | V |
| Humano começa com Faca (corpo a corpo) e Pistola (longo alcance) impressas na Carta de Jogador | 5 e 11 (ilustrações) | I (o texto não diz; o tutorial marca com [!edicao]) |
| Exemplos de Sala: Pátio "Cure 2" (Contínua), Restos, Liquidação, Moto, Montar Armadilha, Fase Bônus | 5, 9, 13 (texto das cartas nas ilustrações) | V |
| Objetivo Consertar o Helicóptero | 5 (carta ilustrada) | V |
| Habilidade do Adolescente Zumbi; Atleta | 5, 10, 14 | V |
| Barulho quando o humano termina no Pátio | 12 | L (o tutorial diz que o manual não trata e sugere combinar; leitura "sem Barulho" marcada como leitura) |
| "Se todas as 3 Salas desta Loja" (esquina) | 13 | I ("desta" lido como a próxima Loja, que é a única coerente com o diagrama) |
| Quantas faces de cada resultado tem o Dado de Luta | 9 | L (o manual não diz; o tutorial não fala em frequência) |
| Ganhar munição com o marcador já no 9 | 7 | L (não citado no tutorial) |
| Monte de Procura vazio no Cooperativo com IA, quando o jogador ativo deveria comprar | 16 | L (não citado) |
| Pátio: "sala central do Pátio" (p. 4) com uma só Sala desenhada | 4, 13 | L (o tutorial diz "no Pátio") |

## 4. Plano

Quatro etapas, na ordem das dependências: (1) mesa, montes e a trilha de dano e munição, porque toda decisão de ataque depende dela; (2) movimento e as duas formas de matar; (3) o que a Loja vazia libera: Salas, Suprimentos, Itens, Procura e Objetivos; (4) turno do Zumbi, Barricada, fim e o modo sem Jogador Zumbi. Situações especiais: modos competitivos, Solo, Veículo e Armadilhas. Casos que não acontecem em todo turno ficam em `[!mais]`. Exercícios em múltipla escolha, com a posição da certa variada.

Contas refeitas em `tez-scripts/contas.py` no scratchpad: Comece (munição 9 → 8, dano 0 → 1, vivo); etapa 1 (3 + 2 = 5 contra munição 5: Comido Vivo; 2/7 → 4/5 vivo; 6 + 1 = 7 contra 7: Comido Vivo); avaliação (dano 4, munição 6, dois tiros → 4/4: Comido Vivo no segundo); Monte de Procura 12 + 12 = 24; Barricada 3 + 2 = 5 e 5 + 2 = 6 (teto); colocação de Zumbis (só Sala 1 ocupada → 2 e 3; só Sala 2 → 1 e 3, exemplo do manual); Barricada 2 − 2 = 0 → sai 1 Sobrevivente, volta a 2; IA 2 × 2 = 4 e 1 × 2 = 2.

## 5. Portões

- `tools/checar_comece.py`: passa (seção dentro de 4 minutos, ordem, blocos, termos).
- Travessão e meia-risca: zero. Exclamação fora das marcas de bloco: zero.
- `tools/vicios.py` (lista VICIOS aplicada ao texto): zero aviso.
- Conversor `tools/como_jogar_md.pagina` rodado só em memória, com saída no scratchpad: 6 figuras e 1 vídeo reconhecidos; "Leitura do essencial: cerca de 10 min".
- Extensão: 6.658 palavras (`wc -w`, contando marcação e opções dos exercícios). Acima do alvo de 6.000: o jogo tem dois papéis (humanos e Jogador Zumbi), um modo sem Jogador Zumbi que é o mais jogado em 2 a 4 pessoas, e cinco modos no manual. Para encurtar, já saíram exercícios repetidos, a lista de Salas e a habilidade da Atleta como bloco próprio.
