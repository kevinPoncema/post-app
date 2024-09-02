import express from "express"
import morgan from "morgan"
import cors from "cors"
import Post from "./models/postModel";
//se deben instalar los tipos de typescript
import { startConxion } from "./database";
startConxion()
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.get("/ping",(req,res)=>{
    res.send("pong")
})
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find(); // Espera a que la consulta se complete
        res.json(posts); // Envía los resultados como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error }); // Manejo de errores
    }
});


app.post("/cratePost",async (req,res)=>{
    const {title,content} = req.body;
   const post = new Post({title,content})
   await post.save()
   res.send(post)
})

app.get("/post/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post) return res.status(404).send({message:"Not.found"})
        res.send(post)
    } catch (error) {
        res.status(500).send({error:error})
    }

})

app.delete("/deletePost/:id",async(req,res)=>{
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.status(404).send({message:"Not.found"})
        res.send(post)
    } catch (error) {
        res.status(500).send({error:error})
    }
})

app.put("/updatePost/:id",async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{ new:true})
        if(!post) return res.status(404).send({message:"Not.found"})
        res.send(post)
    } catch (error) {
        res.status(500).send({error:error})
    }

})
const port = 3003
app.listen(port,()=>{
    console.log("servidor en ejecucion")
    console.log(`http://localhost:${port}/`)
})