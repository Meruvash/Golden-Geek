import React from "react";

// Personagens fixos da série. Desenho único, reutilizado em todo episódio (PADRAO_VIDEO.md, 1b).
// Estilo: vetor chapado, cabeça redonda, sombreamento facetado em 2 tons, sem contorno.
// Caixa local 400 x 900; os pés ficam em y = 880. Posicione com x, y (centro dos pés) e escala.

type Expr = "confuso" | "apavorado" | "orgulhoso";
type ExprWan = "calmo" | "sorriso" | "serio";

const Cabeca: React.FC<{ pele: string; sombra: string; cx: number; cy: number; r: number }> = ({ pele, sombra, cx, cy, r }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={pele} />
    {/* faceta: metade direita mais escura, corte levemente diagonal */}
    <path d={`M${cx + 6},${cy - r} A${r},${r} 0 0 1 ${cx + 2},${cy + r} L${cx - 10},${cy + r * 0.2} Z`} fill={sombra} opacity={0.75} />
  </g>
);

export const Ronaldo: React.FC<{ x: number; y: number; escala?: number; expr?: Expr; pose?: "cartas" | "aspersorio" | "encolhido"; virar?: boolean }> = ({
  x, y, escala = 1, expr = "confuso", pose = "cartas", virar = false,
}) => {
  const pele = "#c68a66", sombra = "#a87154";
  const tx = `translate(${x - 200 * escala * (virar ? -1 : 1)},${y - 880 * escala}) scale(${escala * (virar ? -1 : 1)},${escala})`;
  const enc = pose === "encolhido";
  return (
    <g transform={tx}>
      {/* sombra no chão */}
      <ellipse cx={200} cy={882} rx={150} ry={20} fill="#000" opacity={0.18} />
      {/* batina */}
      <path d={enc ? "M120,420 L280,420 L330,870 L70,870 Z" : "M118,340 L282,340 L336,870 L64,870 Z"} fill="#2a2b33" />
      <path d={enc ? "M200,420 L280,420 L330,870 L200,870 Z" : "M200,340 L282,340 L336,870 L200,870 Z"} fill="#22232a" />
      {/* botões */}
      <g fill="#3b3c46">{[400, 470, 540, 610, 680, 750].map((by) => <circle key={by} cx={200} cy={by + (enc ? 60 : 0)} r={6} />)}</g>
      {/* estola roxa do exorcista com cruzes douradas */}
      <path d={enc ? "M150,430 L178,430 L170,760 L140,760 Z" : "M148,350 L178,350 L168,700 L136,700 Z"} fill="#6d4aa0" />
      <path d={enc ? "M222,430 L250,430 L260,760 L230,760 Z" : "M222,350 L252,350 L264,700 L232,700 Z"} fill="#5d3e8c" />
      <g fill="#e3b23c">
        <path d={`M148,${enc ? 720 : 660} h16 v-8 h6 v8 h16 v6 h-16 v20 h-6 v-20 h-16 Z`} transform="translate(-6,0)" />
        <path d={`M236,${enc ? 720 : 660} h16 v-8 h6 v8 h16 v6 h-16 v20 h-6 v-20 h-16 Z`} />
      </g>
      {/* colarinho clerical */}
      <rect x={176} y={enc ? 412 : 330} width={48} height={18} rx={4} fill="#f2f2ee" />
      {/* braços e mãos por pose */}
      {pose === "cartas" ? (
        <g>
          <path d="M120,360 C90,430 110,500 170,520 L190,500 C150,480 140,430 150,380 Z" fill="#2a2b33" />
          <path d="M280,360 C310,430 290,500 230,520 L210,500 C250,480 260,430 250,380 Z" fill="#22232a" />
          {/* cartas de cabeça para baixo, com ? */}
          <g transform="rotate(180 200 520)">
            <rect x={150} y={470} width={56} height={84} rx={8} fill="#f4ecdc" transform="rotate(-12 178 512)" />
            <rect x={196} y={468} width={56} height={84} rx={8} fill="#efe4cf" transform="rotate(10 224 510)" />
          </g>
          <text x={200} y={470} textAnchor="middle" fontFamily="Public Sans" fontWeight={900} fontSize={64} fill="#e3b23c">?</text>
          <circle cx={172} cy={516} r={20} fill={pele} />
          <circle cx={228} cy={516} r={20} fill={sombra} />
        </g>
      ) : pose === "aspersorio" ? (
        <g>
          <path d="M120,360 C96,430 110,500 160,520 L176,500 C140,480 136,430 150,380 Z" fill="#2a2b33" />
          <path d="M280,360 C330,360 360,300 370,250 L345,240 C330,290 305,320 262,330 Z" fill="#22232a" />
          <circle cx={160} cy={512} r={20} fill={pele} />
          {/* aspersório de água benta, pingando */}
          <rect x={356} y={150} width={12} height={110} rx={6} fill="#c9a54a" transform="rotate(20 362 205)" />
          <circle cx={340} cy={150} r={22} fill="#e3b23c" />
          <circle cx={360} cy={250} r={20} fill={sombra} />
          <g fill="#a9d8f5"><circle cx={300} cy={150} r={7} /><circle cx={280} cy={190} r={6} /><circle cx={310} cy={110} r={5} /></g>
        </g>
      ) : (
        <g>
          {/* encolhido: mãos na cabeça */}
          <path d="M120,440 C80,400 90,300 140,260 L160,280 C130,320 130,390 150,430 Z" fill="#2a2b33" />
          <path d="M280,440 C320,400 310,300 260,260 L240,280 C270,320 270,390 250,430 Z" fill="#22232a" />
          <circle cx={150} cy={270} r={22} fill={pele} />
          <circle cx={250} cy={270} r={22} fill={sombra} />
        </g>
      )}
      {/* cabeça */}
      <Cabeca pele={pele} sombra={sombra} cx={200} cy={enc ? 330 : 222} r={108} />
      {/* cabelo bagunçado com topete */}
      <g transform={enc ? "translate(0,108)" : undefined}>
        <path d="M96,206 C92,140 140,104 200,104 C262,104 306,140 304,206 C286,180 262,170 236,172 C226,150 206,146 196,160 C176,148 150,156 140,176 C122,178 106,188 96,206 Z" fill="#3a2b22" />
        <path d="M200,108 C214,80 240,78 246,92 C232,92 222,100 214,114 Z" fill="#3a2b22" />
        {/* olhos e boca por expressão */}
        {expr === "confuso" ? (
          <g>
            <path d="M150,200 q16,-14 32,-4" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M222,192 q16,-6 30,6" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={168} cy={226} r={8} fill="#1b1d24" /><circle cx={236} cy={226} r={8} fill="#1b1d24" />
            <ellipse cx={204} cy={276} rx={12} ry={14} fill="#5a2e24" />
          </g>
        ) : expr === "apavorado" ? (
          <g>
            <path d="M146,186 q18,-16 36,-6" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M220,180 q18,-10 36,6" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
            <circle cx={168} cy={226} r={15} fill="#fff" /><circle cx={168} cy={228} r={6} fill="#1b1d24" />
            <circle cx={236} cy={226} r={15} fill="#fff" /><circle cx={236} cy={228} r={6} fill="#1b1d24" />
            <path d="M180,282 q24,-26 48,0 q-24,14 -48,0 Z" fill="#5a2e24" />
            <path d="M296,190 c10,14 10,24 0,28 c-10,-4 -10,-14 0,-28 z" fill="#a9d8f5" />
          </g>
        ) : (
          <g>
            <path d="M150,198 q16,-8 32,0" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M222,198 q16,-8 32,0" stroke="#2a1d16" strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d="M156,228 q12,-10 24,0" stroke="#1b1d24" strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M224,228 q12,-10 24,0" stroke="#1b1d24" strokeWidth={6} fill="none" strokeLinecap="round" />
            <path d="M172,268 q32,26 64,0" stroke="#5a2e24" strokeWidth={8} fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>
    </g>
  );
};

export const Wan: React.FC<{ x: number; y: number; escala?: number; expr?: ExprWan; pose?: "livro" | "bracos"; brilhoLivro?: boolean }> = ({
  x, y, escala = 1, expr = "calmo", pose = "livro", brilhoLivro = true,
}) => {
  const pele = "#d29b76", sombra = "#b47e5c";
  return (
    <g transform={`translate(${x - 200 * escala},${y - 880 * escala}) scale(${escala})`}>
      <ellipse cx={200} cy={882} rx={170} ry={22} fill="#000" opacity={0.22} />
      {/* pernas */}
      <path d="M128,620 L190,620 L182,870 L120,870 Z" fill="#2b2e35" />
      <path d="M210,620 L272,620 L280,870 L218,870 Z" fill="#25282e" />
      <path d="M112,862 h76 v16 h-82 Z M212,862 h76 l6,16 h-82 Z" fill="#14151a" />
      {/* paletó risca de giz, ombros largos */}
      <path d="M80,340 C100,316 150,306 200,306 C250,306 300,316 320,340 L300,650 L100,650 Z" fill="#30333b" />
      <path d="M200,306 C250,306 300,316 320,340 L300,650 L200,650 Z" fill="#292c33" />
      <g stroke="#4a4e58" strokeWidth={3} opacity={0.8}>
        {[118, 146, 174, 226, 254, 282].map((lx) => <line key={lx} x1={lx} y1={330} x2={lx - (lx - 200) * 0.06} y2={648} />)}
      </g>
      {/* camisa, gravata vinho, lapelas */}
      <path d="M170,312 L200,420 L230,312 Z" fill="#f1efe8" />
      <path d="M192,330 L208,330 L214,460 L200,480 L186,460 Z" fill="#6a1f26" />
      <path d="M150,316 L200,440 L176,470 L132,350 Z" fill="#24262c" />
      <path d="M250,316 L200,440 L224,470 L268,350 Z" fill="#1f2126" />
      {/* rosa vermelha na lapela e lenço */}
      <circle cx={244} cy={372} r={15} fill="#b3262f" /><circle cx={240} cy={368} r={7} fill="#d84a52" />
      <path d="M230,384 l-14,14" stroke="#3d6b3a" strokeWidth={5} strokeLinecap="round" />
      <path d="M130,420 l30,-6 l-4,14 Z" fill="#e3b23c" />
      {/* braços por pose */}
      {pose === "livro" ? (
        <g>
          <path d="M84,346 C56,420 70,500 130,540 L150,516 C112,486 104,430 118,380 Z" fill="#30333b" />
          <path d="M316,346 C344,420 330,500 270,540 L250,516 C288,486 296,430 282,380 Z" fill="#292c33" />
          {/* manual aberto que brilha */}
          {brilhoLivro ? <ellipse cx={200} cy={520} rx={120} ry={70} fill="#ffe9a6" opacity={0.55} /> : null}
          <path d="M120,500 L200,520 L280,500 L280,560 L200,580 L120,560 Z" fill="#f4ecdc" />
          <path d="M200,520 L280,500 L280,560 L200,580 Z" fill="#e6dac2" />
          <path d="M120,500 L200,520 L200,580 L120,560 Z" fill="#8a5a2b" opacity={0.25} />
          <g stroke="#b9a983" strokeWidth={3}><path d="M136,520 l48,12 M136,536 l48,12 M216,532 l48,-12 M216,548 l48,-12" /></g>
          <circle cx={138} cy={540} r={20} fill={pele} /><circle cx={262} cy={540} r={20} fill={sombra} />
        </g>
      ) : (
        <g>
          <path d="M84,346 C60,420 90,470 200,470 L200,440 C130,440 112,410 118,380 Z" fill="#30333b" />
          <path d="M316,346 C340,420 310,480 200,486 L200,454 C270,450 290,420 282,380 Z" fill="#292c33" />
          <circle cx={236} cy={470} r={18} fill={sombra} /><circle cx={164} cy={456} r={18} fill={pele} />
        </g>
      )}
      {/* cabeça: mais velho, papada leve */}
      <Cabeca pele={pele} sombra={sombra} cx={200} cy={200} r={112} />
      <path d="M126,262 C150,300 250,300 274,262 C262,294 230,312 200,312 C170,312 138,294 126,262 Z" fill={sombra} opacity={0.6} />
      {/* cabelo penteado para trás, grisalho */}
      <path d="M92,190 C88,120 140,82 200,82 C262,82 312,120 308,190 C296,150 260,124 200,124 C140,124 104,150 92,190 Z" fill="#3a3b42" />
      <path d="M132,110 C170,92 236,92 272,112" stroke="#8d8f98" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M96,180 L92,214 L106,206 Z M304,180 L308,214 L294,206 Z" fill="#9a9ca4" />
      {/* sobrancelhas grossas */}
      <path d="M140,182 L188,190" stroke="#2c2a2e" strokeWidth={13} strokeLinecap="round" />
      <path d="M212,190 L262,182" stroke="#2c2a2e" strokeWidth={13} strokeLinecap="round" />
      {/* olhos semicerrados (pálpebra pesada) */}
      {expr === "serio" ? (
        <g><path d="M146,214 h38" stroke="#1b1d24" strokeWidth={9} strokeLinecap="round" /><path d="M216,214 h38" stroke="#1b1d24" strokeWidth={9} strokeLinecap="round" /></g>
      ) : (
        <g>
          <path d="M146,212 q19,10 38,0" stroke="#1b1d24" strokeWidth={7} fill="none" strokeLinecap="round" />
          <path d="M216,212 q19,10 38,0" stroke="#1b1d24" strokeWidth={7} fill="none" strokeLinecap="round" />
          <circle cx={166} cy={220} r={5} fill="#1b1d24" /><circle cx={236} cy={220} r={5} fill="#1b1d24" />
        </g>
      )}
      {/* bigode fino e boca */}
      <path d="M170,258 q30,-14 60,0" stroke="#3a3b42" strokeWidth={8} fill="none" strokeLinecap="round" />
      {expr === "sorriso" ? (
        <path d="M178,276 q30,14 56,-6" stroke="#5a2e24" strokeWidth={7} fill="none" strokeLinecap="round" />
      ) : (
        <path d="M182,278 q22,6 44,-2" stroke="#5a2e24" strokeWidth={7} fill="none" strokeLinecap="round" />
      )}
    </g>
  );
};
