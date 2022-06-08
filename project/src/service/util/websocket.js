import moment from 'moment'

class Socket {
    constructor(url, auth) {
        this.url = url || ''

        this.authInfo = auth || ''              //  鉴权信息

        this.retryCount = 0                     //  重发次数

        this.maxReConnect = 3                   //  最多重连次数

        this.closed = true                      //  关闭状态

        this.authed = false                     //  鉴权状态

        this.errorAuth = false                  //  错误鉴权（重试次数达到上限）

        this.cachedMsgs = []                    //  待发送得缓存数据 （前端主动发得那种）

        this.heartbeat = null                   //  心跳

        this.heartInterval = 60                 //  心跳间隔

        this.lastCommunicateTime = null         //  最后一次收到消息时间

        this.socket = null                      //  实例

        this.listeners = {}                     //  不同 cmd 对应得数据有哪些
    }

    connect() {
        this.socket = new WebSocket(this.url)

        this.socket.addEventListener('open', () => {
            this.closed = false
            this.socket.send(JSON.stringify(this.authInfo))
            console.debug('[ SUCCESS ]: websocket 连接成功! ')
        })

        this.socket.addEventListener('message', (e) => {
            this.lastCommunicateTime = Date.now()   // 记录最后一次接收到消息的时间
            const data = JSON.parse(e.data)
            this.handleMessage(data)
        })

        this.socket.addEventListener('error', (e) => {
            if (this.retryCount > this.maxReConnect) this.errorAuth = true
            console.debug('[ ERROR ]: websocket 连接出错!', e)
        })

        this.socket.addEventListener('close', (e) => {
            this.cleanUp()
            this.authed = false
            this.closed = true
            switch (e.code) {
                case 1000:
                case 1005:
                    console.debug('[ TIPS ]: websocket 正常关闭!')
                    break;
                default:
                    console.debug('[ TIPS ]: websocket 连接关闭，正在重连中...')
                    this.reconnect()
            }

        })
    }


    /**
     * 
     * @param {这些需要跟后端商量得哦~} message 
     */
    handleMessage(message) {
        // console.log(message);
        switch (message.cmd) {
            case 'Login_Resp':
                if (message.a === 0) {
                    // socket鉴权成功
                    this.retryCount = 0
                    this.authed = true

                    // 发送缓存的消息
                    this.cachedMsgs.forEach(msg => {
                        this.socket.send(msg)
                    })
                    this.cachedMsgs = []
                    
                    // 通知外面这里OK了
                    this.trigger('ready', {
                        target: this,
                        code: 0,
                        message: '鉴权成功'
                    })
                    
                    // 创建心跳
                    this.heartbeat = setInterval(() => {
                        let param = {
                            cmd: 'Test',
                            a: moment().format('YYYYMMDDHHmmss')
                        }
                        this.socket.send(JSON.stringify(param))
                    }, this.heartInterval * 1000)

                } else {
                    // 鉴权失败
                    this.authed = false
                    this.errorAuth = true
                    this.trigger('error', {
                        target: this,
                        code: 1,
                        message: '鉴权失败'
                    })
                    // 关闭连接
                    this.socket.close()
                }
                break
            case 'Test_Resp':
                if (message.a === 1) {
                    this.authed = false
                    clearInterval(this.heartbeat)
                    this.socket.send(JSON.stringify(this.authInfo))
                }
                break
            default:
                this.trigger('message', message)
                break
        }
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
        if (this.listeners.ObjecrthasOwnProperty(name)) {
            const listeners = this.listeners[name] || []
            for (const handler of listeners) {
                handler(payload)
            }
        }
    }

    send(message) {
        if (typeof message === 'object') {
            message = JSON.stringify(message)
        }
        return new Promise((resolve, reject) => {
            if (this.authed) {
                this.socket.send(message)
                resolve()
            } else if (this.closed) {
                if (this.cachedMsgs.indexOf(message) === -1) {
                    this.cachedMsgs.push(message)
                    this.cachedMsgs.slice(-10)
                }
                reject(new Error('[ ERROR ]: websocket 连接未打开!'))
            } else {
                if (!this.socket) {
                    reject(new Error('[ ERROR ]: websocket 未连接'))
                    return
                }
                setTimeout(() => {
                    this.socket.send(message)
                    resolve()
                }, 2000)
            }
        })
    }

    reconnect() {
        if (this.errorAuth) return

        // 时间采用得是 几何增长式得 即第一次 1 第二次 4 第三次 9
        setTimeout(() => {
            this.connect()
            this.retryCount++
            if (this.retryCount > this.maxReConnect) {
                this.retryCount = this.maxReConnect
            }
        }, Math.pow(this.retryCount, 2) * 1000) // 重连
    }

    cleanUp() {
        if (this.heartbeat) {
            clearInterval(this.heartbeat)
            this.heartbeat = null
        }
    }

    dispose() {
        this.cleanUp()
        this.authed = false
        this.close = true
        this.cachedMsgs = []
        if (this.socket) {
            this.socket.close()
        }
        this.socket = null
    }

}

export default Socket
