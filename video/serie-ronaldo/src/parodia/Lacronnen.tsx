import React from "react";

// Casa Lacrônnen: os rivais do clipe "Um a zero pro time".
// Mesma convenção dos personagens fixos (src/personagens/Personagens.tsx): vetor chapado, cabeça redonda,
// sombreamento facetado em 2 tons, caixa local 400 x 900 com os pés em y = 880. O contorno vem do FiltroCel.
// A piada é a ATITUDE lacradora (cancelar, textão, "regra é construção social") e o visual exagerado (cabelo neon).
// Identidade (gênero, orientação, raça) não é alvo de piada.

export type ExprL = "grita" | "serio" | "convencido";

const Cabeca: React.FC<{ pele: string; sombra: string; cx?: number; cy?: number; r?: number }> = ({ pele, sombra, cx = 200, cy = 222, r = 104 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={pele} />
    <path d={`M${cx + 6},${cy - r} A${r},${r} 0 0 1 ${cx + 2},${cy + r} L${cx - 10},${cy + r * 0.2} Z`} fill={sombra} opacity={0.75} />
  </g>
);

const Rosto: React.FC<{ expr: ExprL; oculos?: "gatinho" | "redondo" }> = ({ expr, oculos }) => (
  <g>
    {expr === "grita" ? (
      <g>
        <path d="M146,184 l38,14" stroke="#2a1d16" strokeWidth={8} strokeLinecap="round" />
        <path d="M258,184 l-38,14" stroke="#2a1d16" strokeWidth={8} strokeLinecap="round" />
        <circle cx={168} cy={224} r={14} fill="#fff" /><circle cx={168} cy={226} r={6} fill="#1b1d24" />
        <circle cx={236} cy={224} r={14} fill="#fff" /><circle cx={236} cy={226} r={6} fill="#1b1d24" />
        <path d="M168,262 q36,-10 68,0 q-4,52 -34,52 q-30,0 -34,-52 Z" fill="#5a2e24" />
        <path d="M178,268 q24,-6 48,0 l-2,8 q-22,-4 -44,0 Z" fill="#fff" />
        <path d="M186,300 q16,-10 32,0 q-16,10 -32,0 Z" fill="#c4544a" />
      </g>
    ) : expr === "serio" ? (
      <g>
        <path d="M148,196 l36,6" stroke="#2a1d16" strokeWidth={7} strokeLinecap="round" />
        <path d="M256,196 l-36,6" stroke="#2a1d16" strokeWidth={7} strokeLinecap="round" />
        <circle cx={168} cy={228} r={8} fill="#1b1d24" /><circle cx={236} cy={228} r={8} fill="#1b1d24" />
        <path d="M178,282 q26,-10 50,0" stroke="#5a2e24" strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    ) : (
      <g>
        <path d="M148,194 q18,-10 36,0" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M220,188 q18,-14 36,-2" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
        <path d="M152,228 h32" stroke="#1b1d24" strokeWidth={7} strokeLinecap="round" />
        <path d="M220,228 h32" stroke="#1b1d24" strokeWidth={7} strokeLinecap="round" />
        <path d="M176,276 q30,14 58,-8" stroke="#5a2e24" strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    )}
    {oculos === "gatinho" ? (
      <g fill="none" stroke="#7a1d6a" strokeWidth={7}>
        <path d="M134,214 q2,-18 36,-14 q22,4 20,24 q-4,22 -30,20 q-26,-2 -26,-30 l-8,-12 Z" />
        <path d="M270,214 q-2,-18 -36,-14 q-22,4 -20,24 q4,22 30,20 q26,-2 26,-30 l8,-12 Z" />
        <path d="M190,222 h24" />
      </g>
    ) : oculos === "redondo" ? (
      <g fill="none" stroke="#3a2a1c" strokeWidth={5}>
        <circle cx={168} cy={228} r={24} /><circle cx={236} cy={228} r={24} /><path d="M192,226 h20" />
      </g>
    ) : null}
  </g>
);

const tx = (x: number, y: number, escala: number, virar: boolean) =>
  `translate(${x - 200 * escala * (virar ? -1 : 1)},${y - 880 * escala}) scale(${escala * (virar ? -1 : 1)},${escala})`;

// Celular com a tela acesa (e o REC vermelho quando grava)
const Celular: React.FC<{ x: number; y: number; giro?: number; rec?: boolean }> = ({ x, y, giro = 0, rec }) => (
  <g transform={`translate(${x},${y}) rotate(${giro})`}>
    <rect x={-34} y={-62} width={68} height={124} rx={12} fill="#16161c" />
    <rect x={-28} y={-54} width={56} height={104} rx={6} fill="#7fe8ff" />
    {rec ? <><circle cx={-14} cy={-40} r={7} fill="#ff2d4a" /><rect x={-4} y={-45} width={26} height={10} rx={3} fill="#ff2d4a" /></> : (
      <g fill="#1b4a5a"><rect x={-20} y={-40} width={40} height={6} /><rect x={-20} y={-28} width={32} height={6} /><rect x={-20} y={-16} width={38} height={6} /><rect x={-20} y={-4} width={26} height={6} /></g>
    )}
  </g>
);

// ---------------- Cancelina: cabelo azul-piscina em chanel com franja, celular gravando tudo ----------------
export const Cancelina: React.FC<{ x: number; y: number; escala?: number; expr?: ExprL; virar?: boolean }> = ({ x, y, escala = 1, expr = "grita", virar = false }) => {
  const pele = "#f3cfae", sombra = "#e0b08c";
  const top = "#1d1d26", topS = "#14141b", calca = "#e9e1ff", calcaS = "#cfc4f2";
  return (
    <g transform={tx(x, y, escala, virar)}>
      <ellipse cx={200} cy={882} rx={140} ry={18} fill="#000" opacity={0.18} />
      {/* calça pantalona lilás e tênis plataforma */}
      <path d="M120,600 L196,600 L190,868 L96,868 Z" fill={calca} />
      <path d="M204,600 L280,600 L304,868 L210,868 Z" fill={calcaS} />
      <path d="M88,856 h106 v22 h-112 Z M206,856 h106 l6,22 h-112 Z" fill="#fff" />
      <path d="M88,872 h106 v8 h-112 Z M206,872 h106 l6,8 h-112 Z" fill="#ff3fb4" />
      {/* moletom preto com estampa de raio */}
      <path d="M104,352 C120,330 156,322 200,322 C244,322 280,330 296,352 L292,612 L108,612 Z" fill={top} />
      <path d="M200,322 C244,322 280,330 296,352 L292,612 L200,612 Z" fill={topS} />
      <path d="M190,420 l40,0 l-26,46 l34,0 l-60,80 l16,-56 l-30,0 Z" fill="#22e3ff" />
      {/* braço esquerdo apontando, braço direito erguido com o celular */}
      <path d="M106,362 C70,420 64,470 40,520 L64,536 C96,486 118,438 136,392 Z" fill={top} />
      <circle cx={50} cy={530} r={20} fill={pele} />
      <path d="M294,360 C330,330 350,280 352,226 L324,222 C320,272 300,306 266,330 Z" fill={topS} />
      <Celular x={342} y={168} giro={10} rec />
      <circle cx={338} cy={226} r={20} fill={sombra} />
      {/* cabeça e cabelo chanel azul-piscina com franja reta */}
      <path d="M86,214 C80,130 134,96 200,96 C266,96 320,130 314,214 L318,316 L270,316 L272,236 L128,236 L130,316 L82,316 Z" fill="#12b8d8" />
      <Cabeca pele={pele} sombra={sombra} />
      <path d="M98,200 C96,130 140,108 200,108 C260,108 304,130 302,200 C290,186 276,180 258,178 L142,178 C124,180 110,186 98,200 Z" fill="#22e3ff" />
      <path d="M118,160 C150,128 250,128 282,160 L282,184 L118,184 Z" fill="#22e3ff" />
      <circle cx={92} cy={262} r={14} fill="none" stroke="#ffd23f" strokeWidth={6} />
      <circle cx={308} cy={262} r={14} fill="none" stroke="#ffd23f" strokeWidth={6} />
      <Rosto expr={expr} />
    </g>
  );
};

// ---------------- Problematrícia: cabelo rosa-chiclete com um lado raspado, óculos gatinho, textão no celular ----------------
export const Problematricia: React.FC<{ x: number; y: number; escala?: number; expr?: ExprL; virar?: boolean }> = ({ x, y, escala = 1, expr = "serio", virar = false }) => {
  const pele = "#e9b98f", sombra = "#d39f75";
  const casaco = "#7b3fd1", casacoS = "#6431b0";
  return (
    <g transform={tx(x, y, escala, virar)}>
      <ellipse cx={200} cy={882} rx={140} ry={18} fill="#000" opacity={0.18} />
      {/* saia longa xadrez e coturno */}
      <path d="M118,600 L282,600 L304,830 L96,830 Z" fill="#2f6b4f" />
      <path d="M200,600 L282,600 L304,830 L200,830 Z" fill="#285c44" />
      <path d="M118,660 h176 M110,720 h188 M104,780 h200 M150,600 v230 M200,600 v230 M250,600 v230" stroke="#ffd23f" strokeWidth={4} opacity={0.6} />
      <path d="M130,828 h54 v48 h-62 Z M216,828 h54 l8,48 h-62 Z" fill="#1b1b20" />
      {/* cardigã roxo largo sobre camiseta com "?!" */}
      <path d="M100,352 C118,330 156,322 200,322 C244,322 282,330 300,352 L298,616 L102,616 Z" fill={casaco} />
      <path d="M200,322 C244,322 282,330 300,352 L298,616 L200,616 Z" fill={casacoS} />
      <path d="M160,330 L240,330 L236,612 L164,612 Z" fill="#f4f0e6" />
      <text x={200} y={470} textAnchor="middle" fontFamily="Inter, 'Public Sans', sans-serif" fontWeight={900} fontSize={70} fill="#ff3fb4">?!</text>
      {/* os dois braços para a frente, digitando com os polegares */}
      <path d="M104,362 C80,430 96,486 168,500 L180,476 C136,462 124,424 134,388 Z" fill={casaco} />
      <path d="M296,362 C320,430 304,486 232,500 L220,476 C264,462 276,424 266,388 Z" fill={casacoS} />
      <Celular x={200} y={470} giro={-8} />
      <circle cx={168} cy={496} r={18} fill={pele} /><circle cx={232} cy={496} r={18} fill={sombra} />
      {/* cabeça: lado esquerdo raspado (sombra escura), lado direito rosa longo */}
      <Cabeca pele={pele} sombra={sombra} />
      <path d="M98,206 C94,150 128,118 170,110 L170,170 C140,174 116,188 98,206 Z" fill="#5a3a3a" opacity={0.55} />
      <path d="M160,104 C230,90 312,120 312,206 L320,360 C300,370 280,368 268,354 L276,230 C262,186 220,168 168,170 Z" fill="#ff5fc4" />
      <path d="M190,104 C250,96 300,126 306,190 C286,160 252,144 206,140 Z" fill="#ff8fd8" />
      <Rosto expr={expr} oculos="gatinho" />
    </g>
  );
};

// ---------------- Desconstrúcio: coque verde-neon, barba rala, óculos redondos, ecobag, carta de ponta-cabeça ----------------
export const Desconstrucio: React.FC<{ x: number; y: number; escala?: number; expr?: ExprL; virar?: boolean; carta?: boolean }> = ({ x, y, escala = 1, expr = "convencido", virar = false, carta = true }) => {
  const pele = "#f0c6a0", sombra = "#dcae86";
  const linho = "#e8dcc2", linhoS = "#d4c5a6";
  return (
    <g transform={tx(x, y, escala, virar)}>
      <ellipse cx={200} cy={882} rx={140} ry={18} fill="#000" opacity={0.18} />
      {/* calça de linho dobrada e chinelo com meia */}
      <path d="M128,610 L196,610 L190,842 L124,842 Z" fill="#8a7a5c" />
      <path d="M204,610 L272,610 L276,842 L210,842 Z" fill="#7a6b50" />
      <path d="M120,836 h76 v22 h-80 Z M206,836 h76 l4,22 h-80 Z" fill="#f2f2f2" />
      <path d="M112,856 h88 v20 h-92 Z M204,856 h88 l6,20 h-92 Z" fill="#3a3a3a" />
      {/* bata de linho larga */}
      <path d="M96,352 C116,330 156,322 200,322 C244,322 284,330 304,352 L310,628 L90,628 Z" fill={linho} />
      <path d="M200,322 C244,322 284,330 304,352 L310,628 L200,628 Z" fill={linhoS} />
      <path d="M186,326 L200,380 L214,326" stroke="#b8a888" strokeWidth={5} fill="none" />
      {/* ecobag no ombro: alça cruzando o peito e a bolsa do lado */}
      <path d="M120,340 L300,600" stroke="#6b8a3a" strokeWidth={14} strokeLinecap="round" />
      <path d="M262,560 L356,560 L364,690 L254,690 Z" fill="#9bc45a" />
      <text x={309} y={636} textAnchor="middle" fontFamily="Inter, 'Public Sans', sans-serif" fontWeight={900} fontSize={22} fill="#2f4a12">ECO</text>
      {/* braço erguido mostrando a carta de ponta-cabeça */}
      <path d="M100,362 C64,330 52,280 56,232 L84,230 C84,272 96,306 128,330 Z" fill={linho} />
      {carta ? (
        <g transform="translate(70,150) rotate(186)">
          <rect x={-46} y={-66} width={92} height={132} rx={8} fill="#2b2140" />
          <rect x={-38} y={-58} width={76} height={56} rx={4} fill="#c98a4a" />
          <rect x={-38} y={8} width={76} height={10} fill="#e8dcc2" /><rect x={-38} y={26} width={56} height={8} fill="#e8dcc2" />
        </g>
      ) : null}
      <circle cx={70} cy={228} r={20} fill={pele} />
      <path d="M300,362 C326,430 312,486 260,512 L246,492 C282,470 290,426 272,390 Z" fill={linhoS} />
      <circle cx={252} cy={504} r={18} fill={sombra} />
      {/* cabeça, barba rala e coque verde-neon */}
      <Cabeca pele={pele} sombra={sombra} />
      <path d="M118,262 C130,316 170,332 200,332 C230,332 270,316 282,262 C270,290 240,304 200,304 C160,304 130,290 118,262 Z" fill="#6a4a2a" opacity={0.7} />
      <path d="M98,206 C94,140 140,112 200,112 C260,112 306,140 302,206 C286,176 250,160 200,160 C150,160 114,176 98,206 Z" fill="#7dff3a" />
      <ellipse cx={200} cy={92} rx={46} ry={38} fill="#9dff5a" />
      <path d="M170,116 q30,-10 60,0" stroke="#4fbf1a" strokeWidth={8} fill="none" />
      <Rosto expr={expr} oculos="redondo" />
    </g>
  );
};
