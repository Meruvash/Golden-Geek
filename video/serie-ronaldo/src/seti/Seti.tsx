import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Granulado } from "../cenario/Cenario";
import { Lukita, Wan } from "../personagens/Personagens";
import { cor, fonte, tipo } from "../tema";
import { CIANO, Espaco, Legenda, MUNDO_QUADRADO, Nave, ROXO, SAI, SEGURO, UI_QUADRADO, VERDE, VERMELHO, entre, mola, pos, prog } from "../ae/pecas";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "E se você acordasse dentro de SETI": Lukita descobre uma espécie, os aliens vêm buscá-lo e o Wan o salva.
// Regras: manual oficial da CGE (seti-rules-en.pdf, jan/2025), pp. 7–20.
// Roteiro segue video/ROTEIRO_REFERENCIAS.md: gancho em 3 s, arco "homem no buraco", virada dentro do mundo
// (a espécie é descoberta), objeto-símbolo que volta mudado (a fórmula do jaleco), final interativo.
export const FIM_SETI = DURACAO + 2.2;

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

// Disco-voador e alienígenas: desenho nosso (não são as espécies do jogo).
const Disco: React.FC<{ x: number; y: number; esc?: number; luz?: number; ouro?: boolean }> = ({ x, y, esc = 1, luz = 0, ouro }) => (
  <g transform={`translate(${x},${y}) scale(${pos(esc)})`}>
    {luz > 0 ? <path d="M-70,30 L-260,1100 L260,1100 L70,30 Z" fill={ouro ? "#ffe08a" : "#8ff5d2"} opacity={0.28 * luz} /> : null}
    <ellipse cx={0} cy={0} rx={190} ry={52} fill="#5d6b86" />
    <ellipse cx={0} cy={-8} rx={190} ry={40} fill="#7c8aa6" />
    <path d="M-90,-20 C-80,-110 80,-110 90,-20 Z" fill="#9ff0e0" opacity={0.85} />
    {[-130, -65, 0, 65, 130].map((lx, i) => <circle key={lx} cx={lx} cy={18} r={11} fill={i % 2 ? "#ffd977" : "#ff6b5b"} />)}
  </g>
);
const Alien: React.FC<{ x: number; y: number; esc?: number; inclina?: number }> = ({ x, y, esc = 1, inclina = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${inclina}) scale(${pos(esc)})`}>
    <ellipse cx={0} cy={4} rx={60} ry={12} fill="#000" opacity={0.2} />
    <path d="M-46,0 C-56,-80 -40,-150 0,-160 C40,-150 56,-80 46,0 Z" fill="#6fd3b1" />
    <path d="M0,-160 C40,-150 56,-80 46,0 L0,0 Z" fill="#4fb895" />
    <path d="M-20,-158 L-34,-210 M20,-158 L34,-210" stroke="#4fb895" strokeWidth={8} strokeLinecap="round" />
    <circle cx={-34} cy={-212} r={11} fill="#ffd977" /><circle cx={34} cy={-212} r={11} fill="#ffd977" />
    {[-22, 0, 22].map((ex) => <g key={ex}><circle cx={ex} cy={-112} r={11} fill="#fff" /><circle cx={ex} cy={-110} r={5} fill="#1b1d24" /></g>)}
    <path d="M-14,-78 q14,10 28,0" stroke="#1b1d24" strokeWidth={5} fill="none" strokeLinecap="round" />
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

export const Seti: React.FC<{ quadrado?: boolean }> = ({ quadrado = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const cena = (a: number, b: number) => prog(s, a - 0.1, 0.35) * (1 - prog(s, b - 0.3, 0.25, SAI));
  const vis = (a: number, b: number) => entre(s, a - 0.1, b);

  // posições (versão quadrada: personagens nos cantos de baixo)
  const LX = quadrado ? 150 : 330;
  const WX = quadrado ? 950 : 800;
  const escL = quadrado ? 0.56 : 0.66;
  const escW = quadrado ? 0.58 : 0.66;

  // ----- marcos da história -----
  const tDesc = W(8, "descoberta.") - 0.1; // a espécie é descoberta: a virada
  const tFeixe = I(9) - 0.25; // o disco chega e ergue o Lukita
  const tWan = W(10, "Wan") - 0.09; // chegada épica
  const tPremio = I(13) - 0.1; // o feixe vira ouro: era um prêmio
  const tCorrige = W(14, "jaleco,") + 0.1; // a fórmula é corrigida
  const sobeL = s < tFeixe ? 0 : s < tPremio ? -260 * prog(s, tFeixe, 1.6, Easing.inOut(Easing.quad)) : -260 * (1 - prog(s, tPremio + 0.4, 1.4, Easing.inOut(Easing.quad)));
  const wanSobe = prog(s, tWan, 0.45);
  const chegouWan = s >= tWan;
  const disco = s >= tDesc - 0.2 && s < I(15) + 1;
  const discoY = -200 + 520 * prog(s, tDesc, 1.2, Easing.out(Easing.cubic));
  const alerta = entre(s, tDesc, tWan) ? 0.5 + 0.5 * Math.sin(s * 9) : 0;
  const impacto = entre(s, tWan, tWan + 0.07);

  // ----- Lukita -----
  const fala = (id: number) => entre(s, I(id) - 0.05, I(id + 1) - 0.05);
  const lukExpr = entre(s, tDesc + 0.4, tPremio + 0.6) ? "apavorado" : s >= tCorrige - 0.2 ? "feliz" : "empolgado";
  const lukPose = entre(s, tFeixe, tPremio + 1) ? "bracos" : fala(3) || fala(6) ? "giz" : "normal";
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -9 : 0);
  const corrigindo = prog(s, tCorrige, 0.6);
  const surge = prog(s, I(2) - 0.2, 0.6);

  // ----- câmera -----
  const zoomPeito = entre(s, W(2, "fórmula") - 0.15, I(3) - 0.1) || entre(s, tCorrige - 0.5, I(15) - 0.2);
  const zoom = zoomPeito ? 1 + 1.3 * prog(s, entre(s, tCorrige - 0.5, I(15)) ? tCorrige - 0.5 : W(2, "fórmula") - 0.15, 0.5) : entre(s, tWan, tWan + 1.4) ? 1.08 : 1;
  const camOrig = zoomPeito ? `${LX - 20}px 1500px` : `${WX}px 1450px`;
  const tremor = entre(s, tWan, tWan + 0.45) ? Math.sin(s * 80) * 14 * (1 - prog(s, tWan, 0.45)) : entre(s, tDesc, tDesc + 0.5) ? Math.sin(s * 60) * 8 : 0;

  // ----- ilhas de regra no quadro -----
  const pistasCheias = [W(8, "céu,"), W(8, "pouso,"), W(8, "dados.")];

  return (
    <AbsoluteFill style={{ backgroundColor: "#070914", fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      {/* filtro de giz: bordas quebradas e falhas (~15%) */}
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
          <Espaco s={s} alerta={alerta} escuro={s < I(2) ? 0.3 * (1 - prog(s, I(2) - 0.3, 0.6)) : 0} />
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <Antena x={quadrado ? 560 : 560} y={1560} s={s} />
            {disco ? <Disco x={LX + 40} y={discoY} esc={1.1} luz={s >= tFeixe ? prog(s, tFeixe, 0.4) : 0} ouro={s >= tPremio} /> : null}
          </svg>
          {chegouWan ? <Aura x={WX} y={1430 + (1 - wanSobe) * 500} raio={300 + 14 * Math.sin(s * 2.5)} seed={6} /> : null}
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
            {/* os alienígenas descem e se curvam: vieram entregar o prêmio */}
            {s >= tPremio - 0.2
              ? [0, 1].map((i) => {
                  const k = prog(s, tPremio + i * 0.2, 0.8, Easing.out(Easing.back(1.4)));
                  const ax = quadrado ? 400 + i * 260 : 520 + i * 150;
                  return <Alien key={i} x={ax} y={1860 - (1 - k) * 600} esc={0.55 * k} inclina={s > W(13, "prêmio.") ? -18 : 0} />;
                })
              : null}
            <g transform={`translate(0,${bob("lukita") * surge + sobeL})`} opacity={surge}>
              <Lukita x={LX} y={1835} escala={escL} expr={lukExpr as "empolgado"} pose={lukPose as "giz"} formulaCerta={s >= tCorrige + 0.6} corrigindo={corrigindo} />
            </g>
            {chegouWan ? (
              <g transform={`translate(0,${(1 - wanSobe) * 800 + bob("wan")})`}>
                <Wan x={WX} y={1835} escala={escW} expr={fala(14) ? "sorriso" : entre(s, I(11), I(13)) ? "calmo" : "serio"} pose={entre(s, I(11), I(13)) ? "livro" : "bracos"} brilhoLivro={entre(s, I(11), I(13))} />
              </g>
            ) : null}
            {/* carta alienígena que flutua até o Lukita */}
            {entre(s, W(13, "prêmio.") - 0.3, I(15)) ? (
              <g transform={`translate(${interpolate(prog(s, W(13, "prêmio.") - 0.3, 1.2), [0, 1], [quadrado ? 520 : 600, LX + 90])},${1520 - 120 * Math.sin(prog(s, W(13, "prêmio.") - 0.3, 1.2) * Math.PI)}) rotate(${-8 + 4 * Math.sin(s * 3)})`}>
                <rect x={-56} y={-80} width={112} height={160} rx={12} fill="#6fd3b1" stroke="#ffd977" strokeWidth={6} />
                <circle cx={0} cy={-10} r={26} fill="#ffd977" opacity={0.8} />
              </g>
            ) : null}
            {/* o giz que corrige a fórmula */}
            {entre(s, tCorrige - 0.3, tCorrige + 0.9) ? <rect x={LX - 40} y={1835 - 880 * escL + 410 * escL} width={10} height={30} rx={3} fill={GIZ} transform={`rotate(${-30 + 60 * prog(s, tCorrige - 0.3, 0.9)} ${LX} ${1835 - 880 * escL + 430 * escL})`} /> : null}
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
            <div style={{ ...tipo.apoio, fontSize: 54, color: VERDE, fontWeight: 800, marginTop: 20, opacity: prog(s, W(1, "alienígenas") - 0.1, 0.3) }}>…e os alienígenas chegassem primeiro?</div>
          </div>
        ) : null}
        {/* a fórmula errada */}
        {entre(s, W(2, "fórmula") - 0.1, I(3) - 0.05) ? (
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", transform: `scale(${pos(mola(s, W(2, "fórmula") - 0.1))})` }}>
            <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 130, color: cor.texto }}>
              E = mc<sup style={{ color: VERMELHO, fontSize: 80 }}>3</sup>
            </div>
            <div style={{ ...tipo.rotulo, color: VERMELHO, fontSize: 34, marginTop: 6 }}>tem algo errado aqui</div>
          </div>
        ) : null}

        {/* 5 rodadas, sistema solar que gira */}
        {vis(I(3), I(4)) ? (
          <Quadro op={cena(I(3), I(4))} titulo="SETI em uma frase">
            <Giz s={s} t0={W(3, "Cinco") - 0.1} style={{ position: "absolute", left: 40, top: 110, fontSize: 64 }}>5 rodadas</Giz>
            <svg width={940} height={600} style={{ position: "absolute", left: 0, top: 200 }}>
              <g transform="translate(470,260)" opacity={prog(s, W(3, "sistema") - 0.1, 0.4)}>
                {[200, 140, 80].map((r, i) => (
                  <g key={r} transform={`rotate(${(s - W(3, "sistema")) * (12 + i * 10)})`}>
                    <circle r={r} fill="none" stroke={GIZ} strokeWidth={4} strokeDasharray="14 10" opacity={0.8} />
                    <circle cx={r} cy={0} r={14 - i * 2} fill={["#f0a86b", "#8fb4ff", "#e46a3b"][i]} />
                  </g>
                ))}
                <circle r={34} fill="#ffd977" />
              </g>
              <text x={470} y={560} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={40} fill={GIZ} opacity={prog(s, W(3, "sistema"), 0.4)}>o sistema solar gira</text>
            </svg>
            {s >= W(3, "pesado!") - 0.2 ? <div style={{ position: "absolute", right: 30, top: 100, fontFamily: fonte, fontWeight: 900, fontSize: 46, color: "#f6d77a", transform: `rotate(-8deg) scale(${pos(mola(s, W(3, "pesado!") - 0.2))})` }}>EURO PESADO!</div> : null}
          </Quadro>
        ) : null}

        {/* o turno */}
        {vis(I(4), I(5)) ? (
          <Quadro op={cena(I(4), I(5))} titulo="Seu turno">
            <Giz s={s} t0={W(4, "principal.") - 0.5} style={{ position: "absolute", left: 40, top: 100, fontSize: 64 }}>1 ação principal</Giz>
            <div style={{ position: "absolute", left: 40, right: 40, top: 200, display: "flex", flexWrap: "wrap", gap: 14 }}>
              {["Lançar", "Orbitar", "Pousar", "Escanear", "Analisar", "Carta", "Tecnologia", "Passar"].map((a, i) => (
                <div key={a} style={{ fontFamily: fonte, fontWeight: 800, fontSize: 36, color: GIZ, border: `3px solid ${GIZ}`, borderRadius: 14, padding: "8px 18px", opacity: prog(s, W(4, "principal.") + i * 0.08, 0.2) }}>{a}</div>
              ))}
            </div>
            <Giz s={s} t0={W(4, "energia") - 0.2} style={{ position: "absolute", left: 40, top: 470, fontSize: 48, color: "#9ff0e0" }}>ação livre: 1 energia = 1 movimento</Giz>
            <svg width={940} height={200} style={{ position: "absolute", left: 0, top: 560 }}>
              {[0, 1, 2, 3].map((i) => <circle key={i} cx={160 + i * 200} cy={100} r={46} fill="none" stroke={GIZ} strokeWidth={4} opacity={0.7} />)}
              <Nave x={160 + 600 * prog(s, W(4, "energia"), 1.6, Easing.inOut(Easing.quad))} y={100} esc={0.55} giro={90} c={VERDE} />
            </svg>
          </Quadro>
        ) : null}

        {/* escanear */}
        {vis(I(5), I(6)) ? (
          <Quadro op={cena(I(5), I(6))} titulo="Escanear">
            <Giz s={s} t0={W(5, "crédito") - 0.3} style={{ position: "absolute", left: 40, top: 100, fontSize: 54 }}>1 crédito + 2 energias</Giz>
            <svg width={940} height={600} style={{ position: "absolute", left: 0, top: 190 }}>
              {/* um setor do céu com 5 dados; cada sinal troca um dado por um marcador */}
              <path d="M470,560 L170,120 A420,420 0 0 1 770,120 Z" fill="rgba(242,239,228,.06)" stroke={GIZ} strokeWidth={4} />
              {[0, 1, 2, 3, 4].map((i) => {
                const t = W(5, "sinal") + i * 0.45;
                const marcado = s >= t;
                const meu = i !== 2; // um dos marcadores é de outro jogador
                const fim = s >= W(5, "fecha,") - 0.1;
                return (
                  <g key={i} transform={`translate(${250 + i * 110},190)`}>
                    {!marcado ? (
                      <rect x={-34} y={-34} width={68} height={68} rx={12} fill="#9ff0e0" opacity={0.85} />
                    ) : (
                      <circle r={34 * Math.max(0.6, mola(s, t))} fill={meu ? VERDE : "#8fb4ff"} stroke="#0b0d1a" strokeWidth={4} />
                    )}
                    {fim && meu ? <circle r={44} fill="none" stroke="#f6d77a" strokeWidth={5} opacity={prog(s, W(5, "vence."), 0.3)} /> : null}
                  </g>
                );
              })}
              <text x={470} y={320} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={38} fill={GIZ} opacity={prog(s, W(5, "sinal"), 0.4)}>cada sinal: tira 1 dado do setor</text>
              {s >= W(5, "vence.") - 0.1 ? (
                <g transform={`translate(470,450) scale(${pos(mola(s, W(5, "vence.") - 0.1))})`}>
                  <text textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={60} fill="#f6d77a">mais marcadores vence</text>
                </g>
              ) : null}
            </svg>
          </Quadro>
        ) : null}

        {/* pousar em Marte */}
        {vis(I(6), I(8)) ? (
          <Quadro op={cena(I(6), I(8))} titulo={s < I(7) ? "Marte" : "Pousar"}>
            <svg width={940} height={720} style={{ position: "absolute", left: 0, top: 80 }}>
              <circle cx={300} cy={330} r={170} fill="#c4643f" />
              <path d="M130,330 A170,170 0 0 0 470,330 Z" fill="#000" opacity={0.2} />
              <Nave x={300} y={60 + 140 * prog(s, W(6, "Marte!") - 0.2, 0.9, Easing.out(Easing.quad))} esc={0.7} giro={180} />
              {/* medidor de energia: 3 barras que zeram */}
              <g transform="translate(600,150)">
                <text x={0} y={-20} fontFamily={fonte} fontWeight={800} fontSize={38} fill={GIZ}>energia</text>
                {[0, 1, 2].map((i) => {
                  const gasta = s >= W(6, "três!") - 0.1 + i * 0.12;
                  return <rect key={i} x={i * 90} y={0} width={70} height={130} rx={10} fill={gasta ? "transparent" : "#ffd977"} stroke={GIZ} strokeWidth={4} />;
                })}
                <text x={0} y={190} fontFamily={fonte} fontWeight={900} fontSize={54} fill="#f6d77a" opacity={prog(s, W(6, "Três"), 0.3)}>custa 3</text>
              </g>
              {s >= I(7) - 0.1 ? (
                <g>
                  <g transform={`translate(600,450) scale(${pos(mola(s, W(7, "pista") - 0.1))})`}>
                    <rect x={0} y={-50} width={280} height={90} rx={16} fill="rgba(242,239,228,.08)" stroke={GIZ} strokeWidth={3} />
                    <text x={30} y={10} fontFamily={fonte} fontWeight={900} fontSize={40} fill={GIZ}>pista de vida</text>
                  </g>
                  <text x={600} y={560} fontFamily={fonte} fontWeight={800} fontSize={42} fill={GIZ} opacity={prog(s, W(7, "pontos."), 0.3)}>+ pontos</text>
                  <text x={600} y={640} fontFamily={fonte} fontWeight={800} fontSize={38} fill="#9ff0e0" opacity={prog(s, W(7, "primeiro"), 0.3)}>1º a pousar: + dados</text>
                </g>
              ) : null}
            </svg>
          </Quadro>
        ) : null}

        {/* as três pistas: a espécie é descoberta */}
        {vis(I(8), I(9) + 0.3) ? (
          <Quadro op={cena(I(8), I(9) + 0.3)} titulo="Descobrir uma espécie">
            <div style={{ position: "absolute", left: 40, right: 40, top: 120, display: "flex", justifyContent: "space-between" }}>
              {["do céu", "do pouso", "dos dados"].map((n, i) => {
                const k = mola(s, pistasCheias[i] - 0.1);
                return (
                  <div key={n} style={{ width: 250, height: 250, borderRadius: 24, border: `4px dashed ${GIZ}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ transform: `scale(${pos(k)})` }}><IconePista i={i} /></div>
                    <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 34, color: GIZ, marginTop: 8 }}>pista {n}</div>
                  </div>
                );
              })}
            </div>
            {/* o tabuleiro da espécie vira */}
            <div style={{ position: "absolute", left: 220, top: 430, width: 500, height: 300, borderRadius: 24, background: s >= tDesc + 0.3 ? "#6fd3b1" : "#3a3f4a", border: `5px solid ${GIZ}`, transform: `perspective(900px) rotateY(${180 * prog(s, tDesc, 0.6, Easing.inOut(Easing.quad))}deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 52, color: "#0b0d1a", transform: s >= tDesc + 0.3 ? "scaleX(-1)" : undefined }}>{s >= tDesc + 0.3 ? "DESCOBERTA!" : "?"}</div>
            </div>
          </Quadro>
        ) : null}

        {/* "Qualquer um correria. O Wan abriu o manual." */}
        {entre(s, I(10), I(11) - 0.05) ? (
          <div style={{ position: "absolute", left: 80, right: 80, top: 260 }}>
            <div style={{ ...tipo.apoio, fontSize: 56, color: cor.texto, opacity: prog(s, I(10), 0.3) }}>Qualquer um correria.</div>
            <div style={{ ...tipo.titulo, fontSize: 112, color: cor.ouro, marginTop: 10, opacity: prog(s, tWan + 0.05, 0.2), transform: `translateY(${(1 - prog(s, tWan + 0.05, 0.4)) * 40}px)` }}>O Wan abriu o manual.</div>
          </div>
        ) : null}

        {/* dica real: espécie descoberta */}
        {vis(I(11), I(13)) ? (
          <Quadro op={cena(I(11), I(13))} titulo="Dica real · espécie descoberta">
            <div style={{ position: "absolute", left: 40, right: 40, top: 110 }}>
              {[
                ["1. Vira o tabuleiro da espécie", W(11, "vira")],
                ["2. Lê a ficha: ela muda as regras", W(11, "ficha,")],
                ["3. Quem marcou as pistas ganha a recompensa", W(11, "recompensa.") - 0.4],
              ].map(([t, k]) => (
                <Giz key={t as string} s={s} t0={(k as number) - 0.2} d={0.7} style={{ fontSize: 50, lineHeight: 1.25, marginBottom: 26 }}>{t}</Giz>
              ))}
            </div>
            {s >= W(12, "cartas") - 0.2 ? (
              <div style={{ position: "absolute", left: 40, right: 40, top: 560, display: "flex", alignItems: "center", gap: 30, transform: `scale(${pos(mola(s, W(12, "cartas") - 0.2))})`, transformOrigin: "left center" }}>
                <div style={{ width: 120, height: 170, borderRadius: 14, background: "#6fd3b1", border: "5px solid #ffd977", boxShadow: "0 0 40px rgba(255,217,119,.6)" }} />
                <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 54, color: "#f6d77a", lineHeight: 1.1 }}>Cartas alienígenas:<br />mais fortes que as normais</div>
              </div>
            ) : null}
          </Quadro>
        ) : null}

        {/* final interativo */}
        {s >= I(15) - 0.1 ? (
          <AbsoluteFill>
            <div style={{ position: "absolute", left: -400, right: -400, top: -600, bottom: -700, background: `rgba(7,9,20,${0.85 * prog(s, I(15) - 0.1, 0.4)})` }} />
            <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", opacity: prog(s, I(15), 0.4) }}>
              <div style={{ ...tipo.rotulo, color: CIANO }}>Você decide o próximo turno</div>
              <div style={{ ...tipo.titulo, fontSize: 76, color: cor.texto, marginTop: 20 }}>O Lukita pousa na lua ou analisa os dados?</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 60 }}>
                {[["POUSAR", "#e46a3b", W(15, "POUSAR")], ["ANALISAR", ROXO, W(15, "ANALISAR.")]].map(([t, c, k]) => (
                  <div key={t as string} style={{ fontFamily: fonte, fontWeight: 900, fontSize: 64, color: "#0b0d1a", background: c as string, padding: "30px 46px", borderRadius: 24, transform: `scale(${pos(mola(s, (k as number) - 0.15))})` }}>{t}</div>
                ))}
              </div>
              <div style={{ ...tipo.apoio, fontSize: 46, color: cor.texto, marginTop: 50, opacity: prog(s, W(15, "Comenta") - 0.1, 0.3) }}>Comenta uma palavra: a maioria escreve o Ep. 2</div>
              <Img src={staticFile("img/logo.webp")} style={{ width: 280, marginTop: 60, opacity: prog(s, W(15, "ANALISAR.") + 0.6, 0.5) }} />
              <div style={{ ...tipo.rotulo, fontSize: 26, color: cor.textoSuave, marginTop: 30, opacity: prog(s, W(15, "ANALISAR.") + 0.8, 0.5) }}>Tutoriais: eliteboardgamers.com.br/como-jogar</div>
              <div style={{ ...tipo.rotulo, fontSize: 22, color: cor.textoSuave, marginTop: 14, opacity: prog(s, W(15, "ANALISAR.") + 0.8, 0.5) }}>História de ficção · regras do manual oficial (CGE)</div>
            </div>
          </AbsoluteFill>
        ) : null}

        <Legenda s={s} falas={FALAS} ocultar={[1, 10, 15]} />
      </AbsoluteFill>
      <Granulado forca={0.1} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, tDesc - 0.3, tDesc, tWan - 0.1, tWan + 0.7, FIM_SETI - 1.4, FIM_SETI - 0.1], [0, 0.09, 0.09, 0.04, 0.03, 0.1, 0.09, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[I(3), I(4), I(5), I(6), I(8), I(11)].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.26} /></Sequence>
      ))}
      <Sequence from={Math.round((W(2, "fórmula") - 0.1) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      {pistasCheias.map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.4} /></Sequence>
      ))}
      <Sequence from={Math.round((tDesc - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.4} /></Sequence>
      <Sequence from={Math.round((tFeixe - 0.2) * fps)} durationInFrames={Math.round(1.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.4} /></Sequence>
      <Sequence from={Math.round((tWan - 5) * fps)} durationInFrames={Math.round(5 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} trimBefore={Math.round(5 * fps)} volume={0.2} /></Sequence>
      <Sequence from={Math.round((tWan - 0.05) * fps)} durationInFrames={Math.round(2.1 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.34} /></Sequence>
      <Sequence from={Math.round((tPremio - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.35} /></Sequence>
      <Sequence from={Math.round((tCorrige - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.3} /></Sequence>
      <Sequence from={Math.round((W(15, "POUSAR") - 0.15) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((W(15, "ANALISAR.") - 0.15) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
    </AbsoluteFill>
  );
};
