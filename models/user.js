const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    email: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    password: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    isAdmin:Boolean
})

userSchema.methods.generateToken = function(){
    const token = jwt.sign({name:this.name,isAdmin:this.isAdmin},config.get('jsonPrivateKey'));
    return token;
}

const User = mongoose.model('user',userSchema);

function validateUser(user){

    const schema = {
        name : Joi.string().required().min(5).max(50),
        email : Joi.string().required().email().min(5).max(50),
        password : Joi.string().required().min(5).max(255),
        isAdmin : Joi.boolean()
    }

    return Joi.validate(user,schema);
} 

module.exports.validate = validateUser;
module.exports.User = User;