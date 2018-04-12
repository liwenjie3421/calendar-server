const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const routes = require('./app/routes')

const app = new Koa()
const router = new Router()
const koaBody = new KoaBody()

routes.map(routeObj => {
  const {method, cb, route} = routeObj
  router[method](route, koaBody, cb)
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
