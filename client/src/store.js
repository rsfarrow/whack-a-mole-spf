import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  state: {

    loggedIn: false,
    user: {}
  },
  getters: {
    name: state => state.user.name,
    email: state => state.user.email,
    loggedIn: state => state.loggedIn
  },
  mutations: {
    updateLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    updateUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = {}
    }
  },
  actions: {
    logInUser ({ commit }, user) {
      commit('updateLoggedIn', true)
      commit('updateUser', user)
    },
    logOutUser ({ commit }) {
      commit('updateLoggedIn', false)
      commit('clearUser')
    }

  }
})
