# Padrão do Como Jogar

> Parte do padrão editorial da Elite Boardgamers. Regras comuns (tom "Opinião forte", texto de gente, notícias e chamadas) ficam em `PADRAO_EDITORIAL.md`. 

## Comece a jogar em N minutos (31/10/2026)


Pedido do usuário: a seção curta do topo de cada tutorial precisa garantir que a pessoa saiba o mínimo suficiente para começar a jogar. A versão do piloto (Clank! Catacombs) era um manual comprimido: 669 palavras sobre o jogo inteiro, dezenas de termos de uma vez, regras do fim da partida misturadas com a montagem e nenhum turno de exemplo. Lida em 4 minutos, mas sem ensinar a jogar o primeiro turno.

**O que a seção promete:** ao fim dela, o leitor monta a mesa e joga o primeiro turno sem abrir o manual. Só isso. A partida inteira é das etapas seguintes. A promessa de minutos é de leitura (200 palavras por minuto), não de mesa.

**Como o 4C/ID se aplica aqui.** A seção é a primeira classe de tarefa do tutorial, na versão mais simples da tarefa inteira:

| Componente do 4C/ID | Na seção | Regra |
|---|---|---|
| Tarefa de aprendizagem | **Meta** e **Seu primeiro turno** | A tarefa é real e inteira, na versão mais simples: montar e jogar um turno com as cartas iniciais e um túnel comum. Apoio que diminui: exemplo resolvido, depois tarefa para completar, depois a mão de verdade do leitor (com perguntas de checagem antes de jogar). A resposta da tarefa para completar vem depois, separada. |
| Informação de apoio | **A ideia do jogo** | O modelo mental em até 3 frases: objetivo, a tensão central, a lógica do jogo. No máximo 4 termos novos em negrito. |
| Informação procedural | **Monte a mesa**, os passos do turno e a ordem do fim do turno | Lista numerada, conferível na mesa, no ponto de uso. Componente que só serve mais tarde leva a marca *(depois)*: o leitor monta, mas não precisa entender agora. |
| Prática específica | **Os erros mais caros** | Só os 2 ou 3 erros mais comuns e caros, ditos como regra. O treino em si fica nas etapas. |
| Redução de carga | **Ainda não precisa saber** | Lista do que foi adiado e em que etapa está. Nada que só aparece depois do primeiro turno entra na seção, exceto como orientação de uma linha (**Como a partida acaba**). |

**Ordem obrigatória:** Meta; A ideia do jogo; Monte a mesa; Seu primeiro turno (tabela das cartas iniciais, passos do turno, exemplo resolvido, complete, a sua mão, resposta do complete); o que for indispensável para fechar o primeiro turno (no Clank!, o ataque do dragão em três linhas); Ainda não precisa saber; Como a partida acaba; Os erros mais caros.

**Regras de conteúdo:**
1. Toda regra da seção existe na base de regras do dossiê, com página do manual. O exemplo resolvido é uma jogada legal com as cartas iniciais reais, e a conta é refeita.
2. Toda regra que pode acontecer no primeiro turno está na seção, mesmo rara (no Clank!: carta com Revelar na Fileira inicial, ataque do dragão ao repor a Fileira).
3. Nenhuma regra que só acontece depois do primeiro turno entra explicada; vai para "Ainda não precisa saber", com a etapa.
4. Os mesmos nomes do glossário da edição brasileira, sempre iguais.
5. Voz do Como Jogar (neutra e exata, sem opinião forte), zero travessão, zero vício de `tools/vicios.py`.

**Portões:**
- `python3 tools/checar_comece.py docs/como-jogar/<...>/tutorial.md` precisa passar (tamanho, ordem, blocos, resposta separada, termos, etapas citadas que existem, travessão, vícios).
- **Teste de execução:** um subagente que não escreveu a seção recebe só ela e tenta montar a mesa para o mínimo e o máximo de jogadores e jogar o primeiro turno com três mãos diferentes. Cada ponto em que ele precisou adivinhar vira correção. É sinal de lacuna, não prova de que pessoas aprendem.
- **Teste com pessoas** (quando houver leitores): a pessoa lê só a seção e joga o primeiro turno sem ajuda; conta-se tempo, erros de regra e onde travou.

## essencial à vista, o resto a um toque (31/10/2026)

Pedido do usuário: separar com clareza o que é fundamental para jogar das informações adicionais, e deixar o texto à vista curto. O conversor (`tools/como_jogar_md.py`) aplica a regra sozinho; quem escreve só precisa marcar certo.

- **À vista (essencial):** a seção "Comece a jogar em N minutos" inteira; em cada etapa, os blocos `[!passos]` (a regra que se usa sempre) e `[!atencao]` (o erro caro); tabelas de referência; a folha "Para consultar durante a partida" e as fontes.
- **Abre com um toque:** `[!entender]` ("Por que funciona assim"), `[!resolvido]` ("Ver um exemplo resolvido"), `[!edicao]`, `[!dica]` e `[!mais]` ("Regra adicional: <título>"). As tarefas (`[!complete]`, `[!suavez]`, `[!treino]`) e as respostas de cada etapa vão juntas para o fim dela, em "Pratique esta etapa". As seções "Antes de tudo", "Como este guia ensina", "Situações especiais" e "Avaliação final" ficam inteiras recolhidas, com a etiqueta Opcional.
- **O que é `[!mais]`:** regra verdadeira e necessária quando a situação aparece, mas que não acontece em toda partida ou em todo turno: sala especial (Portal, Caverna), exceção (dano por escolha sem cubos), fim antecipado, efeito de ficha. Um bloco por regra, com título curto em negrito ("> [!mais] **Portal.** ..."), para o leitor achar pelo nome quando a peça aparecer na mesa. Nunca apagar regra para encurtar: mover para `[!mais]`.
- **Teste do essencial:** um bloco `[!passos]` só tem o que o jogador usa sempre ou quase sempre. Se a regra começa com "se", "quando", "exceto" ou cita um componente que só aparece em parte das partidas, ela é candidata a `[!mais]`.
- **Leitura:** o tempo do topo ("Leitura do essencial") conta só o que fica à vista, a 200 palavras por minuto.


## referências visuais (01/11/2026)

Pedido do editor: mostrar as ações, não só descrevê-las. Decisão dele, no mesmo dia: **recortes das ilustrações do manual + vídeo do YouTube incorporado**; nada de print de vídeo (os termos do YouTube proíbem baixar o conteúdo, e o vídeo é obra de quem o gravou).

- **Figuras do manual** (`!fig[legenda](figuras/arquivo.webp)` no tutorial.md; arquivos em `como-jogar/<slug>/figuras/`): de 4 a 7 por tutorial, uma ou mais por etapa, escolhidas entre os exemplos ilustrados do manual que mostram uma ação acontecendo (preparação montada, um turno, uma jogada, uma batalha, uma pontuação). Recorte só a parte gráfica do quadro (peças, cartas, tabuleiro, setas), sem reproduzir os blocos de texto do manual; largura máxima 1000 px, `.webp` com qualidade em torno de 80. A legenda explica, com palavras nossas, o que a figura mostra e termina com o crédito "Ilustração: manual <editora> (p. N)". A figura entra logo depois do bloco que ela ilustra. Manual em inglês: mesma regra, crédito "Ilustração: manual oficial <editora> (p. N)", e a legenda traduz o que for preciso.
- **Vídeo** (`!video[legenda](https://www.youtube.com/watch?v=ID&t=SEGUNDOS)`): um vídeo de regras em português, no fim do "Comece a jogar em N minutos", com a frase "Ele complementa este guia; em caso de diferença, vale o manual." Preferência (pedido do editor, 01/11/2026): canal **Duque Board Games** (@DuqueBoardgames), "Como jogar" ou "Gameplay resumida"; sem vídeo do Duque, o canal da editora brasileira, depois o tradutor ou revisor do manual, ou canal de regras conhecido. Para achar os vídeos do Duque, a busca na web não serve: use a busca do próprio canal (`https://www.youtube.com/@DuqueBoardgames/search?query=<jogo>`, com `Accept-Language: pt-BR`) e confirme pelo oEmbed. Se o vídeo do Duque for de partida e não de regras, pode entrar um segundo vídeo, de regras. O canal e o título vêm do oEmbed oficial (`https://www.youtube.com/oembed?url=...&format=json`), e a legenda credita o canal. A página mostra só a capa; o player do YouTube (domínio youtube-nocookie) carrega quando o leitor toca. Nada do vídeo é baixado.
- **Vídeo no segundo da ação:** um `!video` dentro de uma etapa, com `&t=`, só quando o segundo for conferido (capítulos da descrição do vídeo ou transcrição com tempo de cada trecho). Sem tempo conferido, não se estima: fica só o vídeo do topo.
- **Montar a mesa passo a passo (pedido do editor em 04/11/2026).** Todo tutorial abre, logo depois do resumo e antes do "Comece a jogar", com a seção `## setup. Montar a mesa passo a passo`. Ela segue a página (ou páginas) de preparação do manual, na mesma ordem, e descreve a montagem de forma completa: a lista de componentes com quantidades; cada passo numerado com o que pegar, quantos, onde pôr e virado para que lado; o que muda com o número de jogadores (tabela); o que volta para a caixa; quem começa. **Cada passo que pode ser mostrado tem imagem**: recorte da ilustração de preparação do manual (`!fig`, crédito e página), e a foto da mesa montada da editora quando houver; se o manual não ilustra um passo, diga isso no `auditoria.md` em vez de inventar. Termina com uma conferência rápida ("antes de começar, confira:") e uma pergunta `??`. Fica toda à vista (nada recolhido, salvo regra de caso especial em `[!mais]`). O "Comece a jogar" pode remeter a ela em vez de repetir a montagem.
- **Fotos em todas as seções (pedido do editor em 04/11/2026).** Nenhuma seção do Como Jogar fica sem imagem. O topo de cada tutorial abre com uma foto oficial do jogo (mesa montada de preferência), cada seção sem figura do manual à vista abre com uma foto logo abaixo do título (rodízio entre as fotos do jogo) e a lista em `/como-jogar/` mostra a foto de cada jogo no cartão e um mosaico no topo. As fotos seguem as regras da skill `imagens` (editora, licenciadas, Wikimedia Commons; crédito embaixo; nada de rosto de frente; nunca imagem gerada por IA) e ficam em `como-jogar/<slug>/fotos/` com `fontes.json`; jogo que tem resenha reaproveita `<slug>/fotos/`. O gerador (`tools/como_jogar_md.py`) põe tudo sozinho; sem foto oficial, entram as figuras do manual, e o tutorial só vai ao ar com pelo menos 3 fotos oficiais quando a editora ou o Commons tiverem (o `verificar_site.py` avisa tutorial publicado sem foto).
- Ícones de componentes (recursos, símbolos de dado) continuam com `![nome](icones/x.webp)`, com crédito embaixo da tabela.

