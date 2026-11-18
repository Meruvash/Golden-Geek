# Pesquisa: Robinson Crusoe CE, inserts existentes e sleeves Bucaneiros (18/11/2026)

O que foi conferido e onde. "Declarado" quer dizer que o número aparece na fonte. "Estimado" quer dizer que é conta
nossa e precisa ser medido.

## Caixa, tabuleiro e cartas

- **Caixa da CE**: 33 x 33 x 14 cm, declarado pela Portal e provavelmente medida externa.
  Fonte: https://en.portalgames.pl/robinson-crusoe-collectors-edition-update-25/.
  - Varejo: 13 x 13 x 5,12 pol (https://qmdirect.com/products/pg24011).
  - Medida interna: não publicada.
- **Tabuleiro**: tamanho dobrado, espessura e número de dobras não foram publicados. O "720 x 520 mm" que aparece numa
  listagem da Amazon não foi confirmado (pode ser o playmat). Playmat de neoprene: pelo menos 113 x 53 cm.
- **Cartas** (contagem do varejo, https://www.miniaturemarket.com/robinson-crusoe-collectors-edition-plg24011.html):
  - Grandes: Evento 73, Mistério 52, Naufrágio 3, Aventura 90.
  - Pequenas: Invenção 30, Equipamento inicial 8, Fera 16.
  - Gamefound acrescenta +30 Aventura, +10 Evento e Moral Dramática.
- **Tamanho das cartas grandes**: entre 57 x 89 e 59 x 92, conforme a tiragem (sleeveyourgames 9176, 2024, 2039 e 2029).
  As pequenas medem 44 x 68. O kit Boardgame Protectors da CE usa 57,5 x 89 e 45 x 68; o kit Sleeve Kings usa 59 x 92 e
  45 x 68.
- **Mistérios (Mystery Tales)**: Aventura 60, Mistério 24, Personagem 9, Nativo 2, Evento 82, Naufrágio 3, Condição 8,
  Cultista 10, Invenção 3, Insanidade 27, Guia 1, Equipamento 17, Covil 5, Condenado 9
  (https://www.coolstuffinc.com/p/253982).
- **Reclamações de encaixe**:
  - O insert de fábrica da CE é "slightly undersized for sleeved cards" (BGG, thread 3249455).
  - js500: os Mistérios não cabem com sleeve.
  - Sortirus: tampas com 0,2 mm de folga.

## Inserts analisados

| Projeto | Edição | Onde fica o tabuleiro | Sleeves | Mesa |
|---|---|---|---|---|
| js500 (Printables 953093), o seu zip | CE | não cabe, pensado para o playmat; com tabuleiro a tampa levanta | Gamegenic Prime 62x94 | bandejas de jogo separadas das de setup; descarte com 6 poços |
| Sortirus "ALL IN" (Printables 1044745 / MakerWorld 791295) | CE + Mistérios | deitado por cima do Setup_Holder | 70 µm, tampas com 0,2 mm de folga | porta-cartas com tampa |
| PengLord (Printables 877306 / Thingiverse 6619070) | CE | torre-vulcão no fundo; cerca de 13 mm de tampa levantada | "sleeved" | — |
| Alfred Wayne (MakerWorld 393410) | CE | fora (playmat) | — | porta-cartas e divisórias |
| Spinodal_Zeugma (Printables 249542-249548) | 2ª ed. + CE | divisória de caixa | luvadas, com folga para as cartas extras da CE | Mistério com descarte embutido |
| Folded Space FS-ROB | 2ª ed. | camada plana por cima (tabuleiros, fichas, manual), sem levantar a tampa | até 100 µm | bandejas usadas na partida |
| Feldherr | 2ª ed. | camada plana; insert de 67 mm em caixa de 71 mm | até 68x95 e 48x73 | 6 de 7 bandejas vão para a mesa |
| e-Raptor | 2ª ed. + Mistérios | por cima; um comprador relata tampa levantada | luvadas | — |
| TLAMA / KALKARED | 2ª ed. | por cima; a caixa fecha | 80 µm; poços de 63,5x95 e 49,5x72 | caixas de fichas com tampa |
| PlasticNinjas (Printables 190326) | 2ª ed. | — | — | tampas com ímãs de 4x2 mm |

Os STLs dos outros projetos não foram baixados: Printables e Thingiverse bloqueiam download automático. A análise usou
as descrições e os comentários públicos.

O padrão que funcionou em todos os inserts que guardam o tabuleiro sem levantar a tampa: **topo plano numa altura fixa e
a camada plana por cima**. É o que este gerador faz, com a altura calculada e conferida.

## Sleeves Bucaneiros

- A Bucaneiros só informa o tamanho da **carta** que cada sleeve comporta. Nas palavras dela: "As dimensões presentes na
  descrição do sleeve são das cartas que ele comporta, portanto o sleeve é um pouco maior"
  (https://www.bucaneirosjogos.com.br/sleeves-tradicionais).
- A medida externa não foi publicada. Usamos carta + 2,5 x 3,0 mm, que é estimativa; um usuário da Ludopedia relata 2 a
  3 mm a mais.
- **Espessura do Premium**: 100 µm, "70% mais espesso" que o comum, segundo o revendedor
  https://www.caixinhaboardgames.com.br/produtos/sleeve-bucaneiros-premium-yu-gi-oh/. Daí a estimativa de ~60 µm para
  o comum.
- **Para o RC**: as cartas grandes usam **PADRÃO EURO 59x92**. CHIMEURO 59x91 só serve se a sua carta tiver 91 mm ou
  menos. CHIMERA 57,5x89 só serve para carta de até 57,5 mm. As pequenas usam **MINI EURO 45x68**.

## Sortirus "ALL IN": STLs medidos (zip do MakerWorld 791295, recebido em 18/11/2026)

São 19 peças, todas medidas aqui com ray-casting nos STLs. A `Setup_Holder.stl` tem a malha **aberta** (não fechada).
O fatiador costuma consertar, mas é um aviso.

**Porta-cartas.** As cartas ficam **em pé**, com o lado maior na vertical, dentro de armações vazadas com 92,8 mm de
altura. A carta luvada de 95 mm passa uns 3 mm da borda.

| Peça | Poço (largura x fundo) | Medido |
|---|---|---|
| Cards_Adventure_Holder (3 poços) | **61,6** x 20,4 mm | passo 63,2 e divisória 1,6 |
| Cards_Adventure_Holder_Companion_Pack (3 poços) | 61,6 x 12,8 mm | |
| Cards_Adventure_Holder_Mystery_Tales (3 poços) | 61,6 x 10,4 mm | |
| Cards_Mystery_Holder (1 poço) | 61,6 x 43,6 mm | |
| Cards_Beast_Invention_Equipment_Holder (pequenas) | **48,0** x 48,0 mm | |

Fundo de 20,4 mm para 40 cartas dá cerca de **0,51 mm por carta luvada**, perto dos nossos 0,475.

**Conclusão sobre sleeves.** O poço de 61,6 mm só aceita sleeve de até ~61,6 mm de largura, ou seja, zero de folga
com o Bucaneiros Padrão Euro (estimado em 61,5). Se o Bucaneiros real tiver 62 mm, **não entra**. As pequenas têm 48,0
mm contra 47,5 do Mini Euro, só 0,5 mm de folga. O projeto foi feito para sleeve de 70 µm e mais estreito; o autor
avisa que as tampas têm 0,2 mm de folga.

Os nossos poços (64 x 97,5 deitado e 50 x 73,5) têm 2,5 mm de folga em cada medida.

**Altura da caixa.** A peça mais alta do Sortirus, `Setup_Mystery_Tales_Holder`, tem **126,4 mm**. Se ela vai em pé
dentro da caixa, a altura interna é de **pelo menos 126,4 mm**. Nós estimamos 134; a medida real decide quanto sobra
para o tabuleiro em cima do nosso topo de 104 mm:

| Altura interna | Espaço para o tabuleiro |
|---|---|
| 128 | 24 mm |
| 134 | 30 mm |

**Tabuleiro.** Fica deitado sobre o `Setup_Holder` (246,4 x 231,2 x 83,6 mm), com até ~43 mm livres acima dele se a
caixa tiver 126,4 mm por dentro.

**Ideias que valem para o nosso gerador:**
- paredes e tampas em treliça (menos filamento e menos peso para levar à mesa);
- peça de "setup" separada das peças de jogo;
- divisórias soltas para os maços;
- tampa de fichas por cima (7,2 mm) em vez de embutida.

## js500 original: projeto completo com o código OpenSCAD (Printables 953093, recebido em 18/11/2026)

São 19 STLs, 19 arquivos `.scad` e um PDF com a descrição. Os números abaixo estão **escritos no código do autor**.

- **O seu zip é o remix do Alex Hooper.** Ele tirou 4 bandejas do js500: aventura base, aventura dos pacotes do app
  (x3), mistério e praia/traços/moral. No lugar, pôs as 4 peças dos Mistérios. O `obj_7` e o `obj_18` que faltavam no
  seu zip são, muito provavelmente, as bandejas de carta de aventura e de mistério.
- **Bandejas de jogo** (aventura base, aventura do app x3, mistério): carta **deitada**, poço de **62 x 93 mm**, passo
  de 89,6 mm entre os montes, igual ao espaçamento do playmat. É o mesmo conceito das nossas bandejas de mesa.
- **Bandejas de guarda** (eventos/naufrágio, praia/traços/moral): carta **em pé**, poço de **93 mm** de comprimento.
- **Cartas pequenas**: invenções com 74 mm, feras deitadas em 50 x 72 mm, descarte de feras com 50 x 18,6 mm.
- **Livro de Aventuras**: fica preso pelo `discard-holder-and-spacer`, que tem um degrau a 51 mm e um recorte para a
  espiral a 42 mm. Esse mesmo suporte é o descarte com 6 poços (3 de 69 x 32,6 e 3 de 69 x 27,2 mm).
- **O que o autor declara**: sleeves premium (Gamegenic Prime nas fotos), "no lid lift" **com o playmat**. O tabuleiro de
  papelão faz a tampa levantar. Não comporta miniaturas, torre-vulcão, Voyage of the Beagle nem Mistérios.
- **Folga máxima, deduzida dos poços**: a carta grande luvada pode ter no máximo **62 x 93 mm**, e a pequena no máximo
  ~50 x 72 mm. Contra os sleeves Bucaneiros (medidas externas estimadas):

| Sleeve Bucaneiros (carta) | Externo estimado | Poço js500 62 x 93 |
|---|---|---|
| CHIMERA (57,5 x 89) | 60 x 92 | cabe, com 1 mm de folga no comprimento |
| PADRÃO EURO (59 x 92) | 61,5 x 95 | **não cabe: faltam 2 a 3 mm no comprimento** |
| PADRÃO (63,5 x 88) | 66 x 91 | **não cabe: faltam ~4 mm na largura** |
| MINI EURO (45 x 68) para as pequenas | 47,5 x 71 | cabe |

- **Tamanho provável da carta**: o kit de sleeves da Boardgame Protectors para a Edição de Colecionador usa **57,5 x 89**
  e 45 x 68, e o poço de 62 x 93 do js500 também aponta para uma carta perto de 57,5 x 89, não 59 x 92. Falta
  confirmar com régua.
