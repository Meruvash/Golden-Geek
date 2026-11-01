# Dossiê: Como jogar Arcs

Produzido em 01/11/2026 pela skill `como-jogar`, seguindo `docs/como-jogar/BRIEF.md`. Jogo pedido pelo editor.

## 1. Fontes

| Fonte | Versão | Onde |
|---|---|---|
| **Manual oficial da edição brasileira**, Meeple BR, *Arcs* | PDF de 24 páginas (`Manual-Arcs.pdf`), modificado em 11/08/2025; capa de sumário datada de 31/10/2023 (data do original); tradução de Romir G. E. Paulino | https://meeplebr.com/wp-content/uploads/2025/02/Manual-Arcs.pdf, linkado em https://meeplebr.com/product/arcs/ |
| Versão anterior do mesmo manual | `Rulebook-Arcs.pdf`, 13 páginas (páginas duplas), 20/05/2025, mesmo texto | página do Pacote Líderes e Conhecimento da Meeple BR; não usado |
| Errata das cartas do jogo base | 6 páginas, 08/08/2025 | página do produto; corrige textos de cartas, não regras do manual |
| Página do produto, Meeple BR | | 2 a 4 jogadores, 60 a 120 min, maiores de 14 anos |
| API da Ludopedia | jogo 35661 | edição nacional 2025; designer Cole Wehrle |
| Manual original em inglês (Leder Games) | não consultado | o manual brasileiro está completo, com texto pesquisável |

Tentativas descartadas: o PDF que o ComparaJogos devolve na busca por Arcs é de outro jogo (*Arena: The Contest*).

Ilustrações lidas: mapa e coluna de ambições (p. 4 e 5, a 300 dpi): números das ambições (2 Magnata, 3 Tirano, 4 Senhor da Guerra, 5 Guardião, 6 Empata) e marcadores do lado azul (5/3, 3/2, 2/0); quadro dos símbolos dos dados (p. 14, a 400 dpi), de onde vieram os 5 ícones da página, com crédito.

## 2. Terminologia

Termos da Meeple BR: Vértice, aglomerado, sistema, planeta, portal, Poder, ambição (Magnata, Tirano, Senhor da Guerra, Guardião, Empata), capítulo, rodada, turno, iniciativa, carta líder, naipe (Administração, Agressão, Construção, Mobilização), pontos de ação, Superar, Copiar, Pivotar, tomar a iniciativa, marcador zero, Corte, Baralho da Corte, cartas de Guilda, Vox, Conhecimento, Líder, espaçoporto, cidade, nave, agente, Leal, Oponente, inteiro, danificado, destruído, controle, Troféus, Prisioneiros, Taxar, Construir, Mover, Estilingue, Reparar, Influenciar, Assegurar, Batalhar, dados de Assalto, Escaramuça e Saque, interceptar, saquear, custo de saque, Ultraje, Despojar a Corte, Prelúdio, recursos (Matéria-Prima, Combustível, Arma, Relíquia, Psiônico), marcador de caminho, marcador fora de jogo. Os símbolos dos dados não têm nome no manual; o tutorial os chama pelo desenho (chama, círculo, explosão, explosão com triângulo, chave) e mostra o ícone.

## 3. Base de regras

Todas `[V]` (lidas no manual nesta sessão), com página no tutorial: preparação (p. 4 e 5), mapa e adjacência (p. 6), recursos, Corte, dano, controle, Troféus e Prisioneiros (p. 7), rodada, carta líder, naipes, passar a iniciativa (p. 8), declarar ambição (p. 9), Superar, Copiar, Pivotar, tomar a iniciativa (p. 10), verificar iniciativa e descarte (p. 11), Taxar e Construir (p. 12), Mover, Estilingue, Reparar, Influenciar, Assegurar (p. 13), Batalhar (p. 14), exemplo (p. 15), destruir cidades, Ultraje, saquear (p. 16), recursos no Prelúdio, cartas de Guilda (p. 17), pontuação das ambições, empates, qualificação, bônus das cidades (p. 18), 2 jogadores, limpeza, fim de jogo, compra de cartas, troca de mão (p. 19), Prelúdio, novas ações, modificadores (p. 20), Líderes e Conhecimento (p. 21), letras miúdas (p. 22), glossário (p. 23).

Lacunas: valores do lado virado dos marcadores de ambição (o manual só mostra o lado azul; o tutorial diz que "vale mais", sem número); distribuição das faces de cada dado de batalha (o manual não traz; o tutorial descreve só o perfil de cada tipo, como o manual).

## 4. Plano

Cinco etapas: (1) mesa e mapa; (2) rodada (líder, Superar, Copiar, Pivotar, iniciativa); (3) ações e Prelúdio; (4) batalha; (5) fim de capítulo e pontuação. Regras de caso especial em `[!mais]`. Exemplos adaptados dos do manual (p. 8 a 18), com os jogadores numerados (decisão do editor: nada de nomes). Exercícios de múltipla escolha. Contas em `contas.py` (scratchpad): Magnata 5/3 + 2/0 = 7 e 3, empate no primeiro = 3 para cada; Tirano 3/2 = 3 e 2; Magnata 5/3 + 3/2 com bônus +2 = 10. Extensão: cerca de 7.800 palavras com a marcação, acima do alvo do BRIEF, porque o jogo é pesado (Clank! tem 8 mil); o essencial à vista é bem menor.
