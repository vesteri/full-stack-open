const blogHelper = require("../utils/blog-helper");
const blogs = require("../test-blogs.json");

describe("the author with most blogs:", () => {
  test("testing with a bunch of blogs:", () => {
    const result = blogHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "Jeesus Kristus", blogs: 2 });
  });
});
