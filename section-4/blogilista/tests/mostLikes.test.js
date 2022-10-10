const blogHelper = require("../utils/blog-helper");
const blogs = require("../test-blogs.json");

describe("the author with most likes:", () => {
  test("testing with 2 blogs:", () => {
    const result = blogHelper.mostLikes([blogs[0], blogs[1]]);
    expect(result).toEqual({ author: "Ryny Ryynänen", likes: 82 });
  });
  test("testing with a bunch of blogs:", () => {
    const result = blogHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "Harley Davidson", likes: 299 });
  });
  test("testing a condition where the most liked author has several blogs:", () => {
    const result = blogHelper.mostLikes([
      ...blogs,
      { title: "ShootMania", author: "Ubisoft Nadeo", likes: 133 },
    ]);
    expect(result).toEqual({ author: "Ubisoft Nadeo", likes: 133 + 176 });
  });
});
