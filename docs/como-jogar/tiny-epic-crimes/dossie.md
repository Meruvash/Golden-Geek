# Dossiê: Como Jogar Tiny Epic Crimes

Entrega 1 da linha COMO JOGAR para *Tiny Epic Crimes*. Produzido em 01/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; alvo de 3.500 a 6.000 palavras; exercícios de múltipla escolha; essencial à vista e `[!mais]`; figuras do manual e vídeo).

## 1. Jogo e procura real

- **Jogo:** escolhido pelo editor. Edição brasileira da Asmodee (marca Galápagos no manual), SKU TNE101. Não há resenha no site (nenhuma pasta `tiny-epic-crimes/` nem `conteudo/tiny-epic-crimes.json`), por isso `"resenha": null`.
- **Procura (01/11/2026):** o autocompletar do Google (`client=firefox&hl=pt-BR`) não devolveu sugestões para "como jogar tiny epic crimes"; o do YouTube (`client=youtube&ds=yt`) devolveu a própria frase. Procura modesta, registrada só como dado.
- **Complexidade:** turno guiado por tempo (não há rodadas), seis ações com restrição de dia e noite, duas ações com risco, cinco evidências que se decifram em conjunto, Eventos com penalidade e acusação com desempate em quatro níveis. Mais regras que Azul, menos que Clank!. Quatro etapas.

## 2. Fontes

| Fonte | Arquivo | URL | Data |
|---|---|---|---|
| **Livro de regras da edição brasileira** (Asmodee; créditos "Galápagos": gestão de produto Matheus Passeri, tradução Fernanda Rocha, revisão Gabriel Novaes e Luis Perdomo, diagramação Felipe Godinho e Tati Hapanchuk; "v1.0"; ©2023 Gamelyn Games). 20 páginas, PDF de 305 MB (Adobe InDesign 19, criado em 07/11/2023, modificado em 13/11/2023) | `scratchpad/tinyepic/tiny-epic-crimes.pdf` (fora do repositório); texto extraído com `pdftotext` em `scratchpad/tec/raw.txt` e por página em `scratchpad/tec/p<N>.txt`; páginas renderizadas em PNG para ler o texto sobre ilustrações | Biblioteca de downloads da Asmodee Brasil, https://www.asmodee.com.br/download-library ; arquivo https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2609&tagId=2&group=b2 | baixado pelo agente coordenador; lido em 01/11/2026 |
| **Página do produto TNE101** (API pública da loja Asmodee Brasil, `/ccstore/v1/products/TNE101`) | consulta em JSON | https://www.asmodee.com.br/tiny-epic-crimes/produto/TNE101 | 01/11/2026 |
| **Vídeo** "TINY EPIC CRIMES - Gameplay resumida", canal Duque Board Games (título e canal pelo oEmbed oficial) | não baixado | https://www.youtube.com/watch?v=BEcs4ub4O3U | 01/11/2026 |

**Dados do topo da página.** A API do produto registra `x_numeroDeParticipantes: 1`, `x_numeroMaximoDeParticipantes: 4`, `x_tempoDePartida: 30-60 min`, `x_faixaEtaria: +14`, `x_game_mode_type: Competitivo` e a lista de componentes (igual à da p. 3 do manual). O JSON usa 1 a 4 jogadores (o Modo Solo existe, p. 19), 30 a 60 min e 14+. Não vi a caixa física nem o verso dela.

**Não obtido / não usado:** manual original em inglês (Gamelyn Games) e FAQ ou errata oficial. O manual brasileiro foi suficiente para todas as regras do tutorial; as dúvidas que o inglês poderia resolver estão na seção 5. Nada foi tirado de vídeo, fórum ou resenha. O vídeo do Duque foi escolhido pela busca do próprio canal (`/@DuqueBoardgames/search?query=tiny epic crimes`), que também mostrou um "Unboxing rápido" da caixa com a expansão; o de partida resumida foi o escolhido.

**Leitura do texto.** O `pdftotext` embaralha o texto nas páginas com ilustração (p. 3, 5, 6, 7). Essas páginas, e todas as de regra (p. 4 a 20), foram lidas também como imagem (160 a 400 dpi). A paginação citada é a impressa no rodapé, igual à do PDF (capa = p. 1).

## 3. Glossário (edição brasileira)

Nome como impresso, página e função. O tutorial usa só estes nomes.

| Termo | Página | Função |
|---|---|---|
| Carta de Delegacia / Delegacia | 3, 5 | Quarteirão do centro; onde começam os carros e ficam as Fichas de Custódia |
| Cartas de Quarteirão / quarteirão / cidade | 3, 5 | Grade 5 x 5 |
| Fichas de Dado (Dados Brancos no topo, Dados Pretos à esquerda) | 5 | Numeram colunas e linhas para a Rolagem de Mafioso |
| Dados-Projéteis | 3, 5 | Os 2 dados (um preto, um branco, pela ilustração da p. 16) |
| Fichas de Pista: Informante, Testemunha, Investigação, Tocaia, Custódia | 3, 10, 20 | Coletadas pelas ações; decifram as evidências. A Referência Rápida (p. 20) chama a de Investigação de "Cena"; o guia usa "Ficha de Investigação", como as p. 5 e 12 |
| Fichas de Evidência / Envelopes de Evidência / Evidência Decifrada | 3, 9, 10 | Marcam quem decifrou; o envelope deixa ver um traço sem mostrar a carta |
| Evidências: Gangue, Cargo, Perícia, Fuga, Arma | 9, 20 | Traços do assassino; possibilidades: Rinocerontes Rubros ou Abelhas Azuis; Chefe ou Subchefe; Impressões digitais ou Pegadas; Carro ou Moto; Pistola ou Faca |
| Cartas de Suspeito / baralho de suspeitos / álibi | 3, 8 | 16 cartas, letras A a P (p. 6) |
| Envelope de Assassino / Carta do Assassino / assassino | 6, 8, 17 | Guarda o suspeito culpado |
| Lupa | 3, 8 | Lê o nome no centro da Carta de Suspeito |
| Tabuleiro de Agente (lados Padrão e Cooperativo) | 5, 18 | Ações, trilha de Nível de Distintivo, 3 espaços de presos, Espaço de Custódia |
| Ajuda ao Jogador | 5, 17 | Resumo de ações; o verso tem os suspeitos para a acusação |
| Tabuleiros de Tempo / Trilha de Tempo / Indicador de Tempo / horas | 5, 8 | Ordem dos turnos e custo de tudo |
| Linha de Evento (vermelha) / Espaço de Evento | 15 | Quem cruza primeiro compra Evento; 3 espaços sob a trilha |
| Carro / Distintivo / Nível de Distintivo / patente | 5, 10, 17 | Peão; marcador da trilha de distintivo. O manual usa "patente" (p. 4, 10) e "Nível de Distintivo" (p. 10, 17) para a mesma coisa; o guia usa "Nível de Distintivo" |
| mafiosos: Abelha Azul, Rinoceronte Rubro, Gângster Cinza | 3, 11 | 5 de cada cor; "Bolsa" |
| Cartas de Habilidade / Habilidades de Agente | 5, 15 | Uma por jogador |
| Cartas de Corporação | 5, 15 | Efeitos fortes; limite 2 |
| Cartas de Evento / Fichas de Evento / Evento Cronometrado / Penalidade por Excesso de Eventos / Recompensas Limitadas | 14 a 16 | Eventos |
| Rolagem de Mafioso / Atenuação / Onda de Crimes | 16 | Etapa 4 do turno |
| Dirigir, Realizar 1 Ação, Comprar um Evento, Rolagem de Mafioso | 8 | As 4 etapas do turno |
| Prender, Pausa para o Café, Chamar Reforços, Pegar Informante, Pegar Testemunha, Investigar Cena, Ficar de Tocaia, Levar sob Custódia, Encerrar Seu Caso, Interrogar (ação bônus), Resolver Evento | 11 a 14 | Ações |
| deter | 11 | Tirar mafioso da cidade por qualquer ação |
| arriscar | 12, 13 | Declarar horas antes de rolar ou olhar |
| Modo Padrão, Modo Cooperativo, Modo Solo; Delegado, Detetive, Analista, Patrulheira; Marcador de Tempo Esgotado; Trabalho de Campo | 4, 18, 19 | Modos |

**Nota de vocabulário.** O manual chama as fases do turno de "Etapa 1" a "Etapa 4". O tutorial também tem "Etapa 1" a "Etapa 4" (as partes do guia, exigidas pelo formato). Para não confundir, o tutorial nunca escreve "Etapa N" para os passos do turno: chama-os pelo nome (Dirigir, Realizar 1 Ação, Comprar um Evento, Rolagem de Mafioso).

## 4. Base de regras

Classificação: V = verificada (lida nesta sessão), I = interpretada (motivo dado), L = lacuna.

### 4.1 Objetivo e fim

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R1 | Agentes da lei desvendam o assassinato; vence quem identificar o assassino e tiver a patente mais alta; um palpite por jogador; se ninguém acertar, todos perdem | BR p. 4 "só pode haver um vencedor" | V |
| R2 | Encerrar Seu Caso: ao terminar o turno com o indicador num espaço vermelho (43 a 48), pode deitar o carro; não joga mais turnos, mas troca informação e recebe recompensas de Eventos para os quais contribuiu | BR p. 14 | V; a natureza de "ação" é I (seção 5) |
| R3 | O indicador não passa de 48; se a ação o levaria além, escolha outra | BR p. 14 "Observação" | V |
| R4 | Acusação quando todos deitaram o carro: Ajuda ao Jogador no lado dos suspeitos, carro tirado da cidade e posto sobre o suspeito, escondido com a mão; revelação simultânea; carta do assassino revelada com a Lupa | BR p. 17 | V |
| R5 | Desempate entre quem acertou: Nível de Distintivo; mais tempo restante (menos horas); mais Fichas de Evidência; vitória compartilhada | BR p. 17 | V |

### 4.2 Preparação (p. 5 a 7)

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R6 | Delegacia no centro; 24 quarteirões ao acaso, virados para cima, 5 x 5 | p. 5, passos 1 e 2 | V |
| R7 | 10 Fichas de Dado em ordem numérica: 5 brancas no topo, 5 pretas à esquerda | p. 5, passo 3 | V |
| R8 | 5 Informantes ao lado das pretas; 5 Testemunhas ao lado das brancas | p. 5, passos 4 e 5 | V |
| R9 | 7 Investigações e 5 Tocaias viradas para baixo nos quarteirões com o marcador correspondente | p. 5, passos 6 e 7 | V |
| R10 | 3 Fichas de Custódia nos 3 marcadores da Delegacia | p. 5, passo 8 | V |
| R11 | 2 Tabuleiros de Tempo lado a lado, lado Padrão | p. 5, passo 9 | V |
| R12 | Fichas de Evidência, Dados-Projéteis, Envelopes de Evidência, Lupa e Fichas de Evento ao alcance | p. 5 e 6, passos 10, 11, 17, 18 | V |
| R13 | Mafiosos na Bolsa; 3 tirados um a um, quarteirão pela Rolagem de Mafioso; 6, 3-3 ou quarteirão ocupado: rerrole | p. 5, passo 12 | V |
| R14 | Cada jogador: Tabuleiro de Agente (Padrão), Ajuda, Indicador, Carro, Distintivo; carro na Delegacia; distintivo com o lado 10+ para baixo no desenho grande | p. 5, passo 13 | V |
| R15 | Indicadores empilhados ao lado da trilha por idade, o mais jovem no topo | p. 5, passo 13B | V |
| R16 | 2 Cartas de Habilidade, fica com 1 virada para cima | p. 5, passo 14 | V |
| R17 | Corporação: baralho virado para baixo, 1 para cada um, olhar sem mostrar | p. 5, passo 15 | V |
| R18 | 1 Carta de Suspeito no Envelope de Assassino sem revelar, seta visível na fenda; ninguém tira a carta sem instrução | p. 6, passo 16A | V |
| R19 | 1 Evento virado no espaço "1", lido em voz alta e preparado | p. 6, passo 19 | V |
| R20 | Anotações permitidas em segredo, sem obrigação de mostrar | p. 6 | V |

### 4.3 Tempo e turno

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R21 | Joga o indicador mais atrás; vários no mesmo espaço: o do topo | p. 8 e 16 | V |
| R22 | Turno: Dirigir (opcional), Realizar 1 Ação (obrigatória), Comprar um Evento (condicional), Rolagem de Mafioso (obrigatória) | p. 8 | V |
| R23 | Avanço = horas da direção + horas da ação, depois da ação; espaço ocupado: o seu no topo | p. 8 e 11 | V |
| R24 | Dirigir: quarteirões adjacentes, ortogonal, 1 hora por quarteirão; parado custa 0 | p. 11 | V |
| R25 | Hora do Dia: ação diurna exige indicador em espaço diurno no início do turno; idem noturna; Dirigir, Prender e Pausa a qualquer hora | p. 15 | V |
| R26 | Diurnas: Pegar Informante, Investigar Cena, Chamar Reforços; noturnas: Pegar Testemunha, Ficar de Tocaia, Levar sob Custódia | p. 11 a 13 (títulos) e Tabuleiro de Agente (ilustração p. 7) | V |
| R27 | Primeiro turno: o indicador ainda está fora da trilha; o manual não diz se é dia ou noite | sem página | L; o guia trata como dia (seção 5) |

### 4.4 Ações gerais

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R28 | Prender: 1 hora, mafioso do seu quarteirão para o espaço da cor no tabuleiro; cor repetida volta para a Bolsa; com 3 cores, +1 Nível de Distintivo e os 3 para a Bolsa | p. 11 | V |
| R29 | "Deter" = tirar mafiosos por qualquer ação; detido vai para a Bolsa salvo instrução diferente | p. 11, Observação | V |
| R30 | Pausa para o Café: 1 hora, nada | p. 11 | V |
| R31 | Chamar Reforços (dia): com mafiosos no seu quarteirão e/ou adjacentes, declarar 1 a 6, rolar um dado; menor ou igual: detém todos do seu e adjacentes, para a Bolsa, + Carta de Corporação; maior: detém só o do seu quarteirão; avança as horas arriscadas em ambos os casos | p. 12 | V; "adjacentes" sem diagonal é I |

### 4.5 Rolagem de Mafioso

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R32 | Dois dados; preto e branco dão coluna-linha pelas Fichas de Dado; vazio: novo mafioso; ocupado: compre Evento (com 3 ativos, penalidade) | p. 16 | V; qual dado é coluna é I (seção 5) |
| R33 | Atenuação: 6 ou 3-3 (Delegacia), nada | p. 16 | V |
| R34 | Onda de Crimes: duplos 1, 2, 4, 5 aplicam e rolam de novo; 3s e 6s não; várias possíveis | p. 16 | V |
| R35 | Um mafioso não detido por quarteirão, sem exceção por carta | p. 16 | V |
| R36 | Sem mafioso na Bolsa quando preciso: Penalidade por Excesso de Eventos | p. 16 | V |

### 4.6 Pistas e evidências

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R37 | 5 tipos de evidência, 2 possibilidades cada | p. 9 | V |
| R38 | Pegar Informante (dia, 2 h): mafioso no seu quarteirão e Informante na sua linha; mafioso para a Bolsa, ficha no tabuleiro, +1 Distintivo | p. 12 | V |
| R39 | Pegar Testemunha (noite, 2 h): idem com Testemunha na sua coluna | p. 12 | V |
| R40 | Investigar Cena (dia, 2 h): virar a ficha do seu quarteirão; sucesso ou falha vai para o tabuleiro; +1 Distintivo em ambos | p. 12 | V |
| R41 | 3 Investigações com sucesso resolvem a Perícia; descartar as restantes | p. 12 | V |
| R42 | Ficar de Tocaia (noite): declarar 1 a 5, olhar em segredo; menor ou igual: sucesso, mostrar, tabuleiro, +1; maior: devolver virada sem dizer o número, sem avanço | p. 13 | V |
| R43 | Horas gastas na Tocaia com falha = horas arriscadas | p. 11 (regra geral do custo) e p. 13 (exemplo) | I (seção 5) |
| R44 | 3 Tocaias resolvem a Fuga; descartar as restantes | p. 13 | V |
| R45 | Levar sob Custódia (noite, 2 turnos): 2 h, mafioso no Espaço de Custódia (máx. 1); em turno noturno posterior, na Delegacia, 2 h, mafioso para a Bolsa, Ficha de Custódia da cor, +1; se amanhecer, espera a noite | p. 13 | V |
| R46 | Custódia de cor já pega: Carta de Corporação, sem avanço; 3 Custódias resolvem a Arma; depois, a ação dá Corporação (custo total 4 h) | p. 13 | V |
| R47 | Informante x5 decifra Cargo; Testemunha x5, Gangue | p. 9, 20 | V |
| R48 | Quem coleta a última ficha pega a Ficha de Evidência e consulta pelo Envelope de Evidência; devolve a carta ao Envelope de Assassino | p. 9 | V |
| R49 | Todos com pelo menos uma Ficha de Pista daquele tipo ganham 1 Carta de Suspeito, só uma | p. 10 | V |
| R50 | Só o detentor da Ficha de Evidência analisa quando quiser; outros por recompensa de Evento: troca obrigatória (ele olha uma Carta de Suspeito sua ao acaso); você precisa ter uma; você escolhe o envelope se houver vários | p. 10 | V |

### 4.7 Suspeitos e distintivo

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R51 | Ganhar suspeito: carta do topo; sem baralho, olhar uma carta escolhida de outro jogador | p. 8 | V; leitura "só sem baralho" é I |
| R52 | Ler com a Lupa, sem dizer o nome; cartas viradas para baixo; consultar a qualquer momento | p. 8 | V |
| R53 | +1 Nível de Distintivo ao coletar qualquer Ficha de Pista ou por recompensa de Evento; espaço com ícone dá bônus na hora (Carta de Suspeito ou Interrogar); passou de 9, lado 10+ | p. 10 | V; posição exata dos ícones não está no texto (L, o guia não a cita) |
| R54 | Interrogar: outro jogador segura as cartas; você pega uma ao acaso e devolve; carta já vista não dá direito a outra | p. 14 | V |

### 4.8 Eventos e Corporação

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R55 | Comprar um Evento: se você for o primeiro a passar por uma Linha de Evento; espaço livre: revelar, ler, pôr no menor espaço livre, preparar | p. 15 | V |
| R56 | Rolagens de preparação de Evento: rerrolar 6, quarteirão ocupado e Delegacia (salvo instrução); sem Evento extra; duplos não dão mafioso extra | p. 15 | V |
| R57 | Sem espaço livre: Penalidade por Excesso de Eventos | p. 15 | V |
| R58 | Evento Cronometrado revelado com indicador nas horas 39 a 48: descartar e comprar outro | p. 15 | V |
| R59 | Penalidade: descartar a Carta de Suspeito do topo sem revelar; sem baralho, todos avançam 1 hora, exceto quem está no 48 | p. 16 | V |
| R60 | Resolver Evento: até 3 ativos; recompensa de quem resolve; ícone de duas pessoas inclui quem contribuiu; descartar carta e fichas; mafiosos da carta para a Bolsa | p. 14 | V |
| R61 | Recompensas Limitadas: escolha por ordem da trilha, de quem está mais atrás | p. 14 | V |
| R62 | Corporação: usada vai a descarte aberto; reembaralhar; máximo 2 | p. 15 | V |
| R63 | Habilidade: a carta diz o efeito | p. 15 | V |

### 4.9 Variantes

| # | Regra | Fonte | Cl. |
|---|---|---|---|
| R64 | 2 jogadores: Informantes nas pretas 1, 3, 5; Testemunhas nas brancas 2, 3, 4; 3 bastam para Cargo e Gangue | p. 17 | V |
| R65 | 2 jogadores, Padrão: 4 suspeitos virados sob um carro não usado ("agente fantasma"); ao interrogar, pode comprar dessa pilha embaralhada | p. 17 | V |
| R66 | Cooperativo: preparação (lados, agentes, mafiosos removidos, Marcador de Tempo Esgotado), ações por função, sem dia e noite, presos para a Bolsa, suspeitos abertos, evidências compartilhadas, penalidade move o Gângster Cinza, Corporação compartilhada com 2, Trabalho de Campo, acusação coletiva | p. 10, 18, 19 | V |
| R67 | Solo: Cooperativo para 2 (ou 3 ou 4 agentes) | p. 19 | V |

### 4.10 Fora do escopo

O texto das Cartas de Evento, de Corporação e de Habilidade (efeitos individuais) não está no manual e não foi lido; o tutorial só diz que a carta traz as instruções. A ação de Resolver Evento custa o que a carta exigir. A posição dos ícones de bônus na trilha de Nível de Distintivo não aparece em texto (só miniatura nas p. 7, 10 e 14); o tutorial não a descreve. A expansão Chefões (p. 19) não entra.

## 5. Ambiguidades e escolhas

1. **Primeiro turno, dia ou noite (R27, L).** Os indicadores começam empilhados ao lado da trilha (p. 5, 13B), e a regra da Hora do Dia olha o espaço do indicador no início do turno (p. 15). Os espaços 1 a 6 têm sol (ilustração da p. 7). O guia trata o primeiro turno como diurno e diz isso no Comece e num `[!edicao]` da etapa 2.
2. **Coordenadas da Rolagem (R32, I).** A p. 16 diz que "os resultados dos dados preto e branco determinam as coordenadas coluna-linha" e dá o exemplo "preto-2 e branco-4". A ilustração da mesma página mostra o mafioso na linha da ficha preta 2 e na coluna da ficha branca 4, e a p. 5 põe as brancas no topo (colunas) e as pretas à esquerda (linhas). O guia: branco = coluna, preto = linha. Nenhuma das leituras muda o jogo enquanto a mesa for coerente.
3. **"Adjacentes" em Chamar Reforços (R31, I).** Sem definição na p. 12; em Dirigir, o movimento é "ortogonal (não diagonal)" (p. 11), e o exemplo da p. 12 só tem vizinhos ortogonais. O guia usa sem diagonal.
4. **Tocaia com falha gasta as horas (R43, I).** Chamar Reforços tem observação explícita; a Tocaia não. Pela regra geral (a ação "custa uma quantidade específica" de horas, p. 11) e pelo exemplo da p. 13 ("você arrisca 2"), as horas declaradas são o custo. O guia aplica e avisa.
5. **Ficha de Investigação com falha conta para a Carta de Suspeito (R49, I).** A ficha de falha fica no tabuleiro (p. 12), e a p. 10 premia quem tem "pelo menos uma Ficha de Pista daquele tipo". O guia segue a letra.
6. **Duas maneiras de conseguir álibis (R51, I).** A p. 8 lista "comprar a carta do topo (se não houver cartas no baralho, faça da maneira 2)" e "olhar uma carta de outro jogador". O parêntese indica que a segunda substitui a primeira com o baralho vazio; o guia lê assim.
7. **Encerrar Seu Caso como ação (R2, I).** Está no índice e no Tabuleiro de Agente como ação, mas o texto descreve a escolha ao terminar o turno com o indicador no vermelho. O guia segue o texto.
8. **"Patente" e "Nível de Distintivo"** são a mesma trilha (p. 4, 10, 17).

O manual inglês poderia esclarecer 2, 3 e 6; não foi consultado (seção 2).

## 6. Erros comuns (sem fonte de comunidade)

Não pesquisei fóruns. Os pontos marcados como `[!atencao]` vêm de regras do manual que contrariam a intuição: a hora do dia é a do começo do turno (p. 15), horas arriscadas são gastas na falha (p. 12), nome de suspeito não se diz (p. 8), "deter" manda o mafioso para a Bolsa salvo em Prender (p. 11). Não é evidência de que sejam os erros mais frequentes.

## 7. Plano instrucional e decisões de carga

- **Comece em 4 minutos:** só o primeiro turno, com o primeiro turno tratado como diurno, por isso só as cinco ações possíveis de dia e as de qualquer hora entram na tabela. Comprar Evento e a Rolagem de Mafioso entram em uma linha cada porque podem acontecer no primeiro turno (Onda de Crimes, quarteirão ocupado).
- **Etapa 1 (montar a cidade):** passo a passo completo e uma pergunta.
- **Etapa 2 (tempo, turno, mafiosos):** ordem por horas, Dirigir, hora do dia, as ações sem pista (Prender, Pausa, Chamar Reforços) e a Rolagem de Mafioso. Exemplo resolvido com ordem de turno, direção e risco; tarefa para completar com Prender; sua vez com dia e noite e falha em Chamar Reforços; treino curto de coordenadas.
- **Etapa 3 (pistas, evidências, suspeitos):** as cinco ações de pista, o processo de decifrar, Cartas de Suspeito, distintivo, Interrogar e Consultar Evidência (este só faz sentido aqui, mas é obtido por Evento: citado como recompensa na etapa 4).
- **Etapa 4 (Eventos, Corporação, acusação):** comprar e resolver Evento, penalidade, cronometrado, fim e desempate.
- **Adiado para `[!mais]`:** Atenuação, Onda de Crimes, um mafioso por quarteirão, limite de 48, esgotamento de Investigação e Tocaia, detalhes de Custódia, Interrogar, Consultar Evidência, Cronometrado, rolagens de Evento, Recompensas Limitadas, Corporação, Cooperativo e Solo.
- **Limite:** o texto não observa o leitor nem ajusta o apoio.

## 8. Extensão

`wc -w` do tutorial: 5.990 palavras (5.577 pela contagem `\w+`). Para chegar ao alvo, foram cortados da primeira versão (9.600 palavras pelo `wc`): parte dos exercícios (de 37 para 20 perguntas), um treino da etapa 3, duas perguntas da avaliação final, a dica de estratégia, a explicação longa do Modo Cooperativo e repetições entre o Comece e a etapa 1. A seção de 4 minutos tem menos de 800 palavras contadas (portão `checar_comece.py`).

## 9. Contas

Script: `scratchpad/tec/scripts/contas.py` (rodado com `python3 -I`). Saída conferida contra o texto:

| Exemplo | Conta | Resultado no texto |
|---|---|---|
| Comece, resolvido | 1 quarteirão + Pegar Informante 2 = 3 | 3 espaços |
| Comece, complete | 2 quarteirões (sem diagonal) + Investigar Cena 2 = 4 | 4 |
| Comece, sua vez | Chamar Reforços arriscando 5, dado 6: gasta 5 | 5 |
| Etapa 2, resolvido | Carla de 3 para 4 com Prender (1); Ana 3 + 2 + 4 = 9; dado 3 ≤ 4 sucesso, dado 5 > 4 falha | 9 nos dois casos |
| Etapa 2, sua vez | arrisca 2, rola 4: falha | falha, 2 horas |
| Etapa 2, treino | branco 2 / preto 5 = coluna 2, linha 5; 4-4 = Onda de Crimes | idem |
| Etapa 3, resolvido | Ana 2 + Bruno 1 + Carla 2 = 5 Informantes; ganham Ana, Bruno, Carla | idem |
| Etapa 3, complete | 20 + 3 + 2 = 25 | 25 |
| Etapa 3, sua vez | Tocaia arrisca 3, ficha 4: falha | falha, 3 horas |
| Etapa 4, resolvido | Ana e Bruno empatam em 7; Ana 46 horas, Bruno 45: Bruno | Bruno |
| Etapa 4, sua vez | 41 + 2 = 43, espaço vermelho | sim |
| Avaliação | 3 indicadores no 12: o do topo | idem |

## 10. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-crimes/tutorial.md`: passa ("seção Comece a jogar dentro da diretriz").
- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos` aplicada ao texto inteiro): 0 avisos.
- Exclamação fora das marcas de bloco, `!fig` e `!video`: 0.
- Teste de conversão: `tools/como_jogar_md.pagina()` rodado em memória com o JSON (sem gravar a página): 7 figuras, 1 vídeo, nenhuma marca `[!...]` sobrando, leitura do essencial calculada em 10 minutos.
- Legibilidade (Flesch adaptado): não medida; o script citado no prompt não está neste repositório.

## 11. Figuras e vídeo

Recortes das ilustrações do manual (só a parte gráfica; quando um quadro tinha texto do manual ao lado, ele foi cortado ou o recorte foi dividido), `.webp` qualidade 80, largura até 1000 px, em `como-jogar/tiny-epic-crimes/figuras/`:

| Arquivo | Página | Mostra |
|---|---|---|
| `preparacao.webp` | 7 | Cidade montada |
| `dirigir.webp` | 11 | Carro anda 3 quarteirões |
| `prender.webp` | 11 | Prender (A) e as 3 cores (B) |
| `chamar-reforcos.webp` | 12 | Arriscou 4, rolou 3 |
| `rolagem.webp` | 16 | Preto 2, branco 4 |
| `evidencia.webp` | 9 | Passos 1, 2A e 2B de decifrar (sem o passo 3, que tinha texto colado) |
| `custodia.webp` | 13 | As duas partes de Levar sob Custódia, montadas lado a lado (o texto do manual entre elas foi retirado) |

Vídeo: `BEcs4ub4O3U`, "TINY EPIC CRIMES - Gameplay resumida", Duque Board Games (oEmbed). Nenhum quadro baixado. Sem vídeo dentro das etapas: nenhum segundo foi conferido.

## 12. Dados do `conteudo/como-jogar/tiny-epic-crimes.json`

| Campo | Valor | Fonte |
|---|---|---|
| jogadores | 1 a 4 | API do produto (1 e 4); Modo Solo, p. 19 |
| duracao | 30 a 60 min | API do produto |
| idade | 14+ | API do produto |
| edicao | Edição Asmodee | pedido do editor; manual com créditos Galápagos |
| genero | Dedução · Competitivo | p. 4 (desvendar o caso; Modo Padrão competitivo) e API (`Competitivo`) |
| leitura_min | 28 | 5.577 palavras / 200 por minuto |
| etapas | 4 | tutorial |
| resenha | null | não há resenha no site |
| publicar | false | aguarda a auditoria independente |
