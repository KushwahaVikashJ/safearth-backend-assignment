const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({Email:req.body.Email});
    if(user) return res.status(400).send('User already exists');

    user = new User(_.pick(req.body,['Name','Email','Password','isAdmin']));

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.Password,salt);

    user.Password = hashed;
    await user.save();

    const token = user.generateToken();
    res.header('x-auth-token',token).send(_.pick(user,['Name','Email','Password']));
})


module.exports = router;