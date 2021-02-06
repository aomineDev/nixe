const fs = require('fs')
const path = require('path')

function commands (client) {
  const commandFiles = fs.readdirSync(path.join(__dirname, '/')).filter(file => !file.startsWith('index'))

  for (const file of commandFiles) {
    const command = require(`./${file}`)

    client.commands.set(command.name, command)
  }
}

module.exports = commands
