# Auditoria: Como jogar Terraforming Mars: o Jogo de Dados

01/11/2026. Dois agentes independentes, que não escreveram o texto. Relatórios completos no scratchpad da sessão (`auditoria/tm_regras.md` e `auditoria/tm_execucao.md`).

## 1. Auditor de regras (manual Meeple BR, texto por página e ilustrações das p. 2 e 7)

Resultado: nenhum erro Grave. Todos os gabaritos (x) estão certos pelo manual e todas as contas dos exemplos fecham (49 e 43 PVs; floresta 3; cidade 4). 19 apontamentos Moderados ou Leves, todos tratados:

- Pergunta do "Comece em 4 minutos" com "Sim" para algo que não acontece no início do turno: reescrita ("em que momento do turno").
- Distrator parcialmente verdadeiro no oceano com parâmetro completo: pergunta reescrita (pagar 3 água com os 7 oceanos no tabuleiro).
- Marcos Magnata e Bilionário: "de qualquer cor", como no manual (p. 12).
- Pergunta sobre comprar 2 cartas: virou "em que lista do manual está", porque também pode ser feita como ação principal.
- Carta azul e "próximo turno de ação": premissa explicitada (o turno seguinte também é de ação).
- "Compra 4 cartas": acrescentado "e não descarta nenhuma".
- Terceiro parâmetro dá 2 PVs enquanto não estiver completo (p. 8), não só no passo que o completa.
- Níveis de bônus das trilhas incluídos: 4% e 10% de oxigênio; -24, -16 e 0 °C (p. 11 e ilustração da p. 2).
- Mudar face do dado: acrescentado bônus do tabuleiro e página 4.
- "Perderia a ação de suporte" (inferência) e "(p. 4)" numa dica de estratégia: retirados.
- Pressupostos dos exemplos de PV declarados (área sem bônus, oxigênio incompleto, número de jogadores).
- "Estoque maior": frase do manual, sem "um a mais por símbolo".
- Era das Corporações e pacote promocional: lista completa das novidades (p. 10).
- Bônus inicial da corporação recebido uma vez só.
- Primeiro jogador incluído no "Comece em 4 minutos".
- Limite de 3 dados com a ressalva "salvo carta que diga outra coisa".

## 2. Teste de execução (só o tutorial)

Montou a mesa para 2 e 4 jogadores e jogou duas rodadas com ações padrão. Acertou às cegas as 9 perguntas fora de bloco. Pontos tratados:

- Primeiro jogador quando ninguém jogou Terraforming Mars: o manual não diz; o texto agora diz isso e manda combinar.
- Girar dado só para faces do mesmo dado ("qualquer um de seus lados", p. 4): explicitado.
- Para que servem os recursos sem ação própria: pagar custo de cartas e ações de cartas azuis, com o ícone exato (p. 4 e 5).
- Onde a floresta pode ir: qualquer área livre não reservada para oceanos (p. 6).
- "Passar pelos 5 PVs" x "chegar a 5": unificado em "alcançar", como no manual (p. 7).
- Remissões da avaliação corrigidas (etapas 2 e 3).
- Exercício que cobrava como regra a leitura sobre curingas na produção: retirado (a leitura continua anotada como interpretação, em [!edicao]).

Não tratados, por falta de base no manual ou por serem de outro nível: efeito de cada bônus impresso no mapa e nas trilhas (o manual só mostra ícones); salto de 4 para 13 PVs num turno (duas cartas bônus?); baralho de projetos vazio; peças que acabam; se peças de outro jogador contam como vizinhas (o manual não fala em dono das peças); diferença entre os lados do tabuleiro. Ficam como lacunas do manual. O tutorial não traz cartas reais além das citadas no manual.

## 3. Autoverificação

Contas refeitas em script (`contas.py`, scratchpad). Zero travessões. `tools/vicios.py`: nenhum aviso.

## 4. Seção de montagem (04/11/2026)

Pedido do editor de 04/11/2026 (PADRAO_EDITORIAL.md, "Montar a mesa passo a passo"). O mesmo manual do dossiê foi baixado de novo em 04/11/2026 (https://meeplebr.com/wp-content/uploads/2022/12/TM_DICEGAME_RULES_PT-BR.pdf; robots.txt da Meeple BR libera tudo; user-agent de robô), 12 páginas, arquivo de 27/01/2023, igual ao usado no tutorial. Texto extraído com `pdftotext` e páginas 2, 3 e 9 renderizadas a 300 dpi, no scratchpad da sessão (`setup/tmdg/`).

- Nova seção `## setup. Montar a mesa passo a passo` antes do "Comece a jogar", na ordem dos 11 itens da p. 3, desdobrados em 28 passos de uma ação cada; tabela por número de jogadores (p. 3 e 9); o que volta para a caixa; quem começa; diferenças da partida solo (p. 9); conferência final e uma pergunta.
- Componentes e quantidades: o manual não tem lista de componentes. As quantidades vêm da página do produto da Meeple BR (consultada em 04/11/2026); a coluna ao lado diz o que o manual fala de cada um. Lacunas: quantidade de cada tipo de carta; o que são os 2 cartões de referência e os 4 tabuleiros de jogador (o manual não os menciona).
- Figuras novas, recortadas das ilustrações do manual, só a parte gráfica (rótulos amarelos de texto cortados fora ou cobertos; ficam as setas amarelas que apontavam para o estoque, os prêmios e os marcos): `setup-tabuleiro.webp`, `setup-estoque.webp`, `setup-projetos.webp`, `setup-bonus.webp`, `setup-premios.webp`, `setup-marcos.webp`, `setup-mao.webp` (p. 2) e `setup-producao.webp` (p. 3). Reaproveitada: `corporacao.webp` (p. 3). Foto oficial usada uma vez: `fotos/mesa-1.webp` (FryxGames, crédito já em `fontes.json`).
- Passos sem ilustração no manual (sem figura, nada inventado): 13 (sorteio dos dados de prêmio), 17 (quem começa), 18 e 19 (distribuição das cartas, mostradas só já na mão, figura do passo 21), 27 e 28 (penalidade e início) e toda a preparação solo (a p. 9 não tem ilustração).
- Lacuna nova: o manual não diz o que fazer com os 2 dados não sorteados para os prêmios (p. 3); o texto diz isso e sugere que voltem ao estoque, de onde saíram.
- "Comece a jogar" reescrito para a diretriz: "Monte a mesa" virou resumo que remete à nova seção; "Seu primeiro turno" com exemplo resolvido, tarefa para completar e tarefa sem apoio (regras das p. 4, 6 e 7); "Ainda não precisa saber" com as remissões às etapas; a tabela de dados saiu dali (continua na etapa 1 e na folha de consulta). `tools/checar_comece.py`: dentro da diretriz. Zero travessões. `tools/vicios.py`: nenhum aviso.

## 5. Auditoria independente da montagem (04/11/2026)

Resultado: aprovado com correções, nenhum erro. Tudo aplicado:

- Dados de prêmio que sobram: "O manual não diz o que fazer com os 2 dados que sobram (p. 3). Sugestão deste guia: devolva-os ao estoque."
- Passo 24: "a peça retangular da sua cor (a verde na figura)".
- Solo: áreas com bônus de PV identificadas pela medalha dourada com "1" sobre fita verde, com remissão à figura do tabuleiro; oceano numa área azul de oceano vizinha da cidade (p. 6 e 9), com a ressalva de que o manual não diz se sai da pilha de 7; cubo de tempo no 0 da trilha de PVs, até o turno 50 (p. 9); linha do solo na conferência final.
- Cartas bônus: "ao alcançar 5 PVs e de novo ao alcançar 12 PVs, uma carta bônus de cada vez" (p. 3 e 7).
- "Comece a jogar": fim da partida com "quando 2 desses 3 parâmetros ficam completos (p. 2)"; resumo da montagem remete ao solo no fim da seção de montagem, diz que a partida solo dura 50 turnos (p. 9) e que a penalidade não vale no solo; produção com "pode descartar cartas da mão" (p. 4).
- Menores: o 0 da trilha de PVs é o espaço sem número antes do 1; cores dos dados com "ilustração da p. 7"; nota sobre Tharsis Republic ao revelar a corporação (p. 11); legenda da foto `mesa-1.webp` cita os cartões de referência em inglês; legenda das cartas bônus sem "ao lado da trilha".
- Figuras: `setup-tabuleiro.webp` refeito sem as setas e o resto do rótulo "MARCOS" (no manual o rótulo cobre os números 37 e 38 da trilha de PVs; eles foram recompostos com os algarismos impressos na mesma trilha da ilustração, o "3" de 39 e 36, o "8" de 48 e o "7" de 47, para a trilha não parecer pular números; o "50" foi restaurado com os pixels originais) e com os cubos dos jogadores inteiros no alto; `setup-premios.webp` e `setup-marcos.webp` sem as setas (ficou uma leve mancha entre o 49 e o 50, onde passava a seta, e na borda esquerda do marco Terraformador, cujo "6" já está coberto pela seta no manual); `setup-estoque.webp` remontado com três recortes limpos (curingas, dados, peças), sem seta, retângulo branco nem moldura cinza da página; `corporacao.webp` sem o rótulo "CORPORAÇÃO". `setup-bonus.webp` mantido (pilha cortada embaixo, onde estavam as setas).
- `tools/checar_comece.py`: dentro da diretriz. Zero travessões. `tools/vicios.py`: nenhum aviso.
