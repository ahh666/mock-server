/*
 * @Description: 服务入口
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 15:07:36
 * @LastEditTime: 2021-04-14 13:44:43
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\index.js
 */

const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('koa-router')()
const app = new Koa()
const bodyParser = require('koa-bodyparser')

module.exports = app

app.use(cors())
app.use(bodyParser())

router.use('/webServer', require('./routers/web-server/projectServer'), require('./routers/web-server/interfaceServer'))

app.use(router.routes()).use(router.allowedMethods())

app.listen(8088, () => {
  console.log('接口服务已启动：http:127.0.0.1:8088，可视化控制台请访问：http:127.0.0.1:8001')
})
