# Auditoria: Como Jogar Santuário

Entrega 3. Autoverificação feita por quem escreveu o tutorial, em 31/10/2026. **Não é auditoria independente:** por decisão do editor, o auditor de regras e o teste de execução serão feitos depois, por outros agentes. Tudo o que está aqui tem o viés de quem escreveu.

## 1. Fontes efetivamente usadas

- **Usada:** manual oficial em inglês da Capstone Games, "Sanctuary_Rules_Print_Capstone_EN_V1_Web.pdf", 8 páginas, criado em 08/12/2025, baixado em 31/10/2026 (dados completos no dossiê, seção 2). Lido em texto (`pdftotext`, com e sem `-layout`) e em imagem (todas as páginas a 80 dpi; recortes a 200 e 250 dpi das p. 1, 3, 4 e 7).
- **Usada só para vocabulário:** a página do produto na loja da Grok Games ("edifícios", "objetivos de conservação") e a resenha `conteudo/santuario.json`.
- **Não obtidas:** manual em português (não publicado pela Grok), Glossário das peças, folhas de ajuda, regras do modo solo, FAQ e errata. Nenhuma outra fonte de regra foi usada.

## 2. Portões automáticos

| Portão | Resultado |
|---|---|
| `python3 tools/checar_comece.py docs/como-jogar/santuario/tutorial.md` | ✅ seção Comece a jogar dentro da diretriz (rodadas: 959, 843, 807 e 799 palavras; corrigido até passar) |
| Travessão e meia-risca no tutorial | 0 |
| `VICIOS` de `tools/vicios.py` no tutorial inteiro | 0 (havia 1 ocorrência em Situações especiais; reescrita) |
| Exclamação fora das marcas de bloco | 0 |
| Citações de página | 50, todas entre p. 1 e p. 8 |
| Palavras do tutorial | cerca de 5.800 (limite 3.500 a 6.000) |
| Seções | 4min, 0, 1, Etapas 1 a 5, Situações especiais, Avaliação final, Para consultar, Fontes; respostas em "### Respostas da etapa N" e "### Respostas da avaliação" logo após cada bloco de perguntas |
| Prévia com `tools/como_jogar_md.pagina()` (gerada no scratchpad, fora do repositório) | renderiza; "Leitura do essencial" calculada em cerca de 10 min |

## 3. Contas refeitas em Python

Script: `scratchpad/santuario_calc/contas.py` (fila de cartas pela regra da p. 6; força pela p. 3; valores dos marcadores de conquista pela ilustração da p. 7; pontuação pela p. 8). Saída conferida com o texto:

| Exemplo | Conta do script | No tutorial |
|---|---|---|
| 4min, resolvido | Rocha no encaixe 4: força 4, nível 3, pode; fila depois: Rocha, Projetos, Água, Floresta; alcance seguinte 2 | igual |
| 4min, Complete | alcance 2; Água força 4, nível 4, pode; fila: Água, Floresta, Projetos, Rocha; alcance seguinte 3 | igual |
| Reposição da vitrine | posição 1 tirada: B a F descem para 1 a 5, nova na 6; exemplo da p. 8 (tira 2 e 5): 1, 3, 4, 6, nova, nova | igual |
| Etapa 2, resolvido | Projetos no 3 usada: Projetos, Rocha, Floresta, Água; Rocha 2, Floresta 3, Água 4 | igual (e igual ao exemplo da p. 6) |
| Etapa 2, Complete | Água lado II no encaixe 3: força 4; 2 + 2 cabe; 3 + 2 não | igual |
| Etapa 2, Sua vez | Floresta no 3: força 3 < 4; Rocha no 4: força 4; usando Rocha, Projetos vai ao 3 | igual |
| Etapa 2, treino | a) Floresta, Rocha, Projetos, Água; b) sem mudança; c) 3 | igual |
| Etapa 4, resolvido | devolver 1 marcador: 4×, 10; guardar: 3× + 2 = 9 | igual |
| Etapa 4, Complete | 14 + 2 × 2 = 18 | igual |
| Etapa 5, resolvido | 21 + 9 + 7 + 4 = 41; 5 + 7 + 10 = 22; 3 × 2 = 6; + 10 = 79 | igual |
| Etapa 5, Complete | 48 + 7 + 14 + 2 + 5 = 76 | igual |
| Etapa 5, Sua vez | 49 + 12 + 4 = 65 | igual |
| Avaliação 5 | 1 + 3 = 4, cabe o 4× | igual |

## 4. Verificação regra por regra

Cada afirmação normativa do tutorial, com a regra do dossiê e a página conferida. "OK" quer dizer que reli o trecho no PDF depois de escrever.

| Afirmação no tutorial | Onde | Regra | Página | Situação |
|---|---|---|---|---|
| Peças embaralhadas viradas para baixo, em uma ou mais pilhas | 4min, Etapa 1 | R4 | 1 | OK |
| 6 peças na vitrine, uma por número; lugar para descarte | 4min, Etapa 1 | R5 | 1 | OK |
| 5 das 10 metas; as outras à caixa; sugestão de agrupar | 4min, Etapa 1 | R7 | 1 | OK |
| Marcadores de conservação, bolsa, fim em reserva | 4min, Etapa 1 | R6 | 1 | OK |
| Mesmo lado dos tabuleiros; lado 1 na primeira | 4min, Etapa 1 | R8 | 1 | OK |
| Cartas no lado I | 4min, Etapa 1 | R9 | 1 | OK |
| Projetos do 1º no encaixe 1, seguintes 2, 3, 4; outras ao acaso | 4min, Etapa 1 | R10 | 1 | OK |
| 5 jogadores: 4º e 5º no encaixe 4 | Etapa 1 `[!mais]` | R11 | 1 | OK |
| 4 melhorias e 4 conquistas da cor, viradas para cima | 4min, Etapa 1 | R12 | 1 | OK |
| Ninguém começa com peças; suporte = mão | 4min, Etapa 1 | R13 | 1 | OK |
| Primeira partida sem o 4×; fim no terceiro | Etapa 1 e 5 `[!mais]` | R14 | 1 | OK |
| Força = seta; lado I = número do encaixe; lado II +1 | 4min, Etapa 2 | R33 | 3 | OK (o "número do encaixe" é leitura da ilustração da p. 3: encaixes marcados 1-2, 2-3, 3-4, 4-5) |
| Passo 1: alcance pela seta da carta de Projetos; com 1, só a posição 1; não move a carta | 4min, Etapa 2 | R35 | 4 | OK |
| Alcance só no passo 1 | 4min `[!atencao]`, Etapa 2 | R36 | 4 | OK |
| Projetos lado II aumenta o alcance | Etapa 2 (lado II), treino c, consulta | R37 | 3, 4 | OK (reclassificada como verificada na rodada 2, seção 8) |
| Ganhar: Projetos 1 peça qualquer (2ª no lado II); Animais 2 do topo | 4min, Etapa 2 | R39, R40 | 4 | OK |
| Jogar Projeto: força ≥ nível | 4min, Etapa 2 | R41 | 5 | OK |
| Jogar Animal: carta do habitat; indefinido com qualquer; força ≥ nível | 4min, Etapa 2 | R42 | 5 | OK |
| Lado II: 1 ou 2 Animais, soma dos níveis; efeitos do 1º antes do 2º | Etapa 2 | R42 | 5 | OK |
| Prédio nunca com carta de ação | 4min, Etapa 2 | R43 | 6 | OK |
| Usada vai ao encaixe 1; as da esquerda deslizam; se já no 1, nada muda | 4min, Etapa 2 | R43a | 6 | OK |
| Casa vazia vizinha da entrada ou de peça; impressos não contam | 4min, Etapa 3 | R25 | 3 | OK |
| Primeira peça: 3 casas junto à entrada | 4min resolvido | R26 | 3 | OK |
| Sem girar | 4min, Etapa 3 | R27 | 3 | OK |
| Bônus de colocação na hora, também para espaço livre | 4min, Etapa 3 | R28 | 3 | OK |
| Setas: espaço livre existente ou peça da mão virada; nunca para peça aberta ou fora | 4min, Etapa 3 | R22, R31 | 2, 3 | OK |
| Efeito com raio uma vez; infinito ativo na hora, inclusive para a própria peça | 4min, Etapa 3 | R18 | 2 | OK |
| Vários efeitos: ordem livre | Etapa 3 | R43b | 5 | OK |
| Casal: 1 marcador de conservação | Etapa 3 | R20 | 2, 5 | OK |
| Rio: 3 casas de cada borda | Etapa 3 `[!mais]` | R29 | 3 | OK |
| Soltura na natureza: sobre Animal com o ícone; ele deixa de contar | Etapa 3 `[!mais]` | R41 | 5 | OK |
| Espaço livre colocado conta como vizinho | Etapa 3 `[!mais]` | R32 | 3 | **[interpretada]** |
| Descarte virado para cima | Etapa 3 `[!atencao]` | R30 | 3 | OK |
| Prédio: exatamente 1, condição cumprida ou cumprível, casa que satisfaça | Etapa 4 | R45 | 6 | OK |
| Meta: 1 por turno, não apoiada; marcadores de conservação valem 1 ícone; 1 ícone real; conquista de número ≤ total, virada para baixo | Etapa 4 | R46, R48 | 7 | OK |
| Valores 5, 7, 10, 14 | Etapa 4 (tabela), consulta | R47 | 7 (ilustração) | OK |
| Melhorias: 4 condições; várias no mesmo turno; marcador virado | Etapa 4 | R49 | 7 | OK |
| Limite de 6 no fim do turno; vitrine desce e completa; conferir fim | 4min, Etapa 4 | R50 | 8 | OK |
| 3 condições de fim, conferidas no fim do turno | 4min, Etapa 5 | R44 | 8 | OK |
| Quem dispara: 10 pontos e não joga mais; os outros, 1 turno | 4min, Etapa 5 | R51 | 8 | OK |
| 5 pontos para quem cumprir no último turno | Etapa 5 | R53 | 8 | OK |
| Pilha vazia depois do disparo: embaralhar o descarte | Etapa 5 | R52 | 8 | OK |
| Pilha vazia antes: acaba após aquele turno | 4min, Etapa 5 | R54 | 8 | OK |
| Pontuação: peças (ordem), conquistas, 2 por bolsa e conservação, fim | Etapa 5 | R55 | 8 | OK |
| Espaço livre 1 ponto | Etapa 3, Etapa 5 | R23 | 2 | OK |
| Espaços livres impressos valem 1 | Etapa 5 `[!mais]` | R24 | 1, 2 | **[interpretada]** |
| Empate: mais Animais; depois, divide | Etapa 5 | R3 | 8 | OK |
| Solo: 5 por marcador solo; regras fora do manual | Etapa 5 `[!mais]` | R56 | 8 | OK, **[lacuna]** para o modo |
| Bolsa: como ganhar | Situações especiais | L1 | 2, 8 | **[lacuna]**, dito como lacuna |
| Pilha acaba no meio de compra ou reposição antes do disparo | Situações especiais | L3 | 8 | **[lacuna]**, "combine com a mesa" |
| Bônus e pontuação de cada peça | 4min, Etapa 3, Situações especiais | L2, R19, R28 | 2, 3 | **[lacuna]**, o tutorial remete ao Glossário |

**Regra que ficou fora:** nenhuma regra do manual de 8 páginas ficou fora. Ficaram fora, por não estarem nele: o efeito de cada bônus e a pontuação de cada peça (Glossário), o modo solo e o número de marcadores de 5 pontos (L4, não mencionado no tutorial).

## 5. Interpretações e lacunas

- **R37, alcance no lado II.** Na primeira versão estava como interpretada; o auditor de regras mostrou que sai direto das p. 3 e 4 (a seta é uma só). Agora é afirmação simples no passo a passo do lado II.
- **[interpretada] R32, espaço livre como vizinho.** A p. 3 só exclui os 2 impressos de contar como peça para a colocação. Concluí que os colocados contam. Dito como leitura do guia.
- **[interpretada] R24, espaços livres impressos valem 1.** A p. 2 diz que cada espaço livre do zoológico vale 1 e mostra um selo "1"; os impressos no tabuleiro têm o mesmo selo (ilustrações das p. 1 e 3). Dito como leitura do guia.
- **[lacuna] L1 a L5** (dossiê, 4.8): marcadores de bolsa, Glossário, pilha que acaba antes do disparo, quantidade de marcadores de 5, modo solo.

## 6. O que ficou fraco

- **Peças sem nome.** Os exemplos falam em "um Animal de Rocha de nível 3 sem setas" em vez de peças reais, porque o manual mostra poucas peças inteiras e o Glossário não foi obtido. É legal pelas regras, mas menos concreto que o leitor terá na mesa.
- **Nomes em português são nossos.** Se a caixa da Grok usar "edifícios", "objetivos", "cartas" com outro nome, o leitor terá de traduzir. A tabela "Caixa em inglês?" ajuda só quem tem a edição em inglês. Vale conferir uma caixa da Grok e trocar os termos.
- **Sem Glossário, a pontuação das peças fica genérica.** A etapa 5 ensina a ordem e as fontes de pontos, mas não ensina a calcular uma peça que pontua por vizinhança. Era o ponto que a resenha registra como confuso.
- **Seção de 4 minutos no limite.** Passou com 799 palavras. Foi preciso cortar o aviso de que, com uma peça só na mão, em geral não se cria espaço livre.
- **O Complete da etapa 5 tem conta sem decisão:** é prática de soma, não de escolha.
- **Nenhum teste com leitor.** Nem a simulação por outro agente foi feita ainda. Nada aqui mostra que uma pessoa aprende com o texto.

## 7. Próximos passos sugeridos

1. Auditor de regras independente com o tutorial e as 8 páginas do manual.
2. Teste de execução só com a seção de 4 minutos (montar para 2 e 5 jogadores, primeiro turno com mãos diferentes).
3. Obter o Glossário e as folhas de ajuda (Capstone ou Feuerland) para um exemplo de pontuação por vizinhança.
4. Conferir os termos da caixa da Grok.
5. Corrigir na resenha (decisão do editor): "peças de ação" e o fim pela pilha vazia (dossiê, seção 5).

## 8. Rodada 2: correções das duas auditorias independentes (31/10/2026)

Os achados chegaram pelo coordenador. Cada um foi conferido na página do manual antes de mudar o texto.

### Auditor de regras

| # | Achado | Conferência no manual | O que mudou |
|---|---|---|---|
| 1 | Condição do Prédio citada como "vizinho de 2 ícones de Floresta" | p. 6: "next to 2 tiles with a Forest icon" | "vizinho de 2 peças com ícone de Floresta" (etapa 4) |
| 2 | Seção 0 comparava com Ark Nova sem base no manual | p. 1: só "An Ark Nova Game" na capa | Seção 0 diz só que a capa apresenta o jogo como "um jogo da linha Ark Nova" |
| 3 | "nunca sai do lugar" / "nunca muda de lugar" | p. 3 só proíbe girar | Ficou só "nunca gira" (4min e etapa 3) |
| 4 | Prédio: "jogue exatamente 1" soava obrigatório | p. 6: "you may play exactly 1 such tile" | "pode jogar no máximo 1" |
| 5 | "Apoiar cedo garante a meta" sem base | p. 7: cada cor tem o próprio espaço sob a meta | Trocado por: esperar permite marcador maior; a primeira meta cumpre a melhoria 1 |
| 6 | Pilha vazia descrita como "na hora" em alguns lugares | p. 8: "the game ends immediately after your turn" | "ao fim daquele turno" no 4min, no Para entender, no passo a passo, no Atenção e na folha de consulta |
| 7 | Setas no 4min sem o espaço livre já existente | p. 2: setas podem usar espaços livres já no zoológico, inclusive os impressos | Incluído "ou um espaço livre que já esteja no tabuleiro, impresso ou colocado antes" |
| 8 | Ressalva excessiva sobre alcance no lado II | p. 3 e 4 | `[!mais]` removido; regra dita direto no passo a passo do lado II e na consulta |

### Teste de execução

| # | Achado | Conferência | O que mudou |
|---|---|---|---|
| 9 | "Passo 3" com sentidos diferentes | p. 4 (passos 1 a 6) | Uma só numeração em todo o texto: 1 peça, 2 carta, 3 Prédio, 4 meta, 5 melhoria, 6 manutenção. Listas internas das etapas viraram tópicos ("Passo 3, Prédio" etc.); itens da preparação são "item N" |
| 10 | Uma opção ou as duas na carta? | p. 4: "EITHER to gain tiles OR to play tiles" | "uma das duas opções, nunca as duas" no 4min, na etapa 2 e na consulta |
| 11 | "Seta" ambígua | p. 2 e 3 | "seta da carta de ação" (força; na de Projetos, também alcance) e "setas na borda da peça" (espaço livre) em todo o texto |
| 12a | Onde fica a entrada | Ilustrações p. 1 e 3: portão no meio da borda de baixo | "o portão na borda de baixo do tabuleiro" (4min e etapa 3) |
| 12b | Como reconhecer o habitat indefinido | Ícone na p. 5 (recorte a 300 dpi): círculo com faixas verde, cinza e azul | "ícone verde, cinza e azul" (4min, etapa 2) |
| 12c | "Apoiar uma meta" sem explicação no 4min | p. 7 | "(põe seus 4 marcadores de conquista sob elas)" |
| 12d | "(depois)" ambíguo | | Marca removida; o texto diz "Tudo isso fica para depois" e "para depois" junto dos marcadores |
| 12e | "1 peça qualquer da vitrine" (Projetos) | p. 4: "Take any 1 tile from the display. The position of the tile on the display doesn't matter." | O auditor sugeriu "até o seu alcance", o que contraria a p. 4. Ficou "1 peça de qualquer posição da vitrine (o alcance não vale aqui)" |
| 12f | Montagem punha as cartas e depois reposicionava | p. 1 B | Um só passo: cartas postas de uma vez, Projetos no encaixe da ordem de jogo, as outras ao acaso (4min item 4, etapa 1 item 6) |
| 13a | "Ligadas" e Prédio no marcador 3= | p. 7, exemplo: Tree House (Prédio) com as duas peças de Floresta vizinhas = "3 connected tiles with a forest icon" | "vizinhas umas das outras, em cadeia, com o ícone do habitat; um Prédio com o ícone conta" |
| 13b | Quem escolhe a carta a melhorar e se ela muda de encaixe | p. 7: "Choose 1 of your Action cards"; o exemplo mostra a força subir de 3 para 4 no mesmo encaixe | "escolha uma das suas cartas ainda no lado I, vire-a no mesmo encaixe" |
| 13c | Quem escolhe as peças descartadas | p. 8 não diz | `[!edicao]` curto: o manual não especifica; o guia supõe que é o dono da mão |
| 13d | "aquela casa não serve" | p. 2 | "a peça não pode ir naquela casa" (vale também para Prédios com setas, por isso "peça" e não "Animal") |
| 14 | Sinônimos | | "mão" (o suporte só na montagem, "que guarda a sua mão"); "tabuleiro" para o tabuleiro pessoal e "zoológico" para as peças jogadas nele (definido na seção 0); raio e infinito explicados uma vez, na etapa 3; marcador de conservação x marcador de conquista diferenciados na etapa 4; "Feche o turno" virou "Manutenção" (passo 6); "compre/comprar" virou "pegue as 2 do topo da pilha" |
| 15 | Pontuação depende do Glossário; marcador de bolsa | p. 2 e 8 | `[!edicao]` único na etapa 5: os pontos de cada peça estão nela e no Glossário da caixa; o manual não diz como se ganha marcador de bolsa. O parágrafo repetido em Situações especiais saiu |

### Não resolvido pelo manual

- Quem escolhe as peças descartadas no limite de mão (13c): o manual não diz; ficou como `[!edicao]`.
- Como se ganham marcadores de bolsa e quanto vale cada peça (15): continuam dependendo do Glossário, não obtido.
- Achado 12e não foi aplicado como sugerido, porque contraria a p. 4.

### Portões depois da rodada 2

- `checar_comece.py`: ✅, seção de 4 minutos com 798 palavras.
- Tutorial: 5.982 palavras (limite 6.000).
- Travessão e meia-risca: 0. Vícios de `tools/vicios.py`: 0. Exclamação: 0.
- Contas: `contas.py` rodado de novo, saída idêntica à da rodada 1 (nenhum exemplo numérico mudou).
