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
  const blogs = await Blog.find({});
  expect(blogs).toHaveLength(2);
});

test("identifier value is called 'id'", async () => {
  const blogs = await Blog.find({});
  expect(blogs[0].id).toBeDefined();
});

test("new blogs can be added", async () => {
  let blogs = await Blog.find({});
  const length = blogs.length;
  const blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
  blogs = await Blog.find({});
  expect(blogs).toHaveLength(length + 1);
});

test("blogs have 0 likes by default", () => {
  const blogWithoutLikes = new Blog(initialBlogs[3]);
  expect(blogWithoutLikes.likes).toBe(0);
});

/*test("invalid data will not be added", async () => {
  ...
})*/

afterAll(() => {
  mongoose.connection.close();
});
