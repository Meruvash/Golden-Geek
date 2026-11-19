# Dossiê: Como jogar Duna: Imperium Uprising

Pedido direto do editor (19/11/2026). Jogo: *Dune: Imperium Uprising* (Dire Wolf, 2023; na caixa, com um traço entre "Imperium" e "Uprising"), publicado no Brasil pela Galápagos (Asmodee Brasil), SKU DUN101. O nome da edição brasileira é **Duna: Imperium Uprising** (com um traço antes de "Uprising"), sem tradução do subtítulo: é assim que aparece no livro de regras (p. 2, 6 e 19) e no item da Biblioteca de Downloads ("Duna: Imperium - Uprising"). Não existe "Insurreição" em nenhum material oficial consultado. Como o padrão proíbe travessão e meia-risca, o tutorial escreve **Duna: Imperium Uprising**. O tutorial ensina 3 e 4 jogadores; 2 jogadores (um Rival) com passo a passo curto; solo e 6 jogadores só em resumo, remetendo aos folhetos.

## 1. Fontes

| Fonte | Versão e dados | Onde | Data |
|---|---|---|---|
| **Livro de regras da edição brasileira** (fonte das páginas citadas). Galápagos; tradução de João José Góis, revisão de Fábio Gullo e Gabriel Novaes, diagramação de Tati Hapanchuk; © 2025 Dire Wolf Digital, "v1.0" (p. 19) | `DUN101_regras_v1.0.pdf`, 20 páginas quadradas (823 x 824 pt), InDesign 20.0, criado em 18/03/2025, modificado em 01/08/2025, 219 MB, com camada de texto | Biblioteca de Downloads da Asmodee Brasil, item 2938 "Duna: Imperium - Uprising - SKU: DUN101", etiqueta Regras, pela API pública que a página usa: https://api-prd.mundogalapagos.com.br/library-download/store/file?id=2938&tagId=2&group=b2c (ZIP de 218 MB, HTTP 200, sem login; sha256 do ZIP `55e1ac6a…a0a522`) | Baixado e lido em 19/11/2026 |
| **Folheto Rivais: Partidas Solo & com 2 Jogadores** (mesmo ZIP) | `DUN101_regras-rivais_v1.0.pdf`, 4 páginas, criado em 15/10/2024 | idem | 19/11/2026 |
| **Folheto Partidas com Seis Jogadores** (mesmo ZIP) | `DUN101_regras-6jogadores_v1.0.pdf`, 8 páginas, criado em 05/11/2024, modificado em 04/08/2025 | idem | 19/11/2026 (lidas as p. 1 a 5) |
| Item 2931 da mesma biblioteca ("Duna: Imperium - Uprising", etiquetas Regras, Ilustração, Conteúdo da caixa, Extras) | `store/file?id=2931&tagId=2|5|6` respondeu 404 "The specified blob does not exist" | mesma API | 19/11/2026, inacessível |
| **Board Space Guide** (Dire Wolf, em inglês), nas p. 1 e 2 do *Rules Supplements*. O folheto brasileiro "Guia dos Espaços no Tabuleiro" vem na caixa (p. 3), mas não está na biblioteca nem na página de recursos da Dire Wolf (que só tem o do jogo de 2020 em português) | `DUNE_IMPERIUM_UPRISING_Rules_Supplements_23-10-12.pdf`, 14 páginas | https://d19y2ttatozxjp.cloudfront.net/pdfs/DUNE_IMPERIUM_UPRISING_Rules_Supplements_23-10-12.pdf, linkado em https://www.direwolfdigital.com/dune-imperium/resources/ | 19/11/2026 |
| Rulebook original em inglês, para comparar | `DUNE_IMPERIUM_UPRISING_Main_Rulebook_23-10-12.pdf`, 20 páginas | mesma página de recursos | 19/11/2026 |
| FAQ e errata oficiais (Dire Wolf, em inglês), "Last Updated January 13, 2025"; cobre também o Uprising (o manual remete a ele, p. 18) | `DUNE_IMPERIUM_FAQ_25-1-13.pdf` | https://d19y2ttatozxjp.cloudfront.net/pdfs/DUNE_IMPERIUM_FAQ_25-1-13.pdf | 19/11/2026 |
| Página do produto na loja oficial da Dire Wolf: "Uprising is a stand-alone sequel" (confirma que é jogo independente) e fotos | https://shop.direwolfdigital.com/products/dune-imperium-uprising (e `.json`) | 19/11/2026 |
| Vídeo do topo | "DUNA IMPERIUM UPRISING - Gameplay resumida", canal Duque Board Games (título e canal pelo oEmbed oficial) | https://www.youtube.com/watch?v=uBu_GEwtdX4 | Achado na busca do próprio canal (`/@DuqueBoardgames/search?query=uprising`, com Accept-Language pt-BR) em 19/11/2026 |

**Como os arquivos foram obtidos.** Todo acesso com `curl` e User-Agent `EliteBoardgamersBot/1.0 (robo editorial; +https://eliteboardgamers.com.br)`. A busca da API da biblioteca (`library-download/store/search?term=uprising`) listou os itens 2931 e 2938. O `www.asmodee.com.br` e o `galapagosjogos.com.br` respondem 403 ao nosso User-Agent (inclusive no robots.txt); não troquei o User-Agent nem procurei outro caminho. O robots.txt da Dire Wolf só bloqueia `/includes/404`; o da loja (Shopify) libera páginas de produto; o do YouTube bloqueia `/results`, não a busca do canal nem o oEmbed.

**Texto extraído** (scratchpad, fora do repositório): `/tmp/claude-0/-home-user/6a4d6f51-afb4-5576-b0bf-e2035e13b944/scratchpad/d1119/dune-imperium-uprising/txt/`: `pN.txt` (com `-layout`) e `rN.txt` (sem layout) do livro, p. 1 a 20; `rivais_pN.txt`/`rrN.txt` (folheto Rivais, 1 a 4); `seis_pN.txt`/`ssN.txt` (folheto de 6, 1 a 8). Inglês em `.../en/` (`mainN.txt`, `supN.txt`, `faq.txt`, `faq_l.txt`). PDFs em `.../dl/` (o ZIP descompactado em `.../dl/z/`). Páginas em PNG em `.../img/` (90 dpi, todas) e `.../hi/` (200 e 220 dpi, p. 4 a 16 e folheto Rivais p. 1); o tabuleiro montado das p. 4 e 5 foi costurado em `.../hi/board.png` para ler os nomes e custos dos espaços.

**Dados do topo (JSON).** "1 a 6 jogadores": solo e 2 jogadores pelo folheto Rivais, 3 e 4 pelo livro (p. 5 e 14), 6 pelo folheto Seis. **Duração e idade não estão no manual nem na página da Dire Wolf ou da loja**, e a página da Galápagos/Asmodee está bloqueada para robô; não há resenha do Uprising no site. Para não inventar, o JSON diz "duração não informada" e "idade não informada": **ponto para o editor completar com a caixa**. "resenha": null (não há `conteudo/dune-imperium-uprising.json` nem pasta da resenha).

## 2. Procura (autocompletar, 19/11/2026)

- Google, "como jogar dune imperium uprising": a própria frase. "dune imperium uprising": "…brasil", "…vs dune imperium", "…manual", "…ludopedia".
- YouTube, "como jogar duna imperium uprising": corrige para "como jogar dune imperium uprising"; "dune imperium uprising": "…como jogar", "…regras", "…solo".

A descrição do JSON cita "Dune: Imperium Uprising" entre parênteses, como muita gente procura.

## 3. Glossário (nomes da edição brasileira)

Os termos que já existiam no jogo de 2020 (Agente, Líder, Anel do Sinete, Turno do Agente/de Revelar, caixa do Agente/de Revelar, Persuasão, adquirir, Linha Imperial, Baralho Imperial, guarnição, estoque, banco, Conflito, Trilha de Combate, recompensa, controle, Influência, Aliança, Intriga de Trama/Combate/Fim de Jogo, Fabricante, especiaria bônus, as cinco fases) foram conferidos de novo neste manual e são os mesmos (p. 6 a 15 e 20). Novos ou mudados:

| Termo no manual brasileiro | Original | Página | Uma linha |
|---|---|---|---|
| Espião; posto de observação | Spy; observation post | p. 3, 9, 11, 20 | Peça do jogador (3) e o círculo com olho, ligado a espaços |
| Infiltrar; Adquirir Inteligência; Chamar Espião | Infiltrate; Gather Intelligence; Recall Spy | p. 11 e 20 | Os usos de um Espião |
| ícone de Agente Espião | Spy Agent icon | p. 9 e 11 | Oitavo ícone; manda o Agente a espaço ligado ao seu Espião |
| unidade; verme da areia; convocar | unit; sandworm; summon | p. 10, 12, 20 | Tropas e vermes; verme vale 3 e vai direto ao Conflito |
| Ganchos de Criador | Maker Hooks | p. 3, 10, 20 | Requisito para convocar verme; pega-se em Sietch Tabr |
| Muralha-Escudo; ícone de explosão | Shield Wall; detonation | p. 3, 4, 10, 20 | Protege Arrakina, Refinaria e Bacia Imperial dos vermes |
| Duplicação de Recompensa pelo Verme da Areia | Sandworm Reward Doubling | p. 14 | Verme no Conflito dobra recompensa |
| ícones de batalha: Dagacris, Rato-Canguru, Ornitóptero; curinga | battle icons: Crysknife, Desert Mouse, Ornithopter | p. 14 e 20 | Par vira 1 Ponto de Vitória |
| Carta de Objetivo | Objective card | p. 3, 5, 14 | Define o Primeiro Jogador e traz ícone de batalha |
| Prepare o Caminho; A Especiaria Deve Fluir | Prepare the Way; The Spice Must Flow | p. 3, 4, 13 | As duas pilhas da Reserva |
| Conselho do Landsraad | Landsraad Council | tabuleiro, p. 4 | A faixa verde dos espaços do Landsraad |
| Módulo CHOAM; contrato (Colheita, Imediato) | CHOAM Module; contract (Harvest, Immediate) | p. 16 | Miniexpansão opcional |
| Rival; Cartas da Casa Hagal; Plano | Rival; House Hagal cards; Plan | Rivais | Oponente automático do solo e de 2 jogadores |
| Comandante; Aliado | Commander; Ally | Seis | Papéis do modo de 6 |
| Ficha Feyd | Feyd token | p. 3 e 17 | Só com o Líder Feyd-Rautha |

**Nomes dos espaços** (lidos no tabuleiro impresso nas p. 4 e 5): Sardaukar, Serviço Obediente (Imperador); Paquete, Entregar Suprimentos (Guilda Espacial); Espionagem, Segredos (Bene Gesserit); Táticas do Deserto, Fremkit (Fremen); Alto Conselho, Privilégio Imperial, Espadachim, Salão da Assembleia, Angariar Apoio (Conselho do Landsraad); Envio, Aceitar Contrato (CHOAM, ícone Comércio de Especiaria); Estação de Pesquisa, Sietch Tabr, Refinaria de Especiaria, Arrakina (Cidade); Deserto Profundo, Bacia Hagga, Bacia Imperial (Fabricantes). Observação: a p. 7 escreve uma vez "Salão de Oratória" (nome do jogo de 2020) para o Salão da Assembleia; o tutorial avisa.

## 4. Base de regras

Classificação: V = verificada nesta sessão; I = interpretada; L = lacuna. "Guia" = Board Space Guide em inglês (Rules Supplements p. 1 e 2), conferido com o tabuleiro impresso no manual brasileiro.

**Objetivo e fim**
- O1. PV sobem e descem na Trilha de Pontuação; ao fim de uma rodada, 10 PV ou Baralho de Conflito vazio encerram; mais PV vence. [BR p. 6 e 15] V
- O2. Fim de Jogo: primeiro as Intrigas de Fim de Jogo; desempate: especiaria, Solari, água, tropas guarnecidas. [BR p. 15] V
- O3. Baralho de Conflito com 10 cartas: no máximo 10 rodadas (9 no modo de 6). [BR p. 4; Seis p. 2] I (contagem direta)

**Preparação** [BR p. 4 e 5]
- P-A. Tabuleiro com o lado mostrado para cima; Muralha-Escudo abaixo da Refinaria de Especiaria (A1); 4 Alianças nas trilhas (A2). V. O verso é do modo de 6 [Seis p. 2] V
- P-B. Conflito: 4 de III embaixo, 5 de 9 de II, 1 de 3 de I em cima; 10 cartas; as outras (6) voltam sem olhar. V (6 = conta)
- P-C. Intriga embaralhada (C1); Imperial embaralhado com 5 abertas (C2); Reserva em duas pilhas: Prepare o Caminho e A Especiaria Deve Fluir (C3); sem CHOAM, ignorar as cartas marcadas. V
- P-D. Líder escolhido ou sorteado; Shaddam Corrino IV só com CHOAM; na primeira partida, Líder de um ícone. V. Não usar dois Líderes da mesma Casa, para experiência temática [BR p. 2] V. O manual não diz quais Líderes têm um ícone: L (o tutorial não lista).
- P-E. Baralho inicial de 10, embaralhado, à esquerda do Líder; conteúdo igual ao de 2020. [BR p. 3 e 5] V
- P-F. 1 água cada; banco com Solari, especiaria, água, vermes (madeira, plástico ou ambos) e 4 Ganchos de Criador; "teoricamente infinitos". V
- P-G1 a G6. 2 Agentes no Líder, Espadachim perto do tabuleiro; disco de Pontos no 1 com 4 jogadores, 0 nos outros casos; marcador de Combate no 0; 4 cubos no primeiro espaço das trilhas; 3 tropas na guarnição mais próxima; o resto no estoque (inclui Espiões, conforme o quadro "Já jogou", p. 5). V
- P-H. Objetivos: remover os "1-3J"/"4/6J" incompatíveis; cada um compra um ao acaso, virado para cima; quem tiver o que mostra o marcador de Primeiro Jogador pega o marcador. V
- P-X. O que volta para a caixa: cores sem dono e cartas de Rival/Casa Hagal com 3 ou 4 jogadores. I (o manual não manda guardar; dedução da p. 3)
- P-Y. Feyd-Rautha: Ficha Feyd no espaço mais à esquerda da trilha de Treinamento; Lady Jessica começa com esse lado. [BR p. 17] V

**Rivais (2 jogadores)** [Rivais p. 1 a 3]
- RV1. 2 jogadores: uma carta de Rival em comum; primeira partida: variante Rivais Simplificados (Lady Amber Metulli e Glossu "A Fera" Rabban, que não podem vencer). [Rivais p. 1 e 4] V
- RV2. Cor do Rival: cubo no primeiro espaço de cada trilha, 3 tropas na guarnição (salvo solo Mercenário), 2 Agentes no estoque, Espadachim perto do tabuleiro, 3 Espiões e 1 água. [p. 1] V
- RV3. Casa Hagal embaralhada; no solo, sem a carta Reembaralhar "2J". [p. 1] V
- RV4. 2 jogadores: Rival fica com o Objetivo Ornitóptero; os outros dois ao acaso; o Rival nunca tem o marcador e joga logo depois de quem o tem. [p. 1 e 2] V
- RV5. Turno do Rival: revela Casa Hagal, Agente no espaço se vazio, senão revela outra; ignora custos e efeitos do espaço; em espaço de Combate, envia até 2 da guarnição; nunca revela. [p. 2] V
- RV6. Combate: com unidade no Conflito, revela uma carta e soma as espadas de baixo; recebe recompensas, inclusive dobradas; contrato vira 2 Solaris. [p. 3] V
- RV7. Recursos: junta para o Espadachim, depois compra PV pela tabela. [p. 3] V (o tutorial só cita e remete ao folheto)
- RV8. Solo: 2 Rivais (Espadachim 8 ou mais na primeira), 4 dificuldades, Objetivos para todos, marcador gira entre todos. [p. 1 e 2] V

**Seis jogadores** [Seis p. 1 a 3]
- S1. Duas equipes de 3 (Comandantes Muad'Dib e Shaddam, 2 Aliados cada); verso do tabuleiro; CHOAM obrigatório; sem Conflito I; Comandantes no 4, Aliados no 1; pontuação da equipe = soma; Comandantes não têm tropas, recrutam para um Aliado. V. O resto do modo não entra no tutorial (remete ao folheto).

**Rodada e Turno do Agente** [BR p. 8 a 11]
- R1. Cinco fases; Começo: revela Conflito, compra 5; Turnos: do Primeiro Jogador em sentido horário, Agente ou Revelar, Agente opcional, depois do Revelar os turnos são pulados. V
- A1. Uma carta, um ícone, espaço não ocupado com ícone igual; custo pago antes; requisito cumprido; efeitos do espaço, da caixa do Agente e +1 de Influência em espaço de Facção, em qualquer ordem; caixa de Revelar ignorada. V
- A2. Requisitos: Privilégio Imperial (2 Imperador), Envio (2 Guilda), Sietch Tabr (2 Fremen). [p. 9] V
- A3. Seta: opcional, uma vez por turno (exceto duplicação por verme). [p. 9 e 20] V
- A4. Oito ícones, o oitavo é o Espião. [p. 9] V. Lista dos espaços por ícone: tabuleiro p. 4 e 5 V.
- A5. Tabela dos espaços: custos e efeitos lidos no tabuleiro impresso (p. 4 e 5) e conferidos no Guia em inglês. V. Pontos que só o Guia diz em texto: Alto Conselho "segunda vez em diante" (o tabuleiro mostra "2º+" com os ícones), Espadachim 8 ou 6 (o tabuleiro mostra 8 e 6), Privilégio Imperial (troca de Intriga, chamar Agente, carta), Envio (+1 em qualquer Facção, ícone "?"), Sietch Tabr (duas opções). V nos dois.
- A6. Bônus de Controle: Arrakina e Refinaria 1 Solari, Bacia Imperial 1 especiaria, para qualquer Agente que vá lá. [p. 10] V
- A7. Chamar Agente: devolve outro Agente seu, não o recém-enviado. [p. 20] V
- A8. Comprar com baralho vazio reembaralha; excluir opcional salvo custo; descartar não inclui Intriga. [p. 6 e 20] V

**Espiões** [BR p. 11 e 20]
- E1. Alocar em posto desocupado; com ícone de Agente ao lado, o posto precisa ligar a espaço desse tipo; sem Espião no estoque, chamar um antes sem efeito. V
- E2. Infiltrar: chamar Espião ligado a espaço ocupado e mandar o Agente ignorando o outro. V
- E3. Adquirir Inteligência: chamar Espião ligado ao espaço para comprar 1 carta, decidido logo após alocar o Agente, antes dos efeitos. V
- E4. Dois Espiões no mesmo espaço: efeitos diferentes. V
- E5. Ícone de Espião: espaço ligado a posto com Espião seu; não chama o Espião. V
- E6. Ícone de Espião sozinho não abre espaço ocupado. I (leitura da p. 9: o requisito do ícone e o da ocupação têm "alternativas" separadas; tutorial marca como leitura do guia)

**Turno de Revelar** [BR p. 12 e 13]
- V1. Revelar, resolver efeitos de Revelar só dessas cartas, adquirir antes/durante/depois, limpar. V
- V2. Força: tropa 2, verme 3, espada 1; sem unidade, 0; ajustar a qualquer momento (quadro "Já jogou", p. 13). V
- V3. Adquirir: Linha Imperial ou Reserva; soma e divide Persuasão; vai ao descarte; Linha reposta na hora; sobra se perde. V
- V4. Efeito ao Adquirir vale uma vez. [p. 8 e 20] V

**Conflito e Combate** [BR p. 10, 12, 14, 15, 20]
- C1. Recrutar: estoque para guarnição; sem tropas no estoque, não recruta. V
- C2. Enviar só com Agente em espaço de Combate: recrutadas no turno + até 2 unidades da guarnição; três espaços de Combate nas Facções (Paquete, Táticas do Deserto, Fremkit). V
- C3. Verme: direto ao Conflito, nunca na guarnição; requisito de Ganchos de Criador em geral; proibido em Conflito protegido pela Muralha-Escudo; explosão remove a Muralha. V
- C4. Intrigas de Combate em rodadas, passar não impede jogar depois; resolve com todos passando seguidos. V
- C5. Recompensas: 1ª, 2ª; 3ª com 4 (ou 6) jogadores; com 3 ou menos, 3ª só no empate pelo 2º. V
- C6. Empates (1º, 2º, 3º) conforme a caixa da p. 14. V
- C7. Vencedor pega a Carta de Conflito; ícones de batalha. V
- C8. Força 0 nada recebe; tropas ao estoque; vermes ao banco; marcadores a 0. V
- C9. Duplicação pelo verme; não dobra controle nem ícones de batalha; custo pode ser pago duas vezes; Influência dobrada pode ir para duas Facções (exemplo da p. 14). V
- C10. Controle: marcador substitui o do oponente; defesa de 1 tropa do estoque. [p. 10 e 20] V. Para onde vai o marcador substituído: L (o tutorial diz "o natural é voltar ao estoque do dono")
- C11. Fabricantes: Deserto Profundo, Bacia Hagga e Bacia Imperial (Erg Habbanya no modo de 6) recebem 1 bônus se sem Agente. [p. 15] V

**Facções, Intrigas, ícones de batalha** [BR p. 7, 14, 17, 20]
- F1. 2 de Influência: 1 PV (perde se cair); 4: bônus (não devolve); primeiro a 4: Aliança e PV; só quem passa mais alto toma. V
- F2. Perder a Aliança ao cair (empatado antes ou a 3 ou menos). [FAQ "Alliance"] V
- F3. 2 de Influência de escolha: mesma Facção. [p. 20] V
- F4. Intrigas: Trama no Turno do Agente ou de Revelar, Combate só no Combate, Fim de Jogo no fim; viradas para baixo, fora do baralho. V
- F5. Ícones de batalha: par com outra Carta de Conflito ou Objetivo virado para cima no estoque; vira as duas e ganha 1 PV; curinga no Fim de Jogo. [p. 14 e 20] V
- F6. Chegar a 2 de Influência abre Privilégio Imperial, Envio e Sietch Tabr; Bene Gesserit fortalece cartas. [p. 17, Dicas] V (dica oficial, usada como explicação)

**Módulo CHOAM** [BR p. 16] V (resumo). Contrato de Colheita: o texto brasileiro omite "a quantidade mostrada" que o inglês diz [orig. p. 16]; o tutorial avisa em [!edicao].

## 5. Divergências e pontos de edição

- "Salão de Oratória" (p. 7) x "Salão da Assembleia" (tabuleiro): erro de tradução herdado do jogo de 2020; avisado.
- Contrato de Colheita: BR "a especiaria que está disponível ali" x EN "the amount of spice shown"; avisado, seguir o número impresso.
- A carta Espião Mestre Imperial aparece em inglês ("Imperial Spymaster") na ilustração do manual brasileiro (p. 9); a legenda avisa.
- Guia dos Espaços: o folheto brasileiro existe na caixa, mas não foi achado para download; a tabela usa o tabuleiro brasileiro impresso no manual (nomes e números) e o Guia em inglês (texto). Nenhuma divergência de números entre os dois.

## 6. Mapa instrucional

Classes de tarefa, da mais simples à completa: montar a mesa; jogar um Turno do Agente com as cartas iniciais (seção 5 minutos); escolher espaço com custo e requisito (etapa 1); usar Espiões para entrar em espaço ocupado ou comprar carta (etapa 2); fazer o Turno de Revelar e adquirir (etapa 3); disputar o Conflito com tropas e vermes, inclusive empates e duplicação (etapa 4); fechar a partida com Influência, Alianças, ícones de batalha e desempate (etapa 5). Cada etapa: [!entender] (apoio), [!passos] (procedimento), [!mais] (casos especiais a um toque), exemplo resolvido do manual, complete e sua vez em múltipla escolha. Prática específica: força e empates (etapa 4), onde o erro de quem vem do jogo de 2020 é mais provável (3ª recompensa com 3 jogadores, que mudou). Adiado: CHOAM, solo e 6 jogadores ficam em resumo. Limite: o texto não observa o leitor.

**Extensão.** Cerca de 10.150 palavras no arquivo, 8.150 sem legendas e opções de resposta (o de 2020 tem 9.100 e 7.400 nas mesmas contas). A diferença vem da etapa dos Espiões, dos vermes/Muralha-Escudo e do bloco dos Rivais, que o pedido incluiu. Cortes já feitos: Laço Fremen, Força acima de 20, efeito de Aliança/Influência, Feyd e Jessica resumidos, exercícios repetidos.

## 7. Portões automáticos

- Travessão e meia-risca no tutorial e no JSON: 0.
- `vicios.avisos()` no tutorial e no JSON: nenhum aviso.
- `python3 tools/checar_comece.py docs/como-jogar/dune-imperium-uprising/tutorial.md`: aprovado.
- Prévia gerada no scratchpad (cópia de `tools/`, `como_jogar_md.pagina()` com `publicar` só na cópia): 25 figuras e 3 fotos aparecem, vídeo com capa, sem rolagem horizontal a 390 px; "Leitura do essencial: cerca de 16 min".
