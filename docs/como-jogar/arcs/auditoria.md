# Auditoria: Como jogar Arcs

01/11/2026. Dois agentes independentes, que não escreveram o texto. Relatórios completos no scratchpad da sessão (`auditoria/arcs_regras.md` e `auditoria/arcs_execucao.md`).

## 1. Auditor de regras (manual Meeple BR, texto por página e ilustrações)

Nenhum erro Grave. 1 Moderado, 1 entre Leve e Moderado e 16 Leves, todos tratados:

- Exercício impossível: o círculo sai no dado de Assalto, não no de Escaramuça (ilustrações das p. 5, 14 e 15). Trocado para Assalto.
- Exemplo de batalha: Ultraje e Despojar a Corte agora vêm na destruição da cidade, e o saque por último (p. 14 e 16).
- "3 a 5 capítulos": agora "costuma ter de 3 a 5, no máximo 5" (p. 2 e 8).
- Copiar e Pivotar: separados (Pivotar exige outro naipe) (p. 10).
- Exercício do Prelúdio: o jogador lidera, com carta de 2 pontos (o manual não mostra Construção de 1 ponto).
- Distrator do Taxar que podia ser verdadeiro: trocado (p. 12).
- Página do número de jogadores corrigida (p. 3 e 4).
- Carta "7": só com 4 jogadores; pode Superar mesmo com a iniciativa já tomada (p. 10).
- Acrescentado: Superar só precisa ser maior que a líder; Pivotar não muda o naipe líder (p. 10).
- Acrescentado: Armas não transformam ações de outros recursos em Batalhar (p. 17).
- Nova ação de carta de Guilda: só com ponto de ação ou recurso fora de Ultraje (p. 20).
- Cidade que volta ao tabuleiro e cobre espaço de recurso (p. 17).
- Variante dos dois montes de descarte reescrita como no manual (p. 22).
- Subtítulo: confirmado na página do produto da Meeple BR; o cabeçalho cita a fonte.
- "Cada jogador joga 1 carta": agora "em geral", com quem não tem cartas sendo pulado.
- Carta "4": 3 pontos de ação, como a única "4" mostrada no manual (p. 9).
- Folha de consulta: formas de tomar a iniciativa e limite dos dados de Saque.
- [!mais] para regras obrigatórias de caso especial: segue o padrão "essencial à vista" do site (regra que só aparece em certas situações vai em "Regra adicional"); não muda.

## 2. Teste de execução (só o tutorial)

Acertou os 36 exercícios sem ver as respostas e jogou a rodada e a batalha sem travar. Tratado: explicação completa de destruir cidade (Ultraje e Despojar); exceção das Armas com 2 jogadores; premissa do exercício de construir em sistema alheio; ordem completa do turno na folha de consulta (p. 9, 10 e 20); onde fica o número da carta (p. 9).

Não tratados, por o manual não trazer em texto (o jogador lê na caixa): faces de cada dado; pontos de ação de cada carta; espaços de recurso livres no começo e posição dos espaços "+2" e "+3"; valores do lado virado dos marcadores de ambição; custos de saque; espaços de construção por planeta; efeito de cada carta de Vox e de Guilda. Destino do marcador zero depois da rodada e do marcador de iniciativa deitado: o manual não diz. Cortes sugeridos (seção 1, preparação repetida no "Comece em 4 minutos") não feitos: seguem o modelo editorial do site.

## 3. Autoverificação

Contas em `contas.py` (scratchpad). Zero travessões. `tools/vicios.py`: nenhum aviso.

## Seção de montagem (04/11/2026)

Pedido do editor de 04/11/2026: nova seção `## setup. Montar a mesa passo a passo`, antes do "Comece a jogar", seguindo as p. 4 e 5 do manual na mesma ordem (Preparação Geral, passos A a K; Preparação dos Jogadores, passos L a Q). O manual foi baixado de novo da mesma fonte do dossiê (https://meeplebr.com/wp-content/uploads/2025/02/Manual-Arcs.pdf, 24 páginas, modificado em 11/08/2025; robots.txt da Meeple BR sem bloqueio; robô identificado, sem se passar por navegador). Texto extraído com `pdftotext` e páginas 2 a 5 renderizadas a 300 e 450 dpi (scratchpad, `setup/arcs/`). São 25 passos numerados, cada um com a letra do manual, a lista de componentes com quantidades (p. 2 e 3), o que fica na caixa, a tabela por número de jogadores, quem começa, a conferência final e uma pergunta. `"publicar"` não foi mexido.

**O "Comece a jogar" foi ajustado** para o `checar_comece.py`, que antes reprovava a seção (faltavam "Seu primeiro turno", "Ainda não precisa saber", "Como a partida acaba" e os blocos resolvido, complete e sua vez): o "Monte a mesa" virou um resumo de 4 itens que remete à seção nova; "Sua primeira rodada" virou "Seu primeiro turno", com um exemplo resolvido novo (Agressão "3" liderada, Superar com "5", Copiar; p. 10 e 11), a pergunta que já existia como Complete e uma pergunta nova de iniciativa (Pivotar não conta; p. 11); "Como se ganha Poder" virou "Como a partida acaba", com a condição de fim que estava na ideia do jogo (p. 2 e 19).

**Passo e página**
- Componentes: p. 2 (mapa, peças do jogador, 2 marcadores de Poder) e p. 3 (cartas e outras peças). Na caixa: cartas de líder e conhecimento (p. 3 e 21: "não jogue sua primeira partida com Líderes e Conhecimento"); "1" e "7" com 2 ou 3 jogadores (p. 3 e 4).
- Tabela: baralho e Corte (p. 4), aglomerados (p. 4, J), sistemas C (p. 5, N), fichas nas ambições (p. 4, K), Poder para acabar (p. 2). Cartas que sobram: conta 20 menos 12 = 8, 20 menos 18 = 2, 28 menos 24 = 4 (passos P e Q, p. 5).
- 1 a 3 (A, B), 4 e 5 (C, D), 6 e 7 (E, F), 8 (G), 9 e 10 (H), 11 (I), 12 e 13 (J), 14 (K): p. 4.
- 15 e 16 (L), 17 (M), 18 a 21 (N), 22 (O), 23 e 24 (P), 25 (Q): p. 5. "Naves em pé, construções com o lado colorido para cima" no passo 18: p. 7 (peças começam inteiras).
- Quem começa: p. 3 (marcador de iniciativa "mostra qual jogador terá o primeiro turno da rodada"), p. 8 e 10.
- Conferência: 3 + 3 + 2 = 8 naves por jogador; com 2 jogadores, mais 2 no segundo sistema C = 10.

**Figuras e página**
- Novas, recortadas do manual: `setup-recursos-dados.webp` (p. 5: A e B, dados, fichas e marcador de iniciativa); `setup-baralho-acao.webp` (p. 5: C e D); `setup-ambicoes.webp` (p. 5: E, K e F, borda direita do mapa); `setup-corte.webp` (p. 5: H); `setup-carta-preparacao.webp` (p. 4: carta de preparação ampliada, I e N); `setup-fora-de-jogo.webp` (p. 3: marcadores de caminho longo e curto e marcador fora de jogo, só os desenhos, montados lado a lado sobre a cor do fundo, sem os títulos); `setup-pecas.webp` (p. 5: L); `setup-tabuleiro.webp` (p. 5: O, tabuleiro do jogador, sem o título "Cada jogador..."); `setup-mao.webp` (p. 5: P). Os círculos com letras do manual ficaram: o texto cita a letra em cada passo.
- Reaproveitadas: `preparacao.webp` (p. 4, mapa preparado) e a foto oficial `../../arcs/fotos/mesa-1.webp` (Buried Giant Studios, crédito da `arcs/fotos/fontes.json`; a de jogabilidade, marcada com "pessoas", não foi usada). São 11 imagens na seção.
- Descartado: o recorte das cartas de ação e de preparação da p. 3 saiu pixelado (imagem de baixa resolução no PDF).

**Sem ilustração própria no manual (ou recorte ilegível)**
- Passo 8 (marcador zero, G), passo 17 (marcador de Poder, M) e passo 25 (descarte, Q): aparecem só pequenos dentro do mapa da p. 4; o recorte isolado ficaria ilegível. A legenda da figura do passo 21 aponta onde estão.
- Passo 14 (fichas nas ambições com 2 jogadores): só a seta K da p. 5, que já está na figura do passo 7.
- Passo 16 (cidades no tabuleiro) e passo 22 (fichas no tabuleiro): uma figura só, a do tabuleiro (p. 5), posta depois do passo 16; o passo 22 remete a ela.
- Passos 18 a 20 em separado: o manual mostra as três posições num desenho só (p. 4), posto depois do passo 21.
- Passo 24 (troca de mão com 2 jogadores): sem desenho.
- O manual não diz qual marcador de caminho (longo ou curto) vai em cada portal; o passo 12 não escolhe.

**Correção de passagem:** a legenda da figura `preparacao.webp` na Etapa 1 dizia "mapa preparado para 3 jogadores"; a carta do desenho é de 4 jogadores (títulos "4 Jogadores", sistemas até 4C e 1 aglomerado fora de jogo, p. 4). Legenda corrigida.

**Portões:** `tools/checar_comece.py` passa; zero travessão e meia-risca no tutorial; `tools/vicios.py` (função `avisos`) sem aviso; a página gerada em memória pelo `como_jogar_md.pagina` (sem gravar HTML) tem a seção com todas as figuras e a foto existentes.

## Auditoria independente da montagem (04/11/2026)

Resultado: aprovado com correções, todas aplicadas no `tutorial.md` e numa figura.

- **Erro 1 (Complete do "Comece a jogar"):** quem lidera a rodada nova é o Jogador 2, que não segue naipe. O enunciado passou a ser o Jogador 3, "numa rodada nova liderada pelo Jogador 2"; as opções e a explicação continuam certas (p. 10).
- **Menor 1:** `setup-tabuleiro.webp` recortado de novo, com o resto do título "Cada jogador..." coberto pela cor do fundo (p. 5).
- **Menor 2:** iniciativa: "se ninguém Superou, fica com quem já tem" (p. 11).
- **Menor 3:** "Como a partida acaba": o capítulo também termina quando todos que têm cartas passam a iniciativa; o primeiro ganha a soma dos valores maiores de todos os marcadores da ambição, o segundo a dos menores; quem não tem nada que conte não pontua (p. 18, "Qualificação").
- **Menor 4:** resumo do "Monte a mesa": 2 naves em cada um dos dois sistemas C com 2 jogadores, e as 6 fichas nas seções de ambição (p. 4 e 5).
- **Sem apoio:** "peças das cores que ninguém escolheu" agora diz "implícito no passo L".
- **Clareza:** "declarar ambição em detalhe: etapa 2"; linha nova "o número no canto decide quem Supera; os pontos de ação dizem quantas ações" (p. 10); legenda da foto `mesa-1.webp` avisa que é partida em andamento, edição em inglês, não a montagem inicial.
- **Palpites de iniciante:** passo 12 diz que o manual não define o tamanho do marcador de caminho por portal e sugere, como conselho do guia, usar o que se encaixa; passo 18 diz que o tipo do planeta é o do ícone e da cor e que cidades e espaçoportos vão num espaço de construção do planeta (p. 7).

**Portões:** `checar_comece.py` passa; zero travessão; `vicios.py` sem aviso.
