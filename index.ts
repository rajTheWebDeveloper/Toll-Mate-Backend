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
app.use(cors())
app.use('/toll',tollRoutes)


let port=process.env.PORT || 2000

let start=async ()=>
{
    await connect()
    app.listen(2000,()=>
    {
        console.log(`Listening to port ${port}`)
    })
}



start()