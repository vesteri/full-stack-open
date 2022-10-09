const listHelper = require("../utils/blog-helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog:", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  const listWithTwoBlogs = [
    {
      _id: "633da0f457ab82994558450c",
      title: "test-title",
      author: "test-author",
      url: "test-url",
      likes: 69,
      __v: 0,
    },
    {
      _id: "633f23eeffe85523e134851c",
      title: "test-title2",
      author: "test-author2",
      url: "test-url2",
      likes: 696,
      __v: 0,
    },
  ];

  test("when list has two blogs:", () => {
    const result = listHelper.totalLikes(listWithTwoBlogs);
    expect(result).toBe(765);
  });
});
