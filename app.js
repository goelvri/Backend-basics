const express= require('express')
const app=express();
const cookieParser= require('cookie-parser')
const indexRoute = require('./routes/index.routes')

//to setup ejs

app.set('view engine', 'ejs');

//middleware to get req.body
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(cookieParser())
//import routes

const userRouter= require('./routes/user.routes');

app.use('/user', userRouter)
app.use('/', indexRoute)

//connect to db

const connectToDb= require('./config/db');
connectToDb();


app.listen(3000, ()=>{
    console.log('server running on port 3000')
})