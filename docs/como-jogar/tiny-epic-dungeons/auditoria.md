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
