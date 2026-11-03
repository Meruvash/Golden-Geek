"""Cupons das lojas para o Radar Black de Verdade.

Uso (chamado pelo radar.py a cada leitura; pode rodar sozinho para teste):
  python3 tools/black/cupons.py ler          # lê os cupons anunciados nas páginas das lojas do radar
  python3 tools/black/cupons.py elegiveis    # lista as lojas onde o teste no carrinho seria permitido pelo robots.txt

Leitura: abre a página inicial (e a de promoções, quando existir) de cada loja que tem oferta no radar e procura
códigos anunciados perto das palavras "cupom" ou "código". Grava o código, o texto da loja e a hora em que foi visto.
Nunca inventa código: só entra o que estava escrito na página.

Teste no carrinho (pedido do usuário em 03/11/2026, com o risco de termos de uso assumido por ele): só em lojas
aprovadas uma a uma pelo usuário (lista TESTE_APROVADAS), cujo robots.txt permite carrinho e checkout para o nosso
robô e para os da Anthropic, e que não exigem login. Ver testar() abaixo.
"""
import datetime as dt
import html as htmllib
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

sys.path.insert(0, str(Path(__file__).resolve().parent))
import lojas  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
ARQ = ROOT / "conteudo" / "black" / "cupons.json"
OFERTAS = ROOT / "conteudo" / "black" / "ofertas.json"
BR = ZoneInfo("America/Sao_Paulo")
VALIDADE = dt.timedelta(hours=36)   # cupom que some da página por mais de 36 h sai da lista

# lojas onde o teste no carrinho foi aprovado pelo usuário (domínio sem www). Vazia até a aprovação.
TESTE_APROVADAS = set()

PALAVRAS = {"CUPOM", "CUPONS", "CODIGO", "CÓDIGO", "FRETE", "GRATIS", "GRÁTIS", "DESCONTO", "COMPRAS", "COMPRA", "ACIMA",
            "PRIMEIRA", "PRODUTOS", "TODOS", "TODO", "SITE", "LOJA", "CARRINHO", "VALIDO", "VÁLIDO", "PEDIDO", "PEDIDOS",
            "BRASIL", "PIX", "BOLETO", "OFF", "APLICAR", "UTILIZE", "USE", "INSIRA", "DIGITE", "COPIAR", "COPIE", "AQUI",
            "HTTPS", "HTTP", "WWW", "COM", "BR", "NOVO", "NOVOS", "JOGOS", "JOGO", "BLACK", "FRIDAY", "SEMANA", "MES", "MÊS"}
CODIGO = re.compile(r"(?i:cupo[mn]s?|c[oó]digo)\s*(?i:de desconto)?\s*[:\-–]?\s*[\"'“”«]?([A-Za-z0-9]{4,20})\b")
VALOR = re.compile(r"(\d{1,2}\s?%|R\$\s?\d+(?:,\d{2})?)")


def agora():
    return dt.datetime.now(BR)


def _texto(h):
    h = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", h, flags=re.S | re.I)
    return re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", " ", h)))


def achar(h):
    """Códigos anunciados numa página, com o trecho de texto em volta."""
    txt = _texto(h)
    achados = {}
    for m in CODIGO.finditer(txt):
        cod = m.group(1)
        # código de cupom vem em maiúsculas na página (BEMVINDO, BLACK15); "Código Secreto" e "cupom: Total" não
        if cod != cod.upper() or cod in PALAVRAS or cod.isdigit() or not re.search(r"[A-Z]", cod):
            continue
        ini, fim = max(0, m.start() - 90), min(len(txt), m.end() + 90)
        trecho = re.sub(r'\s+', ' ', re.sub(r'[\w-]+="?|"', ' ', txt[ini:fim])).strip()
        val = re.search(r"[Vv]alidade:?\s*(\d{2})/(\d{2})/(\d{4})", txt[m.end():m.end() + 160])
        if val:
            try:
                if dt.date(int(val.group(3)), int(val.group(2)), int(val.group(1))) < agora().date():
                    continue  # a própria página diz que venceu
            except ValueError:
                pass
        valor = VALOR.search(trecho)
        achados.setdefault(cod.upper(), {"codigo": cod.upper(), "texto": trecho[:220], "valor": valor.group(1) if valor else None})
    return list(achados.values())


def dominios_do_radar():
    ofertas = json.loads(OFERTAS.read_text(encoding="utf-8")) if OFERTAS.exists() else {}
    doms = {}
    for of in ofertas.values():
        for o in of.get("ofertas", []):
            if o.get("tipo") == "LINK" and o.get("url"):
                d = urlparse(o["url"]).netloc.lower()
                if not lojas.NUNCA.search(d):
                    doms.setdefault(d, o.get("loja") or d)
    return doms


def ler():
    dados = json.loads(ARQ.read_text(encoding="utf-8")) if ARQ.exists() else {}
    hora = agora().isoformat(timespec="minutes")
    lidas = 0
    for dom, loja in sorted(dominios_do_radar().items()):
        reg = dados.setdefault(dom, {"loja": loja, "cupons": {}})
        reg["loja"] = loja
        for caminho in ("/", "/promocoes", "/cupons"):
            url = f"https://{dom}{caminho}"
            h = lojas.pagina(url)
            if h is None:
                continue
            lidas += 1
            reg["lido"] = hora
            for c in achar(h):
                atual = reg["cupons"].setdefault(c["codigo"], {**c, "primeira_vez": hora, "pagina": url})
                atual.update({"texto": c["texto"], "valor": c["valor"], "visto": hora, "pagina": url})
        # tira o que não aparece há mais de VALIDADE
        limite = (agora() - VALIDADE).isoformat(timespec="minutes")
        reg["cupons"] = {k: v for k, v in reg["cupons"].items() if v.get("visto", "") >= limite}
    dados = {d: r for d, r in dados.items() if r["cupons"] or r.get("lido")}
    ARQ.parent.mkdir(parents=True, exist_ok=True)
    ARQ.write_text(json.dumps(dados, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    total = sum(len(r["cupons"]) for r in dados.values())
    print(f"ok cupons: {lidas} páginas lidas, {total} cupons anunciados em {sum(1 for r in dados.values() if r['cupons'])} lojas")
    return dados


CARRINHO = {  # caminhos de carrinho e checkout por plataforma, para conferir no robots.txt
    "woocommerce": ["/wp-json/wc/store/v1/cart", "/wp-json/wc/store/v1/cart/apply-coupon", "/carrinho/", "/checkout/"],
    "nuvemshop": ["/comprar/", "/carrinho/", "/checkout/"],
    "tray": ["/carrinho", "/checkout", "/loja/carrinho.php"],
    "shopify": ["/cart", "/cart/add.js", "/checkout", "/discount/"],
    "vtex": ["/checkout", "/api/checkout/pub/orderForm"],
}


def plataforma(h):
    b = h.lower()
    for nome, sinal in (("shopify", "cdn.shopify"), ("nuvemshop", "nuvemshop"), ("nuvemshop", "tiendanube"), ("woocommerce", "woocommerce"),
                        ("vtex", "vtex"), ("tray", "tray.com.br"), ("tray", "traycdn")):
        if sinal in b:
            return nome
    return None


def elegiveis():
    """Lojas do radar em que o robots.txt permite carrinho e checkout da plataforma (para o usuário aprovar)."""
    saida = []
    for dom, loja in sorted(dominios_do_radar().items()):
        h = lojas.pagina(f"https://{dom}/")
        if h is None:
            saida.append((loja, dom, None, "não deu para ler a loja"))
            continue
        plat = plataforma(h)
        if not plat:
            saida.append((loja, dom, None, "plataforma não identificada"))
            continue
        proibidos = [c for c in CARRINHO[plat] if not lojas.permitido(f"https://{dom}{c}")]
        saida.append((loja, dom, plat, "robots.txt permite carrinho e checkout" if not proibidos else f"robots.txt proíbe {', '.join(proibidos)}"))
    for loja, dom, plat, nota in saida:
        print(f"{'OK ' if nota.startswith('robots.txt permite') else '-- '}{loja} ({dom}) · {plat or '?'} · {nota}")
    return saida


if __name__ == "__main__":
    acao = sys.argv[1] if len(sys.argv) > 1 else "ler"
    {"ler": ler, "elegiveis": elegiveis}[acao]()
