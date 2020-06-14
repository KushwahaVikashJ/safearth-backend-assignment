const mongoose = require('mongoose');
const Joi = require('joi');

const repositorySchema = new mongoose.Schema({

    repositoryName : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 50
    },
    description: {
        type : String,
        required: true,
        minlength : 5,
        maxlength : 155
    },
    privacy : {
        type : String,
        enum :['public','private'],
        required : true,
    },
    readme: {
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    }
})

const Repository = mongoose.model('repository',repositorySchema);

function validateRepository(repository){

    const schema = {
        repositoryName : Joi.string().required().min(5).max(50),
        description : Joi.string().required().min(5).max(50),
        privacy : Joi.string().required(),
        readme : Joi.string().required().min(5).max(255)
    }

    return Joi.validate(repository,schema);
} 

module.exports.validate = validateRepository;
module.exports.Repository  = Repository;