"""Robô normal do Radar Black de Verdade: leitura rápida (quedas de preço e jogos perto do corte), conferência
nas lojas no ritmo do primeiro robô (2 s entre páginas) e promoções novas do Promobit. Roda a cada 30 minutos.

Uso: python3 tools/black/robo_normal.py [--limite N]
Roda junto com o robô educado (tools/black/robo_educado.py); cada um tem a sua trava e só regrava os jogos que leu.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import radar  # noqa: E402

if __name__ == "__main__":
    radar.main(robo="normal", acao="rapida")
