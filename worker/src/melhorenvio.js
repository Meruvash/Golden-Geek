// Melhor Envio para o Mercado da Elite: cotação do frete na hora da compra e etiqueta de envio paga pela Elite.
// A Elite conecta UMA conta dela no Melhor Envio (OAuth, feito pelo painel de moderação); o frete que o comprador
// paga vai para a Elite junto com a comissão (marketplace_fee do Mercado Pago) e paga a etiqueta pela carteira.
//
// Documentação: https://docs.melhorenvio.com.br/llms.txt (cotação /api/v2/me/shipment/calculate, carrinho /api/v2/me/cart,
// compra /api/v2/me/shipment/checkout, geração /generate, impressão /print, rastreio /tracking, webhooks X-ME-Signature).
// Variáveis: ME_CLIENT_ID, ME_CLIENT_SECRET (segredos), ME_CONTATO (e-mail técnico exigido no User-Agent),
// ME_BASE (padrão https://melhorenvio.com.br; sandbox: https://sandbox.melhorenvio.com.br). Tokens cifrados com MP_CHAVE.

import { cifra, decifra } from "./mercadopago.js";

export const ESCOPOS = "shipping-calculate cart-write cart-read shipping-checkout shipping-generate shipping-print shipping-tracking orders-read";
const base = env => (env.ME_BASE || "https://melhorenvio.com.br").replace(/\/$/, "");
export const configurado = env => Boolean(env.ME_CLIENT_ID && env.ME_CLIENT_SECRET && env.ME_CONTATO && env.MP_CHAVE);
const agente = env => `Mercado da Elite Boardgamers (${env.ME_CONTATO})`;

// tamanhos de caixa que o vendedor escolhe no anúncio (cm e kg, já com a embalagem)
export const PACOTES = {
  p: { nome: "Pequena", width: 20, height: 6, length: 20, weight: 0.6 },     // card games, jogos de bolso
  m: { nome: "Média", width: 30, height: 8, length: 30, weight: 1.5 },       // a maioria dos jogos
  g: { nome: "Grande", width: 32, height: 12, length: 32, weight: 3 },       // caixa quadrada padrão cheia
  gg: { nome: "Muito grande", width: 42, height: 16, length: 42, weight: 6 }, // jogos grandes, big box
};

async function chama(env, caminho, { metodo = "GET", token, corpo, form } = {}) {
  const r = await fetch(base(env) + caminho, {
    method: metodo,
    headers: { accept: "application/json", "content-type": "application/json", "user-agent": agente(env), ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: corpo ? JSON.stringify(corpo) : form ? JSON.stringify(form) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(`Melhor Envio ${r.status}: ${d.message || d.error || "erro"}`), { status: r.status, dados: d });
  return d;
}

export function urlAutorizacao(env, { state, retorno }) {
  const q = new URLSearchParams({ client_id: env.ME_CLIENT_ID, redirect_uri: retorno, response_type: "code", state, scope: ESCOPOS });
  return `${base(env)}/oauth/authorize?${q}`;
}

async function guarda(env, t) {
  const expira = new Date(Date.now() + (Number(t.expires_in) || 30 * 86400) * 1000).toISOString();
  await env.DB.prepare(`INSERT INTO mercado_envio_conta (id, token, renovacao, expira) VALUES (1, ?, ?, ?)
    ON CONFLICT (id) DO UPDATE SET token = excluded.token, renovacao = excluded.renovacao, expira = excluded.expira, atualizado = datetime('now')`)
    .bind(await cifra(env, t.access_token), await cifra(env, t.refresh_token), expira).run();
}

export async function trocaCodigo(env, { codigo, retorno }) {
  await guarda(env, await chama(env, "/oauth/token", { metodo: "POST", form: {
    grant_type: "authorization_code", client_id: env.ME_CLIENT_ID, client_secret: env.ME_CLIENT_SECRET, redirect_uri: retorno, code: codigo } }));
}

// o token vale 30 dias e o de renovação 45: renova faltando 10 dias (o cron também chama, para não deixar vencer)
export async function token(env, { forcarRenovacao = false } = {}) {
  const c = await env.DB.prepare("SELECT token, renovacao, expira FROM mercado_envio_conta WHERE id = 1").first();
  if (!c) throw Object.assign(new Error("conta do Melhor Envio não conectada"), { status: 503 });
  if (forcarRenovacao || Date.parse(c.expira) - Date.now() < 10 * 86400e3) {
    try {
      const t = await chama(env, "/oauth/token", { metodo: "POST", form: {
        grant_type: "refresh_token", client_id: env.ME_CLIENT_ID, client_secret: env.ME_CLIENT_SECRET, refresh_token: await decifra(env, c.renovacao) } });
      await guarda(env, t);
      return t.access_token;
    } catch (e) {
      if (Date.parse(c.expira) <= Date.now()) throw e;
    }
  }
  return decifra(env, c.token);
}

export async function conectado(env) {
  return Boolean(await env.DB.prepare("SELECT 1 AS ok FROM mercado_envio_conta WHERE id = 1").first("ok"));
}

// cotação: devolve as opções que dá para comprar, da mais barata para a mais cara
export async function cota(env, { cepOrigem, cepDestino, pacote, valor }) {
  const p = PACOTES[pacote] || PACOTES.m;
  const r = await chama(env, "/api/v2/me/shipment/calculate", { metodo: "POST", token: await token(env), corpo: {
    from: { postal_code: cepOrigem }, to: { postal_code: cepDestino },
    products: [{ id: "jogo", width: p.width, height: p.height, length: p.length, weight: p.weight, insurance_value: Math.round(valor) / 100, quantity: 1 }],
    options: { receipt: false, own_hand: false } } });
  return (Array.isArray(r) ? r : []).filter(o => !o.error && (o.custom_price || o.price))
    .map(o => ({ servico: o.id, nome: o.name, empresa: o.company && o.company.name, logo: o.company && o.company.picture,
                 preco: Math.round(Number(o.custom_price || o.price) * 100), prazo: Number(o.custom_delivery_time || o.delivery_time) || null }))
    .sort((a, b) => a.preco - b.preco);
}

// etiqueta: carrinho -> compra pela carteira da Elite -> geração -> link público de impressão
export async function compraEtiqueta(env, { servico, remetente, destinatario, pacote, jogo, valor, pedido, url }) {
  const t = await token(env), p = PACOTES[pacote] || PACOTES.m;
  const pessoa = x => ({ name: x.nome, phone: x.telefone || undefined, email: x.email || undefined, document: x.cpf, address: x.rua, complement: x.complemento || undefined,
                         number: x.numero, district: x.bairro, city: x.cidade, state_abbr: x.uf, country_id: "BR", postal_code: x.cep });
  const item = await chama(env, "/api/v2/me/cart", { metodo: "POST", token: t, corpo: {
    service: servico, from: pessoa(remetente), to: pessoa(destinatario),
    products: [{ name: jogo.slice(0, 100), quantity: "1", unitary_value: (Math.round(valor) / 100).toFixed(2) }],
    volumes: [{ height: p.height, width: p.width, length: p.length, weight: p.weight }],
    options: { insurance_value: Math.round(valor) / 100, receipt: false, own_hand: false, reverse: false, non_commercial: true,
               platform: "Mercado da Elite", tags: [{ tag: `eb-${pedido}`, url }], reminder: `Mercado da Elite · pedido ${pedido}` } } });
  const id = item.id;
  await chama(env, "/api/v2/me/shipment/checkout", { metodo: "POST", token: t, corpo: { orders: [id] } });
  const g = await chama(env, "/api/v2/me/shipment/generate", { metodo: "POST", token: t, corpo: { orders: [id] } });
  if (g[id] && g[id].status === false) throw Object.assign(new Error(g[id].message || "etiqueta não gerada"), { etiqueta: id });
  const imp = await chama(env, "/api/v2/me/shipment/print", { metodo: "POST", token: t, corpo: { mode: "public", orders: [id] } });
  return { id, protocolo: item.protocol || null, custo: Math.round(Number(item.price || 0) * 100), url: imp.url };
}

export async function rastreia(env, ids) {
  if (!ids.length) return {};
  return chama(env, "/api/v2/me/shipment/tracking", { metodo: "POST", token: await token(env), corpo: { orders: ids } });
}

// aviso do Melhor Envio: HMAC-SHA256 do corpo com o segredo do aplicativo, em base64, no cabeçalho X-ME-Signature
export async function assinaturaOk(env, corpo, assinatura) {
  if (!assinatura || !env.ME_CLIENT_SECRET) return false;
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(env.ME_CLIENT_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(corpo)));
  const b64 = btoa(String.fromCharCode(...mac)), hex = [...mac].map(b => b.toString(16).padStart(2, "0")).join("");
  return assinatura === b64 || assinatura.toLowerCase() === hex;  // a documentação não diz a codificação: aceita as duas
}
