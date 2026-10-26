"""Monta o prompt do infográfico quadrado a partir do roteiro em conteudo/<slug>.json.

Uso: python3 tools/prompt_infografico.py conteudo/<slug>.json [...]
"""
import json
import sys


def prompt(c):
    r = c["roteiro"]
    q = lambda s: f'"{s}"'
    lista = lambda xs: " · ".join(q(x) for x in xs)
    passos = "\n".join(f"Step {i} {q(t)} — {q(d)}" for i, (t, d) in enumerate(r["passos"], 1))
    numeros = " · ".join(f"{q(k)} {q(v)}" for k, v in r["numeros"])
    return f"""Use the reference images ONLY as the style and layout template for an "ELITE BOARDGAMERS" board game review infographic: same dark navy background, glowing neon-bordered panels, gold "ELITE BOARDGAMERS" crown logo top-left, huge bold 3D title at the top, a left sidebar of icon + text info rows, stat boxes, a stylized game box with components on the table, a numbered 5-step "COMO FUNCIONA?" row with colored cards (blue, green, orange, purple, red), a green "PONTOS FORTES" panel with check marks, a red "PONTOS DE ATENÇÃO" panel with X marks, a blue "FICHA TÉCNICA" panel, a "PRÊMIOS" panel with gold laurel medals, and a gold "VEREDITO ELITE BOARDGAMERS" bar with a crown at the bottom.
IMPORTANT: the output is a SQUARE 1:1 Instagram post, not a tall poster. Compress the same structure into a square: title band on top, box+components and stats in the middle, 5-step row, then the three panels, then awards + verdict at the bottom. Keep text large and legible on a phone.

Theme for this game, {c["jogo"]}: {r["tema"]}. Top artwork: {r["cena"]}. Box art and table: stylized illustration of {r["mesa"]}. Do not reuse imagery from the reference games. Stylized illustrations only; no real publisher logos.

Render EXACTLY this Portuguese text, spelled exactly as written with correct accents, and no other text:
Logo: "ELITE BOARDGAMERS"
Title: {q(r["titulo"])}
Tagline banner: {q(r["chamada"])}
Sidebar rows: {lista(r["lateral"])}
Stat boxes: {numeros}
"COMO FUNCIONA?"
{passos}
Green panel "PONTOS FORTES": {lista(r["fortes"])}
Red panel "PONTOS DE ATENÇÃO": {lista(r["atencao"])}
Blue panel "FICHA TÉCNICA": {lista(r["ficha"])}
Awards panel "PRÊMIOS": three gold medals: {lista(r["premios"])}
Verdict bar: "VEREDITO ELITE BOARDGAMERS" — {q(r["veredito"])}"""


if __name__ == "__main__":
    out = {}
    for a in sys.argv[1:]:
        c = json.load(open(a, encoding="utf-8"))
        out[c["slug"]] = prompt(c)
    print(json.dumps(out, ensure_ascii=False))
