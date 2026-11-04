# Auditoria: Como Jogar Catan

Entrega 3. Autoverificação feita por quem escreveu o tutorial, em 31/10/2026. Pelo briefing, a auditoria independente (auditor de regras e teste de execução) fica para outro agente; nada aqui substitui essa revisão.

## 1. Fontes usadas e que faltaram

Usadas: folheto *Catan, o jogo: Regras* da Devir (4 páginas, edição 2015, tradução de 12/2018), manual do *Catan Plus* da Devir (só componentes), *Catan Game Rules & Almanac* da Catan GmbH e Catan Studio (2020), página do produto da 6ª edição na Devir Brasil, catálogo Devir de abril de 2026. Detalhes e links no dossiê, seção 2.

Faltaram: o Almanaque em português (o folheto remete a ele 36 vezes com ➔ e ele não está publicado), o manual da 6ª edição brasileira e qualquer FAQ ou errata oficial. Consequência: 15 das 60 regras da base vêm só do manual original em inglês, e outras 13 usam o original para completar o folheto; todas estão marcadas "manual original" no tutorial.

## 2. Cobertura, regra por regra

Conferência feita relendo cada frase do tutorial contra o texto extraído (`pdftotext`) da página citada. "OK" = a frase do tutorial diz o mesmo que a página.

| Regra | Fonte | Onde no tutorial | Conferência |
|---|---|---|---|
| R1 objetivo, 2 pontos iniciais, 10 vence | BR p. 1 | 4 min (ideia), seção 0 | OK |
| R2 terrenos e produção | BR p. 1 | 4 min (tabela), seção 0 | OK |
| R3 frequência dos números | BR p. 1; script | Etapa 2 (entender, treino) | OK; 6 e 8 vermelhos no texto BR |
| R4 componentes | Plus p. 2 e 3 | Etapa 1 ("Na caixa"), etapa 4 (14/6/5) | OK |
| R5 3 a 4 jogadores, 75 min, 10+ | produto | JSON; situações especiais | OK |
| R6 moldura, terrenos, fichas | BR p. 2 | 4 min passo 1; etapa 1 passo 1 | OK |
| R7 deserto sem ficha | orig. p. 13 | 4 min passo 2; etapa 1 passo 2 | OK |
| R8 ladrão no deserto | orig. p. 7; ilustração BR p. 1 | idem | OK |
| R9 peças, 2 aldeias e 2 estradas, 3 jogadores sem vermelho | BR p. 2 | 4 min passo 3; etapa 1 passo 3; complete da etapa 1 | OK |
| R10 cartas especiais e dados | BR p. 2 | 4 min passo 5; etapa 1 passo 4 | OK |
| R11 reserva nos suportes | BR p. 2 | 4 min passo 4; etapa 1 passo 5 | OK |
| R12 monte de desenvolvimento | BR p. 2 | 4 min passo 4; etapa 1 passo 6 | OK |
| R13 cartas iniciais da aldeia com letra | BR p. 2 | 4 min passo 6; etapa 1 passo 7, atenção, resolvido | OK; exemplos azul e laranja são os do manual |
| R14 mão oculta | BR p. 2 | 4 min passo 6; etapa 1 passo 7 | OK |
| R15 mais velho começa, vez à esquerda | BR p. 2 | 4 min passo 7; etapa 1 passo 8 | OK |
| R16 fases do turno | BR p. 2 | 4 min (turno); etapa 3 (entender); consulta | OK |
| R17 rolar é obrigatório | orig. p. 4 | Etapa 2 passo 1 | OK |
| R18 produção para todos | BR p. 2 | 4 min passo 1 e erros caros; etapa 2 | OK |
| R19 aldeia 1, cidade 2 | BR p. 2 | Etapa 2 passos 3 e 4 | OK |
| R20 ladrão bloqueia | BR p. 4 | Etapa 2 passo 5; etapa 4 (atenção) | OK |
| R21 Comércio Interno só com o jogador da vez | BR p. 3 | 4 min passo 2 e erros caros; etapa 3 passos 1 e 2 | OK |
| R22 sem doação, sem iguais, sem cartas de desenvolvimento | orig. p. 7 e 14 | Etapa 3 passo 3 | OK |
| R23 4:1 sempre | BR p. 3 | 4 min passo 2; etapa 3 passo 4 | OK |
| R24 portos 3:1 e 2:1 | BR p. 3 | Etapa 3 passo 5 | OK |
| R25 porto especial só da sua matéria-prima | orig. p. 9 | Etapa 3 passo 6 | OK |
| R26 reserva só no próprio turno | orig. p. 14 | Etapa 3 passo 6 | OK |
| R27 pagar e construir quanto puder | BR p. 3; orig. p. 6 | Etapa 3 construção passo 1 | OK |
| R28 estrada: custo, 1 por caminho | BR p. 3 | 4 min tabela; etapa 1 (entender); etapa 3 passo 2 | OK |
| R29 ligação da estrada | BR p. 3; orig. p. 4 e 11 | 4 min passo 3; etapa 3 passo 2 | [interpretada], ver seção 4 |
| R30 aldeia: custo e estrada própria | BR p. 3 | 4 min passo 3; etapa 3 passo 3 | OK |
| R31 regra da distância | BR p. 3 | 4 min passo 3 e erros caros; etapa 3 passo 4 e treino | OK |
| R32 cidade | BR p. 4; orig. p. 6 | Etapa 3 passo 5 | OK |
| R33 aldeia 1 ponto | BR p. 4 | 4 min (fim); etapa 5 | OK |
| R34 compra de carta de desenvolvimento | BR p. 4 | 4 min (complete); etapa 3 passo 6 | OK |
| R35 limite de peças | BR p. 2; orig. p. 12 | Etapa 3 passo 7; consulta | OK |
| R36 monte vazio | orig. p. 5 | Etapa 4 passo 6 | OK |
| R37 7 e descarte | BR p. 4 | 4 min (se sair 7); etapa 4 | OK |
| R38 ladrão obrigatório, deserto vale | BR p. 4; orig. p. 5 e 11 | Etapa 4 passo 3; complete; treino d | OK |
| R39 roubo | BR p. 4; orig. p. 8 | Etapa 4 passo 4 | OK |
| R40 depois do 7, comércio | BR p. 4 | Etapa 4 passo 5 | OK |
| R41 uma carta por turno | BR p. 2; orig. p. 7 | Etapa 4 passo 1; sua vez; avaliação 6 | OK |
| R42 a qualquer momento, não no turno da compra | BR p. 4 | Etapa 4 passos 1 e 2 | OK |
| R43 Cavaleiro | BR p. 4 | Etapa 4 passo 3 | OK |
| R44 Maior Exército de Cavalaria | BR p. 4 | Etapa 5 passo 4; complete | OK |
| R45 Progresso | BR p. 2 e 4; orig. p. 10 | Etapa 4 passo 4; sua vez | OK |
| R46 Ponto de Vitória | BR p. 4; orig. p. 5 e 7 | Etapa 4 passo 5; etapa 5 | OK |
| R47 cartas de desenvolvimento não se trocam | orig. p. 7 | Etapa 3 passo 3; etapa 4 passo 6 | OK |
| R48 fontes de pontos | orig. p. 14 | Etapa 5 passo 1; consulta | OK |
| R49 Maior Estrada Comercial | BR p. 3 | Etapa 5 passos 2 e 3; avaliação 7 | OK |
| R50 estrada interrompida e empates | orig. p. 9 | Etapa 5 (segundo passo a passo, edição) | OK |
| R51 fim no próprio turno | BR p. 4 | 4 min; etapa 5 passo 5; avaliação 8 | OK |
| R52 10 fora da vez | orig. p. 5 | Etapa 5 passo 5; sua vez 2 | OK |
| R53 só aldeias dão 5 | orig. p. 6 | Etapa 5 (entender) | OK |
| R54 falta de cartas | orig. p. 4 e 10 | Situações especiais | OK |
| R55 número de cartas | orig. p. 8 | Situações especiais | OK |
| R56 montagem aleatória | orig. p. 12 e 13 | Situações especiais, passos 1 a 4 | OK, com o "vire as fichas" [interpretada] |
| R57 portos na caixa Devir | Plus p. 2; orig. p. 12 | Situações especiais, edição | [interpretada] |
| R58 fase de fundação | orig. p. 12 | Situações especiais, passos 5 a 9 | OK |
| R59 fase combinada | orig. p. 6 | Situações especiais | OK |
| R60 2, 5 e 6 jogadores | produto | Situações especiais | fora do escopo, dito no texto |

Nenhuma regra do tutorial ficou sem linha na base. Ficaram de fora, de propósito: a montagem com fichas totalmente aleatórias e as dicas de tática do Almanaque (estratégia, não regra).

## 3. Exemplos e contas

Todas as contas foram refeitas em `<scratchpad>/catan/contas.py` (saídas no dossiê, seção 7). Conferência de legalidade:

- **Etapa 2:** três construções (aldeia e cidade de Ana, aldeia de Bruno) na mesma montanha só são legais em pontas alternadas do hexágono; é possível pela regra da distância. A montanha de Bruno precisa ser costeira, e o texto diz que a aldeia dele é na costa.
- **Etapa 3, resolvido:** a troca interna acontece antes da construção, na ordem das fases (BR p. 2). Ana não usa porto.
- **Etapa 3, sua vez 2:** conferido que nenhuma troca 3:1 resolve sem desmontar a aldeia e a estrada.
- **Etapa 4:** Bruno fica com 5 cartas depois de devolver 4 de 9; o texto diz "uma das 5". Carla com 7 não descarta.
- **Etapa 5:** o resolvido foi reescrito durante a revisão: a primeira versão tinha Ana começando o turno já com 10 pontos e Bruno com 10 fora da vez, situação que exigiria que ambos tivessem ganho pontos fora do próprio turno. A versão final parte de 9 (8 visíveis) e chega a 10 com a quinta aldeia.
- **Avaliação 3:** a primeira versão (3 argilas) não fechava a conta: depois da troca 2:1 sobraria 1 argila para uma estrada e uma aldeia, que pedem 2. Corrigida para 4 argilas; o script confirma o custo exato.
- **4 minutos:** os exemplos usam as cartas iniciais que o próprio manual dá ao azul e ao laranja (BR p. 2). O "número que não toca aldeia" do azul e o "dado que não dá nada" do laranja não dependem da posição no tabuleiro.

## 4. Interpretações e lacunas

1. **[interpretada] Ligação da estrada (R29).** O folheto brasileiro descreve a estrada saindo de uma encruzilhada vizinha a uma estrada própria e livre de construção alheia; o original diz que ela se liga a estrada, aldeia ou cidade própria. O tutorial junta as duas leituras. Risco baixo: a leitura estrita do folheto impediria até a estrada encostada na aldeia na fase de fundação, que o original descreve.
2. **[interpretada] Portos na montagem aleatória (R57).** Inferido da lista de componentes da Devir (portos impressos na moldura) e da nota do original sobre embaralhar a ordem da moldura. Não conferido numa caixa da 6ª edição.
3. **[interpretada] Virar as fichas (R56).** O original não diz quando virar; o manual do 5-6 jogadores da Devir diz para virar todas ao fim. Óbvio na mesa, mas não está no texto do jogo base.
4. **[lacuna] Nomes da 6ª edição.** Os nomes vêm do folheto de 2015. A 6ª edição brasileira pode ter nomes diferentes nas cartas (por exemplo, nas cartas especiais). O tutorial avisa.
5. **[lacuna] Almanaque em português.** As regras que só existem no Almanaque foram traduzidas do original por mim; termos como "fase de fundação" vêm de outro documento da Devir (variante para 2), e "montagem aleatória" vem do verbete citado no folheto.

## 5. Evidência dos componentes do plano instrucional

- **Tarefas com apoio decrescente:** em cada etapa, resolvido, complete e sua vez. Exemplo da etapa 3: o resolvido mostra Ana comparando troca interna e 4:1; o complete dá a Bruno a conta pronta e pede só a troca; o sua vez entrega a mão de Carla e duas perguntas sem pista.
- **Informação de apoio antes da tarefa:** os blocos "Para entender", como o da etapa 2 ("Os lançamentos dos outros também enchem a sua mão"), vêm antes do passo a passo.
- **Informação procedimental no ponto de uso:** cada etapa tem seu passo a passo com página; a folha de consulta repete custos, 7, cartas e fim.
- **Prática específica:** só onde o erro é comum: frequência de números (etapa 2), pode ou não pode na construção e na troca (etapa 3), sim ou não nas cartas (etapa 4), soma de pontos (etapa 5).

## 6. Pontos fracos que restam

- **Sem auditoria independente nem teste de execução nesta entrega.** O briefing proíbe subagentes; a revisão de outro agente é o próximo passo, e ele deve receber o tutorial e os textos extraídos dos dois manuais.
- **A montagem para principiantes depende do desenho do manual.** O tutorial manda seguir a ilustração da p. 1, que o leitor tem na caixa, mas não descreve a posição de cada terreno e ficha. Quem não tiver o manual em mãos não consegue montar a ilha fixa só com o guia; resta a montagem aleatória, que está em situações especiais.
- **Dependência do manual em inglês.** Um quarto das regras da base (15 de 60) vem só do original. O texto marca cada uma, mas não há confirmação de que o Almanaque brasileiro diga o mesmo.
- **Português de Portugal no glossário.** "Aldeia", "lavoura", "matéria-prima" e "reserva" são os nomes do folheto, que podem não ser os da caixa atual.
- **Extensão no limite.** Cerca de 5.200 palavras de texto corrido; as tarefas de cada etapa ocupam boa parte. Se o editor quiser encurtar, os candidatos são o "Na caixa" da etapa 1 e o segundo parágrafo do "Para entender" da etapa 3.
- **Legibilidade não medida.** O script de Flesch citado no prompt não está neste repositório.

## 7. Teste com leitores (proposta)

Mesmo protocolo do prompt: de 5 a 8 adultos que nunca jogaram Catan. Tarefas observáveis: montar a ilha para principiantes com 3 e com 4 jogadores; jogar uma rodada completa; resolver um 7 com um jogador acima de 7 cartas; pontuar a situação "4 aldeias, 1 cidade, Maior Estrada Comercial, 1 carta de Ponto de Vitória". Lista de verificação a partir das regras R6 a R46. Medidas: tarefas sem ajuda, erros de regra, tempo até a primeira rodada independente, retenção em 7 dias com as mesmas situações, escala de esforço mental de 9 pontos e uma pergunta aberta. Nenhum resultado foi observado até aqui.

## 8. Ligação com a resenha

Não há resenha de Catan no site. Se uma for escrita, o "Comece a jogar em 4 minutos" pode virar o bloco de regras dela, com link para o tutorial completo (proposta; nada implementado).

## Auditoria independente

Feita em 31/10/2026 por um agente que não escreveu o tutorial, sem acesso aos arquivos de trabalho do redator.

### O que foi conferido

- **Manuais baixados de novo**, dos mesmos links do dossiê, para o scratchpad do auditor (fora do repositório): folheto Devir `693602_Cat_Basis34_Manual_PT02.pdf` (4.045.086 bytes, mesmo tamanho do dossiê), manual do *Catan Plus* (`693152_CAT_BigBox19_Manual_PT03.pdf`) e *Catan Game Rules & Almanac* em inglês (`catan_base_rules_2020_200707.pdf`, 16 páginas). Texto extraído com `pdftotext` (com e sem `-layout`), página a página. Paginação do folheto confirmada: os números impressos 2, 3 e 4 estão nas páginas 1, 2 e 3 do arquivo, e a página 4 do arquivo é a "página 1" (resumo e montagem para principiantes). A paginação do original coincide com a do arquivo.
- **Página do produto da Devir** (6ª edição) baixada de novo: "Idade: 10 anos", "Duração: 75 min. aprox.", "Jogadores: 3 a 4" e "as mudanças são apenas visuais e de organização" conferem com o JSON e com o bloco "Sobre a edição".
- **Cada afirmação normativa** do tutorial (4 minutos, etapas 1 a 5, situações especiais, avaliação e folha de consulta) contra a página citada. As citações de página do folheto e do original estão corretas.
- **Regras tiradas do original em inglês**: todas as marcadas "manual original" conferem com o texto em inglês (p. 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 e 14). O cabeçalho do tutorial avisa que o que o folheto manda procurar no Almanaque vem do original e está marcado assim; a marcação é consistente. Nenhuma delas contradiz o folheto. Os dois pontos de atrito com o folheto foram examinados: (1) ligação da estrada (folheto só fala em estrada própria; o original inclui aldeia e cidade), um acréscimo, não uma contradição, e indispensável na fase de fundação; (2) roubo no 7 (o folheto diz "pode roubar", o original "you steal"): o tutorial segue o folheto.
- **Contas**: refeitas num script Python próprio (frequências dos dois dados; mãos dos exemplos de 4 minutos; peças restantes; produção das etapas 2; trocas e construções da etapa 3, incluindo busca exaustiva de trocas 3:1 para a "sua vez 2" de Carla; descartes 8, 9, 7, 11, 12 e 10; Monopólio; todas as somas de pontos da etapa 5; avaliação 3). Todas batem com o texto.
- **Legalidade dos exemplos**: as três construções na montanha com 8 (etapa 2) só cabem em pontas alternadas do hexágono, o que a regra da distância permite; o corte da estrada de Ana (7 peças em 3 + 4) e a passagem da carta a Bruno seguem o exemplo da p. 9 do original; Diana com 4 cidades está no limite de peças; o "5 aldeias e 2 cidades" do treino é possível porque a aldeia ampliada volta ao jogador.
- **JSON** (`conteudo/como-jogar/catan.json`): jogadores, duração, idade, edição (no mesmo formato dos outros tutoriais) e os três pontos do resumo conferem com o folheto (p. 2, 3 e 4).
- **Regras essenciais ausentes**: nenhuma encontrada. Conferidos em especial: ordem descarte antes do ladrão, Cavaleiro sem descarte (o folheto remete só aos "pontos 1 e 2", mover e roubar, p. 4), carta de desenvolvimento antes dos dados, monte vazio, porto especial que não dá 3:1, limite de peças.

### Problemas achados e corrigidos

1. **Bloco [!edicao] da estrada interrompida (etapa 5)**: dizia que "estrada interrompida e empate não estão no folheto". Falso em parte: o folheto diz que a estrada interrompida por aldeia ou cidade de outro jogador não conta como contínua e ilustra o corte (p. 3). O que falta no folheto é o destino da carta depois do corte e o empate. O bloco foi reescrito; também saiu "da mesma edição de 2015", trocado por "cujas regras valem desde 2015" (original, p. 14: edição em inglês de 2020, regras em vigor desde 01/01/2015).
2. **Passo 2 da estrada interrompida**: "segue empatado com a maior estrada" não cobria o dono que, depois do corte, continua com a maior estrada sozinho. Reescrito como "ainda tem a maior estrada, mesmo empatado com outro jogador" (original, p. 9).
3. **Passo 3 da montagem aleatória**: dizia para pôr as fichas nos terrenos "com a letra para cima" e "depois vire as fichas". O original (p. 13) manda separar as fichas ao lado do tabuleiro com a letra para cima e não diz quando virá-las. O passo segue agora o original, e o bloco [!edicao] seguinte diz que o manual não esclarece esse momento.
4. **Transparência da fonte**: no passo 3 do "Seu primeiro turno", a ligação da estrada a "estrada ou construção sua" vem do original e estava sem marca; ganhou "(manual original, p. 4)".

Portões depois das correções: `tools/checar_comece.py` ✅; travessões 0; `vicios.avisos` sem aviso.

### Em aberto

- A montagem para principiantes depende do desenho da p. 1 do folheto (o tutorial não descreve terreno por terreno). O leitor tem o desenho na caixa, mas o guia não é autossuficiente nesse ponto.
- Os nomes e o texto da 6ª edição brasileira não foram conferidos (manual não publicado). O tutorial avisa.
- "Construa estrada ao longo da costa" (original, p. 6 e 11) não está no texto; não é essencial, mas um iniciante pode perguntar.
- A seção "1. Como este guia ensina" descreve a estrutura do guia; existe igual nos outros tutoriais do site, por isso não foi mexida.

### Teste de execução (só com o tutorial)

- **2 jogadores**: não dá para preparar. O tutorial diz claramente que o jogo base é para 3 ou 4 e só aponta para a variante oficial da Devir. Coerente com a caixa, mas quem busca "como jogar catan de 2" (segunda sugestão do autocompletar) não sai jogando.
- **4 jogadores (máximo)**: preparação feita sem adivinhar, exceto a posição das peças, que exige o desenho do manual. Cartas iniciais (aldeia com letra), reserva, monte, cartas especiais e quem começa: claros.
- **Rodada completa**: rolar, produzir para todos, trocar (só com o jogador da vez, 4:1 ou porto), construir com a tabela e passar à esquerda: sem dúvida. No 7, a ordem descarte, ladrão, roubo e comércio está clara. Pontos onde precisei pensar: se a estrada pode correr pela costa (não dito) e, na montagem aleatória, quando virar as fichas (agora dito que o manual não esclarece).
- **Avaliação final**, respondida antes de ler as respostas: 1) 2 argilas; 2) nada; 3) sim, 2 argilas por 1 madeira; 4) não; 5) devolvo 5; 6) não; 7) eu; 8) não. As 8 conferem com o gabarito.

## Seção de montagem (04/11/2026)

Pedido do editor: seção `## setup. Montar a mesa passo a passo` antes do "Comece", toda à vista, na ordem da preparação do folheto (p. 2), com o desenho da p. 1.

- **Manual baixado de novo em 04/11/2026**, com user-agent de robô e robots.txt respeitado (catanbrasil.com.br só bloqueia /cgi-bin/ e /wusage; catan.com não bloqueia /sites/default/files/): `693602_Cat_Basis34_Manual_PT02.pdf` (HTTP 200, 4.045.086 bytes, o mesmo tamanho registrado no dossiê); `693152_CAT_BigBox19_Manual_PT03.pdf` (Catan Plus, 6.837.491 bytes); `catan_base_rules_2020_200707.pdf` (original, 3.661.594 bytes). Texto extraído com `pdftotext -layout` e páginas renderizadas com `pdftoppm` (150, 300 e 600 dpi) em `<scratchpad>/setup/catan/` (`txt/devir.txt`, `txt/plus.txt`, `txt/orig.txt`). Todas as frases do passo a passo conferidas com esse texto e com as imagens das páginas.
- **Passo → página.** Componentes e quantidades: manual do Catan Plus, p. 2 e 3 (19 terrenos 4/4/4/3/3/1; 6 peças da moldura com 9 portos; 18 fichas, uma de 2 e de 12, duas dos outros; 95 cartas de matéria-prima, 19 de cada; 25 de desenvolvimento, 14/6/5; 4 tabelas; 2 cartas especiais; 16 cidades, 20 aldeias, 60 estradas; ladrão; 2 suportes; 2 dados). Principiantes: 1 moldura (p. 2); 2 terrenos (p. 2, desenho da p. 1); 3 fichas, deserto sem ficha (p. 2, desenho da p. 1); 4 portos impressos (p. 2; Plus p. 2); 5 ladrão no deserto (desenho da p. 1; original p. 12); 6 cor e tabela (p. 2); 7 peças 5/4/15 (p. 2); 8 duas aldeias e duas estradas (p. 2); 9 restantes à frente, 3/4/13 (p. 2, conta); 10 sem vermelho com 3 (p. 2); 11 cartas especiais e dados (p. 2); 12 e 13 reserva nos suportes, virada para cima (p. 2; "reserva", p. 3); 14 e 15 monte de desenvolvimento virado para baixo no compartimento livre (p. 2); 16 cartas iniciais da aldeia com letra, exemplos do azul e do laranja (p. 2); 17 cartas escondidas (p. 2); 18 mais velho começa, vez à esquerda (p. 2). Aleatória e fase de fundação: moldura em ordem embaralhada (original p. 12); terrenos virados, embaralhados, postos ao acaso (p. 12); fichas com a letra para cima e espiral anti-horária pulando o deserto (p. 13); ladrão no deserto, peças e cartas (p. 12); dados para o primeiro jogador; primeira rodada horária; segunda rodada anti-horária com o primeiro por último; segunda aldeia sem ligação com a primeira; cartas da segunda aldeia; o primeiro jogador rola (todos p. 12). Tabela por número de jogadores: p. 2 e Plus p. 3; "24 peças" e "sobra 1 das 4 tabelas" são contas do guia. Tudo [verificada], salvo as contas.
- **Figura → página** (recortes só da parte gráfica, sem bloco de texto; tamanho perto de 1,5 vez a resolução nativa das imagens embutidas, cerca de 180 a 230 ppi segundo `pdfimages -list`, para não borrar com ampliação): `setup-moldura` 777 x 269 (Plus p. 2); `setup-terrenos` 1000 x 304 (Plus p. 2); `setup-fichas` 973 x 101 (Plus p. 2, sem a linha das quantidades); `setup-porto` 386 x 216 (folheto p. 1, sem a etiqueta "Porto"); `setup-ladrao` 260 x 266 (Plus p. 3, sem a legenda); `setup-pecas` 762 x 202 (Plus p. 3, sem as legendas); `setup-especiais` 670 x 203 (folheto p. 2); `setup-suportes` 756 x 187 (folheto p. 2); `setup-desenvolvimento` 940 x 146 (folheto p. 2); `setup-aldeia-b` 324 x 378 (folheto p. 1, sem a etiqueta "Caminho"); `setup-aleatoria` 570 x 488 (original p. 12, ilustração O); `setup-espiral` 550 x 488 (original p. 13, ilustração Q); `setup-rodada1` 350 x 362 (original p. 12, "Round One"). Reaproveitadas: `preparacao.webp` (folheto p. 1) no passo 8 e `distancia.webp` (folheto p. 3) no passo 10 da fase de fundação. Foto oficial `fotos/mesa-1.webp` uma vez, com o crédito de `fotos/fontes.json` ("Imagem: Catan GmbH · edição internacional de 2025"); a legenda avisa que a arte é diferente da do folheto.
- **Sem ilustração no manual (ficaram sem imagem, nada inventado):** passo 6, a tabela de custos (o único desenho dela, no Catan Plus, p. 3, mostra a tabela em espanhol, "Tabla de costes", e é quase só texto; não foi usado); passo 9 (peças à frente do dono); passo 10 (tirar o vermelho); passos 12 e 14 (separar e embaralhar, ações sem desenho próprio); passo 17 (cartas na mão); passo 18 (quem começa). Na aleatória: passo 1 (a ilustração P do original mostra portos avulsos da caixa americana, que a caixa da Devir não tem), passos 2 e 4, 6 a 8, 11 e 12.
- **Mudanças fora da seção.** "### Monte a mesa" do "Comece" virou resumo de 5 itens que remete à seção nova. Em "7. Situações especiais", o passo a passo da montagem aleatória e o bloco [!edicao] dos portos saíram de lá e foram para a seção de montagem (texto igual, sem mudança de regra), ficando no lugar uma remissão; assim o guia não traz a mesma lista duas vezes. A etapa 1 continua com o seu passo a passo didático.
- **Pergunta da conferência:** ordem da segunda aldeia na fase de fundação com 4 jogadores (original p. 12); as erradas repetem a ordem da primeira rodada ou giram no sentido errado.
- **Portões:** `checar_comece.py` ✅; `vicios.avisos` sem aviso; travessão e meia-risca no tutorial: 0. O conversor (`como_jogar_md.pagina`, em memória) monta a seção com 16 imagens, todas existentes, sem marcador cru. `"publicar"` não foi alterado; nenhum HTML gerado foi tocado.

## Auditoria independente da montagem (04/11/2026)

Resultado: aprovado com correções, sem erro de regra. Cada correção foi conferida no texto dos manuais baixados de novo (`<scratchpad>/setup/catan/txt/`). Aplicado:

1. Passo 7 da aleatória: remete aos passos 6, 7 e 10 a 15 e diz que todas as peças ficam à frente de cada jogador (original, p. 12).
2. Passo 5 da aleatória: "no fim, vire todas as fichas para o número aparecer" (manual do Catan Plus, p. 7, expansão para 5 e 6: "Finalmente, vire todas as fichas numeradas de modo a que os números fiquem à vista"). O bloco [!edicao] deixou de dizer que o momento não está definido e agora diz que as fichas têm letra no verso e são viradas no fim (Plus, p. 7).
3. Ladrão no deserto: citação trocada para o original, p. 7 ("A robber starts the game there"); na aleatória, p. 7 e 12.
4. Recortes refeitos: `setup-especiais.webp` 670 x 231 (folheto p. 2, agora com a base das cartas); `setup-porto.webp` 500 x 303 (folheto p. 1, sem os fragmentos do alto; o "2:1" fica tão legível quanto a imagem embutida, de cerca de 180 ppi, permite).
5. Resumo do "Comece", item 1: voltou "o deserto sem ficha e com o ladrão".
6. Foto `mesa-1.webp`: legenda diz que é partida em andamento (há cidades e o ladrão já saiu do deserto), não a montagem inicial; foi para depois da tabela de 3 e 4 jogadores.
7. Passo 1: "encaixando as pontas de mesmo número" (original, p. 2: "matching the numbers at the ends of the frame pieces together").
8. Passo 8: "com 3 jogadores, pule o vermelho" (p. 2).
9. Passo 9 da aleatória define a regra da distância (folheto p. 3; original p. 12); a legenda de `distancia.webp` diz que na fase de fundação a aldeia não precisa de estrada chegando nela (original, p. 12: a aldeia vai em qualquer encruzilhada livre e a estrada é posta depois, encostada nela).
10. Legendas de `setup-aleatoria` e `setup-espiral`: moldura da caixa americana; na da Devir, os portos vêm impressos.
11. `setup-aldeia-b.webp` alargado (491 x 372, folheto p. 1): mostra a floresta do 8, a montanha do 3 e a colina do 5 em volta da aldeia B. Fica visível o contorno branco do "Caminho" (sem o texto da etiqueta).
12. Ordem livre da moldura na aleatória: está no manual (original, p. 12: "just shuffle the order of the frame pieces"; o Catan Plus, p. 7, diz o mesmo na expansão: "peças de moldura grandes do jogo básico em qualquer ordem"). O passo 1 continua citando o original, p. 12.

Portões: `checar_comece.py` ✅; `vicios.avisos` sem aviso; travessão e meia-risca no tutorial: 0; a seção monta com 16 imagens, sem marcador cru.
