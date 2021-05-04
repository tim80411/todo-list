const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Todo = require('./models/todo.js')
const methodOverride = require('method-override')
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

// route: index
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 1 })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// route: detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.error(error))

})

// route: update todo function
app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.error(error))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const {name, isDone} = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.error(error))
})

// route: create todo function
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  const todo = new Todo({ name })

  return todo.save()
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// route: delete todo function
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})