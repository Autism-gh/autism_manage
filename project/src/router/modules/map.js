/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const mapRouter = {
    path: '/map',
    component: Layout,
    redirect: 'noRedirect',
    name: 'map',
    meta: {
        title: '地图',
        icon: 'el-icon-map-location'
    },
    children: [
        {
            path: 'amap',
            component: () => import('@/page/map/AmapDefault/AmapDefault'),
            name: 'AmapDefault',
            meta: {
                title: '原生高德'
            }
        },{
            path: 'monitor',
            component: () => import('@/page/map/Monitor/Monitor'),
            name: 'Monitor',
            meta: {
                title: '实时监控'
            }
        },
        {
            path: 'trackback',
            component: () => import('@/page/map/TrackBack/TrackBack'),
            name: 'TrackBack',
            meta: {
                title: '轨迹回放'
            }
        },
        {
            path: 'videoback',
            component: () => import('@/page/map/VideoBack/VideoBack'),
            name: 'VideoBack',
            meta: {
                title: '视频回放'
            }
        }
    ]
}

export default mapRouter