/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/pagescreen/entry/Index'

const screenRouter = {
    path: '/screenpage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'system',
    meta: {
        title: '大屏',
        icon: 'el-icon-monitor'
    },
    children: [
        {
            path: 'borderlayout',
            component: () => import('@/pagescreen/page/dictionary/BorderLayout.vue'),
            name: 'BorderLayout',
            meta: {
                title: '边框字典'
            }
        },
        {
            path: 'headerlayout',
            component: () => import('@/pagescreen/page/dictionary/HeaderLayout.vue'),
            name: 'HeaderLayout',
            meta: {
                title: 'Header字典'
            }
        },
        {
            path: 'demoscreen',
            component: () => import('@/pagescreen/page/DemoScreen/DemoScreen'),
            name: 'DemoScreen',
            meta: {
                title: 'Demo大屏'
            }
        },
        {
            path: 'zhengzhou',
            component: () => import('@/pagescreen/page/ZhengZhou/ZhengZhou'),
            name: 'ZhengZhou',
            meta: {
                title: '郑州大屏'
            }
        }
    ]
}
export default screenRouter