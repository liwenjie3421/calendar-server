const db = require('../../lib/db')
const config = require('../../config')

const eventKey = ['startTime', 'endTime', 'teacher', 'color', 'event']

module.exports = async ctx => {
  const { batch, batchData, data } = ctx.request.body

  try {
    db.connectDataBase()
    if (batch) { // 批量
      await Promise.all(batchData.map(data => {
        return insertEvent(obj2Arr(data, eventKey))
      }))
    } else { // 单个
      await insertEvent(obj2Arr(data, eventKey))
    }
    ctx.body = {
      code: 1,
      msg: `${batch ? '批量' : ''}添加成功`
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: `${batch ? '批量' : ''}添加失败，原因：${error}`
    }
  }
  db.close()
}

/**
 * insert 1 event
 * @param {[]} params
 */
async function insertEvent (params) {
  let placeholder = '?'
  params.map((v, i) => {
    if (i !== params.length - 1) {
      placeholder += ',?'
    }
  })
  console.log(`insert into ${getTableName('event')} (${eventKey.join(',')}) values (${placeholder})`, params)
  await db.sql(`insert into ${getTableName('event')} (${eventKey.join(',')}) values (${placeholder})`, params)
}

/**
 * 不同环境返回不同表
 * @param {string} tableName
 */
function getTableName (tableName) {
  return tableName + (config.env === 'production' ? '' : '_dev')
}

/**
 * 展开1级对象obj，根据keys按顺序返回值的数组集合
 * @param {{}} obj
 * @param {string[]} keys
 */
function obj2Arr (obj, keys) {
  return keys.map(item => {
    return obj[item]
  })
}
