# Auditoria: Como jogar Tiny Epic Zombies

01/11/2026. **Autoverificação do redator**, regra por regra, com o texto extraído do manual Meeple BR (versão 2.0) e as ilustrações renderizadas. Não é a auditoria independente: ela ainda será feita por outro agente, e só depois o JSON pode ir a `"publicar": true`.

## 1. Fontes efetivamente usadas

- Manual brasileiro (20 p.), lido inteiro: texto por página (`pdftotext`) e páginas 2, 5, 7, 9 a 15 vistas em imagem.
- Página do produto da Meeple BR (jogadores, duração, idade), lida por WebFetch; o curl direto devolveu 406 e não foi contornado.
- Não obtidos: manual em inglês (não foi necessário), FAQ ou errata oficial (não encontrados).

## 2. Conferência regra por regra

| Afirmação do tutorial | Onde | Manual | Resultado |
|---|---|---|---|
| Preparação (Pátio cooperativo, Lojas aleatórias com entradas para fora, 1 Zumbi por entrada, Barricada no 2, 2 Sobreviventes) | Comece, etapa 1 | p. 4 | confere |
| Jogador Zumbi: 3 cartas, fica com 1, Indicador de Horda no 1, outros 2 ao alcance, estoque | Comece, etapa 1 | p. 4 | confere |
| Humanos: 3 cartas, fica com 1, ITEMeeple no Pátio, Dano 0, Munição 9 | Comece, etapa 1 | p. 4 e 5 | confere |
| 3 Objetivos lado cooperativo; Indicador de qualquer cor | etapa 1 | p. 4 | confere |
| Montes A (12), B (12), Suprimento (resto), Procura 24 | etapa 1 | p. 6 | confere |
| Zumbi compra 8, 1 fechada para cada humano | Comece, etapa 1 | p. 4 | confere |
| Dado, Itens, Veículo, Armadilhas (cinza), Suprimentos numerados | etapa 1 | p. 5 | confere |
| Primeiro jogador | Comece, etapa 1 | p. 6 | confere |
| Trilha e Comido Vivo, 5 passos | etapa 1 | p. 7 | confere |
| 3 Movimentos; A, B, C; Procura | Comece, etapa 2 | p. 8 | confere |
| Sala vizinha através de paredes e entre Lojas | Comece, etapa 2 | p. 8 | confere |
| Começou com Zumbi: move primeiro; Regra de Ouro | Comece, etapa 2 | p. 8 | confere |
| Corpo a corpo obrigatório na Sala com Zumbi, sempre mata | Comece, etapa 2 | p. 9 | confere |
| Resultados do Dado de Luta | etapa 2, folha | p. 9 | confere (ícones na ilustração) |
| Acerto Crítico livre, fora dos 3, sem ação na Sala deixada, encadeável | Comece, etapa 2 | p. 9 e 19 | confere |
| Distância: só entrando em Sala sem Zumbi, 1 munição, Sala vizinha, nunca a própria | Comece, etapa 2 | p. 9 | confere |
| Loja vazia para Sala, Marcadores e coleta | Comece, etapa 3 | p. 10 e 11 | confere |
| Contínua 1 vez por turno; Terminal com Procura | etapa 3 | p. 10 | confere |
| Passagem Secreta | etapa 3 | p. 10 | confere |
| Suprimento: +2, máximo 6, 1 carta, recusa de Arma | etapa 3 | p. 10 | confere |
| 1 Arma de cada tipo, troca na coleta; Mochila; Pegar | etapa 3 | p. 11 | confere |
| Largar cartas; único jeito de trocar | etapa 3 | p. 11 | confere |
| Procura: posição da carta, Pátio, não coleta no mesmo turno, Evento | Comece, etapa 3 | p. 11 | confere |
| Verificar Ruídos, ação de Horda única por turno, Indicador até o quinto | Comece, etapa 4 | p. 12 | confere |
| 2 Zumbis, 1 ou 2 Lojas, escolha do Zumbi; menor Sala livre | Comece, etapa 4 | p. 12 e 13 | confere |
| Esquina e Corredor cheias; Barricada; Sobrevivente | etapa 4 | p. 13 | confere |
| Habilidade passiva; Adolescente Zumbi | etapa 4 | p. 14 e 5 | confere |
| Sangrando, com desempates | etapa 4 | p. 14 | confere |
| Cercado | Comece, etapa 2 | p. 14 e 19 | confere |
| Entregar carta, não olhar até o fim do próximo turno, comprar 4, monte vazio | etapa 4 | p. 14 | confere |
| Completar Objetivos, vitória imediata | etapa 3 | p. 15 | confere |
| Final do Jogo | Comece, etapa 4, folha | p. 15 | confere |
| Cooperativo com IA | etapa 4 | p. 16 | confere |
| Competitivo vs. Zumbi, Competitivo, Solo | Situações especiais | p. 17 e 18 | confere |
| Exemplos de Sala (Pátio Cure 2, Restos, Moto, Armadilha) e Consertar o Helicóptero | etapa 3, Situações especiais | p. 5, 9, 13 (cartas nas ilustrações) | confere |
| Faca e Pistola iniciais | Comece, etapa 3 | p. 5 e 11, só ilustração | **[interpretada]**, sinalizada com [!edicao] |
| Barulho com o humano no Pátio | etapa 4 | p. 12 não trata | **[lacuna]**, sinalizada com [!edicao] |

Cada (x) de múltipla escolha foi relido contra a página citada; as opções erradas estão erradas pelo manual.

## 3. Contas refeitas

Script `tez-scripts/contas.py` (scratchpad), todas as asserções passam: trilha (1/8 vivo; 3+2 contra 5 Comido Vivo; 2/7 → 4/5 vivo; 6+1 contra 7 Comido Vivo; 4/6 com dois tiros → Comido Vivo no segundo); Monte de Procura 24 e Suprimento 8; Barricada 3 → 5 e 5 → 6 (teto); colocação de Zumbis nas Salas; Barricada 2 → 0 → volta a 2 com 1 Sobrevivente a menos; IA 2 e 4 Zumbis.

## 4. Ambiguidades e lacunas do manual

1. **Armas iniciais.** O texto nunca diz que o humano começa com Faca e Pistola; só a Carta de Jogador ilustrada mostra os dois espaços preenchidos (p. 5 e 11).
2. **Barulho no Pátio.** O Pátio não tem Símbolo de Entrada; o manual não diz se há Barulho.
3. **Esquina cheia.** "Se todas as 3 Salas desta Loja já contiverem Zumbis" (p. 13): "desta" lido como a próxima Loja.
4. **"Pode" e "deve" matar.** A p. 8 e a p. 9 dizem que você "pode matar 1 Zumbi", e a p. 9 diz que, ao entrar em Sala com Zumbi, "você deve matá-lo"; o tutorial segue a regra específica (obrigatório na Sala com Zumbi).
5. **Dado de Luta.** O manual não diz quantas faces tem cada resultado.
6. **Munição acima de 9**, **monte vazio no modo com IA** e **"sala central do Pátio"** (p. 4, quando a ilustração mostra uma só Sala): não tratados; o tutorial não afirma nada sobre eles.
7. A visão geral (p. 6) fala em vencer "antes do Monte de Procura acabar", e o Final do Jogo (p. 14 e 15) dá a cada humano um último turno depois da última carta revelada. O tutorial segue a regra detalhada.

## 5. Pontos fracos que restam

- Extensão de 6.658 palavras, acima do alvo de 6.000.
- O vídeo é do canal Romir Play House; não há vídeo do Duque Board Games para este jogo. A ligação do canal com o tradutor do manual não foi confirmada.
- As habilidades de cada Loja, Carta de Jogador, Carta de Zumbi e Carta de Objetivo não são listadas: o manual não as reúne em texto, e o tutorial manda ler a carta. Só aparecem as que o manual mostra nas ilustrações.
- Os exemplos usam Lojas genéricas ("uma Loja de Corredor") porque a montagem é sorteada; o leitor não pode conferir o exemplo num mapa fixo.
- Teste de execução e auditoria independente ainda não foram feitos.
