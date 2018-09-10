export default {
  namespaced: true,
  state: {
    locationBox: {
      locationInfo: ''
    }
  },
  getters: {
    /**
     * @time: 2018/8/27下午2:33
     * @author:QingMings(1821063757@qq.com)
     * @desc: 返回 LocationInfo
     *
     */
    getLocationInfo: (state) => {
      return state.locationBox.locationInfo
    }
  },
  mutations: {
    /**
     * @time: 2018/8/27下午2:35
     * @author:QingMings(1821063757@qq.com)
     * @desc: 设置LocationInfo
     *
     */
    setLocationInfo: (state, info) => {
      state.locationBox.locationInfo = info
    }
  }

}
