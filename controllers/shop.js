const { Card } = require('../models/index')

class Shop {
  static async show(_, res) {
    try {
      const cards = await Card.findAll()

      console.log(cards)
      res.render('shop', {
        cards
      })
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Shop