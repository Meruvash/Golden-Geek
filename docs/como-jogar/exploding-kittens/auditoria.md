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
