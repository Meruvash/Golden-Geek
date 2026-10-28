# Padrão editorial dos infográficos (v2)

Vale para todo infográfico novo. O modelo é `modelos/referencia-1.jpg` (Código Secreto): cada bloco informa algo concreto sobre **este** jogo, e quem lê só a imagem já sabe como se joga, o que é bom, o que pesa e para quem é.

`tools/checar_roteiro.py` confere estas regras e `tools/lote_openai.py enviar` / `tools/gerar_infografico_openai.py` se recusam a gerar a imagem se o roteiro não passar.

## Formato

- **Quadrado 1:1** (2048×2048), o formato que funciona no nosso fluxo do Instagram. (O 4:5 foi testado com o Gloomhaven e descartado.)
- Texto pequeno, mas legível no celular: mesma hierarquia do modelo, comprimida no quadrado.
- No primeiro teste em quadrado com 12 linhas de ficha, 8 barras e veredito de 55 palavras, a faixa de baixo saiu espremida e com texto embaralhado; por isso a ficha e o veredito têm limites menores. No segundo teste a IA deixou de fora as barras de "compatibilidade com seu perfil", então esse bloco saiu do quadrado.

## Blocos do `roteiro` (em `conteudo/<slug>.json`)

| Campo | Regra |
|---|---|
| `titulo` | Nome do jogo como aparece na caixa nacional (ou original). |
| `chamada` | 12 a 22 palavras: o que o jogo é + o gancho. |
| `destaque` | 15 a 28 palavras de opinião na caixa do canto superior direito. |
| `lateral` | 10 linhas: jogadores, duração, complexidade (com rótulo), modo solo, dados, designer, editora original, editora no Brasil, ano, idioma. |
| `numeros` | 4 caixas `[rótulo, valor, contexto]`. O contexto explica o número ("106 mil avaliações", "pesado"). Só números com fonte. |
| `como_resumo` | Uma linha de 8 a 18 palavras que resume a partida. |
| `passos` | 5 passos `[título, texto]`: título de 2 a 4 palavras; texto de 15 a 30 palavras explicando a regra de verdade. |
| `fortes` | 6 a 7 itens de 4 a 10 palavras, específicos do jogo. |
| `atencao` | 6 a 7 itens de 4 a 10 palavras, específicos do jogo. |
| `ficha` | 8 a 10 linhas `Campo: valor`, incluindo componentes. |
| `premios` | 1 a 3 medalhas, das premiações confirmadas em `premiacoes`. |
| `extra` | `{titulo, texto}`: um bloco útil e verificável (experimente online, versão para iniciantes, expansões, preço de referência com data). Texto de 20 a 45 palavras. |
| `veredito` | Frase de 5 a 12 palavras. |
| `veredito_texto` | 25 a 40 palavras: o que entrega, o que pesa e um conselho claro de compra. |

## Regras de conteúdo

1. **Nada inventado.** Todo número vem de fonte listada em `fontes`. O que não foi confirmado fica fora das caixas de números e aparece como "não confirmado" na lateral ou na ficha.
2. **Específico, não genérico.** Proibido item que serviria para qualquer jogo: "arte marcante", "muito divertido", "tema fino", "sorte nas cartas" sem dizer onde. Diga o quê e por quê: "Arte de Maxime Morin faz cada região parecer um quadro".
3. **Como funciona ensina.** Os 5 passos, lidos em sequência, explicam uma rodada de verdade, com os termos do jogo.
4. **Consistência.** Lateral, números e ficha batem com a `ficha` da página.
5. **Bandeira do Brasil** só na linha "editora no Brasil", e só se houver edição nacional confirmada.
6. **Revisão da imagem** (etapa 5 da skill): conferir bloco por bloco contra o roteiro. Duas falhas no mesmo bloco → gerar a arte sem texto e compor o texto por cima em HTML (Playwright).

# Padrão editorial do texto do site (v2)

A página é a resenha completa: precisa ensinar o jogo, mostrar como é jogar, pesar o que é bom e o que pesa com o porquê, e terminar com um conselho de compra claro. Ela nunca pode ter menos informação que o infográfico. `tools/checar_roteiro.py` confere estas regras também, e `tools/lote_openai.py enviar` e `tools/publicar.py` se recusam a seguir se o texto não passar.

| Campo (em `conteudo/<slug>.json`) | Seção da página | Regra |
|---|---|---|
| `selo` | nível de recomendação | Um de: **Recomendado**; **Recomendado com ressalva** (obrigatório quando há ponto de atenção "Grave" ou preço mínimo acima de R$ 800); **Não recomendado**. |
| `ressalva` | junto do nível | Só com "Recomendado com ressalva": o obstáculo em 2 a 6 palavras, tirado da resenha ("joga-se uma vez só", "preço acima de R$ 1.000", "textos em inglês"). |
| `melhor_para` | balão do perfil | Um de: `entrada` (peso BGG abaixo de 2, regras em ~15 min), `dupla` (2 jogadores é a melhor contagem), `festa` (melhor com 5+, até ~30 min), `cooperativo`, `solo` (modo solo avaliado como ótimo), `proximo` (peso entre 2 e 3), `estrategia` (peso a partir de 3,2 ou partidas de 2 h), `campanha` (história em várias sessões), `tema` (narrativa e imersão no centro). Escolha o que melhor descreve quem deve comprar, sem repetir o perfil das últimas resenhas quando houver dúvida. |
| `titulo_busca` | título no Google e na prévia | Até 62 caracteres, com o nome do jogo e a palavra "resenha", e um ângulo tirado da própria resenha (a frase de destaque, o prêmio principal, a comparação ou a série). Exemplos: "Cascadia: resenha do quebra-cabeça de natureza em 30 min", "Santuário ou Ark Nova? Resenha do vencedor do DSP 2026". "Vale a pena?" só quando for a dúvida real (jogo caro) e sem repetir a fórmula das últimas resenhas. O subtítulo do veredito já traz "Veredito: <jogo> vale a pena?". |
| `lede` | abertura | 50 a 90 palavras: o que é, o prêmio principal, para quem é e uma pista do veredito. |
| `como_funciona` | Como funciona | 4 a 6 parágrafos, 200 a 350 palavras no total: objetivo, o turno, a mecânica central, a progressão e como acaba e pontua. Termos do jogo explicados na primeira vez. |
| `experiencia` | Como é jogar | 2 a 3 parágrafos, 120 a 220 palavras: ritmo, decisões típicas e um exemplo concreto de jogada. |
| `funciona` | O que funciona muito bem | 5 a 7 itens `[título, texto]`, texto de 30 a 70 palavras com o porquê; opinião sempre atribuída ("Para a Board Game Quest, …"). |
| `atencao` | Pontos de atenção | 5 a 7 itens `[gravidade, título, texto]`, mesma regra. |
| `jogadores` | Com quantos jogar | 2 a 5 itens `[número de jogadores, texto, nível]`, 10 a 45 palavras; nível 3 = ótimo, 2 = bom, 1 = fraco (vira os pontinhos da página). |
| `primeira_partida` | Primeira partida | 50 a 120 palavras: tempo de explicação, o que confunde e uma dica prática. |
| `edicao_nacional` | Edição nacional e preço | 40 a 100 palavras: editora, idioma, preço de referência com data e disponibilidade (ou a falta de edição nacional). |
| `versoes` | Expansões e versões | 30 a 100 palavras: expansões, versão digital, versões de entrada. |
| `comparacoes` | Se você gosta de… | 2 a 3 itens `[jogo, slug ou null, texto]`, 20 a 50 palavras; o slug liga para a nossa resenha. |
| `para_quem` / `nao_e_para` | É para você se… | 4 a 5 itens cada. |
| `veredito` | Veredito | 80 a 140 palavras: o que entrega, o que pesa, para quem é e se vale o preço. |
| `citacao` | destaque em Como é jogar | `{texto, fonte}`: uma frase curta de crítica especializada que resume a experiência ("tradução livre" quando traduzida). |
| `preco_ref` | resumo e cartão de preço | `{faixa, data, obs}`: faixa de preço das lojas consultadas, data da consulta e observação (estoque, importado, sem edição nacional). |
| `fontes` | Fontes | pelo menos 6, com link. |

Resenhas antigas, cujo infográfico é anterior ao padrão v2, levam `passos`, `perfil` e `como_resumo` próprios no nível do site (mesmas regras do roteiro), sem mexer na imagem.

Layout (gerado por `build_review.py` quando a resenha tem `experiencia`): resumo de 30 segundos no topo, passos numerados (vêm do `roteiro.passos`), faixa escura com a citação, prós e contras em cartões que abrem com um toque, barras de perfil (`roteiro.perfil`), blocos de número de jogadores, dica de primeira partida, cartão de preço, comparações com capa, e no celular ficha, prêmios, versões e fontes começam fechados.

Regras de texto:

1. **Nada inventado**, como no infográfico. Regra do jogo é fato; elogio e crítica são opinião e sempre têm dono.
2. **Escreva para quem nunca jogou.** Frases diretas, sem jargão solto ("construção de baralho", não "deck-building" sem explicar).
3. **Atribuição natural.** "Para a Tabletop Gaming, …" e não "A IGN, citada pela Wikipedia, elogia…".
4. **Exemplo concreto** em Como é jogar e em pelo menos dois pontos fortes ou de atenção.
5. **Sem frase genérica** ("muito divertido", "arte marcante", "tema fino") sem dizer o quê e por quê.

## Fotos oficiais na página

Quando a resenha tem fotos aprovadas em `<slug>/fotos/fontes.json` (skill `imagens`) e o jogo foi liberado com `"usar_na_pagina": true` nesse arquivo (depois da revisão das fotos), `build_review.py` monta a página assim (modelo aprovado com Terraforming Mars):

- **Topo:** uma foto oficial do jogo no lugar do infográfico. Vale a foto marcada com `"principal": true`; sem marca, a ordem é mesa, componentes, jogabilidade, caixa.
- **Como é jogar:** a foto marcada com `"jogar": true`; sem marca, a próxima disponível (componentes, jogabilidade ou mesa), logo depois da citação.
- **Edição nacional e preço:** a caixa (`capa`), pequena, ao lado do texto.
- **Infográfico:** desce para o meio, na seção "Infográfico para o Instagram" depois de Prós e contras, com os botões Salvar na galeria e Legenda.
- Toda foto leva o crédito da editora embaixo ("Imagem: …").
- **Sem pessoas:** foto em que aparecem pessoas ou mãos leva `"pessoas": true` no `fontes.json` e não entra na página.
- **Miniatura:** a `capa.jpg` (cartão na lista de resenhas e prévia do link no WhatsApp) é refeita a partir da foto do topo, recortada no centro em 800×800, sempre que a página é gerada. O `og:image` leva `?v=` com a versão da imagem, para o WhatsApp buscar a nova.
- Só a caixa não basta: sem foto de mesa, componentes ou jogabilidade, a página continua com o infográfico no topo e a miniatura do infográfico.

## Crivo de qualidade das fotos

`python3 tools/imagens/crivo.py <slug>` avalia cada foto aprovada pelo robô e escolhe o lugar dela na página; `--aplicar` grava a escolha no `fontes.json` (`principal`, `jogar`, `fora`) e libera a página (`usar_na_pagina`). A página só ganha fotos se alguma passar para o topo; senão fica com o infográfico até chegarem fotos melhores. Os limites foram calibrados com as fotos já aprovadas.

**Eliminatórios (a foto não entra em lugar nenhum)** — marcados na revisão visual da folha de contato:
- pessoas ou mãos (`"pessoas": true`);
- texto por cima da foto (faixa de loja, selo, ícones de idade) ou texto em outra língua que domina a imagem (`"texto": true`);
- medidos pelo crivo: brilho médio fora de 40–235 (escura ou estourada) e nitidez abaixo de 6.

Foto de outra edição não reprova: entra com o aviso no crédito (`"Imagem: … · foto da 2ª edição; a resenha trata da edição original de 2017"`).

**Topo (foto principal)** — mesa, jogabilidade ou componentes, nessa ordem de preferência:
- lado menor de pelo menos 800 px;
- proporção até 1,8 (16:9); mais comprida vira uma faixa fina no celular;
- sem cara de catálogo: menos de 35% da foto em branco recortado e menos de 45% em fundo liso de estúdio;
- a caixa sozinha nunca vai para o topo.

**Como é jogar** — outra foto de mesa, jogabilidade ou componentes, com lado menor de pelo menos 600 px e proporção até 2,4. Prefere uma que também passaria no topo; foto de catálogo é aceita aqui.

**Preço** — a caixa, com lado menor de pelo menos 400 px.

# Padrão editorial das notícias (v1)

A notícia da Elite Boardgamers não repete o release: diz o que aconteceu, por que importa para quem joga no Brasil, o que a crítica acha e o que a gente recomenda. Herda do padrão das resenhas a regra de ouro: **fato tem fonte, opinião tem dono**. Conferido por `tools/noticias/checar_noticia.py`; `tools/build_home.py` não publica nota que não passa.

| Campo (em `conteudo/noticias/<data>-<assunto>.json`) | Seção da página | Regra |
|---|---|---|
| `titulo` | título | 8 a 16 palavras: o fato e quem, sem caça-clique. |
| `selo` | selo da nota | Um de: **Vale a compra**, **Vale acompanhar**, **Para fãs do jogo base**, **Com ressalvas**, **Informativo**. |
| `lide` | abertura | 35 a 70 palavras: o fato, quando, onde e a ligação com o Brasil. |
| `por_que_importa` | Por que importa | 30 a 70 palavras de **análise nossa**, assinada pela Elite Boardgamers: o que a notícia muda para o leitor. |
| `numeros` | Em números | 2 a 4 itens `[valor, rótulo, fonte]`. Só número com fonte; preço sempre com data. |
| `corpo` | Contexto | 1 a 3 parágrafos, 40 a 200 palavras: o que o leitor precisa saber para entender. |
| `no_brasil` | No Brasil | 25 a 80 palavras: editora nacional, preço com data, disponibilidade, ou a falta de edição nacional. |
| `critica` | O que diz a crítica | 1 a 3 itens `{fonte, texto, citacao}`; vazio só em nota **Informativo** sem resenha publicada, e a página avisa isso. `citacao: true` só para frase literal traduzida ("tradução livre"); senão é paráfrase atribuída ("Para a Board Game Quest, …"). |
| `para_quem` / `nao_e_para` | Interessa a você se… / Pense duas vezes se… | 1 a 3 itens cada (`nao_e_para` pode ficar vazio em nota informativa). |
| `veredito` | Nossa opinião | 20 a 60 palavras: conselho claro (comprar, esperar, acompanhar) e o porquê. |
| `fontes` | Fontes | pelo menos 2, com link e data da consulta. |
| `crivo` | Por que esta notícia entrou | pontos e critérios do crivo (PLANO_NOTICIAS.md). |
| `publicado_em` | (ordem das Últimas notícias) | Hora de publicação, ISO 8601. Preenchido por `tools/build_home.py` (commit que criou o arquivo ou a hora da geração); não se escreve à mão. A lista da página inicial segue esta hora, e a geração para se uma nota mais nova ficar fora dela. |
| `verificacao_nacional` | (não aparece na página) | Obrigatório quando a nota diz que um jogo não tem edição nacional, e recomendado para todo jogo citado: `[{jogo, resultado, data, fontes, obs}]`, com `resultado` "edição nacional" ou "não encontrada" e pelo menos 2 fontes com link, uma brasileira. "Não encontrada" exige o link do ComparaJogos. Ver regra 6. |

Regras de texto:

1. **Opinião ancorada.** O veredito se apoia nas nossas resenhas (quando o jogo tem) e na crítica citada; nunca em impressão solta.
2. **Brasil primeiro.** Toda nota responde: dá para comprar aqui, por quanto e de quem? Se não dá, diz isso.
3. **Sem citação inventada.** Frase entre aspas só se a frase original existe; o resto é paráfrase com dono.
4. **Previsão é previsão.** Data de lançamento é "prevista" até o jogo chegar às lojas.
5. **Crítica dividida aparece dividida.** Se as resenhas discordam, mostre os dois lados.
6. **Edição nacional: verificação obrigatória.** Ausência de notícia de lançamento não prova que o jogo não saiu no Brasil; foi assim que erramos Galactic Cruise (Jelly Monster, nov/2025), Rebirth e Hot Streak. Antes de escrever que um jogo não tem edição nacional, faça os três passos e registre em `verificacao_nacional`:
   1. `python3 tools/noticias/edicao_nacional.py "<nome do jogo>"`: consulta o ComparaJogos. Oferta de jogo novo em loja brasileira (fora Amazon e marketplaces) é sinal forte de edição nacional: abra a página da loja e confira editora e idioma.
   2. Página do jogo na Ludopedia (campo de edição nacional e "No Brasil").
   3. Busca na web em modo estendido, em português e pensando em loja: "<nome> jogo português loja brasileira", "<nome> editora nacional". A busca comum não alcança lojas brasileiras.

   Só então, e só se nada aparecer, escreva o que foi verificado e até quando: "não encontramos edição nacional até <data>". Nunca "não há", "não tem", "ainda não há" ou "sem edição nacional": o verificador recusa essas frases. Se um jogo tem edição nacional, diga a editora, o mês de lançamento e a fonte.
