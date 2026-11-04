// Mercado Pago para o Mercado da Elite: o vendedor conecta a conta dele (OAuth com PKCE) e cada compra vira um
// pagamento na conta do vendedor com a comissão da Elite em marketplace_fee (Checkout Pro, split 1:1).
// O Mercado Pago desconta a tarifa dele do vendedor; a comissão da Elite sai do que sobra e cai na conta da Elite.
//
// Documentação: https://www.mercadopago.com.br/developers/pt/docs/security/oauth/creation
//               https://www.mercadopago.com.br/developers/pt/docs/checkout-pro-preferences/how-tos/integrate-marketplace.md
// Variáveis: MP_CLIENT_ID, MP_CLIENT_SECRET e MP_CHAVE (segredos). Os tokens dos vendedores ficam no D1 cifrados com
// AES-GCM a partir de MP_CHAVE: quem ler o banco não consegue usar as contas.

export const AUTORIZAR = "https://auth.mercadopago.com/authorization";
const API_MP = "https://api.mercadopago.com";

export const configurado = env => Boolean(env.MP_CLIENT_ID && env.MP_CLIENT_SECRET && env.MP_CHAVE);

const b64 = bytes => btoa(String.fromCharCode(...bytes));
const deB64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const b64url = bytes => b64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export function aleatorioUrl(n = 32) { return b64url(crypto.getRandomValues(new Uint8Array(n))); }

export async function desafioPkce(verificador) {
  return b64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verificador))));
}

async function chave(env) {
  const bruta = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("mercado-elite|" + env.MP_CHAVE));
  return crypto.subtle.importKey("raw", bruta, "AES-GCM", false, ["encrypt", "decrypt"]);
}

export async function cifra(env, texto) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const c = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await chave(env), new TextEncoder().encode(texto)));
  return b64(iv) + "." + b64(c);
}

export async function decifra(env, guardado) {
  const [iv, c] = guardado.split(".");
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: deB64(iv) }, await chave(env), deB64(c)));
}

async function chamaMP(caminho, { metodo = "GET", token, corpo } = {}) {
  const r = await fetch(API_MP + caminho, {
    method: metodo,
    headers: { "content-type": "application/json", accept: "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(`Mercado Pago ${r.status}: ${d.message || d.error || "erro"}`), { status: r.status, dados: d });
  return d;
}

export function urlAutorizacao(env, { state, desafio, retorno }) {
  const q = new URLSearchParams({ client_id: env.MP_CLIENT_ID, response_type: "code", platform_id: "mp", state, redirect_uri: retorno,
                                  code_challenge: desafio, code_challenge_method: "S256" });
  return `${AUTORIZAR}?${q}`;
}

// guarda (ou atualiza) os tokens de um vendedor; devolve o id da conta dele no Mercado Pago
async function guardaTokens(env, t) {
  const usuario = String(t.user_id);
  const expira = new Date(Date.now() + (Number(t.expires_in) || 180 * 86400) * 1000).toISOString();
  await env.DB.prepare(
    `INSERT INTO mercado_mp_contas (mp_usuario, token, renovacao, expira) VALUES (?, ?, ?, ?)
     ON CONFLICT (mp_usuario) DO UPDATE SET token = excluded.token, renovacao = excluded.renovacao, expira = excluded.expira, atualizado = datetime('now')`)
    .bind(usuario, await cifra(env, t.access_token), t.refresh_token ? await cifra(env, t.refresh_token) : null, expira).run();
  return usuario;
}

export async function trocaCodigo(env, { codigo, verificador, retorno }) {
  const t = await chamaMP("/oauth/token", { metodo: "POST", corpo: {
    client_id: env.MP_CLIENT_ID, client_secret: env.MP_CLIENT_SECRET, grant_type: "authorization_code", code: codigo,
    redirect_uri: retorno, code_verifier: verificador } });
  return guardaTokens(env, t);
}

// token válido do vendedor; renova pelo refresh_token quando faltar menos de 7 dias
export async function tokenVendedor(env, usuario) {
  const c = await env.DB.prepare("SELECT token, renovacao, expira FROM mercado_mp_contas WHERE mp_usuario = ?").bind(usuario).first();
  if (!c) throw new Error("vendedor sem conta do Mercado Pago conectada");
  if (c.renovacao && Date.parse(c.expira) - Date.now() < 7 * 86400e3) {
    try {
      const t = await chamaMP("/oauth/token", { metodo: "POST", corpo: {
        client_id: env.MP_CLIENT_ID, client_secret: env.MP_CLIENT_SECRET, grant_type: "refresh_token", refresh_token: await decifra(env, c.renovacao) } });
      await guardaTokens(env, { ...t, user_id: usuario });
      return t.access_token;
    } catch (e) {
      if (Date.parse(c.expira) <= Date.now()) throw e;  // ainda vale: segue com o atual e tenta renovar na próxima
    }
  }
  return decifra(env, c.token);
}

export function criaPreferencia(token, corpo) {
  return chamaMP("/checkout/preferences", { metodo: "POST", token, corpo });
}

export function buscaPagamento(token, id) {
  return chamaMP(`/v1/payments/${encodeURIComponent(id)}`, { token });
}

// devolve o pagamento inteiro ao comprador (a comissão da Elite volta junto, proporcional, pelo próprio Mercado Pago)
export function reembolsa(token, id, chave) {
  return fetch(`${API_MP}/v1/payments/${encodeURIComponent(id)}/refunds`, {
    method: "POST", headers: { "content-type": "application/json", authorization: `Bearer ${token}`, "x-idempotency-key": chave }, body: "{}",
  }).then(async r => { const d = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(`Mercado Pago ${r.status}: ${d.message || "erro"}`), { status: r.status }); return d; });
}
