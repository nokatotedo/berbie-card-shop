const { UserProfile, Card, UserCard } = require('../models/index')
const puppeteer = require('puppeteer')

class Profile {
  static async show(req, res) {
    try {
      const UserId = req.session.UserId
      const user = await UserProfile.findOne({
        where: {
          id: UserId
        },
        include: {
          model: Card,
          order: [
            "id"
          ]
        }
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

  static async printProfile(req, res) {
    try {
      const UserId = req.session.UserId
      const browser = await puppeteer.launch({ headless: true })
      const page = await browser.newPage()
      page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1})

      await page.goto(`http://localhost:3000/print/process?id=${UserId}`)
      await page.pdf({
        path: './public/pdfs/print.pdf',
        format: 'a4',
        margin: {
          top: '70px',
          bottom: '70px',
          right: '20px',
          left: '20px'
        }
      })
      await browser.close()

      res.redirect('/pdfs/print.pdf')
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  }
  
  static async print(req, res) {
    try {
      const UserId = +req.query.id
      if(isNaN(UserId)) {
        throw 'Redirect'
      }

      const user = await UserProfile.findOne({
        where: {
          id: UserId
        },
        include: {
          model: Card,
          order: [
            "id"
          ]
        }
      })

      res.render('print', {
        user
      })
    } catch (error) {
      res.redirect('/login')
    }
  }
}

module.exports = Profile