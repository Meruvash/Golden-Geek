"""Gancho do Claude Code: percebe resenha ou notícia nova sem fotos e já dispara a busca de imagens.

Roda depois de cada Write, Edit ou Bash (configurado em .claude/settings.json). Para cada conteúdo novo
(conteudo/<slug>.json ou conteudo/noticias/<data>-<assunto>.json, mexido nas últimas horas) que ainda não tem
fotos aprovadas:
  1. dispara `robo.py buscar` em segundo plano, uma única vez (marca .cache/imagens/<slug>/busca.iniciada);
  2. quando a busca termina, avisa a sessão uma única vez para revisar a folha de contato (skill imagens, etapas 3 e 4).
O aviso volta para a sessão como contexto do gancho. O script nunca falha alto: qualquer erro sai em silêncio.

Teste manual: echo '{}' | python3 tools/imagens/gatilho.py
"""
import json
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CACHE = ROOT / ".cache" / "imagens"
JANELA_H = 6  # só conteúdo mexido nas últimas horas conta como novo


def slugs_novos(arquivo_tocado):
    vistos = []
    pastas = [ROOT / "conteudo", ROOT / "conteudo" / "noticias"]
    agora = time.time()
    for pasta in pastas:
        for f in pasta.glob("*.json") if pasta.exists() else []:
            if agora - f.stat().st_mtime < JANELA_H * 3600 or (arquivo_tocado and f.resolve() == arquivo_tocado):
                vistos.append(f)
    for f in vistos:
        rel = f.relative_to(ROOT / "conteudo").with_suffix("")
        yield str(rel).replace("\\", "/"), f


def tem_fotos(slug):
    reg = ROOT / slug / "fotos" / "fontes.json"
    try:
        return bool(json.loads(reg.read_text(encoding="utf-8")).get("fotos"))
    except (OSError, ValueError):
        return False


def tem_de_onde_buscar(c):
    """Resenha com editora na ficha, notícia com editora ou com fontes; sem isso a busca não teria por onde começar."""
    ficha = dict(c.get("ficha", []))
    return bool(ficha.get("Editora original") or ficha.get("Editora no Brasil") or c.get("editora") or c.get("fontes"))


def disparar(slug):
    pasta = CACHE / slug
    pasta.mkdir(parents=True, exist_ok=True)
    (pasta / "busca.iniciada").write_text(time.strftime("%Y-%m-%d %H:%M"))
    cmd = (f'python3 tools/imagens/robo.py buscar "{slug}" > "{pasta / "busca.log"}" 2>&1; '
           f'touch "{pasta / "busca.fim"}"')
    subprocess.Popen(["sh", "-c", cmd], cwd=ROOT, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                     stderr=subprocess.DEVNULL, start_new_session=True)


def resumo_busca(slug):
    try:
        n = len(json.loads((CACHE / slug / "candidatas.json").read_text(encoding="utf-8")))
    except (OSError, ValueError):
        n = 0
    return n


def main():
    try:
        evento = json.load(sys.stdin)
    except ValueError:
        evento = {}
    caminho = (evento.get("tool_input") or {}).get("file_path")
    tocado = Path(caminho).resolve() if caminho else None
    avisos = []
    for slug, f in slugs_novos(tocado):
        if tem_fotos(slug):
            continue
        try:
            c = json.loads(f.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue  # arquivo pela metade: tenta de novo no próximo gancho
        pasta = CACHE / slug
        tipo = "notícia" if slug.startswith("noticias/") else "resenha"
        reservadas = ROOT / slug / "fotos" / "reservadas"
        extra = (f" Há fotos próprias guardadas em {reservadas.relative_to(ROOT)}/ (veja reservadas.json): "
                 "considere-as antes das da editora.") if reservadas.exists() else ""
        if not (pasta / "busca.iniciada").exists():
            if not tem_de_onde_buscar(c):
                continue  # ainda sem editora nem fontes: espera a pesquisa preencher
            disparar(slug)
            avisos.append(f"Nova {tipo} detectada: {slug}. Comecei a busca de fotos em segundo plano "
                          f"(log em .cache/imagens/{slug}/busca.log). Siga com o texto; aviso quando terminar.{extra}")
        elif (pasta / "busca.fim").exists() and not (pasta / "busca.avisado").exists():
            (pasta / "busca.avisado").write_text(time.strftime("%Y-%m-%d %H:%M"))
            n = resumo_busca(slug)
            if n:
                avisos.append(f"A busca de fotos de {slug} terminou: {n} candidatas. Abra .cache/imagens/{slug}/folha.jpg "
                              f"e siga a skill imagens (etapas 3 e 4: escolher, aprovar, marcar pessoas/texto e rodar o "
                              f"crivo).{extra}")
            else:
                avisos.append(f"A busca de fotos de {slug} terminou sem candidatas (veja .cache/imagens/{slug}/busca.log). "
                              f"Siga a ordem das fontes da skill imagens (licenciadas, kits, Commons, fotos próprias)."
                              f"{extra}")
    if avisos:
        print(json.dumps({"hookSpecificOutput": {"hookEventName": evento.get("hook_event_name", "PostToolUse"),
                                                 "additionalContext": " ".join(avisos)}}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:  # um gancho nunca pode atrapalhar a sessão
        pass
