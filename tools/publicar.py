"""Publica resenhas aprovadas: card no topo de resenhas/index.html e status `publicado` em pauta.json.

Uso: python3 tools/publicar.py conteudo/<slug>.json [...]
Requer <slug>/index.html (build_review.py), <slug>/infografico.webp e <slug>/capa.jpg.
"""
import html
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://meruvash.github.io/Golden-Geek"
e = html.escape


def card(c):
    return f"""  <a class="card" href="../{c["slug"]}/">
   <img src="../{c["slug"]}/capa.jpg" width="800" height="800" alt="{e(c["alt"])}" loading="lazy">
   <div class="body">
    <div class="kicker">{e(c["kicker"])}</div>
    <h2>{e(c["og_titulo"].split(" Resenha")[0])}</h2>
    <p>{e(c["descricao"])}</p>
   </div>
  </a>
"""


def main():
    idx = ROOT / "resenhas" / "index.html"
    pagina = idx.read_text(encoding="utf-8")
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    for arg in sys.argv[1:]:
        c = json.loads(Path(arg).read_text(encoding="utf-8"))
        for f in ("index.html", "infografico.webp", "capa.jpg"):
            if not (ROOT / c["slug"] / f).exists():
                sys.exit(f"Falta {c['slug']}/{f}")
        if f'href="../{c["slug"]}/"' not in pagina:
            pagina = pagina.replace(' <div class="grid">\n', ' <div class="grid">\n' + card(c), 1)
        for j in pauta["jogos"]:
            if j["jogo"] == c["jogo"]:
                j["status"] = "publicado"
        if not any(p["jogo"] == c["jogo"] for p in pauta["publicadas"]):
            pauta["publicadas"].append({"jogo": c["jogo"], "url": f'{SITE}/{c["slug"]}/', "data": date.today().isoformat()})
        print("publicado", c["slug"])
    pauta["atualizado_em"] = date.today().isoformat()
    idx.write_text(pagina, encoding="utf-8")
    (ROOT / "pauta.json").write_text(json.dumps(pauta, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
