"""Teste das APIs do Radar Black no GitHub Actions (workflow teste-apis.yml). Mostra só resultados, nunca as chaves.

Mercado Livre:
  1. o token sai com ML_CLIENT_ID e ML_CLIENT_SECRET?
  2. a leitura de produto (/products/MLB..., usada pelo robô para conferir buy box, loja oficial e MercadoLíder)
     funciona nas ofertas que o Compara Jogos liga ao Mercado Livre?
  3. a busca (/sites/MLB/search) responde? Se sim, quantos jogos de tabuleiro com preço riscado (original_price acima do
     preço) aparecem de loja oficial ou MercadoLíder: são as ofertas que a API pode trazer além do Compara Jogos.

Uso: python3 tools/black/teste_apis.py
"""
import json
import os
import re
import sys
import time
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).resolve().parent))
import apis  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ML = apis.ML
UA = apis.UA


def presente(k):
    return "presente" if os.environ.get(k) else "AUSENTE"


def mercado_livre():
    print("== Mercado Livre")
    print(f"ML_CLIENT_ID: {presente('ML_CLIENT_ID')} · ML_CLIENT_SECRET: {presente('ML_CLIENT_SECRET')}")
    cid, seg = os.environ.get("ML_CLIENT_ID"), os.environ.get("ML_CLIENT_SECRET")
    if not cid or not seg:
        print("❌ sem as chaves: confira os segredos no GitHub (Settings → Secrets and variables → Actions)")
        return
    r = requests.post(f"{ML}/oauth/token", data={"grant_type": "client_credentials", "client_id": cid, "client_secret": seg},
                      headers=UA, timeout=30)
    if r.status_code != 200:
        erro = (r.json() if r.headers.get("content-type", "").startswith("application/json") else {})
        print(f"❌ token recusado: HTTP {r.status_code} {erro.get('error', '')} {erro.get('message', '')}".strip())
        return
    token = r.json()["access_token"]
    print(f"✅ token ok (escopos: {r.json().get('scope', '-')}, vale {r.json().get('expires_in', '?')} s)")
    h = {**UA, "Authorization": f"Bearer {token}"}

    # 2. leitura de produto nas ofertas ligadas pelo Compara Jogos
    ofertas = json.loads((ROOT / "conteudo" / "black" / "ofertas.json").read_text(encoding="utf-8"))
    ids = []
    for of in ofertas.values():
        for o in of.get("ofertas", []):
            m = apis.ML_PROD.search(o.get("url") or "")
            if m and m.group(1) not in ids:
                ids.append(m.group(1))
    print(f"ofertas do Compara Jogos ligadas ao Mercado Livre: {len(ids)} produtos")
    codigos, oficiais, lideres, com_preco = {}, 0, 0, 0
    reputacao = {}
    for pid in ids[:40]:
        rr = requests.get(f"{ML}/products/{pid}", headers=h, timeout=30)
        codigos[rr.status_code] = codigos.get(rr.status_code, 0) + 1
        time.sleep(0.4)
        if rr.status_code != 200:
            continue
        bb = rr.json().get("buy_box_winner") or {}
        if bb.get("price"):
            com_preco += 1
        if bb.get("official_store_id"):
            oficiais += 1
        v = bb.get("seller_id")
        if v and v not in reputacao:
            u = requests.get(f"{ML}/users/{v}", headers=h, timeout=30)
            reputacao[v] = ((u.json().get("seller_reputation") or {}).get("power_seller_status")) if u.ok else None
            time.sleep(0.4)
        if reputacao.get(v) in apis.LIDER:
            lideres += 1
    print(f"leitura de produto (amostra de {min(40, len(ids))}): respostas {codigos}; com preço no buy box: {com_preco}; "
          f"loja oficial: {oficiais}; MercadoLíder: {lideres}")

    # 3. busca: ofertas que o Compara Jogos não traz
    termos = ["jogo de tabuleiro", "board game", "jogo de cartas galapagos", "jogo de tabuleiro devir", "jogo de tabuleiro meeple br"]
    achadas = {}
    for t in termos:
        rr = requests.get(f"{ML}/sites/MLB/search", params={"q": t, "limit": 50, "condition": "new"}, headers=h, timeout=30)
        time.sleep(0.5)
        if rr.status_code != 200:
            print(f"busca '{t}': HTTP {rr.status_code} {rr.text[:160]}")
            continue
        res = rr.json().get("results", [])
        for it in res:
            preco, orig = it.get("price"), it.get("original_price")
            if not preco or not orig or orig <= preco:
                continue
            oficial = bool(it.get("official_store_id"))
            lider = ((it.get("seller") or {}).get("seller_reputation") or {}).get("power_seller_status") in apis.LIDER
            if oficial or lider:
                achadas[it["id"]] = (round(1 - preco / orig, 2), it.get("title", "")[:70], preco)
        print(f"busca '{t}': HTTP 200, {len(res)} anúncios")
    fortes = sorted((v for v in achadas.values() if v[0] >= 0.20), reverse=True)
    print(f"anúncios com preço riscado de loja oficial ou MercadoLíder: {len(achadas)}; com 20% ou mais (pelo preço riscado, "
          f"ainda sem conferir a média real): {len(fortes)}")
    for d, t, p in fortes[:10]:
        print(f"   −{d * 100:.0f}% R$ {p:.2f} {t}")


if __name__ == "__main__":
    mercado_livre()
