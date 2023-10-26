const { User, UserProfile } = require('../models/index')

class Register {
  static show(req, res) {
    try {
      const isLogin = req.session.UserId
      const err = req.query.err ? req.query.err.split(',') : ""
      
      res.render('register-page', {
        isLogin,
        error: err
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
      if(error.name === "SequelizeValidationError") {
        const err = error.errors.map(msg => msg.message)
        res.redirect(`/register?err=${err}`)
      } else {
        res.send(error)
      }
    }
  }
}

module.exports = Register