const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const initialBlogs = require("../test-blogs.json");

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

/*test("identifier value is called 'id'", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0]).toBeDefined("id");
});*/

/*test("new blogs can be added", async () => {
  const response = await api.get("/api/blogs");
  let length = response.body.length;
  api.post("/api/blogs")....;
  expect(response.body).toHaveLength(length+1);
});*/

/*test("invalid data will not be added", async () => {
  ...
})*/

afterAll(() => {
  mongoose.connection.close();
});
