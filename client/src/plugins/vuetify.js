import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import store from '../store'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: store.getters.darkMode
  }
})
