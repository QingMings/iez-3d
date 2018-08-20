// import defaultProfile from '@/assets/default.jpg'
export default {
  namespaced: true,
  state: {
    user: {
      userCode: 'Guest',
      userName: 'Guest',
      roleName: 'default',
      roleList: [],
      userProfile: 'static/default.jpg',
      // 是否已登录
      logged: true
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    }
  },
  mutations: {
    resetUser: (state) => {
      console.info(`--debug-重置用户状态`)
      state.user = {
        userCode: 'Guest',
        userName: 'Guest',
        roleName: 'default',
        roleList: [],
        userProfile: 'static/default.jpg',
        // 是否已登录
        logged: false
      }
    }
  }
}
