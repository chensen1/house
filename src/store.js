import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: { info: '000' } // 储存用户相关信息
  },
  mutations: {
    USER_SIGNIN (state, user) {
      // 储存用户相关信息
      console.log(user)
      state.userInfo = user
    }
  },
  actions: {
    toStateUser ({ commit }, user) {
      // commit(USER_SIGNIN, user)
    }
  }
})
