/*
 * @Description: 服务入口
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-18 15:07:36
 * @LastEditTime: 2021-04-19 11:28:10
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
const interfaceServer = require('./database/controller/interfaceServer')
const mockDomain = require('./config')
const RouterCreator = require('./utils/routerCreator')

const webPort = 8002
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
  require('./routers/projectServer'),
  require('./routers/interfaceServer'),
  require('./routers/webServer')
)

app.use(router.routes()).use(router.allowedMethods())

app.listen(serverPort, async () => {
  // 每次重启服务时，通过接口重新激活后端路由
  await interfaceServer.find({}).then(res => {
    res.forEach(item => {
      const path = item.mockUrl.split(mockDomain)[1]
      const reqMethod = item.reqMethod
      const mockFormula = item.mockFormula
      const mock = mockFormula ? mockFormula : '请先编辑返回数据'
      const router = new RouterCreator(reqMethod, path, mock)
      app.use(router.routes()).use(router.allowedMethods())
    })
  })
  console.log(
    `-> 接口服务已启动：http:127.0.0.1:${serverPort}，
-> 可视化控制台请访问：http:127.0.0.1:${webPort}`
  )
})
