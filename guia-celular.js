// Guia visual "onde tocar" do Elite Boardgamers: aponta com uma seta grande, no lugar certo da tela, o botão do
// navegador que a pessoa precisa tocar (cadeado/ajustes do site para liberar notificações, menu ou Compartilhar para
// pôr o site na tela inicial). Cada navegador tem o seu desenho e o seu caminho. Uso: EliteGuia.abrir('permissao')
// ou EliteGuia.abrir('instalar'). Sem dependências; o CSS vem junto.
(() => {
  const ua = navigator.userAgent;
  const ipad = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  const ios = /iPhone|iPad|iPod/i.test(ua) || ipad;
  const android = /Android/i.test(ua);
  const embutido = /Instagram|FBAN|FBAV|FB_IAB|Line\/|WhatsApp|Telegram|TikTok|musical_ly|; wv\)/i.test(ua);
  const vIOS = +((ua.match(/OS (\d+)_/) || [])[1] || 0);

  function navegador() {
    if (embutido) return "embutido";
    if (ios) {
      if (/CriOS/.test(ua)) return "ios-chrome";
      if (/EdgiOS/.test(ua)) return "ios-edge";
      if (/FxiOS/.test(ua)) return "ios-firefox";
      if (ipad) return "ipad";
      return vIOS >= 26 ? "ios26" : "ios";
    }
    if (android) {
      if (/SamsungBrowser/.test(ua)) return "samsung";
      if (/MiuiBrowser|XiaoMi/.test(ua)) return "xiaomi";
      if (/EdgA/.test(ua)) return "edge";
      if (/OPR|OPX|OPT\//.test(ua)) return "opera";
      if (/Firefox/.test(ua)) return "firefox";
      if (navigator.brave) return "brave";
      return "chrome"; // Chrome do Android (Motorola, Xiaomi com Chrome, LG, Asus, Pixel...)
    }
    return "pc";
  }

  // Desenhos dos ícones como aparecem no navegador (SVG simples, para a pessoa reconhecer o botão).
  const IC = {
    ajustes: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M4 7h9M17 7h3M4 17h3M11 17h9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/><circle cx="15" cy="7" r="2.4" stroke="currentColor" stroke-width="2.2" fill="none"/><circle cx="9" cy="17" r="2.4" stroke="currentColor" stroke-width="2.2" fill="none"/></svg>',
    cadeado: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2.2" fill="none"/></svg>',
    tres: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><circle cx="12" cy="5" r="2.2" fill="currentColor"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><circle cx="12" cy="19" r="2.2" fill="currentColor"/></svg>',
    tresH: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><circle cx="5" cy="12" r="2.2" fill="currentColor"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><circle cx="19" cy="12" r="2.2" fill="currentColor"/></svg>',
    tracos: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    compartilhar: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M12 3v12M7.5 7.5 12 3l4.5 4.5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 11H5v10h14V11h-1" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linejoin="round"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z" stroke="currentColor" stroke-width="2.2" fill="none"/></svg>',
  };
  const ic = (n, r) => `<span class="eg-ic" title="${r || ""}">${IC[n]}</span>`;

  // onde: canto da tela em que fica o botão. tl = em cima à esquerda, tr = em cima à direita, bl/br = embaixo,
  // bc = embaixo no meio. barra: se o navegador deixa mudar a barra de endereço para baixo (mostra a opção).
  function roteiro(tipo, nav, baixo) {
    const T = baixo ? "b" : "t";
    const site = "eliteboardgamers.com.br";
    const fimPerm = "Volte para esta página e toque de novo em <b>Ativar alertas</b>.";
    const soCel = 'Se a opção <b>Notificações</b> não aparecer ou não ligar: abra as <b>Configurações do celular</b> → <b>Apps</b> → o seu navegador → <b>Notificações</b> → ligue.';
    if (nav === "embutido") return { onde: ios ? "tr" : "tr", icone: ios ? ic("tresH") : ic("tres"),
      titulo: "Abra no navegador do celular",
      passos: [`Toque nos <b>três pontinhos</b> ${ios ? ic("tresH") : ic("tres")} no canto de cima, à direita`,
        `Escolha <b>${ios ? "Abrir no Safari" : "Abrir no Chrome"}</b> (ou "Abrir no navegador")`,
        "Na página que abrir, toque de novo no mesmo botão"] };
    const P = {
      permissao: {
        chrome: { onde: T + "l", barra: true, icone: ic("ajustes", "ícone de ajustes"),
          titulo: "Liberar as notificações no Chrome",
          passos: [`Toque no ícone ${ic("ajustes")} <b>à esquerda do endereço</b> (${site}), ${baixo ? "na barra de baixo" : "lá em cima"}. Em versões antigas ele é um cadeado ${ic("cadeado")}`,
            "Toque em <b>Permissões</b>", "Toque em <b>Notificações</b> e ligue a chave (<b>Permitir</b>)", fimPerm], extra: soCel },
        edge: { onde: T + "l", barra: true, icone: ic("cadeado"), titulo: "Liberar as notificações no Edge",
          passos: [`Toque no cadeado ${ic("cadeado")} <b>à esquerda do endereço</b>`, "Toque em <b>Permissões</b> (ou <b>Configurações do site</b>)", "Em <b>Notificações</b>, escolha <b>Permitir</b>", fimPerm], extra: soCel },
        opera: { onde: T + "l", barra: false, icone: ic("cadeado"), titulo: "Liberar as notificações no Opera",
          passos: [`Toque no cadeado ${ic("cadeado")} <b>à esquerda do endereço</b>`, "Toque em <b>Configurações do site</b>", "Em <b>Notificações</b>, escolha <b>Permitir</b>", fimPerm], extra: soCel },
        brave: { onde: T + "l", barra: true, icone: ic("cadeado"), titulo: "Liberar as notificações no Brave",
          passos: [`Toque no cadeado ${ic("cadeado")} <b>à esquerda do endereço</b>`, "Toque em <b>Permissões</b>", "Em <b>Notificações</b>, escolha <b>Permitir</b>", fimPerm], extra: soCel },
        firefox: { onde: T + "l", barra: true, icone: ic("cadeado"), titulo: "Liberar as notificações no Firefox",
          passos: [`Toque no cadeado ${ic("cadeado")} <b>à esquerda do endereço</b>`, "Toque em <b>Notificações</b> (em <b>Permissões</b>)", "Escolha <b>Permitido</b>", fimPerm], extra: soCel },
        samsung: { onde: "tl", barra: false, icone: ic("cadeado"), titulo: "Liberar as notificações no Samsung Internet",
          passos: [`Toque no cadeado ${ic("cadeado")} <b>à esquerda do endereço</b>, lá em cima`, "Toque em <b>Permissões</b> (ou <b>Configurações do site</b>)", "Ligue <b>Notificações</b>", fimPerm],
          extra: `Não achou? Toque em ${ic("tracos")} (embaixo, à direita) → <b>Configurações</b> → <b>Sites e downloads</b> → <b>Notificações</b> e libere ${site}.` },
        xiaomi: { onde: "tl", barra: false, icone: ic("cadeado"), titulo: "Abra no Chrome",
          passos: ["O navegador da Xiaomi não entrega notificações de sites.", `Toque em ${ic("tracos")} ou ${ic("tres")} e escolha <b>Abrir no Chrome</b>`, "No Chrome, toque de novo em <b>Ativar alertas</b>"] },
        ios: null, ios26: null, ipad: null,
        "ios-chrome": null, "ios-edge": null, "ios-firefox": null,
        pc: { onde: "tl", barra: false, icone: ic("ajustes"), titulo: "Liberar as notificações",
          passos: [`Clique no ícone ${ic("ajustes")} ou ${ic("cadeado")} à esquerda do endereço`, "Em <b>Notificações</b>, escolha <b>Permitir</b>", "Recarregue a página e clique de novo em <b>Ativar alertas</b>"] },
      },
      instalar: {
        chrome: { onde: T + "r", barra: true, icone: ic("tres"), titulo: "Pôr o Elite na tela inicial (Chrome)",
          passos: [`Toque nos <b>três pontinhos</b> ${ic("tres")} ${baixo ? "embaixo, à direita" : "no canto de cima, à direita"}`,
            "Toque em <b>Adicionar à tela inicial</b> (ou <b>Instalar app</b>)", "Toque em <b>Instalar</b> / <b>Adicionar</b>"] },
        edge: { onde: "br", barra: false, icone: ic("tresH"), titulo: "Pôr o Elite na tela inicial (Edge)",
          passos: [`Toque nos <b>três pontinhos</b> ${ic("tresH")} embaixo, no meio`, "Toque em <b>Adicionar ao telefone</b> (ou <b>Instalar</b>)", "Confirme em <b>Adicionar</b>"] },
        opera: { onde: "br", barra: false, icone: ic("tres"), titulo: "Pôr o Elite na tela inicial (Opera)",
          passos: [`Toque no menu ${ic("tres")} (no alto, à direita, ou no O vermelho embaixo)`, "Toque em <b>Adicionar a…</b> → <b>Tela inicial</b>", "Confirme em <b>Adicionar</b>"] },
        brave: { onde: T + "r", barra: true, icone: ic("tres"), titulo: "Pôr o Elite na tela inicial (Brave)",
          passos: [`Toque nos <b>três pontinhos</b> ${ic("tres")} ${baixo ? "embaixo, à direita" : "no canto de cima, à direita"}`, "Toque em <b>Adicionar à tela inicial</b>", "Confirme em <b>Adicionar</b>"] },
        firefox: { onde: T + "r", barra: true, icone: ic("tres"), titulo: "Pôr o Elite na tela inicial (Firefox)",
          passos: [`Toque nos <b>três pontinhos</b> ${ic("tres")} ${baixo ? "embaixo, à direita" : "no canto de cima, à direita"}`, "Toque em <b>Adicionar à tela inicial</b> (ou <b>Instalar</b>)", "Confirme em <b>Adicionar</b>"] },
        samsung: { onde: "br", barra: false, icone: ic("tracos"), titulo: "Pôr o Elite na tela inicial (Samsung)",
          passos: [`Toque em ${ic("tracos")} <b>embaixo, à direita</b>`, "Toque em <b>Adicionar página a</b> → <b>Tela inicial</b>", "Confirme em <b>Adicionar</b>"] },
        xiaomi: { onde: "br", barra: false, icone: ic("tracos"), titulo: "Pôr o Elite na tela inicial",
          passos: [`Toque em ${ic("tracos")} embaixo, à direita`, "Toque em <b>Adicionar à tela inicial</b>", "Confirme em <b>Adicionar</b>"] },
        ios26: { onde: "br", barra: false, icone: ic("tresH"), titulo: "Elite na Tela de Início",
          passos: [`Toque nos <b>três pontinhos</b> ${ic("tresH")} embaixo, à direita`, `Toque em <b>Compartilhar</b> ${ic("compartilhar")}`, "Role e toque em <b>Adicionar à Tela de Início</b>", "Toque em <b>Adicionar</b>"] },
        ios: { onde: "bc", barra: false, icone: ic("compartilhar"), titulo: "Elite na Tela de Início",
          passos: [`Toque em <b>Compartilhar</b> ${ic("compartilhar")} embaixo, no meio`, "Role e toque em <b>Adicionar à Tela de Início</b>", "Toque em <b>Adicionar</b>"] },
        ipad: { onde: "tr", barra: false, icone: ic("compartilhar"), titulo: "Elite na Tela de Início",
          passos: [`Toque em <b>Compartilhar</b> ${ic("compartilhar")} no alto, à direita`, "Toque em <b>Adicionar à Tela de Início</b>", "Toque em <b>Adicionar</b>"] },
        "ios-chrome": { onde: "tr", barra: false, icone: ic("compartilhar"), titulo: "Elite na Tela de Início (Chrome)",
          passos: [`Toque em <b>Compartilhar</b> ${ic("compartilhar")} ao lado do endereço, no alto`, "Toque em <b>Adicionar à Tela de Início</b>", "Toque em <b>Adicionar</b>"] },
        "ios-edge": { onde: "bc", barra: false, icone: ic("tresH"), titulo: "Elite na Tela de Início (Edge)",
          passos: [`Toque nos <b>três pontinhos</b> ${ic("tresH")} embaixo`, `Toque em <b>Compartilhar</b> ${ic("compartilhar")}`, "Toque em <b>Adicionar à Tela de Início</b>"] },
        "ios-firefox": { onde: "br", barra: false, icone: ic("tracos"), titulo: "Elite na Tela de Início (Firefox)",
          passos: [`Toque em ${ic("tracos")} embaixo, à direita`, `Toque em <b>Compartilhar</b> ${ic("compartilhar")}`, "Toque em <b>Adicionar à Tela de Início</b>"] },
        pc: { onde: "tr", barra: false, icone: ic("tres"), titulo: "Instalar o Elite",
          passos: [`Clique no menu ${ic("tres")} no canto de cima, à direita`, "Clique em <b>Instalar Elite Boardgamers</b> (ou <b>Transmitir, salvar e compartilhar</b> → <b>Instalar</b>)"] },
      },
    };
    let r = P[tipo][nav];
    if (r === null && tipo === "permissao") { // iPhone: notificação só depois de estar na Tela de Início
      r = Object.assign({}, P.instalar[nav]);
      r.titulo = "No iPhone, primeiro ponha o Elite na Tela de Início";
      r.passos = r.passos.concat(["Abra o Elite pelo ícone novo e toque em <b>Ativar alertas</b>"]);
    }
    return r || P[tipo].pc;
  }

  const CSS = `
.eg{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.72);font-family:inherit;color:#eef1f5;-webkit-tap-highlight-color:transparent}
.eg-caixa{position:absolute;left:12px;right:12px;max-width:440px;margin:0 auto;background:#16181d;border:2px solid #e3b23c;border-radius:16px;padding:16px 16px 12px;box-shadow:0 10px 40px rgba(0,0,0,.6);max-height:calc(100% - 210px);overflow:auto;box-sizing:border-box}
.eg-t .eg-caixa{top:auto;bottom:24px}.eg-b .eg-caixa{top:24px}
.eg-c .eg-caixa{top:50%;transform:translateY(-50%)}
.eg-tit{display:block;color:#e3b23c;font-size:1.08rem;margin:0 34px 8px 0}
.eg-caixa ol{margin:6px 0 4px;padding-left:22px;display:grid;gap:9px;font-size:1rem;line-height:1.35}
.eg-caixa p{margin:8px 0 0;font-size:.86rem;color:#c9ced8;line-height:1.4}
.eg-x{position:absolute;right:6px;top:6px;width:40px;height:40px;border:0;background:none;color:#c9ced8;font-size:1.25rem;cursor:pointer}
.eg-ic{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:9px;background:#2a2f3a;color:#fff;vertical-align:middle;margin:0 2px}
.eg-ic svg{width:22px;height:22px}
.eg-alvo{position:absolute;width:76px;height:76px;margin:-38px 0 0 -38px;border-radius:50%;border:4px solid #e3b23c;box-shadow:0 0 0 6px rgba(227,178,60,.28);animation:egp 1.1s ease-out infinite;pointer-events:none}
.eg-alvo .eg-ic{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#e3b23c;color:#111;width:44px;height:44px}
.eg-alvo .eg-ic svg{width:28px;height:28px}
.eg-seta{position:absolute;width:64px;height:110px;margin-left:-32px;pointer-events:none;color:#e3b23c;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))}
.eg-seta svg{width:100%;height:100%;display:block}
.eg-t .eg-seta{animation:egu 1s ease-in-out infinite}.eg-b .eg-seta{animation:egd 1s ease-in-out infinite}
.eg-rot{position:absolute;pointer-events:none;background:#e3b23c;color:#111;font-weight:900;font-size:.95rem;padding:6px 10px;border-radius:9px;white-space:nowrap}
.eg-barra{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px;font-size:.84rem;color:#c9ced8;align-items:center}
.eg-barra button{border:1px solid #e3b23c;background:transparent;color:#e3b23c;border-radius:999px;padding:7px 12px;font-family:inherit;font-weight:800;font-size:.86rem;line-height:1;cursor:pointer;min-height:36px}
.eg-barra button[aria-pressed=true]{background:#e3b23c;color:#111}
.eg-ok{display:block;width:100%;margin-top:12px;min-height:46px;border:0;border-radius:11px;background:#e3b23c;color:#111;font-family:inherit;font-weight:900;font-size:1.05rem;cursor:pointer}
@keyframes egp{0%{box-shadow:0 0 0 0 rgba(227,178,60,.6)}100%{box-shadow:0 0 0 22px rgba(227,178,60,0)}}
@keyframes egu{50%{transform:translateY(-12px)}}@keyframes egd{50%{transform:translateY(12px)}}
@media (prefers-reduced-motion:reduce){.eg-alvo,.eg-seta{animation:none!important}}`;

  // Seta apontando para cima (barra de cima) ou para baixo (barra de baixo).
  const SETA_CIMA = '<svg viewBox="0 0 64 110" aria-hidden="true"><path d="M32 2 62 40H44v68H20V40H2z" fill="currentColor" stroke="#111" stroke-width="3" stroke-linejoin="round"/></svg>';
  const SETA_BAIXO = '<svg viewBox="0 0 64 110" aria-hidden="true"><path d="M32 108 62 70H44V2H20v68H2z" fill="currentColor" stroke="#111" stroke-width="3" stroke-linejoin="round"/></svg>';

  // posição horizontal do botão em cada canto (o botão real fica na barra do navegador, logo além da borda)
  const X = { l: 44, c: 0.5, r: -46 };

  let estilo = false;
  function abrir(tipo) {
    if (!estilo) { const s = document.createElement("style"); s.textContent = CSS; document.head.append(s); estilo = true; }
    fechar();
    const nav = navegador();
    let baixo = false;
    try { baixo = localStorage.getItem("eg-barra") === "baixo"; } catch (e) {}
    const r = roteiro(tipo, nav, baixo);
    const vert = r.onde[0] === "t" ? "t" : "b", hor = r.onde[1];
    const o = document.createElement("div");
    o.className = `eg eg-${vert}`;
    o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", r.titulo);
    const w = window.innerWidth, h = window.innerHeight;
    const x = hor === "c" ? w / 2 : hor === "l" ? X.l : w + X.r;
    const yAlvo = vert === "t" ? 6 : h - 6;
    const ySeta = vert === "t" ? 52 : h - 52 - 110;
    const rotTxt = "Toque aqui " + (vert === "t" ? "em cima ↑" : "embaixo ↓");
    const rotPos = hor === "r" ? "right:12px" : hor === "c" ? `left:${Math.max(x - 80, 10)}px` : `left:${Math.max(x - 30, 10)}px`;
    const rotY = vert === "t" ? 170 : h - 200;
    o.innerHTML =
      `<div class="eg-alvo" style="left:${x}px;top:${yAlvo}px">${r.icone}</div>` +
      `<div class="eg-seta" style="left:${x}px;top:${ySeta}px">${vert === "t" ? SETA_CIMA : SETA_BAIXO}</div>` +
      `<div class="eg-rot" style="${rotPos};top:${rotY}px">${rotTxt}</div>` +
      `<div class="eg-caixa"><button type="button" class="eg-x" aria-label="Fechar">✕</button>` +
      `<b class="eg-tit">${r.titulo}</b><ol>${r.passos.map((p) => `<li>${p}</li>`).join("")}</ol>` +
      (r.extra ? `<p>${r.extra}</p>` : "") +
      (r.barra ? `<div class="eg-barra">A barra do endereço do seu navegador fica:<button type="button" data-b="cima" aria-pressed="${!baixo}">em cima</button><button type="button" data-b="baixo" aria-pressed="${baixo}">embaixo</button></div>` : "") +
      `<button type="button" class="eg-ok">Entendi</button></div>`;
    o.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b && b.dataset.b) { try { localStorage.setItem("eg-barra", b.dataset.b); } catch (err) {} abrir(tipo); return; }
      if (e.target === o || (b && (b.classList.contains("eg-x") || b.classList.contains("eg-ok")))) fechar();
    });
    document.addEventListener("keydown", esc);
    document.body.append(o);
    o.querySelector(".eg-ok").focus({ preventScroll: true });
  }
  function esc(e) { if (e.key === "Escape") fechar(); }
  function fechar() { document.querySelectorAll(".eg").forEach((x) => x.remove()); document.removeEventListener("keydown", esc); }

  window.EliteGuia = { abrir, fechar, navegador };
})();
