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
