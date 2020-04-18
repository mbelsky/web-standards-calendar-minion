const { error } = require('dotenv').config()

if (error) {
  throw error
}

const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

bot.start((ctx) => ctx.reply('Hi')).help((ctx) => ctx.reply('Help'))

bot.launch()
