const mongoose =require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3, 'username must be at least 3 char log']

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[3, 'password must be at least 3 char log']

    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[13, 'email must be at least 3 char log']

    }
})


const usr= mongoose.model('user',userSchema)