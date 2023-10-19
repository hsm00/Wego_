const express = require('express');
const router = express.Router();

import { chats , selectedChat} from '../controllers/chatsController';


router.get("/chats", chats)
router.get("/selected_chat/:id", selectedChat)



module.exports = router;
