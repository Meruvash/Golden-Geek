// Gera os quadros de teaser (sem legenda) e o storyboard para o GIF promocional de um episódio.
// Uso (da pasta video/serie-ronaldo): node ferramentas/teaser.mjs ferramentas/teaser-<episodio>.json
// O JSON: { "composicao": "...Limpo", "props": {...}, "pasta": "renders/teaser-<ep>", "titulo": "...", "subtitulo": "...",
//           "link": "...", "quadros": [ { "nome": "01-abertura", "rotulo": "Abertura", "t": 1.6, "storyboard": true } ] }
// "t" é o segundo do episódio. A composição precisa esconder a legenda (prop semLegenda) para os quadros saírem limpos.
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const cfg = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
fs.mkdirSync(cfg.pasta, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: cfg.composicao, inputProps: cfg.props ?? {} });
for (const q of cfg.quadros) {
  await renderStill({ serveUrl, composition, frame: Math.round(q.t * composition.fps), output: `${cfg.pasta}/${q.nome}.jpg`, imageFormat: "jpeg", jpegQuality: 92, inputProps: cfg.props ?? {} });
  console.log("quadro", q.nome);
}
execFileSync("python3", ["ferramentas/storyboard.py", process.argv[2]], { stdio: "inherit" });
