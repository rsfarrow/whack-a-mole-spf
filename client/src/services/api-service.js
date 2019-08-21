import axios from 'axios'
const API_URL = 'https://whack-a-mole-spf.herokuapp.com/'
const CREATE_USER = 'user'
const LOGIN = 'login'
const LOGOUT = 'logout'
const LOGOUT_ALL = 'logoutall'
const HIGHSCORE = 'highscores'
// TODO: Maybe have a different way of sending these, they're all pretty much the same.
// TODO: Also do some checking on the http status and such.
export class APIService {
  createUser (payload) {
    const url = `${API_URL}${CREATE_USER}`
    return axios.post(url, payload)
  }

  loginUser (payload) {
    const url = `${API_URL}${LOGIN}`
    return axios.post(url, payload)
  }

  logoutUser (payload) {
    const url = `${API_URL}${LOGOUT}`
    return axios.post(url, payload)
  }

  logoutAll (payload) {
    const url = `${API_URL}${LOGOUT_ALL}`
    return axios.post(url, payload)
  }
  getHighscores () {
    const url = `${API_URL}${HIGHSCORE}`
    return axios.get(url)
  }
  sendHighscores (payload) {
    const url = `${API_URL}${HIGHSCORE}`
    return axios.post(url, payload)
  }
}
