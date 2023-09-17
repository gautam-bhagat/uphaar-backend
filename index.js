const express = require('express');
const cors = require('cors');
const app = express()
app.use(express.json())
const port = 5000

app.use(cors())
const connectToMongo = require('./database_connection/connection');
connectToMongo();



app.get('/', (req, res) => {
    res.send("Hello World!!")
});

app.use('/api/device',require('./routes/deviceAPI'))
app.use('/api/hospital',require('./routes/hospitalAPI'))


app.listen(port,()=>{
    console.log(`Running at ${port}`)
})