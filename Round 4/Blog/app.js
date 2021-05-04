const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
//const middleware = require('./utils/middleware')
//const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app