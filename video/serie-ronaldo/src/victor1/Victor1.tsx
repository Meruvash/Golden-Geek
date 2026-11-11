import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { LUZ_POENTE, WanHD } from "../personagens/WanHD";
import { Lukita, Ronaldo } from "../personagens/Personagens";
import { FiltroCel } from "../colt/Teste";
import { Papel } from "../colt/faroeste";
import { PoeiraLuz } from "../colt/luz";
import { fontesProntas } from "../tema";
import { Brasinha, Dragao, Talaricornio, Vendedor, Victor, VictorArmadura } from "./personagens";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "Victor e o Talaricórnio", Ep. 1 — formato microdrama (ROTEIRO_REFERENCIAS.md §4e) com a escolha final do saveo.
// Roteiro aprovado: video/roteiros/victor-talaricornio-ep1.md. Tema Dragon Eclipse (ilhas, eclipse, Mystlings).
// Tudo desenhado em código: cenários (arte/cenas_victor1.py) + personagens em SVG com acabamento cel (FiltroCel).
void fontesProntas;
export const FIM_VICTOR1 = DURACAO + 3.6;

const SANS = "Public Sans";
const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const p = (s: number, t0: number, d: number, e = ENTRA) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lin = (s: number, a: number, b: number) => interpolate(s, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const ROSA = "#ff5ab0";
const ARCO = ["#e2364f", "#f2843a", "#f2d23a", "#4ac06a", "#3a8fd6", "#3a4ab8", "#9a4ad6"];
const pisca = (s: number) => (s + 0.7) % 3.6 < 0.13;

const Fundo: React.FC<{ nome: string; filtro?: string }> = ({ nome, filtro }) => (
  <Img src={staticFile(`img/victor1/${nome}.png`)} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1080, filter: filtro }} />
);
const Cam: React.FC<{ ls: number; de?: number; ate?: number; ox?: number; oy?: number; dur?: number; tremor?: number; children: React.ReactNode }> = ({ ls, de = 1, ate = 1.06, ox = 540, oy = 540, dur = 3, tremor = 0, children }) => {
  const z = de + (ate - de) * Easing.out(Easing.quad)(Math.min(1, Math.max(0, ls) / dur));
  const tx = tremor ? Math.sin(ls * 71) * tremor * Math.exp(-ls * 4) : 0;
  const ty = tremor ? Math.cos(ls * 53) * tremor * Math.exp(-ls * 4) : 0;
  return <AbsoluteFill style={{ transform: `translate(${tx}px,${ty}px) scale(${z})`, transformOrigin: `${ox}px ${oy}px` }}>{children}</AbsoluteFill>;
};
const Svg: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; cel?: string }> = ({ children, style, cel }) => (
  <svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", ...style }}>
    {cel ? <g filter={`url(#${cel})`}>{children}</g> : children}
  </svg>
);
const Luz: React.FC<{ x: number; y: number; r: number; cor: string; forca?: number }> = ({ x, y, r, cor, forca = 0.35 }) => (
  <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none", opacity: forca, background: `radial-gradient(circle at ${x}px ${y}px, ${cor} 0px, ${cor}00 ${r}px)` }} />
);
const Escurece: React.FC<{ op: number; cor?: string }> = ({ op, cor = "#000" }) => <AbsoluteFill style={{ background: cor, opacity: op, pointerEvents: "none" }} />;
const Rotulo: React.FC<{ txt: string; op?: number; y?: number; cor?: string }> = ({ txt, op = 1, y = 52, cor = "#fff4fb" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: y, textAlign: "center", opacity: op }}>
    <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: "0.24em", color: cor, background: "rgba(12,6,18,.65)", padding: "7px 14px", borderRadius: 6 }}>{txt}</span>
  </div>
);
// Aura arco-íris girando atrás de quem se transforma.
const Aura: React.FC<{ x: number; y: number; s: number; r: number; op: number }> = ({ x, y, s, r, op }) => (
  <Svg style={{ mixBlendMode: "screen", opacity: op }}>
    <g transform={`translate(${x},${y}) rotate(${s * 40})`}>
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M0,0 L${r},-${r * 0.09} L${r},${r * 0.09} Z`} fill={ARCO[i % 7]} opacity={0.55} transform={`rotate(${(360 / 14) * i})`} />)}
    </g>
    <circle cx={x} cy={y} r={r * 0.35} fill="#fff6ff" opacity={0.35} />
  </Svg>
);

// Legenda de microdrama: uma linha, quem fala em cima, palavra dita em branco.
const NOMES: Record<string, string> = { victor: "VICTOR", wan: "WAN", lukita: "LUKITA", ronaldo: "RONALDO", vendedor: "VENDEDOR DE POÇÕES" };
const PENSA = [9, 10, 11];
const Legenda: React.FC<{ s: number }> = ({ s }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.3);
  if (!f) return null;
  const blocos: number[][] = [];
  let atual: number[] = [];
  f.palavras.forEach((w, i) => { atual.push(i); if (atual.length >= 5 || /[.,?!…:]$/.test(w.w)) { blocos.push(atual); atual = []; } });
  if (atual.length) blocos.push(atual);
  const k = Math.max(0, f.palavras.filter((w) => s >= w.t).length - 1);
  const bloco = blocos.find((b) => b.includes(k)) ?? blocos[0];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 860, textAlign: "center" }}>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 19, letterSpacing: "0.24em", color: f.quem === "victor" ? "#c9a8ff" : f.quem === "wan" ? "#ffcf5a" : f.quem === "lukita" ? "#8ad6ff" : f.quem === "ronaldo" ? "#ffb07a" : "#e0d0ff", marginBottom: 6 }}>
        {NOMES[f.quem]}{PENSA.includes(f.id) ? " · PENSANDO" : ""}
      </div>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 52, lineHeight: 1.1, fontStyle: PENSA.includes(f.id) ? "italic" : "normal", textShadow: "0 3px 0 rgba(0,0,0,.85), 0 0 22px rgba(0,0,0,.75)" }}>
        {bloco.map((i) => <span key={i} style={{ color: i <= k ? "#fffaf6" : "rgba(255,250,246,.4)" }}>{f.palavras[i].w} </span>)}
      </div>
    </div>
  );
};

// Quadro de giz do Lukita no acampamento.
const Quadro: React.FC<{ s: number; linhas: { txt: string; t: number; cor?: string }[] }> = ({ s, linhas }) => (
  <div style={{ position: "absolute", left: 470, top: 150, width: 540, height: 420, background: "#1f3a2c", border: "14px solid #6a4428", borderRadius: 8, boxShadow: "0 20px 40px rgba(0,0,0,.5)", padding: "26px 28px" }}>
    {linhas.map((l, i) => (
      <div key={i} style={{ fontFamily: SANS, fontWeight: 700, fontSize: 32, color: l.cor ?? "#f1f4ea", opacity: p(s, l.t, 0.4), marginBottom: 14, clipPath: `inset(0 ${100 - 100 * lin(s, l.t, l.t + 0.7)}% 0 0)` }}>{l.txt}</div>
    ))}
  </div>
);

// fins de falas usados como marcos de plano
function fimFala(id: number) { const f = FALAS.find((x) => x.id === id)!; return f.inicio + f.dur; }
const F21 = fimFala(21), F25 = fimFala(25), F26 = fimFala(26), F2 = fimFala(2), F6 = fimFala(6), F7 = fimFala(7), F12 = fimFala(12), F13 = fimFala(13), F16 = fimFala(16), F22 = fimFala(22), F23 = fimFala(23), F24 = fimFala(24), F30 = fimFala(30), F31 = fimFala(31), F32 = fimFala(32);
const T_MERCADO = I(3) + 2.9;

type Plano = { t: number; render: (s: number, ls: number) => React.ReactNode };

const PLANOS: Plano[] = [
  // 1 · abertura no clímax: close do Victor brilhando no eclipse
  { t: 0, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.12} oy={420} dur={2.8}>
      <Fundo nome="eclipse" />
      <Aura x={540} y={470} s={s} r={700} op={0.35 + 0.15 * Math.sin(s * 4)} />
      <Svg cel="cel"><Victor x={540} y={1980} escala={2.6} expr="determinado" t={s} /></Svg>
      <Luz x={700} y={250} r={500} cor="#ff9a6a" forca={0.3} />
    </Cam>
  ) },
  // 1b · o Talaricórnio na beira do penhasco: pisca pro Victor
  { t: W(2, "Hoje") - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.04} ate={1.1} ox={640} oy={760} dur={2}>
      <Fundo nome="eclipse" />
      <Aura x={900} y={560} s={s} r={420} op={0.3} />
      <Svg cel="cel">
        <Talaricornio x={600} y={870} escala={0.95} t={s} olho={s > I(2) + 0.85 ? "pisca" : "flerte"} crina={lin(s, I(2) + 0.3, I(2) + 0.9)} />
        <Victor x={930} y={1000} escala={0.95} expr="determinado" pose="aponta" virar t={s} />
      </Svg>
    </Cam>
  ) },
  // 1c · "Victor, não!": clarão de arco-íris
  { t: I(3) - 0.1, render: (s, ls) => (
    <AbsoluteFill>
      <Cam ls={ls} de={1.1} ate={1.2} dur={1.4} tremor={14}>
        <Fundo nome="eclipse" />
        <Aura x={760} y={620} s={s * 3} r={900} op={0.6 + 0.4 * lin(s, I(3), I(3) + 1.1)} />
      </Cam>
      <Escurece op={lin(s, I(3) + 0.5, I(3) + 1.3)} cor="#fff6ff" />
    </AbsoluteFill>
  ) },
  // 2 · título + "doze horas antes" (rebobinando)
  { t: I(3) + 1.3, render: (s, ls) => (
    <AbsoluteFill style={{ background: "#10081c" }}>
      <Fundo nome="eclipse" filtro={`blur(10px) brightness(.4) hue-rotate(${ls * 60}deg)`} />
      {Array.from({ length: 10 }, (_, i) => <div key={i} style={{ position: "absolute", left: 0, right: 0, top: ((i * 117 + ls * 900) % 1080), height: 3, background: "rgba(255,255,255,.18)" }} />)}
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", opacity: p(s, I(3) + 1.3, 0.4) }}>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 92, lineHeight: 0.95, color: "#fff6ff", letterSpacing: "-0.02em" }}>VICTOR</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: "#d9c8ff", letterSpacing: "0.3em", margin: "8px 0" }}>E O</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 92, lineHeight: 0.95, backgroundImage: `linear-gradient(90deg, ${ARCO.join(",")})`, WebkitBackgroundClip: "text", color: "transparent" }}>TALARICÓRNIO</div>
      </div>
      <Rotulo txt="⏪  DOZE HORAS ANTES" y={700} op={p(s, I(3) + 1.8, 0.3)} />
    </AbsoluteFill>
  ) },
  // 3 · confronto no mercado: Lukita e Victor com a gaiola de cristal
  { t: I(4) - 0.15, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.06} dur={4}>
      <Fundo nome="mercado" />
      <Svg cel="cel">
        <Lukita x={300} y={1020} escala={0.95} expr="feliz" pose="normal" formulaCerta />
        <Victor x={770} y={1030} escala={0.95} expr="sombrio" pose="normal" virar t={s} />
        <g transform="translate(600,820)">
          <path d="M-60,0 L60,0 L50,-120 C40,-170 -40,-170 -50,-120 Z" fill="rgba(200,230,255,.35)" stroke="#2a1626" strokeWidth={4} />
          {[-30, 0, 30].map((x0) => <path key={x0} d={`M${x0},0 L${x0 * 0.8},-150`} stroke="#9ad6ff" strokeWidth={3} />)}
        </g>
      </Svg>
    </Cam>
  ) },
  { t: I(5) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={3}><Fundo nome="mercado" filtro="blur(6px)" /><Svg cel="cel"><Victor x={540} y={1900} escala={2.4} expr="determinado" t={s} /></Svg></Cam>
  ) },
  { t: I(6) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={1.4}><Fundo nome="mercado" filtro="blur(6px)" /><Svg cel="cel"><Lukita x={540} y={1960} escala={2.5} expr="feliz" pose="normal" formulaCerta /></Svg></Cam>
  ) },
  { t: I(7) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={2.4}><Fundo nome="mercado" filtro="blur(6px)" /><Svg cel="cel"><Ronaldo x={540} y={1940} escala={2.5} expr="orgulhoso" pose="cartas" /></Svg></Cam>
  ) },
  { t: I(8) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.05} ate={1.18} oy={360} dur={3.4}><Fundo nome="mercado" filtro="blur(4px) brightness(.85)" /><Svg cel="cel"><Victor x={560} y={1500} escala={1.75} expr="sombrio" t={s} /></Svg></Cam>
  ) },
  // ferida escondida: Victor sozinho, a coleira vazia (fim de tarde)
  { t: I(9) - 0.3, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.08} dur={3.4}>
      <Fundo nome="mercado" filtro="sepia(.5) hue-rotate(-30deg) brightness(.55) saturate(1.4)" />
      <Luz x={900} y={300} r={700} cor="#ff7a4a" forca={0.4} />
      <Svg cel="cel"><Victor x={540} y={1560} escala={1.8} expr="triste" pose="coleira" t={s} /></Svg>
    </Cam>
  ) },
  // lembrança: Victor e a Brasinha
  { t: I(10) - 0.1, render: (s, ls) => (
    <AbsoluteFill style={{ filter: "sepia(.55) saturate(1.2)" }}>
      <Cam ls={ls} de={1} ate={1.06} dur={3.4}>
        <Fundo nome="mercado" filtro="brightness(1.05)" />
        <Svg cel="cel"><Victor x={540} y={1240} escala={1.3} expr="sombrio" t={s} /><Brasinha x={690} y={420 + 6 * Math.sin(s * 4)} t={s} escala={1.3} /></Svg>
      </Cam>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 540px 500px, rgba(0,0,0,0) 330px, rgba(30,10,20,.85) 620px)" }} />
      <Rotulo txt="LEMBRANÇA" y={52} />
    </AbsoluteFill>
  ) },
  // lembrança: o Talaricórnio joga a crina e leva a Brasinha
  { t: I(11) - 0.1, render: (s, ls) => {
    const sai = lin(s, W(11, "e"), I(11) + 3.8);
    return (
      <AbsoluteFill style={{ filter: "sepia(.55) saturate(1.2)" }}>
        <Cam ls={ls} de={1} ate={1.04} dur={3.6}>
          <Fundo nome="mercado" />
          <Svg cel="cel">
            <Victor x={200} y={1080} escala={1.05} expr="triste" t={s} />
            <Talaricornio x={600 + 700 * sai} y={940} escala={1.05} t={s} olho={s > W(11, "crina…") ? "pisca" : "flerte"} crina={lin(s, W(11, "jogar") - 0.1, W(11, "crina…") + 0.3)} brasinha={s >= W(11, "e")} passo={sai * 6} />
            {s < W(11, "e") ? <Brasinha x={300} y={660} t={s} /> : null}
          </Svg>
        </Cam>
        <AbsoluteFill style={{ background: "radial-gradient(circle at 540px 520px, rgba(0,0,0,0) 330px, rgba(30,10,20,.85) 620px)" }} />
        <Rotulo txt="LEMBRANÇA" y={52} />
      </AbsoluteFill>
    );
  } },
  // Ronaldo de longe: "o vampiro tá chorando purpurina"
  { t: I(12) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={2.4}>
      <Fundo nome="mercado" filtro="brightness(.8)" />
      <Svg cel="cel">
        <Ronaldo x={230} y={1000} escala={0.75} expr="confuso" pose="encolhido" />
        <Victor x={780} y={1180} escala={1.15} expr="triste" pose="coleira" virar t={s} />
      </Svg>
    </Cam>
  ) },
  // o cartaz de PROCURADO
  { t: I(13) - 0.3, render: (s, ls) => (
    <Cam ls={ls} de={1.08} ate={1.14} dur={1.6}>
      <Fundo nome="mercado" filtro="blur(8px) brightness(.6)" />
      <div style={{ position: "absolute", left: 230, top: 90, width: 440, height: 600, background: "#f1e3c2", border: "10px solid #6a4428", boxShadow: "0 20px 40px rgba(0,0,0,.55)", transform: "rotate(-2deg)", textAlign: "center", paddingTop: 26 }}>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 60, color: "#7a1c26", letterSpacing: "0.06em" }}>PROCURADO</div>
        <svg width={360} height={330} viewBox="-60 -500 360 330" style={{ display: "block", margin: "0 auto" }}><Talaricornio x={0} y={-180} escala={0.62} t={s} /></svg>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 40, color: "#2a1626" }}>TALARICÓRNIO</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 22, color: "#2a1626", marginTop: 6 }}>rouba Mystlings · e corações</div>
      </div>
      <Svg cel="cel"><Victor x={980} y={1760} escala={1.9} expr="determinado" virar t={s} /></Svg>
    </Cam>
  ) },
  // ironia dramática: ele estava ouvindo tudo
  { t: F13 + 0.2, render: (s, ls) => (
    <Cam ls={ls} de={1.08} ate={1.0} dur={4}>
      <Fundo nome="mercado" />
      <Svg cel="cel">
        <Talaricornio x={300 + 520 * lin(s, F13 + 2.4, I(14) - 0.2)} y={900} escala={0.9} t={s} olho={ls > 1.2 && ls < 2.1 ? "pisca" : "flerte"} brasinha passo={lin(s, F13 + 2.4, I(14)) * 8} />
      </Svg>
      <Svg>{Array.from({ length: 8 }, (_, i) => { const x = 280 + i * 70; return lin(s, F13 + 2.4, I(14) - 0.2) * 560 + 280 > x ? <g key={i} opacity={0.8}>{[0, 1, 2].map((k) => <circle key={k} cx={x + k * 8 - 8} cy={1000 + (i % 2) * 14 + k * 3} r={4} fill={ARCO[(i + k) % 7]} />)}</g> : null; })}</Svg>
      <Rotulo txt="ENQUANTO ISSO, ATRÁS DA BARRACA" y={52} />
    </Cam>
  ) },
  // acampamento: os cálculos do Lukita
  { t: I(14) - 0.2, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.04} dur={8}>
      <Fundo nome="acampamento" />
      <Luz x={640} y={780} r={420} cor="#ff7a2a" forca={0.25 + 0.06 * Math.sin(s * 11) * Math.sin(s * 5)} />
      <Quadro s={s} linhas={[
        { txt: "t(eclipse) = 23h47", t: W(14, "vinte") - 0.1 },
        { txt: "Δt(brilho) = 9 s", t: W(15, "apaga") - 0.1, cor: "#ffd16a" },
        { txt: "P(captura) = 0,003%", t: I(14) + 0.2, cor: "#8ad6ff" },
        { txt: "→ janela única: 9 s", t: I(16) + 0.2, cor: "#ff9ad0" },
      ]} />
      <Svg cel="celF"><Lukita x={300} y={1080} escala={1.05} expr="empolgado" pose="giz" formulaCerta /></Svg>
    </Cam>
  ) },
  { t: I(17) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.08} oy={380} dur={3.6}>
      <Fundo nome="acampamento" filtro="blur(4px)" />
      <Luz x={700} y={900} r={600} cor="#ff7a2a" forca={0.35} />
      <Svg cel="celF"><Victor x={540} y={1740} escala={2.1} expr="determinado" t={s} /></Svg>
    </Cam>
  ) },
  // as três regras
  { t: I(18) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.02} ate={1.0} dur={5}>
      <Fundo nome="acampamento" />
      <Luz x={640} y={780} r={420} cor="#ff7a2a" forca={0.28} />
      <Quadro s={s} linhas={[
        { txt: "3 REGRAS", t: I(18), cor: "#ffd16a" },
        { txt: "1. não olhar nos olhos", t: W(18, "Não") - 0.1 },
        { txt: "2. não elogiar a crina", t: I(19) },
        { txt: "3. NUNCA apresentar", t: W(20, "jamais,") - 0.1, cor: "#ff9ad0" },
        { txt: "    a namorada", t: W(20, "namorada.") - 0.3, cor: "#ff9ad0" },
      ]} />
      <Svg cel="celF"><Lukita x={300} y={1080} escala={1.05} expr="empolgado" pose="giz" formulaCerta /></Svg>
    </Cam>
  ) },
  { t: I(21) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={1.6}><Fundo nome="acampamento" filtro="blur(5px)" /><Svg cel="celF"><Victor x={540} y={1900} escala={2.4} expr="sombrio" t={s} /></Svg></Cam>
  ) },
  // o vendedor perde a namorada
  { t: I(22) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.04} dur={3}>
      <Fundo nome="acampamento" />
      <Svg cel="celF">
        <Talaricornio x={1300 - 1100 * lin(s, I(22) + 0.6, I(23) + 0.4)} y={760} escala={0.6} t={s} virar namorada passo={s} olho="pisca" />
        <Vendedor x={330} y={1100} escala={1.05} triste={s >= I(23) - 0.2} />
      </Svg>
    </Cam>
  ) },
  { t: I(24) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={2.2}><Fundo nome="acampamento" filtro="blur(5px)" /><Luz x={540} y={900} r={500} cor="#ff7a2a" forca={0.3} /><Svg cel="celF"><Ronaldo x={540} y={1940} escala={2.5} expr="apavorado" pose="cartas" /></Svg></Cam>
  ) },
  // o eclipse começa: o Talaricórnio, numa pedra flutuante sobre o abismo, atrai o Victor até a beira
  { t: F24 + 0.3, render: (s, ls) => {
    const anda = lin(s, I(25) - 0.3, F25 + 0.2);
    return (
      <Cam ls={ls} de={1} ate={1.1} ox={460} oy={760} dur={5}>
        <Fundo nome="eclipse" />
        <Svg>
          {/* aviso de abismo: a borda do penhasco destacada */}
          <path d="M432,898 C480,872 500,862 520,858" stroke="#ff5a3a" strokeWidth={6} fill="none" strokeDasharray="14 10" opacity={0.6 + 0.4 * Math.sin(s * 8)} />
          <g transform={`translate(230,${700 + 10 * Math.sin(s * 1.5)})`}>
            <path d="M-110,0 L110,0 L70,60 L20,110 L-30,90 L-80,50 Z" fill="#2a1838" stroke="#1a1220" strokeWidth={5} />
            <path d="M-110,0 L110,0" stroke="#ff9a6a" strokeWidth={4} />
          </g>
        </Svg>
        <Svg cel="cel">
          <Talaricornio x={170} y={700 + 10 * Math.sin(s * 1.5)} escala={0.6} t={s} olho="brilho" crina={lin(s, I(25) + 0.4, I(25) + 1.1)} />
          <Victor x={930 - 400 * anda} y={890 + 10 * anda} escala={0.75} expr="hipnotizado" virar t={s} />
        </Svg>
        <Svg style={{ mixBlendMode: "screen" }}>
          {[0, 1, 2, 3].map((k) => { const r = ((ls * 120 + k * 60) % 240); return <ellipse key={k} cx={300 + r * 1.6} cy={480 + r * 0.2} rx={20 + r * 0.25} ry={30 + r * 0.4} fill="none" stroke={ROSA} strokeWidth={5} opacity={1 - r / 240} />; })}
        </Svg>
      </Cam>
    );
  } },
  // a bota na borda: a pedra esfarela (e o Lukita em pânico no cantinho)
  { t: I(26) - 0.1, render: (s, ls) => (
    <AbsoluteFill>
      <Cam ls={ls} de={2.0} ate={2.2} ox={480} oy={980} dur={2}>
        <Fundo nome="eclipse" />
        <Svg cel="cel"><g transform={`translate(${5 * Math.sin(s * 30) * lin(ls, 0.5, 1.2)},0)`}><Victor x={500} y={872} escala={0.75} expr="hipnotizado" virar t={s} /></g></Svg>
        <Svg>
          {Array.from({ length: 7 }, (_, i) => { const t0 = 0.3 + i * 0.25; const tt = Math.max(0, ls - t0); return tt > 0 ? <rect key={i} x={440 + i * 6 - tt * 8} y={880 + 140 * tt * tt} width={5} height={5} fill="#5a4a5a" transform={`rotate(${tt * 300},${442 + i * 6},${882 + 140 * tt * tt})`} /> : null; })}
        </Svg>
      </Cam>
      <div style={{ position: "absolute", right: 50, top: 120, width: 260, height: 260, borderRadius: 130, overflow: "hidden", border: "6px solid #fff6ff", boxShadow: "0 10px 30px rgba(0,0,0,.6)", background: "#2a1838" }}>
        <svg width={260} height={260} viewBox="0 0 260 260"><Lukita x={130} y={720 + 10 * Math.sin(s * 25)} escala={0.75} expr="apavorado" pose="bracos" /></svg>
      </div>
    </AbsoluteFill>
  ) },
  // vertigem: olhando para baixo, as pedrinhas somem no abismo
  { t: F26 + 0.1, render: (s, ls) => (
    <AbsoluteFill style={{ background: "#12081c" }}>
      <Cam ls={ls} de={1} ate={1.25} dur={1.6}>
        <Svg>
          <defs><radialGradient id="abismo"><stop offset="0" stopColor="#ffd0a0" stopOpacity={1} /><stop offset="0.3" stopColor="#e2704a" stopOpacity={0.9} /><stop offset="0.7" stopColor="#5a2a5a" stopOpacity={1} /><stop offset="1" stopColor="#1a0c24" stopOpacity={1} /></radialGradient></defs>
          <rect x={0} y={0} width={1080} height={1080} fill="url(#abismo)" />
          {/* paredes de rocha fugindo para o fundo */}
          <path d="M0,0 L420,0 L500,460 L0,1080 Z" fill="#1c1228" stroke="#3a2a4a" strokeWidth={4} />
          <path d="M1080,0 L640,0 L580,460 L1080,1080 Z" fill="#241632" stroke="#3a2a4a" strokeWidth={4} />
          {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${420 - k * 90},${k * 120} L500,460 M${640 + k * 90},${k * 120} L580,460`} stroke="#3a2a4a" strokeWidth={3} />)}
          {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={540 + (k - 1.5) * 40} cy={470 + (k % 2) * 8} rx={60 - k * 8} ry={18 - k * 2} fill="#fff1e0" opacity={0.7} />)}
          {Array.from({ length: 6 }, (_, i) => { const tt = Math.max(0, ls - i * 0.12); const e = 1 / (1 + tt * 4); return <rect key={i} x={540 + (i - 3) * 60 * e} y={460 + (i % 2 ? 1 : -1) * 220 * e} width={40 * e} height={40 * e} fill="#3a2a4a" stroke="#ffcfa0" strokeWidth={2} />; })}
          <text x={540} y={150} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={44} fill="#fff6ff" letterSpacing="0.16em" stroke="#1a0c24" strokeWidth={8} paintOrder="stroke">↓ 3 KM DE QUEDA ↓</text>
        </Svg>
      </Cam>
    </AbsoluteFill>
  ) },
  // ele pisa no vazio
  { t: F26 + 1.5, render: (s, ls) => {
    const cai = Math.max(0, ls - 0.35);
    return (
      <Cam ls={ls} de={1.35} ate={1.45} ox={470} oy={760} dur={1.2} tremor={ls > 0.35 ? 8 : 0}>
        <Fundo nome="eclipse" />
        <Svg cel="cel">
          <g transform={`translate(0,${220 * cai * cai}) rotate(${-25 * Math.min(1, ls / 0.4) - 20 * cai},480,880)`}>
            <Victor x={470} y={880} escala={0.75} expr={ls > 0.4 ? "triste" : "hipnotizado"} virar t={s} />
          </g>
        </Svg>
        <Svg style={{ mixBlendMode: "screen", opacity: ls > 0.35 ? 1 : 0 }}><text x={700} y={360} fontFamily={SANS} fontWeight={900} fontSize={120} fill="#ff5a3a" transform="rotate(-8,700,360)">!!</text></Svg>
      </Cam>
    );
  } },
  // o Wan desce do dragão e agarra a capa no último segundo: o Victor pendurado sobre o abismo
  { t: I(27) - 0.5, render: (s, ls) => {
    const balanco = 8 * Math.sin(ls * 3.2) * Math.exp(-ls * 0.6);
    return (
      <Cam ls={ls} de={1.08} ate={1.0} dur={1.2} tremor={ls < 0.4 ? 16 : 0}>
        <AbsoluteFill style={{ transform: "translateY(-380px)" }}><Fundo nome="eclipse" /></AbsoluteFill>
        <AbsoluteFill style={{ top: 690, background: "linear-gradient(180deg, rgba(226,96,58,0) 0px, #b04a4a 40px, #5a2a5a 200px, #1a0c24 390px)" }} />
        <Svg><Dragao x={-200 + 1600 * lin(s, I(27) - 0.5, I(27) + 1.0)} y={180} escala={0.9} t={s} /></Svg>
        <Svg cel="cel">
          <WanHD x={680} y={510} escala={0.62} expr="serio" pose="bracos" luz={LUZ_POENTE} id="wv" piscar={pisca(s)} />
          <path d="M650,200 L560,320 L586,336 L672,220 Z" fill="#34363f" stroke="#5a3a2a" strokeWidth={3} />
          <circle cx={566} cy={332} r={16} fill="#f6d2b8" stroke="#5a3a2a" strokeWidth={3} />
          <g transform={`rotate(${balanco},566,332)`}>
            <path d="M556,330 C540,460 520,600 500,760 L440,760 C470,600 520,460 576,330 Z" fill="#1e1a26" stroke="#8f1d3a" strokeWidth={4} />
            <Victor x={470} y={1180} escala={0.75} expr="triste" t={s} />
          </g>
        </Svg>
        <Svg>{Array.from({ length: 4 }, (_, i) => { const tt = (ls * 0.8 + i / 4) % 1; return <rect key={i} x={430 + i * 40} y={520 + 560 * tt * tt} width={10} height={10} fill="#5a4a5a" opacity={1 - tt} />; })}</Svg>
      </Cam>
    );
  } },
  { t: I(28) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.06} dur={2}><Fundo nome="eclipse" filtro="blur(5px)" /><Svg><WanHD x={540} y={2560} escala={2.9} expr="serio" pose="bracos" luz={LUZ_POENTE} id="wc" piscar={pisca(s)} /></Svg></Cam>
  ) },
  // o Reteté
  { t: I(29) - 0.1, render: (s, ls) => {
    const d = Math.max(0, s - (I(29) + 0.8));
    const pulo = Math.abs(Math.sin(d * 7)) * 70, giro = Math.sin(d * 5) * 18;
    return (
      <Cam ls={ls} de={1} ate={1.05} dur={5}>
        <Fundo nome="eclipse" />
        <Aura x={380} y={620} s={s * 2} r={600} op={d > 0 ? 0.35 : 0} />
        <Svg cel="cel">
          <g transform={`translate(0,${-pulo}) rotate(${giro},380,980)`}><Ronaldo x={380} y={1040} escala={0.95} expr={d > 0 ? "orgulhoso" : "apavorado"} pose="cartas" virar={Math.sin(d * 3) > 0} /></g>
          <Talaricornio x={820} y={880} escala={0.75} t={s} olho={d > 0.6 ? "tonto" : "brilho"} virar />
        </Svg>
        {d > 0 ? <Svg>{Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${760 + 60 * Math.cos(d * 4 + i * 1.26)},${470 + 20 * Math.sin(d * 4 + i * 1.26)} l5,10 l11,2 l-8,8 l2,11 l-10,-5 l-10,5 l2,-11 l-8,-8 l11,-2 Z`} fill="#ffe36a" />)}</Svg> : null}
        {d > 0 ? <Svg><g transform={`translate(${380 + 200 * Math.sin(d * 2)},${300 - 120 * Math.abs(Math.sin(d * 3))}) rotate(${d * 300})`}><path d="M-50,0 C-50,-30 50,-30 50,0 C30,-6 -30,-6 -50,0 Z" fill="#2a2a3a" /></g></Svg> : null}
        <Rotulo txt="O RETETÉ" y={52} op={d > 0 ? 1 : 0} cor="#ffcf5a" />
      </Cam>
    );
  } },
  // revelação: a abertura volta com contexto
  { t: I(30) - 0.3, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.12} oy={420} dur={2.6}>
      <Fundo nome="eclipse" />
      <Aura x={540} y={470} s={s} r={700} op={0.3 + 0.5 * lin(s, I(30), F30 + 0.6)} />
      <Svg cel="cel"><Victor x={540} y={1980} escala={2.6} expr="determinado" t={s} /></Svg>
      <Escurece op={lin(s, F30 + 0.6, F30 + 1.1) * (1 - lin(s, F30 + 1.1, F30 + 1.5))} cor="#fff6ff" />
    </Cam>
  ) },
  // a transformação: armadura arco-íris
  { t: F30 + 1.1, render: (s, ls) => (
    <Cam ls={ls} de={1.15} ate={1} dur={1.2} tremor={12}>
      <Fundo nome="eclipse" />
      <Aura x={540} y={560} s={s * 2} r={900} op={0.7} />
      <Svg cel="cel"><VictorArmadura x={540} y={1060} escala={1.05} id="a1" /></Svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center", opacity: p(s, I(31) - 0.1, 0.3) }}>
        <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, backgroundImage: `linear-gradient(90deg, ${ARCO.join(",")})`, WebkitBackgroundClip: "text", color: "transparent", WebkitTextStroke: "2px #fff" }}>VICTOR ARCO-ÍRIS</span>
      </div>
    </Cam>
  ) },
  // frase de efeito: o Talaricórnio se apaixona pela armadura
  { t: F31 + 0.4, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.06} dur={3}>
      <Fundo nome="eclipse" />
      <Svg cel="cel">
        <VictorArmadura x={820} y={1020} escala={0.85} id="a2" pose="normal" />
        <Talaricornio x={330} y={880} escala={0.9} t={s} olho="coracao" />
        {s >= I(32) - 0.1 ? <Lukita x={120} y={1220} escala={0.55} expr="empolgado" pose="normal" formulaCerta /> : null}
      </Svg>
      <Svg>{Array.from({ length: 6 }, (_, i) => { const tt = (ls * 0.6 + i / 6) % 1; return <path key={i} d="M0,8 C-8,0 -18,-6 -12,-16 C-8,-22 0,-20 0,-14 C0,-20 8,-22 12,-16 C18,-6 8,0 0,8 Z" fill={ROSA} opacity={1 - tt} transform={`translate(${470 + i * 30 + 80 * tt},${470 - 300 * tt}) scale(${1.6 + tt})`} />; })}</Svg>
    </Cam>
  ) },
  // escolha (modelo saveo): o Wan apresenta as opções
  { t: I(33) - 0.2, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={2.4}><Fundo nome="eclipse" filtro="blur(5px)" /><Svg><WanHD x={540} y={2560} escala={2.9} expr="calmo" pose="bracos" luz={LUZ_POENTE} id="wd" piscar={pisca(s)} /></Svg></Cam>
  ) },
  { t: I(34) - 0.1, render: (s) => {
    const opt = (x: number, t0: number, titulo: string, l1: string, l2: string, ativo: boolean, cor: string, img: React.ReactNode) => (
      <div style={{ position: "absolute", left: x, top: 140, width: 440, opacity: p(s, t0 - 0.1, 0.25), transform: `translateY(${24 * (1 - p(s, t0 - 0.1, 0.35))}px) scale(${ativo ? 1 : 0.94})`, filter: ativo ? undefined : "brightness(.55)" }}>
        <div style={{ background: ativo ? cor : "#f4ecf8", borderRadius: 16, padding: "18px 20px 22px", textAlign: "center", boxShadow: "0 18px 40px rgba(0,0,0,.5)" }}>
          <svg width={300} height={300} viewBox="0 0 300 300" style={{ display: "block", margin: "0 auto" }}>{img}</svg>
          <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: ativo ? "#fff" : "#2a1626", lineHeight: 1, marginTop: 6 }}>{titulo}</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: ativo ? "#fff" : "#2a1626", marginTop: 10 }}>{l1}</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: ativo ? "rgba(255,255,255,.9)" : "rgba(42,22,38,.75)", marginTop: 4 }}>{l2}</div>
        </div>
      </div>
    );
    const segunda = s >= I(35) - 0.1;
    return (
      <AbsoluteFill>
        <Fundo nome="eclipse" filtro="blur(8px) brightness(.45)" />
        <Rotulo txt="O QUE O VICTOR FAZ?" y={70} cor="#ffcf5a" />
        {opt(70, I(34), "CAPTURAR", "fica com o unicórnio", "ninguém namora em paz", !segunda, "#9a4ad6", <g><Talaricornio x={110} y={290} escala={0.5} t={s} olho="coracao" /><rect x={20} y={40} width={260} height={250} rx={20} fill="none" stroke="#9ad6ff" strokeWidth={6} /></g>)}
        {opt(570, I(35), "LIBERTAR", "a Brasinha volta", "ele continua à solta", segunda, "#e2622a", <Brasinha x={150} y={190} t={s} escala={2} />)}
      </AbsoluteFill>
    );
  } },
  // tela final: comenta uma palavra
  { t: I(36) - 0.15, render: (s) => (
    <AbsoluteFill style={{ background: "#120a1c" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: "0.28em", color: "rgba(240,225,255,.6)" }}>COMENTA UMA PALAVRA</div>
      {([["CAPTURAR", "fica com o unicórnio", 150, "#c9a8ff"], ["LIBERTAR", "a Brasinha volta", 570, "#ff9a5a"]] as const).map(([t, sub, x, cor], i) => (
        <div key={t} style={{ position: "absolute", left: x, top: 160, width: 360, height: 500, borderRadius: 16, overflow: "hidden", boxShadow: "0 18px 40px rgba(0,0,0,.6)", opacity: p(s, I(36) + i * 0.25, 0.3) }}>
          <Img src={staticFile("img/victor1/eclipse.png")} style={{ position: "absolute", left: -360, top: -200, width: 1080, height: 1080 }} />
          <svg width={360} height={500} viewBox="0 0 360 500" style={{ position: "absolute", left: 0, top: 0 }}>
            {i === 0 ? <Talaricornio x={150} y={420} escala={0.62} t={s} olho="coracao" /> : <Brasinha x={180} y={300} t={s} escala={2.2} />}
          </svg>
          <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(10,4,16,.92) 0px, rgba(10,4,16,0) 220px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 24, textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 54, color: cor, lineHeight: 1 }}>{t}</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: "rgba(255,250,246,.75)", marginTop: 6 }}>{sub}</div>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 700, textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 44, color: "#fffaf6", opacity: p(s, I(38) - 0.1, 0.3) }}>
        A maioria escreve a <span style={{ color: "#ffcf5a" }}>Parte 2.</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 770, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 24, color: "rgba(240,225,255,.65)", opacity: p(s, I(37) - 0.1, 0.3) }}>
        marca aquele amigo talarico
      </div>
    </AbsoluteFill>
  ) },
  // cartela
  { t: DURACAO - 0.4, render: (s) => (
    <AbsoluteFill style={{ background: "#120a1c", opacity: p(s, DURACAO - 0.4, 0.4) }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 96, color: "#fff6ff", letterSpacing: "0.04em" }}>CONTINUA…</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 28, color: "#d9c8ff", marginTop: 14 }}>Victor e o Talaricórnio · tema Dragon Eclipse</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 620, textAlign: "center" }}>
        <Img src={staticFile("img/logo.webp")} style={{ width: 240 }} />
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 20, color: "rgba(240,225,255,.6)", marginTop: 20 }}>História de ficção da comunidade Elite Boardgamers</div>
      </div>
    </AbsoluteFill>
  ) },
];



// ---------------- cenas complementares: reações e pausas cômicas ----------------
const EXTRAS: Plano[] = [
  // close em câmera lenta: a crina e a piscadinha (o tema do Talaricórnio entra aqui)
  { t: F2 + 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.08} dur={1.6}>
      <Fundo nome="eclipse" filtro="blur(6px)" />
      <Aura x={540} y={480} s={s * 0.5} r={700} op={0.35} />
      <Svg cel="cel"><Talaricornio x={20} y={1353} escala={2.6} t={s} olho={ls > 1.0 ? "pisca" : "flerte"} crina={lin(s, F2 + 0.2, F2 + 1.0)} /></Svg>
      <Svg>{Array.from({ length: 9 }, (_, i) => { const a = i * 0.7 + ls * 2; return <path key={i} d="M0,-10 l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3 Z" fill="#fffaf0" opacity={0.5 + 0.5 * Math.sin(ls * 9 + i)} transform={`translate(${380 + 260 * Math.cos(a)},${360 + 140 * Math.sin(a)}) scale(${1.4 + (i % 3) * 0.5})`} />; })}</Svg>
    </Cam>
  ) },
  // o mercado e a apresentação congelada do Victor
  { t: T_MERCADO, render: (s, ls) => {
    const congela = ls > 0.8;
    return (
      <AbsoluteFill style={{ filter: congela ? "grayscale(.7) contrast(1.1)" : undefined }}>
        <Cam ls={congela ? 0.8 : ls} de={1.08} ate={1.0} dur={0.8}>
          <Fundo nome="mercado" />
          <Svg cel="cel">
            <Victor x={700} y={1030} escala={0.95} expr="sombrio" pose="normal" virar t={s} />
            <g transform="translate(470,820)"><path d="M-60,0 L60,0 L50,-120 C40,-170 -40,-170 -50,-120 Z" fill="rgba(200,230,255,.35)" stroke="#2a1626" strokeWidth={4} /></g>
          </Svg>
        </Cam>
        {congela ? (
          <div style={{ position: "absolute", left: 90, top: 200, transform: `rotate(-3deg) scale(${1.15 - 0.15 * p(ls, 0.8, 0.25)})`, background: "#fff6ff", padding: "18px 26px", borderRadius: 8, boxShadow: "10px 10px 0 #9a4ad6" }}>
            <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: "#1a1020", lineHeight: 1 }}>VICTOR</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: "#5a3a6a", marginTop: 6 }}>vampiro · 112 anos · nunca dormiu</div>
          </div>
        ) : null}
      </AbsoluteFill>
    );
  } },
  // reação: "você tem é olheira" → close seco do Victor, grilos
  { t: F6 + 0.05, render: (s, ls) => (
    <Cam ls={ls} de={1.0} ate={1.3} oy={300} dur={0.25}>
      <Fundo nome="mercado" filtro="blur(8px) brightness(.8)" />
      <Svg cel="cel"><Victor x={540} y={1900} escala={2.4} expr="sombrio" t={s} /></Svg>
      <Rotulo txt="…" y={60} />
    </Cam>
  ) },
  // "mais branco que papel de pão": a comparação científica
  { t: F7 + 0.05, render: (s, ls) => (
    <AbsoluteFill style={{ background: "#efe2c8" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: 1080, overflow: "hidden", borderRight: "8px solid #1a1020" }}>
        <Fundo nome="mercado" filtro="blur(8px)" />
        <svg width={1080} height={1080} style={{ position: "absolute", left: -270, top: 0, overflow: "visible" }}><g filter="url(#cel)"><Victor x={540} y={2134} escala={2.4} expr="sombrio" t={s} /></g></svg>
      </div>
      <Svg>
        <g transform={`translate(810,520) rotate(${4 * Math.sin(ls * 3)}) scale(${1 + 0.1 * Math.exp(-ls * 6)})`}>
          <path d="M-120,-200 L120,-200 L130,200 L-130,200 Z" fill="#efe6e3" stroke="#2a1626" strokeWidth={6} />
          <path d="M-120,-200 l24,-24 l24,24 l24,-24 l24,24 l24,-24 l24,24 l24,-24 l24,24 l24,-24 l24,24" fill="#efe6e3" stroke="#2a1626" strokeWidth={6} />
          <text x={0} y={30} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={70} fill="#c43b2f">PÃO</text>
        </g>
      </Svg>
      <Rotulo txt="COMPARAÇÃO CIENTÍFICA" y={60} cor="#1a1020" />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 40, color: "#c43b2f", opacity: p(ls, 0.8, 0.2) }}>IDÊNTICOS</div>
    </AbsoluteFill>
  ) },
  // a lágrima de purpurina em close
  { t: F12 + 0.05, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.1} dur={1.6}>
      <Fundo nome="mercado" filtro="blur(10px) brightness(.7)" />
      <Svg cel="cel"><Victor x={635} y={2832} escala={3.4} expr="triste" t={s} /></Svg>
    </Cam>
  ) },
  // o brilho dos óculos do Lukita
  { t: F16 + 0.05, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={0.9}>
      <Fundo nome="acampamento" filtro="blur(6px)" />
      <Svg cel="celF"><Lukita x={540} y={1960} escala={2.5} expr="empolgado" pose="normal" formulaCerta /></Svg>
      <Svg style={{ mixBlendMode: "screen" }}><g transform={`translate(640,250) rotate(${ls * 200}) scale(${2.5 * Math.sin(Math.min(1, ls / 0.6) * Math.PI)})`}><path d="M0,-40 L6,-6 L40,0 L6,6 L0,40 L-6,6 L-40,0 L-6,-6 Z" fill="#fffaf0" /></g></Svg>
    </Cam>
  ) },
  // a namorada do vendedor passa montada no Talaricórnio (em primeiro plano)
  { t: F22 + 0.05, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.03} dur={2.4}>
      <Fundo nome="acampamento" />
      <Svg cel="celF">
        <Vendedor x={190} y={800} escala={0.5} />
        <Talaricornio x={1500 - 2000 * lin(s, F22 + 0.1, I(23) - 0.2)} y={1040} escala={1.15} t={s} virar namorada passo={s} olho={ls > 0.9 && ls < 1.5 ? "pisca" : "flerte"} crina={lin(s, F22 + 0.8, F22 + 1.4)} />
      </Svg>
    </Cam>
  ) },
  // "…Tinha." close do vendedor, trombone triste
  { t: I(23) - 0.15, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.12} dur={2.2}>
      <Fundo nome="acampamento" filtro="blur(6px) saturate(.4) brightness(.7)" />
      <Svg cel="celF"><Vendedor x={540} y={1988} escala={2.3} triste /></Svg>
    </Cam>
  ) },
  // depois do "a fim de você": a viseira suando, disco arranhado
  { t: F32 + 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.25} ate={1.3} dur={2}>
      <Fundo nome="eclipse" filtro="blur(6px)" />
      <Svg cel="cel"><VictorArmadura x={540} y={2134} escala={2.4} id="a3" pose="normal" /></Svg>
      <Svg><path d={`M700,${250 + 120 * lin(ls, 0.5, 2.4)} c-14,22 -14,38 0,40 c14,-2 14,-18 0,-40 Z`} fill="#9ad6ff" stroke="#1a1020" strokeWidth={3} opacity={ls > 0.5 ? 1 : 0} /></Svg>
    </Cam>
  ) },
];

// ---------------- mixagem ----------------
const falando = (t: number) => FALAS.some((f) => t >= f.inicio - 0.05 && t < f.inicio + f.dur + 0.1);
type Trilha = { f: string; de: number; ate: number; v: number; duck: number };
const TRILHAS: Trilha[] = [
  { f: "m-eclipse", de: 0, ate: T_MERCADO, v: 0.5, duck: 0.4 },
  { f: "m-talarico", de: F2 + 0.05, ate: I(3) - 0.05, v: 0.6, duck: 0.5 },
  { f: "m-mercado", de: T_MERCADO, ate: I(9) - 0.4, v: 0.32, duck: 0.45 },
  { f: "m-lembranca", de: I(9) - 0.4, ate: I(13) - 0.3, v: 0.4, duck: 0.5 },
  { f: "m-talarico", de: W(11, "jogar") - 0.2, ate: I(12) - 0.1, v: 0.45, duck: 0.5 },
  { f: "m-eclipse", de: I(13) - 0.3, ate: F13 + 0.2, v: 0.45, duck: 0.5 },
  { f: "m-talarico", de: F13 + 0.2, ate: I(14) - 0.2, v: 0.6, duck: 0.5 },
  { f: "m-acampamento", de: I(14) - 0.2, ate: F24 + 0.3, v: 0.3, duck: 0.45 },
  { f: "m-talarico", de: F22 + 0.05, ate: I(23) - 0.15, v: 0.6, duck: 0.5 },
  { f: "m-eclipse", de: F24 + 0.3, ate: I(29) + 0.75, v: 0.35, duck: 0.5 },
  { f: "m-retete", de: I(29) + 0.75, ate: I(30) - 0.3, v: 0.7, duck: 0.6 },
  { f: "m-eclipse", de: I(30) - 0.3, ate: F30 + 1.05, v: 0.5, duck: 0.5 },
  { f: "m-transformacao", de: F30 + 1.05, ate: F31 + 0.35, v: 0.6, duck: 0.5 },
  { f: "m-talarico", de: F31 + 0.4, ate: F32 + 0.1, v: 0.55, duck: 0.45 },
  { f: "m-decisao", de: I(33) - 0.2, ate: FIM_VICTOR1 - 0.1, v: 0.35, duck: 0.45 },
];
type Efeito = { f: string; t: number; v: number; d?: number };
const EFEITOS: Efeito[] = [
  { f: "vento", t: 0, v: 0.35, d: 6 },
  { f: "brilho-crina", t: I(2) + 0.3, v: 0.5 },
  { f: "estrela", t: I(2) + 0.85, v: 0.6 },
  { f: "brilho-crina", t: F2 + 0.2, v: 0.6 },
  { f: "relincho", t: F2 + 1.0, v: 0.55 },
  { f: "sfx/impact-bass-1.mp3", t: I(3) + 0.4, v: 0.45, d: 1.6 },
  { f: "rebobinar", t: I(3) + 1.3, v: 0.5 },
  { f: "mercado", t: T_MERCADO, v: 0.35, d: 6 },
  { f: "disco-arranhado", t: T_MERCADO + 0.8, v: 0.55 },
  { f: "grilos", t: F6 + 0.1, v: 0.6 },
  { f: "boing", t: F7 + 0.35, v: 0.55 },
  { f: "estrela", t: F7 + 0.85, v: 0.6 },
  { f: "lagrima", t: I(12) + 0.6, v: 0.5 },
  { f: "lagrima", t: F12 + 0.15, v: 0.6 },
  { f: "brilho-crina", t: W(11, "jogar"), v: 0.55 },
  { f: "cascos", t: W(11, "e") + 0.2, v: 0.4 },
  { f: "sino-ironia", t: F13 + 0.15, v: 0.4 },
  { f: "estrela", t: F13 + 1.4, v: 0.6 },
  { f: "relincho", t: F13 + 2.0, v: 0.45 },
  { f: "cascos", t: F13 + 2.4, v: 0.4 },
  { f: "fogueira", t: I(14) - 0.2, v: 0.35, d: 6 },
  { f: "fogueira", t: I(14) + 5.8, v: 0.3, d: 6 },
  { f: "calculadora", t: I(14) + 0.1, v: 0.45 },
  { f: "giz", t: W(14, "vinte") - 0.1, v: 0.45 },
  { f: "giz", t: W(15, "apaga") - 0.1, v: 0.45 },
  { f: "giz", t: I(16) + 0.2, v: 0.45 },
  { f: "estrela", t: F16 + 0.2, v: 0.7 },
  { f: "giz", t: W(18, "Não") - 0.1, v: 0.4 },
  { f: "giz", t: I(19), v: 0.4 },
  { f: "giz", t: W(20, "jamais,") - 0.1, v: 0.4 },
  { f: "grilos", t: F21 + 0.1, v: 0.35 },
  { f: "cascos", t: F22 + 0.2, v: 0.55 },
  { f: "relincho", t: F22 + 0.9, v: 0.5 },
  { f: "trombone-triste", t: F23 + 0.1, v: 0.55 },
  { f: "vento", t: F24 + 0.3, v: 0.4, d: 6 },
  { f: "hipnose", t: I(25) - 0.6, v: 0.55 },
  { f: "sino-ironia", t: I(26) - 0.1, v: 0.35 },
  { f: "pedras", t: I(26) + 0.25, v: 0.6 },
  { f: "susto", t: F26 + 0.05, v: 0.5 },
  { f: "eco-pedra", t: F26 + 0.15, v: 0.6 },
  { f: "queda", t: F26 + 1.85, v: 0.6 },
  { f: "dragao", t: I(27) - 0.7, v: 0.6 },
  { f: "agarra", t: I(27) - 0.45, v: 0.7 },
  { f: "sfx/impact-bass-1.mp3", t: I(27) - 0.45, v: 0.4, d: 1.6 },
  { f: "boing", t: I(29) + 1.2, v: 0.45 },
  { f: "boing", t: I(29) + 2.3, v: 0.45 },
  { f: "boing", t: I(29) + 3.6, v: 0.45 },
  { f: "tontura", t: I(29) + 2.6, v: 0.5 },
  { f: "power-up", t: F30 + 0.4, v: 0.6 },
  { f: "sfx/impact-bass-1.mp3", t: F30 + 1.05, v: 0.5, d: 1.6 },
  { f: "coracao", t: F31 + 0.5, v: 0.6 },
  { f: "disco-arranhado", t: F32 + 0.1, v: 0.6 },
  { f: "gole", t: F32 + 0.9, v: 0.7 },
  { f: "sfx/pop.mp3", t: I(34) - 0.1, v: 0.3, d: 0.5 },
  { f: "sfx/pop.mp3", t: I(35) - 0.1, v: 0.3, d: 0.5 },
  { f: "sfx/sparkle.mp3", t: I(36) - 0.1, v: 0.3, d: 1.6 },
];

const TODOS = [...PLANOS, ...EXTRAS].sort((a, b) => a.t - b.t);

export const Victor1: React.FC<{ mudo?: boolean }> = ({ mudo = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  let k = 0;
  TODOS.forEach((pl, i) => { if (s >= pl.t) k = i; });
  const pl = TODOS[k];
  const ls = s - pl.t;
  const final = s >= I(36) - 0.15;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <FiltroCel id="cel" luz="#ffb37a" lado={-1} />
      <FiltroCel id="celF" luz="#ff9a4a" lado={-1} />
      <AbsoluteFill>{pl.render(s, ls)}</AbsoluteFill>
      {!final ? <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(8,4,14,.78) 0px, rgba(8,4,14,.55) 150px, rgba(8,4,14,0) 300px)", pointerEvents: "none" }} /> : null}
      {!final ? <Legenda s={s} /> : null}
      {!final && s > I(4) - 0.2 ? <div style={{ position: "absolute", left: 0, right: 0, bottom: 22, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 16, letterSpacing: "0.3em", color: "rgba(255,240,255,.45)" }}>VICTOR E O TALARICÓRNIO</div> : null}
      <Papel forca={0.08} />
      <PoeiraLuz s={s} n={18} caixa={[0, 0, 1080, 1080]} cor="#ffe6ff" />

      {/* ===================== áudio: trilha por clima + efeitos no tempo da piada ===================== */}
      {!mudo ? (<>
      {TRILHAS.map((m, i) => (
        <Sequence key={`m${i}`} from={Math.round(m.de * fps)} durationInFrames={Math.round((m.ate - m.de) * fps)} layout="none">
          <Audio src={staticFile(`audio/victor1/${m.f}.mp3`)} volume={(f) => { const t = f / fps, d = m.ate - m.de; return m.v * Math.min(1, t / 0.25) * Math.min(1, (d - t) / 0.6) * (falando(m.de + t) ? m.duck : 1); }} />
        </Sequence>
      ))}
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {EFEITOS.map((e, i) => (
        <Sequence key={`e${i}`} from={Math.max(0, Math.round(e.t * fps))} durationInFrames={Math.round((e.d ?? 3) * fps)} layout="none">
          <Audio src={staticFile(e.f.startsWith("sfx/") ? e.f : `audio/victor1/s-${e.f}.mp3`)} volume={e.v} />
        </Sequence>
      ))}
      </>) : null}
    </AbsoluteFill>
  );
};

// marcos usados para dividir o episódio em duas partes (Partes.tsx)
export const CORTE_PARTE1 = I(27) - 0.6; // o Victor acabou de pisar no vazio (antes do resgate)
export const INICIO_PARTE2 = I(25) - 0.7; // a hipnose: "Que crina… maravilhosa…"
