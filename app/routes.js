const getCalendarInfo = require('./getCalendarInfo')
const saveCalendarInfo = require('./saveCalendarInfo')
const test = require('./test')

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
  },
  {
    route: '/api/test',
    method: 'post',
    cb: test
  }
]
