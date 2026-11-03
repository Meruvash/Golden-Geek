"""Canais públicos de promoções de jogos de tabuleiro no Telegram, para o Radar Black de Verdade.

Uso (chamado pelo robô normal; pode rodar sozinho):  python3 tools/black/telegram.py

Lê a prévia pública de cada canal (t.me/s/<canal>), que qualquer pessoa abre no navegador sem conta e que o
robots.txt do Telegram permite. Nada de API, login ou entrar em grupo. Cada post com preço (R$) vira um achado com
o texto, o preço, a loja (pelo link), a hora do post e o link do post no canal. Achados ficam 7 dias em
conteudo/black/comunidade.json. Quando o nome bate com um jogo da nossa base, a página mostra o desconto real.

Canais (listados publicamente no tópico "Grupos de WhatsApp e Telegram" do fórum do Compara Jogos e na
página do Ludofertas). Vendas de usados (bazar) ficam de fora.
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
ARQ = ROOT / "conteudo" / "black" / "comunidade.json"
HIST = ROOT / "conteudo" / "black" / "historico.json"
BR = ZoneInfo("America/Sao_Paulo")
GUARDA = dt.timedelta(days=7)
CANAIS = {"comparajogos": "Canal Compara Jogos", "ludofertas": "Ludofertas", "bgturbofertas": "BG Turbo Ofertas",
          "boardoferta": "Board Oferta", "gameboxtabuleiro": "GameBox Tabuleiro"}
PRECO = re.compile(r"R\$\s?(\d{1,3}(?:\.\d{3})*(?:,\d{2})?|\d+(?:,\d{2})?)")
LOJAS = {"amazon": "Amazon", "amzn": "Amazon", "mercadolivre": "Mercado Livre", "meli.la": "Mercado Livre", "mercadolibre": "Mercado Livre",
         "magazineluiza": "Magalu", "magalu": "Magalu", "americanas": "Americanas", "casasbahia": "Casas Bahia",
         "shopee": "Shopee", "aliexpress": "AliExpress", "comparajogos": "Compara Jogos"}


def agora():
    return dt.datetime.now(BR)


def chave(s):
    import unicodedata
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def _num(s):
    return float(s.replace(".", "").replace(",", "."))


def _loja(links, texto):
    for u in links:
        d = urlparse(u).netloc.lower()
        for k, nome in LOJAS.items():
            if k in d:
                return nome, d
    m = re.search(r"[Vv]endido por ([^·\n]{2,40})", texto)
    if m:
        return m.group(1).strip(" .·"), None
    d = urlparse(links[0]).netloc.lower() if links else None
    return (d.removeprefix("www.") if d else None), d


def _posts(canal, html):
    for bloco in re.findall(r'<div class="tgme_widget_message_wrap.*?(?=<div class="tgme_widget_message_wrap|\Z)', html, re.S):
        m_id = re.search(r'data-post="([^"]+)"', bloco)
        m_txt = re.search(r'<div class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>', bloco, re.S)
        m_t = re.search(r'<time datetime="([^"]+)"', bloco)
        if not (m_id and m_txt):
            continue
        cru = m_txt.group(1)
        links = [htmllib.unescape(u) for u in re.findall(r'href="(https?://[^"]+)"', cru) if "t.me/" not in u]
        texto = re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<br\s*/?>", "\n", re.sub(r"<(?!br)[^>]+>", " ", cru)))).strip()
        yield m_id.group(1), texto, links, (m_t.group(1) if m_t else None)


LIXO = re.compile(r"(?i)#\w+|^\s*(?:amazon|mercadolivre|mercado livre|magalu|shopee)\b|novo produto encontrado|abaixou!?|\b\d+\s*%?\s*off\b|\bpubli\b|\ban[uú]ncio\b|marca:.*$|"
                  r"n[aã]o [eé] o mesmo pre[cç]o.*?!|ainda assim t[aá] bom!?|pre[cç]o:?$|\bpor\b$|\bnacional\b|\bimportado\b")
URL = re.compile(r"https?://\S+")
IGNORA_ANTES = re.compile(r"(?i)(\d+\s*x\s*de|x de|acima de|limitado a|at[eé]|economi\w*|\$min|\$max|frete)\s*:?\s*$")


def _itens(texto):
    """Um post pode trazer vários produtos: corta o texto em trechos que terminam num link e lê cada trecho."""
    pos = 0
    for m in URL.finditer(texto):
        trecho, url = texto[pos:m.start()], m.group(0).rstrip(").,*")
        pos = m.end()
        precos, antes = [], None
        for mp in PRECO.finditer(trecho):
            atras = trecho[max(0, mp.start() - 14):mp.start()]
            v = _num(mp.group(1))
            if re.search(r"(?i)\(?de\s*$", atras):
                antes = v
            elif not IGNORA_ANTES.search(atras):
                precos.append((mp.start(), v))
        if not precos:
            continue
        ini, preco = precos[0]
        cabeca = trecho[:ini]
        cabeca = re.split(r"(?i)pre[cç]o\s*:|💵|💳", cabeca)[0]
        nome = re.sub(r"[^\w\s:&'!,.\-()/+ºª]", " ", cabeca)
        nome = re.sub(r"\s+", " ", LIXO.sub(" ", nome)).strip(" .-·:,")
        nome = re.split(r"\s\.\s", nome)[-1].strip(" .-·:,")  # posts com vários produtos separados por " . "
        if len(nome) < 3:
            continue
        vend = re.search(r"[Vv]endido por ([^·\n]{2,40}?)(?: ·|$| novo| usado)", trecho)
        cupom = re.search(r"(?i)cupom:?\s*([A-Z0-9]{4,20})\b", trecho)
        yield {"nome": nome[:140], "preco": preco, "antes": antes, "url": url,
               "vendido": vend.group(1).strip() if vend else None, "cupom": cupom.group(1) if cupom else None}


def ler():
    dados = json.loads(ARQ.read_text(encoding="utf-8")) if ARQ.exists() else {}
    try:
        hist = json.loads(HIST.read_text(encoding="utf-8"))
    except FileNotFoundError:
        hist = {}
    nomes = {chave(h["nome"]): s for s, h in hist.items() if h.get("nome") and (len(chave(h["nome"]).split()) >= 2 or len(chave(h["nome"])) >= 8)}
    hora = agora().isoformat(timespec="minutes")
    novos = 0
    for canal, nome_canal in CANAIS.items():
        h = lojas.pagina(f"https://t.me/s/{canal}")
        if not h:
            continue
        for pid, texto, links, quando in _posts(canal, h):
            if re.search(r"(?i)esgotad|encerrad|acabou", texto):
                continue
            for n, it in enumerate(_itens(texto)):
                t = chave(it["nome"])
                jogo = next((s for nm, s in nomes.items() if f" {nm} " in f" {t} "), None)
                if jogo and "expans" in t and hist.get(jogo, {}).get("tipo") != "expansion":
                    jogo = None  # expansão casada com o jogo base: o desconto real seria de outro produto
                loja, dom = _loja([it["url"]], "")
                if it["vendido"]:
                    loja = it["vendido"]
                k = f"tg:{pid}:{n}"
                novos += k not in dados
                dados[k] = {"titulo": it["nome"], "preco": it["preco"], "preco_antes": it["antes"] if it["antes"] and it["antes"] > it["preco"] else None,
                            "tipo_preco": "NORMAL", "cupom": it["cupom"], "loja": loja, "dominio": dom,
                            "publicado": quando, "link": f"https://t.me/{pid}", "link_loja": it["url"], "jogo": jogo,
                            "fonte": f"Telegram: {nome_canal}", "visto": hora}
    limite = (agora() - GUARDA).isoformat()[:16]
    dados = {k: v for k, v in dados.items() if (v.get("publicado") or v["visto"])[:16] >= limite}
    ARQ.parent.mkdir(parents=True, exist_ok=True)
    ARQ.write_text(json.dumps(dados, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    print(f"ok telegram: {len(dados)} achados de {len(CANAIS)} canais ({novos} novos)")
    return dados


if __name__ == "__main__":
    lojas.LIMITE_ESPECIAL["t.me"] = 400
    ler()
