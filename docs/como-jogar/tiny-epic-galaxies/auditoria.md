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
