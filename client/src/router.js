import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

Vue.use(Router)
// Constants for routes
const HOME_ROUTE = '/login'
const HOME_NAME = 'home'
const WHACK_ROUTE = '/whack-a-mole'
const WHACK_NAME = 'whack-a-mole'
const TTT_NAME = 'tic-tac-toe'
const TTT_ROUTE = '/tic-tac-toe'
const ABOUT_ROUTE = '/about'
const ABOUT_NAME = 'about'
const HIGHSCORE_NAME = 'highscores'
const HIGHSCORE_ROUTE = '/highscores'
// Constants for components and lazy loading
const Login = () => import('./views/login.vue')
const Whack = () => import('./views/whack-a-mole.vue')
const Tic = () => import('./views/tic-tac.vue')
const Highscore = () => import('./views/highscores.vue')
const About = () => import('./views/about.vue')
export default new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '*',
      beforeEnter: (to, from, next) => {
        store.getters.loggedIn ? next({ name: WHACK_NAME }) : next({ name: HOME_NAME })
      }
    },
    {
      path: HOME_ROUTE,
      name: HOME_NAME,
      component: Login
    },
    {
      path: WHACK_ROUTE,
      name: WHACK_NAME,
      component: Whack,
      beforeEnter: (to, from, next) => {
        store.getters.loggedIn ? next() : next({ name: HOME_NAME })
      }
    },
    {
      path: TTT_ROUTE,
      name: TTT_NAME,
      component: Tic,
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
    },
    {
      path: ABOUT_ROUTE,
      name: ABOUT_NAME,
      component: About
    }
  ]
})
