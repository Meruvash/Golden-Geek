"""Gera a página de uma resenha (padrão Prompt Mestre 3.0) a partir de conteudo/<slug>.md.

Uso: python3 tools/build_review_md.py conteudo/<slug>.md
O arquivo começa com um cabeçalho entre '---' (slug, jogo, cor, og_titulo, descricao, consulta)
e segue em Markdown. A imagem <slug>/infografico.webp entra logo depois da linha fina.
"""
import html
import re
import sys
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://meruvash.github.io/Golden-Geek"


def parse(path):
    raw = Path(path).read_text(encoding="utf-8")
    _, head, body = raw.split("---", 2)
    meta = {}
    for line in head.strip().splitlines():
        k, v = line.split(":", 1)
        meta[k.strip()] = v.strip().strip('"')
    return meta, body


def build(meta, body):
    slug = meta["slug"]
    e = html.escape
    content = markdown.markdown(body, extensions=["tables"])
    fig = (
        '<figure><a href="infografico.webp" target="_blank" rel="noopener">'
        f'<img src="infografico.webp" alt="Infográfico Elite Boardgamers sobre {e(meta["jogo"])}"></a>'
        "<figcaption>Toque na imagem para ver em tamanho cheio.</figcaption></figure>"
    )
    # infográfico logo após a linha fina
    content = re.sub(r'(<p class="linhafina">.*?</p>)', r"\1" + fig.replace("\\", "\\\\"), content, count=1, flags=re.S)
    # tabelas roláveis no celular
    def wrap(m):
        cols = m.group(0).split("</thead>")[0].count("<th")
        cls = "tablewrap wide" if cols > 2 else "tablewrap"
        return f'<div class="{cls}">{m.group(0)}</div>'

    content = re.sub(r"<table>.*?</table>", wrap, content, flags=re.S)
    # o veredito ganha moldura dourada
    content = re.sub(
        r"(<h2>Veredito Elite Boardgamers</h2>.*?<p class=\"tagline\">.*?</p>)",
        r'<section class="verdict">\1</section>',
        content,
        flags=re.S,
    )
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Resenha {e(meta["jogo"])} | Elite Boardgamers</title>
<meta name="description" content="{e(meta["descricao"])}">
<meta property="og:title" content="{e(meta["og_titulo"])}">
<meta property="og:description" content="{e(meta["descricao"])}">
<meta property="og:type" content="article">
<meta property="og:url" content="{SITE}/{slug}/">
<meta property="og:image" content="{SITE}/{slug}/capa.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{{--bg:#0a0c11;--card:#121620;--card2:#171c28;--line:#252c3b;--ink:#e9ecf2;--muted:#9ba4b4;--gold:#f2c14e;--good:#4ade80;--bad:#f2555a;--a:{meta.get("cor", "#f2c14e")}}}
*{{box-sizing:border-box}}
html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}}
.wrap{{max-width:820px;margin:0 auto;padding:0 16px 48px}}
a{{color:var(--a)}}
h1,h2,h3,.top .brand{{font-family:Oswald,Impact,"Arial Narrow",sans-serif;letter-spacing:.01em}}
.top{{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 0;font-size:.85rem;color:var(--muted)}}
.top a{{color:var(--muted);text-decoration:none}}
.top .brand{{color:var(--gold);letter-spacing:.08em}}
article>p:first-child{{font-size:.82rem;color:var(--muted);border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin:8px 0 22px}}
article>p:first-child strong{{font-weight:500}}
.eyebrow{{font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin:0 0 8px}}
h1{{font-size:clamp(1.9rem,5.5vw,2.9rem);line-height:1.08;margin:0 0 12px;text-transform:uppercase}}
.linhafina{{font-size:1.1rem;color:#cdd3de;margin:0 0 8px}}
h2{{font-size:1.6rem;line-height:1.2;margin:46px 0 14px;text-transform:uppercase;border-left:4px solid var(--a);padding-left:12px}}
p{{margin:0 0 14px}}
figure{{margin:22px 0 30px}}
figure a{{display:block;border-radius:14px;overflow:hidden;border:1px solid var(--line)}}
figure img{{display:block;width:100%;height:auto}}
figcaption{{font-size:.82rem;color:var(--muted);margin-top:8px;text-align:center}}
.tablewrap{{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--card);margin:0 0 12px}}
table{{width:100%;border-collapse:collapse;font-size:.92rem}}
.wide table{{min-width:600px}}
th,td{{padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}}
tr:last-child td{{border-bottom:0}}
thead th{{font-family:Oswald,sans-serif;font-weight:500;text-transform:uppercase;letter-spacing:.03em;background:var(--card2);color:var(--muted)}}
td:first-child{{color:var(--muted);font-weight:600;white-space:nowrap}}
ol,ul{{padding-left:22px}}
li{{margin-bottom:6px}}
.verdict{{margin-top:46px;border:1px solid rgba(242,193,78,.45);background:linear-gradient(180deg,rgba(242,193,78,.1),rgba(242,193,78,.02));border-radius:16px;padding:6px 20px 20px}}
.verdict h2{{border:0;padding:0;color:var(--gold)}}
.selo{{display:inline-block;font-weight:700;font-size:.85rem;letter-spacing:.06em;text-transform:uppercase;background:var(--gold);color:#1b1503;border-radius:6px;padding:4px 12px}}
.tagline{{font-family:Oswald,sans-serif;font-size:1.15rem;line-height:1.35;color:var(--gold);text-align:center;margin:18px 0 0}}
footer{{margin-top:40px;padding-top:18px;border-top:1px solid var(--line);font-size:.84rem;color:var(--muted);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}}
footer a{{color:var(--muted)}}
@media (max-width:640px){{td:first-child{{white-space:normal}} h2{{font-size:1.35rem}}}}
</style>
</head>
<body>
<div class="wrap">
<nav class="top"><span class="brand">♛ ELITE BOARDGAMERS</span><a href="../resenhas/">Todas as resenhas →</a></nav>
<article>
{content}
</article>
<footer><span>Resenha · Elite Boardgamers</span><span><a href="../resenhas/">Todas as resenhas</a> · <a href="../">Consulta Golden Geek</a></span></footer>
</div>
</body>
</html>
"""


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        meta, body = parse(arg)
        out = ROOT / meta["slug"] / "index.html"
        out.parent.mkdir(exist_ok=True)
        out.write_text(build(meta, body), encoding="utf-8")
        print("ok", out.relative_to(ROOT))
