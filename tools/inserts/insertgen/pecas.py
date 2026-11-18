"""Peças paramétricas do insert.

Cada gerador devolve uma `Peca`: o sólido (manifold3d) já apoiado em z=0 e com
canto em (0,0,0), mais os "fantasmas": caixas que representam o conteúdo
(maço de cartas luvadas, fichas) e que a validação exige que caibam sem tocar
no plástico.
"""
from dataclasses import dataclass, field
import manifold3d as m3

from . import geom as g


@dataclass
class Peca:
    nome: str
    solido: m3.Manifold
    descricao: str = ""
    qtd: int = 1
    fantasmas: list = field(default_factory=list)   # [(rótulo, Manifold)]
    medidas: dict = field(default_factory=dict)      # medidas nominais declaradas (x, y, z)
    notas: list = field(default_factory=list)

    @property
    def tamanho(self):
        (x0, y0, z0), (x1, y1, z1) = g.bbox(self.solido)
        return (x1 - x0, y1 - y0, z1 - z0)


@dataclass
class Params:
    """Parâmetros de impressão e folgas (mm)."""
    parede: float = 2.0          # parede externa (5 linhas de 0,4)
    divisoria: float = 1.6       # parede interna entre poços
    piso: float = 1.2            # espessura do fundo
    raio_canto: float = 2.0      # arredondamento das arestas verticais externas
    folga_carta: float = 1.25    # folga por lado em volta da carta luvada (total 2,5)
    folga_maco: float = 1.5      # folga extra em cima do maço
    folga_tampa: float = 0.25    # folga por lado entre tampa e rebaixo
    tampa_esp: float = 1.6       # espessura da tampa embutida
    rebaixo: float = 0.8         # degrau interno onde a tampa assenta (parede restante >= 1,2)
    entalhe_larg: float = 24.0   # largura do entalhe de dedo das cartas
    raio_concha: float = 6.0     # raio do fundo em concha das fichas


def bandeja_baralhos(nome, pocos, p: Params, altura=None, entalhe=True, furo_piso=26.0, descricao=""):
    """Bandeja de mesa para maços DEITADOS (cartas luvadas), poços em fila ao longo de Y.

    pocos: lista; cada item é uma lista de Baralho que divide o mesmo poço
    (normalmente um só) ou [] para poço de descarte vazio. O poço é a maior
    carta luvada + 2*folga_carta; a profundidade é o maior conteúdo + folga_maco
    (ou `altura` fixa, que precisa comportar).
    Entalhes de dedo nas duas laterais longas de cada poço (pinça o maço) e furo
    no piso para empurrar o maço por baixo. Na mesa ela é o próprio monte de
    compra/descarte; na caixa, empilha (o fundo de uma é a tampa da outra).
    """
    ref = [b for poco in pocos for b in poco]
    if not ref:
        raise ValueError(f"{nome}: precisa de ao menos um baralho para dimensionar o poço")
    larg_c = max(b.externo[0] for b in ref) + 2 * p.folga_carta
    comp_c = max(b.externo[1] for b in ref) + 2 * p.folga_carta
    pilha = [sum(b.altura_pilha() for b in poco) for poco in pocos]
    prof_min = max(pilha) + p.folga_maco
    if altura is not None:
        if altura - p.piso < prof_min - 1e-6:
            raise ValueError(f"{nome}: altura {altura} não comporta {max(pilha):.1f} mm de cartas + folga + piso")
        prof = altura - p.piso
    else:
        prof = prof_min
    n = len(pocos)
    X = 2 * p.parede + larg_c
    Y = 2 * p.parede + n * comp_c + (n - 1) * p.divisoria
    Z = p.piso + prof
    corpo = g.caixa_arred(X, Y, Z, p.raio_canto)
    furos, fant = [], []
    for i, poco in enumerate(pocos):
        y0 = p.parede + i * (comp_c + p.divisoria)
        furos.append(g.caixa_arred(larg_c, comp_c, prof + 1, 1.0, (p.parede, y0, p.piso)))
        cy = y0 + comp_c / 2
        if entalhe:
            prof_ent = max(min(prof * 0.7, prof - 2.5), 4.0)
            furos.append(g.entalhe_dedo(p.entalhe_larg, prof_ent, p.parede + 2, (-1, cy, Z), eixo="x"))
            furos.append(g.entalhe_dedo(p.entalhe_larg, prof_ent, p.parede + 2, (X - p.parede - 1, cy, Z), eixo="x"))
        if furo_piso:
            furos.append(g.cilindro(furo_piso / 2, p.piso + 2, (X / 2, cy, -1)))
        z = p.piso
        for b in poco:
            L, A = b.externo
            h = b.altura_pilha()
            fant.append((b.nome, g.caixa(L, A, h, (p.parede + (larg_c - L) / 2, y0 + (comp_c - A) / 2, z))))
            z += h
    sol = corpo - g.uniao(furos)
    rot = ["+".join(b.nome for b in poco) if poco else "descarte" for poco in pocos]
    pc = Peca(nome, sol, descricao or ("Poços: " + " | ".join(rot)), fantasmas=fant, medidas={"x": X, "y": Y, "z": Z})
    cap = int((prof - p.folga_maco) / ref[0].espessura_unit / 1.08)
    pc.notas.append(f"poço {larg_c:.1f} x {comp_c:.1f} x {prof:.1f} mm; cabem ~{cap} cartas luvadas por poço")
    pc.notas += [f"{r}: {s:.1f} mm de maço" for r, s in zip(rot, pilha)]
    return pc


def bandeja_fichas(nome, X, Y, Z, colunas, p: Params, tampa=True, descricao=""):
    """Bandeja de fichas com compartimentos em concha e (opcional) tampa embutida.

    colunas: lista de colunas (esq->dir); cada coluna = (fração_largura, [frações_altura...])
    — as frações são relativas e normalizadas. Ex.: [(1, [1, 1]), (2, [1])].
    Com tampa, a parede tem rebaixo interno; a tampa fica rente ao topo
    (bandejas empilham e viajam fechadas).
    Devolve (bandeja, tampa_ou_None).
    """
    corpo = g.caixa_arred(X, Y, Z, p.raio_canto)
    topo_util = Z - (p.tampa_esp if tampa else 0)
    prof = topo_util - p.piso
    if prof < 4:
        raise ValueError(f"{nome}: altura insuficiente para compartimentos")
    larg_int = X - 2 * p.parede - (len(colunas) - 1) * p.divisoria
    tot = sum(c[0] for c in colunas)
    furos = []
    x = p.parede
    for frac, linhas in colunas:
        w = larg_int * frac / tot
        alt_int = Y - 2 * p.parede - (len(linhas) - 1) * p.divisoria
        ty = sum(linhas)
        y = p.parede
        for fl in linhas:
            h = alt_int * fl / ty
            furos.append(g.cavidade_concha(w, h, prof + 5, min(p.raio_concha, prof * 0.6), (x, y, p.piso)))
            y += h + p.divisoria
        x += w + p.divisoria
    tp = None
    if tampa:
        # rebaixo: abre a parede por dentro (parede - rebaixo fica de pé) na altura da tampa
        ins = p.parede - p.rebaixo
        furos.append(g.caixa_arred(X - 2 * ins, Y - 2 * ins, p.tampa_esp + 1, max(p.raio_canto - ins, 0.5),
                                   (ins, ins, topo_util)))
        tx, ty_ = X - 2 * ins - 2 * p.folga_tampa, Y - 2 * ins - 2 * p.folga_tampa
        placa = g.caixa_arred(tx, ty_, p.tampa_esp, max(p.raio_canto - ins - p.folga_tampa, 0.5))
        # furo de dedo para levantar a tampa
        placa = placa - g.cilindro(7, p.tampa_esp + 2, (tx / 2, 0, -1))
        tp = Peca(nome + "-tampa", placa, f"Tampa embutida de {nome}",
                  medidas={"x": tx, "y": ty_, "z": p.tampa_esp})
        # entalhe na bandeja alinhado ao furo da tampa (dedo passa por baixo)
        furos.append(g.cilindro(7, Z, (X / 2, ins + p.folga_tampa, topo_util - 3)))
    sol = corpo - g.uniao(furos)
    return Peca(nome, sol, descricao, medidas={"x": X, "y": Y, "z": Z}), tp


def bloco_espaco(nome, X, Y, Z, p: Params, descricao="Calço"):
    """Calço oco (só paredes e piso) para nivelar o topo onde não há peça."""
    corpo = g.caixa_arred(X, Y, Z, p.raio_canto)
    oco = g.caixa_arred(X - 2 * p.parede, Y - 2 * p.parede, Z, 1.0, (p.parede, p.parede, p.piso))
    return Peca(nome, corpo - oco, descricao, medidas={"x": X, "y": Y, "z": Z})
