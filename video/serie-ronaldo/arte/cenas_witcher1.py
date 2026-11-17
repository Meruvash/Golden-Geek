"""Pinturas em código de "O bruxo no pôquer" (The Witcher: Old World), padrão web documentário:
- taverna: óleo com pinceladas em relevo, à maneira de Bruegel (paleta de terra, gente pequena, de costas);
- bestiario: gravura a buril com hachuras, à maneira de Dürer (monstros genéricos saindo do pântano).
Uso (da pasta do projeto): python3 arte/cenas_witcher1.py [taverna|bestiario] -> public/img/witcher1/<nome>.png"""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '.claude', 'skills', 'claude-drawing', 'lib'))
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from oilpaint import OilPainting, hexc
from core import blur, noise2d

S = 1080
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'img', 'witcher1')
os.makedirs(OUT, exist_ok=True)


def mask_poly(pts):
    im = Image.new('L', (S, S), 0)
    ImageDraw.Draw(im).polygon(pts, fill=255)
    return np.asarray(im, np.float32) / 255


def mask_ellipse(cx, cy, rx, ry):
    im = Image.new('L', (S, S), 0)
    ImageDraw.Draw(im).ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)
    return np.asarray(im, np.float32) / 255


def pinta(ref, m, cor):
    ref[m > 0.5] = hexc(cor)


# ---------------------------------------------------------------- taverna à maneira de Bruegel
def taverna():
    YY, XX = np.mgrid[0:S, 0:S].astype(np.float32)
    ref = np.zeros((S, S, 3), np.float32)
    ref[:] = hexc('#4a3424')                                        # parede de madeira escura
    ref[:] = ref * (0.75 + 0.35 * (1 - YY / S))[..., None]
    pinta(ref, mask_poly([(0, 0), (S, 0), (S, 120), (0, 160)]), '#2e2018')            # teto com vigas
    for x in (150, 450, 760):
        pinta(ref, mask_poly([(x, 0), (x + 46, 0), (x + 40, 150), (x - 6, 156)]), '#24170f')
    # janela em arco com luz de fim de tarde
    jan = mask_poly([(120, 520), (120, 330), (160, 270), (240, 250), (320, 270), (360, 330), (360, 520)])
    pinta(ref, jan, '#e8b65a')
    pinta(ref, mask_poly([(232, 250), (248, 250), (248, 520), (232, 520)]), '#3a2618')
    pinta(ref, mask_poly([(120, 380), (360, 380), (360, 392), (120, 392)]), '#3a2618')
    # lareira com fogo à direita
    lar = mask_poly([(700, 640), (700, 360), (1000, 360), (1000, 640)])
    pinta(ref, lar, '#5a4a42')
    boca = mask_poly([(760, 640), (760, 470), (790, 430), (910, 430), (940, 470), (940, 640)])
    pinta(ref, boca, '#1a0c06')
    fogo = mask_poly([(790, 640), (810, 560), (835, 600), (850, 520), (870, 590), (895, 545), (910, 640)])
    pinta(ref, fogo, '#ff9a2a')
    pinta(ref, mask_poly([(820, 640), (840, 590), (850, 560), (865, 600), (880, 640)]), '#ffe28a')
    # chão e mesa comprida em primeiro plano
    pinta(ref, mask_poly([(0, 720), (S, 690), (S, S), (0, S)]), '#5e4430')
    mesa = mask_poly([(60, 840), (S - 40, 800), (S, S), (0, S)])
    pinta(ref, mesa, '#8a5e36')
    pinta(ref, mask_poly([(60, 840), (S - 40, 800), (S - 40, 815), (60, 856)]), '#b58552')
    # barris empilhados à esquerda
    for (cx, cy) in [(90, 700), (210, 700), (150, 590)]:
        pinta(ref, mask_ellipse(cx, cy, 62, 70), '#7a5232')
        pinta(ref, mask_poly([(cx - 62, cy - 8), (cx + 62, cy - 8), (cx + 62, cy + 4), (cx - 62, cy + 4)]), '#2e2018')
    # gente pequena de costas (à maneira de Bruegel): chapéus, capuzes vermelhos e ocre
    for i, (x, y, c) in enumerate([(420, 680, '#8a2a1e'), (540, 670, '#b88a3a'), (660, 685, '#3a4a5a'), (300, 690, '#7a6a3a')]):
        corpo = mask_poly([(x - 52, y + 140), (x - 40, y + 14), (x + 40, y + 14), (x + 52, y + 140)])
        pinta(ref, corpo, c)
        pinta(ref, mask_ellipse(x, y - 8, 30, 32), '#c89a6a' if i % 2 else '#2a1e18')
    # luz quente do fogo e da janela
    luz = np.clip(1 - np.hypot(XX - 850, YY - 560) / 520, 0, 1) ** 1.6
    ref = ref * (0.8 + 0.6 * luz)[..., None] + np.array([0.18, 0.08, 0.0]) * luz[..., None]
    luz2 = np.clip(1 - np.hypot(XX - 240, YY - 400) / 380, 0, 1) ** 2
    ref = np.clip(ref + np.array([0.12, 0.09, 0.03]) * luz2[..., None], 0, 1)
    ang = np.full((S, S), 0.0, np.float32) + 0.6 * (noise2d(S, S, 200, 2, 3) - 0.5)
    ang[YY < 160] = 0.05
    ang[fogo > 0.5] = -1.4
    o = OilPainting(S, S, seed=5)
    o.layer(ref, ang, length=(50, 90), width=(20, 30), density=3.2, value_jitter=0.04)
    o.layer(ref, ang, length=(24, 46), width=(9, 15), density=2.2, value_jitter=0.05)
    o.layer(ref, ang, length=(10, 20), width=(4, 7), density=1.0, value_jitter=0.05)
    img = Image.fromarray((o.render(relief=1.3, spec=0.06) * 255).astype(np.uint8))
    img.save(f'{OUT}/taverna.png')


# ---------------------------------------------------------------- bestiário à maneira de Dürer (gravura a buril)
def bestiario():
    papel = np.ones((S, S, 3), np.float32) * hexc('#ece2c8')
    papel *= (0.94 + 0.06 * noise2d(S, S, 60, 3, 9))[..., None]
    tinta = Image.new('L', (S, S), 0)
    d = ImageDraw.Draw(tinta)

    def hachura(m, ang, passo, larg=2, sobra=0.0):
        im = Image.new('L', (S, S), 0); dd = ImageDraw.Draw(im)
        a = np.radians(ang); dx, dy = np.cos(a), np.sin(a)
        for k in range(-S * 2, S * 2, passo):
            x0, y0 = S / 2 - dy * k, S / 2 + dx * k
            dd.line([(x0 - dx * 2000, y0 - dy * 2000), (x0 + dx * 2000, y0 + dy * 2000)], fill=255, width=larg)
        h = np.asarray(im, np.float32) / 255 * m
        return h

    acc = np.zeros((S, S), np.float32)
    YY, XX = np.mgrid[0:S, 0:S].astype(np.float32)
    ceu = (YY < 520).astype(np.float32)
    acc = np.maximum(acc, hachura(ceu * (YY < 300), 0, 9, 1))                        # céu em linhas horizontais finas
    pantano = (YY > 600).astype(np.float32)
    acc = np.maximum(acc, hachura(pantano, -8, 7, 2))
    acc = np.maximum(acc, hachura(pantano * (YY > 820), 40, 7, 2))
    # morros e árvores mortas ao fundo
    morro = mask_poly([(0, 560), (200, 470), (420, 520), (640, 440), (880, 510), (S, 470), (S, 620), (0, 620)])
    acc = np.maximum(acc, hachura(morro, 25, 6, 2))
    for x in (110, 960):
        d.line([(x, 640), (x + 6, 420)], fill=255, width=10)
        d.line([(x + 4, 500), (x + 60, 450)], fill=255, width=5); d.line([(x + 4, 470), (x - 50, 430)], fill=255, width=5)
    # monstros genéricos (desenho nosso): afogadores curvados saindo da água, lobos no morro, grifo no céu
    def afogador(x, y, k, vira):
        sx = -1 if vira else 1
        P = lambda pts: [(x + sx * px * k, y + py * k) for px, py in pts]
        corpo = P([(-40, 120), (-46, 40), (-30, -10), (0, -40), (40, -50), (70, -30), (80, 0), (60, 40), (50, 120)])
        cabeca = P([(60, -40), (80, -80), (110, -84), (128, -64), (120, -36), (96, -24)])
        braco = P([(60, -10), (110, 30), (150, 90), (160, 130), (146, 132), (134, 96), (96, 46), (50, 20)])
        garras = [P([(148 + 6 * i, 128), (152 + 6 * i, 152), (158 + 6 * i, 130)]) for i in range(3)]
        for pts in [corpo, cabeca, braco] + garras:
            m = mask_poly(pts); acc[:] = np.maximum(acc, hachura(m, 45, 5, 2)); acc[:] = np.maximum(acc, hachura(m, -45, 5, 2))
            d.line(pts + [pts[0]], fill=255, width=3)
        ex, ey = P([(104, -64)])[0]
        d.ellipse([ex - 5, ey - 4, ex + 5, ey + 4], fill=0)
        d.line(P([(30, -40), (40, -70)]) , fill=255, width=2); d.line(P([(50, -46), (64, -72)]), fill=255, width=2)  # espinhos
    def lobo(x, y, k):
        P = lambda pts: [(x + px * k, y + py * k) for px, py in pts]
        pts = P([(-60, 0), (-50, -30), (-10, -40), (30, -40), (50, -60), (56, -96), (64, -70), (74, -66), (90, -100), (92, -60), (80, -40), (70, 0), (60, 0), (56, -20), (20, -16), (0, 0), (-10, 0), (-20, -14), (-50, -10), (-50, 0), (-70, 6), (-90, -20), (-70, -10)])
        m = mask_poly(pts); acc[:] = np.maximum(acc, hachura(m, 30, 4, 2)); acc[:] = np.maximum(acc, hachura(m, -30, 4, 2)); acc[:] = np.maximum(acc, hachura(m, 90, 4, 1))
        d.line(pts + [pts[0]], fill=255, width=3)
    def grifo(x, y, k):
        P = lambda pts: [(x + px * k, y + py * k) for px, py in pts]
        asa1 = P([(-10, -10), (-60, -90), (-140, -150), (-120, -110), (-170, -120), (-130, -80), (-170, -70), (-110, -40), (-60, 0)])
        asa2 = P([(20, -10), (60, -100), (140, -160), (120, -110), (170, -110), (130, -70), (160, -50), (90, -30), (50, 4)])
        corpo = P([(-60, 10), (-30, -20), (40, -20), (80, 0), (60, 30), (-40, 30)])
        cabeca = P([(70, -10), (100, -36), (130, -30), (150, -16), (126, -10), (110, 6)])
        cauda = P([(-60, 14), (-110, 30), (-140, 20), (-120, 40), (-60, 30)])
        for pts in [asa1, asa2, corpo, cabeca, cauda]:
            m = mask_poly(pts); acc[:] = np.maximum(acc, hachura(m, 60, 5, 2)); acc[:] = np.maximum(acc, hachura(m, -20, 6, 1))
            d.line(pts + [pts[0]], fill=255, width=3)
        for i in range(5):
            d.line(P([(-60 - 18 * i, -60 + 6 * i), (-100 - 14 * i, -100 + 4 * i)]), fill=255, width=2)
            d.line(P([(60 + 18 * i, -60 + 6 * i), (100 + 14 * i, -100 + 4 * i)]), fill=255, width=2)
    afogador(250, 650, 1.0, False); afogador(560, 670, 1.15, True); afogador(800, 690, 0.85, False)
    lobo(360, 505, 0.85); lobo(730, 470, 0.75)
    grifo(560, 250, 1.0)
    # moldura de gravura
    d.rectangle([40, 40, S - 40, S - 40], outline=255, width=6)
    d.rectangle([56, 56, S - 56, S - 56], outline=255, width=2)
    linhas = np.maximum(acc, np.asarray(tinta, np.float32) / 255)
    linhas = np.asarray(Image.fromarray((linhas * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6)), np.float32) / 255
    ink = hexc('#1e1a16')
    img = papel * (1 - linhas[..., None]) + ink * linhas[..., None]
    Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).save(f'{OUT}/bestiario.png')


CENAS = {'taverna': taverna, 'bestiario': bestiario}
for nome in (sys.argv[1:] or CENAS):
    CENAS[nome]()
    print('ok', nome)
