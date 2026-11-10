import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { LUZ_LAMPIAO, LUZ_LUA, LUZ_POENTE, WanHD } from "../personagens/WanHD";
import { Carta, F, Fumaca, MADEIRA, Papel, RYE, Silhueta, TipoMadeira } from "./faroeste";
import { CalorChao, FlareLente, GradeCor, Passaros, PoeiraLuz, RaiosTyndall } from "./luz";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "O Assalto do Wan", Parte 1 — divulga a resenha de Colt Express (eliteboardgamers.com.br/colt-express).
// Estrutura de roteiro da @saveo.house (2ª pessoa, número + relógio, virada, dilema com custo, "a maioria escreve");
// estilo cinematográfico do PADRAO_VIDEO.md §11 (fundos claude-drawing, personagem 35_shinkai, luz Shinkai).
// Regras: só o que está na resenha publicada (5 rodadas, pilha comum, túnel, ordem, teto 3 vagões, soco, balas).
export const FIM_COLT = DURACAO + 2.2;

const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const SAI = Easing.bezier(0.7, 0, 0.84, 0);
const p = (s: number, t0: number, d: number, e = ENTRA) => interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: e });
const entre = (s: number, a: number, b: number) => s >= a && s < b;
// entrada de palavra: assenta de 1,12 para 1 com o fade (sem o "pisca" de antes)
const assenta = (s: number, t0: number) => 1.12 - 0.12 * p(s, t0, 0.35);

const SOL = { x: 713, y: 1035 };

// Legenda em tira de papel, palavra a palavra.
const Legenda: React.FC<{ s: number; left: number; right: number; ocultar: number[] }> = ({ s, left, right, ocultar }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.25);
  if (!f || ocultar.includes(f.id)) return null;
  const atual = f.palavras.filter((w) => s >= w.t).length - 1;
  return (
    <div style={{ position: "absolute", left, right, top: 1160, display: "flex", justifyContent: "center" }}>
      <div style={{ background: F.papel, border: `4px solid ${F.tinta}`, padding: "12px 22px", boxShadow: `8px 8px 0 ${F.tinta}`, transform: "rotate(-1deg)" }}>
        {f.quem === "wan" ? <div style={{ fontFamily: RYE, fontSize: 26, color: F.vermelho, marginBottom: 2 }}>Wan</div> : null}
        <div style={{ fontFamily: MADEIRA, fontSize: 38, lineHeight: 1.18, color: F.tinta }}>
          {f.palavras.map((w, i) => <span key={i} style={{ color: i === atual ? F.vermelho : i > atual ? "rgba(43,29,20,.32)" : F.tinta }}>{w.w} </span>)}
        </div>
      </div>
    </div>
  );
};

// Véu escuro atrás dos títulos: separa o texto dos raios que pulsam (correção do "pisca").
const Veu: React.FC<{ altura?: number; op?: number }> = ({ altura = 900, op = 1 }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(30,16,20,.62) 0px, rgba(30,16,20,.4) ${altura * 0.6}px, rgba(30,16,20,0) ${altura}px)`, opacity: op, pointerEvents: "none" }} />
);

const LocoFrente: React.FC<{ x: number; y: number; esc: number; s: number }> = ({ x, y, esc, s }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <circle cx={0} cy={-90} r={150} fill="#fff1c8" opacity={0.28 + 0.06 * Math.sin(s * 9)} />
    <rect x={-70} y={-150} width={140} height={150} rx={20} fill={F.tinta} />
    <rect x={-50} y={-210} width={36} height={70} fill={F.tinta} />
    <circle cx={0} cy={-90} r={42} fill="#3a2a1f" />
    <circle cx={0} cy={-90} r={26} fill="#fff4d8" />
    <path d="M-80,0 L0,-40 L80,0 Z" fill={F.vermelho} />
  </g>
);

// Teto do trem em primeiro plano (tábuas, juntas, rebites), tingido pela luz da cena.
const Teto: React.FC<{ s: number; noite?: boolean }> = ({ s, noite }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
    <path d="M-40,1560 L1120,1470 L1120,1600 L-40,1700 Z" fill={noite ? "#5a1520" : "#7a1c26"} />
    <path d="M-40,1700 L1120,1600 L1120,1920 L-40,1920 Z" fill={noite ? "#8a1e28" : F.vermelho} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${120 + i * 300},${1555 - i * 23} v160`} stroke={F.tinta} strokeWidth={14} />)}
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={60 + i * 90} cy={1690 - i * 7.8} r={5} fill={F.tinta} opacity={0.6} />)}
    {/* linhas de velocidade: o trem anda */}
    <g stroke={F.papel} strokeWidth={4} strokeLinecap="round" opacity={0.28}>
      {[1180, 1240, 1300, 1370].map((y, i) => {
        const x = ((i * 290 - s * 900) % 1400 + 1400) % 1400 - 200;
        return <path key={y} d={`M${x},${y} h${200 - i * 25}`} />;
      })}
    </g>
  </svg>
);

const Lampiao: React.FC<{ s: number }> = ({ s }) => (
  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
    <defs>
      <radialGradient id="lamp" cx="0.78" cy="0.17" r="0.8"><stop offset="0" stopColor="#ffcf7a" stopOpacity={0.6} /><stop offset="0.45" stopColor="#d9902f" stopOpacity={0.16} /><stop offset="1" stopColor="#000" stopOpacity={0} /></radialGradient>
      <linearGradient id="mesaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a4528" /><stop offset="1" stopColor="#2b1d14" /></linearGradient>
    </defs>
    {Array.from({ length: 12 }, (_, i) => <rect key={i} x={i * 90} y={0} width={86} height={1080} fill={i % 2 ? "#3a2618" : "#33221a"} />)}
    <rect width={1080} height={1920} fill="url(#lamp)" opacity={0.9 + 0.1 * Math.sin(s * 11) * Math.sin(s * 3.1)} />
    <path d="M880,0 V230" stroke="#1a110b" strokeWidth={6} />
    <g transform={`rotate(${2 * Math.sin(s * 1.6)} 880 0)`}><path d="M840,230 h80 l-10,120 h-60 Z" fill="#ffcf7a" stroke={F.tinta} strokeWidth={6} /></g>
    <path d="M0,1060 L1080,1060 L1080,1920 L0,1920 Z" fill="url(#mesaG)" />
    <rect x={0} y={1050} width={1080} height={22} fill="#1a110b" />
    <ellipse cx={560} cy={1420} rx={540} ry={200} fill="#ffcf7a" opacity={0.13} />
  </svg>
);

export const Colt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  // palcos
  const pA = s < I(3) - 0.15; // deserto: gancho e plano
  const pB = entre(s, I(3) - 0.15, I(5) - 0.15); // vagão: pilha
  const pC = entre(s, I(5) - 0.15, I(7) - 0.15); // teto ao entardecer: o soco
  const pD = entre(s, I(7) - 0.15, I(9) - 0.15); // a mão travada
  const pE = s >= I(9) - 0.15; // noite: rodada 5
  const corte = (t: number) => (s >= t && s < t + 0.42 ? 96 * Math.pow(1 - p(s, t, 0.42, Easing.linear), 3) : 0); // entrada de palco: desliza 96 px
  const desl = corte(I(3) - 0.15) + corte(I(5) - 0.15) + corte(I(7) - 0.15) + corte(I(9) - 0.15);

  const tWan = W(1, "Wan.") - 0.12;
  const piscar = (s % 3.5) > 3.37;
  const resp = 0.006 * Math.sin(s * 2.2);
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);

  return (
    <AbsoluteFill style={{ backgroundColor: F.tinta, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translateX(${desl}px)` }}>
        {/* ===================== PALCO A: deserto ===================== */}
        {pA ? (() => {
          const soco = s >= tWan ? interpolate(s, [tWan, tWan + 0.28, tWan + 0.9], [1, 1.07, 1.03], { extrapolateRight: "clamp", easing: ENTRA }) : 1;
          const cam = (1 + 0.04 * p(s, 0, I(3), Easing.inOut(Easing.quad))) * soco;
          const tremor = s >= tWan && s < tWan + 0.35 ? Math.sin(s * 90) * 8 * (1 - p(s, tWan, 0.35)) : 0;
          const loco = 0.32 + 0.25 * p(s, 0, I(3), Easing.in(Easing.quad));
          return (
            <AbsoluteFill>
              <AbsoluteFill style={{ transform: `scale(${cam}) translateX(${tremor}px)`, transformOrigin: `${SOL.x}px ${SOL.y}px` }}>
                <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920 }} />
                <CalorChao s={s} y={1060} altura={260}><Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920 }} /></CalorChao>
                <Passaros s={s} x0={-200} y0={560} n={7} vel={70} />
                <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                  <Fumaca x={SOL.x - 80} y={1010 - 60 * loco} s={s} esc={loco * 1.2} />
                  <LocoFrente x={626} y={1075} esc={loco} s={s} />
                </svg>
                <RaiosTyndall x={SOL.x} y={SOL.y} s={s} ang={205} abertura={50} n={5} forca={0.42} />
                <PoeiraLuz s={s} n={70} caixa={[0, 500, 1080, 1300]} />
                {s >= tWan ? (
                  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                    {Array.from({ length: 14 }, (_, i) => {
                      const k = p(s, tWan, 1.2, Easing.out(Easing.quad));
                      const a = (i / 14) * Math.PI;
                      return <circle key={i} cx={780 + Math.cos(a) * 260 * k * (i % 2 ? 1 : 0.7)} cy={1880 - Math.sin(a) * 90 * k} r={30 + 40 * k} fill="#e8c38a" opacity={0.5 * (1 - k)} />;
                    })}
                    <WanHD x={780} y={2160} escala={1.4} expr={falando("wan") ? "calmo" : s > tWan + 1.5 ? "sorriso" : "calmo"} pose="bracos" luz={LUZ_POENTE} id="a" piscar={piscar} respira={resp} />
                  </svg>
                ) : null}
              </AbsoluteFill>
              <FlareLente x={SOL.x} y={SOL.y} s={s} forca={0.8} />
              <GradeCor />
              <Veu op={s < I(2) ? 1 - p(s, tWan - 0.3, 0.4) : 0.7} />
              {/* título carimbado */}
              {s < tWan + 0.2 ? (
                <div style={{ position: "absolute", left: 70, top: 260, opacity: 1 - p(s, tWan - 0.25, 0.25, SAI) }}>
                  <div style={{ fontFamily: RYE, fontSize: 40, color: F.papel, letterSpacing: "0.1em", opacity: p(s, 0.1, 0.4) }}>O ASSALTO DO WAN</div>
                  {([["5 RODADAS.", W(1, "cinco") - 0.1, F.papel], ["6 BANDIDOS.", W(1, "Seis") - 0.1, F.papel], ["1 MALETA.", W(1, "maleta.") - 0.15, "#ffd38a"]] as const).map(([t, t0, c]) => (
                    <div key={t} style={{ marginTop: 14, transform: `scale(${assenta(s, t0)})`, transformOrigin: "left center", opacity: p(s, t0, 0.22) }}>
                      <TipoMadeira tam={128} cor={c} sombra>{t}</TipoMadeira>
                    </div>
                  ))}
                </div>
              ) : null}
              {/* o plano do Wan: três cartas pousam na ordem que ele fala */}
              {s >= I(2) - 0.1 ? (
                <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                  <text x={70} y={330} fontFamily={RYE} fontSize={46} fill={F.papel} opacity={p(s, I(2), 0.3)}>O PLANO</text>
                  {([["andar", W(2, "Vagão")], ["saque", W(2, "joia,")], ["tiro", W(2, "atira")]] as const).map(([a, t0], i) => (
                    <g key={a} opacity={p(s, t0 - 0.1, 0.2)} transform={`translate(0,${(1 - p(s, t0 - 0.1, 0.35)) * -40})`}>
                      <Carta x={150 + i * 200} y={560} a={a} esc={1.1} giro={-5 + i * 5} numero={i + 1} />
                    </g>
                  ))}
                  {s >= W(2, "trás.") - 0.1 ? <path d="M90,720 C260,760 480,760 650,720" stroke={F.ocre} strokeWidth={8} fill="none" strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={1400 * (1 - p(s, W(2, "trás.") - 0.1, 0.5))} /> : null}
                </svg>
              ) : null}
              <Legenda s={s} left={70} right={520} ocultar={[1]} />
            </AbsoluteFill>
          );
        })() : null}

        {/* ===================== PALCO B: o vagão, a pilha ===================== */}
        {pB ? (() => {
          const tunel = entre(s, W(3, "túnel,") - 0.2, I(4) - 0.1);
          const jogadas = [W(3, "Cada"), W(3, "carta") , W(3, "pilha"), W(3, "uma"), W(3, "cada", 2), W(3, "túnel,")];
          const viradas = [false, false, false, false, true, true];
          const acoes = ["andar", "tiro", "soco", "xerife", "saque", "subir"] as const;
          const vira = W(4, "vira.") - 0.1;
          return (
            <AbsoluteFill>
              {/* janela: o deserto passando; no túnel, escurece */}
              <div style={{ position: "absolute", left: 90, top: 300, width: 520, height: 360, overflow: "hidden", borderRadius: 14, border: "16px solid #1a110b", background: "#000" }}>
                <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920, left: -300 - ((s * 160) % 300), top: -820 }} />
                <div style={{ position: "absolute", inset: 0, background: "#0b0705", opacity: tunel ? 0.92 : 0 }} />
              </div>
              <Lampiao s={s} />
              <AbsoluteFill style={{ background: "#000", opacity: tunel ? 0.35 : 0, pointerEvents: "none" }} />
              <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                {/* carta de rodada */}
                <g transform="translate(270,830) rotate(-3)" opacity={p(s, I(3), 0.3)}>
                  <rect x={-180} y={-90} width={360} height={180} rx={14} fill={F.papel} stroke={F.tinta} strokeWidth={6} />
                  <text x={0} y={-36} textAnchor="middle" fontFamily={RYE} fontSize={34} fill={F.vermelho}>RODADA 3</text>
                  <path d="M-60,66 V24 A60,60 0 0 1 60,24 V66 Z" fill={F.tinta} />
                </g>
                {/* mãos de 6 bandidos jogando na pilha comum, uma de cada vez */}
                {jogadas.map((t, i) => {
                  if (s < t - 0.2) return null;
                  const k = p(s, t - 0.2, 0.45);
                  const revelado = s >= vira + i * 0.35;
                  const ax = 560 + (i - 2.5) * 6, ay = 1400 - i * 6;
                  const fx = revelado ? 130 + i * 160 : ax, fy = revelado ? 1420 + (i % 2) * 22 : ay;
                  const kk = revelado ? p(s, vira + i * 0.35, 0.4) : 0;
                  const origem = [[-200, 1300], [1280, 1250], [-200, 1600], [1280, 1650], [540, 2100], [-200, 1450]][i];
                  const x = interpolate(k, [0, 1], [origem[0], ax]) * (1 - kk) + fx * kk;
                  const y = interpolate(k, [0, 1], [origem[1], ay]) * (1 - kk) + fy * kk;
                  return <Carta key={i} x={x} y={y} a={acoes[i]} esc={0.9} giro={revelado ? -6 + i * 3 : (i - 2.5) * 7} virando={revelado ? p(s, vira + i * 0.35, 0.3) : viradas[i] ? 0 : 0} numero={revelado ? i + 1 : undefined} destaque={revelado && acoes[i] === "soco"} />;
                })}
              </svg>
              {s >= W(3, "túnel,") - 0.2 && s < vira ? <div style={{ position: "absolute", left: 120, top: 980, fontFamily: MADEIRA, fontSize: 40, color: F.papel, opacity: p(s, W(3, "túnel,") - 0.2, 0.3) }}>túnel: cartas viradas</div> : null}
              {s >= vira - 0.1 ? <div style={{ position: "absolute", left: 70, top: 980, fontFamily: MADEIRA, fontSize: 44, color: F.papel, opacity: p(s, vira - 0.1, 0.3) }}>a pilha vira, na ordem</div> : null}
              <Legenda s={s} left={70} right={160} ocultar={[]} />
            </AbsoluteFill>
          );
        })() : null}

        {/* ===================== PALCO C: o teto, o soco ===================== */}
        {pC ? (() => {
          const tRival = W(5, "rival") - 0.1, tXer = W(5, "xerife") - 0.1, tAr = W(5, "ar.") - 0.1;
          const closeUp = s >= I(6) - 0.2;
          const zoom = closeUp ? 1 + 0.55 * p(s, I(6) - 0.2, 0.28) : 1;
          return (
            <AbsoluteFill>
              <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "300px 1250px" }}>
                <Img src={staticFile("img/colt/deserto.png")} style={{ position: "absolute", width: 1080, height: 1920, top: -200 }} />
                <RaiosTyndall x={SOL.x} y={SOL.y - 200} s={s} ang={205} abertura={45} n={4} forca={0.3} />
                <Teto s={s} />
                <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                  <g transform={`translate(${720 + 300 * p(s, tRival, 0.5, Easing.inOut(Easing.quad))},${-30 * p(s, tRival, 0.5)})`}><Silhueta x={0} y={1590} esc={0.8} /></g>
                  {s >= tXer ? <g opacity={p(s, tXer, 0.3)}><Silhueta x={960} y={1540} esc={0.65} tipo="xerife" /></g> : null}
                  <WanHD x={300} y={2130} escala={1.3} expr={closeUp ? "serio" : "calmo"} pose="bracos" luz={LUZ_POENTE} id="c" piscar={piscar && !closeUp} respira={resp} />
                  {/* o soco no ar: a carta voa e o golpe assobia no vazio */}
                  {s >= tAr - 0.5 && s < I(6) + 0.3 ? (
                    <g>
                      <Carta x={interpolate(p(s, tAr - 0.5, 0.5), [0, 1], [420, 700])} y={1350} a="soco" esc={0.9} giro={20 * p(s, tAr - 0.5, 0.5)} destaque />
                      <path d={`M520,1380 q120,-40 260,0`} stroke={F.papel} strokeWidth={6} fill="none" strokeDasharray="20 16" opacity={p(s, tAr - 0.2, 0.2)} />
                    </g>
                  ) : null}
                </svg>
              </AbsoluteFill>
              <GradeCor />
              {s >= tAr - 0.05 && s < I(6) + 0.9 ? (
                <div style={{ position: "absolute", left: 120, top: 420, transform: `rotate(-10deg) scale(${1.12 - 0.12 * p(s, tAr - 0.05, 0.3)})`, opacity: p(s, tAr - 0.05, 0.15) }}>
                  <TipoMadeira tam={92} cor={F.vermelho} desvio={4} style={{ border: `9px solid ${F.vermelho}`, padding: "10px 24px", background: "rgba(243,230,200,.92)" }}>ACERTOU O AR</TipoMadeira>
                </div>
              ) : null}
              {s < tAr - 0.05 ? (
                <div style={{ position: "absolute", left: 70, top: 300 }}>
                  {[["o rival trocou de vagão", tRival], ["o xerife chegou primeiro", tXer]].map(([t, t0]) => (
                    <div key={t as string} style={{ fontFamily: MADEIRA, fontSize: 52, color: F.papel, textShadow: `0 4px 0 ${F.tinta}`, opacity: p(s, t0 as number, 0.3), marginBottom: 14 }}>{t}</div>
                  ))}
                </div>
              ) : null}
              <Legenda s={s} left={380} right={160} ocultar={[]} />
            </AbsoluteFill>
          );
        })() : null}

        {/* ===================== PALCO D: a mão travada de balas ===================== */}
        {pD ? (() => {
          const tBala = W(7, "bala") - 0.2;
          const close8 = s >= I(8) - 0.15;
          return (
            <AbsoluteFill>
              <Lampiao s={s} />
              <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                {/* a mão do Wan em leque */}
                {([["andar", 0], ["tiro", 1], ["soco", 2], ["saque", 3], ["xerife", 4], ["andar", 5]] as const).map(([a, i]) => {
                  const virouBala = i % 2 === 1 && s >= tBala + (i - 1) * 0.18;
                  const ang = -30 + i * 12;
                  return (
                    <g key={i} transform={`translate(540,1820) rotate(${ang}) translate(0,-420)`} opacity={close8 ? 1 - p(s, I(8) - 0.15, 0.3) : 1}>
                      <Carta x={0} y={0} a={virouBala ? "bala" : a} esc={1.1} virando={virouBala ? p(s, tBala + (i - 1) * 0.18, 0.3) : 1} />
                    </g>
                  );
                })}
              </svg>
              {s >= W(7, "nada.") - 0.3 && !close8 ? <div style={{ position: "absolute", left: 70, top: 380, fontFamily: MADEIRA, fontSize: 64, color: F.papel, textShadow: `0 4px 0 ${F.tinta}`, opacity: p(s, W(7, "nada.") - 0.3, 0.3) }}>carta que não<br />serve pra nada</div> : null}
              {close8 ? (
                <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                  <g opacity={p(s, I(8) - 0.15, 0.3)}><WanHD x={540} y={2420} escala={1.9} expr="sorriso" pose="bracos" luz={LUZ_LAMPIAO} id="d" piscar={piscar} respira={resp} /></g>
                </svg>
              ) : null}
              <PoeiraLuz s={s} n={40} caixa={[300, 100, 780, 1100]} cor="#ffe3a8" seed={3} />
              <GradeCor quente="#ffb36b" frio="#2a1a3a" forca={0.3} />
              <Legenda s={s} left={70} right={160} ocultar={[]} />
            </AbsoluteFill>
          );
        })() : null}

        {/* ===================== PALCO E: rodada 5, à noite ===================== */}
        {pE ? (() => {
          const tCh = I(10);
          const fim = s >= I(11) - 0.15;
          return (
            <AbsoluteFill>
              <Img src={staticFile("img/colt/deserto-noite.png")} style={{ position: "absolute", width: 1080, height: 1920 }} />
              <PoeiraLuz s={s} n={30} caixa={[0, 200, 1080, 900]} cor="#c9d6ff" seed={9} />
              <Teto s={s} noite />
              <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                <circle cx={930} cy={1420} r={130 + 10 * Math.sin(s * 3)} fill="#ffcf7a" opacity={0.25} />
                <g transform="translate(930,1420)"><rect x={-46} y={-30} width={92} height={62} rx={8} fill={F.ocre} stroke={F.tinta} strokeWidth={6} /><path d="M-18,-30 v-14 h36 v14" stroke={F.tinta} strokeWidth={6} fill="none" /></g>
                <Silhueta x={1010} y={1495} esc={0.55} tipo="xerife" />
                <Silhueta x={640} y={1585} esc={0.75} />
                <WanHD x={230} y={2170} escala={1.25} expr="sorriso" pose="carta" luz={LUZ_LUA} id="e" piscar={piscar} respira={resp} />
              </svg>
              <GradeCor quente="#c9a0ff" frio="#0d1330" forca={0.3} />
              {!fim && s < tCh - 0.1 ? (
                <div style={{ position: "absolute", left: 70, top: 260 }}>
                  <div style={{ transform: `scale(${assenta(s, I(9))})`, transformOrigin: "left center", opacity: p(s, I(9), 0.25) }}><TipoMadeira tam={140} cor={F.papel} sombra>RODADA 5</TipoMadeira></div>
                  <div style={{ fontFamily: RYE, fontSize: 44, color: F.papel, marginTop: 16, opacity: p(s, W(9, "Vence") - 0.1, 0.3) }}>vence o bandido mais rico</div>
                </div>
              ) : null}
              {s >= tCh - 0.1 && !fim ? (
                <>
                  <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
                    {([["correr", W(10, "corre"), 270, -6, "até 3 vagões"], ["soco", W(10, "soca"), 650, 6, "rival larga o saque"]] as const).map(([a, t0, x, g, legenda]) => (
                      <g key={a} opacity={p(s, t0 - 0.15, 0.25)} transform={`translate(0,${(1 - p(s, t0 - 0.15, 0.35)) * 30})`}>
                        <Carta x={x} y={620} a={a} esc={1.5} giro={g} destaque={s >= W(10, "Comenta") - 0.1} />
                        <text x={x} y={830} textAnchor="middle" fontFamily={MADEIRA} fontSize={34} fill={F.papel}>{legenda}</text>
                      </g>
                    ))}
                  </svg>
                  <div style={{ position: "absolute", left: 70, right: 160, top: 900, display: "flex", justifyContent: "center", opacity: p(s, W(10, "Comenta") - 0.1, 0.3) }}>
                    <TipoMadeira tam={54} cor="#ffd38a" sombra desvio={4}>Comenta CORRER ou SOCAR</TipoMadeira>
                  </div>
                </>
              ) : null}
              {!fim ? <Legenda s={s} left={380} right={160} ocultar={[]} /> : null}
              {/* cartela final: link da resenha */}
              {fim ? (
                <AbsoluteFill>
                  <AbsoluteFill style={{ background: `rgba(20,12,10,${0.82 * p(s, I(11) - 0.15, 0.4)})` }} />
                  <div style={{ position: "absolute", left: 70, right: 160, top: 290, textAlign: "center", opacity: p(s, I(11) - 0.05, 0.4) }}>
                    <div style={{ fontFamily: RYE, fontSize: 38, color: "#ffd38a", letterSpacing: "0.08em" }}>A MAIORIA ESCREVE A PARTE 2</div>
                    <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 26 }}>
                      {["CORRER", "SOCAR"].map((t) => <div key={t} style={{ fontFamily: MADEIRA, fontSize: 52, color: F.tinta, background: F.papel, border: `5px solid ${F.tinta}`, padding: "12px 30px", boxShadow: `6px 6px 0 ${F.vermelho}` }}>{t}</div>)}
                    </div>
                    <div style={{ margin: "60px auto 0", background: F.papel, border: `6px solid ${F.tinta}`, padding: "28px 26px", boxShadow: `12px 12px 0 ${F.tinta}`, transform: `rotate(-1.5deg) scale(${1.08 - 0.08 * p(s, W(11, "resenha") - 0.1, 0.4)})`, opacity: p(s, W(11, "resenha") - 0.1, 0.3) }}>
                      <div style={{ fontFamily: RYE, fontSize: 32, color: F.vermelho }}>RESENHA COMPLETA</div>
                      <div style={{ fontFamily: MADEIRA, fontSize: 64, color: F.tinta, marginTop: 6 }}>Colt Express</div>
                      <div style={{ fontFamily: MADEIRA, fontSize: 36, color: F.tinta, marginTop: 14 }}>eliteboardgamers.com.br</div>
                      <div style={{ fontFamily: MADEIRA, fontSize: 40, color: F.vermelho, marginTop: 2 }}>/colt-express</div>
                      <div style={{ fontFamily: RYE, fontSize: 26, color: F.tinta, marginTop: 14 }}>link na bio</div>
                    </div>
                    <Img src={staticFile("img/logo.webp")} style={{ width: 260, marginTop: 50, opacity: p(s, I(11) + 0.8, 0.5) }} />
                    <div style={{ fontFamily: RYE, fontSize: 22, color: F.papel, marginTop: 24, opacity: p(s, I(11) + 1, 0.5) }}>História de ficção · regras do jogo conforme a nossa resenha</div>
                  </div>
                </AbsoluteFill>
              ) : null}
            </AbsoluteFill>
          );
        })() : null}
      </AbsoluteFill>
      <Papel forca={0.13} />

      {/* ===================== áudio ===================== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, I(5) - 0.2, I(5), I(6) + 1.6, I(9) - 0.2, I(9) + 0.4, FIM_COLT - 1.4, FIM_COLT - 0.1], [0, 0.1, 0.1, 0.06, 0.03, 0.03, 0.1, 0.1, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[W(1, "cinco"), W(1, "Seis"), W(1, "maleta.")].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(1.2 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.16} /></Sequence>
      ))}
      <Sequence from={Math.round((tWan - 0.05) * fps)} durationInFrames={Math.round(2 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.32} /></Sequence>
      {[W(2, "Vagão"), W(2, "joia,"), W(2, "atira")].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.3} /></Sequence>
      ))}
      {[I(3) - 0.15, I(5) - 0.15, I(7) - 0.15, I(9) - 0.15].map((t, i) => (
        <Sequence key={i} from={Math.round(t * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.3} /></Sequence>
      ))}
      <Sequence from={Math.round((W(4, "vira.") - 0.15) * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.3} /></Sequence>
      <Sequence from={Math.round((W(5, "ar.") - 0.5) * fps)} durationInFrames={Math.round(0.8 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((W(5, "ar.") - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
      {[0, 1, 2].map((i) => (
        <Sequence key={i} from={Math.round((W(7, "bala") - 0.2 + i * 0.36) * fps)} durationInFrames={Math.round(0.4 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.25} /></Sequence>
      ))}
      <Sequence from={Math.round((I(9) - 0.15) * fps)} durationInFrames={Math.round(2 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.26} /></Sequence>
      <Sequence from={Math.round((W(10, "Comenta") - 0.15) * fps)} durationInFrames={Math.round(1.6 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.3} /></Sequence>
    </AbsoluteFill>
  );
};
