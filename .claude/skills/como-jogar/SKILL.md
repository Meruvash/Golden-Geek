---
name: como-jogar
description: Produz e publica um tutorial COMO JOGAR do Elite Boardgamers para um jogo que as pessoas procuram aprender no Google (Google Trends + autocompletar), com regras tiradas do manual oficial da edição brasileira, auditoria independente e publicação em /como-jogar/<slug>/. Use quando pedirem "/como-jogar", "novo como jogar", "tutorial de <jogo>" ou quando a tarefa agendada do Como Jogar disparar.
---

# Como Jogar: um tutorial novo

Linha editorial de ensino de regras, separada das resenhas. Voz neutra e exata de professor; nada do tom de "opinião forte". O método completo está em `docs/como-jogar/PROMPT_PILOTO.md` (Parte 2) e o modelo de formato e voz em `docs/como-jogar/piloto/clank-catacombs/tutorial.md`.

## Passos

1. **Escolher o jogo.** `python3 tools/como_jogar_pauta.py --top 10` (Google Trends quando ele responder, mais o autocompletar do Google e do YouTube; já exclui os jogos com tutorial). Se pediram um jogo específico, use esse. Senão, vá do primeiro para baixo e fique com o primeiro que tenha **manual oficial em português da edição brasileira acessível publicamente** (site da editora nacional; a biblioteca https://www.asmodee.com.br/download-library serviu para Clank!). Não contorne bloqueio (403, login, Cloudflare): sem manual, o jogo sai e você tenta o próximo. Registre no dossiê os candidatos testados.
2. **Escrever.** Siga `docs/como-jogar/BRIEF.md` com {JOGO}, {SLUG} e {OBS} preenchidos (é o mesmo briefing usado nos primeiros tutoriais). Nesta rotina, ignore duas linhas do BRIEF que valiam só para a escrita em paralelo: "não use subagentes" (aqui a auditoria do passo 3 usa subagentes) e "não faça commit" (aqui você publica no passo 5). Ele define: arquivos em `docs/como-jogar/<slug>/` (dossie.md, tutorial.md, auditoria.md), os dados do topo em `conteudo/como-jogar/<slug>.json`, a marcação que o conversor entende e o que é proibido (regra de memória, método 4C/ID explicado ao leitor, travessão, vícios de `tools/vicios.py`).
3. **Auditoria independente.** Um subagente que não escreveu o texto recebe só o tutorial e o texto extraído do manual e confere cada regra, cada exemplo e cada conta contra a página; outro tenta montar a partida e jogar a primeira rodada só com o tutorial e anota onde precisou adivinhar. Corrija e registre em `auditoria.md`. Regra que o auditor não confirmar no manual sai do texto.
4. **Gerar a página.** Só depois da auditoria, marque `"publicar": true` em `conteudo/como-jogar/<slug>.json` (sem isso o conversor ignora o tutorial, para rascunho não ir ao ar). Então `python3 tools/build_como_jogar.py` (gera `como-jogar/<slug>/index.html` a partir do tutorial.md e do JSON, aplica a moldura do site e atualiza a lista em `/como-jogar/`). Confira no navegador (celular 390 px): seções, blocos, respostas escondidas, tabelas em fichas.
5. **Verificar e publicar.** `python3 tools/build_home.py`, `python3 tools/verificar_site.py` (precisa dar "tudo certo"), `node tools/ux/validar.mjs`. Commit com os arquivos do tutorial e as páginas geradas; `git fetch origin main`, merge (arquivos gerados em conflito: fique com os da main e gere de novo), push na main.
6. **Relato ao editor**, curto: jogo escolhido e por quê (números da pauta), manual usado, link da página publicada, o que os auditores acharam e o que ficou fraco.

## Regras que não mudam

- Regra só do manual oficial, com a página. Resenha, vídeo e fórum servem só para levantar dúvidas.
- Termos exatamente como impressos na edição brasileira.
- Toda conta de exemplo refeita em script.
- Manual e PDFs ficam no scratchpad, nunca no repositório.
- Nunca explicar o método de ensino ao leitor (pedido do editor em 31/10/2026).

- Essencial à vista, o resto a um toque: regra de caso especial vai em `> [!mais] **Título.** texto`, nunca no passo a passo (PADRAO_EDITORIAL.md, "Como Jogar: essencial à vista").
