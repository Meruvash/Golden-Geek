"""Gera /black/index.html (Black de Verdade) a partir do que tools/black/radar.py calculou.

Chamado pelo próprio radar.py; não rode sozinho. As capas vêm da ficha do produto no Compara Jogos, baixadas uma
vez e guardadas em img/black/<slug>.webp (240 px), com crédito na página.
"""
import datetime as dt
import html
import re
import io
import sys
from pathlib import Path
from urllib.parse import urlparse
import json
from zoneinfo import ZoneInfo

import requests
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
import seo  # noqa: E402
from build_guias import CSS_GUIA  # noqa: E402
from build_home import pagina  # noqa: E402
from layout import SITE, cabecalho, rodape, trilha  # noqa: E402
import radar  # noqa: E402

e = html.escape
BR = ZoneInfo("America/Sao_Paulo")
IMG = ROOT / "img" / "black"
TESTAVEIS = set()  # domínios com teste no carrinho ligado (tools/black/cupons.py TESTE_APROVADAS)

CSS = """<style>
.bk .lide{max-width:70ch}
.bk .aviso{background:#fff8e1;border:1px solid #e9d58a;border-radius:10px;padding:12px 14px;font-size:.92rem;color:var(--paper-ink)}
.bk .aviso p+p{margin-top:6px}
.bk .tab{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--paper-line);border-radius:12px;background:#fff}
.bk table{border-collapse:collapse;width:100%;min-width:1200px;font-size:.86rem}
.bk th,.bk td{padding:9px 10px;border-bottom:1px solid var(--paper-line);text-align:left;vertical-align:middle}
.bk th{background:#f0f2f5;font-weight:700;white-space:nowrap;position:sticky;top:0}
.bk td.n{white-space:nowrap;font-variant-numeric:tabular-nums}
.bk td.j{min-width:220px}.bk td.j div{display:flex;gap:10px;align-items:center}
.bk td.j img{width:48px;height:48px;object-fit:contain;flex:none;background:#fff;border-radius:6px}
.bk .desc{font-weight:800;color:#0b7a3b}
.bk .tag{display:inline-block;font-size:.72rem;font-weight:700;padding:2px 7px;border-radius:999px;background:#eef1f5;color:var(--paper-muted);margin-top:3px}
.bk .tag.rec{background:#e3f6ea;color:#0b7a3b}
.bk a.ir{font-weight:700;color:var(--link);white-space:nowrap}
.bk .top5{display:grid;gap:12px;counter-reset:t}
.bk .top5 li{display:grid;grid-template-columns:72px 1fr;gap:12px;align-items:center;padding:12px;border:1px solid var(--paper-line);border-radius:12px;background:#fff}
.bk .top5 img{width:72px;height:72px;object-fit:contain}
.bk .top5 b{display:block}.bk .top5 p{font-size:.9rem;color:var(--paper-muted);margin-top:3px}
.bk .lista li{padding:8px 0;border-top:1px solid var(--paper-line)}.bk .lista li:first-child{border-top:0}
.bk .credito{font-size:.8rem;color:var(--paper-muted);margin-top:8px}
.bk table.cupons-t{min-width:900px}.bk table.cupons-t td:nth-child(3){min-width:320px;font-size:.82rem;color:var(--paper-muted)}
.bk h3{margin:18px 0 8px;font-size:1.05rem}
</style>"""


def nome(x):
    """Nome do jogo sem travessão (regra do usuário: nada de travessão no texto)."""
    return re.sub(r"\s*[–—]\s*", ": ", x["nome"] or "")


def brl(v):
    return "R$ " + f"{v:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def pct(v):
    return f"{v * 100:.0f}%"


def quando(iso):
    try:
        t = dt.datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(BR)
        return t.strftime("%d/%m/%Y %Hh%M")
    except Exception:
        return "não informado"


def capa(item, pre):
    """Caminho da capa local; baixa da ficha do Compara Jogos na primeira vez."""
    arq = IMG / f"{item['slug']}.webp"
    if not arq.exists() and item.get("imagem"):
        try:
            r = requests.get(item["imagem"], headers=radar.HEADERS, timeout=30)
            if r.status_code == 200:
                im = Image.open(io.BytesIO(r.content))
                if im.mode in ("RGBA", "LA", "P"):
                    im = im.convert("RGBA")
                    fundo = Image.new("RGB", im.size, "white")
                    fundo.paste(im, mask=im.split()[3])
                    im = fundo
                im = im.convert("RGB")
                im.thumbnail((240, 240))
                IMG.mkdir(parents=True, exist_ok=True)
                im.save(arq, "WEBP", quality=82)
        except Exception:
            pass
    return f"{pre}img/black/{arq.name}" if arq.exists() else ""


def base_txt(x):
    return "Compara Jogos" + (f" · BASE CURTA ({x['dias']} dias)" if x["dias"] < radar.JANELA else "")


def cupons():
    arq = ROOT / "conteudo" / "black" / "cupons.json"
    return json.loads(arq.read_text(encoding="utf-8")) if arq.exists() else {}


def limpa(s):
    return re.sub(r"\s*[–—]\s*", ", ", s or "")


def cupom_da_loja(url, cps):
    reg = cps.get(urlparse(url or "").netloc.lower())
    if not reg or not reg["cupons"]:
        return "nenhum anunciado"
    partes = []
    for c in reg["cupons"].values():
        t = c.get("teste")
        sit = (f"testado {quando(t['hora'])}: {'aplicou' if t['ok'] else 'recusado'}" if t else f"anunciado, visto {quando(c['visto'])}")
        partes.append(f"<b>{e(c['codigo'])}</b> ({e(sit)})")
    return "<br>".join(partes)


def tabela(itens, pre, cps=None):
    cps = cps or {}
    if not itens:
        return '<p class="criterio">Nenhum item passou no corte de hoje.</p>'
    linhas = ""
    for x in itens:
        img = capa(x, pre)
        tags = '<span class="tag rec">menor preço do período</span>' if x["recorde"] else ""
        linhas += (f'<tr><td class="j"><div>{f"<img src=\"{img}\" alt=\"\" loading=\"lazy\" width=\"48\" height=\"48\">" if img else ""}'
                   f'<span><b>{e(nome(x))}</b><br>{tags}</span></div></td>'
                   f'<td>{e(x["editora"] or "não informada")}</td><td>{e(x["loja"])}</td>'
                   f'<td class="n"><b>{brl(x["por"])}</b></td><td class="n">{brl(x["ref"])}</td>'
                   f'<td class="n desc">{pct(x["desc"])}</td><td class="n">{brl(x["menor"])}</td>'
                   f'<td class="n">{f"{x["bgg"]:.1f}".replace(".", ",") if x["bgg"] else "sem nota"} BGG</td>'
                   f'<td>{cupom_da_loja(x["url"], cps)}</td>'
                   f'<td><a class="ir" href="{e(x["url"])}" target="_blank" rel="noopener nofollow sponsored">Ver oferta</a></td>'
                   f'<td>{e(x.get("fonte_preco", "Compara Jogos"))}</td><td>{e(base_txt(x))}</td><td class="n">{quando(x["verificado"])}</td></tr>')
    return (f'<div class="tab"><table><thead><tr><th>Jogo</th><th>Editora</th><th>Loja</th><th>Preço hoje</th>'
            f'<th>Média do período (referência)</th><th>Desconto real</th><th>Menor preço no período</th><th>Nota BGG</th>'
            f'<th>Cupom</th><th>Link</th><th>Fonte do preço</th><th>Fonte do histórico</th><th>Verificado em</th></tr></thead><tbody>{linhas}</tbody></table></div>')


def build(radar_itens, armadilhas):
    pre = "../"
    url = f"{SITE}/black/"
    agora = radar.agora()
    cps = cupons()
    linhas_cp = ""
    for dom, reg in sorted(cps.items(), key=lambda kv: kv[1]["loja"].lower()):
        for c in reg["cupons"].values():
            t = c.get("teste")
            teste = (f"{quando(t['hora'])}: {'aplicou' if t['ok'] else 'recusado'}{', ' + e(t['detalhe']) if t.get('detalhe') else ''}" if t
                     else "não testado (o robots.txt da loja proíbe robôs no carrinho)" if dom not in TESTAVEIS else "aguardando teste")
            linhas_cp += (f'<tr><td>{e(reg["loja"])}</td><td><b>{e(c["codigo"])}</b></td><td>{e(limpa(c["texto"]))}</td>'
                          f'<td class="n">{quando(c["visto"])}</td><td>{teste}</td>'
                          f'<td><a class="ir" href="{e(c["pagina"])}" target="_blank" rel="noopener nofollow">Ver na loja</a></td></tr>')
    cupons_html = (f'<div class="tab"><table class="cupons-t"><thead><tr><th>Loja</th><th>Cupom</th><th>O que a página da loja diz</th>'
                   f'<th>Visto na loja em</th><th>Testado no carrinho</th><th>Link</th></tr></thead><tbody>{linhas_cp}</tbody></table></div>'
                   if linhas_cp else '<p class="criterio">Nenhum cupom anunciado nas lojas do radar nesta leitura.</p>')
    titulo = "Black de Verdade: ofertas de jogos de tabuleiro com desconto real"
    melhor = {}
    for x in radar_itens:  # a melhor oferta de cada jogo
        melhor.setdefault(x["slug"], x)
    jogos = [x for x in radar_itens if x["tipo"] != "expansion"]
    exps = [x for x in radar_itens if x["tipo"] == "expansion"]
    top = sorted(melhor.values(), key=lambda x: -((x["bgg"] or 7.0) * x["desc"]))[:5]
    top_html = "".join(
        f'<li>{f"<img src=\"{capa(x, pre)}\" alt=\"\" loading=\"lazy\" width=\"72\" height=\"72\">" if capa(x, pre) else "<span></span>"}'
        f'<div><b><a href="{e(x["url"])}" target="_blank" rel="noopener nofollow sponsored">{e(nome(x))}</a>: {brl(x["por"])} em {e(x["loja"])}</b>'
        f'<p>{pct(x["desc"])} abaixo da média de {brl(x["ref"])}'
        f'{f", nota {x["bgg"]:.1f} no BGG".replace(".", ",", 1) if x["bgg"] else ""}'
        f'{", e no menor preço do período" if x["recorde"] else ""}.</p></div></li>' for x in top)
    recordes = [x for x in melhor.values() if x["recorde"]]
    rec_html = "".join(f'<li><b>{e(nome(x))}</b>: {brl(x["por"])} em {e(x["loja"])} (menor do período até ontem: {brl(x["menor"])})</li>' for x in recordes)
    arm_html = "".join(f'<li><b>{e(nome(x))}</b> em {e(x["loja"])}: anunciado de {brl(x["de"])} por {brl(x["por"])} '
                       f'({pct((x["de"] - x["por"]) / x["de"])} de "desconto"), mas a média real do período é {brl(x["ref"])}: '
                       f'desconto real de {pct(max(x["desc"], 0))}.</li>' for x in armadilhas)
    curta = min((x["dias"] for x in radar_itens), default=None)
    corpo = f"""{cabecalho(pre, "Black de Verdade")}
<main id="conteudo" class="in"><div class="nota guia bk">
 {trilha(("Início", pre), ("Black de Verdade", ""))}
 <article class="bloco">
  <h1>Black de Verdade</h1>
  <p class="lide">Só entra aqui jogo de tabuleiro cujo preço de hoje está pelo menos 20% abaixo da média real do
  período, e não abaixo de um preço "de" inventado na véspera. A média é aparada: tiramos os 10% de preços mais altos e os
  10% mais baixos do histórico e fazemos a conta com o resto.</p>
  <p class="criterio">Atualizado em {agora.strftime("%d/%m/%Y às %Hh%M")} (horário de Brasília). {len(melhor)} jogo{"s" if len(melhor) != 1 else ""} no radar.</p>
  <div class="aviso">
   <p><b>Base curta.</b> O histórico vem das páginas públicas do Compara Jogos, que mostram 30 dias. Gravamos um ponto por
   dia desde 03/11/2026 até completar 180 dias; até lá, cada linha mostra quantos dias de base a conta usou{f" (hoje, a partir de {curta} dias)" if curta else ""}.</p>
   <p><b>Fora do radar.</b> Amazon, Mercado Livre, Magalu e Casas Bahia proíbem ou bloqueiam robôs, e na Americanas o robô não
   consegue conferir quem é o vendedor; por isso as ofertas deles não entram. Shopee e vendedores avulsos também ficam de fora.</p>
   <p><b>Preço conferido na loja.</b> Antes de publicar, o robô abre a página do produto na própria loja e lê o preço e o
   estoque (coluna "Fonte do preço"). Esse é o preço de tabela da página: no Pix costuma sair um pouco mais barato. Lojas que
   bloqueiam robôs ficam com o preço informado ao Compara Jogos.</p>
   <p><b>Confira antes de pagar.</b> Frete não é verificado pelo robô, e cupom só é testado onde a loja permite (veja a seção de cupons). Preço muda rápido: cada linha mostra a hora
   em que a loja informou o valor ao Compara Jogos.</p>
  </div>
 </article>
 <section class="bloco"><h2>Top 5: compra sem pensar</h2><p class="criterio">A melhor combinação de nota no BGG e desconto real.</p>
  {f'<ol class="top5">{top_html}</ol>' if top_html else '<p class="criterio">Nenhum item passou no corte de hoje.</p>'}</section>
 <section class="bloco"><h2>Todas as ofertas do radar</h2><p class="criterio">Ordenadas pelo desconto real. Role a tabela para o lado no celular.</p>
  <h3>Jogos base ({len({x["slug"] for x in jogos})})</h3>{tabela(jogos, pre, cps)}
  <h3>Expansões ({len({x["slug"] for x in exps})})</h3>{tabela(exps, pre, cps)}
  <p class="credito">Preços, histórico, nota BGG e imagens das caixas: Compara Jogos (comparajogos.com.br). Links levam à loja; não ganhamos comissão.</p>
 </section>
 <section class="bloco"><h2>Cupons anunciados pelas lojas</h2><p class="criterio">Códigos que as lojas do radar publicam na
  própria página, com a hora em que o robô viu cada um. Só entra código escrito pela loja; cupom que some da página sai daqui em até 36 horas.
  O teste no carrinho só roda nas lojas cujo robots.txt permite robôs no carrinho e no checkout.</p>
  {cupons_html}</section>
 <section class="bloco"><h2>Menor preço do período</h2><p class="criterio">Itens do radar que hoje igualaram ou bateram o menor preço registrado na base.</p>
  {f'<ul class="lista">{rec_html}</ul>' if rec_html else '<p class="criterio">Nenhum hoje.</p>'}</section>
 <section class="bloco"><h2>Armadilhas detectadas</h2><p class="criterio">Ofertas com 20% ou mais de diferença entre o preço "de" e o "por" informados pela loja, mas com desconto real abaixo de 20% sobre a média do período.</p>
  {f'<ul class="lista">{arm_html}</ul>' if arm_html else '<p class="criterio">Nenhuma hoje.</p>'}</section>
 <section class="bloco"><h2>Como calculamos</h2>
  <ul class="lista">
   <li><b>Referência:</b> média aparada dos pontos diários de menor preço de jogo novo dos últimos 180 dias (ou do período disponível, marcado como base curta).</li>
   <li><b>Desconto real:</b> (referência menos preço de hoje) dividido pela referência. Entra com 20% ou mais.</li>
   <li><b>Qualidade:</b> nota 7,0 ou mais no BGG, ou jogo premiado no Golden Geek, Spiel des Jahres ou Kennerspiel.</li>
   <li><b>Lojas:</b> só jogo novo de loja que anuncia no Compara Jogos. Oferta abaixo de 45% da referência é descartada como provável anúncio de outro produto.</li>
   <li><b>Jogo base e expansão</b> aparecem separados.</li>
  </ul></section>
</div></main>
{rodape(pre)}"""
    ld = seo.script({"@type": "CollectionPage", "@id": url, "url": url, "name": titulo, "inLanguage": "pt-BR",
                     "dateModified": agora.isoformat(timespec="minutes")},
                    seo.trilha(("Início", f"{SITE}/"), ("Black de Verdade", url)))
    descr = ("Radar de ofertas de jogos de tabuleiro com desconto real de 20% ou mais sobre a média aparada do histórico "
             "de preços, com nota BGG, loja, link e horário da verificação.")
    (ROOT / "black").mkdir(exist_ok=True)
    (ROOT / "black" / "index.html").write_text(pagina(titulo, descr, url, f"{SITE}/consulta/capa.jpg", pre, corpo,
                                                      head_extra="\n" + CSS_GUIA + CSS, jsonld=ld), encoding="utf-8")
    print(f"ok black/index.html: {len(melhor)} jogos no radar, {len(armadilhas)} armadilhas")
