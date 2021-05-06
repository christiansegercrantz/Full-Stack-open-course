const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return blogs.map(blog => blog.likes).reduce(reducer)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return ''
  const topLikes = Math.max.apply(Math, blogs.map( blog => blog.likes))
  const topBlog =  blogs.find(blog => blog.likes === topLikes)
  return {
    'author' : topBlog.author,
    'likes': topBlog.likes,
    'title': topBlog.title,
  }
}

const mostBlogs = blogs => {
  const blogsPerAuthor = _.countBy(blogs, 'author')
  const authorWIthMostBlogs = _.max(Object.keys(blogsPerAuthor), blogAuthors => blogsPerAuthor(blogAuthors))
  return { author: authorWIthMostBlogs, blogs: blogsPerAuthor[authorWIthMostBlogs] }
}

const mostLikes = blogs => {
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author')
  const likesPerAuthor = _(blogsGroupedByAuthor).map((blog, author) => ({
    author: author,
    likes: _.sumBy(blog,'likes')
  })).value()
  const authorWIthMostLikes = _.maxBy(likesPerAuthor, 'likes')
  return  authorWIthMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}