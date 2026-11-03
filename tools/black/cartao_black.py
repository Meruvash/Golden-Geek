"""Cartão de prévia (og:image 1200×630) da Black de Verdade, para o link no WhatsApp e nas redes.

Desenhado com Pillow (roda no GitHub Actions do radar, sem navegador): fundo preto com brilho dourado, logo,
"Black de Verdade", o maior desconto real do momento, quantos jogos estão no radar e as capas das três melhores
ofertas com o selo de desconto. Só redesenha quando esses dados mudam (img/black/og-black.txt), para não gravar
uma imagem nova a cada leitura de 30 minutos. Saída: img/black/og-black.jpg.
"""
import hashlib
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
SAIDA = ROOT / "img" / "black" / "og-black.jpg"
CHAVE = ROOT / "img" / "black" / "og-black.txt"
FONTE = ROOT / "fontes" / "public-sans.ttf"
LOGO = ROOT / "marca" / "logo-eb-156.webp"
OURO, VERDE, BRANCO, CINZA = (227, 178, 60), (76, 195, 138), (255, 255, 255), (170, 177, 189)
W, H, S = 1200, 630, 2  # desenha em 2x e reduz: bordas e letras mais limpas


def fonte(tam, peso=800):
    f = ImageFont.truetype(str(FONTE), tam * S)
    try:
        f.set_variation_by_axes([peso])
    except Exception:
        pass
    return f


def pct(v):
    return f"{v * 100:.0f}%"


def selo(d, xy, texto, tam):
    """Selo dourado de desconto, como na página."""
    f = fonte(tam, 900)
    x, y = xy
    l, t, r, b = d.textbbox((0, 0), texto, font=f)
    pw, ph = 14 * S, 8 * S
    d.rounded_rectangle((x, y, x + (r - l) + 2 * pw, y + (b - t) + 2 * ph), radius=10 * S, fill=OURO)
    d.text((x + pw - l, y + ph - t), texto, font=f, fill=(17, 17, 17))


def capa_quadro(img_path, lado):
    """Capa sobre fundo branco arredondado, com sombra."""
    quadro = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    m = Image.new("L", (lado, lado), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, lado - 1, lado - 1), radius=22 * S, fill=255)
    fundo = Image.new("RGBA", (lado, lado), (255, 255, 255, 255))
    if img_path and Path(img_path).exists():
        c = Image.open(img_path).convert("RGB")
        c.thumbnail((lado - 28 * S, lado - 28 * S), Image.LANCZOS)
        fundo.paste(c, ((lado - c.width) // 2, (lado - c.height) // 2))
    quadro.paste(fundo, (0, 0), m)
    return quadro


def gerar(top, n_jogos, maior, data_txt):
    """top: até 3 ofertas (dicts do radar, com 'slug' e 'desc'); devolve o caminho relativo do cartão."""
    capas = []
    for x in top[:3]:
        g = ROOT / "img" / "black" / f"{x['slug']}-g.webp"
        p = ROOT / "img" / "black" / f"{x['slug']}.webp"
        capas.append((g if g.exists() else p, x["desc"]))
    chave = hashlib.md5(repr((n_jogos, round(maior, 2), data_txt, [(str(c), round(d, 2)) for c, d in capas],
                              FONTE.stat().st_size)).encode()).hexdigest()
    if SAIDA.exists() and CHAVE.exists() and CHAVE.read_text() == chave:
        return SAIDA
    im = Image.new("RGB", (W * S, H * S), (0, 0, 0))
    # brilho dourado no canto e faixa no pé
    brilho = Image.new("RGB", (W * S, H * S), (0, 0, 0))
    ImageDraw.Draw(brilho).ellipse((620 * S, -380 * S, 1500 * S, 520 * S), fill=(120, 88, 20))
    im = Image.blend(im, brilho.filter(ImageFilter.GaussianBlur(160 * S)), 0.9)
    d = ImageDraw.Draw(im)
    d.rectangle((0, (H - 10) * S, W * S, H * S), fill=OURO)
    # logo
    if LOGO.exists():
        lg = Image.open(LOGO).convert("RGBA")
        lg = lg.resize((int(lg.width * 58 * S / lg.height), 58 * S), Image.LANCZOS)
        im.paste(lg, (56 * S, 48 * S), lg)
    # textos da esquerda
    x0 = 56 * S
    d.text((x0, 138 * S), "RADAR DE PREÇOS · BLACK FRIDAY", font=fonte(22, 800), fill=OURO)
    d.text((x0, 168 * S), "Black de", font=fonte(78, 900), fill=BRANCO)
    d.text((x0, 250 * S), "Verdade", font=fonte(78, 900), fill=OURO)
    d.text((x0, 360 * S), f"até {pct(maior)}", font=fonte(64, 900), fill=VERDE)
    d.text((x0, 436 * S), "abaixo do preço médio real", font=fonte(28, 700), fill=BRANCO)
    d.text((x0, 480 * S), f"{n_jogos} jogos de tabuleiro com desconto de verdade", font=fonte(23, 500), fill=CINZA)
    d.text((x0, 556 * S), f"eliteboardgamers.com.br/black · {data_txt}", font=fonte(20, 700), fill=CINZA)
    # capas em leque à direita
    # a melhor oferta na frente, no centro; as outras duas atrás, inclinadas para os lados
    pos = [(790, 196, 290, -2), (640, 92, 230, -9), (950, 108, 214, 8)]  # x, y, lado, giro
    for (x, y, lado, giro), (cp, desc) in reversed(list(zip(pos, capas))):
        q = capa_quadro(cp, lado * S)
        sombra = Image.new("RGBA", (q.width + 80 * S, q.height + 80 * S), (0, 0, 0, 0))
        ImageDraw.Draw(sombra).rounded_rectangle((40 * S, 52 * S, 40 * S + q.width, 52 * S + q.height), radius=22 * S, fill=(0, 0, 0, 200))
        sombra = sombra.filter(ImageFilter.GaussianBlur(18 * S))
        sombra.paste(q, (40 * S, 40 * S), q)
        dq = ImageDraw.Draw(sombra)
        selo(dq, (52 * S, 52 * S), f"−{pct(desc)}", 38 if lado > 260 else 26)
        sombra = sombra.rotate(giro, resample=Image.BICUBIC, expand=True)
        im.paste(sombra, ((x - 40) * S, (y - 40) * S), sombra)
    im = im.resize((W, H), Image.LANCZOS)
    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    im.save(SAIDA, "JPEG", quality=86, optimize=True, progressive=True)
    CHAVE.write_text(chave)
    return SAIDA
