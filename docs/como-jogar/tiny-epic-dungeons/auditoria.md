# Auditoria: Como Jogar Tiny Epic Dungeons

Entrega 3. Autoverificação de quem escreveu, em 01/11/2026. **Não é auditoria independente:** o auditor de regras e o teste de execução serão feitos depois, por outro agente. Tudo aqui tem o viés de quem escreveu.

## 1. Fontes efetivamente usadas

- **Usada:** *Tiny Epic Dungeons: Manual do Aventureiro*, Meeple BR, PDF de 20 páginas (criado em 16/05/2022), do link da página do produto. Lido em texto (`pdftotext`, por página) e em imagem (p. 4 a 20 a 110 e 170 dpi; Tabuleiro de Tocha a 400 dpi), porque a extração perde todos os ícones.
- **Usada só para a ficha:** página do produto da Meeple BR (1 a 4 jogadores, 30 a 60 minutos, 14+).
- **Não obtidas:** manual da reedição Galápagos/Asmodee (TNE001), FAQ e errata.
- Uma tentativa de baixar a página do produto com `curl` e cabeçalho de navegador foi barrada pelo controle de permissões; a página foi lida pela ferramenta de busca normal (WebFetch). Nenhum bloqueio foi contornado.

## 2. Portões automáticos

| Portão | Resultado |
|---|---|
| `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-dungeons/tutorial.md` | ✅ (rodadas: 891 palavras, reprovado; 735 depois do corte e da linha do Lacaio) |
| Travessão e meia-risca | 0 |
| `VICIOS` de `tools/vicios.py` no tutorial inteiro | 0 |
| Exclamação | só no título oficial do vídeo, nas Fontes |
| Citações de página | 97, entre p. 3 e p. 20, mais "verso" |
| Palavras | 7.969 no arquivo (com opções e explicações dos exercícios); cerca de 6.600 sem elas. Acima do alvo de 6.000; justificativa no dossiê, seção 6 |
| Exercícios | 30 perguntas de múltipla escolha, uma opção certa cada, posição variada |
| Figuras | 6, recortadas das p. 5, 7, 8, 11 e 12, 13 e 19, em `como-jogar/tiny-epic-dungeons/figuras/` (webp, até 1000 px, qualidade 80), só a parte gráfica |
| Vídeo | 1, Duque Board Games, id NXVZinKgee0, confirmado pelo oEmbed |
| Prévia com `tools/como_jogar_md.pagina()` (no scratchpad, fora do repositório) | renderiza sem erro, com as figuras e o vídeo; "Leitura do essencial" de cerca de 16 min |

## 3. Contas refeitas em Python

Script: `scratchpad/tinyepic/tedcalc/contas.py`. Regras: dano = resultado menos Defesa só se maior (p. 11); contra-ataque (p. 12); raios por face (p. 9).

| Exemplo | Conta | No tutorial |
|---|---|---|
| 4min resolvido | 5 + 2 = 7 contra 4: 3 de dano; 3 não usado: 1 Foco | igual |
| 4min Complete a | 4 + 1 = 5 contra 4: 1 de dano, Goblin morre | igual |
| 4min Complete b | 4 contra 4: 0; contra-ataque 3 + 1 = 4 contra 4: 0 | igual |
| Etapa 1, 3 heróis | 7 + (3 + 9) + 4 = 23 cartas; Altares 1 + 3 = 4 | igual |
| Etapa 3 resolvido (p. 9) | 4 + 1 = 5; +1 Foco do 3 | igual |
| Etapa 3 Complete | 6 + 1 = 7; Foco 4 + 3 = 7; paga 6, sobra 1 | igual |
| Etapa 3 Sua vez | 5 para 6 com 2 de Foco | igual |
| Etapa 4 resolvido (p. 11 e 12) | 8 menos 6 = 2; 5 + 3 = 8 menos 6 = 2 | igual |
| Etapa 4 Complete | Escudo: dano = +3 | igual |
| Etapa 4 Sua vez | 6 menos 4 = 2, Goblin morre; 4 + 3 = 7 menos 4 = 3; ação do Goblin 2 + 1 = 3; tocha sobe min(6, 4) = 4 | igual |
| Etapa 5 resolvido | 3 marcadores no 8, Altar no 6: absorve 3, perde 2 | igual |
| Etapa 5 Sua vez | 8 menos 3 = 5; 5 menos 1 = 4 | igual |
| Avaliação 3 | +2 = 3 raios, 3 = 1 raio: 4 de Foco | igual |
| Avaliação 5 | Escudo, modificador +1: 1 | igual |

Ressalva: os raios das faces +1 (2) e 4 (1) foram lidos na ilustração da p. 9; o texto só confirma +2 = 3 ("Receba 3") e 3 = 1 (exemplo). Os exercícios usam só +2 e 3.

## 4. Verificação regra por regra

Reli o trecho de cada afirmação normativa no PDF depois de escrever. "OK" = confere.

| Afirmação no tutorial | Onde | Regra | Página | Situação |
|---|---|---|---|---|
| Composição dos baralhos A, B, C e ordem | 4min, Etapa 1 | R4 a R7 | 4 | OK |
| Entrada, 4 cartas viradas, Grade 7x7 | 4min, Etapa 1 | R8 | 4 | OK |
| Altar na Entrada e 1 por herói | 4min, Etapa 1 | R9 | 4 | OK |
| Tocha no espaço do número de heróis | 4min, Etapa 1 | R10 | 4 | OK |
| Goblins nos números; Vida dos Lacaios = heróis | 4min, Etapa 1 | R11 | 4 | OK |
| Chefe sorteado oculto, Ato 1 | 4min, Etapa 1 | R12 | 4 | OK |
| Herói, miniatura, Vida e Foco no topo; mais novo começa | 4min, Etapa 1 | R14, R15 | 5 | OK |
| Solo com 2 ou mais heróis | Etapa 1 `[!mais]`, seção 0 | R16 | 17 | OK |
| Turno: Mover, 1 Ação Heroica, Ações Livres, ordem livre | 4min, consulta | R21 | 6 | OK |
| Tocha desce no fim de todo turno | 4min, Etapa 4 | R22 | 6 | OK |
| Ação Heroica encerra movimento | 4min, Etapa 2, Situações | R24 | 7 | OK |
| Revelar: 1 Velocidade, girar, cartas novas, entrar, perigos | 4min, Etapa 2 | R29, R30 | 7 | OK |
| Grade de 3 cartas em cada direção | Etapa 2 | R32 | 8 | OK |
| Encontro com Goblin | 4min, Etapa 2 | R33 | 8 | OK |
| Encontro com Lacaio | 4min, Etapa 2 | R34 | 8 | OK |
| Armadilha a cada entrada; seguir ou Desarmar | 4min, Etapa 2 | R27, R35 | 7, 8 | OK |
| Sala com inimigo para; Furtividade | Etapa 2 | R25 | 7 | OK |
| Portal | Etapa 2 e 5 `[!mais]` | R28 | 7 | OK |
| Habilidade com ícone de revelar dispensa entrar | Etapa 2 `[!mais]` | R31 | 7 | OK |
| Teste: dados 1 a 3, 1 resultado, "+", igual ou maior | 4min, Etapa 3 | R20, R37, R38 | 6, 9 | OK |
| Foco dos raios só após sucesso; 6 dá Vida após qualquer teste | Etapa 3 | R39, R40 | 9 | OK |
| Descansar 3 e 5 | Etapa 3 | R42 | 10 | OK (ícones na imagem) |
| Procurar e Desarmar com inimigo na sala | Etapa 3 `[!mais]` | R43, R44 | 10 | OK |
| Desarmar: 1 Espólio ou 1 Feitiço | Etapa 3 e `[!edicao]` | R44 | 10, verso | OK, divergência registrada |
| Lançar Feitiço: Foco antes do efeito | Etapa 3 | R45 | 10 | OK |
| Modificar dado em 1 | Etapa 3 | R62 | 14 | OK |
| Revelar Salas Adjacentes | Etapa 3 | R64 | 14 | OK |
| Pesquisa 4 Foco | Etapa 3 `[!mais]` | R65 | 14 | OK |
| Descobrir / Pegar / limites / Mão cobre | Etapa 3 | R73 a R76 | 16 | OK |
| Conjuntos Lendários | Etapa 3 `[!mais]` | R77 | 16 | OK |
| Tipos de ataque e alcance | Etapa 4 | R46 a R51 | 11 | OK |
| Contra-ataque, Escudo, Tocha, modificadores | Etapa 4 | R52 a R55 | 12 | OK |
| Feitiço sem linha de visão; vários alvos | Etapa 4 `[!mais]` | R56 | 12 | OK |
| Matar Goblin e Lacaio, recompensas, tocha sobe 6 | Etapa 4 | R57 a R59 | 13 | OK |
| Inconsciente | Etapa 4 `[!mais]` | R60 | 13 | OK |
| Espaços da tocha, ordem e IA dos inimigos | Etapa 4 | R67 a R72 | 15 | OK |
| Entrar no Covil, 4 passos | Etapa 5 | R78, R79 | 17 | OK |
| Tabuleiro do Chefe, entrada, espaços, efeitos ao terminar | Etapa 5 | R80 a R82 | 18 | OK |
| Goblins no Covil | Etapa 5 `[!mais]` | R83, R92 | 18, 20 | OK |
| Trilha, Altares, dano excedente perdido | Etapa 5 | R86 a R88 | 19 | OK |
| Chefe sai do Covil; Provocar | Etapa 5 | R89, R90 | 19 | OK |
| Tocha do Chefe antes da Ação do Inimigo | Etapa 5 `[!mais]` | R85 | 19, 20 | OK |
| Regras do Covil (dentro/fora, ações permitidas) | Etapa 5 | R92 | 20 | OK |
| Ação Heroica adicional não repetível | Situações | R93 | verso | OK |
| Condições de vitória e derrota | 4min, Avaliação, consulta | R2, R3 | 6 | OK |

## 5. Interpretações e lacunas

- **Dois dados "+" somados** (R38a): o texto fala das duas faces no plural; o exemplo usa uma. Leitura em "Situações especiais". Nenhum exercício depende dela.
- **Desarmar só logo após o teste de escapar** (R44a): leitura em "Situações especiais".
- **Revelar Salas Adjacentes**: orientação das salas e cartas novas não ditas (R64a). Lacuna declarada.
- **Limite de cartas cheio** (R76a): lacuna; o guia sugere descartar antes, como leitura.
- **Desarmar "ou" / "e"**: p. 10 contra o verso. Segue a p. 10.
- **Goblin em sala do Baralho A** (R36a): o manual não lista o conteúdo das cartas; o exemplo do "Comece" supõe um Encontro com Goblin numa Sala do começo. Se nenhuma Sala trouxer Goblin, o exemplo continua sendo jogada legal mais adiante, mas não no primeiro turno.
- **Defesa 4 do Goblin** nos exemplos: valor de exemplo; não conferido em carta.

## 6. O que ficou fraco

- **Extensão.** 7.969 palavras no arquivo, acima do alvo. O Ato 2 pesa; um corte possível é juntar os quatro `[!passos]` da etapa 5 em dois.
- **Portal e Procurar no primeiro turno.** Podem acontecer, mas ficaram fora do "Comece" (o Portal está em "Ainda não precisa saber"; Procurar não está citado ali). Contraria o item 2 das regras de conteúdo do "Comece".
- **Sem valores de cartas.** O guia não diz Velocidade, Defesa ou Vida de nenhum herói além de Thordin (Defesa 4) nem de Lacaios além do Minotauro. O leitor depende da própria carta, o que é correto, mas os exemplos ficam abstratos.
- **Tabuleiro de Tocha.** O manual não dá o desenho da trilha legível; o guia não diz quantos espaços há nem a frequência de Goblins e Ações do Inimigo.
- **Habilidades dos heróis e efeitos dos Chefes** não são explicados, só a mecânica geral; o leitor recorre à Referência dos Ícones.
- **Edição Asmodee** não conferida: se os termos mudaram, quem tem a caixa nova verá nomes diferentes.

## 7. Próximos passos sugeridos

1. Auditoria independente de regras contra o PDF (texto extraído e imagens).
2. Teste de execução da seção "Comece" com 2 e 4 heróis.
3. Baixar o manual da Galápagos/Asmodee (TNE001) e comparar a terminologia; se mudar, acrescentar a tabela de correspondência à folha de consulta.
4. Procurar FAQ ou errata da Gamelyn sobre Desarmar ("ou" / "e") e sobre a Ação Livre de revelar salas.

## Auditoria independente: partida simulada

Teste feito só com o tutorial.md, sem abrir o manual antes do fim da simulação. Partida para 2 heróis (Ana com Thordin, Bruno com um segundo herói) e conferência do modo solo.

**Preparação.** Baralho A com 9 Salas, B com 2 Encontros e 6 Salas, C com 3 Salas e a Porta do Covil: 19 cartas. Entrada no centro com 1 Altar e 4 cartas viradas para baixo nos lados; mais 2 Altares separados; tocha no espaço "2"; 2 Marcadores de Vida perto do Baralho de Lacaio. Montou sem travar. O resumo do "Comece" dizia "1 carta do Baralho da Masmorra virada", o que pode ser lido como virada para cima.

**Rodada 1.** Ana (mais nova) gasta 1 de Velocidade, revela a carta ao norte, gira para ligar à Entrada, põe cartas viradas para baixo nos corredores abertos, entra: sala vazia. Revela a próxima: Encontro com Goblin, 1 dano, para; carta de Goblin no espaço 1, marcador 1 na sala. Ataca com o Martelo (Força 3 dados + Dado de Inimigo), mata o Goblin, ganha Foco pelos raios. Tocha desce 1. Aqui faltou dizer quem joga depois. Bruno anda até a sala do Goblin morto e revela outra. Ficou a dúvida se reentrar na sala do Encontro com Goblin dispara outro Goblin, e se um herói que começa o turno numa sala com inimigo pode sair dela (a nota do Portal sugere uma regra que o tutorial não dá). Tocha desce 1. Fim de rodada, de jogo e pontuação: claros (não há pontuação; vitória e derrota bem definidas).

**Solo.** Claro: pelo menos 2 heróis, número de heróis vale como número de jogadores.

| Lacuna | Resolução no manual | Correção |
|---|---|---|
| Ordem dos turnos não dita | p. 6: turnos em sentido horário; depois da tocha, "a vez do próximo jogador em sentido horário" | Acrescentado ao passo 5 do "Seu primeiro turno" e à folha de consulta |
| "1 carta ... virada" no resumo da preparação | p. 4: cartas viradas para baixo nos 4 lados da Entrada | Resumo do "Comece" agora diz "do topo ... virada para baixo" |
| Sair de uma sala com inimigo no começo do turno | p. 7 só trata de entrar numa sala com inimigo; a nota do Portal cita salas "caso inimigos impeçam que você saia" sem definir | Manual não resolve. Nova entrada em "Situações especiais", declarada como lacuna |
| Reentrar em sala de Encontro com Goblin ou Lacaio | p. 8: Encontros falam da sala "que acaba de ser revelada"; só a Armadilha diz "cada vez que um herói entra" | Nova entrada em "Situações especiais", como leitura do texto da p. 8 |
| Marcadores de Lacaio não aparecem na preparação | p. 2 lista 8 Marcadores de Lacaio; p. 4 e 5 não dizem onde ficam | Sem correção: o manual também omite. Só registrado aqui |

**Veredito:** dá para jogar só com o tutorial, com as correções acima. As duas lacunas de movimento (sair de sala com inimigo, reentrar em sala de Encontro) não têm resposta no manual e ficaram declaradas no guia.

## Auditoria independente: regras

Conferência do tutorial.md contra o PDF da Meeple BR (texto extraído com pdftotext e páginas 8 a 13, 15 e 18 renderizadas e lidas como imagem, para os ícones). A p. 19 do PDF junta as páginas impressas 19 (Atacar o Chefe, Dano na Trilha, Mover o Chefe sobre Altares) e 20 (Contra-Ataque do Chefe, Ato 2: Tabuleiro de Tocha, Regras Adicionais do Covil); as citações foram conferidas pela página impressa. Contas refeitas em script (Python): todas batem.

| Item | Resultado |
|---|---|
| Título, edição, tradutor (p. 1 e 17) | ok |
| "Comece": turno, Mover, encontros, armadilha, ataque, Foco, tocha (p. 6 a 9, 11, 12, 15) | ok |
| Exemplo do "Comece": Defesa 4 do Goblin | corrigido: "Defesa 4" sem fonte → "a carta comprada é o Goblin Esfaqueador (Defesa 4, como na carta da figura da p. 13)". A carta do Goblin Esfaqueador aparece nas figuras das p. 8, 13 e 15 com Velocidade 4 e Defesa 4 (mesma disposição do Minotauro, cuja Defesa 4 o texto da p. 11 confirma) e modificador +1 por Goblin |
| Complete do "Comece" (4+1 = 5 > 4; contra-ataque 3+1 = 4, sem dano) | ok; "mesmo Goblin" → "mesmo Goblin Esfaqueador (Defesa 4)" |
| Vitória e derrota (p. 6, 8, 15) | ok |
| Atributos, Habilidades, 1 a 3 dados (p. 6, 9) | ok |
| Preparação A a V; 23 cartas com 3 heróis; 4 Altares; tocha no 3 (p. 4 e 5) | ok |
| Mover, revelar, girar, cartas novas, grade 7x7, inimigo para o movimento, Furtividade (p. 7 e 8) | ok |
| Verificar Perigos: Goblin 1 dano, Lacaio 2 danos, Armadilha a cada entrada (p. 8) | ok |
| Portal 2 Foco, limites (p. 7) | ok; [!mais] "Portal e Covil" da etapa 5 removido por repetir o da etapa 2 |
| Teste de Habilidade, faces "+", raios, 6 dá Vida (p. 9) | ok; raios conferidos na figura: +2 tem 3, 3 tem 1 |
| Dois dados "+" somados | corrigido: era leitura do redator em "Situações especiais"; a figura da p. 11 mostra 5, +2 e +1 = 8. Agora está no passo 2 do Teste de Habilidade com a página, e o parágrafo de "Situações especiais" saiu |
| Descansar 3 Vida e 5 Foco; Procurar; Desarmar; Lançar Feitiço (Foco antes do efeito) (p. 10) | ok |
| Desarmar "ou" (p. 10) × "e" (verso) | ok como [!edicao]: o texto e o ícone da figura da p. 10 ("+" espólio "/" feitiço) dizem "ou"; o verso diz "1 Espólio e 1 Feitiço" |
| Momento do Desarmar | mantido em "Situações especiais" como lacuna; texto reescrito para citar p. 8 e 10 e não afirmar regra: "Na dúvida, tente logo depois do teste" |
| Ações Livres: Modificar dado (2 Foco), Revelar Salas Adjacentes, Pesquisa (4 Foco), Acionar Habilidades (p. 14) | ok |
| Espólios e feitiços: Descobrir, Pegar, limites, Conjuntos Lendários (p. 16) | ok; corrigido "Espólio de Mão cobre um equipamento" → "Espólio equipado cobre" (p. 16 fala de espólio em geral) |
| Exemplo da p. 9 (4 + 1 = 5; 2 Foco + 1 do 3) | ok |
| Complete do feitiço (Intelecto 7, custa 6 Foco, 4 danos; 4 + 3 = 7, sobra 1) (p. 9 e 10) | ok |
| Exercícios da etapa 3 (Agilidade 6 com 2 Foco; 6 não usado dá Vida) | ok |
| Ataques, alcance, Defesa "maior que" (p. 11) | ok |
| Contra-ataque 2 a 5, Escudo, Tocha, modificadores (p. 12) | ok |
| Exemplo do Minotauro (8 − 6 = 2; 5 + 3 = 8 contra 6: 2) (p. 11 e 12) e legenda da figura | ok (conferido na figura) |
| Complete: Escudo dá 3; Tocha sem dano e tocha desce 1 | ok |
| Sua vez: ataque à distância contra Goblin (6 − 4 = 2; contra-ataque 4 + 3 − 4 = 3) | corrigido: "um deles, com Defesa 4" → "um Goblin Esfaqueador (Defesa 4), em linha de visão" |
| Ação do Inimigo, Goblin "total de Goblins +1" com 2 Goblins = 3 (p. 15) | ok (é o exemplo da p. 15) |
| Lacaio morto: tocha sobe 6 até o espaço inicial (4 abaixo → sobe 4) (p. 13 e 15) | ok |
| Matar Goblin e Lacaio, recompensas "/" e "+" (p. 13) | ok |
| Herói inconsciente (p. 10, 13, 15, 20) | ok |
| Tabuleiro de Tocha, ordem das ações, Mover ou Atacar, Mover e Atacar, movimento inimigo (p. 15) | ok |
| Entrar no Covil, 4 passos, 1 de Velocidade (p. 14 e 17) | ok |
| Tabuleiro do Chefe, entrada ocupada, efeitos ao terminar o movimento (p. 18) | corrigido: "ganhar ou perder Vida, Foco, Velocidade, ou um Goblin" → "ganhar ou perder Vida ou Foco, ganhar Velocidade ou um Goblin" (ícones da p. 18: +/− Vida/Foco, + Velocidade, + Goblin) |
| Trilha do Chefe, Altares, dano perdido, Provocar o Chefe (p. 19) | ok; exemplo de 3 heróis (absorve 3, perde 2) e exercício 8/5 com 4 de dano refeitos: ok |
| Para entender da etapa 5 | corrigido: citação "(p. 18 e 19)" → "(p. 18 a 20)" (quem fica fora do Covil está na p. 20 impressa) |
| Tocha do Chefe | corrigido: citação "(p. 19 e 20)" → "(p. 12 e 20)" |
| Regras adicionais do Covil, Goblins no Covil (p. 18 e 20) | ok |
| Avaliação final, 10 questões: certas e erradas conferidas | ok |
| Folha de consulta | ok |
| Termos (Ação Heroica, Ação Livre, Verificar Perigos, Carta da Porta do Covil, Monte de Descarte de Goblins, Provocar o Chefe, Revelar Salas Adjacentes Não Exploradas, Modificar o Dado de Herói em 1 etc.) | ok, como impressos |
| "Como este guia ensina" | enxugado: saiu a frase sobre "ajuda que diminui (exemplo resolvido, tarefa para completar, tarefa sem ajuda)", que descrevia o método |

**Incerto (fica como está, declarado no texto):** orientação das salas na Ação Livre Revelar Salas Adjacentes; limite de cartas cheio; Desarmar em turno posterior; Desarmar "ou"/"e". O exemplo do "Comece" supõe uma Sala do Baralho A com Encontro com Goblin; a figura da p. 8 mostra uma Carta de Sala com esse ícone, mas o manual não diz quantas existem.

**Veredito:** APROVADO COM CORREÇÕES.

## Seção de montagem (04/11/2026)

Pedido do editor: seção `## setup. Montar a mesa passo a passo` antes do "Comece a jogar", seguindo a "Preparação" (p. 4 e 5) na ordem das letras A a V, com o diagrama da p. 5. Manual baixado de novo do mesmo endereço do dossiê (https://meeplebr.com/wp-content/uploads/2022/02/TEDu_rulebook-PT-BR-1_compressed.pdf, 200, 21.159.299 bytes, igual ao do dossiê; 20 páginas, InDesign 17, criado em 16/05/2022, modificado em 02/02/2023; `robots.txt` da Meeple BR sem bloqueio). Texto em `scratchpad/setup/tiny-epic-dungeons/manual.txt`; p. 2, 4, 5 e 17 lidas também como imagem.

- **Passo a página:** componentes (p. 2); 1, separar e embaralhar (p. 4, abertura); 2 a 5, Baralhos A, B, C e a pilha (p. 4, A a D); 6, sobras para a caixa (p. 4, E); 7 e 8, Entrada e 4 cartas, Grade 7 x 7 (p. 4, F e G); 9 e 10, Altares (p. 4, H e I); 11 e 12, Tocha (p. 4, J e K); 13 a 15, Goblin, Lacaio, Marcadores de Goblin e de Vida (p. 4, L a N); 16 e 17, Chefe (p. 4, O e P); 18, Espólio e Feitiço (p. 4, Q); 19 a 21, heróis (p. 5, R a T); 22 e 23, Desarme e dados, quem começa (p. 5, U e V). Solo (p. 17).
- **Contas refeitas em Python:** Baralho da Masmorra = A + (1 + 3) x heróis + 4: 9 + 8 + 4 = 21; 7 + 12 + 4 = 23; 5 + 16 + 4 = 25 (o 23 bate com o exercício da Etapa 1). Marcadores de Altar: 1 + heróis = 3, 4, 5; na caixa, 5 - 3 = 2, 5 - 4 = 1, 5 - 5 = 0. Tocha no espaço = heróis. Marcadores de Vida perto do Baralho de Lacaio = heróis.
- **Interpretado:** nada novo. A frase do solo segue a p. 17 ("a quantidade de heróis usada será a referência para quantidade de jogadores"), aplicada à tabela da montagem.
- **Figuras novas** (só a parte gráfica; rótulos e letras do manual cortados ou cobertos com a cor do fundo): `setup-masmorra.webp` (28 Cartas de Masmorra, p. 2); `setup-baralhos.webp` (Baralhos A, B e C, p. 4, com os nomes "Baralho A/B/C" e as letras, que fazem parte do diagrama); `setup-entrada.webp` (Entrada com as 4 cartas, Altar e miniaturas, p. 5, sem os rótulos e as letras G, H e S; a letra F ficou, porque está sobre as cartas, e a legenda a explica); `setup-tocha.webp`, `setup-goblin-lacaio.webp`, `setup-chefe.webp`, `setup-espolio-feitico.webp`, `setup-herois.webp`, `setup-marcadores.webp`, `setup-desarme-dados.webp` (p. 2, sem as legendas de quantidade). Reaproveitada: `preparacao.webp` (p. 5). Foto oficial `fotos/mesa-1.webp`, crédito de `fotos/fontes.json` ("Imagem: Gamelyn Games · edição Deluxe"), com aviso de que é a edição Deluxe.
- **Passos sem ilustração própria no manual:** o separar das Cartas de Masmorra por tipo (passo 1) e a devolução das sobras (passo 6); o Marcador de Tocha no espaço do número de heróis (passo 12), que no diagrama aparece só com a letra K; os Marcadores de Goblin nos números (passo 14) e os Tabuleiros de Chefe não comprados voltando à caixa (passo 16); o Marcador de Vida e o de Foco nas trilhas do herói (passo 21) aparecem só no diagrama geral, com rótulos; o manual não desenha a montagem de 2 ou 3 heróis nem a do solo. Esses passos ficam com texto e com a figura geral.
- **Comece a jogar:** "Monte a mesa" virou um resumo de 5 itens que aponta para a nova seção; `checar_comece.py` aprovado; `vicios.py` sem aviso; zero travessão. `publicar` não foi alterado.

## Auditoria independente da montagem (04/11/2026)

Resultado: aprovado com correções. O que foi aplicado:

- **Erro 1 (foto mesa-1):** a legenda agora diz "Uma partida em andamento, na foto da editora (edição Deluxe em inglês, com peças diferentes das da caixa comum). Não é a mesa no início.", e a foto foi para depois do "Antes de começar, confira". Crédito conferido em `fotos/fontes.json`: "Imagem: Gamelyn Games · edição Deluxe", página de origem https://tycoongames.com/products/tiny-epic-dungeons-deluxe. O `fontes.json` está fora do escopo desta correção e não foi alterado; se a loja tycoongames.com não for da Gamelyn, a correção do crédito vai para a skill `imagens`.
- **Erro 2:** `preparacao.webp` saiu da Etapa 1; no lugar, uma frase remete à seção de montagem. A figura aparece agora uma vez só.
- **Menor 3:** o passo 1 cita "(p. 4, abertura, antes do item A)", e a introdução diz que a montagem segue a frase de abertura e depois as letras A a V.
- **Menor 4:** `setup-marcadores.webp` foi dividida e apagada. `setup-altares.webp` (p. 2) entra depois do passo 10, e `setup-vida-foco.webp` (p. 2) depois do passo 21.
- **Menor 5:** `setup-entrada.webp` refeita: o retângulo e o pedaço vermelho do "H" foram cobertos com a cor do fundo, e não sobrou o pontinho. A emenda com a `setup-chefe`, que era opcional, não foi feita.
- **Menor 6:** as quatro opções da pergunta `??` agora têm o mesmo formato (Baralho A, Baralho B, tocha). Cada errada falha num item só, pelo manual (p. 4).
- **Menor 7:** no resumo do 4min, o Chefe é "sorteado, sem revelar, no Ato 1" (O), e os Marcadores de Goblin ficam "nos números do Tabuleiro de Tocha" (M).
- **Clareza 8:** "*(depois)*" trocado por "(separados para usar depois)" e "(para usar depois)".
- **Clareza 9:** no passo 15 e na legenda de `setup-vida-foco`, os corações cinza (N, na p. 5) vão perto do Baralho de Lacaio, e os vermelhos e os raios vão para os heróis (T, na p. 5). Conferido na p. 2 (4 corações vermelhos, 4 cinza e 4 raios) e na p. 5.
- **Clareza 10:** no solo, o texto diz "escolha a ordem dos seus heróis e mantenha-a (o manual não define)". A p. 17 não fala de ordem.
- **Clareza 11:** o passo 12 remete à seta K da figura da mesa montada.
- **Clareza 12:** nova figura `setup-simbolos.webp`, com os 4 ícones da frase de abertura da p. 4 (Entrada, Sala, Encontro, Porta do Covil) lado a lado, renderizados a 800 dpi, e uma frase que descreve cada ícone.
- `checar_comece.py` aprovado; `vicios.py` sem aviso; zero travessão.
