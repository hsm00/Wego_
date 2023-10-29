const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Message = mongoose.model('Message', messageSchema);