/**
 * 
 * @author wuchuang
 * 有个缺陷，rxjs 较新的版本用法没弄明白，暂时用之前用过的 5.5.2版本的还算知道一些用法
 * 有些讲不清楚，可能俺水平不行  share() 被和谐了，生成多个实例
 * 不想用手写的推送形式
 * 
 */

import Mqtt, { logPrefix } from './util/pahomqtt'
import * as translate from './util/translatedata'
import { loginSubject } from './loginService'
import Rx from 'rxjs'
import store from '@/store'

// 避免刷新操作
if(store.state.user.token) loginSubject.next(1)

let mqttInstance = null

let subscribelist = []
/**
 * 创建一个观察对象
 */
const sourceInstance = Rx.Observable.create(observer => {
    loginSubject.subscribe(flag => {
        if(!flag) {
            if(mqttInstance) {
                mqttInstance.dispose()
                mqttInstance = null
            }
        } else {
            mqttInstance = new Mqtt({
                host: '10.33.0.108',
                post: 8083
            })
            mqttInstance.connect()

            mqttInstance.on('ready', () => {
                if(subscribelist.length) {
                    subscribelist.forEach(item => {
                        mqttInstance.subscribe(item)
                    })
                    subscribelist = []
                }
                console.log(`${ logPrefix } 实例创建成功 ······`)
            })
            mqttInstance.on('message', message => observer.next(message))
        }
    })
}).share()


export const subscribeMqtt = (toptic) => {
    if(mqttInstance) {
        mqttInstance.subscribe(toptic)
    } else {
        subscribelist.push(toptic)
    }
}

/**
 * 这种属于普通的订阅，就是服务端会自己送进来数据，进行一个匹配
 * @param {} cmd 
 * @returns 
 */
const createNromalObservable = (topic) => {
    return Rx.Observable.create((observer) =>{ 
        sourceInstance.filter(message => message && message?.topic === topic) .subscribe(message => observer.next(message))
    }).share()
}

/**
 * 这种属于高级订阅， 需要通知服务端一声否则不给数据
 * 后续可以追加心跳避免终端
 */
const createMaticsObservable = (topic) => {
    subscribeMqtt(topic)
    return Rx.Observable.create((observer) =>{ 
        sourceInstance.filter(message => message && message?.topic === topic) .subscribe(message => observer.next(message))
    }).share()
}

/**
 * 订阅 Topic 为 testtopic 的数据消息
 */
export const MQTT_topicA = createNromalObservable('topicA').map(message => translate.translateTopicA(message))

export const MQTT_topicB = createNromalObservable('topicB')

export const MQTT_topicC= createMaticsObservable('topicC')