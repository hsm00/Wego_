const express = require('express');
const router = express.Router();

import { login } from '../controllers/userController';

router.get("/login", login)



module.exports = router;
