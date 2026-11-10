"""Fundo pintado em código (skill claude-drawing, estilo anime): deserto do faroeste ao pôr do sol,
trilhos de trem até o horizonte, postes de telégrafo, planaltos em silhueta com luz de borda.
Uso: python3 arte/fundo_deserto.py saida.png [largura] [altura]"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '.claude', 'skills', 'claude-drawing', 'lib'))
import numpy as np
from anime import Anime
from core import spline, fbm1d, blur

out = sys.argv[1] if len(sys.argv) > 1 else 'fundo_deserto.png'
W = int(sys.argv[2]) if len(sys.argv) > 2 else 1080
H = int(sys.argv[3]) if len(sys.argv) > 3 else 1920
NOITE = len(sys.argv) > 4 and sys.argv[4] == 'noite'
a = Anime(W, H, seed=1885)
HOR = int(H * 0.56)
VX = int(W * 0.58)

# céu de pôr do sol e nuvens esculpidas, iluminadas por baixo (sol baixo, à direita)
if NOITE:
    a.sky('#0d1330', '#3a2a5e', '#c9665a', horizon=HOR)
else:
    a.sky('#3b2a6b', '#e2734a', '#ffd38a', horizon=HOR)
for (x, y, w) in [(W * 0.2, H * 0.12, 420), (W * 0.75, H * 0.08, 360), (W * 0.45, H * 0.2, 300)]:
    wisp = a.poly(spline([(x - w / 2, y + 10), (x - w / 4, y - 8), (x + w / 3, y - 4), (x + w / 2, y + 6), (x, y + 16), (x - w / 2, y + 10)], 10))
    a.fill(blur(wisp, 6), '#ffd9b0', 0.5)
if NOITE:
    rng = a.rng
    for _ in range(160):
        x, y = rng.uniform(0, W), rng.uniform(0, HOR * 0.8)
        a.fill(a.circle(x, y, rng.uniform(1, 3.2)), '#fff6e0', rng.uniform(0.4, 1))
    a.fill(blur(a.circle(W * 0.74, H * 0.16, 150), 30), '#c9d6ff', 0.35)
    a.fill(a.circle(W * 0.74, H * 0.16, 78), '#fff4d8')
    a.fill(a.circle(W * 0.70, H * 0.15, 70), '#0d1330', 0.18)
    a.cumulus(W * 0.3, HOR - 90, 700, 300, light=(0.5, -0.8), lit='#b9b6e6', mid='#6c5d9c', shadow='#2c2752', seed=3)
else:
    a.cumulus(W * 0.28, HOR - 120, 760, 420, light=(0.7, 0.5), lit='#ffe0b0', mid='#f2a27c', shadow='#7d4f86', seed=3)
    a.cumulus(W * 0.86, HOR - 60, 520, 240, light=(0.7, 0.5), lit='#ffe7c2', mid='#f0a985', shadow='#7d4f86', seed=4)
    a.sun_flare(W * 0.66, HOR - 40, strength=1.1, rays=11)

# planaltos (mesas) em duas camadas, com luz de borda do sol
def mesa(x0, x1, topo, base, cor, borda):
    pts = [(x0 - 60, base), (x0, topo + 30), (x0 + 30, topo), (x1 - 30, topo), (x1, topo + 30), (x1 + 60, base)]
    m = a.poly(pts)
    a.fill(m, cor)
    a.fill(m * (a.YY < topo + 10), borda, 0.85)
for (x0, x1, t, cor) in [(-80, W * 0.32, HOR - 170, '#7a3d4f'), (W * 0.72, W + 80, HOR - 120, '#7a3d4f')]:
    mesa(x0, x1, t, HOR + 4, cor, '#ffb37a')
for (x0, x1, t, cor) in [(W * 0.08, W * 0.52, HOR - 70, '#5e2f45'), (W * 0.82, W + 120, HOR - 40, '#5e2f45')]:
    mesa(x0, x1, t, HOR + 4, cor, '#f59a63')

# chão do deserto em faixas, mais quente perto
if NOITE:
    a.field(HOR, colours=('#7a4a52', '#4a2f3f'), bands=14, vanish=(VX, HOR))
else:
    a.field(HOR, colours=('#dc9c56', '#c98546'), bands=14, vanish=(VX, HOR))
# poeira: gradiente quente rente ao horizonte
a.fill(blur(a.poly([(0, HOR - 10), (W, HOR - 10), (W, HOR + 160), (0, HOR + 160)]), 40), '#ffcf8a' if not NOITE else '#c9665a', 0.35)

# trilhos convergindo ao ponto de fuga, dormentes em perspectiva
for k in range(26):
    t = (k / 26) ** 2.2
    y = HOR + (H - HOR) * t
    half = 6 + 360 * t
    a.lines([(VX - half * 1.25, y), (VX + half * 1.25, y)], max(2, 26 * t), '#5a3a26', 0.9)
for side in (-1, 1):
    a.lines([(VX + side * 4, HOR), (VX + side * 360, H)], 9, '#2b1d14')
    a.lines([(VX + side * 4, HOR), (VX + side * 360, H)], 3, '#ffcf8a', 0.8)

# postes de telégrafo e fios caídos
tops = []
for i in range(7):
    t = 0.8 ** (i * 1.5)
    x = VX - 60 - (VX - 60 - W * 0.12) * t
    base = HOR + (H * 0.9 - HOR) * t
    tops.append(a.pole(x, base, 30 + 900 * t, width=max(2, 16 * t), colour='#2b1d14'))
for i in range(len(tops) - 1):
    a.wire(tops[i], tops[i + 1], sag=50 * 0.8 ** (i * 1.5), width=2, colour='#2b1d14')

# cactos em silhueta no primeiro plano e poeira dourada no ar
for (x, h) in [(W * 0.9, 420), (W * 0.06, 300)]:
    corpo = a.poly([(x - 26, H), (x - 26, H - h), (x + 26, H - h), (x + 26, H)]) + a.circle(x, H - h, 26)
    braco = a.poly([(x + 20, H - h * 0.55), (x + 84, H - h * 0.55), (x + 84, H - h * 0.82), (x + 62, H - h * 0.82), (x + 62, H - h * 0.62), (x + 20, H - h * 0.62)])
    m = np.clip(corpo + braco, 0, 1)
    a.fill(m, '#2f4a2a' if not NOITE else '#1f2a26')
    a.fill(m * (a.XX > x + 4), '#5f7a3a' if not NOITE else '#3a4a5a', 0.85)
    for k in (-14, 0, 14):
        a.lines([(x + k, H - h + 30), (x + k, H)], 2, '#1d2a18', 0.5)
a.sparkles(70, box=(0, HOR - 200, W, H * 0.8), size=(1.5, 3.5), colour='#ffe7b0' if not NOITE else '#c9d6ff')
a.bloom(threshold=0.8, radius=22, amount=0.4)
a.vignette(0.22)
a.save(out)
print('ok', out)
