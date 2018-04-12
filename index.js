const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')

const app = new Koa()
const router = new Router()
const koaBody = new KoaBody()

router.post('/', koaBody, (ctx, next) => {
  ctx.body = 'ctx.request.body'
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)
