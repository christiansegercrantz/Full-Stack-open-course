const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 5)
  const user = new User({ username: 'root', name:'root' , passwordHash })

  await user.save()
})
describe('Adding faulty users', () => {
  test('User with too short username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'ad',
      name: 'A Admin',
      password: 'hemlig',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
  test('User with too short pw', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Admin',
      name: 'A Admin',
      password: 'he',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
  test('User with already existing username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'hemlig',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd.length).toEqual(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})