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
import '../public/static/plugins/layer/theme/default/layer.css'
// import $ from './utils/jquery-vendor'
import 'jquery'
import layer from 'layer'
// import 'layer.css'

Vue.prototype.$http = http
// Vue.prototype.$layer = layer
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(vuex)
Vue.use(VModel, { componentName: 'foo-modal' })
new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')
