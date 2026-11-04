"""Lista pública alertas/conteudo.json: as notícias e resenhas mais recentes, que o serviço de notificações do site
(worker em api.eliteboardgamers.com.br, src/push.js) lê a cada minuto para avisar quem ligou o sininho de Notícias
ou de Resenhas. Roda sozinho no fim do tools/build_home.py.

Cada item: {id, tema ("noticias" ou "resenhas"), hora (UTC, ISO), titulo, texto, url, imagem}. A hora da notícia é a
de publicação (publicado_em); a da resenha é a primeira vez que este script a viu publicada (guardada em
conteudo/alertas_conteudo_estado.json), para que corrigir uma página nunca dispare o aviso de novo.

Uso: python3 tools/alertas_site.py
"""
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://eliteboardgamers.com.br"
SAIDA = ROOT / "alertas" / "conteudo.json"
ESTADO = ROOT / "conteudo" / "alertas_conteudo_estado.json"
LIMITE = 20  # por tema


def utc(iso):
    d = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    if d.tzinfo is None:
        d = d.replace(tzinfo=timezone.utc)
    return d.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def corta(t, n=170):
    t = " ".join(str(t or "").split())
    return t if len(t) <= n else t[: n - 1].rsplit(" ", 1)[0] + "…"


def gerar():
    agora = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    try:
        visto = json.loads(ESTADO.read_text(encoding="utf-8"))
    except (FileNotFoundError, ValueError):
        visto = {}
    itens = []
    for p in (ROOT / "conteudo" / "noticias").glob("*.json"):
        n = json.loads(p.read_text(encoding="utf-8"))
        if not n.get("publicado_em") or not (ROOT / "noticias" / n["slug"] / "index.html").exists():
            continue
        img = n.get("imagem") or {}
        itens.append({"id": "n-" + n["slug"], "tema": "noticias", "hora": utc(n["publicado_em"]),
                      "titulo": "📰 " + corta(n["titulo"], 110), "texto": corta(n.get("por_que_importa") or n.get("lide")),
                      "url": f"{SITE}/noticias/{n['slug']}/",
                      "imagem": f"{SITE}/noticias/{img['arquivo']}" if img.get("arquivo") else None})
    pauta = json.loads((ROOT / "pauta.json").read_text(encoding="utf-8"))
    for pub in pauta.get("publicadas", []):
        slug = pub["url"].rstrip("/").split("/")[-1]
        c = ROOT / "conteudo" / f"{slug}.json"
        if not c.exists() or not (ROOT / slug / "index.html").exists():
            continue
        r = json.loads(c.read_text(encoding="utf-8"))
        ident = "r-" + slug
        visto.setdefault(ident, agora)
        capa = ROOT / slug / "capa.jpg"
        itens.append({"id": ident, "tema": "resenhas", "hora": visto[ident],
                      "titulo": "⭐ Resenha: " + corta(r.get("jogo") or pub.get("jogo"), 90),
                      "texto": corta(r.get("tagline") or r.get("descricao") or r.get("selo")),
                      "url": f"{SITE}/{slug}/", "imagem": f"{SITE}/{slug}/capa.jpg" if capa.exists() else None})
    saida = []
    for tema in ("noticias", "resenhas"):
        saida += sorted((x for x in itens if x["tema"] == tema), key=lambda x: x["hora"])[-LIMITE:]
    saida.sort(key=lambda x: x["hora"])
    SAIDA.parent.mkdir(parents=True, exist_ok=True)
    SAIDA.write_text(json.dumps(saida, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    ESTADO.write_text(json.dumps(visto, ensure_ascii=False, indent=1, sort_keys=True) + "\n", encoding="utf-8")
    return len(saida)


if __name__ == "__main__":
    print("ok alertas/conteudo.json:", gerar(), "itens")
