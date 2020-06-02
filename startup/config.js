const config = require('config');

module.exports = function(){

    if(!config.get('jsonPrivateKey')) return console.log('Json Private Key not provided');

}