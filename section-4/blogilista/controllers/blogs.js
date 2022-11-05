const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (_request, response) => {
  response.json(await Blog.find({}));
});

blogsRouter.post("/", async (request, response) => {
  if (!(request.body.title && request.body.url)) {
    response.status(400).end();
    return;
  }
  const blog = new Blog(request.body);
  response.status(201).json(await blog.save());
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.status(404).send(error);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).end();
  } catch (error) {
    response.status(404).send(error);
  }
});

module.exports = blogsRouter;
