const { User } = require('../models/index')

class Login {
  static show(req, res) {
    try {
      const error = req.query?.error

      res.render('login-page', {
        error
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async login(req, res) {
    try {
      const user = await User.login(req.body)
      req.session.UserId = user

      res.redirect('/')
    } catch (error) {
      res.redirect(`/login?error=${error.message}`)
    }
  }
}

module.exports = Login