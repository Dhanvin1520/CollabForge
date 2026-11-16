const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const Subscription = require('../models/PushSubscription');
const ROOMS = new Set(['nst-commons', 'nst-placements']);
const invalidCodes = new Set(['messaging/registration-token-not-registered', 'messaging/invalid-registration-token']);
function configured() {
  return Boolean(process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY);
}
function messaging() {
  if (!configured()) return null;
  let app = getApps().find(a => a.name === 'chat-push');
  if (!app) app = initializeApp({ credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }) }, 'chat-push');
  return getMessaging(app);
}
function validSubscription(body) {
  return typeof body?.token === 'string' && body.token.length >= 20 && body.token.length <= 4096 && ROOMS.has(body.roomId);
}
function invalidTokens(tokens, responses) {
  return tokens.filter((_, i) => invalidCodes.has(responses[i]?.error?.code));
}
async function sendChatPush(roomId, senderId, messageId) {
  const client = messaging();
  if (!client || !senderId || !ROOMS.has(roomId)) return;
  const records = await Subscription.find({ roomId, user: { $ne: senderId }, updatedAt: { $gt: new Date(Date.now() - 2592000000) } }).select('token').lean();
  for (let i = 0; i < records.length; i += 500) {
    const tokens = records.slice(i, i + 500).map(r => r.token);
    const result = await client.sendEachForMulticast({ tokens, data: {
      title: 'PeerSpace', body: 'New activity in your subscribed chat room.', roomId, messageId: String(messageId)
    }, webpush: { headers: { TTL: '300' } } });
    const expired = invalidTokens(tokens, result.responses);
    if (expired.length) await Subscription.deleteMany({ token: { $in: expired } });
  }
}
module.exports = { configured, validSubscription, invalidTokens, sendChatPush };
