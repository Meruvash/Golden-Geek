"""Auditoria de links do site: confere que cada link de oferta leva direto à página do produto certo.

Pedido do usuário em 04/11/2026: "auditoria de links, confirmando que todos os links do site estão indo direto para
as ofertas de verdade" (caso que motivou: links da Bravo Jogos no /black/ caíam na página inicial da loja).

Uso:
  python3 tools/auditoria_links.py                # audita e grava conteudo/auditoria_links.json e .md
  python3 tools/auditoria_links.py --so-black     # só os links do /black/
  python3 tools/auditoria_links.py --sem-rede     # só as checagens que não pedem página (intermediário, rastreio)
  python3 tools/auditoria_links.py --nao-falhar   # sai com código 0 mesmo com ERRO em oferta do /black/

O que é auditado (em ordem de prioridade):
  oferta          botões e fotos dos cartões do /black/ (classes of-btn e of-img) e os links de "Mais lojas";
  achado          "Ver na loja" dos achados da comunidade no /black/ (link da loja postado no canal);
  cupom           "Ver na loja" dos cupons do /black/ (pode ser a página inicial da loja: o cupom vale para a loja);
  loja            links para lojas nas resenhas, guias e notícias (o domínio é de loja que o radar conhece);
  preço           links para a página do jogo no Compara Jogos (referência de preço, não oferta);
  outro           demais links externos (redes, fontes, editoras): só contados, não abertos.

Regras de educação (nunca mudar): User-Agent próprio e fixo, no máximo 1 pedido a cada 2 s por domínio, robots.txt
respeitado (protego). Domínio que proíbe, ou que responde 401/403/429, fica "não verificável". Sem proxy próprio,
sem trocar User-Agent, sem contornar bloqueio.

Marca ERRO: 404/410; redirecionamento para a página inicial, categoria ou busca; link que é a raiz do site; página sem
sinal de produto (JSON-LD Product/Offer, og:type product, ou preço e botão de compra); página de outro jogo (nome do
cartão contra o título da página); link por intermediário (Compara Jogos, encurtadores, t.me); parâmetro de afiliado
ou rastreio (tag=, ref=, utm_*, afiliado...).

Os links de oferta com ERRO saem do /black/ na próxima geração da página (tools/black/radar.py lê o relatório), e a
auditoria seguinte volta a conferir esses links até eles ficarem certos.
Sai com código 1 se houver ERRO em link de oferta que está no /black/ (o GitHub avisa o dono por e-mail).
"""
import argparse
import datetime as dt
import json
import re
import sys
import threading
import time
import unicodedata
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import parse_qsl, urljoin, urlsplit
from zoneinfo import ZoneInfo

import requests
from bs4 import BeautifulSoup
from protego import Protego

ROOT = Path(__file__).resolve().parent.parent
SAIDA_JSON = ROOT / "conteudo" / "auditoria_links.json"
SAIDA_MD = ROOT / "conteudo" / "auditoria_links.md"
OFERTAS = ROOT / "conteudo" / "black" / "ofertas.json"
UA = "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br/black/robo/)"
PAUSA = 2.0
BR = ZoneInfo("America/Sao_Paulo")
FORA = {".git", ".cache", "tools", "modelos", "marca", "lotes", "fontes", "triagem", ".claude", ".impeccable", "node_modules"}
PROPRIO = re.compile(r"(^|\.)eliteboardgamers\.com\.br$")

OK, ERRO, NV = "ok", "ERRO", "não verificável"
CAT_OFERTA = ("oferta", "oferta (mais lojas)")

INTERMEDIARIO = re.compile(
    r"(^|\.)(comparajogos\.com\.br|amzn\.to|a\.co|link\.amazon|amzlink\.to|amzlinks\.com|meli\.la|bit\.ly|tinyurl\.com|"
    r"cutt\.ly|t\.me|telegram\.me|s\.click\.aliexpress\.com|shope\.ee|tidd\.ly|lmd\.ink|onelink\.me|ccnl\.app|is\.gd|"
    r"ow\.ly|buff\.ly|rebrand\.ly|rb\.gy|shorturl\.at|t\.co|goo\.gl|l\.ead\.me|encurtador\.com\.br|compre\.vc|"
    r"promobit\.com\.br|pelando\.com\.br|linktr\.ee|lnk\.bio|hotm\.art|go\.hotmart\.com|clk\.[a-z.]+|tracking\.[a-z.]+)$", re.I)
RASTREIO = re.compile(r"^(utm_.*|tag|ref|ref_|linkcode|ascsubtag|afil.*|affil.*|aff|aff_.*|partner.*|parceiro.*|"
                      r"matt_.*|fbclid|gclid|clickid|click_id|campaign|cupom_afiliado|sca_.*|mkt_.*)$", re.I)
BUSCA = re.compile(r"(/busca|/search|/pesquisa|/procura|/catalogsearch|/categoria|/categorias|/category|/categories|"
                   r"/departamento|/colecao|/colecoes|/loja/?$|/produtos/?$|/jogos/?$|/collections/[^/]+/?$|/c/|/s\?)", re.I)
BUSCA_Q = re.compile(r"^(q|s|busca|search|query|termo|k|keyword)$", re.I)
COMPRA = re.compile(r"(comprar|adicionar (ao|à|a) (carrinho|sacola)|add to cart|buy now|colocar no carrinho|"
                    r"esgotado|avise-me|indispon[ií]vel|pr[eé]-venda)", re.I)
PRECO = re.compile(r"R\$\s?\d")
CAPTCHA = re.compile(r"(captcha|robot check|are you a human|digite os caracteres|cf-chl|challenge-platform)", re.I)
VAZIAS = {"jogo", "jogos", "de", "da", "do", "das", "dos", "e", "o", "a", "os", "as", "em", "no", "na", "the", "of",
          "and", "board", "game", "games", "tabuleiro", "card", "cartas", "edicao", "edition", "expansao", "expansion",
          "nacional", "pt", "br", "ptbr", "portugues", "galapagos", "devir", "meeple", "grok", "conclave", "papergames",
          "2a", "2nd", "ed", "versao", "deluxe", "kickstarter", "com", "para", "um", "uma", "box", "base", "novo"}


def agora():
    return dt.datetime.now(BR)


def norm(t):
    t = unicodedata.normalize("NFKD", str(t or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", t).strip()


def fichas(t):
    t = re.sub(r"\((19|20)\d\d\)", " ", str(t or ""))  # ano entre parênteses no nome do BGG: "A.E.R.O (2023)"
    return [w for w in norm(t).split() if w not in VAZIAS and (len(w) >= 3 or w.isdigit())]


# ----------------------------------------------------------------------------------------------- coleta dos links

def paginas():
    for p in sorted(ROOT.rglob("index.html")):
        rel = p.relative_to(ROOT)
        if rel.parts and rel.parts[0] in FORA:
            continue
        if any(x.startswith(".") for x in rel.parts):
            continue
        yield p, "/" + str(rel.parent).replace(".", "").strip("/") + ("/" if str(rel.parent) != "." else "")


def titulos_anuncio():
    """Link da loja → título do anúncio que a loja informou ao Compara Jogos (o nome do cartão pode estar em inglês
    e a loja em português: "Fantastic Factories: Subterfuge" e "Fábricas Fantásticas: Artimanhas")."""
    t = defaultdict(set)
    try:
        for slug, of in json.loads(OFERTAS.read_text(encoding="utf-8")).items():
            for o in of.get("ofertas", []):
                u = o.get("url") or ""
                if u:
                    for chave in (u, u.split("?")[0]):
                        if o.get("titulo"):
                            t[chave].add(o["titulo"])
                        t[chave].add(slug.replace("-", " "))
    except (FileNotFoundError, ValueError):
        pass
    return t


def dominios_loja():
    """Domínios de loja: os das ofertas que o radar conhece (Compara Jogos lista as lojas) e os da página /black/."""
    doms = set()
    try:
        for of in json.loads(OFERTAS.read_text(encoding="utf-8")).values():
            for o in of.get("ofertas", []):
                d = urlsplit(o.get("url") or "").netloc.lower()
                if d and not INTERMEDIARIO.search(d):
                    doms.add(d.removeprefix("www."))
    except (FileNotFoundError, ValueError):
        pass
    return doms


def coletar(so_black=False):
    """{url: registro} com todas as páginas onde o link aparece e a categoria mais importante."""
    lojas = dominios_loja()
    regs = {}
    contagem = Counter()
    prio = {c: i for i, c in enumerate(("oferta", "oferta (mais lojas)", "achado", "cupom", "loja", "preço", "outro"))}

    def junta(url, pagina, cat, jogo=None, loja=None):
        r = regs.setdefault(url, {"url": url, "categoria": cat, "paginas": [], "jogo": jogo, "loja": loja})
        if pagina not in r["paginas"]:
            r["paginas"].append(pagina)
        if prio[cat] < prio[r["categoria"]]:
            r.update(categoria=cat, jogo=jogo or r["jogo"], loja=loja or r["loja"])
        r["jogo"] = r["jogo"] or jogo
        r["loja"] = r["loja"] or loja

    for arq, pagina in paginas():
        if so_black and pagina != "/black/":
            continue
        s = BeautifulSoup(arq.read_text(encoding="utf-8", errors="replace"), "lxml")
        for a in s.select("a[href]"):
            url = a["href"].strip()
            if not url.startswith(("http://", "https://")):
                continue
            dom = urlsplit(url).netloc.lower()
            if PROPRIO.search(dom):
                continue
            contagem[pagina] += 1
            cls = set(a.get("class") or [])
            cartao = a.find_parent("li", class_="of")
            cup = a.find_parent("li", class_="cup-c")
            if pagina == "/black/" and cartao is not None and ({"of-btn", "of-img"} & cls or a.find_parent("details", class_="of-mais")):
                h3 = cartao.select_one(".of-n")
                jogo = h3.get_text(" ", strip=True) if h3 else None
                if {"of-btn", "of-img"} & cls:
                    b = cartao.select_one(".of-loja b")
                    junta(url, pagina, "oferta", jogo, b.get_text(strip=True) if b else None)
                else:
                    sp = a.find_previous_sibling("span")
                    loja = sp.get_text(" ", strip=True).split(":")[0] if sp else None
                    junta(url, pagina, "oferta (mais lojas)", jogo, loja)
            elif pagina == "/black/" and cup is not None and a.get_text(strip=True).startswith("Ver na loja"):
                tem_preco = cup.select_one(".of-p") is not None
                nome = cup.select_one(".cup-loja")
                junta(url, pagina, "achado" if tem_preco else "cupom", None, nome.get_text(" ", strip=True) if nome and not tem_preco else None)
            elif "comparajogos.com.br" in dom and "/item/" in url and pagina != "/black/":
                junta(url, pagina, "preço")
            elif dom.removeprefix("www.") in lojas and pagina != "/black/":
                junta(url, pagina, "loja")
            else:
                junta(url, pagina, "outro")
    return regs, contagem


# ----------------------------------------------------------------------------------------------- checagens

def estaticas(r):
    """Checagens sem abrir a página: intermediário e rastreio. Devolve o motivo do ERRO ou None."""
    u = urlsplit(r["url"])
    if INTERMEDIARIO.search(u.netloc.lower()) and r["categoria"] != "preço":  # Compara Jogos é a própria referência
        return f"passa por intermediário ({u.netloc})"
    ruins = [k for k, _ in parse_qsl(u.query, keep_blank_values=True) if RASTREIO.match(k)]
    if ruins:
        return "parâmetro de afiliado ou rastreio (" + ", ".join(sorted(set(ruins))) + ")"
    return None


class Dominio:
    """Fila educada por domínio: 1 pedido a cada PAUSA segundos e robots.txt lido uma vez."""

    def __init__(self, sessao, dom, esquema):
        self.s, self.dom, self.esquema = sessao, dom, esquema
        self.ultimo = 0.0
        self.robots = None
        self.robots_nv = None  # motivo de não verificável vindo do robots.txt
        self.trava = threading.RLock()  # redirecionamento de outro domínio também espera a vez

    def pedir(self, url):
        with self.trava:
            espera = self.ultimo + PAUSA - time.monotonic()
            if espera > 0:
                time.sleep(espera)
            try:
                return self.s.get(url, timeout=25, allow_redirects=False)
            finally:
                self.ultimo = time.monotonic()

    def ler_robots(self):
        with self.trava:
            self._ler_robots()

    def _ler_robots(self):
        if self.robots is not None or self.robots_nv:
            return
        try:
            r = self.pedir(f"{self.esquema}://{self.dom}/robots.txt")
            if r.status_code in (301, 302, 303, 307, 308):  # robots.txt redirecionado (ex.: http→https): segue uma vez
                destino = urljoin(r.url, r.headers.get("location", ""))
                if urlsplit(destino).netloc.lower() == self.dom:
                    r = self.pedir(destino)
        except requests.RequestException as ex:
            self.robots_nv = f"robots.txt não respondeu ({ex.__class__.__name__})"
            return
        if r.status_code in (401, 403):
            self.robots_nv = f"robots.txt respondeu {r.status_code} (bloqueio)"
        elif r.status_code == 429 or r.status_code >= 500:
            self.robots_nv = f"robots.txt respondeu {r.status_code}"
        elif r.status_code == 200:
            self.robots = Protego.parse(r.text)
        else:  # 404 e afins: sem regras, tudo permitido
            self.robots = Protego.parse("")

    def pode(self, url):
        self.ler_robots()
        if self.robots_nv:
            return False, self.robots_nv
        if not self.robots.can_fetch(url, UA):
            return False, "robots.txt proíbe robôs nesta página"
        return True, None


_DOMS = {}
_TITULOS = titulos_anuncio()
_TRAVA = threading.Lock()


def dominio(sessao, url):
    u = urlsplit(url)
    k = (u.scheme, u.netloc.lower())
    with _TRAVA:
        if k not in _DOMS:
            _DOMS[k] = Dominio(sessao, k[1], k[0])
        return _DOMS[k]


def raiz(u):
    return u.path in ("", "/") and not u.query


def eh_busca(u):
    return bool(BUSCA.search(u.path + ("?" + u.query if u.query else ""))) or any(BUSCA_Q.match(k) for k, _ in parse_qsl(u.query))


def ld_tipos(s):
    tipos, nomes = set(), []

    def anda(x):
        if isinstance(x, list):
            for y in x:
                anda(y)
        elif isinstance(x, dict):
            t = x.get("@type")
            for tt in (t if isinstance(t, list) else [t]):
                if isinstance(tt, str):
                    tipos.add(tt.lower())
                    if tt.lower() in ("product", "productgroup", "individualproduct") and x.get("name"):
                        nomes.append(str(x["name"]))
            for k in ("@graph", "offers", "mainEntity", "itemOffered", "hasVariant"):
                if k in x:
                    anda(x[k])
    for sc in s.select('script[type="application/ld+json"]'):
        try:
            anda(json.loads(sc.string or sc.get_text() or "null"))
        except ValueError:
            continue
    return tipos, nomes


def sinais(html):
    """Sinal de produto e textos de título da página."""
    s = BeautifulSoup(html, "lxml")
    tipos, nomes = ld_tipos(s)
    og = (s.find("meta", property="og:type") or {}).get("content", "") if s.find("meta", property="og:type") else ""
    prod = bool({"product", "productgroup", "individualproduct", "offer", "aggregateoffer"} & tipos) or "product" in og.lower()
    prod = prod or bool(s.find("meta", property=re.compile(r"^(product|og):price:amount$")))
    prod = prod or bool(s.find(attrs={"itemtype": re.compile(r"schema\.org/(Product|Offer)", re.I)}))
    texto = s.get_text(" ", strip=True)[:200000]
    if not prod and PRECO.search(texto) and (COMPRA.search(texto) or s.find(attrs={"name": "add-to-cart"})):
        prod = True
    titulos = [s.title.get_text(" ", strip=True) if s.title else ""]
    for sel in ('meta[property="og:title"]', 'meta[name="twitter:title"]'):
        m = s.select_one(sel)
        if m and m.get("content"):
            titulos.append(m["content"])
    for h in s.select("h1")[:3]:
        titulos.append(h.get_text(" ", strip=True))
    titulos += nomes
    return prod, " | ".join(t for t in titulos if t), bool(CAPTCHA.search(html[:50000])) and not prod


def mesmo_jogo(jogo, titulo):
    """O título da página fala do jogo do cartão? 60% ou mais das palavras do nome têm de aparecer."""
    alvo = fichas(jogo)
    compacto = re.sub(r"[^a-z0-9]", "", norm(re.sub(r"\((19|20)\d\d\)", " ", str(jogo or ""))))
    if not alvo or (len(compacto) >= 4 and compacto in norm(titulo).replace(" ", "")):
        return True
    tem = set(norm(titulo).split())
    junto = norm(titulo).replace(" ", "")
    achou = sum(1 for w in alvo if w in tem or (len(w) >= 5 and w in junto))
    return achou / len(alvo) >= 0.6  # "Ark Nova: Marine Worlds" contra a página do Ark Nova base não passa


def verificar(sessao, r):
    """Abre o link com educação e devolve (status, motivo, http, url_final)."""
    motivo = estaticas(r)
    if motivo:
        return ERRO, motivo, None, None
    url, saltos = r["url"], []
    origem = urlsplit(url)
    if raiz(origem) and r["categoria"] not in ("cupom",):
        return ERRO, "link é a página inicial da loja, não a do produto", None, None
    if eh_busca(origem) and r["categoria"] in CAT_OFERTA + ("achado", "loja"):
        return ERRO, "link é de busca ou categoria, não da página do produto", None, None
    resp = None
    for _ in range(6):
        d = dominio(sessao, url)
        ok, por_que = d.pode(url)
        if not ok:
            return NV, por_que, None, url
        try:
            resp = d.pedir(url)
        except requests.RequestException as ex:
            return NV, f"sem resposta ({ex.__class__.__name__})", None, url
        if resp.status_code in (301, 302, 303, 307, 308) and resp.headers.get("location"):
            url = urljoin(url, resp.headers["location"])
            saltos.append(url)
            continue
        break
    else:
        return NV, "redirecionamentos demais", None, url
    st, final = resp.status_code, urlsplit(url)
    if st in (401, 403, 429):
        return NV, f"a loja bloqueia robôs ({st})", st, url
    if st in (404, 410):
        return ERRO, f"página não existe ({st})", st, url
    if st >= 500:
        return NV, f"loja fora do ar ({st})", st, url
    if st != 200:
        return NV, f"resposta {st}", st, url
    if r["categoria"] == "cupom":
        return OK, "loja responde (cupom vale para a loja)", st, url
    if saltos and raiz(final):
        return ERRO, "redireciona para a página inicial da loja", st, url
    if saltos and eh_busca(final) and not eh_busca(origem):
        return ERRO, "redireciona para busca ou categoria", st, url
    tipo = resp.headers.get("content-type", "")
    if "html" not in tipo:
        return NV, f"não é página HTML ({tipo or 'sem tipo'})", st, url
    html = resp.text[:3_000_000]
    if r["categoria"] == "preço":
        return OK, "página do jogo no Compara Jogos responde", st, url
    prod, titulo, captcha = sinais(html)
    if captcha:
        return NV, "a loja pede verificação anti-robô (captcha)", st, url
    if not prod:
        return ERRO, "página sem sinal de produto (sem JSON-LD Product/Offer, og:type product nem preço e botão de compra)", st, url
    nomes = [r["jogo"]] + sorted(_TITULOS.get(r["url"], set()) | _TITULOS.get(r["url"].split("?")[0], set())) if r.get("jogo") else []
    if nomes and not any(mesmo_jogo(n, titulo) for n in nomes):
        return ERRO, f"página de outro jogo (cartão: “{r['jogo']}”; página: “{titulo[:120]}”)", st, url
    return OK, "página do produto" + (" (com redirecionamento dentro da loja)" if saltos else ""), st, url


# ----------------------------------------------------------------------------------------------- relatório

def anterior():
    try:
        return json.loads(SAIDA_JSON.read_text(encoding="utf-8"))
    except (FileNotFoundError, ValueError):
        return {}


def rodar(so_black=False, sem_rede=False):
    regs, contagem = coletar(so_black)
    # ofertas que a auditoria anterior achou com ERRO e que já saíram do /black/: confere de novo, para o radar
    # saber quando elas voltam a estar certas (sem isso, a oferta entra e sai do site a cada rodada)
    for v in anterior().get("links", []):
        if v.get("categoria") in CAT_OFERTA and v.get("status") == ERRO and v["url"] not in regs:
            regs[v["url"]] = {**{k: v.get(k) for k in ("url", "categoria", "jogo", "loja")},
                              "paginas": ["(fora do site: retirada do /black/ pela auditoria)"]}
    sessao = requests.Session()
    sessao.headers.update({"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
                           "Accept-Language": "pt-BR,pt;q=0.9"})
    alvo = [r for r in regs.values() if r["categoria"] != "outro"]
    for r in regs.values():
        if r["categoria"] == "outro":
            r.update(status="não conferido", motivo="link que não é de oferta nem de loja (fonte, rede social, editora)")
    if sem_rede:
        for r in alvo:
            m = estaticas(r)
            r.update(status=ERRO if m else "não conferido", motivo=m or "auditoria sem rede")
    else:
        por_dom = defaultdict(list)
        for r in alvo:
            por_dom[urlsplit(r["url"]).netloc.lower()].append(r)

        def fila(rs):
            for r in rs:
                st, motivo, http, final = verificar(sessao, r)
                r.update(status=st, motivo=motivo, http=http, url_final=final)
                print(f"{st:16} {r['categoria']:20} {r['url'][:90]}  {motivo}", flush=True)
        with ThreadPoolExecutor(max_workers=24) as ex:
            list(ex.map(fila, por_dom.values()))
    links = sorted(regs.values(), key=lambda r: (r["categoria"] not in CAT_OFERTA, r["status"] != ERRO, r["url"]))
    return {"gerado": agora().isoformat(timespec="minutes"), "user_agent": UA, "links": links,
            "links_por_pagina": dict(sorted(contagem.items()))}


def resumo(rel):
    links = rel["links"]
    por_cat = defaultdict(Counter)
    por_loja = defaultdict(Counter)
    for r in links:
        por_cat[r["categoria"]][r["status"]] += 1
        if r["categoria"] != "outro":
            por_loja[urlsplit(r["url"]).netloc.lower().removeprefix("www.")][r["status"]] += 1
    no_black = [r for r in links if r["categoria"] in CAT_OFERTA and "/black/" in r["paginas"]]
    return por_cat, por_loja, no_black


def gravar_md(rel):
    por_cat, por_loja, no_black = resumo(rel)
    erros_black = [r for r in no_black if r["status"] == ERRO]
    L = [f"# Auditoria de links — {rel['gerado']}", "",
         "Gerado por `tools/auditoria_links.py` (robô com User-Agent próprio, 1 pedido a cada 2 s por domínio, "
         "robots.txt respeitado). Links de oferta com ERRO saem do /black/ na próxima geração da página.", "",
         f"**Ofertas no /black/:** {len(no_black)} links, {sum(r['status'] == OK for r in no_black)} certos, "
         f"{len(erros_black)} com erro, {sum(r['status'] == NV for r in no_black)} não verificáveis.", "",
         "## Por tipo de link", "", "| Tipo | ok | ERRO | não verificável | não conferido |", "|---|---|---|---|---|"]
    for c in ("oferta", "oferta (mais lojas)", "achado", "cupom", "loja", "preço", "outro"):
        if c in por_cat:
            k = por_cat[c]
            L.append(f"| {c} | {k[OK]} | {k[ERRO]} | {k[NV]} | {k['não conferido']} |")
    L += ["", "## Por loja (links conferidos)", "", "| Domínio | ok | ERRO | não verificável |", "|---|---|---|---|"]
    for d, k in sorted(por_loja.items(), key=lambda kv: (-sum(kv[1].values()), kv[0])):
        L.append(f"| {d} | {k[OK]} | {k[ERRO]} | {k[NV]} |")
    for titulo, filtro in (("Erros", lambda r: r["status"] == ERRO), ("Não verificáveis", lambda r: r["status"] == NV)):
        rs = [r for r in rel["links"] if filtro(r)]
        L += ["", f"## {titulo} ({len(rs)})", ""]
        if not rs:
            L.append("Nenhum.")
        for r in rs:
            onde = ", ".join(r["paginas"][:3]) + (f" e mais {len(r['paginas']) - 3}" if len(r["paginas"]) > 3 else "")
            jogo = f" — {r['jogo']}" if r.get("jogo") else ""
            L.append(f"- **{r['categoria']}**{jogo}: <{r['url']}> ({onde}) — {r['motivo']}")
    SAIDA_MD.write_text("\n".join(L) + "\n", encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--so-black", action="store_true")
    ap.add_argument("--sem-rede", action="store_true")
    ap.add_argument("--nao-falhar", action="store_true")
    a = ap.parse_args()
    rel = rodar(a.so_black, a.sem_rede)
    SAIDA_JSON.write_text(json.dumps(rel, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    gravar_md(rel)
    por_cat, por_loja, no_black = resumo(rel)
    erros = [r for r in no_black if r["status"] == ERRO]
    print(f"\nofertas no /black/: {len(no_black)} | ok {sum(r['status'] == OK for r in no_black)} | "
          f"ERRO {len(erros)} | não verificáveis {sum(r['status'] == NV for r in no_black)}")
    for r in erros:
        print(f"ERRO {r['jogo']} — {r['url']}: {r['motivo']}")
    if erros and not a.nao_falhar:
        sys.exit(1)


if __name__ == "__main__":
    main()
