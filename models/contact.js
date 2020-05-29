const mongoose = require('mongoose');
const Joi = require('joi');

const contactSchema = new mongoose.Schema({

    Name : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    DOB: {
        type : String,
        required: true,
    },
    Phone_Number : {
        type : String,
        required : true,
        minlength : 10
    },

    Email: {
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
    }
})

const Contact = mongoose.model('contact',contactSchema);

function validateContact(contact){

    const schema = {
        Name : Joi.string().required().min(5).max(50),
        DOB : Joi.string().required(),
        Phone_Number : Joi.string().required().min(10),
        Email : Joi.string().required().email().min(5).max(50)
    }

    return Joi.validate(contact,schema);
} 

module.exports.validate = validateContact;
module.exports.Contact = Contact;