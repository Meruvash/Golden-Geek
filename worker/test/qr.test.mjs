// Testes do gerador de QR do Mercado (mercado/qr.js) com valores de referência da norma ISO/IEC 18004.
// Rodar: node --test worker/test/
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const q = createRequire(import.meta.url)("../../mercado/qr.js");
const I = q._interno;

test("correção de erros: exemplo HELLO WORLD 1-M", () => {
  const dados = [32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17];
  assert.deepEqual(I.correcao(dados, 10), [196, 35, 39, 119, 235, 215, 231, 226, 93, 23]);
});

test("bits de formato (nível M) e de versão", () => {
  const M = ["101010000010010", "101000100100101", "101111001111100", "101101101001011", "100010111111001", "100000011001110", "100111110010111", "100101010100000"];
  M.forEach((b, mk) => assert.equal(I.formato(mk).toString(2).padStart(15, "0"), b));
  assert.equal(I.versaoBits(7).toString(2).padStart(18, "0"), "000111110010010100");
  assert.equal(I.versaoBits(10).toString(2).padStart(18, "0"), "001010010011010011");
});

test("tamanho cresce com o texto e o SVG sai com os três localizadores", () => {
  assert.equal(q.matriz("A").length, 21);
  assert.equal(q.matriz("https://melhorenvio.com.br/imprimir/ixQLaqqjmb2E").length, 33);
  const m = q.matriz("https://melhorenvio.com.br/imprimir/ixQLaqqjmb2E"), n = m.length;
  for (const [r, c] of [[0, 0], [0, n - 7], [n - 7, 0]]) assert.deepEqual(m[r + 3].slice(c, c + 7), [1, 0, 1, 1, 1, 0, 1]);
  assert.equal(m[n - 8][8], 1);   // módulo escuro
  assert.match(q.qrSvg("teste"), /^<svg [^>]*viewBox="0 0 \d+ \d+"/);
  assert.throws(() => q.matriz("x".repeat(300)), /longo demais/);
});
