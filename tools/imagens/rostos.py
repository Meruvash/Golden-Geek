"""Alerta automático de rosto de frente nas fotos (regra do usuário: mãos e perfil podem, rosto de frente não).

Usa o detector de rostos YuNet do OpenCV (opencv_zoo, licença MIT; modelo em tools/imagens/modelos/), que
roda no opencv-python-headless 4.x. O classificador Haar antigo confundia cartas com rostos e foi descartado. É só um alerta: ilustração da
caixa também pode disparar, e um rosto pequeno ou de lado pode passar. A decisão continua sendo de quem olha a
foto e marca "pessoas": true no fontes.json.

Uso: python3 tools/imagens/rostos.py <arquivo ou pasta> [...]
"""
import sys
from pathlib import Path

try:
    import cv2
except ImportError:  # sem o OpenCV instalado, o alerta só não aparece
    cv2 = None

MODELO = Path(__file__).resolve().parent / "modelos" / "face_detection_yunet_2023mar.onnx"  # YuNet, opencv_zoo (MIT)
_det = None


def _imagem(arq):
    img = cv2.imread(str(arq))
    if img is None:  # webp que o OpenCV desta máquina não abre: passa pelo Pillow
        try:
            from PIL import Image
            import numpy as np
            img = cv2.cvtColor(np.array(Image.open(arq).convert("RGB")), cv2.COLOR_RGB2BGR)
        except Exception:
            return None
    return img


def rostos(arq, confianca=0.85):
    """Quantos rostos de frente o detector YuNet vê na foto (None se não deu para analisar).
    Rosto com menos de 6% do lado menor da foto não conta (gente lá no fundo não chama atenção)."""
    global _det
    if cv2 is None or not MODELO.exists() or not hasattr(cv2, "FaceDetectorYN"):
        return None
    img = _imagem(arq)
    if img is None:
        return None
    alt, larg = img.shape[:2]
    escala = min(1.0, 1280 / max(alt, larg))
    if escala < 1:
        img = cv2.resize(img, (int(larg * escala), int(alt * escala)))
        alt, larg = img.shape[:2]
    if _det is None:
        _det = cv2.FaceDetectorYN.create(str(MODELO), "", (larg, alt), confianca, 0.3, 5000)
    _det.setInputSize((larg, alt))
    _, achados = _det.detect(img)
    if achados is None:
        return 0
    minimo = min(alt, larg) * 0.06
    return sum(1 for f in achados if min(f[2], f[3]) >= minimo)


if __name__ == "__main__":
    for a in sys.argv[1:]:
        p = Path(a)
        for f in sorted(p.glob("*")) if p.is_dir() else [p]:
            if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"):
                n = rostos(f)
                print(f"{'⚠️ ' if n else '   '}{f}: {n if n is not None else '?'} rosto(s) de frente")
