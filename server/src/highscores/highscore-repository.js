var highscoreDb = require('./highscore-model')

// return the top 5 highscores
const getTopScores = async () => {
  return highscoreDb.find({}, { _id: 0, __v: 0 }).limit(5).sort({ score: -1 })
}

// insert a new score to the DB
const addNewScore = async (score) => {
  return highscoreDb.insertMany(score)
    .catch((err) => {
      return (err)
    })
}

module.exports = { getTopScores, addNewScore }
