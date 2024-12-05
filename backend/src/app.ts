import express from "express";
import morgan from "morgan";
import cors from "cors";
import Post from "./models/postModel";
import { startConxion } from "./database";

startConxion();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
});

app.post("/createPost", async (req, res) => {
  const { title } = req.body;

  if (!title || !title.titulo || !title.contenido) {
    return res.status(400).json({
      error: "Invalid input: 'title', 'titulo', and 'contenido' are required",
    });
  }

  const { titulo, contenido } = title;

  const post = new Post({ title: titulo, content: contenido, enable: true });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send({ message: "Not.found" });
    res.send(post);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/deletePost/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send({ message: "Not.found" });
    res.send(post);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.put("/updatePost/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (typeof title !== "string" || typeof content !== "string") {
      return res.status(400).send({
        message: "Invalid input: 'title' and 'content' must be strings",
      });
    }

    const updatedPost = { title, content, enable: true };

    const post = await Post.findByIdAndUpdate(req.params.id, updatedPost, {
      new: true,
    });

    if (!post) return res.status(404).send({ message: "Not found" });

    res.send(post);
  } catch (error: any) {
    res.status(500).send({ error: error.message || "An unexpected error occurred" });
  }
});

app.get("/filterPost/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const filter = keyword
      ? { title: { $regex: new RegExp(keyword, "i") } }
      : {};

    const posts = await Post.find(filter);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los posts", error });
  }
});

export default app;
