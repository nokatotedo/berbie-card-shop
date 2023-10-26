const express = require('express')
const router = express.Router()
const { Shop } = require('../controllers/controller')

router.get('/', Shop.show)

module.exports = router