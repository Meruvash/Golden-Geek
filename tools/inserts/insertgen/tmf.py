"""Leitor mínimo de 3MF (formato do MakerWorld/Bambu Studio): cada objeto-malha vira uma peça.

Lê só XML de dentro do zip (nada é executado). Aplica a transformação dos componentes
quando o objeto é montado a partir de outros (padrão do Bambu Studio).
"""
import io
import posixpath
import xml.etree.ElementTree as ET
import zipfile

import numpy as np

NS = "{http://schemas.microsoft.com/3dmanufacturing/core/2015/02}"
NS_P = "{http://schemas.microsoft.com/3dmanufacturing/production/2015/06}"


def _matriz(txt):
    """Transformação 3MF "m00 m01 m02 m10 m11 m12 m20 m21 m22 m30 m31 m32" (vetor-linha: p' = p @ M)."""
    if not txt:
        return np.eye(4)
    v = [float(x) for x in txt.split()]
    M = np.eye(4)
    M[0, :3], M[1, :3], M[2, :3], M[3, :3] = v[0:3], v[3:6], v[6:9], v[9:12]
    return M


def ler_3mf(dados):
    """bytes do .3mf -> lista de (nome, vertices Nx3, faces Mx3) por objeto do build."""
    z = zipfile.ZipFile(io.BytesIO(dados))
    modelos = {}
    for n in z.namelist():
        if n.lower().endswith(".model"):
            modelos["/" + n.lstrip("/")] = ET.fromstring(z.read(n))
    principal = "/3D/3dmodel.model" if "/3D/3dmodel.model" in modelos else next(iter(modelos))

    def objeto(arq, oid):
        raiz = modelos[arq]
        for o in raiz.iter(NS + "object"):
            if o.get("id") == oid:
                return o
        return None

    def malha(arq, oid, M):
        o = objeto(arq, oid)
        if o is None:
            return []
        out = []
        m = o.find(NS + "mesh")
        if m is not None:
            v = np.array([[float(e.get(k)) for k in "xyz"] for e in m.iter(NS + "vertex")])
            f = np.array([[int(e.get(k)) for k in ("v1", "v2", "v3")] for e in m.iter(NS + "triangle")])
            if len(v) and len(f):
                vh = np.c_[v, np.ones(len(v))] @ M
                out.append((o.get("name") or f"objeto_{oid}", vh[:, :3], f))
        comps = o.find(NS + "components")
        if comps is not None:
            for c in comps.iter(NS + "component"):
                sub = c.get(NS_P + "path") or arq
                for nome, v, f in malha(sub, c.get("objectid"), _matriz(c.get("transform")) @ M):
                    out.append((o.get("name") or nome, v, f))
        return out

    pecas = []
    build = modelos[principal].find(NS + "build")
    for it in build.iter(NS + "item"):
        partes = malha(principal, it.get("objectid"), _matriz(it.get("transform")))
        if not partes:
            continue
        nome = partes[0][0]
        vs, fs, base = [], [], 0
        for _, v, f in partes:
            vs.append(v)
            fs.append(f + base)
            base += len(v)
        pecas.append((nome, np.vstack(vs), np.vstack(fs)))
    return pecas
