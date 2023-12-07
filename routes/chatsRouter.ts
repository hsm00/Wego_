const express = require('express');
const router = express.Router();
const WebSocket = require('ws');

import { chats , selectedChat, newChat, handleMessage} from '../controllers/chatsController';
import { verifyToken } from '../controllers/middleware/verifyToken'

router.get("/",verifyToken, chats)
router.get("/selected_chat/:id", selectedChat)
router.post("/newChat", verifyToken, newChat)



module.exports = router;
