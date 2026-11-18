"""Primitivas sólidas (manifold3d). Todas as funções devolvem Manifold em mm."""
import manifold3d as m3

SEG = 64  # segmentos por círculo completo


def caixa(x, y, z, pos=(0.0, 0.0, 0.0)):
    return m3.Manifold.cube((x, y, z)).translate(pos)


def retangulo_arred(x, y, r):
    """Seção retangular x*y com cantos de raio r, canto inferior em (0,0)."""
    r = max(0.0, min(r, x / 2 - 1e-3, y / 2 - 1e-3))
    if r <= 0:
        return m3.CrossSection.square((x, y))
    base = m3.CrossSection.square((x - 2 * r, y - 2 * r)).translate((r, r))
    return base.offset(r, m3.JoinType.Round, circular_segments=SEG)


def caixa_arred(x, y, z, r, pos=(0.0, 0.0, 0.0)):
    """Prisma com arestas verticais arredondadas (raio r)."""
    return retangulo_arred(x, y, r).extrude(z).translate(pos)


def cilindro(r, h, pos=(0.0, 0.0, 0.0), eixo="z"):
    c = m3.Manifold.cylinder(h, r, r, SEG)
    if eixo == "x":
        c = c.rotate((0, 90, 0))
    elif eixo == "y":
        c = c.rotate((-90, 0, 0))
    return c.translate(pos)


def cavidade_concha(x, y, z, r, pos=(0.0, 0.0, 0.0)):
    """Cavidade com fundo em concha: arestas do fundo e verticais com raio r.

    Fichas escorregam para fora com o dedo (boa para usar a bandeja na mesa).
    É o casco convexo de 4 esferas nos cantos do fundo + prisma arredondado acima.
    """
    r = max(0.0, min(r, x / 2 - 0.01, y / 2 - 0.01, z - 0.01))
    if r <= 0.05:
        return caixa(x, y, z, pos)
    esferas = [m3.Manifold.sphere(r, SEG).translate((cx, cy, r))
               for cx in (r, x - r) for cy in (r, y - r)]
    topo = caixa_arred(x, y, z - r, r, (0, 0, r))
    return m3.Manifold.batch_hull(esferas + [topo]).translate(pos)


def entalhe_dedo(largura, profundidade, espessura, pos, eixo="y"):
    """Recorte em U atravessando uma parede (para pegar cartas/fichas com o dedo).

    largura: abertura do U; profundidade: quanto desce a partir do topo;
    espessura: quanto atravessa (ao longo de `eixo`). pos = centro do topo do U,
    no início da travessia.
    """
    r = largura / 2
    h = max(profundidade - r, 0.0)
    sec = m3.CrossSection.square((largura, h + 50)).translate((-r, -h))
    sec = sec + m3.CrossSection.circle(r, SEG).translate((0, -h))
    u = sec.extrude(espessura)  # plano XY, extrudado em Z
    if eixo == "y":    # U no plano XZ, atravessa Y
        u = u.rotate((90, 0, 0)).mirror((0, 1, 0))
    elif eixo == "x":  # U no plano YZ, atravessa X
        u = u.rotate((90, 0, 0)).mirror((0, 1, 0)).rotate((0, 0, 90)).mirror((1, 0, 0))
    return u.translate(pos)


def uniao(lista):
    lista = [s for s in lista if s is not None]
    return m3.Manifold.batch_boolean(lista, m3.OpType.Add) if lista else m3.Manifold()


def bbox(solido):
    b = solido.bounding_box()
    return (b[0], b[1], b[2]), (b[3], b[4], b[5])
