import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Granulado } from "../cenario/Cenario";
import { Lukita, Wan } from "../personagens/Personagens";
import { cor, fonte, tipo } from "../tema";
import { CIANO, Espaco, Legenda, MUNDO_QUADRADO, Nave, SAI, SEGURO, UI_QUADRADO, VERDE, VERMELHO, entre, mola, pos, prog } from "../ae/pecas";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "E se você acordasse dentro de SETI": o Lukita sabe todas as regras, mas passa a madrugada tentando ganhar
// do Rival (o bot do modo solo) por um ponto. O Wan desce de um disco-voador para lembrá-lo de se divertir.
// Regras: manual oficial da CGE (seti-rules-en.pdf, jan/2025), pp. 7–22 (modo solo: p. 22).
// Roteiro segue video/ROTEIRO_REFERENCIAS.md: gancho em 3 s, virada dentro do mundo (o disco desce e é o Wan),
// objeto-símbolo que volta mudado (o placar de "um ponto"), comédia de situação, final interativo.
export const FIM_SETI = DURACAO + 2.4;

const GIZ = "#f2efe4";
const LOUSA = "#24453a";

// Quadro-negro do observatório: as regras moram nele (dentro do mundo), escritas a giz.
const Quadro: React.FC<{ op: number; titulo?: string; children: React.ReactNode; top?: number; altura?: number }> = ({ op, titulo, children, top = 300, altura = 840 }) =>
  op <= 0 ? null : (
    <div style={{ position: "absolute", left: 50, right: 50, top, height: altura, opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
      <div style={{ position: "absolute", inset: 0, background: "#7a5233", borderRadius: 22, boxShadow: "0 18px 50px rgba(0,0,0,.55)" }} />
      <div style={{ position: "absolute", inset: 18, background: `radial-gradient(ellipse at 40% 30%, #2d5547, ${LOUSA} 70%)`, borderRadius: 10, overflow: "hidden" }}>
        {/* fantasmas da aula anterior, bem apagados (Claude Drawing: quadro-negro) */}
        <div style={{ position: "absolute", right: 30, bottom: 20, fontFamily: fonte, fontWeight: 700, fontSize: 34, color: GIZ, opacity: 0.07, transform: "rotate(-4deg)" }}>v = Δs / Δt</div>
        <div style={{ position: "absolute", left: 24, bottom: 60, fontFamily: fonte, fontWeight: 700, fontSize: 30, color: GIZ, opacity: 0.06, transform: "rotate(3deg)" }}>∑F = m·a</div>
        <div style={{ position: "absolute", inset: 0 }}>
          {titulo ? <div style={{ position: "absolute", left: 36, top: 26, fontFamily: fonte, fontWeight: 900, fontSize: 34, letterSpacing: "0.06em", color: "#f6d77a", textTransform: "uppercase" }}>{titulo}</div> : null}
          {children}
        </div>
      </div>
      {/* calha com giz e apagador */}
      <div style={{ position: "absolute", left: 60, right: 60, bottom: -10, height: 18, background: "#5e3f27", borderRadius: 6 }} />
      <div style={{ position: "absolute", right: 120, bottom: -4, width: 90, height: 26, background: "#3a3f4a", borderRadius: 6 }} />
      <div style={{ position: "absolute", left: 150, bottom: 0, width: 46, height: 12, background: GIZ, borderRadius: 4 }} />
    </div>
  );

// Texto a giz que aparece da esquerda para a direita (escrito, não "fade").
const Giz: React.FC<{ s: number; t0: number; d?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ s, t0, d = 0.6, style, children }) => {
  const k = prog(s, t0, d, Easing.linear);
  if (k <= 0) return null;
  return <div style={{ fontFamily: fonte, fontWeight: 800, color: GIZ, filter: "url(#giz)", clipPath: `inset(0 ${100 - 100 * k}% 0 0)`, ...style }}>{children}</div>;
};

// Disco-voador: desenho nosso.
const Disco: React.FC<{ x: number; y: number; esc?: number; luz?: number; ouro?: boolean }> = ({ x, y, esc = 1, luz = 0, ouro }) => (
  <g transform={`translate(${x},${y}) scale(${pos(esc)})`}>
    {luz > 0 ? <path d="M-70,30 L-260,1100 L260,1100 L70,30 Z" fill={ouro ? "#ffe08a" : "#8ff5d2"} opacity={0.28 * luz} /> : null}
    <ellipse cx={0} cy={0} rx={190} ry={52} fill="#5d6b86" />
    <ellipse cx={0} cy={-8} rx={190} ry={40} fill="#7c8aa6" />
    <path d="M-90,-20 C-80,-110 80,-110 90,-20 Z" fill="#9ff0e0" opacity={0.85} />
    {[-130, -65, 0, 65, 130].map((lx, i) => <circle key={lx} cx={lx} cy={18} r={11} fill={i % 2 ? "#ffd977" : "#ff6b5b"} />)}
  </g>
);
// Radiotelescópio do observatório (gira devagar).
const Antena: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M-30,0 L-12,-150 L12,-150 L30,0 Z" fill="#3a4258" />
    <g transform={`translate(0,-160) rotate(${-25 + 10 * Math.sin(s * 0.6)})`}>
      <path d="M-130,0 C-110,80 110,80 130,0 Z" fill="#c9d2dc" />
      <path d="M0,0 C40,60 110,70 130,0 Z" fill="#aab4c0" />
      <path d="M0,40 L0,-80" stroke="#c9d2dc" strokeWidth={8} />
      <circle cx={0} cy={-86} r={12} fill="#ff6b5b" opacity={0.6 + 0.4 * Math.sin(s * 6)} />
    </g>
  </g>
);

// Ícones das 3 pistas de vida (desenho nosso): sinal do céu, pouso em planeta, dados analisados.
const IconePista: React.FC<{ i: number; t?: number }> = ({ i, t = 90 }) => (
  <svg width={t} height={t} viewBox="-50 -50 100 100">
    {i === 0 ? (
      <g fill="none" stroke="#ff8fa3" strokeWidth={7} strokeLinecap="round">
        <circle r={8} fill="#ff8fa3" /><path d="M-20,-20 a28,28 0 0 0 0,40 M20,-20 a28,28 0 0 1 0,40 M-34,-34 a48,48 0 0 0 0,68 M34,-34 a48,48 0 0 1 0,68" />
      </g>
    ) : i === 1 ? (
      <g><circle r={30} fill="#ffd977" /><ellipse rx={46} ry={12} fill="none" stroke="#f2efe4" strokeWidth={6} transform="rotate(-18)" /></g>
    ) : (
      <g><rect x={-30} y={-30} width={60} height={60} rx={8} fill="#8fb4ff" /><path d="M-30,-14 h-12 M-30,14 h-12 M30,-14 h12 M30,14 h12 M-14,-30 v-12 M14,-30 v-12 M-14,30 v12 M14,30 v12" stroke="#8fb4ff" strokeWidth={6} /></g>
    )}
  </svg>
);

// O Rival: o bot do modo solo, desenhado como um robô de placar (desenho nosso).
const Rival: React.FC<{ x: number; y: number; esc?: number; s: number; rosto?: "olhos" | "reto" }> = ({ x, y, esc = 1, s, rosto = "olhos" }) => (
  <g transform={`translate(${x},${y}) scale(${pos(esc)})`}>
    <ellipse cx={0} cy={0} rx={120} ry={18} fill="#000" opacity={0.22} />
    <rect x={-70} y={-200} width={50} height={200} rx={14} fill="#5d6b86" />
    <rect x={20} y={-200} width={50} height={200} rx={14} fill="#4d5a73" />
    <rect x={-110} y={-470} width={220} height={290} rx={30} fill="#7c8aa6" />
    <rect x={0} y={-470} width={110} height={290} rx={30} fill="#6b7893" />
    <rect x={-150} y={-440} width={40} height={170} rx={18} fill="#5d6b86" />
    <rect x={110} y={-440} width={40} height={170} rx={18} fill="#4d5a73" />
    <circle cx={0} cy={-320} r={34} fill="#3a4258" />
    <circle cx={0} cy={-320} r={14} fill="#ff6b5b" opacity={0.5 + 0.5 * Math.sin(s * 3)} />
    {/* cabeça com tela */}
    <rect x={-120} y={-680} width={240} height={190} rx={34} fill="#3a4258" />
    <rect x={-100} y={-662} width={200} height={154} rx={20} fill="#0f1a24" />
    {rosto === "olhos" ? (
      <g fill="#6ee7ff"><rect x={-62} y={-610} width={36} height={50} rx={8} /><rect x={26} y={-610} width={36} height={50} rx={8} /></g>
    ) : (
      <path d="M-60,-585 h120" stroke="#6ee7ff" strokeWidth={14} strokeLinecap="round" />
    )}
    <path d="M-60,-680 L-80,-740 M60,-680 L80,-740" stroke="#5d6b86" strokeWidth={10} strokeLinecap="round" />
    <circle cx={-80} cy={-746} r={12} fill="#ffd977" /><circle cx={80} cy={-746} r={12} fill="#ffd977" />
  </g>
);

// Placar da parede do observatório: Lukita × Rival.
const Placar: React.FC<{ x: number; y: number; l: number; r: number; brilho?: number }> = ({ x, y, l, r, brilho = 0 }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={-220} y={-70} width={440} height={140} rx={20} fill="#0f1a24" stroke="#3a4258" strokeWidth={8} />
    <text x={-120} y={-30} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={24} fill="#a1a9b5">LUKITA</text>
    <text x={120} y={-30} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={24} fill="#a1a9b5">RIVAL</text>
    <text x={-120} y={44} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={64} fill={brilho > 0 ? "#ffd977" : "#6ee7ff"}>{l}</text>
    <text x={0} y={40} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={44} fill="#a1a9b5">×</text>
    <text x={120} y={44} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={64} fill="#6ee7ff">{r}</text>
    {brilho > 0 ? <rect x={-220} y={-70} width={440} height={140} rx={20} fill="none" stroke="#ffd977" strokeWidth={8} opacity={brilho} /> : null}
  </g>
);

const Xicara: React.FC<{ x: number; y: number; k: number }> = ({ x, y, k }) => (
  <g transform={`translate(${x},${y}) scale(${pos(k)})`}>
    <path d="M-26,-40 L26,-40 L20,0 L-20,0 Z" fill="#f4f6f8" />
    <path d="M26,-32 q18,4 0,22" stroke="#f4f6f8" strokeWidth={6} fill="none" />
    <path d="M-10,-52 q6,-8 0,-16 M8,-52 q6,-8 0,-16" stroke="#cdd5df" strokeWidth={4} fill="none" opacity={0.7} />
  </g>
);

export const Seti: React.FC<{ quadrado?: boolean }> = ({ quadrado = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const cena = (a: number, b: number) => prog(s, a - 0.1, 0.35) * (1 - prog(s, b - 0.3, 0.25, SAI));
  const vis = (a: number, b: number) => entre(s, a - 0.1, b);

  // posições (versão quadrada: personagens nos cantos de baixo)
  const LX = quadrado ? 150 : 270;
  const RX = quadrado ? 960 : 880;
  const WX = quadrado ? 560 : 590;
  const escL = quadrado ? 0.52 : 0.62;
  const escR = quadrado ? 0.62 : 0.72;
  const escW = quadrado ? 0.54 : 0.64;

  // ----- marcos da história -----
  const tWan = W(9, "Wan.") - 0.12; // o Wan sai do disco: a virada
  const tDisco = W(9, "teto") - 0.1;
  const tPonto = W(13, "ponto.") - 0.1; // ganhou por um ponto
  const tTry = I(14) - 0.05;
  const desce = prog(s, tWan - 0.9, 0.9, Easing.out(Easing.cubic)); // Wan desce no feixe
  const naCena = s >= tWan - 0.9;
  const discoY = -260 + 470 * prog(s, tDisco, 1.4, Easing.out(Easing.cubic));
  const discoVai = prog(s, I(10) + 1.2, 1.4, Easing.in(Easing.quad));
  const impacto = entre(s, tWan, tWan + 0.07);

  // ----- Lukita -----
  const fala = (id: number) => entre(s, I(id) - 0.05, I(id + 1) - 0.05);
  const lukExpr = entre(s, tDisco, I(10)) ? "apavorado" : s >= tTry + 0.4 ? "feliz" : "empolgado";
  const lukPose = fala(3) || fala(4) || fala(5) || fala(6) || fala(8) || fala(12) ? "giz" : "normal";
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -9 : 0);
  const surge = prog(s, I(2) - 0.2, 0.6);
  const cansado = entre(s, I(7), tDisco) ? 1 : 0; // madrugada: tremedeira de café
  const treme = cansado ? Math.sin(s * 40) * 2.5 : 0;

  // ----- placar -----
  const placarL = s >= tPonto ? 62 : 61;
  const tremor = entre(s, tWan, tWan + 0.45) ? Math.sin(s * 80) * 14 * (1 - prog(s, tWan, 0.45)) : 0;
  const zoom = fala(10) || entre(s, tTry, I(15) - 0.1) ? 1 + 0.35 * prog(s, fala(10) ? I(10) : tTry, 0.25) : 1;
  const camOrig = `${WX}px 1450px`;

  return (
    <AbsoluteFill style={{ backgroundColor: "#070914", fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      {/* filtro de giz: bordas quebradas e falhas */}
      <svg width={0} height={0} style={{ position: "absolute" }}>
        <filter id="giz">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale={1.6} xChannelSelector="R" yChannelSelector="G" result="tremido" />
          <feColorMatrix in="ruido" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.9 1.45" result="falhas" />
          <feComposite in="tremido" in2="falhas" operator="in" />
        </filter>
      </svg>

      {/* ====== mundo ====== */}
      <div style={quadrado ? MUNDO_QUADRADO : { position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }}>
        <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
          <Espaco s={s} escuro={entre(s, I(7), tDisco) ? 0.25 : s < I(2) ? 0.3 * (1 - prog(s, I(2) - 0.3, 0.6)) : 0} />
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <Antena x={quadrado ? 760 : 560} y={1560} s={s} />
            {/* placar na parede */}
            {/* só no começo (o empate) e na vitória por um ponto; fica no vão entre os textos e a legenda */}
            {s < I(4) - 0.1 || (!quadrado && s >= tPonto - 0.1 && s < I(15)) ? (
              <g opacity={s < I(4) ? 1 - prog(s, I(4) - 0.4, 0.3) : prog(s, tPonto - 0.1, 0.3)}>
                <Placar x={540} y={quadrado ? (s < I(2) ? 1300 : 2400) : 990} l={placarL} r={61} brilho={s >= tPonto ? 1 - prog(s, tPonto + 1.2, 0.6) : 0} />
              </g>
            ) : null}
            {/* madrugada: relógio e cafés */}
            {s >= I(7) - 0.1 && s < tDisco + 0.4 ? (
              <g opacity={prog(s, I(7) - 0.1, 0.3) * (1 - prog(s, tDisco, 0.4))}>
                <g transform={`translate(${quadrado ? 300 : 180},${quadrado ? 1150 : 1080})`}>
                  <circle r={62} fill="#f4f6f8" stroke="#3a4258" strokeWidth={8} />
                  <path d={`M0,0 L0,-42`} stroke="#1b1d24" strokeWidth={7} strokeLinecap="round" transform={`rotate(${90 + 30 * prog(s, W(7, "manhã."), 0.5)})`} />
                  <path d="M0,0 L0,-30" stroke="#1b1d24" strokeWidth={9} strokeLinecap="round" transform="rotate(90)" />
                  <text x={0} y={100} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={34} fill="#f4f6f8">3:00</text>
                </g>
                {Array.from({ length: 7 }, (_, i) => (
                  <Xicara key={i} x={(quadrado ? 300 : 380) + (i % 4) * 58} y={(quadrado ? 1730 : 1550) - Math.floor(i / 4) * 44} k={mola(s, W(7, "cafés.") - 0.6 + i * 0.09)} />
                ))}
              </g>
            ) : null}
            {/* disco-voador: desce, entrega o Wan e vai embora */}
            {s >= tDisco - 0.2 ? <Disco x={WX} y={discoY - 900 * discoVai} esc={1.1} luz={entre(s, tWan - 1.1, I(10) + 1) ? prog(s, tWan - 1.1, 0.3) * (1 - prog(s, I(10) + 0.6, 0.4)) : 0} ouro /> : null}
          </svg>
          {naCena ? <Aura x={WX} y={1430} raio={(s < tWan + 1.5 ? 320 : 270) + 12 * Math.sin(s * 2.5)} seed={6} /> : null}
          {/* raios da chegada do Wan */}
          {entre(s, tWan, tWan + 2.4) ? (
            <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0, opacity: prog(s, tWan, 0.2) * (1 - prog(s, tWan + 1.6, 0.8)) }}>
              <defs>
                <linearGradient id="rs" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ffe9a6" stopOpacity={0.9} /><stop offset="1" stopColor="#e3b23c" stopOpacity={0} /></linearGradient>
              </defs>
              <g transform={`translate(${WX},1300) rotate(${(s - tWan) * 8})`}>
                {Array.from({ length: 22 }, (_, i) => (
                  <path key={i} d={`M0,-14 L${i % 2 ? 1300 : 1050},-${i % 2 ? 46 : 26} L${i % 2 ? 1300 : 1050},${i % 2 ? 46 : 26} L0,14 Z`} fill="url(#rs)" opacity={i % 3 ? 0.5 : 0.8} transform={`rotate(${(360 / 22) * i})`} />
                ))}
              </g>
              <ellipse cx={WX} cy={1840} rx={140 + 340 * prog(s, tWan + 0.05, 0.6)} ry={22 + 44 * prog(s, tWan + 0.05, 0.6)} fill="none" stroke="#ffd977" strokeWidth={10} opacity={1 - prog(s, tWan + 0.35, 1.2)} />
            </svg>
          ) : null}
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <Rival x={RX} y={1840} esc={escR * pos(prog(s, 0.1, 0.5))} s={s} rosto={fala(11) || s >= tPonto ? "reto" : "olhos"} />
            <g transform={`translate(${treme},${bob("lukita") * surge})`} opacity={surge}>
              <Lukita x={LX} y={1835} escala={escL} expr={lukExpr as "empolgado"} pose={lukPose as "giz"} formulaCerta />
            </g>
            {naCena ? (
              <g transform={`translate(0,${-(1 - desce) * 1100 + bob("wan")})`}>
                <Wan x={WX} y={1835} escala={escW} expr={entre(s, tTry, I(15)) ? "serio" : fala(11) ? "sorriso" : "calmo"} pose="bracos" />
              </g>
            ) : null}
          </svg>
        </AbsoluteFill>
      </div>

      {/* ====== textos e quadro-negro: dentro da zona segura ====== */}
      <AbsoluteFill style={quadrado ? UI_QUADRADO : SEGURO}>
        {/* gancho */}
        {s < I(2) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 220, opacity: 1 - prog(s, I(2) - 0.3, 0.25, SAI) }}>
            <div style={{ ...tipo.rotulo, color: CIANO }}>Ep. 1 · SETI</div>
            <div style={{ ...tipo.titulo, fontSize: 100, color: cor.texto, marginTop: 14 }}>
              E se você acordasse dentro de <span style={{ color: CIANO }}>SETI</span>…
            </div>
            <div style={{ ...tipo.apoio, fontSize: 54, color: CIANO, fontWeight: 800, marginTop: 20, opacity: prog(s, W(1, "jogando") - 0.1, 0.3) }}>…jogando contra um robô que não erra nunca?</div>
          </div>
        ) : null}
        {/* sabe todas as regras */}
        {entre(s, W(2, "regras") - 0.2, I(3) - 0.05) ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", transform: `scale(${pos(mola(s, W(2, "regras") - 0.2))})` }}>
            <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 150, color: VERDE }}>100%</div>
            <div style={{ ...tipo.rotulo, color: cor.texto, fontSize: 36, marginTop: 6 }}>das regras de cor</div>
            <div style={{ ...tipo.apoio, color: "#ff8fa3", fontSize: 46, fontWeight: 800, marginTop: 40, opacity: prog(s, W(2, "outro.") - 0.2, 0.3) }}>o problema é outro…</div>
          </div>
        ) : null}
        {/* modo solo: um ponto */}
        {entre(s, I(3), I(4) - 0.05) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 260, opacity: prog(s, I(3), 0.3) }}>
            <div style={{ ...tipo.rotulo, color: CIANO }}>Modo solo · você contra o Rival</div>
            <div style={{ ...tipo.titulo, fontSize: 120, color: cor.ouro, marginTop: 20, transform: `scale(${pos(mola(s, W(3, "ponto,") - 0.1))})`, transformOrigin: "left center" }}>+1 ponto</div>
            <div style={{ ...tipo.apoio, fontSize: 46, color: cor.texto, marginTop: 10, opacity: prog(s, W(3, "noite") - 0.1, 0.3) }}>nem que custe a noite inteira</div>
          </div>
        ) : null}

        {/* o turno */}
        {vis(I(4), I(5)) ? (
          <Quadro op={cena(I(4), I(5))} titulo="Seu turno">
            <Giz s={s} t0={W(4, "principal") - 0.5} style={{ position: "absolute", left: 40, top: 100, fontSize: 64 }}>1 ação principal</Giz>
            <div style={{ position: "absolute", left: 40, right: 40, top: 200, display: "flex", flexWrap: "wrap", gap: 14 }}>
              {["Lançar", "Orbitar", "Pousar", "Escanear", "Analisar", "Carta", "Tecnologia", "Passar"].map((a, i) => (
                <div key={a} style={{ fontFamily: fonte, fontWeight: 800, fontSize: 36, color: GIZ, border: `3px solid ${GIZ}`, borderRadius: 14, padding: "8px 18px", opacity: prog(s, W(4, "principal") + i * 0.08, 0.2) }}>{a}</div>
              ))}
            </div>
            <Giz s={s} t0={W(4, "energia,") - 0.3} style={{ position: "absolute", left: 40, top: 470, fontSize: 48, color: "#9ff0e0" }}>ação livre: 1 energia = 1 movimento</Giz>
            <svg width={940} height={200} style={{ position: "absolute", left: 0, top: 560 }}>
              {[0, 1, 2, 3].map((i) => <circle key={i} cx={160 + i * 200} cy={100} r={46} fill="none" stroke={GIZ} strokeWidth={4} opacity={0.7} />)}
              <Nave x={160 + 600 * prog(s, W(4, "energia,"), 1.6, Easing.inOut(Easing.quad))} y={100} esc={0.55} giro={90} c={VERDE} />
            </svg>
          </Quadro>
        ) : null}

        {/* escanear */}
        {vis(I(5), I(6)) ? (
          <Quadro op={cena(I(5), I(6))} titulo="Escanear">
            <Giz s={s} t0={W(5, "crédito") - 0.3} style={{ position: "absolute", left: 40, top: 100, fontSize: 54 }}>1 crédito + 2 energias</Giz>
            <svg width={940} height={600} style={{ position: "absolute", left: 0, top: 190 }}>
              <path d="M470,560 L170,120 A420,420 0 0 1 770,120 Z" fill="rgba(242,239,228,.06)" stroke={GIZ} strokeWidth={4} />
              {[0, 1, 2, 3, 4].map((i) => {
                const t = W(5, "energias.") + 0.2 + i * 0.25;
                const marcado = s >= t;
                const meu = i !== 2;
                const fim = s >= W(5, "Fechou") - 0.1;
                return (
                  <g key={i} transform={`translate(${250 + i * 110},190)`}>
                    {!marcado ? <rect x={-34} y={-34} width={68} height={68} rx={12} fill="#9ff0e0" opacity={0.85} /> : <circle r={34 * Math.max(0.6, mola(s, t))} fill={meu ? VERDE : "#8fb4ff"} stroke="#0b0d1a" strokeWidth={4} />}
                    {fim && meu ? <circle r={44} fill="none" stroke="#f6d77a" strokeWidth={5} opacity={prog(s, W(5, "vence."), 0.3)} /> : null}
                  </g>
                );
              })}
              <text x={470} y={320} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={38} fill={GIZ} opacity={prog(s, W(5, "energias."), 0.4)}>cada sinal: tira 1 dado do setor</text>
              {s >= W(5, "vence.") - 0.1 ? (
                <g transform={`translate(470,450) scale(${pos(mola(s, W(5, "vence.") - 0.1))})`}>
                  <text textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={60} fill="#f6d77a">mais marcadores vence</text>
                </g>
              ) : null}
            </svg>
          </Quadro>
        ) : null}

        {/* pousar em Marte */}
        {vis(I(6), I(7)) ? (
          <Quadro op={cena(I(6), I(7))} titulo="Pousar">
            <svg width={940} height={720} style={{ position: "absolute", left: 0, top: 80 }}>
              <circle cx={300} cy={330} r={170} fill="#c4643f" />
              <path d="M130,330 A170,170 0 0 0 470,330 Z" fill="#000" opacity={0.2} />
              <text x={300} y={560} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={38} fill={GIZ}>Marte</text>
              <Nave x={300} y={60 + 140 * prog(s, W(6, "Marte:") - 0.2, 0.9, Easing.out(Easing.quad))} esc={0.7} giro={180} />
              <g transform="translate(600,150)">
                <text x={0} y={-20} fontFamily={fonte} fontWeight={800} fontSize={38} fill={GIZ}>energia</text>
                {[0, 1, 2].map((i) => {
                  const gasta = s >= W(6, "energias.") - 0.1 + i * 0.12;
                  return <rect key={i} x={i * 90} y={0} width={70} height={130} rx={10} fill={gasta ? "transparent" : "#ffd977"} stroke={GIZ} strokeWidth={4} />;
                })}
                <text x={0} y={190} fontFamily={fonte} fontWeight={900} fontSize={54} fill="#f6d77a" opacity={prog(s, W(6, "três"), 0.3)}>custa 3</text>
              </g>
              <g transform={`translate(600,450) scale(${pos(mola(s, W(6, "Pista") - 0.1))})`}>
                <rect x={0} y={-50} width={280} height={90} rx={16} fill="rgba(242,239,228,.08)" stroke={GIZ} strokeWidth={3} />
                <text x={30} y={10} fontFamily={fonte} fontWeight={900} fontSize={40} fill={GIZ}>pista de vida</text>
              </g>
              <text x={600} y={560} fontFamily={fonte} fontWeight={800} fontSize={42} fill={GIZ} opacity={prog(s, W(6, "pontos…"), 0.3)}>+ pontos</text>
              <text x={600} y={640} fontFamily={fonte} fontWeight={800} fontSize={38} fill="#9ff0e0" opacity={prog(s, W(6, "primeiro,"), 0.3)}>1º a pousar: + dados</text>
            </svg>
          </Quadro>
        ) : null}

        {/* madrugada */}
        {entre(s, I(7), I(8) - 0.05) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 260 }}>
            {[["3h da manhã", W(7, "manhã.")], ["40 cálculos", W(7, "cálculos.")], ["7 cafés", W(7, "cafés.")]].map(([t, k]) => (
              <div key={t as string} style={{ ...tipo.titulo, fontSize: 96, color: cor.texto, opacity: prog(s, (k as number) - 0.3, 0.2), transform: `translateX(${(1 - prog(s, (k as number) - 0.3, 0.3)) * -40}px)` }}>{t}</div>
            ))}
            <div style={{ ...tipo.apoio, fontSize: 50, color: CIANO, fontWeight: 800, marginTop: 24, opacity: prog(s, W(7, "piscou.") - 0.4, 0.3) }}>O Rival nem piscou.</div>
          </div>
        ) : null}
        {/* a última jogada */}
        {entre(s, I(8), tDisco) ? (
          <Quadro op={cena(I(8), tDisco + 0.3)} titulo="A jogada final">
            <div style={{ position: "absolute", left: 40, right: 40, top: 120, display: "flex", justifyContent: "space-between" }}>
              {["do céu", "do pouso", "dos dados"].map((n, i) => {
                const k = i < 2 ? 1 : mola(s, W(8, "analisar") - 0.1);
                return (
                  <div key={n} style={{ width: 250, height: 250, borderRadius: 24, border: `4px dashed ${GIZ}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ transform: `scale(${pos(k)})`, opacity: i < 2 ? 1 : 0.9 }}><IconePista i={i} /></div>
                    <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 34, color: GIZ, marginTop: 8 }}>pista {n}</div>
                  </div>
                );
              })}
            </div>
            <Giz s={s} t0={W(8, "descobrir") - 0.2} style={{ position: "absolute", left: 40, top: 470, fontSize: 56 }}>3 pistas = espécie descoberta</Giz>
            <Giz s={s} t0={W(8, "ganho") - 0.2} style={{ position: "absolute", left: 40, top: 580, fontSize: 64, color: "#f6d77a" }}>= +1 ponto!!!</Giz>
          </Quadro>
        ) : null}
        {/* chegada do Wan */}
        {entre(s, tWan - 0.1, I(10) - 0.05) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 250 }}>
            <div style={{ ...tipo.apoio, fontSize: 52, color: cor.texto }}>quem saiu do disco…</div>
            <div style={{ ...tipo.titulo, fontSize: 130, color: cor.ouro, marginTop: 10, transform: `scale(${pos(mola(s, tWan))})`, transformOrigin: "left center" }}>foi o Wan.</div>
          </div>
        ) : null}
        {/* um ponto, contra um robô */}
        {entre(s, I(10), I(11) - 0.05) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 260 }}>
            {[["3h da manhã.", W(10, "manhã.")], ["1 ponto.", W(10, "ponto.")], ["Contra um robô.", W(10, "robô.")]].map(([t, k]) => (
              <div key={t as string} style={{ ...tipo.titulo, fontSize: 92, color: cor.texto, opacity: prog(s, (k as number) - 0.35, 0.15) }}>{t}</div>
            ))}
          </div>
        ) : null}
        {/* joga pra se divertir */}
        {entre(s, I(11), I(12) - 0.05) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 280, opacity: prog(s, I(11), 0.3) }}>
            <div style={{ ...tipo.apoio, fontSize: 52, color: cor.textoSuave }}>O Rival não comemora.</div>
            <div style={{ ...tipo.titulo, fontSize: 110, color: cor.ouro, marginTop: 16, opacity: prog(s, W(11, "Joga") - 0.2, 0.3) }}>Joga pra se divertir.</div>
          </div>
        ) : null}
        {/* dica real: espécie descoberta */}
        {vis(I(13), I(14)) ? (
          <Quadro op={cena(I(13), I(14))} titulo="Dica real · espécie descoberta">
            <div style={{ position: "absolute", left: 40, right: 40, top: 120 }}>
              {[
                ["1. Vira o tabuleiro da espécie", W(13, "virou")],
                ["2. Lê a ficha: ela muda as regras", W(13, "ficha…")],
              ].map(([t, k]) => (
                <Giz key={t as string} s={s} t0={(k as number) - 0.2} d={0.6} style={{ fontSize: 52, lineHeight: 1.25, marginBottom: 30 }}>{t}</Giz>
              ))}
            </div>
            {s >= tPonto ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 440, textAlign: "center", transform: `scale(${pos(mola(s, tPonto))})` }}>
                <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 130, color: "#f6d77a" }}>62 × 61</div>
                <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 44, color: GIZ }}>ganhou por um ponto</div>
              </div>
            ) : null}
          </Quadro>
        ) : null}
        {/* TRYHARD */}
        {entre(s, tTry, I(15) - 0.05) ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 170, color: VERMELHO, transform: `rotate(-7deg) scale(${1.5 - 0.5 * prog(s, tTry, 0.18)})`, opacity: prog(s, tTry, 0.1), textShadow: "0 6px 0 #0b0d1a" }}>TRYHARD</div>
        ) : null}

        {/* final interativo */}
        {s >= I(15) - 0.1 ? (
          <AbsoluteFill>
            <div style={{ position: "absolute", left: -400, right: -400, top: -600, bottom: -700, background: `rgba(7,9,20,${0.86 * prog(s, I(15) - 0.1, 0.4)})` }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", opacity: prog(s, I(15), 0.4) }}>
              <div style={{ ...tipo.rotulo, color: CIANO }}>O desafio do Wan para o Ep. 2</div>
              <div style={{ ...tipo.titulo, fontSize: 70, color: cor.texto, marginTop: 20, padding: "0 40px" }}>
                Ganhar do Rival no nível máximo… ou <span style={{ color: VERMELHO }}>perder de propósito</span> pela primeira vez na vida?
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 60 }}>
                {[["GANHAR", VERDE, W(15, "GANHAR")], ["PERDER", VERMELHO, W(15, "PERDER.")]].map(([t, c, k]) => (
                  <div key={t as string} style={{ fontFamily: fonte, fontWeight: 900, fontSize: 70, color: "#0b0d1a", background: c as string, padding: "30px 50px", borderRadius: 24, transform: `scale(${pos(mola(s, (k as number) - 0.15))})` }}>{t}</div>
                ))}
              </div>
              <div style={{ ...tipo.apoio, fontSize: 44, color: cor.texto, marginTop: 50, opacity: prog(s, W(15, "Comenta") - 0.1, 0.3) }}>Comenta uma palavra: a maioria escreve o Ep. 2</div>
              <Img src={staticFile("img/logo.webp")} style={{ width: 280, marginTop: 56, opacity: prog(s, W(15, "PERDER.") + 0.5, 0.5) }} />
              <div style={{ ...tipo.rotulo, fontSize: 26, color: cor.textoSuave, marginTop: 30, opacity: prog(s, W(15, "PERDER.") + 0.7, 0.5) }}>Tutoriais: eliteboardgamers.com.br/como-jogar</div>
              <div style={{ ...tipo.rotulo, fontSize: 22, color: cor.textoSuave, marginTop: 14, opacity: prog(s, W(15, "PERDER.") + 0.7, 0.5) }}>História de ficção · regras do manual oficial (CGE)</div>
            </div>
          </AbsoluteFill>
        ) : null}

        <Legenda s={s} falas={FALAS} ocultar={[1, 15]} />
      </AbsoluteFill>
      <Granulado forca={0.1} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, tDisco - 0.3, tDisco, tWan - 0.1, tWan + 0.7, FIM_SETI - 1.4, FIM_SETI - 0.1], [0, 0.09, 0.09, 0.04, 0.03, 0.1, 0.09, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[I(4), I(5), I(6), I(8), I(13)].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.26} /></Sequence>
      ))}
      <Sequence from={Math.round((W(2, "regras") - 0.2) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.4} /></Sequence>
      {Array.from({ length: 7 }, (_, i) => (
        <Sequence key={i} from={Math.round((W(7, "cafés.") - 0.6 + i * 0.09) * fps)} durationInFrames={Math.round(0.4 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.18} /></Sequence>
      ))}
      <Sequence from={Math.round((tDisco - 0.1) * fps)} durationInFrames={Math.round(1.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.4} /></Sequence>
      <Sequence from={Math.round((tWan - 4) * fps)} durationInFrames={Math.round(4 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} trimBefore={Math.round(6 * fps)} volume={0.2} /></Sequence>
      <Sequence from={Math.round((tWan - 0.05) * fps)} durationInFrames={Math.round(2.1 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.34} /></Sequence>
      <Sequence from={Math.round((tPonto - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.35} /></Sequence>
      <Sequence from={Math.round((tTry - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
      <Sequence from={Math.round((W(15, "GANHAR") - 0.15) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((W(15, "PERDER.") - 0.15) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
    </AbsoluteFill>
  );
};
