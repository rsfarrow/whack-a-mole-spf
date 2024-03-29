import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const defaultSettings = {
  darkMode: false,
  customCursor: true
}
export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  state: {

    loggedIn: false,
    guest: false,
    user: {},
    // Default settings
    settings: defaultSettings
  },
  getters: {
    name: state => state.user.name,
    email: state => state.user.email || 'Guest',
    loggedIn: state => state.loggedIn,
    darkMode: state => state.settings.darkMode,
    customCursor: state => state.settings.customCursor,
    guestUser: state => state.guest
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
    },
    resetSettings (state) {
      state.settings = defaultSettings
    },
    updateGuestSettings (state, guest) {
      state.guest = guest
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
      commit('resetSettings')
      commit('updateGuestSettings', false)
    },
    signInAsGuest ({ commit }, name) {
      commit('updateLoggedIn', true)
      commit('updateGuestSettings', true)
      commit('updateUser', { name: name, email: '' })
      commit('updateGuestSettings', true)
    },
    turnOnDarkMode ({ commit }) {
      commit('updateDarkMode', true)
    },
    turnOffDarkMode ({ commit }) {
      commit('updateDarkMode', false)
    },
    turnOnCustomCursor ({ commit }) {
      commit('updateCustomCursor', true)
    },
    turnOffCustomCursor ({ commit }) {
      commit('updateCustomCursor', false)
    }
  }
})
