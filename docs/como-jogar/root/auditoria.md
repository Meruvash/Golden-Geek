# Auditoria: Como Jogar Root (autoverificação)

Autoverificação do redator, em 08/11/2026. A auditoria independente fica para outro agente; por isso o JSON está com `"publicar": false`. O texto extraído do manual, página por página, está em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1106/root/raw/` (`Learn-pNN.txt` = Aprenda a Jogar, `Law-pNN.txt` = Leis de Root, `Walking-pNN.txt` = Passo a Passo) e, com layout, em `.../d1106/root/txt/`.

## 1. Fontes usadas e não obtidas

Usadas: Aprenda a Jogar (Meeple BR, 2021), As Leis de Root (Meeple BR, 8ª versão, 09/12/2022), Passo a Passo (só a figura da p. 3) e a página do produto. Não procuradas: errata separada (a 8ª versão das Leis já incorpora mudanças) e o manual em inglês (desnecessário). Nenhuma fonte de comunidade foi usada como regra.

## 2. Conferência regra por regra (tutorial contra o manual)

| Trecho do tutorial | Regra do dossiê | Conferido em | Resultado |
|---|---|---|---|
| Componentes (tabela) | R15 | Leis B.1.1 a B.1.5, p. 18 | OK. "Marcadores de pontuação 4 / de relação 3" conferido |
| Quais facções entram | R1, R2, R5 | p. 4, p. 22, Leis 5.2 | OK |
| Passo 1 (facções, sorteio) | R3 | p. 4; Leis 5.1.1 | OK |
| Passos 2 a 6 | R4 a R8 | p. 4; Leis 5.1.2 a 5.1.6 | OK. 12 itens: 2+2+1+1+2+2+2 = 12 |
| Passo 7 (ordem) | R9 | p. 4 | OK |
| Passos 8 a 12 (Marqueses) | R10 | Leis 6.3 | OK. 25 − 11 = 14 guerreiros no suprimento (conferência final) |
| Passos 13 a 17 (Rapinas) | R11 | Leis 7.3 | OK. "Com os Marqueses na mesa, é o canto oposto à Torre" é dedução: o único canto que não é inicial de outro e é oposto a um canto inicial. [I] |
| Passos 18 a 21 (Aliança) | R12 | Leis 8.3 | OK |
| Passos 22 a 25 (Malandro) | R13 | Leis 9.3 | OK |
| O que volta para a caixa | R5, R13, R16 | Leis 5.1.3, 9.3.5; p. 23 | OK. "Tabuleiros e peças das facções fora da partida" é implícito no passo 1 [I] |
| Quem começa | R3, R17 | Leis 5.1.1, 1.4.1 | OK |
| Pergunta do setup | R10 | Leis 6.3.3 | OK |
| 4 min: ideia, governar, mover, cartas | R17 a R19, R23, R72 | p. 2, 5, 6 | OK |
| 4 min: Anoitecer padrão | R25 | p. 11 | OK; Rapinas pontuam antes, Malandro compra por Moedas (etapas 3 e 4) |
| 4 min: tabela das facções | R37 a R39, R46, R47, R57, R59, R60, R66, R67 | p. 10, 12, 15 a 18 | OK, resumo |
| 4 min: exemplo resolvido (Marqueses) | R37, R40, R41, R39, R25 | p. 4, 10, 11 | Jogada legal se a clareira governada com local livre estiver ligada à serraria por clareiras dos Marqueses; o texto diz isso. Erguer serraria na 2ª coluna: custo 1, 1 PV (script) |
| 4 min: complete (Decreto) | R46 | p. 12 | OK |
| 4 min: sua vez (mover) | R18, R19 | p. 5; Leis 2.5, 4.2.1 | OK: 2 contra 3 não governa; vazia não é governada |
| Como a partida acaba | R72, R36, R27 | Leis 3.1, 3.2 | OK |
| Erros caros | R18, R19, R23 | p. 5, 6 | OK |
| Antes de tudo (2 a 4, 14+, 60 a 90 min) | ficha | página do produto | OK |
| Etapa 1, passos | R18 a R25 | p. 5, 6, 11; Leis 2.1, 2.5, 4.2.2 | OK |
| Etapa 1, Criar e `[!mais]` | R22, R26 a R28 | p. 6, 7; Leis 4.1 | OK |
| Etapa 1, exemplo | R26, R27 | p. 7 e 11 (Mochila Pouco Usada custa 1 rato e dá 1 PV) | OK. O tutorial não diz qual item é, porque o manual só mostra o desenho |
| Etapa 1, complete (governar) | R18 | p. 5 | OK: 2 contra 1+1 |
| Etapa 1, sua vez (2 coelhos) | R26 | p. 7; Leis 4.1.1 | OK |
| Etapa 2, passos | R30 a R36 | p. 8, 9; Leis 4.3 | OK |
| Etapa 2, `[!mais]` | R32, R33 | p. 9; Leis 4.3.2 | OK |
| Etapa 2, exemplo (3 guerreiros, dados 3 e 1) | R33, R35, R36 | p. 8 | Script: Rapinas 3, Marqueses 1. O terceiro dano não acha peça (Leis 1.5.4: faz-se o máximo possível) |
| Etapa 2, complete (Guerrilha, dados 2 e 0) | R33, R56 | p. 8, 14 | Script: Marqueses 0, Aliança 1 |
| Etapa 2, sua vez (indefeso) | R34, R36 | p. 8 | Script: 1 + 1 = 2; só uma peça para remover |
| Etapa 3, Marqueses | R37 a R45 | p. 10; Leis 6 | OK |
| Etapa 3, tabela de custos e PV | R41 | Figura p. 4 (600 dpi) | OK, conferida também com p. 11 e Passo a Passo p. 4 |
| Etapa 3, Rapinas e Tumulto | R46 a R52 | p. 12, 13; Leis 7 | OK |
| Etapa 3, exemplo de tumulto | R50 | p. 13 | Script: 3 pássaros, −3 PV. Rapinas ainda pontuam no Anoitecer (Leis 7.7.4 manda para o Anoitecer, onde 7.6.1 pontua) |
| Etapa 3, complete (2ª oficina) | R40, R41 | p. 4, 10 | Script: custo 1, 2 PV |
| Etapa 3, sua vez (madeira) | R40 | Leis 6.5.4.II | OK |
| Etapa 4, Aliança | R54 a R62 | p. 14 a 16; Leis 8 | OK |
| Etapa 4, Malandro | R64 a R71 | p. 17 a 20; Leis 9 | OK |
| Etapa 4, exemplo (relações) | R70 | p. 19 | Script: 1 + 2 ajudas, 1 + 2 PV = 3 |
| Etapa 4, complete (Lei Marcial) | R59 | p. 15 | Script: 2 + 1 = 3. Exemplo do próprio manual |
| Etapa 4, sua vez (ultraje e peão) | R55, R64 | Leis 8.2.6 ("lembre-se que o peão do Malandro não é um guerreiro") | OK |
| Etapa 4, treino (reanimar) | R66 | p. 17; Leis 9.4.1 | Script: 2 × 1 + 3 = 5 |
| Etapa 5 | R72 a R76 | p. 2, 21, 22; Leis 3, 9.2.8 | OK |
| Etapa 5, exemplo e exercícios | R72, R73 | p. 21; Leis 3.1, 3.3 | OK |
| Situações especiais | divergências 1 a 3 e 7 do dossiê | Leis 1.1.1, 5.1.1, 7.3.2, 9.2.8, D.4 | OK |
| Avaliação final (6 perguntas) | R51, R33, R38/R40, R62, R70, R73 | | OK |
| Folha de consulta | resumo de R17 a R73 | | OK |

Regras do dossiê fora do tutorial: R29 entra só de passagem (cartas de domínio e emboscada gastas pelo naipe aparecem nas etapas 2 e 5); R53 e R63 (valores das trilhas de Ninhos e de Simpatia) ficaram de fora por serem `[L]`: o tutorial manda ler o número impresso no tabuleiro.

## 3. Classificação final

- `[I]`: canto das Rapinas "oposto à Torre" quando há Marqueses (dedução da regra 7.3.2); devolução à caixa das peças de facções fora da partida; legenda da figura de batalha (texto do manual diz "marcador", figura mostra oficina); a Aliança "não põe nada no mapa" na preparação (a lista 8.3 não manda pôr nada).
- `[L]`: valores das trilhas de Ninhos e de Simpatia; qual item a carta Mochila Pouco Usada dá (o tutorial não diz).

## 4. Figuras

Recortes do manual em `como-jogar/root/figuras/` (webp, até 1000 px, qualidade 80), só a parte gráfica:

| Arquivo | Origem | Onde entra |
|---|---|---|
| setup-faccao | AaJ p. 4, passo 1 | Setup, passo 1 |
| setup-marcadores | AaJ p. 4, passo 2 | Setup, passo 2 |
| setup-cartas | AaJ p. 4, passo 3 | Setup, passo 3 |
| setup-ruinas | AaJ p. 4, passo 4 | Setup, passo 4 |
| setup-itens | AaJ p. 4, passo 5 | Setup, passo 5 |
| setup-resumo-dados | AaJ p. 4, passo 6 | Setup, passo 6 |
| setup-verso | AaJ p. 4, passo 7 (verso do tabuleiro; tem texto miúdo impresso no componente) | Setup, passo 7 |
| setup-mapa | Passo a Passo p. 3 (mapa sem as cartas de instrução) | Setup, depois do passo 25 |
| mapa | AaJ p. 5 (com os rótulos curtos Caminho, Floresta, Locais, Clareira) | Etapa 1 |
| batalha | AaJ p. 8 (três recortes do exemplo, sem os textos) | Etapa 2 |
| decreto | AaJ p. 13 | Etapa 3 |
| marqueses-dia | AaJ p. 11 | Etapa 3 |
| revolta | AaJ p. 15 | Etapa 4 |
| malandro-itens | AaJ p. 17 (estados do item e deslizamentos) | Etapa 4 |

Fotos oficiais: `../../root/fotos/mesa-1.webp` (Meeple BR), descrita como partida em andamento.

Passos sem figura própria: 8 a 25 (preparação de cada facção). O manual não ilustra esses passos um a um: o Aprenda a Jogar só mostra o verso do tabuleiro dos Marqueses (passo 7) e o Passo a Passo mostra o mapa já montado, que entra depois do passo 25 e cobre Marqueses, Rapinas e Malandro. A Aliança não põe peças no mapa.

## 5. O que ficou fraco

- O Comece em 4 minutos não pode ensinar o primeiro turno inteiro de quatro facções diferentes em 800 palavras. Ele dá o esqueleto comum, uma linha por facção e um turno resolvido dos Marqueses; o turno completo das outras está nas etapas 3 e 4.
- A etapa 4 é a mais densa (Aliança e Malandro juntos): muitos passos e vários `[!mais]`. Se o teste com leitores mostrar sobrecarga, separar em duas etapas.
- As trilhas de Ninhos e de Simpatia ficaram sem números; o leitor precisa olhar o tabuleiro.
- O vídeo do Duque mostra a expansão Submundo; por isso há um segundo vídeo, de regras da caixa base (3DÜs), linkado pela própria Meeple BR. Os segundos não foram conferidos: só o vídeo do topo, a partir do 0.
- Extensão: cerca de 7.660 palavras de texto contando a montagem (1.340); sem ela, cerca de 6.320.
- O teste de execução por subagente não foi feito (o pedido proibiu subagentes); fica para a auditoria independente. Nada aqui prova que pessoas aprendem com o texto.

## 6. Rodada de correções (auditoria independente, 08/11/2026)

Auditoria de regras (APROVADO COM CORREÇÕES) e partida simulada (SIM COM AJUSTES). Tudo aplicado no tutorial; nada foi gerado no repositório (prévia só no scratchpad, sem marcação crua).

1. Legenda de mesa-1 corrigida: guerreiros laranja, um azul e os dados; sem verde.
2. Legenda de setup-cartas: verso das 54 cartas (p. 4).
3. Passo 5: destino dos 11 itens ("R" sob as ruínas, "S" iniciais do Malandro, sobras na caixa) e o que acontece sem Malandro (Leis B.1.2, 9.3.4, 9.3.5; p. 6). `[I]` para "sem Malandro, ruínas sem item".
4. Etapa 5: saiu a frase sem fonte; entrou "não podem ser jogadas cedo" (p. 2).
5. Comece, Sua vez: distrator verdadeiro trocado por um falso.
6. Pergunta dos 30 PV refeita: a Aliança chega a 30 no meio do próprio Dia e vence na hora (Leis 3.1).
7. Quadro dos manuais: canto das Rapinas "se possível, obrigatoriamente" oposto (7.3.2); coalizão com 4 ou mais também na carta da p. 21.
8. Ninho novo: "onde todas essas peças possam ser postas" (7.4.3); desempate marcado como lacuna.
9. Déspota: 1 PV a mais por batalha (7.8.4).
10. Criar do Malandro: 1 Martelo por símbolo de naipe (9.5.8).
11. Base removida: apoiadores até 5 sem base; a base volta ao tabuleiro (8.2.4; G.1.28, `[I]`).
12. Legenda de setup-mapa: serraria na clareira da Torre, oficina e recrutador nas vizinhas, montagem fixa do Passo a Passo.
13. Tabela de componentes: marcadores de naipe (p. 23) e Cartas de Instruções (B.1.4).
14. Exemplo de tumulto: líder Comandante, Vizires em Mover e Batalhar; os Vizires ficam.
15. Folha de consulta: "mão vazia: compre 1" nas Rapinas; Malandro compra por Moeda.
16. Canal 3DÜs: confirmado pelo oEmbed; mantido.
17. Trilhas: Ninhos com PV impressos sob os espaços e bônus de compra em alguns (figura p. 12); espaço vazio é o mais à esquerda; Simpatia com custo crescente (figura p. 15); valores completos e bônus da Aliança como "leia no tabuleiro" `[L]`.
18. Apoiadores podem ser olhados pela Aliança (8.2.3).
19. Passo 19: cada base tem naipe.
20. Mochila definida (passo 25); Mochila Pouco Usada dá Bolsa (figura p. 7); Itens Danificados definidos; destino dos itens explorados e criados (9.5.3, 9.5.8); Chá, Moeda e Bolsa voltam à trilha ao desvirar (9.2.5).
21. "Vizinha" definida no Comece (G.1.1); "Ágil" trocado pelo efeito, com a regra 9.2.3.
22. Emboscada: 5 cartas, quais naipes (2.1.2).
23. PV abaixo de zero: lacuna declarada no Tumulto.
24. Ordem das colunas do Decreto escrita.
25. Origem da madeira dos Marqueses reescrita (6.5.4.II).
26. Guerrilha explicada na própria pergunta da etapa 2 (p. 14).
27. Batalha: o Malandro ataca com o peão (4.3).
28. Anoitecer: a exceção (Malandro) nomeada.
29. Revolta: base em local livre (2.2.3).

Portões depois das correções: zero travessão; zero vício de `tools/vicios.py`; zero exclamação fora das marcas; `tools/checar_comece.py` passa.
