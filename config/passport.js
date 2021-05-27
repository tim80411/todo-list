const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // 初始化passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定'本地化'登入策略
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, 
  (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('warning_msg', 'This email is not register!'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('warning_msg', 'Email or Password incorrect!'))
        }
        return done(null, user)

      })
      .catch(err => done(err, false))
  }))

  // 設定序列化以及反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}