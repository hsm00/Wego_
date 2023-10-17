const express = require('express');
const router = express.Router();

import { login } from '../controllers/userController';

router.get("/", login)

module.exports = router;
