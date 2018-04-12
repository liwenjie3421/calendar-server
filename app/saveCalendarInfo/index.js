module.exports = (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = 'save'
}
