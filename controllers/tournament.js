class Tournament {
  static show(_, res) {
    try {
      res.render('tournament')
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Tournament