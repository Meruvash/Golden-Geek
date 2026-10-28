"""Gera resenhas/index.html a partir das resenhas publicadas em pauta.json (mais recente primeiro).

Uso: python3 tools/build_lista.py
Lê conteudo/<slug>.json de cada resenha publicada.
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import seo  # noqa: E402
from filtros_resenha import PERFIS, derivar  # noqa: E402
from imagens_resp import srcset  # noqa: E402
from layout import cabecalho, rodape  # noqa: E402
from build_review import INSTAGRAM, ROOT, SITE, WHATSAPP, campo, capa_src, versao, e, faixa_nota, icone, nome_br, numero, selo_class, selo_perfil  # noqa: E402


def card(c):
    nota = numero(campo(c["ficha"], "nota bgg"))
    vit = sum(1 for a in c["premiacoes"] if a["resultado"] == "vencedor")
    titulo = nome_br(c)
    nota_html = f'<span class="nota {faixa_nota(nota)}" aria-label="Nota BGG {nota:.1f}">{f"{nota:.1f}".replace(".", ",")}</span>' if nota else ""
    premio = f'<span class="vit">{vit} vitória{"s" if vit != 1 else ""} em prêmios</span>' if vit else ""
    f = derivar(c)
    f["nome"] = " ".join({c["jogo"], titulo, c.get("titulo_busca", "")})
    dados = e(json.dumps(f, ensure_ascii=False, separators=(",", ":")))
    return f"""  <li data-f="{dados}"><a class="card" href="../{c["slug"]}/">
   <span class="capa"><img src="{capa_src(c["slug"])}" srcset="{srcset(ROOT / c["slug"] / "capa.jpg", "../", (400,))}" sizes="(min-width: 700px) 360px, 50vw" width="800" height="800" alt="{e(c["alt"])}" loading="lazy">{nota_html}</span>
   <span class="corpo">
    {selo_perfil(c, prefixo=False)}
    <h2>{e(titulo)}</h2>
    <span class="tag">{e(c["tagline"])}</span>
    {f'<span class="ress">Com ressalva: {e(c["ressalva"])}</span>' if c.get("ressalva") else ""}
    {premio}
   </span>
  </a></li>
"""


def build():
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    slugs = [p["url"].rstrip("/").split("/")[-1] for p in reversed(pauta["publicadas"])]
    conteudos = [json.loads((ROOT / "conteudo" / f"{s}.json").read_text(encoding="utf-8")) for s in slugs]
    cards = "".join(card(c) for c in conteudos)
    todos = [derivar(c) for c in conteudos]
    opcoes = lambda chave: sorted({x for d in todos for x in d[chave]})  # noqa: E731
    sel = lambda nome, rotulo, itens: (f'<label class="f">{rotulo}<select name="{nome}"><option value="">Todos</option>'  # noqa: E731
                                        + "".join(f'<option value="{e(v)}">{e(t)}</option>' for v, t in itens) + "</select></label>")
    chip = lambda campo, itens: (f'<div class="chips" data-campo="{campo}">'  # noqa: E731
                                 + "".join(f'<button type="button" data-v="{v}" aria-pressed="false">{t}</button>' for v, t in itens) + "</div>")
    filtros = f"""<div class="barra-f" id="barra-f" hidden>
  <button type="button" class="btn-filtro" id="abrir-f" aria-haspopup="dialog" aria-controls="dlg-f">
   <svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg><span>Filtrar resenhas</span><b class="badge" id="n-ativos" hidden></b>
  </button>
  <span class="resumo-f" id="resumo-f" aria-live="polite">{len(conteudos)} resenhas</span>
  <button type="button" class="limpar" id="limpar-topo" hidden>Limpar</button>
 </div>
 <dialog class="folha" id="dlg-f" aria-labelledby="t-f">
  <form class="filtros" id="filtros" role="search">
   <header class="folha-h"><h2 id="t-f">Filtrar resenhas</h2><button type="button" class="fechar" id="fechar-f" aria-label="Fechar filtros"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></header>
   <div class="folha-b">
    <input class="busca" type="search" name="q" placeholder="Buscar jogo pelo nome" autocomplete="off" aria-label="Buscar jogo pelo nome">
    <fieldset><legend>Jogadores</legend>{chip("jogadores", [(n, n if n < 6 else "6+") for n in range(1, 7)])}
     <label class="ck"><input type="checkbox" name="melhor"> só onde é a melhor contagem</label></fieldset>
    <fieldset><legend>Melhor para</legend>{chip("perfil", [(k, v[0]) for k, v in PERFIS.items() if any(d["melhor_para"] == k for d in todos)])}</fieldset>
    <fieldset><legend>Duração</legend>{chip("duracao", [(30, "Até 30 min"), (60, "30 a 60 min"), (120, "1 a 2 h"), (999, "Mais de 2 h")])}</fieldset>
    <fieldset><legend>Complexidade <small>(peso BGG)</small></legend>{chip("peso", [("leve", "Leve"), ("media", "Média"), ("pesada", "Pesada")])}</fieldset>
    <fieldset><legend>Estilo</legend>{chip("estilo", [(x, x) for x in opcoes("estilos")])}</fieldset>
    <div class="linha-f">
     {sel("mecanica", "Mecânica", [(x, x) for x in opcoes("mecanicas")])}
     {sel("premio", "Venceu o prêmio", [(x, x) for x in opcoes("premios")])}
     {sel("idade", "Pessoa mais nova na mesa", [(str(n), f"{n} anos") for n in (8, 10, 12, 14)])}
     {sel("preco", "Preço até", [(str(n), f"R$ {n}") for n in (150, 300, 500)])}
    </div>
    <div class="linha-f"><label class="ck"><input type="checkbox" name="solo"> tem modo solo</label><label class="ck"><input type="checkbox" name="pt"> edição em português</label></div>
    <label class="f">Ordenar por<select name="ordem"><option value="">Mais recentes</option><option value="nota">Nota BGG</option><option value="leve">Mais leve</option><option value="pesado">Mais pesado</option><option value="curto">Mais curto</option><option value="preco">Menor preço</option></select></label>
   </div>
   <footer class="folha-p"><button type="reset" class="limpar">Limpar</button><button type="button" class="ver" id="ver-f">Ver {len(conteudos)} resenhas</button></footer>
  </form>
 </dialog>
 <p class="vazio" id="vazio" hidden>Nenhuma resenha com esses filtros. <button type="button" class="limpar" id="limpar2">Limpar filtros</button></p>"""
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
<link rel="canonical" href="{SITE}/resenhas/">
<meta property="og:site_name" content="Elite Boardgamers">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="Resenhas Elite Boardgamers">
<meta property="og:description" content="Resenhas de jogos de tabuleiro premiados, com fontes: o que funciona, pontos de atenção e para quem é cada jogo.">
<meta property="og:type" content="website">
<meta property="og:url" content="{SITE}/resenhas/">
<meta property="og:image" content="{SITE}/resenhas/capa.jpg{versao(ROOT / "resenhas" / "capa.jpg")}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#000000">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<link rel="preload" href="../fontes/public-sans.woff2" as="font" type="font/woff2" crossorigin>
{seo.script(seo.trilha(("Início", f"{SITE}/"), ("Resenhas", f"{SITE}/resenhas/")))}
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
.nav{{border-bottom:1px solid var(--line);background:#0f1115}}
.nav ul{{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none}}
.nav a{{display:block;padding:11px 12px;white-space:nowrap;text-decoration:none;font-weight:700;font-size:.92rem;border-bottom:3px solid transparent}}
.nav a:hover{{border-bottom-color:var(--gold)}}.nav a[aria-current]{{color:var(--gold);border-bottom-color:var(--gold)}}
@media (max-width:700px){{.bar .ig span,.bar .zap-mini span,.gg-l{{display:none}}.bar .gg{{padding:6px 10px}}}}
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
.ress{{font-size:.8rem;font-weight:700;color:#8a5200}}
.barra-f[hidden]{{display:none}}
.barra-f{{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:14px;margin:0 -16px 16px;padding:10px 16px;background:rgba(0,0,0,.86);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}}
.btn-filtro{{position:relative;display:inline-flex;align-items:center;gap:10px;min-height:46px;padding:10px 20px 10px 16px;border:0;border-radius:999px;font:inherit;font-weight:800;font-size:1rem;color:#14100a;cursor:pointer;
 background:linear-gradient(180deg,#f3cd6a 0%,#e3b23c 55%,#c9962a 100%);box-shadow:0 1px 0 rgba(255,255,255,.45) inset,0 6px 18px rgba(227,178,60,.22);transition:transform .18s cubic-bezier(.16,1,.3,1),box-shadow .18s ease}}
.btn-filtro .ic{{width:20px;height:20px;stroke-width:2.4}}
.btn-filtro:hover{{transform:translateY(-1px);box-shadow:0 1px 0 rgba(255,255,255,.45) inset,0 10px 24px rgba(227,178,60,.32)}}
.btn-filtro:active{{transform:scale(.97)}}
.badge{{min-width:24px;height:24px;padding:0 7px;border-radius:999px;background:#14100a;color:var(--gold);font-size:.8rem;display:grid;place-items:center;font-variant-numeric:tabular-nums}}
.badge[hidden]{{display:none}}
.resumo-f{{color:var(--muted);font-weight:700;font-size:.92rem;font-variant-numeric:tabular-nums}}
.barra-f .limpar{{margin-left:auto}}
.folha{{border:0;padding:0;color:var(--ink);background:#0f1115;max-width:none;max-height:none;margin:0;inset:auto 0 0 0;width:100%;height:auto;max-height:88dvh;border-radius:18px 18px 0 0;box-shadow:0 -10px 40px rgba(0,0,0,.6)}}
.folha::backdrop{{background:rgba(0,0,0,.62)}}
.folha[open]{{animation:sobe .32s cubic-bezier(.16,1,.3,1)}}.folha[open]::backdrop{{animation:esmaece .32s ease}}
@keyframes sobe{{from{{transform:translateY(100%)}}to{{transform:none}}}}@keyframes lateral{{from{{transform:translateX(100%)}}to{{transform:none}}}}@keyframes esmaece{{from{{opacity:0}}to{{opacity:1}}}}
@media (min-width:760px){{.folha{{inset:0 0 0 auto;width:440px;height:100dvh;max-height:none;border-radius:18px 0 0 18px;box-shadow:-10px 0 40px rgba(0,0,0,.6)}}.folha[open]{{animation-name:lateral}}}}
@media (prefers-reduced-motion:reduce){{.folha[open],.folha[open]::backdrop{{animation:none}}.btn-filtro{{transition:none}}}}
.filtros{{display:flex;flex-direction:column;height:100%;max-height:inherit}}
.folha-h{{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid var(--line)}}
.folha-h h2{{font-size:1.15rem;font-weight:800}}
.folha-h::before{{content:"";position:absolute;left:50%;top:7px;width:40px;height:4px;border-radius:4px;background:#3a3f48;transform:translateX(-50%)}}
@media (min-width:760px){{.folha-h::before{{display:none}}}}
.fechar{{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid #3a3f48;background:none;color:var(--ink);cursor:pointer}}.fechar:hover{{border-color:var(--gold)}}
.folha-b{{flex:1;overflow-y:auto;overscroll-behavior:contain;padding:16px 18px;display:grid;gap:16px;align-content:start}}
.folha-p{{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 18px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--line);background:#0f1115}}
.ver{{flex:1;max-width:260px;min-height:48px;border:0;border-radius:999px;font:inherit;font-weight:800;color:#14100a;cursor:pointer;background:linear-gradient(180deg,#f3cd6a,#e3b23c 55%,#c9962a);font-variant-numeric:tabular-nums}}
.ver:active{{transform:scale(.98)}}
.filtros fieldset{{border:0;margin:0;padding:0;display:grid;gap:8px}}
.filtros legend{{font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);padding:0;margin-bottom:8px}}
.filtros legend small{{text-transform:none;letter-spacing:0;font-weight:600}}
.busca{{width:100%;font:inherit;padding:12px 14px;border-radius:10px;border:1px solid #3a3f48;background:#000;color:var(--ink)}}
.busca:focus{{border-color:var(--gold);outline:none}}
.chips{{display:flex;flex-wrap:wrap;gap:8px}}
.chips button{{font:inherit;font-size:.92rem;font-weight:700;min-height:40px;padding:6px 14px;border-radius:999px;border:1px solid #3a3f48;background:transparent;color:var(--ink);cursor:pointer;transition:background-color .15s ease,border-color .15s ease}}
.chips button:hover{{border-color:var(--gold)}}
.chips button[aria-pressed="true"]{{background:var(--gold);border-color:var(--gold);color:#000}}
.linha-f{{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px 14px;align-items:end}}
.f{{display:grid;gap:6px;font-size:.78rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}}
.f select{{font:inherit;font-size:.95rem;font-weight:600;letter-spacing:0;text-transform:none;min-height:42px;padding:8px 10px;border-radius:8px;border:1px solid #3a3f48;background:#000;color:var(--ink)}}
.ck{{display:flex;align-items:center;gap:8px;font-size:.92rem;color:#c9cfd8;min-height:40px}}.ck input{{width:18px;height:18px;accent-color:var(--gold)}}
.limpar{{font:inherit;font-weight:700;color:var(--gold);background:none;border:0;cursor:pointer;padding:8px 0;text-decoration:underline;text-underline-offset:3px}}
.vazio{{padding:24px;border:1px dashed #3a3f48;border-radius:12px;text-align:center;color:#c9cfd8;margin-bottom:24px}}
.grid li[hidden]{{display:none}}
.card h2{{font-size:1.2rem;line-height:1.2;font-weight:800}}
.tag{{font-size:.92rem;color:#3a414c}}
.vit{{font-size:.82rem;color:#5a6270;display:flex;align-items:center;gap:6px}}
.vit::before{{content:"";width:12px;height:12px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f7d77a,var(--gold) 60%,#b9871d)}}
footer{{border-top:1px solid var(--line);font-size:.88rem}}
footer .in{{display:flex;flex-wrap:wrap;gap:10px 20px;padding-top:18px;padding-bottom:18px}}
@media (max-width:560px){{.grid{{grid-template-columns:1fr 1fr;gap:12px}}.corpo{{padding:10px 12px 14px}}.card h2{{font-size:1rem}}.tag{{font-size:.84rem}}.nota{{width:38px;height:44px;font-size:.85rem;right:6px;bottom:6px}}}}
@media (max-width:599px){{.marca img{{width:68px}}.topo{{padding:24px 0 18px;gap:14px}}.lede{{font-size:1rem}}.selo{{font-size:.72rem;padding:2px 7px}}.vit{{font-size:.78rem}}footer .in{{align-items:center}}footer a{{display:inline-block;padding:6px 0}}}}
</style>
</head>
<body>
{cabecalho("../", "Resenhas")}
<main class="in">
 <section class="topo">
  <h1>Resenhas de jogos premiados</h1>
  <p class="lede">{n} resenhas com fontes: como funciona, o que funciona, pontos de atenção e para quem é cada jogo. Só entram jogos premiados no Golden Geek, Spiel des Jahres, Kennerspiel, As d'Or e Deutscher Spiele Preis.</p>
  <a class="zap" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap")}<span><b>Entre no grupo do WhatsApp</b><small>Receba as novas resenhas e converse sobre jogos</small></span></a>
 </section>
 {filtros}
 <ul class="grid" id="lista">
{cards} </ul>
</main>
{rodape("../")}
<script>
(() => {{
  const form = document.getElementById("filtros"), lista = document.getElementById("lista"), dlg = document.getElementById("dlg-f");
  if (!dlg.showModal) return;  // navegador sem <dialog>: fica a lista completa
  const itens = [...lista.children].map((li, i) => ({{li, i, d: JSON.parse(li.dataset.f)}}));
  const total = itens.length, $ = id => document.getElementById(id);
  const norm = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const chips = {{}};
  const ler = () => {{
    const v = Object.fromEntries(new FormData(form));
    form.querySelectorAll(".chips").forEach(g => v[g.dataset.campo] = chips[g.dataset.campo] || "");
    return v;
  }};
  const passa = (d, v) => {{
    if (v.q && !norm(d.nome).includes(norm(v.q.trim()))) return false;
    if (v.jogadores) {{
      const n = +v.jogadores, j = d.jogadores;
      if (!j || (n < 6 ? n < j[0] || n > j[1] : j[1] < 6)) return false;
      if (v.melhor && !d.melhor.some(m => n < 6 ? m === n : m >= 6)) return false;
    }}
    if (v.duracao) {{
      const t = d.duracao, lim = {{"30": [0, 30], "60": [30, 60], "120": [60, 120], "999": [121, 9999]}}[v.duracao];
      if (!t || t[0] > lim[1] || t[1] < lim[0]) return false;
    }}
    if (v.peso) {{
      if (d.peso == null) return false;
      if (v.peso === "leve" ? d.peso >= 2 : v.peso === "media" ? d.peso < 2 || d.peso > 3 : d.peso <= 3) return false;
    }}
    if (v.perfil && d.melhor_para !== v.perfil) return false;
    if (v.estilo && !d.estilos.includes(v.estilo)) return false;
    if (v.mecanica && !d.mecanicas.includes(v.mecanica)) return false;
    if (v.premio && !d.premios.includes(v.premio)) return false;
    if (v.idade && (d.idade == null || d.idade > +v.idade)) return false;
    if (v.preco && (d.preco == null || d.preco > +v.preco)) return false;
    if (v.solo && !d.solo) return false;
    if (v.pt && !d.portugues) return false;
    return true;
  }};
  const ORDEM = {{
    nota: (a, b) => (b.d.nota ?? -1) - (a.d.nota ?? -1),
    leve: (a, b) => (a.d.peso ?? 99) - (b.d.peso ?? 99),
    pesado: (a, b) => (b.d.peso ?? -1) - (a.d.peso ?? -1),
    curto: (a, b) => (a.d.duracao?.[0] ?? 9999) - (b.d.duracao?.[0] ?? 9999),
    preco: (a, b) => (a.d.preco ?? 1e9) - (b.d.preco ?? 1e9),
  }};
  const aplicar = (gravar = true) => {{
    const v = ler();
    let n = 0;
    itens.forEach(x => {{ const ok = passa(x.d, v); x.li.hidden = !ok; n += ok; }});
    [...itens].sort(ORDEM[v.ordem] || ((a, b) => a.i - b.i)).forEach(x => lista.append(x.li));
    const ativos = Object.entries(v).filter(([k, x]) => x && k !== "ordem" && !(k === "melhor" && !v.jogadores)).length;
    $("n-ativos").hidden = !ativos; $("n-ativos").textContent = ativos;
    $("abrir-f").setAttribute("aria-label", ativos ? `Filtrar resenhas, ${{ativos}} filtro${{ativos > 1 ? "s" : ""}} ativo${{ativos > 1 ? "s" : ""}}` : "Filtrar resenhas");
    $("resumo-f").textContent = ativos ? `${{n}} de ${{total}} resenhas` : `${{total}} resenhas`;
    $("limpar-topo").hidden = !ativos && !v.ordem;
    $("ver-f").textContent = n ? `Ver ${{n}} resenha${{n === 1 ? "" : "s"}}` : "Nenhuma resenha";
    $("ver-f").disabled = !n;
    $("vazio").hidden = n > 0;
    if (gravar) {{
      const q = new URLSearchParams(Object.entries(v).filter(([, x]) => x));
      history.replaceState(null, "", q.toString() ? "?" + q : location.pathname);
    }}
  }};
  const marcar = (g, val) => g.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === val));
  form.querySelectorAll(".chips").forEach(g => g.addEventListener("click", ev => {{
    const b = ev.target.closest("button"); if (!b) return;
    chips[g.dataset.campo] = chips[g.dataset.campo] === b.dataset.v ? "" : b.dataset.v;
    marcar(g, chips[g.dataset.campo]);
    aplicar();
  }}));
  form.addEventListener("input", () => aplicar());
  form.addEventListener("submit", ev => {{ ev.preventDefault(); fechar(); }});
  form.addEventListener("reset", () => setTimeout(() => {{
    Object.keys(chips).forEach(k => chips[k] = "");
    form.querySelectorAll(".chips").forEach(g => marcar(g, ""));
    aplicar();
  }}));
  const limpar = () => form.reset();
  $("limpar-topo").addEventListener("click", limpar);
  $("limpar2").addEventListener("click", limpar);
  // abrir e fechar a gaveta
  const fechar = () => {{ dlg.close(); }};
  $("abrir-f").addEventListener("click", () => dlg.showModal());
  $("fechar-f").addEventListener("click", fechar);
  $("ver-f").addEventListener("click", () => {{ fechar(); $("barra-f").scrollIntoView({{block: "start"}}); }});
  dlg.addEventListener("click", ev => {{ if (ev.target === dlg) fechar(); }});  // toque fora da gaveta
  // filtros vindos do endereço (link compartilhado)
  new URLSearchParams(location.search).forEach((val, k) => {{
    const g = form.querySelector(`.chips[data-campo="${{k}}"]`);
    if (g) {{ chips[k] = val; marcar(g, val); return; }}
    const el = form.elements[k]; if (!el) return;
    if (el.type === "checkbox") el.checked = true; else el.value = val;
  }});
  $("barra-f").hidden = false;
  aplicar(false);
}})();
</script>
{seo.ANALYTICS}
</body>
</html>
"""


if __name__ == "__main__":
    (ROOT / "resenhas" / "index.html").write_text(build(), encoding="utf-8")
    print("ok resenhas/index.html")
