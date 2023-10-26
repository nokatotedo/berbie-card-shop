const { Card } = require('../models/index')

class Shop {
  static async show(req, res) {
    try {
      const cards = await Card.findAll()
      const isLogin = req.session.UserId

      res.render('shop', {
        cards,
        isLogin
      })
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Shop