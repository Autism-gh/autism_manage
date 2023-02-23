/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const assemblyRouter = {
    path: '/assembly',
    component: Layout,
    redirect: 'noRedirect',
    name: 'assembly',
    meta: {
        title: '组件',
        icon: 'el-icon-star-off'
    },
    children: [
        {
            path: 'VideoCenter',
            component: () => import('@/page/assembly/VideoCenter'),
            name: 'VideoCenter',
            meta: {
                title: '视频中心'
            }
        },
        {
            path: 'SubscribeData',
            component: () => import('@/page/assembly/SubscribeData'),
            name: 'SubscribeData',
            meta: {
                title: '订阅数据'
            }
        },
        {
            path: 'treedemo',
            component: () => import('@/page/assembly/TreeDemo'),
            name: 'TreeDemo',
            meta: {
                title: 'ElementTree 示例'
            }
        },
        {
            path: 'TreeMethods',
            component: () => import('@/page/assembly/TreeMethods'),
            name: 'TreeMethods',
            meta: {
                title: 'ElementTree 用法'
            }
        },
        {
            path: 'ExtandTree',
            component: () => import('@/page/assembly/ExtandTree'),
            name: 'ExtandTree',
            meta: {
                title: 'ExtandTree 示例'
            }
        }
    ]
}
export default assemblyRouter