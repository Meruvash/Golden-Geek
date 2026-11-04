// Service worker das notificações da Elite Boardgamers (Web Push, sem app): Black de Verdade, notícias e resenhas.
// O serviço do site (api.eliteboardgamers.com.br) manda um push vazio; aqui buscamos os alertas ainda não mostrados
// neste aparelho (cada um só recebe os temas que escolheu no sininho) e mostramos a notificação. Tocar abre a página.
// Sem duplicata: a tag de cada notificação é o id do alerta, então um push repetido (nova tentativa do servidor)
// só substitui em silêncio o que já está na tela.
const API = "https://api.eliteboardgamers.com.br/v1/push";
const PADRAO = { id: "elite", titulo: "Novidade na Elite Boardgamers", texto: "Toque para ver o que chegou.",
                 url: "https://eliteboardgamers.com.br/" };

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

async function busca(ep) {
  for (let i = 0; i < 2; i++) { // celular que acabou de acordar às vezes perde a primeira conexão
    try {
      const r = await fetch(API + "/ultimos" + (ep ? "?ep=" + encodeURIComponent(ep) : ""), { cache: "no-store" });
      if (r.ok) return await r.json();
    } catch (_) {}
    await new Promise((ok) => setTimeout(ok, 1500));
  }
  return null;
}

self.addEventListener("push", (e) => {
  e.waitUntil((async () => {
    const sub = await self.registration.pushManager.getSubscription();
    const d = await busca(sub && sub.endpoint);
    let alertas = (d && d.alertas) || [];
    const repetido = !!(d && d.repetido);
    if (!alertas.length) alertas = [PADRAO];
    await Promise.all(alertas.map((a) => self.registration.showNotification(a.titulo, {
      body: a.texto, tag: a.id, renotify: false, silent: repetido, icon: "/icon-192.png", badge: "/favicon-48.png",
      image: a.imagem || undefined, data: { url: a.url || PADRAO.url },
    })));
  })());
});

// O navegador às vezes troca a inscrição sozinho (chave expirada, serviço de push renovado): refaz e avisa o
// servidor, que passa os temas da antiga para a nova. Sem isso, o aparelho para de receber sem ninguém saber.
self.addEventListener("pushsubscriptionchange", (e) => {
  e.waitUntil((async () => {
    const antigo = e.oldSubscription && e.oldSubscription.endpoint;
    let nova = e.newSubscription;
    if (!nova) {
      const k = (await (await fetch(API + "/chave")).json()).chave;
      const p = "=".repeat((4 - k.length % 4) % 4), b = atob((k + p).replace(/-/g, "+").replace(/_/g, "/"));
      nova = await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: Uint8Array.from(b, (c) => c.charCodeAt(0)) });
    }
    await fetch(API + "/inscrever", { method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ sub: nova.toJSON(), antigo, temas: [], juntar: true }) });
  })().catch(() => {}));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || PADRAO.url;
  e.waitUntil(self.clients.openWindow(url));
});
