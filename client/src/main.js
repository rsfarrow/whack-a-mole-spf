import Vue from 'vue'
import App from './views/home.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import VueConfetti from 'vue-confetti'

Vue.use(VueConfetti)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
