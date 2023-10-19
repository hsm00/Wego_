const express = require('express');
const router = express.Router();

import { loginPage } from '../controllers/userController';

router.get("/login", loginPage)

router.post("/login")



module.exports = router;
