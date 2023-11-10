
const pug = require('pug');
const bodyParser = require('body-parser');
const WebSocket = require('ws')
const express = require('express');
const User = require('../models/User.js');
const Chat = require('../models/Chat.js')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

const wss = new WebSocket.Server({ port: 8081 })

wss.on('connection', function connection(ws: any ) {
    console.log('Client connected')
    ws.send('hello world')

    ws.on("close", () => {
        console.log("Client disconnected");
    });
    ws.onerror = function () {
        console.log("Some Error occurred");
    };
    ws.on("message", function sendMessage(data: any) {
        console.log("first")
    })
});
// const user = User.findOne ("tokens")

export const chats = (req: any, res: any) => {
    if (!req.tokenValid) {
        // Redirect to the login page if the token is not valid
        return res.redirect('/login');
    }
    
    const template = pug.compileFile('views/chats.pug')
    const markup = template({  })
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
    const receiver = req.body.receiver;
    const user = await User.findOne({ username: username })
    
    if (!user) {
        // Handle the case where the user is not found
        return res.status(404).send('User not found');
    }
    const chat = new Chat({
        participants: [user, receiver],
        chatName: receiver
    })

    
    const template = pug.compileFile('views/elements/newChat.pug')
    const markup = template({ receiver })
    res.send(markup);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send('An error occurred');
    }
}