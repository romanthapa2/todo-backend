const connectToMongoo=require('./db');
const express = require('express')
var cors = require('cors') 

connectToMongoo();
const app = express()
const port = 5000


app.get('/',(req,res)=>{
  res.send('backend is working')
});
app.use(cors({
  origin:["https://todo-fronted-three.vercel.app"],
  methods:["POST","GET","PUT","DELETE"],
  credentials:true
}))
app.use(express.json())
const auth=require('./routers/auth');
const notes=require('./routers/notes');
app.use('/api/auth',auth)
app.use('/api/notes',notes)


app.listen(port, () => {
  console.log(`inotebook backend listening on port http://localhost:${port}`)
})
