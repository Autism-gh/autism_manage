/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const bussinessRouter = {
    path: '/bussiness',
    component: Layout,
    redirect: 'noRedirect',
    name: 'bussiness',
    meta: {
        title: '业务管理',
        icon: 'el-icon-files'
    },
    children: [{
            path: 'vehiclemanage',
            component: () => import('@/page/bussiness/VehicleManage/VehicleManage'),
            name: 'VehicleManage',
            meta: {
                title: '车辆管理'
            }
        },
        {
            path: 'drivermanage',
            component: () => import('@/page/bussiness/DriverManage/DriverManage'),
            name: 'DriverManage',
            meta: {
                title: '司机管理'
            }
        },
        {
            path: 'fencemanage',
            component: () => import('@/page/bussiness/FenceManage/FenceManage'),
            name: 'FenceManage',
            meta: {
                title: '围栏管理'
            }
        }
    ]
}
export default bussinessRouter