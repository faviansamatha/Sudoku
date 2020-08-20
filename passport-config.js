const LocalStrategy = require('passport-local').Strategy;

function initialize(passport, user, getUserById) {
  const authenticateUser = async (username, password, done) => {
    try {
      if (username === user.username && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch(error) {
      return done(error);
    }
  }

  passport.use(new LocalStrategy(authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, user.id);
  })
}

module.exports = initialize;
