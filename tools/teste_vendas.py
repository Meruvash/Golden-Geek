"""Teste das credenciais de vendas no GitHub Actions (workflow teste-vendas.yml). Mostra só resultados, nunca as chaves.

Confere, sem criar preferência, pagamento, envio nem etiqueta:
  1. presença e tamanho de cada segredo (MP_*, ME_*, ML_*, Cloudflare);
  2. Mercado Livre: token client_credentials;
  3. Mercado Pago: token client_credentials e /users/me (site, país, tipo de documento, sem o número);
  4. Melhor Envio: ME_CONTATO parece e-mail; a página de autorização aceita o client_id?
  5. Cloudflare: token verify e a rota /v1/mercado/lista do worker no ar.

Uso: python3 tools/teste_vendas.py
"""
import os
import re
from urllib.parse import urlencode, urlsplit

import requests

UA = {"User-Agent": "EliteBoardgamers/1.0 (+https://eliteboardgamers.com.br/black/robo/)"}
NOMES = ["ML_CLIENT_ID", "ML_CLIENT_SECRET", "MP_CLIENT_ID", "MP_CLIENT_SECRET", "MP_CHAVE",
         "ME_CLIENT_ID", "ME_CLIENT_SECRET", "ME_CONTATO", "CLOUDFLARE_API_TOKEN_COMENTARIOS"]
SEGREDOS = [v for k in NOMES if (v := os.environ.get(k)) and len(v) >= 4]
resumo = []


def limpa(texto):
    """Tira do texto qualquer valor de segredo, por garantia (o GitHub também mascara)."""
    texto = str(texto)
    for s in SEGREDOS:
        texto = texto.replace(s, "[oculto]")
    return texto


def diz(*partes):
    print(limpa(" ".join(str(p) for p in partes)))


def erro_api(r):
    try:
        j = r.json()
        return limpa(f"{j.get('error', '')} {j.get('message', '')} {j.get('error_description', '')}".strip())[:200]
    except ValueError:
        return limpa(r.text[:200])


def presenca():
    diz("== Presença dos segredos")
    for k in NOMES:
        v = os.environ.get(k, "")
        diz(f"{k}: {'presente' if v else 'AUSENTE'} ({len(v)} caracteres)")


def mercado_livre():
    diz("== Mercado Livre")
    cid, seg = os.environ.get("ML_CLIENT_ID"), os.environ.get("ML_CLIENT_SECRET")
    if not cid or not seg:
        resumo.append(("Mercado Livre", "não", "não testado", "faltam ML_CLIENT_ID/ML_CLIENT_SECRET"))
        return
    r = requests.post("https://api.mercadolibre.com/oauth/token", headers=UA, timeout=30,
                      data={"grant_type": "client_credentials", "client_id": cid, "client_secret": seg})
    diz(f"token: HTTP {r.status_code}" + ("" if r.ok else f" {erro_api(r)}"))
    resumo.append(("Mercado Livre", "sim", "sim" if r.ok else "não", f"token HTTP {r.status_code}"))


def mercado_pago():
    diz("== Mercado Pago")
    cid, seg = os.environ.get("MP_CLIENT_ID"), os.environ.get("MP_CLIENT_SECRET")
    if not cid or not seg:
        resumo.append(("Mercado Pago", "não", "não testado", "faltam MP_CLIENT_ID/MP_CLIENT_SECRET"))
        return
    r = requests.post("https://api.mercadopago.com/oauth/token", headers=UA, timeout=30,
                      json={"client_id": cid, "client_secret": seg, "grant_type": "client_credentials"})
    if not r.ok:
        diz(f"token: HTTP {r.status_code} {erro_api(r)}")
        resumo.append(("Mercado Pago", "sim", "não", f"token HTTP {r.status_code}: {erro_api(r)[:80]}"))
        return
    j = r.json()
    token = j.get("access_token", "")
    tipo = "produção (APP_USR)" if token.startswith("APP_USR") else "teste (TEST)" if token.startswith("TEST") else "outro formato"
    diz(f"token: HTTP {r.status_code}; access_token: {'sim' if token else 'não'}; user_id: {j.get('user_id')}; "
        f"live_mode: {j.get('live_mode')}; tipo: {tipo}")
    me = requests.get("https://api.mercadopago.com/users/me", timeout=30, headers={**UA, "Authorization": f"Bearer {token}"})
    obs = f"token ok, {tipo}, user_id {j.get('user_id')}"
    if me.ok:
        u = me.json()
        doc = (u.get("identification") or {}).get("type")
        empresa = u.get("company") or {}
        pessoa = "jurídica" if doc == "CNPJ" or empresa.get("corporate_name") else "física" if doc == "CPF" else "não informado"
        diz(f"/users/me: HTTP {me.status_code}; site_id: {u.get('site_id')}; país: {u.get('country_id')}; "
            f"documento: {doc or '-'}; pessoa {pessoa}; user_type: {u.get('user_type', '-')}")
        obs += f"; {u.get('site_id')}/{u.get('country_id')}, pessoa {pessoa}"
    else:
        diz(f"/users/me: HTTP {me.status_code} {erro_api(me)}")
        obs += f"; /users/me HTTP {me.status_code}"
    resumo.append(("Mercado Pago", "sim", "sim", obs))


def melhor_envio():
    diz("== Melhor Envio")
    cid, seg, contato = (os.environ.get(k, "") for k in ("ME_CLIENT_ID", "ME_CLIENT_SECRET", "ME_CONTATO"))
    email = bool(re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", contato))
    diz(f"ME_CLIENT_ID e ME_CLIENT_SECRET: {'presentes' if cid and seg else 'faltando'}; "
        f"ME_CONTATO parece e-mail: {'sim' if email else 'não'}")
    if not cid:
        resumo.append(("Melhor Envio", "não", "não testado", "falta ME_CLIENT_ID"))
        return
    url = "https://melhorenvio.com.br/oauth/authorize?" + urlencode({
        "client_id": cid, "redirect_uri": "https://api.eliteboardgamers.com.br/v1/envio/retorno",
        "response_type": "code", "state": "teste", "scope": "shipping-calculate"})
    agente = {"User-Agent": f"Mercado da Elite Boardgamers ({contato})" if email else UA["User-Agent"]}
    r = requests.get(url, headers=agente, timeout=30, allow_redirects=False)
    destino = urlsplit(r.headers.get("location", ""))
    titulo = re.search(r"<title[^>]*>(.*?)</title>", r.text or "", re.S | re.I)
    texto = (r.text or "").lower()
    invalido = any(t in texto for t in ("client invalid", "invalid_client", "client_id inválido", "cliente inválido"))
    diz(f"autorização: HTTP {r.status_code}; redireciona para: {destino.netloc}{destino.path or '-'}; "
        f"título: {titulo.group(1).strip()[:80] if titulo else '-'}; reclama de client inválido: {'sim' if invalido else 'não'}")
    if invalido:
        m = re.search(r"(client[^<]{0,80}inv[aá]lid[^<]{0,40}|invalid[_ ]client[^<]{0,80})", r.text, re.I)
        diz("mensagem:", m.group(1).strip() if m else "-")
    ok = r.status_code in (200, 302) and not invalido
    resumo.append(("Melhor Envio", "sim" if cid and seg else "parcial", "sim" if ok else "não",
                   f"authorize HTTP {r.status_code}{', client inválido' if invalido else ''}; ME_CONTATO e-mail: {'sim' if email else 'não'}"))


def cloudflare():
    diz("== Cloudflare")
    tok = os.environ.get("CLOUDFLARE_API_TOKEN_COMENTARIOS")
    if tok:
        r = requests.get("https://api.cloudflare.com/client/v4/user/tokens/verify", timeout=30,
                         headers={"Authorization": f"Bearer {tok}"})
        st = (r.json().get("result") or {}).get("status") if r.ok else None
        diz(f"token verify: HTTP {r.status_code}; status: {st}")
        resumo.append(("Cloudflare", "sim", "sim" if st == "active" else "não", f"token {st}"))
    else:
        resumo.append(("Cloudflare", "não", "não testado", "segredo não está no GitHub"))
    r = requests.get("https://api.eliteboardgamers.com.br/v1/mercado/lista", timeout=30,
                     headers={**UA, "Origin": "https://eliteboardgamers.com.br"})
    diz(f"worker /v1/mercado/lista: HTTP {r.status_code} {r.text[:80]}")
    resumo.append(("Worker /v1/mercado/lista", "-", "sim" if r.ok else "não",
                   "404 = worker no ar ainda sem o Mercado" if r.status_code == 404 else f"HTTP {r.status_code}"))


if __name__ == "__main__":
    presenca()
    for etapa in (mercado_livre, mercado_pago, melhor_envio, cloudflare):
        try:
            etapa()
        except requests.RequestException as e:
            diz(f"erro de rede em {etapa.__name__}: {type(e).__name__}")
            resumo.append((etapa.__name__, "?", "não", "erro de rede"))
    diz("\n== Resumo\nserviço | credencial presente | funcionou | observação")
    for linha in resumo:
        diz(" | ".join(linha))
