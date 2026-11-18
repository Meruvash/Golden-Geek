# insertgen: inserts de caixa em STL, com medidas exatas e validação

Gerador paramétrico de organizadores (inserts) para caixas de jogo. Você descreve a caixa, as cartas, os sleeves e
o que vai deitado por cima (tabuleiro, fichas, manual). O `gerar.py` monta as peças e só entrega STL que passou em
todas as checagens:

- **Malha fechada e orientada**: toda aresta tem par, o volume é positivo e não há triângulo degenerado. A checagem é
  feita no sólido e de novo no arquivo gravado, relido do disco.
- **Medida exata**: o tamanho gerado precisa bater com o declarado com tolerância de 0,01 mm. A peça fica apoiada em
  z = 0 e precisa caber na mesa da impressora (256 x 256 mm por padrão).
- **Parede mínima**: a checagem procura, fatia por fatia, qualquer parede mais fina que `parede_min` (1,2 mm). Foi ela
  que pegou o primeiro rebaixo de tampa, que estava com 1,0 mm.
- **Cartas cabem**: cada maço luvado é modelado como um bloco (sleeve x quantidade x espessura). Esse bloco não pode
  tocar o plástico nem passar da borda da bandeja.
- **Montagem**: nenhuma peça pode sair da caixa nem se sobrepor a outra. Peça empilhada precisa de pelo menos 60% da
  base apoiada. O volume do tabuleiro e da camada plana tem que ficar livre até a tampa.

Se qualquer checagem falhar, o comando termina com código 1 e lista o problema.

```
pip install -r tools/inserts/requirements.txt
python3 tools/inserts/gerar.py                    # gera tools/inserts/saida/robinson-crusoe-ce/
python3 -m unittest discover -s tools/inserts/tests -t tools/inserts
python3 -I tools/inserts/analisar_original.py insert.zip   # diagnostica um insert pronto
```

## Robinson Crusoe — Edição de Colecionador, com sleeves Bucaneiros

### O problema no insert original

O zip enviado é o insert **js500** (Printables 953093) mais o remix com Mistérios (Mystery Tales). O `analisar_original.py`
mede os poços de carta direto nos STLs:

| Bandeja original | Poço | Carta grande em Bucaneiros Padrão Euro | Resultado |
|---|---|---|---|
| `obj_5_cards-events-and-wreckage` | 93,0 mm | 95,0 mm (+1 de folga = 96) | **não cabe: faltam 3,0 mm** |
| `obj_6_Mystery Tales Cards` | 94,8 mm | 95,0 mm | **não cabe: faltam 1,2 mm** |
| `obj_8_cards-inventions...` (pequenas) | 74,0 mm | 71,0 mm (Mini Euro) | cabe |
| `obj_9_cards-beasts` (pequenas) | 50,0 mm | 47,5 mm | cabe |

O próprio autor do js500 diz que o projeto é para o **playmat de neoprene** e que o tabuleiro de papelão só cabe se a
tampa ficar levantada. Por isso o original também não tem espaço para o tabuleiro.

### A solução

Ficam as 10 bandejas de componentes do original, que não têm cartas e funcionam bem: personagens, peças de mapa, abrigo,
recursos, dados, fichas, miniaturas e as 3 bandejas de Mistérios. **Todas as bandejas de carta saem do gerador**,
dimensionadas pelo sleeve, junto com as caixas com tampa que completam os vãos. O topo do insert fica plano a
**104 mm**, e o espaço de 104 mm até a tampa fica reservado para a **camada plana**: tabuleiro dobrado, fichas de
cenário, fichas de personagem e manual.

![montagem](saida/robinson-crusoe-ce/montagem.png)

**Portabilidade (tirar da caixa, jogar e guardar)**

- Cada maço vai **deitado** numa bandeja que serve de monte na mesa. Ela tem entalhe de dedo nas duas laterais para
  pinçar o maço e um furo no fundo para empurrar as cartas por baixo.
- **Eventos** tem o poço de compra e o de descarte na mesma peça.
- As bandejas de meia altura (26 mm) empilham. O fundo da bandeja de cima é a tampa da de baixo, e as duas saem juntas
  da caixa.
- As caixas de fichas têm **tampa embutida**, rente à borda, com furo de dedo. Viajam fechadas e empilham sem prender.
- Na hora de guardar, as peças entram em dois níveis de 52 mm (a planta acima diz o lugar de cada uma) e o tabuleiro vai
  deitado por cima.

**Como as cartas cabem**

- O poço é **sleeve + 1,25 mm por lado**:
  - cartas grandes em Bucaneiros Padrão Euro: 61,5 x 95 → poço de 64 x 97,5;
  - cartas pequenas em Mini Euro: 47,5 x 71 → poço de 50 x 73,5.
- A espessura usada é carta 0,32 mm + 2 x 60 µm de sleeve, mais 8% de ar. A capacidade de cada poço sai no
  `relatorio.json`.
- Quem usa sleeve **Premium** (100 µm) só precisa trocar `"usar": "padrao-premium"` no JSON. O gerador refaz as
  bandejas e acusa se algum maço deixar de caber.

**Como os outros inserts guardam o tabuleiro** (detalhes em [PESQUISA.md](PESQUISA.md))

- Folded Space, Feldherr e e-Raptor (2ª edição) deixam o tabuleiro e as fichas **deitados por cima das bandejas**, com
  a tampa fechando rente. Feldherr: insert de 67 mm numa caixa de 71 mm.
- Sortirus (CE): "map on the top of Setup_Holder".
- js500 e Alfred Wayne (CE) contam com o playmat e deixam a tampa levantar.
- PengLord (CE) põe a torre-vulcão por baixo e aceita cerca de 13 mm de tampa levantada.

Nenhum desses projetos publica a altura reservada para o tabuleiro. Aqui ela é um número: o gerador soma a camada
plana declarada, reserva esse volume e falha se alguma peça invadir.

### Antes de imprimir: meça 5 números

Ninguém publicou estes dados. Os valores em `projetos/robinson-crusoe-ce.json` estão marcados `"status": "estimado"`.

1. **Caixa por dentro**: largura, profundidade e altura útil com a tampa fechada. O padrão é 320 x 320 x 134. Pela
   Portal a caixa tem 33 x 33 x 14 cm por fora, e o insert original ocupa 318,4 mm.
2. **Camada plana**: espessura do tabuleiro dobrado + fichas de cenário + fichas de personagem + manual. O padrão é
   28 mm, e cabem até 30 mm se a altura interna for 134.
3. **Sleeve Bucaneiros**: largura e altura por fora, medidas num sleeve com carta dentro. Preencha `"medido"` em
   `dados/sleeves_bucaneiros.json`, porque a Bucaneiros só informa o tamanho da carta.
4. **Carta**: tamanho e espessura. Meça 10 cartas empilhadas e divida por 10.
5. **Quantidade de cartas** de cada maço, sobretudo as dos Mistérios: as fontes divergem sobre quais são pequenas.

Depois rode `gerar.py` de novo. Se algo deixar de caber, ele diz o que e por quanto.

### O que imprimir

Arquivos em `saida/robinson-crusoe-ce/` (1 de cada):

- **19 STLs novos**: bandejas de carta, caixas com tampa e as tampas.
- **10 bandejas originais**, que continuam valendo: `obj_3`, `obj_11` a `obj_17`, `obj_19` e `obj_20`.
- **Não imprima mais** os originais `obj_1`, `obj_2`, `obj_4`, `obj_5`, `obj_6`, `obj_8`, `obj_9`, `obj_10` e `obj_21`.
  As novas peças substituem todos eles.

Impressão:

- Todas as peças saem na orientação de impressão, com a boca para cima. Nenhuma precisa de suporte.
- PLA ou PETG, camada de 0,2 mm, 3 perímetros.

`relatorio.json` traz as medidas, os poços, o tamanho de cada maço e a posição de cada peça na caixa; `pecas.png` mostra
a vista 3D das peças novas.

## Estrutura

```
insertgen/geom.py      primitivas (caixa arredondada, cavidade em concha, entalhe de dedo)
insertgen/cartas.py    sleeves (catálogo Bucaneiros), carta luvada, altura do maço
insertgen/pecas.py     bandeja de baralhos, bandeja de fichas com tampa, calço
insertgen/validar.py   malha, medidas, parede fina, conteúdo cabe, montagem
insertgen/previa.py    planta, corte e vista 3D (PNG)
insertgen/stl.py       STL binário só com numpy
projetos/              um arquivo .py (layout) + .json (medidas) por jogo
dados/                 catálogo de sleeves
```

Para outro jogo, copie `projetos/robinson_crusoe_ce.py` e o JSON dele, troque as medidas e o layout e aponte o
`gerar.py` para o novo projeto.
