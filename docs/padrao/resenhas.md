# Padrão das resenhas: texto do site e fotos

> Parte do padrão editorial da Elite Boardgamers. Regras comuns (tom "Opinião forte", texto de gente, notícias e chamadas) ficam em `PADRAO_EDITORIAL.md`. As resenhas diárias estão pausadas desde 11/11/2026.


A página é a resenha completa: precisa ensinar o jogo, mostrar como é jogar, pesar o que é bom e o que pesa com o porquê, e terminar com um conselho de compra claro. Ela nunca pode ter menos informação que o infográfico. `tools/checar_roteiro.py` confere estas regras também, e `tools/lote_openai.py enviar` e `tools/publicar.py` se recusam a seguir se o texto não passar.

| Campo (em `conteudo/<slug>.json`) | Seção da página | Regra |
|---|---|---|
| `selo` | nível de recomendação | Um de: **Recomendado**; **Recomendado com ressalva** (obrigatório quando há ponto de atenção "Grave" ou preço mínimo acima de R$ 800); **Não recomendado**. |
| `ressalva` | junto do nível | Só com "Recomendado com ressalva": o obstáculo em 2 a 6 palavras, tirado da resenha ("joga-se uma vez só", "preço acima de R$ 1.000", "textos em inglês"). |
| `melhor_para` | balão do perfil | Um de: `entrada` (peso BGG abaixo de 2, regras em ~15 min), `dupla` (2 jogadores é a melhor contagem), `festa` (melhor com 5+, até ~30 min), `cooperativo`, `solo` (modo solo avaliado como ótimo), `proximo` (peso entre 2 e 3), `estrategia` (peso a partir de 3,2 ou partidas de 2 h), `campanha` (história em várias sessões), `tema` (narrativa e imersão no centro). Escolha o que melhor descreve quem deve comprar, sem repetir o perfil das últimas resenhas quando houver dúvida. |
| `titulo_busca` | título no Google e na prévia | Até 62 caracteres, com o nome do jogo e a palavra "resenha", e um ângulo tirado da própria resenha (a frase de destaque, o prêmio principal, a comparação ou a série). Exemplos: "Cascadia: resenha do quebra-cabeça de natureza em 30 min", "Santuário ou Ark Nova? Resenha do vencedor do DSP 2026". "Vale a pena?" só quando for a dúvida real (jogo caro) e sem repetir a fórmula das últimas resenhas. O subtítulo do veredito já traz "Veredito: <jogo> vale a pena?". |
| `og_titulo` | nome do jogo no site (veredito, perguntas frequentes, guias, prévia, busca) | Sempre no modelo fixo "<nome no Brasil> vale a pena? Resenha Elite Boardgamers" (ex.: "Santuário vale a pena? Resenha Elite Boardgamers"). Não é título de busca nem de compartilhamento: o ângulo criativo vai no `titulo_busca`. Fora do modelo, o título inteiro vira o "nome do jogo" (erro de 30/10/2026); `checar_roteiro.py` recusa. |
| `descricao` | texto embaixo do título no Google | Até 155 caracteres (o Google corta o resto); `checar_roteiro.py` recusa acima disso. |
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
- **Sem rosto de frente:** foto com mãos, braços ou rosto de perfil pode entrar (29/10/2026). Só a foto em que aparece o rosto de alguém de frente leva `"pessoas": true` no `fontes.json` e não entra na página.
- **Miniatura:** a `capa.jpg` (cartão na lista de resenhas e prévia do link no WhatsApp) é refeita a partir da foto do topo, recortada no centro em 800×800, sempre que a página é gerada. O `og:image` leva `?v=` com a versão da imagem, para o WhatsApp buscar a nova.
- Só a caixa não basta: sem foto de mesa, componentes ou jogabilidade, a página continua com o infográfico no topo e a miniatura do infográfico.

## Crivo de qualidade das fotos

`python3 tools/imagens/crivo.py <slug>` avalia cada foto aprovada pelo robô e escolhe o lugar dela na página; `--aplicar` grava a escolha no `fontes.json` (`principal`, `jogar`, `fora`) e libera a página (`usar_na_pagina`). A página só ganha fotos se alguma passar para o topo; senão fica com o infográfico até chegarem fotos melhores. Os limites foram calibrados com as fotos já aprovadas.

**Eliminatórios (a foto não entra em lugar nenhum)** — marcados na revisão visual da folha de contato:
- rosto de alguém de frente (`"pessoas": true`); mãos e perfil podem;
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

