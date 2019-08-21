var highscoreDb = require('./highscore-model')

// return the top 5 highscores
const getTopScores = async () => {
  return highscoreDb.find().limit(5).sort({ score: -1 })
}

// TODO: Don't insert unless it is a highscore, wasting space!
// insert a new score to the DB
const addNewScore = async (score) => {
  return highscoreDb.insertMany(score)
    .catch((err) => {
      return (err)
    })
}

module.exports = { getTopScores, addNewScore }
