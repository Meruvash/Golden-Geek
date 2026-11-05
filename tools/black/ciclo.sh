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
# Uso (dentro do workflow): bash tools/black/ciclo.sh <normal|educado|ml> <intervalo_s> <ciclo_max_s> <arquivo.yml>
set -u
ROBO="$1"; INTERVALO="$2"; CICLO_MAX="$3"; WORKFLOW="$4"
LIMITE=$((320 * 60))   # o trabalho tem 330 min; a folga cobre a publicação e o disparo do próximo

publicar() {
  # batimento: prova de vida para o vigia da reserva (tools/black/vigia_radar.py), um commit por ciclo
  date -u +%Y-%m-%dT%H:%M:%S+00:00 > "conteudo/black/batimento_$ROBO.txt"
  # arquivo de dados quebrado (robô parado no meio de uma gravação) volta à versão da main em vez de ser publicado
  for f in conteudo/black/*.json; do
    python3 -c "import json,sys; json.load(open(sys.argv[1], encoding='utf-8'))" "$f" 2>/dev/null \
      || { echo "JSON quebrado, descartado: $f"; git checkout -q -- "$f" 2>/dev/null || true; }
  done
  # link de afiliado de terceiros nunca vai ao ar (pedido do usuário em 05/11/2026): se aparecer, não publica e o
  # trabalho falha no fim, para o GitHub avisar por e-mail
  if python3 -c "import sys,re,pathlib; sys.path.insert(0,'tools'); import verificar_site as v; \
p=[str(f) for f in list(pathlib.Path('conteudo/black').rglob('*.json'))+list(pathlib.Path('black').rglob('*.*')) if f.is_file() and v.AFILIADO_PUBLICO.search(f.read_text(encoding='utf-8',errors='ignore'))]; \
print('\n'.join(p)); sys.exit(1 if p else 0)"; then :; else
    echo "::error::link de afiliado de terceiros nos dados do Black: publicação suspensa neste ciclo"; AFILIADO_ACHADO=1
    git checkout -q -- conteudo/black black 2>/dev/null; return 0
  fi
  git add conteudo/black black img/black
  if git diff --cached --quiet; then echo "nada mudou"; return 0; fi
  git commit -q -m "Radar Black: robô $ROBO de $(TZ=America/Sao_Paulo date +'%d/%m/%Y %Hh%M')"
  for i in 1 2 3 4 5; do
    if git pull -q --rebase -X theirs origin main; then
      # a junção do git é por linha: com dois robôs publicando juntos, a página podia sair com cartões repetidos e um
      # JSON podia quebrar (05/11/2026). Depois de juntar, confere os dados e refaz a página a partir deles.
      for f in conteudo/black/*.json; do
        python3 -c "import json,sys; json.load(open(sys.argv[1], encoding='utf-8'))" "$f" 2>/dev/null \
          || { echo "JSON quebrado na junção, fica o da main: $f"; git checkout -q origin/main -- "$f" 2>/dev/null || true; }
      done
      python3 tools/black/radar.py pagina >/dev/null 2>&1 || echo "aviso: não refez a página depois da junção"
      git add conteudo/black black img/black
      git diff --cached --quiet || git commit -q -m "Radar Black: página refeita depois de juntar as leituras"
      git push -q origin HEAD:main && break
    fi
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
  # prazo do robô: termina 10 min antes do limite do trabalho, para sempre sobrar tempo de publicar o que já leu
  # (04/11/2026: um ciclo do educado foi morto pelo limite do GitHub no meio e 2 h 30 de leitura se perderam)
  prazo=$((LIMITE - SECONDS - 600)); [ $prazo -lt 300 ] && prazo=300
  if [ "$ROBO" = "normal" ]; then timeout --kill-after=60 "$prazo" python3 tools/black/robo_normal.py
  elif [ "$ROBO" = "ml" ]; then timeout --kill-after=60 "$prazo" python3 tools/black/robo_ml.py
  else timeout --kill-after=60 "$prazo" python3 tools/black/robo_educado.py "$acao"; fi \
    || echo "o robô terminou com erro ou no prazo neste ciclo; publica o que já leu e segue"
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
[ -n "${AFILIADO_ACHADO:-}" ] && exit 1 || exit 0
