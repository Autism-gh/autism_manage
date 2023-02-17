/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const threejsRouter = {
    path: '/threejs',
    component: Layout,
    redirect: 'noRedirect',
    name: 'threejs',
    meta: {
        title: 'ThreeJs',
        icon: 'el-icon-data-analysis'
    },
    children: [
        {
            path: '/threejs/base',
            component: () => import('@/pagethreejs/page/redirect.vue'),
            redirect: '/threejs/Line',
            name: 'ThreeBase',
            meta: {
                title: '基础部分',
                icon: 'el-icon-notebook-2'
            },
            children: [
                {
                    path: '/threejs/Line',
                    component: () => import('@/pagethreejs/learning/Line.vue'),
                    name: 'ThreeLine',
                    meta: {
                        title: '线'
                    },
                },
                {
                    path: '/threejs/Face',
                    component: () => import('@/pagethreejs/learning/Face.vue'),
                    name: 'ThreeFace',
                    meta: {
                        title: '面'
                    }
                },
                {
                    path: '/threejs/Ball',
                    component: () => import('@/pagethreejs/learning/Ball.vue'),
                    name: 'ThreeBall',
                    meta: {
                        title: '球'
                    },
                },
                {
                    path: '/threejs/Block',
                    component: () => import('@/pagethreejs/learning/Block.vue'),
                    name: 'ThreeBlock',
                    meta: {
                        title: '方块'
                    },
                }
            ]
        },
        {
            path: '/component',
            redirect: 'noRedirect',
            name: 'ThreeComponent',
            meta: {
                title: '基础组件',
                icon: 'el-icon-notebook-2'
            },
            children: [

            ]
        },
        {
            path: '/light',
            redirect: 'noRedirect',
            name: 'ThreeLight',
            meta: {
                title: '光源',
                icon: 'el-icon-notebook-2'
            },
            children: [
                
            ]
        }
    ]
}
export default threejsRouter