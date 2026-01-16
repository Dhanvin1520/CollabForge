const { test } = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const jwt = require('jsonwebtoken');
const Subscription = require('../models/PushSubscription');
const { validSubscription, invalidTokens, sendChatPush } = require('../services/push');
const router = require('../routes/notifications');

test('subscriptions only accept known public rooms and bounded tokens', () => {
  assert.equal(validSubscription({ token: 'x'.repeat(100), roomId: 'nst-commons' }), true);
  assert.equal(validSubscription({ token: 'x'.repeat(100), roomId: 'private-room' }), false);
  assert.equal(validSubscription({ token: {}, roomId: 'nst-commons' }), false);
  assert.equal(validSubscription({ token: 'x'.repeat(4097), roomId: 'nst-commons' }), false);
});
test('only permanent FCM failures remove tokens; transient failures remain retryable', () => {
  assert.deepEqual(invalidTokens(['a','b','c'], [
    { error: { code: 'messaging/registration-token-not-registered' } },
    { error: { code: 'messaging/internal-error' } },
    { success: true }
  ]), ['a']);
});
test('missing Firebase settings leave chat push disabled', async () => {
  await sendChatPush('nst-commons', 'user', 'message');
});
test('subscription endpoints enforce JWT identity and scope deletion to its owner', async () => {
  process.env.JWT_SECRET = 'test-only-secret';
  process.env.FIREBASE_PROJECT_ID = 'test';
  process.env.FIREBASE_CLIENT_EMAIL = 'test@example.invalid';
  process.env.FIREBASE_PRIVATE_KEY = 'test-not-a-key';
  const userId = '507f1f77bcf86cd799439011';
  const auth = jwt.sign({ user: { id: userId } }, process.env.JWT_SECRET);
  const app = express(); app.use(express.json()); app.use('/notifications', router);
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/notifications`;
  const originalUpdate = Subscription.findOneAndUpdate;
  const originalDelete = Subscription.deleteOne;
  let update, deletion;
  Subscription.findOneAndUpdate = async (...args) => { update = args; };
  Subscription.deleteOne = async query => { deletion = query; };
  try {
    assert.equal((await fetch(`${base}/status`)).status, 401);
    const request = (method, body) => fetch(`${base}/subscriptions`, { method,
      headers: { 'Content-Type': 'application/json', 'x-auth-token': auth }, body: JSON.stringify(body) });
    assert.equal((await request('POST', { token: 'short', roomId: 'nst-commons' })).status, 400);
    assert.equal((await request('POST', { token: 'x'.repeat(100), roomId: 'nst-commons', user: 'attacker' })).status, 204);
    assert.equal(update[1].user, userId);
    assert.equal((await request('DELETE', { token: 'x'.repeat(100), user: 'other-user' })).status, 204);
    assert.deepEqual(deletion, { token: 'x'.repeat(100), user: userId });
  } finally {
    Subscription.findOneAndUpdate = originalUpdate; Subscription.deleteOne = originalDelete;
    server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
    delete process.env.FIREBASE_PROJECT_ID; delete process.env.FIREBASE_CLIENT_EMAIL; delete process.env.FIREBASE_PRIVATE_KEY;
  }
});
