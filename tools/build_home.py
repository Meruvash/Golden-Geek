"""Gera a página inicial de notícias e a página de cada notícia.

Uso: python3 tools/build_home.py
Lê conteudo/noticias/*.json (uma nota por arquivo), conteudo/home.json (Em alta, Financiamentos, Agenda),
conteudo/lancamentos/<AAAA-MM>.json (calendário da Ludopedia) e pauta.json (últimas resenhas).
Saída: index.html e noticias/<slug>/index.html. As regras das notas estão em PLANO_NOTICIAS.md.
"""
import json
import re
import subprocess
import sys
import unicodedata
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from PIL import Image  # noqa: E402
import seo  # noqa: E402
from imagens_resp import miniatura, srcset  # noqa: E402
from build_sitemap import lastmod_registrado  # noqa: E402
from build_review import INSTAGRAM, ROOT, SITE, WHATSAPP, e, icone, versao  # noqa: E402
from layout import CSS_TRILHA, cabecalho, rodape, trilha  # noqa: E402
from noticias.checar_noticia import problemas  # noqa: E402

MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
SELO_CLASSE = {"Vale a compra": "compra", "Vale acompanhar": "acompanhar", "Para fãs do jogo base": "fas", "Com ressalvas": "ressalvas", "Informativo": "info"}
CAT_CLASSE = {"Prêmios": "premios", "Chegando ao Brasil": "brasil", "Mercado": "mercado", "Financiamento": "financ", "Eventos": "mercado"}


def norm(t):
    return unicodedata.normalize("NFKD", t.lower()).encode("ascii", "ignore").decode()


def data_longa(iso):
    d = date.fromisoformat(iso)
    return f"{d.day} de {MESES[d.month - 1]} de {d.year}"


def data_curta(iso):
    d = date.fromisoformat(iso)
    return f"{d.day:02d}/{d.month:02d}"


def publicado_em(p):
    """Hora em que a nota entrou no site: o commit que criou o arquivo ou, se ainda não foi commitado, agora."""
    r = subprocess.run(["git", "log", "--diff-filter=A", "--format=%cI", "--", str(p.relative_to(ROOT))],
                       cwd=ROOT, capture_output=True, text=True)
    linhas = r.stdout.split()
    return linhas[-1] if r.returncode == 0 and linhas else datetime.now(timezone.utc).isoformat(timespec="seconds")


def notas():
    ns = []
    for p in sorted((ROOT / "conteudo" / "noticias").glob("*.json")):
        n = json.loads(p.read_text(encoding="utf-8"))
        # a ordem das Últimas notícias depende da hora de publicação: nota sem ela ganha uma e o arquivo é salvo
        if not n.get("publicado_em"):
            n["publicado_em"] = publicado_em(p)
            p.write_text(json.dumps(n, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        ns.append(n)
    ruins = {n["slug"]: problemas(n) for n in ns if problemas(n)}
    if ruins:
        sys.exit("Notícias fora do padrão (rode tools/noticias/checar_noticia.py): " + ", ".join(ruins))
    # mais recentes primeiro (dia e hora de publicação); empate, as mais pontuadas no crivo
    return sorted(ns, key=lambda n: (n["data"], datetime.fromisoformat(n["publicado_em"]).timestamp(), n["crivo"]["pontos"]), reverse=True)


def mes_chegando(hoje=None):
    """Mês do bloco Chegando ao Brasil: o atual até o dia 14, depois o próximo (se a coleta já salvou)."""
    hoje = hoje or date.today()
    prox = (hoje.replace(day=1) + timedelta(days=32)).replace(day=1).strftime("%Y-%m")
    if hoje.day >= 15 and (ROOT / "conteudo" / "lancamentos" / f"{prox}.json").exists():
        return prox
    meses = sorted(p.stem for p in (ROOT / "conteudo" / "lancamentos").glob("*.json"))
    atual = hoje.strftime("%Y-%m")
    return atual if atual in meses else max(m for m in meses)


def lancamentos(mes):
    d = json.loads((ROOT / "conteudo" / "lancamentos" / f"{mes}.json").read_text(encoding="utf-8"))
    jogos = [j for g in ("previstos", "lancados") for j in d[g] if j.get("fl_tipo") == 1]
    return d["label"], jogos


def capa_jogo(pre, id_jogo):
    return f"{pre}noticias/capas/{id_jogo}.jpg"


CSS = """
@font-face{font-family:"Public Sans";src:url(%(pre)sfontes/public-sans.woff2) format("woff2");font-weight:400 800;font-display:swap}
/* Moldura preta da marca com cartões claros de leitura; régua de densidade do BoardGameGeek */
:root{color-scheme:dark;--ground:#000;--bar:#000;--panel:#0f1115;--panel2:#171a20;--ink:#eceff3;--muted:#a1a9b5;--line:#262a32;
--paper:#f4f5f7;--paper-ink:#14171c;--paper-muted:#5a6270;--paper-line:#dde1e7;--gold:#e3b23c;--link:#1f5fae;--zap:#157a43;
--premios:#8a5f00;--premios-bg:#fff4d1;--brasil:#1b7a45;--brasil-bg:#e3f4ea;--mercado:#1f5fae;--mercado-bg:#e3ecf8;--financ:#6b4ea3;--financ-bg:#efe9f8}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%%}
body{margin:0;background:var(--ground);color:var(--ink);font:16px/1.55 "Public Sans",system-ui,sans-serif;padding-left:env(safe-area-inset-left,0px);padding-right:env(safe-area-inset-right,0px)}
h1,h2,h3,p,ul,ol,figure{margin:0}ul,ol{padding:0;list-style:none}img{display:block;max-width:100%%;height:auto}a{color:inherit}
::selection{background:var(--gold);color:#000}
:focus-visible{outline:3px solid var(--gold);outline-offset:2px;border-radius:3px}
.in{max-width:1180px;margin:0 auto;padding-left:16px;padding-right:16px}
.ic{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;flex:none}
.bar{border-bottom:1px solid var(--line);background:var(--bar)}
.bar .in{display:flex;align-items:center;gap:12px;padding-top:8px;padding-bottom:8px}
.marca img{width:84px;border-radius:6px}
.bar a{text-decoration:none;font-weight:600;font-size:.95rem}
.bar .ig{margin-left:auto;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px}.bar .ig:hover{color:var(--gold)}
.bar .zap-mini{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px;background:var(--zap);color:#fff}
.nav{border-bottom:1px solid var(--line);background:var(--panel)}
.nav ul{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;padding-top:0;padding-bottom:0}
.nav a{display:block;padding:11px 12px;white-space:nowrap;text-decoration:none;font-weight:700;font-size:.92rem;border-bottom:3px solid transparent}
.nav a:hover{border-bottom-color:var(--gold)}.nav a[aria-current]{color:var(--gold);border-bottom-color:var(--gold)}
@media (max-width:700px){.bar .ig span,.bar .zap-mini span{display:none}}
.edicao{color:var(--muted);font-size:.85rem;padding-top:14px}
.grade{display:grid;gap:18px;padding-top:10px;padding-bottom:40px}
.lado{display:contents}
.manchete{order:1}.ultimas{order:2}.brasil{order:3}.alta{order:4}.financ{order:5}.agenda{order:6}.resenhas{order:7}.comunidade{order:8}
@media (min-width:900px){
 .grade{grid-template-columns:minmax(0,1fr) 340px;grid-template-areas:"manchete lado" "ultimas lado" "brasil brasil" "financ resenhas" "comunidade comunidade";align-items:start}
 .lado{display:grid;gap:18px;grid-area:lado;align-content:start}
 .manchete{grid-area:manchete}.ultimas{grid-area:ultimas}.brasil{grid-area:brasil}.financ{grid-area:financ}.resenhas{grid-area:resenhas}.comunidade{grid-area:comunidade}
}
.bloco{background:var(--paper);color:var(--paper-ink);border-radius:10px;padding:16px;min-width:0}
.bloco>h2,.bloco>.h-sec{display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-size:.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--paper-muted);margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid var(--paper-ink)}
.bloco>h2 a{font-size:.8rem;letter-spacing:0;text-transform:none;color:var(--link);font-weight:700;text-decoration:none}
.bloco>h2 a:hover{text-decoration:underline}
.cat{display:inline-block;font-size:.72rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;border-radius:4px;padding:2px 7px}
.cat.premios{color:var(--premios);background:var(--premios-bg)}.cat.brasil{color:var(--brasil);background:var(--brasil-bg)}
.cat.mercado{color:var(--mercado);background:var(--mercado-bg)}.cat.financ{color:var(--financ);background:var(--financ-bg)}
.meta{font-size:.8rem;color:var(--paper-muted)}
/* manchete */
.manchete{padding:0;overflow:hidden;display:grid}
.manchete a{text-decoration:none;display:grid}
.manchete figure{background:#1c1f25}
.manchete img{width:100%%;aspect-ratio:16/10;object-fit:cover;object-position:center 30%%}
.manchete .txt{padding:16px;display:grid;gap:8px}
.manchete .kick{font-size:.75rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--premios)}
.manchete h1{font-size:clamp(1.5rem,4.2vw,2.2rem);line-height:1.12;font-weight:800;letter-spacing:-.015em;text-wrap:balance}
.manchete a:hover h1{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:4px}
.manchete p{color:#3a414c;max-width:62ch}
.credito{font-size:.72rem;color:var(--paper-muted)}
@media (min-width:640px){.manchete a{grid-template-columns:42%% 1fr}.manchete img{aspect-ratio:auto;height:100%%;min-height:300px}.manchete .txt{padding:20px 22px;align-content:center}}
/* últimas */
.lista-n li{border-top:1px solid var(--paper-line)}.lista-n li:first-child{border-top:0}
.lista-n a{display:grid;grid-template-columns:76px 1fr;gap:12px;padding:12px 0;text-decoration:none}
.lista-n li:first-child a{padding-top:0}
.lista-n img,.lista-n .sem{width:76px;height:76px;border-radius:6px;object-fit:cover;background:#e6e9ee}
.lista-n .sem{display:grid;place-items:center;color:var(--paper-muted)}
.lista-n h3,.nota .lista-n h2{font-size:1.02rem;line-height:1.25;font-weight:800;margin:3px 0 2px;text-wrap:balance;letter-spacing:0;text-transform:none;color:inherit}
.lista-n a:hover h3{text-decoration:underline}
.lista-n p{font-size:.88rem;color:#3a414c;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
/* em alta: régua do "The Hotness" do BGG */
.hot li{counter-increment:h;border-top:1px solid var(--paper-line)}.hot li:first-child{border-top:0}
.hot{counter-reset:h}
.hot a{display:grid;grid-template-columns:22px 44px 1fr;gap:10px;align-items:center;padding:9px 0;text-decoration:none}
.hot a::before{content:counter(h);font-weight:800;font-size:1.05rem;color:var(--paper-muted);text-align:right;font-variant-numeric:tabular-nums}
.hot img{width:44px;height:44px;object-fit:cover;border-radius:4px}
.hot b{display:block;font-size:.93rem;line-height:1.25}.hot span{display:block;font-size:.8rem;color:var(--paper-muted)}
.hot a:hover b{text-decoration:underline}
/* agenda */
.agenda li{display:grid;grid-template-columns:104px 1fr;gap:10px;padding:9px 0;border-top:1px solid var(--paper-line);font-size:.9rem}
.agenda li:first-child{border-top:0;padding-top:0}
.agenda .q{font-weight:800;font-variant-numeric:tabular-nums}.agenda .q small{display:block;font-weight:600;font-size:.72rem;color:var(--paper-muted)}
.agenda .d{color:var(--paper-muted);font-size:.82rem}.agenda a{text-decoration:none}.agenda a:hover{text-decoration:underline}
/* chegando ao Brasil */
.capas{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px}
.capas li{flex:0 0 132px;scroll-snap-align:start}
.capas a{display:grid;gap:6px;text-decoration:none}
.capas img{width:132px;height:140px;object-fit:cover;border-radius:6px;background:#e6e9ee}
.capas b{font-size:.86rem;line-height:1.2}.capas span{font-size:.75rem;color:var(--paper-muted)}
.capas .st{justify-self:start;font-size:.68rem;font-weight:800;border-radius:4px;padding:1px 6px;color:var(--brasil);background:var(--brasil-bg)}
.capas .st.lancado{color:#fff;background:var(--brasil)}
.capas a:hover b{text-decoration:underline}
.capas .todos a{height:100%%;min-height:140px;align-content:center;justify-items:center;text-align:center;border-radius:6px;background:var(--brasil-bg);color:var(--brasil);padding:12px}
.capas .todos .mais{font-size:.86rem;font-weight:800;line-height:1.25}.capas .todos .mais::after{content:" →";content:" →" / ""}
/* financiamentos */
.financ li{display:grid;gap:2px;padding:10px 0;border-top:1px solid var(--paper-line)}.financ li:first-child{border-top:0;padding-top:0}
.financ a{font-weight:800;text-decoration:none}.financ a:hover{text-decoration:underline}
.financ .onde{font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--financ)}
.financ .s{font-size:.86rem;color:#3a414c}.financ .f{font-size:.75rem;color:var(--paper-muted)}
/* resenhas */
.res{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.res a{display:grid;gap:6px;text-decoration:none}
.res img{width:100%%;aspect-ratio:1;object-fit:cover;border-radius:6px}
.res b{font-size:.9rem;line-height:1.2}.res a:hover b{text-decoration:underline}
.comunidade{background:var(--panel2);color:var(--ink);border:1px solid var(--line);display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}
.comunidade p{max-width:60ch;color:#c9cfd8}
.comunidade .acoes{display:flex;flex-wrap:wrap;gap:10px}
.btn{display:flex;align-items:center;gap:8px;padding:12px 16px;border-radius:10px;text-decoration:none;font-weight:800}
.btn.zap{background:var(--zap);color:#fff}.btn.ig{border:1px solid #3a3f48}.btn.ig:hover{border-color:var(--gold);color:var(--gold)}
footer{border-top:1px solid var(--line);font-size:.88rem}
footer .in{display:flex;flex-wrap:wrap;gap:10px 20px;padding-top:18px;padding-bottom:18px}
.selo{display:inline-block;font-size:.74rem;font-weight:800;border-radius:999px;padding:2px 10px;color:#fff;white-space:nowrap}
.selo.compra{background:#157a43}.selo.acompanhar{background:#1f5fae}.selo.fas{background:#6b4ea3}.selo.ressalvas{background:#8a5200}.selo.info{background:#5a6270}
.manchete .opina{font-size:.92rem;color:var(--paper-ink);border-left:3px solid var(--gold);padding-left:10px}
/* página da notícia */
.nota{max-width:760px;margin:0 auto;padding-top:20px;padding-bottom:48px;display:grid;gap:16px}
.nota .bloco{padding:20px}
.nota h1{font-size:clamp(1.6rem,5vw,2.4rem);line-height:1.12;font-weight:800;letter-spacing:-.015em;text-wrap:balance;margin:8px 0}
.nota .lide{font-size:1.08rem;font-weight:600;color:var(--paper-ink)}
.nota .corpo{display:grid;gap:12px;color:#3a414c;max-width:66ch}
.nota figure img{width:100%%;max-height:420px;object-fit:contain;background:#e6e9ee;border-radius:8px}
.nota figcaption{margin-top:6px}
.nota h2,.nota .h-sec{font-size:.8rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--paper-muted);margin-bottom:8px}
.nota .h-sec{margin:0 0 8px;line-height:inherit;text-wrap:wrap}
.leia li{padding:8px 0;border-top:1px solid var(--paper-line)}.leia li:first-child{border-top:0}.leia a{color:var(--link);font-weight:700;text-decoration:none}.leia a:hover{text-decoration:underline}
.paginas{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;font-weight:700}.paginas a{color:var(--link)}.paginas span{color:var(--paper-muted);font-size:.9rem}
.nota .fontes li{margin:6px 0;font-size:.92rem}.nota .fontes a{color:var(--link)}.nota .fontes span{color:var(--paper-muted);font-size:.82rem}
.nota .jogos{display:flex;flex-wrap:wrap;gap:8px}.nota .jogos a{display:inline-block;padding:6px 10px;border-radius:6px;background:#e6e9ee;text-decoration:none;font-weight:700;font-size:.9rem}
.nota .crivo{font-size:.85rem;color:var(--paper-muted)}.nota .crivo b{color:var(--paper-ink)}
.volta{color:var(--gold);font-weight:700;text-decoration:none}
.nota .abre{display:grid;gap:14px}
.nota .importa{border-left:4px solid var(--gold)}.nota .importa p{font-size:1.02rem;color:var(--paper-ink)}.nota .assina{font-size:.78rem!important;color:var(--paper-muted)!important;margin-top:8px}
.nums{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}
.nums li{background:#fff;border:1px solid var(--paper-line);border-radius:8px;padding:12px;display:grid;gap:2px}
.nums b{font-size:1.35rem;line-height:1.15;font-weight:800;font-variant-numeric:tabular-nums}.nums span{font-size:.86rem;color:#3a414c}.nums small{font-size:.72rem;color:var(--paper-muted)}
.nota .brasil-n{border-left:4px solid var(--brasil)}.nota .brasil-n p{color:#3a414c}
.crit{display:grid;gap:12px}.crit p{color:#3a414c}
.crit .cit q{display:block;font-size:1.15rem;font-weight:700;line-height:1.3;color:var(--paper-ink);quotes:"“" "”"}
.crit cite{display:block;margin-top:4px;font-style:normal;font-size:.82rem;color:var(--paper-muted)}
.nota .quem{display:grid;gap:16px}@media (min-width:640px){.nota .quem{grid-template-columns:1fr 1fr}}
.quem li{position:relative;padding-left:16px;margin:6px 0;color:#3a414c}.quem li::before{content:"";position:absolute;left:0;top:.6em;width:7px;height:7px;border-radius:50%%;background:#1b7a45}
.quem .no li::before{background:#b3263e}
.nota .veredito{background:var(--panel2);color:var(--ink);border:1px solid var(--gold)}.nota .veredito h2{color:var(--gold)}
.nota .veredito p{font-size:1.08rem;font-weight:600;margin-top:10px;max-width:62ch}
/* celular: blocos de ponta a ponta, lista enxuta e textos miúdos um pouco maiores */
@media (max-width:599px){
 .marca img{width:68px}
 .grade{gap:8px;padding-bottom:24px}.nota{gap:8px;padding-top:14px;padding-bottom:24px}
 .grade .bloco,.nota .bloco{margin-left:-16px;margin-right:-16px;border-radius:0}
 .nota .bloco{padding:18px 16px}
 .nota .abre figure{margin:-18px -16px 0}.nota .abre figure img{border-radius:0;max-height:440px;object-fit:contain}
 .nota .abre figcaption{padding:0 16px}
 .manchete img{aspect-ratio:4/3;object-position:center top}.manchete .txt{padding:16px 16px 18px}.manchete h1{font-size:1.65rem}.manchete p{font-size:1rem}
 .meta{font-size:.84rem}.cat{font-size:.74rem}.credito{font-size:.76rem}
 .lista-n a{grid-template-columns:68px 1fr;gap:12px;padding:14px 0}
 .lista-n img{width:68px;height:68px}
 .lista-n .sem-img{grid-template-columns:1fr}.lista-n .sem{display:none}
 .lista-n .meta{display:inline}
 .lista-n div>.cat+.meta{white-space:nowrap}
 .lista-n h3,.nota .lista-n h2{font-size:1.06rem;margin:5px 0 6px}
 .lista-n p{display:block;-webkit-line-clamp:unset;overflow:visible;font-size:.92rem}
 .lista-n .resumo{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:5px;color:#3a414c}
 .hot span,.financ .f,.capas span{font-size:.82rem}
 .agenda li{grid-template-columns:92px 1fr}
 .nota .fontes li{margin:10px 0}
 footer .in{gap:4px 20px;align-items:center}footer a{display:inline-block;padding:6px 0}
}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto}}
"""


def og_dim(imagem):
    """og:image:width/height lidos do arquivo, quando a imagem é do próprio site."""
    arq = ROOT / imagem.removeprefix(SITE + "/").split("?")[0]
    if not imagem.startswith(SITE + "/") or not arq.is_file():
        return ""
    with Image.open(arq) as im:
        return f'\n<meta property="og:image:width" content="{im.width}">\n<meta property="og:image:height" content="{im.height}">'


def capa_secao(secao):
    """Prévia 1200×630 da seção (tools/capa_secoes.js), com ?v= para o WhatsApp buscar a nova quando mudar."""
    return f"{SITE}/{secao}/capa.jpg{versao(ROOT / secao / 'capa.jpg')}"


def pagina(titulo, descricao, url, imagem, pre, corpo, tipo="website", head_extra="", jsonld=""):
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(titulo)}</title>
<meta name="description" content="{e(descricao)}">
{f'<link rel="canonical" href="{url}">' if url else '<meta name="robots" content="noindex">'}
<meta property="og:site_name" content="Elite Boardgamers">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="{e(titulo)}">
<meta property="og:description" content="{e(descricao)}">
<meta property="og:type" content="{tipo}">
<meta property="og:url" content="{url or SITE + '/'}">
<meta property="og:image" content="{imagem}">{og_dim(imagem)}
<meta name="twitter:card" content="summary_large_image">{head_extra}
<meta name="theme-color" content="#000000">
<link rel="icon" href="{pre}favicon.svg" type="image/svg+xml">
<link rel="preload" href="{pre}fontes/public-sans.woff2" as="font" type="font/woff2" crossorigin>
<style>{CSS % {"pre": pre}}{CSS_TRILHA}</style>
{jsonld}
</head>
<body>
{corpo}
{seo.ANALYTICS}
</body>
</html>
"""


def build_politica():
    """Página de política editorial: quem responde pelo site e como notícias e resenhas são feitas."""
    pre = "../"
    url = f"{SITE}/politica-editorial/"
    corpo = f"""{cabecalho(pre, "")}
<main id="conteudo" class="in"><div class="nota">
 <article class="bloco">
  <h1>Política editorial</h1>
  <p class="lide">Como a Elite Boardgamers escolhe, escreve, confere e corrige o que publica.</p>
 </article>
 <section class="bloco"><h2>Quem responde pelo site</h2><div class="corpo">
  <p><b>Anderson Pelicioni de Castro</b>, advogado, colecionador entusiasta e pesquisador de jogos de tabuleiro, é o responsável editorial da Elite Boardgamers. Ele lê e verifica pessoalmente tudo o que é publicado.</p>
 </div></section>
 <section class="bloco"><h2>Como o conteúdo é produzido</h2><div class="corpo">
  <p>Notícias e resenhas são redigidas com apoio de ferramentas de inteligência artificial, sempre a partir das fontes citadas em cada página. Nenhum texto vai ao ar sem fontes, e todo número, prêmio, preço ou data precisa estar numa delas.</p>
  <p>Todos os dias, à noite, o que foi publicado é conferido de novo contra as fontes. Dado que não se confirma sai do texto ou passa a constar como "não confirmado nas fontes consultadas".</p>
 </div></section>
 <section class="bloco"><h2>Como escolhemos as notícias</h2><div class="corpo">
  <p>Toda notícia passa por um crivo editorial. Fica de fora o que não tem fonte primária (boato, vazamento ou "fontes dizem"), conteúdo pago ou release sem fato novo, notícia atrasada e assunto sem relação com tabuleiro moderno.</p>
  <p>O que passa recebe pontos por relevância para quem joga no Brasil, como lançamento confirmado no país, prêmio importante ou confirmação por duas fontes independentes. Só entra com 5 pontos ou mais, e cada notícia mostra no fim por que entrou.</p>
 </div></section>
 <section class="bloco"><h2>Fato e opinião</h2><div class="corpo">
  <p>Os fatos vêm com fonte e data de consulta. A nossa opinião aparece separada, nas seções "Por que importa" e "Nossa opinião". A opinião de outros veículos aparece sempre com o nome de quem a deu.</p>
  <p>As resenhas reúnem a análise de veículos especializados e dados públicos, como os do BoardGameGeek e da Ludopedia. A nota exibida é a do BoardGameGeek, dada pelos jogadores de lá; não damos nota própria. Preços sempre aparecem com a data em que foram consultados.</p>
 </div></section>
 <section class="bloco"><h2>Imagens</h2><div class="corpo">
  <p>Usamos fotos oficiais de divulgação das editoras, imagens de licença livre ou fotos nossas, sempre com crédito.</p>
 </div></section>
 <section class="bloco"><h2>Medição de visitas</h2><div class="corpo">
  <p>Contamos as visitas com o Cloudflare Web Analytics, que não usa cookies e não identifica quem visita o site. Os números servem só para saber quais páginas são lidas e melhorar o conteúdo.</p>
 </div></section>
 <section class="bloco"><h2>Correções</h2><div class="corpo">
  <p>Encontrou um erro? Mande uma mensagem no Instagram <a href="{INSTAGRAM}" target="_blank" rel="noopener">@eliteboardgamers</a> com o link da página e a fonte da informação correta. Erros confirmados são corrigidos na própria página.</p>
 </div></section>
</div></main>
{rodape(pre)}"""
    ld = seo.script({"@type": "WebPage", "@id": url, "url": url, "name": "Política editorial", "inLanguage": "pt-BR", "publisher": {"@id": seo.ORG_ID}},
                    seo.trilha(("Início", f"{SITE}/"), ("Política editorial", url)))
    out = ROOT / "politica-editorial" / "index.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(pagina("Política editorial | Elite Boardgamers", "Quem responde pela Elite Boardgamers e como notícias e resenhas são escolhidas, escritas, conferidas e corrigidas.",
                          url, capa_secao("noticias"), pre, corpo, jsonld=ld), encoding="utf-8")


def img_nota(n, pre):
    return f"{pre}noticias/{n['imagem']['arquivo']}" if n.get("imagem") else None


def build_home():
    ns = notas()
    home = json.loads((ROOT / "conteudo" / "home.json").read_text(encoding="utf-8"))
    pre = ""
    # manchete: a mais recente aprovada; a proposta da rotina diária espera "manchete_aprovada": true
    m = max((n for n in ns if n.get("manchete") and n.get("manchete_aprovada", True)), key=lambda n: n["data"])
    resto = [n for n in ns if n is not m]
    with Image.open(ROOT / "noticias" / m["imagem"]["arquivo"]) as im:
        lw, lh = im.size
    manchete = f"""<article class="bloco manchete"><a href="noticias/{m['slug']}/">
  <figure><img src="{img_nota(m, pre)}" srcset="{srcset(ROOT / "noticias" / m["imagem"]["arquivo"], pre)}" sizes="(min-width: 640px) 340px, 100vw" width="{lw}" height="{lh}" alt="{e(m['titulo'])}" fetchpriority="high"></figure>
  <div class="txt"><span class="kick">Manchete · {e(m['categoria'])}</span><h1>{e(m['titulo'])}</h1><p>{e(m['lide'])}</p>
  <p class="opina"><span class="selo {SELO_CLASSE[m['selo']]}">{e(m['selo'])}</span> {e(m['veredito'])}</p>
  <span class="meta">{data_longa(m['data'])} · {e(m['fontes'][0]['nome'])}</span><span class="credito">{e(m['imagem']['credito'])}</span></div>
 </a></article>"""
    def item(n, pre):
        return f"""<li><a href="noticias/{n['slug']}/"{'' if n.get("imagem") else ' class="sem-img"'}>{f'<img src="{miniatura(ROOT / "noticias" / n["imagem"]["arquivo"], pre)}" width="76" height="76" alt="" loading="lazy">' if n.get("imagem") else f'<span class="sem">{icone("dica")}</span>'}
   <div><span class="cat {CAT_CLASSE.get(n['categoria'], 'mercado')}">{e(n['categoria'])}</span> <span class="meta">{data_curta(n['data'])} · {e(n['fontes'][0]['nome'].split(':')[0])}</span>
   <h3>{e(n['titulo'])}</h3><p><span class="selo {SELO_CLASSE[n['selo']]}">{e(n['selo'])}</span> <span class="resumo">{e(n['por_que_importa'])}</span></p></div></a></li>"""
    ultimas = resto[:8]
    # trava: nenhuma nota fora da lista pode ser mais nova que uma que está nela
    if len(resto) > 8 and any(datetime.fromisoformat(f["publicado_em"]) > datetime.fromisoformat(u["publicado_em"])
                              for f in resto[8:] for u in ultimas if f["data"] >= u["data"]):
        sys.exit("Últimas notícias fora de ordem: há nota mais nova fora da lista")
    itens = "".join(item(n, pre) for n in ultimas)
    # arquivo de notícias: 30 por página; a 1ª é /noticias/, as outras /noticias/pagina/<n>/
    POR_PAGINA = 30
    paginas = [ns[i:i + POR_PAGINA] for i in range(0, len(ns), POR_PAGINA)] or [[]]
    for velha in (ROOT / "noticias" / "pagina").glob("*/index.html"):
        if not velha.parent.name.isdigit() or int(velha.parent.name) > len(paginas):
            velha.unlink()
            velha.parent.rmdir()
    for num, lote in enumerate(paginas, 1):
        p_pre = "../" if num == 1 else "../../../"
        url = f"{SITE}/noticias/" if num == 1 else f"{SITE}/noticias/pagina/{num}/"
        arquivo = "".join(item(n, p_pre).replace('href="noticias/', f'href="{p_pre}noticias/').replace("<h3>", "<h2>").replace("</h3>", "</h2>") for n in lote)
        ant = "" if num == 1 else f'<a href="{p_pre}noticias/{"" if num == 2 else f"pagina/{num - 1}/"}" rel="prev">← Mais recentes</a>'
        prox = f'<a href="{p_pre}noticias/pagina/{num + 1}/" rel="next">Mais antigas →</a>' if num < len(paginas) else ""
        nav = f'<nav class="paginas" aria-label="Páginas de notícias">{ant}<span>Página {num} de {len(paginas)}</span>{prox}</nav>' if len(paginas) > 1 else ""
        sufixo = "" if num == 1 else f" (página {num})"
        corpo_arq = f"""{cabecalho(p_pre, "Notícias", sub=num > 1)}
<main id="conteudo" class="in"><div class="nota"><a class="volta" href="{p_pre}">← Página inicial</a>
 <section class="bloco ultimas"><h1 class="h-sec">Notícias de jogos de tabuleiro{sufixo}</h1><ul class="lista-n">{arquivo}</ul>{nav}</section></div></main>
{rodape(p_pre)}"""
        trilha = [("Início", f"{SITE}/"), ("Notícias", f"{SITE}/noticias/")] + ([] if num == 1 else [(f"Página {num}", url)])
        destino = ROOT / "noticias" / ("index.html" if num == 1 else f"pagina/{num}/index.html")
        destino.parent.mkdir(parents=True, exist_ok=True)
        destino.write_text(pagina(f"Notícias{sufixo} | Elite Boardgamers", f"Notícias de jogos de tabuleiro da Elite Boardgamers, com fonte, data e opinião{sufixo}.", url,
                                  capa_secao("noticias"), p_pre, corpo_arq, jsonld=seo.script(seo.trilha(*trilha))), encoding="utf-8")
    # cada item do Em alta tem de levar a uma nota que trate do jogo já no título
    for j in home["em_alta"]:
        slug = j["link"].strip("/").split("/")[-1]
        alvo_n = next((n for n in ns if n["slug"] == slug), None)
        base = norm(re.split(r" [–-] |:", j["nome"])[0])
        if not alvo_n or base not in norm(alvo_n["titulo"]):
            sys.exit(f"Em alta: '{j['nome']}' leva a {slug}, que não trata do jogo no título")
    alta = "".join(
        f'<li><a href="{j["link"]}"><img src="{capa_jogo(pre, j["id_ludopedia"])}" width="44" height="44" alt="" loading="lazy"><div><b>{e(j["nome"])}</b><span>{e(j["motivo"])}</span></div></a></li>'
        for j in home["em_alta"]
    )
    def alvo(item):
        # notícia nossa quando existe; senão o link de fora (ou âncora) do próprio item
        return (f'noticias/{item["noticia"]}/', "") if item.get("noticia") else (item.get("link", ""), ' target="_blank" rel="noopener"' if item.get("link", "").startswith("http") else "")
    agenda = ""
    for a in home["agenda"]:
        href, ext = alvo(a)
        tit = f'<a href="{e(href)}"{ext}>{e(a["titulo"])}</a>' if href else e(a["titulo"])
        agenda += f'<li><span class="q">{e(a["quando"])}{"<small>previsto</small>" if a["previsto"] else ""}</span><span><b>{tit}</b><br><span class="d">{e(a["detalhe"])}</span></span></li>'
    por_jogo = {i: n["slug"] for n in ns for i in n.get("ids_ludopedia", [])}
    mes = mes_chegando()
    rotulo, jogos = lancamentos(mes)
    capas = "".join(
        f'<li><a href="lancamentos/#j{j["id_jogo"]}"><img src="{capa_jogo(pre, j["id_jogo"])}" width="132" height="140" alt="" loading="lazy">'
        f'<span class="st {j["status"]["slug"]}">{e(j["status"]["label"])}</span><b>{e(j["nome"].strip())}</b><span>{e((j.get("editora") or {}).get("nome", ""))}</span></a></li>'
        for j in jogos
    ) + f'<li class="todos"><a href="lancamentos/#{mes}"><span class="mais">Ver os {len(jogos)} de {e(rotulo.split(" de ")[0].lower())} e todo o calendário</span></a></li>'
    financ = "".join(
        f'<li><span class="onde">{e(f["onde"])}</span><a href="{e(alvo(f)[0])}"{alvo(f)[1]}>{e(f["nome"])}</a>'
        f'<span class="s">{e(f["editora"])} · {e(f["situacao"])}</span><span class="f">Fonte: {e(f["fonte"])}</span></li>'
        for f in home["financiamentos"]
    )
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    slugs = [p["url"].rstrip("/").split("/")[-1] for p in reversed(pauta["publicadas"])][:4]
    res = ""
    for s in slugs:
        c = json.loads((ROOT / "conteudo" / f"{s}.json").read_text(encoding="utf-8"))
        res += f'<li><a href="{s}/"><img src="{s}/capa.jpg{versao(ROOT / s / "capa.jpg")}" srcset="{srcset(ROOT / s / "capa.jpg", pre, (400,))}" sizes="(min-width: 640px) 160px, 45vw" width="800" height="800" alt="" loading="lazy"><b>{e(c["jogo"])}</b></a></li>'
    corpo = f"""{cabecalho(pre)}
<main id="conteudo" class="in">
 <p class="edicao">Edição de {data_longa(max(n["data"] for n in ns))}</p>
 <div class="grade">
  {manchete}
  <section class="bloco ultimas"><h2>Últimas notícias <a href="noticias/">Ver todas ({len(ns)})</a></h2><ul class="lista-n">{itens}</ul></section>
  <aside class="lado"><section class="bloco alta"><h2>Em alta</h2><ol class="hot">{alta}</ol></section>
  <section class="bloco agenda"><h2>Agenda</h2><ul>{agenda}</ul></section></aside>
  <section class="bloco brasil" id="chegando"><h2>Chegando ao Brasil · {e(rotulo.lower())} <a href="lancamentos/#{mes}">Calendário completo</a></h2><ul class="capas">{capas}</ul></section>
  <section class="bloco financ"><h2>Financiamentos</h2><ul>{financ}</ul></section>
  <section class="bloco resenhas"><h2>Últimas resenhas <a href="resenhas/">Ver todas</a></h2><ul class="res">{res}</ul></section>
  <section class="bloco comunidade"><p>Notícias de tabuleiro com fonte e data, todos os dias. Entre no grupo para receber as novidades e conversar sobre jogos.</p>
   <div class="acoes"><a class="btn zap" href="{WHATSAPP}" target="_blank" rel="noopener">{icone("zap")}Entrar no grupo do WhatsApp</a><a class="btn ig" href="{INSTAGRAM}" target="_blank" rel="noopener">{icone("insta")}@eliteboardgamers</a></div></section>
 </div>
</main>
{rodape(pre)}"""
    titulo = "Elite Boardgamers: notícias de jogos de tabuleiro"
    descr = f"{m['titulo']}. Notícias de jogos de tabuleiro com fonte e data, lançamentos no Brasil e resenhas de jogos premiados."
    # 404: servida pelo GitHub Pages em qualquer profundidade, por isso os caminhos são absolutos ("/")
    corpo_404 = f"""{cabecalho("/", "")}
<main id="conteudo" class="in"><div class="nota"><section class="bloco">
 <h1>Página não encontrada</h1>
 <p class="lide">O endereço pode ter mudado ou sido digitado errado. Veja o que há de novo:</p>
 <div class="jogos"><a href="/">Notícias de hoje</a><a href="/resenhas/">Resenhas de jogos premiados</a><a href="/consulta/">Consulta Golden Geek</a></div>
</section></div></main>
{rodape("/")}"""
    (ROOT / "404.html").write_text(pagina("Página não encontrada | Elite Boardgamers", "Página não encontrada.", "", capa_secao("noticias"), "/", corpo_404), encoding="utf-8")
    build_politica()
    (ROOT / "index.html").write_text(pagina(titulo, descr, f"{SITE}/", f"{SITE}/{img_nota(m, '')}", pre, corpo, jsonld=seo.script(seo.site())), encoding="utf-8")
    return ns


def relacionadas(n, limite=3):
    """Notas para o "Leia também": primeiro as que citam o mesmo jogo, depois as da mesma categoria; mais recentes antes."""
    jogos = {j.get("resenha") or j["nome"] for j in n.get("jogos", [])}
    cands = []
    for p in (ROOT / "conteudo" / "noticias").glob("*.json"):
        o = json.loads(p.read_text(encoding="utf-8"))
        if o["slug"] == n["slug"]:
            continue
        comum = len(jogos & {j.get("resenha") or j["nome"] for j in o.get("jogos", [])})
        if comum or o["categoria"] == n["categoria"]:
            cands.append((comum, o["data"], o.get("publicado_em", ""), o))
    cands.sort(key=lambda x: x[:3], reverse=True)
    return [o for *_, o in cands[:limite]]


def build_nota(n):
    pre = "../../"
    fig = (f'<figure><img src="{pre}noticias/{n["imagem"]["arquivo"]}" srcset="{srcset(ROOT / "noticias" / n["imagem"]["arquivo"], pre)}" sizes="(min-width: 760px) 720px, 100vw" alt="{e(n["titulo"])}"><figcaption class="credito">{e(n["imagem"]["credito"])}</figcaption></figure>'
           if n.get("imagem") else "")
    jogos = "".join(f'<a href="{pre}{j["resenha"]}/">Resenha: {e(j["nome"])}</a>' for j in n.get("jogos", []))
    fontes = "".join(f'<li><a href="{e(f["url"])}" target="_blank" rel="noopener">{e(f["nome"])}</a> <span>consulta em {e(f["data"])}</span></li>' for f in n["fontes"])
    numeros = "".join(f'<li><b>{e(v)}</b><span>{e(r)}</span><small>{e(f)}</small></li>' for v, r, f in n["numeros"])
    critica = "".join(
        (f'<li class="cit"><q>{e(c["texto"])}</q><cite>{e(c["fonte"])} (tradução livre)</cite></li>' if c.get("citacao")
         else f'<li><p>{e(c["texto"])}</p></li>') for c in n["critica"])
    sim = "".join(f"<li>{e(x)}</li>" for x in n["para_quem"])
    nao = "".join(f"<li>{e(x)}</li>" for x in n.get("nao_e_para", []))
    sc = SELO_CLASSE[n["selo"]]
    leia = "".join(f'<li><a href="{pre}noticias/{o["slug"]}/">{e(o["titulo"])}</a></li>' for o in relacionadas(n))
    corpo = f"""{cabecalho(pre, "Notícias", sub=True)}
<main id="conteudo" class="in"><div class="nota">
 {trilha(("Início", pre), ("Notícias", f"{pre}noticias/"), (e(n["titulo"]), ""))}
 <article class="bloco">
  <span class="cat {CAT_CLASSE.get(n['categoria'], 'mercado')}">{e(n['categoria'])}</span> <span class="selo {sc}">{e(n['selo'])}</span>
  <h1>{e(n['titulo'])}</h1>
  <p class="meta"><time datetime="{n['publicado_em']}">{data_longa(n['data'])}</time> · Redação Elite Boardgamers</p>
 </article>
 <div class="bloco abre">{fig}<p class="lide">{e(n['lide'])}</p></div>
 <section class="bloco importa"><h2>Por que importa</h2><p>{e(n['por_que_importa'])}</p><p class="assina">Análise Elite Boardgamers</p></section>
 <section class="bloco"><h2>Em números</h2><ul class="nums">{numeros}</ul></section>
 <section class="bloco"><h2>Contexto</h2><div class="corpo">{"".join(f"<p>{e(p)}</p>" for p in n['corpo'])}</div></section>
 <section class="bloco brasil-n"><h2>No Brasil</h2><p>{e(n['no_brasil'])}</p></section>
 <section class="bloco"><h2>O que diz a crítica</h2>{f'<ul class="crit">{critica}</ul>' if critica else '<p class="corpo">Ainda não encontramos resenha publicada por veículo especializado.</p>'}</section>
 <section class="bloco quem"><div><h2>Interessa a você se…</h2><ul class="ok">{sim}</ul></div>{f'<div><h2>Pense duas vezes se…</h2><ul class="no">{nao}</ul></div>' if nao else ""}</section>
 <section class="bloco veredito {sc}"><h2>Nossa opinião</h2><span class="selo {sc}">{e(n['selo'])}</span><p>{e(n['veredito'])}</p></section>
 {f'<section class="bloco"><h2>Jogos citados</h2><div class="jogos">{jogos}</div></section>' if jogos else ""}
 {f'<section class="bloco leia"><h2>Leia também</h2><ul>{leia}</ul></section>' if leia else ""}
 <section class="bloco fontes"><h2>Fontes</h2><ul>{fontes}</ul></section>
 <section class="bloco crivo"><h2>Por que esta notícia entrou</h2><p><b>{n['crivo']['pontos']} pontos no crivo editorial</b> (mínimo 5): {e("; ".join(n['crivo']['criterios']))}.</p></section>
</div></main>
{rodape(pre)}"""
    out = ROOT / "noticias" / n["slug"] / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    img = f"{SITE}/noticias/{n['imagem']['arquivo']}" if n.get("imagem") else capa_secao("noticias")
    url = f"{SITE}/noticias/{n['slug']}/"
    modificado = lastmod_registrado(url, {k: v for k, v in n.items() if k != "publicado_em"})
    ld = seo.script(seo.artigo("NewsArticle", url, n["titulo"], n["lide"], img, n["publicado_em"], modificado),
                    seo.trilha(("Início", f"{SITE}/"), ("Notícias", f"{SITE}/noticias/"), (n["titulo"], url)))
    # título da busca: titulo_seo (opcional, aprovado pela edição) ou o título; o sufixo da marca só cabe em título curto
    t_busca = n.get("titulo_seo") or n["titulo"]
    t_busca = t_busca if len(t_busca) > 42 else f"{t_busca} | Elite Boardgamers"
    out.write_text(pagina(t_busca, n["lide"], url, img, pre, corpo, "article",
                          f'\n<meta property="article:published_time" content="{n["publicado_em"]}">', ld), encoding="utf-8")


if __name__ == "__main__":
    for n in build_home():
        build_nota(n)
    print("ok index.html e", len(notas()), "notícias")
    # resenhas mostram "Notícias sobre este jogo": regera as publicadas para incluir notas novas
    import build_review
    for pub in json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))["publicadas"]:
        slug = pub["url"].rstrip("/").split("/")[-1]
        (ROOT / slug / "index.html").write_text(build_review.build(json.loads((ROOT / "conteudo" / f"{slug}.json").read_text(encoding="utf-8"))), encoding="utf-8")
    import build_lista
    (ROOT / "resenhas" / "index.html").write_text(build_lista.build(), encoding="utf-8")
    print("ok resenhas/index.html")
    import build_consulta
    print("ok consulta/index.html:", build_consulta.build())
    import build_calendario
    print("ok lancamentos/index.html: %d lançamentos, %d sem capa" % build_calendario.build())
    import build_sitemap
    print("ok sitemap.xml (%d URLs), sitemap-noticias.xml (%d), robots.txt" % build_sitemap.atualizar()[:2])
