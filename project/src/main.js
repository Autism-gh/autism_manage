import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import './checkuser'

import './property'

import '@/style/common/index.scss' // global css

import Element from 'element-ui'
Vue.use(Element, {
  size: 'mini', // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")