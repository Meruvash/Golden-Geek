"""Feeds de produtos enviados pelas lojas (formato Google Shopping, XML) para o Radar Black de Verdade.

Cadastro: conteudo/black/feeds.json, uma lista de {"loja": "Nome da loja", "url": "https://.../feed.xml"}.
Só entram feeds que a própria loja mandou (por e-mail ou Instagram) ou que ela publica para isso.
Cada feed é baixado no máximo uma vez a cada 12 horas (guardado em conteudo/black/feeds_cache/) e os produtos
cujo nome bate com um jogo acompanhado entram como oferta daquela loja, com fonte "feed da loja".
"""
import datetime as dt
import json
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(0, str(Path(__file__).resolve().parent))
import lojas  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
CADASTRO = ROOT / "conteudo" / "black" / "feeds.json"
CACHE = ROOT / "conteudo" / "black" / "feeds_cache"
VALIDADE = dt.timedelta(hours=12)
G = "{http://base.google.com/ns/1.0}"
RUIDO = re.compile(r"\b(jogo de tabuleiro|board ?game|jogo de cartas|card game|galapagos|devir|conclave|meeplebr|grok|"
                   r"em portugues|pt br|edicao nacional|lacrado|novo|original)\b")


def chave(s):
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode().lower()
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", RUIDO.sub(" ", s)).strip()


def _num(v):
    m = re.search(r"(\d+(?:[.,]\d+)?)", (v or "").replace(".", "").replace(",", ".") if "," in (v or "") else (v or ""))
    return float(m.group(1)) if m else None


def _baixar(loja, url):
    dom = urlparse(url).netloc.lower()
    arq = CACHE / f"{dom}.json"
    if arq.exists():
        d = json.loads(arq.read_text(encoding="utf-8"))
        if d.get("hora", "") >= (dt.datetime.now(dt.timezone.utc) - VALIDADE).isoformat():
            return d["itens"]
    xml = lojas.pagina(url)
    if not xml:
        return json.loads(arq.read_text(encoding="utf-8"))["itens"] if arq.exists() else []
    itens = []
    try:
        raiz = ET.fromstring(xml.encode("utf-8"))
    except ET.ParseError:
        return []
    for it in raiz.iter("item"):
        g = lambda k: (it.findtext(G + k) or it.findtext(k) or "").strip()  # noqa: E731
        if g("condition") and g("condition") != "new":
            continue
        preco, promo = _num(g("price")), _num(g("sale_price"))
        itens.append({"titulo": g("title"), "url": g("link"), "de": preco, "por": promo or preco,
                      "estoque": g("availability") in ("in stock", "in_stock", "preorder", "") , "gtin": g("gtin")})
    CACHE.mkdir(parents=True, exist_ok=True)
    arq.write_text(json.dumps({"loja": loja, "hora": dt.datetime.now(dt.timezone.utc).isoformat(timespec="minutes"), "itens": itens},
                              ensure_ascii=False) + "\n", encoding="utf-8")
    return itens


def juntar(hist, ofertas):
    """Acrescenta às ofertas de hoje os produtos dos feeds que batem com jogos acompanhados."""
    cad = json.loads(CADASTRO.read_text(encoding="utf-8")) if CADASTRO.exists() else []
    if not cad:
        print("-- feeds: nenhum feed de loja cadastrado ainda")
        return
    nomes = {}
    for s, h in hist.items():
        k = chave(h.get("nome"))
        if k and (len(k.split()) >= 2 or len(k) >= 6):
            nomes.setdefault(k, s)
    agora = dt.datetime.now(dt.timezone.utc).isoformat(timespec="minutes")
    total = 0
    for f in cad:
        for it in _baixar(f["loja"], f["url"]):
            if not it["estoque"] or not it["por"]:
                continue
            s = nomes.get(chave(it["titulo"]))
            if not s or s not in ofertas:
                continue
            lista = ofertas[s]["ofertas"]
            lista[:] = [o for o in lista if o.get("url") != it["url"]]
            lista.append({"loja": f["loja"], "loja_id": urlparse(it["url"]).netloc, "tipo": "LINK", "vendedor": None,
                          "de": it["de"], "por": it["por"], "url": it["url"], "atualizado": agora, "fonte": "feed da loja"})
            total += 1
    print(f"ok feeds: {len(cad)} lojas, {total} ofertas casadas com jogos acompanhados")
