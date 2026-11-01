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
