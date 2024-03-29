//eslint-disable-next-line
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce(
    (favorite, blog) => (blog.likes > favorite.likes ? blog : favorite),
    blogs[0]
  );

const mostBlogs = (blogs) => {
  const blogsPerAuthor = blogs.reduce((all, blog) => {
    return { ...all, [blog.author]: 1 + (all[blog.author] || 0) };
  }, {});
  const most = Object.keys(blogsPerAuthor).reduce((a, b) =>
    blogsPerAuthor[b] > blogsPerAuthor[a] ? b : a
  );
  return {
    author: most,
    blogs: blogsPerAuthor[most],
  };
};

const mostLikes = (blogs) => {
  const likesPerAuthor = blogs.reduce((total, blog) => {
    return { ...total, [blog.author]: blog.likes + (total[blog.author] || 0) };
  }, {});
  const most = Object.keys(likesPerAuthor).reduce((a, b) =>
    likesPerAuthor[b] > likesPerAuthor[a] ? b : a
  );
  return {
    author: most,
    likes: likesPerAuthor[most],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
