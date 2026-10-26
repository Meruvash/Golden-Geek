"""Plano B do Sistema de Infográfico v2: diagramação híbrida.

Monta o infográfico vertical 2:3 (1024x1536) em HTML a partir de conteudo/<slug>.arte.json
e exporta PNG com o Playwright. O texto sai 100% fiel; a arte de fundo e a ilustração
central podem vir de uma imagem gerada sem texto (campos "fundo" e "ilustracao" no JSON).

Uso: python3 tools/infografico_html.py conteudo/<slug>.arte.json <saida.png>
"""
import base64
import html
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LOGO = ROOT / "tools" / "assets" / "logo-elite.png"
e = html.escape


def data_uri(path):
    p = Path(path)
    mime = "image/png" if p.suffix == ".png" else "image/jpeg" if p.suffix in (".jpg", ".jpeg") else "image/webp"
    return f"data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}"


def page(a, base):
    cor = a.get("cor", "#3b9be0")
    fundo = f'url("{data_uri(base / a["fundo"])}")' if a.get("fundo") else "none"
    if a.get("ilustracao"):
        centro = f'<img class="ill" src="{data_uri(base / a["ilustracao"])}" alt="">'
    else:
        tiles = "".join(f'<i style="--t:{c}"></i>' for c in a.get("mosaico", ["#2f6fd1"] * 25))
        centro = f'<div class="mosaic">{tiles}</div>'
    c1 = "".join(f"<li>{e(x)}</li>" for x in a["C1"])
    c2 = "".join(f"<li>{e(x)}</li>" for x in a["C2"])
    d = "".join(f'<div class="step s{i}"><b>{i}. {e(t)}</b><span>{e(x)}</span></div>' for i, (t, x) in enumerate(a["D"], 1))
    pe = "".join(f"<li><b>{e(t)}</b><span>{e(x)}</span></li>" for t, x in a["E"])
    pr = "".join(f"<li><b>{e(t)}</b><span>{e(x)}</span></li>" for t, x in a["R"])
    f = "".join(f"<li>{e(x)}</li>" for x in a["F"])
    mods = "".join(f'<div class="mod"><b>{e(t)}</b><span>{e(x)}</span></div>' for t, x in a["modulos"])
    chaves = "".join(f"<span>{e(x)}</span>" for x in a["B"]["chaves"])
    g = a["G"]
    return f"""<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{width:1024px;height:1536px;overflow:hidden;font-family:Inter,sans-serif;color:#eef1f6;
 background:#071226 {fundo} center/cover no-repeat;position:relative}}
body:before{{content:"";position:absolute;inset:0;
 background:radial-gradient(ellipse at 50% 30%,rgba(7,18,38,.35),rgba(4,8,18,.88) 70%),
 repeating-conic-gradient(from 45deg,rgba(80,140,230,.07) 0 25%,transparent 0 50%) 0 0/56px 56px}}
.z{{position:absolute;left:28px;right:28px}}
.h{{font-family:Oswald,sans-serif;text-transform:uppercase;letter-spacing:.02em}}
.panel{{overflow:hidden;background:rgba(6,12,26,.86);border:2px solid var(--b);border-radius:14px;box-shadow:0 0 14px var(--b),inset 0 0 18px rgba(0,0,0,.6)}}
/* A */
.A{{top:18px;height:190px;display:grid;grid-template-columns:190px 1fr 250px;align-items:center;gap:14px}}
.A img{{width:190px;height:150px;object-fit:cover;border-radius:16px;box-shadow:0 0 16px rgba(242,193,78,.6)}}
.A h1{{font-family:Oswald,sans-serif;font-size:150px;line-height:1;text-align:center;color:#fff;
 text-shadow:0 0 18px {cor},0 6px 0 #0b2d6b,0 8px 22px rgba(0,0,0,.8);letter-spacing:.04em}}
.A .cham{{--b:#f2c14e;padding:14px 16px;font-size:19px;line-height:1.3;font-weight:600}}
/* B */
.B{{top:216px;height:76px;text-align:center}}
.B .frase{{display:inline-block;background:linear-gradient(#efe0bd,#d9c08d);color:#3a2a10;font-family:Oswald,sans-serif;
 font-size:24px;padding:6px 34px;border-radius:6px;box-shadow:0 3px 10px rgba(0,0,0,.6)}}
.B .pills{{margin-top:8px;display:flex;justify-content:center;gap:10px}}
.B .pills span{{background:{cor};color:#fff;font-weight:700;font-size:15px;padding:3px 16px;border-radius:999px}}
/* C */
.C{{top:298px;height:340px;display:grid;grid-template-columns:28% 1fr 27%;gap:14px}}
.C ul{{list-style:none;display:grid;gap:5px}}
.ficha li{{background:rgba(0,0,0,.82);border:1px solid #2b3a5a;border-radius:8px;padding:5px 10px;font-size:15px;font-weight:600}}
.ficha li:before{{content:"◆";color:{cor};margin-right:7px}}
.mosaic{{--b:{cor};display:grid;grid-template-columns:repeat(5,1fr);gap:8px;padding:18px;height:100%;border-radius:14px;
 background:rgba(6,12,26,.7);border:2px solid {cor};box-shadow:0 0 14px {cor}}}
.mosaic i{{display:block;border-radius:6px;background:var(--t);
 box-shadow:inset 0 0 0 4px rgba(255,255,255,.18),inset 0 -6px 10px rgba(0,0,0,.35),0 3px 6px rgba(0,0,0,.5);
 background-image:radial-gradient(circle at 50% 50%,rgba(255,255,255,.55) 0 12%,transparent 13%),
 linear-gradient(45deg,transparent 46%,rgba(255,255,255,.35) 47% 53%,transparent 54%),
 linear-gradient(-45deg,transparent 46%,rgba(255,255,255,.35) 47% 53%,transparent 54%)}}
.ill{{width:100%;height:100%;object-fit:cover;border-radius:14px;border:2px solid {cor};box-shadow:0 0 14px {cor}}}
.com{{--b:#f2c14e;padding:12px}}
.com .h{{font-size:20px;color:#f2c14e;margin-bottom:8px;text-align:center;line-height:1.15}}
.com li{{border-bottom:1px solid #2b3a5a;padding:8px 2px;font-size:16px;font-weight:600}}
.com li:last-child{{border:0;font-size:13px;color:#aab4c6;font-weight:400}}
/* D */
.D{{top:648px;height:166px}}
.D .h.t{{font-size:28px;text-align:center;color:#fff;margin-bottom:6px}}
.D .steps{{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}}
.step{{overflow:hidden;border-radius:12px;padding:9px 10px;height:124px;border:2px solid var(--c);background:rgba(6,12,26,.88);box-shadow:0 0 10px var(--c)}}
.step b{{display:block;font-family:Oswald,sans-serif;font-size:22px;color:var(--c);text-transform:uppercase;margin-bottom:4px}}
.step span{{font-size:15px;line-height:1.3}}
.s1{{--c:#4ea8ff}} .s2{{--c:#b388ff}} .s3{{--c:#3fd0c9}} .s4{{--c:#f2c14e}} .s5{{--c:#ff8a5c}}
/* E */
.E{{top:824px;height:374px;display:grid;grid-template-columns:1fr 1fr;gap:16px}}
.E .panel{{padding:12px 14px}}
.E .h{{font-size:26px;text-align:center;margin-bottom:8px}}
.g{{--b:#3ddc6f}} .g .h{{color:#5ff08a}} .r{{--b:#ff4d57}} .r .h{{color:#ff6b73}}
.E ul{{list-style:none;display:grid;gap:7px}}
.E li{{overflow:hidden;border:1px solid var(--b);border-radius:10px;padding:7px 10px;background:rgba(0,0,0,.35)}}
.E li b{{display:block;font-family:Oswald,sans-serif;font-size:19px;text-transform:uppercase;color:var(--b)}}
.E li span{{font-size:15px;line-height:1.3}}
/* F */
.F{{top:1208px;height:146px;display:grid;grid-template-columns:1.45fr 1fr 1fr;gap:12px}}
.F .panel{{padding:10px 12px}}
.F .tec{{--b:#4ea8ff}} .F .h{{font-size:20px;color:#7cc0ff;margin-bottom:4px}}
.F ul{{list-style:none}} .F li{{font-size:14px;line-height:1.45}}
.mod{{overflow:hidden;--b:#7a8bb0;background:rgba(6,12,26,.86);border:2px solid var(--b);border-radius:14px;padding:10px 12px}}
.mod b{{display:block;font-family:Oswald,sans-serif;font-size:19px;color:#f2c14e;text-transform:uppercase;margin-bottom:4px}}
.mod span{{font-size:14px;line-height:1.4}}
/* G */
.G{{top:1364px;height:128px;display:grid;grid-template-columns:1fr 230px;gap:12px}}
.ver{{--b:#f2c14e;padding:10px 14px;background:linear-gradient(180deg,rgba(60,44,8,.92),rgba(14,10,2,.92))}}
.ver .top{{display:flex;align-items:center;gap:12px;margin-bottom:4px}}
.ver .h{{font-size:22px;color:#f2c14e}}
.ver .cls{{background:#f2c14e;color:#1b1503;font-weight:700;font-size:14px;padding:3px 10px;border-radius:6px}}
.ver p{{font-size:15px;line-height:1.35}}
.buy{{--b:#7a8bb0;padding:10px 12px;font-size:15px;line-height:1.35;display:flex;align-items:center}}
.fontes{{position:absolute;left:28px;right:28px;top:1502px;font-size:12px;color:#aab4c6;text-align:center}}
</style></head><body>
<div class="z A"><img src="{data_uri(LOGO)}" alt=""><h1>{e(a["A"]["titulo"])}</h1><div class="panel cham">{e(a["A"]["chamada"])}</div></div>
<div class="z B"><div class="frase">{e(a["B"]["frase"])}</div><div class="pills">{chaves}</div></div>
<div class="z C"><ul class="ficha">{c1}</ul>{centro}<div class="panel com"><div class="h">Indicadores da comunidade</div><ul>{c2}</ul></div></div>
<div class="z D"><div class="h t">Como funciona?</div><div class="steps">{d}</div></div>
<div class="z E"><div class="panel g"><div class="h">O que funciona muito bem?</div><ul>{pe}</ul></div>
<div class="panel r"><div class="h">Pontos de atenção</div><ul>{pr}</ul></div></div>
<div class="z F"><div class="panel tec"><div class="h">Ficha técnica</div><ul>{f}</ul></div>{mods}</div>
<div class="z G"><div class="panel ver"><div class="top"><span class="h">Veredito Elite Boardgamers</span><span class="cls">{e(g["classificacao"])}</span></div><p>{e(g["texto"])}</p></div>
<div class="panel buy">{e(g["compra"])}</div></div>
<div class="fontes">{e(g["fontes"])}</div>
</body></html>"""


if __name__ == "__main__":
    src, out = Path(sys.argv[1]), Path(sys.argv[2])
    a = json.loads(src.read_text(encoding="utf-8"))
    tmp = out.with_suffix(".html")
    tmp.write_text(page(a, src.parent), encoding="utf-8")
    js = f"""const {{chromium}}=require('playwright');(async()=>{{const b=await chromium.launch();
const p=await b.newPage({{viewport:{{width:1024,height:1536}}}});await p.goto('file://{tmp.resolve()}');
await p.waitForLoadState('networkidle');await p.waitForTimeout(400);
const over=await p.evaluate(()=>[...document.querySelectorAll('.panel,.step,.mod,.ficha li,.com li,.E li')].filter(el=>el.scrollHeight>el.clientHeight+2||el.scrollWidth>el.clientWidth+2).map(el=>el.className+': '+el.textContent.slice(0,40)));
await p.screenshot({{path:'{out.resolve()}'}});await b.close();
if(over.length){{console.log('TRANSBORDA:',JSON.stringify(over));process.exit(2)}}console.log('ok');}})()"""
    r = subprocess.run(["node", "-e", js], capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())
    sys.exit(r.returncode)
