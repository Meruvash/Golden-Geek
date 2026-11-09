import React from "react";
import { AbsoluteFill } from "remotion";
import { cor } from "../tema";

// Clareira da floresta, no estilo da série: formas chapadas, poucos tons, sem detalhe.
export const Clareira: React.FC<{ escurecer?: number }> = ({ escurecer = 0 }) => (
  <AbsoluteFill>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={cor.ceuAlto} />
          <stop offset="0.55" stopColor={cor.ceu} />
          <stop offset="1" stopColor="#b9c3c9" />
        </linearGradient>
      </defs>
      <rect width={1080} height={1920} fill="url(#ceu)" />
      {/* nuvens */}
      <g fill={cor.nuvem} opacity={0.9}>
        <ellipse cx={250} cy={360} rx={210} ry={70} />
        <ellipse cx={330} cy={320} rx={150} ry={80} />
        <ellipse cx={820} cy={520} rx={190} ry={60} />
        <ellipse cx={880} cy={480} rx={120} ry={70} />
      </g>
      {/* árvores de fundo: copas redondas, dois tons */}
      <g>
        <rect x={60} y={980} width={40} height={300} fill={cor.tronco} />
        <circle cx={80} cy={930} r={150} fill={cor.folhagemEscura} />
        <circle cx={40} cy={900} r={90} fill={cor.folhagem} />
        <rect x={960} y={940} width={44} height={340} fill={cor.tronco} />
        <circle cx={980} cy={880} r={170} fill={cor.folhagemOutono} />
        <circle cx={1030} cy={840} r={100} fill="#b8946a" />
        <circle cx={260} cy={1180} r={110} fill={cor.folhagem} />
        <circle cx={820} cy={1190} r={120} fill={cor.folhagemEscura} />
      </g>
      {/* chão e caminho da clareira */}
      <path d="M0,1230 C260,1200 820,1200 1080,1230 L1080,1920 L0,1920 Z" fill={cor.chao} />
      <path d="M420,1920 C470,1650 500,1420 520,1240 L600,1240 C640,1420 700,1650 780,1920 Z" fill={cor.caminho} />
      <path d="M0,1600 C300,1570 760,1590 1080,1560 L1080,1920 L0,1920 Z" fill="#6c7f52" opacity={0.6} />
    </svg>
    {escurecer > 0 ? <AbsoluteFill style={{ backgroundColor: `rgba(15,17,21,${escurecer})` }} /> : null}
  </AbsoluteFill>
);

// Granulado de filme, igual em todo quadro (ruído fixo, determinístico).
export const Granulado: React.FC<{ forca?: number }> = ({ forca = 0.13 }) => (
  <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "overlay", opacity: forca }}>
    <svg width={1080} height={1920}>
      <filter id="grao">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={7} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={1080} height={1920} filter="url(#grao)" />
    </svg>
  </AbsoluteFill>
);

// Aura dourada do Wan: o único brilho além do jogo.
export const Aura: React.FC<{ x: number; y: number; raio: number; seed?: number }> = ({ x, y, raio, seed = 3 }) => {
  let s = seed;
  const rnd = () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const parts = Array.from({ length: 70 }, () => {
    const a = rnd() * Math.PI * 2;
    const d = raio * (0.45 + rnd() * 0.75);
    return { cx: x + Math.cos(a) * d * 0.8, cy: y + Math.sin(a) * d - rnd() * raio * 0.5, r: 2 + rnd() * 6, o: 0.4 + rnd() * 0.6 };
  });
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <radialGradient id={`aura${seed}`}>
          <stop offset="0" stopColor="#ffe9a6" stopOpacity={0.85} />
          <stop offset="0.45" stopColor="#e3b23c" stopOpacity={0.45} />
          <stop offset="1" stopColor="#e3b23c" stopOpacity={0} />
        </radialGradient>
      </defs>
      <ellipse cx={x} cy={y} rx={raio * 0.9} ry={raio * 1.25} fill={`url(#aura${seed})`} />
      {parts.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={i % 3 ? "#ffd977" : "#fff4cf"} opacity={p.o} />
      ))}
      {/* faíscas */}
      <g stroke="#ffe08a" strokeWidth={4} strokeLinecap="round" opacity={0.9}>
        <path d={`M${x - raio * 0.7},${y - raio * 0.2} l-30,-18`} />
        <path d={`M${x + raio * 0.75},${y - raio * 0.4} l34,-14`} />
        <path d={`M${x + raio * 0.6},${y + raio * 0.5} l28,22`} />
        <path d={`M${x - raio * 0.6},${y + raio * 0.6} l-26,20`} />
      </g>
    </svg>
  );
};
