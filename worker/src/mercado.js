// Mercado da Elite: anúncios de jogos que os próprios vendedores cadastram (venda e troca entre jogadores).
//
// Público (só aceita chamadas do site):
//   GET  /v1/mercado/lista                 anúncios aprovados e no prazo (sem contato: ele só sai no anúncio)
//   GET  /v1/mercado/anuncio?id=N          um anúncio aprovado ou vendido, com fotos e contato
//   GET  /v1/mercado/foto/<chave>          foto de um anúncio (webp ou jpeg), com cache
//   POST /v1/mercado/anunciar              multipart: campos + até 6 fotos + turnstile; entra na fila de moderação
//   POST /v1/mercado/meu       {id, t}     o vendedor vê o próprio anúncio pelo link secreto
//   POST /v1/mercado/meu/acao  {id, t, acao, preco}   vendido | remover | renovar | preco
//   POST /v1/mercado/denunciar {id, motivo}           3 denúncias de aparelhos diferentes tiram o anúncio do ar até o editor ver
// Moderação (Authorization: Bearer <MODERACAO_TOKEN>):
//   GET  /v1/moderacao/mercado/fila        pendentes e duvidosos, com todos os dados
//   GET  /v1/moderacao/mercado/recentes    últimos 200, qualquer estado
//   POST /v1/moderacao/mercado/decidir {id, estado, parecer, por}
//
// O link secreto (t) só existe no navegador do vendedor; aqui fica só o SHA-256 dele.
// Telefone e Instagram são publicados porque o vendedor marca que quer ser procurado por eles; o e-mail nunca sai.

export const PRAZO_DIAS = 60;           // anúncio aprovado fica no ar 60 dias; o vendedor renova pelo link
export const MAX_FOTOS = 6;
export const MAX_FOTO_BYTES = 700 * 1024;  // o site reduz a foto no aparelho antes de enviar (1600 px, webp)
const MAX_POR_HORA = 3, MAX_POR_DIA = 10, DENUNCIAS_PARA_TIRAR = 3;

export const CONDICOES = { lacrado: "Lacrado", "como-novo": "Como novo", "usado-otimo": "Usado, ótimo estado", "usado-bom": "Usado, bom estado", "usado-marcas": "Usado, com marcas de uso" };
export const ENTREGAS = { ambos: "Envio ou retirada", envio: "Só envio", retirada: "Só retirada" };
export const IDIOMAS = { pt: "Português", en: "Inglês", independente: "Independente de idioma", outro: "Outro idioma" };
export const UFS = new Set("AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(" "));
const ESTADOS_MOD = new Set(["pendente", "aprovado", "reprovado", "duvidoso"]);
const MOTIVOS = new Set(["golpe", "falso", "vendido", "ofensivo", "outro"]);

const LISTA_CAMPOS = "id, jogo, jogo_slug, edicao, condicao, idioma, preco, troca, entrega, cidade, uf, vendedor, fotos, aprovado_em";
const PUBLICO_CAMPOS = LISTA_CAMPOS + ", descricao, whatsapp, instagram, estado, expira";

const limpa = (v, max) => String(v ?? "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().replace(/[ \t]+/g, " ").slice(0, max + 1);
const linha = (v, max) => limpa(v, max).replace(/\s+/g, " ");

async function sha256(texto) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function aleatorio(n) {
  const b = crypto.getRandomValues(new Uint8Array(n));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// confere a assinatura do arquivo, não só o tipo que o navegador declarou
function tipoImagem(bytes) {
  if (bytes.length > 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "image/webp";
  if (bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  return null;
}

// "(11) 98765-4321" → "5511987654321"; aceita com ou sem 55
export function normalizaWhatsapp(v) {
  let d = String(v || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.length >= 12 && d.startsWith("55")) d = d.slice(2);
  if (d.length < 10 || d.length > 11 || d[0] === "0") return null;
  return "55" + d;
}

export function normalizaInstagram(v) {
  let s = String(v || "").trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, "").replace(/^@/, "").replace(/[/?#].*$/, "");
  if (!s) return "";
  return /^[A-Za-z0-9._]{1,30}$/.test(s) ? s.toLowerCase() : null;
}

// valida os campos de texto do anúncio; devolve {erro} ou {dados}
export function validaCampos(f) {
  const jogo = linha(f.jogo, 120), edicao = linha(f.edicao, 120), cidade = linha(f.cidade, 60), vendedor = linha(f.vendedor, 60);
  const descricao = limpa(f.descricao, 1500).replace(/\n{3,}/g, "\n\n"), uf = String(f.uf || "").toUpperCase();
  const preco = Number(f.preco), email = linha(f.email, 120);
  const slug = String(f.jogo_slug || "");
  if (jogo.length < 2 || jogo.length > 120) return { erro: "Diga qual é o jogo (de 2 a 120 letras)." };
  if (edicao.length > 120) return { erro: "A edição pode ter no máximo 120 letras." };
  if (!CONDICOES[f.condicao]) return { erro: "Escolha o estado do jogo." };
  if (!IDIOMAS[f.idioma]) return { erro: "Escolha o idioma do jogo." };
  if (!Number.isInteger(preco) || preco < 100 || preco > 10000000) return { erro: "Informe um preço entre R$ 1 e R$ 100.000." };
  if (!ENTREGAS[f.entrega]) return { erro: "Diga se envia, entrega em mãos ou os dois." };
  if (cidade.length < 2 || cidade.length > 60) return { erro: "Informe a cidade." };
  if (!UFS.has(uf)) return { erro: "Escolha o estado (UF)." };
  if (descricao.length > 1500) return { erro: "A descrição pode ter no máximo 1.500 caracteres." };
  if (vendedor.length < 2 || vendedor.length > 60) return { erro: "Escreva seu nome ou apelido (de 2 a 60 letras)." };
  const whatsapp = normalizaWhatsapp(f.whatsapp), instagram = normalizaInstagram(f.instagram);
  if (whatsapp === null) return { erro: "Esse WhatsApp não parece válido. Use DDD + número, por exemplo (11) 98765-4321." };
  if (instagram === null) return { erro: "Esse Instagram não parece válido. Use só o @ do perfil." };
  if (!whatsapp && !instagram) return { erro: "Deixe pelo menos um contato: WhatsApp ou Instagram." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { erro: "Esse e-mail não parece válido (ele é opcional)." };
  if (String(f.aceite) !== "1") return { erro: "Para anunciar, aceite as regras do Mercado." };
  return { dados: {
    jogo, jogo_slug: /^[a-z0-9-]{1,120}$/.test(slug) ? slug : null, edicao: edicao || null, condicao: f.condicao, idioma: f.idioma,
    preco, troca: String(f.troca) === "1" ? 1 : 0, entrega: f.entrega, cidade, uf, descricao: descricao || null, vendedor,
    whatsapp: whatsapp || null, instagram: instagram || null, email: email || null } };
}

const lista = (row) => ({ ...row, fotos: JSON.parse(row.fotos || "[]") });

async function anunciar(req, env, h, aux) {
  let form;
  try { form = await req.formData(); } catch { return aux.json({ erro: "Envio inválido." }, 400, h); }
  const f = Object.fromEntries([...form.entries()].filter(([, v]) => typeof v === "string"));
  if (f.isca) return aux.json({ ok: true, estado: "pendente" }, 200, h);  // robô preencheu o campo escondido
  const { erro, dados } = validaCampos(f);
  if (erro) return aux.json({ erro }, 400, h);
  const arquivos = form.getAll("foto").filter(x => typeof x !== "string");
  if (!arquivos.length) return aux.json({ erro: "Coloque pelo menos uma foto do jogo." }, 400, h);
  if (arquivos.length > MAX_FOTOS) return aux.json({ erro: `No máximo ${MAX_FOTOS} fotos.` }, 400, h);
  const fotos = [];
  for (const a of arquivos) {
    const bytes = new Uint8Array(await a.arrayBuffer());
    if (bytes.length > MAX_FOTO_BYTES) return aux.json({ erro: "Uma das fotos ficou grande demais. Tente outra." }, 400, h);
    const tipo = tipoImagem(bytes);
    if (!tipo) return aux.json({ erro: "Use fotos em JPG ou WEBP." }, 400, h);
    fotos.push({ bytes, tipo });
  }
  if (!(await aux.turnstileOk(f.turnstile, req, env))) return aux.json({ erro: "Não conseguimos confirmar que você não é um robô. Tente de novo." }, 400, h);
  const ip = await aux.ipHash(req, env);
  const hora = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_anuncios WHERE ip_hash = ? AND criado > datetime('now', '-1 hour')").bind(ip).first("n");
  const dia = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_anuncios WHERE ip_hash = ?").bind(ip).first("n");  // o sal do IP muda todo dia
  if (hora >= MAX_POR_HORA || dia >= MAX_POR_DIA) return aux.json({ erro: "Muitos anúncios seguidos. Tente de novo mais tarde." }, 429, h);

  const token = aleatorio(24);
  const d = dados;
  const r = await env.DB.prepare(
    `INSERT INTO mercado_anuncios (jogo, jogo_slug, edicao, condicao, idioma, preco, troca, entrega, cidade, uf, descricao, vendedor, whatsapp, instagram, email, token_hash, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`)
    .bind(d.jogo, d.jogo_slug, d.edicao, d.condicao, d.idioma, d.preco, d.troca, d.entrega, d.cidade, d.uf, d.descricao, d.vendedor,
          d.whatsapp, d.instagram, d.email, await sha256(token), ip).first();
  const id = r.id;
  const chaves = fotos.map((_, i) => `${id}-${aleatorio(6)}-${i + 1}`);
  await env.DB.batch(fotos.map((ft, i) => env.DB.prepare("INSERT INTO mercado_fotos (chave, anuncio, ordem, tipo, dados) VALUES (?, ?, ?, ?, ?)")
    .bind(chaves[i], id, i, ft.tipo, ft.bytes)));
  await env.DB.prepare("UPDATE mercado_anuncios SET fotos = ? WHERE id = ?").bind(JSON.stringify(chaves), id).run();
  return aux.json({ ok: true, id, token, estado: "pendente" }, 200, h);
}

async function listar(env, h, aux) {
  const { results } = await env.DB.prepare(
    `SELECT ${LISTA_CAMPOS} FROM mercado_anuncios WHERE estado = 'aprovado' AND expira > datetime('now') ORDER BY aprovado_em DESC LIMIT 1000`).all();
  return aux.json({ anuncios: results.map(lista), prazo_dias: PRAZO_DIAS }, 200, { ...h, "cache-control": "public, max-age=60" });
}

async function anuncio(url, env, h, aux) {
  const id = Number(url.searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) return aux.json({ erro: "anúncio inválido" }, 400, h);
  const row = await env.DB.prepare(`SELECT ${PUBLICO_CAMPOS} FROM mercado_anuncios WHERE id = ? AND estado IN ('aprovado', 'vendido')`).bind(id).first();
  if (!row) return aux.json({ erro: "Esse anúncio não existe ou saiu do ar." }, 404, h);
  const vencido = row.estado === "aprovado" && row.expira && row.expira <= new Date().toISOString().replace("T", " ").slice(0, 19);
  if (vencido) return aux.json({ erro: "Esse anúncio venceu e saiu do ar." }, 404, h);
  const sai = lista(row);
  if (sai.estado === "vendido") { sai.whatsapp = null; sai.instagram = null; }  // vendido: o contato some
  delete sai.expira;
  return aux.json({ anuncio: sai }, 200, { ...h, "cache-control": "no-store" });
}

async function foto(url, env, ctx) {
  const chave = url.pathname.slice("/v1/mercado/foto/".length);
  if (!/^\d+-[A-Za-z0-9_-]{8}-\d$/.test(chave)) return new Response("não encontrada", { status: 404 });
  const cache = typeof caches !== "undefined" ? caches.default : null;
  const guardada = cache && await cache.match(url.toString());
  if (guardada) return guardada;
  const row = await env.DB.prepare(
    `SELECT f.tipo, f.dados FROM mercado_fotos f JOIN mercado_anuncios a ON a.id = f.anuncio
     WHERE f.chave = ? AND a.estado IN ('pendente', 'duvidoso', 'aprovado', 'vendido')`).bind(chave).first();
  if (!row) return new Response("não encontrada", { status: 404 });
  const resp = new Response(row.dados instanceof ArrayBuffer ? row.dados : new Uint8Array(row.dados), {
    headers: { "content-type": row.tipo, "cache-control": "public, max-age=3600", "x-content-type-options": "nosniff" } });
  if (cache && ctx) ctx.waitUntil(cache.put(url.toString(), resp.clone()));
  return resp;
}

async function doDono(b, env) {
  const id = Number(b.id), t = String(b.t || "");
  if (!Number.isInteger(id) || id < 1 || t.length < 20 || t.length > 64) return null;
  const row = await env.DB.prepare(`SELECT ${PUBLICO_CAMPOS}, email, token_hash, criado, parecer FROM mercado_anuncios WHERE id = ?`).bind(id).first();
  if (!row || row.token_hash !== await sha256(t)) return null;
  delete row.token_hash;
  return row;
}

async function meu(req, env, h, aux) {
  const row = await doDono(await req.json().catch(() => ({})), env);
  if (!row || row.estado === "removido") return aux.json({ erro: "Link de gerenciamento inválido ou anúncio já removido." }, 404, h);
  const sai = lista(row);
  if (sai.estado === "reprovado") sai.motivo = row.parecer || null;
  delete sai.parecer;
  return aux.json({ anuncio: sai, prazo_dias: PRAZO_DIAS }, 200, { ...h, "cache-control": "no-store" });
}

async function meuAcao(req, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  const row = await doDono(b, env);
  if (!row || row.estado === "removido") return aux.json({ erro: "Link de gerenciamento inválido ou anúncio já removido." }, 404, h);
  const id = row.id;
  if (b.acao === "remover") {
    // some do site e as fotos são apagadas; o registro fica só com o estado, sem contato
    await env.DB.batch([
      env.DB.prepare("DELETE FROM mercado_fotos WHERE anuncio = ?").bind(id),
      env.DB.prepare("UPDATE mercado_anuncios SET estado = 'removido', whatsapp = NULL, instagram = NULL, email = NULL, fotos = '[]', atualizado = datetime('now') WHERE id = ?").bind(id),
    ]);
    return aux.json({ ok: true, estado: "removido" }, 200, h);
  }
  if (b.acao === "vendido") {
    if (row.estado !== "aprovado") return aux.json({ erro: "Só um anúncio publicado pode ser marcado como vendido." }, 400, h);
    await env.DB.prepare("UPDATE mercado_anuncios SET estado = 'vendido', atualizado = datetime('now') WHERE id = ?").bind(id).run();
    return aux.json({ ok: true, estado: "vendido" }, 200, h);
  }
  if (b.acao === "renovar") {
    if (row.estado !== "aprovado") return aux.json({ erro: "Só um anúncio publicado pode ser renovado." }, 400, h);
    await env.DB.prepare(`UPDATE mercado_anuncios SET expira = datetime('now', '+${PRAZO_DIAS} days'), atualizado = datetime('now') WHERE id = ?`).bind(id).run();
    return aux.json({ ok: true, estado: "aprovado" }, 200, h);
  }
  if (b.acao === "preco") {
    const preco = Number(b.preco);
    if (!Number.isInteger(preco) || preco < 100 || preco > 10000000) return aux.json({ erro: "Informe um preço entre R$ 1 e R$ 100.000." }, 400, h);
    if (!["aprovado", "pendente", "duvidoso"].includes(row.estado)) return aux.json({ erro: "Esse anúncio não aceita mais mudança de preço." }, 400, h);
    await env.DB.prepare("UPDATE mercado_anuncios SET preco = ?, atualizado = datetime('now') WHERE id = ?").bind(preco, id).run();
    return aux.json({ ok: true, preco }, 200, h);
  }
  return aux.json({ erro: "ação desconhecida" }, 400, h);
}

async function denunciar(req, env, h, aux) {
  const b = await req.json().catch(() => ({}));
  const id = Number(b.id), motivo = MOTIVOS.has(b.motivo) ? b.motivo : null;
  if (!Number.isInteger(id) || !motivo) return aux.json({ erro: "dados inválidos" }, 400, h);
  const ip = await aux.ipHash(req, env);
  const r = await env.DB.prepare("INSERT OR IGNORE INTO mercado_denuncias (anuncio, ip_hash, motivo) SELECT id, ?, ? FROM mercado_anuncios WHERE id = ? AND estado = 'aprovado'")
    .bind(ip, motivo, id).run();
  if (r.meta.changes) {
    const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM mercado_denuncias WHERE anuncio = ?").bind(id).first("n");
    if (n >= DENUNCIAS_PARA_TIRAR)
      await env.DB.prepare("UPDATE mercado_anuncios SET estado = 'duvidoso', parecer = ?, decidido_por = 'denuncias', decidido_em = datetime('now') WHERE id = ? AND estado = 'aprovado'")
        .bind(`Saiu do ar sozinho depois de ${n} denúncias. Confira antes de publicar de novo.`, id).run();
  }
  return aux.json({ ok: true }, 200, h);
}

async function moderacao(req, url, env, aux) {
  const rota = url.pathname.slice("/v1/moderacao/mercado/".length);
  const campos = `${PUBLICO_CAMPOS}, email, criado, parecer, decidido_por, decidido_em,
    (SELECT COUNT(*) FROM mercado_denuncias d WHERE d.anuncio = mercado_anuncios.id) AS denuncias,
    (SELECT group_concat(motivo) FROM mercado_denuncias d WHERE d.anuncio = mercado_anuncios.id) AS motivos`;
  if (rota === "fila") {
    const { results } = await env.DB.prepare(`SELECT ${campos} FROM mercado_anuncios WHERE estado IN ('pendente', 'duvidoso') ORDER BY criado ASC LIMIT 200`).all();
    return aux.json({ anuncios: results.map(lista) });
  }
  if (rota === "recentes") {
    const { results } = await env.DB.prepare(`SELECT ${campos} FROM mercado_anuncios ORDER BY criado DESC LIMIT 200`).all();
    return aux.json({ anuncios: results.map(lista) });
  }
  if (rota === "decidir" && req.method === "POST") {
    const { id, estado, parecer, por } = await req.json().catch(() => ({}));
    if (!Number.isInteger(id) || !ESTADOS_MOD.has(estado)) return aux.json({ erro: "dados inválidos" }, 400);
    const atual = await env.DB.prepare("SELECT estado FROM mercado_anuncios WHERE id = ?").bind(id).first("estado");
    if (!atual || atual === "removido") return aux.json({ erro: "anúncio removido pelo vendedor" }, 409);
    // a aprovação começa a contar o prazo; reaprovar depois de uma denúncia infundada mantém o prazo que já corria
    const prazo = estado === "aprovado" ? `, aprovado_em = COALESCE(aprovado_em, datetime('now')), expira = COALESCE(expira, datetime('now', '+${PRAZO_DIAS} days'))` : "";
    await env.DB.prepare(`UPDATE mercado_anuncios SET estado = ?, parecer = COALESCE(?, parecer), decidido_por = ?, decidido_em = datetime('now')${prazo} WHERE id = ?`)
      .bind(estado, parecer ? String(parecer).slice(0, 500) : null, por === "ia" ? "ia" : "editor", id).run();
    if (estado === "aprovado") await env.DB.prepare("DELETE FROM mercado_denuncias WHERE anuncio = ?").bind(id).run();
    return aux.json({ ok: true });
  }
  return aux.json({ erro: "rota desconhecida" }, 404);
}

// aux: {json, turnstileOk, ipHash, autorizado} vindos de index.js
export async function rotasMercado(req, url, env, h, aux, ctx) {
  const p = url.pathname;
  if (p.startsWith("/v1/moderacao/mercado/")) {
    if (!aux.autorizado(req, env)) return aux.json({ erro: "não autorizado" }, 401);
    return moderacao(req, url, env, aux);
  }
  if (p.startsWith("/v1/mercado/foto/") && req.method === "GET") return foto(url, env, ctx);
  if (req.method === "POST" && !h["access-control-allow-origin"]) return aux.json({ erro: "origem" }, 403, h);
  if (p === "/v1/mercado/lista" && req.method === "GET") return listar(env, h, aux);
  if (p === "/v1/mercado/anuncio" && req.method === "GET") return anuncio(url, env, h, aux);
  if (p === "/v1/mercado/anunciar" && req.method === "POST") return anunciar(req, env, h, aux);
  if (p === "/v1/mercado/meu" && req.method === "POST") return meu(req, env, h, aux);
  if (p === "/v1/mercado/meu/acao" && req.method === "POST") return meuAcao(req, env, h, aux);
  if (p === "/v1/mercado/denunciar" && req.method === "POST") return denunciar(req, env, h, aux);
  return aux.json({ erro: "rota desconhecida" }, 404, h);
}
