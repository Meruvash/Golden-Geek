Você vai escrever um tutorial COMO JOGAR para o site Elite Boardgamers (repositório em /home/user/Golden-Geek), no mesmo padrão do tutorial já publicado de Clank! Catacombs.

JOGO: {JOGO}  (slug: {SLUG}). {OBS}

LEIA PRIMEIRO, nesta ordem:
1. /home/user/Golden-Geek/docs/como-jogar/PROMPT_PILOTO.md, Parte 2 inteira. É o método obrigatório (hierarquia de fontes, manual baixado e lido, página citada em cada regra, glossário com os nomes da edição brasileira, exemplos recalculados em script, proibições). Siga-o, com as exceções abaixo.
2. /home/user/Golden-Geek/docs/como-jogar/piloto/clank-catacombs/tutorial.md: o modelo de formato e de voz. Copie a estrutura e a marcação dele.
3. /home/user/Golden-Geek/docs/como-jogar/piloto/clank-catacombs/dossie.md: modelo do dossiê.

EXCEÇÕES AO PROMPT_PILOTO (valem mais que ele):
- O jogo já está escolhido. Fonte de regra, em ordem: (1) manual oficial em português da edição brasileira acessível publicamente (site da editora nacional ou biblioteca de downloads da Asmodee, https://www.asmodee.com.br/download-library, que serviu para Clank!); (2) se ele não existir ou não estiver acessível, o MANUAL OFICIAL EM INGLÊS da editora de origem (decisão do editor em 31/10/2026: não pergunte, siga com o inglês). Nesse caso: traduza os termos de forma clara e consistente, use o nome da edição brasileira quando ele for conhecido por fonte confiável (página da editora, loja), registre no dossiê que a fonte é o manual em inglês, abra o tutorial (o parágrafo em itálico da linha 3) dizendo que as regras foram conferidas no manual oficial em inglês e que os nomes da caixa brasileira podem ser diferentes, e no JSON use "edicao": "Manual oficial em inglês" se não houver edição brasileira confirmada. Só pare (responda "SEM MANUAL: <o que tentou, com links>") se nem o manual oficial em inglês estiver acessível. Não escreva nada de memória. Não contorne bloqueio (403, login, Cloudflare).
- Grave em /home/user/Golden-Geek/docs/como-jogar/{SLUG}/: dossie.md, tutorial.md, auditoria.md. Manual e PDFs ficam no scratchpad, fora do repositório.
- NÃO faça commit, push, nem mexa em nenhum outro arquivo do repositório além desses três e de /home/user/Golden-Geek/conteudo/como-jogar/{SLUG}.json (abaixo). Outros agentes trabalham ao mesmo tempo no mesmo repositório.
- Não use subagentes. A auditoria independente será feita depois por outro agente; no auditoria.md, registre a sua autoverificação regra por regra contra o manual (página) e as contas refeitas.
- Não inclua nenhuma explicação do método de ensino (4C/ID, autores, livro) no tutorial: o editor pediu para tirar. Nada de bloco "[!entender]" sobre o método e nada de "Sobre o método" nas fontes. A seção "Como este guia ensina" fica curta: só como o guia está organizado (etapas, tipos de bloco, respostas escondidas).
- Extensão: alvo de 3.500 a 6.000 palavras, proporcional ao jogo (o de Clank! tem 8 mil porque o jogo é bem mais pesado). Não encha.

FORMATO DO tutorial.md (o conversor do site depende disso; siga à risca, igual ao de Clank!):
- Linha 1: "# Como jogar <nome no Brasil>". Linha 3: um parágrafo em itálico curto dizendo de onde vêm as regras (manual da edição brasileira, editora, versão). Sem "rascunho", sem "não publicado".
- Seções de nível 2 numeradas, nesta ordem: "## 4min. Comece a jogar em 4 minutos", "## 0. Antes de tudo: o que é este jogo", "## 1. Como este guia ensina", "## 2. Etapa 1: ...", "## 3. Etapa 2: ...", ... (quantas etapas o jogo pedir, 3 a 5), "## N. Situações especiais", "## N. Avaliação final", "## N. Para consultar durante a partida", "## N. Fontes".
- Respostas sempre em "### Respostas da etapa X" (ou "### Respostas da avaliação", "### Resposta do Complete") logo depois do bloco que pergunta, e só respostas dentro dela até o próximo ## ou ###.
- Blocos (blockquote com marcador, uma ou várias linhas começando com "> "): [!entender] Para entender; [!passos] Passo a passo (abra com **Título** (p. N) e depois lista numerada); [!resolvido] exemplo resolvido; [!complete] tarefa para completar; [!suavez] tarefa sem ajuda; [!treino] treino rápido; [!atencao] erro comum; [!edicao] diferença entre edições ou ambiguidade do manual; [!dica] estratégia (sempre como sugestão).
- Citação de página: "(p. 7)" ou "(p. 4 e 5)" logo depois da frase, como em Clank!.
- EXERCÍCIOS SÃO DE MÚLTIPLA ESCOLHA (decisão do editor em 31/10/2026): toda pergunta de [!complete], [!suavez], [!treino], da "Avaliação final" e do "Comece em 4 minutos" usa a marcação abaixo; o leitor toca numa opção e vê a certa e a explicação. Não há mais seções "### Respostas": a resposta fica na linha "= ".
  ?? Pergunta curta e clara?
  - ( ) opção errada
  - (x) opção certa (uma só)
  - ( ) opção errada
  = Explicação com a página (p. 7); na avaliação final, qual etapa reler.
  3 ou 4 opções; as erradas são enganos plausíveis e precisam estar erradas pelo manual; varie a posição da certa. Dentro de bloco, cada linha leva "> " na frente.
- Tabelas em markdown simples (| a | b |), só quando ajudam.
- Negrito com **...**, itálico com *...*. Sem HTML. Zero travessão (— e –) no texto. Rode python3 /home/user/Golden-Geek/tools/vicios.py se ele aceitar um arquivo (veja o uso no próprio arquivo) e corrija os avisos.

TAMBÉM GRAVE /home/user/Golden-Geek/conteudo/como-jogar/{SLUG}.json com os dados do topo da página (tudo verdadeiro, vindo do manual ou da página oficial do produto, com a fonte no dossiê):
{"slug": "{SLUG}", "titulo": "Como jogar <nome>", "jogo": "<nome no Brasil>", "genero": "<2 rótulos curtos, ex.: Coleção de conjuntos · Família>", "jogadores": "2 a 4 jogadores", "duracao": "30 a 45 min", "idade": "8+", "edicao": "Edição <editora brasileira>", "data": "2026-10-31", "descricao": "<meta description, até 160 caracteres>", "resumo": "<uma frase: o que você faz e como vence>", "pontos": ["<3 frases curtas com o essencial>", "...", "..."], "leitura_min": <minutos estimados de leitura, inteiro>, "etapas": <número de etapas>, "resenha": "<slug da resenha no site se existir pasta /home/user/Golden-Geek/<slug>/ e conteudo/<slug>.json, senão null>", "chamada": "<frase para o card da lista de tutoriais, 1 a 2 frases>", "publicar": false}  (o "publicar" só vira true depois da auditoria independente)

AO TERMINAR, responda em até 15 linhas: manual usado (título, editora, versão, link), os arquivos gravados, número de palavras do tutorial, regras classificadas como [interpretada] ou [lacuna], e o que ficou fraco.

- Essencial à vista, o resto a um toque (PADRAO_EDITORIAL.md, "Como Jogar: essencial à vista"): nos blocos `[!passos]`, só a regra que se usa sempre. Sala especial, exceção, fim antecipado e efeito de ficha vão em blocos `> [!mais] **Título.** texto`, um por regra, logo depois do passo a passo da etapa.

- Referências visuais (PADRAO_EDITORIAL.md, "Como Jogar: referências visuais", decisão de 01/11/2026): de 4 a 7 figuras recortadas dos exemplos ilustrados do manual (`!fig[legenda com crédito "Ilustração: manual <editora> (p. N)"](figuras/x.webp)`, arquivos em `/home/user/Golden-Geek/como-jogar/{SLUG}/figuras/`, só a parte gráfica, sem blocos de texto do manual) e um vídeo de regras em português do YouTube no fim do "Comece a jogar" (`!video[título e canal, pelo oEmbed](URL&t=0s)`), com a frase "Ele complementa este guia; em caso de diferença, vale o manual." Nunca baixe quadros de vídeo. Vídeo dentro de etapa, com segundo da ação, só se o segundo for conferido.
- Vídeo: de preferência do canal Duque Board Games (@DuqueBoardgames; busca do próprio canal + oEmbed), conforme PADRAO_EDITORIAL.md, "Como Jogar: referências visuais".
