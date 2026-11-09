import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile } from "remotion";
import { cor, fonte, tipo } from "../tema";

// Peças da série "E se você acordasse dentro de Andromeda's Edge" (partes 1 e 2).
// Naves, invasor, dados e cenário são desenhos nossos, não a arte do jogo.

export const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
export const SAI = Easing.bezier(0.7, 0, 0.84, 0);
export const prog = (s: number, t0: number, d: number, ease = ENTRA) =>
  interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
export const mola = (s: number, t0: number) => {
  const x = Math.max(0, s - t0);
  return x <= 0 ? 0 : 1 - Math.exp(-9 * x) * Math.cos(14 * x);
};
export const entre = (s: number, a: number, b: number) => s >= a && s < b;
export const pos = (k: number) => Math.max(0.001, k); // escala nunca zero (SVG)

export const CIANO = "#6ee7ff";
export const VERDE = "#3ddc84";
export const VERMELHO = "#ff6b5b";
export const ROXO = "#b493ff";
export const CORES_FALA: Record<string, string> = { narrador: cor.texto, ronaldo: "#8fb4ff", wan: cor.ouro };

export type Fala = { id: number; quem: string; texto: string; inicio: number; dur: number; arquivo: string; palavras: { t: number; w: string }[] };

export const Legenda: React.FC<{ s: number; falas: Fala[]; ocultar: number[] }> = ({ s, falas, ocultar }) => {
  const f = falas.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.25);
  if (!f || ocultar.includes(f.id)) return null;
  const c = CORES_FALA[f.quem];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1196, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(8,10,20,.88)", borderRadius: 24, padding: "14px 26px", maxWidth: 960, textAlign: "center" }}>
        {f.quem !== "narrador" ? <div style={{ ...tipo.rotulo, fontSize: 24, color: c, marginBottom: 4 }}>{f.quem === "wan" ? "Wan" : "Ronaldo"}</div> : null}
        <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 40, lineHeight: 1.2 }}>
          {f.palavras.map((p, i) => (
            <span key={i} style={{ color: s >= p.t ? c : "rgba(236,239,243,.38)" }}>{p.w} </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Ponte da estação espacial, com o espaço atrás e a Baía de Lançamento no chão.
export const Espaco: React.FC<{ s: number; alerta?: number; escuro?: number }> = ({ s, alerta = 0, escuro = 0 }) => {
  let semente = 17;
  const rnd = () => ((semente = (semente * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const estrelas = Array.from({ length: 140 }, () => ({ x: rnd() * 1080, y: rnd() * 1500, r: 0.8 + rnd() * 2.4, f: rnd() * 6 }));
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920}>
        <defs>
          <linearGradient id="fundoAE" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070914" />
            <stop offset="0.6" stopColor="#141033" />
            <stop offset="1" stopColor="#0c0f1e" />
          </linearGradient>
          <radialGradient id="neb1"><stop offset="0" stopColor={ROXO} stopOpacity={0.45} /><stop offset="1" stopColor={ROXO} stopOpacity={0} /></radialGradient>
          <radialGradient id="neb2"><stop offset="0" stopColor={CIANO} stopOpacity={0.3} /><stop offset="1" stopColor={CIANO} stopOpacity={0} /></radialGradient>
          <radialGradient id="planeta" cx="35%" cy="30%"><stop offset="0" stopColor="#f0a86b" /><stop offset="1" stopColor="#7a3b2e" /></radialGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#fundoAE)" />
        <ellipse cx={240 + 20 * Math.sin(s * 0.2)} cy={420} rx={520} ry={300} fill="url(#neb1)" />
        <ellipse cx={860} cy={900 + 15 * Math.cos(s * 0.25)} rx={460} ry={340} fill="url(#neb2)" />
        {estrelas.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="#fff" opacity={0.35 + 0.45 * Math.abs(Math.sin(s * 1.3 + e.f))} />
        ))}
        <circle cx={930} cy={1320} r={170} fill="url(#planeta)" opacity={0.9} />
        <ellipse cx={930} cy={1320} rx={260} ry={46} fill="none" stroke="#f3cdae" strokeWidth={6} opacity={0.35} transform="rotate(-14 930 1320)" />
        <path d="M0,1560 L1080,1560 L1080,1920 L0,1920 Z" fill="#1a1d2b" />
        <path d="M0,1560 L1080,1560" stroke={CIANO} strokeWidth={4} opacity={0.5} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${540 + (i - 3) * 90},1560 L${540 + (i - 3) * 330},1920`} stroke="#2a2f45" strokeWidth={3} />
        ))}
        <path d="M0,1700 L1080,1700 M0,1820 L1080,1820" stroke="#2a2f45" strokeWidth={3} />
      </svg>
      {escuro > 0 ? <AbsoluteFill style={{ backgroundColor: `rgba(7,9,20,${escuro})` }} /> : null}
      {alerta > 0 ? <AbsoluteFill style={{ backgroundColor: `rgba(255,60,60,${0.18 * alerta})` }} /> : null}
    </AbsoluteFill>
  );
};

// Nave em ponta de flecha, como as naves de plástico do jogo. Centro em (x, y).
export const Nave: React.FC<{ x: number; y: number; esc?: number; c?: string; giro?: number; op?: number }> = ({ x, y, esc = 1, c = VERDE, giro = 0, op = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${pos(esc)})`} opacity={op}>
    <path d="M0,-60 L44,46 L0,24 L-44,46 Z" fill={c} stroke="#0b0d1a" strokeWidth={5} strokeLinejoin="round" />
    <path d="M0,-60 L44,46 L0,24 Z" fill="#000" opacity={0.18} />
    <path d="M-14,40 L0,74 L14,40 Z" fill={cor.ouro} opacity={0.85} />
  </g>
);

// Invasor (nosso desenho), vermelho e espinhoso.
export const Invasor: React.FC<{ x: number; y: number; esc?: number; giro?: number }> = ({ x, y, esc = 1, giro = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${pos(esc)})`}>
    <path d="M0,-70 L18,-30 L62,-44 L38,-6 L74,18 L30,22 L22,64 L0,34 L-22,64 L-30,22 L-74,18 L-38,-6 L-62,-44 L-18,-30 Z" fill={VERMELHO} stroke="#0b0d1a" strokeWidth={5} strokeLinejoin="round" />
    <circle r={20} fill="#ffd977" />
    <circle r={9} fill="#0b0d1a" />
  </g>
);

const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};
export const Dado: React.FC<{ x: number; y: number; v: number; c: string; esc?: number; giro?: number; op?: number; marca?: "x" | "v" }> = ({ x, y, v, c, esc = 1, giro = 0, op = 1, marca }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${pos(esc)})`} opacity={op}>
    <rect x={-60} y={-60} width={120} height={120} rx={22} fill={c} stroke="#0b0d1a" strokeWidth={6} />
    {PIPS[v].map(([a, b], i) => <circle key={i} cx={a * 30} cy={b * 30} r={11} fill="#0b0d1a" />)}
    {marca ? (
      <g transform="translate(0,82)">
        <circle r={26} fill="#fff" />
        {marca === "x" ? <path d="M-11,-11 L11,11 M11,-11 L-11,11" stroke={VERMELHO} strokeWidth={7} strokeLinecap="round" /> : <path d="M-12,0 L-3,10 L13,-10" stroke="#1f9d55" strokeWidth={7} fill="none" strokeLinecap="round" />}
      </g>
    ) : null}
  </g>
);

// Valor do dado enquanto rola (troca rápido) e depois o resultado.
export const rolar = (s: number, t0: number, d: number, final: number, k = 0) => (s < t0 + d ? 1 + (Math.floor(s * 16 + k) % 6) : final);

// Hexágono de região do mapa. Centro em (x, y).
export const Hex: React.FC<{ x: number; y: number; r?: number; fill: string; borda: string; rotulo?: string }> = ({ x, y, r = 130, fill, borda, rotulo }) => {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${x + r * Math.cos(a)},${y + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <g>
      <polygon points={pts} fill={fill} stroke={borda} strokeWidth={4} />
      {rotulo ? <text x={x} y={y + r * 0.86 - 14} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={28} fill={cor.texto} opacity={0.85}>{rotulo}</text> : null}
    </g>
  );
};

// Painel holográfico onde as regras aparecem.
export const Painel: React.FC<{ op: number; children: React.ReactNode; titulo?: string; corBorda?: string; top?: number; altura?: number }> = ({ op, children, titulo, corBorda = CIANO, top = 330, altura = 820 }) =>
  op <= 0 ? null : (
    <div style={{ position: "absolute", left: 50, right: 50, top, height: altura, opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,12,28,.9)", border: `3px solid ${corBorda}`, borderRadius: 30, boxShadow: `0 0 40px ${corBorda}55` }} />
      {titulo ? <div style={{ position: "absolute", left: 40, top: 30, ...tipo.rotulo, color: corBorda }}>{titulo}</div> : null}
      {children}
    </div>
  );

export const Credito: React.FC<{ texto: string }> = ({ texto }) => (
  <div style={{ position: "absolute", right: 30, bottom: 18, ...tipo.rotulo, fontSize: 22, color: cor.textoSuave }}>{texto}</div>
);

// Selo "Dica real": regra de verdade do manual, no meio da história de ficção.
export const SeloDica: React.FC = () => (
  <div style={{ position: "absolute", left: 40, top: -26, background: cor.ouro, color: "#070914", fontFamily: fonte, fontWeight: 900, fontSize: 28, letterSpacing: "0.08em", padding: "8px 18px", borderRadius: 12, textTransform: "uppercase" }}>Dica real</div>
);

// Cartela final com o link do tutorial.
export const Cartela: React.FC<{ op: number; rotulo: string; botao: string; kBotao: number; kLogo: number }> = ({ op, rotulo, botao, kBotao, kLogo }) => (
  <AbsoluteFill style={{ background: `rgba(7,9,20,${0.86 * op})` }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", opacity: op }}>
      <div style={{ ...tipo.rotulo, color: CIANO }}>{rotulo}</div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 50, color: cor.fundo, background: cor.marca, padding: "28px 56px", borderRadius: 999, transform: `scale(${0.8 + 0.2 * kBotao})`, opacity: kBotao }}>{botao}</div>
      </div>
      <div style={{ margin: "50px auto 0", width: 920, border: `3px solid ${cor.ouro}`, borderRadius: 28, padding: "26px 30px", background: "rgba(8,12,28,.7)" }}>
        <div style={{ ...tipo.rotulo, fontSize: 28, color: cor.ouro }}>Aprenda a jogar de verdade</div>
        <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 44, color: cor.texto, marginTop: 10 }}>eliteboardgamers.com.br</div>
        <div style={{ fontFamily: fonte, fontWeight: 700, fontSize: 38, color: cor.texto, marginTop: 2 }}>/como-jogar/andromedas-edge</div>
      </div>
      <Img src={staticFile("img/logo.webp")} style={{ width: 300, marginTop: 50, opacity: kLogo }} />
      <div style={{ ...tipo.rotulo, fontSize: 24, color: cor.textoSuave, marginTop: 40, opacity: kLogo }}>História de ficção · regras de verdade do manual Galápagos</div>
    </div>
  </AbsoluteFill>
);
