const YAML = require('yamljs')
const cyrillicToTranslit = require('./cyrillicToTranslit')
const { parseDateOutput } = require('./datetime')

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
    name: answers.name.includes('#') ? `'${answers.name}'` : answers.name,
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
    output: YAML.stringify(result, 4),
  }
}

module.exports = convertAnswersToYaml
