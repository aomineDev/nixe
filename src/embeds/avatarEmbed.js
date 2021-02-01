const Discord = require('discord.js')

function AvatarEmbed (author, avatar) {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Avatar')
    .setDescription(`Hey **${author}**, este es tu avatar!`)
    .setImage(avatar)
    .setTimestamp()

  return embed
}

module.exports = AvatarEmbed
