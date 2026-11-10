import React from "react";
import { AbsoluteFill } from "remotion";
import { Lukita } from "../personagens/Personagens";
import { cor, fonte, tipo } from "../tema";

// Ficha de personagem do Lukita: poses e expressões, para aprovar o desenho.
export const FichaLukita: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: cor.fundo, fontFamily: fonte }}>
    <div style={{ position: "absolute", left: 80, top: 110 }}>
      <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ficha de personagem</div>
      <div style={{ ...tipo.titulo, color: cor.texto, marginTop: 10 }}>Lukita</div>
      <div style={{ ...tipo.apoio, color: cor.textoSuave, marginTop: 6, maxWidth: 920 }}>Professor de física, cientista maluco, viciado em euro pesado.</div>
    </div>
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <rect x={60} y={420} width={960} height={900} rx={36} fill="#171a21" />
      <Lukita x={540} y={1290} escala={0.95} expr="empolgado" pose="giz" />
      {(["empolgado", "apavorado", "feliz"] as const).map((e, i) => (
        <g key={e}>
          <rect x={80 + i * 316} y={1400} width={290} height={400} rx={24} fill="#171a21" />
          <Lukita x={225 + i * 316} y={1790} escala={0.42} expr={e} pose={(["normal", "bracos", "normal"] as const)[i]} formulaCerta={i === 2} />
          <text x={225 + i * 316} y={1440} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={28} fill={cor.texto}>{e}{i === 2 ? " (E=mc²)" : ""}</text>
        </g>
      ))}
    </svg>
  </AbsoluteFill>
);
