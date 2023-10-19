const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const pug = require('pug');
const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(compression());

mongoose.connect('mongodb+srv://root:root@wego.vxx1gme.mongodb.net/WeGo?retryWrites=true&w=majority', { useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error: void) => console.log('error'))
db.once('open', () => console.log('connected to Database'))

const routes = require('./routes/userRouter');
// how to add all routes


app.use(routes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});



module.exports = app;
