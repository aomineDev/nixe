const figlet = require('figlet')

module.exports = {
  name: 'say',
  description: 'say anything in ascii code',
  args: true,
  usage: '[any word]',
  execute (message, args) {
    const text = args.join(' ')

    if (text.length >= 15) {
      return message.reply('no more of 15 characters!')
    }

    const ascii = figlet.textSync(text)

    message.channel.send('```' + ascii + '```')
  }
}
