# Auditoria: Como Jogar Tiny Epic Galaxies

Autoverificação de quem escreveu, em 01/11/2026. A auditoria independente fica para outro agente; até lá, `publicar: false`.

## 1. Fontes efetivamente usadas

- Manual de Regras da Meeple BR (12 p., PDF de 15/11/2017), lido inteiro em texto e nas ilustrações.
- Página do produto da Meeple BR (jogadores, duração, idade).
- Não usados: manual original em inglês (não foi preciso), FAQ ou errata (não encontrados). Vídeo do Desregrando: só referência para o leitor, não assistido, não é fonte.

## 2. Conferência regra por regra

| Regra no tutorial | Onde | Manual | Situação |
|---|---|---|---|
| Objetivo e pontos de vitória | 4min, 0 | p. 2 | ok |
| Preparação passos 1 a 9 | 4min, etapa 1 | p. 3 e 4 | ok |
| 5 jogadores: 6 planetas | etapa 1 | p. 3 | ok |
| 4 dados no começo | 4min, avaliação 1 | p. 4 | ok |
| Ordem livre, não usar todos, Área de Ativação | 4min, etapa 2 | p. 4 | ok |
| Rerrolar: primeira grátis, depois 1 Energia | 4min, etapa 2 | p. 4 | ok; custo por rerrolagem é interpretação, marcada em `[!edicao]` |
| Seguir: 1 Cultura, uma vez por dado, sentido horário | 4min, etapa 4 | p. 4 | ok |
| Mover Nave: pousar faz a ação; orbitar no primeiro espaço | 4min, etapa 2 | p. 5 | ok |
| Planeta diferente; uma Nave por trilha e por superfície; dividir espaço; Nave removida volta | etapa 2 (`[!mais]`) | p. 5 | ok |
| Voltar ao painel com Mover Nave | etapa 2 | p. 5 | ok |
| Não ir a painéis nem a planetas colonizados por outros | etapa 2 (`[!mais]`) | p. 5 | ok |
| Coleta: Energia conta Naves no painel; Cultura não | 4min, etapa 2 | p. 6 | ok |
| Máximo 7; marcador sai com 0 | etapa 2, situações | p. 6 | ok; excedente perdido é interpretação, marcada |
| Conversor | 4min, etapa 2 | p. 9 | ok; "o dado convertido pode ser seguido" é interpretação (no `[!mais]` da etapa 4) |
| Colonização: símbolo do fim, 1 espaço; todas as Naves voltam; carta embaixo do painel; nova carta | etapa 3 | p. 7 | ok |
| Utilize uma Colônia: painel ou planeta colonizado | etapa 3 | p. 8 | ok |
| Subir de nível: custo do próximo, um recurso só; Nave já, dado no próximo turno | 4min, etapa 3 | p. 8 | ok |
| Tabela da trilha de Império | etapa 3, consulta | p. 8 (ilustração) | **interpretada**: leitura da ilustração, com aviso ao leitor |
| Fim: 21 sem missão; rodada se completa | 4min, etapa 4 | p. 4 e 9 | ok |
| Missões e desempate | etapa 4 | p. 9 | ok |
| Missão CONQUEROR (3 pontos; 2 no empate com 3+) | etapa 4 | p. 9 (ilustração) | ok; o tutorial só usa o valor 3, sem empate |
| Solo completo | situações | p. 10 e 11 | ok |
| Pilha de planetas vazia | situações | não diz | **lacuna**, dita como lacuna |

## 3. Exemplos: legalidade e contas

Todos refeitos em `contas.py` (scratchpad). Pontos de legalidade conferidos: no exemplo do Comece, Ana põe a Nave em órbita e usa Economia no mesmo turno (a regra permite: o dado só exige uma Nave em órbita de planeta com aquele símbolo). No exemplo da etapa 2, a Nave sai da superfície para o painel com Mover Nave (p. 5 permite). No da etapa 3, Bruno tem uma Nave em órbita e outra na superfície do mesmo planeta (p. 5 permite). No da etapa 4, os planetas aparecem só pela soma dos pontos (16, 17 e 18), porque o manual não lista os valores das 40 cartas; assim o exemplo não supõe cartas que talvez não existam.

## 4. Pontos de interpretação delicada

1. **Trilha de Império.** O ponto mais frágil do tutorial. Os números saem de uma ilustração parcialmente apagada; o alinhamento das colunas foi feito pelas linhas radiais do desenho e confere com os totais de componentes. Se a auditoria independente tiver acesso ao painel físico ou a uma imagem nítida dele, deve conferir.
2. **Custo da rerrolagem** por rerrolagem, não por dado.
3. **Primeira posição da trilha de colonização** é o espaço de entrada; o tutorial evita contar passos.
4. **Excedente acima de 7** se perde.
5. **Componentes em inglês** nas ilustrações; não confirmado na caixa.

## 5. Clareza e completude: pontos fracos que restam

- As ações das Cartas de Planeta e das Missões Secretas não são ensinadas: o manual remete ao interior da caixa, que não foi consultado. O leitor depende do texto das cartas.
- O exemplo final dá só a soma dos planetas de cada jogador; é menos concreto, mas não inventa cartas.
- A ação de ataque dos Piratas (solo) é só mencionada, porque está impressa no painel pirata.
- A figura de preparação traz rótulos curtos do manual em português; não há bloco de texto do manual nela.
- Sem teste de execução nem auditor independente nesta rodada (exceção do briefing).

## 6. Teste com leitores (proposta)

O mesmo protocolo do piloto: 5 a 8 adultos que nunca jogaram; tarefas: montar para 2 e para 5 jogadores, jogar o primeiro turno, pontuar o fim do exemplo da etapa 4; medir autonomia, erros de regra (lista a partir da seção 2 acima), tempo até o primeiro turno e retenção em 7 dias.

## 7. Ligação com a resenha

Não há resenha de Tiny Epic Galaxies no site. Se uma for escrita, o campo `resenha` do JSON passa a apontar para ela.

## Auditoria independente: partida simulada

Partida simulada só com o tutorial, para 2 jogadores (Ana começa, Bruno segue) e no modo solo. Preparação: 4 planetas abertos (2 + 2), 2 Naves no centro de cada painel, 1 Cultura e 2 Energias, Império na estrela, 1 Missão Secreta cada. Rodada 1: Ana rola 4 dados (Mover, Energia, Economia, Utilize uma Colônia); orbita um planeta de Economia, avança com Economia, coleta 2 Energias (1 do painel, 1 do planeta) e Bruno segue a Energia pagando 1 Cultura (ganha 2); Ana sobe ao nível 2 pagando 2 Energias (1 ponto; dado extra só no próximo turno). Bruno rola 4, rerrola de graça, usa o Conversor uma vez, pousa num planeta e orbita outro; Ana não segue por falta de Cultura. Fim da rodada: dados saem do Painel de Controle. Pontuação, fim (21, rodada completa, missões) e desempate saíram sem adivinhar. No solo, o primeiro turno pirata travou em dois pontos (abaixo).

Lacunas encontradas e como foram resolvidas (manual Meeple BR):

1. **Ação da carta ao pousar: obrigatória ou opcional?** O tutorial dizia "faça já a ação da carta" / "já faz a ação dele". O manual diz que você "pode imediatamente realizar a ação descrita na carta" (p. 5). Corrigido para opcional na tabela do Comece, no "Para entender" e no passo a passo de Mover Nave da etapa 2, no bloco "Ação de um planeta ao pousar" e na folha de consulta.
2. **Quantos dados os Piratas rolam?** O tutorial não dizia. O manual também não diz nas regras solo; só dá a regra geral (dados conforme o Nível de Império, p. 4) e põe o Marcador de Império na trilha do painel pirata (p. 10). Acrescentado como leitura declarada da regra geral.
3. **O que acontece quando os Piratas colonizam?** O tutorial só dizia que as Naves avançam. Acrescentado: o planeta vai para baixo do painel pirata, como na partida normal (p. 11), e soma pontos para os 21.
4. **Ataque pirata.** Faltavam duas regras: as ações dos planetas colonizados pelos Piratas nunca são usadas, e, se a ação do nível diz "uma vez por turno", outro dado de ataque no mesmo turno é inadequado e é rerrolado (ou descartado se já era rerrolagem) (p. 11). Acrescentadas.
5. **Recursos no máximo (Piratas).** Faltava que essas ações só voltam no fim do próximo turno pirata e que os Piratas sobem de nível no máximo uma vez por turno (p. 11). Acrescentado. Também se explicitou que as Naves no painel pirata rendem Energia e Cultura na coleta ("seu Painel Galáctico produz tanto Energia quanto Cultura", p. 11).

Pontos verificados sem correção: preparação para 2 (p. 3), ordem e fim do turno com seguir a última ação (p. 4 e 9), rerrolagem, Conversor, coleta, colonização, custo de nível em um recurso só, fim de jogo e desempate (p. 4 a 9), preparação e turno solo (p. 10 e 11). Lacunas que o manual também não resolve continuam declaradas no tutorial: pilha de planetas vazia, excedente acima de 7 e o texto das cartas (remetido ao interior da caixa, p. 8).

Veredito: dá para jogar a partida de 2 a 5 só com o tutorial; o solo, depois destas correções.

## Auditoria independente: regras

Conferência item a item do tutorial.md contra o Manual de Regras Meeple BR (PDF de 12 páginas, 15/11/2017), com texto extraído por pdftotext e figuras renderizadas (p. 3 a 9; p. 4, 8 e 9 a 600 dpi). Contas refeitas em script.

**Trilha de Império (foco desta auditoria).** P. 8 renderizada a 600 dpi e recortada por coluna; p. 4 também, porque a ilustração dela mostra o começo da trilha.
- Custo: estrela, 2, 3, 4, 5, 6. O "2" fica escondido sob o Marcador de Império na p. 8, mas aparece no hexágono da p. 4. ok.
- Dados: 4, 5, 5, 6, 6, 7. Níveis 2 a 6 legíveis na p. 8 (os aumentos vêm circulados: 5, 6, 7); o 4 do nível 1 está na p. 4 (figura e texto). ok.
- Naves: 2, 2, 3, 3, 4, 4. Legíveis na p. 8 (aumentos em quadrado: 3 e 4); o 2 do nível 1 também na p. 4 e no passo 3 da p. 3. ok.
- Pontos: 0, 1, 2, 3, 5, 8. Níveis 2 a 6 (1, 2, 3, 5, 8) legíveis na p. 8. No nível 1 não há número: na p. 4, o lugar dele na coluna é ocupado pelo rótulo "VICTORY POINTS"; ler como 0 é defensável. ok, com ressalva no bloco [!edicao].
- Alinhamento das linhas conferido pelas faixas radiais e pelo padrão alternado (dado a mais nos níveis 2, 4 e 6; Nave a mais nos níveis 3 e 5), que bate com "alternadamente" no "Para entender" da etapa 3. ok.
- corrigido: a frase de origem da tabela dizia que o primeiro espaço "vem do texto da p. 3 e 4" → agora diz que vem da ilustração da p. 4 (níveis 2 a 6 da p. 8). O [!edicao] passou a dizer que o custo do nível 2 está sob o marcador na p. 8 e que o nível 1 sai da p. 4, sem número de pontos (p. 4 e 8).

**Demais itens**
- Créditos e dados do manual (12 p., tradução Guilherme Duque, 2017) (p. 12): ok.
- Preparação, passos 1 a 9: painéis, 4 Naves e marcadores, 2 Naves de pé no centro e 2 na trilha de Naves, 1 Cultura e 2 Energias, Império na estrela, jogadores + 2 planetas (5 jogadores: 6; 3 jogadores: 5), Painel de Controle e 7 dados, 2 Missões e fica com 1, o resto volta à caixa sem ser olhado (p. 3); o mais novo começa (p. 4): ok. Legenda da figura de preparação (3 jogadores, 5 planetas) (p. 3): ok.
- Turno: dados pelo Nível de Império, 4 no início, Área de Ativação, uso único, ordem livre, não é preciso usar todos (p. 4); fim do turno, seguir a última ação, tirar os dados, sentido horário (p. 9): ok. Legenda da figura (4 dados na Área de Ativação, 3 fora) (p. 4): ok.
- Rerrolagem: primeira grátis, adicionais 1 Energia, só dados não ativados (p. 4): ok; leitura "por rerrolagem" já declarada em [!edicao].
- Seguir: 1 Cultura, uma vez por dado, sentido horário a partir do jogador da vez, "alguns segundos" (p. 4): ok. "Com as próprias peças" é leitura de "faz imediatamente a ação daquele dado": ok.
- Mover Nave: para outro planeta; pousar (ação opcional, "pode") ou orbitar no primeiro espaço; não trocar de posição no mesmo planeta; 1 Nave sua por trilha e por superfície; jogadores diferentes dividem espaços; Nave removida volta ao painel; voltar ao painel; nunca a painel alheio nem planeta colonizado por outro (p. 5): ok. A obrigatoriedade da ação ao pousar já tinha sido corrigida pelo outro auditor; conferido.
- Coletar Recursos: 1 por Nave em órbita ou na superfície de planeta do recurso; Energia também 1 por Nave no painel; máximo 7; marcador sai ao zerar (p. 6): ok. Legenda da figura (2 Culturas) (p. 6): ok.
- Conversor: 2 dados não ativados, terceiro vira qualquer face, uma vez por turno, os 2 contam como usados, não se segue (p. 9): ok.
- Colonização: símbolo do fim da trilha decide; 1 espaço por dado; todas as Naves da carta voltam; carta sob o painel com texto e pontos à mostra; anunciar pontuação; repor carta (p. 5 e 7): ok.
- Utilize uma Colônia: ação do painel ou de planeta colonizado; custo do próximo espaço, um recurso só (exemplo 2º→3º = 3) ; Nave nova usável no mesmo turno; dado novo só no próximo; anunciar pontuação (p. 8): ok. Figura da p. 8 (marcador do 2º para o 3º espaço): ok. Textos das ilustrações em inglês ("Activation Bay", "Converter", "Upgrade your empire") (p. 4, 8 e 9): ok.
- Fim de jogo: 21+ anuncia, missões não contam, rodada até a vez de quem começou, que não joga (p. 4 e 9); revelar missões, somar; desempate planetas → Nível de Império → Energia + Cultura → vitória compartilhada (p. 9): ok.
- Missão da ilustração da p. 9 ("Conqueror": 3 pontos por ter mais planetas; empatado, 2, com 3+ jogadores): exemplo com Carla 5 × 4 × 4 → 3 pontos: ok.
- Solo (p. 10 e 11): preparação como 2 jogadores, Piratas com 0/0 e 4 Naves, sem missões, você começa; dados um a um; rerrolagem forçada por 1 Energia + 1 Cultura; ação impossível rerrola 1 vez e depois descarta; seguir por 1 Cultura, não descartados; Piratas nunca seguem; Mover para o planeta mais à esquerda sem Nave pirata, nunca pousam; avançam todas as Naves do tipo; coleta com painel produzindo os dois recursos; ataque só do nível atual; máximos de Energia/Cultura, Energia primeiro, turno extra com 3 dados; vitória instantânea em 21 ou caveira: ok. Acréscimos do outro auditor (dados pela regra geral, declarado como leitura; "uma vez por turno"; planetas piratas) conferidos: ok.
- Situações especiais: pilha vazia e excedente acima de 7 não tratados no manual, declarados como tal: ok.

**Contas e exercícios (refeitos em script)**
- Comece: Ana 2 → 4 Energias (1 painel + 1 planeta); Bruno segue Energia com 2 Naves no painel → 2; Cultura 1 → 0; Utilize uma Colônia no nível 1 = 2 Energias; segunda rerrolagem = 1 Energia: ok.
- Etapa 1: 4 jogadores → 6 planetas; 5 → 6; 1 Cultura e 2 Energias; 2 Naves: ok.
- Etapa 2: exemplo da ordem (Cultura 1 → 2; Energia 2 → 4; com a ordem inversa, só +1): ok. Completar (primeira rerrolagem grátis, segunda 1 Energia, Conversor): ok. Sua vez (não troca de posição; divide espaço; 6 + 3 → 7; Conversor 1×): ok. Treino a) 3, b) 0, c) 2, d) 1: ok.
- Etapa 3: Ana nível 2 (1) + planeta 5 = 6; Bruno 2 → 3 paga 3 Culturas e ganha Nave usável já, 2 pontos; Diplomacia × Economia; dado novo no próximo turno; não mistura. Treino 2; 5; 2 + 3 = 5: ok.
- Etapa 4: Bruno 5 + 16 = 21; Carla 3 + 18 = 21 (+3 = 24); Ana 3 + 17 = 20; com missão de 4, 24 = 24, desempate por planetas (5 × 4) para Carla. Sua vez (seguir Mover com escolhas próprias; missão fora dos 21; sem Cultura não segue): ok.
- Avaliação final 1 a 8 (4; 3; 2 Energias; volta ao painel; 4 Energias; neste turno; não; ninguém): ok. As alternativas erradas são todas erradas pelo manual.
- Termos conferidos com a edição brasileira: Painel Galáctico, Painel de Controle, Área de Ativação, Conversor, Dados de Ação, Naves, trilha de recursos, trilha de Naves, trilha de Império, trilha de colonização, Nível de Império, Mover Nave, Coletar Recursos, Colonização, Utilize uma Colônia, Seguir outro jogador, Cartas de Planeta, Cartas de Missão Secreta, Frota de Piratas, Piratas Galácticos: ok.

**Fora do escopo de regras, para o editor:** as figuras citadas (figuras/*.webp) não existem ainda em docs/como-jogar/tiny-epic-galaxies/.

Veredito (regras): APROVADO COM CORREÇÕES. Uma correção de fonte na tabela da trilha de Império; nenhum valor da tabela estava errado.
