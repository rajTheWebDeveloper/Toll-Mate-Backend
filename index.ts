import express from 'express'
import cors from "cors"
import connect from './connect'
import tollRoutes from './routes/tollRoutes'
import env from 'dotenv'
let app=express()

env.config({
  path: "./config/.env",
})

app.use(express.json())
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use('/toll',tollRoutes)


let port=process.env.PORT || 2000

let start=async ()=>
{
    await connect()
    app.listen(port,()=>
    {
        console.log(`Listening to port ${port}`)
    })
}



start()