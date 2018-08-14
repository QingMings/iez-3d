export default {
  namespaced: true,
  state: {
    settings: {
      hotPointMark: true,
      buildMark: true
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
      if (index === 0){
        return state.settings.hotPointMark
      }
      else if (index === 1) {
        return state.settings.buildMark
      }
    }
  }

}
