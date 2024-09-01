import express from "express"
import morgan from "morgan"
import cors from "cors"
import { ejemploDatos } from "./data"
//se deben instalar los tipos de typescript
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.get("/ping",(req,res)=>{
    res.send("pong")
})
app.get("/dataExemle",(req,res)=>{
    res.send(ejemploDatos)
})
const port = 3003
app.listen(port,()=>{
    console.log("servidor en ejecucion")
    console.log(`http://localhost:${port}/`)
})