import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import utility from '../src/assets/js/utility'
Vue.use(ElementUI) // 全局使用ElementUI
Vue.config.productionTip = false
Vue.prototype.utility = utility
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
