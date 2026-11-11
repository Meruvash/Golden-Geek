import React from "react";

// Wan redesenhado no estilo 35_shinkai da skill Huashu Art Motion (references/风格配方/35_shinkai.md):
// célula em duas camadas por peça — base → sombra dura no lado oposto à luz (a peça menos ela mesma deslocada
// para a luz) → borda de luz no lado iluminado (a peça menos ela mesma deslocada para o outro lado) → contorno
// marrom quente. Olhos de anime com íris em degradê e dois brilhos. Anatomia adulta para passar a "linha de
// entrega" de references/角色精细度.md: pescoço, ombros, cotovelos, punhos, mãos com dedos, 2 camadas de luz,
// detalhes de material (risca de giz, costuras, cabelo penteado em mechas).
// Caixa local 400 × 900, pés em y = 880 (igual aos outros personagens).

export type Luz = { lx: number; ly: number; borda: string };
export const LUZ_POENTE: Luz = { lx: 0.9, ly: -0.45, borda: "#ffcf8a" }; // sol baixo à direita
export const LUZ_LAMPIAO: Luz = { lx: -0.6, ly: -0.8, borda: "#ffd99a" };
export const LUZ_LUA: Luz = { lx: -0.8, ly: -0.6, borda: "#b9cbff" };

const LINHA = "#5a3a2a";

// Uma peça em célula. d: caminho da peça; sd: tamanho da sombra; rw: largura da borda de luz.
const Cel: React.FC<{ id: string; d: string; base: string; sombra: string; luz: Luz; borda?: boolean; sd?: number; rw?: number; lw?: number; linha?: string; children?: React.ReactNode }> = ({
  id, d, base, sombra, luz, borda = true, sd = 16, rw = 5, lw = 3, linha = LINHA, children,
}) => (
  <g>
    <defs>
      <clipPath id={`c-${id}`}><path d={d} /></clipPath>
      <mask id={`s-${id}`} maskUnits="userSpaceOnUse" x={-400} y={-400} width={1200} height={1700}>
        <rect x={-400} y={-400} width={1200} height={1700} fill="#fff" />
        <path d={d} transform={`translate(${luz.lx * sd},${luz.ly * sd})`} fill="#000" />
      </mask>
      <mask id={`r-${id}`} maskUnits="userSpaceOnUse" x={-400} y={-400} width={1200} height={1700}>
        <rect x={-400} y={-400} width={1200} height={1700} fill="#fff" />
        <path d={d} transform={`translate(${-luz.lx * rw},${-luz.ly * rw})`} fill="#000" />
      </mask>
    </defs>
    <path d={d} fill={base} />
    <g clipPath={`url(#c-${id})`}>
      {children}
      <path d={d} fill={sombra} mask={`url(#s-${id})`} />
      {borda ? <path d={d} fill={luz.borda} opacity={0.85} mask={`url(#r-${id})`} /> : null}
    </g>
    {lw > 0 ? <path d={d} fill="none" stroke={linha} strokeWidth={lw} strokeLinejoin="round" /> : null}
  </g>
);

type ExprHD = "calmo" | "sorriso" | "serio";

export const WanHD: React.FC<{ x: number; y: number; escala?: number; expr?: ExprHD; pose?: "bracos" | "carta"; faroeste?: boolean; luz?: Luz; id?: string; piscar?: boolean; respira?: number }> = ({
  x, y, escala = 1, expr = "calmo", pose = "bracos", faroeste = true, luz = LUZ_POENTE, id = "wan", piscar = false, respira = 0,
}) => {
  const k = (s: string) => `${id}-${s}`;
  const PELE = "#f6d2b8", PELE_S = "#d9a487";
  const TERNO = "#34363f", TERNO_S = "#22232a";
  const CABELO = "#4a3428", CABELO_S = "#2e1f17"; // marrom escuro em cima; grisalho só nas laterais
  const GRIS = "#a9a9b2", GRIS_S = "#7a7a84";
  return (
    <g transform={`translate(${x - 200 * escala},${y - 880 * escala * (1 + respira)}) scale(${escala},${escala * (1 + respira)})`}>
      <ellipse cx={200} cy={884} rx={150} ry={18} fill="#000" opacity={0.28} />
      {/* pernas e sapatos */}
      <Cel id={k("perna1")} d="M124,600 L198,600 L192,856 L134,856 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={18} />
      <Cel id={k("perna2")} d="M202,600 L276,600 L266,856 L208,856 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={18} />
      <path d="M160,610 L162,850 M240,610 L238,850" stroke="#4a4c57" strokeWidth={2} opacity={0.7} />
      <Cel id={k("sap1")} d="M118,850 C118,838 196,836 196,850 L196,876 L112,876 C108,866 110,856 118,850 Z" base="#1c1714" sombra="#0e0b09" luz={luz} sd={8} rw={3} />
      <Cel id={k("sap2")} d="M204,850 C204,836 282,838 284,850 C292,856 292,866 288,876 L204,876 Z" base="#1c1714" sombra="#0e0b09" luz={luz} sd={8} rw={3} />
      {/* paletó: ombros largos, cintura marcada, risca de giz */}
      <Cel id={k("paleto")} d="M92,292 C112,266 156,256 200,256 C244,256 288,266 308,292 L318,470 C320,530 314,580 306,614 L94,614 C86,580 80,530 82,470 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={26} rw={7}>
        {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${104 + i * 20},260 L${100 + i * 20},616`} stroke="#5b5e6a" strokeWidth={2.2} opacity={0.75} />)}
      </Cel>
      {/* camisa, gravata vinho, lapelas */}
      <Cel id={k("camisa")} d="M174,262 L200,346 L226,262 Z" base="#f3f1ea" sombra="#c9c3b8" luz={luz} sd={8} rw={2} lw={2} />
      <Cel id={k("grav")} d="M193,276 L207,276 L214,392 L200,412 L186,392 Z" base="#7a2430" sombra="#551820" luz={luz} sd={8} rw={3} lw={2}>
        {[300, 330, 360].map((yy) => <path key={yy} d={`M186,${yy} l28,-10`} stroke="#9a3a46" strokeWidth={3} />)}
      </Cel>
      <Cel id={k("lap1")} d="M166,258 L200,362 L182,388 L136,300 C142,276 152,264 166,258 Z" base="#2a2c33" sombra="#1a1b20" luz={luz} sd={10} rw={4} lw={2.5} />
      <Cel id={k("lap2")} d="M234,258 L200,362 L218,388 L264,300 C258,276 248,264 234,258 Z" base="#2a2c33" sombra="#1a1b20" luz={luz} sd={10} rw={4} lw={2.5} />
      {/* rosa vermelha na lapela e lenço no bolso */}
      <g transform="translate(248,316)">
        <circle r={15} fill="#b3262f" stroke={LINHA} strokeWidth={2} /><path d="M-7,-2 q7,-10 14,0 q-7,8 -14,0" fill="#d8434c" /><path d="M-6,14 l-12,14" stroke="#3d6b3a" strokeWidth={4} strokeLinecap="round" />
      </g>
      <path d="M128,436 l34,-6 l-4,14 Z" fill="#e3b23c" stroke={LINHA} strokeWidth={2} />
      <circle cx={200} cy={470} r={5} fill="#15161a" /><circle cx={200} cy={530} r={5} fill="#15161a" />
      {/* braços por pose */}
      {pose === "bracos" ? (
        <g>
          <Cel id={k("ombro1")} d="M96,296 C76,330 72,390 84,440 L124,446 C118,400 120,348 132,312 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={14} />
          <Cel id={k("ombro2")} d="M304,296 C324,330 328,390 316,440 L276,446 C282,400 280,348 268,312 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={14} />
          {/* antebraços cruzados: o esquerdo por baixo */}
          <Cel id={k("ante1")} d="M84,430 C120,452 200,462 268,446 L274,480 C200,500 118,488 82,468 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={12} />
          <Cel id={k("mao1")} d="M262,444 C278,436 300,440 304,456 C306,470 294,482 276,480 C268,478 262,470 262,460 Z" base={PELE} sombra={PELE_S} luz={luz} sd={7} rw={3} lw={2.4} />
          <path d="M284,446 v12 M292,448 v12" stroke={LINHA} strokeWidth={2} />
          <Cel id={k("ante2")} d="M316,430 C280,456 200,466 132,450 L126,484 C200,504 282,492 318,470 Z" base="#3c3e48" sombra={TERNO_S} luz={luz} sd={12} />
          <Cel id={k("mao2")} d="M138,448 C122,440 100,444 96,460 C94,474 106,486 124,484 C132,482 138,474 138,464 Z" base={PELE} sombra={PELE_S} luz={luz} sd={7} rw={3} lw={2.4} />
          <path d="M116,450 v12 M108,452 v12" stroke={LINHA} strokeWidth={2} />
          <path d="M126,474 h150" stroke="#f3f1ea" strokeWidth={5} opacity={0.0} />
        </g>
      ) : (
        <g>
          <Cel id={k("ombro1")} d="M96,296 C76,340 74,410 86,470 L126,472 C120,420 120,350 132,312 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={14} />
          <Cel id={k("mao1")} d="M88,466 C80,486 88,506 106,508 C124,508 132,494 128,476 Z" base={PELE} sombra={PELE_S} luz={luz} sd={7} rw={3} lw={2.4} />
          {/* braço erguido com a carta */}
          <Cel id={k("ombro2")} d="M300,292 C328,262 346,226 350,190 L314,184 C310,216 296,246 272,270 Z" base={TERNO} sombra={TERNO_S} luz={luz} sd={14} />
          <Cel id={k("ante2")} d="M350,196 C356,160 352,120 340,92 L308,100 C318,126 320,160 314,190 Z" base="#3c3e48" sombra={TERNO_S} luz={luz} sd={12} />
          <g transform="translate(330,40) rotate(10)">
            <rect x={-46} y={-66} width={92} height={132} rx={10} fill="#f3e6c8" stroke={LINHA} strokeWidth={4} />
            <rect x={-36} y={-56} width={72} height={112} rx={6} fill="none" stroke="#b3262f" strokeWidth={3} strokeDasharray="7 5" />
            <text x={0} y={16} textAnchor="middle" fontFamily="Rye" fontSize={40} fill="#b3262f">?</text>
          </g>
          <Cel id={k("mao2")} d="M310,104 C306,84 318,70 334,72 C350,74 356,90 350,106 C344,118 322,120 310,104 Z" base={PELE} sombra={PELE_S} luz={luz} sd={7} rw={3} lw={2.4} />
          <path d="M318,80 h-10 M318,90 h-12" stroke={LINHA} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      )}
      {/* pescoço e lenço de bandido */}
      <Cel id={k("pesc")} d="M174,214 L226,214 L230,270 L170,270 Z" base={PELE} sombra={PELE_S} luz={luz} sd={14} rw={3} />
      {faroeste ? (
        <Cel id={k("lenco")} d="M156,254 C176,272 224,272 244,254 L234,296 L200,330 L166,296 Z" base="#b3262f" sombra="#7f1820" luz={luz} sd={12} rw={4} lw={2.5}>
          {[[178, 278], [214, 290], [196, 262], [226, 270], [190, 306]].map(([cx, cy]) => <circle key={`${cx}`} cx={cx} cy={cy} r={3.2} fill="#f3e6c8" opacity={0.85} />)}
        </Cel>
      ) : null}
      {/* orelhas e rosto adulto: mandíbula marcada, queixo firme */}
      <Cel id={k("orelha1")} d="M140,150 C126,142 122,170 134,184 L144,182 Z" base={PELE} sombra={PELE_S} luz={luz} sd={6} rw={2} lw={2.2} />
      <Cel id={k("orelha2")} d="M260,150 C274,142 278,170 266,184 L256,182 Z" base={PELE} sombra={PELE_S} luz={luz} sd={6} rw={2} lw={2.2} />
      <Cel id={k("rosto")} d="M142,112 C142,70 170,50 200,50 C230,50 258,70 258,112 L260,160 C260,192 244,216 216,228 L200,232 L184,228 C156,216 140,192 140,160 Z" base={PELE} sombra={PELE_S} luz={luz} sd={11} rw={4}>
        {/* sombra do nariz e das maçãs, rugas de expressão de quem já viu tudo */}
        <path d="M200,150 L194,182 L206,184" stroke="#c48a6c" strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M168,196 q-6,8 -2,16 M232,196 q6,8 2,16" stroke="#c48a6c" strokeWidth={2.4} fill="none" opacity={0.8} />
      </Cel>
      {/* cabelo penteado para trás: marrom escuro em cima, grisalho nas laterais */}
      <Cel id={k("cabelo")} d="M138,126 C132,68 162,36 200,36 C240,36 270,68 262,126 C254,98 234,80 200,78 C168,80 146,98 138,126 Z" base={CABELO} sombra={CABELO_S} luz={luz} sd={10} rw={4} linha="#2a1a12">
        {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${152 + i * 22},${88 - (i === 2 ? 6 : 0)} q${10},-26 ${30},-40`} stroke="#6e4e3a" strokeWidth={2.4} fill="none" />)}
      </Cel>
      <Cel id={k("gris1")} d="M138,104 C132,124 136,148 146,164 L156,158 C150,142 148,124 152,100 Z" base={GRIS} sombra={GRIS_S} luz={luz} sd={4} rw={2} lw={2.2} linha="#4a4a52" />
      <Cel id={k("gris2")} d="M262,104 C268,124 264,148 254,164 L244,158 C250,142 252,124 248,100 Z" base={GRIS} sombra={GRIS_S} luz={luz} sd={4} rw={2} lw={2.2} linha="#4a4a52" />
      <path d="M142,124 C142,138 144,150 148,158 M258,124 C258,138 256,150 252,158" stroke="#e1e1e8" strokeWidth={2.4} strokeLinecap="round" opacity={0.8} />
      {/* sobrancelhas grossas */}
      {expr === "serio" ? (
        <g fill="#3a3a42"><path d="M156,136 L192,146 L190,154 L154,144 Z" /><path d="M244,136 L208,146 L210,154 L246,144 Z" /></g>
      ) : (
        <g fill="#3a3a42"><path d="M154,138 C166,130 182,132 192,140 L190,148 C180,142 168,140 156,146 Z" /><path d="M246,138 C234,130 218,132 208,140 L210,148 C220,142 232,140 244,146 Z" /></g>
      )}
      {/* olhos de anime: íris em degradê, dois brilhos, pálpebra pesada */}
      <defs>
        <linearGradient id={k("iris")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1810" /><stop offset="0.6" stopColor="#6b3e22" /><stop offset="1" stopColor="#c58a4a" />
        </linearGradient>
      </defs>
      {piscar ? [174, 226].map((ex) => <path key={ex} d={`M${ex - 15},164 Q${ex},170 ${ex + 15},164`} stroke="#2a1b14" strokeWidth={4.4} fill="none" strokeLinecap="round" />) : [174, 226].map((ex, i) => (
        <g key={ex}>
          <ellipse cx={ex} cy={164} rx={14} ry={expr === "serio" ? 6 : 8} fill="#fdfaf4" />
          <ellipse cx={ex + (i ? -2 : 2)} cy={165} rx={7} ry={expr === "serio" ? 6 : 8} fill={`url(#${k("iris")})`} />
          <circle cx={ex + (i ? -4 : 0)} cy={161} r={2.4} fill="#fff" />
          <circle cx={ex + (i ? 1 : 5)} cy={168} r={1.2} fill="#fff" />
          <path d={`M${ex - 16},${expr === "serio" ? 161 : 159} Q${ex},${expr === "serio" ? 154 : 152} ${ex + 16},${expr === "serio" ? 160 : 158}`} stroke="#2a1b14" strokeWidth={4.4} fill="none" strokeLinecap="round" />
          <path d={`M${ex - 12},171 q${12},4 24,0`} stroke="#b07a5c" strokeWidth={1.8} fill="none" />
        </g>
      ))}
      {/* bigode fino e boca */}
      <path d="M180,198 C190,192 196,194 200,197 C204,194 210,192 220,198" stroke="#4a4a52" strokeWidth={5} fill="none" strokeLinecap="round" />
      {expr === "sorriso" ? (
        <path d="M184,210 C196,214 210,214 220,206" stroke="#7a3a2e" strokeWidth={4} fill="none" strokeLinecap="round" />
      ) : expr === "serio" ? (
        <path d="M186,212 h28" stroke="#7a3a2e" strokeWidth={4} strokeLinecap="round" />
      ) : (
        <path d="M186,211 C196,214 206,214 214,210" stroke="#7a3a2e" strokeWidth={4} fill="none" strokeLinecap="round" />
      )}
      {/* chapéu de abas largas, com sombra projetada na testa */}
      {faroeste ? (
        <g>
          <path d="M140,118 C170,132 230,132 260,118 L262,138 C230,150 170,150 138,138 Z" fill="#2a1b14" opacity={0.28} />
          <Cel id={k("aba")} d="M50,104 C80,86 140,80 200,80 C260,80 320,86 350,104 C356,116 330,124 300,120 C260,114 140,114 100,120 C70,124 44,116 50,104 Z" base="#4a3627" sombra="#2e2118" luz={luz} sd={10} rw={4} />
          <Cel id={k("copa")} d="M126,104 C124,60 150,22 200,22 C250,22 276,60 274,104 C250,96 150,96 126,104 Z" base="#5a4230" sombra="#3a2a1f" luz={luz} sd={16} rw={5}>
            <path d="M176,28 C190,46 210,46 224,28" stroke="#3a2a1f" strokeWidth={5} fill="none" />
          </Cel>
          <Cel id={k("fita")} d="M128,86 C160,80 240,80 272,86 L274,102 C240,96 160,96 126,102 Z" base="#8f1d25" sombra="#5e1218" luz={luz} sd={4} rw={2} lw={2} />
        </g>
      ) : null}
    </g>
  );
};
