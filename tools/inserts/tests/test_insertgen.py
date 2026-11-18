import copy
import os
import sys
import tempfile
import unittest

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(AQUI))

from insertgen import geom as g  # noqa: E402
from insertgen import stl as stlio  # noqa: E402
from insertgen.cartas import Baralho, carregar_catalogo, sleeve, sleeve_envelope  # noqa: E402
from insertgen.pecas import Params, bandeja_baralhos, bandeja_fichas  # noqa: E402
from insertgen.validar import Item, checar_malha, validar_montagem, validar_peca  # noqa: E402
from projetos import robinson_crusoe_ce as rc  # noqa: E402


class TestCartas(unittest.TestCase):
    def setUp(self):
        self.cat = carregar_catalogo()

    def test_estimativa_e_medido(self):
        s = sleeve(self.cat, "padrao-euro")
        self.assertEqual(s["fonte"], "estimado")
        self.assertEqual(s["externo"], (61.5, 95.0))
        cat = copy.deepcopy(self.cat)
        cat["linhas"]["padrao-euro"]["medido"] = {"externo": [62.0, 94.6], "micras": 70}
        s = sleeve(cat, "padrao-euro")
        self.assertEqual((s["fonte"], s["externo"], s["micras"]), ("medido", (62.0, 94.6), 70))

    def test_carta_maior_que_sleeve(self):
        s = sleeve(self.cat, "chimeuro")  # 59 x 91
        with self.assertRaises(ValueError):
            Baralho("x", (59, 92), 10, 0.32, s)

    def test_envelope_pega_o_maior(self):
        s = sleeve_envelope(self.cat, "chimeuro", ["padrao-euro"])
        self.assertEqual(s["externo"], (61.5, 95.0))

    def test_espessura_luvada(self):
        b = Baralho("x", (59, 92), 100, 0.32, sleeve(self.cat, "padrao-euro"))
        self.assertAlmostEqual(b.espessura_unit, 0.44)
        self.assertAlmostEqual(b.altura_pilha(0), 44.0)


class TestPecas(unittest.TestCase):
    def setUp(self):
        self.cat = carregar_catalogo()
        self.b = Baralho("ev", (59, 92), 93, 0.32, sleeve(self.cat, "padrao-euro"))

    def test_medidas_exatas_e_validas(self):
        p = Params()
        pc = bandeja_baralhos("t", [[self.b], []], p, altura=52)
        X = 2 * p.parede + 61.5 + 2 * p.folga_carta
        Y = 2 * p.parede + 2 * (95 + 2 * p.folga_carta) + p.divisoria
        for a, e in zip(pc.tamanho, (X, Y, 52.0)):
            self.assertAlmostEqual(a, e, places=3)
        erros, info = validar_peca(pc)
        self.assertEqual(erros, [])
        self.assertEqual(info["arestas_abertas"], 0)

    def test_altura_insuficiente(self):
        with self.assertRaises(ValueError):
            bandeja_baralhos("t", [[self.b]], Params(), altura=30)

    def test_parede_fina_detectada(self):
        pc = bandeja_baralhos("t", [[self.b]], Params(parede=0.8))
        erros, _ = validar_peca(pc, parede_min=1.2)
        self.assertTrue(any("parede mais fina" in e for e in erros), erros)

    def test_carta_bate_no_plastico(self):
        pc = bandeja_baralhos("t", [[self.b]], Params())
        pc.fantasmas.append(("grande demais", g.caixa(70, 50, 10, (0, 10, 1.2))))
        erros, _ = validar_peca(pc)
        self.assertTrue(any("bate no plástico" in e for e in erros))

    def test_tampa_cabe_no_rebaixo(self):
        p = Params()
        t, tp = bandeja_fichas("f", 80, 60, 25, [(1, [1, 1]), (1, [1])], p)
        self.assertEqual(validar_peca(t)[0], [])
        self.assertEqual(validar_peca(tp)[0], [])
        ins = p.parede - p.rebaixo
        self.assertAlmostEqual(tp.tamanho[0], 80 - 2 * ins - 2 * p.folga_tampa, places=3)
        # tampa posicionada no rebaixo não encosta na bandeja
        tampa_no_lugar = tp.solido.translate((ins + p.folga_tampa, ins + p.folga_tampa, 25 - p.tampa_esp))
        self.assertLess((t.solido ^ tampa_no_lugar).volume(), 1e-3)

    def test_stl_ida_e_volta(self):
        pc = bandeja_baralhos("t", [[self.b]], Params())
        v, f = stlio.malha(pc.solido)
        with tempfile.TemporaryDirectory() as d:
            arq = os.path.join(d, "t.stl")
            stlio.escrever(arq, v, f)
            v2, f2 = stlio.ler(arq)
        m = checar_malha(v2, f2)
        self.assertEqual((m["arestas_abertas"], m["arestas_duplicadas"]), (0, 0))
        self.assertAlmostEqual(m["volume_mm3"], pc.solido.volume(), delta=pc.solido.volume() * 1e-4)


class TestMontagem(unittest.TestCase):
    def test_sobreposicao(self):
        a = Item("a", (10, 10, 10), (0, 0, 0))
        b = Item("b", (10, 10, 10), (5, 0, 0))
        self.assertTrue(validar_montagem((100, 100, 100), [a, b], []))

    def test_projeto_rc_valido(self):
        cfg = rc.carregar()
        pecas, itens, reservas, ctx = rc.montar(cfg)
        self.assertEqual(validar_montagem((320, 320, 134), itens, reservas), [])
        self.assertLessEqual(ctx["topo_insert"], 134 - ctx["espessura_plana"])
        for pc in pecas:
            self.assertEqual(validar_peca(pc)[0], [], pc.nome)

    def test_tabuleiro_grosso_demais_falha(self):
        cfg = rc.carregar()
        cfg["camada_plana"]["itens"].append({"nome": "livro", "espessura": 20})
        _, itens, reservas, _ = rc.montar(cfg)
        erros = validar_montagem((320, 320, 134), itens, reservas)
        self.assertTrue(any("espaço reservado" in e for e in erros))

    def test_sleeve_maior_que_cabe_na_caixa_falha(self):
        cfg = rc.carregar()
        cfg["sleeves"]["grande"]["usar"] = "tarot"
        cfg["cartas"]["grande"]["tamanho"] = [70, 120]
        pecas, itens, reservas, _ = rc.montar(cfg)
        self.assertTrue(validar_montagem((320, 320, 134), itens, reservas))


if __name__ == "__main__":
    unittest.main()
