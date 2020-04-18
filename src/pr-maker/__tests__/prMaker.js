const { makePullRequest } = require('../prMaker')

const TEN_MINS = 10 * 60 * 1000
jest.setTimeout(TEN_MINS)

describe('makePullRequest', () => {
  test.skip('integration test', async () => {
    await makePullRequest({
      filename: '2020.01.01-event-name.yml',
      output: `
x: 123
y: 456
`.trim(),
    })
  })
})
