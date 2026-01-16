const router = require('express').Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/PushSubscription');
const { configured, validSubscription } = require('../services/push');
router.use(auth);
router.get('/status', (req, res) => res.json({ enabled: configured() }));
router.post('/subscriptions', async (req, res) => {
  if (!configured()) return res.status(503).json({ message: 'Notifications are not configured yet.' });
  if (!validSubscription(req.body)) return res.status(400).json({ message: 'Invalid notification subscription.' });
  try {
    // One owner and one selected public room per browser token; re-login replaces its owner.
    await Subscription.findOneAndUpdate({ token: req.body.token }, {
      user: req.user.id, roomId: req.body.roomId, updatedAt: new Date()
    }, { upsert: true, runValidators: true });
    res.sendStatus(204);
  } catch { res.status(500).json({ message: 'Could not save notification settings.' }); }
});
router.delete('/subscriptions', async (req, res) => {
  if (typeof req.body?.token !== 'string') return res.sendStatus(400);
  try {
    await Subscription.deleteOne({ token: req.body.token, user: req.user.id });
    res.sendStatus(204);
  } catch { res.status(500).json({ message: 'Could not remove notification settings.' }); }
});
module.exports = router;
