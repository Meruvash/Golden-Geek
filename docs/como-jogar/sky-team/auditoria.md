# Auditoria: Como Jogar Sky Team

Entrega 3. Autoverificação de quem escreveu, regra por regra, contra o manual da edição brasileira (Galápagos, SKT001, v1.0), em 08/11/2026. A auditoria independente fica para outro agente, como manda o `BRIEF.md`; até lá, `"publicar": false`.

## 1. Fontes efetivamente usadas

- Usadas: manual brasileiro "Procedimento de Pouso" (12 páginas, lido inteiro, texto e ilustrações); Diário de Bordo brasileiro (8 páginas, lido inteiro, usado só para a seção que diz como os outros aeroportos entram); manual em inglês (só o trecho dos Flapes); página oficial da Le Scorpion Masqué (conteúdo da caixa, 11 aeroportos); oEmbed do vídeo do Duque.
- Não obtidas: a página do produto na loja da Galápagos (Access Denied ao robô, sem contorno); a errata de Haneda (SharePoint; não afeta Montreal, não aberta). Não há FAQ oficial.
- Texto extraído por página: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1108/sky-team/txt/r1.txt` a `r12.txt` (regras) e `.../txt/d1.txt` a `d8.txt` (Diário de Bordo).

## 2. Conferência regra por regra

| Trecho do tutorial | Página | Resultado |
|---|---|---|
| Montagem única ao abrir a caixa (lixeira, 9 adesivos, disco, 10 Interruptores) | p. 2 | Confere |
| Tabela de componentes e quantidades | p. 3; página oficial | Confere (12 aviões, 3 Cafés, 2 Rerrolagens, 10 Interruptores, 2 escudos, 4 + 4 dados) |
| Passos 1 a 10 da montagem, na ordem do manual | p. 3 | Confere; passo 7 cita o 6.000 e o 2.000 pela ilustração; passo 8 cita os 9 aviões pela ilustração |
| Exatamente 2 jogadores | p. 1, p. 3; página oficial | Confere |
| O que volta para a caixa; Diário de Bordo só depois de Montreal | p. 3, p. 11; DB p. 1 | Confere |
| Quem começa: seta na tela de Altitude; Piloto na 1ª rodada | p. 4 | Confere |
| 7 rodadas, 3 fases | p. 4 | Confere |
| Discussão sem falar de dados; silêncio após a rolagem, salvo correção de regra | p. 4 | Confere |
| Rerrolagem: estoque, qualquer um, os dois rerrolam uma vez os dados restantes | p. 4 | Confere; destino da ficha não usada marcado como leitura do guia em `[!edicao]` |
| Um dado por turno, espaço livre, cor e número | p. 4 | Confere |
| Rádio sem número; Concentração sem restrição | p. 4 | Confere |
| Eixo e Motores obrigatórios; derrota no fim da rodada; não precisam vir primeiro | p. 5 | Confere |
| Eixo: diferença para o lado do maior; não volta ao centro | p. 5 | Confere |
| Parafuso ao alcançar ou passar o X; X depois da marca 2 | p. 5 (texto e ilustração a 600 dpi) | Confere; o "3 pontos" vem da ilustração e está dito como tal |
| Motores: soma; 0 / 1 / 2 pelos marcos | p. 6 | Confere |
| Colisão; ultrapassagem do aeroporto | p. 6 | Confere |
| Avanço de 2 com avião no espaço seguinte = colisão | p. 6 (não trata); DB p. 3 | Interpretada, em `[!edicao]` |
| Rádio: Piloto 1, Copiloto 2; contagem a partir da Posição Atual = 1; sem avião, sem efeito | p. 7 | Confere |
| Trens de Pouso: só Piloto, qualquer ordem, Interruptor, azul +1, 3 Trens entre 7 e 8, Trem já verde sem efeito | p. 7 | Confere; números 1/2 e 5/6 pela ilustração |
| Flapes: só Copiloto, sequência, Interruptor, alaranjado +1, além do 12 | p. 8 | Confere; 4/5 e 5/6 pela ilustração |
| Concentração e Café: 3 espaços, Café imediato, máximo 3, ±1 por Café, gasto antes de alocar, volta à reserva, qualquer um usa, sobra para a rodada seguinte, sem dar a volta de 1 a 6 | p. 8 | Confere |
| Freios: só Piloto, 2, 4, 6 em sequência, marco +1, efeito só na última rodada, não precisa acionar todos | p. 9 | Confere |
| Posições do marco de Frenagem | p. 3, 9, 10 e 11 | Antes do 2, entre 4 e 5 (texto); entre 2 e 3 (ilustração da p. 9); "depois do 6" é leitura da trilha |
| Fim da rodada: Altitude −1.000; dados de volta; teste das telas | p. 9 | Confere |
| Chegar cedo demais; não chegar a tempo | p. 10 | Confere |
| Última rodada: Motores contra Freios; força não abaixo de 2 | p. 10 | Confere (citação literal curta "não pode estar abaixo de 2") |
| Condições de vitória A a D | p. 11 | Confere |
| Diário de Bordo: 21 cenários, cores, preparação com quatro trocas, lista de módulos | DB p. 2 a 8 | Confere; 11 aeroportos da página oficial |
| Dicas da p. 12 em `[!dica]`, como sugestão | p. 12 | Confere |

Nenhuma regra do manual de Montreal ficou de fora. Ficaram só citadas, de propósito, as regras dos módulos do Diário de Bordo.

## 3. Exemplos: legalidade e contas

Todas as contas refeitas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1108/sky-team/scripts/contas.py` (detalhe no dossiê, seção 8). Legalidade conferida: no exemplo do "Comece", cada jogador usa os 4 dados rolados, um por turno, alternando a partir do Piloto; o 1 do Copiloto respeita o Flape 1/2; o Piloto usa o seu único Rádio, e o Copiloto o segundo dos dois dele; o 2 na Concentração é livre. No exemplo de Café da etapa 2, o Café é gasto antes de alocar, como manda a p. 8. No pouso, os Freios 2 e 4 foram acionados em sequência em rodadas anteriores. O exemplo do Rádio com 6 no "Comece" depende da esteira de Montreal lida na ilustração (3 aviões no 6º espaço); se a leitura estiver errada, o Rádio apenas não teria efeito, e a jogada continua legal.

## 4. Pontos de interpretação delicada

1. **Avanço de 2 com tráfego no espaço seguinte.** O manual não trata à parte; o guia lê espaço por espaço e avisa em `[!edicao]`.
2. **Ficha de Rerrolagem não usada.** O guia a deixa no estoque; o manual não diz que ela se perde.
3. **Dados lidos só nas ilustrações:** números de Trens 1/2 e 5/6 e de Flapes 4/5 e 5/6; Rerrolagem no 6.000 e no 2.000; 9 aviões e aeroporto a 6 espaços em Montreal; X depois da marca 2; Interruptor dos Freios; 3 espaços de Concentração. Tudo marcado no texto e reunido num `[!edicao]`. A ilustração da esteira de Montreal é pequena (raster dentro do PDF); a contagem 2, 3, 1, 2, 1 foi feita a 400 dpi e bate com os ícones de tráfego das p. 6, 9 e 10 (2 no aeroporto, 3 no espaço anterior), mas vale o auditor conferir com a esteira real.
4. **Flape em espaço já verde.** O manual diz que dado em Trem de Pouso já verde não tem efeito (p. 7), mas não diz o mesmo dos Flapes, que vão em sequência. O guia não afirma nada sobre isso.
5. **Ordem de jogo nas rodadas seguintes.** O guia só diz que a seta da Altitude indica quem começa; não afirma que ela alterna, embora a arte sugira.

## 5. Componentes do plano, com trechos

- **Tarefa inteira na versão simples:** o exemplo resolvido do "Comece" joga a primeira rodada inteira, oito dados, com o Flape mudando a velocidade.
- **Apoio que diminui:** em cada etapa, resolvido ("O avião começou a rodada inclinado 1 ponto para o Piloto..."), complete ("Que dado ele põe nos Motores?"), sua vez ("O avião está inclinado 2 pontos para o Copiloto...").
- **Informação de apoio antes da tarefa:** o `[!entender]` da etapa 2 explica que o marco azul mais alto "ajuda a esperar quando há aviões à frente", antes do exemplo que usa isso.
- **Prática específica:** treino da sequência dos Flapes; parafuso por inclinação acumulada.

## 6. Clareza e completude: pontos fracos que restam

- O tamanho ficou no limite de cima do pedido (cerca de 5.100 palavras de corpo). Cortar mais tiraria exercício ou regra de caso especial.
- O exemplo resolvido do "Comece" é denso: oito alocações num parágrafo. Uma figura do turno ajudaria, mas o manual não tem ilustração de uma rodada inteira.
- A montagem única ao abrir a caixa (p. 2) não tem figura própria, porque os quadros dessa página trazem texto do manual dentro; o passo é descrito e a figura do painel montado vem logo abaixo.
- A seção "Comece" não ensina o Rádio e os Flapes, mas o exemplo resolvido os usa. O leitor vê o efeito antes da regra; a etapa 2 a dá completa.
- A foto oficial é da edição em inglês e mostra peças de módulo; a legenda diz isso.

## 7. Teste com leitores (proposta)

Mesmo protocolo dos outros Como Jogar: 5 a 8 adultos que nunca jogaram; tarefas observáveis (montar Montreal, jogar duas rodadas, resolver uma situação de pouso dada); medidas de autonomia, precisão contra a base de regras, tempo até a primeira rodada sem ajuda, retenção em 7 dias, esforço mental (escala de 9 pontos de Paas) e satisfação. Em Sky Team, observar em especial se a dupla fala de números depois da rolagem e se alguém esquece o Eixo ou os Motores.

## 8. Ligação com a resenha

A resenha diz que o que mais confunde "é o eixo e a regra de que os dois dados dos motores precisam ser colocados em toda rodada"; o tutorial põe isso nos erros mais caros do "Comece" e na etapa 1. Proposta (não implementada): o bloco "primeira partida" da resenha poderia apontar para `/como-jogar/sky-team/`. A resenha cita a edição nacional como Asmodee; o manual traz os créditos da Galápagos (p. 11) e está na biblioteca de downloads da Asmodee Brasil.

## Auditoria independente (08/11/2026)

Duas auditorias por outros agentes: regras, "aprovado com correções", sem erro de regra; partida simulada por iniciante, "sim, com ajustes". As 19 correções foram aplicadas no mesmo dia; a lista está no dossiê, seção 11. O que mudou de classificação: quem abre cada rodada (seta alterna, lido na ilustração da p. 3), o lado do Piloto (ilustração), o destino da ficha de Rerrolagem usada e o acúmulo, dado em Flape ou Freio já acionado, Rádio além da esteira e dado na Concentração com 3 Cafés passaram a ter `[!edicao]` como leitura do guia. Nenhuma regra verificada mudou.
