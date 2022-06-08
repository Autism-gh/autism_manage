import Paho from 'paho-mqtt'
import { isObject } from '@/util/common/type-check'

// 先写死
export const SOCKET_NAMESPACE = 'mqttjs_1703e55d10'

export const logPrefix = '【MQTT SERVICE】'

class Mqtt {
    constructor({ host, post }) {
        this.timeOut = 5

        this.keepAlive  = 100

        this.cleanSession = false

        this.ssl = false

        // 重发次数
        this.retryCount = 0

        this.maxReConnect = 3                   //  最多重连次数

        this.clientId = SOCKET_NAMESPACE

        this.host = host

        this.post = post

        this.connectState = 'notconnect'        //  连接状态

        this.lastCommunicateTime = null         //  最后一次收到消息时间

        this.heartbeat = null                   //  心跳

        this.heartInterval = 60                 //  心跳间隔

        this.errorAuth = false                  //  错误鉴权（重试次数达到上限）

        this.listeners = {}

        this.pahoMqtt = null

        this.closed = false                     //   mqtt 当前状态
    }

    connect() {
        this.pahoMqtt = new Paho.Client(this.host, this.post, this.clientId)
        
        const options = {
            invocationContext: {
                host: this.host,
                port: this.port,
                path: this.pahoMqtt.path,
                clientId: this.clientId
            },
            timeout: this.timeOut,
            keepAliveInterval: this.keepAlive,
            cleanSession: this.cleanSession,
            useSSL: this.ssl,

            onSuccess: () => {
                console.log(`${ logPrefix } 连接成功 ······`)
                this.closed = false
                this.retryCount = 0
                this.connectState = 'connected'

                this.trigger('ready', {
                    target: this,
                    code: 0,
                    message: '连接成功'
                })
            },

            onFailure: (e) => {
                if (this.retryCount > this.maxReConnect) {
                    console.log(`${ logPrefix } 已达到最大重连次数，验证失败 ······`)
                    this.connectState = 'connectOverTimes'
                    this.errorAuth = true
                    this.closed = true
                    return
                }

                this.trigger('error', {
                    target: this,
                    code: 0,
                    message: '连接失败'
                })
                console.log(`${ logPrefix } 连接失败 ······`)
                console.log('失败原因: ', e)
                this.reconnect()
            }
        }
        
        this.pahoMqtt.onConnectionLost = this.onConnectionLost
        this.pahoMqtt.onMessageArrived = this.onMessageArrived

        this.pahoMqtt.connect(options)
        this.connectState = 'connecting'

        console.log(`${ logPrefix } 连接中 ······`)
    }

    /**
     * 
     * @returns 
     */
    reconnect() {
        // 已经重连达到最大次数的就不在重新连接了
        if(this.errorAuth) return

        setTimeout(() => {
            this.connect()
            this.retryCount ++
            if(this.retryCount > this.maxReConnect) {
                this.retryCount = this.maxReConnect
            }
        }, Math.pow(this.retryCount, 2) * 1000)
    }


    /**
     * 连接断开回调
     * @param {返回对象} responseObject 
     */
    onConnectionLost = (responseObject) => {
        if(!responseObject) return

        this.closed = true
        this.connectState = 'connectionLost'
        
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:", responseObject.errorMessage);
        }
        
        console.log(`${ logPrefix } 连接丢失 ······`)
    }

    /**
     * 来消息了
     * @param {消息} message 
     */
     onMessageArrived = (message) => {
        this.trigger('message', message)
    }



    send(message) {
        if(isObject(message)) {
            message = JSON.stringify(message)
        }
        if(!this.pahoMqtt) {
            console.log(`${ logPrefix } 下发失败，未连接 ······`)
            return
        }
        if(this.closed) {
            console.log(`${ logPrefix } 下发失败，连接未打开 ······`)
            return
        }
        this.pahoMqtt.send(message)

    }


    subscribe(toptic) {
        if(!this.pahoMqtt) {
            console.log(`${ logPrefix } 订阅失败，未连接 ······`)
            return
        }
        if(this.closed) {
            console.log(`${ logPrefix } 订阅失败，连接未打开 ······`)
            return
        }

        this.pahoMqtt.subscribe(toptic)
        console.log(`${ logPrefix } 订阅 ${ toptic } 消息成功 ······`)
    }


    

    on(name, listener) {
        if (typeof listener === 'function') {
            const handlers = this.listeners[name] = this.listeners[name] || []
            handlers.push(listener)
        }
    }

    off(name, listener) {
        if (typeof listener === 'function') {
            const handlers = this.listeners[name] || []
            this.listeners[name] = handlers.filter(handler => handler !== listener)
        }
    }

    trigger(name, payload) {
        if (Object.prototype.hasOwnProperty.call(this.listeners, name)) {
            const listeners = this.listeners[name] || []
            for (const handler of listeners) {
                handler(payload)
            }
        }
    }

    cleanUp() {
        if (this.heartbeat) {
            clearInterval(this.heartbeat)
            this.heartbeat = null
        }
    }

    dispose() {
        // this.cleanUp()
        console.log(`${ logPrefix } 连接被销毁 ······`)
        this.closed = true
        if(this.pahoMqtt) {
            this.pahoMqtt.disconnect()
        }
        this.close = true
        this.pahoMqtt = null
    }


}

export default Mqtt