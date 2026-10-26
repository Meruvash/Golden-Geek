---
name: resenha
description: Produz a próxima resenha da Elite Boardgamers a partir da pauta de jogos premiados (pauta.json) — pesquisa com fontes, texto do site, infográfico quadrado para Instagram no estilo do modelo Nemesis, legenda e publicação no GitHub Pages. Use quando pedirem "/resenha", "próxima resenha", "resenha de <jogo>" ou "atualizar pauta".
---

# Resenha Elite Boardgamers

Só fazemos resenha de jogos premiados. **Quem escolhe o jogo é a pauta, não o usuário.**

- Argumento vazio ou "próxima": pegue os **4** jogos `na_fila` de menor `prioridade` em `pauta.json` (uma série conta como um item).
- Argumento com nome de jogo: só aceite se ele estiver em `pauta.json`; senão, avise que não está na pauta.
- Argumento "pauta": rode apenas a etapa 0.

Se o jogo tiver `serie` ou outros itens da mesma série na fila (versões, sequências, expansões), faça uma resenha comparativa única, como `nemesis/`, e marque todos como publicados ao final.

## Arquivos

- `pauta.json`: fila de jogos, regras e resenhas publicadas.
- `nemesis/index.html`: **modelo de página**. Copie a estrutura e o CSS; troque as cores de cada jogo (`--n`, `--l`, `--r`) pela paleta do tema.
- `nemesis/infografico.webp`: **modelo visual** do infográfico (referência obrigatória na geração).
- `resenhas/index.html`: lista de resenhas. Acrescente um card novo **no topo** da grade.
- Cada resenha mora em `<slug>/` com `index.html`, `infografico.webp` (até ~450 KB) e `capa.jpg` (800×800, até 250 KB, usada no og:image).

## Etapa 0: atualizar a pauta

Prêmios que contam (de `pauta.json > regras`): Golden Geek, Spiel des Jahres, Kennerspiel, Kinderspiel, As d'Or, Deutscher Spiele Preis e Prêmio Ludopedia. Entram vencedores e indicados que ficaram entre os 3 melhores da categoria. Excluir as categorias Aplicativo e Print & Play.

Para cada prêmio novo: colete de página oficial (Wikipedia só para conferir), registre `{premio, ano, categoria, colocacao, fonte}` e una com o jogo existente pelo nome oficial do BGG. Recalcule `prioridade`: vencedores antes de indicados; jogos-base antes de expansões; mais premiações primeiro; prêmio mais recente primeiro. Nunca inclua um jogo sem fonte do prêmio.

## Etapa 1: pesquisa

Fontes, em ordem: página da editora; BoardGameGeek; Ludopedia (nota, nº de avaliações, peso, enquete de nº ideal, edição nacional); duas críticas especializadas (SU&SD, Dicebreaker, GamesRadar+, Tabletop Gaming, Ars Technica…); opiniões recorrentes de jogadores.

Regras inegociáveis:
- Todo número tem fonte e data da consulta. O que não for encontrado fica **"não confirmado nas fontes consultadas"**. Nunca estime.
- Separe FATO de OPINIÃO e atribua cada opinião à crítica que a fez.
- Guarde o link de cada fonte (a seção Fontes da página tem links).

Saída da pesquisa: FICHA (ano, autor, editora, jogadores, duração anunciada e relatada, nota Ludopedia com nº de votos, peso, melhor com, edição nacional, **premiações da pauta**); COMO FUNCIONA; DIFERENCIAIS entre versões; ELOGIOS com fonte; CRÍTICAS com fonte e gravidade (leve/moderada/grave); PARA QUEM É / NÃO É; FONTES.

## Etapa 2: texto da resenha

Mesma estrutura de `nemesis/`: chamada "Elite Boardgamers apresenta", título, abertura, ficha comparativa, Como funciona, O que muda (se houver versões), O que funciona muito bem (3–5), Pontos de atenção (3–5, com gravidade), Para quem é, Veredito com selo (Recomendado / Recomendado para público específico / Não recomendado) e tagline em caixa alta, Fontes. **Inclua um bloco com as premiações** (prêmio, ano, categoria, colocação). Tom direto e honesto; nada além do que está na pesquisa.

## Etapa 3: roteiro do infográfico

Limites de caracteres (com espaços). Texto curto é o que evita erro na imagem:

| Bloco | Limite |
|---|---|
| Título (pergunta ou chamada) | 28 |
| Subtítulo | 50 |
| Selo de prêmio (ex.: "GOLDEN GEEK 2019 · JOGO DO ANO") | 34 |
| Colunas (1–3): nome do jogo | 20 |
| … cada uma com 3 tópicos | 45 cada |
| Barra de info: 4 chips | 18 cada |
| O que funciona: 4 linhas, rótulo + frase | 14 + 110 |
| Pontos de atenção: 4 linhas, rótulo + frase | 14 + 110 |
| Veredito: até 3 itens, nome + complemento | 14 + 22 |

Para um jogo sem versões, use as colunas para três ângulos (ex.: "COMO JOGA", "DESTAQUE", "CUIDADO").

## Etapa 4: gerar o infográfico (Higgsfield, GPT Image 2.5)

1. Envie `nemesis/infografico.webp` com `media_upload` → `media_confirm` (uma vez por sessão) e use o `media_id` como `image_references`.
2. `generate_image` com `model: gpt_image_2_5`, `aspect_ratio: 1:1`, `quality: high`, `count: 2` (≈1,5 crédito por imagem).
3. Prompt (instruções em inglês, textos da arte em português):

```
Use the reference image ONLY as a layout and style template: same dark, glowing neon-panel infographic style, "ELITE BOARDGAMERS" crown logo top-left, bold condensed headline at top, columns with a stylized game box + icon bullets, a 4-chip info bar, a green "pros" panel on the left and a red "cons" panel on the right, and a gold "VEREDITO" bar at the bottom.
Replace the theme, colors and artwork to match <JOGO>: <descrição visual do tema>.
Add a gold award seal near the headline.
Square 1:1 Instagram infographic, high legibility on a phone.
Render EXACTLY this Portuguese text, spelled exactly as written with correct accents, and no other text:
<roteiro da etapa 3, bloco a bloco, cada texto entre aspas>
Game boxes are stylized illustrations; no real publisher logos.
```

## Etapa 5: revisão do texto da imagem

Leia todo o texto visível e compare palavra por palavra com o roteiro: letras, acentos, números, palavras a mais. Se houver erro, edite a imagem pedindo para corrigir **somente** os trechos errados. Depois de 2 tentativas sem sucesso, gere a arte **sem texto** e componha os textos por cima em HTML e depois em imagem (Playwright), usando as mesmas fontes da página.

## Etapa 6: aprovação em lote

O ritmo é **4 resenhas por dia, aprovadas em lote**. Cada execução prepara os 4 próximos itens da pauta (etapas 1 a 5) e marca-os como `em_producao`. Depois para e apresenta **uma mensagem única**, numerada de 1 a 4, com: jogo e prêmios, nota e ficha resumidas, veredito, link das imagens e roteiro.

O usuário responde em uma linha, por exemplo "aprova 1, 2 e 4; refaz a 3: <ajuste>". Publique os aprovados (etapa 7) num único commit. Refaça só o que foi pedido e reapresente. Nada é publicado sem aprovação.

## Etapa 7: publicação

1. Baixe a imagem aprovada e salve `<slug>/infografico.webp` e `<slug>/capa.jpg` (Pillow).
2. Crie `<slug>/index.html` a partir do modelo, com og:url, og:image e links de volta.
3. Acrescente o card em `resenhas/index.html`.
4. Em `pauta.json`, mude o status do(s) jogo(s) para `publicado` e acrescente o item em `publicadas`.
5. Teste no Playwright em 390 px e 1200 px: sem erros de JS e sem rolagem horizontal.
6. Commit em `main` e push.
7. Entregue a legenda do Instagram: gancho de até 125 caracteres na 1ª linha, 3–4 linhas de resumo com o veredito e o prêmio, uma pergunta para comentários, "Resenha completa no link da bio" e 8–12 hashtags em PT e EN.
