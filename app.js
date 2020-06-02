const helmet = require('helmet');
const compression =  require('compression');
require('express-async-errors');
const error = require('./middleware/error');
const config = require('config');
const auth = require('./routes/auth');
const users = require('./routes/users');
const contacts = require('./routes/contacts');
const mongoose = require('mongoose');
const express = require('express');   
const app = express();

if(!config.get('jsonPrivateKey')) return console.log('Json Private Key not provided');

mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
.then(()=> console.log('Connected to DB'))
.catch((ex)=> console.log(ex.message));

app.use(express.json());
app.use('/phonebook/',contacts);
app.use('/user/',users);
app.use('/auth/',auth);
app.use(helmet());
app.use(compression());
app.use(error);

app.get('/',(req,res)=>{
    res.send('Hello');
})

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Listening On PORT ${port}....`));
