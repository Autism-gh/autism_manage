/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const layoutRouter = {
    path: '/layout',
    component: Layout,
    redirect: 'noRedirect',
    name: 'layout',
    meta: {
        title: '布局',
        icon: 'el-icon-c-scale-to-original'
    },
    children: [{
            path: 'flexLayout',   
            component: () => import('@/page/layout/FlexLayout'),
            name: 'FlexLayout',
            meta: {
                title: '传统管理布局'
            }
        },
        {
            path: 'leftRightLayout',   
            component: () => import('@/page/layout/LeftRightLayout'),
            name: 'LeftRightLayout',
            meta: {
                title: '左右布局'
            }
        }
    ]
}

export default layoutRouter