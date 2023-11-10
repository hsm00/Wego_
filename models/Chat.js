const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    // If you want to name group chats
    chatName: { type: String, default: '' },
    // For group chats, you can have an image or an admin
    chatImage: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;