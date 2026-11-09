import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Clareira, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import { FALAS } from "./dados";

// Tokens de movimento do PADRAO_VIDEO.md (seção 6)
const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const SAI = Easing.bezier(0.7, 0, 0.84, 0);
const prog = (s: number, t0: number, d: number, ease = ENTRA) =>
  interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const mola = (s: number, t0: number) => {
  // pop com leve overshoot (só peças e ícones; nunca texto)
  const x = Math.max(0, s - t0);
  return x <= 0 ? 0 : 1 - Math.exp(-9 * x) * Math.cos(14 * x);
};
const entre = (s: number, a: number, b: number) => s >= a && s < b;

const CORES_FALA: Record<string, string> = { narradora: cor.texto, ronaldo: "#8fb4ff", wan: cor.ouro };

const Legenda: React.FC<{ s: number }> = ({ s }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.25);
  // não repete o que já está escrito grande na tela (gancho, resgate, cliffhanger, cartela)
  if (!f || [1, 9, 10, 12, 13].includes(f.id)) return null;
  const c = CORES_FALA[f.quem];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1236, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(15,17,21,.86)", borderRadius: 24, padding: "16px 26px", maxWidth: 960, textAlign: "center" }}>
        {f.quem !== "narradora" ? (
          <div style={{ ...tipo.rotulo, fontSize: 24, color: c, marginBottom: 6 }}>{f.quem === "wan" ? "Wan" : "Ronaldo"}</div>
        ) : null}
        <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 42, lineHeight: 1.2 }}>
          {f.palavras.map((p, i) => (
            <span key={i} style={{ color: s >= p.t ? c : "rgba(236,239,243,.38)" }}>{p.w} </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Gatos: React.FC<{ x: number; y: number; w: number; giro?: number; s: number; t0: number; tremer?: number }> = ({ x, y, w, giro = 0, s, t0, tremer = 0 }) => {
  const k = mola(s, t0);
  if (k <= 0) return null;
  const sh = tremer ? Math.sin(s * 60) * tremer : 0;
  return (
    <Img
      src={staticFile("img/root-gatos-recorte.png")}
      style={{ position: "absolute", left: x - w / 2 + sh, top: y - w * 0.61, width: w, transform: `rotate(${giro}deg) scale(${k})`, transformOrigin: "50% 100%" }}
    />
  );
};

const Passaro: React.FC<{ x: number; y: number; esc: number }> = ({ x, y, esc }) => (
  // ave estilizada nossa (não é a arte do jogo), azul das Rapinas
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <path d="M0,0 C30,-40 70,-46 90,-20 C110,-46 150,-40 180,0 C140,-14 110,-6 90,10 C70,-6 40,-14 0,0 Z" fill="#6ea8ff" />
    <path d="M78,4 L90,26 L102,4 Z" fill="#e3b23c" />
  </g>
);

export const Ep01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  // ----- câmera: um "push" lento por cena e punch-ins nas falas do Ronaldo -----
  const zoomPunch = entre(s, 22.39, 24.1) ? 1 + 0.9 * prog(s, 22.39, 0.25) : entre(s, 28.63, 31.9) ? 1 + 0.55 * prog(s, 28.63, 0.3) : 1;
  const camEscala = (1 + 0.04 * ((s % 9) / 9)) * zoomPunch;
  const camOrig = zoomPunch > 1 ? "300px 900px" : "540px 1100px";
  const tremor = entre(s, 26.4, 27.0) ? Math.sin(s * 70) * 10 * (1 - prog(s, 26.4, 0.6)) : entre(s, 33.9, 34.3) ? Math.sin(s * 80) * 14 * (1 - prog(s, 33.9, 0.4)) : 0;

  // ----- estados do Ronaldo -----
  const ronExpr = s < 9.6 ? "confuso" : s < 12.4 ? "orgulhoso" : "apavorado";
  const ronPose = entre(s, 9.6, 14.4) ? "biblia" : entre(s, 32.2, 49.2) ? "encolhido" : "cartas";
  // andar até a outra clareira e bater numa parede invisível
  const anda = entre(s, 24.8, 27.8) ? interpolate(s, [24.8, 26.3, 26.42, 27.2], [0, 260, 210, 0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }) : 0;
  const ronX = s < 32.2 ? 540 + anda : 230;
  const ronY = s < 32.2 ? 1640 : 1700;
  const ronEsc = s < 32.2 ? 1.02 : 0.66;
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -10 : 0);

  // ----- resgate -----
  const resgate = s >= 32.2 && s < 49.2;
  const escuro = s < 32.2 ? 0 : s < 45.5 ? 0.5 * prog(s, 32.2, 0.4) : 0.5 + 0.25 * prog(s, 45.6, 0.8);
  const wanSobe = prog(s, 33.85, 0.45);
  const impacto = entre(s, 33.85, 33.92) || entre(s, 32.18, 32.24);

  return (
    <AbsoluteFill style={{ backgroundColor: cor.fundo, fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      {/* ====== mundo ====== */}
      <AbsoluteFill style={{ transform: `scale(${camEscala}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
        <Clareira escurecer={escuro} />
        {/* clareiras de origem e destino desenhadas no chão (regra de mover) */}
        {entre(s, 24.2, 44.9) ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, 24.2, 0.4) }}>
            <path d="M560,1650 C680,1600 760,1600 860,1650" stroke={cor.caminho} strokeWidth={14} strokeDasharray="4 26" strokeLinecap="round" fill="none" />
            <ellipse cx={500} cy={1660} rx={190} ry={52} fill="none" stroke="#f4f1ea" strokeWidth={7} opacity={0.8} />
            <ellipse cx={890} cy={1660} rx={150} ry={44} fill="none" stroke="#f4f1ea" strokeWidth={7} opacity={0.8} />
            {entre(s, 26.35, 27.4) ? <rect x={700} y={1420} width={10} height={260} fill="#ff6b5b" opacity={1 - prog(s, 26.6, 0.8)} /> : null}
          </svg>
        ) : null}
        {/* os gatos dos Marqueses: aparecem em "gatos", mais em "muitos gatos", tremem de raiva no "exército" */}
        <Gatos x={860} y={1560} w={520} s={s} t0={8.09} giro={-2} tremer={entre(s, 17.9, 19.2) ? 4 : 0} />
        <Gatos x={170} y={1480} w={380} s={s} t0={8.6} giro={4} tremer={entre(s, 17.9, 19.2) ? 4 : 0} />
        <Gatos x={980} y={1300} w={300} s={s} t0={9.0} giro={-6} />
        <Gatos x={300} y={1290} w={280} s={s} t0={17.94} giro={3} />
        <Gatos x={720} y={1260} w={260} s={s} t0={18.1} giro={-3} />
        {/* raios e aura do resgate */}
        {resgate && s < 45.5 ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, 33.85, 0.3) }}>
            <defs>
              <linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffe9a6" stopOpacity={0.9} /><stop offset="1" stopColor="#e3b23c" stopOpacity={0} /></linearGradient>
            </defs>
            <g transform={`translate(600,1040) rotate(${(s - 33.85) * 6})`}>
              {Array.from({ length: 22 }, (_, i) => (
                <path key={i} d={`M0,-14 L${i % 2 ? 1300 : 1050},-${i % 2 ? 46 : 26} L${i % 2 ? 1300 : 1050},${i % 2 ? 46 : 26} L0,14 Z`} fill="url(#r)" opacity={i % 3 ? 0.5 : 0.8} transform={`rotate(${(360 / 22) * i})`} />
              ))}
            </g>
            <ellipse cx={600} cy={1660} rx={180 + 380 * prog(s, 33.9, 0.6)} ry={26 + 50 * prog(s, 33.9, 0.6)} fill="none" stroke="#ffd977" strokeWidth={10} opacity={1 - prog(s, 34.2, 1.2)} />
          </svg>
        ) : null}
        {resgate && s >= 33.85 ? <Aura x={600} y={1060 + (1 - wanSobe) * 600} raio={430 + 20 * Math.sin(s * 3)} seed={5} /> : null}
        {/* aves azuis das Rapinas descendo */}
        {s >= 46.9 ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <Passaro x={120} y={-200 + 700 * prog(s, 47.0, 1.4)} esc={1.1} />
            <Passaro x={640} y={-260 + 640 * prog(s, 47.2, 1.4)} esc={0.8} />
            <Passaro x={380} y={-320 + 560 * prog(s, 47.4, 1.4)} esc={0.6} />
          </svg>
        ) : null}
        {/* personagens */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(0,${bob("ronaldo")})`}>
            <Ronaldo x={ronX} y={ronY} escala={ronEsc} expr={ronExpr as "confuso"} pose={ronPose as "cartas"} />
          </g>
          {resgate && s >= 33.85 ? (
            <g transform={`translate(0,${(1 - wanSobe) * 900 + bob("wan") * 0.5})`}>
              <Wan x={620} y={1680} escala={1.25} expr={s >= 43.9 && s < 45.5 ? "sorriso" : s >= 45.5 ? "serio" : "calmo"} pose={s < 40 ? "livro" : "bracos"} />
            </g>
          ) : null}
        </svg>
        {/* luz da Bíblia no "repreendido" */}
        {entre(s, 9.9, 12.8) ? (
          <div style={{ position: "absolute", left: 760, top: 840, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,.85), rgba(255,240,190,0) 70%)", opacity: prog(s, 9.9, 0.3) * (1 - prog(s, 12.2, 0.6)) }} />
        ) : null}
      </AbsoluteFill>

      {/* ====== grafismos fixos na tela ====== */}
      {/* título do gancho */}
      {s < 3.9 ? (
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(15,17,21,.9) 0px, rgba(15,17,21,.6) 560px, rgba(15,17,21,0) 820px)" }}>
          <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 210, opacity: 1 - prog(s, 3.6, 0.25, SAI) }}>
            <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ep. 1 · Root</div>
            <div style={{ ...tipo.titulo, fontSize: 104, color: cor.texto, marginTop: 18 }}>
              E se você acordasse <span style={{ color: cor.marca }}>dentro de Root</span>…
            </div>
            <div style={{ ...tipo.apoio, color: cor.texto, marginTop: 22, opacity: prog(s, 2.37, 0.3) }}>sem nunca ter jogado?</div>
          </div>
        </AbsoluteFill>
      ) : null}
      {/* 25 guerreiros */}
      {entre(s, 19.6, 22.35) ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", opacity: 1 - prog(s, 22.1, 0.25, SAI) }}>
          <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 300, lineHeight: 1, color: cor.marca, transform: `scale(${0.6 + 0.4 * prog(s, 20.6, 0.35)})` }}>
            {Math.round(interpolate(s, [20.0, 20.9], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}
          </div>
          <div style={{ ...tipo.rotulo, fontSize: 34, color: cor.texto, marginTop: 6 }}>guerreiros dos Marqueses</div>
        </div>
      ) : null}
      {/* textos do resgate */}
      {entre(s, 32.2, 35.3) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 220 }}>
          <div style={{ ...tipo.apoio, fontSize: 56, color: cor.texto, opacity: prog(s, 32.25, 0.3) }}>Qualquer um correria.</div>
          <div style={{ ...tipo.titulo, fontSize: 112, color: cor.ouro, marginTop: 10, opacity: prog(s, 33.9, 0.2), transform: `translateY(${(1 - prog(s, 33.9, 0.4)) * 40}px)` }}>O Wan abriu o manual.</div>
        </div>
      ) : null}
      {/* dica real (a regra de verdade) */}
      {entre(s, 35.4, 45.5) ? (
        <div style={{ position: "absolute", left: 70, right: 70, top: 220, background: "rgba(15,17,21,.92)", border: `4px solid ${cor.ouro}`, borderRadius: 30, padding: "36px 44px", opacity: prog(s, 35.4, 0.35), transform: `translateY(${(1 - prog(s, 35.4, 0.45)) * 40}px)` }}>
          <div style={{ ...tipo.rotulo, color: cor.ouro }}>Dica real</div>
          <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 50, lineHeight: 1.18, color: cor.texto, marginTop: 14 }}>
            Para mover, você precisa governar a clareira de <span style={{ color: cor.ouro, opacity: s >= 38.3 ? 1 : 0.5 }}>saída</span> ou a de <span style={{ color: cor.ouro, opacity: s >= 39.1 ? 1 : 0.5 }}>chegada</span>.
          </div>
          <div style={{ fontFamily: fonte, fontWeight: 600, fontSize: 40, lineHeight: 1.2, color: cor.textoSuave, marginTop: 18, opacity: prog(s, 40.2, 0.4) }}>
            Governa quem tem mais guerreiros e construções na clareira.
          </div>
        </div>
      ) : null}
      {/* "você tem zero" */}
      {entre(s, 44.5, 45.6) ? (
        <div style={{ position: "absolute", left: 120, top: 780, fontFamily: fonte, fontWeight: 900, fontSize: 220, color: "#8fb4ff", transform: `scale(${mola(s, 44.58)})` }}>0</div>
      ) : null}
      {/* cliffhanger */}
      {entre(s, 45.6, 49.25) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 230, opacity: prog(s, 45.6, 0.35) }}>
          <div style={{ ...tipo.titulo, fontSize: 92, color: cor.texto }}>…e as Rapinas <span style={{ color: "#6ea8ff" }}>acabaram de pousar.</span></div>
        </div>
      ) : null}
      {/* cartela final */}
      {s >= 49.2 ? (
        <AbsoluteFill style={{ background: `rgba(15,17,21,${0.8 * prog(s, 49.2, 0.4)})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", opacity: prog(s, 49.3, 0.4) }}>
            <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ep. 1 · Root</div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
              <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 52, color: cor.fundo, background: cor.marca, padding: "30px 64px", borderRadius: 999, transform: `scale(${0.8 + 0.2 * prog(s, 49.4, 0.5)})` }}>Segue pra ver a Parte 2</div>
            </div>
            <Img src={staticFile("img/logo.webp")} style={{ width: 360, marginTop: 70, opacity: prog(s, 49.8, 0.5) }} />
            <div style={{ ...tipo.rotulo, fontSize: 26, color: cor.textoSuave, marginTop: 50, opacity: prog(s, 50.0, 0.5) }}>História de ficção · regras de verdade do manual</div>
            <div style={{ ...tipo.rotulo, fontSize: 24, color: cor.textoSuave, marginTop: 14, opacity: prog(s, 50.0, 0.5) }}>Peças: foto MeepleBR</div>
          </div>
        </AbsoluteFill>
      ) : null}
      {/* crédito da foto enquanto os gatos aparecem */}
      {entre(s, 8.1, 22.3) ? <div style={{ position: "absolute", right: 80, top: 1110, ...tipo.rotulo, fontSize: 24, color: "#f4f1ea", textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>Peças: foto MeepleBR</div> : null}

      <Legenda s={s} />
      <Granulado forca={0.12} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, 32.0, 32.2, 33.9, 34.6, 50.5, 52.3], [0, 0.12, 0.12, 0.03, 0.03, 0.12, 0.12, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.2) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      <Sequence from={Math.round(8.0 * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
      <Sequence from={Math.round(8.5 * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round(9.85 * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round(26.3 * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.6} /></Sequence>
      <Sequence from={Math.round(23.82 * fps)} durationInFrames={Math.round(10.03 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} volume={0.22} /></Sequence>
      <Sequence from={Math.round(33.8 * fps)} durationInFrames={Math.round(2.1 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.38} /></Sequence>
      <Sequence from={Math.round(46.9 * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.5} /></Sequence>
    </AbsoluteFill>
  );
};
