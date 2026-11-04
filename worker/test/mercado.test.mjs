// Testes do Mercado da Elite (worker/src/mercado.js) com um D1 de mentira em SQLite, usando o schema.sql de verdade.
// Rodar: node --test worker/test/   (Node 22+; não precisa de Cloudflare nem de internet)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import worker from "../src/index.js";
import { normalizaWhatsapp, normalizaInstagram } from "../src/mercado.js";

const ESQUEMA = readFileSync(new URL("../schema.sql", import.meta.url), "utf-8");

function d1() {
  const db = new DatabaseSync(":memory:");
  db.exec(ESQUEMA);
  const conv = (a) => a.map((x) => (x instanceof ArrayBuffer ? new Uint8Array(x) : x));
  const stmt = (sql, args = []) => ({
    sql, args,
    bind: (...a) => stmt(sql, conv(a)),
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

const SITE = "https://eliteboardgamers.com.br";
const SENHA = "senha-de-moderacao-bem-comprida-123";
const ambiente = () => ({ DB: d1(), ORIGEM: SITE, MODERACAO_TOKEN: SENHA, DEV: "1" });
const ctx = { waitUntil() {} };
let ip = 1;

async function chama(env, caminho, { corpo, form, metodo, senha, origem = SITE, ipFixo } = {}) {
  const headers = { origin: origem, "cf-connecting-ip": ipFixo || `10.0.0.${ip++}` };
  if (senha) headers.authorization = "Bearer " + senha;
  let body;
  if (form) body = form;
  else if (corpo) { body = JSON.stringify(corpo); headers["content-type"] = "application/json"; }
  const req = new Request("https://api.eliteboardgamers.com.br" + caminho, { method: metodo || (body ? "POST" : "GET"), headers, body });
  return worker.fetch(req, env, ctx);
}

const WEBP = () => new Blob([new Uint8Array([0x52, 0x49, 0x46, 0x46, 1, 0, 0, 0, 0x57, 0x45, 0x42, 0x50, 9, 9, 9, 9])], { type: "image/webp" });
const JPEG = () => new Blob([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4])], { type: "image/jpeg" });

function formulario(campos = {}, fotos = [WEBP(), JPEG()]) {
  const f = new FormData();
  const base = { jogo: "Brass: Birmingham", jogo_slug: "brass-birmingham", edicao: "Ludofy, com sleeves", condicao: "usado-otimo", idioma: "pt",
                 preco: "45000", troca: "1", entrega: "ambos", cidade: "Campinas", uf: "SP", descricao: "Jogado 3 vezes.\nTudo completo.",
                 vendedor: "Ana B.", whatsapp: "(19) 98765-4321", instagram: "@ana.jogos", email: "ana@exemplo.com", aceite: "1", ...campos };
  for (const [k, v] of Object.entries(base)) if (v !== undefined) f.append(k, v);
  fotos.forEach((b, i) => f.append("foto", b, `f${i}.bin`));
  return f;
}

async function anuncia(env, campos, fotos) {
  const r = await chama(env, "/v1/mercado/anunciar", { form: formulario(campos, fotos) });
  return { status: r.status, ...(await r.json()) };
}
const decide = (env, id, estado) => chama(env, "/v1/moderacao/mercado/decidir", { corpo: { id, estado, por: "editor" }, senha: SENHA });
const lista = async (env) => (await (await chama(env, "/v1/mercado/lista")).json()).anuncios;

test("contato: WhatsApp e Instagram são normalizados", () => {
  assert.equal(normalizaWhatsapp("(11) 98765-4321"), "5511987654321");
  assert.equal(normalizaWhatsapp("+55 11 98765-4321"), "5511987654321");
  assert.equal(normalizaWhatsapp("1234"), null);
  assert.equal(normalizaWhatsapp(""), "");
  assert.equal(normalizaInstagram("https://www.instagram.com/Ana.Jogos/?hl=pt"), "ana.jogos");
  assert.equal(normalizaInstagram("@ana jogos"), null);
});

test("anúncio entra pendente, só aparece depois de aprovado e não expõe e-mail nem contato na lista", async () => {
  const env = ambiente();
  const a = await anuncia(env);
  assert.equal(a.status, 200);
  assert.equal(a.estado, "pendente");
  assert.ok(a.token.length >= 30);
  assert.deepEqual(await lista(env), []);
  // anúncio pendente não abre no site
  assert.equal((await chama(env, `/v1/mercado/anuncio?id=${a.id}`)).status, 404);
  // a moderação vê tudo, inclusive o e-mail e as fotos
  const fila = await (await chama(env, "/v1/moderacao/mercado/fila", { senha: SENHA })).json();
  assert.equal(fila.anuncios.length, 1);
  assert.equal(fila.anuncios[0].email, "ana@exemplo.com");
  assert.equal(fila.anuncios[0].fotos.length, 2);
  assert.equal((await chama(env, "/v1/moderacao/mercado/fila", { senha: "errada-mas-comprida-1234567" })).status, 401);

  assert.equal((await decide(env, a.id, "aprovado")).status, 200);
  const l = await lista(env);
  assert.equal(l.length, 1);
  assert.equal(l[0].jogo, "Brass: Birmingham");
  assert.equal(l[0].preco, 45000);
  assert.equal(l[0].email, undefined);
  assert.equal(l[0].whatsapp, undefined);
  const det = (await (await chama(env, `/v1/mercado/anuncio?id=${a.id}`)).json()).anuncio;
  assert.equal(det.whatsapp, "5519987654321");
  assert.equal(det.instagram, "ana.jogos");
  assert.equal(det.email, undefined);
  assert.equal(det.descricao, "Jogado 3 vezes.\nTudo completo.");
  // as fotos saem com o tipo certo
  const ft = await chama(env, `/v1/mercado/foto/${det.fotos[1]}`);
  assert.equal(ft.status, 200);
  assert.equal(ft.headers.get("content-type"), "image/jpeg");
  assert.equal(new Uint8Array(await ft.arrayBuffer())[0], 0xff);
});

test("validação: sem foto, foto que não é imagem, sem contato, sem aceite, preço fora da faixa", async () => {
  const env = ambiente();
  assert.match((await anuncia(env, {}, [])).erro, /pelo menos uma foto/);
  assert.match((await anuncia(env, {}, [new Blob(["<svg/>"], { type: "image/webp" })])).erro, /JPG ou WEBP/);
  assert.match((await anuncia(env, { whatsapp: "", instagram: "" })).erro, /pelo menos um contato/);
  assert.match((await anuncia(env, { aceite: undefined })).erro, /aceite as regras/);
  assert.match((await anuncia(env, { preco: "50" })).erro, /preço/);
  assert.match((await anuncia(env, { uf: "XX" })).erro, /UF/);
  assert.match((await anuncia(env, {}, Array.from({ length: 7 }, WEBP))).erro, /No máximo 6/);
  const grande = new Uint8Array(800 * 1024); grande.set([0xff, 0xd8, 0xff]);
  assert.match((await anuncia(env, {}, [new Blob([grande])])).erro, /grande demais/);
  // o robô que preenche o campo escondido recebe "ok" e nada é gravado
  assert.equal((await anuncia(env, { isca: "http://spam" })).ok, true);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM mercado_anuncios").get().n, 0);
});

test("pedido de outro site é recusado", async () => {
  const env = ambiente();
  const r = await chama(env, "/v1/mercado/anunciar", { form: formulario(), origem: "https://golpe.example" });
  assert.equal(r.status, 403);
});

test("limite de anúncios por aparelho na mesma hora", async () => {
  const env = ambiente();
  const vezes = [];
  for (let i = 0; i < 4; i++) vezes.push((await chama(env, "/v1/mercado/anunciar", { form: formulario(), ipFixo: "10.9.9.9" })).status);
  assert.deepEqual(vezes, [200, 200, 200, 429]);
});

test("vendedor gerencia pelo link secreto: preço, renovar, vendido e remover", async () => {
  const env = ambiente();
  const a = await anuncia(env);
  await decide(env, a.id, "aprovado");
  const acao = async (corpo) => { const r = await chama(env, "/v1/mercado/meu/acao", { corpo: { id: a.id, t: a.token, ...corpo } }); return { status: r.status, ...(await r.json()) }; };
  // link errado não abre nada
  assert.equal((await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: "x".repeat(32) } })).status, 404);
  const meu = await (await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: a.token } })).json();
  assert.equal(meu.anuncio.estado, "aprovado");
  assert.equal(meu.anuncio.email, "ana@exemplo.com");
  assert.equal((await acao({ acao: "preco", preco: 39900 })).preco, 39900);
  assert.equal((await lista(env))[0].preco, 39900);
  assert.equal((await acao({ acao: "renovar" })).ok, true);
  assert.equal((await acao({ acao: "vendido" })).estado, "vendido");
  assert.deepEqual(await lista(env), []);
  const vend = (await (await chama(env, `/v1/mercado/anuncio?id=${a.id}`)).json()).anuncio;
  assert.equal(vend.estado, "vendido");
  assert.equal(vend.whatsapp, null);  // vendido: o contato some
  assert.equal((await acao({ acao: "remover" })).estado, "removido");
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM mercado_fotos").get().n, 0);
  const resto = env.DB.raw.prepare("SELECT whatsapp, email, instagram FROM mercado_anuncios WHERE id = ?").get(a.id);
  assert.deepEqual({ ...resto }, { whatsapp: null, email: null, instagram: null });
  assert.equal((await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: a.token } })).status, 404);
  assert.equal((await decide(env, a.id, "aprovado")).status, 409);  // removido pelo vendedor não volta
});

test("três denúncias de aparelhos diferentes tiram o anúncio do ar; a mesma pessoa não conta duas vezes", async () => {
  const env = ambiente();
  const a = await anuncia(env);
  await decide(env, a.id, "aprovado");
  const den = (ipFixo) => chama(env, "/v1/mercado/denunciar", { corpo: { id: a.id, motivo: "golpe" }, ipFixo });
  await den("10.1.1.1"); await den("10.1.1.1"); await den("10.1.1.2");
  assert.equal((await lista(env)).length, 1);
  await den("10.1.1.3");
  assert.deepEqual(await lista(env), []);
  const fila = await (await chama(env, "/v1/moderacao/mercado/fila", { senha: SENHA })).json();
  assert.equal(fila.anuncios[0].estado, "duvidoso");
  assert.equal(fila.anuncios[0].denuncias, 3);
  // o editor reaprova: volta para a lista e as denúncias são zeradas
  await decide(env, a.id, "aprovado");
  assert.equal((await lista(env)).length, 1);
});

test("anúncio vencido sai da lista e não abre", async () => {
  const env = ambiente();
  const a = await anuncia(env);
  await decide(env, a.id, "aprovado");
  env.DB.raw.prepare("UPDATE mercado_anuncios SET expira = datetime('now', '-1 minute') WHERE id = ?").run(a.id);
  assert.deepEqual(await lista(env), []);
  assert.equal((await chama(env, `/v1/mercado/anuncio?id=${a.id}`)).status, 404);
});

test("comentários continuam funcionando ao lado do Mercado", async () => {
  const env = ambiente();
  const r = await chama(env, "/v1/comentar", { corpo: { p: "/root/", nome: "Bia", texto: "Ótima resenha!" } });
  assert.equal((await r.json()).estado, "pendente");
  const painel = await chama(env, "/painel");
  assert.match(await painel.text(), /Mercado esperando/);
});
