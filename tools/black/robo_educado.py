"""Robô educado do Radar Black de Verdade: lista inteira do Compara Jogos (domingo: varredura do sitemap),
conferência nas lojas com 6 s entre páginas e limite diário, Keepa e Mercado Livre, feeds das lojas e cupons.
Roda a cada 3 horas.

Uso: python3 tools/black/robo_educado.py [coletar|varrer] [--limite N]
Roda junto com o robô normal (tools/black/robo_normal.py); cada um tem a sua trava e só regrava os jogos que leu.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import radar  # noqa: E402

if __name__ == "__main__":
    radar.main(robo="educado", acao="coletar")
