const { Card, UserCard, UserProfile } = require('../models/index')
const { Op } = require('sequelize')

class Shop {
  static async show(req, res) {
    try {
      const cards = await Card.findAll({
        where: {
          stock: {
            [Op.gt]: 0
          }
        }
      })

      const isLogin = req.session.UserId
      const error = req.query.error

      res.render('shop', {
        cards,
        isLogin,
        error
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async buy(req, res) {
    try {
      const card = await Card.findOne({
        where: {
          id: +req.params.id
        }
      })

      const user = await UserProfile.findOne({
        where: {
          id: req.session.UserId
        }
      })

      await UserProfile.update({
        balance: user.balance - card.price
      }, {
        where: {
          id: user.id
        }
      })

      await Card.decrement('stock', {
        by: 1,
        where: {
          id: card.id
        }
      })

      await UserCard.create({
        UserProfileId: req.session.UserId,
        CardId: card.id
      })

      res.redirect('/profile')
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
        res.redirect(`/shop?error=${error.errors[0].message}`)
      } else {
        res.send(error)
      }
    }
  }
}

module.exports = Shop