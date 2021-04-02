/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-19 15:57:35
 * @LastEditTime: 2021-03-22 16:11:15
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \mock-server\server\utils\mockHelper.js
 */

const Mock = require('mockjs')

const doc = Mock.mock({
  error_no: null,
  error_info: 'success',
  'data|1-10': [{
      'id|1-100': 1,
      'name':Mock.mock('@name')
  }]
})

module.exports = doc