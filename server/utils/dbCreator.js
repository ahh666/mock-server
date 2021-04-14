/*
 * @Description: 用于创建 通过可视化服务创建的接口 的数据库表（暂时不存数据库，方式查看routerCreator）
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-04-12 19:41:09
 * @LastEditTime: 2021-04-14 14:58:30
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\utils\dbCreator.js
 */

const DataBase = require('../database')
const db = new DataBase()
const getMockData = require('./mockHelper')

class DbCreator {
  constructor(tableName = '', tableMock = {}) {
    const _db = db.createDb(tableName)
    const mockData = getMockData(tableMock)
    _db.insert(mockData)
  }
}

module.exports =  DbCreator
