/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
		var passport = require('passport');
		passport.authenticate("basic", {
			session: false
		}, function(err, user, info) {
			if (err || !user) {
				res.set("WWW-Authenticate", "Basic realm=\"Restricted\"");
				return res.send(401, "Invalid username/password combination");
			}
			return res.json(200, {
				status: 1,
				user: user
			});
		})(req, res);
		/*
				User.findOne({
					username: req.param('username')
				}).exec(function(err, user) {
					if (err) return res.send(500, err.message);
					if (user)
						if (user.validPassword(req.param('password'))) return res.json(200, {
							status: 1,
							user: user
						});
					return res.json(200, {
						status: 0,
						message: 'Invalid username/password combination'
					});
				});*/
	},
};
