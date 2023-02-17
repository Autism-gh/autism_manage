/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const echartsRouter = {
    path: '/echarts',
    component: Layout,
    redirect: 'noRedirect',
    name: 'echarts',
    meta: {
        title: 'Echarts',
        icon: 'el-icon-pie-chart'
    },
    children: [
        {
            path: '/echarts/pie',
            component: () => import('@/pagethreejs/page/redirect.vue'),
            redirect: '/threejs/piefinish',
            name: 'EchartPie',
            meta: {
                title: '饼图',
                icon: 'el-icon-notebook-2'
            },
            children: [
                
            ]
        },
        {
            path: '/echarts/line',
            component: () => import('@/pagethreejs/page/redirect.vue'),
            redirect: 'noRedirect',
            name: 'EchartLine',
            meta: {
                title: '折线图',
                icon: 'el-icon-notebook-2'
            },
            children: [

            ]
        },
        {
            path: '/echarts/bar',
            component: () => import('@/pagethreejs/page/redirect.vue'),
            redirect: 'noRedirect',
            name: 'EchartBar',
            meta: {
                title: '柱状图',
                icon: 'el-icon-notebook-2'
            },
            children: [
                
            ]
        }
    ]
}
export default echartsRouter