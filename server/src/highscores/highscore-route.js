const express = require('express')
const highscoreDb = require('./highscore-repository')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/highscores', auth, async (req, res) => {
  const scores = await highscoreDb.getTopScores()
  res.status(200).send({ scores })
})

// Send in a score and return the highscores
router.post('/highscores', auth, async (req, res) => {
  const success = await highscoreDb.addNewScore(req.body)
  if (success.message) {
    res.status(200).send(success.message)
  } else {
    let newHighscore = false
    const scores = await highscoreDb.getTopScores()
    if (req.user.highscore) {
      if (req.body.score > req.user.highscore) {
        newHighscore = true
        req.user.highscore = req.body.score
        req.user.save()
      }
    } else {
      req.user.highscore = req.body.score
      req.user.save()
    }
    res.status(200).send({ user: { highScore: req.user.highscore, newUserHighscore: newHighscore }, scores })
  }
})

module.exports = router
