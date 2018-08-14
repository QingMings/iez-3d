import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuex from 'vuex'
import store from './store/store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './axios/http'
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(vuex)
new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
