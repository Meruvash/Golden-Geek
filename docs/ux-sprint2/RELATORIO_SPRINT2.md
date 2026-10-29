# Sprint 2: busca global

Solução aprovada: índice JSON próprio, gerado pelo build Python, e um script pequeno sem bibliotecas (o Pagefind foi descartado por complexidade).

## O que mudou

| Arquivo | Papel |
|---|---|
| `tools/busca.py` | Gera `busca.json`. Chamado no fim de `build_home.py` e de `publicar.py`: as rotinas `/noticias` e `/resenha` atualizam a busca sem passo novo |
| `busca.json` | 1.005 registros: 26 resenhas, 20 notícias, 313 jogos do Golden Geek (um por jogo, com as aparições), 646 lançamentos do ano. 121 KB, **22 KB comprimido** |
| `busca.js` | Diálogo, normalização, agrupamento, teclado. Baixado só quando a busca abre |
| `tools/layout.py` | Lupa no cabeçalho comum + disparador inline (~700 bytes, só escuta clique, `/` e `Ctrl+K`) |
| `consulta/index.html` | Lê `?jogo=` (aparições do jogo) e `?q=` (texto da pesquisa) |
| `tools/ux/teste_busca.mjs` | Teste Playwright, 25 verificações |

## Aliases PT/EN

Fonte exclusiva: dados do site. Para cada resenha: nome (`jogo`), nome da edição brasileira (`og_titulo`), série da pauta e os nomes entre parênteses nos campos de editora da ficha (só os que são nome de jogo; datas e observações ficam de fora).

Exemplos extraídos: Duna: Imperium, As Ruínas Perdidas de Arnak, Sanctuary e Artengarten, Código Secreto, Endeavor: Mar Profundo, A Tripulação: Em Busca do Nono Planeta, A Cidade do Crime, O Senhor dos Anéis: Sina da Sociedade.

Golden Geek e lançamentos não têm ID que cruze com as resenhas: o cruzamento é por nome normalizado igual a um dos apelidos. 23 jogos do Golden Geek e 1 lançamento ficaram ligados a uma resenha ("tem resenha" no resultado). Notícias herdam os apelidos dos jogos citados.

## Normalização (testada)

| Busca | Encontra |
|---|---|
| santuario / SANTUÁRIO / sanctuary | resenha Santuário |
| duna imperium / dune imperium | resenha Dune: Imperium |
| sina sociedade / fate of the fellowship / fellowship | resenha O Senhor dos Anéis: Sina da Sociedade |
| ruinas perdidas / arnak | resenha Lost Ruins of Arnak |
| codigo secreto | resenha Codenames |

Regra: sem acento, sem caixa, pontuação vira espaço; cada palavra digitada precisa casar com o **início** de uma palavra do nome, do contexto ou dos apelidos. Mínimo de 3 caracteres. Não há correção de digitação (fora de escopo).

## Verificação

| Checagem | Resultado |
|---|---|
| Build + `verificar_site.py` | ✅ |
| `teste_busca.mjs` (Playwright, 390 px) | ✅ 25/25 (`teste_busca.txt`): sem busca na carga inicial, abre com `/` e `Ctrl+K`, `aria-modal`, rótulo, foco no campo, Esc fecha e devolve o foco, Tab fica no diálogo, setas + Enter, busca com e sem acento, nome em inglês levando à resenha em português, Golden Geek abrindo a Consulta filtrada, lançamento abrindo a ficha |
| axe-core, 52 páginas | 0 violações, sem rolagem horizontal em 320/375 px |
| Lighthouse (laboratório) | sem regressão; +1 KB por página (botão e disparador). Ver `resumo.md` |

## Limitações

- Busca por nome, título e linha de contexto, não pelo texto completo das resenhas e notícias.
- Os lançamentos são os do ano corrente, como o calendário.
- Sem JavaScript, a lupa fica escondida (o resto do site funciona igual).
