"""Gera a página de uma resenha a partir de um JSON de conteúdo.

Uso: python3 tools/build_review.py conteudo/<slug>.json
Saída: <slug>/index.html (o infografico.webp e a capa.jpg ficam na mesma pasta).
"""
import html
import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
INSTAGRAM = "https://www.instagram.com/eliteboardgamers/"
WHATSAPP = "https://chat.whatsapp.com/IgQQkJdSkzHBaEq3UwFeAo"
SITE = "https://meruvash.github.io/Golden-Geek"
e = html.escape

ICONES = {
    "jogadores": '<path d="M8 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8 1a3 3 0 1 0 0-6M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 14.2c3 .4 5.5 2.8 5.5 5.8"/>',
    "duracao": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    "idade": '<path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/><path d="M9 10h.01M15 10h.01M8.5 14.5c1.9 2 5.1 2 7 0"/>',
    "peso": '<path d="M6 9h12l2 11H4L6 9Z"/><path d="M9 9a3 3 0 1 1 6 0"/>',
    "ok": '<path d="M4.5 12.5l4.5 4.5L19.5 6.5"/>',
    "insta": '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
    "zap": '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19l-4.4 1Z"/><path d="M9.2 8.6c.3-.5.8-.5 1-.1l.7 1.5c.1.3 0 .6-.2.8l-.4.4c.5 1.1 1.4 2 2.5 2.5l.4-.4c.2-.2.5-.3.8-.2l1.5.7c.4.2.4.7-.1 1-.7.5-1.6.6-2.4.3a7 7 0 0 1-4.2-4.2c-.3-.8-.2-1.7.4-2.3Z"/>',
    "nao": '<path d="M6 6l12 12M18 6L6 18"/>',
    "salvar": '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.8"/><path d="M21 15.5l-5-5L5 21"/>',
    "copiar": '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>',
    "compartilhar": '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
}


def icone(nome, cls="ic"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICONES[nome]}</svg>'


def sev_class(s):
    s = s.lower()
    return "grave" if "grave" in s else ("leve" if "leve" in s else "moderada")


def campo(ficha, *nomes):
    for k, v in ficha:
        if k.lower() in nomes and "não confirmad" not in v.lower():
            return v
    return None


def numero(texto):
    m = re.search(r"\d+(?:,\d+)?", texto or "")
    return float(m.group().replace(",", ".")) if m else None


def faixa_nota(n):
    return "n9" if n >= 8 else ("n7" if n >= 7 else ("n6" if n >= 6 else "n5"))


def selo_class(selo):
    s = selo.lower()
    return "nao" if s.startswith("não") else ("publico" if "específico" in s else "sim")


def build(c):
    slug = c["slug"]
    ficha = c["ficha"]
    ano = campo(ficha, "ano") or ""
    autor = campo(ficha, "designer", "designers") or ""
    nota = numero(campo(ficha, "nota bgg"))
    peso = campo(ficha, "peso bgg")
    regua = [
        ("jogadores", (lambda d: d and re.sub(r"^(\d+) a (\d+)", r"\1–\2", d))(campo(ficha, "jogadores")), "Jogadores"),
        ("duracao", (lambda d: d and re.sub(r" a ", "–", d).replace(" minutos", " min"))(campo(ficha, "duração anunciada", "duração")), "Duração"),
        ("idade", campo(ficha, "idade"), "Idade"),
        ("peso", f"{numero(peso):.1f}".replace(".", ",") + " / 5" if numero(peso) else None, "Peso BGG"),
    ]
    regua_html = "".join(
        f'<li>{icone(n)}<span class="r-v">{e(re.split(r" [(;]", v)[0])}</span><span class="r-k">{k}</span></li>'
        for n, v, k in regua if v
    )
    nota_html = (
        f'<div class="nota {faixa_nota(nota)}" role="img" aria-label="Nota BGG {nota:.1f} de 10">'
        f'<span>{f"{nota:.1f}".replace(".", ",")}</span></div><p class="nota-k">Nota BGG</p>'
        if nota else ""
    )
    premios = "".join(
        f'<li class="pr{" win" if a["resultado"] == "vencedor" else ""}">'
        f'<span class="pr-m" aria-hidden="true">{"" if a["resultado"] == "vencedor" else (str(a["colocacao"]) + "º" if a.get("colocacao") else "")}</span>'
        f'<span class="pr-t"><b>{e(a["premio"])} {a["ano"]}</b><span>{e(a["categoria"])} · {e(a["rotulo"])}</span></span></li>'
        for a in c["premiacoes"]
    )
    vitorias = sum(1 for a in c["premiacoes"] if a["resultado"] == "vencedor")
    premios_bloco = (
        f'<section class="bloco claro" id="premios"><h2>Prêmios</h2><p class="resumo">{vitorias} vitória{"s" if vitorias != 1 else ""} em {len(c["premiacoes"])} premiações da pauta</p><ul>{premios}</ul></section>'
        if c["premiacoes"] else ""
    )
    ficha_html = "".join(
        f'<div><dt>{e(k)}</dt><dd{" class=na" if "não confirmad" in v.lower() else ""}>{e(v)}</dd></div>'
        for k, v in ficha
    )
    como = "".join(f"<p>{e(p)}</p>" for p in c["como_funciona"])
    funciona = "".join(f'<li>{icone("ok", "ic ok")}<div><h3>{e(t)}</h3><p>{e(x)}</p></div></li>' for t, x in c["funciona"])
    atencao = "".join(
        f'<li>{icone("nao", "ic no")}<div><h3>{e(t)} <span class="sev {sev_class(s)}">{e(s)}</span></h3><p>{e(x)}</p></div></li>'
        for s, t, x in c["atencao"]
    )
    sim = "".join(f"<li>{e(x)}</li>" for x in c["para_quem"])
    nao = "".join(f"<li>{e(x)}</li>" for x in c["nao_e_para"])
    fontes = "".join(
        f'<li><a href="{e(u)}" target="_blank" rel="noopener">{e(n)}</a> <span>{e(uso)}</span></li>' for n, u, uso in c["fontes"]
    )
    serie = f'<p class="note">{e(c["serie"])}</p>' if c.get("serie") else ""
    linha = " · ".join(x for x in (ano, autor) if x)
    info = ROOT / slug / "infografico.webp"
    larg, alt = Image.open(info).size if info.exists() else (1600, 1600)
    leg = c.get("legenda", "")
    legenda_btn = f'<button type="button" class="post-btn" id="b-legenda" aria-expanded="false" aria-controls="legenda">{icone("copiar")}Legenda</button>' if leg else ""
    legenda_box = (
        f'<div class="legenda" id="legenda" hidden><p class="leg-st" role="status"></p>'
        f'<div class="leg-txt" id="leg-txt" tabindex="0" aria-label="Legenda para o Instagram">{e(leg)}</div>'
        f'<div class="leg-acoes"><button type="button" class="post-btn" id="b-copiar">{icone("copiar")}Copiar de novo</button>'
        f'<button type="button" class="post-btn" id="b-compartilhar" hidden>{icone("compartilhar")}Compartilhar legenda</button></div>'
        f'<p class="leg-dica">Não colou? Toque em “Compartilhar legenda” e escolha “Copiar”, ou segure o dedo no texto acima.</p></div>'
        if leg else ""
    )
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<title>{e(c["jogo"])}: resenha | Elite Boardgamers</title>
<meta name="description" content="{e(c["descricao"])}">
<meta property="og:title" content="{e(c["og_titulo"])}">
<meta property="og:description" content="{e(c["descricao"])}">
<meta property="og:type" content="article">
<meta property="og:url" content="{SITE}/{slug}/">
<meta property="og:image" content="{SITE}/{slug}/capa.jpg">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="800">
<meta name="theme-color" content="#000000">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="preload" href="../fontes/public-sans.woff2" as="font" type="font/woff2" crossorigin>
<style>
@font-face{{font-family:"Public Sans";src:url(../fontes/public-sans.woff2) format("woff2");font-weight:400 800;font-style:normal;font-display:swap}}
@font-face{{font-family:"Public Sans";src:url(../fontes/public-sans-italic.woff2) format("woff2");font-weight:400;font-style:italic;font-display:swap}}
:root{{color-scheme:dark;--bar:#000;--bar-ink:#e9ecf1;--gold:#e3b23c;--ground:#000;--panel:#0f1115;--panel2:#171a20;--ink:#eceff3;--muted:#a1a9b5;--line:#262a32;--link:#8cb8ff;--ok:#157a43;--ok-ink:#5fd18f;--no:#c43a52;--no-ink:#ff8094;--warn:#b06a00;--warn-ink:#ffb547;--n9:#1d7d48;--n7:#2366a8;--n6:#6b4ea3;--n5:#b23a48}}
*{{box-sizing:border-box}}
html{{-webkit-text-size-adjust:100%;scroll-padding-top:64px}}
body{{margin:0;background:var(--ground);color:var(--ink);font:16px/1.6 "Public Sans",system-ui,sans-serif}}
h1,h2,h3,p,ul,dl,dd,figure{{margin:0}}
ul{{padding:0;list-style:none}}
img{{display:block;max-width:100%;height:auto}}
a{{color:var(--link);text-underline-offset:.18em}}
::selection{{background:#e3b23c;color:#000}}
:focus-visible{{outline:3px solid var(--gold);outline-offset:2px;border-radius:3px}}
.skip{{position:absolute;left:-999px}}.skip:focus{{left:12px;top:8px;z-index:9;background:var(--gold);color:#000;padding:6px 10px}}
.bar{{background:var(--bar);color:var(--bar-ink);border-bottom:1px solid var(--line)}}
.bar .in{{max-width:1120px;margin:0 auto;padding:8px 16px;display:flex;align-items:center;gap:12px}}
.bar a{{color:var(--bar-ink);text-decoration:none;font-weight:600;font-size:.95rem}}
.marca{{display:flex;align-items:center;gap:10px}}.marca img{{width:84px;height:auto;border-radius:6px}}
.bar .todas{{margin-left:auto;border:1px solid #3a3f48;border-radius:6px;padding:6px 12px}}
.bar .todas:hover{{background:#1a1d22;border-color:var(--gold)}}
.jogo{{background:var(--panel);border-bottom:1px solid var(--line)}}
.jogo .in{{max-width:1120px;margin:0 auto;padding:20px 16px 0;display:grid;gap:20px}}
.capa a{{display:block;border-radius:8px;overflow:hidden;box-shadow:0 8px 28px rgba(0,0,0,.6)}}
.capa figcaption{{font-size:.82rem;color:var(--muted);margin-top:6px}}
.topo{{display:grid;grid-template-columns:1fr auto;gap:4px 16px;align-items:start}}
h1{{font-size:clamp(2rem,7vw,3.1rem);line-height:1.05;font-weight:800;letter-spacing:-.02em}}
.linha{{grid-column:1;color:var(--muted);font-size:.95rem}}
.nota-box{{grid-column:2;grid-row:1/span 2;display:grid;justify-items:center}}
.nota{{width:64px;height:72px;display:grid;place-items:center;clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);color:#fff;font-weight:800;font-size:1.45rem;font-variant-numeric:tabular-nums}}
.n9{{background:var(--n9)}}.n7{{background:var(--n7)}}.n6{{background:var(--n6)}}.n5{{background:var(--n5)}}
.nota-k{{font-size:.72rem;color:var(--muted);margin-top:2px}}
.veredito{{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;margin-top:14px;padding:12px 14px;border-radius:8px;background:var(--panel2)}}
.selo{{font-weight:800;font-size:.9rem;border-radius:999px;padding:3px 12px;color:#fff;background:var(--ok)}}
.selo.publico{{background:var(--warn)}}.selo.nao{{background:var(--no)}}
.veredito p{{font-weight:600}}
.lede{{margin-top:14px;color:#c9cfd8;max-width:66ch}}
.regua{{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;margin-top:16px;border:1px solid var(--line);border-radius:8px;background:var(--line);overflow:hidden}}
.regua li{{display:grid;grid-template-columns:auto 1fr;column-gap:8px;padding:10px 12px;align-items:center;background:var(--panel)}}
.ic{{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}}
.regua .ic{{grid-row:span 2;color:var(--muted)}}
.r-v{{font-weight:700;font-variant-numeric:tabular-nums;line-height:1.25}}.r-k{{font-size:.78rem;color:var(--muted)}}
.abas{{position:sticky;top:0;z-index:5;background:var(--panel);border-bottom:1px solid var(--line)}}
.abas ul{{max-width:1120px;margin:0 auto;padding:0 8px;display:flex;overflow-x:auto;scrollbar-width:none}}
.abas a{{display:block;padding:12px 10px;white-space:nowrap;color:var(--ink);text-decoration:none;font-weight:600;font-size:.92rem;border-bottom:3px solid transparent}}
.abas a:hover{{border-bottom-color:var(--gold)}}
main{{max-width:1120px;margin:0 auto;padding:20px 16px 48px;display:grid;gap:20px}}
.bloco{{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:20px}}
h2{{font-size:1.3rem;font-weight:800;letter-spacing:-.01em;margin-bottom:12px}}
.bloco p+p{{margin-top:10px}}.leitura{{max-width:70ch}}
.pc{{display:grid;gap:20px}}
.pc li{{display:grid;grid-template-columns:auto 1fr;gap:10px;padding:14px 0;border-top:1px solid var(--line)}}
.pc li:first-child{{border-top:0;padding-top:0}}
.pc h3{{font-size:1rem;font-weight:700}}.pc p{{color:#c3c9d2;font-size:.95rem}}
.ic.ok{{color:var(--ok-ink);margin-top:2px}}.ic.no{{color:var(--no-ink);margin-top:2px}}
.sev{{font-size:.72rem;font-weight:700;border-radius:4px;padding:1px 6px;vertical-align:2px;margin-left:4px;background:var(--panel2);color:var(--muted)}}
.sev.moderada{{background:#2a1f0c;color:var(--warn-ink)}}.sev.grave{{background:#2b1117;color:var(--no-ink)}}
.quem{{display:grid;gap:20px}}.quem li{{margin:6px 0;padding-left:16px;position:relative}}.quem li::before{{content:"";position:absolute;left:0;top:.65em;width:7px;height:7px;border-radius:50%;background:var(--ok)}}
.quem .nao li::before{{background:var(--no)}}
.fecho{{background:var(--panel2);color:var(--bar-ink);border:1px solid var(--gold)}}
.fecho .selo{{margin-bottom:10px;display:inline-block}}.fecho p{{max-width:70ch}}
.tagline{{font-size:1.25rem;font-weight:800;margin-top:12px;color:#fff}}
.col,aside{{display:grid;gap:20px;align-content:start}}
dl div{{display:grid;grid-template-columns:42% 1fr;gap:10px;padding:10px 0;border-top:1px solid var(--line);font-size:.93rem}}
dl div:first-child{{border-top:0}}dt{{color:var(--muted)}}dd.na{{color:var(--muted);font-style:italic}}
.note{{font-size:.82rem;color:var(--muted);margin-top:10px}}
.pr{{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:center;padding:11px 0;border-top:1px solid var(--line)}}
.pr:first-child{{border-top:0}}
.pr-m{{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:2px solid var(--muted);color:var(--muted);font-size:.78rem;font-weight:800}}
.pr.win .pr-m{{border:0;background:radial-gradient(circle at 35% 30%,#f7d77a,var(--gold) 60%,#b9871d)}}
.pr-t b{{display:block;font-size:.93rem}}.pr-t span{{font-size:.82rem;color:var(--muted)}}
.resumo{{font-size:.88rem;color:var(--muted);margin:-6px 0 8px}}
.fontes li{{margin:6px 0;font-size:.93rem}}.fontes span{{color:var(--muted);font-size:.85rem}}
/* blocos de leitura claros sobre a moldura preta */
.bloco.claro{{background:#f4f5f7;color:#14171c;border-color:#f4f5f7}}
.claro p,.claro .pc p{{color:#3a414c}}
.claro dt,.claro .resumo,.claro .note,.claro .pr-t span,.claro.fontes span{{color:#5a6270}}
.claro dl div,.claro .pr,.claro li{{border-color:#dde1e7}}
.claro a{{color:#1f5fae}}
.claro .ic.ok{{color:#1b7a45}}.claro .ic.no{{color:#b3263e}}
.claro .sev{{background:#e6e9ee;color:#5a6270}}.claro .sev.moderada{{background:#fdf1dc;color:#8a5200}}.claro .sev.grave{{background:#fbe4e8;color:#a3223a}}
.claro .pr-m{{border-color:#8a929e;color:#5a6270}}
.claro.quem li::before,.claro .quem li::before{{background:#1b7a45}}.claro .nao li::before{{background:#b3263e}}
footer{{background:var(--bar);color:var(--bar-ink);font-size:.88rem;border-top:1px solid var(--line)}}
.bar .ig,.bar .zap-mini{{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px}}
.bar .ig{{margin-left:auto}}.bar .ig:hover{{color:var(--gold)}}
.bar .zap-mini{{background:#157a43;color:#fff}}.bar .zap-mini:hover{{background:#11683a}}
.bar .todas{{margin-left:0}}
@media (max-width:700px){{.bar .ig span,.bar .zap-mini span{{display:none}}.bar .todas{{padding:6px 10px}}}}
.zap{{display:flex;align-items:center;gap:12px;margin-top:16px;padding:14px 18px;border-radius:10px;background:#157a43;color:#fff;text-decoration:none;transition:background-color .2s ease,transform .2s ease}}
.zap:hover{{background:#11683a}}.zap:active{{transform:scale(.98)}}
.zap .zi{{width:30px;height:30px;flex:none}}.zap b{{display:block;font-size:1.05rem}}.zap small{{display:block;font-size:.85rem;opacity:.9}}
.comunidade p{{max-width:62ch;color:#c9cfd8}}.comunidade .acoes{{display:flex;flex-wrap:wrap;gap:12px;align-items:center}}
.ig-btn{{display:flex;align-items:center;gap:8px;margin-top:16px;padding:14px 18px;border-radius:10px;border:1px solid #3a3f48;color:var(--ink);text-decoration:none;font-weight:700}}
.ig-btn:hover{{border-color:var(--gold);color:var(--gold)}}
.post{{display:flex;gap:10px;margin-top:12px}}
.post-btn{{flex:1 1 auto;white-space:nowrap;display:flex;align-items:center;justify-content:center;gap:7px;min-height:46px;padding:10px 12px;border-radius:10px;border:1px solid #3a3f48;background:var(--panel2);color:var(--ink);font:inherit;font-weight:700;cursor:pointer;touch-action:manipulation;transition:border-color .2s ease,transform .15s ease}}
.post-btn:hover{{border-color:var(--gold)}}.post-btn:active{{transform:scale(.97)}}
.post-st:empty,.leg-st:empty{{display:none}}.post-st,.leg-st{{font-size:.88rem;color:var(--ok-ink);margin-top:8px}}
.legenda{{margin-top:12px;padding:12px;border-radius:10px;background:#f4f5f7;color:#14171c}}
.legenda .leg-st{{color:#1b7a45;font-weight:700;margin:0 0 8px}}
.leg-txt{{white-space:pre-wrap;max-height:15em;overflow:auto;border:1px solid #dde1e7;border-radius:8px;padding:10px;font-size:.92rem;line-height:1.5;color:#14171c;background:#fff;-webkit-user-select:all;user-select:all}}
.leg-acoes{{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}}
.legenda .post-btn{{background:#14171c;color:#fff;border-color:#14171c}}
.leg-dica{{font-size:.8rem;color:#5a6270;margin-top:8px}}
footer .in{{max-width:1120px;margin:0 auto;padding:18px 16px;display:flex;flex-wrap:wrap;gap:10px 20px}}
footer a{{color:var(--bar-ink)}}
@media (min-width:860px){{
 .jogo .in{{grid-template-columns:minmax(0,420px) 1fr;gap:32px;padding-top:28px;padding-bottom:4px}}
 main{{grid-template-columns:minmax(0,1fr) 340px;align-items:start}}
 .pc,.quem{{grid-template-columns:1fr 1fr}}
 .regua{{grid-template-columns:repeat(auto-fit,minmax(120px,1fr))}}
 aside{{position:sticky;top:64px}}
}}
@media (max-width:859px){{aside{{display:contents}}#premios{{order:-1}}}}
@media (prefers-reduced-motion:reduce){{html{{scroll-behavior:auto}}}}
</style>
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<header class="bar"><div class="in">
 <a class="marca" href="../resenhas/"><img src="../marca/elite-boardgamers.webp" width="318" height="254" alt="Elite Boardgamers"></a>
 <a class="ig" href="{INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram @eliteboardgamers">{icone("insta")}<span>@eliteboardgamers</span></a>
 <a class="zap-mini" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap")}<span>Grupo do WhatsApp</span></a>
 <a class="todas" href="../resenhas/">Todas as resenhas</a>
</div></header>

<section class="jogo"><div class="in">
 <figure class="capa">
  <a href="infografico.webp" target="_blank" rel="noopener"><img src="infografico.webp" width="{larg}" height="{alt}" alt="{e(c["alt"])}" fetchpriority="high"></a>
  <figcaption>Toque para ver o infográfico em tamanho cheio.</figcaption>
  <div class="post"><button type="button" class="post-btn" id="b-salvar">{icone("salvar")}Salvar na galeria</button>{legenda_btn}</div>
  <p class="post-st" id="salvar-st" role="status"></p>
  {legenda_box}
 </figure>
 <div>
  <div class="topo">
   <h1>{e(c["jogo"])}</h1>
   <div class="nota-box">{nota_html}</div>
   <p class="linha">{e(linha)}</p>
  </div>
  <div class="veredito"><span class="selo {selo_class(c["selo"])}">{e(c["selo"])}</span><p>{e(c["tagline"])}</p></div>
  <ul class="regua">{regua_html}</ul>
  <a class="zap" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap", "ic zi")}<span><b>Entre no grupo do WhatsApp</b><small>Converse sobre {e(c["jogo"])} e receba as próximas resenhas</small></span></a>
  <p class="lede">{e(c["lede"])}</p>
 </div>
</div>
<nav class="abas" aria-label="Seções da resenha"><ul>
 <li><a href="#como-funciona">Como funciona</a></li><li><a href="#pros-contras">Prós e contras</a></li><li><a href="#para-quem">Para quem é</a></li><li><a href="#veredito">Veredito</a></li><li><a href="#ficha">Ficha</a></li>{'<li><a href="#premios">Prêmios</a></li>' if c["premiacoes"] else ""}<li><a href="#fontes">Fontes</a></li>
</ul></nav>
</section>

<main id="conteudo">
 <div class="col">
  <section class="bloco claro" id="como-funciona"><h2>Como funciona</h2><div class="leitura">{como}{serie}</div></section>
  <section class="bloco claro pc" id="pros-contras">
   <div><h2>O que funciona muito bem</h2><ul>{funciona}</ul></div>
   <div><h2>Pontos de atenção</h2><ul>{atencao}</ul></div>
  </section>
  <section class="bloco claro quem" id="para-quem">
   <div><h2>É para você se…</h2><ul>{sim}</ul></div>
   <div class="nao"><h2>Pense duas vezes se…</h2><ul>{nao}</ul></div>
  </section>
  <section class="bloco fecho" id="veredito">
   <h2>Veredito Elite Boardgamers</h2>
   <span class="selo {selo_class(c["selo"])}">{e(c["selo"])}</span>
   <p>{e(c["veredito"])}</p>
   <p class="tagline">{e(c["tagline"])}</p>
  </section>
  <section class="bloco comunidade"><h2>Gostou da resenha?</h2><p>A Elite Boardgamers publica resenhas de jogos premiados todos os dias. Entre no grupo para conversar sobre jogos e siga no Instagram.</p><div class="acoes"><a class="zap" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap", "ic zi")}<span><b>Entrar no grupo do WhatsApp</b></span></a><a class="ig-btn" href="{INSTAGRAM}" target="_blank" rel="noopener">{icone("insta")}<span>Seguir @eliteboardgamers</span></a></div></section>
  <section class="bloco claro fontes" id="fontes"><h2>Fontes</h2><ul>{fontes}</ul><p class="note">Consulta às fontes em {e(c["consulta"])}.</p></section>
 </div>
 <aside>
  {premios_bloco}
  <section class="bloco claro" id="ficha"><h2>Ficha técnica</h2><dl>{ficha_html}</dl><p class="note">{e(c["nota_ficha"])}</p></section>
 </aside>
</main>

<footer><div class="in">
 <span>Elite Boardgamers</span>
 <a href="../resenhas/">Todas as resenhas</a>
 <a href="../">Consulta Golden Geek</a>
 <a href="{INSTAGRAM}" target="_blank" rel="noopener">Instagram @eliteboardgamers</a>
 <a href="{WHATSAPP}" target="_blank" rel="noopener">Grupo do WhatsApp</a>
</div></footer>
<script>
(() => {{
  const img = document.querySelector(".capa img"), st = document.getElementById("salvar-st"), nome = "{slug}-elite-boardgamers.jpg";
  let arquivo = null;
  // Prepara o JPEG antes do toque: o compartilhamento precisa acontecer logo no clique.
  const preparar = () => {{
    if (arquivo || !img.naturalWidth) return;
    const cv = document.createElement("canvas");
    cv.width = img.naturalWidth; cv.height = img.naturalHeight;
    cv.getContext("2d").drawImage(img, 0, 0);
    cv.toBlob(b => {{ if (b) arquivo = new File([b], nome, {{ type: "image/jpeg" }}); }}, "image/jpeg", 0.92);
  }};
  img.complete ? preparar() : img.addEventListener("load", preparar);
  document.getElementById("b-salvar").addEventListener("click", async () => {{
    preparar();
    if (!arquivo) {{ st.textContent = "A imagem ainda está carregando. Tente de novo em um instante."; return; }}
    if (navigator.canShare && navigator.canShare({{ files: [arquivo] }})) {{
      try {{ await navigator.share({{ files: [arquivo] }}); st.textContent = "No menu, escolha “Salvar imagem” para mandar para a galeria."; }}
      catch (e) {{ if (e.name !== "AbortError") st.textContent = "Não deu para abrir o menu. Toque e segure na imagem e escolha “Salvar imagem”."; }}
    }} else {{
      const a = document.createElement("a");
      a.href = URL.createObjectURL(arquivo); a.download = nome; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
      st.textContent = "Imagem salva.";
    }}
  }});
  const caixa = document.getElementById("legenda");
  if (!caixa) return;
  const txt = document.getElementById("leg-txt"), lst = caixa.querySelector(".leg-st"), btn = document.getElementById("b-legenda");
  const texto = txt.textContent;
  // Seleciona o texto e copia na hora do toque (o Brave bloqueia a API assíncrona); a API moderna entra como reforço.
  const copiar = async () => {{
    const r = document.createRange(); r.selectNodeContents(txt);
    const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    let ok = false;
    try {{ ok = document.execCommand("copy"); }} catch {{}}
    try {{ await navigator.clipboard.writeText(texto); ok = true; }} catch {{}}
    lst.textContent = ok ? "Legenda copiada! É só colar no Instagram." : "Não deu para copiar automático: use “Compartilhar legenda” ou segure o dedo no texto.";
  }};
  btn.addEventListener("click", () => {{ caixa.hidden = false; btn.setAttribute("aria-expanded", "true"); copiar(); }});
  document.getElementById("b-copiar").addEventListener("click", copiar);
  const comp = document.getElementById("b-compartilhar");
  if (navigator.share) {{
    comp.hidden = false;
    comp.addEventListener("click", () => navigator.share({{ text: texto }}).catch(() => {{}}));
  }}
}})();
</script>
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
