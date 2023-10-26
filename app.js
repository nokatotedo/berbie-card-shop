const express = require('express')
const app = express()
const port = 3000
const index = require('./routers/index')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(index)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})