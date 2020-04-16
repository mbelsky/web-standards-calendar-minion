const getActiveQuestion = require('../getActiveQuestion')

describe('getActiveQuestion', () => {
  const questions = [
    {
      name: 'one-day',
    },
    {
      name: 'date-start',
    },
    {
      name: 'date-end',
      when: (answers) => !answers['one-day'],
    },
    {
      name: 'time-start',
    },
  ]

  test('without answers', () => {
    expect(getActiveQuestion(questions).name).toBe('one-day')
  })
  test('with an answer', () => {
    const { name } = getActiveQuestion(questions, { 'one-day': 0 })
    expect(name).toBe('date-start')
  })
  test('positive `when` flow', () => {
    const { name } = getActiveQuestion(questions, {
      'one-day': false,
      'date-start': true,
    })
    expect(name).toBe('date-end')
  })
  test('negative `when` flow', () => {
    const { name } = getActiveQuestion(questions, {
      'one-day': true,
      'date-start': true,
    })
    expect(name).toBe('time-start')
  })
})
