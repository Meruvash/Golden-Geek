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

## Auditoria independente: partida simulada

Partida de 2 jogadores montada e jogada só com o tutorial (preparação, 1ª rodada completa: giro, Ação do Ponteiro, compra de 3 tentáculos, surgimento, movimento do Grande Antigo, 3 ações por jogador, passagem da bolsa), e depois o Modo Solo. Manual consultado só depois, para cada lacuna. Veredito: dá para jogar a partida de 2 a 4 com o tutorial; o solo só ficou jogável depois da correção abaixo.

| # | Lacuna na simulação | Resolução no manual | Correção no tutorial |
|---|---|---|---|
| 1 | Modo Solo: o texto dizia que o Assistente "segue uma ordem fixa de ações", sem dizer qual; impossível jogar o turno dele | p. 18 a 20: ordem Mover-se (caminho mais curto ao Ponteiro Frontal; na Segunda Fase, ao Ponteiro de Tentáculo), Comprar 1 por Rastejador, Revelar página, Selar (2ª fase), Traduzir, Banir (sempre tenta); coleta Ganância > Fúria > Medo, sem maldição; rerrola tudo ao falhar; ações extras via Caos | Bloco "Modo de Partida Solo" reescrito com o turno do Assistente e as ações extras |
| 2 | Tamanho das Trilhas de Loucura e de Rastejadores não informado; o exemplo do 1º turno ("2 de Medo enchem a trilha") e o exercício ("os 4 Tentáculos do Medo") dependiam disso | Figura da p. 7: 3 espaços em cada Trilha de Loucura e na Trilha de Rastejadores (o texto não dá número) | Frase na descrição da Carta de Cidade; exemplo do 1º turno explica que a trilha azul já tinha 1 da preparação |
| 3 | Na preparação, o giro de um jogador pode cair na carta do Grande Antigo, e o tutorial proíbe parar ali na Primeira Fase | p. 4 não restringe a colocação; a proibição é da ação Mover-se (p. 13), e quem começa o turno com o GA no local sai com a 1ª ação | Nota no passo 7 da preparação |
| 4 | "Passe a bolsa para a esquerda": direção não citada com página | p. 17: ao próximo jogador em sentido horário | Passo 5 do primeiro turno e passo 6 da folha de consulta |

Sem lacuna na simulação: ordem do 1º Passo, contagem de tentáculos pela Trilha de Força, destino de cada tipo de tentáculo, maldições, ações e seus valores, Ação da Cidade 1 vez por turno (p. 15), fim da partida. Seguem em aberto as lacunas [L] já listadas acima (o manual não as resolve); acrescento uma: o manual não diz se, num mesmo Mover-se, o jogador pode mudar de direção.

## Auditoria independente: regras

Manual conferido: PDF da edição brasileira v1.0 (pdftotext -layout; p. 5, 8 e 9 renderizadas para as figuras: Trilha de Energia com 2 espaços, Trilhas de Loucura com 3, faces dos dados cabeça = 0, um tentáculo = 1, dois = 2, Trilha de Força 3 3 3 4 4 4 5 5 e, no verso, 4 4 4 4 5 5 6 6; Portais 3 e 4 por cor).

**As três contradições do manual (confirmadas):**
- Tentáculos por giro: p. 10 diz "compre dois tentáculos"; p. 11 manda o número à direita do Meeple de Força, com exemplo (último 3 → compre 4). ok: o [!edicao] segue a p. 11; o espaço inicial dá 3.
- Ancestrais da Trilha de Energia Amaldiçoada: p. 8 manda "para o Tabuleiro de Descarte"; p. 10 (Realocação: Ancestrais para a bolsa) e p. 11 (todos os Ancestrais + Descarte para a bolsa). ok.
- Alcance dos Poderes: p. 8 fala da "Carta de Cidade indicada pela Roleta"; p. 23 fala da carta "em que o Grande Antigo está", e o texto de cada Poder diz "a até um espaço/uma Carta de Cidade de" o Grande Antigo. ok.

**As três interpretações do redator:**
- Um giro por Rastejador na preparação: não está confirmado. A p. 4 diz "Gire a Roleta da Loucura uma vez para cada um dos seguintes meeples" e "Coloque 1 Rastejador por jogador", e as duas leituras cabem (a figura da p. 5 não decide). Fica como leitura do guia. Corrigido: o [!edicao] agora cita as duas frases e as duas leituras ("O manual manda girar 'uma vez para cada um' dos meeples. Este guia lê…" → "...sem dizer se os Rastejadores saem de um giro só, todos na mesma carta, ou de um giro cada. Este guia lê um giro para cada Rastejador, porque cada um é um meeple.").
- Só se traduz página virada para cima: a p. 15 diz só "no seu local atual". O apoio está na regra do Assistente, que só traduz página "virada para cima" (p. 20), e nas regras de virar páginas (p. 13 e p. 5). Já estava num [!edicao] explícito, e o passo a passo de Traduzir não afirma a regra como certa. ok, mantido.
- Maldição da Trilha de Rastejadores tira um Ancestral: a p. 12 diz no singular "Mova o Tentáculo Ancestral da Carta de Cidade para o Tabuleiro de Descarte. Então pegue um novo Tentáculo Ancestral do estoque geral e coloque-o na Carta de Cidade. Se não houver mais... deixe-o vazio". O fluxograma da p. 22 também traz as duas setas (Carta de Cidade > Descarte; Estoque geral > Carta de Cidade). ok: é a letra do manual, e não precisa de [!edicao].

**Demais itens** (todos ok, salvo o indicado):
- Preparação p. 4 e 5: Roleta, Cidades de lado sorteado, Nyarlathotep, Força no espaço sem número, Cérebro embaixo, Necronomicon, 5 Páginas viradas para baixo, 15 Rastejadores, Grande Antigo com a Página virada para cima, jogadores no Ponteiro Frontal, 3 Ancestrais + 9 de cada cor na bolsa, Ancestral volta para a bolsa no passo 12. ok.
- Contas de componentes refeitas: Loucura 9+3+3 = 15 por cor (45 no total); Ancestrais 3 + 5×3 + estoque 5 = 23; Caos 2p 2×2+10+3 = 17, 3p 3+1+10+3 = 17, 4p 4+10+3 = 17. ok.
- Corrigido (passo 6 de "Monte a mesa", p. 4): "3 no Tabuleiro de Descarte" → "3 de cada cor no Tabuleiro de Descarte".
- 1º Passo (p. 10 a 12): duas voltas, linha = próximo local em sentido horário, os 4 ícones das Ações do Ponteiro, destino de cada tentáculo, surgir na cor da borda interna, ordem azul → vermelho → verde → azul, bolsa vazia, Grande Antigo vai para a carta do Rastejador. ok.
- Tabela de maldições (p. 9 a 12), incluindo sobra para a trilha recém-esvaziada e "só uma trilha, não as três". ok.
- Poderes (p. 23), texto de cada Grande Antigo e ordem de dificuldade (p. 3 e 23); Modo Difícil +1, Loucura +2. ok.
- Ações (p. 12 a 17): Medo 1/2/3, Ganância 1/2/3, máximo 2 por Trilha de Temperamento, coletar não amaldiçoa, parar em carta com Rastejadores tira 1 por Rastejador, Banir (maior dado, sem somar, tudo zero grátis, Caos como curinga ao estoque geral, Fúria no começo do banimento dá 1/2/3), Ação da Cidade uma vez por turno, Traduzir (passos A a E, bônus de Caos), última página, Grande Antigo no seu local no início do turno, Habilidades das 6 personagens (p. 3 e 5), habilidade sem ação. ok.
- Segunda Fase e fim (p. 16 a 18): atravessar o Grande Antigo, condição de tentar, 1 local por ação, até 3 dados, soma ≥ número, tentáculo da cor ou Caos, todas as ações menos Traduzir, Selar uma Cor, três derrotas e uma vitória. ok.
- "Passe a bolsa" (p. 17): já estava "ao próximo jogador, em sentido horário" quando conferi. ok.
- Exemplos refeitos: 1º turno (2 Medo + 1 da preparação = 3, trilha cheia; no turno seguinte 3+1 = 4 ao Tabuleiro de Rastejadores); 4 tentáculos com "mais 1"; 2 Ancestrais enchem a Energia, o 3º amaldiçoa; Banir 1 e 2 → custo 2, move 2 Fúria; Selar 1+2+2 = 5 ≥ 4; 1+2 = 3 ≥ 3; 0+2+1 = 3 < 4; 2,1,0 → custo 2. ok.
- Exercícios: em todos os 22 itens de múltipla escolha a opção certa está certa pelo manual e as erradas estão erradas. ok.
- Solo e variantes (p. 18 a 21), resumo. ok. Termos impressos (Ponteiro Frontal, Ponteiro de Tentáculo, Tabuleiro de Rastejadores, Tabuleiro de Descarte, Trilha de Delírio, Trilhas de Temperamento, Bolsa de Compra de Tentáculos, Selar um Portal, Selar uma Cor). ok.

**Veredito:** APROVADO COM CORREÇÕES (uma contagem ambígua na preparação e um [!edicao] reescrito para mostrar as duas leituras).

## Seção de montagem (04/11/2026)

Pedido do editor: seção `## setup. Montar a mesa passo a passo` antes do "Comece a jogar", seguindo a "Preparação" (p. 4) na mesma ordem e o diagrama da p. 5. Manual baixado de novo da biblioteca da Asmodee Brasil (arquivo id 3045; o endereço com `group=b2` do dossiê agora responde 404, o mesmo arquivo veio com `group=b2c`, num zip com `TNE151_regras_v1.0.pdf`, 24 páginas, título interno `TECth_Rulebook Sarah V4 Edit_pt-BR_v1.01.indd`, criado em 24/04/2025, modificado em 08/04/2026, igual ao do dossiê). Texto em `scratchpad/setup/tiny-epic-cthulhu/manual.txt`; p. 3 a 5 e 18 lidas também como imagem.

- **Passo a página:** componentes (p. 3); passos 1 e 2 (p. 4, 1 e 2); 3 e 4, Grande Antigo e Meeple de Força (p. 4, 3 e 3A); 5 e 6, jogadores e Ficha de Cérebro (p. 4, 4 e 4A); 7 e 8, Necronomicon e Fichas de Página (p. 4, 5 e 5A); 9 e 10, Cartas de Página (p. 4, 6 e 6A); 11, Rastejadores (p. 4, 7 e 7A); 12, Descarte (p. 4, 8); 13, dados (p. 4, 9); 14 a 16, os giros (p. 4, 10 e 10A a 10C); 17 a 20, tentáculos (p. 4, 11A a 11E); 21, Caos (p. 4 e 5, 11F a 11H); 22, 2 Tentáculos da Loucura por Carta de Cidade (p. 5, 12). Quem começa (p. 6). Solo (p. 18). Dificuldade (p. 3).
- **Contas refeitas em Python:** Caos distribuído: 2 x 2 + 0 = 4 (solo e 2), 1 x 3 + 1 = 4 (3), 0 + 4 = 4 (4); com 10 no Necronomicon e 3 no estoque, 17 nas três contagens. Tentáculos da Loucura: 27 + 9 + 9 = 45; na bolsa depois do passo 22, 27 - 10 = 17. Ancestrais: 3 + 15 + 5 = 23. Cartas de Página no baralho: 30 - 5 = 25. Rastejadores na cidade = número de jogadores (2 no solo, que se prepara como para 2, p. 18); Tabuleiros de Jogador na caixa, 6 - 2 = 4, 6 - 3 = 3, 6 - 4 = 2.
- **Interpretado:** um giro para cada Rastejador (passo 15), como já explicado no `[!edicao]` da Etapa 1 (p. 4). A coluna "Tabuleiros de Jogador que voltam à caixa" lê "Coloque os componentes de jogador restantes na caixa" (p. 4, passo 4) com 6 tabuleiros na caixa (p. 3).
- **Figuras novas** (só a parte gráfica; rótulos e números de passo do manual cortados ou cobertos com a cor do fundo): `setup-roleta-cidades.webp` (Cartas de Cidade e Roleta, p. 3, com o canto da bolsa e o começo do rótulo "1 Bolsa" cobertos); `setup-grande-antigo.webp` (Tabuleiros e meeples dos Grandes Antigos e Meeple de Força, p. 3); `setup-jogadores.webp` (quatro Tabuleiros de Jogador, p. 5, e as Fichas de Cérebro, p. 3); `setup-necronomicon.webp` (Necronomicon, p. 5, e uma Ficha de Página, p. 3); `setup-paginas.webp` (Cartas de Página, p. 3); `setup-rastejadores.webp` (Tabuleiro de Rastejadores, p. 5, sem o título e o número 11C); `setup-descarte.webp` (p. 3); `setup-dados.webp` (p. 3); `setup-bolsa.webp` (os 27 Tentáculos da Loucura, p. 5, a bolsa e um Ancestral, p. 3); `setup-tentaculos-cidade.webp` (passo 12 do manual, p. 5, sem o rótulo). Reaproveitada: `preparacao.webp` (p. 5). Foto oficial `fotos/mesa-1.webp`, crédito de `fotos/fontes.json` ("Imagem: Gamelyn Games · edição Deluxe"), com aviso de que é a edição Deluxe.
- **Passos sem ilustração própria no manual:** o Meeple de Força já no espaço sem número (passo 4) e a Ficha de Cérebro na Trilha de Delírio (passo 6) só aparecem na figura geral; as Cartas de Página ao lado das Cartas de Cidade (passo 10) e os três giros da Roleta (passos 14 a 16) aparecem só no diagrama geral da p. 5, com setas e rótulos, e não foram recortados à parte; os tentáculos nos Tabuleiros de Rastejadores e de Descarte (passos 18 e 19), os Ancestrais nas Cartas de Cidade (passo 20) e a distribuição do Caos por número de jogadores (passo 21) estão no diagrama de 4 jogadores, misturados com rótulos; o manual não ilustra a montagem de 2 ou 3 jogadores nem a do Assistente no solo. Esses passos ficam com texto e com a figura geral.
- **Comece a jogar:** "Monte a mesa" virou um resumo de 5 itens que aponta para a nova seção; `checar_comece.py` aprovado; `vicios.py` sem aviso; zero travessão. `publicar` não foi alterado.
