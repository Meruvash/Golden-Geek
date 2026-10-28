# Conteúdo existente: o que melhorar, por prioridade

Análise de 28/10/2026 sobre as 20 notícias e as 26 resenhas publicadas. Regra: nada muda de sentido, nenhum fato novo entra e nenhuma resenha é reescrita. **Os itens marcados "aprovar" só serão aplicados com o seu OK.**

## Já corrigido (só links, nenhum texto mudou)

| O quê | Onde |
|---|---|
| Notícia citava jogo com resenha nossa sem ligar para ela | 8 casos: Galactic Cruise (3 notas), Santuário (2), Scythe, Wingspan; a nota "Santuário vence o DSP" não ligava para a resenha de Santuário |
| Falso positivo descartado | "Azul" em Diversão Offline é o Pavilhão Azul, não o jogo |
| Resenha comparava com jogo que já tem resenha, sem link | Root e Nemesis → Scythe |
| Resenha não mostrava as notícias do mesmo jogo | bloco "Notícias sobre <jogo>" em 8 resenhas, atualizado sozinho |

## P1: aprovar (aumenta o clique no Google, sem mudar a página)

### 1. Título de busca mais curto nas notícias longas (`titulo_seo`)

O Google corta o título em ~60 caracteres. A proposta muda **só o título que aparece na busca**; o título da página continua igual. Os textos usam apenas fatos que já estão no título original.

| Nota | Hoje (caract.) | Proposta para a busca |
|---|---|---|
| inimigos-da-terra-media-entrega-2027 | 94 | Inimigos da Terra-Média, jogo brasileiro, fica para 2027 |
| lancamentos-editoras-menores-novembro | 94 | Lançamentos das editoras menores em novembro |
| excursions-galactic-cruise-campanha-termina | 93 | Excursions, de Galactic Cruise, encerra campanha nesta sexta |
| osprey-desmonta-equipe-destemidos-imperium | 90 | Osprey põe à venda as linhas Destemidos e Imperium |
| devir-civolution-e-formigas-pre-venda | 88 | Devir abre pré-venda de Civolution e Formigas |
| financiamentos-abertos-battleforge-dia-da-caca | 87 | BattleForge: Berserker e Dia da Caça no MeepleStarter |
| dante-inferno-across-the-board | 85 | DANTE: Inferno levanta R$ 425 mil no Catarse |
| speakeasy-vital-lacerda-pre-venda-mosaico | 85 | Speakeasy, de Vital Lacerda, em pré-venda pela Mosaico |
| guia-dos-premios-2027 | 81 | Guia dos prêmios de 2027: Golden Geek, Spiel des Jahres e mais |
| diversao-offline-2027 | 80 | Diversão Offline 2027 deve ser de 9 a 11 de julho |

As notas entre 67 e 74 caracteres ficam como estão: o corte é pequeno e o essencial aparece. Para as próximas notas, a regra pode entrar no padrão das notícias: título de até ~70 caracteres, ou `titulo_seo` quando passar disso.

### 2. Description mais curta em 5 resenhas (aparece cortada depois de ~155 caracteres)

| Resenha | Hoje | Proposta |
|---|---|---|
| fate-of-the-fellowship | 204 | Resenha de O Senhor dos Anéis: Sina da Sociedade, Jogo do Ano médio no Golden Geek 2025: como funciona, pontos fortes e para quem é. |
| santuario | 183 | Resenha de Santuário, de Mathias Wigge, vencedor do Deutscher Spiele Preis 2026: como funciona, pontos fortes e para quem é. |
| root | 176 | Resenha de Root, Jogo do Ano no Golden Geek 2018: como funciona, pontos fortes, pontos de atenção e para quem é. |
| pandemic-legacy | 170 | Resenha de Pandemic Legacy: Season 1, Jogo do Ano no Golden Geek 2015: como funciona, pontos fortes e para quem é. |
| scythe | 167 | Resenha de Scythe, Jogo do Ano no Golden Geek 2016: como funciona, pontos fortes, pontos de atenção e para quem é. |

### 3. Nemesis: título de compartilhamento fora do padrão
Hoje está "Qual Nemesis é o seu?", enquanto as outras resenhas usam "X vale a pena?", que é a busca mais comum. Proposta: "Nemesis vale a pena? Lockdown ou Retaliation? Resenha Elite Boardgamers".

## P2: aprovar (muda texto visível, ganho moderado)

4. **Subtítulos com o nome do jogo:** "Como funciona" passaria a "Como funciona Wingspan", e "Como é jogar" a "Como é jogar Wingspan". Ajuda quem busca "como jogar X". É uma mudança de modelo, vale para as 26 resenhas de uma vez.
5. **"Leia também" entre notícias do mesmo assunto:** por exemplo, "Boss Fighters QR no pódio do DSP" e "Santuário vence o DSP" tratam do mesmo prêmio e não se ligam. A proposta é um bloco automático com as notas que compartilham o mesmo jogo ou a mesma categoria e semana.

## P3: manutenção editorial (rotina, sem código)

6. **Preços com data de 27/10/2026** em 23 resenhas. Proposta: a verificação revisa uma vez por mês o preço das 5 resenhas mais vistas (pelo Search Console) e atualiza a data.
7. **Dados "não confirmado" na ficha:** Faraway (4), Detective (3), Nemesis, Endeavor, Gloomhaven, Colt Express e Scythe (2 cada). Vale uma nova busca de fontes; o que se confirmar entra com a fonte.
8. **Jogos citados nas notícias que ainda não têm resenha** e já estão na fila: Civolution, Harmonies, SETI e Heat. Quando a resenha sair, o link passa a aparecer sozinho nas notícias.

## Duplicidade e canibalização

Não há conteúdo duplicado. Os pares de assunto próximo (as duas notas do DSP 2026, as duas da Mosaico, as duas da Devir) cobrem fatos diferentes e não disputam a mesma busca. A notícia "Santuário vence o DSP" e a resenha de Santuário têm intenções diferentes (notícia × "vale a pena?"); agora elas se ligam, o que é o tratamento certo.
