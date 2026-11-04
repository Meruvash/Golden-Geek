// Mercado da Elite (serviço em worker/src/mercado.js, na Cloudflare). Escrito à mão, como o interacoes.js;
// as páginas que o carregam são geradas por tools/build_mercado.py e dizem qual parte rodar em data-pagina.
// Páginas: lista (vitrine com busca e filtros), anuncio (?id=N, com o botão Comprar), anunciar (formulário),
// meu (gerenciar pelo link secreto, conectar o Mercado Pago, ver vendas e compras) e pedido (?p=N&k=..., depois do pagamento).
(() => {
  const raiz = document.querySelector("[data-mercado]");
  if (!raiz) return;
  const API = raiz.dataset.api, TS = raiz.dataset.turnstile, RAIZ = raiz.dataset.raiz, SITE = raiz.dataset.site;
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const sem = t => String(t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const reais = c => (c / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: c % 100 ? 2 : 0, maximumFractionDigits: 2 });
  const guarda = {
    get(k, padrao) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch { return padrao; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } },
  };
  const COND = { lacrado: "Lacrado", "como-novo": "Como novo", "usado-otimo": "Usado, ótimo estado", "usado-bom": "Usado, bom estado", "usado-marcas": "Usado, com marcas de uso" };
  const COND_CURTO = { lacrado: "Lacrado", "como-novo": "Como novo", "usado-otimo": "Usado · ótimo", "usado-bom": "Usado · bom", "usado-marcas": "Usado · marcas" };
  const ENT = { ambos: "Envio ou retirada", envio: "Só envio", retirada: "Só retirada" };
  const IDI = { pt: "Português", en: "Inglês", independente: "Independente de idioma", outro: "Outro idioma" };
  const ICON = {
    pino: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.4"/>',
    caixa: '<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
    troca: '<path d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5"/>',
    idioma: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
    estado: '<path d="M4.5 12.5l4.5 4.5L19.5 6.5"/>',
    camera: '<path d="M4 8h3l1.6-2.4h6.8L17 8h3v11H4V8Z"/><circle cx="12" cy="13" r="3.4"/>',
    zap: '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19l-4.4 1Z"/><path d="M9.2 8.6c.3-.5.8-.5 1-.1l.7 1.5c.1.3 0 .6-.2.8l-.4.4c.5 1.1 1.4 2 2.5 2.5l.4-.4c.2-.2.5-.3.8-.2l1.5.7c.4.2.4.7-.1 1-.7.5-1.6.6-2.4.3a7 7 0 0 1-4.2-4.2c-.3-.8-.2-1.7.4-2.3Z"/>',
    insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/>',
    capa: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z"/>',
    nao: '<path d="M6 6l12 12M18 6L6 18"/>',
    lapis: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m14 6 4 4"/>',
    lixo: '<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    ver: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    vendido: '<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  };
  const ic = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICON[n]}</svg>`;
  const foto = k => `${API}/v1/mercado/foto/${encodeURIComponent(k)}`;
  const quando = iso => {
    if (!iso) return "";
    const d = new Date(iso.replace(" ", "T") + "Z"), dias = Math.floor((Date.now() - d) / 864e5);
    if (dias <= 0) return "hoje";
    if (dias === 1) return "ontem";
    if (dias < 30) return `há ${dias} dias`;
    return d.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
  };
  const dataLonga = iso => new Date(iso.replace(" ", "T") + "Z").toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  const api = async (caminho, op = {}) => {
    const r = await fetch(API + caminho, op);
    const d = await r.json().catch(() => ({}));
    if (!r.ok) throw Object.assign(new Error(d.erro || "Falha no serviço."), { status: r.status });
    return d;
  };
  const postJSON = (caminho, corpo) => api(caminho, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(corpo) });

  // jogos da nossa base (nome, ano, menor preço de novo visto pelo Black de Verdade, capa, resenha), baixados uma vez
  let jogosP;
  const jogos = () => jogosP ||= fetch(RAIZ + "jogos.json").then(r => r.json()).then(d => {
    const lista = d.jogos.map(([slug, nome, ano, preco, dia, capa, resenha]) => ({ slug, nome, ano, preco, dia, capa, resenha, k: sem(nome) }));
    return { lista, por: new Map(lista.map(j => [j.slug, j])) };
  }).catch(() => ({ lista: [], por: new Map() }));
  // preço de novo só vale se a leitura for recente (até 4 dias)
  const precoNovo = j => j && j.preco && j.dia && (Date.now() - Date.parse(j.dia + "T12:00:00-03:00")) < 4 * 864e5 ? Math.round(j.preco * 100) : null;

  const textoFrete = a => a.entrega === "retirada" ? "Só retirada" : (a.frete_gratis ? "Frete grátis" : "Envia") + (a.entrega === "ambos" ? " ou retirada" : "");
  const estrelas = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
  const reputacao = a => a.avaliacoes ? `<span class="mc-rep">★ ${String(a.nota).replace(".", ",")} <small>(${a.avaliacoes})</small></span>` : a.vendas ? `<span class="mc-rep"><small>${a.vendas} venda${a.vendas > 1 ? "s" : ""}</small></span>` : "";
  const mascaraCpf = v => { const d = v.replace(/\D/g, "").slice(0, 11); return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4"); };
  const mascaraCep = v => { const d = v.replace(/\D/g, "").slice(0, 8); return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d; };
  // preenche rua, bairro, cidade e UF pelo CEP (ViaCEP, serviço público dos Correios); se falhar, a pessoa digita
  async function viaCep(cep, campos) {
    const d = cep.replace(/\D/g, ""); if (d.length !== 8) return;
    try {
      const r = await (await fetch(`https://viacep.com.br/ws/${d}/json/`)).json(); if (r.erro) return;
      const poe = (el, v) => { if (el && v && !el.value) el.value = v; };
      poe(campos.rua, r.logradouro); poe(campos.bairro, r.bairro); poe(campos.cidade, r.localidade); poe(campos.uf, r.uf);
      if (campos.numero && !campos.numero.value) campos.numero.focus();
    } catch { /* sem rede: segue manual */ }
  }
  const compras = { ler: () => guarda.get("eb-mercado-compras", []), poe(c) { const l = this.ler().filter(x => x.p !== c.p); l.unshift(c); guarda.set("eb-mercado-compras", l.slice(0, 50)); } };

  // anti-robô: o Turnstile da Cloudflare só é baixado quando a pessoa começa a preencher um formulário
  const turnstiles = new Map();
  let tsP;
  function turnstile(alvo) {
    if (!TS) return Promise.resolve(null);
    tsP ||= new Promise(ok => { window.__ebTsM = ok; const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__ebTsM&render=explicit"; s.async = true; document.head.append(s); });
    return tsP.then(() => { if (!turnstiles.has(alvo)) turnstiles.set(alvo, window.turnstile.render(alvo, { sitekey: TS, language: "pt-br", theme: "light" })); return turnstiles.get(alvo); });
  }
  const tokenTs = alvo => (turnstiles.has(alvo) && window.turnstile ? window.turnstile.getResponse(turnstiles.get(alvo)) : "") || "";
  const resetTs = alvo => { if (turnstiles.has(alvo) && window.turnstile) window.turnstile.reset(turnstiles.get(alvo)); };

  function cartao(a, { link = true, novo = null } = {}) {
    const capa = a.fotos && a.fotos[0];
    const selos = `<span class="mc-selos"><span class="mc-selo ${esc(a.condicao)}">${esc(COND_CURTO[a.condicao] || "")}</span>${a.troca ? '<span class="mc-selo troca">Troca</span>' : ""}${a.estado === "vendido" ? '<span class="mc-selo vendido">Vendido</span>' : ""}${a.reservado ? '<span class="mc-selo reservado">Reservado</span>' : ""}</span>`;
    const img = a._previa ? (a._previa[0] ? `<img src="${a._previa[0]}" alt="">` : `<span class="sem">${ic("camera")}</span>`)
      : capa ? `<img src="${foto(capa)}" alt="Foto de ${esc(a.jogo)} anunciado por ${esc(a.vendedor)}" loading="lazy" decoding="async">` : "";
    const eco = novo && a.preco < novo ? `<span class="mc-eco">${reais(novo - a.preco)} abaixo do novo</span>` : "";
    const corpo = `<span class="mc-foto">${img}${selos}</span><span class="mc-txt"><b class="mc-nome">${esc(a.jogo || "Nome do jogo")}</b>${a.edicao ? `<span class="mc-ed">${esc(a.edicao)}</span>` : ""}`
      + `<span class="mc-preco">${a.preco ? reais(a.preco) : "R$ –"}</span>${eco}`
      + `<span class="mc-onde">${ic("pino")}${esc(a.cidade || "Cidade")}${a.uf ? "/" + esc(a.uf) : ""} · ${esc(textoFrete(a))}</span>`
      + `<span class="mc-quem"><i class="mc-av">${esc((a.vendedor || "?").trim()[0] || "?")}</i><span>${esc(a.vendedor || "Seu nome")}${a.aprovado_em ? " · " + quando(a.aprovado_em) : ""}</span>${reputacao(a)}</span></span>`;
    return `<li class="mc-card">${link ? `<a href="${RAIZ}anuncio/?id=${a.id}">${corpo}</a>` : `<div>${corpo}</div>`}</li>`;
  }

  /* ---------- vitrine ---------- */
  async function lista() {
    const grade = $(".mc-grade"), n = $(".mc-n"), vazio = $(".mc-vazio"), erro = $(".mc-erro"), barra = $(".mc-busca");
    const campos = { q: $("[name=q]", barra), cond: $("[name=cond]", barra), uf: $("[name=uf]", barra), troca: $("[name=troca]", barra), envio: $("[name=envio]", barra), ordem: $("[name=ordem]", barra) };
    const limpar = $(".mc-limpar");
    let todos = [], base = { por: new Map() };
    // filtros vêm do endereço (dá para compartilhar uma busca)
    const u = new URLSearchParams(location.search);
    for (const [k, el] of Object.entries(campos)) { const v = u.get(k); if (v) el.type === "checkbox" ? (el.checked = v === "1") : (el.value = v); }
    const estado = () => ({ q: campos.q.value.trim(), cond: campos.cond.value, uf: campos.uf.value, troca: campos.troca.checked, envio: campos.envio.checked, ordem: campos.ordem.value });
    function desenha() {
      const f = estado(), q = sem(f.q).split(/\s+/).filter(Boolean);
      let r = todos.filter(a => (!f.cond || a.condicao === f.cond) && (!f.uf || a.uf === f.uf) && (!f.troca || a.troca) && (!f.envio || a.entrega !== "retirada")
        && q.every(p => a._k.includes(p)));
      if (f.ordem === "menor") r.sort((x, y) => x.preco - y.preco);
      else if (f.ordem === "maior") r.sort((x, y) => y.preco - x.preco);
      else if (f.ordem === "az") r.sort((x, y) => x.jogo.localeCompare(y.jogo, "pt-BR"));
      grade.innerHTML = r.map(a => cartao(a, { novo: precoNovo(base.por.get(a.jogo_slug)) })).join("");
      const filtrando = Boolean(f.q || f.cond || f.uf || f.troca || f.envio);
      limpar.hidden = !filtrando;
      [campos.cond, campos.uf, campos.ordem].forEach(s => s.classList.toggle("on", !!s.value));
      n.textContent = !todos.length ? "" : r.length === todos.length ? `${todos.length} ${todos.length === 1 ? "anúncio" : "anúncios"} no ar` : `${r.length} de ${todos.length} anúncios`;
      vazio.hidden = r.length > 0;
      if (!r.length) {
        $(".mc-vazio b").textContent = todos.length ? "Nenhum anúncio com esses filtros" : "Nenhum anúncio por aqui ainda";
        $(".mc-vazio-t").textContent = todos.length ? "Tente tirar algum filtro ou buscar por outro nome." : "Que tal ser a primeira pessoa a anunciar?";
      }
      const p = new URLSearchParams();
      for (const [k, v] of Object.entries(f)) if (v) p.set(k, v === true ? "1" : v);
      history.replaceState(null, "", location.pathname + (p.toString() ? "?" + p : "") + location.hash);
    }
    let t;
    campos.q.addEventListener("input", () => { clearTimeout(t); t = setTimeout(desenha, 120); });
    barra.addEventListener("change", desenha);
    limpar.addEventListener("click", () => { campos.q.value = ""; campos.cond.value = campos.uf.value = campos.ordem.value = ""; campos.troca.checked = campos.envio.checked = false; desenha(); campos.q.focus(); });
    async function carrega() {
      erro.hidden = true;
      try {
        const [d, b] = await Promise.all([api("/v1/mercado/lista"), jogos()]);
        base = b;
        todos = d.anuncios.map(a => ({ ...a, _k: sem([a.jogo, a.edicao, a.cidade, a.uf, a.vendedor].join(" ")) }));
        const st = { total: todos.length, cidades: new Set(todos.map(a => sem(a.cidade) + a.uf)).size, troca: todos.filter(a => a.troca).length, lacrados: todos.filter(a => a.condicao === "lacrado").length };
        $$("[data-n]").forEach(b => { b.textContent = st[b.dataset.n].toLocaleString("pt-BR"); });
        desenha();
      } catch {
        grade.innerHTML = ""; n.textContent = ""; erro.hidden = false;
      }
    }
    $(".mc-tentar").addEventListener("click", carrega);
    carrega();
  }

  /* ---------- anúncio ---------- */
  async function anuncio() {
    const art = $(".mc-an"), erro = $(".mc-erro"), id = Number(new URLSearchParams(location.search).get("id"));
    const falha = (t) => { art.hidden = true; erro.hidden = false; if (t) $(".mc-erro-t").textContent = t; document.title = "Anúncio não encontrado · Mercado da Elite"; };
    if (!Number.isInteger(id) || id < 1) return falha("O endereço do anúncio está incompleto.");
    let a, base;
    try { [{ anuncio: a }, base] = await Promise.all([api(`/v1/mercado/anuncio?id=${id}`), jogos()]); }
    catch (ex) { return falha(ex.status === 404 ? ex.message : "Não conseguimos carregar o anúncio agora. Tente de novo em alguns minutos."); }
    const jogo = base.por.get(a.jogo_slug), novo = precoNovo(jogo);
    document.title = `${a.jogo} por ${reais(a.preco)} · Mercado da Elite`;
    $(".mc-tit").textContent = a.jogo;
    if (a.edicao) { $(".mc-ed", art).hidden = false; $(".mc-ed", art).textContent = a.edicao; }
    $(".mc-preco", art).textContent = reais(a.preco);
    $(".mc-selos-l").innerHTML = `<span class="mc-selo ${esc(a.condicao)}">${esc(COND[a.condicao])}</span>${a.troca ? '<span class="mc-selo troca">Aceita troca</span>' : ""}`;
    $(".mc-fatos").innerHTML = [["estado", "Estado", COND[a.condicao]], ["idioma", "Idioma", IDI[a.idioma]], ["caixa", "Entrega", textoFrete(a)], ["pino", "Onde", `${a.cidade}/${a.uf}`]]
      .map(([i, t, v]) => `<div><dt>${ic(i)}${t}</dt><dd>${esc(v)}</dd></div>`).join("");
    $(".mc-vend").innerHTML = `<i class="mc-av">${esc(a.vendedor.trim()[0])}</i><div><b>${esc(a.vendedor)}</b><small>${esc(a.cidade)}/${esc(a.uf)} · anunciou ${quando(a.aprovado_em)}</small>`
      + `<small>${a.avaliacoes ? `${reputacao(a)} · ${a.vendas} venda${a.vendas === 1 ? "" : "s"} concluída${a.vendas === 1 ? "" : "s"}` : a.vendas ? `${a.vendas} venda${a.vendas === 1 ? "" : "s"} concluída${a.vendas === 1 ? "" : "s"}` : "Ainda sem vendas avaliadas no Mercado"}</small></div>`;
    if (a.ultimas_avaliacoes && a.ultimas_avaliacoes.length) {
      $(".mc-aval-b").hidden = false;
      $(".mc-avals").innerHTML = a.ultimas_avaliacoes.map(v => `<li><b aria-label="${v.nota} de 5">${estrelas(v.nota)}</b><time>${quando(v.criado)}</time>${v.comentario ? `<br>${esc(v.comentario)}` : ""}</li>`).join("");
    }
    if (a.estado === "vendido") {
      $(".mc-vendido").hidden = false; $(".mc-denuncia").hidden = true;
    } else if (a.reservado) {
      $(".mc-reservado").hidden = false;
    } else if (a.compra) {
      compraAnuncio(a);
    }
    if (novo) {
      const dif = novo - a.preco, dia = new Date(jogo.dia + "T12:00:00-03:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
      $(".mc-novo").hidden = false;
      $(".mc-novo").innerHTML = `<b>Novo nas lojas: a partir de ${reais(novo)}</b><span>Menor preço visto pelo radar do <a href="${SITE}black/">Black de Verdade</a> em ${dia}${dif > 0 ? `. Este anúncio sai ${reais(dif)} mais barato.` : "."}</span>`;
    }
    if (jogo && jogo.resenha) { const r = $(".mc-res"); r.hidden = false; r.href = `${SITE}${jogo.slug}/`; $("span", r).textContent = `Leia a resenha de ${jogo.nome} na Elite`; }
    if (a.descricao) { $(".mc-desc-b").hidden = false; $(".mc-desc").textContent = a.descricao; }
    $(".mc-quando").textContent = `Anúncio nº ${a.id} · publicado em ${dataLonga(a.aprovado_em)}`;
    const cpw = $(".cpw"); if (cpw) cpw.dataset.texto = `${a.jogo} por ${reais(a.preco)} no Mercado da Elite`;
    // galeria: deslizar no celular, setas e miniaturas no computador, toque para tela cheia
    const trilho = $(".mc-trilho"), mini = $(".mc-mini"), cont = $(".mc-cont"), fotos = a.fotos;
    trilho.innerHTML = fotos.map((k, i) => `<button type="button" data-i="${i}" aria-label="Ampliar foto ${i + 1} de ${fotos.length}"><img src="${foto(k)}" alt="Foto ${i + 1} de ${esc(a.jogo)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async"></button>`).join("");
    mini.innerHTML = fotos.length > 1 ? fotos.map((k, i) => `<button type="button" data-i="${i}" aria-label="Foto ${i + 1}" aria-current="${i === 0}"><img src="${foto(k)}" alt="" loading="lazy"></button>`).join("") : "";
    let atual = 0;
    const vai = i => { atual = (i + fotos.length) % fotos.length; trilho.scrollTo({ left: atual * trilho.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };
    const marca = () => { cont.textContent = fotos.length > 1 ? `${atual + 1}/${fotos.length}` : ""; $$("button", mini).forEach((b, i) => b.setAttribute("aria-current", String(i === atual))); };
    trilho.addEventListener("scroll", () => { const i = Math.round(trilho.scrollLeft / Math.max(1, trilho.clientWidth)); if (i !== atual) { atual = i; marca(); } }, { passive: true });
    mini.addEventListener("click", ev => { const b = ev.target.closest("button"); if (b) { vai(+b.dataset.i); atual = +b.dataset.i; marca(); } });
    $(".mc-seta.a").addEventListener("click", () => vai(atual - 1));
    $(".mc-seta.p").addEventListener("click", () => vai(atual + 1));
    if (fotos.length < 2) $$(".mc-seta").forEach(b => b.remove());
    trilho.addEventListener("keydown", ev => { if (ev.key === "ArrowRight") vai(atual + 1); if (ev.key === "ArrowLeft") vai(atual - 1); });
    marca();
    const zoom = $(".mc-zoom");
    trilho.addEventListener("click", ev => { const b = ev.target.closest("button"); if (!b || !zoom.showModal) return; $("img", zoom).src = foto(fotos[+b.dataset.i]); $("img", zoom).alt = `Foto ${+b.dataset.i + 1} de ${a.jogo}`; zoom.showModal(); });
    $(".fechar", zoom).addEventListener("click", () => zoom.close());
    zoom.addEventListener("click", ev => { if (ev.target === zoom) zoom.close(); });
    // denúncia
    const dlg = $(".mc-den-dlg"), st = $(".mc-st", dlg);
    $(".mc-denuncia").addEventListener("click", () => { st.textContent = ""; st.className = "mc-st"; dlg.showModal ? dlg.showModal() : alert("Denúncias pelo Instagram @eliteboardgamers."); });
    $("form", dlg).addEventListener("submit", async ev => {
      if (ev.submitter && ev.submitter.value === "cancelar") return;
      ev.preventDefault();
      const motivo = new FormData(ev.target).get("motivo");
      if (!motivo) { st.className = "mc-st erro"; st.textContent = "Escolha um motivo."; return; }
      try { await postJSON("/v1/mercado/denunciar", { id: a.id, motivo }); st.className = "mc-st ok"; st.textContent = "Obrigado! A moderação vai olhar este anúncio."; setTimeout(() => dlg.close(), 1600); }
      catch { st.className = "mc-st erro"; st.textContent = "Não deu para enviar agora. Tente de novo."; }
    });
    art.removeAttribute("aria-busy");
  }

  // caixa de compra do anúncio: entrega, frete cotado pelo CEP (Melhor Envio), total e a janela com os dados do comprador
  function compraAnuncio(a) {
    const box = $(".mc-compra"), ent = $(".mc-ent"), total = $(".mc-total"), dlg = $(".mc-compra-dlg"), form = $("form", dlg), st = $(".mc-st", dlg);
    const caixaCep = $(".mc-cep"), inCep = $("[name=cep]", caixaCep), stF = $(".mc-st-frete"), fretes = $(".mc-fretes"), botao = $(".mc-comprar");
    const podeEnviar = a.entrega !== "retirada" && a.envio_site, podeRetirar = a.entrega !== "envio";
    if (!podeEnviar && !podeRetirar) return;
    box.hidden = false;
    let opcoes = [], cepCotado = "";
    if (podeEnviar && podeRetirar) {
      ent.hidden = false;
      ent.innerHTML = `<label class="mc-op"><input type="radio" name="receber" value="envio" checked>Receber pelo correio<small>${a.frete_gratis ? "Frete grátis" : "Frete calculado pelo CEP"}</small></label>`
        + `<label class="mc-op"><input type="radio" name="receber" value="retirada">Retirar em mãos<small>${esc(a.cidade)}/${esc(a.uf)}</small></label>`;
    }
    const escolha = () => podeEnviar && podeRetirar ? $("[name=receber]:checked", ent).value : podeEnviar ? "envio" : "retirada";
    const opcao = () => opcoes.find(o => String(o.servico) === ($("[name=frete]:checked", fretes) || {}).value);
    const mostra = () => {
      const e = escolha(), o = opcao();
      caixaCep.hidden = e !== "envio";
      if (e === "envio" && !o) { total.innerHTML = "Informe o seu CEP para ver o frete e o prazo."; botao.disabled = true; botao.lastChild.textContent = "Comprar"; return; }
      const v = a.preco + (e === "envio" ? o.preco : 0);
      total.innerHTML = `Total: <b>${reais(v)}</b>${e === "envio" ? (o.preco ? ` (jogo ${reais(a.preco)} + envio ${reais(o.preco)})` : " com frete grátis") + ` · chega em até ${o.prazo} dias úteis depois da postagem` : " · retirada em mãos"}`;
      botao.disabled = false; botao.lastChild.textContent = `Comprar por ${reais(v)}`;
    };
    async function calcula() {
      const cep = inCep.value.replace(/\D/g, "");
      if (cep.length !== 8) { stF.className = "mc-st mc-st-frete erro"; stF.textContent = "CEP com 8 números."; return; }
      stF.className = "mc-st mc-st-frete"; stF.textContent = "Calculando…"; fretes.innerHTML = "";
      try {
        const d = await postJSON("/v1/mercado/frete", { id: a.id, cep });
        opcoes = d.opcoes; cepCotado = cep; stF.textContent = "";
        guarda.set("eb-mercado-cep", cep);
        fretes.innerHTML = opcoes.map((o, i) => `<label class="mc-op"><input type="radio" name="frete" value="${o.servico}"${i ? "" : " checked"}><span>${esc(o.empresa || "")} ${esc(o.nome)}<small>até ${o.prazo} dias úteis</small></span><b>${o.preco ? reais(o.preco) : "Grátis"}</b></label>`).join("");
      } catch (ex) { opcoes = []; stF.className = "mc-st mc-st-frete erro"; stF.textContent = ex.message; }
      mostra();
    }
    inCep.addEventListener("input", () => { inCep.value = mascaraCep(inCep.value); if (inCep.value.replace(/\D/g, "").length === 8 && inCep.value.replace(/\D/g, "") !== cepCotado) calcula(); });
    $(".mc-calc").addEventListener("click", calcula);
    ent.addEventListener("change", mostra); fretes.addEventListener("change", mostra);
    const cepSalvo = guarda.get("eb-mercado-cep", "");
    if (cepSalvo && podeEnviar) { inCep.value = mascaraCep(cepSalvo); calcula(); }
    mostra();
    // janela de compra: dados de contato e, no envio, o endereço completo para a etiqueta
    const dados = guarda.get("eb-mercado-comprador", {}), f = form.elements;
    for (const k of ["nome", "email", "whatsapp", "e_nome", "e_rua", "e_numero", "e_complemento", "e_bairro", "e_cidade", "e_uf"]) if (dados[k] && f[k]) f[k].value = dados[k];
    f.whatsapp.addEventListener("input", ev => { ev.target.value = mascaraZap(ev.target.value); });
    f.e_cpf.addEventListener("input", ev => { ev.target.value = mascaraCpf(ev.target.value); });
    const fsEnd = $(".mc-end", form);
    botao.addEventListener("click", () => {
      st.textContent = ""; st.className = "mc-st";
      const e = escolha(), o = opcao();
      fsEnd.hidden = e !== "envio";
      if (e === "envio") { if (!f.e_nome.value) f.e_nome.value = f.nome.value; viaCep(cepCotado, { rua: f.e_rua, bairro: f.e_bairro, cidade: f.e_cidade, uf: f.e_uf, numero: null }); }
      $(".mc-resumo", dlg).innerHTML = `<b>${esc(a.jogo)}</b> · ${reais(a.preco + (e === "envio" ? o.preco : 0))} · ${e === "envio" ? `${esc(o.empresa || "")} ${esc(o.nome)} para o CEP ${mascaraCep(cepCotado)}` : "retirar em " + esc(a.cidade) + "/" + esc(a.uf)}`;
      if (!dlg.showModal) return alert("Seu navegador não abre a janela de compra. Atualize o navegador para comprar.");
      dlg.showModal(); turnstile($(".mc-ts", dlg));
    });
    form.addEventListener("submit", async ev => {
      if (ev.submitter && ev.submitter.value === "cancelar") return;
      ev.preventDefault();
      const erro = m => { st.className = "mc-st erro"; st.textContent = m; }, e = escolha();
      if (f.nome.value.trim().length < 2) return erro("Escreva seu nome.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) return erro("Informe um e-mail válido.");
      if (f.whatsapp.value.replace(/\D/g, "").length < 10) return erro("Informe seu WhatsApp com DDD.");
      if (e === "envio") {
        if (f.e_cpf.value.replace(/\D/g, "").length !== 11) return erro("Informe o CPF de quem recebe (a transportadora exige).");
        if (!f.e_rua.value.trim() || !f.e_numero.value.trim() || !f.e_bairro.value.trim() || !f.e_cidade.value.trim() || f.e_uf.value.trim().length !== 2) return erro("Preencha o endereço completo.");
      }
      if (!f.aceite.checked) return erro("Aceite as regras do Mercado para continuar.");
      const token = tokenTs($(".mc-ts", dlg));
      if (TS && !token) return erro("Confirme que você não é um robô (quadrinho acima).");
      guarda.set("eb-mercado-comprador", Object.fromEntries(["nome", "email", "whatsapp", "e_nome", "e_rua", "e_numero", "e_complemento", "e_bairro", "e_cidade", "e_uf"].map(k => [k, f[k].value.trim()])));
      const b2 = ev.submitter || $("button[value=pagar]", form); b2.disabled = true;
      st.className = "mc-st"; st.textContent = "Abrindo o pagamento…";
      const corpo = { id: a.id, nome: f.nome.value.trim(), email: f.email.value.trim(), whatsapp: f.whatsapp.value, entrega: e, aceite: "1", isca: f.site.value, turnstile: token };
      if (e === "envio") Object.assign(corpo, { cep: cepCotado, servico: opcao().servico, endereco: { nome: f.e_nome.value.trim(), cpf: f.e_cpf.value, cep: cepCotado,
        rua: f.e_rua.value.trim(), numero: f.e_numero.value.trim(), complemento: f.e_complemento.value.trim(), bairro: f.e_bairro.value.trim(), cidade: f.e_cidade.value.trim(), uf: f.e_uf.value.trim().toUpperCase() } });
      try {
        const r = await postJSON("/v1/mercado/comprar", corpo);
        compras.poe({ p: r.pedido, k: r.chave, jogo: a.jogo, criado: new Date().toISOString() });
        location.href = r.url;
      } catch (ex) { erro(ex.message); resetTs($(".mc-ts", dlg)); b2.disabled = false; }
    });
  }

  /* ---------- reduzir foto no aparelho: lado maior de até 1600 px, webp (ou jpeg) de até ~650 KB ---------- */
  async function reduz(arquivo) {
    let fonte;
    try { fonte = await createImageBitmap(arquivo, { imageOrientation: "from-image" }); }
    catch {
      fonte = await new Promise((ok, falha) => { const i = new Image(); i.onload = () => ok(i); i.onerror = () => falha(new Error("formato")); i.src = URL.createObjectURL(arquivo); });
    }
    const w0 = fonte.width || fonte.naturalWidth, h0 = fonte.height || fonte.naturalHeight;
    if (!w0 || !h0) throw new Error("formato");
    for (const lado of [1600, 1280, 1024]) {
      const s = Math.min(1, lado / Math.max(w0, h0)), w = Math.round(w0 * s), h = Math.round(h0 * s);
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.drawImage(fonte, 0, 0, w, h);
      for (const q of [0.84, 0.74, 0.64]) {
        let b = await new Promise(r => c.toBlob(r, "image/webp", q));
        if (!b || b.type !== "image/webp") b = await new Promise(r => c.toBlob(r, "image/jpeg", q));  // Safari antigo não gera webp
        if (b && b.size <= 650 * 1024) return b;
      }
    }
    throw new Error("grande");
  }

  const centavos = txt => {
    let s = String(txt || "").replace(/[^\d,.]/g, "");
    if (!s) return NaN;
    if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
    else if (/\.\d{3}$/.test(s) || (s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
    return Math.round(parseFloat(s) * 100);
  };
  const mascaraZap = v => {
    let d = v.replace(/\D/g, "");
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
    d = d.slice(0, 11);
    if (d.length <= 2) return d ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    const meio = d.length === 11 ? 7 : 6;
    return `(${d.slice(0, 2)}) ${d.slice(2, meio)}-${d.slice(meio)}`;
  };

  // leva o vendedor para a página do Mercado Pago autorizar a conta dele; a volta cai em /mercado/meu/?mp=...
  async function conectaMP(id, t, st) {
    st.className = st.className.replace(/ ?(erro|ok)/g, ""); st.textContent = "Abrindo o Mercado Pago…";
    try { const { url } = await postJSON("/v1/mercado/mp/conectar", { id, t }); location.href = url; }
    catch (ex) { st.className += " erro"; st.textContent = ex.message; }
  }

  /* ---------- anunciar ---------- */
  function anunciar() {
    const form = $(".mc-form"), prev = $(".mc-prev .mc-grade"), stEnvio = $(".mc-st-envio"), stFotos = $(".mc-st-fotos");
    const lista = $(".mc-fotos"), add = $(".mc-add"), arquivo = $("input[type=file]", add);
    const inJogo = form.elements.jogo, inSlug = form.elements.jogo_slug, sug = $("#mc-sug"), escolhido = $(".mc-escolhido");
    const fotos = [];  // {blob, url}
    let processando = 0;

    // rascunho dos campos de texto neste aparelho (fotos não)
    const CAMPOS_RASCUNHO = ["jogo", "jogo_slug", "edicao", "preco_txt", "cep_origem", "idioma", "descricao", "vendedor", "cidade", "uf", "whatsapp", "instagram", "email"];
    const rasc = guarda.get("eb-mercado-rascunho", {});
    for (const k of CAMPOS_RASCUNHO) if (rasc[k] && form.elements[k]) form.elements[k].value = rasc[k];
    if (rasc.condicao) { const r = form.querySelector(`[name=condicao][value="${rasc.condicao}"]`); if (r) r.checked = true; }
    if (rasc.entrega) { const r = form.querySelector(`[name=entrega][value="${rasc.entrega}"]`); if (r) r.checked = true; }
    if (rasc.troca) form.elements.troca.checked = true;
    if (rasc.pacote) { const r = form.querySelector(`[name=pacote][value="${rasc.pacote}"]`); if (r) r.checked = true; }
    if (rasc.frete_gratis) form.elements.frete_gratis.checked = true;
    const salvaRascunho = () => {
      const r = Object.fromEntries(CAMPOS_RASCUNHO.map(k => [k, form.elements[k].value]));
      r.condicao = (form.querySelector("[name=condicao]:checked") || {}).value; r.entrega = (form.querySelector("[name=entrega]:checked") || {}).value; r.troca = form.elements.troca.checked;
      r.pacote = (form.querySelector("[name=pacote]:checked") || {}).value; r.frete_gratis = form.elements.frete_gratis.checked;
      guarda.set("eb-mercado-rascunho", r);
    };

    function dados() {
      const f = form.elements;
      return { jogo: f.jogo.value.trim(), edicao: f.edicao.value.trim(), condicao: (form.querySelector("[name=condicao]:checked") || {}).value || "usado-otimo",
        preco: centavos(f.preco_txt.value) || 0, troca: f.troca.checked, entrega: (form.querySelector("[name=entrega]:checked") || {}).value,
        cidade: f.cidade.value.trim(), uf: f.uf.value, vendedor: f.vendedor.value.trim(), _previa: fotos.map(x => x.url) };
    }
    const campoFrete = $(".mc-frete", form), liquido = $(".mc-liquido", form);
    const atualizaPrevia = () => {
      const d = dados();
      campoFrete.hidden = d.entrega === "retirada";
      d.frete_gratis = d.entrega !== "retirada" && form.elements.frete_gratis.checked;
      prev.innerHTML = cartao(d, { link: false });
      liquido.textContent = d.preco >= 100 ? `Neste anúncio: você recebe ${reais(d.preco - Math.round(d.preco * 0.05))} pelo jogo${d.frete_gratis ? ", menos o valor da etiqueta" : ""}, antes da tarifa do Mercado Pago.` : "";
    };
    const contDesc = () => { $(".mc-cont-t").textContent = `${form.elements.descricao.value.length.toLocaleString("pt-BR")}/1.500`; };

    // busca do jogo na nossa base
    let opcoes = [], sel = -1;
    const fechaSug = () => { sug.hidden = true; inJogo.setAttribute("aria-expanded", "false"); inJogo.removeAttribute("aria-activedescendant"); sel = -1; };
    const marcaEscolhido = j => {
      inSlug.value = j ? j.slug : "";
      escolhido.hidden = !j;
      if (j) escolhido.innerHTML = `${j.capa ? `<img src="${SITE}${esc(j.capa)}" alt="">` : ""}<span>Jogo da nossa base: <b>${esc(j.nome)}</b>${j.ano ? ` (${j.ano})` : ""}</span>`;
    };
    const escolhe = i => { const j = opcoes[i]; if (j) { inJogo.value = j.nome; marcaEscolhido(j); } else marcaEscolhido(null); fechaSug(); atualizaPrevia(); salvaRascunho(); };
    inJogo.addEventListener("input", async () => {
      marcaEscolhido(null);
      const q = sem(inJogo.value.trim());
      if (q.length < 2) return fechaSug();
      const { lista: js } = await jogos();
      const comeca = [], contem = [];
      for (const j of js) { const p = j.k.indexOf(q); if (p === 0) comeca.push(j); else if (p > 0) contem.push(j); if (comeca.length >= 8) break; }
      opcoes = [...comeca, ...contem].slice(0, 8);
      sug.innerHTML = opcoes.map((j, i) => `<li role="option" id="mc-op-${i}" data-i="${i}">${j.capa ? `<img src="${SITE}${esc(j.capa)}" alt="" loading="lazy">` : `<span class="sem">${ic("caixa")}</span>`}<span>${esc(j.nome)}<small>${j.ano || ""}${j.resenha ? " · tem resenha na Elite" : ""}</small></span></li>`).join("")
        + `<li role="option" class="livre" data-i="-1" id="mc-op-livre">Não está na lista? Use “${esc(inJogo.value.trim())}” mesmo.</li>`;
      sug.hidden = false; inJogo.setAttribute("aria-expanded", "true"); sel = -1;
    });
    inJogo.addEventListener("keydown", ev => {
      if (sug.hidden) return;
      const itens = $$("li", sug);
      if (ev.key === "ArrowDown" || ev.key === "ArrowUp") {
        ev.preventDefault(); sel = (sel + (ev.key === "ArrowDown" ? 1 : -1) + itens.length) % itens.length;
        itens.forEach((li, i) => li.setAttribute("aria-selected", String(i === sel))); inJogo.setAttribute("aria-activedescendant", itens[sel].id); itens[sel].scrollIntoView({ block: "nearest" });
      } else if (ev.key === "Enter" && sel >= 0) { ev.preventDefault(); escolhe(+itens[sel].dataset.i); }
      else if (ev.key === "Escape") fechaSug();
    });
    sug.addEventListener("mousedown", ev => ev.preventDefault());
    sug.addEventListener("click", ev => { const li = ev.target.closest("li"); if (li) escolhe(+li.dataset.i); });
    inJogo.addEventListener("blur", () => setTimeout(fechaSug, 100));
    if (inSlug.value) jogos().then(({ por }) => marcaEscolhido(por.get(inSlug.value)));

    // fotos
    function desenhaFotos() {
      lista.innerHTML = fotos.map((f, i) => `<li><img src="${f.url}" alt="Foto ${i + 1}">${i === 0 ? '<span class="capa-s">Capa</span>' : ""}<span class="acs">`
        + (i ? `<button type="button" data-capa="${i}" aria-label="Usar a foto ${i + 1} como capa">${ic("capa")}</button>` : "")
        + `<button type="button" data-tira="${i}" aria-label="Tirar a foto ${i + 1}">${ic("nao")}</button></span></li>`).join("")
        + Array.from({ length: processando }, () => '<li class="proc">Preparando…</li>').join("");
      add.hidden = fotos.length + processando >= 6;
      atualizaPrevia();
    }
    async function recebe(arqs) {
      stFotos.textContent = ""; stFotos.className = "mc-st mc-st-fotos";
      const vagas = 6 - fotos.length - processando, novos = [...arqs].filter(a => a.type.startsWith("image/") || /\.(heic|heif|jpe?g|png|webp)$/i.test(a.name));
      if (novos.length > vagas) { stFotos.className = "mc-st mc-st-fotos erro"; stFotos.textContent = "No máximo 6 fotos: ficaram só as primeiras."; }
      const fila = novos.slice(0, Math.max(0, vagas));
      processando += fila.length; desenhaFotos();
      for (const a of fila) {
        try { const blob = await reduz(a); fotos.push({ blob, url: URL.createObjectURL(blob) }); }
        catch { stFotos.className = "mc-st mc-st-fotos erro"; stFotos.textContent = "Uma foto não pôde ser lida neste aparelho. Tente tirar de novo ou usar JPG."; }
        processando--; desenhaFotos();
      }
    }
    arquivo.addEventListener("change", () => { recebe(arquivo.files); arquivo.value = ""; });
    ["dragenter", "dragover"].forEach(t => add.addEventListener(t, ev => { ev.preventDefault(); add.classList.add("sobre"); }));
    ["dragleave", "drop"].forEach(t => add.addEventListener(t, ev => { ev.preventDefault(); add.classList.remove("sobre"); }));
    add.addEventListener("drop", ev => recebe(ev.dataTransfer.files));
    lista.addEventListener("click", ev => {
      const b = ev.target.closest("button"); if (!b) return;
      if (b.dataset.tira) { const [f] = fotos.splice(+b.dataset.tira, 1); URL.revokeObjectURL(f.url); }
      else if (b.dataset.capa) { const [f] = fotos.splice(+b.dataset.capa, 1); fotos.unshift(f); }
      desenhaFotos();
    });

    const zap = form.elements.whatsapp;
    zap.addEventListener("input", () => { zap.value = mascaraZap(zap.value); });
    form.elements.cep_origem.addEventListener("input", ev => { ev.target.value = mascaraCep(ev.target.value); });
    form.addEventListener("input", ev => { if (ev.target.name === "descricao") contDesc(); if (ev.target.type !== "file") { atualizaPrevia(); salvaRascunho(); } });
    form.addEventListener("change", () => { atualizaPrevia(); salvaRascunho(); });

    const alvoTs = $(".mc-ts", form);
    form.addEventListener("focusin", () => turnstile(alvoTs), { once: true });

    const erro = (msg, campo) => {
      stEnvio.className = "mc-st mc-st-envio erro"; stEnvio.textContent = msg;
      $$("[data-erro]", form).forEach(x => x.removeAttribute("data-erro"));
      if (campo) { const el = form.elements[campo] || $(campo, form); const c = el && (el.closest?.(".mc-campo") || el[0]?.closest(".mc-campo")); if (c) c.dataset.erro = ""; (el.focus ? el : el[0])?.focus?.(); (el.scrollIntoView ? el : el[0])?.scrollIntoView?.({ block: "center" }); }
    };
    form.addEventListener("submit", async ev => {
      ev.preventDefault();
      const f = form.elements, preco = centavos(f.preco_txt.value), zapD = f.whatsapp.value.replace(/\D/g, "");
      if (f.jogo.value.trim().length < 2) return erro("Diga qual é o jogo.", "jogo");
      if (processando) return erro("Espere as fotos terminarem de carregar.");
      if (!fotos.length) { add.scrollIntoView({ block: "center" }); return erro("Coloque pelo menos uma foto do jogo."); }
      if (!form.querySelector("[name=condicao]:checked")) { form.querySelector("[name=condicao]").scrollIntoView({ block: "center" }); return erro("Escolha o estado do jogo."); }
      if (!(preco >= 100 && preco <= 10000000)) return erro("Informe um preço entre R$ 1 e R$ 100.000.", "preco_txt");
      const entrega = form.querySelector("[name=entrega]:checked").value, cepO = f.cep_origem.value.replace(/\D/g, "");
      if (entrega !== "retirada" && cepO.length !== 8) return erro("Informe o CEP de onde o jogo sai (8 números): ele calcula o frete.", "cep_origem");
      if (f.vendedor.value.trim().length < 2) return erro("Escreva seu nome ou apelido.", "vendedor");
      if (f.cidade.value.trim().length < 2) return erro("Informe a cidade.", "cidade");
      if (!f.uf.value) return erro("Escolha o estado (UF).", "uf");
      if (zapD && (zapD.length < 10 || zapD.length > 13)) return erro("Esse WhatsApp não parece válido. Use DDD + número.", "whatsapp");
      if (!zapD && !f.instagram.value.trim()) return erro("Deixe pelo menos um contato: WhatsApp ou Instagram.", "whatsapp");
      if (!f.aceite.checked) return erro("Para anunciar, aceite as regras do Mercado.", "aceite");
      const token = tokenTs(alvoTs);
      if (TS && !token) { turnstile(alvoTs); return erro("Confirme que você não é um robô (quadrinho acima do botão)."); }
      const fd = new FormData();
      for (const k of ["jogo", "jogo_slug", "edicao", "idioma", "descricao", "vendedor", "cidade", "uf", "whatsapp", "instagram", "email"]) fd.append(k, f[k].value.trim());
      fd.append("condicao", form.querySelector("[name=condicao]:checked").value);
      fd.append("entrega", entrega);
      if (entrega !== "retirada") { fd.append("cep_origem", cepO); fd.append("pacote", form.querySelector("[name=pacote]:checked").value); fd.append("frete_gratis", f.frete_gratis.checked ? "1" : "0"); }
      fd.append("preco", String(preco)); fd.append("troca", f.troca.checked ? "1" : "0"); fd.append("aceite", "1");
      fd.append("isca", f.site.value); fd.append("turnstile", token);
      fotos.forEach((x, i) => fd.append("foto", x.blob, `foto-${i + 1}.${x.blob.type === "image/webp" ? "webp" : "jpg"}`));
      const botao = $("button[type=submit]", form); botao.disabled = true;
      stEnvio.className = "mc-st mc-st-envio"; stEnvio.textContent = "Enviando o anúncio…";
      try {
        const r = await api("/v1/mercado/anunciar", { method: "POST", body: fd });
        const meus = guarda.get("eb-mercado-meus", []);
        meus.unshift({ id: r.id, t: r.token, jogo: f.jogo.value.trim(), criado: new Date().toISOString() });
        guarda.set("eb-mercado-meus", meus.slice(0, 50));
        guarda.set("eb-mercado-rascunho", {});
        const link = `${location.origin}${RAIZ.replace(/^(\.\.\/)+/, "/")}meu/#${r.id}.${r.token}`.replace(/([^:])\/\/+/g, "$1/");
        const ok = $(".mc-ok");
        $("input", ok).value = link;
        $(".mc-zap-eu", ok).href = "https://wa.me/?text=" + encodeURIComponent(`Meu link para gerenciar o anúncio de ${f.jogo.value.trim()} no Mercado da Elite (não compartilhe): ${link}`);
        $(".mc-conectar", ok).onclick = () => conectaMP(r.id, r.token, $(".mc-st-con", ok));
        $(".mc-form-l").hidden = true; ok.hidden = false; ok.scrollIntoView({ block: "start" }); $("h2", ok).setAttribute("tabindex", "-1"); $("h2", ok).focus();
      } catch (ex) {
        erro(ex.message || "Não deu para enviar agora. Tente de novo.");
        resetTs(alvoTs);
      } finally { botao.disabled = false; }
    });
    $(".mc-copiar").addEventListener("click", async ev => {
      const i = $(".mc-ok input"); let ok = false;
      try { await navigator.clipboard.writeText(i.value); ok = true; } catch { i.select(); try { ok = document.execCommand("copy"); } catch { /* segue */ } }
      ev.currentTarget.lastChild.textContent = ok ? "Copiado!" : "Copie o link acima";
    });
    contDesc(); desenhaFotos();
  }

  /* ---------- meus anúncios ---------- */
  async function meu() {
    const ul = $(".mc-meus"), vazio = $(".mc-vazio"), st = $(".mc-st-meu");
    let meus = guarda.get("eb-mercado-meus", []);
    const m = location.hash.match(/^#(\d+)\.([A-Za-z0-9_-]{20,64})$/);
    if (m && !meus.some(x => String(x.id) === m[1])) { meus.unshift({ id: +m[1], t: m[2], jogo: "", criado: new Date().toISOString() }); }
    if (m && guarda.set("eb-mercado-meus", meus)) history.replaceState(null, "", location.pathname);  // guardado no aparelho: tira o segredo do endereço
    const mpVolta = new URLSearchParams(location.search).get("mp");
    const AVISO_MP = { ok: ["ok", "Conta do Mercado Pago conectada! Assim que o anúncio for aprovado, ele aparece no Mercado."],
      recusado: ["erro", "A conexão com o Mercado Pago foi cancelada. Sem ela o anúncio não aparece no Mercado."],
      expirou: ["erro", "A conexão demorou demais e expirou. Tente conectar de novo."], erro: ["erro", "Não conseguimos conectar a conta do Mercado Pago. Tente de novo."] };
    if (AVISO_MP[mpVolta]) { st.className = `mc-st mc-st-meu ${AVISO_MP[mpVolta][0]}`; st.textContent = AVISO_MP[mpVolta][1]; history.replaceState(null, "", location.pathname); }
    const ESTADO = { pendente: "Em análise", duvidoso: "Em análise", aprovado: "No ar", vendido: "Vendido", reprovado: "Não aprovado", removido: "Removido", vencido: "Vencido" };
    async function desenha() {
      if (!meus.length) { ul.innerHTML = ""; vazio.hidden = false; return; }
      vazio.hidden = true;
      const aviso = st.textContent; if (!aviso) { st.className = "mc-st mc-st-meu"; st.textContent = "Carregando…"; }
      const res = await Promise.all(meus.map(x => postJSON("/v1/mercado/meu", { id: x.id, t: x.t }).then(d => ({ x, a: d.anuncio, vendas: d.vendas || [], pagamento: d.pagamento })).catch(ex => ({ x, erro: ex }))));
      cacheVendas = Object.fromEntries(res.filter(z => z.a).flatMap(z => z.vendas.map(v => [v.id, { ...v, jogo: z.a.jogo, anuncio: z.a.id }])));
      if (!aviso) st.textContent = "";
      ul.innerHTML = res.map(({ x, a, erro, vendas, pagamento }) => {
        if (erro) return `<li class="mc-meu" data-id="${x.id}"><span class="sem"></span><div><h3>${esc(x.jogo || "Anúncio nº " + x.id)}</h3><span class="est removido">${erro.status === 404 ? "Removido" : "Sem conexão"}</span><p>${erro.status === 404 ? "Este anúncio foi removido ou o link não vale mais." : "Não conseguimos falar com o serviço agora."}</p></div><div class="acs"><button type="button" data-acao="esquecer">${ic("nao")}Tirar desta lista</button></div></li>`;
        const vencido = a.estado === "aprovado" && a.expira && Date.parse(a.expira.replace(" ", "T") + "Z") < Date.now();
        const est = vencido ? "vencido" : a.estado;
        let info = "";
        if (est === "aprovado") info = `No ar até ${dataLonga(a.expira)}.`;
        else if (est === "pendente" || est === "duvidoso") info = "Esperando a moderação. Ele aparece no Mercado assim que for aprovado.";
        else if (est === "reprovado") info = a.motivo ? `Motivo: ${a.motivo}` : "O anúncio não seguiu as regras do Mercado.";
        else if (est === "vencido") info = "Passou o prazo de 60 dias. Renove para ele voltar ao ar.";
        else if (est === "vendido") info = vendas.some(v => v.estado === "pago") ? "Vendido pelo site. Combine a entrega com o comprador." : "Marcado como vendido.";
        const acs = [];
        if (est === "aprovado") acs.push(`<a href="${RAIZ}anuncio/?id=${a.id}">${ic("ver")}Ver anúncio</a>`);
        if (["aprovado", "pendente", "duvidoso", "vencido"].includes(est)) acs.push(`<button type="button" data-acao="editar-preco">${ic("lapis")}Mudar preço</button>`);
        if (est === "aprovado" || est === "vencido") acs.push(`<button type="button" data-acao="renovar">${ic("relogio")}Renovar por mais 60 dias</button>`);
        acs.push(`<button type="button" class="perigo" data-acao="remover">${ic("lixo")}Remover</button>`);
        const ativo = ["aprovado", "pendente", "duvidoso", "vencido"].includes(est);
        const mpb = !ativo ? "" : a.mp_conectado ? `<div class="mc-mp ok">${ic("estado")}Mercado Pago conectado: você recebe as vendas na sua conta.</div>`
          : `<div class="mc-mp">${pagamento === false ? "Os pagamentos do Mercado ainda estão sendo ligados. Volte em breve para conectar sua conta." : `Conecte sua conta do Mercado Pago para o anúncio aparecer. <button type="button" data-acao="conectar">Conectar Mercado Pago</button>`}</div>`;
        const vendasH = vendas.length ? `<ul class="mc-vendas">${vendas.map(v => venda(v, a)).join("")}</ul>` : "";
        return `<li class="mc-meu" data-id="${a.id}">${a.fotos[0] ? `<img src="${foto(a.fotos[0])}" alt="">` : '<span class="sem"></span>'}<div><h3>${esc(a.jogo)}</h3><span class="est ${est}">${ESTADO[est]}</span><p><b>${reais(a.preco)}</b> · ${esc(COND[a.condicao])} · ${esc(a.cidade)}/${esc(a.uf)}</p><p>${esc(info)}</p></div>`
          + mpb + vendasH + `<div class="acs">${acs.join("")}</div><div class="preco-ed" hidden><label>Novo preço R$ <input inputmode="decimal" value="${(a.preco / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}"></label><button type="button" class="mc-btn pri" data-acao="preco" style="min-height:40px">Salvar</button></div></li>`;
      }).join("");
    }
    let cacheVendas = {};
    // uma venda em Meus anúncios: etapas, o que fazer agora, etiqueta com QR e o contato do comprador
    function venda(v, a) {
      const ETAPA = { processando: 0, pago: 1, enviado: 2, entregue: 3, concluido: 4, problema: 1, devolvido: 0 };
      const passo = ETAPA[v.estado] ?? 0, envio = v.entrega === "envio";
      const nomes = envio ? ["Pago", "Postar", "A caminho", "Concluído"] : ["Pago", "Combinar", "Entregue", "Concluído"];
      const etapas = `<ol class="mc-etapas">${nomes.map((n, i) => `<li class="${i < passo ? "feito" : i === passo ? (v.estado === "problema" || v.estado === "devolvido" ? "parou" : "agora") : ""}">${n}</li>`).join("")}</ol>`;
      const pago = ["pago", "enviado", "entregue", "concluido", "problema"].includes(v.estado);
      const recebe = v.valor - v.taxa - (v.frete_gratis ? v.frete_custo : 0);
      let corpo = `<b>Venda nº ${v.id}</b> · ${reais(v.valor)}${envio ? ` · ${esc(v.servico_nome || "envio")}` : " · retirada em mãos"}<br>`;
      if (v.estado === "processando") corpo += "O Mercado Pago está confirmando o pagamento. Aguarde para enviar.";
      if (pago) corpo += `Comprador: ${esc(v.comprador)} · <a href="https://wa.me/${esc(v.whatsapp)}?text=${encodeURIComponent(`Olá, ${v.comprador}! Aqui é ${a.vendedor}, do Mercado da Elite. Recebi o pagamento de ${a.jogo}.${envio ? " Vou postar e te mando o rastreio." : " Vamos combinar a retirada?"}`)}" target="_blank" rel="noopener">chamar no WhatsApp</a><br>`
        + `Você recebe ${reais(recebe)} no Mercado Pago (comissão da Elite ${reais(v.taxa)}${v.frete_gratis ? `, etiqueta ${reais(v.frete_custo)}` : ""}), menos a tarifa do Mercado Pago.`;
      if (v.estado === "devolvido") corpo += "O pagamento foi devolvido ao comprador.";
      if (v.estado === "problema") corpo += `<br><b>O comprador relatou um problema:</b> ${esc(v.problema || "")}. A moderação da Elite vai falar com vocês.`;
      let etq = "";
      if (envio && v.estado === "pago") {
        const prazo = v.prazo_envio ? `<span class="mc-prazo">Poste até ${dataLonga(v.prazo_envio)}</span>, ou o pagamento volta para o comprador.` : "";
        etq = v.etiqueta_url
          ? `<div class="mc-etq"><span class="mc-qr" data-url="${esc(v.etiqueta_url)}"></span><div><p><b>Etiqueta pronta.</b> Imprima, cole na caixa e leve a uma agência dos Correios ou ponto da transportadora. Sem impressora? Aponte a câmera do celular para o QR e imprima em qualquer lugar.</p><p>${prazo}</p>`
            + `<a class="mc-btn pri" href="${esc(v.etiqueta_url)}" target="_blank" rel="noopener">Abrir a etiqueta para imprimir</a></div></div>`
          : `<div class="mc-etq" style="grid-template-columns:1fr"><div><p><b>Próximo passo: gerar a etiqueta.</b> O frete já foi pago pelo comprador. ${prazo}</p>${v.envio_estado === "erro" ? `<p style="color:#a3223a">A última tentativa falhou: confira o endereço e tente de novo.</p>` : ""}`
            + `<button type="button" class="mc-btn pri" data-acao="etiqueta" data-venda="${v.id}">Gerar etiqueta</button></div></div>`;
      }
      if (envio && v.rastreio) etq += `<div class="mc-rastreio">Rastreio: <b>${esc(v.rastreio)}</b>${v.rastreio_url ? `<a href="${esc(v.rastreio_url)}" target="_blank" rel="noopener">Acompanhar a entrega</a>` : ""}</div>`;
      return `<li>${etapas}<p style="margin:10px 0 0">${corpo}</p>${etq}</li>`;
    }
    // o QR de cada etiqueta (mercado/qr.js) é desenhado depois que a lista aparece
    new MutationObserver(() => $$(".mc-qr:empty").forEach(el => { try { el.innerHTML = window.qrElite.qrSvg(el.dataset.url, { modulo: 4, margem: 2, titulo: "QR para abrir a etiqueta no celular" }); } catch { el.remove(); } }))
      .observe(ul, { childList: true, subtree: true });
    // janela de geração da etiqueta: dados de quem envia (o CPF não fica guardado)
    const dlgE = $(".mc-etq-dlg"), fE = $("form", dlgE).elements, stE = $(".mc-st", dlgE);
    const salvo = guarda.get("eb-mercado-remetente", {});
    for (const k of ["r_nome", "r_cep", "r_rua", "r_numero", "r_complemento", "r_bairro", "r_cidade", "r_uf"]) if (salvo[k]) fE[k].value = salvo[k];
    fE.r_cpf.addEventListener("input", ev => { ev.target.value = mascaraCpf(ev.target.value); });
    fE.r_cep.addEventListener("input", ev => { ev.target.value = mascaraCep(ev.target.value); if (ev.target.value.length === 9) viaCep(ev.target.value, { rua: fE.r_rua, bairro: fE.r_bairro, cidade: fE.r_cidade, uf: fE.r_uf, numero: fE.r_numero }); });
    let vendaAtual = null;
    $("form", dlgE).addEventListener("submit", async ev => {
      if (ev.submitter && ev.submitter.value === "cancelar") return;
      ev.preventDefault();
      const v = vendaAtual, x = meus.find(y => y.id === v.anuncio), erroE = m => { stE.className = "mc-st erro"; stE.textContent = m; };
      if (fE.r_cpf.value.replace(/\D/g, "").length !== 11) return erroE("Informe o seu CPF (a transportadora exige na etiqueta).");
      const rem = { nome: fE.r_nome.value.trim(), cpf: fE.r_cpf.value, cep: fE.r_cep.value, rua: fE.r_rua.value.trim(), numero: fE.r_numero.value.trim(),
        complemento: fE.r_complemento.value.trim(), bairro: fE.r_bairro.value.trim(), cidade: fE.r_cidade.value.trim(), uf: fE.r_uf.value.trim().toUpperCase() };
      if (fE.r_lembrar.checked) guarda.set("eb-mercado-remetente", Object.fromEntries(["r_nome", "r_cep", "r_rua", "r_numero", "r_complemento", "r_bairro", "r_cidade", "r_uf"].map(k => [k, fE[k].value.trim()])));
      const b2 = ev.submitter; if (b2) b2.disabled = true;
      stE.className = "mc-st"; stE.textContent = "Comprando e gerando a etiqueta…";
      try {
        await postJSON("/v1/mercado/meu/etiqueta", { id: x.id, t: x.t, pedido: v.id, remetente: rem });
        fE.r_cpf.value = ""; dlgE.close();
        await desenha();
        st.className = "mc-st mc-st-meu ok"; st.textContent = "Etiqueta gerada! Imprima pelo botão ou pelo QR.";
      } catch (e2) { erroE(e2.message); }
      finally { if (b2) b2.disabled = false; }
    });
    ul.addEventListener("click", async ev => {
      const b = ev.target.closest("[data-acao]"); if (!b) return;
      if (b.dataset.acao === "etiqueta") {
        vendaAtual = cacheVendas[+b.dataset.venda];
        $(".mc-resumo", dlgE).innerHTML = `<b>${esc(vendaAtual.jogo)}</b> · venda nº ${vendaAtual.id} · ${esc(vendaAtual.servico_nome || "")}`;
        stE.textContent = ""; stE.className = "mc-st";
        return dlgE.showModal ? dlgE.showModal() : alert("Atualize o navegador para gerar a etiqueta.");
      }
      const li = b.closest(".mc-meu"), id = +li.dataset.id, x = meus.find(y => y.id === id), acao = b.dataset.acao;
      if (acao === "esquecer") { meus = meus.filter(y => y.id !== id); guarda.set("eb-mercado-meus", meus); return desenha(); }
      if (acao === "conectar") return conectaMP(id, x.t, st);
      if (acao === "editar-preco") { const p = $(".preco-ed", li); p.hidden = !p.hidden; if (!p.hidden) $("input", p).focus(); return; }
      if (acao === "remover" && !confirm("Remover o anúncio de vez? As fotos são apagadas e não dá para desfazer.")) return;
      if (acao === "vendido" && !confirm("Marcar como vendido? O contato deixa de aparecer no anúncio.")) return;
      const corpo = { id, t: x.t, acao };
      if (acao === "preco") { corpo.preco = centavos($(".preco-ed input", li).value); }
      b.disabled = true;
      try {
        await postJSON("/v1/mercado/meu/acao", corpo);
        if (acao === "remover") { meus = meus.filter(y => y.id !== id); guarda.set("eb-mercado-meus", meus); }
        await desenha();
        st.className = "mc-st mc-st-meu ok"; st.textContent = { remover: "Anúncio removido.", vendido: "Parabéns pela venda!", renovar: "Renovado por mais 60 dias.", preco: "Preço atualizado." }[acao];
      } catch (e2) { st.className = "mc-st mc-st-meu erro"; st.textContent = e2.message; b.disabled = false; }
    });
    desenha();
    // compras feitas neste aparelho
    const cs = compras.ler();
    if (cs.length) {
      $(".mc-compras").hidden = false;
      $(".mc-compras-l").innerHTML = cs.map(c => `<li class="mc-meu"><span class="sem"></span><div><h3>${esc(c.jogo)}</h3><p>Pedido nº ${c.p} · ${quando(c.criado.replace("T", " ").slice(0, 19))}</p></div><div class="acs"><a href="${RAIZ}pedido/?p=${c.p}&k=${encodeURIComponent(c.k)}">${ic("ver")}Ver pedido</a></div></li>`).join("");
    }
  }

  /* ---------- pedido: etapas da compra (pagamento, envio, entrega, conclusão) ---------- */
  async function pedido() {
    const q = new URLSearchParams(location.search), p = Number(q.get("p")), k = q.get("k") || "";
    const pagamento = q.get("payment_id") || q.get("collection_id") || "";
    const sec = $(".mc-pedido"), erro = $(".mc-erro"), aval = $(".mc-avaliar"), dlgP = $(".mc-prob-dlg");
    const ESTP = { aguardando: "Aguardando pagamento", processando: "Pagamento em análise", pago: "Pago", enviado: "A caminho", entregue: "Entregue",
                   concluido: "Concluído", problema: "Em análise pela Elite", cancelado: "Não concluído", devolvido: "Pagamento devolvido" };
    if (!p || !k) { sec.hidden = true; erro.hidden = false; return; }
    const acao = async (corpo) => postJSON("/v1/mercado/pedido/acao", { p, k, ...corpo });
    let voltas = 0, d;
    async function carrega() {
      try { d = (await postJSON("/v1/mercado/pedido", { p, k, pagamento })).pedido; }
      catch (ex) { if (ex.status === 404) { sec.hidden = true; erro.hidden = false; } return; }
      const a = d.anuncio, total = d.valor + d.frete, envio = d.entrega === "envio";
      compras.poe({ p, k, jogo: a.jogo, criado: compras.ler().find(c => c.p === p)?.criado || new Date().toISOString() });
      document.title = `${ESTP[d.estado]}: ${a.jogo} · Mercado da Elite`;
      $(".mc-ped-foto").innerHTML = a.foto ? `<img src="${foto(a.foto)}" alt="">` : "";
      const est = $(".est", sec); est.className = `est ${["enviado", "entregue", "concluido"].includes(d.estado) ? "pago" : d.estado === "problema" ? "processando" : d.estado}`; est.textContent = ESTP[d.estado];
      $(".mc-tit", sec).textContent = a.jogo;
      $(".mc-ped-sub").textContent = `Pedido nº ${d.id} · vendido por ${a.vendedor}, ${a.cidade}/${a.uf}`;
      // linha do tempo
      const PASSO = { aguardando: 0, processando: 0, pago: 1, enviado: 2, entregue: 3, concluido: 4, problema: d.entregue_em ? 3 : d.postado_em ? 2 : 1, cancelado: 0, devolvido: 0 };
      const passo = PASSO[d.estado], parou = ["cancelado", "devolvido", "problema"].includes(d.estado);
      const nomes = envio ? [["Pagamento", d.pago_em], ["Postagem", d.postado_em], ["Entrega", d.entregue_em], ["Concluído", d.concluido_em]]
                          : [["Pagamento", d.pago_em], ["Retirada", null], ["Confirmação", d.concluido_em], ["Concluído", d.concluido_em]];
      $(".mc-etapas", sec).innerHTML = nomes.map(([n, quandoE], i) => `<li class="${i < passo ? "feito" : i === passo ? (parou ? "parou" : "agora") : ""}">${n}${quandoE ? `<small>${new Date(quandoE.replace(" ", "T") + "Z").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</small>` : ""}</li>`).join("");
      $(".mc-ped-val").innerHTML = [["vendido", "Jogo", reais(d.valor)], ["caixa", envio ? "Envio" : "Retirada", envio ? `${d.servico_nome || ""} · ${d.frete ? reais(d.frete) : "grátis"}` : `${a.cidade}/${a.uf}`],
        ["estado", "Total pago", reais(total)], ["relogio", envio ? "Prazo de entrega" : "Pedido em", envio && d.prazo_dias ? `até ${d.prazo_dias} dias úteis após a postagem` : dataLonga(d.criado)]]
        .map(([i, t, v]) => `<div><dt>${ic(i)}${t}</dt><dd>${esc(v)}</dd></div>`).join("");
      const msg = $(".mc-ped-msg"), cont = $(".mc-contato", sec), acoes = $(".mc-ped-acoes"), ras = $(".mc-rastreio");
      cont.innerHTML = ""; acoes.innerHTML = ""; ras.hidden = !d.rastreio;
      if (d.rastreio) ras.innerHTML = `Código de rastreio: <b>${esc(d.rastreio)}</b>${d.rastreio_url ? `<a href="${esc(d.rastreio_url)}" target="_blank" rel="noopener">Acompanhar a entrega</a>` : ""}`;
      const contato = () => {
        const texto = `Olá, ${a.vendedor}! Comprei o ${a.jogo} no Mercado da Elite (pedido nº ${d.id}).`;
        cont.innerHTML = (a.whatsapp ? `<a class="mc-btn zap" href="https://wa.me/${esc(a.whatsapp)}?text=${encodeURIComponent(texto)}" target="_blank" rel="noopener">${ic("zap")}Falar com ${esc(a.vendedor)} no WhatsApp</a>` : "")
          + (a.instagram ? `<a class="mc-btn ig" href="https://www.instagram.com/${esc(a.instagram)}/" target="_blank" rel="noopener">${ic("insta")}@${esc(a.instagram)} no Instagram</a>` : "");
      };
      const botoes = (recebi) => { acoes.innerHTML = (recebi ? `<button type="button" class="mc-btn pri" data-a="recebi">Recebi o jogo, está tudo certo</button>` : "") + `<button type="button" class="mc-btn sec" data-a="problema">Tive um problema</button>`; };
      const M = {
        aguardando: "Ainda não recebemos a confirmação do pagamento. Se você já pagou, espere um pouco: esta página atualiza sozinha.",
        processando: "O Mercado Pago está confirmando o pagamento. Isso costuma levar poucos minutos.",
        pago: envio ? `<b>Pagamento aprovado!</b> Agora é com ${esc(a.vendedor)}: ele tem até ${d.prazo_envio ? dataLonga(d.prazo_envio) : "10 dias"} para postar. Se não postar no prazo, o pagamento volta para você sozinho.`
                    : `<b>Pagamento aprovado!</b> Combine a retirada com ${esc(a.vendedor)}. Depois de conferir o jogo, confirme aqui que recebeu.`,
        enviado: `<b>O jogo está a caminho.</b> Quando chegar, confira as peças e confirme aqui.`,
        entregue: `<b>Entregue!</b> Confira o jogo e confirme que está tudo certo. Sem confirmação, o pedido é concluído sozinho ${d.entregue_em ? `em ${dataLonga(new Date(Date.parse(d.entregue_em.replace(" ", "T") + "Z") + 7 * 864e5).toISOString().replace("T", " ").slice(0, 19))}` : "7 dias depois da entrega"}.`,
        concluido: "<b>Pedido concluído.</b> Obrigado por comprar no Mercado da Elite!",
        problema: `<b>A moderação da Elite está vendo o seu relato.</b> ${esc(d.problema || "")}`,
        devolvido: "O pagamento deste pedido foi devolvido pelo Mercado Pago.",
        cancelado: "O pagamento não foi concluído e nada foi cobrado por este pedido. Se ainda quiser o jogo, volte ao anúncio e tente de novo.",
      };
      msg.innerHTML = `<p>${M[d.estado]}</p>`;
      if (["pago", "enviado", "entregue", "concluido", "problema"].includes(d.estado)) contato();
      if (d.estado === "pago") botoes(!envio);
      if (d.estado === "enviado" || d.estado === "entregue") botoes(true);
      if (d.estado === "cancelado") cont.innerHTML = `<a class="mc-btn pri" href="${RAIZ}anuncio/?id=${a.id}">Voltar ao anúncio</a>`;
      aval.hidden = d.estado !== "concluido";
      if (d.avaliacao) $(".mc-aval-f", aval).innerHTML = `<p>Você deu <b style="color:#e3a400">${estrelas(d.avaliacao.nota)}</b>${d.avaliacao.comentario ? `: “${esc(d.avaliacao.comentario)}”` : ""}. Obrigado!</p>`;
      if ((d.estado === "aguardando" || d.estado === "processando") && voltas++ < 40) setTimeout(carrega, 8000);
      else if (d.estado === "pago" && envio && voltas++ < 60) setTimeout(carrega, 60000);  // acompanha a postagem com a página aberta
      sec.removeAttribute("aria-busy");
    }
    $(".mc-ped-acoes").addEventListener("click", async ev => {
      const b = ev.target.closest("[data-a]"); if (!b) return;
      if (b.dataset.a === "problema") { $(".mc-st", dlgP).textContent = ""; return dlgP.showModal ? dlgP.showModal() : alert("Fale com a Elite pelo Instagram com o número do pedido."); }
      if (!confirm("Confirmar que recebeu o jogo e está tudo certo? Depois disso o pedido é concluído.")) return;
      b.disabled = true;
      try { await acao({ acao: "recebi" }); await carrega(); aval.scrollIntoView({ block: "center" }); } catch (ex) { alert(ex.message); b.disabled = false; }
    });
    $("form", dlgP).addEventListener("submit", async ev => {
      if (ev.submitter && ev.submitter.value === "cancelar") return;
      ev.preventDefault();
      const stP = $(".mc-st", dlgP);
      try { await acao({ acao: "problema", motivo: ev.target.elements.motivo.value }); dlgP.close(); await carrega(); }
      catch (ex) { stP.className = "mc-st erro"; stP.textContent = ex.message; }
    });
    $(".mc-aval-f", aval).addEventListener("submit", async ev => {
      ev.preventDefault();
      const f = ev.target, stA = $(".mc-st", f), nota = Number((f.querySelector("[name=nota]:checked") || {}).value);
      if (!nota) { stA.className = "mc-st erro"; stA.textContent = "Escolha de 1 a 5 estrelas."; return; }
      try { await acao({ acao: "avaliar", nota, comentario: f.elements.comentario.value }); await carrega(); }
      catch (ex) { stA.className = "mc-st erro"; stA.textContent = ex.message; }
    });
    carrega();
  }

  ({ lista, anuncio, anunciar, meu, pedido })[raiz.dataset.pagina]?.();
})();
