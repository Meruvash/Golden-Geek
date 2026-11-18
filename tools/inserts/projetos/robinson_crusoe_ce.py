"""Robinson Crusoe — Edição de Colecionador: insert "misto" para sleeves Bucaneiros PADRÃO
com espaço reservado para o tabuleiro por cima.

- Maços de JOGO deitados em bandejas que vão para a mesa (compra/descarte).
- Maços dos MISTÉRIOS em pé (estilo PengLord), com divisórias soltas, para guarda.
- Bandejas de componentes do insert original (js500 + remix Mistérios) reaproveitadas.

Planta (caixa 320 x 320, z para cima):
  Faixa de 246 mm (Y 0-246):
    X 0-151,2    pilha original personagens/peças/abrigo (0-51) + pilha recursos/dados/fichas (51-103)
                 + caixa longa com tampa (51-104)
    X 151,2-249,2 miniaturas (0-52) + componentes MT (52-63) + peças MT/animais + 2 bandejas de
                 cartas pequenas + caixa de promos (63-104)
    X 249,2-fim  2 bandejas em pé dos Mistérios (0-70) + caixa com tampa (70-104)
                 + 2 caixas com tampa no fundo (0-52, 52-104)
  Faixa do fundo (Y 246-fim): 3 posições de bandejas deitadas, 2 níveis de 52 mm.
  Camada plana (104-topo): tabuleiro dobrado, fichas de cenário/personagem, manual.
"""
import json
import os

from insertgen.cartas import Baralho, carregar_catalogo, sleeve_envelope
from insertgen.pecas import Params, bandeja_baralhos, bandeja_em_pe, bandeja_fichas, divisoria
from insertgen.validar import Item

AQUI = os.path.dirname(os.path.abspath(__file__))
CONFIG = os.path.join(AQUI, "robinson-crusoe-ce.json")

NIVEL = 52.0      # módulo de altura (as bandejas originais de 52 mm ditam)
TOPO = 2 * NIVEL  # 104: topo plano do insert, onde deita o tabuleiro
FAIXA = 246.0     # comprimento das peças originais; a faixa do fundo começa aqui


def carregar(config=CONFIG):
    with open(config, encoding="utf-8") as fh:
        return json.load(fh)


def montar(cfg, p=None):
    """Devolve (pecas_geradas, itens_na_caixa, reservas, contexto)."""
    p = p or Params()
    lay = cfg.get("layout", {})
    cat = carregar_catalogo()
    sl = {t: sleeve_envelope(cat, d["usar"], d["compativel_com"]) for t, d in cfg["sleeves"].items()}
    bar = {}
    for k, d in cfg["baralhos"].items():
        c = cfg["cartas"][d["tipo"]]
        bar[k] = Baralho(k, c["tamanho"], d["qtd"], c["espessura"], sl[d["tipo"]])
    B = lambda *ks: [bar[k] for k in ks]  # noqa: E731
    gc = cfg["cartas"]["grande"]
    ref_g = Baralho("ref", gc["tamanho"], 0, gc["espessura"], sl["grande"])
    orig_t = cfg["originais_reaproveitados"]

    pecas, itens = [], []

    def add(peca, pos, rot90=0):
        if peca not in pecas:
            pecas.append(peca)
        it = Item(peca.nome, peca.tamanho, pos, peca.solido, rot90=rot90)
        itens.append(it)
        return it

    def orig(nome, pos, rot90=0):
        it = Item("ORIGINAL " + nome, orig_t[nome], pos, None, rot90=rot90, origem="original")
        itens.append(it)
        return it

    def tampada(nome, X, Y, Z, colunas, desc):
        t, tp = bandeja_fichas(nome, X, Y, Z, colunas, p, descricao=desc)
        pecas.append(tp)
        return t

    def deitada(nome, pocos, alt, desc):
        return bandeja_baralhos(nome, pocos, p, altura=alt, descricao=desc, ref=ref_g)

    # ---------- coluna esquerda: pilhas originais ----------
    z = 0.0
    for n in ("obj_13_shelter-upgrades-herb-garden-pen-spyglass.stl",
              "obj_12_map-tiles-animals-misc-expansions.stl", "obj_11_characters.stl"):
        z = orig(n, (0, 0, z)).caixa[1][2]
    topo_A, A_x = z, orig_t["obj_11_characters.stl"][0]
    for n in ("obj_16_tokens.stl", "obj_15_dice-determination-black-white-blue.stl", "obj_14_resources.stl"):
        z = orig(n, (0, 0, z)).caixa[1][2]
    B_x = orig_t["obj_14_resources.stl"][0]
    add(tampada("caixa-longa", A_x - B_x, FAIXA, TOPO - topo_A, [(1, [1, 1, 1])],
                "Caixa longa com tampa: fichas de descoberta / marcadores extras"), (B_x, 0, topo_A))

    # ---------- coluna do meio: miniaturas e Mistérios ----------
    mini = orig("obj_3_Player Miniatures", (A_x, 0, 0), rot90=1)
    larg_mt = max(mini.tam[0], orig_t["obj_20_Mystery Tales Tiles"][0])
    mtc = orig("obj_17_Mystery Tales Components", (A_x, 0, NIVEL))
    z_mt = mtc.caixa[1][2]
    tiles = orig("obj_20_Mystery Tales Tiles", (A_x, 0, z_mt))
    orig("obj_19_animals.stl", (A_x, 0, tiles.caixa[1][2]))
    y_peq = orig_t["obj_19_animals.stl"][1]
    alt_peq = (TOPO - z_mt) / 2
    peq1 = bandeja_baralhos("cartas-pequenas-base", [B("invencoes", "mt-invencoes"), B("equipamento", "mt-equipamento")],
                            p, altura=alt_peq, girar_carta=True,
                            descricao="Cartas pequenas: Invenções (+MT) | Equipamento inicial (+MT)")
    peq2 = bandeja_baralhos("cartas-pequenas-feras-mt", [B("feras"), B("mt-pequenas")], p, altura=alt_peq,
                            girar_carta=True, descricao="Cartas pequenas: Feras | pequenas dos Mistérios")
    add(peq1, (A_x, y_peq, z_mt))
    add(peq2, (A_x, y_peq, z_mt + alt_peq))
    y_promo = y_peq + peq1.tamanho[1]
    add(tampada("caixa-promos", larg_mt, mtc.caixa[1][1] - y_promo, TOPO - z_mt, [(1, [1])],
                "Caixa com tampa: lunetas, promos, peças soltas"), (A_x, y_promo, z_mt))

    # ---------- coluna direita: Mistérios em pé ----------
    col_x = A_x + larg_mt
    alt_pe = lay.get("altura_bandeja_em_pe", 70.0)
    par_pe = lay.get("parede_em_pe", 1.6)
    fm_pe = lay.get("folga_maco_em_pe", 1.5)
    pe1 = bandeja_em_pe("cartas-mt-em-pe-1", B("mt-eventos", "mt-misterio", "mt-insanidade"), p, alt_pe, parede=par_pe,
                        folga_maco=fm_pe, descricao="Mistérios em pé: Eventos | Mistério | Insanidade (2 divisórias)")
    pe2 = bandeja_em_pe("cartas-mt-em-pe-2", B("mt-aventura", "mt-outros"), p, alt_pe, parede=par_pe,
                        folga_maco=fm_pe, descricao="Mistérios em pé: Aventura | outros (1 divisória)")
    larg_col = max(pe1.tamanho[0], pe2.tamanho[0])
    if pe2.tamanho[0] < larg_col:  # mesma largura nas duas, para a caixa de cima apoiar por igual
        pe2 = bandeja_em_pe("cartas-mt-em-pe-2", B("mt-aventura", "mt-outros"), p, alt_pe, parede=par_pe,
                            folga_maco=fm_pe + larg_col - pe2.tamanho[0],
                            descricao="Mistérios em pé: Aventura | outros (1 divisória)")
    add(pe1, (col_x, 0, 0))
    add(pe2, (col_x, pe1.tamanho[1], 0))
    y_pe = pe1.tamanho[1] + pe2.tamanho[1]
    div = divisoria("divisoria-em-pe", pe1.tamanho[1] - 2 * par_pe, alt_pe - p.piso)
    div.qtd = 3
    pecas.append(div)
    add(tampada("caixa-sobre-mt", larg_col, y_pe, TOPO - alt_pe, [(1, [1]), (1, [1])],
                "Caixa com tampa sobre os Mistérios: dados de resina, cápsulas, extras"), (col_x, 0, alt_pe))
    add(tampada("caixa-dados-extras", larg_col, FAIXA - y_pe, NIVEL, [(1, [1])],
                "Dados extras (com tampa)"), (col_x, y_pe, 0))
    add(tampada("caixa-descoberta", larg_col, FAIXA - y_pe, NIVEL, [(1, [1, 1])],
                "Fichas de descoberta (com tampa, 2 compartimentos)"), (col_x, y_pe, NIVEL))

    # ---------- faixa do fundo: bandejas de jogo deitadas ----------
    mis = deitada("cartas-misterio", [B("misterio")], NIVEL,
                  "Mistério (compra). Na mesa, ao lado do tabuleiro.")
    con = deitada("cartas-aventura-construir", [B("aventura-construir")], NIVEL / 2, "Aventura — Construir")
    col = deitada("cartas-aventura-coletar", [B("aventura-coletar")], NIVEL / 2, "Aventura — Coletar")
    exp = deitada("cartas-aventura-explorar", [B("aventura-explorar")], NIVEL / 2, "Aventura — Explorar")
    esp = deitada("cartas-especiais", [B("especiais")], NIVEL / 2,
                  "Naufrágio, Arrumar acampamento, Sexta-feira, Cão, promos")
    eve = deitada("cartas-eventos", [B("eventos"), []], NIVEL, "Eventos: compra | descarte")
    d1 = deitada("cartas-descarte-aventura", [[]], NIVEL / 2, "Descarte vazio (aventura), vai para a mesa")
    d2 = deitada("cartas-descarte-misterio", [[]], NIVEL / 2, "Descarte vazio (mistério), vai para a mesa")
    passo = mis.tamanho[1]  # bandeja girada 90°: o comprimento vira a largura
    for i, (baixo, cima) in enumerate([(mis, None), (col, con), (esp, exp)]):
        add(baixo, (i * passo, FAIXA, 0), rot90=1)
        if cima is not None:
            add(cima, (i * passo, FAIXA, baixo.tamanho[2]), rot90=1)
    add(eve, (0, FAIXA, NIVEL), rot90=1)
    add(d1, (2 * passo, FAIXA, NIVEL), rot90=1)
    add(d2, (2 * passo, FAIXA, NIVEL + d1.tamanho[2]), rot90=1)

    # ---------- camada plana (tabuleiro) ----------
    X, Y, Z = (cfg["caixa_interna"][k] for k in "xyz")
    cp = cfg["camada_plana"]
    espessura_plana = sum(i["espessura"] for i in cp["itens"]) + cp["folga_tampa"]
    topo = max(it.caixa[1][2] for it in itens)
    reservas = [("tabuleiro + camada plana", ((0, 0, Z - espessura_plana), (X, Y, Z)))]
    ctx = {"topo_insert": topo, "espessura_plana": espessura_plana, "espaco_tabuleiro": Z - topo,
           "folga_sobrando": Z - topo - espessura_plana, "sleeves": sl, "baralhos": bar, "params": p}
    return pecas, itens, reservas, ctx
