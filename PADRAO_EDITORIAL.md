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
