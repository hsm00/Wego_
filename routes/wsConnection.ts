const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

const { sendMessage, connect } = require("../controllers/wsConnectionController")
import { verifyToken } from '../controllers/middleware/verifyToken'

router.get("/wsconnect",verifyToken, connect)
router.post("/wssend", sendMessage)