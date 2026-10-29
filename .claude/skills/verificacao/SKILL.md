---
name: verificacao
description: Verificação noturna (22h) da Elite Boardgamers — confere tudo o que foi publicado no dia (notícias e resenhas) contra as fontes e o PADRAO_EDITORIAL.md, checa páginas, links e o site no ar, e corrige sozinha o que estiver errado, com commit e push na main. Use quando pedirem "/verificacao", "verificação do dia", "conferir o que foi publicado" ou quando a tarefa agendada das 22h disparar.
---

# Verificação noturna do conteúdo

Desde 28/10/2026 notícias e resenhas vão ao ar sem aprovação. Esta rotina é a rede de segurança: às 22h ela confere o que subiu no dia e **corrige sem perguntar** o que estiver errado. Errar para o lado da cautela: dado que não se confirma sai do texto ou vira "não confirmado nas fontes consultadas"; nunca troque um número por outro sem fonte.

## 1. Checagens automáticas

```
git pull origin main
python3 tools/verificar_site.py --online
```

O relatório tem duas partes: as falhas automáticas (notícia fora do padrão, resenha sem fotos, página desatualizada, link ou imagem quebrada, página fora do ar) e a lista do que foi publicado hoje, com as fontes de cada item. Corrija cada falha na origem:

- Página desatualizada ou sem página: `python3 tools/build_home.py` (notícias e página inicial) ou `python3 tools/build_review.py conteudo/<slug>.json`.
- Notícia fora do padrão: ajuste o JSON até `python3 tools/noticias/checar_noticia.py` passar.
- Link quebrado: conserte o JSON que gera a página (nunca o HTML à mão) e regere.
- Página do dia fora do ar (404) logo depois do push: o GitHub Pages leva alguns minutos; rode de novo no fim. Se continuar, confira se o commit chegou à `main`.

## 2. Revisão editorial do que subiu no dia

Para **cada** notícia e resenha da lista "Publicado em <data>":

1. Abra o JSON e as fontes citadas (WebFetch/WebSearch, respeitando robots.txt; BGG e Ludopedia só pela busca).
2. Confira, item por item: nomes de jogos, autores e editoras; datas; números (notas, preços com data, valores de campanha, prazos); prêmios e colocações; edição nacional (regra 6 do padrão das notícias: `tools/noticias/edicao_nacional.py "<jogo>"` e busca em português; ausência se escreve "não encontramos edição nacional até <data>"); citações literais (só frase que está na fonte).
3. Confira se a opinião tem dono, se o selo bate com o texto e se a nota ainda é notícia (campanha encerrada, data adiada).
4. Imagem: a foto da nota/resenha é do jogo ou evento certo, com crédito; nota com `imagem: null` ganha nova tentativa pela skill `imagens` (nunca imagem gerada por API).

Correções:

- **Erro factual**: corrija no JSON com a fonte certa (atualize `fontes` com a data da consulta). Se o erro mudava o sentido da nota (preço, data, "saiu no Brasil"), acrescente ao fim do `corpo` (notícia) ou da `nota_ficha` (resenha) uma linha "Correção em <dd/mm/aaaa>: <o que mudou>."
- **Não se confirma em fonte nenhuma**: tire a afirmação ou troque por "não confirmado nas fontes consultadas". Notícia cujo fato central não se confirma: tire do site (apague o JSON e a pasta `noticias/<slug>/`, e as referências em `conteudo/home.json`) e conte no resumo.
- **Resenha com erro grave** (jogo errado, prêmio inventado, fotos de outro jogo) que não dê para corrigir com segurança: volte o jogo para `em_producao` em `pauta.json`, tire-o de `publicadas`, apague `<slug>/index.html` e rode `python3 tools/publicar.py` com as outras publicadas para regerar lista e página inicial; a rotina das 8h refaz.
- Depois de corrigir: `python3 tools/build_home.py`, `python3 tools/build_review.py conteudo/<slug>.json` para cada resenha mexida, `python3 tools/verificar_site.py` de novo até passar, Playwright em 390 px nas páginas mexidas (sem rolagem lateral, sem erro de JS).

## Manutenção mensal (dia 1 de cada mês)

- Preços: atualize `preco_ref` (faixa e data da consulta) das 5 resenhas mais vistas (Search Console, se houver acesso; senão as 5 mais antigas), com as lojas citadas como fonte. Preço que não se confirma vira "sem preço confirmado em <data>".
- Ficha: tente confirmar um item "não confirmado nas fontes consultadas" por resenha (começando por Faraway e Detective); só troque com fonte.

## 3. Publicar e avisar

- Commit e push na `main`: `Verificação de <dd/mm/aaaa>: <o que foi corrigido>` (só se algo mudou; nunca `.cache/`). Inclua no commit `sitemap.xml`, `sitemap-noticias.xml`, `robots.txt`, `404.html`, `img/`, `jogos-de-tabuleiro/`, `premios/` e `conteudo/sitemap_estado.json`, que os scripts regeram sozinhos.
- `python3 tools/verificar_site.py --online` no fim (espere o Pages atualizar).
- Rede de segurança do IndexNow: `python3 tools/indexnow.py` avisa o que as rotinas do dia não avisaram. Se ele gravar `conteudo/indexnow_estado.json`, commit e push desse arquivo.
- Resumo curto ao usuário, em português: quantos itens foram conferidos, o que foi corrigido (item, antes → depois, fonte), o que saiu do ar e por quê, e o que ficou pendente. Se tudo estava certo, diga isso em uma linha.

Nunca gere imagem pela API da OpenAI, nunca reescreva conteúdo de dias anteriores sem erro apontado e nunca contorne bloqueio de site.
