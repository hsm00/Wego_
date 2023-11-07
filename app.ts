const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const pug = require('pug');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const WebSocket = require('ws')

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(compression());

mongoose.connect('mongodb+srv://root:root@wego.vxx1gme.mongodb.net/WeGo?retryWrites=true&w=majority', { useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (error: void) => console.log('error'))
db.once('open', () => console.log('connected to Database'))


const userRoutes = require('./routes/userRouter');
const chatRoutes = require('./routes/chatsRouter');


app.use('/chats', chatRoutes);
app.use(userRoutes);




const wss = new WebSocket.Server({ port: 8081 })


wss.on('connection', function connection(ws: any ) {
  console.log('Client connected')
  ws.send('hello world')
  
  ws.on("close", () => {
      console.log("Client disconnected");
  });
  ws.onerror = function () {
      console.log("Some Error occurred");
  },
  ws.on("message", function sendMessage(data: any) {
    console.log("first")
  })
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});



module.exports = app;
