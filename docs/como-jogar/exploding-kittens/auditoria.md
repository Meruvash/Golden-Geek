# Auditoria: Como Jogar Exploding Kittens

Autoverificação de quem escreveu o tutorial, em 04/11/2026. Não é a auditoria independente: ela será feita depois por outro agente (BRIEF.md). Texto do manual usado na conferência: `scratchpad/exploding-kittens/manual/exk401_raw.txt` e as imagens `exk-1.png` e `exk-2.png` (110 dpi) e `hi-1.png` e `hi-2.png` (220 dpi) da mesma pasta.

## 1. Fontes efetivamente usadas

- Folheto brasileiro EXK401 v1.0 (2023): fonte de todas as regras. Lido inteiro, como texto e como imagem.
- Folheto brasileiro EKEK01 (2019): só para a lista de diferenças.
- Manual oficial em inglês (2025): só para a contagem do Ataque em cadeia e para as diferenças (eliminação, variante rápida).
- Página do produto em explodingkittens.com: idade e duração.
- **Não obtidas:** página do produto da Asmodee Brasil e a página da biblioteca no www.asmodee.com.br (Access Denied da Akamai ao User-Agent do robô; não contornado). FAQ ou errata oficial: não há item de errata para EXK401 na biblioteca (o único item com etiqueta "Errata" é o EXK411, Para a Galera).

## 2. Conferência regra por regra

| Regra | Onde está no tutorial | Conferido em | Resultado |
|---|---|---|---|
| R1 objetivo, eliminação, último vence | Ideia do jogo; Como a partida acaba; seção 0 | p. 1 "Como funciona", "Fim da partida" | ok |
| R2 2 a 5, 56 cartas | Monte a mesa; seção 0 | p. 1 | ok |
| R3 quantidades | Passo a passo da etapa 2; folha de consulta | p. 2 | ok (Não! 5, Veja o Futuro 5, Desarme 6, demais 4) |
| R4 pilha não acaba | Como a partida acaba; Para entender da etapa 1 | p. 1 | ok |
| R5 a R12 preparação | Monte a mesa; passo a passo da etapa 1; folha | p. 1, passos 1 a 7 e quadro "Dois ou três jogadores" | ok; ordem dos passos idêntica |
| R13 Desarme extra pode cair na mão | `[!mais]` das Situações especiais | ordem dos passos 3 e 4 | interpretada, dita como consequência da ordem |
| R14, R15 turno | Seu primeiro turno; passo a passo; folha | p. 1 | ok |
| R16 mão sem limite | `[!mais]` da etapa 1 | p. 1 | ok ("compra no próximo turno" resume "comprará pelo menos mais 1 carta") |
| R17 dica | `[!dica]` da etapa 1 | p. 1 | ok, marcada como dica |
| R18 eliminação | Seu primeiro turno; passo a passo da etapa 1 | p. 2 | ok |
| R19, R20 Desarme | idem; `[!mais]` "Onde pôr o gatinho" | p. 1 e 2 | ok |
| R21 turno acaba após Desarme | Passo a passo da etapa 1; `[!edicao]` | p. 2 | ok; alcance interpretado |
| R22 a R25 Não! | Passo a passo e `[!atencao]` da etapa 2; combos na etapa 3 | p. 2 | ok |
| R26 Ataque | Passo a passo da etapa 2 | p. 2 | ok |
| R27 Ataque em cadeia | Passo a passo e `[!edicao]` da etapa 3 | p. 2; inglês | interpretada, avisada |
| R28 Pulo | Tabela do Comece; passo a passo e `[!mais]` da etapa 2 | p. 2 | ok; generalização avisada |
| R29 Presente | Etapa 2 | p. 2 | ok ("qualquer outro jogador") |
| R30 Embaralhar | Etapa 2 | p. 2 | ok; "o turno continua" é leitura (a carta não encerra o turno) |
| R31 Veja o Futuro | Comece; etapa 2 | p. 2 | ok |
| R32 Gatos e Par | Etapa 2 | p. 2 | ok |
| R33 exemplo de turno | Resolvido da etapa 2 | p. 2 | ok, segue a sequência do folheto |
| R34 a R36 Combos | Etapa 3 | p. 2 | ok |
| L1 eliminado devendo turnos | `[!edicao]` das Situações especiais | sem página | lacuna, apresentada como sugestão |
| L2 Desarme em combo | não tratado | p. 2 (combos com "QUAISQUER cartas") | lacuna não exposta ao leitor; o `[!mais]` "Quando jogar o Desarme" fala só do efeito da carta |

Regras do folheto que ficaram de fora: nenhuma. Ficou de fora o texto de humor (critérios para escolher o primeiro jogador, frases de efeito).

## 3. Exemplos: legalidade e contas

Todos os números passaram por `scratchpad/exploding-kittens/scripts/contas.py` (tabela no dossiê, seção 9).

- Comece, resolvido: Veja o Futuro e Pulo no mesmo turno, como no "Por exemplo" da p. 1. Legal.
- Etapa 1, resolvido: compra de Gato (sem efeito), compra de EK com Desarme e devolução em posição escolhida. Legal; 29 cartas e 2 EK para 3 jogadores.
- Etapa 2, resolvido: é o exemplo impresso na p. 2.
- Etapa 3, resolvido: Ataque sobre Ataque no primeiro turno (4), Pulo que encerra um dos 4 turnos (3 restam), Ataque (3 + 2 = 5), e a variante com o ataque no segundo turno (1 + 2 = 3). Depende das interpretações R27 e R28, ambas avisadas.
- Complete da etapa 3: dois Pulos e dois Embaralhar formam Duas Cartas Iguais; não há três iguais. Legal.
- Avaliação 3: Não! sobre Desarme não tem efeito (p. 2). Avaliação 5: 4 turnos, o exemplo do próprio folheto.

## 4. Pontos de interpretação delicada

1. Contagem do Ataque em cadeia: o texto brasileiro, sozinho, admite ler "turnos não realizados" sem contar o turno em que a vítima ataca, o que daria 3 no exemplo, e não 4. O exemplo impresso ("4 turnos, então 6") e o inglês fecham a leitura adotada.
2. Desarme num turno de Ataque: o guia mantém o segundo turno devido. Coerente com o inglês ("Defuse" não fala de turnos devidos) e com a regra de que cada turno da vítima acaba com a compra.
3. Vídeo: em inglês. A frase do tutorial ("com legendas (CC) em português") repete o que o folheto afirma; não conferi as faixas de legenda.

## 5. Componentes do plano, com trechos

- **Tarefas com apoio decrescente:** em cada etapa, `[!resolvido]` (ex.: "Partida de 3, com Ana, Bruno e Carla..."), `[!complete]` (ex.: "Partida de 2. Você tirou os 4 Exploding Kittens...") e `[!suavez]` com duas perguntas.
- **Informação de apoio:** `[!entender]` de cada etapa (ex.: "A preparação regula o perigo...").
- **Informação procedural:** `[!passos]` com página (ex.: "Passo a passo: comprou um Exploding Kitten (p. 1 e 2)") e a folha de consulta.
- **Prática específica:** só a contagem (tabela da Pilha de Compra e Ataques em cadeia); não há treino separado porque o jogo não tem pontuação.

## 6. Clareza e completude: pontos fracos que restam

- O vídeo não é em português nem do Duque; é o oficial, em inglês, indicado pelo folheto.
- A extensão ficou no limite (4.506 palavras pelo `wc`, contando marcação e opções).
- A tabela do tamanho da Pilha de Compra é conta do guia, não do folheto; está marcada como "pelas contas da preparação".
- Os nomes dos cinco tipos de Carta de Gato não aparecem: o folheto não os imprime no texto, e a caixa não foi vista.
- O tutorial não diz se o Desarme pode entrar em Combos Especiais (L2).
- A preparação e a primeira etapa repetem a montagem do Comece; a repetição é do formato (o Comece precisa ser autossuficiente).

## 7. Teste com leitores (proposta)

O protocolo da seção 10 do PROMPT_PILOTO vale como está: 5 a 8 adultos que nunca jogaram, montagem para 2 e para 5, uma rodada completa com pelo menos um Ataque e um Não!, e a resposta à pergunta "quantos turnos o próximo deve" numa cadeia de Ataques. Nada foi testado com pessoas.

## 8. Ligação com a resenha

Não há resenha de Exploding Kittens no site. Se houver, o campo `resenha` do JSON passa a apontar para ela.

## Auditoria independente (04/11/2026)

Duas auditorias independentes (regras e partida simulada) devolvidas pelo coordenador. O que foi corrigido no tutorial:

**Regras (aprovado com correções).**
1. A sugestão sem apoio sobre o jogador eliminado devendo turnos de Ataque saiu; ficou "o folheto não trata [...]; combine com a mesa" (L1).
2. "Quando jogar o Desarme": o efeito só vale ao comprar um Exploding Kitten (p. 2), e, num Combo Especial, dois ou três Desarmes podem ser jogados como qualquer par ou trio, sem o efeito (p. 2, combos com "QUAISQUER cartas"). Isso fecha a lacuna L2.
3. Exemplo da etapa 1: "ele gastou o seu Desarme (a não ser que tenha recebido um segundo na distribuição)".
4. `nao.webp` recortado de novo (p. 2, x 1066 a 1222, y 160 a 393 a 110 dpi): os dois desenhos do quadro inteiros, com os balões "SIM!" e "Droga."; legenda ajustada ("embaixo, ...").
5. Legenda de `desarme.webp`: "escondendo de todos onde o põe", sem "embaixo da mesa" (o desenho não mostra a mesa).
6. Folha de consulta, Não!: "a qualquer momento antes de ela acontecer, mesmo fora da sua vez" (p. 2).
7. Desarme durante um Ataque virou regra direta num `[!mais]` da etapa 2 ("Após jogar esta carta, seu turno acaba" e "A vítima da carta joga seu turno normalmente", p. 2) e saiu da lista de pontos em aberto.

**Partida simulada (jogável com ajustes).**
- a. Cartas de Gato: "5 tipos com desenhos diferentes, 4 de cada, 20 cartas", e só cartas de mesmo nome formam par. O texto do folheto não imprime os nomes dos tipos (na ilustração só se lê "Barba-Gato" numa carta); o guia não os lista.
- b. Folha de consulta: linha "Exploding Kitten | 4" e "Total: 56 cartas".
- c. Ataque em cadeia: "encerra a vez na hora, sem comprar".
- d. Folha: "os turnos que faltavam, contando o atual, + 2".
- e. "Sua vez" da etapa 1: a opção que dependia do Não! virou "Sim, se jogar o Pulo antes de mostrar o gatinho" (errada pela p. 2: a carta deve ser mostrada imediatamente, e só o Desarme salva).
- f. Não! na própria carta: o folheto não trata; nada acrescentado. O tempo do Não! segue a p. 2.
- g. Presente ou Par contra jogador sem cartas: o folheto não trata; nada acrescentado.
- h. Desarme em combo e Não!: coerente com o item 2; o tutorial mantém só o que a p. 2 diz (o Não! não para um Desarme; um Combo Especial pode levar Não!).
- i. Etapa 2: o Par de Cartas de Gato é o caso básico do combo Duas Cartas Iguais (p. 2).
- j. Critério da avaliação: basta acertar as 4 primeiras para começar; as perguntas 5 e 6 são da etapa 3, que o folheto manda ler depois da primeira partida (p. 2).
- k. "Ao acaso": o folheto diz só "carta aleatória"; o guia escreve "aleatória, sem ver", sem inventar um modo de sortear.
- l. "Sentido horário" explicado uma vez no Comece: o próximo é o jogador à esquerda.

**Portões depois das correções:** `checar_comece.py` passa (aviso só pelas exclamações de "Não!" e "Sim!"); `vicios.py` 0 avisos; travessão e meia-risca 0; `wc -w` 4.642 palavras (acima do alvo de 4.500 pelos acréscimos pedidos). JSON segue com `"publicar": false`.

## Seção de montagem (04/11/2026)

Pedido do editor: seção `## setup. Montar a mesa passo a passo` antes do "Comece a jogar", toda à vista (PADRAO_EDITORIAL.md, "Montar a mesa passo a passo").

- **Conteúdo:** tabela de componentes (56 cartas por tipo, p. 1 e 2; Cartas de Gato como "5 tipos com desenhos diferentes, 4 de cada", porque o texto do folheto não imprime os nomes), os 7 passos da preparação da p. 1 na ordem do folheto, o quadro "Dois ou três jogadores" dentro do passo 3, tabela por número de jogadores, o que volta para a caixa, conferência final e uma pergunta `??`.
- **Contas** (refeitas em `scratchpad/exploding-kittens/scripts/contas.py`): Desarmes devolvidos 2, 2, 2, 1 e para a caixa 2, 1, 0, 0; Exploding Kittens no baralho 1, 2, 3, 4 e para a caixa 3, 2, 1, 0; Pilha de Compra 35, 29, 23, 16 (2 a 5 jogadores). A pergunta final: 3 jogadores, 46 + 2 - 21 + 2 = 29.
- **Figuras** (recortes da p. 1 renderizada a 600 dpi, script `scratchpad/exploding-kittens/scripts/setupfigs.py`, só desenho e cartas): `preparacao.webp` (passos 1 e 2: a ilustração do passo 1 já mostra os Desarmes e os gatinhos separados) e `pilha-de-compra.webp` (passo 6) foram reaproveitadas e regravadas em resolução maior, 900 px, com o mesmo enquadramento; novas: `setup-desarmes-de-volta.webp` (passo 3, 900 px), `setup-mao.webp` (passo 4, 546 px) e `setup-gatinhos-de-volta.webp` (passo 5, 491 px). As duas últimas ficaram abaixo de 800 px porque o desenho no folheto é pequeno; ampliar mais só borraria.
- **Passos sem ilustração no manual:** a entrega de 1 Desarme a cada jogador (passo 2; o desenho do passo 1 mostra só os Desarmes separados) e a escolha de quem começa (passo 7). O quadro "Dois ou três jogadores" também não tem desenho. Nada foi desenhado ou inventado para eles.
- **Foto oficial `fotos/componentes-1.webp` não usada.** A imagem da página da Exploding Kittens (arquivo de origem `EKG-2EXP_PDPContent_DTC_1400x1400InTheBox.png`) mostra cartas de expansões em inglês (Streaking Kitten, Alter the Future, Catomic Bomb, Garbage Collection, Mark, Curse of the Cat Butt, Swap Top and Bottom, See the Future (5X)), que não existem na caixa da Edição Original. Pô-la como "o que vem na caixa" ensinaria errado. Fica para o editor decidir; a seção usa só desenhos do folheto.
- **"Comece a jogar":** "Monte a mesa" virou um resumo de 3 itens que remete à seção nova.
- **Portões:** `checar_comece.py` passa (aviso só pelas exclamações de "Não!" e "Sim!"); `vicios.py` 0 avisos; travessão e meia-risca 0; conversão em memória com `tools/como_jogar_md.pagina()`: a seção sai com a classe `setup`, 3 figuras `setup-*`, sem marca `[!...]` sobrando. `wc -w` do tutorial: 5.358 palavras com a seção nova. O campo `publicar` do JSON não foi tocado.
