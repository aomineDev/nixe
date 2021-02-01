const AvatarEmbed = require('../embeds/avatarEmbed')

module.exports = {
  name: 'avatar',
  aliases: ['icon', 'pfp'],
  description: 'look at your avatar or that of the other users!',
  execute (message, args) {
    const tagedUser = message.mentions.users.first()
    let avatar = ''

    if (tagedUser) {
      avatar = tagedUser.displayAvatarURL({ size: 256 })

      return message.channel.send(AvatarEmbed(tagedUser.username, avatar))
    }

    avatar = message.author.displayAvatarURL({ size: 256 })

    message.channel.send(AvatarEmbed(message.author.username, avatar))
  }
}
