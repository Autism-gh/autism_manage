/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const demoRouter = {
    path: '/demo',
    component: Layout,
    redirect: 'noRedirect',
    name: 'map',
    meta: {
        title: '测试中心',
        icon: 'el-icon-map-location'
    },
    children: [{
            path: 'download',
            component: () => import('@/page/demo/Download/DownloadTest'),
            name: 'Monitor',
            meta: {
                title: '下载器'
            }
        }
    ]
}

export default demoRouter