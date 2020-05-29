const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req,res,next){

  const token = req.header('x-auth-token');
  if(!token) return res.status(400).send('Token not provided');

  try{
    const decoded = jwt.verify(token,config.get('jsonPrivateKey')); 
    req.user=decoded;
    next();
  }
  catch(ex){
    res.status(400).send('Token not valid');
  }
}

