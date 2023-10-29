const express = require('express');
const router = express.Router();

import { chats , selectedChat} from '../controllers/chatsController';
import { verifyToken } from '../controllers/middleware/verifyToken'

router.get("/",verifyToken, chats)
router.get("/selected_chat/:id", selectedChat)



module.exports = router;
