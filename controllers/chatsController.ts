
const pug = require('pug');
const bodyParser = require('body-parser');
const WebSocket = require('ws')
const express = require('express');
const User = require('../models/User.js');
const Chat = require('../models/Chat.js');
const Message = require('../models/Message.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

export const handleMessage = (message: any, token:any) => {
    let parsedMessage: any;
    // Check if the message is a string and try parsing it as JSON
    try {
        parsedMessage = JSON.parse(message);
        parsedMessage = parsedMessage.message.toString()
        console.log(parsedMessage);

        User.findOne({ token: token }, (err: any, user: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(user);
                const newMessage = new Message({
                    author: user._id,
                    message: parsedMessage,                })
                newMessage.save();
            }
        }
        )
    } catch (error) {
        // If parsing fails, assume message is already an object
        console.error('Error parsing message or token:', error);

        parsedMessage = message;
    }
}

export const chats = async (req: any, res: any) => {
    if (!req.tokenValid) {
        // Redirect to the login page if the token is not valid
        return res.redirect('/login');
    }

    const user = req.user;
    let chats = await Chat.find({ participants: user.userId });

    // Fetch other participants' usernames
    const chatsWithUsernames = await Promise.all(chats.map(async (chat: any) => {
        // Find the ID of the other participant
        const otherParticipantId = chat.participants.find((p: any) => p.toString() !== user.userId.toString());

        // Fetch the other participant's username from the database
        const otherParticipant = await User.findById(otherParticipantId);
        const otherParticipantName = otherParticipant ? otherParticipant.username : null;

        return {
            ...chat.toObject(), // Convert Mongoose document to a plain JavaScript object
            otherParticipantName  // Add other participant's username
        };
    }));

    const template = pug.compileFile('views/chats.pug');
    const markup = template({ chats: chatsWithUsernames, user });
    res.send(markup);
}



export const selectedChat = (req: any, res: any) => {
    const template = pug.compileFile('views/selected_chat.pug')
    const markup = template({  })
    res.send(markup);
}


export const newChat = async (req: any, res: any) => {
    if (!req.tokenValid) {
        // Redirect to the login page if the token is not valid
        return res.redirect('/login');
    }
    try { 
    const username = req.user.username;
    const receiver = await User.findOne({ username: req.body.receiver })
    const user = await User.findOne({ username: username })
    
    if (!user) {
        // Handle the case where the user is not found
        return res.status(404).send('User not found');
    }

    
    const chat = new Chat({
        participants: [user, receiver]
    })
    await chat.save();
    const template = pug.compileFile('views/elements/newChat.pug')
    const markup = template({ receiver })
    res.send(markup);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send('An error occurred');
    }
}