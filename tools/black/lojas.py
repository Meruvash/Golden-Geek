"""Leitura direta das páginas das lojas para o Radar Black de Verdade.

Para cada oferta candidata (perto ou acima do corte de 20%), o radar abre a página do produto na própria loja
e lê o preço e o estoque que a loja declara nos dados estruturados da página (schema.org Product/Offer, que
Nuvemshop, Tray, WooCommerce, VTEX e Shopify publicam), ou nas metas product:price:amount.

Regras: respeita o robots.txt de cada loja para o nosso robô E para os robôs da Anthropic (se qualquer um for
proibido, não lê); 401, 403 ou 429 deixa a loja 48 horas sem visita (depois, uma tentativa só); no máximo uma página
a cada 6 segundos e LIMITE_DIA páginas por dia por loja; o preço lido é reaproveitado por 12 horas enquanto o preço
informado ao Compara Jogos não muda. O robô se identifica e aponta para eliteboardgamers.com.br/black/robo/. Nunca troca o User-Agent nem contorna bloqueio. Amazon, Mercado Livre, Magalu, Americanas e
Casas Bahia não são lidos (robots.txt proíbe ou o site bloqueia; e não dá para conferir o vendedor).
"""
import datetime as dt
import json
import re
import time
from pathlib import Path
from price_parser import Price
from protego import Protego  # robots.txt pela RFC 9309 (com * e $), da Zyte: o urllib do Python não entende curingas
from urllib.parse import urlparse

import requests

UA = "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br/black/robo/)"
AGENTES = ("EliteBoardgamers", "ClaudeBot", "Claude-User")
PAUSA_LOJA = 6.0
LIMITE_DIA = 60          # páginas por loja por dia, somando todas as leituras
LIMITE_ESPECIAL = {"www.promobit.com.br": 400, "t.me": 400}  # agregador grande: ~12 páginas por leitura, de hora em hora
DESCANSO = dt.timedelta(hours=48)
REUSO = dt.timedelta(hours=12)
ESTADO = Path(__file__).resolve().parents[2] / "conteudo" / "black" / "lojas_estado.json"
NUNCA = re.compile(r"amazon\.|mercadolivre|mercadolibre|magazineluiza|magalu|americanas|casasbahia|shopee|aliexpress", re.I)

_sessao = requests.Session()
_sessao.headers.update({"User-Agent": UA})
_robots, _ultimo, _bloqueadas = {}, {}, set()


def _carregar():
    try:
        return json.loads(ESTADO.read_text(encoding="utf-8"))
    except (FileNotFoundError, ValueError):
        return {"lojas": {}, "precos": {}}


_estado = _carregar()


def salvar():
    """Grava contadores, descansos e preços lidos, somando com o que o outro robô gravou enquanto este lia."""
    import fcntl
    agora = dt.datetime.now(dt.timezone.utc)
    with open(ESTADO.parent / ".dados_trava", "w") as trava:
        fcntl.flock(trava, fcntl.LOCK_EX)
        disco = _carregar()
        for dom, l in _estado["lojas"].items():
            d = disco["lojas"].setdefault(dom, {})
            if d.get("dia") == l.get("dia"):
                d["paginas"] = max(d.get("paginas", 0), l.get("paginas", 0))
            elif l.get("dia", "") > d.get("dia", ""):
                d.update({"dia": l["dia"], "paginas": l.get("paginas", 0)})
            if l.get("descanso_ate", "") > d.get("descanso_ate", ""):
                d.update({"descanso_ate": l["descanso_ate"], "motivo": l.get("motivo")})
        for u, v in _estado["precos"].items():
            if v.get("hora", "") >= disco["precos"].get(u, {}).get("hora", ""):
                disco["precos"][u] = v
        corte = (agora - REUSO * 4).isoformat()
        disco["precos"] = {u: v for u, v in disco["precos"].items() if v.get("hora", "") >= corte}
        ESTADO.write_text(json.dumps(disco, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")


def _loja(dom):
    hoje = dt.date.today().isoformat()
    l = _estado["lojas"].setdefault(dom, {})
    if l.get("dia") != hoje:
        l.update({"dia": hoje, "paginas": 0})
    return l


def _bloquear(dom, motivo):
    _bloqueadas.add(dom)
    _loja(dom).update({"descanso_ate": (dt.datetime.now(dt.timezone.utc) + DESCANSO).isoformat(timespec="minutes"), "motivo": motivo})


MODO = "educado"


def modo(nome):
    """'educado': 6 s entre páginas, 60 páginas por dia por loja, 48 h de descanso após bloqueio, reaproveita leituras.
    'normal' (o ritmo do primeiro robô, pedido do usuário em 03/11/2026): 2 s entre páginas, sem limite diário e sem
    reaproveitar leituras; um bloqueio vale só até o fim da leitura. Nos dois modos o robô respeita o robots.txt,
    se identifica com o mesmo nome e para de visitar a loja que bloqueou."""
    global MODO, PAUSA_LOJA
    MODO = nome
    PAUSA_LOJA = 2.0 if nome == "normal" else 6.0
    print(f"-- robô de conferência no modo {nome}")


def em_descanso(dom):
    if MODO == "normal":
        return False
    ate = _loja(dom).get("descanso_ate")
    return bool(ate and ate > dt.datetime.now(dt.timezone.utc).isoformat())


def _pode(url):
    dom = urlparse(url).netloc.lower()
    if NUNCA.search(dom) or dom in _bloqueadas or em_descanso(dom):
        return False
    if MODO == "educado" and _loja(dom)["paginas"] >= LIMITE_ESPECIAL.get(dom, LIMITE_DIA):
        return False
    if dom not in _robots:
        try:
            r = _sessao.get(f"https://{dom}/robots.txt", timeout=20)
            if r.status_code in (401, 403, 429):
                _bloquear(dom, f"robots.txt respondeu {r.status_code}")
                return False
            _robots[dom] = Protego.parse(r.text if r.status_code == 200 else "")
        except requests.RequestException:
            _bloqueadas.add(dom)
            return False
    return all(_robots[dom].can_fetch(url, a) for a in AGENTES)


def _numero(v):
    """Preço em número a partir de 199.9, "199,90", "R$ 1.299,90" ou "1,299.90" (price-parser, da Zyte)."""
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip()
    if re.fullmatch(r"\d+(\.\d+)?", s):  # número de máquina, como o JSON-LD costuma trazer
        return float(s)
    p = Price.fromstring(s, decimal_separator="," if re.search(r",\d{1,2}$", s) else None)
    return float(p.amount) if p.amount is not None else None


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
    acima) é tratada como erro de leitura, não como preço. Se a mesma página foi lida há menos de 12 horas e o preço
    informado ao Compara Jogos não mudou, devolve a leitura anterior sem visitar a loja de novo."""
    if not url:
        return None
    antes = _estado["precos"].get(url)
    agora = dt.datetime.now(dt.timezone.utc)
    if MODO == "educado" and antes and antes.get("cj") == esperado and antes.get("hora", "") >= (agora - REUSO).isoformat():
        return {"preco": antes["preco"], "estoque": antes["estoque"], "reaproveitado": True}
    h = pagina(url)
    if h is None:
        return None
    preco, estoque = _ler_pagina(h, url)
    if preco is None or (esperado and not (esperado * 0.5 <= preco <= esperado * 1.6)):
        return None
    _estado["precos"][url] = {"preco": preco, "estoque": estoque, "cj": esperado, "hora": agora.isoformat(timespec="minutes")}
    return {"preco": preco, "estoque": estoque}


def permitido(url):
    """O robots.txt da loja permite este endereço para o nosso robô e para os da Anthropic?"""
    return _pode(url)


def pagina(url, bloquear=True):
    """HTML de uma página da loja, respeitando robots.txt e a pausa por loja; None se não pôde ou falhou.
    `bloquear=False` para sondagens (ex.: testar se a loja tem catálogo público): um 403 ali quer dizer "esse
    endereço não existe para você", não "a loja bloqueou o robô", e não põe a loja em descanso."""
    if not _pode(url):
        return None
    dom = urlparse(url).netloc.lower()
    espera = PAUSA_LOJA - (time.time() - _ultimo.get(dom, 0))
    if espera > 0:
        time.sleep(espera)
    if MODO == "educado":
        _loja(dom)["paginas"] += 1  # a cota diária é só do robô educado: o normal não gasta a cota dele
    try:
        r = _sessao.get(url, timeout=30)
    except requests.RequestException:
        return None
    finally:
        _ultimo[dom] = time.time()
    if r.status_code in (401, 403, 429) and (bloquear or r.status_code == 429):
        _bloquear(dom, f"página respondeu {r.status_code}")
        return None
    return r.text if r.status_code == 200 else None


def bloqueadas():
    return sorted(_bloqueadas | {d for d in _estado["lojas"] if em_descanso(d)})
