import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LUZ_POENTE, WanHD } from "../personagens/WanHD";
import { F, Fumaca, MADEIRA, Papel, RYE, TipoMadeira } from "./faroeste";
import { CalorChao, FlareLente, GradeCor, Passaros, PoeiraLuz, RaiosTyndall } from "./luz";

// Teste de animação do gancho de "O Assalto do Wan" (8 s, sem voz): prova de acabamento visual.
// Regras de movimento (Huashu 09, seção 3): câmera só se move em evento; entra devagar (0,3–0,4 s),
// sai rápido (~0,18 s) e para; carimbo de palavra = "砸入" (1,55 → 0,94 → 1,0 em 0,17 s); mundo sempre respirando.
const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const p = (s: number, t0: number, d: number, e = ENTRA) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const carimbo = (s: number, t0: number) => (s < t0 ? 0 : interpolate(s, [t0, t0 + 0.09, t0 + 0.17], [1.55, 0.94, 1], { extrapolateRight: "clamp" }));

const SOL = { x: 713, y: 1035 };

const LocoFrente: React.FC<{ x: number; y: number; esc: number; s: number }> = ({ x, y, esc, s }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <circle cx={0} cy={-90} r={150} fill="#fff1c8" opacity={0.28 + 0.06 * Math.sin(s * 9)} />
    <rect x={-70} y={-150} width={140} height={150} rx={20} fill={F.tinta} />
    <rect x={-50} y={-210} width={36} height={70} fill={F.tinta} />
    <circle cx={0} cy={-90} r={42} fill="#3a2a1f" />
    <circle cx={0} cy={-90} r={26} fill="#fff4d8" />
    <path d="M-80,0 L0,-40 L80,0 Z" fill={F.vermelho} />
  </g>
);

export const ColtGancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const tWan = 3.6;
  // câmera: aproximação lenta do horizonte; "soco" de câmera (0,28 s) quando o Wan entra
  const soco = s >= tWan ? interpolate(s, [tWan, tWan + 0.28, tWan + 0.9], [1, 1.07, 1.03], { extrapolateRight: "clamp", easing: ENTRA }) : 1;
  const cam = (1 + 0.035 * p(s, 0, 8, Easing.inOut(Easing.quad))) * soco;
  const tremor = s >= tWan && s < tWan + 0.35 ? Math.sin(s * 90) * 8 * (1 - p(s, tWan, 0.35)) : 0;
  const loco = 0.32 + 0.22 * p(s, 0, 8, Easing.in(Easing.quad));
  const piscar = (s % 3.5) > 3.37;
  const palavras = [["5 RODADAS.", 0.5, F.papel], ["6 BANDIDOS.", 1.25, F.papel], ["1 MALETA.", 2.0, "#ffd38a"]] as const;
  const saiTitulo = p(s, 3.35, 0.18, Easing.in(Easing.quad));
  return (
    <AbsoluteFill style={{ backgroundColor: F.tinta, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${cam}) translateX(${tremor}px)`, transformOrigin: `${SOL.x}px ${SOL.y}px` }}>
        <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920 }} />
        {/* tremor de calor no chão, perto do horizonte */}
        <CalorChao s={s} y={1060} altura={260}><Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920 }} /></CalorChao>
        <Passaros s={s} x0={-200} y0={560} n={7} vel={70} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <Fumaca x={SOL.x - 80} y={1010 - 60 * loco} s={s} esc={loco * 1.2} />
          <LocoFrente x={626} y={1075} esc={loco} s={s} />
        </svg>
        <RaiosTyndall x={SOL.x} y={SOL.y} s={s} ang={205} abertura={50} n={5} forca={0.45} />
        <PoeiraLuz s={s} n={70} caixa={[0, 500, 1080, 1300]} />
        {/* o Wan entra num corte, com poeira subindo dos pés */}
        {s >= tWan ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            {Array.from({ length: 14 }, (_, i) => {
              const k = p(s, tWan, 1.2, Easing.out(Easing.quad));
              const a = (i / 14) * Math.PI;
              return <circle key={i} cx={780 + Math.cos(a) * 260 * k * (i % 2 ? 1 : 0.7)} cy={1880 - Math.sin(a) * 90 * k} r={30 + 40 * k} fill="#e8c38a" opacity={0.5 * (1 - k)} />;
            })}
            <WanHD x={780} y={2160} escala={1.4} expr={s > tWan + 2.6 ? "sorriso" : "calmo"} pose="bracos" luz={LUZ_POENTE} id="g" piscar={piscar && s > tWan + 0.5} respira={0.006 * Math.sin(s * 2.2)} />
          </svg>
        ) : null}
      </AbsoluteFill>
      <FlareLente x={SOL.x} y={SOL.y} s={s} forca={0.85} />
      <GradeCor />
      {/* título em tipo de madeira, carimbado palavra por palavra */}
      <div style={{ position: "absolute", left: 70, top: 260, opacity: 1 - saiTitulo, transform: `translateY(${-40 * saiTitulo}px)` }}>
        <div style={{ fontFamily: RYE, fontSize: 40, color: F.papel, letterSpacing: "0.1em", textShadow: `0 4px 0 ${F.tinta}`, opacity: p(s, 0.15, 0.35) }}>O ASSALTO DO WAN</div>
        {palavras.map(([t, t0, c]) => (
          <div key={t} style={{ marginTop: 14, transform: `scale(${carimbo(s, t0)})`, transformOrigin: "left center", opacity: s >= t0 ? 1 : 0 }}>
            <TipoMadeira tam={128} cor={c} sombra>{t}</TipoMadeira>
          </div>
        ))}
      </div>
      {s >= tWan + 0.6 ? (
        <div style={{ position: "absolute", left: 70, right: 520, top: 1170, opacity: p(s, tWan + 0.6, 0.35), transform: `translateY(${(1 - p(s, tWan + 0.6, 0.35)) * 20}px) rotate(-1deg)` }}>
          <div style={{ background: F.papel, border: `4px solid ${F.tinta}`, padding: "14px 22px", boxShadow: `8px 8px 0 ${F.tinta}`, fontFamily: MADEIRA, fontSize: 40, color: F.tinta, lineHeight: 1.15 }}>
            E o seu chefe… <span style={{ color: s > tWan + 1.4 ? F.vermelho : "rgba(43,29,20,.35)" }}>é o Wan.</span>
          </div>
        </div>
      ) : null}
      <Papel forca={0.14} />
    </AbsoluteFill>
  );
};
