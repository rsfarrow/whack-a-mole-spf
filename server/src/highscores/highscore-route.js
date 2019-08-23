const express = require('express')
const highscoreDb = require('./highscore-repository')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/highscores', auth, async (req, res) => {
  const scores = await highscoreDb.getTopScores()
  res.status(200).send({ scores })
})

// TODO: add the new score and see if it's a highscore
// Send in a score and return the highscores
router.post('/highscores', auth, async (req, res) => {
  const success = await highscoreDb.addNewScore(req.body)
  if (success.message) {
    res.status(200).send(success.message)
  } else {
    const scores = await highscoreDb.getTopScores()
    res.status(200).send({ scores })
  }
})

module.exports = router
