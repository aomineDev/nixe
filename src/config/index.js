const dotenv = require('dotenv')

dotenv.config()

const config = {
  prefix: process.env.PREFIX || '!',
  token: process.env.TOKEN || ''
}

module.exports = config
