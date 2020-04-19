const {
  getDateFromString,
  getTimeFromString,
  isValidDate,
  isValidTime,
} = require('../utils/datetime')
const constants = require('./constants')

const questions = [
  {
    name: 'name',
    message: 'Введите название события',
    validate(value) {
      if (!value.trim()) return constants.EMPTY_STRING_MESSAGE
      return true
    },
    filter(value) {
      return value.trim()
    },
  },
  {
    name: 'one-day',
    message: 'Событие однодневное?',
    suggestions: ['Да', 'Нет'],
    filter(input) {
      return input.toLowerCase() === 'да'
    },
  },
  {
    name: 'date-start',
    message: (answers) =>
      answers['one-day']
        ? 'День события (dd.mm.yyyy)'
        : 'Первый день события (dd.mm.yyyy)',
    validate: function (value) {
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value))
        return constants.DATE_FORMAT_MESSAGE

      if (!isValidDate(value)) {
        return constants.DATE_CHECK_DATE_MESSAGE
      }

      return true
    },
  },
  {
    name: 'date-end',
    message: 'Последний день события (dd.mm.yyyy)',
    validate: function (value, answers) {
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value))
        return constants.DATE_FORMAT_MESSAGE

      if (!isValidDate(value)) {
        return constants.DATE_CHECK_DATE_MESSAGE
      }

      const start = getDateFromString(answers['date-start'])
      const end = getDateFromString(value)
      if (start.getTime() >= end.getTime()) {
        return constants.TIME_TRAVEL_MESSAGE
      }

      return true
    },
    when: (answers) => !answers['one-day'],
    suggestions(answers) {
      const dateStart = getDateFromString(answers['date-start'])
      dateStart.setDate(dateStart.getDate() + 1)

      const dateEnd =
        `${dateStart.getDate()}`.padStart(2, '0') +
        '.' +
        `${dateStart.getMonth() + 1}`.padStart(2, '0') +
        '.' +
        `${dateStart.getFullYear()}`

      return [dateEnd]
    },
  },
  {
    name: 'time-start',
    message: 'Время начала (hh:mm)',
    validate: function (value) {
      if (!isValidTime(value)) return constants.TIME_FORMAT_MESSAGE

      return true
    },
  },
  {
    name: 'time-end',
    message: 'Время окончания (hh:mm)',
    validate: function (value, answers) {
      if (!isValidTime(value)) return constants.TIME_FORMAT_MESSAGE

      const timeStart = getTimeFromString(answers['time-start'])
      const timeEnd = getTimeFromString(value)

      if (timeEnd <= timeStart) {
        return constants.TIME_TRAVEL_MESSAGE
      }

      return true
    },
  },
  {
    name: 'city',
    message: 'Город',
    validate(value) {
      if (!value.trim()) return constants.EMPTY_STRING_MESSAGE
      return true
    },
    filter(value) {
      return value.trim()
    },
  },
  {
    name: 'link',
    message: 'Ссылка на страничку события в Интернете',
    validate(value) {
      try {
        new URL(value)
      } catch (_) {
        return 'Введите валидный адрес странички, начинающийся с http(s)://'
      }

      return true
    },
    filter(value) {
      return value.trim()
    },
  },
  {
    name: 'online',
    message: 'Событие пройдёт онлайн?',
    suggestions: ['Да', 'Нет'],
    filter(input) {
      return input.toLowerCase() === 'да'
    },
  },
]

module.exports = questions
