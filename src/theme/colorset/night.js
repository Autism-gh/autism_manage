/**
 * 
 * 与element 同步变更的颜色 这里需要动态抛出 利用 css-var 方便其他的样式伴随修改
 * 
 */
 const basic = {
    '--color-primary': '#000000',
}


/**
 * 
 * 
 * extand 拓展颜色
 * 
 * 
 */

const extand = {

}


export default {
    ...basic,

    ...extand
}