"""Vigia de PlayStation 5 do Black de Verdade (pedido do usuário em 20/11/2026: "se tiver qualquer PlayStation 5
abaixo de R$ 3.000, me informa e adiciona essa promoção no site").

Fora do tema do site (jogos de tabuleiro), por isso fica numa seção própria da página do Black e num arquivo próprio
(conteudo/black/ps5.json). Duas fontes, com as mesmas regras do radar:

  - API oficial do Mercado Livre (robô ml, a cada ciclo): busca no catálogo os produtos "console PlayStation 5", lê os
    anúncios de cada um e fica com o mais barato NOVO de loja oficial ou MercadoLíder. Anúncio de vendedor comum,
    usado, recondicionado, importado ou de acessório não entra.
  - Achados conferidos a mão (campo "manuais" do mesmo arquivo): só com link direto da página do produto na loja
    (nunca afiliado de ninguém), preço à vista e a hora em que alguém abriu a página e viu o preço. Saem sozinhos
    depois de radar.PRECO_MAX_HORAS.

Só entra na página o que está abaixo de LIMITE. Quando aparece um PS5 novo abaixo do limite, manda alerta (ntfy).

Uso: python3 tools/black/ps5.py   (lê a API, grava ps5.json e mostra o resultado; o robô ml chama ler() sozinho)
"""
import json
import re
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import radar  # noqa: E402

ARQ = radar.DADOS / "ps5.json"
LIMITE = 3000.0
BUSCAS = ("console playstation 5", "playstation 5 slim", "playstation 5 pro", "ps5 console")
# título de console de verdade: menciona PS5/PlayStation 5 e console/slim/pro/edição/digital/mídia
CONSOLE = re.compile(r"(?i)(playstation\s*5|ps\s*5)")
TIPO_CONSOLE = re.compile(r"(?i)\b(console|slim|pro|digital|m[ií]dia f[ií]sica|leitor|edi[cç][aã]o|bundle|kit)\b")
# acessório, jogo, peça, usado e afins: fora
NAO_CONSOLE = re.compile(r"(?i)\b(controle|dualsense|capa|case|skin|adesivo|suporte|base|dock|cooler|ventoinha|carregador|"
                         r"cabo|fonte|headset|fone|volante|avulso|ssd|hd|mem[oó]ria|gift ?card|cart[aã]o|assinatura|plus|portal|vr2?|pulse|tampa|faceplate|pel[ií]cula|"
                         r"usado|seminovo|recondicionado|vitrine|reembalado|caixa vazia|r[eé]plica|chaveiro|miniatura|"
                         r"ps4|playstation 4|xbox|nintendo|switch)\b")


# peça ou jogo vendido sozinho: o título começa pelo item ("Leitor de disco para PS5 Pro", "Jogo Spider-Man 2 PS5");
# jogo junto do console ("Console PS5 Slim + Jogo") continua valendo
AVULSO = re.compile(r"(?i)^\s*(leitor|unidade|drive|jogo|game|m[ií]dia)\b")


def eh_console(titulo):
    t = titulo or ""
    return bool(CONSOLE.search(t) and TIPO_CONSOLE.search(t) and not NAO_CONSOLE.search(t) and not AVULSO.search(t))


def ler_arquivo():
    return radar.ler(ARQ, {"limite": LIMITE, "api": [], "manuais": []})


def ler():
    """Busca na API do Mercado Livre e grava ps5.json. Devolve as ofertas abaixo do limite que são novas desde a
    última leitura (para o alerta)."""
    import apis
    import requests
    dados = ler_arquivo()
    token = apis._ml_token()
    if not token:
        print("-- PS5: sem chave do Mercado Livre, vigia fica parado nesta leitura")
        return []
    h = {**apis.UA, "Authorization": f"Bearer {token}"}
    produtos = {}
    for q in BUSCAS:
        r = requests.get(f"{apis.ML}/products/search", params={"status": "active", "site_id": "MLB", "q": q, "limit": 50},
                         headers=h, timeout=30)
        time.sleep(0.4)
        if r.status_code != 200:
            print(f"-- PS5: busca '{q}' respondeu {r.status_code}")
            continue
        for p in r.json().get("results") or []:
            if p.get("id") and eh_console(p.get("name")):
                produtos[p["id"]] = p.get("name")
    reputacao, achados = {}, []
    for pid, nome in produtos.items():
        r = requests.get(f"{apis.ML}/products/{pid}/items", headers=h, timeout=30)
        time.sleep(0.4)
        if r.status_code != 200:
            continue
        for it in sorted((x for x in r.json().get("results") or [] if x.get("price") and x.get("condition", "new") == "new"),
                         key=lambda x: x["price"]):
            oficial = bool(it.get("official_store_id"))
            nivel, apelido = apis._ml_reputacao(h, it.get("seller_id"), reputacao) if it.get("seller_id") else (None, None)
            if oficial or nivel in apis.LIDER:
                anuncio = it.get("item_id") or it.get("id")
                achados.append({"modelo": nome, "loja": "Mercado Livre", "vendedor": apelido or str(it.get("seller_id")),
                                "nivel": "loja oficial" if oficial else f"MercadoLíder {nivel}", "preco": float(it["price"]),
                                "url": f"https://www.mercadolivre.com.br/p/{pid}?pdp_filters=item_id:{anuncio}",
                                "fonte": "API do Mercado Livre", "verificado": apis.agora()})
                break
    antes = {(a["url"], a["preco"]) for a in dados.get("api", []) if a["preco"] < LIMITE}
    dados["api"] = sorted(achados, key=lambda a: a["preco"])
    dados["lido"] = apis.agora()
    radar.gravar(ARQ, dados)
    abaixo = [a for a in dados["api"] if a["preco"] < LIMITE]
    menor = f'menor R$ {dados["api"][0]["preco"]:.2f}' if dados["api"] else "nenhum anúncio de loja oficial ou MercadoLíder"
    print(f"ok PS5: {len(produtos)} produtos de console no catálogo, {len(achados)} com vendedor conferido, "
          f"{len(abaixo)} abaixo de R$ {LIMITE:.0f} ({menor})")
    return [a for a in abaixo if (a["url"], a["preco"]) not in antes]


def vitrine():
    """Ofertas que vão para a página: abaixo do limite, link direto sem afiliado, preço visto há menos de
    radar.PRECO_MAX_HORAS. Mais barata primeiro."""
    dados = ler_arquivo()
    saida = []
    for a in dados.get("api", []) + dados.get("manuais", []):
        if not a.get("preco") or a["preco"] >= LIMITE or radar.preco_velho(a.get("verificado")):
            continue
        if not a.get("url") or radar.afiliado(a["url"]) or radar._AFILIADO_PUBLICO.search(a["url"]):
            continue
        saida.append(a)
    return sorted(saida, key=lambda a: a["preco"]), dados


def avisar(novos):
    if not novos:
        return
    import alertas
    for a in novos[:3]:
        alertas.enviar(f"PS5 por R$ {a['preco']:.2f}".replace(".", ","),
                       f"{a['modelo']} na {a['loja']} ({a.get('vendedor') or 'loja'}), abaixo de R$ 3.000",
                       link=a["url"], tags="video_game,moneybag")


if __name__ == "__main__":
    novos = ler()
    print(json.dumps(vitrine()[0], ensure_ascii=False, indent=1))
    print(f"{len(novos)} novos abaixo do limite")
