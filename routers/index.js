const express = require('express')
const router = express.Router()
const { Controller, Login } = require('../controllers/controller')

const login = require('./login')
const register = require('./register')
const profile = require('./profile')
const tournament = require('./tournament')
const shop = require('./shop')

const isLogin = function (req, res, next) {
  if(req.session.UserId) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/', Controller.showLandingPage)
router.use('/shop', shop)

router.use('/login', login)
router.use('/register', register)

router.use(isLogin)

router.use('/profile', profile)
router.use('/tournament', tournament)
router.get('/logout', Login.out)

module.exports = router