const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already exists');

    user = new User(_.pick(req.body,['name','email','password','isAdmin']));

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password,salt);

    user.password = hashed;
    await user.save();

    const token = user.generateToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email','password']));
})
module.exports = router;