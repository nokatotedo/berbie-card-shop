const { User, UserProfile } = require('../models/index')

class Profile {
  static async show(req, res) {
    try {
      const UserId = req.session.UserId
      const user = await User.findOne({
        attributes: [
          "id"
        ],
        where: {
          id: UserId
        },
        include: {
          model: UserProfile,
          attributes: [
            "name",
            "balance",
            "image"
          ]
        }
      })

      res.render('profile', {
        user: user.UserProfile
      })
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }
}

module.exports = Profile