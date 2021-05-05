const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.singleUser.password, 5)
  const adminUser = new User({ username: helper.singleUser.username, name: helper.singleUser.name , passwordHash })

  const noteObjects = helper.listWithManyBlogs
    .map(note => new Blog(note))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  await adminUser.save()

})

test('GET API test', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Check if ID exists of returned object', async () => {
  const response = await api.get('/api/blogs/')
  expect(response.body[0].id).toBeDefined()
})


test('POST API test', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Me',
    url: 'www.google.com',
    likes: 5
  }
  const user = {
    username: helper.singleUser.username,
    password: helper.singleUser.password
  }
  const token = await api
    .post('/api/login/')
    .send(user)
  console.log(token)

  await api
    .post('/api/blogs/')
    //.set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAddition = await helper.blogsInDb()
  const newBlogInDB = blogsAfterAddition[blogsAfterAddition.length-1]
  expect(newBlogInDB.id).toBeDefined()
  delete newBlogInDB.id
  expect(blogsAfterAddition).toHaveLength(helper.listWithManyBlogs.length + 1)
  expect(newBlogInDB).toEqual(newBlog)
})

test('Likes are 0 if no likes defined', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Me',
    url: 'www.google.com'
  }
  const response = await api
    .post('/api/blogs/')
    .send(newBlog)

  const addedBlogID = response.body.id
  const addedBlog = await Blog.findById(addedBlogID)
  expect(addedBlog.likes).toEqual(0)
})

test('Returns 400 if no title or url is defined', async () => {
  const newBlog = {
    author: 'Me',
    likes: 4
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)
})

test('DELETE API test', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length - 1)

  const titles = blogsAtEnd.map( b => b.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('PUT API test', async () => {
  const newlikes = 10
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = newlikes

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length)
  expect(blogsAtEnd[0].likes).toEqual(newlikes)
})


afterAll(() => {
  mongoose.connection.close()
})