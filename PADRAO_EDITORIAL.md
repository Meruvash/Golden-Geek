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

Quando a resenha tem fotos aprovadas em `<slug>/fotos/fontes.json` (skill `imagens`), `build_review.py` monta a página assim (modelo aprovado com Terraforming Mars):

- **Topo:** uma foto oficial do jogo no lugar do infográfico. Vale a foto marcada com `"principal": true`; sem marca, a ordem é mesa, componentes, jogabilidade, caixa.
- **Como é jogar:** a próxima foto disponível (componentes, jogabilidade ou mesa), logo depois da citação.
- **Edição nacional e preço:** a caixa (`capa`), pequena, ao lado do texto.
- **Infográfico:** desce para o meio, na seção "Infográfico para o Instagram" depois de Prós e contras, com os botões Salvar na galeria e Legenda.
- Toda foto leva o crédito da editora embaixo ("Imagem: …").
- **Sem pessoas:** foto em que aparecem pessoas ou mãos leva `"pessoas": true` no `fontes.json` e não entra na página.
- A miniatura da lista de resenhas e do link compartilhado (`capa.jpg`) continua sendo o recorte do infográfico.
