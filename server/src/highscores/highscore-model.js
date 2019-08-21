const mongoose = require('mongoose')

const highscoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true
  },
  numOfMoles: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  }
})

const Highscore = mongoose.model('Highscore', highscoreSchema)

module.exports = Highscore
