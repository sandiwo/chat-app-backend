const passport = require('passport');

const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const User = require('../models/User');
const md5 = require('md5');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    const encryptedPassword = md5(password);
    User.query().findOne({ username, password: encryptedPassword })  
      .then((user) => {
        if(! user) return done(null, false, { message: 'Wrong username or password'});
        
        return done(null, user);
      }).catch(err => done(err));
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'sandisahdewo'
  }, function(jwtPayload, done) {
    User.query().findOne({username: jwtPayload.username})
      .then((user) => {
        return done(null, user);
      }).catch((err) => {
        return done(err);
      })
  }))