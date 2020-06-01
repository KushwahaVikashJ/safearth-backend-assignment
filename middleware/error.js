const winston = require('winston');
module.exports = function(err,req,res,next){
   

    res.status(500).send(err.message);
}