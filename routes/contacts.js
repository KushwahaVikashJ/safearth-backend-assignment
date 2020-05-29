const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {validate,Contact} = require('../models/contact');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    const contact = await Contact.find().sort({name:1}).limit(10);
    res.send(contact);
})

router.get('/:name', async(req,res)=>{
    const contact = await Contact.find({Name:req.params.name});
    res.send(contact);
});

router.post('/', [auth,admin] , async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let contact = new Contact(_.pick(req.body,['Name','DOB','Phone_Number','Email']));

    contact = await contact.save();
    res.send(contact);
})

router.put('/:name', [auth,admin] , async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const contact = await Contact.updateOne({Name:req.params.name},{
        $set : {
            Name : req.body.Name,
            DOB : req.body.DOB,
            Phone_Number : req.body.Phone_Number,
            Email : req.body.Email
        }},
        {
        new:true 
    });

    res.send(contact);
})

router.delete('/:name',[auth,admin], async (req,res)=>{
    const contact = await Contact.deleteOne({Name:req.params.name});
    res.send(contact);
})

module.exports = router;