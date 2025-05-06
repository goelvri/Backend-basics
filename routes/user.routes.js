const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

router.get('/test', (req, res) => {
    res.send('user test route');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register',
    body('email').trim().isEmail().isLength({ min: 13 }),
    body('password').trim().isLength({ min: 5 }),
    body('username').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
        }

        const { email, username, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 100); 
        const newUser = await userModel.create({
            email,
            username,
            password: hashPassword // Save hashed password correctly
        });

        res.json(newUser);
    }
);

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    body('username').trim().isLength({ min: 3 }), // Adjust validation as needed
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            });
        }

        const { username, password } = req.body;
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: 'Username or password is incorrect'
            });
        }

        const isPwMatch = await bcrypt.compare(password, user.password);
        if (!isPwMatch) {
            return res.status(400).json({
                message: 'Username or password is incorrect'
            });
        }

        // JWT token generation
        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET);

        res.cookie('token', token);
        res.send('Logged in');
    }
);

// res.json({
//     token
// })


//connect w db
const dotenv=require('dotenv');
dotenv.config();
module.exports = router;


const userModel= require('../models/user.model')
