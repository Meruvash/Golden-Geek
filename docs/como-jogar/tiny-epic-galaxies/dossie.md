# Dossiê: Como Jogar Tiny Epic Galaxies

Entrega 1 da linha COMO JOGAR para *Tiny Epic Galaxies*. Produzido em 01/11/2026 seguindo `docs/como-jogar/PROMPT_PILOTO.md`, Parte 2, com as exceções de `docs/como-jogar/BRIEF.md` (jogo já escolhido; sem commit; sem subagentes; sem explicação do método no tutorial; alvo de 3.500 a 6.000 palavras; exercícios de múltipla escolha; `[!mais]`; figuras e vídeo).

---

## 1. Escolha do jogo e procura real

O jogo foi escolhido pelo editor.

- **Manual brasileiro acessível:** sim, no site da Meeple BR (seção 2).
- **Resenha no Elite:** não há pasta `tiny-epic-galaxies/` nem `conteudo/tiny-epic-galaxies.json`. O JSON leva `"resenha": null`.
- **Complexidade:** seis símbolos de dado, duas posições de Nave num planeta, corrida de colonização, trilha de Império com custo crescente e a ação de seguir no turno dos outros. Peso leve a médio: quatro etapas.
- **Procura real (01/11/2026):** o autocompletar do Google para "como jogar tiny epic galaxies" não devolveu sugestões além da própria consulta; para "como jogar tiny epic" devolveu "como jogar tiny epic dungeons" e "como jogar tiny epic cthulhu". O do YouTube devolveu "tiny epic galaxies como jogar". A procura existe, mas é pequena; o jogo está fora de catálogo no Brasil (registro do levantamento em `lista.json`, scratchpad).

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual brasileiro** *Tiny Epic Galaxies: Manual de Regras*, Meeple BR Jogos | PDF de 12 páginas (306 x 468 pt), gerado em 15/11/2017 (Adobe InDesign CC 2017). Créditos BR: supervisão Fábio Ribeiro, tradução Guilherme Duque, revisão Vinicius Vieira, diagramação Cristiane Viana (Estúdio Chaleira). © Gamelyn Games / © Meeple BR Jogos | https://meeplebr.com/wp-content/uploads/2020/03/Manual-Tiny-Epic-Galaxies.pdf, linkado como "Manual do Jogo" na página do produto | Já baixado pelo agente que abriu a tarefa (scratchpad, `tinyepic/tiny-epic-galaxies.pdf`); lido em 01/11/2026 |
| **Página do produto**, Meeple BR | Consulta por WebFetch | https://meeplebr.com/product/tiny-epic-galaxies/ | 01/11/2026. Dados: 1 a 5 jogadores, 30 a 60 minutos, 14+, lista de componentes igual à da p. 2 do manual. Uma tentativa por curl recebeu "Not Acceptable" do Mod_Security; não foi contornada, e a página foi lida pela ferramenta de busca normal |
| Manual original em inglês (Gamelyn) | Não obtido | O QR code da capa do manual BR aponta para http://www.gamelyngames.com/games/tiny-epic-galaxies/ (decodificado da imagem); não foi preciso abrir: não houve dúvida de tradução que só o original resolvesse | Não usado |
| FAQ ou errata oficial | Nenhuma encontrada | | Lacuna |
| Vídeo de regras | "Desregrando: Tiny Epic Galaxies", canal Desregrando (título e canal pelo oEmbed oficial, https://www.youtube.com/watch?v=KBJyOJjQgrQ) | Busca do YouTube "como jogar tiny epic galaxies" | 01/11/2026. Busca no canal Duque Board Games (`@DuqueBoardgames/search?query=tiny epic galaxies`, `galaxies`, `tiny epic`): o canal tem Tiny Epic Cthulhu, Pirates, Dungeons, Crimes e Vikings, mas não Galaxies. O canal da Meeple BR também não tem vídeo de regras do jogo. O vídeo não foi assistido nem baixado; não é fonte de regra |

**Como o manual foi lido.** `pdftotext -layout` (482 linhas, lido inteiro) e renderização de todas as páginas a 110 dpi, e das p. 3 a 9 a 300 dpi, para ler o que só está nas ilustrações: os seis símbolos dos dados (p. 5), a trilha de colonização com o espaço de entrada antes do 1 (p. 5 a 7), a carta de planeta (p. 3 e 7), a trilha de Império (p. 8, a 400 dpi) e a Missão Secreta CONQUEROR (p. 9, a 500 dpi). Nada foi copiado para o repositório além dos recortes das figuras.

**Idioma dos componentes.** As ilustrações do manual brasileiro mostram painéis e cartas em inglês ("Activation Bay", "Converter", "Upgrade your empire", textos dos planetas, "CONQUEROR"). O manual diz que as ações dos planetas estão explicadas "no interior da caixa" (p. 8). Não foi possível confirmar se as cartas da caixa brasileira estão em português. Registrado em `[!edicao]` na etapa 1.

## 3. Glossário (edição brasileira)

| No tutorial (= manual BR) | Página | O que é |
|---|---|---|
| Painel Galáctico | 2, 3 | Tabuleiro de cada jogador |
| Frotas de Piratas / Piratas Galácticos | 3, 10 | Verso do Painel Galáctico, adversário da partida solo |
| Painel de Controle | 2, 3, 4 | Tabuleiro comum com a Área de Ativação e o Conversor |
| Área de Ativação | 4 | Onde ficam os dados usados |
| Conversor | 9 | Troca 2 dados por uma face à escolha em um terceiro |
| Cartas de Planeta; planetas disponíveis | 2, 3 | Os planetas abertos no centro da mesa |
| Cartas de Missão Secreta | 2, 3, 9 | Objetivo secreto de cada jogador |
| Dados de Ação | 2, 4 | 7 dados de seis símbolos |
| Naves | 2, 3, 5 | 4 por jogador |
| Marcador de Império, de Energia, de Cultura | 2, 3 | Peças de cada jogador |
| trilha de recursos | 3, 6 | Trilha de 1 a 7 de Energia e Cultura |
| trilha de Naves | 3 | Onde esperam as Naves ainda não ganhas |
| trilha de Império; Nível de Império; poder imperial | 3, 4, 8 | Trilha que define dados, Naves e pontos |
| pontos de vitória | 2, 4, 9 | A pontuação (o manual alterna maiúscula; o tutorial usa minúscula) |
| trilha de colonização | 5, 7 | Trilha de cada planeta, terminada em Diplomacia ou Economia |
| pousar na superfície / orbitar | 5 | As duas formas de chegar a um planeta |
| Mover Nave | 5 | Ação de dado |
| Coletar Recursos; Energia; Cultura | 6 | Ação de dado e os dois recursos |
| Colonização; Diplomacia; Economia; colonizar | 7 | Ação de dado e os dois símbolos |
| Utilize uma Colônia | 8 | Ação de dado (no solo, "Usar uma Colônia (Atacar)", p. 11) |
| Ação do Painel Galáctico: Aumente o Nível do seu Império | 8 | A ação do painel |
| rerrolar / rerrolagem | 4 | Rolar de novo dados não usados |
| seguir (ação de seguir) | 4 | Fazer a ação do dado de outro jogador por 1 Cultura |

## 4. Base de regras

Classificação: `[verificada]` lida no manual nesta sessão; `[interpretada]` leitura escolhida, com motivo; `[lacuna]` o manual não diz.

### 4.1 Objetivo, fim e pontuação
- Conquistar pontos de vitória colonizando planetas e aumentando o poder do império; vence quem tiver mais. [BR p. 2] "Quem tiver o maior número de pontos de vitória ao final do jogo é o vencedor" [verificada]
- Fim anunciado com 21 ou mais pontos; Missões Secretas não contam para esse total. [BR p. 9] "pontos de vitória provenientes das Cartas de Missão Secreta não contam para este total" [verificada]
- A rodada segue até todos terem o mesmo número de turnos; o primeiro jogador não joga de novo. [BR p. 4 e 9] [verificada]
- Missões reveladas; quem cumpriu soma os pontos; total = planetas + Nível de Império + missão. [BR p. 9] [verificada]
- Desempate: planetas colonizados; Nível de Império; Energia + Cultura; vitória compartilhada. [BR p. 9] [verificada]
- Anunciar a pontuação ao colonizar e ao subir de nível. [BR p. 7 e 8] [verificada]
- Missão CONQUEROR: 3 pontos para quem tiver mais planetas; empatado, 2, só com 3 ou mais jogadores. [BR p. 9, ilustração] [verificada na ilustração]. Depende de: missões.

### 4.2 Preparação
- Painel na cor escolhida; verso só no solo. [BR p. 3] [verificada]
- 4 Naves, 3 marcadores por jogador. [BR p. 3] [verificada]
- 2 Naves de pé no centro do painel, 2 na trilha de Naves. [BR p. 3] [verificada]
- 1 Cultura e 2 Energias. [BR p. 3] [verificada]
- Marcador de Império no primeiro espaço (estrela). [BR p. 3] [verificada]
- Planetas: jogadores + 2; com 5 jogadores, 6. [BR p. 3] [verificada]
- Painel de Controle e 7 dados no centro. [BR p. 3] [verificada]
- 2 Missões, fica com 1 embaixo do painel, descarta 1, resto na caixa sem olhar. [BR p. 3] [verificada]
- Mais novo começa (ou outro método). [BR p. 4] [verificada]

### 4.3 Turno e dados
- Rola o número de dados do Nível de Império; no começo, 4. [BR p. 4] "no primeiro turno do primeiro jogador, ele vai pegar 4 dados" [verificada]
- Ordem livre; não precisa usar todos. [BR p. 4] [verificada]
- Ativar: mover para a Área de Ativação; uma vez por turno; fica lá. [BR p. 4] [verificada]
- Seis símbolos: Mover Nave, Diplomacia, Economia, Energia, Cultura, Utilize uma Colônia. [BR p. 5, ilustração "Ações dos Dados"] [verificada na ilustração]
- Rerrolar a qualquer momento só dados não ativados; primeira grátis; adicionais 1 Energia. [BR p. 4] [verificada]; custo por rerrolagem e não por dado [interpretada: o texto diz "para quaisquer rerrolagens adicionais ... deve-se pagar 1 Energia"; a leitura por rerrolagem é a mais literal]
- Conversor: 2 dados não ativados no Conversor, um terceiro vira qualquer face; uma vez por turno; os 2 contam como usados; não pode ser seguido. [BR p. 9] [verificada]. O terceiro dado é usado depois como dado normal e pode ser seguido [interpretada: o manual só proíbe seguir "esta ação", a conversão].
- Fim do turno: os outros podem seguir a última ação; tire os dados; passe a vez no sentido horário. [BR p. 9] [verificada]

### 4.4 Mover Nave
- Do painel ou de um planeta para outro planeta; pousar (de pé, faz a ação da carta na hora) ou orbitar (deitada na primeira posição da trilha). [BR p. 5] [verificada]
- A primeira posição da trilha é o espaço de entrada, antes do 1. [BR p. 5, ilustração] [interpretada: o texto diz "primeira posição"; a ilustração põe a Nave nesse espaço. O tutorial evita contar passos absolutos: os exemplos falam do "último espaço antes do símbolo"]
- Obrigatório ir a planeta diferente; não troca superfície e órbita do mesmo planeta. [BR p. 5] [verificada]
- Pode ter uma Nave na superfície e uma na trilha do mesmo planeta; só uma por trilha e uma por superfície. [BR p. 5] [verificada]
- Naves de vários jogadores dividem espaço; Nave removida volta ao painel. [BR p. 5] [verificada]
- Pode trazer Naves de planetas de volta ao painel; várias podem ficar lá. [BR p. 5] [verificada]
- Não para painéis de outros nem para planetas colonizados por eles. [BR p. 5] [verificada]

### 4.5 Coletar Recursos
- 1 por Nave em órbita ou na superfície de planeta que produz o recurso; Energia também 1 por Nave no painel. [BR p. 6] [verificada]
- Exemplo do manual: 2 Culturas com uma Nave em órbita e outra na superfície. [BR p. 6] [verificada]
- Máximo 7 de cada. [BR p. 6] [verificada]; excedente perdido [interpretada: o manual só diz "nunca pode ter mais do que 7"]
- Gastou tudo: tira o marcador. [BR p. 6] [verificada]

### 4.6 Colonização
- Dado com o símbolo do fim da trilha avança uma Nave 1 espaço. [BR p. 7] [verificada]
- Chegou ao símbolo: colonizou; todas as Naves da carta voltam aos painéis. [BR p. 7] [verificada]
- Carta embaixo do painel com o texto e os pontos à mostra; anunciar pontuação; nova carta no lugar. [BR p. 7] [verificada]
- Pilha de planetas acabar. [lacuna]

### 4.7 Utilize uma Colônia e trilha de Império
- Ação do painel ou de um planeta colonizado por você. [BR p. 8] [verificada]
- Subir de nível: custo do próximo espaço, em um só recurso; exemplo do 2º para o 3º: 3. [BR p. 8] [verificada]
- Pontos pela trilha mais à esquerda; Nave ganha entra na hora; dado ganho só no próximo turno. [BR p. 8] [verificada]
- Valores da trilha (custo 2 a 6; dados 4, 5, 5, 6, 6, 7; Naves 2, 2, 3, 3, 4, 4; pontos 0, 1, 2, 3, 5, 8). [BR p. 8, ilustração; nível 1 pelo texto das p. 3 e 4] [interpretada: lidos na ilustração, parte apagada à esquerda. A leitura é coerente com os componentes (7 dados no total; 4 Naves, 2 na trilha de Naves), com o custo 3 do texto e com os 4 dados do começo. Os pontos do nível 1 não aparecem na ilustração (0 por ausência). O tutorial diz isso em `[!edicao]` e manda conferir no painel]

### 4.8 Seguir
- Depois de cada ação de dado, os outros têm alguns segundos; pagam 1 Cultura e fazem a ação na hora; uma vez por dado por jogador; ordem horária a partir do jogador da vez. [BR p. 4] [verificada]
- Quem segue usa as próprias peças. [interpretada: "o jogador faz imediatamente a ação daquele dado"; a ação de Coletar, por exemplo, conta as Naves de quem faz a ação]

### 4.9 Solo (Piratas Galácticos)
- Todas as regras das p. 10 e 11, resumidas em `[!mais]` nas Situações especiais. [verificada]. O detalhe das ações de ataque está no painel dos Piratas e não foi reproduzido.

### 4.10 Erros comuns
Fonte: leitura do manual (sem fonte externa consultada). Os candidatos são onde o manual concentra negrito e exemplos: bônus de Energia pelas Naves no painel (p. 6), primeira rerrolagem grátis e as outras pagas (p. 4), não misturar recursos ao subir de nível (p. 8, com exemplo), Missões fora da conta dos 21 (p. 9). Não há evidência externa de que sejam os mais comuns; o tutorial os trata como "erros caros", não como estatística.

## 5. Divergências entre edições

Não houve comparação com o manual original. Pontos de atenção registrados: componentes em inglês nas ilustrações; nome da ação "Utilize uma Colônia" (p. 8) e "Usar uma Colônia (Atacar)" no solo (p. 11). O tutorial usa "Utilize uma Colônia".

## 6. Plano instrucional

Classes de tarefa, da mais simples à mais completa:

1. **Primeiro turno** (Comece em 4 minutos): montar e usar 4 dados com 2 Naves. Apoio: ideia do jogo. Procedimento: montagem, tabela de símbolos, três regras transversais. Exemplo resolvido (Ana), complete (Bruno segue), sua vez.
2. **Montar a mesa** (etapa 1): procedimento com número de planetas por jogadores.
3. **Usar os dados** (etapa 2): Mover Nave, Coletar Recursos, rerrolar, Conversor. Exemplo sobre a ordem dos dados; treino de coleta (parte que precisa ficar automática).
4. **Colonizar e crescer** (etapa 3): corrida na trilha, Utilize uma Colônia, trilha de Império; treino de custos.
5. **Seguir e fechar** (etapa 4): seguir, fim anunciado, missões, desempate, com placar completo recalculado.

Carga: as Missões Secretas e o desempate foram adiados para a etapa 4; a trilha de Império completa, para a etapa 3 (no primeiro turno só importa o custo 2). A partida solo foi para as Situações especiais, em `[!mais]`.

## 7. Extensão

`wc -w`: cerca de 7.500 palavras brutas; cerca de 6.600 sem as etiquetas de página; cerca de 5.100 sem as opções e as explicações dos exercícios. Dentro do alvo para o texto corrido.

## 8. Contas

Refeitas em `scratchpad/tinyepic/galaxies-scripts/contas.py`:
- Planetas: 2 jogadores 4; 3, 5; 4, 6; 5, 6.
- Comece: Ana E 2 + 1 (painel) + 1 (planeta) = 4. Bruno segue: C 1 - 1 = 0; E 2 + 2 = 4.
- Etapa 2: Ana C 1 + 1 = 2; E 2 + 1 + 1 = 4; com Energia antes do Mover, só +1.
- Etapa 2 sua vez: 6 + 3 limitado a 7.
- Etapa 3: 1 (nível 2) + 5 = 6. Bruno nível 2 para 3: paga 3 Culturas, fica com 0 C e 2 E; 2 pontos do nível; 3 Naves. Custo 1 a 3 = 2 + 3 = 5.
- Etapa 4 (planetas dados só pela soma, para não supor valores de cartas): Bruno 5 + 16 = 21; Carla 3 + 18 = 21, + 3 da missão = 24; Ana 3 + 17 = 20; com missão de 4, 24, empate decidido por planetas (5 contra 4).
- Avaliação: 1 + 2 = 3 Energia; 2 rerrolagens extras = 2 Energias; nível 4 custa 4.

## 9. Portões automáticos

- `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-galaxies/tutorial.md`: passou (759 palavras na contagem do script, limite 800).
- Travessão e meia-risca: zero.
- `tools/vicios.py` (lista VICIOS aplicada ao arquivo inteiro): zero ocorrência.
- Exclamação fora das marcas de bloco e figura: zero.
- Conversor `tools/como_jogar_md.pagina` rodado em memória (sem gravar): 7 figuras, 1 vídeo, 14 blocos "Regra adicional", sem erro.
- Legibilidade (Flesch adaptado): não medido; a implementação citada não está neste repositório.

## 10. Dados do `conteudo/como-jogar/tiny-epic-galaxies.json`

Jogadores (1 a 5), duração (30 a 60 min), idade (14+) e componentes: página do produto da Meeple BR, 01/11/2026. Data: 2026-11-01. `publicar: false`. `resenha: null` (sem resenha no site). `leitura_min`: 27, pela mesma proporção do Azul (palavras brutas / 280); a página recalcula o tempo do essencial sozinha.

## 11. Figuras

Recortes do manual, só a parte gráfica, em `como-jogar/tiny-epic-galaxies/figuras/` (webp, qualidade 80, até 1000 px): `preparacao.webp` (p. 3, com os rótulos curtos do próprio desenho), `dados.webp` (p. 4), `mover.webp` (p. 5), `coleta.webp` (p. 6), `conversor.webp` (p. 9), `colonizacao.webp` (p. 7), `imperio.webp` (p. 8).
