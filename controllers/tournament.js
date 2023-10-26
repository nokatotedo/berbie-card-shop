class Tournament {
  static show(_, res) {
    try {
      res.send("Coming Soon")
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Tournament