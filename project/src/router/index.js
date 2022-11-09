import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/entry/Index'

/**
 * 
 * 
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 所有用户都能访问到的权限页面
 * 
 * 
 * 
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/page/common/Redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/entry/Login'),
        hidden: true
    },

    /**
     * 
     * 异常页面
     * 
     */
    {
        path: '/404',
        component: () => import('@/page/error/Page404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/page/error/Page401'),
        hidden: true
    },
    {
        path: '/500',
        component: () => import('@/page/error/Page500'),
        hidden: true
    },


    /**
     * 
     * 业务管理系统入口
     * 
     */
    {
        path: '/',
        component: Layout,
        redirect: '/guide',
        hidden: true,
        children: [{
            path: 'guide',
            component: () => import('@/entry/Guide'),
            name: 'ManageGuide',
            meta: {
                title: '首页',
                affix: true
            }
        }]
    }
]



/* Router Modules */
import assemblyRouter from './modules/assembly'
import bussinessRouter from './modules/bussiness'
import mapRouter from './modules/map'
import reportRouter from './modules/report'
import systemRouter from './modules/system'
import demoRouter from './modules/demo'
import layoutRouter from './modules/layout'
/**
 * 
 * 
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 需要通过权限判断的路由
 * 根据顺序从上到下
 * 
 * 
 */
export const asyncRoutes = [
    assemblyRouter,
    bussinessRouter,
    mapRouter,
    reportRouter,
    systemRouter,
    demoRouter,
    layoutRouter,

    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
