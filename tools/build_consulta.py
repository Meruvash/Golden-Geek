"""Escreve no HTML de consulta/index.html a lista do Golden Geek que o JavaScript monta no navegador.

Uso: python3 tools/build_consulta.py   (também roda no fim de build_home.py)
Também reescreve o cabeçalho, o menu e o rodapé com a moldura comum de tools/layout.py.
A fonte continua sendo o bloco RAW dentro da própria página. Este script repete, em Python, o render() do estado
inicial (sem filtros) e grava o resultado dentro de <div id="out">, para que buscadores e robôs de IA que não
executam JavaScript leiam a lista inteira. No navegador, o render() troca esse conteúdo por um idêntico.
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from layout import cabecalho, rodape  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
ARQ = ROOT / "consulta" / "index.html"
PLACE = ["1º", "2º", "3º"]


def esc(s):
    """Mesmo esc() do JavaScript da página."""
    return "".join({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}.get(ch, ch) for ch in s)


def tabela(s):
    raw = re.search(r"const RAW = `(.*?)`", s, re.S).group(1)
    oficial = dict(re.findall(r'^\s*"(.+?)": "(.+?)",?$', re.search(r"const OFFICIAL = \{(.*?)\};", s, re.S).group(1), re.M))
    rows = []
    for linha in raw.strip().split("\n"):
        linha = linha.strip()
        if not linha:
            continue
        y, c, g = linha.split(" | ")
        rows += [{"y": y, "c": c, "p": i + 1, "n": n} for i, n in enumerate(g.split("; "))]
    occ = {}
    for r in rows:
        occ.setdefault(r["n"], []).append(r)
    body, key = "", None
    for r in rows:
        k = r["y"] + "|" + r["c"]
        if k != key:
            if key is not None:
                body += "</tbody>"
            key = k
            en = f'<span class="ge">{esc(oficial[r["c"]])}</span>' if r["c"] in oficial else ""
            body += f'<tbody><tr class="grp"><th colspan="4"><span class="gy">{r["y"]}</span><span class="gc">{esc(r["c"])}</span>{en}</th></tr>'
        n = len(occ[r["n"]])
        badge = f'<button type="button" class="multi" data-g="{esc(r["n"])}" title="Ver todas as aparições">{n} aparições</button>' if n > 1 else ""
        body += (f'<tr class="row{" first" if r["p"] == 1 else ""}"><td class="y">{r["y"]}</td><td class="c">{esc(r["c"])}</td>'
                 f'<td class="pos">{PLACE[r["p"] - 1]}</td><td class="g">{esc(r["n"])}{badge}</td></tr>')
    body += "</tbody>"
    total = f'{len(rows)} {"resultado" if len(rows) == 1 else "resultados"}'
    return f"<table><thead><tr><th>Ano</th><th>Categoria</th><th>Colocação</th><th>Jogo</th></tr></thead>{body}</table>", total


def build():
    s = ARQ.read_text(encoding="utf-8")
    html_tabela, total = tabela(s)
    novo = re.sub(r'<div id="out">.*?</div>(?=\n\n <a class="zap")', lambda _: f'<div id="out">{html_tabela}</div>', s, count=1, flags=re.S)
    # moldura comum do site (tools/layout.py)
    novo = re.sub(r'<header class="(?:top)?bar".*?</nav>', lambda _: cabecalho("../", "Consulta Golden Geek"), novo, count=1, flags=re.S)
    novo = re.sub(r'<footer>.*?</footer>', lambda _: rodape("../"), novo, count=1, flags=re.S)
    novo = re.sub(r'<span id="count" class="count">[^<]*</span>', f'<span id="count" class="count">{total}</span>', novo, count=1)
    if novo != s:
        ARQ.write_text(novo, encoding="utf-8")
    return total


if __name__ == "__main__":
    print("ok consulta/index.html:", build())
