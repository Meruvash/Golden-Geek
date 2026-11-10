import React from "react";
import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, staticFile } from "remotion";

// Identidade visual "Faroeste em letterpress" do episódio de Colt Express.
// Regras do guia video/ROTEIRO_REFERENCIAS.md: 7 cores, uma luz por cena, tinta com leve desalinhamento
// (letterpress do Claude Drawing), um palco por cena com personagens grandes (bang-motion), regras dentro do mundo.
// Fontes: Rye e Alfa Slab One (SIL OFL, licenças em public/fontes/).
loadFont({ family: "Rye", url: staticFile("fontes/Rye-Regular.ttf") });
loadFont({ family: "Alfa Slab One", url: staticFile("fontes/AlfaSlabOne-Regular.ttf") });

export const F = {
  papel: "#f3e6c8",
  tinta: "#2b1d14",
  vermelho: "#b3262f",
  ocre: "#d9902f",
  ceuAlto: "#e7703a",
  noite: "#1f2a44",
  madeira: "#6b4a2f",
};
export const MADEIRA = "Alfa Slab One";
export const RYE = "Rye";

// Título de tipo de madeira: sombra de tinta, passada vermelha desalinhada e a passada principal.
export const TipoMadeira: React.FC<{ children: React.ReactNode; tam: number; cor?: string; desvio?: number; fonte?: string; sombra?: boolean; style?: React.CSSProperties }> = ({ children, tam, cor = F.tinta, desvio = 6, fonte = MADEIRA, sombra = false, style }) => (
  <div style={{ position: "relative", fontFamily: fonte, fontSize: tam, lineHeight: 1, letterSpacing: "0.01em", whiteSpace: "nowrap", width: "fit-content", ...style }}>
    {sombra ? <div style={{ position: "absolute", left: desvio * 1.4, top: desvio * 1.4, color: F.tinta }}>{children}</div> : null}
    <div style={{ position: "absolute", left: desvio * 0.6, top: desvio * 0.4, color: F.vermelho, opacity: 0.9 }}>{children}</div>
    <div style={{ position: "relative", color: cor }}>{children}</div>
  </div>
);

// Textura de papel impresso: grão e falhas de tinta, por cima de tudo (multiplica).
export const Papel: React.FC<{ forca?: number }> = ({ forca = 0.35 }) => (
  <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "multiply", opacity: forca }}>
    <svg width="100%" height="100%">
      <filter id="papelGrao">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves={3} seed={11} />
        <feColorMatrix values="0 0 0 0 0.85  0 0 0 0 0.76  0 0 0 0 0.6  0 0 0 -1.4 1.3" />
      </filter>
      <rect width="100%" height="100%" filter="url(#papelGrao)" />
    </svg>
  </AbsoluteFill>
);

// Carta de ação (nosso desenho, não a arte do jogo).
export type Acao = "andar" | "subir" | "tiro" | "soco" | "saque" | "xerife" | "correr" | "bala" | "verso";
const ROTULO: Record<Acao, string> = { andar: "ANDAR", subir: "SUBIR", tiro: "TIRO", soco: "SOCO", saque: "JOIA", xerife: "XERIFE", correr: "CORRER", bala: "BALA", verso: "" };
export const Icone: React.FC<{ a: Acao; c?: string }> = ({ a, c = F.tinta }) =>
  a === "andar" ? (
    <path d="M-34,0 H24 M8,-18 L28,0 L8,18" stroke={c} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ) : a === "subir" ? (
    <g stroke={c} strokeWidth={9} strokeLinecap="round"><path d="M-18,34 V-34 M18,34 V-34" /><path d="M-18,18 H18 M-18,0 H18 M-18,-18 H18" /></g>
  ) : a === "tiro" ? (
    <g fill={c}><rect x={-12} y={-20} width={24} height={46} rx={4} /><path d="M-12,-20 Q0,-50 12,-20 Z" /></g>
  ) : a === "soco" ? (
    <g fill={c}><rect x={-30} y={-22} width={52} height={44} rx={12} /><rect x={-38} y={-8} width={20} height={30} rx={8} /><path d="M-30,-10 h52 M-30,4 h52" stroke={F.papel} strokeWidth={4} /></g>
  ) : a === "saque" ? (
    <g fill={c}><path d="M-28,30 C-36,0 -20,-18 0,-18 C20,-18 36,0 28,30 Z" /><path d="M-10,-18 L-16,-34 H16 L10,-18 Z" /><text x={0} y={18} textAnchor="middle" fontFamily={MADEIRA} fontSize={26} fill={F.papel}>$</text></g>
  ) : a === "xerife" ? (
    <path d="M0,-36 L10,-12 L36,-12 L16,4 L24,30 L0,16 L-24,30 L-16,4 L-36,-12 L-10,-12 Z" fill={c} />
  ) : a === "bala" ? (
    <g><circle r={30} fill="#8a8f9a" /><circle r={30} fill="none" stroke={c} strokeWidth={5} /><path d="M-14,-14 L14,14 M14,-14 L-14,14" stroke={c} strokeWidth={6} strokeLinecap="round" /></g>
  ) : a === "correr" ? (
    <g stroke={c} strokeWidth={9} fill="none" strokeLinecap="round"><circle cx={8} cy={-28} r={9} fill={c} /><path d="M4,-16 L-4,10 L14,30 M-4,10 L-24,26 M2,-10 L22,0 M2,-10 L-18,-2" /></g>
  ) : (
    <g><circle r={26} fill="none" stroke={F.vermelho} strokeWidth={6} /><text x={0} y={12} textAnchor="middle" fontFamily={RYE} fontSize={34} fill={F.vermelho}>C</text></g>
  );

export const Carta: React.FC<{ x: number; y: number; a: Acao; esc?: number; giro?: number; virando?: number; numero?: number; destaque?: boolean }> = ({ x, y, a, esc = 1, giro = 0, virando = 1, numero, destaque }) => {
  const verso = virando < 0.5;
  const sx = Math.abs(Math.cos(virando * Math.PI)) || 0.02;
  return (
    <g transform={`translate(${x},${y}) rotate(${giro}) scale(${esc * sx},${esc})`}>
      <rect x={-70} y={-100} width={140} height={200} rx={14} fill="#000" opacity={0.25} transform="translate(8,10)" />
      <rect x={-70} y={-100} width={140} height={200} rx={14} fill={verso ? F.vermelho : F.papel} stroke={destaque ? F.ocre : F.tinta} strokeWidth={destaque ? 10 : 5} />
      {verso ? (
        <g>
          <rect x={-54} y={-84} width={108} height={168} rx={8} fill="none" stroke={F.papel} strokeWidth={3} strokeDasharray="8 6" />
          <Icone a="verso" c={F.papel} />
        </g>
      ) : (
        <g>
          <g transform="translate(0,-14)"><Icone a={a} /></g>
          <text x={0} y={76} textAnchor="middle" fontFamily={MADEIRA} fontSize={24} fill={F.tinta}>{ROTULO[a]}</text>
        </g>
      )}
      {numero ? (
        <g transform="translate(-58,-88)"><circle r={22} fill={F.tinta} /><text x={0} y={9} textAnchor="middle" fontFamily={MADEIRA} fontSize={26} fill={F.papel}>{numero}</text></g>
      ) : null}
    </g>
  );
};

// Bandido rival e xerife em silhueta (desenho nosso).
export const Silhueta: React.FC<{ x: number; y: number; esc?: number; tipo?: "bandido" | "xerife"; c?: string }> = ({ x, y, esc = 1, tipo = "bandido", c = F.tinta }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`} fill={c}>
    <path d="M-40,0 L-34,-150 L34,-150 L40,0 Z" />
    <path d="M-60,-140 C-60,-200 60,-200 60,-140 Z" />
    <circle cx={0} cy={-210} r={42} />
    <ellipse cx={0} cy={-246} rx={80} ry={14} />
    <path d="M-36,-250 C-34,-300 34,-300 36,-250 Z" />
    {tipo === "xerife" ? <path d="M0,-176 L6,-162 L20,-162 L9,-153 L13,-139 L0,-147 L-13,-139 L-9,-153 L-20,-162 L-6,-162 Z" fill={F.ocre} /> : <path d="M-42,-206 h84 v20 h-84 Z" fill={F.vermelho} />}
  </g>
);

// Trem de perfil: locomotiva à direita, vagões à esquerda. Base dos trilhos em (x, y).
export const Trem: React.FC<{ x: number; y: number; esc?: number; s?: number; vagoes?: number }> = ({ x, y, esc = 1, s = 0, vagoes = 3 }) => {
  const roda = (cx: number) => (
    <g key={cx} transform={`translate(${cx},-22) rotate(${s * 360})`}>
      <circle r={22} fill={F.tinta} /><circle r={8} fill={F.ocre} /><path d="M-20,0 H20 M0,-20 V20" stroke={F.ocre} strokeWidth={3} />
    </g>
  );
  return (
    <g transform={`translate(${x},${y}) scale(${esc})`}>
      <rect x={-40 - vagoes * 300} y={-6} width={vagoes * 300 + 420} height={10} fill={F.tinta} opacity={0.7} />
      {Array.from({ length: vagoes }, (_, i) => {
        const vx = -vagoes * 300 + i * 300;
        return (
          <g key={i}>
            <rect x={vx} y={-200} width={270} height={156} rx={8} fill={i % 2 ? F.vermelho : "#8f1d25"} />
            <rect x={vx - 10} y={-214} width={290} height={20} rx={6} fill={F.tinta} />
            {[0, 1, 2].map((j) => <rect key={j} x={vx + 26 + j * 80} y={-176} width={56} height={52} rx={6} fill={F.ocre} opacity={0.85} />)}
            {roda(vx + 50)}{roda(vx + 220)}
            <rect x={vx + 270} y={-90} width={30} height={10} fill={F.tinta} />
          </g>
        );
      })}
      {/* locomotiva */}
      <g>
        <rect x={20} y={-150} width={260} height={106} rx={40} fill={F.tinta} />
        <rect x={10} y={-240} width={110} height={196} rx={8} fill="#3a2a1f" />
        <rect x={30} y={-220} width={70} height={56} rx={6} fill={F.ocre} />
        <path d="M200,-150 L190,-250 L250,-250 L240,-150 Z" fill={F.tinta} />
        <path d="M180,-262 h80 v16 h-80 Z" fill={F.vermelho} />
        <path d="M280,-60 L340,-30 L280,-30 Z" fill={F.vermelho} />
        {roda(80)}{roda(170)}{roda(250)}
      </g>
    </g>
  );
};

// Fumaça que sai da chaminé e se espalha (contínua, determinística).
export const Fumaca: React.FC<{ x: number; y: number; s: number; esc?: number }> = ({ x, y, s, esc = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    {Array.from({ length: 7 }, (_, i) => {
      const t = (s * 0.6 + i / 7) % 1;
      return <circle key={i} cx={-t * 420} cy={-t * 260 - 10} r={24 + t * 70} fill={F.papel} opacity={0.75 * (1 - t)} />;
    })}
  </g>
);
