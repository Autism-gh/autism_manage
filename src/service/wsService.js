import Socket from "./util/webSocket";
// import * as Rx from "rxjs";

import { Observable } from 'rxjs'
import { loginSubject } from "./authService";


let socket = null;
let heartbeat = null;


const monitorCmdStore = new Set(); 


/**
 *  这些是对一些重要得不可间端得那些数据做外界的一个心跳装置
 */
const monitorTask = () => {
    let m = {
        cmd: "MonitorControl",
        a: 0,
        b: Array.from(monitorCmdStore)
    };
    socket.send(m).catch(e => {
        console.log(e.message);
    });
};

const MessageSender = message => {
    return new Promise((resolve, reject) => {
        if (socket && message) {
            socket.send(message).then(() => {
                resolve();
            }).catch(e => reject(e));
        } else {
            reject(new Error("socket连接未打开!"));
        }
    });
};

const source = Observable.create( async(observer) => {
    loginSubject.subscribe( async(flag) => {
        if (!flag) {

            /**
             *  WS地址配置鉴权得地方
             *  还有验证东西得地方
             *  这里做一个地址外界配置单子，此处读取得
             */

            let result = {}
            if(!result) {
                console.debug('[error]::socket鉴权信息获取失败')
                return
            }

            const auth = result.data;
            socket = new Socket(window.SYSTEM.websocketUrl, {
                cmd: "Login",
                a: auth.token
            });
            socket.connect();
            socket.on("message", message => observer.next(message));
            socket.on("ready", () => {
                if (monitorCmdStore.size > 0 && !heartbeat) {
                    monitorTask();
                    heartbeat = setInterval(monitorTask, 60000);
                }
            });
        } else {
            monitorCmdStore.clear();
            if (heartbeat) {
                clearInterval(heartbeat);
                heartbeat = null;
            }
            if (socket) {
                socket.dispose();
                socket = null;
            }
        }
    });
}).share();


const createMonitorObservable = cmd => {
    return Observable.create(observer => {
        // 订阅
        source.filter(message => message.cmd === cmd).subscribe(message => observer.next(message));
        // 发送心跳
        monitorCmdStore.add(cmd);
        if (socket) {
            monitorTask();
            if (heartbeat) clearInterval(heartbeat);
            heartbeat = setInterval(monitorTask, 60000);
        }
        // 取消订阅
        return () => {
            monitorCmdStore.delete(cmd);
            if (socket) {
                socket.send({
                    cmd: "MonitorControl",
                    a: 1,
                    b: [cmd]
                });
            }
            if (monitorCmdStore.size === 0) {
                clearInterval(heartbeat);
                heartbeat = null;
            }
        };
    }).share();
};


const createNormalObservable = cmd => {
    return Observable.create(observer => {
        source.filter(message => message.cmd === cmd).subscribe(message => observer.next(message));
    }).share();
};

const closeWebSocket = () => {
    socket.dispose()
}

// const GPS = createMonitorObservable("GPS").map(message => transformGpsMsg(message));

// const TempUpload = createNormalObservable('TempUpload').map(message => transformTempUpload(message))

export {
    // GPS,
    createMonitorObservable,
    createNormalObservable,
    MessageSender,
    closeWebSocket,
    // TempUpload
}