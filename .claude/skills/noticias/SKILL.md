---
name: noticias
description: Monta a edição diária de notícias da página inicial da Elite Boardgamers — coleta (feeds, Bluesky, Ludopedia), crivo editorial, 5 notas no padrão de notícias (PADRAO_EDITORIAL.md), atualização dos blocos e publicação, tudo no ar sem esperar aprovação (inclusive a manchete). Use quando pedirem "/noticias", "edição do dia", "notícias de hoje" ou quando a tarefa agendada diária disparar.
---

# Edição diária de notícias

Meta: **5 notas por dia**, todas com 5 pontos ou mais no crivo (PLANO_NOTICIAS.md). Melhor publicar 3 boas do que 5 fracas: se só 3 passarem, publique 3 e diga isso no resumo. **Desde 28/10/2026 tudo sai direto, manchete inclusive** (pedido do usuário): ninguém aprova nada. A segurança vem das checagens e da verificação das 22h (skill `verificacao`), que corrige sozinha o que estiver errado.

## 1. Coletar

`python3 tools/noticias/coletar.py --dias 2` (use `--dias 4` na segunda-feira). Lê os feeds liberados e os perfis do Bluesky de `tools/noticias/fontes.json`, atualiza `conteudo/lancamentos/` pela API da Ludopedia (`LUDOPEDIA_TOKEN` no ambiente; sem ele, avise no resumo) e grava `.cache/noticias/<data>.md` com as candidatas já ordenadas pelo pré-crivo e as eliminadas (conteúdo pago, fora do tabuleiro, já publicadas).

O pré-crivo só ordena. Leia também as fontes de leitura manual listadas no fim do relatório quando der (WebSearch e WebFetch respeitando o que os sites permitem), principalmente nas semanas de Spoiler Fest da Galápagos e de feiras.

## 2. Escolher as notas

1. Para cada candidata promissora, ache a **fonte primária** (editora, prêmio, campanha, evento). Sem ela, a nota não sai.
2. Pontue pelo crivo de PLANO_NOTICIAS.md com o que a pesquisa confirmou. Resenha, vídeo e lista de recomendação não são notícia: servem de fonte de crítica.
3. Agrupe o que for do mesmo assunto (vários lançamentos de uma editora no mês viram uma nota).
4. Escolha até 5 e marque a de maior pontuação como manchete proposta.
5. Novidades do calendário da Ludopedia (lançamento novo ou mudança de situação) que não virarem nota: pelo menos garanta que os cartões do mês ligam a alguma nota; se não ligarem, eles levam para a Ludopedia.

## 3. Escrever

Uma nota por arquivo em `conteudo/noticias/<AAAA-MM-DD>-<assunto>.json`, no **padrão das notícias** (PADRAO_EDITORIAL.md, "Padrão editorial das notícias"): selo, lide, por que importa, números com fonte, contexto, no Brasil (preço com data ou a falta dele), crítica atribuída, para quem, nossa opinião, fontes com data e o crivo. Opinião ancorada nas nossas resenhas e na crítica citada. Citação literal só de frase que você leu na fonte.

- `ids_ludopedia`: ids dos jogos da nota que aparecem no calendário (o cartão passa a ligar para a nota).
- `jogos`: resenhas nossas citadas (`{"nome", "resenha": "<slug>"}`).
- `imagem`: capa da edição nacional via Ludopedia (`noticias/capas/<id>.jpg`, baixe `https://storage.googleapis.com/ludopedia-capas/<id>_m.jpg`) com crédito "Capa via Ludopedia"; sem capa, `null`. Nota com `imagem: null` (evento, prêmio, financiamento sem capa na Ludopedia) dispara sozinha a busca de fotos (gancho da skill `imagens`): quando o aviso chegar, escolha na folha e grave com `robo.py imagem-noticia`. Se nenhuma candidata servir (retrato, logo, foto de outro ano), a nota sai com `imagem: null`; nunca gere imagem por API. Para isso, cite nas `fontes` a página oficial (editora, organizador, comunicado de imprensa).
- Manchete do dia: `"manchete": true` (sem `manchete_aprovada`; ela vai direto para o topo).

- **Edição nacional (regra 6 do padrão das notícias):** para cada jogo da nota, rode `python3 tools/noticias/edicao_nacional.py "<jogo>"`, consulte a página do jogo na Ludopedia e faça busca estendida em português pensando em loja ("<jogo> jogo português loja brasileira"). Registre em `verificacao_nacional` (resultado, data e fontes, uma brasileira). Nunca deduza que o jogo não saiu no Brasil por não haver notícia de lançamento: foi o erro de Galactic Cruise, Rebirth e Hot Streak. Ausência se escreve "não encontramos edição nacional até <data>", nunca "não há" ou "sem edição nacional".

`python3 tools/noticias/checar_noticia.py` precisa passar em todas: ele recusa frase categórica de ausência, ausência sem verificação registrada e texto que contradiz uma edição nacional verificada.

## 4. Atualizar os blocos

Em `conteudo/home.json`:
- **Em alta**: 5 jogos que mais aparecem nas notas dos últimos 7 dias, cada um com o motivo e o link de uma nota **que tenha o jogo no título** (a capa da nota é a dele). Jogo citado só de passagem não entra; se ele merece estar ali, ganha nota própria. `build_home.py` recusa item que leve a nota de outro jogo.
- **Financiamentos**: tire o que encerrou, marque "aberto" ou "encerrado", ligue à nota (`noticia`).
- **Agenda**: tire o que passou; datas não confirmadas ficam `"previsto": true`.

## 5. Publicar

1. `python3 tools/build_home.py` (gera a página inicial, as páginas das notas e `noticias/`) Ele grava `publicado_em` (hora de publicação) nas notas que ainda não têm, e as Últimas notícias seguem essa hora, não a pontuação: nota nova sempre entra no topo. Não edite `publicado_em` à mão; confira na página inicial que as notas novas aparecem nas Últimas notícias.
2. Confira no celular (Playwright, 390 px): página inicial e uma nota nova, sem rolagem lateral.
3. Commit e push direto na `main` com a mensagem `Notícias de <dd/mm/aaaa>: <títulos curtos>`. A manchete do dia já vai para o topo.
4. Termine com um resumo curto para o usuário: as notas publicadas (título e selo), a manchete com o lide e a opinião, o que ficou de fora e por quê, e os avisos da coleta. Não peça aprovação.

## Troca de manchete

Não há mais aprovação. Se o usuário pedir outra manchete, troque `"manchete": true` entre as notas do dia; se recusar a manchete, apague `manchete` da nota (ela segue na lista). Depois `python3 tools/build_home.py`, commit e push.
