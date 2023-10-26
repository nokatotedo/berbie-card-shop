class Tournament {
  static show(_, res) {
    try {
      res.send("Show Tournament")
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Tournament