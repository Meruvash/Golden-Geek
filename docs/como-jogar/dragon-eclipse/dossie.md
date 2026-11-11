# Dossiê: Como Jogar Dragon Eclipse

Entrega 1. Jogo pedido diretamente pelo editor (slug `dragon-eclipse`). Escrito em 11/11/2026.

## 1. Fontes

| Fonte | Versão e dados do arquivo | Onde | Situação |
|---|---|---|---|
| Edição brasileira | | Biblioteca da Asmodee Brasil/Galápagos (`https://api-prd.mundogalapagos.com.br/library-download/store/search?term=dragon` e `?term=eclipse`, grupo b2c): nenhum item de Dragon Eclipse. Busca na web por edição em português: nada | **Não existe edição brasileira publicada até 11/11/2026.** Segue-se o manual oficial em inglês, com aviso ao leitor |
| **Rulebook** (fonte principal) | Awaken Realms, 36 páginas (280 x 280 mm), InDesign 19.5, criado em 22/07/2024, modificado em 02/10/2024; arquivo `DE_CB_Rulebook_280x280mm_bleed3mm_[36 PAGES]_lowres2.pdf`; sha256 505e68f5…267ef | Página oficial do jogo, https://awakenrealms.com/games/awaken-realms/dragon-eclipse (seção de downloads), link `https://awakenrealms.com/images/download/Dragon%20Eclipse/ENG/DE_CB_Rulebook_280x280mm_bleed3mm_[36%20PAGES]_lowres2.pdf` (HTTP 200, 17,0 MB) | Baixado e lido inteiro em 11/11/2026, texto e ilustrações; p. 29 a 31 (Roguelite) só passadas os olhos, porque o modo não é ensinado |
| **Start here!** | Awaken Realms, 16 páginas (A4), criado em 05/08/2024; arquivo `DE_CB_Open&Play_210x297mm_bleed3mm_[16 PAGES]_lowres-1.pdf`; sha256 ca8f818f…0085 | Mesma página de downloads (HTTP 200, 16,8 MB) | Lido inteiro: organização da caixa (p. 1 e 2), regras de Aventura (p. 3 a 9), primeiro Combate passo a passo (p. 10 a 14), 2 jogadores (p. 15) |
| **FAQ / Errata v1.1** | Awaken Realms, fevereiro de 2025, 4 páginas; sha256 3a68f412…79dd | Mesma página (HTTP 200, 1,5 MB) | Lido inteiro |
| Página oficial do jogo | "1-2" jogadores, "60-120 minutes" (dados embutidos no JavaScript da página) | https://awakenrealms.com/games/awaken-realms/dragon-eclipse | Consultada em 11/11/2026; o JSON usa a duração por Cenário do manual (p. 4) |
| Asmodee Canada (distribuidora) | "Age 12+", "90-120 min", "1-2" | https://shop.asmodee.ca/en/awadgrengcbrk (robots.txt sem restrição) | Fonte da idade do JSON e das fotos |
| Vídeo | "DRAGON ECLIPSE - Gameplay resumida (CENARIO 1 - PARTE 01)", Duque Board Games | Busca do próprio canal (`/@DuqueBoardgames/search?query=dragon%20eclipse`, Accept-Language pt-BR) e oEmbed (`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=hHaH5md_yUg&format=json`), que confirmou título e canal | 11/11/2026. É partida do Cenário 1, não aula de regras; a legenda avisa que mostra parte da história |

**Editora.** O pedido falava em "Mr. Cuddington"; o manual, a página oficial e as lojas dão a Awaken Realms como editora (créditos na p. 33: design de Andrzej Betkiewicz, Wojciech Frelich e Kamil 'Sanex' Cieśla). O domínio mrcuddington.com é um portfólio de ilustração no ArtStation, sem Dragon Eclipse. O tutorial cita só a Awaken Realms.

**Arquivos no scratchpad** (fora do repositório): PDFs em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1111/dragon-eclipse/dl/` (`rulebook.pdf`, `starthere.pdf`, `faq.pdf`, renomeados); texto por página com layout em `.../txt/p1.txt` a `p36.txt`, livreto em `.../txt/start/p1.txt` a `p16.txt`, FAQ em `.../txt/faq/`; em ordem de leitura em `.../txt/raw/` (`pN.txt`, `sN.txt`, `fN.txt`); páginas em PNG em `.../img/` (60 dpi) e `.../hi/` (200 dpi); contas em `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1111/scripts/contas.py`; recortes em `.../scripts/figuras.py`. Os PDFs têm camada de texto; OCR não foi necessário. Os ícones (Poder, dano, atributos, ampulheta) não saem no texto e foram lidos nas imagens das páginas.

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial; +https://eliteboardgamers.com.br)`. Os links dos PDFs estão no JavaScript público da página de downloads da Awaken Realms (a mesma lista que a página mostra). O robots.txt de awakenrealms.com não existe (o servidor devolve a página do site), então nada é proibido. Gamefound e store.asmodee.com responderam com desafio da Cloudflare: não foram usados. Nenhum bloqueio foi contornado.

## 2. Glossário (tradução do guia, termo original, página)

| Termo no guia | Original | Página | Explicação |
|---|---|---|---|
| domador | Tamer | p. 4 | O jogador |
| Mystling | Mystling | p. 2 e 4 | As criaturas; nome mantido |
| Cenário | Scenario | p. 4 e 8 | Uma sessão da campanha (12, de A a L) |
| Aventura / Combate | Adventure / Combat | p. 8 e 14 | As duas partes do Cenário |
| Diário de Aventura | Adventure Journal | p. 8 | Livro de trechos |
| trecho | Script | p. 8 | Bloco numerado do Diário (A12) |
| Escolha um / Vá para o trecho X | Choose one / Go to Script X | p. 8 e 35 | Instruções do Diário |
| livro de Locais, mapa de Local | Location book, Location map | p. 12 | Mapas de Exploração |
| Exploração; ler um trecho; continue a Exploração; fim da Exploração | Exploration; Read a Script; Continue / End the Exploration | p. 12 e 13 | Parte livre da Aventura |
| trilha do Tempo, marcador de Tempo, espaço de Evento, Evento | Time track, Time token, Event slot, Event | p. 12 e 13 | O relógio da Exploração |
| encaixe (I a V), ficha A/B | slot, token A/B | p. 13 | Marcas de decisão no mapa (o guia evita "slot" para não confundir com as posições de Ação) |
| bloquear / desbloquear trecho, ficha universal | Lock / Unlock Script, Universal token | p. 13 | |
| folha de Status, parte X do status Y | Status Sheet (Save sheet), "Y" part X status | p. 8 e 35 | Memória da campanha |
| Teste, tabela do Teste, valor de Teste, Infortúnio | Test, Test Table, Test Value, Misfortune | p. 10 e 11 | Aposta com o baralho de Itens |
| Item, Equipamento, Segredo, Prata, Essência | Item, Equipment, Secret, Silver, Essence | p. 9 e 10 | Recursos e cartas da Aventura |
| Fonte de luz, Comida, Escalada, Ferramentas | Light Source, Food, Gear, Tools | p. 10 | Símbolos de Equipamento |
| dano, Curar, Fadiga, Poder | damage, Heal, Fatigue, Power | p. 9 e 20 | |
| Mapa-múndi, porta-cartas, carta Explorada / Inexplorada | World Map, cardholder, Explored / Unexplored | p. 5 | |
| bandeja de Mystling, bolso | Mystling tray, pocket/compartment | p. 7 | |
| divisórias Grupo, Cartas Desbloqueadas, Cartas Bloqueadas, Baralho de Progresso, Inventário, Removidas, Combates Aleatórios, Enciclopédia de Mystlings | Party, Unlocked cards, Locked cards, Advancement deck, Inventory, Removed, Random Combats, Mystling Encyclopedia | p. 5, 7, 25 e 26; Start here p. 1 e 2 | |
| pacote | Booster | p. 26; Start here p. 2 | |
| baralho Inicial, Progresso A e B | Starting deck, Advancement A/B | p. 7 e 26 | |
| carta de Atributos, de Habilidade, de Ação, de Missão, de Domar, de Retrato, de Nível | Stat, Ability, Action, Quest, Taming, Portrait, Tier card | p. 3, 6, 15, 25 e 32 | |
| ficha do Mystling | Mystling sheet | p. 15 | Atributos + Habilidade |
| Vontade, Defesa, Vida, Força, Agilidade | Willpower, Defense, Health, Strength (Attack), Swiftness | p. 15 | Ordem dos ícones na carta, da esquerda para a direita |
| Habilidade Especial, Ação Bônus, Ação Bônus Elemental | Special Ability, Bonus Action, Elemental Bonus Action | p. 15 e 20 | |
| Arrancada, Preparar, Fúria | Dash, Prepare, Fury | p. 20 | |
| carta de Ajuda, palavras de Combate | Help card, Combat tags | p. 17 e 36 | |
| livro de Arenas, mapa de Arena, carta de Arena, casa | Arena book, Arena map, Arena card, space | p. 14 | "Casa" para os hexágonos |
| posições (1 a 4) | Action slots | p. 14 | Onde ficam as cartas de Ação |
| ficha do Inimigo, baralho do Inimigo, posições do Inimigo (1 a 5), carta de Ataque do Inimigo, carta de Habilidade do Inimigo, marcador de Habilidade Especial | Enemy sheet, Enemy deck, Enemy slots, Enemy Attack card, Enemy Ability card, Special Ability token | p. 14, 15, 17 e 22 | |
| troca de mão | Mulligan | p. 17 | |
| Atacar, Causar X a alcance Y, alcance, Mover, Acionar, Posição X, Curar | Attack, Deal X in range Y, range, Move, Trigger, Slot X, Heal | p. 18, 19 e 36 | |
| passivo, aprimoramento, reembaralhar, embaralhar | Passive, Upgrade, Reshuffle, Shuffle | p. 18 e 19 | |
| Avançar, Recuar, Saltar | Rush, Retreat, Blink | p. 22, 23 e 36 | |
| Dreno, Perfurar, Interromper, Purificar, Buscar, remover do jogo, em linha | Drain, Pierce, Interrupt, Cleanse, Search, Remove card from play, in line | p. 33 e 36 | |
| vencer, perder, Domar, desistir, limpar a Arena | Win, Lose, Tame, Conceding, Clear the Arena | p. 25 | |
| fichas Elementais, Tremor, Tornado | Elemental tokens, Quake, Tornado | p. 24; Start here p. 11 | |
| Queimadura, Lentidão, Fraqueza, Silêncio | Burn, Slow, Weak, Silence | p. 32 | Condições |
| Fogo, Água, Terra, Ar, Luz, Escuridão | Fire, Water, Earth, Air, Light, Dark | p. 24 | |
| Terreno | Terrain | p. 14 e 33 | |
| Corrupção, Corrupção Maior | Corruption, Major Corruption | p. 32 | |
| Combate Aleatório | Random Combat | p. 32 | |
| Invocação | Summon | p. 32 | |
| Exaltado | Exalted | p. 6 e 33 | |
| ficha de Provocação, ficha de Decisão | Taunt token, Decision token | p. 8 e 17 | 2 jogadores |
| Lendária, Neutra, Elemental | Legendary, Neutral, Elemental | p. 7 | |

Nomes de cartas (Sprint, Pummel, Guardian Stance…) e de Mystlings (Young Emberling, Frightened Windraiser…) ficam em inglês, como impressos.

## 3. Base de regras (classificação: [V] verificada nesta sessão, [I] interpretada, [L] lacuna)

**Estrutura e objetivo**
- 1 ou 2 jogadores, cooperativo, por Cenários; não se perde Cenário [V p. 4].
- Sessão: antes, durante e depois do Cenário; no primeiro, "antes" é pulado [V p. 4].
- Cenário de 2 a 2,5 h; Aventura e Combate em ordem variável; fim pela frase do Diário [V p. 4 e 8].
- 12 Cenários, A a L [V p. 8].

**Montagem**
- Organização da caixa, passos 1 a 32 [V Start here p. 1 e 2], com uma metalizada do pacote 5 em cada um dos 10 envelopes (Outburst no 1) [V Start here p. 2]; errata do envelope 3 e de 23 Itens [V FAQ p. 2].
- Primeiro Cenário: 1 Mystling inicial, Young Emberling ou Young Iceling, trocável no segundo [V p. 4]. Composição do baralho do primeiro Cenário [I: 10 Iniciais + 6 do Mystling, pelo tamanho de 16 (p. 7) e pela lista do tutorial (Start here p. 11); o trecho A0 não foi lido].
- Cartas de Ataque do Inimigo: genéricas, por símbolo, guardadas com as cartas pequenas [V p. 17 e 25; Start here p. 2]; Inimigo com 2 jogadores: cartas ao lado da Arena [V p. 17].
- Marcador de Habilidade Especial: não está na p. 3; desenhado como anel preto [I: ficha universal, lado preto; Start here p. 11 e p. 3].
- Mystling Domado: Domar lado B na Enciclopédia, Habilidade do Inimigo em Removidas, cartas em "Tamed" na carta de Nível [V p. 25 e 32]; Retratos [V p. 25]. Salvar só no fim do Cenário [V p. 26]. Segredos guardados: p. 9 (objetos) x p. 26 (todos) [I, em `[!edicao]`].
- Componentes por sessão, Inventário [V p. 5].
- Mapa-múndi a partir do fim do Cenário 1; reconsiderar a partir do 3º [V p. 5 e 6].
- 2 Mystlings de elementos principais diferentes; com 2 jogadores, 1 cada [V p. 6].
- Construção de baralho, 5 regras, elemento secundário [V p. 7].
- Abrir mapa, Evento e Tempo [V p. 12].
- Montagem do Combate, passos 1 a 8 [V p. 17]; figura [V p. 16].
- Componentes de 2 jogadores [V p. 14, 17 e 32; Start here p. 15].
- Limpar a Arena [V p. 25]; salvar [V p. 26].

**Aventura**
- Instruções do Diário, condições de cima para baixo, só a primeira [V p. 8 e 35].
- Status: cada parte uma vez, nunca se perde [V p. 8].
- Fichas à frente não são salvas; não se descartam por conta própria [V p. 8].
- Dano fora do Combate, limite da Vida [V p. 9]; Curar [V p. 9]; Fadiga até 5, senão 5 dano [V p. 9]; Segredos, 4 tipos [V p. 9]; Poder 10 [V p. 9]; Prata 10; Essência 6, a partir do Cenário 2 [V p. 9]; Equipamento 2; Item 3 [V p. 10]; símbolos [V p. 10].
- Exploração: só ler trechos, de graça [V p. 12]; Tempo e Evento [V p. 13]; lado vermelho encerra [V p. 13, ícone]; encaixes [V p. 13]; bloquear [V p. 13]; Combate na Exploração [V p. 13]; fim da Exploração [V p. 13].
- Decisão com 2 jogadores [V p. 8].

**Teste**
- Ordem, valor e Infortúnio, fim automático, descarte [V p. 11]; exemplo [V p. 11]; bônus com e sem gastar Equipamento [V p. 11].

**Combate**
- Turnos alternados, jogador primeiro; 2 jogadores pela Provocação [V p. 18].
- Fim: perder, vencer, Domar [V p. 18 e 25].
- Passos do turno [V p. 18 e 19]; regras de ouro [V p. 18].
- Resolver carta, Poder da posição [V p. 19]; 1, 2, 2 e 3 nas posições 1 a 4 [V p. 14, ilustração; Start here p. 12 e 14: Primal Shot na posição 2 dá "only 2"]. Corrigido depois da auditoria: a primeira versão lia 1, 2, 3 nas posições 2 a 4 no desenho do livreto.
- Ações Bônus, Arrancada, Preparar, Elemental, Habilidade Especial [V p. 19 e 20].
- Comprar, reembaralhar, embaralhar [V p. 19].
- Fim de turno, condições [V p. 19].
- Passivo, aprimoramento [V p. 18].
- Alcance, Mover, Atacar, Causar, Acionar, Posição X [V p. 18, 19 e 36]. Acionar: "end resolving the card that caused the Trigger and discard it" [I: o guia diz que a carta que acionou é encerrada e descartada; nos exemplos do manual, Acionar é o último efeito].
- Turno do Inimigo [V p. 22]; baralho do Inimigo virado para cima [V p. 17]; baralho vazio [V p. 22]; sem Fadiga no tutorial [V Start here p. 14].
- Avançar, Recuar [V p. 22 e 23]; Saltar [V p. 36].
- Domar em ordem, ficha A, cumprimento permanente, Domar com dano cheio [V p. 25]; desistir [V p. 25].
- Dano permanece depois do Combate [V p. 15]; cura até a metade [V FAQ p. 1].
- Vantagem de elemento, roda [V p. 24]; fichas Elementais [V p. 24]; condições [V p. 32]; Invocações [V p. 32]; Terreno, em linha, Arena 05 [V p. 33]; outras palavras [V p. 36]; Acionar do Inimigo [V p. 36].
- 2 jogadores: Provocação, alvo, derrota, Fadiga, desistência [V p. 19, 22 e 25].

**Depois do Cenário**
- Passos 1 a 6 [V p. 26]; Progresso B pelo Z50 [V FAQ p. 1 e 3].
- Combate Aleatório e cartas de Nível [V p. 25 e 32]; Missões [V p. 6 e 33]; modos difíceis [V p. 27].

**Primeiro Combate (tutorial do livreto)**
- Montagem: Arena 2, carta 35, cartas 169 e 170, marcador na posição 3, baralho do Inimigo em ordem, Tornados, carta de Atributos 62 ou 118, Habilidade 66 ou 122, ordem do baralho, 1 Poder [V Start here p. 10 e 11].
- Atributos do Young Emberling (0, 0, 14, 4, 2) e do Young Iceling (0, 0, 16, 4, 2) [V Start here p. 11 e 12, lidos no desenho da carta].
- Windraiser: Vida 11, Força 3, Defesa 0, Vontade 0 [V Start here p. 12 a 14]; Agilidade 3 [V p. 22].
- Turnos 1 a 3 e o Poder acumulado (8 para a Firenova) [V Start here p. 12 a 14; conta refeita].

**Lacunas [L]**
- O manual não diz a idade; a idade (12+) vem da página da Asmodee Canada.
- O manual não diz, no modo cooperativo, se cada jogador pode fazer a troca de mão; o guia diz em `[!edicao]`, como leitura do guia, que cada um faz a sua.
- Dano letal nos dois lados no mesmo efeito: o manual não trata; leitura do guia em `[!edicao]`.
- Domar e dano letal no mesmo efeito: leitura do guia pelo "mesmo que" da p. 25.

## 4. Divergências

- Lista do envelope 3 e número de Itens no livreto: corrigidos pela FAQ (p. 2). O guia segue a FAQ.
- Ilustração da p. 14 do Start here é espelhada (FAQ p. 2): não foi usada como figura.
- Poder impresso nas posições: não há divergência; é 1, 2, 2 e 3 (p. 14; Start here p. 14). A divergência apontada na primeira versão era erro de leitura do desenho.

## 5. Plano de ensino

Classes de tarefa, da mais simples à mais completa: montar e jogar o primeiro turno do tutorial (Comece); ler o Diário e explorar um mapa (etapa 1); fazer um Teste (etapa 2); jogar o próprio turno de Combate com Poder e Ações Bônus (etapa 3); prever e enfrentar o Inimigo, vencer ou Domar (etapa 4); fechar o Cenário e montar baralhos (etapa 5). Cada etapa: explicação, passo a passo, regras adicionais recolhidas, exemplo resolvido, tarefa para completar e tarefa sem apoio, com as contas refeitas em `contas.py`.

Adiado do Comece: Testes, Tempo e Evento, passivos e aprimoramentos, movimento do Inimigo, Domar, condições, elementos, pacotes e baralhos. Ficou de fora do guia: as regras de PvP e Roguelite (p. 27 a 31), que não fazem parte da campanha; o guia só diz que existem.

## 6. Extensão e portões

Depois das auditorias, cerca de 8.700 palavras contando tabelas, exercícios, blocos recolhidos e endereços (eram 9.200 na primeira versão; as correções de clareza acrescentaram texto e os cortes pedidos tiraram mais). O alvo do auditor era perto de 7.500 e não foi alcançado sem cortar regra. Passa do alvo do BRIEF para jogo médio: o jogo tem 36 páginas de regras mais 16 do livreto, duas partes com sistemas próprios (Aventura com Exploração, Tempo e Testes; Combate com posições, Poder, Ações Bônus, Inimigo automático e Domar), uma organização de caixa em 32 passos e uma camada de campanha (pacotes, Progresso, baralhos). A seção de montagem foi encurtada uma vez (tabela de componentes e organização da caixa). O "Comece" tem cerca de 1.150 palavras de leitura, dentro dos 6 minutos.

- Travessão e meia-risca: zero.
- `tools/vicios.py` (função `avisos`) no tutorial e no JSON: zero avisos.
- `python3 tools/checar_comece.py docs/como-jogar/dragon-eclipse/tutorial.md`: aprovado.
- Prévia gerada com `tools/como_jogar_md.py` numa cópia no scratchpad (`/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1111/previa/como-jogar/dragon-eclipse/index.html`), com `"publicar": true` só na cópia: sem marcação sobrando, 16 figuras e 4 fotos em rodízio.
