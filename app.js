const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes/index.js')
const app = express()
const port = 3000

// connect mongodb and set up listener
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set up view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set up body-parser & method-override
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(router)

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})