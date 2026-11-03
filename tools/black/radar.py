"""Radar Black de Verdade: ofertas de jogos de tabuleiro com desconto real de 20% ou mais.

Uso:
  python3 tools/black/radar.py varrer          # varre todos os jogos com preço do Compara Jogos (sitemap) e monta a lista
  python3 tools/black/radar.py coletar         # rotina diária: consulta só a lista de acompanhamento + quedas de preço
  python3 tools/black/radar.py coletar --limite 50   # teste rápido
  python3 tools/black/radar.py rapida          # leitura de 30 em 30 min: quedas de preço + radar + quem está perto do corte
  python3 tools/black/radar.py pagina          # só recalcula e gera /black/ com os dados já coletados

Fonte única: as páginas públicas de produto do Compara Jogos (comparajogos.com.br/item/<slug>), que o robots.txt
permite. Cada página traz a ficha do jogo (nota BGG, editora, tipo), as ofertas das lojas e 30 dias de histórico
do menor preço. A API de histórico longo (/api/) é proibida pelo robots.txt e não é usada: o histórico de 180 dias
é montado aqui, um ponto por dia, em conteudo/black/historico.json (decisão do usuário em 03/11/2026).

Regras (prompt "Radar Black Friday" do usuário, 03/11/2026):
  referência = média aparada (corta 10% mais altos e 10% mais baixos) dos pontos diários dos últimos 180 dias;
  desconto real = (referência - preço hoje) / referência; entra no radar com 20% ou mais.
  Histórico com menos de 180 dias: "BASE CURTA (X dias)". Com menos de MIN_DIAS, fica fora.
  Qualidade: nota BGG 7,0 ou mais, ou jogo premiado (Golden Geek, Spiel des Jahres, Kennerspiel) do nosso catálogo.
  Só jogo novo, de loja; Shopee, vendedores avulsos do Compara Jogos e marketplaces cujo vendedor o robô não
  consegue conferir (Amazon, Mercado Livre, Magalu, Americanas, Casas Bahia: robots.txt proíbe ou bloqueia) ficam fora.
Nunca troque o User-Agent nem contorne bloqueio: 403 ou 429 interrompe a coleta.
"""
import argparse
import datetime as dt
import io
import json
import re
import sys
import time
import unicodedata
from pathlib import Path
from statistics import mean
from zoneinfo import ZoneInfo

import requests

ROOT = Path(__file__).resolve().parents[2]
DADOS = ROOT / "conteudo" / "black"
HIST = DADOS / "historico.json"
LISTA = DADOS / "lista.json"
HOJE = DADOS / "ofertas.json"
BASE = "https://www.comparajogos.com.br"
HEADERS = {"User-Agent": "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br)"}
BR = ZoneInfo("America/Sao_Paulo")
PAUSA = 1.0          # segundos entre páginas (educação com o site)
JANELA = 180         # dias da referência
MIN_DIAS = 28        # abaixo disso o item fica fora (usuário aceitou base curta de ~30 dias em 03/11/2026)
CORTE = 0.20         # desconto real mínimo
NOTA_MIN = 7.0
SUSPEITO = 0.45      # oferta abaixo de 45% da referência: provável anúncio de outro produto; fica fora
FORA = re.compile(r"amazon|mercado ?livre|shopee|magalu|magazine|americanas|casas ?bahia|aliexpress|shein|brech[oó]|usad|seminov", re.I)
PREMIOS_OK = ("Golden Geek", "Spiel des Jahres", "Kennerspiel des Jahres")


class Bloqueado(Exception):
    pass


def agora():
    return dt.datetime.now(BR)


def chave(nome):
    s = unicodedata.normalize("NFKD", nome or "").encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def ler(p, padrao):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return padrao


def gravar(p, d):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(d, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")


SESSAO = requests.Session()
SESSAO.headers.update(HEADERS)


def baixar(url):
    r = SESSAO.get(url, timeout=40)
    if r.status_code in (401, 403, 429):
        raise Bloqueado(f"{r.status_code} em {url}")
    return r.text if r.status_code == 200 else ""


def estado(html):
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', html, re.S)
    if not m:
        return {}
    return json.loads(m.group(1))["props"]["pageProps"].get("__APOLLO_STATE__") or {}


def ler_item(slug):
    """Ficha, ofertas e histórico de 30 dias de um produto do Compara Jogos."""
    st = estado(baixar(f"{BASE}/item/{slug}"))
    prod = next((v for k, v in st.items() if k.startswith("product:") and v.get("slug") == slug), None)
    if not prod:
        return None
    ref = lambda r: st.get(r["__ref"]) if isinstance(r, dict) and "__ref" in r else r  # noqa: E731
    editora = ref(prod.get("publisher")) or {}
    # lista de ofertas de jogo novo, sem extras (a consulta que a própria página usa para "Novos")
    chave_novos = next((k for k in prod if k.startswith("prices(") and '"condition":{"_eq":"NEW"}' in k and '"is_extra":{"_eq":false}' in k), None)
    ofertas = []
    for r in prod.get(chave_novos, []) if chave_novos else []:
        o = ref(r) or {}
        loja = ref(o.get("store")) or {}
        if o.get("condition") != "NEW" or o.get("damaged") or o.get("is_extra") or not o.get("available"):
            continue
        ofertas.append({
            "loja": loja.get("full_name") or loja.get("name") or "",
            "loja_id": loja.get("name") or "",
            "tipo": o.get("type"),
            "vendedor": (o.get("seller") or {}).get("name") if isinstance(o.get("seller"), dict) else None,
            "de": o.get("price_from"),
            "por": o.get("price_to"),
            "url": o.get("url"),
            "atualizado": o.get("updated_at"),
        })
    rq = st.get("ROOT_QUERY", {})
    hist = {}
    for k, v in rq.items():
        if k.startswith("product_history") and isinstance(v, list):
            for p in v:
                p = ref(p) or {}
                if p.get("condition") == "NEW" and p.get("price"):
                    hist[p["date"]] = min(float(p["price"]), hist.get(p["date"], 1e9))
    return {
        "slug": slug, "nome": prod.get("name"), "tipo": prod.get("type"), "ano": prod.get("year"),
        "bgg": prod.get("bgg_rating"), "bgg_id": prod.get("bgg_id"),
        "editora": editora.get("name"), "editora_br": editora.get("brazilian"),
        "imagem": prod.get("image_url") or prod.get("thumbnail_url"),
        "ofertas": ofertas, "hist30": hist,
    }


def premiados():
    """Nomes (normalizados) de jogos premiados no nosso catálogo: Consulta Golden Geek, resenhas e pauta."""
    nomes = set()
    try:
        for x in json.loads((ROOT / "busca.json").read_text(encoding="utf-8")):
            if x.get("t") == "g":
                nomes.add(chave(x["n"]))
    except FileNotFoundError:
        pass
    pauta = ler(ROOT / "pauta.json", {})
    for j in (pauta.get("jogos") if isinstance(pauta, dict) else pauta) or []:
        if any(p.get("premio") in PREMIOS_OK for p in j.get("premiacoes", [])):
            nomes.add(chave(j["jogo"]))
    for arq in (ROOT / "conteudo").glob("*.json"):
        try:
            c = json.loads(arq.read_text(encoding="utf-8"))
        except Exception:
            continue
        if isinstance(c, dict) and any(isinstance(p, dict) and p.get("premio") in PREMIOS_OK for p in c.get("premiacoes", []) or []):
            nomes.update({chave(c.get("jogo")), chave(c.get("og_titulo", "").split(":")[0])})
    nomes.discard("")
    return nomes


def qualifica(item, prem):
    return (item.get("bgg") or 0) >= NOTA_MIN or chave(item.get("nome")) in prem


def slugs_sitemap():
    xml = baixar(f"{BASE}/sitemap-products-priced.xml")
    return list(dict.fromkeys(re.findall(r"/item/([a-z0-9-]+)</loc>", xml)))


def slugs_quedas():
    return list(dict.fromkeys(re.findall(r'href="/item/([a-z0-9-]+)"', baixar(f"{BASE}/price-drops"))))


def coletar(slugs, registrar_lista=False, limite=None):
    hist = ler(HIST, {})
    hoje_d = ler(HOJE, {})
    lista = set(ler(LISTA, []))
    prem = premiados()
    hoje = agora().date().isoformat()
    vistos = erros = 0
    for i, s in enumerate(slugs[:limite] if limite else slugs):
        try:
            it = ler_item(s)
        except Bloqueado as ex:
            print(f"! bloqueado: {ex}. Coleta interrompida (não contornamos bloqueio).")
            break
        except Exception as ex:  # rede, JSON quebrado: segue para o próximo
            erros += 1
            print(f"  erro em {s}: {ex}")
            time.sleep(PAUSA)
            continue
        time.sleep(PAUSA)
        if not it:
            continue
        vistos += 1
        ok = qualifica(it, prem)
        if registrar_lista:
            (lista.add if ok else lista.discard)(s)
        if not ok:
            hoje_d.pop(s, None)
            continue
        h = hist.setdefault(s, {"pontos": {}})
        h.update({k: it[k] for k in ("nome", "tipo", "ano", "bgg", "bgg_id", "editora", "editora_br", "imagem")})
        h["pontos"].update({d: p for d, p in it["hist30"].items()})
        # ponto de hoje: menor preço de jogo novo entre as lojas, como o histórico do próprio Compara Jogos
        lojas = [o["por"] for o in it["ofertas"] if o["por"] and o["tipo"] == "LINK" and not FORA.search(o["loja"] + o["loja_id"])]
        if lojas:
            h["pontos"][hoje] = min([*lojas, h["pontos"].get(hoje, 1e9)])
        corte = (agora().date() - dt.timedelta(days=JANELA + 10)).isoformat()
        h["pontos"] = {d: p for d, p in sorted(h["pontos"].items()) if d >= corte}
        hoje_d[s] = {"verificado": agora().isoformat(timespec="minutes"), "ofertas": it["ofertas"]}
        if i % 100 == 0:
            print(f"  {i} páginas, {vistos} produtos, {len(hoje_d)} acompanhados")
            gravar(HIST, hist), gravar(HOJE, hoje_d)
            if registrar_lista:
                gravar(LISTA, sorted(lista))
    gravar(HIST, hist), gravar(HOJE, hoje_d)
    if registrar_lista:
        gravar(LISTA, sorted(lista))
    print(f"ok {vistos} produtos lidos, {erros} erros, {len(hoje_d)} jogos acompanhados")


def aparada(valores):
    v = sorted(valores)
    k = int(len(v) * 0.10)
    v = v[k:len(v) - k] if len(v) - 2 * k > 0 else v
    return mean(v)


def conferir_lojas(margem=0.15):
    """Abre na própria loja as ofertas candidatas (desconto real de 15% ou mais pelo Compara Jogos) e grava preço e estoque."""
    import lojas
    hist, hoje_d = ler(HIST, {}), ler(HOJE, {})
    lidas = 0
    for s, of in hoje_d.items():
        pts = list(hist.get(s, {}).get("pontos", {}).values())
        if len(pts) < 5:
            continue
        ref = aparada(pts)
        for o in of["ofertas"]:
            o.pop("loja_agora", None)
            if o["tipo"] != "LINK" or not o["por"] or FORA.search(o["loja"] + o["loja_id"]):
                continue
            if (ref - o["por"]) / ref < margem or o["por"] < ref * SUSPEITO:
                continue
            r = lojas.conferir(o["url"], o["por"])
            lidas += 1
            if r:
                o["loja_agora"] = {**r, "hora": agora().isoformat(timespec="minutes")}
    gravar(HOJE, hoje_d)
    ok = sum(1 for of in hoje_d.values() for o in of["ofertas"] if o.get("loja_agora"))
    print(f"ok lojas: {lidas} páginas tentadas, {ok} conferidas; bloqueadas: {', '.join(lojas.bloqueadas()) or 'nenhuma'}")


def calcular():
    """Itens do radar, armadilhas e itens no menor preço, a partir do histórico e das ofertas de hoje."""
    hist, hoje_d = ler(HIST, {}), ler(HOJE, {})
    hoje = agora().date()
    radar, armadilhas = [], []
    for s, h in hist.items():
        of = hoje_d.get(s)
        if not of:
            continue
        janela = {d: p for d, p in h["pontos"].items() if d >= (hoje - dt.timedelta(days=JANELA)).isoformat()}
        if not janela:
            continue
        dias = (hoje - dt.date.fromisoformat(min(janela))).days + 1
        if dias < MIN_DIAS:
            continue
        ref = aparada(janela.values())
        menor = min(janela.values())
        # o menor preço do período sem contar hoje, para saber se hoje bateu o recorde
        antes = [p for d, p in janela.items() if d < hoje.isoformat()]
        menor_antes = min(antes) if antes else menor
        for o in of["ofertas"]:
            api = o.get("api") if (o.get("api") or {}).get("vendedor_ok") else None
            if o["tipo"] != "LINK" or not o["por"] or (FORA.search(o["loja"] + o["loja_id"]) and not api):
                continue  # marketplace só entra com vendedor conferido pela API (Amazon pelo Keepa, Mercado Livre pela API)
            la = o.get("loja_agora")
            if la and la.get("estoque") is False:
                continue  # a página da loja diz que acabou
            # preço da API oficial, ou lido agora na página da loja; senão, o que a loja informou ao Compara Jogos
            por = api["preco"] if api else (la["preco"] if la else o["por"])
            desc = (ref - por) / ref
            if por < ref * SUSPEITO:
                continue
            base = {"slug": s, "nome": h["nome"], "tipo": h["tipo"], "editora": h.get("editora"), "bgg": h.get("bgg"),
                    "imagem": h.get("imagem"), "loja": o["loja"], "url": o["url"], "por": por, "de": o["de"],
                    "ref": ref, "desc": desc, "menor": menor, "recorde": por <= menor_antes, "dias": dias,
                    "fonte_preco": api["fonte"] if api else ("página da loja" if la else "Compara Jogos"),
                    "vendedor": api.get("vendedor") if api else None,
                    "verificado": (api or la or {}).get("hora") or o.get("atualizado") or of["verificado"], "editora_br": h.get("editora_br")}
            if desc >= CORTE:
                radar.append(base)
            elif o["de"] and o["por"] and (o["de"] - o["por"]) / o["de"] >= CORTE:
                armadilhas.append(base)
    # uma linha por jogo e loja; no radar, a melhor oferta de cada jogo vem primeiro
    radar.sort(key=lambda x: -x["desc"])
    vistos, unicos = set(), []
    for x in radar:
        if (x["slug"], x["loja"]) not in vistos:
            vistos.add((x["slug"], x["loja"]))
            unicos.append(x)
    armadilhas.sort(key=lambda x: -((x["de"] - x["por"]) / x["de"]))
    return unicos, armadilhas[:30]


def perto_do_corte(maximo=350):
    """Jogos acompanhados cuja melhor oferta de loja está a menos de 35% da referência (no radar ou quase)."""
    hist, hoje_d = ler(HIST, {}), ler(HOJE, {})
    notas = []
    for s, h in hist.items():
        pts = list(h.get("pontos", {}).values())
        # inclui Amazon e Mercado Livre: aqui é só para escolher quem conferir (o vendedor é checado depois, pela API)
        lojas = [o["por"] for o in hoje_d.get(s, {}).get("ofertas", []) if o.get("por") and o["tipo"] == "LINK"]
        if len(pts) >= 5 and lojas:
            ref = aparada(pts)
            folga = (min(lojas) - ref * (1 - CORTE)) / ref
            if folga < 0.15:
                notas.append((folga, s))
    return [s for _, s in sorted(notas)[:maximo]]


def trava():
    """Impede duas coletas ao mesmo tempo (a diária e a de 30 em 30 minutos gravam os mesmos arquivos)."""
    import fcntl
    DADOS.mkdir(parents=True, exist_ok=True)
    f = open(DADOS / ".trava", "w")
    try:
        fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        sys.exit("outra coleta do radar está em andamento; esta leitura foi pulada")
    return f


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("acao", choices=["varrer", "coletar", "rapida", "pagina"])
    ap.add_argument("--limite", type=int)
    ap.add_argument("--desde", type=int, default=0, help="retoma a varredura a partir desta posição do sitemap")
    a = ap.parse_args()
    _t = trava() if a.acao != "pagina" else None  # noqa: F841
    if a.acao == "varrer":
        coletar(slugs_sitemap()[a.desde:], registrar_lista=True, limite=a.limite)
    elif a.acao == "coletar":
        alvo = list(dict.fromkeys(ler(LISTA, []) + slugs_quedas()))
        coletar(alvo, registrar_lista=True, limite=a.limite)
    elif a.acao == "rapida":
        coletar(list(dict.fromkeys(slugs_quedas() + perto_do_corte())), limite=a.limite)
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    if a.acao != "pagina":
        import apis
        ofertas = ler(HOJE, {})
        apis.enriquecer(ofertas, so=set(perto_do_corte(1200 if a.acao != "rapida" else 400)))
        gravar(HOJE, ofertas)
        conferir_lojas()
        import cupons
        import promobit
        cupons.ler()
        promobit.ler()
    import pagina_black
    pagina_black.build(*calcular())


if __name__ == "__main__":
    main()
