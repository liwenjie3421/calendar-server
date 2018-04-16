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
     * /**
     * 执行 增  删  改  查(单个数据查询或者多个数据查询)
     * @param {string} sql    sql语句
     * @param {string[]| number[] | string | []}  param     参数(可以是数组或者数字或者字符串,根据sql语句来定)
     * @param {string | null} mode    执行模式, 默认run,执行sql,如果查询的话,则使用get(单个)all(多个)
     * @returns {Promise}
       @used
       增 : this.sql(`insert into ${this.tableName} (begin_time, create_time, end_time, play_id, postion_id, status, task_id) values(?, ?, ?, ?, ?, ?, ?)`,
                    [obj.begin_time, obj.create_time, obj.end_time, obj.play_id, obj.postion_id, obj.status, obj.task_id]);

       删 : this.sql(`delete from ${this.tableName} where id = ?`, id);

       改 : this.sql(`update ${this.tableName} set begin_time = ?, status = ? where postion_id = ?`, [begin_timeValue, statusValue, postion_idValue]);

       查 : this.sql(`select * from ${this.tableName} where id = ?`, id, 'get/all');
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
