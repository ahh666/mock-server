/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-23 19:08:15
 * @LastEditTime: 2021-03-24 17:29:25
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \mock-server\server\routers\web-server\projectServer.js
 */
const router = require('koa-router')()
const DbHelper = require('../../utils/dbHelper')
const responseHelper = require('../../utils/responseHelper')
const projectServer = new DbHelper('projectServer')

/**
 * @description: 获取项目列表
 */
router.get('/projectList', async ctx => {
  let doc = ctx.request.query
  if (doc) {
    const keys = Object.keys(doc)
    delete doc[keys[keys.length - 1]]
  }
  doc = doc || {}
  ctx.body = await projectServer.find(doc).then(res => {
    return responseHelper.success(undefined, res)
  })
})

/**
 * @description: 创建项目
 * @param {object} 入参 {name,path,desc?}
 * @return {*}
 */
router.post('/createProject', async ctx => {
  const doc = ctx.request.body
  if (Object.keys(doc).length < 1) {
    ctx.body = responseHelper.fail(10001, '请传入参数')
    return
  }
  ctx.body = await projectServer
    .insert(doc)
    .then(() => {
      return responseHelper.success()
    })
    .catch(err => {
      return responseHelper.fail(10002, err)
    })
})

/**
 * @description: 删除项目
 * @param {object} 入参 {id}
 */
router.post('/delProject', async ctx => {
  const _id = ctx.request.body.id
  if (!_id) {
    ctx.body = responseHelper.fail(10003, '请传入唯一ID')
    return
  }
  ctx.body = await projectServer
    .remove({ _id })
    .then(res => {
      return responseHelper.success(undefined, res)
    })
    .catch(err => {
      return responseHelper.fail(10002, err)
    })
})

module.exports = router.routes()
