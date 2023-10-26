function toCapitalize(text) {
  return text[0].toUpperCase() + text.slice(1)
}

function toIdr(number) {
  return `Rp. ${number.toLocaleString("id-ID")}`
}

module.exports = {
  toCapitalize,
  toIdr
}