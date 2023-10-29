
const pug = require('pug');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const express = require('express');
const User = require('../models/User.js')
const app = express();
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

export const loginPage = (req: any, res: any) => {
    const template = pug.compileFile('views/login.pug')
    const markup = template({  })
    res.send(markup);
}

export const login = async  (req: any, res: any) => {
    const  { username, password } = req.body
    
    try {
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ message: "username or password wrong" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);


        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
            }, 
            'secret',
            { 
                expiresIn: '1h' 
            });

        user.token = token;
        await user.save();
        
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 3600000,
            // secure: true,
        });
  
        res.set('hx-redirect', '/chats'); // Set the hx-redirect header
        res.status(200).json({ message: "Login successful" });


    } catch (error) {
        res.status(500).json({ message: "Failed to login", error });
    }
}

export const createUser = async (req:any, res:any) => {
    const  { username, password } = req.body
    const user = new  User({
        username: username,
        password: password
    })
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully", user})
    } catch(error) {
        res.status(500).json({ message: "faild to create user", error})
    }
}