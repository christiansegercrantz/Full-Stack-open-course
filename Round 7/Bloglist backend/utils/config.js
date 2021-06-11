const dotenv = require('dotenv').config()

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI
const PORT = process.env.PORT


module.exports = {
  mongoUrl,
  PORT
}