const getCalendarInfo = require('./getCalendarInfo')
const saveCalendarInfo = require('./saveCalendarInfo')

module.exports = [
  {
    route: '/api/calendarInfo',
    method: 'get',
    cb: getCalendarInfo
  },
  {
    route: '/api/calendarInfo',
    method: 'post',
    cb: saveCalendarInfo
  }
]
