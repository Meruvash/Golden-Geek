"""Leitura direta das páginas das lojas para o Radar Black de Verdade.

Para cada oferta candidata (perto ou acima do corte de 20%), o radar abre a página do produto na própria loja
e lê o preço e o estoque que a loja declara nos dados estruturados da página (schema.org Product/Offer, que
Nuvemshop, Tray, WooCommerce, VTEX e Shopify publicam), ou nas metas product:price:amount.

Regras: respeita o robots.txt de cada loja para o nosso robô E para os robôs da Anthropic (se qualquer um for
proibido, não lê); 401, 403 ou 429 marca a loja como bloqueada até o fim da leitura; no máximo uma página a cada
2 segundos por loja. Nunca troca o User-Agent nem contorna bloqueio. Amazon, Mercado Livre, Magalu, Americanas e
Casas Bahia não são lidos (robots.txt proíbe ou o site bloqueia; e não dá para conferir o vendedor).
"""
import json
import re
import time
import urllib.robotparser as rp
from urllib.parse import urlparse

import requests

UA = "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br)"
AGENTES = ("EliteBoardgamers", "ClaudeBot", "Claude-User")
PAUSA_LOJA = 2.0
NUNCA = re.compile(r"amazon\.|mercadolivre|mercadolibre|magazineluiza|magalu|americanas|casasbahia|shopee|aliexpress", re.I)

_sessao = requests.Session()
_sessao.headers.update({"User-Agent": UA})
_robots, _ultimo, _bloqueadas = {}, {}, set()


def _pode(url):
    dom = urlparse(url).netloc.lower()
    if NUNCA.search(dom) or dom in _bloqueadas:
        return False
    if dom not in _robots:
        p = rp.RobotFileParser()
        try:
            r = _sessao.get(f"https://{dom}/robots.txt", timeout=20)
            if r.status_code in (401, 403):
                _bloqueadas.add(dom)
                return False
            p.parse(r.text.splitlines() if r.status_code == 200 else [])
        except requests.RequestException:
            _bloqueadas.add(dom)
            return False
        _robots[dom] = p
    return all(_robots[dom].can_fetch(a, url) for a in AGENTES)


def _numero(v):
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip().replace("R$", "").replace(" ", "")
    if "," in s and "." in s:
        s = s.replace(".", "").replace(",", ".")
    elif "," in s:
        s = s.replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def _produtos(dado):
    """Todos os objetos Product dentro de um bloco JSON-LD (lista, @graph ou objeto)."""
    if isinstance(dado, list):
        for d in dado:
            yield from _produtos(d)
    elif isinstance(dado, dict):
        tipo = dado.get("@type")
        if tipo == "Product" or (isinstance(tipo, list) and "Product" in tipo):
            yield dado
        for k in ("@graph", "mainEntity", "itemListElement"):
            if k in dado:
                yield from _produtos(dado[k])


def _mesma(url_a, url_b):
    a, b = urlparse(url_a or ""), urlparse(url_b or "")
    return a.netloc.lower().removeprefix("www.") == b.netloc.lower().removeprefix("www.") and a.path.rstrip("/") == b.path.rstrip("/")


def _ofertas_ld(p):
    ofs = p.get("offers") or []
    ofs = ofs if isinstance(ofs, list) else [ofs]
    preco, estoque = None, None
    for o in ofs:
        if not isinstance(o, dict):
            continue
        for k in ("price", "lowPrice"):
            n = _numero(o.get(k))
            if n:
                preco = n if preco is None else min(preco, n)
                break
        disp = str(o.get("availability", ""))
        if disp:
            estoque = bool(estoque) or any(x in disp for x in ("InStock", "PreOrder", "LimitedAvailability"))
    return preco, estoque


def _ler_pagina(html, url):
    """Preço e estoque do produto principal da página (ignora produtos relacionados)."""
    prods = []
    for bloco in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S | re.I):
        try:
            prods += list(_produtos(json.loads(bloco.strip())))
        except ValueError:
            continue
    for p in prods:  # 1) o Product cujo endereço é a própria página
        ende = [p.get("url"), p.get("@id"), (p.get("mainEntityOfPage") or {}).get("@id") if isinstance(p.get("mainEntityOfPage"), dict) else p.get("mainEntityOfPage")]
        if any(_mesma(x, url) for x in ende if isinstance(x, str)):
            preco, estoque = _ofertas_ld(p)
            if preco:
                return preco, estoque
    # 2) metas do produto principal (Tray, Nuvemshop, Shopify e outros)
    for padrao in (r'<meta[^>]+itemprop="price"[^>]+content="([^"]+)"', r'<meta[^>]+property="nuvemshop:price"[^>]+content="([^"]+)"',
                   r'<meta[^>]+(?:property|name)="(?:product|og):price:amount"[^>]+content="([^"]+)"'):
        m = re.search(padrao, html, re.I)
        if m and _numero(m.group(1)):
            disp = re.search(r'itemprop="availability"[^>]+(?:content|href)="([^"]+)"', html, re.I)
            estoque = None if not disp else any(x in disp.group(1) for x in ("InStock", "PreOrder", "LimitedAvailability"))
            return _numero(m.group(1)), estoque
    # 3) um único Product na página
    if len(prods) == 1:
        return _ofertas_ld(prods[0])
    return None, None


def conferir(url, esperado=None):
    """Preço e estoque na página da loja. Devolve dict ou None quando não pôde ou não conseguiu ler.

    `esperado` é o preço informado ao Compara Jogos: leitura muito distante dele (menos da metade ou mais de 60%
    acima) é tratada como erro de leitura, não como preço."""
    if not url or not _pode(url):
        return None
    dom = urlparse(url).netloc.lower()
    espera = PAUSA_LOJA - (time.time() - _ultimo.get(dom, 0))
    if espera > 0:
        time.sleep(espera)
    try:
        r = _sessao.get(url, timeout=30)
    except requests.RequestException:
        return None
    finally:
        _ultimo[dom] = time.time()
    if r.status_code in (401, 403, 429):
        _bloqueadas.add(dom)
        return None
    if r.status_code != 200:
        return None
    preco, estoque = _ler_pagina(r.text, url)
    if preco is None or (esperado and not (esperado * 0.5 <= preco <= esperado * 1.6)):
        return None
    return {"preco": preco, "estoque": estoque}


def permitido(url):
    """O robots.txt da loja permite este endereço para o nosso robô e para os da Anthropic?"""
    return _pode(url)


def pagina(url):
    """HTML de uma página da loja, respeitando robots.txt e a pausa por loja; None se não pôde ou falhou."""
    if not _pode(url):
        return None
    dom = urlparse(url).netloc.lower()
    espera = PAUSA_LOJA - (time.time() - _ultimo.get(dom, 0))
    if espera > 0:
        time.sleep(espera)
    try:
        r = _sessao.get(url, timeout=30)
    except requests.RequestException:
        return None
    finally:
        _ultimo[dom] = time.time()
    if r.status_code in (401, 403, 429):
        _bloqueadas.add(dom)
        return None
    return r.text if r.status_code == 200 else None


def bloqueadas():
    return sorted(_bloqueadas)
