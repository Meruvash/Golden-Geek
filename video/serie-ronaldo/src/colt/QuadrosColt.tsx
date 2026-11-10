import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Wan } from "../personagens/Personagens";
import { Carta, F, Fumaca, MADEIRA, Papel, RYE, Silhueta, TipoMadeira } from "./faroeste";
import { FiltroCel } from "./Teste";

// Quadros de estilo de "O Assalto do Wan" (Colt Express): fundos pintados em código (claude-drawing, estilo anime),
// personagens e objetos com acabamento de célula (contorno de nanquim + luz de borda), tipografia de madeira.
// Zona segura do Reels: textos em x 60..930, y 240..1290; rostos acima de y 1500.

const LegendaPapel: React.FC<{ quem?: string; palavras: string[]; atual: number; left?: number; right?: number }> = ({ quem, palavras, atual, left = 70, right = 160 }) => (
  <div style={{ position: "absolute", left, right, top: 1170, display: "flex", justifyContent: "center" }}>
    <div style={{ background: F.papel, border: `4px solid ${F.tinta}`, padding: "14px 24px", transform: "rotate(-1deg)", boxShadow: `8px 8px 0 ${F.tinta}` }}>
      {quem ? <div style={{ fontFamily: RYE, fontSize: 26, color: F.vermelho, marginBottom: 2 }}>{quem}</div> : null}
      <div style={{ fontFamily: MADEIRA, fontSize: 40, lineHeight: 1.18, color: F.tinta }}>
        {palavras.map((w, i) => <span key={i} style={{ color: i === atual ? F.vermelho : i > atual ? "rgba(43,29,20,.35)" : F.tinta }}>{w} </span>)}
      </div>
    </div>
  </div>
);

// Locomotiva vista de frente, chegando pelo horizonte (com farol aceso).
const LocoFrente: React.FC<{ x: number; y: number; esc: number }> = ({ x, y, esc }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <circle cx={0} cy={-120} r={160} fill="#ffe7b0" opacity={0.35} />
    <rect x={-70} y={-150} width={140} height={150} rx={20} fill={F.tinta} />
    <rect x={-50} y={-210} width={36} height={70} fill={F.tinta} />
    <circle cx={0} cy={-90} r={42} fill="#3a2a1f" />
    <circle cx={0} cy={-90} r={26} fill="#fff4d8" />
    <path d="M-80,0 L0,-40 L80,0 Z" fill={F.vermelho} />
  </g>
);

// ---------- Quadro 1: o gancho ----------
export const ColtQuadro1: React.FC = () => (
  <AbsoluteFill>
    <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920 }} />
    <FiltroCel id="cel1" />
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <Fumaca x={640} y={1010} s={0.4} esc={0.45} />
      <g filter="url(#cel1)"><LocoFrente x={626} y={1080} esc={0.42} /></g>
    </svg>
    <div style={{ position: "absolute", left: 70, top: 250 }}>
      <div style={{ fontFamily: RYE, fontSize: 40, color: F.papel, letterSpacing: "0.1em", textShadow: `0 4px 0 ${F.tinta}` }}>O ASSALTO DO WAN</div>
      <TipoMadeira tam={128} cor={F.papel} sombra style={{ marginTop: 22 }}>5 RODADAS.</TipoMadeira>
      <TipoMadeira tam={128} cor={F.papel} sombra style={{ marginTop: 10 }}>6 BANDIDOS.</TipoMadeira>
      <TipoMadeira tam={128} cor="#ffd38a" sombra style={{ marginTop: 10 }}>1 MALETA.</TipoMadeira>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g filter="url(#cel1)"><Wan x={790} y={2150} escala={1.34} expr="calmo" pose="bracos" faroeste /></g>
    </svg>
    <LegendaPapel palavras={"E o seu chefe… é o Wan.".split(" ")} atual={4} right={520} />
    <Papel forca={0.16} />
  </AbsoluteFill>
);

// ---------- Quadro 2: a pilha vira ----------
export const ColtQuadro2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#24170f" }}>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <defs>
        <radialGradient id="lampiao" cx="0.75" cy="0.2" r="0.75">
          <stop offset="0" stopColor="#ffcf7a" stopOpacity={0.55} />
          <stop offset="0.45" stopColor="#d9902f" stopOpacity={0.18} />
          <stop offset="1" stopColor="#000" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="mesa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5e3d24" /><stop offset="1" stopColor="#2b1d14" /></linearGradient>
      </defs>
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 90} y={0} width={86} height={1080} fill={i % 2 ? "#3a2618" : "#33221a"} opacity={0.9} />)}
      <rect x={0} y={0} width={1080} height={1920} fill="url(#lampiao)" />
      <path d="M880,0 V230" stroke="#1a110b" strokeWidth={6} />
      <path d="M840,230 h80 l-10,120 h-60 Z" fill="#ffcf7a" stroke={F.tinta} strokeWidth={6} />
      <path d="M0,1060 L1080,1060 L1080,1920 L0,1920 Z" fill="url(#mesa)" />
      <rect x={0} y={1050} width={1080} height={22} fill="#1a110b" />
      <ellipse cx={600} cy={1440} rx={520} ry={180} fill="#ffcf7a" opacity={0.12} />
    </svg>
    {/* janela do vagão: o deserto pintado passando lá fora */}
    <div style={{ position: "absolute", left: 90, top: 300, width: 520, height: 360, overflow: "hidden", borderRadius: 14, border: `16px solid #1a110b` }}>
      <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920, left: -300, top: -820 }} />
    </div>
    <FiltroCel id="cel2" luz="#ffcf7a" lado={-1} />
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g filter="url(#cel2)">
        <g transform="translate(270,830) rotate(-3)">
          <rect x={-180} y={-90} width={360} height={180} rx={14} fill={F.papel} />
          <text x={0} y={-36} textAnchor="middle" fontFamily={RYE} fontSize={34} fill={F.vermelho}>RODADA 3</text>
          <path d="M-60,66 V24 A60,60 0 0 1 60,24 V66 Z" fill={F.tinta} />
        </g>
        {(["andar", "tiro", "xerife", "soco"] as const).map((a, i) => (
          <Carta key={a} x={150 + i * 170} y={1440 + (i % 2) * 18} a={a} esc={0.95} giro={-6 + i * 4} numero={i + 1} destaque={a === "soco"} />
        ))}
        <Carta x={830} y={1460} a="saque" esc={0.95} giro={10} virando={0.35} numero={5} />
      </g>
      <text x={270} y={970} textAnchor="middle" fontFamily={MADEIRA} fontSize={32} fill={F.papel}>túnel: cartas viradas</text>
    </svg>
    <div style={{ position: "absolute", left: 420, top: 900, transform: "rotate(-10deg)" }}>
      <TipoMadeira tam={66} cor={F.vermelho} desvio={4} style={{ border: `8px solid ${F.vermelho}`, padding: "8px 18px", background: "rgba(243,230,200,.9)" }}>ACERTOU O AR</TipoMadeira>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g filter="url(#cel2)"><Wan x={870} y={2330} escala={1.45} expr="serio" pose="bracos" faroeste /></g>
    </svg>
    <LegendaPapel palavras={"E o soco do Wan… acertou o ar.".split(" ")} atual={5} right={500} />
    <Papel forca={0.16} />
  </AbsoluteFill>
);

// ---------- Quadro 3: o teto, rodada 5 ----------
export const ColtQuadro3: React.FC = () => (
  <AbsoluteFill>
    <Img src={staticFile("img/colt/deserto-noite.png")} style={{ position: "absolute", width: 1080, height: 1920 }} />
    <FiltroCel id="cel3" luz="#a9c1ff" lado={-1} />
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g stroke="#f3e6c8" strokeWidth={5} strokeLinecap="round" opacity={0.3}>
        {[1150, 1220, 1290, 1360].map((y, i) => <path key={y} d={`M${40 + i * 230},${y} h${240 - i * 30}`} />)}
      </g>
      <g filter="url(#cel3)">
        {/* tetos dos vagões em primeiro plano */}
        <path d="M-40,1560 L1120,1470 L1120,1600 L-40,1700 Z" fill="#6e1820" />
        <path d="M-40,1700 L1120,1600 L1120,1920 L-40,1920 Z" fill={F.vermelho} />
        {[0, 1, 2].map((i) => <path key={i} d={`M${330 + i * 330},${1545 - i * 26} v150`} stroke={F.tinta} strokeWidth={16} />)}
        <g transform="translate(930,1420)">
          <rect x={-46} y={-30} width={92} height={62} rx={8} fill={F.ocre} />
          <path d="M-18,-30 v-14 h36 v14" stroke={F.tinta} strokeWidth={6} fill="none" />
        </g>
        <Silhueta x={1010} y={1495} esc={0.55} tipo="xerife" />
        <Silhueta x={620} y={1580} esc={0.75} tipo="bandido" />
      </g>
      <circle cx={930} cy={1420} r={120} fill="#ffcf7a" opacity={0.22} />
    </svg>
    <div style={{ position: "absolute", left: 70, top: 250 }}>
      <TipoMadeira tam={140} cor={F.papel} sombra desvio={6}>RODADA 5</TipoMadeira>
      <div style={{ fontFamily: RYE, fontSize: 44, color: F.papel, marginTop: 16, textShadow: `0 4px 0 ${F.tinta}` }}>vence o bandido mais rico</div>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g filter="url(#cel3)">
        <Carta x={260} y={800} a="correr" esc={1.5} giro={-6} />
        <Carta x={640} y={810} a="soco" esc={1.5} giro={6} />
      </g>
      <text x={260} y={1005} textAnchor="middle" fontFamily={MADEIRA} fontSize={34} fill={F.papel}>até 3 vagões</text>
      <text x={640} y={1015} textAnchor="middle" fontFamily={MADEIRA} fontSize={34} fill={F.papel}>rival larga o saque</text>
    </svg>
    <div style={{ position: "absolute", left: 70, right: 160, top: 1085, textAlign: "center" }}>
      <TipoMadeira tam={50} cor="#ffd38a" sombra desvio={4} style={{ margin: "0 auto" }}>Comenta CORRER ou SOCAR</TipoMadeira>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g filter="url(#cel3)"><Wan x={240} y={2180} escala={1.22} expr="sorriso" pose="carta" faroeste /></g>
    </svg>
    <Papel forca={0.14} />
  </AbsoluteFill>
);
