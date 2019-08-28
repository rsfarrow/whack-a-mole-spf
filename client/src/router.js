import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)
// Constants for routes
const HOME_ROUTE = '/login'
const HOME_NAME = 'home'
const GAME_ROUTE = '/game'
const GAME_NAME = 'game'
const HIGHSCORE_NAME = 'highscores'
const HIGHSCORE_ROUTE = '/highscores'
// Constants for components and lazy loading
const Login = () => import('./views/login.vue')
const Game = () => import('./views/whack-a-mole.vue')
const Highscore = () => import('./views/highscores.vue')
export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '*',
      beforeEnter: (to, from, next) => {
        next({ name: HOME_NAME })
      }
    },
    {
      path: HOME_ROUTE,
      name: HOME_NAME,
      component: Login
    },
    {
      path: GAME_ROUTE,
      name: GAME_NAME,
      component: Game,
      beforeEnter: (to, from, next) => {
        store.getters.loggedIn ? next() : next({ name: HOME_NAME })
      }
    },
    {
      path: HIGHSCORE_ROUTE,
      name: HIGHSCORE_NAME,
      component: Highscore,
      beforeEnter: (to, from, next) => {
        store.getters.loggedIn ? next() : next({ name: HOME_NAME })
      }
    }
  ]
})
