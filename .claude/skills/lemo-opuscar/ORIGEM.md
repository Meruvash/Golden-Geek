# Origem: Lemo-Opuscar

- Repositório: https://github.com/lemomo-ai/lemo-opuscar (by Lemomo / LemoLab)
- Versão fixada: commit `9eb7739` (10/11/2026)
- Licença: código MIT; filmes de demonstração e imagens CC BY 4.0 (crédito à LemoLab). Seis faixas de voz das demos não são CC BY e não devem ser reusadas.
- Instalado em 11/11/2026 com autorização explícita do editor.

## O que foi copiado
- `.claude/skills/lemo-opuscar/`: a skill (`SKILL.md`, `scripts/setup.sh`) do `plugin/skills/lemo-opuscar/` original.
- `video/lemo-opuscar/`: a biblioteca (guias `AGENTS.md`, `DIRECTOR.md`, `TECHNIQUE.md`, `MY-STYLES.md`; 66 estilos com `STYLE.md` e `style.json`; ferramentas `core/` e `tools/`).
- Fora da cópia (o mesmo que o `setup.sh` original pula): fontes das demos (`styles/*/demo`), pôsteres, `styleboard/` e imagens grandes de `docs/`. Para estudar a demo de um estilo: `sh scripts/setup.sh demo <slug>`.

## Única alteração
- `SKILL.md`, passo 1: usa a cópia fixada em `video/lemo-opuscar/` via `LEMO_OPUSCAR_HOME`, em vez de clonar e atualizar `~/lemo-opuscar` sozinho.

## Uso no projeto
Motor complementar ao Remotion: grava planos inteiros (1080x1080, `--size 1080x1080 --fps 30`) que entram como vídeo na linha do tempo do Remotion. Personagens fixos da série continuam no Remotion. Dependências (`setup.sh deps`) só quando for usar; vão para `video/lemo-opuscar/node_modules` e `.venv`, já ignorados pelo `.gitignore` da biblioteca.
