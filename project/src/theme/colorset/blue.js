/**
 * 
 * 与element 同步变更的颜色 这里需要动态抛出 利用 css-var 方便其他的样式伴随修改
 * 
 */
 const basic = {
    '--color-primary': '#33cde5',
}


/**
 * 
 * 
 * extand 拓展颜色
 * 
 * 
 */

const extand = {
    
    // 背景拓展
    '--background-color-light':  '#333333',
    '--background-color-lighter':  '#3a3b3c',
    '--background-color-modal': '#2e2e2e',


    // 菜单
    '--menu-text': '#bfcbd9',
    '--menu-active-text': '#33cde5',
    '--sub-menu-active-text': '#f4f4f5',

    '--menu-bg': '#304156',
    '--menu-hover': '#263445',

    '--sub-menu-bg': '#1f2d3d',
    '--sub-menu-hover': '#001528',

    '--side-bar-width': '210px'
}


export default {
    ...basic,

    ...extand
}