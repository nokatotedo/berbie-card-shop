function generateRandom(first, last) {
  return Math.floor(Math.random() * (last - first)) + first
}

module.exports = {
  generateRandom
}