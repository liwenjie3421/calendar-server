const config = require('../../config')

module.exports = {
  getTableName
}

/**
 * 不同环境返回不同表
 * @param {string} tableName
 */
function getTableName (tableName) {
  return tableName + (config.env === 'production' ? '' : '_dev')
}
