const mongoose = require('mongoose');
const Joi = require('joi');

const contactSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    dateOfBirth: {
        type : String,
        required: true,
    },
    phoneNumber : {
        type : String,
        required : true,
        minlength : 10
    },

    email: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
    }
})

const Contact = mongoose.model('contact',contactSchema);

function validateContact(contact){

    const schema = {
        name : Joi.string().required().min(5).max(50),
        dateOfBirth : Joi.string().required(),
        phoneNumber : Joi.string().required().min(10),
        email : Joi.string().required().email().min(5).max(50)
    }

    return Joi.validate(contact,schema);
} 

module.exports.validate = validateContact;
module.exports.Contact = Contact;