const listHelper = require("../utils/blog-helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
