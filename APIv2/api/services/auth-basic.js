/**
 * api/services/auth-basic.js
 *
 * Basic authentication strategy is defined here.
 * Other strategies can be defined as needed by adding files like this to the services folder.
 *
 **/

var passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(function(username, password, next) {
  User.findOne({
    username: username
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false);
    }
    user.validPassword(password, function(err, res) {
      if (err) {
        return next(err);
      }
      next(null, res ? user : false);
    });
  });
}));
