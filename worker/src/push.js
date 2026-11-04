// Notificações do navegador (Web Push) da Elite Boardgamers, sem app e sem cadastro, por tema:
// black (Black de Verdade), noticias e resenhas. Cada inscrito escolhe os temas no sininho do site.
//
// Público (só aceita chamadas do site):
//   GET  /v1/push/chave                       chave pública VAPID (applicationServerKey)
//   POST /v1/push/inscrever {sub, temas, juntar}   guarda a inscrição; juntar=true soma os temas aos que já tinha
//   POST /v1/push/temas     {endpoint}        temas atuais desta inscrição (para o sininho mostrar o estado)
//   POST /v1/push/cancelar  {endpoint, temas?} sem temas: apaga a inscrição; com temas: só tira esses
//   GET  /v1/push/ultimos?ep=<endpoint>       alertas ainda não mostrados neste aparelho (o service worker busca)
// Agendado (cron, a cada minuto): lê as listas públicas do site (FEEDS), guarda os alertas novos de cada tema e manda
// um push vazio para os inscritos naquele tema; o service worker então busca /v1/push/ultimos e mostra a notificação.
// Push sem conteúdo dispensa criptografar a mensagem: só a assinatura VAPID (JWT ES256) vai no cabeçalho.
// Inscrição que o serviço de push dá como morta (404/410) é apagada.
//
// Segredo: VAPID_JWK (chave privada P-256 em JWK). Variável: VAPID_PUBLICA (a mesma chave, pública, em base64url).

const FEEDS = {
  black: "https://eliteboardgamers.com.br/black/alertas.json",
  noticias: "https://eliteboardgamers.com.br/alertas/conteudo.json",
  resenhas: "https://eliteboardgamers.com.br/alertas/conteudo.json",
};
const TEMAS = Object.keys(FEEDS);
const POR_RODADA = 40; // envios por execução (limite de subrequisições do Worker); o resto vai na próxima
const PADRAO = "https://eliteboardgamers.com.br/";

const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const json = (dados, status = 200, extra = {}) =>
  new Response(JSON.stringify(dados), { status, headers: { "content-type": "application/json; charset=utf-8", ...extra } });
const limpaTemas = (t) => [...new Set((Array.isArray(t) ? t : []).filter((x) => TEMAS.includes(x)))];
const temasTexto = (t) => "," + t.join(",") + ",";

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

const temasDe = (linha) => (linha && linha.temas ? linha.temas.split(",").filter(Boolean) : []);

export async function rotasPush(req, url, env, h) {
  const db = env.DB;
  if (url.pathname === "/v1/push/chave") return json({ chave: env.VAPID_PUBLICA || null }, 200, h);
  if (url.pathname === "/v1/push/ultimos") {
    const ep = url.searchParams.get("ep") || "";
    let alertas = [];
    if (ep) {
      alertas = (await db.prepare(
        "SELECT a.id, a.tema, a.titulo, a.texto, a.url, a.imagem FROM push_entrega e JOIN push_alertas a ON a.id = e.alerta " +
        "WHERE e.endpoint = ? AND e.mostrado = 0 ORDER BY a.criado DESC LIMIT 4").bind(ep).all()).results || [];
      if (alertas.length) {
        await db.prepare("UPDATE push_entrega SET mostrado = 1 WHERE endpoint = ? AND mostrado = 0").bind(ep).run();
      }
    } else { // service worker antigo, sem endpoint: último lote do Black
      const est = await db.prepare("SELECT v FROM push_estado WHERE k='lote:black'").first();
      if (est) alertas = (await db.prepare("SELECT id, tema, titulo, texto, url, imagem FROM push_alertas WHERE lote=? ORDER BY criado DESC LIMIT 3").bind(est.v).all()).results || [];
    }
    return json({ alertas }, 200, { ...h, "cache-control": "no-store" });
  }
  if (req.method !== "POST") return json({ erro: "método" }, 405, h);
  if (!h["access-control-allow-origin"]) return json({ erro: "origem" }, 403, h);
  const d = await req.json().catch(() => ({}));
  if (url.pathname === "/v1/push/inscrever") {
    const ep = d.sub && d.sub.endpoint;
    if (!enderecoOk(ep)) return json({ erro: "inscrição inválida" }, 400, h);
    let temas = limpaTemas(d.temas && d.temas.length ? d.temas : ["black"]);
    if (!temas.length) return json({ erro: "escolha pelo menos um tema" }, 400, h);
    if (d.juntar) {
      const antes = await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(ep).first();
      temas = limpaTemas(temasDe(antes).concat(temas));
    }
    await db.prepare("INSERT INTO push_subs (endpoint, chaves, criado, falhas, temas) VALUES (?, ?, ?, 0, ?) " +
                     "ON CONFLICT(endpoint) DO UPDATE SET falhas=0, temas=excluded.temas")
      .bind(ep, JSON.stringify(d.sub.keys || {}), new Date().toISOString(), temasTexto(temas)).run();
    return json({ ok: true, temas }, 200, h);
  }
  if (url.pathname === "/v1/push/temas") {
    const linha = d.endpoint ? await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(d.endpoint).first() : null;
    return json({ inscrito: !!linha, temas: temasDe(linha) }, 200, h);
  }
  if (url.pathname === "/v1/push/cancelar") {
    if (!d.endpoint) return json({ ok: true }, 200, h);
    const tirar = limpaTemas(d.temas);
    if (!tirar.length) {
      await db.prepare("DELETE FROM push_subs WHERE endpoint=?").bind(d.endpoint).run();
      await db.prepare("DELETE FROM push_entrega WHERE endpoint=?").bind(d.endpoint).run();
      return json({ ok: true, temas: [] }, 200, h);
    }
    const antes = await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(d.endpoint).first();
    const fica = temasDe(antes).filter((t) => !tirar.includes(t));
    if (fica.length) await db.prepare("UPDATE push_subs SET temas=? WHERE endpoint=?").bind(temasTexto(fica), d.endpoint).run();
    else await db.prepare("DELETE FROM push_subs WHERE endpoint=?").bind(d.endpoint).run();
    return json({ ok: true, temas: fica }, 200, h);
  }
  return json({ erro: "rota desconhecida" }, 404, h);
}

export async function agendado(env) {
  if (!env.VAPID_JWK || !env.VAPID_PUBLICA) return;
  const db = env.DB;
  const pega = async (k) => ((await db.prepare("SELECT v FROM push_estado WHERE k=?").bind(k).first()) || {}).v;
  const poe = (k, v) => db.prepare("INSERT INTO push_estado (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v").bind(k, v).run();

  // 1. alertas novos em cada lista pública (a lista do conteúdo traz notícias e resenhas, separadas pelo campo tema)
  const lidas = {};
  for (const tema of TEMAS) {
    const fonte = FEEDS[tema];
    if (!(fonte in lidas)) {
      try {
        const r = await fetch(`${fonte}?t=${Date.now()}`, { cf: { cacheTtl: 0 } });
        lidas[fonte] = r.ok ? await r.json() : null;
      } catch { lidas[fonte] = null; }
    }
    const feed = lidas[fonte];
    if (!Array.isArray(feed)) continue;
    const chaveUlt = tema === "black" ? "ultimo" : `ultimo:${tema}`; // "ultimo" é o nome antigo do Black
    const ultimo = await pega(chaveUlt);
    const novos = feed.filter((a) => a && a.id && a.hora && (a.tema || "black") === tema && (!ultimo || a.hora > ultimo))
      .sort((a, b) => (a.hora < b.hora ? -1 : 1));
    if (ultimo === undefined) { // primeira leitura deste tema: só marca onde parou, sem disparar o histórico inteiro
      const todos = feed.filter((a) => a && a.hora && (a.tema || "black") === tema).map((a) => a.hora).sort();
      await poe(chaveUlt, todos.length ? todos[todos.length - 1] : "0");
      continue;
    }
    if (!novos.length) continue;
    const lote = `${tema}:${novos[novos.length - 1].hora}`;
    for (const a of novos.slice(-6)) {
      await db.prepare("INSERT OR IGNORE INTO push_alertas (id, lote, tema, titulo, texto, url, imagem, criado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(`${tema}:${a.id}`, lote, tema, String(a.titulo || "").slice(0, 120), String(a.texto || "").slice(0, 300), a.url || PADRAO,
              a.imagem || null, a.hora).run();
    }
    await poe(chaveUlt, novos[novos.length - 1].hora);
    await poe(`lote:${tema}`, lote);
    await db.prepare("INSERT OR IGNORE INTO push_fila (lote, tema, cursor, criado) VALUES (?, ?, '', ?)").bind(lote, tema, new Date().toISOString()).run();
  }

  // 2. envia o lote mais antigo da fila, em fatias (cursor = último endpoint já avisado)
  const f = await db.prepare("SELECT lote, tema, cursor FROM push_fila ORDER BY criado LIMIT 1").first();
  if (f) {
    const subs = (await db.prepare("SELECT endpoint FROM push_subs WHERE endpoint > ? AND temas LIKE ? ORDER BY endpoint LIMIT ?")
      .bind(f.cursor || "", `%,${f.tema},%`, POR_RODADA).all()).results || [];
    const ids = ((await db.prepare("SELECT id FROM push_alertas WHERE lote=?").bind(f.lote).all()).results || []).map((x) => x.id);
    for (const s of subs) {
      for (const id of ids) await db.prepare("INSERT OR IGNORE INTO push_entrega (endpoint, alerta, mostrado) VALUES (?, ?, 0)").bind(s.endpoint, id).run();
      let st = 0;
      try { st = await empurrar(s.endpoint, env); } catch { st = 0; }
      if (st === 404 || st === 410) {
        await db.prepare("DELETE FROM push_subs WHERE endpoint=?").bind(s.endpoint).run();
        await db.prepare("DELETE FROM push_entrega WHERE endpoint=?").bind(s.endpoint).run();
      } else if (st >= 400 || st === 0) await db.prepare("UPDATE push_subs SET falhas=falhas+1 WHERE endpoint=?").bind(s.endpoint).run();
    }
    if (subs.length < POR_RODADA) await db.prepare("DELETE FROM push_fila WHERE lote=?").bind(f.lote).run();
    else await db.prepare("UPDATE push_fila SET cursor=? WHERE lote=?").bind(subs[subs.length - 1].endpoint, f.lote).run();
  }
  await db.prepare("DELETE FROM push_subs WHERE falhas >= 10").run();
  // limpeza: alertas e entregas com mais de 7 dias
  const corte = new Date(Date.now() - 7 * 864e5).toISOString();
  await db.prepare("DELETE FROM push_entrega WHERE alerta IN (SELECT id FROM push_alertas WHERE criado < ?)").bind(corte).run();
  await db.prepare("DELETE FROM push_alertas WHERE criado < ?").bind(corte).run();
}
