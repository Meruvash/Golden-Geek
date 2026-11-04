// Notificações do navegador (Web Push) da Elite Boardgamers, sem app e sem cadastro, por tema:
// black (Black de Verdade), noticias e resenhas. Cada inscrito escolhe os temas no sininho do site.
//
// Público (só aceita chamadas do site):
//   GET  /v1/push/chave                       chave pública VAPID (applicationServerKey)
//   POST /v1/push/inscrever {sub, temas, juntar, antigo}  guarda a inscrição; juntar=true soma os temas aos que já tinha;
//                                             antigo = endpoint anterior (troca de inscrição feita pelo navegador)
//   POST /v1/push/temas     {endpoint}        temas atuais desta inscrição (para o sininho mostrar o estado)
//   POST /v1/push/cancelar  {endpoint, temas?} sem temas: apaga a inscrição; com temas: só tira esses
//   GET  /v1/push/ultimos?ep=<endpoint>       alertas ainda não mostrados neste aparelho (o service worker busca)
// Saúde e plano B (sem dado de pessoa; qualquer um pode chamar, com trava de tempo):
//   GET  /v1/push/saude                       última rodada, onde cada tema parou, fila e entregas pendentes
//   POST /v1/push/rodar                       roda o mesmo ciclo do cron agora (o workflow notificacoes.yml chama
//                                             quando o cron da Cloudflare não processou um alerta novo)
//
// Ciclo (cron a cada minuto, ou /rodar): lê as listas públicas do site (FEEDS), guarda os alertas novos de cada tema e
// manda um push vazio para os inscritos naquele tema; o service worker então busca /v1/push/ultimos e mostra a
// notificação. Push sem conteúdo dispensa criptografar a mensagem: só a assinatura VAPID (JWT ES256) vai no cabeçalho.
//
// Sem duplicata, mesmo com cron e plano B rodando juntos:
//   - cada alerta tem id fixo (tema:id) e entra uma vez só (INSERT OR IGNORE);
//   - o push para um aparelho só sai se aquela rodada criou a entrega (INSERT OR IGNORE em push_entrega conta changes),
//     então duas rodadas simultâneas nunca avisam o mesmo aparelho duas vezes pelo mesmo alerta;
//   - o cabeçalho Topic faz o serviço de push trocar um aviso ainda não entregue pelo mais novo (o celular desligado
//     recebe um só quando liga);
//   - /ultimos só devolve o que o aparelho ainda não mostrou, e a notificação usa o id do alerta como tag (repetir
//     substitui em silêncio, não empilha).
// Nova tentativa: entrega que o aparelho não buscou em REPETE_MIN minutos (push recusado, serviço fora do ar, celular
// que não acordou) ganha outro push, até MAX_TENTATIVAS vezes, durante 12 horas (regra no passo 3 de agendado).
// Inscrição que o serviço de push dá como morta (404/410) é apagada.
//
// Segredo: VAPID_JWK (chave privada P-256 em JWK). Variável: VAPID_PUBLICA (a mesma chave, pública, em base64url).

const FEEDS = {
  black: "https://eliteboardgamers.com.br/black/alertas.json",
  noticias: "https://eliteboardgamers.com.br/alertas/conteudo.json",
  resenhas: "https://eliteboardgamers.com.br/alertas/conteudo.json",
};
const TEMAS = Object.keys(FEEDS);
const POR_RODADA = 40; // aparelhos avisados por execução (limite de subrequisições do Worker); o resto vai na próxima
const POR_LOTE = 12; // alertas guardados por lote (uma edição de notícias passa de 6 notas)
const NA_TELA = 3; // notificações separadas por push; acima disso, a última vira um resumo "e mais N"
const REPETE_MIN = 5;
const MAX_TENTATIVAS = 3;
const TRAVA_RODAR_S = 40; // /rodar não roda de novo antes disso
const PADRAO = "https://eliteboardgamers.com.br/";
const RESUMO_URL = { noticias: "https://eliteboardgamers.com.br/noticias/", resenhas: "https://eliteboardgamers.com.br/resenhas/",
                     black: "https://eliteboardgamers.com.br/black/" };

const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const json = (dados, status = 200, extra = {}) =>
  new Response(JSON.stringify(dados), { status, headers: { "content-type": "application/json; charset=utf-8", ...extra } });
const limpaTemas = (t) => [...new Set((Array.isArray(t) ? t : []).filter((x) => TEMAS.includes(x)))];
const temasTexto = (t) => "," + t.join(",") + ",";
const agoraIso = () => new Date(Date.now()).toISOString();
const antesIso = (min) => new Date(Date.now() - min * 60000).toISOString();

let _chave;
async function chavePrivada(env) {
  if (!_chave) _chave = await crypto.subtle.importKey("jwk", JSON.parse(env.VAPID_JWK), { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  return _chave;
}

const _jwt = new Map(); // um JWT por serviço de push, reaproveitado por 6 horas
async function vapid(endpoint, env) {
  const aud = new URL(endpoint).origin;
  const guardado = _jwt.get(aud);
  if (guardado && guardado.ate > Date.now()) return guardado.v;
  const cab = b64u(new TextEncoder().encode(JSON.stringify({ typ: "JWT", alg: "ES256" })));
  const corpo = b64u(new TextEncoder().encode(JSON.stringify({
    aud, exp: Math.floor(Date.now() / 1000) + 12 * 3600, sub: "https://eliteboardgamers.com.br/black/robo/",
  })));
  const assinatura = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, await chavePrivada(env), new TextEncoder().encode(`${cab}.${corpo}`));
  const v = `vapid t=${cab}.${corpo}.${b64u(assinatura)}, k=${env.VAPID_PUBLICA}`;
  _jwt.set(aud, { v, ate: Date.now() + 6 * 3600 * 1000 });
  return v;
}

async function empurrar(endpoint, env) {
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { authorization: await vapid(endpoint, env), ttl: "21600", urgency: "high", topic: "novidades", "content-length": "0" },
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

async function apagaSub(db, endpoint) {
  await db.batch([
    db.prepare("DELETE FROM push_subs WHERE endpoint=?").bind(endpoint),
    db.prepare("DELETE FROM push_entrega WHERE endpoint=?").bind(endpoint),
  ]);
}

// Manda o push e registra o resultado na entrega (enviado/tentativas). Falha passageira fica para a nova tentativa.
async function avisa(db, endpoint, env) {
  let st = 0;
  try { st = await empurrar(endpoint, env); } catch { st = 0; }
  if (st === 404 || st === 410) { await apagaSub(db, endpoint); return st; }
  const agora = agoraIso(), aceito = st >= 200 && st < 300 ? 1 : 0;
  const ops = [db.prepare("UPDATE push_entrega SET enviado=?, ok=?, tentativas=COALESCE(tentativas,0)+1 WHERE endpoint=? AND mostrado=0")
    .bind(agora, aceito, endpoint)];
  if (st >= 400 || st === 0) ops.push(db.prepare("UPDATE push_subs SET falhas=falhas+1 WHERE endpoint=?").bind(endpoint));
  else ops.push(db.prepare("UPDATE push_subs SET falhas=0, ultimo_ok=? WHERE endpoint=?").bind(agora, endpoint));
  await db.batch(ops);
  return st;
}

async function ultimos(db, ep) {
  // o service worker novo manda o endpoint: fica provado que este aparelho busca e marca o que mostrou
  await db.prepare("UPDATE push_subs SET visto=? WHERE endpoint=?").bind(agoraIso(), ep).run();
  const pend = (await db.prepare(
    "SELECT a.id, a.tema, a.titulo, a.texto, a.url, a.imagem FROM push_entrega e JOIN push_alertas a ON a.id = e.alerta " +
    "WHERE e.endpoint = ? AND e.mostrado = 0 ORDER BY a.criado DESC, a.id").bind(ep).all()).results || [];
  if (!pend.length) {
    // nada pendente (push repetido que chegou depois do primeiro): devolve o último já mostrado; com a mesma tag, o
    // aparelho só substitui a notificação que já está lá, sem tocar de novo e sem empilhar
    const ult = await db.prepare(
      "SELECT a.id, a.tema, a.titulo, a.texto, a.url, a.imagem FROM push_entrega e JOIN push_alertas a ON a.id = e.alerta " +
      "WHERE e.endpoint = ? ORDER BY a.criado DESC LIMIT 1").bind(ep).first();
    return { alertas: ult ? [ult] : [], repetido: true };
  }
  await db.prepare("UPDATE push_entrega SET mostrado = 1 WHERE endpoint = ? AND mostrado = 0").bind(ep).run();
  if (pend.length <= NA_TELA) return { alertas: pend };
  const mostra = pend.slice(0, NA_TELA - 1), resto = pend.slice(NA_TELA - 1);
  const temas = [...new Set(resto.map((a) => a.tema))];
  const nome = { noticias: "notícias", resenhas: "resenhas", black: "ofertas do Black" };
  const resumo = {
    id: "resumo:" + resto[0].id, tema: temas[0],
    titulo: `E mais ${resto.length} ${temas.length === 1 ? nome[temas[0]] || "novidades" : "novidades"} na Elite`,
    texto: resto.slice(0, 3).map((a) => String(a.titulo).replace(/^\S+\s/, "")).join(" · ").slice(0, 280),
    url: temas.length === 1 ? RESUMO_URL[temas[0]] || PADRAO : PADRAO, imagem: null,
  };
  return { alertas: mostra.concat([resumo]) };
}

export async function rotasPush(req, url, env, h) {
  const db = env.DB;
  if (url.pathname === "/v1/push/chave") return json({ chave: env.VAPID_PUBLICA || null }, 200, h);
  if (url.pathname === "/v1/push/ultimos") {
    const ep = url.searchParams.get("ep") || "";
    let dados = { alertas: [] };
    if (ep) dados = await ultimos(db, ep);
    else { // service worker antigo, sem endpoint: último lote do Black
      const est = await db.prepare("SELECT v FROM push_estado WHERE k='lote:black'").first();
      if (est) dados.alertas = (await db.prepare("SELECT id, tema, titulo, texto, url, imagem FROM push_alertas WHERE lote=? ORDER BY criado DESC LIMIT 3").bind(est.v).all()).results || [];
    }
    return json(dados, 200, { ...h, "cache-control": "no-store" });
  }
  if (url.pathname === "/v1/push/saude") return json(await saude(db, env), 200, { ...h, "cache-control": "no-store" });
  if (url.pathname === "/v1/push/rodar" && req.method === "POST") {
    const ultima = await db.prepare("SELECT v FROM push_estado WHERE k='rodada'").first();
    if (ultima && Date.now() - Date.parse(ultima.v) < TRAVA_RODAR_S * 1000) return json({ rodou: false, motivo: "rodou há pouco", saude: await saude(db, env) }, 200, h);
    const r = await agendado(env, "plano-b");
    return json({ rodou: true, ...r, saude: await saude(db, env) }, 200, h);
  }
  if (req.method !== "POST") return json({ erro: "método" }, 405, h);
  if (!h["access-control-allow-origin"]) return json({ erro: "origem" }, 403, h);
  const d = await req.json().catch(() => ({}));
  if (url.pathname === "/v1/push/inscrever") {
    const ep = d.sub && d.sub.endpoint;
    if (!enderecoOk(ep)) return json({ erro: "inscrição inválida" }, 400, h);
    let temas = limpaTemas(d.temas);
    if (!temas.length && !d.antigo) temas = ["black"]; // página antiga do Black mandava sem temas
    if (d.antigo && d.antigo !== ep) { // o navegador trocou a inscrição (pushsubscriptionchange): herda os temas
      const velha = await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(d.antigo).first();
      if (velha) { temas = limpaTemas(temasDe(velha).concat(temas)); await apagaSub(db, d.antigo); }
    }
    if (d.juntar) {
      const antes = await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(ep).first();
      temas = limpaTemas(temasDe(antes).concat(temas));
    }
    if (!temas.length) return json({ erro: "escolha pelo menos um tema" }, 400, h);
    await db.prepare("INSERT INTO push_subs (endpoint, chaves, criado, falhas, temas) VALUES (?, ?, ?, 0, ?) " +
                     "ON CONFLICT(endpoint) DO UPDATE SET falhas=0, temas=excluded.temas")
      .bind(ep, JSON.stringify(d.sub.keys || {}), agoraIso(), temasTexto(temas)).run();
    return json({ ok: true, temas }, 200, h);
  }
  if (url.pathname === "/v1/push/temas") {
    const linha = d.endpoint ? await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(d.endpoint).first() : null;
    return json({ inscrito: !!linha, temas: temasDe(linha), todos: TEMAS }, 200, h);
  }
  if (url.pathname === "/v1/push/cancelar") {
    if (!d.endpoint) return json({ ok: true }, 200, h);
    const tirar = limpaTemas(d.temas);
    if (!tirar.length) {
      await apagaSub(db, d.endpoint);
      return json({ ok: true, temas: [] }, 200, h);
    }
    const antes = await db.prepare("SELECT temas FROM push_subs WHERE endpoint=?").bind(d.endpoint).first();
    const fica = temasDe(antes).filter((t) => !tirar.includes(t));
    if (fica.length) await db.prepare("UPDATE push_subs SET temas=? WHERE endpoint=?").bind(temasTexto(fica), d.endpoint).run();
    else await apagaSub(db, d.endpoint);
    return json({ ok: true, temas: fica }, 200, h);
  }
  return json({ erro: "rota desconhecida" }, 404, h);
}

async function saude(db, env) {
  const est = Object.fromEntries(((await db.prepare("SELECT k, v FROM push_estado").all()).results || []).map((x) => [x.k, x.v]));
  const fila = ((await db.prepare("SELECT lote, tema, criado FROM push_fila ORDER BY criado").all()).results || []);
  const pend = await db.prepare("SELECT COUNT(*) AS n FROM push_entrega WHERE mostrado=0 AND tentativas < ?").bind(MAX_TENTATIVAS).first("n");
  const subs = ((await db.prepare("SELECT temas FROM push_subs").all()).results || []);
  const porTema = Object.fromEntries(TEMAS.map((t) => [t, subs.filter((s) => (s.temas || "").includes(`,${t},`)).length]));
  return {
    configurado: !!(env.VAPID_JWK && env.VAPID_PUBLICA), rodada: est.rodada || null, rodada_por: est.rodada_por || null,
    erro: est.erro || null, ultimo: { black: est.ultimo || null, noticias: est["ultimo:noticias"] || null, resenhas: est["ultimo:resenhas"] || null },
    fila, entregas_pendentes: pend || 0, inscritos: subs.length, inscritos_por_tema: porTema,
  };
}

export async function agendado(env, por = "cron") {
  if (!env.VAPID_JWK || !env.VAPID_PUBLICA) return { erro: "sem chaves VAPID" };
  const db = env.DB;
  const pega = async (k) => ((await db.prepare("SELECT v FROM push_estado WHERE k=?").bind(k).first()) || {}).v;
  const poe = (k, v) => db.prepare("INSERT INTO push_estado (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v=excluded.v").bind(k, v);
  await db.batch([poe("rodada", agoraIso()), poe("rodada_por", por)]);
  const conta = { lotes: 0, avisados: 0, repetidos: 0 };
  try {
    // 1. alertas novos em cada lista pública (a lista do conteúdo traz notícias e resenhas, separadas pelo campo tema)
    const lidas = {};
    for (const tema of TEMAS) {
      const fonte = FEEDS[tema];
      if (!(fonte in lidas)) {
        try {
          const r = await fetch(`${fonte}?t=${Date.now()}`, { cf: { cacheTtl: 0 }, headers: { "user-agent": "EliteBoardgamers-notificacoes/1.0" } });
          lidas[fonte] = r.ok ? await r.json() : null;
        } catch { lidas[fonte] = null; }
      }
      const feed = lidas[fonte];
      if (!Array.isArray(feed)) continue;
      const chaveUlt = tema === "black" ? "ultimo" : `ultimo:${tema}`; // "ultimo" é o nome antigo do Black
      const ultimo = await pega(chaveUlt);
      const doTema = feed.filter((a) => a && a.id && a.hora && (a.tema || "black") === tema);
      if (ultimo === undefined) { // primeira leitura deste tema: só marca onde parou, sem disparar o histórico inteiro
        const horas = doTema.map((a) => a.hora).sort();
        await poe(chaveUlt, horas.length ? horas[horas.length - 1] : "0").run();
        continue;
      }
      const novos = doTema.filter((a) => a.hora > ultimo).sort((a, b) => (a.hora < b.hora ? -1 : 1));
      if (!novos.length) continue;
      const lote = `${tema}:${novos[novos.length - 1].hora}`;
      // tudo de uma vez (transação): ou o lote entra inteiro na fila, ou o tema não avança e a próxima rodada tenta de novo
      await db.batch(novos.slice(-POR_LOTE).map((a) =>
        db.prepare("INSERT OR IGNORE INTO push_alertas (id, lote, tema, titulo, texto, url, imagem, criado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
          .bind(`${tema}:${a.id}`, lote, tema, String(a.titulo || "").slice(0, 120), String(a.texto || "").slice(0, 300), a.url || PADRAO,
                a.imagem || null, a.hora)).concat([
        db.prepare("INSERT OR IGNORE INTO push_fila (lote, tema, cursor, criado) VALUES (?, ?, '', ?)").bind(lote, tema, agoraIso()),
        poe(chaveUlt, novos[novos.length - 1].hora),
        poe(`lote:${tema}`, lote),
      ]));
      conta.lotes++;
    }

    // 2. envia o lote mais antigo da fila, em fatias (cursor = último endpoint já visto)
    const f = await db.prepare("SELECT lote, tema, cursor FROM push_fila ORDER BY criado LIMIT 1").first();
    if (f) {
      const subs = (await db.prepare("SELECT endpoint FROM push_subs WHERE endpoint > ? AND temas LIKE ? ORDER BY endpoint LIMIT ?")
        .bind(f.cursor || "", `%,${f.tema},%`, POR_RODADA).all()).results || [];
      const ids = ((await db.prepare("SELECT id FROM push_alertas WHERE lote=?").bind(f.lote).all()).results || []).map((x) => x.id);
      for (const s of subs) {
        const res = ids.length ? await db.batch(ids.map((id) =>
          db.prepare("INSERT OR IGNORE INTO push_entrega (endpoint, alerta, mostrado, tentativas, ok, enviado) VALUES (?, ?, 0, 0, 0, ?)").bind(s.endpoint, id, agoraIso()))) : [];
        // só avisa se esta rodada criou alguma entrega: outra rodada que já avisou este aparelho não avisa de novo
        if (!res.some((x) => x.meta && x.meta.changes > 0)) continue;
        await avisa(db, s.endpoint, env);
        conta.avisados++;
      }
      if (subs.length < POR_RODADA) await db.prepare("DELETE FROM push_fila WHERE lote=?").bind(f.lote).run();
      else await db.prepare("UPDATE push_fila SET cursor=? WHERE lote=?").bind(subs[subs.length - 1].endpoint, f.lote).run();
    }

    // 3. nova tentativa: alerta não buscado há REPETE_MIN minutos ganha outro push se o envio falhou (o serviço de push
    //    recusou ou não respondeu) ou se o aparelho já provou que roda o service worker novo (visto), que só mostra o
    //    que ainda não mostrou; aparelho com service worker antigo (sem endpoint) não ganha repetição, para não duplicar
    const atrasados = (await db.prepare(
      "SELECT e.endpoint FROM push_entrega e JOIN push_alertas a ON a.id = e.alerta JOIN push_subs s ON s.endpoint = e.endpoint " +
      "WHERE e.mostrado = 0 AND e.tentativas < ? AND e.enviado IS NOT NULL AND e.enviado < ? AND a.criado > ? " +
      "AND (e.ok = 0 OR s.visto IS NOT NULL) GROUP BY e.endpoint LIMIT 20")
      .bind(MAX_TENTATIVAS, antesIso(REPETE_MIN), antesIso(12 * 60)).all()).results || [];
    for (const s of atrasados) { await avisa(db, s.endpoint, env); conta.repetidos++; }

    await db.prepare("DELETE FROM push_subs WHERE falhas >= 10").run();
    // limpeza: alertas e entregas com mais de 7 dias
    const corte = new Date(Date.now() - 7 * 864e5).toISOString();
    await db.batch([
      db.prepare("DELETE FROM push_entrega WHERE alerta IN (SELECT id FROM push_alertas WHERE criado < ?)").bind(corte),
      db.prepare("DELETE FROM push_alertas WHERE criado < ?").bind(corte),
      db.prepare("DELETE FROM push_estado WHERE k='erro'"),
    ]);
  } catch (e) {
    await poe("erro", `${agoraIso()} ${String((e && e.message) || e).slice(0, 300)}`).run().catch(() => {});
    conta.erro = String((e && e.message) || e);
  }
  return conta;
}
