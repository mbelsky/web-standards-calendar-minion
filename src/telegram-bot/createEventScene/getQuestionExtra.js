const Markup = require('telegraf/markup')

const getQuestionExtra = (question, answers = {}) => {
  const { suggestions } = question
  const keyboardButtons =
    typeof suggestions === 'function' ? suggestions(answers) : suggestions

  if (!Array.isArray(keyboardButtons) || keyboardButtons.length === 0) {
    return Markup.removeKeyboard().extra()
  }

  return Markup.keyboard([keyboardButtons]).oneTime().resize().extra()
}

module.exports = getQuestionExtra
