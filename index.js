const connectToMongoo=require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongoo();
const app = express()
require('dotenv').config();
const port = process.env.PORT;



app.use(cors())
app.use(express.json())
const auth=require('./routers/auth');
const notes=require('./routers/notes');
app.use('/api/auth',auth)
app.use('/api/notes',notes)


app.listen(port, () => {
  console.log(`inotebook backend listening on port http://localhost:${port}`)
})
