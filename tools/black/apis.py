"""APIs oficiais pagas ou de desenvolvedor para Amazon e Mercado Livre (Radar Black de Verdade).

Nada aqui é programa de afiliado. Cada fonte só liga quando a chave existe no ambiente (secrets do GitHub Actions);
as chaves nunca são gravadas em arquivo nem impressas.

  KEEPA_KEY                          Keepa (keepa.com, assinatura paga): preço da Amazon vendido pela própria Amazon
                                     e histórico, para os produtos que o Compara Jogos liga à Amazon (código ASIN).
  ML_CLIENT_ID, ML_CLIENT_SECRET     aplicativo no portal de desenvolvedores do Mercado Livre: preço do vencedor do
                                     catálogo (buy box), loja oficial e reputação do vendedor (MercadoLíder).

Regra do usuário: Amazon só quando vendido pela Amazon; Mercado Livre só loja oficial ou MercadoLíder. A oferta que
passa ganha o campo "api" e entra no radar como qualquer loja; a que não passa continua fora.
"""
import datetime as dt
import json
import os
import re
import time
from zoneinfo import ZoneInfo

import requests

BR = ZoneInfo("America/Sao_Paulo")
UA = {"User-Agent": "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br/black/robo/)"}
ASIN = re.compile(r"amazon\.com\.br/(?:[^/]+/)?dp/([A-Z0-9]{10})")
ML_PROD = re.compile(r"mercadolivre\.com\.br/(?:[^/]+/)?p/(MLB\d+)")
LIDER = {"silver", "gold", "platinum"}  # níveis do MercadoLíder


def agora():
    return dt.datetime.now(BR).isoformat(timespec="minutes")


# ----------------------------------------------------------------------------------------------- Keepa (Amazon)
KEEPA = "https://api.keepa.com"
DOMINIO_BR = 12  # amazon.com.br na numeração do Keepa


def _keepa_preco(produto):
    """Preço atual vendido pela Amazon (csv[0] = AMAZON); -1 quando a Amazon não vende agora."""
    serie = (produto.get("csv") or [None])[0]
    if not serie or len(serie) < 2 or serie[-1] in (-1, None):
        return None
    return serie[-1] / 100


def keepa(ofertas, so=None):
    chave = os.environ.get("KEEPA_KEY")
    if not chave:
        print("-- Keepa: sem KEEPA_KEY, Amazon fica de fora")
        return
    alvos = {}
    for s, of in ofertas.items():
        if so is not None and s not in so:
            continue
        for o in of["ofertas"]:
            m = ASIN.search(o.get("url") or "")
            if m:
                alvos.setdefault(m.group(1), []).append(o)
    asins = list(alvos)
    lidos = ok = 0
    for i in range(0, len(asins), 100):
        lote = asins[i:i + 100]
        r = requests.get(f"{KEEPA}/product", params={"key": chave, "domain": DOMINIO_BR, "asin": ",".join(lote), "history": 1, "days": 1},
                         headers=UA, timeout=60)
        if r.status_code == 429:
            print("-- Keepa: tokens esgotados nesta leitura; o resto fica para a próxima")
            break
        if r.status_code != 200:
            print(f"-- Keepa: resposta {r.status_code}; Amazon fica de fora nesta leitura")
            break
        for p in r.json().get("products") or []:
            lidos += 1
            preco = _keepa_preco(p)
            for o in alvos.get(p.get("asin"), []):
                o.pop("api", None)
                if preco:
                    o["api"] = {"fonte": "Keepa (vendido pela Amazon)", "preco": preco, "vendedor": "Amazon", "vendedor_ok": True, "hora": agora()}
                    ok += 1
        time.sleep(1)
    print(f"ok Keepa: {lidos} produtos da Amazon lidos, {ok} ofertas vendidas pela própria Amazon")


# ------------------------------------------------------------------------------------------ Mercado Livre (API)
ML = "https://api.mercadolibre.com"


def _ml_token():
    cid, seg = os.environ.get("ML_CLIENT_ID"), os.environ.get("ML_CLIENT_SECRET")
    if not cid or not seg:
        return None
    r = requests.post(f"{ML}/oauth/token", data={"grant_type": "client_credentials", "client_id": cid, "client_secret": seg},
                      headers=UA, timeout=30)
    return r.json().get("access_token") if r.status_code == 200 else None


def _ml_reputacao(h, vendedor, cache):
    if vendedor not in cache:
        u = requests.get(f"{ML}/users/{vendedor}", headers=h, timeout=30)
        time.sleep(0.4)
        d = u.json() if u.status_code == 200 else {}
        cache[vendedor] = ((d.get("seller_reputation") or {}).get("power_seller_status"), d.get("nickname"))
    return cache[vendedor]


def mercado_livre(ofertas, so=None, limite=None, idade_h=None):
    """Para cada produto de catálogo do Mercado Livre que o Compara Jogos liga a um jogo, lê os anúncios do produto
    (/products/ID/items: o campo buy_box_winner deixou de vir em 2026) e fica com o mais barato, novo, de loja oficial
    ou MercadoLíder. É esse preço que entra no radar; anúncio de vendedor comum não entra (regra do usuário)."""
    token = _ml_token()
    if not token:
        print("-- Mercado Livre: sem ML_CLIENT_ID/ML_CLIENT_SECRET (ou chave recusada), Mercado Livre fica de fora")
        return
    h = {**UA, "Authorization": f"Bearer {token}"}
    reputacao, lidos, ok = {}, 0, 0
    cache_prod = {}
    for s, of in ofertas.items():
        if so is not None and s not in so:
            continue
        for o in of["ofertas"]:
            m = ML_PROD.search(o.get("url") or "")
            if not m:
                continue
            # robô normal: só relê o que está com mais de idade_h horas, até `limite` produtos por ciclo
            velho = (o.get("api") or {}).get("hora", "")
            if idade_h and velho and velho > (dt.datetime.now(BR) - dt.timedelta(hours=idade_h)).isoformat(timespec="minutes"):
                continue
            if limite is not None and len(cache_prod) >= limite:
                continue
            o.pop("api", None)
            pid = m.group(1)
            if pid not in cache_prod:
                r = requests.get(f"{ML}/products/{pid}/items", headers=h, timeout=30)
                time.sleep(0.4)
                cache_prod[pid] = (r.json().get("results") or []) if r.status_code == 200 else None
            itens = cache_prod[pid]
            if itens is None:
                continue
            lidos += 1
            melhor = None
            for it in sorted((x for x in itens if x.get("price") and x.get("condition", "new") == "new"), key=lambda x: x["price"]):
                oficial = bool(it.get("official_store_id"))
                nivel, apelido = _ml_reputacao(h, it.get("seller_id"), reputacao) if it.get("seller_id") else (None, None)
                if oficial or nivel in LIDER:
                    melhor = (it, oficial, nivel, apelido)
                    break
            if not melhor:
                continue
            it, oficial, nivel, apelido = melhor
            o["api"] = {"fonte": "API do Mercado Livre", "preco": float(it["price"]), "vendedor": apelido or str(it.get("seller_id")),
                        "vendedor_ok": True, "nivel": "loja oficial" if oficial else f"MercadoLíder {nivel}",
                        "anuncio": it.get("item_id") or it.get("id"), "hora": agora()}
            ok += 1
    print(f"ok Mercado Livre: {lidos} produtos lidos, {ok} com anúncio de loja oficial ou MercadoLíder")


def enriquecer(ofertas, so=None):
    """`so`: só estes jogos (os perto do corte), para não gastar tokens com quem está longe de oferta."""
    keepa(ofertas, so)
    # o Mercado Livre tem o seu próprio robô desde 04/11/2026 (tools/black/robo_ml.py, workflow radar-ml.yml)
