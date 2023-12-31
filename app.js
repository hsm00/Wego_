"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const pug = require('pug');
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(compression());
app.get('/chats', (req, res) => {
    res.render('chats');
});
app.get('/selected_chat/:id', (req, res) => {
    const template = pug.compileFile('views/selected_chat.pug');
    const markup = template({});
    res.send(markup);
    console.log("s");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
module.exports = app;
