/* Firebase web config is public; private Admin credentials must never enter this worker. */
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const room = event.notification.data?.roomId;
  const url = new URL('/', self.location.origin);
  if (['nst-commons', 'nst-placements'].includes(room)) url.searchParams.set('chatRoom', room);
  event.waitUntil(clients.openWindow(url.href));
});
importScripts('https://www.gstatic.com/firebasejs/13.3.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/13.3.0/firebase-messaging-compat.js');
const params = new URL(self.location.href).searchParams;
firebase.initializeApp(Object.fromEntries(['apiKey', 'projectId', 'messagingSenderId', 'appId'].map(key => [key, params.get(key)])));
firebase.messaging().onBackgroundMessage(async payload => {
  const data = payload.data || {};
  if (!['nst-commons', 'nst-placements'].includes(data.roomId)) return;
  await self.registration.showNotification('CollabForge', {
    body: 'New activity in your subscribed chat room.',
    tag: `chat-${data.messageId}`, data: { roomId: data.roomId }
  });
});
