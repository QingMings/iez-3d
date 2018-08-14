// import defaultProfile from '@/assets/default.jpg'
export default {
  namespaced: true,
  state: {
    user: {
      userCode: 'Guest',
      userName: 'Guest',
      roleName: 'default',
      roleList: [],
      userProfile: 'static/default.jpg'
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    }
  }
}
