const { error } = require('dotenv').config()

if (error) {
  throw error
}

const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')

const constants = require('./constants')
const createEventScene = require('./createEventScene/createEvent')

const stage = new Stage()

stage.register(createEventScene.scene).command('cancel', Stage.leave())

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

bot
  .use(session())
  .use(stage.middleware())
  .start((ctx) => ctx.reply(constants.START_MESSAGE))
  .help((ctx) => ctx.reply(constants.HELP_MESSAGE))
  .command('new', (ctx) => ctx.scene.enter(createEventScene.name))

bot.launch()
