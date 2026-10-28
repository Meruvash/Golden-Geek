"""Confere uma notícia contra o padrão editorial das notícias (PADRAO_EDITORIAL.md).

Uso: python3 tools/noticias/checar_noticia.py [conteudo/noticias/<arquivo>.json ...]  (sem argumentos, todas)
Sai com erro se alguma nota não passar; tools/build_home.py usa a mesma função e se recusa a publicar.
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent
SELOS = {"Vale a compra", "Vale acompanhar", "Para fãs do jogo base", "Com ressalvas", "Informativo"}
FAIXAS = {"titulo": (8, 16), "lide": (35, 70), "por_que_importa": (30, 70), "no_brasil": (25, 80), "veredito": (20, 60)}


def palavras(t):
    return len(t.split())


def problemas(n):
    erros = []
    for campo, (a, b) in FAIXAS.items():
        if not n.get(campo):
            erros.append(f"falta {campo}")
        elif not a <= palavras(n[campo]) <= b:
            erros.append(f"{campo} com {palavras(n[campo])} palavras (padrão: {a} a {b})")
    if n.get("selo") not in SELOS:
        erros.append(f"selo inválido: {n.get('selo')!r}")
    corpo = sum(palavras(p) for p in n.get("corpo", []))
    if not 1 <= len(n.get("corpo", [])) <= 3 or not 40 <= corpo <= 200:
        erros.append(f"contexto com {len(n.get('corpo', []))} parágrafos e {corpo} palavras (padrão: 1 a 3, 40 a 200)")
    nums = n.get("numeros", [])
    if not 2 <= len(nums) <= 4 or any(len(x) != 3 or not x[2] for x in nums):
        erros.append("números: 2 a 4 itens [valor, rótulo, fonte], todos com fonte")
    crit = n.get("critica", [])
    if len(crit) > 3 or any(not c.get("fonte") or not c.get("texto") for c in crit) or (not crit and n.get("selo") != "Informativo"):
        erros.append("crítica: 1 a 3 itens com fonte e texto (só nota Informativo pode sair sem crítica)")
    if not 1 <= len(n.get("para_quem", [])) <= 3 or len(n.get("nao_e_para", [])) > 3:
        erros.append("para_quem: 1 a 3 itens; nao_e_para: até 3")
    if len(n.get("fontes", [])) < 2 or any(not f.get("url") or not f.get("data") for f in n.get("fontes", [])):
        erros.append("fontes: pelo menos 2, com link e data")
    if n.get("crivo", {}).get("pontos", 0) < 5:
        erros.append("crivo abaixo de 5 pontos")
    return erros


if __name__ == "__main__":
    arqs = [Path(a) for a in sys.argv[1:]] or sorted((ROOT / "conteudo" / "noticias").glob("*.json"))
    ruim = 0
    for a in arqs:
        e = problemas(json.loads(a.read_text(encoding="utf-8")))
        print(("✅ " if not e else "❌ ") + a.name + ("" if not e else "\n   - " + "\n   - ".join(e)))
        ruim += bool(e)
    sys.exit(1 if ruim else 0)
