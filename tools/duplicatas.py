"""Verificação de postagens duplicadas da Elite Boardgamers (pedido do usuário em 05/11/2026).

Confere:
  1. Página do Black (black/index.html): o mesmo jogo duas vezes na mesma seção, ou ao mesmo tempo em "Bem avaliados"
     (#todas) e "Outras promoções" (#outras).
  2. Notícias (conteudo/noticias/*.json): duas notas sobre o mesmo fato — títulos muito parecidos (similaridade 0,72
     ou mais) publicados com até 10 dias de distância, ou o mesmo slug com sufixo diferente.

Uso:
  python3 tools/duplicatas.py           relatório; sai com erro se achar duplicata
  python3 tools/duplicatas.py --json    o mesmo relatório em JSON (para a rotina diária)
A rotina diária (tarefa agendada "Verificação de duplicatas") roda este script, tira as duplicadas na origem (código do
Black ou JSON da notícia mais nova, apagando a pasta noticias/<slug>/ e as referências em conteudo/home.json), regera
e publica.
"""
import collections
import datetime as dt
import difflib
import html
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def norm(t):
    t = unicodedata.normalize("NFKD", html.unescape(str(t or ""))).encode("ascii", "ignore").decode().lower()
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", t)).strip()


def black():
    p = ROOT / "black" / "index.html"
    if not p.exists():
        return []
    h = p.read_text(encoding="utf-8")
    achados, por_secao = [], {}
    for bloco in re.split(r'<section id="', h)[1:]:
        nome = bloco.split('"', 1)[0]
        if nome in ("alertas", "cupons"):
            continue
        nomes = [norm(t) for t in re.findall(r"<h3[^>]*>(?:<a[^>]*>)?([^<]+)", bloco)]
        nomes += [norm(t) for t in re.findall(r'<p class="cup-loja">([^<]+)', bloco)]
        por_secao[nome] = nomes
        for n, c in collections.Counter(nomes).items():
            if c > 1:
                achados.append({"onde": f"black#{nome}", "item": n, "vezes": c})
    for n in set(por_secao.get("todas", [])) & set(por_secao.get("outras", [])):
        achados.append({"onde": "black#todas e black#outras", "item": n, "vezes": 2})
    return achados


def noticias():
    ns = []
    for p in sorted((ROOT / "conteudo" / "noticias").glob("*.json")):
        try:
            n = json.loads(p.read_text(encoding="utf-8"))
        except ValueError:
            continue
        ns.append((p, n))
    achados = []
    for i, (pa, a) in enumerate(ns):
        for pb, b in ns[i + 1:]:
            try:
                dias = abs((dt.date.fromisoformat(a["data"]) - dt.date.fromisoformat(b["data"])).days)
            except (KeyError, ValueError):
                continue
            if dias > 10:
                continue
            sim = difflib.SequenceMatcher(None, norm(a.get("titulo")), norm(b.get("titulo"))).ratio()
            raiz = lambda s: re.sub(r"-\d+$", "", s)  # noqa: E731
            if sim >= 0.72 or raiz(a["slug"]) == raiz(b["slug"]):
                velha, nova = sorted([(a["data"], a["slug"], pa.name), (b["data"], b["slug"], pb.name)])
                achados.append({"onde": "noticias", "item": f"{velha[1]} ({velha[0]}) × {nova[1]} ({nova[0]})",
                                "similaridade": round(sim, 2), "tirar": nova[2]})
    return achados


def main():
    tudo = black() + noticias()
    if "--json" in sys.argv:
        print(json.dumps(tudo, ensure_ascii=False, indent=1))
    else:
        print("ok: nenhuma postagem duplicada" if not tudo else "\n".join(
            f"❌ {x['onde']}: {x['item']}" + (f" (similaridade {x['similaridade']})" if "similaridade" in x else f" ({x['vezes']} vezes)")
            for x in tudo))
    sys.exit(1 if tudo else 0)


if __name__ == "__main__":
    main()
