const express= require('express')
const app=express();



//to setup ejs

app.set('view engine', 'ejs');

//middleware to get req.body
app.use(express.json)
app.use(express.urlencoded({extended:true}))

//import routes

const userRouter= require('./routes/user.routes');

app.use('/user', userRouter)


//connect to db

const connectToDb= require('./config/db');
connectToDb();


app.listen(3000, ()=>{
    console.log('server running on port 3000')
})