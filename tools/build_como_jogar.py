"""Moldura comum do site nas páginas Como Jogar (como-jogar/<slug>/index.html) e ajustes de leitura.

As páginas Como Jogar são escritas à parte (docs/como-jogar/) e publicadas como HTML pronto. Este script:
- troca o cabeçalho e o rodapé próprios pelos do site (logo, menu, busca, rodapé e barra de compartilhar/grupo);
- põe uma faixa presa abaixo do menu com a etapa em que o leitor está e uma barra de progresso;
- transforma as tabelas em fichas no celular (cada linha vira um cartão com o nome da coluna);
- recolhe a nota sobre o método (4C/ID) num "Sobre o método", fechado por padrão.
Vale também para o índice /como-jogar/ (sem a faixa de progresso). O texto das páginas não muda. Pode rodar quantas vezes quiser: cada troca fica entre marcadores.

Uso: python3 tools/build_como_jogar.py   (também roda dentro de build_home.py)
"""
import re
from pathlib import Path

import html as _html

import seo
from layout import CSS_BUSCA, cabecalho, rodape

ROOT = Path(__file__).resolve().parent.parent
PRE = "../../"

# cabeçalho do site, igual ao das outras páginas (build_home.CSS)
CSS_MOLDURA = (".in{max-width:1180px;margin:0 auto;padding-left:16px;padding-right:16px}"
               ".ic{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round;flex:none}"
               ".bar{border-bottom:1px solid var(--line);background:#000;color:var(--ink)}"
               ".bar .in{display:flex;align-items:center;gap:12px;padding-top:8px;padding-bottom:8px}"
               ".bar a{color:inherit;text-decoration:none;font-weight:600;font-size:.95rem}.marca img{display:block;width:84px;border-radius:6px}"
               ".bar .ig{margin-left:auto;display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px}.bar .ig:hover{color:var(--gold)}"
               ".bar .zap-mini{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:6px;background:#157a43;color:#fff}"
               ".nav ul{padding-left:16px;padding-right:16px}.nav ul li{list-style:none}"
               "@media (max-width:700px){.bar .ig span,.bar .zap-mini span{display:none}}"
               "footer{font-size:.9rem}footer .in{max-width:1180px;display:flex;flex-wrap:wrap;gap:6px 16px;padding-top:20px;padding-bottom:28px}"
               "footer a{color:var(--muted);text-decoration:none}footer a:hover{color:var(--gold)}")

CSS_GUIA = """
/* faixa de progresso, presa logo abaixo do menu */
.guia-prog{position:sticky;top:var(--nav-h,45px);z-index:15;background:var(--panel);border-bottom:1px solid var(--line)}
.guia-prog a{display:flex;align-items:center;gap:10px;max-width:760px;margin:0 auto;padding:9px 16px;color:var(--ink);text-decoration:none;font-size:.86rem;font-weight:700;min-height:40px}
.guia-prog .gp-r{flex:none;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;color:var(--gold)}
.guia-prog .gp-t{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.guia-prog .gp-i{margin-left:auto;flex:none;font-size:.78rem;color:var(--muted);font-weight:600}
.guia-prog .gp-b{position:absolute;left:0;right:0;bottom:-1px;height:3px;background:var(--gold);transform-origin:0 50%;transform:scaleX(0)}
html{scroll-padding-top:calc(var(--nav-h,45px) + 56px)}
/* legenda dos blocos: pontos de cor em vez de pílulas */
.legenda{gap:6px 16px}
.legenda span{position:relative;background:none;color:var(--muted);box-shadow:none!important;padding:0 0 0 16px;font-size:.8rem;letter-spacing:0}
.legenda span::before{content:"";position:absolute;left:0;top:.32em;width:10px;height:10px;border-radius:3px;background:var(--paper)}
.legenda .l2::before{background:var(--ok)}.legenda .l3::before{background:var(--gold)}.legenda .l4::before{background:var(--ouro-ink)}
/* índice numerado */
.indice ol{counter-reset:it}.indice li{counter-increment:it}
.indice a{display:flex;gap:10px;align-items:baseline;min-height:40px;padding:9px 0}
.indice a::before{content:counter(it);flex:none;width:1.6em;font-size:.8rem;font-weight:800;color:var(--ouro-ink);font-variant-numeric:tabular-nums}
/* sobre o método, recolhido */
.metodo{border:1px solid var(--paper-line);border-radius:8px;background:#fff}
.metodo summary{cursor:pointer;list-style:none;padding:12px 16px;min-height:44px;display:flex;align-items:center;gap:8px;font-weight:700;color:var(--paper-muted);font-size:.92rem}
.metodo summary::-webkit-details-marker{display:none}
.metodo summary::after{content:"+";margin-left:auto;font-weight:800}.metodo[open] summary::after{content:"−"}
.metodo>.call{border:0;border-top:1px solid var(--paper-line);border-radius:0 0 8px 8px}
.nota-pe{color:var(--muted);font-size:.85rem;padding:4px 2px 0}
/* títulos das etapas com mais respiro */
.sec{scroll-margin-top:calc(var(--nav-h,45px) + 56px)}
@media (min-width:601px){.sec{padding:24px 28px}}
/* tabelas: fichas no celular */
@media (max-width:600px){
 .tab{border:0;background:none;overflow:visible;border-radius:0}
 .tab table,.tab tbody,.tab tr,.tab td{display:block}
 .tab thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
 .tab tr{background:#fff;border:1px solid var(--paper-line);border-radius:8px;padding:10px 12px;margin-bottom:8px}
 .tab td{border:0;padding:3px 0;display:grid;grid-template-columns:6.5em minmax(0,1fr);gap:8px}
 .tab td::before{content:attr(data-label);font-size:.7rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--paper-muted);padding-top:3px}
 .tab td:empty{display:none}
 .tab td:first-child{display:block;font-weight:800;color:var(--paper-ink);padding-bottom:4px}
 .tab td:first-child::before{display:none}
}
"""

JS_GUIA = """(()=>{const g=document.querySelector('.guia-prog');if(!g)return;const t=g.querySelector('.gp-t'),b=g.querySelector('.gp-b');
const secs=[...document.querySelectorAll('.sec[id]')],idx=document.querySelector('.indice');
const poe=()=>{const y=scrollY+innerHeight*.3;let at=null;for(const s of secs){if(s.offsetTop<=y)at=s}
 t.textContent=at&&scrollY>idx.offsetTop?at.querySelector('h2').textContent.replace(/^\\d+/,'').trim():'Neste guia';
 const h=document.documentElement.scrollHeight-innerHeight;b.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'};
addEventListener('scroll',poe,{passive:true});addEventListener('resize',poe);poe()})()"""


def rotular_tabelas(html):
    """Põe em cada célula o nome da coluna (data-label), para a ficha do celular."""
    def tabela(m):
        t = m.group(0)
        if "data-label" in t:
            return t
        cab = [re.sub(r"<[^>]+>", "", h).replace('"', "") for h in re.findall(r"<th[^>]*>(.*?)</th>", t, re.S)]
        def linha(r):
            n = iter(range(10 ** 6))
            return re.sub(r"<td(?=[ >])", lambda _: f'<td data-label="{cab[min(next(n), len(cab) - 1)]}"', r.group(0))
        return re.sub(r"<tr>.*?</tr>", linha, t, flags=re.S)
    return re.sub(r"<table>.*?</table>", tabela, html, flags=re.S)


def montar(arq):
    """Uma página: o índice /como-jogar/ (indice=True, sem faixa de progresso) ou um tutorial /como-jogar/<slug>/."""
    indice = arq.parent.name == "como-jogar"
    pre = "../" if indice else PRE
    s = arq.read_text(encoding="utf-8")
    novo = s
    # estilos: moldura do site + ajustes do guia, depois do estilo próprio da página
    estilos = f'<style id="moldura">{CSS_BUSCA}{CSS_MOLDURA}</style>\n<style id="guia-extra">{CSS_GUIA}</style>\n'
    novo = re.sub(r'(?:<style id="moldura">.*?</style>\n<style id="guia-extra">.*?</style>\n)?</head>', lambda _: estilos + "</head>", novo, count=1, flags=re.S)
    # cabeçalho: na primeira vez, o próprio (banner + menu); depois, o que está entre marcadores
    topo = (f'<!--moldura--><a class="skip" href="#conteudo">Pular para o conteúdo</a>\n{cabecalho(pre, "Como jogar", sub=not indice)}'
            + ("" if indice else '\n<div class="guia-prog"><a href="#neste-guia"><span class="gp-r">Guia</span><span class="gp-t">Neste guia</span><span class="gp-i">Índice</span></a><span class="gp-b" aria-hidden="true"></span></div>')
            + '<!--/moldura-->\n')
    novo = re.sub(r'<!--moldura-->.*?<!--/moldura-->\n|<a class="skip".*?</nav>\n(?=\s*<main)', lambda _: topo, novo, count=1, flags=re.S)
    # rodapé: a nota da página vira um parágrafo no fim do conteúdo, e entra o rodapé comum (com a barra do pé da tela)
    m = re.search(r'<footer><div class="in gut">(.*?)</div></footer>', novo, re.S)
    if m and 'class="nota-pe"' not in novo:
        nota = re.sub(r'<a [^>]*>Elite Boardgamers</a> · ', "", m.group(1))
        novo = re.sub(r"</div>\s*</main>", lambda _: f'<p class="nota-pe">{nota}</p>\n</div></main>', novo, count=1)
    fim = f"<!--rodape-->{rodape(pre)}\n<script>{JS_GUIA}</script><!--/rodape-->"
    novo = re.sub(r'<!--rodape-->.*?<!--/rodape-->|<footer><div class="in gut">.*?</div></footer>', lambda _: fim, novo, count=1, flags=re.S)
    # índice com âncora, para a faixa de progresso levar até ele
    novo = novo.replace('<nav class="bloco indice" aria-label="Neste guia">', '<nav class="bloco indice" id="neste-guia" aria-label="Neste guia">')
    # nota sobre o método, recolhida
    novo = re.sub(r'(<section class="bloco sec" id="como-este-guia-ensina">.*?)(<aside class="call entender">.*?</aside>)',
                  lambda x: x.group(1) + f'<details class="metodo"><summary>Sobre o método deste guia</summary>{x.group(2)}</details>'
                  if "metodo" not in x.group(0) else x.group(0), novo, count=1, flags=re.S)
    # o mesmo contador de visitas sem cookies das outras páginas (sem ele, o Como Jogar não aparece no resumo de visitas)
    if "cloudflareinsights" not in novo:
        novo = novo.replace("</body>", seo.ANALYTICS + "\n</body>", 1)
    novo = rotular_tabelas(novo)
    # SEO no padrão das outras páginas: imagem grande no Google e dados estruturados (artigo + trilha)
    if 'name="robots"' not in novo:
        novo = re.sub(r'(<link rel="canonical"[^>]*>)', r'\1\n<meta name="robots" content="max-image-preview:large">', novo, count=1)
    url = re.search(r'<link rel="canonical" href="([^"]+)"', novo).group(1)
    titulo = _html.unescape(re.sub(r"<[^>]+>", "", re.search(r"<h1[^>]*>(.*?)</h1>", novo, re.S).group(1))).strip()
    descr = _html.unescape(re.search(r'<meta name="description" content="([^"]*)"', novo).group(1))
    img = re.search(r'<meta property="og:image" content="([^"]+)"', novo).group(1)
    if indice:
        ld = seo.script(seo.trilha(("Início", f"{seo.SITE}/"), ("Como jogar", url)))
    else:
        data = re.search(r'<time datetime="([^"]+)">', novo).group(1)
        ld = seo.script(seo.artigo("Article", url, titulo, descr, img, data),
                        seo.trilha(("Início", f"{seo.SITE}/"), ("Como jogar", f"{seo.SITE}/como-jogar/"), (titulo, url)))
    novo = re.sub(r'(?:<script type="application/ld\+json">.*?</script>\n)?(?=<style id="moldura">)', lambda _: ld + "\n", novo, count=1, flags=re.S)
    if novo != s:
        arq.write_text(novo, encoding="utf-8")
    return arq


def build():
    return [montar(a) for a in [ROOT / "como-jogar" / "index.html", *sorted((ROOT / "como-jogar").glob("*/index.html"))] if a.exists()]


if __name__ == "__main__":
    for a in build():
        print("ok", a.relative_to(ROOT))
