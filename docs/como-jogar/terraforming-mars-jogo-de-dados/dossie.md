# Dossiê: Como jogar Terraforming Mars: o Jogo de Dados

Produzido em 01/11/2026 pela skill `como-jogar`, seguindo `docs/como-jogar/BRIEF.md`. Jogo pedido pelo editor.

## 1. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual oficial da edição brasileira**, Meeple BR, *Terraforming Mars: O Jogo de Dados* | PDF de 12 páginas, arquivo `TM_DICEGAME_RULES_PT-BR.indd`, criado e modificado em 27/01/2023; tradução de Romir G. Paulino, revisão de Daniel Costa e Márcio Botelho | https://meeplebr.com/wp-content/uploads/2022/12/TM_DICEGAME_RULES_PT-BR.pdf, linkado na página oficial do produto | Baixado em 01/11/2026; robots.txt da Meeple BR libera tudo |
| Página do produto, Meeple BR | | https://meeplebr.com/product/terraforming-mars-o-jogo-de-dados/ | 1 a 4 jogadores, 45 minutos, maiores de 14 anos; componentes |
| API da Ludopedia (token do projeto) | jogo 26359 | | Edição nacional em 2023; 1 a 4 jogadores; designer Jacob Fryxelius |
| Manual original em inglês | não consultado | | Desnecessário: o manual brasileiro está completo e com texto pesquisável |
| FAQ ou errata oficial | nenhuma encontrada | | |

O PDF tem camada de texto (extraída com `pdftotext`, página por página, no scratchpad). As tabelas de dados, as trilhas e os ícones foram lidos nas ilustrações: p. 7 (cores e faces dos dados) e p. 2 (tabuleiro, renderizado a 400 dpi).

## 2. Terminologia

Os termos são os do manual brasileiro: estoque de dados, marcador curinga, peça, carta de projeto, carta de corporação, carta bônus, prêmios, marcos, trilha de PVs, caixa vermelha (bônus inicial), caixa marrom (produção), turno de produção, turno de ação, ação de suporte, ação principal, ação livre, parâmetros globais, oceano, floresta, cidade, peças especiais; recursos megacrédito, ciência, terra, planta, micróbio, animal, energia, água, oxigênio, aço, titânio, cidade, calor, evento, nuclear. O manual usa "vegetação" no resumo de ícones da p. 12 e "floresta" no texto; o tutorial usa só "floresta". O manual diz "adjacente"; o tutorial diz "vizinha".

## 3. Base de regras

`[V]` verificada no manual nesta sessão; `[I]` interpretada; `[L]` lacuna.

| Regra | Página | Cl. |
|---|---|---|
| Visão geral; 2 PVs por terraformação; fim com 2 de 3 parâmetros; mais PVs vence | 2 | V |
| Preparação em 11 passos (tabuleiro, cubos em 0% e -32 °C, 7 oceanos; estoque; projetos; cartas bônus 4/6/8; prêmios com 3 dados sorteados de 5; 3 marcos; primeiro jogador; 5 projetos e 2 corporações; caixa vermelha coberta com a peça da cor; caixa marrom rolada; penalidade do primeiro jogador) | 3 | V |
| Turno: produção ou ação | 4 | V |
| Produção: até 3 dados (curingas não são dados); descarte opcional; completar mão até 5; caixas marrons; azuis voltam | 4 | V |
| Curingas ficam com o jogador na produção, fora do limite de 3 | 4 | I (o manual diz só que curingas não são dados; anotado no tutorial com [!edicao]) |
| Ação: 1 suporte e depois 1 principal; listas de ações | 4 | V |
| Ação livre de carta azul | 5 | V |
| Jogar carta: pagar exatamente; curinga paga qualquer recurso; efeitos em qualquer ordem; impossível é ignorado | 5, 10 | V |
| Verde, vermelha, azul: o que acontece e como guardar | 5 | V |
| Sem re-rolagens | 6 | V |
| Parâmetro completo ainda dá 1 PV | 6, 8 | V |
| Peças: 1 por área; bônus da área; oceano em área azul; floresta 1 PV por cidade vizinha e sobe oxigênio; cidade não vizinha de cidade, 2 PVs + 1 por floresta vizinha; peças especiais | 6 | V |
| Bônus nas trilhas de oxigênio e temperatura | 6 (níveis na p. 11) | V |
| Trilhas: temperatura -32 °C a +8 °C de 4 em 4; oxigênio 0% a 16% de 2 em 2 | ilustração p. 2 | V (lido na ilustração) |
| PVs com fita verde na hora, fita vermelha no fim | 6 | V |
| Fim: segundo parâmetro aciona; todos jogam último turno | 6, 8 | V |
| Carta bônus em 5 e 12 PVs, no fim do turno; escolhe entre todas e joga grátis; conta para marcos | 7 | V |
| Cores e faces dos dados | 7 (ilustração) | V |
| Ícones: dado de cor, dado branco, interrogação, girar dado, curinga, borda vermelha | 7 | V |
| Falta de dados: 1 curinga na produção; perdido no resto | 4, 7 | V |
| Pontuação final: prêmios 5/3, empates amistosos, 2 jogadores sem segundo; marcos 4; PVs de cartas; desempate por produção de dados | 8 | V |
| Partida solo | 9 | V |
| Era das Corporações (inclusa) e pacote promocional (à parte); desconto, efeito, borda vermelha em peças, produção de curingas e PVs, estoque maior | 10 | V |
| Cartas que precisam de explicação; regra do SE | 10, 11 | V |
| Lista dos 11 marcos | 12 | V |
| Efeito exato de cada bônus das trilhas | ilustração p. 2 | L (o tutorial diz só "receba o bônus impresso") |
| O que são os "4 Tabuleiros de Jogador" da lista de componentes da loja | | L (o manual não os menciona; o tutorial não os cita) |

## 4. Plano

Quatro etapas: (1) montar a mesa e ler os dados; (2) turno de ação, com as cores de carta; (3) turno de produção e a escolha do momento; (4) terraformação, peças e pontuação. Regras de caso especial em blocos `[!mais]`, conforme "Como Jogar: essencial à vista". Exercícios em múltipla escolha (BRIEF). Exemplos com custo de carta inventado são marcados como "custo de exemplo"; nenhuma carta inventada é citada pelo nome. Contas refeitas em `contas.py` no scratchpad: floresta vizinha de 1 cidade = 3 PVs; cidade com 2 florestas = 4; floresta com oxigênio completo = 1; prêmio com empate no primeiro (5, 5, nada); pontuação 31 + 5 + 3 + 4 + 6 = 49; Complete 27 + 5 + 8 + 3 = 43.
