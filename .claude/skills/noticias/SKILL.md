---
name: noticias
description: Monta a edição diária de notícias da página inicial da Elite Boardgamers — coleta (feeds, Bluesky, Ludopedia), crivo editorial, 5 notas por dia (meta de 5 pontos ou mais) no padrão de notícias (PADRAO_EDITORIAL.md), atualização dos blocos e publicação, tudo no ar sem esperar aprovação (inclusive a manchete). Se ainda faltarem notas de 5 pontos, faz uma segunda rodada em fontes nacionais e uma terceira em outras fontes antes de completar com as mais bem pontuadas. Use quando pedirem "/noticias", "edição do dia", "notícias de hoje" ou quando a tarefa agendada diária disparar.
---

# Edição diária de notícias

Meta: **5 notas por dia** (pedido do usuário em 29/10/2026; PLANO_NOTICIAS.md, "Edição diária"). O objetivo continua sendo 5 notas com **5 pontos ou mais** no crivo; para isso a pesquisa tem até **três rodadas** (seção 1). Só depois da terceira rodada, se ainda faltarem notas de 5 pontos, o dia fecha com as 5 mais bem pontuadas, independente da nota. Os eliminatórios (fonte primária, sem conteúdo pago, dentro do prazo, sem repetir nota, tabuleiro moderno) e o padrão das notícias valem sempre. **Desde 28/10/2026 tudo sai direto, manchete inclusive** (pedido do usuário): ninguém aprova nada. A segurança vem das checagens e da verificação das 22h (skill `verificacao`), que corrige sozinha o que estiver errado.

## 1. Coletar, em até três rodadas

Depois de cada rodada, pontue as candidatas novas (seção 2, passos 1 a 3). Quando houver **5 notas com 5 pontos ou mais**, pare e vá para a escolha. Se não houver, faça a rodada seguinte. Cada rodada usa fontes que as anteriores não usaram.

**Rodada 1: fontes automáticas.** `python3 tools/noticias/coletar.py --dias 2` (use `--dias 4` na segunda-feira). Lê os feeds liberados e os perfis do Bluesky de `tools/noticias/fontes.json`, atualiza `conteudo/lancamentos/` pela API da Ludopedia (`LUDOPEDIA_TOKEN` no ambiente; sem ele, avise no resumo) e grava `.cache/noticias/<data>.md` com as candidatas já ordenadas pelo pré-crivo e as eliminadas (conteúdo pago, fora do tabuleiro, já publicadas). O pré-crivo só ordena.

**Rodada 2: fontes nacionais.** Preferência para o Brasil (PLANO_NOTICIAS.md, "Fontes nacionais"): Ludopedia (LudoNews, "Rodada da semana nas editoras nacionais" e o calendário de lançamentos, procurando lançamento novo ou mudança de situação), Compara Jogos ("Estação de Notícias"), as páginas de lançamentos e pré-venda das editoras (Galápagos e o Spoiler Board, Devir, Grok, MeepleBR, Conclave, PaperGames, Ludens Spirit, Calamity, Bucaneiros), financiamentos nacionais no Catarse, Drops de Jogos, Poltrona Nerd e a agenda de eventos (Diversão Offline). Complete com WebSearch em português ("jogo de tabuleiro pré-venda", "lançamento jogo de tabuleiro <mês> <ano>", "<editora> lançamento") e use `--dias 4` se a rodada 1 foi com `--dias 2`.

**Rodada 3: outras fontes, principalmente internacionais.** As que as rodadas anteriores não leram: BGG News (boardgamegeek.com/blog/1), Shut Up & Sit Down, Tabletop Gaming, Wargamer, Dicebreaker, os sites dos prêmios (Spiel des Jahres, As d'Or, Golden Geek, Origins, Dice Tower), campanhas em destaque no Kickstarter e no Gamefound (categoria de tabuleiro) e comunicados das editoras estrangeiras com edição prevista no Brasil. Complete com WebSearch em inglês ("board game news", "board game announced", "tabletop crowdfunding record") dentro do prazo de 14 dias.

Em todas as rodadas, respeite o que cada site permite: sites que proíbem robôs só por leitura pontual (WebSearch e WebFetch de uma página) e citação com link, nunca raspagem. Nas semanas de Spoiler Fest da Galápagos e de feiras, a rodada 2 é obrigatória mesmo que a rodada 1 já tenha bastado.

## 2. Escolher as notas

1. Para cada candidata promissora, ache a **fonte primária** (editora, prêmio, campanha, evento). Sem ela, a nota não sai.
2. Pontue pelo crivo de PLANO_NOTICIAS.md com o que a pesquisa confirmou. Resenha, vídeo e lista de recomendação não são notícia: servem de fonte de crítica.
3. Agrupe o que for do mesmo assunto (vários lançamentos de uma editora no mês viram uma nota).
4. Escolha as 5 de maior pontuação entre tudo o que as rodadas acharam (empate: a mais recente e a com mais fontes) e marque a maior como manchete. Nota abaixo de 5 pontos só entra depois da rodada 3. `checar_noticia.py` e `build_home.py` recusam dia com mais de 5 notas ou manchete que não seja a maior pontuação.
5. Novidades do calendário da Ludopedia (lançamento novo ou mudança de situação) que não virarem nota: pelo menos garanta que os cartões do mês ligam a alguma nota; se não ligarem, eles levam para a Ludopedia.

## 3. Escrever

Uma nota por arquivo em `conteudo/noticias/<AAAA-MM-DD>-<assunto>.json`, no **padrão das notícias** (PADRAO_EDITORIAL.md, "Padrão editorial das notícias"): selo, lide, por que importa, números com fonte, contexto, no Brasil (preço com data ou a falta dele), crítica atribuída, para quem, nossa opinião, fontes com data e o crivo. Opinião ancorada nas nossas resenhas e na crítica citada. Citação literal só de frase que você leu na fonte. **Não cite a Ludopedia no texto** (lide, contexto, no Brasil etc.): escreva "segundo o nosso calendário de lançamentos"; a Ludopedia vai só nas `fontes`, na fonte dos números e no crédito da capa.

- `ids_ludopedia`: ids dos jogos da nota que aparecem no calendário (o cartão passa a ligar para a nota).
- `jogos`: resenhas nossas citadas (`{"nome", "resenha": "<slug>"}`).
- `imagem`: capa da edição nacional via Ludopedia (`noticias/capas/<id>.jpg`, baixe `https://storage.googleapis.com/ludopedia-capas/<id>_m.jpg`) com crédito "Capa via Ludopedia"; sem capa, `null`. Nota com `imagem: null` (evento, prêmio, financiamento sem capa na Ludopedia) dispara sozinha a busca de fotos (gancho da skill `imagens`): quando o aviso chegar, escolha na folha e grave com `robo.py imagem-noticia`. Se nenhuma candidata servir (retrato, logo, foto de outro ano), a nota sai com `imagem: null`; nunca gere imagem por API. Para isso, cite nas `fontes` a página oficial (editora, organizador, comunicado de imprensa).
- Manchete do dia: `"manchete": true` (sem `manchete_aprovada`; ela vai direto para o topo).

- **Edição nacional (regra 6 do padrão das notícias):** para cada jogo da nota, rode `python3 tools/noticias/edicao_nacional.py "<jogo>"`, consulte a página do jogo na Ludopedia e faça busca estendida em português pensando em loja ("<jogo> jogo português loja brasileira"). Registre em `verificacao_nacional` (resultado, data e fontes, uma brasileira). Nunca deduza que o jogo não saiu no Brasil por não haver notícia de lançamento: foi o erro de Galactic Cruise, Rebirth e Hot Streak. Ausência se escreve "não encontramos edição nacional até <data>", nunca "não há" ou "sem edição nacional".

`python3 tools/noticias/checar_noticia.py` precisa passar em todas: ele recusa frase categórica de ausência, ausência sem verificação registrada e texto que contradiz uma edição nacional verificada.

## 4. Atualizar os blocos

Em `conteudo/home.json`:
- **Destaques** (chave `em_alta` do `home.json`; o título na página é "Destaques", com o critério abaixo): 5 jogos que mais aparecem nas notas dos últimos 7 dias, cada um com o motivo e o link de uma nota **que tenha o jogo no título** (a capa da nota é a dele). Jogo citado só de passagem não entra; se ele merece estar ali, ganha nota própria. `build_home.py` recusa item que leve a nota de outro jogo.
- **Financiamentos**: tire o que encerrou, marque "aberto" ou "encerrado", ligue à nota (`noticia`).
- **Agenda**: tire o que passou; datas não confirmadas ficam `"previsto": true`.

## Editora na linha de data

Ao lado da data, as páginas mostram quem publica o jogo, nunca o site de onde veio a informação (Ludopedia, BoardGameWire etc. ficam só na seção Fontes). Preencha `"editora"` na nota com o nome que o próprio texto cita (ex.: `"Galápagos"`, `"Restoration Games"`). Sem o campo, `build_home.py` usa a editora do calendário de lançamentos pelos `ids_ludopedia`; se não houver editora (evento, prêmio, guia), a linha mostra só a data. Não invente editora. A Galápagos hoje é a Asmodee (o site antigo redireciona para asmodee.com.br): use `"Asmodee"`.

## 5. Publicar

1. `python3 tools/build_home.py` (gera a página inicial, as páginas das notas e `noticias/`) Ele grava `publicado_em` (hora de publicação) nas notas que ainda não têm, e as Últimas notícias seguem essa hora, não a pontuação: nota nova sempre entra no topo. Não edite `publicado_em` à mão; confira na página inicial que as notas novas aparecem nas Últimas notícias.
   Em seguida, `node tools/capa_secoes.js` refaz as prévias do WhatsApp de `/noticias/` e `/lancamentos/` (`noticias/capa.jpg`, `lancamentos/capa.jpg`, 1200×630) com as notas e o mês do dia, e `python3 tools/build_home.py` de novo para o `?v=` das páginas apontar para a imagem nova.
2. Confira no celular (Playwright, 390 px): página inicial e uma nota nova, sem rolagem lateral.
3. Commit e push direto na `main` com a mensagem `Notícias de <dd/mm/aaaa>: <títulos curtos>`. A manchete do dia já vai para o topo. Inclua no commit `noticias/capa.jpg`, `lancamentos/capa.jpg`, `sitemap.xml`, `sitemap-noticias.xml`, `robots.txt`, `404.html`, `img/`, `jogos-de-tabuleiro/`, `premios/` e `conteudo/sitemap_estado.json`, que os scripts regeram sozinhos.
4. Depois que as páginas estiverem no ar (o GitHub Pages leva alguns minutos), rode `python3 tools/indexnow.py` para avisar Bing e outros buscadores; página que ainda não subiu fica para a próxima rodada. Se ele gravar `conteudo/indexnow_estado.json`, faça commit e push só desse arquivo (`IndexNow de <dd/mm/aaaa>`).
5. Termine com um resumo curto para o usuário: quantas rodadas de pesquisa foram feitas e o que cada uma achou, as notas publicadas (título, selo e pontos, avisando as que ficaram abaixo de 5), a manchete com o lide e a opinião, o que ficou de fora e por quê, e os avisos da coleta. Não peça aprovação.

## Troca de manchete

Não há mais aprovação. Se o usuário pedir outra manchete, troque `"manchete": true` entre as notas do dia; se recusar a manchete, apague `manchete` da nota (ela segue na lista). Depois `python3 tools/build_home.py`, commit e push.
