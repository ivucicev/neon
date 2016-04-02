/**
 * LikeController
 *
 * @description :: Server-side logic for managing likes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	like: function(req, res) {
		var that = this;
		console.log(req.body.liker, "liked", req.body.likee);
		Like.count({
			liker: req.body.likee,
			likee: req.body.liker
		}).exec(function(err, cnt) {
			console.log("after counting if there is already liked", err, cnt);
			if (err) return res.send(500, 'Error occured');
			if (cnt) {
				that.saveMatchToUsers(req.body.liker, req.body.likee, 1, res);
			} else {
				that.likeSave(req.body.liker, req.body.likee, res);
			}
		});
	},
	likeSave: function(liker, likee, res) {
		console.log("saving like", liker, likee);
		Like.create({
			liker: liker,
			likee: likee
		}).exec(function(err, created) {
			console.log("after like save", err, created);
			if (err) res.send(500, 'Error occured');
			return res.json(200, {
				status: 1,
				match: 0
			});
		});
	},
	saveMatchToUsers: function(user1, user2, check, res) {
		console.log("saving match to users and check is: ", check);
		var that = this;
		User.findOne({id: user1}).exec(function(err, user) {
			console.log("after finding user to update matches", err, user);
			if (err) return res.send(500, 'Error occured');
			var matches = user.matches ? user.matches : [];
			matches.push(user2);
			User.update({id: user1}, {matches: matches}).exec(function(err, updated) {
				console.log("after updating user with matched user", err, updated);
				if (err) res.send(500, 'Error occured');
				if (check) {
					that.saveMatchToUsers(user2, user1, 0, res);
				} else {
					that.removeLikersFromLike(user1, user2, 1, res);
				}
			});
		});
	},
	removeLikersFromLike: function(user1, user2, check, res) {
		console.log("removing likers from like with check: ", check);
		var that = this;
		Like.destroy({liker: user1, likee: user2}).exec(function (err) {
			console.log("after removing likers from like", err);
			if (err) return res.send(500, 'Error occured');
			if (check) {
				that.removeLikersFromLike(user2, user1, 0, res);
			} else {
				console.log("all ok");
				return res.json(200, {
					status: 1,
					match: 1
				});
			}
		});
	}
};
