import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

// 验证用户操作路由
import './checkuser'

// 开启日志监控
import '@/util/app/error.log.js'

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