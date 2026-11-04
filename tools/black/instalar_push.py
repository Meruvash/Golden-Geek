"""Instala as notificações do navegador do Black de Verdade no serviço do site (Cloudflare Worker + D1).

Uso: python3 tools/black/instalar_push.py
Precisa de CLOUDFLARE_API_TOKEN_COMENTARIOS no ambiente (a mesma chave do instalador dos comentários).
Pode rodar de novo sem estragar nada: as tabelas usam IF NOT EXISTS e o par de chaves VAPID só é gerado na primeira
vez (a pública fica em worker/wrangler.toml como VAPID_PUBLICA; a privada vai direto para os segredos da Cloudflare,
pela entrada padrão do wrangler, sem passar por arquivo nem aparecer na tela).
"""
import base64
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "comentarios"))
sys.path.insert(0, str(ROOT / "tools"))
from instalar import wrangler  # noqa: E402

TOML = ROOT / "worker" / "wrangler.toml"
TABELAS = """
CREATE TABLE IF NOT EXISTS push_subs (endpoint TEXT PRIMARY KEY, chaves TEXT, criado TEXT, falhas INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS push_alertas (id TEXT PRIMARY KEY, lote TEXT, titulo TEXT, texto TEXT, url TEXT, imagem TEXT, criado TEXT);
CREATE INDEX IF NOT EXISTS push_alertas_lote ON push_alertas (lote);
CREATE TABLE IF NOT EXISTS push_estado (k TEXT PRIMARY KEY, v TEXT);
"""
TABELAS_TEMAS = """
CREATE TABLE IF NOT EXISTS push_fila (lote TEXT PRIMARY KEY, tema TEXT, cursor TEXT, criado TEXT);
CREATE TABLE IF NOT EXISTS push_entrega (endpoint TEXT, alerta TEXT, mostrado INTEGER DEFAULT 0, PRIMARY KEY (endpoint, alerta));
CREATE INDEX IF NOT EXISTS push_entrega_alerta ON push_entrega (alerta);
"""


def b64u(b):
    return base64.urlsafe_b64encode(b).rstrip(b"=").decode()


def main():
    token = os.environ.get("CLOUDFLARE_API_TOKEN_COMENTARIOS")
    if not token:
        sys.exit("Falta CLOUDFLARE_API_TOKEN_COMENTARIOS no ambiente.")
    toml = TOML.read_text(encoding="utf-8")
    # 1. tabelas
    wrangler("d1", "execute", "elite-interacoes", "--remote", "--command", TABELAS.replace("\n", " "), token=token)
    print("ok tabelas push_subs, push_alertas, push_estado")
    # 1b. temas (sininho do site: black, noticias, resenhas) e entrega por aparelho; ALTER falha se já existir
    for col in ("ALTER TABLE push_subs ADD COLUMN temas TEXT DEFAULT ',black,'",
                "ALTER TABLE push_alertas ADD COLUMN tema TEXT DEFAULT 'black'"):
        try:
            wrangler("d1", "execute", "elite-interacoes", "--remote", "--command", col, token=token)
        except SystemExit as erro:
            if "duplicate column" not in str(erro):
                raise
    wrangler("d1", "execute", "elite-interacoes", "--remote", "--command", TABELAS_TEMAS.replace("\n", " "), token=token)
    print("ok temas e entregas por aparelho")
    # 2. chaves VAPID (só na primeira vez)
    if "VAPID_PUBLICA" not in toml:
        from cryptography.hazmat.primitives.asymmetric import ec
        from cryptography.hazmat.primitives import serialization
        priv = ec.generate_private_key(ec.SECP256R1())
        nums = priv.private_numbers()
        pub = priv.public_key().public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)
        jwk = {"kty": "EC", "crv": "P-256", "d": b64u(nums.private_value.to_bytes(32, "big")),
               "x": b64u(nums.public_numbers.x.to_bytes(32, "big")), "y": b64u(nums.public_numbers.y.to_bytes(32, "big")), "ext": True}
        wrangler("secret", "put", "VAPID_JWK", token=token, entrada=json.dumps(jwk))
        del jwk, priv, nums
        toml = toml.replace('ORIGEM = "https://eliteboardgamers.com.br"',
                            f'ORIGEM = "https://eliteboardgamers.com.br"\nVAPID_PUBLICA = "{b64u(pub)}"', 1)
        print("ok chaves VAPID: privada guardada nos segredos da Cloudflare, pública no wrangler.toml")
    # 3. cron de um minuto
    if "[triggers]" not in toml:
        toml += '\n# notificações do Black de Verdade: lê black/alertas.json e manda o push (src/push.js)\n[triggers]\ncrons = ["* * * * *"]\n'
    TOML.write_text(toml, encoding="utf-8")
    # 4. publica
    saida = wrangler("deploy", token=token)
    print("ok worker publicado" if re.search(r"(?i)deployed|uploaded", saida) else saida[-500:])
    publica = re.search(r'VAPID_PUBLICA = "([^"]+)"', toml).group(1)
    (ROOT / "conteudo" / "black" / "push.json").write_text(json.dumps({"api": "https://api.eliteboardgamers.com.br", "chave": publica}, indent=1) + "\n",
                                                           encoding="utf-8")
    print("ok conteudo/black/push.json (chave pública para a página)")


if __name__ == "__main__":
    main()
