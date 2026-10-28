---
name: resenha
description: Produz a próxima resenha da Elite Boardgamers a partir da pauta de jogos premiados (pauta.json) — pesquisa com fontes, texto do site, infográfico quadrado para Instagram no padrão editorial (PADRAO_EDITORIAL.md), legenda e publicação no GitHub Pages. Use quando pedirem "/resenha", "próxima resenha", "resenha de <jogo>" ou "atualizar pauta".
---

# Resenha Elite Boardgamers

Só fazemos resenha de jogos premiados. **Quem escolhe o jogo é a pauta, não o usuário.**

- Argumento vazio ou "próxima": pegue os **4** jogos `na_fila` de menor `prioridade` em `pauta.json` **que passarem na triagem de fotos (etapa 1)** (uma série conta como um item). Jogo sem foto boa para o topo sai da fila (`sem_fotos`) e entra o próximo.
- Argumento com nome de jogo: só aceite se ele estiver em `pauta.json`; senão, avise que não está na pauta.
- Argumento "pauta": rode apenas a etapa 0.

Se o jogo tiver `serie` ou outros itens da mesma série na fila (versões, sequências, expansões), faça uma resenha comparativa única, como `nemesis/`, e marque todos como publicados ao final.

## Arquivos

- `conteudo/<slug>.json`: todo o conteúdo de uma resenha (ficha, prós, contras, fontes, o `roteiro` do infográfico e a `legenda` do Instagram). A página mostra os botões "Salvar na galeria" e "Legenda" (copia o campo `legenda`); sem esse campo o botão Legenda some.
- `tools/build_review.py conteudo/<slug>.json`: gera `<slug>/index.html` a partir do JSON. Não edite o HTML à mão.
- `tools/prompt_infografico.py conteudo/<slug>.json`: monta o prompt do infográfico a partir do `roteiro`.
- Ferramentas: busca na web funciona; Wikipedia abre via `curl`; Ludopedia e BoardGameGeek bloqueiam acesso automatizado (não contornar), então os números deles vêm da busca e são sinalizados na ficha.
- `modelos/referencia-*.jpg`: **modelo visual** dos infográficos (referência obrigatória na geração).

- `pauta.json`: fila de jogos, regras e resenhas publicadas.
- `tools/fila_fotos.py`: triagem de fotos da pauta (`proximos`, `aprovado`, `sem-fotos`, `voltar`). Status `sem_fotos` = jogo fora da fila por falta de foto oficial boa para o topo, com data e editoras consultadas em `fotos`.
- `triagem/<slug>.json`: ficha mínima (nome e editoras) para buscar fotos antes de existir `conteudo/<slug>.json`.
- `resenhas/index.html`: lista de resenhas, gerada por `tools/build_lista.py` a partir de `pauta.json` (não editar à mão).
- Cada resenha mora em `<slug>/` com `index.html`, `infografico.webp` (até ~800 KB) e `capa.jpg` (800×800, até 250 KB, usada no og:image).

## Etapa 0: atualizar a pauta

Prêmios que contam (de `pauta.json > regras`): Golden Geek, Spiel des Jahres, Kennerspiel, Kinderspiel, As d'Or, Deutscher Spiele Preis e Prêmio Ludopedia. Entram vencedores e indicados que ficaram entre os 3 melhores da categoria. Excluir as categorias Aplicativo e Print & Play.

Para cada prêmio novo: colete de página oficial (Wikipedia só para conferir), registre `{premio, ano, categoria, colocacao, fonte}` e una com o jogo existente pelo nome oficial do BGG. Recalcule `prioridade`: vencedores antes de indicados; jogos-base antes de expansões; mais premiações primeiro; prêmio mais recente primeiro. Nunca inclua um jogo sem fonte do prêmio.

## Etapa 1: triagem de fotos (antes de pesquisar e escrever)

**Formato atual da resenha: foto oficial do jogo no topo e infográfico no meio** (modelo: `fate-of-the-fellowship/`, Sina da Sociedade). Por isso a busca de fotos vem **antes** de qualquer pesquisa ou texto: só entra em produção o jogo que tem foto boa para o topo. Não gaste pesquisa, texto nem imagem com jogo que vai travar na publicação.

1. `python3 tools/fila_fotos.py proximos 8` lista os próximos da fila com slug e situação ("fotos ok", "fazer triagem"…).
2. Para cada candidato sem fotos, descubra a editora original e a nacional (busca rápida na web) e crie a ficha mínima: `python3 tools/imagens/robo.py triagem <slug> --jogo "<nome da pauta>" --editora "<Editora original>" --nacional "<Editora no Brasil>"` (grava `triagem/<slug>.json`).
3. Siga a skill `imagens`: `robo.py buscar <slug>`, revisão da folha de contato, `aprovar`, marcas `pessoas`/`texto` e `python3 tools/imagens/crivo.py --aplicar <slug>`. O resultado precisa ser **PUBLICA** (`"usar_na_pagina": true`), com uma foto de mesa, jogabilidade ou componentes no topo. Prefira no topo a foto mais aberta do jogo montado; ajuste `principal` e `jogar` no `fontes.json` se a escolha do crivo não for a melhor.
4. Se o crivo disser "FICA COM O INFOGRÁFICO", **não pare na primeira editora**: percorra todas as fontes da skill `imagens`, nesta ordem: editora original, **editoras licenciadas em outros países** (Santuário só ganhou foto de topo com a Capstone, a edição americana, porque a Feuerland só tinha foto de catálogo), editora nacional, premiações. Para cada site novo: `mapear <dominio>` e `buscar <slug> --url <página do jogo>`, depois `aprovar ... --forcar --nota "edição ..."`.
5. **Passou:** `python3 tools/fila_fotos.py aprovado "<jogo>" <slug>` grava o slug na pauta, e o jogo segue para a etapa 1b.
6. **Não passou em nenhuma fonte:** `python3 tools/fila_fotos.py sem-fotos "<jogo>" --obs "<editoras consultadas>"` tira o jogo da fila (mantém a prioridade) e **o próximo da fila entra no lugar**. Guarde o rascunho do pedido de kit de imprensa para a mensagem ao usuário. Quando chegarem fotos (kit de imprensa, `robo.py kit`), `fila_fotos.py voltar "<jogo>"` devolve o jogo ao mesmo lugar.

Faça commit de `triagem/`, `<slug>/fotos/`, `tools/imagens/editoras.json` e `pauta.json` (nunca `.cache/`). As travas confirmam a regra: `lote_openai.py enviar`, `gerar_infografico_openai.py` e `publicar.py` recusam jogo sem fotos liberadas; `--sem-fotos` só com o OK do usuário.

## Etapa 1b: pesquisa (só para quem passou na triagem)

Fontes, em ordem: página da editora; BoardGameGeek; Ludopedia (nota, nº de avaliações, peso, enquete de nº ideal, edição nacional); duas críticas especializadas (SU&SD, Dicebreaker, GamesRadar+, Tabletop Gaming, Ars Technica…); opiniões recorrentes de jogadores.

Regras inegociáveis:
- Todo número tem fonte e data da consulta. O que não for encontrado fica **"não confirmado nas fontes consultadas"**. Nunca estime.
- Separe FATO de OPINIÃO e atribua cada opinião à crítica que a fez.
- Guarde o link de cada fonte (a seção Fontes da página tem links).

Saída da pesquisa: FICHA (ano, autor, editora, jogadores, duração anunciada e relatada, nota Ludopedia com nº de votos, peso, melhor com, edição nacional, **premiações da pauta**); COMO FUNCIONA; DIFERENCIAIS entre versões; ELOGIOS com fonte; CRÍTICAS com fonte e gravidade (leve/moderada/grave); PARA QUEM É / NÃO É; FONTES.

## Etapa 2: texto da resenha

O texto do site segue a segunda parte do **`PADRAO_EDITORIAL.md`** (exemplo completo: `conteudo/gloomhaven.json`). Seções: abertura (`lede`), Como funciona (4–6 parágrafos), Como é jogar (`experiencia`), O que funciona muito bem e Pontos de atenção (5–7 itens de 30–70 palavras, com gravidade), Com quantos jogar (`jogadores`), Primeira partida, Edição nacional e preço, Expansões e versões (`versoes`), Se você gosta de… (`comparacoes`, ligando para as nossas resenhas), Para quem é / não é (4–5 cada), Veredito com selo (Recomendado / Recomendado para público específico / Não recomendado) e tagline, Prêmios, Ficha e Fontes (pelo menos 6). Tom direto e honesto, escrito para quem nunca jogou; opinião sempre com dono; nada além do que está na pesquisa.

`python3 tools/checar_roteiro.py` confere o texto junto com o roteiro; `lote_openai.py enviar` e `publicar.py` se recusam a seguir se ele não passar.

## Etapa 3: roteiro do infográfico

O infográfico é **quadrado 1:1 (2048×2048)** e segue o **`PADRAO_EDITORIAL.md`** (leia antes de escrever). O modelo de densidade é `modelos/referencia-1.jpg` (Código Secreto) e o exemplo de roteiro completo é `conteudo/gloomhaven.json`.

Resumo dos mínimos: chamada de 12–22 palavras, destaque de 15–28, lateral de 10 linhas, 4 caixas de número com contexto, 5 passos de 15–30 palavras que ensinam a rodada, 6–7 pontos fortes e 6–7 de atenção específicos do jogo, ficha de 8–10 linhas, um bloco extra verificável e veredito com parágrafo de 25–40 palavras. A pesquisa da etapa 1 precisa trazer dados suficientes para isso (componentes, edição nacional, idade, idioma, versão digital etc.), sempre com fonte.

Antes de gerar: `python3 tools/checar_roteiro.py conteudo/<slug>.json` precisa passar. Os geradores rodam a mesma checagem e se recusam a gerar se o roteiro estiver fora do padrão.

## Etapa 4: gerar o infográfico (OpenAI Batch API)

Padrão: **Batch API** (50% mais barata, entrega em até 24 h), com `gpt-image-2.5-flare`, 2048×2048 (1:1), qualidade alta e as referências de `modelos/` pelas URLs do GitHub Pages.

- `python3 tools/lote_openai.py enviar conteudo/<a>.json conteudo/<b>.json ...` cria o lote e grava `lotes/pendente.json` (faça commit e push dele).
- `python3 tools/lote_openai.py buscar` verifica o lote; se concluído, salva `<slug>/variacao-1.png` e apaga `lotes/pendente.json`.

Refações pontuais e urgentes: `python3 tools/gerar_infografico_openai.py conteudo/<slug>.json` (síncrono, preço cheio). Use `--dry-run` para ver o prompt.

## Rotina das fotos (14:51 de Brasília, sessão agendada)

Na véspera, a tarefa "Fotos oficiais das resenhas do dia seguinte (15h)" faz a triagem de fotos (etapa 1) dos próximos da fila, até deixar **4 jogos com "fotos ok"** prontos para a rotina das 8h; quem não tiver foto boa vira `sem_fotos` e o seguinte é testado. Ela não pesquisa nem escreve resenha, só faz commit de `triagem/`, `<slug>/fotos/`, `tools/imagens/editoras.json` e `pauta.json` e avisa o usuário dos jogos que saíram da fila, com o pedido de kit de imprensa pronto.

## Rotina diária (07:55 de Brasília, sessão agendada)

1. `buscar` o lote do dia anterior. Se concluído, faça a etapa 5 nas imagens e apresente a mensagem de aprovação (etapa 6) com as imagens. Jogo do lote que estiver `sem_fotos` não é apresentado: a imagem fica guardada em `<slug>/variacao-1.png` até as fotos chegarem.
2. Prepare os 4 próximos `na_fila` com "fotos ok" em `fila_fotos.py proximos` (se faltar algum, faça a triagem da etapa 1 antes; quem não passar vira `sem_fotos`), siga as etapas 1b a 3, marque como `em_producao`, faça commit dos `conteudo/*.json` e `enviar` o lote novo. Commit e push de `lotes/pendente.json`.
3. Nada é publicado sem aprovação: quando o usuário aprovar, siga a etapa 7.

## Etapa 5: revisão do texto da imagem

Leia todo o texto visível, bloco por bloco (topo, lateral, números, passos, fortes, atenção, ficha, prêmios, extra, perfil, veredito), e compare palavra por palavra com o roteiro: letras, acentos, números, palavras a mais. Se houver erro, edite a imagem pedindo para corrigir **somente** os trechos errados. Depois de 2 tentativas sem sucesso, gere a arte **sem texto** e componha os textos por cima em HTML e depois em imagem (Playwright), usando as mesmas fontes da página.

## Etapa 6: aprovação em lote

O ritmo é **4 resenhas por dia, aprovadas em lote**. Cada execução prepara os 4 próximos itens da pauta (etapas 1 a 5) e marca-os como `em_producao`. Depois para e apresenta **uma mensagem única**, numerada de 1 a 4, com: jogo e prêmios, nota e ficha resumidas, veredito, link das imagens e roteiro.

O usuário responde em uma linha, por exemplo "aprova 1, 2 e 4; refaz a 3: <ajuste>". Publique os aprovados (etapa 7) num único commit. Refaça só o que foi pedido e reapresente. Nada é publicado sem aprovação.

## Etapa 7: publicação

1. `python3 tools/salvar_imagem.py <slug>` salva `<slug>/infografico.webp` (1600 px de largura, até ~800 KB) e `<slug>/capa.jpg` (800×800, recorte do topo) e apaga `variacao-*.png`.
2. `python3 tools/build_review.py conteudo/<slug>.json` gera `<slug>/index.html`. Se o jogo tem fotos oficiais aprovadas, refaz também a `<slug>/capa.jpg` a partir da foto do topo (ver "Fotos oficiais na página" em `PADRAO_EDITORIAL.md`); por isso rode sempre depois do `salvar_imagem.py`.
3. `python3 tools/publicar.py conteudo/<slug>.json` confere se há fotos oficiais liberadas (`usar_na_pagina`; ver etapa 1), marca o jogo como `publicado` em `pauta.json` e regera `resenhas/index.html` inteira (`tools/build_lista.py`) e todas as páginas de resenha, para o bloco "Continue lendo" incluir a nova. Depois, `node tools/capa_resenhas.js` refaz `resenhas/capa.jpg` (prévia do WhatsApp da página de resenhas) com o mosaico das capas.
4. Teste no Playwright em 390 px e 1200 px: sem erros de JS e sem rolagem horizontal.
5. Commit em `main` e push.
6. Grave a legenda do Instagram no campo `legenda` de `conteudo/<slug>.json` antes do passo 2 (é o texto que o botão "Legenda" copia) e entregue-a também na resposta: gancho de até 125 caracteres na 1ª linha, 3–4 linhas de resumo com o veredito e o prêmio, uma pergunta para comentários, "Resenha completa no link da bio" e 8–12 hashtags em PT e EN.
