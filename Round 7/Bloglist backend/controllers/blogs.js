const blogsRouter = require('express').Router()
//const { request, response } = require('../app')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({ ...body, user: user._id  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blogID = request.params.id
  const body = request.body
  const comment = new Comment({ blogID, ...body })
  const blog = await Blog.findById(blogID)
  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment)
  await blog.save()
  response.status(201).json(savedComment)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogID = request.params.id
  const user = request.user

  const blog = await Blog.findById(blogID)
  if ( blog !== null  && blog.user.toString() === user._id.toString()){
    await Blog.findByIdAndRemove(blogID)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'not authorized' }).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog ={
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true })
  response.json(blogToUpdate.toJSON())
})

module.exports = blogsRouter