import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { LUZ_LAMPIAO, LUZ_LUA, WanHD } from "../personagens/WanHD";
import { Carta, F, Fumaca, MADEIRA, Papel, RYE, Silhueta, Trem } from "../colt/faroeste";
import { FlareLente, PoeiraLuz } from "../colt/luz";
import { fontesProntas } from "../tema";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "O Assalto do Wan", Parte 1 (v2) — 1080x1080, no molde ASSISTIDO do @saveo.house (ROTEIRO_REFERENCIAS.md §4d):
// 2ª pessoa, painel de estado fixo, um plano a cada ~2,5 s, "o que você não sabe", cartão "isso é real",
// escolha com preço escrito e "a maioria escreve a Parte 2". Roteiro aprovado: video/roteiros/assalto-do-wan-p1-v2.md.
// Tudo desenhado em código: cenários pintados (arte/cenas_wan1.py, claude-drawing) + Wan 35_shinkai (WanHD).
void fontesProntas;
export const FIM_WAN1 = DURACAO + 3.4;

const SANS = "Public Sans";
const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const p = (s: number, t0: number, d: number, e = ENTRA) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const lin = (s: number, t0: number, t1: number) => interpolate(s, [t0, t1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const OURO = "#ffcf5a";
const pisca = (s: number) => (s + 0.9) % 3.5 < 0.13; // piscada curta a cada 3,5 s
const ESCURO = "#120c0a";

// ---------------------------------------------------------------- peças
const Fundo: React.FC<{ nome: string; filtro?: string }> = ({ nome, filtro }) => (
  <Img src={staticFile(`img/wan1/${nome}.png`)} style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1080, filter: filtro }} />
);

// Câmera do plano: empurra devagar (ou abre), com tremor opcional. ls = tempo local do plano.
const Cam: React.FC<{ ls: number; de?: number; ate?: number; ox?: number; oy?: number; dur?: number; tremor?: number; children: React.ReactNode }> = ({ ls, de = 1, ate = 1.07, ox = 540, oy = 540, dur = 3, tremor = 0, children }) => {
  const z = de + (ate - de) * Easing.out(Easing.quad)(Math.min(1, ls / dur));
  const tx = tremor ? Math.sin(ls * 71) * tremor * Math.exp(-ls * 5) : 0;
  const ty = tremor ? Math.cos(ls * 53) * tremor * Math.exp(-ls * 5) : 0;
  return <AbsoluteFill style={{ transform: `translate(${tx}px,${ty}px) scale(${z})`, transformOrigin: `${ox}px ${oy}px` }}>{children}</AbsoluteFill>;
};

const Svg: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", ...style }}>{children}</svg>
);

// Você: bandido de costas (chapéu e ombros), com luz de borda.
const Voce: React.FC<{ x: number; y: number; esc?: number; borda?: string }> = ({ x, y, esc = 1, borda = "#ffcf8a" }) => {
  const d = "M-170,0 C-170,-120 -120,-170 -60,-180 L-40,-220 C-40,-240 40,-240 40,-220 L60,-180 C120,-170 170,-120 170,0 Z";
  const chapeu = "M-120,-262 C-120,-250 120,-250 120,-262 C120,-278 60,-280 52,-282 C50,-330 -50,-330 -52,-282 C-60,-280 -120,-278 -120,-262 Z";
  return (
    <g transform={`translate(${x},${y}) scale(${esc})`}>
      <g transform="translate(-5,-4)"><path d={d} fill={borda} /><path d={chapeu} fill={borda} /><circle cx={0} cy={-240} r={44} fill={borda} /></g>
      <path d={d} fill={ESCURO} /><circle cx={0} cy={-240} r={44} fill={ESCURO} /><path d={chapeu} fill={ESCURO} />
      <path d="M-60,-186 L0,-150 L60,-186" stroke="#8f1d25" strokeWidth={14} fill="none" />
    </g>
  );
};

// Caolho: silhueta do rival com luz de borda e tapa-olho.
const Caolho: React.FC<{ x: number; y: number; esc?: number; borda?: string; arma?: boolean }> = ({ x, y, esc = 1, borda = "#b9cbff", arma }) => (
  <g>
    <g transform="translate(-6,-4)"><Silhueta x={x} y={y} esc={esc} c={borda} /></g>
    <Silhueta x={x} y={y} esc={esc} c={ESCURO} />
    <g transform={`translate(${x},${y}) scale(${esc})`}>
      <path d="M-46,-226 L44,-196" stroke="#2a1d14" strokeWidth={6} />
      <ellipse cx={14} cy={-208} rx={16} ry={12} fill="#2a1d14" />
      {arma ? <g transform="translate(40,-120) rotate(-12)"><rect x={0} y={-10} width={120} height={22} rx={4} fill={ESCURO} /><rect x={0} y={-10} width={120} height={4} fill={borda} /><rect x={-6} y={4} width={26} height={46} rx={6} fill={ESCURO} /></g> : null}
    </g>
  </g>
);

const Joia: React.FC<{ x: number; y: number; esc?: number; giro?: number; brilho?: number }> = ({ x, y, esc = 1, giro = 0, brilho = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${esc})`}>
    <circle r={90} fill="#ffe7a0" opacity={0.25 * brilho} />
    <path d="M-50,-16 L-28,-42 H28 L50,-16 L0,46 Z" fill="#c43b7a" stroke={F.tinta} strokeWidth={5} strokeLinejoin="round" />
    <path d="M-50,-16 H50 M-28,-42 L-14,-16 L0,46 L14,-16 L28,-42 M-14,-16 L0,-42 L14,-16" stroke={F.tinta} strokeWidth={3} fill="none" />
    <path d="M-36,-20 L-24,-36 H-6 L-14,-20 Z" fill="#ffd1e6" opacity={0.85} />
    <path d="M60,-60 l6,16 l16,6 l-16,6 l-6,16 l-6,-16 l-16,-6 l16,-6 Z" fill="#fffaf0" opacity={brilho} />
  </g>
);

const Maleta: React.FC<{ x: number; y: number; esc?: number; borda?: string }> = ({ x, y, esc = 1, borda = "#b9cbff" }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <rect x={-70} y={-48} width={140} height={96} rx={10} fill="#6b4a2f" stroke={F.tinta} strokeWidth={6} />
    <rect x={-70} y={-48} width={140} height={14} rx={6} fill={borda} opacity={0.55} />
    <path d="M-26,-48 v-20 h52 v20" stroke={F.tinta} strokeWidth={8} fill="none" />
    <rect x={-12} y={-12} width={24} height={20} rx={3} fill={F.ocre} stroke={F.tinta} strokeWidth={3} />
    <path d="M-70,0 H70" stroke={F.tinta} strokeWidth={4} />
  </g>
);

const Punho: React.FC<{ x: number; y: number; esc: number }> = ({ x, y, esc }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <path d="M-110,40 C-120,-40 -80,-90 -10,-90 C70,-90 110,-50 110,10 C110,70 70,100 0,100 C-60,100 -100,80 -110,40 Z" fill="#2b1d14" stroke="#0a0605" strokeWidth={8} />
    {[-60, -15, 30, 75].map((x0) => <path key={x0} d={`M${x0},-86 C${x0 - 10},-40 ${x0 - 10},-10 ${x0},10`} stroke="#0a0605" strokeWidth={6} fill="none" />)}
    <path d="M-100,-20 C-60,-70 0,-82 60,-74" stroke="#ffcf8a" strokeWidth={6} fill="none" opacity={0.7} />
  </g>
);

// ---------------------------------------------------------------- interface (molde do @saveo.house)
type Estado = { saque: number; balas: number; rodada: number };
const estado = (s: number): Estado => ({
  saque: s >= W(10, "cai.") ? 0 : s >= W(8, "joia.") ? 500 : 0,
  balas: 0,
  rodada: s >= W(15, "três.") ? 3 : 1,
});

const Painel: React.FC<{ s: number; op: number }> = ({ s, op }) => {
  const e = estado(s);
  const flashSaque = Math.max(1 - lin(s, W(8, "joia."), W(8, "joia.") + 0.8), s >= W(10, "cai.") ? 1 - lin(s, W(10, "cai."), W(10, "cai.") + 1) : 0);
  const caiu = s >= W(10, "cai.") && s < W(10, "cai.") + 1.4;
  const flashRod = s >= W(15, "três.") ? 1 - lin(s, W(15, "três."), W(15, "três.") + 1) : 0;
  const caixa = (rot: string, val: string, cor: string, flash: number, w: number) => (
    <div style={{ width: w, background: "rgba(14,9,8,.78)", border: `2px solid rgba(243,230,200,${0.18 + flash * 0.6})`, borderRadius: 10, padding: "8px 14px", boxShadow: flash ? `0 0 ${24 * flash}px ${cor}` : undefined }}>
      <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 15, letterSpacing: "0.16em", color: "rgba(243,230,200,.6)" }}>{rot}</div>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 30, color: cor, lineHeight: 1.15 }}>{val}</div>
    </div>
  );
  return (
    <div style={{ position: "absolute", left: 40, top: 34, display: "flex", gap: 12, opacity: op }}>
      {caixa("SAQUE", `$${e.saque}`, caiu ? "#ff5a5a" : F.papel, flashSaque, 200)}
      {caixa("BALAS NO BARALHO", `${e.balas}`, F.papel, 0, 250)}
      {caixa("RODADA", `${e.rodada} / 5`, flashRod ? OURO : F.papel, flashRod, 150)}
    </div>
  );
};

// Rótulo pequeno espaçado (como "THE FIXER", "5:40 AM" na referência).
const Rotulo: React.FC<{ txt: string; x?: number; y?: number; op?: number; cor?: string; centro?: boolean }> = ({ txt, x = 44, y = 128, op = 1, cor = F.papel, centro }) => (
  <div style={{ position: "absolute", left: centro ? 0 : x, right: centro ? 0 : undefined, top: y, textAlign: centro ? "center" : "left", opacity: op }}>
    <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: "0.22em", color: cor, background: "rgba(14,9,8,.7)", padding: "6px 12px", borderRadius: 6 }}>{txt}</span>
  </div>
);

// Legenda palavra por palavra: blocos de até 4 palavras, palavra dita em branco, seguintes em cinza.
const Legenda: React.FC<{ s: number; y?: number }> = ({ s, y = 850 }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.3);
  if (!f) return null;
  const blocos: number[][] = [];
  let atual: number[] = [];
  f.palavras.forEach((w, i) => {
    atual.push(i);
    if (atual.length >= 4 || /[.,?!…:]$/.test(w.w)) { blocos.push(atual); atual = []; }
  });
  if (atual.length) blocos.push(atual);
  const k = Math.max(0, f.palavras.filter((w) => s >= w.t).length - 1);
  const bloco = blocos.find((b) => b.includes(k)) ?? blocos[0];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: y, textAlign: "center" }}>
      {f.quem === "wan" ? <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: "0.22em", color: OURO, marginBottom: 6 }}>WAN</div> : null}
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 58, lineHeight: 1.1, letterSpacing: "-0.01em", textShadow: "0 3px 0 rgba(0,0,0,.85), 0 0 24px rgba(0,0,0,.7)" }}>
        {bloco.map((i) => <span key={i} style={{ color: i <= k ? "#fffaf0" : "rgba(255,250,240,.38)" }}>{f.palavras[i].w} </span>)}
      </div>
    </div>
  );
};

const Escurece: React.FC<{ op: number; cor?: string }> = ({ op, cor = "#000" }) => <AbsoluteFill style={{ background: cor, opacity: op, pointerEvents: "none" }} />;
const LuzQuente: React.FC<{ x: number; y: number; r: number; s: number; cor?: string; forca?: number }> = ({ x, y, r, s, cor = "#ffb45a", forca = 0.35 }) => (
  <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none", opacity: forca * (0.9 + 0.1 * Math.sin(s * 13) * Math.sin(s * 7.3)), background: `radial-gradient(circle at ${x}px ${y}px, ${cor} 0px, ${cor}00 ${r}px)` }} />
);

// ---------------------------------------------------------------- planos
type Plano = { t: number; render: (s: number, ls: number) => React.ReactNode; hud?: boolean };

const pilhaMesa = (s: number, ls: number, cartas: { a: Parameters<typeof Carta>[0]["a"]; t: number; vira?: number; virada?: boolean }[]) => (
  <Svg>
    {cartas.map((c, i) => {
      const ent = p(s, c.t, 0.35);
      const ang = (i * 97) % 360;
      const dx = Math.cos((ang * Math.PI) / 180) * 700 * (1 - ent), dy = Math.sin((ang * Math.PI) / 180) * 700 * (1 - ent);
      const vir = c.vira !== undefined ? p(s, c.vira, 0.4) : c.virada ? 0 : 0;
      return ent > 0 ? <Carta key={i} x={540 + (i - (cartas.length - 1) / 2) * (c.vira !== undefined ? 150 : 14) + dx} y={500 + (i % 2) * 10 + dy} a={c.a} esc={1.45} giro={-8 + ((i * 37) % 17)} virando={c.vira !== undefined ? vir : 0} /> : null;
    })}
  </Svg>
);

const PLANOS: Plano[] = [
  // 1 · gancho: farol vindo pela noite + título em 2 cores
  { t: 0, render: (s, ls) => (
    <>
      <Cam ls={ls} de={1.05} ate={1.18} oy={560} dur={3.6}><Fundo nome="deserto" />
        <Svg><Fumaca x={660} y={560} s={s} esc={0.5} />
          <g transform={`translate(640,${640 + 40 * p(s, 0, 3)}) scale(${0.25 + 0.5 * lin(s, 0, 3.5)})`}>
            <rect x={-70} y={-150} width={140} height={150} rx={20} fill={F.tinta} /><rect x={-50} y={-210} width={36} height={70} fill={F.tinta} />
            <circle cx={0} cy={-90} r={42} fill="#3a2a1f" /><circle cx={0} cy={-90} r={26} fill="#fff4d8" /><path d="M-80,0 L0,-40 L80,0 Z" fill={F.vermelho} />
          </g>
        </Svg>
      </Cam>
      <FlareLente x={640} y={600 - 20 * lin(s, 0, 3)} s={s} forca={0.5 + 0.4 * lin(s, 0, 3.5)} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,6,14,.75) 0px, rgba(10,6,14,0) 420px)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", opacity: p(s, W(1, "Só") - 0.1, 0.3), transform: `scale(${1.1 - 0.1 * p(s, W(1, "Só") - 0.1, 0.4)})` }}>
        <div style={{ fontFamily: MADEIRA, fontSize: 104, lineHeight: 1, color: F.papel, textShadow: `6px 6px 0 ${F.vermelho}` }}>SÓ UM DESCE</div>
        <div style={{ fontFamily: MADEIRA, fontSize: 130, lineHeight: 1.05, color: OURO, textShadow: `6px 6px 0 ${F.vermelho}` }}>RICO.</div>
      </div>
    </>
  ) },
  // 2 · o chefe: vagão, lampião, Wan levanta o olhar
  { t: I(2) - 0.1, render: (s, ls) => (
    <>
      <Cam ls={ls} de={1} ate={1.35} ox={540} oy={360} dur={2.6}>
        <Fundo nome="vagao" />
        <Svg><WanHD x={540} y={1010} escala={0.92} expr={s >= W(2, "Wan.") - 0.1 ? "sorriso" : "calmo"} pose="bracos" luz={LUZ_LAMPIAO} id="w2" piscar={pisca(s)} respira={0.004 * Math.sin(s * 2)} /></Svg>
        <LuzQuente x={540} y={190} r={520} s={s} forca={0.3} />
      </Cam>
      <Escurece op={1 - p(s, I(2) - 0.1, 0.5)} />
    </>
  ) },
  // 3 · premissa: os comentários decidem
  { t: I(3) - 0.15, hud: false, render: (s) => (
    <AbsoluteFill style={{ background: "#141010" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 210, textAlign: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: "0.26em", color: "rgba(243,230,200,.55)" }}>TODA PARTE · VOCÊ VOTA</div>
        <div style={{ fontFamily: MADEIRA, fontSize: 92, color: F.papel, marginTop: 18, lineHeight: 1 }}>Os comentários</div>
        <div style={{ fontFamily: MADEIRA, fontSize: 92, color: OURO, lineHeight: 1.1, opacity: p(s, W(3, "decidem") - 0.1, 0.3) }}>decidem.</div>
      </div>
      {["PARTE 1 · VOCÊ JOGA", "PARTE 2 · —", "PARTE 3 · —"].map((t, i) => (
        <div key={t} style={{ position: "absolute", left: 250, right: 250, top: 540 + i * 74, background: "rgba(243,230,200,.07)", border: `2px solid rgba(243,230,200,${i ? 0.15 : 0.5})`, borderRadius: 10, padding: "14px 20px", display: "flex", justifyContent: "space-between", opacity: p(s, I(3) + 0.3 + i * 0.25, 0.3) }}>
          <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 26, color: i ? "rgba(243,230,200,.45)" : F.papel }}>{t.split(" · ")[0]}</span>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 26, color: i ? "rgba(243,230,200,.3)" : OURO }}>{t.split(" · ")[1]}</span>
        </div>
      ))}
    </AbsoluteFill>
  ) },
  // 4 · o plano do Wan
  { t: I(4) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.06} ate={1.12} dur={5}>
      <Fundo nome="vagao" filtro="blur(3px) brightness(.85)" />
      <Svg>
        <WanHD x={600} y={1500} escala={1.6} expr={s >= W(4, "Eu") ? "sorriso" : "serio"} pose={s >= W(4, "Vagão") ? "carta" : "bracos"} luz={LUZ_LAMPIAO} id="w4" piscar={pisca(s)} respira={0.004 * Math.sin(s * 2)} />
        <Voce x={190} y={1130} esc={1.3} />
      </Svg>
      <LuzQuente x={700} y={120} r={600} s={s} forca={0.28} />
    </Cam>
  ) },
  // 5 · ninguém age na hora: todo mundo congelado
  { t: I(5) - 0.1, render: (s, ls) => (
    <>
      <Cam ls={ls} de={1.12} ate={1.0} dur={2}>
        <Fundo nome="vagao" />
        <Svg>
          {[[230, 900, 0.95], [850, 900, 0.95], [380, 800, 0.7], [700, 800, 0.7]].map(([x, y, e], i) => <Caolho key={i} x={x} y={y} esc={e} borda="#ffcf8a" arma={i % 2 === 0} />)}
          <WanHD x={540} y={790} escala={0.6} expr="serio" pose="bracos" luz={LUZ_LAMPIAO} id="w5" />
        </Svg>
      </Cam>
      <AbsoluteFill style={{ background: "rgba(40,60,120,.18)", mixBlendMode: "multiply" }} />
      <Rotulo txt="❚❚  NINGUÉM AGE NA HORA" y={130} op={p(s, W(5, "ninguém") - 0.1, 0.25)} />
    </>
  ) },
  // 6 · cada um joga uma carta numa pilha
  { t: I(6) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.08} dur={4}>
      <Fundo nome="mesa" />
      {pilhaMesa(s, ls, [0, 1, 2, 3, 4, 5].map((i) => ({ a: "verso" as const, t: I(6) + 0.2 + i * 0.5 })))}
      <Rotulo txt="PILHA COMUM · UM DE CADA VEZ" y={130} op={p(s, W(6, "Um") - 0.1, 0.25)} />
    </Cam>
  ) },
  // 7 · ninguém sabe o que vem
  { t: I(7) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.25} ate={1.45} oy={520} dur={2.4}>
      <Fundo nome="mesa" filtro="brightness(.8)" />
      {pilhaMesa(s, ls, [0, 1, 2, 3, 4, 5].map((i) => ({ a: "verso" as const, t: -10 })))}
      <AbsoluteFill style={{ background: "radial-gradient(circle at 540px 520px, rgba(0,0,0,0) 180px, rgba(0,0,0,.6) 520px)" }} />
    </Cam>
  ) },
  // 8a · a pilha vira: ANDAR, JOIA
  { t: I(8) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={2}>
      <Fundo nome="mesa" />
      {pilhaMesa(s, ls, [{ a: "andar" as const, t: -10, vira: W(8, "vira.") - 0.15 }, { a: "saque" as const, t: -10, vira: W(8, "anda.") - 0.1 }, { a: "andar" as const, t: -10 }, { a: "soco" as const, t: -10 }])}
      <Rotulo txt="A PILHA VIRA · NA ORDEM" y={130} />
    </Cam>
  ) },
  // 8b · você pega a joia
  { t: W(8, "pega") - 0.15, render: (s, ls) => (
    <Cam ls={ls} de={1.1} ate={1.2} dur={1.5}>
      <Fundo nome="vagao" filtro="blur(4px) brightness(.7)" />
      <LuzQuente x={540} y={520} r={420} s={s} cor="#ff8ac0" forca={0.25 + 0.2 * p(s, W(8, "joia."), 0.3)} />
      <Svg>
        <Joia x={540} y={520 - 30 * p(s, W(8, "joia.") - 0.1, 0.5)} esc={2.2} giro={6 * Math.sin(s * 2)} brilho={0.5 + 0.5 * p(s, W(8, "joia."), 0.3)} />
        <g transform={`translate(${540 + 300 * (1 - p(s, W(8, "pega"), 0.4))},${760 + 200 * (1 - p(s, W(8, "pega"), 0.4))})`}>
          <path d="M-60,240 L-40,40 C-40,-20 60,-30 80,10 L120,80 C130,110 100,130 80,110 L40,70 L60,240 Z" fill="#2b1d14" stroke="#0a0605" strokeWidth={8} />
          <path d="M-40,40 C-30,-6 40,-16 70,14" stroke="#ffcf8a" strokeWidth={6} fill="none" />
        </g>
      </Svg>
    </Cam>
  ) },
  // 9a · carta quatro: SOCO
  { t: I(9) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.3} ate={1.45} ox={760} oy={500} dur={1.2}>
      <Fundo nome="mesa" />
      {pilhaMesa(s, ls, [{ a: "andar" as const, t: -10, vira: -10 }, { a: "saque" as const, t: -10, vira: -10 }, { a: "andar" as const, t: -10, vira: -10 }, { a: "soco" as const, t: -10, vira: W(9, "quatro.") - 0.2 }])}
    </Cam>
  ) },
  // 9b · o punho do Caolho
  { t: W(9, "Um") - 0.1, render: (s, ls) => {
    const tc = W(9, "cara.");
    return (
      <Cam ls={s >= tc ? s - tc : ls} de={1} ate={1.04} dur={1} tremor={s >= tc ? 26 : 0}>
        <Fundo nome="vagao" filtro="brightness(.75)" />
        <Svg>
          <Caolho x={560} y={1150} esc={1.9} borda="#ffcf8a" />
          {s >= W(9, "Na") - 0.1 ? <Punho x={560} y={560} esc={0.4 + 2.4 * p(s, W(9, "Na") - 0.1, 0.45, Easing.in(Easing.cubic))} /> : null}
        </Svg>
        <Escurece op={s >= tc ? 0.9 * (1 - lin(s, tc, tc + 0.25)) : 0} cor="#fff" />
      </Cam>
    );
  } },
  // 10a · a joia cai em câmera lenta
  { t: I(10) - 0.1, render: (s, ls) => (
    <AbsoluteFill style={{ background: "#0d0907" }}>
      <LuzQuente x={540} y={480} r={460} s={s} cor="#ff8ac0" forca={0.25} />
      <Svg><Joia x={540} y={300 + 360 * lin(s, I(10), W(10, "Você"))} esc={1.6} giro={ls * 160} brilho={0.8} /></Svg>
      <PoeiraLuz s={s} n={30} caixa={[200, 100, 680, 800]} />
    </AbsoluteFill>
  ) },
  // 10b · você voa pro vagão de trás
  { t: W(10, "Você") - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.3} ate={1} dur={0.8} tremor={18}>
      <Fundo nome="vagao" filtro="blur(2px)" />
      <Svg>
        <g stroke={F.papel} strokeWidth={6} strokeLinecap="round" opacity={0.5 * (1 - lin(ls, 0, 1.2))}>
          {[200, 330, 470, 620, 760, 890].map((y, i) => <path key={y} d={`M${100 + (i % 3) * 60},${y} h${400 - (i % 2) * 120}`} />)}
        </g>
        <g transform={`translate(${540 + 500 * (1 - p(s, W(10, "Você"), 0.6))},${560}) rotate(${-25 + 25 * p(s, W(10, "Você"), 0.6)})`}><Voce x={0} y={420} esc={1.2} /></g>
      </Svg>
    </Cam>
  ) },
  // 11 · do chão, a locomotiva
  { t: I(11) - 0.1, render: (s, ls) => (
    <>
      <Cam ls={ls} de={1} ate={1.22} oy={620} dur={2.6}>
        <Fundo nome="locomotiva" />
        <LuzQuente x={540} y={640} r={460} s={s} cor="#ff7a2a" forca={0.3} />
        <PoeiraLuz s={s} n={50} caixa={[200, 300, 700, 700]} cor="#ffcf8a" />
      </Cam>
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(10,6,4,.9) 0px, rgba(10,6,4,0) 260px)" }} />
      <Rotulo txt="POR UM SEGUNDO" y={130} />
    </>
  ) },
  // 12a · a maleta não está mais lá
  { t: I(12) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.7} ate={1.95} ox={560} oy={900} dur={2.2}>
      <Fundo nome="locomotiva" />
      <LuzQuente x={540} y={640} r={460} s={s} cor="#ff7a2a" forca={0.3} />
      <PoeiraLuz s={s} n={30} caixa={[380, 700, 340, 300]} cor="#ffcf8a" />
    </Cam>
  ) },
  // 12b · e o Wan também não
  { t: W(12, "E") - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.06} dur={2}>
      <Fundo nome="vagao" filtro="brightness(.8)" />
      <Svg><g transform={`rotate(${8 * Math.sin(s * 2.4)},540,0)`}><path d="M540,0 V150" stroke={F.tinta} strokeWidth={4} /></g></Svg>
      <LuzQuente x={540 + 60 * Math.sin(s * 2.4)} y={190} r={460} s={s} forca={0.35} />
      <Rotulo txt="ASSENTO DO WAN · VAZIO" y={130} op={p(s, W(12, "E"), 0.3)} />
    </Cam>
  ) },
  // 13 · você chama — cortes curtos
  { t: I(13) - 0.1, render: (s, ls) => {
    const z = s >= W(13, "Chama") - 0.1 ? 1.6 : s >= W(13, "Nada.") - 0.1 ? 1.32 : 1.08;
    return (
      <Cam ls={0} de={z} ate={z} oy={460}>
        <Fundo nome="vagao" filtro="brightness(.62) saturate(.8)" />
        <LuzQuente x={540 + 60 * Math.sin(s * 2.4)} y={190} r={420} s={s} forca={0.3} />
        <Svg><Voce x={280} y={1180} esc={1.1} /></Svg>
      </Cam>
    );
  } },
  // 14a · sobe no teto
  { t: I(14) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.25} ate={1.05} oy={700} dur={3.4}>
      <Fundo nome="teto" />
      <Svg><g transform={`translate(0,${180 * (1 - p(s, W(14, "Sobe") - 0.2, 0.9))})`}><Voce x={430} y={1120} esc={1.25} borda="#b9cbff" /></g></Svg>
      <PoeiraLuz s={s} n={30} caixa={[0, 300, 1080, 600]} cor="#c9d6ff" />
    </Cam>
  ) },
  // 14b · até três vagões numa ação
  { t: W(14, "Lá") - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.05} dur={3}>
      <Fundo nome="teto" />
      <Svg>
        {[[540, 900, 1], [540, 640, 2], [540, 545, 3]].map(([x, y, n], i) => (
          <g key={n} opacity={p(s, W(14, "correr") - 0.2 + i * 0.3, 0.25)}>
            <circle cx={x} cy={y} r={34 - i * 7} fill={OURO} stroke={F.tinta} strokeWidth={5} />
            <text x={x} y={y + 12 - i * 2} textAnchor="middle" fontFamily={MADEIRA} fontSize={34 - i * 6} fill={F.tinta}>{n}</text>
          </g>
        ))}
        <g opacity={p(s, W(14, "Lá") - 0.05, 0.3)}><Carta x={210} y={430} a="correr" esc={1.25} giro={-6} /></g>
      </Svg>
      <Rotulo txt="NO TETO · ATÉ 3 VAGÕES POR AÇÃO" y={130} op={p(s, W(14, "três") - 0.1, 0.3)} />
    </Cam>
  ) },
  // 15 · rodada três: o túnel
  { t: I(15) - 0.15, render: (s, ls) => (
    <>
      <Cam ls={ls} de={1} ate={1.4} oy={640} dur={2.4}>
        <Fundo nome="tunel" />
        <Svg><g transform={`translate(${-1400 + 1700 * lin(s, I(15), W(15, "túnel.") + 0.2)},940) scale(0.5)`}><Trem x={0} y={0} s={s} vagoes={3} /></g></Svg>
      </Cam>
      <Escurece op={lin(s, W(15, "túnel.") - 0.2, W(15, "túnel.") + 0.4)} />
      <Rotulo txt="RODADA 3 · TÚNEL" y={130} cor={OURO} op={p(s, I(15), 0.25)} />
    </>
  ) },
  // 16 · o Wan no escuro
  { t: I(16) - 0.1, hud: false, render: (s, ls) => {
    const brasa = 0.75 + 0.25 * Math.sin(s * 5) * Math.sin(s * 2.3);
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        <Cam ls={ls} de={1} ate={1.08} dur={4}>
          <Svg style={{ filter: "brightness(.55)" }}><WanHD x={540} y={2610} escala={3} expr="serio" pose="bracos" luz={{ lx: 0.7, ly: 0.6, borda: "#ff9a4a" }} id="w16" piscar={pisca(s)} /></Svg>
          <AbsoluteFill style={{ background: `radial-gradient(circle at 620px 640px, rgba(0,0,0,0) 60px, rgba(0,0,0,${0.97 - 0.12 * brasa}) 330px)` }} />
          <LuzQuente x={640} y={700} r={200} s={s} cor="#ff6a1a" forca={0.5 * brasa} />
          <Svg><circle cx={640} cy={700} r={9} fill="#ffb060" opacity={brasa} /><circle cx={640} cy={700} r={4} fill="#fffaf0" /></Svg>
        </Cam>
      </AbsoluteFill>
    );
  } },
  // 17 · o que você não sabe
  { t: I(17) - 0.15, hud: false, render: (s, ls) => (
    <AbsoluteFill style={{ background: "#0d0907" }}>
      <Cam ls={ls} de={1.1} ate={1} dur={1.6}>
        <Fundo nome="mesa" filtro="brightness(.25)" />
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: "0.28em", color: "rgba(243,230,200,.6)" }}>AQUI VAI</div>
          <div style={{ fontFamily: MADEIRA, fontSize: 96, lineHeight: 1.02, color: F.papel, marginTop: 14 }}>o que você</div>
          <div style={{ fontFamily: MADEIRA, fontSize: 112, lineHeight: 1.02, color: OURO, opacity: p(s, W(17, "não") - 0.1, 0.25) }}>não sabe.</div>
        </div>
      </Cam>
    </AbsoluteFill>
  ) },
  // 18 · no túnel, cartas viradas pra baixo; lanterna passando
  { t: I(18) - 0.1, render: (s, ls) => {
    const lx = 300 + 480 * (0.5 + 0.5 * Math.sin(ls * 1.3 - 1.2));
    return (
      <AbsoluteFill style={{ background: "#000" }}>
        <Cam ls={ls} de={1} ate={1.08} dur={4.5}>
          <Fundo nome="mesa" filtro="brightness(.5)" />
          {pilhaMesa(s, ls, [0, 1, 2, 3, 4].map((i) => ({ a: "verso" as const, t: I(18) + 0.2 + i * 0.55 })))}
          <AbsoluteFill style={{ background: `radial-gradient(circle at ${lx}px 500px, rgba(0,0,0,0) 90px, rgba(0,0,0,.93) 330px)` }} />
          <LuzQuente x={lx} y={500} r={260} s={s} cor="#fff1c8" forca={0.25} />
        </Cam>
        <Rotulo txt="TÚNEL · CARTAS VIRADAS" y={130} />
      </AbsoluteFill>
    );
  } },
  // 19 · isso é real
  { t: I(19) - 0.1, hud: false, render: (s, ls) => (
    <AbsoluteFill style={{ background: "#241a12" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: "0.28em", color: "rgba(243,230,200,.5)" }}>ISSO É DE VERDADE · O JOGO</div>
      <div style={{ position: "absolute", left: 170, right: 170, top: 200, background: "#f3ead6", borderRadius: 6, padding: "34px 40px", boxShadow: "0 20px 40px rgba(0,0,0,.5)", transform: `rotate(-1.2deg) translateY(${30 * (1 - p(s, I(19), 0.5))}px)`, opacity: p(s, I(19), 0.3) }}>
        <div style={{ position: "absolute", left: "50%", top: -10, width: 20, height: 20, borderRadius: 10, background: F.vermelho, marginLeft: -10 }} />
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: "0.2em", color: "rgba(43,29,20,.55)" }}>COLT EXPRESS · 2015</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 52, color: F.tinta, marginTop: 10, lineHeight: 1.05 }}>Ganhou o <span style={{ color: F.vermelho }}>Spiel des Jahres</span>.</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 30, color: F.tinta, marginTop: 14 }}>No túnel, as cartas entram viradas para baixo.</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 34, color: F.tinta, marginTop: 16, opacity: p(s, W(19, "450") - 0.1, 0.3) }}>+450 mil cópias vendidas.</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", opacity: p(s, W(19, "verdade.") - 0.1, 0.2), transform: `rotate(-8deg) scale(${1.25 - 0.25 * p(s, W(19, "verdade.") - 0.1, 0.3)})` }}>
        <div style={{ fontFamily: MADEIRA, fontSize: 70, color: "#e2364f", border: "7px solid #e2364f", borderRadius: 10, padding: "4px 30px", background: "rgba(226,54,79,.08)" }}>REAL</div>
      </div>
    </AbsoluteFill>
  ) },
  // 20 · saindo do túnel: o Wan no teto, com a maleta
  { t: I(20) - 0.1, render: (s, ls) => (
    <>
      <Cam ls={ls} de={1} ate={1.12} oy={560} dur={3.4}>
        <Fundo nome="teto" />
        <Svg>
          <WanHD x={560} y={1020} escala={0.95} expr="calmo" pose="bracos" luz={LUZ_LUA} id="w20" piscar={pisca(s)} respira={0.004 * Math.sin(s * 2)} />
          <g opacity={p(s, W(20, "Com") - 0.1, 0.3)}><Maleta x={720} y={820} esc={0.9} /></g>
        </Svg>
        <PoeiraLuz s={s} n={40} caixa={[0, 200, 1080, 700]} cor="#c9d6ff" />
      </Cam>
      <Escurece op={1 - lin(s, I(20) - 0.1, I(20) + 0.5)} cor="#fff" />
    </>
  ) },
  // 21 · "o plano mudou"
  { t: I(21) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.06} dur={1.4}>
      <Fundo nome="teto" filtro="blur(5px)" />
      <Svg><WanHD x={540} y={2560} escala={2.9} expr="sorriso" pose="bracos" luz={LUZ_LUA} id="w21" /></Svg>
    </Cam>
  ) },
  // 22 · atrás dele, o Caolho com a carta de tiro
  { t: I(22) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1} ate={1.1} ox={300} oy={560} dur={2.6}>
      <Fundo nome="teto" />
      <Svg>
        <Caolho x={300} y={760} esc={0.95} arma />
        <WanHD x={700} y={1060} escala={0.85} expr="calmo" pose="bracos" luz={LUZ_LUA} id="w22" />
        <Maleta x={850} y={890} esc={0.8} />
        <g opacity={p(s, W(22, "carta") - 0.15, 0.25)}><Carta x={300} y={330} a="tiro" esc={1.15} giro={-8} virando={p(s, W(22, "carta") - 0.1, 0.4)} destaque /></g>
      </Svg>
    </Cam>
  ) },
  // 23 · agora é com você: duas cartas na mão
  { t: I(23) - 0.1, render: (s, ls) => (
    <Cam ls={ls} de={1.08} ate={1} dur={1.2}>
      <Fundo nome="mesa" filtro="brightness(.55)" />
      <Svg>
        <Carta x={420} y={560} a="soco" esc={2} giro={-10} />
        <Carta x={660} y={560} a="tiro" esc={2} giro={10} />
      </Svg>
    </Cam>
  ) },
  // 24–25 · a escolha com preço escrito
  { t: I(24) - 0.1, render: (s) => {
    const opt = (x: number, t0: number, titulo: string, l1: string, l2: string, a: "soco" | "tiro", ativo: boolean) => (
      <div style={{ position: "absolute", left: x, top: 250, width: 440, opacity: p(s, t0 - 0.1, 0.25), transform: `translateY(${24 * (1 - p(s, t0 - 0.1, 0.35))}px) scale(${ativo ? 1 : 0.94})`, filter: ativo ? undefined : "brightness(.55)" }}>
        <div style={{ background: ativo ? "#e2364f" : F.papel, borderRadius: 14, padding: "26px 20px 22px", textAlign: "center", boxShadow: "0 18px 40px rgba(0,0,0,.5)" }}>
          <svg width={140} height={180} viewBox="-75 -100 150 200" style={{ display: "block", margin: "0 auto" }}><Carta x={0} y={0} a={a} esc={0.95} /></svg>
          <div style={{ fontFamily: MADEIRA, fontSize: 76, color: ativo ? "#fffaf0" : F.tinta, lineHeight: 1, marginTop: 10 }}>{titulo}</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 24, color: ativo ? "#fffaf0" : F.tinta, marginTop: 12 }}>{l1}</div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: ativo ? "rgba(255,250,240,.85)" : "rgba(43,29,20,.75)", marginTop: 4 }}>{l2}</div>
        </div>
      </div>
    );
    const segunda = s >= I(25) - 0.1;
    return (
      <AbsoluteFill>
        <Fundo nome="teto" filtro="blur(8px) brightness(.45)" />
        <Rotulo txt="O QUE VOCÊ FAZ?" centro y={170} cor={OURO} />
        {opt(70, I(24), "SOCAR", "se o Wan te traiu", "a maleta cai no teto", "soco", !segunda)}
        {opt(570, I(25), "ATIRAR", "se ele te protege", "o Caolho ganha uma bala", "tiro", segunda)}
      </AbsoluteFill>
    );
  } },
  // 26 · tela final: comenta uma palavra
  { t: I(26) - 0.15, hud: false, render: (s) => (
    <AbsoluteFill style={{ background: "#0f0b09" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 96, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: "0.28em", color: "rgba(243,230,200,.55)" }}>COMENTA UMA PALAVRA</div>
      {([["socar", "SOCAR", "a maleta cai", 150], ["atirar", "ATIRAR", "o Caolho leva bala", 570]] as const).map(([k, t, sub, x], i) => (
        <div key={k} style={{ position: "absolute", left: x, top: 160, width: 360, height: 520, borderRadius: 16, overflow: "hidden", boxShadow: "0 18px 40px rgba(0,0,0,.6)", opacity: p(s, I(26) + i * 0.25, 0.3) }}>
          <div style={{ position: "absolute", left: -360, top: -200, width: 1080, height: 1080, transform: "scale(.66)", transformOrigin: "540px 540px" }}>
            <Img src={staticFile("img/wan1/teto.png")} style={{ width: 1080, height: 1080 }} />
            <Svg>{i === 0 ? <><WanHD x={540} y={1000} escala={0.9} expr="calmo" pose="bracos" luz={LUZ_LUA} id="f1" /><Punho x={330} y={640} esc={1.2} /></> : <><Caolho x={540} y={1000} esc={1.2} arma /><Carta x={300} y={520} a="bala" esc={1.4} /></>}</Svg>
          </div>
          <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(10,6,4,.92) 0px, rgba(10,6,4,0) 240px)" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 26, textAlign: "center" }}>
            <div style={{ fontFamily: MADEIRA, fontSize: 64, color: i ? "#e2364f" : "#fffaf0", lineHeight: 1 }}>{t}</div>
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: "rgba(255,250,240,.75)", marginTop: 6 }}>{sub}</div>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", left: 0, right: 0, top: 715, textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 44, color: "#fffaf0", opacity: p(s, W(26, "A") - 0.1, 0.3) }}>
        A maioria escreve a <span style={{ color: OURO }}>Parte 2.</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 785, textAlign: "center", fontFamily: SANS, fontWeight: 700, fontSize: 24, color: "rgba(243,230,200,.6)", opacity: p(s, W(26, "Manda") - 0.1, 0.3) }}>
        manda pro amigo que te trairia por uma maleta
      </div>
    </AbsoluteFill>
  ) },
  // cartela: link da resenha
  { t: DURACAO - 0.6, hud: false, render: (s) => (
    <AbsoluteFill style={{ background: "#0f0b09", opacity: p(s, DURACAO - 0.6, 0.4) }}>
      <div style={{ position: "absolute", left: 160, right: 160, top: 170, background: F.papel, borderRadius: 14, padding: "40px 30px", textAlign: "center", boxShadow: `14px 14px 0 ${F.vermelho}` }}>
        <div style={{ fontFamily: RYE, fontSize: 32, color: F.vermelho }}>RESENHA COMPLETA</div>
        <div style={{ fontFamily: MADEIRA, fontSize: 84, color: F.tinta, marginTop: 6, lineHeight: 1 }}>Colt Express</div>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 34, color: F.tinta, marginTop: 22 }}>eliteboardgamers.com.br</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 40, color: F.vermelho }}>/colt-express</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, color: F.tinta, marginTop: 14 }}>link na bio</div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center" }}>
        <Img src={staticFile("img/logo.webp")} style={{ width: 240 }} />
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 20, color: "rgba(243,230,200,.6)", marginTop: 20 }}>História de ficção · regras conforme a nossa resenha</div>
      </div>
    </AbsoluteFill>
  ) },
];

// ---------------------------------------------------------------- composição
export const Wan1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  let k = 0;
  PLANOS.forEach((pl, i) => { if (s >= pl.t) k = i; });
  const pl = PLANOS[k];
  const ls = s - pl.t;
  const hud = pl.hud !== false;
  const cortes = PLANOS.map((x) => x.t).filter((t) => t > 0.5 && t < DURACAO);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <AbsoluteFill>{pl.render(s, ls)}</AbsoluteFill>
      {/* respiro de corte: 2 quadros de preto suave em cada troca de plano */}
      <Escurece op={cortes.some((t) => s >= t && s < t + 0.07) ? 0.35 : 0} />
      <Painel s={s} op={hud ? 1 : 0} />
      {s < DURACAO - 0.6 && pl.t !== I(26) - 0.15 ? <Legenda s={s} /> : null}
      <Papel forca={0.1} />

      {/* ===================== áudio ===================== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.8, I(16), I(16) + 0.4, I(19) + 0.5, I(20), FIM_WAN1 - 1.4, FIM_WAN1 - 0.1], [0, 0.07, 0.07, 0.025, 0.025, 0.07, 0.07, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[I(2), I(5), I(11), I(15), I(20), I(24)].map((t, i) => (
        <Sequence key={`w${i}`} from={Math.max(0, Math.round((t - 0.2) * fps))} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.22} /></Sequence>
      ))}
      {[...[0, 1, 2, 3, 4, 5].map((i) => I(6) + 0.2 + i * 0.5), W(8, "vira.") - 0.15, W(8, "anda.") - 0.1, W(9, "quatro.") - 0.2, ...[0, 1, 2, 3, 4].map((i) => I(18) + 0.2 + i * 0.55), W(22, "carta") - 0.1].map((t, i) => (
        <Sequence key={`c${i}`} from={Math.round(t * fps)} durationInFrames={Math.round(0.4 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.18} /></Sequence>
      ))}
      {[W(9, "cara."), W(1, "Só"), W(19, "verdade.")].map((t, i) => (
        <Sequence key={`i${i}`} from={Math.round((t - 0.08) * fps)} durationInFrames={Math.round(1.4 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={i === 0 ? 0.45 : 0.25} /></Sequence>
      ))}
      <Sequence from={Math.round((W(8, "joia.") - 0.1) * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.25} /></Sequence>
      <Sequence from={Math.round((W(10, "Você") - 0.3) * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.4} /></Sequence>
      <Sequence from={Math.round((I(17) - 1.4) * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} volume={0.2} /></Sequence>
      <Sequence from={Math.round((I(26) - 0.1) * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.25} /></Sequence>
    </AbsoluteFill>
  );
};
