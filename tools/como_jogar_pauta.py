"""Pauta do Como Jogar: que jogos de tabuleiro as pessoas mais procuram aprender no Brasil.

Uso: python3 tools/como_jogar_pauta.py [--top 10]
Duas fontes do Google, ambas por acesso normal (sem contornar limite):
  1. Google Trends, buscas relacionadas a "jogo de tabuleiro" e "como jogar jogo de tabuleiro" no Brasil (12 meses),
     com a coluna "subindo". O Trends limita acessos seguidos (erro 429): nesse caso o script segue só com a fonte 2.
  2. Autocompletar do Google e do YouTube para "como jogar <jogo>": quantas variações aparecem (mais variações = mais procura).
Os candidatos são jogos de tabuleiro modernos (lista abaixo, mais os que o Trends trouxer); ficam de fora os que já
têm tutorial em conteudo/como-jogar/ e os clássicos de domínio público (xadrez, dama, dominó, truco, baralho).
Grava conteudo/como_jogar_pauta.json com o ranking e a data, e imprime o resultado.
"""
import http.cookiejar
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CANDIDATOS = ["catan", "azul", "ticket to ride", "dixit", "codenames", "carcassonne", "splendor", "7 wonders", "7 wonders duel",
              "king of tokyo", "pandemic", "wingspan", "cascadia", "root", "terraforming mars", "dune imperium", "patchwork",
              "sushi go", "love letter", "the mind", "the crew", "coup", "exploding kittens", "detetive", "war", "perfil",
              "ark nova", "everdell", "harmonies", "heat", "sky team", "flip 7", "bang", "uno flip", "takenoko", "kingdomino"]
# buscas que falam de videogame, não do jogo de mesa ("como jogar the crew" é quase tudo sobre o jogo de corrida)
VIDEOGAME = re.compile(r"\b(pc|ps[2-5]|playstation|xbox|switch|steam|motorfest|motorsport|celular|roblox|minecraft|free fire|online|mobile|android|iphone|ps plus)\b", re.I)
FORA = {"xadrez", "dama", "dominó", "domino", "truco", "baralho", "uno", "sudoku", "ludo", "trilha", "jogo da velha", "resta um"}


def sugestoes(q, yt=False):
    url = ("https://suggestqueries.google.com/complete/search?hl=pt-BR&gl=br&"
           + ("client=youtube&ds=yt&" if yt else "client=firefox&") + "q=" + urllib.parse.quote(q))
    t = urllib.request.urlopen(url, timeout=20).read().decode("utf-8", "ignore")
    if yt:
        return re.findall(r'\["([^"]+)",0', t)
    return json.loads(t)[1]


def trends(termo):
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    op.addheaders = [("User-Agent", "Mozilla/5.0"), ("Accept-Language", "pt-BR")]
    j = lambda t: json.loads(t[t.index("{"):])
    req = {"comparisonItem": [{"keyword": termo, "geo": "BR", "time": "today 12-m"}], "category": 0, "property": ""}
    ws = j(op.open("https://trends.google.com/trends/api/explore?hl=pt-BR&tz=180&req=" + urllib.parse.quote(json.dumps(req)), timeout=30).read().decode())["widgets"]
    w = next(w for w in ws if w["id"] == "RELATED_QUERIES")
    d = j(op.open("https://trends.google.com/trends/api/widgetdata/relatedsearches?hl=pt-BR&tz=180&req="
                  + urllib.parse.quote(json.dumps(w["request"])) + "&token=" + w["token"], timeout=30).read().decode())
    top, subindo = (d["default"]["rankedList"] + [{"rankedKeyword": []}] * 2)[:2]
    return [(k["query"], k.get("formattedValue")) for k in top["rankedKeyword"]], [(k["query"], k.get("formattedValue")) for k in subindo["rankedKeyword"]]


def main():
    top_n = int(sys.argv[sys.argv.index("--top") + 1]) if "--top" in sys.argv else 10
    feitos = {json.loads(p.read_text(encoding="utf-8"))["jogo"].lower() for p in (ROOT / "conteudo" / "como-jogar").glob("*.json")}
    trend = {"relacionadas": [], "subindo": [], "erro": None}
    for termo in ("jogo de tabuleiro", "como jogar jogo de tabuleiro"):
        try:
            t, s = trends(termo)
            trend["relacionadas"] += t
            trend["subindo"] += s
        except Exception as ex:  # noqa: BLE001  (429: o Trends limitou; segue com o autocompletar)
            trend["erro"] = str(ex)
        time.sleep(4)
    # nomes de jogo citados nas buscas do Trends entram como candidatos
    extras = {re.sub(r"\b(jogo|de|tabuleiro|como|jogar|regras|do)\b", "", q).strip() for q, _ in trend["relacionadas"] + trend["subindo"]}
    cands = list(dict.fromkeys(CANDIDATOS + [x for x in extras if x and len(x) > 2 and x not in FORA]))
    peso_trend = {}
    for q, v in trend["relacionadas"]:
        for c in cands:
            if re.search(rf"\b{re.escape(c)}\b", q):
                peso_trend[c] = max(peso_trend.get(c, 0), int(v) if str(v).isdigit() else 0)
    subindo = {c for q, _ in trend["subindo"] for c in cands if re.search(rf"\b{re.escape(c)}\b", q)}
    ranking = []
    for c in cands:
        if c in FORA or any(c in f or f in c for f in feitos):
            continue
        try:
            g, y = sugestoes(f"como jogar {c}"), sugestoes(f"como jogar {c}", yt=True)
        except Exception:  # noqa: BLE001
            continue
        g = [x for x in g if x.startswith(f"como jogar {c}")]
        y = [x for x in y if x.startswith(f"como jogar {c}")]
        # mais da metade das buscas sobre videogame: não é o jogo de mesa
        if sum(bool(VIDEOGAME.search(x)) for x in g + y) > len(g + y) / 2:
            continue
        g = [x for x in g if not VIDEOGAME.search(x)]
        y = [x for x in y if not VIDEOGAME.search(x)]
        nota = len(g) + len(y) / 2 + peso_trend.get(c, 0) / 10 + (3 if c in subindo else 0)
        ranking.append({"jogo": c, "nota": round(nota, 1), "google": len(g), "youtube": len(y), "trends": peso_trend.get(c), "subindo": c in subindo, "exemplos": g[:4]})
        time.sleep(0.3)
    ranking.sort(key=lambda r: -r["nota"])
    saida = {"data": date.today().isoformat(), "trends": trend, "ranking": ranking[:top_n]}
    (ROOT / "conteudo" / "como_jogar_pauta.json").write_text(json.dumps(saida, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    if trend["erro"]:
        print("Trends indisponível agora (", trend["erro"], "): ranking só pelo autocompletar.")
    for r in ranking[:top_n]:
        print(f'{r["nota"]:5}  {r["jogo"]}  (Google {r["google"]}, YouTube {r["youtube"]}, Trends {r["trends"]}{", subindo" if r["subindo"] else ""})')


if __name__ == "__main__":
    main()
