const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  roomId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now, expires: 2592000 }
});
module.exports = mongoose.model('PushSubscription', schema);
