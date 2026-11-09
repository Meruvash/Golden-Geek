import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// "Andromeda's Edge em um minuto": o Wan ensina, o Ronaldo do Reteté atrapalha.
// Regras: tutorial do site (como-jogar/andromedas-edge), que segue o manual da Galápagos.
export const FIM_AE = DURACAO + 1.5;

const ENTRA = Easing.bezier(0.16, 1, 0.3, 1);
const SAI = Easing.bezier(0.7, 0, 0.84, 0);
const prog = (s: number, t0: number, d: number, ease = ENTRA) =>
  interpolate(s, [t0, t0 + d], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
const mola = (s: number, t0: number) => {
  const x = Math.max(0, s - t0);
  return x <= 0 ? 0 : 1 - Math.exp(-9 * x) * Math.cos(14 * x);
};
const entre = (s: number, a: number, b: number) => s >= a && s < b;

const CIANO = "#6ee7ff";
const VERDE = "#3ddc84";
const VERMELHO = "#ff6b5b";
const ROXO = "#b493ff";
const CORES_FALA: Record<string, string> = { narrador: cor.texto, ronaldo: "#8fb4ff", wan: cor.ouro };

const Legenda: React.FC<{ s: number }> = ({ s }) => {
  const f = FALAS.find((x) => s >= x.inicio - 0.05 && s < x.inicio + x.dur + 0.25);
  if (!f || [1, 20].includes(f.id)) return null;
  const c = CORES_FALA[f.quem];
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1196, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(8,10,20,.88)", borderRadius: 24, padding: "14px 26px", maxWidth: 960, textAlign: "center" }}>
        {f.quem !== "narrador" ? <div style={{ ...tipo.rotulo, fontSize: 24, color: c, marginBottom: 4 }}>{f.quem === "wan" ? "Wan" : "Ronaldo"}</div> : null}
        <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 40, lineHeight: 1.2 }}>
          {f.palavras.map((p, i) => (
            <span key={i} style={{ color: s >= p.t ? c : "rgba(236,239,243,.38)" }}>{p.w} </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- cenário: ponte da estação, com o espaço atrás ----------
const Espaco: React.FC<{ s: number; alerta: number }> = ({ s, alerta }) => {
  let semente = 17;
  const rnd = () => ((semente = (semente * 1664525 + 1013904223) % 4294967296) / 4294967296);
  const estrelas = Array.from({ length: 140 }, () => ({ x: rnd() * 1080, y: rnd() * 1500, r: 0.8 + rnd() * 2.4, f: rnd() * 6 }));
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920}>
        <defs>
          <linearGradient id="fundoAE" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#070914" />
            <stop offset="0.6" stopColor="#141033" />
            <stop offset="1" stopColor="#0c0f1e" />
          </linearGradient>
          <radialGradient id="neb1"><stop offset="0" stopColor={ROXO} stopOpacity={0.45} /><stop offset="1" stopColor={ROXO} stopOpacity={0} /></radialGradient>
          <radialGradient id="neb2"><stop offset="0" stopColor={CIANO} stopOpacity={0.3} /><stop offset="1" stopColor={CIANO} stopOpacity={0} /></radialGradient>
          <radialGradient id="planeta" cx="35%" cy="30%"><stop offset="0" stopColor="#f0a86b" /><stop offset="1" stopColor="#7a3b2e" /></radialGradient>
        </defs>
        <rect width={1080} height={1920} fill="url(#fundoAE)" />
        <ellipse cx={240 + 20 * Math.sin(s * 0.2)} cy={420} rx={520} ry={300} fill="url(#neb1)" />
        <ellipse cx={860} cy={900 + 15 * Math.cos(s * 0.25)} rx={460} ry={340} fill="url(#neb2)" />
        {estrelas.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r} fill="#fff" opacity={0.35 + 0.45 * Math.abs(Math.sin(s * 1.3 + e.f))} />
        ))}
        <circle cx={930} cy={1320} r={170} fill="url(#planeta)" opacity={0.9} />
        <ellipse cx={930} cy={1320} rx={260} ry={46} fill="none" stroke="#f3cdae" strokeWidth={6} opacity={0.35} transform="rotate(-14 930 1320)" />
        {/* deck da ponte */}
        <path d="M0,1560 L1080,1560 L1080,1920 L0,1920 Z" fill="#1a1d2b" />
        <path d="M0,1560 L1080,1560" stroke={CIANO} strokeWidth={4} opacity={0.5} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${540 + (i - 3) * 90},1560 L${540 + (i - 3) * 330},1920`} stroke="#2a2f45" strokeWidth={3} />
        ))}
        <path d="M0,1700 L1080,1700 M0,1820 L1080,1820" stroke="#2a2f45" strokeWidth={3} />
      </svg>
      {alerta > 0 ? <AbsoluteFill style={{ backgroundColor: `rgba(255,60,60,${0.18 * alerta})` }} /> : null}
    </AbsoluteFill>
  );
};

// ---------- peças desenhadas por nós (não são a arte do jogo) ----------
// Nave em ponta de flecha, como as naves de plástico do jogo. Centro em (x, y).
const Nave: React.FC<{ x: number; y: number; esc?: number; c?: string; giro?: number }> = ({ x, y, esc = 1, c = VERDE, giro = 0 }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${esc})`}>
    <path d="M0,-60 L44,46 L0,24 L-44,46 Z" fill={c} stroke="#0b0d1a" strokeWidth={5} strokeLinejoin="round" />
    <path d="M0,-60 L44,46 L0,24 Z" fill="#000" opacity={0.18} />
    <path d="M-14,40 L0,74 L14,40 Z" fill={cor.ouro} opacity={0.85} />
  </g>
);

const Invasor: React.FC<{ x: number; y: number; esc?: number }> = ({ x, y, esc = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${esc})`}>
    <path d="M0,-70 L18,-30 L62,-44 L38,-6 L74,18 L30,22 L22,64 L0,34 L-22,64 L-30,22 L-74,18 L-38,-6 L-62,-44 L-18,-30 Z" fill={VERMELHO} stroke="#0b0d1a" strokeWidth={5} strokeLinejoin="round" />
    <circle r={20} fill="#ffd977" />
    <circle r={9} fill="#0b0d1a" />
  </g>
);

const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};
const Dado: React.FC<{ x: number; y: number; v: number; c: string; esc?: number; giro?: number; op?: number; marca?: "x" | "v" }> = ({ x, y, v, c, esc = 1, giro = 0, op = 1, marca }) => (
  <g transform={`translate(${x},${y}) rotate(${giro}) scale(${esc})`} opacity={op}>
    <rect x={-60} y={-60} width={120} height={120} rx={22} fill={c} stroke="#0b0d1a" strokeWidth={6} />
    {PIPS[v].map(([a, b], i) => <circle key={i} cx={a * 30} cy={b * 30} r={11} fill="#0b0d1a" />)}
    {marca ? (
      <g transform="translate(0,82)">
        <circle r={26} fill="#fff" />
        {marca === "x" ? <path d="M-11,-11 L11,11 M11,-11 L-11,11" stroke={VERMELHO} strokeWidth={7} strokeLinecap="round" /> : <path d="M-12,0 L-3,10 L13,-10" stroke="#1f9d55" strokeWidth={7} fill="none" strokeLinecap="round" />}
      </g>
    ) : null}
  </g>
);

// Painel holográfico onde as regras aparecem.
const Painel: React.FC<{ op: number; children: React.ReactNode; titulo?: string; corBorda?: string }> = ({ op, children, titulo, corBorda = CIANO }) =>
  op <= 0 ? null : (
    <div style={{ position: "absolute", left: 50, right: 50, top: 330, height: 820, opacity: op, transform: `translateY(${(1 - op) * 30}px)` }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,12,28,.9)", border: `3px solid ${corBorda}`, borderRadius: 30, boxShadow: `0 0 40px ${corBorda}55` }} />
      {titulo ? <div style={{ position: "absolute", left: 40, top: 30, ...tipo.rotulo, color: corBorda }}>{titulo}</div> : null}
      {children}
    </div>
  );

const Credito: React.FC<{ texto: string }> = ({ texto }) => (
  <div style={{ position: "absolute", right: 30, bottom: 18, ...tipo.rotulo, fontSize: 22, color: cor.textoSuave }}>{texto}</div>
);

export const Ae01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;

  // cada cena do painel vai do início de uma fala até o início de outra
  const cena = (a: number, b: number) => prog(s, a - 0.1, 0.35) * (1 - prog(s, b - 0.3, 0.25, SAI));
  const vis = (a: number, b: number) => entre(s, a - 0.1, b);

  // ----- câmera -----
  const zoom = entre(s, I(12), I(14) - 0.1) ? 1 + 0.35 * prog(s, I(12), 0.3) : entre(s, I(17), I(18)) ? 1 + 0.25 * prog(s, I(17), 0.3) : 1;
  const camOrig = zoom > 1 ? "260px 1500px" : "540px 1500px";
  const tremor = entre(s, I(13), I(13) + 0.5) ? Math.sin(s * 70) * 10 * (1 - prog(s, I(13), 0.5)) : 0;
  const alerta = entre(s, W(9, "Terceiro:"), I(10) + 0.2) ? 0.5 + 0.5 * Math.sin(s * 10) : 0;

  // ----- personagens -----
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -9 : 0);
  const ronFala = (id: number) => entre(s, I(id) - 0.05, I(id + 1));
  const ronExpr = ronFala(2) || ronFala(6) || ronFala(12) || ronFala(17) ? "orgulhoso" : entre(s, I(13), I(15)) || ronFala(7) ? "apavorado" : "confuso";
  const ronPose = ronFala(2) || ronFala(6) || ronFala(12) || ronFala(17) ? "biblia" : entre(s, I(13), I(14)) ? "encolhido" : "cartas";
  const wanExpr = ronFala(7) || entre(s, I(18), I(19)) ? "sorriso" : entre(s, I(13), I(15)) ? "serio" : "calmo";
  const wanPose = entre(s, I(3), I(17)) && !entre(s, I(6), I(8)) && !entre(s, I(12), I(14)) ? "livro" : "bracos";
  const passo = s < I(4) ? 0 : s < I(8) ? 1 : s < W(9, "Quarto:") - 0.05 ? (s < W(9, "Terceiro:") - 0.05 ? 2 : 3) : s < I(15) ? 4 : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#070914", fontFamily: fonte }}>
      <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
        <Espaco s={s} alerta={alerta} />
        {/* aura discreta do Wan */}
        <Aura x={810} y={1500} raio={260 + 10 * Math.sin(s * 2)} seed={4} />
        {/* luz da Bíblia nas falas do Ronaldo */}
        {[2, 6, 12, 17].map((id) =>
          ronFala(id) ? (
            <div key={id} style={{ position: "absolute", left: 300, top: 1390, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,.85), rgba(255,240,190,0) 70%)", opacity: prog(s, I(id), 0.3) * (1 - prog(s, I(id + 1) - 0.4, 0.35)) }} />
          ) : null,
        )}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(0,${bob("ronaldo")})`}>
            <Ronaldo x={250} y={1905} escala={0.62} expr={ronExpr as "confuso"} pose={ronPose as "cartas"} />
          </g>
          <g transform={`translate(0,${bob("wan")})`}>
            <Wan x={810} y={1905} escala={0.66} expr={wanExpr as "calmo"} pose={wanPose as "livro"} brilhoLivro={wanPose === "livro"} />
          </g>
        </svg>
      </AbsoluteFill>

      {/* ====== título ====== */}
      {s < I(3) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 200, opacity: 1 - prog(s, I(3) - 0.35, 0.25, SAI) }}>
          <div style={{ ...tipo.rotulo, color: CIANO }}>Como jogar · em 1 minuto</div>
          <div style={{ ...tipo.titulo, fontSize: 108, color: cor.texto, marginTop: 14 }}>
            Andromeda's <span style={{ color: CIANO }}>Edge</span>
          </div>
          <div style={{ display: "flex", gap: 30, alignItems: "center", marginTop: 40 }}>
            <Img src={staticFile("img/ae/capa-1.webp")} style={{ width: 420, borderRadius: 18, transform: `scale(${0.85 + 0.15 * prog(s, 0.2, 0.6)}) rotate(-3deg)`, boxShadow: "0 20px 60px rgba(0,0,0,.6)" }} />
            <div style={{ ...tipo.apoio, fontSize: 44, color: cor.texto }}>
              <div style={{ opacity: prog(s, W(1, "Wan") - 0.1, 0.3) }}><span style={{ color: cor.ouro, fontWeight: 900 }}>Wan</span> explica.</div>
              <div style={{ marginTop: 14, opacity: prog(s, W(1, "Ronaldo") - 0.1, 0.3) }}><span style={{ color: "#8fb4ff", fontWeight: 900 }}>Ronaldo</span> atrapalha.</div>
            </div>
          </div>
          <div style={{ ...tipo.rotulo, fontSize: 22, color: cor.textoSuave, marginTop: 20 }}>Imagem: Lucky Duck Games</div>
        </div>
      ) : null}

      {/* ====== faixa dos 4 passos do Lançamento ====== */}
      {passo > 0 ? (
        <div style={{ position: "absolute", left: 50, right: 50, top: 200, display: "flex", gap: 14, opacity: prog(s, I(4) - 0.1, 0.3) * (1 - prog(s, I(15) - 0.3, 0.25, SAI)) }}>
          {["Região", "Ativar", "Invasor", "Batalha"].map((n, i) => {
            const ativo = passo === i + 1;
            const feito = passo > i + 1;
            return (
              <div key={n} style={{ flex: 1, height: 100, borderRadius: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: ativo ? CIANO : "rgba(8,12,28,.85)", border: `3px solid ${ativo || feito ? CIANO : "#2a2f45"}`, color: ativo ? "#070914" : feito ? CIANO : cor.textoSuave, fontFamily: fonte, fontWeight: 900, fontSize: 32, transform: `scale(${ativo ? 1.05 : 1})` }}>
                <span style={{ fontSize: 40 }}>{i + 1}</span> {n}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* ====== cena: lançar OU retornar ====== */}
      {vis(I(3), I(4)) ? (
        <Painel op={cena(I(3), I(4))} titulo="No seu turno, só uma coisa">
          <div style={{ position: "absolute", left: 40, right: 40, top: 110, bottom: 40, display: "flex", alignItems: "center", gap: 24 }}>
            {[
              { t: "Lançar", d: "1 nave para uma região do mapa", k: W(3, "lança") },
              { t: "Retornar", d: "todas as naves voltam e ativam a estação", k: W(3, "volta") },
            ].map((o, i) => (
              <React.Fragment key={o.t}>
                {i === 1 ? <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 64, color: cor.ouro, opacity: prog(s, W(3, "volta") - 0.3, 0.3) }}>OU</div> : null}
                <div style={{ flex: 1, height: 560, borderRadius: 26, border: `3px solid ${i ? ROXO : VERDE}`, background: "rgba(255,255,255,.04)", padding: 30, transform: `scale(${Math.max(0.001, mola(s, o.k - 0.1))})`, textAlign: "center" }}>
                  <svg width={300} height={260} viewBox="-150 -130 300 260">
                    {i === 0 ? (
                      <>
                        <path d="M-120,100 Q-20,-20 100,-90" stroke={VERDE} strokeWidth={6} strokeDasharray="10 14" fill="none" opacity={0.6} />
                        <Nave x={40 + 40 * prog(s, o.k, 1.2)} y={-40 - 40 * prog(s, o.k, 1.2)} esc={1.2} giro={55} />
                      </>
                    ) : (
                      <g>
                        <rect x={-110} y={-40} width={220} height={120} rx={20} fill="#2a2f45" stroke={ROXO} strokeWidth={5} />
                        {[-70, -23, 23, 70].map((xx, j) => <rect key={xx} x={xx - 18} y={-14} width={36} height={60} rx={8} fill={[VERDE, "#e46a3b", cor.ouro, "#6ea8ff"][j]} />)}
                        <Nave x={0} y={-90 + 40 * prog(s, o.k, 1)} esc={0.7} giro={180} />
                      </g>
                    )}
                  </svg>
                  <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 60, color: i ? ROXO : VERDE }}>{o.t}</div>
                  <div style={{ fontFamily: fonte, fontWeight: 600, fontSize: 34, color: cor.texto, marginTop: 12, lineHeight: 1.2 }}>{o.d}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Painel>
      ) : null}

      {/* ====== passo 1: escolher a região (figura do manual) ====== */}
      {vis(I(4), I(6)) ? (
        <Painel op={cena(I(4), I(6))} titulo="Primeiro Lançamento">
          <Img src={staticFile("img/ae/lancamento-primeiro.webp")} style={{ position: "absolute", left: 60, top: 100, width: 880, transform: `scale(${0.92 + 0.08 * prog(s, I(4), 0.8)})` }} />
          <div style={{ position: "absolute", left: 40, right: 40, top: 560, fontFamily: fonte, fontWeight: 800, fontSize: 44, color: cor.texto, lineHeight: 1.2, opacity: prog(s, I(5) - 0.1, 0.4) }}>
            Sem nave sua no mapa: só região <span style={{ color: VERDE }}>desocupada</span>.
            <div style={{ fontWeight: 600, fontSize: 34, color: cor.textoSuave, marginTop: 10 }}>Nada de invasor nem nave de outro jogador.</div>
          </div>
          <Credito texto="Ilustração: manual Galápagos p. 9" />
        </Painel>
      ) : null}

      {/* ====== nebulosa: só com Viagem ====== */}
      {vis(I(6), I(8)) ? (
        <Painel op={cena(I(6), I(8))} titulo="Nebulosa: só com Viagem" corBorda={ROXO}>
          <Img src={staticFile("img/ae/setup-regioes.webp")} style={{ position: "absolute", left: 40, top: 100, width: 880, borderRadius: 14 }} />
          {/* destaque da fileira de nebulosas (a de cima) */}
          <div style={{ position: "absolute", left: 40, top: 100, width: 880, height: 120, border: `5px solid ${ROXO}`, borderRadius: 14, opacity: 0.6 + 0.4 * Math.sin(s * 6) }} />
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <Nave x={250 + 200 * prog(s, I(6), 1.4)} y={680 - 420 * prog(s, I(6), 1.4)} esc={1} giro={30} />
            {s >= I(7) - 0.05 ? (
              <g transform={`translate(450,260) scale(${mola(s, I(7) - 0.05)})`}>
                <circle r={70} fill="#fff" opacity={0.95} />
                <path d="M-34,-34 L34,34 M34,-34 L-34,34" stroke={VERMELHO} strokeWidth={16} strokeLinecap="round" />
              </g>
            ) : null}
          </svg>
          <div style={{ position: "absolute", left: 40, right: 40, top: 560, fontFamily: fonte, fontWeight: 800, fontSize: 42, color: cor.texto, lineHeight: 1.2, opacity: prog(s, I(7) - 0.1, 0.4) }}>
            O <span style={{ color: VERDE }}>transportador</span> não tem <span style={{ color: ROXO }}>Viagem</span>: não entra em nebulosa.
          </div>
          <Credito texto="Mapa: manual Galápagos p. 9" />
        </Painel>
      ) : null}

      {/* ====== passo 2: ativar a região ====== */}
      {vis(I(8), I(9)) ? (
        <Painel op={cena(I(8), I(9))} titulo="Ative a região">
          <div style={{ position: "absolute", left: 40, right: 40, top: 110, bottom: 40, display: "flex", gap: 24 }}>
            {[
              { t: "Planeta", d: "você pega a lua do topo", k: W(8, "Planeta") },
              { t: "Base Aliada", d: "você faz a ação dela", k: W(8, "Base") },
            ].map((o, i) => (
              <div key={o.t} style={{ flex: 1, borderRadius: 26, border: `3px solid ${i ? cor.ouro : "#e46a3b"}`, background: "rgba(255,255,255,.04)", padding: 30, textAlign: "center", transform: `scale(${Math.max(0.001, mola(s, o.k - 0.1))})` }}>
                <svg width={340} height={360} viewBox="-170 -180 340 360">
                  {i === 0 ? (
                    <>
                      <circle r={110} fill="#c4643f" />
                      <path d="M-110,0 A110,110 0 0 0 110,0 Z" fill="#000" opacity={0.2} />
                      <circle cx={110 + 30 * prog(s, o.k + 0.3, 0.8)} cy={-110 + 60 * prog(s, o.k + 0.3, 0.8)} r={34} fill="#e7e2d6" stroke="#0b0d1a" strokeWidth={4} />
                    </>
                  ) : (
                    <g>
                      <path d="M-120,90 L-80,-40 L-30,-40 L-20,-120 L20,-120 L30,-40 L80,-40 L120,90 Z" fill="#3b4060" stroke={cor.ouro} strokeWidth={5} />
                      <circle cy={10} r={30} fill={cor.ouro} opacity={0.5 + 0.5 * Math.sin(s * 5)} />
                    </g>
                  )}
                </svg>
                <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 52, color: i ? cor.ouro : "#f0a86b" }}>{o.t}</div>
                <div style={{ fontFamily: fonte, fontWeight: 600, fontSize: 34, color: cor.texto, marginTop: 10 }}>{o.d}</div>
              </div>
            ))}
          </div>
        </Painel>
      ) : null}

      {/* ====== passo 3 e 4: invasor e batalha ====== */}
      {vis(I(9), I(12)) ? (
        <Painel op={cena(I(9), I(12))} titulo={s < W(9, "Quarto:") - 0.05 ? "Ataque Invasor" : "Batalha"} corBorda={VERMELHO}>
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            {/* duas regiões: a sua e a vizinha do invasor */}
            <g opacity={s < I(10) ? 1 : 0.25}>
              <polygon points="300,260 380,400 300,540 140,540 60,400 140,260" fill="#1f2a44" stroke={CIANO} strokeWidth={4} />
              <polygon points="760,260 840,400 760,540 600,540 520,400 600,260" fill="#2b1838" stroke={ROXO} strokeWidth={4} />
              <Nave x={220} y={400} esc={1} />
              {s >= I(11) ? <Nave x={150} y={450} esc={0.8} giro={-10} /> : null}
              <Invasor x={680 - 420 * prog(s, W(9, "invasor") + 0.3, 1.0)} y={400} esc={0.9} />
            </g>
            {/* dados */}
            {s >= I(10) - 0.1 ? (
              <g>
                {(() => {
                  const rola = (t0: number) => s < t0 + 0.8;
                  const v = (t0: number, final: number, k: number) => (rola(t0) ? 1 + (Math.floor(s * 18 + k) % 6) : final);
                  const t0 = I(10) + 0.2;
                  const fim = s >= W(10, "maior") - 0.1;
                  const mira = s >= W(11, "Cada") - 0.1;
                  return (
                    <>
                      <text x={240} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={38} fill={VERDE}>Você · 1 arma</text>
                      <Dado x={240} y={300} v={v(t0, 5, 0)} c={VERDE} esc={1.1} giro={rola(t0) ? Math.sin(s * 30) * 25 : 0} marca={fim && !mira ? "v" : undefined} />
                      <text x={700} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={38} fill={VERMELHO}>Invasor · 2 armas</text>
                      <Dado x={620} y={300} v={v(t0, 4, 2)} c="#e46a3b" esc={1.1} giro={rola(t0) ? Math.cos(s * 28) * 25 : 0} marca={fim && !mira ? "x" : undefined} />
                      <Dado x={780} y={300} v={v(t0, 3, 4)} c="#e46a3b" esc={1.1} giro={rola(t0) ? Math.sin(s * 26) * 25 : 0} op={fim ? 0.45 : 1} />
                      {fim && !mira ? (
                        <text x={490} y={560} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={56} fill={cor.texto} opacity={prog(s, W(10, "maior"), 0.3)}>Maior dado vence: <tspan fill={VERDE}>5</tspan> × 4</text>
                      ) : null}
                      {mira ? (
                        <g opacity={prog(s, W(11, "Cada") - 0.1, 0.35)}>
                          <rect x={60} y={470} width={860} height={270} rx={24} fill="rgba(110,231,255,.08)" stroke={CIANO} strokeWidth={3} />
                          <text x={90} y={530} fontFamily={fonte} fontWeight={900} fontSize={42} fill={CIANO}>Mira 2</text>
                          <text x={90} y={580} fontFamily={fonte} fontWeight={600} fontSize={32} fill={cor.texto}>2 naves suas na região</text>
                          <Nave x={170} y={665} esc={0.55} />
                          <Nave x={240} y={665} esc={0.55} />
                          <Dado x={560} y={640} v={1} c={VERDE} esc={0.8} op={0.35} />
                          <path d="M630,640 L700,640" stroke={cor.texto} strokeWidth={6} markerEnd="" />
                          <path d="M690,622 L716,640 L690,658 Z" fill={cor.texto} />
                          <Dado x={790} y={640} v={2} c={VERDE} esc={0.8 * (0.8 + 0.2 * mola(s, W(11, "Cada") + 0.4))} />
                          <text x={675} y={735} textAnchor="middle" fontFamily={fonte} fontWeight={700} fontSize={26} fill={cor.textoSuave}>o dado nunca mostra menos que a mira</text>
                        </g>
                      ) : null}
                    </>
                  );
                })()}
              </g>
            ) : null}
          </svg>
        </Painel>
      ) : null}

      {/* ====== a profecia do Ronaldo ====== */}
      {vis(I(12), I(14)) ? (
        <Painel op={cena(I(12), I(14))} titulo="A profecia" corBorda={cor.ouro}>
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            {(() => {
              const rolando = s < I(13) - 0.05;
              const v = rolando ? 1 + (Math.floor(s * 14) % 6) : 1;
              return (
                <>
                  <circle cx={490} cy={400} r={230} fill={cor.ouro} opacity={rolando ? 0.15 + 0.1 * Math.sin(s * 8) : 0} />
                  <Dado x={490} y={400} v={v} c={VERDE} esc={rolando ? 2 + 0.2 * Math.sin(s * 12) : 2.4 * (0.8 + 0.2 * mola(s, I(13) - 0.05))} giro={rolando ? s * 400 : 0} />
                  {s >= W(12, "seis!") ? <text x={490} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={64} fill={cor.ouro} opacity={rolando ? 1 : 0.3}>6! 6! 6!</text> : null}
                  {!rolando ? <text x={490} y={720} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={72} fill={VERMELHO} transform={`rotate(-4 490 720)`}>Saiu um.</text> : null}
                </>
              );
            })()}
          </svg>
        </Painel>
      ) : null}

      {/* ====== Ferro-Velho ====== */}
      {vis(I(14), I(15)) ? (
        <Painel op={cena(I(14), I(15))} titulo="Perdeu sem escudo" corBorda={VERMELHO}>
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M330,520 L650,520 L620,720 L360,720 Z" fill="#3b4060" stroke={cor.textoSuave} strokeWidth={5} />
            <text x={490} y={640} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={44} fill={cor.texto}>Ferro-Velho</text>
            <Nave x={490 + 30 * Math.sin(prog(s, I(14) + 0.3, 1.2) * 6)} y={180 + 330 * prog(s, I(14) + 0.3, 1.2, Easing.in(Easing.quad))} esc={1.1} giro={180 * prog(s, I(14) + 0.3, 1.2)} />
          </svg>
          <div style={{ position: "absolute", left: 40, right: 40, top: 110, fontFamily: fonte, fontWeight: 700, fontSize: 34, color: cor.textoSuave }}>Com escudo livre, a nave leva um marcador de dano e fica.</div>
        </Painel>
      ) : null}

      {/* ====== Retorno à Estação (figura do manual) ====== */}
      {vis(I(15), I(17)) ? (
        <Painel op={cena(I(15), I(17))} titulo="Retornar à Estação" corBorda={VERDE}>
          {s < I(16) ? (
            <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
              {[0, 1, 2].map((i) => (
                <Nave key={i} x={200 + i * 290 - 0} y={200 + 380 * prog(s, I(15) + 0.2 + i * 0.15, 1.2)} esc={0.9} giro={180} />
              ))}
              <rect x={190} y={620} width={600} height={120} rx={20} fill="#2a2f45" stroke={VERDE} strokeWidth={5} />
              <text x={490} y={695} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={44} fill={cor.texto}>sua estação</text>
            </svg>
          ) : (
            <>
              <Img src={staticFile("img/ae/modulos-ciencia.webp")} style={{ position: "absolute", left: 40, top: 120, width: 900, transform: `scale(${0.95 + 0.05 * prog(s, I(16), 0.6)})` }} />
              <div style={{ position: "absolute", left: 40, right: 40, top: 430, fontFamily: fonte, fontWeight: 800, fontSize: 44, color: cor.texto, lineHeight: 1.2 }}>
                Cada nave ativa <span style={{ color: VERDE }}>1 módulo</span>.
                <div style={{ marginTop: 18, opacity: prog(s, W(16, "Reator") - 0.1, 0.4) }}>
                  1 nave no <span style={{ color: VERDE }}>Reator Primário</span> ativa a fileira inteira de ciência.
                </div>
              </div>
              <Credito texto="Ilustração: manual Galápagos p. 13" />
            </>
          )}
        </Painel>
      ) : null}

      {/* ====== o "módulo do reteté" ====== */}
      {vis(I(17), I(19)) ? (
        <Painel op={cena(I(17), I(19))} titulo="Módulo novo?" corBorda={cor.ouro}>
          <div style={{ position: "absolute", left: 230, top: 140, width: 520, height: 420, borderRadius: 26, background: "linear-gradient(160deg,#ffe9a6,#e3b23c)", border: "6px solid #0b0d1a", transform: `rotate(-3deg) scale(${Math.max(0.001, mola(s, I(17) + 0.3))})`, textAlign: "center", paddingTop: 60 }}>
            <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 56, color: "#0b0d1a" }}>Módulo do</div>
            <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 88, color: "#0b0d1a" }}>Reteté</div>
            <div style={{ fontFamily: fonte, fontWeight: 700, fontSize: 30, color: "#5a4210", marginTop: 20 }}>efeito: glória</div>
          </div>
          {s >= I(18) ? (
            <div style={{ position: "absolute", left: 160, top: 300, width: 660, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 84, color: VERMELHO, border: `8px solid ${VERMELHO}`, borderRadius: 20, padding: "10px 0", background: "rgba(8,12,28,.7)", transform: `rotate(-12deg) scale(${1.5 - 0.5 * prog(s, I(18), 0.2)})`, opacity: prog(s, I(18), 0.12) }}>NÃO EXISTE</div>
          ) : null}
        </Painel>
      ) : null}

      {/* ====== fim da partida ====== */}
      {vis(I(19), I(20)) ? (
        <Painel op={cena(I(19), I(20))} titulo="Como a partida acaba" corBorda={cor.ouro}>
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <text x={60} y={150} fontFamily={fonte} fontWeight={700} fontSize={34} fill={cor.textoSuave}>módulos e desenvolvimentos sobem as trilhas → PV</text>
            <rect x={60} y={250} width={860} height={40} rx={20} fill="#2a2f45" />
            {[VERDE, ROXO, "#6ea8ff"].map((c, i) => {
              const fimP = [0.92, 0.7, 0.62][i];
              const p = prog(s, I(19) + 0.2, W(19, "terminus,") - I(19), Easing.inOut(Easing.quad)) * fimP;
              return <circle key={c} cx={80 + 820 * p} cy={270 + (i - 1) * 4} r={26} fill={c} stroke="#0b0d1a" strokeWidth={4} />;
            })}
            <g transform="translate(860,270)">
              <rect x={-14} y={-70} width={28} height={140} rx={8} fill={cor.ouro} />
              <text x={0} y={-90} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={30} fill={cor.ouro}>terminus</text>
            </g>
            <g opacity={prog(s, W(19, "terminus,") + 0.3, 0.4)}>
              <text x={490} y={420} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={54} fill={cor.texto}>todos jogam +1 turno</text>
            </g>
            <g opacity={prog(s, W(19, "vence") - 0.1, 0.4)} transform={`translate(490,600) scale(${Math.max(0.001, mola(s, W(19, "vence") - 0.1))})`}>
              <path d="M-70,-90 L70,-90 L60,-10 Q0,40 -60,-10 Z" fill={cor.ouro} />
              <rect x={-14} y={20} width={28} height={50} fill={cor.ouro} />
              <rect x={-60} y={70} width={120} height={22} rx={6} fill={cor.ouro} />
              <text x={0} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={46} fill={cor.texto}>vence quem tiver mais PV</text>
            </g>
          </svg>
        </Painel>
      ) : null}

      {/* ====== cartela final ====== */}
      {s >= I(20) - 0.14 ? (
        <AbsoluteFill style={{ background: `rgba(7,9,20,${0.85 * prog(s, I(20) - 0.14, 0.4)})` }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center", opacity: prog(s, I(20) - 0.04, 0.4) }}>
            <div style={{ ...tipo.rotulo, color: CIANO }}>Andromeda's Edge</div>
            <div style={{ margin: "40px auto 0", width: 920, border: `3px solid ${cor.ouro}`, borderRadius: 28, padding: "26px 30px", background: "rgba(8,12,28,.7)" }}>
              <div style={{ ...tipo.rotulo, fontSize: 28, color: cor.ouro }}>Tutorial completo, com exercícios</div>
              <div style={{ fontFamily: fonte, fontWeight: 800, fontSize: 44, color: cor.texto, marginTop: 10 }}>eliteboardgamers.com.br</div>
              <div style={{ fontFamily: fonte, fontWeight: 700, fontSize: 38, color: cor.texto, marginTop: 2 }}>/como-jogar/andromedas-edge</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 46 }}>
              <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 48, color: cor.fundo, background: cor.marca, padding: "28px 56px", borderRadius: 999, transform: `scale(${0.8 + 0.2 * prog(s, W(20, "Segue") - 0.1, 0.5)})`, opacity: prog(s, W(20, "Segue") - 0.1, 0.3) }}>Segue pra mais 1 minuto de regras</div>
            </div>
            <Img src={staticFile("img/logo.webp")} style={{ width: 300, marginTop: 50, opacity: prog(s, I(20) + 0.4, 0.5) }} />
            <div style={{ ...tipo.rotulo, fontSize: 24, color: cor.textoSuave, marginTop: 40, opacity: prog(s, I(20) + 0.6, 0.5) }}>Regras do manual Galápagos · personagens de ficção</div>
          </div>
        </AbsoluteFill>
      ) : null}

      <Legenda s={s} />
      <Granulado forca={0.1} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, FIM_AE - 1.2, FIM_AE - 0.1], [0, 0.09, 0.09, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[I(3), I(4), I(6), I(8), I(9), I(15), I(16), I(17), I(19)].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.3} /></Sequence>
      ))}
      {[2, 6, 12, 17].map((id) => (
        <Sequence key={id} from={Math.round((I(id) - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.32} /></Sequence>
      ))}
      <Sequence from={Math.round((I(7) - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((I(13) - 0.08) * fps)} durationInFrames={Math.round(2 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.3} /></Sequence>
      <Sequence from={Math.round((I(18) - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
    </AbsoluteFill>
  );
};
