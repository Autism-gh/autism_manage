/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const reportRouter = {
    path: '/report',
    component: Layout,
    redirect: 'noRedirect',
    name: 'report',
    meta: {
        title: '报表',
        icon: 'el-icon-pie-chart'
    },
    children: [{
            path: 'driverrecord',
            component: () => import('@/page/report/DriverRecord/DriverRecord'),
            name: 'DriverRecord',
            meta: {
                title: '驾驶员详情'
            }
        },
        {
            path: 'vehiclerecord',
            component: () => import('@/page/report/VehicleRecord/VehicleRecord'),
            name: 'VehicleRecord',
            meta: {
                title: '车辆详情'
            }
        }
    ]
}
export default reportRouter