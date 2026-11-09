// Tema único da série (PADRAO_VIDEO.md, seções 1b, 4 e 6). Todo quadro usa só estes valores.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const fontesProntas = loadFont({
  family: "Public Sans",
  url: staticFile("fontes/public-sans.woff2"),
  weight: "100 900",
});

export const cor = {
  // marca (site e infográficos)
  fundo: "#0f1115",
  texto: "#eceff3",
  textoSuave: "#a1a9b5",
  ouro: "#e3b23c",
  marca: "#e98b1e",
  // mundo da série: dessaturado e calmo; o colorido fica para o jogo e para a aura
  ceu: "#9fb0bf",
  ceuAlto: "#7f93a6",
  nuvem: "#d9dee2",
  folhagem: "#6f8a6a",
  folhagemEscura: "#566f55",
  folhagemOutono: "#a9845c",
  chao: "#7c8f5f",
  caminho: "#c4b08a",
  tronco: "#5b4a3d",
  tinta: "#1b1d24",
};

export const fonte = "Public Sans";

export const tipo = {
  titulo: { fontFamily: fonte, fontWeight: 900, fontSize: 96, lineHeight: 1.02, letterSpacing: "-0.01em" },
  apoio: { fontFamily: fonte, fontWeight: 600, fontSize: 48, lineHeight: 1.2 },
  rotulo: { fontFamily: fonte, fontWeight: 800, fontSize: 30, letterSpacing: "0.12em", textTransform: "uppercase" as const },
};

export const area = { topo: 168, baseTexto: 1330, lateral: 80 };
