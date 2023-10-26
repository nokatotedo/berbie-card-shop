const Login = require('./login')
const Register = require('./register')
const Profile = require('./profile')
const Tournament = require('./tournament')
const Shop = require('./shop')

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
  Login,
  Register,
  Profile,
  Tournament,
  Shop
}