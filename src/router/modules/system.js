/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const systemRouter = {
    path: '/system',
    component: Layout,
    redirect: 'noRedirect',
    name: 'system',
    meta: {
        title: '系统管理',
        icon: 'el-icon-setting'
    },
    children: [{
            path: 'menumanage',
            component: () => import('@/page/system/MenuManage/MenuManage'),
            name: 'MenuManage',
            meta: {
                title: '菜单管理'
            }
        },
        {
            path: 'usermanage',
            component: () => import('@/page/system/UserManage/UserManage'),
            name: 'UserManage',
            meta: {
                title: '用户管理'
            }
        }
    ]
}
export default systemRouter