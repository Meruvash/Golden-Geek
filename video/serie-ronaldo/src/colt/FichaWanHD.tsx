import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Wan } from "../personagens/Personagens";
import { LUZ_LAMPIAO, LUZ_LUA, LUZ_POENTE, WanHD } from "../personagens/WanHD";
import { F, MADEIRA, RYE } from "./faroeste";

// Ficha do Wan redesenhado (estilo 35_shinkai da Huashu) ao lado do antigo, sobre o fundo pintado.
export const FichaWanHD: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: F.tinta }}>
    <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920, opacity: 0.9 }} />
    <div style={{ position: "absolute", left: 70, top: 110 }}>
      <div style={{ fontFamily: RYE, fontSize: 34, color: F.papel, letterSpacing: "0.1em" }}>FICHA DE PERSONAGEM · ESTILO SHINKAI</div>
      <div style={{ fontFamily: MADEIRA, fontSize: 110, color: F.papel, textShadow: `0 6px 0 ${F.tinta}` }}>Wan</div>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <WanHD x={560} y={1420} escala={1.18} expr="calmo" pose="bracos" luz={LUZ_POENTE} id="g" />
      <g opacity={0.95}><Wan x={140} y={1420} escala={0.5} expr="calmo" pose="bracos" faroeste /></g>
      <text x={140} y={1470} textAnchor="middle" fontFamily={MADEIRA} fontSize={28} fill={F.papel}>antes</text>
      <rect x={40} y={1500} width={1000} height={400} rx={24} fill="#1b130e" opacity={0.85} />
      {([["sorriso", "bracos", LUZ_LAMPIAO, "lampião"], ["serio", "bracos", LUZ_POENTE, "pôr do sol"], ["sorriso", "carta", LUZ_LUA, "lua"]] as const).map(([e, p, l, n], i) => (
        <g key={i}>
          <clipPath id={`cf${i}`}><rect x={60 + i * 330} y={1520} width={300} height={360} rx={18} /></clipPath>
          <g clipPath={`url(#cf${i})`}>
            <rect x={60 + i * 330} y={1520} width={300} height={360} fill={i === 2 ? "#1f2a44" : i === 0 ? "#3a2618" : "#c9663a"} />
            <WanHD x={210 + i * 330} y={2240} escala={0.78} expr={e} pose={p} luz={l} id={`m${i}`} />
          </g>
          <text x={210 + i * 330} y={1868} textAnchor="middle" fontFamily={MADEIRA} fontSize={26} fill={F.papel}>{e} · luz de {n}</text>
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);
