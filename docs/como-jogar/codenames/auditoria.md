# Auditoria: Como Jogar Código Secreto

Entrega 3. Autoverificação do redator, feita em 04/11/2026 com o manual aberto. **Não substitui a auditoria independente**, que o BRIEF reserva a outro agente; por isso o JSON está com `"publicar": false`.

## 1. Fontes efetivamente usadas

- Usada: manual brasileiro da Devir (PDF de 2016, © CGE julho de 2015), lido inteiro; página do produto da Devir (jogadores, idade, duração); vídeo de regras da Devir (só como indicação ao leitor).
- Não obtidas: manual original em inglês da CGE (a lista de arquivos da CGE vem de uma API que o sistema de permissões da sessão recusou; não houve nova tentativa); FAQ ou errata oficial (nenhuma encontrada).
- Texto extraído do manual: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/codenames/manual/manual.txt` (com `-layout`) e `p2.txt` a `p5.txt` (uma folha de PDF por arquivo, em ordem de leitura).

## 2. Regra por regra contra o manual

Cada linha: regra da base (dossiê, seção 4), onde aparece no tutorial, página citada no tutorial e conferência.

| Regra | No tutorial | Página citada | Conferência |
|---|---|---|---|
| P1 equipes, mínimo 4 | Comece (Monte a mesa); Etapa 1 passo 1; Sua vez | 2 | Confere |
| P2 espiões mestres do mesmo lado | Comece 2; Etapa 1 passo 2; atenção | 2 | Confere |
| P3 25 codinomes 5 × 5 | Comece 3; Etapa 1 passo 3 | 2 | Confere |
| P4 virar metade ao embaralhar | Etapa 1, `[!mais]` | 2 | Confere |
| P5 chave no apoio, qualquer lado, escondida | Comece 4; Etapa 1 passo 4 | 2 | Confere |
| P6 cores da chave | Etapa 1 entender; figura | 2 | Confere |
| P7 luzes, 9 e 8 palavras | Comece 5; Etapa 1 passo 5; Avaliação 1 | 3 | Confere. A figura da chave (p. 2) mostra luzes vermelhas e 9 quadrados vermelhos, recontados em script |
| P8 pilhas na frente do espião mestre | Comece 6; Etapa 1 passo 7 | 3 | Confere |
| P9 agente duplo | Comece 6; Etapa 1 passo 6; Complete | 3 | Confere |
| P10 civis e assassino ao alcance | Comece 7; Etapa 1 passo 8 | 3 | Confere |
| T1 revezamento | Comece; Etapa 2 | 4 | Confere |
| T2 pista com número | Comece 1; Etapa 2 passo 1; `[!edicao]` | 4 | Interpretada: ver dossiê 5.1 |
| T3 uma palavra | Etapa 3 passo 1 | 4 | Confere |
| T4 não visível; coberto libera | Comece 2; Etapa 3 passo 3; resolvido | 4 | Confere |
| T5 toque é escolha oficial | Comece 3; Etapa 2 passo 3; Sua vez | 4 | Confere |
| T6 a T9 resultado do toque | Comece 4; Etapa 2 passo 4; treino | 4 | Confere, inclusive "sem nova pista" |
| T10 conferir o assassino antes | Atenção do Comece; Complete da etapa 2 | 4 | Confere (é aviso do manual, escrito como aviso) |
| T11 ao menos um toque | Comece 5; Etapa 2 passo 5; Sua vez | 4 | Confere |
| T12 parar a qualquer momento | Comece 5; Etapa 2 passo 5 | 4 | Confere. O tutorial diz "depois do primeiro toque", combinando com T11 |
| T13 número mais um | Comece 5; Etapa 2 passo 5; resolvido; treino; Avaliação 2 | 5 | Confere ("até 4 tentativas porque [...] o número 3") |
| T14 fim do turno | Etapa 2 passo 6 | 4 e 5 | Confere |
| T15 quem cobre | Comece 4; Etapa 2 passo 4 | 4 e 5 | Confere ("consulte a carta chave e cubra", p. 5) |
| T16, T17 cara séria, olhar a mesa | Etapa 2 `[!mais]` | 5 | Confere |
| T18 ampulheta | Etapa 2 `[!mais]` | 5 | Confere |
| F1, F2 vitória, inclusive no turno alheio | Comece; Etapa 2 `[!mais]`; treino b; Avaliação 3 | 5 | Confere |
| F3 assassino | Comece; Etapa 2 Complete | 4 e 5 | Confere |
| F4 próxima partida | Situações especiais | 5 | Confere |
| F5 empate | Não mencionado | | Lacuna do manual; nada afirmado |
| V1 pista inválida | Comece 2 (só "encerra o turno"); Etapa 3 `[!mais]`; Complete; Avaliação 5 | 5 | Confere |
| V2, V3 significado; letras e números | Etapa 3 passo 2; resolvido (*j: 1*); Sua vez (*oito: 2*) | 6 | Confere. *j: 1* para JATO pela inicial é aplicação nossa do princípio "não pode falar das letras de uma palavra" |
| V4 número não é pista | Etapa 3 passo 4; Sua vez (*cítrico: 8*, exemplo do manual) | 6 | Confere |
| V5 português | Etapa 3 passo 5 | 6 | Confere |
| V6, V7 forma e parte de palavra visível | Etapa 3 passo 3; resolvido (*céu*); treino a (*aranha*, exemplo do manual); Avaliação 4 (*cavaleiros*) | 6 | Confere. O plural como "forma" é leitura direta de "qualquer forma de uma palavra" |
| V8 grafia e acento | Etapa 3 passo 6; treino b (*planta*, exemplo do manual) | 6 | Confere |
| V9 soletrar | Etapa 3 passo 7 | 6 | Confere |
| V10 não ser rigoroso; adversário decide | Etapa 3 entender, `[!mais]`, Complete | 6 | Confere. O tutorial diz que *rica* vale com AMÉRICA na mesa; o manual diz que quem proíbe "só está tentando arrumar confusão", o que leio como "vale" |
| V11 a V15 regras flexíveis | Etapa 3, um `[!mais]` agrupado | 7 | Confere. Agrupadas num bloco só para encurtar; cada item mantém a condição do manual |
| V16 zero | Etapa 3 `[!mais]`; treino c | 7 | Confere |
| V17 ilimitado | Etapa 3 `[!mais]` | 7 | Confere; "pelo menos um toque" com ilimitado só aparece na folha de consulta, apoiado em T11 (p. 4), já que a p. 7 não repete |
| X1 a X4 variantes | Situações especiais | 8 | Confere; X2 interpretada (dossiê 5.2) |

## 3. Contas e exemplos refeitos

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/codenames/scripts/exemplos.py`. Ele codifica a grade e a chave da p. 2 (conferidas na figura renderizada) e simula cada turno com o limite de toques e a regra de fim de turno.

- Contagem da chave: 9 vermelhas, 8 azuis, 7 civis, 1 assassino; luzes vermelhas. Confere com P7 e com o elenco da p. 3.
- Comece, resolvido: *África: 2*, LEÃO e MARFIM vermelhas; Vermelha 9 para 7. Até 3 toques; parar depois de 2 é permitido.
- Comece, Complete: *alto: 2*; ARRANHA-CÉU azul (Azul 8 para 7), SATÉLITE civil, fim do turno.
- Etapa 2, resolvido: *África: 2*, LEÃO vermelha, GARRA civil, fim; depois *espada: 2*, NINJA, CAVALEIRO, MARFIM, todas vermelhas, 3 toques = 2 + 1, fim por limite. Vermelha 9, 8, 7, 6, 5. Confere com "a Vermelha tem 5 palavras por encontrar".
- Etapa 2, Complete: *oriental: 2*, NINJA vermelha, FAIXA assassino. Partida acaba, Vermelha perde.
- Etapa 3, resolvido: nenhuma das pistas testadas aparece na grade; DRAGÃO e SATÉLITE são civis na chave.
- Etapa 1: 8 + agente duplo = 9 cartas na pilha da equipe inicial.
- Nenhuma pista usada como exemplo válido é palavra visível da grade da p. 2 (conferido contra a lista de 25).

## 4. O que ficou fraco

- **Sem manual em inglês.** As duas interpretações (número opcional na p. 4; "suas palavras" na p. 8) não puderam ser checadas contra o original. Um auditor com acesso ao PDF da CGE resolve as duas.
- **Edição.** O manual é de 2016 e traz *Codinomes* na capa. Não sei se as reimpressões atuais da Devir mudaram texto ou componentes; o tutorial avisa.
- **Componentes não listados.** O manual não diz quantas cartas de codinome e cartas chave vêm na caixa, e a página da Devir lista "65 cartas", número que não bate com o que se espera do jogo. O tutorial não cita quantidades além das que o manual dá (8 + 8 + 1 + 7 + 1).
- **Extensão.** 5.150 palavras por `wc` e cerca de 4.500 sem marcação: no teto do pedido. O peso vem das opções de múltipla escolha.
- **Exemplos de pista "boa".** Se *África* liga bem LEÃO e MARFIM, ou *alto* liga ARRANHA-CÉU e JATO, é julgamento de associação, não de regra. Servem para mostrar a mecânica; um leitor pode achá-los fracos como pista.
- **Legibilidade** não foi medida.
- **Teste de execução** (um leitor só com o tutorial) não foi feito: o BRIEF proíbe subagentes nesta rotina.

## 5. Ligação com a resenha

A resenha `codenames/` pode apontar para `/como-jogar/codenames/` na seção de como funciona, e o tutorial já leva `"resenha": "codenames"` no JSON. A resenha de Código Secreto Imagens não foi ligada ao tutorial: as regras dela não foram conferidas.

## 6. Auditoria independente (04/11/2026)

Dois auditores externos: um de regras (aprovado com ajustes, nenhum erro de regra) e um de partida simulada (jogável com ajustes). Tudo foi corrigido só com base no manual. Os arquivos alterados foram `tutorial.md`, este arquivo e `figuras/preparacao.webp`. O JSON não mudou e segue com `"publicar": false`.

**Auditoria de regras**
1. Aviso de edição: trocado "edição da Devir de 2016", que não tinha apoio, por "O manual baixado (© julho de 2015; PDF de 2016, modificado em 2021)", dados lidos no PDF.
2. Rimas: "valem sempre que se referem ao significado; o grupo pode liberar qualquer rima, mas sem avisar que é rima" (p. 7).
3. Número da pista: "(ver nota na etapa 2)" no Comece e na folha de consulta. O bloco `[!edicao]` agora diz "as pistas 0 e ilimitado (p. 7) cobrem os casos especiais".
4. Ampulheta: reescrita em três passos, com "dá uma pista só para a sua palavra mais difícil" (p. 5).
5. Comece, passo 7: civis e assassino "entre os jogadores, onde os dois espiões mestres alcançam" (p. 3).
6. Bloco renomeado para "regras rigorosas e de grafia". A frase "na dúvida, decide o espião mestre adversário" agora cita só a p. 6.
7. `preparacao.webp` foi recortada de novo, 6 px abaixo; a borda de cima não tem mais fragmento de título.

**Partida simulada**
- a. O treino a passou a usar *arranha*, parte de ARRANHA-CÉU. A resposta sai direto da regra da palavra composta (p. 6), sem conflito com *rica*/AMÉRICA.
- b. Sem combinação prévia, valem as regras rigorosas e de grafia: compostas só sem hífen e sem espaço, e *sela* não vale para CELA (p. 6 e 7). **[interpretada]** O manual não diz "por padrão" com essas palavras. A leitura vem de as flexíveis serem apresentadas como algo que "você pode decidir" permitir (p. 7).
- c. Palavra da outra equipe: "ele a cobre com uma carta de agente da outra equipe, a cor certa". O manual diz que quem cobre é o espião mestre da equipe que tocou (p. 5: "consulte a carta chave e cubra"). Não diz quem pega a carta da pilha, e o texto não afirma isso.
- d. Penalidade: no texto, na pergunta 5 e na folha de consulta ficou igual: o espião mestre adversário "pode cobrir uma palavra da própria equipe" (p. 5). **[interpretada]** O "suas palavras" do manual é lido como as palavras da equipe que não errou, porque é ela que se beneficia da penalidade.
- e. Assassino: "a equipe que tocou perde, e a outra vence" no Comece, na etapa 2 e na folha de consulta (p. 4 e 5; com duas equipes, a derrota de uma é a vitória da outra).
- f. Lista curta de peças no Comece, antes da montagem, com "apoio", "agente duplo" e "carta de codinome" explicados (p. 2 e 3). A ampulheta não entrou na lista, para caber nos 4 minutos; ela aparece na etapa 2.
- g. Leitura da chave: "Cada quadrado da chave é a palavra na mesma posição da grade: azul e vermelho, das equipes; sem cor, civil; preto, assassino" (p. 2).
- h. O exemplo da etapa 2 abre com "Outra partida, com a mesma grade da p. 2".
- i. Dois jogadores: "o outro (ou os outros, se forem mais) é agente de campo" (p. 8).
- j. Nos exemplos de validade de pista: "Aqui só importa se a pista é válida" e "As cores não importam aqui; só se a pista é válida".
- k. Etapa 2: "uma palavra e um número, além de soletrar a pista se pedirem" (p. 6).

**Portões depois das correções:** `checar_comece.py` passa. Com a lista de peças, o Comece chegou a 880 palavras; foi enxugado e voltou a ficar abaixo de 800. Travessão e meia-risca: zero. `vicios.py`: zero aviso. Exclamação: zero. O tutorial tem 5.320 palavras por `wc`.

## 7. Seção de montagem (04/11/2026)

O editor pediu uma seção de montagem completa no alto da página, e ela entrou como `## setup. Montar a mesa passo a passo`, antes do "Comece a jogar". Ela segue a ordem de PREPARAÇÃO, EQUIPE INICIAL e CARTAS DE AGENTE do manual (p. 2 e 3) e tem quatro partes: uma tabela de componentes com quantidades, uma tabela por número de jogadores (p. 2 e 8), 12 passos com página e uma conferência final com uma pergunta `??`.

**Imagens por passo.** Nenhuma figura nova foi recortada. As cinco que já existiam foram para o passo que ilustram:
- `preparacao`, depois do passo 3 (lugares à mesa);
- `chave`, depois do passo 7 (leitura da chave), servindo também ao passo 8 (as luzes);
- `agentes`, depois do passo 9;
- `agente-duplo`, depois do passo 10;
- `civis-assassino`, depois do passo 11.

Na etapa 1 elas foram retiradas, para não repetir as mesmas imagens, e o texto agora remete à seção de montagem. Uma foto oficial entrou uma vez: `../../codenames/fotos/mesa-1.webp`, com o crédito "Imagem: Czech Games Edition", tirado de `codenames/fotos/fontes.json`. A legenda diz que a foto é da edição original em inglês e mostra uma partida em andamento.

**Passos sem ilustração no manual** (registrados aqui em vez de inventar imagem):
- 1 e 2 (formar as equipes, escolher os espiões mestres). A ilustração da p. 2 mostra os lugares, não a escolha.
- 4 (embaralhar virando metade do baralho).
- 6 (sortear a chave). Só a chave já no apoio aparece, na figura da mesa.
- 12 (ampulheta). O manual não a mostra na preparação nem diz onde ela fica; o tutorial só diz "deixe à mão, se for usá-la" (p. 5).

**Lacunas do manual na montagem.**
- O manual não dá o total de cartas de codinome nem de cartas chave da caixa; a tabela diz isso.
- O manual não lista o que volta para a caixa. O tutorial diz só que as cartas não sorteadas não entram na partida e que, na seguinte, viram-se 25 codinomes novos (p. 5).

**O "Comece a jogar".** A subseção "Monte a mesa" virou um resumo de 4 itens que remete à nova seção.

**Portões.** `checar_comece.py` passa. Travessão e meia-risca: zero. `vicios.py`: zero aviso; uma muleta acusada no resumo foi trocada. A renderização de teste, gravada só no scratchpad, mostra a seção com a classe `setup`, toda à vista, logo depois do resumo. O tutorial tem 6.045 palavras por `wc`.
