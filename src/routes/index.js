const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../middlewares/loginChecks')


router.get('/', loginRedirect, async (ctx, next) => {
  // console.log('before debugger')
  // debugger
  // console.log('after debugger')
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: '你好',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'bbb'
      },
      {
        id: 3,
        title: 'ccc'
      },
      {
        id: 4,
        title: 'ddd'
      }
    ]
  })
})

router.get('/json', loginCheck,  async (ctx, next) => {
  // const session = ctx.session
  // if (session.viewNum == null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++

  // throw Error()

  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  }
})

// get请求 动态参数
router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

// get请求 多个动态参数
router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is loadMore page',
    userName,
    pageIndex
  }
})

module.exports = router
