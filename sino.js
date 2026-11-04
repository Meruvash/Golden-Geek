// Sininho de notificações da Elite Boardgamers, em todas as páginas (botão .sino-btn do cabeçalho, tools/layout.py).
// A pessoa escolhe os temas (Black de Verdade, Notícias, Resenhas) e liga com um toque: Web Push do próprio
// navegador, sem app e sem cadastro. Quando algo impede (iPhone fora da Tela de Início, app embutido, notificação
// bloqueada), abre o guia com seta grande (guia-celular.js) mostrando onde tocar no navegador da pessoa.
(() => {
  const API = "https://api.eliteboardgamers.com.br";
  const SW = "/sw-black.js";
  const TEMAS = [
    ["black", "🔥 Black de Verdade", "jogo com desconto real de 20% ou mais"],
    ["noticias", "📰 Notícias", "as notas do dia, com fonte e opinião"],
    ["resenhas", "⭐ Resenhas", "cada resenha nova de jogo premiado"],
  ];
  const btn = document.querySelector(".sino-btn");
  if (!btn) return;
  btn.hidden = false;
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const app = matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  const embutido = /Instagram|FBAN|FBAV|FB_IAB|Line\/|WhatsApp|Telegram|TikTok|musical_ly|; wv\)/i.test(ua);
  const tem = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
               set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  let adiado = null;
  addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); adiado = e; });

  function guia(tipo) {
    if (window.EliteGuia) return EliteGuia.abrir(tipo);
    const s = document.createElement("script");
    s.src = "/guia-celular.js?v=2";
    s.onload = () => window.EliteGuia && EliteGuia.abrir(tipo);
    document.head.append(s);
  }
  const prazo = (p, ms, m) => Promise.race([p, new Promise((_, r) => setTimeout(() => r(new Error(m)), ms))]);
  const chave = (s) => { const p = "=".repeat((4 - s.length % 4) % 4), b = atob((s + p).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(b, (c) => c.charCodeAt(0)); };
  const post = (rota, corpo) => fetch(API + rota, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) });

  let atuais = (ls.get("eb-sino") || "").split(",").filter(Boolean);
  const marca = () => { btn.classList.toggle("on", atuais.length > 0); btn.setAttribute("aria-label", atuais.length ? "Notificações ligadas: escolher temas" : "Receber notificações"); };
  marca();

  // estado real, se já houver inscrição neste aparelho
  async function inscricao() {
    if (!tem) return null;
    const r = await navigator.serviceWorker.getRegistration(SW).catch(() => null) || await navigator.serviceWorker.getRegistration("/").catch(() => null);
    return r ? r.pushManager.getSubscription().catch(() => null) : null;
  }
  (async () => {
    const s = await inscricao();
    if (!s || Notification.permission !== "granted") { if (atuais.length) { atuais = []; ls.set("eb-sino", ""); marca(); } return; }
    try { const d = await (await post("/v1/push/temas", { endpoint: s.endpoint })).json(); atuais = d.temas || []; ls.set("eb-sino", atuais.join(",")); marca(); } catch (e) {}
  })();

  const CSS = `.sino-p{position:fixed;z-index:2147482000;right:12px;top:calc(var(--nav-h,49px) + 70px);width:min(360px,calc(100vw - 24px));background:#16181d;color:#eef1f5;border:2px solid #e3b23c;border-radius:16px;padding:16px;box-shadow:0 12px 40px rgba(0,0,0,.55);box-sizing:border-box;font-size:.95rem}
.sino-p h2{margin:0 36px 4px 0;font-size:1.08rem;color:#e3b23c}.sino-p>p{margin:0 0 10px;color:#c9ced8;font-size:.86rem;line-height:1.4}
.sino-p label{display:flex;gap:10px;align-items:flex-start;padding:9px 4px;border-top:1px solid #262a32;cursor:pointer;line-height:1.3}
.sino-p label small{display:block;color:#aab1bd;font-size:.8rem}
.sino-p input{width:22px;height:22px;flex:none;accent-color:#e3b23c;margin:1px 0 0}
.sino-ok{display:block;width:100%;min-height:48px;margin-top:10px;border:0;border-radius:11px;background:#e3b23c;color:#111;font-family:inherit;font-weight:900;font-size:1rem;cursor:pointer}
.sino-ok:disabled{opacity:.7}
.sino-lk{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.sino-lk button{flex:1 1 auto;min-height:40px;border:1px solid #3a3f48;border-radius:10px;background:none;color:#e9ecf1;font-family:inherit;font-weight:700;font-size:.84rem;cursor:pointer}
.sino-x{position:absolute;right:6px;top:6px;width:40px;height:40px;border:0;background:none;color:#c9ced8;font-size:1.2rem;cursor:pointer}
.sino-st{margin:10px 0 0;font-size:.88rem;line-height:1.4}.sino-st:empty{display:none}.sino-st.ok{color:#5fd38d;font-weight:700}.sino-st.erro{color:#ff9b8a}`;
  let painel = null;
  function abre() {
    if (painel) { fecha(); return; }
    if (!document.getElementById("sino-css")) { const st = document.createElement("style"); st.id = "sino-css"; st.textContent = CSS; document.head.append(st); }
    const novos = !atuais.length;
    painel = document.createElement("div");
    painel.className = "sino-p";
    painel.setAttribute("role", "dialog"); painel.setAttribute("aria-label", "Notificações da Elite");
    painel.innerHTML = `<button type="button" class="sino-x" aria-label="Fechar">✕</button><h2>🔔 Avisos no celular</h2>
<p>Chega como mensagem na barra de notificações. Sem app, sem cadastro; desligue quando quiser.</p>` +
      TEMAS.map(([id, nome, desc]) => `<label><input type="checkbox" value="${id}"${novos || atuais.includes(id) ? " checked" : ""}><span>${nome}<small>${desc}</small></span></label>`).join("") +
      `<button type="button" class="sino-ok">${atuais.length ? "Salvar escolha" : "🔔 Ativar avisos"}</button>
<p class="sino-st" role="status"></p>
<div class="sino-lk">${app ? "" : '<button type="button" data-a="instalar">📲 Pôr o Elite na tela inicial</button>'}${atuais.length ? '<button type="button" data-a="sair">Desligar tudo</button>' : ""}</div>`;
    document.body.append(painel);
    painel.addEventListener("click", clique);
    setTimeout(() => document.addEventListener("click", fora), 0);
    document.addEventListener("keydown", esc);
    btn.setAttribute("aria-expanded", "true");
    painel.querySelector(".sino-ok").focus();
  }
  function fecha() {
    if (!painel) return;
    painel.remove(); painel = null; btn.setAttribute("aria-expanded", "false");
    document.removeEventListener("click", fora); document.removeEventListener("keydown", esc);
  }
  const fora = (e) => { if (painel && !painel.contains(e.target) && !btn.contains(e.target) && !e.target.closest(".eg")) fecha(); };
  const esc = (e) => { if (e.key === "Escape") fecha(); };
  const status = (t, cls) => { const s = painel && painel.querySelector(".sino-st"); if (s) { s.textContent = t; s.className = "sino-st " + (cls || ""); } };

  async function clique(e) {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.classList.contains("sino-x")) return fecha();
    if (b.dataset.a === "instalar") {
      if (adiado) { adiado.prompt(); adiado = null; return; }
      if ("install" in navigator) { try { await navigator.install(); return; } catch (err) {} }
      return guia("instalar");
    }
    if (b.dataset.a === "sair") {
      const s = await inscricao();
      if (s) { await post("/v1/push/cancelar", { endpoint: s.endpoint }).catch(() => {}); await s.unsubscribe().catch(() => {}); }
      atuais = []; ls.set("eb-sino", ""); marca(); status("Avisos desligados neste aparelho.", "ok");
      return;
    }
    if (!b.classList.contains("sino-ok")) return;
    const temas = [...painel.querySelectorAll("input:checked")].map((i) => i.value);
    if (embutido) { status("Abra o site no navegador do celular para ligar os avisos (veja a seta).", "erro"); return guia("permissao"); }
    if (ios && !app) { status("No iPhone, os avisos só funcionam com o Elite na Tela de Início (veja a seta).", "erro"); return guia("instalar"); }
    if (!tem) { status("Este navegador não aceita avisos de sites. Use o Chrome (Android) ou o Safari pela Tela de Início (iPhone).", "erro"); return; }
    if (!temas.length) { // nenhum marcado = desligar
      const s = await inscricao();
      if (s) { await post("/v1/push/cancelar", { endpoint: s.endpoint }).catch(() => {}); await s.unsubscribe().catch(() => {}); }
      atuais = []; ls.set("eb-sino", ""); marca(); status("Avisos desligados neste aparelho.", "ok"); return;
    }
    const txt = b.textContent; b.disabled = true; b.textContent = "Ativando…";
    try {
      if (Notification.permission === "denied") { status("As notificações estão bloqueadas neste navegador. A seta mostra onde liberar.", "erro"); return guia("permissao"); }
      const p = await prazo(Notification.requestPermission(), 60000, "a pergunta de permissão não apareceu");
      if (p !== "granted") { status("Faltou permitir as notificações. A seta mostra onde liberar.", "erro"); return guia("permissao"); }
      const reg = await prazo(navigator.serviceWorker.register(SW), 15000, "o navegador não registrou o serviço de avisos");
      await prazo(navigator.serviceWorker.ready, 15000, "o serviço de avisos não ficou pronto");
      let s = await reg.pushManager.getSubscription();
      if (!s) {
        const k = (await (await prazo(fetch(API + "/v1/push/chave"), 15000, "sem resposta do servidor do Elite")).json()).chave;
        s = await prazo(reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: chave(k) }), 20000, "o serviço de push do navegador não respondeu");
      }
      const x = await prazo(post("/v1/push/inscrever", { sub: s.toJSON(), temas }), 15000, "sem resposta do servidor do Elite");
      if (!x.ok) throw new Error("o servidor do Elite recusou (" + x.status + ")");
      const novo = !atuais.length;
      atuais = (await x.json()).temas || temas; ls.set("eb-sino", atuais.join(",")); marca();
      status("Pronto! Os avisos escolhidos vão chegar neste aparelho.", "ok");
      if (novo) reg.showNotification("Avisos da Elite ligados", { body: "Você vai receber: " + TEMAS.filter((t) => atuais.includes(t[0])).map((t) => t[1].replace(/^\S+ /, "")).join(", ") + ".", icon: "/icon-192.png", tag: "ativado" });
    } catch (err) {
      status("Não deu para ativar: " + ((err && err.message) || err) + ". Tente de novo.", "erro");
    } finally { b.disabled = false; b.textContent = atuais.length ? "Salvar escolha" : txt; }
  }
  btn.addEventListener("click", abre);
})();
