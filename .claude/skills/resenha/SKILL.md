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

- `conteudo/<slug>.json`: todo o conteúdo de uma resenha (ficha, prós, contras, fontes e o `roteiro` do infográfico).
- `tools/build_review.py conteudo/<slug>.json`: gera `<slug>/index.html` a partir do JSON. Não edite o HTML à mão.
- `tools/prompt_infografico.py conteudo/<slug>.json`: monta o prompt do infográfico a partir do `roteiro`.
- Ferramentas: busca na web funciona; Wikipedia abre via `curl`; Ludopedia e BoardGameGeek bloqueiam acesso automatizado (não contornar), então os números deles vêm da busca e são sinalizados na ficha.
- Higgsfield: o modelo do Nemesis já foi enviado como `media_id` `ecdff0d7-7623-4536-b4f4-a98d81b058c6`; reutilize. Gere 2 variações por jogo e escolha a com texto correto.

- `pauta.json`: fila de jogos, regras e resenhas publicadas.
- `nemesis/index.html`: **modelo de página**. Copie a estrutura e o CSS; troque as cores de cada jogo (`--n`, `--l`, `--r`) pela paleta do tema.
- `nemesis/infografico.webp`: **modelo visual** do infográfico (referência obrigatória na geração).
- `resenhas/index.html`: lista de resenhas. Acrescente um card novo **no topo** da grade.
- Cada resenha mora em `<slug>/` com `index.html`, `infografico.webp` (até ~450 KB) e `capa.jpg` (800×800, até 250 KB, usada no og:image).

## Etapa 0: atualizar a pauta

Prêmios que contam (de `pauta.json > regras`): Golden Geek, Spiel des Jahres, Kennerspiel, Kinderspiel, As d'Or, Deutscher Spiele Preis e Prêmio Ludopedia. Entram vencedores e indicados que ficaram entre os 3 melhores da categoria. Excluir as categorias Aplicativo e Print & Play.

Para cada prêmio novo: colete de página oficial (Wikipedia só para conferir), registre `{premio, ano, categoria, colocacao, fonte}` e una com o jogo existente pelo nome oficial do BGG. Recalcule `prioridade`: vencedores antes de indicados; jogos-base antes de expansões; mais premiações primeiro; prêmio mais recente primeiro. Nunca inclua um jogo sem fonte do prêmio.

## Padrão de qualidade (Prompt Mestre 3.0 e Sistema de Infográfico v2 da Elite Boardgamers)

Os dois PDFs do usuário são a norma. Resumo operacional:

**Prioridade em conflito:** política de evidência > pedido do usuário > configuração > resto.

**Pesquisa (8 a 20 buscas ou leituras):** BGG (nota, votos, ranking, peso, enquete de jogadores, idade), Ludopedia (nota, avaliações, edição nacional), editora e manual, ao menos duas críticas independentes **lidas na íntegra** (baixe a página com `curl` e leia; só atribua opinião a quem você leu), fóruns. Pare quando cada campo da ficha tiver fonte ou "não confirmado" e houver três fortes e três fracos.

**Política de evidência:** cada afirmação é fato verificado (com fonte), consenso ("jogadores relatam com frequência"), opinião isolada ("uma minoria aponta") ou leitura editorial ("Nossa leitura:"). Dado ausente: "Não confirmado nas fontes consultadas." Divergência: mostre as duas. Número de comunidade sempre com data. Base e expansão nunca misturadas. Sem nota própria da marca. Preço só com fonte e data.

**Texto (`conteudo/<slug>.md`, 1.500 a 2.500 palavras, sem travessão):** 1 linha de identificação "Resenha: [nome] ([ano], [editora]) | Marca: Elite Boardgamers | Consulta em [data]"; 2 "Elite Boardgamers apresenta" + título + linha fina; 3 abertura; 4 ficha técnica (tabela); 5 recepção BGG x Ludopedia; 6 como funciona com exemplo de turno e "o coração do jogo"; 7 pontos fortes (3 a 5); 8 pontos fracos (3 a 5, com gravidade Leve/Moderada/Grave e frequência recorrente/isolada); 9 experiência de mesa; 10 modo solo; 11 comparação (tabela) + "Escolha X se"; 12 para quem é / não é; 13 veredito (Altamente recomendado | Recomendado | Recomendado para um público específico | Experiência de nicho | Não recomendado para o perfil analisado) terminando em "RECOMENDADO PARA FÃS DE [perfil]"; 14 fontes com links. Use `azul.md` como modelo. Gere a página com `python3 tools/build_review_md.py conteudo/<slug>.md`.

**Infográfico (`conteudo/<slug>.arte.json`, vertical 2:3, 1024x1536, teto ~380 palavras):** faixas A (selo, título, chamada) a G (veredito, compra, fontes), textos literais [A1] a [G4]. Use `azul.arte.json` como modelo.
- Caminho principal: `python3 tools/prompt_mestre.py conteudo/<slug>.arte.json` gera o prompt; Higgsfield `gpt_image_2_5`, `aspect_ratio 2:3`, `quality high`, imagem 1 = logo (`media_id ce4a7982-af2d-4535-b3e6-88f322ee737b`), imagem 2 = referência Nemesis (`ecdff0d7-7623-4536-b4f4-a98d81b058c6`).
- Revisão: confira cada item [A1] a [G4]. Até 3 erros: correção cirúrgica um por vez. Mais de 3: refazer com 15% menos texto. Mesmo erro após 2 correções: Plano B.
- **Plano B (diagramação híbrida):** `python3 tools/infografico_html.py conteudo/<slug>.arte.json <saida.png>` monta a arte em HTML com texto 100% fiel e falha se algum painel transbordar. Fundo e ilustração central podem vir de imagens geradas **sem texto** (campos `fundo` e `ilustracao` no JSON).

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
