const SQLite3 = require('sqlite3').verbose()

const config = require('../../config')

const {dbFile} = config

class Db {
  constructor () {
    this.db = null
  }

  connectDataBase () {
    return new Promise((resolve, reject) => {
      this.db = new SQLite3.Database(dbFile, (err) => {
        if (err) reject(new Error(err))
        resolve(true)
      })
    })
  }
  /**
     *
     * @param {string} table
     * @param {[]} param
     * @param {string} mode
     */
  sql (sql, param, mode) {
    mode = mode === 'all' ? 'all' : mode === 'get' ? 'get' : 'run'
    return new Promise((resolve, reject) => {
      this.db[mode](sql, param, (error, data) => {
        if (error) reject(new Error(error))
        data ? resolve(data) : resolve(true)
      })
    })
  }

  close () {
    this.db.close()
  }
}

module.exports = new Db()
