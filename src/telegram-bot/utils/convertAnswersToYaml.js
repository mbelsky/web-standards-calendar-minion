const YAML = require('yaml')
const cyrillicToTranslit = require('./cyrillicToTranslit')
const { parseDateOutput } = require('./datetime')

/**
 * An answers map
 * @typedef {Object} Answers
 * @property {string} name
 * @property {boolean} one-day
 * @property {string} date-start – dd.mm.yyyy
 * @property {string=} date-end – dd.mm.yyyy
 * @property {string} time-start – hh:mm
 * @property {string} time-end – hh:mm
 * @property {string} city
 * @property {string} link
 * @property {boolean} online
 */

/**
 * @param {Answers} answers
 */
const convertAnswersToYaml = (answers) => {
  // yyyy-mm-dd-event-name.yml
  const { year, month, day } = parseDateOutput(answers['date-start'])
  const filename =
    `${year}`.padStart(4, '0') +
    '-' +
    `${month}`.padStart(2, '0') +
    '-' +
    `${day}`.padStart(2, '0') +
    '-' +
    cyrillicToTranslit(answers.name) +
    '.yml'

  const result = {
    name: answers.name,
    date:
      answers['date-start'] +
      (answers['one-day'] ? '' : '-' + answers['date-end']),
    time: answers['time-start'] + '-' + answers['time-end'],
    city: answers.city,
    link: answers.link,
  }

  if (answers.online) {
    result.online = true
  }

  return {
    filename,
    output: YAML.stringify(result),
  }
}

module.exports = convertAnswersToYaml
