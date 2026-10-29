"""Confere uma notícia contra o padrão editorial das notícias (PADRAO_EDITORIAL.md).

Uso: python3 tools/noticias/checar_noticia.py [conteudo/noticias/<arquivo>.json ...]  (sem argumentos, todas)
Sai com erro se alguma nota não passar; tools/build_home.py usa a mesma função e se recusa a publicar.
"""
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent.parent
SELOS = {"Vale a compra", "Vale acompanhar", "Para fãs do jogo base", "Com ressalvas", "Informativo"}
FAIXAS = {"titulo": (8, 16), "lide": (35, 70), "por_que_importa": (30, 70), "no_brasil": (25, 80), "veredito": (20, 60)}


def palavras(t):
    return len(t.split())


# Edição nacional: dizer que um jogo não saiu no Brasil é afirmação grave e já erramos por deduzir isso
# da falta de notícia de lançamento (Galactic Cruise, Rebirth, Hot Streak). Toda frase de ausência precisa
# de verificação registrada em `verificacao_nacional`, e frases categóricas são proibidas.
_ED = r"(edição|edições|versão|lançamento|editora)[^.;:]{0,25}(nacional|brasileira|em português|no brasil)"
AUSENCIA = re.compile(r"(\bsem\b|não há|não tem|não existe|nenhuma|não encontramos|não confirmamos|ainda não)[^.;:]{0,60}" + _ED, re.I)
CATEGORICO = re.compile(r"((não há|não tem|não existe|ainda não há|nenhuma)[^.;:]{0,40}" + _ED +
                        r"|\bsem (edição|versão) (nacional|brasileira|em português)\b(?! (encontrada|confirmada)))", re.I)
RESULTADOS = {"edição nacional", "não encontrada"}
MINIMO, DESDE = 5, "2026-10-29"  # notas por dia, no mínimo, sem máximo; regra da manchete vale desde DESDE (PLANO_NOTICIAS.md)


def textos(n):
    for campo in ("titulo", "lide", "por_que_importa", "no_brasil", "veredito"):
        yield n.get(campo) or ""
    yield from n.get("corpo", [])
    yield from n.get("para_quem", [])
    yield from n.get("nao_e_para", [])
    yield from (c.get("texto", "") for c in n.get("critica", []))


def checar_edicao_nacional(n):
    erros = []
    frases = [f for t in textos(n) for f in re.split(r"(?<=[.!?])\s+", t) if AUSENCIA.search(f)]
    for f in frases:
        if CATEGORICO.search(f):
            erros.append(f"edição nacional: frase categórica {f!r}. Escreva o que foi verificado: "
                         "'não encontramos edição nacional (na Ludopedia, no ComparaJogos e em lojas) até <data>'")
    ver = n.get("verificacao_nacional") or []
    for v in ver:
        fontes = v.get("fontes") or []
        if v.get("resultado") not in RESULTADOS or not v.get("jogo") or not v.get("data"):
            erros.append(f"verificacao_nacional: cada item precisa de jogo, data e resultado ({' ou '.join(sorted(RESULTADOS))})")
        if len(fontes) < 2 or not any(urlparse(u).netloc.endswith(".br") for u in fontes):
            erros.append(f"verificacao_nacional de {v.get('jogo')!r}: pelo menos 2 fontes com link, uma delas brasileira "
                         "(Ludopedia, ComparaJogos ou loja); rode tools/noticias/edicao_nacional.py")
        if v.get("resultado") == "não encontrada" and not any("comparajogos.com.br" in u for u in fontes):
            erros.append(f"verificacao_nacional de {v.get('jogo')!r}: ausência precisa do link do ComparaJogos "
                         "(saída de tools/noticias/edicao_nacional.py), que mostra se há loja brasileira vendendo")
    if frases and not any(v.get("resultado") == "não encontrada" for v in ver):
        erros.append("edição nacional: a nota diz que não há edição nacional, mas não registra a verificação "
                     "(campo verificacao_nacional; ver PADRAO_EDITORIAL.md)")
    for v in ver:
        if v.get("resultado") == "edição nacional":
            for f in frases:
                if v.get("jogo", "").lower() in f.lower():
                    erros.append(f"edição nacional: {v['jogo']} tem edição nacional verificada, mas o texto diz o contrário: {f!r}")
    return erros


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
    # Ludopedia só nas fontes (pedido do usuário em 29/10/2026): no texto, o calendário é o nosso
    for t in list(textos(n)) + [n.get("titulo_seo") or ""] + [x[1] for x in n.get("numeros", []) if len(x) > 1] + n.get("crivo", {}).get("criterios", []):
        if re.search(r"ludop[eé]dia", t, re.I):
            erros.append(f"texto cita a Ludopedia ({t[:60]!r}…): escreva 'nosso calendário de lançamentos'; a Ludopedia fica só nas fontes")
            break
    if not isinstance(n.get("crivo", {}).get("pontos"), int):
        erros.append("crivo sem pontos")
    return erros + checar_edicao_nacional(n)


def checar_dia(ns):
    """Edição diária (pedido do usuário em 29/10/2026): no mínimo MINIMO notas por dia e sem máximo;
    quanto mais notícia boa, melhor. Aqui só se confere que a manchete é a nota de maior pontuação do dia."""
    erros = []
    por_dia = {}
    for n in ns:
        if n.get("data", "") >= DESDE:
            por_dia.setdefault(n["data"], []).append(n)
    for dia, lista in por_dia.items():
        pts = [n["crivo"].get("pontos", 0) for n in lista]
        if any(n.get("manchete") and n["crivo"].get("pontos", 0) < max(pts) for n in lista):
            erros.append(f"{dia}: a manchete precisa ser a nota de maior pontuação do dia")
    return erros


if __name__ == "__main__":
    arqs = [Path(a) for a in sys.argv[1:]] or sorted((ROOT / "conteudo" / "noticias").glob("*.json"))
    ruim = 0
    for a in arqs:
        e = problemas(json.loads(a.read_text(encoding="utf-8")))
        print(("✅ " if not e else "❌ ") + a.name + ("" if not e else "\n   - " + "\n   - ".join(e)))
        ruim += bool(e)
    todas = [json.loads(p.read_text(encoding="utf-8")) for p in sorted((ROOT / "conteudo" / "noticias").glob("*.json"))]
    for e in checar_dia(todas):
        print("❌ " + e)
        ruim += 1
    sys.exit(1 if ruim else 0)
