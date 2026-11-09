# Carrega o Chatterbox Multilingual V3 com o ajuste fino oficial de português do Brasil
# (ResembleAI/Chatterbox-Multilingual-pt-br, MIT), usando o pacote chatterbox-tts instalado.
# Só os pesos vêm do repositório pt-br; o código é o do pacote.
#
# A pasta do checkpoint (CKPT) precisa ter:
#   t3_pt_br.safetensors e s3gen_v3.safetensors (repositório pt-br)
#   ve.pt, conds.pt e grapheme_mtl_merged_expanded_v1.json (repositório base ResembleAI/chatterbox)
import os
from pathlib import Path

import torch
from safetensors.torch import load_file
from chatterbox.mtl_tts import ChatterboxMultilingualTTS, Conditionals
from chatterbox.models.s3gen import S3Gen
from chatterbox.models.t3 import T3
from chatterbox.models.t3.modules.t3_config import T3Config
from chatterbox.models.tokenizers import MTLTokenizer
from chatterbox.models.voice_encoder import VoiceEncoder

CKPT = Path(os.environ.get("CHATTERBOX_PTBR", "ptbr"))


def carregar(device: str = "cpu") -> ChatterboxMultilingualTTS:
    cpu = torch.device("cpu")
    ve = VoiceEncoder()
    ve.load_state_dict(torch.load(CKPT / "ve.pt", map_location=cpu, weights_only=True))
    ve.to(device).eval()

    t3 = T3(T3Config.multilingual())
    t3.load_state_dict(load_file(CKPT / "t3_pt_br.safetensors"))
    t3.to(device).eval()

    s3gen = S3Gen()
    faltam, sobram = s3gen.load_state_dict(load_file(CKPT / "s3gen_v3.safetensors"), strict=False)
    if faltam or sobram:
        print(f"s3gen_v3: {len(faltam)} chaves faltando, {len(sobram)} sobrando")
    s3gen.to(device).eval()

    tok = MTLTokenizer(str(CKPT / "grapheme_mtl_merged_expanded_v1.json"))
    conds = Conditionals.load(CKPT / "conds.pt", map_location=cpu).to(device)
    return ChatterboxMultilingualTTS(t3, s3gen, ve, tok, device, conds=conds)
