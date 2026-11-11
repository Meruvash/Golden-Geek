import React from "react";
import { AbsoluteFill, Easing, Freeze, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { CORTE_PARTE1, FIM_VICTOR1, INICIO_PARTE2, Victor1 } from "./Victor1";

// "Victor e o Talaricórnio" dividido em duas partes para o Instagram.
// Parte 1 termina no gancho (o Victor pisa no vazio); a Parte 2 volta alguns segundos e segue até a escolha final.
const SANS = "Public Sans";
const ARCO = ["#e2364f", "#f2843a", "#f2d23a", "#4ac06a", "#3a8fd6", "#3a4ab8", "#9a4ad6"];
const p = (s: number, t0: number, d: number) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });

export const DUR_GANCHO = 4.4;
export const DUR_P1 = CORTE_PARTE1 + DUR_GANCHO;
export const ABERTURA_P2 = 2.2;
export const DUR_P2 = ABERTURA_P2 + (FIM_VICTOR1 - INICIO_PARTE2);

export const VictorParte1: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = useCurrentFrame() / fps;
  const g = s - CORTE_PARTE1;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence durationInFrames={Math.round(CORTE_PARTE1 * fps)} layout="none"><Victor1 /></Sequence>
      {g >= 0 ? (
        <AbsoluteFill>
          {/* quadro congelado da queda, com zoom lento e vinheta vermelha */}
          <AbsoluteFill style={{ transform: `scale(${1 + 0.05 * g})`, filter: `saturate(${1 - 0.5 * p(g, 0, 0.6)}) contrast(1.1)` }}>
            <Freeze frame={Math.round((CORTE_PARTE1 - 0.05) * fps)}><Victor1 mudo /></Freeze>
          </AbsoluteFill>
          <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, rgba(0,0,0,0) 30%, rgba(90,0,20,.75) 100%)", opacity: p(g, 0, 0.4) }} />
          <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(10,4,16,.9) 0px, rgba(10,4,16,0) 520px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 104, color: "#fff6ff", letterSpacing: "0.02em", opacity: p(g, 0.15, 0.3), transform: `scale(${1.25 - 0.25 * p(g, 0.15, 0.35)})` }}>CONTINUA…</div>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 52, color: "#ffcf5a", marginTop: 10, opacity: p(g, 0.9, 0.3) }}>Ele vai cair?</div>
            <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, letterSpacing: "0.2em", color: "rgba(255,240,255,.75)", marginTop: 26, opacity: p(g, 1.6, 0.3) }}>PARTE 2 NO PRÓXIMO VÍDEO · SEGUE PRA NÃO PERDER</div>
          </div>
        </AbsoluteFill>
      ) : null}
      <Sequence from={Math.round(CORTE_PARTE1 * fps)} durationInFrames={Math.round(3 * fps)} layout="none"><Audio src={staticFile("audio/victor1/s-sino-ironia.mp3")} volume={0.6} /></Sequence>
      <Sequence from={Math.round((CORTE_PARTE1 + 0.9) * fps)} durationInFrames={Math.round(3.4 * fps)} layout="none"><Audio src={staticFile("audio/victor1/s-eco-pedra.mp3")} volume={0.5} /></Sequence>
    </AbsoluteFill>
  );
};

export const VictorParte2: React.FC = () => {
  const { fps } = useVideoConfig();
  const s = useCurrentFrame() / fps;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <Sequence from={Math.round(ABERTURA_P2 * fps) - Math.round(INICIO_PARTE2 * fps)} layout="none"><Victor1 /></Sequence>
      {s < ABERTURA_P2 + 0.4 ? (
        <AbsoluteFill style={{ background: "#120a1c", opacity: s < ABERTURA_P2 ? 1 : 1 - p(s, ABERTURA_P2, 0.35) }}>
          <Img src={staticFile("img/victor1/eclipse.png")} style={{ position: "absolute", width: 1080, height: 1080, filter: "blur(10px) brightness(.4)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 320, textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 82, lineHeight: 0.95, color: "#fff6ff" }}>VICTOR</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 30, color: "#d9c8ff", letterSpacing: "0.3em", margin: "6px 0" }}>E O</div>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 82, lineHeight: 0.95, backgroundImage: `linear-gradient(90deg, ${ARCO.join(",")})`, WebkitBackgroundClip: "text", color: "transparent" }}>TALARICÓRNIO</div>
            <div style={{ display: "inline-block", marginTop: 34, fontFamily: SANS, fontWeight: 900, fontSize: 44, color: "#1a1020", background: "#ffcf5a", padding: "8px 26px", borderRadius: 8, opacity: p(s, 0.4, 0.3), transform: `scale(${1.2 - 0.2 * p(s, 0.4, 0.3)})` }}>PARTE 2</div>
          </div>
        </AbsoluteFill>
      ) : null}
      <Sequence from={0} durationInFrames={Math.round(2 * fps)} layout="none"><Audio src={staticFile("audio/victor1/s-rebobinar.mp3")} volume={0.5} /></Sequence>
      <Sequence from={Math.round(0.4 * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.35} /></Sequence>
    </AbsoluteFill>
  );
};
