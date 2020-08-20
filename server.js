if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const passport = require('passport')
const app = express()
const session = require('express-session')
const methodOverride = require('method-override')
var path = require('path');

const users = [{
  id: Date.now().toString(),
  username: "test",
  password: "test"
}];

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride('_method'))

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  users[0],
  id => users.find(user => user.id === id)
);

app.use(express.urlencoded({ extended: false }))
app.use("/js", express.static('./js/'))
app.use("/css", express.static('./css/'))

app.get('/', checkAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'))
})

app.get('/login', checkNotAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname + '/views/login.html'))
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

app.delete('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}

app.listen(3010, function () {
  console.log('App listening on port 3010!')
})
