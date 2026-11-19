import React from "react";
import { AbsoluteFill, Img, interpolate, Easing, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { FiltroCel } from "../colt/Teste";
import { Ronaldo } from "../personagens/Personagens";
import { LUZ_POENTE, WanHD } from "../personagens/WanHD";
import { Victor as Vitor } from "../victor1/personagens";
import { AMAR, AREIA, Grande, MeioTom, NOITE, Of, QUADROS_PARODIA, Raios, ROSA, SANS, SemLetra, Svg, Credito } from "./Storyboard";
import { BATIDAS, DUR_CLIPE, LINHAS } from "./tempos";

// Clipe "Um a zero pro time" (paródia Desfile Lúdico): Time Elite × Casa Lacrônnen no Dune: Imperium – Uprising.
// Música: public/audio/parodia/clipe.mp3 (beat de 142 BPM em lá menor, com paradas; voz da IA aprovada pelo usuário).
// Linguagem frenética: corte a cada 1–2 batidas, zoom de impacto em cada corte, soco de câmera em cada bumbo,
// tremor que cresce na ponte, flash branco nos ataques do refrão, placar fixo no canto e letra em karaokê.

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const Q = (i: number) => () => QUADROS_PARODIA[i].r();

// ---------------- cenas novas (as outras vêm do storyboard) ----------------
const Abertura: React.FC<{ ls: number }> = ({ ls }) => (
  <AbsoluteFill style={{ background: "#050507" }}>
    <Raios cor="#c23b22" op={0.25 * Math.min(1, ls / 2)} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 360, textAlign: "center", opacity: interpolate(ls, [0.2, 0.6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <Grande tam={92} giro={-3}>TIME ELITE</Grande>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 60, color: AMAR, margin: "14px 0" }}>×</div>
      <Grande tam={92} giro={-3} cor={ROSA}>CASA LACRÔNNEN</Grande>
    </div>
  </AbsoluteFill>
);
const Placar: React.FC<{ a: number; b?: number; ls: number; titulo?: string }> = ({ a, b = 0, ls, titulo }) => {
  const k = interpolate(ls, [0, 0.35], [1.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ background: "#c23b22" }}>
      <Raios cor="#ff6a4d" op={0.6} />
      <MeioTom op={0.18} />
      {titulo ? <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center" }}><Grande tam={110} giro={-3}>{titulo}</Grande></div> : null}
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", transform: `scale(${k})` }}>
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", background: "#111", padding: "26px 50px", border: "8px solid #fff" }}>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 44, color: AREIA }}>TIME ELITE</span>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 200, color: "#fff", lineHeight: 1 }}>{a} × {b}</span>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 44, color: ROSA }}>CASA LACRÔNNEN</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
const Selo: React.FC<{ txt: string; cor?: string; x?: number; y?: number; giro?: number }> = ({ txt, cor = "#c23b22", x = 60, y = 80, giro = -6 }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${giro}deg)`, fontFamily: SANS, fontWeight: 900, fontSize: 70, color: "#fff", background: cor, padding: "6px 22px", boxShadow: "8px 8px 0 #111" }}>{txt}</div>
);
const VitorEspiao: React.FC = () => (
  <AbsoluteFill style={{ background: "#140c1c" }}>
    <Raios cor="#3a1d4a" op={0.8} />
    <Svg><Vitor x={540} y={1980} escala={2.3} expr="determinado" pose="aponta" t={0} /></Svg>
    <Selo txt="ESPIÃO NA REALEZA" cor="#8f1d3a" />
  </AbsoluteFill>
);
const RonaldoPontinhos: React.FC<{ ls: number }> = ({ ls }) => (
  <AbsoluteFill style={{ background: "#1f3b6e" }}>
    <Raios cor="#3c62a8" op={0.6} />
    <Svg><Ronaldo x={540} y={1980} escala={2.2} expr="orgulhoso" pose="cartas" /></Svg>
    <Selo txt="NO RETETÉ" cor={AREIA} />
    <div style={{ position: "absolute", right: 70, top: 300, transform: `scale(${interpolate(ls, [0.6, 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })})` }}><Grande tam={180} cor={AMAR} giro={8}>+2</Grande></div>
  </AbsoluteFill>
);
const Gancho: React.FC<{ ls: number }> = ({ ls }) => (
  <AbsoluteFill style={{ background: "#2a1606" }}>
    <Raios cor="#e0913f" op={0.15 + 0.3 * Math.min(1, ls / 2)} cy={760} />
    <Svg><WanHD x={540} y={2400} escala={2.6} faroeste={false} expr="serio" pose="bracos" luz={LUZ_POENTE} id="wgc" /></Svg>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(42,22,6,0) 50%, #2a1606 95%)" }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, textAlign: "center" }}><Grande tam={96} giro={-2}>{ls < 1.1 ? "PUXOU O GANCHO…" : "O CHÃO TREMEU…"}</Grande></div>
  </AbsoluteFill>
);
const Final: React.FC<{ ls: number }> = ({ ls }) => (
  <AbsoluteFill style={{ background: NOITE }}>
    <Raios cor={AREIA} op={0.3} />
    <Of nome="caixa" style={{ left: 360, top: 330, width: 360, transform: `rotate(-6deg) scale(${1 + 0.04 * Math.min(1, ls / 3)})` }} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}><Grande tam={96} giro={-3}>DEZ A ZERO<br /><span style={{ color: AMAR }}>PRO ELITE!</span></Grande></div>
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 210, textAlign: "center", opacity: interpolate(ls, [0.6, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <Img src={staticFile("img/logo.webp")} style={{ width: 180 }} />
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 34, color: "#fff", marginTop: 8 }}>@eliteboardgamers</div>
    </div>
    <Credito />
  </AbsoluteFill>
);

// ---------------- roteiro de cortes (t = segundo da música) ----------------
type Corte = { t: number; r: (s: number, ls: number) => React.ReactNode; z?: number; o?: string; flash?: boolean; tremor?: number };
const C = (t: number, r: Corte["r"], extra: Partial<Corte> = {}): Corte => ({ t, r, ...extra });
const CORTES: Corte[] = [
  C(0, (_, ls) => <Abertura ls={ls} />),
  C(2.5, Q(0), { flash: true }),
  C(4.2, Q(0), { z: 1.35, o: "65% 60%" }),
  C(6.3, Q(1), { flash: true }),
  C(7.9, Q(1), { z: 1.45, o: "55% 70%" }),
  C(9.7, Q(2)),
  C(11.3, Q(2), { z: 1.5, o: "25% 80%" }),
  C(13.2, Q(3), { flash: true }),
  C(14.4, Q(3), { z: 1.4, o: "50% 30%" }),
  C(15.5, Q(4)),
  C(16.6, Q(4), { z: 1.45, o: "80% 45%" }),
  C(18.0, Q(5)),
  C(19.2, Q(5), { z: 1.3, o: "50% 45%" }),
  C(20.3, Q(5), { z: 1.6, o: "50% 8%" }),
  C(21.75, Q(6), { flash: true }),
  C(22.3, Q(7), { flash: true }),
  C(23.05, Q(8), { flash: true }),
  C(23.85, Q(9)),
  C(25.8, Q(10), { flash: true, tremor: 6 }),
  C(27.5, Q(10), { z: 1.35, o: "50% 55%", tremor: 6 }),
  C(29.2, Q(11), { flash: true, tremor: 6 }),
  C(31.0, Q(11), { z: 1.4, o: "50% 45%", tremor: 4 }),
  C(33.2, Q(12), { flash: true }),
  C(34.6, Q(12), { z: 1.35, o: "40% 65%" }),
  C(36.1, Q(1), { z: 1.2, o: "50% 50%", flash: true }),
  C(37.7, Q(3), { z: 1.25, o: "50% 40%" }),
  C(39.3, Q(13), { flash: true, tremor: 8 }),
  C(40.6, (_, ls) => <Placar a={2} ls={ls} titulo="CONFLITO!" />, { tremor: 6 }),
  C(43.3, Q(12), { z: 1.2, o: "60% 40%" }),
  C(46.25, Q(14), { z: 1.6, o: "15% 60%" }),
  C(48.45, Q(14), { z: 1.6, o: "88% 60%" }),
  C(50.15, () => <VitorEspiao />),
  C(52.0, (_, ls) => <RonaldoPontinhos ls={ls} />),
  C(54.1, (_, ls) => <Placar a={4} ls={ls} titulo="NO CAMINHO" />, { flash: true }),
  C(56.6, Q(15), { z: 1.7, o: "12% 55%" }),
  C(57.9, Q(15), { z: 1.7, o: "88% 55%" }),
  C(61.9, (_, ls) => <Gancho ls={ls} />, { tremor: 3 }),
  C(64.2, Q(16), { flash: true, tremor: 14 }),
  C(66.4, (_, ls) => <Placar a={10} ls={ls} titulo="+6 PONTOS!" />, { flash: true, tremor: 8 }),
  C(67.4, Q(10), { flash: true, tremor: 6 }),
  C(69.1, (_, ls) => <Placar a={10} ls={ls} titulo="CONFLITO!" />, { flash: true, tremor: 6 }),
  C(70.75, Q(13), { z: 1.15, tremor: 6 }),
  C(72.5, (_, ls) => <Final ls={ls} />, { flash: true }),
];

// placar fixo no canto depois do primeiro conflito
const PLACAR_T: [number, number][] = [[29.2, 1], [39.3, 2], [54.1, 4], [64.2, 10]];

const Karaoke: React.FC<{ s: number }> = ({ s }) => {
  let k = -1; LINHAS.forEach((l, i) => { if (s >= l.t - 0.05) k = i; });
  if (k < 0) return null;
  const l = LINHAS[k], fim = k + 1 < LINHAS.length ? LINHAS[k + 1].t : DUR_CLIPE;
  if (s > fim - 0.05) return null;
  const pal = l.txt.split(" "), prog = Math.min(1, (s - l.t) / Math.max(0.6, (fim - l.t) * 0.8));
  const pop = interpolate(s - l.t, [0, 0.18], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <div style={{ position: "absolute", left: 40, right: 40, bottom: 60, textAlign: "center", transform: `scale(${pop})` }}>
      <span style={{ display: "inline", fontFamily: SANS, fontWeight: 900, fontSize: 42, lineHeight: 1.5, background: "#111", padding: "6px 14px", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
        {pal.map((p, i) => <span key={i} style={{ color: i / pal.length < prog ? AMAR : "#fff" }}>{p} </span>)}
      </span>
    </div>
  );
};

export const ClipeParodia: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = f / fps;
  let k = 0; CORTES.forEach((c, i) => { if (s >= c.t) k = i; });
  const c = CORTES[k], ls = s - c.t;
  // soco de câmera no último bumbo
  let ult = -9; for (const b of BATIDAS) { if (b <= s) ult = b; else break; }
  const soco = 0.035 * Math.exp(-(s - ult) / 0.11);
  const impacto = interpolate(ls, [0, 0.28], [1.14, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const tr = (c.tremor ?? 0) * Math.exp(-(s - ult) / 0.2);
  const dx = tr * Math.sin(f * 2.3), dy = tr * Math.cos(f * 3.1);
  const flash = c.flash ? Math.exp(-ls / 0.07) : 0;
  let placar = 0; PLACAR_T.forEach(([t, v]) => { if (s >= t) placar = v; });
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <FiltroCel id="cel" luz="#ffcf8a" lado={-1} />
      <FiltroCel id="celNeon" luz="#22e3ff" lado={-1} />
      <SemLetra.Provider value>
        <AbsoluteFill style={{ transform: `translate(${dx}px,${dy}px) scale(${(c.z ?? 1) * impacto * (1 + soco)})`, transformOrigin: c.o ?? "50% 50%" }}>
          {c.r(s, ls)}
        </AbsoluteFill>
      </SemLetra.Provider>
      {flash > 0.01 ? <AbsoluteFill style={{ background: "#fff", opacity: flash }} /> : null}
      {placar > 0 && s < 72.5 ? (
        <div style={{ position: "absolute", right: 24, top: 22, fontFamily: SANS, fontWeight: 900, fontSize: 26, color: "#fff", background: "rgba(10,10,16,.85)", padding: "6px 14px", border: `3px solid ${AMAR}` }}>
          <span style={{ color: AREIA }}>ELITE</span> {placar} × 0 <span style={{ color: ROSA }}>LACRÔNNEN</span>
        </div>
      ) : null}
      {s > 2.4 && s < 72.4 ? <Karaoke s={s} /> : null}
      <div style={{ position: "absolute", left: 22, top: 22, fontFamily: SANS, fontWeight: 900, fontSize: 18, color: "rgba(255,255,255,.8)", letterSpacing: 2 }}>ELITE BOARDGAMERS</div>
      <Audio src={staticFile("audio/parodia/clipe.mp3")} />
    </AbsoluteFill>
  );
};
export const DUR_CLIPE_PARODIA = DUR_CLIPE;
