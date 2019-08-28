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
  let scores = await highscoreDb.getTopScores()
  let success = {}
  let newHighscore = false
  let userHighscore = false
  if (req.body.score > scores[4].score) {
    success = await highscoreDb.addNewScore(req.body) // go ahead and throw it in there before we mark new hs
    // There is a new highscore
    newHighscore = true
    req.body.newHighscore = true
    scores.push(req.body)
    scores.sort((a, b) => {
      return b.score - a.score
    })
    scores.splice(5, 1)
  }
  if (success.message) {
    res.status(200).send(success.message)
  } else {
    if (req.user.highscore) {
      if (req.body.score > req.user.highscore) {
        userHighscore = true
        req.user.highscore = req.body.score
        req.user.save()
      }
    } else {
      req.user.highscore = req.body.score
      req.user.save()
    }
    res.status(200).send({ user: { highScore: req.user.highscore, newUserHighscore: userHighscore }, newHighscore, scores })
  }
})

module.exports = router
