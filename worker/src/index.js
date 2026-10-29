// Serviço de interações da Elite Boardgamers (Cloudflare Worker + banco D1): curtidas e comentários moderados.
//
// Público (só aceita chamadas do site):
//   GET  /v1/pagina?p=/caminho/        curtidas e comentários aprovados da página
//   POST /v1/curtir   {p, d, desfazer} curtir/descurtir; d = identificador aleatório do navegador
//   POST /v1/comentar {p, nome, texto, email, isca, turnstile}  entra na fila de moderação
// Moderação (cabeçalho Authorization: Bearer <MODERACAO_TOKEN>):
//   GET  /v1/moderacao/fila            pendentes e duvidosos, com todos os dados
//   GET  /v1/moderacao/recentes        últimos 200 comentários, qualquer estado
//   POST /v1/moderacao/decidir {id, estado, parecer, por}
//   GET  /painel                       painel de moderação (pede a senha no navegador)
//
// Variáveis: DB (D1), MODERACAO_TOKEN e TURNSTILE_SECRET (segredos), ORIGEM (site), DEV=1 só no teste local.

const MAX_POR_HORA = 5;
const PAGINA = /^\/[a-z0-9\-/]{1,180}\/$/;
const ESTADOS = new Set(["pendente", "aprovado", "reprovado", "duvidoso"]);

const json = (dados, status = 200, extra = {}) =>
  new Response(JSON.stringify(dados), { status, headers: { "content-type": "application/json; charset=utf-8", ...extra } });

function cors(req, env) {
  const origem = req.headers.get("origin") || "";
  const ok = origem === env.ORIGEM || (env.DEV === "1" && origem.startsWith("http://localhost"));
  return ok ? { "access-control-allow-origin": origem, "access-control-allow-methods": "GET,POST,OPTIONS",
                "access-control-allow-headers": "content-type,authorization", "vary": "origin" } : {};
}

async function sha256(texto) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

// IP nunca é guardado: só o hash com um sal do dia, para limitar abuso
async function ipHash(req, env) {
  const ip = req.headers.get("cf-connecting-ip") || "local";
  return sha256(`${ip}|${new Date().toISOString().slice(0, 10)}|${env.MODERACAO_TOKEN || "dev"}`);
}

async function turnstileOk(token, req, env) {
  if (env.DEV === "1" && !env.TURNSTILE_SECRET) return true;
  if (!token || !env.TURNSTILE_SECRET) return false;
  const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: req.headers.get("cf-connecting-ip") || "" }),
  });
  return (await r.json()).success === true;
}

async function pagina(url, env, h) {
  const p = url.searchParams.get("p") || "";
  if (!PAGINA.test(p)) return json({ erro: "página inválida" }, 400, h);
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM curtidas WHERE pagina = ?").bind(p).first("n");
  const { results } = await env.DB.prepare(
    "SELECT id, nome, texto, criado FROM comentarios WHERE pagina = ? AND estado = 'aprovado' ORDER BY criado ASC LIMIT 300").bind(p).all();
  return json({ curtidas: n || 0, comentarios: results }, 200, { ...h, "cache-control": "no-store" });
}

async function curtir(req, env, h) {
  const { p, d, desfazer } = await req.json().catch(() => ({}));
  if (!PAGINA.test(p || "") || !/^[a-z0-9-]{16,64}$/i.test(d || "")) return json({ erro: "dados inválidos" }, 400, h);
  if (desfazer) await env.DB.prepare("DELETE FROM curtidas WHERE pagina = ? AND dispositivo = ?").bind(p, d).run();
  else await env.DB.prepare("INSERT OR IGNORE INTO curtidas (pagina, dispositivo) VALUES (?, ?)").bind(p, d).run();
  const n = await env.DB.prepare("SELECT COUNT(*) AS n FROM curtidas WHERE pagina = ?").bind(p).first("n");
  return json({ curtidas: n || 0 }, 200, h);
}

async function comentar(req, env, h) {
  const b = await req.json().catch(() => ({}));
  const nome = String(b.nome || "").trim().replace(/\s+/g, " "), texto = String(b.texto || "").trim(), email = String(b.email || "").trim();
  if (b.isca) return json({ ok: true, estado: "pendente" }, 200, h);  // robô preencheu o campo escondido: finge que deu certo
  if (!PAGINA.test(b.p || "")) return json({ erro: "página inválida" }, 400, h);
  if (nome.length < 2 || nome.length > 60) return json({ erro: "Escreva um nome entre 2 e 60 letras." }, 400, h);
  if (texto.length < 3 || texto.length > 1500) return json({ erro: "O comentário precisa ter entre 3 e 1.500 caracteres." }, 400, h);
  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return json({ erro: "Esse e-mail não parece válido (ele é opcional)." }, 400, h);
  if (!(await turnstileOk(b.turnstile, req, env))) return json({ erro: "Não conseguimos confirmar que você não é um robô. Tente de novo." }, 400, h);
  const ip = await ipHash(req, env);
  const recentes = await env.DB.prepare("SELECT COUNT(*) AS n FROM comentarios WHERE ip_hash = ? AND criado > datetime('now', '-1 hour')").bind(ip).first("n");
  if (recentes >= MAX_POR_HORA) return json({ erro: "Muitos comentários seguidos. Tente de novo daqui a pouco." }, 429, h);
  await env.DB.prepare("INSERT INTO comentarios (pagina, nome, email, texto, ip_hash) VALUES (?, ?, ?, ?, ?)")
    .bind(b.p, nome, email || null, texto, ip).run();
  return json({ ok: true, estado: "pendente" }, 200, h);
}

function autorizado(req, env) {
  const t = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  return env.MODERACAO_TOKEN && t.length > 20 && t === env.MODERACAO_TOKEN;
}

async function moderacao(req, url, env) {
  if (!autorizado(req, env)) return json({ erro: "não autorizado" }, 401);
  if (url.pathname === "/v1/moderacao/fila") {
    const { results } = await env.DB.prepare(
      "SELECT id, pagina, nome, email, texto, criado, estado, parecer FROM comentarios WHERE estado IN ('pendente', 'duvidoso') ORDER BY criado ASC LIMIT 200").all();
    return json({ comentarios: results });
  }
  if (url.pathname === "/v1/moderacao/recentes") {
    const { results } = await env.DB.prepare(
      "SELECT id, pagina, nome, email, texto, criado, estado, parecer, decidido_por, decidido_em FROM comentarios ORDER BY criado DESC LIMIT 200").all();
    return json({ comentarios: results });
  }
  if (url.pathname === "/v1/moderacao/decidir" && req.method === "POST") {
    const { id, estado, parecer, por } = await req.json().catch(() => ({}));
    if (!Number.isInteger(id) || !ESTADOS.has(estado)) return json({ erro: "dados inválidos" }, 400);
    await env.DB.prepare("UPDATE comentarios SET estado = ?, parecer = COALESCE(?, parecer), decidido_por = ?, decidido_em = datetime('now') WHERE id = ?")
      .bind(estado, parecer ? String(parecer).slice(0, 500) : null, por === "ia" ? "ia" : "editor", id).run();
    return json({ ok: true });
  }
  return json({ erro: "rota desconhecida" }, 404);
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url), h = cors(req, env);
    try {
      if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
      if (url.pathname === "/painel") return new Response(PAINEL, { headers: { "content-type": "text/html; charset=utf-8", "x-robots-tag": "noindex" } });
      if (url.pathname.startsWith("/v1/moderacao/")) return moderacao(req, url, env);
      if (url.pathname === "/v1/pagina" && req.method === "GET") return pagina(url, env, h);
      if (url.pathname === "/v1/curtir" && req.method === "POST") return curtir(req, env, h);
      if (url.pathname === "/v1/comentar" && req.method === "POST") return comentar(req, env, h);
      return json({ erro: "rota desconhecida" }, 404, h);
    } catch (e) {
      return json({ erro: "falha interna" }, 500, h);
    }
  },
};

// Painel de moderação: página única que guarda a senha só nesta aba (sessionStorage) e conversa com a API acima.
const PAINEL = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Moderação de comentários · Elite Boardgamers</title><style>
*{box-sizing:border-box}body{margin:0;background:#000;color:#eceff3;font:15px/1.5 system-ui,sans-serif}main{max-width:900px;margin:0 auto;padding:20px 16px 60px}
h1{font-size:1.5rem;margin:0 0 4px;border-top:3px solid #e3b23c;padding-top:10px}p.sub{color:#a7afbb;margin:0 0 16px}
.abas{display:flex;gap:8px;margin:12px 0}.abas button,.b{font:inherit;font-weight:700;min-height:40px;padding:6px 14px;border-radius:999px;border:1px solid #3a3f48;background:#14171c;color:#fff;cursor:pointer}
.abas button[aria-pressed=true]{background:#e3b23c;color:#000;border-color:#e3b23c}
.c{background:#121419;border:1px solid #262a32;border-left:4px solid #5a6270;border-radius:10px;padding:14px;margin:10px 0}
.c.pendente{border-left-color:#e3b23c}.c.duvidoso{border-left-color:#ff8094}.c.aprovado{border-left-color:#3ddc84}.c.reprovado{border-left-color:#5a6270;opacity:.75}
.meta{font:12px ui-monospace,monospace;color:#a7afbb;text-transform:uppercase;letter-spacing:.04em}.meta a{color:#e3b23c}
.txt{white-space:pre-wrap;margin:8px 0;font-size:1rem}.parecer{font-size:.9rem;color:#c9b3ff;margin:6px 0}
.acoes{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.b.ok{background:#157a43;border-color:#157a43}.b.no{background:#7a1f2e;border-color:#7a1f2e}
input{font:inherit;padding:10px 12px;border-radius:8px;border:1px solid #3a3f48;background:#000;color:#fff;width:min(420px,100%)}
.vazio{color:#a7afbb;padding:20px 0}</style></head><body><main>
<h1>Moderação de comentários</h1><p class="sub">Elite Boardgamers · nada aparece no site sem estar aprovado.</p>
<form id="login" hidden><p>Senha de moderação:</p><input id="senha" type="password" autocomplete="current-password"> <button class="b">Entrar</button></form>
<div id="app" hidden><div class="abas"><button data-aba="fila" aria-pressed="true">Esperando decisão</button><button data-aba="recentes" aria-pressed="false">Todos os recentes</button><button class="b" id="sair" type="button">Sair</button></div><div id="lista"></div></div>
<script>
const $=s=>document.querySelector(s),esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
let aba='fila';const tok=()=>sessionStorage.getItem('mod');
const api=(c,o={})=>fetch('/v1/moderacao/'+c,{...o,headers:{'authorization':'Bearer '+tok(),'content-type':'application/json'}});
async function carrega(){const r=await api(aba);if(r.status===401){sessionStorage.removeItem('mod');return entrar()}
 const {comentarios}=await r.json();$('#app').hidden=false;$('#login').hidden=true;
 $('#lista').innerHTML=comentarios.length?comentarios.map(c=>'<div class="c '+c.estado+'" data-id="'+c.id+'"><div class="meta">'+esc(c.estado)+' · '+esc(c.criado)+' UTC · <a href="https://eliteboardgamers.com.br'+esc(c.pagina)+'" target="_blank">'+esc(c.pagina)+'</a></div>'
 +'<div><b>'+esc(c.nome)+'</b>'+(c.email?' · '+esc(c.email):'')+'</div><div class="txt">'+esc(c.texto)+'</div>'+(c.parecer?'<div class="parecer">Parecer: '+esc(c.parecer)+(c.decidido_por?' ('+esc(c.decidido_por)+')':'')+'</div>':'')
 +'<div class="acoes"><button class="b ok" data-e="aprovado">Aprovar</button><button class="b no" data-e="reprovado">Reprovar</button></div></div>').join(''):'<p class="vazio">Nenhum comentário esperando decisão.</p>'}
function entrar(){$('#app').hidden=true;$('#login').hidden=false;$('#senha').focus()}
$('#login').addEventListener('submit',e=>{e.preventDefault();sessionStorage.setItem('mod',$('#senha').value);carrega()});
$('#sair').addEventListener('click',()=>{sessionStorage.removeItem('mod');entrar()});
document.querySelectorAll('[data-aba]').forEach(b=>b.addEventListener('click',()=>{aba=b.dataset.aba;document.querySelectorAll('[data-aba]').forEach(x=>x.setAttribute('aria-pressed',x===b));carrega()}));
$('#lista').addEventListener('click',async e=>{const b=e.target.closest('[data-e]');if(!b)return;const id=+b.closest('.c').dataset.id;
 b.disabled=true;await api('decidir',{method:'POST',body:JSON.stringify({id,estado:b.dataset.e,por:'editor'})});carrega()});
tok()?carrega():entrar();
</script></main></body></html>`;
