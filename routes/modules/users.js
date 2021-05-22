const express = require('express')
const { findOne } = require('../../models/user')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('POST /users/login success')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  return User.findOne({ email })
    .then(user => {
      if (user) {
        res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({ name, email, password, confirmPassword })
          .then(() => {
            res.redirect('/')
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
})

module.exports = router