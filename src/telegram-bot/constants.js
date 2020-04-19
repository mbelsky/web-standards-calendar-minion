const BREAK_EVENT_CREATION_MESSAGE = 'Процесс создания события был прерван'
const HELP_MESSAGE = `
/new – инициирует диалог создания события
/cancel – прерывает диалог создания события
`.trim()

const OOPS_MESSAGE =
  'Ой, что-то пошло не так. ' +
  'Мы постараемся исправить проблему как можно скорее.'
const START_MESSAGE =
  'Привет! Я помогаю добавлять события в календарь Веб-стандартов. ' +
  'Чтобы добавить своё событие, отправь /new'
const UNKNOWN_MESSAGE =
  'Извините, я не знаю как это обработать. ' +
  'Пожалуйста, используйте команды описанные в /help'

module.exports = {
  BREAK_EVENT_CREATION_MESSAGE,
  HELP_MESSAGE,
  OOPS_MESSAGE,
  START_MESSAGE,
  UNKNOWN_MESSAGE,
}
