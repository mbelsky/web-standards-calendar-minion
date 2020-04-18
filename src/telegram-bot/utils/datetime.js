function getDateFromString(value) {
  const { day, month, year } = parseDateOutput(value)
  return new Date(year, month - 1, day)
}

function getTimeFromString(value) {
  const [hours, minutes] = value.split(':')
  return 60 * Number(hours) + Number(minutes)
}

function parseDateOutput(value) {
  return {
    day: Number(value.substr(0, 2)),
    month: Number(value.substr(3, 2)),
    year: Number(value.substr(6, 4)),
  }
}

function isValidDate(value) {
  const { day, month, year } = parseDateOutput(value)
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  )
}

function isValidTime(value) {
  if (/^\d{2}:\d{2}$/.test(value)) {
    const [hours, minutes] = value.split(':')
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return true
    }
  }

  return false
}

module.exports = {
  getDateFromString,
  getTimeFromString,
  isValidDate,
  isValidTime,
}
