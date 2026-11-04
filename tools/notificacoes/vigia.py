"""Plano B das notificações do site (sininho): confere se o serviço de push (worker em api.eliteboardgamers.com.br,
src/push.js) processou os alertas novos e, se não processou, dispara o mesmo ciclo pelo /v1/push/rodar.

O caminho normal é o cron de um minuto da Cloudflare. Este vigia roda no GitHub Actions (workflow notificacoes.yml),
fora da Cloudflare: a cada publicação que mexe nas listas de alertas e a cada 15 minutos. Ele nunca manda push por
conta própria; só pede ao worker que rode. Por isso não há como duplicar: o worker só avisa um aparelho por alerta
(entregas com chave única) e o /rodar tem trava de 40 segundos.

Passos:
  1. lê as listas públicas no ar (black/alertas.json e alertas/conteudo.json) e acha o alerta mais novo de cada tema;
     com --esperar, espera o GitHub Pages publicar a versão do repositório (até 10 minutos);
  2. dá 2 minutos para o cron agir e pergunta ao worker onde cada tema parou (/v1/push/saude);
  3. se algum tema ficou para trás, ou o cron não roda há mais de 3 minutos, chama /v1/push/rodar e confere de novo;
  4. se mesmo assim ficou para trás, sai com erro (o GitHub avisa o dono do repositório por e-mail).

Uso: python3 tools/notificacoes/vigia.py [--esperar] [--sem-pausa]
"""
import json
import sys
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SITE = "https://eliteboardgamers.com.br"
API = "https://api.eliteboardgamers.com.br/v1/push"
UA = {"User-Agent": "EliteBoardgamers-vigia-notificacoes/1.0 (+https://eliteboardgamers.com.br/)",
      "Content-Type": "application/json"}
LISTAS = {"black": ("black/alertas.json", "ultimo"), "noticias": ("alertas/conteudo.json", "noticias"),
          "resenhas": ("alertas/conteudo.json", "resenhas")}


def pega(url, metodo="GET"):
    req = urllib.request.Request(url, method=metodo, headers=UA, data=b"{}" if metodo == "POST" else None)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def mais_novo(lista, tema):
    horas = [a["hora"] for a in lista if a.get("id") and a.get("hora") and (a.get("tema") or "black") == tema]
    return max(horas) if horas else None


def no_ar():
    lidas, novo = {}, {}
    for tema, (arq, _) in LISTAS.items():
        if arq not in lidas:
            lidas[arq] = pega(f"{SITE}/{arq}?t={int(time.time())}")
        novo[tema] = mais_novo(lidas[arq], tema)
    return novo


def no_repo():
    novo = {}
    for tema, (arq, _) in LISTAS.items():
        try:
            novo[tema] = mais_novo(json.loads((ROOT / arq).read_text(encoding="utf-8")), tema)
        except (FileNotFoundError, ValueError):
            novo[tema] = None
    return novo


def atrasados(saude, novo):
    ult = saude.get("ultimo") or {}
    chave = {"black": "black", "noticias": "noticias", "resenhas": "resenhas"}
    # sem marca ainda (primeira leitura) não conta como atraso: o worker só marca onde parou
    return [t for t, h in novo.items() if h and ult.get(chave[t]) and ult[chave[t]] < h]


def cron_parado(saude, minutos=3):
    r = saude.get("rodada")
    if not r:
        return True
    d = datetime.fromisoformat(r.replace("Z", "+00:00"))
    return (datetime.now(timezone.utc) - d).total_seconds() > minutos * 60


def main():
    esperar, pausa = "--esperar" in sys.argv, "--sem-pausa" not in sys.argv
    if esperar:  # espera o Pages publicar o que acabou de entrar no repositório
        alvo = no_repo()
        for _ in range(20):
            novo = no_ar()
            if all(not alvo[t] or (novo[t] and novo[t] >= alvo[t]) for t in alvo):
                break
            time.sleep(30)
        else:
            print("⚠️ o site ainda não publicou as listas novas; confiro com o que está no ar")
    novo = no_ar()
    print("mais novo no ar:", novo)
    if pausa:
        time.sleep(120)  # tempo para o cron de um minuto agir sozinho
    saude = pega(f"{API}/saude")
    print("saúde:", json.dumps(saude, ensure_ascii=False))
    if not saude.get("configurado"):
        sys.exit("❌ o worker está sem as chaves VAPID: nada é enviado (rode tools/black/instalar_push.py)")
    # serviço de push recusando envio (ex.: Apple com BadWebPushTopic em 04/11/2026): alguém deixa de receber em silêncio
    ruins = [x for x in saude.get("com_falha") or [] if (x.get("falhas") or 0) >= 3]
    if ruins:
        print("❌ serviço de push recusando envios: " + "; ".join(f"{x['servico']} ({x['falhas']} falhas): {x.get('erro')}" for x in ruins))
    falta, parado = atrasados(saude, novo), cron_parado(saude)
    if not falta and not parado and not saude.get("fila"):
        if ruins:
            sys.exit("❌ o cron processou tudo, mas há aparelho que não recebe (veja acima)")
        print("ok: o cron processou tudo")
        return
    print(f"⚠️ plano B: temas atrasados {falta or '-'}, cron parado: {parado}, fila: {len(saude.get('fila') or [])}")
    for tentativa in range(3):
        r = pega(f"{API}/rodar", "POST")
        print("rodar:", json.dumps({k: v for k, v in r.items() if k != "saude"}, ensure_ascii=False))
        saude = r.get("saude") or pega(f"{API}/saude")
        if not atrasados(saude, novo) and not saude.get("fila"):
            print("ok: plano B processou tudo")
            if parado:
                print("⚠️ o cron da Cloudflare não está rodando: confira o worker (Triggers > Cron) no painel")
            return
        time.sleep(45)
    sys.exit(f"❌ mesmo com o plano B, ficou para trás: {atrasados(saude, novo)}; erro do worker: {saude.get('erro')}")


if __name__ == "__main__":
    main()
