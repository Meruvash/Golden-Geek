#!/usr/bin/env bash
# Gera o infográfico quadrado pela API da OpenAI (gpt-image-2.5-flare), no estilo das referências da Elite Boardgamers.
# Uso: tools/gerar_infografico.sh <prompt.txt> <caixa.jpg> <ref1.jpg> <ref2.jpg> <saida_prefixo>
# Anexos na ordem: 1) logo  2) caixa oficial  3) e 4) infográficos de referência. Gera 2 variações: <prefixo>1.png e <prefixo>2.png
set -euo pipefail
: "${OPENAI_API_KEY:?defina OPENAI_API_KEY nas variáveis do ambiente}"
dir=$(cd "$(dirname "$0")" && pwd)
out="$5"
curl -sS --max-time 580 https://api.openai.com/v1/images/edits -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F model=gpt-image-2.5-flare -F "image[]=@$dir/assets/logo-elite.png" -F "image[]=@$2" -F "image[]=@$3" -F "image[]=@$4" \
  -F "prompt=<$1" -F size=1024x1024 -F quality=high -F n=2 -o "$out.json"
python3 - "$out" <<'PY'
import base64, json, sys
out = sys.argv[1]
d = json.load(open(out + ".json"))
if "error" in d:
    sys.exit(f"erro da OpenAI: {d['error']}")
for i, x in enumerate(d["data"], 1):
    open(f"{out}{i}.png", "wb").write(base64.b64decode(x["b64_json"]))
    print(f"{out}{i}.png")
PY
