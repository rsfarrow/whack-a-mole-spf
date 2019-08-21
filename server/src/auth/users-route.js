const express = require('express')
const User = require('./user-model')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/user', async (req, res) => {
  // Create a new user
  // console.log('nodejs | post | /users | Entry')
  try {
    // console.log('nodejs | post | /users | Try')
    const user = new User(req.body)
    await user.save()
    // console.log('nodejs | post | /users | Save')
    const token = await user.generateAuthToken()
    // console.log('nodejs | post | /users | generateAuthToken: ', token)
    res.status(201).send({ user, token })
  } catch (error) {
    // console.log('nodejs | post | /users | catch an error')

    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    console.log('/users/login | post | findByCredentials Complete')
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    console.log('/users/login | post | generateAuthToken start')
    const token = await user.generateAuthToken()
    console.log('/users/login | post | generateAuthToken end: ', token)
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

// TODO: Def don't return the password or tokens
router.get('/users/me', auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user)
})
router.post('/logout', auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/logoutall', auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
