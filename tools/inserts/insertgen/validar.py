"""Validações: malha fechada, medidas exatas, parede mínima, conteúdo cabe, montagem na caixa."""
import numpy as np
import manifold3d as m3

from . import geom as g
from .stl import malha

TOL = 0.01  # mm


def checar_malha(vertices, faces):
    """Cada aresta orientada aparece 1x e sua reversa 1x => sólido fechado e orientado."""
    e = np.concatenate([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]])
    n = int(vertices.max(initial=0)) + 1 if False else len(vertices)
    chave = e[:, 0] * n + e[:, 1]
    rev = e[:, 1] * n + e[:, 0]
    uniq, cont = np.unique(chave, return_counts=True)
    dup = int((cont > 1).sum())
    faltando = int((~np.isin(rev, uniq)).sum())
    tri = vertices[faces]
    area = np.linalg.norm(np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0]), axis=1) / 2
    degeneradas = int((area < 1e-9).sum())
    vol = float(np.einsum("ij,ij->i", tri[:, 0], np.cross(tri[:, 1], tri[:, 2])).sum() / 6)
    return {"arestas_duplicadas": dup, "arestas_abertas": faltando,
            "triangulos_degenerados": degeneradas, "volume_mm3": vol}


def parede_fina(solido, minimo, n_fatias=12):
    """Procura regiões mais finas que `minimo` com abertura morfológica por fatias.

    Devolve a maior área (mm²) perdida numa fatia — 0 quer dizer que nenhuma parede
    é mais fina que o mínimo. Áreas pequenas (< 1 mm²) são cantos vivos, toleradas.
    """
    (x0, y0, z0), (x1, y1, z1) = g.bbox(solido)
    pior = (0.0, None)
    r = minimo / 2 - 0.01
    for z in np.linspace(z0 + 0.15, z1 - 0.15, n_fatias):
        sec = solido.slice(float(z))
        if sec.is_empty():
            continue
        aberto = sec.offset(-r, m3.JoinType.Miter, 2.0).offset(r, m3.JoinType.Miter, 2.0)
        perdido = (sec - aberto)
        for parte in perdido.decompose():
            a = parte.area()
            if a > pior[0]:
                b = parte.bounds()
                pior = (a, (round(float(z), 2), [round(v, 1) for v in b]))
    return pior


def validar_peca(peca, parede_min=1.2, mesa=(256, 256, 256)):
    erros, info = [], {}
    if peca.solido.status() != m3.Error.NoError:
        erros.append(f"manifold3d: {peca.solido.status()}")
    v, f = malha(peca.solido)
    mm = checar_malha(v, f)
    info.update(mm)
    if mm["arestas_abertas"] or mm["arestas_duplicadas"]:
        erros.append(f"malha não fechada: {mm}")
    if mm["triangulos_degenerados"]:
        info["aviso_degenerados"] = mm["triangulos_degenerados"]
    if mm["volume_mm3"] <= 0:
        erros.append("volume não positivo (normais invertidas)")
    (x0, y0, z0), (x1, y1, z1) = g.bbox(peca.solido)
    if min(x0, y0, z0) < -TOL or abs(z0) > TOL:
        erros.append(f"peça não está na origem/apoiada em z=0: {x0:.3f},{y0:.3f},{z0:.3f}")
    tam = (x1 - x0, y1 - y0, z1 - z0)
    info["tamanho"] = tuple(round(t, 3) for t in tam)
    for eixo, t in zip("xyz", tam):
        esp = peca.medidas.get(eixo)
        if esp is not None and abs(esp - t) > TOL:
            erros.append(f"medida {eixo}: gerada {t:.3f} != declarada {esp:.3f}")
    xy = sorted(tam[:2])
    if xy[0] > min(mesa[:2]) or xy[1] > max(mesa[:2]) or tam[2] > mesa[2]:
        erros.append(f"não cabe na mesa da impressora {mesa}")
    area, onde = parede_fina(peca.solido, parede_min)
    info["parede_fina_mm2"] = round(area, 3)
    if area > 1.0:
        erros.append(f"parede mais fina que {parede_min} mm (área {area:.1f} mm² em z/bbox {onde})")
    for rot, fant in peca.fantasmas:
        inter = (peca.solido ^ fant).volume()
        if inter > 1e-3:
            erros.append(f"conteúdo '{rot}' bate no plástico ({inter:.2f} mm³)")
        (a0, b0, c0), (a1, b1, c1) = g.bbox(fant)
        if a0 < x0 - TOL or b0 < y0 - TOL or a1 > x1 + TOL or b1 > y1 + TOL:
            erros.append(f"conteúdo '{rot}' sai da peça")
        if c1 > z1 + TOL:
            erros.append(f"conteúdo '{rot}' fica {c1 - z1:.2f} mm acima da borda")
    return erros, info


class Item:
    """Uma peça posicionada na caixa (rotação só em múltiplos de 90° em Z)."""

    def __init__(self, nome, tamanho, pos, solido=None, rot90=0, origem="gerada", cor=None):
        self.nome, self.pos, self.rot90, self.origem, self.cor = nome, tuple(pos), rot90 % 4, origem, cor
        sx, sy, sz = tamanho
        self.tam = (sy, sx, sz) if self.rot90 % 2 else (sx, sy, sz)
        self.solido = solido

    @property
    def caixa(self):
        x, y, z = self.pos
        return (x, y, z), (x + self.tam[0], y + self.tam[1], z + self.tam[2])

    def solido_posicionado(self):
        if self.solido is None:
            return g.caixa(*self.tam, self.pos)
        s = self.solido
        if self.rot90:
            s = s.rotate((0, 0, 90 * self.rot90))
            (a, b, _), _ = g.bbox(s)
            s = s.translate((-a, -b, 0))
        return s.translate(self.pos)


def _sobrepoe(a, b):
    (a0, a1), (b0, b1) = a, b
    return all(min(a1[i], b1[i]) - max(a0[i], b0[i]) > TOL for i in range(3))


def validar_montagem(caixa_int, itens, reservas):
    """caixa_int: (X, Y, Z) interno; itens: [Item]; reservas: [(nome, (p0, p1))]
    volumes que precisam ficar livres (tabuleiro, livros...)."""
    erros = []
    X, Y, Z = caixa_int
    for it in itens:
        (x0, y0, z0), (x1, y1, z1) = it.caixa
        if x0 < -TOL or y0 < -TOL or z0 < -TOL or x1 > X + TOL or y1 > Y + TOL or z1 > Z + TOL:
            erros.append(f"{it.nome} sai da caixa: {it.caixa}")
    for i, a in enumerate(itens):
        for b in itens[i + 1:]:
            if _sobrepoe(a.caixa, b.caixa):
                erros.append(f"{a.nome} sobrepõe {b.nome}")
        for nome, vol in reservas:
            if _sobrepoe(a.caixa, vol):
                erros.append(f"{a.nome} invade o espaço reservado de {nome}")
    # apoio: toda peça acima do chão precisa estar apoiada em >= 60% da base
    for a in itens:
        (x0, y0, z0), (x1, y1, _) = a.caixa
        if z0 < TOL:
            continue
        base = (x1 - x0) * (y1 - y0)
        apoio = 0.0
        for b in itens:
            (u0, v0, _), (u1, v1, w1) = b.caixa
            if abs(w1 - z0) < 0.6:
                dx = min(x1, u1) - max(x0, u0)
                dy = min(y1, v1) - max(y0, v0)
                if dx > 0 and dy > 0:
                    apoio += dx * dy
        if apoio < 0.6 * base:
            erros.append(f"{a.nome} está mal apoiada ({100 * apoio / base:.0f}% da base)")
    return erros
