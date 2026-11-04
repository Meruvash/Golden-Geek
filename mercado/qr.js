// Gerador de QR Code (ISO/IEC 18004) pequeno, feito para o Mercado da Elite: modo byte (UTF-8), correção nível M,
// versões 1 a 10 (até 213 bytes, sobra para um link de etiqueta). Escrito à mão para não depender de biblioteca externa.
// Uso: qrSvg("https://...", { modulo: 6, margem: 4 }) devolve um <svg> pronto.
(() => {
  // blocos por versão no nível M: [codewords de correção por bloco, [[quantidade de blocos, dados por bloco], ...]]
  const BLOCOS = [null,
    [10, [[1, 16]]], [16, [[1, 28]]], [26, [[1, 44]]], [18, [[2, 32]]], [24, [[2, 43]]],
    [16, [[4, 27]]], [18, [[4, 31]]], [22, [[2, 38], [2, 39]]], [22, [[3, 36], [2, 37]]], [26, [[4, 43], [1, 44]]]];
  const ALINHA = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];

  // aritmética em GF(256) com o polinômio 0x11D
  const EXP = new Uint8Array(512), LOG = new Uint8Array(256);
  for (let i = 0, x = 1; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  const mul = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);

  function geradorRS(n) {
    let g = [1];
    for (let i = 0; i < n; i++) {
      const prox = new Array(g.length + 1).fill(0);
      g.forEach((c, j) => { prox[j] ^= c; prox[j + 1] ^= mul(c, EXP[i]); });
      g = prox;
    }
    return g;
  }
  function correcao(dados, n) {
    const g = geradorRS(n), resto = [...dados, ...new Array(n).fill(0)];
    for (let i = 0; i < dados.length; i++) {
      const f = resto[i];
      if (f) for (let j = 0; j < g.length; j++) resto[i + j] ^= mul(g[j], f);
    }
    return resto.slice(dados.length);
  }

  const capacidade = v => BLOCOS[v][1].reduce((s, [q, d]) => s + q * d, 0);

  function codewords(bytes, v) {
    const bits = [], poe = (val, n) => { for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1); };
    poe(4, 4); poe(bytes.length, v < 10 ? 8 : 16); bytes.forEach(b => poe(b, 8));
    const total = capacidade(v) * 8;
    poe(0, Math.min(4, total - bits.length));
    while (bits.length % 8) bits.push(0);
    const dados = [];
    for (let i = 0; i < bits.length; i += 8) dados.push(bits.slice(i, i + 8).reduce((a, b) => (a << 1) | b, 0));
    for (let p = 0; dados.length < capacidade(v); p++) dados.push(p % 2 ? 0x11 : 0xec);
    // divide em blocos, calcula a correção de cada um e intercala
    const [nec, grupos] = BLOCOS[v], blocos = [];
    let k = 0;
    for (const [q, d] of grupos) for (let i = 0; i < q; i++) { const b = dados.slice(k, k + d); k += d; blocos.push({ d: b, e: correcao(b, nec) }); }
    const saida = [], maxD = Math.max(...blocos.map(b => b.d.length));
    for (let i = 0; i < maxD; i++) for (const b of blocos) if (i < b.d.length) saida.push(b.d[i]);
    for (let i = 0; i < nec; i++) for (const b of blocos) saida.push(b.e[i]);
    return saida;
  }

  function bch(valor, gerador, grau) {
    let r = valor << grau;
    const topo = Math.floor(Math.log2(gerador));
    for (let i = Math.floor(Math.log2(r)); i >= topo; i--) if (r & (1 << i)) r ^= gerador << (i - topo);
    return (valor << grau) | r;
  }
  const formato = mascara => bch((0b00 << 3) | mascara, 0x537, 10) ^ 0x5412;   // nível M = 00
  const versaoBits = v => bch(v, 0x1f25, 12);

  const MASCARAS = [
    (r, c) => (r + c) % 2 === 0, (r) => r % 2 === 0, (r, c) => c % 3 === 0, (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0, (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
    (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0, (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0];

  function base(v) {
    const n = 17 + 4 * v, m = Array.from({ length: n }, () => new Array(n).fill(null));
    const fixa = (r, c, x) => { if (r >= 0 && c >= 0 && r < n && c < n) m[r][c] = x ? 1 : 0; };
    // localizadores com separador
    for (const [R, C] of [[0, 0], [0, n - 7], [n - 7, 0]])
      for (let r = -1; r <= 7; r++) for (let c = -1; c <= 7; c++) {
        const dentro = r >= 0 && r <= 6 && c >= 0 && c <= 6;
        fixa(R + r, C + c, dentro && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)));
      }
    // alinhamento
    const pos = ALINHA[v];
    for (const r of pos) for (const c of pos) {
      if ((r === 6 && c === 6) || (r === 6 && c === n - 7) || (r === n - 7 && c === 6)) continue;
      for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) fixa(r + dr, c + dc, Math.max(Math.abs(dr), Math.abs(dc)) !== 1);
    }
    // linhas de sincronismo
    for (let i = 8; i < n - 8; i++) { if (m[6][i] === null) m[6][i] = i % 2 === 0 ? 1 : 0; if (m[i][6] === null) m[i][6] = i % 2 === 0 ? 1 : 0; }
    // reserva as áreas de formato (e de versão a partir da 7) e o módulo escuro
    for (let i = 0; i < 9; i++) { if (m[8][i] === null) m[8][i] = 0; if (m[i][8] === null) m[i][8] = 0; }
    for (let i = 0; i < 8; i++) { m[8][n - 1 - i] = 0; m[n - 1 - i][8] = 0; }
    m[n - 8][8] = 1;
    if (v >= 7) for (let i = 0; i < 6; i++) for (let j = 0; j < 3; j++) { m[i][n - 11 + j] = 0; m[n - 11 + j][i] = 0; }
    return m;
  }

  function poeFormatoVersao(m, v, mascara) {
    const n = m.length, f = formato(mascara), bit = i => (f >> i) & 1;
    // em volta do localizador de cima à esquerda (bit 14 é o mais significativo)
    for (let i = 0; i <= 5; i++) m[8][i] = bit(14 - i);
    m[8][7] = bit(8); m[8][8] = bit(7); m[7][8] = bit(6);
    for (let i = 9; i <= 14; i++) m[14 - i][8] = bit(14 - i);
    // cópia: embaixo à esquerda e em cima à direita
    for (let i = 0; i <= 6; i++) m[n - 1 - i][8] = bit(14 - i);
    for (let i = 7; i <= 14; i++) m[8][n - 15 + i] = bit(14 - i);
    m[n - 8][8] = 1;
    if (v >= 7) {
      const vb = versaoBits(v);
      for (let i = 0; i < 18; i++) { const b = (vb >> i) & 1, a = Math.floor(i / 3), c = n - 11 + (i % 3); m[a][c] = b; m[c][a] = b; }
    }
  }

  function penalidade(m) {
    const n = m.length; let p = 0;
    for (let eixo = 0; eixo < 2; eixo++) for (let i = 0; i < n; i++) {
      let corrida = 1;
      for (let j = 1; j < n; j++) {
        const a = eixo ? m[j][i] : m[i][j], b = eixo ? m[j - 1][i] : m[i][j - 1];
        if (a === b) corrida++; else { if (corrida >= 5) p += corrida - 2; corrida = 1; }
      }
      if (corrida >= 5) p += corrida - 2;
      // padrão parecido com localizador (1:1:3:1:1 com 4 claros de um lado)
      const linha = Array.from({ length: n }, (_, j) => (eixo ? m[j][i] : m[i][j]));
      for (let j = 0; j + 10 < n; j++) {
        const s = linha.slice(j, j + 11).join("");
        if (s === "10111010000" || s === "00001011101") p += 40;
      }
    }
    for (let r = 0; r < n - 1; r++) for (let c = 0; c < n - 1; c++) {
      const x = m[r][c]; if (x === m[r][c + 1] && x === m[r + 1][c] && x === m[r + 1][c + 1]) p += 3;
    }
    const escuros = m.flat().reduce((s, x) => s + x, 0);
    p += Math.floor(Math.abs((escuros * 100) / (n * n) - 50) / 5) * 10;
    return p;
  }

  function matriz(texto) {
    const bytes = [...new TextEncoder().encode(texto)];
    let v = 1;
    while (v <= 10 && capacidade(v) < bytes.length + (v < 10 ? 2 : 3)) v++;
    if (v > 10) throw new Error("texto longo demais para o QR");
    const cw = codewords(bytes, v), bits = cw.flatMap(b => [7, 6, 5, 4, 3, 2, 1, 0].map(i => (b >> i) & 1));
    const vazio = base(v), n = vazio.length, livre = vazio.map(l => l.map(x => x === null));
    // posiciona os bits em zigue-zague, de baixo para cima, duas colunas por vez, pulando a coluna 6
    const m0 = vazio.map(l => l.slice());
    let k = 0, sobe = true;
    for (let c = n - 1; c > 0; c -= 2) {
      if (c === 6) c--;
      for (let t = 0; t < n; t++) {
        const r = sobe ? n - 1 - t : t;
        for (const cc of [c, c - 1]) if (livre[r][cc]) m0[r][cc] = k < bits.length ? bits[k++] : 0;
      }
      sobe = !sobe;
    }
    let melhor = null;
    for (let mk = 0; mk < 8; mk++) {
      const m = m0.map((l, r) => l.map((x, c) => (livre[r][c] && MASCARAS[mk](r, c) ? x ^ 1 : x)));
      poeFormatoVersao(m, v, mk);
      const p = penalidade(m);
      if (!melhor || p < melhor.p) melhor = { m, p, mk };
    }
    return melhor.m;
  }

  function qrSvg(texto, { modulo = 6, margem = 4, cor = "#14171c", fundo = "#ffffff", titulo = "QR Code" } = {}) {
    const m = matriz(texto), n = m.length, lado = (n + 2 * margem) * modulo;
    let caminho = "";
    m.forEach((l, r) => l.forEach((x, c) => { if (x) caminho += `M${(c + margem) * modulo} ${(r + margem) * modulo}h${modulo}v${modulo}h-${modulo}z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" width="${lado}" height="${lado}" role="img" aria-label="${titulo}" shape-rendering="crispEdges">`
      + `<rect width="100%" height="100%" fill="${fundo}"/><path d="${caminho}" fill="${cor}"/></svg>`;
  }

  const api = { qrSvg, matriz, _interno: { codewords, formato, versaoBits, correcao } };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else window.qrElite = api;
})();
