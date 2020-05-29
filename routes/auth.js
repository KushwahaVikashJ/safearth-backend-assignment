const {User}= require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
   
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(404).send('User not found.');

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Not a valid Password.');

    const token = user.generateToken();
    res.header('x-auth-token',token).send('Logged in');
})

function validate(user){

    const schema = {

        email : Joi.string().required().min(5).max(50).email(),
        password : Joi.string().required().min(5).max(255)

    }

    return Joi.validate(user,schema);
}

module.exports = router;