/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/pagescreen/entry/Index'

const screenRouter = {
    path: '/screenpage',
    component: Layout,
    redirect: 'noRedirect',
    name: 'screen',
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
                title: '字典(Border)'
            }
        },
        {
            path: 'headerlayout',
            component: () => import('@/pagescreen/page/dictionary/HeaderLayout.vue'),
            name: 'HeaderLayout',
            meta: {
                title: '字典(Header)'
            }
        },
        {
            path: 'echartsBarDemo',
            component: () => import('@/pagescreen/page/dictionary/EchartsBarDemo.vue'),
            name: 'EchartsBarDemo',
            meta: {
                title: '字典(echarts-bar)'
            }
        },
        {
            path: 'echartsLineDemo',
            component: () => import('@/pagescreen/page/dictionary/EchartsLineDemo.vue'),
            name: 'EchartsLineDemo',
            meta: {
                title: '字典(echarts-line)'
            }
        },
        {
            path: 'echartsPieDemo',
            component: () => import('@/pagescreen/page/dictionary/EchartsPieDemo.vue'),
            name: 'EchartsPieDemo',
            meta: {
                title: '字典(echarts-pie)'
            }
        },
        {
            path: 'echartsMapDemo',
            component: () => import('@/pagescreen/page/dictionary/EchartsMapDemo.vue'),
            name: 'EchartsMapDemo',
            meta: {
                title: '字典(echarts-map)'
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
            path: 'demoscreen2',
            component: () => import('@/pagescreen/page/DemoScreen/DemoScreen1'),
            name: 'DemoScreen1',
            meta: {
                title: 'Demo大屏2'
            }
        },
        {
            path: 'demoscreen3',
            component: () => import('@/pagescreen/page/DemoScreen/DemoScreen2'),
            name: 'DemoScreen2',
            meta: {
                title: 'Demo大屏3'
            }
        }
    ]
}
export default screenRouter