"""Gera resenhas/index.html a partir das resenhas publicadas em pauta.json (mais recente primeiro).

Uso: python3 tools/build_lista.py
Lê conteudo/<slug>.json de cada resenha publicada.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_review import INSTAGRAM, ROOT, SITE, WHATSAPP, campo, e, faixa_nota, icone, numero, selo_class  # noqa: E402


def card(c):
    nota = numero(campo(c["ficha"], "nota bgg"))
    vit = sum(1 for a in c["premiacoes"] if a["resultado"] == "vencedor")
    titulo = c["og_titulo"].split(" Resenha")[0]
    nota_html = f'<span class="nota {faixa_nota(nota)}" aria-label="Nota BGG {nota:.1f}">{f"{nota:.1f}".replace(".", ",")}</span>' if nota else ""
    premio = f'<span class="vit">{vit} vitória{"s" if vit != 1 else ""} em prêmios</span>' if vit else ""
    return f"""  <li><a class="card" href="../{c["slug"]}/">
   <span class="capa"><img src="../{c["slug"]}/capa.jpg" width="800" height="800" alt="{e(c["alt"])}" loading="lazy">{nota_html}</span>
   <span class="corpo">
    <span class="selo {selo_class(c["selo"])}">{e(c["selo"])}</span>
    <h2>{e(titulo)}</h2>
    <span class="tag">{e(c["tagline"])}</span>
    {premio}
   </span>
  </a></li>
"""


def build():
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    slugs = [p["url"].rstrip("/").split("/")[-1] for p in reversed(pauta["publicadas"])]
    cards = "".join(card(json.loads((ROOT / "conteudo" / f"{s}.json").read_text(encoding="utf-8"))) for s in slugs)
    n = len(slugs)
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<title>Resenhas Elite Boardgamers</title>
<meta name="description" content="Resenhas de jogos de tabuleiro premiados, com fontes: o que funciona, pontos de atenção e para quem é cada jogo.">
<meta property="og:title" content="Resenhas Elite Boardgamers">
<meta property="og:description" content="Resenhas de jogos de tabuleiro premiados, com fontes: o que funciona, pontos de atenção e para quem é cada jogo.">
<meta property="og:type" content="website">
<meta property="og:url" content="{SITE}/resenhas/">
<meta property="og:image" content="{SITE}/resenhas/capa.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#000000">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="preload" href="../fontes/public-sans.woff2" as="font" type="font/woff2" crossorigin>
<style>
@font-face{{font-family:"Public Sans";src:url(../fontes/public-sans.woff2) format("woff2");font-weight:400 800;font-display:swap}}
:root{{color-scheme:dark;--ink:#eceff3;--muted:#a1a9b5;--line:#262a32;--gold:#e3b23c;--zap:#157a43;--n9:#1d7d48;--n7:#2366a8;--n6:#6b4ea3;--n5:#b23a48}}
*{{box-sizing:border-box}}
html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:#000;color:var(--ink);font:16px/1.6 "Public Sans",system-ui,sans-serif}}
h1,h2,p,ul{{margin:0}}ul{{padding:0;list-style:none}}img{{display:block;max-width:100%;height:auto}}a{{color:inherit}}
::selection{{background:var(--gold);color:#000}}
:focus-visible{{outline:3px solid var(--gold);outline-offset:2px;border-radius:3px}}
.in{{max-width:1120px;margin:0 auto;padding:0 16px}}
.ic{{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}}
.bar{{border-bottom:1px solid var(--line)}}
.bar .in{{display:flex;align-items:center;gap:12px;padding-top:8px;padding-bottom:8px}}
.bar a{{text-decoration:none;font-weight:600;font-size:.95rem}}
.marca img{{width:84px;border-radius:6px}}
.bar .ig,.bar .zap-mini{{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px}}
.bar .ig{{margin-left:auto}}.bar .ig:hover{{color:var(--gold)}}
.bar .zap-mini{{background:var(--zap);color:#fff}}.bar .zap-mini:hover{{background:#11683a}}
.bar .gg{{border:1px solid #3a3f48;border-radius:6px;padding:6px 12px}}.bar .gg:hover{{border-color:var(--gold)}}
@media (max-width:700px){{.bar .ig span,.bar .zap-mini span,.gg-l{{display:none}}.bar .gg{{padding:6px 10px}}}}
@media (max-width:560px){{.grid{{grid-template-columns:1fr 1fr;gap:12px}}.corpo{{padding:10px 12px 14px}}.card h2{{font-size:1rem}}.tag{{font-size:.84rem}}.nota{{width:38px;height:44px;font-size:.85rem;right:6px;bottom:6px}}}}
.topo{{padding:36px 0 24px;display:grid;gap:18px}}
h1{{font-size:clamp(2.2rem,6vw,3.4rem);line-height:1.05;font-weight:800;letter-spacing:-.02em}}
.lede{{color:#c9cfd8;max-width:62ch;font-size:1.05rem}}
.zap{{display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:10px;background:var(--zap);color:#fff;text-decoration:none;max-width:520px;transition:background-color .2s ease,transform .2s ease}}
.zap:hover{{background:#11683a}}.zap:active{{transform:scale(.98)}}
.zap .ic{{width:30px;height:30px;flex:none}}.zap b{{display:block;font-size:1.05rem}}.zap small{{display:block;font-size:.85rem;opacity:.92}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:18px;padding:8px 0 48px}}
.card{{display:flex;flex-direction:column;height:100%;background:#f4f5f7;color:#14171c;border-radius:12px;overflow:hidden;text-decoration:none;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s ease}}
.card:hover{{transform:translateY(-3px);box-shadow:0 10px 30px rgba(0,0,0,.55)}}
.capa{{position:relative;display:block}}.capa img{{aspect-ratio:1;object-fit:cover;width:100%}}
.nota{{position:absolute;right:10px;bottom:10px;width:46px;height:52px;display:grid;place-items:center;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);color:#fff;font-weight:800;font-variant-numeric:tabular-nums}}
.n9{{background:var(--n9)}}.n7{{background:var(--n7)}}.n6{{background:var(--n6)}}.n5{{background:var(--n5)}}
.corpo{{display:grid;gap:6px;padding:14px 16px 18px;align-content:start}}
.selo{{justify-self:start;font-weight:800;font-size:.76rem;line-height:1.35;border-radius:6px;padding:3px 9px;color:#fff;background:#157a43}}
.selo.publico{{background:#8a5200}}.selo.nao{{background:#a3223a}}
.card h2{{font-size:1.2rem;line-height:1.2;font-weight:800}}
.tag{{font-size:.92rem;color:#3a414c}}
.vit{{font-size:.82rem;color:#5a6270;display:flex;align-items:center;gap:6px}}
.vit::before{{content:"";width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f7d77a,var(--gold) 60%,#b9871d)}}
footer{{border-top:1px solid var(--line);font-size:.88rem}}
footer .in{{display:flex;flex-wrap:wrap;gap:10px 20px;padding-top:18px;padding-bottom:18px}}
</style>
</head>
<body>
<header class="bar"><div class="in">
 <a class="marca" href="./"><img src="../marca/elite-boardgamers.webp" width="318" height="254" alt="Elite Boardgamers"></a>
 <a class="ig" href="{INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram @eliteboardgamers">{icone("insta")}<span>@eliteboardgamers</span></a>
 <a class="zap-mini" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap")}<span>Grupo do WhatsApp</span></a>
 <a class="gg" href="../">Consulta <span class="gg-l">Golden Geek</span></a>
</div></header>
<main class="in">
 <section class="topo">
  <h1>Resenhas de jogos premiados</h1>
  <p class="lede">{n} resenhas com fontes: como funciona, o que funciona, pontos de atenção e para quem é cada jogo. Só entram jogos premiados no Golden Geek, Spiel des Jahres, Kennerspiel, As d'Or e Deutscher Spiele Preis.</p>
  <a class="zap" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap")}<span><b>Entre no grupo do WhatsApp</b><small>Receba as novas resenhas e converse sobre jogos</small></span></a>
 </section>
 <ul class="grid">
{cards} </ul>
</main>
<footer><div class="in">
 <span>Elite Boardgamers</span>
 <a href="../">Consulta Golden Geek 2015–2025</a>
 <a href="{INSTAGRAM}" target="_blank" rel="noopener">Instagram @eliteboardgamers</a>
 <a href="{WHATSAPP}" target="_blank" rel="noopener">Grupo do WhatsApp</a>
</div></footer>
</body>
</html>
"""


if __name__ == "__main__":
    (ROOT / "resenhas" / "index.html").write_text(build(), encoding="utf-8")
    print("ok resenhas/index.html")
