const express = require('express');
const app = express()
const port = 5000

const connectToMongo = require('./database_connection/connection');
connectToMongo();
app.get('/', (req, res) => {
    res.send("Hello World!!")
});

app.listen(port,()=>{
    console.log(`Running at ${port}`)
})