const helmet = require('helmet');
const compression =  require('compression');
const express = require('express');   
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const repositories = require('../routes/repositories');

module.exports = function(app){
    app.use(express.json());
    app.use(helmet());
    app.use(compression());
    app.use('/repository/',repositories);
    app.use('/user/',users);
    app.use('/auth/',auth);
    app.use(error);
}