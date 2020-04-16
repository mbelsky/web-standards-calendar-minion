const getActiveQuestion = (questions, answers = {}) => {
  for (let question of questions) {
    if (typeof question.when === 'function' && !question.when(answers)) {
      continue
    }

    if (question.name in answers) {
      continue
    }

    return question
  }
}

module.exports = getActiveQuestion
