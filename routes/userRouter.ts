import express from 'express';
const router = express.Router();


import { loginPage, login, createUser } from '../controllers/userController';

router.get("/login", loginPage)

router.post("/login", login)

router.post("/register", createUser)


module.exports = router;
