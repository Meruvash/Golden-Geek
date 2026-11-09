import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Clareira, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

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

const CORES_FALA: Record<string, string> = { narrador: cor.texto, ronaldo: "#8fb4ff", wan: cor.ouro };

const Legenda: React.FC<{ s: number }> = ({ s }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.25);
  // não repete o que já está escrito grande na tela (gancho, resgate, cliffhanger, cartela)
  if (!f || [1, 9, 10, 12, 13].includes(f.id)) return null;
  const c = CORES_FALA[f.quem];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1236, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(15,17,21,.86)", borderRadius: 24, padding: "16px 26px", maxWidth: 960, textAlign: "center" }}>
        {f.quem !== "narrador" ? (
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
  const zoomPunch = entre(s, I(6), (I(7) - 0.13)) ? 1 + 0.9 * prog(s, I(6), 0.25) : entre(s, I(8), (I(9) - 0.3)) ? 1 + 0.55 * prog(s, I(8), 0.3) : 1;
  const camEscala = (1 + 0.04 * ((s % 9) / 9)) * zoomPunch;
  const camOrig = zoomPunch > 1 ? "300px 900px" : "540px 1100px";
  const tremor = entre(s, W(7, "não"), (W(7, "não") + 0.6)) ? Math.sin(s * 70) * 10 * (1 - prog(s, W(7, "não"), 0.6)) : entre(s, (W(9, "Wan") - 0.04), (W(9, "Wan") + 0.36)) ? Math.sin(s * 80) * 14 * (1 - prog(s, (W(9, "Wan") - 0.04), 0.4)) : 0;

  // ----- estados do Ronaldo -----
  const ronExpr = s < (I(3) - 0.08) ? "confuso" : s < (W(3, "criatura!") + 0.75) ? "orgulhoso" : "apavorado";
  const ronPose = entre(s, (I(3) - 0.08), (I(4) - 0.15)) ? "biblia" : entre(s, I(9), (I(13) - 0.14)) ? "encolhido" : "cartas";
  // andar até a outra clareira e bater numa parede invisível
  const anda = entre(s, (W(7, "não") - 1.6), (W(7, "não") + 1.4)) ? interpolate(s, [(W(7, "não") - 1.6), (W(7, "não") - 0.1), (W(7, "não") + 0.02), (W(7, "não") + 0.8)], [0, 260, 210, 0], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }) : 0;
  const ronX = s < I(9) ? 540 + anda : 230;
  const ronY = s < I(9) ? 1640 : 1700;
  const ronEsc = s < I(9) ? 1.02 : 0.66;
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -10 : 0);

  // ----- resgate -----
  const resgate = s >= I(9) && s < (I(13) - 0.14);
  const escuro = s < I(9) ? 0 : s < (I(12) - 0.09) ? 0.5 * prog(s, I(9), 0.4) : 0.5 + 0.25 * prog(s, I(12), 0.8);
  const wanSobe = prog(s, (W(9, "Wan") - 0.09), 0.45);
  const impacto = entre(s, (W(9, "Wan") - 0.09), (W(9, "Wan") - 0.02)) || entre(s, (I(9) - 0.02), (I(9) + 0.04));

  return (
    <AbsoluteFill style={{ backgroundColor: cor.fundo, fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      {/* ====== mundo ====== */}
      <AbsoluteFill style={{ transform: `scale(${camEscala}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
        <Clareira escurecer={escuro} />
        {/* clareiras de origem e destino desenhadas no chão (regra de mover) */}
        {entre(s, (I(7) - 0.03), (I(12) - 0.7)) ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, (I(7) - 0.03), 0.4) }}>
            <path d="M560,1650 C680,1600 760,1600 860,1650" stroke={cor.caminho} strokeWidth={14} strokeDasharray="4 26" strokeLinecap="round" fill="none" />
            <ellipse cx={500} cy={1660} rx={190} ry={52} fill="none" stroke="#f4f1ea" strokeWidth={7} opacity={0.8} />
            <ellipse cx={890} cy={1660} rx={150} ry={44} fill="none" stroke="#f4f1ea" strokeWidth={7} opacity={0.8} />
            {entre(s, (W(7, "não") - 0.05), (W(7, "não") + 1.0)) ? <rect x={700} y={1420} width={10} height={260} fill="#ff6b5b" opacity={1 - prog(s, (W(7, "não") + 0.2), 0.8)} /> : null}
          </svg>
        ) : null}
        {/* os gatos dos Marqueses: aparecem em "gatos", mais em "muitos gatos", tremem de raiva no "exército" */}
        <Gatos x={860} y={1560} w={520} s={s} t0={W(2, "gatos.")} giro={-2} tremer={entre(s, (W(4, "exército.") - 0.05), (W(4, "exército.") + 1.25)) ? 4 : 0} />
        <Gatos x={170} y={1480} w={380} s={s} t0={W(2, "Muitos")} giro={4} tremer={entre(s, (W(4, "exército.") - 0.05), (W(4, "exército.") + 1.25)) ? 4 : 0} />
        <Gatos x={980} y={1300} w={300} s={s} t0={W(2, "gatos.", 2)} giro={-6} />
        <Gatos x={300} y={1290} w={280} s={s} t0={W(4, "exército.")} giro={3} />
        <Gatos x={720} y={1260} w={260} s={s} t0={(W(4, "exército.") + 0.16)} giro={-3} />
        {/* raios e aura do resgate */}
        {resgate && s < (I(12) - 0.09) ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, (W(9, "Wan") - 0.09), 0.3) }}>
            <defs>
              <linearGradient id="r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffe9a6" stopOpacity={0.9} /><stop offset="1" stopColor="#e3b23c" stopOpacity={0} /></linearGradient>
            </defs>
            <g transform={`translate(600,1040) rotate(${(s - (W(9, "Wan") - 0.09)) * 6})`}>
              {Array.from({ length: 22 }, (_, i) => (
                <path key={i} d={`M0,-14 L${i % 2 ? 1300 : 1050},-${i % 2 ? 46 : 26} L${i % 2 ? 1300 : 1050},${i % 2 ? 46 : 26} L0,14 Z`} fill="url(#r)" opacity={i % 3 ? 0.5 : 0.8} transform={`rotate(${(360 / 22) * i})`} />
              ))}
            </g>
            <ellipse cx={600} cy={1660} rx={180 + 380 * prog(s, (W(9, "Wan") - 0.04), 0.6)} ry={26 + 50 * prog(s, (W(9, "Wan") - 0.04), 0.6)} fill="none" stroke="#ffd977" strokeWidth={10} opacity={1 - prog(s, (W(9, "Wan") + 0.26), 1.2)} />
          </svg>
        ) : null}
        {resgate && s >= (W(9, "Wan") - 0.09) ? <Aura x={600} y={1060 + (1 - wanSobe) * 600} raio={430 + 20 * Math.sin(s * 3)} seed={5} /> : null}
        {/* aves azuis das Rapinas descendo */}
        {s >= (W(12, "Rapinas") - 0.14) ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <Passaro x={120} y={-200 + 700 * prog(s, (W(12, "Rapinas") - 0.04), 1.4)} esc={1.1} />
            <Passaro x={640} y={-260 + 640 * prog(s, (W(12, "Rapinas") + 0.16), 1.4)} esc={0.8} />
            <Passaro x={380} y={-320 + 560 * prog(s, (W(12, "Rapinas") + 0.36), 1.4)} esc={0.6} />
          </svg>
        ) : null}
        {/* personagens */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(0,${bob("ronaldo")})`}>
            <Ronaldo x={ronX} y={ronY} escala={ronEsc} expr={ronExpr as "confuso"} pose={ronPose as "cartas"} />
          </g>
          {resgate && s >= (W(9, "Wan") - 0.09) ? (
            <g transform={`translate(0,${(1 - wanSobe) * 900 + bob("wan") * 0.5})`}>
              <Wan x={620} y={1680} escala={1.25} expr={s >= W(11, "Você") && s < (I(12) - 0.09) ? "sorriso" : s >= (I(12) - 0.09) ? "serio" : "calmo"} pose={s < I(11) - 0.23 ? "livro" : "bracos"} />
            </g>
          ) : null}
        </svg>
        {/* luz da Bíblia no "repreendido" */}
        {entre(s, (W(3, "repreendido!") - 0.1), (W(3, "criatura!") + 1.15)) ? (
          <div style={{ position: "absolute", left: 760, top: 840, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,.85), rgba(255,240,190,0) 70%)", opacity: prog(s, (W(3, "repreendido!") - 0.1), 0.3) * (1 - prog(s, (W(3, "criatura!") + 0.55), 0.6)) }} />
        ) : null}
      </AbsoluteFill>

      {/* ====== grafismos fixos na tela ====== */}
      {/* título do gancho */}
      {s < I(2) ? (
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(15,17,21,.9) 0px, rgba(15,17,21,.6) 560px, rgba(15,17,21,0) 820px)" }}>
          <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 210, opacity: 1 - prog(s, (I(2) - 0.35), 0.25, SAI) }}>
            <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ep. 1 · Root</div>
            <div style={{ ...tipo.titulo, fontSize: 104, color: cor.texto, marginTop: 18 }}>
              E se você acordasse <span style={{ color: cor.marca }}>dentro de Root</span>…
            </div>
            <div style={{ ...tipo.apoio, color: cor.texto, marginTop: 22, opacity: prog(s, W(1, "sem"), 0.3) }}>sem nunca ter jogado?</div>
          </div>
        </AbsoluteFill>
      ) : null}
      {/* 25 guerreiros */}
      {entre(s, I(5), (I(6) - 0.04)) ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", opacity: 1 - prog(s, (I(6) - 0.29), 0.25, SAI) }}>
          <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 300, lineHeight: 1, color: cor.marca, transform: `scale(${0.6 + 0.4 * prog(s, W(5, "vinte"), 0.35)})` }}>
            {Math.round(interpolate(s, [(W(5, "vinte") - 0.6), (W(5, "vinte") + 0.3)], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}
          </div>
          <div style={{ ...tipo.rotulo, fontSize: 34, color: cor.texto, marginTop: 6 }}>guerreiros dos Marqueses</div>
        </div>
      ) : null}
      {/* textos do resgate */}
      {entre(s, I(9), (I(10) - 0.09)) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 220 }}>
          <div style={{ ...tipo.apoio, fontSize: 56, color: cor.texto, opacity: prog(s, (I(9) + 0.04), 0.3) }}>Qualquer um correria.</div>
          <div style={{ ...tipo.titulo, fontSize: 112, color: cor.ouro, marginTop: 10, opacity: prog(s, (W(9, "Wan") - 0.04), 0.2), transform: `translateY(${(1 - prog(s, (W(9, "Wan") - 0.04), 0.4)) * 40}px)` }}>O Wan abriu o manual.</div>
        </div>
      ) : null}
      {/* dica real (a regra de verdade) */}
      {entre(s, I(10), (I(12) - 0.09)) ? (
        <div style={{ position: "absolute", left: 70, right: 70, top: 220, background: "rgba(15,17,21,.92)", border: `4px solid ${cor.ouro}`, borderRadius: 30, padding: "36px 44px", opacity: prog(s, I(10), 0.35), transform: `translateY(${(1 - prog(s, I(10), 0.45)) * 40}px)` }}>
          <div style={{ ...tipo.rotulo, color: cor.ouro }}>Dica real</div>
          <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 50, lineHeight: 1.18, color: cor.texto, marginTop: 14 }}>
            Para mover, você precisa governar a clareira de <span style={{ color: cor.ouro, opacity: s >= W(10, "saída") ? 1 : 0.5 }}>saída</span> ou a de <span style={{ color: cor.ouro, opacity: s >= W(10, "chegada.") ? 1 : 0.5 }}>chegada</span>.
          </div>
          <div style={{ fontFamily: fonte, fontWeight: 600, fontSize: 40, lineHeight: 1.2, color: cor.textoSuave, marginTop: 18, opacity: prog(s, W(11, "Governa"), 0.4) }}>
            Governa quem tem mais guerreiros e construções na clareira.
          </div>
        </div>
      ) : null}
      {/* "você tem zero" */}
      {entre(s, (W(11, "zero.") - 0.08), I(12)) ? (
        <div style={{ position: "absolute", left: 120, top: 780, fontFamily: fonte, fontWeight: 900, fontSize: 220, color: "#8fb4ff", transform: `scale(${mola(s, W(11, "zero."))})` }}>0</div>
      ) : null}
      {/* cliffhanger */}
      {entre(s, I(12), (I(13) - 0.09)) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 230, opacity: prog(s, I(12), 0.35) }}>
          <div style={{ ...tipo.titulo, fontSize: 92, color: cor.texto }}>…e as Rapinas <span style={{ color: "#6ea8ff" }}>acabaram de pousar.</span></div>
        </div>
      ) : null}
      {/* cartela final */}
      {s >= (I(13) - 0.14) ? (
        <AbsoluteFill style={{ background: `rgba(15,17,21,${0.8 * prog(s, (I(13) - 0.14), 0.4)})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", opacity: prog(s, (I(13) - 0.04), 0.4) }}>
            <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ep. 1 · Root</div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
              <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 52, color: cor.fundo, background: cor.marca, padding: "30px 64px", borderRadius: 999, transform: `scale(${0.8 + 0.2 * prog(s, (I(13) + 0.06), 0.5)})` }}>Segue pra ver a Parte 2</div>
            </div>
            <Img src={staticFile("img/logo.webp")} style={{ width: 360, marginTop: 70, opacity: prog(s, (I(13) + 0.46), 0.5) }} />
            <div style={{ ...tipo.rotulo, fontSize: 26, color: cor.textoSuave, marginTop: 50, opacity: prog(s, (I(13) + 0.66), 0.5) }}>História de ficção · regras de verdade do manual</div>
            <div style={{ ...tipo.rotulo, fontSize: 24, color: cor.textoSuave, marginTop: 14, opacity: prog(s, (I(13) + 0.66), 0.5) }}>Peças: foto MeepleBR</div>
          </div>
        </AbsoluteFill>
      ) : null}
      {/* crédito da foto enquanto os gatos aparecem */}
      {entre(s, W(2, "gatos."), (I(6) - 0.09)) ? <div style={{ position: "absolute", right: 80, top: 1110, ...tipo.rotulo, fontSize: 24, color: "#f4f1ea", textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>Peças: foto MeepleBR</div> : null}

      <Legenda s={s} />
      <Granulado forca={0.12} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, (I(9) - 0.2), I(9), (W(9, "Wan") - 0.04), (W(9, "Wan") + 0.66), (I(13) + 1.16), (DURACAO - 0.1)], [0, 0.12, 0.12, 0.03, 0.03, 0.12, 0.12, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.2) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      <Sequence from={Math.round((W(2, "gatos.") - 0.09) * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
      <Sequence from={Math.round((W(2, "Muitos") - 0.1) * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((W(3, "repreendido!") - 0.14) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((W(7, "não") - 0.1) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.6} /></Sequence>
      <Sequence from={Math.round((W(9, "Wan") - 10.12) * fps)} durationInFrames={Math.round(10.03 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} volume={0.22} /></Sequence>
      <Sequence from={Math.round((W(9, "Wan") - 0.14) * fps)} durationInFrames={Math.round(2.1 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.38} /></Sequence>
      <Sequence from={Math.round((W(12, "Rapinas") - 0.14) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.5} /></Sequence>
    </AbsoluteFill>
  );
};
