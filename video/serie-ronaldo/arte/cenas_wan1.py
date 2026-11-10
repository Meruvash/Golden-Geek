"""Cenários de "O Assalto do Wan, Parte 1" (v2), pintados em código com a skill claude-drawing (lib anime).
Molde visual do @saveo.house (ROTEIRO_REFERENCIAS.md §4d): cenário rico, escuro, iluminado por UMA fonte motivada
(lampião, fornalha, lua), separação quente/frio, contorno de nanquim, poeira no ar.
Uso (da pasta do projeto): python3 arte/cenas_wan1.py [nome ...]   -> public/img/wan1/<nome>.png (1080x1080)"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '.claude', 'skills', 'claude-drawing', 'lib'))
import numpy as np
from anime import Anime
from core import blur, noise2d, spline

S = 1080
TINTA = '#1a1210'
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'img', 'wan1')
os.makedirs(OUT, exist_ok=True)


def lerp(p, q, t):
    return (p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)


def madeira(a, mask, c0, c1, y0, y1, seed, veio=0.18, escala=(6, 160), vertical=False):
    """madeira: degradê + veios finos e esticados no sentido da tábua"""
    from PIL import Image
    a.gradient(mask, c0, c1, y0, y1)
    r = np.random.default_rng(seed)
    base = r.random((S // 3, 24)).astype(np.float32) if not vertical else r.random((24, S // 3)).astype(np.float32)
    g = np.asarray(Image.fromarray(base).resize((S, S), Image.BICUBIC), np.float32)
    ond = noise2d(S, S, 120, 2, seed + 7)
    v = (np.sin((g * 6 + ond * 2.5) * 6.28) * 0.5 + 0.5) ** 3
    a.fill(mask * v, '#000000', veio)
    a.fill(mask * (1 - v) * noise2d(S, S, 40, 2, seed + 9), '#ffd9a0', veio * 0.25)


def tinta(a, pts, w=4, alpha=0.9, fechado=False):
    a.lines(pts, w, TINTA, alpha, closed=fechado)


def acabamento(a, bloom=0.4, vin=0.3, brilhos=0, caixa=None, cor='#ffe2a8'):
    if brilhos:
        a.sparkles(brilhos, box=caixa or (0, 0, S, S), size=(1.2, 3.2), colour=cor)
    a.bloom(threshold=0.78, radius=20, amount=bloom)
    a.vignette(vin)


def janela_noite(a, quad, lua=None, seed=0):
    m = a.poly(quad)
    ys = [p[1] for p in quad]
    a.gradient(m, '#0e1636', '#3b4a86', min(ys), max(ys))
    r = np.random.default_rng(seed)
    xs = [p[0] for p in quad]
    for _ in range(14):
        x, y = r.uniform(min(xs), max(xs)), r.uniform(min(ys), min(ys) + (max(ys) - min(ys)) * 0.6)
        a.fill(a.circle(x, y, r.uniform(0.8, 2)) * m, '#fff6e0', r.uniform(0.5, 1))
    # planalto lá fora
    y_h = min(ys) + (max(ys) - min(ys)) * 0.72
    a.fill(m * (a.YY > y_h + 6 * np.sin(a.XX / 40 + seed)), '#24203f')
    if lua:
        a.fill(blur(a.circle(*lua, 40), 14) * m, '#c9d6ff', 0.5)
        a.fill(a.circle(*lua, 16) * m, '#fff4d8')
    tinta(a, quad, 7, 1, True)


# ---------------------------------------------------------------- vagão de passageiros por dentro
def vagao():
    a = Anime(S, S, seed=11)
    VP = (540, 470)
    BX0, BX1, BY0, BY1 = 400, 680, 300, 640  # parede do fundo
    # teto
    teto = a.poly([(0, 0), (S, 0), (BX1, BY0), (BX0, BY0)])
    madeira(a, teto, '#2a1810', '#4a2c1a', 0, BY0, 1, 0.25)
    for k in range(1, 9):  # caibros do teto
        t = k / 9
        tinta(a, [lerp((0, 0), (S, 0), t), lerp((BX0, BY0), (BX1, BY0), t)], 3, 0.5)
    # paredes laterais
    esq = a.poly([(0, 0), (BX0, BY0), (BX0, BY1), (0, S)])
    dire = a.poly([(S, 0), (BX1, BY0), (BX1, BY1), (S, S)])
    madeira(a, esq, '#5a3420', '#3a2014', 0, S, 2)
    madeira(a, dire, '#5a3420', '#3a2014', 0, S, 3)
    for k in range(1, 12):  # tábuas convergindo ao ponto de fuga
        t = k / 12
        tinta(a, [(0, S * t), lerp((0, S * t), VP, 0.82)], 2, 0.35)
        tinta(a, [(S, S * t), lerp((S, S * t), VP, 0.82)], 2, 0.35)
    # chão
    chao = a.poly([(0, S), (BX0, BY1), (BX1, BY1), (S, S)])
    madeira(a, chao, '#24160e', '#4a2e1a', BY1, S, 4, 0.22, vertical=True)
    for k in range(-8, 9):
        tinta(a, [(540 + k * 150, S), lerp((540 + k * 150, S), VP, 0.75)], 2, 0.45)
    # parede do fundo com porta e janela
    fundo = a.poly([(BX0, BY0), (BX1, BY0), (BX1, BY1), (BX0, BY1)])
    madeira(a, fundo, '#4a2a1a', '#2e1a10', BY0, BY1, 5)
    janela_noite(a, [(480, 380), (600, 380), (600, 520), (480, 520)], lua=(560, 420), seed=5)
    tinta(a, [(BX0, BY0), (BX1, BY0), (BX1, BY1), (BX0, BY1)], 5, 1, True)
    # janelas laterais em perspectiva
    for i, (t0, t1) in enumerate([(0.05, 0.3), (0.42, 0.6), (0.68, 0.79)]):
        for lado in (0, 1):
            xo = 0 if lado == 0 else S
            bx = BX0 if lado == 0 else BX1
            p = lambda t, y0, y1: (xo + (bx - xo) * t, y0 + (y1 - y0) * t)
            q = [p(t0, 240, BY0 + 40), p(t1, 240, BY0 + 40), p(t1, 600, BY0 + 170), p(t0, 600, BY0 + 170)]
            janela_noite(a, q, seed=10 + i * 2 + lado)
            # luz fria da janela no chão
            luz = a.poly([q[3], q[2], lerp(q[2], (540, S), 0.5), lerp(q[3], (540, S), 0.5)])
            a.screen(blur(luz, 18), '#5d74c4', 0.25)
    # bancos vermelhos ao longo das paredes
    for lado in (0, 1):
        for i, t in enumerate([0.0, 0.36, 0.62, 0.78]):
            t2 = t + 0.12 * (1 - t) ** 0.5
            xo, bx = (0, BX0) if lado == 0 else (S, BX1)
            x0, x1 = xo + (bx - xo) * t, xo + (bx - xo) * t2
            y0a, y0b = 700 + (BY1 - 40 - 700) * t, 700 + (BY1 - 40 - 700) * t2
            h0, h1 = 300 * (1 - t), 300 * (1 - t2)
            enc = [(x0, y0a - h0 * 0.9), (x1, y0b - h1 * 0.9), (x1, y0b), (x0, y0a)]
            m = a.poly(enc)
            a.gradient(m, '#9a2a2f', '#4a1418', min(enc[0][1], enc[1][1]), y0a)
            tinta(a, enc, 4, 0.95, True)
    # lampião pendurado: halo quente
    a.lines([(540, 0), (540, 150)], 4, TINTA)
    a.screen(blur(a.circle(540, 190, 260), 80), '#ffb45a', 0.55)
    a.screen(blur(a.circle(540, 190, 90), 20), '#ffd890', 0.8)
    corpo = a.poly([(505, 150), (575, 150), (565, 235), (515, 235)])
    a.fill(corpo, '#ffe4a0')
    tinta(a, [(505, 150), (575, 150), (565, 235), (515, 235)], 5, 1, True)
    a.screen(blur(a.poly([(400, 260), (680, 260), (900, S), (180, S)]), 60), '#ff9d4a', 0.18)
    acabamento(a, 0.45, 0.35, 70, (200, 100, 680, 800))
    a.save(f'{OUT}/vagao.png')


# ---------------------------------------------------------------- cabine da locomotiva (fornalha)
def locomotiva():
    a = Anime(S, S, seed=21)
    madeira(a, a.poly([(0, 0), (S, 0), (S, S), (0, S)]), '#1c1412', '#2e1c14', 0, S, 6, 0.1)
    # caldeira: placa de ferro com rebites
    cald = a.poly([(160, 120), (920, 120), (920, 760), (160, 760)])
    a.gradient(cald, '#3a3634', '#1e1a18', 120, 760)
    n = noise2d(S, S, 30, 3, 7)
    a.fill(cald * n, '#000000', 0.25)
    for x in range(190, 900, 60):
        for y in (150, 730):
            a.fill(a.circle(x, y, 7), '#6a625c'); a.fill(a.circle(x - 2, y - 2, 3), '#a8a09a')
    tinta(a, [(160, 120), (920, 120), (920, 760), (160, 760)], 6, 1, True)
    # porta da fornalha aberta: brasa
    porta = a.poly(spline([(400, 760), (400, 520), (440, 470), (640, 470), (680, 520), (680, 760)], 8))
    a.gradient(porta, '#ffe28a', '#ff5a1a', 470, 760)
    fogo = noise2d(S, S, 22, 4, 9)
    a.fill(porta * np.clip(fogo - 0.45, 0, 1) * 2, '#b3260f', 0.8)
    tinta(a, [(400, 760), (400, 520), (440, 470), (640, 470), (680, 520), (680, 760)], 8, 1)
    a.screen(blur(a.circle(540, 640, 420), 120), '#ff7a2a', 0.55)
    # manômetros de latão
    for (x, y, r) in [(300, 300, 70), (780, 290, 56), (680, 260, 38)]:
        a.fill(a.circle(x, y, r + 8), '#b88a3a'); a.fill(a.circle(x, y, r), '#f3e6c8')
        tinta(a, [(x, y), (x + r * 0.6, y - r * 0.5)], 5, 1)
        a.fill(a.circle(x, y, 6), TINTA)
        a.lines([(x + r * np.cos(t), y + r * np.sin(t)) for t in np.linspace(0, 6.3, 60)], 5, TINTA, 1)
    # canos
    for (p, q) in [((160, 420), (380, 420)), ((380, 420), (380, 300)), ((700, 420), (920, 420))]:
        a.lines([p, q], 22, '#7a5a2a'); a.lines([p, q], 6, '#d9a85a', 0.8)
    # chão de chapa com a marca da maleta que sumiu
    chao = a.poly([(0, 760), (S, 760), (S, S), (0, S)])
    a.gradient(chao, '#3a2a20', '#1a1210', 760, S)
    for k in range(-6, 7):
        tinta(a, [(540 + k * 70, 760), (540 + k * 260, S)], 2, 0.4)
    a.screen(blur(a.poly([(380, 760), (700, 760), (900, S), (180, S)]), 40), '#ff8a3a', 0.35)
    poeira = blur(a.poly([(420, 880), (700, 880), (720, 960), (400, 960)]), 3) - blur(a.poly([(445, 893), (675, 893), (690, 947), (430, 947)]), 2)
    a.fill(np.clip(poeira, 0, 1), '#e6c48a', 0.55)
    # carvão à esquerda
    for i in range(60):
        r = a.rng
        x, y = r.uniform(0, 200), r.uniform(800, S)
        a.fill(a.circle(x, y, r.uniform(10, 26)), '#0e0c0b'); a.fill(a.circle(x - 4, y - 4, 5), '#ff7a2a', 0.35)
    acabamento(a, 0.5, 0.32, 90, (300, 300, 500, 600), '#ffb46a')
    a.save(f'{OUT}/locomotiva.png')


# ---------------------------------------------------------------- teto do trem ao luar
def teto():
    a = Anime(S, S, seed=31)
    HOR = 520
    a.sky('#070b22', '#22285a', '#6a4a7a', horizon=HOR)
    r = a.rng
    for _ in range(220):
        a.fill(a.circle(r.uniform(0, S), r.uniform(0, HOR * 0.85), r.uniform(0.6, 2.6)), '#fff6e0', r.uniform(0.3, 1))
    a.fill(blur(a.circle(820, 170, 160), 40), '#aab8ff', 0.35)
    a.fill(a.circle(820, 170, 62), '#fff4d8')
    a.fill(a.circle(842, 160, 54), '#070b22', 0.12)
    a.cumulus(260, HOR - 60, 600, 200, light=(0.8, -0.5), lit='#b9b6e6', mid='#5a4d8c', shadow='#241f48', seed=5)
    for (x0, x1, t, c) in [(-80, 420, HOR - 110, '#2a2244'), (640, 1160, HOR - 80, '#2a2244'), (120, 600, HOR - 40, '#1c1834')]:
        m = a.poly([(x0 - 40, HOR + 4), (x0, t + 20), (x0 + 30, t), (x1 - 30, t), (x1, t + 20), (x1 + 40, HOR + 4)])
        a.fill(m, c); a.fill(m * (a.YY < t + 8), '#8a90d0', 0.6)
    a.field(HOR, colours=('#2a2034', '#140e1c'), bands=12, vanish=(540, HOR))
    # teto dos vagões fugindo para o horizonte (3 vagões até a locomotiva)
    VP = (540, HOR - 10)
    base = [(-120, S), (1200, S)]
    def faixa(t0, t1):
        l0, r0 = lerp(base[0], VP, t0), lerp(base[1], VP, t0)
        l1, r1 = lerp(base[0], VP, t1), lerp(base[1], VP, t1)
        return [l0, r0, r1, l1]
    for i, (t0, t1) in enumerate([(0.0, 0.42), (0.45, 0.66), (0.685, 0.79), (0.80, 0.86)]):
        q = faixa(t0, t1)
        m = a.poly(q)
        a.gradient(m, '#5a1820' if i % 2 else '#7a1c26', '#2a0c12', q[0][1], q[3][1])
        nn = noise2d(S, S, 8, 2, 40 + i)
        a.fill(m * nn, '#000000', 0.18)
        for k in range(1, 7):
            tt = k / 7
            tinta(a, [lerp(q[0], q[1], tt), lerp(q[3], q[2], tt)], 2, 0.4)
        # luz da lua na borda esquerda
        tinta(a, [q[0], q[3]], 5, 1)
        a.lines([lerp(q[0], q[1], 0.02), lerp(q[3], q[2], 0.02)], 3, '#b9cbff', 0.8)
        tinta(a, [q[3], q[2]], 5, 1)
    # vão entre vagões (escuro)
    for (t0, t1) in [(0.42, 0.45), (0.66, 0.685), (0.79, 0.80)]:
        a.fill(a.poly(faixa(t0, t1)), '#06040a')
    # chaminé e fumaça da locomotiva lá na frente
    a.fill(a.poly([(520, 410), (560, 410), (566, 450), (514, 450)]), '#0e0a0c')
    for k in range(9):
        a.fill(blur(a.circle(560 - k * 46, 380 - k * 22, 18 + k * 9), 6 + k), '#c8c4e6', 0.35 * (1 - k / 9))
    acabamento(a, 0.35, 0.35, 60, (0, 0, S, 700), '#c9d6ff')
    a.save(f'{OUT}/teto.png')


# ---------------------------------------------------------------- boca do túnel na rocha
def tunel():
    a = Anime(S, S, seed=41)
    a.sky('#0a0e26', '#1e2350', '#4a3a6a', horizon=420)
    r = a.rng
    for _ in range(120):
        a.fill(a.circle(r.uniform(0, S), r.uniform(0, 300), r.uniform(0.6, 2.2)), '#fff6e0', r.uniform(0.3, 1))
    # paredão de rocha
    topo = 140 + 40 * np.sin(np.linspace(0, 9, S)) + 30 * noise2d(1, S, 60, 3, 3)[0]
    rocha = (a.YY > topo[None, :]).astype(np.float32)
    a.gradient(rocha, '#4a3a4a', '#1c1420', 140, S)
    n = noise2d(S, S, 40, 5, 12)
    a.fill(rocha * np.clip(n - 0.5, 0, 1) * 2, '#000000', 0.5)
    a.fill(rocha * np.clip(0.55 - n, 0, 1) * 2, '#8a7a9a', 0.35)
    for k in range(14):  # fendas
        x = r.uniform(0, S); y = r.uniform(200, 900)
        tinta(a, spline([(x, y), (x + r.uniform(-60, 60), y + 80), (x + r.uniform(-60, 60), y + 170)], 6), 3, 0.6)
    # arco do túnel
    arco = spline([(330, 900), (330, 560), (380, 430), (540, 380), (700, 430), (750, 560), (750, 900)], 12)
    m = a.poly(arco)
    a.fill(m, '#030204')
    pedras = a.poly(spline([(290, 900), (290, 540), (350, 395), (540, 335), (730, 395), (790, 540), (790, 900)], 12)) - m
    a.fill(np.clip(pedras, 0, 1), '#5a4a52')
    for t in np.linspace(0.05, 0.95, 13):
        i = int(t * (len(arco) - 1))
        tinta(a, [arco[i], (540 + (arco[i][0] - 540) * 1.28, 640 + (arco[i][1] - 640) * 1.24)], 4, 0.9)
    tinta(a, arco, 7, 1)
    chao = a.poly([(0, 880), (S, 880), (S, S), (0, S)])
    a.gradient(chao, '#2a2030', '#120c16', 880, S)
    for k in range(7):
        t = (k / 7) ** 1.6
        y = 880 + 200 * t
        a.lines([(540 - 70 - 300 * t, y), (540 + 70 + 300 * t, y)], 4 + 14 * t, '#3a2a26')
    # trilhos entrando
    for side in (-1, 1):
        a.lines([(540 + side * 60, 880), (540 + side * 330, S)], 10, TINTA)
        a.lines([(540 + side * 60, 880), (540 + side * 330, S)], 3, '#b9cbff', 0.6)
    a.screen(blur(a.poly([(0, 0), (500, 0), (900, S), (300, S)]), 80), '#8aa0ff', 0.12)
    acabamento(a, 0.3, 0.4)
    a.save(f'{OUT}/tunel.png')


# ---------------------------------------------------------------- mesa de jogo à luz do lampião
def mesa():
    a = Anime(S, S, seed=51)
    m = a.poly([(0, 0), (S, 0), (S, S), (0, S)])
    a.fill(m, '#2a1a10')
    for k in range(9):
        y0 = k * 120
        tab = a.poly([(0, y0 + 4), (S, y0 + 4), (S, y0 + 116), (0, y0 + 116)])
        madeira(a, tab, '#7a5030' if k % 2 else '#6a4428', '#5a3820', y0, y0 + 120, 60 + k, 0.22, (4, 220))
        tinta(a, [(0, y0 + 2), (S, y0 + 2)], 4, 0.9)
        for x in (60 + (k * 137) % 300, 760 + (k * 71) % 200):
            a.fill(a.circle(x, y0 + 20, 6), '#2a1a10'); a.fill(a.circle(x - 1.5, y0 + 18.5, 2.5), '#c9a070')
    a.screen(blur(a.circle(560, 480, 420), 140), '#ffb45a', 0.55)
    a.fill(np.clip(1 - np.hypot(a.XX - 560, a.YY - 480) / 760, 0, 1) ** 0.1 * 0 + np.clip(np.hypot(a.XX - 560, a.YY - 480) / 700 - 0.4, 0, 1), '#0a0604', 0.75)
    acabamento(a, 0.35, 0.3, 50, (200, 150, 700, 700))
    a.save(f'{OUT}/mesa.png')


CENAS = {'vagao': vagao, 'locomotiva': locomotiva, 'teto': teto, 'tunel': tunel, 'mesa': mesa}
for nome in (sys.argv[1:] or CENAS):
    CENAS[nome]()
    print('ok', nome)
