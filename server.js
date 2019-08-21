const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const path = require('path')
const comp = require('compression')
const expressStaticGzip = require('express-static-gzip')
const auth = require('./server/src/auth/index')
const highscore = require('./server/src/highscores/index')

/**
 * Connect to the Mongoose DB
 */
var retry = 1
const connectToDB = () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true }).then(
    () => { console.log('DB connection successful') },
    err => {
      console.log('Error when connecting to db ... \n' + err)
      if (retry < 30) {
        console.log('Retrying...#', retry)
        retry++
        setTimeout(() => { connectToDB() }, 5000)
      }
    })
}
connectToDB()
/**
 * Set up and listen
 */
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(auth.usersRoutes)
app.use(highscore.routes)
app.use(comp())
app.use('/', expressStaticGzip(path.join(__dirname, '/dist'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000')
  }
}))
const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log('listening on port: ' + port)
})
