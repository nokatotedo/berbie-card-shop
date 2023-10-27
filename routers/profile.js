const express = require('express')
const router = express.Router()
const { Profile } = require('../controllers/controller')

router.get('/', Profile.show)
router.get('/edit', Profile.showEdit)
router.post('/edit', Profile.updateUserProfile)
router.get('/delete/:id', Profile.deleteCard)
router.get('/print', Profile.printProfile)

module.exports = router