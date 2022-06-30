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
