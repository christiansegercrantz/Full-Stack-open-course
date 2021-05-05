const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(!body.password || body.password.length < 3){
    return response.status(400).json('No password or too short password').end()
  }

  const saltRounds = 5
  const passwordHash = await bcrypt.hash(body.password, saltRounds)



  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)

})

module.exports = usersRouter