"""Cartas e sleeves: medida externa da carta luvada e espessura do maço."""
import json
import math
import os

AQUI = os.path.dirname(os.path.abspath(__file__))
CATALOGO_PADRAO = os.path.join(AQUI, "..", "dados", "sleeves_bucaneiros.json")


def carregar_catalogo(caminho=CATALOGO_PADRAO):
    with open(caminho, encoding="utf-8") as fh:
        return json.load(fh)


def sleeve(catalogo, chave):
    """Devolve dict com externo (L, A) e micras do sleeve, medido se houver."""
    lin = catalogo["linhas"][chave]
    if "medido" in lin:
        med = lin["medido"]
        return {"chave": chave, "nome": lin["nome"], "carta": tuple(lin["carta"]),
                "externo": tuple(med["externo"]), "micras": med["micras"], "fonte": "medido"}
    folga = lin.get("folga", catalogo["folga_estimada_mm"])
    micras = catalogo["micras_estimadas"][lin.get("linha", "comum")]
    L, A = lin["carta"]
    return {"chave": chave, "nome": lin["nome"], "carta": (L, A),
            "externo": (L + folga["largura"], A + folga["altura"]),
            "micras": micras, "fonte": "estimado"}


class Baralho:
    """Um tipo de carta do jogo, luvado (ou não).

    carta: (largura, altura) da carta nua; qtd: quantidade de cartas;
    espessura_carta: mm da carta nua; sl: dict de `sleeve()` ou None.
    """

    # O sleeve aceita carta um pouco maior que o tamanho nominal do produto (a medida
    # interna passa a nominal). Ex.: carta de 57,5 x 89 no Bucaneiros PADRÃO (63,5 x 88).
    TOLERANCIA = 1.5

    def __init__(self, nome, carta, qtd, espessura_carta=0.32, sl=None):
        self.nome, self.carta, self.qtd = nome, tuple(carta), int(qtd)
        self.espessura_carta, self.sl = espessura_carta, sl
        if sl is not None:
            cl, ca = sl["carta"]
            tol = self.TOLERANCIA
            if carta[0] > cl + tol + 0.01 or carta[1] > ca + tol + 0.01:
                raise ValueError(f"{nome}: carta {carta} não cabe no sleeve {sl['nome']} {sl['carta']}")

    @property
    def externo(self):
        """(largura, altura) do que vai na bandeja (carta luvada ou nua)."""
        return self.sl["externo"] if self.sl else self.carta

    @property
    def espessura_unit(self):
        e = self.espessura_carta
        if self.sl:
            e += 2 * self.sl["micras"] / 1000.0
        return e

    def altura_pilha(self, folga_pct=0.08):
        """Altura do maço (mm), com folga percentual para ar entre cartas/empeno."""
        return self.qtd * self.espessura_unit * (1 + folga_pct)

    def resumo(self):
        L, A = self.externo
        return (f"{self.nome}: {self.qtd} cartas {self.carta[0]}x{self.carta[1]}"
                + (f" em {self.sl['nome']} ({self.sl['fonte']}: {L:.1f}x{A:.1f}, {self.sl['micras']} µm)" if self.sl else " sem sleeve")
                + f" -> maço {self.altura_pilha():.1f} mm")


def arred_cima(v, passo=0.1):
    return math.ceil(v / passo - 1e-9) * passo


def sleeve_envelope(catalogo, usar, compativeis):
    """Sleeve `usar`, mas com medida externa e espessura = maior entre os compatíveis.

    Assim o poço aceita qualquer um deles (ex.: Bucaneiros Padrão Euro ou Chimeuro).
    """
    base = sleeve(catalogo, usar)
    todos = [sleeve(catalogo, c) for c in set(compativeis) | {usar}]
    base = dict(base)
    base["externo"] = (max(s["externo"][0] for s in todos), max(s["externo"][1] for s in todos))
    base["micras"] = max(s["micras"] for s in todos)
    base["compativeis"] = sorted(s["nome"] for s in todos)
    base["fonte"] = "medido" if all(s["fonte"] == "medido" for s in todos) else "estimado"
    return base
