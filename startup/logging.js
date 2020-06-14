const winston  = require('winston');           //logging library
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){

    process.on('uncaughtException', (ex)=>{  // to handle the unexception error out of the scope of express
        winston.error(ex);
    })
    
    process.on('unhandledRejection', (ex)=>{  // to handle the unexception error out of the scope of express
        winston.error(ex);
    })
    
    winston.add(new winston.transports.File({ filename:'logfile.log'}));
    // winston.add(new winston.transports.MongoDB({ 
    //     db: config.get('db'),
    //     options:{
    //         useUnifiedTopology: true ,
    //     },
    //     level:'info'
    // }));    
}