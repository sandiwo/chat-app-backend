const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        res.jsonData(500, "Oops", info ? info.message : "Internal server error") 
      }

      if (!user) {
        res.jsonStatus(404, info ? info.message : "User not found.") 
      }

      req.logIn(user, { session: false }, function(err) {
        if (err) { return next(err); }

        const token = jwt.sign({  id: user.id, username: user.username }, 'sandisahdewo');
        res.jsonData(200, "OK", {user, token});
      });
    })(req, res, next);
  }
}