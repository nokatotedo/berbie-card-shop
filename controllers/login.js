const { User } = require('../models/index')

class Login {
  static show(req, res) {
    try {
      const error = req.query.error
      const isLogin = req.session.UserId

      res.render('login-page', {
        error,
        isLogin
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async login(req, res) {
    try {
      const user = await User.login(req.body)
      req.session.UserId = user - 1

      res.redirect('/')
    } catch (error) {
      res.redirect(`/login?error=${error.message}`)
    }
  }

  static async out(req, res) {
    try {
      req.session.destroy()
      
      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Login