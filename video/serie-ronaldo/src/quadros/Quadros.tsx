import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Aura, Clareira, Granulado } from "../cenario/Cenario";
import { Ronaldo, Wan } from "../personagens/Personagens";
import { area, cor, fonte, tipo } from "../tema";
import "../tema";

const Rotulo: React.FC<{ children: React.ReactNode; cor?: string; style?: React.CSSProperties }> = ({ children, cor: c = cor.ouro, style }) => (
  <div style={{ ...tipo.rotulo, color: c, ...style }}>{children}</div>
);

// Faixa escura atrás do texto do gancho, para ler sobre qualquer cenário.
const Veu: React.FC<{ altura: number }> = ({ altura }) => (
  <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(15,17,21,.92) 0px, rgba(15,17,21,.78) ${altura * 0.7}px, rgba(15,17,21,0) ${altura}px)` }} />
);

// ---------- Fichas de personagem ----------
export const FichaPersonagem: React.FC<{ quem: "ronaldo" | "wan" }> = ({ quem }) => {
  const ron = quem === "ronaldo";
  return (
    <AbsoluteFill style={{ backgroundColor: cor.fundo, fontFamily: fonte }}>
      <div style={{ position: "absolute", left: area.lateral, top: 120 }}>
        <Rotulo>Ficha de personagem · série "E se você acordasse em…"</Rotulo>
        <div style={{ ...tipo.titulo, color: cor.texto, marginTop: 14 }}>{ron ? "Ronaldo" : "Wan"}</div>
        <div style={{ ...tipo.apoio, color: cor.textoSuave, marginTop: 8, maxWidth: 900 }}>
          {ron ? "Ronaldo do Reteté. Nunca jogou nada. Faz besteira com fé." : "Advogado. Fodão. Mafioso. Lê o manual inteiro e farma aura."}
        </div>
      </div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <rect x={60} y={430} width={960} height={880} rx={36} fill="#171a21" />
      </svg>
      {ron ? null : <Aura x={540} y={850} raio={330} seed={11} />}
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {ron ? <Ronaldo x={540} y={1270} escala={0.95} expr="confuso" pose="cartas" /> : <Wan x={540} y={1270} escala={0.95} expr="calmo" pose="bracos" />}
      </svg>
      {/* expressões */}
      <div style={{ position: "absolute", left: area.lateral, top: 1350 }}><Rotulo cor={cor.textoSuave}>Expressões</Rotulo></div>
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        {(ron ? (["confuso", "apavorado", "orgulhoso"] as const) : (["calmo", "sorriso", "serio"] as const)).map((e, i) => (
          <g key={e}>
            <rect x={80 + i * 316} y={1400} width={290} height={300} rx={24} fill="#171a21" />
            <clipPath id={`cl${quem}${i}`}><rect x={80 + i * 316} y={1400} width={290} height={300} rx={24} /></clipPath>
            <g clipPath={`url(#cl${quem}${i})`}>
              {ron ? <Ronaldo x={225 + i * 316} y={2060} escala={0.78} expr={e as "confuso"} pose="cartas" /> : <Wan x={225 + i * 316} y={2075} escala={0.76} expr={e as "calmo"} pose="bracos" />}
            </g>
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", left: 80, right: 80, top: 1712, display: "flex", justifyContent: "space-between" }}>
        {(ron ? ["confuso", "apavorado", "orgulhoso (errado)"] : ["calmo", "sorriso de lado", "sério"]).map((t) => (
          <div key={t} style={{ width: 290, textAlign: "center", ...tipo.rotulo, fontSize: 26, color: cor.texto }}>{t}</div>
        ))}
      </div>
      {/* paleta */}
      <div style={{ position: "absolute", left: 80, top: 1800, display: "flex", gap: 16, alignItems: "center" }}>
        {(ron ? ["#34548a", "#d9a62e", "#1c1c22", "#f1c7a3", "#3a2b22"] : ["#30333b", "#6a1f26", "#b3262f", "#f3cdae", "#3a3b42", "#e3b23c"]).map((c) => (
          <div key={c} style={{ width: 64, height: 64, borderRadius: 14, background: c, border: "3px solid #2a2e37" }} />
        ))}
      </div>
      <Granulado forca={0.08} />
    </AbsoluteFill>
  );
};

// ---------- Quadro 1: gancho ----------
export const Quadro1: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: fonte }}>
    <Clareira />
    <Img src={staticFile("img/root-gatos-recorte.png")} style={{ position: "absolute", left: 360, top: 900, width: 820, transform: "rotate(-3deg)" }} />
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <Ronaldo x={300} y={1560} escala={1.05} expr="apavorado" pose="biblia" />
    </svg>
    <Veu altura={760} />
    <div style={{ position: "absolute", right: 80, top: 1290, ...tipo.rotulo, fontSize: 24, color: "#f4f1ea", textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>Peças: foto MeepleBR</div>
    <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 210 }}>
      <Rotulo>Ep. 1 · Root</Rotulo>
      <div style={{ ...tipo.titulo, fontSize: 104, color: cor.texto, marginTop: 18 }}>
        E se você acordasse <span style={{ color: cor.marca }}>dentro de Root</span>…
      </div>
      <div style={{ ...tipo.apoio, color: cor.texto, marginTop: 22 }}>sem nunca ter jogado?</div>
    </div>
    <Granulado />
  </AbsoluteFill>
);

// ---------- Quadro 2: o resgate (épico) ----------
export const Quadro2: React.FC = () => {
  const raios = Array.from({ length: 22 }, (_, i) => i);
  return (
    <AbsoluteFill style={{ fontFamily: fonte }}>
      <Clareira escurecer={0.55} />
      {/* explosão de raios dourados atrás do Wan (vista de baixo) */}
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <defs>
          <radialGradient id="vinheta" cx="50%" cy="58%" r="70%">
            <stop offset="0.45" stopColor="#000" stopOpacity={0} />
            <stop offset="1" stopColor="#000" stopOpacity={0.75} />
          </radialGradient>
          <linearGradient id="raio" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffe9a6" stopOpacity={0.9} />
            <stop offset="1" stopColor="#e3b23c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <g transform="translate(540,1020)">
          {raios.map((i) => (
            <path key={i} d={`M0,-14 L${i % 2 ? 1300 : 1050},-${i % 2 ? 46 : 26} L${i % 2 ? 1300 : 1050},${i % 2 ? 46 : 26} L0,14 Z`} fill="url(#raio)" opacity={i % 3 ? 0.55 : 0.85} transform={`rotate(${(360 / raios.length) * i + 4})`} />
          ))}
        </g>
        {/* onda de choque no chão */}
        <ellipse cx={540} cy={1600} rx={520} ry={70} fill="none" stroke="#ffd977" strokeWidth={10} opacity={0.7} />
        <ellipse cx={540} cy={1600} rx={380} ry={48} fill="none" stroke="#fff4cf" strokeWidth={6} opacity={0.8} />
      </svg>
      {/* gatos empurrados para trás pela aura */}
      <Img src={staticFile("img/root-gatos-recorte.png")} style={{ position: "absolute", left: 640, top: 1180, width: 460, transform: "rotate(14deg)", opacity: 0.9 }} />
      <Aura x={540} y={1060} raio={430} seed={5} />
      <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
        <Ronaldo x={150} y={1690} escala={0.62} expr="apavorado" pose="encolhido" />
        <Wan x={560} y={1660} escala={1.32} expr="sorriso" pose="livro" />
        <rect width={1080} height={1920} fill="url(#vinheta)" />
      </svg>
      <Veu altura={620} />
      <div style={{ position: "absolute", right: 80, top: 1290, ...tipo.rotulo, fontSize: 24, color: "#f4f1ea", textShadow: "0 2px 10px rgba(0,0,0,.6)" }}>Peças: foto MeepleBR</div>
      <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 210 }}>
        <div style={{ ...tipo.apoio, color: cor.texto, fontSize: 56 }}>Qualquer um correria.</div>
        <div style={{ ...tipo.titulo, fontSize: 112, color: cor.ouro, marginTop: 10 }}>O Wan abriu o manual.</div>
      </div>
      <Granulado forca={0.15} />
    </AbsoluteFill>
  );
};

// ---------- Quadro 3: dica real + gancho para a parte 2 ----------
export const Quadro3: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: fonte }}>
    <Clareira escurecer={0.72} />
    <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
      <Wan x={820} y={1880} escala={0.62} expr="calmo" pose="bracos" />
      <Ronaldo x={270} y={1880} escala={0.58} expr="orgulhoso" pose="cartas" />
    </svg>
    <div style={{ position: "absolute", left: 70, right: 70, top: 230, background: "rgba(15,17,21,.92)", border: `4px solid ${cor.ouro}`, borderRadius: 32, padding: "44px 48px" }}>
      <Rotulo>Dica real</Rotulo>
      <div style={{ ...tipo.apoio, fontSize: 54, fontWeight: 800, color: cor.texto, marginTop: 16 }}>
        Para mover, você precisa governar a clareira de saída ou a de chegada.
      </div>
      <div style={{ ...tipo.rotulo, fontSize: 24, color: cor.textoSuave, marginTop: 20 }}>Regra do manual · tutorial no site</div>
    </div>
    <div style={{ position: "absolute", left: area.lateral, right: area.lateral, top: 820 }}>
      <div style={{ ...tipo.titulo, fontSize: 84, color: cor.texto }}>…e as Rapinas <span style={{ color: "#6ea8ff" }}>acabaram de pousar.</span></div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1090, display: "flex", justifyContent: "center" }}>
      <div style={{ fontFamily: fonte, fontWeight: 900, fontSize: 46, color: cor.fundo, background: cor.marca, padding: "28px 60px", borderRadius: 999 }}>Segue pra ver a Parte 2</div>
    </div>
    <Img src={staticFile("img/logo.webp")} style={{ position: "absolute", left: 384, top: 1220, width: 312 }} />
    <Granulado />
  </AbsoluteFill>
);
