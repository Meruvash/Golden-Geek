import React from "react";

// Personagens de "Victor e o Talaricórnio" (desenho nosso). Caixa local 400 x 900, pés em y = 880
// (mesma convenção do Wan, do Ronaldo e do Lukita). O acabamento cel (contorno + luz de borda) vem do FiltroCel.

const LINHA = "#2a1626";
export type ExprVictor = "sombrio" | "triste" | "hipnotizado" | "determinado";

// Victor: vampiro galã pálido e melancólico (personagem original da série).
export const Victor: React.FC<{ x: number; y: number; escala?: number; expr?: ExprVictor; pose?: "normal" | "aponta" | "coleira"; t?: number; virar?: boolean }> = ({
  x, y, escala = 1, expr = "sombrio", pose = "normal", t = 0, virar = false,
}) => {
  const PELE = "#efe6e3", PELE_S = "#d6c3c6", CASACO = "#1e1a26", FORRO = "#8f1d3a";
  const sx = virar ? -escala : escala;
  return (
    <g transform={`translate(${x - 200 * sx},${y - 880 * escala}) scale(${sx},${escala})`}>
      <ellipse cx={200} cy={884} rx={140} ry={16} fill="#000" opacity={0.3} />
      {/* pernas e botas */}
      <path d="M150,600 L196,600 L190,850 L152,850 Z M204,600 L250,600 L248,850 L210,850 Z" fill="#241c26" />
      <path d="M144,846 h52 v30 h-62 Z M206,846 h52 l8,30 h-60 Z" fill="#0e0a10" />
      {/* casaco longo de gola alta, forro vinho */}
      <path d="M120,300 C110,420 100,600 86,770 L180,770 L200,540 L220,770 L314,770 C300,600 290,420 280,300 Z" fill={CASACO} stroke={LINHA} strokeWidth={4} />
      <path d="M86,770 L120,700 L130,770 Z M314,770 L280,700 L270,770 Z" fill={FORRO} />
      <path d="M200,420 L200,540" stroke="#3a3346" strokeWidth={3} />
      {[450, 500].map((yy) => <circle key={yy} cx={214} cy={yy} r={5} fill="#b9a8c8" />)}
      <path d="M170,300 L200,430 L230,300 Z" fill="#f4f0f2" />
      <path d="M192,316 L200,400 L208,316 Z" fill={FORRO} />
      <path d="M112,304 L150,212 L176,302 Z M288,304 L250,212 L224,302 Z" fill={CASACO} stroke={LINHA} strokeWidth={4} />
      <path d="M150,218 L170,296 M250,218 L230,296" stroke={FORRO} strokeWidth={6} />
      {/* braços */}
      {pose === "aponta" ? (
        <>
          <path d="M120,310 L98,560 L124,566 L146,330 Z" fill={CASACO} stroke={LINHA} strokeWidth={3} />
          <circle cx={110} cy={576} r={16} fill={PELE} stroke={LINHA} strokeWidth={3} />
          <path d="M268,318 L430,326 L430,356 L262,352 Z" fill={CASACO} stroke={LINHA} strokeWidth={3} />
          <path d="M430,328 h30 a12,12 0 0 1 0,24 h-30 Z" fill={PELE} stroke={LINHA} strokeWidth={3} />
        </>
      ) : pose === "coleira" ? (
        <>
          <path d="M120,310 L98,560 L124,566 L146,330 Z" fill={CASACO} stroke={LINHA} strokeWidth={3} />
          <circle cx={110} cy={576} r={16} fill={PELE} stroke={LINHA} strokeWidth={3} />
          <path d="M280,310 L262,470 L222,480 L224,452 L244,446 L254,330 Z" fill={CASACO} stroke={LINHA} strokeWidth={3} />
          <path d="M226,482 C200,500 200,540 226,552 C252,540 252,500 226,482 Z" fill="none" stroke="#c43b2f" strokeWidth={9} />
          <circle cx={226} cy={560} r={8} fill="#f2c94c" stroke={LINHA} strokeWidth={2} />
          <circle cx={226} cy={472} r={15} fill={PELE} stroke={LINHA} strokeWidth={3} />
        </>
      ) : (
        <>
          <path d="M120,310 L98,560 L124,566 L146,330 Z M280,310 L302,560 L276,566 L254,330 Z" fill={CASACO} stroke={LINHA} strokeWidth={3} />
          <circle cx={110} cy={576} r={16} fill={PELE} stroke={LINHA} strokeWidth={3} />
          <circle cx={290} cy={576} r={16} fill={PELE} stroke={LINHA} strokeWidth={3} />
        </>
      )}
      {/* pescoço e rosto */}
      <rect x={182} y={236} width={36} height={70} fill={PELE_S} />
      <path d="M148,118 C148,74 252,74 252,118 L248,196 C242,234 222,252 200,254 C178,252 158,234 152,196 Z" fill={PELE} stroke={LINHA} strokeWidth={4} />
      <path d="M160,200 C170,236 190,248 200,250 C186,236 176,220 172,196 Z" fill={PELE_S} opacity={0.7} />
      {/* olheiras (piada do Lukita) */}
      <path d="M166,186 Q180,196 194,186 M206,186 Q220,196 234,186" stroke="#b99cb8" strokeWidth={4} fill="none" strokeLinecap="round" />
      {/* olhos */}
      {expr === "hipnotizado" ? (
        [178, 222].map((ex) => (
          <g key={ex}>
            <circle cx={ex} cy={170} r={13} fill="#fff" stroke={LINHA} strokeWidth={2} />
            <path d={`M${ex},170 m-1,0 a3,3 0 1 1 4,2 a6,6 0 1 1 -9,-6 a9,9 0 1 1 13,10`} stroke="#e24a9a" strokeWidth={2.4} fill="none" transform={`rotate(${t * 400},${ex},170)`} />
          </g>
        ))
      ) : (
        [178, 222].map((ex) => (
          <g key={ex}>
            <ellipse cx={ex} cy={170} rx={13} ry={7} fill="#fbf8fa" />
            <circle cx={ex + (ex < 200 ? 2 : -2)} cy={170} r={6.5} fill="#8a6cc0" />
            <circle cx={ex + (ex < 200 ? 2 : -2)} cy={170} r={3} fill="#1a1020" />
            <circle cx={ex + (ex < 200 ? 4 : 0)} cy={167.5} r={1.8} fill="#fff" />
            <path d={`M${ex - 14},166 Q${ex},159 ${ex + 14},166`} stroke={LINHA} strokeWidth={3} fill="none" />
          </g>
        ))
      )}
      {/* sobrancelhas por expressão */}
      {expr === "triste" ? (
        <path d="M162,150 L192,140 M238,150 L208,140" stroke="#2a1622" strokeWidth={6} strokeLinecap="round" />
      ) : expr === "determinado" ? (
        <path d="M160,142 L194,152 M240,142 L206,152" stroke="#2a1622" strokeWidth={7} strokeLinecap="round" />
      ) : expr === "hipnotizado" ? (
        <path d="M162,140 Q178,130 194,140 M206,140 Q222,130 238,140" stroke="#2a1622" strokeWidth={5} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M160,146 L194,148 M240,146 L206,148" stroke="#2a1622" strokeWidth={7} strokeLinecap="round" />
      )}
      <path d="M200,176 L196,204 L204,206" stroke="#b99cb8" strokeWidth={3} fill="none" strokeLinecap="round" />
      {expr === "determinado" ? <path d="M184,224 Q200,232 216,222" stroke={LINHA} strokeWidth={3.5} fill="none" strokeLinecap="round" />
        : expr === "hipnotizado" ? <path d="M186,222 Q200,238 214,222" stroke={LINHA} strokeWidth={3.5} fill="#7a2a40" strokeLinecap="round" />
        : <path d="M186,226 L214,226" stroke={LINHA} strokeWidth={3.5} strokeLinecap="round" />}
      {expr === "triste" ? (
        <g>{[0, 1, 2].map((k) => { const yy = 190 + ((t * 120 + k * 22) % 60); return <path key={k} d={`M${172 + k * 2},${yy} l3,7 l7,3 l-7,3 l-3,7 l-3,-7 l-7,-3 l7,-3 Z`} fill={["#ffd1f0", "#c9e8ff", "#fff1a0"][k]} />; })}</g>
      ) : null}
      {/* cabelo: topete alto em mecha */}
      <path d="M142,150 C124,90 150,34 204,36 C262,22 300,66 266,100 C276,118 266,138 258,152 C248,112 222,96 192,100 C170,104 156,122 156,154 Z" fill="#35202e" stroke={LINHA} strokeWidth={4} />
      <path d="M170,70 C196,46 238,44 258,62 M160,104 C176,80 210,72 236,82" stroke="#7a4a66" strokeWidth={5} fill="none" strokeLinecap="round" />
    </g>
  );
};

const ARCO = ["#e2364f", "#f2843a", "#f2d23a", "#4ac06a", "#3a8fd6", "#3a4ab8", "#9a4ad6"];

// Victor transformado: armadura de herói nas 7 cores do arco-íris (estilo sentai genérico, sem marca).
export const VictorArmadura: React.FC<{ x: number; y: number; escala?: number; id?: string; pose?: "pose" | "normal" }> = ({ x, y, escala = 1, id = "arm", pose = "pose" }) => (
  <g transform={`translate(${x - 200 * escala},${y - 880 * escala}) scale(${escala})`}>
    <defs>
      <linearGradient id={`${id}-arco`} x1="0" y1="0" x2="1" y2="1">
        {ARCO.map((c, i) => <stop key={i} offset={i / 6} stopColor={c} />)}
      </linearGradient>
    </defs>
    <ellipse cx={200} cy={884} rx={140} ry={16} fill="#000" opacity={0.3} />
    <path d="M150,600 L196,600 L190,850 L152,850 Z M204,600 L250,600 L248,850 L210,850 Z" fill={`url(#${id}-arco)`} stroke={LINHA} strokeWidth={4} />
    <path d="M144,840 h52 v36 h-62 Z M206,840 h52 l8,36 h-60 Z" fill="#f4f0f6" stroke={LINHA} strokeWidth={4} />
    <path d="M124,300 C114,420 130,560 150,610 L250,610 C270,560 286,420 276,300 Z" fill={`url(#${id}-arco)`} stroke={LINHA} strokeWidth={4} />
    <path d="M150,300 L200,420 L250,300" stroke="#f4f0f6" strokeWidth={14} fill="none" />
    <rect x={146} y={560} width={108} height={22} rx={6} fill="#f4f0f6" stroke={LINHA} strokeWidth={3} />
    <path d="M200,560 l7,9 l11,1 l-8,7 l3,11 l-13,-6 l-13,6 l3,-11 l-8,-7 l11,-1 Z" fill="#f2c94c" stroke={LINHA} strokeWidth={2} />
    {pose === "pose" ? (
      <>
        <path d="M124,310 L40,200 L64,184 L146,290 Z" fill={`url(#${id}-arco)`} stroke={LINHA} strokeWidth={3} />
        <circle cx={46} cy={186} r={20} fill="#f4f0f6" stroke={LINHA} strokeWidth={3} />
        <path d="M276,310 L330,430 L304,442 L254,330 Z" fill={`url(#${id}-arco)`} stroke={LINHA} strokeWidth={3} />
        <circle cx={318} cy={444} r={20} fill="#f4f0f6" stroke={LINHA} strokeWidth={3} />
      </>
    ) : (
      <path d="M124,310 L100,560 L126,566 L146,330 Z M276,310 L300,560 L274,566 L254,330 Z" fill={`url(#${id}-arco)`} stroke={LINHA} strokeWidth={3} />
    )}
    {/* capacete com viseira em V */}
    <path d="M140,130 C140,60 260,60 260,130 L256,230 C250,250 150,250 144,230 Z" fill="#f4f0f6" stroke={LINHA} strokeWidth={4} />
    <path d="M152,140 L200,200 L248,140 L248,176 L200,226 L152,176 Z" fill="#14101c" />
    <path d="M160,148 L200,196" stroke="#9ad6ff" strokeWidth={4} opacity={0.7} />
    <path d="M150,96 C170,70 230,70 250,96" stroke={`url(#${id}-arco)`} strokeWidth={14} fill="none" strokeLinecap="round" />
  </g>
);

// Talaricórnio: unicórnio galanteador de crina arco-íris (olha para a direita; virar = olha para a esquerda).
export const Talaricornio: React.FC<{ x: number; y: number; escala?: number; t?: number; olho?: "flerte" | "pisca" | "coracao" | "tonto" | "brilho"; virar?: boolean; crina?: number; brasinha?: boolean; namorada?: boolean; passo?: number }> = ({
  x, y, escala = 1, t = 0, olho = "flerte", virar = false, crina = 0, brasinha = false, namorada = false, passo = 0,
}) => {
  const sx = virar ? -escala : escala;
  const pata = (px: number, fase: number) => {
    const a = Math.sin(passo * 8 + fase) * 14;
    return <g key={px} transform={`rotate(${a},${px},-120)`}><path d={`M${px - 14},-130 L${px + 14},-130 L${px + 10},-14 L${px - 10},-14 Z`} fill="#f6f1ff" stroke={LINHA} strokeWidth={4} /><path d={`M${px - 12},-16 h24 v16 h-24 Z`} fill="#f2c94c" stroke={LINHA} strokeWidth={3} /></g>;
  };
  const jogada = Math.sin(crina * Math.PI) * 30;
  return (
    <g transform={`translate(${x},${y}) scale(${sx},${escala})`}>
      <ellipse cx={0} cy={4} rx={170} ry={16} fill="#000" opacity={0.25} />
      {/* rabo arco-íris */}
      {ARCO.map((c, i) => <path key={i} d={`M-130,-190 C-${200 + i * 6},-${210 - i * 14} -${220 + i * 4},-${120 - i * 10} -${190 + i * 5},-${40 + i * 6}`} stroke={c} strokeWidth={13} fill="none" strokeLinecap="round" transform={`rotate(${4 * Math.sin(t * 3 + i * 0.4)},-130,-190)`} />)}
      {pata(-90, 0)}{pata(-50, Math.PI)}{pata(70, Math.PI)}{pata(110, 0)}
      <ellipse cx={10} cy={-170} rx={150} ry={78} fill="#fbf7ff" stroke={LINHA} strokeWidth={4} />
      <path d="M-130,-140 C-60,-100 80,-100 150,-150" stroke="#d9cdf2" strokeWidth={18} fill="none" opacity={0.7} />
      {/* pescoço e cabeça */}
      <path d="M90,-210 C110,-280 140,-320 170,-340 L220,-320 C200,-280 170,-230 150,-160 Z" fill="#fbf7ff" stroke={LINHA} strokeWidth={4} />
      <g transform={`rotate(${-jogada * 0.3},170,-330)`}>
        <ellipse cx={200} cy={-336} rx={64} ry={42} transform="rotate(20,200,-336)" fill="#fbf7ff" stroke={LINHA} strokeWidth={4} />
        <ellipse cx={252} cy={-312} rx={26} ry={22} fill="#f1e2f4" stroke={LINHA} strokeWidth={3} />
        <circle cx={258} cy={-316} r={3.5} fill={LINHA} />
        <path d="M236,-296 Q248,-288 262,-298" stroke={LINHA} strokeWidth={3} fill="none" />
        <ellipse cx={226} cy={-322} rx={14} ry={7} fill="#ff9ac8" opacity={0.6} />
        {/* chifre dourado em espiral */}
        <path d="M196,-372 L238,-466 L214,-368 Z" fill="#f2c94c" stroke={LINHA} strokeWidth={3} />
        {[0, 1, 2].map((k) => <path key={k} d={`M${202 + k * 8},${-386 - k * 22} l14,-6`} stroke="#b8862a" strokeWidth={3} />)}
        <path d="M172,-366 L160,-400 L188,-372 Z" fill="#fbf7ff" stroke={LINHA} strokeWidth={3} />
        {/* olho */}
        {olho === "pisca" ? (
          <path d="M190,-350 Q204,-340 218,-350" stroke={LINHA} strokeWidth={4} fill="none" strokeLinecap="round" />
        ) : olho === "coracao" ? (
          <path d="M204,-340 C196,-350 184,-356 190,-366 C194,-372 202,-370 204,-364 C206,-370 214,-372 218,-366 C224,-356 212,-350 204,-340 Z" fill="#e24a9a" stroke={LINHA} strokeWidth={2} transform={`scale(${1 + 0.12 * Math.sin(t * 12)})`} style={{ transformOrigin: "204px -356px", transformBox: "fill-box" }} />
        ) : olho === "tonto" ? (
          <path d="M204,-354 m-1,0 a3,3 0 1 1 4,2 a6,6 0 1 1 -9,-6 a9,9 0 1 1 13,10" stroke={LINHA} strokeWidth={2.4} fill="none" transform={`rotate(${t * 600},204,-354)`} />
        ) : (
          <g>
            <ellipse cx={204} cy={-354} rx={13} ry={10} fill="#fff" stroke={LINHA} strokeWidth={2} />
            <circle cx={207} cy={-354} r={7} fill={olho === "brilho" ? "#ff5ab0" : "#7a3ab8"} />
            {olho === "brilho" ? <circle cx={207} cy={-354} r={16} fill="#ff5ab0" opacity={0.35} /> : null}
            <circle cx={209} cy={-357} r={2.4} fill="#fff" />
            {/* pálpebra meio fechada: o olhar galanteador */}
            <path d="M190,-362 Q204,-368 218,-360 L218,-356 Q204,-360 190,-356 Z" fill="#fbf7ff" stroke={LINHA} strokeWidth={2.5} />
          </g>
        )}
        <path d="M190,-364 l-8,-8 M198,-366 l-4,-10 M206,-366 l0,-11" stroke={LINHA} strokeWidth={2.6} strokeLinecap="round" />
      </g>
      {/* crina arco-íris (jogada = crina) */}
      {ARCO.map((c, i) => <path key={i} d={`M${168 - i * 8},${-370 + i * 4} C${130 - i * 12 - jogada},${-360 + i * 10 - jogada} ${110 - i * 6 - jogada * 1.4},${-280 + i * 12} ${90 - i * 4},${-210 + i * 6}`} stroke={c} strokeWidth={12} fill="none" strokeLinecap="round" />)}
      {brasinha ? <g transform="translate(-30,-262) scale(0.8)"><Brasinha x={0} y={0} t={t} dormindo /></g> : null}
      {namorada ? (
        <g transform="translate(-20,-240)">
          <path d="M-30,0 C-30,-60 30,-60 30,0 Z" fill="#e27aa8" stroke={LINHA} strokeWidth={3} />
          <circle cx={0} cy={-78} r={24} fill="#f2c9a5" stroke={LINHA} strokeWidth={3} />
          <circle cx={6} cy={-104} r={14} fill="#5a3a2a" />
          <path d="M-24,-84 C-24,-108 24,-108 24,-84 C14,-96 -14,-96 -24,-84 Z" fill="#5a3a2a" />
          <path d="M-4,-76 a2,2 0 1 0 0.1,0 M10,-76 a2,2 0 1 0 0.1,0" stroke={LINHA} strokeWidth={3} />
          <path d="M-2,-66 Q4,-62 10,-66" stroke={LINHA} strokeWidth={2} fill="none" />
          <g transform={`rotate(${-30 + 25 * Math.sin(t * 10)},20,-40)`}><path d="M20,-40 L40,-96" stroke="#f2c9a5" strokeWidth={10} strokeLinecap="round" /></g>
        </g>
      ) : null}
    </g>
  );
};

// Brasinha: dragãozinho Mystling do Victor.
export const Brasinha: React.FC<{ x: number; y: number; t?: number; dormindo?: boolean; escala?: number }> = ({ x, y, t = 0, dormindo = false, escala = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${escala})`}>
    <path d="M-30,10 C-70,20 -80,-10 -60,-20" stroke="#e2622a" strokeWidth={12} fill="none" strokeLinecap="round" />
    <g transform={`rotate(${dormindo ? 0 : 10 * Math.sin(t * 9)},-10,-30)`}><path d="M-10,-30 L-60,-80 L-40,-30 Z" fill="#f2a23a" stroke={LINHA} strokeWidth={3} /></g>
    <g transform={`rotate(${dormindo ? 0 : -10 * Math.sin(t * 9)},20,-30)`}><path d="M20,-30 L66,-84 L46,-30 Z" fill="#f2a23a" stroke={LINHA} strokeWidth={3} /></g>
    <circle cx={0} cy={0} r={34} fill="#f2843a" stroke={LINHA} strokeWidth={3} />
    <ellipse cx={4} cy={10} rx={20} ry={16} fill="#ffd9a0" />
    <circle cx={22} cy={-36} r={28} fill="#f2843a" stroke={LINHA} strokeWidth={3} />
    <path d="M10,-60 l-6,-14 l12,8 M28,-62 l2,-15 l8,12" stroke={LINHA} strokeWidth={3} fill="#f2c94c" />
    {dormindo ? (
      <><path d="M10,-38 q6,4 12,0 M28,-38 q6,4 12,0" stroke={LINHA} strokeWidth={3} fill="none" /><text x={50} y={-62} fontFamily="Public Sans" fontWeight={900} fontSize={20} fill="#fff" opacity={0.5 + 0.5 * Math.sin(t * 3)}>z</text></>
    ) : (
      <><circle cx={14} cy={-38} r={5} fill={LINHA} /><circle cx={34} cy={-38} r={5} fill={LINHA} /><circle cx={16} cy={-40} r={1.6} fill="#fff" /><circle cx={36} cy={-40} r={1.6} fill="#fff" /></>
    )}
    <path d="M18,-24 Q26,-18 34,-24" stroke={LINHA} strokeWidth={2.5} fill="none" />
  </g>
);

// Vendedor de poções (figurante).
export const Vendedor: React.FC<{ x: number; y: number; escala?: number; triste?: boolean }> = ({ x, y, escala = 1, triste }) => (
  <g transform={`translate(${x - 200 * escala},${y - 880 * escala}) scale(${escala})`}>
    <ellipse cx={200} cy={884} rx={150} ry={18} fill="#000" opacity={0.25} />
    <path d="M150,620 L196,620 L192,860 L150,860 Z M204,620 L250,620 L250,860 L208,860 Z" fill="#4a3a5a" stroke={LINHA} strokeWidth={3} />
    <path d="M110,330 C90,480 100,600 130,640 L270,640 C300,600 310,480 290,330 C250,300 150,300 110,330 Z" fill="#7a5a9a" stroke={LINHA} strokeWidth={4} />
    <path d="M150,360 L250,360 L260,640 L140,640 Z" fill="#efe2c8" stroke={LINHA} strokeWidth={3} />
    {[0, 1, 2].map((k) => <g key={k} transform={`translate(${170 + k * 30},${560})`}><path d="M-8,0 h16 l4,30 h-24 Z" fill={["#7ae2c0", "#e27a9a", "#c07ae2"][k]} stroke={LINHA} strokeWidth={2} /></g>)}
    <path d="M110,340 L84,560 L110,566 L134,360 Z M290,340 L316,560 L290,566 L266,360 Z" fill="#7a5a9a" stroke={LINHA} strokeWidth={3} />
    <circle cx={96} cy={576} r={18} fill="#f2c9a5" stroke={LINHA} strokeWidth={3} />
    <circle cx={304} cy={576} r={18} fill="#f2c9a5" stroke={LINHA} strokeWidth={3} />
    <circle cx={200} cy={220} r={86} fill="#f2c9a5" stroke={LINHA} strokeWidth={4} />
    <path d="M120,190 C120,120 280,120 280,190 C260,150 140,150 120,190 Z" fill="#3a2a2a" />
    <path d="M150,180 l20,-10 M250,180 l-20,-10" stroke={LINHA} strokeWidth={5} strokeLinecap="round" transform={triste ? "" : "translate(0,4)"} />
    <circle cx={172} cy={206} r={6} fill={LINHA} /><circle cx={228} cy={206} r={6} fill={LINHA} />
    {triste ? <path d="M168,214 q-4,14 0,22" stroke="#9ad6ff" strokeWidth={5} fill="none" strokeLinecap="round" /> : null}
    <path d="M160,250 C180,236 220,236 240,250 C226,262 174,262 160,250 Z" fill="#3a2a2a" />
    <path d={triste ? "M180,282 Q200,270 220,282" : "M180,276 Q200,290 220,276"} stroke={LINHA} strokeWidth={4} fill="none" strokeLinecap="round" />
  </g>
);

// Dragão de montaria do Wan (silhueta com luz de borda).
export const Dragao: React.FC<{ x: number; y: number; escala?: number; t?: number; borda?: string }> = ({ x, y, escala = 1, t = 0, borda = "#ff9a6a" }) => {
  const asa = Math.sin(t * 6) * 30;
  const corpo = (c: string, dx = 0, dy = 0) => (
    <g transform={`translate(${dx},${dy})`} fill={c}>
      <path d="M-220,20 C-120,-10 -40,-20 40,-10 C100,-4 150,-30 190,-60 L230,-50 L196,-30 C170,0 120,30 40,34 C-40,40 -140,40 -220,20 Z" />
      <path d={`M-40,-10 L-160,${-150 - asa} L-120,${-100 - asa * 0.6} L-60,${-140 - asa} L-40,${-80 - asa * 0.4} L20,${-120 - asa} L20,-10 Z`} />
      <path d="M-220,20 L-300,0 L-240,34 Z" />
    </g>
  );
  return <g transform={`translate(${x},${y}) scale(${escala})`}>{corpo(borda, -4, -4)}{corpo("#1c1228")}<circle cx={200} cy={-50} r={4} fill="#ff5a3a" /></g>;
};
