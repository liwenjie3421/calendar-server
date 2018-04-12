const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const routes = require('./app/routes')

const app = new Koa()
const router = new Router()
const koaBody = new KoaBody()

Object.keys(routes).map(route => {
  const routeObj = routes[route]
  const {method, cb} = routeObj
  router[method](route, koaBody, cb)
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
