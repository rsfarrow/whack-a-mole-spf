import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('./views/login.vue')
const Game = () => import('./views/whack-a-mole.vue')
export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '*',
      // TODO: Check to see if the user is logged in or not - then navigate based on that
      beforeEnter: (to, from, next) => {
        next({ name: 'HOME' })
      }
    },
    {
      path: '/login',
      name: 'home',
      component: Login
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})
