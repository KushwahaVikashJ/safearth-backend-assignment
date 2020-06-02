const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();
require('./startup/logging')();

app.get('/',(req,res)=>{
    res.send('Hello');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening On PORT ${port}....`));
