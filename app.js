const express = require('express')
const app = express()
const index = require('./routers/index')
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use(session({
  secret: 'pandu ganteng',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

app.use(index)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})