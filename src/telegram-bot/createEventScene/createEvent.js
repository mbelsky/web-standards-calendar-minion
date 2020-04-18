const Scene = require('telegraf/scenes/base')
const Stage = require('telegraf/stage')
const getActiveQuestion = require('./getActiveQuestion')
const questions = require('./questions')

const SCENE_NAME = 'new'

const validateAnswer = ({ question, answers, answer }) => {
  if (typeof question.validate !== 'function') {
    return true
  }

  return question.validate(answer, answers)
}

const scene = new Scene(SCENE_NAME)
  .enter((ctx) => {
    const question = getActiveQuestion(questions, undefined)
    return ctx.reply(question.message)
  })
  .leave((ctx) => {
    // TODO: create file & trigger pr creation
    const message = JSON.stringify(ctx.session.createEventScene, null, 2)
    ctx.session.createEventScene = undefined
    return ctx.reply('Scene new left\n\n' + message)
  })
  .on('message', (ctx) => {
    const { createEventScene = {} } = ctx.session
    const { answers = {} } = createEventScene
    const answer = ctx.message.text

    const activeQuestion = getActiveQuestion(questions, answers)
    const validationResult = validateAnswer({
      answer,
      answers,
      question: activeQuestion,
    })

    if (typeof validationResult === 'string') {
      return ctx.reply(validationResult)
    }

    if (ctx.session.createEventScene === undefined) {
      ctx.session.createEventScene = {}
    }

    answers[activeQuestion.name] =
      typeof activeQuestion.filter === 'function'
        ? activeQuestion.filter(answer)
        : answer
    ctx.session.createEventScene.answers = answers

    const nextQuestion = getActiveQuestion(questions, answers)

    if (nextQuestion === undefined) {
      return Stage.leave()(ctx)
    }

    const message =
      typeof nextQuestion.message === 'function'
        ? nextQuestion.message(answers)
        : nextQuestion.message

    // TODO: support keyboard markup
    return ctx.reply(message)
  })

module.exports = {
  name: SCENE_NAME,
  scene,
}
