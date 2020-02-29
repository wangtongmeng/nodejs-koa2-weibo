const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler 页面上显示错误信息
onerror(app)

// middlewares
// 解析 post 请求数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// 与post请求相关，把字符串转成对象
app.use(json())
// 打印日志
app.use(logger())
// 把 public目录静态化，可以当做静态资源进行访问，例如访问http://localhost:3000/stylesheets/style.css
app.use(require('koa-static')(__dirname + '/public'))
// 处理 ejs 文件
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = ['UIsdf_7878#$']
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 `koa.sid`
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 `koa:sess:`
  cookie: { // 配置cookie
    path: '/', // 生成的cookie在整个网站下都可以访问
    httpOnly: true, // 客户端无权修改cookie的值，只能在server端修改
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// logger 只是一个中间件的演示
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling 控制台打印错误信息
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
