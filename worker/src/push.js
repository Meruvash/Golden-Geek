// Notificações do navegador (Web Push) do Black de Verdade, sem app e sem cadastro.
//
// Público (só aceita chamadas do site):
//   GET  /v1/push/chave              chave pública VAPID (applicationServerKey) para o navegador se inscrever
//   POST /v1/push/inscrever {sub}    guarda a inscrição do navegador (endpoint do serviço de push do navegador)
//   POST /v1/push/cancelar  {endpoint}
//   GET  /v1/push/ultimos            alertas do último envio (o service worker do site mostra na notificação)
// Agendado (cron, a cada minuto): lê https://eliteboardgamers.com.br/black/alertas.json (publicado pelo robô do
// radar), guarda os alertas novos e manda um push vazio para os inscritos; o service worker então busca
// /v1/push/ultimos e mostra a notificação. Push sem conteúdo dispensa criptografar a mensagem: só a assinatura
// VAPID (JWT ES256) vai no cabeçalho. Inscrição que o serviço de push dá como morta (404/410) é apagada.
//
// Segredo: VAPID_JWK (chave privada P-256 em JWK). Variável: VAPID_PUBLICA (a mesma chave, pública, em base64url).

const FEED = "https://eliteboardgamers.com.br/black/alertas.json";
const POR_RODADA = 40; // envios por execução (limite de subrequisições do Worker); o resto vai na próxima

const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const json = (dados, status = 200, extra = {}) =>
  new Response(JSON.stringify(dados), { status, headers: { "content-type": "application/json; charset=utf-8", ...extra } });

let _chave;
async function chavePrivada(env) {
  if (!_chave) _chave = await crypto.subtle.importKey("jwk", JSON.parse(env.VAPID_JWK), { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  return _chave;
}

async function vapid(endpoint, env) {
  const aud = new URL(endpoint).origin;
  const cab = b64u(new TextEncoder().encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const corpo = b64u(new TextEncoder().encode(JSON.stringify({
    aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: "https://eliteboardgamers.com.br/black/robo/",
  })));
  const assinatura = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, await chavePrivada(env), new TextEncoder().encode(`${cab}.${corpo}`));
  return `vapid t=${cab}.${corpo}.${b64u(assinatura)}, k=${env.VAPID_PUBLICA}`;
}

async function empurrar(endpoint, env) {
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { authorization: await vapid(endpoint, env), ttl: "21600", urgency: "high", "content-length": "0" },
  });
  return r.status;
}

function enderecoOk(endpoint) {
  try {
    const u = new URL(endpoint);
    return u.protocol === "https:" && endpoint.length < 1000;
  } catch { return false; }
}

export async function rotasPush(req, url, env, h) {
  if (url.pathname === "/v1/push/chave") return json({ chave: env.VAPID_PUBLICA || null }, 200, h);
  if (url.pathname === "/v1/push/ultimos") {
    const est = await env.DB.prepare("SELECT v FROM push_estado WHERE k='lote'").first();
    const lote = est ? est.v : "";
    const r = await env.DB.prepare("SELECT id, titulo, texto, url, imagem FROM push_alertas WHERE lote=? ORDER BY criado DESC LIMIT 3").bind(lote).all();
    return json({ lote, alertas: r.results || [] }, 200, { ...h, "cache-control": "no-store" });
  }
  if (req.method !== "POST") return json({ erro: "método" }, 405, h);
  if (!h["access-control-allow-origin"]) return json({ erro: "origem" }, 403, h);
  const d = await req.json().catch(() => ({}));
  if (url.pathname === "/v1/push/inscrever") {
    const ep = d.sub && d.sub.endpoint;
    if (!enderecoOk(ep)) return json({ erro: "inscrição inválida" }, 400, h);
    await env.DB.prepare("INSERT INTO push_subs (endpoint, chaves, criado, falhas) VALUES (?, ?, ?, 0) ON CONFLICT(endpoint) DO UPDATE SET falhas=0")
      .bind(ep, JSON.stringify(d.sub.keys || {}), new Date().toISOString()).run();
    return json({ ok: true }, 200, h);
  }
  if (url.pathname === "/v1/push/cancelar") {
    if (d.endpoint) await env.DB.prepare("DELETE FROM push_subs WHERE endpoint=?").bind(d.endpoint).run();
    return json({ ok: true }, 200, h);
  }
  return json({ erro: "rota desconhecida" }, 404, h);
}

export async function agendado(env) {
  if (!env.VAPID_JWK || !env.VAPID_PUBLICA) return;
  const db = env.DB;
  const pega = async (k) => ((await db.prepare("SELECT v FROM push_estado WHERE k=?").bind(k).first()) || {}).v;
  const poe = (k, v) => db.prepare("INSERT INTO push_estado (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v").bind(k, v).run();

  // 1. alertas novos na lista pública do robô
  let feed = [];
  try {
    const r = await fetch(`${FEED}?t=${Date.now()}`, { cf: { cacheTtl: 0 } });
    if (r.ok) feed = await r.json();
  } catch { feed = []; }
  const ultimo = (await pega("ultimo")) || "";
  const novos = feed.filter((a) => a && a.id && a.hora > ultimo).sort((a, b) => (a.hora < b.hora ? -1 : 1));
  if (novos.length) {
    if (!ultimo) {  // primeira leitura: só marca onde parou, sem disparar o histórico inteiro
      await poe("ultimo", novos[novos.length - 1].hora);
    } else {
      const lote = novos[novos.length - 1].hora;
      for (const a of novos) {
        await db.prepare("INSERT OR IGNORE INTO push_alertas (id, lote, titulo, texto, url, imagem, criado) VALUES (?, ?, ?, ?, ?, ?, ?)")
          .bind(a.id, lote, String(a.titulo || "").slice(0, 120), String(a.texto || "").slice(0, 300), a.url || "https://eliteboardgamers.com.br/black/",
                a.imagem || null, a.hora).run();
      }
      await poe("ultimo", lote);
      await poe("lote", lote);
      await poe("cursor", "");  // começa a enviar este lote do primeiro inscrito
      await poe("enviando", lote);
    }
  }

  // 2. envia o lote em andamento, em fatias (cursor = último endpoint já avisado)
  const enviando = await pega("enviando");
  if (!enviando) return;
  const cursor = (await pega("cursor")) || "";
  const subs = (await db.prepare("SELECT endpoint FROM push_subs WHERE endpoint > ? ORDER BY endpoint LIMIT ?").bind(cursor, POR_RODADA).all()).results || [];
  for (const s of subs) {
    let st = 0;
    try { st = await empurrar(s.endpoint, env); } catch { st = 0; }
    if (st === 404 || st === 410) await db.prepare("DELETE FROM push_subs WHERE endpoint=?").bind(s.endpoint).run();
    else if (st >= 400 || st === 0) await db.prepare("UPDATE push_subs SET falhas=falhas+1 WHERE endpoint=?").bind(s.endpoint).run();
  }
  await db.prepare("DELETE FROM push_subs WHERE falhas >= 10").run();
  if (subs.length < POR_RODADA) await poe("enviando", "");
  else await poe("cursor", subs[subs.length - 1].endpoint);
  // limpeza: alertas com mais de 7 dias
  await db.prepare("DELETE FROM push_alertas WHERE criado < ?").bind(new Date(Date.now() - 7 * 864e5).toISOString()).run();
}
