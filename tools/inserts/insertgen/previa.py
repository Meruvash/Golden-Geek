"""Imagens de conferência: planta por nível, corte lateral e vista 3D das peças."""
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib.patches import Rectangle  # noqa: E402
from mpl_toolkits.mplot3d.art3d import Poly3DCollection  # noqa: E402

from .stl import malha  # noqa: E402

COR_ORIG = "#b9b9b9"
COR_CARTA = "#2f6fb3"
COR_CAIXA = "#e3a72f"


def _cor(it):
    if it.origem == "original":
        return COR_ORIG
    return COR_CARTA if it.nome.startswith("cartas") else COR_CAIXA


def planta(itens, cfg, ctx, caminho):
    X, Y, Z = (cfg["caixa_interna"][k] for k in "xyz")
    niveis = sorted({0.0} | {round(it.caixa[0][2], 1) for it in itens})
    # dois painéis: o que se vê olhando de cima em cada faixa de altura (nível 1: z<52; nível 2: z>=52)
    faixas = [("Nível 1 (fundo da caixa)", lambda z: z < 50), ("Nível 2 (por cima)", lambda z: z >= 50)]
    fig, axs = plt.subplots(1, 3, figsize=(21, 7.5))
    for ax, (tit, filtro) in zip(axs[:2], faixas):
        ax.add_patch(Rectangle((0, 0), X, Y, fill=False, lw=2, ec="k"))
        grupos = {}
        for it in sorted([i for i in itens if filtro(i.caixa[0][2])], key=lambda i: i.caixa[0][2]):
            (x0, y0, z0), (x1, y1, z1) = it.caixa
            ax.add_patch(Rectangle((x0, y0), x1 - x0, y1 - y0, fc=_cor(it), ec="k", alpha=0.85, lw=1))
            rot = it.nome.replace("ORIGINAL ", "").replace(".stl", "").replace("cartas-", "")
            rot = rot.split("_", 2)[-1] if rot.startswith("obj_") else rot
            grupos.setdefault((round(x0), round(y0)), []).append((it, f"{rot[:26]} (z{z0:.0f}-{z1:.0f})"))
        for lst in grupos.values():
            (x0, y0, _), (x1, y1, _) = lst[-1][0].caixa
            txt = "\n".join(t for _, t in reversed(lst))
            ax.text((x0 + x1) / 2, (y0 + y1) / 2, txt, ha="center", va="center", fontsize=6.5,
                    rotation=90 if (y1 - y0) > 1.6 * (x1 - x0) else 0)
        ax.set_xlim(-5, X + 5); ax.set_ylim(-5, Y + 5); ax.set_aspect("equal")
        ax.set_title(f"{tit} — caixa interna {X:.0f} x {Y:.0f} mm")
    ax = axs[2]  # corte lateral (frente), mostra a camada do tabuleiro
    ax.add_patch(Rectangle((0, 0), X, Z, fill=False, lw=2, ec="k"))
    for it in itens:
        (x0, _, z0), (x1, _, z1) = it.caixa
        ax.add_patch(Rectangle((x0, z0), x1 - x0, z1 - z0, fc=_cor(it), ec="k", alpha=0.35, lw=0.6))
    topo, esp = ctx["topo_insert"], ctx["espessura_plana"]
    ax.add_patch(Rectangle((0, topo), X, esp, fc="#5aa45a", ec="k", alpha=0.8))
    ax.text(X / 2, topo + esp / 2, f"tabuleiro + camada plana {esp:.0f} mm", ha="center", va="center", fontsize=9)
    ax.axhline(Z, color="r", ls="--"); ax.text(2, Z + 1.5, f"tampa (altura interna {Z:.0f})", color="r", fontsize=8)
    ax.set_xlim(-5, X + 5); ax.set_ylim(-5, Z + 12); ax.set_aspect("equal")
    ax.set_title(f"Corte (vista de frente): insert até {topo:.0f} mm, sobra {ctx['folga_sobrando']:.1f} mm")
    fig.legend(handles=[Rectangle((0, 0), 1, 1, fc=c) for c in (COR_ORIG, COR_CARTA, COR_CAIXA, "#5aa45a")],
               labels=["bandeja original reaproveitada", "bandeja nova de cartas (sleeve)", "caixa nova com tampa",
                       "tabuleiro / camada plana"], loc="lower center", ncol=4)
    plt.tight_layout(rect=(0, 0.05, 1, 1)); plt.savefig(caminho, dpi=90); plt.close(fig)


def pecas(lista, caminho, cols=5):
    rows = (len(lista) + cols - 1) // cols
    fig = plt.figure(figsize=(cols * 4, rows * 3.6))
    luz = np.array([0.3, -0.5, 0.8]); luz /= np.linalg.norm(luz)
    for i, pc in enumerate(lista):
        v, f = malha(pc.solido)
        ax = fig.add_subplot(rows, cols, i + 1, projection="3d")
        tri = v[f]
        n = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0])
        n /= np.linalg.norm(n, axis=1, keepdims=True) + 1e-12
        k = np.clip(n @ luz, 0.15, 1)
        ax.add_collection3d(Poly3DCollection(tri, facecolors=np.c_[0.25 + 0.6 * k, 0.4 + 0.5 * k, 0.6 + 0.4 * k, np.ones(len(k))], linewidths=0))
        M = max(pc.tamanho)
        ax.set_xlim(0, M); ax.set_ylim(0, M); ax.set_zlim(0, M); ax.view_init(40, -60); ax.set_axis_off()
        t = pc.tamanho
        ax.set_title(f"{pc.nome}\n{t[0]:.1f} x {t[1]:.1f} x {t[2]:.1f} mm", fontsize=8)
    plt.tight_layout(); plt.savefig(caminho, dpi=80); plt.close(fig)
