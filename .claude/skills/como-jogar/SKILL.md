---
name: como-jogar
description: Produz e publica um tutorial COMO JOGAR do Elite Boardgamers para um jogo que as pessoas procuram aprender no Google (Google Trends + autocompletar), com regras tiradas do manual oficial da edição brasileira, auditoria independente e publicação em /como-jogar/<slug>/. Use quando pedirem "/como-jogar", "novo como jogar", "tutorial de <jogo>" ou quando a tarefa agendada do Como Jogar disparar.
---

# Como Jogar: um tutorial novo

Linha editorial de ensino de regras, separada das resenhas. Voz neutra e exata de professor; nada do tom de "opinião forte". O método completo está em `docs/como-jogar/PROMPT_PILOTO.md` (Parte 2) e o modelo de formato e voz em `docs/como-jogar/piloto/clank-catacombs/tutorial.md`.

## Passos

1. **Escolher o jogo.** `python3 tools/como_jogar_pauta.py --top 10` (Google Trends quando ele responder, mais o autocompletar do Google e do YouTube; já exclui os jogos com tutorial). Se pediram um jogo específico, use esse. Senão, fique com o primeiro da lista. Fonte de regra: o **manual oficial em português da edição brasileira** (site da editora nacional; a biblioteca https://www.asmodee.com.br/download-library serviu para Clank!); se ele não existir ou não estiver acessível, use o **manual oficial em inglês** da editora de origem, sem perguntar ao editor (decisão dele em 31/10/2026), com o aviso ao leitor que o BRIEF descreve. Só troque de jogo se nem o manual em inglês estiver acessível. Não contorne bloqueio (403, login, Cloudflare). Registre no dossiê o que tentou.
2. **Escrever.** Siga `docs/como-jogar/BRIEF.md` com {JOGO}, {SLUG} e {OBS} preenchidos (é o mesmo briefing usado nos primeiros tutoriais). Nesta rotina, ignore duas linhas do BRIEF que valiam só para a escrita em paralelo: "não use subagentes" (aqui a auditoria do passo 3 usa subagentes) e "não faça commit" (aqui você publica no passo 5). Ele define: arquivos em `docs/como-jogar/<slug>/` (dossie.md, tutorial.md, auditoria.md), os dados do topo em `conteudo/como-jogar/<slug>.json`, a marcação que o conversor entende e o que é proibido (regra de memória, método 4C/ID explicado ao leitor, travessão, vícios de `tools/vicios.py`).
3. **Auditoria independente.** Um subagente que não escreveu o texto recebe só o tutorial e o texto extraído do manual e confere cada regra, cada exemplo e cada conta contra a página; outro tenta montar a partida e jogar a primeira rodada só com o tutorial e anota onde precisou adivinhar. Corrija e registre em `auditoria.md`. Regra que o auditor não confirmar no manual sai do texto.
3b. **Fotos do jogo** (pedido do editor em 04/11/2026: foto em todas as seções). Se o jogo não tem `<slug>/fotos/fontes.json` (resenha) nem `como-jogar/<slug>/fotos/fontes.json`, siga a skill `imagens`: `python3 tools/imagens/robo.py triagem <slug> --jogo "<Nome>" --editora "<Editora>"`, `buscar <slug>` (e `livres <slug>` para o Wikimedia Commons), abra a folha de contato, escolha de 3 a 5 (capa, mesa, jogabilidade, componentes) e `aprovar`. Depois mova `<slug>/fotos` para `como-jogar/<slug>/fotos` e apague a pasta `<slug>/` da raiz e o `triagem/<slug>.json`. Jogos da mesma editora: um de cada vez (nunca em paralelo no mesmo site). O gerador põe a foto no topo e em cada seção sem figura; sem foto oficial ele usa as figuras do manual, mas diga isso no relato.
4. **Gerar a página.** Só depois da auditoria, marque `"publicar": true` em `conteudo/como-jogar/<slug>.json` (sem isso o conversor ignora o tutorial, para rascunho não ir ao ar). Então `python3 tools/build_como_jogar.py` (gera `como-jogar/<slug>/index.html` a partir do tutorial.md e do JSON, aplica a moldura do site e atualiza a lista em `/como-jogar/`). Confira no navegador (celular 390 px): seções, blocos, respostas escondidas, tabelas em fichas.
5. **Verificar e publicar.** `python3 tools/build_home.py`, `python3 tools/verificar_site.py` (precisa dar "tudo certo"), `node tools/ux/validar.mjs`. Commit com os arquivos do tutorial e as páginas geradas; `git fetch origin main`, merge (arquivos gerados em conflito: fique com os da main e gere de novo), push na main.
6. **Relato ao editor**, curto: jogo escolhido e por quê (números da pauta), manual usado, link da página publicada, o que os auditores acharam e o que ficou fraco.

## Regras que não mudam

- Regra só do manual oficial (português da edição brasileira; sem ele, o oficial em inglês), com a página. Resenha, vídeo e fórum servem só para levantar dúvidas.
- Termos exatamente como impressos na edição brasileira; com manual em inglês, tradução clara e sempre a mesma, e o aviso ao leitor.
- Toda conta de exemplo refeita em script.
- Exercícios em múltipla escolha (marcação ?? no BRIEF), com as opções erradas conferidas contra o manual.
- Manual e PDFs ficam no scratchpad, nunca no repositório.
- Nunca explicar o método de ensino ao leitor (pedido do editor em 31/10/2026).

- Montar a mesa passo a passo (pedido do editor em 04/11/2026): todo tutorial abre com `## setup. Montar a mesa passo a passo`, antes do "Comece a jogar", seguindo a página de preparação do manual, com uma figura em cada passo (PADRAO_EDITORIAL.md, "Montar a mesa passo a passo"). Os auditores conferem cada passo e cada figura dessa seção.

- Essencial à vista, o resto a um toque: regra de caso especial vai em `> [!mais] **Título.** texto`, nunca no passo a passo (PADRAO_EDITORIAL.md, "Como Jogar: essencial à vista").

## Rotina diária: no mínimo 5 tutoriais por dia (pedido do editor em 04/11/2026; antes eram 8)

A tarefa agendada diária publica **pelo menos 5 tutoriais novos por dia, todos os dias**, direto no ar, **sem revisão humana**: a auditoria independente do passo 3 (feita por subagentes) é a única revisão. Sem limite máximo.

1. `python3 tools/como_jogar_pauta.py --top 25` e escolha os 7 primeiros (folga para quem cair na auditoria; publique todos os que passarem) que ainda não têm tutorial e têm manual oficial acessível (português da edição brasileira; sem ele, o oficial em inglês com o aviso ao leitor). Jogo sem manual acessível fica de fora e entra o próximo da lista. Só boardgames modernos (jogos de tabuleiro e cartas do hobby); nada de jogo eletrônico e nada de jogo de massa de loja de brinquedo (War, Perfil, Detetive, UNO, Banco Imobiliário, Jogo da Vida, Imagem e Ação e parecidos: pedido do editor em 04/11/2026, "não contamine meu site com isso"); o `FORA` de `tools/como_jogar_pauta.py` já os tira da pauta.
2. Um subagente redator por jogo, todos na mesma mensagem, cada um com o BRIEF preenchido. Enquanto eles escrevem, busque as fotos de cada jogo (passo 3b), um jogo por vez. Depois, para cada tutorial, os dois auditores do passo 3 (conferência contra o manual e partida simulada), também em paralelo. Regra que o auditor não confirmar no manual sai do texto.
3. Marque `"publicar": true` só nos tutoriais que passaram na auditoria e publique todos num único commit (passos 4 e 5). Se menos de 5 passarem, pegue os próximos da pauta e faça outra rodada no mesmo dia até chegar a 5; só se ainda assim faltar, publique os que passaram e diga no relato quantos faltaram e por quê; nunca publique tutorial sem auditoria para cumprir a meta.

- Referências visuais: figuras dos exemplos ilustrados do manual (`!fig`, com crédito e página) e um vídeo de regras em português incorporado (`!video`), sem baixar nada do vídeo (PADRAO_EDITORIAL.md, "Como Jogar: referências visuais"). No passo 4, confira que as figuras aparecem e que o vídeo abre ao tocar.
- Vídeo: de preferência do canal Duque Board Games (@DuqueBoardgames; busca do próprio canal + oEmbed), conforme PADRAO_EDITORIAL.md, "Como Jogar: referências visuais".
