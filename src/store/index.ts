import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    isLoading: false,
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.user = payload
    }
  },
  getters: {
    authUser: state => {
      return state.user
    }
  },
  actions: {
    setAuthUser: (context, value) => {
      context.commit('SET_USER', value)
    },
    clearAuthUser: (context) => {
      context.commit('SET_USER', {})
    }
  },
  modules: {
  }
})
