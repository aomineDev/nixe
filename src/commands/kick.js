module.exports = {
  name: 'kick',
  description: 'Kick an user from the server',
  args: true,
  usage: '<user>',
  guildOnly: true,
  permissions: 'KICK_MEMBERS',
  execute (message, args) {
    const taggedUser = message.mentions.users.first()
    message.channel.send(`You want to kick ${taggedUser.username}`)
  }
}
