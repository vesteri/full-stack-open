const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const testBlogs = require("../test-blogs.json");

beforeEach(async () => {
  await Blog.deleteMany({});
  await new Blog(testBlogs[0]).save();
  await new Blog(testBlogs[1]).save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  expect(200);
  expect(response.body).toHaveLength(2);
});

test("identifier value is called 'id'", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});

test("new blogs can be added", async () => {
  const initialResponse = await api.get("/api/blogs");
  await api
    .post("/api/blogs")
    .send(testBlogs[2])
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const newResponse = await api.get("/api/blogs");
  expect(newResponse.body).toHaveLength(initialResponse.body.length + 1);
  expect(newResponse.body.map((b) => b.title)).toContain(testBlogs[2].title);
});

test("undefined number of likes is defaulted to 0", async () => {
  const blogWithoutLikes = testBlogs[3];
  await api.post("/api/blogs").send(blogWithoutLikes).expect(201);
  const blogsData = await api.get("/api/blogs");
  expect(
    blogsData.body.some(
      (blog) => blog.title === blogWithoutLikes.title && blog.likes === 0
    )
  ).toBe(true);
});

test("blogs with invalid data won't be added", async () => {
  //eslint-disable-next-line
  const { title, url, ...invalidBlog } = testBlogs[4];
  await api.post("/api/blogs").send(invalidBlog).expect(400);
  const blogsData = await api.get("/api/blogs");
  expect(blogsData.body).toHaveLength(2);
});

test("blogs can be deleted", async () => {
  let response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);

  const id = response.body[0].id;
  await api.delete(`/api/blogs/${id}`).expect(204);

  response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(1);
});

afterAll(() => {
  mongoose.connection.close();
});
