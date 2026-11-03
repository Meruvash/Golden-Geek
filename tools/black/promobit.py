"""Promobit para o Radar Black de Verdade: promoções postadas pela comunidade e cupons das grandes lojas.

Uso (chamado pelo radar.py a cada leitura; pode rodar sozinho):  python3 tools/black/promobit.py

O robots.txt do Promobit permite as páginas de categoria (/promocoes/<categoria>/), a página da Black Friday e as de
cupons por loja (/cupons/loja/<loja>/); proíbe /buscar e /api, que não são usados. Uma página a cada 2 segundos.
É a nossa fonte para Amazon, Mercado Livre, Magalu, Americanas e Casas Bahia, que não deixam robô ler o site.

- Promoções: lê a categoria Brinquedos e Hobbies e a página da Black Friday e guarda as de jogo de tabuleiro (subcategoria
  "Jogos de tabuleiro" ou nome de um jogo que acompanhamos). Cada leitura traz só as mais recentes, então as promoções
  ficam guardadas por 7 dias em conteudo/black/promobit.json.
- Cupons: lê os cupons por loja e grava em conteudo/black/cupons.json com a fonte "Promobit".
O vendedor de uma promoção postada não é conferido pelo robô; a página diz isso.
"""
import datetime as dt
import json
import re
import sys
import unicodedata
from pathlib import Path
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent))
import lojas  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ARQ = ROOT / "conteudo" / "black" / "promobit.json"
CUPONS = ROOT / "conteudo" / "black" / "cupons.json"
HIST = ROOT / "conteudo" / "black" / "historico.json"
BASE = "https://www.promobit.com.br"
BR = ZoneInfo("America/Sao_Paulo")
GUARDA = dt.timedelta(days=7)
PAGINAS = ["/promocoes/brinquedos-e-hobbies/", "/black-friday/"]
# lojas cujos cupons interessam (as grandes, que não deixam robô ler o site, e as de jogos que aparecem no Promobit)
LOJAS_CUPOM = ["amazon", "mercado-livre", "magazine-luiza", "americanas", "casas-bahia", "carrefour", "submarino",
               "shoptime", "ponto", "extra"]
CHAVES = re.compile(r"\b(?:jogo de tabuleiro|board ?game|jogo de cartas|expans[aã]o|gal[aá]pagos|devir|conclave|meeplebr|grok games|"
                    r"catan|carcassonne|ticket to ride|dixit|wingspan|codenames|splendor|pandemic|terraforming|"
                    r"7 wonders|exploding kittens|uno\b|dobble|imagem e a[cç][aã]o|banco imobili)\b", re.I)
VALE = re.compile(r"brinquedo|jogo|tabuleiro|hobb|tod[oa]s? ?(?:o |a )?(?:site|loja)|(?:site|loja) tod[oa]|qualquer produto|"
                  r"primeira compra|1[ªa] compra|sem valor m[ií]nimo", re.I)
DOMINIOS = {"amazon.com.br", "mercadolivre.com.br", "magazineluiza.com.br", "americanas.com.br", "casasbahia.com.br",
            "carrefour.com.br", "submarino.com.br", "shoptime.com.br", "pontofrio.com.br", "extra.com.br"}


def agora():
    return dt.datetime.now(BR)


def chave(nome):
    s = unicodedata.normalize("NFKD", nome or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def _estado(url):
    h = lojas.pagina(url)
    if not h:
        return None
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', h, re.S)
    return json.loads(m.group(1))["props"]["pageProps"] if m else None


def _ofertas(pp):
    achadas = []
    def busca(o):
        if isinstance(o, dict):
            if "offerId" in o and "offerTitle" in o:
                achadas.append(o)
                return
            for v in o.values():
                busca(v)
        elif isinstance(o, list):
            for v in o:
                busca(v)
    busca(pp)
    return achadas


def nomes_acompanhados():
    try:
        hist = json.loads(HIST.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {}
    # nomes com 2 palavras ou mais, ou de uma palavra longa, para não casar "Azul" com qualquer coisa azul
    return {chave(h["nome"]): s for s, h in hist.items() if h.get("nome") and (len(chave(h["nome"]).split()) >= 2 or len(chave(h["nome"])) >= 8)}


def ler_ofertas():
    dados = json.loads(ARQ.read_text(encoding="utf-8")) if ARQ.exists() else {}
    nomes = nomes_acompanhados()
    hora = agora().isoformat(timespec="minutes")
    novas = 0
    for p in PAGINAS:
        pp = _estado(BASE + p)
        if not pp:
            continue
        for o in _ofertas(pp):
            titulo = o.get("offerTitle") or ""
            t = chave(titulo)
            from telegram import casar
            jogo = casar(titulo, nomes, json.loads(HIST.read_text(encoding="utf-8")) if HIST.exists() else {})
            if o.get("subcategorySlug") != "jogos-tabuleiro" and not jogo and not CHAVES.search(titulo):
                continue
            k = str(o["offerId"])
            novas += k not in dados
            dados[k] = {
                "titulo": titulo, "preco": o.get("offerPrice"), "preco_antes": o.get("offerOldPrice") or None,
                "tipo_preco": o.get("offerPriceType"), "cupom": o.get("offerCoupon"), "loja": o.get("storeName"),
                "dominio": o.get("storeDomain"), "publicado": o.get("offerPublished"), "slug": o.get("offerSlug"),
                "status": o.get("offerStatusName"), "foto": o.get("offerPhoto"), "jogo": jogo, "visto": hora,
                "link": f"{BASE}/oferta/{o.get('offerSlug')}/",
            }
    limite = (agora() - GUARDA).isoformat()
    dados = {k: v for k, v in dados.items() if (v.get("publicado") or v["visto"]) >= limite[:16]}
    ARQ.parent.mkdir(parents=True, exist_ok=True)
    ARQ.write_text(json.dumps(dados, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    print(f"ok promobit: {len(dados)} promoções de jogos guardadas ({novas} novas)")
    return dados


def ler_cupons():
    cps = json.loads(CUPONS.read_text(encoding="utf-8")) if CUPONS.exists() else {}
    hora = agora().isoformat(timespec="minutes")
    total = 0
    for slug in LOJAS_CUPOM:
        pp = _estado(f"{BASE}/cupons/loja/{slug}/")
        if not pp:
            continue
        lista = []
        def busca(o):
            if isinstance(o, dict):
                if "couponId" in o and "couponCode" in o:
                    lista.append(o)
                    return
                for v in o.values():
                    busca(v)
            elif isinstance(o, list):
                for v in o:
                    busca(v)
        busca(pp)
        for c in lista:
            cod = (c.get("couponCode") or "").strip()
            if not cod or c.get("couponStatusName") not in (None, "APPROVED"):
                continue
            dom = (c.get("storeDomain") or slug).lower().removeprefix("www.")
            texto_c = " ".join(str(c.get(k) or "") for k in ("couponTitle", "couponDiscountOn", "couponInstructions"))
            if dom not in DOMINIOS or not VALE.search(texto_c):
                continue  # cupom de outra loja ou de outra categoria (celular, cozinha...)
            reg = cps.setdefault(dom, {"loja": c.get("storeName") or slug, "cupons": {}})
            atual = reg["cupons"].setdefault(cod.upper(), {"codigo": cod.upper(), "primeira_vez": hora})
            atual.update({
                "texto": " ".join(x for x in (c.get("couponTitle"), c.get("couponDiscount"), c.get("couponDiscountOn") and f"em {c['couponDiscountOn']}",
                                              c.get("couponInstructions")) if x),
                "valor": c.get("couponDiscountShort"), "visto": hora, "fonte": "Promobit",
                "validade": c.get("couponUntil"), "pagina": f"{BASE}/cupons/loja/{slug}/",
            })
            total += 1
    for d in list(cps):
        if d not in DOMINIOS:
            cps[d]["cupons"] = {k: v for k, v in cps[d]["cupons"].items() if v.get("fonte") != "Promobit"}
            if not cps[d]["cupons"] and not cps[d].get("lido"):
                del cps[d]
    # cupom do Promobit que sumiu há mais de 36 h ou cuja validade passou sai da lista
    limite = (agora() - dt.timedelta(hours=36)).isoformat(timespec="minutes")
    hoje = agora().date().isoformat()
    for reg in cps.values():
        reg["cupons"] = {k: v for k, v in reg["cupons"].items()
                         if v.get("fonte") != "Promobit" or (v.get("visto", "") >= limite and (not v.get("validade") or v["validade"][:10] >= hoje))}
    CUPONS.write_text(json.dumps(cps, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    print(f"ok promobit: {total} cupons de {len(LOJAS_CUPOM)} lojas")


def ler():
    ler_ofertas()
    ler_cupons()


if __name__ == "__main__":
    ler()
