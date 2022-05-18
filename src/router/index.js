import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    meta: { title: '项目申请', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/project/apply-list'),
        name: 'apply-list',
        meta: { title: '项目申请' }
      },
      {
        path: 'log',
        component: () => import('@/views/project/apply-list'),
        name: 'apply-log',
        meta: { title: '申请记录' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    meta: { title: '账号中心', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'account-info',
        meta: { title: '账号信息' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    meta: { title: '数据列表', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: 'running',
        component: () => import('@/views/data/running-list'),
        name: 'running',
        meta: { title: '进行中项目' }
      },
      {
        path: 'pause',
        component: () => import('@/views/dashboard/index'),
        name: 'pause',
        meta: { title: '暂停项目' }
      }
    ]
  },
  {
    path: '/clear',
    component: Layout,
    meta: { title: '结算申请', icon: 'dashboard' },
    alwaysShow: true,
    children: [
      {
        path: 'clear-list',
        component: () => import('@/views/dashboard/index'),
        name: 'running',
        meta: { title: '结算列表' }
      },
      {
        path: 'log',
        component: () => import('@/views/dashboard/index'),
        name: 'clear-log',
        meta: { title: '体现记录' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
