# Dossiê: Como Jogar Tiny Epic Pirates

Entrega 1. Produzido em 01/11/2026 seguindo `docs/como-jogar/BRIEF.md` e a Parte 2 de `docs/como-jogar/PROMPT_PILOTO.md`. Jogo escolhido pelo editor; nada publicado (`"publicar": false`).

## 1. Escolha do jogo e procura real

Jogo definido pelo editor no pedido (série Tiny Epic). Não há resenha de Tiny Epic Pirates no site (sem pasta `tiny-epic-pirates/` e sem `conteudo/tiny-epic-pirates.json`), por isso `"resenha": null`. Autocomplete do Google e do YouTube não foi consultado nesta sessão (fora do escopo do pedido).

## 2. Fontes

| Fonte | Versão | Onde | Acesso |
|---|---|---|---|
| **Manual da edição brasileira**, "O Código dos Piratas", Meeple BR | PDF de 20 páginas (365 x 545 pt), arquivo InDesign `TEP_rulebook PT-BR.indd`, diagramado em 16/05/2022; PDF modificado em 02/02/2023 (iLovePDF). Créditos (p. 16): autor Scott Almes; edição brasileira Thiago Leite; tradução Romir G. E. Paulino; diagramação Gerson Lopes; revisão Bianca Melyna e Márcio Botelho; © 2022 Gamelyn Games | https://meeplebr.com/wp-content/uploads/2022/02/TEP_rulebook-PT-BR_Final_compressed-2.pdf, linkado como "Manual de Regras (low quality)" na página do produto | Baixado antes desta sessão pelo agente que coordena a série, no scratchpad; lido inteiro aqui em 01/11/2026 |
| Página do produto Meeple BR | Consulta em 01/11/2026 | https://meeplebr.com/product/tint-epic-pirates/ (o slug tem erro de digitação, "tint") | `curl` recebeu 406 (Mod_Security); não houve contorno. A página foi lida pela ferramenta WebFetch, acesso normal: "1 a 4 jogadores", "30 a 45 minutos", "para maiores de 14 anos", lista de componentes |
| Manual original em inglês (Gamelyn) | Não consultado | | O brasileiro estava completo e legível; nenhuma dúvida de tradução exigiu o original |
| FAQ ou errata oficial | Nenhuma procurada com resultado | | Lacuna |
| Vídeo | "TINY EPIC PIRATES - Gameplay resumida em 10 minutos!", Duque Board Games, ID xTkpXj1B01c | Achado pela busca do próprio canal (@DuqueBoardgames/search?query=tiny epic pirates) e confirmado pelo oEmbed (título e canal) | Só incorporado; nada baixado. É partida resumida, não vídeo de regras; o canal Romir Play House (do tradutor) só tem unboxing deste jogo |

**Como o manual foi lido.** `pdftotext` (com e sem `-layout`), página a página; a paginação impressa coincide com a do PDF (p. 1 é a capa). Ilustrações com valores (Trilha de Lenda, velocidade da Fragata, Cartas de Mercador, Timão) foram lidas em renderizações de 220 a 500 dpi. PDF, texto e imagens ficam no scratchpad (`.../scratchpad/tinyepic/pirates/`), fora do repositório.

**Figuras.** 7 recortes só da parte gráfica, em `como-jogar/tiny-epic-pirates/figuras/` (webp, qualidade 80, até 1000 px): preparação (p. 5), Timão (p. 7), navegar (p. 8), Mercado (p. 9), Esconder-se (p. 12), Trilha de Lenda (p. 16), velocidade da Fragata (p. 15). Os recortes da p. 5 e da p. 15 trazem rótulos curtos do próprio desenho ("Porto", "0 Tesouros"), não blocos de texto.

## 3. Glossário (edição brasileira)

Termos como impressos no manual da Meeple BR. O original em inglês não foi consultado; por isso não há coluna de termo original.

| Termo | Página | O que é |
|---|---|---|
| Carta de Mapa; Mar | 2, 4 | As 16 cartas que formam a grade 4 x 4 |
| Marcador de Busca | 2, 4, 10 | Ficha fechada em cada Carta de Mapa; revelada pela Ordem Buscar |
| Tabuleiro de Lenda | 2, 4 | Tabuleiro à esquerda: Trilha de Ouro, Trilha de Lenda, Tesouros |
| Trilha de Ouro; Dobrão de Ouro | 3, 4 | Ouro de 0 a 13, marcado pelo Dobrão |
| Trilha de Lenda; Marcador de Lenda; Nível de Lenda | 4, 16 | Fama do pirata; níveis Lobo do Mar, Pirata, Corsário, Espadachim, Bucaneiro, Pirata Terrível, Lenda |
| Tabuleiro de Timão; Timão | 2, 4, 7 | Tabuleiro à direita, com a roda de 6 espaços |
| Esconderijo | 4, 7, 12 | Espaço 0 do Timão; Ordem Esconder-se |
| Marcador de Ordem | 2, 4 | 5 por jogador, um por Ordem, em ordem sorteada nos espaços 1 a 5 |
| Capitão (peça); Carta de Capitão | 2, 4, 13 | A peça anda no Timão; a carta tem dados e Ações Bônus, frente e verso |
| Marujo | 4, 7 | Trabalhador: pula espaços no Timão e trabalha nas Missões |
| Missões de Marujos: Cordame, Canhões, Extorsão, Reparo | 7 | +1 movimento; +1 dano; 1 Ouro ao cruzar a Linha; depósito dos Empurrados. O manual chama de "3 Missões" (p. 6) e de "quatro espaços de Missões" (p. 7) |
| Linha de Navios (também "Linha do Navio") | 6, 7, 12, 15 | Entre o 5 e o 0 do Timão |
| Ordem do Capitão: Pilhar, Negociar, Recrutar, Buscar, Atacar, Esconder-se | 6, 9 a 12 | As 6 Ordens |
| Ações Bônus | 13, 14 | Ações das cartas cujo ícone da esquerda é a Ordem do turno |
| Enterrar Tesouro; Local de Tesouro; Tesouro | 13 | Ação Bônus que vence o jogo |
| Espólio; Caixote de Espólio (cubo); Bolsa de Espólios | 3, 9 | Cana-de-açúcar (bege), Rum (roxo), Café (marrom), Pólvora (cinza) |
| Tabuleiro de Mercado; Mercado | 4, 9 | Tabela de valores de 2 a 5; o Mercado na Carta de Mapa negocia um tipo |
| Assentamento | 9 | Ilha que se pode Pilhar (1 ou 2 cubos) |
| Navio Pirata; Navio Mercante; Fragata | 3, 11, 15 | Navio do jogador; navios neutros que vão de Porto a Porto; navio que persegue |
| Marcador de Porto (Porto) | 2, 4 | Dois cantos opostos do Mar |
| Carta de Mercador | 2, 5, 11 | Dano do Navio Mercante (2, 4, 6, 8) e Ouro ao afundar |
| Cartas de Tripulação | 2, 5, 10 | Até 4 por jogador; dados e Ações Bônus |
| Enseada | 5, 12 | Onde o navio se esconde; uma por vez |
| Tempestade | 8 | Carta que empurra quem entra ou atravessa |
| Empurrado | 8 | Penalidade: Marujo para o Reparo |
| Marcador de Tiro Certeiro | 10, 11 | Muda um dado para qualquer número |
| Naufragar | 11 | Afundar um Navio Mercante |
| Motim | 10 | Virar a Carta de Capitão, uma vez por partida |
| Negociar Espólio Especial, Trocar, Navegue a Fragata / o Navio Mercante, Receber Ouro, Rerrolar, Realocar, Navegar | 14 | Ações Bônus |
| Ganhar Lenda (ícone) | 12, 16 | Na Carta de Mercador, com faixa de número de jogadores |

## 4. Base de regras

Marcação: `[BR p. N]` e frase curta lida ali. Classificação: [verificada], [interpretada] (com motivo), [lacuna].

### 4.1 Objetivo e fim
- R1. Vence quem enterrar 3 tesouros primeiro. [BR p. 3, 6] "Seja o primeiro pirata a enterrar 3 tesouros" [verificada]
- R2. Terceiro Tesouro dispara o fim; jogar até todos terem o mesmo número de turnos; primeiro jogador não joga de novo. [BR p. 16] "o primeiro jogador não jogará novamente" [verificada]
- R3. Desempate: Lenda, Ouro, Espólio, vitória compartilhada. [BR p. 16] [verificada]

### 4.2 Recursos
- R4. Ouro na Trilha de Ouro, máximo 13 (excesso perdido), mínimo 0, não se gasta o que não tem. [BR p. 3] "Você nunca pode ter mais do que 13 Ouros" [verificada]
- R5. Navio Pirata leva até 3 cubos; Navio Mercante, 1. [BR p. 3] [verificada]

### 4.3 Preparação (p. 4 e 5)
- R6. Grade 4 x 4 de Cartas de Mapa; 1 Marcador de Busca fechado em cada; sobras para a caixa sem revelar. [BR p. 4] [verificada] (20 marcadores, p. 2; 16 usados)
- R7. Material por jogador (lista). [BR p. 4] [verificada]
- R8. Marcador de Lenda lado ensanguentado para baixo no espaço inferior; Dobrão no 1; Tesouros na base; 1 Marujo no ícone da terceira linha da Trilha de Lenda. [BR p. 4] [verificada]
- R9. Marcadores de Ordem embaralhados nos espaços 1 a 5; Capitão no 0; 3 Marujos um em cada Missão, exceto Reparo. [BR p. 4] "(exceto no espaço de Reparar)" [verificada]
- R10. Mercado: 1 cubo de cada cor ao acaso nos 4 espaços; resto na Bolsa. [BR p. 4] [verificada]
- R11. Portos em cantos opostos; Navio Mercante em cada, apontado na diagonal para o oposto, com 1 cubo. [BR p. 4] [verificada]
- R12. Pilha de Mercador 8, 6, 4, 2 (2 no topo); 2 cartas viradas. [BR p. 5] [verificada]
- R13. 3 Cartas de Tripulação viradas. [BR p. 5] [verificada]
- R14. Primeiro jogador (o mais novo ou outro método) põe a Fragata num canto sem Navio Mercante; cada um põe o Navio Pirata numa carta com Enseada desocupada (começa escondido); cada um escolhe o lado da Carta de Capitão. [BR p. 5] [verificada]
- R15. Dados e Tiro Certeiro ao alcance. [BR p. 5] [verificada]
- R16. Espólio inicial pelo valor no Mercado: 2 para o primeiro, 3 para o segundo, etc. [BR p. 5] [verificada]

### 4.4 Turno
- R17. Turno: 1 Ordem e Marujos; 2 Navegar; 3 Executar a Ordem; 4 Ações Bônus; 5 Linha de Navios. [BR p. 6, 16] [verificada]
- R18. Capitão avança no sentido horário, pelo menos 1 espaço. [BR p. 7] [verificada]
- R19. Próximo espaço grátis; pular custa 1 Marujo de qualquer das 4 Missões por espaço. [BR p. 7] "retirados de QUALQUER um dos quatro espaços" [verificada]
- R20. Não pode terminar no espaço de onde saiu. [BR p. 7] [verificada]
- R21. Pular o 0 nunca custa Marujo; do 5 ao 1 direto. [BR p. 7, 12] [verificada]
- R22. Espaço com Marujo de turno anterior pula sem custo; o Marujo pulado ou o do espaço de chegada vai para qualquer Missão; não serve para pular de novo no mesmo turno. [BR p. 7] [verificada]. Dependência: R19.
- R23. Missões: Cordame +1 movimento; Canhões +1 dano; Extorsão 1 Ouro ao cruzar a Linha; Reparo recebe Empurrados, só sai por Realocar ou Esconder-se em Enseada, mas pode pular espaço. [BR p. 7] [verificada]
- R24. Movimento = Lenda + Cordame + Marcadores de Busca de movimento; ortogonal; passar e parar com outros navios sem penalidade; navio no centro sem cobrir ilhas. [BR p. 8] [verificada]. Navegar é opcional ("você pode navegar"). [verificada]
- R25. Tempestade: entrar ou atravessar empurra, uma vez por Tempestade; ficar ou sair não. [BR p. 8] [verificada]
- R26. Empurrado: 1 Marujo de Cordame, Canhões ou Extorsão ao Reparo; senão, 1 do Timão; todos no Reparo: perder ataque não empurra, mas não pode navegar para Tempestade. [BR p. 8] [verificada]
- R27. Executar a Ordem é opcional ("você pode executar"). [BR p. 9] [verificada]

### 4.5 Ordens
- R28. Pilhar: carta com Assentamento; 1 ou 2 cubos; capacidade 3; descartar novo ou trocar. [BR p. 9] [verificada]
- R29. Negociar: Mercado negocia um tipo; até 3 do mesmo tipo; Ouro = quantidade x valor; cubos à Bolsa; tipo vendido ao 2, demais sobem fechando o espaço; nada move se já é o mais barato; valores de 2 a 5. [BR p. 9] [verificada]
- R30. Recrutar: 1 das 3 reveladas, à direita do Capitão; máximo 4; repor na hora; pagar 1 Ouro para renovar a oferta, 1 vez por turno, sem obrigação de pegar; tripulação cheia: descartar uma ao fundo; Capitão nunca descartado. [BR p. 10] [verificada]. Recrutar sem exigência de lugar: [interpretada], o manual não cita nenhuma.
- R31. Motim: 1 vez por partida, ao Recrutar; vira a Carta de Capitão; Marcador de Lenda para o lado ensanguentado. [BR p. 10] [verificada]
- R32. Buscar: carta com Marcador de Busca fechado; "!" na hora (2 ou 3 Ouros, 1 Tiro Certeiro, 1 cubo); relógio guardado, uso único (2 de movimento; entrar numa Tempestade sem ser Empurrado); vários por turno; com 13 Ouros ou 3 Tiro Certeiro não recebe mais. [BR p. 10] [verificada]. Limite de 3 Tiro Certeiro como regra geral: [interpretada], só aparece no Buscar.
- R33. Atacar: alvo na mesma carta; não a Fragata; escolher entre vários. [BR p. 11] [verificada]. Navio escondido não pode ser atacado. [BR p. 12] [verificada]
- R34. Dano: dados pela Lenda (2 ou 3); 1 por símbolo igual nas cartas; Tiro Certeiro muda um dado, vários por ataque; +1 por Marujo nos Canhões; Tripulação com dano automático soma. [BR p. 11] [verificada]
- R35. Navio Mercante: dano na Carta de Mercador; precisa de MAIS; ao afundar: cubo (abrir espaço), Ouro da carta, trocar carta, Navio ao Porto mais distante (ortogonal; empate, você escolhe), cubo novo; carta de 8 não é trocada. [BR p. 11] [verificada]
- R36. Mercante, Lenda: ícone Ganhar Lenda com faixa de jogadores ("1-2" = 1 ou 2 jogadores). [BR p. 12] [verificada]
- R37. Mercante, perder: Empurrado + 1 Tiro Certeiro; empate: Tiro Certeiro, sem empurrão; o Mercante não afunda. [BR p. 12] [verificada]
- R38. Pirata contra pirata: atacante rola primeiro; defensor da mesma forma; vencedor +1 Lenda; sem roubo de cubo ou Ouro; perdedor Empurrado + Tiro Certeiro; empate, os dois ganham Tiro Certeiro, ninguém empurrado. [BR p. 12] [verificada]
- R39. Esconder-se: espaço 0; carta com Enseada livre; uma por navio; depois mover Marujos de qualquer lugar, inclusive Reparo, para Cordame, Canhões ou Extorsão; Extorsão paga 1 na hora; dispara a Linha; escondido não é atacado por jogadores nem pela Fragata; a Fragata ainda navega até ele. [BR p. 12] [verificada]

### 4.6 Ações Bônus e Tesouro (p. 13 e 14)
- R40. Ícone mais à esquerda igual à Ordem: ícones do canto inferior direito; vale mesmo sem executar a Ordem; opcionais, gratuitas, depois da Ordem (exceto Rerrolar). [BR p. 13] [verificada]
- R41. Ações Bônus com nome de Ordem não disparam outras. [BR p. 13] [verificada]
- R42. Capitão antes da Tripulação; Capitão da esquerda para a direita ("Enterrar, depois Atacar" ou "Enterrar, depois Pilhar"); pode pular a primeira; Tripulação em qualquer ordem, uma de cada vez. [BR p. 13] [verificada]
- R43. Enterrar: na carta do Local de Tesouro; gastar o Ouro mostrado; Tesouro cobre o ícone; não pode sem Ouro, com a Fragata na carta ou com Local já ocupado. [BR p. 13] [verificada]
- R44. Negociar Espólio Especial, Trocar, Navegue Fragata/Mercante, Receber Ouro, Rerrolar, Realocar, Navegar: texto da p. 14. [BR p. 14] [verificada]

### 4.7 Linha de Navios e Fragata (p. 15)
- R45. Depois da Ordem e das Ações Bônus, se cruzou: 1 Ouro por Marujo na Extorsão; o jogador à direita do ativo move os navios. [BR p. 15] [verificada]
- R46. Mercantes: Laranja 1, depois Verde 1, para o Porto de destino, apontados; quem move escolhe a carta; no Porto viram, devolvem o cubo e pegam outro; sem Tempestade. [BR p. 15] [verificada]
- R47. Fragata: depois dos Mercantes, na direção do ativo, mesmo escondido; para na carta dele; 2/3/4/5 por 0/1/2/3 Tesouros (ilustração); sem Tempestade. [BR p. 15] [verificada]
- R48. Ataque da Fragata: ao entrar na carta do ativo, se não escondido; vence sempre; todos os Marujos das Missões e do Timão ao Reparo; sem Tiro Certeiro; ignora outros Piratas. [BR p. 15] [verificada]

### 4.8 Lenda (p. 16)
- R49. Sobe 1 nível ao vencer Pirata ou afundar certos Mercantes; bônus único (Ouro, Marujo ou Tiro Certeiro); pode aumentar movimento e dados; nunca desce; no topo, sem bônus. [BR p. 16] [verificada]
- R50. Valores por nível, lidos na ilustração da p. 16 (confere com a p. 2): Lobo do Mar 1 mov./2 dados; Pirata 2 mov., +2 Ouros; Corsário 3 mov., +1 Marujo; Espadachim 3 dados, +4 Ouros; Bucaneiro 4 mov., +Tiro Certeiro; Pirata Terrível +8 Ouros. Valores em cinza claro nas colunas foram lidos como "mantém o anterior". [interpretada quanto às células claras]. Nível Lenda: [lacuna], a ilustração não mostra valores legíveis e o texto não o descreve.

### 4.9 Lacunas e ambiguidades
- L1. Extorsão ao Esconder-se: p. 12 manda pagar na hora, p. 15 manda pagar no passo 5. Possível pagamento duplo não esclarecido. Tutorial: um pagamento por volta [interpretada], aviso em [!edicao].
- L2. Onde entra o Marujo ganho no Corsário. [lacuna], aviso em [!edicao].
- L3. Quem escolhe o caminho da Fragata (p. 15 só fala em escolha para os Mercantes). [lacuna]
- L4. Navegar para a carta onde a Fragata já está: o ataque só é descrito quando ela "entra" na carta. [lacuna]
- L5. Ordem Esconder-se sem Enseada livre: não diz se ainda se realocam Marujos. [lacuna]
- L6. "Qualquer Missão" no retorno do Marujo do Timão (p. 7) inclui ou não o Reparo; o tutorial diz "uma Missão à sua escolha", sem afirmar. [interpretada]
- L7. Navios que começam escondidos (p. 5) deixam de estar escondidos ao navegar: o manual não diz em texto; o tutorial só afirma que, enquanto estão na Enseada, não podem ser atacados. [interpretada]
- L8. Nível Lenda (topo da trilha): valores não descritos. [lacuna]
- L9. Erro de redação: "mesma Carta de Navio" (p. 12) por Carta de Mapa. Registrado no tutorial.
- L10. Nome da linha: "Linha do Navio" (p. 6, 7) e "Linha de Navios" (p. 15, título). O tutorial usa "Linha de Navios" sempre e avisa.
- L11. Missões: "3 Missões" (p. 6, 8) e "quatro espaços de Missões" incluindo o Reparo (p. 7). O tutorial trata o Reparo como Missão, como a p. 7 e a Ação Bônus Realocar ("4 Missões (incluindo Reparar)", p. 14).
- L12. "Reparo" e "Reparar" (p. 4, 14): mesmo espaço; o tutorial usa "Reparo".

### 4.10 Erros comuns
Não houve fonte independente consultada sobre erros frequentes. Os blocos [!atencao] marcam regras em que a própria redação do manual dá ênfase (maiúsculas ou destaque): Marujo devolvido não pula de novo (p. 7, "NÃO PODEM"), Tempestade reduz movimento (p. 8), Fragata manda TODOS ao Reparo (p. 15).

## 5. Divergências entre edições

Não avaliadas: o manual original em inglês não foi aberto. A página da Meeple BR lista "28 Cartas de Capitão e Tripulação", o que confere com as 4 de Capitão e 24 de Tripulação da p. 2.

## 6. Plano instrucional

Classes de tarefa, da mais simples à completa: (1) montar a mesa; (2) escolher a Ordem e gerir Marujos no Timão; (3) navegar e cumprir Pilhar, Negociar, Buscar, Recrutar, Esconder-se; (4) atacar e subir de Lenda; (5) Ações Bônus, enterrar, Linha de Navios, Fragata e fim. Dependências: R19 a R23 vêm antes da navegação (o Cordame depende do Timão); dano (R34) depende das Missões; Enterrar (R43) depende das Ações Bônus (R40); a Fragata depende da Linha (R45) e do número de Tesouros.

Em cada etapa: [!entender] (apoio), [!passos] (procedimento no ponto de uso), [!mais] para casos que não ocorrem em todo turno, exemplo resolvido, complete, sua vez e, nas etapas 2 e 4, treino rápido (contagem de Marujos para pular e contagem de dano, onde o erro é mais provável). Adiado do "Comece": volta dos Marujos do Timão, detalhes das Ordens, combate, Ações Bônus da Tripulação, Fragata. Limite: um texto não observa o leitor.

**Ponto fraco conhecido do "Comece":** Atacar pode acontecer no primeiro turno, se um Navio Mercante estiver ao alcance, mas só é citado e remetido à etapa 4, para caber nos 800 palavras.

## 7. Extensão

8.295 palavras por `wc -w` (inclui marcação, opções e explicações das perguntas). Texto de leitura (sem opções, explicações e figuras): 6.124; sem a folha de consulta e as fontes: 5.727. Fica no limite superior do alvo; o jogo tem 6 Ordens, 4 Missões, 2 tipos de combate, 8 Ações Bônus e a movimentação dos navios neutros.

## 8. Contas

Script `.../scratchpad/tinyepic/pirates_scripts/contas.py` (fora do repositório). Resultados usados:

- Comece: Ouro 1 + 3 = 4; movimento 1 + 1 = 2; sem Cordame, 1; cubos 1 + 2 = 3.
- Timão: do 2 ao 5 com Marujo no 3: 1 Marujo (o 4). Do 5 ao 1: 0, cruza. Do 4 ao 2: 2 (5 e 1), cruza. Do 3 ao 0: 2. Do 5 ao 2: 1. Do 0 ao 5: 4. Do 4 ao 1: 1 (o 5), cruza.
- Mercado: Rum 5, Cana 4, Pólvora 3, Café 2; vender 2 Cana = 8; Ouro 7 + 8 = 15, limitado a 13; tabela vira Rum 5, Pólvora 4, Café 3, Cana 2; depois 3 Café = 9. Rum a 5, 3 cubos = 15.
- Movimento: Pirata 2 + Cordame 2 = 4; tirando do Cordame, 3. Corsário 3 + 1 = 4.
- Dano (símbolos 5, 6, 6; Canhões 1): rolagem 6 e 2 = 3; mudando 2 para 6 = 5 (afunda o de 4); para 5 = 4 (empate). Treino: 6 e 6 = 4; 3 e 4 com 2 Canhões = 2.
- Enterrar: 9 - 8 = 1. Fragata: 0/1/2/3 Tesouros = 2/3/4/5.

## 9. Portões automáticos

- Travessão e meia-risca no tutorial: 0.
- `tools/vicios.py` (função `avisos`) sobre o texto inteiro: nenhum aviso.
- `python3 tools/checar_comece.py docs/como-jogar/tiny-epic-pirates/tutorial.md`: ✅ (dentro de 800 palavras de leitura).
- Exclamação fora das marcas: nenhuma.
- 40 perguntas de múltipla escolha, cada uma com uma só opção certa e explicação com página.
- Legibilidade (Flesch adaptado): não medido; a implementação citada no prompt não está neste repositório.

## 10. Dados do `conteudo/como-jogar/tiny-epic-pirates.json`

Jogadores (1 a 4), duração (30 a 45 min) e idade (14+): página do produto Meeple BR, lida em 01/11/2026. Edição: Meeple BR (manual, p. 16). Etapas: 5. Resenha: nenhuma no site. `leitura_min`: 31 (6.124 palavras de leitura a 200 por minuto). `"publicar": false` até a auditoria independente.
