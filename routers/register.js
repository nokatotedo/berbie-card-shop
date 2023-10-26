const express = require('express')
const router = express.Router()
const { Register } = require('../controllers/controller')

router.get('/', Register.show)
router.post('/', Register.register)

module.exports = router