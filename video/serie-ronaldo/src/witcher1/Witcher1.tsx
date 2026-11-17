import React, { useLayoutEffect, useMemo } from "react";
import { AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "O bruxo no pôquer" — The Witcher: Old World, no padrão web documentário (video-agro do Arcvalion_gospel) com toques de dorama.
// Componentes desenhados em código, semelhantes e não idênticos: sem logo, sem arte das cartas, sem tipografia oficial.
// Pinturas: taverna à maneira de Bruegel (óleo) e bestiário à maneira de Dürer (gravura), feitas em código (arte/cenas_witcher1.py).
// Roteiro aprovado: video/roteiros/witcher-old-world-componentes.md.
export const FIM_WITCHER1 = DURACAO + 2.4;
const SANS = "Inter, 'Public Sans', sans-serif";
const MONO = "'DejaVu Sans Mono', monospace";
const TINTA = "#13233F", PAPEL = "#EEE8DC", VERM = "#C23B22", AMAR = "#f0c24b";
const ease = Easing.bezier(0.16, 1, 0.3, 1);
const p = (s: number, t0: number, d: number) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const lin = (s: number, a: number, b: number) => interpolate(s, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const F = (id: number) => { const f = FALAS.find((x) => x.id === id)!; return f.inicio + f.dur; };

// ---------------- base ----------------
const Fundo: React.FC<{ nome: string; ls: number; z0?: number; z1?: number; dur?: number; ox?: string; filtro?: string }> = ({ nome, ls, z0 = 1.04, z1 = 1.14, dur = 6, ox = "50% 50%", filtro }) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <Img src={staticFile(`img/witcher1/${nome}.png`)} style={{ width: 1080, height: 1080, transform: `scale(${z0 + (z1 - z0) * Math.min(1, ls / dur)})`, transformOrigin: ox, filter: filtro }} />
  </AbsoluteFill>
);
const Credito: React.FC<{ txt: string }> = ({ txt }) => (
  <div style={{ position: "absolute", left: 28, bottom: 24, fontFamily: MONO, fontSize: 22, color: "#fff", background: "rgba(19,35,63,.72)", padding: "4px 10px", borderRadius: 4 }}>{txt}</div>
);
// foto oficial (prioridade sobre o desenho em código), com moldura e crédito
const Foto: React.FC<{ nome: string; x: number; y: number; w: number; o?: number; ls: number; z?: number }> = ({ nome, x, y, w, o = 1, ls, z = 0.05 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, opacity: o, overflow: "hidden", borderRadius: 10, border: `6px solid ${PAPEL}`, boxShadow: "0 18px 40px rgba(0,0,0,.5)" }}>
    <Img src={staticFile(`img/witcher1/oficiais/${nome}.jpg`)} style={{ width: "100%", display: "block", transform: `scale(${1 + z * Math.min(1, ls / 4)})` }} />
  </div>
);
// trecho de vídeo real (formato react): curto, mudo, com moldura e o canal de origem na tela
const ASMODEE = "VÍDEO: ASMODEE DEUTSCHLAND (TIKTOK) · EDIÇÃO ALEMÃ";
const Clipe: React.FC<{ nome: string; t0: number; x?: number; y?: number; w?: number; rate?: number; cheio?: boolean }> = ({ nome, t0, x = 170, y = 250, w = 740, rate = 1, cheio }) => (
  <Sequence from={Math.round(t0 * 30)} layout="none">
    {cheio ? (
      <AbsoluteFill><OffthreadVideo src={staticFile(`video/witcher1/${nome}.mp4`)} muted playbackRate={rate} style={{ width: 1080, height: 1080 }} /></AbsoluteFill>
    ) : (
      <div style={{ position: "absolute", left: x, top: y, width: w, borderRadius: 12, overflow: "hidden", border: `6px solid ${PAPEL}`, boxShadow: "0 18px 40px rgba(0,0,0,.55)" }}>
        <OffthreadVideo src={staticFile(`video/witcher1/${nome}.mp4`)} muted playbackRate={rate} style={{ width: "100%", display: "block" }} />
        <div style={{ position: "absolute", left: 12, top: 12, fontFamily: MONO, fontSize: 20, fontWeight: 700, color: "#fff", background: VERM, padding: "3px 10px", borderRadius: 4 }}>▶ ASMODEE DE · TIKTOK</div>
      </div>
    )}
  </Sequence>
);
const Selo: React.FC<{ txt: string; x: number; y: number; o: number; cor?: string; tam?: number }> = ({ txt, x, y, o, cor = TINTA, tam = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, opacity: o, transform: `scale(${0.9 + 0.1 * o})`, transformOrigin: "left center" }}>
    <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: tam, color: "#fff", background: cor, padding: "8px 16px", borderRadius: 6, boxShadow: "0 6px 18px rgba(0,0,0,.35)" }}>{txt}</span>
  </div>
);
const Papel: React.FC = () => <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 40%, #f4efe3 0%, ${PAPEL} 55%, #d9cfb8 100%)` }} />;

// ---------------- componentes desenhados (semelhantes, não idênticos) ----------------
const Carta: React.FC<{ x: number; y: number; esc?: number; giro?: number; borda?: string; fundo?: string; children?: React.ReactNode; rotulo?: string; joia?: string }> = ({ x, y, esc = 1, giro = 0, borda = "#3b2a1c", fundo = "#e9dcc0", children, rotulo, joia }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${esc})`}>
    <rect x={-112} y={-158} width={224} height={316} rx={14} fill="#000" opacity={0.35} transform="translate(8,10)" />
    <rect x={-112} y={-158} width={224} height={316} rx={14} fill={borda} />
    <rect x={-100} y={-146} width={200} height={292} rx={8} fill={fundo} />
    <rect x={-90} y={-120} width={180} height={190} rx={6} fill="#00000014" stroke="#3b2a1c55" strokeWidth={2} />
    {children}
    {joia ? <g><polygon points="-96,-142 -60,-142 -96,-106" fill={joia} stroke="#1a1208" strokeWidth={2} /><polygon points="96,142 60,142 96,106" fill={joia} stroke="#1a1208" strokeWidth={2} /></g> : null}
    {rotulo ? <text x={0} y={118} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={30} fill="#2a1d12" letterSpacing="2">{rotulo}</text> : null}
  </g>
);
const IcoEspada: React.FC = () => (
  <g transform="translate(0,-25) rotate(-35)">
    <rect x={-6} y={-90} width={12} height={130} rx={3} fill="#c9ced6" stroke="#2a2a30" strokeWidth={3} />
    <path d="M-6,-90 L0,-108 L6,-90 Z" fill="#c9ced6" stroke="#2a2a30" strokeWidth={3} />
    <rect x={-34} y={38} width={68} height={10} rx={4} fill="#6b4a2a" stroke="#2a2a30" strokeWidth={3} />
    <rect x={-5} y={48} width={10} height={34} fill="#3a2a1c" />
    <circle cx={0} cy={86} r={8} fill="#b8862a" />
  </g>
);
const IcoEsquiva: React.FC = () => (
  <g transform="translate(0,-25)" fill="none" stroke="#2a1d12" strokeWidth={10} strokeLinecap="round">
    <path d="M-60,40 C-30,-50 40,-50 60,10" /><path d="M48,-16 L62,12 L32,14" />
    <path d="M-40,60 C-10,10 30,10 40,40" opacity={0.45} />
  </g>
);
const IcoSinal: React.FC = () => (
  <g transform="translate(0,-25)" fill="none" stroke="#7a2a8a" strokeWidth={9} strokeLinejoin="round">
    <circle r={58} strokeWidth={5} opacity={0.6} />
    <path d="M0,-50 L44,26 L-44,26 Z" /><path d="M0,-12 L0,40 M-22,8 L22,8" />
  </g>
);
const IcoMonstro: React.FC = () => (
  <g transform="translate(0,-20) scale(0.85)" fill="#1f2a1c">
    <path d="M-40,90 L-46,20 L-30,-20 L0,-46 L40,-54 L68,-36 L78,-6 L60,30 L50,90 Z" />
    <path d="M60,-40 L82,-82 L112,-84 L128,-64 L118,-36 L96,-24 Z" />
    <path d="M60,-10 L104,26 L138,80 L146,112 L132,114 L122,84 L90,40 L50,18 Z" />
    <circle cx={104} cy={-62} r={6} fill="#e8d84a" />
  </g>
);
const IcoPocao: React.FC<{ cor?: string }> = ({ cor = "#3aa86a" }) => (
  <g transform="translate(0,-20)">
    <path d="M-16,-80 L16,-80 L16,-40 C56,-20 60,60 0,74 C-60,60 -56,-20 -16,-40 Z" fill="#cfe6e8" stroke="#2a2a30" strokeWidth={5} opacity={0.95} />
    <path d="M-44,10 C-40,52 40,52 44,10 C30,24 -30,24 -44,10 Z" fill={cor} />
    <rect x={-20} y={-100} width={40} height={24} rx={4} fill="#8a5a2a" stroke="#2a2a30" strokeWidth={4} />
    <circle cx={-16} cy={-20} r={6} fill="#fff" opacity={0.8} />
  </g>
);
const IcoTrofeu: React.FC = () => (
  <g transform="translate(0,-20)">
    <path d="M-50,-60 C-30,-90 30,-90 50,-60 L30,60 L-30,60 Z" fill="#d9c9a0" stroke="#2a1d12" strokeWidth={5} />
    {[-24, 0, 24].map((x) => <path key={x} d={`M${x},-40 C${x + 6},0 ${x + 4},30 ${x},52`} stroke="#2a1d12" strokeWidth={4} fill="none" />)}
    <path d="M-60,-70 C-40,-110 -10,-100 -6,-80 C10,-110 50,-110 60,-70" stroke="#b8862a" strokeWidth={8} fill="none" />
  </g>
);
const CartaAcao: React.FC<{ tipo: "ataque" | "esquiva" | "sinal"; x: number; y: number; giro?: number; esc?: number }> = ({ tipo, x, y, giro, esc }) => (
  <Carta x={x} y={y} giro={giro} esc={esc} rotulo={tipo === "ataque" ? "ATAQUE" : tipo === "esquiva" ? "ESQUIVA" : "SINAL"} joia={tipo === "ataque" ? "#c23b22" : tipo === "esquiva" ? "#2f6db3" : "#8a3fa0"}>
    {tipo === "ataque" ? <IcoEspada /> : tipo === "esquiva" ? <IcoEsquiva /> : <IcoSinal />}
  </Carta>
);
const CartaMonstro: React.FC<{ x: number; y: number; giro?: number; esc?: number; x2?: boolean }> = ({ x, y, giro, esc, x2 }) => (
  <Carta x={x} y={y} giro={giro} esc={esc} borda="#1b2a1c" fundo="#c9c7a8" rotulo="MONSTRO">
    <IcoMonstro />
    {[0, 1, 2].map((i) => <circle key={i} cx={-30 + 30 * i} cy={-132} r={7} fill="#c23b22" stroke="#1a1208" strokeWidth={2} />)}
    {x2 ? <path d="M-80,-110 L80,70 M80,-110 L-80,70" stroke="#c23b22" strokeWidth={16} strokeLinecap="round" /> : null}
  </Carta>
);

// Miniatura de bruxo (genérica): plástico cinza, capuz, duas espadas nas costas, base redonda.
const Miniatura: React.FC<{ x: number; y: number; esc?: number; vira?: boolean }> = ({ x, y, esc = 1, vira }) => {
  const L = "#3a3c40";
  return (
    <g transform={`translate(${x},${y}) scale(${vira ? -esc : esc},${esc})`} stroke={L} strokeWidth={3} strokeLinejoin="round">
      <defs>
        <linearGradient id="plast" x1="0" x2="1"><stop offset="0" stopColor="#5d6168" /><stop offset="0.45" stopColor="#c3c8cf" /><stop offset="1" stopColor="#6d7178" /></linearGradient>
        <linearGradient id="plastE" x1="0" x2="1"><stop offset="0" stopColor="#4a4e55" /><stop offset="0.5" stopColor="#9aa0a8" /><stop offset="1" stopColor="#4a4e55" /></linearGradient>
      </defs>
      <ellipse cx={0} cy={4} rx={74} ry={20} fill="#2a2c30" stroke="none" />
      <ellipse cx={0} cy={-6} rx={74} ry={20} fill="url(#plast)" />
      {/* espadas nas costas, cruzadas atrás do corpo */}
      <path d="M-58,-250 L44,-70" stroke="#9aa0a8" strokeWidth={9} strokeLinecap="round" />
      <path d="M62,-262 L-40,-80" stroke="#aab0b8" strokeWidth={9} strokeLinecap="round" />
      <path d="M-70,-262 L-48,-240 M50,-276 L74,-250" stroke="#5d6168" strokeWidth={14} strokeLinecap="round" />
      <circle cx={-74} cy={-268} r={7} fill="#5d6168" /><circle cx={80} cy={-282} r={7} fill="#5d6168" />
      {/* pernas e botas */}
      <path d="M-30,-8 L-24,-110 L-4,-110 L-6,-8 Z" fill="url(#plastE)" />
      <path d="M8,-8 L6,-110 L26,-110 L32,-8 Z" fill="url(#plastE)" />
      <path d="M-34,-8 h32 v-26 h-28 Z M6,-8 h32 l-4,-26 h-28 Z" fill="#6d7178" />
      {/* capa e tronco */}
      <path d="M-46,-100 C-52,-150 -44,-200 -26,-222 L26,-222 C44,-200 54,-150 50,-100 C30,-90 -26,-90 -46,-100 Z" fill="url(#plast)" />
      <path d="M-28,-218 L-22,-120 L22,-120 L28,-218 Z" fill="url(#plastE)" />
      <path d="M-26,-140 h52" stroke="#5d6168" strokeWidth={8} />
      <circle cx={0} cy={-140} r={6} fill="#c3c8cf" />
      {/* braços */}
      <path d="M-28,-212 C-50,-190 -54,-150 -46,-120 L-34,-122 C-40,-150 -36,-180 -22,-200 Z" fill="url(#plast)" />
      <path d="M28,-212 C52,-192 56,-150 48,-122 L36,-124 C42,-150 38,-180 22,-200 Z" fill="url(#plast)" />
      <circle cx={-40} cy={-118} r={8} fill="#aab0b8" /><circle cx={42} cy={-120} r={8} fill="#aab0b8" />
      {/* cabeça com capuz */}
      <path d="M-24,-224 C-34,-268 -14,-292 0,-292 C14,-292 34,-268 24,-224 Z" fill="url(#plast)" />
      <path d="M-14,-232 C-16,-262 16,-262 14,-232 C6,-226 -6,-226 -14,-232 Z" fill="#4a4e55" />
      <path d="M-6,-248 h4 M4,-248 h4" stroke="#c3c8cf" strokeWidth={3} />
    </g>
  );
};
const Moeda: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 30 }) => (
  <g transform={`translate(${x},${y})`}>
    <circle r={r} fill="#8a6a1a" transform="translate(3,4)" />
    <circle r={r} fill="#e8b83a" stroke="#8a6a1a" strokeWidth={3} />
    <circle r={r * 0.72} fill="none" stroke="#a8801f" strokeWidth={2} />
    <path d={`M0,${-r * 0.42} L${r * 0.12},${-r * 0.12} L${r * 0.42},${-r * 0.1} L${r * 0.18},${r * 0.1} L${r * 0.26},${r * 0.42} L0,${r * 0.24} L${-r * 0.26},${r * 0.42} L${-r * 0.18},${r * 0.1} L${-r * 0.42},${-r * 0.1} L${-r * 0.12},${-r * 0.12} Z`} fill="#a8801f" />
  </g>
);
// Medalhões das cinco escolas: animais genéricos em prata (não copiam os medalhões oficiais).
const ANIMAIS: Record<string, string> = {
  lobo: "M-30,30 L-36,-10 L-40,-46 L-18,-22 L0,-30 L18,-22 L40,-46 L36,-10 L30,30 L10,44 L0,56 L-10,44 Z",
  gato: "M-34,26 C-40,-10 -38,-30 -34,-48 L-16,-28 L16,-28 L34,-48 C38,-30 40,-10 34,26 C20,46 -20,46 -34,26 Z",
  grifo: "M-34,-10 C-30,-40 10,-50 30,-30 L52,-24 L34,-10 L40,10 C20,30 0,40 -20,36 C-36,30 -40,10 -34,-10 Z",
  urso: "M-38,-30 A12,12 0 1 1 -18,-40 L18,-40 A12,12 0 1 1 38,-30 C46,0 34,40 0,46 C-34,40 -46,0 -38,-30 Z",
  vibora: "M-20,40 C-40,10 -30,-30 0,-44 C30,-30 40,10 20,40 C10,30 -10,30 -20,40 Z",
};
const Medalhao: React.FC<{ x: number; y: number; animal: string; esc?: number }> = ({ x, y, animal, esc = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <defs><radialGradient id={`prata${animal}`} cx="0.35" cy="0.3"><stop offset="0" stopColor="#f4f6f8" /><stop offset="0.6" stopColor="#a8aeb6" /><stop offset="1" stopColor="#5a6068" /></radialGradient></defs>
    <circle cy={-86} r={12} fill="none" stroke="#8a9098" strokeWidth={6} />
    <circle r={78} fill="#2a2e34" transform="translate(5,6)" opacity={0.5} />
    <circle r={78} fill={`url(#prata${animal})`} stroke="#4a5058" strokeWidth={5} />
    <circle r={64} fill="none" stroke="#6a7078" strokeWidth={3} />
    <path d={ANIMAIS[animal]} fill="#4a5058" stroke="#2a2e34" strokeWidth={3} transform="scale(1.1)" />
    {animal === "lobo" || animal === "gato" ? <g fill="#e8d84a"><circle cx={-12} cy={-6} r={4} /><circle cx={12} cy={-6} r={4} /></g> : null}
  </g>
);
const TabuleiroPessoal: React.FC<{ x: number; y: number; nivel: number }> = ({ x, y, nivel }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-360} y={-150} width={720} height={300} rx={14} fill="#000" opacity={0.3} transform="translate(8,10)" />
    <rect x={-360} y={-150} width={720} height={300} rx={14} fill="#d9c9a0" stroke="#3b2a1c" strokeWidth={6} />
    {["#c23b22", "#2f6db3", "#3a8a4a", "#8a3fa0", "#b8862a"].map((c, i) => (
      <g key={c} transform={`translate(-300,${-110 + i * 52})`}>
        {Array.from({ length: 6 }, (_, k) => <rect key={k} x={k * 70} y={0} width={60} height={36} rx={6} fill={k < (i === 1 ? nivel : 2) ? c : "#efe4c8"} stroke="#3b2a1c" strokeWidth={3} />)}
      </g>
    ))}
    <path d="M250,-60 L320,-60 L320,0 C320,40 285,60 285,60 C285,60 250,40 250,0 Z" fill="#8a9098" stroke="#3b2a1c" strokeWidth={4} />
  </g>
);
const Mapa: React.FC = () => (
  <svg width={1080} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
    <rect x={60} y={60} width={960} height={960} rx={10} fill="#e9dcbc" stroke="#8a6a3a" strokeWidth={6} />
    <path d="M120,300 C200,200 340,180 420,230 C520,160 640,190 700,260 C800,220 900,280 930,380 C980,520 900,640 940,760 C900,880 760,940 620,900 C500,960 360,920 300,840 C200,860 120,760 140,640 C90,540 140,420 120,300 Z" fill="#d9c79a" stroke="#6a4a2a" strokeWidth={4} />
    {Array.from({ length: 22 }, (_, i) => { const x = 200 + (i * 137) % 640, y = 300 + (i * 211) % 520; return <path key={i} d={`M${x},${y} l14,-26 l14,26`} fill="none" stroke="#6a4a2a" strokeWidth={3} />; })}
    {Array.from({ length: 30 }, (_, i) => { const x = 220 + (i * 97) % 620, y = 340 + (i * 163) % 480; return <circle key={i} cx={x} cy={y} r={6} fill="#5a7a4a" opacity={0.7} />; })}
    {[[330, 420], [520, 560], [700, 420], [610, 760], [400, 700]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r={11} fill={VERM} stroke="#3b2a1c" strokeWidth={3} /></g>)}
    <path d="M330,420 C420,480 460,520 520,560 C600,520 640,470 700,420 M520,560 C560,640 590,700 610,760 M520,560 C470,620 430,660 400,700" stroke="#3b2a1c" strokeWidth={3} strokeDasharray="10 8" fill="none" />
    <g transform="translate(900,140)"><circle r={50} fill="none" stroke="#6a4a2a" strokeWidth={3} /><path d="M0,-60 L10,0 L0,60 L-10,0 Z" fill="#6a4a2a" /></g>
  </svg>
);

// ---------------- dados de pôquer em 3D ----------------
const FACES = ["9", "10", "J", "Q", "K", "A"];
function texturasDado(): THREE.CanvasTexture[] {
  return FACES.map((f) => {
    const c = document.createElement("canvas"); c.width = 256; c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#efe6d2"; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = "#b8a882"; g.lineWidth = 10; g.strokeRect(12, 12, 232, 232);
    g.fillStyle = f === "A" || f === "K" ? "#8a1f14" : "#1e1a16";
    g.font = "900 120px Inter, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.fillText(f, 128, 136);
    const t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
  });
}
const CamDados: React.FC = () => {
  const { camera } = useThree();
  useLayoutEffect(() => { camera.position.set(0, 3.2, 4.2); camera.lookAt(0, 0, 0); }, [camera]);
  return null;
};
const Dados: React.FC<{ s: number; t0: number; n?: number; conjuntos?: number; girar?: boolean }> = ({ s, t0, conjuntos = 1, girar }) => {
  const tex = useMemo(texturasDado, []);
  const mats = useMemo(() => tex.map((t) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 })), [tex]);
  const lista = Array.from({ length: 5 * conjuntos }, (_, i) => i);
  return (
    <>
      <CamDados />
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 5, 3]} intensity={1.4} />
      {lista.map((i) => {
        const conj = Math.floor(i / 5), k = i % 5;
        if (s < t0 + 0.08 * i) return null;
        const chegada = p(s, t0 + 0.08 * i, 1.1);
        const x = (k - 2) * 0.82, z = conjuntos === 2 ? (conj === 0 ? -0.55 : 0.75) : 0.2;
        const queda = (1 - chegada);
        const rx = (girar ? s * 0.8 : 0) + queda * (6 + i) + (i % 2) * Math.PI / 2;
        const ry = (girar ? s * 0.6 : 0) + queda * (4 + i * 0.7) + (i % 3) * 0.5;
        return (
          <mesh key={i} position={[x + queda * (2.6 - i * 0.3), 0.3 + queda * 1.6 + Math.abs(Math.sin(queda * 7)) * queda * 0.6, z - queda * 1.2]} rotation={[rx, ry, 0]} material={mats}>
            <boxGeometry args={[0.62, 0.62, 0.62]} />
          </mesh>
        );
      })}
    </>
  );
};

// ---------------- legenda amarela (1 a 3 palavras) ----------------
const Legenda: React.FC<{ s: number }> = ({ s }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.15);
  if (!f) return null;
  const k = Math.max(0, f.palavras.filter((w) => s >= w.t).length - 1);
  const blocos: number[][] = []; let at: number[] = [];
  f.palavras.forEach((w, i) => { at.push(i); if (at.length >= 3 || /[.,?!:]$/.test(w.w)) { blocos.push(at); at = []; } });
  if (at.length) blocos.push(at);
  const b = blocos.find((x) => x.includes(k)) ?? blocos[0];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, textAlign: "center" }}>
      <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 54, color: "#111", background: AMAR, padding: "6px 18px", borderRadius: 6, boxShadow: "0 6px 16px rgba(0,0,0,.35)", boxDecorationBreak: "clone" }}>
        {b.map((i) => f.palavras[i].w.replace(/[:]$/, "")).join(" ")}
      </span>
    </div>
  );
};

// ---------------- planos ----------------
type Plano = { t: number; r: (s: number, ls: number) => React.ReactNode };
const PLANOS: Plano[] = [
  // 0–1 · capa (quadro 0) e gancho: taverna + dados rolando
  { t: 0, r: (s, ls) => (
    <AbsoluteFill>
      <Fundo nome="taverna" ls={ls} z0={1.0} z1={1.12} dur={6} ox="60% 70%" />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,6,4,.55) 0%, rgba(10,6,4,0) 45%)" }} />
      <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", left: 0, top: 260 }} gl={{ alpha: true }}>
        <Dados s={s} t0={1.1} />
      </ThreeCanvas>
      {s < 1.25 ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", opacity: 1 - lin(s, 1.0, 1.25) }}>
          <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 30, background: AMAR, color: "#111", padding: "6px 14px" }}>THE WITCHER: OLD WORLD</span>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 150, lineHeight: 0.95, color: "#fff", WebkitTextStroke: "4px #111", marginTop: 26, textShadow: "0 8px 0 rgba(0,0,0,.45)" }}>BRUXO NO<br />PÔQUER</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: "#fff", marginTop: 18, textShadow: "0 3px 8px #000" }}>dados, monstros e troféus</div>
        </div>
      ) : null}
      <Credito txt="PINTURA FEITA EM CÓDIGO, À MANEIRA DE BRUEGEL" />
    </AbsoluteFill>
  ) },
  // 2 · o jogo e quem fez: a caixa de verdade
  { t: I(2) - 0.1, r: (s, ls) => (
    <AbsoluteFill>
      <Papel />
      <AbsoluteFill style={{ transform: `scale(${1.08 - 0.06 * Math.min(1, ls / 4)})`, opacity: 0.35 }}><Mapa /></AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 60, textAlign: "center" }}>
        <div style={{ fontFamily: "'DejaVu Serif', serif", fontStyle: "italic", fontWeight: 700, fontSize: 70, color: TINTA, opacity: p(s, I(2) + 0.2, 0.4), textShadow: "0 3px 0 #fff" }}>The Witcher: Old World</div>
        <div style={{ fontFamily: MONO, fontSize: 28, color: VERM, marginTop: 8, opacity: p(s, W(2, "Go") - 0.1, 0.3) }}>GO ON BOARD · CD PROJEKT RED</div>
      </div>
      <Foto nome="caixa" x={305} y={185 + 40 * (1 - p(s, I(2), 0.5))} w={470} o={p(s, I(2), 0.4)} ls={ls} />
      <Credito txt="IMAGEM: GO ON BOARD" />
    </AbsoluteFill>
  ) },
  // 3 · cinco escolas e números
  { t: I(3) - 0.1, r: (s) => (
    <AbsoluteFill>
      <Clipe nome="mapa" t0={I(3) - 0.1} cheio rate={0.65} />
      <AbsoluteFill style={{ background: "rgba(10,14,22,.45)" }} />
      <svg width={1080} height={1080} style={{ position: "absolute" }}>
        {(["lobo", "gato", "grifo", "urso", "vibora"] as const).map((a, i) => {
          const t0 = W(3, "cinco", 2) - 0.2 + i * 0.22;
          return <g key={a} opacity={p(s, t0, 0.3)} transform={`translate(0,${30 * (1 - p(s, t0, 0.4))})`}><Medalhao x={140 + i * 200} y={420} animal={a} esc={0.95} /></g>;
        })}
      </svg>
      <Selo txt="1 a 5 jogadores" x={110} y={620} o={p(s, W(3, "jogadores,") - 0.3, 0.3)} />
      <Selo txt="5 escolas de bruxos" x={420} y={620} o={p(s, W(3, "escolas") - 0.2, 0.3)} cor={VERM} />
      <Selo txt="90 a 120 min" x={760} y={620} o={p(s, W(3, "bruxos.") - 0.1, 0.3)} />
      <Credito txt={ASMODEE} />
    </AbsoluteFill>
  ) },
  // 4 · dois conjuntos de cinco dados
  { t: I(4) - 0.1, r: (s) => (
    <AbsoluteFill>
      <Fundo nome="taverna" ls={s - I(4)} z0={1.25} z1={1.32} filtro="blur(6px) brightness(.55)" ox="50% 85%" />
      <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", left: 0, top: 40 }} gl={{ alpha: true }}>
        <Dados s={s} t0={I(4) + 0.2} conjuntos={2} girar />
      </ThreeCanvas>
      <Selo txt="2 × 5 dados de pôquer" x={300} y={140} o={p(s, W(4, "dois") - 0.1, 0.3)} cor={VERM} tam={42} />
    </AbsoluteFill>
  ) },
  // 5 · anos antes de Geralt: arte oficial da caixa, depois o bestiário
  { t: I(5) - 0.1, r: (s, ls) => {
    const corte = W(5, "quando") - 0.1;
    return s < corte ? (
      <AbsoluteFill style={{ background: "#0d1118" }}>
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Img src={staticFile("img/witcher1/oficiais/arte-caixa.jpg")} style={{ position: "absolute", height: 1080, left: -770 + 40 * Math.min(1, ls / 4), top: 0, transform: `scale(${1.02 + 0.05 * Math.min(1, ls / 4)})` }} />
        </AbsoluteFill>
        <Selo txt="ANOS ANTES DE GERALT" x={250} y={120} o={p(s, W(5, "anos") - 0.1, 0.3)} cor={TINTA} tam={44} />
        <Credito txt="ARTE DA CAIXA: GO ON BOARD / CD PROJEKT RED" />
      </AbsoluteFill>
    ) : (
      <AbsoluteFill>
        <Fundo nome="bestiario" ls={s - corte} z0={1.0} z1={1.12} dur={4} ox="50% 60%" />
        <Selo txt="MONSTROS POR TODA PARTE" x={200} y={120} o={p(s, corte, 0.3)} cor={VERM} tam={44} />
        <Credito txt="GRAVURA FEITA EM CÓDIGO, À MANEIRA DE DÜRER" />
      </AbsoluteFill>
    );
  } },
  // 6 · a luta é no baralho
  { t: I(6) - 0.1, r: (s) => {
    const sai = p(s, W(6, "baralho.") - 0.3, 0.5);
    return (
      <AbsoluteFill>
        <Fundo nome="taverna" ls={s} z0={1.3} z1={1.3} filtro="blur(8px) brightness(.45)" />
        <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", left: -900 * sai, top: 40, opacity: 1 - sai }} gl={{ alpha: true }}>
          <Dados s={s} t0={-10} girar />
        </ThreeCanvas>
        <svg width={1080} height={1080} style={{ position: "absolute" }}>
          {[0, 1, 2, 3, 4, 5].map((i) => <g key={i} transform={`translate(${900 * (1 - sai)},0)`}><Carta x={540 + i * 3} y={420 - i * 4} giro={-4 + i} /></g>)}
        </svg>
      </AbsoluteFill>
    );
  } },
  // 7 · ataques, esquivas e Sinais
  { t: I(7) - 0.1, r: (s) => (
    <AbsoluteFill>
      <Fundo nome="taverna" ls={s} z0={1.3} z1={1.3} filtro="blur(8px) brightness(.45)" />
      <svg width={1080} height={1080} style={{ position: "absolute" }}>
        {([["ataque", W(7, "ataques,"), 300, -10], ["esquiva", W(7, "esquivas"), 540, 0], ["sinal", W(7, "Sinais,"), 780, 10]] as const).map(([t, t0, x, g]) => (
          <g key={t} opacity={p(s, t0 - 0.15, 0.25)} transform={`translate(0,${50 * (1 - p(s, t0 - 0.15, 0.35))})`}><CartaAcao tipo={t} x={x} y={400} giro={g} esc={1.05} /></g>
        ))}
      </svg>
      <Credito txt="CARTAS DESENHADAS EM CÓDIGO · INSPIRAÇÃO, NÃO CÓPIA" />
    </AbsoluteFill>
  ) },
  // 8 · a lista: um componente por corte
  { t: I(8) - 0.1, r: (s) => {
    const cortes = [I(8) - 0.1, W(8, "noventa") - 0.1, W(8, "vinte", 1) - 0.1, W(8, "vinte", 2) - 0.1, W(8, "trinta") - 0.1];
    let k = 0; cortes.forEach((t, i) => { if (s >= t) k = i; });
    const ls = s - cortes[k];
    const num = ["1 por jogador", "90", "28", "28", "35"][k];
    const rot = ["MINIATURA DE BRUXO", "CARTAS DE AÇÃO", "MONSTROS", "POÇÕES", "MOEDAS DE OURO"][k];
    return (
      <AbsoluteFill>
        <Papel />
        <svg width={1080} height={1080} style={{ position: "absolute" }}>
          <g transform={`translate(540,430) scale(${1 + 0.05 * Math.min(1, ls)}) translate(-540,-430)`}>
            {k === 1 ? Array.from({ length: 12 }, (_, i) => <g key={i}><CartaAcao tipo={(["ataque", "esquiva", "sinal"] as const)[i % 3]} x={420 + (i % 6) * 48} y={420 + Math.floor(i / 6) * 20 - (i % 6) * 6} giro={-10 + (i % 6) * 4} esc={0.8} /></g>) : null}
            {k === 3 ? <><Carta x={430} y={430} giro={-6} rotulo="POÇÃO"><IcoPocao /></Carta><Carta x={650} y={440} giro={6} rotulo="POÇÃO"><IcoPocao cor="#c23b22" /></Carta></> : null}
            {k === 4 ? Array.from({ length: 14 }, (_, i) => <Moeda key={i} x={380 + (i % 5) * 80 + (i > 9 ? 40 : 0)} y={460 - Math.floor(i / 5) * 40} r={38} />) : null}
          </g>
        </svg>
        {k === 0 ? <><Clipe nome="minis" t0={cortes[0]} y={290} /><Credito txt={ASMODEE} /></> : null}
        {k === 2 ? <><Clipe nome="monstro" t0={cortes[2]} y={290} /><Credito txt={ASMODEE} /></> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 120, color: TINTA, lineHeight: 1 }}>{num}</div>
          <div style={{ fontFamily: MONO, fontSize: 30, color: VERM, marginTop: 6 }}>{rot}</div>
        </div>
      </AbsoluteFill>
    );
  } },
  // 9 · troféus: vence na hora
  { t: I(9) - 0.1, r: (s) => (
    <AbsoluteFill>
      <Papel />
      <svg width={1080} height={1080} style={{ position: "absolute" }}>
        <TabuleiroPessoal x={540} y={760} nivel={2} />
        {[0, 1, 2, 3].map((i) => { const t0 = W(9, "troféus") - 0.6 + 0.25 * i; const a = p(s, t0, 0.45); return a > 0 ? <g key={i} opacity={a}><Carta x={270 + i * 180} y={400 - 200 * (1 - a)} giro={-8 + i * 5} esc={0.75} rotulo="TROFÉU" borda="#6a4a1a" fundo="#efe0b0"><IcoTrofeu /></Carta></g> : null; })}
      </svg>
      <Selo txt="4 a 6 troféus = vitória na hora" x={200} y={110} o={p(s, W(9, "vence") - 0.2, 0.3)} cor={VERM} tam={42} />
    </AbsoluteFill>
  ) },
  // 10 · de onde vêm os troféus: monstro, taverna, treino
  { t: I(10) - 0.1, r: (s) => {
    const c2 = W(10, "briga") - 0.1, c3 = W(10, "treino") - 0.1;
    const k = s < c2 ? 0 : s < c3 ? 1 : 2;
    return (
      <AbsoluteFill>
        {k === 1 ? <Fundo nome="taverna" ls={s - c2} z0={1.15} z1={1.22} dur={2} filtro="brightness(.8)" /> : <Papel />}
        <svg width={1080} height={1080} style={{ position: "absolute" }}>
          {k === 1 ? <><Miniatura x={400} y={760} esc={1.5} /><Miniatura x={680} y={760} esc={1.5} vira /><path d="M520,520 l20,-40 l20,40 l-20,-10 Z" fill={AMAR} stroke="#111" strokeWidth={3} /></> : null}
        </svg>
        {k === 0 ? <><Foto nome="minis-e-caixa" x={40} y={260} w={1000} ls={s - I(10)} z={0.06} /><Credito txt="IMAGEM: GO ON BOARD · MONSTRO EM MINIATURA: EDIÇÃO DELUXE" /></> : null}
        {k === 2 ? <><Clipe nome="tabuleiro" t0={c3} y={230} /><Credito txt={ASMODEE} /></> : null}
        <Selo txt={["monstro abatido", "briga na taverna", "treino até o máximo"][k]} x={300} y={120} o={1} cor={TINTA} tam={40} />
      </AbsoluteFill>
    );
  } },
  // 11 · o pôquer paga o ouro
  { t: I(11) - 0.1, r: (s, ls) => (
    <AbsoluteFill>
      <Fundo nome="taverna" ls={ls} z0={1.12} z1={1.2} dur={2} ox="60% 70%" />
      <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", left: 0, top: 260 }} gl={{ alpha: true }}>
        <Dados s={s} t0={-10} />
      </ThreeCanvas>
      <svg width={1080} height={1080} style={{ position: "absolute" }}>
        {Array.from({ length: 8 }, (_, i) => { const a = p(s, W(11, "ouro.") - 0.4 + 0.06 * i, 0.4); return a > 0 ? <Moeda key={i} x={220 + i * 90} y={300 + 260 * a} r={34} /> : null; })}
      </svg>
    </AbsoluteFill>
  ) },
  // 12 · a escolha
  { t: I(12) - 0.1, r: (s) => (
    <AbsoluteFill style={{ background: "#13233F" }}>
      <svg width={1080} height={1080} style={{ position: "absolute" }}>
        <g opacity={p(s, W(12, "caçar") - 0.2, 0.3)}><CartaMonstro x={300} y={330} esc={0.95} giro={-4} /></g>
        <g opacity={p(s, W(12, "ficar") - 0.2, 0.3)}>
          <rect x={590} y={170} width={380} height={320} rx={16} fill="#3a2618" />
          {Array.from({ length: 5 }, (_, i) => <g key={i} transform={`translate(${650 + (i % 3) * 110},${250 + Math.floor(i / 3) * 120}) rotate(${-8 + i * 7})`}><rect x={-42} y={-42} width={84} height={84} rx={12} fill="#efe6d2" stroke="#b8a882" strokeWidth={5} /><text x={0} y={18} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={48} fill={i % 2 ? "#8a1f14" : "#1e1a16"}>{["A", "K", "Q", "A", "K"][i]}</text></g>)}
        </g>
      </svg>
      {([["CAÇAR", 120, W(12, "caçar")], ["TAVERNA", 600, W(12, "taverna?")]] as const).map(([t, x, t0]) => (
        <div key={t} style={{ position: "absolute", left: x, top: 535, width: 360, textAlign: "center", opacity: p(s, t0 - 0.2, 0.3) }}>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: "#111", background: AMAR, borderRadius: 10, padding: "10px 0" }}>{t}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: MONO, fontSize: 30, color: AMAR, opacity: p(s, I(12), 0.3) }}>COMENTA AQUI</div>
    </AbsoluteFill>
  ) },
  // 13 · fechamento
  { t: I(13) - 0.1, r: (s, ls) => (
    <AbsoluteFill>
      <Papel />
      <AbsoluteFill style={{ transform: `scale(${1.0 + 0.04 * Math.min(1, ls / 4)})`, opacity: 0.55 }}><Mapa /></AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center" }}>
        <div style={{ fontFamily: "'DejaVu Serif', serif", fontStyle: "italic", fontWeight: 700, fontSize: 60, color: TINTA, background: "rgba(238,232,220,.85)", display: "inline-block", padding: "4px 18px" }}>The Witcher: Old World</div>
        <Img src={staticFile("img/logo.webp")} style={{ width: 260, marginTop: 40, opacity: p(s, I(13) + 0.6, 0.4) }} />
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 48, color: VERM, marginTop: 26, opacity: p(s, I(13) + 1, 0.4) }}>@eliteboardgamers</div>
        <div style={{ fontFamily: MONO, fontSize: 20, color: TINTA, marginTop: 60, opacity: p(s, F(13), 0.4), lineHeight: 1.5 }}>
          Fontes: Asmodee (REB9859) · CD PROJEKT RED, 22/6/2023 · Gamefound (Go On Board)<br />
          Componentes e pinturas feitos em código, à maneira de Bruegel e Dürer. Sem arte oficial.
        </div>
      </div>
    </AbsoluteFill>
  ) },
];

export const Witcher1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  let k = 0;
  PLANOS.forEach((pl, i) => { if (s >= pl.t) k = i; });
  const pl = PLANOS[k];
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill>{pl.r(s, s - pl.t)}</AbsoluteFill>
      {s > 1.2 ? <Legenda s={s} /> : null}
      <div style={{ position: "absolute", right: 24, bottom: 22, fontFamily: MONO, fontSize: 18, color: "rgba(255,255,255,.75)", background: "rgba(19,35,63,.55)", padding: "3px 8px", borderRadius: 4 }}>ELITE BOARDGAMERS</div>
      <Audio src={staticFile("audio/witcher1/trilha_mix.wav")} volume={(f) => interpolate(f / fps, [0, 0.5, FIM_WITCHER1 - 3, FIM_WITCHER1 - 0.2], [0.6, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} layout="none"><Audio src={staticFile(f.arquivo)} /></Sequence>
      ))}
      {[I(2), I(5), I(8), I(9), I(12)].map((t, i) => (
        <Sequence key={`w${i}`} from={Math.max(0, Math.round((t - 0.25) * fps))} durationInFrames={Math.round(0.7 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.3} /></Sequence>
      ))}
      {[1.2, I(4) + 0.3, W(11, "ouro.") - 0.3].map((t, i) => (
        <Sequence key={`d${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.35} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
