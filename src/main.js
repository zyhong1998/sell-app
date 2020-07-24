import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 引入reset
import '@/assets/css/reset.css'
// 引入iconfont
import '@/assets/fonts/iconfont.css'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
