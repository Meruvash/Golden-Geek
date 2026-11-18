"""Leitura e escrita de STL binário só com numpy (sem dependência extra)."""
import struct
import numpy as np


def malha(solido):
    """Manifold -> (vertices float64 Nx3, faces int Mx3)."""
    m = solido.to_mesh()
    v = np.asarray(m.vert_properties, dtype=np.float64)[:, :3]
    f = np.asarray(m.tri_verts, dtype=np.int64)
    return v, f


def escrever(caminho, vertices, faces, nome="insertgen"):
    tri = vertices[faces]
    n = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
    norma = np.linalg.norm(n, axis=1, keepdims=True)
    n = np.divide(n, norma, out=np.zeros_like(n), where=norma > 0)
    reg = np.zeros(len(faces), dtype=[("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")])
    reg["n"] = n
    reg["v"] = tri
    cab = nome.encode("ascii", "replace")[:80].ljust(80, b" ")
    with open(caminho, "wb") as fh:
        fh.write(cab)
        fh.write(struct.pack("<I", len(faces)))
        fh.write(reg.tobytes())


def ler(caminho):
    """STL binário -> (vertices únicos, faces). Solda vértices idênticos."""
    with open(caminho, "rb") as fh:
        dados = fh.read()
    n = struct.unpack("<I", dados[80:84])[0]
    if 84 + 50 * n != len(dados):
        raise ValueError(f"{caminho}: não é STL binário válido")
    reg = np.frombuffer(dados[84:], dtype=[("n", "<f4", 3), ("v", "<f4", (3, 3)), ("a", "<u2")], count=n)
    pts = reg["v"].reshape(-1, 3).astype(np.float64)
    uniq, inv = np.unique(np.round(pts, 5), axis=0, return_inverse=True)
    return uniq, inv.reshape(-1, 3)
