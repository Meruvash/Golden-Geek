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
HEADERS = {"User-Agent": "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br/black/robo/)"}
BR = ZoneInfo("America/Sao_Paulo")
PAUSA = 1.0          # segundos entre páginas (educação com o site)
JANELA = 180         # dias da referência
MIN_DIAS = 28        # abaixo disso o item fica fora (usuário aceitou base curta de ~30 dias em 03/11/2026)
CORTE = 0.20         # desconto real mínimo
QUASE = 0.15         # "Quase Black": de 15% a menos de 20% (seção à parte, pedida pelo usuário em 03/11/2026)
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


class _TravaDados:
    """Trava curta em volta de cada leitura-e-gravação dos arquivos compartilhados pelos dois robôs."""
    def __enter__(self):
        import fcntl
        DADOS.mkdir(parents=True, exist_ok=True)
        self.f = open(DADOS / ".dados_trava", "w")
        fcntl.flock(self.f, fcntl.LOCK_EX)
        return self

    def __exit__(self, *a):
        self.f.close()


def _hora(of):
    return max([of.get("verificado", "")] + [x.get("hora", "") for o in of.get("ofertas", []) for x in (o.get("loja_agora") or {}, o.get("api") or {})])


def _juntar_oferta(nova, velha):
    """Duas versões do mesmo jogo em ofertas.json: fica a leitura mais nova do Compara Jogos, com a conferência
    na loja (loja_agora) e a das APIs (api) mais recentes de cada link."""
    base, outra = (nova, velha) if nova.get("verificado", "") >= velha.get("verificado", "") else (velha, nova)
    extra = {o.get("url"): o for o in outra.get("ofertas", [])}
    for o in base.get("ofertas", []):
        e = extra.get(o.get("url"))
        if not e:
            continue
        for k in ("loja_agora", "api"):
            if e.get(k) and (not o.get(k) or e[k].get("hora", "") > o[k].get("hora", "")):
                o[k] = e[k]
    return base


def mesclar(p, mudou, apagar=()):
    """Grava só os jogos que este robô mexeu, por cima da versão que está no disco agora (o outro robô pode ter gravado)."""
    with _TravaDados():
        atual = ler(p, {})
        for k, v in mudou.items():
            if k in atual and p == HIST:
                pts = dict(atual[k].get("pontos", {}))
                for d, preco in v.get("pontos", {}).items():
                    pts[d] = min(preco, pts.get(d, 1e9))
                v = {**v, "pontos": dict(sorted(pts.items()))}
            elif k in atual and p == HOJE:
                v = _juntar_oferta(v, atual[k])
            atual[k] = v
        for k in apagar:
            atual.pop(k, None)
        gravar(p, atual)
        return atual


def mesclar_lista(entra, sai):
    with _TravaDados():
        atual = set(ler(LISTA, []))
        atual |= set(entra)
        atual -= set(sai)
        gravar(LISTA, sorted(atual))


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
            "titulo": o.get("name"),
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


DESCOBERTA = DADOS / "descoberta.json"


def slugs_novos(maximo=250):
    """Jogos com preço no Compara Jogos que o robô ainda não acompanha (até `maximo` por leitura): é assim que os
    ~3 mil jogos sem nota 7 entram aos poucos, sem pesar no site (pedido do usuário em 04/11/2026)."""
    vistos = set(ler(LISTA, [])) | set(ler(HIST, {})) | set(ler(DESCOBERTA, []))
    novos = [s for s in slugs_sitemap() if s not in vistos][:maximo]
    gravar(DESCOBERTA, sorted(set(ler(DESCOBERTA, [])) | set(novos)))  # tentado uma vez; quem tem preço entra na lista
    return novos


def slugs_quedas():
    return list(dict.fromkeys(re.findall(r'href="/item/([a-z0-9-]+)"', baixar(f"{BASE}/price-drops"))))


def coletar(slugs, registrar_lista=False, limite=None):
    hist = ler(HIST, {})
    hoje_d = ler(HOJE, {})
    prem = premiados()
    hoje = agora().date().isoformat()
    vistos = erros = 0
    mh, mo, sai_o, entra_l, sai_l = {}, {}, set(), set(), set()

    def salvar():
        mesclar(HIST, mh), mesclar(HOJE, mo, sai_o)
        if registrar_lista:
            mesclar_lista(entra_l, sai_l)
        mh.clear(), mo.clear(), sai_o.clear(), entra_l.clear(), sai_l.clear()

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
        # todos os jogos entram (pedido do usuário em 04/11/2026); os sem nota 7 nem prêmio vão para "Outras promoções"
        ok = qualifica(it, prem)
        if registrar_lista:
            entra_l.add(s)
        h = hist.setdefault(s, {"pontos": {}})
        h.update({k: it[k] for k in ("nome", "tipo", "ano", "bgg", "bgg_id", "editora", "editora_br", "imagem")})
        h["principal"] = ok
        h["pontos"].update({d: p for d, p in it["hist30"].items()})
        # ponto de hoje: menor preço de jogo novo entre as lojas, como o histórico do próprio Compara Jogos
        lojas = [o["por"] for o in it["ofertas"] if o["por"] and o["tipo"] == "LINK" and not FORA.search(o["loja"] + o["loja_id"])]
        if lojas:
            h["pontos"][hoje] = min([*lojas, h["pontos"].get(hoje, 1e9)])
        corte = (agora().date() - dt.timedelta(days=JANELA + 10)).isoformat()
        h["pontos"] = {d: p for d, p in sorted(h["pontos"].items()) if d >= corte}
        mh[s] = h
        mo[s] = hoje_d[s] = {"verificado": agora().isoformat(timespec="minutes"), "ofertas": it["ofertas"]}
        if i % 100 == 0:
            print(f"  {i} páginas, {vistos} produtos")
            salvar()
    salvar()
    print(f"ok {vistos} produtos lidos, {erros} erros, {len(ler(HOJE, {}))} jogos acompanhados")


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
    mexidos = set()
    for s, of in hoje_d.items():
        pts = list(hist.get(s, {}).get("pontos", {}).values())
        if len(pts) < 5:
            continue
        ref = aparada(pts)
        for o in of["ofertas"]:
            o.pop("loja_agora", None)
            if o["tipo"] != "LINK" or not o["por"] or FORA.search(o["loja"] + o["loja_id"]):
                continue
            if (ref - o["por"]) / ref < margem or o["por"] < ref * SUSPEITO or o.get("fonte") == "feed da loja":
                continue  # o feed é a própria loja informando: não precisa abrir a página
            r = lojas.conferir(o["url"], o["por"])
            lidas += 1
            if r:
                o["loja_agora"] = {**r, "hora": agora().isoformat(timespec="minutes")}
                mexidos.add(s)
    hoje_d = mesclar(HOJE, {s: hoje_d[s] for s in mexidos})
    ok = sum(1 for of in hoje_d.values() for o in of["ofertas"] if o.get("loja_agora"))
    print(f"ok lojas: {lidas} páginas tentadas, {ok} conferidas; bloqueadas: {', '.join(lojas.bloqueadas()) or 'nenhuma'}")


EXCLUIR = DADOS / "excluir.json"  # ofertas conferidas a olho que são outro produto ligado ao jogo por engano
# marcas de brinquedo que lançam jogos com o mesmo nome de jogos de tabuleiro conhecidos (ex.: "Código Secreto Pakitoys")
MARCAS_OUTRAS = re.compile(r"(?i)\b(pakitoys|paki toys|uniplac|nig brinquedos|toyster|xalingo|pais ?& ?filhos|pais e filhos|"
                           r"brincadeira de crian[cç]a|elka|big star|zoop toys|lugo|junges|ggb plast)\b")


AUDITORIA = ROOT / "conteudo" / "auditoria_links.json"  # tools/auditoria_links.py (a cada 6 h no GitHub Actions)
_LINKS_RUINS = None


def links_ruins():
    """Links de oferta que a última auditoria abriu e achou com ERRO (página inicial, busca, 404, sem produto, outro
    jogo, intermediário ou rastreio). Regra do usuário (04/11/2026): link que não leva à oferta de verdade não vai
    para o site; a oferta sai. A auditoria seguinte confere de novo esses links e devolve os que ficarem certos."""
    global _LINKS_RUINS
    if _LINKS_RUINS is None:
        try:
            rel = json.loads(AUDITORIA.read_text(encoding="utf-8"))
            _LINKS_RUINS = {v["url"] for v in rel.get("links", []) if v.get("status") == "ERRO"}
        except (FileNotFoundError, ValueError):
            _LINKS_RUINS = set()
    return _LINKS_RUINS


def link_oferta(url):
    """Link de oferta pronto para o site, ou None quando ele não leva direto à página do produto."""
    if not url or not url.startswith("http") or INDIRETO.search(url):
        return None
    limpo = _sem_rastreio(url)
    if url in links_ruins() or limpo in links_ruins():
        return None
    return limpo


def outro_produto(o, h):
    """A oferta é de outro produto que o Compara Jogos ligou ao jogo? Pela lista de exclusão ou pela marca no
    título do anúncio (quando a marca não é a editora do jogo)."""
    try:
        excl = set(json.loads(EXCLUIR.read_text(encoding="utf-8")))
    except FileNotFoundError:
        excl = set()
    if o.get("url") in excl:
        return True
    texto = f'{o.get("titulo") or ""} {o.get("url") or ""}'
    m = MARCAS_OUTRAS.search(texto)
    return bool(m and m.group(1).lower() not in (h.get("editora") or "").lower())


COMUNIDADE_HORAS = 72  # promoção postada em canal costuma acabar rápido: só as dos últimos 3 dias entram na conta geral


# Link direto da loja nos achados da comunidade (pedido do usuário em 04/11/2026): post do canal do Compara Jogos aponta
# para a página do jogo no Compara Jogos, e outros canais usam encurtadores (amzn.to, meli.la...) que podem levar
# afiliado de quem postou. Trocamos pelo link da própria loja que o Compara Jogos já lista para o jogo (sem abrir o
# encurtador) e tiramos parâmetros de rastreio e de afiliado.
INDIRETO = re.compile(r"(comparajogos\.com\.br|amzn\.to|a\.co/|link\.amazon|amzlinks|amzlink\.to|meli\.la|bit\.ly|tinyurl|cutt\.ly|"
                      r"encurtador|t\.me/|telegram\.me|s\.click|shope\.ee|tidd\.ly|lmd\.ink|onelink|ccnl\.app|is\.gd|ow\.ly|"
                      r"buff\.ly|rebrand\.ly|rb\.gy|shorturl\.at|//t\.co/|goo\.gl|l\.ead\.me|compre\.vc|promobit\.com\.br|"
                      r"pelando\.com\.br|linktr\.ee|hotm\.art)", re.I)
RASTREIO = re.compile(r"^(utm_.*|tag|ref|ref_|linkcode|ascsubtag|camp.*|creative.*|afil.*|aff.*|partner.*|parceiro.*|matt_.*|"
                      r"source|fbclid|gclid|psc|smid|th|sr|qid|keywords|pd_rd_.*|pf_rd_.*|content-id|spm|clickid)$", re.I)


def _sem_rastreio(url):
    from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
    try:
        u = urlsplit(url)
    except ValueError:
        return url
    q = [(k, v) for k, v in parse_qsl(u.query, keep_blank_values=True) if not RASTREIO.match(k)]
    m = re.search(r"amazon\.com\.br/(?:[^/]+/)?(?:dp|gp/product)/([A-Z0-9]{10})", url)
    if m:  # Amazon: só o produto
        return f"https://www.amazon.com.br/dp/{m.group(1)}"
    return urlunsplit((u.scheme, u.netloc, u.path, urlencode(q), ""))


def _norm_loja(t):
    return re.sub(r"[^a-z0-9]", "", unicodedata.normalize("NFKD", str(t or "")).encode("ascii", "ignore").decode().lower())


_DOMINIOS = {}


def _dominios_lojas(hoje_d):
    """loja → endereço do site, a partir de todas as ofertas do Compara Jogos (para o último recurso do link)."""
    if not _DOMINIOS and hoje_d:
        from urllib.parse import urlsplit
        for of in hoje_d.values():
            for o in of.get("ofertas", []):
                u = o.get("url") or ""
                if u.startswith("http") and not INDIRETO.search(u):
                    _DOMINIOS.setdefault(_norm_loja(o.get("loja")), f"{urlsplit(u).scheme}://{urlsplit(u).netloc}/")
    return _DOMINIOS


def link_direto(url, loja, ofertas_jogo, nome=None, hoje_d=None, slug_cache=None):
    """Link da loja para o achado: o da própria loja na lista do Compara Jogos quando o post aponta para página
    intermediária; sempre sem rastreio. Sem link da loja na lista, fica o do post."""
    if url and not INDIRETO.search(url):
        return _sem_rastreio(url)
    alvo = _norm_loja(loja)
    if alvo and slug_cache:
        for k, u in (_links_cj().get(slug_cache) or {}).items():
            if not k.startswith("_") and (k == alvo or alvo in k or k in alvo):
                return _sem_rastreio(u)
    for o in ofertas_jogo or []:
        u = o.get("url") or ""
        if u and not INDIRETO.search(u) and alvo and (_norm_loja(o.get("loja")) == alvo or alvo in _norm_loja(o.get("loja"))
                                                      or _norm_loja(o.get("loja")) in alvo):
            return _sem_rastreio(u)
    # sem página do produto dessa loja: não há link direto (o robô relê a página do jogo no Compara Jogos antes,
    # em atualizar_links_comunidade; se nem assim, o achado fica fora: link tem que levar à oferta de verdade)
    return None


SEM_LINK = set()  # achados da comunidade sem página do produto na loja (o robô relê a página do jogo)


LINKS_CJ = DADOS / "links_cj.json"  # slug → {loja normalizada: link do produto, "_hora": quando leu}, vale 24 h


def _links_cj():
    try:
        return json.loads(LINKS_CJ.read_text(encoding="utf-8"))
    except (FileNotFoundError, ValueError):
        return {}


def atualizar_links_comunidade(maximo=40):
    """Relê no Compara Jogos a página dos jogos de achados da comunidade cujo link da loja não está nos dados (a lista
    de ofertas guardada pode estar velha): a página traz o link do produto em cada loja (04/11/2026, links da Bravo).
    Guarda em links_cj.json; não mexe na lista de jogos acompanhados."""
    SEM_LINK.clear()
    achados_comunidade(ler(HIST, {}), dt.date.today(), ler(HOJE, {}))
    cache = _links_cj()
    limite = (agora() - dt.timedelta(hours=24)).isoformat(timespec="minutes")
    faltam = [sl for sl in sorted(SEM_LINK) if (cache.get(sl) or {}).get("_hora", "") < limite][:maximo]
    for sl in faltam:
        try:
            it = ler_item(sl)
        except Exception as ex:  # noqa: BLE001 — sem rede ou página fora: tenta na próxima leitura
            print(f"aviso: {sl}: {ex.__class__.__name__}")
            continue
        time.sleep(2)
        cache[sl] = {"_hora": agora().isoformat(timespec="minutes"),
                     **{_norm_loja(o["loja"]): o["url"] for o in (it or {}).get("ofertas", []) if o.get("url") and not INDIRETO.search(o["url"])}}
    if faltam:
        gravar(LINKS_CJ, cache)
    SEM_LINK.clear()
    achados_comunidade(ler(HIST, {}), dt.date.today(), ler(HOJE, {}))
    print(f"ok links da comunidade: {len(faltam)} jogos relidos no Compara Jogos; {len(SEM_LINK)} achados ficam fora por não ter página do produto na loja")


def achados_comunidade(hist, hoje, hoje_d=None):
    """Promoções postadas nos canais públicos (Telegram) e no Promobit, no mesmo formato das ofertas do radar.
    Só entram com preço de referência confiável (nossa base ou 14+ dias de histórico no Compara Jogos), jogo com
    nota BGG 7+ ou premiado, preço não suspeito e postagem das últimas 72 horas. O vendedor não é conferido."""
    prem = premiados()
    achados = {}
    for arq in (DADOS / "promobit.json", DADOS / "comunidade.json"):
        achados.update(ler(arq, {}))
    limite = (agora() - dt.timedelta(hours=COMUNIDADE_HORAS)).isoformat()
    saida = []
    for k, v in achados.items():
        if not v.get("preco") or v.get("tipo_preco") == "COUPON" or not v.get("link_loja") and not v.get("link"):
            continue
        quando = v.get("publicado") or v.get("visto") or ""
        try:
            quando_br = dt.datetime.fromisoformat(quando.replace("Z", "+00:00")).astimezone(BR).isoformat()
        except ValueError:
            continue
        if quando_br < limite:
            continue
        h = hist.get(v.get("jogo") or "")
        if h and h.get("pontos"):
            janela = {d: p for d, p in h["pontos"].items() if d >= (hoje - dt.timedelta(days=JANELA)).isoformat()}
            if not janela:
                continue
            slug, nome, tipo, editora, bgg, img = v["jogo"], h["nome"], h.get("tipo"), h.get("editora"), h.get("bgg"), h.get("imagem")
            ref, menor = aparada(janela.values()), min(janela.values())
            dias = (hoje - dt.date.fromisoformat(min(janela))).days + 1
        elif v.get("ref") and (v.get("ref_dias") or 0) >= 14:
            slug, nome, tipo, editora, bgg, img = (v.get("slug_cj"), v.get("nome_cj") or v["titulo"], v.get("tipo_cj"),
                                                   v.get("editora"), v.get("bgg"), v.get("imagem"))
            ref, menor, dias = v["ref"], v.get("menor") or v["ref"], v["ref_dias"]
        else:
            continue
        if not slug:
            continue
        bom = (bgg or 0) >= NOTA_MIN or chave(nome) in prem
        por = v["preco"]
        if por < ref * SUSPEITO:
            continue
        loja = v.get("loja") or "loja não informada"
        link = link_direto(v.get("link_loja") or v["link"], loja, ((hoje_d or {}).get(slug) or {}).get("ofertas"), nome, hoje_d, slug)
        if not link:
            SEM_LINK.add(slug)
            continue
        if not link_oferta(link):
            continue  # a auditoria de links abriu este link e ele não leva à página do produto
        saida.append({"slug": slug, "nome": nome, "tipo": tipo or "game", "editora": editora, "bgg": bgg, "imagem": img,
                      "loja": loja, "url": link,
                      "por": por, "de": v.get("preco_antes"),
                      "ref": ref, "desc": (ref - por) / ref, "menor": menor, "recorde": por <= menor, "dias": dias,
                      "fonte_preco": f'achado da comunidade ({(v.get("fonte") or "Promobit").removeprefix("Telegram: ")})',
                      "vendedor": None, "verificado": quando_br, "editora_br": None, "comunidade": True,
                      "post": v.get("link"), "principal": bom})
    return saida


def calcular():
    """Itens do radar, armadilhas e itens no menor preço, a partir do histórico e das ofertas de hoje."""
    hist, hoje_d = ler(HIST, {}), ler(HOJE, {})
    hoje = agora().date()
    radar, armadilhas, quase, outras = [], [], [], []
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
            if outro_produto(o, h):
                continue
            api = o.get("api") if (o.get("api") or {}).get("vendedor_ok") else None
            if o["tipo"] != "LINK" or not o["por"] or (FORA.search(o["loja"] + o["loja_id"]) and not api):
                continue  # marketplace só entra com vendedor conferido pela API (Amazon pelo Keepa, Mercado Livre pela API)
            la = o.get("loja_agora")
            if la and la.get("estoque") is False:
                continue  # a página da loja diz que acabou
            url = link_oferta(o.get("url"))
            if not url:
                continue  # sem link direto para a página do produto (intermediário ou ERRO na auditoria de links)
            # preço da API oficial, ou lido agora na página da loja; senão, o que a loja informou ao Compara Jogos
            por = api["preco"] if api else (la["preco"] if la else o["por"])
            desc = (ref - por) / ref
            if por < ref * SUSPEITO:
                continue
            base = {"slug": s, "nome": h["nome"], "tipo": h["tipo"], "editora": h.get("editora"), "bgg": h.get("bgg"),
                    "imagem": h.get("imagem"), "loja": o["loja"], "url": url, "por": por, "de": o["de"],
                    "ref": ref, "desc": desc, "menor": menor, "recorde": por <= menor_antes, "dias": dias,
                    "fonte_preco": api["fonte"] if api else ("página da loja" if la else ("feed da loja" if o.get("fonte") == "feed da loja" else "Compara Jogos")),
                    "vendedor": api.get("vendedor") if api else None,
                    "verificado": (api or la or {}).get("hora") or o.get("atualizado") or of["verificado"], "editora_br": h.get("editora_br")}
            if h.get("principal") is False:  # jogo sem nota 7 nem prêmio: só entra em "Outras promoções", com 20% ou mais
                if desc >= CORTE:
                    outras.append({**base, "principal": False})
                continue
            if desc >= CORTE:
                radar.append(base)
            elif desc >= QUASE:
                quase.append(base)
            elif o["de"] and o["por"] and (o["de"] - o["por"]) / o["de"] >= CORTE:
                armadilhas.append(base)
    # achados da comunidade (Telegram e Promobit) entram na conta geral com a mesma régua (pedido do usuário em 03/11/2026)
    for base in achados_comunidade(hist, hoje, hoje_d):
        if base.get("principal") is False:
            if base["desc"] >= CORTE:
                outras.append(base)
            continue
        if base["desc"] >= CORTE:
            radar.append(base)
        elif base["desc"] >= QUASE:
            quase.append(base)
    # uma linha por jogo e loja; no radar, a melhor oferta de cada jogo vem primeiro
    radar.sort(key=lambda x: -x["desc"])
    vistos, unicos = set(), []
    for x in radar:
        if (x["slug"], x["loja"]) not in vistos:
            vistos.add((x["slug"], x["loja"]))
            unicos.append(x)
    armadilhas.sort(key=lambda x: -((x["de"] - x["por"]) / x["de"]))
    # Quase Black: um por jogo (a melhor loja) e só jogos que não estão no radar principal
    no_radar = {x["slug"] for x in unicos}
    quase.sort(key=lambda x: -x["desc"])
    vq, quase_u = set(), []
    for x in quase:
        if x["slug"] not in no_radar and (x["slug"], x["loja"]) not in vq:
            vq.add((x["slug"], x["loja"]))
            quase_u.append(x)
    outras.sort(key=lambda x: -x["desc"])
    vo, outras_u = set(), []
    for x in outras:
        if x["slug"] not in no_radar and (x["slug"], x["loja"]) not in vo:
            vo.add((x["slug"], x["loja"]))
            outras_u.append(x)
    return unicos, armadilhas[:30], quase_u, outras_u


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


def trava(robo):
    """Cada robô tem a sua trava: o mesmo robô não roda duas vezes ao mesmo tempo, mas o normal e o educado rodam juntos."""
    import fcntl
    DADOS.mkdir(parents=True, exist_ok=True)
    f = open(DADOS / f".trava_{robo}", "w")
    try:
        fcntl.flock(f, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        sys.exit(f"o robô {robo} ainda está na leitura anterior; esta foi pulada")
    return f


def main(robo=None, acao=None):
    """Dois robôs independentes, cada um com a sua agenda e a sua trava (pedido do usuário em 03/11/2026):
      robô normal  (tools/black/robo_normal.py):  leitura rápida de quedas e candidatos, conferência nas lojas no
                    ritmo do primeiro robô e promoções do Promobit; feito para pegar oferta nova cedo.
      robô educado (tools/black/robo_educado.py): lista inteira (ou varredura do sitemap), conferência educada nas
                    lojas, Keepa e Mercado Livre, feeds e cupons.
    Os dois gravam os mesmos arquivos por mescla (cada um só regrava os jogos que leu)."""
    ap = argparse.ArgumentParser()
    ap.add_argument("acao", nargs="?", choices=["varrer", "coletar", "rapida", "pagina"], default=acao)
    ap.add_argument("--robo", choices=["normal", "educado"], default=robo)
    ap.add_argument("--limite", type=int)
    ap.add_argument("--desde", type=int, default=0, help="retoma a varredura a partir desta posição do sitemap")
    a = ap.parse_args()
    if not a.acao:
        ap.error("diga a leitura (rapida, coletar, varrer ou pagina)")
    robo = a.robo or ("normal" if a.acao == "rapida" else "educado")
    _t = trava(robo) if a.acao != "pagina" else None  # noqa: F841
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import lojas
    lojas.modo(robo)
    print(f"-- robô {robo}, leitura {a.acao}")
    if a.acao == "varrer":
        coletar(slugs_sitemap()[a.desde:], registrar_lista=True, limite=a.limite)
    elif a.acao == "coletar":
        alvo = list(dict.fromkeys(ler(LISTA, []) + slugs_quedas()))
        coletar(alvo, registrar_lista=True, limite=a.limite)
    elif a.acao == "rapida":
        coletar(list(dict.fromkeys(slugs_quedas() + perto_do_corte())), limite=a.limite)
        try:
            novos = slugs_novos()
        except Exception as ex:  # sitemap fora do ar: a descoberta fica para a próxima leitura
            novos = []
            print("aviso: descoberta de jogos novos pulada:", ex)
        if novos:
            print(f"-- descoberta: {len(novos)} jogos ainda não acompanhados")
            coletar(novos, registrar_lista=True)
    if a.acao != "pagina":
        if robo == "educado":
            import apis
            import feeds
            ofertas = ler(HOJE, {})
            alvo = set(perto_do_corte(1200))
            apis.enriquecer(ofertas, so=alvo)
            feeds.juntar(ler(HIST, {}), ofertas)
            mesclar(HOJE, {s: ofertas[s] for s in ofertas if s in alvo or any(o.get("fonte") == "feed da loja" for o in ofertas[s]["ofertas"])})
        conferir_lojas()
        import promobit
        if robo == "educado":
            import cupons
            cupons.ler()
            promobit.ler_cupons()
        else:
            promobit.ler_ofertas()
            import telegram
            telegram.ler()
        atualizar_links_comunidade()
        lojas.salvar()
    import pagina_black
    with _TravaDados():
        r = calcular()
    pagina_black.build(*r)
    pagina_black.robo()
    if a.acao != "pagina":
        import alertas  # alerta no celular de quem assinou o canal, para cada jogo que entrou no radar
        with _TravaDados():
            alertas.avisar(r[0] + r[3])


if __name__ == "__main__":
    main()
