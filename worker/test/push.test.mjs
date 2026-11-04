// Testes do serviço de notificações (worker/src/push.js) com um D1 de mentira em SQLite e fetch simulado.
// Rodar: node --test worker/test/push.test.mjs   (Node 22+; não precisa de Cloudflare nem de internet)
import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { rotasPush, agendado } from "../src/push.js";

const ESQUEMA = `
CREATE TABLE push_subs (endpoint TEXT PRIMARY KEY, chaves TEXT, criado TEXT, falhas INTEGER DEFAULT 0, temas TEXT DEFAULT ',black,', ultimo_ok TEXT, visto TEXT);
CREATE TABLE push_alertas (id TEXT PRIMARY KEY, lote TEXT, titulo TEXT, texto TEXT, url TEXT, imagem TEXT, criado TEXT, tema TEXT DEFAULT 'black');
CREATE TABLE push_estado (k TEXT PRIMARY KEY, v TEXT);
CREATE TABLE push_fila (lote TEXT PRIMARY KEY, tema TEXT, cursor TEXT, criado TEXT);
CREATE TABLE push_entrega (endpoint TEXT, alerta TEXT, mostrado INTEGER DEFAULT 0, enviado TEXT, tentativas INTEGER DEFAULT 0, ok INTEGER DEFAULT 0, PRIMARY KEY (endpoint, alerta));`;

function d1() {
  const db = new DatabaseSync(":memory:");
  db.exec(ESQUEMA);
  const stmt = (sql, args = []) => ({
    sql, args,
    bind: (...a) => stmt(sql, a),
    async all() { return { results: db.prepare(sql).all(...args) }; },
    async first(col) { const r = db.prepare(sql).get(...args); return r === undefined ? null : col ? r[col] : r; },
    async run() { const r = db.prepare(sql).run(...args); return { meta: { changes: Number(r.changes) } }; },
  });
  return {
    raw: db,
    prepare: (sql) => stmt(sql),
    async batch(lista) {
      db.exec("BEGIN");
      try { const out = lista.map((s) => ({ meta: { changes: Number(db.prepare(s.sql).run(...s.args).changes) } })); db.exec("COMMIT"); return out; }
      catch (e) { db.exec("ROLLBACK"); throw e; }
    },
  };
}

async function ambiente() {
  const par = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
  const jwk = await crypto.subtle.exportKey("jwk", par.privateKey);
  return { DB: d1(), VAPID_JWK: JSON.stringify(jwk), VAPID_PUBLICA: "chave-publica" };
}

// fetch simulado: listas do site e serviços de push
const estado = { conteudo: [], black: [], pushes: [], status: {} };
globalThis.fetch = async (url, op = {}) => {
  const u = String(url);
  if (u.startsWith("https://eliteboardgamers.com.br/alertas/conteudo.json")) return new Response(JSON.stringify(estado.conteudo));
  if (u.startsWith("https://eliteboardgamers.com.br/black/alertas.json")) return new Response(JSON.stringify(estado.black));
  estado.pushes.push({ endpoint: u, headers: op.headers });
  return new Response(null, { status: estado.status[u] || 201 });
};
const relogio = { t: Date.parse("2026-11-04T10:00:00Z") };
Date.now = () => relogio.t;
const passa = (min) => { relogio.t += min * 60000; };

const noticia = (n, hora) => ({ id: `n-${n}`, tema: "noticias", hora, titulo: `📰 Notícia ${n}`, texto: "x", url: `https://eliteboardgamers.com.br/noticias/${n}/` });
const SITE = { "access-control-allow-origin": "https://eliteboardgamers.com.br" };
async function chama(env, caminho, corpo, metodo = corpo ? "POST" : "GET") {
  const url = new URL("https://api.eliteboardgamers.com.br" + caminho);
  const req = new Request(url, { method: metodo, body: corpo ? JSON.stringify(corpo) : undefined, headers: { "content-type": "application/json" } });
  return (await rotasPush(req, url, env, SITE)).json();
}
async function inscreve(env, ep, temas) { return chama(env, "/v1/push/inscrever", { sub: { endpoint: ep, keys: {} }, temas }); }

test("notícia nova chega uma vez a quem escolheu Notícias, e só a ele", async () => {
  const env = await ambiente();
  estado.conteudo = [noticia(1, "2026-11-03T10:00:00Z")]; estado.black = []; estado.pushes = []; estado.status = {};
  await inscreve(env, "https://push.teste/so-black", ["black"]);
  await inscreve(env, "https://push.teste/noticias", ["black", "noticias"]);
  await agendado(env); // primeira leitura: só marca onde parou
  assert.equal(estado.pushes.length, 0);
  passa(1);
  estado.conteudo.push(noticia(2, "2026-11-04T10:00:30Z"), noticia(3, "2026-11-04T10:00:30Z"));
  await agendado(env);
  assert.deepEqual(estado.pushes.map((p) => p.endpoint), ["https://push.teste/noticias"]);
  assert.equal(estado.pushes[0].headers.topic, "novidades");
  passa(1); await agendado(env); // nada novo: ninguém é avisado de novo
  assert.equal(estado.pushes.length, 1);
  const r = await chama(env, "/v1/push/ultimos?ep=" + encodeURIComponent("https://push.teste/noticias"));
  assert.deepEqual(r.alertas.map((a) => a.id).sort(), ["noticias:n-2", "noticias:n-3"]);
  const de_novo = await chama(env, "/v1/push/ultimos?ep=" + encodeURIComponent("https://push.teste/noticias"));
  assert.equal(de_novo.repetido, true); // segunda busca não traz nada como novo
  assert.equal(de_novo.alertas.length, 1);
});

test("cron e plano B rodando juntos não duplicam o aviso", async () => {
  const env = await ambiente();
  estado.conteudo = [noticia(1, "2026-11-03T10:00:00Z")]; estado.black = []; estado.pushes = []; estado.status = {};
  await inscreve(env, "https://push.teste/a", ["noticias"]);
  await agendado(env);
  passa(1);
  estado.conteudo.push(noticia(2, "2026-11-04T11:00:00Z"));
  await Promise.all([agendado(env, "cron"), agendado(env, "plano-b"), agendado(env, "cron")]);
  passa(1); await agendado(env);
  assert.equal(estado.pushes.length, 1);
});

test("edição grande vira 2 notificações + resumo, sem perder nenhuma", async () => {
  const env = await ambiente();
  estado.conteudo = [noticia(0, "2026-11-03T10:00:00Z")]; estado.pushes = []; estado.status = {};
  await inscreve(env, "https://push.teste/a", ["noticias"]);
  await agendado(env);
  passa(1);
  for (let i = 1; i <= 8; i++) estado.conteudo.push(noticia(i, "2026-11-04T12:00:00Z"));
  await agendado(env);
  const r = await chama(env, "/v1/push/ultimos?ep=" + encodeURIComponent("https://push.teste/a"));
  assert.equal(r.alertas.length, 3);
  assert.match(r.alertas[2].titulo, /E mais 6 notícias/);
  assert.equal(r.alertas[2].url, "https://eliteboardgamers.com.br/noticias/");
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) n FROM push_alertas").get().n, 8);
});

test("nova tentativa: push recusado repete; aparelho antigo não ganha duplicata", async () => {
  const env = await ambiente();
  estado.conteudo = [noticia(0, "2026-11-03T10:00:00Z")]; estado.pushes = [];
  estado.status = { "https://push.teste/fora": 503 };
  await inscreve(env, "https://push.teste/fora", ["noticias"]);
  await inscreve(env, "https://push.teste/antigo", ["noticias"]); // nunca buscou com endpoint (service worker antigo)
  await inscreve(env, "https://push.teste/novo", ["noticias"]);
  env.DB.raw.prepare("UPDATE push_subs SET visto='2026-11-04T09:00:00Z' WHERE endpoint='https://push.teste/novo'").run();
  await agendado(env);
  passa(1);
  estado.conteudo.push(noticia(1, "2026-11-04T13:00:00Z"));
  await agendado(env);
  assert.equal(estado.pushes.length, 3);
  passa(6); estado.pushes = []; estado.status = {};
  await agendado(env);
  assert.deepEqual(estado.pushes.map((p) => p.endpoint).sort(), ["https://push.teste/fora", "https://push.teste/novo"]);
  // depois de buscar, para de repetir
  await chama(env, "/v1/push/ultimos?ep=" + encodeURIComponent("https://push.teste/fora"));
  await chama(env, "/v1/push/ultimos?ep=" + encodeURIComponent("https://push.teste/novo"));
  passa(6); estado.pushes = []; await agendado(env);
  assert.equal(estado.pushes.length, 0);
});

test("no máximo 3 tentativas por alerta", async () => {
  const env = await ambiente();
  estado.conteudo = [noticia(0, "2026-11-03T10:00:00Z")]; estado.pushes = []; estado.status = { "https://push.teste/x": 500 };
  await inscreve(env, "https://push.teste/x", ["noticias"]);
  await agendado(env); passa(1);
  estado.conteudo.push(noticia(1, "2026-11-04T14:00:00Z"));
  for (let i = 0; i < 8; i++) { await agendado(env); passa(6); }
  assert.equal(estado.pushes.length, 3);
});

test("inscrição morta (410) é apagada", async () => {
  const env = await ambiente();
  estado.conteudo = [noticia(0, "2026-11-03T10:00:00Z")]; estado.pushes = []; estado.status = { "https://push.teste/morta": 410 };
  await inscreve(env, "https://push.teste/morta", ["noticias"]);
  await agendado(env); passa(1);
  estado.conteudo.push(noticia(1, "2026-11-04T15:00:00Z"));
  await agendado(env);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) n FROM push_subs").get().n, 0);
});

test("/rodar tem trava de tempo e /saude mostra o estado", async () => {
  const env = await ambiente();
  estado.conteudo = []; estado.pushes = []; estado.status = {};
  await inscreve(env, "https://push.teste/a", ["noticias", "black"]);
  const a = await chama(env, "/v1/push/rodar", {});
  assert.equal(a.rodou, true);
  const b = await chama(env, "/v1/push/rodar", {});
  assert.equal(b.rodou, false);
  passa(1);
  const c = await chama(env, "/v1/push/rodar", {});
  assert.equal(c.rodou, true);
  assert.equal(c.saude.rodada_por, "plano-b");
  assert.deepEqual(c.saude.inscritos_por_tema, { black: 1, noticias: 1, resenhas: 0 });
});

test("troca de inscrição pelo navegador herda os temas", async () => {
  const env = await ambiente();
  await inscreve(env, "https://push.teste/velha", ["noticias", "resenhas"]);
  const r = await chama(env, "/v1/push/inscrever", { sub: { endpoint: "https://push.teste/nova", keys: {} }, antigo: "https://push.teste/velha", temas: [], juntar: true });
  assert.deepEqual(r.temas.sort(), ["noticias", "resenhas"]);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) n FROM push_subs").get().n, 1);
});
