const { prefix } = require('./config')
const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log('ready')
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

  if (!command) {
    return message.channel.send('command not found!')
  }

  if (command.args && !args.length) {
    let reply = 'You didn\'t provide any arguments'

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
    }

    return message.reply(reply)
  }

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!')
  }
  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author)

    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('You can\'t do this!')
    }
  }

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('There was an error trying to execute that command!')
  }
})

module.exports = client
