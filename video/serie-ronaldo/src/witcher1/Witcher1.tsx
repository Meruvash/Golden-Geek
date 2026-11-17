import React, { useLayoutEffect, useMemo } from "react";
import { AbsoluteFill, Easing, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "O bruxo no pôquer" — The Witcher: Old World, no padrão web documentário (video-agro do Arcvalion_gospel) com toques de dorama.
// Prioridade para imagem real (fotos oficiais e trechos react, com crédito); o resto é desenhado em código, semelhante e não idêntico.
// As pinturas em código (arte/cenas_witcher1.py) saíram: não combinavam com a arte do jogo. Fundos agora são fotos oficiais.
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
const FundoFoto: React.FC<{ nome: string; ls: number; z0?: number; z1?: number; dur?: number; pos?: string; filtro?: string }> = ({ nome, ls, z0 = 1.04, z1 = 1.12, dur = 6, pos = "50% 50%", filtro }) => (
  <AbsoluteFill style={{ overflow: "hidden" }}>
    <Img src={staticFile(`img/witcher1/oficiais/${nome}.jpg`)} style={{ width: 1080, height: 1080, objectFit: "cover", objectPosition: pos, transform: `scale(${z0 + (z1 - z0) * Math.min(1, ls / dur)})`, transformOrigin: pos, filter: filtro }} />
  </AbsoluteFill>
);
const ArteCaixa: React.FC<{ ls: number; left0: number; left1: number; esc0?: number; esc1?: number; dur?: number }> = ({ ls, left0, left1, esc0 = 1.02, esc1 = 1.08, dur = 4 }) => {
  const k = Math.min(1, ls / dur);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#0d1118" }}>
      <Img src={staticFile("img/witcher1/oficiais/arte-caixa.jpg")} style={{ position: "absolute", height: 1080, left: left0 + (left1 - left0) * k, top: 0, transform: `scale(${esc0 + (esc1 - esc0) * k})`, transformOrigin: "70% 40%" }} />
    </AbsoluteFill>
  );
};
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
const CamDados: React.FC<{ perto?: boolean }> = ({ perto }) => {
  const { camera } = useThree();
  useLayoutEffect(() => { if (perto) camera.position.set(0, 2.4, 2.5); else camera.position.set(0, 3.2, 4.2); camera.lookAt(0, 0.2, 0); }, [camera, perto]);
  return null;
};
const Dados: React.FC<{ s: number; t0: number; n?: number; conjuntos?: number; girar?: boolean; perto?: boolean }> = ({ s, t0, conjuntos = 1, girar, perto }) => {
  const tex = useMemo(texturasDado, []);
  const mats = useMemo(() => tex.map((t) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 })), [tex]);
  const lista = Array.from({ length: 5 * conjuntos }, (_, i) => i);
  return (
    <>
      <CamDados perto={perto} />
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
      <ArteCaixa ls={ls} left0={-760} left1={-740} esc0={1.0} esc1={1.1} dur={6} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,10,16,.72) 0%, rgba(8,10,16,.15) 48%, rgba(8,10,16,.55) 100%)" }} />
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
      <Credito txt="ARTE DA CAIXA: GO ON BOARD / CD PROJEKT RED" />
    </AbsoluteFill>
  ) },
  // 2 · o jogo e quem fez: a caixa de verdade
  { t: I(2) - 0.1, r: (s, ls) => (
    <AbsoluteFill>
      <FundoFoto nome="mesa-rebel" ls={ls} z0={1.15} z1={1.2} filtro="blur(6px) brightness(.4)" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 60, textAlign: "center" }}>
        <div style={{ fontFamily: "'DejaVu Serif', serif", fontStyle: "italic", fontWeight: 700, fontSize: 70, color: "#fff", opacity: p(s, I(2) + 0.2, 0.4), textShadow: "0 4px 14px #000" }}>The Witcher: Old World</div>
        <div style={{ fontFamily: MONO, fontSize: 28, color: AMAR, marginTop: 8, opacity: p(s, W(2, "Go") - 0.1, 0.3) }}>GO ON BOARD · CD PROJEKT RED</div>
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
      <Selo txt="1 a 5 jogadores" x={110} y={620} o={p(s, W(3, "jogadores,") - 0.3, 0.3)} />
      <Selo txt="5 escolas de bruxos" x={420} y={620} o={p(s, W(3, "escolas") - 0.2, 0.3)} cor={VERM} />
      <Selo txt="90 a 120 min" x={760} y={620} o={p(s, W(3, "bruxos.") - 0.1, 0.3)} />
      <Credito txt={ASMODEE} />
    </AbsoluteFill>
  ) },
  // 4 · dois conjuntos de cinco dados
  { t: I(4) - 0.1, r: (s) => (
    <AbsoluteFill>
      <FundoFoto nome="mesa-rebel" ls={s - I(4)} z0={1.1} z1={1.18} filtro="blur(5px) brightness(.5)" />
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
        <ArteCaixa ls={ls} left0={-560} left1={-700} esc0={1.0} esc1={1.06} />
        <Selo txt="ANOS ANTES DE GERALT" x={250} y={120} o={p(s, W(5, "anos") - 0.1, 0.3)} cor={TINTA} tam={44} />
        <Credito txt="ARTE DA CAIXA: GO ON BOARD / CD PROJEKT RED" />
      </AbsoluteFill>
    ) : (
      <AbsoluteFill>
        <FundoFoto nome="cartas-rebel" ls={s - corte} z0={1.35} z1={1.5} dur={4} pos="62% 18%" />
        <Selo txt="MONSTROS POR TODA PARTE" x={200} y={120} o={p(s, corte, 0.3)} cor={VERM} tam={44} />
        <Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" />
      </AbsoluteFill>
    );
  } },
  // 6 · a luta é no baralho
  { t: I(6) - 0.1, r: (s) => {
    const sai = p(s, W(6, "baralho.") - 0.3, 0.5);
    return (
      <AbsoluteFill>
        <FundoFoto nome="cartas-rebel" ls={s} z0={1.15} z1={1.15} filtro="blur(7px) brightness(.42)" />
        <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", left: -900 * sai, top: 40, opacity: 1 - sai }} gl={{ alpha: true }}>
          <Dados s={s} t0={-10} girar />
        </ThreeCanvas>
        <AbsoluteFill style={{ opacity: sai }}><FundoFoto nome="cartas-rebel" ls={s - W(6, "baralho.")} z0={1.5} z1={1.62} dur={2} pos="74% 38%" /></AbsoluteFill>
        {sai > 0 ? <Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" /> : null}
      </AbsoluteFill>
    );
  } },
  // 7 · ataques, esquivas e Sinais
  { t: I(7) - 0.1, r: (s) => (
    <AbsoluteFill>
      <FundoFoto nome="cartas-rebel" ls={s - I(7)} z0={1.3} z1={1.42} dur={4} pos="55% 12%" />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,10,16,.55) 0%, rgba(8,10,16,0) 40%)" }} />
      <Selo txt="ATAQUES" x={90} y={110} o={p(s, W(7, "ataques,") - 0.15, 0.25)} cor={VERM} tam={44} />
      <Selo txt="ESQUIVAS" x={400} y={110} o={p(s, W(7, "esquivas") - 0.15, 0.25)} cor={TINTA} tam={44} />
      <Selo txt="SINAIS" x={740} y={110} o={p(s, W(7, "Sinais,") - 0.15, 0.25)} cor="#5b3b8c" tam={44} />
      <Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" />
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
        <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #22324f 0%, #0d1118 75%)" }} />
        {k === 1 ? <><Foto nome="cartas-rebel" x={110} y={300} w={860} ls={ls} /><Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" /></> : null}
        {k === 3 ? <><Foto nome="mesa-rebel" x={110} y={300} w={860} ls={ls} /><Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" /></> : null}
        {k === 4 ? <><Foto nome="jogo-rebel" x={110} y={300} w={860} ls={ls} /><Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" /></> : null}
        {k === 0 ? <><Clipe nome="minis" t0={cortes[0]} y={290} /><Credito txt={ASMODEE} /></> : null}
        {k === 2 ? <><Clipe nome="monstro" t0={cortes[2]} y={290} rate={0.55} /><Credito txt={ASMODEE} /></> : null}
        <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 120, color: "#fff", lineHeight: 1 }}>{num}</div>
          <div style={{ fontFamily: MONO, fontSize: 30, color: AMAR, marginTop: 6 }}>{rot}</div>
        </div>
      </AbsoluteFill>
    );
  } },
  // 9 · troféus: vence na hora
  { t: I(9) - 0.1, r: (s) => (
    <AbsoluteFill>
      <ArteCaixa ls={s - I(9)} left0={-300} left1={-420} esc0={1.0} esc1={1.05} dur={5} />
      <AbsoluteFill style={{ background: "rgba(8,10,16,.45)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", opacity: p(s, W(9, "troféus") - 0.4, 0.4), transform: `scale(${0.85 + 0.15 * p(s, W(9, "troféus") - 0.4, 0.5)})` }}>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 170, color: AMAR, lineHeight: 1, textShadow: "0 8px 24px #000" }}>4 a 6</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: "#fff", textShadow: "0 4px 14px #000" }}>TROFÉUS</div>
      </div>
      <Credito txt="ARTE DA CAIXA: GO ON BOARD / CD PROJEKT RED" />
      <Selo txt="4 a 6 troféus = vitória na hora" x={200} y={110} o={p(s, W(9, "vence") - 0.2, 0.3)} cor={VERM} tam={42} />
    </AbsoluteFill>
  ) },
  // 10 · de onde vêm os troféus: monstro, taverna, treino
  { t: I(10) - 0.1, r: (s) => {
    const c2 = W(10, "briga") - 0.1, c3 = W(10, "treino") - 0.1;
    const k = s < c2 ? 0 : s < c3 ? 1 : 2;
    return (
      <AbsoluteFill>
        {k === 1 ? <><FundoFoto nome="jogo-rebel" ls={s - c2} z0={1.0} z1={1.1} dur={2} pos="30% 40%" /><Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" /></> : <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #22324f 0%, #0d1118 75%)" }} />}
        {k === 0 ? <><Foto nome="minis-e-caixa" x={40} y={260} w={1000} ls={s - I(10)} z={0.06} /><Credito txt="IMAGEM: GO ON BOARD · MONSTRO EM MINIATURA: EDIÇÃO DELUXE" /></> : null}
        {k === 2 ? <><Clipe nome="tabuleiro" t0={c3} y={230} /><Credito txt={ASMODEE} /></> : null}
        <Selo txt={["monstro abatido", "briga na taverna", "treino até o máximo"][k]} x={300} y={120} o={1} cor={TINTA} tam={40} />
      </AbsoluteFill>
    );
  } },
  // 11 · o pôquer paga o ouro
  { t: I(11) - 0.1, r: (s, ls) => (
    <AbsoluteFill>
      <FundoFoto nome="mesa-rebel" ls={ls} z0={1.1} z1={1.18} dur={2} filtro="brightness(.6)" />
      <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", left: 0, top: 260 }} gl={{ alpha: true }}>
        <Dados s={s} t0={-10} />
      </ThreeCanvas>
      <Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" />
    </AbsoluteFill>
  ) },
  // 12 · a escolha
  { t: I(12) - 0.1, r: (s) => (
    <AbsoluteFill style={{ background: "#13233F" }}>
      <div style={{ position: "absolute", left: 120, top: 150, width: 360, height: 360, borderRadius: 14, overflow: "hidden", border: `6px solid ${PAPEL}`, opacity: p(s, W(12, "caçar") - 0.2, 0.3) }}>
        <Img src={staticFile("img/witcher1/oficiais/cartas-rebel.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% 10%", transform: "scale(1.5)", transformOrigin: "58% 10%" }} />
      </div>
      <div style={{ position: "absolute", left: 600, top: 150, width: 360, height: 360, borderRadius: 14, overflow: "hidden", border: `6px solid ${PAPEL}`, background: "#3a2618", opacity: p(s, W(12, "ficar") - 0.2, 0.3) }}>
        <ThreeCanvas width={360} height={360} gl={{ alpha: true }}>
          <Dados s={s} t0={W(12, "ficar") - 0.3} perto />
        </ThreeCanvas>
      </div>
      {([["CAÇAR", 120, W(12, "caçar")], ["TAVERNA", 600, W(12, "taverna?")]] as const).map(([t, x, t0]) => (
        <div key={t} style={{ position: "absolute", left: x, top: 535, width: 360, textAlign: "center", opacity: p(s, t0 - 0.2, 0.3) }}>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: "#111", background: AMAR, borderRadius: 10, padding: "10px 0" }}>{t}</div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", fontFamily: MONO, fontSize: 30, color: AMAR, opacity: p(s, I(12), 0.3) }}>COMENTA AQUI</div>
    </AbsoluteFill>
  ) },
  // 13 · fechamento: foto oficial da mesa montada + link da resenha no site
  { t: I(13) - 0.1, r: (s, ls) => (
    <AbsoluteFill style={{ background: "#0d1118" }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img src={staticFile("img/witcher1/oficiais/mesa-rebel.jpg")} style={{ position: "absolute", height: 1080, left: -270, top: 0, transform: `scale(${1.02 + 0.05 * Math.min(1, ls / 5)})`, filter: "brightness(.42) blur(1.5px)" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}>
        <div style={{ fontFamily: "'DejaVu Serif', serif", fontStyle: "italic", fontWeight: 700, fontSize: 64, color: "#fff", textShadow: "0 4px 14px #000" }}>The Witcher: Old World</div>
        <div style={{ display: "inline-block", marginTop: 34, background: PAPEL, borderRadius: 14, padding: "22px 34px", boxShadow: "0 18px 40px rgba(0,0,0,.6)", opacity: p(s, I(13) + 0.2, 0.4), transform: `translateY(${30 * (1 - p(s, I(13) + 0.2, 0.5))}px)` }}>
          <div style={{ fontFamily: MONO, fontSize: 26, fontWeight: 700, color: VERM, letterSpacing: 2 }}>RESENHA COMPLETA NO SITE</div>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 38, color: TINTA, marginTop: 8 }}>eliteboardgamers.com.br/the-witcher-old-world</div>
        </div>
        <div style={{ marginTop: 34, opacity: p(s, I(13) + 0.8, 0.4) }}>
          <Img src={staticFile("img/logo.webp")} style={{ width: 200 }} />
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 46, color: AMAR, marginTop: 10, textShadow: "0 3px 10px #000" }}>@eliteboardgamers</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 40, right: 40, bottom: 70, textAlign: "center", fontFamily: MONO, fontSize: 19, color: "#fff", opacity: p(s, F(13), 0.4), lineHeight: 1.5, textShadow: "0 2px 6px #000" }}>
        Imagens: Go On Board · Rebel · vídeo Asmodee Deutschland (TikTok)<br />
        Fontes: Asmodee (REB9859) · CD PROJEKT RED, 22/6/2023 · Gamefound (Go On Board)
      </div>
      <Credito txt="FOTO: REBEL · EDIÇÃO POLONESA" />
    </AbsoluteFill>
  ) },
];

export const Witcher1: React.FC<{ semLegenda?: boolean }> = ({ semLegenda }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  let k = 0;
  PLANOS.forEach((pl, i) => { if (s >= pl.t) k = i; });
  const pl = PLANOS[k];
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <AbsoluteFill>{pl.r(s, s - pl.t)}</AbsoluteFill>
      {s > 1.2 && !semLegenda ? <Legenda s={s} /> : null}
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
