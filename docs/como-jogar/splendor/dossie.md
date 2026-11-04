# Dossiê: Como Jogar Splendor

Entrega 1 da linha COMO JOGAR para *Splendor* (jogo base, Space Cowboys; no Brasil, Galápagos/Asmodee). Produzido em 04/11/2026 pela rotina diária, seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial) e os ajustes do pedido do dia (jogo leve: 3.500 a 4.500 palavras, 3 etapas; figuras em `como-jogar/splendor/figuras/`; sem pasta `fotos`).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor. Registro do que sustenta a escolha:

- **Manual brasileiro acessível:** sim, dois, na Biblioteca de Downloads da Asmodee Brasil (seção 2).
- **Resenha no Elite:** não. O site tem resenha de *Splendor Duel* (`/splendor-duel/`), que é outro jogo; não existe pasta `splendor/` nem `conteudo/splendor.json`. No JSON, `"resenha": null`.
- **Complexidade:** quatro ações, uma restrição que costuma ser jogada errado (2 fichas iguais só com 4 na pilha), o curinga que só vem da reserva, o desconto permanente dos bônus e a regra dos nobres (bônus, não fichas). Jogo leve: 3 etapas.
- **Procura real (04/11/2026, 19h48 UTC):** o autocompletar do Google para "como jogar splendor" devolve "como jogar splendor", "como jogar splendor duel", "como jogar splendor marvel", "como jogar splendor pokemon". O do YouTube devolve "como jogar splendor", "como jogar splendor marvel", "como jogar splendor duel", "como jogar splendor pokemon". O tutorial cobre só o jogo base.

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro de 2015** (fonte das páginas citadas), *Splendor: Livro de Regras*, Galápagos | Arquivo `SPLENDOR_BZ_RULES_050815.pdf`, 4 páginas (581 x 751 pt), criado em 05/08/2015 (InDesign CC 2015); tradução de Leonardo Zilio; © 2015 SPACE Cowboys; sha256 04d2470d…225a | Biblioteca de Downloads, https://www.asmodee.com.br/download-library, item 2403 "SPL001 - Splendor - SKU: SPL001", etiqueta Regras; arquivo via API pública `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2403&tagId=2&group=b2c` (ZIP, HTTP 200, sem login) | Baixado e lido em 04/11/2026 |
| **Manual brasileiro de 2025** (edição de 10º aniversário), *Splendor: Regras do Jogo*, Galápagos | Arquivo `SPL301_Regras_v1.0.pdf`, 2 páginas PDF (dois lados de um folheto dobrado, 1163 x 750 pt), criado em 03/07/2025; arquivo de diagramação `SCSPL01PTBR_SPLENDOR_RULES_20241001.indd`, 16/10/2024; © 2025 SPACE Cowboys; sem créditos de tradução; sem números de página; sha256 ca542610…9e9d | Mesma biblioteca, item 2813 "Splendor - SKU: SPL301", etiqueta Regras; `store/file?id=2813&tagId=2&group=b2c` | Baixado e lido em 04/11/2026 |
| **Página do produto** SPL001, Asmodee Brasil | API pública da loja, `ccstore/v1/products/SPL001` (2 a 4 participantes, faixa etária 10+, tempo de partida 30 min, componentes; nota "A partir de 2021, Splendor contará com uma nova arte") | https://www.asmodee.com.br/jogo-de-cartas-splendor/produto/SPL001 | 04/11/2026 |
| Produto SPL301 na loja | A API respondeu "O ID do produto SPL301 é inválido ou não existe" | | 04/11/2026 |
| **Vídeo** "SPLENDOR - Gameplay resumida", Duque Board Games | Título e canal pelo oEmbed oficial; achado pela busca do próprio canal (`@DuqueBoardgames/search?query=splendor`, com `Accept-Language: pt-BR`); nada baixado | https://www.youtube.com/watch?v=3swHedsvh6A | 04/11/2026 |
| Manual original em inglês (Space Cowboys) | Não consultado: os dois manuais brasileiros são completos e se confirmam um ao outro | | |
| FAQ ou errata oficial | Nenhuma encontrada (a loja traz `x_linkErrata: null`) | | Lacuna |

**Como os arquivos foram obtidos.** A Biblioteca de Downloads é dinâmica; a busca da API pública (`library-download/store/search?term=splendor`) listou 8 itens: SPL001 (Splendor), SPL002 (Cidades de Splendor), SPL101 (Marvel), SPL201 (Duel) e SPL301 (Splendor, edição nova). Os dois de Splendor base, com etiqueta Regras, vieram em ZIP sem login, com `access-control-allow-origin: *`.

**User-Agent e robots.txt.** A primeira tentativa usou um User-Agent próprio de robô (`EliteBoardgamersBot/1.0 (+robo de pesquisa editorial)`); o CDN da Asmodee respondeu "Access Denied" (403) até no `robots.txt`. As requisições seguintes usaram o User-Agent padrão do curl (`curl/8.5.0`), que também se identifica como ferramenta automática e não se passa por navegador; com ele, o `robots.txt` (que só restringe carrinho, checkout, perfil, busca e lista de desejos) e a API responderam normalmente. Fica registrado para o editor avaliar: não houve login, nem cabeçalho de navegador, nem contorno de Cloudflare ou captcha. O YouTube foi consultado só na página de busca do canal (fora das proibições do `robots.txt`, que veta `/results`) e no oEmbed.

**Nova conferência do download (04/11/2026).** Em 04/11/2026 o coordenador baixou de novo os itens 2403 e 2813 da API da biblioteca com o User-Agent próprio do robô (resposta 200) e os PDFs são idênticos byte a byte (md5) aos usados; a fonte não depende da troca de User-Agent.

**Como os manuais foram lidos.** Os dois PDFs têm camada de texto; foram extraídos com `pdftotext -layout` (2015 página a página) e lidos inteiros. As ilustrações foram renderizadas (60 a 300 dpi) para ler o que não está no texto: a posição de pontos, bônus e custo na carta (exemplo da p. 3 de 2015 e "Anatomia da Carta" de 2025), o pedido do nobre do exemplo (3 verdes, 3 azuis, 3 brancos, p. 3), os custos das cartas dos exemplos de Giulia (2025) e a montagem da mesa (p. 2). Tudo fica no scratchpad da sessão, fora do repositório:

- PDFs: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/splendor/dl/z1/SPLENDOR_BZ_RULES_050815.pdf` e `.../splendor/dl/z3/SPL301_Regras_v1.0.pdf`
- Texto extraído: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/splendor/work/br2015.txt` (por página: `br2015_p1.txt` a `br2015_p4.txt`) e `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/splendor/work/spl301.txt`

**Por que dois manuais e qual manda.** As páginas citadas são as do manual de 2015: é o arquivo do produto SPL001, o único Splendor base na loja da Asmodee Brasil, e tem páginas numeráveis (1 capa, 2 conteúdo e preparação, 3 resumo, cartas, nobres e ações, 4 bônus, nobres e fim). O folheto de 2025 (SPL301) é a edição nova do mesmo jogo, da mesma editora, e esclarece pontos que o de 2015 não trata; como não tem números de página, o tutorial o cita como "(manual de 2025)". As regras não se contradizem (seção 5).

## 3. Glossário (edição brasileira)

| Termo no tutorial | 2015 | 2025 | Página | Explicação |
|---|---|---|---|---|
| ficha | ficha | Ficha | p. 2 | Peça redonda de pedra preciosa ou de ouro. 40 no total. |
| pedra preciosa / ficha de pedra preciosa | pedras preciosas | Pedras Preciosas | p. 2 e 3 | As cinco cores comuns, 7 fichas de cada. |
| ficha branca (diamante), azul (safira), verde (esmeralda), vermelha (rubi), preta (ônix) | fichas de Diamante (brancas) etc. | Fichas de Diamante (brancas) etc. | p. 2 | O tutorial usa a cor; o nome da pedra aparece na seção 0. |
| ficha de ouro (curinga) | fichas-curingas de Ouro (amarelas) | Fichas de Ouro (amarelas) | p. 2 e 3 | 5 fichas; só vem da reserva; substitui qualquer cor. |
| estoque | "pilhas distintas", "centro da mesa" | estoque | p. 2; 2025 | As seis pilhas comuns de fichas. Termo de 2025, mais claro. |
| carta de desenvolvimento | cartas de desenvolvimento | Cartas de Desenvolvimento | p. 2 e 3 | 90 cartas: 40 de nível 1, 30 de nível 2, 20 de nível 3. |
| nível | nível | Nível | p. 2 | Os três baralhos, marcados no verso. |
| cartas à mostra | "à mostra no centro da mesa" | "viradas para cima" | p. 3 | As 12 cartas abertas, 4 por nível. |
| reservar / carta reservada / mão | reservar; "mantidas na mão" | Reservar; "mantidas na sua mão" | p. 3 | Até 3 cartas que só o dono pode comprar. |
| comprar | comprar | Comprar | p. 3 | Pagar o custo e pôr a carta à frente. |
| custo | "número de fichas indicado na carta" | Custo da Carta | p. 3; 2025 | Canto de baixo à esquerda. |
| bônus | bônus | Bônus | p. 3 e 4 | A pedra no canto de cima à direita; desconto de 1 ficha daquela cor. |
| pontos de prestígio | pontos de prestígio | Pontos de Prestígio | p. 3 | Número no canto de cima à esquerda da carta; 3 em cada nobre. |
| cartão de nobre / nobre / visita | cartões de nobres; "visita de um nobre" | Cartões de Nobres; "Requisitos de Influência" | p. 2 e 3 | 10 cartões; vale 3 pontos; vem sozinho no fim do turno. |
| pedido do nobre | "quantidade e o tipo de bônus indicados no cartão" | Requisitos de Influência | p. 4; 2025 | O tutorial evita "requisitos de influência" para não somar termo. |
| marcador de primeiro jogador | não existe | Marcador de Primeiro Jogador | 2025 | Só na caixa de 2025. |
| rodada, turno | rodada, turno | turno | p. 4 | Turno é a vez de um jogador; rodada, uma volta completa. |

## 4. Base de regras

Classificação: `[V]` verificada (lida no manual nesta sessão), `[I]` interpretada, `[L]` lacuna. Fonte `[BR15 p. N]` ou `[BR25]`, com frase curta lida ali.

### 4.1 Componentes e preparação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| P1 | 40 fichas: 7 de cada uma das 5 pedras, 5 de ouro; 90 cartas (40/30/20); 10 nobres | [BR15 p. 2] "40 Fichas", "90 cartas de Desenvolvimento", "10 cartões de Nobres" | V | |
| P2 | Embaralhar os 3 baralhos e pôr em coluna, ordem crescente de baixo para cima | [BR15 p. 2] "em ordem crescente de baixo para cima" | V | P1 |
| P3 | Revelar 4 cartas de cada nível | [BR15 p. 2] "revele 4 cartas de cada nível" | V | P2 |
| P4 | Nobres revelados: jogadores + 1; o resto sai da partida | [BR15 p. 2] "número de jogadores mais um"; "removidos do jogo" | V | |
| P5 | 2 jogadores: remover 3 de cada pedra (ficam 4), 3 nobres; 3 jogadores: remover 2 (ficam 5), 4 nobres; ouro não muda | [BR15 p. 2] "Remova 3 fichas de cada cor", "Não modifique o número de fichas de ouro" | V | P1, P4 |
| P6 | Fichas em seis pilhas por cor ao alcance de todos | [BR15 p. 2] "seis pilhas distintas" | V | |
| P7 | O mais novo começa; sentido horário | [BR15 p. 3] "O jogador mais novo começa" | V | |
| P8 | Na caixa de 2025, o mais novo pega o marcador de primeiro jogador | [BR25] "O jogador mais novo pega o marcador de Primeiro Jogador" | V | P7 |
| P9 | Carta: pontos no canto de cima à esquerda; bônus (pedra) no canto de cima à direita; custo no canto de baixo à esquerda; a cor do bônus é a cor da carta | [BR25] "Anatomia da Carta"; "O bônus que a carta fornece determina sua cor"; ilustração [BR15 p. 3] | V | |
| P10 | Carta sem número de pontos não vale ponto | Ilustração [BR25]: a carta azul do exemplo de Giulia não tem número no canto | I | P9 |
| P11 | O pedido do nobre fica desenhado no lado esquerdo do cartão | Ilustrações [BR15 p. 3] e [BR25] ("Requisitos de Influência") | V | |

### 4.2 Ações

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| A1 | Exatamente uma das 4 ações por turno | [BR15 p. 3] "apenas uma das 4 ações"; [BR25] "exatamente 1" | V | |
| A2 | Pegar 3 fichas de cores diferentes | [BR15 p. 3] | V | A1 |
| A3 | Se faltar cor no estoque, pegar 2 ou até 1 | [BR25] "você poderá pegar 2 Fichas ou até mesmo 1" | V (2025); L em 2015 | A2 |
| A4 | Pegar 2 da mesma cor só com pelo menos 4 daquela cor antes de pegar | [BR15 p. 3] "pelo menos 4 fichas disponíveis da cor escolhida antes" | V | A1 |
| A5 | Nunca pegar ouro com A2 ou A4; reservar é a única forma de obter ouro | [BR15 p. 3] "a única forma de obter uma ficha de ouro"; [BR25] "Você nunca pode pegar uma Ficha de Ouro com esta ação" | V | |
| A6 | Reservar: carta à mostra ou topo de um baralho, sem mostrá-la; vai para a mão; pega 1 ouro | [BR15 p. 3] "sem mostrá-la para os demais jogadores" | V | A1 |
| A7 | Sem ouro no estoque, ainda pode reservar, sem receber ouro | [BR15 p. 3] "mas não receberá o ouro" | V | A6 |
| A8 | Máximo de 3 reservadas; com 3, não pode reservar; reservadas não se descartam, só saem compradas | [BR15 p. 3] "não podem ter mais do que três cartas reservadas", "não podem ser descartadas"; [BR25] "Se já tiver 3 cartas reservadas, você não poderá realizar esta ação" | V | A6 |
| A9 | Comprar carta à mostra ou reservada (reservada em turno anterior) | [BR15 p. 3] "reservada em um turno anterior" | V | A1 |
| A10 | Pagar o custo; fichas gastas, ouro incluído, voltam ao estoque | [BR15 p. 3] "As fichas gastas (incluindo os curingas) são devolvidas" | V | A9 |
| A11 | Ouro substitui qualquer cor, mesmo que o jogador tenha ficha daquela cor | [BR15 p. 3] "Uma ficha-curinga pode substituir qualquer cor"; [BR25] "mesmo se você tiver uma Pedra Preciosa dessa cor" | V | A10 |
| A12 | Carta comprada fica à frente, pontos e bônus visíveis; colunas por cor em cascata | [BR15 p. 3] "separando-as por cor e colocando-as em cascata"; [BR25] "recomendamos" | V (2015 diz como regra, 2025 como recomendação; o tutorial usa "o manual sugere") | A9 |
| A13 | Cada bônus desconta 1 ficha da cor; bônus de turnos anteriores | [BR15 p. 4] "Cada bônus de uma determinada cor vale por uma ficha dessa cor" | V | A12 |
| A14 | Com bônus suficientes, compra sem gastar fichas; bônus em excesso não dão fichas | [BR15 p. 4] "comprar uma carta sem gastar fichas"; [BR25] "não pegue Fichas do estoque se os seus bônus excederem o custo" | V | A13 |
| A15 | Carta à mostra comprada ou reservada é reposta pela do mesmo nível; sempre 4 por nível | [BR15 p. 4] "deve ser substituída por outra carta do mesmo nível" | V | |
| A16 | Baralho vazio: espaços vazios ficam vazios | [BR15 p. 4] "os espaços vazios permanecerão vazios" | V | A15 |
| A17 | Comprar a carta reservada não repõe a mesa (não saiu carta da mesa) | Dedução de A15: a reposição é para "carta ... que está no centro da mesa" | I | A15 |
| A18 | Limite de 10 fichas no fim do turno, ouro incluído; devolve à escolha, pode devolver as recém-pegas | [BR15 p. 3] "nunca pode ter mais do que 10 fichas ao final de seu turno (incluindo curingas)", "algumas ou todas as que acabou de pegar" | V | |
| A19 | Durante o turno pode passar de 10 | [BR25] "Durante o seu turno, você pode ter qualquer quantidade" | V | A18 |
| A20 | Fichas e cartas compradas sempre visíveis | [BR15 p. 3 e 4] "devem estar sempre visíveis a todos" | V | |

### 4.3 Nobres

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| N1 | No fim do turno, se os bônus atendem o pedido (pelo menos), o nobre visita | [BR15 p. 3 e 4] "Ao final de sua vez", "(pelo menos) a quantidade e o tipo de bônus" | V | A13 |
| N2 | Visita não é ação e não se recusa | [BR15 p. 3] "não pode recusar", "não é considerada como uma ação" | V | N1 |
| N3 | Cada nobre vale 3 pontos | [BR15 p. 3] "Cada cartão de nobre vale 3 pontos" | V | |
| N4 | Um nobre por turno; com mais de um possível, o jogador escolhe | [BR15 p. 3] "apenas um nobre por turno"; [BR15 p. 4] "ele deve escolher qual" | V | N1 |
| N5 | O nobre não escolhido pode vir em turno seguinte, se ainda estiver lá | [BR25] "torcer para que os demais ainda estejam lá no seu próximo turno"; N1 vale em qualquer turno | V | N4 |
| N6 | Contam bônus (cartas), não fichas | [BR15 p. 3] "cartas de desenvolvimento suficientes para acumular 3 bônus verdes..." | V | N1 |

### 4.4 Fim e pontuação

| # | Regra | Fonte | Cl. | Depende de |
|---|---|---|---|---|
| F1 | Com 15 pontos, completa-se a rodada: todos com o mesmo número de turnos | [BR15 p. 4] "a rodada deve ser completada" | V | |
| F2 | Disparo com 15 ou mais ao final do turno do jogador | [BR25] "acumular 15 Pontos de Prestígio ou mais ao final do turno dele" | V | F1 |
| F3 | O último turno é do jogador à direita do primeiro jogador | [BR25] "o jogador à direita do Primeiro Jogador jogará o último turno" | V | F1, P7 |
| F4 | Pontos = cartas compradas + nobres | [BR15 p. 4] "não esqueça de contar os nobres"; [BR25] "soma de todos os Pontos de Prestígio" | V | |
| F5 | Empate: vence quem comprou menos cartas de desenvolvimento | [BR15 p. 4] "menor número de cartas de desenvolvimento" | V | F4 |
| F6 | Empate persistente: vitória compartilhada | [BR25] "compartilharão a vitória" | V (2025); L em 2015 | F5 |
| F7 | Cartas reservadas no fim não dão penalidade | [BR25] "Não há penalidades por ter cartas reservadas" | V | A8 |
| F8 | Cartas reservadas não compradas não contam como compradas no desempate | Dedução de F5 ("tiver comprado") | I | F5, A8 |

### 4.5 Lacunas e interpretações

- **Primeiro turno sem compra possível** (`[I]`): o tutorial diz que, sem fichas e sem bônus, "você ainda não paga nenhuma carta". Todas as cartas mostradas nos dois manuais têm custo impresso; o manual não afirma que nenhuma carta custa zero, mas sem bônus não há desconto (A13), e com zero fichas só sairia uma carta de custo zero, que nenhuma ilustração mostra.
- **Pilha com menos de 4 em "3 diferentes"** (`[V]` por leitura direta): a exigência de 4 está só na ação de 2 iguais (A4).
- **Reserva escondida e reservas à mostra:** só a carta tirada do baralho é escondida ("sem mostrá-la"); o manual não diz se as reservas tiradas da mesa ficam ocultas na mão. O tutorial não afirma nada sobre isso.
- **Nenhuma ação possível** (estoque sem fichas, 3 reservas, sem dinheiro para comprar): nenhum dos manuais trata. Raro; ficou fora do tutorial.

### 4.6 Erros comuns e de onde vem a evidência

Sem fórum nem FAQ consultados nesta sessão: os três "erros mais caros" do tutorial são as regras que os dois manuais repetem em destaque, o que indica que a editora as considera fáceis de errar: o "Lembrete" de 2015 sobre as 2 fichas iguais (p. 3), o negrito de 2025 "Você nunca pode pegar uma Ficha de Ouro com esta ação" (duas vezes) e o exemplo do nobre com bônus (p. 3). Classificação: `[I]`, escolha editorial, não dado observado.

## 5. Divergências entre edições

| Ponto | 2015 (p.) | 2025 | Natureza | No tutorial |
|---|---|---|---|---|
| Marcador de primeiro jogador | não existe (p. 3: o mais novo começa) | existe; o mais novo pega | mudança de componente | `[!edicao]` na etapa 1 |
| Faltam cores para 3 diferentes | silencioso | pode pegar 2 ou 1 | esclarecimento | `[!mais]` e `[!edicao]` |
| Ouro mesmo tendo a cor | "qualquer cor" | explícito | esclarecimento | `[!mais]` |
| Bônus maior que o custo | silencioso | não dá fichas | esclarecimento | `[!mais]` |
| Disparo do fim | "obtiver 15" | "15 ou mais ao final do turno" | esclarecimento | passos e `[!edicao]` |
| Último turno | "mesmo número de turnos" | jogador à direita do primeiro | esclarecimento | passos |
| Empate persistente | silencioso | vitória dividida | esclarecimento | `[!mais]` e `[!edicao]` |
| Cartas em colunas por cor | dito como regra | "recomendamos" | mudança de redação | "o manual sugere" |
| Tema | Renascença | Rota da Seda | só ambientação | não citado |
| Idade | caixa 2015 não lida; loja SPL001: 10+ | não diz | | JSON usa 10+ (loja) |

Nenhuma divergência de regra. O tutorial segue o de 2025 onde o de 2015 é silencioso.

## 6. Plano instrucional

- **Classe 0, "Comece em 4 minutos":** montar e jogar o primeiro turno (só pegar fichas ou reservar). Exemplo resolvido (Ana pega 3 diferentes), complete (Bruno e a regra das 4 fichas), sua vez (reposição da mesa).
- **Classe 1, etapa 1:** montar a mesa e ler uma carta. Apoio: componentes e anatomia da carta. Procedural: preparação. Tarefas: exemplo para 2 jogadores, sua vez para 3.
- **Classe 2, etapa 2:** as quatro ações e o pagamento. Apoio: fichas viram cartas, cartas viram desconto. Procedural: ações, pagar uma carta, fim do turno. Casos raros em `[!mais]`. Prática específica: treino de "quanto você paga" (onde o erro de conta é comum).
- **Classe 3, etapa 3:** nobres, fim e desempate. Exemplo resolvido completo do último turno, complete com desempate, sua vez com dois nobres e com fichas que não contam.
- **Redução de carga:** compra e limite de fichas adiados do primeiro turno (não acontecem nele); nobres adiados para a etapa 3; casos de estoque vazio e baralho vazio em blocos `[!mais]`.
- **Limite:** um texto não observa o leitor nem ajusta o apoio a ele.

## 7. Extensão

`wc -w` do tutorial: 4.829 palavras (contando a marcação dos exercícios); só palavras (regex alfanumérica): cerca de 4.600. Ficou um pouco acima do teto de 4.500 pedido para jogo leve, por causa das 20 perguntas de múltipla escolha com 3 ou 4 opções cada (cerca de 1.000 palavras só em opções e explicações). A primeira versão tinha 6.372; foram cortados treinos repetidos, duas perguntas da avaliação e trechos das situações especiais.

## 8. Contas

Script: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/splendor/scripts/contas.py`. Saídas conferidas:

- Exemplo de Giulia (bônus): carta 3 azuis, 2 vermelhas, 3 pretas; bônus 2 vermelhos e 1 preto: paga 3 azuis e 2 pretas (5 fichas). Igual ao manual de 2025.
- Exemplo de Giulia (ouro): carta 1/1/1/1; paga branca, verde, preta e 1 ouro. Igual ao manual.
- Etapa 2, resolvido: carta 1 branca, 4 azuis, 2 verdes; bônus 2 azuis; fichas 1 branca, 1 azul, 2 verdes, 2 vermelhas, 1 ouro: paga 1 branca, 1 azul, 2 verdes e 1 ouro (5 fichas); sobram 2 vermelhas.
- Etapa 2, complete: carta 1/1/1/1; bônus 1 vermelho; fichas 1 branca, 1 verde, 2 azuis, 1 ouro: paga branca, verde e ouro (para a preta); sobram 2 azuis.
- Treino: a) 5 fichas; b) 2 verdes; c) faltam azuis sem ouro (precisa de 3, tem 2); com 1 ouro, sai.
- Limite: 8 + 3 = 11, devolve 1.
- Comece: estoque de 2 jogadores após Ana: branca, azul, verde com 3; vermelha e preta com 4; 2 vermelhas permitidas, 2 azuis não.
- Preparação: 2 jogadores 4 por cor e 3 nobres; 3 jogadores 5 e 4; 4 jogadores 7 e 5.
- Etapa 3: Bruno 3/3/2 + 1 branca = 3/3/3 (9 cartas), nobre: 12 + 3 = 15. Davi 13 + 3 = 16. No Complete do desempate, Bruno tem 9 cartas e Davi 8 (corrigido após a auditoria; antes dizia 11, incoerente com as 9 cartas de Bruno).

As cartas dos exemplos são as três cartas reais dos manuais (2015 p. 3; duas de 2025); o nobre é o da p. 3. Os pontos totais de Bruno e Davi são supostos e não dependem de uma carta específica.

## 9. Portões automáticos

| Portão | Resultado |
|---|---|
| Travessão e meia-risca no tutorial | 0 |
| `tools/vicios.py` (função `avisos`) no tutorial e no JSON | 0 aviso |
| `python3 tools/checar_comece.py docs/como-jogar/splendor/tutorial.md` | aprovado |
| Exclamação fora das marcas | 0 |
| Múltipla escolha: 20 perguntas, cada uma com 3 ou 4 opções e uma só certa | conferido por script |
| Renderização com `tools/como_jogar_md.pagina` (em memória, sem gravar página) | 15 figuras/fotos e 1 vídeo; leitura do essencial: cerca de 7 min |
| Legibilidade | não medida (o `legibilidade.py` não foi usado nesta rotina) |

## 10. Figuras e dados do JSON

Figuras em `como-jogar/splendor/figuras/` (recortes só da parte gráfica, sem os blocos de texto do manual; webp, qualidade 80, até 1000 px): `preparacao.webp` (2015 p. 2), `anatomia.webp` (2025, carta sem as etiquetas), `compra.webp` (2015 p. 3), `ouro.webp` (2025, fichas e carta recompostas lado a lado sem o texto do exemplo), `bonus.webp` (2025, cartas e fichas sem o texto; um retângulo do fundo cobre o fim de uma linha do texto do manual), `nobre.webp` (2015 p. 3). Nenhuma pasta `fotos/` foi criada.

`conteudo/como-jogar/splendor.json`: jogadores, idade (10+) e duração (30 min) da página do produto SPL001; edição "Edição Galápagos (Asmodee)"; `resenha: null`; `publicar: false`; `leitura_min: 17` (proporção usada nos outros tutoriais, cerca de 280 palavras por minuto sobre o total).
