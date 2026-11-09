import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import { CIANO, Cartela, SEGURO, UI_QUADRADO, MUNDO_QUADRADO, Credito, Dado, Espaco, Hex, Invasor, Legenda, Nave, Painel, ROXO, SAI, SeloDica, VERDE, VERMELHO, entre, mola, pos, prog, rolar } from "../ae/pecas";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// Parte 2: "A profecia do dado" (batalha e Retorno à Estação).
export const FIM_P2 = DURACAO + 1.6;

export const AeP2: React.FC<{ quadrado?: boolean }> = ({ quadrado = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  // posições: na versão quadrada os personagens vão para os cantos de baixo, menores
  const RX = (x: number) => (quadrado ? 125 : x);
  const escR = (e: number) => (quadrado ? 0.55 : e);
  const WX = quadrado ? 955 : 810;
  const escW = quadrado ? 0.58 : 0.66;
  const cena = (a: number, b: number) => prog(s, a - 0.1, 0.35) * (1 - prog(s, b - 0.3, 0.25, SAI));
  const vis = (a: number, b: number) => entre(s, a - 0.1, b);

  const tRes = W(7, "um.") - 0.08; // o dado para no 1
  const impacto = entre(s, W(1, "Vorticon") - 0.02, W(1, "Vorticon") + 0.06);

  // ----- personagens -----
  const ronFala = (id: number) => entre(s, I(id) - 0.05, I(id + 1) - 0.05);
  const ronExpr = ronFala(2) || ronFala(6) || ronFala(11) ? "orgulhoso" : entre(s, I(7), I(10)) || s < I(2) ? "apavorado" : "confuso";
  const ronPose = ronFala(2) || ronFala(6) || ronFala(11) ? "biblia" : entre(s, tRes, I(10)) ? "encolhido" : "cartas";
  const wanExpr = ronFala(2) || entre(s, I(12), I(13)) ? "sorriso" : entre(s, I(7), I(9)) ? "serio" : "calmo";
  const wanPose = entre(s, I(3), I(6)) || entre(s, I(8), I(9)) || entre(s, I(10), I(11)) ? "livro" : "bracos";
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -9 : 0);
  const zoom = ronFala(6) ? 1 + 0.3 * prog(s, I(6), 0.4) : entre(s, tRes, I(8)) ? 1.3 : entre(s, I(12), I(13)) ? 1 + 0.2 * prog(s, I(12), 0.3) : 1;
  const camOrig = entre(s, I(12), I(13)) ? `${WX}px 1500px` : `${RX(250)}px 1500px`;
  const tremor = entre(s, tRes, tRes + 0.5) ? Math.sin(s * 70) * 10 * (1 - prog(s, tRes, 0.5)) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#070914", fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      <div style={quadrado ? MUNDO_QUADRADO : { position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }}>
      <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
        <Espaco s={s} alerta={s < I(3) ? 0.5 + 0.5 * Math.sin(s * 9) : 0} escuro={entre(s, tRes, I(10)) ? 0.35 : 0} />
        {[2, 6, 11].map((id) =>
          ronFala(id) ? <div key={id} style={{ position: "absolute", left: RX(250) + 50, top: quadrado ? 1378 : 1320, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,.85), rgba(255,240,190,0) 70%)", opacity: prog(s, I(id), 0.3) * (1 - prog(s, I(id + 1) - 0.4, 0.35)) }} /> : null,
        )}
        <Aura x={WX} y={1430} raio={260 + 10 * Math.sin(s * 2)} seed={4} />
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(0,${bob("ronaldo")})`}>
            <Ronaldo x={RX(250)} y={1835} escala={escR(0.62)} expr={ronExpr as "confuso"} pose={ronPose as "cartas"} />
          </g>
          <g transform={`translate(0,${bob("wan")})`}>
            <Wan x={WX} y={1835} escala={escW} expr={wanExpr as "calmo"} pose={wanPose as "livro"} brilhoLivro={wanPose === "livro"} />
          </g>
        </svg>
      </AbsoluteFill>
      </div>

      {/* ====== textos e painéis: dentro da zona segura do Reels ====== */}
      <AbsoluteFill style={quadrado ? UI_QUADRADO : SEGURO}>
      {/* ====== gancho: o Vorticon pousa ====== */}
      {s < I(3) ? (
        <>
          <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 200, opacity: 1 - prog(s, I(3) - 0.3, 0.25, SAI) }}>
            <div style={{ ...tipo.rotulo, color: CIANO }}>Ep. 1 · Parte 2 · Andromeda's Edge</div>
            <div style={{ ...tipo.titulo, fontSize: 96, color: cor.texto, marginTop: 14 }}>A profecia <span style={{ color: VERMELHO }}>do dado</span></div>
          </div>
          <Painel op={cena(I(1), I(3))} top={520} altura={640} corBorda={VERMELHO} titulo="Atacante Vorticon">
            <svg width={980} height={640} style={{ position: "absolute", left: 0, top: 0 }}>
              <Hex x={490} y={350} r={230} fill="#2a1d24" borda="#f0a86b" rotulo="planeta do Ronaldo" />
              <Nave x={400} y={340} esc={0.9} />
              <Invasor x={580} y={-100 + 440 * prog(s, W(1, "Vorticon") - 0.5, 0.5, Easing.in(Easing.quad))} esc={1.3} />
            </svg>
          </Painel>
        </>
      ) : null}

      {/* ====== regra da batalha ====== */}
      {vis(I(3), I(6)) ? (
        <Painel op={cena(I(3), I(6))} titulo="Batalha" corBorda={VERMELHO}>
          {s >= W(3, "Cada") - 0.1 ? <SeloDica /> : null}
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            {(() => {
              const t0 = W(3, "Cada");
              const fim = s >= W(3, "maior") - 0.1;
              const armas = s >= I(4) - 0.1;
              const mira = s >= I(5) - 0.1;
              return (
                <>
                  <text x={240} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={38} fill={VERDE}>Ronaldo{armas ? " · 1 arma" : ""}</text>
                  <Dado x={240} y={300} v={rolar(s, t0, 1.2, 4, 0)} c={VERDE} esc={1.1} giro={s < t0 + 1.2 && s > t0 ? Math.sin(s * 30) * 25 : 0} marca={fim && !mira ? "v" : undefined} />
                  <text x={700} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={38} fill={VERMELHO}>Vorticon{armas ? " · 2 armas" : ""}</text>
                  <Dado x={620} y={300} v={rolar(s, t0, 1.2, 3, 2)} c="#e46a3b" esc={1.1} giro={s < t0 + 1.2 && s > t0 ? Math.cos(s * 28) * 25 : 0} marca={fim && !mira ? "x" : undefined} />
                  <Dado x={780} y={300} v={rolar(s, t0, 1.2, 2, 4)} c="#e46a3b" esc={1.1 * (armas ? 1 + 0.15 * Math.max(0, 1 - Math.abs(s - W(4, "duas.")) * 3) : 1)} giro={s < t0 + 1.2 && s > t0 ? Math.sin(s * 26) * 25 : 0} op={fim && !armas ? 0.45 : 1} />
                  {fim && !mira ? <text x={490} y={560} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={54} fill={cor.texto}>Maior dado vence: <tspan fill={VERDE}>4</tspan> × 3</text> : null}
                  {armas && !mira ? <text x={490} y={650} textAnchor="middle" fontFamily={fonte} fontWeight={700} fontSize={34} fill={cor.textoSuave}>cada arma é um dado</text> : null}
                  {mira ? (
                    <g opacity={prog(s, I(5) - 0.1, 0.35)}>
                      <rect x={60} y={470} width={860} height={300} rx={24} fill="rgba(110,231,255,.08)" stroke={CIANO} strokeWidth={3} />
                      <text x={90} y={530} fontFamily={fonte} fontWeight={900} fontSize={42} fill={CIANO}>Mira</text>
                      <text x={90} y={580} fontFamily={fonte} fontWeight={600} fontSize={32} fill={cor.texto}>o menor valor que o seu dado mostra</text>
                      <Nave x={150} y={675} esc={0.55} />
                      <Nave x={220} y={675} esc={0.55} op={prog(s, W(5, "Cada") - 0.1, 0.3)} />
                      <text x={290} y={690} fontFamily={fonte} fontWeight={800} fontSize={34} fill={cor.texto} opacity={prog(s, W(5, "Cada") - 0.1, 0.3)}>= mira 2</text>
                      <Dado x={600} y={660} v={1} c={VERDE} esc={0.8} op={0.35} />
                      <path d="M690,642 L716,660 L690,678 Z" fill={cor.texto} />
                      <Dado x={800} y={660} v={2} c={VERDE} esc={0.8 * (0.8 + 0.2 * mola(s, W(5, "Cada") + 0.4))} />
                      <text x={700} y={752} textAnchor="middle" fontFamily={fonte} fontWeight={700} fontSize={28} fill={cor.textoSuave}>com mira 2, o 1 vira 2</text>
                    </g>
                  ) : null}
                </>
              );
            })()}
          </svg>
          <Credito texto="Regra: manual Galápagos p. 22" />
        </Painel>
      ) : null}

      {/* ====== a profecia ====== */}
      {vis(I(6), I(8)) ? (
        <Painel op={cena(I(6), I(8))} titulo="A profecia" corBorda={cor.ouro}>
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            {(() => {
              const rolando = s < tRes;
              const v = rolando ? 1 + (Math.floor(s * 14) % 6) : 1;
              const vort = s >= W(7, "Vorticon") - 0.1;
              return (
                <>
                  <circle cx={vort ? 300 : 490} cy={400} r={230} fill={cor.ouro} opacity={rolando ? 0.15 + 0.1 * Math.sin(s * 8) : 0} />
                  <Dado x={vort ? 300 : 490} y={400} v={v} c={VERDE} esc={rolando ? 2 + 0.2 * Math.sin(s * 12) : 2.2 * (0.8 + 0.2 * mola(s, tRes))} giro={rolando ? s * 400 : 0} />
                  {s >= W(6, "seis!") - 0.1 && rolando ? <text x={490} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={64} fill={cor.ouro}>6! 6! 6!</text> : null}
                  {!rolando ? <text x={vort ? 300 : 490} y={720} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={68} fill={VERMELHO} transform={`rotate(-4 ${vort ? 300 : 490} 720)`}>Saiu um.</text> : null}
                  {vort ? (
                    <g transform={`translate(0,0)`}>
                      <Dado x={640} y={400} v={5} c="#e46a3b" esc={1.3 * pos(mola(s, W(7, "Vorticon") - 0.1))} marca={s >= W(7, "cinco.") - 0.05 ? "v" : undefined} />
                      <Dado x={820} y={400} v={2} c="#e46a3b" esc={1.3 * pos(mola(s, W(7, "Vorticon")))} op={0.45} />
                      <text x={730} y={620} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={48} fill={cor.texto} opacity={prog(s, W(7, "cinco.") - 0.05, 0.3)}>Vorticon vence</text>
                    </g>
                  ) : null}
                </>
              );
            })()}
          </svg>
        </Painel>
      ) : null}

      {/* ====== Ferro-Velho ====== */}
      {vis(I(8), I(10)) ? (
        <Painel op={cena(I(8), I(10))} titulo="Perdeu sem escudo" corBorda={VERMELHO}>
          <SeloDica />
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M330,520 L650,520 L620,720 L360,720 Z" fill="#3b4060" stroke={cor.textoSuave} strokeWidth={5} />
            <text x={490} y={640} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={44} fill={cor.texto}>Ferro-Velho</text>
            <Nave x={490 + 30 * Math.sin(prog(s, I(8) + 0.3, 1.2) * 6)} y={200 + 310 * prog(s, I(8) + 0.3, 1.2, Easing.in(Easing.quad))} esc={1.1} giro={180 * prog(s, I(8) + 0.3, 1.2)} />
          </svg>
          <div style={{ position: "absolute", left: 40, right: 40, top: 110, fontFamily: fonte, fontWeight: 700, fontSize: 34, color: cor.textoSuave }}>Com escudo livre, a nave leva um marcador de dano e fica.</div>
          {s >= I(9) ? (
            <div style={{ position: "absolute", left: 40, right: 40, top: 200, fontFamily: fonte, fontWeight: 900, fontSize: 58, color: cor.texto, opacity: prog(s, I(9), 0.4) }}>
              sem nave… <span style={{ color: VERMELHO, opacity: prog(s, I(9) + 0.7, 0.3) }}>sem unção.</span>
            </div>
          ) : null}
        </Painel>
      ) : null}

      {/* ====== Retorno à Estação (figura do manual) ====== */}
      {vis(I(10), I(11)) ? (
        <Painel op={cena(I(10), I(11))} titulo="Retornar à Estação" corBorda={VERDE}>
          <SeloDica />
          <Img src={staticFile("img/ae/modulos-ciencia.webp")} style={{ position: "absolute", left: 40, top: 120, width: 900, transform: `scale(${0.95 + 0.05 * prog(s, I(10), 0.6)})` }} />
          <div style={{ position: "absolute", left: 40, right: 40, top: 430, fontFamily: fonte, fontWeight: 800, fontSize: 44, color: cor.texto, lineHeight: 1.2 }}>
            Cada nave ativa <span style={{ color: VERDE }}>1 módulo</span>.
            <div style={{ marginTop: 18, opacity: prog(s, W(10, "Reator") - 0.1, 0.4) }}>
              1 nave no <span style={{ color: VERDE }}>Reator Primário</span> ativa a fileira inteira de ciência.
            </div>
          </div>
          <Credito texto="Ilustração: manual Galápagos p. 13" />
        </Painel>
      ) : null}

      {/* ====== o "módulo do reteté" ====== */}
      {vis(I(11), I(13)) ? (
        <Painel op={cena(I(11), I(13))} titulo="Módulo novo?" corBorda={cor.ouro}>
          <div style={{ position: "absolute", left: 230, top: 140, width: 520, height: 420, borderRadius: 26, background: "linear-gradient(160deg,#ffe9a6,#e3b23c)", border: "6px solid #0b0d1a", transform: `rotate(-3deg) scale(${pos(mola(s, I(11) + 0.3))})`, textAlign: "center", paddingTop: 60 }}>
            <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 56, color: "#0b0d1a" }}>Módulo do</div>
            <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 88, color: "#0b0d1a" }}>Reteté</div>
            <div style={{ fontFamily: fonte, fontWeight: 700, fontSize: 30, color: "#5a4210", marginTop: 20 }}>efeito: glória</div>
          </div>
          {s >= I(12) ? (
            <div style={{ position: "absolute", left: 160, top: 300, width: 660, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 84, color: VERMELHO, border: `8px solid ${VERMELHO}`, borderRadius: 20, padding: "10px 0", background: "rgba(8,12,28,.7)", transform: `rotate(-12deg) scale(${1.5 - 0.5 * prog(s, I(12), 0.2)})`, opacity: prog(s, I(12), 0.12) }}>NÃO EXISTE</div>
          ) : null}
        </Painel>
      ) : null}

      {/* ====== fim da partida ====== */}
      {vis(I(13), I(14)) ? (
        <Painel op={cena(I(13), I(14))} titulo="Como a partida acaba" corBorda={cor.ouro}>
          <SeloDica />
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <text x={60} y={150} fontFamily={fonte} fontWeight={700} fontSize={34} fill={cor.textoSuave}>módulos e desenvolvimentos sobem as trilhas → PV</text>
            <rect x={60} y={250} width={860} height={40} rx={20} fill="#2a2f45" />
            {[VERDE, ROXO, "#6ea8ff"].map((c, i) => {
              const fimP = [0.92, 0.7, 0.62][i];
              const p = prog(s, I(13) + 0.2, Math.max(0.5, W(13, "terminus,") - I(13)), Easing.inOut(Easing.quad)) * fimP;
              return <circle key={c} cx={80 + 820 * p} cy={270 + (i - 1) * 4} r={26} fill={c} stroke="#0b0d1a" strokeWidth={4} />;
            })}
            <g transform="translate(860,270)">
              <rect x={-14} y={-70} width={28} height={140} rx={8} fill={cor.ouro} />
              <text x={0} y={100} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={30} fill={cor.ouro}>terminus</text>
            </g>
            <text x={490} y={440} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={54} fill={cor.texto} opacity={prog(s, W(13, "terminus,") + 0.3, 0.4)}>todos jogam +1 turno</text>
            <g opacity={prog(s, W(13, "vence") - 0.1, 0.4)} transform={`translate(490,610) scale(${pos(mola(s, W(13, "vence") - 0.1))})`}>
              <path d="M-70,-90 L70,-90 L60,-10 Q0,40 -60,-10 Z" fill={cor.ouro} />
              <rect x={-14} y={20} width={28} height={50} fill={cor.ouro} />
              <rect x={-60} y={70} width={120} height={22} rx={6} fill={cor.ouro} />
              <text x={0} y={150} textAnchor="middle" fontFamily={fonte} fontWeight={900} fontSize={46} fill={cor.texto}>vence quem tiver mais PV</text>
            </g>
          </svg>
        </Painel>
      ) : null}

      {s >= I(14) - 0.14 ? <Cartela op={prog(s, I(14) - 0.14, 0.4)} rotulo="Andromeda's Edge · fim do Ep. 1" botao="Segue pra próxima aventura" kBotao={prog(s, W(14, "segue") - 0.1, 0.4)} kLogo={prog(s, I(14) + 0.5, 0.5)} /> : null}

      <Legenda s={s} falas={FALAS} ocultar={[14]} />
      </AbsoluteFill>
      <Granulado forca={0.1} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, tRes - 0.3, tRes, tRes + 1.5, FIM_P2 - 1.2, FIM_P2 - 0.1], [0, 0.09, 0.09, 0.0, 0.09, 0.09, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      <Sequence from={Math.round((W(1, "Vorticon") - 0.6) * fps)} durationInFrames={Math.round(1.2 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.4} /></Sequence>
      <Sequence from={Math.round((W(1, "Vorticon") - 0.08) * fps)} durationInFrames={Math.round(2 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.28} /></Sequence>
      {[I(3), I(6), I(8), I(10), I(11), I(13)].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.28} /></Sequence>
      ))}
      {[2, 6, 11].map((id) => (
        <Sequence key={id} from={Math.round((I(id) - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.3} /></Sequence>
      ))}
      <Sequence from={Math.round((tRes - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
      <Sequence from={Math.round((I(12) - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.5} /></Sequence>
    </AbsoluteFill>
  );
};
