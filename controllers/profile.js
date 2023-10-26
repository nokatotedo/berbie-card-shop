class Profile {
  static show(_, res) {
    try {
      res.send("Show Profile")
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = Profile