const express = require('express');
const router = express.Router();
const bcrypt= require('bcrypt')
const jwt = require ('jsonwebtoken')
const{body, validationResult}=require('express-validator')

router.get('/test', (req, res) => {
    res.send('user test route');
});


router.get('/register', (req,res)=>{
    res.render('register')
})

router.post('/register', 
   
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min : 5}),
    body('username').trim().isLength({min : 5}),
   
    async (req,res)=>{

        const errors= validationResult(req)
        console.log(errors)
       
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: 'ivalid data'
             });

            }

             const {email, username, password}= req.body;
            const hashPassword= await bcrypt.hash(password, 100)
            const newUser = await userModel.create({
                email,
                username,
                hashPassword
            })
    
            res.json(newUser)
    console.log(req.body);
    res.send('user registered')
})


router.get('/login', (req,res)=>{
    res.render('login')
})

router.post('/login',
    body('username').trim().isEmail().isLength({min:3 }),
    body('password').trim().isLength({min : 5}),
   async (req,res)=>{
    const errors= validationResult(req)
        console.log(errors)
       
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: 'invalid data'
             });

            }

             const { username, password}= req.body;
            const user= await userModel.findOne({
                username: username
            })

            if(!user){
                return res.status(400).json({
                    message:'username or pw is incorrect'
                })
            }
            const isPwMatch = await bcrypt.compare(password, user.password)

            if(!isPwMatch){
                return res.status(400).json({
                    message:'username or pw is incorrect'
                })
            }
})

//jwt token
const token=jwt.sign

//connect w db
const dotenv=require('dotenv');
dotenv.config();
module.exports = router;


const userModel= require('../models/user.model')
