"""Monta o storyboard do GIF promocional (grade 4 colunas, quadros numerados) a partir dos quadros de teaser.
Chamado por ferramentas/teaser.mjs; também roda sozinho: python3 ferramentas/storyboard.py ferramentas/teaser-<ep>.json"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

cfg = json.load(open(sys.argv[1]))
F = "/usr/share/fonts/opentype/inter/"
fb = lambda n: ImageFont.truetype(F + "Inter-Black.otf", n)
fm = lambda n: ImageFont.truetype(F + "InterDisplay-Bold.otf", n)
quadros = [q for q in cfg["quadros"] if q.get("storyboard", True)][:16]
C, L, T, COL = 540, 64, 230, 4
linhas = (len(quadros) + COL - 1) // COL
W, H = COL * C, T + linhas * (C + L) + 110
img = Image.new("RGB", (W, H), "#120a1c"); d = ImageDraw.Draw(img)
arco = ["#e2364f", "#f2843a", "#f2d23a", "#4ac06a", "#3a8fd6", "#3a4ab8", "#9a4ad6"]
d.text((60, 48), cfg["titulo"].upper(), font=fb(78), fill="#fff6ff")
d.text((62, 146), cfg.get("subtitulo", f"Storyboard do episódio · {len(quadros)} quadros em ordem · série Elite Boardgamers"), font=fm(34), fill="#d9c8ff")
for i, c in enumerate(arco):
    d.rectangle([60 + i * 120, 205, 60 + (i + 1) * 120 - 6, 214], fill=c)
for k, q in enumerate(quadros):
    x, y = (k % COL) * C, T + (k // COL) * (C + L)
    img.paste(Image.open(os.path.join(cfg["pasta"], q["nome"] + ".jpg")).resize((C, C), Image.LANCZOS), (x, y))
    d.rectangle([x, y + C, x + C, y + C + L], fill="#1c1228")
    d.ellipse([x + 14, y + C + 10, x + 58, y + C + 54], fill="#ffcf5a")
    n = str(k + 1); d.text((x + 36 - d.textlength(n, font=fb(28)) / 2, y + C + 15), n, font=fb(28), fill="#120a1c")
    d.text((x + 72, y + C + 14), q["rotulo"], font=fm(30), fill="#fff6ff")
    d.line([x, y, x, y + C + L], fill="#120a1c", width=4)
if cfg.get("link"):
    d.text((60, H - 80), cfg["link"], font=fm(36), fill="#ffcf5a")
saida = os.path.join(cfg["pasta"], "storyboard-gif.jpg")
img.save(saida, quality=92)
print("storyboard", saida, img.size)
