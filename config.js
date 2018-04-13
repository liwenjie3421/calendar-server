const path = require('path')

module.exports = {
  // env: 'production',
  env: 'dev',
  dbFile: path.join(__dirname, './data.db')
}
