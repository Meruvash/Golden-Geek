# Auditoria: Como Jogar Clank! Catacombs

## Seção de montagem (04/11/2026)

Pedido do editor de 04/11/2026 (PADRAO_EDITORIAL.md, "Montar a mesa passo a passo"): seção `## setup. Montar a mesa passo a passo` no topo do tutorial, antes do "Comece a jogar".

**Fonte.** O mesmo manual da edição brasileira citado no dossiê, baixado de novo em 04/11/2026 da Biblioteca de Downloads da Asmodee Brasil pela API pública que a página usa: busca `https://api-prd.mundogalapagos.com.br/library-download/store/search?term=clank` (14 itens), item 2760 "CLK101 - Clank!: Catacombs", etiqueta Regras; arquivo `https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2760&tagId=2&group=b2c` (ZIP, HTTP 200, sem login), com `CLK101_regras_v1.0.pdf` (16 páginas, InDesign `CLANK_CATACOMBS_Rules_Main_Rulebook_pt-BR_v1.01`, modificado em 25/10/2024, sha256 `62ca1161…6f258f9c27`). O item 2752, do mesmo produto, respondeu 404 no grupo `b2c` e não foi usado. Acesso com `curl` e User-Agent de robô identificado (`EliteBoardgamersBot/1.0 (robo)`), sem contornar bloqueio. Texto extraído com `pdftotext` (o PDF tem camada de texto); páginas 2 a 5 renderizadas para os recortes. Nada disso foi para o repositório.

**O que a seção segue.** Componentes da p. 2 e 3; passos A a H da p. 4 e 5, na ordem do manual, um passo por ação (28 passos); a regra do texto Revelar no início da partida vem da p. 11; o número de cubos por ataque, da p. 12; a nota sobre 5 ou 6 jogadores (expansão Bando de Aventureiros), da p. 15. Termos iguais aos do resto do tutorial.

**Figuras novas** (recortes das ilustrações do manual, só a parte gráfica, em `como-jogar/clank-catacombs/figuras/`, webp q80, 540 a 920 px de largura):

| Arquivo | Página | Passo |
|---|---|---|
| setup-tabuleiro.webp | 2 | 1 |
| setup-trilha.webp | 4 | 2 |
| setup-pecas.webp | 4 | 3 a 6 |
| setup-ouro.webp | 4 | 7 |
| setup-bolsa.webp | 4 | 8 e 9 (um algarismo do texto vizinho, cortado na borda, foi coberto com a cor do fundo) |
| setup-artefatos.webp | 3 | 10 (a ilustração da p. 4 é pequena demais e encosta no texto; a da p. 3 mostra as mesmas fichas, sem o rótulo) |
| setup-segredos.webp | 4 | 11 |
| setup-mercado.webp | 4 | 12 |
| setup-peca-inicial.webp | 4 | 13 a 16 |
| setup-ataque.webp | 5 | 19 (a ilustração do manual já é de baixa resolução) |
| setup-cubos.webp | 5 | 21 |
| setup-peoes.webp | 5 | 22 |
| setup-suprimento.webp | 5 | 23 a 25 |

**Reaproveitadas:** `figuras/preparacao.webp` (p. 4, visão geral de A, B, C e H) depois do passo 12; `figuras/fileira.webp` (p. 5, Reserva e Fileira) depois do passo 20. **Fotos oficiais:** `fotos/componentes-1.webp` junto da lista de componentes e `fotos/mesa-1.webp` no fim dos passos, ambas da Dire Wolf, com crédito em `fotos/fontes.json`.

**Passos sem ilustração no manual** (não se inventou imagem):

- Passos 17 e 18 (Reserva e Fileira) só têm a ilustração conjunta, usada depois do passo 20.
- Passo 20 (o espaço para o descarte da Masmorra): o manual não desenha a pilha de descarte.
- Passo 26 (quem começa): sem ilustração.
- Passo 27 (cubos iniciais na área de Clank!): a ilustração da seção H mostra só o alto do tabuleiro, sem os cubos; não foi usada.
- Passo 28 (Revelar): regra da p. 11, sem ilustração de preparação.
- O que volta para a caixa (2 peças em segurança, Maestria que sobra): sem ilustração própria.

**Lacunas do manual registradas no texto:** a lista de componentes não dá a quantidade de Ouro ("o manual não dá a quantidade"); o manual não diz o que fazer com as cores que ninguém escolheu, e a seção não diz nada sobre isso.

**"Comece a jogar".** A parte "Monte a mesa" virou um resumo de 5 itens que remete à seção nova (mantida a regra do Revelar). `python3 tools/checar_comece.py` passou; o texto não tem travessões; a lista de `tools/vicios.py` não acusa nada.

## Auditoria independente da montagem (04/11/2026)

Resultado: aprovado com correções. Todas aplicadas no `tutorial.md` e nas figuras:

1. Legenda de `fotos/mesa-1.webp` corrigida: é partida em andamento, em imagem promocional com cartas da edição em inglês; na montagem só a Peça Inicial fica na mesa.
2. Cabeçalho da tabela por número de jogadores: cubos do primeiro ataque com o Marcador na casa inicial, mais 1 por carta de Perigo na Fileira (p. 11, conferido no texto do manual).
3. Introdução: Maestria nos passos 15 e 16.
4. Resumo "Monte a mesa" do Comece a jogar ganhou uma linha com Artefatos (5 no topo), Segredos e Prisioneiros, Mercado, 5 cubos de Fantasma, Ídolos no Altar e uma Maestria por jogador perto da Cripta.
5. `setup-ataque.webp` refeito: a carta do manual tem cerca de 59 px de largura na origem (96 ppi, `pdfimages -list`); agora aparece pequena, centrada numa faixa com o fundo do manual, em vez de esticada. As costuras brancas (bordas das imagens montadas no PDF) foram tiradas de `setup-pecas.webp`, `setup-ouro.webp` e `setup-peca-inicial.webp` com filtro só para linhas finas e longas, preservando os cadeados e as setas.
6. "Banco" definido no passo 4 como o estoque comum.
7. Versos das peças, conferidos na ilustração da p. 2 (seis versos roxos com porta, os demais azuis) e na seta da p. 4: em segurança é o roxo com porta, Profundezas é o azul; texto dos passos 3 e 6 e legenda de `setup-pecas.webp` dizem isso.
8. Legenda de `setup-peca-inicial.webp` mostra a Cripta: a plataforma de borda verde no meio da peça (onde os peões estão na ilustração da p. 5).
9. Legenda de `preparacao.webp` explica o H: área de Clank!, passo 27.
10. Passo 22: cubos, peões e baralhos iniciais das cores não escolhidas ficam na caixa.
11. Cubos por ataque descritos como os ícones vermelhos da casa do Marcador (p. 2 e 4), na seção de montagem e no "O ataque do dragão" do Comece a jogar.
12. Legenda de `fotos/componentes-1.webp`: "(cartas da edição em inglês)".

Conferido de novo: `python3 tools/checar_comece.py` passa; zero travessões; a lista de `tools/vicios.py` não acusa nada.
