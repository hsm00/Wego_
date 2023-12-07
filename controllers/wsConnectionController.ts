const pug = require('pug');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const express = require('express');
const User = require('../models/User.js')
const app = express();
const jwt = require('jsonwebtoken');
const WebSocket = require('ws');

let ws: any;


// export const connect = () => {
//     // Establish the WebSocket connection and assign it to the 'ws' variable
//     ws = new WebSocket('ws://localhost:8081');

//     ws.onopen = function open() {
//         console.log('Connected to the server');
//         // Now the connection is open, you can set up your message event handler
//         ws.onmessage = function message(data: any) {
//             console.log(`Received message: ${data.data}`);
//         };
//     };

//     ws.onclose = function close() {
//         console.log('Disconnected from the server');
//     };

//     ws.onerror = function error(event: any) {
//         console.error('WebSocket error:', event);
//     };
// };

// export const sendMessage = (message: any) => {
//     console.log("teast")
// };