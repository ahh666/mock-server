/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-04-15 14:44:25
 * @LastEditTime: 2021-04-15 15:28:10
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\routers\web-server\webServer.js
 */

const fs = require('fs')
const join = require('path').join
const router = require('koa-router')()
const responseHelper = require('../../utils/responseHelper')

router.get('/about', async ctx => {
  const path = join(__dirname, '../../static/about.md')
  const data = fs.readFileSync(path)
  if (data) {
    ctx.body = responseHelper.success(null, data.toString())
  } else {
    ctx.body = responseHelper.fail(null, '文件读取失败')
  }
})

module.exports = router.routes()
