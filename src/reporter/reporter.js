const Rollbar = require('rollbar')

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

module.exports = {
  info(...args) {
    rollbar.info(...args)
  },
  warn(...args) {
    rollbar.warn(...args)
  },
  error(...args) {
    rollbar.error(...args)
  },
}
