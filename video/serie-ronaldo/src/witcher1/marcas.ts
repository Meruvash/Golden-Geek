import { FALAS } from "./dados";

// Marcadores de tempo ligados à narração: trocar uma voz não desalinha mais nada.
export const I = (id: number) => FALAS.find((f) => f.id === id)!.inicio; // início da fala
export const F = (id: number) => { const f = FALAS.find((x) => x.id === id)!; return f.inicio + f.dur; }; // fim da fala
export const W = (id: number, palavra: string, n = 1) => {
  // n-ésima ocorrência da palavra (como escrita no roteiro) dentro da fala
  const ps = FALAS.find((f) => f.id === id)!.palavras.filter((p) => p.w === palavra);
  return ps[Math.min(n, ps.length) - 1].t;
};
