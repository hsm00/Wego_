
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');


export const chats = (req: any, res: any) => {
    const template = pug.compileFile('views/chats.pug')
    const markup = template({  })
    res.send(markup);
}



export const selectedChat = (req: any, res: any) => {
    const template = pug.compileFile('views/selected_chat.pug')
    const markup = template({  })
    res.send(markup);
}
