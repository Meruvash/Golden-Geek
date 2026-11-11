"""Cenários de "Victor e o Talaricórnio" (tema Dragon Eclipse: ilhas flutuantes, eclipse, criaturas Mystlings),
pintados em código com a skill claude-drawing (lib anime). Uso: python3 arte/cenas_victor1.py [nome ...]
-> public/img/victor1/<nome>.png (1080x1080)"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '.claude', 'skills', 'claude-drawing', 'lib'))
import numpy as np
from anime import Anime
from core import blur, noise2d, spline

S = 1080
TINTA = '#1a1220'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'img', 'victor1')
os.makedirs(OUT, exist_ok=True)


def tinta(a, pts, w=4, alpha=0.9, fechado=False):
    a.lines(pts, w, TINTA, alpha, closed=fechado)


def ilha(a, cx, cy, w, h, topo, lado, borda, seed, arvores=True):
    """ilha flutuante: tampo de grama, rocha pendurada em ponta, luz de borda"""
    r = np.random.default_rng(seed)
    base = [(cx - w / 2, cy)] + [(cx - w / 2 + w * t, cy + h * (np.sin(t * np.pi) ** 0.7) * (0.85 + 0.3 * r.random())) for t in np.linspace(0.08, 0.92, 9)] + [(cx + w / 2, cy)]
    rocha = a.poly(spline(base + [(cx - w / 2, cy)], 8))
    a.gradient(rocha, lado, '#1c1430', cy, cy + h)
    n = noise2d(S, S, 18, 3, seed)
    a.fill(rocha * np.clip(n - 0.5, 0, 1) * 2, '#000000', 0.35)
    grama = a.poly(spline([(cx - w / 2 - 6, cy + 4), (cx - w / 3, cy - h * 0.12), (cx, cy - h * 0.16), (cx + w / 3, cy - h * 0.1), (cx + w / 2 + 6, cy + 4)], 8) + [(cx - w / 2 - 6, cy + 8)])
    a.fill(grama, topo)
    a.fill(grama * (a.YY < cy - h * 0.08), borda, 0.6)
    if arvores:
        for k in range(int(w / 70)):
            x = cx - w / 2.6 + r.random() * w / 1.3
            y = cy - h * 0.1
            hh = 30 + r.random() * w * 0.12
            a.fill(a.poly([(x - 3, y), (x + 3, y), (x + 2, y - hh * 0.5), (x - 2, y - hh * 0.5)]), '#2a1a20')
            a.fill(a.circle(x, y - hh * 0.6, hh * 0.35), topo)
            a.fill(a.circle(x - hh * 0.08, y - hh * 0.68, hh * 0.18), borda, 0.5)
    # cascatinha
    if seed % 2:
        a.fill(blur(a.poly([(cx + w * 0.1, cy + 4), (cx + w * 0.13, cy + 4), (cx + w * 0.14, cy + h * 1.6), (cx + w * 0.09, cy + h * 1.6)]), 2), '#cfe7ff', 0.5)


# ---------------------------------------------------------------- penhasco no eclipse
def eclipse():
    a = Anime(S, S, seed=7)
    a.sky('#0c0620', '#3a1650', '#e0603a', horizon=700)
    r = a.rng
    for _ in range(200):
        a.fill(a.circle(r.uniform(0, S), r.uniform(0, 520), r.uniform(0.6, 2.4)), '#fff2e0', r.uniform(0.3, 1))
    # o eclipse: coroa, anel de diamante e disco negro
    ex, ey = 700, 250
    a.screen(blur(a.circle(ex, ey, 330), 90), '#ff7a3a', 0.45)
    a.screen(blur(a.circle(ex, ey, 160), 26), '#ffd9a0', 0.9)
    ang = np.arctan2(a.YY - ey, a.XX - ex)
    raios = (0.5 + 0.5 * np.sin(ang * 14)) * np.clip(1 - np.hypot(a.XX - ex, a.YY - ey) / 300, 0, 1)
    a.screen(blur(raios.astype(np.float32), 3), '#ffe6c0', 0.5)
    a.fill(a.circle(ex, ey, 112), '#050208')
    a.screen(blur(a.circle(ex - 92, ey - 62, 12), 6), '#fffaf0', 1)
    a.lines([(ex + 112 * np.cos(t), ey + 112 * np.sin(t)) for t in np.linspace(0, 6.3, 90)], 3, '#fff1d0', 0.9)
    # ilhas flutuantes ao longe
    ilha(a, 180, 560, 260, 120, '#4a2a5a', '#3a2048', '#ff9a6a', 3)
    ilha(a, 940, 610, 200, 90, '#4a2a5a', '#3a2048', '#ff9a6a', 4)
    ilha(a, 520, 640, 140, 60, '#3a2048', '#2a1638', '#ff8a5a', 5, False)
    # mar de nuvens embaixo
    for k in range(6):
        y = 720 + k * 40
        a.cumulus(r.uniform(0, S), y, 700, 120, light=(0.4, -0.9), lit='#ff9f7a', mid='#7a3a6a', shadow='#2a1438', seed=20 + k)
    # penhasco em primeiro plano (direita) com grama e borda quente
    pen = a.poly(spline([(380, S), (430, 900), (520, 860), (700, 840), (900, 830), (S + 20, 850), (S + 20, S)], 10))
    a.gradient(pen, '#2a1838', '#0e0814', 830, S)
    n = noise2d(S, S, 30, 4, 9)
    a.fill(pen * np.clip(n - 0.55, 0, 1) * 2, '#000000', 0.5)
    tinta(a, spline([(380, S), (430, 900), (520, 860), (700, 840), (900, 830), (S + 20, 850)], 10), 6, 1)
    a.lines(spline([(432, 898), (520, 858), (700, 838), (900, 828), (S + 20, 848)], 10), 4, '#ff9a6a', 0.9)
    for k in range(30):  # tufos de grama
        x = 460 + r.random() * 620; y = 845 + 20 * np.sin(x / 90)
        a.lines([(x, y), (x + r.uniform(-8, 8), y - r.uniform(10, 26))], 3, '#ff9a6a', 0.8)
    a.sparkles(70, box=(0, 0, S, 800), size=(1.2, 3), colour='#ffd9b0')
    a.bloom(threshold=0.75, radius=22, amount=0.45)
    a.vignette(0.3)
    a.save(f'{OUT}/eclipse.png')


# ---------------------------------------------------------------- mercado de Mystlings (dia)
def mercado():
    a = Anime(S, S, seed=17)
    a.sky('#3d7fd6', '#8cc4f2', '#e8f4ff', horizon=560)
    a.cumulus(260, 330, 620, 280, light=(0.6, -0.8), lit='#ffffff', mid='#e3eefc', shadow='#a7bde6', seed=3)
    a.cumulus(900, 300, 420, 200, light=(0.6, -0.8), lit='#ffffff', mid='#e3eefc', shadow='#a7bde6', seed=4)
    ilha(a, 820, 200, 220, 100, '#5aa05a', '#7a6a8a', '#d9ffb0', 1)
    ilha(a, 160, 160, 150, 70, '#5aa05a', '#7a6a8a', '#d9ffb0', 2, False)
    # dragão ao longe
    dx, dy = 560, 140
    a.fill(a.poly([(dx - 40, dy), (dx, dy - 6), (dx + 40, dy), (dx, dy + 6)]), '#4a3a6a')
    a.fill(a.poly([(dx - 10, dy), (dx - 50, dy - 40), (dx + 4, dy - 4)]), '#4a3a6a')
    a.fill(a.poly([(dx + 10, dy), (dx + 46, dy - 34), (dx + 2, dy - 4)]), '#4a3a6a')
    # chão de pedra da praça
    chao = a.poly([(0, 640), (S, 640), (S, S), (0, S)])
    a.gradient(chao, '#d9c7a6', '#a8927a', 640, S)
    for k in range(-10, 11):
        a.lines([(540 + k * 40, 640), (540 + k * 170, S)], 2, '#8a7660', 0.45)
    for y in (680, 740, 820, 920, 1040):
        a.lines([(0, y), (S, y)], 2, '#8a7660', 0.45)
    # barracas com toldos listrados
    for (x0, w, c1, c2) in [(-40, 330, '#e2364f', '#fff1e0'), (370, 300, '#3a8fd6', '#fff1e0'), (760, 360, '#f2b33a', '#fff1e0')]:
        topo, base = 470, 660
        a.fill(a.poly([(x0, base), (x0 + w, base), (x0 + w, topo + 60), (x0, topo + 60)]), '#7a5236')
        a.fill(a.poly([(x0 + 10, base - 20), (x0 + w - 10, base - 20), (x0 + w - 10, base), (x0 + 10, base)]), '#5a3a26')
        for k in range(6):
            cor = c1 if k % 2 == 0 else c2
            xa = x0 - 20 + k * (w + 40) / 6
            a.fill(a.poly([(xa, topo), (xa + (w + 40) / 6, topo), (xa + (w + 40) / 6, topo + 60), (xa, topo + 70)]), cor)
        tinta(a, [(x0 - 20, topo), (x0 + w + 20, topo), (x0 + w + 20, topo + 60), (x0 - 20, topo + 70)], 4, 1, True)
        # potes e cristais no balcão
        for k in range(5):
            xx = x0 + 30 + k * (w - 60) / 4
            cor = ['#7ae2c0', '#c07ae2', '#e27a9a', '#7ab2e2', '#e2d07a'][k]
            a.fill(a.poly([(xx - 12, base - 20), (xx + 12, base - 20), (xx + 8, base - 56), (xx - 8, base - 56)]), cor)
            a.screen(blur(a.circle(xx, base - 40, 20), 8), cor, 0.5)
            tinta(a, [(xx - 12, base - 20), (xx + 12, base - 20), (xx + 8, base - 56), (xx - 8, base - 56)], 2, 0.9, True)
    # bandeirolas
    pts = [(0, 420), (270, 470), (540, 430), (810, 470), (S, 420)]
    a.lines(spline(pts, 10), 3, '#3a2a30')
    for k in range(16):
        x = 30 + k * 66; y = 432 + 30 * abs(np.sin(k * 0.8))
        a.fill(a.poly([(x - 14, y), (x + 14, y), (x, y + 30)]), ['#e2364f', '#f2b33a', '#3a8fd6', '#5ac06a'][k % 4])
    a.sparkles(40, box=(0, 0, S, 600), size=(1.2, 3), colour='#ffffff')
    a.bloom(threshold=0.82, radius=18, amount=0.3)
    a.vignette(0.2)
    a.save(f'{OUT}/mercado.png')


# ---------------------------------------------------------------- acampamento noturno
def acampamento():
    a = Anime(S, S, seed=27)
    a.sky('#070a22', '#1c2350', '#3a3a6a', horizon=600)
    r = a.rng
    for _ in range(260):
        a.fill(a.circle(r.uniform(0, S), r.uniform(0, 560), r.uniform(0.6, 2.4)), '#fff6e0', r.uniform(0.3, 1))
    a.fill(blur(a.circle(220, 160, 120), 30), '#c9d6ff', 0.35)
    a.fill(a.circle(220, 160, 54), '#f4f0ff')
    ilha(a, 820, 330, 300, 140, '#26304a', '#1c2238', '#9ab0ff', 6)
    ilha(a, 420, 420, 160, 70, '#26304a', '#1c2238', '#9ab0ff', 7, False)
    chao = a.poly(spline([(0, 640), (300, 620), (700, 640), (S, 620), (S, S), (0, S)], 8))
    a.gradient(chao, '#2a3a2a', '#0e140e', 620, S)
    n = noise2d(S, S, 20, 3, 4)
    a.fill(chao * np.clip(n - 0.5, 0, 1) * 2, '#000000', 0.4)
    # barraca
    bar = [(110, 760), (290, 520), (470, 760)]
    a.fill(a.poly(bar), '#8a3a3a')
    a.fill(a.poly([(290, 520), (470, 760), (380, 760)]), '#5a2226')
    a.fill(a.poly([(250, 760), (290, 640), (330, 760)]), '#1a0e10')
    tinta(a, bar, 5, 1, True)
    # fogueira
    fx, fy = 640, 820
    a.screen(blur(a.circle(fx, fy - 40, 380), 120), '#ff7a2a', 0.55)
    for k in range(5):
        a.lines([(fx - 70 + k * 30, fy + 20), (fx + 70 - k * 30, fy - 4)], 14, '#3a2414')
    for (w, h, c) in [(60, 130, '#ff5a1a'), (40, 96, '#ffb03a'), (20, 56, '#fff1a0')]:
        a.fill(a.poly(spline([(fx - w, fy), (fx - w * 0.6, fy - h * 0.5), (fx, fy - h), (fx + w * 0.6, fy - h * 0.5), (fx + w, fy)], 8)), c)
    for k in range(8):
        a.fill(a.circle(fx - 90 + k * 26, fy + 26 + 4 * np.sin(k), 12), '#5a5a62')
    a.sparkles(60, box=(fx - 160, fy - 380, fx + 160, fy - 20), size=(1, 2.6), colour='#ffb060')
    a.bloom(threshold=0.75, radius=22, amount=0.45)
    a.vignette(0.32)
    a.save(f'{OUT}/acampamento.png')


CENAS = {'eclipse': eclipse, 'mercado': mercado, 'acampamento': acampamento}
for nome in (sys.argv[1:] or CENAS):
    CENAS[nome]()
    print('ok', nome)
