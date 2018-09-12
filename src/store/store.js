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
    visible:false,
  },
  getters : {
    getVis:state=>{
      return state.visible;
    }
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.visible=!state.visible;

    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }

})
