# Auditoria: Como jogar Tiny Epic Cthulhu

01/11/2026. Autoverificação de quem escreveu, regra por regra contra o manual da Asmodee (v1.0, 24 páginas). A auditoria independente (regras e teste de execução) ainda não foi feita; até lá, `"publicar": false`.

## 1. Autoverificação regra por regra

| Trecho do tutorial | Manual | Resultado |
|---|---|---|
| Cooperativo; vitória com 6 locais; 3 derrotas; fim imediato | p. 6, 16, 18 | confere |
| Preparação (Comece e etapa 1) | p. 4 e 5 | confere; "um giro por Rastejador" marcado como leitura |
| Caos por número de jogadores | p. 4 e 5 | confere; soma 17 nas 3 contagens |
| Ancestral no passo 12 volta para a bolsa | p. 5 | confere |
| Só a página do GA começa virada | p. 4 | confere |
| Mais jovem começa, sentido horário | p. 6 | confere |
| Roleta: duas voltas, linha = próximo horário, ordem 1-A a 1-D | p. 10 | confere |
| Quatro Ações do Ponteiro | p. 10 (ícones) | confere |
| Compra = número à direita do Meeple de Força; 3 no início | p. 11 e ilustração p. 8 (3,3,3,4,4,4,5,5) | confere; contradição com "dois" da p. 10 em `[!edicao]` |
| Destino de Loucura, Ancestral e Caos tirados no 1º Passo | p. 11 | confere |
| Surgir Rastejador pelo Ponteiro de Tentáculo; cor em falta | p. 12 | confere |
| GA vai para a carta do Rastejador | p. 12 | confere |
| Tabela de maldições | p. 9 a 12 | confere; Energia segue p. 10 e 11 (p. 8 diverge, em `[!edicao]`) |
| Sobra vai para a trilha esvaziada; maldição de Loucura só na cor | p. 9 a 11 | confere (figura p. 9) |
| Poderes dos 4 Grandes Antigos e alcance | p. 23, textos dos tabuleiros p. 3 | confere; alcance pela p. 23, divergência da p. 8 em `[!edicao]` |
| Até 3 ações, repetíveis; 1 Caos por ação extra | p. 12 | confere |
| Mover-se 1/2/3 por Medo; virar página; proibição do GA na Primeira Fase; saída obrigatória | p. 13 | confere |
| Parar com Rastejadores: 1 tentáculo por Rastejador | p. 13 | confere |
| Coletar 1/2/3 por Ganância; máximo 2; não amaldiçoa | p. 13 | confere |
| Banir: dados, maior dado, sem soma, tudo 0 grátis, cor, Caos curinga ao estoque, sem pagar não bane, 1/2/3 por Fúria no começo | p. 14 | confere; exemplo resolvido refeito do exemplo da p. 14 |
| Faces dos dados 0/1/2 | p. 8 | confere |
| Ação da Cidade uma vez por turno; destino dos gastos | p. 15 | confere |
| Traduzir: passos A a E; última página | p. 15 e 16 | confere; figura p. 15 confirma "mais à esquerda da fileira" |
| Habilidades dos 6 personagens | p. 3 (camada de texto) e p. 5 | confere, parafraseadas |
| Habilidade sem ação, várias vezes | p. 17 | confere |
| Rerrolagens da Trilha de Delírio | p. 6 e 12 | confere |
| Selar um Portal: condições, 1 local por ação, dados até 3, soma, tentáculo ou Caos | p. 16 e 17 | confere; exemplo da p. 17 (1+2+2=5 >= 4) |
| Segunda Fase: todas as ações menos Traduzir; atravessar o GA | p. 16 e 17 | confere |
| Selar uma Cor | p. 17 | confere |
| Solo e variantes (resumo) | p. 18 a 21 | confere |

Contas refeitas em `contas.py` (scratchpad): todas as do texto batem.

## 2. Regras classificadas como interpretação ou lacuna

- [I] Quantos tentáculos tirar: p. 10 diz "dois", p. 11 manda o número da Trilha de Força. Seguida a p. 11.
- [I] Destino dos Ancestrais da Trilha de Energia Amaldiçoada: p. 8 (Descarte) contra p. 10 e 11 (bolsa). Seguidas p. 10 e 11.
- [I] Alcance dos Poderes: p. 8 ("Carta de Cidade indicada pela Roleta") contra p. 23 e o texto dos Poderes (a partir do GA). Seguida a p. 23.
- [I] Um giro da Roleta por Rastejador na preparação.
- [I] Só se traduz Carta de Página virada para cima (apoio na regra do Assistente, p. 20).
- [I] Maldição da Trilha de Rastejadores move um único Ancestral da carta.
- [L] Fileira de número do Necronomicon já cheia (30 cartas, 25 espaços).
- [L] De que espaço da Trilha de Loucura sai o tentáculo coletado.
- [L] Rastejadores restantes descem na trilha depois de um banimento?
- [L] GA chega ao local do jogador durante o 1º Passo do próprio jogador.
- [L] Para onde vai a Carta de Página descartada por Yog-Sothoth.
- [L] Ações da Cidade das 10 faces das Cartas de Cidade e número de espaços da Trilha de Delírio: impressos nos componentes, não no manual; o tutorial manda ler na carta/tabuleiro.

## 3. O que ficou fraco

- O manual não lista as Ações da Cidade; o tutorial não pode ensiná-las, e elas pesam nas decisões.
- O exemplo resolvido do primeiro turno usa cartas A a D sem nomes reais.
- As figuras mantêm rótulos curtos do manual dentro do diagrama (setup, banimento); conferir se o editor aceita.
- Sem teste de execução e sem auditor de regras independente ainda: as contradições internas do manual (p. 8 x p. 10/11/23) merecem segunda leitura, de preferência com o manual original em inglês.
