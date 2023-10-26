const express = require('express')
const router = express.Router()
const { Profile } = require('../controllers/controller')

router.get('/', Profile.show)

module.exports = router