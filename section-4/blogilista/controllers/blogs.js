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
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
