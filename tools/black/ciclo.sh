#!/usr/bin/env bash
# Ciclo contínuo do Radar Black no GitHub Actions (diagnóstico de 04/11/2026: o agendamento "a cada 30 min" do GitHub
# disparou o robô normal só 2 vezes em 14 horas; o GitHub atrasa e descarta agendamentos frequentes).
#
# Em vez de esperar o agendamento, o trabalho fica ligado e roda o robô em ciclos (normal: 30 min; educado: 3 h),
# publicando depois de cada ciclo. Perto do limite de tempo do trabalho, ele dispara o próprio workflow de novo
# (workflow_dispatch com o GITHUB_TOKEN, que o GitHub permite), e o ciclo continua sem buraco. O agendamento antigo
# fica como rede de segurança: se a corrente quebrar, ele religa o ciclo.
#
# Mudar este arquivo na main liga os dois robôs na hora (gatilho push dos workflows).
# Uso (dentro do workflow): bash tools/black/ciclo.sh <normal|educado> <intervalo_s> <ciclo_max_s> <arquivo.yml>
set -u
ROBO="$1"; INTERVALO="$2"; CICLO_MAX="$3"; WORKFLOW="$4"
LIMITE=$((320 * 60))   # o trabalho tem 330 min; a folga cobre a publicação e o disparo do próximo

publicar() {
  git add conteudo/black black img/black
  if git diff --cached --quiet; then echo "nada mudou"; return 0; fi
  git commit -q -m "Radar Black: robô $ROBO de $(TZ=America/Sao_Paulo date +'%d/%m/%Y %Hh%M')"
  for i in 1 2 3 4 5; do
    git pull -q --rebase -X theirs origin main && git push -q origin HEAD:main && break
    sleep $((i * 10))
  done
  curl -s -o /dev/null -X POST -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$GITHUB_REPOSITORY/pages/builds" || true
}

git config user.name "Radar Black (Elite Boardgamers)"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
n=0
while :; do
  inicio=$SECONDS
  n=$((n + 1))
  echo "== ciclo $n do robô $ROBO ($(TZ=America/Sao_Paulo date +'%d/%m %Hh%M'))"
  git pull -q --rebase -X theirs origin main || { git rebase --abort 2>/dev/null; git fetch -q origin main && git reset -q --hard origin/main; }
  # educado: varredura completa do sitemap no domingo à tarde (UTC 14h a 16h, janela que um ciclo de 3 h sempre pega)
  acao=coletar
  if [ "$(date -u +%u)" = "7" ] && [ "$(date -u +%H)" -ge 14 ] && [ "$(date -u +%H)" -le 16 ]; then acao=varrer; fi
  if [ "$ROBO" = "normal" ]; then python3 tools/black/robo_normal.py; else python3 tools/black/robo_educado.py "$acao"; fi \
    || echo "o robô terminou com erro neste ciclo; segue no próximo"
  publicar
  espera=$((INTERVALO - (SECONDS - inicio)))
  # não começa um ciclo novo se ele puder passar do limite do trabalho
  if [ $((SECONDS + (espera > 0 ? espera : 0) + CICLO_MAX)) -ge $LIMITE ]; then break; fi
  [ $espera -gt 0 ] && sleep $espera
done

echo "== fim do trabalho depois de $n ciclos; disparando o próximo"
curl -s -X POST -H "Authorization: Bearer $GITHUB_TOKEN" -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$GITHUB_REPOSITORY/actions/workflows/$WORKFLOW/dispatches" -d '{"ref":"main"}' \
  && echo "próximo trabalho pedido"
