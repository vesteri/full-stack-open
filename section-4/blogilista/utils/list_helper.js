//eslint-disable-next-line
const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) =>
  blogs.reduce((favorite, blog) => {
    if (blog.likes > favorite.likes) {
      return blog;
    }
    return favorite;
  }, blogs[0]);

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
