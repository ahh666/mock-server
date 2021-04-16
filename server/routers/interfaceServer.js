/*
 * @Description: Description
 * @Author: 艾欢欢<ahh666@qq.com>
 * @Date: 2021-03-23 19:00:47
 * @LastEditTime: 2021-04-16 18:06:52
 * @LastEditors: 艾欢欢<ahh666@qq.com>
 * @FilePath: \server\routers\interfaceServer.js
 */
const router = require('koa-router')()
const responseHelper = require('../utils/responseHelper')
const mockDomain = require('../config')
const interfaceServer = require('../database/controller/interfaceServer')
const projectServer = require('../database/controller/projectServer')
const RouterCreator = require('../utils/routerCreator')

/**
 * @description: 获取接口列表
 * @param {object} 入参 {pid}
 */
router.get('/interfaceList',async ctx => {
  let doc = ctx.request.query
  const keys = Object.keys(doc)
  delete doc[keys[keys.length - 1]]
  ctx.body = await interfaceServer.find(doc).then((res)=> {
    return responseHelper.success(undefined ,res)
  })
})

/**
 * @description: 添加接口
 * @param {object} 入参 {name,path,desc?}
 * @return {*}
 */
router.post('/createInterface',async ctx => {
  let doc = ctx.request.body
  if (Object.keys(doc).length < 1) {
    ctx.body = responseHelper.fail(10001, '请传入参数')
    return
  }
  // 获取完整mock地址
  const projectDetail = await projectServer.find({_id: doc.pid})
  const basePath = projectDetail[0].path
  const path = doc.path
  doc.mockUrl = mockDomain + basePath + path

  new RouterCreator(doc.reqMethod, basePath + path, '请先编辑返回数据')

  ctx.body = await interfaceServer.insert(doc).then(()=> {
    return responseHelper.success()
  }).catch(err=> {
    return responseHelper.fail(10002, err)
  })
})

/**
 * @description: 删除接口
 * @param {object} 入参 {id}
 */
router.post('/delInterface',async ctx => {
  const _id = ctx.request.body.id
  if (!_id) {
    ctx.body = responseHelper.fail(10003, '请传入唯一ID')
    return
  }
  ctx.body = await interfaceServer.remove({_id}).then((res)=> {
    return responseHelper.success(undefined ,res)
  }).catch(err => {
    return responseHelper.fail(10002, err)
  })
})

/**
 * @description: 修改接口
 * @param {object} 入参 {name,path,desc?,...}
 * @return {*}
 */
router.post('/updateInterface',async ctx => {
  let doc = ctx.request.body
  if (Object.keys(doc).length < 1) {
    ctx.body = responseHelper.fail(10001, '请传入参数')
    return
  }

  const iid = doc._id
  // 获取完整mock地址
  const projectDetail = await projectServer.find({_id: doc.pid})
  const basePath = projectDetail[0].path
  const path = doc.path
  doc.mockUrl = mockDomain + basePath + path
  // nedb中 _id 不允许修改
  delete doc._id

  new RouterCreator(doc.reqMethod, basePath + path, doc.mockFormula)

  ctx.body = await interfaceServer.update({_id: iid},doc).then(()=> {
    return responseHelper.success()
  }).catch(err=> {
    return responseHelper.fail(10002, err)
  })
})

module.exports = router.routes()
