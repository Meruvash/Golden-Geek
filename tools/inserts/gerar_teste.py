#!/usr/bin/env python3
"""Peças de teste de encaixe (imprimem rápido): confirmam folga do sleeve e da tampa
antes de imprimir o insert inteiro. Usam as mesmas medidas e folgas do projeto.

Uso: python3 tools/inserts/gerar_teste.py [--config projetos/robinson-crusoe-ce.json]
"""
import argparse
import os
import sys

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)

from insertgen import stl as stlio  # noqa: E402
from insertgen.cartas import Baralho, carregar_catalogo, sleeve_envelope  # noqa: E402
from insertgen.pecas import Params, bandeja_baralhos, bandeja_em_pe, bandeja_fichas  # noqa: E402
from insertgen.validar import validar_peca  # noqa: E402
from projetos import robinson_crusoe_ce as rc  # noqa: E402


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--config", default=rc.CONFIG)
    ap.add_argument("--saida", default=os.path.join(AQUI, "saida", "teste-encaixe"))
    a = ap.parse_args(argv)
    cfg = rc.carregar(a.config)
    cat = carregar_catalogo()
    p = Params()
    os.makedirs(a.saida, exist_ok=True)
    pecas = []
    for tipo in ("grande", "pequena"):
        s = cfg["sleeves"][tipo]
        sl = sleeve_envelope(cat, s["usar"], s["compativel_com"])
        c = cfg["cartas"][tipo]
        b = Baralho(f"10 cartas {tipo}s", c["tamanho"], 10, c["espessura"], sl)
        pc = bandeja_baralhos(f"teste-carta-{tipo}", [[b]], p,
                              descricao=f"Poço igual ao do insert, só 10 cartas de altura ({sl['nome']})")
        pecas.append(pc)
        if tipo == "grande":
            par = cfg.get("layout", {}).get("parede_em_pe", 1.2)
            alt = cfg.get("layout", {}).get("altura_bandeja_em_pe", 70.0)
            b30 = Baralho("30 cartas grandes", c["tamanho"], 30, c["espessura"], sl)
            pe = bandeja_em_pe("teste-carta-em-pe", [b30], p, alt, parede=par,
                               descricao="Bandeja em pé igual à dos Mistérios, para 30 cartas")
            pecas.append(pe)
    t, tp = bandeja_fichas("teste-tampa", 50, 40, 12, [(1, [1])], p, descricao="Tampa embutida, mesma folga do insert")
    pecas += [t, tp]
    falhas = 0
    for pc in pecas:
        erros, info = validar_peca(pc, cfg["impressora"]["parede_min"], tuple(cfg["impressora"]["mesa"]))
        v, f = stlio.malha(pc.solido)
        stlio.escrever(os.path.join(a.saida, pc.nome + ".stl"), v, f, pc.nome)
        x, y, z = info["tamanho"]
        print(f"{pc.nome}.stl  {x:.1f} x {y:.1f} x {z:.1f} mm  {'OK' if not erros else erros}  {'; '.join(pc.notas[:1])}")
        falhas += bool(erros)
    print(f"\nComo testar: carta luvada deve entrar e sair do poço sem dobrar o canto e sem sobrar mais de ~1,5 mm "
          f"por lado; a tampa deve assentar rente e sair pelo furo do dedo. Se apertar, aumente folga_carta/folga_tampa "
          f"em insertgen/pecas.py (Params); se sobrar muito, diminua. Depois rode gerar.py.")
    return 1 if falhas else 0


if __name__ == "__main__":
    sys.exit(main())
