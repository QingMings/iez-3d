import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/userModule'
import settingModule from './module/settingModule'
import commonModule from './module/commonModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    settingModule,
    commonModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }

})
