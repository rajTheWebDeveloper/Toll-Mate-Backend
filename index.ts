import express from 'express'
import cors from "cors"
import connect from './connect'
import tollRoutes from './routes/tollRoutes'
let app=express()


app.use(express.json())
app.use(cors())
app.use('/toll',tollRoutes)



let start=async ()=>
{
    await connect()
    app.listen(2000,()=>
    {
        console.log("Listening to port 2000")
    })
}



start()