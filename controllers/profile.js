const { UserProfile, Card, UserCard } = require('../models/index')

class Profile {
  static async show(req, res) {
    try {
      const UserId = req.session.UserId
      const user = await UserProfile.findOne({
        where: {
          id: UserId
        },
        include: Card
      })

      res.render('profile', {
        user: user
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async showEdit(req, res) {
    try {
      const UserId = req.session.UserId
      const err = req.query.err ? req.query.err.split(',') : ""
      const userProfile = await UserProfile.findOne({
        where: {
          id: UserId
        }
      })

      res.render('profile-edit', {
        user: userProfile,
        error: err,
        isLogin: UserId
      })
    } catch (error) {
      res.send(error)
    }
  }

  static async updateUserProfile(req, res) {
    try {
      const UserId = req.session.UserId
      await UserProfile.update({
        name: req.body.name,
        image: req.body.image
      }, {
        where: {
          id: UserId
        }
      })

      res.redirect('/profile')
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
        const err = error.errors.map(msg => msg.message)
        res.redirect(`/profile/edit?err=${err}`)
      } else {
        res.send(error)
      }
    }
  }

  static async deleteCard(req, res) {
    try {
      const card = await Card.findOne({
        where: {
          id: +req.params.id
        }
      })
      
      await UserCard.destroy({
        where: {
          CardId: +req.params.id,
          UserProfileId: req.session.UserId
        }
      })

      await UserProfile.increment('balance', {
        by: card.price,
        where: {
          id: req.session.UserId
        }
      })

      res.redirect('/profile')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Profile