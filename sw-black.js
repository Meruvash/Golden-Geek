// Service worker das notificações do Black de Verdade (Web Push, sem app).
// O serviço do site (api.eliteboardgamers.com.br) manda um push vazio; aqui buscamos os alertas do último envio e
// mostramos a notificação. Tocar na notificação abre a oferta.
const API = "https://api.eliteboardgamers.com.br/v1/push/ultimos";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  e.waitUntil((async () => {
    let alertas = [];
    try {
      const r = await fetch(API, { cache: "no-store" });
      alertas = (await r.json()).alertas || [];
    } catch (_) { alertas = []; }
    if (!alertas.length) {
      alertas = [{ id: "black", titulo: "Novas promoções no Black de Verdade", texto: "Toque para ver as ofertas com desconto real.",
                   url: "https://eliteboardgamers.com.br/black/" }];
    }
    await Promise.all(alertas.map((a) => self.registration.showNotification(a.titulo, {
      body: a.texto, tag: a.id, icon: "/icon-192.png", badge: "/favicon-48.png",
      image: a.imagem || undefined, data: { url: a.url || "https://eliteboardgamers.com.br/black/" },
    })));
  })());
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "https://eliteboardgamers.com.br/black/";
  e.waitUntil(self.clients.openWindow(url));
});
