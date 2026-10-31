"""Confere a seção "Comece a jogar em N minutos" de um tutorial Como Jogar (PADRAO_EDITORIAL.md, "Como Jogar: comece a jogar").

Uso: python3 tools/checar_comece.py docs/como-jogar/piloto/<slug>/tutorial.md
Sai com erro se a seção não seguir a diretriz. Os portões são baratos e objetivos; quem decide se a seção ensina é o teste
de execução (um leitor que só tem a seção monta a mesa e joga o primeiro turno) e, depois, o teste com pessoas.
"""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vicios import VICIOS  # noqa: E402

PALAVRAS_POR_MINUTO = 200  # leitura de texto instrutivo em português; a seção promete minutos de leitura, não de mesa
OBRIGATORIAS = ["A ideia do jogo", "Monte a mesa", "Seu primeiro turno", "Ainda não precisa saber", "Como a partida acaba"]
BLOCOS = ["[!resolvido]", "[!complete]", "[!suavez]"]
TERMOS_IDEIA = 4  # termos novos em negrito no modelo mental: o resto do vocabulário entra quando é usado


def secao(texto):
    m = re.search(r"^## \S*\s*Comece a jogar em (\d+) minutos?\n(.*?)(?=^## )", texto, re.S | re.M)
    return (int(m.group(1)), m.group(2)) if m else (None, None)


def palavras(t):
    return len(re.findall(r"\w+", re.sub(r"\|[-| ]+\|", "", t)))


def checar(texto):
    minutos, s = secao(texto)
    if s is None:
        return ["falta a seção \"## ... Comece a jogar em N minutos\""], []
    erros, avisos = [], []
    n = palavras(s)
    if n > minutos * PALAVRAS_POR_MINUTO:
        erros.append(f"{n} palavras: passa de {minutos} min de leitura ({minutos * PALAVRAS_POR_MINUTO} no máximo). Adie o que não é do primeiro turno")
    if not re.search(r"^\*\*Meta:?\*\*", s, re.M):
        erros.append("falta a linha **Meta:** dizendo a tarefa que o leitor vai conseguir fazer ao fim da seção")
    ordem = [s.find(f"### {t}") for t in OBRIGATORIAS]
    for t, i in zip(OBRIGATORIAS, ordem):
        if i < 0:
            erros.append(f"falta a subseção \"### {t}\"")
    presentes = [i for i in ordem if i >= 0]
    if presentes != sorted(presentes):
        erros.append("subseções fora da ordem: " + " > ".join(OBRIGATORIAS))
    turno = s[s.find("### Seu primeiro turno"):]
    for b in BLOCOS:
        if b not in turno:
            erros.append(f"falta o bloco {b} no primeiro turno (exemplo resolvido, tarefa para completar e tarefa sem apoio, nessa ordem)")
    pos = [turno.find(b) for b in BLOCOS]
    if all(p >= 0 for p in pos) and pos != sorted(pos):
        erros.append("os blocos do primeiro turno precisam vir na ordem: resolvido, complete, sua vez (o apoio diminui)")
    if "[!complete]" in turno and not re.search(r"\*\*Resposta do Complete:?\*\*", turno):
        erros.append("falta a **Resposta do Complete:**, depois da tarefa sem apoio (a resposta não fica junto da pergunta)")
    monte = s[s.find("### Monte a mesa"):s.find("### Seu primeiro turno")]
    if not re.search(r"^1\. ", monte, re.M):
        erros.append("a montagem precisa ser uma lista numerada, conferível na mesa")
    ideia = s[s.find("### A ideia do jogo"):s.find("### Monte a mesa")]
    termos = re.findall(r"\*\*(.+?)\*\*", ideia)
    if len(termos) > TERMOS_IDEIA:
        erros.append(f"{len(termos)} termos novos em negrito na ideia do jogo (máximo {TERMOS_IDEIA}): {', '.join(termos)}")
    if "—" in s or "–" in s:
        erros.append("travessão ou meia-risca na seção")
    if "!" in re.sub(r"Clank!|\[!\w+\]", "", s):
        avisos.append("exclamação fora do nome Clank! e das marcas de bloco")
    for padrao, dica in VICIOS:
        for m in re.finditer(padrao, s, re.I):
            avisos.append(f"vício de texto {m.group(0)!r}: {dica}")
    etapas = set(re.findall(r"etapa (\d)", s))
    existentes = set(re.findall(r"^## \d+\. Etapa (\d)", texto, re.M))
    for x in sorted(etapas - existentes):
        erros.append(f"a seção manda o leitor para a etapa {x}, que não existe no tutorial")
    return erros, avisos


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    erros, avisos = checar(Path(sys.argv[1]).read_text(encoding="utf-8"))
    for a in avisos:
        print("⚠️", a)
    for e in erros:
        print("❌", e)
    print("✅ seção Comece a jogar dentro da diretriz" if not erros else f"{len(erros)} problema(s)")
    sys.exit(1 if erros else 0)
