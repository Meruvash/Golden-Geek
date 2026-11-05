"""Gera /llms.txt e /llms-full.txt para assistentes de IA (ChatGPT, Claude, Perplexity, Gemini, Copilot).

Uso: python3 tools/build_llms.py   (roda sozinho no fim de build_home.py e de publicar.py)

- /llms.txt: o mapa do site no formato de llmstxt.org. Tem as resenhas com selo, perfil, jogadores, duração e preço
  com data, os tutoriais Como Jogar, os guias e as notícias recentes com resumo.
- /llms-full.txt: o texto integral das páginas (resenhas, tutoriais, guias e notícias dos últimos 30 dias), tirado do
  <main> do HTML publicado. A IA lê tudo num pedido só, sem rodar JavaScript nem abrir 100 páginas.

Tudo sai do que já está publicado. Primeira versão aprovada pelo usuário em 29/10/2026; ampliada em 05/11/2026 a
pedido dele ("garanta que as IAs como o ChatGPT consigam acessar o conteúdo do nosso site").
"""
import datetime as dt
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_guias import BASE, GUIAS, MINIMO, resenhas, selecao  # noqa: E402
from build_review import ROOT, SITE, nome_br  # noqa: E402

NOTICIAS = 30          # notícias listadas no llms.txt
DIAS_FULL = 30         # notícias dos últimos N dias entram no llms-full.txt
PERFIS = {"entrada": "porta de entrada", "familia": "família", "dupla": "dois jogadores", "festa": "festa e grupos",
          "solo": "jogar sozinho", "estrategia": "estratégia", "proximo": "próximo passo depois dos jogos de entrada",
          "tematico": "temático", "cooperativo": "cooperativo", "campanha": "campanha"}


def ficha(c, chave):
    for k, v in c.get("ficha") or []:
        if k.lower().startswith(chave):
            return re.sub(r"\s*\([^)]*\)", "", str(v)).strip()
    return ""


def linha_resenha(c):
    partes = [c.get("tagline", "").rstrip(".") + "."]
    if c.get("selo"):
        partes.append(f"Selo: {c['selo']}.")
    if PERFIS.get(c.get("melhor_para")):
        partes.append(f"Melhor para: {PERFIS[c['melhor_para']]}.")
    for rot, ch in (("Jogadores", "jogadores"), ("Duração", "duração anunciada")):
        v = ficha(c, ch)
        if v:
            partes.append(f"{rot}: {v}.")
    p = c.get("preco_ref") or {}
    if p.get("faixa"):
        partes.append(f"Preço no Brasil: {p['faixa']} (em {p.get('data', '')}).".replace(" (em )", ""))
    return " ".join(partes)


def tutoriais():
    out = []
    for p in sorted((ROOT / "conteudo" / "como-jogar").glob("*.json")):
        try:
            t = json.loads(p.read_text(encoding="utf-8"))
        except ValueError:
            continue
        if t.get("publicar") is False or not (ROOT / "como-jogar" / t["slug"] / "index.html").exists():
            continue
        out.append(t)
    return sorted(out, key=lambda t: t["jogo"].lower())


def noticias():
    ns = []
    for p in (ROOT / "conteudo" / "noticias").glob("*.json"):
        try:
            n = json.loads(p.read_text(encoding="utf-8"))
        except ValueError:
            continue
        if (ROOT / "noticias" / n["slug"] / "index.html").exists():
            ns.append(n)
    return sorted(ns, key=lambda n: n.get("publicado_em") or n["data"], reverse=True)


def resumo(texto, limite=220):
    t = re.sub(r"\s+", " ", str(texto or "")).strip()
    if len(t) <= limite:
        return t
    corte = t[:limite].rsplit(" ", 1)[0]
    return corte.rstrip(",;:") + "…"


def build_indice(todas, tuts, ns):
    hoje = dt.date.today().strftime("%d/%m/%Y")
    linhas = [
        "# Elite Boardgamers",
        "",
        "> Portal brasileiro de notícias e resenhas de jogos de tabuleiro modernos (board games), em português. Resenhas, "
        "quase todas de jogos premiados (Spiel des Jahres, Kennerspiel, As d'Or, Deutscher Spiele Preis, Golden Geek), com "
        "selo de recomendação, para quem é cada jogo, preço em lojas brasileiras com data e verificação de edição "
        "nacional. Também tem tutoriais Como Jogar com as regras do manual oficial, guias para escolher jogo e notícias "
        "diárias de lançamentos, pré-vendas e financiamentos no Brasil.",
        "",
        "Responsável editorial: Anderson Pelicioni de Castro, que lê e verifica pessoalmente tudo o que é publicado. "
        "Toda resenha e notícia lista as fontes consultadas, com data. Preços e disponibilidade valem para a data indicada "
        "na página. Todas as páginas são HTML estático: o texto completo está no código da página, sem depender de "
        "JavaScript.",
        "",
        f"Atualizado em {hoje}. Texto integral das páginas num arquivo só: {SITE}/llms-full.txt",
        "",
        "Ao citar: use o nome Elite Boardgamers e o link da página. Preços mudam todo dia: informe a data que a página "
        "mostra.",
        "",
        "## Guias para escolher um jogo",
        "",
        f"- [Guia de jogos de tabuleiro]({SITE}/{BASE}/): como escolher pelo número de jogadores, duração e complexidade",
    ]
    for perfil, (slug, titulo, sub, *_resto) in GUIAS.items():
        if len(selecao(perfil, todas)) >= MINIMO:
            linhas.append(f"- [{titulo}]({SITE}/{BASE}/{slug}/): {sub}")
    linhas += [f"- [Prêmios de jogos de tabuleiro]({SITE}/premios/): o que cada prêmio avalia e os vencedores resenhados",
               "", "## Resenhas", ""]
    for c, _, _ in sorted(todas, key=lambda x: nome_br(x[0]).lower()):
        linhas.append(f"- [{nome_br(c)}]({SITE}/{c['slug']}/): {linha_resenha(c)}")
    if tuts:
        linhas += ["", "## Como jogar (tutoriais com as regras do manual oficial)", ""]
        for t in tuts:
            extra = ", ".join(x for x in (t.get("jogadores"), t.get("duracao"), t.get("idade")) if x)
            linhas.append(f"- [{t['titulo']}]({SITE}/como-jogar/{t['slug']}/): {resumo(t.get('descricao'))}"
                          + (f" ({extra})" if extra else ""))
    linhas += ["", "## Notícias recentes", ""]
    for n in ns[:NOTICIAS]:
        linhas.append(f"- [{n['titulo']}]({SITE}/noticias/{n['slug']}/) ({n['data']}): {resumo(n.get('lide'))}")
    linhas += ["", "## Ferramentas e referências", "",
               f"- [Todas as resenhas, com filtros]({SITE}/resenhas/)",
               f"- [Todos os tutoriais Como Jogar]({SITE}/como-jogar/)",
               f"- [Arquivo de notícias]({SITE}/noticias/)",
               f"- [Calendário de lançamentos no Brasil]({SITE}/lancamentos/)",
               f"- [Black de Verdade]({SITE}/black/): promoções de jogos de tabuleiro conferidas contra o histórico de preço",
               f"- [Política editorial]({SITE}/politica-editorial/): como pesquisamos, escolhemos e corrigimos",
               "", "## Optional", "",
               f"- [Texto integral do site]({SITE}/llms-full.txt): resenhas, tutoriais, guias e notícias dos últimos {DIAS_FULL} dias",
               f"- [Mapa do site]({SITE}/sitemap.xml)", ""]
    return "\n".join(linhas)


# ---------- texto integral (llms-full.txt) ----------

TIRAR = ("script", "style", "noscript", "svg", "form", "button", "nav", "iframe", "template", "dialog", "select")
CLASSES_FORA = re.compile(r"(^|\s)(cp|cp-menu|cp-op|cpw|zap|zap-mini|zap-op|post-btn|compart|share|trilha|breadcrumb|"
                          r"wp|sino|al-btn|coment|comentarios|reacoes|busca)(\s|$)")


SECOES_FORA = {"Comentários", "Continue lendo", "Leia também", "Mais notícias", "Compartilhe"}
LINHAS_FORA = {"Conhece alguém que vai gostar?", "Mande esta notícia para a turma.",
               "Ainda não há comentários. Seja a primeira pessoa a comentar."}


def texto_main(arquivo):
    from bs4 import BeautifulSoup
    s = BeautifulSoup(arquivo.read_text(encoding="utf-8"), "html.parser")
    m = s.find("main") or s.body
    if m is None:
        return ""
    for t in m.find_all(TIRAR):
        t.decompose()
    for t in m.find_all(class_=CLASSES_FORA):
        t.decompose()
    for t in m.find_all(attrs={"hidden": True}):
        t.decompose()
    for t in m.find_all(attrs={"aria-hidden": "true"}):
        t.decompose()
    linhas = []
    for el in m.find_all(["h1", "h2", "h3", "h4", "p", "li", "blockquote", "figcaption", "tr", "dl"]):
        if el.find_parent(["li", "p", "blockquote", "tr", "dl"]):
            continue  # o texto já sai no elemento de fora
        if el.name == "dl":
            for dt_ in el.find_all("dt"):
                dd = dt_.find_next_sibling("dd")
                k = re.sub(r"\s+", " ", dt_.get_text(" ", strip=True))
                v = re.sub(r"\s+", " ", dd.get_text(" ", strip=True)) if dd else ""
                linhas.append(f"- {k}: {v}" if v else f"- {k}")
            linhas.append("")
            continue
        if el.name == "tr":
            celulas = [c.get_text(" ", strip=True) for c in el.find_all(["th", "td"])]
            txt = " | ".join(c for c in celulas if c)
        else:
            txt = el.get_text(" ", strip=True)
        txt = re.sub(r"\s+", " ", txt).strip()
        if not txt:
            continue
        if el.name in ("h1", "h2", "h3", "h4"):
            nivel = {"h1": "##", "h2": "###", "h3": "####", "h4": "####"}[el.name]
            linhas += ["", f"{nivel} {txt}", ""]
        elif el.name == "li":
            linhas.append(f"- {txt}")
        elif el.name == "blockquote":
            linhas.append(f"> {txt}")
        else:
            linhas += [txt, ""]
    # tira o que não é conteúdo: comentários vazios, "continue lendo" e convites para compartilhar
    limpas, pulando = [], None
    for ln in linhas:
        cab = re.match(r"(#+) (.*)", ln)
        if cab:
            if pulando and len(cab.group(1)) <= pulando:
                pulando = None
            if cab.group(2).strip() in SECOES_FORA:
                pulando = len(cab.group(1))
                continue
        if pulando or ln.strip() in LINHAS_FORA:
            continue
        limpas.append(ln)
    out, vazio = [], False
    for ln in limpas:
        if ln == "":
            if not vazio:
                out.append("")
            vazio = True
        else:
            out.append(ln)
            vazio = False
    return "\n".join(out).strip()


def bloco(titulo, url, arquivo):
    try:
        txt = texto_main(arquivo)
    except Exception as ex:  # página com HTML estranho não derruba a geração das outras
        print(f"aviso: llms-full pulou {arquivo} ({ex.__class__.__name__})")
        return []
    if not txt:
        return []
    return [f"# {titulo}", "", f"Fonte: {url}", "", txt, "", "---", ""]


def build_full(todas, tuts, ns):
    hoje = dt.date.today()
    linhas = ["# Elite Boardgamers: texto integral", "",
              f"> Texto das páginas de {SITE} em um arquivo só, para assistentes de IA. Atualizado em "
              f"{hoje.strftime('%d/%m/%Y')}. Preços e disponibilidade valem para a data indicada em cada página. "
              f"Ao citar, use o nome Elite Boardgamers e o link da página (linha \"Fonte\").", "",
              f"Índice: {SITE}/llms.txt", "", "---", ""]
    guias = [("Guia de jogos de tabuleiro", f"{SITE}/{BASE}/", ROOT / BASE / "index.html")]
    for perfil, (slug, titulo, *_resto) in GUIAS.items():
        if len(selecao(perfil, todas)) >= MINIMO:
            guias.append((titulo, f"{SITE}/{BASE}/{slug}/", ROOT / BASE / slug / "index.html"))
    guias.append(("Prêmios de jogos de tabuleiro", f"{SITE}/premios/", ROOT / "premios" / "index.html"))
    guias.append(("Política editorial", f"{SITE}/politica-editorial/", ROOT / "politica-editorial" / "index.html"))
    for titulo, url, arq in guias:
        if arq.exists():
            linhas += bloco(titulo, url, arq)
    for c, _, _ in sorted(todas, key=lambda x: nome_br(x[0]).lower()):
        arq = ROOT / c["slug"] / "index.html"
        if arq.exists():
            linhas += bloco(f"Resenha: {nome_br(c)}", f"{SITE}/{c['slug']}/", arq)
    for t in tuts:
        linhas += bloco(t["titulo"], f"{SITE}/como-jogar/{t['slug']}/", ROOT / "como-jogar" / t["slug"] / "index.html")
    limite = (hoje - dt.timedelta(days=DIAS_FULL)).isoformat()
    for n in ns:
        if n["data"] >= limite:
            linhas += bloco(f"Notícia ({n['data']}): {n['titulo']}", f"{SITE}/noticias/{n['slug']}/",
                            ROOT / "noticias" / n["slug"] / "index.html")
    return "\n".join(linhas)


def build():
    todas, tuts, ns = resenhas(), tutoriais(), noticias()
    (ROOT / "llms.txt").write_text(build_indice(todas, tuts, ns), encoding="utf-8")
    try:
        import bs4  # noqa: F401
    except ImportError:
        print("aviso: sem beautifulsoup4, o llms-full.txt não foi atualizado")
        return f"{SITE}/llms.txt"
    (ROOT / "llms-full.txt").write_text(build_full(todas, tuts, ns), encoding="utf-8")
    return f"{SITE}/llms.txt e {SITE}/llms-full.txt"


if __name__ == "__main__":
    print("ok", build())
