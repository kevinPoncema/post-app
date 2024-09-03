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


app.post("/createPost", async (req, res) => {
    const { title } = req.body;
    const { titulo, contenido } = title;
    // Crear un nuevo post con el título y contenido
    const post = new Post({ title: titulo, content: contenido });
    try {
        // Guardar el post en la base de datos
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send(error);
    }
});




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

app.put("/updatePost/:id", async (req, res) => {
    try {
        // Extraer los campos que corresponden a tu esquema
        const { title, content } = req.body;
        const id = req.params.id;
        console.log(id, req.body);

        // Verifica que title y content sean cadenas antes de actualizar
        if (typeof title !== 'string' || typeof content !== 'string') {
            return res.status(400).send({ message: "Invalid input: 'title' and 'content' must be strings" });
        }

        // Crear un nuevo objeto solo con los campos necesarios
        const updateData = {
            title,
            content
        };

        // Actualizar el post en la base de datos
        const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
        // Si no se encuentra el post, enviar un 404
        if (!post) return res.status(404).send({ message: "Not found" });

        // Enviar el post actualizado como respuesta
        res.send(post);
    } catch (error:any) {
        console.error(error);
        res.status(500).send({ error: error.message || "An unexpected error occurred" });
    }
});





app.get("/filterPost/:keyword", async (req, res) => {
    try {
        const keyword = req.params.keyword; // Obtener el parámetro de la ruta 'keyword'

        // Construir la consulta de filtro utilizando una expresión regular
        const filter = keyword ? { title: { $regex: new RegExp(keyword, 'i') } } : {};

        const posts = await Post.find(filter); // Buscar los posts que coincidan con el filtro
        res.json(posts); // Enviar los resultados como JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posts', error }); // Manejo de errores
    }
});

const port = 3003
app.listen(port,()=>{
    console.log("servidor en ejecucion")
    console.log(`http://localhost:${port}/`)
})