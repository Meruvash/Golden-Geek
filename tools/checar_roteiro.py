"""Confere o roteiro do infográfico e o texto do site contra o PADRAO_EDITORIAL.md (v2).

Uso: python3 tools/checar_roteiro.py conteudo/<slug>.json [...]
Sai com erro (código 1) e lista o que falta se algum roteiro não passar.
"""
import json
import re
import sys
from pathlib import Path

# Itens que serviriam para qualquer jogo: sozinhos não dizem nada.
GENERICOS = [
    "arte marcante", "arte bonita", "muito divertido", "divertido", "tema fino", "sorte nas cartas",
    "muito rápido", "rejogável", "boa rejogabilidade", "componentes bonitos", "fácil de aprender",
    "pontuações ruins às vezes", "bom para grupos",
]


def palavras(s):
    return len(re.findall(r"[\wÀ-ÿ'’,.%/–-]+", s))


def checar(c):
    r = c.get("roteiro") or {}
    erros = []

    def faixa(nome, texto, mn, mx):
        n = palavras(texto or "")
        if not mn <= n <= mx:
            erros.append(f"{nome}: {n} palavras (padrão: {mn} a {mx})")

    def qtd(nome, lista, mn, mx):
        n = len(lista or [])
        if not mn <= n <= mx:
            erros.append(f"{nome}: {n} itens (padrão: {mn} a {mx})")
        return lista or []

    for campo in ("tema", "cena", "mesa", "titulo"):
        if not r.get(campo):
            erros.append(f"{campo}: vazio")
    faixa("chamada", r.get("chamada"), 12, 22)
    faixa("destaque", r.get("destaque"), 15, 28)
    qtd("lateral", r.get("lateral"), 10, 10)
    for i, n in enumerate(qtd("numeros", r.get("numeros"), 4, 4), 1):
        if len(n) != 3 or not all(n):
            erros.append(f"numeros {i}: precisa de [rótulo, valor, contexto]")
        elif "confirmad" in " ".join(n).lower():
            erros.append(f"numeros {i}: caixa de número não pode ter dado não confirmado")
    faixa("como_resumo", r.get("como_resumo"), 8, 18)
    for i, (t, x) in enumerate(qtd("passos", r.get("passos"), 5, 5), 1):
        faixa(f"passo {i} (título)", t, 2, 4)
        faixa(f"passo {i} (texto)", x, 15, 30)
    for bloco in ("fortes", "atencao"):
        for i, x in enumerate(qtd(bloco, r.get(bloco), 6, 7), 1):
            faixa(f"{bloco} {i}", x, 4, 10)
            if x.lower().strip(" .") in GENERICOS:
                erros.append(f"{bloco} {i}: genérico demais ({x!r}); diga o quê e por quê")
    qtd("ficha", r.get("ficha"), 8, 10)
    qtd("premios", r.get("premios"), 1, 3)
    # perfil saiu do quadrado (não coube junto com o veredito); se existir, precisa ser válido
    for i, p in enumerate(r.get("perfil") or [], 1):
        if len(p) != 2 or not isinstance(p[1], int) or not 0 <= p[1] <= 5:
            erros.append(f"perfil {i}: precisa de [critério, nota inteira 0 a 5]")
    extra = r.get("extra") or {}
    if not extra.get("titulo"):
        erros.append("extra: sem título")
    faixa("extra (texto)", extra.get("texto"), 20, 45)
    faixa("veredito", r.get("veredito"), 5, 12)
    faixa("veredito_texto", r.get("veredito_texto"), 25, 40)
    return erros


def checar_texto(c):
    """Texto do site (padrão editorial v2, segunda parte do PADRAO_EDITORIAL.md)."""
    erros = []
    total = lambda xs: sum(palavras(x) for x in xs or [])

    def faixa(nome, n, mn, mx, un="palavras"):
        if not mn <= n <= mx:
            erros.append(f"texto · {nome}: {n} {un} (padrão: {mn} a {mx})")

    faixa("lede", palavras(c.get("lede", "")), 50, 90)
    faixa("como_funciona (parágrafos)", len(c.get("como_funciona") or []), 4, 6, "parágrafos")
    faixa("como_funciona", total(c.get("como_funciona")), 200, 350)
    faixa("experiencia (parágrafos)", len(c.get("experiencia") or []), 2, 3, "parágrafos")
    faixa("experiencia", total(c.get("experiencia")), 120, 220)
    for bloco, pos in (("funciona", 1), ("atencao", 2)):
        itens = c.get(bloco) or []
        faixa(bloco, len(itens), 5, 7, "itens")
        for i, it in enumerate(itens, 1):
            faixa(f"{bloco} {i}", palavras(it[pos]), 30, 70)
            if it[pos - 1].lower().strip(" .") in GENERICOS:
                erros.append(f"texto · {bloco} {i}: título genérico ({it[pos - 1]!r})")
    jog = c.get("jogadores") or []
    faixa("jogadores", len(jog), 2, 5, "itens")
    for i, it in enumerate(jog, 1):
        faixa(f"jogadores {i}", palavras(it[1]), 10, 45)
        if len(it) != 3 or it[2] not in (1, 2, 3):
            erros.append(f"texto · jogadores {i}: falta o nível (3 ótimo, 2 bom, 1 fraco)")
    cit = c.get("citacao") or {}
    if not (cit.get("texto") and cit.get("fonte")):
        erros.append("texto · citacao: precisa de {texto, fonte}")
    pr = c.get("preco_ref") or {}
    if not (pr.get("faixa") and pr.get("data")):
        erros.append("texto · preco_ref: precisa de {faixa, data}")
    r = c.get("roteiro") or {}
    if len(c.get("perfil") or r.get("perfil") or []) != 6:
        erros.append("texto · perfil: 6 barras [critério, nota 0 a 5] (aparecem no site)")
    passos = c.get("passos") or r.get("passos") or []
    if len(passos) != 5 or any(not 15 <= palavras(x) <= 30 for _, x in passos):
        erros.append("texto · passos: 5 passos de 15 a 30 palavras (roteiro.passos ou passos do site)")
    if not (c.get("como_resumo") or r.get("como_resumo")):
        erros.append("texto · como_resumo: uma linha que resume a partida")
    faixa("primeira_partida", palavras(c.get("primeira_partida", "")), 50, 120)
    faixa("edicao_nacional", palavras(c.get("edicao_nacional", "")), 40, 100)
    faixa("versoes", palavras(c.get("versoes", "")), 30, 100)
    comp = c.get("comparacoes") or []
    faixa("comparacoes", len(comp), 2, 3, "itens")
    for i, it in enumerate(comp, 1):
        faixa(f"comparacoes {i}", palavras(it[2]), 20, 50)
    faixa("para_quem", len(c.get("para_quem") or []), 4, 5, "itens")
    faixa("nao_e_para", len(c.get("nao_e_para") or []), 4, 5, "itens")
    faixa("veredito", palavras(c.get("veredito", "")), 80, 140)
    faixa("fontes", len(c.get("fontes") or []), 6, 99, "fontes")
    return erros


def main(arquivos):
    falhou = False
    for a in arquivos:
        c = json.loads(Path(a).read_text(encoding="utf-8"))
        erros = checar(c) + checar_texto(c)
        if erros:
            falhou = True
            print(f"✗ {c['slug']}: fora do padrão editorial")
            for x in erros:
                print("   -", x)
        else:
            print(f"✓ {c['slug']}")
    return 1 if falhou else 0


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    sys.exit(main(sys.argv[1:]))
