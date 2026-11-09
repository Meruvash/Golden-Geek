import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Aura, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import { CIANO, Cartela, Credito, Espaco, Hex, Invasor, Legenda, Nave, Painel, ROXO, SAI, SeloDica, VERDE, VERMELHO, entre, mola, pos, prog } from "../ae/pecas";
import { DURACAO, FALAS } from "./dados";
import { I, W } from "./marcas";

// Parte 1: "E se você acordasse dentro de Andromeda's Edge…" (o Lançamento).
export const FIM_P1 = DURACAO + 1.6;

export const AeP1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = frame / fps;
  const cena = (a: number, b: number) => prog(s, a - 0.1, 0.35) * (1 - prog(s, b - 0.3, 0.25, SAI));
  const vis = (a: number, b: number) => entre(s, a - 0.1, b);

  const tWan = I(5) - 0.15;
  const wanSobe = prog(s, tWan, 0.5);
  const alerta = entre(s, W(12, "mexeu.") - 0.1, I(14)) ? 0.5 + 0.5 * Math.sin(s * 9) : 0;
  const impacto = entre(s, W(13, "batalha.") - 0.04, W(13, "batalha.") + 0.04);

  // ----- Ronaldo -----
  const ronFala = (id: number) => entre(s, I(id) - 0.05, I(id + 1) - 0.05);
  const ronExpr = ronFala(3) || ronFala(6) || ronFala(10) ? "orgulhoso" : entre(s, I(12), FIM_P1) || ronFala(7) || ronFala(4) ? "apavorado" : "confuso";
  const ronPose = ronFala(3) || ronFala(6) || ronFala(10) ? "biblia" : entre(s, I(13), FIM_P1) ? "encolhido" : "cartas";
  // arrebatamento: sobe na luz e despenca no "Não foi."
  const sobe = entre(s, I(3), W(4, "foi.")) ? -90 * prog(s, I(3), 1.2) : entre(s, W(4, "foi."), W(4, "foi.") + 0.5) ? -90 * (1 - prog(s, W(4, "foi."), 0.3, Easing.in(Easing.quad))) : 0;
  const ronX = s < tWan ? 420 : 250;
  const ronEsc = s < tWan ? 0.7 : 0.62;
  const falando = (q: string) => FALAS.some((f) => f.quem === q && s >= f.inicio && s < f.inicio + f.dur);
  const bob = (q: string) => (falando(q) ? Math.abs(Math.sin(s * 9)) * -9 : 0);
  const zoom = ronFala(3) ? 1 + 0.25 * prog(s, I(3), 0.4) : ronFala(10) ? 1 + 0.3 * prog(s, I(10), 0.3) : entre(s, I(13), I(14)) ? 1 + 0.2 * prog(s, I(13), 0.4) : 1;
  const camOrig = entre(s, I(13), I(14)) ? "810px 1500px" : "300px 1500px";
  const tremor = entre(s, W(13, "batalha.") - 0.05, W(13, "batalha.") + 0.5) ? Math.sin(s * 70) * 12 * (1 - prog(s, W(13, "batalha."), 0.5)) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: "#070914", fontFamily: fonte, filter: impacto ? "grayscale(1) invert(1) contrast(3)" : undefined }}>
      <AbsoluteFill style={{ transform: `scale(${zoom}) translateX(${tremor}px)`, transformOrigin: camOrig }}>
        <Espaco s={s} alerta={alerta} escuro={s < I(2) ? 0.35 * (1 - prog(s, I(2) - 0.3, 0.6)) : 0} />
        {/* Baía de Lançamento: 3 transportadores no chão da estação */}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          {[0, 1, 2].map((i) => {
            const t0 = W(4, "três") - 0.1 + i * 0.12;
            const saiu = i === 0 && s >= W(9, "pousou") - 1.2; // a nave lançada some da baía
            return <Nave key={i} x={620 + i * 120} y={1640} esc={0.7 * (s < I(4) ? 1 : 1 + 0.25 * Math.max(0, 1 - Math.abs(s - t0) * 3))} giro={0} op={saiu ? 0.2 : 1} />;
          })}
          <text x={740} y={1760} textAnchor="middle" fontFamily={fonte} fontWeight={800} fontSize={28} fill={CIANO} opacity={s >= W(4, "três") - 0.1 && s < tWan + 0.5 ? 1 : 0.35}>Baía de Lançamento</text>
        </svg>
        {/* luz do arrebatamento (que não era arrebatamento) */}
        {entre(s, I(3) - 0.05, W(4, "foi.") + 0.1) ? (
          <div style={{ position: "absolute", left: ronX - 170, top: 0, width: 340, height: 1920, background: "linear-gradient(180deg, rgba(255,240,190,.0), rgba(255,240,190,.35) 60%, rgba(255,240,190,.15))", opacity: prog(s, I(3), 0.3) * (1 - prog(s, W(4, "foi."), 0.1)) }} />
        ) : null}
        {/* luz da Bíblia */}
        {[6, 10].map((id) =>
          ronFala(id) ? <div key={id} style={{ position: "absolute", left: 300, top: 1390, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,240,190,.85), rgba(255,240,190,0) 70%)", opacity: prog(s, I(id), 0.3) * (1 - prog(s, I(id + 1) - 0.4, 0.35)) }} /> : null,
        )}
        {s >= tWan ? <Aura x={810} y={1500 + (1 - wanSobe) * 500} raio={260 + 10 * Math.sin(s * 2)} seed={4} /> : null}
        <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(0,${bob("ronaldo") + sobe})`}>
            <Ronaldo x={ronX} y={1905} escala={ronEsc} expr={ronExpr as "confuso"} pose={ronPose as "cartas"} />
          </g>
          {s >= tWan ? (
            <g transform={`translate(0,${(1 - wanSobe) * 800 + bob("wan")})`}>
              <Wan x={810} y={1905} escala={0.66} expr={entre(s, I(11), I(12)) ? "sorriso" : s >= I(12) ? "serio" : "calmo"} pose={entre(s, I(7), I(9)) || entre(s, I(11), I(12)) ? "livro" : "bracos"} brilhoLivro={entre(s, I(7), I(9)) || entre(s, I(11), I(12))} />
            </g>
          ) : null}
        </svg>
      </AbsoluteFill>

      {/* ====== gancho ====== */}
      {s < I(2) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 210, opacity: 1 - prog(s, I(2) - 0.3, 0.25, SAI) }}>
          <div style={{ ...tipo.rotulo, color: CIANO }}>Ep. 1 · Andromeda's Edge</div>
          <div style={{ ...tipo.titulo, fontSize: 100, color: cor.texto, marginTop: 16 }}>
            E se você acordasse dentro de <span style={{ color: CIANO, opacity: prog(s, W(1, "Andromeda's") - 0.1, 0.3) }}>Andromeda's Edge</span>…
          </div>
          <div style={{ ...tipo.apoio, color: cor.texto, marginTop: 22, opacity: prog(s, W(1, "sem") - 0.05, 0.3) }}>sem nunca ter jogado?</div>
          <Img src={staticFile("img/ae/capa-1.webp")} style={{ width: 320, marginTop: 36, borderRadius: 16, transform: `rotate(-4deg) scale(${0.85 + 0.15 * prog(s, W(1, "Andromeda's"), 0.6)})`, opacity: prog(s, W(1, "Andromeda's") - 0.1, 0.3), boxShadow: "0 20px 60px rgba(0,0,0,.6)" }} />
          <div style={{ ...tipo.rotulo, fontSize: 22, color: cor.textoSuave, marginTop: 14 }}>Imagem: Lucky Duck Games</div>
        </div>
      ) : null}
      {/* "na beira da galáxia" */}
      {entre(s, I(2), I(3)) ? (
        <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 260, opacity: prog(s, W(2, "galáxia.") - 0.3, 0.4) * (1 - prog(s, I(3) - 0.2, 0.2)) }}>
          <div style={{ ...tipo.rotulo, color: CIANO }}>A Margem</div>
          <div style={{ ...tipo.titulo, fontSize: 84, color: cor.texto, marginTop: 10 }}>a beira da galáxia</div>
        </div>
      ) : null}
      {/* "Não foi." */}
      {entre(s, W(4, "foi.") - 0.05, W(4, "três") - 0.1) ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 360, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 150, color: VERMELHO, transform: `rotate(-6deg) scale(${pos(mola(s, W(4, "foi.") - 0.05))})` }}>NÃO FOI.</div>
      ) : null}

      {/* ====== Lançar OU Retornar ====== */}
      {vis(I(5), I(6)) ? (
        <Painel op={cena(I(5), I(6))} titulo="No seu turno, só uma coisa">
          <SeloDica />
          <div style={{ position: "absolute", left: 40, right: 40, top: 110, bottom: 40, display: "flex", alignItems: "center", gap: 24 }}>
            {[
              { t: "Lançar", d: "1 nave da baía para uma região do mapa", k: W(5, "lança") },
              { t: "Retornar", d: "todas as naves voltam e ativam a estação", k: W(5, "volta") },
            ].map((o, i) => (
              <React.Fragment key={o.t}>
                {i === 1 ? <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 64, color: cor.ouro, opacity: prog(s, W(5, "volta") - 0.3, 0.3) }}>OU</div> : null}
                <div style={{ flex: 1, height: 560, borderRadius: 26, border: `3px solid ${i ? ROXO : VERDE}`, background: "rgba(255,255,255,.04)", padding: 30, transform: `scale(${pos(mola(s, o.k - 0.1))})`, textAlign: "center" }}>
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

      {/* ====== a nuvem roxa (nebulosa) ====== */}
      {vis(I(6), I(8)) ? (
        <Painel op={cena(I(6), I(8))} titulo={s < I(7) ? "A nuvem roxa" : "Nebulosa: só com Viagem"} corBorda={ROXO}>
          {s >= I(7) ? <SeloDica /> : null}
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <defs>
              <radialGradient id="nuvem"><stop offset="0" stopColor={ROXO} stopOpacity={0.9} /><stop offset="1" stopColor="#4b2a7a" stopOpacity={0.2} /></radialGradient>
            </defs>
            <Hex x={490} y={300} r={190} fill="url(#nuvem)" borda={ROXO} rotulo="nebulosa" />
            {(() => {
              // o transportador tenta e bate na borda
              const t0 = W(6, "nuvem") - 0.2;
              const ida = prog(s, t0, 0.9, Easing.in(Easing.quad));
              const volta = s >= I(7) ? prog(s, I(7), 0.5) : 0;
              const y = 700 - 230 * ida + 120 * volta;
              return <Nave x={490} y={y} esc={1} giro={volta > 0 ? 180 * volta : 0} />;
            })()}
            {s >= W(7, "Viagem.") - 0.1 ? (
              <g transform={`translate(490,470) scale(${pos(mola(s, W(7, "Viagem.") - 0.1))})`}>
                <circle r={70} fill="#fff" opacity={0.95} />
                <path d="M-34,-34 L34,34 M34,-34 L-34,34" stroke={VERMELHO} strokeWidth={16} strokeLinecap="round" />
              </g>
            ) : null}
          </svg>
          {s >= I(7) ? (
            <div style={{ position: "absolute", left: 40, right: 40, top: 610, fontFamily: fonte, fontWeight: 800, fontSize: 42, color: cor.texto, lineHeight: 1.2, opacity: prog(s, I(7), 0.4) }}>
              O <span style={{ color: VERDE }}>transportador</span> não tem <span style={{ color: ROXO }}>Viagem</span>: não entra em nebulosa.
            </div>
          ) : null}
        </Painel>
      ) : null}

      {/* ====== primeiro Lançamento: região desocupada (figura do manual) ====== */}
      {vis(I(8), I(9)) ? (
        <Painel op={cena(I(8), I(9))} titulo="Primeiro Lançamento">
          <SeloDica />
          <Img src={staticFile("img/ae/lancamento-primeiro.webp")} style={{ position: "absolute", left: 60, top: 100, width: 880, transform: `scale(${0.92 + 0.08 * prog(s, I(8), 0.8)})` }} />
          <div style={{ position: "absolute", left: 40, right: 40, top: 560, fontFamily: fonte, fontWeight: 800, fontSize: 44, color: cor.texto, lineHeight: 1.2, opacity: prog(s, W(8, "desocupada:") - 0.2, 0.4) }}>
            Só região <span style={{ color: VERDE }}>desocupada</span>.
            <div style={{ fontWeight: 600, fontSize: 34, color: cor.textoSuave, marginTop: 10 }}>Sem invasor e sem nave de ninguém.</div>
          </div>
          <Credito texto="Ilustração: manual Galápagos p. 9" />
        </Painel>
      ) : null}

      {/* ====== pousou no planeta e ganhou uma lua ====== */}
      {vis(I(9), I(11)) ? (
        <Painel op={cena(I(9), I(11))} titulo="Planeta vazio" corBorda="#f0a86b">
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <Hex x={490} y={400} r={250} fill="#2a1d24" borda="#f0a86b" />
            <circle cx={490} cy={400} r={140} fill="#c4643f" />
            <path d="M350,400 A140,140 0 0 0 630,400 Z" fill="#000" opacity={0.2} />
            <Nave x={490} y={60 + 300 * prog(s, W(9, "pousou") - 0.3, 0.9, Easing.out(Easing.quad))} esc={0.9} giro={180} />
            {/* a lua sai do planeta e vai para a estação */}
            {s >= W(9, "lua") - 0.2 ? (
              <g transform={`translate(${640 + 160 * prog(s, W(9, "lua"), 1)},${300 - 120 * prog(s, W(9, "lua"), 1)}) scale(${pos(mola(s, W(9, "lua") - 0.2))})`}>
                <circle r={50} fill="#e7e2d6" stroke="#0b0d1a" strokeWidth={5} />
                <circle cx={-14} cy={-10} r={10} fill="#c9c2b3" />
                <circle cx={16} cy={14} r={7} fill="#c9c2b3" />
                {ronFala(10) ? <circle r={80} fill="none" stroke={cor.ouro} strokeWidth={6} opacity={0.5 + 0.5 * Math.sin(s * 10)} /> : null}
              </g>
            ) : null}
          </svg>
          {ronFala(10) ? (
            <div style={{ position: "absolute", left: 40, right: 40, top: 700, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 64, color: cor.ouro, transform: `scale(${pos(mola(s, W(10, "sinal!") - 0.1))})` }}>É SINAL!</div>
          ) : null}
        </Painel>
      ) : null}

      {/* ====== ativar a região ====== */}
      {vis(I(11), I(12)) ? (
        <Painel op={cena(I(11), I(12))} titulo="Ative a região">
          <SeloDica />
          <div style={{ position: "absolute", left: 40, right: 40, top: 110, bottom: 40, display: "flex", gap: 24 }}>
            {[
              { t: "Planeta", d: "você pega a lua do topo", k: W(11, "Planeta") },
              { t: "Base Aliada", d: "você faz a ação dela", k: W(11, "Base") },
            ].map((o, i) => (
              <div key={o.t} style={{ flex: 1, borderRadius: 26, border: `3px solid ${i ? cor.ouro : "#e46a3b"}`, background: "rgba(255,255,255,.04)", padding: 30, textAlign: "center", transform: `scale(${pos(mola(s, o.k - 0.1))})` }}>
                <svg width={340} height={360} viewBox="-170 -180 340 360">
                  {i === 0 ? (
                    <>
                      <circle r={110} fill="#c4643f" />
                      <path d="M-110,0 A110,110 0 0 0 110,0 Z" fill="#000" opacity={0.2} />
                      <circle cx={120} cy={-100} r={34} fill="#e7e2d6" stroke="#0b0d1a" strokeWidth={4} />
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

      {/* ====== o invasor se mexe ====== */}
      {vis(I(12), I(14)) ? (
        <Painel op={cena(I(12), I(14))} titulo={s < I(13) ? "Ataque Invasor" : "Batalha"} corBorda={VERMELHO}>
          {s >= W(12, "invasor") - 0.1 && s < I(13) ? <SeloDica /> : null}
          <svg width={980} height={820} style={{ position: "absolute", left: 0, top: 0 }}>
            <Hex x={300} y={420} r={170} fill="#2a1d24" borda="#f0a86b" rotulo="seu planeta" />
            <Hex x={680} y={320} r={170} fill="#2b1838" borda={ROXO} rotulo="nebulosa vizinha" />
            <Nave x={300} y={400} esc={0.9} />
            <Invasor x={680 - 380 * prog(s, W(12, "direto") - 0.2, 1.1, Easing.inOut(Easing.quad)) + (s < W(12, "direto") - 0.2 ? Math.sin(s * 30) * 6 : 0)} y={300 + 90 * prog(s, W(12, "direto") - 0.2, 1.1)} esc={1} />
          </svg>
          {s < I(13) ? (
            <div style={{ position: "absolute", left: 40, right: 40, top: 650, fontFamily: fonte, fontWeight: 800, fontSize: 40, color: cor.texto, lineHeight: 1.2, opacity: prog(s, W(12, "invasor") - 0.1, 0.4) }}>
              Depois de ativar, um <span style={{ color: VERMELHO }}>invasor ao alcance</span> vem para a sua região.
            </div>
          ) : (
            <div style={{ position: "absolute", left: 0, right: 0, top: 620, textAlign: "center", fontFamily: fonte, fontWeight: 900, fontSize: 120, color: VERMELHO, transform: `scale(${pos(mola(s, W(13, "batalha.") - 0.05))})` }}>BATALHA</div>
          )}
        </Painel>
      ) : null}

      {/* ====== cartela ====== */}
      {s >= I(14) - 0.14 ? <Cartela op={prog(s, I(14) - 0.14, 0.4)} rotulo="Continua na Parte 2: a batalha" botao="Segue pra ver a Parte 2" kBotao={prog(s, W(14, "Segue") - 0.1, 0.4)} kLogo={prog(s, I(14) + 0.5, 0.5)} /> : null}

      <Legenda s={s} falas={FALAS} ocultar={[1, 14]} />
      <Granulado forca={0.1} />

      {/* ====== áudio ====== */}
      <Audio src={staticFile("audio/trilha.mp3")} volume={(f) => interpolate(f / fps, [0, 0.6, I(12) - 0.2, I(12) + 0.3, FIM_P1 - 1.2, FIM_P1 - 0.1], [0, 0.09, 0.09, 0.04, 0.09, 0], { extrapolateRight: "clamp" })} />
      {FALAS.map((f) => (
        <Sequence key={f.id} from={Math.round(f.inicio * fps)} durationInFrames={Math.ceil((f.dur + 0.3) * fps)} name={`Fala ${f.id} (${f.quem})`} layout="none">
          <Audio src={staticFile(f.arquivo)} volume={1} />
        </Sequence>
      ))}
      {[I(5), I(6), I(8), I(9), I(11), I(12)].map((t, i) => (
        <Sequence key={i} from={Math.round((t - 0.12) * fps)} durationInFrames={Math.round(0.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh-short.mp3")} volume={0.28} /></Sequence>
      ))}
      {[3, 6, 10].map((id) => (
        <Sequence key={id} from={Math.round((I(id) - 0.1) * fps)} durationInFrames={Math.round(1.8 * fps)} layout="none"><Audio src={staticFile("sfx/sparkle.mp3")} volume={0.3} /></Sequence>
      ))}
      <Sequence from={Math.round((W(4, "foi.") - 0.05) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((W(7, "Viagem.") - 0.1) * fps)} durationInFrames={Math.round(0.6 * fps)} layout="none"><Audio src={staticFile("sfx/pop.mp3")} volume={0.45} /></Sequence>
      <Sequence from={Math.round((tWan - 0.05) * fps)} durationInFrames={Math.round(1.5 * fps)} layout="none"><Audio src={staticFile("sfx/whoosh.mp3")} volume={0.35} /></Sequence>
      <Sequence from={Math.round((W(12, "mexeu.") - 3) * fps)} durationInFrames={Math.round(3 * fps)} layout="none"><Audio src={staticFile("sfx/riser.mp3")} trimBefore={Math.round(7 * fps)} volume={0.18} /></Sequence>
      <Sequence from={Math.round((W(13, "batalha.") - 0.1) * fps)} durationInFrames={Math.round(2 * fps)} layout="none"><Audio src={staticFile("sfx/impact-bass-1.mp3")} volume={0.3} /></Sequence>
    </AbsoluteFill>
  );
};
