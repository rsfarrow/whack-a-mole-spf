const express = require('express')
const User = require('./user-model')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/user', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).send({ success: true })
  } catch (error) {
    res.status(200).send({ success: false, err: error.message })
  }
})

router.post('/login', async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user: { name: user.name, email: user.email }, token, success: true })
  } catch (error) {
    res.status(200).send({ success: false, err: error.message })
  }
})

router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send({ name: req.user.name, email: req.user.email })
})
router.get('/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send({
      success: true,
      msg: 'Logged out successfully.'
    })
  } catch (error) {
    res.status(200).send({ success: false, err: error.message })
  }
})

router.get('/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send({
      success: true,
      msg: 'Logged out successfully.'
    })
  } catch (error) {
    res.status(200).send({ success: false, err: error.message })
  }
})

module.exports = router
