/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    _generateHash: function() {
        var uuid = require('uuid');
        return uuid.v4();
    },
    _generatePassword: function() {
        var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    },
    /**
     * TODO - implement this feature
     * Temporary password will be sent, user needs to login and change password immedetely
     */
    passwordReset: function(req, res) {
        var that = this;
        var nodemailer = require('nodemailer');
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://noreply@neondating.com:love101@gator4122.hostgator.com');
        var pass = that._generateHash();
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'noreply@neondating.com', // sender address
            to: req.params.email, // list of receivers
            subject: 'Password reset link', // Subject line
            text: '', // plaintext body
            html: 'Hello Dear Neon App user, click on link to reset your password<br/> <b><a href="http://52.58.51.82:1337/password-reset-confirm/' + pass + '">Password Reset Link</a></b>' // html body
        };
        User.update({email: req.params.email}, {passwordResetHashLink: pass}).exec(function(err, user){
            if (err) return res.send(500, 'Error occured');
            if (user) {
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info) {});
                return res.send(200, "OK");
            }
        });
    },
    passwordResetConfirm: function(req, res) {
        var hash = req.params.hash;
        var that = this;
        var nodemailer = require('nodemailer');
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport('smtps://noreply@neondating.com:love101@gator4122.hostgator.com');
        var pass = that._generatePassword();
        // setup e-mail data with unicode symbols
        User.findOne({passwordResetHashLink: req.params.hash}).exec(function(err, user) {
            if (err) res.send("This link has expired");
            if (user) {
                var mailOptions = {
                    from: 'noreply@neondating.com', // sender address
                    to: user.email, // list of receivers
                    subject: 'Password reset', // Subject line
                    text: '', // plaintext body
                    html: 'Hello Dear Neon App user, this is your temporary password. <strong>Please change it immedeately.</strong> <br/><br/> <b>' + pass + '</b>' // html body
                };
                User.update({id: user.id}, {passwordResetHashLink: that._generateHash(), password: pass}).exec(function(err, updated) {
                    if (err) res.send("This link has expired. You will be redirected shortly.<script type='text/javascript'>setTimeout(function() { window.location.href = 'http://www.neondating.com'; }, 3000);</script>");
                    transporter.sendMail(mailOptions, function(error, info) {});
                    return res.send("Temporary password has been sent to you email address. <strong>Please change it immedeately.</strong><br>. You will be redirected shortly.<script type='text/javascript'>setTimeout(function() { window.location.href = 'http://www.neondating.com'; }, 3000);</script>");
                });
            } else {
                return res.send("This link has expired. You will be redirected shortly.<script type='text/javascript'>setTimeout(function() { window.location.href = 'http://www.neondating.com'; }, 3000);</script>");
            }
        });
    },
    confirmAccount: function(req, res) {
        var self = this;
        User.update({id: req.params.id, accountConfirmToken: req.params.hash}, {confirmed: 1, accountConfirmToken: self._generateHash()}).exec(function(err, updated) {
            if (err) return res.send("This link has expired. You will be redirected shortly.<script type='text/javascript'>setTimeout(function() { window.location.href = 'http://www.neondating.com'; }, 3000);</script>");
            return res.send("Your account is now activated. You will be redirected shortly.<script type='text/javascript'>setTimeout(function() { window.location.href = 'http://www.neondating.com'; }, 3000);</script>");
        });
    },
    checkEmailAvailability: function(req, res) {
        User.count({
            email: req.params.email
        }).exec(function(err, count) {
            if (err) return res.send(500, 'Error occured');
            return res.json(200, {
                status: 1,
                count: count
            });
        });
    },
    checkUsernameAvailability: function(req, res) {
        User.count({
            username: req.params.username
        }).exec(function(err, count) {
            if (err) return res.send(500, 'Error occured');
            return res.json(200, {
                status: 1,
                count: count
            });
        });
    },
    login: function(req, res) {
        try {
            var passport = require('passport');
            passport.authenticate("basic", {
                session: false
            }, function(err, user, info) {
                if (err || !user) {
                    return res.send(401, "Invalid username/password combination");
                }
                if (parseInt(user.confirmed)) {
                    return res.json(200, {
                        status: 1,
                        user: user
                    });
                } else {
                    return res.json(200, {
                        status: 7,
                        message: "Account not confirmed yet. Check your email."
                    });
                }
            })(req, res);
        } catch (e) {
            return res.send(401, "Server is down or Username/Password is invalid.");
        }
    }
};
