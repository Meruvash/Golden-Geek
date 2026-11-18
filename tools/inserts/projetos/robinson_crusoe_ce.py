"""Robinson Crusoe — Edição de Colecionador: insert com cartas luvadas Bucaneiros
e espaço reservado para o tabuleiro por cima.

Camadas (z para cima):
  Nível 1 (0-52): pilha de bandejas originais (personagens/peças/abrigo), miniaturas,
                  coluna de Eventos (compra + descarte), 3 bandejas de cartas na faixa do fundo.
  Nível 2 (52-104): pilha original (recursos/dados/fichas), caixa longa, Mistérios
                  (componentes, peças, animais) + bandeja de cartas MT, 2 bandejas de
                  cartas pequenas, 3 bandejas de cartas MT na faixa do fundo.
  Camada plana (104-topo): tabuleiro dobrado, fichas de cenário/personagem, manual.
"""
import json
import os

from insertgen.cartas import Baralho, carregar_catalogo, sleeve_envelope
from insertgen.pecas import Params, bandeja_baralhos, bandeja_fichas
from insertgen.validar import Item

AQUI = os.path.dirname(os.path.abspath(__file__))
CONFIG = os.path.join(AQUI, "robinson-crusoe-ce.json")

NIVEL = 52.0  # altura de um nível (as bandejas originais de 52 mm ditam o módulo)


def carregar(config=CONFIG):
    with open(config, encoding="utf-8") as fh:
        return json.load(fh)


def montar(cfg, p=None):
    """Devolve (pecas_geradas, itens_na_caixa, reservas, contexto)."""
    p = p or Params()
    cat = carregar_catalogo()
    sl = {t: sleeve_envelope(cat, d["usar"], d["compativel_com"]) for t, d in cfg["sleeves"].items()}
    bar = {}
    for k, d in cfg["baralhos"].items():
        c = cfg["cartas"][d["tipo"]]
        bar[k] = Baralho(k, c["tamanho"], d["qtd"], c["espessura"], sl[d["tipo"]])
    B = lambda *ks: [bar[k] for k in ks]  # noqa: E731

    pecas, itens = [], []

    def add(peca, pos, rot90=0, qtd=1):
        peca.qtd = qtd
        if peca not in pecas:
            pecas.append(peca)
        it = Item(peca.nome, peca.tamanho, pos, peca.solido, rot90=rot90)
        itens.append(it)
        return it

    def orig(nome, pos, rot90=0):
        tam = cfg["originais_reaproveitados"][nome]
        it = Item("ORIGINAL " + nome, tam, pos, None, rot90=rot90, origem="original")
        itens.append(it)
        return it

    # ---------------- Nível 1 ----------------
    z = 0.0
    for n in ("obj_13_shelter-upgrades-herb-garden-pen-spyglass.stl",
              "obj_12_map-tiles-animals-misc-expansions.stl",
              "obj_11_characters.stl"):
        it = orig(n, (0, 0, z))
        z = it.caixa[1][2]
    topo_A = z                                    # 51
    A_x = cfg["originais_reaproveitados"][n][0]   # 151.2
    mini = orig("obj_3_Player Miniatures", (A_x, 0, 0), rot90=1)
    larg_mt = max(mini.tam[0], cfg["originais_reaproveitados"]["obj_20_Mystery Tales Tiles"][0])
    col_x = A_x + larg_mt                         # 249.2 (bandeja de peças MT tem 98 mm)

    eventos = bandeja_baralhos("cartas-eventos", [B("eventos"), []], p, altura=NIVEL,
                               descricao="Eventos: compra | descarte. Fica ao lado do tabuleiro na partida.")
    add(eventos, (col_x, 0, 0))
    y_cx = eventos.tamanho[1]
    larg_col = eventos.tamanho[0]
    fundo_y = 246.0  # faixa do fundo começa onde terminam as peças de 246 mm

    cx1, cx1t = bandeja_fichas("caixa-dados-extras", larg_col, fundo_y - y_cx, NIVEL, [(1, [1])], p,
                               descricao="Dados extras / dados de resina (com tampa)")
    add(cx1, (col_x, y_cx, 0)); pecas.append(cx1t)

    def single(nome, pocos, alt, desc=""):
        return bandeja_baralhos(nome, pocos, p, altura=alt, descricao=desc)

    misterio = single("cartas-misterio", [B("misterio")], NIVEL, "Mistério (compra). Descarte: numa partida do jogo base, esvazie uma bandeja dos Mistérios e use como descarte.")
    av1 = single("cartas-aventura-construir", [B("aventura-construir")], NIVEL / 2,
                 "Aventura — Construir (meia altura; empilha sobre Coletar)")
    av2 = single("cartas-aventura-coletar", [B("aventura-coletar")], NIVEL / 2, "Aventura — Coletar (meia altura)")
    av3 = single("cartas-aventura-explorar", [B("aventura-explorar")], NIVEL / 2, "Aventura — Explorar (meia altura)")
    esp = single("cartas-especiais", [B("especiais")], NIVEL / 2,
                 "Naufrágio, Arrumar acampamento, Sexta-feira, Cão, promos (meia altura)")
    larg_f = misterio.tamanho[1]   # 101 (bandeja girada 90°)
    for i, (baixo, cima) in enumerate([(misterio, None), (av2, av1), (esp, av3)]):
        x = i * larg_f
        add(baixo, (x, fundo_y, 0), rot90=1)
        if cima is not None:
            add(cima, (x, fundo_y, baixo.tamanho[2]), rot90=1)

    # ---------------- Nível 2 ----------------
    z = topo_A
    for n in ("obj_16_tokens.stl", "obj_15_dice-determination-black-white-blue.stl", "obj_14_resources.stl"):
        it = orig(n, (0, 0, z))
        z = it.caixa[1][2]
    B_x = cfg["originais_reaproveitados"][n][0]
    topo_insert = 2 * NIVEL                       # 104
    longa, longat = bandeja_fichas("caixa-longa", A_x - B_x, 246.0, topo_insert - topo_A, [(1, [1, 1, 1])], p,
                                   descricao="Caixa longa com tampa: fichas de descoberta / marcadores extras")
    add(longa, (B_x, 0, topo_A)); pecas.append(longat)

    mtc = orig("obj_17_Mystery Tales Components", (A_x, 0, NIVEL))
    z_mt = mtc.caixa[1][2]
    tiles = orig("obj_20_Mystery Tales Tiles", (A_x, 0, z_mt))
    orig("obj_19_animals.stl", (A_x, 0, tiles.caixa[1][2]))
    y_mt = cfg["originais_reaproveitados"]["obj_19_animals.stl"][1]
    mt_out = single("cartas-mt-outros", [B("mt-outros")], topo_insert - z_mt,
                    "Mistérios: personagem, condição, cultista, covil, condenado, nativo, guia")
    add(mt_out, (A_x, y_mt, z_mt))
    y_promo = y_mt + mt_out.tamanho[1]
    promo, promot = bandeja_fichas("caixa-promos", mini.tam[0], mtc.caixa[1][1] - y_promo, topo_insert - z_mt,
                                   [(1, [1])], p, descricao="Caixa com tampa: lunetas, promos, peças soltas")
    add(promo, (A_x, y_promo, z_mt)); pecas.append(promot)

    peq1 = bandeja_baralhos("cartas-pequenas-base", [B("invencoes"), B("equipamento"), B("feras")], p,
                            altura=NIVEL / 2, descricao="Cartas pequenas: Invenções | Equipamento inicial | Feras")
    peq2 = bandeja_baralhos("cartas-pequenas-mt", [B("mt-invencoes"), B("mt-equipamento"), B("mt-pequenas")], p,
                            altura=NIVEL / 2, descricao="Cartas pequenas dos Mistérios")
    add(peq1, (col_x, 0, NIVEL))
    add(peq2, (col_x, 0, NIVEL + peq1.tamanho[2]))

    mte = single("cartas-mt-eventos", [B("mt-eventos")], NIVEL, "Mistérios — Eventos")
    mta = single("cartas-mt-aventura", [B("mt-aventura")], NIVEL, "Mistérios — Aventura")
    mtm = single("cartas-mt-misterio", [B("mt-misterio")], NIVEL / 2, "Mistérios — Mistério (meia altura)")
    mti = single("cartas-mt-insanidade", [B("mt-insanidade")], NIVEL / 2, "Mistérios — Insanidade (meia altura)")
    add(mte, (0, fundo_y, NIVEL), rot90=1)
    add(mta, (larg_f, fundo_y, NIVEL), rot90=1)
    add(mti, (2 * larg_f, fundo_y, NIVEL), rot90=1)
    add(mtm, (2 * larg_f, fundo_y, NIVEL + mti.tamanho[2]), rot90=1)

    # ---------------- Camada plana (tabuleiro) ----------------
    X, Y, Z = (cfg["caixa_interna"][k] for k in "xyz")
    cp = cfg["camada_plana"]
    espessura_plana = sum(i["espessura"] for i in cp["itens"]) + cp["folga_tampa"]
    topo = max(it.caixa[1][2] for it in itens)
    reservas = [("tabuleiro + camada plana", ((0, 0, Z - espessura_plana), (X, Y, Z)))]
    ctx = {"topo_insert": topo, "espessura_plana": espessura_plana, "espaco_tabuleiro": Z - topo,
           "folga_sobrando": Z - topo - espessura_plana, "sleeves": sl, "baralhos": bar, "params": p}
    return pecas, itens, reservas, ctx
