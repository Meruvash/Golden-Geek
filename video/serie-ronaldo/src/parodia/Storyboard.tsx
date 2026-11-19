import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FiltroCel } from "../colt/Teste";
import { Ronaldo } from "../personagens/Personagens";
import { Victor as Vitor } from "../victor1/personagens";
import { LUZ_POENTE, WanHD } from "../personagens/WanHD";
import { Cancelina, Desconstrucio, Problematricia } from "./Lacronnen";

// Storyboard do clipe "Um a zero pro time" (paródia Desfile Lúdico). Um quadro-chave por segundo.
// Linguagem de clipe frenético: câmera inclinada, linhas de velocidade, meio-tom, texto com cor separada,
// cartões de luta e quadro de impacto. Imagens do jogo: oficiais da Dire Wolf (public/img/parodia/oficiais).

const SANS = "Inter, 'Public Sans', sans-serif";
const AREIA = "#e0913f", NOITE = "#0d1a2e", CIANO = "#22e3ff", ROSA = "#ff3fb4", LIMA = "#9dff3a", AMAR = "#f0c24b";

const Svg: React.FC<{ children: React.ReactNode; cel?: string; style?: React.CSSProperties }> = ({ children, cel = "cel", style }) => (
  <svg width={1080} height={1080} viewBox="0 0 1080 1080" style={{ position: "absolute", left: 0, top: 0, overflow: "visible", ...style }}>
    <g filter={`url(#${cel})`}>{children}</g>
  </svg>
);
const Of: React.FC<{ nome: string; style?: React.CSSProperties }> = ({ nome, style }) => (
  <Img src={staticFile(`img/parodia/oficiais/${nome}.png`)} style={{ position: "absolute", ...style }} />
);
const Raios: React.FC<{ cor: string; cx?: number; cy?: number; n?: number; op?: number }> = ({ cor, cx = 540, cy = 540, n = 28, op = 0.5 }) => (
  <svg width={1080} height={1080} style={{ position: "absolute" }}>
    {Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2, b = a + Math.PI / n * 0.55, R = 1600;
      return <path key={i} d={`M${cx},${cy} L${cx + R * Math.cos(a)},${cy + R * Math.sin(a)} L${cx + R * Math.cos(b)},${cy + R * Math.sin(b)} Z`} fill={cor} opacity={op} />;
    })}
  </svg>
);
const MeioTom: React.FC<{ cor?: string; op?: number }> = ({ cor = "#000", op = 0.16 }) => (
  <AbsoluteFill style={{ backgroundImage: `radial-gradient(${cor} 28%, transparent 30%)`, backgroundSize: "14px 14px", opacity: op }} />
);
const Grande: React.FC<{ children: React.ReactNode; tam?: number; cor?: string; giro?: number; style?: React.CSSProperties }> = ({ children, tam = 130, cor = "#fff", giro = -6, style }) => (
  <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: tam, lineHeight: 0.92, color: cor, transform: `rotate(${giro}deg) skewX(-6deg)`, textShadow: `7px 7px 0 ${CIANO}, -6px -5px 0 ${ROSA}, 0 14px 30px rgba(0,0,0,.6)`, WebkitTextStroke: "3px #111", ...style }}>{children}</div>
);
const Letra: React.FC<{ txt: string }> = ({ txt }) => (
  <div style={{ position: "absolute", left: 0, right: 0, bottom: 64, textAlign: "center" }}>
    <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 40, background: AMAR, color: "#111", padding: "8px 18px", boxShadow: "6px 6px 0 #111" }}>{txt}</span>
  </div>
);
const Tempo: React.FC<{ txt: string }> = ({ txt }) => (
  <div style={{ position: "absolute", left: 22, top: 20, fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 22, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,.6)", padding: "3px 10px" }}>{txt}</div>
);
const Credito: React.FC = () => (
  <div style={{ position: "absolute", right: 22, bottom: 18, fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 18, color: "#fff", background: "rgba(0,0,0,.55)", padding: "2px 8px" }}>IMAGEM: DIRE WOLF</div>
);
const Inclina: React.FC<{ g?: number; z?: number; children: React.ReactNode }> = ({ g = -4, z = 1.1, children }) => (
  <AbsoluteFill style={{ transform: `rotate(${g}deg) scale(${z})` }}>{children}</AbsoluteFill>
);
const CartaBate: React.FC<{ x: number; y: number; esc?: number; giro?: number; rastro?: boolean }> = ({ x, y, esc = 1, giro = -10, rastro }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `rotate(${giro}deg) scale(${esc})`, transformOrigin: "center" }}>
    {rastro ? [3, 2, 1].map((k) => <div key={k} style={{ position: "absolute", left: -k * 60, top: -k * 40, width: 300, height: 420, borderRadius: 18, background: "#fff", opacity: 0.1 * (4 - k) }} />) : null}
    <div style={{ width: 300, height: 420, borderRadius: 18, overflow: "hidden", border: "6px solid #111", boxShadow: "10px 14px 0 rgba(0,0,0,.45)", background: "#1a1410" }}>
      <Img src={staticFile("img/parodia/oficiais/cartas.png")} style={{ width: 1180, marginLeft: -870, marginTop: -60 }} />
    </div>
  </div>
);
const Espadas: React.FC<{ n: number; cor?: string }> = ({ n, cor = "#fff" }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#111", border: `6px solid ${cor}`, padding: "8px 24px", borderRadius: 14 }}>
    <span style={{ fontSize: 64 }}>⚔️</span><span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 90, color: cor }}>{n}</span>
  </div>
);
const Cartao: React.FC<{ cor: string; nome: string; atrib: [string, string][]; children: React.ReactNode; lado?: number }> = ({ cor, nome, atrib, children, lado = 1 }) => (
  <AbsoluteFill style={{ background: NOITE }}>
    <AbsoluteFill style={{ background: `linear-gradient(${lado > 0 ? 115 : 65}deg, ${cor} 0 58%, #111 58% 61%, ${NOITE} 61%)` }} />
    <MeioTom op={0.22} />
    <Raios cor="#fff" cx={lado > 0 ? 330 : 750} cy={520} op={0.12} />
    {children}
    <div style={{ position: "absolute", [lado > 0 ? "right" : "left"]: 40, top: 170, width: 470, textAlign: lado > 0 ? "right" : "left" } as React.CSSProperties}>
      <span style={{ fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 24, color: "#fff", background: "#111", padding: "3px 10px", fontWeight: 700, letterSpacing: 3 }}>CASA LACRÔNNEN</span>
      <Grande tam={lado > 0 ? 82 : 82} giro={0} style={{ marginTop: 6 }}>{nome}</Grande>
      <div style={{ marginTop: 28, display: "inline-block", background: "rgba(10,10,16,.82)", padding: "10px 18px 16px", borderRadius: 8 }}>
        {atrib.map(([k, v]) => (
          <div key={k} style={{ fontFamily: SANS, fontWeight: 800, fontSize: 28, color: "#fff", marginTop: 10 }}>{k} <span style={{ color: cor }}>{v}</span></div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

type Q = { rot: string; r: () => React.ReactNode };
export const QUADROS_PARODIA: Q[] = [
  { rot: "0:00 · GANCHO", r: () => (
    <AbsoluteFill style={{ background: "#120606" }}>
      <Raios cor="#c23b22" op={0.55} />
      <MeioTom cor="#000" op={0.3} />
      <CartaBate x={520} y={420} esc={1.15} giro={14} rastro />
      <div style={{ position: "absolute", left: 60, top: 110 }}><Grande tam={128}>UM A ZERO<br />PRO TIME!</Grande></div>
    </AbsoluteFill>
  ) },
  { rot: "0:04 · VERSO 1", r: () => (
    <AbsoluteFill style={{ background: "#1a0f08" }}>
      <Inclina g={-5} z={1.25}><Of nome="mesa" style={{ left: 60, top: 230, width: 960 }} /></Inclina>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${AREIA}cc 0%, transparent 35%, transparent 70%, #1a0f08 100%)` }} />
      <div style={{ position: "absolute", left: 50, top: 60 }}><Grande tam={96} giro={-4}>SEXTA · 21H</Grande><Grande tam={64} cor={AMAR} giro={-4} style={{ marginTop: 16 }}>DUNA NA MESA</Grande></div>
      <Letra txt="Sexta à noite, Duna na mesa" /><Credito />
    </AbsoluteFill>
  ) },
  { rot: "0:07 · 3 × 3", r: () => (
    <AbsoluteFill style={{ background: NOITE }}>
      <AbsoluteFill style={{ background: `linear-gradient(100deg, ${AREIA} 0 50%, #111 50% 51.5%, #2a0f3a 51.5%)` }} />
      <MeioTom op={0.2} />
      <Svg><Vitor x={120} y={1000} escala={0.62} expr="sombrio" pose="normal" /><Ronaldo x={250} y={1010} escala={0.66} expr="orgulhoso" pose="cartas" /><WanHD x={410} y={1010} escala={0.6} faroeste={false} expr="serio" pose="bracos" luz={LUZ_POENTE} id="w3" /></Svg>
      <svg width={1080} height={1080} style={{ position: "absolute" }}>{[660, 800, 940].map((x) => <g key={x}><rect x={x - 50} y={640} width={100} height={150} rx={10} fill="#3a1a52" stroke="#111" strokeWidth={6} /><rect x={x - 60} y={780} width={120} height={30} rx={6} fill="#4a2468" stroke="#111" strokeWidth={6} /><text x={x} y={735} textAnchor="middle" fontFamily={SANS} fontWeight={900} fontSize={70} fill={ROSA}>?</text></g>)}</svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center" }}><Grande tam={200} giro={-3}>3 × 3</Grande></div>
      <Letra txt="três contra três, o Time Elite vai jogar" />
    </AbsoluteFill>
  ) },
  { rot: "0:10 · WAN NO COMANDO", r: () => (
    <AbsoluteFill style={{ background: AREIA }}>
      <Raios cor="#fff3d6" cy={420} op={0.45} />
      <MeioTom op={0.14} />
      <Svg><WanHD x={540} y={2050} escala={2.15} faroeste={false} expr="serio" pose="bracos" luz={LUZ_POENTE} id="wc" /></Svg>
      <div style={{ position: "absolute", right: 50, top: 70, transform: "rotate(8deg)", border: "8px solid #c23b22", padding: "6px 20px", fontFamily: SANS, fontWeight: 900, fontSize: 64, color: "#c23b22", background: "rgba(255,255,255,.75)" }}>COMANDANTE</div>
      <Letra txt="Wan no comando, frio de general" />
    </AbsoluteFill>
  ) },
  { rot: "0:14 · FLANCO E SOMBRA", r: () => (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 0, width: 540, height: 1080, background: "#1f3b6e", overflow: "hidden" }}><Raios cor="#3c62a8" cx={270} op={0.6} /><Svg><Ronaldo x={270} y={1480} escala={1.6} expr="orgulhoso" pose="cartas" /></Svg></div>
      <div style={{ position: "absolute", left: 540, top: 0, width: 540, height: 1080, background: "#140c1c", overflow: "hidden" }}>
        <svg width={540} height={1080} style={{ position: "absolute", left: 0 }}><g filter="url(#cel)"><Vitor x={270} y={1480} escala={1.6} expr="determinado" pose="aponta" virar /></g></svg>
        <div style={{ position: "absolute", left: 30, top: 60, fontFamily: SANS, fontWeight: 900, fontSize: 44, color: "#fff", background: "#8f1d3a", padding: "6px 16px" }}>NA SOMBRA</div>
      </div>
      <div style={{ position: "absolute", left: 532, top: 0, width: 16, height: 1080, background: "#111" }} />
      <Letra txt="Ronaldo no flanco, Vitor na sombra" />
    </AbsoluteFill>
  ) },
  { rot: "0:18 · PRÉ: A PORTA ABRE", r: () => (
    <AbsoluteFill style={{ background: "#050507" }}>
      <div style={{ position: "absolute", left: 300, top: 120, width: 480, height: 760, background: "linear-gradient(180deg,#fff, #c9f6ff)", boxShadow: `0 0 120px 40px ${CIANO}88` }} />
      <svg width={1080} height={1080} style={{ position: "absolute" }}>
        <circle cx={300} cy={430} r={110} fill={CIANO} opacity={0.8} style={{ filter: "blur(26px)" }} />
        <circle cx={540} cy={440} r={110} fill={ROSA} opacity={0.8} style={{ filter: "blur(26px)" }} />
        <circle cx={780} cy={410} r={110} fill={LIMA} opacity={0.8} style={{ filter: "blur(26px)" }} />
      </svg>
      <Svg cel="celNeon" style={{ filter: "brightness(0)" }}><Cancelina x={300} y={1000} escala={0.8} /><Problematricia x={540} y={1010} escala={0.8} /><Desconstrucio x={780} y={1000} escala={0.8} /></Svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 40, textAlign: "center" }}><Grande tam={92} giro={0}>A CASA LACRÔNNEN</Grande></div>
      <Letra txt="cabelo neon, celular na mão" />
    </AbsoluteFill>
  ) },
  { rot: "0:21 · CANCELINA!", r: () => (
    <Cartao cor={CIANO} nome="CANCELINA" atrib={[["CANCELAMENTOS", "★★★★★"], ["GRAVANDO", "24 h"], ["LEU O MANUAL", "não"]]}>
      <Svg><Cancelina x={290} y={1240} escala={1.32} expr="grita" /></Svg>
    </Cartao>
  ) },
  { rot: "0:22 · PROBLEMATRÍCIA!", r: () => (
    <Cartao cor={ROSA} nome="PROBLEMA-TRÍCIA" lado={-1} atrib={[["TEXTÃO", "47 tópicos"], ["PROBLEMATIZOU", "o verme"], ["VEZ", "perdida"]]}>
      <Svg><Problematricia x={790} y={1240} escala={1.32} expr="serio" /></Svg>
    </Cartao>
  ) },
  { rot: "0:23 · DESCONSTRÚCIO!", r: () => (
    <Cartao cor={LIMA} nome="DESCONS-TRÚCIO" atrib={[["REGRA É", "construção social"], ["CARTA", "de ponta-cabeça"], ["ECOBAG", "sim"]]}>
      <Svg><Desconstrucio x={290} y={1240} escala={1.32} expr="convencido" /></Svg>
    </Cartao>
  ) },
  { rot: "0:24 · \"REVELA A MÃO, IRMÃO\"", r: () => (
    <AbsoluteFill style={{ background: "#000" }}>
      <Svg style={{ filter: "grayscale(1) contrast(1.4)" }}><WanHD x={540} y={2350} escala={2.6} faroeste={false} expr="calmo" pose="bracos" luz={LUZ_POENTE} id="wd" /></Svg>
      <AbsoluteFill style={{ background: "linear-gradient(180deg, transparent 55%, #000 90%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 52, color: "#fff", letterSpacing: 2 }}>"Revela a mão, irmão."</div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 100, textAlign: "center", fontFamily: "'DejaVu Sans Mono', monospace", fontSize: 22, color: "#999" }}>(o beat corta)</div>
    </AbsoluteFill>
  ) },
  { rot: "0:25 · REFRÃO: REVELOU!", r: () => (
    <AbsoluteFill style={{ background: "#1a0f08" }}>
      <Inclina g={6} z={1.5}><Of nome="mesa" style={{ left: 60, top: 260, width: 960, filter: "brightness(.7)" }} /></Inclina>
      <Raios cor={AMAR} cx={560} cy={560} op={0.35} />
      <svg width={1080} height={1080} style={{ position: "absolute" }}><path d="M560,340 l40,120 l120,-60 l-60,120 l130,40 l-130,40 l60,120 l-120,-60 l-40,120 l-40,-120 l-120,60 l60,-120 l-130,-40 l130,-40 l-60,-120 l120,60 Z" fill="#fff" opacity={0.9} /></svg>
      <Of nome="cartas" style={{ left: 120, top: 330, width: 840, transform: "rotate(-4deg)", filter: "drop-shadow(0 20px 20px rgba(0,0,0,.6))" }} />
      <div style={{ position: "absolute", left: 60, top: 70 }}><Grande tam={140}>REVELOU!</Grande></div>
      <Letra txt="Um a zero pro time (revelou!)" /><Credito />
    </AbsoluteFill>
  ) },
  { rot: "0:28 · CONFLITO! 1 × 0", r: () => (
    <AbsoluteFill style={{ background: "#c23b22" }}>
      <Raios cor="#ff6a4d" op={0.6} />
      <MeioTom op={0.18} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, textAlign: "center" }}><Grande tam={150} giro={-3}>CONFLITO!</Grande></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 380, display: "flex", justifyContent: "center", gap: 40, alignItems: "center" }}><Espadas n={14} cor={AREIA} /><span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 70, color: "#fff" }}>×</span><Espadas n={3} cor={ROSA} /></div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 680, textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 26, background: "#111", padding: "14px 30px", border: "6px solid #fff" }}>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 40, color: AREIA }}>TIME ELITE</span>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 96, color: "#fff" }}>1 × 0</span>
          <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 40, color: ROSA }}>LACRÔNNEN</span>
        </div>
      </div>
      <Letra txt="Um a zero pro time (conflito!)" />
    </AbsoluteFill>
  ) },
  { rot: "0:31 · \"ISSO É OPRESSÃO!\"", r: () => (
    <AbsoluteFill style={{ background: "#0b2a33" }}>
      <Raios cor={CIANO} cx={540} cy={420} op={0.25} />
      <div style={{ position: "absolute", left: 150, top: 40, width: 780, height: 960, border: "10px solid #111", borderRadius: 60, overflow: "hidden", background: "#123" }}>
        <svg width={780} height={960} style={{ position: "absolute" }}><g filter="url(#cel)"><Cancelina x={390} y={1500} escala={1.75} expr="grita" /></g></svg>
        <div style={{ position: "absolute", left: 24, top: 24, fontFamily: SANS, fontWeight: 900, fontSize: 26, color: "#fff", background: "#ff2d4a", padding: "4px 12px", borderRadius: 6 }}>● AO VIVO</div>
        <div style={{ position: "absolute", right: 24, top: 24, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: "#fff" }}>👁 3</div>
      </div>
      <div style={{ position: "absolute", left: 40, top: 560 }}><Grande tam={104} cor="#fff" giro={-8}>ISSO É<br />OPRESSÃO!</Grande></div>
      <Letra txt="Wan joga a intriga e a mesa toda se oprime" />
    </AbsoluteFill>
  ) },
  { rot: "0:39 · PÓS-REFRÃO: TIME ELITE!", r: () => (
    <AbsoluteFill style={{ background: AREIA }}>
      {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: -40, right: -40, top: 60 + i * 330, transform: "rotate(-6deg)", textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 150, color: i === 1 ? "#111" : "#ffffff55", WebkitTextStroke: i === 1 ? "0" : "3px #111" }}>TIME ELITE!</div>)}
      <Svg><Vitor x={250} y={1050} escala={0.8} expr="determinado" pose="normal" /><WanHD x={540} y={1080} escala={0.72} faroeste={false} expr="sorriso" pose="bracos" luz={LUZ_POENTE} id="wp" /><Ronaldo x={830} y={1050} escala={0.84} expr="orgulhoso" pose="cartas" virar /></Svg>
      <Letra txt="Time Elite! Re-ve-lou! Time Elite! Con-fli-to!" />
    </AbsoluteFill>
  ) },
  { rot: "0:44 · TEXTÃO E PONTA-CABEÇA", r: () => (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(120deg, #3a0f30 0 50%, #111 50% 51.5%, #16300c 51.5%)` }} />
      <Svg><Problematricia x={270} y={1080} escala={1.05} expr="serio" /><Desconstrucio x={800} y={1080} escala={1.05} expr="convencido" /></Svg>
      <div style={{ position: "absolute", left: 40, top: 70, width: 400, background: "#fff", borderRadius: 20, padding: "16px 20px", fontFamily: SANS, fontSize: 26, fontWeight: 700, color: "#222", boxShadow: "6px 6px 0 #111" }}>🧵 <b>1/47</b> Precisamos falar sobre o Verme…</div>
      <div style={{ position: "absolute", right: 40, top: 70, width: 380, background: LIMA, borderRadius: 20, padding: "16px 20px", fontFamily: SANS, fontSize: 28, fontWeight: 900, color: "#111", boxShadow: "6px 6px 0 #111", textAlign: "center" }}>"REGRA É CONSTRUÇÃO SOCIAL"</div>
      <Letra txt="Desconstrúcio jogou a carta de ponta-cabeça" />
    </AbsoluteFill>
  ) },
  { rot: "0:52 · O VERME ENGOLE A CASA", r: () => (
    <AbsoluteFill style={{ background: "#d98c3a" }}>
      <Raios cor="#f5c27a" cx={560} cy={700} op={0.5} />
      <Of nome="verme" style={{ left: 250, top: 120, width: 640, filter: "drop-shadow(0 30px 30px rgba(0,0,0,.5))" }} />
      <svg width={1080} height={1080} style={{ position: "absolute" }}>{Array.from({ length: 40 }, (_, i) => <circle key={i} cx={300 + (i * 97) % 520} cy={760 + (i * 53) % 160} r={10 + (i % 5) * 6} fill="#b06a22" opacity={0.8} />)}</svg>
      <Svg><g transform="rotate(-30 260 700)"><Cancelina x={220} y={820} escala={0.42} expr="grita" /></g><g transform="rotate(25 540 520)"><Problematricia x={520} y={520} escala={0.38} expr="grita" /></g><g transform="rotate(-50 860 720)"><Desconstrucio x={860} y={800} escala={0.42} expr="grita" carta={false} /></g></Svg>
      <div style={{ position: "absolute", left: 40, top: 50 }}><Grande tam={92} giro={-5}>ENGOLIU A<br />CASA INTEIRA</Grande></div>
      <Letra txt="O verme subiu gigante e engoliu a Casa inteira" /><Credito />
    </AbsoluteFill>
  ) },
  { rot: "0:56 · PONTE (câmera lenta)", r: () => (
    <AbsoluteFill style={{ background: "#000", filter: "grayscale(1)" }}>
      <div style={{ position: "absolute", left: 0, top: 120, width: 540, height: 840, overflow: "hidden", background: "#222" }}><svg width={540} height={840} style={{ position: "absolute" }}><g filter="url(#cel)"><Cancelina x={270} y={1280} escala={1.45} expr="grita" /></g></svg></div>
      <div style={{ position: "absolute", left: 540, top: 120, width: 540, height: 840, overflow: "hidden", background: "#333" }}><svg width={540} height={840} style={{ position: "absolute" }}><g filter="url(#cel)"><WanHD x={270} y={1900} escala={2.0} faroeste={false} expr="calmo" pose="bracos" luz={LUZ_POENTE} id="wpo" /></g></svg></div>
      <div style={{ position: "absolute", left: 30, top: 150, width: 470, fontFamily: SANS, fontWeight: 900, fontSize: 40, color: "#fff", textShadow: "0 3px 10px #000" }}>"VAMOS CANCELAR O DUNA!"</div>
      <div style={{ position: "absolute", left: 570, bottom: 150, width: 470, fontFamily: SANS, fontWeight: 800, fontSize: 36, color: "#fff", textShadow: "0 3px 10px #000" }}>"Calma, leite com pera… cancela não, embaralha."</div>
    </AbsoluteFill>
  ) },
  { rot: "1:03 · REFRÃO FINAL + LOOP", r: () => (
    <AbsoluteFill style={{ background: NOITE }}>
      <Raios cor={AREIA} op={0.3} />
      <Of nome="caixa" style={{ left: 330, top: 300, width: 420, transform: "rotate(-6deg)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 60, textAlign: "center" }}><Grande tam={86} giro={-3}>TIME ELITE 1 × 0<br /><span style={{ color: ROSA }}>CASA LACRÔNNEN</span></Grande></div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, textAlign: "center", fontFamily: SANS, fontWeight: 900, fontSize: 34, color: AMAR }}>eliteboardgamers.com.br/dune-imperium · ↻ volta pro gancho</div>
      <Letra txt="Desfile lúdico… um a zero pro…" /><Credito />
    </AbsoluteFill>
  ) },
];

export const DUR_STORY_PARODIA = QUADROS_PARODIA.length;

export const StoryboardParodia: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = Math.min(QUADROS_PARODIA.length - 1, Math.floor(f / fps));
  return (
    <AbsoluteFill style={{ background: "#000", overflow: "hidden" }}>
      <FiltroCel id="cel" luz="#ffcf8a" lado={-1} />
      <FiltroCel id="celNeon" luz="#22e3ff" lado={-1} />
      {QUADROS_PARODIA[k].r()}
      <Tempo txt={QUADROS_PARODIA[k].rot} />
    </AbsoluteFill>
  );
};
