import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {},
    isLoading: false,
    error: {
      text: '',
      isError: false
    }
  },
  mutations: {
    SET_USER: (state, payload) => state.user = payload,
    SET_ERROR: (state, payload) => state.error = payload,
    SET_LOADING: (state, payload) => state.isLoading = payload
  },
  getters: {
    authUser: state => state.user,
    error: state => state.error,
    isLoading: state => state.isLoading
  },
  actions: {
    setAuthUser: (context, value) => context.commit('SET_USER', value),
    clearAuthUser: (context) => context.commit('SET_USER', {}),
    setError: (context, value) => context.commit('SET_ERROR', value),
    setLoading: (context, value) => context.commit('SET_LOADING', value)
  },
})
