import router from './router'
import store from './store'

import {
  Message
} from 'element-ui'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {
  getToken
} from '@/util/app/auth'
import getPageTitle from '@/util/app/get-page-title'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {

      next({
        path: '/'
      })

      NProgress.done()

    } else {

      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          const {
            roles
          } = await store.dispatch('user/getInfo')

          // 根据角色生成可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 添加路由
          router.addRoutes(accessRoutes)

          next({
            ...to,
            replace: true
          })

        } catch (error) {

          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }

    }
  } else {
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