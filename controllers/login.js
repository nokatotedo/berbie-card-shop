class Login {
  static show(_, res) {
    try {
      res.render('login-page')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Login