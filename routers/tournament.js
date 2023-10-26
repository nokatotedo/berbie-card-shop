const express = require('express')
const router = express.Router()
const { Tournament } = require('../controllers/controller')

router.get('/', Tournament.show)

module.exports = router