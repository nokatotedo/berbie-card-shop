const { User } = require('../models/index')

class Register {
  static show(_, res) {
    try {
      res.render('register-page')
    } catch (error) {
      res.send(error)
    }
  }

  static async register(req, res) {
    try {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })

      res.redirect('/')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Register