module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '你必須要先登入才可以使用')
    res.redirect('/users/login')
  }
}