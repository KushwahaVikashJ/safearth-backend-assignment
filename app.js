const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/db')();
require('./startup/logging')();
require('./startup/routes')();

app.get('/',(req,res)=>{
    res.send('Hello');
})

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Listening On PORT ${port}....`));
