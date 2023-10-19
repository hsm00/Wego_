
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

export const login = (req: any, res: any) => {
    const template = pug.compileFile('views/login.pug')
    const markup = template({  })
    res.send(markup);
}
