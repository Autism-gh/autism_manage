/**
 *
 *
 * 把对象转成 key  value 格式的 formdata
 * 不属于多层的那种
 * 多层嵌套的有很多种特殊的 formdata 表单格式
 *
 *
 */

export const changeObjToKeyValueForm = (obj) => {
    const formData = new FormData()
    if (obj && toString.call(obj) === '[object Object]') {
        const keys = Object.keys(obj)
        keys.forEach(item => {
            formData.append(item, obj[item])
        })
    }
    return formData
}