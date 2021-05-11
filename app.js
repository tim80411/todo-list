const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const router = require('./routes/index.js')
require('./config/mongoose.js')

const PORT = process.env.port || 3000
const app = express()

// set up view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// set up middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(router)

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${port}`)
})