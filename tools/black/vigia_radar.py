"""Vigia do Radar Black no GitHub Actions: decide se o workflow de reserva (radar-reserva.yml) precisa assumir um robô.

Para cada robô (normal e educado):
- "vivo" = há uma execução em andamento ou na fila do workflow principal, ou um trabalho da própria reserva para
  esse robô em outra execução;
- "recente" = o último batimento do robô (commit "Radar Black: robô <nome>" ou conteudo/black/batimento_<nome>.txt)
  é mais novo que o limite (normal: 90 min; educado: 5 h, porque o ciclo dele vai até 4 h).

Vivo e recente: nada a fazer. Nada vivo: a corrente quebrou, a reserva assume. Vivo mas sem batimento além do limite:
o trabalho travou; o vigia cancela essas execuções e a reserva assume. O principal e a reserva usam o mesmo grupo de
concorrência (radar-black-<robô>), então nunca rodam dois do mesmo robô ao mesmo tempo.

Uso (no workflow): python3 tools/black/vigia_radar.py  → grava normal=sim|nao e educado=sim|nao em $GITHUB_OUTPUT.
Sem GITHUB_TOKEN (fora do Actions) só mostra o diagnóstico.
"""
import datetime as dt
import os
import subprocess
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[2]
REPO = os.environ.get("GITHUB_REPOSITORY", "Meruvash/Golden-Geek")
TOKEN = os.environ.get("GITHUB_TOKEN")
API = f"https://api.github.com/repos/{REPO}"
H = {"Accept": "application/vnd.github+json", **({"Authorization": f"Bearer {TOKEN}"} if TOKEN else {})}
ESTE = os.environ.get("GITHUB_RUN_ID")
ROBOS = {"normal": ("radar-normal.yml", 90), "educado": ("radar-educado.yml", 300)}
VIVOS = ("in_progress", "queued", "waiting", "pending", "requested")


def agora():
    return dt.datetime.now(dt.timezone.utc)


def ultimo_batimento(robo):
    """Hora do batimento mais novo do robô: arquivo de batimento ou commit do robô na main."""
    horas = []
    arq = ROOT / "conteudo" / "black" / f"batimento_{robo}.txt"
    if arq.exists():
        try:
            horas.append(dt.datetime.fromisoformat(arq.read_text(encoding="utf-8").split()[0]))
        except (ValueError, IndexError):
            pass
    r = subprocess.run(["git", "log", "-1", "--format=%cI", "--author=Radar Black", f"--grep=robô {robo}", "origin/main"],
                       cwd=ROOT, capture_output=True, text=True)
    if r.returncode == 0 and r.stdout.strip():
        horas.append(dt.datetime.fromisoformat(r.stdout.strip()))
    return max(horas) if horas else None


def execucoes(arquivo):
    """Execuções vivas de um workflow (id), fora a atual."""
    ids = []
    for st in VIVOS:
        r = requests.get(f"{API}/actions/workflows/{arquivo}/runs", headers=H, params={"status": st, "per_page": 20}, timeout=30)
        if r.ok:
            ids += [x["id"] for x in r.json().get("workflow_runs", []) if str(x["id"]) != ESTE]
    return sorted(set(ids))


def reserva_viva(robo):
    """Execuções da reserva (outras) com o trabalho deste robô em andamento ou na fila."""
    ids = []
    for run in execucoes("radar-reserva.yml"):
        r = requests.get(f"{API}/actions/runs/{run}/jobs", headers=H, timeout=30)
        if r.ok and any(j["name"] == robo and j["status"] in VIVOS for j in r.json().get("jobs", [])):
            ids.append(run)
    return ids


def inicio_mais_novo(runs):
    """Hora em que começou a execução viva mais nova: um ciclo longo (o educado vai até 4 h) só grava o batimento no fim,
    então execução que começou há pouco não está travada mesmo sem batimento recente (erro corrigido em 04/11/2026)."""
    horas = []
    for run in runs:
        r = requests.get(f"{API}/actions/runs/{run}", headers=H, timeout=30)
        if r.ok and r.json().get("run_started_at") and r.json().get("status") == "in_progress":
            horas.append(dt.datetime.fromisoformat(r.json()["run_started_at"].replace("Z", "+00:00")))
    return max(horas) if horas else None


def decidir():
    saida = {}
    for robo, (arquivo, limite) in ROBOS.items():
        vivos = (execucoes(arquivo) + reserva_viva(robo)) if TOKEN else []
        # sinal de vida = o mais novo entre o último batimento e o começo da execução viva
        sinais = [x for x in (ultimo_batimento(robo), inicio_mais_novo(vivos) if vivos else None) if x]
        bat = max(sinais) if sinais else None
        idade = (agora() - bat).total_seconds() / 60 if bat else None
        recente = idade is not None and idade <= limite
        if TOKEN and not vivos:
            rodar, motivo = True, "nenhuma execução viva: a corrente quebrou"
        elif vivos and not recente:
            rodar, motivo = True, f"execução viva sem sinal de vida há {idade:.0f} min (limite {limite}): travada, cancelando" if idade else "execução viva sem batimento: travada, cancelando"
            for run in vivos:
                requests.post(f"{API}/actions/runs/{run}/cancel", headers=H, timeout=30)
        else:
            rodar, motivo = False, f"ok: {len(vivos)} execução(ões) viva(s), último sinal de vida há {idade:.0f} min" if idade is not None else "ok"
        print(f"{robo}: {'ASSUMIR' if rodar else 'seguir'} ({motivo})")
        saida[robo] = "sim" if rodar else "nao"
    if os.environ.get("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as f:
            for k, v in saida.items():
                f.write(f"{k}={v}\n")
    return saida


if __name__ == "__main__":
    decidir()
