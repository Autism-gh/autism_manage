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
        }
    ]
}
export default assemblyRouter