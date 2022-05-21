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
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    meta: { title: '项目申请', icon: 'project_user' },
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
        component: () => import('@/views/project/apply-log'),
        name: 'apply-log',
        meta: { title: '申请记录' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    meta: { title: '账号中心', icon: 'user' },
    alwaysShow: true,
    children: [
      {
        path: '',
        component: () => import('@/views/account/info'),
        name: 'account-info',
        meta: { title: '账号信息' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    meta: { title: '数据列表', icon: 'data' },
    alwaysShow: true,
    redirect: '/data/running',
    children: [
      {
        path: 'running',
        component: () => import('@/views/data/running-list'),
        name: 'running',
        meta: { title: '进行中项目' }
      },
      {
        path: 'pause',
        component: () => import('@/views/data/pause-list'),
        name: 'pause',
        meta: { title: '暂停项目' }
      }
    ]
  },
  {
    path: '/clear',
    component: Layout,
    meta: { title: '结算申请', icon: 'jiesuan' },
    alwaysShow: true,
    children: [
      {
        path: 'clear-list',
        component: () => import('@/views/clear/clear_list'),
        name: 'running',
        meta: { title: '结算列表' }
      },
      {
        path: 'log',
        component: () => import('@/views/dashboard/index'),
        name: 'clear-log',
        meta: { title: '提现记录' }
      },
      {
        path: 'user-list',
        component: () => import('@/views/clear/manager_clear_list'),
        name: 'clear-log',
        meta: { title: '用户结算申请' }
      },
    ]
  },
  {
    path: '/project_management',
    component: Layout,
    meta: { title: '项目管理', icon: 'project_manager' },
    alwaysShow: true,
    children: [
      {
        path: 'clear-list',
        component: () => import('@/views/project_management/project_list'),
        name: 'project_list',
        meta: { title: '项目列表' }
      },
      {
        path: 'application-list',
        component: () => import('@/views/project_management/application_list'),
        name: 'application_list',
        meta: { title: '申请列表' }
      },
      {
        path: 'user-project-list',
        component: () => import('@/views/project_management/user_project_list'),
        name: 'user_project_list',
        meta: { title: '用户项目列表' }
      }
    ]
  },
  {
    path: '/message_center',
    component: Layout,
    meta: { title: '用户管理', icon: 'user' },
    alwaysShow: true,
    children: [
      {
        path: 'user-list',
        component: () => import('@/views/user_management/user_list'),
        name: 'user',
        meta: { title: '用户列表' }
      },
      {
        path: 'node',
        component: () => import('@/views/user_management/node'),
        name: 'node',
        meta: { title: '绑定节点' },
        hidden: true
      },
      {
        path: 'message',
        component: () => import('@/views/user_management/message'),
        name: 'message',
        meta: { title: '发布消息' },
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
  routes: constantRoutes.concat(asyncRoutes),
  mode: 'history'
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
