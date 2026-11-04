// Testes do Mercado da Elite (worker/src/mercado.js) com um D1 de mentira em SQLite, usando o schema.sql de verdade.
// Rodar: node --test worker/test/   (Node 22+; não precisa de Cloudflare nem de internet)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import worker from "../src/index.js";
import { normalizaWhatsapp, normalizaInstagram, cpfValido, rotinaMercado } from "../src/mercado.js";

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
const ME = "https://sandbox.melhorenvio.com.br";
const ambiente = () => ({ DB: d1(), ORIGEM: SITE, MODERACAO_TOKEN: SENHA, DEV: "1", MP_CLIENT_ID: "app-123", MP_CLIENT_SECRET: "segredo-app", MP_CHAVE: "chave-de-teste-bem-longa",
  ME_CLIENT_ID: "me-app", ME_CLIENT_SECRET: "me-segredo", ME_CONTATO: "tecnico@exemplo.com", ME_BASE: ME });
const CPF_A = "529.982.247-25", CPF_B = "111.444.777-35";
const ENDERECO = { nome: "Joana Compradora", cpf: CPF_A, cep: "22041-001", rua: "Rua Barata Ribeiro", numero: "200", complemento: "ap 101", bairro: "Copacabana", cidade: "Rio de Janeiro", uf: "RJ" };
const REMETENTE = { nome: "Ana Beatriz Souza", cpf: CPF_B, cep: "13010-000", rua: "Rua Barão de Jaguara", numero: "50", bairro: "Centro", cidade: "Campinas", uf: "SP" };

// Mercado Pago e Melhor Envio simulados
const mpSim = { tokens: [], prefs: [], pagamentos: {}, reembolsos: [], user: 777, expira: 15552000 };
const meSim = { tokens: [], carrinho: [], compras: [], semSaldo: false, rastreio: {}, agentes: new Set() };
globalThis.fetch = async (url, op = {}) => {
  const u = String(url), corpo = op.body ? JSON.parse(op.body) : null;
  if (u.startsWith(ME)) {
    meSim.agentes.add(op.headers["user-agent"]);
    const c = u.slice(ME.length);
    if (c === "/oauth/token") { meSim.tokens.push(corpo); return new Response(JSON.stringify({ access_token: `ME-token-${meSim.tokens.length}`, refresh_token: `ME-renova-${meSim.tokens.length}`, expires_in: 2592000 })); }
    if (c === "/api/v2/me/shipment/calculate") {
      meSim.ultimaCotacao = corpo;
      return new Response(JSON.stringify([
        { id: 2, name: "SEDEX", price: "55.00", custom_price: "52.10", delivery_time: 2, custom_delivery_time: 2, company: { name: "Correios" } },
        { id: 1, name: "PAC", price: "30.50", custom_price: "28.90", delivery_time: 6, custom_delivery_time: 7, company: { name: "Correios" } },
        { id: 3, name: ".Package", error: "Serviço indisponível para o trecho" }]));
    }
    if (c === "/api/v2/me/cart") { meSim.carrinho.push(corpo); return new Response(JSON.stringify({ id: `9a1b2c3d-0000-4000-8000-00000000000${meSim.carrinho.length}`, protocol: `ORD-${meSim.carrinho.length}`, price: 28.9 }), { status: 201 }); }
    if (c === "/api/v2/me/shipment/checkout") { if (meSim.semSaldo) return new Response(JSON.stringify({ message: "Saldo insuficiente" }), { status: 422 }); meSim.compras.push(corpo); return new Response(JSON.stringify({ purchase: { status: "paid" } })); }
    if (c === "/api/v2/me/shipment/generate") return new Response(JSON.stringify(Object.fromEntries(corpo.orders.map(o => [o, { status: true, message: "ok" }]))));
    if (c === "/api/v2/me/shipment/print") return new Response(JSON.stringify({ url: `${ME}/imprimir/publico-${corpo.orders[0].slice(-1)}` }));
    if (c === "/api/v2/me/shipment/tracking") return new Response(JSON.stringify(Object.fromEntries(corpo.orders.filter(o => meSim.rastreio[o]).map(o => [o, meSim.rastreio[o]]))));
    return new Response("{}", { status: 404 });
  }
  const rf = u.match(/^https:\/\/api\.mercadopago\.com\/v1\/payments\/(\d+)\/refunds$/);
  if (rf) { mpSim.reembolsos.push({ id: rf[1], chave: op.headers["x-idempotency-key"] }); return new Response(JSON.stringify({ id: 1, status: "approved" }), { status: 201 }); }
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
                 cep_origem: "13010-000", pacote: "m", vendedor: "Ana B.", whatsapp: "(19) 98765-4321", instagram: "@ana.jogos", email: "ana@exemplo.com", aceite: "1", ...campos };
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
// a Elite conecta a conta do Melhor Envio pelo painel
async function conectaEnvio(env) {
  const { url } = await (await chama(env, "/v1/moderacao/mercado/envio/conectar", { corpo: {}, senha: SENHA })).json();
  const state = new URL(url).searchParams.get("state");
  return chama(env, `/v1/envio/retorno?code=ME-codigo&state=${state}`, { origem: "" });
}
const compra = async (env, id, extra = {}, ipFixo) => {
  const r = await chama(env, "/v1/mercado/comprar", { corpo: { id, nome: "Joana Compradora", email: "joana@exemplo.com", whatsapp: "(21) 99888-7766", entrega: "envio",
    cep: ENDERECO.cep, servico: 1, endereco: ENDERECO, aceite: "1", ...extra }, ipFixo });
  return { status: r.status, ...(await r.json()) };
};
const paga = async (env, c, id, valor) => { mpSim.pagamentos[id] = { status: "approved", external_reference: `eb-${c.pedido}`, transaction_amount: valor }; return avisa(env, c.pedido, id); };
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
  assert.equal(det.pacote, "m");
  assert.equal(det.cep_origem, undefined);  // o CEP de origem não é publicado
  assert.equal(det.envio_site, false);       // Melhor Envio ainda não conectado
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
  assert.match((await anuncia(env, { cep_origem: "123" })).erro, /CEP de onde o jogo vai sair/);
  assert.match((await anuncia(env, { pacote: "xl" })).erro, /tamanho da caixa/);
  assert.equal((await anuncia(env, { entrega: "retirada", cep_origem: "", pacote: "" })).ok, true);
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

test("compra: frete cotado no Melhor Envio, 5% + frete para a Elite, reserva e liberação do contato só depois do pagamento", async () => {
  const env = ambiente();
  await conectaEnvio(env);
  const a = await publica(env);   // R$ 450, PAC de R$ 28,90
  mpSim.prefs = [];
  const c = await compra(env, a.id, {}, "10.5.5.5");
  assert.equal(c.status, 200);
  assert.match(c.url, /^https:\/\/www\.mercadopago\.com\.br\//);
  const { corpo, auth } = mpSim.prefs[0];
  assert.match(auth, /^Bearer APP_USR-token-\d+$/);       // pagamento na conta do vendedor
  assert.equal(corpo.marketplace_fee, 51.4);              // 5% de R$ 450 + R$ 28,90 da etiqueta (a Elite compra)
  assert.deepEqual(corpo.items.map(i => i.unit_price), [450, 28.9]);
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
  mpSim.pagamentos["902"] = { status: "approved", external_reference: `eb-${c2.pedido}`, transaction_amount: 450 };  // retirada: só o jogo
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
  const c = await compra(env, a.id, { entrega: "retirada" });
  mpSim.pagamentos["5550001"] = { status: "pending", external_reference: `eb-${c.pedido}`, transaction_amount: 450 };
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
  const c = await compra(env, a.id, { entrega: "retirada" }, "10.7.7.7");
  mpSim.pagamentos["700"] = { status: "rejected", external_reference: `eb-${c.pedido}`, transaction_amount: 450 };
  await avisa(env, c.pedido, 700);
  assert.equal((await lista(env))[0].reservado, false);
  assert.equal((await compra(env, a.id, { entrega: "retirada" }, "10.8.8.8")).status, 200);
  // sem o Melhor Envio conectado, envio pelo site não é aceito
  assert.equal((await compra(env, a.id, {}, "10.8.8.9")).status, 503);
  const sem = { ...env, MP_CHAVE: "" };
  assert.equal((await compra(sem, a.id)).status, 503);
  assert.equal((await (await chama(sem, `/v1/mercado/anuncio?id=${a.id}`)).json()).anuncio.compra, false);
});

test("token do vendedor perto de vencer é renovado antes de criar o pagamento", async () => {
  const env = ambiente();
  const a = await publica(env);
  env.DB.raw.prepare("UPDATE mercado_mp_contas SET expira = ?").run(new Date(Date.now() + 86400e3).toISOString());
  mpSim.tokens = []; mpSim.prefs = [];
  assert.equal((await compra(env, a.id, { entrega: "retirada" })).status, 200);
  assert.equal(mpSim.tokens[0].grant_type, "refresh_token");
  assert.match(mpSim.tokens[0].refresh_token, /^TG-renova-\d+$/);
  assert.equal(mpSim.prefs[0].auth, "Bearer APP_USR-token-1");
});

test("CPF: dígitos verificadores", () => {
  assert.equal(cpfValido(CPF_A), "52998224725");
  assert.equal(cpfValido("529.982.247-24"), null);
  assert.equal(cpfValido("111.111.111-11"), null);
});

test("frete: cotação com o pacote do anúncio, só opções válidas, da mais barata; frete grátis vira R$ 0 só na mais barata", async () => {
  const env = ambiente();
  const a = await publica(env);
  const cota = async (id, cep = "22041001") => { const r = await chama(env, "/v1/mercado/frete", { corpo: { id, cep } }); return { status: r.status, ...(await r.json()) }; };
  assert.equal((await cota(a.id)).status, 503);   // a Elite ainda não conectou o Melhor Envio
  assert.equal((await conectaEnvio(env)).headers.get("location"), "https://api.eliteboardgamers.com.br/painel?envio=ok");
  assert.ok(!env.DB.raw.prepare("SELECT token FROM mercado_envio_conta").get().token.includes("ME-token"), "token do Melhor Envio cifrado");
  const c = await cota(a.id);
  assert.deepEqual(c.opcoes.map(o => [o.nome, o.preco, o.prazo]), [["PAC", 2890, 7], ["SEDEX", 5210, 2]]);
  assert.deepEqual(meSim.ultimaCotacao.products[0], { id: "jogo", width: 30, height: 8, length: 30, weight: 1.5, insurance_value: 450, quantity: 1 });
  assert.equal(meSim.ultimaCotacao.from.postal_code, "13010000");
  assert.ok([...meSim.agentes].every(ag => ag.includes("tecnico@exemplo.com")), "o Melhor Envio exige o contato técnico no User-Agent");
  assert.equal((await cota(a.id, "123")).status, 400);
  const g = await publica(env, { frete_gratis: "1", jogo: "Azul" });
  const cg = await cota(g.id);
  assert.equal(cg.gratis, true);
  assert.deepEqual(cg.opcoes.map(o => [o.nome, o.preco]), [["PAC", 0]]);
  // frete grátis: o comprador paga só o jogo e a Elite recebe a taxa + a etiqueta, que saem da parte do vendedor
  mpSim.prefs = [];
  const cc = await compra(env, g.id);
  assert.equal(cc.status, 200);
  assert.deepEqual(mpSim.prefs[0].corpo.items.map(i => i.unit_price), [450]);
  assert.equal(mpSim.prefs[0].corpo.marketplace_fee, 51.4);
});

test("compra com envio: endereço e CPF validados e guardados cifrados", async () => {
  const env = ambiente();
  await conectaEnvio(env);
  const a = await publica(env);
  assert.match((await compra(env, a.id, { endereco: { ...ENDERECO, cpf: "123" } })).erro, /CPF/);
  assert.match((await compra(env, a.id, { endereco: { ...ENDERECO, numero: "" } })).erro, /endereço completo/);
  assert.match((await compra(env, a.id, { servico: 99 })).erro, /não está mais disponível/);
  const c = await compra(env, a.id, { servico: 2 });
  assert.equal(c.status, 200);
  const p = env.DB.raw.prepare("SELECT destino, frete, servico_nome FROM mercado_pedidos WHERE id = ?").get(c.pedido);
  assert.equal(p.frete, 5210);
  assert.equal(p.servico_nome, "Correios SEDEX");
  assert.ok(!p.destino.includes("Copacabana") && !p.destino.includes("52998224725"), "endereço e CPF cifrados");
});

test("etapas do envio: etiqueta, postagem, entrega, confirmação e avaliação (como no pagamento seguro)", async () => {
  const env = ambiente();
  await conectaEnvio(env);
  const a = await publica(env);
  const c = await compra(env, a.id);
  await paga(env, c, "8800001", 478.9);
  const ver = async () => (await (await chama(env, "/v1/mercado/pedido", { corpo: { p: c.pedido, k: c.chave } })).json()).pedido;
  const p1 = await ver();
  assert.equal(p1.estado, "pago");
  assert.ok(Date.parse(p1.prazo_envio.replace(" ", "T") + "Z") > Date.now() + 9 * 86400e3, "prazo de envio de 10 dias");
  // o comprador não confirma antes de postar
  const acaoC = async (corpo) => { const r = await chama(env, "/v1/mercado/pedido/acao", { corpo: { p: c.pedido, k: c.chave, ...corpo } }); return { status: r.status, ...(await r.json()) }; };
  assert.equal((await acaoC({ acao: "recebi" })).status, 409);
  // o vendedor gera a etiqueta pelo link secreto
  const gera = async (rem = REMETENTE) => { const r = await chama(env, "/v1/mercado/meu/etiqueta", { corpo: { id: a.id, t: a.token, pedido: c.pedido, remetente: rem } }); return { status: r.status, ...(await r.json()) }; };
  assert.match((await gera({ ...REMETENTE, cpf: "000" })).erro, /CPF/);
  meSim.semSaldo = true;
  assert.match((await gera()).erro, /sem saldo/);
  meSim.semSaldo = false;
  meSim.carrinho = [];
  const e = await gera();
  assert.equal(e.status, 200);
  assert.match(e.url, /\/imprimir\/publico-/);
  const cart = meSim.carrinho.at(-1);
  assert.equal(cart.service, 1);
  assert.equal(cart.from.document, "11144477735");
  assert.equal(cart.to.document, "52998224725");
  assert.equal(cart.to.address, "Rua Barata Ribeiro");
  assert.equal(cart.to.postal_code, "22041001");
  assert.deepEqual(cart.volumes, [{ height: 8, width: 30, length: 30, weight: 1.5 }]);
  assert.equal(cart.options.insurance_value, 450);
  assert.equal(cart.options.non_commercial, true);
  assert.deepEqual(cart.options.tags, [{ tag: `eb-${c.pedido}`, url: `${SITE}/mercado/` }]);
  assert.equal((await gera()).url, e.url);   // segunda vez devolve a mesma etiqueta, sem comprar outra
  assert.equal(meSim.compras.length, 1);
  // o vendedor vê a etiqueta na venda
  const v = (await (await chama(env, "/v1/mercado/meu", { corpo: { id: a.id, t: a.token } })).json()).vendas[0];
  assert.equal(v.envio_estado, "gerada");
  assert.equal(v.etiqueta_url, e.url);
  // aviso de postagem do Melhor Envio (assinado)
  const etq = env.DB.raw.prepare("SELECT etiqueta FROM mercado_pedidos WHERE id = ?").get(c.pedido).etiqueta;
  const assina = async (corpo, segredo = "me-segredo") => {
    const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(segredo), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return btoa(String.fromCharCode(...new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(corpo)))));
  };
  const avisoME = async (evento, extra = {}, segredo) => {
    const corpo = JSON.stringify({ event: evento, data: { id: etq, status: evento.split(".")[1], tracking: "AA123456789BR", tags: [{ tag: `eb-${c.pedido}`, url: null }], ...extra } });
    return worker.fetch(new Request("https://api.eliteboardgamers.com.br/v1/envio/aviso", { method: "POST", body: corpo, headers: { "x-me-signature": await assina(corpo, segredo) } }), env, ctx);
  };
  assert.equal((await avisoME("order.posted", {}, "segredo-errado")).status, 401);
  assert.equal((await ver()).estado, "pago");
  assert.equal((await avisoME("order.posted", { posted_at: "2026-11-05 10:00:00" })).status, 200);
  const p2 = await ver();
  assert.equal(p2.estado, "enviado");
  assert.equal(p2.rastreio, "AA123456789BR");
  assert.equal(p2.rastreio_url, "https://melhorrastreio.com.br/rastreio/AA123456789BR");
  // entrega chega pelo rastreio periódico (aviso perdido)
  env.DB.raw.prepare("UPDATE mercado_pedidos SET rastreado_em = datetime('now', '-3 hours') WHERE id = ?").run(c.pedido);
  meSim.rastreio[etq] = { status: "delivered", tracking: "AA123456789BR", delivered_at: "2026-11-08 15:00:00" };
  assert.equal((await rotinaMercado(env)).rastreados, 1);
  assert.equal((await ver()).estado, "entregue");
  // avaliar só depois de concluir
  assert.equal((await acaoC({ acao: "avaliar", nota: 5 })).status, 409);
  assert.equal((await acaoC({ acao: "recebi" })).estado, "concluido");
  assert.match((await acaoC({ acao: "avaliar", nota: 9 })).erro, /1 a 5/);
  assert.equal((await acaoC({ acao: "avaliar", nota: 5, comentario: "Jogo impecável, bem embalado." })).ok, true);
  assert.equal((await acaoC({ acao: "avaliar", nota: 1 })).status, 409);   // uma avaliação por pedido
  assert.deepEqual((await ver()).avaliacao, { nota: 5, comentario: "Jogo impecável, bem embalado." });
  // a reputação aparece nos outros anúncios do mesmo vendedor (mesma conta do Mercado Pago)
  const outro = await publica(env, { jogo: "Cascadia" });
  const l = (await lista(env)).find(x => x.id === outro.id);
  assert.deepEqual([l.nota, l.avaliacoes, l.vendas], [5, 1, 1]);
  const det = (await (await chama(env, `/v1/mercado/anuncio?id=${outro.id}`)).json()).anuncio;
  assert.equal(det.ultimas_avaliacoes[0].comentario, "Jogo impecável, bem embalado.");
});

test("prazos: sem postagem em 10 dias o pagamento é devolvido e o jogo volta à venda; entregue conclui em 7 dias", async () => {
  const env = ambiente();
  await conectaEnvio(env);
  const a = await publica(env);
  const c = await compra(env, a.id, {}, "10.20.0.1");
  await paga(env, c, "8800002", 478.9);
  env.DB.raw.prepare("UPDATE mercado_pedidos SET prazo_envio = datetime('now', '-1 minute') WHERE id = ?").run(c.pedido);
  mpSim.reembolsos = [];
  assert.equal((await rotinaMercado(env)).devolvidos, 1);
  assert.deepEqual(mpSim.reembolsos, [{ id: "8800002", chave: `eb-prazo-${c.pedido}` }]);
  assert.equal(env.DB.raw.prepare("SELECT estado FROM mercado_pedidos WHERE id = ?").get(c.pedido).estado, "devolvido");
  assert.equal((await lista(env)).length, 1);   // de volta à venda
  // outro pedido entregue há 8 dias conclui sozinho
  const c2 = await compra(env, a.id, {}, "10.20.0.2");
  await paga(env, c2, "8800003", 478.9);
  env.DB.raw.prepare("UPDATE mercado_pedidos SET estado = 'entregue', entregue_em = datetime('now', '-8 days') WHERE id = ?").run(c2.pedido);
  assert.equal((await rotinaMercado(env)).concluidos, 1);
});

test("problema: o comprador reclama e o editor devolve o pagamento pelo painel", async () => {
  const env = ambiente();
  await conectaEnvio(env);
  const a = await publica(env);
  const c = await compra(env, a.id, { entrega: "retirada" });
  await paga(env, c, "8800004", 450);
  const acaoC = async (corpo) => { const r = await chama(env, "/v1/mercado/pedido/acao", { corpo: { p: c.pedido, k: c.chave, ...corpo } }); return { status: r.status, ...(await r.json()) }; };
  assert.match((await acaoC({ acao: "problema", motivo: "ruim" })).erro, /10 letras/);
  assert.equal((await acaoC({ acao: "problema", motivo: "O vendedor não aparece para a retirada." })).estado, "problema");
  const peds = await (await chama(env, "/v1/moderacao/mercado/pedidos", { senha: SENHA })).json();
  assert.equal(peds.pedidos[0].problema, "O vendedor não aparece para a retirada.");
  assert.equal(peds.pedidos[0].destino, undefined);
  const r = await (await chama(env, "/v1/moderacao/mercado/pedido", { corpo: { id: c.pedido, acao: "reembolsar" }, senha: SENHA })).json();
  assert.equal(r.estado, "devolvido");
  assert.equal(mpSim.reembolsos.at(-1).id, "8800004");
});
