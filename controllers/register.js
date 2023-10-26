const { User, UserProfile } = require('../models/index')

class Register {
  static show(req, res) {
    try {
      const isLogin = req.session.UserId

      res.render('register-page', {
        isLogin
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async register(req, res) {
    try {
      await User.add(req.body, UserProfile)

      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Register