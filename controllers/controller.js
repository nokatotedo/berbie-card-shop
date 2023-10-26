const Login = require('./login')

class Controller {
  static showLandingPage(_, res) {
    try {
      res.render('landing-page')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = {
  Controller,
  Login
}