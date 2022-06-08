/**
 * 对数据进行翻译
 * @param {原生消息数据} message 
 * @returns 
 * @author
 */

// 调试请用这个数据发送
export const mockData = '{"component":"mqtt","author":"wuchuang","rxjsversion":"^5.5.2","marker":"有问题找我"}'

export const translateTopicA = (message) => {
    const { payloadString } = message
    return JSON.parse(payloadString)
}