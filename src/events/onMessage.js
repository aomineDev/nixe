const { prefix } = require('../config')

function onMessage (message, commands) {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

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
}

module.exports = onMessage
