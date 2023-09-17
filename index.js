const express = require('express');
const cors = require('cors');
const app = express()
const port = 5000

app.use(cors())
const connectToMongo = require('./database_connection/connection');
connectToMongo();



app.get('/', (req, res) => {
    res.send("Hello World!!")
});

app.listen(port,()=>{
    console.log(`Running at ${port}`)
})