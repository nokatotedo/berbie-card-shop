const express = require('express')
const router = express.Router()
const { Controller } = require('../controllers/controller')
const login = require('./login')

router.get('/', Controller.showLandingPage)
router.use('/login', login)
router.get("*", Controller.showLandingPage)

module.exports = router