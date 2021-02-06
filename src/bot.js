const Discord = require('discord.js')
const commands = require('./commands')
const onMessage = require('./events/onMessage')

const client = new Discord.Client()
client.commands = new Discord.Collection()

commands(client)

client.on('ready', () => {
  console.log('nixe is ready!')
})

client.on('message', message => onMessage(message, client.commands))

module.exports = client
