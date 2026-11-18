"""insertgen: gerador paramétrico de inserts (organizadores) de caixa de jogo em STL.

Tudo em milímetros. Eixos: X = largura, Y = profundidade, Z = altura (para cima).
Cada peça é um sólido manifold (manifold3d) e sai em STL binário, validado
(fechado, orientado, medidas exatas, paredes mínimas, cartas cabem, peças cabem na caixa).
"""
__version__ = "1.0.0"
