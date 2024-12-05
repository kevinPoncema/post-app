import request from "supertest";
import app from "../app";

jest.setTimeout(10000);

const examplePost = { title: { titulo: "Hola soy un post", contenido: "si soy" } };
let responsePost: any;
const invalidId = "6751e72241ba051049e92594";

function isValidPostContent() {
  return expect.objectContaining({
    title: expect.any(String),
    content: expect.any(String),
    enable: expect.any(Boolean),
  });
}

describe("GET /ping", () => {
  it("debería responder con 200 OK y 'pong'", async () => {
    const response = await request(app).get("/ping");
    expect(response.status).toBe(200);
    expect(response.text).toBe("pong");
  });
});

describe("GET /posts", () => {
  it("should return all posts with 200 status", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /createPost", () => {
  it("should create a post", async () => {
    const res = await request(app).post("/createPost").send(examplePost);
    responsePost = res.body;
    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining({
      title: examplePost.title.titulo,
      content: examplePost.title.contenido,
      enable: true,
    }));
  });

  it("should return 400 when title is missing", async () => {
    const res = await request(app).post("/createPost").send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});

describe("GET /post/:id", () => {
  it("should find a post by id", async () => {
    const res = await request(app).get(`/post/${responsePost._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(isValidPostContent());
  });

  it("should return 404 for an invalid id", async () => {
    const res = await request(app).get(`/post/${invalidId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Not.found");
  });
});

describe("PUT /updatePost/:id", () => {
  it("should update a post", async () => {
    const updatedPost = { title: "Nuevo título", content: "Nuevo contenido" };
    const res = await request(app).put(`/updatePost/${responsePost._id}`).send(updatedPost);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expect.objectContaining(updatedPost));
  });

  it("should return 400 when fields are missing", async () => {
    const res = await request(app).put(`/updatePost/${responsePost._id}`).send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid input: 'title' and 'content' must be strings");
  });
});

describe("DELETE /deletePost/:id", () => {
  it("should delete a post", async () => {
    const res = await request(app).delete(`/deletePost/${responsePost._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(isValidPostContent());
  });

  it("should return 404 for an invalid id", async () => {
    const res = await request(app).delete(`/deletePost/${invalidId}`);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Not.found");
  });
});

