import {eventBus} from '../../components/eventbus/EventBus'
import {SettingEvent} from '../../iez3d/eventhandler/SettingEventHandler'
export default {
  namespaced: true,
  state: {
    settings: {
      // 是否开启地形
      enableTerrain: false
    }
  },
  mutations: {
    enableTerrain (state, status) {
      state.settings.enableTerrain = status
      eventBus.$emit(SettingEvent.enableTerrain,status)
    }

  },
  getters: {
    /**
     *@time: 2018/8/14下午3:54
     *@author:QingMings(1821063757@qq.com)
     *@desc: 根据下标返回状态
     *
     */
    getSettingByIndex: (state) => (index) => {
      switch (index) {
        case 0:
          return state.settings.enableTerrain
      }
    },
    getEnableTerrain: (state) => {
      return state.settings.enableTerrain
    },
  },
  actions: {

  }

}
