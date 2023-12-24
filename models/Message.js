const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { checkServerIdentity } = require('tls');
const Chat = require('./Chat');


const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    Chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;