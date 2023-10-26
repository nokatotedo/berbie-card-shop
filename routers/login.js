const express = require('express')
const router = express.Router()
const { Login } = require('../controllers/controller')

router.get('/', Login.show)
router.post('/', Login.login)

module.exports = router