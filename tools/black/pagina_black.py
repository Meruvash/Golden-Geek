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
from build_home import pagina  # noqa: E402
from layout import SITE, cabecalho, rodape, trilha  # noqa: E402
import radar  # noqa: E402

e = html.escape
BR = ZoneInfo("America/Sao_Paulo")
IMG = ROOT / "img" / "black"
TESTAVEIS = set()  # domínios com teste no carrinho ligado (tools/black/cupons.py TESTE_APROVADAS)

CSS = """<style>
/* Black de Verdade: vitrine escura, capa grande, desconto que se lê de longe */
.bk{padding-top:14px;padding-bottom:40px;display:grid;grid-template-columns:minmax(0,1fr);gap:22px;color:var(--ink)}.bk>*{min-width:0}
.bk h2{font-size:1.35rem;line-height:1.2;margin:0 0 4px;color:#fff}
.bk .sub{color:var(--muted);font-size:.95rem;margin:0}
.bk a{color:inherit}
/* topo */
.bk-hero{position:relative;overflow:hidden;border-radius:16px;padding:22px 18px 18px;background:
 radial-gradient(120% 90% at 100% 0,rgba(227,178,60,.28),transparent 55%),linear-gradient(160deg,#16130a,#000 60%);border:1px solid #3a2f12}
.bk-kick{display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;line-height:1.4;font-size:.74rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.bk-kick::before{content:"";width:8px;height:8px;border-radius:50%;background:#4cc38a;box-shadow:0 0 0 4px rgba(76,195,138,.18)}
.bk-hero h1{font-size:clamp(2.1rem,8vw,3.6rem);line-height:1;letter-spacing:-.02em;margin:10px 0 10px;color:#fff;font-weight:800}
.bk-hero h1 span{color:var(--gold)}
.bk-hero .lide{font-size:1.05rem;line-height:1.5;color:#dfe3ea;max-width:62ch;margin:0}
.bk-hero .lide b{color:#fff}
.bk-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:18px 0 0;padding:0;list-style:none}
.bk-stats li{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px 12px}
.bk-stats b{display:block;font-size:1.5rem;line-height:1.1;color:#fff;font-variant-numeric:tabular-nums}
.bk-stats li.ouro b{color:var(--gold)}
.bk-stats span{font-size:.8rem;color:var(--muted)}
.bk-atual{margin:12px 0 0;font-size:.82rem;color:var(--muted)}
.bk-pulo{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.bk-pulo a{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:999px;font-weight:800;font-size:.92rem;text-decoration:none}
.bk .bk-pulo a.pri{background:var(--gold);color:#111}.bk-pulo a.sec{border:1px solid #4a4f58;color:#fff}
@media (min-width:760px){.bk-hero{padding:34px 34px 28px}.bk-stats{grid-template-columns:repeat(4,minmax(0,1fr))}}
/* faixa de confiança */
.bk-conf{display:grid;gap:8px;margin:0;padding:0;list-style:none}
.bk-conf li{display:flex;gap:10px;align-items:flex-start;font-size:.9rem;color:#cfd5de;line-height:1.4}
.bk-conf li::before{content:"✓";flex:none;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:rgba(76,195,138,.15);color:#4cc38a;font-weight:800;font-size:.8rem}
@media (min-width:760px){.bk-conf{grid-template-columns:repeat(3,1fr)}}
/* cartão de oferta */
.of{position:relative;display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;align-items:start;padding:12px;border-radius:14px;background:#111419;border:1px solid #262a32}
.of:hover{border-color:#4a3f1c}
.of-img{position:relative;display:block;aspect-ratio:1;border-radius:10px;background:#fff;overflow:hidden}
.of-img img{width:100%;height:100%;object-fit:contain;display:block}
.of-pct{position:absolute;left:6px;top:6px;padding:3px 7px;border-radius:7px;background:var(--gold);color:#111;font-weight:900;font-size:.95rem;line-height:1.1;font-variant-numeric:tabular-nums;box-shadow:0 2px 8px rgba(0,0,0,.35)}
.of-c{min-width:0;display:grid;gap:4px;align-content:start}
.of-rec{justify-self:start;font-size:.68rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#4cc38a;background:rgba(76,195,138,.12);border-radius:999px;padding:3px 8px}
.of-n{font-size:1rem;line-height:1.25;margin:0;color:#fff;font-weight:800;overflow-wrap:anywhere}
.of-m{margin:0;font-size:.8rem;color:var(--muted)}
.of-m .of-nota{color:#f0c44f;font-weight:700}
.of-p{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;margin:4px 0 0}
.of-por{font-size:1.45rem;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.of-ref{font-size:.85rem;color:var(--muted)}.of-ref s{text-decoration-thickness:1px}
.of-bar{position:relative;height:6px;border-radius:99px;background:#2a2f38;overflow:hidden;margin:4px 0 2px}
.of-bar span{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,#4cc38a,#9be3bd);border-radius:99px}
.of-eco{margin:0;font-size:.86rem;font-weight:800;color:#4cc38a}
.of-loja{margin:2px 0 0;font-size:.82rem;color:#cfd5de}
.of-loja b{color:#fff}
.of-cp{display:inline-block;margin-top:2px;font-size:.74rem;font-weight:800;color:var(--gold);border:1px dashed var(--gold);border-radius:6px;padding:1px 6px}
.of-acao{grid-column:1/-1;display:grid;gap:2px}.dest .of-acao{padding:0 14px 14px}.dest .of-c{padding-bottom:0!important}.of-btn{display:flex;align-items:center;justify-content:center;gap:6px;min-height:46px;margin-top:2px;border-radius:10px;background:var(--gold);color:#111;font-weight:900;text-decoration:none;font-size:.95rem}
.bk .of-btn,.bk .of-btn:hover{color:#111}.of-btn:hover{background:#f0c44f}
.of-mais{margin-top:6px;font-size:.84rem}
.of-mais summary{cursor:pointer;color:#cfd5de;font-weight:700;min-height:32px;display:flex;align-items:center;list-style:none}
.of-mais summary::-webkit-details-marker{display:none}
.of-mais summary::after{content:"+";margin-left:6px;color:var(--gold);font-weight:900}.of-mais[open] summary::after{content:"−"}
.of-mais ul{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:6px}
.of-mais li{display:flex;justify-content:space-between;gap:8px;align-items:center;border-top:1px solid #262a32;padding-top:6px;color:#cfd5de}
.of-mais li a{color:var(--gold);font-weight:800;white-space:nowrap}
.of-mais .calc{color:var(--muted);line-height:1.45}
/* destaques: o jogo grande */
.dest{display:grid;gap:12px;margin:0;padding:0;list-style:none}
.dest .of{grid-template-columns:1fr;padding:0;overflow:hidden}
.dest .of-img{aspect-ratio:4/3;border-radius:0}
.dest .of-img img{padding:12px;object-fit:contain}
.dest .of-pct{left:10px;top:10px;font-size:1.5rem;padding:6px 10px;border-radius:10px}
.dest .of-c{padding:0 14px 14px}
.dest .of-n{font-size:1.15rem}
.dest .of-por{font-size:1.9rem}
.dest .pos{position:absolute;right:10px;top:10px;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;background:#111;color:var(--gold);font-weight:900;font-size:.9rem;border:1px solid #4a3f1c}
@media (max-width:759px){.dest{grid-auto-flow:column;grid-auto-columns:84%;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:6px;margin:0 -16px;padding-left:16px;padding-right:16px;scrollbar-width:none}
 .dest>li{scroll-snap-align:start}}
@media (min-width:760px){.dest{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1080px){.dest{grid-template-columns:repeat(3,minmax(0,1fr))}.dest>li:first-child{grid-column:span 2;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);align-items:stretch}.dest>li:first-child .of-img{aspect-ratio:auto;min-height:100%}.dest>li:first-child .of-c{padding:20px 20px 0 6px;align-content:end}.dest>li:first-child .of-acao{grid-column:2;padding:8px 20px 20px 6px;align-content:start}.dest>li:first-child .of-img{grid-row:span 2}.dest>li:first-child .of-n{font-size:1.5rem}.dest>li:first-child .of-por{font-size:2.4rem}}
.dica-arrasta{font-size:.8rem;color:var(--muted);margin:6px 0 0}
@media (min-width:760px){.dica-arrasta{display:none}}
/* filtros */
.bk-filtros{position:sticky;top:var(--nav-h,49px);z-index:10;display:grid;gap:8px;padding:10px;margin:0 -6px;border-radius:12px;background:rgba(10,11,14,.94);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid #262a32}
.bk-filtros[hidden]{display:none}
.seg{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none}
.seg button,.bk-chk{flex:none;display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 14px;border-radius:999px;border:1px solid #3a3f48;background:none;color:#e9ecf1;font:inherit;font-size:.88rem;font-weight:700;cursor:pointer}
.seg button[aria-pressed=true]{background:#fff;color:#111;border-color:#fff}
.bk-chk input{accent-color:var(--gold);width:16px;height:16px}
.bk-linha2{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:8px}.bk-linha2>*{min-width:0;max-width:100%}
.bk-filtros input[type=search],.bk-filtros select{min-height:42px;border-radius:10px;border:1px solid #3a3f48;background:#14171c;color:#fff;font:inherit;font-size:16px;padding:0 12px}
.bk-cont{margin:0;font-size:.82rem;color:var(--muted)}
@media (min-width:900px){.bk-filtros{grid-template-columns:auto 1fr auto auto;align-items:center}.bk-linha2{grid-column:2}.bk-cont{text-align:right}}
.ofertas{display:grid;gap:10px;margin:12px 0 0;padding:0;list-style:none}
@media (min-width:760px){.ofertas{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (min-width:1080px){.ofertas{grid-template-columns:repeat(3,minmax(0,1fr))}}
.ofertas .of[hidden]{display:none}
.vazio{padding:20px;border-radius:12px;border:1px dashed #3a3f48;color:var(--muted);text-align:center}
/* cupons */
.cupons{display:grid;gap:10px;margin:12px 0 0;padding:0;list-style:none}
@media (min-width:760px){.cupons{grid-template-columns:repeat(2,minmax(0,1fr))}}
.cup-c{display:grid;gap:6px;padding:14px;border-radius:14px;background:#111419;border:1px solid #262a32}
.cup-loja{margin:0;font-weight:800;color:#fff}
.cup-cod{justify-self:start;display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 6px 0 14px;border-radius:10px;border:2px dashed var(--gold);background:rgba(227,178,60,.08);color:#fff;font:inherit;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:1.05rem;font-weight:800;letter-spacing:.04em;cursor:pointer}
.cup-cod span{font-family:"Public Sans",system-ui,sans-serif;letter-spacing:0;font-size:.78rem;background:var(--gold);color:#111;border-radius:7px;padding:5px 9px}
.cup-txt{margin:0;font-size:.85rem;color:#cfd5de;line-height:1.45}
.cup-st{margin:0;font-size:.78rem;color:var(--muted)}
.cup-c a{font-size:.85rem;font-weight:800;color:var(--gold)}
/* armadilhas */
.arms{display:grid;gap:10px;margin:12px 0 0;padding:0;list-style:none}
.arm{display:grid;gap:6px;padding:14px;border-radius:14px;background:#160c0e;border:1px solid #4a1f27}
.arm-n{display:flex;flex-wrap:wrap;gap:8px}
.arm-fake{font-weight:800;color:#ff8a9a}.arm-fake s{text-decoration-thickness:2px}
.arm-real{font-weight:800;color:#fff}
/* informações */
.bk-info{border-radius:14px;background:#111419;border:1px solid #262a32}
.bk-info summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;min-height:52px;padding:0 16px;font-weight:800;color:#fff}
.bk-info summary::-webkit-details-marker{display:none}
.bk-info summary::after{content:"+";margin-left:auto;color:var(--gold);font-size:1.3rem}.bk-info[open] summary::after{content:"−"}
.bk-info .dentro{padding:0 16px 16px;display:grid;gap:10px;color:#cfd5de;font-size:.92rem;line-height:1.55}
.bk-info .dentro p,.bk-info .dentro ul{margin:0}.bk-info .dentro ul{padding-left:1.1em;display:grid;gap:6px}
.bk-info b{color:#fff}
.bk .credito{font-size:.8rem;color:#a1a9b5;margin:10px 0 0}
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


def capa(item, pre, lado=240):
    """Caminho da capa local; baixa da ficha do Compara Jogos na primeira vez.
    240 px para as linhas da lista; 640 px (arquivo <slug>-g.webp) para os destaques, onde o jogo aparece grande."""
    arq = IMG / (f"{item['slug']}.webp" if lado == 240 else f"{item['slug']}-g.webp")
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
                im.thumbnail((lado, lado))
                IMG.mkdir(parents=True, exist_ok=True)
                im.save(arq, "WEBP", quality=82 if lado == 240 else 80)
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


def hora(iso, agora_):
    """'hoje às 11h14' ou '02/11 às 18h40'."""
    try:
        t = dt.datetime.fromisoformat(iso.replace("Z", "+00:00")).astimezone(BR)
    except Exception:
        return "horário não informado"
    return (f"hoje às {t:%Hh%M}" if t.date() == agora_.date() else f"{t:%d/%m} às {t:%Hh%M}")


def trecho(texto, codigo, lado=45):
    """O pedaço da página da loja em volta do código do cupom: até a frase acabar ou, em texto de menu sem pontuação,
    umas poucas palavras de cada lado (o resto é menu e rodapé da loja)."""
    t = re.sub(r"\s+", " ", limpa(texto)).strip()
    i = t.upper().find(codigo.upper())
    if i < 0:
        return ""
    f = i + len(codigo)
    ini = max(i - lado, 0)
    p = max(t.rfind(". ", ini, i), t.rfind("! ", ini, i), t.rfind("? ", ini, i))
    ini = p + 2 if p >= 0 else (t.find(" ", ini) + 1 if ini > 0 else 0)
    fim = min(f + lado, len(t))
    q = [k for k in (t.find(".", f, fim + 1), t.find("!", f, fim + 1)) if k >= 0]
    fim = min(q) + 1 if q else (t.rfind(" ", f, fim) if fim < len(t) and t.rfind(" ", f, fim) > f else fim)
    pedaco = t[ini:fim].strip(" -,;:")
    return ("…" if ini > 0 and p < 0 else "") + pedaco + ("…" if not q and fim < len(t) else "")


def codigos(url, cps):
    reg = cps.get(urlparse(url or "").netloc.lower())
    return [c["codigo"] for c in reg["cupons"].values()] if reg and reg.get("cupons") else []


def nota_txt(x):
    return f'<span class="of-nota">★ {x["bgg"]:.1f}</span> no BGG'.replace(".", ",", 1) if x["bgg"] else "sem nota no BGG"


def cartao(grupo, pre, cps, agora_, destaque=False, pos=None):
    """Um jogo: a melhor oferta em destaque e, se houver, as outras lojas que também passaram no corte."""
    x = grupo[0]
    img = capa(x, pre, 640 if destaque else 240)
    eco = x["ref"] - x["por"]
    cods = codigos(x["url"], cps)
    loja = e(x["loja"])
    rel = 'target="_blank" rel="noopener nofollow sponsored"'
    outras = "".join(f'<li><span>{e(o["loja"])}: <b>{brl(o["por"])}</b> ({pct(o["desc"])} abaixo da média)</span>'
                     f'<a href="{e(o["url"])}" {rel}>Ver</a></li>' for o in grupo[1:])
    calc = (f'<p class="calc">Média do período: {brl(x["ref"])} ({x["dias"]} dias de histórico{", base curta" if x["dias"] < radar.JANELA else ""}). '
            f'Menor preço do período: {brl(x["menor"])}. Preço lido na {e(x.get("fonte_preco", "Compara Jogos"))}, {hora(x["verificado"], agora_)}.</p>')
    dados = (f'data-tipo="{e(x["tipo"])}" data-desc="{x["desc"]:.4f}" data-eco="{eco:.2f}" data-bgg="{x["bgg"] or 0:.2f}" '
             f'data-por="{x["por"]:.2f}" data-rec="{1 if x["recorde"] else 0}" data-busca="{e((nome(x) + " " + " ".join(o["loja"] for o in grupo) + " " + (x["editora"] or "")).lower())}"')
    return f"""<li class="of" {dados}>
 <a class="of-img" href="{e(x["url"])}" {rel} tabindex="-1" aria-hidden="true">{f'<img src="{img}" alt="" loading="lazy" decoding="async" width="{640 if destaque else 240}" height="{640 if destaque else 240}">' if img else ""}<span class="of-pct">−{pct(x["desc"])}</span>{f'<span class="pos">{pos}</span>' if pos else ""}</a>
 <div class="of-c">
  {'<span class="of-rec">Menor preço do período</span>' if x["recorde"] else ""}
  <h3 class="of-n">{e(nome(x))}</h3>
  <p class="of-m">{e(x["editora"] or "Editora não informada")} · {"Expansão · " if x["tipo"] == "expansion" else ""}{nota_txt(x)}</p>
  <p class="of-p"><b class="of-por">{brl(x["por"])}</b><span class="of-ref">média <s>{brl(x["ref"])}</s></span></p>
  <div class="of-bar" role="img" aria-label="Preço de hoje é {pct(1 - x["desc"])} da média"><span style="width:{max(4, min(100, (1 - x["desc"]) * 100)):.0f}%"></span></div>
  <p class="of-eco">{brl(eco)} abaixo da média ({pct(x["desc"])})</p>
  <p class="of-loja">na <b>{loja}</b>{f" (vendido por {e(x['vendedor'])})" if x.get("vendedor") else ""} · preço visto {hora(x["verificado"], agora_)}{"".join(f' <span class="of-cp">cupom {e(c)}</span>' for c in cods)}</p>
 </div>
 <div class="of-acao">
  <a class="of-btn" href="{e(x["url"])}" {rel}>Ver na {loja} ↗</a>
  {f'<details class="of-mais"><summary>Mais {len(grupo) - 1} loja{"s" if len(grupo) > 2 else ""} com desconto real</summary><ul>{outras}</ul></details>' if outras else ""}
  <details class="of-mais"><summary>Como chegamos a esse desconto</summary>{calc}</details>
 </div>
</li>"""


JS = """<script>
(()=>{const f=document.querySelector('.bk-filtros');if(!f)return;f.hidden=false;
const ul=document.querySelector('.ofertas'),itens=[...ul.children],cont=f.querySelector('.bk-cont'),vazio=document.querySelector('.ofertas-vazio');
let tipo='',ord='desc';
const aplica=()=>{const q=f.querySelector('input[type=search]').value.trim().toLowerCase(),rec=f.querySelector('.bk-chk input').checked;
 const chave={desc:x=>-x.dataset.desc,eco:x=>-x.dataset.eco,bgg:x=>-x.dataset.bgg,por:x=>+x.dataset.por}[ord];
 itens.sort((a,b)=>chave(a)-chave(b)).forEach(x=>ul.append(x));let n=0;
 itens.forEach(x=>{const ok=(!tipo||x.dataset.tipo===tipo)&&(!rec||x.dataset.rec==='1')&&(!q||x.dataset.busca.includes(q));x.hidden=!ok;n+=ok});
 cont.textContent=n+(n===1?' jogo':' jogos');vazio.hidden=n>0};
f.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{tipo=b.dataset.tipo;f.querySelectorAll('.seg button').forEach(o=>o.setAttribute('aria-pressed',o===b));aplica()}));
f.querySelector('select').addEventListener('change',e=>{ord=e.target.value;aplica()});
f.querySelector('.bk-chk input').addEventListener('change',aplica);f.querySelector('input[type=search]').addEventListener('input',aplica);aplica()})();
document.addEventListener('click',async e=>{const b=e.target.closest('.cup-cod');if(!b)return;const s=b.querySelector('span');
 try{await navigator.clipboard.writeText(b.dataset.cod);s.textContent='Copiado'}catch(_){s.textContent='Selecione e copie'}setTimeout(()=>s.textContent='Copiar',2200)});
</script>"""


def build(radar_itens, armadilhas, quase=()):
    pre = "../"
    url = f"{SITE}/black/"
    agora_ = radar.agora()
    cps = cupons()
    titulo = "Black de Verdade: ofertas de jogos de tabuleiro com desconto real"
    # um grupo por jogo, na ordem do maior desconto; a primeira oferta de cada grupo é a melhor
    grupos = {}
    for x in radar_itens:
        grupos.setdefault(x["slug"], []).append(x)
    melhor = {s: g[0] for s, g in grupos.items()}
    top = sorted(melhor.values(), key=lambda x: -((x["bgg"] or 7.0) * x["desc"]))[:5]
    n_jogos = sum(1 for x in melhor.values() if x["tipo"] != "expansion")
    n_exps = len(melhor) - n_jogos
    maior = max((x["desc"] for x in melhor.values()), default=0)
    recordes = sum(1 for x in melhor.values() if x["recorde"])
    n_cupons = sum(len(r["cupons"]) for r in cps.values())
    curta = min((x["dias"] for x in radar_itens), default=None)
    dest_html = "".join(cartao(grupos[x["slug"]], pre, cps, agora_, destaque=True, pos=i) for i, x in enumerate(top, 1))
    lista_html = "".join(cartao(g, pre, cps, agora_) for g in grupos.values())
    quase_html = "".join(cartao([x], pre, cps, agora_) for x in quase)
    cps_html = ""
    for dom, reg in sorted(cps.items(), key=lambda kv: kv[1]["loja"].lower()):
        for c in reg["cupons"].values():
            t = c.get("teste")
            teste = (f"Testado no carrinho {quando(t['hora'])}: {'aplicou' if t['ok'] else 'recusado'}{', ' + e(t['detalhe']) if t.get('detalhe') else ''}" if t
                     else ("Não testado no carrinho: fonte Promobit, a loja não permite robôs" if c.get("fonte") == "Promobit"
                           else "Não testado no carrinho: o robots.txt da loja proíbe robôs no carrinho") if dom not in TESTAVEIS else "Aguardando teste no carrinho")
            dito = trecho(c["texto"], c["codigo"])
            cps_html += (f'<li class="cup-c"><p class="cup-loja">{e(reg["loja"])}</p>'
                         f'<button type="button" class="cup-cod" data-cod="{e(c["codigo"])}" aria-label="Copiar o cupom {e(c["codigo"])}">{e(c["codigo"])}<span>Copiar</span></button>'
                         + (f'<p class="cup-txt">A loja diz: “{e(dito)}”</p>' if dito else "")
                         + f'<p class="cup-st">Visto na página da loja {hora(c["visto"], agora_)}. {teste}.</p>'
                         f'<a href="{e(c["pagina"])}" target="_blank" rel="noopener nofollow">Ver na loja ↗</a></li>')
    pb_arq = ROOT / "conteudo" / "black" / "promobit.json"
    pbs = json.loads(pb_arq.read_text(encoding="utf-8")) if pb_arq.exists() else {}
    hist = radar.ler(radar.HIST, {})
    pb_html = ""
    for v in sorted(pbs.values(), key=lambda v: v.get("publicado") or "", reverse=True):
        real = ""
        h = hist.get(v.get("jogo") or "")
        if h and h.get("pontos") and v.get("preco") and v.get("tipo_preco") != "COUPON":
            ref = radar.aparada(h["pontos"].values())
            real = (f'Desconto real: {pct((ref - v["preco"]) / ref)} sobre a média de {brl(ref)}' if v["preco"] < ref
                    else f"Acima da média de {brl(ref)}")
        preco = brl(v["preco"]) if v.get("preco") and v.get("tipo_preco") != "COUPON" else "Ver cupom"
        antes = f' <span class="of-ref"><s>{brl(v["preco_antes"])}</s></span>' if v.get("preco_antes") else ""
        pb_html += (f'<li class="cup-c"><p class="cup-loja">{e(limpa(v["titulo"]))}</p>'
                    f'<p class="of-p" style="margin:0"><b class="of-por" style="font-size:1.2rem">{preco}</b>{antes}</p>'
                    f'<p class="cup-txt">{e(v.get("loja") or "")}{f" · cupom <b>{e(v['cupom'])}</b>" if v.get("cupom") else ""} · '
                    f'{e(real) if real else "jogo fora da nossa base"}</p>'
                    f'<p class="cup-st">Postada {hora(v.get("publicado") or v["visto"], agora_)}. Vendedor e validade não conferidos.</p>'
                    f'<a href="{e(v["link"])}" target="_blank" rel="noopener nofollow">Ver no Promobit ↗</a></li>')
    arm_html = "".join(
        f'<li class="arm"><p style="margin:0"><b>{e(nome(x))}</b> em {e(x["loja"])}</p><div class="arm-n">'
        f'<span class="arm-fake">A loja anuncia <s>−{pct((x["de"] - x["por"]) / x["de"])}</s></span><span class="arm-real">Desconto real: {pct(max(x["desc"], 0))}</span></div>'
        f'<p class="cup-txt">De {brl(x["de"])} por {brl(x["por"])}, mas a média real do período é {brl(x["ref"])}.</p></li>' for x in armadilhas)
    corpo = f"""{cabecalho(pre, "Black de Verdade")}
<main id="conteudo" class="in bk">
 {trilha(("Início", pre), ("Black de Verdade", ""))}
 <header class="bk-hero">
  <span class="bk-kick">Radar de preços · Black Friday 2026</span>
  <h1>Black de <span>Verdade</span></h1>
  <p class="lide">Só entra aqui jogo de tabuleiro que está <b>pelo menos 20% abaixo do preço médio real</b> dos últimos meses. Nada de comparar com um preço "de" inventado na véspera.</p>
  <ul class="bk-stats">
   <li class="ouro"><b>{len(melhor)}</b><span>jogos com desconto real ({n_jogos} jogos base, {n_exps} expansões)</span></li>
   <li class="ouro"><b>até {pct(maior)}</b><span>abaixo da média</span></li>
   <li><b>{recordes}</b><span>no menor preço do período</span></li>
   <li><b>{n_cupons}</b><span>cupom{"s" if n_cupons != 1 else ""} anunciado{"s" if n_cupons != 1 else ""} pelas lojas</span></li>
  </ul>
  <p class="bk-atual">Atualizado em {agora_.strftime("%d/%m/%Y às %Hh%M")} (horário de Brasília). O radar lê os preços de novo a cada 30 minutos.</p>
  <nav class="bk-pulo" aria-label="Atalhos"><a class="pri" href="#melhores">Ver as melhores ofertas</a><a class="sec" href="#todas">Todas as {len(melhor)}</a>{f'<a class="sec" href="#quase">Quase Black ({len(quase)})</a>' if quase else ""}{'<a class="sec" href="#cupons">Cupons</a>' if cps_html else ""}{'<a class="sec" href="#comunidade">Achados da comunidade</a>' if pb_html else ""}</nav>
 </header>
 <ul class="bk-conf">
  <li>Desconto calculado sobre a média aparada do histórico de preços, não sobre o preço "de" da loja.</li>
  <li>Preço conferido na página da própria loja, com o horário da leitura em cada oferta.</li>
  <li>Só jogo bem avaliado: nota 7 ou mais no BGG, ou premiado. Links sem comissão.</li>
 </ul>
 <section id="melhores" aria-labelledby="h-melhores">
  <h2 id="h-melhores">As 5 melhores agora</h2>
  <p class="sub">A melhor combinação de nota no BGG e desconto real.</p>
  {f'<ol class="dest">{dest_html}</ol><p class="dica-arrasta">Arraste para o lado para ver as cinco.</p>' if dest_html else '<p class="vazio">Nenhum jogo passou no corte nesta leitura. O radar tenta de novo em 30 minutos.</p>'}
 </section>
 <section id="todas" aria-labelledby="h-todas">
  <h2 id="h-todas">Todas as ofertas com desconto real</h2>
  <p class="sub">Um cartão por jogo, com a loja mais barata. Quando outra loja também passou no corte, ela aparece em "Mais lojas".</p>
  <div class="bk-filtros" role="group" aria-label="Filtrar e ordenar ofertas" hidden>
   <div class="seg"><button type="button" data-tipo="" aria-pressed="true">Tudo ({len(melhor)})</button><button type="button" data-tipo="game" aria-pressed="false">Jogos base ({n_jogos})</button><button type="button" data-tipo="expansion" aria-pressed="false">Expansões ({n_exps})</button>
    <label class="bk-chk"><input type="checkbox"> Menor preço do período</label></div>
   <div class="bk-linha2"><input type="search" placeholder="Buscar jogo, loja ou editora" aria-label="Buscar jogo, loja ou editora">
    <select aria-label="Ordenar"><option value="desc">Maior desconto</option><option value="eco">Maior economia em R$</option><option value="bgg">Melhor nota BGG</option><option value="por">Menor preço</option></select></div>
   <p class="bk-cont" aria-live="polite"></p>
  </div>
  {f'<ul class="ofertas">{lista_html}</ul>' if lista_html else ""}
  <p class="vazio ofertas-vazio" hidden>Nenhuma oferta com esses filtros.</p>
  <p class="credito">Preços, histórico, nota BGG e imagens das caixas: Compara Jogos (comparajogos.com.br). Links levam à loja; não ganhamos comissão.</p>
 </section>
 <section id="quase" aria-labelledby="h-quase">
  <h2 id="h-quase">Quase Black: de 15% a 19% abaixo da média</h2>
  <p class="sub">Jogos que ainda não chegaram aos 20% do Black de Verdade, mas já estão abaixo da média real do período. Mesmo cálculo e mesma conferência na loja. Se o preço cair mais, o jogo sobe para a lista principal.</p>
  {f'<ul class="ofertas quase">{quase_html}</ul>' if quase_html else '<p class="vazio">Nenhum jogo nessa faixa nesta leitura.</p>'}
 </section>
 <section id="cupons" aria-labelledby="h-cupons">
  <h2 id="h-cupons">Cupons anunciados pelas lojas</h2>
  <p class="sub">Códigos que as lojas do radar publicam na própria página e cupons das grandes lojas (Amazon, Mercado Livre, Magalu, Americanas, Casas Bahia) publicados no Promobit, com a hora em que o robô viu cada um. Cupom que some da página sai daqui em até 36 horas. Toque no código para copiar.</p>
  {f'<ul class="cupons">{cps_html}</ul>' if cps_html else '<p class="vazio">Nenhum cupom anunciado nas lojas do radar nesta leitura.</p>'}
 </section>
 <section id="comunidade" aria-labelledby="h-pb">
  <h2 id="h-pb">Achados da comunidade (Promobit)</h2>
  <p class="sub">Promoções de jogos de tabuleiro postadas por membros do Promobit nos últimos 7 dias, inclusive de Amazon, Mercado Livre, Magalu e Americanas. O robô não confere o vendedor nem se a promoção ainda vale: confira na loja. Quando o jogo está na nossa base, mostramos o desconto real sobre a média.</p>
  {f'<ul class="cupons">{pb_html}</ul>' if pb_html else '<p class="vazio">Nenhuma promoção de jogo de tabuleiro postada nos últimos 7 dias.</p>'}
 </section>
 <section aria-labelledby="h-arm">
  <h2 id="h-arm">Desconto de mentira</h2>
  <p class="sub">Ofertas em que a loja anuncia 20% ou mais de desconto entre o preço "de" e o "por", mas o preço de hoje está menos de 20% abaixo da média real.</p>
  {f'<ul class="arms">{arm_html}</ul>' if arm_html else '<p class="vazio">Nenhuma armadilha nesta leitura.</p>'}
 </section>
 <details class="bk-info">
  <summary>Como calculamos o desconto</summary>
  <div class="dentro"><ul>
   <li><b>Referência:</b> média aparada dos pontos diários de menor preço de jogo novo dos últimos 180 dias (ou do período disponível, marcado como base curta). A média é aparada: tiramos os 10% de preços mais altos e os 10% mais baixos do histórico e fazemos a conta com o resto.</li>
   <li><b>Desconto real:</b> (referência menos preço de hoje) dividido pela referência. Entra com 20% ou mais.</li>
   <li><b>Qualidade:</b> nota 7,0 ou mais no BGG, ou jogo premiado no Golden Geek, Spiel des Jahres ou Kennerspiel.</li>
   <li><b>Lojas:</b> só jogo novo de loja que anuncia no Compara Jogos. Oferta abaixo de 45% da referência é descartada como provável anúncio de outro produto.</li>
   <li><b>Jogo base e expansão</b> aparecem separados.</li>
  </ul></div>
 </details>
 <details class="bk-info">
  <summary>Antes de comprar: limites do radar</summary>
  <div class="dentro">
   <p><b>Base curta.</b> O histórico vem das páginas públicas do Compara Jogos, que mostram 30 dias. Gravamos um ponto por
   dia desde 03/11/2026 até completar 180 dias; até lá, cada oferta mostra quantos dias de base a conta usou{f" (hoje, a partir de {curta} dias)" if curta else ""}.</p>
   <p><b>Amazon e Mercado Livre.</b> Os sites não deixam robôs lerem as páginas. A Amazon entra pelo Keepa, só com produto
   vendido pela própria Amazon, e o Mercado Livre pela API oficial, só com loja oficial ou MercadoLíder, quando essas fontes
   estão ligadas. Promoções dessas e de outras grandes lojas postadas no Promobit aparecem numa seção à parte, com o vendedor
   ainda não conferido. Shopee e vendedores avulsos ficam de fora.</p>
   <p><b>Preço conferido na loja.</b> Antes de publicar, o robô abre a página do produto na própria loja e lê o preço e o
   estoque. Esse é o preço de tabela da página: no Pix costuma sair um pouco mais barato. Lojas que
   bloqueiam robôs ficam com o preço informado ao Compara Jogos.</p>
   <p><b>Confira antes de pagar.</b> Frete não é verificado pelo robô, e cupom só é testado onde a loja permite. Preço muda rápido: cada oferta mostra a hora
   em que o preço foi lido.</p>
  </div>
 </details>
</main>
{rodape(pre)}
{JS}"""
    ld = seo.script({"@type": "CollectionPage", "@id": url, "url": url, "name": titulo, "inLanguage": "pt-BR",
                     "dateModified": agora_.isoformat(timespec="minutes")},
                    seo.trilha(("Início", f"{SITE}/"), ("Black de Verdade", url)))
    descr_curta = (f"{len(melhor)} jogos de tabuleiro até {pct(maior)} abaixo do preço médio real. Desconto calculado sobre o histórico, "
                   "não sobre o preço \"de\" da loja. Atualizado a cada 30 minutos.") if melhor else None
    descr = descr_curta or ("Radar de ofertas de jogos de tabuleiro com desconto real de 20% ou mais sobre a média aparada do histórico "
             "de preços, com nota BGG, loja, link e horário da verificação.")
    # cartão de prévia do WhatsApp com os números e as capas das três melhores ofertas (tools/black/cartao_black.py);
    # o ?v= muda quando o cartão muda, para o WhatsApp e as redes buscarem a imagem nova
    og_img = f"{SITE}/consulta/capa.jpg"
    try:
        import hashlib
        import cartao_black
        arq = cartao_black.gerar(top, len(melhor), maior, agora_.strftime("%d/%m"))
        og_img = f"{SITE}/img/black/{arq.name}?v={hashlib.md5(arq.read_bytes()).hexdigest()[:8]}"
    except Exception as ex:  # sem o cartão, a página segue com a imagem antiga
        print("aviso: cartão da Black não gerado:", ex)
    (ROOT / "black").mkdir(exist_ok=True)
    (ROOT / "black" / "index.html").write_text(pagina(titulo, descr, url, og_img, pre, corpo,
                                                      head_extra="\n" + CSS, jsonld=ld), encoding="utf-8")
    print(f"ok black/index.html: {len(melhor)} jogos no radar, {len(armadilhas)} armadilhas")



def robo():
    """Página /black/robo/: quem é o robô do Black de Verdade, o que ele lê e como a loja pede ajuste ou exclusão."""
    import lojas
    pre = "../../"
    url = f"{SITE}/black/robo/"
    titulo = "Robô do Black de Verdade: o que ele lê e como falar com a gente"
    corpo = f"""{cabecalho(pre, "Black de Verdade", sub=True)}
<main id="conteudo" class="in"><div class="nota guia bk">
 {trilha(("Início", pre), ("Black de Verdade", f"{pre}black/"), ("Robô", ""))}
 <article class="bloco">
  <h1>Robô do Black de Verdade</h1>
  <p class="lide">Se você tem uma loja e viu <b>EliteBoardgamers/1.0</b> no registro do seu servidor, é o robô do
  <a class="mais-g" href="{pre}black/">Black de Verdade</a>, o radar de ofertas de jogos de tabuleiro da Elite Boardgamers.
  Ele leva gente para a sua loja: cada oferta do radar tem link direto para a página do produto.</p>
 </article>
 <section class="bloco"><h2>O que ele faz</h2><ul class="lista" style="display:grid;gap:10px;padding-left:20px;list-style:disc">
  <li>Abre só a página de produtos que já estão no nosso radar, para conferir preço e estoque antes de publicar a oferta.</li>
  <li>Abre a página inicial e a de promoções no máximo 3 vezes por dia, para ver cupons que a loja anuncia.</li>
  <li>Na leitura completa, espera 6 segundos entre uma página e outra da mesma loja, não passa de {lojas.LIMITE_DIA} páginas por dia por loja e reaproveita por 12 horas o preço que já leu.</li>
  <li>Na leitura rápida, que confere ofertas novas, espera 2 segundos entre páginas da mesma loja e abre só as ofertas candidatas do momento.</li>
  <li>Não faz login, não fecha pedido e não preenche formulário.</li>
 </ul></section>
 <section class="bloco"><h2>O que ele respeita</h2><ul class="lista" style="display:grid;gap:10px;padding-left:20px;list-style:disc">
  <li>O seu robots.txt, tanto para <code>EliteBoardgamers</code> quanto para os robôs da Anthropic (<code>ClaudeBot</code>, <code>Claude-User</code>), porque o radar é operado com o Claude.</li>
  <li>Bloqueio: se a loja responder 401, 403 ou 429, o robô para de visitar a loja naquela leitura; na leitura completa, fica 48 horas sem visitar. Ele nunca troca de identidade nem de endereço para insistir.</li>
 </ul></section>
 <section class="bloco"><h2>Quer ajustar ou sair?</h2>
  <p class="criterio">Para o robô não visitar a sua loja, basta pôr no robots.txt:</p>
  <pre style="background:#fff;border:1px solid var(--paper-line);border-radius:8px;padding:12px;overflow-x:auto">User-agent: EliteBoardgamers
Disallow: /</pre>
  <p class="criterio">Prefere que a gente leia um arquivo só, uma vez por dia, em vez das páginas? Mande o link do seu feed de produtos
  (o mesmo do Google Shopping) pelo Instagram <a class="mais-g" href="https://www.instagram.com/eliteboardgamers/">@eliteboardgamers</a>
  ou responda ao nosso e-mail. Com o feed, todos os seus jogos entram no radar e a sua loja recebe menos visitas do robô.</p>
 </section>
</div></main>
{rodape(pre)}"""
    ld = seg_ld = seo.script({"@type": "WebPage", "@id": url, "url": url, "name": titulo, "inLanguage": "pt-BR"},
                             seo.trilha(("Início", f"{SITE}/"), ("Black de Verdade", f"{SITE}/black/"), ("Robô", url)))
    descr = "O que o robô do Black de Verdade lê nas lojas, com que frequência, o que ele respeita e como pedir ajuste ou exclusão."
    (ROOT / "black" / "robo").mkdir(parents=True, exist_ok=True)
    (ROOT / "black" / "robo" / "index.html").write_text(pagina(titulo, descr, url, f"{SITE}/consulta/capa.jpg", pre, corpo,
                                                               head_extra="\n" + CSS, jsonld=ld), encoding="utf-8")
