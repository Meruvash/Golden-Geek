# Auditoria: Como Jogar Catan

Entrega 3. Autoverificação feita por quem escreveu o tutorial, em 31/10/2026. Pelo briefing, a auditoria independente (auditor de regras e teste de execução) fica para outro agente; nada aqui substitui essa revisão.

## 1. Fontes usadas e que faltaram

Usadas: folheto *Catan, o jogo: Regras* da Devir (4 páginas, edição 2015, tradução de 12/2018), manual do *Catan Plus* da Devir (só componentes), *Catan Game Rules & Almanac* da Catan GmbH e Catan Studio (2020), página do produto da 6ª edição na Devir Brasil, catálogo Devir de abril de 2026. Detalhes e links no dossiê, seção 2.

Faltaram: o Almanaque em português (o folheto remete a ele 30 vezes com ➔ e ele não está publicado), o manual da 6ª edição brasileira e qualquer FAQ ou errata oficial. Consequência: 23 das 60 regras da base dependem do manual original em inglês, sempre marcadas "manual original" no tutorial.

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
- **Dependência do manual em inglês.** Quase 40% das regras da base vêm do original. O texto marca cada uma, mas não há confirmação de que o Almanaque brasileiro diga o mesmo.
- **Português de Portugal no glossário.** "Aldeia", "lavoura", "matéria-prima" e "reserva" são os nomes do folheto, que podem não ser os da caixa atual.
- **Extensão no limite.** Cerca de 5.200 palavras de texto corrido; as tarefas de cada etapa ocupam boa parte. Se o editor quiser encurtar, os candidatos são o "Na caixa" da etapa 1 e o segundo parágrafo do "Para entender" da etapa 3.
- **Legibilidade não medida.** O script de Flesch citado no prompt não está neste repositório.

## 7. Teste com leitores (proposta)

Mesmo protocolo do prompt: de 5 a 8 adultos que nunca jogaram Catan. Tarefas observáveis: montar a ilha para principiantes com 3 e com 4 jogadores; jogar uma rodada completa; resolver um 7 com um jogador acima de 7 cartas; pontuar a situação "4 aldeias, 1 cidade, Maior Estrada Comercial, 1 carta de Ponto de Vitória". Lista de verificação a partir das regras R6 a R46. Medidas: tarefas sem ajuda, erros de regra, tempo até a primeira rodada independente, retenção em 7 dias com as mesmas situações, escala de esforço mental de 9 pontos e uma pergunta aberta. Nenhum resultado foi observado até aqui.

## 8. Ligação com a resenha

Não há resenha de Catan no site. Se uma for escrita, o "Comece a jogar em 4 minutos" pode virar o bloco de regras dela, com link para o tutorial completo (proposta; nada implementado).
