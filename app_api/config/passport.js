const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const Users = require('../models/user');

const User = mongoose.model('users');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ email: username });
  
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        const isValid = await user.validPassword(password); // assuming this is async or can be made async
  
        if (!isValid) {
          return done(null, false, { message: 'Incorrect password.' });
        }
  
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));