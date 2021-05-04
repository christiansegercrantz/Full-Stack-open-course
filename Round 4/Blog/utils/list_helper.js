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

module.exports = {
  dummy, totalLikes, favoriteBlog
}