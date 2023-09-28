import moment from 'moment'

export const convertToShortDate = (date) => {
  if (date === null || '') {
    return 'Enter Date'
  } else {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const formattedStartDate = date?.toLocaleDateString('en-US', options)
    return formattedStartDate
  }
}

//add time to your timestamp
export const ADD_TIME_TO_TIMESTAMP = (startDate, time) => {
  const startDateMoment = moment(startDate)

  const timeMoment = moment(time, 'HH:mm')

  const timestamp = startDateMoment.add({
    hours: timeMoment.hours(),
    minutes: timeMoment.minutes(),
  })

  return timestamp.toDate()
}

//get month year and day from timestamp
export const getDayYearMonthFromDate = (date) => {
  const timestamp = date.toDate()
  const day = timestamp.getDate() // Get the day of the month (1-31)
  const year = timestamp.getFullYear() // Get the year (e.g., 2023)
  const month = timestamp.getMonth() + 1 // Get the month (0-11), so add 1 to get (1-12)

  return { day, year, month }
}

export function convertToObjectToTimestamp(obj) {
  const dateComponents = obj

  const date = new Date(
    dateComponents.year,
    dateComponents.month - 1,
    dateComponents.day
  )

  const timestamp = date.getTime()
  return new Date(timestamp)
}

export const getFormatedDate = (date, time) => {
  const dateString = moment(`${date.year}-${date.month}-${date.day}`).format(
    'YYYY-MM-DD'
  )
  const dateTimeString = `${dateString} ${time}`
  const dateTime = moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss')
  const isoDate = moment(dateTime).toISOString()
  return isoDate
}
