var highscoreDb = require('./highscore-model')

// return the top 5 highscores
const getTopScores = async () => {
  return highscoreDb.find({}, { _id: 0, __v: 0 }).limit(5).sort({ score: -1 })
}

// TODO: Don't insert unless it is a highscore, wasting space!
// TODO: Check the rate and number of moles too, only return the same settings
// insert a new score to the DB
const addNewScore = async (score) => {
  return highscoreDb.insertMany(score)
    .catch((err) => {
      return (err)
    })
}

module.exports = { getTopScores, addNewScore }
