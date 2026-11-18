#!/usr/bin/env python3
"""Gera, valida e exporta os STLs de um projeto de insert.

Uso:
  python3 tools/inserts/gerar.py                       # Robinson Crusoe CE (padrão)
  python3 tools/inserts/gerar.py --config meu.json     # outras medidas
  python3 tools/inserts/gerar.py --saida pasta --sem-imagens
Sai com código 1 se qualquer validação falhar (nada inválido é considerado pronto).
"""
import argparse
import json
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)

from insertgen import stl as stlio  # noqa: E402
from insertgen.validar import validar_montagem, validar_peca  # noqa: E402
from projetos import robinson_crusoe_ce as rc  # noqa: E402


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default=rc.CONFIG)
    ap.add_argument("--saida", default=os.path.join(AQUI, "saida", "robinson-crusoe-ce"))
    ap.add_argument("--sem-imagens", action="store_true")
    a = ap.parse_args(argv)

    cfg = rc.carregar(a.config)
    pecas, itens, reservas, ctx = rc.montar(cfg)
    os.makedirs(a.saida, exist_ok=True)
    for velho in os.listdir(a.saida):  # remove STLs de gerações anteriores
        if velho.endswith(".stl"):
            os.remove(os.path.join(a.saida, velho))
    mesa = tuple(cfg["impressora"]["mesa"])
    pmin = cfg["impressora"]["parede_min"]

    falhas, linhas = [], []
    qtd = {}
    for it in itens:
        qtd[it.nome] = qtd.get(it.nome, 0) + 1
    for pc in pecas:
        erros, info = validar_peca(pc, pmin, mesa)
        n = max(qtd.get(pc.nome, 1), pc.qtd)
        v, f = stlio.malha(pc.solido)
        arq = f"{pc.nome}.stl"
        stlio.escrever(os.path.join(a.saida, arq), v, f, pc.nome)
        # confere o arquivo gravado (relido do disco)
        v2, f2 = stlio.ler(os.path.join(a.saida, arq))
        from insertgen.validar import checar_malha
        rel = checar_malha(v2, f2)
        if rel["arestas_abertas"] or rel["arestas_duplicadas"]:
            erros.append(f"STL gravado não está fechado: {rel}")
        t = info["tamanho"]
        linhas.append({"arquivo": arq, "qtd": n, "x": t[0], "y": t[1], "z": t[2],
                       "volume_cm3": round(info["volume_mm3"] / 1000, 1), "descricao": pc.descricao,
                       "notas": pc.notas, "erros": erros})
        falhas += [f"{pc.nome}: {e}" for e in erros]

    erros_m = validar_montagem((cfg["caixa_interna"]["x"], cfg["caixa_interna"]["y"], cfg["caixa_interna"]["z"]),
                               itens, reservas)
    falhas += [f"montagem: {e}" for e in erros_m]
    oc = cfg["caixa_interna"].get("ocupacao_comprovada")
    if oc:
        ox = max(it.caixa[1][0] for it in itens)
        oy = max(it.caixa[1][1] for it in itens)
        if ox > oc["x"] + 0.01 or oy > oc["y"] + 0.01:
            falhas.append(f"montagem: ocupa {ox:.1f} x {oy:.1f}, mais que o comprovado {oc['x']} x {oc['y']}")

    rel = {"pecas": linhas, "montagem": [
        {"nome": it.nome, "origem": it.origem, "pos": [round(c, 2) for c in it.pos],
         "tam": [round(c, 2) for c in it.tam], "girada_90": bool(it.rot90 % 2)} for it in itens],
        "erros_montagem": erros_m,
        "topo_insert": ctx["topo_insert"], "espessura_plana": ctx["espessura_plana"],
        "espaco_tabuleiro": ctx["espaco_tabuleiro"], "folga_sobrando": ctx["folga_sobrando"],
        "sleeves": {k: {kk: vv for kk, vv in s.items()} for k, s in ctx["sleeves"].items()},
        "baralhos": {k: b.resumo() for k, b in ctx["baralhos"].items()}}
    with open(os.path.join(a.saida, "relatorio.json"), "w", encoding="utf-8") as fh:
        json.dump(rel, fh, ensure_ascii=False, indent=1)

    if not a.sem_imagens:
        from insertgen import previa
        previa.planta(itens, cfg, ctx, os.path.join(a.saida, "montagem.png"))
        previa.pecas(pecas, os.path.join(a.saida, "pecas.png"))

    print(f"{len(pecas)} STLs em {a.saida}")
    cx = cfg["caixa_interna"]
    ox = max(it.caixa[1][0] for it in itens)
    oy = max(it.caixa[1][1] for it in itens)
    print(f"ocupa {ox:.1f} x {oy:.1f} mm do fundo de {cx['x']:.0f} x {cx['y']:.0f} "
          f"(sobra {cx['x'] - ox:.1f} x {cx['y'] - oy:.1f} mm)")
    print(f"topo do insert: {ctx['topo_insert']:.1f} mm | espaço para tabuleiro+camada plana: "
          f"{ctx['espaco_tabuleiro']:.1f} mm | camada plana declarada: {ctx['espessura_plana']:.1f} mm")
    if falhas:
        print("FALHAS:")
        for e in falhas:
            print("  -", e)
        return 1
    print("Todas as validações passaram.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
