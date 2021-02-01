const dotenv = require('dotenv')

dotenv.config()

const config = {
  prefix: process.env.PREFIX || '!',
  token: process.env.BOT_TOKEN || ''
}

module.exports = config
