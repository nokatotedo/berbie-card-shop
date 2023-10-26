const Login = require('./login')
const Register = require('./register')
const Profile = require('./profile')
const Tournament = require('./tournament')
const Shop = require('./shop')

class Controller {
  static showLandingPage(req, res) {
    try {
      const isLogin = req.session.UserId
      
      res.render('landing-page', {
        isLogin
      })
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