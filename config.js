const path = require('path')

module.exports = {
  env: 'production',
  dbFile: path.join(__dirname, './data.db')
}
