
const pug = require('pug');
const bodyParser = require('body-parser');

const express = require('express');

const User = require('../models/User.js')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');


// const user = User.findOne ("tokens")

export const chats = (req: any, res: any) => {
    console.log(req.tokenValid)
    console.log(req.user)
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
