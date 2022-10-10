const blogHelper = require("../utils/blog-helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = blogHelper.dummy(blogs);
  expect(result).toBe(1);
});
