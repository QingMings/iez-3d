import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './module/userModule'
import settingModule from './module/settingModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    settingModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }

})
