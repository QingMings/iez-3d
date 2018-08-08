import Vue from 'vue'
import Router from 'vue-router'
import CesiumViewer from './components/CesiumViewer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CesiumViewer',
      component: CesiumViewer
    }
  ]
})
