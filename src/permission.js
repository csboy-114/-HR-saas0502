import router from './router'
import store from './store'
import nprogress from 'nprogress'

const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    // 有token的情况
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token的情况
    if (whiteList.indexOf(to.path) > -1) {
      // 要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})
// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
