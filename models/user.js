const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({

    Name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    Email: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    Password: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    isAdmin:Boolean
})

userSchema.methods.generateToken = function(){
    const token = jwt.sign({Name:this.Name,isAdmin:this.isAdmin},config.get('jsonPrivateKey'));
    return token;
}

const User = mongoose.model('user',userSchema);

function validateUser(user){

    const schema = {
        Name : Joi.string().required().min(5).max(50),
        Email : Joi.string().required().email().min(5).max(50),
        Password : Joi.string().required().min(5).max(255),
        isAdmin : Joi.boolean()
    }

    return Joi.validate(user,schema);
} 

module.exports.validate = validateUser;
module.exports.User = User;