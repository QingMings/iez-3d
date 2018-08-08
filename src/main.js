import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cesium from 'cesium/Cesium'
// noinspection ES6UnusedImports
import widget from 'cesium/Widgets/widgets.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    var viewer = new Cesium.Viewer('cesiumContainer')
  }
}).$mount('#app')
