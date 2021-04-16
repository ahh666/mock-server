/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-19 13:52:23
 * @LastEditTime: 2021-04-16 15:30:58
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\database\index.js
 */
const Datastore = require('nedb-promise')
const removeFile = require('fs').unlinkSync
const join = require('path').join
const userDirectory = join(process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'], '.mocker/v1/db')

// db 的基本操作
class DbOptions {
  createDatabase(dir, name, option) {
    let opt = { filename: join(dir, name), autoload: true }
    Object.assign(opt, option)
    return new Datastore(opt)
  }

  removeDb(dir, name) {
    let filename = join(dir, name)
    removeFile(filename)
  }
}

// 数据库表
class DataBase extends DbOptions {
  constructor(option = {}) {
    super()
    const dir = option.location || userDirectory
    this.createDb = this.createDatabase.bind(null, dir)
  }

  // 项目列表
  projectServer() {
    return this.createDb('/projectServer.db')
  }

  // 每个项目中接口列表
  interfaceServer() {
    return this.createDb('/interfaceServer.db')
  }
}
module.exports = DataBase
