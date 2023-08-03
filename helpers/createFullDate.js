const { getDate, getISOWeek, getMonth, getYear } = require("date-fns")

const createFullDate = () => {
  const date = new Date()

  const fullDate = {
    unixDate: +date,
    date: date.toString(),
    day: getDate(date),
    weekOfYear: getISOWeek(date, {
      weekStartsOn: 1,
    }),
    month: getMonth(date) + 1,
    year: getYear(date),
  }

  return fullDate
}

module.exports = createFullDate
