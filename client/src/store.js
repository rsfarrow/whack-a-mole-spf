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
    user: {},
    // Default settings
    settings: {
      darkMode: false,
      customCursor: true
    }
  },
  getters: {
    name: state => state.user.name,
    email: state => state.user.email,
    loggedIn: state => state.loggedIn,
    darkMode: state => state.settings.darkMode,
    customCursor: state => state.settings.customCursor
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
    },
    updateDarkMode (state, dark) {
      state.settings.darkMode = dark
    },
    updateCustomCursor (state, custom) {
      state.settings.customCursor = custom
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
    },
    turnOnDarkMode ({ commit }) {
      commit('updateDarkMode', true)
      console.log(this.$vuetify)
    },
    turnOffDarkMode ({ commit }) {
      commit('updateDarkMode', false)
      console.log(this.$vuetify)
    },
    turnOnCustomCursor ({ commit }) {
      commit('updateCustomCursor', true)
    },
    turnOffCustomCursor ({ commit }) {
      commit('updateCustomCursor', false)
    }
  }
})
