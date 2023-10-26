class Shop {
  static show(_, res) {
    try {
      res.send("Show Shop")
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Shop