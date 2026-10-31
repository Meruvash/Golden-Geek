"""Página Como Jogar a partir do texto do tutorial (docs/como-jogar/<slug>/tutorial.md) e dos dados do topo
(conteudo/como-jogar/<slug>.json). Gera como-jogar/<slug>/index.html no mesmo formato do tutorial de Clank! Catacombs;
a moldura do site (cabeçalho, menu, rodapé, faixa de progresso, SEO) entra depois, em build_como_jogar.py.

Marcação do tutorial.md (a mesma do de Clank!):
  ## 4min. Título      seção "comece em 4 minutos" (destacada)
  ## N. Título         seção numerada; "Para consultar durante a partida" vira a folha de consulta
  ### Respostas ...    tudo até o próximo ### ou ## fica escondido num "mostrar"
  > [!tipo] ...        bloco: entender, passos, resolvido, complete, suavez, treino, atencao, edicao, dica, mais
                       ("mais" = regra adicional ou de caso especial: "> [!mais] **Caverna de Cristal.** texto")
Essencial x opcional (pedido do editor em 31/10/2026): à vista ficam só o "comece em 4 minutos", os blocos passos e
atencao, tabelas e listas; explicação (entender), exemplo (resolvido), edição, dica e regra adicional (mais) abrem com
um toque; as tarefas e respostas de cada etapa vão juntas para "Pratique esta etapa"; as seções de apoio (OPCIONAIS)
ficam inteiras recolhidas. O tempo de leitura do topo conta só o que fica à vista.
  (p. 7)               página do manual, vira a etiqueta "p. 7"
Uma página escrita à mão (sem tutorial.md) não é tocada: o JSON dela só alimenta a lista em /como-jogar/.
"""
import html
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://eliteboardgamers.com.br"
MESES = ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro")
ROTULOS = {"entender": "Para entender", "passos": "Passo a passo", "resolvido": "Tarefa · exemplo resolvido",
           "complete": "Tarefa · complete", "suavez": "Tarefa · sua vez", "treino": "Treino rápido",
           "atencao": "Atenção", "edicao": "Sobre a edição", "dica": "Dica", "mais": "Regra adicional"}
# o que abre com um toque fora do "comece em 4 minutos": rótulo do botão
DOBRA = {"entender": "Por que funciona assim", "resolvido": "Ver um exemplo resolvido", "edicao": "Sobre a edição",
         "dica": "Dica", "mais": "Regra adicional"}
TAREFAS = ("complete", "suavez", "treino")
OPCIONAIS = ("Antes de tudo", "Como este guia ensina", "Situações especiais", "Avaliação final")
PALAVRAS_MIN = 200
CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12.5l4.5 4.5L19.5 6.5"/></svg>'


def slugify(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-")


def inline(t):
    t = html.escape(t, quote=False)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+)\)", r'<a href="\2">\1</a>', t)
    t = re.sub(r"(?<![\"'>=])(https?://[^\s<)]+[^\s<).,;:])", r'<a href="\1">\1</a>', t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])", r"<em>\1</em>", t)
    # (p. 7), (p. 4 e 5), (p. 2, 8 e 13): etiqueta de página
    t = re.sub(r"\s?\(p\.\s*([^)]+)\)", lambda m: f' <span class="pg">p.&nbsp;{m.group(1).strip()}</span>', t)
    return t


def blocos(linhas, dobrar=False):
    """Markdown simples -> HTML: parágrafos, listas, tabelas, ### e blocos > [!tipo].
    dobrar=True: blocos que não são essenciais viram "abre com um toque" (DOBRA)."""
    out, i = [], 0
    while i < len(linhas):
        l = linhas[i]
        if not l.strip():
            i += 1
            continue
        if l.startswith(">"):
            bq = []
            while i < len(linhas) and linhas[i].startswith(">"):
                bq.append(re.sub(r"^> ?", "", linhas[i]))
                i += 1
            m = re.match(r"\[!(\w+)\]\s*(.*)", bq[0])
            tipo, bq[0] = (m.group(1), m.group(2)) if m else ("entender", bq[0])
            rot = ROTULOS.get(tipo, tipo.capitalize())
            # "**Passo a passo: preparação**" -> "**Preparação**" (o rótulo já diz "Passo a passo")
            prefixo = {"passos": "Passo a passo: ", "treino": "Treino rápido: "}.get(tipo)
            if prefixo:
                bq[0] = re.sub(r"^\*\*" + re.escape(prefixo) + r"(\w)", lambda x: "**" + x.group(1).upper(), bq[0], flags=re.I)
            if dobrar and tipo in DOBRA:
                # título do botão: o negrito do começo ("**Caverna de Cristal.** ...") ou o rótulo do tipo
                t = re.match(r"\*\*(.+?)[.:]?\*\*\s*", bq[0])
                titulo = t.group(1) if t and not t.group(1).lower().startswith(("para entender", "exemplo resolvido")) else ""
                if t:
                    bq[0] = bq[0][t.end():]
                rotulo = DOBRA[tipo] + (f": {titulo}" if titulo and tipo == "mais" else "")
                if titulo and tipo in ("entender", "dica", "edicao"):
                    rotulo = f"{DOBRA[tipo]}: {titulo}"
                out.append(f'<details class="dobra {tipo}"><summary>{inline(rotulo)}</summary>'
                           f'<aside class="call {tipo}">{blocos(bq)}</aside></details>')
                continue
            out.append(f'<aside class="call {tipo}"><p class="rot">{rot}</p>{blocos(bq)}</aside>')
            continue
        if l.startswith("|"):
            tab = []
            while i < len(linhas) and linhas[i].startswith("|"):
                tab.append([c.strip() for c in linhas[i].strip().strip("|").split("|")])
                i += 1
            cab, corpo = tab[0], [r for r in tab[1:] if not all(re.fullmatch(r":?-+:?", c) for c in r)]
            out.append('<div class="tab"><table><thead><tr>' + "".join(f"<th>{inline(c)}</th>" for c in cab) + "</tr></thead><tbody>"
                       + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in corpo) + "</tbody></table></div>")
            continue
        if re.match(r"(\d+)\. |[-*] ", l):
            ordenada = bool(re.match(r"\d+\. ", l))
            itens = []
            while i < len(linhas) and (re.match(r"(\d+\.|[-*]) ", linhas[i]) or (linhas[i].startswith("   ") and itens)):
                if re.match(r"(\d+\.|[-*]) ", linhas[i]):
                    itens.append(re.sub(r"^(\d+\.|[-*]) ", "", linhas[i]))
                else:
                    itens[-1] += " " + linhas[i].strip()
                i += 1
            tag = "ol" if ordenada else "ul"
            out.append(f"<{tag}>" + "".join(f"<li>{inline(x)}</li>" for x in itens) + f"</{tag}>")
            continue
        if l.startswith("### "):
            out.append(f"<h3>{inline(l[4:].strip())}</h3>")
            i += 1
            continue
        par = []
        while i < len(linhas) and linhas[i].strip() and not re.match(r"(>|\||#{2,3} |(\d+\.|[-*]) )", linhas[i]):
            par.append(linhas[i].strip())
            i += 1
        texto = " ".join(par)
        m = re.match(r"\*\*(Respostas? [^*]+?):\*\*\s*(.*)", texto)
        if m:  # "**Resposta do Complete:** ..." também fica escondida
            out.append(f'<details class="respostas"><summary>{inline(m.group(1))}: mostrar</summary><div><p>{inline(m.group(2))}</p></div></details>')
        else:
            out.append(f"<p>{inline(texto)}</p>")
    return "\n".join(out)


def secao(titulo, num, linhas):
    """Uma seção ##; as partes "### Respostas" viram respostas escondidas."""
    partes, atual = [], []
    for l in linhas:
        if l.startswith("### "):
            partes.append(atual)
            atual = [l]
        else:
            atual.append(l)
    partes.append(atual)
    dobrar = num != "4min"
    corpo = []
    for p in partes:
        if p and re.match(r"### Respostas?\b", p[0]):
            rot = p[0][4:].strip()
            corpo.append(f'<details class="respostas"><summary>{inline(rot)}: mostrar</summary><div>{blocos(p[1:])}</div></details>')
        else:
            corpo.append(blocos(p, dobrar))
    html_corpo = "\n".join(corpo)
    opcional = any(titulo.startswith(o) for o in OPCIONAIS)
    if dobrar and not opcional:
        # tarefas e respostas da etapa saem do meio do texto e vão juntas para o fim, num só "abre com um toque"
        pratica = re.findall(r'<aside class="call (?:%s)">.*?</aside>|<details class="respostas">.*?</details>' % "|".join(TAREFAS), html_corpo, re.S)
        if pratica:
            for x in pratica:
                html_corpo = html_corpo.replace(x, "", 1)
            html_corpo += ('\n<details class="dobra pratica"><summary>Pratique esta etapa: exercícios com respostas</summary>'
                           + "\n".join(pratica) + "</details>")
    if opcional:
        html_corpo = f'<details class="dobra sec-opc"><summary>Abrir esta seção</summary>{html_corpo}</details>'
    classe = "bloco sec" + (" rapido" if num == "4min" else "") + (" ref" if titulo.lower().startswith("para consultar") else "") + (" opc" if opcional else "")
    selo = '<span class="tag-opc">Opcional</span>' if opcional else ""
    return (f'<section class="{classe}" id="{slugify(titulo)}"><h2><span class="num">{"" if num == "4min" else num}</span>{inline(titulo)}{selo}</h2>\n'
            + html_corpo + "\n</section>")


def visiveis(html_txt):
    """Palavras do que fica à vista (fora dos "abre com um toque"): base do tempo de leitura do topo."""
    sem = re.sub(r"<details.*?</details>", " ", html_txt, flags=re.S)
    while "<details" in sem:
        sem = re.sub(r"<details.*?</details>", " ", sem, flags=re.S)
    return len(re.findall(r"\w+", html.unescape(re.sub(r"<[^>]+>", " ", sem))))


def pagina(meta, md):
    linhas = md.split("\n")
    intro, secoes, atual = "", [], None
    for l in linhas:
        m = re.match(r"## (\w+)\. (.+)", l)
        if m:
            atual = [m.group(2).strip(), m.group(1), []]
            secoes.append(atual)
        elif atual:
            atual[2].append(l)
        elif l.startswith("*") and not intro:
            intro = l.strip().strip("*").strip()
    e = html.escape
    url = f"{SITE}/como-jogar/{meta['slug']}/"
    d = meta["data"]
    data_longa = f"{int(d[8:10])} de {MESES[int(d[5:7]) - 1]} de {d[:4]}"
    rapido = [s for s in secoes if s[1] == "4min"]
    resto = [s for s in secoes if s[1] != "4min"]
    indice = "".join(f'<li><a href="#{slugify(t)}">{e(t)}</a>{" <small>(opcional)</small>" if any(t.startswith(o) for o in OPCIONAIS) else ""}</li>' for t, _, _ in rapido + resto)
    secs_html = "\n".join(secao(t, n, c) for t, n, c in resto)
    # no "comece em 4 minutos", "etapa 4" vira link para a seção da etapa
    etapas_id = {m.group(1): slugify(t) for t, _, _ in resto if (m := re.match(r"Etapa (\d+)", t))}
    rapido_html = re.sub(r"\betapa (\d+)\b", lambda m: f'<a href="#{etapas_id[m.group(1)]}">etapa {m.group(1)}</a>' if m.group(1) in etapas_id else m.group(0),
                         "\n".join(secao(t, n, c) for t, n, c in rapido))
    leitura = max(1, round(visiveis(secs_html) / PALAVRAS_MIN))
    resenha = ""
    if meta.get("resenha") and (ROOT / meta["resenha"] / "index.html").exists():
        resenha = (f'<section class="bloco"><p class="sec-intro">Quer saber se vale a pena antes de jogar? '
                   f'<a href="../../{meta["resenha"]}/">Leia a nossa resenha de {e(meta["jogo"])}</a>.</p></section>')
    css = (ROOT / "tools" / "como_jogar.css").read_text(encoding="utf-8").replace("FONTES/", "../../fontes/")
    return f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(meta['titulo'])}: regras passo a passo | Elite Boardgamers</title>
<meta name="description" content="{e(meta['descricao'])}">
<link rel="canonical" href="{url}">
<meta name="robots" content="max-image-preview:large">
<meta property="og:type" content="article">
<meta property="og:title" content="{e(meta['titulo'])}">
<meta property="og:description" content="{e(meta['descricao'])}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE}/marca/banner-1200.webp">
<link rel="icon" href="../../favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="../../favicon-32.png">
<link rel="apple-touch-icon" href="../../apple-touch-icon.png">
<link rel="preload" href="../../fontes/public-sans.woff2" as="font" type="font/woff2" crossorigin>
<style>
{css}</style>
</head>
<body>
<!--moldura--><!--/moldura-->

<main id="conteudo" class="gut"><div class="nota">
  <nav class="trilha" aria-label="Trilha de navegação"><ol><li><a href="../../">Início</a></li><li><a href="../">Como jogar</a></li><li aria-current="page">{e(meta['jogo'])}</li></ol></nav>

  <article class="bloco">
    <span class="num-l">{e(meta['genero'])}</span>
    <h1>{e(meta['titulo'])}</h1>
    <p class="meta-e"><span>Para quem nunca jogou</span><span>{e(meta['jogadores'])}</span><span>{e(meta['duracao'])}</span><span>{e(meta['idade'])}</span><span>{e(meta['edicao'])}</span></p>
    <p class="meta"><time datetime="{d}">{data_longa}</time> · Redação Elite Boardgamers</p>
  </article>

  <section class="bloco r1" aria-label="Resumo em 1 minuto">
    <span class="kick">Resumo em 1 minuto</span>
    <p class="resp">{e(meta['resumo'])}</p>
    <ul>{"".join(f"<li>{CHECK}<span>{e(p)}</span></li>" for p in meta['pontos'])}</ul>
    <p class="pe"><span><b>Como você aprende:</b> {meta['etapas']} etapas, da mesa montada à contagem de pontos</span><span><b>Leitura do essencial:</b> cerca de {leitura} min</span></p>
    <p class="legenda-f"><b>À vista, só o essencial para jogar.</b> O que abre com <span class="mais-i">+</span> é explicação, exemplo, exercício ou regra de caso especial: abra quando precisar.</p>
  </section>

{rapido_html}
  <nav class="bloco indice" aria-label="Neste guia"><h2>Neste guia</h2><ol>{indice}</ol></nav>

{secs_html}
{resenha}
<p class="nota-pe">{inline(intro)}</p>
</div></main>

<!--rodape--><!--/rodape-->
</body>
</html>
"""


def metas():
    pasta = ROOT / "conteudo" / "como-jogar"
    return [json.loads(p.read_text(encoding="utf-8")) for p in sorted(pasta.glob("*.json"))] if pasta.exists() else []


def build():
    """Gera a página de cada tutorial que tem tutorial.md; devolve os slugs gerados."""
    feitos = []
    for meta in metas():
        md = ROOT / (meta.get("md") or f"docs/como-jogar/{meta['slug']}/tutorial.md")
        if meta.get("html_manual") or not md.exists():
            continue
        destino = ROOT / "como-jogar" / meta["slug"] / "index.html"
        destino.parent.mkdir(parents=True, exist_ok=True)
        novo = pagina(meta, md.read_text(encoding="utf-8"))
        # sempre do zero: a moldura do site entra logo depois, em build_como_jogar.py
        destino.write_text(novo, encoding="utf-8")
        feitos.append(meta["slug"])
    return feitos


if __name__ == "__main__":
    print("ok", build())
