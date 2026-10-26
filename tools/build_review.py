"""Gera a página de uma resenha a partir de um JSON de conteúdo.

Uso: python3 tools/build_review.py conteudo/<slug>.json
Saída: <slug>/index.html (o infografico.webp e a capa.jpg ficam na mesma pasta).
"""
import html
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://meruvash.github.io/Golden-Geek"
e = html.escape


def sev_class(s):
    s = s.lower()
    return "grave" if "grave" in s else ("leve" if "leve" in s else "moderada")


def build(c):
    slug = c["slug"]
    accent = c.get("cor", "#f2c14e")
    premios = "".join(
        f'<li class="aw{" win" if a["resultado"] == "vencedor" else ""}"><span class="aw-y">{a["ano"]}</span>'
        f'<span class="aw-p">{e(a["premio"])}</span><span class="aw-c">{e(a["categoria"])}</span>'
        f'<span class="aw-r">{e(a["rotulo"])}</span></li>'
        for a in c["premiacoes"]
    )
    ficha = "".join(
        f'<tr><th>{e(k)}</th><td{" class=na" if "não confirmad" in v.lower() else ""}>{e(v)}</td></tr>'
        for k, v in c["ficha"]
    )
    como = "".join(f"<p>{e(p)}</p>" for p in c["como_funciona"])
    funciona = "".join(f"<li><strong>{e(t)}</strong><p>{e(x)}</p></li>" for t, x in c["funciona"])
    atencao = "".join(
        f'<li><span class="sev {sev_class(s)}">{e(s)}</span><strong>{e(t)}</strong><p>{e(x)}</p></li>'
        for s, t, x in c["atencao"]
    )
    sim = "".join(f"<li>{e(x)}</li>" for x in c["para_quem"])
    nao = "".join(f"<li>{e(x)}</li>" for x in c["nao_e_para"])
    fontes = "".join(
        f'<li><a href="{e(u)}" target="_blank" rel="noopener">{e(n)}</a> — {e(uso)}</li>' for n, u, uso in c["fontes"]
    )
    tags = "".join(f'<span class="tag">{e(t)}</span>' for t in c["tags"])
    serie = f'<p class="note">{e(c["serie"])}</p>' if c.get("serie") else ""
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Resenha {e(c["jogo"])} | Elite Boardgamers</title>
<meta name="description" content="{e(c["descricao"])}">
<meta property="og:title" content="{e(c["og_titulo"])}">
<meta property="og:description" content="{e(c["descricao"])}">
<meta property="og:type" content="article">
<meta property="og:url" content="{SITE}/{slug}/">
<meta property="og:image" content="{SITE}/{slug}/capa.jpg">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="800">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{{--bg:#0a0c11;--card:#121620;--card2:#171c28;--line:#252c3b;--ink:#e9ecf2;--muted:#9ba4b4;--gold:#f2c14e;--good:#4ade80;--bad:#f2555a;--a:{accent}}}
*{{box-sizing:border-box}}
html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}}
.wrap{{max-width:860px;margin:0 auto;padding:0 16px 48px}}
a{{color:var(--a)}}
h1,h2,h3,.disp{{font-family:Oswald,Impact,"Arial Narrow",sans-serif;letter-spacing:.01em}}
h2{{font-size:1.7rem;line-height:1.2;margin:48px 0 14px;text-transform:uppercase}}
h2 .k{{color:var(--gold)}}
p{{margin:0 0 14px}}
.top{{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 0;font-size:.85rem;color:var(--muted)}}
.top a{{color:var(--muted);text-decoration:none}}
.top a:hover{{color:var(--ink)}}
.hero{{padding:28px 0 8px}}
.eyebrow{{font-size:.78rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}}
.hero h1{{font-size:clamp(2rem,6vw,3.1rem);line-height:1.05;margin:0 0 14px;text-transform:uppercase}}
.hero h1 span{{color:var(--a)}}
.lede{{font-size:1.1rem;color:#cdd3de;max-width:62ch}}
.tags{{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 0}}
.tag{{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:5px 12px;font-size:.84rem}}
.meta{{margin-top:14px;font-size:.82rem;color:var(--muted)}}
figure{{margin:28px 0 0}}
figure a{{display:block;border-radius:14px;overflow:hidden;border:1px solid var(--line)}}
figure img{{display:block;width:100%;height:auto}}
figcaption{{font-size:.82rem;color:var(--muted);margin-top:8px;text-align:center}}
.awards{{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:10px}}
.aw{{display:grid;grid-template-columns:auto 1fr;column-gap:12px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 14px}}
.aw.win{{border-color:rgba(242,193,78,.55);background:linear-gradient(180deg,rgba(242,193,78,.1),rgba(242,193,78,.02))}}
.aw-y{{grid-row:span 3;font-family:Oswald,sans-serif;font-size:1.4rem;color:var(--muted);line-height:1.1}}
.aw.win .aw-y{{color:var(--gold)}}
.aw-p{{font-weight:700}}
.aw-c{{font-size:.86rem;color:#cdd3de}}
.aw-r{{font-size:.76rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}}
.aw.win .aw-r{{color:var(--gold)}}
.tablewrap{{border:1px solid var(--line);border-radius:14px;background:var(--card);overflow:hidden}}
table{{width:100%;border-collapse:collapse;font-size:.94rem}}
th,td{{padding:11px 14px;text-align:left;vertical-align:top;border-bottom:1px solid var(--line)}}
tr:last-child th,tr:last-child td{{border-bottom:0}}
th{{width:38%;font-weight:600;color:var(--muted);font-size:.86rem}}
td.na{{color:var(--muted);font-style:italic}}
.note{{font-size:.84rem;color:var(--muted);margin-top:10px}}
.list{{list-style:none;margin:0;padding:0;display:grid;gap:10px}}
.list li{{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--c);border-radius:12px;padding:14px 16px}}
.list.good li{{--c:var(--good)}} .list.bad li{{--c:var(--bad)}}
.list strong{{display:block;font-size:1.02rem;margin-bottom:4px}}
.list p{{margin:0;font-size:.93rem;color:#cdd3de}}
.sev{{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;border-radius:999px;padding:2px 9px;margin-bottom:6px;border:1px solid}}
.sev.grave{{color:#ff7a7e;border-color:rgba(242,85,90,.5);background:rgba(242,85,90,.12)}}
.sev.moderada{{color:#f7b267;border-color:rgba(247,178,103,.5);background:rgba(247,178,103,.1)}}
.sev.leve{{color:#a5b4c8;border-color:rgba(165,180,200,.4);background:rgba(165,180,200,.08)}}
h2.good{{color:var(--good)}} h2.bad{{color:var(--bad)}}
.duo{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
.box{{background:var(--card);border:1px solid var(--line);border-top:3px solid var(--c);border-radius:14px;padding:16px}}
.box.yes{{--c:var(--good)}} .box.no{{--c:var(--bad)}}
.box h3{{margin:0 0 8px;font-size:1.1rem;text-transform:uppercase;color:var(--c)}}
.box ul{{margin:0;padding-left:18px;color:#cdd3de;font-size:.94rem}}
.box li{{margin-bottom:6px}}
.verdict{{margin-top:48px;border:1px solid rgba(242,193,78,.45);background:linear-gradient(180deg,rgba(242,193,78,.1),rgba(242,193,78,.02));border-radius:16px;padding:22px}}
.verdict h2{{margin:0 0 6px;color:var(--gold)}}
.badge{{display:inline-block;font-weight:700;font-size:.82rem;letter-spacing:.06em;text-transform:uppercase;background:var(--gold);color:#1b1503;border-radius:6px;padding:3px 10px;margin-bottom:14px}}
.tagline{{font-family:Oswald,sans-serif;text-transform:uppercase;font-size:1.15rem;line-height:1.35;color:var(--gold);margin:18px 0 0;text-align:center}}
.sources{{font-size:.88rem;color:var(--muted);padding-left:18px}}
.sources li{{margin-bottom:6px}}
.sources a{{color:#cdd3de}}
footer{{margin-top:40px;padding-top:18px;border-top:1px solid var(--line);font-size:.84rem;color:var(--muted);display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px}}
footer a{{color:var(--muted)}}
@media (max-width:700px){{
 .awards,.duo{{grid-template-columns:1fr}}
 h2{{font-size:1.45rem;margin-top:40px}}
}}
</style>
</head>
<body>
<div class="wrap">
 <nav class="top">
  <span class="disp" style="color:var(--gold);letter-spacing:.08em">♛ ELITE BOARDGAMERS</span>
  <a href="../resenhas/">Todas as resenhas →</a>
 </nav>

 <header class="hero">
  <div class="eyebrow">Elite Boardgamers apresenta</div>
  <h1>{c["titulo_html"]}</h1>
  <p class="lede">{e(c["lede"])}</p>
  <div class="tags">{tags}</div>
  <p class="meta">Resenha · Consulta às fontes em {e(c["consulta"])}</p>
 </header>

 <figure>
  <a href="infografico.webp" target="_blank" rel="noopener"><img src="infografico.webp" width="1024" height="1024" alt="{e(c["alt"])}"></a>
  <figcaption>Toque na imagem para ver em tamanho cheio.</figcaption>
 </figure>

 <h2>Premia<span class="k">ções</span></h2>
 <ul class="awards">{premios}</ul>

 <h2>Ficha <span class="k">técnica</span></h2>
 <div class="tablewrap"><table><tbody>{ficha}</tbody></table></div>
 <p class="note">{e(c["nota_ficha"])}</p>

 <h2>Como <span class="k">funciona</span></h2>
 {como}
 {serie}

 <h2 class="good">👍 O que funciona muito bem</h2>
 <ul class="list good">{funciona}</ul>

 <h2 class="bad">👎 Pontos de atenção</h2>
 <ul class="list bad">{atencao}</ul>

 <h2>Para quem <span class="k">é?</span></h2>
 <div class="duo">
  <div class="box yes"><h3>É para você se…</h3><ul>{sim}</ul></div>
  <div class="box no"><h3>Pense duas vezes se…</h3><ul>{nao}</ul></div>
 </div>

 <section class="verdict">
  <h2>♛ Veredito Elite Boardgamers</h2>
  <span class="badge">{e(c["selo"])}</span>
  <p>{e(c["veredito"])}</p>
  <p class="tagline">{e(c["tagline"])}</p>
 </section>

 <h2>Fontes</h2>
 <ul class="sources">{fontes}<li>Consulta às páginas: {e(c["consulta"])}.</li></ul>

 <footer>
  <span>Resenha · Elite Boardgamers</span>
  <span><a href="../resenhas/">Todas as resenhas</a> · <a href="../">Consulta Golden Geek</a></span>
 </footer>
</div>
</body>
</html>
"""


if __name__ == "__main__":
    for arg in sys.argv[1:]:
        c = json.loads(Path(arg).read_text(encoding="utf-8"))
        out = ROOT / c["slug"] / "index.html"
        out.parent.mkdir(exist_ok=True)
        out.write_text(build(c), encoding="utf-8")
        print("ok", out.relative_to(ROOT))
