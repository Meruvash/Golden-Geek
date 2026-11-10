import React from "react";
import { AbsoluteFill } from "remotion";

// Luz e atmosfera no estilo 35_shinkai (Huashu Art Motion, references/风格配方/35_shinkai.md):
// raios de Tyndall + poeira luminosa, flare de lente (núcleo, estrela que gira, faixa horizontal, fantasmas
// hexagonais na linha sol→centro), bloom e separação quente/frio. Tudo determinístico a partir do tempo s.

const rnd = (seed: number) => {
  let x = seed;
  return () => ((x = (x * 1664525 + 1013904223) % 4294967296) / 4294967296);
};

// Raios de Tyndall: fatias de luz desfocadas que pulsam devagar (screen).
export const RaiosTyndall: React.FC<{ x: number; y: number; s: number; cor?: string; n?: number; ang?: number; abertura?: number; forca?: number }> = ({ x, y, s, cor = "#ffd9a0", n = 4, ang = 200, abertura = 40, forca = 0.5 }) => (
  <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
    <svg width={1080} height={1920}>
      <defs>
        <filter id="tyndallBlur"><feGaussianBlur stdDeviation={18} /></filter>
        <linearGradient id="tyndallG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={cor} stopOpacity={0.9} /><stop offset="1" stopColor={cor} stopOpacity={0} /></linearGradient>
      </defs>
      <g filter="url(#tyndallBlur)" transform={`translate(${x},${y})`}>
        {Array.from({ length: n }, (_, i) => {
          const a = ang - abertura / 2 + (abertura / Math.max(1, n - 1)) * i;
          const pulso = 0.75 + 0.25 * Math.sin(s * 1.7 + i * 1.3);
          return <path key={i} d={`M0,0 L1900,-${50 + i * 14} L1900,${50 + i * 14} Z`} fill="url(#tyndallG)" opacity={forca * pulso * (i % 2 ? 0.7 : 1)} transform={`rotate(${a})`} />;
        })}
      </g>
    </svg>
  </AbsoluteFill>
);

// Poeira luminosa: partículas que sobem e cintilam dentro da luz.
export const PoeiraLuz: React.FC<{ s: number; n?: number; caixa?: [number, number, number, number]; cor?: string; seed?: number }> = ({ s, n = 60, caixa = [0, 300, 1080, 1500], cor = "#fff1cc", seed = 7 }) => {
  const r = rnd(seed);
  const [x0, y0, w, h] = caixa;
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <svg width={1080} height={1920}>
        <defs><radialGradient id="mote"><stop offset="0" stopColor={cor} stopOpacity={1} /><stop offset="1" stopColor={cor} stopOpacity={0} /></radialGradient></defs>
        {Array.from({ length: n }, (_, i) => {
          const bx = x0 + r() * w, by = y0 + r() * h, vel = 6 + r() * 14, raio = 2 + r() * 6, fase = r() * 6.28;
          const yy = y0 + ((by - y0 - s * vel) % h + h) % h;
          const xx = bx + Math.sin(s * 0.6 + fase) * 14;
          return <circle key={i} cx={xx} cy={yy} r={raio * 2.4} fill="url(#mote)" opacity={0.25 + 0.6 * Math.abs(Math.sin(s * 1.4 + fase))} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Flare de lente: núcleo, 10 raios em estrela que giram, faixa horizontal e 5 fantasmas hexagonais.
export const FlareLente: React.FC<{ x: number; y: number; s: number; forca?: number; cor?: string }> = ({ x, y, s, forca = 1, cor = "#ffe3b0" }) => {
  const cx = 540, cy = 960;
  const hex = (r: number) => Array.from({ length: 6 }, (_, i) => `${r * Math.cos((Math.PI / 3) * i)},${r * Math.sin((Math.PI / 3) * i)}`).join(" ");
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none", opacity: forca }}>
      <svg width={1080} height={1920}>
        <defs>
          <radialGradient id="nucleo"><stop offset="0" stopColor="#fffaf0" stopOpacity={1} /><stop offset="0.25" stopColor={cor} stopOpacity={0.7} /><stop offset="1" stopColor={cor} stopOpacity={0} /></radialGradient>
          <linearGradient id="faixa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={cor} stopOpacity={0} /><stop offset="0.5" stopColor="#fffaf0" stopOpacity={0.8} /><stop offset="1" stopColor={cor} stopOpacity={0} /></linearGradient>
          <filter id="flareBlur"><feGaussianBlur stdDeviation={2} /></filter>
        </defs>
        <circle cx={x} cy={y} r={180} fill="url(#nucleo)" />
        <g transform={`translate(${x},${y}) rotate(${s * 14})`} filter="url(#flareBlur)">
          {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M0,-2 L${i % 2 ? 110 : 200},0 L0,2 Z`} fill="#fffaf0" opacity={0.55} transform={`rotate(${36 * i})`} />)}
        </g>
        <rect x={x - 460} y={y - 3} width={920} height={6} fill="url(#faixa)" />
        {[0.45, 0.75, 1.25, 1.6, 2.0].map((t, i) => (
          <polygon key={i} points={hex(18 + i * 9)} transform={`translate(${x + (cx - x) * t},${y + (cy - y) * t})`} fill={i % 2 ? "#ffd3a0" : "#b9d6ff"} opacity={0.05 + 0.025 * (i % 3)} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Separação quente/frio + vinheta: luz quente por cima, sombra fria por baixo (soft-light).
export const GradeCor: React.FC<{ quente?: string; frio?: string; forca?: number }> = ({ quente = "#ffb36b", frio = "#3a4a8a", forca = 0.35 }) => (
  <>
    <AbsoluteFill style={{ mixBlendMode: "soft-light", opacity: forca, background: `linear-gradient(180deg, ${quente} 0%, ${quente}00 55%, ${frio} 100%)`, pointerEvents: "none" }} />
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 55%, rgba(20,10,20,.45) 100%)", pointerEvents: "none" }} />
  </>
);

// Bando de pássaros ao longe, batendo asas (silhueta).
export const Passaros: React.FC<{ s: number; x0?: number; y0?: number; n?: number; vel?: number; cor?: string }> = ({ s, x0 = -100, y0 = 520, n = 7, vel = 60, cor = "#2b1d14" }) => {
  const r = rnd(31);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
      {Array.from({ length: n }, (_, i) => {
        const dx = r() * 220, dy = r() * 120, f = r() * 6.28, esc = 0.6 + r() * 0.6;
        const x = x0 + dx + s * vel * (0.9 + r() * 0.2);
        const y = y0 + dy + Math.sin(s * 1.2 + f) * 8;
        const asa = Math.sin(s * 9 + f) * 10;
        return <path key={i} d={`M${x - 16 * esc},${y - asa * esc} Q${x - 6 * esc},${y - 4} ${x},${y} Q${x + 6 * esc},${y - 4} ${x + 16 * esc},${y - asa * esc}`} stroke={cor} strokeWidth={3} fill="none" strokeLinecap="round" />;
      })}
    </svg>
  );
};

// Tremor de calor rente ao chão: distorção leve e animada (feTurbulence + deslocamento).
export const CalorChao: React.FC<{ s: number; y?: number; altura?: number; children: React.ReactNode }> = ({ s, y = 1050, altura = 300, children }) => (
  <>
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <filter id="calor" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="turbulence" baseFrequency={`0.012 ${0.06 + 0.004 * Math.sin(s)}`} numOctaves={1} seed={Math.floor(s * 12) % 50} result="t" />
        <feDisplacementMap in="SourceGraphic" in2="t" scale={6} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, clipPath: `inset(${y}px 0 ${1920 - y - altura}px 0)`, filter: "url(#calor)" }}>{children}</div>
  </>
);
