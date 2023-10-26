const express = require('express')
const router = express.Router()
const { Controller } = require('../controllers/controller')

const login = require('./login')
const register = require('./register')
const profile = require('./profile')
const tournament = require('./tournament')
const shop = require('./shop')

router.get('/', Controller.showLandingPage)

router.use('/login', login)
router.use('/register', register)

router.use('/profile', profile)
router.use('/tournament', tournament)
router.use('/shop', shop)

module.exports = router