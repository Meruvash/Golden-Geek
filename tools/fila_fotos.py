"""Triagem de fotos da pauta: só entra em produção o jogo que tem foto oficial boa para o topo da página.

Uso:
  python3 tools/fila_fotos.py proximos [N]        os N próximos `na_fila` (padrão 6), com slug e situação das fotos
  python3 tools/fila_fotos.py aprovado "<jogo>" <slug>
                                                  registra o slug no jogo da pauta (fotos liberadas pelo crivo)
  python3 tools/fila_fotos.py sem-fotos "<jogo>" --obs "editoras consultadas"
                                                  tira o jogo da fila: status `sem_fotos`, com data e observação
  python3 tools/fila_fotos.py voltar "<jogo>"      devolve um jogo `sem_fotos` à fila (chegaram fotos, kit de imprensa)
  python3 tools/fila_fotos.py dia                 os 4 jogos do dia: sempre com pelo menos 1 carro-chefe (★)
  python3 tools/fila_fotos.py reordenar           recalcula a prioridade (vencedores do Golden Geek primeiro)

Carro-chefe (pedido do usuário em 30/10/2026): jogo-base que venceu o Golden Geek em Jogo do Ano (leve, médio
ou pesado), Temático, Estratégia, Cooperativo, Família ou Festa, ou em duas categorias ou mais. É o jogo que dá
para divulgar como destaque do dia; todo dia sai pelo menos um.

O jogo `sem_fotos` mantém a prioridade: volta para o mesmo lugar da fila quando ganhar fotos.
"""
import json
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from checar_roteiro import fotos_liberadas  # noqa: E402

PAUTA = ROOT / "pauta.json"


def slugificar(nome):
    s = unicodedata.normalize("NFKD", nome).encode("ascii", "ignore").decode().lower()
    s = re.sub(r"[:’'].*$", "", s) if len(s) > 30 else s  # subtítulo longo fica de fora
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def carregar():
    return json.loads(PAUTA.read_text(encoding="utf-8"))


def gravar(p):
    p["atualizado_em"] = date.today().isoformat()
    PAUTA.write_text(json.dumps(p, ensure_ascii=False, indent=1), encoding="utf-8")


def achar(p, nome):
    for j in p["jogos"]:
        if j["jogo"] == nome:
            return j
    sys.exit(f"{nome!r} não está na pauta")


CATEGORIAS_FORTES = {"Jogo do Ano leve", "Jogo do Ano médio", "Jogo do Ano pesado", "Jogo do Ano", "Temático",
                     "Estratégia", "Cooperativo", "Família", "Festa"}
POR_DIA = 4


def vitorias_gg(j):
    return [p for p in j.get("premiacoes", []) if p.get("premio") == "Golden Geek" and p.get("colocacao") == 1]


def carro_chefe(j):
    v = vitorias_gg(j)
    return j.get("tipo") == "jogo" and (len(v) >= 2 or any(p.get("categoria") in CATEGORIAS_FORTES for p in v))


def situacao(j):
    slug = j.get("slug") or slugificar(j["jogo"])
    if fotos_liberadas(slug):
        return slug, "fotos ok"
    if (ROOT / "triagem" / f"{slug}.json").exists() or (ROOT / "conteudo" / f"{slug}.json").exists():
        return slug, "em triagem, sem foto de topo"
    return slug, "fazer triagem"


def reordenar():
    """Vencedores do Golden Geek primeiro (carros-chefe, depois os outros vencedores), então o resto na ordem
    antiga; expansões no fim. Entre os carros-chefe, mais vitórias no Golden Geek e Jogo do Ano primeiro, depois o
    prêmio mais recente. Jogos publicados não mudam de número."""
    p = carregar()
    abertos = [j for j in p["jogos"] if j["status"] != "publicado"]
    def faixa(j):
        if j.get("tipo") != "jogo":
            return 3
        return 0 if carro_chefe(j) else 1 if vitorias_gg(j) else 2
    numeros = sorted(j["prioridade"] for j in abertos)
    def chave(j):
        v = vitorias_gg(j)
        jda = any(p.get("categoria", "").startswith("Jogo do Ano") for p in v)
        return (faixa(j), -len(v) if faixa(j) == 0 else 0, not jda if faixa(j) == 0 else 0,
                -max((p.get("ano", 0) for p in v), default=0) if faixa(j) == 0 else 0, j["prioridade"])
    for n, j in zip(numeros, sorted(abertos, key=chave)):
        j["prioridade"] = n
        j["carro_chefe"] = carro_chefe(j)
    gravar(p)
    print(f"{len(abertos)} jogos reordenados; {sum(carro_chefe(j) for j in abertos)} carros-chefe")


def dia():
    """Os 4 do dia: os primeiros com fotos ok, garantindo pelo menos um carro-chefe."""
    p = carregar()
    fila = sorted((j for j in p["jogos"] if j["status"] == "na_fila" and j.get("tipo") == "jogo"),
                  key=lambda j: j["prioridade"])
    usados = {j.get("slug") for j in p["jogos"] if j["status"] == "publicado"}
    # slug que já tem página publicada é de outro jogo (ex.: Ares Expedition caindo em terraforming-mars)
    prontos = [j for j in fila if situacao(j)[1] == "fotos ok" and situacao(j)[0] not in usados
               and not (ROOT / situacao(j)[0] / "index.html").exists()]
    escolha = prontos[:POR_DIA]
    if not any(carro_chefe(j) for j in escolha):
        chefe = next((j for j in prontos if carro_chefe(j)), None)
        if chefe:
            escolha = escolha[:POR_DIA - 1] + [chefe]
        else:
            alvo = next((j for j in fila if carro_chefe(j)), None)
            print(f"⚠️ nenhum carro-chefe com fotos ok: faça a triagem de {alvo['jogo'] if alvo else '?'} antes de escrever")
    for j in escolha:
        print(f'{j["prioridade"]:>4}  {"★" if carro_chefe(j) else " "} {situacao(j)[0]:<32} {j["jogo"]}')


def proximos(n):
    p = carregar()
    fila = sorted((j for j in p["jogos"] if j["status"] == "na_fila" and j.get("tipo") == "jogo"),
                  key=lambda j: j["prioridade"])
    for j in fila[:n]:
        slug, sit = situacao(j)
        print(f'{j["prioridade"]:>4}  {"★" if carro_chefe(j) else " "} {slug:<32} {sit:<30} {j["jogo"]}')


def main():
    args = sys.argv[1:]
    if not args:
        sys.exit(__doc__)
    cmd, resto = args[0], args[1:]
    if cmd == "proximos":
        proximos(int(resto[0]) if resto else 6)
        return
    if cmd == "dia":
        dia()
        return
    if cmd == "reordenar":
        reordenar()
        return
    p = carregar()
    j = achar(p, resto[0])
    if cmd == "aprovado":
        if not fotos_liberadas(resto[1]):
            sys.exit(f"{resto[1]}: o crivo ainda não liberou foto para o topo (crivo.py --aplicar)")
        j["slug"] = resto[1]
        j.pop("fotos", None)
    elif cmd == "sem-fotos":
        obs = resto[resto.index("--obs") + 1] if "--obs" in resto else ""
        j["status"] = "sem_fotos"
        j["fotos"] = {"verificado_em": date.today().isoformat(), "obs": obs}
    elif cmd == "voltar":
        j["status"] = "na_fila"
        j.pop("fotos", None)
    else:
        sys.exit(__doc__)
    gravar(p)
    print(j["jogo"], "→", j["status"], j.get("slug", ""))


if __name__ == "__main__":
    main()
