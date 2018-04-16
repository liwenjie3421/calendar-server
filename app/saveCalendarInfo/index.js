const db = require('../../lib/db')
const utils = require('../../lib/utils')

const {getTableName} = utils

const eventKey = ['date', 'teacher', 'color', 'event']

/**
 *
 * @param {boolean} ctx.request.body.batch 是否是批量
 * @param {{}} ctx.request.body.batchData 批量数据
 * @param {{}} ctx.request.body.data 单次数据
 *
 * 数据格式： 'date': string , 'teacher': string, 'color': string, 'event': string
 */
module.exports = async ctx => {
  const { batch, batchData, data } = ctx.request.body

  try {
    await db.connectDataBase()
    if (batch) { // 批量
      if (!batchData) throw new Error('batchData不能为空')
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
  // date的index，在params中就是date
  // 如果是false就是没有值，直接插入
  const ids = await isActive(params[eventKey.indexOf('date')])
  if (ids && ids.length) {
    await inActiveAll(ids)
  }
  await db.sql(`insert into ${getTableName('event')} (${eventKey.join(',')}) values (${placeholder})`, params)
}

/**
 * 根据日期，判断数据是否已有生效的, 如果有，返回id
 */
async function isActive (date) {
  console.log('date', date)
  const ids = await db.sql(`select id from ${getTableName('event')} where date=? and isActive=1`, date, 'all')
  return ids
}
/**
 * 将某一条记录置为无效
 * @param {number} id
 */
async function inActiveAll (ids) {
  await Promise.all(ids.map(item => db.sql(`update ${getTableName('event')} set isActive=0 where id=?`, item.id)))
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
