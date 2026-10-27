"""Publica resenhas aprovadas: status `publicado` em pauta.json e regera resenhas/index.html (build_lista.py).

Uso: python3 tools/publicar.py conteudo/<slug>.json [...]
Requer <slug>/index.html (build_review.py), <slug>/infografico.webp e <slug>/capa.jpg.
"""
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from checar_roteiro import checar_texto  # noqa: E402
SITE = "https://meruvash.github.io/Golden-Geek"


def main():
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    for arg in sys.argv[1:]:
        c = json.loads(Path(arg).read_text(encoding="utf-8"))
        erros = checar_texto(c)
        if erros:
            print(*erros, sep="\n - ")
            sys.exit(f"{c['slug']}: texto do site fora do PADRAO_EDITORIAL.md; nada foi publicado.")
        for f in ("index.html", "infografico.webp", "capa.jpg"):
            if not (ROOT / c["slug"] / f).exists():
                sys.exit(f"Falta {c['slug']}/{f}")
        for j in pauta["jogos"]:
            if j["jogo"] == c["jogo"]:
                j["status"] = "publicado"
        if not any(p["jogo"] == c["jogo"] for p in pauta["publicadas"]):
            pauta["publicadas"].append({"jogo": c["jogo"], "url": f'{SITE}/{c["slug"]}/', "data": date.today().isoformat()})
        print("publicado", c["slug"])
    pauta["atualizado_em"] = date.today().isoformat()
    (ROOT / "pauta.json").write_text(json.dumps(pauta, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main()
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import build_lista
    (ROOT / "resenhas" / "index.html").write_text(build_lista.build(), encoding="utf-8")
    print("ok resenhas/index.html")
    # Regera todas as resenhas publicadas: o bloco "Continue lendo" de cada uma passa a incluir a nova.
    import build_review
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    for p in pauta["publicadas"]:
        slug = p["url"].rstrip("/").split("/")[-1]
        c = json.loads((ROOT / "conteudo" / f"{slug}.json").read_text(encoding="utf-8"))
        (ROOT / slug / "index.html").write_text(build_review.build(c), encoding="utf-8")
    print("ok", len(pauta["publicadas"]), "resenhas regeradas")
