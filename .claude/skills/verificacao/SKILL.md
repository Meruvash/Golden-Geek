---
name: verificacao
description: Verificação noturna (22h) da Elite Boardgamers — roda as checagens automáticas do que foi publicado no dia, confere à mão só a manchete, preços, datas e fotos, checa páginas, links e o site no ar, e corrige sozinha o que estiver errado, com commit e push na main. Use quando pedirem "/verificacao", "verificação do dia", "conferir o que foi publicado" ou quando a tarefa agendada das 22h disparar.
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

**Nome da editora:** a Galápagos hoje é a Asmodee (galapagosjogos.com.br redireciona para asmodee.com.br). Não troque "Asmodee" por Galápagos ao conferir com as fontes: o texto usa sempre "Asmodee", mesmo quando a fonte ainda disser Galápagos; os nomes das fontes ficam como a página citada os escreve.


**Conferência enxuta (11/11/2026, pedido do usuário para economizar tokens).** A rede principal são as checagens automáticas da etapa 1 (`verificar_site.py`, `checar_noticia.py`, `duplicatas.py`). À mão, abra fontes só para:

1. **A manchete do dia**: confira o fato central, nomes, datas e números contra a fonte primária.
2. **Preços e datas de todas as notas do dia**: só o número e a data citados, na fonte citada (uma página por nota; não releia a nota inteira). Edição nacional dada como ausente: rode `tools/noticias/edicao_nacional.py "<jogo>"` (ausência se escreve "não encontramos edição nacional até <data>").
3. **A foto de cada nota**: só olhar se é do jogo ou evento certo, com crédito (nunca imagem gerada por API).

Não reabra críticas, citações e contexto das outras notas, a não ser que uma checagem automática acuse algo. Não use subagentes. Resenhas estão pausadas desde 11/11/2026; se alguma for publicada no dia, confira só prêmio, preço e se as fotos são do jogo certo.

Correções:

- **Erro factual**: corrija no JSON com a fonte certa (atualize `fontes` com a data da consulta). Se o erro mudava o sentido da nota (preço, data, "saiu no Brasil"), acrescente ao fim do `corpo` (notícia) ou da `nota_ficha` (resenha) uma linha "Correção em <dd/mm/aaaa>: <o que mudou>."
- **Não se confirma em fonte nenhuma**: tire a afirmação ou troque por "não confirmado nas fontes consultadas". Notícia cujo fato central não se confirma: tire do site (apague o JSON e a pasta `noticias/<slug>/`, e as referências em `conteudo/home.json`) e conte no resumo.
- **Resenha com erro grave** (jogo errado, prêmio inventado, fotos de outro jogo) que não dê para corrigir com segurança: volte o jogo para `em_producao` em `pauta.json`, tire-o de `publicadas`, apague `<slug>/index.html` e rode `python3 tools/publicar.py` com as outras publicadas para regerar lista e página inicial; a rotina das 8h refaz.
- Depois de corrigir: `python3 tools/build_home.py`, `python3 tools/build_review.py conteudo/<slug>.json` para cada resenha mexida, `python3 tools/verificar_site.py` de novo até passar, Playwright em 390 px nas páginas mexidas (sem rolagem lateral, sem erro de JS).

## Manutenção mensal

Suspensa desde 11/11/2026 (resenhas pausadas, economia de tokens). Não atualize preços nem fichas de resenhas antigas.

## 3. Publicar e avisar

- Commit e push na `main`: `Verificação de <dd/mm/aaaa>: <o que foi corrigido>` (só se algo mudou; nunca `.cache/`). Inclua no commit `sitemap.xml`, `sitemap-noticias.xml`, `robots.txt`, `llms.txt`, `404.html`, `img/`, `jogos-de-tabuleiro/`, `premios/` e `conteudo/sitemap_estado.json`, que os scripts regeram sozinhos.
- `python3 tools/verificar_site.py --online` no fim (espere o Pages atualizar).
- Rede de segurança do IndexNow: `python3 tools/indexnow.py` avisa o que as rotinas do dia não avisaram. Se ele gravar `conteudo/indexnow_estado.json`, commit e push desse arquivo.
- Resumo curto ao usuário, em português: quantos itens foram conferidos, o que foi corrigido (item, antes → depois, fonte), o que saiu do ar e por quê, e o que ficou pendente. Se tudo estava certo, diga isso em uma linha.

Nunca gere imagem pela API da OpenAI, nunca reescreva conteúdo de dias anteriores sem erro apontado e nunca contorne bloqueio de site.
