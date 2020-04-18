const { error } = require('dotenv').config()

if (error) {
  throw error
}

const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const rateLimit = require('telegraf-ratelimit')

const constants = require('./constants')
const createEventScene = require('./createEventScene/createEvent')

const stage = new Stage()

stage.register(createEventScene.scene).command('cancel', Stage.leave())

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
const rateLimitConfig = {
  limit: 1,
  window: 1000,
  onLimitExceeded: (ctx) => ctx.reply('Превышен лимит запросов'),
}

bot
  .use(rateLimit(rateLimitConfig))
  .use(session())
  .help((ctx) => ctx.reply(constants.HELP_MESSAGE))
  .use(stage.middleware())
  .start((ctx) => ctx.reply(constants.START_MESSAGE))
  .command('new', (ctx) => ctx.scene.enter(createEventScene.name))
  .use(async (ctx, next) => {
    await (next && next())

    return ctx.reply(constants.UNKNOWN_MESSAGE)
  })

bot.launch()
