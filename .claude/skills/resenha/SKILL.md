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
- `modelos/referencia-*.jpg`: **modelo visual** dos infográficos (referência obrigatória na geração).

- `pauta.json`: fila de jogos, regras e resenhas publicadas.
- `resenhas/index.html`: lista de resenhas, gerada por `tools/build_lista.py` a partir de `pauta.json` (não editar à mão).
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

O infográfico é **quadrado (1:1)**, no estilo das imagens de `modelos/referencia-*.jpg`. O roteiro fica em `roteiro` dentro de `conteudo/<slug>.json` (veja `conteudo/azul.json`):

| Campo | Conteúdo |
|---|---|
| `tema`, `cena`, `mesa` | descrição visual em inglês: paleta e ambientação, arte do topo, caixa e componentes |
| `titulo` / `chamada` | nome do jogo / frase de até ~55 caracteres |
| `lateral` | 8 linhas curtas (jogadores, duração, complexidade, solo, dados, designer, editora, ano) |
| `numeros` | 3 caixas `[rótulo, valor]`, só números com fonte |
| `passos` | 5 passos `[título, frase de até ~38 caracteres]` |
| `fortes` / `atencao` | 4 frases curtas cada |
| `ficha` | 5 linhas |
| `premios` | 3 medalhas |
| `veredito` | frase em caixa alta, até ~50 caracteres |

Texto curto é o que evita erro na imagem.

## Etapa 4: gerar o infográfico (OpenAI Batch API)

Padrão: **Batch API** (50% mais barata, entrega em até 24 h), com `gpt-image-2.5-flare`, 2048×2048, qualidade alta e as referências de `modelos/` pelas URLs do GitHub Pages.

- `python3 tools/lote_openai.py enviar conteudo/<a>.json conteudo/<b>.json ...` cria o lote e grava `lotes/pendente.json` (faça commit e push dele).
- `python3 tools/lote_openai.py buscar` verifica o lote; se concluído, salva `<slug>/variacao-1.png` e apaga `lotes/pendente.json`.

Refações pontuais e urgentes: `python3 tools/gerar_infografico_openai.py conteudo/<slug>.json` (síncrono, preço cheio). Use `--dry-run` para ver o prompt.

## Rotina diária (9h, sessão agendada)

1. `buscar` o lote do dia anterior. Se concluído, faça a etapa 5 nas imagens e apresente a mensagem de aprovação (etapa 6) com as imagens.
2. Prepare os 4 próximos `na_fila` (etapas 1 a 3), marque como `em_producao`, faça commit dos `conteudo/*.json` e `enviar` o lote novo. Commit e push de `lotes/pendente.json`.
3. Nada é publicado sem aprovação: quando o usuário aprovar, siga a etapa 7.

## Etapa 5: revisão do texto da imagem

Leia todo o texto visível e compare palavra por palavra com o roteiro: letras, acentos, números, palavras a mais. Se houver erro, edite a imagem pedindo para corrigir **somente** os trechos errados. Depois de 2 tentativas sem sucesso, gere a arte **sem texto** e componha os textos por cima em HTML e depois em imagem (Playwright), usando as mesmas fontes da página.

## Etapa 6: aprovação em lote

O ritmo é **4 resenhas por dia, aprovadas em lote**. Cada execução prepara os 4 próximos itens da pauta (etapas 1 a 5) e marca-os como `em_producao`. Depois para e apresenta **uma mensagem única**, numerada de 1 a 4, com: jogo e prêmios, nota e ficha resumidas, veredito, link das imagens e roteiro.

O usuário responde em uma linha, por exemplo "aprova 1, 2 e 4; refaz a 3: <ajuste>". Publique os aprovados (etapa 7) num único commit. Refaça só o que foi pedido e reapresente. Nada é publicado sem aprovação.

## Etapa 7: publicação

1. Salve a imagem aprovada como `<slug>/infografico.webp` (1600 px, até ~450 KB) e `<slug>/capa.jpg` (800×800) com Pillow, e apague `variacao-*.png`.
2. `python3 tools/build_review.py conteudo/<slug>.json` gera `<slug>/index.html`.
3. `python3 tools/publicar.py conteudo/<slug>.json` marca o jogo como `publicado` em `pauta.json` e regera `resenhas/index.html` inteira (`tools/build_lista.py`). Depois, `node tools/capa_resenhas.js` refaz `resenhas/capa.jpg` (prévia do WhatsApp da página de resenhas) com o mosaico das capas.
4. Teste no Playwright em 390 px e 1200 px: sem erros de JS e sem rolagem horizontal.
5. Commit em `main` e push.
6. Entregue a legenda do Instagram: gancho de até 125 caracteres na 1ª linha, 3–4 linhas de resumo com o veredito e o prêmio, uma pergunta para comentários, "Resenha completa no link da bio" e 8–12 hashtags em PT e EN.
