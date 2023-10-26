const express = require('express')
const router = express.Router()
const { Register } = require('../controllers/controller')

const isLogin = function(req, res, next) {
  if(req.session.UserId) {
    res.redirect('/profile')
  } else {
    next()
  }
}

router.use(isLogin)

router.get('/', Register.show)
router.post('/', Register.register)

module.exports = router