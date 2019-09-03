import axios from 'axios'
const API_URI = 'https://whack-a-mole-spf.herokuapp.com/'
const CREATE_USER = 'user'
const LOGIN = 'login'
const LOGOUT = 'logout'
const LOGOUT_ALL = 'logoutall'
const HIGHSCORE = 'highscores'
const PROFILE = 'users/me'

// TODO: Also do some checking on the http status and such.
export class APIService {
  async createUser (payload) {
    const url = `${API_URI}${CREATE_USER}`
    return this.sendAxios(url, 'POST', payload)
  }

  async loginUser (payload) {
    const url = `${API_URI}${LOGIN}`
    let resp = await this.sendAxios(url, 'POST', payload)
    if (resp.success) {
      localStorage.setItem('😎', resp.token)
    }
    return resp
  }

  async logoutUser () {
    const url = `${API_URI}${LOGOUT}`
    let resp = await this.sendAxios(url, 'GET')
    if (resp.success) {
      localStorage.clear()
    }
    return resp
  }

  async logoutAll () {
    const url = `${API_URI}${LOGOUT_ALL}`
    let resp = await this.sendAxios(url, 'GET')
    if (resp.success) {
      localStorage.clear()
    }
    return resp
  }
  async getHighscores () {
    const url = `${API_URI}${HIGHSCORE}`
    return this.sendAxios(url, 'GET')
  }
  async sendHighscores (payload) {
    const url = `${API_URI}${HIGHSCORE}`
    return this.sendAxios(url, 'POST', payload)
  }

  async getProfile () {
    const url = `${API_URI}${PROFILE}`
    return this.sendAxios(url, 'GET')
  }

  async sendAxios (uri, method, payload) {
    let token = localStorage.getItem('😎')
    let options = {}
    if (token) {
      options = { Authorization: 'Bearer ' + token }
    }
    try {
      let res = await axios({
        method: method,
        url: uri,
        data: payload,
        headers: options })
      return Promise.resolve(res.data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
