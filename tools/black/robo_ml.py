"""Robô do Mercado Livre do Radar Black de Verdade (pedido do usuário em 04/11/2026: um terceiro robô, sozinho, só
para o Mercado Livre, sem atrapalhar o normal e o educado).

A cada ciclo: lê pela API do Mercado Livre os anúncios de cada produto que o Compara Jogos liga a um jogo
(apis.mercado_livre: o mais barato, novo, de loja oficial ou MercadoLíder), relendo só o que tem preço com mais de
2 horas; grava por mescla em conteudo/black/ofertas.json (os outros robôs só regravam o que leram); refaz a página
do Black e manda os alertas de jogo novo. Tem a sua trava (.trava_ml), o seu workflow (radar-ml.yml) e o seu grupo de
concorrência no GitHub Actions; não lê lojas nem o Compara Jogos.

Uso: python3 tools/black/robo_ml.py [--idade HORAS]
"""
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import radar  # noqa: E402


def main():
    idade = float(sys.argv[sys.argv.index("--idade") + 1]) if "--idade" in sys.argv else 2
    _t = radar.trava("ml")  # noqa: F841
    import apis
    print("-- robô Mercado Livre")
    ofertas = radar.ler(radar.HOJE, {})
    antes = {s: json.dumps([o.get("api") for o in of["ofertas"]], sort_keys=True) for s, of in ofertas.items()}
    apis.mercado_livre(ofertas, idade_h=idade)
    mexidos = {s: of for s, of in ofertas.items() if json.dumps([o.get("api") for o in of["ofertas"]], sort_keys=True) != antes[s]}
    if mexidos:
        radar.mesclar(radar.HOJE, mexidos)
    print(f"ok robô Mercado Livre: {len(mexidos)} jogos com preço do Mercado Livre atualizado")
    import pagina_black
    with radar._TravaDados():
        r = radar.calcular()
    pagina_black.build(*r)
    ml = [x for lista in r for x in lista if x.get("fonte_preco") == "API do Mercado Livre"]
    print(f"ok página: {len(ml)} ofertas com preço do Mercado Livre na página")
    import alertas
    with radar._TravaDados():
        alertas.avisar(r[0] + r[3])


if __name__ == "__main__":
    main()
