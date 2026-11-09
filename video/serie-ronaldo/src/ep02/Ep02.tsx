import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Clareira, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import { LinkTutorial, Passaro } from "../ep01/Ep01";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// Ep. 2: as Rapinas e o Decreto. Tudo amarrado às palavras da narração (marcas.ts).
export const FIM2 = DURACAO + 1.5;

const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const SAI = Easing.bezier(0.7, 0, 0.84, 0);
const prog = (s: number, t0: number, d: number, ease = ENTRA) =>
  interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const mola = (s: number, t0: number) => {
  const x = Math.max(0, s - t0);
  return x <= 0 ? 0 : 1 - Math.exp(-9 * x) * Math.cos(14 * x);
};
const entre = (s: number, a: number, b: number) => s >= a && s < b;

const AZUL = "#6ea8ff";
const VERMELHO = "#ff6b5b";
const VERDE = "#3ddc84";
const CORES_FALA: Record<string, string> = { narrador: cor.texto, ronaldo: "#8fb4ff", wan: cor.ouro };

const Legenda: React.FC<{ s: number }> = ({ s }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.25);
  // não repete o que já está escrito grande na tela
  if (!f || [1, 5, 7, 8, 9, 12, 15, 16].includes(f.id)) return null;
  const c = CORES_FALA[f.quem];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1236, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(15,17,21,.86)", borderRadius: 24, padding: "16px 26px", maxWidth: 960, textAlign: "center" }}>
        {f.quem !== "narrador" ? <div style={{ ...tipo.rotulo, fontSize: 24, color: c, marginBottom: 6 }}>{f.quem === "wan" ? "Wan" : "Ronaldo"}</div> : null}
        <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 42, lineHeight: 1.2 }}>
          {f.palavras.map((p, i) => (
            <span key={i} style={{ color: s >= p.t ? c : "rgba(236,239,243,.38)" }}>{p.w} </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- peças desenhadas por nós (não são a arte do jogo) ----------
// Guerreiro das Rapinas: corpo de peão com cabeça de ave, azul. Pés em (x, y).
const GuerreiroAve: React.FC<{ x: number; y: number; esc: number; coroa?: boolean; giro?: number; k?: number }> = ({ x, y, esc, coroa, giro = 0, k = 1 }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${-esc * k},${esc * k})`}>
    <ellipse cx={0} cy={0} rx={70} ry={12} fill="rgba(0,0,0,.25)" />
    <path d="M-60,0 L-45,-120 Q0,-150 45,-120 L60,0 Z" fill="#4f7fd0" />
    <path d="M0,-138 Q45,-132 45,-120 L60,0 L0,0 Z" fill={AZUL} opacity={0.55} />
    <path d="M-50,-100 Q-98,-66 -58,-26 Z" fill="#3d68b5" />
    <path d="M-22,-212 L-8,-252 L4,-222 L24,-246 L22,-206 Z" fill="#3d68b5" />
    <circle cx={0} cy={-172} r={56} fill="#5b8ddc" />
    <path d="M0,-228 A56,56 0 0 1 56,-172 L0,-172 Z" fill={AZUL} opacity={0.45} />
    <path d="M38,-180 L92,-164 L38,-150 Z" fill={cor.ouro} />
    <circle cx={20} cy={-184} r={10} fill="#0f1115" />
    <circle cx={23} cy={-187} r={3} fill="#fff" />
    <path d="M2,-204 L40,-194" stroke="#1c2a4a" strokeWidth={8} strokeLinecap="round" />
    {coroa ? <path d="M-34,-224 L-34,-262 L-16,-242 L0,-272 L16,-242 L34,-262 L34,-224 Z" fill={cor.ouro} stroke="#a77d1c" strokeWidth={4} /> : null}
  </g>
);

const Coroa: React.FC<{ x: number; y: number; giro: number; esc: number }> = ({ x, y, giro, esc }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${esc})`}>
    <path d="M-34,0 L-34,-38 L-16,-18 L0,-48 L16,-18 L34,-38 L34,0 Z" fill={cor.ouro} stroke="#a77d1c" strokeWidth={4} />
  </g>
);

// Ninho das Rapinas: torre de madeira com telhado azul. Base em (x, y).
const Ninho: React.FC<{ x: number; y: number; esc: number }> = ({ x, y, esc }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <ellipse cx={0} cy={0} rx={90} ry={14} fill="rgba(0,0,0,.25)" />
    <rect x={-55} y={-200} width={110} height={200} fill="#8a6440" />
    <rect x={0} y={-200} width={55} height={200} fill="#9c7550" />
    {[-160, -110, -60].map((yy) => <rect key={yy} x={-55} y={yy} width={110} height={6} fill="#6b4a2f" />)}
    <rect x={-18} y={-70} width={36} height={70} rx={18} fill="#3a2b22" />
    <ellipse cx={0} cy={-200} rx={92} ry={22} fill="#6b4a2f" />
    <path d="M-82,-206 L0,-300 L82,-206 Z" fill="#4f7fd0" />
    <path d="M0,-300 L82,-206 L0,-206 Z" fill={AZUL} opacity={0.5} />
  </g>
);

type Naipe = "passaro" | "coelho" | "raposa" | "rato";
const COR_NAIPE: Record<Naipe, string> = { passaro: AZUL, coelho: "#f0c24b", raposa: "#e46a3b", rato: "#b493ff" };
const Simbolo: React.FC<{ n: Naipe }> = ({ n }) =>
  n === "passaro" ? (
    <path d="M-44,4 C-28,-26 -6,-30 0,-10 C6,-30 28,-26 44,4 C22,-6 8,-2 0,12 C-8,-2 -22,-6 -44,4 Z" fill="#fff" />
  ) : n === "coelho" ? (
    <g fill="#fff">
      <ellipse cx={-14} cy={-28} rx={10} ry={30} />
      <ellipse cx={14} cy={-28} rx={10} ry={30} />
      <circle cx={0} cy={14} r={28} />
      <circle cx={-10} cy={10} r={4} fill="#1c1c22" />
      <circle cx={10} cy={10} r={4} fill="#1c1c22" />
    </g>
  ) : n === "raposa" ? (
    <path d="M-36,-32 L-14,-8 L14,-8 L36,-32 L32,10 L0,38 L-32,10 Z" fill="#fff" />
  ) : (
    <g fill="#fff">
      <circle cx={-24} cy={-18} r={15} />
      <circle cx={24} cy={-18} r={15} />
      <circle cx={0} cy={8} r={28} />
    </g>
  );

// Carta do baralho (nossa versão simplificada): centro em (x, y).
const Carta: React.FC<{ x: number; y: number; n: Naipe; k?: number; giro?: number; op?: number; brilho?: boolean }> = ({ x, y, n, k = 1, giro = 0, op = 1, brilho }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${k})`} opacity={op}>
    {brilho ? <rect x={-92} y={-120} width={184} height={240} rx={26} fill="none" stroke={cor.ouro} strokeWidth={10} /> : null}
    <rect x={-78} y={-106} width={156} height={212} rx={18} fill={COR_NAIPE[n]} stroke="#0f1115" strokeWidth={5} />
    <Simbolo n={n} />
  </g>
);

const COLUNAS: { nome: string; palavra: string; carta: Naipe }[] = [
  { nome: "Recrutar", palavra: "Recrutar.", carta: "passaro" },
  { nome: "Mover", palavra: "Mover.", carta: "passaro" },
  { nome: "Batalhar", palavra: "Batalhar.", carta: "coelho" },
  { nome: "Construir", palavra: "Construir.", carta: "raposa" },
];

// O Decreto: 4 colunas, da esquerda para a direita. Os dois pássaros são os Vizires Leais (ficam no tumulto).
const Decreto: React.FC<{ s: number }> = ({ s }) => {
  const abre = s < I(10) ? prog(s, I(5) - 0.15, 0.35) * (1 - prog(s, I(7) - 0.3, 0.25, SAI)) : prog(s, I(10) - 0.1, 0.35) * (1 - prog(s, I(13) - 0.35, 0.25, SAI));
  if (abre <= 0) return null;
  const parte2 = s >= I(10) - 0.1;
  const tumulto = s >= I(12);
  const treme = entre(s, I(12), I(12) + 0.6) ? Math.sin(s * 80) * 12 * (1 - prog(s, I(12), 0.6)) : 0;
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 200, height: 600, opacity: abre, transform: `translateY(${(1 - abre) * 40}px) translateX(${treme}px)` }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,17,21,.93)", border: `4px solid ${AZUL}`, borderRadius: 30 }} />
      <div style={{ position: "absolute", left: 40, top: 28, ...tipo.rotulo, color: AZUL }}>O Decreto das Rapinas</div>
      <svg width={960} height={600} style={{ position: "absolute", left: 0, top: 0 }}>
        {/* seta "da esquerda pra direita" */}
        {!parte2 ? (
          <g opacity={prog(s, W(5, "esquerda") - 0.1, 0.3)}>
            <line x1={70} y1={560} x2={70 + 820 * prog(s, W(5, "esquerda"), 0.9)} y2={560} stroke={cor.ouro} strokeWidth={8} strokeLinecap="round" />
            <path d={`M${70 + 820 * prog(s, W(5, "esquerda"), 0.9)},540 l26,20 l-26,20 Z`} fill={cor.ouro} />
          </g>
        ) : null}
        {COLUNAS.map((c, i) => {
          const cx = 130 + i * 233;
          const t0 = parte2 ? I(10) : W(5, c.palavra);
          const k = parte2 ? 1 : mola(s, t0 - 0.05);
          const foco = parte2 && c.nome === "Batalhar" && s >= W(10, "batalhar") - 0.05;
          const sai = tumulto && c.carta !== "passaro";
          const voa = sai ? prog(s, I(12) + 0.05 + i * 0.06, 0.7, SAI) : 0;
          const apaga = parte2 && !foco && !tumulto ? 0.35 : 1;
          return (
            <g key={c.nome}>
              <Carta x={cx + voa * (i % 2 ? 500 : -500)} y={290 - voa * 500} n={c.carta} k={Math.max(0.001, k) * (foco ? 1.08 : 1)} giro={voa * (i % 2 ? 70 : -70)} op={apaga} brilho={foco && !tumulto} />
              <text x={cx} y={470} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={34} fill={(!parte2 && s >= t0 - 0.05) || foco ? cor.texto : "rgba(236,239,243,.45)"}>{c.nome}</text>
              {foco && s >= W(11, "falhou.") - 0.05 ? (
                <g transform={`translate(${cx},290) scale(${mola(s, W(11, "falhou.") - 0.05)})`} opacity={tumulto ? 1 - voa : 1}>
                  <path d="M-80,-80 L80,80 M80,-80 L-80,80" stroke={VERMELHO} strokeWidth={22} strokeLinecap="round" />
                </g>
              ) : null}
            </g>
          );
        })}
        {!parte2 ? (
          <text x={480} y={520} textAnchor="middle" fontFamily={fonte} fontWeight={700} fontSize={26} fill={cor.textoSuave} opacity={prog(s, W(5, "Recrutar."), 0.4)}>os dois pássaros são os Vizires Leais</text>
        ) : null}
      </svg>
      {tumulto ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 170, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 170, color: VERMELHO, letterSpacing: "0.02em", transform: `rotate(-8deg) scale(${1.6 - 0.6 * prog(s, I(12), 0.25)})`, opacity: prog(s, I(12), 0.12), textShadow: "0 6px 0 #0f1115, 0 0 40px rgba(0,0,0,.6)" }}>TUMULTO</div>
          <div style={{ position: "absolute", right: 40, top: 24, fontFamily: fonte, fontWeight: 900, fontSize: 56, color: VERMELHO, transform: `scale(${mola(s, I(12) + 0.35)})` }}>−2 PV</div>
        </>
      ) : null}
    </div>
  );
};

export const Ep02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  const tWan = W(7, "Wan") - 0.09; // chegada do Wan
  const chegou = s >= tWan;

  // ----- câmera -----
  const zoomPunch = entre(s, I(3), I(4) - 0.1) ? 1 + 0.45 * prog(s, I(3), 0.25) : entre(s, I(6), I(7) - 0.1) ? 1 + 0.8 * prog(s, I(6), 0.25) : entre(s, I(14), I(15) - 0.1) ? 1 + 0.5 * prog(s, I(14), 0.3) : 1;
  const camOrig = entre(s, I(14), I(15)) ? "540px 900px" : zoomPunch > 1 ? "360px 900px" : "540px 1100px";
  const camEscala = (1 + 0.04 * ((s % 9) / 9)) * zoomPunch;
  const tremor = entre(s, tWan, tWan + 0.45) ? Math.sin(s * 80) * 14 * (1 - prog(s, tWan, 0.45)) : entre(s, I(12), I(12) + 0.6) ? Math.sin(s * 70) * 16 * (1 - prog(s, I(12), 0.6)) : 0;
  const impacto = entre(s, tWan, tWan + 0.07) || entre(s, I(12) - 0.02, I(12) + 0.05);

  // ----- Ronaldo -----
  const ronExpr = s < I(3) ? "confuso" : s < I(4) + 0.4 ? "orgulhoso" : entre(s, I(13), I(15)) ? "orgulhoso" : "apavorado";
  const ronPose = entre(s, I(3) - 0.05, I(4)) || entre(s, I(13) - 0.05, I(15)) ? "biblia" : chegou ? "encolhido" : "cartas";
  const ronX = chegou ? 175 : 360;
  const ronY = chegou ? 1710 : 1660;
  const ronEsc = chegou ? (entre(s, I(13), I(15)) ? 0.7 : 0.62) : 0.95;
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -10 : 0);

  // ----- Rapinas -----
  const aves = [
    { x: 730, y: 1600, d: 0 },
    { x: 860, y: 1585, d: 0.08, coroa: true },
    { x: 990, y: 1600, d: 0.16 },
    { x: 690, y: 1700, d: 0.24 },
    { x: 830, y: 1710, d: 0.32 },
    { x: 970, y: 1705, d: 0.4 },
  ];
  const tumulto = s >= I(12);
  const tLider = W(12, "líder") - 0.05;
  const escuro = s < tWan ? 0.1 * prog(s, 0, 1) : s < I(15) - 0.1 ? 0.45 * prog(s, tWan, 0.4) : 0.45 + 0.3 * prog(s, I(15), 0.8);
  const wanSobe = prog(s, tWan, 0.45);
  const tirou = W(10, "tirou") - 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: cor.fundo, fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      {/* ====== mundo ====== */}
      <AbsoluteFill style={{ transform: `scale(${camEscala}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
        <Clareira escurecer={escuro} />
        {/* gatos que sobraram do Ep. 1; o Wan tira todo mundo da clareira de coelho */}
        {s < tirou + 1 ? (
          <>
            <Img src={staticFile("img/root-gatos-recorte.png")} style={{ position: "absolute", left: 20 - 700 * prog(s, tirou, 0.8, SAI), top: 1180, width: 330, transform: "rotate(4deg)", opacity: 0.95 }} />
            <Img src={staticFile("img/root-gatos-recorte.png")} style={{ position: "absolute", left: 560 + 800 * prog(s, tirou + 0.1, 0.8, SAI), top: 1220, width: 360, transform: `rotate(${-3 + 20 * prog(s, tirou + 0.1, 0.8)}deg)`, opacity: 0.95 }} />
          </>
        ) : null}
        {/* clareira de coelho marcada no chão */}
        {entre(s, I(10) - 0.1, I(13) - 0.2) ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, W(10, "clareira") - 0.1, 0.3) * (1 - prog(s, I(13) - 0.5, 0.3)) }}>
            <ellipse cx={850} cy={1660} rx={260} ry={72} fill="none" stroke="#f4f1ea" strokeWidth={7} opacity={0.85} />
            <g transform={`translate(1000,1470) scale(${mola(s, W(10, "coelho.") - 0.05)})`}>
              <circle r={50} fill={COR_NAIPE.coelho} stroke="#0f1115" strokeWidth={5} />
              <g transform="scale(0.85)"><Simbolo n="coelho" /></g>
            </g>
          </svg>
        ) : null}
        {/* aves voando no gancho */}
        {s < I(2) + 0.6 ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: 1 - prog(s, I(2) + 0.2, 0.4) }}>
            <Passaro x={1100 - 600 * prog(s, W(1, "pousaram…") - 0.5, 1.4)} y={760 + 600 * prog(s, W(1, "pousaram…") - 0.5, 1.4)} esc={1.2} />
            <Passaro x={1200 - 500 * prog(s, W(1, "pousaram…") - 0.3, 1.4)} y={620 + 700 * prog(s, W(1, "pousaram…") - 0.3, 1.4)} esc={0.8} />
            <Passaro x={1250 - 450 * prog(s, W(1, "pousaram…") - 0.1, 1.4)} y={900 + 620 * prog(s, W(1, "pousaram…") - 0.1, 1.4)} esc={0.6} />
          </svg>
        ) : null}
        {/* aura do Wan */}
        {chegou ? <Aura x={540} y={1060 + (1 - wanSobe) * 600} raio={(tumulto && s < I(13) ? 470 : 400) + 20 * Math.sin(s * 3)} seed={9} /> : null}
        {/* raios na chegada do Wan */}
        {entre(s, tWan, tWan + 2.2) ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, tWan, 0.2) * (1 - prog(s, tWan + 1.4, 0.8)) }}>
            <defs>
              <linearGradient id="r2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffe9a6" stopOpacity={0.9} /><stop offset="1" stopColor="#e3b23c" stopOpacity={0} /></linearGradient>
            </defs>
            <g transform={`translate(540,1040) rotate(${(s - tWan) * 8})`}>
              {Array.from({ length: 22 }, (_, i) => (
                <path key={i} d={`M0,-14 L${i % 2 ? 1300 : 1050},-${i % 2 ? 46 : 26} L${i % 2 ? 1300 : 1050},${i % 2 ? 46 : 26} L0,14 Z`} fill="url(#r2)" opacity={i % 3 ? 0.5 : 0.8} transform={`rotate(${(360 / 22) * i})`} />
              ))}
            </g>
            <ellipse cx={540} cy={1690} rx={180 + 380 * prog(s, tWan + 0.05, 0.6)} ry={26 + 50 * prog(s, tWan + 0.05, 0.6)} fill="none" stroke="#ffd977" strokeWidth={10} opacity={1 - prog(s, tWan + 0.35, 1.2)} />
          </svg>
        ) : null}
        {/* ninho, guerreiros das Rapinas e personagens */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {s >= W(2, "ninho.") - 0.1 ? <Ninho x={910} y={1470} esc={0.9 * Math.max(0.001, mola(s, W(2, "ninho.") - 0.1))} /> : null}
          {aves.map((a, i) => {
            const t0 = W(2, "Seis") - 0.05 + a.d;
            if (s < t0) return null;
            const caiu = tumulto ? Math.sin((s - I(12)) * 18 + i) * 12 * (1 - prog(s, I(12), 1.2)) : 0;
            return <GuerreiroAve key={i} x={a.x} y={a.y} esc={0.62} k={Math.max(0.001, mola(s, t0))} coroa={a.coroa && s < tLider} giro={caiu} />;
          })}
          {/* a coroa do líder cai no tumulto */}
          {entre(s, tLider, tLider + 1.6) ? (
            <Coroa x={860 + 120 * prog(s, tLider, 1.2)} y={1585 - 160 + 290 * prog(s, tLider, 0.9, Easing.in(Easing.quad))} giro={140 * prog(s, tLider, 1.0)} esc={0.62 * (1 - prog(s, tLider + 1.1, 0.4))} />
          ) : null}
          <g transform={`translate(0,${bob("ronaldo")})`}>
            <Ronaldo x={ronX} y={ronY} escala={ronEsc} expr={ronExpr as "confuso"} pose={ronPose as "cartas"} />
          </g>
          {chegou ? (
            <g transform={`translate(0,${(1 - wanSobe) * 900 + bob("wan") * 0.5})`}>
              <Wan x={540} y={1700} escala={1.12} expr={entre(s, I(14), I(15)) ? "sorriso" : entre(s, I(12), I(14)) || s >= I(15) ? "serio" : "calmo"} pose={entre(s, I(8) - 0.1, I(10)) ? "livro" : "bracos"} brilhoLivro={entre(s, I(8), I(10))} />
            </g>
          ) : null}
        </svg>
        {/* luz da Bíblia */}
        {[3, 13].map((id) =>
          entre(s, I(id) - 0.05, I(id + 1)) ? (
            <div key={id} style={{ position: "absolute", left: id === 3 ? 560 : 260, top: id === 3 ? 820 : 1180, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,.85), rgba(255,240,190,0) 70%)", opacity: prog(s, I(id), 0.3) * (1 - prog(s, I(id + 1) - 0.4, 0.4)) }} />
          ) : null,
        )}
        {/* a Aliança acorda: marcadores de simpatia nas árvores */}
        {s >= W(15, "simpatia…") - 0.1 ? (
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            {[
              [90, 930, 0],
              [980, 880, 0.12],
              [260, 1180, 0.24],
              [820, 1190, 0.36],
            ].map(([x, y, d]) => {
              const k = Math.max(0.001, mola(s, W(15, "simpatia…") - 0.1 + d));
              return (
                <g key={x} transform={`translate(${x},${y}) scale(${k})`}>
                  <circle r={70} fill={VERDE} opacity={0.25} />
                  <circle r={40} fill={VERDE} stroke="#0f1115" strokeWidth={5} />
                  <path d="M-16,8 C-16,-14 4,-22 18,-20 C18,-4 8,14 -12,14 Z" fill="#0f1115" />
                </g>
              );
            })}
          </svg>
        ) : null}
      </AbsoluteFill>

      {/* ====== grafismos fixos ====== */}
      {s < I(2) ? (
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(15,17,21,.9) 0px, rgba(15,17,21,.6) 560px, rgba(15,17,21,0) 820px)" }}>
          <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 210, opacity: 1 - prog(s, I(2) - 0.35, 0.25, SAI) }}>
            <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ep. 2 · Root</div>
            <div style={{ ...tipo.titulo, fontSize: 104, color: cor.texto, marginTop: 18 }}>
              As <span style={{ color: AZUL }}>Rapinas</span> pousaram.
            </div>
            <div style={{ ...tipo.apoio, color: cor.texto, marginTop: 22, opacity: prog(s, W(1, "Só"), 0.3) }}>
              Elas só obedecem ao <span style={{ color: AZUL, fontWeight: 800 }}>Decreto</span>.
            </div>
          </div>
        </AbsoluteFill>
      ) : null}
      {/* 6 guerreiros, 1 ninho */}
      {entre(s, W(2, "Seis") - 0.1, I(3) - 0.05) ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 250, textAlign: "center", opacity: 1 - prog(s, I(3) - 0.3, 0.25, SAI) }}>
          <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 260, lineHeight: 1, color: AZUL, transform: `scale(${0.6 + 0.4 * prog(s, W(2, "Seis"), 0.35)})` }}>6</div>
          <div style={{ ...tipo.rotulo, fontSize: 34, color: cor.texto, marginTop: 6 }}>guerreiros das Rapinas</div>
          <div style={{ ...tipo.rotulo, fontSize: 34, color: cor.texto, marginTop: 10, opacity: prog(s, W(2, "ninho.") - 0.05, 0.3) }}>+ 1 ninho</div>
        </div>
      ) : null}
      <Decreto s={s} />
      {/* chegada do Wan */}
      {entre(s, I(7), I(8) - 0.05) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 230 }}>
          <div style={{ ...tipo.titulo, fontSize: 112, color: cor.ouro, opacity: prog(s, tWan + 0.05, 0.2), transform: `translateY(${(1 - prog(s, tWan + 0.05, 0.4)) * 40}px)` }}>O Wan já sabia a resposta.</div>
        </div>
      ) : null}
      {/* dica real: o tumulto */}
      {entre(s, I(8), I(10) - 0.15) ? (
        <div style={{ position: "absolute", left: 60, right: 60, top: 200, background: "rgba(15,17,21,.93)", border: `4px solid ${cor.ouro}`, borderRadius: 30, padding: "34px 42px", opacity: prog(s, I(8), 0.35) * (1 - prog(s, I(10) - 0.4, 0.25, SAI)), transform: `translateY(${(1 - prog(s, I(8), 0.45)) * 40}px)` }}>
          <div style={{ ...tipo.rotulo, color: cor.ouro }}>Dica real</div>
          <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 48, lineHeight: 1.18, color: cor.texto, marginTop: 12 }}>
            Se uma ordem do Decreto não puder ser cumprida, as Rapinas caem em <span style={{ color: VERMELHO, opacity: s >= W(8, "tumulto.") ? 1 : 0.4 }}>tumulto</span>:
          </div>
          {[
            ["−1 PV por pássaro no Decreto", "Vizires incluídos", W(9, "ponto")],
            ["Descartam as ordens", "menos os 2 Vizires", W(9, "descartam")],
            ["Trocam de líder", "o novo líder reposiciona os Vizires", W(9, "trocam")],
          ].map(([a, b, t]) => (
            <div key={a as string} style={{ display: "flex", gap: 18, alignItems: "baseline", marginTop: 18, opacity: prog(s, (t as number) - 0.1, 0.3), transform: `translateX(${(1 - prog(s, (t as number) - 0.1, 0.4)) * 30}px)` }}>
              <div style={{ width: 16, height: 16, borderRadius: 8, background: VERMELHO, flex: "none", transform: "translateY(-6px)" }} />
              <div>
                <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 42, color: cor.texto }}>{a}</div>
                <div style={{ fontFamily: fonte, fontWeight: 600, fontSize: 30, color: cor.textoSuave }}>{b}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {/* cliffhanger */}
      {entre(s, I(15), I(16) - 0.09) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 230, opacity: prog(s, I(15), 0.35) }}>
          <div style={{ ...tipo.apoio, color: cor.texto }}>No fundo da floresta, alguém espalhava simpatia…</div>
          <div style={{ ...tipo.titulo, fontSize: 104, color: VERDE, marginTop: 16, opacity: prog(s, W(15, "Aliança") - 0.1, 0.3) }}>a Aliança acordou.</div>
        </div>
      ) : null}
      {/* cartela final */}
      {s >= I(16) - 0.14 ? (
        <AbsoluteFill style={{ background: `rgba(15,17,21,${0.82 * prog(s, I(16) - 0.14, 0.4)})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 360, textAlign: "center", opacity: prog(s, I(16) - 0.04, 0.4) }}>
            <div style={{ ...tipo.rotulo, color: cor.ouro }}>Ep. 2 · Root</div>
            <LinkTutorial op={prog(s, I(16), 0.4)} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
              <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 52, color: cor.fundo, background: cor.marca, padding: "30px 64px", borderRadius: 999, transform: `scale(${0.8 + 0.2 * prog(s, W(16, "segue") - 0.1, 0.5)})`, opacity: prog(s, W(16, "segue") - 0.1, 0.3) }}>Segue pra ver a Parte 3</div>
            </div>
            <Img src={staticFile("img/logo.webp")} style={{ width: 320, marginTop: 56, opacity: prog(s, I(16) + 0.4, 0.5) }} />
            <div style={{ ...tipo.rotulo, fontSize: 26, color: cor.textoSuave, marginTop: 46, opacity: prog(s, I(16) + 0.6, 0.5) }}>História de ficção · regras de verdade do manual</div>
            <div style={{ ...tipo.rotulo, fontSize: 24, color: cor.textoSuave, marginTop: 14, opacity: prog(s, I(16) + 0.6, 0.5) }}>Peças dos gatos: foto MeepleBR</div>
          </div>
        </AbsoluteFill>
      ) : null}
      {s < tirou + 0.3 ? <div style={{ position: "absolute", right: 80, top: 1110, ...tipo.rotulo, fontSize: 24, color: "#f4f1ea", textShadow: "0 2px 10px rgba(0,0,0,.6)", opacity: s < I(16) ? 1 : 0 }}>Gatos: foto MeepleBR</div> : null}

      <Legenda s={s} />
      <Granulado forca={0.12} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, tWan - 0.4, tWan, tWan + 0.7, I(12) - 0.1, I(12) + 0.6, FIM2 - 1.2, FIM2 - 0.1], [0, 0.12, 0.12, 0.03, 0.12, 0.04, 0.12, 0.12, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.2) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      <Sequence from={Math.round((W(1, "pousaram…") - 0.5) * fps)} durationInFrames={Math.round(1.2 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.45} /></Sequence>
      {aves.map((a, i) => (
        <Sequence key={i} from={Math.round((W(2, "Seis") - 0.08 + a.d) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.32} /></Sequence>
      ))}
      <Sequence from={Math.round((I(3) - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.4} /></Sequence>
      {COLUNAS.map((c) => (
        <Sequence key={c.nome} from={Math.round((W(5, c.palavra) - 0.1) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.45} /></Sequence>
      ))}
      <Sequence from={Math.round((tWan - 6) * fps)} durationInFrames={Math.round(6 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} trimBefore={Math.round(4 * fps)} volume={0.2} /></Sequence>
      <Sequence from={Math.round((tWan - 0.05) * fps)} durationInFrames={Math.round(2.1 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.36} /></Sequence>
      <Sequence from={Math.round((W(11, "falhou.") - 0.08) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.5} /></Sequence>
      <Sequence from={Math.round((I(12) - 0.06) * fps)} durationInFrames={Math.round(2.1 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.34} /></Sequence>
      <Sequence from={Math.round((I(13) - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.35} /></Sequence>
      <Sequence from={Math.round((W(15, "simpatia…") - 0.12) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.35} /></Sequence>
    </AbsoluteFill>
  );
};
