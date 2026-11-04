// Service worker das notificações da Elite Boardgamers (Web Push, sem app): Black de Verdade, notícias e resenhas.
// O serviço do site (api.eliteboardgamers.com.br) manda um push vazio; aqui buscamos os alertas ainda não mostrados
// neste aparelho (cada um só recebe os temas que escolheu no sininho) e mostramos a notificação. Tocar abre a página.
const API = "https://api.eliteboardgamers.com.br/v1/push/ultimos";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  e.waitUntil((async () => {
    let alertas = [];
    try {
      const sub = await self.registration.pushManager.getSubscription();
      const r = await fetch(API + (sub ? "?ep=" + encodeURIComponent(sub.endpoint) : ""), { cache: "no-store" });
      alertas = (await r.json()).alertas || [];
    } catch (_) { alertas = []; }
    if (!alertas.length) {
      alertas = [{ id: "elite", titulo: "Novidade na Elite Boardgamers", texto: "Toque para ver o que chegou.",
                   url: "https://eliteboardgamers.com.br/" }];
    }
    await Promise.all(alertas.map((a) => self.registration.showNotification(a.titulo, {
      body: a.texto, tag: a.id, icon: "/icon-192.png", badge: "/favicon-48.png",
      image: a.imagem || undefined, data: { url: a.url || "https://eliteboardgamers.com.br/" },
    })));
  })());
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "https://eliteboardgamers.com.br/black/";
  e.waitUntil(self.clients.openWindow(url));
});
