require('express-async-errors');
const winston  = require('winston');           //logging library
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const auth = require('./routes/auth');
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const mongoose = require('mongoose');
const express = require('express');   
const app = express();

if(!config.get('jsonPrivateKey')) return console.log('Json Private Key not provided');

process.on('uncaughtException', (ex)=>{  // to handle the unexception error out of the scope of express
    console.log('Failed Unexception');
    winston.error(ex.message);
})

process.on('unhandledRejection', (ex)=>{  // to handle the unexception error out of the scope of express
    console.log('Failed Rejection');
    winston.error(ex.message);
})

winston.add(new winston.transports.File({ filename:'logfile.log'}));
winston.add(new winston.transports.MongoDB({ 
    db:'mongodb://localhost/vidly'
}));

mongoose.connect('mongodb://localhost/phonebook',{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
.then(()=> winston.info('Connected to DB'));

app.use(express.json());
app.use('/phonebook/',contacts);
app.use('/user/',users);
app.use('/auth/',auth);
app.use(error);

app.get('/',(req,res)=>{
    res.send('Hello');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>winston.info(`Listening on port ${port}....`));
