"""Monta o PROMPT MESTRE do infográfico (Sistema de Infográfico v2) a partir de conteudo/<slug>.arte.json.

Imagem 1 = logotipo Elite Boardgamers; Imagem 2 = referência de layout (infográfico do Nemesis).
"""
import json
import re
import sys


def soletrar(nome):
    return "-".join(c.upper() for c in nome if c.strip())


def prompt(a):
    q = lambda s: f'"{s}"'
    d = "\n".join(f"[D{i}] {q(f'{i}. {t}')} / {q(x)}" for i, (t, x) in enumerate(a["D"], 1))
    e = "\n".join(f"[E{i}] {q(t)} / {q(x)}" for i, (t, x) in enumerate(a["E"], 1))
    r = "\n".join(f"[R{i}] {q(t)} / {q(x)}" for i, (t, x) in enumerate(a["R"], 1))
    f = "\n".join(f"[F{i}] {q(x)}" for i, x in enumerate(a["F"], 1))
    m = "\n".join(f"[F{7 + i}] Módulo: {q(t)} / {q(x)}" for i, (t, x) in enumerate(a["modulos"]))
    c1 = "\n".join(f"  {q(x)}" for x in a["C1"])
    c2 = " ".join(q(x) for x in a["C2"])
    dif = "\n".join(f"{n} = {soletrar(n)}" for n in a["dificeis"])
    g = a["G"]
    return f"""USO
Infográfico editorial vertical de revista especializada em jogos de tabuleiro. Peça da série ELITE BOARDGAMERS. Acabamento premium, alta densidade de informação, módulos compactos e alinhados.

FORMATO
Vertical, proporção 2:3 (1024x1536). Arte até as bordas. Máxima nitidez de texto. Nenhum elemento importante encostado nas bordas.

IMAGENS ANEXADAS
Imagem 1: logotipo Elite Boardgamers. Reproduzir fielmente no canto superior esquerdo, sem redesenhar, sem alterar cores ou letras. Usar apenas o logotipo, sem o fundo ao redor dele.
Imagem 2: referência da série. Usar somente para layout, hierarquia, molduras, densidade e estilo dos painéis. Não copiar personagens, títulos, componentes, caixas ou arte do jogo mostrado nela.
Não há imagem oficial de {a["jogo"]}. Não desenhar caixa nem foto de produto. Usar ilustração temática original.

FUNDO E CLIMA
{a["clima"]}
Fundo rico e dramático, escurecido e desfocado atrás dos painéis para não competir com o texto.

LAYOUT (de cima para baixo, porcentagem da altura)
Faixa A (0 a 14%): selo à esquerda; título do jogo grande e centralizado, dominante; quadro de chamada editorial à direita.
Faixa B (14 a 19%): faixa de pergaminho com a frase de impacto; palavras-chave em pílulas logo abaixo.
Faixa C (19 a 44%): coluna esquerda (28% da largura) com a ficha rápida em pequenos painéis pretos, um ícone simples por linha; centro com {a["centro"]}; quadro "INDICADORES DA COMUNIDADE" no lado direito.
Faixa D (44 a 57%): faixa horizontal "COMO FUNCIONA?" com {len(a["D"])} cartões numerados lado a lado, cada um com cor própria, pequeno ícone, título e explicação.
Faixa E (57 a 79%): dois painéis lado a lado com a MESMA largura e a MESMA altura. Esquerda: painel verde "O QUE FUNCIONA MUITO BEM?". Direita: painel vermelho "PONTOS DE ATENÇÃO". Marcadores, espaçamento generoso, contraste alto.
Faixa F (79 a 89%): painel azul "FICHA TÉCNICA" à esquerda; até dois módulos menores à direita.
Faixa G (89 a 100%): quadro "VEREDITO ELITE BOARDGAMERS" com destaque dourado; quadro menor de recomendação de compra; linha de fontes no rodapé.
Molduras escuras com contorno luminoso. Painéis em azul, verde e vermelho, como nas referências.

TIPOGRAFIA
Títulos de painel: sans-serif condensada, caixa alta, peso extra-negrito.
Textos explicativos: sans-serif simples, peso regular, cor clara sobre painel escuro, sempre com contraste alto.
Nenhum texto menor que a linha de fontes do rodapé. Acentuação do português do Brasil exatamente como escrita abaixo.

TEXTO LITERAL
Renderizar cada item abaixo exatamente como está entre aspas, uma única vez, na zona indicada. Não acrescentar, não traduzir, não abreviar, não corrigir.
[A1] Selo: "ELITE BOARDGAMERS"
[A2] Título: {q(a["A"]["titulo"])}
[A3] Chamada: {q(a["A"]["chamada"])}
[B1] Frase: {q(a["B"]["frase"])}
[B2] Palavras-chave: {" · ".join(q(x) for x in a["B"]["chaves"])}
[C1] Ficha rápida:
{c1}
[C2] Indicadores da comunidade: {c2}
[D0] Título da faixa: "COMO FUNCIONA?"
{d}
[E0] Título verde: "O QUE FUNCIONA MUITO BEM?"
{e}
[R0] Título vermelho: "PONTOS DE ATENÇÃO"
{r}
[F0] Título azul: "FICHA TÉCNICA"
{f}
{m}
[G0] Título: "VEREDITO ELITE BOARDGAMERS"
[G1] Classificação: {q(g["classificacao"])}
[G2] Texto: {q(g["texto"])}
[G3] Compra: {q(g["compra"])}
[G4] Fontes: {q(g["fontes"])}

GRAFIAS DIFÍCEIS (soletradas para precisão)
{dif}

RESTRIÇÕES
Nenhum texto além dos itens [A1] a [G4]. Nenhuma letra embaralhada, palavra inventada ou bloco de texto falso. Nenhuma marca d'água. Nenhuma nota numérica atribuída à Elite. A ilustração temática não pode parecer caixa ou fotografia real do produto. Os painéis verde e vermelho têm o mesmo peso visual. Nada cortado nas bordas."""


def palavras(a):
    txt = json.dumps({k: v for k, v in a.items() if k not in ("clima", "centro", "dificeis", "jogo")}, ensure_ascii=False)
    return len(re.findall(r"[\wÀ-ú]+", txt))


if __name__ == "__main__":
    a = json.load(open(sys.argv[1], encoding="utf-8"))
    print(prompt(a))
    print(f"\n# palavras na arte: ~{palavras(a)} (teto 380, dividir acima de 420)", file=sys.stderr)
