/**
 * 
 * 代码中需要用到的元素，每个主题的 color set 也是从这里拿的
 * 存在需要动态变更 因为走了动态生成好的样式的时候哪些 透明度形式的其实已经由生成器帮你做了已经
 * 
 * 除非是那种相当变态级别的项目，否则绝大多数情况下，用到的动态变量值都是微乎其微的
 * 
 */

export const defaultVariables = {
    // 基础
    '--color-primary': '#409EFF',
    '--color-white': '#FFFFFF',
    '--color-black': '#000000',

    // 三原色
    '--color-success': '#67C23A',
    '--color-warning': '#E6A23C',
    '--color-danger': '#F56C6C',
    '--color-info': '#909399',

    // 字体
    '--color-text-primary': '#303133',
    '--color-text-regular': '#606266',
    '--color-text-secondary': '#909399',
    '--color-text-placeholder': '#C0C4CC',

    // 边框
    '--border-color-base': '#DCDFE6',
    '--border-color-light': '#E4E7ED',
    '--border-color-lighter': '#EBEEF5',
    '--border-color-extra-light': '#F2F6FC',

    // 背景
    '--background-color-base': '#F5F7FA',
    

    // 阴影
    '--box-shadow-base': '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)',
    '--box-shadow-dark': '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12)',
    '--box-shadow-light': '0 2px 12px 0 rgba(0, 0, 0, 0.1)',

    // 滚动条
    '--scrollbar-background-color':'#3a3b3c'
}


export const extandVariables = {

    // 背景拓展
    '--background-color-light':  '#333333',
    '--background-color-lighter':  '#3a3b3c',
    '--background-color-modal': '#2e2e2e',


    // 主体
    '--app-main': '#f6f6f6',


    // 菜单
    '--menu-text': '#bfcbd9',
    '--menu-active-text': '#409EFF',
    '--sub-menu-active-text': '#f4f4f5',

    '--menu-bg': '#304156',
    '--menu-hover': '#263445',

    '--sub-menu-bg': '#1f2d3d',
    '--sub-menu-hover': '#001528',

    '--side-bar-width': '210px',


    // 间距，间隔
    '--default-padding': '10px'
}