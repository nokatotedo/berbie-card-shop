const express = require('express')
const router = express.Router()
const { Shop } = require('../controllers/controller')

const isLogin = function (req, res, next) {
  if(req.session.UserId) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/', Shop.show)

router.use(isLogin)

router.get('/buy/:id', Shop.buy)

module.exports = router