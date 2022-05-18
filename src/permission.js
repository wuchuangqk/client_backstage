import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // 白名单

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 判断是否登陆过
  if (localStorage.getItem('token')) {
    // 不允许用户再次登录
    if (to.path === '/login') {
      // next({ path: '/' })
      // NProgress.done()
      next()
    } else {
      next()
    }
  } else {
    // 在未登录时，如果访问的不是白名单里的地址，就让用户去登录
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
