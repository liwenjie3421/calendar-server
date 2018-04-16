const db = require('../../lib/db')
const utils = require('../../lib/utils')

const {getTableName} = utils

module.exports = async ctx => {
  try {
    await db.connectDataBase()
    const data = await search(ctx.query)
    ctx.body = {
      code: 1,
      msg: data
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: `查询失败，原因：${error}`
    }
  }
  db.close()
}

async function search ({startDate, endDate}) {
  const data = await db.sql(`select * from ${getTableName('event')} where date >= date(?) and date <= date(?) and isActive=1`, [startDate, endDate], 'all')
  return data
}
