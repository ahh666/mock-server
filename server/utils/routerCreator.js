/*
 * @Description: 接口路由创建
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-04-13 11:16:07
 * @LastEditTime: 2021-04-19 11:30:21
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\utils\routerCreator.js
 */

const Mock = require('mockjs')
const router = require('koa-router')()
// const app = require('../index')

class RouterCreator {
  constructor(method = 'get', path = '/', mock) {
    const routerList = router.stack.map(i => i.path)
    const stackIndex = routerList.indexOf(path)
    // 判断路由是否已存在
    if (stackIndex > -1) {
      // 存在则删除重新创建，（另一种方案是在这里直接修改数据库表的对应数据）
      router.stack.splice(stackIndex, 1)
    }
    router[method](path, async ctx => {
      // 获取不同请求类型的请求参数 方式不同
      const getQueryType = method === 'get' ? 'query' : 'body'
      let doc = ctx.request[getQueryType]

      ctx.body = Mock.mock(mock)
    })
    // app.use(router.routes()).use(router.allowedMethods())
    return router
  }
}

module.exports = RouterCreator
