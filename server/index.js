/*
 * @Description: 服务入口
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 15:07:36
 * @LastEditTime: 2021-04-16 10:58:35
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\index.js
 */

const Koa = require('koa')
const cors = require('koa2-cors')
const router = require('koa-router')()
const app = new Koa()
const bodyParser = require('koa-bodyparser')

const fs = require('fs')
const join = require('path').join
const web = new Koa()

const webPort = 8001
const serverPort = 8088

// 用于 web 生产环境部署
if (process.env.NODE_ENV === 'production') {
  web.use(require('koa-static')(join(__dirname, './imocker-web')))
  web.listen(webPort)
  web.use(ctx => {
    const html = fs.readFileSync(join(__dirname, './imocker-web/index.html'), 'utf-8')
    ctx.body = html
  })
}

module.exports = app

app.use(cors())
app.use(bodyParser())

router.use(
  '/webServer',
  require('./routers/web-server/projectServer'),
  require('./routers/web-server/interfaceServer'),
  require('./routers/web-server/webServer')
)

app.use(router.routes()).use(router.allowedMethods())

app.listen(serverPort, () => {
  console.log(
    `> 接口服务已启动：http:127.0.0.1:${serverPort}，
> 可视化控制台请访问：http:127.0.0.1:${webPort}`
  )
})
