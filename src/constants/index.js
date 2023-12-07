export const PASSWORD_INFO_TEXT = `Password must contain 8+ characters, 1 uppercase letter, 1
lowercase lettter, 1 number, and 1 special symbol.`

export const defaultAvailableTimes = [
  { label: '1:00am', value: '01:00am', isSelected: false },
  { label: '1:30am', value: '01:30am', isSelected: false },
  { label: '2:00am', value: '02:00am', isSelected: false },
  { label: '2:30am', value: '02:30am', isSelected: false },
  { label: '3:00am', value: '03:00am', isSelected: false },
  { label: '3:30am', value: '03:30am', isSelected: false },
  { label: '4:00am', value: '04:00am', isSelected: false },
  { label: '4:30am', value: '04:30am', isSelected: false },
  { label: '5:00am', value: '05:00am', isSelected: false },
  { label: '5:30am', value: '05:30am', isSelected: false },
  { label: '6:00am', value: '06:00am', isSelected: false },
  { label: '6:30am', value: '06:30am', isSelected: false },
  { label: '7:00am', value: '07:00am', isSelected: false },
  { label: '7:30am', value: '07:30am', isSelected: false },
  { label: '8:00am', value: '08:00am', isSelected: false },
  { label: '8:30am', value: '08:30am', isSelected: false },
  { label: '9:00am', value: '09:00am', isSelected: false },
  { label: '9:30am', value: '09:30am', isSelected: false },
  { label: '10:00am', value: '10:00am', isSelected: false },
  { label: '10:30am', value: '10:30am', isSelected: false },
  { label: '11:00am', value: '11:00am', isSelected: false },
  { label: '11:30am', value: '11:30am', isSelected: false },
  { label: '12:00pm', value: '12:00pm', isSelected: false },
  { label: '12:30pm', value: '12:30pm', isSelected: false },
  { label: '1:00pm', value: '01:00pm', isSelected: false },
  { label: '1:30pm', value: '01:30pm', isSelected: false },
  { label: '2:00pm', value: '02:00pm', isSelected: false },
  { label: '2:30pm', value: '02:30pm', isSelected: false },
  { label: '3:00pm', value: '03:00pm', isSelected: false },
  { label: '3:30pm', value: '03:30pm', isSelected: false },
  { label: '4:00pm', value: '04:00pm', isSelected: false },
  { label: '4:30pm', value: '04:30pm', isSelected: false },
  { label: '5:00pm', value: '05:00pm', isSelected: false },
  { label: '5:30pm', value: '05:30pm', isSelected: false },
  { label: '6:00pm', value: '06:00pm', isSelected: false },
  { label: '6:30pm', value: '06:30pm', isSelected: false },
  { label: '7:00pm', value: '07:00pm', isSelected: false },
  { label: '7:30pm', value: '07:30pm', isSelected: false },
  { label: '8:00pm', value: '08:00pm', isSelected: false },
  { label: '8:30pm', value: '08:30pm', isSelected: false },
  { label: '9:00pm', value: '09:00pm', isSelected: false },
  { label: '9:30pm', value: '09:30pm', isSelected: false },
  { label: '10:00pm', value: '10:00pm', isSelected: false },
  { label: '10:30pm', value: '10:30pm', isSelected: false },
  { label: '11:00pm', value: '11:00pm', isSelected: false },
  { label: '11:30pm', value: '11:30pm', isSelected: false },
  { label: '12:00am', value: '12:00am', isSelected: false },
  { label: '12:30am', value: '12:30am', isSelected: false },
]

export const myCustomLocale = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  weekDays: [
    {
      name: 'Monday',
      short: 'Mo',
    },
    {
      name: 'Tuesday',
      short: 'Tu',
    },
    {
      name: 'Wednesday',
      short: 'We',
    },
    {
      name: 'Thursday',
      short: 'Th',
    },
    {
      name: 'Friday',
      short: 'Fr',
    },
    {
      name: 'Saturday',
      short: 'Sa',
      isWeekend: true,
    },
    {
      name: 'Sunday',
      short: 'Su',
      isWeekend: true,
    },
  ],
  weekStartingIndex: 0,
  getToday(gregorainTodayObject) {
    return gregorainTodayObject
  },
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day)
  },
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate()
  },
  transformDigit(digit) {
    return digit
  },
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',
  from: 'from',
  to: 'to',
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: false,
}
