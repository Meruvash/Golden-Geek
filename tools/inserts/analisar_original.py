#!/usr/bin/env python3
"""Analisa um insert existente (zip ou pasta de STLs): medidas, fechamento da malha
e se os poços de carta comportam a carta luvada escolhida.

Uso: python3 -I tools/inserts/analisar_original.py caminho.zip [--grande padrao-euro] [--pequena mini-euro]
Os arquivos são só lidos (nunca executados).
"""
import argparse
import io
import math
import os
import sys
import zipfile

import numpy as np
import manifold3d as m3

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
from insertgen import stl as stlio  # noqa: E402
from insertgen.cartas import carregar_catalogo, sleeve  # noqa: E402
from insertgen.validar import checar_malha  # noqa: E402


def _arquivos(caminho):
    if zipfile.is_zipfile(caminho):
        with zipfile.ZipFile(caminho) as z:
            for n in sorted(z.namelist()):
                if not n.endswith("/"):
                    yield os.path.basename(n), z.read(n)
    else:
        for n in sorted(os.listdir(caminho)):
            with open(os.path.join(caminho, n), "rb") as fh:
                yield n, fh.read()


def _ler_bytes(b):
    tmp = io.BytesIO(b)
    import tempfile
    with tempfile.NamedTemporaryFile(suffix=".stl", delete=False) as fh:
        fh.write(tmp.getvalue())
        nome = fh.name
    try:
        return stlio.ler(nome)
    finally:
        os.remove(nome)


def _endireitar(v):
    """Gira em Z para o menor retângulo envolvente (peças salvas a 45° para caber na mesa)."""
    melhor = None
    for ang in range(0, 90, 1):
        a = math.radians(ang)
        r = v[:, :2] @ np.array([[math.cos(a), -math.sin(a)], [math.sin(a), math.cos(a)]]).T
        area = np.ptp(r[:, 0]) * np.ptp(r[:, 1])
        if melhor is None or area < melhor[0] - 1e-6:
            melhor = (area, ang, r)
    out = v.copy()
    out[:, :2] = melhor[2]
    return out - out.min(axis=0), melhor[1]


def analisar(caminho, grande, pequena):
    linhas = []
    for nome, dados in _arquivos(caminho):
        try:
            v, f = _ler_bytes(dados)
        except ValueError:
            continue
        mm = checar_malha(v, f)
        v, ang = _endireitar(v)
        tam = v.max(axis=0)
        sol = m3.Manifold(m3.Mesh(vert_properties=v.astype(np.float32), tri_verts=f.astype(np.uint32)))
        furos = []
        sec = sol.slice(float(tam[2] * 0.3))
        for pol in sec.to_polygons():
            p = np.asarray(pol)
            w, h = np.ptp(p[:, 0]), np.ptp(p[:, 1])
            if w < tam[0] - 0.5 or h < tam[1] - 0.5:  # descarta o contorno externo
                furos.append((round(max(w, h), 1), round(min(w, h), 1)))
        veredito = []
        if "card" in nome.lower() or "carta" in nome.lower():
            for comp, larg in sorted(set(furos), reverse=True):
                if larg < 3:
                    continue
                # carta em pé: o comprimento do poço recebe um lado da carta luvada (+0,5 mm por lado)
                # tipo de carta pelo nome do arquivo (no RC as pequenas são invenções, equipamento e feras)
                peq = any(k in nome.lower() for k in ("invention", "beast", "equipment", "invenc", "fera"))
                rot, s = ("pequena", pequena) if peq else ("grande", grande)
                opcoes = [(abs(comp - lado), rot, lado) for lado in s["externo"]]
                _, rot, lado = min(opcoes)
                falta = lado + 1.0 - comp
                veredito.append(f"poço {comp} x {larg} mm -> carta {rot} luvada ({lado:.1f} mm): "
                                + (f"NÃO CABE, faltam {falta:.1f} mm" if falta > 0 else f"cabe (sobra {-falta + 1:.1f} mm)"))
        linhas.append((nome, tam, ang, mm, furos, veredito))
    return linhas


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("caminho")
    ap.add_argument("--grande", default="padrao-euro")
    ap.add_argument("--pequena", default="mini-euro")
    a = ap.parse_args()
    cat = carregar_catalogo()
    g, p = sleeve(cat, a.grande), sleeve(cat, a.pequena)
    print(f"Carta grande em {g['nome']}: {g['externo']} ({g['fonte']}); pequena em {p['nome']}: {p['externo']}")
    for nome, tam, ang, mm, furos, ver in analisar(a.caminho, g, p):
        fech = "fechada" if not (mm["arestas_abertas"] or mm["arestas_duplicadas"]) else f"ABERTA {mm}"
        print(f"\n{nome}: {tam[0]:.1f} x {tam[1]:.1f} x {tam[2]:.1f} mm (girada {ang}°), malha {fech}")
        for v in ver:
            print("   ", v)


if __name__ == "__main__":
    main()
