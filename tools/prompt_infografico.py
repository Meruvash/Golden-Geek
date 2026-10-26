"""Monta o prompt do infográfico (GPT Image 2.5) a partir do roteiro em conteudo/<slug>.json."""
import json
import sys


def prompt(c):
    r = c["roteiro"]
    q = lambda s: f'"{s}"'
    cols = "\n".join(
        f"Column {i} title: {q(n)} — bullets: " + ", ".join(q(b) for b in bs)
        for i, (n, bs) in enumerate(r["colunas"], 1)
    )
    pros = "\n".join(f"  {q(k)}: {q(t)}" for k, t in r["funciona"])
    cons = "\n".join(f"  {q(k)}: {q(t)}" for k, t in r["atencao"])
    ver = "  ·  ".join(f"{q(k)} / {q(t)}" for k, t in r["veredito"])
    return f"""Use the reference image ONLY as a layout and style template: same dark, glowing neon-panel infographic style, "ELITE BOARDGAMERS" gold crown logo top-left, bold condensed headline at top, three columns each with a stylized illustration and icon bullets, a 4-chip info bar, a green "pros" panel on the left and a red "cons" panel on the right with small thumbnail art per row, and a gold "VEREDITO" bar at the bottom with a crown.
Replace the theme, colors and artwork to match the board game {c["jogo"]}: {r["tema"]}. Do not reuse any alien, Nemesis or sci-fi horror imagery.
Add a gold award seal near the headline.
Square 1:1 Instagram infographic, high legibility on a phone, crisp sharp text.

Render EXACTLY this Portuguese text, spelled exactly as written with correct accents, and no other text:
Logo: "ELITE BOARDGAMERS"
Headline: {q(r["titulo"])}
Subheadline: {q(r["subtitulo"])}
Award seal: {q(r["selo"])}
{cols}
Info bar chips: {", ".join(q(x) for x in r["chips"])}
Green panel title: "O QUE FUNCIONA MUITO BEM?" — rows (label: text):
{pros}
Red panel title: "PONTOS DE ATENÇÃO" — rows (label: text):
{cons}
Bottom bar: "VEREDITO:" then {ver}

Game art is a stylized illustration; no real publisher logos, no real box art."""


if __name__ == "__main__":
    out = {}
    for a in sys.argv[1:]:
        c = json.load(open(a, encoding="utf-8"))
        out[c["slug"]] = prompt(c)
    print(json.dumps(out, ensure_ascii=False))
