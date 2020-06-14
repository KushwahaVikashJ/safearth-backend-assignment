const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const {validate,Repository} = require('../models/repository');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    const repository = await Repository.find().sort({repositoryName:1}).limit(10);
    res.send(repository);
})

router.get('/:repositoryname', async(req,res)=>{
    const repository = await Repository.find({repositoryName:req.params.repositoryname});
    res.send(repository);
});

router.post('/', [auth,admin] , async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let repository = new Repository(_.pick(req.body,['repositoryName','description','privacy','readme']));

    repository = await repository.save();
    res.send(repository);
})

router.put('/:repositoryname', [auth,admin] , async (req,res)=>{

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const repository = await Repository.updateOne({repositoryName:req.params.repositoryname},{
        $set : {
            repositoryName : req.body.repositoryName,
            description : req.body.description,
            privacy : req.body.privacy,
            readme : req.body.readme
        }},
        {
        new:true 
    });

    res.send(repository);
})

router.delete('/:repositoryname',[auth,admin], async (req,res)=>{
    const repository = await Repository.deleteOne({repositoryName:req.params.repositoryname});
    res.send(repository);
})

module.exports = router;