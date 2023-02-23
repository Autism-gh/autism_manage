/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/entry/Index'

const canvasRouter = {
    path: '/canvas',
    component: Layout,
    redirect: 'noRedirect',
    name: 'canvas',
    meta: {
        title: 'Canvas',
        icon: 'el-icon-brush'
    },
    children: [
        {
            path: '/canvas/luckdraw',
            component: () => import('@/pagelearn/canvas/LuckDraw'),
            name: 'LuckDraw',
            meta: {
                title: '抽奖'
            },
        },
        {
            path: '/canvas/collision',
            component: () => import('@/pagelearn/canvas/Collision'),
            name: 'Collision',
            meta: {
                title: '碰撞'
            }
        }
    ]
}
export default canvasRouter