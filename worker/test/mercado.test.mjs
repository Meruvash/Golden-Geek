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
const ambiente = () => ({ DB: d1(), ORIGEM: SITE, MODERACAO_TOKEN: SENHA, DEV: "1", MP_CLIENT_ID: "app-123", MP_CLIENT_SECRET: "segredo-app", MP_CHAVE: "chave-de-teste-bem-longa" });

// Mercado Pago simulado: OAuth, preferências e pagamentos
const mpSim = { tokens: [], prefs: [], pagamentos: {}, user: 777, expira: 15552000 };
globalThis.fetch = async (url, op = {}) => {
  const u = String(url), corpo = op.body ? JSON.parse(op.body) : null;
  if (u === "https://api.mercadopago.com/oauth/token") {
    mpSim.tokens.push(corpo);
    const n = mpSim.tokens.length;
    return new Response(JSON.stringify({ access_token: `APP_USR-token-${n}`, refresh_token: `TG-renova-${n}`, user_id: mpSim.user, expires_in: mpSim.expira }));
  }
  if (u === "https://api.mercadopago.com/checkout/preferences") {
    mpSim.prefs.push({ corpo, auth: op.headers.authorization });
    return new Response(JSON.stringify({ id: `pref-${mpSim.prefs.length}`, init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=pref-${mpSim.prefs.length}` }), { status: 201 });
  }
  const m = u.match(/^https:\/\/api\.mercadopago\.com\/v1\/payments\/(\d+)$/);
  if (m && mpSim.pagamentos[m[1]]) return new Response(JSON.stringify({ id: +m[1], ...mpSim.pagamentos[m[1]] }));
  return new Response(JSON.stringify({ message: "não encontrado" }), { status: 404 });
};
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
                 frete: "2500", vendedor: "Ana B.", whatsapp: "(19) 98765-4321", instagram: "@ana.jogos", email: "ana@exemplo.com", aceite: "1", ...campos };
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

// o vendedor conecta o Mercado Pago pelo link secreto: pede o endereço, "autoriza" e volta com code + state
async function conecta(env, a) {
  const { url } = await (await chama(env, "/v1/mercado/mp/conectar", { corpo: { id: a.id, t: a.token } })).json();
  const state = new URL(url).searchParams.get("state");
  const r = await chama(env, `/v1/mercado/mp/retorno?code=TG-codigo&state=${state}`, { origem: "" });
  return { url, r };
}
async function publica(env, campos, fotos) {
  const a = await anuncia(env, campos, fotos);
  await decide(env, a.id, "aprovado");
  await conecta(env, a);
  return a;
}
const compra = async (env, id, extra = {}, ipFixo) => {
  const r = await chama(env, "/v1/mercado/comprar", { corpo: { id, nome: "Joana Compradora", email: "joana@exemplo.com", whatsapp: "(21) 99888-7766", entrega: "envio", aceite: "1", ...extra }, ipFixo });
  return { status: r.status, ...(await r.json()) };
};
const avisa = (env, pedido, pagamento) => chama(env, `/v1/mercado/mp/aviso?pedido=${pedido}`, { corpo: { type: "payment", data: { id: String(pagamento) } }, origem: "" });

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
  assert.deepEqual(await lista(env), []);  // aprovado, mas sem Mercado Pago conectado ainda não está à venda
  await conecta(env, a);
  const l = await lista(env);
  assert.equal(l.length, 1);
  assert.equal(l[0].jogo, "Brass: Birmingham");
  assert.equal(l[0].preco, 45000);
  assert.equal(l[0].email, undefined);
  assert.equal(l[0].whatsapp, undefined);
  const det = (await (await chama(env, `/v1/mercado/anuncio?id=${a.id}`)).json()).anuncio;
  assert.equal(det.whatsapp, undefined);   // contato só depois de pagar
  assert.equal(det.instagram, undefined);
  assert.equal(det.email, undefined);
  assert.equal(det.compra, true);
  assert.equal(det.frete, 2500);
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
  assert.match((await anuncia(env, { frete: "" })).erro, /valor do envio/);
  assert.equal((await anuncia(env, { entrega: "retirada", frete: "" })).ok, true);
  assert.match((await anuncia(env, {}, Array.from({ length: 7 }, WEBP))).erro, /No máximo 6/);
  const grande = new Uint8Array(800 * 1024); grande.set([0xff, 0xd8, 0xff]);
  assert.match((await anuncia(env, {}, [new Blob([grande])])).erro, /grande demais/);
  // o robô que preenche o campo escondido recebe "ok" e nada é gravado
  assert.equal((await anuncia(env, { isca: "http://spam" })).ok, true);
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM mercado_anuncios").get().n, 1);  // só o de retirada
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
  const a = await publica(env);
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
  assert.equal(vend.whatsapp, undefined);
  assert.equal((await acao({ acao: "remover" })).estado, "removido");
  assert.equal(env.DB.raw.prepare("SELECT COUNT(*) AS n FROM mercado_fotos").get().n, 0);
  const resto = env.DB.raw.prepare("SELECT whatsapp, email, instagram FROM mercado_anuncios WHERE id = ?").get(a.id);
  assert.deepEqual({ ...resto }, { whatsapp: null, email: null, instagram: null });
  assert.equal((await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: a.token } })).status, 404);
  assert.equal((await decide(env, a.id, "aprovado")).status, 409);  // removido pelo vendedor não volta
});

test("três denúncias de aparelhos diferentes tiram o anúncio do ar; a mesma pessoa não conta duas vezes", async () => {
  const env = ambiente();
  const a = await publica(env);
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
  const a = await publica(env);
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

test("conexão do Mercado Pago: OAuth com PKCE, token guardado cifrado e volta para Meus anúncios", async () => {
  const env = ambiente();
  const a = await anuncia(env);
  await decide(env, a.id, "aprovado");
  mpSim.tokens = [];
  const { url, r } = await conecta(env, a);
  const q = new URL(url).searchParams;
  assert.equal(new URL(url).origin + new URL(url).pathname, "https://auth.mercadopago.com/authorization");
  assert.equal(q.get("client_id"), "app-123");
  assert.equal(q.get("code_challenge_method"), "S256");
  assert.equal(q.get("redirect_uri"), "https://api.eliteboardgamers.com.br/v1/mercado/mp/retorno");
  assert.equal(r.status, 302);
  assert.equal(r.headers.get("location"), `${SITE}/mercado/meu/?mp=ok&id=${a.id}`);
  const troca = mpSim.tokens[0];
  assert.equal(troca.grant_type, "authorization_code");
  assert.equal(troca.code, "TG-codigo");
  assert.ok(troca.code_verifier.length >= 43);
  const conta = env.DB.raw.prepare("SELECT token, renovacao FROM mercado_mp_contas").get();
  assert.ok(!conta.token.includes("APP_USR"), "token não pode ficar em claro no banco");
  // o mesmo state não serve duas vezes
  const de_novo = await chama(env, `/v1/mercado/mp/retorno?code=x&state=${q.get("state")}`, { origem: "" });
  assert.equal(de_novo.headers.get("location"), `${SITE}/mercado/meu/?mp=expirou`);
  const meu = await (await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: a.token } })).json();
  assert.equal(meu.anuncio.mp_conectado, true);
});

test("compra: preferência com 5% para a Elite, frete à parte, reserva e liberação do contato só depois do pagamento", async () => {
  const env = ambiente();
  const a = await publica(env);   // R$ 450 + R$ 25 de envio
  mpSim.prefs = [];
  const c = await compra(env, a.id, {}, "10.5.5.5");
  assert.equal(c.status, 200);
  assert.match(c.url, /^https:\/\/www\.mercadopago\.com\.br\//);
  const { corpo, auth } = mpSim.prefs[0];
  assert.match(auth, /^Bearer APP_USR-token-\d+$/);       // pagamento na conta do vendedor
  assert.equal(corpo.marketplace_fee, 22.5);              // 5% de R$ 450 (sem o frete)
  assert.deepEqual(corpo.items.map(i => i.unit_price), [450, 25]);
  assert.equal(corpo.external_reference, `eb-${c.pedido}`);
  assert.equal(corpo.notification_url, `https://api.eliteboardgamers.com.br/v1/mercado/mp/aviso?pedido=${c.pedido}`);
  assert.equal(corpo.back_urls.success, `${SITE}/mercado/pedido/?p=${c.pedido}&k=${c.chave}`);
  assert.deepEqual(corpo.payment_methods.excluded_payment_types, [{ id: "ticket" }]);
  // reservado: outra pessoa não consegue comprar ao mesmo tempo; a mesma pessoa pode tentar de novo
  assert.equal((await lista(env))[0].reservado, true);
  assert.equal((await compra(env, a.id, {}, "10.6.6.6")).status, 409);
  const c2 = await compra(env, a.id, { entrega: "retirada" }, "10.5.5.5");
  assert.equal(c2.status, 200);
  assert.deepEqual(mpSim.prefs[1].corpo.items.map(i => i.unit_price), [450]);   // retirada: sem frete
  // antes de pagar, o pedido não mostra o contato
  const verPed = async (extra = {}) => (await (await chama(env, "/v1/mercado/pedido", { corpo: { p: c2.pedido, k: c2.chave, ...extra } })).json()).pedido;
  assert.equal((await verPed()).anuncio.whatsapp, undefined);
  // aviso falso (pagamento de outro pedido) não muda nada
  mpSim.pagamentos["900"] = { status: "approved", external_reference: "eb-999", transaction_amount: 450 };
  await avisa(env, c2.pedido, 900);
  assert.equal((await verPed()).estado, "aguardando");
  // pagamento menor que o pedido não libera
  mpSim.pagamentos["901"] = { status: "approved", external_reference: `eb-${c2.pedido}`, transaction_amount: 10 };
  await avisa(env, c2.pedido, 901);
  assert.equal((await verPed()).estado, "processando");
  // Pix aprovado de verdade: conferido na API do Mercado Pago
  mpSim.pagamentos["902"] = { status: "approved", external_reference: `eb-${c2.pedido}`, transaction_amount: 450 };
  assert.equal((await avisa(env, c2.pedido, 902)).status, 200);
  const pago = await verPed();
  assert.equal(pago.estado, "pago");
  assert.equal(pago.anuncio.whatsapp, "5519987654321");
  assert.equal(pago.anuncio.instagram, "ana.jogos");
  assert.deepEqual(await lista(env), []);                      // vendido: sai da vitrine
  const det = (await (await chama(env, `/v1/mercado/anuncio?id=${a.id}`)).json()).anuncio;
  assert.equal(det.estado, "vendido");
  assert.equal(det.compra, false);
  // o vendedor vê a venda com o contato do comprador
  const meu = await (await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: a.token } })).json();
  assert.equal(meu.vendas[0].whatsapp, "5521998887766");
  assert.equal(meu.vendas[0].taxa, 2250);
  // remover depois de vender não apaga o contato que o comprador precisa
  await chama(env, "/v1/mercado/meu/acao", { corpo: { id: a.id, t: a.token, acao: "remover" } });
  assert.equal((await verPed()).anuncio.whatsapp, "5519987654321");
  // a moderação enxerga os pedidos
  const peds = await (await chama(env, "/v1/moderacao/mercado/pedidos", { senha: SENHA })).json();
  assert.equal(peds.pedidos.find(x => x.id === c2.pedido).estado, "pago");
  assert.equal(peds.pedidos[0].chave_hash, undefined);
});

test("na volta do Mercado Pago o pedido confere o pagamento na hora, sem esperar o aviso", async () => {
  const env = ambiente();
  const a = await publica(env);
  const c = await compra(env, a.id);
  mpSim.pagamentos["5550001"] = { status: "pending", external_reference: `eb-${c.pedido}`, transaction_amount: 475 };
  const ver = async () => (await (await chama(env, "/v1/mercado/pedido", { corpo: { p: c.pedido, k: c.chave, pagamento: "5550001" } })).json()).pedido;
  assert.equal((await ver()).estado, "processando");
  mpSim.pagamentos["5550001"].status = "approved";
  assert.equal((await ver()).estado, "pago");
  // chave errada não abre
  assert.equal((await chama(env, "/v1/mercado/pedido", { corpo: { p: c.pedido, k: "x".repeat(32) } })).status, 404);
});

test("pagamento recusado devolve o jogo à venda; sem pagamento ligado não há compra", async () => {
  const env = ambiente();
  const a = await publica(env);
  const c = await compra(env, a.id, {}, "10.7.7.7");
  mpSim.pagamentos["700"] = { status: "rejected", external_reference: `eb-${c.pedido}`, transaction_amount: 475 };
  await avisa(env, c.pedido, 700);
  assert.equal((await lista(env))[0].reservado, false);
  assert.equal((await compra(env, a.id, {}, "10.8.8.8")).status, 200);
  const sem = { ...env, MP_CHAVE: "" };
  assert.equal((await compra(sem, a.id)).status, 503);
  assert.equal((await (await chama(sem, `/v1/mercado/anuncio?id=${a.id}`)).json()).anuncio.compra, false);
});

test("token do vendedor perto de vencer é renovado antes de criar o pagamento", async () => {
  const env = ambiente();
  const a = await publica(env);
  env.DB.raw.prepare("UPDATE mercado_mp_contas SET expira = ?").run(new Date(Date.now() + 86400e3).toISOString());
  mpSim.tokens = []; mpSim.prefs = [];
  assert.equal((await compra(env, a.id)).status, 200);
  assert.equal(mpSim.tokens[0].grant_type, "refresh_token");
  assert.match(mpSim.tokens[0].refresh_token, /^TG-renova-\d+$/);
  assert.equal(mpSim.prefs[0].auth, "Bearer APP_USR-token-1");
});
