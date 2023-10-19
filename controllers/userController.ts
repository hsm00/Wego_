
const pug = require('pug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
import bcrypt from 'bcrypt';

const express = require('express');
const router = express.Router();

const User = require('../models/User.js')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

export const loginPage = (req: any, res: any) => {
    const template = pug.compileFile('views/login.pug')
    const markup = template({  })
    res.send(markup);
}

export const login = (req: any, res: any) => {
    const  {usernam}
}