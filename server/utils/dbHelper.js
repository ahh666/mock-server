/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-19 16:32:16
 * @LastEditTime: 2021-03-25 11:20:21
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \mock-server\server\utils\DbHelper.js
 */
const DataBase = require('../database')
const db = new DataBase()

class DbHelper {
  constructor(dbName) {
    this.db = db[dbName]()
  }

  async find(query = {}) {
    return await this.db.find(query)
  }

  async insert(doc = {}) {
    return await this.db.insert(doc)
  }

  async remove(query = {}, multi = true) {
    return await this.db.remove(query, { multi })
  }

  async update(query = {}, doc = {}) {
    // 以某条数据全部替换掉的形式
    return await this.db.update(query, doc)
  }
}

module.exports = DbHelper
