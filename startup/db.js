const mongoose = require('mongoose');
const config = require('config');

module.exports = function(){
     mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true})
    .then(()=> console.log('Connected to DB'))
    .catch((ex)=> console.log(ex));
}