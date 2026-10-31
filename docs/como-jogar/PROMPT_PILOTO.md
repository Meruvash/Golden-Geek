# Como Jogar: análise do prompt e versão revisada para o piloto

Documento de trabalho, 31/10/2026. A Parte 1 explica o que mudou e por quê. A Parte 2 é o prompt revisado, pronto para colar numa sessão do Claude Code aberta no repositório do Elite Boardgamers.

---

## Parte 1: análise do prompt original

O prompt original acerta no essencial: hierarquia de fontes, separação entre regra, explicação, exemplo e dica, honestidade científica (4C/ID como método, sem prometer eficácia) e auditoria crítica. Os problemas estão no que ele presume sobre o projeto e no que deixa sem verificação. Os pontos abaixo vêm do que a coleção Discipulado ensinou entre 29 e 31/10/2026.

### 1.1 Ele presume uma pesquisa que não existe

O prompt manda escolher "entre os jogos que já possuem manual e pesquisa disponíveis no projeto". No repositório não há nenhum manual: nenhum PDF, nenhum texto de regra extraído. O campo `como_funciona` das resenhas foi escrito a partir de Wikipedia e sites de crítica (veja `fontes` em `conteudo/cascadia.json`). Ou seja, a fonte de nível 4 da própria hierarquia do prompt. Se o agente "reaproveitar a pesquisa existente", vai ensinar regra tirada de resenha.

Correção: o primeiro passo passa a ser obter o manual oficial, salvar o arquivo e o texto extraído, e só então escrever. A pesquisa anterior do portal serve como mapa de dúvidas e de terminologia, nunca como fonte de regra.

### 1.2 "Verifique a fonte" sem mecanismo não funciona

No Discipulado, a regra "nada de memória" só passou a valer quando virou procedimento: a página da NTLH é salva no scratchpad, o texto é copiado dela e um grep confere cada citação. Antes disso, uma frase foi atribuída a Wesley sem que ele a tivesse escrito.

Correção: cada regra do dossiê leva a página do manual (`[manual p. 7]`) e uma frase curta lida ali. Um auditor independente reabre o manual e confere regra por regra.

### 1.3 Falta a terminologia da edição nacional

Num tutorial de jogo, o maior risco de confusão não é a frase longa. É chamar a mesma peça por dois nomes, ou por um nome diferente do que está impresso na caixa que o leitor tem nas mãos. O Discipulado resolveu isso com um glossário único (`base/glossario.md`): cada termo tem uma explicação e uma só.

Correção: o dossiê abre com um glossário de termos do jogo, com o nome impresso na edição brasileira, o original e a página. O tutorial usa só esses nomes.

### 1.4 Critérios de qualidade sem portão mensurável

O prompt lista critérios bons, mas todos qualitativos. No Discipulado, a qualidade subiu quando parte dela virou portão automático (`checar_licao.py`, `legibilidade.py`, proibição de travessão, lista de vícios). Também aprendemos o limite disso: o primeiro padrão de escrita, focado em frases curtas, produziu texto picado e uma personagem inventada ("Dona Rosa"). Por isso o padrão literário passou a prevalecer.

Correção: portões objetivos baratos (zero travessão, zero vício de `tools/vicios.py`, seções na ordem, respostas separadas das perguntas, toda conta de exemplo recalculada). O índice de legibilidade é medido e relatado, mas não é meta: o juiz é o leitor real.

### 1.5 Exemplos com números erram em silêncio

Um exemplo resolvido com pontuação errada ensina errado com autoridade. Nenhum critério do prompt obriga a refazer as contas.

Correção: todo exemplo com números é recalculado num script no scratchpad, e o auditor confere se a jogada é legal pelo manual.

### 1.6 O auditor não pode ser quem escreveu

O prompt pede auditoria crítica, mas feita pelo próprio redator. No piloto do Discipulado (Lição 1), a auditoria por um subagente que não participou da redação pegou problemas que o redator não via. Depois ela foi dispensada para ganhar velocidade, mas num piloto que vai definir um padrão ela se paga.

Correção: dois subagentes independentes. Um confere fidelidade às regras com o manual na mão. O outro tenta montar a partida e jogar a primeira rodada usando só o tutorial e anota onde precisou adivinhar. Esse segundo teste é sinal, não prova de aprendizagem humana, e o relatório diz isso.

### 1.7 Tom: o Elite tem duas vozes

As resenhas do Elite usam "opinião forte" (sarcasmo, tese, padrão Gervais). Esse tom não se aplica a `como_funciona` nem a ficha e fontes. O Como Jogar é ensino de regra: precisa da voz neutra e exata dessas seções, com a qualidade literária de um bom professor. O prompt original não diz isso, e um agente que leu o `PADRAO_EDITORIAL.md` pode levar a acidez para o tutorial.

### 1.8 Entrega em arquivo, fora do que é publicado

O Elite publica a cada push na main. O prompt proíbe publicar, mas não diz onde salvar. O Discipulado usou `dossie.md`, `aluno.md`, `discipulador.md` e `auditoria.md` numa pasta por lição. Correção: três arquivos numa pasta de `docs/`, num branch de trabalho, sem tocar em `conteudo/`, `tools/` nem no build.

### 1.9 Pesquisa proporcional

A primeira lição do Discipulado levou 12 minutos de pesquisa porque o pedido exigia 10 fontes. O prompt original pede uma varredura muito ampla (oito tipos de material). Correção: três fontes obrigatórias (manual nacional, manual original, FAQ ou errata oficial), o resto só se resolver uma dúvida concreta.

### 1.10 Critério de sucesso do piloto

A Lição 1 tinha um critério verificável: "uma pessoa que nunca abriu uma Bíblia lê sozinha e responde as cinco perguntas com as próprias palavras". O prompt lista seis indicadores, mas não diz o que conta como sucesso. Correção: critério explícito, mais um protocolo mínimo de teste com pessoas.

### 1.11 Ajustes menores

- Remover repetições: "não invente" aparecia em cinco seções. Ficou uma lista única de proibições.
- Explicar como o 4C/ID cabe num artigo. O modelo foi feito para currículos com tarefas reais e retirada gradual de apoio. Num texto, isso vira uma sequência: exemplo resolvido, tarefa para completar, tarefa sem apoio. O prompt deve dizer isso, senão o agente cria "quatro seções com os nomes dos componentes".
- Bibliografia: os títulos de referência estão listados com a ordem de "conferir antes de citar".
- O trecho de transcrição de áudio que entrou no meio do prompt ("Oi, pai, o pessoal aqui tá com fome...") foi retirado.

---

## Parte 2: prompt revisado

Cole a partir da linha abaixo.

---

# COMO JOGAR: piloto editorial do Elite Boardgamers

## 1. Tarefa

Produza o primeiro tutorial experimental da linha COMO JOGAR do Elite Boardgamers: um texto que ensine um jogo de tabuleiro a um adulto que nunca o jogou, a ponto de ele montar a partida, jogar os primeiros turnos sem abrir o manual e saber onde procurar quando surgir uma dúvida.

Não é resenha, não é resumo do manual, não é texto de venda.

Isto é um piloto. Nada vai ao ar. Você trabalha num branch, grava três arquivos e me entrega os três para revisão humana. Não peça aprovação no meio do caminho, a não ser que falte documentação indispensável ou haja conflito de regra que impeça um texto responsável.

Antes de começar, leia no repositório: `CLAUDE.md`, `PADRAO_EDITORIAL.md` (seções "Padrão editorial do texto do site" e "Opinião forte"), `tools/vicios.py` e uma resenha completa (`conteudo/cascadia.json`), para conhecer a voz do portal e o que já se sabe do jogo.

## 2. Onde trabalhar e o que não tocar

- Trabalhe no branch indicado pela sessão. Nunca faça push na main: o deploy publica a main automaticamente.
- Grave tudo em `docs/como-jogar/piloto/<slug>/`:
  - `dossie.md` (Entrega 1: diagnóstico, fontes, base de regras e plano instrucional)
  - `tutorial.md` (Entrega 2: o artigo)
  - `auditoria.md` (Entrega 3: relatório crítico)
- Arquivos baixados (PDF do manual, páginas) ficam no scratchpad, em `<scratchpad>/manuais/<slug>/`, e não entram no repositório: manual é material protegido.
- Não altere `conteudo/`, `tools/`, templates, build nem páginas geradas. Não crie seção nova no site.
- Ao fim: commit com os três arquivos e push no branch de trabalho.

## 3. Etapa 1: escolher o jogo

O repositório não tem manuais. As resenhas do portal foram escritas com fontes secundárias e servem só como mapa de dúvidas e de vocabulário. Por isso a escolha depende do que você conseguir obter agora.

Critérios, nesta ordem:

1. Manual oficial em português da edição brasileira acessível publicamente (site da editora nacional) e manual original da editora de origem. Sem o manual em português, o jogo sai da lista.
2. Já tem resenha no Elite (há uma pasta `<slug>/` e um `conteudo/<slug>.json`), para que o tutorial complemente uma página existente.
3. Complexidade suficiente para testar o método: mais de um tipo de ação, uma pontuação que exija explicação, pelo menos uma regra que costuma ser jogada errado. Jogos de peso muito baixo (uma ação só) não testam nada; jogos de peso alto deixam o piloto longo demais.
4. Procura real: confira se "como jogar <nome>" aparece no autocomplete do Google e do YouTube (`curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=pt-BR&q=como+jogar+<nome>"`; para o YouTube, acrescente `&ds=yt` e use `client=youtube`). Registre o que viu, com data.

Teste três ou quatro candidatos entre as resenhas existentes, registre no dossiê o resultado de cada um (manual encontrado ou não, com o link) e explique a escolha em um parágrafo.

Para obter os arquivos: sites oficiais das editoras, por acesso normal. Respeite `robots.txt` e bloqueios: se um site responder 403 ou exigir login (o BoardGameGeek exige para baixar arquivos), não contorne. Diga que não conseguiu e siga com outro candidato.

## 4. Etapa 2: auditoria documental

Fontes, em ordem de autoridade:

1. Manual da edição brasileira (é a caixa que o leitor tem).
2. Manual original da editora de origem, para resolver dúvida de tradução.
3. FAQ, errata ou regra atualizada oficial da editora ou do autor.
4. Material oficial de ensino (vídeo ou guia da editora).
5. Fontes independentes e comunidade: só para levantar as dúvidas recorrentes que o tutorial deve antecipar. Nunca como fonte de regra.

Procedimento obrigatório, porque é o que impede a regra de memória:

- Salve cada PDF no scratchpad e extraia o texto (`pdftotext -layout`). Registre no dossiê título, editora, versão ou data impressa, número de páginas, URL e data do download.
- Cada regra da base de regras leva a página e uma frase curta lida ali (para o grep). Use a marcação `[BR p. 7]`, `[orig. p. 6]`, `[FAQ]`.
- Quando o manual brasileiro e o original divergirem, registre as duas versões, a página de cada uma e a natureza da diferença (tradução, errata, mudança de edição). Siga o que estiver na errata oficial; sem errata, siga a edição brasileira e avise no tutorial.
- Classifique cada regra: `[verificada]` (lida no manual nesta sessão), `[interpretada]` (o manual é ambíguo e você escolheu uma leitura, com o motivo) ou `[lacuna]` (o manual não diz). Regra `[lacuna]` não vira afirmação categórica no tutorial.
- Não alegue ter lido documento que não abriu.

## 5. Etapa 3: base de regras e glossário

No dossiê, antes de escrever qualquer frase do tutorial:

**Glossário do jogo.** Cada termo como está impresso na edição brasileira, o termo original, a página e uma explicação de uma linha. O tutorial usa só esses nomes, sempre os mesmos. Nada de sinônimo para variar o estilo: se a caixa diz "ficha de natureza", o texto diz "ficha de natureza" do começo ao fim.

**Base de regras**, uma linha por regra, com fonte e classificação: objetivo e vitória; componentes que importam para começar; preparação, incluindo diferenças por número de jogadores; estrutura de rodada e de turno; cada ação com requisito, custo, efeito e restrição; interação entre jogadores; fim de partida; pontuação; desempate; exceções; regras frequentemente jogadas errado (com a fonte que mostra que é um erro comum); diferenças entre edições.

Para cada regra, anote de quais outras ela depende. Essa lista de dependências define a ordem do tutorial: nenhum conceito é usado antes de ser apresentado.

**Tipos de afirmação.** Separe sempre:

- Regra: o que o manual determina.
- Explicação: o porquê, ou uma reformulação para entender melhor.
- Exemplo: situação construída para mostrar uma regra. Precisa ser uma jogada legal e precisa ser apresentada como exemplo.
- Dica: sugestão de como jogar melhor. Nunca escrita como obrigação.

## 6. Etapa 4: plano instrucional (4C/ID)

Use o Four-Component Instructional Design (van Merriënboer e Kirschner, *Ten Steps to Complex Learning*) com os quatro componentes e os nomes originais. O modelo foi feito para cursos inteiros, em que o aluno executa tarefas reais com apoio que diminui aos poucos. Num artigo, isso se traduz assim, e é assim que você deve aplicar:

- **Learning tasks.** O eixo do tutorial são tarefas da partida real: montar a mesa, jogar um turno, decidir entre duas ações, fechar a pontuação. Organize em classes de tarefa, da mais simples para a mais completa. Em cada classe, o apoio diminui: primeiro um exemplo resolvido (worked example), depois uma tarefa para completar (o texto começa a jogada e o leitor termina), depois uma tarefa sem apoio, com a resposta separada.
- **Supportive information.** O porquê: o que o jogo recompensa, como os sistemas se ligam, por que uma ação custa o que custa. Vem antes da classe de tarefa que precisa dela.
- **Procedural information.** O passo a passo exato (sequência, custo, restrição, efeito), colocado no ponto em que o leitor vai precisar, e repetido na referência rápida final.
- **Part-task practice.** Só para o que precisa virar automático e onde o erro é comum (em geral a pontuação ou uma regra de colocação). Poucos exercícios, curtos. Não transforme toda regra em exercício.

No dossiê, entregue o mapa: quais são as classes de tarefa, que informação de apoio e que informação procedural cada uma usa, onde entra a prática específica e por quê. Diga também o limite: um texto não observa o leitor nem ajusta o apoio a ele.

Referenciais complementares, cada um na sua função: Teoria da Carga Cognitiva (Sweller) para dosar o que entra junto; exemplos resolvidos para iniciantes; prática de recuperação (perguntas antes da resposta); aprendizagem para o domínio (tarefa observável, com correção e nova tentativa); ISO 9241-11 (eficácia, eficiência e satisfação) só como moldura de avaliação. A evidência de cada referencial não comprova a combinação aplicada a jogos de tabuleiro, e o texto não pode sugerir que comprova.

Bibliografia: confira cada obra antes de citar (autor, título, edição, ano). Ponto de partida, a conferir: van Merriënboer e Kirschner, *Ten Steps to Complex Learning* (3ª ed., 2018); Sweller (1988), *Cognitive Science*, sobre carga cognitiva; Paas (1992), *Journal of Educational Psychology*, escala de esforço mental; Roediger e Karpicke (2006), sobre prática de recuperação; Bloom (1968), sobre aprendizagem para o domínio; ISO 9241-11:2018. Não cite resultado numérico de estudo que você não leu.

## 7. Etapa 5: o tutorial

Arquivo `tutorial.md`, título `# Como jogar <nome no Brasil>`.

**Estrutura de referência.** Use a ordem abaixo como ponto de partida. Mude a ordem ou funda seções quando as dependências entre regras pedirem; o plano 4C/ID manda mais que esta lista. Registre no dossiê qualquer mudança.

1. O que você está tentando fazer: objetivo, como se vence, a lógica geral do jogo em um ou dois parágrafos.
2. O que importa para começar: componentes e conceitos, cada um ligado à sua função. Nada de inventário da caixa.
3. Prepare a partida: sequência numerada, executável e conferível na mesa, com as diferenças por número de jogadores.
4. Como funciona uma rodada.
5. As ações: requisito, custo, efeito, restrição, com um exemplo resolvido para cada ação que tenha custo ou escolha.
6. Uma rodada acompanhada: uma sequência completa de jogo, mostrando várias regras funcionando juntas e as decisões que o jogador tomou.
7. Situações especiais: exceções, conflitos, o que costuma ser jogado errado.
8. Fim da partida e pontuação: sem ambiguidade, com um exemplo de contagem completo.
9. Verifique se aprendeu: de 5 a 8 situações de mesa. As perguntas vêm todas juntas; as respostas, com a justificativa e a página do manual, vêm numa seção separada depois.
10. Para consultar durante a partida: referência rápida de uma tela, com sequência do turno, ações, custos e o que mais se esquece.
11. Fontes: manuais e FAQ usados, com edição, link e data.

**Marcação.** Regra é o texto corrido. Exemplos e dicas ficam marcados, para o leitor nunca confundir os dois com regra:

- `> [!exemplo]` para exemplo resolvido ou jogada ilustrativa.
- `> [!dica]` para sugestão de estratégia.
- `> [!atencao]` para regra que costuma ser jogada errado.
- `> [!edicao]` para diferença entre edições ou ponto em que o manual é ambíguo.

**Exemplos.** Todo exemplo é uma jogada legal pelo manual e usa componentes que existem no jogo. Toda conta (pontos, custos, recursos) é refeita num script Python no scratchpad antes de entrar no texto. Não invente personagem com nome e história para encher o exemplo: "você", "o jogador à sua esquerda", "Ana e Bruno" no máximo, só para separar jogadores.

**Voz.** A do professor que conhece bem o jogo, gosta de ensinar e não tem pressa. Neutra e exata, como o `como_funciona` das resenhas: o tom de "opinião forte" do portal não entra aqui. O leitor é adulto e inteligente; nada de infantilizar nem de soar acadêmico.

- Prosa com parágrafos de função clara. Listas só para sequência, alternativas e a referência rápida.
- Ordem direta, palavra concreta, ritmo variado. Nem frase longa empilhada, nem fileira de frases curtas para parecer simples.
- Mostrar antes de nomear: primeiro o que acontece na mesa, depois o nome da regra.
- Antecipar a dúvida do leitor ("e se a pilha acabar?") e responder no ponto em que ela aparece.
- Analogia só quando esclarece de verdade, com o limite dela dito.
- Zero travessão. Zero expressão da lista de `tools/vicios.py`. Fora também: "mergulhe", "prepare-se para", "agora que você já sabe tudo", "é importante lembrar", "não é só X, é Y", abertura genérica, fecho genérico, exclamação.
- Termo em inglês só quando a edição brasileira o usa, e explicado na primeira vez.

**Extensão.** Proporcional ao jogo, sem encher. Referência: de 2.500 a 4.500 palavras para um jogo de peso médio-leve, fora a referência rápida. Se passar disso, justifique no dossiê qual regra exigiu o espaço. Não corte regra fundamental para encurtar.

**Direitos autorais.** Explicação própria. Citação literal do manual só de frase curta, quando a redação exata importa, com a página. Nada de reproduzir tabela, ilustração ou trecho longo. Nenhuma imagem gerada por IA. Imagem, se houver, só oficial e com crédito, e no piloto ela é opcional.

## 8. Etapa 6: verificação

**Portões automáticos** (rode e relate no dossiê; reescreva até passar):

- Busca por travessão (—) e meia-risca (–) no tutorial: zero.
- `tools/vicios.py` aplicado ao texto do tutorial: zero aviso, ou cada aviso justificado.
- Todas as seções presentes; respostas separadas das perguntas.
- Todo exemplo com número recalculado pelo script.
- Toda regra do tutorial existe na base de regras do dossiê com página.
- Legibilidade: meça o índice de Flesch adaptado ao português (Martins et al., 1996; há uma implementação em `tools/discipulado/legibilidade.py` do repositório Arcvalion_gospel, adapte se estiver disponível) e relate o resultado. É informação para o editor, não meta: não pique frases para subir o número.

**Dois auditores independentes** (subagentes que não participaram da redação, rodando em paralelo):

1. **Auditor de regras.** Recebe o tutorial e o texto extraído dos manuais, nada mais. Confere cada afirmação normativa contra a página, cada exemplo contra as regras, e procura regra essencial que ficou de fora. Devolve a lista de problemas com a página.
2. **Teste de execução.** Recebe só o tutorial. Simula, passo a passo, a preparação para 2 e para o número máximo de jogadores e uma rodada completa, e anota cada ponto em que precisou adivinhar, voltar atrás ou ficou sem resposta. Depois responde a seção "Verifique se aprendeu" sem olhar as respostas, e compara.

Corrija o tutorial com o que eles encontrarem e repita o auditor de regras se a correção mexeu em regra. Registre quantas rodadas foram. O teste de execução é feito por uma máquina que já sabe ler manual: é sinal de lacunas, não evidência de que uma pessoa aprende com o texto. O relatório tem de dizer isso.

## 9. Entregas

**Entrega 1: `dossie.md`.** Candidatos testados e a escolha. Fontes com versão, data e link. Glossário. Base de regras com página e classificação. Divergências entre edições. Mapa 4C/ID e decisões para reduzir carga cognitiva (o que foi adiado, o que foi agrupado, por quê). Resultado dos portões automáticos.

**Entrega 2: `tutorial.md`.** O artigo completo, pronto para leitura editorial. Não um roteiro, não uma amostra.

**Entrega 3: `auditoria.md`.** Crítico, sem elogio ao próprio texto:

- Fontes efetivamente usadas e as que não foi possível obter.
- Cobertura: regra por regra da base, onde está no tutorial, ou por que ficou de fora.
- O que os dois auditores encontraram e o que foi corrigido.
- Pontos de interpretação delicada e lacunas do manual.
- Evidências concretas de cada componente do 4C/ID (trechos, não a existência de uma seção com o nome).
- Avaliação de clareza e completude, com os pontos fracos que restaram.
- Rubrica editorial, se quiser usar uma: apresentada como instrumento interno, não validado.
- Proposta de teste com leitores (seção 10).
- Como o Como Jogar poderia se ligar à resenha do mesmo jogo no futuro (proposta só; nada implementado).

## 10. Teste com leitores (proposta para depois do piloto)

Critério de sucesso do piloto: uma pessoa que nunca jogou o título lê só o tutorial, monta a partida e joga a primeira rodada sem abrir o manual e sem ajuda, cometendo no máximo um erro de regra que ela mesma corrige ao consultar a referência rápida.

Protocolo mínimo, para eu aplicar com pessoas reais (descreva no relatório, com os instrumentos prontos):

- Participantes: de 5 a 8 adultos que nunca jogaram o título; registrar se já jogam outros jogos de tabuleiro.
- Tarefas observáveis: montar a partida; jogar uma rodada; pontuar uma situação dada.
- Medidas: autonomia (tarefas concluídas sem ajuda); precisão (procedimentos executados corretamente, contados numa lista de verificação feita a partir da base de regras); tempo até a primeira rodada independente; retenção (as mesmas situações de mesa, 7 dias depois); esforço mental percebido (escala de 9 pontos de Paas, logo após cada tarefa); satisfação (uma pergunta aberta e uma escala simples).
- Comparação, se houver gente suficiente: metade aprende pelo manual, metade pelo tutorial.

Não apresente nenhum resultado hipotético como observado, e não diga que o tutorial ensina melhor que o manual antes desse teste.

## 11. Proibições

- Regra, componente, ação, exceção ou interação inventada.
- Regra tirada de memória, de resenha, de vídeo de terceiros ou de fórum.
- Conteúdo de outra edição sem verificar a compatibilidade.
- Estratégia escrita como regra.
- Referência bibliográfica, estudo ou número não conferido.
- Rubrica interna ou teste automático apresentado como validação científica ou prova de aprendizagem.
- Trecho longo copiado do manual. Imagem gerada por IA.
- Resenha, recomendação de compra ou o tom de "opinião forte" dentro do tutorial.
- Omitir regra fundamental para encurtar, ou simplificar a ponto de ensinar errado.
- Contornar bloqueio de site (login, 403, limite de acesso).
- Mexer em `conteudo/`, `tools/`, no build ou na arquitetura do portal; push na main; publicar.

## 12. Relato final

Em poucas linhas: o jogo escolhido e por quê, os três arquivos com caminho, as fontes que faltaram, os problemas que os auditores acharam e o que ainda depende de teste com pessoas.

Prioridade, em caso de conflito: exatidão das regras, depois capacidade de o leitor jogar sozinho, depois qualidade da escrita.
