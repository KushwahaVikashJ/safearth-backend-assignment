const helmet = require('helmet');
const compression =  require('compression');
const express = require('express');   
const error = require('../middleware/error');
const auth = require('../routes/auth');
const users = require('../routes/users');
const contacts = require('../routes/contacts');

module.exports = function(app){
    app.use(express.json());
    app.use(helmet());
    app.use(compression());
    app.use('/phonebook/',contacts);
    app.use('/user/',users);
    app.use('/auth/',auth);
    app.use(error);
}