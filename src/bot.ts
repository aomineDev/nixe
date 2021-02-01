import { config } from 'dotenv'
import { Client, Message } from 'discord.js'
import { prefix } from './config.json'

config()

export class Bot {
  private readonly client: Client
  private readonly prefix: string

  constructor () {
    this.client = new Client()
    this.prefix = prefix
  }

  public start (): void {
    this.client.on('ready', () => {
      console.log('ready!')
    })

    this.client.on('message', (message: Message) => {
      if (message.content === `${this.prefix}ping`) {
        void message.channel.send('Pong.')
      }
    })

    void this.client.login(process.env.BOT_TOKEN)
  }

  // public async listen (): Promise<string> {
  //   const client = new Client()

  //   client.on('message', (message: Message) => {})

  //   return await client.login()
  // }
}
