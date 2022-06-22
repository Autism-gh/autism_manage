import Vue from 'vue'


import CustomDirective from '@/util/directive'
Vue.use(CustomDirective);



import CustomTheme from '@/theme'
Vue.use(CustomTheme);




import store from '@/store';
Vue.prototype.$showwifemessage = (message) => {
    store.commit('wife/changeMessage', message)
}




import Mqtt from '@/service/class/mqtt'
Vue.prototype.$getMqtt = () => {
    const { $mqtt } = Vue.prototype
    if(!$mqtt) {
        Vue.prototype.$mqtt = new Mqtt({
            host: '10.33.0.108',
            port: 8083
        })
    }
    return Vue.prototype.$mqtt
}



import ElementUI from 'element-ui';
//  主要为了element得提示有点不方便，这样子可以直接穿文字就好了得
Vue.prototype.$success = (msg) => {
    ElementUI.Message({type: 'success', message: msg, showClose: true});
}
Vue.prototype.$error = (msg) => {
    ElementUI.Message({type: 'error', message: msg, showClose: true});
}
Vue.prototype.$warning = (msg) => {
    ElementUI.Message({type: 'warning', message: msg, showClose: true});
}
Vue.prototype.$info = (msg) => {
    ElementUI.Message({type: 'info', message: msg, showClose: true});
}