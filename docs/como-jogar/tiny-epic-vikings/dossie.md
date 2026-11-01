# Dossiê: Como Jogar Tiny Epic Vikings

Entrega 1 da linha COMO JOGAR para *Tiny Epic Vikings*. Produzido em 01/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; alvo de 3.500 a 6.000 palavras; exercícios de múltipla escolha; essencial à vista com `[!mais]`; figuras do manual e vídeo).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor.

- **Manual brasileiro acessível:** sim (seção 2).
- **Resenha no Elite:** não há pasta `tiny-epic-vikings/` nem `conteudo/tiny-epic-vikings.json`; o JSON leva `"resenha": null`.
- **Complexidade:** seleção de cartas por era, quatro ações de líder com subações (enviar, atacar, invadir), ações rúnicas condicionadas, controle de ilha por Influência com regra de roubo, batalhas com custo, empate e oponente automático (Invasores), pontuação que depende da Fúria dos deuses. Peso médio: cinco etapas.
- **Procura real (01/11/2026):** o autocompletar do Google para "como jogar tiny epic vikings" devolve "tiny epic vikings como jogar"; para "tiny epic vikings", devolve, entre outros, "ragnarok", "bgg", "solo", "ludopedia". O do YouTube devolve "tiny epic vikings how to play", "solo", "ragnarok". Busca existe, pequena e em boa parte em inglês.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro** *Tiny Epic Vikings: Livro de Regras dos Invasores*, Asmodee (marca Galápagos) | Arquivo `TNE051_regras_v1.0.pdf` (entregue em .zip pela biblioteca), 24 páginas de 306 x 468 pt, PDF criado em 08/01/2024. Sem créditos de tradução no texto extraído | Biblioteca de Downloads da Asmodee Brasil, https://www.asmodee.com.br/download-library; arquivo `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2261&tagId=2&group=b2c` | Baixado na sessão anterior ao briefing (o editor informou o caminho); lido em 01/11/2026 |
| **Página do produto** TNE051 | API pública da loja, `ccstore/v1/products/TNE051` | https://www.asmodee.com.br/tiny-epic-vikings/produto/TNE051 | 01/11/2026 |
| **Vídeo** Duque Board Games, "TINY EPIC VIKINGS - Gameplay resumida" | Confirmado pelo oEmbed (título e canal) | https://www.youtube.com/watch?v=eYwBVizR7oY | 01/11/2026; achado pela busca do próprio canal (`@DuqueBoardgames/search?query=tiny epic vikings`) |
| Manual original em inglês (Gamelyn Games) | Não consultado | | Não foi necessário para resolver tradução; ver seção 5 |
| FAQ ou errata oficial | Nenhuma procurada além da página do produto | | Lacuna |

**Leitura.** O PDF tem camada de texto; extraído com `pdftotext -layout`, página a página, e lido inteiro (p. 1 a 24; p. 16 a 23 são o modo solo, lidas para o que toca o jogo de 2 e o Tabuleiro de Clã). Muitos valores estão só em ícones; as páginas foram renderizadas (110, 300 e 600 dpi) para ler: os valores de pontuação 6/5/4 e 5/4/3 (p. 15 e 6), os custos do Tabuleiro de Clã (Barcos 2, 3, 4; Templos 5, 7 de Madeira; 1 Alimento por Colono; Influência 1/4/2; p. 5 e 13), o Tabuleiro de Era (cartas 4/5/6 e custo de invasão 1/2/3 Aço, p. 5), os nomes das Runas pela cor (p. 6) e a carta de exemplo (Força 10, custo 1 Aço, p. 7). As Bênçãos dos 6 deuses foram lidas no texto da p. 2 (`pdftotext -raw`). PDF, renderizações e texto ficam no scratchpad, fora do repositório.

**Paginação.** A página do PDF coincide com o número impresso (p. 4 impressa = página 4 do PDF).

**Dados do topo (JSON).** Página do produto: `x_numeroDeParticipantes` 1, `x_numeroMaximoDeParticipantes` 4, `x_tempoDePartida` "30-60 min", `x_faixaEtaria` "+14", marca Galápagos. O JSON usa "1 a 4 jogadores" (o modo solo existe no manual), mas o tutorial ensina só de 2 a 4 e diz isso na linha 3.

## 3. Glossário (edição brasileira)

| No tutorial (= manual BR) | Página | O que é |
|---|---|---|
| Tabuleiro de Mapa | 2, 4 | Mapa dupla face, lado conforme o número de jogadores |
| Ilha / Fiorde / Doca / Rota de Balsa | 10, 11 | Regiões de terra / de água / círculo branco onde a Rota toca a Ilha / linha pontilhada que separa Fiordes e liga Ilhas |
| Ilhas Periféricas / Ilhas Centrais | 16, 17 | As que tocam a borda / as que não tocam |
| Tabuleiro de Clã | 4, 5 | Tabuleiro do jogador com peças, custos e Trilha de Recursos |
| Colono, Barco, Templo | 2, 12, 13 | Unidades; Influência 1, 2 (na Doca), 4 |
| Vila | 2, 12 | Peça neutra no mapa; invadida e consagrada |
| Madeira, Alimento, Aço | 6 | Os 3 Recursos, trilha de 0 a 7 |
| Runa; Runa Ativa; Runa Passiva; Runa de Ilha | 6, 13 | Símbolos de poder; nomes "Prosperidade", "Mistérios", "Ímpeto da Natureza" |
| Tabuleiro de Deus; Marcador de Fúria; Fúria; Trilha de Fúria | 4, 9, 13 | 6 deuses, 3 em jogo; Fúria decide o valor das Runas |
| Tabuleiro de Era (lado do Corvo) / Tabuleiro de Pontuação; Corvo | 4, 15 | Marca a era; verso é a pontuação |
| Carta Viking; Baralho Viking; Pilha de Descarte | 4, 7 | Líderes; Runa, Força, Ação de Líder, Ação Rúnica |
| Carta de Benefício | 4, 9 | Prêmio da batalha: Runas Passivas e bolsa de recursos |
| Marcador de Chefe | 4, 15 | Jogador inicial da era |
| Marcador de Pontuação | 4, 15 | Lado "+40" |
| Fase de Seleção de Cartas / Fase 2: Realizar Ações / Fase de Limpeza | 6 a 8, 15 | As 3 fases da era |
| Ação de Líder; Ação Rúnica | 7, 10, 14 | Ação da carta; bônus condicionado a Runas Ativas |
| Velejar um Barco; Enviar Colonos; Atacar Colonos; Invadir Vilas | 11, 12 | Ação de Velejar e o que acontece ao atracar |
| Explorar com um Colono; Colher; Construir | 12 | As outras ações principais |
| Explorar com um Templo; Castigar um Colono; Comprar e Substituir uma Carta; Entrar em uma Batalha; Coletar Recursos; Trocar Recursos | 14 | Ações rúnicas extras |
| Consagrar uma Vila; Ação de Consagração | 8, 14 | Passo 3 opcional do turno |
| Influência; pés no chão | 13 | Força numa Ilha; ter Colono ou Templo nela |
| Roubar uma Runa de Ilha | 13 | Tomar a Runa de outro jogador |
| Força; Bênção de Valhala | 7, 9 | Valor em batalha; ação do deus para quem perde |
| Invasores; guerreiro solitário | 10 | Oponente automático quando só um resolve a batalha |
| inimigo | 16 | Terceiro clã automático no jogo de 2 |
| Pontos de Vitória | 15 | Pontos |

## 4. Base de regras

Classificação: `[V]` verificada (lida nesta sessão), `[I]` interpretada, `[L]` lacuna.

### 4.1 Objetivo, estrutura e fim
- 3 eras, cada uma com Seleção de Cartas, Realizar Ações e Limpeza; depois da Era 3, Pontuação Final. [BR p. 6, "A partida é jogada ao longo de três eras"] [V]
- Vence quem tem mais Pontos de Vitória; desempate: Runas de Ilha > Cartas de Benefício > Templos construídos > Barcos construídos > recursos. [BR p. 15] [V]

### 4.2 Preparação [BR p. 4 e 5]
- Mapa no lado do ícone do número de jogadores; 1 Runa por Ilha pelo ícone; Vilas nos espaços. [V]
- 3 Tabuleiros de Deus sorteados; 1 Marcador de Fúria sorteado em cada, no 0. [V] O marcador define a Runa do deus: [I] (o texto da p. 6 diz que cada Runa representa um dos 3 deuses; a p. 15 identifica os deuses pelo símbolo do marcador; os marcadores são "3 em 3 tipos", p. 2).
- Tabuleiro de Era, lado do Corvo, Corvo no 1; espaço à esquerda para a Carta de Benefício. [V]
- Baralho Viking; Pilha de Descarte. [V]
- Cartas de Benefício: 4/5/7 por fileira para 2/3/4 jogadores. [V]
- Por jogador: 6 Colonos, 3 Barcos nos espaços + 1 separado, 2 Templos, 1 Marcador de Pontuação, recursos no 2. [V]
- Chefe: quem esteve numa ilha mais recentemente. [V]
- Barco separado: a partir da direita do Chefe, anti-horário, termina no Chefe, em Fiorde vazio que encoste na borda. [V]
- 2 jogadores: inimigo com 1 Templo e 2 Colonos em cada Ilha Periférica, cores não usadas; controla as Ilhas, Runas ficam, Fúria não sobe; Colono removido vai para a caixa. [BR p. 16] [V]

### 4.3 Seleção de cartas [BR p. 7]
- Era 1: 4 cartas, horário; Era 2: 5, anti-horário; Era 3: 6, horário. [V]
- Guarda 1 virada para baixo, passa o resto, até receber 1 só, que se junta à mão. Pode consultar as guardadas, não trocar. [V]
- 2 jogadores: mão do inimigo com cartas da era menos 1, descarte de 1 após cada passada, descarte da última. [BR p. 16] [V]

### 4.4 Turno [BR p. 8 e 10]
- Começa no Chefe, sentido horário. [V]
- Etapa 1: resolve batalha se a carta mais à direita está virada para baixo. Etapa 2: joga carta (obrigatório), para baixo (batalha) ou para cima (Líder e/ou Rúnica). Etapa 3: consagrar (opcional). Cartas em fileira, nova à direita. [V]
- Jogar carta é obrigatório; ação nunca é. [BR p. 10] [V]

### 4.5 Ações de Líder [BR p. 11 e 12]
- Velejar xN: até N movimentos, 1 cada: Doca→Fiorde, Fiorde→Fiorde, Fiorde→Doca; todos num só Barco; vários Barcos por Fiorde, 1 por Doca. [V]
- Ao atracar: Barco alheio na Doca vai para Fiorde vizinho; pode Enviar Colonos; pode invadir Vila; se tiver a maior Influência, toma controle. [V]
- Enviar Colonos: 1 Alimento por Colono, até N, do Tabuleiro de Clã; no seu turno pode devolver Colonos das Ilhas ao tabuleiro. [V]
- Atacar Colonos: após enviar, com a maioria dos Colonos, cada oponente ali remove 1. [BR p. 12; p. 24 "mais Colonos do que cada um dos outros jogadores"] [V]
- Invadir: só ao terminar o Velejar em Doca com Vila; custo em Aço da era (Era 1: 1). [V] Eras 2 e 3: 2 e 3 Aço, lidos na ilustração do Tabuleiro de Era (p. 5). [I]
- Explorar xN: Colono para Ilha vizinha por Rota de Balsa (não para fora do mapa); x2 = um Colono 2 vezes ou 2 Colonos 1 vez; depois, ataque onde tiver maioria. [V]
- Colher xN: N recursos em qualquer combinação; +1 Alimento por Barco construído; +1 qualquer por Templo construído. [V] O Barco inicial não dá bônus. [I] (o texto diz "Se você tiver construído Barcos"; o bônus está impresso no espaço vazio do tabuleiro, e o Barco inicial não sai de espaço, p. 4, 5 e 20.)
- Teto de 7 por recurso; não gasta o que não tem. [BR p. 6] [V]
- Construir: paga Madeira impressa abaixo da peça, qualquer ordem, sem mover peças para espaços mais baratos. Barcos 2/3/4, Templos 5/7 [lido na ilustração do Tabuleiro de Clã, p. 5 e 12] [V/ícone]. Barco em Fiorde adjacente a região ocupada; Templo em Ilha com Colono seu, nunca os dois na mesma Ilha; Ilha com Templo alheio pode. [V]
- Construir constrói 1 peça por ação. [I] (o texto fala de "um Barco ou um Templo")

### 4.6 Ação Rúnica [BR p. 14]
- Depois da Ação de Líder, se tiver as Runas Ativas pedidas (de Ilhas controladas e Cartas Viking jogadas). [V]
- A Runa da própria carta jogada conta. [I] (p. 6: Runa Ativa recebida "ao jogar"; p. 10: "Cartas Viking")
- Ações extras: Explorar com um Templo (pés no chão), Castigar um Colono (x1/x2), Comprar e Substituir uma Carta, Entrar em uma Batalha, Coletar Recursos (escala com Runas), Trocar Recursos. [V]
- Runa Ativa não se gasta; perde-se ao perder a Ilha ou no descarte do fim da era. [BR p. 6] [V]

### 4.7 Influência e controle [BR p. 13]
- Colono 1, Templo 4, Barco na Doca 2 (para aquela Ilha), Barco no Fiorde 0. [V]
- Pegar Runa da Ilha: maior Influência e pés no chão (Colono ou Templo; Barco não). [V]
- Pegar Runa de Ilha (da Ilha ou roubada): Fúria do deus +1. [V]
- Roubar: após resolver por completo uma Ação Rúnica ou de Líder, mais Influência que o controlador e pés no chão. [V]
- Runa volta à Ilha se o controlador "não tiver mais Influência" e ninguém a rouba; sem Fúria. [V] Leitura "deixar de ter a maior": [I]. Empate com o controlador: [L].

### 4.8 Vilas e consagração [BR p. 12 e 14]
- Vila invadida fica ao lado do Tabuleiro de Clã; consagrar após jogar a carta e resolver as ações; 1 por turno. [V]
- 4 Ações de Consagração no Tabuleiro de Era (faz a ação) ou a do Tabuleiro de Deus (+2 Fúria). Limite por ação = número de jogadores; pilha. [V] Quais são as 4 ações do Tabuleiro de Era: [L] (só ícones, ilegíveis na resolução do PDF; o modo solo, p. 19, confirma que uma delas pode levar a invadir Vilas).
- Limite aplicado também ao espaço do Tabuleiro de Deus: [I] (o manual fala de "cada Ação de Consagração").
- Limite com 2 jogadores (inimigo conta?): [L], o guia usa 2.

### 4.9 Batalha [BR p. 8 a 10]
- Começar: carta para baixo sem batalha aberta; escolhe Carta de Benefício de uma ponta de qualquer fileira; põe à esquerda do Tabuleiro de Era. Entrar: carta para baixo com batalha aberta; não escolhe. [V]
- Resolver no começo do próximo turno de quem começou; todos revelam. [V]
- Custo em Aço: paga se puder; senão a carta fica para cima e o jogador não compete, sem Bênção nem Fúria. [V]
- Força soma ou multiplica Runas Ativas ou recursos; recursos não se gastam. [V]
- Vencedor: Carta de Benefício virada para baixo num dos 3 espaços; recursos da bolsa na hora; máximo 3, a quarta obriga a devolver uma a uma ponta. [V]
- Perdedor: Bênção do deus da Runa da carta (opcional, "pode"), em ordem a partir de quem começou; Fúria +1 (obrigatória, "deve"). Fúria acima de 20: vira para "20+" e recomeça; nunca abaixo de 0. [V]
- Empate na maior Força: ninguém vence; carta volta; todos como perdedores. [V]
- Guerreiro solitário: Invasores com a carta do topo, empilhada à direita do Tabuleiro de Era; pagam sempre o Aço; Runas das cartas de Invasor anteriores somam (tipo não importa); recurso: 1 por carta de Invasor (anterior e atual). Vitória sua: leva a carta, Fúria +1 do deus do Invasor. Vitória deles: carta volta, você Bênção + Fúria. Empate: derrota para os dois. [V]
- Batalha começada no último turno da era: resolve antes da Limpeza. [V]
- Entrar em uma Batalha (rúnica): vira a carta, entra ou começa; Força à vista. [V] Como ela dispara a resolução, se a carta fica para cima: [L].
- Só um jogador paga o Aço na resolução (os outros não competem): ele vira "guerreiro solitário"? [L].
- Bênçãos (texto dos Tabuleiros de Deus, p. 2): Odin, Frigga, Thor, Freia, Sif, Njord. [V]

### 4.10 Limpeza e pontuação [BR p. 15]
- Fim da era quando todos jogaram todas as cartas; descarta Cartas Viking (não as de Invasor); Corvo avança. [V]
- Chefe para quem tem mais Runas de Ilha; empate: o empatado mais perto do último lugar da ordem de turno anterior. [V] Todos com 0: [I] (mesma regra de empate).
- Baralho insuficiente: embaralha o descarte. [V]
- Runas de Ilha controladas: 6/5/4; Runas de Cartas de Benefício: 5/4/3, pela ordem de Fúria. Empate: menor valor das posições divididas. [V]
- Trilha de pontuação até 40; "+40". [V]

### 4.11 Erros comuns
Nenhuma fonte de comunidade foi consultada; os erros marcados com `[!atencao]` vêm de regras que o próprio manual destaca em negrito ou repete (Barco no Fiorde vale 0, pés no chão, movimentos num só Barco, recursos começam no 2). É uma escolha editorial, não evidência de erro frequente.

## 5. Divergências entre edições

O manual original em inglês não foi consultado, porque nenhum ponto exigiu resolver tradução por ele com mais segurança do que as ilustrações. Os pontos que ele poderia esclarecer: a frase "Se você não tiver mais Influência" (p. 13), que deve ser *no longer have the most Influence*, e "Runas Ativas de Ilhas ou Cartas Viking" (p. 10). Fica como pendência para o auditor.

Pequenas variações do próprio manual BR: "Assumir o Controle" (p. 13) e "Tomar o Controle" (sumário, p. 3); "Fase de Realização de Ações" (p. 6) e "Fase 2: Realizar Ações" (p. 8); "Runa ... Mistérios" (p. 6) e "Mistério" (p. 24); "dedicar" e "consagrar" Vila (p. 14). O tutorial usa "controle", "Fase 2", "Mistérios" e "consagrar".

## 6. Plano instrucional

| Classe de tarefa | Apoio (entender) | Procedural (passos) | Prática |
|---|---|---|---|
| Comece: montar e jogar o 1º turno | Ideia do jogo em 3 frases | Monte a mesa; 2 formas de jogar a carta; 4 ações em uma linha | Resolvido (Velejar e controle), complete (limite de Colonos), sua vez (Ação Rúnica, Barco no Fiorde) |
| Etapa 1: montar | As 4 áreas da mesa | Preparação em 11 passos; inimigo no jogo de 2 em `[!mais]` | Sua vez (3 perguntas) |
| Etapa 2: cartas e turno | Seleção; anatomia da carta; Runas Ativas | Seleção, turno, Colher/Construir, Ação Rúnica | Resolvido (Colher com bônus e teto), complete (Templo), sua vez |
| Etapa 3: mapa | Influência, pés no chão, Fúria | Velejar/Enviar/Atacar; Explorar; controle e roubo; Invadir e Consagrar | Resolvido (roubo), complete (ataque + roubo), sua vez, treino de Influência |
| Etapa 4: batalhas | O que se ganha e o que se perde | Começar/entrar; resolver; Invasores e casos em `[!mais]`; tabela das Bênçãos | Resolvido, complete (empate), sua vez (Invasores, entrar, Aço) |
| Etapa 5: fim | O que sai e o que fica; o que pontua | Limpeza; Pontuação Final | Resolvido (empate de Fúria), complete, sua vez, treino de valores |

Decisões de carga: a batalha, que tem mais exceções, foi adiada para depois do mapa; o primeiro turno só ensina Velejar e Enviar Colonos com Ilha vazia (o ataque fica na etapa 3, avisado em "Ainda não precisa saber"); custos de construção ficaram fora do Comece. Limite: o texto não observa o leitor.

## 7. Extensão

Contagem com `re.findall(r"\w+")`: cerca de 7.550 palavras no arquivo inteiro; cerca de 6.450 sem as opções e explicações dos exercícios (que só aparecem ao toque); cerca de 6.000 também sem a folha de consulta e as fontes. Fica no teto do alvo. O que pesou: as exceções da batalha (Invasores, empate, Aço, último turno, quarta carta) e o par controlar/roubar, que não dá para cortar sem ensinar errado.

## 8. Contas

Script `contas.py` no scratchpad (`tev/contas.py`), com os valores do manual. Saída usada no texto:

- Comece: Velejar x2, 2 Alimento → 2 Colonos, Alimento 0, Influência 2 + 2 = 4. Velejar x3 com 2 Alimento → 2 Colonos.
- Etapa 1: 3 jogadores → 10 Cartas de Benefício.
- Etapa 2: Colher x2 + 1 Barco + 1 Templo = 4 recursos; Madeira 6 + 1 = 7; Alimento 1 + 1 + 1 = 3; Aço 2 + 1 = 3. Alimento 6 com Colher x3 → só 1 entra. Templo mais barato 5.
- Etapa 3: Ana 2 Colonos, Bruno envia 3 (Alimento 4 → 1), Ana fica com 1, Bruno 3 + 2 = 5 > 1. Complete: Ana Templo + 1 Colono, perde o Colono, 4 contra 5. Treino: 2 + 4 = 6; Fiorde 0.
- Etapa 4: 10 contra 8, Aço 2 → 1; 8 contra 6.
- Etapa 5: Fúria 14/9/9: Ana 2 x 6 + 1 x 4 = 16, 2 x 5 + 1 x 3 = 13, total 29; Bruno 2 x 4 + 1 x 4 = 12, 5 + 3 + 3 = 11, total 23; com "Prosperidade" sozinha em 2º, Bruno 2 x 5 + 4 = 14, 5 + 4 + 3 = 12, total 26. Treino: 18, 6, 9. Avaliação 8: empate em 1º vale 5.

## 9. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-vikings/tutorial.md`: passa.
- Travessão e meia-risca: 0 (contagem em Python).
- `tools/vicios.py` (função `avisos`) no texto do tutorial e no JSON: 0 aviso.
- Exclamação fora das marcas: 0.
- 38 perguntas de múltipla escolha, cada uma com exatamente uma opção `(x)`.
- Conversor `tools/como_jogar_md.py` (`pagina()`, em memória, sem gravar): gera a página sem sobra de marcação (`??`, `(x)`, `> [!`, `!fig[`, `!video[`); 6 figuras e o vídeo; "Leitura do essencial: cerca de 13 min".
- Legibilidade (Flesch adaptado): não medida; a implementação citada é de outro repositório.

## 10. Figuras e vídeo

Recortes das ilustrações do manual, em `como-jogar/tiny-epic-vikings/figuras/` (webp, qualidade 80, até 1000 px), renderizados a 600 dpi:

| Arquivo | Página | O que mostra |
|---|---|---|
| preparacao.webp | 5 | Mesa de 4 jogadores (sem o Tabuleiro de Clã) |
| carta.webp | 7 | Anatomia da Carta Viking (Hilda) |
| velejar.webp | 11 | Velejar x3, movimentos A, B, C |
| roubar.webp | 13 | Exemplo de roubo de Runa |
| batalha.webp | 8 | As 4 Cartas de Benefício escolhíveis |
| pontuacao.webp | 15 | Fúria final 15/15/13 |

A `preparacao.webp` mantém os rótulos curtos da ilustração (números e nomes dos componentes); não há bloco de texto do manual. A `batalha.webp` é pequena no original (o PDF embute imagens a 150 ppi) e fica pouco nítida.

Vídeo: "TINY EPIC VIKINGS - Gameplay resumida", Duque Board Games (oEmbed), no fim do "Comece". É uma partida resumida, não um "como jogar"; nenhum segundo foi conferido, então não há vídeo dentro das etapas.

## 11. Dados do `conteudo/como-jogar/tiny-epic-vikings.json`

- jogadores 1 a 4, duração 30 a 60 min, idade 14+, edição Asmodee (Galápagos): página do produto (seção 2).
- etapas 5; leitura_min 32 (cerca de 6.450 palavras a 200 por minuto); resenha null; publicar false.
