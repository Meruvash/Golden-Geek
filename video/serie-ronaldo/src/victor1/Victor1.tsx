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
const F13 = fimFala(13), F24 = fimFala(24), F30 = fimFala(30), F31 = fimFala(31);

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
  // o eclipse começa: hipnose
  { t: F24 + 0.3, render: (s, ls) => {
    const anda = lin(s, I(25), I(26) + 1.5);
    return (
      <Cam ls={ls} de={1} ate={1.08} ox={700} oy={700} dur={5}>
        <Fundo nome="eclipse" />
        <Svg cel="cel">
          <Talaricornio x={560} y={870} escala={0.9} t={s} olho="brilho" />
          <Victor x={940 - 170 * anda} y={1000} escala={0.95} expr="hipnotizado" virar t={s} />
          {s >= I(26) - 0.1 ? <Lukita x={300} y={1180} escala={0.6} expr="apavorado" pose="bracos" /> : null}
        </Svg>
        <Svg style={{ mixBlendMode: "screen" }}><circle cx={765} cy={510} r={60 + 20 * Math.sin(s * 8)} fill={ROSA} opacity={0.25} /></Svg>
      </Cam>
    );
  } },
  // o Wan pula do dragão e segura o Victor pela capa
  { t: I(27) - 0.2, render: (s, ls) => {
    const voo = lin(s, I(27) - 0.2, I(27) + 0.9);
    return (
      <Cam ls={ls} de={1.04} ate={1} dur={2} tremor={s > I(27) + 0.9 ? 10 : 0}>
        <Fundo nome="eclipse" />
        <Svg><Dragao x={-300 + 1500 * voo} y={300 - 80 * voo} escala={1.1} t={s} /></Svg>
        <Svg cel="cel">
          <Victor x={560} y={1020} escala={0.95} expr="hipnotizado" virar t={s} />
          <g transform={`translate(${-260 * (1 - voo)},${-500 * (1 - voo)})`}><WanHD x={780} y={1030} escala={0.92} expr="serio" pose="bracos" luz={LUZ_POENTE} id="wv" piscar={pisca(s)} /></g>
        </Svg>
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


export const Victor1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  let k = 0;
  PLANOS.forEach((pl, i) => { if (s >= pl.t) k = i; });
  const pl = PLANOS[k];
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

      {/* ===================== áudio ===================== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.8, I(4) - 0.5, I(4), I(29) + 0.6, I(29) + 0.9, I(30) - 0.5, I(30), FIM_VICTOR1 - 1.4, FIM_VICTOR1 - 0.1], [0, 0.06, 0.06, 0.04, 0.04, 0.16, 0.16, 0.0, 0.05, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[I(3) + 0.4, F30 + 1.0, I(27) + 0.85].map((t, i) => (
        <Sequence key={`i${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.4} /></Sequence>
      ))}
      {[I(3) - 0.6, F30 + 0.2].map((t, i) => (
        <Sequence key={`r${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} volume={0.25} /></Sequence>
      ))}
      {[I(2) + 0.85, W(11, "crina…"), F13 + 1.2, I(22) + 1.4, F31 + 0.6].map((t, i) => (
        <Sequence key={`s${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.3} /></Sequence>
      ))}
      {[I(3) + 1.2, I(4) - 0.2, I(9) - 0.4, I(14) - 0.3, F24 + 0.2, I(27) - 0.3, I(33) - 0.3].map((t, i) => (
        <Sequence key={`w${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(0.7 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.22} /></Sequence>
      ))}
      {Array.from({ length: 10 }, (_, i) => I(29) + 1.0 + i * 0.42).map((t, i) => (
        <Sequence key={`p${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(0.4 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.2} /></Sequence>
      ))}
    </AbsoluteFill>
  );
};
