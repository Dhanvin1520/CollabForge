import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, deleteToken, isSupported } from 'firebase/messaging';
import api from './api';
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const pushConfigured = Object.values(config).every(Boolean) && Boolean(import.meta.env.VITE_FIREBASE_VAPID_KEY);
export const storedPushToken = () => localStorage.getItem('push_token');
async function client() {
  if (!pushConfigured || !await isSupported()) throw new Error('Notifications are unavailable in this browser.');
  const app = getApps().find(a => a.name === 'chat-push') || initializeApp(config, 'chat-push');
  return getMessaging(app);
}
export async function enableNotifications(roomId: string) {
  // Called only from a user click, before async operations, for browser permission requirements.
  if (!('Notification' in window)) throw new Error('Notifications are unavailable in this browser.');
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Allow notifications in your browser settings to enable alerts.');
  const messaging = await client();
  const status = await api.get('/notifications/status');
  if (!status.data.enabled) throw new Error('Notifications are not configured yet.');
  const query = new URLSearchParams(config).toString();
  const registration = await navigator.serviceWorker.register(`/firebase-messaging-sw.js?${query}`);
  await navigator.serviceWorker.ready;
  const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY, serviceWorkerRegistration: registration });
  await api.post('/notifications/subscriptions', { token, roomId });
  localStorage.setItem('push_token', token);
  localStorage.setItem('push_room', roomId);
}
export async function disableNotifications() {
  const token = storedPushToken();
  let removedOnServer = false;
  if (token && localStorage.getItem('token')) {
    try { await api.delete('/notifications/subscriptions', { data: { token }, timeout: 5000 }); removedOnServer = true; }
    catch { /* Browser subscription is also revoked below, including after JWT expiry. */ }
  }
  let revoked = false;
  try { await deleteToken(await client()); revoked = true; } catch { /* Try native push cleanup. */ }
  const registration = await navigator.serviceWorker?.getRegistration('/');
  if (registration?.active?.scriptURL.includes('/firebase-messaging-sw.js')) {
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) revoked = await subscription.unsubscribe() || revoked;
    else revoked = true;
  }
  if (token && !removedOnServer && !revoked) throw new Error('Could not disable alerts. Please retry before signing out.');
  localStorage.removeItem('push_token');
  localStorage.removeItem('push_room');
}
