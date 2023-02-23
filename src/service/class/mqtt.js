import Paho from 'paho-mqtt'

// 先写死
export const SOCKET_NAMESPACE = 'mqttjs_33f3bd5258'

export const logPrefix = '【MQTT SERVICE】'

class Mqtt {
    constructor({ host, port }) {
        this.timeout = 5

        this.keepAlive = 100;

        this.cleanSession = false;

        this.ssl = false;

        this.max_subscribes_to_send = 1000;

        this.reconnectTimeout = 1000;

        this.clientId = SOCKET_NAMESPACE

        this.host = host;

        this.port = port;

        this.onConnecteds = [];

        this.connectState = "notconnect";

        this.destinationObjs = {};

        this.topicsCallback = {};

        this.stateTimeout = null;

        this.retryTimeout = null;

        this.mqttInstance = null
    }

    connect(onConnected) {
        if(this.connectState === 'connecting') {
            onConnected && this.onConnecteds.push(onConnected)
            return
        }
        if(this.connectState === 'connected') {
            onConnected && onConnected()
            return
        }
        onConnected && this.onConnecteds.push(onConnected)
        
        this.mqttInstance =  new Paho.Client(this.host, this.port, this.clientId)

        var options = {
            invocationContext: {
                host: this.host,
                port: this.port,
                path: this.mqttInstance.path,
                clientId: this.clientId,
            },
            timeout: this.timeout,
            keepAliveInterval: this.keepAlive,
            cleanSession: this.cleanSession,
            useSSL: this.ssl,
            onSuccess:  () => {
                console.log(`${ logPrefix } 连接成功 ······`)
                this.connectState = "connected";
                for(const handler of this.onConnecteds) {
                    handler()
                }
            },
            onFailure:  (e) => {
                console.log(`${ logPrefix } 连接失败 ······`)
                console.log('失败原因: ', e)
                this.reconnect();
            },
        };

        this.mqttInstance.onConnectionLost = this.onConnectionLost
        this.mqttInstance.onMessageArrived = this.onMessageArrived
        
        this.mqttInstance.connect(options)
        this.connectState = 'connecting'
        console.log(`${ logPrefix } 连接中 ······`)
    }

    reconnect() {
        if(this.retryTimeout) {
            clearTimeout(this.retryTimeout)
            this.retryTimeout = null
        }

        if(this.stateTimeout) {
            clearTimeout(this.stateTimeout)
            this.stateTimeout = null
        }

        this.retryTimeout = setTimeout(() => {
            console.log(`${ logPrefix } 重连中 ······`)
            this.connect()
            this.retryTimeout = null
        }, this.reconnectTimeout);

        this.stateTimeout = setTimeout(() => {
            if(this.connectState !== 'connected') {
                this.connectState = 'notconnect'
                this.connect()
            }
            this.stateTimeout = null
        }, 60 * 1000);
    }

    onConnectionLost = (responseObject) => {
        this.connectState = "connectionLost";
        this.reconnect();
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
        console.log(`${ logPrefix } 连接已断开 ······`)
    }

    onMessageArrived = (message) => {
        const { destinationName, payloadString } = message
        var callbacks = this.topicsCallback[this.destinationObjs[destinationName]];
        var data = null;
        try {
            data = JSON.parse(payloadString);
        } catch (e) {
            data = payloadString;
        }

        if (callbacks && callbacks.length) {
            
            for(const handler of callbacks) {
                handler && handler(destinationName, data)
            }
        }
    }

    subscribe(topic, callback, destinationNames) {
        if(!destinationNames || !destinationNames.length) {
            destinationNames = [topic]
        }

        for(const name of destinationNames) {
            this.destinationObjs[name] = topic
        }

        if(!this.topicsCallback[topic]) {
            this.mqttInstance.subscribe(topic)
            this.topicsCallback[topic] = []
        }

        if(!this.topicsCallback[topic].includes(callback)) {
            this.topicsCallback[topic].push(callback)
        }
        console.log(`${ logPrefix } 订阅${ topic }成功 ······`)
    }


    unsubscribe(topic, callback, destinationNames) {
        if(!destinationNames || !destinationNames.length) {
            destinationNames = [topic]
        }

        for(const name of destinationNames) {
            this.destinationObjs[name] = topic
        }

        const topicsCallbacks = this.topicsCallback[topic];
        
        if(this.topicsCallback[topic]) {
            const index = topicsCallbacks.indexOf(callback)
            if(index !== -1) {
                this.topicsCallback[topic].splice(index, 1)
            }
        }

        if(!topicsCallbacks || !topicsCallbacks.length) {
            delete this.topicsCallback[topic]
            this.mqttInstance.unsubscribe(topic, {
                onSuccess: this.unsubscribeSuccess
            })
        }
    }

    unsubscribeSuccess() {
        console.log(`${ logPrefix } 取消订阅成功 ······`)
    }


    send(message) {
        if(!this.mqttInstance) {
            console.log(`${ logPrefix } 下发失败，未连接 ······`)
            return
        }
        this.mqttInstance.send(message)
    }


    createSubscribes(topics, callback, destinationNames) {
        const length = topics.length
        const max = length > this.max_subscribes_to_send ? this.max_subscribes_to_send : length

        const formatList = topics.slice(0, max)
        for(const topic of formatList) {
            this.subscribe(topic, callback, destinationNames)
        }

        if(length > this.max_subscribes_to_send) {
            topics.splice(0, this.max_subscribes_to_send)
            setTimeout(() => {
                this.createSubscribes(topics, callback, destinationNames)
            }, 0);
        }
    }


    destroySubscribes(topics, callback, destinationNames) {
        const length = topics.length
        const max = length > this.max_subscribes_to_send ? this.max_subscribes_to_send : length

        const formatList = topics.slice(0, max)
        for(const topic of formatList) {
            this.unsubscribe(topic, callback, destinationNames)
        }

        if(length > this.max_subscribes_to_send) {
            topics.splice(0, this.max_subscribes_to_send)
            setTimeout(() => {
                this.unsubscribe(topics, callback, destinationNames)
            }, 0);
        }
    }


    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    guid() {
        return `${ this.S4() }${ this.S4() }-${ this.S4() }-${ this.S4() }-${ this.S4() }-${ this.S4() }${ this.S4() }${ this.S4() }  `
    }

}

export default Mqtt