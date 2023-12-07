const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const pug = require('pug');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
import { WebSocketServer } from 'ws';
const http = require('http');
const { parse } = require('url');
import { handleMessage } from './controllers/chatsController';
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(compression());

mongoose.connect('mongodb+srv://root:root@wego.vxx1gme.mongodb.net/WeGo?retryWrites=true&w=majority', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error: any) => console.log('error'));
db.once('open', () => console.log('connected to Database'));

const userRoutes = require('./routes/userRouter');
const chatRoutes = require('./routes/chatsRouter');

app.use('/chats', chatRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const WSSendMessage = new WebSocketServer({ noServer: true });

WSSendMessage.on('connection', (ws) => {
  console.log('WebSocket connection established.');
  // Handle WebSocket connections here
});

server.on('upgrade', function upgrade(request: any, socket: any, head: any) {
  const { pathname } = parse(request.url);

  if (pathname === '/chats') {
    WSSendMessage.handleUpgrade(request, socket, head, function done(ws: any) {
      WSSendMessage.emit('connection', ws, request);
      ws.on('message', function incoming(message: any) {
        // Here, you can handle the received message
        handleMessage(message);
      });
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);

module.exports = app;
