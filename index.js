const express = require('express');
const cors = require('cors');
const app = express()
app.use(express.json())
const port = 5000

app.use(cors())
const connectToMongo = require('./database_connection/connection');
connectToMongo();



app.get('/', (req, res) => {
    res.status(200).json({
        'Team' : "Uphaar",
        'Team Leader' : {
            'Name' : 'Gautam Bhagat',
            'Github' : 'https://github.com/gautam-bhagat'
        },
        'Team Member 01' : {
            'Name' : 'Pranav Kale',
            'Github' : 'https://github.com/pranav-kale-01'
        },
        'Team Member 02' :{
            'Name' : 'Aditya Lad',
            'Github' : 'https://github.com/Adityalad-25'
        }, 
        'Team Member 03' : {
            'Name' : 'Tarun Rathod',
            'Github' : 'https://github.com/tarunnnrathoddd'
        },
        'Team Member 04' : {
            'Name' :'Mayuri Narute',
            'Github' : 'https://github.com/MayuriNarute'
        },
        'Team Member 05' : {
            'Name' : 'Wafiya Mulla',
            'Github' : 'https://github.com/Wafmulla'
        },
    });
});

app.use('/api/device',require('./routes/deviceAPI'))
app.use('/api/hospital',require('./routes/hospitalAPI'))
app.use('/api/fire',require('./routes/fireserviceAPI'))
app.use('/api/police',require('./routes/policeAPI'))
app.use('/api/users',require('./routes/UserAPI'))
app.use('/api/endusers',require('./routes/EndUserAPI'))
app.use('/api/alerts',require('./routes/AlertAPI'))



app.listen(port,()=>{
    console.log(`Running at ${port}`)
})