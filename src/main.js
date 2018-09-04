import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuex from 'vuex'
import store from './store/store'
import iView from 'iview'
// import '@/assets/reset.less'
import 'iview/dist/styles/iview.css'
import VModel from 'vue-js-modal'
import http from './axios/http'
import '../public/js/layer/theme/default/layer.css'
import $ from './utils/jquery-vendor'
import Layer from '../public/js/layer/layer'
Vue.prototype.$http = http
Vue.prototype.$layer = Layer
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(vuex)
Vue.use(VModel, { componentName: 'foo-modal' })
new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
