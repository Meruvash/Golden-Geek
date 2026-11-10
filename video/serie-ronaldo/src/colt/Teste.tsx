import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Wan } from "../personagens/Personagens";
import { F, Papel, RYE, TipoMadeira } from "./faroeste";

// Filtro de acabamento "cel": contorno de nanquim + luz de borda quente do lado do sol.
export const FiltroCel: React.FC<{ id: string; luz?: string; lado?: number }> = ({ id, luz = "#ffb37a", lado = 1 }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
      <feMorphology in="SourceAlpha" operator="dilate" radius={5} result="dil" />
      <feFlood floodColor={F.tinta} result="tinta" />
      <feComposite in="tinta" in2="dil" operator="in" result="contorno" />
      <feOffset in="SourceAlpha" dx={-9 * lado} dy={4} result="desl" />
      <feComposite in="SourceAlpha" in2="desl" operator="out" result="borda" />
      <feGaussianBlur in="borda" stdDeviation={1.2} result="bordaSuave" />
      <feFlood floodColor={luz} result="corLuz" />
      <feComposite in="corLuz" in2="bordaSuave" operator="in" result="luzBorda" />
      <feMerge><feMergeNode in="contorno" /><feMergeNode in="SourceGraphic" /><feMergeNode in="luzBorda" /></feMerge>
    </filter>
  </svg>
);

export const ColtTeste: React.FC = () => (
  <AbsoluteFill>
    <Img src={staticFile("img/colt/deserto.png")} style={{ width: 1080, height: 1920 }} />
    <FiltroCel id="cel" />
    <div style={{ position: "absolute", left: 70, top: 260 }}>
      <div style={{ fontFamily: RYE, fontSize: 40, color: F.papel, letterSpacing: "0.08em", textShadow: "0 3px 0 #2b1d14" }}>O ASSALTO DO WAN</div>
      <TipoMadeira tam={124} cor={F.papel} style={{ marginTop: 18, textShadow: "0 6px 0 #2b1d14" }}>5 RODADAS.</TipoMadeira>
      <TipoMadeira tam={124} cor={F.papel} style={{ marginTop: 10, textShadow: "0 6px 0 #2b1d14" }}>6 BANDIDOS.</TipoMadeira>
      <TipoMadeira tam={124} cor="#ffd38a" style={{ marginTop: 10, textShadow: "0 6px 0 #2b1d14" }}>1 MALETA.</TipoMadeira>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <g filter="url(#cel)">
        <Wan x={330} y={2140} escala={1.32} expr="calmo" pose="bracos" faroeste />
      </g>
    </svg>
    <Papel forca={0.18} />
  </AbsoluteFill>
);
