# Auditoria: Como Jogar Dragon Eclipse

Entrega 3. Autoverificação de quem escreveu, regra por regra, contra o Rulebook (36 p.), o livreto Start here (16 p.) e a FAQ/Errata v1.1 da Awaken Realms, em 11/11/2026. A auditoria independente veio depois (seção 7); `"publicar"` segue `false` até a decisão do coordenador.

## 1. Fontes efetivamente usadas

- Usadas: Rulebook, Start here e FAQ oficiais em inglês (não há edição brasileira); página oficial da Awaken Realms (jogadores, tempo, lista de downloads); página da Asmodee Canada (idade e fotos); oEmbed do vídeo do Duque.
- Não usadas: Gamefound e store.asmodee.com (desafio da Cloudflare, não contornado); BoardGameGeek e RulesPal (terceiros); mrcuddington.com (portfólio de ilustração, sem relação com o jogo).
- Texto extraído por página: `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1111/dragon-eclipse/txt/p1.txt` a `p36.txt` (layout), `.../txt/start/p1.txt` a `p16.txt`, `.../txt/faq/p1.txt` a `p4.txt`, e em ordem de leitura em `.../txt/raw/`.

## 2. Conferência regra por regra

| Trecho do tutorial | Página | Resultado |
|---|---|---|
| Abertura e `[!edicao]` sobre manual em inglês | Biblioteca Galápagos sem o jogo; busca na web | Confere |
| Tabela de componentes | p. 3 (Itens: 23 na p. 3; o livreto dizia 20 e a FAQ corrige para 23) | Confere; Ataque do Inimigo 12 + 12 com ícone de 2 jogadores, conferido na imagem |
| Tabela 1 x 2 jogadores | p. 4, 6, 8, 14, 17, 32; Start here p. 15 | Confere |
| Organização da caixa, passos 1 a 4 | Start here p. 1 e 2; FAQ p. 2 | Confere, resumida; errata do envelope 3 aplicada; metalizadas nos 10 envelopes (corrigido na auditoria) |
| Passos 7 a 12 (sessão) | p. 4 a 7 | Confere |
| Passos 13 e 14 (mapa) | p. 12 | Confere |
| Passos 15 a 22 (Combate) | p. 16 e 17 | Confere; "posição 4 primeiro" também no Start here p. 11 |
| 2 jogadores no Combate (tabela, passo 19 e etapa 4) | p. 16 a 19, 22, 25 | Confere; troca de mão dos dois em `[!edicao]` como leitura do guia |
| O que volta para a caixa | p. 25 e 26 | Confere |
| Quem começa | p. 18 | Confere |
| Comece: ideia, palavras, montagem | p. 4, 8, 12, 14, 15, 18 a 20; Start here p. 9 a 11 | Confere |
| Passos do turno e do Inimigo no Comece | p. 18, 19, 22 | Confere |
| Exemplo resolvido do Comece (Sprint, Preparar, Ataque de 3 contra Defesa 2) | Start here p. 12 e 13 | Confere; Guardian Stance +2 de Defesa lido no desenho da carta (Start here p. 12) |
| Complete (Pummel 4) e Sua vez (Synergy + Primal Shot, faltam 5) | Start here p. 13 e 14 | Confere; contas em `contas.py` |
| Como acaba (Combate e Cenário), 12 Cenários | p. 8, 18, 25 | Confere |
| Erros mais caros | p. 15, 17, 19 | Confere |
| Etapa 1: instruções do Diário, condições, status, fichas | p. 8 e 35 | Confere |
| Etapa 1: Exploração, Tempo, Evento, lado vermelho | p. 12 e 13 | Confere; cor do lado lida no ícone da p. 13 |
| Tabela de recompensas e limites | p. 9 e 10 | Confere |
| Segredos, bloquear, Combate na Exploração, símbolos | p. 9, 10, 13, 14, 35 | Confere |
| Exemplo do trecho A4 ("Search the rubble") | p. 12 | Confere |
| Etapa 2: Teste e exemplo (2+3+3=8, descarta, 5, +1 = 6) | p. 10 e 11 | Confere; conta refeita |
| Etapa 3: resolver carta, Poder por posição 1, 2, 2, 3 | p. 14, 19, 20; Start here p. 12 e 14 | Confere (corrigido na auditoria) |
| Tabela de palavras básicas | p. 18, 19, 36 | Confere |
| Ações Bônus | p. 19 e 20 | Confere |
| Fim de turno, regras de ouro, passivo, aprimoramento, baralho vazio, Fadiga | p. 18, 19, 22 | Confere |
| Exemplo Lava Lash e Golomo (5 Poder, gasta 2, Defesa 2, dano 2) | p. 20 e 21 | Confere; conta refeita |
| Etapa 4: turno do Inimigo, Avançar, Recuar, Saltar | p. 22, 23, 36 | Confere |
| Fim do Combate, Domar, desistir, limpar | p. 18 e 25 | Confere |
| Dano permanece; cura até a metade | p. 15; FAQ p. 1 | Confere |
| Elementos, fichas Elementais, condições | p. 24 e 32 | Confere |
| Etapa 5: depois do Cenário, construção de baralho, Bolb | p. 7 e 26 | Confere |
| Combate Aleatório, Essência, Missões, Progresso B, modos difíceis | p. 6, 25, 27, 32, 33; FAQ p. 1 e 3 | Confere |
| Situações especiais (2 jogadores, Invocações, Terreno, linha, palavras, Acionar do Inimigo) | p. 8, 18, 19, 22, 24, 25, 32, 33, 36 | Confere |
| Avaliação final, 8 perguntas | páginas citadas em cada uma | Confere; as opções erradas contradizem o manual |
| Folha de consulta | resumo das etapas | Confere |

## 3. Contas refeitas

`/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1111/scripts/contas.py`: Poder do tutorial (1 + 3 menos 1 + 3 menos 1 + 3 = 8, o custo da Firenova); dano no Emberling (3 menos 2 = 1); dano no Windraiser (4 + 2 = 6, faltam 5; Firenova 6 vence); Ataque +2 (5); Teste do manual (8, 5, 6); Progresso (8 menos Fadigas, mínimo 3); cura até a metade (FAQ: 1); Golomo (4 menos 2 = 2); "para cada" (6 menos 1 = 5).

## 4. Figuras e montagem passo a passo

16 recortes em `como-jogar/dragon-eclipse/figuras/`, todos sem blocos de texto do manual (só peças, cartas, mapas e números de passo):

| Figura | Página | Onde no tutorial |
|---|---|---|
| setup-divisorias | Start here p. 1 | Passo 4 |
| setup-mapa-mundo | p. 5 | Passo 10 |
| bandeja | p. 7 | Passos 11 e 12 |
| setup-mapa-local | p. 12 | Passos 13 e 14 |
| setup-combate-solo | p. 16 | Passos 15 a 19 |
| setup-arena | p. 14 | Passos 15 a 19 |
| setup-folha-mystling | Start here p. 11 | Passo 18 |
| setup-ajuda | Start here p. 11 | Passo 20 |
| setup-primeiro-combate | Start here p. 10 | Comece, "Monte a mesa" |
| turno-sprint | Start here p. 12 | Comece, primeiro turno |
| tempo-evento | p. 13 | Etapa 1 |
| alcance | p. 18 | Etapa 3 |
| inimigo-habilidade | Start here p. 13 | Etapa 4 |
| inimigo-recua | p. 22 | Etapa 4 |
| domar-carta | p. 25 | Etapa 4 |
| elementos | p. 24 | Etapa 4 |

Passos sem ilustração no manual (não se inventou figura): organização da caixa, passos 1, 3 e 4 (o livreto só mostra uma divisória e um envelope); sessão, passos 5 a 7 (lista sem desenho); passos 19 e 20 do Combate (troca de mão e modificadores). Os passos foram renumerados depois da auditoria (organização da caixa em 4 passos; sessão 5 a 10; mapa 11 e 12; Combate 13 a 20). A figura da p. 14 do livreto (espelhada, pela FAQ) não foi usada. As etapas 2 e 5 e as seções 0, 1, 7 a 10 recebem foto pelo gerador.

**Fotos** (`como-jogar/dragon-eclipse/fotos/`, 4 com `fontes.json`): capa e três de componentes (mapa de Arena, figuras de papelão, Diário de Aventura), renders de produto de 1200 px da página da Asmodee Canada, distribuidora da Awaken Realms. Não há foto de mesa montada nem de partida: a página da Awaken Realms só tem fotos de protótipo (caixa com a palavra PROTOTYPE e miniaturas) de 725 x 500 px, abaixo do piso de 600 px do robô; Gamefound e store.asmodee.com estão atrás da Cloudflare. O `robo.py buscar` na página da Awaken Realms não achou candidatas porque as imagens vêm em `background-image`; um script no scratchpad (`fotos_de.py`) usou o próprio cliente do robô (robots.txt, User-Agent, pausa) para baixá-las e confirmar o tamanho. `robo.py mapear shop.asmodee.ca` acrescentou a receita "Asmodee Canada" em `tools/imagens/editoras.json`.

## 5. Interpretações e lacunas

- **Acionar** [interpretada]: o manual diz "end resolving the card that caused the Trigger and discard it". O guia diz que a carta que acionou "é encerrada e descartada", sem afirmar se o texto dela depois do Acionar é feito; nos exemplos do manual, Acionar é o último efeito da carta.
- **Poder por posição**: resolvido; 1, 2, 2 e 3 (p. 14; Start here p. 14).
- **Ações Bônus comuns**: o manual mostra Arrancada e Preparar na carta de Ajuda de Fogo e as chama de "comuns" (p. 20); o guia não afirma que estão em todas as cartas de Ajuda.
- **Idade** [lacuna no manual]: 12+ vem da Asmodee Canada.
- **Troca de mão com 2 jogadores** [lacuna]: o guia não diz se os dois fazem.

## 6. O que ficou fraco

- Extensão: cerca de 8.700 palavras, acima do alvo de 7.500 pedido pelo auditor (dossiê, seção 6).
- O "Comece" ensina o primeiro turno de Combate do tutorial do livreto, que tem baralho em ordem fixa; o primeiro turno com baralho embaralhado depende das etapas 3 e 4.
- Sem foto de mesa nem de jogabilidade: as fotos são renders de produto.
- O vídeo é de partida (Cenário 1), não de regras, e mostra parte da história.
- O guia evita a história e não ensina os modos PvP e Roguelite.

## 7. Auditoria independente (11/11/2026) e correções

Duas auditorias: regras contra o manual (APROVADO COM CORREÇÕES) e partida simulada só com o tutorial (SIM COM AJUSTES). Uma rodada de correções:

- **Erros corrigidos.** Poder por posição é 1, 2, 2 e 3 (p. 14; Start here p. 14); o `[!edicao]` de divergência saiu e o exercício da etapa 3 passou a pedir o Poder da posição 3. Metalizadas: uma em cada um dos 10 envelopes (Start here p. 2).
- **Montagem.** Provocação no fim da troca de mão, antes dos modificadores (p. 17). Bandeja de Mystling na tabela de componentes; marcador de Habilidade Especial em `[!edicao]`. Cartas de Ataque do Inimigo genéricas, guardadas com as cartas pequenas; Grupo começa vazio; primeiro Cenário com 1 Mystling inicial (p. 4); baralho do primeiro Cenário em `[!edicao]`; o que é visitar carta Explorada; trocar de Cenário a partir do terceiro; salvar só no fim do Cenário; ficha de Decisão no passo 5.
- **2 jogadores.** Cartas do Inimigo ao lado da Arena; cada um com baralho, posições e descarte do seu lado; Corrupção Maior aumenta atributos; troca de mão como leitura do guia.
- **Termos.** Original em inglês na primeira menção dos termos centrais; definidos Domar, Habilidade Especial, palavras de Combate, elemento principal, carta Explorada, Provocação, Decisão, Corrupção Maior, Terreno, Dreno, Lendária.
- **Clareza.** "Atacar +X" na tabela; a própria casa conta em qualquer alcance; Lentidão e Fraqueza com o efeito exato; Acionar uma vez por turno no Comece; Vida no coração da carta; dano do Inimigo na ficha dele; Saltar; Mystling Domado e Retratos; Fadiga vai para o Mystling que você escolhe; pacote ao acaso entre os fechados; Segredos guardados em `[!edicao]` (p. 9 x p. 26); Domar e dano letal em `[!edicao]`; célula vazia da tabela preenchida; faixa ruim sem cor inventada; modos difíceis com "o manual recomenda" e o texto do Aço; folha de consulta com "pode comprar 1" e "no máximo 1 Lendária"; legendas de alcance e das fichas de Mystling.
- **Avaliação.** A pergunta de Sprint e Pummel virou Arrancada (1 Poder) mais Pummel, com Poder e Agilidade no enunciado. Saíram duas perguntas que repetiam as etapas (passivo e Teste).
- **Cortes.** Organização da caixa em 4 passos; tabelas de componentes e de 2 jogadores enxutas; "O que volta para a caixa" remete à etapa 4 para limpar a Arena; "Quem começa" remete à etapa 4 para 2 jogadores; quadro de 2 jogadores na montagem e bloco de 2 jogadores na Aventura absorvidos pela tabela; turno do Inimigo e exemplo resolvido repetidos saíram do Comece e da etapa 4; aviso de manual em inglês dito uma vez; seções 0 e 1 encurtadas; folha de consulta compactada. A conferência "antes de começar" ficou, curta, porque o padrão do Como Jogar a exige.

Portões depois das correções: zero travessão; `vicios.py` sem aviso; `checar_comece.py` aprovado; prévia no scratchpad gerada sem marcação sobrando.
